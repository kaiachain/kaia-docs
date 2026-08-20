# Indexers

Blockchain indexers are tools used in the context of blockchain technology to improve the efficiency and speed of searching, querying, and accessing data stored on a blockchain. They create and maintain organized databases of the blockchain's data, allowing users to quickly retrieve information without needing to process the entire blockchain from scratch.

:::caution The Graph sunsets on Kaia on August 31, 2026

Kaia support on [The Graph](https://thegraph.com/) ends on **August 31, 2026**. After that date, Kaia subgraphs stop indexing and their query endpoints stop returning data. If your dapp depends on one, see **[Migrate from The Graph](./migrate-from-the-graph.md)** — your subgraph code carries over to Goldsky, SubQuery, or a self-hosted graph-node without changes.

:::

The following providers have integrated with Kaia to deliver blockchain indexing services:

| Provider | Kaia networks | Notes |
| --- | --- | --- |
| [Goldsky](./goldsky.md) | Mainnet, Kairos | Managed subgraphs plus Mirror data streaming. Compatible with the subgraph spec, so existing subgraphs migrate with a single CLI command. |
| [SubQuery](./subquery.md) | Mainnet, Kairos | Multi-chain indexing in a single project, with managed and decentralized network hosting. |
| [The Graph](./thegraph.md) | Mainnet, Kairos — **until August 31, 2026** | Sunsetting on Kaia. See [Migrate from The Graph](./migrate-from-the-graph.md). |

You can also run [graph-node](https://github.com/graphprotocol/graph-node) yourself against a Kaia archive RPC endpoint if you would rather operate your own indexing infrastructure.
