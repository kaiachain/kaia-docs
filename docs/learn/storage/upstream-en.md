# Link full node to archive node (Upstream EN)

The Upstream EN feature allows a full node operator to utilize an archive node as an RPC fallback. You can learn about full vs. archive node [here](../block-sync).

When the full node is about to return a `missing trie node` error, it tries to call the specified upstream RPC URL and return that result. If you configure an archive node as upstream, then the full node essentially serve archive-grade service with a minimal archive node load.

## How to

To use Upstream EN feature, simply pass `--upstream-en <RPC_URL>` flag to the full node. For example in your `kend.conf` file,

```sh
ADDITIONAL="$ADDITIONAL --upstream-en https://archive-en.node.kaia.io"
```

## Usage

Using Upstream EN feature, you can operate a cost-effective archive RPC service. Run one archive node and run many full nodes. Make the full nodes fall back to the archive node. This way, most requests are handled by full nodes and some requests that require historic states are handled by the archive node.

<p align="center"><img src="/img/learn/upstream_en.png" width="50%"/></p>