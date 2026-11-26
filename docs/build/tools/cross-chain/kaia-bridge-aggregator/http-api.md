---
sidebar_label: Use the HTTP API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use the Kaia Bridge Aggregator HTTP API

Any language can call the API directly. This guide walks through a transfer with `curl`. For every field and response, see the interactive reference at [bridge-aggregator-api.kaia.io/api-docs](https://bridge-aggregator-api.kaia.io/api-docs/); the raw OpenAPI document is at `/api-docs.json` if you want to generate a client. If you write TypeScript or JavaScript, the [SDK](./sdk.md) does these steps for you.

## Before you start {#before-you-start}

You need an API key (`kaia_…`); see [Get a key](./kaia-bridge-aggregator.md#get-a-key). Send it in the `X-API-Key` header on every `/api/v1` request, and keep it on your server.

```bash
export BASE=https://bridge-aggregator-api.kaia.io   # QA: https://bridge-aggregator-api.qa.kaia.io
export KEY=kaia_your_api_key
```

A few rules apply to every call:

- **Amounts** are strings in the token's smallest unit. 25 USDT, which has 6 decimals, is `"25000000"`.
- **Tokens** are identified by address, never by symbol. Native tokens (ETH, KAIA, BNB, …) use `0x0000000000000000000000000000000000000000`.
- **Chain IDs**: Kaia is `8217`, Ethereum `1`, BNB Chain `56`, Polygon `137`, Arbitrum `42161`, Base `8453`.

## 1. List chains {#list-chains}

```bash
# Every chain with a route to or from Kaia
curl -s "$BASE/api/v1/chains?limit=200" -H "X-API-Key: $KEY"

# Only the chains reachable from Ethereum
curl -s "$BASE/api/v1/chains?fromChainId=1&limit=200" -H "X-API-Key: $KEY"
```

## 2. List tokens {#list-tokens}

```bash
# Tokens that can leave Ethereum
curl -s "$BASE/api/v1/tokens?chainId=1&limit=200" -H "X-API-Key: $KEY"

# What Ethereum USDT can become on Kaia
curl -s "$BASE/api/v1/tokens?chainId=8217&fromChainId=1&fromToken=0xdAC17F958D2ee523a2206206994597C13D831ec7" \
  -H "X-API-Key: $KEY"
```

```json
{
  "success": true,
  "chainId": 8217,
  "tokens": [
    {
      "chainId": 8217,
      "symbol": "USDT",
      "address": "0xd077a400968890eacc75cdc901f0356c943e4fdb",
      "decimals": 6,
      "isNative": false,
      "providers": ["layerswap", "rhinofi"],
      "featured": true,
      "official": true
    }
  ]
}
```

Only tokens with a live route are listed, popular ones first. `official` marks Kaia's issuer-listed tokens, so you can tell them from look-alikes with the same symbol. For USD prices to show next to amounts, `GET /api/v1/prices` returns prices by symbol and by token (`"<chainId>:<address>"`).

## 3. Get offers {#get-offers}

```bash
curl -s "$BASE/api/v1/quote" -H "X-API-Key: $KEY" -H "Content-Type: application/json" -d '{
  "fromChainId": 1,
  "toChainId": 8217,
  "fromToken": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "toToken": "0xd077a400968890eacc75cdc901f0356c943e4fdb",
  "amount": "25000000",
  "sourceAddress": "0xUserWallet",
  "receiverAddress": "0xUserWalletOnKaia",
  "slippageBps": "50"
}'
```

Always send `sourceAddress` and `receiverAddress` when the user may go ahead: a quote without them is for display only and can't be committed. `slippageBps` is optional and is a string.

The response's `kind` tells you what you got:

- **`"bridge"`**: `bridge.quote` is the best offer and `bridge.allQuotes` lists every provider's offer. Each offer has `adaptorId` (the provider), `toAmountWei`, `feeInUsd`, `durationSeconds` and the provider's own data (for example `rhinofiSwapData`). A Wormhole offer also has `claim` (the destination chain where the user must claim) and `notices` to show the user.
- **`"swap"`**: a swap between two tokens on Kaia. See [Swap tokens on Kaia](#swap-on-kaia).

To show offers as each provider answers instead of waiting for all of them, send the same body to `POST /api/v1/quote/stream`. It returns server-sent events: one `quote` event per offer, then `complete`.

## 4. Commit the chosen offer {#commit}

Send back the offer the user picked, exactly as you received it:

```bash
curl -s "$BASE/api/v1/commit" -H "X-API-Key: $KEY" -H "Content-Type: application/json" \
  -d '<the chosen offer object from bridge.allQuotes>'
```

The response contains:

- `transaction`: what to sign on the source chain (`to`, `value`, `data`, `chainId`);
- `approval`: when present, the user must first approve `amount` of `token` for `spender`;
- `swapId`: the ID to check the transfer's status with (for Wormhole, see step 6).

A commit can be used once. If the user changes anything, get a new quote. The API refuses a quote made without a receiver (`receiver_required`) and a route your key doesn't allow (`route_not_allowed`).

## 5. Sign and send {#sign-and-send}

If there's an `approval`, send the token approval first. Then the user signs and sends `transaction` with their wallet.

This Node.js script does both for the offer the user chose: it commits it, approves the token if the allowance is too low, then sends the transfer and waits for it to be mined. Set `KAIA_BRIDGE_API_KEY`, `PRIVATE_KEY` and `RPC_URL` (an RPC for the source chain). In a browser app, use the user's wallet instead of a private key, and send the commit through your backend so the API key stays there.

<Tabs groupId="evm-library">
  <TabItem value="ethers" label="ethers v6" default>

```js
// npm install ethers
import { Contract, JsonRpcProvider, NonceManager, Wallet } from "ethers";

const API = "https://bridge-aggregator-api.kaia.io";
const headers = { "X-API-Key": process.env.KAIA_BRIDGE_API_KEY, "Content-Type": "application/json" };

// A wallet on the source chain (Ethereum in this example). NonceManager keeps the
// approval and the transfer from reusing a nonce when they're sent back to back.
const wallet = new NonceManager(new Wallet(process.env.PRIVATE_KEY, new JsonRpcProvider(process.env.RPC_URL)));
const me = await wallet.getAddress();

// offer: the object the user chose from bridge.allQuotes in step 3.
const commit = await fetch(`${API}/api/v1/commit`, { method: "POST", headers, body: JSON.stringify(offer) }).then((r) => r.json());
if (!commit.success) throw new Error(`${commit.error.code}: ${commit.error.message}`);

// 1. Approve the token first, if the provider needs it and the allowance is too low.
if (commit.approval) {
  const { token, spender, amount } = commit.approval;
  const erc20 = new Contract(token, [
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
  ], wallet);
  if ((await erc20.allowance(me, spender)) < BigInt(amount)) {
    await (await erc20.approve(spender, amount)).wait();
  }
}

// 2. Sign and send the transfer, then wait for it to be mined.
const { to, data, value } = commit.transaction;
const tx = await wallet.sendTransaction({ to, data, value: BigInt(value ?? 0) });
console.log("Sent", tx.hash);
const receipt = await tx.wait();
if (receipt.status !== 1) throw new Error(`Reverted: ${tx.hash}`);
console.log("Confirmed in block", receipt.blockNumber);
```

  </TabItem>
  <TabItem value="viem" label="viem">

```js
// npm install viem
import { createPublicClient, createWalletClient, erc20Abi, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains"; // the source chain (Ethereum in this example)

const API = "https://bridge-aggregator-api.kaia.io";
const headers = { "X-API-Key": process.env.KAIA_BRIDGE_API_KEY, "Content-Type": "application/json" };

const account = privateKeyToAccount(process.env.PRIVATE_KEY);
const publicClient = createPublicClient({ chain: mainnet, transport: http(process.env.RPC_URL) });
const walletClient = createWalletClient({ account, chain: mainnet, transport: http(process.env.RPC_URL) });

// offer: the object the user chose from bridge.allQuotes in step 3.
const commit = await fetch(`${API}/api/v1/commit`, { method: "POST", headers, body: JSON.stringify(offer) }).then((r) => r.json());
if (!commit.success) throw new Error(`${commit.error.code}: ${commit.error.message}`);

// 1. Approve the token first, if the provider needs it and the allowance is too low.
if (commit.approval) {
  const { token, spender, amount } = commit.approval;
  const allowance = await publicClient.readContract({
    address: token, abi: erc20Abi, functionName: "allowance", args: [account.address, spender],
  });
  if (allowance < BigInt(amount)) {
    const approveHash = await walletClient.writeContract({
      address: token, abi: erc20Abi, functionName: "approve", args: [spender, BigInt(amount)],
    });
    await publicClient.waitForTransactionReceipt({ hash: approveHash });
  }
}

// 2. Sign and send the transfer, then wait for it to be mined.
const { to, data, value } = commit.transaction;
const hash = await walletClient.sendTransaction({ to, data, value: BigInt(value ?? 0) });
console.log("Sent", hash);
const receipt = await publicClient.waitForTransactionReceipt({ hash });
if (receipt.status !== "success") throw new Error(`Reverted: ${hash}`);
console.log("Confirmed in block", receipt.blockNumber);
```

  </TabItem>
</Tabs>

Some wallets never report that a transaction was mined. Besides the wallet, poll an RPC you trust for the source chain, and use whichever answers first:

```bash
curl -s -X POST "$YOUR_RPC" -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_getTransactionReceipt","params":["<txHash>"]}'
# "result": null while pending, then "status": "0x1" (success) or "0x0" (failed)
```

Poll every 3 to 5 seconds. If nothing confirms after about 10 minutes, show the user an explorer link instead of letting them send again.

## 6. Track the transfer {#track}

```bash
curl -s "$BASE/api/v1/swap-status?swapId=<swapId>&adaptorId=<adaptorId>" -H "X-API-Key: $KEY"
```

`status` moves through `user_transfer_pending` → `in_progress` → `completed` or `failed`. `sourceTxHash` and `destinationTxHash` fill in as the transfer moves. Poll every few seconds until it's `completed` or `failed`.

For **Wormhole**, the `swapId` is the source transaction hash (`0x` + 64 hex characters), not the commit's `swapId`, and the status stops at `ready_to_claim` until the user claims.

## 7. Claim a Wormhole transfer {#claim}

When the status is `ready_to_claim`, get the claim transaction:

```bash
curl -s "$BASE/api/v1/claim" -H "X-API-Key: $KEY" -H "Content-Type: application/json" \
  -d '{ "adaptorId": "wormhole", "swapId": "<source transaction hash>" }'
```

The response has `chainId` and `transaction` (`to`, `data`, `value`, `chainId`). The user switches their wallet to that chain, then signs and sends it, paying the gas there. Track it with `swap-status` until it's `completed`. The API answers `400` if the transfer isn't signed by Wormhole yet or was already claimed.

This Node.js script waits for the transfer to be ready, gets the claim and sends it. Set `SOURCE_TX_HASH` to the deposit's transaction hash from step 5, and `DESTINATION_RPC_URL` to an RPC for the destination chain: the claim is sent there, not on the source chain. The script stops before sending if that RPC is for another chain.

<Tabs groupId="evm-library">
  <TabItem value="ethers" label="ethers v6" default>

```js
// npm install ethers
import { JsonRpcProvider, Wallet } from "ethers";

const API = "https://bridge-aggregator-api.kaia.io";
const headers = { "X-API-Key": process.env.KAIA_BRIDGE_API_KEY, "Content-Type": "application/json" };
const swapId = process.env.SOURCE_TX_HASH; // the deposit's transaction hash from step 5

// 1. Wait until Wormhole has signed the transfer (about 1 to 20 minutes).
for (;;) {
  const status = await fetch(`${API}/api/v1/swap-status?adaptorId=wormhole&swapId=${swapId}`, { headers }).then((r) => r.json());
  if (status.success === false) throw new Error(`${status.error.code}: ${status.error.message}`);
  if (status.status === "ready_to_claim") break;
  if (status.status === "completed") { console.log("Already claimed"); process.exit(0); }
  if (status.status === "failed") throw new Error("The transfer failed");
  await new Promise((r) => setTimeout(r, 15_000));
}

// 2. Get the claim transaction for the destination chain.
const claim = await fetch(`${API}/api/v1/claim`, {
  method: "POST", headers, body: JSON.stringify({ adaptorId: "wormhole", swapId }),
}).then((r) => r.json());
if (!claim.success) throw new Error(`${claim.error.code}: ${claim.error.message}`);

// 3. Send it from a wallet on the destination chain, which pays the gas there.
const wallet = new Wallet(process.env.PRIVATE_KEY, new JsonRpcProvider(process.env.DESTINATION_RPC_URL));
const { chainId } = await wallet.provider.getNetwork();
if (Number(chainId) !== claim.chainId) throw new Error(`DESTINATION_RPC_URL must be for chain ${claim.chainId}`);

const { to, data, value } = claim.transaction;
const tx = await wallet.sendTransaction({ to, data, value: BigInt(value ?? 0) });
console.log("Claim sent", tx.hash);
const receipt = await tx.wait();
if (receipt.status !== 1) throw new Error(`Reverted: ${tx.hash}`);
console.log("Claimed in block", receipt.blockNumber);
```

  </TabItem>
  <TabItem value="viem" label="viem">

```js
// npm install viem
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const API = "https://bridge-aggregator-api.kaia.io";
const headers = { "X-API-Key": process.env.KAIA_BRIDGE_API_KEY, "Content-Type": "application/json" };
const swapId = process.env.SOURCE_TX_HASH; // the deposit's transaction hash from step 5

// 1. Wait until Wormhole has signed the transfer (about 1 to 20 minutes).
for (;;) {
  const status = await fetch(`${API}/api/v1/swap-status?adaptorId=wormhole&swapId=${swapId}`, { headers }).then((r) => r.json());
  if (status.success === false) throw new Error(`${status.error.code}: ${status.error.message}`);
  if (status.status === "ready_to_claim") break;
  if (status.status === "completed") { console.log("Already claimed"); process.exit(0); }
  if (status.status === "failed") throw new Error("The transfer failed");
  await new Promise((r) => setTimeout(r, 15_000));
}

// 2. Get the claim transaction for the destination chain.
const claim = await fetch(`${API}/api/v1/claim`, {
  method: "POST", headers, body: JSON.stringify({ adaptorId: "wormhole", swapId }),
}).then((r) => r.json());
if (!claim.success) throw new Error(`${claim.error.code}: ${claim.error.message}`);

// 3. Send it from a wallet on the destination chain, which pays the gas there.
const transport = http(process.env.DESTINATION_RPC_URL);
const publicClient = createPublicClient({ transport });
const walletClient = createWalletClient({ account: privateKeyToAccount(process.env.PRIVATE_KEY), transport });
if ((await publicClient.getChainId()) !== claim.chainId) {
  throw new Error(`DESTINATION_RPC_URL must be for chain ${claim.chainId}`);
}

const { to, data, value } = claim.transaction;
const hash = await walletClient.sendTransaction({ chain: null, to, data, value: BigInt(value ?? 0) });
console.log("Claim sent", hash);
const receipt = await publicClient.waitForTransactionReceipt({ hash });
if (receipt.status !== "success") throw new Error(`Reverted: ${hash}`);
console.log("Claimed in block", receipt.blockNumber);
```

  </TabItem>
</Tabs>

To show transfers still waiting to be claimed, for example after the user reloads the page or opens your app on another device:

```bash
curl -s "$BASE/api/v1/claims?address=0xUserWallet&adaptorId=wormhole" -H "X-API-Key: $KEY"
```

## Swap tokens on Kaia {#swap-on-kaia}

When both chain IDs are `8217`, the quote's `kind` is `"swap"` and there's no commit step. `sourceAddress` is required.

```bash
curl -s "$BASE/api/v1/quote" -H "X-API-Key: $KEY" -H "Content-Type: application/json" -d '{
  "fromChainId": 8217,
  "toChainId": 8217,
  "fromToken": "0x0000000000000000000000000000000000000000",
  "toToken": "0xd077a400968890eacc75cdc901f0356c943e4fdb",
  "amount": "1000000000000000000",
  "sourceAddress": "0xUserWallet"
}'
```

`swap.quotes` holds ready-to-sign transactions (`tx`: `toAddress`, `data`, `value`) grouped by `channel`. In the channel you use, send the `txType: "approve"` transaction first if there is one, quote again, then send the `txType: "swap"` transaction. Each quote also lists its `fees`, including Kaia's fee.

## Errors and limits {#errors-and-limits}

Every error has the same shape:

```json
{ "success": false, "error": { "code": "unauthorized", "message": "Invalid or revoked API key" } }
```

| Status | Common codes | What to do |
|--------|--------------|------------|
| 400 | `invalid_request`, `receiver_required`, `missing_swap_id` | Fix the request. `error.details` says which field is wrong. |
| 401 | `unauthorized` | Check the `X-API-Key` header. |
| 403 | `route_not_allowed`, `feature_not_allowed` | The route or feature isn't in your access settings. Ask Kaia to change them. |
| 429 | | Too many requests: wait for the number of seconds in `RateLimit-Reset`, then retry. |

Every response has an `X-Request-ID` header. Include it when you report a problem to [ecosystem@kaia.io](mailto:ecosystem@kaia.io).
