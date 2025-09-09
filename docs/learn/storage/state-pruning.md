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

Block states, or StateDB stores on-chain accounts and contracts in a trie data structure. The trie data structure is designed to store both obsolete and recent states so they can be verified using the Merkle hash. As transactions perform state changes, the state trie grows indefinitely. As of writing (Aug 2024), the Kaia Mainnet archive node size is over 20TB and even full node is over 10TB.

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