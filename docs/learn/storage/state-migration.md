# State Batch Pruning (State Migration)

State Migration is a batch pruning feature that can be applied to existing node without interrupting the running node.

## Motivation

Block states, or StateDB stores on-chain accounts and contracts in a trie data structure. The trie data structure is designed to store both obsolete and recent states so they can be verified using the Merkle hash. As transactions perform state changes, the state trie grows indefinitely. As of writing (Aug 2024), the Kaia Mainnet archive node size is over 20TB and even full node is over 10TB.

## Concept

State Migration deletes old block states that are not required for processing new blocks. It copies the state trie from "old" to "new". Not all trie nodes are copied. The ones are reacheable from state roots of selective blocks are copied. After the copying, old directory is deleted so you are only left with the states of the selected blocks.

Read these blog articles for more technical details:
[Kaia v1.5.0 State Migration: Saving Node Storage](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a)
[Kaia State Migration: An Efficient Way to Reduce Blockchain Data](https://medium.com/klaytn/klaytn-state-migration-an-efficient-way-to-reduce-blockchain-data-6615a3b36523)

## How to

- Recommended to run on a machine with m6i.8xlarge (32 cores and 128GB memory) or higher spec.
- The machine should have enough (500GB or more) spare disk space.
- It takes 7 days for full progress.
  - Part 1 - Copy (migrate) to the new directory. The message "State migration is completed" appears.
  - Part 2 - Block sync continues on the new directory. Old directory will be deleted after this.

Attach to the node via console:

```sh
ken attach --datadir /var/kend/data
```

The State Migration feature is controlled by admin namespace RPCs.

```js
// Start
> admin.startStateMigration()
null

// Check progress
> admin.stateMigrationStatus

// Abort
> admin.stopStateMigration()
```
