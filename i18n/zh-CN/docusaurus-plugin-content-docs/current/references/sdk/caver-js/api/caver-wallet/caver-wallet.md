# caver.wallet

caver.wallet "是一个在内存钱包中管理[Keyring](./keyring.md)实例的软件包。 `caver.wallet` accepts all [SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring), and [RoleBasedKeyring](./keyring.md#rolebasedkeyring), and manages them by address.

## Class <a href="#class" id="class"></a>

### KeyringContainer <a href="#keyringcontainer" id="keyringcontainer"></a>

```javascript
caver.wallet
```

KeyringContainer "是一个管理[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)和[RoleBasedKeyring](./keyring.md#rolebasedkeyring)实例的类。 当 Caver 实例化时，它会在 `caver.wallet` 中创建一个 KeyringContainer 实例。 您可以通过 `caver.wallet` 在内存钱包中存储和管理钥匙实例。

**属性**

| 名称     | 类型     | 描述                             |
| ------ | ------ | ------------------------------ |
| length | number | keyringContainer 中keyrings的数量。 |

## caver.wallet.generate <a href="#caver-wallet-generate" id="caver-wallet-generate"></a>

```javascript
caver.wallet.generate(numberOfKeyrings [, entropy])
```

在 keyringContainer 中生成带有随机生成的私钥的 [SingleKeyring](./keyring.md#singlekeyring) 实例。

**参数**

| 名称               | 类型     | 描述                                                      |
| ---------------- | ------ | ------------------------------------------------------- |
| numberOfKeyrings | number | 要创建的 [SingleKeyring](./keyring.md#singlekeyring) 实例的数量。 |
| entropy          | string | (可选）用于增加熵的随机字符串。                     |

**返回价值**

| 类型    | 描述          |
| ----- | ----------- |
| Array | 包含已生成地址的数组。 |

**举例**

```javascript
// generate without entropy
> caver.wallet.generate(3)
[
    '0xb4b0c3781082cf818bfaf5adfc73fdf59d92c1cd',
    '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    '0xed2fe179c18fa528da2392532998560bd1008511'
]

// generate with entropy
> caver.wallet.generate(3, caver.utils.randomHex(32))
[
    '0xb4b0c3781082cf818bfaf5adfc73fdf59d92c1cd',
    '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    '0xed2fe179c18fa528da2392532998560bd1008511'
]
```

## caver.wallet.newKeyring <a href="#caver-wallet-newkeyring" id="caver-wallet-newkeyring"></a>

```javascript
caver.wallet.newKeyring(address, key)
```

使用给定参数创建钥匙圈实例，并将其添加到 `caver.wallet` 中。

如果 `key` 是私钥字符串，则会创建一个使用单个私钥的 [SingleKeyring](./keyring.md#singlekeyring) 实例。 如果 `key` 是一个包含私钥字符串的数组，则会创建一个使用多个私钥的 [MultipleKeyring](./keyring.md#multiplekeyring) 实例。 如果 `key` 是一个二维数组，其中每个元素都包含每个角色要使用的私钥，则会创建一个 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) 实例。 创建的keyring会添加到 `caver.wallet`。

**参数**

| 名称      | 类型                | 描述                                                                                                                                                                                                                                                                                                                                                         |
| ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | string            | 地址字符串。                                                                                                                                                                                                                                                                                                                                                     |
| key     | string \\| Array | 私钥字符串、私钥数组或二维数组，其中每个数组元素都包含为每个 [role] 定义的密钥（.../../../../.../learn/accounts.md#roles）。 |

**返回价值**

| 类型     | 描述                                                                                                                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 返回添加到 caver.wallet 的 keyring 实例（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）。 |

**示例**

```javascript
// Create a instance of SingleKeyring and add to caver.wallet
> caver.wallet.newKeyring('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Create a instance of MultipleKeyring and add to caver.wallet
> caver.wallet.newKeyring('0x{address in hex}', ['0x{private key1}', '0x{private key2}'])
MultipleKeyring {
    _address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
    _keys: [ 
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Create a instance of RoleBasedKeyring and add to caver.wallet
> const roleBasedKeys = [
    ['0x{private key1}', '0x{private key2}'],
    ['0x{private key3}', '0x{private key4}'],
    ['0x{private key5}', '0x{private key6}'],
]
> caver.wallet.newKeyring('0x{address in hex}', roleBasedKeys)
RoleBasedKeyring {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _keys: [
        [
            PrivateKey { _privateKey: '0x{private key1}' },
            PrivateKey { _privateKey: '0x{private key2}' }
        ],
        [ 
            PrivateKey { _privateKey: '0x{private key3}' },
            PrivateKey { _privateKey: '0x{private key4}' }
        ],
        [ 
            PrivateKey { _privateKey: '0x{private key5}' },
            PrivateKey { _privateKey: '0x{private key6}' }
        ]
    ]
}
```

## caver.wallet.updateKeyring <a href="#caver-wallet-updatekeyring" id="caver-wallet-updatekeyring"></a>

```javascript
caver.wallet.updateKeyring(keyring)
```

更新 `caver.wallet` 中的 keyring。 当一个新的 `keyring` 实例（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) 被作为参数传递时，存储在 `caver.wallet` 中与给定的 `keyring` 实例的 `address` 属性相匹配的现有密钥环将被找到并替换为给定的密钥环。 如果找不到匹配的 keyring，则会出现错误。

**参数**

| 名称      | 类型     | 描述                                                                                                                                                                                 |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | object | 要存储在 `caver.wallet` 中的新 keyring（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）。 |

**返回价值**

| 类型     | 描述                                                                                                                                                                                |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 存储在`caver.wallet`中的已更新 keyring（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）。 |

**示例**

```javascript
> caver.wallet.updateKeyring(newKeyring)
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.getKeyring <a href="#caver-wallet-getkeyring" id="caver-wallet-getkeyring"></a>

```javascript
caver.wallet.getKeyring(address)
```

返回与 `caver.wallet` 中的地址相对应的密钥环实例。

**参数**

| 名称      | 类型     | 描述               |
| ------- | ------ | ---------------- |
| address | string | 要查询的 keyring 地址。 |

**返回价值**

| 类型     | 描述                                                                                                                                                                                  |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 找到的keyring实例（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）存储在 `caver.wallet` 中。 |

**示例**

```javascript
> caver.wallet.getKeyring('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.isExisted <a href="#caver-wallet-isexisted" id="caver-wallet-isexisted"></a>

```javascript
caver.wallet.isExisted(address)
```

如果存在与地址匹配的 keyring，则返回 `true`。

**参数**

| 名称      | 类型     | 描述                 |
| ------- | ------ | ------------------ |
| address | string | 要检查是否存在的keyring地址。 |

**返回价值**

| 类型      | 描述                                                    |
| ------- | ----------------------------------------------------- |
| boolean | true "表示 \`caver.wallet "中存在与地址匹配的密钥。 |

**举例**

```javascript
> caver.wallet.isExisted('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
true
```

## caver.wallet.add <a href="#caver-wallet-add" id="caver-wallet-add"></a>

```javascript
caver.wallet.add(keyring)
```

向 `caver.wallet` 添加 keyring 实例。 如果新给定的keyring与 `caver.wallet` 中已存在的keyring地址相同，则会返回错误信息。 在这种情况下，使用 [updateKeyring](#caver-wallet-updatekeyring) 更新`caver.wallet`中的现有keyring。

**参数**

| 名称      | 类型     | 描述                                                                                                                                                                                |
| ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | object | 要添加到 `caver.wallet` 的keyring实例（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）。 |

**返回价值**

| 类型     | 描述                                                                                                                                                                                           |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | caver.wallet\`中添加的keyring（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）。 |

**示例**

```javascript
> caver.wallet.add(keyring)
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.remove <a href="#caver-wallet-remove" id="caver-wallet-remove"></a>

```javascript
caver.wallet.remove(address)
```

从 `caver.wallet` 中删除地址与给定钥匙圈地址一致的keyring。

**参数**

| 名称      | 类型     | 描述                                |
| ------- | ------ | --------------------------------- |
| address | string | 要在 `caver.wallet` 中删除的keyring的地址。 |

**返回价值**

| 类型      | 描述                                        |
| ------- | ----------------------------------------- |
| boolean | 如果从 `caver.wallet`'中删除了keyring，则为 `true`。 |

**示例**

```javascript
> caver.wallet.remove('0x6a3edfad6d1126020d5369e9097db39281876c5d')
true
```

## caver.wallet.signMessage <a href="#caver-wallet-signmessage" id="caver-wallet-signmessage"></a>

```javascript
caver.wallet.signMessage(address, message, role [, index])
```

使用存储在 caver.wallet 中的密钥，用 kaia 专用前缀签署信息。 这样就能计算出 kaia 特有的签名：

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

如果用户没有提供索引参数，`caver.wallet.signMessage` 会使用角色使用的所有私钥签署信息。 如果给定了索引参数，`caver.wallet.signMessage` 将只使用给定索引上的一个私钥来签署信息。 在 caver-js 中使用的角色可以通过 `caver.wallet.keyring.role`找到。

**参数**

| 名称      | 类型     | 描述                                                                              |
| ------- | ------ | ------------------------------------------------------------------------------- |
| address | string | 要使用的keyring地址。                                                                  |
| message | string | 要签署的信息。                                                                         |
| role    | number | 表示钥匙作用的数字。 您可以使用 `caver.wallet.keyring.role`。                                   |
| index   | number | (可选）要使用的私人密钥的索引。 索引必须小于为每个角色定义的私钥数组的长度。 如果没有定义索引，该方法将使用所有私钥。 |

**返回价值**

| 类型     | 描述         |
| ------ | ---------- |
| object | 包含签名结果的对象。 |

返回的对象包含以下内容

| 名称          | 类型     | 描述                                                                                       |
| ----------- | ------ | ---------------------------------------------------------------------------------------- |
| messageHash | string | 用 kaia 专用前缀签署信息。                                                                         |
| singatures  | Array  | [SignatureData] （#signaturedata）的数组。 |
| message     | string | 待签名消息                                                                                    |

**示例**

```javascript
// Sign message with roleTransactionKey which uses two private keys
> caver.wallet.signMessage('0x386a4bb40abbfaa59cecdc3ced202475895fd569', 'message to sign', caver.wallet.keyring.role.roleTransactionKey)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1c', _r: '0xb3239...', _s: '0x584d2...' },
        SignatureData { _v: '0x1b', _r: '0x13c64...', _s: '0x60c61...' }
    ],
    message: 'message to sign'
}

// Sign message with roleTransactionKey and index
> caver.wallet.signMessage('0x386a4bb40abbfaa59cecdc3ced202475895fd569', 'message to sign', caver.wallet.keyring.role.roleTransactionKey, 1)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x13c64...', _s: '0x60c61...' }
    ],
    message: 'message to sign'
}
```

## caver.wallet.sign <a href="#caver-wallet-sign" id="caver-wallet-sign"></a>

```javascript
caver.wallet.sign(address, transaction [, index] [, hasher])
```

使用 `caver.wallet` 中的密钥作为事务的`发送方`签署事务，并在事务对象中添加`签名`。

对于 [Account Update](../caver-transaction/basic.md#accountupdate) 交易，使用 [roleTransactionKey](../../../../../learn/accounts.md#roles) ，否则，使用 [roleTransactionKey](../../../../../learn/accounts.md#roles) 。 如果用户没有定义 "index"，"caver.wallet.sign "会使用角色使用的所有私钥签署交易。 如果定义了 `index`，`caver.wallet.sign` 就会只使用给定索引上的一个私钥来签署交易。

**参数**

| 名称          | 类型       | 描述                                                                                                                                                                                      |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address     | string   | 要使用的 keyring 地址。                                                                                                                                                                        |
| transaction | object   | [Transaction]（.../caver-transaction/caver-transaction.md#class）的实例。 |
| index       | number   | (可选）要使用的私人密钥的索引。 索引必须小于为每个角色定义的私钥数组的长度。 如果没有定义索引，该方法将使用所有私钥。                                                                                                         |
| hasher      | function | (可选）用于获取交易哈希值的哈希函数。 如果将 `hasher` 作为参数，它将计算事务哈希值，而不是使用 caver-js 中的默认方法计算事务哈希值。 有关事务散列生成的默认方法，请参阅 [Basic](../../../../../../learn/transactions/basic.md) 。             |

**返回价值**

返回 "对象 "的 "许诺"：已签署的事务。

| 类型     | 描述                                           |
| ------ | -------------------------------------------- |
| object | 已签名的事务实例。 签名将附加到 `transaction.signatures` 中。 |

有关事务类型字段的更多信息，请参阅 [caver.transaction]（.../caver-transaction/caver-transaction.md）。

**示例**

```javascript
// This example uses the ValueTransfer transaction.
// Please refer to [caver.transaction] for how to use various transaction types.
> const transaction = caver.transaction.valueTransfer.create({
    from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0xd78a2...', _s: '0x379e9...' },
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey and index
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 1).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey and hasher
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e44', _r: '0x7a8b6...', _s: '0x17139...' },
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey, index and hasher
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 0, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e44', _r: '0x7a8b6...', _s: '0x17139...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## caver.wallet.signAsFeePayer <a href="#caver-wallet-signasfeepayer" id="caver-wallet-signasfeepayer"></a>

```javascript
caver.wallet.signAsFeePayer(address, transaction [, index] [, hasher])
```

使用 `caver.wallet` 中的密钥，在交易对象中以交易的 `费用支付方` 身份签名并附加 `费用支付方签名`。

要以付费者身份签署交易，请使用 [roleFeePayerKey](../../../../../../learn/accounts.md#roles). 如果用户没有定义 "索引"，"caver.wallet.signAsFeePayer "会使用角色使用的所有私钥签署交易。 如果定义了 `index`，`caver.wallet.signAsFeePayer` 将只使用给定索引上的一个私钥来签署交易。

如果未定义 "transaction.feePayer"，则分配由 "caver.wallet "创建的密钥地址。

**参数**

| 名称          | 类型       | 描述                                                                                                                                                                 |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address     | string   | 要使用的keyring地址。                                                                                                                                                     |
| transaction | object   | FeeDelegatedTransaction](../caver-transaction/fee-delegation.md) 的实例。 |
| index       | number   | (可选）要使用的私人密钥的索引。 索引必须小于为每个角色定义的私钥数组的长度。 如果没有定义索引，该方法将使用所有私钥。                                                                                    |
| hasher      | function | (可选）用于获取交易哈希值的函数。 如果将 hasher 定义为参数，就会使用它来获取事务哈希值，而不是使用 caver-js 中的默认实现。                                                                         |

**返回价值**

返回 "object" 的 "Promise"：已签署的事务。

| 类型     | 描述                                                                     |
| ------ | ---------------------------------------------------------------------- |
| object | 已签名的事务实例。 签名结果会附加到 "transaction.feePayerSignatures "中。 |

有关事务类型字段的更多信息，请参阅 [caver.transaction]（.../caver-transaction/caver-transaction.md）。

**示例**

```javascript
// This example uses the FeeDelegatedValueTransfer transaction.
// Please refer to [caver.transaction] for how to use various transaction types.
> const transaction = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e44', _r: '0x7010e...', _s: '0x65d6b...' },
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey, index
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 0).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e44', _r: '0x7010e...', _s: '0x65d6b...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and hasher
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0xe48bf...', _s: '0x1cf36...' },
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey, index and hasher
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 0, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```
