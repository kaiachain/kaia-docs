---
sidebar_label: Use the SDK
---

# Use the Kaia Bridge Aggregator SDK

[`@kaiachain/bridge-aggregator-sdk`](https://www.npmjs.com/package/@kaiachain/bridge-aggregator-sdk) is a typed TypeScript client for the [HTTP API](./http-api.md). Besides the API calls, it handles token approvals, signing, waiting for confirmation, tracking and Wormhole claims, so a whole transfer is one call.

## Install {#install}

```bash
npm install @kaiachain/bridge-aggregator-sdk ethers
```

Use version 0.3.0 or later. It runs on Node.js 18 or later and in any modern browser bundler. `ethers` (v6 or v5) is only needed for the built-in wallet adapter.

## Create a client {#create-a-client}

```ts
import { KaiaBridgeSDK } from "@kaiachain/bridge-aggregator-sdk";

const sdk = new KaiaBridgeSDK({
  apiKey: process.env.KAIA_BRIDGE_API_KEY, // secret: keep it on your server
  baseUrl: "https://bridge-aggregator-api.kaia.io", // QA: https://bridge-aggregator-api.qa.kaia.io
});
```

The API key is secret. In a browser app, point `baseUrl` at your own backend, have the backend add the `X-API-Key` header, and leave `apiKey` out. To get a key, see [Get a key](./kaia-bridge-aggregator.md#get-a-key).

## Connect a wallet {#connect-a-wallet}

The SDK signs through a small wallet adapter. One for ethers is built in:

```ts
import { BrowserProvider, JsonRpcProvider, Wallet } from "ethers";
import { createEthersWalletAdapter } from "@kaiachain/bridge-aggregator-sdk";

// In a browser: the user's wallet
const wallet = createEthersWalletAdapter(await new BrowserProvider(window.ethereum).getSigner());

// On a server: a private key
const wallet = createEthersWalletAdapter(new Wallet(process.env.PRIVATE_KEY!, new JsonRpcProvider(RPC_URL)));
```

For viem, wagmi or another library, implement the five methods of `EVMWalletAdapter`: `getChainId`, `getAddress`, `sendTransaction`, `readContract` and `estimateGas`. TON routes use a `TONWalletAdapter` around TON Connect's `sendTransaction`.

## Bridge tokens {#bridge}

```ts
const ETHEREUM = 1;
const KAIA = 8217;
const ETH_USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const KAIA_USDT = "0xd077a400968890eacc75cdc901f0356c943e4fdb";
const me = await wallet.getAddress();

// What can Ethereum USDT become on Kaia? Match by address: symbols aren't unique.
const { tokens } = await sdk.getTokens(KAIA, { fromChainId: ETHEREUM, fromToken: ETH_USDT });
const kaiaUsdt = tokens.find((t) => t.address?.toLowerCase() === KAIA_USDT)!;

// Every provider's offer for 100 USDT (6 decimals, so "100000000")
const result = await sdk.getQuote({
  fromChainId: ETHEREUM,
  toChainId: KAIA,
  fromToken: ETH_USDT,
  toToken: kaiaUsdt.address!,
  amount: "100000000",
  sourceAddress: me,   // both addresses are needed to go ahead
  receiverAddress: me,
});

if (result.kind === "bridge") {
  for (const offer of result.bridge.allQuotes ?? [result.bridge.quote]) {
    console.log(offer.adaptorId, offer.toAmountWei, `$${offer.feeInUsd}`, `${offer.durationSeconds}s`);
  }

  // Commit → approve if needed → send → track until completed or failed
  const { finalStatus } = await sdk.executeBridge(result.bridge.quote, wallet, {
    onApprovalRequired: () => console.log("Approve the token in your wallet"),
    onTxSent: ({ hash }) => console.log("Sent", hash),
  });
  console.log(finalStatus?.status); // "completed"
}
```

Pass any offer from `allQuotes` to `executeBridge` to use that provider instead of the best one. Before committing, `executeBridge` checks the wallet is on the source chain (`ChainMismatchError` otherwise) and that the transaction won't fail (`GasEstimationError`), so nothing is sent in those cases.

To sign somewhere else (a custody service, a multisig, your own UI), run the steps yourself:

```ts
const commit = await sdk.commitQuote(result.bridge.quote); // can be used once
if (commit.approval) {
  // approve commit.approval.amount of commit.approval.token for commit.approval.spender
}
const tx = sdk.getEVMTransaction(commit, ETHEREUM); // { chainId, to, value, data }
// … sign and send tx …
const final = await sdk.pollUntilComplete(commit.swapId!, commit.adaptorId);
```

For a TON source chain, use `sdk.getTONTransaction(commit)` with TON Connect.

## Claim a Wormhole transfer {#claim}

A Wormhole transfer is two transactions: the deposit on the source chain, then a claim on the destination chain once Wormhole has signed it (about a minute from Kaia, BNB Chain or Polygon; about 20 minutes from Ethereum, Arbitrum or Base). The user pays the claim's gas on the destination chain. Before the user commits, show the offer's `claim` (destination chain) and `notices`.

```ts
const { finalStatus, claimRequired } = await sdk.executeBridge(offer, wallet);

if (finalStatus?.status === "ready_to_claim" && claimRequired) {
  await switchChain(claimRequired.chainId); // with your wallet library
  const { claimTxHash } = await sdk.claim(claimRequired.swapId, "wormhole", wallet);
}
```

For Wormhole, the `swapId` is the source transaction hash. To show transfers still waiting to be claimed (after a reload, or on another device):

```ts
const { claims } = await sdk.getPendingClaims(me);
```

## Swap tokens on Kaia {#swap-on-kaia}

When both chain IDs are `8217`, `result.kind` is `"swap"` and there's no commit step. Pass the quotes and the original request to `executeSwap`:

```ts
const request = {
  fromChainId: 8217,
  toChainId: 8217,
  fromToken: "0x0000000000000000000000000000000000000000", // native KAIA
  toToken: "0xd077a400968890eacc75cdc901f0356c943e4fdb", // USDT on Kaia
  amount: "1000000000000000000", // 1 KAIA
  sourceAddress: me,
};
const result = await sdk.getQuote(request);
if (result.kind === "swap") {
  const { txHash } = await sdk.executeSwap(result.swap.quotes, wallet, { request });
}
```

If the token needs an approval first, `executeSwap` sends it, gets a new quote, then swaps.

## Don't leave users waiting {#confirmation}

Some wallets never report that a transaction was mined. Give the SDK RPC endpoints you trust and it also checks the chain itself, so your app doesn't wait on a transaction that already went through:

```ts
await sdk.executeBridge(offer, wallet, {
  confirmation: { rpcUrls: { 1: ["https://your-ethereum-rpc"], 8217: ["https://public-en.node.kaia.io"] } },
});
```

If nothing confirms within 10 minutes, the SDK throws `TxNotConfirmedError`. The transaction was sent, so don't offer "try again": show an explorer link instead.

## Handle errors {#errors}

Every error is a typed class you can check with `instanceof`:

```ts
import { TxNotConfirmedError, WalletRejectedError, RateLimitedError } from "@kaiachain/bridge-aggregator-sdk";

try {
  await sdk.executeBridge(offer, wallet);
} catch (err) {
  if (err instanceof WalletRejectedError) return; // the user said no; nothing was sent
  if (err instanceof TxNotConfirmedError) return showExplorerLink(err.chainId, err.hash);
  if (err instanceof RateLimitedError) return retryAfter(err.retryAfterMs);
  throw err;
}
```

| Error | When |
|-------|------|
| `WalletRejectedError` | The user rejected a wallet prompt. |
| `ChainMismatchError` | The wallet is on the wrong chain. Nothing was committed or sent. |
| `GasEstimationError` | The transaction would fail, so it wasn't sent. |
| `TxNotConfirmedError` | Sent, but not confirmed within the time limit. It may still confirm. |
| `RouteNotAllowedError` | The route isn't in your key's access settings. |
| `RouteNotSupportedError` | No provider can quote this route. |
| `QuoteExpiredError` | The offer expired. Get a new quote. |
| `RateLimitedError` | Too many requests. `retryAfterMs` says when to retry. |
| `ApiError` | Any other API error. Has `code`, `message` and `requestId`. |

API errors carry the request's `requestId`. Include it when you contact [ecosystem@kaia.io](mailto:ecosystem@kaia.io).

## More {#more}

- **Show offers as they arrive:** `sdk.streamQuotes(request, { onQuote, onComplete, onError })`.
- **Full reference:** every method and option is documented in the package (`docs/` folder) and on [npm](https://www.npmjs.com/package/@kaiachain/bridge-aggregator-sdk).
- **Runnable examples:** the package's `examples/` folder has scripts for discovering routes, Kaia ↔ Polygon, TON ↔ Kaia and swaps on Kaia.
