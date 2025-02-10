# ケイバーウォレット

`caver.wallet` は、[Keyring](./keyring.md) インスタンスをインメモリ・ウォレットで管理するパッケージである。 `caver.wallet` はすべての [SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)、[RoleBasedKeyring](./keyring.md#rolebasedkeyring)を受け入れ、アドレスごとに管理する。

## クラス<a href="#class" id="class"></a>

### キーリング・コンテナ<a href="#keyringcontainer" id="keyringcontainer"></a>

```javascript
ケイバーウォレット
```

`KeyringContainer`は、[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)、[RoleBasedKeyring](./keyring.md#rolebasedkeyring)のインスタンスを管理するクラスです。 Caver がインスタンス化されると、`caver.wallet` に KeyringContainer インスタンスが作成されます。 `caver.wallet`を通じて、インメモリ・ウォレットにキーリング・インスタンスを保存し、管理することができる。

**プロパティ**

| 名称 | タイプ | 説明                         |
| -- | --- | -------------------------- |
| 長さ | 番号  | keyringContainer内のキーリングの数。 |

## caver.wallet.generate <a href="#caver-wallet-generate" id="caver-wallet-generate"></a>

```javascript
caver.wallet.generate(numberOfKeyrings [, entropy])
```

ランダムに生成された秘密鍵で、[SingleKeyring](./keyring.md#singlekeyring) のインスタンスを keyringContainer 内に生成する。

**パラメーター**

| 名称     | タイプ   | 説明                                                         |
| ------ | ----- | ---------------------------------------------------------- |
| キーリング数 | 番号    | 作成する [SingleKeyring](./keyring.md#singlekeyring) インスタンスの数。 |
| エントロピー | ストリング | (オプション) エントロピーを高めるためのランダムな文字列。          |

**リターン・バリュー**

| タイプ | 説明              |
| --- | --------------- |
| 配列  | 生成されたアドレスを含む配列。 |

**例**

```javascript
// エントロピーなしで生成
> caver.wallet.generate(3)
[
    '0xb4b0c3781082cf818bfaf5adfc73fdf59d92c1d',
    '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    '0xed2fe179c18fa528da2392532998560bd1008511'
]。

// エントロピーで生成
> caver.wallet.generate(3, caver.utils.randomHex(32))
[
    '0xb4b0c3781082cf818bfaf5adfc73fdf59d92c1cd',
    '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    '0xed2fe179c18fa528da2392532998560bd1008511'
].
```

## caver.wallet.newKeyring <a href="#caver-wallet-newkeyring" id="caver-wallet-newkeyring"></a>

```javascript
caver.wallet.newKeyring(アドレス, キー)
```

与えられたパラメータでキーリングのインスタンスを作成し、`caver.wallet` に追加する。

`key` が秘密鍵文字列の場合、単一の秘密鍵を使用する [SingleKeyring](./keyring.md#singlekeyring) インスタンスが作成される。 `key` が秘密鍵文字列を含む配列の場合、複数の秘密鍵を使用する [MultipleKeyring](./keyring.md#multiplekeyring) インスタンスが作成される。 `key` が2次元配列で、各要素に各ロールで使用する秘密鍵が格納されている場合、[RoleBasedKeyring](./keyring.md#rolebasedkeyring) インスタンスが生成される。 作成されたキーホルダーは `caver.wallet` に追加される。

**パラメーター**

| 名称   | タイプ         | 説明                                                                                     |
| ---- | ----------- | -------------------------------------------------------------------------------------- |
| アドレス | ストリング       | アドレス文字列。                                                                               |
| キー   | string \\ | 秘密鍵文字列、秘密鍵の配列、または各配列要素が各 [役割](../../../../../learn/accounts.md#roles)に定義された鍵を含む 2D 配列。 |

**リターン・バリュー**

| タイプ    | 説明                                                                                                                                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | caver.walletに追加されたキーリングのインスタンス([SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)、または[RoleBasedKeyring](./keyring.md#rolebasedkeyring)が返されます。 |

**例**

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
caver.wallet.updateKeyring(キーリング)
```

`caver.wallet`内のキーホルダーを更新する。 新しい `keyring` インスタンス（[SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)、または [RoleBasedKeyring](./keyring.md#rolebasedkeyring)）をパラメータとして渡すと、 `keyring` インスタンスの `address` プロパティと一致する `caver.wallet` に保存されている既存のキーリングが検出され、指定されたキーリングに置き換えられます。 一致するキーリングが見つからない場合、エラーが発生します。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                                                                                                               |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| キーホルダー | オブジェクト | `caver.wallet`に格納する新しいキーリング([SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)、または[RoleBasedKeyring](./keyring.md#rolebasedkeyring)。 |

**リターン・バリュー**

| タイプ    | 説明                                                                                                                                                                                                    |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | `caver.wallet`に格納されている更新されたキーリング([SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)、または[RoleBasedKeyring](./keyring.md#rolebasedkeyring)。 |

**例**

```javascript
> caver.wallet.updateKeyring(newKeyring)
SingleKeyring {
    _address：'0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key：プライベートキー { _privateKey: '0x{private key}' }。
}
```

## caver.wallet.getKeyring <a href="#caver-wallet-getkeyring" id="caver-wallet-getkeyring"></a>

```javascript
caver.wallet.getKeyring(アドレス)
```

`caver.wallet`のアドレスに対応するキーリングのインスタンスを返します。

**パラメーター**

| 名称 | タイプ   | 説明                |
| -- | ----- | ----------------- |
| 住所 | ストリング | 問い合わせるキーリングのアドレス。 |

**リターン・バリュー**

| タイプ    | 説明                                                                                                                                                                                                              |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | 見つかったキーリングのインスタンス([SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)、または `caver.wallet` に格納されている [RoleBasedKeyring](./keyring.md#rolebasedkeyring)。 |

**例**

```javascript
> caver.wallet.getKeyring('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
SingleKeyring {
    _address：'0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key：プライベートキー { _privateKey: '0x{private key}' }。
}
```

## caver.wallet.isExisted <a href="#caver-wallet-isexisted" id="caver-wallet-isexisted"></a>

```javascript
caver.wallet.isExisted(アドレス)
```

アドレスに一致するキーリングがあれば `true` を返す。

**パラメーター**

| 名称 | タイプ   | 説明                  |
| -- | ----- | ------------------- |
| 住所 | ストリング | 存在を確認するキーホルダーのアドレス。 |

**リターン・バリュー**

| タイプ   | 説明                                                   |
| ----- | ---------------------------------------------------- |
| ブーリアン | `true`は、`caver.wallet`にそのアドレスと一致するキーリングが存在することを意味する。 |

**例**

```javascript
> caver.wallet.isExisted('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
true
```

## caver.wallet.add <a href="#caver-wallet-add" id="caver-wallet-add"></a>

```javascript
caver.wallet.add(キーリング)
```

キーリングのインスタンスを `caver.wallet` に追加する。 新しく指定されたキーリングが `caver.wallet` に既に存在するキーリングと同じアドレスである場合、エラーを返す。 この場合、[updateKeyring](#caver-wallet-updatekeyring) を使って `caver.wallet` 内の既存のキーリングを更新する。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                                                                                                                   |
| ------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| キーホルダー | オブジェクト | `caver.wallet`に追加するキーリングのインスタンス([SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)、または[RoleBasedKeyring](./keyring.md#rolebasedkeyring)。 |

**リターン・バリュー**

| タイプ    | 説明                                                                                                                                                                                             |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | `caver.wallet`に追加されたキーリング([SingleKeyring](./keyring.md#singlekeyring)、[MultipleKeyring](./keyring.md#multiplekeyring)、または[RoleBasedKeyring](./keyring.md#rolebasedkeyring)。 |

**例**

```javascript
> caver.wallet.add(keyring)
SingleKeyring {
    _address：'0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key：プライベートキー { _privateKey: '0x{private key}' }。
}
```

## caver.wallet.remove <a href="#caver-wallet-remove" id="caver-wallet-remove"></a>

```javascript
caver.wallet.remove(アドレス)
```

与えられたキーリングのアドレスと一致するアドレスのキーリングを `caver.wallet` から削除する。

**パラメーター**

| 名称 | タイプ   | 説明                              |
| -- | ----- | ------------------------------- |
| 住所 | ストリング | `caver.wallet`で削除するキーホルダーのアドレス。 |

**リターン・バリュー**

| タイプ   | 説明                                           |
| ----- | -------------------------------------------- |
| ブーリアン | キーリングが `caver.wallet` から削除された場合は `true` を返す。 |

**例**

```javascript
> caver.wallet.remove('0x6a3edfad6d1126020d5369e9097db39281876c5d')
true
```

## caver.wallet.signMessage <a href="#caver-wallet-signmessage" id="caver-wallet-signmessage"></a>

```javascript
caver.wallet.signMessage(address, message, role [, index])
```

caver.walletに格納されているキーリングを使用して、kaia固有のプレフィックスでメッセージに署名する。 これでカイア固有のシグネチャーを計算する：

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

ユーザがindexパラメータを指定しなかった場合、`caver.wallet.signMessage`はロールが使用するすべての秘密鍵を使用してメッセージに署名します。 index パラメータが指定された場合、`caver.wallet.signMessage` は、指定されたインデックスの 1 つの秘密鍵のみを使用してメッセージに署名します。 caver-jsで使用されるロールは、`caver.wallet.keyring.role`から見つけることができる。

**パラメーター**

| 名称     | タイプ   | 説明                                                                                                                                  |
| ------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 住所     | ストリング | 使用するキーホルダーのアドレス。                                                                                                                    |
| メッセージ  | ストリング | 署名するメッセージ                                                                                                                           |
| 役割     | 番号    | キーの役割を示す数字。 `caver.wallet.keyring.role`を使用することができます。                                                                                |
| インデックス | 番号    | (オプション) 使用したい秘密鍵のインデックス。 このインデックスは、各ロールに定義されたプライベートキーの配列の長さより小さくなければならない。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用する。 |

**リターン・バリュー**

| タイプ    | 説明              |
| ------ | --------------- |
| オブジェクト | 署名の結果を含むオブジェクト。 |

返されるオブジェクトには以下の内容が含まれる：

| 名称        | タイプ   | 説明                                                                                                                           |
| --------- | ----- | ---------------------------------------------------------------------------------------------------------------------------- |
| メッセージハッシュ | ストリング | kaia固有のプレフィックスを持つメッセージのハッシュ。                                                                                                 |
| 署名        | 配列    | SignatureData](./keyring.md#signaturedata) の配列。 |
| メッセージ     | ストリング | 署名するメッセージ                                                                                                                    |

**例**

```javascript
//
> caver.wallet.signMessage('0x386a4bb40abbfaa59cecdc3ced202475895fd569', '署名するメッセージ', caver.wallet.keyring.role.roleTransactionKey)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures：[
        SignatureData { _v: '0x1c', _r: '0xb3239...', _s: '0x584d2...' },
        SignatureData { _v: '0x1b', _r: '0x13c64...', _s: '0x60c61...' }
    ],
    message：'message to sign'
}.

//
> caver.wallet.signMessage('0x386a4bb40abbfaa59cecdc3ced202475895fd569', '署名するメッセージ', caver.wallet.keyring.role.roleTransactionKey, 1)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures：[
        SignatureData { _v: '0x1b', _r: '0x13c64...', _s: '0x60c61...' }
    ],
    message：'署名するメッセージ'
}.
```

## caver.wallet.sign <a href="#caver-wallet-sign" id="caver-wallet-sign"></a>

```javascript
caver.wallet.sign(address, transaction [, index] [, hasher])
```

トランザクションの `sender` としてトランザクションに署名し、`caver.wallet` 内の keyring を使用してトランザクションオブジェクトに `signatures` を追加する。

アカウント更新](../caver-transaction/basic.md#accountupdate)トランザクションの場合は、[roleTransactionKey](../../../../../learn/accounts.md#roles)を使用し、それ以外の場合は、[roleTransactionKey](../../../../../learn/accounts.md#roles)を使用する。 ユーザが `index` を定義していない場合、`caver.wallet.sign` はロールが使用するすべての秘密鍵を使用してトランザクションに署名する。 `index` が定義されている場合、`caver.wallet.sign` は、指定されたインデックスの 1 つの秘密鍵のみを使用してトランザクションに署名します。

**パラメーター**

| 名称       | タイプ    | 説明                                                                                                                                                                                                                                                                                              |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 住所       | ストリング  | 使用するキーホルダーのアドレス。                                                                                                                                                                                                                                                                                |
| トランザクション | オブジェクト | Transaction](../caver-transaction/caver-transaction.md#class)のインスタンス。                                                                                                                              |
| インデックス   | 番号     | (オプション) 使用したい秘密鍵のインデックス。 このインデックスは、各ロールに定義されたプライベートキーの配列の長さより小さくなければならない。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用する。                                                                                                                                                             |
| ハッシャー    | 機能     | (オプション) トランザクションのハッシュを取得するためのハッシュ関数。 パラメータとして `hasher` を指定すると、caver-js で実装されているトランザクションハッシュのデフォルトの計算方法の代わりに、トランザクションハッシュを計算する。 See [Basic](../../../../../build/transactions/basic.md) for details about the default method for transaction hash generation. |

**リターン・バリュー**

オブジェクト`を返す `Promise\` ：署名されたトランザクション。

| タイプ    | 説明                                                        |
| ------ | --------------------------------------------------------- |
| オブジェクト | 署名されたトランザクションインスタンス。 署名は `transaction.signatures` に追加される。 |

トランザクション・タイプ別のフィールドの詳細については、[caver.transaction](../caver-transaction/caver-transaction.md)を参照のこと。

**例**

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

トランザクションの `fee payer` として署名し、`caver.wallet` 内のキーホルダーを使用してトランザクショ ンオブジェクトに `feePayerSignatures` を追加する。

料金支払者としてトランザクションに署名するには、[roleFeePayerKey](../../../../../learn/accounts.md#roles) を使用する。 ユーザが `index` を定義していない場合、`caver.wallet.signAsFeePayer` はロールが使用するすべての秘密鍵を使用してトランザクションに署名します。 `index` が定義されている場合、`caver.wallet.signAsFeePayer` は指定されたインデックスの 1 つの秘密鍵のみを使用してトランザクションに署名します。

`transaction.feePayer`が定義されていない場合は、`caver.wallet`から生成されたキーリングのアドレスが割り当てられる。

**パラメーター**

| 名称       | タイプ    | 説明                                                                                                                                                                     |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 住所       | ストリング  | 使用するキーホルダーのアドレス。                                                                                                                                                       |
| トランザクション | オブジェクト | FeeDelegatedTransaction](../caver-transaction/fee-delegation.md) のインスタンス。 |
| インデックス   | 番号     | (オプション) 使用したい秘密鍵のインデックス。 このインデックスは、各ロールに定義されたプライベートキーの配列の長さより小さくなければならない。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用する。                                    |
| ハッシャー    | 機能     | (オプション) トランザクションハッシュを取得する関数。 hasherがパラメータとして定義されている場合、caver-jsのデフォルトの実装ではなく、トランザクションハッシュを取得するために使用されます。                                             |

**リターン・バリュー**

オブジェクト`を返す `Promise\` ：署名されたトランザクション。

| タイプ    | 説明                                                                  |
| ------ | ------------------------------------------------------------------- |
| オブジェクト | 署名されたトランザクションインスタンス。 署名結果は `transaction.feePayerSignatures` に追加される。 |

トランザクション・タイプ別のフィールドの詳細については、[caver.transaction](../caver-transaction/caver-transaction.md)を参照のこと。

**例**

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
