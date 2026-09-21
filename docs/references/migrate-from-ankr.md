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

All of the providers below serve Kaia today. Because they all speak the same JSON-RPC interface, migrating is a URL change rather than a code change.

| | [Alchemy](https://www.alchemy.com/rpc/kaia) **(Recommended)** | [QuickNode](https://www.quicknode.com/docs/kaia) | [All That Node](https://www.allthatnode.com/) | [dRPC](https://drpc.org/) | Kaia Foundation |
| --- | --- | --- | --- | --- | --- |
| **Hosting** | Managed | Managed | Managed | Managed | Public, community-run |
| **API key required** | Yes | Yes | Yes | No, for public endpoints | No |
| **Migration effort** | Swap the URL | Swap the URL | Swap the URL | Swap the URL | Swap the URL |
| **Best for** | Most migrations | Production apps wanting a dedicated endpoint | Teams wanting node plus faucet tooling | Fastest start, no signup | Development and testing |

Capabilities such as archive history and the `debug` / `trace` namespaces differ by provider and by plan. Check the provider's own documentation for what your workload needs before you commit — the links in the table header are the authoritative source for each.

**Alchemy is the recommended replacement** for most teams moving off Ankr: it is a managed endpoint with a free tier, dashboards, and the same one-line URL swap.

If you just want to confirm a cutover works before signing up anywhere, dRPC's public endpoints need no account, so you can point at one and test immediately.

For endpoint URLs, and for the full list of RPC providers serving Kaia, see [Public JSON RPC Endpoints](./public-en.md). Sign up with the provider you pick, then replace the Ankr URL in your app with the endpoint it gives you.

You can also [run your own endpoint node](../nodes/endpoint-node/endpoint-node.md) if you would rather not depend on a hosted provider at all.
