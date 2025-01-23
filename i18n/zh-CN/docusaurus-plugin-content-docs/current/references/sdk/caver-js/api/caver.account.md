# caver.account

caver.account "是一个提供与 "账户 "相关功能的软件包，在更新账户时使用。

## 类别<a id="class"></a>

### Account <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

账户 "是一个包含更新 kaia 区块链平台（kaia）中账户的[AccountKey]所需的信息的类。 这是 `caver.account` 软件包的默认类。 要使用公钥字符串创建账户实例，请参考 [caver.account.create](#caver-account-create)。

**属性**

| 名称   | 类型  | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 地址   | 字符串 | 要更新的账户地址。                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 帐户密钥 | 对象  | 账户中要使用的新账户密钥。 An object defines `keyType` and `key` inside or an instance of `AccountKey` ([AccountKeyLegacy](../caver.account.md#accountkeylegacy), [AccountKeyPublic](../caver.account.md#accountkeypublic), [AccountKeyFail](../caver.account.md#accountkeyfail)、[AccountKeyWeightedMultiSig](./caver.account.md#accountkeyweightedmultisig)或[AccountKeyRoleBased](./caver.account.md#accountkeyrolebased))。 执行交易时，存储在 kaia 中的账户的 accountKey 会更改为此值。 |

### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const accountKeyLegacy = new caver.account.accountKey.accountKeyLegacy()
```

AccountKeyLegacy\` 用于更新 kaia 中具有 [AccountKeyLegacy] 的账户的 AccountKey。 要创建具有 "账户密钥合法性 "的账户实例，请参考 [caver.account.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy)。

### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const accountKeyPublic = new caver.account.accountKey.accountKeyPublic(publicKey)
```

AccountKeyPublic "用于用[AccountKeyPublic]更新 kaia 中账户的 AccountKey。 将 AccountKey 更新为 "AccountKeyPublic"，就可以将现有的 AccountKey 变为新的公钥，该公钥将用于在 kaia 中验证交易。 在将私人密钥与账户地址分离时，这一更改是必要的。 详见 [AccountUpdate](../get-started.md#account-update) 和 [AccountKey] 。

要创建带有 "AccountKeyPublic "的账户实例，请参考 [caver.account.create](#caver-account-create) 或 [caver.account.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic) 。

**属性**

| 名称 | 类型  | 描述     |
| -- | --- | ------ |
| 公钥 | 字符串 | 公钥字符串。 |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const accountKeyFail = new caver.account.accountKey.accountKeyFail()
```

AccountKeyFail "用于以[AccountKeyFail]更新 kaia 中账户的 AccountKey。 要创建带有 "AccountKeyFail "的账户实例，请参阅 [caver.account.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail)。

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const accountKeyWeightedMultiSig = new caver.account.accountKey.accountKeyWeightedMultiSig(threshold, weightedPublicKeys)
```

AccountKeyWeightedMultiSig "用于使用[AccountKeyWeightedMultiSig]更新 kaia 中账户的 AccountKey。 将您的 AccountKey 更新为 "AccountKeyWeightedMultiSig "后，您就可以将现有的 AccountKey 更改为新的公钥，该公钥将用于验证 kaia 中的交易。 在将私人密钥与账户地址分离时，这一更改是必要的。 详见 [AccountUpdate](../get-started.md#account-update) 和 [AccountKey] 。

要使用 "AccountKeyWeightedMultiSig "创建账户实例，请参考 [caver.account.create](#caver-account-create) 或 [caver.account.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig) 。

**属性**

| 名称   | 类型 | 描述       |
| ---- | -- | -------- |
| 阈值   | 数量 | 验证阈值。    |
| 加权公钥 | 数组 | 加权公钥]数组。 |

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

AccountKeyRoleBased "用于使用[AccountKeyRoleBased]更新 kaia 中账户的 AccountKey。 通过将 AccountKey 更新为 "基于角色的 AccountKey"，您可以更改为每个角色分配的 AccountKey，所有这些 AccountKey 都用于在 kaia 中验证交易。 详见 [AccountUpdate](../get-started.md#account-update) 和 [AccountKey] 。

要创建基于 "账户密钥角色 "的账户实例，请参考 [caver.account.create](#caver-account-create) 或 [caver.account.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased) 。

**属性**

| 名称     | 类型 | 描述                                                                                                                                                                                                                      |
| ------ | -- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 帐户密钥数组 | 数组 | 定义每个 [role] 使用的 accountKey 的数组。 每个角色都可以用 [AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail) 或 [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 来定义。 |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

加权公钥 "包含一个公钥及其权重。 加权公钥 "是一个包含公钥和公钥权重的类，在 [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 中使用。

**属性**

| 名称 | 类型  | 描述                                                             |
| -- | --- | -------------------------------------------------------------- |
| 权重 | 数量  | 公开密钥的权重。 权重用于检查公钥的加权总和是否大于 [AccountKeyWeightedMultiSig] 对象的阈值。 |
| 公钥 | 字符串 | 私钥字符串。                                                         |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weightedMultiSigOptions(threshold, weights)
```

加权多重签名选项 "包含阈值和权重。 WeightedMultiSigOptions "是一个用于定义 AccountKeyWeightedMultiSig 选项的类。

**属性**

| 名称 | 类型 | 描述      |
| -- | -- | ------- |
| 阀值 | 数量 | 验证阈值。   |
| 权重 | 数组 | 键值权重数组。 |

## caver.account.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

生成一个带有地址和 accountKey 的账户实例。

如果 accountKey 是公钥字符串，则会创建一个以 [AccountKeyPublic](#accountkeypublic) 作为 accountKey 的账户实例。 如果 accountKey 是一个包含公钥字符串的数组，则会创建一个以 [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 作为 accountKey 的账户实例。 如果最后一个参数没有定义选项，则使用默认选项创建，阈值为 1，每个键的权重为 1。 如果 accountKey 是一个数组，其中包含用于每个角色的 accountKeys，则会创建一个具有 [AccountKeyRoleBased](#accountkeyrolebased) 的 Account 实例。 必须使用 [WeightedMultiSigOptions] 为每个角色定义选项。 如果未定义选项，则会对使用多个公钥的角色使用默认选项。 请参考下面的示例了解如何使用。

**参数**

| 名称   | 类型                                   | 描述                                                     |
| ---- | ------------------------------------ | ------------------------------------------------------ |
| 地址   | 字符串                                  | 要更新的账户地址。                                              |
| 帐户密钥 | 字符串                                  | 公钥字符串、公钥数组或二维数组，其中每个元素都包含用于每个角色的密钥数组。                  |
| 选项   | [WeightedMultiSigOptions] \\| Array | (可选）AccountKeyWeigthedMultiSig 的选项。 |

**返回价值**

| 类型    | 描述      |
| ----- | ------- |
| \[账户] | 返回账户实例。 |

**示例**

```javascript
// Create an Account instance with a public key string -> Account with AccountKeyPublic
> caver.account.create('0x{address in hex}', '0x034f1...')
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey: AccountKeyPublic { _publicKey: '0x034f1...' } 
}

// Create an Account instance with an array of public keys -> Account with AccountKeyWeightedMultiSig
> caver.account.create('0x{address in hex}', ['0x034f1...', '0xfe4b8...'])
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}
     
// Create an Account instance with an array of public keys with WeightedMultiSigOptions -> Account with AccountKeyWeightedMultiSig
> const options = new caver.account.weightedMultiSigOptions(2, [1, 1])
> caver.account.create('0x{address in hex}', ['0x034f1...', '0xfe4b8...'], options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 2,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// Create an Account instance with an array in which keys to be used for each role are defined as an array -> Account with AccountKeyRoleBased
> const publicKeys = [
    ['0xd8510...', '0xaa105...'],
    ['0xd8510...'],
    ['0xd8510...', '0xceeee...']
]
> caver.account.create('0x{address in hex}', publicKeys)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 1, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xaa105...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xd8510...' },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0xceeee...' }
                ]
            }
        ]
    }
}

// Create an Account instance with an array in which keys to be used for each role are defined as an array with an array of WeightedMultiSigOptions -> Account with AccountKeyRoleBased
> const publicKeys = [
    ['0xd8510...', '0xaa105...'],
    ['0xd8510...'],
    ['0xd8510...', '0xceeee...']
]
> const options = [
    new caver.account.weightedMultiSigOptions(2, [1, 1]),
    new caver.account.weightedMultiSigOptions(),
    new caver.account.weightedMultiSigOptions(3, [1, 2])
]
> caver.account.create('0x{address in hex}', publicKeys, options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 2, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xaa105...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xd8510...' },
            AccountKeyWeightedMultiSig {
                _threshold: 3,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' },
                    WeightedPublicKey { _weight: 2, _publicKey: '0xceeee...' }
                ]
            }
        ]
    }
}
```

## caver.account.createFromRLPEncoding <a id="caver-account-createfromrlpencoding"></a>

```javascript
caver.account.createFromRLPEncoding(address, rlpEncodedKey)
```

根据 RLP 编码的 AccountKey 创建账户实例。

**参数**

| 名称            | 类型  | 描述                      |
| ------------- | --- | ----------------------- |
| 地址            | 字符串 | 要更新的账户地址。               |
| rlpEncodedKey | 字符串 | AccountKey 的 RLP 编码字符串。 |

**返回价值**

| 类型    | 描述      |
| ----- | ------- |
| \[账户] | 返回账户实例。 |

**示例**

```javascript
> caver.account.createFromRLPEncoding('0x{address in hex}'、'0x04f84b02f848e301a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9e301a1021769a9196f523c419be50c26419ebbec34d3d6aa8b59da834212f13dbec9a9c1')
Account {
    _address：'0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey： 
        AccountKeyWeightedMultiSig { 
            _threshold: 2, 
            _weightedPublicKeys：[ 
                WeightedPublicKey { _weight: 1, _publicKey: '0x02c10...' },
                WeightedPublicKey { _weight: 1, _publicKey: '0x02176...' }
            ]。
        }
}
```

## caver.account.createWithAccountKeyLegacy <a id="caver-account-createwithaccountkeylegacy"></a>

```javascript
caver.account.createWithAccountKeyLegacy(address)
```

创建一个以 AccountKeyLegacy 作为 AccountKey 的账户实例。

**参数**

| 名称 | 类型  | 描述        |
| -- | --- | --------- |
| 地址 | 字符串 | 要更新的账户地址。 |

**返回价值**

| 类型    | 描述      |
| ----- | ------- |
| \[帐户] | 返回账户实例。 |

**示例**

```javascript
> caver.account.createWithAccountKeyLegacy('0x{address in hex}')
Account {
  _address：'0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey：AccountKeyLegacy {}
}
```

## caver.account.createWithAccountKeyPublic <a id="caver-account-createwithaccountkeypublic"></a>

```javascript
caver.account.createWithAccountKeyPublic(address, publicKey)
```

创建一个以 AccountKeyPublic 作为 AccountKey 的账户实例。

**参数**

| 名称 | 类型  | 描述        |
| -- | --- | --------- |
| 地址 | 字符串 | 要更新的账户地址。 |
| 公钥 | 字符串 | 公钥字符串。    |

**返回价值**

| 类型    | 描述      |
| ----- | ------- |
| \[帐户] | 返回账户实例。 |

**示例**

```javascript
> caver.account.createWithAccountKeyPublic('0x{address in hex}', '0xb5a9a...')
Account {
    _address：'0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey：AccountKeyPublic { _publicKey: ,'0xb5a9a...' }
}
```

## caver.account.createWithAccountKeyFail <a id="caver-account-createwithaccountkeyfail"></a>

```javascript
caver.account.createWithAccountKeyFail(address)
```

创建一个 AccountKeyFail 作为 AccountKey 的 Account 实例。

**参数**

| 名称 | 类型  | 描述        |
| -- | --- | --------- |
| 地址 | 字符串 | 要更新的账户地址。 |

**返回价值**

| 类型    | 描述      |
| ----- | ------- |
| \[账户] | 返回账户实例。 |

**示例**

```javascript
> caver.account.createWithAccountKeyFail('0x{address in hex}')
Account {
  _address：'0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey：AccountKeyFail {}
}
```

## caver.account.createWithAccountKeyWeightedMultiSig <a id="caver-account-createwithaccountkeyweightedmultisig"></a>

```javascript
caver.account.createWithAccountKeyWeightedMultiSig(address, publicKeyArray [, options])
```

创建账户实例，该实例的账户密钥为 AccountKeyWeightedMultiSig。

**参数**

| 名称   | 类型          | 描述                                           |
| ---- | ----------- | -------------------------------------------- |
| 地址   | 字符串         | 要更新的账户地址。                                    |
| 公钥数组 | 数组          | 包含多个公钥字符串的数组。                                |
| 选项   | \[加权多重加密选项] | (可选）定义阈值和权重数组的 [WeightedMultiSigOptions] 实例。 |

**返回价值**

| 类型    | 描述      |
| ----- | ------- |
| \[帐户] | 返回账户实例。 |

**示例**

```javascript
// create an Account instance without options
> caver.account.createWithAccountKeyWeightedMultiSig('0x{address in hex}', ['0xb5a9a...', '0xfe4b8...'])
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// create an Account instance with options
> const options = new caver.account.weightedMultiSigOptions(2, [1, 1])
> caver.account.createWithAccountKeyWeightedMultiSig('0x{address in hex}', ['0xb5a9a...', '0xfe4b8...'], options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 2,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}
```

## caver.account.createWithAccountKeyRoleBased <a id="caver-account-createwithaccountkeyrolebased"></a>

```javascript
caver.account.createWithAccountKeyRoleBased(address, roledBasedPublicKeyArray [, options])
```

创建一个 AccountKeyRoleBased 作为 AccountKey 的 Account 实例。

**参数**

| 名称   | 类型  | 描述                                           |
| ---- | --- | -------------------------------------------- |
| 地址   | 字符串 | 要更新的账户地址。                                    |
| 公钥数组 | 数组  | 二维数组，包含每个角色的公钥字符串数组。                         |
| 选项   | 数组  | (可选）包含每个角色的 [WeightedMultiSigOptions] 实例的数组。 |

**返回价值**

| 类型    | 描述      |
| ----- | ------- |
| \[账户] | 返回账户实例。 |

**示例**

```javascript
// create an Account instance without options
> const publicKeys = [
    ['0x034f1...', '0xfe4b8...'],
    ['0xb5a9a...'],
    ['0x034f1...', '0xb5a9a...']
]
> caver.account.createWithAccountKeyRoleBased('0x{address in hex}', publicKeys)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 1, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xb5a9a...' },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' }
                ]
            }
        ]
    }
}

// create an Account instance with options
> const publicKeys = [
    ['0x034f1...', '0xfe4b8...'],
    ['0xb5a9a...'],
    ['0x034f1...', '0xb5a9a...']
]
> const options = [
    new caver.account.weightedMultiSigOptions(2, [1, 1]),
    new caver.account.weightedMultiSigOptions(),
    new caver.account.weightedMultiSigOptions(3, [1, 2])
]
> caver.account.createWithAccountKeyRoleBased('0x{address in hex}', publicKeys, options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 2, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xb5a9a...' },
            AccountKeyWeightedMultiSig {
                _threshold: 3,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
                    WeightedPublicKey { _weight: 2, _publicKey: '0xb5a9a...' }
                ]
            }
        ]
    }
}
```

## caver.account.accountKey.decode <a id="caver-account-accountkey-decode"></a>

```javascript
caver.account.accountKey.decode(rlpEncodedAccountKey)
```

An object defines `keyType` and `key` inside or an instance of `AccountKey` ([AccountKeyLegacy](../caver.account.md#accountkeylegacy), [AccountKeyPublic](../caver.account.md#accountkeypublic), [AccountKeyFail](../caver.account.md#accountkeyfail)、[AccountKeyWeightedMultiSig](./caver.account.md#accountkeyweightedmultisig)或[AccountKeyRoleBased](./caver.account.md#accountkeyrolebased))。

**参数**

| 名称                   | 类型  | 描述               |
| -------------------- | --- | ---------------- |
| rlpEncodedAccountKey | 字符串 | 账户密钥的 RLP 编码字符串。 |

**返回价值**

| 类型                                                                                                                                                                                                                                      | 描述             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| [AccountKeyLegacy](#accountkeylegacy) \\| [AccountKeyPublic](#accountkeypublic) \\| [AccountKeyFail](#accountkeyfail) \\| [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) \\| [AccountKeyRoleBased](#accountkeyrolebased) | 返回 Keyring 实例。 |

**示例**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## account.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
account.getRLPEncodingAccountKey()
```

返回 AccountKey 的 RLP 编码字符串。

**返回价值**

| 类型  | 描述               |
| --- | ---------------- |
| 字符串 | 账户密钥的 RLP 编码字符串。 |

**示例**

```javascript
> const account = caver.account.create('0x{address in hWeightedMultiSigOptionsex}', '0x034f1...')
> account.getRLPEncodingAccountKey()
'0x02a102d851040f46d61a042a787cca34ad12bc43e51f01ad0b22270cfc25c15c4b4e22'
```

[AccountKey]: ../../../../../learn/accounts.md#account-key
[AccountKeyLegacy]: .../../../../.../learn/accounts.md#accountkeylegacy
[AccountKeyPublic]: .../.../.../.../learn/accounts.md#accountkeypublic
[AccountKeyFail]: ../../../../../learn/accounts.md#accountkeyfail
[AccountKeyWeightedMultiSig]: .../.../.../.../learn/accounts.md#accountkey-weightedmultisig
[AccountKeyRoleBased]: .../.../.../.../learn/accounts.md#accountkeyrolebased（基于帐户密钥
[WeightedPublicKey]: #weightedpublickey
[WeightedMultiSigOptions]: #weightedmultisigoptions
[Account]: #帐户
[role]: .../.../.../.../learn/accounts.md#roles
