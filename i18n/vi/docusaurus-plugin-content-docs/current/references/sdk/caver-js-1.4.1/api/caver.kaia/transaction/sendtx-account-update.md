# Account Update

## sendTransaction (ACCOUNT_UPDATE) <a id="sendtransaction-account_update"></a>

```javascript
caver.kaia.sendTransaction(transactionObject [, callback])
```

Sends an [Account Update](../../../../../../learn/transactions/basic.md#txtypeaccountupdate) transaction to the network.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                                                   |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                                               |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

A transaction object of type `ACCOUNT_UPDATE` has the following structure:
Note that when you provide the new key, you should provide just one of the below depending on the key type. If more than one are given, you will receive a 'duplicated key' error. From caver-js v1.2.0, using `key` with `AccountForUpdate` instance is recommended.

- key
- legacyKey
- publicKey
- multisig
- roleTransactionKey, roleAccountUpdateKey, roleFeePayerKey
- failKey

| Name                 | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                 | String | Transaction type. "ACCOUNT_UPDATE"                                                                                                                                                                                                                                                                                                                                    |
| from                 | String | Address of this transaction sender. This account will be updated by this transaction.                                                                                                                                                                                                                                                                                      |
| gas                  | Number | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                  |
| gasPrice             | Number | (optional) Gas price provided by the sender in kei. The gasPrice must be the same as the unitPrice set in the Kaia node.                                                                                                                                                                                                                                |
| nonce                | Number | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.kaia.getTransactionCount`.                                                                                                                                                                                                                                     |
| key                  | Object | (optional) An `AccountForUpdate` instance containing the address and key to be used when updating the account. For instructions on how to create an AccountForUpdate instance for each key type, see [caver.kaia.accounts.createAccountForUpdate](../../caver.kaia.accounts.md#createaccountforupdate). |
| legacyKey            | Bool   | (optional) if updating the account to have a legacy key, set this true.                                                                                                                                                                                                                                                                                                 |
| publicKey            | String | (optional) if updating the account to have a public key, write down the 64 bytes public key.                                                                                                                                                                                                                                                                            |
| multisig             | Object | (optional) if updating the account to have a multisig key, write down the list of weighted public keys that make up the multisig. multisig also defines the threshold. When signing a transaction, the sum of the weights of the signatures must be larger than or equal to the threshold.                                              |
| roleTransactionKey   | Object | (optional) if updating the account to have a role-based key, write down roleTransactionKey. roleTransactionKey can be a public key or a multisig key. This roleTransactionKey will be used when signing a transaction.                                                                                                                  |
| roleAccountUpdateKey | Object | (optional) if updating the account to have a role-based key, write down roleAccountUpdateKey. roleAccountUpdateKey can be a public key or a multisig key. This roleAccountUpdateKey will be used when signing an AccountUpdate transaction.                                                                                             |
| roleFeePayerKey      | Object | (optional) if updating the account to have a role-based key, write down roleFeePayerKey. roleFeePayerKey can be a public key or a multisig key. This roleFeePayerKey will be used when signing a transaction as a feePayer.                                                                                                             |
| failKey              | Bool   | (optional) if updating the account to have a fail key, set this true.                                                                                                                                                                                                                                                                                                   |

If you call `caver.kaia.sendTransaction` with a transaction object of type `ACCOUNT_UPDATE` as in the above, caver-js will send it to the network after signing with the key of the sender account (`from`) inside the in-memory wallet.

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const account = caver.kaia.accounts.wallet.add('0x{private key}')

// Case 1: Updating account with an AccountForUpdate instance

const accountForUpdate = caver.kaia.accounts.createAccountForUpdate(account.address, '0x{private key}')

// using the promise
caver.kaia.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: '300000',
})
.then(function(receipt){
    ...
})

// using the event emitter
caver.kaia.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error)

// Case 2: Updating account with legacy key

// using the promise
caver.kaia.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    legacyKey: true,
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    legacyKey: true,
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 3: Updating account with public key

// using the promise
caver.kaia.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005',
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005',
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 4: Updating account with fail key

// using the promise
caver.kaia.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    failKey: true,
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    failKey: true,
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 5: Updating account with weighted-multisig

// using the promise
caver.kaia.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  multisig: {
    threshold: 3,
    keys: [
      { weight: 1, publicKey: '0xb1a73e06009a6ba4816e24018e70fbd6f95b584c61bc704473da5102ac118d3121ce7fc64a7ba5004d487c49865047a7a3d7aa8baec5d9b2c2568f44110daab8' },
      { weight: 1, publicKey: '0x24b437235528893f079b15d65b33a355f315b7a521374f899ae3b3c29c546659dc6bc129cb8de49ccc05617cebf78224a622b9cd238a4fe3b04a5d1f8036efbe' },
      { weight: 1, publicKey: '0x354acd6ef039e69ffc31a690bf6aa748ca76a3dd98c5108793c5e0863a80d3477ebb1fac8c7d3e9a9f6cf57777db28f8ea3efb3937cb17101878b910ee66c527' },
      { weight: 1, publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005' },
    ],
  },
  gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  multisig: {
    threshold: 3,
    keys: [
      { weight: 1, publicKey: '0xb1a73e06009a6ba4816e24018e70fbd6f95b584c61bc704473da5102ac118d3121ce7fc64a7ba5004d487c49865047a7a3d7aa8baec5d9b2c2568f44110daab8' },
      { weight: 1, publicKey: '0x24b437235528893f079b15d65b33a355f315b7a521374f899ae3b3c29c546659dc6bc129cb8de49ccc05617cebf78224a622b9cd238a4fe3b04a5d1f8036efbe' },
      { weight: 1, publicKey: '0x354acd6ef039e69ffc31a690bf6aa748ca76a3dd98c5108793c5e0863a80d3477ebb1fac8c7d3e9a9f6cf57777db28f8ea3efb3937cb17101878b910ee66c527' },
      { weight: 1, publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005' },
    ],
  },
  gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 6: Updating account with role-based key

// using the promise
caver.kaia.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  roleTransactionKey: {
    publicKey: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
  },
  roleAccountUpdateKey: {
    publicKey: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c066fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
  },
  roleFeePayerKey: {
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
  },
  gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  roleTransactionKey: {
    publicKey: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
  },
  roleAccountUpdateKey: {
    publicKey: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c066fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
  },
  roleFeePayerKey: {
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
  },
  gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE) <a id="sendtransaction-fee_delegated_account_update"></a>

```javascript
caver.kaia.sendTransaction(transactionObject [, callback])
```

Sends a [Fee Delegated Account Update](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate) transaction to the network.

There are two ways for a fee payer to sign a transaction and send it to the network.

1. Call `caver.kaia.sendTransaction` with an object, `{senderRawTransaction: rawTransaction, feePayer: feePayerAddress}`, a transaction format used for fee payers. In this case, the fee payer account must exist in the in-memory caver-js wallet.
2. Sign with [caver.kaia.accounts.feePayerSignTransaction](../../caver.kaia.accounts.md#feepayersigntransaction) and send to network via [caver.kaia.sendSignedTransaction](./transaction.md#sendsignedtransaction)

The example here only describes how to use `caver.kaia.sendTransaction`.

For information on how to send using `caver.kaia.accounts.feePayerSignTransaction` and `caver.kaia.sendSignedTransaction`, see [caver.kaia.accounts.feePayerSignTransaction](../../caver.kaia.accounts.md#feepayersigntransaction) and [Sending a Transaction with multiple signer](../../../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer).

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                                                   |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                                               |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

A transaction object of type `FEE_DELEGATED_ACCOUNT_UPDATE` has the following structure:

| Name                 | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                 | String | Transaction Type. "FEE_DELEGATED_ACCOUNT_UPDATE"                                                                                                                                                                                                                                                                            |
| from                 | String | Address of this transaction sender. This account will be updated by this transaction.                                                                                                                                                                                                                                                                                      |
| gas                  | Number | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                  |
| gasPrice             | Number | (optional) Gas price provided by the sender in kei. The gasPrice must be the same as the unitPrice set in the Kaia node.                                                                                                                                                                                                                                |
| nonce                | Number | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.kaia.getTransactionCount`.                                                                                                                                                                                                                                     |
| key                  | Object | (optional) An `AccountForUpdate` instance containing the address and key to be used when updating the account. For instructions on how to create an AccountForUpdate instance for each key type, see [caver.kaia.accounts.createAccountForUpdate](../../caver.kaia.accounts.md#createaccountforupdate). |
| legacyKey            | Bool   | (optional) if updating the account to have a legacy key, set this true.                                                                                                                                                                                                                                                                                                 |
| publicKey            | String | (optional) if updating the account to have a public key, write down the 64 bytes public key.                                                                                                                                                                                                                                                                            |
| multisig             | Object | (optional) if updating the account to have a multisig key, write down the list of weighted public keys that make up the multisig. multisig also defines the threshold. When signing a transaction, the sum of the weights of the signatures must be larger than or equal to the threshold.                                              |
| roleTransactionKey   | Object | (optional) if updating the account to have a role-based key, write down roleTransactionKey. roleTransactionKey can be a public key or a multisig key. This roleTransactionKey will be used when signing a transaction.                                                                                                                  |
| roleAccountUpdateKey | Object | (optional) if updating the account to have a role-based key, write down roleAccountUpdateKey. roleAccountUpdateKey can be a public key or a multisig key. This roleAccountUpdateKey will be used when signing an AccountUpdate transaction.                                                                                             |
| roleFeePayerKey      | Object | (optional) if updating the account to have a role-based key, write down roleFeePayerKey. roleFeePayerKey can be a public key or a multisig key. This roleFeePayerKey will be used when signing a transaction as a feePayer.                                                                                                             |
| failKey              | Bool   | (optional) if updating the account to have a fail key, set this true.                                                                                                                                                                                                                                                                                                   |

A transaction object of type `FEE_DELEGATED_ACCOUNT_UPDATE` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_ACCOUNT_UPDATE` can be used as a parameter in [caver.kaia.accounts.signTransaction](../../caver.kaia.accounts.md#signtransaction) for sender and in [caver.kaia.accounts.feePayerSignTransaction](../../caver.kaia.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.kaia.sendTransaction`.

| Name                 | Type   | Description                                                   |
| -------------------- | ------ | ------------------------------------------------------------- |
| feePayer             | String | The fee payer address of the transaction.     |
| senderRawTransaction | String | The RLP-encoded transaction signed by sender. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const sender = caver.kaia.accounts.wallet.add('0x{private key}')
const feePayer = caver.kaia.accounts.wallet.add('0x{private key}')

const accountForUpdate = caver.kaia.accounts.createAccountForUpdate(sender.address, '0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
}, sender.privateKey)

caver.kaia.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.then(function(receipt){
    ...
})

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
}, sender.privateKey)

caver.kaia.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error)

```

## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO) <a id="sendtransaction-fee_delegated_account_update_with_ratio"></a>

```javascript
caver.kaia.sendTransaction(transactionObject [, callback])
```

Sends a [Fee Delegated Account Update With Ratio](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio) transaction to the network.

There are in two ways fee payer sign a transaction and send it to the network.

1. Call `caver.kaia.sendTransaction` with fee payer transaction format (An object that defines `senderRawTransaction` and `feepayer`). In this case, a fee payer account must exist in the in-memory wallet of caver-js.
2. Sign with [caver.kaia.accounts.feePayerSignTransaction](../../caver.kaia.accounts.md#feepayersigntransaction) and send to network via [caver.kaia.sendSignedTransaction](./transaction.md#sendsignedtransaction)

The example here only describes how to use `caver.kaia.sendTransaction`.

For information on how to send using `caver.kaia.accounts.feePayerSignTransaction` and `caver.kaia.sendSignedTransaction`, see [caver.kaia.accounts.feePayerSignTransaction](../../caver.kaia.accounts.md#feepayersigntransaction) and [Sending a Transaction with multiple signer](../../../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer).

**Parameters**

The parameters of sendTransaction are transaction object and callback function.

| Name              | Type     | Description                                                                                                                                   |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                                               |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

The plain transaction object type of a `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` transaction has the following structure:

| Name                 | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                 | String | The type of "FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO" transaction.                                                                                                                                                                                                                |
| from                 | String | Address of this transaction sender. This account will be updated by this transaction.                                                                                                                                                                                                                                                                                      |
| gas                  | Number | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                  |
| gasPrice             | Number | (optional) Gas price provided by the sender in kei. The gasPrice must be the same as the unitPrice set in the Kaia node.                                                                                                                                                                                                                                |
| nonce                | Number | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.kaia.getTransactionCount`.                                                                                                                                                                                                                                     |
| key                  | Object | (optional) An `AccountForUpdate` instance containing the address and key to be used when updating the account. For instructions on how to create an AccountForUpdate instance for each key type, see [caver.kaia.accounts.createAccountForUpdate](../../caver.kaia.accounts.md#createaccountforupdate). |
| legacyKey            | Bool   | (optional) if updating the account to have a legacy key, set this true.                                                                                                                                                                                                                                                                                                 |
| publicKey            | String | (optional) if updating the account to have a public key, write down the 64 bytes public key.                                                                                                                                                                                                                                                                            |
| multisig             | Object | (optional) if updating the account to have a multisig key, write down the list of weighted public keys that make up the multisig. multisig also defines the threshold. When signing a transaction, the sum of the weights of the signatures must be larger than or equal to the threshold.                                              |
| roleTransactionKey   | Object | (optional) if updating the account to have a role-based key, write down roleTransactionKey. roleTransactionKey can be a public key or a multisig key. This roleTransactionKey will be used when signing a transaction.                                                                                                                  |
| roleAccountUpdateKey | Object | (optional) if updating the account to have a role-based key, write down roleAccountUpdateKey. roleAccountUpdateKey can be a public key or a multisig key. This roleAccountUpdateKey will be used when signing an AccountUpdate transaction.                                                                                             |
| roleFeePayerKey      | Object | (optional) if updating the account to have a role-based key, write down roleFeePayerKey. roleFeePayerKey can be a public key or a multisig key. This roleFeePayerKey will be used when signing a transaction as a feePayer.                                                                                                             |
| failKey              | Bool   | (optional) if updating the account to have a fail key, set this true.                                                                                                                                                                                                                                                                                                   |

A transaction object of type `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` can be used as a parameter in [caver.kaia.accounts.signTransaction](../../caver.kaia.accounts.md#signtransaction) for sender and in [caver.kaia.accounts.feePayerSignTransaction](../../caver.kaia.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.kaia.sendTransaction`.

| Name                 | Type   | Description                                                   |
| -------------------- | ------ | ------------------------------------------------------------- |
| feePayer             | String | The fee payer address of the transaction.     |
| senderRawTransaction | String | The RLP-encoded transaction signed by sender. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const sender = caver.kaia.accounts.wallet.add('0x{private key}')
const feePayer = caver.kaia.accounts.wallet.add('0x{private key}')

const accountForUpdate = caver.kaia.accounts.createAccountForUpdate(sender.address, '0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
    feeRatio: 30,
}, sender.privateKey)

caver.kaia.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.then(function(receipt){
    ...
})

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
    feeRatio: 30,
}, sender.privateKey)

caver.kaia.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error)
```
