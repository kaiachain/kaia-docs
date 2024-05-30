# Execution Model

This page describes the execution model, the data structures, and the life cycle of Klaytn smart contracts.

## Execution Model <a id="execution-model"></a>

Transactions are sent to _Consensus Nodes \(CNs\)_ to be stored in a block. The CNs check whether each received transaction is valid. Valid transactions are stored in the transaction pool; otherwise, they are discarded. A CN selects the executable transactions in the current block in its transaction pool and executes them one by one.

To execute a transaction, the sender must pay some amount of KLAY as a transaction fee as illustrated in [Transaction Fees](../transaction-fees/transaction-fees.md). The transaction can fail if the sender submits a transaction accompanied by insufficient gasLimit. A transaction can also fail if the sender's account has an insufficient balance. The transaction can also fail if its computation cost exceeds a limit as described in [computation cost](./computation-cost.md).

When a transaction is executed successfully, it is included in the current block. A CN gathers transactions until it reaches block gas limit or block time limit. Then, the CN makes a block with the transactions. This step requires filling several fields in the block. For example, it must calculate the hash values of transactions, receipts, state, etc. After all required fields have been completed, the CN generates a block hash.

When block generation is complete, the block is propagated to all the other CNs. The other CNs all verify the propagated block and reach consensus on the verification results by using the BFT consensus algorithm. When the verification process completes successfully by the majority of CNs, the block is stored in the blockchain. Because the BFT consensus algorithm satisfies the immediate finality property, the block is final and will never be removed. After a block is finalized, the execution of all the transactions in that block are irreversibly guaranteed, and their execution results can be returned to the sender if requested.

## Data Structures <a id="data-structures"></a>

### Account <a id="account"></a>

An account in Klaytn blockchain platform is a data structure containing information about a person's balance or a smart contract. Klaytn redesigns its account model to provide better DX and UX. Detailed information about the account model can be found [here](../accounts.md).

### Transaction <a id="transaction"></a>

A transaction in a blockchain platform is a message sent between nodes that changes the state of the blockchain. Klaytn also redesigns its transaction model. Transactions are separated into various types according to their own purposes to find chances of performance optimization and to support the redesigned account model. Detailed information about the transaction model can be found [here](../transactions/transactions.md).

### State <a id="state"></a>

Klaytn's **state** is a collection of account states. This state must be the same across Klaytn nodes if they have processed the same blocks in the same order. The state is changed when a transaction is executed on a Klaytn node.

The table below shows the account data that are stored in the state.

| Component | Description |
| :--- | :--- |
| nonce | An integer value indicating the number of transactions executed by this account. When submitting a transaction, the nonce of the transaction should be equal to the account's nonce. |
| balance | An integer value showing the amount of KLAY that this account currently has. |
| storageRoot | A 256-bit hash of the root of the Merkle Patricia Trie that contains the values of all the storage variables in the account. |
| codeHash | The hash of the account's bytecode.  This value is immutable, which means it is set only when the smart contract is created.  If the account is an EOA or an EA, this value is set to the hash of null. |

### Block <a id="block"></a>

A block is a crucial element of the Klaytn blockchain because the blockchain literally consists of a chain of blocks. The table below shows the components in a block in the RLP encoding order.

| Component | Description |
| :--- | :--- |
| parentHash | The parent block hash. |
| reward | The reward address of the block proposer. |
| stateRoot | The root of the final state trie of the block. |
| transactionsRoot | The root of the transaction trie of the block. |
| receiptsRoot | The root of the receipts trie of the block. |
| logsBloom | The bloom filter for the logs of the block. |
| blockScore | Difficulty - always 1 in the BFT consensus engine. |
| number | The block number. |
| gasUsed | The total used gas by all transactions in this block. |
| timestamp | The Unix timestamp for when the block was collated. |
| timestampFoS | The fraction of a second of the timestamp for when the block was collated. |
| extraData | The "extra data" field of this block, conveying consensus engine specific data. |
| governanceData | RLP encoded governance configuration |
| voteData | RLP encoded governance vote of the proposer |
| baseFeePerGas | The KIP-71 base fee per gas added since Magma hardfork. |
| randomReveal | The KIP-114 random contribution added since Randao hardfork. |
| mixHash | The KIP-114 randao mix added since Randao hardfork. |

## Smart Contract <a id="smart-contract"></a>

A _smart contract_ consists of a collection of code \(functions\) and data \(state\) that resides at a specific address on the Klaytn blockchain. Contract accounts are able to pass messages between each other as well as perform practically Turing complete computation. Contracts exist on the blockchain in Klaytn-specific binary formats. Currently, Klaytn supports one binary format --Ethereum Virtual Machine \(EVM\) bytecode; however, other formats will be supported in the future.

### Creating Smart Contracts <a id="creating-smart-contracts"></a>

A smart contract can be created in the Klaytn blockchain by sending a transaction to an empty address with the binary as data. The binary can be in various formats; however, Klaytn currently supports one binary format, EVM bytecode. It is worth pointing out that this transaction requires a payment for execution. The account balance on the sender's account will be reduced according to the transaction fee model after the transaction has been stored in a block. After some time, the transaction should appear in a block, which confirms that the state it entails reached a consensus. At this point, the smart contract now exists in the Klaytn blockchain.
- As [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) is brought at the Kore hardfork, deployment of a new code starting with the 0xEF byte is not allowed.
- As [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) is brought at the Shanghai hardfork, deployment of a new code is rejected if the initcode length exceeds 49152 bytes and the length of the new contract code cannot exceed 24576 bytes.
- SCA overwriting over EOA is enabled after Shanghai hardfork.

### Executing Smart Contracts <a id="executing-smart-contracts"></a>

A function of a smart contract can be called and executed either by sending a transaction to the smart contract or by calling the function locally in the node. When a function is called by sending a transaction, the function is executed by processing a transaction. This entails a cost in KLAY for sending the transaction, and the call will be recorded forever on the blockchain. The return value of calls made in this manner is the hash of the transaction. When the function is invoked locally, it is executed locally in the Ethereum Virtual Machine \(EVM\), and the call returns the return value of the function. Calls made in this manner are not recorded on the blockchain; thus, they cannot modify the internal state of the contract. This type of call is referred to as a constant function call. Calls made in this manner do not cost any KLAY. Constant function calls should be used when only the return value is of interest, while a transaction should be used when side effects on the contract state are of interest.
