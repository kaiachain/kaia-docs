# caver.wallet

caver.wallet "是一個在內存錢包中管理[Keyring](./keyring.md)實例的軟件包。 `caver.wallet` accepts all [SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring), and [RoleBasedKeyring](./keyring.md#rolebasedkeyring), and manages them by address.

## Class <a href="#class" id="class"></a>

### KeyringContainer <a href="#keyringcontainer" id="keyringcontainer"></a>

```javascript
caver.wallet
```

KeyringContainer "是一個管理[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)和[RoleBasedKeyring](./keyring.md#rolebasedkeyring)實例的類。 當 Caver 實例化時，它會在 `caver.wallet` 中創建一個 KeyringContainer 實例。 您可以通過 `caver.wallet` 在內存錢包中存儲和管理鑰匙實例。

**屬性**

| 名稱     | 類型     | 描述                             |
| ------ | ------ | ------------------------------ |
| length | number | keyringContainer 中keyrings的數量。 |

## caver.wallet.generate <a href="#caver-wallet-generate" id="caver-wallet-generate"></a>

```javascript
caver.wallet.generate(numberOfKeyrings [, entropy])
```

在 keyringContainer 中生成帶有隨機生成的私鑰的 [SingleKeyring](./keyring.md#singlekeyring) 實例。

**參數**

| 名稱               | 類型     | 描述                                                      |
| ---------------- | ------ | ------------------------------------------------------- |
| numberOfKeyrings | number | 要創建的 [SingleKeyring](./keyring.md#singlekeyring) 實例的數量。 |
| entropy          | string | (可選）用於增加熵的隨機字符串。                     |

**返回價值**

| 類型    | 描述          |
| ----- | ----------- |
| Array | 包含已生成地址的數組。 |

**舉例**

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

使用給定參數創建鑰匙圈實例，並將其添加到 `caver.wallet` 中。

如果 `key` 是私鑰字符串，則會創建一個使用單個私鑰的 [SingleKeyring](./keyring.md#singlekeyring) 實例。 如果 `key` 是一個包含私鑰字符串的數組，則會創建一個使用多個私鑰的 [MultipleKeyring](./keyring.md#multiplekeyring) 實例。 如果 `key` 是一個二維數組，其中每個元素都包含每個角色要使用的私鑰，則會創建一個 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) 實例。 創建的keyring會添加到 `caver.wallet`。

**參數**

| 名稱      | 類型                | 描述                                                                                                                                                                                                                                                                                                                                                         |
| ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | string            | 地址字符串。                                                                                                                                                                                                                                                                                                                                                     |
| key     | string \\| Array | 私鑰字符串、私鑰數組或二維數組，其中每個數組元素都包含為每個 [role] 定義的密鑰（.../../../../.../learn/accounts.md#roles）。 |

**返回價值**

| 類型     | 描述                                                                                                                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 返回添加到 caver.wallet 的 keyring 實例（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）。 |

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

更新 `caver.wallet` 中的 keyring。 當一個新的 `keyring` 實例（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) 被作為參數傳遞時，存儲在 `caver.wallet` 中與給定的 `keyring` 實例的 `address` 屬性相匹配的現有密鑰環將被找到並替換為給定的密鑰環。 如果找不到匹配的 keyring，則會出現錯誤。

**參數**

| 名稱      | 類型     | 描述                                                                                                                                                                                 |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | object | 要存儲在 `caver.wallet` 中的新 keyring（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）。 |

**返回價值**

| 類型     | 描述                                                                                                                                                                                |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 存儲在`caver.wallet`中的已更新 keyring（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）。 |

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

返回與 `caver.wallet` 中的地址相對應的密鑰環實例。

**參數**

| 名稱      | 類型     | 描述               |
| ------- | ------ | ---------------- |
| address | string | 要查詢的 keyring 地址。 |

**返回價值**

| 類型     | 描述                                                                                                                                                                                  |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 找到的keyring實例（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）存儲在 `caver.wallet` 中。 |

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

如果存在與地址匹配的 keyring，則返回 `true`。

**參數**

| 名稱      | 類型     | 描述                 |
| ------- | ------ | ------------------ |
| address | string | 要檢查是否存在的keyring地址。 |

**返回價值**

| 類型      | 描述                                                    |
| ------- | ----------------------------------------------------- |
| boolean | true "表示 \`caver.wallet "中存在與地址匹配的密鑰。 |

**舉例**

```javascript
> caver.wallet.isExisted('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
true
```

## caver.wallet.add <a href="#caver-wallet-add" id="caver-wallet-add"></a>

```javascript
caver.wallet.add(keyring)
```

向 `caver.wallet` 添加 keyring 實例。 如果新給定的keyring與 `caver.wallet` 中已存在的keyring地址相同，則會返回錯誤信息。 在這種情況下，使用 [updateKeyring](#caver-wallet-updatekeyring) 更新`caver.wallet`中的現有keyring。

**參數**

| 名稱      | 類型     | 描述                                                                                                                                                                                |
| ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | object | 要添加到 `caver.wallet` 的keyring實例（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring) 或 [RoleBasedKeyring](./keyring.md#rolebasedkeyring) ）。 |

**返回價值**

| 類型     | 描述                                                                                                                                                                                           |
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

從 `caver.wallet` 中刪除地址與給定鑰匙圈地址一致的keyring。

**參數**

| 名稱      | 類型     | 描述                                |
| ------- | ------ | --------------------------------- |
| address | string | 要在 `caver.wallet` 中刪除的keyring的地址。 |

**返回價值**

| 類型      | 描述                                        |
| ------- | ----------------------------------------- |
| boolean | 如果從 `caver.wallet`'中刪除了keyring，則為 `true`。 |

**示例**

```javascript
> caver.wallet.remove('0x6a3edfad6d1126020d5369e9097db39281876c5d')
true
```

## caver.wallet.signMessage <a href="#caver-wallet-signmessage" id="caver-wallet-signmessage"></a>

```javascript
caver.wallet.signMessage(address, message, role [, index])
```

使用存儲在 caver.wallet 中的密鑰，用 kaia 專用前綴簽署信息。 這樣就能計算出 kaia 特有的簽名：

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

如果用戶沒有提供索引參數，`caver.wallet.signMessage` 會使用角色使用的所有私鑰簽署信息。 如果給定了索引參數，`caver.wallet.signMessage` 將只使用給定索引上的一個私鑰來簽署信息。 在 caver-js 中使用的角色可以通過 `caver.wallet.keyring.role`找到。

**參數**

| 名稱      | 類型     | 描述                                                                              |
| ------- | ------ | ------------------------------------------------------------------------------- |
| address | string | 要使用的keyring地址。                                                                  |
| message | string | 要簽署的信息。                                                                         |
| role    | number | 表示鑰匙作用的數字。 您可以使用 `caver.wallet.keyring.role`。                                   |
| index   | number | (可選）要使用的私人密鑰的索引。 索引必須小於為每個角色定義的私鑰數組的長度。 如果沒有定義索引，該方法將使用所有私鑰。 |

**返回價值**

| 類型     | 描述         |
| ------ | ---------- |
| object | 包含簽名結果的對象。 |

返回的對象包含以下內容

| 名稱          | 類型     | 描述                                                                                       |
| ----------- | ------ | ---------------------------------------------------------------------------------------- |
| messageHash | string | 用 kaia 專用前綴簽署信息。                                                                         |
| singatures  | Array  | [SignatureData] （#signaturedata）的數組。 |
| message     | string | 待簽名消息                                                                                    |

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

使用 `caver.wallet` 中的密鑰作為事務的`發送方`簽署事務，並在事務對象中添加`簽名`。

對於 [Account Update](../caver-transaction/basic.md#accountupdate) 交易，使用 [roleTransactionKey](../../../../../learn/accounts.md#roles) ，否則，使用 [roleTransactionKey](../../../../../learn/accounts.md#roles) 。 如果用戶沒有定義 "index"，"caver.wallet.sign "會使用角色使用的所有私鑰簽署交易。 如果定義了 `index`，`caver.wallet.sign` 就會只使用給定索引上的一個私鑰來簽署交易。

**參數**

| 名稱          | 類型       | 描述                                                                                                                                                                                      |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address     | string   | 要使用的 keyring 地址。                                                                                                                                                                        |
| transaction | object   | [Transaction]（.../caver-transaction/caver-transaction.md#class）的實例。 |
| index       | number   | (可選）要使用的私人密鑰的索引。 索引必須小於為每個角色定義的私鑰數組的長度。 如果沒有定義索引，該方法將使用所有私鑰。                                                                                                         |
| hasher      | function | (可選）用於獲取交易哈希值的哈希函數。 如果將 `hasher` 作為參數，它將計算事務哈希值，而不是使用 caver-js 中的默認方法計算事務哈希值。 有關事務散列生成的默認方法，請參閱 [Basic](../../../../../../learn/transactions/basic.md) 。             |

**返回價值**

返回 "對象 "的 "許諾"：已簽署的事務。

| 類型     | 描述                                           |
| ------ | -------------------------------------------- |
| object | 已簽名的事務實例。 簽名將附加到 `transaction.signatures` 中。 |

有關事務類型字段的更多信息，請參閱 [caver.transaction]（.../caver-transaction/caver-transaction.md）。

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

使用 `caver.wallet` 中的密鑰，在交易對象中以交易的 `費用支付方` 身份簽名並附加 `費用支付方簽名`。

要以付費者身份簽署交易，請使用 [roleFeePayerKey](../../../../../../learn/accounts.md#roles). 如果用戶沒有定義 "索引"，"caver.wallet.signAsFeePayer "會使用角色使用的所有私鑰簽署交易。 如果定義了 `index`，`caver.wallet.signAsFeePayer` 將只使用給定索引上的一個私鑰來簽署交易。

如果未定義 "transaction.feePayer"，則分配由 "caver.wallet "創建的密鑰地址。

**參數**

| 名稱          | 類型       | 描述                                                                                                                                                                 |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address     | string   | 要使用的keyring地址。                                                                                                                                                     |
| transaction | object   | FeeDelegatedTransaction](../caver-transaction/fee-delegation.md) 的實例。 |
| index       | number   | (可選）要使用的私人密鑰的索引。 索引必須小於為每個角色定義的私鑰數組的長度。 如果沒有定義索引，該方法將使用所有私鑰。                                                                                    |
| hasher      | function | (可選）用於獲取交易哈希值的函數。 如果將 hasher 定義為參數，就會使用它來獲取事務哈希值，而不是使用 caver-js 中的默認實現。                                                                         |

**返回價值**

返回 "object" 的 "Promise"：已簽署的事務。

| 類型     | 描述                                                                     |
| ------ | ---------------------------------------------------------------------- |
| object | 已簽名的事務實例。 簽名結果會附加到 "transaction.feePayerSignatures "中。 |

有關事務類型字段的更多信息，請參閱 [caver.transaction]（.../caver-transaction/caver-transaction.md）。

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
