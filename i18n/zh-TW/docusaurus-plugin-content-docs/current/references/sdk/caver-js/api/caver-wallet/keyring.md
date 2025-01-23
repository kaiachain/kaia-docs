# caver.wallet.keyring

caver.wallet.keyring "是一個提供 Keyring 相關功能的軟件包，其中包括地址和私鑰。

## Class <a href="#class" id="class"></a>

Keyring "是一個包含賬戶地址和私人密鑰的結構。 這是 caver-js 中的一個類，允許用戶使用自己的 [Kaia 賬戶] 登錄（.../../../../.../.../learn/accounts.md#klaytn-accounts）。

根據所存儲密鑰的類型，"鑰匙圈 "可分為三種類型：[單鑰匙環](#singlekeyring) 用於存儲一個地址和一個私鑰，[多鑰匙環](#multiplekeyring) 用於存儲一個地址和多個私鑰，[基於角色的鑰匙環](#rolebasedkeyring) 用於為每個角色存儲一個地址和一個或多個私鑰。

- [SingleKeyring](#singlekeyring)：用戶使用私鑰簽名
- [MultipleKeyring](#multiplekeyring)：用戶使用私鑰簽名
- [RoleBasedKeyring](#rolebasedkeyring)：用戶按角色使用私鑰簽名

### SingleKeyring <a href="#singlekeyring" id="singlekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.singleKeyring(address, key)
```

`SingleKeyring` 是一個存儲賬戶 "地址 "和 "私人密鑰 "的類。 要使用私鑰字符串創建 SingleKeyring 實例，請參閱 [caver.wallet.keyring.create](#caver-wallet-keyring-create)。

`SingleKeyring`  使用的是未指定角色的私人密鑰。

**屬性**

| 名稱      | 類型                        | 描述                                                                                                               |
| ------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| address | string                    | 所有者地址。                                                                                                           |
| key     | [PrivateKey](#privatekey) | [PrivateKey] (#privatekey)的一個實例，其中包含一個私鑰。 |

### MultipleKeyring <a href="#multiplekeyring" id="multiplekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.multipleKeyring(address, keys)
```

`MultipleKeyring` 是一個存儲賬戶地址和多個私人密鑰的類。 要使用私鑰字符串創建 MultipleKeyring 實例，請參考 [caver.wallet.keyring.create](#caver-wallet-keyring-create)。

`MultipleKeyring` 使用未指定角色的私人鑰匙。

**屬性**

| 名稱      | 類型     | 描述                                      |
| ------- | ------ | --------------------------------------- |
| address | string | 所有者地址。                                  |
| keys    | Array  | 包含一個私鑰的 [PrivateKey](#privatekey) 實例數組。 |

### RoleBasedKeyring <a href="#rolebasedkeyring" id="rolebasedkeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.roleBasedKeyring(address, keys)
```

`RoleBasedKeyring` 是一個以數組形式存儲賬戶地址和用於每個角色的私鑰的類。

`RoleBasedKeyring`  "定義了 "keys"，它是一個二維數組（空 "keys "看起來像"[[], [], [] ]"），每個[role]可以包含多個密鑰（.../.../.../.../.../learn/accounts.md#roles）。 第一個數組元素定義了 `roleTransactionKey` 的私鑰，第二個數組元素定義了 `roleAccountUpdateKey` 的私鑰，第三個數組元素定義了 `roleFeePayerKey` 的私鑰。

**屬性**

| 名稱      | 類型     | 描述                                                                                                                                                                                                                                                                                                   |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | string | 所有者地址。                                                                                                                                                                                                                                                                                               |
| keys    | Array  | 一個二維數組，用於定義每個 [role](../../../../../../learn/accounts.md#roles) 的鍵值。 每個 [role](../../../../../../learn/accounts.md#roles) 都包含 [PrivateKey](#privatekey) 實例。 其中第一個元素是 `roleTransactionKey`. 第二個元素是 `roleAccountUpdateKey`. 最後一個元素是 `roleFeePayerKey`. |

下面是 keyring 中定義的一個 getter，可以直觀地使用為每個角色定義的密鑰。 通過下面的獲取器可以更方便地獲取每個角色使用的密鑰。

| 名稱                   | 類型    | 描述                                                                                      |
| -------------------- | ----- | --------------------------------------------------------------------------------------- |
| roleTransactionKey   | Array | 用於簽署交易的 roleTransactionKey（賬戶更新交易除外）。 `keyring.roleTransactionkey` 將返回 `keys` 屬性的第一個元素。 |
| roleAccountUpdateKey | Array | 用於簽署賬戶更新事務的 roleAccountUpdateKey。 `keyring.roleAccountUpdateKey` 將返回 `keys` 屬性的第二個元素。   |
| roleFeePayerKey      | Array | 用於以付費者身份簽署交易的 roleFeePayerKey。 `keyring.roleFeePayerKey` 將返回 `keys` 屬性的第三個元素。           |

### PrivateKey <a href="#privatekey" id="privatekey"></a>

```javascript
const privateKey = new caver.wallet.keyring.privateKey('0x{private key}')
```

PrivateKey`是一個包含私鑰字符串的類。 Keyring 中每個角色使用的私鑰都定義為這個`PrivateKey\` 實例。

**屬性**

| 名稱         | 類型     | 描述     |
| ---------- | ------ | ------ |
| privateKey | string | 私鑰字符串。 |

### 簽名數據<a href="#signaturedata" id="signaturedata"></a>

SignatureData`是一個包含簽名數據的類。 作為`sign`或`signMessage\` 結果的簽名將作為 signatureData 返回。 您可以看到 signatureData 包含簽名的情況，如下所示。

```javascript
const signature = new caver.wallet.keyring.signatureData(['0x1b', '0x2dfc6...', '0x15038...'])
```

**屬性**

| 名稱 | 類型     | 描述                          |
| -- | ------ | --------------------------- |
| v  | String | ECDSA 恢復 ID。                |
| r  | String | ECDSA 簽名 r. |
| s  | String | ECDSA 簽名                    |

## caver.wallet.keyring.generate <a href="#caver-wallet-keyring-generate" id="caver-wallet-keyring-generate"></a>

```javascript
caver.wallet.keyring.generate([entropy])
```

用隨機生成的私鑰生成一個 SingleKeyring 實例。

**參數**

| 名稱      | 類型     | 描述                                  |
| ------- | ------ | ----------------------------------- |
| entropy | string | (可選）用於增加熵的隨機字符串。 |

**返回價值**

| 類型                              | 描述              |
| ------------------------------- | --------------- |
| [SingleKeyring](#singlekeyring) | 返回隨機生成的單個密鑰環實例。 |

**示例**

```javascript
> caver.wallet.keyring.generate()
SingleKeyring {
    _address: '0x8ecdfda0281f0d36518f89e0e2444c4f98b2e718',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.generateSingleKey <a href="#caver-wallet-keyring-generatesinglekey" id="caver-wallet-keyring-generatesinglekey"></a>

```javascript
caver.wallet.keyring.generateSingleKey([entropy])
```

生成私鑰字符串。

**參數**

| 名稱      | 類型     | 描述                                  |
| ------- | ------ | ----------------------------------- |
| entropy | string | (可選）用於增加熵的隨機字符串。 |

**返回價值**

| 類型     | 描述       |
| ------ | -------- |
| string | 返回私鑰字符串。 |

**示例**

```javascript
> caver.wallet.keyring.generateSingleKey()
'0x{private key}'
```

## caver.wallet.keyring.generateMultipleKeys <a href="#caver-wallet-keyring-generatemultiplekeys" id="caver-wallet-keyring-generatemultiplekeys"></a>

```javascript
caver.wallet.keyring.generateMultipleKeys(num [, entropy])
```

生成私鑰字符串。

**參數**

| 名稱      | 類型     | 描述                                  |
| ------- | ------ | ----------------------------------- |
| num     | number | 私鑰字符串的數量。                           |
| entropy | string | (可選）用於增加熵的隨機字符串。 |

**返回價值**

| 類型    | 描述              |
| ----- | --------------- |
| Array | 返回一個包含私鑰字符串的數組。 |

**示例**

```javascript
> caver.wallet.keyring.generateMultipleKeys(3)
[
    '0x{private key1}',
    '0x{private key2}',
    '0x{private key3}'
]
```

## caver.wallet.keyring.generateRoleBasedKeys <a href="#caver-wallet-keyring-generaterolebasedkeys" id="caver-wallet-keyring-generaterolebasedkeys"></a>

```javascript
caver.wallet.keyring.generateRoleBasedKeys(numArray [, entropy])
```

生成一個 2D 數組，其中每個數組元素都包含為每個 [role] （.../../../../.../learn/accounts.md#roles）定義的鍵。

**參數**

| 名稱       | 類型     | 說明                                                         |
| -------- | ------ | ---------------------------------------------------------- |
| numArray | Array  | 包含每個 [role](../../../../../learn/accounts.md#roles) 鍵數的數組。 |
| entropy  | string | (可選）用於增加熵的隨機字符串。                        |

**返回價值**

| 類型    | 描述                                                                                |
| ----- | --------------------------------------------------------------------------------- |
| Array | 返回一個 2D 數組，其中每個數組元素都包含為每個 [role](../../../../../../learn/accounts.md#roles) 定義的鍵。 |

**示例**

```javascript
> caver.wallet.keyring.generateRoleBasedKeys([2, 1, 3])
[
    [
        '0x{private key1}',
        '0x{private key2}'
    ],
    [
        '0x{private key3}'
    ],
    [
        '0x{private key4}',
        '0x{private key5}',
        '0x{private key6}'
    ]
]
```

## caver.wallet.keyring.create <a href="#caver-wallet-keyring-create" id="caver-wallet-keyring-create"></a>

```javascript
caver.wallet.keyring.create(address, key)
```

創建一個帶參數的 Keyring 實例。

如果 `key` 是私鑰字符串，則會創建一個使用單個私鑰的 [SingleKeyring](#singlekeyring) 實例。 如果 `key` 是一個包含私鑰字符串的數組，則會創建一個使用多個私鑰的 [MultipleKeyring](#multiplekeyring) 實例。 如果 `key` 是一個二維數組，其中每個元素都包含每個角色要使用的私鑰，則會創建一個 [RoleBasedKeyring](#rolebasedkeyring) 實例。

**參數**

| 名稱      | 類型                | 描述                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | string            | keyring 地址。                                                                                                                                                                                                                                                                                                                                                                                                |
| key     | string \\| Array | 私鑰字符串、私鑰數組或二維數組，其中每個元素都包含用於每個 [role] 的密鑰（.../.../.../.../.../learn/accounts.md#roles）。 |

**返回價值**

| 類型        | 說明                                                                                                                                                                                                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | 返回 Keyring 實例。 根據`key`參數的不同，可以是[SingleKeyring]（#singlekeyring）、[MultipleKeyring]（#multiplekeyring）或[RoleBasedKeyring]（#rolebasedkeyring）。 |

**示例**

```javascript
// Create singleKeyring which uses one private key
> caver.wallet.keyring.create('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Create multipleKeyring which uses multiple private keys
> caver.wallet.keyring.create('0x{address in hex}', ['0x{private key1}', '0x{private key2}'])
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Create roleBasedKeyring which uses different private key(s) by roles
> const roleBasedKeys = [
    ['0x{private key1}', '0x{private key2}'],
    ['0x{private key3}', '0x{private key4}'],
    ['0x{private key5}', '0x{private key6}'],
]
> caver.wallet.keyring.create('0x{address in hex}', roleBasedKeys)
RoleBasedKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
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

## caver.wallet.keyring.createFromPrivateKey <a href="#caver-wallet-keyring-createfromprivatekey" id="caver-wallet-keyring-createfromprivatekey"></a>

```javascript
caver.wallet.keyring.createFromPrivateKey(key)
```

從私鑰字符串或 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 創建一個 `SingleKeyring` 實例。

**參數**

| 名稱  | 類型     | 說明                                                                                                                                                                                                                                                                                                                                                                                                               |
| --- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key | string | 該參數可以是私鑰或 [KlaytnWalletKey]（.../.../.../.../.../learn/accounts.md#klaytn-wallet-key-format）。 |

**返回價值**

| 類型                              | 說明                   |
| ------------------------------- | -------------------- |
| [SingleKeyring](#singlekeyring) | 返回 SingleKeyring 實例。 |

**示例**

```javascript
// Create singleKeyring from private key string
> caver.wallet.keyring.createFromPrivateKey('0x{private key}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Create singleKeyring from KlaytnWalletKey
> caver.wallet.keyring.createFromPrivateKey('0x{private key}0x{type}0x{address in hex}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createFromKlaytnWalletKey <a href="#caver-wallet-keyring-createfromklaytnwalletkey" id="caver-wallet-keyring-createfromklaytnwalletkey"></a>

```javascript
caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey)
```

從 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 字符串創建一個 `SingleKeyring` 實例。

**參數**

| 名稱              | 類型     | 描述                                                                                                       |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| klaytnWalletKey | string | The [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) string. |

**返回價值**

| 類型                              | 描述                   |
| ------------------------------- | -------------------- |
| [SingleKeyring](#singlekeyring) | 返回 SingleKeyring 實例。 |

**示例**

```javascript
> caver.wallet.keyring.createFromKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createWithSingleKey <a href="#caver-wallet-keyring-createwithsinglekey" id="caver-wallet-keyring-createwithsinglekey"></a>

```javascript
caver.wallet.keyring.createWithSingleKey(address, key)
```

根據地址和私鑰字符串創建一個 `SingleKeyring` 實例。

**參數**

| 名稱      | 類型     | 說明                |
| ------- | ------ | ----------------- |
| address | string | 用於創建 keyring 的地址。 |
| key     | string | 私鑰 keyring        |

**返回價值**

| 類型                              | 說明                   |
| ------------------------------- | -------------------- |
| [SingleKeyring](#singlekeyring) | 返回 SingleKeyring 實例。 |

**示例**

```javascript
> caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createWithMultipleKey <a href="#caver-wallet-keyring-createwithmultiplekey" id="caver-wallet-keyring-createwithmultiplekey"></a>

```javascript
caver.wallet.keyring.createWithMultipleKey(address, key)
```

根據地址和私鑰字符串創建一個 `MultipleKeyring` 實例。

**參數**

| 名稱       | 類型     | 描述          |
| -------- | ------ | ----------- |
| address  | string | keyring 地址。 |
| keyArray | Array  | 私鑰字符串的數量。   |

**返回價值**

| 類型                                  | 描述                     |
| ----------------------------------- | ---------------------- |
| [MultipleKeyring](#multiplekeyring) | 返回 MultipleKeyring 實例。 |

**示例**

```javascript
> caver.wallet.keyring.createWithMultipleKey('0x{address in hex}', ['0x{private key1}', '0x{private key2}' ])
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}
```

## caver.wallet.keyring.createWithRoleBasedKey <a href="#caver-wallet-keyring-createwithrolebasedkey" id="caver-wallet-keyring-createwithrolebasedkey"></a>

```javascript
caver.wallet.keyring.createWithRoleBasedKey(address, roledBasedKeyArray)
```

通過地址和二維數組創建一個 `RoleBasedKeyring` 實例，其中每個數組元素都包含為每個 [role](../../../../../learn/accounts.md#roles) 定義的鍵。

**參數**

| 名稱                 | 類型     | 描述                   |
| ------------------ | ------ | -------------------- |
| address            | string | keyring 地址。          |
| roledBasedKeyArray | Array  | 二維數組，包含每個角色的私鑰字符串數組。 |

**返回價值**

| 類型                                    | 說明                      |
| ------------------------------------- | ----------------------- |
| [RoleBasedKeyring](#rolebasedkeyring) | 返回 RoleBasedKeyring 實例。 |

**示例**

```javascript
> const roleBasedKeys = [
    ['0x{private key1}', '0x{private key2}'],
    ['0x{private key3}', '0x{private key4}'],
    ['0x{private key5}', '0x{private key6}'],
]
> caver.wallet.keyring.createWithRoleBasedKey('0x{address in hex}', roleBasedKeys)
RoleBasedKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
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

## caver.wallet.keyring.decrypt <a href="#caver-wallet-keyring-decrypt" id="caver-wallet-keyring-decrypt"></a>

```javascript
caver.wallet.keyring.decrypt(keystore, password)
```

解密密鑰存儲 v3 或 v4 JSON 並返回解密後的 Keyring 實例。

**參數**

| 名稱       | 類型     | 描述                |
| -------- | ------ | ----------------- |
| keystore | object | 要解密的密鑰存儲 v3 或 v4。 |
| password | string | 用於加密的密碼。          |

**返回價值**

| 類型        | 描述                                                                                                                      |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | 解密後的密鑰環實例（[SingleKeyring](#singlekeyring)、[MultipleKeyring](#multiplekeyring) 或 [RoleBasedKeyring](#rolebasedkeyring)）。 |

**示例**

```javascript
// Decrypt keystroe v4 (encrypted single keyring)
> caver.wallet.keyring.decrypt({ 
    version: 4,
    id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    keyring: [
        { 
            ciphertext: 'eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15',
            cipherparams: { iv: 'd688a4319342e872cefcf51aef3ec2da' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
        }
    ]
}, 'password')
SingleKeyring {
    _address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Decrypt keystroe v4 (encrypted multiple keyring)
> caver.wallet.keyring.decrypt({
    version: 4,
    id: '55da3f9c-6444-4fc1-abfa-f2eabfc57501',
    address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    keyring: [
        {
            ciphertext: '93dd2c777abd9b80a0be8e1eb9739cbf27c127621a5d3f81e7779e47d3bb22f6',
            cipherparams: { iv: '84f90907f3f54f53d19cbd6ae1496b86' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '69bf176a136c67a39d131912fb1e0ada4be0ed9f882448e1557b5c4233006e10',
                n: 4096,
                r: 8,
                p: 1,
            },
            mac: '8f6d1d234f4a87162cf3de0c7fb1d4a8421cd8f5a97b86b1a8e576ffc1eb52d2',
        },
        {
            ciphertext: '53d50b4e86b550b26919d9b8cea762cd3c637dfe4f2a0f18995d3401ead839a6',
            cipherparams: { iv: 'd7a6f63558996a9f99e7daabd289aa2c' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '966116898d90c3e53ea09e4850a71e16df9533c1f9e1b2e1a9edec781e1ad44f',
                n: 4096,
                r: 8,
                p: 1,
            },
            mac: 'bca7125e17565c672a110ace9a25755847d42b81aa7df4bb8f5ce01ef7213295',
        },
    ],
}, 'password')
MultipleKeyring {
    _address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Decrypt keystroe v4 (encrypted role-based keyring)
> caver.wallet.keyring.decrypt({
    version: 4,
    id: '55da3f9c-6444-4fc1-abfa-f2eabfc57501',
    address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    keyring: [
        [
            {
                ciphertext: '93dd2c777abd9b80a0be8e1eb9739cbf27c127621a5d3f81e7779e47d3bb22f6',
                cipherparams: { iv: '84f90907f3f54f53d19cbd6ae1496b86' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '69bf176a136c67a39d131912fb1e0ada4be0ed9f882448e1557b5c4233006e10',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '8f6d1d234f4a87162cf3de0c7fb1d4a8421cd8f5a97b86b1a8e576ffc1eb52d2',
            },
            {
                ciphertext: '53d50b4e86b550b26919d9b8cea762cd3c637dfe4f2a0f18995d3401ead839a6',
                cipherparams: { iv: 'd7a6f63558996a9f99e7daabd289aa2c' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '966116898d90c3e53ea09e4850a71e16df9533c1f9e1b2e1a9edec781e1ad44f',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: 'bca7125e17565c672a110ace9a25755847d42b81aa7df4bb8f5ce01ef7213295',
            },
        ],
        [
            {
                ciphertext: 'f16def98a70bb2dae053f791882f3254c66d63416633b8d91c2848893e7876ce',
                cipherparams: { iv: 'f5006128a4c53bc02cada64d095c15cf' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '0d8a2f71f79c4880e43ff0795f6841a24cb18838b3ca8ecaeb0cda72da9a72ce',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '38b79276c3805b9d2ff5fbabf1b9d4ead295151b95401c1e54aed782502fc90a',
            },
        ],
        [
            {
                ciphertext: '544dbcc327942a6a52ad6a7d537e4459506afc700a6da4e8edebd62fb3dd55ee',
                cipherparams: { iv: '05dd5d25ad6426e026818b6fa9b25818' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '3a9003c1527f65c772c54c6056a38b0048c2e2d58dc0e584a1d867f2039a25aa',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '19a698b51409cc9ac22d63d329b1201af3c89a04a1faea3111eec4ca97f2e00f',
            },
            {
                ciphertext: 'dd6b920f02cbcf5998ed205f8867ddbd9b6b088add8dfe1774a9fda29ff3920b',
                cipherparams: { iv: 'ac04c0f4559dad80dc86c975d1ef7067' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '22279c6dbcc706d7daa120022a236cfe149496dca8232b0f8159d1df999569d6',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '1c54f7378fa279a49a2f790a0adb683defad8535a21bdf2f3dadc48a7bddf517',
            },
        ],
    ],
}, 'password')
RoleBasedKeyring {
    _address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    _keys: [
        [
            PrivateKey { _privateKey: '0x{private key1}' },
            PrivateKey { _privateKey: '0x{private key2}' }
        ],
        [
            PrivateKey { _privateKey: '0x{private key3}' }
        ],
        [
            PrivateKey { _privateKey: '0x{private key4}' },
            PrivateKey { _privateKey: '0x{private key5}' }
        ]
    ]
}

// Decrypt keystroe v3 JSON
> caver.wallet.keyring.decrypt({ 
    version: 3,
    id: '43f99d36-3905-40e6-bff8-ff0dfc380037',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    crypto: {
        ciphertext: 'f7296e68807837a5318502c097276a89d58d91b85e45e692aee284a27bcd0955',
        cipherparams: { iv: '03fd985d07777601078840c73cc6f7f3' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '46f85271c43fa64ab3338c5235f1d5073bc9379d9b7ba6065c89afb816d83a8a',
            n: 4096,
            r: 8,
            p: 1
        },
     mac: '947f13cd1481fa5ba186e59418ef7600fa69e9830054d59e4d5dc67176e1f967'
    }
}, 'password')
SingleKeyring {
    _address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## keyring.getPublicKey<a href="#keyring-getpublickey" id="keyring-getpublickey"></a>

```javascript
keyring.getPublicKey()
```

返回公鑰字符串。 如果 `keyring` 是 [SingleKeyring](#singlekeyring) 的實例，則 getPublicKey 返回公鑰字符串。 如果 `keyring` 是 [MultipleKeyring](#multiplekeyring) 的實例，則 getPublicKey 返回公鑰字符串數組。 如果 `keyring` 是 [RoleBasedKeyring](#rolebasedkeyring) 的實例，getPublicKey 返回一個二維數組，其中每個角色使用的公鑰都被定義為數組。

**參數**

| 名稱         | 類型      | 描述                                           |
| ---------- | ------- | -------------------------------------------- |
| compressed | boolean | (可選）是否採用壓縮格式（默認：`false`）。 |

**返回價值**

| 類型                | 描述             |
| ----------------- | -------------- |
| string \\| Array | keyring 的公開密鑰。 |

**示例**

```javascript
// Get public key with singleKeyring
> keyring.getPublicKey()
'0x49b2a...'

// Get public key with multipleKeyring
> keyring.getPublicKey()
[ '0x65b51...', '0x8d85c...' ]

// Get public key with roleBasedKeyring
> keyring.getPublicKey()
[
    [ '0x2d939...', '0x6beb4...', '0xd8f2f...' ],
    [ '0xf09cd...', '0x96a63...', '0x02000...' ],
    [ '0xc2d33...', '0x3088f...', '0xab193...' ]
]
```

## keyring.copy <a href="#keyring-copy" id="keyring-copy"></a>

```javascript
keyring.copy()
```

返回複製的 keyring 實例。

**返回價值**

| 類型        | 說明                                                                                                                      |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | 複製的密鑰環實例（[SingleKeyring](#singlekeyring)、[MultipleKeyring](#multiplekeyring) 或 [RoleBasedKeyring](#rolebasedkeyring) ）。 |

**示例**

```javascript
// When keyring is an instance of SingleKeyring
> keyring.copy()
SingleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// When keyring is an instance of MultipleKeyring
> keyring.copy()
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// When keyring is an instance of RoleBasedKeyring
> keyring.copy()
RoleBasedKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
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

## keyring.sign<a href="#keyring-sign" id="keyring-sign"></a>

```javascript
keyring.sign(transactionHash, chainId, role [, index])
```

用私鑰與 transactionHash 簽名，並返回簽名。 如果用戶未定義 "索引"，則 "keyring.sign "會使用角色使用的所有私鑰簽署交易。 如果定義了 "index"，則 "keyring.sign "只使用索引處的一個私鑰來簽署事務。 可以通過 `caver.wallet.keyring.role`檢查 caver-js 中使用的角色。

簽署交易時，建議使用[caver.wallet.sign](./caver-wallet.md#caver-wallet-sign)或[transaction.sign](./caver-transaction/caver-transaction.md#transaction-sign)。

**參數**

| 名稱              | 類型                 | 描述                                                                              |
| --------------- | ------------------ | ------------------------------------------------------------------------------- |
| transactionHash | string             | 要簽名的交易哈希字符串。                                                                    |
| chainId         | string \\| number | kaia 區塊鏈平臺的鏈 ID。                                                                |
| role            | number             | 表示鑰匙作用的數字。 您可以使用 `caver.wallet.keyring.role`。                                   |
| index           | number             | (可選）要使用的私人密鑰的索引。 索引必須小於為每個角色定義的私鑰數組的長度。 如果沒有定義索引，該方法將使用所有私鑰。 |

**返回價值**

| 類型    | 描述                                                                                      |
| ----- | --------------------------------------------------------------------------------------- |
| Array | [SignatureData]（#signaturedata）的數組。 |

**舉例**

```javascript
// Using roleBasedKeyring which has two private key in roleTransactionKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleTransactionKey)
[
    SignatureData { _v: '0x5044', _r: '0x7a8b6...', _s: '0x17139...' },
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
]

// Using roleBasedKeyring which has two private key in roleTransactionKey with index
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleTransactionKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
]

// Using roleBasedKeyring which has two private key in roleAccountUpdateKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleAccountUpdateKey)
[
    SignatureData { _v: '0x5044', _r: '0xdbce8...', _s: '0x039a6...' },
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
]

// Using roleBasedKeyring which has two private key in roleAccountUpdateKey with index
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleAccountUpdateKey, 1)
[
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
]

// Using roleBasedKeyring which has two private key in roleFeePayerKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey)
[
    SignatureData { _v: '0x5043', _r: '0xe48bf...', _s: '0x1cf36...' },
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
]

// Using roleBasedKeyring which has two private key in roleFeePayerKey with index
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
]
```

## keyring.ecsign<a href="#keyring-ecsign" id="keyring-ecsign"></a>

```javascript
keyring.ecsign(hash, role [, index])
```

使用私人密鑰對散列數據進行簽名，並返回 V 為 0 或 1（secp256k1 曲線 Y 值的奇偶性）的簽名。

該功能僅用於某些交易類型。 因此，建議在簽署交易時使用 [caver.wallet.sign](./caver-wallet.md#caver-wallet-sign) 或 [transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign) 。

**參數**

| 名稱    | 類型     | 描述                                                                              |
| ----- | ------ | ------------------------------------------------------------------------------- |
| hash  | string | 要簽名的哈希字符串。                                                                      |
| role  | number | 表示鑰匙作用的數字。 您可以使用 `caver.wallet.keyring.role`。                                   |
| index | number | (可選）要使用的私人密鑰的索引。 索引必須小於為每個角色定義的私鑰數組的長度。 如果沒有定義索引，該方法將使用所有私鑰。 |

**返回價值**

| 類型    | 描述                                                                                       |
| ----- | ---------------------------------------------------------------------------------------- |
| Array | [SignatureData] （#signaturedata）的數組。 |

**示例**

```javascript
> keyring.ecsign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', caver.wallet.keyring.role.roleTransactionKey)
[
    SignatureData { _v: '0x00', _r: '0x7a8b6...', _s: '0x17139...' }
]
```

## keyring.signMessage<a href="#keyring-signmessage" id="keyring-signmessage"></a>

```javascript
keyring.signMessage(message, role [, index])
```

用 kaia 專用前綴簽署信息。 這樣就能計算出 kaia 特有的簽名：

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

如果用戶未定義 "索引"，則 "keyring.signMessage "會使用角色使用的所有私鑰簽署交易。 如果給定了索引參數，`keyring.signMessage` 將只使用給定索引上的一個私鑰來簽署信息。 在 caver-js 中使用的角色可以通過 `caver.wallet.keyring.role`找到。

**參數**

| 名稱      | 類型     | 描述                                                                              |
| ------- | ------ | ------------------------------------------------------------------------------- |
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
| messageHash | string | 帶有 kaia 專用前綴的報文哈希值。                                                                      |
| singatures  | Array  | [SignatureData] （#signaturedata）的數組。 |
| message     | string | 待簽名消息                                                                                    |

**示例**

```javascript
// Sign with roleTransactionKey
> keyring.signMessage('message to sign', caver.wallet.keyring.role.roleTransactionKey)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x2dfc6...', _s: '0x15038...' }
    ],
    message: 'message to sign'
}

// Sign with roleFeePayerKey and index
> keyring.signMessage('message to sign', caver.wallet.keyring.role.roleFeePayerKey, 1)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x2dfc6...', _s: '0x15038...' }
    ],
    message: 'message to sign'
}
```

## keyring.getKeyByRole <a href="#keyring-getkeybyrole" id="keyring-getkeybyrole"></a>

```javascript
keyring.getKeyByRole(role)
```

返回作為參數輸入的角色所使用的私鑰。

**參數**

| 名稱   | 類型     | 描述                                            |
| ---- | ------ | --------------------------------------------- |
| role | number | 表示鑰匙作用的數字。 您可以使用 `caver.wallet.keyring.role`。 |

**返回價值**

| 類型                                   | 描述                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [PrivateKey](#privatekey) \\| Array | 私鑰](#privatekey)的實例，或包含角色使用的[私鑰](#privatekey)實例的數組。 |

**示例**

```javascript
// getKeyByRole with singleKeyring. 
// The singleKeyring will return the single same PrivateKey intance regardless of role.
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
PrivateKey { _privateKey: '0x{private key}' }

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
PrivateKey { _privateKey: '0x{private key}' }

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
PrivateKey { _privateKey: '0x{private key}' }

// getKeyByRole with multipleKeyring. 
// The multipleKeyring will also return the single same array of PrivateKey intances regardless of role
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' }
]

// getKeyByRole with roleBasedKeyring. 
// The roleBasedKeyring will return different array of PrivateKey intances depends on role
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
[
    PrivateKey { _privateKey: '0x{private key1}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
[
    PrivateKey { _privateKey: '0x{private key2}' },
    PrivateKey { _privateKey: '0x{private key3}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
[
    PrivateKey { _privateKey: '0x{private key4}' },
    PrivateKey { _privateKey: '0x{private key5}' },
    PrivateKey { _privateKey: '0x{private key6}' }
]
```

## keyring.getKlaytnWalletKey <a href="#keyring-getklaytnwalletkey" id="keyring-getklaytnwalletkey"></a>

```javascript
keyring.getKlaytnWalletKey()
```

返回鑰匙圈的 [KlaytnWalletKey](.../.../.../.../.../learn/accounts.md#klaytn-wallet-key-format) 字符串。 使用 [MultipleKeyring](#multiplekeyring)或 [RoleBasedKeyring](#rolebasedkeyring) 時，不能使用 [KlaytnWalletKey](../../../.../.../learn/accounts.md#klaytn-wallet-key-format)。 在這種情況下，請使用 [keyring.encrypt](#keyring-encrypt)。

**返回價值**

| 類型     | 描述                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string | 鑰匙圈的 [KlaytnWalletKey]（.../.../.../.../.../learn/accounts.md#klaytn-wallet-key-format）。 |

**示例**

```javascript
> keyring.getKlaytnWalletKey()
'0x{private key}0x{type}0x{address in hex}'
```

## keyring.toAccount<a href="#keyring-toaccount" id="keyring-toaccount"></a>

```javascript
keyring.toAccount([options])
```

返回用於更新 [kaiaaccounts](../../../../../learn/accounts.md#account-key) 的 [AccountKey](../../../../../learn/accounts.md#klaytn-accounts) 實例。 賬戶](.../caver.account.md#account)實例有一個[賬戶密鑰](.../caver.account.md#accountkeylegacy)實例，其中可以包含公鑰，公鑰將被髮送到 kaia Network 並用於驗證交易。 有關 [Account]（.../caver.account.md#account）的更多詳情，請參閱 [Account Update]（.../../get-started.md#account-update）。

請注意，如果更新 kaia 中存儲的 [Account](.../.../.../.../.../learn/accounts.md#account-key) 的 [AccountKey](.../.../.../../learn/accounts.md#klaytn-accounts) 密鑰，則不能再使用舊的私鑰。 請參閱 [Getting started](../../get-started.md#account-update) 瞭解如何使用返回的 [Account](../caver.account.md#account) 實例更新 kaia 上 [kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts) 中的信息。

根據鑰匙圈中私人密鑰的類型，返回的 [Account](../caver.account.md#account) 實例可分為以下幾類。

- 當鑰匙串包含私鑰字符串時：返回一個[Account]（.../caver.account.md#account）實例，其中包括密鑰環中的地址和一個[AccountKeyPublic]（.../caver.account.md#accountkeypublic）實例
- 當鑰匙串包含私鑰字符串時：返回包含密鑰串中地址的 [Account](../caver.account.md#account) 實例和 [AccountKeyWeigthedMultiSig](../caver.account.md#accountkeyweightedmultisig) 實例
- 當密鑰環按角色包含不同的私鑰字符串時：返回包含密鑰環中地址的 [Account](../caver.account.md#account) 實例和 [AccountKeyRoleBased](../caver.account.md#accountkeyrolebased) 實例

**參數**

| 名稱      | 類型                                                                           | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) （\|數組 | (可選）[WeightedMultiSigOptions]（.../caver.account.md#weightedmultisigoptions）實例，包含將現有賬戶更新為具有多個私鑰的賬戶時應定義的信息。 如果密鑰環為每個角色使用不同的私鑰，則必須在數組中為每個角色定義一個 [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) 實例。 如果密鑰使用一個以上的私鑰，且未定義選項參數，則將使用默認的 [WeightedMultiSigOptions]（.../caver.account.md#weightedmultisigoptions），閾值為 1，每個密鑰的權重為 1。 |

**返回價值**

| 類型                                    | 描述                                                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [Account](./caver.account.md#account) | 當用戶更新 kaia 賬戶的 AccountKey 時使用的賬戶實例。 請注意，如果您想用新的密鑰環（或新的私鑰）替換現有的密鑰環（或現有的私鑰），您必須事先向 kaia 發送 "賬戶更新 "交易來更新您的賬戶密鑰。 |

**示例**

```javascript
// Get account with singleKeyring
> keyring.toAccount()
Account {
    _address: '0x6a3edfad6d1126020d5369e9097db39281876c5d',
    _accountKey: AccountKeyPublic { _publicKey: '0xc396b...' }
}

// Get account with multipleKeyring
> keyring.toAccount()
Account {
    _address: '0x53027503242c2f99969eeb8cb3a31f48f3668712',
    _accountKey: AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [
            WeightedPublicKey { _weight: 1, _publicKey: '0x969c8...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0x5bc06...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0x33d83...' }
        ]
    }
}

// Get account with multipleKeyring and options
> keyring.toAccount(new caver.account.weightedMultiSigOptions(3, [2, 2, 3]))
Account {
    _address: '0x53027503242c2f99969eeb8cb3a31f48f3668712',
    _accountKey: AccountKeyWeightedMultiSig {
        _threshold: 3,
        _weightedPublicKeys: [
            WeightedPublicKey { _weight: 2, _publicKey: '0x969c8...' },
            WeightedPublicKey { _weight: 2, _publicKey: '0x5bc06...' },
            WeightedPublicKey { _weight: 3, _publicKey: '0x33d83...' }
        ]
    }
}

// Get account with roleBasedKeyring
> keyring.toAccount()
Account {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _accountKey: AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x65b51...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0x8d85c...' }
                ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x66899...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0x7705d...' }
                ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0xaa934...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0xb763f...' }
                ]
            }
        ]
    }
}

// Get account with roleBasedKeyring and options
> const options = [
    new caver.account.weightedMultiSigOptions(3, [2, 3]),
    new caver.account.weightedMultiSigOptions(2, [1, 1]),
    new caver.account.weightedMultiSigOptions(5, [3, 5])
]
> keyring.toAccount(options)
Account {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _accountKey: AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig {
                _threshold: 3,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 2, _publicKey: '0x65b51...' },
                    WeightedPublicKey { _weight: 3, _publicKey: '0x8d85c...' }
                ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 2,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x66899...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0x7705d...' }
                ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 5,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 3, _publicKey: '0xaa934...' },
                    WeightedPublicKey { _weight: 5, _publicKey: '0xb763f...' }
                ]
            }
        ]
    }
}
```

## keyring.encrypt <a href="#keyring-encrypt" id="keyring-encrypt"></a>

```javascript
keyring.encrypt(password [, options])
```

加密keyring並返回密鑰存儲 v4 標準。 更多信息，請參閱 [KIP-3](https://kips.kaia.io/KIPs/kip-3)。

**參數**

| 名稱       | 類型     | 描述                                                  |
| -------- | ------ | --------------------------------------------------- |
| password | string | 用於加密的密碼。 加密的密鑰存儲空間可以用這個密碼解密。                        |
| options  | string | (可選）"options "參數允許您指定使用加密時要使用的值。 |

**返回價值**

| 類型     | 描述                        |
| ------ | ------------------------- |
| object | 加密密鑰庫 v4. |

返回的對象包含以下內容

| 名稱      | 類型     | 描述                                                                  |
| ------- | ------ | ------------------------------------------------------------------- |
| version | number | 密鑰存儲的版本。                                                            |
| id      | string | keystore 的 ID                                                       |
| address | string | 加密[Keyring]的地址。 |
| keyring | Array  | 加密的私人密鑰。                                                            |

更多信息，請參閱 [KIP-3](https://kips.kaia.io/KIPs/kip-3)。

**示例**

```javascript
// Encrypt singleKeyring
> keyring.encrypt('password')
{ 
    version: 4,
    id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    keyring: [
        { 
            ciphertext: 'eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15',
            cipherparams: { iv: 'd688a4319342e872cefcf51aef3ec2da' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
        }
    ]
}

// Encrypt multipleKeyring
> keyring.encrypt('password')
{
    version: 4,
    id: 'b9fe7bb3-3ae9-41df-a0f2-5f20f525a290',
    address: '0x6e039858fe4c65fe6605fde722ef94a78a3fefed',
    keyring: [
        { 
            ciphertext: '91d62dd3be9a854387c2595b0a53d561b2c99c8fe4a675600a16532f48f5c750',
            cipherparams: { iv: '853b3804c6627af342a8b35474105953' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '3a3b4d9bd97413b2bef95798dc27a29c73d4802ac7258e8b126eeb909f822c72',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: 'b5fe00edb3f9e5c02056b276380b30a7e61ed8e2925b898bc3d528138cd3c939'
        },
        {
            ciphertext: '494486f72355d95991ba95fd5ed7eeecf0f9a3d2fa0a94400125befb4b4c043f',
            cipherparams: { iv: '64be3daa213e359a404ec2e38c1ac9e1' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'f089ee99bfe00f9a43b562624b9376b99963b9d4b8681c076935431dc5c98177',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: '4c8a72a3acb8b07d81033a8bc91f01a4025c684e882e758acde441323a75605f'
        }
    ]
}

// Encrypt roleBasedKeyring
> keyring.encrypt('password')
{
    version: 4,
    id: '99d27cfe-8e3f-427c-bd4c-e4e3cd43955b',
    address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a',
    keyring: [
        [
            {
                ciphertext: '07a3d8c1c6a01734e429bb4ea88d282b3547fa422653f9547c0544bfca011af0',
                cipherparams: { iv: '707177c48b5bfc1f88e91f10eb327b1b' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '452f3e41d9e58b42d348b326319fc27b29ed5f5177e063087f8cb272c6b73fe3', n: 4096, r: 8, p: 1 },
                mac: 'bccd141b9056f7ee26b8e9a4ef52d231403162ed2593df8f2e6b2f2d26a737d2',
            },
            {
                ciphertext: 'c94defa5049b910eb57d46125e3dbdb9d32bfb85f3915aa96e25e75d2346970f',
                cipherparams: { iv: 'fae425c4a44c881e629ccdc0fcf53916' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '37302d0a0625321193e482da55e19a0a51ac250cf4857ecb13112b8c88cbdf44', n: 4096, r: 8, p: 1 },
                mac: '04f7b2879b7e9604356fd4db532c981b4eaa95078c25694e591e7cc2a5c613f1',
            },
        ],

        [
            {
                ciphertext: '015ef2deab867b887fa29c866941512af848e4b547d74a39f44cc4c9ef204b5f',
                cipherparams: { iv: '230271676c4501a860b19b325b1850a6' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: 'eb73f9cacea4e0b38634679102ab5b8f0e84464c2fa3ca07d11ebcdfb7a95519', n: 4096, r: 8, p: 1 },
                mac: 'd76a0f22b2f5a23dac30be820260b3fc738083b797d5c608b23bce8a69f63256',
            },
        ],

        [
            {
                ciphertext: '70870f4dd813fc7c0c4ef64ebba03f15c81677d2558d646b3d143ab8e0d27ec2',
                cipherparams: { iv: '841be9a25127fca0cc79740763ec3e55' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '089ef66590b699c347caddafa592c8f074948b0ca6e2957bae45d005cd55a874', n: 4096, r: 8, p: 1 },
                mac: '6e1ad546d9e3ad1f3c3419ace4c9daf34a310001875b1a3228dbfd1891030bff',
            },
        ],
    ],
}
```

## keyring.encryptV3<a href="#keyring-encryptv3" id="keyring-encryptv3"></a>

```javascript
keyring.encryptV3(password [, options])
```

加密 [SingleKeyring](#singlekeyring) 的實例，並返回密鑰存儲 v3 標準。

請注意，[MultipleKeyring](#multiplekeyring) 和 [RoleBasedKeyring](#rolebasedkeyring) 不能使用 encryptV3。 在這種情況下，請使用 [keyring.encrypt](#keyring-encrypt) 和密鑰存儲 V4 標準。

**參數**

| 名稱       | 類型     | 描述                                                  |
| -------- | ------ | --------------------------------------------------- |
| password | string | 用於加密的密碼。 加密的密鑰存儲空間可以用這個密碼解密。                        |
| options  | string | (可選）用於加密的密碼。 加密的密鑰存儲空間可以用這個密碼解密。 |

**返回價值**

| 類型     | 描述                         |
| ------ | -------------------------- |
| object | 加密密鑰存儲 v3. |

返回的對象包含以下內容

| 名稱      | 類型     | 描述                                                                  |
| ------- | ------ | ------------------------------------------------------------------- |
| version | number | 密鑰存儲的版本。                                                            |
| id      | string | keystore 的 ID                                                       |
| address | string | 加密[Keyring]的地址。 |
| crypto  | object | 加密的私人密鑰。                                                            |

**示例**

```javascript
> keyring.encryptV3('password')
{ 
    version: 3,
    id: '43f99d36-3905-40e6-bff8-ff0dfc380037',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    crypto: {
        ciphertext: 'f7296e68807837a5318502c097276a89d58d91b85e45e692aee284a27bcd0955',
        cipherparams: { iv: '03fd985d07777601078840c73cc6f7f3' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '46f85271c43fa64ab3338c5235f1d5073bc9379d9b7ba6065c89afb816d83a8a',
            n: 4096,
            r: 8,
            p: 1
        },
     mac: '947f13cd1481fa5ba186e59418ef7600fa69e9830054d59e4d5dc67176e1f967'
    }
}
```

## keyring.isDecoupled<a href="#keyring-isdecoupled" id="keyring-isdecoupled"></a>

```javascript
keyring.isDecoupled()
```

如果keyring已解耦密鑰，則返回 `true`。

**返回價值**

| 類型      | 描述                    |
| ------- | --------------------- |
| boolean | 如果密鑰環已解耦密鑰，則為 `true`。 |

**舉例**

```javascript
> keyring.isDecoupled()
true

> keyring.isDecoupled()
false
```
