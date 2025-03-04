# Block Synchronization

Block synchronization is the process of updating a node with the latest blocks and states from the Kaia blockchain. Node operators can choose from various synchronization methods based on their hardware specifications and service requirements.

## Full Sync

Full sync is the default synchronization method in Kaia, activated by either using the `--syncmode full` flag or omitting the flag altogether. This method involves downloading and executing every block (header and transactions) from p2p peers to generate the block states.

### State Persistence Options

While Full Sync processes every block, Kaia provides flexibility in how much state data is persistently stored on disk. This allows node operators to balance data accessibility with storage capacity. The following diagram illustrates these options:

![Block sync options](/img/learn/block_sync.png)

- **Archive Mode**: This mode persists every block state to disk. To enable it, use the `--gcmode archive` flag. Nodes operating in this mode are referred to as **Archive Nodes**.
- **Full Mode**: This mode persists block states at specific intervals to optimize disk usage. To enable it, use the `--gcmode full` flag or omit the `--gcmode` flag altogether. Nodes operating in this mode are referred to as **Full Nodes**. Don't confuse this with the general "full sync" method.

In a full node, block states are persisted to disk every multiple of the number specified by `--state.block-interval NNN` (default: 128). Also the block states of the recent `--state.tries-in-memory NNN` (default: 128) blocks are kept in memory to serve APIs. Therefore, block states are available only when it is a multiple of block interval or recently processed.

```js
// State available
> eth.getBalance('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 150000000)
735000000000002

// State absent
> eth.getBalance('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 150000001)
Error: missing trie node 64380a8de7bd83a6421c9ad45ae596a0eebbc7b504d061f4a57c61742eadc804 (path )
	at web3.js:6812:9(39)
	at send (web3.js:5223:62(29))
	at <eval>:1:15(4)
```

:::info

Applications should not assume a fixed block interval of 128. While it's the default, nodes can be configured to use different intervals.

:::

#### Choosing the Right Option

Applications typically need access to the latest state data, including nonces, balances, and contract storage. While apps and developers may occasionally utilize debug tracing APIs for historical blocks, these blocks can generally be recreated by re-executing transactions from the nearest stored state (e.g., up to 127 blocks prior under the default block interval). Therefore, running a full node is a cost-effective choice for most applications.

However, data analysis often requires using an archive node. It's important to note that even when querying historical consensus data, such as validator information or rewards, an archive node is still required. This is because consensus data is derived from the state of the blockchain at specific block heights.

To summarize:

- Full Node: Suitable for most applications requiring access to the latest state data and occasional historical data access via tracing APIs.
- Archive Node: Essential for applications requiring comprehensive historical state access, such as data analysis tools.

### Hybrid Option: Upstream EN

If your node mostly serves the latest data but occasionally serves historic data, then try the [Upstream EN](../../misc/operation/upstream-en.md) feature. This feature allows you to balance the storage requirements of an archive node with the performance of a full node.

## Chaindata Snapshot

Chaindata snapshots offer a faster alternative to Full Sync. A snapshot is a compressed archive (e.g. `.tar.gz` file) of a synced node's data directory. Downloading and extracting a snapshot allows a new node to quickly catch up to the blockchain without processing every block individually. See [Use Chaindata Snapshots](../../misc/operation/chaindata-snapshot.md) for more information.

## Snap Sync

Currently, Kaia nodes do not support the [Snap Sync](https://geth.ethereum.org/docs/fundamentals/sync-modes) method. However, using a chaindata snapshot provides a comparable advantage in terms of faster initial synchronization.