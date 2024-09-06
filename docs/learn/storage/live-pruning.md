# State Live Pruning

State Live Pruning is a new solution to the growing state database size problem. Unlike [Batch Pruning (State Migration)](../state-migration/), Live Pruning automatically deletes old states little by little as the node process blocks.

## Motivation

Block states, or StateDB stores on-chain accounts and contracts in a trie data structure. The trie data structure is designed to store both obsolete and recent states so they can be verified using the Merkle hash. As transactions perform state changes, the state trie grows indefinitely. As of writing (Aug 2024), the Kaia Mainnet archive node size is over 20TB and even full node is over 10TB.

Previously the State Migration has mitigated this problem by deleting old states by selectively copying the recent states and deleting the rest. This can reduce the full node size to less than 5TB.

Nonetheless, the State Migration has its own drawbacks. It suffers from from high overhead of traversing the entire state trie which could take a few days. Also the state migration has to be manually triggered. To overcome these limitations, Live Pruning technique was introduced.

## Concept

Trie pruning is hard because it is uncertain if a trie node is outdated or not. In the original state trie structure, a trie node can be part of multiple tries each constitutes a different block. Even if a trie node (e.g. account balance) is updated to another value, the trie node cannot be deleted because it could be still needed by other parent nodes. This issue is referred to as the hash duplication problem.

The Live Pruning intentionally duplicates the trie nodes with the same content. Under Live Pruning, a trie node is not referenced by its hash, instead it is referenced by its ExtHash. An ExtHash is the 32-byte hash of the content plus a 7-byte serial index. The serial index is monotonically increasing, so that every trie node is unique.

```
Hash:    32-byte Keccak256
ExtHash: 32-byte Keccak256 + 7-byte Serial index
```

This way, whenever a trie node's content change, it is safe to assume that the trie node is now obsolete. The Merkle hash can be calculated the same way by just ignoring the serial index, make it compatible with non-live-pruning nodes in terms of consensus.

Read this blog article for more technical details: [Efficient Management of Blockchain Data Capacity with StateDB Live Pruning](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91).

## How to

To start a live pruning from genesis, specify `--state.live-pruning` flag to the node. If you start with the live pruning enabled database, then the flag is not necessary, yet you can still put the flag for your clarity.

Note that Database with and without live pruning are incompatible. To start a node with live pruning enabled, you must either start from genesis with live pruning flag or start from a live pruning [chaindata snapshot](../chaindata-snapshot). You cannot convert non-live-pruning database to live-pruning and vice versa.

```sh
# First time enabling live pruning with an empty database
INFO[08/27,14:09:01 +09] [41] Writing live pruning flag to database

# Live pruning enabled
INFO[08/27,14:09:01 +09] [41] Live pruning is enabled     retention=172800

# Live pruning disabled
INFO[08/27,14:09:46 +09] [41] Live pruning is disabled because flag not stored in database

# Cannot turn on live pruning after the chain has advanced (head block num > 0)
Fatal: Error starting protocol stack: cannot enable live pruning after chain has advanced
```

You can control how long the live pruning will ratain past states using the `--state.live-pruning-retention NNN (default: 172800)` flag. It keeps the last 48 hours worth of block states by default.