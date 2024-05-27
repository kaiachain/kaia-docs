# Account

## defaultAccount <a id="defaultaccount"></a>

```javascript
caver.klay.defaultAccount
```

This default address is used as the default `from` property, if no `from`
property is specified in parameters of the following methods:

- [caver.klay.sendTransaction()](./transaction/sendtx-legacy.md#sendtransaction-legacy)
- [caver.klay.call()](./transaction/transaction.md#call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().call()](../caver.klay.Contract.md#methods-mymethod-call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().send()](../caver.klay.Contract.md#methods-mymethod-send)

**Property**

20-byte `String` - Any Kaia address.  You should have the private key for
that address in your node or keystore.  Default is `undefined`.

**Example**

```javascript
> caver.klay.defaultAccount;
undefined

// set the default account
> caver.klay.defaultAccount = '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe';
```

## accountCreated <a id="accountcreated"></a>

```javascript
caver.klay.accountCreated(address [, defaultBlock] [, callback])
```

Returns `true` if the account associated with the address is created. It returns `false` otherwise.

**NOTE** accountCreated checks if the account exists on the network, so even if a key pair is created, false is returned if the account matching the address does not exist on the actual blockchain network.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account you want to query to see if it has been created on the network. |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - The existence of an input address.

**Example**

```javascript
> caver.klay.accountCreated('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
true

> caver.klay.accountCreated('0x6a616d696e652e6b6c6179746t00000000000000').then(console.log);
false
```

## getAccount <a id="getaccount"></a>

```javascript
caver.klay.getAccount(address[, defaultBlock] [, callback])
```

Returns the account information of a given address. There are two different account types in Kaia: Externally Owned Account (EOA) and Smart Contract Account. See [Kaia Accounts](../../../../../learn/accounts.md#klaytn-accounts).

**NOTE** getAccount returns the account that exists on the network, so even if a key pair is created, null is returned if the account matching the address does not exist on the actual blockchain network.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account for which you want to get account information. |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns a JSON object - A JSON object that contains the account information.

**Example**

```javascript
> caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c').then(console.log);
{ 
  accType: 1,
  account:
  { 
     nonce: 3,
     balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
     humanReadable: false,
     key: { keyType: 1, key: {} } 
  } 
}

> caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c', 'latest').then(console.log);
{ 
  accType: 1,
  account:
  { 
     nonce: 3,
     balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
     humanReadable: false,
     key: { keyType: 1, key: {} } 
  } 
}
```


## getAccounts <a id="getaccounts"></a>

```javascript
caver.klay.getAccounts([callback])
```

Returns a list of accounts that the node controls.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array` - An array of addresses controlled by node.

**Example**

```javascript
> caver.klay.getAccounts().then(console.log);
["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf"]
```


## getAccountKey <a id="getaccountkey"></a>

```javascript
caver.klay.getAccountKey(address [, defaultBlock] [, callback])
```

Returns the account key of the Externally Owned Account (EOA) of the given address. If the account has AccountKeyLegacy or the account of the given address is a Smart Contract Account, it will return an empty key value. See [Account Key](../../../../../learn/accounts.md#account-key).

**NOTE** getAccountKey returns the account key if the account exists on the network, so even if a key pair is created, null is returned if the account matching the address does not exist on the actual blockchain network.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account for which you want to get accountKey. |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Object` - The account key consist of public key(s) and a key type.

**Example**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.klay.getAccountKey('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.klay.getAccountKey('0xe1be6edd35b68cbf69fe9376ed7320476cf18b5c').then(console.log);
{
  keyType: 2,
  key:{
    x:'0xb9a4b266083c05deb3ce95055510c34c84b8bb2ad1e0a687fafaf15118511e59',
    y:'0x7a28526d3d076d019f8856a56f1fefff33c6100e9f3a190e85d9c754aae7513d'
  }
}

// AccountKey type: AccountKeyFail
> caver.klay.getAccountKey('0xf6d69a7a006d7ab2dcef79195698f6c30895e7d5').then(console.log);
{
  keyType: 3,
  key:{}
}

// AccountKey type: AccountKeyWeightedMultiSig
> caver.klay.getAccountKey('0x676b02b1cb59bd86577f15ff17fb0d59d8ca1ab6').then(console.log);
{
  keyType: 4,
  key: {
    threshold: 2,
    keys: [
      {
        weight: 1,
        key: {
          x: '0xae6b72d7ce2c11520ac00cbd1c4da216171a96eae1ae3a0a1f979a554c9063ae',
          y: '0x79ddf38c8717030512f3ca6f304408a3beb51519b918b8d62a55ff4a8c165fea'
        }
      },
      {
        weight: 1,
        key: {
          x: '0xd4256fc43f42b3313b7204e42a82893a8d9b562f6c9b39456ee989339949c67c',
          y: '0xfc5e78e71b26f5a93b5bec454e4d63947576ffd23b4df624579ff4eb67a2a29b'
        }
      },
      {
        weight: 1,
        key: {
          x: '0xd653eae5f0e9cd6bfe4c3929f4c4f28c94f3bd183eafafee2d73db38a020d9d8',
          y: '0xe974e859b5be80755dedaebe937ac49800cbac483ca304179050a177e9ca0270'
        }
      }
    ]
  }
}

// AccountKey type: AccountKeyRoleBased
> caver.klay.getAccountKey('0x73436db2404853b41e4398d3cf094f1cce57f3bd').then(console.log);
{
  keyType: 5,
  key: [
      {
        key: {
          x: '0x819659d4f08e08d4bd97c6ce5ed2c2eb914201a5b3731eb9d208128df24b97dd',
          y: '0x1824267ab9e55f5a3fb1030f0299fa73fc0037305d5b1d90100e2131af41c010'
        },
        keyType: 2
      },
      {
        key: {
          x: '0x73363604ca8776a2883b02046361b7eb6bd11f4fc10700ee51c525bcded134c1',
          y: '0xfc3e3cb3f4f5b709df5a2075107bc73c8618440c08456bafc44ee6f27f9e6326'
        },
        keyType: 2
      },
      {
        key: {
          x: '0x95c920eb2571dff37baecdbbee32897e6e448c6725c5ab73569cc6f659684307',
          y: '0xef7839023c48acf710ad322356c12b7c5b7f475515ba7d5834f41a993f42b8f9'
        },
        keyType: 2
      }
  ]
}
```

## getBalance <a id="getbalance"></a>

```javascript
caver.klay.getBalance(address [, defaultBlock] [, callback])
```
Gets the balance of an address at a given block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address to get the balance of. |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

``Promise`` returns ``String`` - The current balance for the given address in peb.

**Example**

```javascript
> caver.klay.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);
"1000000000000"
```



## getCode <a id="getcode"></a>

```javascript
caver.klay.getCode(address [, defaultBlock] [, callback])
```
Gets the code at a specific address.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address to get the code from. |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

``Promise`` returns ``String`` - The data at given address ``address``.

**Example**

```javascript
> caver.klay.getCode("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8").then(console.log);
"0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"

```



## getTransactionCount <a id="gettransactioncount"></a>

```javascript
caver.klay.getTransactionCount(address [, blockNumber] [, callback])
```
Gets the number of transactions sent from this address.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address to get the number of transactions from. |
| blockNumber | number \| string | (optional) A block number, the string `pending` for the pending nonce, or the string `earliest` or `latest` as in the [default block parameter](./block.md#defaultblock). If omitted, `latest` will be used. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

| Type | Description |
| --- | --- |
| Number | The number of transactions sent from the given address. |

**Example**

```javascript
> caver.klay.getTransactionCount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
  .then(console.log);
1
```

## isContractAccount <a id="iscontractaccount"></a>

```javascript
caver.klay.isContractAccount(address [, defaultBlock] [, callback])
```

Returns `true` if an input account has a non-empty codeHash at the time of a specific block number. It returns `false` if the account is an EOA or a smart contract account which doesn't have codeHash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account you want to check for isContractAccount. |
| defaultBlock | Number \| String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - `true` means the input parameter is an existing smart contract address.

**Example**

```javascript
> caver.klay.isContractAccount('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
true

> caver.klay.isContractAccount('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log);
false
```

## sign <a id="sign"></a>

```javascript
caver.klay.sign(message, address [, callback])
```

Generates signed data specific to the Kaia network. Refer to [Kaia Platform API - klay_sign](../../../../../../references/json-rpc/klay/sign) to know how the signature is generated.

**NOTE**: This API provides the function to sign a message using an account that exists in your node. The account in the node must be unlocked to sign the message. To sign a transaction, use [caver.klay.signTransaction](./transaction/transaction.md#signtransaction).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| message | String | Message to sign. |
| address | String | The address of the account to sign the message with. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - The message signature signed with the account's private key.

**Example**

```javascript
> caver.klay.sign('Message to sign', '0x1427ac5d0f1c3174ee6ea05d29a9b05fd31d7579').then(console.log)
0xde8bd2f5a45de6b1baea57ed0219735ab60f0ef55c5e31a4b774824abea31bfc34c8bdbca43ed4155e8e6a8e0d11d7aba191ba025e0487ada2bcc422252b81591b
```
