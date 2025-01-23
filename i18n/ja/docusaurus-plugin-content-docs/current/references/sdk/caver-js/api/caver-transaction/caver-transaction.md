# ケイバー・トランザクション

`caver.transaction` はトランザクションに関する機能を提供するパッケージである。

## クラス<a href="#class" id="class"></a>

各トランザクション・クラスの詳細については、以下の表を参照されたい：

|                 | ベーシック                                                       | 手数料の委任                                                                                    | 料金の一部委任                                                                                                                |
| --------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| レガシー・トランザクション   | [LegacyTransaction](./basic.md#legacytransaction)           | 該当なし                                                                                      | 該当なし                                                                                                                   |
| バリュー・トランスファー    | [ValueTransfer](./basic.md#valuetransfer)                   | [フィー委任価値譲渡](./fee-delegation.md#feedelegatedvaluetransfer)                                | [比率付きフィー委任価値移転](./partial-fee-delegation.md#feedelegatedvaluetransferwithratio)                                        |
| バリュー・トランスファーメモ  | [ValueTransferMemo](./basic.md#valuetransfermemo)           | [フィーデレ移籍メモ](./fee-delegation.md#feedelegatedvaluetransfermemo)                            | [料金委任価値譲渡メモ比率](./partial-fee-delegation.md#feedelegatedvaluetransfermemowithratio)                                     |
| スマートコントラクトデプロイ  | [SmartContractDeploy](./basic.md#smartcontractdeploy)       | [FeeDelegatedSmartContractDeploy](./fee-delegation.md#feedelegatedsmartcontractdeploy)    | [FeeDelegatedSmartContractDeployWithRatio](./partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)       |
| スマート契約実行        | [SmartContractExecution](./basic.md#smartcontractexecution) | [フィー・デレゲート・スマート・コントラクト・エクスキューション](./fee-delegation.md#feedelegatedsmartcontractexecution) | [FeeDelegatedSmartContractExecutionWithRatio](./partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) |
| アカウント更新         | [アカウント更新](./basic.md#accountupdate)                         | [フィー委任アカウント更新](./fee-delegation.md#feedelegatedaccountupdate)                             | [FeeDelegatedAccountUpdateWithRatio](./partial-fee-delegation.md#feedelegatedaccountupdatewithratio)                   |
| キャンセル           | [キャンセル](./basic.md#cancel)                                  | [フィーデレキャンセル](./fee-delegation.md#feedelegatedcancel)                                      | [レシオ付きフィー委任キャンセル](./partial-fee-delegation.md#feedelegatedcancelwithratio)                                             |
| チェーンデータアンカリング   | [ChainDataAnchoring](./basic.md#chaindataanchoring)         | [FeeDelegatedChainDataAnchoring](./fee-delegation.md#feedelegatedchaindataanchoring)      | [FeeDelegatedChainDataAnchoringWithRatio](./partial-fee-delegation.md#feedelegatedchaindataanchoringwithratio)         |
| イーサリアムアクセスリスト   | [イーサリアムアクセスリスト](./basic.md#ethereumaccesslist)              | 該当なし                                                                                      | 該当なし                                                                                                                   |
| イーサリアムダイナミックフィー | [イーサリアムダイナミックフィー](./basic.md#ethereumdynamicfee)            | 該当なし                                                                                      | 該当なし                                                                                                                   |

## caver.transaction.decode <a href="#caver-transaction-decode" id="caver-transaction-decode"></a>

```javascript
caver.transaction.decode(rlpEncoded)
```

RLPエンコードされたトランザクション文字列（生のトランザクション）をデコードし、[Transaction](#class)インスタンスを返す。

**パラメーター**

| 名称         | タイプ   | 説明                            |
| ---------- | ----- | ----------------------------- |
| rlpEncoded | ストリング | デコードするRLPエンコードされたトランザクション文字列。 |

**リターン・バリュー**

| タイプ    | 説明                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| オブジェクト | Transaction](#class)のインスタンス。 各トランザクションの詳細については、[トランザクション](#class)を参照してください。 |

**例**

```javascript
> caver.transaction.decode('0x08f87...')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ 
        SignatureData { _v: '0x25', _r: '0xf3d0c...', _s: '0x6748a...' }
    ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## caver.transaction.getTransactionByHash <a href="#caver-transaction-gettransactionbyhash" id="caver-transaction-gettransactionbyhash"></a>

```javascript
caver.transaction.getTransactionByHash('0x{transaction hash}')
```

kaia からトランザクションを問い合わせ、caver トランザクションインスタンスに変換する。

**NOTE** `caver.transaction.getTransactionByHash` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 以降でサポートされています。

**パラメーター**

| 名称           | タイプ   | 説明                           |
| ------------ | ----- | ---------------------------- |
| トランザクションハッシュ | ストリング | kaiaから問い合わせるトランザクションハッシュ文字列。 |

**リターン・バリュー**

オブジェクト`を返す`約束\`：Transaction](#class) のインスタンス。 kaiaからのトランザクションオブジェクトの受信に失敗すると、エラーが発生する。

| タイプ    | 説明                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| オブジェクト | Transaction](#class)のインスタンス。 各トランザクションの詳細については、[トランザクション](#class)を参照してください。 |

**例**

```javascript
> caver.transaction.getTransactionByHash('0x30575f5a76a4477502aa1e5e707e47f05b92c3450132529cf55764cc94f780b0').then(console.log)
LegacyTransaction {
  _type: 'TxTypeLegacyTransaction',
  _from: '0x9ce618d097ea54c00d1562cb060576ff64139f10',
  _gas: '0x81b320',
  _nonce: '0x1de',
  _gasPrice: '0x5d21dba00',
  _signatures: SignatureData {
    _v: '0x07f5',
    _r: '0x359a09ebd2842cfc9cad6fd93c299da8629292bb3a69410c73837f7ca15cfd51',
    _s: '0x6f348cc656b90e79cfc1e748c3371fbd0128b83b787a110622f3aa5143a017f8'
  },
  _to: '0x',
  _input: '0x60806...',
  _value: '0x0'
}
```

## caver.transaction.recoverPublicKeys <a href="#caver-transaction-recoverpublickeys" id="caver-transaction-recoverpublickeys"></a>

```javascript
caver.transaction.recoverPublicKeys('0x{RLP-encoded transaction}')
```

与えられたトランザクションの `signatures` フィールドから公開鍵文字列を復元する。

**NOTE** `caver.transaction.recoverPublicKeys` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 以降でサポートされています。

**パラメーター**

| 名称    | タイプ   | 説明                                       |
| ----- | ----- | ---------------------------------------- |
| rawTx | ストリング | 署名\`から公開鍵を復元するためのRLPエンコードされたトランザクション文字列。 |

**リターン・バリュー**

| タイプ | 説明                  |
| --- | ------------------- |
| 配列  | 署名\`から復元した公開鍵を含む配列。 |

**例**

```javascript
> caver.transaction.recoverPublicKeys('0x08f9010e808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee0194f21460730845e3652aa3cc9bc13b345e4f53984af8d5f845820feaa02b5934c6d26bb3e65edf099d79c57c743d2f70744ca09d3ba9a1099edff9f173a00797886edff4b449c1a599943e3a6003ae9e46b3f3f34862ced327e43fba3a6af845820fe9a063177648732ef855f800eb9f80f68501abb507f84c0d660286a6e0801334a1d2a0620a996623c114f2df35b11ec8ac4f3758d3ad89cf81ba13614e51908cfe9218f845820fe9a086c8ecbfd892be41d48443a2243274beb6daed3f72895045965a3baede4c350ea069ea748aff6e4c106d3a8ba597d8f134745b76f12dacb581318f9da07351511a')
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## caver.transaction.recoverFeePayerPublicKeys <a href="#caver-transaction-recoverfeepayerpublickeys" id="caver-transaction-recoverfeepayerpublickeys"></a>

```javascript
caver.transaction.recoverFeePayerPublicKeys('0x{RLP-encoded transaction}')
```

与えられたトランザクションの `feePayerSignatures` フィールドから公開鍵文字列を復元する。

**NOTE** `caver.transaction.recoverFeePayerPublicKeys` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 以降でサポートされています。

**パラメーター**

| 名称    | タイプ   | 説明                                                                                                                                             |
| ----- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| rawTx | ストリング | `feePayerSignatures`から公開鍵を復元するための RLP エンコードされたトランザクション文字列。 料金支払者の公開鍵を回収するためには、トランザクションは、`feePayerSignatures` フィールドを内部に持つ料金委譲トランザクションでなければならない。 |

**リターン・バリュー**

| タイプ | 説明                                  |
| --- | ----------------------------------- |
| 配列  | `feePayerSignatures`から復元した公開鍵を含む配列。 |

**例**

```javascript
> caver.transaction.recoverFeePayerPublicKeys('0x09f901fa808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee019407a9a76ef778676c3bd2b334edcf581db31a85e5f8d5f845820feaa0cb2bbf04a12ec3a06163c30ce8782739ec4745a53e265aa9443f1c0d678bb871a07dd348c7d8fce6be36b661f116973d1c36cc92a389ad4a1a4053bd486060a083f845820fe9a06d5dfca992d6833c0da272578bc6ea941be45f44fb2fa114310ebe18d673ed52a04dc5cd7985c9ce7d44d46d65e65c995a4a8c97159a1eed8b2efb0510b981ab7cf845820feaa0945151edf556fbcebf832092d4534b9a3b1f3d46f85bce09e7d7211070cb57bea01617c8f918f96970baddd12f240a9824eca6b29d91eb7333adacb987f2dcd8dd94b5db72925b1b6b79299a1a49ae226cd7861083acf8d5f845820feaa086fd17d788e89a6e0639395b3c0a04f916103debd6cbe639d6f4ff5034dde3e8a00795551c551d9096234c290689767f34f2d409c95166ab18d216dbc93845ba16f845820feaa00653b6d1cdb90462094b089ce8e2fed0e3b8ec2c44125965e1a5af286644c758a0259b10e3bf594d48535fd0d95e15d095897c8d075c01dd56e7417d5943b0d53af845820fe9a0ce8d051427adab10d1dc93de49123aeab18ba8aadedce0d57ef5b7fa451b1f4fa04fe2a845d92ff48abca3e1d59637fab5f4a4e31
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## トランザクション署名<a href="#transaction-sign" id="transaction-sign"></a>

```javascript
transaction.sign(keyring [, index] [, hasher])
```

トランザクションの送信者として `keyring` 内の秘密鍵でトランザクションに署名し、トランザクショ ンオブジェクトに `signatures` を追加する。

アカウント更新](./basic.md#accountupdate)トランザクションの場合は、[roleAccountUpdateKey](../../../../../learn/accounts.md#roles)を使用し、そうでない場合は、[RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring)の[roleTransactionKey](../../../../../learn/accounts.md#roles)を使用する。 ユーザが `index` を定義していない場合、`transaction.sign` はロールが使用するすべての秘密鍵を使用してトランザクションに署名する。 `index` が定義されている場合、`transaction.sign` は指定されたインデックスの 1 つの秘密鍵のみを使用してトランザクションに署名する。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| キーホルダー | object \\ | 秘密鍵文字列（[KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)形式も可）、またはKeyringのインスタンス（[SingleKeyring](../caver-wallet/keyring.md#singlekeyring)、[MultipleKeyring](../caver-wallet/keyring.md#multiplekeyring)、または[RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring)）。 秘密鍵文字列または[KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)をパラメータとして渡すと、キーリングのインスタンスが内部的に作成されます。 |
| インデックス | 番号          | (オプション) 使用したい秘密鍵のインデックス。 このインデックスは、各ロールに定義されたプライベートキーの配列の長さより小さくなければならない。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用する。                                                                                                                                                                                                                                                                                                |
| ハッシャー  | 機能          | (オプション) トランザクションのハッシュを取得するためのハッシュ関数。                                                                                                                                                                                                                                                                                                                                                                            |

**リターン・バリュー**

オブジェクト`を返す `Promise\` ：署名されたトランザクション。

| タイプ    | 説明                                                                        |
| ------ | ------------------------------------------------------------------------- |
| オブジェクト | 署名された [Transaction](#class) のインスタンス。 署名は `transaction.signatures` に追加される。 |

**例**

```javascript
// This example uses the ValueTransfer transaction.
> const transaction = caver.transaction.valueTransfer.create({
    from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey
> transaction.sign(roleBasedKeyring).then(console.log)
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

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey and index
> transaction.sign(roleBasedKeyring, 1).then(console.log)
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

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey and hasher
> transaction.sign(roleBasedKeyring, customHasher).then(console.log)
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

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey, index and hasher
> transaction.sign(roleBasedKeyring, 1, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## トランザクション.signAsFeePayer<a href="#transaction-signasfeepayer" id="transaction-signasfeepayer"></a>

```javascript
transaction.signAsFeePayer(keyring [, index] [, hasher])
```

トランザクションを `fee payer` として署名し、トランザクションオブジェクトの `feePayerSignatures` に `keyring` 内の秘密鍵を付加する。

`keyring`で[roleFeePayerKey](../../../../../learn/accounts.md#roles)を使用する。 ユーザが `index` を定義していない場合、`transaction.signAsFeePayer` はロールが使用するすべての秘密鍵を使用してトランザクションに署名する。 `index` が定義されている場合、`transaction.signAsFeePayer` は指定されたインデックスの 1 つの秘密鍵のみを使用してトランザクションに署名する。

もし `transaction.feePayer` が定義されていなければ、与えられたキーリングのアドレスが `transaction.feePayer` に設定される。

署名に使用する `keyring` が `caver.wallet` に追加されている場合、[caver.wallet.signAsFeePayer](../caver-wallet/caver-wallet.md#caver-wallet-signasfeepayer) を使用することができる。

**注** この関数は、「フィー委任」取引または「比率付きフィー委任」取引に対してのみ機能する。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| キーホルダー | object \\ | 秘密鍵文字列（[KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)形式も可）、またはKeyringのインスタンス（[SingleKeyring](../caver-wallet/keyring.md#singlekeyring)、[MultipleKeyring](../caver-wallet/keyring.md#multiplekeyring)、または[RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring)）。 秘密鍵文字列または[KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)をパラメータとして渡すと、キーリングのインスタンスが内部的に作成されます。 |
| インデックス | 番号          | (オプション) 使用したい秘密鍵のインデックス。 このインデックスは、各ロールに定義されたプライベートキーの配列の長さより小さくなければならない。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用する。                                                                                                                                                                                                                                                                                                |
| ハッシャー  | 機能          | (オプション) トランザクションのハッシュを取得するためのハッシュ関数。                                                                                                                                                                                                                                                                                                                                                                            |

**リターン・バリュー**

オブジェクト`を返す `Promise\` ：署名されたトランザクション。

| タイプ    | 説明                                                                                  |
| ------ | ----------------------------------------------------------------------------------- |
| オブジェクト | 署名された [Transaction](#class) のインスタンス。 この署名は `transaction.feePayerSignatures` に追加される。 |

**例**

```javascript
// This example uses the FeeDelegatedValueTransfer transaction.
> const transaction = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey
> transaction.signAsFeePayer(roleBasedKeyring).then(console.log)
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

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and index
> transaction.signAsFeePayer(roleBasedKeyring, 1).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and hasher
> transaction.signAsFeePayer(roleBasedKeyring, customHasher).then(console.log)
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
> transaction.signAsFeePayer(roleBasedKeyring, 1, customHasher).then(console.log)
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

## トランザクション.appendSignatures<a href="#transaction-appendsignatures" id="transaction-appendsignatures"></a>

```javascript
トランザクション.appendSignatures(署名)
```

署名\`をトランザクションに追加する。

**パラメーター**

| 名称 | タイプ         | 説明                                                                                                                                                                                                                                       |
| -- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 署名 | object \\ | トランザクションに付加される署名。 [SignatureData](../caver-wallet/keyring.md#signaturedata) インスタンス、または [SignatureData](../caver-wallet/keyring.md#signaturedata) インスタンスを含む配列。 v'、'r'、's'がそれぞれ文字列フォーマットとして順次定義される配列、またはそれらの配列を含む2次元配列もパラメータとして受け取ることができる。 |

**例**

```javascript
> transaction.appendSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## トランザクション.appendFeePayerSignatures<a href="#transaction-appendfeepayersignatures" id="transaction-appendfeepayersignatures"></a>

```javascript
トランザクション.appendFeePayerSignatures(署名)
```

トランザクションに `feePayerSignatures` を追加する。

**注** この関数は、「フィー委任」取引または「比率付きフィー委任」取引に対してのみ機能する。

**パラメーター**

| 名称       | タイプ         | 説明                                                                                                                                                                                                                                                       |
| -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 料金支払者の署名 | object \\ | トランザクションに付加されるfeePayerSignatures。 [SignatureData](../caver-wallet/keyring.md#signaturedata) インスタンス、または [SignatureData](../caver-wallet/keyring.md#signaturedata) インスタンスを含む配列。 v'、'r'、's'がそれぞれ文字列フォーマットとして順次定義される配列、またはそれらの配列を含む2次元配列もパラメータとして受け取ることができる。 |

**例**

```javascript
> transaction.appendFeePayerSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## トランザクション.combineSignedRawTransactions<a href="#transaction-combinesignatures" id="transaction-combinesignatures"></a>

```javascript
トランザクション.combineSignedRawTransactions(rlpEncodedTxs)
```

与えられた配列内の各RLPエンコードされたトランザクション文字列内の符号を収集し、それらをトランザクションインスタンスと結合し、すべての符号を含むRLPエンコードされたトランザクション文字列を返す。 トランザクションインスタンスは必ずしも事前に署名されるわけではないことに注意。 トランザクションのタイプが "fee-delegated "または "fee-delegated with ratio "の場合、`feePayerSignatures` もマージされ、出力されるRLPエンコードされたトランザクション文字列に含まれる。

**パラメーター**

| 名称            | タイプ | 説明                             |
| ------------- | --- | ------------------------------ |
| rlpEncodedTxs | 配列  | 署名付きRLPエンコードされたトランザクション文字列の配列。 |

**リターン・バリュー**

| タイプ   | 説明                                                                                                                                                        |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ストリング | すべての `signatures` (トランザクションのタイプが "fee-delgated" または "fee-delegated with ratio" の場合は `feePayerSignatures`) を含む RLP エンコードされたトランザクション文字列。 |

**例**

```javascript
> transaction.combineSignedRawTransactions(['0x09f88....'])
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## トランザクション.getRLPEncoding<a href="#transaction-getrlpencoding" id="transaction-getrlpencoding"></a>

```javascript
トランザクション.getRLPEncoding()
```

RLPエンコードされたトランザクション文字列を返します。

各トランザクションタイプのRLPエンコード文字列の作成方法については、[Kaia Design - Transactions](../../../../../learn/transactions/transactions.md) を参照してください。

**リターン・バリュー**

| タイプ   | 説明                      |
| ----- | ----------------------- |
| ストリング | RLPエンコードされたトランザクション文字列。 |

**例**

```javascript
> トランザクション。getRLPEncoding()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## トランザクション.getRawTransaction<a href="#transaction-getrawtransaction" id="transaction-getrawtransaction"></a>

```javascript
トランザクション.getRawTransaction()
```

`rawTransaction` 文字列（RLP エンコードされたトランザクション文字列）を返す。 この関数は、[transaction.getRLPEncoding](#transaction-getrlpencoding) と同じである。

**リターン・バリュー**

| タイプ   | 説明                      |
| ----- | ----------------------- |
| ストリング | RLPエンコードされたトランザクション文字列。 |

**例**

```javascript
> transaction.getRawTransaction()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## トランザクションハッシュ<a href="#transaction-gettransactionhash" id="transaction-gettransactionhash"></a>

```javascript
transaction.getTransactionHash()
```

`transactionHash` を返す。

各トランザクション・タイプのトランザクション・ハッシュの作成方法については、[Kaia Design - Transactions](../../../../../learn/transactions/transactions.md) を参照のこと。

**リターン・バリュー**

| タイプ   | 説明            |
| ----- | ------------- |
| ストリング | トランザクションハッシュ。 |

**例**

```javascript
> transaction.getTransactionHash()
'0x8ac53afbba014201b02398545653683fe0536c49707fe302c59423012c0e8697'
```

## トランザクション.getSenderTxHash<a href="#transaction-getsendertxhash" id="transaction-getsendertxhash"></a>

```javascript
トランザクション.getSenderTxHash()
```

トランザクションの [senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) を返す。

senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) は、料金支払者のアドレスと署名を除いたトランザクションのハッシュであるため、[transactionHash](#transaction-gettransactionhash) と[senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) は、基本トランザクションでは同じである。

各トランザクション・タイプの[senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash)の作成方法については、[Kaia Design - Transactions](../../../../../learn/transactions/transactions.md)を参照してください。

**リターン・バリュー**

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | 送信者TxHash。 |

**例**

```javascript
> transaction.getSenderTxHash()
'0xb61cc1ddadb6f2ec34c9f9e6a7b6cf0a606422654d649d998587c77daa3c31fe'
```

## トランザクション.getRLPEncodingForSignature<a href="#transaction-getrlpencodingforsignature" id="transaction-getrlpencodingforsignature"></a>

```javascript
トランザクション.getRLPEncodingForSignature()
```

トランザクション送信者の署名を作成するためのRLPエンコードされたトランザクション文字列を返す。 返されたRLPエンコードされたトランザクション文字列は署名と一緒に追加されず、むしろこの署名を生成するために使用されることに注意。

各トランザクションタイプについて、トランザクション送信者の署名を生成するためにRLPエンコードされたトランザクション文字列を作成する方法については、[Kaia Design - Transactions](../../../../../learn/transactions/transactions.md)を参照のこと。

**リターン・バリュー**

| タイプ   | 説明                           |
| ----- | ---------------------------- |
| ストリング | 署名のないRLPエンコードされたトランザクション文字列。 |

**例**

```javascript
> transaction.getRLPEncodingForSignature()
'0xf83fb838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d08207e38080'
```

## トランザクション.getRLPEncodingForFeePayerSignature<a href="#transaction-getrlpencodingforfeepayersignature" id="transaction-getrlpencodingforfeepayersignature"></a>

```javascript
トランザクション.getRLPEncodingForFeePayerSignature()
```

料金支払者の署名を行うためのRLPエンコードされたトランザクション文字列を返す。 返されたRLPエンコードされたトランザクション文字列は署名と一緒に追加されず、むしろこの署名を生成するために使用されることに注意。

RLPエンコードされたトランザクション文字列を作成し、各トランザクションタイプの料金支払者の署名を生成する方法については、[Kaia Design - Transactions](../../../../../learn/transactions/transactions.md)を参照。

**注** この関数は、「フィー委任」取引または「比率付きフィー委任」取引に対してのみ機能する。

**リターン・バリュー**

| タイプ   | 説明                           |
| ----- | ---------------------------- |
| ストリング | 署名のないRLPエンコードされたトランザクション文字列。 |

**例**

```javascript
> transaction.getRLPEncodingForFeePayerSignature()
'0xf840b838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0808207e38080'
```

## トランザクション.fillTransaction<a href="#transaction-filltransaction" id="transaction-filltransaction"></a>

```javascript
transaction.fillTransaction()
```

トランザクションのオプション変数を埋める。

トランザクションの `gasPrice`、`nonce`、`chainId` が定義されていない場合、このメソッドはこれらのオプション変数のデフォルト値を問い合わせ、接続されている kaia Node に JSON RPC コールを送信することでプリセットする。

[caver.rpc.klay.getGasPrice](../caver-rpc/klay.md#caver-rpc-klay-getgasprice) を使用して `gasPrice` を取得し、[caver.rpc.klay.getTransactionCount](../caver-rpc/klay.md#caver-rpc-klay-gettransactioncount) を使用して `nonce` を取得し、[caver.rpc.klay.getChainId](../caver-rpc/klay.md#caver-rpc-klay-getchainid) を使用して `chainId` を取得する。

**リターン・バリュー**

`void`を返す`約束`。

**例**

```javascript
> transaction.fillTransaction()
```

## トランザクション.recoverPublicKeys<a href="#transaction-recoverpublickeys" id="transaction-recoverpublickeys"></a>

```javascript
トランザクション.recoverPublicKeys()
```

`signatures`フィールドから公開鍵文字列を復元する。

**NOTE** `transaction.recoverPublicKeys` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 以降でサポートされています。

**リターン・バリュー**

| タイプ | 説明                  |
| --- | ------------------- |
| 配列  | 署名\`から復元した公開鍵を含む配列。 |

**例**

```javascript
> トランザクション。recoverPublicKeys()
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## トランザクション.recoverFeePayerPublicKeys<a href="#transaction-recoverfeepayerpublickeys" id="transaction-recoverfeepayerpublickeys"></a>

```javascript
トランザクション.recoverFeePayerPublicKeys()
```

`feePayerSignatures`フィールドから公開鍵文字列を復元する。

**NOTE** `transaction.recoverFeePayerPublicKeys` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 以降でサポートされています。

**リターン・バリュー**

| タイプ | 説明                                  |
| --- | ----------------------------------- |
| 配列  | `feePayerSignatures`から復元した公開鍵を含む配列。 |

**例**

```javascript
> トランザクション。recoverFeePayerPublicKeys()
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## トランザクション.suggestGasPrice<a href="#transaction-suggestgasprice" id="transaction-suggestgasprice"></a>

```javascript
トランザクション.suggestGasPrice()
```

推奨ガソリン価格を返します。 この関数は、[fillTransaction](#transaction-fillTransaction) で gasPrice フィールドを設定するために使用します。

Magmaハードフォーク前は、`suggestGasPrice`はネットワークの単価を返す。 Magmaのハードフォーク後、`suggestGasPrice`は`baseFee * 2`を返し、これをgasPriceとして使用することが推奨される。

**NOTE** `transaction.suggestGasPrice`はcaver-js [v1.9.0](https://www.npmjs.com/package/caver-js/v/1.9.0)からサポートされています。

**リターン・バリュー**

`Promise` は `string` を返します：16進数文字列での希望ガソリン価格。

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | ガソリン価格の目安。 |

**例**

```javascript
> tx.suggestGasPrice().then(console.log)
0xba43b7400
```
