# StateDB Live Pruning

StateDB Live Pruning is a new technique to resolve the same problem as [State Migration](state-migration.md) (data in the state trie keeps accumulating).

In StateDB, data is stored in a data structure known as StateTrie. When state data is altered in a block, multiple nodes within the Trie are modified, and the new or updated data is then stored. As the Klaytn network continues to expand, the volume of data correspondingly increases. This challenge has been mitigated through State Migration, which involves the continuous deletion of old data, thereby conserving storage spaces. Nonetheless, State Migration has its own drawbacks, as it requires traversing the entire Trie and must be triggered manually. To counteract these limitations, the StateDB Live Pruning technique was introduced.

To effectively eliminate historical data without having to traverse the entire StateTrie, it is imperative to ascertain whether a TrieNode is outdated or not at a specific time. In the original StateTrie structure, a single TrieNode could be part of multiple StateTries. Consequently, even if the state of a specific block is updated at a given point in time, some TrieNodes may be redundantly used and cannot be readily deleted. This issue is referred to as the hash duplication problem.

StateDB Live Pruning resolves this problem of State Trie by adding a unique 7-byte serial index after the 32-byte Hash, thus solving this challenge. This ensures that all nodes of any state trie are unique and can safely delete StateTrie before a specific block.

```
Hash: Keccak256 - 32-byte Hash key
ExtHash: Keccak256 - 32-byte Hash Key + 7-byte Serial index
```

Furthermore, the StateRoot is not be changed in a block since we still calculate original hash value from extended hash. In order to obtain the State Root value, the 7-byte Serial index added to ExtHash is removed, and the Hash is recalculated to obtain the same State Root value as before, making it backward compatible.

For more information, see this [medium blog](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91).

StateDB Live Pruning deletes data 48 hours (default) after the information has changed, so features related to querying StateDB are not supported such as past accounts balance, contract execution on outdated blocks, etc. Please carefully consider the purpose of the node you are operating before deciding to activate the StateDB Live Pruning feature.

To use StateDB Live Pruning, the following environment should be set up:

1. Use a binary of klaytn v1.11.0 or higher.
2. Please download the pruned DB snapshot from this [link](https://packages.klaytn.net/cypress/pruning-chaindata/) if you don't want to synchronize all blocks from the genesis block.
3. (Optional) Add the flag `--state.live-pruning-retention <value>` for how long recent states are retained. Default value is 172800 (48 hours)
4. Refer to the following link to set the DB location and restart the node with `--state.live-pruning` added [chaindata-change](../../misc/operation/chaindata-change.md) section.
