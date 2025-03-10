# Prune Node Data

This page explains how to delete historical block states to reduce the storage requirement. Kaia offers two approaches for pruning block states:

- [Live Pruning](../../learn/storage/state-pruning.md#state-live-pruning): With the live pruning feature enabled, the block states beyond a certain retention period will be automatically deleted.
- [Batch Pruning: State Migration](../../learn/storage/state-pruning.md#state-batch-pruning-state-migration): The block states can be state-migrated, meaning the block states before a certain block number become available.

## Understanding Pruning Impacts

"Live pruning" continuously deletes old states, keeping disk size at a minimum. However, due to accompanying bookkeeping tasks, live pruning slightly slows down block sync speed. "Batch pruning", on the other hand, does not affect performance after migration is complete, but a migration session takes a few days and temporarily requires large free disk space to copy the states.

## How to Perform Live Pruning

To enable live pruning from the genesis block, use the `--state.live-pruning` flag when starting your node. If you're starting from a database where live pruning is already enabled, the flag is optional but recommended for clarity.

:::note

You can control the retention period for live pruning using the `--state.live-pruning-retention NNN` flag (default: 172800 seconds, that is 48 hours). This flag determines how long historical block states are kept before being pruned.

:::

:::info

Databases with and without live pruning are incompatible. To run a node with live pruning, you must either start from the genesis block with the `--state.live-pruning` flag or start from a [chaindata snapshot](./chaindata-snapshot.md) that already has live pruning enabled.

You cannot convert a non-live-pruning database to a live-pruning database, and vice versa. Here are some example log messages you might see:

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

:::

## How to Perform Batch Pruning

### Prerequisites

- Recommended to run on a machine with m6i.8xlarge (32 cores and 128GB memory) or higher specs.
- The machine should have enough spare disk space (500GB or more).
- The entire process takes approximately 7 days to complete:
  - Stage 1: Copy (migrate) the state to a new directory. The message "State migration is completed" appears.
  - Stage 2: Block sync continues on the new directory. The old directory will be deleted after this step.

### Steps

1. Attach to the node via console:

```sh
ken attach --datadir /var/kend/data
```

2. Use the `admin` namespace RPCs to control state migration:

```js
// Start
> admin.startStateMigration()
null

// Check progress
> admin.stateMigrationStatus

// Abort
> admin.stopStateMigration()
```