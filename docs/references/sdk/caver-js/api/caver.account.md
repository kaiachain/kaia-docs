# caver.account

`caver.account` is a package that provides functionality related to Account that is used when updating an account.

## Class <a id="class"></a>

### Account <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

`Account` is a class that contains information needed to update the [AccountKey] of the account in the Klaytn blockchain platform (Klaytn). This is the default class for the `caver.account` package. To create an Account instance with public key string(s), please refer to [caver.account.create](#caver-account-create).

**properties**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of account to be updated. |
| accountKey | object | The new accountKey to be used in account. This can be an instance of [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) or [AccountKeyRoleBased](#accountkeyrolebased). When the transaction is executed, the accountKey of the account stored in the Klaytn is changed to this. |


### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const accountKeyLegacy = new caver.account.accountKey.accountKeyLegacy()
```

`AccountKeyLegacy` is used to update the AccountKey of an account in the Klaytn with [AccountKeyLegacy]. To create an Account instance with `AccountKeyLegacy`, please refer to [caver.account.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy).


### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const accountKeyPublic = new caver.account.accountKey.accountKeyPublic(publicKey)
```

`AccountKeyPublic` is used to update the AccountKey of an account in the Klaytn with [AccountKeyPublic]. By updating AccountKey to `AccountKeyPublic`, you can change your existing AccountKey into the new public key, which will be used to validate a transaction in Klaytn. This change is necessary when you decouple your private key from the address of your account. See [AccountUpdate](../get-started.md#account-update) and [AccountKey] for details.

To create an Account instance with `AccountKeyPublic`, please refer to [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic).

**properties**

| Name | Type | Description |
| --- | --- | --- |
| publicKey | string | The public key string. |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const accountKeyFail = new caver.account.accountKey.accountKeyFail()
```

`AccountKeyFail` is used to update AccountKey of an account in the Klaytn with [AccountKeyFail]. To create an Account instance with `AccountKeyFail`, please refer to [caver.account.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail).

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const accountKeyWeightedMultiSig = new caver.account.accountKey.accountKeyWeightedMultiSig(threshold, weightedPublicKeys)
```

`AccountKeyWeightedMultiSig` is used to update AccountKey of an account in the Klaytn with [AccountKeyWeightedMultiSig]. By updating your AccountKey to `AccountKeyWeightedMultiSig`, you can change your existing AccountKey into the new public key, which will be used to validate a transaction in Klaytn. This change is necessary when you decouple your private key from the address of your account. See [AccountUpdate](../get-started.md#account-update) and [AccountKey] for details.

To create an Account instance with `AccountKeyWeightedMultiSig`, please refer to [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig).

**properties**

| Name | Type | Description |
| --- | --- | --- |
| threshold | number | The validation threshold. |
| weightedPublicKeys | Array | The array of [WeightedPublicKey]. |

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

`AccountKeyRoleBased` is used to update AccountKey of an account in the Klaytn with [AccountKeyRoleBased]. By updating your AccountKey to `AccountKeyRoleBased`, you can change the AccountKey(s) assigned for each role, all of which are used to validate a transaction in Klaytn. See [AccountUpdate](../get-started.md#account-update) and [AccountKey] for more details.

To create an Account instance with `AccountKeyRoleBased`, please refer to [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased).

**properties**

| Name | Type | Description |
| --- | --- | --- |
| accountKeyArray | Array | The array defining accountKey to be used for each [role]. Each role can be defined with [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), or [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig). |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

`WeightedPublicKey` contains a public key and its weight. `WeightedPublicKey` is a class that contains the public key and the weight of the key, and it is used in [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig).

**properties**

| Name | Type | Description |
| --- | --- | --- |
| weight | number | The weight of public key. The weight is used to check whether the weighted sum of public keys is larger than the threshold of the [AccountKeyWeightedMultiSig] object. |
| publicKey | string | The public key string. |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weightedMultiSigOptions(threshold, weights)
```

`WeightedMultiSigOptions` contains a threshold and weights. `WeightedMultiSigOptions` is a class for defining the options of AccountKeyWeightedMultiSig.

**properties**

| Name | Type | Description |
| --- | --- | --- |
| threshold | number | The validation threshold. |
| weights | Array | An array of weights of keys. |


## caver.account.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

Generates an Account instance with an address and an accountKey. 

If accountKey is a public key string, an Account instance with [AccountKeyPublic](#accountkeypublic) as accountKey is created. If accountKey is an array containing public key strings, an Account instance with [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) as accountKey is created. If options are not defined as the last parameter, it is created using a default option with a threshold of 1 and a weight of 1 for each key. If accountKey is an array containing accountKeys that are used for each role, an Account instance with [AccountKeyRoleBased](#accountkeyrolebased) is created. Options must be defined for each role with [WeightedMultiSigOptions]. If options are not defined, the default option is used for roles that use multiple public keys. Please refer to the example below for how to use it.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of account to be updated. |
| accountKey | string \| Array | A public key string, an array of public keys, or a 2D array of which each element contains an array of key(s) to be used for each role. |
| options | [WeightedMultiSigOptions] \| Array | (optional) Options for AccountKeyWeigthedMultiSig. |


**Return Value**

| Type | Description |
| --- | --- |
| [Account] | The account instance is returned. |

**Example**

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

Creates an Account instance from RLP-encoded AccountKey.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of an account to be updated. |
| rlpEncodedKey | string | The RLP-encoded string of AccountKey. |


**Return Value**

| Type | Description |
| --- | --- |
| [Account] | The account instance is returned. |

**Example**

```javascript
> caver.account.createFromRLPEncoding('0x{address in hex}', '0x04f84b02f848e301a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9e301a1021769a9196f523c419be50c26419ebbec34d3d6aa8b59da834212f13dbec9a9c1')
Account {
    _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey: 
        AccountKeyWeightedMultiSig { 
            _threshold: 2, 
            _weightedPublicKeys: [ 
                WeightedPublicKey { _weight: 1, _publicKey: '0x02c10...' },
                WeightedPublicKey { _weight: 1, _publicKey: '0x02176...' }
            ]
        }
}
```

## caver.account.createWithAccountKeyLegacy <a id="caver-account-createwithaccountkeylegacy"></a>

```javascript
caver.account.createWithAccountKeyLegacy(address)
```

Creates an Account instance which has AccountKeyLegacy as an accountKey.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of an account to be updated. |


**Return Value**

| Type | Description |
| --- | --- |
| [Account] | The account instance is returned. |

**Example**

```javascript
> caver.account.createWithAccountKeyLegacy('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey: AccountKeyLegacy {}
}
```

## caver.account.createWithAccountKeyPublic <a id="caver-account-createwithaccountkeypublic"></a>

```javascript
caver.account.createWithAccountKeyPublic(address, publicKey)
```

Creates an Account instance which has AccountKeyPublic as an accountKey.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of an account to be updated. |
| publicKey | string | The public key string. |


**Return Value**

| Type | Description |
| --- | --- |
| [Account] | The account instance is returned. |

**Example**

```javascript
> caver.account.createWithAccountKeyPublic('0x{address in hex}', '0xb5a9a...')
Account {
    _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey: AccountKeyPublic { _publicKey: ,'0xb5a9a...' }
}
```

## caver.account.createWithAccountKeyFail <a id="caver-account-createwithaccountkeyfail"></a>

```javascript
caver.account.createWithAccountKeyFail(address)
```

Creates an Account instance which has AccountKeyFail as an accountKey.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of an account to be updated. |


**Return Value**

| Type | Description |
| --- | --- |
| [Account] | The account instance is returned. |

**Example**

```javascript
> caver.account.createWithAccountKeyFail('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey: AccountKeyFail {}
}
```

## caver.account.createWithAccountKeyWeightedMultiSig <a id="caver-account-createwithaccountkeyweightedmultisig"></a>

```javascript
caver.account.createWithAccountKeyWeightedMultiSig(address, publicKeyArray [, options])
```

Creates an Account instance which has AccountKeyWeightedMultiSig as an accountKey.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of an account to be updated. |
| publicKeyArray | Array | The array that includes multiple public key strings. |
| options | [WeightedMultiSigOptions] | (optional) The [WeightedMultiSigOptions] instance that defines threshold and weight array. |


**Return Value**

| Type | Description |
| --- | --- |
| [Account] | The account instance is returned. |

**Example**

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

Creates an Account instance which has AccountKeyRoleBased as an accountKey.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of an account to be updated. |
| roledBasedPublicKeyArray | Array | A two-dimensional array containing arrays of public key strings for each role. |
| options | Array | (optional) An array that contains [WeightedMultiSigOptions] instances for each role. |


**Return Value**

| Type | Description |
| --- | --- |
| [Account] | The account instance is returned. |

**Example**

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

Decodes an RLP-encoded string of AccountKey and returns an [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) or [AccountKeyRoleBased](#accountkeyrolebased) instance.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| rlpEncodedAccountKey | string | An RLP-encoded string of AccountKey. |


**Return Value**

| Type | Description |
| --- | --- |
| [AccountKeyLegacy](#accountkeylegacy) \| [AccountKeyPublic](#accountkeypublic) \| [AccountKeyFail](#accountkeyfail) \| [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) \| [AccountKeyRoleBased](#accountkeyrolebased) | The AccountKey instance is returned. |

**Example**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## account.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
account.getRLPEncodingAccountKey()
```

Return RLP-encoded string of AccountKey.


**Return Value**

| Type | Description |
| --- | --- |
| string | A RLP-encoded string of AccountKey . |

**Example**

```javascript
> const account = caver.account.create('0x{address in hWeightedMultiSigOptionsex}', '0x034f1...')
> account.getRLPEncodingAccountKey()
'0x02a102d851040f46d61a042a787cca34ad12bc43e51f01ad0b22270cfc25c15c4b4e22'
```

[AccountKey]: ../../../../learn/accounts.md#account-key
[AccountKeyLegacy]: ../../../../learn/accounts.md#accountkeylegacy
[AccountKeyPublic]: ../../../../learn/accounts.md#accountkeypublic
[AccountKeyFail]: ../../../../learn/accounts.md#accountkeyfail
[AccountKeyWeightedMultiSig]: ../../../../learn/accounts.md#accountkeyweightedmultisig
[AccountKeyRoleBased]: ../../../../learn/accounts.md#accountkeyrolebased
[WeightedPublicKey]: #weightedpublickey
[WeightedMultiSigOptions]: #weightedmultisigoptions
[Account]: #account
[role]: ../../../../learn/accounts.md#roles
