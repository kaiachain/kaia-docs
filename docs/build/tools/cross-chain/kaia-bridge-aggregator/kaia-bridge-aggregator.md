---
sidebar_label: Overview
---

# Kaia Bridge Aggregator

## Introduction {#introduction}

The Kaia Bridge Aggregator moves tokens to and from Kaia through one integration. It asks several bridge providers at once (Rhino.fi, Layerswap, RocketX, [Chainlink CCIP](../chainlink-ccip.md) and [Wormhole](../wormhole.md)), shows every provider's offer for a route, and gives you the transaction to sign. For swaps between two tokens on Kaia, it uses Swapscanner.

With it you can:

- list the chains and tokens that have a live route to or from Kaia;
- compare offers from every provider: amount received, fee in USD and estimated time;
- get a ready-to-sign transaction for the user's wallet;
- track a transfer until it arrives, including the claim step for Wormhole.

Every route starts or ends on Kaia. The aggregator never holds funds: users sign each transfer with their own wallet, and the provider they choose moves the tokens.

## Choose how to use it {#choose-how-to-use-it}

| You want to | Use | Guide |
|-------------|-----|-------|
| Show a bridge on your website with no code to write | The embeddable widget (an iframe) | [Embed the widget](./widget.md) |
| Build bridging into a TypeScript or JavaScript app or backend | The TypeScript SDK | [Use the SDK](./sdk.md) |
| Call it from any other language or service | The HTTP API | [Use the HTTP API](./http-api.md) |

The SDK and the widget both use the same HTTP API underneath, so the chains, tokens and offers are the same in all three.

## Get a key {#get-a-key}

Email [ecosystem@kaia.io](mailto:ecosystem@kaia.io) with your project name and the routes you need. Kaia sets up your access (which providers, chains and tokens your app can use, and your rate limit) and sends you a key.

There are two kinds of key:

| Key | Looks like | Where it goes | Used by |
|-----|------------|---------------|---------|
| **API key** | `kaia_…` | Your server only. It's secret. | The HTTP API and the SDK, in the `X-API-Key` header |
| **Widget key** | `kaia_pk_…` | Your web page. It's public. | The widget only, and only on the websites you listed |

Never put an API key in a web page or a mobile app. If your frontend needs the API, send the calls through your own backend and add the key there.

## Environments {#environments}

| Environment | API | Widget |
|-------------|-----|--------|
| Production | `https://bridge-aggregator-api.kaia.io` | `https://bridge-aggregator.kaia.io/widget` |
| QA | `https://bridge-aggregator-api.qa.kaia.io` | `https://bridge-aggregator-qa.kaia.io/widget` |

QA uses its own keys. The interactive API reference, with every parameter and response, is at [bridge-aggregator-api.kaia.io/api-docs](https://bridge-aggregator-api.kaia.io/api-docs/).

## How a transfer works {#how-a-transfer-works}

1. **Pick chains.** List the chains that have a route to or from Kaia.
2. **Pick tokens.** List the tokens that can leave the source chain, then what the chosen token can become on the destination chain. Only tokens with a live route are listed.
3. **Get offers.** Ask for a quote. You get every provider's offer in the same shape, best first; let the user choose.
4. **Commit.** Lock in the chosen offer. You get the transaction to sign, and a token approval first if the provider needs one.
5. **Sign and send.** The user signs with their wallet.
6. **Track.** Check the transfer's status until it's `completed` or `failed`.
7. **Claim (Wormhole only).** A Wormhole transfer stops at `ready_to_claim`. The user then sends a second transaction, the claim, on the destination chain and pays its gas there.

A swap between two tokens on Kaia skips the commit step: the offer already contains the transaction to sign (and the approval, if one is needed).

## Supported chains {#supported-chains}

Kaia is always one side of the route. By default the other side can be Ethereum, BNB Chain, Polygon, Arbitrum, Base, Optimism or Avalanche; Kaia can offer more chains as providers add routes. Your key's settings can narrow the list. Ask the API for the current list rather than hard-coding it.

## Good to know {#good-to-know}

- **Token symbols aren't unique.** One chain can have two tokens called `USDT`. Identify tokens by chain ID and address, never by symbol. Kaia's issuer-listed tokens (for example USDT and USDC on Kaia) are marked `official`.
- **Offers expire, and a commit can be used once.** If the user changes the amount or route, or waits too long, get a new quote.
- **Providers have minimums.** Very small amounts may get no offers from some providers. Around $50 or more usually gets offers from all of them.
- **Wormhole takes two transactions.** The claim can be sent about a minute after the deposit from Kaia, BNB Chain or Polygon, and about 20 minutes after it from Ethereum, Arbitrum or Base.
- **Need help?** Every API response has an `X-Request-ID` header. Include it when you contact [ecosystem@kaia.io](mailto:ecosystem@kaia.io).
