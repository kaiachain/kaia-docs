---
sidebar_label: Kaia Bridge Aggregator
---

# Kaia Bridge Aggregator

## Introduction <a id="introduction"></a>

The Kaia Bridge Aggregator is one API for moving tokens to and from Kaia. It queries several bridge providers at once (RhinoFi, Layerswap, RocketX and [Chainlink CCIP](./chainlink-ccip.md)), returns every provider's offer for a route, and gives you the transaction to sign. Your app integrates once instead of once per bridge.

With it you can:

- list the chains and tokens that have a live route to or from Kaia, including TON;
- compare quotes from every provider (amount received, fee in USD, estimated time);
- get a ready-to-sign transaction for EVM wallets or TON Connect;
- track a transfer until it completes.

Every route starts or ends on Kaia. The aggregator doesn't hold funds: users sign each transfer with their own wallet, and the chosen provider moves the tokens.

## Get an API key <a id="get-an-api-key"></a>

The API needs a partner key, sent as the `X-API-Key` header. Each key has its own configuration: which providers, chains and tokens your app can use, and its rate limit. To request one, email [ecosystem@kaia.io](mailto:ecosystem@kaia.io) with your project name and the routes you need.

Keep the key on your server. If your frontend calls the aggregator, proxy those calls through your backend.

| Environment | Base URL |
|-------------|----------|
| Production | `https://bridge-aggregator-api.kaia.io` |
| QA | `https://bridge-aggregator-api.qa.kaia.io` |

## How a transfer works <a id="how-a-transfer-works"></a>

1. **Pick chains.** `GET /api/v1/chains` lists every chain with a route to or from Kaia. Add `fromChainId` to list only the chains reachable from a source chain.
2. **Pick tokens.** `GET /api/v1/tokens?chainId=<source>` lists the tokens that can leave the source chain. `GET /api/v1/tokens?chainId=<destination>&fromChainId=<source>&fromToken=<address>` lists what that token can become on the destination chain. Lists include only tokens with a live route, with popular tokens first.
3. **Quote.** `POST /api/v1/quote` returns the best offer and every provider's offer. Show them and let the user choose.
4. **Commit.** `POST /api/v1/commit` locks the chosen offer and returns the transaction to sign (and a token approval, if needed).
5. **Sign and track.** The user signs and sends the transaction. Poll `GET /api/v1/swap-status` until the transfer is `completed` or `failed`.

A same-chain swap on Kaia (both chain IDs `8217`) skips the commit step: the quote already contains the transactions to sign.

## Use the TypeScript SDK <a id="use-the-typescript-sdk"></a>

[`@kaiachain/bridge-aggregator-sdk`](https://www.npmjs.com/package/@kaiachain/bridge-aggregator-sdk) wraps the API with types and helpers for signing and polling. It needs Node.js 18 or later and is ESM only.

```bash
npm install @kaiachain/bridge-aggregator-sdk
```

```ts
import { KaiaBridgeSDK } from "@kaiachain/bridge-aggregator-sdk";

const sdk = new KaiaBridgeSDK({
  apiKey: process.env.KAIA_BRIDGE_API_KEY!,
  baseUrl: "https://bridge-aggregator-api.kaia.io",
});

const ETHEREUM = 1;
const KAIA = 8217;
const ETH_USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

// What can Ethereum USDT become on Kaia?
const { tokens } = await sdk.getTokens(KAIA, { fromChainId: ETHEREUM, fromToken: ETH_USDT });
const kaiaUsdt = tokens.find((t) => t.symbol === "USDT")!;

// Every provider's offer for 25 USDT (6 decimals)
const result = await sdk.getQuote({
  fromChainId: ETHEREUM,
  toChainId: KAIA,
  fromToken: ETH_USDT,
  toToken: kaiaUsdt.address!,
  amount: "25000000",
  sourceAddress: "0xYourWallet",
  receiverAddress: "0xYourWallet",
});

if (result.kind === "bridge") {
  for (const offer of result.bridge!.allQuotes ?? [result.bridge!.quote]) {
    console.log(offer.adaptorId, offer.toAmountWei, `$${offer.feeInUsd}`, `${offer.durationSeconds}s`);
  }

  // Lock the chosen offer and get the transaction to sign
  const commit = await sdk.commitQuote(result.bridge!.quote);
  const tx = sdk.getEVMTransaction(commit, ETHEREUM); // { chainId, to, value, data }
  // Send tx with your wallet (viem, ethers, wagmi…), then:
  const final = await sdk.pollUntilComplete(commit.swapId!, commit.adaptorId);
  console.log(final.status); // "completed"
}
```

For one call that commits, approves, sends and polls, use `sdk.executeBridge(quote, wallet)` with a wallet adapter. For TON sources, use `sdk.getTONTransaction(commit)` with TON Connect.

## Use the HTTP API <a id="use-the-http-api"></a>

Any language can call the API directly. The interactive reference, with every parameter and response, is at [bridge-aggregator-api.kaia.io/api-docs](https://bridge-aggregator-api.kaia.io/api-docs/). The raw OpenAPI document is at `/api-docs.json` if you want to generate a client.

```bash
curl -s "https://bridge-aggregator-api.kaia.io/api/v1/tokens?chainId=8217&fromChainId=1&fromToken=0xdAC17F958D2ee523a2206206994597C13D831ec7" \
  -H "X-API-Key: $KAIA_BRIDGE_API_KEY"
```

Amounts are strings in the token's smallest unit (25 USDT with 6 decimals is `"25000000"`). Tokens are identified by address, never by symbol; native tokens use `0x0000000000000000000000000000000000000000`. TON uses chain ID `-1`.

## Good to know <a id="good-to-know"></a>

- **Symbols aren't unique.** One chain can list two tokens called `USDT`. Store and compare tokens by chain ID and address.
- **Quotes expire and commits are single-use.** If the user changes the amount or route, or waits too long, quote again.
- **Errors share one shape:** `{ "success": false, "error": { "code", "message" } }`. Every response has an `X-Request-ID` header; include it when you ask for help.
- **Rate limits are per key.** A `429` response has `RateLimit-Reset` (seconds until you can retry).
