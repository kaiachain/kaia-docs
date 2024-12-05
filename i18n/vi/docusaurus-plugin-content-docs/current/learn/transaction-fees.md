# Transaction Fees

:::note

NOTE: The transaction fee has changed with the `Kore` hardfork. If you want the previous document, please refer to [previous document](transaction-fees-previous.md).

`Kore` hardfork block numbers are as follows.

- Baobab Testnet: `#111736800`
- Cypress Mainnet: `#119750400`

:::

The transaction fee of one transaction is calculated as follows:

```text
Transaction fee := (Gas used) x (GasPrice)
```

As an easy-to-understand analogy in this regard, suppose you're filling up gas at a gas station. The gas price is determined by the refinery every day, and today's price is $2. If you fill 15L up, then you would pay $30 = 15L x $2/1L for it, and the $30 will be paid out of your bank account. Also, the transaction will be recorded in the account book.

Transaction fee works just the same as above. The network determines the gas price for every block. Suppose the gas price for the current block is 30 ston. If a transaction submitted by `from` account was charged 21000 gas, then 630000 ston = (21000 gas \* 30 ston) would be paid out of the `from` account. Also, the transaction will be recorded in the block, and it will be applied in the state of all blockchain nodes.

Summing it up again, this calculated transaction fee is subtracted from the sender's or fee payer's account. However, the fee can be deducted from the balance only if the transaction is created by klay_sendTransaction/eth_sendTransaction. Because the other transactions cannot change the state since they cannot be included in the block. They are just a simulation in some way.

This is an overall explanation of the transaction fee, and from this point, we would give a detailed explanation of how gas price is determined and how the gas is calculated.

## GasPrice Overview <a id="gas-price-overview"></a>

Unlike the ethereum, Klaytn used the fixed gas price, called `unitPrice` at first. However, since magma hardfork, Klaytn started to use dynamic gas price which concept is newly redesigned by modifying the Ethereum's basefee, so called `Effective Gas Price`. Since there have been many changes about gas price, it can be pretty confusing on what value to set for gasPrice. So, we've made a guide on how to set the gas price below.

| Network  | Before BaseFee                                                                                                                    | After BaseFee                                                                                                                                                                                                                     |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| klaytn   | tx parameter gasPrice: network-defined. must be set as the `unitPrice` <br/> <br/> gasPrice: use the tx parameter gasPrice        | tx parameter gasPrice: user-defined. It means the price the most you can pay  (e.g. suggestGasPrice = 2\*latestBlock.baseFee ) <br/> <br/> gasPrice: dynamic gasPrice, `baseFee`, which is defined by network. |
| Ethereum | tx parameter gasPrice: user-defined. it means the price the most you can pay. <br/> <br/> gasPrice: use the tx parameter gasPrice | tx parameter gasPrice: user-defined. It means the price the most you can pay. <br/> <br/> gasPrice: dynamic gasPrice, `baseFee+tip`, which is defined by network.                                                                 |

### Dynamic Gas Fee Mechanism <a id="dynamic-gas-fee-mechanism"></a>

Since the magma hard fork, a dynamic gas fee mechanism has replaced the existing fixed fee policy. Dynamic gas fee policy provides a stable service to users by preventing network abuse and storage overuse. The gas fee changes according to the network situation. Seven parameters affect the `base fee(gas fee)`:

1. PREVIOUS_BASE_FEE: Base fee of the previous block
2. GAS_USED_FOR_THE_PREVIOUS_BLOCK: Gas used to process all transactions of the previous block
3. GAS_TARGET: The gas amount that determines the increase or decrease of the base fee (30 million at the moment)
4. MAX_BLOCK_GAS_USED_FOR_BASE_FEE: Implicit block gas limit to enforce the max basefee change rate (60 million at the moment)
5. BASE_FEE_DELTA_REDUCING_DENOMINATOR: The value to set the maximum base fee change to 5% per block (20 at the moment, can be changed later by governance)
6. UPPER_BOUND_BASE_FEE: The maximum value for the base fee (750 ston at the moment, can be changed later by governance)
7. LOWER_BOUND_BASE_FEE: The minimum value for the base fee (25 ston at the moment, can be changed later by governance)

### Base Fee <a id="base-fee"></a>

The basic idea of this algorithm is that the `base fee` would go up if the gas used exceeds the base gas and vice versa. It is closely related to the number of transactions in the network and the gas used in the process. There is an upper and lower limit for the `base fee` to prevent the fee from increasing or decreasing indefinitely. There is also a cap for the gas and an adjustment value for the fluctuation to prevent abrupt changes in the `base fee`. The values can be changed by governance.

```text
(BASE_FEE_CHANGE_RATE) = (GAS_USED_FOR_THE_PREVIOUS_BLOCK - GAS_TARGET)
(ADJUSTED_BASE_FEE_CHANGE_RATE) = (BASE_FEE_CHANGE_RATE) / (GAS_TARGET) / (BASE_FEE_DELTA_REDUCING_DENOMINATOR)
(BASE_FEE_CHANGE_RANGE) = (PREVIOUS_BASE_FEE) * (ADJUSTED_BASE_FEE_CHANGE_RATE)
(BASE_FEE) = (PREVIOUS_BASE_FEE) + (BASE_FEE_CHANGE_RANGE) 
```

The `base fee` is calculated for every block; there could be changes every second. Transactions from a single block use the same `base fee` to calculate transaction fees. Only transactions with a gas price higher than the block `base fee` can be included in the block. Half of the transaction fee for each block is burned (BURN_RATIO = 0.5, cannot be changed by governance).

> NOTE: An important feature that sets Klaytn apart from Ethereum's EIP-1559 is that it does not have tips. Klaytn follows the First Come, First Served(FCFS) principle for its transactions.

## Gas Overview <a id="gas-overview"></a>

Every action that changes the state of the blockchain requires gas. While processing the transactions in a block, such as sending KLAY, using KIP-7 tokens, or executing a contract, the user has to pay for the computation and storage usage. The payment amount is decided by the amount of `gas` required.

`Gas` required is computed by adding up the next two gases;

- `IntrinsicGas` is a gas that is statically charged based on the configuration of the transaction, such as the datasize of the transaction.
- `ContractExecutionGas`, on the other hand, is a gas that is dynamically calculated due to the contract execution.

In here, we would focus on how `IntrinsicGas` is organized. For the `ContractExecutionGas`, the klvm documentation describes it in detail, so please refer [klvm docs](computation/klaytn-virtual-machine.md).

Coming back to `IntrinsicGas`, a transaction's `intrinsicGas` can be calculated by adding up the next four factors.

```
IntrinsicGasCost = KeyCreationGas + KeyValidationGas + PayloadGas + TxTypedGas
```

- `PayloadGas` is calculated based on the size of the data field in the tx.
- `KeyCreationGas` is calculated when the transaction registers new keys. Only applicable in `accountUpdate` transaction.
- `KeyValidationGas` is calculated based on the number of signatures.
- `TxTypedGas` is defined based on the transaction types.

Before we get into the detail, keep in mind that not all key types apply the keyGases (`KeyCreationGas` and `KeyValidationGas`).

| Key Type  | Are those keyGases applicable?     |
| :-------- | :--------------------------------- |
| Nil       | No                                 |
| Legacy    | No                                 |
| Fail      | No                                 |
| Public    | Yes                                |
| MultiSig  | Yes                                |
| RoleBased | Depending on key types in the role |

### KeyCreationGas <a id="keyCreationGas"></a>

The KeyCreationGas is calculated as `(number of registering keys) x TxAccountCreationGasPerKey (20000)`.\
Please keep in mind that Public key type always has only one registering key, so the gas would be always 20000.

### KeyValidationGas <a id="keyValidationGas"></a>

The KeyValidationGas is calculated as `(number of signatures - 1) x TxValidationGasPerKey(15000)`.\
Please keep in mind that Public key type always has only one signature key, so the gas would be always zero.

A Klaytn transaction can also have a feePayer, so the total KeyValidationGas is like this.

```
KeyValidationGas =  (KeyValidationGas for a sender) + (KeyValidationGas for a feePayer)
```

### PayloadGas <a id="payloadGas"></a>

Calculating `PayloadGas` is simple. It is calculated as `(number_of_bytes_of_tx_input) x TxDataGas(100)`

### TxTypedGas <a id="txTypedGas"></a>

There are three types of transactions in klaytn; `base`, `feeDelegated`, and `feeDelegatedWithFeeRatio`.

For example,

- TxTypeValueTransfer is the `base` type of the valueTransaction transaction.
- TxTypeFeeDelegatedValueTransfer is a `feeDelegated` type of the valueTransfer transaction.
- TxTypeFeeDelegatedValueTransferWithRatio is a `feeDelegatedWithRatio` type of the valueTransfer transaction.

This is important when calculating TxTypedGas:

- First, check the TxType is `feeDelegated` or `feeDelegatedWithFeeRatio`.
  - If the TxType is `feeDelegated`, add `TxGasFeeDelegated(10000)` to TxTypedGas
  - If the TxType is `feeDelegatedWithFeeRatio`, add `TxGasFeeDelegatedWithRatio (15000)` to TxTypedGas
- Second, check the transaction creates contract or not.
  - If the transaction creates contract, add `TxGasContractCreation (53000)` to TxTypedGas.
  - Otherwise, add `TxGas (21000)` to TxTypedGas.

For example,

- If it's legacyTransaction and creates contract, the TxTypedGas would be `0 + TxGasContractCreation(53000)`.
- If it's TxTypeFeeDelegatedValueTransfer, the TxTypedGas would be `TxGasFeeDelegated(10000) + TxGas (21000)`
- If it's TxTypeFeeDelegatedSmartContractDeployWithRatio, the TxTypedGas would be `TxGasFeeDelegatedWithRatio (15000) + TxGasContractCreation (53000)`
