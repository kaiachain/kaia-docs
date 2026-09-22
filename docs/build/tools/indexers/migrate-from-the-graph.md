---
title: Migrate from The Graph
sidebar_label: Migrate from The Graph
---

# Migrate from The Graph

Kaia support on **The Graph** ended on **August 31, 2026**. Kaia subgraphs no longer index, their query endpoints no longer return Kaia data, and Kaia is no longer a deployable network in Subgraph Studio.

If your dapp still points at a Kaia subgraph on The Graph, move it to [Goldsky](./goldsky.md), [SubQuery](./subquery.md), or a self-hosted graph-node. Your subgraph code carries over unchanged.

## What happened

The Graph retired its Kaia support. This affected the hosted indexing service only.

| | |
| --- | --- |
| **August 31, 2026** | Kaia subgraphs stopped indexing. Query endpoints on The Graph's gateway stopped returning Kaia data. |
| **Now** | Kaia is no longer a deployable network in Subgraph Studio. `graph deploy` for Kaia fails. |

**Nothing on-chain changed.** Kaia Mainnet (8217) and Kairos Testnet (1001), your contracts, and your full event history are unaffected. Any indexer that reads a Kaia RPC endpoint can rebuild exactly the same data from genesis — no history was lost, and nothing needs recovering on-chain.

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

If any of these apply, those queries are already failing. Migrating restores service.

You are **not** affected if you index Kaia with Goldsky, SubQuery, a self-hosted graph-node, or by reading a Kaia RPC endpoint directly.

## Choose an alternative

All three options below index Kaia Mainnet and Kairos.

| | [Goldsky](./goldsky.md) | [SubQuery](./subquery.md) | Self-hosted graph-node |
| --- | --- | --- | --- |
| **Runs existing subgraphs** | Yes — same subgraph spec | Yes — via IPFS deployment ID | Yes — it *is* graph-node |
| **Migration effort** | One CLI command | Publish an existing build | Provision your own infra |
| **Hosting** | Managed | Managed or decentralized network | You operate it |
| **Also offers** | Mirror (stream to your DB), RPC, pipelines | Multi-chain indexing in one project | Full control |
| **Best for** | Fastest drop-in replacement | Multi-chain projects, decentralized hosting | Teams that want no vendor dependency |

**If you want the shortest path, use Goldsky.** Goldsky is fully compatible with The Graph's subgraph specification, so an existing Kaia subgraph moves over without changing your mappings, schema, or queries — only the endpoint URL in your app changes.

:::tip Deploy from source, not from an IPFS hash

Migration guides for The Graph usually start by reading your subgraph's deployment hash off its live query endpoint. That is no longer possible for Kaia subgraphs, because those endpoints have stopped responding.

Deploy from your subgraph's source repository instead. It needs no deployment ID, produces an identical build, and is the reliable path now. Only fall back to an IPFS hash if you saved one earlier or can still read it from your subgraph's page in [Graph Explorer](https://thegraph.com/explorer) or Subgraph Studio.

:::

## Option 1: Migrate to Goldsky

### 1. Install and authenticate the Goldsky CLI

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

### 2. Deploy the subgraph from source

From your subgraph project directory:

```bash
goldsky subgraph deploy <your-subgraph-name>/<version>
```

Goldsky builds from your `subgraph.yaml`, `schema.graphql`, and mappings, then starts indexing Kaia from your configured start block. See [Deploying subgraphs](https://docs.goldsky.com/subgraphs/deploying-subgraphs) for the full reference.

If you still have the IPFS hash for a previous build, you can deploy that exact build instead:

```bash
goldsky subgraph deploy <your-subgraph-name>/<version> --from-ipfs-hash <your-subgraph-ipfs-hash>
```

### 3. Wait for the sync and switch your endpoint

Track progress with:

```bash
goldsky subgraph list
```

Re-indexing Kaia history from your start block takes time — plan for it rather than expecting an instant cutover. Once the subgraph has caught up to chain head, replace the gateway URL in your app:

```diff
- const queryUrl = 'https://gateway.thegraph.com/api/<api-key>/subgraphs/id/<subgraph-id>';
+ const queryUrl = 'https://api.goldsky.com/api/public/<project-id>/subgraphs/<name>/<version>/gn';
```

Your GraphQL queries do not change. For a full walkthrough of building a Kaia subgraph on Goldsky from scratch, see [Goldsky](./goldsky.md).

## Option 2: Migrate to SubQuery

SubQuery can run an existing subgraph build, and also supports its own SDK for multi-chain projects.

1. Build your subgraph against SubQuery's IPFS gateway to produce a Deployment ID (CID):

   ```bash
   graph build -i https://unauthipfs.subquery.network/ipfs/api/v0
   ```

   If you saved a Deployment ID from Graph Explorer before the sunset, you can use that instead.

2. Open the [SubQuery Explorer](https://explorer.subquery.network) and select **Publish New Project**.
3. Enter the CID plus your project metadata, then publish.

Note that the SubQuery Network does not support GraphQL subscriptions. See [Publishing your Subgraph project to the SubQuery Network](https://subquery.network/doc/subquery_network/architects/publish-subgraph.html) and the [Kaia quick start](https://subquery.network/doc/indexer/quickstart/quickstart_chains/kaia.html), or the [SubQuery](./subquery.md) page for Kaia-specific starters.

## Option 3: Self-host graph-node

Your subgraph is portable. You can run [graph-node](https://github.com/graphprotocol/graph-node) yourself against a Kaia archive RPC endpoint and keep your mappings, schema, and queries exactly as they are.

You will need a Kaia RPC endpoint (see [Public endpoints](../../../references/public-en.md) or run [your own node](../../../nodes/endpoint-node/endpoint-node.md)), plus PostgreSQL and IPFS. This gives you full control and no vendor dependency, at the cost of operating the infrastructure yourself.

## Cutover checklist

- [ ] List every Kaia subgraph your team owns, including internal dashboards and analytics jobs.
- [ ] Locate the source repository for each one, plus its start block and any grafting configuration.
- [ ] Deploy each subgraph to your chosen provider.
- [ ] Wait for each subgraph to sync to chain head.
- [ ] Compare a few known queries against the new endpoint and confirm the results look right.
- [ ] Update endpoint URLs and API keys in your app, environment variables, and CI secrets.
- [ ] Update any third-party integrations or partners that consume your subgraph endpoint.
- [ ] Deploy your app and confirm production traffic reads from the new endpoint.
- [ ] Cancel The Graph billing or API keys that were only used for Kaia.

## FAQs

**Does this affect my smart contracts or on-chain data?**
No. Only the hosted indexing service went away. Your contracts, transactions, and event logs on Kaia are unchanged and remain fully queryable by any indexer.

**Do I have to rewrite my subgraph?**
No. Goldsky, SubQuery, and self-hosted graph-node all run the standard subgraph spec. Your `schema.graphql`, mappings, and GraphQL queries carry over.

**I never saved my subgraph's deployment ID. Is my subgraph lost?**
No. The deployment ID identifies a build, not your data. Deploy from your source repository and your new indexer rebuilds the same dataset from the chain.

**I no longer have the subgraph source either.**
The indexed data can still be rebuilt, but the mappings and schema have to be written again. Start from the [Goldsky](./goldsky.md) guide, using your contract ABIs and the block your contract was deployed at.

**Will queries for other chains still work?**
Yes. This only affected Kaia. Subgraphs you run on other networks through The Graph are unaffected.

**Is Kaia recommending one provider?**
No. Goldsky is the fastest drop-in path because of one-command migration, but SubQuery and self-hosted graph-node are equally valid. Pick what fits your stack.

**I need help migrating.**
Reach out on the [Kaia Developer Forum](https://devforum.kaia.io) or the Kaia Discord. If you run a large or complex subgraph, contact the Kaia team so we can help you plan the cutover.

## Next steps

* [Goldsky](./goldsky.md) — deploy a Kaia subgraph, step by step
* [SubQuery](./subquery.md) — multi-chain indexing on Kaia
* [Indexers overview](./indexers.md) — all indexing options on Kaia
