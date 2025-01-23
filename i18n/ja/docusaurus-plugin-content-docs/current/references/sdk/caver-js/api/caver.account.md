# caver.account

`caver.account` はアカウントを更新する際に使用するアカウントに関する機能を提供するパッケージである。

## クラス<a id="class"></a>

### Account <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

`Account`は、kaiaブロックチェーンプラットフォーム（kaia）のアカウントの[AccountKey]を更新するために必要な情報を含むクラスです。 これは `caver.account` パッケージのデフォルトクラスである。 公開鍵文字列を持つアカウント・インスタンスを作成するには、[caver.account.create](#caver-account-create) を参照。

**プロパティ**

| 名称      | タイプ    | 説明                                                                                                                                                                                                                                                                                                                     |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 住所      | ストリング  | 更新するアカウントのアドレス。                                                                                                                                                                                                                                                                                                        |
| アカウントキー | オブジェクト | アカウントで使用する新しい accountKey。 これは、[AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail)、[AccountKeyWeightedMultiSig](#accountkeyweightedmultisig)、または[AccountKeyRoleBased](#accountkeyrolebased)のインスタンスである。 トランザクションが実行されると、kaiaに保存されているアカウントのaccountKeyがこれに変更される。 |

### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const accountKeyLegacy = new caver.account.accountKey.accountKeyLegacy()
```

`AccountKeyLegacy`は、KaiaのアカウントのAccountKeyを[AccountKeyLegacy]で更新するために使用される。 `AccountKeyLegacy`を持つAccountインスタンスを作成するには、[caver.account.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy) を参照してください。

### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const accountKeyPublic = new caver.account.accountKey.accountKeyPublic(publicKey)
```

`AccountKeyPublic`は、kaiaのアカウントのAccountKeyを[AccountKeyPublic]で更新するために使用される。 AccountKeyを`AccountKeyPublic`に更新することで、既存のAccountKeyを新しい公開鍵に変更することができます。 この変更は、秘密鍵をアカウントのアドレスから切り離すときに必要です。 詳細は[AccountUpdate](../get-started.md#account-update)および[AccountKey]を参照。

`AccountKeyPublic`を持つAccountインスタンスを作成するには、[caver.account.create](#caver-account-create)または[caver.account.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic)を参照してください。

**プロパティ**

| 名称      | タイプ   | 説明       |
| ------- | ----- | -------- |
| パブリックキー | ストリング | 公開鍵の文字列。 |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const accountKeyFail = new caver.account.accountKey.accountKeyFail()
```

`AccountKeyFail`は、[AccountKeyFail]でカイアのアカウントのAccountKeyを更新するために使用される。 `AccountKeyFail`付きのAccountインスタンスを作成するには、[caver.account.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail) を参照してください。

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const accountKeyWeightedMultiSig = new caver.account.accountKey.accountKeyWeightedMultiSig(threshold, weightedPublicKeys)
```

`AccountKeyWeightedMultiSig`は、[AccountKeyWeightedMultiSig]を使用してkaiaのアカウントのAccountKeyを更新するために使用される。 `AccountKeyWeightedMultiSig`に更新することで、既存のAccountKeyを新しい公開鍵に変更することができます。 この変更は、秘密鍵をアカウントのアドレスから切り離すときに必要です。 詳細は[AccountUpdate](../get-started.md#account-update)および[AccountKey]を参照。

`AccountKeyWeightedMultiSig`を使用してAccountインスタンスを作成するには、[caver.account.create](#caver-account-create)または[caver.account.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig)を参照してください。

**プロパティ**

| 名称                 | タイプ | 説明                      |
| ------------------ | --- | ----------------------- |
| 閾値                 | 番号  | 検証のしきい値。                |
| weightedPublicKeys | 配列  | WeightedPublicKey] の配列。 |

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

`AccountKeyRoleBased`は、[AccountKeyRoleBased]でカイアのアカウントのAccountKeyを更新するために使用される。 AccountKeyを`AccountKeyRoleBased`に更新すると、ロールごとに割り当てられたAccountKeyを変更することができます。 詳しくは[AccountUpdate](../get-started.md#account-update)および[AccountKey]を参照のこと。

`AccountKeyRoleBased`を使用してアカウントインスタンスを作成するには、[caver.account.create](#caver-account-create)または[caver.account.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased)を参照してください。

**プロパティ**

| 名称        | タイプ | 説明                                                                                                                                                                                                                         |
| --------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| アカウントキー配列 | 配列  | 各 [role] で使用する accountKey を定義する配列。 各ロールは、[AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail)、または[AccountKeyWeightedMultiSig](#accountkeyweightedmultisig)で定義できる。 |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

`WeightedPublicKey`は公開鍵とその重みを含む。 `WeightedPublicKey`は公開鍵と鍵の重みを含むクラスで、[AccountKeyWeightedMultiSig](#accountkeyweightedmultisig)で使用される。

**プロパティ**

| 名称      | タイプ   | 説明                                                                                      |
| ------- | ----- | --------------------------------------------------------------------------------------- |
| 重量      | 番号    | 公開鍵の重さ。 ウェイトは、公開鍵の重み付き合計が[AccountKeyWeightedMultiSig]オブジェクトの閾値より大きいかどうかをチェックするために使用される。 |
| パブリックキー | ストリング | 公開鍵の文字列。                                                                                |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weightedMultiSigOptions(threshold, weights)
```

`WeightedMultiSigOptions`は閾値と重みを含む。 `WeightedMultiSigOptions` は AccountKeyWeightedMultiSig のオプションを定義するクラスである。

**プロパティ**

| 名称   | タイプ | 説明        |
| ---- | --- | --------- |
| 閾値   | 番号  | 検証のしきい値。  |
| ウェイト | 配列  | キーの重みの配列。 |

## caver.account.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

アドレスと accountKey を持つ Account インスタンスを生成します。

accountKey が公開鍵文字列の場合、[AccountKeyPublic](#accountkeypublic) を accountKey とする Account インスタンスが作成される。 accountKey が公開鍵文字列を含む配列の場合、[AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) を accountKey とする Account インスタンスが生成される。 最後のパラメータとしてオプションが定義されていない場合、各キーに対して、しきい値1、重み付け1のデフォルト・オプションを使用して作成される。 accountKey が、ロールごとに使用される accountKey を含む配列である場合、[AccountKeyRoleBased](#accountkeyrolebased) を持つ Account インスタンスが作成されます。 オプションは[WeightedMultiSigOptions]でロールごとに定義されなければならない。 オプションが定義されていない場合、複数の公開鍵を使用するロールにはデフォルトのオプションが使用されます。 使い方は下記の例を参考にしてください。

**パラメーター**

| 名称      | タイプ                            | 説明                                                            |
| ------- | ------------------------------ | ------------------------------------------------------------- |
| 住所      | ストリング                          | 更新するアカウントのアドレス。                                               |
| アカウントキー | string \\                    | 公開鍵文字列、公開鍵の配列、または各要素が各役割に使用される鍵の配列を含む2次元配列。                   |
| オプション   | [WeightedMultiSigOptions] \\ | (オプション) AccountKeyWeigthedMultiSig のオプション。 |

**リターン・バリュー**

| タイプ      | 説明                 |
| -------- | ------------------ |
| \[アカウント］ | アカウントのインスタンスが返される。 |

**例**

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
caver.account.createFromRLPEncoding(アドレス、rlpEncodedKey)
```

RLP エンコードされた AccountKey から Account インスタンスを作成します。

**パラメーター**

| 名称            | タイプ   | 説明                        |
| ------------- | ----- | ------------------------- |
| 住所            | ストリング | 更新するアカウントのアドレス。           |
| rlpEncodedKey | ストリング | AccountKeyをRLPエンコードした文字列。 |

**リターン・バリュー**

| タイプ      | 説明                 |
| -------- | ------------------ |
| \[アカウント］ | アカウントのインスタンスが返される。 |

**例**

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
caver.account.createWithAccountKeyLegacy(アドレス)
```

AccountKeyLegacy を accountKey として持つ Account インスタンスを作成します。

**パラメーター**

| 名称 | タイプ   | 説明              |
| -- | ----- | --------------- |
| 住所 | ストリング | 更新するアカウントのアドレス。 |

**リターン・バリュー**

| タイプ      | 説明                 |
| -------- | ------------------ |
| \[アカウント］ | アカウントのインスタンスが返される。 |

**例**

```javascript
> caver.account.createWithAccountKeyLegacy('0x{address in hex}')
Account {
  _address：'0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey：AccountKeyLegacy {}。
}
```

## caver.account.createWithAccountKeyPublic <a id="caver-account-createwithaccountkeypublic"></a>

```javascript
caver.account.createWithAccountKeyPublic(アドレス、publicKey)
```

AccountKeyPublic を accountKey として持つ Account インスタンスを作成します。

**パラメーター**

| 名称      | タイプ   | 説明              |
| ------- | ----- | --------------- |
| 住所      | ストリング | 更新するアカウントのアドレス。 |
| パブリックキー | ストリング | 公開鍵の文字列。        |

**リターン・バリュー**

| タイプ      | 説明                 |
| -------- | ------------------ |
| \[アカウント］ | アカウントのインスタンスが返される。 |

**例**

```javascript
> caver.account.createWithAccountKeyPublic('0x{address in hex}', '0xb5a9a...')
Account {
    _address：'0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey：AccountKeyPublic { _publicKey: ,'0xb5a9a...' }
}.
```

## caver.account.createWithAccountKeyFail <a id="caver-account-createwithaccountkeyfail"></a>

```javascript
caver.account.createWithAccountKeyFail(アドレス)
```

AccountKeyFail を AccountKey として持つ Account インスタンスを作成します。

**パラメーター**

| 名称 | タイプ   | 説明              |
| -- | ----- | --------------- |
| 住所 | ストリング | 更新するアカウントのアドレス。 |

**リターン・バリュー**

| タイプ      | 説明                 |
| -------- | ------------------ |
| \[アカウント］ | アカウントのインスタンスが返される。 |

**例**

```javascript
> caver.account.createWithAccountKeyFail('0x{address in hex}')
Account {
  _address：'0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey：AccountKeyFail {}。
}
```

## caver.account.createWithAccountKeyWeightedMultiSig <a id="caver-account-createwithaccountkeyweightedmultisig"></a>

```javascript
caver.account.createWithAccountKeyWeightedMultiSig(address, publicKeyArray [, options])
```

AccountKeyWeightedMultiSig を accountKey とする Account インスタンスを作成します。

**パラメーター**

| 名称        | タイプ                                        | 説明                                                        |
| --------- | ------------------------------------------ | --------------------------------------------------------- |
| 住所        | ストリング                                      | 更新するアカウントのアドレス。                                           |
| パブリックキー配列 | 配列                                         | 複数の公開鍵文字列を含む配列。                                           |
| オプション     | [WeightedMultiSigOptions] (重み付きマルチシグオプション) | (オプション) しきい値と重みの配列を定義する [WeightedMultiSigOptions] インスタンス。 |

**リターン・バリュー**

| タイプ      | 説明                 |
| -------- | ------------------ |
| \[アカウント］ | アカウントのインスタンスが返される。 |

**例**

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

AccountKeyRoleBased を accountKey とする Account インスタンスを作成します。

**パラメーター**

| 名称                       | タイプ   | 説明                                                   |
| ------------------------ | ----- | ---------------------------------------------------- |
| 住所                       | ストリング | 更新するアカウントのアドレス。                                      |
| roledBasedPublicKeyArray | 配列    | 各ロールの公開鍵文字列の配列を含む二次元配列。                              |
| オプション                    | 配列    | (オプション) 各ロールの [WeightedMultiSigOptions] インスタンスを含む配列。 |

**リターン・バリュー**

| タイプ      | 説明                 |
| -------- | ------------------ |
| \[アカウント］ | アカウントのインスタンスが返される。 |

**例**

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

AccountKey の RLP エンコード文字列をデコードし、[AccountKeyLegacy](#accountkeylegacy)、[AccountKeyPublic](#accountkeypublic)、[AccountKeyFail](#accountkeyfail)、[AccountKeyWeightedMultiSig](#accountkeyweightedmultisig)、または [AccountKeyRoleBased](#accountkeyrolebased) インスタンスを返す。

**パラメーター**

| 名称                   | タイプ   | 説明                        |
| -------------------- | ----- | ------------------------- |
| rlpEncodedAccountKey | ストリング | AccountKeyをRLPエンコードした文字列。 |

**リターン・バリュー**

| タイプ                                                            | 説明                      |
| -------------------------------------------------------------- | ----------------------- |
| [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) \\ | AccountKey インスタンスが返される。 |

**例**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## account.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
account.getRLPEncodingAccountKey()
```

AccountKey を RLP エンコードした文字列を返します。

**リターン・バリュー**

| タイプ   | 説明                           |
| ----- | ---------------------------- |
| ストリング | AccountKey を RLP エンコードした文字列。 |

**例**

```javascript
> const account = caver.account.create('0x{address in hWeightedMultiSigOptionsex}', '0x034f1...')
> account.getRLPEncodingAccountKey()
'0x02a102d851040f46d61a042a787cca34ad12bc43e51f01ad0b22270cfc25c15c4b4e22'
```

[AccountKey]: ../../../../learn/accounts.md#account-key
[AccountKeyLegacy]: .../.../.../.../学習/アカウント.md#accountkeylegacy
[AccountKeyPublic]: ../../../../learn/accounts.md#accountkeypublic
[AccountKeyFail]: ../../../../learn/accounts.md#accountkeyfail
[AccountKeyWeightedMultiSig]: ../../../../learn/accounts.md#accountkeyweightedmultisig
[AccountKeyRoleBased]: ../../../../learn/accounts.md#accountkeyrolebased
[WeightedPublicKey]: #重み付きパブリックキー
[WeightedMultiSigOptions]: #加重マルチシグオプション
[Account]: #アカウント
[role]: ../../../../learn/accounts.md#roles
