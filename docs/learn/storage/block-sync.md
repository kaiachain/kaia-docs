#  Block sync

Block sync is a process of following up the latest blocks and states. Node operators can choose from various methods that best fits the machine spec and service requirements.

## Full sync

Full sync generates the block states by downloading every block (header and transactions) and executing it. The blocks are downloaded by p2p peers. A full sync is activated with `--syncmode full` flag or simplly omitting the flag, because full sync is the default sync method.

Even with a full sync, there are several options for how much block state to store. Below diagram summarizes these options, and further details are provided in the following sections.

![Block sync options](/img/learn/block_sync.png)

### State persistence: Archive mode vs. Full mode

Even if full sync calculates every state transition, the node may not store every block states. By discarding some block states you can significantly save the disk space.

#### Configuration

- Archive mode: Persist every block states. Specify `--gcmode archive` flag.
- Full mode: Persist some block states. Specify `--gcmode full` flag or simply omit the `--gcmode` flag.

A node that runs on gcmode=archive is called Archive node. A node that runs gcmode=full is called Full node. Not to confuse with the full sync mode.

In a full node, block states are persisted to disk every multiple of the number specified by `--state.block-interval NNN (default: 128)`. Also the block states of the recent `--state.tries-in-memory NNN (default 128)` blocks are kept in memory to serve APIs. Therefore, block states are only available when it is a multiple of block interval or recently processed.

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

#### Usage

It's not a good idea for an application to assume block interval is 128. You might be tempted to rely on the 128 interval because 128 is the default value and most nodes use the default value. But it is the node’s discretion to choose any different interval.

Applications usually need the latest states including nonces, balances, contract storages. Apps and developers sometime uses the debug tracing APIs for historic blocks, in which case the block can be recreated by re-executing from the nearest stored state (i.e. up to 127 blocks under default block-interval). So full node is an economic choice for general applications.

However, you should use an archive node for data analysis purposes. Note that even if you only query historic consensus data - such as validators and rewards - you still need an archive node because they are derived from block states.

#### Full and archive hybrid (Upstream EN)

If your node mostly serves the latest data but occasionally serves historic data, then try the Upstream EN feature. Read more [here](../upstream-en).

### State pruning: Live and Batch

Historic block states can be deleted to keep the disk size slim. There are two approaches to prune block states.

- Live pruning: With the live pruning feature enabled, the block states beyond a certain retention period will be automatically deleted. Read more about live pruning [here](../live-pruning).
- Batch pruning (state migration): The block states can be state-migrated, meaning the block states before a certain block number is not available. Read more about state migration [here](../state-migration).

Live pruning continuously deletes old states so the disk size is always kept at minimum. But because of the accompanying bookeeping works, live pruning slightly slows down the block sync speed. Batch pruning does not affect the performance after the migration has completed, but a migration session takes a few days and it temporarily require a large free disk space so it can make a copy the states.

## Chaindata snapshot

Download a chaindata snapshot to skip the full sync process and start quickly. A chaindata snapshot is a compressed chaindata directory (e.g. `.tar.gz` file) of an already synced node. Read more about using the chaindata snapshot [here](../)

## Snap sync

Kaia node currently does not support snap sync. Instead, you can download a state-migrated chaindata snapshot or live-pruning chaindata snapshot to quickly start the node without the need of re-execution from genesis.

## Read more

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
