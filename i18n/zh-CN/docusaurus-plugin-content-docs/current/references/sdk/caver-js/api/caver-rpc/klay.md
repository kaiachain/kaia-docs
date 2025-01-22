# caver.rpc.klay

caver.rpc.klay "使用 "governance "名称空间提供 JSON-RPC 调用。

## caver.rpc.klay.accountCreated <a href="#caver-rpc-klay-accountcreated" id="caver-rpc-klay-accountcreated"></a>

```javascript
caver.rpc.klay.accountCreated(address [, blockNumber] [, callback])
```

如果与地址相关的账户是在 kaia 区块链平台上创建的，则返回 `true`。 否则返回 `false`。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要查询的账户地址，以查看该账户是否已在网络上创建。                                                        |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `number`

| 类型      | 描述            |
| ------- | ------------- |
| boolean | kaia 中输入地址的存在 |

**示例**

```javascript
> caver.rpc.klay.accountCreated('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.getAccount <a href="#caver-rpc-klay-getaccount" id="caver-rpc-klay-getaccount"></a>

```javascript
caver.rpc.klay.getAccount(address [, blockNumber] [, callback])
```

返回 kaia 中给定地址的账户信息。 有关 kaia 帐户类型的更多详情，请参阅 [Kaia 帐户类型]（.../.../.../.../.../.../learn/accounts.md#klaytn-account-types）。

**NOTE** `caver.rpc.klay.getAccount`返回网络上存在的账户，因此如果实际区块链网络上不存在与地址匹配的账户，则返回`null`。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要查看账户信息的账户地址。                                                                    |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                        |
| -- | ------------------------- |
| 对象 | 包含账户信息的对象。 每种账户类型都有不同的属性。 |

**示例**

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

返回给定地址的 AccountKey。 如果账户具有 [AccountKeyLegacy](../../../../../../learn/accounts.md#accountkeylegacy) 或给定地址的账户是 [Smart Contract Account](../../../../../../learn/accounts.md#smart-contract-accounts-scas) ，则将返回空键值。 详情请参阅 [Account Key]（.../.../.../.../.../learn/accounts.md#account-key）。

**注意** `caver.rpc.klay.getAccountKey` 返回的对象因 AccountKey 类型而异。 如果网络中不存在与给定地址匹配的 kaia 帐户，则返回`null`。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要从中获取 AccountKey 信息对象的 kaia 账户地址。                                                |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                            |
| -- | --------------------------------------------- |
| 对象 | 包含 AccountKey 信息的对象。 每种 AccountKey 类型都有不同的属性。 |

**示例**

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
caver.rpc.klay.encodeAccountKey(accountKey] [, callback])
```

使用递归长度前缀（RLP）编码方案对包含 AccountKey 信息的对象进行编码。 您还可以使用 [account.getRLPEncodingAccountKey](../caver.account.md#account-getrlpencodingaccountkey) 获取 RLP 编码的 AccountKey。

**参数：**

| 名称         | 类型       | 描述                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountKey | 对象       | An object defines `keyType` and `key` inside or an instance of `AccountKey` ([AccountKeyLegacy](../caver.account.md#accountkeylegacy), [AccountKeyPublic](../caver.account.md#accountkeypublic), [AccountKeyFail](../caver.account.md#accountkeyfail)、[AccountKeyWeightedMultiSig](./caver.account.md#accountkeyweightedmultisig)或[AccountKeyRoleBased](./caver.account.md#accountkeyrolebased))。 |
| callback   | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                                                                                                                                                                                                                                                                                                                                                   |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述                  |
| --- | ------------------- |
| 字符串 | RLP 编码的 AccountKey。 |

**示例**

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
caver.rpc.klay.decodeAccountKey(encodedKey] [, callback])
```

解码 RLP 编码的 AccountKey。 您也可以使用 [caver.account.accountKey.decode](../caver.account.md#caver-account-accountkey-decode) 来解码 RLP 编码的 AccountKey。

**参数：**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 加密密码     | 字符串      | RLP 编码的 AccountKey。                                |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                         |
| -- | -------------------------- |
| 对象 | 对象内部定义了 `keyType` 和 `key`。 |

**示例**

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

以 kaia 为单位返回给定地址的账户余额。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要查看余额的账户地址。                                                                      |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述                    |
| --- | --------------------- |
| 字符串 | 给定地址的当前余额（以 peb 为单位）。 |

**示例**

```javascript
> caver.rpc.klay.getBalance('0x{address in hex}').then(console.log)
0xde0b6b3a7640000
```

## caver.rpc.klay.getCode <a href="#caver-rpc-klay-getcode" id="caver-rpc-klay-getcode"></a>

```javascript
caver.rpc.klay.getCode(address [, blockNumber] [, callback])
```

返回给定地址的代码。

**参数：**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 获取代码的地址。                                                                          |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述       |
| --- | -------- |
| 字符串 | 给定地址的代码。 |

**示例**

```javascript
> caver.rpc.klay.getCode('0x{address in hex}').then(console.log)
0x60806...
```

## caver.rpc.klay.getTransactionCount <a href="#caver-rpc-klay-gettransactioncount" id="caver-rpc-klay-gettransactioncount"></a>

```javascript
caver.rpc.klay.getTransactionCount(address [, blockNumber] [, callback])
```

返回从某个地址发送的交易总数。

**参数：**

| 名称       | 类型                 | 描述                                                                                                                                                                                                      |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 地址       | 字符串                | 用于获取交易次数的地址。                                                                                                                                                                                            |
| 区块编号     | number \\| string | (可选）一个区块编号、表示待处理的 nonce 的字符串 `pending` 或字符串 `earliest` 或 `latest`，如 [default block parameter](../../../../json-rpc/klay/block.md#the-default-block-parameter) 所示。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                                                                                                                                      |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述                  |
| --- | ------------------- |
| 字符串 | 从给定地址发送的交易次数（十六进制）。 |

**示例**

```javascript
> caver.rpc.klay.getTransactionCount('0x{address in hex}').then(console.log)
0x5f
```

## caver.rpc.klay.isContractAccount <a href="#caver-rpc-klay-iscontractaccount" id="caver-rpc-klay-iscontractaccount"></a>

```javascript
caver.rpc.klay.isContractAccount(address [, blockNumber] [, callback])
```

如果输入账户在特定区块编号时的 codeHash 不为空，则返回 `true`。 如果账户是 EOA 或没有 codeHash 的智能合约账户，则返回 "false"。 详情请参阅 [智能合约账户]（.../.../.../.../.../learn/accounts.md#smart-contract-accounts-scas）。

**参数：**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要检查的地址是 "ContractAccount"。                                                       |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `number`

| 类型      | 描述                     |
| ------- | ---------------------- |
| boolean | true 表示输入参数是现有的智能合约地址。 |

**示例**

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

生成 kaia 专用的签名数据。 请参阅[Kaia Platform API - klay_sign](.../.../.../.../json-rpc/klay/account.md#klay_sign)，了解签名是如何生成的。

**注意**：此 API 提供了使用 kaia 节点中的 [导入账户](../../../.../jsson-rpc/personal.md#personal_importrawkey) 签署消息的功能。 您节点中的导入账户必须已[解锁]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount），才能签署信息。 使用 [caver.rpc.klay.signTransaction](#caver-rpc-klay-signtransaction) 签署 kaia 节点中导入账户的交易。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 用于签署信息的导入账户地址。                                                                    |
| 信息       | 字符串                | 待签名消息                                                                             |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述       |
| --- | -------- |
| 字符串 | 导入账户的签名。 |

**示例**

```javascript
> caver.rpc.klay.sign('0x{address in hex}', '0xdeadbeaf').then(console.log)
0x1066e052c4be821daa4d0a0cd1e9e75ccb200bb4001c2e38853ba41b712a5a226da2acd67c86a13b266e0d75d0a6e7d1551c8924af413267615a5948617c746c1c
```

## caver.rpc.klay.getAccounts <a href="#caver-rpc-klay-getaccounts" id="caver-rpc-klay-getaccounts"></a>

```javascript
caver.rpc.klay.getAccounts([callback])
```

返回 kaia 节点拥有的地址列表。

**参数：**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型 | 描述              |
| -- | --------------- |
| 数组 | kaia 节点拥有的地址数组。 |

**示例**

```javascript
> caver.rpc.klay.getAccounts().then(console.log)
[
    '0xe1531e916857d1b3a7db92f9187b96a7b43813bf',
    '0x75331c25535052157ff5110ba7d0cf940d3a9ca6'
]。
```

## caver.rpc.klay.getBlockNumber <a href="#caver-rpc-klay-getblocknumber" id="caver-rpc-klay-getblocknumber"></a>

```javascript
caver.rpc.klay.getBlockNumber([callback])
```

返回最近区块的数量。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述             |
| --- | -------------- |
| 字符串 | 最近区块的编号（十六进制）。 |

**示例**

```javascript
> caver.rpc.klay.getBlockNumber().then(console.log)
0x5d39
```

## caver.rpc.klay.getHeader <a href="#caver-rpc-klay-getheader" id="caver-rpc-klay-getheader"></a>

```javascript
caver.rpc.klay.getHeader(blockNumberOrHash] [, callback])
```

按块哈希值或区块编号返回块头。 如果用户把区块哈希值作为参数传递，[caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash)就会被调用；如果把区块编号作为参数调用，[caver.rpc.klay.getHeaderByNumber](#caver-rpc-klay-getheaderbynumber)就会被调用。

**参数：**

| 名称       | 类型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 区块编号或哈希值 | number \\| string | 区块哈希值、编号或区块标签字符串。                                  |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                                                                                                                        |
| -- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 对象 | 区块头对象。 有关返回值的详细说明，请参阅 [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash) 。 |

**示例**

```javascript
> caver.rpc.klay.getHeader(1).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed：'0x0',
  governanceData: '0x',
  hash：'0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...'，
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward：'0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp：'0x62201975'，
  timestampFoS：'0x0'，
  transactionsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByNumber <a href="#caver-rpc-klay-getheaderbynumber" id="caver-rpc-klay-getheaderbynumber"></a>

```javascript
caver.rpc.klay.getHeaderByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

按区块编号返回区块头。

**参数：**

| 名称       | 类型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 区块编号     | number \\| string | 区块编号或区块标记字符串。                                      |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                                                                                                                        |
| -- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 对象 | 区块头对象。 有关返回值的详细说明，请参阅 [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash) 。 |

**示例**

```javascript
> caver.rpc.klay.getHeaderByNumber(765139).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed：'0x0',
  governanceData: '0x',
  hash：'0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...'，
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward：'0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp：'0x62201975'，
  timestampFoS：'0x0'，
  transactionsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByHash <a href="#caver-rpc-klay-getheaderbyhash" id="caver-rpc-klay-getheaderbyhash"></a>

```javascript
caver.rpc.klay.getHeaderByHash(blockHash [, returnTransactionObjects] [, callback])
```

使用 `blockHash` 返回最近区块的区块编号。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 区块哈希     | 字符串      | 区块哈希值。                                             |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` 返回 `object` - 对象包括块标头：

| 名称            | 类型  | 描述                                                                                   |
| ------------- | --- | ------------------------------------------------------------------------------------ |
| baseFeePerGas | 字符串 | The base fee per gas. 只有当该块编号的 EthTxTypeCompatibleBlock 被激活时，才会返回该值。 |
| blockScore    | 字符串 | 区块链网络中的挖矿难度。 区块分数 "的使用与网络共识不同。 在 BFT 共识引擎中始终为 1。                                     |
| 额外数据          | 字符串 | 该数据块的 "额外数据 "字段。                                                                     |
| gasUsed       | 字符串 | 该区块所有交易使用的gas总量。                                                                     |
| 治理数据          | 字符串 | RLP 编码的治理配置                                                                          |
| 哈希            | 字符串 | 区块的哈希值。 如果是待处理区块，则为 "null"。                                                          |
| logsBloom     | 字符串 | 区块日志的 Bloom 过滤器。 如果是待处理区块，则为 "null"。                                                 |
| 数量            | 字符串 | 区块编号。 如果是待处理区块，则为 "null"。                                                            |
| 父哈希值          | 字符串 | 父块的哈希值。                                                                              |
| receiptsRoot  | 字符串 | 区块收据三元组的根。                                                                           |
| 奖励            | 字符串 | 整笔奖励的受益人地址。                                                                          |
| stateRoot     | 字符串 | 区块最终状态三元组的根。                                                                         |
| 时间戳           | 字符串 | 区块整理时的 unix 时间戳。                                                                     |
| 时间戳FoS        | 字符串 | 区块整理时间戳的秒分数。                                                                         |
| 交易根           | 字符串 | 区块的交易三角根。                                                                            |

**示例**

```javascript
> caver.rpc.klay.getHeaderByHash('0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3').then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed：'0x0',
  governanceData: '0x',
  hash：'0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...'，
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward：'0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp：'0x62201975'，
  timestampFoS：'0x0'，
  transactionsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getBlock <a href="#caver-rpc-klay-getblock" id="caver-rpc-klay-getblock"></a>

```javascript
caver.rpc.klay.getBlock(blockNumberOrHash [, returnTransactionObjects] [, callback])
```

按块哈希值或块编号返回区块的信息。 如果用户把区块哈希值作为参数传递，[caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash)就会被调用；如果把区块编号作为参数调用，[caver.rpc.klay.getBlockByNumber](#caver-rpc-klay-getblockbynumber)就会被调用。

**参数**

| 名称                       | 类型                 | 描述                                                                                  |
| ------------------------ | ------------------ | ----------------------------------------------------------------------------------- |
| 区块编号或哈希值                 | number \\| string | 区块哈希值、编号或区块标签字符串。                                                                   |
| returnTransactionObjects | boolean            | (可选，默认为 `false`） 如果为 `true`，返回的块将包含所有交易对象；如果为 `false`，则只包含交易哈希值。 |
| callback                 | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                  |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                                                                                                                      |
| -- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 对象 | 一个区块对象。 有关返回值的详细说明，请参阅 [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash)。 |

**示例**

```javascript
> caver.rpc.klay.getBlock(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed：'0x0',
    governanceData: '0x',
    hash：'0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b'，
    logsBloom：'0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward：'0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp：0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions：[],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x',
}
```

## caver.rpc.klay.getBlockByNumber <a href="#caver-rpc-klay-getblockbynumber" id="caver-rpc-klay-getblockbynumber"></a>

```javascript
caver.rpc.klay.getBlockByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

按区块号返回关于区块的信息。

**参数**

| 名称                       | 类型                 | 描述                                                                                  |
| ------------------------ | ------------------ | ----------------------------------------------------------------------------------- |
| 区块编号                     | number \\| string | 区块编号或用字符串（"genesis "或 "latest"）标记的区块。                                               |
| returnTransactionObjects | boolean            | (可选，默认为 `false`） 如果为 `true`，返回的块将包含所有交易对象；如果为 `false`，则只包含交易哈希值。 |
| callback                 | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                  |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                                                                                                                                                                          |
| -- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 对象 | 一个区块对象。 有关返回值的详细说明，请参阅 [caver.rpc.klay.getBlockByHash]（#caver-rpc-klay-getblockbyhash）。 |

**示例**

```javascript
> caver.rpc.klay.getBlockByNumber(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed：'0x0',
    governanceData: '0x',
    hash：'0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b'，
    logsBloom：'0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward：'0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp：0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions：[],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockByHash <a href="#caver-rpc-klay-getblockbyhash" id="caver-rpc-klay-getblockbyhash"></a>

```javascript
caver.rpc.klay.getBlockByHash(blockHash [, returnTransactionObjects] [, callback])
```

使用 `blockHash` 返回最近区块的区块编号。

**参数**

| 名称                       | 类型       | 描述                                                                                  |
| ------------------------ | -------- | ----------------------------------------------------------------------------------- |
| 区块哈希                     | 字符串      | 区块哈希值                                                                               |
| returnTransactionObjects | boolean  | (可选，默认为 `false`） 如果为 `true`，返回的块将包含所有交易对象；如果为 `false`，则只包含交易哈希值。 |
| callback                 | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                  |

**返回价值**

`Promise` 返回 `object` - 对象包括代码块：

| 名称               | 类型  | 描述                                                                  |
| ---------------- | --- | ------------------------------------------------------------------- |
| baseFeePerGas    | 字符串 | The base fee per gas 只有当该块编号的 EthTxTypeCompatibleBlock 被激活时，才会返回该值。 |
| blockScore       | 字符串 | 区块链网络中的挖矿难度。 区块分数 "的使用与网络共识不同。 在 BFT 共识引擎中始终为 1。                    |
| 额外数据             | 字符串 | 该数据块的 "额外数据 "字段。                                                    |
| gasUsed          | 字符串 | 该区块所有交易使用的gas总量。                                                    |
| 治理数据             | 字符串 | RLP 编码的治理配置                                                         |
| hash             | 字符串 | 区块的哈希值。 如果是待处理区块，则为 "null"。                                         |
| logsBloom        | 字符串 | 区块日志的 Bloom 过滤器。 如果是待处理区块，则为 "null"                                 |
| 数量               | 字符串 | 区块编号 如果是待处理区块，则为 "null"                                             |
| 父哈希值             | 字符串 | 父块的哈希值。                                                             |
| receiptsRoot     | 字符串 | 区块收据三元组的根。                                                          |
| 奖励               | 字符串 | 整笔奖励的受益人地址。                                                         |
| Size             | 字符串 | 整数，该数据块的大小（字节）。                                                     |
| stateRoot        | 字符串 | 区块最终状态三元组的根。                                                        |
| 时间戳              | 字符串 | 区块整理时的 unix 时间戳。                                                    |
| 时间戳FoS           | 字符串 | 区块整理时间戳的秒分数。                                                        |
| totalBlockScore  | 字符串 | 该区块之前链上总 blockScore 的整数。                                            |
| 交易               | 数组  | 事务对象数组，或 32 字节事务哈希值，取决于 `returnTransactionObjects` 参数。              |
| transactionsRoot | 字符串 | 区块的交易三角根。                                                           |
| voteData         | 字符串 | RLP 加密的提案治理投票。                                                      |

**示例**

```javascript
> caver.rpc.klay.getBlockByHash('0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b').then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed：'0x0',
    governanceData: '0x',
    hash：'0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b'，
    logsBloom：'0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward：'0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp：0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions：[],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockReceipts <a href="#caver-rpc-klay-getblockreceipts" id="caver-rpc-klay-getblockreceipts"></a>

```javascript
caver.rpc.klay.getBlockReceipts(blockHash] [, callback])
```

返回由块哈希值标识的块中包含的收据。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 区块哈希     | 字符串      | 区块哈希值                                              |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型 | 描述                                                                                                                                                                                                                                       |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 数组 | 交易收据包含在一个区块中。 如果目标块不包含事务，则返回空数组 `[]`。 有关交易收据的详细说明，请参阅 [caver.rpc.klay.getTransactionReceipt]（#caver-rpc-klay-gettransactionreceipt）。 |

**示例**

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
caver.rpc.klay.getBlockTransactionCountByNumber(blockNumber] [, callback])
```

返回与给定区块编号匹配的区块中的交易次数。

**参数：**

| 名称       | 类型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 区块编号     | number \\| string | 区块编号或区块标签字符串（`genesis` 或`latest`）。                 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述                |
| --- | ----------------- |
| 字符串 | 给定区块中的交易次数（十六进制）。 |

**示例**

```javascript
> caver.rpc.klay.getBlockTransactionCountByNumber(21249).then(console.log)
0x1

```

## caver.rpc.klay.getBlockTransactionCountByHash <a href="#caver-rpc-klay-getblocktransactioncountbyhash" id="caver-rpc-klay-getblocktransactioncountbyhash"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByHash(blockHash] [, callback])
```

返回与给定块号匹配的块中的交易数量。

**参数：**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 区块哈希     | 字符串      | 区块哈希值。                                             |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述                |
| --- | ----------------- |
| 字符串 | 给定区块中的交易次数（十六进制）。 |

**示例**

```javascript
> caver.rpc.klay.getBlockTransactionCountByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
0x1

```

## caver.rpc.klay.getBlockWithConsensusInfoByNumber <a href="#caver-rpc-klay-getblockwithconsensusinfobynumber" id="caver-rpc-klay-getblockwithconsensusinfobynumber"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByNumber(blockNumber [, callback])
```

返回与给定区块编号匹配的共识信息区块。

**参数**

| 名称       | 类型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 区块编号     | number \\| string | 区块编号或区块标签字符串（`genesis` 或`latest`）。                 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型  | 描述                                                                                                                                                                                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 字符串 | 对象包括具有共识信息的区块。 有关返回值的详细说明，请参阅 [caver.rpc.klay.getBlockWithConsensusInfoByHash]（#caver-rpc-klay-getblockwithconsensusinfobyhash）。 |

**示例**

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
caver.rpc.klay.getBlockWithConsensusInfoByHash(blockHash] [, callback])
```

返回与给定哈希值匹配的共识信息块。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 区块哈希     | 字符串      | 区块哈希值。                                             |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` 返回 `object` - 包含共识信息（提议者和委员会成员名单）的区块对象，如果没有找到区块，则返回 null：

| 名称               | 类型  | 描述                                    |
| ---------------- | --- | ------------------------------------- |
| blockScore       | 字符串 | 以前的困难。 在 BFT 共识引擎中始终为 1               |
| 委员会              | 数组  | 该区块委员会成员的地址数组。 该委员会是参与该区块共识协议的验证者的子集。 |
| 额外数据             | 字符串 | 该数据块的 "额外数据 "字段。                      |
| gasUsed          | 字符串 | 该区块所有交易使用的gas总量。                      |
| 治理数据             | 字符串 | RLP 编码的治理配置                           |
| 哈希               | 字符串 | 区块的哈希值。 如果是待处理区块，则为 "null"。           |
| logsBloom        | 字符串 | 区块日志的 Bloom 过滤器。 如果是待处理区块，则为 "null"。  |
| 数量               | 字符串 | 区块编号。 如果是待处理区块，则为 "null"。             |
| 起源提案人            | 字符串 | 建议在同一区段编号上进行 0 轮。                     |
| 父哈希值             | 字符串 | 父块的哈希值。                               |
| 提案人              | 字符串 | 提案者的地址。                               |
| receiptsRoot     | 字符串 | 区块收据三元组的根。                            |
| 奖励               | 字符串 | 整笔奖励的受益人地址。                           |
| 轮次               | 数量  | 轮数                                    |
| Size             | 字符串 | 整数，该数据块的大小（字节）。                       |
| stateRoot        | 字符串 | 区块最终状态三元组的根。                          |
| 时间戳              | 字符串 | 区块整理时的 unix 时间戳。                      |
| 时间戳FoS           | 字符串 | 区块整理时间戳的秒分数。                          |
| totalBlockScore  | 字符串 | 该区块之前链上总 blockScore 的整数。              |
| 交易               | 数组  | 事务对象数组。                               |
| transactionsRoot | 字符串 | 区块的交易三角根。                             |
| voteData         | 字符串 | RLP 编码的提案人治理投票                        |

**示例**

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

返回指定区块的委员会中所有验证器的列表。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `Array`

| 类型 | 描述                |
| -- | ----------------- |
| 数组 | 指定区块内委员会所有验证员的地址。 |

**示例**

```javascript
> caver.rpc.klay.getCommittee().then(console.log)
[
    '0xddc2002b729676dfd906484d35bb02a8634d7040',
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'
]。
```

## caver.rpc.klay.getCommitteeSize <a href="#caver-rpc-klay-getcommitteesize" id="caver-rpc-klay-getcommitteesize"></a>

```javascript
caver.rpc.klay.getCommitteeSize([blockNumber] [, callback])
```

返回指定区块的委员会大小。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `number`

| 类型 | 描述          |
| -- | ----------- |
| 数量 | 指定区块的委员会规模。 |

**示例**

```javascript
> caver.rpc.klay.getCommitteeSize().then(console.log)
2
```

## caver.rpc.klay.getCouncil <a href="#caver-rpc-klay-getcouncil" id="caver-rpc-klay-getcouncil"></a>

```javascript
caver.rpc.klay.getCouncil([blockNumber] [, callback])
```

返回指定区块中议会所有验证器的列表。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `Array`

| 类型 | 描述                            |
| -- | ----------------------------- |
| 数组 | 给定区块中议会的验证器地址数组，如果没有找到议会，则为空。 |

**示例**

```javascript
> caver.rpc.klay.getCouncil().then(console.log)
[
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    '0xddc2002b729676dfd906484d35bb02a8634d7040'
]。
```

## caver.rpc.klay.getCouncilSize <a href="#caver-rpc-klay-getcouncilsize" id="caver-rpc-klay-getcouncilsize"></a>

```javascript
caver.rpc.klay.getCouncilSize([blockNumber] [, callback])
```

返回指定区块的理事会大小。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

**返回价值**

`Promise` returns `number`

| 类型 | 描述         |
| -- | ---------- |
| 数量 | 给定区块的议会规模。 |

**示例**

```javascript
> caver.rpc.klay.getCouncilSize().then(console.log)
2
```

## caver.rpc.klay.getStorageAt <a href="#caver-rpc-klay-getstorageat" id="caver-rpc-klay-getstorageat"></a>

```javascript
caver.rpc.klay.getStorageAt(address, position [, blockNumber] [, callback])
```

从给定地址的存储位置返回值。

**参数：**

| 名称       | 类型                 | 描述                                                                                                                              |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 地址       | 字符串                | 获取存储空间的地址。                                                                                                                      |
| 位置       | 数量                 | 存储空间的索引位置。 有关 "计算位置 "的更多信息，请参阅 [klay_getStorageAt](../../../../json-rpc/klay/block.md#klay_getstorageat) 。 |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。                                               |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                                                              |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述       |
| --- | -------- |
| 字符串 | 该存储位置的值。 |

**示例**

```javascript
> caver.rpc.klay.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 0).then(console.log)
0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234
```

## caver.rpc.klay.isMinting <a href="#caver-rpc-klay-isminting" id="caver-rpc-klay-isminting"></a>

```javascript
caver.rpc.klay.isMinting([callback])
```

如果客户端正在积极挖掘新区块，则返回 `true`。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

Promise`返回`boolean`- 如果客户端正在挖矿，则返回`true`，否则返回 `false\`。

**示例**

```javascript
> caver.rpc.klay.isMinting().then(console.log)
true
```

## caver.rpc.klay.isSyncing <a href="#caver-rpc-klay-issyncing" id="caver-rpc-klay-issyncing"></a>

```javascript
caver.rpc.klay.isSyncing([callback])
```

返回一个包含同步状态数据的对象，否则返回 false。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` 返回 `object|boolean` - 如果 kaia 节点未同步，则返回 `false`。 否则，将返回一个同步对象：

| 名称           | 类型  | 描述                  |
| ------------ | --- | ------------------- |
| 起始块          | 字符串 | 同步开始的区块编号（十六进制）。    |
| 当前区块         | 字符串 | 节点当前同步到的区块编号（十六进制）。 |
| 最高块          | 字符串 | 要同步到的估计区块编号（十六进制）。  |
| 已知状态         | 字符串 | 可下载以十六进制表示的估计状态。    |
| pulledStates | 字符串 | 以十六进制表示已下载的状态。      |

**示例**

```javascript
> caver.rpc.klay.isSyncing().then(console.log)
{
        startingBlock: 100,
        currentBlock：312,
        highestBlock: 512,
        knownStates：234566,
        pulledStates：123455
}

> caver.rpc.klay.isSyncing().then(console.log)
false
```

## caver.rpc.klay.call <a href="#caver-rpc-klay-call" id="caver-rpc-klay-call"></a>

```javascript
caver.rpc.klay.call(callObject [, blockNumber] [, callback])
```

立即执行新的消息调用，而不在区块链上发送交易。 如果发生错误，它会返回数据或 JSON RPC 的错误对象。

**参数**

| 名称       | 类型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 调用对象     | 对象                 | 交易调用对象。 该对象的属性请参见下表。                                                              |
| 区块编号     | number \\| string | (可选）区块编号，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，将使用 `latest`。 |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                |

callObject\` 具有以下属性：

| 名称       | 类型  | 描述                                                                                                              |
| -------- | --- | --------------------------------------------------------------------------------------------------------------- |
| to       | 字符串 | (测试新合同部署时可选） 交易指向的地址。                                                                        |
| 输入       | 字符串 | (可选）方法签名和编码参数的哈希值。 您可以使用 `caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall`。 |
| from     | 字符串 | (可选）交易发送的地址。                                                                                 |
| gas      | 字符串 | (可选）为交易执行提供的gas。 `klay_call` 消耗的gas为零，但某些执行可能需要该参数。                                          |
| gasPrice | 字符串 | (可选）用于每种付费gas的 gasPrice。                                                                     |
| value    | 字符串 | (可选）以 `peb` 为单位与该交易一起发送的值。                                                                   |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述                      |
| --- | ----------------------- |
| 字符串 | 调用返回的数据。 例如，智能合约函数的返回值。 |

**示例**

```javascript
> caver.rpc.klay.call({ 
        to：'0x5481a10a47C74f800BDF4955BD77550881bde91C', // 合同地址
        input: '0x70a0823100000000000000000000ddc2002b729676dfd906484d35bb02a8634d7040'
    }).then(console.log)
0x000000000000000000000000000000000000000000000de0b6b3a7640000
```

## caver.rpc.klay.estimateGas <a href="#caver-rpc-klay-estimategas" id="caver-rpc-klay-estimategas"></a>

```javascript
caver.rpc.klay.estimateGas(callObject [, blockNumber] [, callback])
```

生成并返回交易完成所需的 "gas "估计值。 该方法产生的交易不会添加到区块链中。

**参数**

参见 [caver.rpc.klay.call](#caver-rpc-klay-call)参数，预计所有属性都是可选的。

**返回价值**

`Promise` returns `Array`

| 类型  | 描述       |
| --- | -------- |
| 字符串 | 用的Gas数量。 |

**示例**

```javascript
> caver.rpc.klay.estimateGas({ 
        to：'0x5481a10a47C74f800BDF4955BD77550881bde91C', // 合同地址
        input: '0x095ea7b30000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xb2a0
```

## caver.rpc.klay.estimateComputationCost <a href="#caver-rpc-klay-estimatecomputationcost" id="caver-rpc-klay-estimatecomputationcost"></a>

```javascript
caver.rpc.klay.estimateComputationCost(callObject [, blockNumber] [, callback])
```

生成并返回执行事务的 "计算成本 "估计值。 kaia 将事务的计算成本限制为 `100000000` ，以避免单个事务耗费过多时间。 该交易不会像 [caver.rpc.klay.estimateGas]（#caver-rpc-klay-estimategas）那样被添加到区块链中。

**参数**

参见 [caver.rpc.klay.call](#caver-rpc-klay-call)参数，预计所有属性都是可选的。

**返回价值**

`Promise` returns `Array`

| 类型  | 描述       |
| --- | -------- |
| 字符串 | 使用的计算成本。 |

**示例**

```javascript
> caver.rpc.klay.estimateComputationCost({ 
        to：0x5481a10a47C74f800BDF4955BD77550881bde91C', // 合同地址
        input: '0x095ea7b30000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe3200000000000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xd761
```

## caver.rpc.klay.getTransactionByBlockHashAndIndex <a href="#caver-rpc-klay-gettransactionbyblockhashandindex" id="caver-rpc-klay-gettransactionbyblockhashandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockHashAndIndex(blockHash, index [, callback])
```

按 "块哈希值 "和 "事务索引 "位置返回事务信息。

**参数**

| 名称        | 类型       | 描述                                                 |
| --------- | -------- | -------------------------------------------------- |
| blockHash | 字符串      | 区块哈希值。                                             |
| index     | 数量       | 区块内的事务索引位置。                                        |
| callback  | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                                                                                                                   |
| -- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 对象 | 事务对象，详见 [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)。 |

**示例**

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

按 "区块编号 "和 "事务索引 "位置返回事务信息。

**参数**

| 名称       | 类型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 区块编号     | number \\| string | 区块编号或区块标签字符串（`genesis` 或`latest`）。                 |
| index    | 数量                 | 区块内的事务索引位置。                                        |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                                                                                                                   |
| -- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 对象 | 事务对象，详见 [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)。 |

**举例**

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

使用交易哈希值请求，返回有关交易的信息。

**参数：**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易哈希值。   | 字符串      | 交易哈希值。                                             |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` 返回 `object` - 一个事务对象，如果没有找到事务，则返回 `null` ：

| 名称                 | 类型      | 描述                                                                                                                                        |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 字符串     | 该交易所在区块的哈希值。                                                                                                                              |
| 区块编号               | 字符串     | 该交易所在的区块编号。                                                                                                                               |
| 代码格式               | 字符串     | (可选，默认：`'EVM'`）智能合约代码的编码格式。                                                                                            |
| 付费人                | 字符串     | (可选）付费人地址。                                                                                                             |
| feePayerSignatures | 数组      | (可选）付费人签名对象数组。 签名对象包含三个字段（V、R 和 S）。 V 包含 ECDSA 恢复 ID。 R 包含 ECDSA 签名 r，而 S 包含 ECDSA 签名 s。                               |
| 费用比率               | 字符串     | (可选）付费人的缴费比例。 如果是 30，付费人将支付 30%的费用。 70% 由发送人支付。                                                                        |
| from               | 字符串     | 发送人地址。                                                                                                                                    |
| gas                | 字符串     | 发送人提供的gas。                                                                                                                                |
| gasPrice           | 字符串     | 由发件人提供用 peb 的 Gas Price                                                                                                                   |
| 哈希                 | 字符串     | 交易的哈希值。                                                                                                                                   |
| humanReadable      | Boolean | (可选） `true`（如果地址可人工读取），`false`（如果地址不可人工读取）。                                                                            |
| key                | 字符串     | (可选）用于更新 kaia 帐户 AccountKey 的 RLP 编码 AccountKey。 详情请参阅 [AccountKey](../../../../../../learn/accounts.md#account-key) 。 |
| input              | 字符串     | (可选）与交易一起发送的数据。                                                                                                        |
| nonce              | 字符串     | 发件人在此交易之前进行的交易次数。                                                                                                                         |
| 发送方 TxHash         | 字符串     | (可选）不含缴费人地址和签名的 txash。 该值始终与非收费委托交易的 `hash` 值相同。                                                                       |
| 签名                 | 数组      | 签名对象数组。 签名对象包含三个字段（V、R 和 S）。 V 包含 ECDSA 恢复 ID。 R 包含 ECDSA 签名 r，而 S 包含 ECDSA 签名 s。                                                         |
| to                 | 字符串     | 收件人地址。 如果是合约部署事务，则为 "null"。                                                                                                               |
| 交易索引               | 字符串     | 区块中事务索引位置的整数。                                                                                                                             |
| 类型                 | 字符串     | 表示交易类型的字符串。                                                                                                                               |
| typeInt            | 数量      | 代表交易类型的整数。                                                                                                                                |
| value              | 字符串     | 以peb为单位的价值转移                                                                                                                              |

如果事务处于 "待处理 "状态，尚未被处理，则会返回 "blockHash"、"blockNumber "和 "transactionIndex "的默认值。 请参见下面的示例。

**示例**

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

返回发送方交易哈希值请求的交易信息。

请注意，只有在节点中通过 `--sendertxhashindexing`启用了索引功能时，此 API 才会返回正确的结果。 使用 [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) 检查索引功能是否启用。

**参数：**

| 名称         | 类型       | 描述                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 发送方 TxHash | 字符串      | 发送方交易哈希值。 返回事务的 [senderTxHash]（.../.../.../.../.../learn/transactions/transactions.md#sendertxhash）。 |
| callback   | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                                                                                                                                                                                                                                                                                                                                                       |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                                                                                                                    |
| -- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 对象 | 事务对象，详见 [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash) 。 |

**示例**

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

根据交易哈希返回交易的收据。

**注意**\* 对于交易尚未处理的 "待处理 "交易，不提供收据。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易哈希值。   | 字符串      | 交易哈希值。                                             |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` 返回 `object` - 交易收据对象，或 `null` - 未找到收据：

| 名称                 | 类型      | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 字符串     | 该交易所在区块的哈希值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 区块编号               | 字符串     | 该交易所在的区块编号。                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| codeFormat         | 字符串     | (可选，默认：`'EVM'`）智能合约代码的编码格式。                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| contractAddress    | 字符串     | 如果交易是创建合约，则为创建的合同地址，否则为`null`。                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 有效GasPrice         | 字符串     | 从发送方扣除的每笔gas的实际价值。 在 Magma 硬分叉之前，该值等于交易的天然气价格。 Magma 硬分叉后，它等于区块头中的 "baseFee "值。                                                                                                                                                                                                                                                                                                                                                                                                          |
| 付费者                | 字符串     | (可选）付费人地址。                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| feePayerSignatures | 数组      | (可选）付费人签名对象数组。 签名对象包含三个字段（V、R 和 S）。 V 包含 ECDSA 恢复 ID。 R 包含 ECDSA 签名 r，而 S 包含 ECDSA 签名 s。                                                                                                                                                                                                                                                                                                                                                                              |
| 费用比率               | 字符串     | (可选）付费人的缴费比例。 如果是 30，缴费人将支付 30%的费用。 70% 由发送人支付。                                                                                                                                                                                                                                                                                                                                                                                                                       |
| from               | 字符串     | 发送人地址。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| gas                | 字符串     | 发送人提供的gas。                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| gasPrice           | 字符串     | 由发件人提供用 peb 的 Gas Price                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| gasUsed            | 字符串     | 仅此一项交易使用的gas量。                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| humanReadable      | Boolean | (可选） `true`（如果地址可人工读取），`false`（如果地址不可人工读取）。                                                                                                                                                                                                                                                                                                                                                                                                                           |
| key                | 字符串     | (可选）用于更新 kaia 帐户 AccountKey 的 RLP 编码 AccountKey。                                                                                                                                                                                                                                                                                                                                                                                                                      |
| input              | 字符串     | (可选）与交易一起发送的数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| logs               | 数组      | 该事务生成的日志对象数组。                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| logsBloom          | 字符串     | 用于轻型客户端的 Bloom 过滤器可快速检索相关日志。                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| nonce              | 字符串     | 发件人在此交易之前进行的交易次数。                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 发送方 TxHash         | 字符串     | (可选）仅由发送方签名的交易哈希值。 返回事务的 [senderTxHash]（.../.../.../.../.../learn/transactions/transactions.md#sendertxhash）。 该值始终与非收费委托交易的 `transactionHash` 相同。 |
| 签名                 | 数组      | 签名对象数组。 签名对象包含三个字段（V、R 和 S）。 V 包含 ECDSA 恢复 ID。 R 包含 ECDSA 签名 r，而 S 包含 ECDSA 签名 s。                                                                                                                                                                                                                                                                                                                                                                                                        |
| status             | 字符串     | 如果事务成功，则为 `0x1`；如果 kaia 虚拟机还原了事务，则为 `0x0`。                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| txError            | 字符串     | (可选）当 `status` 等于 `0x0` 时的详细错误代码。                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| to                 | 字符串     | 收件人地址。 如果是合约部署事务，则为 "null"。                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 交易哈希值。             | 字符串     | 交易的哈希值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 交易索引               | 字符串     | 区块中事务索引位置的整数。                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 类型                 | 字符串     | 表示交易类型的字符串。                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| typeInt            | 数量      | 代表交易类型的整数。                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| value              | 字符串     | 以peb为单位的价值转移                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

**注意** `caver.kct.kip7.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**示例**

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

根据交易哈希返回交易的收据。

请注意，只有在节点中通过 `--sendertxhashindexing`启用了索引功能时，此 API 才会返回正确的结果。 使用 [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) 检查索引功能是否启用。

**注意**\* 对于交易尚未处理的 "待处理 "交易，不提供收据。

**参数**

| 名称         | 类型       | 描述                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 发送方 TxHash | 字符串      | 发送方交易哈希值。 返回事务的 [senderTxHash]（.../.../.../.../.../learn/transactions/transactions.md#sendertxhash）。 |
| callback   | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                                                                                                                                                                                                                                                                                                                                                       |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                                                                                                                                       |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 对象 | 交易收据对象，详见 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)。 |

**示例**

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

向 kaia 发送 "签名交易"。

signedTransaction "参数可以是 "RLP 编码的签名交易"。 您可以使用 `transaction.getRLPEncoding` 获取已签名事务的 RLP 编码事务。 为方便起见，`caver.rpc.klay.sendRawTransaction` 也接受 "已签名事务实例 "作为参数。

**参数**

| 名称       | 类型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 签名交易     | string \\| object | RLP 编码的签名事务或签名事务实例。                                |
| callback | function           | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

| 类型         | 描述                             |
| ---------- | ------------------------------ |
| PromiEvent | 一个承诺组合事件发射器。 当有交易收据时，该问题将得到解决。 |

PromiEvent 可用于以下事件：

- 事务散列返回字符串：在发送事务且事务哈希值可用后立即触发。
- 收据 "返回 "对象"：当有交易收据时触发。 详情请参阅 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) 。
- error`返回`Error\`：如果在发送过程中发生错误，则触发。 如果出现缺gas错误，第二个参数就是收据。

**示例**

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

使用 kaia 节点中的 "导入账户私钥 "将事务签署为事务 "发送方"，并将事务传播到 kaia。

有关每种事务类型的更多信息，请参阅 [事务]（.../caver-transaction/caver-transaction.md#class）。

**注意**：此 API 提供了使用 kaia 节点中的 [导入账户](../../../.../jsson-rpc/personal.md#personal_importrawkey) 签署交易的功能。 您节点中的导入账户必须[解锁]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount）才能签署交易。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易       | 对象       | 要发送到 kaia 的事务实例。                                   |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

| 类型         | 描述                             |
| ---------- | ------------------------------ |
| PromiEvent | 一个承诺组合事件发射器。 当有交易收据时，该问题将得到解决。 |

PromiEvent 可用于以下事件：

- 事务散列返回字符串：在发送事务且事务哈希值可用后立即触发。
- 收据 "返回 "对象"：当有交易收据时触发。 详情请参阅 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) 。
- error`返回`Error\`：如果在发送过程中发生错误，则触发。 如果出现缺gas错误，第二个参数就是收据。

**示例**

```javascript
> const tx = caver.transaction.valueTransfer.create({
    from: '0x{address in hex}', // The address of imported account in kaia Node
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

使用 kaia 节点中的 "导入账户私钥 "将费用委托交易签署为交易 "费用支付方"，并将交易传播到 kaia。

在使用 "sendTransaction "作为付费方之前，交易发送方必须已使用有效签名，且 "nonce "已定义。

有关每种事务类型的更多信息，请参阅 [事务]（.../caver-transaction/caver-transaction.md#class）。

**注意**：此 API 提供了使用 kaia 节点中的 [导入账户](../../../.../jsson-rpc/personal.md#personal_importrawkey) 签署交易的功能。 您节点中的导入账户必须[解锁]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount）才能签署交易。

**参数**

| 名称          | 类型       | 描述                                                 |
| ----------- | -------- | -------------------------------------------------- |
| transaction | 对象       | 要发送给 kaia 的收费委托事务实例。                               |
| callback    | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

| 类型         | 描述                             |
| ---------- | ------------------------------ |
| PromiEvent | 一个承诺组合事件发射器。 当有交易收据时，该问题将得到解决。 |

PromiEvent 可用于以下事件：

- 事务散列返回字符串：在发送事务且事务哈希值可用后立即触发。
- 收据 "返回 "对象"：当有交易收据时触发。 详情请参阅 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) 。
- error`返回`Error\`：如果在发送过程中发生错误，则触发。 如果出现缺gas错误，第二个参数就是收据。

**示例**

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
    feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in kaia Node
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

使用 kaia 节点中的 "导入账户私钥 "作为交易发送方签署交易。

有关每种事务类型的更多信息，请参阅 [事务]（.../caver-transaction/caver-transaction.md#class）。

**注意**：此 API 提供了使用 kaia 节点中的 [导入账户](../../../.../jsson-rpc/personal.md#personal_importrawkey) 签署交易的功能。 您节点中的导入账户必须[解锁]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount）才能签署交易。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易       | 对象       | 要签署的交易实例。                                          |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` 返回 `object` - 对象包括代码块：

| 名称  | 类型  | 描述            |
| --- | --- | ------------- |
| raw | 字符串 | RLP 编码的签名交易。  |
| tx  | 对象  | 交易对象，包括发件人签名。 |

**示例**

```javascript
> const tx = caver.transaction.valueTransfer.create({
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in kaia Node
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

使用 kaia 节点中的 "导入账户私钥 "作为交易费支付方签署交易。

有关每种事务类型的更多信息，请参阅 [事务]（.../caver-transaction/caver-transaction.md#class）。

**注意**：此 API 提供了使用 kaia 节点中的 [导入账户](../../../.../jsson-rpc/personal.md#personal_importrawkey) 签署交易的功能。 您节点中的导入账户必须已[解锁]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount），才能签署信息。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易       | 对象       | 要签署的交易实例。                                          |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` 返回 `object` - 对象包括代码块：

| 名称  | 类型  | 描述            |
| --- | --- | ------------- |
| raw | 字符串 | RLP 编码的签名交易。  |
| tx  | 对象  | 作为缴费人签署的交易对象。 |

**示例**

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
    feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122', // The address of imported account in kaia Node
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

根据给定的事务哈希值，返回事务中已解码的锚点数据。

**参数：**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易哈希值。   | 字符串      | 交易哈希值。                                             |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` 返回 `object` - 对象包括块标头：

| 名称        | 类型  | 描述                                                                 |
| --------- | --- | ------------------------------------------------------------------ |
| BlockHash | 字符串 | 执行锚定交易的子链块的哈希值。                                                    |
| 区块编号      | 数量  | 执行该锚定交易的子链区块编号。                                                    |
| 父哈希值      | 字符串 | 父块的哈希值。                                                            |
| TxHash    | 字符串 | 区块的交易三角根。                                                          |
| 状态根哈希值    | 字符串 | 区块最终状态三元组的根。                                                       |
| 收据哈希值     | 字符串 | 区块收据三元组的根。                                                         |
| 区块数       | 数量  | 锚定期间生成的区块数。 在大多数情况下，这个数字等于子链的 `SC_TX_PERIOD`，除非该事务是开启锚定后的第一个锚定 tx。 |
| TxCount   | 数量  | 锚定期间子链产生的交易次数。                                                     |

**示例**

```javascript
> caver.rpc.klay.getDecodedAnchoringTransactionByHash('0x59831a092a9f0b48018848f5dd88a457efdbfabec13ea07cd769686741a1cd13').then(console.log)
{
    BlockCount：86400,
    BlockHash: '0x3c44b2ed491be7264b9f6819c67427642447716576b6702a72f6fdc40c41abde',
    BlockNumber：23414400,
    ParentHash: '0x735468bb091a296c45553c8f67a8d0d39ac428cbe692b1b6c494d336351477f3',
    ReceiptHash：0x6a908d319b6f6ab4414da1afd6763d70ecc8037ec167aaa8942bc0c2af12b4ab',
    StateRootHash: '0x4a664227fb2508a2952a4695cabb88b433522af2a5dee50cc6dd4036d85bf1d3',
    TxCount：50895,
    TxHash: '0x753a85d2c53fc34cb9108301f1cf8ff8d78dde13d42d80958e47e388008319cd',
}
```

## caver.rpc.klay.getChainId <a href="#caver-rpc-klay-getchainid" id="caver-rpc-klay-getchainid"></a>

```javascript
caver.rpc.klay.getChainId([callback])
```

返回链的 ID。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述      |
| --- | ------- |
| 字符串 | 链的链 ID。 |

**示例**

```javascript
> caver.rpc.klay.getChainId().then(console.log)
0x2710
```

## caver.rpc.klay.getClientVersion <a href="#caver-rpc-klay-getclientversion" id="caver-rpc-klay-getclientversion"></a>

```javascript
caver.rpc.klay.getClientVersion([callback])
```

返回 kaia 节点的当前客户端版本。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述               |
| --- | ---------------- |
| 字符串 | kaia 节点的当前客户端版本。 |

**示例**

```javascript
> caver.rpc.klay.getClientVersion().then(console.log)
kaia/v1.3.0+144494d2aa/linux-amd64/go1.13.1
```

## caver.rpc.klay.getGasPrice <a href="#caver-rpc-klay-getgasprice" id="caver-rpc-klay-getgasprice"></a>

```javascript
caver.rpc.klay.getGasPrice([callback])
```

返回单位gas的当前价格（以 wei 为单位）。

**参数：**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述             |
| --- | -------------- |
| 字符串 | 目前 peb 的Gas价格。 |

**示例**

```javascript
> caver.rpc.klay.getGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getGasPriceAt <a href="#caver-rpc-klay-getgaspriceat" id="caver-rpc-klay-getgaspriceat"></a>

```javascript
caver.rpc.klay.getGasPriceAt([blockNumber] [, callback])
```

返回给定区块当前的单位为 peb 的gas价格。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 区块编号     | 数量       | (可选）区块编号。 如果省略，将返回最新单价。         |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述             |
| --- | -------------- |
| 字符串 | 目前 peb 的gas价格。 |

**示例**

```javascript
> caver.rpc.klay.getGasPriceAt().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getMaxPriorityFeePerGas <a href="#caver-rpc-klay-getmaxpriorityfeepergas" id="caver-rpc-klay-getmaxpriorityfeepergas"></a>

```javascript
caver.rpc.klay.getMaxPriorityFeePerGas([callback])
```

返回 peb 中动态收费交易的建议gas小费上限。 由于 kaia 有固定的gas价格，因此会返回 kaia 设定的gas价格。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述            |
| --- | ------------- |
| 字符串 | 建议使用peb付Gas费用 |

**示例**

```javascript
> caver.rpc.klay.getMaxPriorityFeePerGas().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getLowerBoundGasPrice <a href="#caver-rpc-klay-getlowerboundgasprice" id="caver-rpc-klay-getlowerboundgasprice"></a>

```javascript
caver.rpc.klay.getLowerBoundGasPrice([callback])
```

返回以 peb 为单位的gas价格下限。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述                 |
| --- | ------------------ |
| 字符串 | 以 peb 为单位的下限gas价格。 |

**示例**

```javascript
> caver.rpc.klay.getLowerBoundGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getUpperBoundGasPrice <a href="#caver-rpc-klay-getupperboundgasprice" id="caver-rpc-klay-getupperboundgasprice"></a>

```javascript
caver.rpc.klay.getUpperBoundGasPrice([callback])
```

返回以 peb 为单位的gas价格上限。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述                 |
| --- | ------------------ |
| 字符串 | 以 peb 为单位的gas价格上限。 |

**示例**

```javascript
> caver.rpc.klay.getUpperBoundGasPrice().then(console.log)
0xae9f7bcc00
```

## caver.rpc.klay.getFeeHistory <a href="#caver-rpc-klay-getfeehistory" id="caver-rpc-klay-getfeehistory"></a>

```javascript
caver.rpc.klay.getFeeHistory(blockCount, lastBlock, rewardPercentiles [, callback])
```

返回返回区块范围的收费历史记录。 如果不是所有区块都可用，则可以是所请求范围的一个分段。

**参数**

| 名称                | 类型                                  | 描述                                                                                                                                       |
| ----------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 区块数               | number\\|BigNumber\\|BN\\|string | 请求范围内的区块数。 单次查询可请求 1 到 1024 个区块。 如果不是所有区块都可用，返回的数据可能少于要求的数据。                                                                             |
| lastBlock         | number\\|BigNumber\\|BN\\|string | 请求范围内的最高数字区块（或区块标记字符串）。                                                                                                                  |
| rewardPercentiles | 数组                                  | 单调递增的百分位值列表，从每个区块的每个gas有效优先权费用中按升序取样，并根据所用gas加权。 (例如：`['0'、'25'、'50'、'75'、'100']` 或 `['0'、'0.5'、'1'、'1.5'、'3'、'80']`) |
| callback          | function                            | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                                                                       |

**返回价值**

`Promise` 返回 `object` - 对象包括代码块：

| 名称            | 类型  | 描述                                                                        |
| ------------- | --- | ------------------------------------------------------------------------- |
| oldestBlock   | 字符串 | 返回范围内的最低数块。                                                               |
| 奖励            | 数组  | 二维数组，包含所要求的区块百分位数下每种gas的有效优先权费。                                           |
| baseFeePerGas | 数组  | 每个gas的区块基本费用数组。 这包括返回范围中最新区块之后的下一个区块，因为该值可以从最新区块中导出。 EIP-1559 之前的数据块返回 0。 |
| gas用量比        | 数组  | 区块中gasUsed/gasLimit的数组。                                                   |

**示例**

```javascript
> caver.rpc.klay.getFeeHistory(3, 'latest', [0.1, 0.2, 0.3]).then(console.log)
{
  oldestBlock: '0xbb701',
  reward: [
    [ '0x0', '0x0', '0x0' ],
    [ '0x5d21dba00', '0x5d21dba00', '0x5d21dba00' ],
    [ '0x0', '0x0', '0x0' ]
  ],
  baseFeePerGas：[ '0x0', '0x0', '0x0', '0x0' ],
  gasUsedRatio: [ 0, 2.1000000000021e-8, 0 ]
}
```

## caver.rpc.klay.createAccessList <a href="#caver-rpc-klay-createaccesslist" id="caver-rpc-klay-createaccesslist"></a>

```javascript
caver.rpc.klay.createAccessList(txCallObject [, callback])
```

此方法根据给定的事务创建访问列表。 accessList 包含事务读写的所有存储槽和地址，发送者账户和预编译器除外。 该方法使用与 `caver.rpc.klay.call` 相同的事务调用对象和 blockNumberOrTag 对象。 访问列表可用于释放因gas成本增加而无法访问的卡滞合同。 与没有访问列表的交易相比，在交易中添加访问列表并不一定会降低gas用量。

**参数**

| 名称             | 类型                                  | 描述                                                                                                          |
| -------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| callObject     | 对象                                  | 交易调用对象。 请参阅 [caver.rpc.klay.call](#caver-rpc-klay-call) 参数。 |
| blockParameter | number\\|BigNumber\\|BN\\|string | (可选）区块编号、区块斜杠或区块标签字符串（"最新 "或 "最早"）。 如果省略，将使用 `latest`。                                   |
| callback       | function                            | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。                                                          |

**返回价值**

`Promise` 返回 `object` - 对象包括代码块：

| 名称          | 类型  | 描述                                                                        |
| ----------- | --- | ------------------------------------------------------------------------- |
| oldestBlock | 字符串 | 返回范围内的最低数块。                                                               |
| 奖励          | 数组  | 二维数组，包含所要求的区块百分位数下每种gas的有效优先权费。                                           |
| 基本gas费      | 数组  | 每个gas的区块基本费用数组。 这包括返回范围中最新区块之后的下一个区块，因为该值可以从最新区块中导出。 EIP-1559 之前的数据块返回 0。 |
| gas用量比      | 数组  | 区块中gasUsed/gasLimit的数组。                                                   |

**示例**

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

如果节点以并行方式写入区块链数据，则返回 `true`。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型      | 描述                                                 |
| ------- | -------------------------------------------------- |
| boolean | true "表示节点正在以并行方式写入区块链数据。 如果节点正在串行写入数据，则为 "false"。 |

**示例**

```javascript
> caver.rpc.klay.isParallelDBWrite().then(console.log)
true
```

## caver.rpc.klay.isSenderTxHashIndexingEnabled <a href="#caver-rpc-klay-issendertxhashindexingenabled" id="caver-rpc-klay-issendertxhashindexingenabled"></a>

```javascript
caver.rpc.klay.isSenderTxHashIndexingEnabled([callback])
```

如果节点正在索引发送方交易哈希到交易哈希映射信息，则返回 `true`。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型      | 描述                               |
| ------- | -------------------------------- |
| boolean | true "表示节点正在索引发送方交易哈希到交易哈希的映射信息。 |

**示例**

```javascript
> caver.rpc.klay.isSenderTxHashIndexingEnabled().then(console.log)
true
```

## caver.rpc.klay.getProtocolVersion <a href="#caver-rpc-klay-getprotocolversion" id="caver-rpc-klay-getprotocolversion"></a>

```javascript
caver.rpc.klay.getProtocolVersion([callback])
```

返回节点的 kaia 协议版本。 Cypress/Baobab 的当前版本（截至 v1.9.0）是 `istanbul/65`。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述             |
| --- | -------------- |
| 字符串 | 节点的 kaia 协议版本。 |

**示例**

```javascript
> caver.rpc.klay.getProtocolVersion().then(console.log)
0x40
```

## caver.rpc.klay.getRewardbase <a href="#caver-rpc-klay-getrewardbase" id="caver-rpc-klay-getrewardbase"></a>

```javascript
caver.rpc.klay.getRewardbase([callback])
```

返回当前节点的 rewardbase。 Rewardbase 是区块奖励的账户地址。 只有 CN 才需要。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述      |
| --- | ------- |
| 字符串 | 奖励基地地址。 |

**示例**

```javascript
> caver.rpc.klay.getRewardbase().then(console.log)
0xa9b3a93b2a9fa3fdcc31addd240b04bf8db3414c
```

## caver.rpc.klay.getFilterChanges <a href="#caver-rpc-klay-getfilterchanges" id="caver-rpc-klay-getfilterchanges"></a>

```javascript
caver.rpc.klay.getFilterChanges(filterId [, callback])
```

过滤器的轮询方法，返回上次轮询后的日志数组。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| filterId | 字符串      | 过滤器 ID。                                            |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` 返回 `Array` - 日志对象数组，如果上次轮询后没有任何更改，则返回空数组。

- 对于使用 [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) 创建的过滤器，返回值是块哈希值，_e.g._, `["0x3454645634534..."]`。
- 对于使用 [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter) 创建的过滤器，返回值是事务哈希值，_e.g._, `["0x6345343454645..."]`。
- 对于使用 [caver.rpc.klay.newFilter](#caver-rpc-klay-newfilter) 创建的过滤器，日志是带有以下参数的对象：

| 名称        | 类型  | 描述                                                                                                                                                                                   |
| --------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| logIndex  | 字符串 | 区块中的日志索引位置。                                                                                                                                                                          |
| 交易索引      | 字符串 | 创建日志的事务索引位置。                                                                                                                                                                         |
| 交易哈希值。    | 字符串 | 创建该日志的交易散列。 待处理时为 "null"。                                                                                                                                                            |
| blockHash | 字符串 | 该交易所在区块的哈希值。 待处理时为 "null"。                                                                                                                                                           |
| 区块编号      | 字符串 | 该日志所在的区块编号。 待处理时为 "null"。                                                                                                                                                            |
| address   | 字符串 | 该日志的来源地址。                                                                                                                                                                            |
| 数据        | 字符串 | 包含日志的非索引参数。                                                                                                                                                                          |
| topics    | 数组  | 由 0 到 4 个 32 字节的日志参数数据组成的数组。 (在 Solidity 中：第一个主题是事件签名的哈希值（_e.g._, `Deposit(address,bytes32,uint256)`），除非你用 `anonymous` 指定符声明了事件）。 |

**示例**

```javascript
> caver.rpc.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log)
[ 
    { 
        地址：0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics：[ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data：0x00000000000000000000000000000000000000000001',
        blockNumber: '0xdc5',
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex：'0x0',
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex：'0x0'
    } 
]
```

## caver.rpc.klay.getFilterLogs <a href="#caver-rpc-klay-getfilterlogs" id="caver-rpc-klay-getfilterlogs"></a>

```javascript
caver.rpc.klay.getFilterLogs(filterId [, callback])
```

返回一个数组，其中包含与给定 id 的过滤器匹配的所有日志。 应使用 [newFilter](#caver-rpc-klay-newfilter) 获取过滤器对象。

请注意，其他过滤器创建函数返回的过滤器 id，如 [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) 或 [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter) 不能与此函数一起使用。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| filterId | 字符串      | 过滤器 ID。                                            |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

参见 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**示例**

```javascript
> caver.rpc.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        地址：0x55384B52a9E5091B6012717197887dd3B5779Df3',
        topics：[ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data：0x00000000000000000000000000000000000000000001',
        blockNumber: '0x1c31',
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex：'0x0',
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex：'0x0'
    }
]
```

## caver.rpc.klay.getLogs <a href="#caver-rpc-klay-getlogs" id="caver-rpc-klay-getlogs"></a>

```javascript
caver.rpc.klay.getLogs(options [, callback])
```

返回与给定筛选器对象匹配的所有日志的数组。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 选项       | 对象       | 过滤器选项。 请参阅下表查找说明。                                  |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

选项对象可以包含以下内容

| 名称        | 类型                 | 描述                                                                                                                                                                                                                 |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fromBlock | number \\| string | (可选）要获取日志的最早数据块的数据区块编号。 (最新 "指最近的区块）。 默认值为 \`"最新"。                                                                                                                           |
| toBlock   | number \\| string | (可选）获取日志的最后一个区块的区块编号。 ("latest "指最新的区块）。 默认值为 \`"最新"。                                                                                                                        |
| address   | string \\| Array  | (可选）地址或地址列表。 只返回与特定账户相关的日志。                                                                                                                                                                     |
| topics    | 数组                 | (可选）必须出现在日志条目中的值数组。 顺序很重要。 如果您想省略主题，请使用 `null`, _e.g._, `[null,'0x12...']`。 您也可以为每个主题传递一个数组，其中包含该主题的选项，例如_ `[null,['option1','option2']]`。 |

**返回价值**

参见 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**示例**

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

在节点中创建一个过滤器，在有新块到达时发出通知。 要检查状态是否已更改，请调用 [caver.rpc.klay.getFilterChanges]（#caver-rpc-klay-getfilterchanges）。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述      |
| --- | ------- |
| 字符串 | 过滤器 ID。 |

**示例**

```javascript
> caver.rpc.klay.newBlockFilter().then(console.log)
0xf90906914486a9c22d620e50022b38d5
```

## caver.rpc.klay.newFilter <a href="#caver-rpc-klay-newfilter" id="caver-rpc-klay-newfilter"></a>

```javascript
caver.rpc.klay.newFilter(options [, callback])
```

使用给定的筛选器选项创建筛选器对象，以接收特定的状态变化（日志）。

- 要检查状态是否已更改，请调用 [caver.rpc.klay.getFilterChanges]（#caver-rpc-klay-getfilterchanges）。
- 要获取与`newFilter`创建的过滤器匹配的所有日志，请调用[caver.rpc.klay.getFilterLogs](#caver-rpc-klay-getfilterlogs)。

有关过滤器对象主题的详细信息，请参阅 [Kaia Platform API - klay_newFilter]（.../../../../json-rpc/klay/filter.md#klay_newfilter）。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 选项       | 对象       | 过滤器选项。 请参阅下表查找说明。                                  |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

选项对象可以包含以下内容

| 名称        | 类型                 | 描述                                                                                                                                                                                                                 |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fromBlock | number \\| string | (可选）获取日志的最后一个区块的区块编号。 (最新 "指最近的区块）。 默认值为 \`"最新"。                                                                                                                             |
| toBlock   | number \\| string | (可选）获取日志的最后一个区块的区块编号。 ("最新 "指最近的区块）。 默认值为 \`"最新"。                                                                                                                            |
| address   | string \\| Array  | (可选）地址或地址列表。 只返回与特定账户相关的日志。                                                                                                                                                                     |
| topics    | 数组                 | (可选）必须出现在日志条目中的值数组。 顺序很重要。 如果您想省略主题，请使用 `null`, _e.g._, `[null,'0x12...']`。 您也可以为每个主题传递一个数组，其中包含该主题的选项，例如_ `[null,['option1','option2']]`。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述      |
| --- | ------- |
| 字符串 | 过滤器 ID。 |

**示例**

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

在节点中创建一个过滤器，用于接收新的待处理事务到达的信息。 要检查状态是否已更改，请调用 [caver.rpc.klay.getFilterChanges]（#caver-rpc-klay-getfilterchanges）。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述      |
| --- | ------- |
| 字符串 | 过滤器 ID。 |

**示例**

```javascript
> caver.rpc.klay.newPendingTransactionFilter().then(console.log)
0xe62da1b2a09efcd4168398bdbf586db0
```

## caver.rpc.klay.uninstallFilter <a href="#caver-rpc-klay-uninstallfilter" id="caver-rpc-klay-uninstallfilter"></a>

```javascript
caver.rpc.klay.uninstallFilter(filterId [, callback])
```

卸载具有给定 Id 的过滤器。 当不再需要监控时应总是被调用。 此外，当过滤器在一段时间内未被 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) 调用时，过滤器就会超时。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| filterId | 字符串      | 过滤器 ID。                                            |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型      | 描述                                |
| ------- | --------------------------------- |
| boolean | 如果过滤器已成功卸载，则为 `true`，否则为 `false`。 |

**示例**

```javascript
> caver.rpc.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log)
true
```

## caver.rpc.klay.sha3 <a href="#caver-rpc-klay-sha3" id="caver-rpc-klay-sha3"></a>

```javascript
caver.rpc.klay.sha3(data[, callback])
```

返回给定数据的 Keccak-256（而非标准化的 SHA3-256）。 您可以使用 [caver.utils.sha3]（../caver.utils.md#sha3）代替它。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 数据       | 字符串      | 要转换成 SHA3 哈希值的数据。                                  |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述             |
| --- | -------------- |
| 字符串 | 给定数据的 SHA3 结果。 |

**示例**

```javascript
> caver.rpc.klay.sha3('0x11223344').then(console.log)
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
