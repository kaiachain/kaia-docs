# caver.rpc.klay

`caver.rpc.klay` provides JSON-RPC call with `klay` name space.

## caver.rpc.klay.accountCreated <a href="#caver-rpc-klay-accountcreated" id="caver-rpc-klay-accountcreated"></a>

```javascript
caver.rpc.klay.accountCreated(address [, blockNumber] [, callback])
```

Returns `true` if the account associated with the address is created in the Klaytn blockchain platform. It returns `false` otherwise.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address     | string           | The address of the account you want to query to see if it has been created on the network.                 |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type    | Description                                      |
| ------- | ------------------------------------------------ |
| boolean | The existence of an input address in the Klaytn. |

**Example**

```javascript
> caver.rpc.klay.accountCreated('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.getAccount <a href="#caver-rpc-klay-getaccount" id="caver-rpc-klay-getaccount"></a>

```javascript
caver.rpc.klay.getAccount(address [, blockNumber] [, callback])
```

Returns the account information of a given address in the Klaytn. For more details about the types of an account in Klaytn, please refer to [Klaytn Account Types](../../../../../learn/accounts.md#klaytn-account-types).

**NOTE** `caver.rpc.klay.getAccount` returns the account that exists on the network, so `null` is returned if the account matching the address does not exist on the actual blockchain network.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address     | string           | The address of the account for which you want to get account information.                                  |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                  |
| ------ | -------------------------------------------------------------------------------------------- |
| object | An object that contains the account information. Each account type has different attributes. |

**Example**

```javascript
// Get account with EOA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
    accType: 1,
    account: {
        nonce: 0,
        balance: '0x',
        humanReadable: false,
        key: { keyType: 1, key: {} }
    }
}

// Get account with SCA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
    accType: 2,
    account: {
        nonce: 1,
        balance: '0x0',
        humanReadable: false,
        key: { keyType: 3, key: {} },
        storageRoot: '0xd0ce6b9ba63cf727d48833bcaf69f398bb353e9a5b6235ac5bb3a8e95ff90ecf',
        codeHash: '7pemrmP8fcguH/ut/SYHJoUSecfUIcUyeCpMf0sBYVI=',
        codeFormat: 0
    }
}
```

## caver.rpc.klay.getAccountKey <a href="#caver-rpc-klay-getaccountkey" id="caver-rpc-klay-getaccountkey"></a>

```javascript
caver.rpc.klay.getAccountKey(address [, blockNumber] [, callback])
```

Returns AccountKey of a given address. If the account has [AccountKeyLegacy](../../../../../learn/accounts.md#accountkeylegacy) or the account of the given address is a [Smart Contract Account](../../../../../learn/accounts.md#smart-contract-accounts-scas), it will return an empty key value. Please refer to [Account Key](../../../../../learn/accounts.md#account-key) for more details.

**NOTE** `caver.rpc.klay.getAccountKey` returns an object that differs by each AccountKey type. If a Klaytn account matching the given address does not exist in the network, `null` is returned.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address     | string           | The address of Klaytn account from which you want to get an object of AccountKey information.              |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------- |
| object | An object that contains AccountKey information. Each AccountKey type has different attributes. |

**Example**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 2,
    key: { x:'0xb9a4b...', y:'0x7a285...' }
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 3, key:{} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 4,
    key: {
        threshold: 2,
        keys: [
            {
                weight: 1,
                key: { x: '0xae6b7...', y: '0x79ddf...' }
            },
            {
                weight: 1,
                key: { x: '0xd4256...', y: '0xfc5e7...' }
            },
            {
                weight: 1,
                key: { x: '0xd653e...', y: '0xe974e...' }
            }
        ]
    }
}

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 5,
    key: [
            {
                key: { x: '0x81965...', y: '0x18242...' },
                keyType: 2
            },
            {
                key: { x: '0x73363...', y: '0xfc3e3...' },
                keyType: 2
            },
            {
                key: { x: '0x95c92...', y: '0xef783...' },
                keyType: 2
            }
    ]
}
```

## caver.rpc.klay.encodeAccountKey <a href="#caver-rpc-klay-encodeaccountkey" id="caver-rpc-klay-encodeaccountkey"></a>

```javascript
caver.rpc.klay.encodeAccountKey(accountKey [, callback])
```

Encodes an object that contains AccountKey information using the Recursive Length Prefix (RLP) encoding scheme. Also you can use [account.getRLPEncodingAccountKey](../caver.account.md#account-getrlpencodingaccountkey) to get RLP-encoded AccountKey.

**Parameters**

| Name       | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountKey | object   | An object defines `keyType` and `key` inside or an instance of `AccountKey` ([AccountKeyLegacy](../caver.account.md#accountkeylegacy), [AccountKeyPublic](../caver.account.md#accountkeypublic), [AccountKeyFail](../caver.account.md#accountkeyfail), [AccountKeyWeightedMultiSig](../caver.account.md#accountkeyweightedmultisig) or [AccountKeyRoleBased](../caver.account.md#accountkeyrolebased)). |
| callback   | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                                                                                                                                                                                                                              |

**Return Value**

`Promise` returns `string`

| Type   | Description               |
| ------ | ------------------------- |
| string | A RLP-encoded AccountKey. |

**Example**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.encodeAccountKey({ keyType: 1, key: {} }).then(console.log)
0x01c0

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.encodeAccountKey({
        keyType: 2,
        key: {
            x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
            y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
        },
    }).then(console.log)
0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8

// AccountKey type: AccountKeyFail
> caver.rpc.klay.encodeAccountKey({ keyType: 3, key: {} }).then(console.log)
0x03c0

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.encodeAccountKey({
        keyType: 4,
        key: {
            threshold: 2,
            keys: [
                {
                    weight: 1,
                    key: {
                        x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
                        y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
                    },
                },
                {
                    weight: 1,
                    key: {
                        x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
                        y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
                    },
                },
            ],
        },
    }).then(console.log)
0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.encodeAccountKey({
        keyType: 5,
        key: [
            {
                keyType: 2,
                key: {
                    x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                    y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                },
            },
            {
                keyType: 4,
                key: {
                    threshold: 2,
                    keys: [
                        {
                            weight: 1,
                            key: {
                                x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                                y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                            },
                        },
                        {
                            weight: 1,
                            key: {
                                x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
                                y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
                            },
                        },
                    ],
                },
            },
            {
                keyType: 2,
                key: {
                    x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
                    y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
                },
            },
        ],
    }).then(console.log)
0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160

// Use an AccountKey instance
> const accountKey = caver.account.create('0x{address in hex}', '0xf1d2e...').accountKey
> caver.rpc.klay.encodeAccountKey(accountKey).then(console.log)
0x02a102f1d2e558cfa07151534cd406b1ac5c25d99e9c1cf925328d14fd15c6fe50df27
```

## caver.rpc.klay.decodeAccountKey <a href="#caver-rpc-klay-decodeaccountkey" id="caver-rpc-klay-decodeaccountkey"></a>

```javascript
caver.rpc.klay.decodeAccountKey(encodedKey [, callback])
```

Decodes a RLP-encoded AccountKey. Also you can use [caver.account.accountKey.decode](../caver.account.md#caver-account-accountkey-decode) to decode a RLP-encoded AccountKey.

**Parameters**

| Name       | Type     | Description                                                                                                |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| encodedKey | string   | A RLP-encoded AccountKey.                                                                                  |
| callback   | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description                                   |
| ------ | --------------------------------------------- |
| object | An object defines `keyType` and `key` inside. |

**Example**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.decodeAccountKey('0x01c0').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.decodeAccountKey('0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8').then(console.log)
{
    keyType: 2,
    key: {
        x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
        y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
    },
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.decodeAccountKey('0x03c0').then(console.log)
{ keyType: 3, key: {} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.decodeAccountKey('0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb').then(console.log)
{
    keyType: 4,
    key: {
        threshold: 2,
        keys: [
            {
                weight: 1,
                key: {
                    x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
                    y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
                },
            },
            {
                weight: 1,
                key: {
                    x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
                    y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
                },
            },
        ],
    },
}


// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.decodeAccountKey('0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160').then(console.log)
{
    keyType: 5,
    key: [
        {
            keyType: 2,
            key: {
                x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
            },
        },
        {
            keyType: 4,
            key: {
                threshold: 2,
                keys: [
                    {
                        weight: 1,
                        key: {
                            x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                            y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                        },
                    },
                    {
                        weight: 1,
                        key: {
                            x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
                            y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
                        },
                    },
                ],
            },
        },
        {
            keyType: 2,
            key: {
                x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
                y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
            },
        },
    ],
}
```

## caver.rpc.klay.getBalance <a href="#caver-rpc-klay-getbalance" id="caver-rpc-klay-getbalance"></a>

```javascript
caver.rpc.klay.getBalance(address [, blockNumber] [, callback])
```

Returns the balance of the account of the given address in Klaytn.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address     | string           | The address of the account for which you want to get balance.                                              |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                                       |
| ------ | ------------------------------------------------- |
| string | The current balance for the given address in peb. |

**Example**

```javascript
> caver.rpc.klay.getBalance('0x{address in hex}').then(console.log)
0xde0b6b3a7640000
```

## caver.rpc.klay.getCode <a href="#caver-rpc-klay-getcode" id="caver-rpc-klay-getcode"></a>

```javascript
caver.rpc.klay.getCode(address [, blockNumber] [, callback])
```

Returns code at a given address.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address     | string           | The address to get the code from.                                                                          |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                      |
| ------ | -------------------------------- |
| string | The code from the given address. |

**Example**

```javascript
> caver.rpc.klay.getCode('0x{address in hex}').then(console.log)
0x60806...
```

## caver.rpc.klay.getTransactionCount <a href="#caver-rpc-klay-gettransactioncount" id="caver-rpc-klay-gettransactioncount"></a>

```javascript
caver.rpc.klay.getTransactionCount(address [, blockNumber] [, callback])
```

Returns the total number of transactions sent from an address.

**Parameters**

| Name        | Type             | Description                                                                                                                                                                                                                                                        |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address     | string           | The address to get the number of transactions from.                                                                                                                                                                                                                |
| blockNumber | number \| string | (optional) A block number, the string `pending` for the pending nonce, or the string `earliest` or `latest` as in the [default block parameter](../../../../json-rpc/klay/block.md#the-default-block-parameter). If omitted, `latest` will be used. |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                                                                                         |

**Return Value**

`Promise` returns `string`

| Type   | Description                                                    |
| ------ | -------------------------------------------------------------- |
| string | The number of transactions sent from the given address in hex. |

**Example**

```javascript
> caver.rpc.klay.getTransactionCount('0x{address in hex}').then(console.log)
0x5f
```

## caver.rpc.klay.isContractAccount <a href="#caver-rpc-klay-iscontractaccount" id="caver-rpc-klay-iscontractaccount"></a>

```javascript
caver.rpc.klay.isContractAccount(address [, blockNumber] [, callback])
```

Returns `true` if an input account has a non-empty codeHash at the time of a specific block number. It returns `false` if the account is an EOA or a smart contract account which doesn't have codeHash. Please refer to [Smart Contract Account](../../../../../learn/accounts.md#smart-contract-accounts-scas) for more details.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address     | string           | The address you want to check for isContractAccount.                                                       |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type    | Description                                                           |
| ------- | --------------------------------------------------------------------- |
| boolean | true means the input parameter is an existing smart contract address. |

**Example**

```javascript
> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
false

> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.sign <a href="#caver-rpc-klay-sign" id="caver-rpc-klay-sign"></a>

```javascript
caver.rpc.klay.sign(address, message [, blockNumber] [, callback])
```

Generates signed data specific to the Klaytn. Refer to [Klaytn Platform API - klay_sign](../../../../json-rpc/klay/account.md#klay_sign) to know how the signature is generated.

**NOTE**: This API provides the function to sign a message using an [imported account](../../../../json-rpc/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/personal.md#personal_unlockaccount) to sign the message. To sign a transaction with imported account in your Klaytn node, use [caver.rpc.klay.signTransaction](#caver-rpc-klay-signtransaction).

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address     | String           | The address of the imported account to sign the message.                                                   |
| message     | String           | Message to sign.                                                                                           |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                                  |
| ------ | -------------------------------------------- |
| string | The signature made from an imported account. |

**Example**

```javascript
> caver.rpc.klay.sign('0x{address in hex}', '0xdeadbeaf').then(console.log)
0x1066e052c4be821daa4d0a0cd1e9e75ccb200bb4001c2e38853ba41b712a5a226da2acd67c86a13b266e0d75d0a6e7d1551c8924af413267615a5948617c746c1c
```

## caver.rpc.klay.getAccounts <a href="#caver-rpc-klay-getaccounts" id="caver-rpc-klay-getaccounts"></a>

```javascript
caver.rpc.klay.getAccounts([callback])
```

Returns a list of addresses owned by the Klaytn Node.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type  | Description                                     |
| ----- | ----------------------------------------------- |
| Array | An array of addresses owned by the Klaytn Node. |

**Example**

```javascript
> caver.rpc.klay.getAccounts().then(console.log)
[
    '0xe1531e916857d1b3a7db92f9187b96a7b43813bf',
    '0x75331c25535052157ff5110ba7d0cf940d3a9ca6'
]
```

## caver.rpc.klay.getBlockNumber <a href="#caver-rpc-klay-getblocknumber" id="caver-rpc-klay-getblocknumber"></a>

```javascript
caver.rpc.klay.getBlockNumber([callback])
```

Returns the number of the most recent block.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                                 |
| ------ | ------------------------------------------- |
| string | The number of the most recent block in hex. |

**Example**

```javascript
> caver.rpc.klay.getBlockNumber().then(console.log)
0x5d39
```

## caver.rpc.klay.getHeader <a href="#caver-rpc-klay-getheader" id="caver-rpc-klay-getheader"></a>

```javascript
caver.rpc.klay.getHeader(blockNumberOrHash [, callback])
```

Returns a block header by block hash or block number. If the user passes the block hash as a parameter, [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash) is called, and if the block number is called as a parameter, [caver.rpc.klay.getHeaderByNumber](#caver-rpc-klay-getheaderbynumber) is called.

**Parameters**

| Name              | Type             | Description                                                                                                |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumberOrHash | number \| string | The block hash, number or the block tag string.                                                            |
| callback          | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | A block header object. For a detailed description of the return value, please refer to [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash). |

**Example**

```javascript
> caver.rpc.klay.getHeader(1).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed: '0x0',
  governanceData: '0x',
  hash: '0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward: '0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp: '0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByNumber <a href="#caver-rpc-klay-getheaderbynumber" id="caver-rpc-klay-getheaderbynumber"></a>

```javascript
caver.rpc.klay.getHeaderByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

Returns a block header by block number.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | The block number or the block tag string.                                                                  |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | A block header object. For a detailed description of the return value, please refer to [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash). |

**Example**

```javascript
> caver.rpc.klay.getHeaderByNumber(765139).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed: '0x0',
  governanceData: '0x',
  hash: '0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward: '0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp: '0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByHash <a href="#caver-rpc-klay-getheaderbyhash" id="caver-rpc-klay-getheaderbyhash"></a>

```javascript
caver.rpc.klay.getHeaderByHash(blockHash [, returnTransactionObjects] [, callback])
```

Returns the block number of the most recent block by using `blockHash`.

**Parameters**

| Name      | Type     | Description                                                                                                |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | string   | The block hash.                                                                                            |
| callback  | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - An object includes the block header:

| Name             | Type   | Description                                                                                                                                                  |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| baseFeePerGas    | string | The base fee per gas. This value is returned only when EthTxTypeCompatibleBlock is activated for that block number.                                          |
| blockScore       | string | The difficulty of mining in the blockchain network. The use of `blockScore` differs from the consensus of the network. Always 1 in the BFT consensus engine. |
| extraData        | string | The "extra data" field of this block.                                                                                                                        |
| gasUsed          | string | The gas in total that was used by all transactions in this block.                                                                                            |
| governanceData   | string | RLP encoded governance configuration                                                                                                                         |
| hash             | string | Hash of the block. `null` when it is a pending block.                                                                                                        |
| logsBloom        | string | The bloom filter for the logs of the block. `null` when it is a pending block.                                                                               |
| number           | string | The block number. `null` when it is a pending block.                                                                                                         |
| parentHash       | string | Hash of the parent block.                                                                                                                                    |
| receiptsRoot     | string | The root of the receipts trie of the block.                                                                                                                  |
| reward           | string | The address of the beneficiary to whom the block rewards were given.                                                                                         |
| stateRoot        | string | The root of the final state trie of the block.                                                                                                               |
| timestamp        | string | The unix timestamp for when the block was collated.                                                                                                          |
| timestampFoS     | string | The fraction of a second of the timestamp for when the block was collated.                                                                                   |
| transactionsRoot | string | The root of the transaction trie of the block.                                                                                                               |

**Example**

```javascript
> caver.rpc.klay.getHeaderByHash('0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3').then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed: '0x0',
  governanceData: '0x',
  hash: '0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward: '0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp: '0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getBlock <a href="#caver-rpc-klay-getblock" id="caver-rpc-klay-getblock"></a>

```javascript
caver.rpc.klay.getBlock(blockNumberOrHash [, returnTransactionObjects] [, callback])
```

Returns information about a block by block hash or block number. If the user passes the block hash as a parameter, [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash) is called, and if the block number is called as a parameter, [caver.rpc.klay.getBlockByNumber](#caver-rpc-klay-getblockbynumber) is called.

**Parameters**

| Name                     | Type             | Description                                                                                                                                                      |
| ------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockNumberOrHash        | number \| string | The block hash, number or the block tag string.                                                                                                                  |
| returnTransactionObjects | boolean          | (optional, default `false`) If `true`, the returned block will contain all transactions as objects, and if `false`, it will only contain the transaction hashes. |
| callback                 | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                       |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | A block object. For a detailed description of the return value, please refer to [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash). |

**Example**

```javascript
> caver.rpc.klay.getBlock(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed: '0x0',
    governanceData: '0x',
    hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp: '0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions: [],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x',
}
```

## caver.rpc.klay.getBlockByNumber <a href="#caver-rpc-klay-getblockbynumber" id="caver-rpc-klay-getblockbynumber"></a>

```javascript
caver.rpc.klay.getBlockByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

Returns information about a block by block number.

**Parameters**

| Name                     | Type             | Description                                                                                                                                                      |
| ------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber              | number \| string | The block number or the block which is tagged with a string (`genesis` or `latest`).                                                                             |
| returnTransactionObjects | boolean          | (optional, default `false`) If `true`, the returned block will contain all transactions as objects, and if `false`, it will only contain the transaction hashes. |
| callback                 | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                       |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | A block object. For detailed description of return value, please refer to [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash). |

**Example**

```javascript
> caver.rpc.klay.getBlockByNumber(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed: '0x0',
    governanceData: '0x',
    hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp: '0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions: [],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockByHash <a href="#caver-rpc-klay-getblockbyhash" id="caver-rpc-klay-getblockbyhash"></a>

```javascript
caver.rpc.klay.getBlockByHash(blockHash [, returnTransactionObjects] [, callback])
```

Returns the block number of the most recent block by using `blockHash`.

**Parameters**

| Name                     | Type     | Description                                                                                                                                                      |
| ------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash                | string   | The block hash.                                                                                                                                                  |
| returnTransactionObjects | boolean  | (optional, default `false`) If `true`, the returned block will contain all transactions as objects, and if `false`, it will only contain the transaction hashes. |
| callback                 | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                       |

**Return Value**

`Promise` returns `object` - An object includes block:

| Name             | Type   | Description                                                                                                                                                  |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| baseFeePerGas    | string | The base fee per gas. This value is returned only when EthTxTypeCompatibleBlock is activated for that block number.                                          |
| blockScore       | string | The difficulty of mining in the blockchain network. The use of `blockScore` differs from the consensus of the network. Always 1 in the BFT consensus engine. |
| extraData        | string | The "extra data" field of this block.                                                                                                                        |
| gasUsed          | string | The gas in total that was used by all transactions in this block.                                                                                            |
| governanceData   | string | RLP encoded governance configuration                                                                                                                         |
| hash             | string | Hash of the block. `null` when it is a pending block.                                                                                                        |
| logsBloom        | string | The bloom filter for the logs of the block. `null` when it is a pending block.                                                                               |
| number           | string | The block number. `null` when it is a pending block.                                                                                                         |
| parentHash       | string | Hash of the parent block.                                                                                                                                    |
| receiptsRoot     | string | The root of the receipts trie of the block.                                                                                                                  |
| reward           | string | The address of the beneficiary to whom the block rewards were given.                                                                                         |
| size             | string | Integer the size of this block in bytes.                                                                                                                     |
| stateRoot        | string | The root of the final state trie of the block.                                                                                                               |
| timestamp        | string | The unix timestamp for when the block was collated.                                                                                                          |
| timestampFoS     | string | The fraction of a second of the timestamp for when the block was collated.                                                                                   |
| totalBlockScore  | string | Integer of the total blockScore of the chain until this block.                                                                                               |
| transactions     | Array  | Array of transaction objects, or 32-byte transaction hashes depending on the `returnTransactionObjects` parameter.                                           |
| transactionsRoot | string | The root of the transaction trie of the block.                                                                                                               |
| voteData         | string | RLP encoded governance vote of the proposer.                                                                                                                 |

**Example**

```javascript
> caver.rpc.klay.getBlockByHash('0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b').then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed: '0x0',
    governanceData: '0x',
    hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp: '0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions: [],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockReceipts <a href="#caver-rpc-klay-getblockreceipts" id="caver-rpc-klay-getblockreceipts"></a>

```javascript
caver.rpc.klay.getBlockReceipts(blockHash [, callback])
```

Returns receipts included in a block identified by block hash.

**Parameters**

| Name      | Type     | Description                                                                                                |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | string   | The block hash.                                                                                            |
| callback  | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type  | Description                                                                                                                                                                                                                                                                        |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Array | The transaction receipts included in a block. If the target block contains no transaction, an empty array `[]` is returned. For detailed description of transaction receipt, please refer to [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt). |

**Example**

```javascript
> caver.rpc.klay.getBlockReceipts('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
[ 
    {
        blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
        blockNumber: '0x5301',
        contractAddress: null,
        from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
        gas: '0x61a8',
        gasPrice: '0x5d21dba00',
        gasUsed: '0x5208',
        logs: [],
        logsBloom: '0x00000...',
        nonce: '0x5e',
        senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
        signatures: [
            { 
                V: '0x4e44',
                R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
                S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
            }    
        ],
        status: '0x1',
        to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
        transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
        transactionIndex: '0x0',
        type: 'TxTypeValueTransfer',
        typeInt: 8,
        value: '0xde0b6b3a7640000'
    }
]
```

## caver.rpc.klay.getBlockTransactionCountByNumber <a href="#caver-rpc-klay-getblocktransactioncountbynumber" id="caver-rpc-klay-getblocktransactioncountbynumber"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByNumber(blockNumber [, callback])
```

Returns the number of transactions in a block matching the given block number.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | The block number or the block tag string (`genesis` or `latest`).                                          |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                                           |
| ------ | ----------------------------------------------------- |
| string | The number of transactions in the given block in hex. |

**Example**

```javascript
> caver.rpc.klay.getBlockTransactionCountByNumber(21249).then(console.log)
0x1
```

## caver.rpc.klay.getBlockTransactionCountByHash <a href="#caver-rpc-klay-getblocktransactioncountbyhash" id="caver-rpc-klay-getblocktransactioncountbyhash"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByHash(blockHash [, callback])
```

Returns the number of transactions in a block matching the given block hash.

**Parameters**

| Name      | Type     | Description                                                                                                |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | string   | The block hash.                                                                                            |
| callback  | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                                           |
| ------ | ----------------------------------------------------- |
| string | The number of transactions in the given block in hex. |

**Example**

```javascript
> caver.rpc.klay.getBlockTransactionCountByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
0x1
```

## caver.rpc.klay.getBlockWithConsensusInfoByNumber <a href="#caver-rpc-klay-getblockwithconsensusinfobynumber" id="caver-rpc-klay-getblockwithconsensusinfobynumber"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByNumber(blockNumber [, callback])
```

Returns a block with consensus information matched by the given block number.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | The block number or the block tag string (`genesis` or `latest`).                                          |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| string | An object includes block with consensus information. For detailed description of return value, please refer to [caver.rpc.klay.getBlockWithConsensusInfoByHash](#caver-rpc-klay-getblockwithconsensusinfobyhash). |

**Example**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByNumber(21249).then(console.log)
{
    blockscore: '0x1',
    committee: ['0xddc2002b729676dfd906484d35bb02a8634d7040', '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'],
    extraData: '0xd8830...',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
    logsBloom: '0x00000...',
    number: '0x5301',
    parentHash: '0x024f05c0e7428e33331104bedbfc453d481ce6a2f5e57f7fd68a4391ba6c2619',
    proposer: '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0xb74837f495060f3f794dcae8fa3e0c5d3cf99d9f',
    size: '0x313',
    stateRoot: '0x9964b2d8f23da7383a32ec33c9700a76ebf4a36315c9067c2fef7568d97e1d55',
    timestamp: '0x5ee851dd',
    timestampFoS: '0x0',
    totalBlockScore: '0x5302',
    transactions: [
        {
            blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
            blockNumber: '0x5301',
            contractAddress: null,
            from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
            gas: '0x61a8',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x5208',
            logs: [],
            logsBloom: '0x00000...',
            nonce: '0x5e',
            senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            signatures: {
                V: '0x4e44',
                R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
                S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
            },
            status: '0x1',
            to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
            transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            transactionIndex: '0x0',
            type: 'TxTypeValueTransfer',
            typeInt: 8,
            value: '0xde0b6b3a7640000',
        },
    ],
    transactionsRoot: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
    voteData: '0x',
}
```

## caver.rpc.klay.getBlockWithConsensusInfoByHash <a href="#caver-rpc-klay-getblockwithconsensusinfobyhash" id="caver-rpc-klay-getblockwithconsensusinfobyhash"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByHash(blockHash [, callback])
```

Returns a block with consensus information matched by the given hash.

**Parameters**

| Name      | Type     | Description                                                                                                |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | string   | The block hash.                                                                                            |
| callback  | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - A block object with consensus information (a proposer and a list of committee members), or null when no block was found:

| Name             | Type   | Description                                                                                                                                               |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockScore       | string | Former difficulty. Always 1 in the BFT consensus engine                                                                                                   |
| committee        | Array  | Array of addresses of committee members of this block. The committee is a subset of validators who participated in the consensus protocol for this block. |
| extraData        | string | The "extra data" field of this block.                                                                                                                     |
| gasUsed          | string | The gas in total that was used by all transactions in this block.                                                                                         |
| governanceData   | string | RLP encoded governance configuration                                                                                                                      |
| hash             | string | Hash of the block. `null` when it is a pending block.                                                                                                     |
| logsBloom        | string | The bloom filter for the logs of the block. `null` when it is a pending block.                                                                            |
| number           | string | The block number. `null` when it is a pending block.                                                                                                      |
| originProposer   | string | The proposal of 0 round at the same block number.                                                                                                         |
| parentHash       | string | Hash of the parent block.                                                                                                                                 |
| proposer         | string | The address of the block proposer.                                                                                                                        |
| receiptsRoot     | string | The root of the receipts trie of the block.                                                                                                               |
| reward           | string | The address of the beneficiary to whom the block rewards were given.                                                                                      |
| round            | number | The round number.                                                                                                                                         |
| size             | string | Integer the size of this block in bytes.                                                                                                                  |
| stateRoot        | string | The root of the final state trie of the block.                                                                                                            |
| timestamp        | string | The unix timestamp for when the block was collated.                                                                                                       |
| timestampFoS     | string | The fraction of a second of the timestamp for when the block was collated.                                                                                |
| totalBlockScore  | string | Integer of the total blockScore of the chain until this block.                                                                                            |
| transactions     | Array  | Array of transaction objects.                                                                                                                             |
| transactionsRoot | string | The root of the transaction trie of the block.                                                                                                            |
| voteData         | string | RLP encoded governance vote of the proposer                                                                                                               |

**Example**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
{
    blockscore: '0x1',
    committee: [ '0x571e5...', '0x5cb1a...', '0x99fb1...', '0xb74ff...' ],
    extraData: '0xd8830...',
    gasUsed: '0x3ea49',
    governanceData: '0x',
    hash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
    logsBloom: '0x00000...',
    number: '0x3f79aa7',
    originProposer: '0x99fb17d324fa0e07f23b49d09028ac0919414db6',
    parentHash: '0x777d344c8c59c4d8d0041bb4c2ee66e95ec110303fb59d3e329f80e7a9c9c617',
    proposer: '0x99fb17d324fa0e07f23b49d09028ac0919414db6',
    receiptsRoot: '0xffbae3190f858531ff785bcbdc70278d91c3d9becdd8b134b0ab7974b9ef3641',
    reward: '0xb2bd3178affccd9f9f5189457f1cad7d17a01c9d',
    round: 0,
    size: '0x507',
    stateRoot: '0xa60d0868bd41b63b4fd67e5a8f801c5949e89a8994a13426747890b77d6bc0c4',
    timestamp: '0x610b3164',
    timestampFoS: '0xc',
    totalBlockScore: '0x3f79aa8',
    transactions: [
        {
            blockHash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
            blockNumber: '0x3f79aa7',
            contractAddress: null,
            feePayer: '0xfee998d423d5bd2bf5b5c0f0acb4e3aae2bd2286',
            feePayerSignatures: [
                {
                    V: '0x7f5',
                    R: '0xf9aff6f39feb7a18d3e1b8ab9f590f0227e465c72cfe05e8d7c9e390cbf1d349',
                    S: '0x6e7317d121a3951a8cbca110be8cc86c5314349f8fb1c37f9af4cadf72fe89ec',
                },
            ],
            from: '0x11eb23f57151a88d4bb53cc9c27355437138c278',
            gas: '0x2dc6c0',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x3ea49',
            input: '0x850ba...',
            logs: [
                {
                    address: '0x78ca9a1105c3392b56625f3fcfd149b29322c56f',
                    topics: [ '0xddf25...', '0x00000...', '0x00000...', '0x00000...' ],
                    data: '0x',
                    blockNumber: '0x3f79aa7',
                    transactionHash: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
                    transactionIndex: '0x0',
                    blockHash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
                    logIndex: '0x0',
                    removed: false,
                },
            ],
            logsBloom: '0x00000...',
            nonce: '0x0',
            senderTxHash: '0xeca2d3650403a1e27af0bbe9878dcbb248d764fc88751f35a6e05636d2ad9e78',
            signatures: [
                {
                    V: '0x7f6',
                    R: '0x9ea78985b004afa86acd455c017da374ec1aec885f963ec8134a38f7ede451b0',
                    S: '0xfac0e417f7f7b15023e3f5ac95f1fb5b3280746a2eff04394ddedbdd259fc1',
                },
            ],
            status: '0x1',
            to: '0x78ca9a1105c3392b56625f3fcfd149b29322c56f',
            transactionHash: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
            transactionIndex: '0x0',
            type: 'TxTypeFeeDelegatedSmartContractExecution',
            typeInt: 49,
            value: '0x0',
        },
    ],
    transactionsRoot: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
    voteData: '0x',
}
```

## caver.rpc.klay.getCommittee <a href="#caver-rpc-klay-getcommittee" id="caver-rpc-klay-getcommittee"></a>

```javascript
caver.rpc.klay.getCommittee([blockNumber] [, callback])
```

Returns a list of all validators in the committee at the specified block.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type  | Description                                                      |
| ----- | ---------------------------------------------------------------- |
| Array | Addresses of all validators in the committee at the given block. |

**Example**

```javascript
> caver.rpc.klay.getCommittee().then(console.log)
[
    '0xddc2002b729676dfd906484d35bb02a8634d7040',
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'
]
```

## caver.rpc.klay.getCommitteeSize <a href="#caver-rpc-klay-getcommitteesize" id="caver-rpc-klay-getcommitteesize"></a>

```javascript
caver.rpc.klay.getCommitteeSize([blockNumber] [, callback])
```

Returns the size of the committee at the specified block.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `number`

| Type   | Description                                   |
| ------ | --------------------------------------------- |
| number | The size of the committee at the given block. |

**Example**

```javascript
> caver.rpc.klay.getCommitteeSize().then(console.log)
2
```

## caver.rpc.klay.getCouncil <a href="#caver-rpc-klay-getcouncil" id="caver-rpc-klay-getcouncil"></a>

```javascript
caver.rpc.klay.getCouncil([blockNumber] [, callback])
```

Returns a list of all validators of the council at the specified block.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type  | Description                                                                                           |
| ----- | ----------------------------------------------------------------------------------------------------- |
| Array | An array of validator addresses of the council at the given block, or null when no council was found. |

**Example**

```javascript
> caver.rpc.klay.getCouncil().then(console.log)
[
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    '0xddc2002b729676dfd906484d35bb02a8634d7040'
]
```

## caver.rpc.klay.getCouncilSize <a href="#caver-rpc-klay-getcouncilsize" id="caver-rpc-klay-getcouncilsize"></a>

```javascript
caver.rpc.klay.getCouncilSize([blockNumber] [, callback])
```

Returns the size of the council at the specified block.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `number`

| Type   | Description                                 |
| ------ | ------------------------------------------- |
| number | The size of the council at the given block. |

**Example**

```javascript
> caver.rpc.klay.getCouncilSize().then(console.log)
2
```

## caver.rpc.klay.getStorageAt <a href="#caver-rpc-klay-getstorageat" id="caver-rpc-klay-getstorageat"></a>

```javascript
caver.rpc.klay.getStorageAt(address, position [, blockNumber] [, callback])
```

Returns the value from a storage position at a given address.

**Parameters**

| Name        | Type             | Description                                                                                                                                                                                 |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address     | string           | The address to get the storage from.                                                                                                                                                        |
| position    | number           | The index position of the storage. For more information on `calculating the position`, refer to [klay_getStorageAt](../../../../json-rpc/klay/block.md#klay_getstorageat). |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.                                                                                         |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                  |

**Return Value**

`Promise` returns `string`

| Type   | Description                         |
| ------ | ----------------------------------- |
| string | The value at this storage position. |

**Example**

```javascript
> caver.rpc.klay.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 0).then(console.log)
0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234
```

## caver.rpc.klay.isMinting <a href="#caver-rpc-klay-isminting" id="caver-rpc-klay-isminting"></a>

```javascript
caver.rpc.klay.isMinting([callback])
```

Returns `true` if client is actively mining new blocks.

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean` - `true` if the client is mining, otherwise `false`.

**Example**

```javascript
> caver.rpc.klay.isMinting().then(console.log)
true
```

## caver.rpc.klay.isSyncing <a href="#caver-rpc-klay-issyncing" id="caver-rpc-klay-issyncing"></a>

```javascript
caver.rpc.klay.isSyncing([callback])
```

Returns an object with data about the sync status or false.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object|boolean` - `false` if the Klaytn Node is not syncing. Otherwise, a sync object is returned:

| Name          | Type   | Description                                                 |
| ------------- | ------ | ----------------------------------------------------------- |
| startingBlock | string | The block number in hex where the sync started.             |
| currentBlock  | string | The block number in hex where the node currently synced to. |
| highestBlock  | string | The estimated block number in hex to sync to.               |
| knownStates   | string | The estimated states in hex to download.                    |
| pulledStates  | string | The already downloaded states in hex.                       |

**Example**

```javascript
> caver.rpc.klay.isSyncing().then(console.log)
{
        startingBlock: 100,
        currentBlock: 312,
        highestBlock: 512,
        knownStates: 234566,
        pulledStates: 123455
}

> caver.rpc.klay.isSyncing().then(console.log)
false
```

## caver.rpc.klay.call <a href="#caver-rpc-klay-call" id="caver-rpc-klay-call"></a>

```javascript
caver.rpc.klay.call(callObject [, blockNumber] [, callback])
```

Executes a new message call immediately without sending a transaction on the blockchain. It returns data or an error object of JSON RPC if an error occurs.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| callObject  | object           | A transaction call object. See the next table for the object's properties.                                 |
| blockNumber | number \| string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.        |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

`callObject` has the following properties:

| Name     | Type   | Description                                                                                                                                         |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| to       | string | (optional when testing the deployment of a new contract) The address the transaction is directed to.                                                |
| input    | string | (optional) The hash of the method signature and encoded parameters. You can use [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall). |
| from     | string | (optional) The address the transaction is sent from.                                                                                                |
| gas      | string | (optional) The gas provided for the transaction execution. `klay_call` consumes zero gas, but this parameter may be needed by some executions.      |
| gasPrice | string | (optional) The gasPrice used for each paid gas.                                                                                                     |
| value    | string | (optional) The value sent with this transaction in `peb`.                                                                                           |

**Return Value**

`Promise` returns `string`

| Type   | Description                                                                           |
| ------ | ------------------------------------------------------------------------------------- |
| string | The returned data of the call. _e.g._, the return value of a smart contract function. |

**Example**

```javascript
> caver.rpc.klay.call({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x70a08231000000000000000000000000ddc2002b729676dfd906484d35bb02a8634d7040'
    }).then(console.log)
0x0000000000000000000000000000000000000000000000000de0b6b3a7640000
```

## caver.rpc.klay.estimateGas <a href="#caver-rpc-klay-estimategas" id="caver-rpc-klay-estimategas"></a>

```javascript
caver.rpc.klay.estimateGas(callObject [, blockNumber] [, callback])
```

Generates and returns an estimate of how much `gas` is necessary to allow a transaction to complete. The transaction from this method will not be added to the blockchain.

**Parameters**

See [caver.rpc.klay.call](#caver-rpc-klay-call) parameters, expect that all properties are optional.

**Return Value**

`Promise` returns `string`

| Type   | Description             |
| ------ | ----------------------- |
| string | The amount of gas used. |

**Example**

```javascript
> caver.rpc.klay.estimateGas({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xb2a0
```

## caver.rpc.klay.estimateComputationCost <a href="#caver-rpc-klay-estimatecomputationcost" id="caver-rpc-klay-estimatecomputationcost"></a>

```javascript
caver.rpc.klay.estimateComputationCost(callObject [, blockNumber] [, callback])
```

Generates and returns an estimate of how much `computation cost` will be spent to execute the transaction. Klaytn limits the computation cost of a transaction to `100000000` currently not to take too much time by a single transaction. The transaction will not be added to the blockchain like [caver.rpc.klay.estimateGas](#caver-rpc-klay-estimategas).

**Parameters**

See [caver.rpc.klay.call](#caver-rpc-klay-call) parameters, expect that all properties are optional.

**Return Value**

`Promise` returns `string`

| Type   | Description                          |
| ------ | ------------------------------------ |
| string | The amount of computation cost used. |

**Example**

```javascript
> caver.rpc.klay.estimateComputationCost({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xd761
```

## caver.rpc.klay.getTransactionByBlockHashAndIndex <a href="#caver-rpc-klay-gettransactionbyblockhashandindex" id="caver-rpc-klay-gettransactionbyblockhashandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockHashAndIndex(blockHash, index [, callback])
```

Returns information about a transaction by `block hash` and `transaction index` position.

**Parameters**

| Name      | Type     | Description                                                                                                |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | string   | The block hash.                                                                                            |
| index     | number   | A transaction index position inside the block.                                                             |
| callback  | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                   |
| ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| object | A transaction object, see [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash) for more detail. |

**Example**

```javascript
> caver.rpc.klay.getTransactionByBlockHashAndIndex('0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576', 0).then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000'
}
```

## caver.rpc.klay.getTransactionByBlockNumberAndIndex <a href="#caver-rpc-klay-gettransactionbyblocknumberandindex" id="caver-rpc-klay-gettransactionbyblocknumberandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockNumberAndIndex(blockNumber, index [, callback])
```

Returns information about a transaction by `block number` and `transaction index` position.

**Parameters**

| Name        | Type             | Description                                                                                                |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | The block number or the block tag string (`genesis` or `latest`).                                          |
| index       | number           | A transaction index position inside the block.                                                             |
| callback    | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                   |
| ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| object | A transaction object, see [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash) for more detail. |

**Example**

```javascript
> caver.rpc.klay.getTransactionByBlockNumberAndIndex(183, 0).then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000'
}
```

## caver.rpc.klay.getTransactionByHash <a href="#caver-rpc-klay-gettransactionbyhash" id="caver-rpc-klay-gettransactionbyhash"></a>

```javascript
caver.rpc.klay.getTransactionByHash(transactionHash [, callback])
```

Returns the information about a transaction requested by transaction hash.

**Parameters**

| Name            | Type     | Description                                                                                                |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionHash | string   | A transaction hash.                                                                                        |
| callback        | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - A transaction object, or `null` when no transaction was found:

| Name               | Type    | Description                                                                                                                                                                                                  |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHash          | string  | Hash of the block where this transaction was in.                                                                                                                                                             |
| blockNumber        | string  | Block number where this transaction was in.                                                                                                                                                                  |
| codeFormat         | string  | (optional) The code format of smart contract code.                                                                                                                                                           |
| feePayer           | string  | (optional) Address of the fee payer.                                                                                                                                                                         |
| feePayerSignatures | Array   | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio           | string  | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                            |
| from               | string  | Address of the sender.                                                                                                                                                                                       |
| gas                | string  | Gas provided by the sender.                                                                                                                                                                                  |
| gasPrice           | string  | Gas price provided by the sender in peb.                                                                                                                                                                     |
| hash               | string  | Hash of the transaction.                                                                                                                                                                                     |
| humanReadable      | Boolean | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                              |
| key                | string  | (optional) The RLP-encoded AccountKey used to update AccountKey of an Klaytn account. See [AccountKey](../../../../../learn/accounts.md#account-key) for more details.                               |
| input              | string  | (optional) The data sent along with the transaction.                                                                                                                                                         |
| nonce              | string  | The number of transactions made by the sender prior to this one.                                                                                                                                             |
| senderTxHash       | string  | (optional) Hash of the tx without the fee payer's address and signature. This value is always the same as the value of `hash` for non-fee-delegated transactions.                                            |
| signatures         | Array   | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                        |
| to                 | string  | Address of the receiver. `null` when it is a contract deploying transaction.                                                                                                                                 |
| transactionIndex   | string  | Integer of the transaction index position in the block.                                                                                                                                                      |
| type               | string  | A string representing the type of the transaction.                                                                                                                                                           |
| typeInt            | number  | An integer representing the type of the transaction.                                                                                                                                                         |
| value              | string  | Value transferred in peb.                                                                                                                                                                                    |

If the transaction is in `pending` status that has not yet been processed, default values for `blockHash`, `blockNumber` and `transactionIndex` are returned. See the example below.

**Example**

```javascript
> caver.rpc.klay.getTransactionByHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
    blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
    blockNumber: '0x74c',
    codeFormat: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x3d0900',
    gasPrice: '0x5d21dba00',
    hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    humanReadable: false,
    input: '0x60806...',
    nonce: '0xa',
    senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
    to: null,
    transactionIndex: '0x0',
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
}

// When transaction is in pending, default values for `blockHash`, `blockNumber` and `trasnactionIndex` are returned.
> caver.rpc.klay.getTransactionByHash('0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1').then(console.log)
{
    blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    blockNumber: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
    nonce: '0xd',
    senderTxHash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
    signatures: [ { V: '0x4e44', R: '0x73634...', S: '0x479be...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.getTransactionBySenderTxHash <a href="#caver-rpc-klay-gettransactionbysendertxhash" id="caver-rpc-klay-gettransactionbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionBySenderTxHash(senderTxHash [, callback])
```

Returns the information about a transaction requested by the sender transaction hash.

Please note that this API returns the correct result only if the indexing feature is enabled in the node by `--sendertxhashindexing`. Use [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) to check if the indexing feature is enabled or not.

**Parameters**

| Name         | Type     | Description                                                                                                               |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| senderTxHash | string   | The sender transaction hash. See [SenderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) for more detail. |
| callback     | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| object | A transaction object, see [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash) for more details. |

**Example**

```javascript
> caver.rpc.klay.getTransactionBySenderTxHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
    blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
    blockNumber: '0x74c',
    codeFormat: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x3d0900',
    gasPrice: '0x5d21dba00',
    hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    humanReadable: false,
    input: '0x60806...',
    nonce: '0xa',
    senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
    to: null,
    transactionIndex: '0x0',
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
}
```

## caver.rpc.klay.getTransactionReceipt <a href="#caver-rpc-klay-gettransactionreceipt" id="caver-rpc-klay-gettransactionreceipt"></a>

```javascript
caver.rpc.klay.getTransactionReceipt(transactionHash [, callback])
```

Returns the receipt of a transaction by transaction hash.

**NOTE** Receipt is not available for `pending` transactions whose transactions have not yet been processed.

**Parameters**

| Name            | Type     | Description                                                                                                |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionHash | string   | A transaction hash.                                                                                        |
| callback        | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - A transaction receipt object, or `null` when no receipt was found:

| Name               | Type    | Description                                                                                                                                                                                                                             |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | string  | Hash of the block where this transaction was in.                                                                                                                                                                                        |
| blockNumber        | string  | Block number where this transaction was in.                                                                                                                                                                                             |
| codeFormat         | string  | (optional) The code format of smart contract code.                                                                                                                                                                                      |
| contractAddress    | string  | The contract address created, if the transaction was a contract creation, otherwise `null`.                                                                                                                                             |
| effectiveGasPrice  | string  | The actual value per gas deducted from the sender. Before the Magma hard fork, this value was equal to the transaction’s gas price. After the Magma hard fork, it is equal to the value of `baseFee` in the block header.               |
| feePayer           | string  | (optional) Address of the fee payer.                                                                                                                                                                                                    |
| feePayerSignatures | Array   | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                            |
| feeRatio           | string  | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                                                       |
| from               | string  | Address of the sender.                                                                                                                                                                                                                  |
| gas                | string  | Gas provided by the sender.                                                                                                                                                                                                             |
| gasPrice           | string  | Gas price provided by the sender in peb.                                                                                                                                                                                                |
| gasUsed            | string  | The amount of gas used by this specific transaction alone.                                                                                                                                                                              |
| humanReadable      | Boolean | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                                                         |
| key                | string  | (optional) The RLP-encoded AccountKey used to update AccountKey of a Klaytn account.                                                                                                                                                    |
| input              | string  | (optional) The data sent along with the transaction.                                                                                                                                                                                    |
| logs               | Array   | Array of log objects, which this transaction generated.                                                                                                                                                                                 |
| logsBloom          | string  | Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                                                        |
| nonce              | string  | The number of transactions made by the sender prior to this one.                                                                                                                                                                        |
| senderTxHash       | string  | (optional) Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash). This value is always the same as `transactionHash` for non-fee-delegated transactions. |
| signatures         | Array   | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                                                   |
| status             | string  | `0x1` if the transaction was successful, `0x0` if the Klaytn Virtual Machine reverted the transaction.                                                                                                                                  |
| txError            | string  | (optional) detailed error code if `status` is equal to `0x0`.                                                                                                                                                                           |
| to                 | string  | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                                             |
| transactionHash    | string  | Hash of the transaction.                                                                                                                                                                                                                |
| transactionIndex   | string  | Integer of the transaction index position in the block.                                                                                                                                                                                 |
| type               | string  | A string representing the type of the transaction.                                                                                                                                                                                      |
| typeInt            | number  | An integer representing the type of the transaction.                                                                                                                                                                                    |
| value              | string  | Value transferred in peb.                                                                                                                                                                                                               |

**NOTE** `effectiveGasPrice` is supported since caver-js [v1.9.0](https://www.npmjs.com/package/caver-js/v/1.9.0).

**Example**

```javascript
// Before the Magma hard fork
> caver.rpc.klay.getTransactionReceipt('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    effectiveGasPrice: '0x5d21dba00',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// After the Magma hard fork
> caver.rpc.klay.getTransactionReceipt('0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9').then(console.log)
{
  blockHash: '0xaa358681023db9d967ff44577a34aea487c37433ebf6ef349baee50f9d1d2f03',
  blockNumber: '0x99',
  contractAddress: null,
  effectiveGasPrice: '0x5d21dba00',
  from: '0xca7a99380131e6c76cfa622396347107aeedca2d',
  gas: '0x61a8',
  gasPrice: '0xba43b7400',
  gasUsed: '0x5208',
  logs: [],
  logsBloom: '0x00000...',
  nonce: '0x2',
  senderTxHash: '0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9',
  signatures: [ { V: '0x1cb4c6', R: '0x1605e...', S: '0x459cf...' } ],
  status: '0x1',
  to: '0x08ef5d2def29ff4384dd93a73e076d959abbd2f4',
  transactionHash: '0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9',
  transactionIndex: '0x0',
  type: 'TxTypeValueTransfer',
  typeInt: 8,
  value: '0xde0b6b3a7640000'
}
```

## caver.rpc.klay.getTransactionReceiptBySenderTxHash <a href="#caver-rpc-klay-gettransactionreceiptbysendertxhash" id="caver-rpc-klay-gettransactionreceiptbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionReceiptBySenderTxHash(senderTxHash [, callback])
```

Returns the receipt of a transaction by sender transaction hash.

Please note that this API returns the correct result only if the indexing feature is enabled in the node by `--sendertxhashindexing`. Use [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) to check if the indexing feature is enabled or not.

**NOTE** Receipt is not available for `pending` transactions whose transactions have not yet been processed.

**Parameters**

| Name         | Type     | Description                                                                                                               |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| senderTxHash | string   | The sender transaction hash. See [SenderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) for more detail. |
| callback     | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| object | A transaction receipt object, see [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail. |

**Example**

```javascript
> caver.rpc.klay.getTransactionReceiptBySenderTxHash('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    effectiveGasPrice: '0x5d21dba00',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.sendRawTransaction <a href="#caver-rpc-klay-sendrawtransaction" id="caver-rpc-klay-sendrawtransaction"></a>

```javascript
caver.rpc.klay.sendRawTransaction(signedTransaction [, callback])
```

Sends a `signed transaction` to the Klaytn.

The `signedTransaction` parameter can be a "RLP-encoded signed transaction." You can get the RLP-encoded transaction of a signed transaction using `transaction.getRLPEncoding`. For convenience, `caver.rpc.klay.sendRawTransaction` also accepts a "signed transaction instance" as parameter.

**Parameters**

| Name              | Type             | Description                                                                                                |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| signedTransaction | string \| object | A RLP-encoded signed transaction or an instance of signed transaction.                                     |
| callback          | function         | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

| Type       | Description                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| PromiEvent | A promise combined event emitter. It will be resolved when a transaction receipt is available. |

For PromiEvent, the following events are available:

* `transactionHash` returns `string`: Is fired right after a transaction is sent and a transaction hash is available.
* `receipt` returns `object`: Is fired when a transaction receipt is available. See [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail.
* `error` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
// Using promise
> caver.rpc.klay.sendRawTransaction('0x08f88...').then(console.log)
{
    blockHash: '0x8bff3eb5444711f53707c1c006dac54164af6f873c0f012aff98479155de3c46',
    blockNumber: '0x18a6',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0xc',
    senderTxHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
    signatures: [ { V: '0x4e43', R: '0x3bee4...', S: '0x101a1...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendRawTransaction('0x08f88...').on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.sendTransaction <a href="#caver-rpc-klay-sendtransaction" id="caver-rpc-klay-sendtransaction"></a>

```javascript
caver.rpc.klay.sendTransaction(transaction [, callback])
```

Signs a transaction as a transaction `sender` with an "imported account's private key" in your Klaytn Node and propagates the transaction to the Klaytn.

For more information about each transaction type, refer to [Transaction](../caver-transaction/caver-transaction.md#class).

**NOTE**: This API provides the function to sign a transaction using an [imported account](../../../../json-rpc/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/personal.md#personal_unlockaccount) to sign a transaction.

**Parameters**

| Name        | Type     | Description                                                                                                |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transaction | object   | An instance of a transaction to be sent to the Klaytn.                                                     |
| callback    | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

| Type       | Description                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| PromiEvent | A promise combined event emitter. It will be resolved when a transaction receipt is available. |

For PromiEvent, the following events are available:

* `transactionHash` returns `string`: Is fired right after a transaction is sent and a transaction hash is available.
* `receipt` returns `object`: Is fired when a transaction receipt is available. See [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail.
* `error` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
> const tx = caver.transaction.valueTransfer.create({
    from: '0x{address in hex}', // The address of imported account in Klaytn Node
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.convertToPeb(10, 'KLAY'),
    gas: 25000
})
// Using promise
> caver.rpc.klay.sendTransaction(tx).then(console.log)
{
    blockHash: '0xbfce3abcad0204e363ee9e3b94d15a20c1a4b86ac6cf51dd74db2226ab5b9e99',
    blockNumber: '0x1d18',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x13',
    senderTxHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
    signatures: [ { V: '0x4e43', R: '0xeac91...', S: '0xa0aa4...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendTransaction(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.sendTransactionAsFeePayer <a href="#caver-rpc-klay-sendtransactionasfeepayer" id="caver-rpc-klay-sendtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.sendTransactionAsFeePayer(transaction [, callback])
```

Signs a fee delegated transaction as a transaction `fee payer` with an `imported account's private key` in your Klaytn Node and propagates the transaction to the Klaytn.

Before using `sendTransaction` as a fee payer, the transaction sender must have signed with valid signature(s) and the `nonce` must have been defined.

For more information about each transaction type, refer to [Transaction](../caver-transaction/caver-transaction.md#class).

**NOTE**: This API provides the function to sign a transaction using an [imported account](../../../../json-rpc/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/personal.md#personal_unlockaccount) to sign a transaction.

**Parameters**

| Name        | Type     | Description                                                                                                |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transaction | object   | An instance of fee delegated transaction to send to the Klaytn.                                            |
| callback    | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

| Type       | Description                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| PromiEvent | A promise combined event emitter. It will be resolved when a transaction receipt is available. |

For PromiEvent, the following events are available:

* `transactionHash` returns `string`: Is fired right after a transaction is sent and a transaction hash is available.
* `receipt` returns `object`: Is fired when a transaction receipt is available. See [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail.
* `error` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
> const tx = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    nonce: 1,
    signatures: [
        [
            '0x4e43',
            '0x873e9db6d055596a8f79a6a2761bfb464cbc1b352ac1ce53770fc23bb16d929c',
            '0x15d206781cc8ac9ffb02c08545cb832e1f1700b46b886d72bb0cfeb4a230871e',
        ],
    ],
    feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in Klaytn Node
})
// Using promise
> caver.rpc.klay.signTransaction(tx).then(console.log)
{
    blockHash: '0x3be2f5b17eb35d0cf83b493ddfaa96d44cba40d1839778b4a8267f4c0aa61449',
    blockNumber: '0x23ef',
    contractAddress: null,
    feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    feePayerSignatures: [ { V: '0x4e43', R: '0x7a9ec...', S: '0x22be3...' } ],
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    gas: '0xc350',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x7918',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x1',
    senderTxHash: '0x71ca2e169a9c6c7b5bfdfa68e584314978f2abef955f8a2666325b860e2c9df5',
    signatures: [ { V: '0x4e43', R: '0x873e9...', S: '0x15d20...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x04fa82ce10168e05db04a235f025e5b8bc004ab36710798a512fab75a95bfc52',
    transactionIndex: '0x0',
    type: 'TxTypeFeeDelegatedValueTransfer',
    typeInt: 9,
    value: '0xde0b6b3a7640000',
}

// Using event emitter
> caver.rpc.klay.sendTransactionAsFeePayer(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.signTransaction <a href="#caver-rpc-klay-signtransaction" id="caver-rpc-klay-signtransaction"></a>

```javascript
caver.rpc.klay.signTransaction(transaction [, callback])
```

Signs a transaction as a transaction sender with an "imported account's private key" in your Klaytn Node.

For more information about each transaction type, refer to [Transaction](../caver-transaction/caver-transaction.md#class).

**NOTE**: This API provides the function to sign a transaction using an [imported account](../../../../json-rpc/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/personal.md#personal_unlockaccount) to sign a transaction.

**Parameters**

| Name        | Type     | Description                                                                                                |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transaction | object   | An instance of a transaction to sign.                                                                      |
| callback    | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - An object includes signed transaction:

| Name | Type   | Description                                              |
| ---- | ------ | -------------------------------------------------------- |
| raw  | string | A RLP-encoded signed transaction.                        |
| tx   | object | The transaction object including the sender's signature. |

**Example**

```javascript
> const tx = caver.transaction.valueTransfer.create({
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in Klaytn Node
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(10, 'KLAY'),
    gas: 25000
})

> caver.rpc.klay.signTransaction(tx).then(console.log)
{
    raw: '0x08f88...',
    tx: {
        typeInt: 8,
        type: 'TxTypeValueTransfer',
        nonce: '0x16',
        gasPrice: '0x5d21dba00',
        gas: '0x61a8',
        to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        value: '0x8ac7230489e80000',
        from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
        signatures: [ { V: '0x4e43', R: '0x52d64...', S: '0x1371e...' } ],
        hash: '0xe816952761caccf86ab281a00e10a36da6579c425041906a235f10959b2960b1'
    }
}
```

## caver.rpc.klay.signTransactionAsFeePayer <a href="#caver-rpc-klay-signtransactionasfeepayer" id="caver-rpc-klay-signtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.signTransactionAsFeePayer(transaction [, callback])
```

Signs a transaction as a transaction fee payer with an "imported account's private key" in your Klaytn Node.

For more information about each transaction type, refer to [Transaction](../caver-transaction/caver-transaction.md#class).

**NOTE**: This API provides the function to sign a transaction using an [imported account](../../../../json-rpc/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/personal.md#personal_unlockaccount) to sign a transaction.

**Parameters**

| Name        | Type     | Description                                                                                                |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transaction | object   | An instance of a transaction to sign.                                                                      |
| callback    | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - An object includes signed transaction:

| Name | Type   | Description                                  |
| ---- | ------ | -------------------------------------------- |
| raw  | string | A RLP-encoded signed transaction.            |
| tx   | object | The transaction object to sign as fee payer. |

**Example**

```javascript
> const tx = caver.transaction.feeDelegatedValueTransfer.craete({
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    nonce: 0,
    signatures: [
        [
            '0x4e43',
            '0xe87291c7311534c3e451c6f6b8cafdf7454970f98504e9af6cfdeb29757ba458',
            '0x26dcf6f3702110230b806628165e28771e1152ea864ee4c69557faccd4d3dae8',
        ],
    ],
    feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122', // The address of imported account in Klaytn Node
})

> caver.rpc.klay.signTransactionAsFeePayer(tx).then(console.log)
{
    raw: '0x09f8e...',
    tx: {
        typeInt: 9,
        type: 'TxTypeFeeDelegatedValueTransfer',
        nonce: '0x0',
        gasPrice: '0x5d21dba00',
        gas: '0xc350',
        to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        value: '0xde0b6b3a7640000',
        from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        signatures: [ { V: '0x4e43', R: '0xe8729...', S: '0x26dcf...' } ],
        feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122',
        feePayerSignatures: [ { V: '0x4e43', R: '0x5cce8...', S: '0x32907...' } ],
        hash: '0xdb89281f3a44a2370d73b389bbcfb9a597f558219145cf269a0b1480f8e778cc',
    },
}
```

## caver.rpc.klay.getDecodedAnchoringTransactionByHash <a href="#caver-rpc-klay-getdecodedanchoringtransactionbyhash" id="caver-rpc-klay-getdecodedanchoringtransactionbyhash"></a>

```javascript
caver.rpc.klay.getDecodedAnchoringTransactionByHash(transactionHash [, callback])
```

Returns the decoded anchored data in the transaction for the given transaction hash.

**Parameters**

| Name            | Type     | Description                                                                                                |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionHash | string   | A transaction hash.                                                                                        |
| callback        | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - An object includes decoded anchored data:

| Name          | Type   | Description                                                                                                                                                                                                                            |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BlockHash     | string | Hash of the child chain block that this anchoring transaction was performed.                                                                                                                                                           |
| BlockNumber   | number | The child chain block number that this anchoring transaction was performed.                                                                                                                                                            |
| ParentHash    | string | Hash of the parent block.                                                                                                                                                                                                              |
| TxHash        | string | The root of the transaction trie of the block.                                                                                                                                                                                         |
| StateRootHash | string | The root of the final state trie of the block.                                                                                                                                                                                         |
| ReceiptHash   | string | The root of the receipts trie of the block.                                                                                                                                                                                            |
| BlockCount    | number | The number of blocks generated during this anchoring period. In most cases, this number is equal to the child chain's `SC_TX_PERIOD`, except the case that this transaction was the first anchoring tx after turning on the anchoring. |
| TxCount       | number | The number of transactions generated in the child chain during this anchoring period.                                                                                                                                                  |

**Example**

```javascript
> caver.rpc.klay.getDecodedAnchoringTransactionByHash('0x59831a092a9f0b48018848f5dd88a457efdbfabec13ea07cd769686741a1cd13').then(console.log)
{
    BlockCount: 86400,
    BlockHash: '0x3c44b2ed491be7264b9f6819c67427642447716576b6702a72f6fdc40c41abde',
    BlockNumber: 23414400,
    ParentHash: '0x735468bb091a296c45553c8f67a8d0d39ac428cbe692b1b6c494d336351477f3',
    ReceiptHash: '0x6a908d319b6f6ab4414da1afd6763d70ecc8037ec167aa8a942bc0c2af12b4ab',
    StateRootHash: '0x4a664227fb2508a2952a4695cabb88b433522af2a5dee50cc6dd4036d85bf1d3',
    TxCount: 50895,
    TxHash: '0x753a85d2c53fc34cb9108301f1cf8ff8d78dde13d42d80958e47e388008319cd',
}
```

## caver.rpc.klay.getChainId <a href="#caver-rpc-klay-getchainid" id="caver-rpc-klay-getchainid"></a>

```javascript
caver.rpc.klay.getChainId([callback])
```

Returns the chain ID of the chain.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                |
| ------ | -------------------------- |
| string | The chain ID of the chain. |

**Example**

```javascript
> caver.rpc.klay.getChainId().then(console.log)
0x2710
```

## caver.rpc.klay.getClientVersion <a href="#caver-rpc-klay-getclientversion" id="caver-rpc-klay-getclientversion"></a>

```javascript
caver.rpc.klay.getClientVersion([callback])
```

Returns the current client version of a Klaytn node.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                                  |
| ------ | -------------------------------------------- |
| string | The current client version of a Klaytn node. |

**Example**

```javascript
> caver.rpc.klay.getClientVersion().then(console.log)
Klaytn/v1.3.0+144494d2aa/linux-amd64/go1.13.1
```

## caver.rpc.klay.getGasPrice <a href="#caver-rpc-klay-getgasprice" id="caver-rpc-klay-getgasprice"></a>

```javascript
caver.rpc.klay.getGasPrice([callback])
```

Returns the current price per gas in peb.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                   |
| ------ | ----------------------------- |
| string | The current gas price in peb. |

**Example**

```javascript
> caver.rpc.klay.getGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getGasPriceAt <a href="#caver-rpc-klay-getgaspriceat" id="caver-rpc-klay-getgaspriceat"></a>

```javascript
caver.rpc.klay.getGasPriceAt([blockNumber] [, callback])
```

Returns the current price per gas in peb for the given block.

**Parameters**

| Name        | Type     | Description                                                                                                |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number   | (optional) The block number. If omitted, the latest unit price will be returned.                           |
| callback    | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                   |
| ------ | ----------------------------- |
| string | The current gas price in peb. |

**Example**

```javascript
> caver.rpc.klay.getGasPriceAt().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getMaxPriorityFeePerGas <a href="#caver-rpc-klay-getmaxpriorityfeepergas" id="caver-rpc-klay-getmaxpriorityfeepergas"></a>

```javascript
caver.rpc.klay.getMaxPriorityFeePerGas([callback])
```

Returns a suggested gas tip cap for dynamic fee transactions in peb. Since Klaytn has a fixed gas price, this returns the gas price set by Klaytn.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                       |
| ------ | --------------------------------- |
| string | The suggested gas tip cap in peb. |

**Example**

```javascript
> caver.rpc.klay.getMaxPriorityFeePerGas().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getLowerBoundGasPrice <a href="#caver-rpc-klay-getlowerboundgasprice" id="caver-rpc-klay-getlowerboundgasprice"></a>

```javascript
caver.rpc.klay.getLowerBoundGasPrice([callback])
```

Returns the lower bound gas price in peb.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                       |
| ------ | --------------------------------- |
| string | The lower bound gas price in peb. |

**Example**

```javascript
> caver.rpc.klay.getLowerBoundGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getUpperBoundGasPrice <a href="#caver-rpc-klay-getupperboundgasprice" id="caver-rpc-klay-getupperboundgasprice"></a>

```javascript
caver.rpc.klay.getUpperBoundGasPrice([callback])
```

Returns the upper bound gas price in peb.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                       |
| ------ | --------------------------------- |
| string | The upper bound gas price in peb. |

**Example**

```javascript
> caver.rpc.klay.getUpperBoundGasPrice().then(console.log)
0xae9f7bcc00
```

## caver.rpc.klay.getFeeHistory <a href="#caver-rpc-klay-getfeehistory" id="caver-rpc-klay-getfeehistory"></a>

```javascript
caver.rpc.klay.getFeeHistory(blockCount, lastBlock, rewardPercentiles [, callback])
```

Returns fee history for the returned block range. This can be a subsection of the requested range if not all blocks are available.

**Parameters**

| Name              | Type                          | Description                                                                                                                                                                                                                                     |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockCount        | number\|BigNumber\|BN\|string | Number of blocks in the requested range. Between 1 and 1024 blocks can be requested in a single query. Less than requested may be returned if not all blocks are available.                                                                     |
| lastBlock         | number\|BigNumber\|BN\|string | Highest number block (or block tag string) of the requested range.                                                                                                                                                                              |
| rewardPercentiles | Array                         | A monotonically increasing list of percentile values to sample from each block’s effective priority fees per gas in ascending order, weighted by gas used. (Example: `['0', '25', '50', '75', '100']` or `['0', '0.5', '1', '1.5', '3', '80']`) |
| callback          | function                      | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                                                                      |

**Return Value**

`Promise` returns `object` - An object includes fee history:

| Name          | Type   | Description                                                                                                                                                                                                     |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oldestBlock   | string | Lowest number block of returned range.                                                                                                                                                                          |
| reward        | Array  | A two-dimensional array of effective priority fees per gas at the requested block percentiles.                                                                                                                  |
| baseFeePerGas | Array  | An array of block base fees per gas. This includes the next block after the newest of the returned range, because this value can be derived from the newest block. Zeroes are returned for pre-EIP-1559 blocks. |
| gasUsedRatio  | Array  | An array of gasUsed/gasLimit in the block.                                                                                                                                                                      |

**Example**

```javascript
> caver.rpc.klay.getFeeHistory(3, 'latest', [0.1, 0.2, 0.3]).then(console.log)
{
  oldestBlock: '0xbb701',
  reward: [
    [ '0x0', '0x0', '0x0' ],
    [ '0x5d21dba00', '0x5d21dba00', '0x5d21dba00' ],
    [ '0x0', '0x0', '0x0' ]
  ],
  baseFeePerGas: [ '0x0', '0x0', '0x0', '0x0' ],
  gasUsedRatio: [ 0, 2.1000000000021e-8, 0 ]
}
```

## caver.rpc.klay.createAccessList <a href="#caver-rpc-klay-createaccesslist" id="caver-rpc-klay-createaccesslist"></a>

```javascript
caver.rpc.klay.createAccessList(txCallObject [, callback])
```

This method creates an accessList based on a given Transaction. The accessList contains all storage slots and addresses read and written by the transaction, except for the sender account and the precompiles. This method uses the same transaction call object and blockNumberOrTag object as `caver.rpc.klay.call`. An accessList can be used to release stuck contracts that became inaccessible due to gas cost increases. Adding an accessList to your transaction does not necessary result in lower gas usage compared to a transaction without an access list.

**Parameters**

| Name           | Type                          | Description                                                                                                               |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| callObject     | object                        | A transaction call object. Please see [caver.rpc.klay.call](#caver-rpc-klay-call) parameters.                      |
| blockParameter | number\|BigNumber\|BN\|string | (optional) A block number, blockhash or the block tag string (`latest` or `earliest`). If omitted, `latest` will be used. |
| callback       | function                      | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                |

**Return Value**

`Promise` returns `object` - An object includes an access list:

| Name          | Type   | Description                                                                                                                                                                                                     |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oldestBlock   | string | Lowest number block of returned range.                                                                                                                                                                          |
| reward        | Array  | A two-dimensional array of effective priority fees per gas at the requested block percentiles.                                                                                                                  |
| baseFeePerGas | Array  | An array of block base fees per gas. This includes the next block after the newest of the returned range, because this value can be derived from the newest block. Zeroes are returned for pre-EIP-1559 blocks. |
| gasUsedRatio  | Array  | An array of gasUsed/gasLimit in the block.                                                                                                                                                                      |

**Example**

```javascript
> caver.rpc.klay.createAccessList({
        from: '0x3bc5885c2941c5cda454bdb4a8c88aa7f248e312',
        data: '0x20965255',
        gasPrice: '0x3b9aca00',
        gas: '0x3d0900',
        to: '0x00f5f5f3a25f142fafd0af24a754fafa340f32c7'
    }, 'latest').then(console.log)
{ accessList: [], gasUsed: '0x0' }
```

## caver.rpc.klay.isParallelDBWrite <a href="#caver-rpc-klay-isparalleldbwrite" id="caver-rpc-klay-isparalleldbwrite"></a>

```javascript
caver.rpc.klay.isParallelDBWrite([callback])
```

Returns `true` if the node is writing blockchain data in a parallel manner.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type    | Description                                                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| boolean | `true` means the node is writing blockchain data in a parallel manner. It is `false` if the node is serially writing the data. |

**Example**

```javascript
> caver.rpc.klay.isParallelDBWrite().then(console.log)
true
```

## caver.rpc.klay.isSenderTxHashIndexingEnabled <a href="#caver-rpc-klay-issendertxhashindexingenabled" id="caver-rpc-klay-issendertxhashindexingenabled"></a>

```javascript
caver.rpc.klay.isSenderTxHashIndexingEnabled([callback])
```

Returns `true` if the node is indexing sender transaction hash to transaction hash mapping information.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type    | Description                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------- |
| boolean | `true` means the node is indexing sender transaction hash to transaction hash mapping information. |

**Example**

```javascript
> caver.rpc.klay.isSenderTxHashIndexingEnabled().then(console.log)
true
```

## caver.rpc.klay.getProtocolVersion <a href="#caver-rpc-klay-getprotocolversion" id="caver-rpc-klay-getprotocolversion"></a>

```javascript
caver.rpc.klay.getProtocolVersion([callback])
```

Returns the Klaytn protocol version of the node. The current version (as of v1.9.0) of Cypress/Baobab is `istanbul/65`.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                              |
| ------ | ---------------------------------------- |
| string | The Klaytn protocol version of the node. |

**Example**

```javascript
> caver.rpc.klay.getProtocolVersion().then(console.log)
0x40
```

## caver.rpc.klay.getRewardbase <a href="#caver-rpc-klay-getrewardbase" id="caver-rpc-klay-getrewardbase"></a>

```javascript
caver.rpc.klay.getRewardbase([callback])
```

Returns the rewardbase of the current node. Rewardbase is the address of the account where the block rewards go to. It is only required for CNs.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description             |
| ------ | ----------------------- |
| string | The rewardbase address. |

**Example**

```javascript
> caver.rpc.klay.getRewardbase().then(console.log)
0xa9b3a93b2a9fa3fdcc31addd240b04bf8db3414c
```

## caver.rpc.klay.getFilterChanges <a href="#caver-rpc-klay-getfilterchanges" id="caver-rpc-klay-getfilterchanges"></a>

```javascript
caver.rpc.klay.getFilterChanges(filterId [, callback])
```

Polling method for a filter, which returns an array of logs since the last poll.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| filterId | String   | The filter id.                                                                                             |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array` - Array of log objects, or an empty array if nothing has changed since the last poll.

* For filters created with [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter), the returns are block hashes, _e.g._, `["0x3454645634534..."]`.
* For filters created with [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter), the returns are transaction hashes, _e.g._, `["0x6345343454645..."]`.
* For filters created with [caver.rpc.klay.newFilter](#caver-rpc-klay-newfilter), logs are objects with the following parameters:

| Name             | Type   | Description                                                                                                                                                                                                                                  |
| ---------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| logIndex         | string | The log index position in the block.                                                                                                                                                                                                         |
| transactionIndex | string | The index position of transactions where this log was created from.                                                                                                                                                                          |
| transactionHash  | string | Hash of the transactions this log was created from. `null` when pending.                                                                                                                                                                     |
| blockHash        | string | Hash of the block where this log was in. `null` when pending.                                                                                                                                                                                |
| blockNumber      | string | The block number where this log was in. `null` when pending.                                                                                                                                                                                 |
| address          | string | Address from which this log originated.                                                                                                                                                                                                      |
| data             | string | Contains the non-indexed arguments of the log.                                                                                                                                                                                               |
| topics           | Array  | Array of 0 to 4 32-byte DATA of indexed log arguments. (In Solidity: The first topic is the hash of the signature of the event (_e.g._, `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.). |

**Example**

```javascript
> caver.rpc.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log)
[ 
    { 
        address: '0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: '0xdc5',
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex: '0x0',
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex: '0x0'
    } 
]
```

## caver.rpc.klay.getFilterLogs <a href="#caver-rpc-klay-getfilterlogs" id="caver-rpc-klay-getfilterlogs"></a>

```javascript
caver.rpc.klay.getFilterLogs(filterId [, callback])
```

Returns an array of all logs matching the filter with the given id. The filter object should be obtained by using [newFilter](#caver-rpc-klay-newfilter).

Note that filter ids returned by other filter creation functions, such as [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) or [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter), cannot be used with this function.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| filterId | string   | The filter id.                                                                                             |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

See [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**Example**

```javascript
> caver.rpc.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        address: '0x55384B52a9E5091B6012717197887dd3B5779Df3',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: '0x1c31',
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex: '0x0',
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex: '0x0'
    }
]
```

## caver.rpc.klay.getLogs <a href="#caver-rpc-klay-getlogs" id="caver-rpc-klay-getlogs"></a>

```javascript
caver.rpc.klay.getLogs(options [, callback])
```

Returns an array of all logs matching a given filter object.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| options  | object   | The filter options. See the below table to find the description.                                           |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

The options object can contain the following:

| Name      | Type             | Description                                                                                                                                                                                                                                                                           |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | number \| string | (optional) The block number of the earliest block to get the logs. (`"latest"` means the most recent block.) The default value is `"latest"`.                                                                                                                                         |
| toBlock   | number \| string | (optional) The block number of the last block to get the logs. (`"latest"` means the most recent block.). The default value is `"latest"`.                                                                                                                                            |
| address   | string \| Array  | (optional) An address or a list of addresses. Only the logs related to the particular account(s) will be returned.                                                                                                                                                                    |
| topics    | Array            | (optional) An array of values that must appear in the log entries. The order is important. If you want to leave topics out, use `null`, _e.g._, `[null, '0x12...']`. You can also pass an array for each topic with options for that topic, _e.g.,_ `[null, ['option1', 'option2']]`. |

**Return Value**

See [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**Example**

```javascript
> caver.rpc.klay.getLogs({
        fromBlock: '0x1',
        toBlock: 'latest',
        address:'0x87ac99835e67168d4f9a40580f8f5c33550ba88b'
    }).then(console.log)
[
    {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: [
            '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385
        ]
        logIndex: '0x0',
        transactionIndex: '0x0',
        transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: '0x4d2',
        address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    {...}
]
```

## caver.rpc.klay.newBlockFilter <a href="#caver-rpc-klay-newblockfilter" id="caver-rpc-klay-newblockfilter"></a>

```javascript
caver.rpc.klay.newBlockFilter([callback])
```

Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description  |
| ------ | ------------ |
| string | A filter id. |

**Example**

```javascript
> caver.rpc.klay.newBlockFilter().then(console.log)
0xf90906914486a9c22d620e50022b38d5
```

## caver.rpc.klay.newFilter <a href="#caver-rpc-klay-newfilter" id="caver-rpc-klay-newfilter"></a>

```javascript
caver.rpc.klay.newFilter(options [, callback])
```

Creates a filter object using the given filter options, to receive the specific state changes (logs).

* To check if the state has changed, call [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).
* To obtain all logs matching the filter created by `newFilter`, call [caver.rpc.klay.getFilterLogs](#caver-rpc-klay-getfilterlogs).

For detailed information about the topics in the filter object, please see [Klaytn Platform API - klay_newFilter](../../../../json-rpc/klay/filter.md#klay_newfilter).

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| options  | object   | The filter options. See the below table to find the description.                                           |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

The options object can contain the following:

| Name      | Type             | Description                                                                                                                                                                                                                                                                           |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | number \| string | (optional) The block number of the earliest block to get the logs. (`"latest"` means the most recent block.) The default value is `"latest"`.                                                                                                                                         |
| toBlock   | number \| string | (optional) The block number of the last block to get the logs. (`"latest"` means the most recent block.). The default value is `"latest"`.                                                                                                                                            |
| address   | string \| Array  | (optional) An address or a list of addresses. Only the logs related to the particular account(s) will be returned.                                                                                                                                                                    |
| topics    | Array            | (optional) An array of values that must appear in the log entries. The order is important. If you want to leave topics out, use `null`, _e.g._, `[null, '0x12...']`. You can also pass an array for each topic with options for that topic, _e.g.,_ `[null, ['option1', 'option2']]`. |

**Return Value**

`Promise` returns `string`

| Type   | Description  |
| ------ | ------------ |
| string | A filter id. |

**Example**

```javascript
> caver.rpc.klay.newFilter({}).then(console.log)
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.rpc.klay.newFilter({ address: '0x55384B52a9E5091B6012717197887dd3B5779Df3' }).then(console.log)
0xd165cbf31b9d60346aada33dbefe01b
```

## caver.rpc.klay.newPendingTransactionFilter <a href="#caver-rpc-klay-newpendingtransactionfilter" id="caver-rpc-klay-newpendingtransactionfilter"></a>

```javascript
caver.rpc.klay.newPendingTransactionFilter([callback])
```

Creates a filter in the node, to receive the information about new pending transaction arrival. To check if the state has changed, call [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description  |
| ------ | ------------ |
| string | A filter id. |

**Example**

```javascript
> caver.rpc.klay.newPendingTransactionFilter().then(console.log)
0xe62da1b2a09efcd4168398bdbf586db0
```

## caver.rpc.klay.uninstallFilter <a href="#caver-rpc-klay-uninstallfilter" id="caver-rpc-klay-uninstallfilter"></a>

```javascript
caver.rpc.klay.uninstallFilter(filterId [, callback])
```

Uninstalls a filter with a given id. Should always be called when a watch is no longer needed. Additionally, filters time out when they are not being called with [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) for a period of time.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| filterId | string   | The filter id.                                                                                             |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type    | Description                                                           |
| ------- | --------------------------------------------------------------------- |
| boolean | `true` if the filter was successfully uninstalled, otherwise `false`. |

**Example**

```javascript
> caver.rpc.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log)
true
```

## caver.rpc.klay.sha3 <a href="#caver-rpc-klay-sha3" id="caver-rpc-klay-sha3"></a>

```javascript
caver.rpc.klay.sha3(data[, callback])
```

Returns Keccak-256 (not the standardized SHA3-256) of the given data. You can use [caver.utils.sha3](../caver.utils.md#sha3) instead of this.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| data     | String   | The data to be converted into a SHA3 hash.                                                                 |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description                        |
| ------ | ---------------------------------- |
| string | The SHA3 result of the given data. |

**Example**

```javascript
> caver.rpc.klay.sha3('0x11223344').then(console.log)
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
