# caver.wallet.keyring

`caver.wallet.keyring` is a package that provides functionality related to Keyring which includes address and private key(s).

## Class <a href="#class" id="class"></a>

`Keyring` is a structure that contains the address of the account and the private key(s). This is a class in caver-js that allows users to sign on using their own [Klaytn's account](../../../../../learn/accounts.md#klaytn-accounts).

`Keyring` can be classified into three types depending on the type of key being stored: [SingleKeyring](#singlekeyring) to store one address and one private key, [MultipleKeyring](#multiplekeyring) to store one address and multiple private keys, and [RoleBasedKeyring](#rolebasedkeyring) to store one address and one or more private keys for each role.

* [SingleKeyring](#singlekeyring): User signs with a private key
* [MultipleKeyring](#multiplekeyring): User signs with private keys
* [RoleBasedKeyring](#rolebasedkeyring): User signs with the private key(s) by role

### SingleKeyring <a href="#singlekeyring" id="singlekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.singleKeyring(address, key)
```

`SingleKeyring` is a class that stores the `address` of the account and a `private key`. To create a SingleKeyring instance with a private key string, please refer to [caver.wallet.keyring.create](#caver-wallet-keyring-create).

`SingleKeyring` uses a private key with which no roles assigned.

**properties**

| Name    | Type                                | Description                                                                           |
| ------- | ----------------------------------- | ------------------------------------------------------------------------------------- |
| address | string                              | The address of the account.                                                           |
| key     | [PrivateKey](#privatekey) | An instance of [PrivateKey](#privatekey) containing one private key inside. |

### MultipleKeyring <a href="#multiplekeyring" id="multiplekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.multipleKeyring(address, keys)
```

`MultipleKeyring` is a class that stores the `address` of the account and the multiple `private keys`. To create a MultipleKeyring instance with private key strings, please refer to [caver.wallet.keyring.create](#caver-wallet-keyring-create).

`MultipleKeyring` uses private keys with which no roles assigned.

**properties**

| Name    | Type   | Description                                                                                  |
| ------- | ------ | -------------------------------------------------------------------------------------------- |
| address | string | The address of the account.                                                                  |
| keys    | Array  | An array of [PrivateKey](#privatekey) instances containing one private key inside. |

### RoleBasedKeyring <a href="#rolebasedkeyring" id="rolebasedkeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.roleBasedKeyring(address, keys)
```

`RoleBasedKeyring` is a class that stores the `address` of the account and the `private keys` to be used for each role in the form of an array.

`RoleBasedKeyring` defines `keys` which is implemented as a two-dimensional array (empty `keys` looks like `[ [], [], [] ]`) that can include multiple keys for each [role](../../../../../learn/accounts.md#roles). The first array element defines the private key(s) for `roleTransactionKey`, the second defines private key(s) for `roleAccountUpdateKey`, and the third defines the private key(s) for `roleFeePayerKey`.

**properties**

| Name    | Type   | Description                                                                                                                                                                                                                                                                                                                                                                       |
| ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | string | The address of the account.                                                                                                                                                                                                                                                                                                                                                       |
| keys    | Array  | A two-dimensional array that defines the keys used for each [role](../../../../../learn/accounts.md#roles). Each [role](../../../../../learn/accounts.md#roles) includes [PrivateKey](#privatekey) instance(s). The first element in this is `roleTransactionKey`. The second element is `roleAccountUpdateKey`. The last element is `roleFeePayerKey`. |

Below is a getter defined in keyring to intuitively use the key defined for each role. The key used for each role can be accessed more easily through the getter below.

| Name                 | Type  | Description                                                                                                                                                                       |
| -------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| roleTransactionKey   | Array | The roleTransactionKey used to sign transactions (except for transactions for the account update). `keyring.roleTransactionkey` will return the first element of `keys` property. |
| roleAccountUpdateKey | Array | The roleAccountUpdateKey used to sign account update transactions. `keyring.roleAccountUpdateKey` will return the second element of `keys` property.                              |
| roleFeePayerKey      | Array | The roleFeePayerKey used to sign transactions as a fee payer. `keyring.roleFeePayerKey` will return the thrid element of `keys` property.                                         |

### PrivateKey <a href="#privatekey" id="privatekey"></a>

```javascript
const privateKey = new caver.wallet.keyring.privateKey('0x{private key}')
```

`PrivateKey` is a class that contains a private key string. The private key to be used for each role in Keyring is defined as this `PrivateKey` instance.

**properties**

| Name       | Type   | Description             |
| ---------- | ------ | ----------------------- |
| privateKey | string | The private key string. |

### SignatureData <a href="#signaturedata" id="signaturedata"></a>

`SignatureData` is a class that contains signature data inside. The signature which is the result of `sign` or `signMessage` will be returned as a signatureData. You can see how signatureData contains signature(s) inside like below.

```javascript
const signature = new caver.wallet.keyring.signatureData(['0x1b', '0x2dfc6...', '0x15038...'])
```

**properties**

| Name | Type   | Description        |
| ---- | ------ | ------------------ |
| v    | String | ECDSA recovery id. |
| r    | String | ECDSA signature r. |
| s    | String | ECDSA signature s. |

## caver.wallet.keyring.generate <a href="#caver-wallet-keyring-generate" id="caver-wallet-keyring-generate"></a>

```javascript
caver.wallet.keyring.generate([entropy])
```

Generates a SingleKeyring instance with a randomly generated private key.

**Parameters**

| Name    | Type   | Description                                     |
| ------- | ------ | ----------------------------------------------- |
| entropy | string | (optional) A random string to increase entropy. |

**Return Value**

| Type                                      | Description                                               |
| ----------------------------------------- | --------------------------------------------------------- |
| [SingleKeyring](#singlekeyring) | A randomly generated single keyring instance is returned. |

**Example**

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

Generates a private key string.

**Parameters**

| Name    | Type   | Description                                     |
| ------- | ------ | ----------------------------------------------- |
| entropy | string | (optional) A random string to increase entropy. |

**Return Value**

| Type   | Description                         |
| ------ | ----------------------------------- |
| string | The private key string is returned. |

**Example**

```javascript
> caver.wallet.keyring.generateSingleKey()
'0x{private key}'
```

## caver.wallet.keyring.generateMultipleKeys <a href="#caver-wallet-keyring-generatemultiplekeys" id="caver-wallet-keyring-generatemultiplekeys"></a>

```javascript
caver.wallet.keyring.generateMultipleKeys(num [, entropy])
```

Generates private key strings.

**Parameters**

| Name    | Type   | Description                                     |
| ------- | ------ | ----------------------------------------------- |
| num     | number | The number of private key strings.              |
| entropy | string | (optional) A random string to increase entropy. |

**Return Value**

| Type  | Description                                             |
| ----- | ------------------------------------------------------- |
| Array | An array that includes private key strings is returned. |

**Example**

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

Generates a 2D array of which each array element contains keys defined for each [role](../../../../../learn/accounts.md#roles).

**Parameters**

| Name     | Type   | Description                                                                                             |
| -------- | ------ | ------------------------------------------------------------------------------------------------------- |
| numArray | Array  | An array containing the number of keys for each [role](../../../../../learn/accounts.md#roles). |
| entropy  | string | (optional) A random string to increase entropy.                                                         |

**Return Value**

| Type  | Description                                                                                                                               |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Array | A 2D array of which each array element contains keys defined for each [role](../../../../../learn/accounts.md#roles) is returned. |

**Example**

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

Creates a Keyring instance with parameters.

If `key` is a private key string, a [SingleKeyring](#singlekeyring) instance that uses a single private key is created. If `key` is an array containing private key strings, a [MultipleKeyring](#multiplekeyring) instance that use multiple private keys is created. If `key` is a 2D array of which each element contains the private key(s) to be used for each role, a [RoleBasedKeyring](#rolebasedkeyring) instance is created.

**Parameters**

| Name    | Type            | Description                                                                                                                                                                       |
| ------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | string          | An address of keyring.                                                                                                                                                            |
| key     | string \| Array | The private key string, an array of private keys, or a 2D array of which each element contains key(s) to be used for each [role](../../../../../learn/accounts.md#roles). |

**Return Value**

| Type      | Description                                                                                                                                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | The keyring instance is returned. Depending on the `key` parameter, it can be [SingleKeyring](#singlekeyring), [MultipleKeyring](#multiplekeyring) or [RoleBasedKeyring](#rolebasedkeyring). |

**Example**

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

Creates a `SingleKeyring` instance from a private key string or a [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format).

**Parameters**

| Name | Type   | Description                                                                                                                         |
| ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| key  | string | This parameter can be either a private key or [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format). |

**Return Value**

| Type                                      | Description                             |
| ----------------------------------------- | --------------------------------------- |
| [SingleKeyring](#singlekeyring) | The SingleKeyring instance is returned. |

**Example**

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

Creates a `SingleKeyring` instance from a [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) string.

**Parameters**

| Name            | Type   | Description                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| klaytnWalletKey | string | The [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) string. |

**Return Value**

| Type                                      | Description                             |
| ----------------------------------------- | --------------------------------------- |
| [SingleKeyring](#singlekeyring) | The SingleKeyring instance is returned. |

**Example**

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

Creates a `SingleKeyring` instance from an address and a private key string.

**Parameters**

| Name    | Type   | Description                                   |
| ------- | ------ | --------------------------------------------- |
| address | string | An address to be used for creating a keyring. |
| key     | string | A private key string.                         |

**Return Value**

| Type                                      | Description                             |
| ----------------------------------------- | --------------------------------------- |
| [SingleKeyring](#singlekeyring) | The SingleKeyring instance is returned. |

**Example**

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

Creates a `MultipleKeyring` instance from an address and private key strings.

**Parameters**

| Name     | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| address  | string | An address of keyring.           |
| keyArray | Array  | An array of private key strings. |

**Return Value**

| Type                                          | Description                               |
| --------------------------------------------- | ----------------------------------------- |
| [MultipleKeyring](#multiplekeyring) | The MultipleKeyring instance is returned. |

**Example**

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

Creates a `RoleBasedKeyring` instance from an address and a 2D array of which each array element contains keys defined for each [role](../../../../../learn/accounts.md#roles).

**Parameters**

| Name               | Type   | Description                                                                     |
| ------------------ | ------ | ------------------------------------------------------------------------------- |
| address            | string | An address of keyring.                                                          |
| roledBasedKeyArray | Array  | A two-dimensional array containing arrays of private key strings for each role. |

**Return Value**

| Type                                            | Description                                |
| ----------------------------------------------- | ------------------------------------------ |
| [RoleBasedKeyring](#rolebasedkeyring) | The RoleBasedKeyring instance is returned. |

**Example**

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

Decrypts a keystore v3 or v4 JSON and returns the decrypted Keyring instance.

**Parameters**

| Name     | Type   | Description                       |
| -------- | ------ | --------------------------------- |
| keystore | object | The keystore v3 or v4 to decrypt. |
| password | string | The password used for encryption. |

**Return Value**

| Type      | Description                                                                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | The decrypted keyring instance ([SingleKeyring](#singlekeyring), [MultipleKeyring](#multiplekeyring) or [RoleBasedKeyring](#rolebasedkeyring)). |

**Example**

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

## keyring.getPublicKey <a href="#keyring-getpublickey" id="keyring-getpublickey"></a>

```javascript
keyring.getPublicKey()
```

Returns the public key string(s). If `keyring` is an instance of [SingleKeyring](#singlekeyring), getPublicKey returns a public key string. If `keyring` is an instance of [MultipleKeyring](#multiplekeyring), getPublicKey returns an array of public key strings. If `keyring` is an instance of [RoleBasedKeyring](#rolebasedkeyring), getPublicKey returns a two-dimensional array in which the public key(s) used for each role is defined as an array.

**Parameters**

| Name       | Type    | Description                                                        |
| ---------- | ------- | ------------------------------------------------------------------ |
| compressed | boolean | (optional) Whether in compressed format or not (default: `false`). |

**Return Value**

| Type            | Description                    |
| --------------- | ------------------------------ |
| string \| Array | The public key of the keyring. |

**Example**

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

Returns a copied keyring instance.

**Return Value**

| Type      | Description                                                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Keyring` | A copied keyring instance ([SingleKeyring](#singlekeyring), [MultipleKeyring](#multiplekeyring) or [RoleBasedKeyring](#rolebasedkeyring)). |

**Example**

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

## keyring.sign <a href="#keyring-sign" id="keyring-sign"></a>

```javascript
keyring.sign(transactionHash, chainId, role [, index])
```

Signs with transactionHash with the private key(s) and returns signature(s). If the user has not defined an index parameter, `keyring.sign` signs transaction using all the private keys used by the role. If `index` is defined, the `keyring.sign` signs transaction using only one private key at the index. The role used in caver-js can be checked through `caver.wallet.keyring.role`.

When signing transactions, it is recommended to use [caver.wallet.sign](./caver-wallet.md#caver-wallet-sign) or [transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign).

**Parameters**

| Name            | Type             | Description                                                                                                                                                                                                                    |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| transactionHash | string           | The hash string of a transaction to sign.                                                                                                                                                                                      |
| chainId         | string \| number | The chain id of the Klaytn blockchain platform.                                                                                                                                                                                |
| role            | number           | A number indicating the role of the key. You can use `caver.wallet.keyring.role`.                                                                                                                                              |
| index           | number           | (optional) The index of the private key you want to use. The index must be less than the length of the array of the private keys defined for each role. If an index is not defined, this method will use all the private keys. |

**Return Value**

| Type  | Description                                            |
| ----- | ------------------------------------------------------ |
| Array | An array of [SignatureData](#signaturedata). |

**Example**

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

## keyring.ecsign <a href="#keyring-ecsign" id="keyring-ecsign"></a>

```javascript
keyring.ecsign(hash, role [, index])
```

Signs with hashed data using the private key and returns a signature where V is 0 or 1 (parity of the y-value of a the secp256k1 curve).

This function is only used for certain transaction types. Therefore, it is recommended to use [caver.wallet.sign](./caver-wallet.md#caver-wallet-sign) or [transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign) when signing a transaction.

**Parameters**

| Name  | Type   | Description                                                                                                                                                                                                                    |
| ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hash  | string | The hash string to sign.                                                                                                                                                                                                       |
| role  | number | A number indicating the role of the key. You can use `caver.wallet.keyring.role`.                                                                                                                                              |
| index | number | (optional) The index of the private key you want to use. The index must be less than the length of the array of the private keys defined for each role. If an index is not defined, this method will use all the private keys. |

**Return Value**

| Type  | Description                                            |
| ----- | ------------------------------------------------------ |
| Array | An array of [SignatureData](#signaturedata). |

**Example**

```javascript
> keyring.ecsign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', caver.wallet.keyring.role.roleTransactionKey)
[
    SignatureData { _v: '0x00', _r: '0x7a8b6...', _s: '0x17139...' }
]
```

## keyring.signMessage <a href="#keyring-signmessage" id="keyring-signmessage"></a>

```javascript
keyring.signMessage(message, role [, index])
```

Signs message with Klaytn-specific prefix. This calculates a Klaytn-specific signature with:

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

If the user has not defined the index parameter, `keyring.signMessage` signs message with all the private keys used by the role. If the index parameter is given, `keyring.signMessage` signs message using only one private key at the given index. The role used in caver-js can be found through `caver.wallet.keyring.role`.

**Parameters**

| Name    | Type   | Description                                                                                                                                                                                                                    |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| message | string | The message to sign.                                                                                                                                                                                                           |
| role    | number | A number indicating the role of the key. You can use `caver.wallet.keyring.role`.                                                                                                                                              |
| index   | number | (optional) The index of the private key you want to use. The index must be less than the length of the array of the private keys defined for each role. If an index is not defined, this method will use all the private keys. |

**Return Value**

| Type   | Description                                    |
| ------ | ---------------------------------------------- |
| object | An object that includes the result of signing. |

The returned object contains the following:

| Name        | Type   | Description                                            |
| ----------- | ------ | ------------------------------------------------------ |
| messageHash | string | The hash of message with Klaytn-specific prefix.       |
| signatures  | Array  | An array of [SignatureData](#signaturedata). |
| message     | string | The message to sign.                                   |

**Example**

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

Returns the private key(s) used by the role entered as a parameter.

**Parameters**

| Name | Type   | Description                                                                       |
| ---- | ------ | --------------------------------------------------------------------------------- |
| role | number | A number indicating the role of the key. You can use `caver.wallet.keyring.role`. |

**Return Value**

| Type                                         | Description                                                                                                                                   |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [PrivateKey](#privatekey) \| Array | An instance of [PrivateKey](#privatekey) or an array containing the [PrivateKey](#privatekey) instances used by the role. |

**Example**

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

Returns the [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) string for the keyring. With [MultipleKeyring](#multiplekeyring) or [RoleBasedKeyring](#rolebasedkeyring), [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) cannot be used. In this case, use [keyring.encrypt](#keyring-encrypt).

**Return Value**

| Type   | Description                                                                                              |
| ------ | -------------------------------------------------------------------------------------------------------- |
| string | The [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) of the keyring. |

**Example**

```javascript
> keyring.getKlaytnWalletKey()
'0x{private key}0x{type}0x{address in hex}'
```

## keyring.toAccount <a href="#keyring-toaccount" id="keyring-toaccount"></a>

```javascript
keyring.toAccount([options])
```

Returns the [Account](../caver.account.md#account) instance for updating the [AccountKey](../../../../../learn/accounts.md#account-key) of the [Klaytn accounts](../../../../../learn/accounts.md#klaytn-accounts). The [Account](../caver.account.md#account) instance has an [AccountKey](../caver.account.md#accountkeylegacy) instance that can contain public key(s) inside, which will be sent to Klaytn Network and used for validating transactions. For more details about [Account](../caver.account.md#account), see [Account Update](../../get-started.md#account-update).

Note that if you update the [AccountKey](../../../../../learn/accounts.md#account-key) of the [Account](../../../../../learn/accounts.md#klaytn-accounts) stored in the Klaytn, the old private key(s) cannot be used anymore. See [Getting started](../../get-started.md#account-update) on how to use the returned [Account](../caver.account.md#account) instance to update information in your [Klaytn account](../../../../../learn/accounts.md#klaytn-accounts) on Klaytn.

Depending on the type of the private key(s) in the keyring, the returned [Account](../caver.account.md#account) instances can be classified as follows.

* When the keyring contains a private key string: Return an [Account](../caver.account.md#account) instance that includes the address in the keyring and an instance of [AccountKeyPublic](../caver.account.md#accountkeypublic)
* When the keyring contains private key strings: Return an [Account](../caver.account.md#account) instance that includes the address in the keyring and an instance of [AccountKeyWeigthedMultiSig](../caver.account.md#accountkeyweightedmultisig)
* When the keyring contains the different private key strings by role: Return an [Account](../caver.account.md#account) instance that includes the address in the keyring and an instance of [AccountKeyRoleBased](../caver.account.md#accountkeyrolebased)

**Parameters**

| Name    | Type                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) \| Array | (optional) [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) instance containing information that should be defined when updating your existing account to the one with a number of private keys. If keyring uses different private keys for each role, a [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) instance must be defined for each role in an array. If keyring uses more than one private key and options parameter is not defined, the default [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) with the threshold of 1 and the weight of 1 for each key will be used. |

**Return Value**

| Type                                   | Description                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Account](../caver.account.md#account) | An Account instance to be used when a user updates AccountKey for their account in the Klaytn. Note that if you want to replace the existing keyring (or the existing private key(s)) with a new keyring (or a new private key(s)) for your account, you must update your AccountKey by sending an Account Update transaction to Klaytn beforehand. |

**Example**

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

Encrypts a keyring and returns a keystore v4 standard. For more information, please refer to [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3).

**Parameters**

| Name     | Type   | Description                                                                                          |
| -------- | ------ | ---------------------------------------------------------------------------------------------------- |
| password | string | The password to be used for encryption. The encrypted key store can be decrypted with this password. |
| options  | string | (optional) The `options` parameter allows you to specify the values to use when using encrypt.       |

**Return Value**

| Type   | Description                |
| ------ | -------------------------- |
| object | The encrypted keystore v4. |

The returned object contains the following:

| Name    | Type   | Description                                               |
| ------- | ------ | --------------------------------------------------------- |
| version | number | The version of keystore.                                  |
| id      | string | The id of keystore.                                       |
| address | string | The address in the encrypted [Keyring](#class). |
| keyring | Array  | The encrypted private key(s).                             |

For more information, please refer to [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3).

**Example**

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

## keyring.encryptV3 <a href="#keyring-encryptv3" id="keyring-encryptv3"></a>

```javascript
keyring.encryptV3(password [, options])
```

Encrypts an instance of [SingleKeyring](#singlekeyring) and returns a keystore v3 standard.

Note that [MultipleKeyring](#multiplekeyring) and [RoleBasedKeyring](#rolebasedkeyring) cannot use encryptV3. In this case, please use [keyring.encrypt](#keyring-encrypt) with a keystore V4 standard.

**Parameters**

| Name     | Type   | Description                                                                                                     |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| password | string | The password to be used for encryption. The encrypted key store can be decrypted with this password.            |
| options  | string | (optional) The password to be used for encryption. The encrypted key store can be decrypted with this password. |

**Return Value**

| Type   | Description                |
| ------ | -------------------------- |
| object | The encrypted keystore v3. |

The returned object contains the following:

| Name    | Type   | Description                                           |
| ------- | ------ | ----------------------------------------------------- |
| version | number | The version of keystore.                              |
| id      | string | The id of keystore.                                   |
| address | string | The address of encrypted [Keyring](#class). |
| crypto  | object | The encrypted private key.                            |

**Example**

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

## keyring.isDecoupled <a href="#keyring-isdecoupled" id="keyring-isdecoupled"></a>

```javascript
keyring.isDecoupled()
```

Returns `true` if keyring has decoupled key.

**Return Value**

| Type    | Description                          |
| ------- | ------------------------------------ |
| boolean | `true` if keyring has decoupled key. |

**Example**

```javascript
> keyring.isDecoupled()
true

> keyring.isDecoupled()
false
```
