# caver.account

caver.account "是一個提供與 "賬戶 "相關功能的軟件包，在更新賬戶時使用。

## 類別<a id="class"></a>

### Account <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

賬戶 "是一個包含更新 kaia 區塊鏈平臺（kaia）中賬戶的[AccountKey]所需的信息的類。 這是 `caver.account` 軟件包的默認類。 要使用公鑰字符串創建賬戶實例，請參考 [caver.account.create](#caver-account-create)。

**屬性**

| 名稱   | 類型  | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 地址   | 字符串 | 要更新的賬戶地址。                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 帳戶密鑰 | 對象  | 賬戶中要使用的新賬戶密鑰。 An object defines `keyType` and `key` inside or an instance of `AccountKey` ([AccountKeyLegacy](../caver.account.md#accountkeylegacy), [AccountKeyPublic](../caver.account.md#accountkeypublic), [AccountKeyFail](../caver.account.md#accountkeyfail)、[AccountKeyWeightedMultiSig](./caver.account.md#accountkeyweightedmultisig)或[AccountKeyRoleBased](./caver.account.md#accountkeyrolebased))。 執行交易時，存儲在 kaia 中的賬戶的 accountKey 會更改為此值。 |

### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const accountKeyLegacy = new caver.account.accountKey.accountKeyLegacy()
```

AccountKeyLegacy\` 用於更新 kaia 中具有 [AccountKeyLegacy] 的賬戶的 AccountKey。 要創建具有 "賬戶密鑰合法性 "的賬戶實例，請參考 [caver.account.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy)。

### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const accountKeyPublic = new caver.account.accountKey.accountKeyPublic(publicKey)
```

AccountKeyPublic "用於用[AccountKeyPublic]更新 kaia 中賬戶的 AccountKey。 將 AccountKey 更新為 "AccountKeyPublic"，就可以將現有的 AccountKey 變為新的公鑰，該公鑰將用於在 kaia 中驗證交易。 在將私人密鑰與賬戶地址分離時，這一更改是必要的。 詳見 [AccountUpdate](../get-started.md#account-update) 和 [AccountKey] 。

要創建帶有 "AccountKeyPublic "的賬戶實例，請參考 [caver.account.create](#caver-account-create) 或 [caver.account.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic) 。

**屬性**

| 名稱 | 類型  | 描述     |
| -- | --- | ------ |
| 公鑰 | 字符串 | 公鑰字符串。 |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const accountKeyFail = new caver.account.accountKey.accountKeyFail()
```

AccountKeyFail "用於以[AccountKeyFail]更新 kaia 中賬戶的 AccountKey。 要創建帶有 "AccountKeyFail "的賬戶實例，請參閱 [caver.account.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail)。

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const accountKeyWeightedMultiSig = new caver.account.accountKey.accountKeyWeightedMultiSig(threshold, weightedPublicKeys)
```

AccountKeyWeightedMultiSig "用於使用[AccountKeyWeightedMultiSig]更新 kaia 中賬戶的 AccountKey。 將您的 AccountKey 更新為 "AccountKeyWeightedMultiSig "後，您就可以將現有的 AccountKey 更改為新的公鑰，該公鑰將用於驗證 kaia 中的交易。 在將私人密鑰與賬戶地址分離時，這一更改是必要的。 詳見 [AccountUpdate](../get-started.md#account-update) 和 [AccountKey] 。

要使用 "AccountKeyWeightedMultiSig "創建賬戶實例，請參考 [caver.account.create](#caver-account-create) 或 [caver.account.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig) 。

**屬性**

| 名稱   | 類型 | 描述       |
| ---- | -- | -------- |
| 閾值   | 數量 | 驗證閾值。    |
| 加權公鑰 | 數組 | 加權公鑰]數組。 |

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

AccountKeyRoleBased "用於使用[AccountKeyRoleBased]更新 kaia 中賬戶的 AccountKey。 通過將 AccountKey 更新為 "基於角色的 AccountKey"，您可以更改為每個角色分配的 AccountKey，所有這些 AccountKey 都用於在 kaia 中驗證交易。 詳見 [AccountUpdate](../get-started.md#account-update) 和 [AccountKey] 。

要創建基於 "賬戶密鑰角色 "的賬戶實例，請參考 [caver.account.create](#caver-account-create) 或 [caver.account.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased) 。

**屬性**

| 名稱     | 類型 | 描述                                                                                                                                                                                                                      |
| ------ | -- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 帳戶密鑰數組 | 數組 | 定義每個 [role] 使用的 accountKey 的數組。 每個角色都可以用 [AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail) 或 [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 來定義。 |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

加權公鑰 "包含一個公鑰及其權重。 加權公鑰 "是一個包含公鑰和公鑰權重的類，在 [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 中使用。

**屬性**

| 名稱 | 類型  | 描述                                                             |
| -- | --- | -------------------------------------------------------------- |
| 權重 | 數量  | 公開密鑰的權重。 權重用於檢查公鑰的加權總和是否大於 [AccountKeyWeightedMultiSig] 對象的閾值。 |
| 公鑰 | 字符串 | 私鑰字符串。                                                         |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weightedMultiSigOptions(threshold, weights)
```

加權多重簽名選項 "包含閾值和權重。 WeightedMultiSigOptions "是一個用於定義 AccountKeyWeightedMultiSig 選項的類。

**屬性**

| 名稱 | 類型 | 描述      |
| -- | -- | ------- |
| 閥值 | 數量 | 驗證閾值。   |
| 權重 | 數組 | 鍵值權重數組。 |

## caver.account.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

生成一個帶有地址和 accountKey 的賬戶實例。

如果 accountKey 是公鑰字符串，則會創建一個以 [AccountKeyPublic](#accountkeypublic) 作為 accountKey 的賬戶實例。 如果 accountKey 是一個包含公鑰字符串的數組，則會創建一個以 [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 作為 accountKey 的賬戶實例。 如果最後一個參數沒有定義選項，則使用默認選項創建，閾值為 1，每個鍵的權重為 1。 如果 accountKey 是一個數組，其中包含用於每個角色的 accountKeys，則會創建一個具有 [AccountKeyRoleBased](#accountkeyrolebased) 的 Account 實例。 必須使用 [WeightedMultiSigOptions] 為每個角色定義選項。 如果未定義選項，則會對使用多個公鑰的角色使用默認選項。 請參考下面的示例瞭解如何使用。

**參數**

| 名稱   | 類型                                   | 描述                                                     |
| ---- | ------------------------------------ | ------------------------------------------------------ |
| 地址   | 字符串                                  | 要更新的賬戶地址。                                              |
| 帳戶密鑰 | 字符串                                  | 公鑰字符串、公鑰數組或二維數組，其中每個元素都包含用於每個角色的密鑰數組。                  |
| 選項   | [WeightedMultiSigOptions] \\| Array | (可選）AccountKeyWeigthedMultiSig 的選項。 |

**返回價值**

| 類型    | 描述      |
| ----- | ------- |
| \[賬戶] | 返回賬戶實例。 |

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

根據 RLP 編碼的 AccountKey 創建賬戶實例。

**參數**

| 名稱            | 類型  | 描述                      |
| ------------- | --- | ----------------------- |
| 地址            | 字符串 | 要更新的賬戶地址。               |
| rlpEncodedKey | 字符串 | AccountKey 的 RLP 編碼字符串。 |

**返回價值**

| 類型    | 描述      |
| ----- | ------- |
| \[賬戶] | 返回賬戶實例。 |

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

創建一個以 AccountKeyLegacy 作為 AccountKey 的賬戶實例。

**參數**

| 名稱 | 類型  | 描述        |
| -- | --- | --------- |
| 地址 | 字符串 | 要更新的賬戶地址。 |

**返回價值**

| 類型    | 描述      |
| ----- | ------- |
| \[帳戶] | 返回賬戶實例。 |

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

創建一個以 AccountKeyPublic 作為 AccountKey 的賬戶實例。

**參數**

| 名稱 | 類型  | 描述        |
| -- | --- | --------- |
| 地址 | 字符串 | 要更新的賬戶地址。 |
| 公鑰 | 字符串 | 公鑰字符串。    |

**返回價值**

| 類型    | 描述      |
| ----- | ------- |
| \[帳戶] | 返回賬戶實例。 |

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

創建一個 AccountKeyFail 作為 AccountKey 的 Account 實例。

**參數**

| 名稱 | 類型  | 描述        |
| -- | --- | --------- |
| 地址 | 字符串 | 要更新的賬戶地址。 |

**返回價值**

| 類型    | 描述      |
| ----- | ------- |
| \[賬戶] | 返回賬戶實例。 |

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

創建賬戶實例，該實例的賬戶密鑰為 AccountKeyWeightedMultiSig。

**參數**

| 名稱   | 類型          | 描述                                           |
| ---- | ----------- | -------------------------------------------- |
| 地址   | 字符串         | 要更新的賬戶地址。                                    |
| 公鑰數組 | 數組          | 包含多個公鑰字符串的數組。                                |
| 選項   | \[加權多重加密選項] | (可選）定義閾值和權重數組的 [WeightedMultiSigOptions] 實例。 |

**返回價值**

| 類型    | 描述      |
| ----- | ------- |
| \[帳戶] | 返回賬戶實例。 |

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

創建一個 AccountKeyRoleBased 作為 AccountKey 的 Account 實例。

**參數**

| 名稱   | 類型  | 描述                                           |
| ---- | --- | -------------------------------------------- |
| 地址   | 字符串 | 要更新的賬戶地址。                                    |
| 公鑰數組 | 數組  | 二維數組，包含每個角色的公鑰字符串數組。                         |
| 選項   | 數組  | (可選）包含每個角色的 [WeightedMultiSigOptions] 實例的數組。 |

**返回價值**

| 類型    | 描述      |
| ----- | ------- |
| \[賬戶] | 返回賬戶實例。 |

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

**參數**

| 名稱                   | 類型  | 描述               |
| -------------------- | --- | ---------------- |
| rlpEncodedAccountKey | 字符串 | 賬戶密鑰的 RLP 編碼字符串。 |

**返回價值**

| 類型                                                                                                                                                                                                                                      | 描述             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| [AccountKeyLegacy](#accountkeylegacy) \\| [AccountKeyPublic](#accountkeypublic) \\| [AccountKeyFail](#accountkeyfail) \\| [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) \\| [AccountKeyRoleBased](#accountkeyrolebased) | 返回 Keyring 實例。 |

**示例**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## account.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
account.getRLPEncodingAccountKey()
```

返回 AccountKey 的 RLP 編碼字符串。

**返回價值**

| 類型  | 描述               |
| --- | ---------------- |
| 字符串 | 賬戶密鑰的 RLP 編碼字符串。 |

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
[AccountKeyRoleBased]: .../.../.../.../learn/accounts.md#accountkeyrolebased（基於帳戶密鑰
[WeightedPublicKey]: #weightedpublickey
[WeightedMultiSigOptions]: #weightedmultisigoptions
[Account]: #帳戶
[role]: .../.../.../.../learn/accounts.md#roles
