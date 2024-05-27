# Smart Contract Execution

## sendTransaction (SMART_CONTRACT_EXECUTION) <a id="sendtransaction-smart_contract_execution"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Smart Contract Execution](../../../../../../learn/transactions/basic.md#txtypesmartcontractexecution) transaction to the network.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name | Type | Description |
| --- | --- | --- |
| transactionObject | Object | The transaction object to send. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

A transaction object of type `SMART_CONTRACT_EXECUTION` has the following structure:

| Name | Type | Description |
| --- | --- | --- |
| type | String | Transaction Type. "SMART_CONTRACT_EXECUTION" |
| from | String | Address of this transaction sender. |
| to | String | The address of the deployed smart contract. |
| value | Number \| String \| BN \| BigNumber | (optional) The value transferred for the transaction in peb. To accept the value transfer, the contract function that will be executed by this transaction must be 'payable'. If omitted, it will be set to zero. |
| gas | Number | The maximum amount of gas willing to pay for the transaction (unused gas is refunded). |
| gasPrice | Number | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Kaia node. |
| nonce | Number | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| data | String | An input data of the smart contract. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- ``"transactionHash"`` returns ``String``: Is fired right after the transaction is sent and a transaction hash is available.
- ``"receipt"`` returns ``Object``: Is fired when the transaction receipt is available.
- ``"error"`` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// Calling smart contract function

// using the promise
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_EXECUTION',
    from: account.address,
    to: '0x1d389d91886fd0af55f44c56e1240eb6162ddff8',
    data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_EXECUTION',
    from: account.address,
    to: '0x1d389d91886fd0af55f44c56e1240eb6162ddff8',
    data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```


## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION) <a id="sendtransaction-fee_delegated_smart_contract_execution"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Smart Contract Execution](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractexecution) transaction to the network.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name | Type | Description |
| --- | --- | --- |
| transactionObject | Object | The transaction object to send. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_EXECUTION` has the following structure:

| Name | Type | Description |
| --- | --- | --- |
| type | String | Transaction Type. "FEE_DELEGATED_SMART_CONTRACT_EXECUTION" |
| from | String | Address of this transaction sender. |
| to | String | The address of the deployed smart contract. |
| value | Number \| String \| BN \| BigNumber | (optional) The value transferred for the transaction in peb. To accept the value transfer, the contract function that will be executed by this transaction must be 'payable'. If omitted, it will be set to zero. |
| gas | Number | The maximum amount of gas willing to pay for the transaction (unused gas is refunded). |
| gasPrice | Number | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Kaia node. |
| nonce | Number | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| data | String | An input data of the smart contract. |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_EXECUTION` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_SMART_CONTRACT_EXECUTION` can be used as a parameter in [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| Name | Type | Description |
| --- | --- | --- |
| feePayer | String | The fee payer address of the transaction. |
| senderRawTransaction | String | The RLP-encoded transaction signed by sender. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- ``"transactionHash"`` returns ``String``: Is fired right after the transaction is sent and a transaction hash is available.
- ``"receipt"`` returns ``Object``: Is fired when the transaction receipt is available.
- ``"error"`` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```


## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO) <a id="sendtransaction-fee_delegated_smart_contract_execution_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Smart Contract Execution With Ratio](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) transaction to the network.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name | Type | Description |
| --- | --- | --- |
| transactionObject | Object | The transaction object to send. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO` has the following structure:

| Name | Type | Description |
| --- | --- | --- |
| type | String | Transaction Type. "FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO" |
| from | String | Address of this transaction sender. |
| to | String | The address of the deployed smart contract. |
| value | Number \| String \| BN \| BigNumber | (optional) The value transferred for the transaction in peb. To accept the value transfer, the contract function that will be executed by this transaction must be 'payable'. If omitted, it will be set to zero. |
| gas | Number | The maximum amount of gas willing to pay for the transaction (unused gas is refunded). |
| gasPrice | Number | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Kaia node. |
| nonce | Number | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| data | String | An input data of the smart contract. |
| feeRatio | Number | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 ~ 99, if it is out of range, the transaction will not be accepted. |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO` can be used as a parameter in [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| Name | Type | Description |
| --- | --- | --- |
| feePayer | String | The fee payer address of the transaction. |
| senderRawTransaction | String | The RLP-encoded transaction signed by sender. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- ``"transactionHash"`` returns ``String``: Is fired right after the transaction is sent and a transaction hash is available.
- ``"receipt"`` returns ``Object``: Is fired when the transaction receipt is available.
- ``"error"`` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```


