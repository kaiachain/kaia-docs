# Storage Optimization

As the Kaia blockchain grows, so does the storage required to store the chain data. Kaia implements two main techniques to manage this growing storage requirement:

## State Batch Pruning (State Migration)

State Migration is a batch pruning feature that can be applied to existing node without interrupting the running node.

### Motivation

Block states, or StateDB stores on-chain accounts and contracts in a trie data structure. The trie data structure is designed to store both obsolete and recent states so they can be verified using the Merkle hash. As transactions perform state changes, the state trie grows indefinitely. As of writing (Aug 2024), the Kaia Mainnet archive node size is over 20TB and even full node is over 10TB.

### Concept

State Migration deletes old block states that are not required for processing new blocks. It copies the state trie from "old" to "new". Not all trie nodes are copied. The ones are reachable from state roots of selective blocks are copied. After the copying, old directory is deleted so you are only left with the states of the selected blocks.

Read these blog articles for more technical details:
[State Migration: Saving Node Storage](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a),
[Kaia State Migration: An Efficient Way to Reduce Blockchain Data](https://medium.com/klaytn/klaytn-state-migration-an-efficient-way-to-reduce-blockchain-data-6615a3b36523)

For how to perform Batch Pruning, see the [State Migration Guide](../../misc/operation/node-pruning.md#how-to-perform-batch-pruning).

## State Live Pruning

State Live Pruning is a new solution to the growing state database size problem. Unlike Batch Pruning (State Migration), Live Pruning automatically deletes old states little by little as the node process blocks.

### Motivation

Block states, or StateDB stores on-chain accounts and contracts in a trie data structure. The trie data structure is designed to store both obsolete and recent states so they can be verified using the Merkle hash. As transactions perform state changes, the state trie grows indefinitely. As of writing (Aug 2025), the Kaia Mainnet archive node size is over 20TB and even full node is over 10TB.

Previously the State Migration has mitigated this problem by deleting old states by selectively copying the recent states and deleting the rest. This can reduce the full node size to less than 5TB.

Nonetheless, the State Migration has its own drawbacks. It suffers from high overhead of traversing the entire state trie which could take a few days. Also the state migration has to be manually triggered. To overcome these limitations, Live Pruning technique was introduced.

### Concept

Trie pruning is hard because it is uncertain if a trie node is outdated or not. In the original state trie structure, a trie node can be part of multiple tries each constitutes a different block. Even if a trie node (e.g. account balance) is updated to another value, the trie node cannot be deleted because it could be still needed by other parent nodes. This issue is referred to as the hash duplication problem.

The Live Pruning intentionally duplicates the trie nodes with the same content. Under Live Pruning, a trie node is not referenced by its hash, instead it is referenced by its ExtHash. An ExtHash is the 32-byte hash of the content plus a 7-byte serial index. The serial index is monotonically increasing, so that every trie node is unique.

```
Hash:    32-byte Keccak256
ExtHash: 32-byte Keccak256 + 7-byte Serial index
```

This way, whenever a trie node's content change, it is safe to assume that the trie node is now obsolete. The Merkle hash can be calculated the same way by just ignoring the serial index, make it compatible with non-live-pruning nodes in terms of consensus.

Read this blog article for more technical details: [Efficient Management of Blockchain Data Capacity with StateDB Live Pruning](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91).

For how to enable Live Pruning, see the [Live Pruning Guide](../../misc/operation/node-pruning.md#how-to-perform-live-pruning).

## Data Compression

Data compression reduces the storage size of block data by applying LevelDB's built-in Snappy compression algorithm to selected database tables.

### Motivation

Block data—consisting of headers, transaction bodies, and receipts—often contains highly repetitive byte sequences due to ABI encoding standards in EVM transactions. For example, Solidity's ABI encoding uses zero-padding to satisfy 32-byte word alignment, resulting in transaction call data with long runs of zeros. Transaction receipts exhibit similar patterns in event logs and return values.

Despite this natural redundancy, Kaia's underlying LevelDB storage engine was not utilizing compression by default, allowing repetitive data to consume disk space unnecessarily. As of July 2025, a Kaia Mainnet full node occupied over 4.2TB of storage, with approximately 3.6TB attributed to uncompressed block data.

### Concept

Kaia v2.1.0 activates LevelDB's Snappy compression algorithm with selective application to database tables. The `--db.leveldb.compression` flag enables granular control:
- Headers, bodies, and receipts are compressed (high redundancy, significant savings)
- State trie data is excluded (appears random, minimal compression benefit)

For existing nodes, manually triggering database compaction rewrites old uncompressed data in compressed format. This "housekeeping" process merges SSTables, reconciles deletions, and applies compression as a side effect.

**Results:** Mainnet full nodes see approximately 50% total storage reduction (~2TB savings), with most gains in the body and receipts tables. The process takes about 10 hours and can run concurrently with normal block processing.

Read this blog article for more technical details: [How Kaia v2.1 Reclaimed 2TB Through Compression]().

For how to enable compression, see the [Optimize Node Storage guide](../../misc/operation/optimize-storage.md#database-compression).

## FlatTrie State Scheme (Experimental)

FlatTrie is an experimental state storage scheme that drastically reduces archive node state database size by restructuring how historical account states are stored.

### Motivation

Archive nodes must retain complete historical state data for all accounts at all block heights, enabling time-travel queries and comprehensive blockchain analytics. This creates a dramatically different storage profile than full nodes: as of August 2025, a Kaia Mainnet archive node requires over 35TB of disk space, with 31TB (89%) consumed by the state database.

The traditional Merkle Patricia Trie (MPT) structure stores both account data (leaves) and intermediate branch nodes that form the Merkle tree. Archive nodes historically maintained complete MPTs for multiple block heights, causing intermediate nodes—which convey no account data themselves—to accumulate indefinitely.

Existing storage optimizations like [State Migration](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a) (batch pruning) and [StateDB Live Pruning](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91) fundamentally require deleting historical data, making them inapplicable to archive nodes that must preserve complete history.

### Concept

FlatTrie is an experimental state storage scheme adapted from the [Erigon Ethereum client](https://github.com/erigontech/erigon/). It restructures state storage by:

- Storing historical account states in flat key-value tables (simple address → account data mappings)
- Maintaining only the latest block's complete MPT with all intermediate branch nodes
- Reconstructing historical Merkle roots on-demand by temporarily building only necessary branch nodes

This approach eliminates the persistent storage of historical intermediate nodes while preserving complete account state history and the ability to verify Merkle roots for any block.

**Adaptation challenges:** Erigon's implementation assumes Ethereum's account structure. Kaia uses a different RLP encoding to support unique features like human-readable addresses and multiple key types. The integration required modifying Erigon's Merkle hashing module to treat accounts as opaque bytestrings, along with creating three adapter layers (DomainsManager, WriteBuffer, DeferredContext) to bridge Kaia's multi-threaded Trie interface with Erigon's single-threaded MDBX database requirements.

**Results:** In Kairos testnet experiments, FlatTrie archive nodes consumed approximately 75% less total storage than traditional archive nodes, with state database size reduced by over 80%. Similar savings are projected for Mainnet archive nodes (from ~35TB to ~10TB).

**Limitations:** The experimental v2.1.0 implementation does not support block rewinding (`debug_setHead` API), Merkle proof generation (`eth_getProof` API), or state pruning features. These restrictions stem from FlatTrie's design choice to discard historical branch nodes.

Read this blog article for more technical details: [Kaia’s Experimental FlatTrie for Archive Nodes](#).

For how to enable FlatTrie, see the [Optimize Node Storage guide](../../misc/operation/optimize-storage.md#flattrie-state-scheme-experimental).
