---
sidebar_label: 手数料の委任
---

# 手数料委任型取引クラス

## フィー委任価値譲渡<a id="feedelegatedvaluetransfer"></a>

```javascript
caver.transaction.feeDelegatedValueTransfer.create(transactionObject)
```

`FeeDelegatedValueTransfer` represents a [fee delegated value transfer transaction](../../../../../build/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer). トランザクションオブジェクト `transactionObject` は、`FeeDelegatedValueTransfer` トランザクションを作成するために以下のプロパティを持つことができる。

`FeeDelegatedValueTransfer` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedValueTransfer` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedValueTransfer` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedValueTransfer.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedValueTransfer({...})`のようなコンストラクタを使用してトランザクションを作成していた場合は、`caver.transaction.feeDelegatedValueTransfer.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                                       |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 価値       | ストリング | 譲渡されるKAIAの金額。 `caver.utils.toPeb`を使うことができる。                                                                                                              |
| より       | ストリング | 送信者のアドレス。                                                                                                                                                |
| への       | ストリング | 送金された金額を受け取る口座アドレス。                                                                                                                                      |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                 |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                                     |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                                       |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                                         |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。                 |
| gasPrice | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                                              |
| チェーンID   | ストリング | (オプション) kaiaブロックチェーンプラットフォームのチェーンID(この文書では以降 "Kaia "と略す)。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。 |

**例**

```javascript
// Create a feeDelegatedValueTransfer
> caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Create a feeDelegatedValueTransfer from RLP-encoded string
> caver.transaction.feeDelegatedValueTransfer.create('0x09f8d68204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a09f8e49e2ad84b0732984398749956e807e4b526c786af3c5f7416b293e638956a06bf88342092f6ff9fabe31739b2ebfa1409707ce54a54693e91a6b9bb77df0e7945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0f45cf8d7f88c08e6b6ec0b3b562f34ca94283e4689021987abb6b0772ddfd80aa0298fe2c5aeabb6a518f4cbb5ff39631a5d88be505d3923374f65fdcf63c2955b')
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x9f8e4...', _s: '0x6bf88...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0xf45cf...', _s: '0x298fe...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## フィー委任価値譲渡メモ<a id="feedelegatedvaluetransfermemo"></a>

```javascript
caver.transaction.feeDelegatedValueTransferMemo.create(transactionObject)
```

`FeeDelegatedValueTransferMemo` represents a [fee delegated value transfer memo transaction](../../../../../build/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfermemo). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、`FeeDelegatedValueTransferMemo` トランザクションを作成することができる。

`FeeDelegatedValueTransferMemo`は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedValueTransferMemo` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedValueTransferMemo` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedValueTransferMemo.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedValueTransferMemo({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.feeDelegatedValueTransferMemo.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                       |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 価値       | ストリング | 譲渡されるKAIAの金額。 `caver.utils.toPeb`を使うことができる。                                                                                              |
| より       | ストリング | 送信者のアドレス。                                                                                                                                |
| への       | ストリング | 送金された金額を受け取る口座アドレス。                                                                                                                      |
| 入力       | ストリング | トランザクションに付随するデータ。 メッセージはこのプロパティに渡されるべきである。                                                                                               |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                       |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                         |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| ガス価格     | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID   | ストリング | (オプション) カイアのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                          |

**例**

```javascript
// Create a feeDelegatedValueTransferMemo
> caver.transaction.feeDelegatedValueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
})

// Create a feeDelegatedValueTransferMemo from RLP-encoded string
> caver.transaction.feeDelegatedValueTransferMemo.create('0x11f8dc8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84326a064e213aef0167fbd853f8f9989ef5d8b912a77457395ccf13d7f37009edd5c5ba05d0c2e55e4d8734fe2516ed56ac628b74c0eb02aa3b6eda51e1e25a1396093e1945a0043070275d9f6054307ee7348bd660849d90ff845f84326a087390ac14d3c34440b6ddb7b190d3ebde1a07d9a556e5a82ce7e501f24a060f9a037badbcb12cda1ed67b12b1831683a08a3adadee2ea760a07a46bdbb856fea44')
FeeDelegatedValueTransferMemo {
    _type: 'TxTypeFeeDelegatedValueTransferMemo',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x64e21...', _s: '0x5d0c2...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x87390...', _s: '0x37bad...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## FeeDelegatedAccountUpdate（フィー・デリゲート・アカウント・アップデート<a id="feedelegatedaccountupdate"></a>

```javascript
caver.transaction.feeDelegatedAccountUpdate.create(transactionObject)
```

`FeeDelegatedAccountUpdate` represents a [fee delegated account update transaction](../../../../../build/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate). トランザクションオブジェクト `transactionObject` は、`FeeDelegatedAccountUpdate` トランザクションを作成するために以下のプロパティを持つことができる。

`FeeDelegatedAccountUpdate` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedAccountUpdate` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedAccountUpdate` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedAccountUpdate.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedAccountUpdate({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.feeDelegatedAccountUpdate.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ                               | 説明                                                                                                                                       |
| -------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| より       | ストリング                             | 送信者のアドレス。                                                                                                                                |
| アカウント    | [アカウント］ | アカウントの更新に必要な情報を含む[Account]インスタンス。                                                    |
| ガス       | ストリング                             | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 署名       | 配列                                | (オプション) シグネチャの配列。                                                                                                     |
| 料金支払者の署名 | 配列                                | (オプション) feePayerSignatures の配列。                                                                                       |
| 料金支払者    | ストリング                             | (任意）料金支払者の住所。                                                                                                         |
| ノンス      | ストリング                             | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| ガス価格     | ストリング                             | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID   | ストリング                             | (オプション) カイアのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                          |

各 `AccountKey` タイプの[Account]インスタンスを作成する方法については、[Getting Started - Account Update](../../get-started.md#account-update)または[caver.account.create](../caver.account.md#caver-account-create)を参照してください。

**例**

```javascript
// Create a feeDelegatedAccountUpdate
> caver.transaction.feeDelegatedAccountUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
})

// Create a feeDelegatedAccountUpdate from RLP-encoded string
> caver.transaction.feeDelegatedAccountUpdate.create('0x21f8ea018505d21dba00830493e094ac1aec09ef5f8dde6a0baf709ea388bbd7965f72a302a103d032771e5d927fb568cdf7605496b700277d7b9bcabe7657f45602348964e396f846f844820fe99f0e1a3542288951226c66e6e8de320ddef4e0c0d6650baec828998a7ce411fea052d0766f3b84f35787d2a810f97057d215dcbe070cd890b7ccb8aaa3aac8eacc9423bf3d4eb274621e56ce65f6fa05da9e24785bb8f847f845820feaa0faca4cf91418c6fea61e9439620b656c7b0717b058fd8787865f4564a0f9974ea03a483582435426e7b2aeffe3131a678ae54c7aa948fa5442b5ded209ba373221')
FeeDelegatedAccountUpdate {
    _type: 'TxTypeFeeDelegatedAccountUpdate',
    _from: '0xac1aec09ef5f8dde6a0baf709ea388bbd7965f72',
    _gas: '0x493e0',
    _nonce: '0x1',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x0e1a3...', _s: '0x52d07...' } ],
    _feePayer: '0x23bf3d4eb274621e56ce65f6fa05da9e24785bb8',
    _feePayerSignatures: [ SignatureData { _v: '0x0fea', _r: '0xfaca4...', _s: '0x3a483...' } ],
    _account: Account {
        _address: '0xac1aec09ef5f8dde6a0baf709ea388bbd7965f72',
        _accountKey: AccountKeyPublic { _publicKey: '0x03d03...' }
    }
}
```

## フィー・デレゲート・スマート・コントラクト・デプロイ<a id="feedelegatedsmartcontractdeploy"></a>

```javascript
caver.transaction.feeDelegatedSmartContractDeploy.create(transactionObject)
```

`FeeDelegatedSmartContractDeploy` represents a [fee delegated smart contract deploy transaction](../../../../../build/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、`FeeDelegatedSmartContractDeploy` トランザクションを作成することができる。

`FeeDelegatedSmartContractDeploy` は、以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedSmartContractDeploy` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティを指す。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedSmartContractDeploy` のインスタンスを作成できます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedSmartContractDeploy.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedSmartContractDeploy({...})`のようなコンストラクタを使用してトランザクションを作成していた場合は、`caver.transaction.feeDelegatedSmartContractDeploy.create({...})`に変更してください。

:::

**プロパティ**

| 名称        | タイプ   | 説明                                                                                                                                                                 |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| より        | ストリング | 送信者のアドレス。                                                                                                                                                          |
| 入力        | ストリング | トランザクションに付随するデータ。 デプロイされるスマート・コントラクトのバイトコードとその引数。 これは[caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy)で取得できる。 |
| ガス        | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                           |
| 価値        | ストリング | (オプション、デフォルト: `'0x0'`) 転送するKAIAの量をpebで指定する。 `caver.utils.toPeb`を使うことができる。                                                       |
| への        | ストリング | (オプション、デフォルト: `'0x'`) スマートコントラクトがデプロイされるアドレス。 現在、この値を定義することはできない。 アドレスの指定は将来サポートされる予定。                                          |
| 人間可読      | ブーリアン | (オプション、デフォルト: `false`) 人間が読めるアドレスはまだサポートされていないので、これは false でなければならない。                                                           |
| コードフォーマット | ストリング | (オプション、デフォルト: `'EVM'`) スマートコントラクトのコードフォーマット。 今のところ、サポートされる値はEVMのみ。 この値は、代入後、内部で16進文字列に変換される（例えば、`EVM`は`0x0`に変換される）。             |
| 署名        | 配列    | (オプション) シグネチャの配列。                                                                                                                               |
| 料金支払者の署名  | 配列    | (オプション) feePayerSignatures の配列。                                                                                                                 |
| 料金支払者     | ストリング | (任意）料金支払者の住所。                                                                                                                                   |
| ノンス       | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。                           |
| ガス価格      | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                                                        |
| チェーンID    | ストリング | (オプション) カイアのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                                                    |

**例**

```javascript
// Create a feeDelegatedSmartContractDeploy
> caver.transaction.feeDelegatedSmartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// Create a feeDelegatedSmartContractDeploy from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractDeploy.create('0x29f902cc808505d21dba00830dbba08080948061145252c8f2b4f110aed096435ae6ed7d5a95b901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f00298080f847f845820fe9a07abfd0f0cfb9a9c38c6e3e1a4eeb15f43aeb4b4f6dee7c3f37c07e417af89d9ba03f1e54a512c906d2e57a611b25ce4739d12928e199c3e89792b82f577f0da9ad942c8eb96e7060ab864d94e91ab16f214dc6647628f847f845820fe9a0192e3b6457f13c6ef557bd11074702d5062dd463473c483278c57f651d5b712ba03ff8638b7cc7ed86c793cb5ffe0e8a064fc94946c3aab624bb7704c62e81ec2d')
FeeDelegatedSmartContractDeploy {
    _type: 'TxTypeFeeDelegatedSmartContractDeploy',
    _from: '0x8061145252c8f2b4f110aed096435ae6ed7d5a95',
    _gas: '0xdbba0',
    _nonce: '0x0',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x7abfd...', _s: '0x3f1e5...' } ],
    _feePayer: '0x2c8eb96e7060ab864d94e91ab16f214dc6647628',
    _feePayerSignatures: [ SignatureData { _v: '0x0fe9', _r: '0x192e3...', _s: '0x3ff86...' } ],
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## フィーデレゲート・スマート・コンストラクト・エクスキューション（FeeDelegatedSmartContractExecution<a id="feedelegatedsmartcontractexecution"></a>

```javascript
caver.transaction.feeDelegatedSmartContractExecution.create(transactionObject)
```

`FeeDelegatedSmartContractExecution` represents a [fee delegated smart contract execution transaction](../../../../../build/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractexecution). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、`FeeDelegatedSmartContractExecution` トランザクションを作成することができる。

`FeeDelegatedSmartContractExecution` は、以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedSmartContractExecution` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedSmartContractExecution` のインスタンスを作成できます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedSmartContractExecution.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedSmartContractExecution({...})`のようなコンストラクタを使用してトランザクションを作成していた場合は、`caver.transaction.feeDelegatedSmartContractExecution.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                                                                                     |
| -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| より       | ストリング | 送信者のアドレス。                                                                                                                                                                                              |
| への       | ストリング | 実行されるスマートコントラクトアカウントのアドレス。                                                                                                                                                                             |
| 入力       | ストリング | トランザクションの実行に使用される、トランザクションに添付されたデータ。 入力はエンコードされた文字列で、呼び出す関数とこの関数に渡すパラメータを示す。 このエンコードされた文字列は、[caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)で取得できます。 |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                                                               |
| 価値       | ストリング | (オプション、デフォルト: `'0x0'`) 転送するKAIAの量をpebで指定する。 `caver.utils.toPeb`を使うことができる。                                                                                           |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                                                                                   |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                                                                                     |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                                                                                       |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。                                                               |
| ガス価格     | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                                                                                            |
| チェーンID   | ストリング | (オプション) カイアのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                                                                                        |

**例**

```javascript
// Create a feeDelegatedSmartContractExecution
> caver.transaction.feeDelegatedSmartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// Create a feeDelegatedSmartContractExecution from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractExecution.create('0x31f8fb8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2f845f84325a0253aea7d2c37160da45e84afbb45f6b3341cf1e8fc2df4ecc78f14adb512dc4fa022465b74015c2a8f8501186bb5e200e6ce44be52e9374615a7e7e21c41bc27b5945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0e7c51db7b922c6fa2a941c9687884c593b1b13076bdf0c473538d826bf7b9d1aa05b0de2aabb84b66db8bf52d62f3d3b71b592e3748455630f1504c20073624d80')
FeeDelegatedSmartContractExecution {
    _type: 'TxTypeFeeDelegatedSmartContractExecution',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x253ae...', _s: '0x22465b...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures:  SignatureData { _v: '0x26', _r: '0xe7c51...', _s: '0x5b0de...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x6353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2'
}
```

## フィー委任キャンセル<a id="feedelegatedcancel"></a>

```javascript
caver.transaction.feeDelegatedCancel.create(transactionObject)
```

`FeeDelegatedCancel` represents a [fee delegated cancel transaction](../../../../../build/transactions/fee-delegation.md#txtypefeedelegatedcancel). トランザクションオブジェクト `transactionObject` は、`FeeDelegatedCancel` トランザクションを作成するために以下のプロパティを持つことができる。

`FeeDelegatedCancel`は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedCancel` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLPエンコードされた文字列から`FeeDelegatedCancel`のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedCancel.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedCancel({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.feeDelegatedCancel.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                       |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| より       | ストリング | 送信者のアドレス。                                                                                                                                |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                       |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                         |
| ガス価格     | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID   | ストリング | (オプション) カイアのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                          |

**例**

```javascript
// Create a feeDelegatedCancel
> caver.transaction.feeDelegatedCancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// Create a feeDelegatedCancel from RLP-encoded string
> caver.transaction.feeDelegatedCancel.create('0x39f8c08204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84326a08409f5441d4725f90905ad87f03793857d124de7a43169bc67320cd2f020efa9a060af63e87bdc565d7f7de906916b2334336ee7b24d9a71c9521a67df02e7ec92945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0044d5b25e8c649a1fdaa409dc3817be390ad90a17c25bc17c89b6d5d248495e0a073938e690d27b5267c73108352cf12d01de7fd0077b388e94721aa1fa32f85ec')
FeeDelegatedCancel {
    _type: 'TxTypeFeeDelegatedCancel',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x8409f...', _s: '0x60af6...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x044d5...', _s: '0x73938...' } ]
}
```

## フィーデレゲート・チェーンデータ・アンカリング<a id="feedelegatedchaindataanchoring"></a>

```javascript
caver.transaction.feeDelegatedChainDataAnchoring.create(transactionObject)
```

`FeeDelegatedChainDataAnchoring` represents a [fee delegated chain data anchoring transaction](../../../../../build/transactions/fee-delegation.md#txtypefeedelegatedchaindataanchoring). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、`FeeDelegatedChainDataAnchoring` トランザクションを作成することができる。

`FeeDelegatedChainDataAnchoring` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedChainDataAnchoring` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedChainDataAnchoring` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedChainDataAnchoring.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedChainDataAnchoring({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.feeDelegatedChainDataAnchoring.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                       |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| より       | ストリング | 送信者のアドレス。                                                                                                                                |
| 入力       | ストリング | サービスチェーンのデータ。                                                                                                                            |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                       |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                         |
| ガス価格     | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID   | ストリング | (オプション) カイアのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                          |

**例**

```javascript
// Create a feeDelegatedChainDataAnchoring
> caver.transaction.feeDelegatedChainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// Create a feeDelegatedChainDataAnchoring from RLP-encoded string
> caver.transaction.feeDelegatedChainDataAnchoring.create('0x49f90176118505d21dba0085174876e80094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8aff8ad80b8aaf8a8a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a00000000000000000000000000000000000000000000000000000000000000004058006f845f84326a0afe41edc9cce1185ab9065ca7dbfb89ab5c7bde3602a659aa258324124644142a0317848698248ba7cc057b8f0dd19a27b52ef904d29cb72823100f1ed18ba2bb39433f524631e573329a550296f595c820d6c65213ff845f84325a0309e46db21a1bf7bfdae24d9192aca69516d6a341ecce8971fc69cff481cee76a04b939bf7384c4f919880307323a5e36d4d6e029bae1887a43332710cdd48f174')
FeeDelegatedChainDataAnchoring {
    _type: 'TxTypeFeeDelegatedChainDataAnchoring',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0x174876e800',
    _nonce: '0x11',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x26', _r: '0xafe41...', _s: '0x31784...' } ],
    _feePayer: '0x33f524631e573329a550296f595c820d6c65213f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0x309e4...', _s: '0x4b939...' } ],
    _input: '0xf8ad8...'
}
```
