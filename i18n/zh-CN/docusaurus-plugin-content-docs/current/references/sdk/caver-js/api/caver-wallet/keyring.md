# caver.wallet.keyring

caver.wallet.keyring "是一个提供 Keyring 相关功能的软件包，其中包括地址和私钥。

## Class <a href="#class" id="class"></a>

Keyring "是一个包含账户地址和私人密钥的结构。 这是 caver-js 中的一个类，允许用户使用自己的 [Kaia 账户] 登录（.../../../../.../.../learn/accounts.md#klaytn-accounts）。

根据所存储密钥的类型，"钥匙圈 "可分为三种类型：[单钥匙环](#singlekeyring) 用于存储一个地址和一个私钥，[多钥匙环](#multiplekeyring) 用于存储一个地址和多个私钥，[基于角色的钥匙环](#rolebasedkeyring) 用于为每个角色存储一个地址和一个或多个私钥。

- [SingleKeyring](#singlekeyring)：用户使用私钥签名
- [MultipleKeyring](#multiplekeyring)：用户使用私钥签名
- [RoleBasedKeyring](#rolebasedkeyring)：用户按角色使用私钥签名

### SingleKeyring <a href="#singlekeyring" id="singlekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.singleKeyring(address, key)
```

`SingleKeyring` 是一个存储账户 "地址 "和 "私人密钥 "的类。 要使用私钥字符串创建 SingleKeyring 实例，请参阅 [caver.wallet.keyring.create](#caver-wallet-keyring-create)。

`SingleKeyring`  使用的是未指定角色的私人密钥。

**属性**

| 名称      | 类型                        | 描述                                                                                                               |
| ------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| address | string                    | 所有者地址。                                                                                                           |
| key     | [PrivateKey](#privatekey) | [PrivateKey] (#privatekey)的一个实例，其中包含一个私钥。 |

### MultipleKeyring <a href="#multiplekeyring" id="multiplekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.multipleKeyring(address, keys)
```

`MultipleKeyring` 是一个存储账户地址和多个私人密钥的类。 要使用私钥字符串创建 MultipleKeyring 实例，请参考 [caver.wallet.keyring.create](#caver-wallet-keyring-create)。

`MultipleKeyring` 使用未指定角色的私人钥匙。

**属性**

| 名称      | 类型     | 描述                                      |
| ------- | ------ | --------------------------------------- |
| address | string | 所有者地址。                                  |
| keys    | Array  | 包含一个私钥的 [PrivateKey](#privatekey) 实例数组。 |

### RoleBasedKeyring <a href="#rolebasedkeyring" id="rolebasedkeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.roleBasedKeyring(address, keys)
```

`RoleBasedKeyring` 是一个以数组形式存储账户地址和用于每个角色的私钥的类。

`RoleBasedKeyring`  "定义了 "keys"，它是一个二维数组（空 "keys "看起来像"[[], [], [] ]"），每个[role]可以包含多个密钥（.../.../.../.../.../learn/accounts.md#roles）。 第一个数组元素定义了 `roleTransactionKey` 的私钥，第二个数组元素定义了 `roleAccountUpdateKey` 的私钥，第三个数组元素定义了 `roleFeePayerKey` 的私钥。

**属性**

| 名称      | 类型     | 描述                                                                                                                                                                                                                                                                                                   |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | string | 所有者地址。                                                                                                                                                                                                                                                                                               |
| keys    | Array  | 一个二维数组，用于定义每个 [role](../../../../../../learn/accounts.md#roles) 的键值。 每个 [role](../../../../../../learn/accounts.md#roles) 都包含 [PrivateKey](#privatekey) 实例。 其中第一个元素是 `roleTransactionKey`. 第二个元素是 `roleAccountUpdateKey`. 最后一个元素是 `roleFeePayerKey`. |

下面是 keyring 中定义的一个 getter，可以直观地使用为每个角色定义的密钥。 通过下面的获取器可以更方便地获取每个角色使用的密钥。

| 名称                   | 类型    | 描述                                                                                      |
| -------------------- | ----- | --------------------------------------------------------------------------------------- |
| roleTransactionKey   | Array | 用于签署交易的 roleTransactionKey（账户更新交易除外）。 `keyring.roleTransactionkey` 将返回 `keys` 属性的第一个元素。 |
| roleAccountUpdateKey | Array | 用于签署账户更新事务的 roleAccountUpdateKey。 `keyring.roleAccountUpdateKey` 将返回 `keys` 属性的第二个元素。   |
| roleFeePayerKey      | Array | 用于以付费者身份签署交易的 roleFeePayerKey。 `keyring.roleFeePayerKey` 将返回 `keys` 属性的第三个元素。           |

### PrivateKey <a href="#privatekey" id="privatekey"></a>

```javascript
const privateKey = new caver.wallet.keyring.privateKey('0x{private key}')
```

PrivateKey`是一个包含私钥字符串的类。 Keyring 中每个角色使用的私钥都定义为这个`PrivateKey\` 实例。

**属性**

| 名称         | 类型     | 描述     |
| ---------- | ------ | ------ |
| privateKey | string | 私钥字符串。 |

### 签名数据<a href="#signaturedata" id="signaturedata"></a>

SignatureData`是一个包含签名数据的类。 作为`sign`或`signMessage\` 结果的签名将作为 signatureData 返回。 您可以看到 signatureData 包含签名的情况，如下所示。

```javascript
const signature = new caver.wallet.keyring.signatureData(['0x1b', '0x2dfc6...', '0x15038...'])
```

**属性**

| 名称 | 类型     | 描述                          |
| -- | ------ | --------------------------- |
| v  | String | ECDSA 恢复 ID。                |
| r  | String | ECDSA 签名 r. |
| s  | String | ECDSA 签名                    |

## caver.wallet.keyring.generate <a href="#caver-wallet-keyring-generate" id="caver-wallet-keyring-generate"></a>

```javascript
caver.wallet.keyring.generate([entropy])
```

用随机生成的私钥生成一个 SingleKeyring 实例。

**参数**

| 名称      | 类型     | 描述                                  |
| ------- | ------ | ----------------------------------- |
| entropy | string | (可选）用于增加熵的随机字符串。 |

**返回价值**

| 类型                              | 描述              |
| ------------------------------- | --------------- |
| [SingleKeyring](#singlekeyring) | 返回随机生成的单个密钥环实例。 |

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

生成私钥字符串。

**参数**

| 名称      | 类型     | 描述                                  |
| ------- | ------ | ----------------------------------- |
| entropy | string | (可选）用于增加熵的随机字符串。 |

**返回价值**

| 类型     | 描述       |
| ------ | -------- |
| string | 返回私钥字符串。 |

**示例**

```javascript
> caver.wallet.keyring.generateSingleKey()
'0x{private key}'
```

## caver.wallet.keyring.generateMultipleKeys <a href="#caver-wallet-keyring-generatemultiplekeys" id="caver-wallet-keyring-generatemultiplekeys"></a>

```javascript
caver.wallet.keyring.generateMultipleKeys(num [, entropy])
```

生成私钥字符串。

**参数**

| 名称      | 类型     | 描述                                  |
| ------- | ------ | ----------------------------------- |
| num     | number | 私钥字符串的数量。                           |
| entropy | string | (可选）用于增加熵的随机字符串。 |

**返回价值**

| 类型    | 描述              |
| ----- | --------------- |
| Array | 返回一个包含私钥字符串的数组。 |

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

生成一个 2D 数组，其中每个数组元素都包含为每个 [role] （.../../../../.../learn/accounts.md#roles）定义的键。

**参数**

| 名称       | 类型     | 说明                                                         |
| -------- | ------ | ---------------------------------------------------------- |
| numArray | Array  | 包含每个 [role](../../../../../learn/accounts.md#roles) 键数的数组。 |
| entropy  | string | (可选）用于增加熵的随机字符串。                        |

**返回价值**

| 类型    | 描述                                                                                |
| ----- | --------------------------------------------------------------------------------- |
| Array | 返回一个 2D 数组，其中每个数组元素都包含为每个 [role](../../../../../../learn/accounts.md#roles) 定义的键。 |

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

创建一个带参数的 Keyring 实例。

如果 `key` 是私钥字符串，则会创建一个使用单个私钥的 [SingleKeyring](#singlekeyring) 实例。 如果 `key` 是一个包含私钥字符串的数组，则会创建一个使用多个私钥的 [MultipleKeyring](#multiplekeyring) 实例。 如果 `key` 是一个二维数组，其中每个元素都包含每个角色要使用的私钥，则会创建一个 [RoleBasedKeyring](#rolebasedkeyring) 实例。

**参数**

| 名称      | 类型                | 描述                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | string            | keyring 地址。                                                                                                                                                                                                                                                                                                                                                                                                |
| key     | string \\| Array | 私钥字符串、私钥数组或二维数组，其中每个元素都包含用于每个 [role] 的密钥（.../.../.../.../.../learn/accounts.md#roles）。 |

**返回价值**

| 类型        | 说明                                                                                                                                                                                                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | 返回 Keyring 实例。 根据`key`参数的不同，可以是[SingleKeyring]（#singlekeyring）、[MultipleKeyring]（#multiplekeyring）或[RoleBasedKeyring]（#rolebasedkeyring）。 |

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

从私钥字符串或 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 创建一个 `SingleKeyring` 实例。

**参数**

| 名称  | 类型     | 说明                                                                                                                                                                                                                                                                                                                                                                                                               |
| --- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key | string | 该参数可以是私钥或 [KlaytnWalletKey]（.../.../.../.../.../learn/accounts.md#klaytn-wallet-key-format）。 |

**返回价值**

| 类型                              | 说明                   |
| ------------------------------- | -------------------- |
| [SingleKeyring](#singlekeyring) | 返回 SingleKeyring 实例。 |

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

从 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 字符串创建一个 `SingleKeyring` 实例。

**参数**

| 名称              | 类型     | 描述                                                                                                       |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| klaytnWalletKey | string | The [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) string. |

**返回价值**

| 类型                              | 描述                   |
| ------------------------------- | -------------------- |
| [SingleKeyring](#singlekeyring) | 返回 SingleKeyring 实例。 |

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

根据地址和私钥字符串创建一个 `SingleKeyring` 实例。

**参数**

| 名称      | 类型     | 说明                |
| ------- | ------ | ----------------- |
| address | string | 用于创建 keyring 的地址。 |
| key     | string | 私钥 keyring        |

**返回价值**

| 类型                              | 说明                   |
| ------------------------------- | -------------------- |
| [SingleKeyring](#singlekeyring) | 返回 SingleKeyring 实例。 |

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

根据地址和私钥字符串创建一个 `MultipleKeyring` 实例。

**参数**

| 名称       | 类型     | 描述          |
| -------- | ------ | ----------- |
| address  | string | keyring 地址。 |
| keyArray | Array  | 私钥字符串的数量。   |

**返回价值**

| 类型                                  | 描述                     |
| ----------------------------------- | ---------------------- |
| [MultipleKeyring](#multiplekeyring) | 返回 MultipleKeyring 实例。 |

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

通过地址和二维数组创建一个 `RoleBasedKeyring` 实例，其中每个数组元素都包含为每个 [role](../../../../../learn/accounts.md#roles) 定义的键。

**参数**

| 名称                 | 类型     | 描述                   |
| ------------------ | ------ | -------------------- |
| address            | string | keyring 地址。          |
| roledBasedKeyArray | Array  | 二维数组，包含每个角色的私钥字符串数组。 |

**返回价值**

| 类型                                    | 说明                      |
| ------------------------------------- | ----------------------- |
| [RoleBasedKeyring](#rolebasedkeyring) | 返回 RoleBasedKeyring 实例。 |

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

解密密钥存储 v3 或 v4 JSON 并返回解密后的 Keyring 实例。

**参数**

| 名称       | 类型     | 描述                |
| -------- | ------ | ----------------- |
| keystore | object | 要解密的密钥存储 v3 或 v4。 |
| password | string | 用于加密的密码。          |

**返回价值**

| 类型        | 描述                                                                                                                      |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | 解密后的密钥环实例（[SingleKeyring](#singlekeyring)、[MultipleKeyring](#multiplekeyring) 或 [RoleBasedKeyring](#rolebasedkeyring)）。 |

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

返回公钥字符串。 如果 `keyring` 是 [SingleKeyring](#singlekeyring) 的实例，则 getPublicKey 返回公钥字符串。 如果 `keyring` 是 [MultipleKeyring](#multiplekeyring) 的实例，则 getPublicKey 返回公钥字符串数组。 如果 `keyring` 是 [RoleBasedKeyring](#rolebasedkeyring) 的实例，getPublicKey 返回一个二维数组，其中每个角色使用的公钥都被定义为数组。

**参数**

| 名称         | 类型      | 描述                                           |
| ---------- | ------- | -------------------------------------------- |
| compressed | boolean | (可选）是否采用压缩格式（默认：`false`）。 |

**返回价值**

| 类型                | 描述             |
| ----------------- | -------------- |
| string \\| Array | keyring 的公开密钥。 |

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

返回复制的 keyring 实例。

**返回价值**

| 类型        | 说明                                                                                                                      |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | 复制的密钥环实例（[SingleKeyring](#singlekeyring)、[MultipleKeyring](#multiplekeyring) 或 [RoleBasedKeyring](#rolebasedkeyring) ）。 |

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

用私钥与 transactionHash 签名，并返回签名。 如果用户未定义 "索引"，则 "keyring.sign "会使用角色使用的所有私钥签署交易。 如果定义了 "index"，则 "keyring.sign "只使用索引处的一个私钥来签署事务。 可以通过 `caver.wallet.keyring.role`检查 caver-js 中使用的角色。

签署交易时，建议使用[caver.wallet.sign](./caver-wallet.md#caver-wallet-sign)或[transaction.sign](./caver-transaction/caver-transaction.md#transaction-sign)。

**参数**

| 名称              | 类型                 | 描述                                                                              |
| --------------- | ------------------ | ------------------------------------------------------------------------------- |
| transactionHash | string             | 要签名的交易哈希字符串。                                                                    |
| chainId         | string \\| number | kaia 区块链平台的链 ID。                                                                |
| role            | number             | 表示钥匙作用的数字。 您可以使用 `caver.wallet.keyring.role`。                                   |
| index           | number             | (可选）要使用的私人密钥的索引。 索引必须小于为每个角色定义的私钥数组的长度。 如果没有定义索引，该方法将使用所有私钥。 |

**返回价值**

| 类型    | 描述                                                                                      |
| ----- | --------------------------------------------------------------------------------------- |
| Array | [SignatureData]（#signaturedata）的数组。 |

**举例**

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

使用私人密钥对散列数据进行签名，并返回 V 为 0 或 1（secp256k1 曲线 Y 值的奇偶性）的签名。

该功能仅用于某些交易类型。 因此，建议在签署交易时使用 [caver.wallet.sign](./caver-wallet.md#caver-wallet-sign) 或 [transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign) 。

**参数**

| 名称    | 类型     | 描述                                                                              |
| ----- | ------ | ------------------------------------------------------------------------------- |
| hash  | string | 要签名的哈希字符串。                                                                      |
| role  | number | 表示钥匙作用的数字。 您可以使用 `caver.wallet.keyring.role`。                                   |
| index | number | (可选）要使用的私人密钥的索引。 索引必须小于为每个角色定义的私钥数组的长度。 如果没有定义索引，该方法将使用所有私钥。 |

**返回价值**

| 类型    | 描述                                                                                       |
| ----- | ---------------------------------------------------------------------------------------- |
| Array | [SignatureData] （#signaturedata）的数组。 |

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

用 kaia 专用前缀签署信息。 这样就能计算出 kaia 特有的签名：

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

如果用户未定义 "索引"，则 "keyring.signMessage "会使用角色使用的所有私钥签署交易。 如果给定了索引参数，`keyring.signMessage` 将只使用给定索引上的一个私钥来签署信息。 在 caver-js 中使用的角色可以通过 `caver.wallet.keyring.role`找到。

**参数**

| 名称      | 类型     | 描述                                                                              |
| ------- | ------ | ------------------------------------------------------------------------------- |
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
| messageHash | string | 带有 kaia 专用前缀的报文哈希值。                                                                      |
| singatures  | Array  | [SignatureData] （#signaturedata）的数组。 |
| message     | string | 待签名消息                                                                                    |

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

返回作为参数输入的角色所使用的私钥。

**参数**

| 名称   | 类型     | 描述                                            |
| ---- | ------ | --------------------------------------------- |
| role | number | 表示钥匙作用的数字。 您可以使用 `caver.wallet.keyring.role`。 |

**返回价值**

| 类型                                   | 描述                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [PrivateKey](#privatekey) \\| Array | 私钥](#privatekey)的实例，或包含角色使用的[私钥](#privatekey)实例的数组。 |

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

返回钥匙圈的 [KlaytnWalletKey](.../.../.../.../.../learn/accounts.md#klaytn-wallet-key-format) 字符串。 使用 [MultipleKeyring](#multiplekeyring)或 [RoleBasedKeyring](#rolebasedkeyring) 时，不能使用 [KlaytnWalletKey](../../../.../.../learn/accounts.md#klaytn-wallet-key-format)。 在这种情况下，请使用 [keyring.encrypt](#keyring-encrypt)。

**返回价值**

| 类型     | 描述                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string | 钥匙圈的 [KlaytnWalletKey]（.../.../.../.../.../learn/accounts.md#klaytn-wallet-key-format）。 |

**示例**

```javascript
> keyring.getKlaytnWalletKey()
'0x{private key}0x{type}0x{address in hex}'
```

## keyring.toAccount<a href="#keyring-toaccount" id="keyring-toaccount"></a>

```javascript
keyring.toAccount([options])
```

返回用于更新 [kaiaaccounts](../../../../../learn/accounts.md#account-key) 的 [AccountKey](../../../../../learn/accounts.md#klaytn-accounts) 实例。 账户](.../caver.account.md#account)实例有一个[账户密钥](.../caver.account.md#accountkeylegacy)实例，其中可以包含公钥，公钥将被发送到 kaia Network 并用于验证交易。 有关 [Account]（.../caver.account.md#account）的更多详情，请参阅 [Account Update]（.../../get-started.md#account-update）。

请注意，如果更新 kaia 中存储的 [Account](.../.../.../.../.../learn/accounts.md#account-key) 的 [AccountKey](.../.../.../../learn/accounts.md#klaytn-accounts) 密钥，则不能再使用旧的私钥。 请参阅 [Getting started](../../get-started.md#account-update) 了解如何使用返回的 [Account](../caver.account.md#account) 实例更新 kaia 上 [kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts) 中的信息。

根据钥匙圈中私人密钥的类型，返回的 [Account](../caver.account.md#account) 实例可分为以下几类。

- 当钥匙串包含私钥字符串时：返回一个[Account]（.../caver.account.md#account）实例，其中包括密钥环中的地址和一个[AccountKeyPublic]（.../caver.account.md#accountkeypublic）实例
- 当钥匙串包含私钥字符串时：返回包含密钥串中地址的 [Account](../caver.account.md#account) 实例和 [AccountKeyWeigthedMultiSig](../caver.account.md#accountkeyweightedmultisig) 实例
- 当密钥环按角色包含不同的私钥字符串时：返回包含密钥环中地址的 [Account](../caver.account.md#account) 实例和 [AccountKeyRoleBased](../caver.account.md#accountkeyrolebased) 实例

**参数**

| 名称      | 类型                                                                           | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) （\|数组 | (可选）[WeightedMultiSigOptions]（.../caver.account.md#weightedmultisigoptions）实例，包含将现有账户更新为具有多个私钥的账户时应定义的信息。 如果密钥环为每个角色使用不同的私钥，则必须在数组中为每个角色定义一个 [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) 实例。 如果密钥使用一个以上的私钥，且未定义选项参数，则将使用默认的 [WeightedMultiSigOptions]（.../caver.account.md#weightedmultisigoptions），阈值为 1，每个密钥的权重为 1。 |

**返回价值**

| 类型                                    | 描述                                                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [Account](./caver.account.md#account) | 当用户更新 kaia 账户的 AccountKey 时使用的账户实例。 请注意，如果您想用新的密钥环（或新的私钥）替换现有的密钥环（或现有的私钥），您必须事先向 kaia 发送 "账户更新 "交易来更新您的账户密钥。 |

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

加密keyring并返回密钥存储 v4 标准。 更多信息，请参阅 [KIP-3](https://kips.kaia.io/KIPs/kip-3)。

**参数**

| 名称       | 类型     | 描述                                                  |
| -------- | ------ | --------------------------------------------------- |
| password | string | 用于加密的密码。 加密的密钥存储空间可以用这个密码解密。                        |
| options  | string | (可选）"options "参数允许您指定使用加密时要使用的值。 |

**返回价值**

| 类型     | 描述                        |
| ------ | ------------------------- |
| object | 加密密钥库 v4. |

返回的对象包含以下内容

| 名称      | 类型     | 描述                                                                  |
| ------- | ------ | ------------------------------------------------------------------- |
| version | number | 密钥存储的版本。                                                            |
| id      | string | keystore 的 ID                                                       |
| address | string | 加密[Keyring]的地址。 |
| keyring | Array  | 加密的私人密钥。                                                            |

更多信息，请参阅 [KIP-3](https://kips.kaia.io/KIPs/kip-3)。

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

加密 [SingleKeyring](#singlekeyring) 的实例，并返回密钥存储 v3 标准。

请注意，[MultipleKeyring](#multiplekeyring) 和 [RoleBasedKeyring](#rolebasedkeyring) 不能使用 encryptV3。 在这种情况下，请使用 [keyring.encrypt](#keyring-encrypt) 和密钥存储 V4 标准。

**参数**

| 名称       | 类型     | 描述                                                  |
| -------- | ------ | --------------------------------------------------- |
| password | string | 用于加密的密码。 加密的密钥存储空间可以用这个密码解密。                        |
| options  | string | (可选）用于加密的密码。 加密的密钥存储空间可以用这个密码解密。 |

**返回价值**

| 类型     | 描述                         |
| ------ | -------------------------- |
| object | 加密密钥存储 v3. |

返回的对象包含以下内容

| 名称      | 类型     | 描述                                                                  |
| ------- | ------ | ------------------------------------------------------------------- |
| version | number | 密钥存储的版本。                                                            |
| id      | string | keystore 的 ID                                                       |
| address | string | 加密[Keyring]的地址。 |
| crypto  | object | 加密的私人密钥。                                                            |

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

如果keyring已解耦密钥，则返回 `true`。

**返回价值**

| 类型      | 描述                    |
| ------- | --------------------- |
| boolean | 如果密钥环已解耦密钥，则为 `true`。 |

**举例**

```javascript
> keyring.isDecoupled()
true

> keyring.isDecoupled()
false
```
