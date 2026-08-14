---
title: Migrate from The Graph
sidebar_label: Migrate from The Graph
---

# Migrate from The Graph

:::caution Sunset notice

Kaia support on **The Graph** ends on **August 31, 2026**. After that date, Kaia subgraphs stop indexing and their query endpoints stop returning data. If your dapp reads from a Kaia subgraph on The Graph, migrate to another indexer before **August 31, 2026** to avoid downtime.

:::

## What is changing

Kaia Mainnet (8217) and Kairos Testnet (1001) are currently supported on The Graph, where indexing for Kaia subgraphs is served by the Upgrade Indexer. That support ends on **August 31, 2026**.

| Date | What happens |
| --- | --- |
| **August 31, 2026** | Kaia subgraphs stop indexing. Query endpoints on The Graph's gateway stop returning Kaia data. |
| After the sunset | Kaia is no longer a deployable network in Subgraph Studio. `graph deploy` for Kaia fails. |

Nothing on-chain changes. Kaia Mainnet and Kairos, your contracts, and your event history are unaffected — only the hosted indexing service goes away. Any indexer that reads a Kaia RPC endpoint can rebuild the same data.

## Are you affected?

You are affected if any of the following is true:

* Your app queries a URL on `gateway.thegraph.com` or `gateway-arbitrum.network.thegraph.com` that points at a Kaia subgraph.
* Your app queries a Kaia subgraph endpoint from Subgraph Studio (`api.studio.thegraph.com/query/...`).
* You deploy Kaia subgraphs with `graph deploy --studio` or publish them to The Graph's decentralized network.
* A dependency, dashboard, or analytics job in your stack reads from one of those endpoints.

A quick way to check your codebase:

```bash
grep -rn "thegraph.com" --include="*.ts" --include="*.js" --include="*.json" --include="*.env*" .
```

You are **not** affected if you index Kaia with Goldsky, SubQuery, a self-hosted graph-node, or by reading a Kaia RPC endpoint directly.

## Choose an alternative

All three options below index Kaia Mainnet and Kairos today.

| | [Goldsky](./goldsky.md) | [SubQuery](./subquery.md) | Self-hosted graph-node |
| --- | --- | --- | --- |
| **Runs existing subgraphs** | Yes — same subgraph spec | Yes — via IPFS deployment ID | Yes — it *is* graph-node |
| **Migration effort** | One CLI command | Publish an existing build | Provision your own infra |
| **Hosting** | Managed | Managed or decentralized network | You operate it |
| **Also offers** | Mirror (stream to your DB), RPC, pipelines | Multi-chain indexing in one project | Full control |
| **Best for** | Fastest drop-in replacement | Multi-chain projects, decentralized hosting | Teams that want no vendor dependency |

**If you want the shortest path, use Goldsky.** Goldsky is fully compatible with The Graph's subgraph specification, so an existing Kaia subgraph moves over without changing your mappings, schema, or queries — only the endpoint URL in your app changes.

## Option 1: Migrate to Goldsky

### 1. Get your subgraph's IPFS hash

Query your existing subgraph endpoint on The Graph before the sunset date:

```graphql
query {
  _meta {
    deployment
  }
}
```

The `deployment` value is your IPFS hash. You can also copy it as the **Deployment ID** from your subgraph's page in [Graph Explorer](https://thegraph.com/explorer) or Subgraph Studio.

:::tip Do this before August 31

Pull the IPFS hash for every Kaia subgraph you own now and save it. It is much easier to collect while your endpoints still respond.

:::

### 2. Install and authenticate the Goldsky CLI

```bash
# macOS / Linux
curl https://goldsky.com | sh

# Windows
npm install -g @goldskycom/cli
```

Create an API key under **Project Settings** at [app.goldsky.com](https://app.goldsky.com), then:

```bash
goldsky login
```

For CI or headless environments:

```bash
goldsky login --token <API_KEY>
```

### 3. Redeploy the subgraph

```bash
goldsky subgraph deploy <your-subgraph-name>/<version> --from-ipfs-hash <your-subgraph-ipfs-hash>
```

Goldsky pulls the same subgraph build and starts indexing Kaia from your configured start block.

If you prefer to deploy from your source repository instead, run `goldsky subgraph deploy <name>/<version>` from the project directory — see [Deploying subgraphs](https://docs.goldsky.com/subgraphs/deploying-subgraphs).

### 4. Wait for the sync and switch your endpoint

Track progress with:

```bash
goldsky subgraph list
```

Once the subgraph has caught up to chain head, replace the gateway URL in your app with the Goldsky query endpoint:

```diff
- const queryUrl = 'https://gateway.thegraph.com/api/<api-key>/subgraphs/id/<subgraph-id>';
+ const queryUrl = 'https://api.goldsky.com/api/public/<project-id>/subgraphs/<name>/<version>/gn';
```

Your GraphQL queries do not change. For a full walkthrough of building a Kaia subgraph on Goldsky from scratch, see [Goldsky](./goldsky.md).

## Option 2: Migrate to SubQuery

SubQuery can run an existing subgraph build, and also supports its own SDK for multi-chain projects.

1. Get the **Deployment ID** (IPFS CID) from Graph Explorer, or build one locally against SubQuery's IPFS gateway:

   ```bash
   graph build -i https://unauthipfs.subquery.network/ipfs/api/v0
   ```

2. Open the [SubQuery Explorer](https://explorer.subquery.network) and select **Publish New Project**.
3. Enter the CID plus your project metadata, then publish.

Note that the SubQuery Network does not support GraphQL subscriptions. See [Publishing your Subgraph project to the SubQuery Network](https://subquery.network/doc/subquery_network/architects/publish-subgraph.html) and the [Kaia quick start](https://subquery.network/doc/indexer/quickstart/quickstart_chains/kaia.html), or the [SubQuery](./subquery.md) page for Kaia-specific starters.

## Option 3: Self-host graph-node

Your subgraph is portable. You can run [graph-node](https://github.com/graphprotocol/graph-node) yourself against a Kaia archive RPC endpoint and keep your mappings, schema, and queries exactly as they are.

You will need a Kaia RPC endpoint (see [Public endpoints](../../../references/public-en.md) or run [your own node](../../../nodes/endpoint-node/endpoint-node.md)), plus PostgreSQL and IPFS. This gives you full control and no vendor dependency, at the cost of operating the infrastructure yourself.

## Cutover checklist

- [ ] List every Kaia subgraph your team owns, including internal dashboards and analytics jobs.
- [ ] Save the IPFS hash / Deployment ID for each one **before August 31, 2026**.
- [ ] Save the start block and any grafting configuration for each subgraph.
- [ ] Deploy each subgraph to your chosen provider.
- [ ] Wait for each subgraph to sync to chain head.
- [ ] Compare a few known queries against both endpoints and confirm the results match.
- [ ] Update endpoint URLs and API keys in your app, environment variables, and CI secrets.
- [ ] Update any third-party integrations or partners that consume your subgraph endpoint.
- [ ] Deploy your app and confirm production traffic reads from the new endpoint.
- [ ] Cancel The Graph billing or API keys that are only used for Kaia.

## FAQs

**Does this affect my smart contracts or on-chain data?**
No. Only the hosted indexing service is going away. Your contracts, transactions, and event logs on Kaia are unchanged and remain fully queryable by any indexer.

**Do I have to rewrite my subgraph?**
No. Goldsky, SubQuery, and self-hosted graph-node all run the standard subgraph spec. Your `schema.graphql`, mappings, and GraphQL queries carry over.

**What happens to my subgraph on The Graph after August 31, 2026?**
It stops indexing Kaia and its query endpoint stops returning Kaia data. Migrate before that date to avoid downtime.

**Will queries for other chains still work?**
Yes. This only affects Kaia. Subgraphs you run on other networks through The Graph are unaffected.

**Is Kaia recommending one provider?**
No. Goldsky is the fastest drop-in path because of one-command migration, but SubQuery and self-hosted graph-node are equally valid. Pick what fits your stack.

**I need help migrating.**
Reach out on the [Kaia Developer Forum](https://devforum.kaia.io) or the Kaia Discord. If you run a large or complex subgraph, contact the Kaia team early so we can help you plan the cutover.

## Next steps

* [Goldsky](./goldsky.md) — deploy a Kaia subgraph, step by step
* [SubQuery](./subquery.md) — multi-chain indexing on Kaia
* [Indexers overview](./indexers.md) — all indexing options on Kaia
