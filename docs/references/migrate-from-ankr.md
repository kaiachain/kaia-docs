---
title: Migrate from Ankr
sidebar_label: Migrate from Ankr
---

# Migrate from Ankr

:::caution Sunset notice

Kaia support on **Ankr** ends on **October 16, 2026**. After that date, all Ankr RPC endpoints pointing to Kaia chains are decommissioned and stop responding.

If your app sends Kaia RPC calls to Ankr, switch to another provider before the sunset date. For most projects this is a one-line endpoint change — see [Choose an alternative](#choose-an-alternative).

:::

## What is changing

Ankr is retiring its Kaia RPC service. This affects the endpoints only — nothing about Kaia itself changes.

| Date | What happens |
| --- | --- |
| **October 16, 2026** | All Ankr RPC endpoints for Kaia chains are decommissioned. Requests stop returning data. |
| After the sunset | Kaia is no longer available through Ankr. Existing API keys and plans no longer serve Kaia traffic. |

**What is not affected:**

* Kaia Mainnet (8217) and Kairos Testnet (1001) themselves
* Your contracts, addresses, balances, and on-chain history
* Any part of your app that does not call Ankr

Every RPC provider serves the same chain data. Pointing your app at a different endpoint returns the same results.

## Are you affected?

You are affected if any of the following is true:

* Your app, scripts, or CI send Kaia JSON-RPC calls to a host under `rpc.ankr.com`.
* A wallet config, hardhat/foundry network entry, or SDK provider URL in your project names Ankr.
* A dependency, indexer, dashboard, or analytics job in your stack reads Kaia through Ankr.

A quick way to check your codebase:

```bash
grep -rn "ankr" --include="*.ts" --include="*.js" --include="*.json" --include="*.toml" --include="*.yaml" --include="*.yml" --include="*.env*" .
```

Also check the places that grep will not reach: deployment environment variables, CI/CD secrets, serverless function configs, and any RPC URL saved in a wallet or hosted dashboard.

You are **not** affected if you already use the Kaia Foundation public endpoints or another provider.

:::tip Do this before October 16, 2026

While your Ankr account is still active:

* Note the Ankr endpoints and API keys your project uses, so you can find every place that needs updating.
* Export any usage or analytics data you want to keep from the Ankr dashboard.
* Cancel your Ankr subscription once you have cut over, so you are not billed for a service you no longer use.

:::

## Choose an alternative

All of the options below serve Kaia today. Because they all speak the same JSON-RPC interface, migrating is a URL change rather than a code change.

| | [Alchemy](https://www.alchemy.com/rpc/kaia) **(Recommended)** | [QuickNode](https://www.quicknode.com/docs/kaia) | [All That Node](https://www.allthatnode.com/) | [dRPC](https://drpc.org/) | Kaia Foundation |
| --- | --- | --- | --- | --- | --- |
| **Hosting** | Managed | Managed | Managed | Managed | Public, community-run |
| **API key required** | Yes | Yes | Yes | No, for public endpoints | No |
| **Migration effort** | Swap the URL | Swap the URL | Swap the URL | Swap the URL | Swap the URL |
| **Best for** | Most migrations | Production apps wanting a dedicated endpoint | Teams wanting node plus faucet tooling | Fastest start, no signup | Development and testing |

Capabilities such as archive history and the `debug` / `trace` namespaces differ by provider and by plan. Check the provider's own documentation for what your workload needs before you commit — the links in the table header are the authoritative source for each.

**Alchemy is the recommended replacement** for most teams moving off Ankr: it is a managed endpoint with a free tier, dashboards, and the same one-line URL swap.

If you just want to confirm a cutover works before signing up anywhere, dRPC's public endpoints need no account, so you can point at one and test immediately.

You can also [run your own endpoint node](../nodes/endpoint-node/endpoint-node.md) if you would rather not depend on a hosted provider at all.

## Option 1: Alchemy (recommended)

1. Create an app at [alchemy.com](https://www.alchemy.com/rpc/kaia) and select Kaia.
2. Copy the endpoint, which has the form `https://kaia-mainnet.g.alchemy.com/v2/<api-key>`. WebSocket is available at `wss://kaia-mainnet.g.alchemy.com/v2/<api-key>`.
3. Replace your Ankr URL with it, keeping the key in an environment variable.

```js
// Before
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/kaia");

// After
const provider = new ethers.JsonRpcProvider(`https://kaia-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
```

## Option 2: dRPC

No account needed to start.

| Network | Endpoint |
| --- | --- |
| Kaia Mainnet | `https://kaia.drpc.org` |
| Kairos Testnet | `https://kaia-kairos.drpc.org` |

```js
const provider = new ethers.JsonRpcProvider("https://kaia.drpc.org");
```

For higher rate limits, create a key at [drpc.org](https://drpc.org/) and use your dedicated endpoint URL instead.

## Option 3: QuickNode

1. Create an endpoint at [quicknode.com](https://www.quicknode.com/docs/kaia) and choose Kaia Mainnet or Kairos Testnet.
2. Copy the HTTP and WSS URLs QuickNode generates for your endpoint.
3. Replace your Ankr URL with it.

## Option 4: All That Node

1. Create an account at [allthatnode.com](https://www.allthatnode.com/) and add a Kaia node.
2. Copy the endpoint URL from the dashboard.
3. Replace your Ankr URL with it.

## Option 5: Kaia Foundation public endpoints

Provided for the community for testing and development. Uptime and stability are not guaranteed, so do not use them for commercial purposes — see [Public JSON RPC Endpoints](./public-en.md) for the full list and the terms.

| Network | Endpoint |
| --- | --- |
| Kaia Mainnet | `https://public-en.node.kaia.io` |
| Kaia Mainnet (archive) | `https://archive-en.node.kaia.io` |
| Kairos Testnet | `https://public-en-kairos.node.kaia.io` |
| Kairos Testnet (archive) | `https://archive-en-kairos.node.kaia.io` |

## Cutover checklist

- [ ] Found every Ankr reference in the codebase with the `grep` above
- [ ] Updated deployment environment variables
- [ ] Updated CI/CD secrets and pipeline configs
- [ ] Updated serverless function and container configs
- [ ] Updated RPC URLs saved in wallets, dashboards, and monitoring tools
- [ ] Checked that indexers, bots, and analytics jobs use the new endpoint
- [ ] Told any third party that consumes your endpoint
- [ ] Verified the new endpoint against a known block before cutting over production
- [ ] Watched error rates and latency for 24 hours after the switch
- [ ] Cancelled the Ankr subscription

A quick way to confirm a new endpoint is live and on the right chain:

```bash
curl -s -X POST <YOUR_NEW_ENDPOINT> \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

Expect `"result":"0x2019"` for Kaia Mainnet (8217) or `"result":"0x3e9"` for Kairos Testnet (1001).

## FAQs

**Do I need to redeploy my contracts?**
No. Contracts live on Kaia, not on Ankr. Nothing on-chain changes.

**Will my app lose transaction history?**
No. History is on-chain. Any provider reads the same data, though querying very old state needs an archive endpoint.

**Do I have to change my code?**
Usually only the endpoint URL. The JSON-RPC interface is the same across providers.

**Can I use more than one provider?**
Yes, and it is a good idea for production. Configure a fallback endpoint so a single provider outage does not take your app down.

**What if I miss the date?**
Your Kaia RPC calls to Ankr start failing. Switching to another endpoint restores service immediately — there is nothing to recover or migrate beyond the URL.

**Where do I get help?**
The [Kaia Developer Forum](https://devforum.kaia.io) and the [Kaia Discord](https://discord.gg/kaiachain).

## Next steps

* [Public JSON RPC Endpoints](./public-en.md) — the full list of Kaia RPC providers and endpoints
* [Run an endpoint node](../nodes/endpoint-node/endpoint-node.md) — operate your own RPC infrastructure
* [JSON-RPC API reference](./json-rpc/references.md) — the API surface your provider serves
