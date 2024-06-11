# Transaction Fees

The transaction fee of one transaction is calculated as follows:

```text
Transaction fee := (Gas used) x (GasPrice)
```

As an easy-to-understand analogy in this regard, suppose you're filling up gas at a gas station. The gas price is determined by the refinery every day, and today's price is $2. If you fill 15L up, then you would pay $30 = 15L x $2/1L for it, and the $30 will be paid out of your bank account. Also, the transaction will be recorded in the account book.

Transaction fee works just the same as above. The network determines the gas price for every block. Suppose the gas price for the current block is 30 Gkei. If a transaction submitted by `from` account was charged 21000 gas, then 630000 Gkei = (21000 gas * 30 Gkei) would be paid out of the `from` account. Also, the transaction will be recorded in the block, and it will be applied in the state of all blockchain nodes.

Summing it up again, this calculated transaction fee is subtracted from the sender's or fee payer's account. However, the fee can be deducted from the balance only if the transaction is created by kaia_sendTransaction/eth_sendTransaction. Because the other transactions cannot change the state since they cannot be included in the block. They are just a simulation in some way.

This is an overall explanation of the transaction fee, and from this point, we would give a detailed explanation of how gas price is determined and how the gas is calculated.

## Gas Overview <a id="gas-overview"></a>
Every action that changes the state of the blockchain requires gas. While processing the transactions in a block, such as sending KAIA, using KIP-7 tokens, or executing a contract, the user has to pay for the computation and storage usage. The payment amount is decided by the amount of `gas` required.

`Gas` required is computed by adding up the next two gases;

* `IntrinsicGas` is a gas that is statically charged based on the configuration of the transaction, such as the datasize of the transaction. For more details, please refer to [Intrinsic Gas](intrinsic-gas.md).
* `ExecutionGas`, on the other hand, is a gas that is dynamically calculated due to the contract execution. For more details, please refer to [Execution Gas](execution-gas.md).

## GasPrice Overview <a id="gas-price-overview"></a>
Unlike the ethereum, Kaia used the fixed gas price, called `unitPrice` at first. However, since magma hardfork, Kaia started to use dynamic gas price which concept is newly redesigned by modifying the Ethereum's basefee, so called `Effective Gas Price`. Since there have been many changes about gas price, it can be pretty confusing on what value to set for gasPrice. So, we've made a guide on how to set the gas price below.

| Network | Before BaseFee | After BaseFee |
| :--- | :--- | :--- |
| klaytn | tx parameter gasPrice: network-defined. must be set as the `unitPrice` <br/> <br/> gasPrice: use the tx parameter gasPrice | tx parameter gasPrice: user-defined. It means the price the most you can pay  (e.g. suggestGasPrice = 2*latestBlock.baseFee ) <br/> <br/> gasPrice: dynamic gasPrice, `baseFee`, which is defined by network.|
| Ethereum | tx parameter gasPrice: user-defined. it means the price the most you can pay. <br/> <br/> gasPrice: use the tx parameter gasPrice | tx parameter gasPrice: user-defined. It means the price the most you can pay. <br/> <br/> gasPrice: dynamic gasPrice, `baseFee+tip`, which is defined by network. |


## Dynamic Gas Fee Mechanism <a id="dynamic-gas-fee-mechanism"></a>
Since the magma hard fork, a dynamic gas fee mechanism has replaced the existing fixed fee policy. Dynamic gas fee policy provides a stable service to users by preventing network abuse and storage overuse. The gas fee changes according to the network situation. Seven parameters affect the `base fee(gas fee)`:

1. PREVIOUS_BASE_FEE: Base fee of the previous block
2. GAS_USED_FOR_THE_PREVIOUS_BLOCK: Gas used to process all transactions of the previous block
3. GAS_TARGET: The gas amount that determines the increase or decrease of the base fee (30 million at the moment)
4. MAX_BLOCK_GAS_USED_FOR_BASE_FEE: Implicit block gas limit to enforce the max basefee change rate (60 million at the moment)
5. BASE_FEE_DELTA_REDUCING_DENOMINATOR: The value to set the maximum base fee change to 5% per block (20 at the moment, can be changed later by governance)
6. UPPER_BOUND_BASE_FEE: The maximum value for the base fee (750 Gkei at the moment, can be changed later by governance)
7. LOWER_BOUND_BASE_FEE: The minimum value for the base fee (25 Gkei at the moment, can be changed later by governance)

## Base Fee <a id="base-fee"></a>
The basic idea of this algorithm is that the `base fee` would go up if the gas used exceeds the base gas and vice versa. It is closely related to the number of transactions in the network and the gas used in the process. There is an upper and lower limit for the `base fee` to prevent the fee from increasing or decreasing indefinitely. There is also a cap for the gas and an adjustment value for the fluctuation to prevent abrupt changes in the `base fee`. The values can be changed by governance.

```text
(BASE_FEE_CHANGE_RATE) = (GAS_USED_FOR_THE_PREVIOUS_BLOCK - GAS_TARGET)
(ADJUSTED_BASE_FEE_CHANGE_RATE) = (BASE_FEE_CHANGE_RATE) / (GAS_TARGET) / (BASE_FEE_DELTA_REDUCING_DENOMINATOR)
(BASE_FEE_CHANGE_RANGE) = (PREVIOUS_BASE_FEE) * (ADJUSTED_BASE_FEE_CHANGE_RATE)
(BASE_FEE) = (PREVIOUS_BASE_FEE) + (BASE_FEE_CHANGE_RANGE) 
```

The `base fee` is calculated for every block; there could be changes every second. Transactions from a single block use the same `base fee` to calculate transaction fees. Only transactions with a gas price higher than the block `base fee` can be included in the block. Half of the transaction fee for each block is burned (BURN_RATIO = 0.5, cannot be changed by governance).

> NOTE: An important feature that sets Kaia apart from Ethereum's EIP-1559 is that it does not have tips. Kaia follows the First Come, First Served(FCFS) principle for its transactions.
