# State Migration

As more blocks are added to the blockchain, chain data also pile up. Chain data are necessary for node operation, so they are stored in the node storage as a data structure called trie, and ultimately in a database called LevelDB. So with more blocks, comes more chain data in the storage, along with increasing cost. Kaia, therefore, provides a feature called State Migration that allows you to reduce the amount of required storage space.

State Migration targets state tries, which comprise most of the chain data. It deletes state trie nodes that are not required for processing new blocks. It only leaves the state trie nodes that are reachable from the state trie root of a specific block. After State Migration, you are only left with the latest data required for node synchronization, consisting of state trie nodes of the target block as well as newly added blocks.

Note that a node can't read old states from blocks previous to the target block after State Migration. In other words, you can't return the balance from an old block number using the `kaia_getBalance` API.

More details on the mechanism of State Migration can be found below:
[Kaia v1.5.0 State Migration: Saving Node Storage](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a)
[Kaia State Migration: An Efficient Way to Reduce Blockchain Data](https://medium.com/klaytn/klaytn-state-migration-an-efficient-way-to-reduce-blockchain-data-6615a3b36523)

To use State Migration, please refer to [`Chaindata Migration`](../../misc/operation/chaindata-migration.md) page of Operation Guide.