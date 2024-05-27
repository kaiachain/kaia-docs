---
description: >-
  caver-js APIs related to managing accounts.

---

# caver.klay.accounts

`caver.klay.accounts` contains functions to generate Kaia accounts and sign transactions and data.


## create <a id="create"></a>

```javascript
caver.klay.accounts.create([entropy])
```
Generates an account object with private key and public key.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| entropy | String | (optional) A random string to increase entropy. If none is given, a random string will be generated using [randomHex](./caver.utils_1.4.1.md#randomhex). |


**Return Value**

``Object`` - The account object with the following structure:

| Name | Type | Description |
| --- | --- | --- |
| address | String | The account address. |
| privateKey | String | The accounts private key. This should never be shared or stored unencrypted in local storage! Also make sure to null the memory after usage. |
| signTransaction(tx [, callback]) | Function | The function to sign transactions. See [caver.klay.accounts.signTransaction](#signtransaction). |
| sign(data) | Function | The function to sign transactions. See [caver.klay.accounts.sign](#sign). |
| encrypt | Function | The function to encrypt private key with given password. |

**Example**

```javascript
> caver.klay.accounts.create();
{
    address: '0x79FF91738661760AC67b3E951c0B4f1F70F80478',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}

> caver.klay.accounts.create('entropy');
{
    address: '0x205fffB1025F4af604fEB1d3a22b46C0D2326585',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}

> caver.klay.accounts.create(caver.utils.randomHex(32));
{ 
    address: '0x62Ca8964610A9D447E1a64753a09fC8b3D40b405',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}
```

## createWithAccountKey <a id="createwithaccountkey"></a>

```javascript
caver.klay.accounts.createWithAccountKey(address, accountKey)
```
Creates an instance of Account with the given AccountKey. Account is for managing an account's address and AccountKey. 

**NOTE** This is merely a data structure used in caver-js. This method does not create or update an account in the Kaia network.
**NOTE** `caver.klay.accounts.createWithAccountKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | Address of an Account. |
| accountKey | String \| Array \| Object | An AccountKey instance (`AccountKeyPublic`, `AccountKeyMultiSig` or `AccountKeyRoleBased`) or a data structure that contains the key info (a private key string, an array of private key strings or an object that defines the key for each role). |


**Return Value**

`Object` - An Account instance is returned, with the following properties:

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account. |
| privateKey | String | Default key string of accountKey that the account has. This property is left for backward compatibility. privateKey only represents the default key of accountKey, so using privateKey to sign or send a transaction is not recommended. It is recommended to use transactionKey, updateKey, or feePayerKey in context. |
| accountKeyType | String | Type of accountKey the account has. This can be `AccountKeyPublic`, `AccountKeyMultiSig`, or `AccountKeyRoleBased` |
| accountKey | Object | The key of the account. This is AccountKeyPublic, AccountKeyMultiSig or AccountKeyRoleBased. |
| keys | String \| Array \| Object | All keys inside accountKey that the Account has. For AccountKeyPublic, this is a single private key string; for AccountKeyMultiSig, this returns an array containing all the private key strings. In the case of AccountKeyRoleBased, an object with keys associated with each role is returned. |
| transactionKey | String \| Array | Key used for the [RoleTransaction](../../../../learn/accounts.md#roles). AccountKeyPublic or AccountKeyMultiSig are not bound to any roles, so transactionKey holds the same value as keys. |
| updateKey | String \| Array | Key used for the [RoleAccountUpdate](../../../../learn/accounts.md#roles). AccountKeyPublic or AccountKeyMultiSig are not bound to any roles, so updateKey holds the same value as keys. |
| feePayerKey | String \| Array | Key used for [RoleFeePayer](../../../../learn/accounts.md#roles). AccountKeyPublic or AccountKeyMultiSig are not bound to any roles, so feePayerKey holds the same value as keys. |
| signTransaction(tx [, callback]) | Function | The function to sign transactions. See [caver.klay.accounts.signTransaction](#signtransaction). |
| sign(data) | Function | The function to sign transactions. See [caver.klay.accounts.sign](#sign). |
| encrypt | Function | The function to encrypt an Account with given password. |
| getKaiaWalletKey | Function | The function to get [Kaia Wallet Key](../../../../learn/accounts.md#klaytn-wallet-key-format). |

**Example**

```javascript
// Create an Account with AccountKeyPublic
> caver.klay.accounts.createWithAccountKey('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', '0x{private key}')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}

// Create an Account with AccountKeyMultiSig
> caver.klay.accounts.createWithAccountKey('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', ['0x{private key}', '0x{private key}'])
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}

// Create an Account with AccountKeyRoleBased
> caver.klay.accounts.createWithAccountKey('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', {
    transactionKey: ['0x{private key}', '0x{private key}'], '0x{private key}',
    updateKey: ['0x{private key}', '0x{private key}', '0x{private key}'],
    feePayerKey: ['0x{private key}', '0x{private key}', '0x{private key}']
})
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}
```

## createWithAccountKeyPublic <a id="createwithaccountkeypublic"></a>

```javascript
caver.klay.accounts.createWithAccountKeyPublic(address, accountKey)
```
Creates an instance of Account with AccountKeyPublic.

**NOTE** `caver.klay.accounts.createWithAccountKeyPublic` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | Address of an Account. |
| accountKey | String \| Object | An AccountKeyPublic instance or a private key string.  |


**Return Value**

`Object` - An Account instance, see [caver.klay.accounts.createWithAccountKey](#createwithaccountkey).

**Example**

```javascript
> caver.klay.accounts.createWithAccountKeyPublic('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', '0x{private key}')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}
```

## createWithAccountKeyMultiSig <a id="createwithaccountkeymultisig"></a>

```javascript
caver.klay.accounts.createWithAccountKeyMultiSig(address, accountKey)
```
Creates an instance of Account with AccountKeyMultiSig.

**NOTE** `caver.klay.accounts.createWithAccountKeyMultiSig` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | Address of an Account. |
| accountKey | String \| Object | An AccountKeyMultiSig instance or an array of private key strings.  |


**Return Value**

`Object` - An Account instance, see [caver.klay.accounts.createWithAccountKey](#createwithaccountkey).

**Example**

```javascript
> caver.klay.accounts.createWithAccountKeyMultiSig('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', ['0x{private key}', '0x{private key}'])
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}
```

## createWithAccountKeyRoleBased <a id="createwithaccountkeyrolebased"></a>

```javascript
caver.klay.accounts.createWithAccountKeyRoleBased(address, accountKey)
```
Creates an instance of Account with AccountKeyRoleBased.

**NOTE** `caver.klay.accounts.createWithAccountKeyRoleBased` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | Address of an Account. |
| accountKey | String \| Object | An AccountKeyRoleBased instance or an object that defines the key for each role. |


**Return Value**

`Object` - An Account instance, see [caver.klay.accounts.createWithAccountKey](#createwithaccountkey).

**Example**

```javascript
> caver.klay.accounts.createWithAccountKeyRoleBased('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', {
    transactionKey: ['0x{private key}', '0x{private key}', '0x{private key}'],
    updateKey: ['0x{private key}', '0x{private key}', '0x{private key}'],
    feePayerKey: ['0x{private key}', '0x{private key}', '0x{private key}']
})
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}
```

## createAccountKey <a id="createaccountkey"></a>

```javascript
caver.klay.accounts.createAccountKey(key)
```
Creates an instance of `AccountKeyPublic`, `AccountKeyMultiSig`, or `AccountKeyRoleBased` depending on the type of parameter. 

AccountKey is a data structure for managing keys in caver-js. Use AccountKeyPublic if you want to use a single private key, AccountKeyMultiSig if you want to use multiple private keys, or AccountKeyRoleBased if you want to use a different key for each role.

**NOTE** `caver.klay.accounts.createAccountKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| key | String \| Array \| Object | Key for generating AccountKey. If `key` is a single private key string, an AccountKeyPublic instance is created. If `key` is an array containing multiple private key strings, an AccountKeyMultiSig instance is created. If `key` is an object defining a key (a private key string or an array of private key strings) for each role, an AccountKeyRoleBased instance is created. AccountKeyRoleBased instance can have AccountKeyPublic or AccountKeyMultiSig for each role. |


**Return Value**

`Object` - An AccountKeyPublic, AccountKeyMultiSig or AccountKeyRoleBased instance is returned with the following properties:

| Name | Type | Description |
| --- | --- | --- |
| type | String | The type of AccountKey instance. |
| defaultKey | String | Default private key of AccountKey. The default private key represents a single private key string defined for AccountKeyPublic, and a private key string in the zeroth index of the array if AccountKeyMultiSig. For AccountKeyRoleBased, it represents the defaultKey of the first found AccountKey, where the AccountKey is searched in the following order: transactionkey, updateKey, feePayerKey.  |
| keys | String \| Array \| Object | All private keys defined inside the AccountKey instance. For AccountKeyPublic, this is a single private key string; for AccountKeyMultiSig, this returns an array containing all the private key strings. In the case of AccountKeyRoleBased, an object with keys associated with each role is returned. |
| transactionKey | String \| Array | Key used for the [RoleTransaction](../../../../learn/accounts.md#roles). AccountKeyPublic or AccountKeyMultiSig are not bound to any roles, so transactionKey holds the same value as keys. |
| updateKey | String \| Array | Key used for the [RoleAccountUpdate](../../../../learn/accounts.md#roles). AccountKeyPublic or AccountKeyMultiSig are not bound to any roles, so updateKey holds the same value as keys. |
| feePayerKey | String \| Array | Key used for [RoleFeePayer](../../../../learn/accounts.md#roles). AccountKeyPublic or AccountKeyMultiSig are not bound to any roles, so feePayerKey holds the same value as keys. |

**Example**

```javascript
// Create an AccountKeyPublic
> caver.klay.accounts.createAccountKey('0x{private key}')
AccountKeyPublic {
    _key: '0x{private key}'
}

// Create an AccountKeyMultiSig
> caver.klay.accounts.createAccountKey(['0x{private key}', '0x{private key}'])
AccountKeyMultiSig {
    _keys: [ 
      '0x{private key}',
      '0x{private key}'
    ]
}

// Create an AccountKeyRoleBased
> caver.klay.accounts.createAccountKey({
    transactionKey: '0x{private key}',
    updateKey: ['0x{private key}', '0x{private key}'],
    feePayerKey: '0x{private key}'
})
AccountKeyRoleBased {
    _transactionKey:
        AccountKeyPublic {
            _key: '0x{private key}'
        },
    _updateKey:
        AccountKeyMultiSig {
            _keys: [
                '0x{private key}',
                '0x{private key}'
            ] 
        },
    _feePayerKey:
        AccountKeyPublic {
            _key: '0x{private key}' 
        }
}
```

## createAccountKeyPublic <a id="createaccountkeypublic"></a>

```javascript
caver.klay.accounts.createAccountKeyPublic(key)
```
Creates an instance of `AccountKeyPublic` with the given private key string.

**NOTE** `caver.klay.accounts.createAccountKeyPublic` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| key | String | A string of private key for generating AccountKeyPublic. |


**Return Value**

`Object` - An AccountKeyPublic instance, see [caver.klay.accounts.createAccountKey](#createaccountkey).


**Example**

```javascript
> caver.klay.accounts.createAccountKeyPublic('0x{private key}')
AccountKeyPublic {
    _key: '0x{private key}'
}
```

## createAccountKeyMultiSig <a id="createaccountkeymultisig"></a>

```javascript
caver.klay.accounts.createAccountKeyMultiSig(keys)
```
Creates an instance of `AccountKeyMultiSig` with the given multiple private keys.

**NOTE** `caver.klay.accounts.createAccountKeyMultiSig` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| keys | Array | An array of private key strings for generating AccountKeyMultiSig. |


**Return Value**

`Object` - An AccountKeyMultiSig instance, see [caver.klay.accounts.createAccountKey](#createaccountkey).


**Example**

```javascript
> caver.klay.accounts.createAccountKeyMultiSig(['0x{private key}', '0x{private key}'])
AccountKeyMultiSig {
    _keys: [ 
      '0x{private key}',
      '0x{private key}'
    ]
}
```

## createAccountKeyRoleBased <a id="createaccountkeyrolebased"></a>

```javascript
caver.klay.accounts.createAccountKeyRoleBased(keyObject)
```
Creates an instance of `AccountKeyRoleBased` with the given keys associated with each role.

**NOTE** `caver.klay.accounts.createAccountKeyRoleBased` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| keyObject | Object | An object with role-key pairs. A key for each role can be a private key string or an array of private key strings. |


**Return Value**

`Object` - An AccountKeyRoleBased instance, see [caver.klay.accounts.createAccountKey](#createaccountkey).


**Example**

```javascript
> caver.klay.accounts.createAccountKeyRoleBased({
    transactionKey: '0x{private key}',
    updateKey: ['0x{private key}', '0x{private key}'],
    feePayerKey: '0x{private key}'
})
AccountKeyRoleBased {
    _transactionKey:
        AccountKeyPublic {
            _key: '0x{private key}'
        },
    _updateKey:
        AccountKeyMultiSig {
            _keys: [
                '0x{private key}',
                '0x{private key}'
            ] 
        },
    _feePayerKey:
        AccountKeyPublic {
            _key: '0x{private key}' 
        }
}
```

## accountKeyToPublicKey <a id="accountkeytopublickey"></a>

```javascript
caver.klay.accounts.accountKeyToPublicKey(accountKey)
```
This function converts the private key of AccountKey to public key.

**NOTE** `caver.klay.accounts.accountKeyToPublicKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| accountKey | String \| Array \| Object | An AccountKey instance (`AccountKeyPublic`, `AccountKeyMultiSig` or `AccountKeyRoleBased`) or a data structure that contains the key info (a private key string, an array of private key strings or an object that defines the key for each role). |

**Return Value**

| Type | Description |
| --- | --- |
| String \| Array \| Object | If the parameter is an AccountKeyPublic instance or a private key string, a public key string is returned. If the parameter is an AccountKeyMultiSig instance or an array of private key strings, an array of public-key strings is returned. If the parameter is an AccountKeyRoleBased instance or an object defining a key (a private key string or an array of private key strings) for each role, an object with role and public-key (a public-key string or an array of public-key strings) pairs is returned. |


**Example**

```javascript
// Convert a private key string
> caver.klay.accounts.accountKeyToPublicKey('0x{private key}')
'0x67f20d1198abcdc036a4d8f3ea0cf837527716c90f71d0b0410dfe3e1b405eded9ea818eedd5e8ad79658b2cdf4862ab0956a6f7fd0a4886afe6110b2e9803a4'

// Convert an array of private key strings
> caver.klay.accounts.accountKeyToPublicKey(['0x{private key}', '0x{private key}'])
[
    '0x67f20d1198abcdc036a4d8f3ea0cf837527716c90f71d0b0410dfe3e1b405eded9ea818eedd5e8ad79658b2cdf4862ab0956a6f7fd0a4886afe6110b2e9803a4',
    '0x7c5415f99628618b3fe78e14606c83a22488769b3361e3758c7c98a204a23b615cf07af65490895d70a7b7e7e885fc2f597d65ea69ed586c7ae7cb0241656036'
]

// Convert a role-based key
> caver.klay.accounts.accountKeyToPublicKey({transactionKey: ['0x{private key}', '0x{private key}'], updateKey: '0x{private key}', feePayerKey: ['0x{private key}', '0x{private key}']})
{ 
    transactionKey: [
        '0x67f20d1198abcdc036a4d8f3ea0cf837527716c90f71d0b0410dfe3e1b405eded9ea818eedd5e8ad79658b2cdf4862ab0956a6f7fd0a4886afe6110b2e9803a4',
        '0x7c5415f99628618b3fe78e14606c83a22488769b3361e3758c7c98a204a23b615cf07af65490895d70a7b7e7e885fc2f597d65ea69ed586c7ae7cb0241656036'
    ],
    updateKey: '0x21aa42e0232e6c7607a0028bcbd690400b92574c44b17af8b036f3f4f01b0586f90578976a040debf6aecef4a5d00b5315b8c82e999ed8e5fbacd5fcbee82080',
    feePayerKey: [
        '0xb82bb74e902b1fa3594c7cc8bd33a727eb1c85a9bfc991327a0215fc413eafe0b3723cc7f3c6e79981b409e82b8bf7033fed2d2878c26502bea64f84d592b167',
        '0x39acd887f32ccecd1b13c890854d2dfd0016f0be477155d81a848e971ff59412b0e4c0b5bfc1fd548b971f98cd9ef19367309d0475033fda3c8028ba9df27734'
    ]
}
```

## privateKeyToAccount <a id="privatekeytoaccount"></a>

```javascript
caver.klay.accounts.privateKeyToAccount(privateKey)
```
Creates an account object from a private key.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| privateKey | string | The private key to convert. |


**Return Value**

``Object`` - The account object

**Example**

```javascript
> caver.klay.accounts.privateKeyToAccount('0x{private key}');
{ 
    address: '0x62ca8964610a9d447e1a64753a09fc8b3d40b405',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey] 
}
```

## privateKeyToPublicKey <a id="privatekeytopublickey"></a>

```javascript
caver.klay.accounts.privateKeyToPublicKey(privateKey)
```
Gets public key from a given private key

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| privateKey | string | The private key to convert. |


**Return Value**

``String`` - The public key (64 bytes)

**Example**

```javascript
> caver.klay.accounts.privateKeyToPublicKey('0x{private key}')
'0xbb1846722a4c27e71196e1a44611ee7174276a6c51c4830fb810cac64b0725f217cb8783625a809d1303adeeec2cf036ab74098a77a6b7f1003486e173b29aa7'
```

## createAccountForUpdate <a id="createaccountforupdate"></a>

```javascript
caver.klay.accounts.createAccountForUpdate(address, accountKey, options)
```
Creates an instance of `AccountForUpdate`. AccountForUpdate contains the address of the account and the new public key to update. 

`AccountForUpdate` can be used in the account update transaction object (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE`, or `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) as a `key`. If you want to know how to use `AccountForUpdate` in the transaction, see [Account update with AccountForUpdate](../get-started-1.4.1.md#account-update-with-accountforupdate).

The accountKey parameter of caver.klay.accounts.createAccountForUpdate must be a private key. 

You can create an AccountForUpdate instance using the public key with [caver.klay.accounts.createAccountForUpdateWithPublicKey](#createaccountforupdatewithpublickey). 

You can also use [caver.klay.accounts.createAccountForUpdateWithLegacyKey](#createaccountforupdatewithlegacykey) to create an AccountForUpdate instance for updating to [AccountKeyLegacy](../../../../learn/accounts.md#accountkeylegacy), and [caver.klay.accounts.createAccountForUpdateWithFailKey](#createaccountforupdatewithfailkey) to create an AccountForUpdate instance for updating to [AccountKeyFail](../../../../learn/accounts.md#accountkeyfail).

**NOTE** `caver.klay.accounts.createAccountForUpdate` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | Address of an Account. |
| accountKey | String \| Array \| Object | AccountKey instance (`AccountKeyPublic`, `AccountKeyMultiSig` or `AccountKeyRoleBased`) or the equivalent key info (a private key string, an array of private key strings or an object defining key(s) with role(s)). If accountKey is not an AccountKey instance, this method internally calls [caver.klay.accounts.createAccountKey](#createaccountkey) to create an AccountKey instance from the given key info. |
| options |  Object | An optional object containing the threshold and weight. This is required when using AccountKeyMultiSig. The usage is shown in the example below. |

**Return Value**

`Object` - An AccountForUpdate instance is returned, with the following properties:

| Name | Type | Description |
| --- | --- | --- |
| address | String | Address of the account to be updated. |
| keyForUpdate | Object | An object containing the new public key derived from the given accountKey. |


**Example**

```javascript
// Create AccountForUpdate for AccountKeyPublic
> caver.klay.accounts.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', '0x{private key}')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        publicKey: '0x24c32ee4f908ceed89e7501de2980fcb1d2add69080d3921f86c49de863eb2d507e24d9aaf91328b7f7cef2a94b538cb33b3f8cdd64925855ce0a4bf6e11f3db'
    }
}

// Create AccountForUpdate for AccountKeyMultiSig with an options object
> caver.klay.accounts.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', ['0x{private key}', '0x{private key}'], { threshold: 2, weight: [1,1] })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: {
        multisig: {
            threshold: 2,
            keys: [
                {
                    weight: 1, 
                    publicKey: '0xc89f551ce9c569cf978f4f64833e447f177a83eda4f1883d770360ab35002dbdeb2d502cd33217238add013ea1c4ff5055ceda46473569824e336d0d64e9eeb2'
                },
                {
                    weight: 1, 
                    publicKey: '0xab0837fa3d61cf33dc4f3af4aca692d8c939566e1abbca0036fa3b29cd55b38a387f73baf59510d96680062bd129dd2bb8dcbb5ea5ed16c881f83a3251f73600'
                }
            ]
        }
    }
}

// Create AccountForUpdate for AccountKeyRoleBased with an options object
> caver.klay.accounts.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', { transactionKey: '0x{private key}', updateKey: ['0x{private key}', '0x{private key}'], feePayerKey: '0x{private key}' }, { updateKey: { threshold: 2, weight: [1,1] } })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        roleTransactionKey: { 
            publicKey: '0x2b4a1d4ca1ee828f17e8c4c0ac0c0c46cf08f4b27fafc01e4b3481a4fe0891cacf315ed10b1df85bfd6797ea6c5ebafac437a7564eff355b11ad1e3d6e6c43a7'
        },
        roleAccountUpdateKey: { 
            multisig: { 
                threshold: 2,
                keys: [
                    { 
                        weight: 1,
                        publicKey: '0x26156615c8e503d96cd332a2fba6aab88b6156b983c89f586bcfc0443c0a7f2372d892d73c66d30f726f8269c75920a082eb2e57f6662d855389bb922ee263f3'
                    },
                    {
                        weight: 1,
                        publicKey: '0xafc139d2bcace02fa3d4b12926f976cf672f35a6ea2bc0f7e2e6d2ada0dd28f672acb8dcaedc694d6134a2f6c4aae472c9d67d30f760e16e742e01758c4daf83'
                    }
                ]
            }
        },
        roleFeePayerKey: {
            publicKey: '0xe55d39e147a0d5542d4bb965aeaa01e918c81a332ce47e0d3173179fe5b68c8c9264bec516d50bea0a7da7c3d8f98e124761a9b27434221d138ff8e22d932a0a'
        }
    }
}

// Create AccountForUpdate for AccountKeyRoleBased with legacy key or fail key
// When updating the key used for a specific role in AccountKeyRoleBased to AccountKeyLegacy or AccountKeyFailKey, define the role to update as follows.
> caver.klay.accounts.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', { transactionKey: 'legacyKey', updateKey: 'failKey' })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: {
        roleTransactionKey: { legacyKey: true },
        roleAccountUpdateKey: { failKey: true }
    }
}
```

## createAccountForUpdateWithPublicKey <a id="createaccountforupdatewithpublickey"></a>

```javascript
caver.klay.accounts.createAccountForUpdateWithPublicKey(address, keyForUpdate, options)
```
Creates an instance of `AccountForUpdate` with the public key of the new key to update.

`AccountForUpdate` can be used in the account update transaction object (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE`, or `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) as a `key`. If you want to know how to use `AccountForUpdate` in the transaction, see [Account update with AccountForUpdate](../get-started-1.4.1.md#account-update-with-accountforupdate).

**NOTE** `caver.klay.accounts.createAccountForUpdateWithPublicKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | Address of an Account. |
| keyForUpdate | String \| Array \| Object | The public-key of the new key to update. This value is a single public-key string when the key is AccountKeyPublic, an array of public-key strings when AccountKeyMultiSig, an object when the key is AccountKeyRoleBased. |
| options |  Object | An optional object containing the threshold and weight. This is required when using AccountKeyMultiSig. If you use AccountkeyMultiSig as one of the keys in AccountKeyRoleBased, specify the role of the threshold and weight. The usage is shown in the example below. |

**Return Value**

`Object` - An AccountForUpdate instance, see [caver.klay.accounts.createAccountForUpdate](#createaccountforupdate).


**Example**

```javascript
// Create AccountForUpdate for AccountKeyPublic
> caver.klay.accounts.createAccountForUpdateWithPublicKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', '0x24c32ee4f908ceed89e7501de2980fcb1d2add69080d3921f86c49de863eb2d507e24d9aaf91328b7f7cef2a94b538cb33b3f8cdd64925855ce0a4bf6e11f3db')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        publicKey: '0x24c32ee4f908ceed89e7501de2980fcb1d2add69080d3921f86c49de863eb2d507e24d9aaf91328b7f7cef2a94b538cb33b3f8cdd64925855ce0a4bf6e11f3db'
    }
}

// Create AccountForUpdate for AccountKeyMultiSig with an options object
> caver.klay.accounts.createAccountForUpdateWithPublicKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', ['0xc89f551ce9c569cf978f4f64833e447f177a83eda4f1883d770360ab35002dbdeb2d502cd33217238add013ea1c4ff5055ceda46473569824e336d0d64e9eeb2', '0xab0837fa3d61cf33dc4f3af4aca692d8c939566e1abbca0036fa3b29cd55b38a387f73baf59510d96680062bd129dd2bb8dcbb5ea5ed16c881f83a3251f73600'], { threshold: 2, weight: [1,1] })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: {
        multisig: {
            threshold: 2,
            keys: [
                {
                    weight: 1, 
                    publicKey: '0xc89f551ce9c569cf978f4f64833e447f177a83eda4f1883d770360ab35002dbdeb2d502cd33217238add013ea1c4ff5055ceda46473569824e336d0d64e9eeb2'
                },
                {
                    weight: 1, 
                    publicKey: '0xab0837fa3d61cf33dc4f3af4aca692d8c939566e1abbca0036fa3b29cd55b38a387f73baf59510d96680062bd129dd2bb8dcbb5ea5ed16c881f83a3251f73600'
                }
            ]
        }
    }
}

// Create AccountForUpdate for AccountKeyRoleBased with an options object
> caver.klay.accounts.createAccountForUpdateWithPublicKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', { transactionKey: '0x2b4a1d4ca1ee828f17e8c4c0ac0c0c46cf08f4b27fafc01e4b3481a4fe0891cacf315ed10b1df85bfd6797ea6c5ebafac437a7564eff355b11ad1e3d6e6c43a7', updateKey: ['0x26156615c8e503d96cd332a2fba6aab88b6156b983c89f586bcfc0443c0a7f2372d892d73c66d30f726f8269c75920a082eb2e57f6662d855389bb922ee263f3', '0xafc139d2bcace02fa3d4b12926f976cf672f35a6ea2bc0f7e2e6d2ada0dd28f672acb8dcaedc694d6134a2f6c4aae472c9d67d30f760e16e742e01758c4daf83'], feePayerKey: '0xe55d39e147a0d5542d4bb965aeaa01e918c81a332ce47e0d3173179fe5b68c8c9264bec516d50bea0a7da7c3d8f98e124761a9b27434221d138ff8e22d932a0a' }, { updateKey: { threshold: 2, weight: [1,1] } })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        roleTransactionKey: { 
            publicKey: '0x2b4a1d4ca1ee828f17e8c4c0ac0c0c46cf08f4b27fafc01e4b3481a4fe0891cacf315ed10b1df85bfd6797ea6c5ebafac437a7564eff355b11ad1e3d6e6c43a7'
        },
        roleAccountUpdateKey: { 
            multisig: { 
                threshold: 2,
                keys: [
                    { 
                        weight: 1,
                        publicKey: '0x26156615c8e503d96cd332a2fba6aab88b6156b983c89f586bcfc0443c0a7f2372d892d73c66d30f726f8269c75920a082eb2e57f6662d855389bb922ee263f3'
                    },
                    {
                        weight: 1,
                        publicKey: '0xafc139d2bcace02fa3d4b12926f976cf672f35a6ea2bc0f7e2e6d2ada0dd28f672acb8dcaedc694d6134a2f6c4aae472c9d67d30f760e16e742e01758c4daf83'
                    }
                ]
            }
        },
        roleFeePayerKey: {
            publicKey: '0xe55d39e147a0d5542d4bb965aeaa01e918c81a332ce47e0d3173179fe5b68c8c9264bec516d50bea0a7da7c3d8f98e124761a9b27434221d138ff8e22d932a0a'
        }
    }
}
```

## createAccountForUpdateWithLegacyKey <a id="createaccountforupdatewithlegacykey"></a>

```javascript
caver.klay.accounts.createAccountForUpdateWithLegacyKey(address)
```
Creates an AccountForUpdate instance to update the account's key with [AccountKeyLegacy](../../../../learn/accounts.md#accountkeylegacy). Make sure you have a private key that matches your account address before updating to AccountKeyLegacy.

`AccountForUpdate` can be used in the account update transaction object (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE`, or `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) as a `key`. If you want to know how to use `AccountForUpdate` in the transaction, see [Account update with AccountForUpdate](../get-started-1.4.1.md#account-update-with-accountforupdate).

**NOTE** `caver.klay.accounts.createAccountForUpdateWithLegacyKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | Address of an Account. |

**Return Value**

`Object` - An AccountForUpdate instance, see [caver.klay.accounts.createAccountForUpdate](#createaccountforupdate).


**Example**

```javascript
// Create AccountForUpdate for AccountKeyLegacy
> caver.klay.accounts.createAccountForUpdateWithLegacyKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { legacyKey: true } 
}
```

## createAccountForUpdateWithFailKey <a id="createaccountforupdatewithfailkey"></a>

```javascript
caver.klay.accounts.createAccountForUpdateWithFailKey(address)
```
Creates an AccountForUpdate instance to update the account's key with [AccountKeyFail](../../../../learn/accounts.md#accountkeyfail). Transactions sent by an account with AccountKeyFail always fail in the validation process.

`AccountForUpdate` can be used in the account update transaction object (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE`, or `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) as a `key`. If you want to know how to use `AccountForUpdate` in the transaction, see [Account update with AccountForUpdate](../get-started-1.4.1.md#account-update-with-accountforupdate).

**NOTE** `caver.klay.accounts.createAccountForUpdateWithFailKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | Address of an Account. |

**Return Value**

`Object` - An AccountForUpdate instance, see [caver.klay.accounts.createAccountForUpdate](#createaccountforupdate).


**Example**

```javascript
// Create AccountForUpdate for AccountKeyFail
> caver.klay.accounts.createAccountForUpdateWithFailKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { failKey: true } 
}
```

## signTransaction <a id="signtransaction"></a>

```javascript
caver.klay.accounts.signTransaction(tx [, privateKey] [, callback])
```

Signs a Kaia transaction with a given private key.

Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), this method takes an RLP-encoded transaction as an input as well as a plain transaction object. See [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction) for the various types of transaction object. This method basically signs as a sender. 
If you want to sign as a fee-payer, we recommend to use [caver.klay.accounts.feePayerSignTransaction](#feepayersigntransaction). But, fee-payers can still sign using this method by passing an object, `{senderRawTransaction: rawTransaction, feePayer: feePayerAddress}`, as `tx`. senderRawTransaction must be a FEE_DELEGATED_ type transaction.

Also since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), signTransaction keeps the existing signatures/feePayerSignatures in the input transaction and appends the signature(s) of the signer to it.

See [Sending a Transaction with multiple signer](../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer) for how to combine multiple users' signatures into a single rawTransaction.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tx | String \| Object | Transaction object or RLP-encoded transaction string (rawTransaction). The properties of a transaction object varies depending on the transaction type. For the description of each transaction type, see [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction). |
| privateKey | String \| Array  | (optional) The private key to sign with. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**NOTE** The `privateKey` parameter has been changed to an `optional parameter` since caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3). Also, privateKey parameter supports `array` of private key strings since caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3). If you do not pass a privateKey, either `from` or `feePayer` account must exist in caver.klay.accounts.wallet to sign the transaction. If an array of privateKeys are provided, the transaction is signed with all the keys inside the array.

**NOTE** The `tx` parameter accepts an RLP-encoded transaction since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Return Value**

`Promise` returning `Object`: The RLP encoded signed transaction. The object properties are as follows:

| Name | Type | Description |
| --- | --- | --- |
| messageHash | String | The hash of the given message. |
| r | String | ECDSA signature r. |
| s | String | ECDSA signature s. |
| v | String | ECDSA recovery id. |
| rawTransaction | String | The RLP encoded transaction, ready to be send using caver.klay.sendSignedTransaction. |
| txHash | 32-byte String | Hash of the transaction. |
| senderTxHash | 32-byte String | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash) |
| signatures | Array | (optional) An array of the sender's signature(s). |
| feePayerSignatures | Array | (optional) An array of the fee payer's signature(s). |

**NOTE** The signatures and feePayerSignatures properties have been added since caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3). If the sender signs the transaction, the signature array is returned in `signatures`. If the fee payer signs, the signature array is returned in `feePayerSignatures`.

**NOTE** The `txHash` and `senderTxHash` in the result object may not be the final values. If another sender signature is added, txHash and senderTxHash will change. If a fee-payer signature is added, txHash will change.

**Example**

```javascript
// sign legacy transaction with private key string
> caver.klay.accounts.signTransaction({
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xc4f3d98b901489c2c6e7bb9a5ddb4bc807b0251c6eac671356f01b66b749141f',
    v: '0x4e44',
    r: '0x2ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82',
    s: '0x602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e',
    rawTransaction: '0xf86f808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a764000080824e44a02ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82a0602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e',
    txHash: '0x87e84bd1d9c512cfabe5ebce10597dd40bc6fe828a10e460b7c01075c76b71a5',
    senderTxHash: '0x87e84bd1d9c512cfabe5ebce10597dd40bc6fe828a10e460b7c01075c76b71a5',
    signatures: [ 
        '0x4e44',
        '0x2ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82',
        '0x602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e' 
    ] 
}

// signTransaction with private key string
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e43',
    r: '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
    s: '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    rawTransaction: '0x08f887808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f847f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    senderTxHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    signatures: [ 
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ]
}

// signTransaction without privateKey parameter
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}).then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e43',
    r: '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
    s: '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    rawTransaction: '0x08f887808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f847f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    senderTxHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    signatures: [ 
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ]
}

// signTransaction with array of private keys
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}, ['0x{private key}', '0x{private key}']).then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e44',
    r: '0xf9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60b',
    s: '0x0787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20',
    rawTransaction: '0x08f8ce808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f88ef845824e44a0f9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60ba00787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1dfac8cb1ab9c25de93758652f3cded2537355e2207c45ba39442b7cb700e8fd',
    senderTxHash: '0x1dfac8cb1ab9c25de93758652f3cded2537355e2207c45ba39442b7cb700e8fd',
    signatures: [ 
        [ 
            '0x4e44',
            '0xf9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60b',
            '0x0787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20' 
        ],
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ] 
}

// signTransaction with fee payer's private key
> caver.klay.accounts.signTransaction({
    senderRawTransaction: '0x09f886819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb80c4c3018080',
    feePayer: '0x6e75945404daa4130a338af01199244b1eae2a0b'
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xec121b6f7e2925166bcb1e6f14fd0b078f1168b6feca9340db7bd31998d14043',
    v: '0x4e44',
    r: '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
    s: '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    rawTransaction: '0x09f8de819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb946e75945404daa4130a338af01199244b1eae2a0bf847f845824e44a0f68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9a05146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    txHash: '0xf31ab04d9ccdb93262a4349afabd68326db0d61452c06259ed8ea91bc09ca295',
    senderTxHash: '0x1b7c0f2fc7548056e90d9690e8c397acf99eb38e622ac91ee22c2085065f8a55',
    feePayerSignatures: [ 
        [ 
            '0x4e44',
            '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
            '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300' 
        ] 
    ] 
}

// signTransaction without fee payer's private key
> caver.klay.accounts.signTransaction({
    senderRawTransaction: '0x09f886819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb80c4c3018080',
    feePayer: '0x6e75945404daa4130a338af01199244b1eae2a0b'
}).then(console.log)
{ 
    messageHash: '0xec121b6f7e2925166bcb1e6f14fd0b078f1168b6feca9340db7bd31998d14043',
    v: '0x4e44',
    r: '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
    s: '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    rawTransaction: '0x09f8de819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb946e75945404daa4130a338af01199244b1eae2a0bf847f845824e44a0f68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9a05146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    txHash: '0xf31ab04d9ccdb93262a4349afabd68326db0d61452c06259ed8ea91bc09ca295',
    senderTxHash: '0x1b7c0f2fc7548056e90d9690e8c397acf99eb38e622ac91ee22c2085065f8a55',
    feePayerSignatures: [ 
        [ 
            '0x4e44',
            '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
            '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300' 
        ] 
    ] 
}
```

## signTransactionWithHash <a id="signtransactionwithhash"></a>

```javascript
caver.klay.accounts.signTransactionWithHash(txHash, privateKeys [, chainId] [, callback])
```

Signs a Kaia transaction with the given transaction hash and private key.

**NOTE** `caver.klay.accounts.signTransactionWithHash` is supported since caver-js [v1.3.2-rc.2](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.2).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| txHash | String | The hash of the transaction to sign. |
| privateKeys | String \| Array  | The private key to sign with. |
| chainId | String \| Number | (optional) The chainId of the chain. If omitted, it will be set by caver-js via callling [caver.klay.getChainId](./caver.klay/config.md#getchainid) |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returning `Array`: An array of signatures

Each signature object in the array has the following values:
| Name | Type | Description |
| --- | --- | --- |
| V | String | ECDSA recovery id. |
| R | String | ECDSA signature r. |
| S | String | ECDSA signature s. |

**Example**

```javascript
// sign transaction with single private key and chain id
> caver.klay.accounts.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', '0x{priavte key}', '0x3e9').then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    }
]

// sign transaction with single private key
> caver.klay.accounts.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', '0x{priavte key}').then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    }
]

// sign transaction with mulitple private keys and chain id
> caver.klay.accounts.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', ['0x{priavte key}', '0x{priavte key}'], '0x3e9').then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    },
    {
        V: '0x07f6',
        R: '0x946ce0288ee98b56160fadae8ec38e36828cf764f897f68f93157a2dc286d4aa',
        S: '0x049ab3f5e91cec831124bdb10782e38de3a02a803ca2dd61a50da81cf5c4f8ef'
    }
]

// sign transaction with mulitple private keys
> caver.klay.accounts.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', ['0x{priavte key}', '0x{priavte key}']).then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    },
    {
        V: '0x07f6',
        R: '0x946ce0288ee98b56160fadae8ec38e36828cf764f897f68f93157a2dc286d4aa',
        S: '0x049ab3f5e91cec831124bdb10782e38de3a02a803ca2dd61a50da81cf5c4f8ef'
    }
]
```

## feePayerSignTransaction <a id="feepayersigntransaction"></a>

```javascript
caver.klay.accounts.feePayerSignTransaction(tx, feePayerAddress [, privateKey] [, callback])
```

Signs a transaction as a fee payer.

Fee payers can sign on a FEE_DELEGATED_ transaction. A transaction object or an RLP-encoded transaction can be passed as an argument.

If privateKay is not given, feePayerKey of the fee payer's account inside the caver-js in-memory wallet is used.

feePayerSignTransaction keeps the existing signatures/feePayerSignatures in the input transaction and appends the fee-payer signature(s) to it.

See [Sending a Transaction with multiple signer](../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer) for how to combine multiple users' signatures into a single rawTransaction.

**NOTE** `caver.klay.accounts.feePayerSignTransaction` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**


| Name | Type | Description |
| --- | --- | --- |
| tx | String \| Object | Transaction object or RLP-encoded transaction string (rawTransaction). The properties of a transaction object varies depending on the transaction type. For the description of each transaction type, see [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction). |
| feePayerAddress | String | The address of fee payer.  |
| privateKey | String \| Array | (optional) The private key to sign with. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returning `Object`: The RLP encoded signed transaction. The object properties are as follows:

| Name | Type | Description |
| --- | --- | --- |
| messageHash | String | The hash of the given message. |
| v | String | ECDSA recovery id. |
| r | String | ECDSA signature r. |
| s | String | ECDSA signature s. |
| rawTransaction | String | The RLP encoded transaction, ready to send using caver.klay.sendSignedTransaction. |
| txHash | 32-byte String | Hash of the transaction. |
| senderTxHash | 32-byte String | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash) |
| feePayerSignatures | Array | An array of the fee payer's signature(s). |

**NOTE** The `txHash` and `senderTxHash` in the result object may not be the final values. If another sender signature is added, txHash and senderTxHash will change. If a fee-payer signature is added, txHash will change.

**Example**

```javascript
// feePayerSignTransaction with transaction object
> caver.klay.accounts.feePayerSignTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x9230c09295dd8b9c02b6ae138ffe3133b58b25c1',
    to: '0x715139255d5e300b431722ec9666ac2350cbf523',
    value: 1,
    gas: 900000,
}, '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', '0x90300d268bb2bad69f5b24e2ac1409a9416cc814254b356ce96b3f75c4364716').then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f899808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1c4c3018080942e4351e950d8d43444ac789cc9e87ba35340ad52f847f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    txHash: '0xead2cdf961090d014044de7ac78e3f9522b430edcd0ea4d3299811464ed636ea',
    senderTxHash: '0x5e0bfce81dca4d6ec5ebeaff8a55fe5dd6d77e6292ee0548c12d7a7aaaff1300',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ]
    ]
}

// feePayerSignTransaction with transaction object defines signatures
// rawTransaction in result will include signatures
> caver.klay.accounts.feePayerSignTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x9230c09295dd8b9c02b6ae138ffe3133b58b25c1',
    to: '0x715139255d5e300b431722ec9666ac2350cbf523',
    value: 1,
    gas: 900000,
    signatures: [['0x4e44', '0xd31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215ec', '0x335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def9']]
}, '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', '0x90300d268bb2bad69f5b24e2ac1409a9416cc814254b356ce96b3f75c4364716').then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f8dd808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1f847f845824e44a0d31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215eca0335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def9942e4351e950d8d43444ac789cc9e87ba35340ad52f847f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    txHash: '0x19006aa7228aa50000bab00ecccde8232516b8e1dce6835528d57561a79b5d3d',
    senderTxHash: '0x7aa6d0b4146020ae38c07c2c9efc26030bd667b9256981379b8cbc86acfd5b27',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ]
    ]
}

// feePayerSignTransaction with transaction object defines feePayerSignatures
> caver.klay.accounts.feePayerSignTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x9230c09295dd8b9c02b6ae138ffe3133b58b25c1',
    to: '0x715139255d5e300b431722ec9666ac2350cbf523',
    value: 1,
    gas: 900000,
    feePayerSignatures: [['0x4e44', '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730', '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7']]
}, '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', ['0xa39599bb66c9f2346f789398d72232e9f218a0ec37e7bcf61cf40e52d860e3f7', '0x8d4c1ffd743faefc711e72f17ff370419ece777c6be2e6a84ac1986806fd57ea']).then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f90127808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1c4c3018080942e4351e950d8d43444ac789cc9e87ba35340ad52f8d5f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7f845824e44a0ec9ab57810b1f02960f2150b7931aefde5d8df9333b436ff11bc9666783358e3a055602d262c0b0ead09359ab0f00138dd7b5754d02694b4ee118bc99c9d8c44adf845824e44a030afe3d18d5a9e2b54d30326de856dbf9cf797e7ade2317d53675913129f863ca0711ab4c6cd60935c0b633679aac55f58443becd4194317f69746d2e829ad881c',
    txHash: '0x2226428e0ca7221ba091d34efbb6e1575e90affc3901550850b479fbfe00f084',
    senderTxHash: '0x5e0bfce81dca4d6ec5ebeaff8a55fe5dd6d77e6292ee0548c12d7a7aaaff1300',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ],
        [
            '0x4e44',
            '0xec9ab57810b1f02960f2150b7931aefde5d8df9333b436ff11bc9666783358e3',
            '0x55602d262c0b0ead09359ab0f00138dd7b5754d02694b4ee118bc99c9d8c44ad'
        ],
        [
            '0x4e44',
            '0x30afe3d18d5a9e2b54d30326de856dbf9cf797e7ade2317d53675913129f863c',
            '0x711ab4c6cd60935c0b633679aac55f58443becd4194317f69746d2e829ad881c'
        ]
    ]
}

// feePayerSignTransaction with RLP encoded transaction string(rawTransaction)
> caver.klay.accounts.feePayerSignTransaction('0x09f885808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1f847f845824e44a0d31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215eca0335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def980c4c3018080', '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', '0x90300d268bb2bad69f5b24e2ac1409a9416cc814254b356ce96b3f75c4364716').then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f8dd808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1f847f845824e44a0d31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215eca0335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def9942e4351e950d8d43444ac789cc9e87ba35340ad52f847f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    txHash: '0x19006aa7228aa50000bab00ecccde8232516b8e1dce6835528d57561a79b5d3d',
    senderTxHash: '0x7aa6d0b4146020ae38c07c2c9efc26030bd667b9256981379b8cbc86acfd5b27',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ]
    ]
}
```

## recoverTransaction <a id="recovertransaction"></a>

```javascript
caver.klay.accounts.recoverTransaction(rawTransaction)
```
Recovers the Kaia address that was used to sign the given RLP encoded transaction.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| signature | String | The RLP encoded transaction. |

**Return Value**

| Type | Description |
| --- | --- |
| String | The Kaia address used to sign this transaction. |

**Example**

```js
> caver.klay.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
'0xF0109fC8DF283027b6285cc889F5aA624EaC1F55'
```


## hashMessage <a id="hashmessage"></a>

```javascript
caver.klay.accounts.hashMessage(message)
```

Hashes the given message in order for it to be passed to [caver.klay.accounts.recover](#recover).
The data will be UTF-8 HEX decoded and enveloped as follows:
```
"\x19Kaia Signed Message:\n" + message.length + message
```
and hashed using keccak256.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| message | String | A message to hash.  If it is a HEX string, it will be UTF-8 decoded first. |


**Return Value**

| Type | Description |
| --- | --- |
| String | The hashed message |


**Example**

```javascript
> caver.klay.accounts.hashMessage("Hello World")
'0xf334bf277b674260e85f1a3d2565d76463d63d29549ef4fa6d6833207576b5ba'

// the below results in the same hash
> caver.klay.accounts.hashMessage(caver.utils.utf8ToHex("Hello World"))
'0xf334bf277b674260e85f1a3d2565d76463d63d29549ef4fa6d6833207576b5ba'
```


## sign <a id="sign"></a>

```javascript
caver.klay.accounts.sign(data, privateKey)
```
Signs arbitrary data. This data is before UTF-8 HEX decoded and enveloped as follows:
```
"\x19Kaia Signed Message:\n" + message.length + message
```

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| data | String | The data to sign. |
| privateKey | String | The private key to sign with. |


**Return Value**

``String|Object``: The signed data RLP encoded signature. The signature values as follows:

| Name | Type | Description |
| --- | --- | --- |
| message | String | The given message. |
| messageHash | String | The hash of the given message. |
| r | String | ECDSA signature r. |
| s | String | ECDSA signature s. |
| v | String | ECDSA recovery id. |
| signature | String | The generated signature. |


**Example**

```javascript
> caver.klay.accounts.sign('Some data', '0x{private key}');
{
    message: 'Some data',
    messageHash: '0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a',
    v: '0x1b',
    r: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b',
    s: '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac',
    signature: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac1b'
}
```


## recover <a id="recover"></a>

```javascript
caver.klay.accounts.recover(signatureObject)
caver.klay.accounts.recover(message, signature [, preFixed])
caver.klay.accounts.recover(message, v, r, s [, preFixed])
```
Recovers the Kaia address that was used to sign the given data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| message \| signatureObject | String \| Object | Either signed message or hash. For the details of the signature object, see the table below. |
| messageHash | String | The hash of the given message. |
| signature | String | The raw RLP encoded signature, OR parameter 2-4 as v, r, s values. |
| preFixed | Boolean | (optional, default: ``false``) If the last parameter is ``true``, the given message will NOT automatically be prefixed with ``"\x19Kaia Signed Message:\n" + message.length + message``, and assumed to be already prefixed. |

The signature object has following values:

| Name | Type | Description |
| --- | --- | --- |
| messageHash | String | The hash of the given message already prefixed with `"\x19Kaia Signed Message:\n" + message.length + message`. |
| r | String | ECDSA signature r. |
| s | String | ECDSA signature s. |
| v | String | ECDSA recovery id. |


**Return Value**

| Type | Description |
| --- | --- |
| String | The Kaia address used to sign this data. |


**Example**

```javascript
> caver.klay.accounts.recover({
      messageHash: '0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a',
      v: '0x1b',
      r: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b',
      s: '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac',
  })
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'

// message, signature
> caver.klay.accounts.recover('Some data', '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac1b');
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'

// message, v, r, s
> caver.klay.accounts.recover('Some data', '0x1b', '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b', '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac');
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'
```

## combineSignatures <a id="combinesignatures"></a>

```javascript
caver.klay.accounts.combineSignatures(rawTransactions)
```

Combines the array of RLP encoded transaction strings into a single RLP encoded transaction string. RLP encoded transaction string that you want to combine must all have signed the same transaction.

combineSignatures removes duplicates in signatures or feePayerSignatures.

**NOTE** `caver.klay.accounts.combineSignatures` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| rawTransactions | Array | An array of RLP encoded transaction strings (rawTransaction). |

**Return Value**

`Promise` returning `Object`: An RLP encoded transaction. The object properties are as follows:

| Name | Type | Description |
| --- | --- | --- |
| rawTransaction | String | An RLP encoded transaction, ready to send using caver.klay.sendSignedTransaction. |
| txHash | 32-byte String | Hash of the transaction. |
| senderTxHash | 32-byte String | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash) |
| signatures | Array | (optional) All signatures in the combined RLP encoded transaction (rawTransaction). If there are no signatures, the `signatures` property is not returned in the result object. |
| feePayerSignatures | Array | (optional) All feePayerSignatures in the combined RLP encoded transaction (rawTransaction). If there are no feePayerSignatures, the `feePayerSignatures` property is not returned in the result object. |

**NOTE** The `txHash` and `senderTxHash` in the result object may not be the final values. If another sender signature is added, txHash and senderTxHash will change. If a fee-payer signature is added, txHash will change.

**Example**

```javascript
> caver.klay.accounts.combineSignatures([
    '0x39f8b6128505d21dba00830dbba094596c3b874dc5775c3969b09a3115f453c20a59abf88ef845824e44a0f530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30a0738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292f845824e43a01fa5a80bb06f5787b1ac81d8b48578627be7a3b725d2e3722a85b0e31f71a445a003dff23bb2947d1819ec91eb695e8bc8b96bc591a2b855fa1495f5bbf896b91780c4c3018080',
    '0x39f90155128505d21dba00830dbba094596c3b874dc5775c3969b09a3115f453c20a59abf88ef845824e44a0f530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30a0738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292f845824e44a06a28576af9368a2056ba61d21390f484b487eba2210ee99b76615441a78f375da05d39f38e05d2ea80c2c1150374ca77d46b119d040101ebfc593f2a1963da409694120d8dc88b44fd8aa4dfab82c4078c7a7ee6c1edf88ef845824e44a00ca8405f35535cf82105a0596fcbd5c4cf228ce0d269c760246f9e10d6820566a02f905e44a2db94fe985158f81979cbcb7ba138cb1f2fb82bc9bd043701ec2025f845824e44a0feb42d7ed1519f93ddbc3093834934c6c7a15d843dfc8e7d14f78ecf3aa1d848a0271a2e8caf98d6ab79f9f4f6fdbe1c01e85aeea503b350ec69c6580320d53b06',
]).then(console.log)
{
    rawTransaction: '0x39f9019c128505d21dba00830dbba094596c3b874dc5775c3969b09a3115f453c20a59abf8d5f845824e44a0f530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30a0738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292f845824e43a01fa5a80bb06f5787b1ac81d8b48578627be7a3b725d2e3722a85b0e31f71a445a003dff23bb2947d1819ec91eb695e8bc8b96bc591a2b855fa1495f5bbf896b917f845824e44a06a28576af9368a2056ba61d21390f484b487eba2210ee99b76615441a78f375da05d39f38e05d2ea80c2c1150374ca77d46b119d040101ebfc593f2a1963da409694120d8dc88b44fd8aa4dfab82c4078c7a7ee6c1edf88ef845824e44a00ca8405f35535cf82105a0596fcbd5c4cf228ce0d269c760246f9e10d6820566a02f905e44a2db94fe985158f81979cbcb7ba138cb1f2fb82bc9bd043701ec2025f845824e44a0feb42d7ed1519f93ddbc3093834934c6c7a15d843dfc8e7d14f78ecf3aa1d848a0271a2e8caf98d6ab79f9f4f6fdbe1c01e85aeea503b350ec69c6580320d53b06',
    txHash: '0x3dac67978ffca834e6ff188e5937d81daab0669a7871f6ffae4ede53fb2a20ac',
    senderTxHash: '0xbb29f73faca65b39b1d33d94e23343f48f22a05531989d031f557460b08f27d4',
    signatures: [
        [
            '0x4e44',
            '0xf530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30',
            '0x738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292',
        ],
        [
            '0x4e43',
            '0x1fa5a80bb06f5787b1ac81d8b48578627be7a3b725d2e3722a85b0e31f71a445',
            '0x03dff23bb2947d1819ec91eb695e8bc8b96bc591a2b855fa1495f5bbf896b917',
        ],
        [
            '0x4e44',
            '0x6a28576af9368a2056ba61d21390f484b487eba2210ee99b76615441a78f375d',
            '0x5d39f38e05d2ea80c2c1150374ca77d46b119d040101ebfc593f2a1963da4096',
        ],
    ],
    feePayerSignatures: [
        [
            '0x4e44',
            '0x0ca8405f35535cf82105a0596fcbd5c4cf228ce0d269c760246f9e10d6820566',
            '0x2f905e44a2db94fe985158f81979cbcb7ba138cb1f2fb82bc9bd043701ec2025',
        ],
        [
            '0x4e44',
            '0xfeb42d7ed1519f93ddbc3093834934c6c7a15d843dfc8e7d14f78ecf3aa1d848',
            '0x271a2e8caf98d6ab79f9f4f6fdbe1c01e85aeea503b350ec69c6580320d53b06',
        ],
    ],
}
```

## getRawTransactionWithSignatures <a id="getrawtransactionwithsignatures"></a>

```javascript
caver.klay.accounts.getRawTransactionWithSignatures(tx [, callback])
```

Returns a signed RLP encoded transaction string from a given transaction object. The transaction object should provide the signatures and feePayerSignatures.

**NOTE** `caver.klay.accounts.getRawTransactionWithSignatures` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tx | Object | A transaction object that includes signatures and feePayerSignatures. The properties of a transaction object varies depending on the transaction type. For the description of each transaction type, see [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction). |

**Return Value**

`Promise` returning `Object`: An RLP encoded transaction. The object properties are as follows:

| Name | Type | Description |
| --- | --- | --- |
| rawTransaction | String | An RLP encoded transaction, ready to send using caver.klay.sendSignedTransaction. |
| txHash | 32-byte String | Hash of the transaction. |
| senderTxHash | 32-byte String | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash) |
| signatures | Array | (optional) All signatures in the RLP encoded transaction (rawTransaction). If there are no signatures, the `signatures` property is not returned in the result object. |
| feePayerSignatures | Array | (optional) All feePayerSignatures in the RLP encoded transaction (rawTransaction). If there are no feePayerSignatures, the `feePayerSignatures` property is not returned in the result object. |

**NOTE** The `txHash` and `senderTxHash` contained in the result object may not be final values. If the signature of the sender is added, txHash and senderTxHash will be different. If the signature of the fee payer is added, the txHash will be different.

**Example**

```javascript
// get rawTransaction with signatures
> caver.klay.accounts.getRawTransactionWithSignatures({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: '0x85fd20bcbd1dcf73073c0abfa72afbde5e8c9a79',
    to: '0x6757d85d8b636044ef3bd2904daf8883cd2e3381',
    data: '0xd14e62b80000000000000000000000000000000000000000000000000000000000000005',
    gas: '0xdbba0',
    chainId: '0x2710',
    gasPrice: '0x5d21dba00',
    nonce: '0xf',
    humanReadable: false,
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
}).then(console.log)
{
    rawTransaction: '0x31f901380f8505d21dba00830dbba0946757d85d8b636044ef3bd2904daf8883cd2e3381809485fd20bcbd1dcf73073c0abfa72afbde5e8c9a79a4d14e62b80000000000000000000000000000000000000000000000000000000000000005f8d5f845824e43a09610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6a06dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175f845824e44a035cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48a07e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594f845824e44a0fc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20a07d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe8950780c4c3018080',
    txHash: '0x94e6edb47fa258671745a433f1a08f5546b18a634f43e854c2bec1a40a7e8df0',
    senderTxHash: '0xcb1138abbef61a42cc846957b72a27329e80395911593f201f49c70c06408385',
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
}

// get rawTransaction with signatures and feePayerSignatures
> caver.klay.accounts.getRawTransactionWithSignatures({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: '0x85fd20bcbd1dcf73073c0abfa72afbde5e8c9a79',
    to: '0x6757d85d8b636044ef3bd2904daf8883cd2e3381',
    data: '0xd14e62b80000000000000000000000000000000000000000000000000000000000000005',
    gas: '0xdbba0',
    chainId: '0x2710',
    gasPrice: '0x5d21dba00',
    nonce: '0xf',
    humanReadable: false,
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
    feePayer: '0x918f31cce0d9582882663fe9099226d3912c9d13',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x5991f915a32ad719da138efecdcc3d169ad71fde31eba03be91991681d53f881',
            '0x3653c82d6d99839699c3dfea470fcc777cda5b6185a1678c19d5fd7605c04a97',
        ],
    ],
}).then(console.log)
{
    rawTransaction: '0x31f901900f8505d21dba00830dbba0946757d85d8b636044ef3bd2904daf8883cd2e3381809485fd20bcbd1dcf73073c0abfa72afbde5e8c9a79a4d14e62b80000000000000000000000000000000000000000000000000000000000000005f8d5f845824e43a09610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6a06dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175f845824e44a035cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48a07e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594f845824e44a0fc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20a07d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe8950794918f31cce0d9582882663fe9099226d3912c9d13f847f845824e44a05991f915a32ad719da138efecdcc3d169ad71fde31eba03be91991681d53f881a03653c82d6d99839699c3dfea470fcc777cda5b6185a1678c19d5fd7605c04a97',
    txHash: '0xf015dd519c909a80c111219ab2c5139d01a2e4121f801e8f45e519eafd421db6',
    senderTxHash: '0xcb1138abbef61a42cc846957b72a27329e80395911593f201f49c70c06408385',
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
    feePayerSignatures: [
        [
            '0x4e44',
            '0x5991f915a32ad719da138efecdcc3d169ad71fde31eba03be91991681d53f881',
            '0x3653c82d6d99839699c3dfea470fcc777cda5b6185a1678c19d5fd7605c04a97',
        ],
    ],
}
```

## encrypt <a id="encrypt"></a>

```javascript
caver.klay.accounts.encrypt(encryptTarget, password [, options])
```
Encrypts an account to the Kaia keystore standard. For more information, please refer to [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3).

**NOTE** Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), `caver.klay.accounts.encrypt` encrypts using the keystore v4 standard to encrypt various AccountKey types (AccountKeyPublic, AccountKeyMultiSig, AccountKeyRoleBased). If you want to encrypt an account using keystore v3, please use [caver.klay.accounts.encryptV3](#encryptv3).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| encryptTarget | String \| Array \| Object | A private key or a Kaia wallet key to encrypt. Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), encryptTarget also can be an instance of Account or AccountKey (AccountKeyPublic, AccountKeyMultiSig, or AccountKeyRoleBased), an array of private key strings or an object that defines the keys by role. |
| password | String | The password used for encryption. |
| options | Object | (optional) The `options` parameter allows you to specify the values to use when using encrypt. You can also use the options object to encrypt decoupled accounts. See the example below for usage of `options`. |

**NOTE** If account address cannot be extracted from encryptTarget (when AccountKeyMultiSig, AccountKeyRoleBased, an array of private key strings or an object that defines the keys by role) or if the account's private key is decoupled from address, you must specify the address in the options object.

**NOTE**: There are two ways to encrypt the private key when an account has a decoupled private key from the address.
1. Use the [KaiaWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) format with the privateKey parameter.
2. Use the `options.address` to send the address as a parameter.

**Return Value**

| Type | Description |
| --- | --- |
| Object | The encrypted keystore JSON. Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), keystore v4 is used. The example below illustrates both keystore v3 and v4. |


**Example**

```javascript
// encrypt to keystore v4 JSON.
// Encrypt with a private key string
> caver.klay.accounts.encrypt('0x{private key}', 'test')
{
    version: 4,
    id: '6b4c9eb2-9dc6-46d4-88b6-bb1fa511ead1',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: 'eda10e7b55de386aeb212f99644cdbfa52b96bf07747e74e5e60bd6c39fa88aa',
            cipherparams: { iv: 'd626fa3c140c93b27fb995264bee9c4e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: 'e85fd7a0801ed5221a769844a225a3663886e0e235fbc972c31a129df5cadb6c', n: 4096, r: 8, p: 1 },
            mac: 'bc19774bf5db92919273ca72f8f3137019d658e7850e31ff454635db4a1d5dbe',
        },
    ],
}

// Encrypt with an array of private key strings
> caver.klay.accounts.encrypt(['0x{private key}', '0x{private key}'], 'test', { address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a' })
{
    version: 4,
    id: 'ae5e94fc-0ab4-4a54-8655-4fab51b92e4a',
    address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a',
    keyring: [
        {
            ciphertext: 'd84db9f8cd5206cf9dae524fbb15f4c09c93f447352cb3a6ac3ef182f9056686',
            cipherparams: { iv: '7a7bc290306bf39db79b425a5fe7333b' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '35cc3deab2a096ae1d2d62a2c1cb7d0c5481d9127cae3c35b1540be2b9fc2175', n: 4096, r: 8, p: 1 },
            mac: '87eecd98c857e4c416b63a3731fcf811cb055adf2967d5272e4aa77974dbf2a6',
        },
        {
            ciphertext: '8d6c3036fecbd6976734711ec69068180b4e5ec90e06797d92be8243eae35f19',
            cipherparams: { iv: '191fcc2402b82d7039bd651b29f42cbc' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: 'cbf12acbba50120783aa0ad4ff35f11daa8972dcb728e11445dd1ec38be2e091', n: 4096, r: 8, p: 1 },
            mac: '216b8a04022234d8127eafb9bdb3a72b18f6c94a05469d9bbd76d26e67cb63a2',
        },
    ],
}

// Encrypt with an object
> caver.klay.accounts.encrypt({ transactionKey: ['0x{private key}', '0x{private key}'], updateKey: '0x{private key}', feePayerKey: '0x{private key}'}, 'test', { address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a' })
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

// Encrypt decoupled account - 1. Use the KaiaWalletKey format with the privateKey parameter.
> caver.klay.accounts.encrypt('0x{private key}0x{type}0x{address in hex}', 'test')
{
    version: 4,
    id: 'f320306e-4d67-4982-b1a9-7b455c744579',
    address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d',
    keyring: [
        {
            ciphertext: '745d306663b7cc09dbe6f3dbbf76d252bd5cb53613c6369e7e481edbf0bb31d1',
            cipherparams: { iv: '0c502b449247166e6f3338346b82ea3d' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '171efaa9c12aa03d488c547651a3d1b2c745e305dffcaf4ad658ed1ae18882d8', n: 4096, r: 8, p: 1 },
            mac: '8cb52aff70971b9fd2b467b47aa493ae90e8823f4ff5cfafcf7c2e06a5aa2298',
        },
    ],
}

// Encrypt decoupled account - 2. Use the options to send the address as a parameter.
> caver.klay.accounts.encrypt('0x{private key}', 'test', { address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d' })
{
    version: 4,
    id: '2675a321-9054-48ae-97d8-bafa22ec07f5',
    address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d',
    keyring: [
        {
            ciphertext: 'aa51496d861a129c91e2fb92807afb7603156336b4681a6bf1569634fb51d330',
            cipherparams: { iv: 'cc4fda2a72f2904a7bd342318cc9a61f' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '672160453667bbe34c9a3adf997e92d1bd734ab28f6078807cad902b5b47fd92', n: 4096, r: 8, p: 1 },
            mac: '51ec88d578f94f1307f0d025cac4b0e6c0544498baa05266f0114d06c57155b4',
        },
    ],
}

// Using options objects with encryption option values (scrypt)
> caver.klay.accounts.encrypt('0x{private key}', 'test', {
    salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
    iv: Buffer.from('b62ef75e39fa396de62c51c4734b69a2', 'hex'),
    kdf: 'scrypt',
    dklen: 32,
    n: 262144,
    r: 8,
    p: 1,
    cipher: 'aes-128-cbc',
    uuid: Buffer.from('f0b40ab7d69fdd9606e2a5242dddd813', 'hex'),
})
{
    version: 4,
    id: 'f0b40ab7-d69f-4d96-86e2-a5242dddd813',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: 'd73c42f72b6c46c352442db20d04ea7bf571df29a01641e028ab97891069fad191a93b0082650ac4c951c75f400cc545',
            cipherparams: { iv: 'b62ef75e39fa396de62c51c4734b69a2' },
            cipher: 'aes-128-cbc',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c', n: 262144, r: 8, p: 1 },
            mac: '9a200c73ef48129a33ffef7c7246e8a08c4bcd308b18e341f25199f4f974dcd0',
        },
    ],
}

// Using options objects with encryption option values (pbkdf2)
> caver.klay.accounts.encrypt('0x{private key}', 'test', {
    salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
    iv: Buffer.from('b62ef75e39fa396de62c51c4734b69a2', 'hex'),
    kdf: 'pbkdf2',
    dklen: 32,
    c: 262144,
    cipher: 'aes-128-cbc',
    uuid: Buffer.from('f0b40ab7d69fdd9606e2a5242dddd813', 'hex'),
})
{
    version: 4,
    id: 'f0b40ab7-d69f-4d96-86e2-a5242dddd813',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: '58802ef723041431ec089041c23ae0d4b6b4d8fe56c920f587296b95b7645df439c3917da4f8a119ee0300609f4448d0',
            cipherparams: { iv: 'b62ef75e39fa396de62c51c4734b69a2' },
            cipher: 'aes-128-cbc',
            kdf: 'pbkdf2',
            kdfparams: { dklen: 32, salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c', c: 262144, prf: 'hmac-sha256' },
            mac: '2cac2a4dccb9127c6f7335135cfc5a8dda6c58cd4429cd3466b89d5d506f5930',
        },
    ],
}

// encrypt to keystore v3 JSON. (If you want to encrypt to keystore v3, use a version earlier than caver-js v1.2.0.)
// Encrypt with a private key string
> caver.klay.accounts.encrypt('0x{private key}', 'test!')
{
    version: 3,
    id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    crypto: {
        ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
        cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10', n: 262144, r: 8, p: 1 },
        mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
    }
}
```

## encryptV3 <a id="encryptv3"></a>

```javascript
caver.klay.accounts.encryptV3(encryptTarget, password [, options])
```
Encrypts an account to the Kaia keystore v3 standard. 

**NOTE** `caver.klay.accounts.encryptV3` is supported since caver-js [v1.3.2-rc.1](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.1).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| encryptTarget | String \| Object | A private key, a Kaia wallet key, or an instance of Account or AccountKeyPublic to encrypt. |
| password | String | The password used for encryption. |
| options | Object | (optional) The `options` parameter allows you to specify the values to use when using encrypt. You can also use the `options` object to encrypt decoupled accounts. See the third example below for usage of `options`. |

**NOTE**: There are two ways to encrypt the private key when an account has a decoupled private key from the address.
1. Use the [KaiaWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) as `encryptTarget` parameter.
2. Use the address as `options.address` parameter to send the address as one of the parameters. See the third example below for the usage.

**Return Value**

| Type | Description |
| --- | --- |
| Object | The encrypted keystore v3 JSON. |


**Example**

```javascript
// encrypt to keystore v3 JSON with single private key string.
> caver.klay.accounts.encryptV3('0x{private key}', 'test!')
{
    version: 3,
    id: 'ff07b774-b572-4c76-a925-9e7650fb0488',
    address: '0x4abe737d3c57dce9152988c714e9e4b341647650',
    crypto: {
        ciphertext: '5a1c898fd89a7521e0034d297a46f029def59632416aef724a1f466f3c416958',
        cipherparams: { iv: '8304ad468f10db5529fa480bfc170df7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '3a98ebac3da3ad0edf7f1f237c86a3dd71a77002e4908991579ed52910c6f082', n: 4096, r: 8, p: 1 },
        mac: 'a5ed79b91ffe30baa22b2622bffbab97ea5cf893ba96249c7854e2d19295cc3d',
    },
}

// encrypt to keystore v3 JSON with KaiaWalletKey.
> caver.klay.accounts.encryptV3('0x{private key}0x{type}0x{address in hex}', 'test!')
{
    version: 3,
    id: 'ff07b774-b572-4c76-a925-9e7650fb0488',
    address: '0x4abe737d3c57dce9152988c714e9e4b341647650',
    crypto: {
        ciphertext: '5a1c898fd89a7521e0034d297a46f029def59632416aef724a1f466f3c416958',
        cipherparams: { iv: '8304ad468f10db5529fa480bfc170df7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '3a98ebac3da3ad0edf7f1f237c86a3dd71a77002e4908991579ed52910c6f082', n: 4096, r: 8, p: 1 },
        mac: 'a5ed79b91ffe30baa22b2622bffbab97ea5cf893ba96249c7854e2d19295cc3d',
    },
}

// encrypt to keystore v3 JSON with address field in options.
> caver.klay.accounts.encryptV3('0x{private key}', 'test!', { address: '0x4abe737d3c57dce9152988c714e9e4b341647650' })
{
    version: 3,
    id: 'ff07b774-b572-4c76-a925-9e7650fb0488',
    address: '0x4abe737d3c57dce9152988c714e9e4b341647650',
    crypto: {
        ciphertext: '5a1c898fd89a7521e0034d297a46f029def59632416aef724a1f466f3c416958',
        cipherparams: { iv: '8304ad468f10db5529fa480bfc170df7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '3a98ebac3da3ad0edf7f1f237c86a3dd71a77002e4908991579ed52910c6f082', n: 4096, r: 8, p: 1 },
        mac: 'a5ed79b91ffe30baa22b2622bffbab97ea5cf893ba96249c7854e2d19295cc3d',
    },
}
```


## decrypt <a id="decrypt"></a>

```javascript
caver.klay.accounts.decrypt(keystoreJsonV3, password)
```
Decrypts a keystore v3 or v4 JSON and returns the decrypted account object.

**NOTE** Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), `caver.klay.accounts.decrypt` can decrypt the keystore v4.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| keystoreJson | String | JSON string containing the encrypted account to decrypt. |
| password | String | The password used for encryption. |


**Return Value**

| Type | Description |
| --- | --- |
| Object | The decrypted account. |


**Example**

```javascript
// Decrypt keystore v4 JSON
> caver.klay.accounts.decrypt({
    version: 4,
    id: '6b4c9eb2-9dc6-46d4-88b6-bb1fa511ead1',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: 'eda10e7b55de386aeb212f99644cdbfa52b96bf07747e74e5e60bd6c39fa88aa',
            cipherparams: { iv: 'd626fa3c140c93b27fb995264bee9c4e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: 'e85fd7a0801ed5221a769844a225a3663886e0e235fbc972c31a129df5cadb6c', n: 4096, r: 8, p: 1 },
            mac: 'bc19774bf5db92919273ca72f8f3137019d658e7850e31ff454635db4a1d5dbe',
        },
    ],
}, 'test')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey]
}

// Decrypt keystroe v3 JSON
> caver.klay.accounts.decrypt({
     version: 3,
     id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
     address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
     crypto: {
         ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
         cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
         cipher: 'aes-128-ctr',
         kdf: 'scrypt',
         kdfparams: {
             dklen: 32,
             salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
             n: 262144,
             r: 8,
             p: 1
         },
         mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
     }
  }, 'test!')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey]
}
```

## isDecoupled <a id="isdecoupled"></a>

```javascript
caver.klay.accounts.isDecoupled(key, address)
```
Determines if the key is decoupled from the address.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| key | String | Key to determine if decoupled from address. Key can be a 32-byte string private key or a [KaiaWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format). |
| address | String | (optional) Address to be used to determine if decoupled. If no address is given, the address is derived from the key. |


**Return Value**

| Type | Description |
| --- | --- |
| Boolean | `true` if the key is decoupled from the address. `false` if it is not decoupled. |


**Example**

```javascript
> caver.klay.accounts.isDecoupled('0x{private key}', '0x{address in hex}')
true

> caver.klay.accounts.isDecoupled('0x{private key}0x{type}0x{address in hex}')
true

> caver.klay.accounts.isDecoupled('0x{private key}')
false

> caver.klay.accounts.isDecoupled('0x{private key}0x{type}0x{address in hex}')
false
```

## getLegacyAccount <a id="getlegacyaccount"></a>

```javascript
caver.klay.accounts.getLegacyAccount(key)
```
Returns an account that has an address derived from the given private key. See [AccountKeyLegacy](../../../../learn/accounts.md#accountkeylegacy).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| key | String | The parameter used to get an account that has a legacy account key. Key can be a 32-byte string private key or a [KaiaWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format). In KaiaWalletKey, only the portion corresponding to the private key is used. |


**Return Value**

| Type | Description |
| --- | --- |
| Object | An account object with a legacy account key of the given value. If there is address information extracted from the key, it is returned together. |


**Example**

```javascript
// getLegacyAccount with raw private key format
> caver.klay.accounts.getLegacyAccount('0x{private key}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}' 
    },
    klaytnWalletKeyAddress: '' 
}

// getLegacyAccount with KaiaWalletKey format
> caver.klay.accounts.getLegacyAccount('0x{private key}0x{type}0x{address in hex}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}'
    },
    klaytnWalletKeyAddress: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27'
}

// getLegacyAccount with decoupled KaiaWalletKey format
> caver.klay.accounts.getLegacyAccount('0x{private key}0x{type}0x{address in hex}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}' 
    },
    klaytnWalletKeyAddress: '0xd05c5926b0a2f31aadcc9a9cbd3868a50104d834'
}
```


## wallet <a id="wallet"></a>

```javascript
caver.klay.accounts.wallet
```
Contains an in-memory wallet with multiple accounts.  These accounts can be used
when using [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction).

**Example**

```javascript
> caver.klay.accounts.wallet;
Wallet {
  '0':
   { address: '0xce3bda34a14415f3bc2bcd5e61c48043857a6451',
     privateKey: '0x{private key}',
     signTransaction: [Function: signTransaction],
     sign: [Function: sign],
     encrypt: [Function: encrypt],
     getKaiaWalletKey: [Function: getKaiaWalletKey],
     index: 0 },
  _accounts: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xce3bda34a14415f3bc2bcd5e61c48043857a6451': { ... },
  '0XCE3BDA34A14415F3BC2BCD5E61C48043857A6451': { ... },
  '0xce3bDa34A14415F3BC2bCd5E61C48043857a6451': { ... } 
}
```


## wallet.create  <a id="wallet-create"></a>

```javascript
caver.klay.accounts.wallet.create([numberOfAccounts] [, entropy])
```
Generates one or more accounts in the wallet with randomly generated key pairs. If wallets already exist, they will not be overridden.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| numberOfAccounts | Number | (optional) The number of accounts to create. Leave empty to create an empty wallet. |
| entropy | String | (optional) A random string to increase entropy. If none is given, a random string will be generated using [randomHex](./caver.utils_1.4.1.md#randomhex). |

**Return Value**

| Type | Description |
| --- | --- |
| Object | The wallet object. |


**Example**

```javascript
> caver.klay.accounts.wallet.create(1, 'entropy');
Wallet {
  '0': { ... },
  _accounts: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xc89cdd4258e17471fbaf75283b6a952451eb7f54': { ... },
  '0XC89CDD4258E17471FBAF75283B6A952451EB7F54': { ... },
  '0xC89cDD4258e17471fBaf75283b6A952451Eb7f54': { ... }
```


## wallet.add <a id="wallet-add"></a>

```javascript
caver.klay.accounts.wallet.add(account [, targetAddress])
```
Adds an account using a private key or account object to the wallet.

**NOTE**: If the same address exists inside the wallet, an error is returned. 
If you want to change the private key associated to an account in the wallet, please use [caver.klay.accounts.wallet.updatePrivateKey](#wallet-updateprivatekey).


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | String \| Object | A private key or account object created with [caver.klay.accounts.create](#create). |
| targetAddress | String | A target address which will be used with a given private key. |

**NOTE**: caver-js supports two types of private key formats.
One is a raw private key format of a 32-byte string type and the other is the [KaiaWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format).

**Return Value**

| Type | Description |
| --- | --- |
| Object | The added account. |


**Example**

```javascript
> caver.klay.accounts.wallet.add('0x{private key}');
{ 
    address: '0xdac9f72e27f05eca08df7a2ea2d044b3ed3a6e54',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 4 
}

// Use key '0x{private key}' as a private key
// for address '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4'
> caver.klay.accounts.wallet.add('0x{private key}', '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4');
{ 
    address: '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 5
}

> caver.klay.accounts.wallet.add({
      privateKey: '0x{private key}',
      address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'
  });
{ 
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 6
}

// Add wallet with KaiaWalletKey format
> caver.klay.accounts.wallet.add('0x{private key}0x{type}0x{address in hex}');
{ 
    address: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 1 
}
```


## wallet.getAccount <a id="wallet-getaccount"></a>

```javascript
caver.klay.accounts.wallet.getAccount(addressOrIndex)
```
Returns the account corresponding to the address in `caver.klay.accounts.wallet`.


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| addressOrIndex | String \| Number | An index in the wallet address list, or an address in hexadecimal. The given value should exist in the caver-js wallet. |

**Return Value**

| Type | Description |
| --- | --- |
| Object | The account in wallet. |


**Example**

```javascript
> caver.klay.accounts.wallet.getAccount('0x{address in hex}')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    feePayerSignTransaction: [Function: feePayerSignTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 0
}

> caver.klay.accounts.wallet.getAccount(0)
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    feePayerSignTransaction: [Function: feePayerSignTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 0
}
```


## wallet.remove <a id="wallet-remove"></a>

```javascript
caver.klay.accounts.wallet.remove(account)
```
Removes an account from the wallet.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | String \| Number | The account address or the index in the wallet. |


**Return Value**

| Type | Description |
| --- | --- |
| Boolean | ``true`` if the wallet was removed. ``false`` if it could not be found. |


**Example**

```javascript
> caver.klay.accounts.wallet;
Wallet {
  '0': { ... },
  _accounts: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xce3bda34a14415f3bc2bcd5e61c48043857a6451': { ... },
  '0XCE3BDA34A14415F3BC2BCD5E61C48043857A6451': { ... },
  '0xce3bDa34A14415F3BC2bCd5E61C48043857a6451': { ... } 
}

> caver.klay.accounts.wallet.remove('0xce3bda34a14415f3bc2bcd5e61c48043857a6451');
true

> caver.klay.accounts.wallet.remove(3);
false
```


## wallet.clear <a id="wallet-clear"></a>

```javascript
caver.klay.accounts.wallet.clear()
```
Securely empties the wallet and removes all its accounts.

**Parameters**

None

**Return Value**

| Type | Description |
| --- | --- |
| Object | The wallet object. |

**Example**

```javascript
> caver.klay.accounts.wallet.clear();
Wallet {
  _accounts: Accounts { ... },
  length: 0,
  defaultKeyName: 'caverjs_wallet' 
}
```


## wallet.encrypt <a id="wallet-encrypt"></a>

```javascript
caver.klay.accounts.wallet.encrypt(password)
```
Encrypts all wallet accounts and returns an array of encrypted keystore v3 objects.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| password | String | The password that will be used for encryption. |


**Return Value**

| Type | Description |
| --- | --- |
| Array | The encrypted keystore v3 objects. |


**Example**

```javascript
> caver.klay.accounts.wallet.encrypt('test');
[ 
    { 
        version: 3,
        id: '2b334f59-a0bc-446c-9f25-c934e432e832',
        address: '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7',
        crypto: { 
            ciphertext: '9ca62a29f0f634ca63dfab40a4631f9fabb689ae60e4bfb475c58c69ad060543',
            cipherparams: { iv: '3d924a71a7b4db0f2f8456068c1c7b8e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '42628f28de6aa8b988c425fa97d8f790ac26a6f89b44b0321c56101e7fb8bbcf',
                n: 4096,
                r: 8,
                p: 1 
                },
            mac: 'a35bc8f650aa1ff0d2316de7be1494927851e19b3e817cd16482a442912f133b' 
        } 
    },
    { 
        version: 3,
        id: '9b8b4e4f-e72c-4a28-af57-38b6838b5533',
        address: '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e',
        crypto: { 
            ciphertext: '65b9350969efdfeadb357145c97992b67c4114bd1d24592e8c62dbddfab2a49f',
            cipherparams: { iv: 'b9d19c69a62745b3db409ff0879669a2' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '914a4628a991f521d547a9da593b5daa63a1a82fcafe0282c09e80967874f36c',
                n: 4096,
                r: 8,
                p: 1 
            },
            mac: 'a9de2c54c4b29807fd21d40fe79f556a7d5b771045cbbda0a943d3ced4cacafc' 
        } 
    } 
]
```


## wallet.decrypt <a id="wallet-decrypt"></a>

```javascript
caver.klay.accounts.wallet.decrypt(keystoreArray, password)
```
Decrypts keystore v3 objects.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| keystoreArray | Array | The encrypted keystore v3 objects to decrypt. |
| password | String | The password that was used for encryption. |


**Return Value**

| Type | Description |
| --- | --- |
| Object | The wallet object. |


**Example**

```javascript
> caver.klay.accounts.wallet.decrypt([ 
    { 
        version: 3,
        id: '2b334f59-a0bc-446c-9f25-c934e432e832',
        address: '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7',
        crypto: { 
            ciphertext: '9ca62a29f0f634ca63dfab40a4631f9fabb689ae60e4bfb475c58c69ad060543',
            cipherparams: { iv: '3d924a71a7b4db0f2f8456068c1c7b8e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '42628f28de6aa8b988c425fa97d8f790ac26a6f89b44b0321c56101e7fb8bbcf',
                n: 4096,
                r: 8,
                p: 1 
                },
            mac: 'a35bc8f650aa1ff0d2316de7be1494927851e19b3e817cd16482a442912f133b' 
        } 
    },
    { 
        version: 3,
        id: '9b8b4e4f-e72c-4a28-af57-38b6838b5533',
        address: '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e',
        crypto: { 
            ciphertext: '65b9350969efdfeadb357145c97992b67c4114bd1d24592e8c62dbddfab2a49f',
            cipherparams: { iv: 'b9d19c69a62745b3db409ff0879669a2' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '914a4628a991f521d547a9da593b5daa63a1a82fcafe0282c09e80967874f36c',
                n: 4096,
                r: 8,
                p: 1 
            },
            mac: 'a9de2c54c4b29807fd21d40fe79f556a7d5b771045cbbda0a943d3ced4cacafc' 
        } 
    } 
], 'test');
Wallet {
  '0': { ... },
  '1': { ... },
  _accounts: Accounts { ... },
  length: 2,
  defaultKeyName: 'caverjs_wallet',
  '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7': { ... } ,
  '0X57629B4A9DC137F15400A3D96AB9E1E57B7F57C7': { ... } ,
  '0x57629B4A9DC137F15400A3d96Ab9e1e57B7F57C7': { ... } ,
  '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e': { ... } ,
  '0X4FB4006448106831A7C8C8E0D0139E05550F3D3E': { ... } ,
  '0x4fb4006448106831a7c8C8e0D0139E05550F3D3E': { ... } 
}
```

## wallet.getKaiaWalletKey <a id="wallet-getklaytnwalletkey"></a>

```javascript
caver.klay.accounts.wallet.getKaiaWalletKey(index)
caver.klay.accounts.wallet.getKaiaWalletKey(address)
```
Return the Kaia wallet key for the account on the wallet of caver-js.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| indexOrAddress | Number\|String | An index in the wallet address list, an address in hexadecimal. The given value should exist in the caver-js wallet. |


**Return Value**

| Type | Description |
| --- | --- |
| String | KaiaWalletKey that matches the account. This value allows you to log in to the wallet. |


**Example**

```javascript
// With non-human-readable address
> caver.klay.accounts.wallet.getKaiaWalletKey(0)
'0x{private key}0x{type}0x{address in hex}'

// With index of wallet list
> caver.klay.accounts.wallet.getKaiaWalletKey(1)
'0x{private key}0x{type}0x{address in hex}'

// With an address in hexadecimal
> caver.klay.accounts.wallet.getKaiaWalletKey('0xa9d40b07a6d06e7b7af6cf9a17fb107c9fc7fe58')
'0x{private key}0x{type}0x{address in hex}'

// If the given account does not exist in the caver-js wallet, returns an error.
> caver.klay.accounts.wallet.getKaiaWalletKey('0x35170d0c774b8c80e9f802a7af6d0497e621c215')
Error: Failed to find account
```

## wallet.updatePrivateKey <a id="wallet-updateprivatekey"></a>

```javascript
caver.klay.accounts.wallet.updatePrivateKey(privateKey, address)
```
Update the account's private key information stored in the wallet.

**NOTE**: This function only changes the information stored in the wallet of caver-js. This function has no effect on the key information stored on the Kaia network. Keys in the Kaia network can be changed by sending a ['ACCOUNT_UPDATE'](./caver.klay/transaction/sendtx-account-update.md#sendtransaction-account_update) transaction.

**NOTE** `updatePrivateKey` only works if the account's accountKey is AccountKeyPublic. 
Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) supports AccountKeys (AccountKeyPublic, AccountKeyMultiSig, AccountKeyRoleBased), `privateKey` becomes a read-only property referencing the defaultKey of the accountKey. This method does not directly update the `privateKey`, instead update the accountKey. This method is maintained for backward-compatibility. It is now recommended to use more generic [caver.klay.accounts.wallet.updateAccountKey](#wallet-updateaccountkey).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| privateKey | String | New private key to be used for updates. |
| address | String | The account address in the wallet. |


**Return Value**

| Type | Description |
| --- | --- |
| Object | Account instance with the new accountKey. The Account instance lives in-memory caver-js wallet. |


**Example**

```javascript
> caver.klay.accounts.wallet.updatePrivateKey('0x{private key}', '0xf2e2565629c7763dc0b595e8e531a31371a95f95');
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 0
}
```

## wallet.updateAccountKey <a id="wallet-updateaccountkey"></a>

```javascript
caver.klay.accounts.wallet.updateAccountKey(address, accountKey)
```
Update the account's account key information stored in the wallet. When you update your account's accountKey, privateKey is updated as well to the defaultKey of the new accountKey.

If the accountKey parameter is a single private key string, the account's accountKey is updated with an `AccountKeyPublic` instance. If the accountKey parameter is an array with multiple private key strings, the account's accountKey is updated with an `AccountKeyMultiSig` instance. If the accountKey parameter is an object whose keys are defined by roles, the account's accountKey is updated with an `AccountKeyRoleBased` instance.

**NOTE**: This function only changes the information stored in the wallet of caver-js. This function has no effect on the key information stored on the Kaia network. Keys in the Kaia network can be changed by sending a ['ACCOUNT_UPDATE'](./caver.klay/transaction/sendtx-account-update.md#sendtransaction-account_update) transaction.

**NOTE** `caver.klay.accounts.wallet.updateAccountKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The account address in the wallet. |
| accountKey | String \| Array \| Object | An AccountKey instance (`AccountKeyPublic`, `AccountKeyMultiSig` or `AccountKeyRoleBased`) or a data structure that contains the key info (a private key string, an array of private key strings or an object that defines the key for each role). |


**Return Value**

| Type | Description |
| --- | --- |
| Object | Account instance with the new accountKey. The Account instance lives in-memory caver-js wallet. |


**Example**

```javascript
// Update to AccountKeyPublic with a private key string
> caver.klay.accounts.wallet.updateAccountKey('0xf2e2565629c7763dc0b595e8e531a31371a95f95', '0x{private key}')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 0
}

// Update to AccountKeyMultiSig with an array of private key strings
> caver.klay.accounts.wallet.updateAccountKey('0xf2e2565629c7763dc0b595e8e531a31371a95f95', ['0x{private key}', '0x{private key}', '0x{private key}'])
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 0
}

// Update to AccountKeyRoleBased with an object that defines keys by roles
> caver.klay.accounts.wallet.updateAccountKey('0x2F66043C35e2389dA0B5401c3C592b2002d60bAc', {
    transactionKey: '0x1e9c7960af2f1ed4b4ceff012b1eb2c1d31e57c9d52c5e9814d35a71726f02ed',
    updateKey: ['0x3ceef924ce849bc243f2df92ae2ac7105182a4ccfcab5df6978280643dad5f3b', '0x655594f750be408b44582d36362e364565644c5974a8eba44e00f91f7274329e'],
    feePayerKey: '0xf0089574637af59838755588f622ac12e7e8c1156aae928e1a1af2cd62736924'
})
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKaiaWalletKey: [Function: getKaiaWalletKey],
    index: 0
}
```
