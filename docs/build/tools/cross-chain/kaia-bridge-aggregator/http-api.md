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

Every provider answers in the same shapes, so your code signs and sends the same way whichever provider the user picks:

1. Get offers with `/quote`.
2. For a bridge, commit the chosen offer to get its transaction. A swap on Kaia is ready to send as quoted.
3. If there's an `approval`, approve that amount first. Then send the `transaction`.
4. Track the transfer with the `swapId` and the transaction hash. For Wormhole, claim it on the destination chain.

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
  "fromChainId": 8217,
  "toChainId": 137,
  "fromToken": "0xd077a400968890eacc75cdc901f0356c943e4fdb",
  "toToken": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  "amount": "25000000",
  "sourceAddress": "0xUserWallet",
  "receiverAddress": "0xUserWalletOnPolygon",
  "slippageBps": "50"
}'
```

Always send `sourceAddress` and `receiverAddress` when the user may go ahead: a quote without them is for display only and can't be committed. `slippageBps` is optional and is a string.

```json
{
  "success": true,
  "kind": "bridge",
  "from": { "chainId": 8217, "address": "0xd077a400968890eacc75cdc901f0356c943e4fdb", "symbol": "USDT", "decimals": 6 },
  "to": { "chainId": 137, "address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", "symbol": "USDT0", "decimals": 6 },
  "fromAmount": "25000000",
  "offers": [
    {
      "adaptorId": "rhinofi",
      "kind": "bridge",
      "toAmount": "24972490",
      "feeUsd": "0.04",
      "fees": [],
      "durationSeconds": 2,
      "needsCommit": true,
      "approval": null,
      "transaction": null,
      "requoteAfterApproval": false,
      "claim": null,
      "notices": [],
      "offerData": { "…": "the provider's data; send it back unchanged" }
    }
  ]
}
```

`offers` lists every provider's offer, best first. Each offer has:

- `adaptorId`: the provider.
- `toAmount`: what the user receives, in the destination token's smallest unit.
- `feeUsd`, `fees` and `durationSeconds`, to compare offers. `feeUsd` and `durationSeconds` are `null` when the provider doesn't give them, as for swaps on Kaia.
- `needsCommit`: `true` for a bridge, which you [commit](#commit) to get its transaction. `false` for a swap on Kaia, which already has its `approval` and `transaction`; see [Swap tokens on Kaia](#swap-on-kaia).
- `claim`: set for Wormhole. The user claims on `claim.chainId` and needs gas there. Show the `notices` with the offer.

`kind` is `"bridge"` between two chains and `"swap"` when both chain IDs are `8217`.

To show offers as each provider answers instead of waiting for all of them, send the same body to `POST /api/v1/quote/stream`. It returns server-sent events: one `offer` event per offer (`{ "offer": …, "total": … }`), then `complete` with the full response above.

## 4. Commit the chosen offer {#commit}

Send the offer the user picked, exactly as you received it:

```bash
curl -s "$BASE/api/v1/commit" -H "X-API-Key: $KEY" -H "Content-Type: application/json" \
  -d '<the chosen offer object from offers>'
```

Every provider returns the same shape:

```json
{
  "success": true,
  "adaptorId": "rhinofi",
  "swapId": "6b084fe06c7256127279b7d9",
  "approval": {
    "token": "0xd077a400968890eacc75cdc901f0356c943e4fdb",
    "spender": "0x92650ddc…",
    "amount": "25000000"
  },
  "transaction": {
    "to": "0x92650ddc…",
    "data": "0x…",
    "value": "0",
    "chainId": 8217
  },
  "claim": null
}
```

- `approval`: when present, the user must first allow `spender` to take `amount` of `token`. It's always the exact amount, never unlimited.
- `transaction`: what the user signs and sends on the source chain. `value` is in wei, as a decimal string; for Chainlink CCIP it includes the CCIP fee, paid in the native token. When the user sends a native coin (ETH, KAIA, BNB, …), there's no `approval` and `value` is the amount.
- `swapId`: with the transaction's hash, how you [track](#track) the transfer.
- `claim`: copied from the offer. Set for Wormhole.

A commit can be used once. If the user changes anything, get new offers. The API refuses an offer quoted without a receiver (`receiver_required`), a route your key doesn't allow (`route_not_allowed`), and swap offers, which need no commit.

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

// A wallet on the source chain (Kaia in this example). NonceManager keeps the
// approval and the transfer from reusing a nonce when they're sent back to back.
const wallet = new NonceManager(new Wallet(process.env.PRIVATE_KEY, new JsonRpcProvider(process.env.RPC_URL)));
const me = await wallet.getAddress();

// offer: the object the user chose from offers in step 3.
const commit = await fetch(`${API}/api/v1/commit`, { method: "POST", headers, body: JSON.stringify(offer) }).then((r) => r.json());
if (!commit.success) throw new Error(`${commit.error.code}: ${commit.error.message}`);

const { to, data, value, chainId } = commit.transaction;
if (Number((await wallet.provider.getNetwork()).chainId) !== chainId) throw new Error(`RPC_URL must be for chain ${chainId}`);

// 1. Approve the token first, if the provider needs it and the allowance is too low.
//    A native coin (ETH, KAIA, …) never needs one: approval is null and value is the amount.
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
const tx = await wallet.sendTransaction({ to, data, value: BigInt(value) });
console.log("Sent", tx.hash, "swapId", commit.swapId);
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

const API = "https://bridge-aggregator-api.kaia.io";
const headers = { "X-API-Key": process.env.KAIA_BRIDGE_API_KEY, "Content-Type": "application/json" };

// A wallet on the source chain (Kaia in this example).
const account = privateKeyToAccount(process.env.PRIVATE_KEY);
const publicClient = createPublicClient({ transport: http(process.env.RPC_URL) });
const walletClient = createWalletClient({ account, transport: http(process.env.RPC_URL) });

// offer: the object the user chose from offers in step 3.
const commit = await fetch(`${API}/api/v1/commit`, { method: "POST", headers, body: JSON.stringify(offer) }).then((r) => r.json());
if (!commit.success) throw new Error(`${commit.error.code}: ${commit.error.message}`);

const { to, data, value, chainId } = commit.transaction;
if ((await publicClient.getChainId()) !== chainId) throw new Error(`RPC_URL must be for chain ${chainId}`);

// 1. Approve the token first, if the provider needs it and the allowance is too low.
//    A native coin (ETH, KAIA, …) never needs one: approval is null and value is the amount.
if (commit.approval) {
  const { token, spender, amount } = commit.approval;
  const allowance = await publicClient.readContract({
    address: token, abi: erc20Abi, functionName: "allowance", args: [account.address, spender],
  });
  if (allowance < BigInt(amount)) {
    const approveHash = await walletClient.writeContract({
      chain: null, address: token, abi: erc20Abi, functionName: "approve", args: [spender, BigInt(amount)],
    });
    await publicClient.waitForTransactionReceipt({ hash: approveHash });
  }
}

// 2. Sign and send the transfer, then wait for it to be mined.
const hash = await walletClient.sendTransaction({ chain: null, to, data, value: BigInt(value) });
console.log("Sent", hash, "swapId", commit.swapId);
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

Use the commit's `swapId` and the hash of the transaction the user sent, for every provider:

```bash
curl -s "$BASE/api/v1/swap-status?adaptorId=<adaptorId>&swapId=<swapId>&txHash=<txHash>" -H "X-API-Key: $KEY"
```

`status` moves through `user_transfer_pending` → `in_progress` → `completed` or `failed`. `sourceTxHash` and `destinationTxHash` fill in as the transfer moves. Poll every few seconds until it's `completed` or `failed`. A transfer that needs a claim (Wormhole) stops at `ready_to_claim` until the user claims it.

Right after sending, the status may not be available yet. Wait a few seconds and ask again.

## 7. Claim a Wormhole transfer {#claim}

When the status is `ready_to_claim`, get the claim transaction:

```bash
curl -s "$BASE/api/v1/claim" -H "X-API-Key: $KEY" -H "Content-Type: application/json" \
  -d '{ "adaptorId": "wormhole", "swapId": "<swapId>", "txHash": "<source transaction hash>" }'
```

The response has the same shape as a commit, with `approval: null`. The user switches their wallet to `transaction.chainId`, then signs and sends `transaction`, paying the gas there. Track it with `swap-status` until it's `completed`. The API answers `400` if the transfer isn't signed by Wormhole yet or was already claimed.

This Node.js script waits for the transfer to be ready, gets the claim and sends it. Set `SWAP_ID` to the commit's `swapId` and `SOURCE_TX_HASH` to the deposit's transaction hash from step 5, and `DESTINATION_RPC_URL` to an RPC for the destination chain: the claim is sent there, not on the source chain. The script stops before sending if that RPC is for another chain.

<Tabs groupId="evm-library">
  <TabItem value="ethers" label="ethers v6" default>

```js
// npm install ethers
import { JsonRpcProvider, Wallet } from "ethers";

const API = "https://bridge-aggregator-api.kaia.io";
const headers = { "X-API-Key": process.env.KAIA_BRIDGE_API_KEY, "Content-Type": "application/json" };
const transfer = { adaptorId: "wormhole", swapId: process.env.SWAP_ID, txHash: process.env.SOURCE_TX_HASH };

// 1. Wait until Wormhole has signed the transfer (about 1 to 20 minutes).
for (;;) {
  const status = await fetch(`${API}/api/v1/swap-status?${new URLSearchParams(transfer)}`, { headers }).then((r) => r.json());
  if (status.success === false) throw new Error(`${status.error.code}: ${status.error.message}`);
  if (status.status === "ready_to_claim") break;
  if (status.status === "completed") { console.log("Already claimed"); process.exit(0); }
  if (status.status === "failed") throw new Error("The transfer failed");
  await new Promise((r) => setTimeout(r, 15_000));
}

// 2. Get the claim transaction for the destination chain.
const claim = await fetch(`${API}/api/v1/claim`, { method: "POST", headers, body: JSON.stringify(transfer) }).then((r) => r.json());
if (!claim.success) throw new Error(`${claim.error.code}: ${claim.error.message}`);

// 3. Send it from a wallet on the destination chain, which pays the gas there.
const { to, data, value, chainId } = claim.transaction;
const wallet = new Wallet(process.env.PRIVATE_KEY, new JsonRpcProvider(process.env.DESTINATION_RPC_URL));
if (Number((await wallet.provider.getNetwork()).chainId) !== chainId) {
  throw new Error(`DESTINATION_RPC_URL must be for chain ${chainId}`);
}

const tx = await wallet.sendTransaction({ to, data, value: BigInt(value) });
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
const transfer = { adaptorId: "wormhole", swapId: process.env.SWAP_ID, txHash: process.env.SOURCE_TX_HASH };

// 1. Wait until Wormhole has signed the transfer (about 1 to 20 minutes).
for (;;) {
  const status = await fetch(`${API}/api/v1/swap-status?${new URLSearchParams(transfer)}`, { headers }).then((r) => r.json());
  if (status.success === false) throw new Error(`${status.error.code}: ${status.error.message}`);
  if (status.status === "ready_to_claim") break;
  if (status.status === "completed") { console.log("Already claimed"); process.exit(0); }
  if (status.status === "failed") throw new Error("The transfer failed");
  await new Promise((r) => setTimeout(r, 15_000));
}

// 2. Get the claim transaction for the destination chain.
const claim = await fetch(`${API}/api/v1/claim`, { method: "POST", headers, body: JSON.stringify(transfer) }).then((r) => r.json());
if (!claim.success) throw new Error(`${claim.error.code}: ${claim.error.message}`);

// 3. Send it from a wallet on the destination chain, which pays the gas there.
const { to, data, value, chainId } = claim.transaction;
const transport = http(process.env.DESTINATION_RPC_URL);
const publicClient = createPublicClient({ transport });
const walletClient = createWalletClient({ account: privateKeyToAccount(process.env.PRIVATE_KEY), transport });
if ((await publicClient.getChainId()) !== chainId) {
  throw new Error(`DESTINATION_RPC_URL must be for chain ${chainId}`);
}

const hash = await walletClient.sendTransaction({ chain: null, to, data, value: BigInt(value) });
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

Each item in `claims` has `adaptorId`, `swapId` and `sourceTxHash`. Send them to `/claim` as `adaptorId`, `swapId` and `txHash`.

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

The offers have the same shape as bridge offers, with `needsCommit: false`. Each offer's `fees` includes Kaia's fee.

- **From KAIA**: the offer's `transaction` is ready. Send it.
- **From a token** such as USDT: if the allowance is too low, the offer has an `approval` for the exact amount, `transaction: null` and `requoteAfterApproval: true`. Send the approval, quote again, then send the new offer's `transaction`.

## Errors and limits {#errors-and-limits}

Every error has the same shape:

```json
{ "success": false, "error": { "code": "unauthorized", "message": "Invalid or revoked API key" } }
```

| Status | Common codes | What to do |
|--------|--------------|------------|
| 400 | `invalid_request`, `receiver_required`, `missing_swap_id` | Fix the request. `error.message` and `error.details` say what's wrong. |
| 401 | `unauthorized` | Check the `X-API-Key` header. |
| 403 | `route_not_allowed`, `feature_not_allowed` | The route or feature isn't in your access settings. Ask Kaia to change them. |
| 429 | | Too many requests: wait for the number of seconds in `RateLimit-Reset`, then retry. |
| 502 | `adaptor_error` | The provider couldn't start the transfer. Get new offers or pick another one. |

Every response has an `X-Request-ID` header. Include it when you report a problem to [ecosystem@kaia.io](mailto:ecosystem@kaia.io).

## Full example {#full-example}

One Node.js script that runs a whole transfer or swap. It checks the route, prints every offer and takes the best one (or the one named in `PROVIDER`). For a bridge, it commits the offer, approves the token if needed, sends the transfer, tracks it until it arrives, and claims it on the destination chain if it's a Wormhole transfer. For a swap on Kaia, it approves the token if needed, quotes again, and sends the swap. It uses a small amount by default; change `ROUTE` for another route: a native coin as `fromToken` (`0x0000…0000`, for example ETH on Ethereum to USDT on Kaia), or both chain IDs `8217` for a swap on Kaia.

<details>
<summary>Show the full Node.js script</summary>

<Tabs groupId="evm-library">
  <TabItem value="ethers" label="ethers v6" default>

```js
// npm install ethers
// KAIA_BRIDGE_API_KEY=… PRIVATE_KEY=… SOURCE_RPC_URL=… DESTINATION_RPC_URL=… node bridge.mjs
import { Contract, JsonRpcProvider, NonceManager, Wallet } from "ethers";

const API = "https://bridge-aggregator-api.kaia.io";
const headers = { "X-API-Key": process.env.KAIA_BRIDGE_API_KEY, "Content-Type": "application/json" };

// What to send: 5 USDT from Kaia to Polygon. For another route, replace ROUTE
// with one of the examples below it.
const ROUTE = {
  fromChainId: 8217, fromToken: "0xd077a400968890eacc75cdc901f0356c943e4fdb", // USDT on Kaia
  toChainId: 137, toToken: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", // USDT on Polygon
  amount: "5000000", // 5 USDT (6 decimals)
};
// A native coin is 0x0000…0000. It needs no approval; the transaction's value is the amount.
// const ROUTE = { // 0.02 ETH on Ethereum to USDT on Kaia
//   fromChainId: 1, fromToken: "0x0000000000000000000000000000000000000000",
//   toChainId: 8217, toToken: "0xd077a400968890eacc75cdc901f0356c943e4fdb", amount: "20000000000000000",
// };
// const ROUTE = { // 100 KAIA to Wormhole-wrapped KAIA on BNB Chain (claimed on BNB Chain)
//   fromChainId: 8217, fromToken: "0x0000000000000000000000000000000000000000",
//   toChainId: 56, toToken: "0xea970e7b7d131ea36c3051c9ca11e785462fe00c", amount: "100000000000000000000",
// };
// const ROUTE = { // swap on Kaia: 1 KAIA to USDT
//   fromChainId: 8217, fromToken: "0x0000000000000000000000000000000000000000",
//   toChainId: 8217, toToken: "0xd077a400968890eacc75cdc901f0356c943e4fdb", amount: "1000000000000000000",
// };
const PROVIDER = process.env.PROVIDER; // optional: use this provider's offer instead of the best one

const source = new NonceManager(new Wallet(process.env.PRIVATE_KEY, new JsonRpcProvider(process.env.SOURCE_RPC_URL)));
const me = await source.getAddress();

async function api(path, body) {
  const init = body ? { method: "POST", headers, body: JSON.stringify(body) } : { headers };
  const json = await fetch(`${API}${path}`, init).then((r) => r.json());
  if (json.success === false) throw new Error(`${path}: ${json.error.code}: ${json.error.message}`);
  return json;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Approve exactly what the API asks for, unless the allowance already covers it.
async function approveIfNeeded(wallet, { token, spender, amount }) {
  const erc20 = new Contract(token, [
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
  ], wallet);
  if ((await erc20.allowance(await wallet.getAddress(), spender)) >= BigInt(amount)) return;
  const tx = await erc20.approve(spender, amount);
  if ((await tx.wait()).status !== 1) throw new Error(`Approval reverted: ${tx.hash}`);
}

// Send a transaction from the API ({ to, data, value, chainId }) and wait for it to be mined.
async function send(wallet, { to, data, value, chainId }) {
  if (Number((await wallet.provider.getNetwork()).chainId) !== chainId) throw new Error(`Need an RPC for chain ${chainId}`);
  const tx = await wallet.sendTransaction({ to, data, value: BigInt(value) });
  console.log("Sent", tx.hash);
  if ((await tx.wait()).status !== 1) throw new Error(`Reverted: ${tx.hash}`);
  return tx.hash;
}

// 1. Check the route reaches the destination token (match by address, not symbol).
const { tokens } = await api(`/api/v1/tokens?chainId=${ROUTE.toChainId}&fromChainId=${ROUTE.fromChainId}&fromToken=${ROUTE.fromToken}&limit=200`);
if (!tokens.some((t) => t.address.toLowerCase() === ROUTE.toToken.toLowerCase())) throw new Error("No route to that token");

// 2. Get every provider's offer and pick one.
const getOffer = async () => {
  const { offers } = await api("/api/v1/quote", { ...ROUTE, sourceAddress: me, receiverAddress: me });
  for (const o of offers) console.log(`${o.adaptorId}: receive ${o.toAmount}${o.feeUsd ? `, fee $${o.feeUsd}` : ""}${o.durationSeconds ? `, about ${o.durationSeconds}s` : ""}`);
  const offer = PROVIDER ? offers.find((o) => o.adaptorId === PROVIDER) : offers[0];
  if (!offer) throw new Error(`No offer from ${PROVIDER}`);
  console.log("Using", offer.adaptorId);
  return offer;
};
let offer = await getOffer();

if (!offer.needsCommit) {
  // 3a. Swap on Kaia: the offer is ready to send.
  if (offer.approval) {
    await approveIfNeeded(source, offer.approval);
    if (offer.requoteAfterApproval) offer = await getOffer(); // now with the swap transaction
  }
  await send(source, offer.transaction);
  console.log("Done: swapped on Kaia.");
} else {
  // 3b. Bridge: commit, approve the token if needed, then send the transfer.
  const commit = await api("/api/v1/commit", offer);
  if (commit.approval) await approveIfNeeded(source, commit.approval);
  const txHash = await send(source, commit.transaction);

  // 4. Track the transfer: the same three values for every provider.
  const transfer = { adaptorId: commit.adaptorId, swapId: commit.swapId, txHash };
  let status;
  for (;;) {
    try {
      status = await api(`/api/v1/swap-status?${new URLSearchParams(transfer)}`);
      console.log("Status:", status.status);
      if (["completed", "failed", "ready_to_claim"].includes(status.status)) break;
    } catch (err) {
      console.log("Status not available yet:", err.message); // e.g. just sent: try again shortly
    }
    await sleep(15_000);
  }

  // 5. Wormhole only: claim on the destination chain, which pays the gas there.
  if (status.status === "ready_to_claim") {
    const claim = await api("/api/v1/claim", transfer);
    await send(new Wallet(process.env.PRIVATE_KEY, new JsonRpcProvider(process.env.DESTINATION_RPC_URL)), claim.transaction);
    status.status = "completed";
  }
  console.log(status.status === "completed" ? "Done: the tokens have arrived." : `Transfer ${status.status}`);
}
```

  </TabItem>
  <TabItem value="viem" label="viem">

```js
// npm install viem
// KAIA_BRIDGE_API_KEY=… PRIVATE_KEY=… SOURCE_RPC_URL=… DESTINATION_RPC_URL=… node bridge.mjs
import { createPublicClient, createWalletClient, erc20Abi, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const API = "https://bridge-aggregator-api.kaia.io";
const headers = { "X-API-Key": process.env.KAIA_BRIDGE_API_KEY, "Content-Type": "application/json" };

// What to send: 5 USDT from Kaia to Polygon. For another route, replace ROUTE
// with one of the examples below it.
const ROUTE = {
  fromChainId: 8217, fromToken: "0xd077a400968890eacc75cdc901f0356c943e4fdb", // USDT on Kaia
  toChainId: 137, toToken: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", // USDT on Polygon
  amount: "5000000", // 5 USDT (6 decimals)
};
// A native coin is 0x0000…0000. It needs no approval; the transaction's value is the amount.
// const ROUTE = { // 0.02 ETH on Ethereum to USDT on Kaia
//   fromChainId: 1, fromToken: "0x0000000000000000000000000000000000000000",
//   toChainId: 8217, toToken: "0xd077a400968890eacc75cdc901f0356c943e4fdb", amount: "20000000000000000",
// };
// const ROUTE = { // 100 KAIA to Wormhole-wrapped KAIA on BNB Chain (claimed on BNB Chain)
//   fromChainId: 8217, fromToken: "0x0000000000000000000000000000000000000000",
//   toChainId: 56, toToken: "0xea970e7b7d131ea36c3051c9ca11e785462fe00c", amount: "100000000000000000000",
// };
// const ROUTE = { // swap on Kaia: 1 KAIA to USDT
//   fromChainId: 8217, fromToken: "0x0000000000000000000000000000000000000000",
//   toChainId: 8217, toToken: "0xd077a400968890eacc75cdc901f0356c943e4fdb", amount: "1000000000000000000",
// };
const PROVIDER = process.env.PROVIDER; // optional: use this provider's offer instead of the best one

const account = privateKeyToAccount(process.env.PRIVATE_KEY);
const clients = (url) => ({
  read: createPublicClient({ transport: http(url) }),
  write: createWalletClient({ account, transport: http(url) }),
});
const source = clients(process.env.SOURCE_RPC_URL);
const me = account.address;

async function api(path, body) {
  const init = body ? { method: "POST", headers, body: JSON.stringify(body) } : { headers };
  const json = await fetch(`${API}${path}`, init).then((r) => r.json());
  if (json.success === false) throw new Error(`${path}: ${json.error.code}: ${json.error.message}`);
  return json;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Approve exactly what the API asks for, unless the allowance already covers it.
async function approveIfNeeded(c, { token, spender, amount }) {
  const allowance = await c.read.readContract({ address: token, abi: erc20Abi, functionName: "allowance", args: [me, spender] });
  if (allowance >= BigInt(amount)) return;
  const hash = await c.write.writeContract({ chain: null, address: token, abi: erc20Abi, functionName: "approve", args: [spender, BigInt(amount)] });
  if ((await c.read.waitForTransactionReceipt({ hash })).status !== "success") throw new Error(`Approval reverted: ${hash}`);
}

// Send a transaction from the API ({ to, data, value, chainId }) and wait for it to be mined.
async function send(c, { to, data, value, chainId }) {
  if ((await c.read.getChainId()) !== chainId) throw new Error(`Need an RPC for chain ${chainId}`);
  const hash = await c.write.sendTransaction({ chain: null, to, data, value: BigInt(value) });
  console.log("Sent", hash);
  if ((await c.read.waitForTransactionReceipt({ hash })).status !== "success") throw new Error(`Reverted: ${hash}`);
  return hash;
}

// 1. Check the route reaches the destination token (match by address, not symbol).
const { tokens } = await api(`/api/v1/tokens?chainId=${ROUTE.toChainId}&fromChainId=${ROUTE.fromChainId}&fromToken=${ROUTE.fromToken}&limit=200`);
if (!tokens.some((t) => t.address.toLowerCase() === ROUTE.toToken.toLowerCase())) throw new Error("No route to that token");

// 2. Get every provider's offer and pick one.
const getOffer = async () => {
  const { offers } = await api("/api/v1/quote", { ...ROUTE, sourceAddress: me, receiverAddress: me });
  for (const o of offers) console.log(`${o.adaptorId}: receive ${o.toAmount}${o.feeUsd ? `, fee $${o.feeUsd}` : ""}${o.durationSeconds ? `, about ${o.durationSeconds}s` : ""}`);
  const offer = PROVIDER ? offers.find((o) => o.adaptorId === PROVIDER) : offers[0];
  if (!offer) throw new Error(`No offer from ${PROVIDER}`);
  console.log("Using", offer.adaptorId);
  return offer;
};
let offer = await getOffer();

if (!offer.needsCommit) {
  // 3a. Swap on Kaia: the offer is ready to send.
  if (offer.approval) {
    await approveIfNeeded(source, offer.approval);
    if (offer.requoteAfterApproval) offer = await getOffer(); // now with the swap transaction
  }
  await send(source, offer.transaction);
  console.log("Done: swapped on Kaia.");
} else {
  // 3b. Bridge: commit, approve the token if needed, then send the transfer.
  const commit = await api("/api/v1/commit", offer);
  if (commit.approval) await approveIfNeeded(source, commit.approval);
  const txHash = await send(source, commit.transaction);

  // 4. Track the transfer: the same three values for every provider.
  const transfer = { adaptorId: commit.adaptorId, swapId: commit.swapId, txHash };
  let status;
  for (;;) {
    try {
      status = await api(`/api/v1/swap-status?${new URLSearchParams(transfer)}`);
      console.log("Status:", status.status);
      if (["completed", "failed", "ready_to_claim"].includes(status.status)) break;
    } catch (err) {
      console.log("Status not available yet:", err.message); // e.g. just sent: try again shortly
    }
    await sleep(15_000);
  }

  // 5. Wormhole only: claim on the destination chain, which pays the gas there.
  if (status.status === "ready_to_claim") {
    const claim = await api("/api/v1/claim", transfer);
    await send(clients(process.env.DESTINATION_RPC_URL), claim.transaction);
    status.status = "completed";
  }
  console.log(status.status === "completed" ? "Done: the tokens have arrived." : `Transfer ${status.status}`);
}
```

  </TabItem>
</Tabs>

</details>
