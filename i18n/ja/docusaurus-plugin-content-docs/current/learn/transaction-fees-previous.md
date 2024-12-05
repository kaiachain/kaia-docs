---
unlisted: true
---

# Transaction Fees

:::note

This document contains the transaction fee used before the activation of the `Kore`protocol upgrade.
If you want the latest document, please refer to [latest document](transaction-fees.md).

:::

The transaction fee of one transaction is calculated as follows:

```text
Transaction fee := (Gas used) x (GasPrice)
```

As an easy-to-understand analogy in this regard, suppose you're filling up gas at a gas station. The gas price is determined by the refinery every day, and today's price is $2. If you fill 15L up, then you would pay $30 = 15L x $2/1L for it, and the $30 will be paid out of your bank account. Also, the transaction will be recorded in the account book.

Transaction fee works just the same as above. The network determines the gas price for every block. Suppose the gas price for the current block is 30 ston. If a transaction submitted by `from` account was charged 21000 gas, then 630000 ston = (21000 gas \* 30 ston) would be paid out of the `from` account. Also, the transaction will be recorded in the block, and it will be applied in the state of all blockchain nodes.

Summing it up again, this calculated transaction fee is subtracted from the sender's or fee payer's account. However, the fee can be deducted from the balance only if the transaction is created by klay_sendTransaction/eth_sendTransaction. Because the other transactions cannot change the state since they cannot be included in the block. They are just a simulation in some way.

This is an overall explanation of the transaction fee, and from this point, we would give a detailed explanation of how gas price is determined and how the gas is calculated.

## Unit Price Overview <a id="unit-price-overview"></a>

`Unit price` is the price for a single gas. The unit price (also called `gas price`) is set in the system by the governance. It cannot be changed by user. The current value of the unit price can be obtained by calling the `klay.gasPrice` API.

In Ethereum, users set the gas price for each transaction, and miners choose which transactions to be included in their block to maximize their reward. It is something like bidding for limited resources. This approach has been working because it is market-based. However, the transaction cost fluctuates and often becomes too high to guarantee the execution.

To solve the problem, Klaytn is using a fixed unit price and the price can be adjusted by the governance council. This policy ensures that every transaction will be handled equally and be guaranteed to be executed. Therefore, users do not need to struggle to determine the right unit price.

### Transaction Validation against Unit Price <a id="transaction-validation-against-unit-price"></a>

Klaytn only accepts transactions with gas prices, which can be set by the user, that are equal to the unit price of Klaytn; it rejects transactions with gas prices that are different from the unit price in Klaytn.

### Unit Price Error <a id="unit-price-error"></a>

The error message `invalid unit price` is returned when the gas price of a transaction is not equal to the unit price of Klaytn.

### Transaction Replacement <a id="transaction-replacement"></a>

Klaytn currently does not provide a way to replace a transaction using the unit price but may support different methods for the transaction replacement in the future. Note that in Ethereum, a transaction with a given nonce can be replaced by a new one with a higher gas price.

## Gas Overview <a id="gas-overview"></a>

Every action that changes the state of the blockchain requires gas. While processing the transactions in a block, such as sending KLAY, using KIP-7 tokens, or executing a contract, the user has to pay for the computation and storage usage. The payment amount is decided by the amount of `gas` required.

`Gas` required is computed by adding up the next two gases;

- `IntrinsicGas` is a gas that is statically charged based on the configuration of the transaction, such as the datasize of the transaction.
- `ContractExecutionGas`, on the other hand, is a gas that is dynamically calculated due to the contract execution.

In here, we would focus on how `IntrinsicGas` is organized. For the `ContractExecutionGas`, the klvm documentation describes it in detail, so please refer [klvm docs](./computation/klaytn-virtual-machine-previous.md).

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

The KeyCreationGas is calculated as `(number of registering keys) x TxAccountCreationGasPerKey (20000)`.

> Please keep in mind that Public key type always has only one registering key, so the gas would be always 20000.

### KeyValidationGas <a id="keyValidationGas"></a>

The KeyValidationGas is calculated as `(number of keys - 1) x TxValidationGasPerKey(15000)`.

> Please keep in mind that Public key type always has only one signature key, so the gas would be always zero.

A Klaytn transaction can also have a feePayer, so the total KeyValidationGas is like this.

```
KeyValidationGas =  (KeyValidationGas for a sender) + (KeyValidationGas for a feePayer)
```

### PayloadGas <a id="payloadGas"></a>

`PayloadGas` is calculated as below.

```
# legacy-typed transaction
PayloadGas = number_of_zero_bytes x TxDataZeroGas (4) + number_of_nonzero_bytes x TxDataNonZeroGas (68)`

# non legacy-typed transaction
PayloadGas = number_of_bytes * TxDataGas (100)
```

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
