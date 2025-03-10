# Configure Upstream Archive Node: Upstream EN

The Upstream EN (Endpoint Node) feature allows a full node operator to utilize an archive node as an RPC fallback. For more information about full and archive nodes, see the [Block Synchronization](../../learn/storage/block-sync.md) page.

When a full node is about to return a `missing trie node` error, it tries to call the specified upstream RPC URL and return that result. If you configure an archive node as the upstream, the full node essentially serves archive-grade service with minimal archive node load.

## Usage

Using Upstream EN feature, you can operate a cost-effective archive RPC service. Run one archive node and run many full nodes. Make the full nodes fall back to the archive node. This way, most requests are handled by full nodes and some requests that require historic states are handled by the archive node.

<p align="center"><img src="/img/learn/upstream_en.png" width="50%"/></p>

## How to Enable Upstream EN

To use Upstream EN feature, simply pass `--upstream-en <RPC_URL>` flag to the full node. For example in your `kend.conf` file,

```sh
ADDITIONAL="$ADDITIONAL --upstream-en https://archive-en.node.kaia.io"
```