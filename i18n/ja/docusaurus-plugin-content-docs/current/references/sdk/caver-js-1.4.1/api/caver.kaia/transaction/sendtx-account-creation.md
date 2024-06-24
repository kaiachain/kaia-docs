# Account Creation Transaction

## sendTransaction (ACCOUNT_CREATION) <a id="sendtransaction-account_creation"></a>

```javascript
caver.kaia.sendTransaction(transactionObject [, callback])
```

Sends an [Account Creation](../../../../../../learn/transactions/basic.md) transaction to the network.

**Parameters**

| Name                                                   | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                                      | Object                                    | The transaction object to send.                                                                                                                                                                                                                                                                                                                |
| transactionObject.type                 | String                                    | The type of "ACCOUNT_CREATION" transaction.                                                                                                                                                                                                                                                                               |
| transactionObject.from                 | String                                    | The sender address of the transaction.                                                                                                                                                                                                                                                                                                         |
| transactionObject.to                   | String                                    | The address which will be created newly.                                                                                                                                                                                                                                                                                                       |
| transactionObject.value                | Number \\| String \\| BN \\| BigNumber | The value transferred for the newly-created account in kei.                                                                                                                                                                                                                                                                                    |
| transactionObject.gas                  | Number                                    | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                      |
| transactionObject.gasPrice             | Number                                    | (optional) Gas price provided by the sender in kei. The gasPrice must be the same as the unitPrice set in the Kaia node.                                                                                                                                                                                    |
| transactionObject.nonce                | Number                                    | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.kaia.getTransactionCount`.                                                                                                                                                                                         |
| transactionObject.publicKey            | String                                    | (optional) if creating account with public key, write down 64 bytes of public key.                                                                                                                                                                                                                                          |
| transactionObject.multisig             | String                                    | (optional) if creating account with multisig key, write down multisig with multiple public keys. The public keys that make up multisig have their own weight. For transactions signed with multisig, the sum of the weights of the signature must be larger than or equal to the threshold. |
| transactionObject.roleTransactionKey   | String                                    | (optional) if creating account with role based key, write down roleTransactionKey with public key or multisig key. This roleTransactionKey is used when sign the transaction.                                                                                                                               |
| transactionObject.roleAccountUpdateKey | String                                    | (optional) if creating account with role based key, write down roleAccountUpdateKey with public key or multisig key. This roleAccountUpdateKey is used when sign an AccountUpdate transaction.                                                                                                              |
| transactionObject.roleFeePayerKey      | String                                    | (optional) if creating account with role based key, write down roleFeePayerKey with public key or multisig key. This roleFeePayerKey is used when sign the transaction as a feePayer.                                                                                                                       |
| transactionObject.failKey              | Bool                                      | (optional) if creating account with fail key, set it true                                                                                                                                                                                                                                                                                   |
| callback                                               | Function                                  | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                                                                                                                                                  |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript

// Case 1: Creating account with public key (human-readable)

// using the promise
caver.kaia.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: 'colin.klaytn',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: 'colin.klaytn',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
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

// Case 2: Creating account with public key (non-humanreadable)

// using the promise
caver.kaia.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
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

// Case 3: Creating account with fail key

// using the promise
caver.kaia.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    failKey: true,
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    failKey: true,
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

// Case 4: Creating account with weighted-multisig

// using the promise
caver.kaia.sendTransaction({
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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

// Case 5: Creating account with role-based key

// using the promise
caver.kaia.sendTransaction({
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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
