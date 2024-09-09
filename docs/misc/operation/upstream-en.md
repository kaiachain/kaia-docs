# Link Full Node to Archive

In order to query the state of a random block to a node, the node must have the state trie of the block. Archive nodes store the state of all blocks in the database, but full nodes store the state of the latest 128 blocks and at a 128 block cycle. For example, a full node can query the balance for blocks multiple of 128.
Since the archive node stores all states in the database, the data size is very large, operation costs are high, and status inquiry also takes more load than a full node.
If you want to check the status of all blocks while operating a full node, set the upstream node of the full node as an archive node, and the full node will request the status that it does not have from the archive node, which is an upstream node, and send the results obtained as a response to the request in the first place.

## How to set up
To configure a full node to retrieve data from an upstream archive node, set `--upstream-en` in the `ADDITIONAL` environment variable of `kend.conf`, the configuration file of the operating full node. The example below shows how to set the archive node `https://archive-en.node.kaia.io` as an upstream node.
```
ADDITIONAL="--upstream-en https://archive-en.node.kaia.io"
```
