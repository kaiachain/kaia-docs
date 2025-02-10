---
sidebar_label: 料金の一部委任
---

# 部分手数料委任型トランザクション・クラス

## 比率付き手数料委任価値移転<a id="feedelegatedvaluetransferwithratio"></a>

```javascript
caver.transaction.feeDelegatedValueTransferWithRatio.create(transactionObject)
```

`FeeDelegatedValueTransferWithRatio` represents a [fee delegated value transfer with ratio transaction](../../../../../build/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、`FeeDelegatedValueTransferWithRatio` トランザクションを作成することができる。

`FeeDelegatedValueTransferWithRatio` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedValueTransfer` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedValueTransferWithRatio` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedValueTransferWithRatio.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedValueTransferWithRatio({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.feeDelegatedValueTransferWithRatio.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                       |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 価値       | ストリング | 譲渡されるKAIAの金額。 `caver.utils.toPeb`を使うことができる。                                                                                              |
| より       | ストリング | 送信者のアドレス。                                                                                                                                |
| への       | ストリング | 送金された金額を受け取る口座アドレス。                                                                                                                      |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 手数料率     | ストリング | 手数料支払者が負担する取引手数料の割合を示す比率。 この比率の有効範囲は1～99である。 0や100以上の比率は許されない。                                                                           |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                       |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                         |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| gasPrice | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID   | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

**例**

```javascript
// Create a feeDelegatedValueTransferWithRatio
> caver.transaction.feeDelegatedValueTransferWithRatio({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    feeRatio: 30,
})

// Create a feeDelegatedValueTransferWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedValueTransferWithRatio('0x0af8d78204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b1ef845f84325a0dde32b8241f039a82b124fe94d3e556eb08f0d6f26d07dcc0f3fca621f1090caa01c8c336b358ab6d3a2bbf25de2adab4d01b754e2fb3b9b710069177d54c1e956945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0091ecf53f91bb97bb694f2f2443f3563ac2b646d651497774524394aae396360a044228b88f275aa1ec1bab43681d21dc7e3a676786ed1906f6841d0a1a188f88a')
FeeDelegatedValueTransferWithRatio {
    _type: 'TxTypeFeeDelegatedValueTransferWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0xdde32...', _s: '0x1c8c3...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x091ec...', _s: '0x44228...' } ],
    _feeRatio: '0x1e',
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## 比率付き手数料委任価値移転メモ<a id="feedelegatedvaluetransfermemowithratio"></a>

```javascript
caver.transaction.feeDelegatedValueTransferMemoWithRatio.create(transactionObject)
```

`FeeDelegatedValueTransferMemoWithRatio` represents a [fee delegated value transfer memo with ratio transaction](../../../../../build/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、 `FeeDelegatedValueTransferMemoWithRatio` トランザクションを作成することができる。

`FeeDelegatedValueTransferMemoWithRatio` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedValueTransferMemoWithRatio` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedValueTransferMemoWithRatio` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedValueTransferMemoWithRatio.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedValueTransferMemoWithRatio({...})`のようなコンストラクタを使用してトランザクションを作成していた場合は、`caver.transaction.feeDelegatedValueTransferMemoWithRatio.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                       |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 価値       | ストリング | 譲渡されるKAIAの金額。 `caver.utils.toPeb`を使うことができる。                                                                                              |
| より       | ストリング | 送信者のアドレス。                                                                                                                                |
| への       | ストリング | 送金された金額を受け取る口座アドレス。                                                                                                                      |
| 入力       | ストリング | トランザクションに付随するデータ。 メッセージはこのプロパティに渡されるべきである。                                                                                               |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 手数料率     | ストリング | 手数料支払者が負担する取引手数料の割合を示す比率。 この比率の有効範囲は1から99の間である。 0や100以上の比率は許されない。                                                                        |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                       |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                         |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| ガス価格     | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID   | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

**例**

```javascript
// Create a feeDelegatedValueTransferMemoWithRatio
> caver.transaction.feeDelegatedValueTransferMemoWithRatio({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
    feeRatio: 30,
})

// Create a feeDelegatedValueTransferMemoWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedValueTransferMemoWithRatio('0x12f8dd8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6f1ef845f84326a0769f0afdc310289f9b24decb5bb765c8d7a87a6a4ae28edffb8b7085bbd9bc78a06a7b970eea026e60ac29bb52aee10661a4222e6bdcdfb3839a80586e584586b4945a0043070275d9f6054307ee7348bd660849d90ff845f84325a0c1c54bdc72ce7c08821329bf50542535fac74f4bba5de5b7881118a461d52834a03a3a64878d784f9af91c2e3ab9c90f17144c47cfd9951e3588c75063c0649ecd')
FeeDelegatedValueTransferMemoWithRatio {
    _type: 'TxTypeFeeDelegatedValueTransferMemoWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x769f0...', _s: '0x6a7b9...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0xc1c54...', _s: '0x3a3a6...' } ],
    _feeRatio: '0x1e',
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## 比率付き手数料委任口座更新<a id="feedelegatedaccountupdatewithratio"></a>

```javascript
caver.transaction.feeDelegatedAccountUpdateWithRatio.create(transactionObject)
```

`FeeDelegatedAccountUpdateWithRatio` represents a [fee delegated account update with ratio transaction](../../../../../build/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio). トランザクションオブジェクト `transactionObject` は、`FeeDelegatedAccountUpdateWithRatio` トランザクションを作成するために以下のプロパティを持つことができる。

`FeeDelegatedAccountUpdateWithRatio` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedAccountUpdateWithRatio` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedAccountUpdateWithRatio` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedAccountUpdateWithRatio.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedAccountUpdateWithRatio({...})`のようなコンストラクタを使用してトランザクションを作成していた場合は、`caver.transaction.feeDelegatedAccountUpdateWithRatio.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ                               | 説明                                                                                                                                       |
| -------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| より       | ストリング                             | 送信者のアドレス。                                                                                                                                |
| アカウント    | [アカウント］ | アカウントの更新に必要な情報を含む[Account]インスタンス。                                                    |
| ガス       | ストリング                             | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 手数料率     | ストリング                             | 手数料支払者が負担する取引手数料の割合を示す比率。 この比率の有効範囲は1～99である。 0や100以上の比率は許されない。                                                                           |
| 署名       | 配列                                | (オプション) シグネチャの配列。                                                                                                     |
| 料金支払者の署名 | 配列                                | (オプション) feePayerSignatures の配列。                                                                                       |
| 料金支払者    | ストリング                             | (任意）料金支払者の住所。                                                                                                         |
| ノンス      | ストリング                             | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| ガス価格     | ストリング                             | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID   | ストリング                             | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

各 `AccountKey` タイプの[Account]インスタンスを作成する方法については、[Getting Started - Account Update](../../get-started.md#account-update)または[caver.account.create](../caver.account.md#caver-account-create)を参照してください。

**例**

```javascript
// Create a feeDelegatedAccountUpdateWithRatio
> caver.transaction.feeDelegatedAccountUpdateWithRatio({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
    feeRatio: 30,
})

// Create a feeDelegatedAccountUpdateWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedAccountUpdateWithRatio('0x22f8ec018505d21dba00830493e0945c525570f2b8e7e25f3a6b5e17f2cc63b872ece7a302a102a1d2af887950891813bf7d851bce55f47246a5269a5d4be1fc0ab78d78ae0f5a1ef847f845820feaa08553a692cd8f86af4d335785468a5b4527ee1a2d0c5e18517fe39375e4e82d85a0698db3a07cc81427eb8ea877bb8af33d66abfb29526f58db6997eb99010be4fd94294f5bc8fadbd1079b191d9c47e1f217d6c987b4f847f845820feaa0a44cbc6e30f9df61633ed1714014924b8b614b315288cdfd795c5ba18d36d5d8a0011611104f18e3bb3d32508317a0ce6d31f0a71d55e2363b02a47aabbc7bf9d4')
FeeDelegatedAccountUpdateWithRatio {
    _type: 'TxTypeFeeDelegatedAccountUpdateWithRatio',
    _from: '0x5c525570f2b8e7e25f3a6b5e17f2cc63b872ece7',
    _gas: '0x493e0',
    _nonce: '0x1',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x8553a...', _s: '0x698db...' } ],
    _feePayer: '0x294f5bc8fadbd1079b191d9c47e1f217d6c987b4',
    _feePayerSignatures: [ SignatureData { _v: '0x0fea', _r: '0xa44cb...', _s: '0x01161...' } ],
    _feeRatio: '0x1e',
    _account: Account {
        _address: '0x5c525570f2b8e7e25f3a6b5e17f2cc63b872ece7',
        _accountKey: AccountKeyPublic { _publicKey: '0x02a1d...' }
    }
}
```

## フィーデレゲーテッドスマートコントラクトデプロイウィズレシオ<a id="feedelegatedsmartcontractdeploywithratio"></a>

```javascript
Caver.transaction.feeDelegatedSmartContractDeployWithRatio.create(transactionObject)
```

`FeeDelegatedSmartContractDeployWithRatio` represents a [fee delegated smart contract deploy with ratio transaction](../../../../../build/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、 `FeeDelegatedSmartContractDeployWithRatio` トランザクションを作成することができる。

`FeeDelegatedSmartContractDeployWithRatio` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedSmartContractDeployWithRatio` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティを指す。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedSmartContractDeployWithRatio` のインスタンスを作成することができる。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedSmartContractDeployWithRatio.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedSmartContractDeployWithRatio({...})`のようなコンストラクタを使用してトランザクションを作成していた場合は、`caver.tarnactions.feeDelegatedSmartContractDeployWithRatio.create({...})`に変更してください。

:::

**プロパティ**

| 名称        | タイプ   | 説明                                                                                                                                                                 |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| より        | ストリング | 送信者のアドレス。                                                                                                                                                          |
| 入力        | ストリング | トランザクションに付随するデータ。 デプロイされるスマート・コントラクトのバイトコードとその引数。 これは[caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy)で取得できる。 |
| ガス        | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                           |
| 手数料率      | ストリング | 手数料支払者が負担する取引手数料の割合を示す比率。 この比率の有効範囲は1から99の間である。 0や100以上の比率は許されない。                                                                                                  |
| 価値        | ストリング | (オプション、デフォルト: `'0x0'`) 転送するKAIAの量をpebで指定する。 `caver.utils.toPeb`を使うことができる。                                                       |
| への        | ストリング | (オプション、デフォルト: `'0x'`) スマートコントラクトがデプロイされるアドレス。 現在、この値を定義することはできない。 アドレスの指定は将来サポートされる予定。                                          |
| 人間可読      | ブーリアン | (オプション、デフォルト: `false`) 人間が読めるアドレスはまだサポートされていないので、これは false でなければならない。                                                           |
| コードフォーマット | ストリング | (オプション、デフォルト: `'EVM'`) スマートコントラクトのコードフォーマット。 今のところ、サポートされる値はEVMのみ。 この値は、代入後、内部で16進文字列に変換される（例えば、`EVM`は`0x0`に変換される）。             |
| 署名        | 配列    | (オプション) シグネチャの配列。                                                                                                                               |
| 料金支払者の署名  | 配列    | (オプション) feePayerSignatures の配列。                                                                                                                 |
| 料金支払者     | ストリング | (任意）料金支払者の住所。                                                                                                                                   |
| ノンス       | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。                           |
| ガス価格      | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                                                        |
| チェーンID    | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                                             |

**例**

```javascript
// Create a feeDelegatedSmartContractDeployWithRatio
> caver.transaction.feeDelegatedSmartContractDeployWithRatio({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
    feeRatio: 30,
})

// Create a feeDelegatedSmartContractDeployWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractDeployWithRatio('0x2af902cd0e8505d21dba00830493e0808094294f5bc8fadbd1079b191d9c47e1f217d6c987b4b901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029801e80f847f845820fe9a08a20b415ae7cd642f7682e59b63cb81068723a18eb0d8d3ba58fa7545c4fc8a5a05ba8a86f4496f124f04293d4b0afec85ab3946b039d1f6a25424217508df586794c56a1fafa968d64d19b4b81c306ecbab6e489743f847f845820fe9a0a525cba1b73cbe33b4df9be7165f8731b848ce3deba607690896eda8791a1a96a05ea75b4da1b6744bb98bc2b9748d0eca5c47714ea1c09e26bebc5de386ff9958')
FeeDelegatedSmartContractDeployWithRatio {
    _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
    _from: '0x294f5bc8fadbd1079b191d9c47e1f217d6c987b4',
    _gas: '0x493e0',
    _nonce: '0xe',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x8a20b...', _s: '0x5ba8a...' } ],
    _feePayer: '0xc56a1fafa968d64d19b4b81c306ecbab6e489743',
    _feePayerSignatures: [ SignatureData { _v: '0x0fe9', _r: '0xa525c...', _s: '0x5ea75...' } ],
    _feeRatio: '0x1e',
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## 比率付き手数料委譲型スマート契約執行<a id="feedelegatedsmartcontractexecutionwithratio"></a>

```javascript
caver.transaction.feeDelegatedSmartContractExecutionWithRatio.create(transactionObject)
```

`FeeDelegatedSmartContractExecutionWithRatio` represents a [fee delegated smart contract execution with ratio transaction](../../../../../build/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio). トランザクションオブジェクト `transactionObject` は、`FeeDelegatedSmartContractExecutionWithRatio` トランザクションを作成するために、以下のプロパティを持つことができる。

`FeeDelegatedSmartContractExecutionWithRatio` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedSmartContractExecutionWithRatio` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティを指す。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedSmartContractExecutionWithRatio` のインスタンスを作成できます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedSmartContractExecutionWithRatio.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedSmartContractExecutionWithRatio({...})`のようなコンストラクタを使用してトランザクションを作成していた場合は、`caver.transaction.feeDelegatedSmartContractExecutionWithRatio.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                                                                                     |
| -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| より       | ストリング | 送信者のアドレス。                                                                                                                                                                                              |
| への       | ストリング | 実行されるスマートコントラクトアカウントのアドレス。                                                                                                                                                                             |
| 入力       | ストリング | トランザクションの実行に使用される、トランザクションに添付されたデータ。 入力はエンコードされた文字列で、呼び出す関数とこの関数に渡すパラメータを示す。 このエンコードされた文字列は、[caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)で取得できます。 |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                                                               |
| 手数料率     | ストリング | 手数料支払者が負担する取引手数料の割合を示す比率。 この比率の有効範囲は1から99の間である。 0や100以上の比率は許されない。                                                                                                                                      |
| 価値       | ストリング | (オプション、デフォルト: `'0x0'`) 転送するKAIAの量をpebで指定する。 `caver.utils.toPeb`を使うことができる。                                                                                           |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                                                                                   |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                                                                                     |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                                                                                       |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。                                                               |
| ガス価格     | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                                                                                            |
| チェーンID   | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                                                                                 |

**例**

```javascript
// Create a feeDelegatedSmartContractExecutionWithRatio
> caver.transaction.feeDelegatedSmartContractExecutionWithRatio({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
    feeRatio: 30,
})

// Create a feeDelegatedSmartContractExecutionWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractExecutionWithRatio('0x32f8fc8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b21ef845f84326a074ccfee18dc28932396b85617c53784ee366303bce39a2401d8eb602cf73766fa04c937a5ab9401d2cacb3f39ba8c29dbcd44588cc5c7d0b6b4113cfa7b7d9427b945a0043070275d9f6054307ee7348bd660849d90ff845f84325a04a4997524694d535976d7343c1e3a260f99ba53fcb5477e2b96216ec96ebb565a00f8cb31a35399d2b0fbbfa39f259c819a15370706c0449952c7cfc682d200d7c')
FeeDelegatedSmartContractExecutionWithRatio {
    _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x74ccf...', _s: '0x4c937...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0x4a499...', _s: '0x0f8cb...' } ],
    _feeRatio: '0x1e',
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x6353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2'
}
```

## 比率付き手数料委任キャンセル<a id="feedelegatedcancelwithratio"></a>

```javascript
caver.transaction.feeDelegatedCancelWithRatio.create(transactionObject)
```

`FeeDelegatedCancelWithRatio` represents a [fee delegated cancel with ratio transaction](../../../../../build/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio). トランザクションオブジェクト `transactionObject` は、`FeeDelegatedCancelWithRatio` トランザクションを作成するために以下のプロパティを持つことができる。

`FeeDelegatedCancelWithRatio` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedCancelWithRatio` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティである。

:::note

注: RLPでエンコードされた文字列から `FeeDelegatedCancelWithRatio` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedCancelWithRatio.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedCancelWithRatio({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.feeDelegatedCancelWithRatio.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                       |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| より       | ストリング | 送信者のアドレス。                                                                                                                                |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 手数料率     | ストリング | 手数料支払者が負担する取引手数料の割合を示す比率。 この比率の有効範囲は1～99である。 0や100以上の比率は許されない。                                                                           |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                       |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                         |
| ガス価格     | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID   | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

**例**

```javascript
// Create a feeDelegatedCancelWithRatio
> caver.transaction.feeDelegatedCancelWithRatio({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
    feeRatio: 30,
})

// Create a feeDelegatedCancelWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedCancelWithRatio('0x3af8c18204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0b1ef845f84326a072efa47960bef40b536c72d7e03ceaf6ca5f6061eb8a3eda3545b1a78fe52ef5a062006ddaf874da205f08b3789e2d014ae37794890fc2e575bf75201563a24ba9945a0043070275d9f6054307ee7348bd660849d90ff845f84326a06ba5ef20c3049323fc94defe14ca162e28b86aa64f7cf497ac8a5520e9615614a04a0a0fc61c10b416759af0ce4ce5c09ca1060141d56d958af77050c9564df6bf')
FeeDelegatedCancelWithRatio {
    _type: 'TxTypeFeeDelegatedCancelWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x72efa...', _s: '0x62006...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x6ba5e...', _s: '0x4a0a0...' } ],
    _feeRatio: '0x1e'
}
```

## 比率付きFeeDelegatedChainDataAnchoring<a id="feedelegatedchaindataanchoringwithratio"></a>

```javascript
caver.transaction.feeDelegatedChainDataAnchoringWithRatio.create(transactionObject)
```

`FeeDelegatedChainDataAnchoringWithRatio` represents a [fee delegated chain data anchoring with ratio transaction](../../../../../build/transactions/partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、 `FeeDelegatedChainDataAnchoringWithRatio` トランザクションを作成することができる。

`FeeDelegatedChainDataAnchoringWithRatio` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `FeeDelegatedChainDataAnchoringWithRatio` トランザクションを作成するときに `transactionObject` にオプションで定義できるプロパティを指す。

:::note

注: RLP エンコードされた文字列から `FeeDelegatedChainDataAnchoringWithRatio` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.feeDelegatedChainDataAnchoringWithRatio.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.feeDelegatedChainDataAnchoringWithRatio({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.feeDelegatedChainDataAnchoringWithRatio.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                       |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| より       | ストリング | 送信者のアドレス。                                                                                                                                |
| 入力       | ストリング | サービスチェーンのデータ。                                                                                                                            |
| ガス       | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 手数料率     | ストリング | 手数料支払者が負担する取引手数料の割合を示す比率。 この比率の有効範囲は1～99である。 0や100以上の比率は許されない。                                                                           |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| 署名       | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| 料金支払者の署名 | 配列    | (オプション) feePayerSignatures の配列。                                                                                       |
| 料金支払者    | ストリング | (任意）料金支払者の住所。                                                                                                         |
| ガス価格     | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID   | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

**例**

```javascript
// Create a feeDelegatedChainDataAnchoringWithRatio
> caver.transaction.feeDelegatedChainDataAnchoringWithRatio({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
    feeRatio: 30,
})

// Create a feeDelegatedChainDataAnchoringWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedChainDataAnchoringWithRatio('0x4af90177128505d21dba0085174876e80094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8aff8ad80b8aaf8a8a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405800658f845f84326a0c612a243bcb3b98958e9cce1a0bc0e170291b33a7f0dbfae4b36dafb5806797da00c734423492ecc21cc53238147c359676fcec43fcc2a0e021d87bb1da49f0abf9433f524631e573329a550296f595c820d6c65213ff845f84325a0a3e40598b67e2bcbaa48fdd258b9d1dcfcc9cc134972560ba042430078a769a5a06707ea362e588e4e5869cffcd5a058749d823aeff13eb95dc1146faff561df32')
FeeDelegatedChainDataAnchoringWithRatio {
    _type: 'TxTypeFeeDelegatedChainDataAnchoringWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0x174876e800',
    _nonce: '0x12',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x26', _r: '0xc612a...', _s: '0x0c734...' } ],
    _feePayer: '0x33f524631e573329a550296f595c820d6c65213f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0xa3e40...', _s: '0x6707e...' } ],
    _feeRatio: '0x58',
    _input: '0xf8ad8...'
}
```
