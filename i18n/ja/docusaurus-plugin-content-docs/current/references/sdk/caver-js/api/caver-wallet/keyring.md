# キーホルダー

`caver.wallet.keyring` は、アドレスと秘密鍵を含むキーリングに関連する機能を提供するパッケージです。

## クラス<a href="#class" id="class"></a>

`Keyring`は、アカウントのアドレスと秘密鍵を含む構造体である。 これは、ユーザーが自分の[Kaiaのアカウント](../../../../../learn/accounts.md#klaytn-accounts)を使ってサインオンできるようにするcaver-jsのクラスです。

`Keyring`は、保存する鍵の種類によって3つのタイプに分類できる：1つのアドレスと1つの秘密鍵を保存する[SingleKeyring](#singlekeyring)、1つのアドレスと複数の秘密鍵を保存する[MultipleKeyring](#multiplekeyring)、1つのアドレスと役割ごとに1つ以上の秘密鍵を保存する[RoleBasedKeyring](#rolebasedkeyring)である。

- [SingleKeyring](#singlekeyring)：秘密鍵で署名
- [MultipleKeyring](#multiplekeyring)：秘密鍵で署名
- [RoleBasedKeyring](#rolebasedkeyring)：ユーザは役割に応じた秘密鍵で署名する。

### シングルキーリング<a href="#singlekeyring" id="singlekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.singleKeyring(address, key)
```

`SingleKeyring`は、アカウントの`アドレス`と`秘密鍵`を格納するクラスである。 秘密鍵文字列でSingleKeyringインスタンスを作成するには、[caver.wallet.keyring.create](#caver-wallet-keyring-create) を参照してください。

`SingleKeyring`は、ロールが割り当てられていない秘密鍵を使用する。

**プロパティ**

| 名称 | タイプ                     | 説明                                                                                             |
| -- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| 住所 | ストリング                   | 口座の住所。                                                                                         |
| キー | [プライベートキー](#privatekey) | PrivateKey](#privatekey) のインスタンスで、内部に 1 つの秘密鍵を含む。 |

### マルチプルキーホルダー<a href="#multiplekeyring" id="multiplekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.multipleKeyring(address, keys)
```

`MultipleKeyring`は、アカウントの`アドレス`と複数の`秘密鍵`を格納するクラスである。 秘密鍵文字列でMultipleKeyringインスタンスを作成するには、[caver.wallet.keyring.create](#caver-wallet-keyring-create) を参照してください。

`MultipleKeyring`は、ロールが割り当てられていない秘密鍵を使用する。

**プロパティ**

| 名称 | タイプ   | 説明                                                                                                |
| -- | ----- | ------------------------------------------------------------------------------------------------- |
| 住所 | ストリング | 口座の住所。                                                                                            |
| キー | 配列    | PrivateKey](#privatekey) インスタンスの配列で、中に秘密鍵がひとつ入っています。 |

### ロールベースのキーリング<a href="#rolebasedkeyring" id="rolebasedkeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.roleBasedKeyring(address, keys)
```

`RoleBasedKeyring` は、アカウントの `address` と各役割に使用する `private keys` を配列の形式で格納するクラスである。

`RoleBasedKeyring` は `keys` を定義しており、2次元配列として実装されている（空の `keys` は `[ [], [], [] ]` のように見える）。各 [role](../../../../../learn/accounts.md#roles) に対して複数のキーを含めることができる。 最初の配列要素は `roleTransactionKey` の秘密鍵を定義し、2 番目の配列要素は `roleAccountUpdateKey` の秘密鍵を定義し、3 番目の配列要素は `roleFeePayerKey` の秘密鍵を定義する。

**プロパティ**

| 名称 | タイプ   | 説明                                                                                                                                                                                                                                                                  |
| -- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 住所 | ストリング | 口座の住所。                                                                                                                                                                                                                                                              |
| キー | 配列    | 各[role](../../../../../learn/accounts.md#roles)に使用されるキーを定義する2次元配列。 各 [role](../../../../../learn/accounts.md#roles) には、[PrivateKey](#privatekey) インスタンスが含まれる。 この中の最初の要素は `roleTransactionKey` である。 番目の要素は `roleAccountUpdateKey` である。 最後の要素は `roleFeePayerKey` である。 |

以下は、各ロールに定義されたキーを直感的に使用するために、keyringで定義されたゲッターです。 各役割に使用されるキーは、以下のゲッターからより簡単にアクセスすることができる。

| 名称            | タイプ | 説明                                                                                                                 |
| ------------- | --- | ------------------------------------------------------------------------------------------------------------------ |
| ロールトランザクションキー | 配列  | トランザクションの署名に使用される roleTransactionKey（アカウント更新のトランザクションを除く）。 `keyring.roleTransactionkey` は `keys` プロパティの最初の要素を返します。 |
| ロールアカウント更新キー  | 配列  | アカウント更新トランザクションの署名に使用される roleAccountUpdateKey。 `keyring.roleAccountUpdateKey`は、`keys`プロパティの2番目の要素を返します。            |
| ロールフィー・ペイヤーキー | 配列  | 料金支払者としてトランザクションに署名するために使用される roleFeePayerKey。 `keyring.roleFeePayerKey` は `keys` プロパティの 3 番目の要素を返します。             |

### プライベートキー<a href="#privatekey" id="privatekey"></a>

```javascript
const privateKey = new caver.wallet.keyring.privateKey('0x{private key}')
```

`PrivateKey`は秘密鍵の文字列を格納するクラスである。 Keyringの各ロールで使用される秘密鍵は、この `PrivateKey` インスタンスとして定義されます。

**プロパティ**

| 名称       | タイプ   | 説明       |
| -------- | ----- | -------- |
| プライベートキー | ストリング | 秘密鍵の文字列。 |

### 署名データ<a href="#signaturedata" id="signaturedata"></a>

`SignatureData`は内部に署名データを格納するクラスである。 `sign`または`signMessage`の結果である署名は、signatureDataとして返される。 以下のように、signatureDataの中に署名が含まれていることがわかる。

```javascript
const signature = new caver.wallet.keyring.signatureData(['0x1b', '0x2dfc6...', '0x15038...'])
```

**プロパティ**

| 名称 | タイプ   | 説明           |
| -- | ----- | ------------ |
| v  | ストリング | ECDSAリカバリID。 |
| r  | ストリング | ECDSA署名。     |
| s  | ストリング | ECDSA署名。     |

## caver.wallet.keyring.generate <a href="#caver-wallet-keyring-generate" id="caver-wallet-keyring-generate"></a>

```javascript
caver.wallet.keyring.generate([エントロピー])
```

ランダムに生成された秘密鍵を持つSingleKeyringインスタンスを生成します。

**パラメーター**

| 名称     | タイプ   | 説明                                                |
| ------ | ----- | ------------------------------------------------- |
| エントロピー | ストリング | (オプション) エントロピーを高めるためのランダムな文字列。 |

**リターン・バリュー**

| タイプ                         | 説明                               |
| --------------------------- | -------------------------------- |
| [シングルキーリング](#singlekeyring) | ランダムに生成された単一のキーリング・インスタンスが返されます。 |

**例**

```javascript
> caver.wallet.keyring.generate()
SingleKeyring {
    _address：'0x8ecdfda0281f0d36518f89e0e2444c4f98b2e718',
    _key：PrivateKey { _privateKey: '0x{private key}' }.
}
```

## caver.wallet.keyring.generateSingleKey <a href="#caver-wallet-keyring-generatesinglekey" id="caver-wallet-keyring-generatesinglekey"></a>

```javascript
caver.wallet.keyring.generateSingleKey([エントロピー])
```

秘密鍵文字列を生成する。

**パラメーター**

| 名称     | タイプ   | 説明                                                |
| ------ | ----- | ------------------------------------------------- |
| エントロピー | ストリング | (オプション) エントロピーを高めるためのランダムな文字列。 |

**リターン・バリュー**

| タイプ   | 説明            |
| ----- | ------------- |
| ストリング | 秘密鍵の文字列が返される。 |

**例**

```javascript
> caver.wallet.keyring.generateSingleKey()
'0x{private key}'
```

## caver.wallet.keyring.generateMultipleKeys <a href="#caver-wallet-keyring-generatemultiplekeys" id="caver-wallet-keyring-generatemultiplekeys"></a>

```javascript
caver.wallet.keyring.generateMultipleKeys(num [, entropy])
```

秘密鍵文字列を生成する。

**パラメーター**

| 名称     | タイプ   | 説明                                                |
| ------ | ----- | ------------------------------------------------- |
| 番号     | 番号    | 秘密鍵の文字列の数。                                        |
| エントロピー | ストリング | (オプション) エントロピーを高めるためのランダムな文字列。 |

**リターン・バリュー**

| タイプ | 説明                |
| --- | ----------------- |
| 配列  | 秘密鍵文字列を含む配列が返される。 |

**例**

```javascript
> caver.wallet.keyring.generateMultipleKeys(3)
[
    '0x{private key1}',
    '0x{private key2}',
    '0x{private key3}'
].
```

## caver.wallet.keyring.generateRoleBasedKeys <a href="#caver-wallet-keyring-generaterolebasedkeys" id="caver-wallet-keyring-generaterolebasedkeys"></a>

```javascript
caver.wallet.keyring.generateRoleBasedKeys(numArray [, entropy])
```

各[role](../../../../../learn/accounts.md#roles)ごとに定義されたキーを配列の各要素に含む2次元配列を生成します。

**パラメーター**

| 名称       | タイプ   | 説明                                                         |
| -------- | ----- | ---------------------------------------------------------- |
| numArray | 配列    | 各[role](../../../../../learn/accounts.md#roles)のキーの数を含む配列。 |
| エントロピー   | ストリング | (オプション) エントロピーを高めるためのランダムな文字列。          |

**リターン・バリュー**

| タイプ | 説明                                                                            |
| --- | ----------------------------------------------------------------------------- |
| 配列  | 配列の各要素が、各[role](../../../../../learn/accounts.md#roles)に定義されたキーを含む2次元配列が返される。 |

**例**

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
]。
```

## caver.wallet.keyring.create <a href="#caver-wallet-keyring-create" id="caver-wallet-keyring-create"></a>

```javascript
caver.wallet.keyring.create(アドレス、キー)
```

パラメータを指定して Keyring インスタンスを作成します。

`key` が秘密鍵文字列の場合、単一の秘密鍵を使用する [SingleKeyring](#singlekeyring) インスタンスが作成される。 `key` が秘密鍵文字列を含む配列の場合、複数の秘密鍵を使用する [MultipleKeyring](#multiplekeyring) インスタンスが作成される。 `key` が2次元配列で、各要素に各ロールで使用する秘密鍵が格納されている場合、[RoleBasedKeyring](#rolebasedkeyring) インスタンスが生成される。

**パラメーター**

| 名称 | タイプ         | 説明                                                                                 |
| -- | ----------- | ---------------------------------------------------------------------------------- |
| 住所 | ストリング       | キーホルダーの住所。                                                                         |
| キー | string \\ | 秘密鍵文字列、秘密鍵の配列、または各要素が各 [役割](../../../../../learn/accounts.md#roles)に使用する鍵を含む2次元配列。 |

**リターン・バリュー**

| タイプ    | 説明                                                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| キーホルダー | キーリングのインスタンスが返されます。 `key`パラメータによって、[SingleKeyring](#singlekeyring)、[MultipleKeyring](#multiplekeyring)、[RoleBasedKeyring](#rolebasedkeyring)のいずれかになります。 |

**例**

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
caver.wallet.keyring.createFromPrivateKey(キー)
```

秘密鍵の文字列または [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) から `SingleKeyring` インスタンスを作成します。

**パラメーター**

| 名称 | タイプ   | 説明                                                                                                  |
| -- | ----- | --------------------------------------------------------------------------------------------------- |
| キー | ストリング | このパラメータには、秘密鍵または[KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)を指定します。 |

**リターン・バリュー**

| タイプ                         | 説明                        |
| --------------------------- | ------------------------- |
| [シングルキーリング](#singlekeyring) | SingleKeyringインスタンスが返される。 |

**例**

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

[KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 文字列から `SingleKeyring` インスタンスを作成します。

**パラメーター**

| 名称              | タイプ   | 説明                                                                                                       |
| --------------- | ----- | -------------------------------------------------------------------------------------------------------- |
| klaytnWalletKey | ストリング | The [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) string. |

**リターン・バリュー**

| タイプ                         | 説明                        |
| --------------------------- | ------------------------- |
| [シングルキーリング](#singlekeyring) | SingleKeyringインスタンスが返される。 |

**例**

```javascript
> caver.wallet.keyring.createFromKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createWithSingleKey <a href="#caver-wallet-keyring-createwithsinglekey" id="caver-wallet-keyring-createwithsinglekey"></a>

```javascript
caver.wallet.keyring.createWithSingleKey(アドレス、キー)
```

アドレスと秘密鍵の文字列から `SingleKeyring` インスタンスを作成する。

**パラメーター**

| 名称 | タイプ   | 説明                  |
| -- | ----- | ------------------- |
| 住所 | ストリング | キーホルダーの作成に使用するアドレス。 |
| キー | ストリング | 秘密鍵の文字列。            |

**リターン・バリュー**

| タイプ                         | 説明                        |
| --------------------------- | ------------------------- |
| [シングルキーリング](#singlekeyring) | SingleKeyringインスタンスが返される。 |

**例**

```javascript
> caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address：'0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key：PrivateKey { _privateKey: '0x{private key}' }.
}
```

## caver.wallet.keyring.createWithMultipleKey <a href="#caver-wallet-keyring-createwithmultiplekey" id="caver-wallet-keyring-createwithmultiplekey"></a>

```javascript
caver.wallet.keyring.createWithMultipleKey(アドレス、キー)
```

アドレスと秘密鍵の文字列から `MultipleKeyring` インスタンスを作成する。

**パラメーター**

| 名称   | タイプ   | 説明         |
| ---- | ----- | ---------- |
| 住所   | ストリング | キーホルダーの住所。 |
| キー配列 | 配列    | 秘密鍵文字列の配列。 |

**リターン・バリュー**

| タイプ                                 | 説明                           |
| ----------------------------------- | ---------------------------- |
| [MultipleKeyring](#multiplekeyring) | MultipleKeyring インスタンスが返される。 |

**例**

```javascript
> caver.wallet.keyring.createWithMultipleKey('0x{address in hex}', ['0x{private key1}', '0x{private key2}' ])
MultipleKeyring {
    _address：'0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys：[
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }.
    ]
}
```

## caver.wallet.keyring.createWithRoleBasedKey <a href="#caver-wallet-keyring-createwithrolebasedkey" id="caver-wallet-keyring-createwithrolebasedkey"></a>

```javascript
caver.wallet.keyring.createWithRoleBasedKey(アドレス、roledBasedKeyArray)
```

アドレスと 2 次元配列から `RoleBasedKeyring` インスタンスを作成します。配列の各要素には、各 [role](../../../../../learn/accounts.md#roles) に対して定義されたキーが含まれます。

**パラメーター**

| 名称              | タイプ   | 説明                      |
| --------------- | ----- | ----------------------- |
| 住所              | ストリング | キーホルダーの住所。              |
| roledBasedKey配列 | 配列    | 各ロールの秘密鍵文字列の配列を含む二次元配列。 |

**リターン・バリュー**

| タイプ                                   | 説明                             |
| ------------------------------------- | ------------------------------ |
| [RoleBasedKeyring](#rolebasedkeyring) | RoleBasedKeyring のインスタンスが返される。 |

**例**

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
caver.wallet.keyring.decrypt(キーストア, パスワード)
```

keystore v3 または v4 JSON を復号化し、復号化した Keyring インスタンスを返します。

**パラメーター**

| 名称    | タイプ    | 説明                 |
| ----- | ------ | ------------------ |
| キーストア | オブジェクト | 復号化するキーストアv3またはv4。 |
| パスワード | ストリング  | 暗号化に使用するパスワード。     |

**リターン・バリュー**

| タイプ    | 説明                                                                                                                                                  |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| キーホルダー | 復号化されたキーリングのインスタンス([SingleKeyring](#singlekeyring)、[MultipleKeyring](#multiplekeyring)、または[RoleBasedKeyring](#rolebasedkeyring)。 |

**例**

```javascript
// keystroe v4（暗号化された単一のキーリング）を復号化する
> caver.wallet.keyring.decrypt({ 
    version：4,
    id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
    address：'0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    keyring：[
        { 
            ciphertext: 'eacf496cea5e80eca291251b3743bf93dbcf7072efc3a74efeaf518e2796b15',
            cipherparams： { iv: 'd688a4319342e872cefcf51aef3ec2da' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams：{
                dklen: 32,
                salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
                n：4096,
                r: 8,
                p: 1
            },
            mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
        }.
    ]
}, 'password')
SingleKeyring {
    _address：'0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    _key：PrivateKey { _privateKey: '0x{private key}' }.
}

// keystroe v4（暗号化された複数のキーリング）を復号化する
> caver.wallet.keyring.decrypt({
    version：4,
    id: '55da3f9c-6444-4fc1-abfa-f2eabfc57501',
    address：'0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    keyring：[
        {
            ciphertext: '93dd2c777abd9b80a0be8e1eb9739cbf27c127621a5d3f81e7779e47d3bb22f6',
            cipherparams： { iv: '84f90907f3f54f53d19cbd6ae1496b86' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams：{
                dklen: 32,
                salt: '69bf176a136c67a39d131912fb1e0ada4be0ed9f882448e1557b5c4233006e10',
                n: 4096,
                r: 8,
                p: 1,
            },
            mac：'8f6d1d234f4a87162cf3de0c7fb1d4a8421cd8f5a97b86b1a8e576ffc1eb52d2',
        },
        {
            暗号文：'53d50b4e86b550b26919d9b8cea762cd3c637dfe4f2a0f18995d3401ead839a6',
            cipherparams： { iv: 'd7a6f63558996a9f99e7daabd289aa2c' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams：{
                dklen: 32,
                salt: '966116898d90c3e53ea09e4850a71e16df9533c1f9e1b2e1a9edec781e1ad44f',
                n: 4096,
                r: 8,
                p：1,
            },
            mac: 'bca7125e17565c672a110ace9a25755847d42b81aa7df4bb8f5ce01ef7213295',
        },
    ],
}, 'password')
MultipleKeyring {
    _address：'0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    _keys：[
        プライベートキー { _privateKey: '0x{private key1}' },
        プライベートキー { _privateKey: '0x{private key2}' } ]。
    ]
}

// keystroe v4（暗号化されたロールベースのキーリング）を復号化する
> caver.wallet.keyring.decrypt({
    version：4,
    id: '55da3f9c-6444-4fc1-abfa-f2eabfc57501',
    address：'0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    keyring：[
        [
            {
                ciphertext: '93dd2c777abd9b80a0be8e1eb9739cbf27c127621a5d3f81e7779e47d3bb22f6',
                cipherparams： { iv: '84f90907f3f54f53d19cbd6ae1496b86' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams：{
                    dklen: 32,
                    salt: '69bf176a136c67a39d131912fb1e0ada4be0ed9f882448e1557b5c4233006e10',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac：'8f6d1d234f4a87162cf3de0c7fb1d4a8421cd8f5a97b86b1a8e576ffc1eb52d2',
            },
            {
                暗号文：'53d50b4e86b550b26919d9b8cea762cd3c637dfe4f2a0f18995d3401ead839a6',
                cipherparams： { iv: 'd7a6f63558996a9f99e7daabd289aa2c' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams：{
                    dklen: 32,
                    salt: '966116898d90c3e53ea09e4850a71e16df9533c1f9e1b2e1a9edec781e1ad44f',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac：'bca7125e17565c672a110ace9a25755847d42b81aa7df4bb8f5ce01ef7213295',
            },
        ],
        [
            {
                ciphertext: 'f16def98a70bb2dae053f791882f3254c66d63416633b8d91c2848893e7876ce',
                cipherparams： { iv: 'f5006128a4c53bc02cada64d095c15cf' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams：{
                    dklen: 32,
                    salt: '0d8a2f71f79c4880e43ff0795f6841a24cb18838b3ca8ecaeb0cda72da9a72ce',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac：'38b79276c3805b9d2ff5fbabf1b9d4ead295151b95401c1e54aed782502fc90a',
            },
        ],
        [
            {
                ciphertext: '544dbcc327942a6a52ad6a7d537e4459506afc700a6da4e8edebd62fb3dd55ee',
                cipherparams： { iv: '05dd5d25ad6426e026818b6fa9b25818' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams：{
                    dklen: 32,
                    salt: '3a9003c1527f65c772c54c6056a38b0048c2e2d58dc0e584a1d867f2039a25aa',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac：'19a698b51409cc9ac22d63d329b1201af3c89a04a1faea3111eec4ca97f2e00f',
            },
            {
                ciphertext: 'dd6b920f02cbcf5998ed205f8867ddbd9b6b088add8dfe1774a9fda29ff3920b',
                cipherparams： { iv: 'ac04c0f4559dad80dc86c975d1ef7067' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams：{
                    dklen: 32,
                    salt: '22279c6dbcc706d7da120022a236cfe149496dca8232b0f8159d1df999569d6',
                    n: 4096,
                    r: 8,
                    p：1,
                },
                mac: '1c54f7378fa279a49a2f790a0adb683defad8535a21bdf2f3dadc48a7bddf517',
            },
        ],
    ],
}, 'password')
RoleBasedKeyring {
    _address：'0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    _keys：[
        [
            PrivateKey { _privateKey: '0x{private key1}' },
            PrivateKey { _privateKey: '0x{private key2}' }
        ],
        [
            プライベートキー { _privateKey: '0x{private key3}' }
        ],
        [
            プライベートキー { _privateKey: '0x{private key4}' },
            プライベートキー { _privateKey: '0x{private key5}' } ].
        ]
    ]
}

// keystroe v3 JSONの復号
> caver.wallet.keyring.decrypt({ 
    version: 3,
    id: '43f99d36-3905-40e6-bff8-ff0dfc380037',
    address：'0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    crypto：{
        ciphertext: 'f7296e68807837a5318502c097276a89d58d91b85e45e692aee284a27bcd0955',
        cipherparams： { iv: '03fd985d07777601078840c73cc6f7f3' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams：{
            dklen: 32,
            salt: '46f85271c43fa64ab3338c5235f1d5073bc9379d9b7ba6065c89afb816d83a8a',
            n：4096,
            r: 8,
            p: 1
        },
     mac: '947f13cd1481fa5ba186e59418ef7600fa69e9830054d59e4d5dc67176e1f967'
    }.
}, 'password')
SingleKeyring {
    _address：'0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    _key：PrivateKey { _privateKey: '0x{private key}' }.
}
```

## キーリング.getPublicKey<a href="#keyring-getpublickey" id="keyring-getpublickey"></a>

```javascript
keyring.getPublicKey()
```

公開鍵文字列を返します。 `keyring` が [SingleKeyring](#singlekeyring) のインスタンスの場合、getPublicKey は公開鍵文字列を返す。 `keyring` が [MultipleKeyring](#multiplekeyring) のインスタンスの場合、getPublicKey は公開鍵文字列の配列を返す。 `keyring`が[RoleBasedKeyring](#rolebasedkeyring)のインスタンスである場合、getPublicKeyは2次元の配列を返し、その配列には各ロールに使用される公開鍵が配列として定義されている。

**パラメーター**

| 名称 | タイプ   | 説明                                                                                                       |
| -- | ----- | -------------------------------------------------------------------------------------------------------- |
| 圧縮 | ブーリアン | (オプション) 圧縮形式かどうか (デフォルト: `false`). |

**リターン・バリュー**

| タイプ         | 説明         |
| ----------- | ---------- |
| string \\ | キーリングの公開鍵。 |

**例**

```javascript
// singleKeyringで公開鍵を取得
> keyring.getPublicKey()
'0x49b2a...'

// multipleKeyring で公開鍵を取得
> keyring.getPublicKey()
[ '0x65b51...', '0x8d85c...' ]

// roleBasedKeyring で公開鍵を取得
> keyring.getPublicKey()
[
    [ '0x2d939...', '0x6beb4...', '0xd8f2f...' ],
    [ '0xf09cd...', '0x96a63...', '0x02000...' ],
    [ '0xc2d33...', '0x3088f...', '0xab193...' ]
].
```

## キーリング・コピー<a href="#keyring-copy" id="keyring-copy"></a>

```javascript
キーリング.コピー()
```

コピーしたキーリングのインスタンスを返します。

**リターン・バリュー**

| タイプ    | 説明                                                                                                                                |
| ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| キーホルダー | コピーされたキーリング・インスタンス（[SingleKeyring](#singlekeyring)、[MultipleKeyring](#multiplekeyring)、または[RoleBasedKeyring](#rolebasedkeyring)）。 |

**例**

```javascript
// keyringがSingleKeyringのインスタンスの場合
> keyring.copy()
SingleKeyring {
    _address：'0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _key：プライベートキー { _privateKey: '0x{private key}' }。
}

// keyring が MultipleKeyring のインスタンスの場合
> keyring.copy()
MultipleKeyring {
    _address：'0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys：[
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }.
    ]
}

// keyringがRoleBasedKeyringのインスタンスの場合
> keyring.copy()
RoleBasedKeyring {
    _address：'0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys：[
        [
            PrivateKey { _privateKey: '0x{private key1}' },
            PrivateKey { _privateKey: '0x{private key2}' }
        ],
        [
            PrivateKey { _privateKey: '0x{private key3}' },
            PrivateKey { _privateKey: '0x{private key4}' }
        ],
        [
            プライベートキー { _privateKey: '0x{private key5}' },
            プライベートキー { _privateKey: '0x{private key6}' } ].
        ]
    ]
}
```

## キーホルダー<a href="#keyring-sign" id="keyring-sign"></a>

```javascript
keyring.sign(transactionHash, chainId, role [, index])
```

秘密鍵で transactionHash に署名し、署名を返す。 ユーザがインデックスパラメータを定義していない場合、`keyring.sign`はロールが使用するすべての秘密鍵を使用してトランザクションに署名します。 `index` が定義されている場合、`keyring.sign` はインデックスにある1つの秘密鍵のみを使用してトランザクションに署名する。 caver-jsで使用されているロールは、`caver.wallet.keyring.role`で確認できる。

トランザクションに署名する場合、[caver.wallet.sign](./caver-wallet.md#caver-wallet-sign)または[transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign)を使用することを推奨する。

**パラメーター**

| 名称           | タイプ         | 説明                                                                                                                                  |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| トランザクションハッシュ | ストリング       | 署名するトランザクションのハッシュ文字列。                                                                                                               |
| チェーンID       | string \\ | kaiaブロックチェーンプラットフォームのチェーンID。                                                                                                        |
| 役割           | 番号          | キーの役割を示す数字。 `caver.wallet.keyring.role`を使用することができます。                                                                                |
| インデックス       | 番号          | (オプション) 使用したい秘密鍵のインデックス。 このインデックスは、各ロールに定義されたプライベートキーの配列の長さより小さくなければならない。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用する。 |

**リターン・バリュー**

| タイプ | 説明                                                                               |
| --- | -------------------------------------------------------------------------------- |
| 配列  | SignatureData](#signaturedata) の配列。 |

**例**

```javascript
//
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleTransactionKey)
[
    SignatureData { _v: '0x5044', _r: '0x7a8b6...', _s: '0x17139...' },
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
]

// roleTransactionKeyにインデックス
> keyring.Sign('0xe9a9')を持つ2つのプライベートキーを持つroleBasedKeyringを使用。sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleTransactionKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
]

// roleAccountUpdateKeyに2つの秘密鍵を持つroleBasedKeyringを使用
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleAccountUpdateKey)
[
    SignatureData { _v: '0x5044', _r: '0xdbce8...', _s: '0x039a6...' },
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
]

// roleAccountUpdateKeyに2つのプライベートキーを持つroleBasedKeyringをインデックスで使用
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleAccountUpdateKey, 1)
[
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
]

// roleFeePayerKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey)
[
    SignatureData { _v: '0x5043', _r: '0xe48bf...', _s: '0x1cf36...' },
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
]

// roleFeePayerKeyにインデックス
> keyring.Sign('0xe9a550')を持つ2つのプライベートキーを持つroleBasedKeyringを使用。sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
].
```

## キーリング<a href="#keyring-ecsign" id="keyring-ecsign"></a>

```javascript
keyring.ecsign(hash, role [, index])
```

秘密鍵を使ってハッシュ化されたデータに署名し、Vが0または1（secp256k1曲線のy値のパリティ）である署名を返す。

この関数は特定のトランザクション・タイプにのみ使用される。 したがって、トランザクションに署名する際には、[caver.wallet.sign](./caver-wallet.md#caver-wallet-sign)または[transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign)を使用することを推奨する。

**パラメーター**

| 名称     | タイプ   | 説明                                                                                                                                  |
| ------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------- |
| ハッシュ   | ストリング | 署名するハッシュ文字列。                                                                                                                        |
| 役割     | 番号    | キーの役割を示す数字。 `caver.wallet.keyring.role`を使用することができます。                                                                                |
| インデックス | 番号    | (オプション) 使用したい秘密鍵のインデックス。 このインデックスは、各ロールに定義されたプライベートキーの配列の長さより小さくなければならない。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用する。 |

**リターン・バリュー**

| タイプ | 説明                                                                               |
| --- | -------------------------------------------------------------------------------- |
| 配列  | SignatureData](#signaturedata) の配列。 |

**例**

```javascript
> keyring.ecsign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', caver.wallet.keyring.role.roleTransactionKey)
[
    SignatureData { _v: '0x00', _r: '0x7a8b6...', _s: '0x17139...' }
]。
```

## キーリング.signMessage<a href="#keyring-signmessage" id="keyring-signmessage"></a>

```javascript
keyring.signMessage(message, role [, index])
```

カイア固有の接頭辞を持つメッセージに署名する。 これでカイア固有のシグネチャーを計算する：

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

ユーザがindexパラメータを定義していない場合、`keyring.signMessage`はロールが使用するすべての秘密鍵でメッセージに署名します。 index パラメータが指定された場合、`keyring.signMessage` は、指定されたインデックスの 1 つの秘密鍵のみを使用してメッセージに署名します。 caver-jsで使用されるロールは、`caver.wallet.keyring.role`で確認できる。

**パラメーター**

| 名称     | タイプ   | 説明                                                                                                                                  |
| ------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------- |
| メッセージ  | ストリング | 署名するメッセージ                                                                                                                           |
| 役割     | 番号    | キーの役割を示す数字。 `caver.wallet.keyring.role`を使用することができます。                                                                                |
| インデックス | 番号    | (オプション) 使用したい秘密鍵のインデックス。 このインデックスは、各ロールに定義されたプライベートキーの配列の長さより小さくなければならない。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用する。 |

**リターン・バリュー**

| タイプ    | 説明              |
| ------ | --------------- |
| オブジェクト | 署名の結果を含むオブジェクト。 |

返されるオブジェクトには以下の内容が含まれる：

| 名称        | タイプ   | 説明                                                                               |
| --------- | ----- | -------------------------------------------------------------------------------- |
| メッセージハッシュ | ストリング | kaia固有のプレフィックスを持つメッセージのハッシュ。                                                     |
| 署名        | 配列    | SignatureData](#signaturedata) の配列。 |
| メッセージ     | ストリング | 署名するメッセージ                                                                        |

**例**

```javascript
// roleTransactionKeyで署名
> keyring.signMessage('message to sign', caver.wallet.keyring.role.roleTransactionKey)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures：[
        SignatureData { _v: '0x1b', _r: '0x2dfc6...', _s: '0x15038...' }
    ],
    message：'message to sign'
}.

// roleFeePayerKey とインデックスを使って署名する
> keyring.signMessage('message to sign', caver.wallet.keyring.role.roleFeePayerKey, 1)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures：[
        SignatureData { _v: '0x1b', _r: '0x2dfc6...', _s: '0x15038...' }
    ],
    message：'署名するメッセージ'
}.
```

## キーリング.getKeyByRole<a href="#keyring-getkeybyrole" id="keyring-getkeybyrole"></a>

```javascript
keyring.getKeyByRole(ロール)
```

パラメータとして入力されたロールが使用する秘密鍵を返します。

**パラメーター**

| 名称 | タイプ | 説明                                                   |
| -- | --- | ---------------------------------------------------- |
| 役割 | 番号  | キーの役割を示す数字。 `caver.wallet.keyring.role`を使用することができます。 |

**リターン・バリュー**

| タイプ                            | 説明                                                                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| [PrivateKey](#privatekey) \\ | PrivateKey](#privatekey) のインスタンス、またはロールが使用する [PrivateKey](#privatekey) インスタンスを含む配列。 |

**例**

```javascript
// getKeyByRole に singleKeyring を指定します。 
// singleKeyringは、ロールに関係なく同じPrivateKeyを1つ返す。
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
PrivateKey { _privateKey: '0x{private key}' }.

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
プライベートキー { _privateKey: '0x{private key}' } > keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey) プライベートキー { _privateKey: '0x '

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
プライベートキー { _privateKey: '0x{private key}' } // getKeyByRole(caver.wallet.keyring.roleAccountUpdateKey)。

// getKeyByRole with multipleKeyring. 
// multipleKeyring を使用すると、ロールに関係なく、PrivateKey インタンスの同じ配列が返される
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' } ].
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
[
    プライベートキー { _privateKey: '0x{private key1}' },
    プライベートキー { _privateKey: '0x{private key2}' } ]。
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
[
    プライベートキー { _privateKey: '0x{private key1}' },
    プライベートキー { _privateKey: '0x{private key2}' } ]。
]

// getKeyByRole に roleBasedKeyring を指定する。 
//
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
[
    PrivateKey { _privateKey: '0x{private key1}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
[
    プライベートキー { _privateKey: '0x{private key2}' },
    プライベートキー { _privateKey: '0x{private key3}' } ].
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
[
    プライベートキー { _privateKey: '0x{private key4}' },
    プライベートキー { _privateKey: '0x{private key5}' },
    プライベートキー { _privateKey: '0x{private key6}' } ]。
]
```

## keyring.getKlaytnWalletKey <a href="#keyring-getklaytnwalletkey" id="keyring-getklaytnwalletkey"></a>

```javascript
keyring.getKlaytnWalletKey()
```

キーホルダーの [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 文字列を返します。 MultipleKeyring](#multiplekeyring)または[RoleBasedKeyring](#rolebasedkeyring)では、[KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)は使用できません。 この場合、[keyring.encrypt](#keyring-encrypt) を使用する。

**リターン・バリュー**

| タイプ   | 説明                                                                                   |
| ----- | ------------------------------------------------------------------------------------ |
| ストリング | キーホルダーの[KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)。 |

**例**

```javascript
> keyring.getKlaytnWalletKey()
'0x{private key}0x{type}0x{address in hex}'
```

## キーリング.toAccount<a href="#keyring-toaccount" id="keyring-toaccount"></a>

```javascript
keyring.toAccount([オプション])
```

kaiaaccounts](../../../../../learn/accounts.md#klaytn-accounts) の [AccountKey](../../../../../learn/accounts.md#account-key) を更新するための [Account](../caver.account.md#account) インスタンスを返します。 Account](../caver.account.md#account)インスタンスには、[AccountKey](../caver.account.md#accountkeylegacy)インスタンスがあり、その中に公開鍵を含めることができる。この公開鍵はkaia Networkに送信され、トランザクションの検証に使用される。 アカウント](../caver.account.md#account)の詳細については、[アカウント更新](../../get-started.md#account-update)を参照。

カイアに保存されている[Account](../../../../../learn/accounts.md#klaytn-accounts)の[AccountKey](../../../../../learn/accounts.md#account-key)を更新すると、古い秘密鍵は使えなくなるので注意。 返された[Account](../caver.account.md#account)インスタンスを使ってkaiaの[kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts)の情報を更新する方法については、[Getting started](../../get-started.md#account-update)を参照してください。

キーリング内の秘密鍵のタイプに応じて、返される[Account](../caver.account.md#account)インスタンスは以下のように分類される。

- キーホルダーに秘密鍵文字列が含まれている場合：キーリングのアドレスと [AccountKeyPublic](../caver.account.md#accountkeypublic) のインスタンスを含む [Account](../caver.account.md#account) インスタンスを返す。
- キーホルダーに秘密鍵文字列が含まれている場合：キーリングのアドレスを含む [Account](../caver.account.md#account) インスタンスと [AccountKeyWeigthedMultiSig](../caver.account.md#accountkeyweightedmultisig) インスタンスを返す。
- キーホルダーに役割ごとに異なる秘密鍵文字列が含まれている場合：キーリングのアドレスを含む [Account](../caver.account.md#account) インスタンスと、[AccountKeyRoleBased](../caver.account.md#accountkeyrolebased) インスタンスを返す。

**パラメーター**

| 名称    | タイプ                                                                         | 説明                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| オプション | [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) \\ | (オプション) [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) インスタンスには、既存のアカウントを複数の秘密鍵を持つものに更新する際に定義すべき情報が含まれています。 鍵リングが役割ごとに異なる秘密鍵を使用する場合、[WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) インスタンスを役割ごとに配列で定義する必要があります。 鍵リングが複数の秘密鍵を使用し、optionsパラメータが定義されていない場合、デフォルトの[WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions)の閾値1、各鍵の重み付け1が使用される。 |

**リターン・バリュー**

| タイプ                                  | 説明                                                                                                                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [アカウント](../caver.account.md#account) | ユーザがkaiaで自分のアカウントのAccountKeyを更新するときに使用するAccountインスタンス。 アカウントの既存のキーリング（または既存の秘密鍵）を新しいキーリング（または新しい秘密鍵）に置き換えたい場合は、事前にkaiaにアカウント更新トランザクションを送信してAccountKeyを更新する必要があることに注意してください。 |

**例**

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

## キーリング.encrypt<a href="#keyring-encrypt" id="keyring-encrypt"></a>

```javascript
keyring.encrypt(password [, options])
```

キーリングを暗号化し、keystore v4 standard を返す。 詳しくは[KIP-3](https://kips.kaia.io/KIPs/kip-3)を参照されたい。

**パラメーター**

| 名称    | タイプ   | 説明                                                                             |
| ----- | ----- | ------------------------------------------------------------------------------ |
| パスワード | ストリング | 暗号化に使用するパスワード。 暗号化されたキーストアは、このパスワードで復号化できる。                                    |
| オプション | ストリング | (オプション) `options` パラメータでは、encrypt を使用する際に使用する値を指定することができます。 |

**リターン・バリュー**

| タイプ    | 説明             |
| ------ | -------------- |
| オブジェクト | 暗号化されたキーストアv4。 |

返されるオブジェクトには以下の内容が含まれる：

| 名称     | タイプ   | 説明                            |
| ------ | ----- | ----------------------------- |
| バージョン  | 番号    | キーストアのバージョン。                  |
| アイドル   | ストリング | keystore の ID。                |
| 住所     | ストリング | 暗号化された[Keyring](#class)のアドレス。 |
| キーホルダー | 配列    | 暗号化された秘密鍵。                    |

詳しくは[KIP-3](https://kips.kaia.io/KIPs/kip-3)を参照されたい。

**例**

```javascript
// singleKeyringを暗号化する
> keyring.encrypt('password')
{ 
    バージョン：4,
    id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
    address：'0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    keyring：[
        { 
            ciphertext: 'eacf496cea5e80eca291251b3743bf93dbcf7072efc3a74efeaf518e2796b15',
            cipherparams： { iv: 'd688a4319342e872cefcf51aef3ec2da' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams：{
                dklen: 32,
                salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
                n：4096,
                r: 8,
                p: 1
            },
            mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
        }.
    ]
}

// multipleKeyringを暗号化する
> keyring.encrypt('password')
{
    version：4,
    id: 'b9fe7bb3-3ae9-41df-a0f2-5f20f525a290',
    address：'0x6e039858fe4c65fe6605fde722ef94a78a3fefed',
    keyring：[
        { 
            ciphertext: '91d62dd3be9a854387c2595b0a53d561b2c99c8fe4a675600a16532f48f5c750',
            cipherparams： { iv: '853b3804c6627af342a8b35474105953' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams：{
                dklen: 32,
                salt: '3a3b4d9bd97413b2bef95798dc27a29c73d4802ac7258e8b126eeb909f822c72',
                n: 4096,
                r: 8,
                p: 1
            },
            mac：'b5fe00edb3f9e5c02056b276380b30a7e61ed8e2925b898bc3d528138cd3c939'
        },
        {
            ciphertext: '494486f72355d95991ba95fd5ed7eeecf0f9a3d2fa0a94400125befb4b4c043f',
            cipherparams： { iv: '64be3daa213e359a404ec2e38c1ac9e1' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams：{
                dklen: 32,
                salt: 'f089ee99bfe00f9a43b562624b9376b99963b9d4b8681c076935431dc5c98177',
                n：4096,
                r: 8,
                p: 1
            },
            mac: '4c8a72a3acb8b07d81033a8bc91f01a4025c684e882e758acde441323a75605f'
        }.
    ]
}

// roleBasedKeyring を暗号化する
> keyring.encrypt('password')
{
    version：4,
    id: '99d27cfe-8e3f-427c-bd4c-e4e3cd43955b',
    address：'0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a',
    keyring：[
        [
            {
                ciphertext: '07a3d8c1c6a01734e429bb4ea88d282b3547fa422653f9547c0544bfca011af0',
                cipherparams： { iv: '707177c48b5bfc1f88e91f10eb327b1b' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams：{ dklen: 32, salt: '452f3e41d9e58b42d348b326319fc27b29ed5f5177e063087f8cb272c6b73fe3', n: 4096, r: 8, p: 1 },
                mac：'bccd141b9056f7ee26b8e9a4ef52d231403162ed2593df8f2e6b2f2d26a737d2',
            },
            {
                ciphertext: 'c94defa5049b910eb57d46125e3dbdb9d32bfb85f3915aa96e25e75d2346970f',
                cipherparams： { iv: 'fae425c4a44c881e629ccdc0fcf53916' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams：{ dklen: 32, salt: '37302d0a0625321193e482da55e19a0a51ac250cf4857ecb13112b8c88cbdf44', n: 4096, r: 8, p: 1 },
                mac：'04f7b2879b7e9604356fd4db532c981b4ea95078c25694e591e7cc2a5c613f1',
            },
        ],

        [
            {
                暗号文：'015ef2deab867b887fa29c866941512af848e4b547d74a39f44cc4c9ef204b5f',
                cipherparams： { iv: '230271676c4501a860b19b325b1850a6' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams：{ dklen: 32, salt: 'eb73f9cacea4e0b38634679102ab5b8f0e84464c2fa3ca07d11ebcdfb7a95519', n: 4096, r: 8, p: 1 },
                mac：'d76a0f22b2f5a23dac30be820260b3fc738083b797d5c608b23bce8a69f63256',
            },
        ],

        [
            {
                ciphertext: '70870f4dd813fc7c0c4ef64ebba03f15c81677d2558d646b3d143ab8e0d27ec2',
                cipherparams： { iv: '841be9a25127fca0cc79740763ec3e55' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams：{ dklen: 32, salt: '089ef66590b699c347caddafa592c8f074948b0ca6e2957bae45d005cd55a874', n: 4096, r: 8, p: 1 },
                mac：'6e1ad546d9e3ad1f3c3419ace4c9daf34a310001875b1a3228dbfd1891030bff',
            },
        ],
    ],
}.
```

## キーリング.encryptV3<a href="#keyring-encryptv3" id="keyring-encryptv3"></a>

```javascript
keyring.encryptV3(password [, options])
```

SingleKeyring](#singlekeyring) のインスタンスを暗号化し、keystore v3 standard を返す。

MultipleKeyring](#multiplekeyring)と[RoleBasedKeyring](#rolebasedkeyring)はencryptV3を使用できないことに注意。 この場合、[keyring.encrypt](#keyring-encrypt)をキーストアV4標準で使用してください。

**パラメーター**

| 名称    | タイプ   | 説明                                                                     |
| ----- | ----- | ---------------------------------------------------------------------- |
| パスワード | ストリング | 暗号化に使用するパスワード。 暗号化されたキーストアは、このパスワードで復号化できる。                            |
| オプション | ストリング | (オプション) 暗号化に使用するパスワード。 暗号化されたキーストアは、このパスワードで復号化できる。 |

**リターン・バリュー**

| タイプ    | 説明             |
| ------ | -------------- |
| オブジェクト | 暗号化されたキーストアv3。 |

返されるオブジェクトには以下の内容が含まれる：

| 名称    | タイプ    | 説明                              |
| ----- | ------ | ------------------------------- |
| バージョン | 番号     | キーストアのバージョン。                    |
| アイドル  | ストリング  | keystore の ID。                  |
| 住所    | ストリング  | 暗号化された [Keyring](#class) のアドレス。 |
| 暗号    | オブジェクト | 暗号化された秘密鍵。                      |

**例**

```javascript
> keyring.encryptV3('password')
{ 
    version: 3,
    id: '43f99d36-3905-40e6-bff8-ff0dfc380037',
    address：'0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    crypto：{
        ciphertext: 'f7296e68807837a5318502c097276a89d58d91b85e45e692aee284a27bcd0955',
        cipherparams： { iv: '03fd985d07777601078840c73cc6f7f3' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams：{
            dklen: 32,
            salt: '46f85271c43fa64ab3338c5235f1d5073bc9379d9b7ba6065c89afb816d83a8a',
            n：4096,
            r: 8,
            p: 1
        },
     mac: '947f13cd1481fa5ba186e59418ef7600fa69e9830054d59e4d5dc67176e1f967'
    }.
}
```

## キーリングを切り離す<a href="#keyring-isdecoupled" id="keyring-isdecoupled"></a>

```javascript
キーリングを切り離す()
```

キーリングが切り離されたキーを持っている場合に `true` を返す。

**リターン・バリュー**

| タイプ   | 説明                                  |
| ----- | ----------------------------------- |
| ブーリアン | キーリングが切り離されたキーを持っている場合は `true` となる。 |

**例**

```javascript
> keyring.isDecoupled()
true

> keyring.isDecoupled()
false
```
