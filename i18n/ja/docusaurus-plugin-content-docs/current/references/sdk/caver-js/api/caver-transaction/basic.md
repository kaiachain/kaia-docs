---
sidebar_label: ベーシック
---

# 基本型トランザクションクラス

## レガシー・トランザクション<a id="legacytransaction"></a>

```javascript
caver.transaction.legacyTransaction.create(transactionObject)
```

`LegacyTransaction` represents a [legacy transaction](../../../../../build/transactions/basic.md#txtypelegacytransaction). [kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts) が `LegacyTransaction` を実行できるのは、[AccountKeyLegacy] を持つ場合のみです。 `transactionObject` には、`LegacyTransaction` を作成するための以下のプロパティを指定することができる。

`LegacyTransaction`は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `LegacyTransaction` を作成するときに `transactionObject` にオプションで指定できるプロパティを指す。

:::note

注: RLP エンコードされた文字列から `LegacyTransaction` のインスタンスを作成することができる。 以下の例を参照してください。
注意: `caver.transaction.legacyTransaction.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.legacyTransaction({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.legacyTransaction.create({...})`に変更してください。

:::

**プロパティ**

| 名称       | タイプ   | 説明                                                                                                                                                                     |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gas      | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                               |
| 価値       | ストリング | (オプション、デフォルト: `'0x0'`) 転送するKAIAの量をpebで指定する。 `caver.utils.toPeb`を使うことができる。                                                           |
| より       | ストリング | (オプション) 送信者のアドレス。 省略した場合は、署名に使用するキーリング・アドレスが設定される。                                                                                                  |
| への       | ストリング | (オプション、デフォルト: `'0x'`) 送金された値を受け取る口座アドレス、またはレガシー取引でスマートコントラクトを実行する場合はスマートコンタクトアドレス。 レガシートランザクションがスマートコントラクトをデプロイする場合、`to`を定義する必要はない。 |
| 入力       | ストリング | (オプション）スマートコントラクトの展開/実行に使用される、トランザクションに添付されたデータ。                                                                                                    |
| 署名       | 配列    | (オプション) シグネチャの配列。 レガシートランザクションは1つの署名しか持つことができない。                                                                                                    |
| ノンス      | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。                               |
| gasPrice | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                                                            |
| チェーンID   | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                                                 |

**例**

```javascript
// Create a legacyTransaction for sending KAIA
> caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Create a legacyTransaction to deploy smart contract
> caver.transaction.legacyTransaction.create({
    input: '0x60806...',
    gas: 200000,
})

// Create a legacyTransaction to execute smart contract
> caver.transaction.legacyTransaction.create({
    to: '0xfe6c9118e56a42cbc77aa3b7ee586455e3dc5b6d', // Smart contact address
    input: '0xa9059...',
    gas: 200000,
})

// Create a legacyTransaction from RLP-encoded string
> caver.transaction.legacyTransaction.create('0xf8668204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a843132333425a0b2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9a029da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567')
LegacyTransaction {
    _type: 'TxTypeLegacyTransaction',
    _from: '0x',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: SignatureData { _v: '0x25', _r: '0xb2a5a...', _s:  '0x29da1...' },
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _input: '0x31323334',
    _value: '0xa'
}
```

## バリュー・トランスファー<a id="valuetransfer"></a>

```javascript
caver.transaction.valueTransfer.create(transactionObject)
```

`ValueTransfer` represents a [value transfer transaction](../../../../../build/transactions/basic.md#txtypevaluetransfer). トランザクションオブジェクト `transactionObject` は `ValueTransfer` トランザクションを作成するために以下のプロパティを持つことができる。

`ValueTransfer`は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `ValueTransfer` トランザクションを作成するときに `transactionObject` にオプションで与えることができるプロパティを指す。

:::note

注: RLP エンコードされた文字列から `ValueTransfer` のインスタンスを作成することができる。 以下の例を参照してください。
注意: `caver.transaction.valueTransfer.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.valueTransfer({...})`のようなコンストラクタを使用してトランザクションを作成していた場合は、`caver.transaction.valueTransfer.create({...})`に変更してください。

:::

**プロパティ**

| 名称     | タイプ   | 説明                                                                                                                                       |
| ------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 価値     | ストリング | 譲渡されるKAIAの金額。 `caver.utils.toPeb`を使うことができる。                                                                                              |
| より     | ストリング | 送信者のアドレス。                                                                                                                                |
| への     | ストリング | 送金された金額を受け取る口座アドレス。                                                                                                                      |
| ガス     | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 署名     | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| ノンス    | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| ガス価格   | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

**例**

```javascript
// Create a valueTransfer
> caver.transaction.valueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Create a valueTransfer from RLP-encoded string
> caver.transaction.valueTransfer.create('0x08f87f3a8505d21dba0083015f90948723590d5d60e35f7ce0db5c09d3938b26ff80ae01947d0104ac150f749d36bb34999bcade9f2c0bd2e6f847f845820feaa03d820b27d0997baf16f98df01c7b2b2e9734ad05b2228c4d403c2facff8397f3a01f4a44eeb8b7f0b0019162d1d6b90c401078e56fcd7495e74f7cfcd37e25f017')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0x7d0104ac150f749d36bb34999bcade9f2c0bd2e6',
    _gas: '0x15f90',
    _nonce: '0x3a',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x3d820...', _s: '0x1f4a4...' } ],
    _to: '0x8723590d5d60e35f7ce0db5c09d3938b26ff80ae',
    _value: '0x1'
}
```

## バリュー・トランスファーメモ<a id="valuetransfermemo"></a>

```javascript
caver.transaction.valueTransferMemo.create(transactionObject)
```

`ValueTransferMemo` represents a [value transfer memo transaction](../../../../../build/transactions/basic.md#txtypevaluetransfermemo). トランザクションオブジェクト `transactionObject` は `ValueTransferMemo` トランザクションを作成するために以下のプロパティを持つことができる。

`ValueTransferMemo`は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `ValueTransferMemo` トランザクションを作成するときに `transactionObject` にオプションで指定できるプロパティである。

:::note

注: RLPでエンコードされた文字列から `ValueTransferMemo` のインスタンスを作成することができる。 以下の例を参照してください。
注意: `caver.transaction.valueTransferMemo.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.valueTransferMemo({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.valueTransferMemo.create({...})`に変更してください。

:::

**プロパティ**

| 名称     | タイプ   | 説明                                                                                                                                       |
| ------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 価値     | ストリング | 譲渡されるKAIAの金額。 `caver.utils.toPeb`を使うことができる。                                                                                              |
| より     | ストリング | 送信者のアドレス。                                                                                                                                |
| への     | ストリング | 送金された金額を受け取る口座アドレス。                                                                                                                      |
| 入力     | ストリング | トランザクションに付随するデータ。 メッセージはこのプロパティに渡されるべきである。                                                                                               |
| ガス     | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 署名     | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| ノンス    | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| ガス価格   | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

**例**

```javascript
// Create a valueTransferMemo
> caver.transaction.valueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
})

// Create a valueTransferMemo from RLP-encoded string
> caver.transaction.valueTransferMemo.create('0x10f8808204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84325a07d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1ca02b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3')
ValueTransferMemo {
    _type: 'TxTypeValueTransferMemo',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x7d2b0...', _s: '0x2b1cb...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## アカウント更新<a id="accountupdate"></a>

```javascript
caver.transaction.accountUpdate.create(transactionObject)
```

`AccountUpdate` represents a [account update transaction](../../../../../build/transactions/basic.md#txtypeaccountupdate). トランザクションオブジェクト `transactionObject` は、`AccountUpdate` トランザクションを作成するために以下のプロパティを持つことができる。

`AccountUpdate`は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `AccountUpdate` トランザクションを作成するときに `transactionObject` にオプションで与えることができるプロパティである。

:::note

注: RLPエンコードされた文字列から`AccountUpdate`のインスタンスを作成することができる。 以下の例を参照してください。
注意: `caver.transaction.accountUpdate.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.accountUpdate({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.accountUpdate.create({...})`に変更してください。

:::

**プロパティ**

| 名称     | タイプ      | 説明                                                                                                                                       |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| より     | ストリング    | 送信者のアドレス。                                                                                                                                |
| アカウント  | \[アカウント］ | アカウントの更新に必要な情報を含む[Account]インスタンス。                                                                                                        |
| ガス     | ストリング    | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| 署名     | 配列       | (オプション) シグネチャの配列。                                                                                                     |
| ノンス    | ストリング    | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| ガス価格   | ストリング    | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID | ストリング    | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

`AccountKey`ごとに[Account]インスタンスを作成する方法については、[Getting Started - Account Update](../../get-started.md#account-update)または[caver.account.create](../caver.account.md#caver-account-create)を参照してください。

**例**

```javascript
// Create a accountUpdate
> caver.transaction.accountUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
})

// Create a accountUpdate from RLP-encoded string
> caver.transaction.accountUpdate.create('0x20f88d808505d21dba0083030d4094ffb52bc54635f840013e142ebe7c06c9c91c1625a302a102c93fcbdb2b9dbef8ee5c4748ffdce11f1f5b06d7ba71cc2b7699e38be7698d1ef847f845820fe9a09c2ca281e94567846acbeef724b1a7a5f882d581aff9984755abd92272592b8ea0344fd23d7774ae9c227809bb579387dfcd69e74ae2fe3a788617f54a4001e5ab')
AccountUpdate {
    _type: 'TxTypeAccountUpdate',
    _from: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
    _gas: '0x30d40',
    _nonce: '0x0',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x9c2ca...', _s: '0x344fd...' } ],
    _account: Account {
        _address: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
        _accountKey: AccountKeyPublic { _publicKey: '0x02c93...' } 
    }
}
```

## スマートコントラクトデプロイ<a id="smartcontractdeploy"></a>

```javascript
caver.transaction.smartContractDeploy.create(transactionObject)
```

`SmartContractDeploy` represents a [smart contract deploy transaction](../../../../../build/transactions/basic.md#txtypesmartcontractdeploy). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、`SmartContractDeploy` トランザクションを作成することができる。

`SmartContractDeploy` は、以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `SmartContractDeploy` トランザクションを作成するときに `transactionObject` にオプションで指定できるプロパティである。

:::note

注: RLP エンコードされた文字列から `SmartContractDeploy` のインスタンスを作成できます。 以下の例を参照してください。
注意: `caver.transaction.smartContractDeploy.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.smartContractDeploy({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.smartContractDeploy.create({...})`に変更してください。

:::

**プロパティ**

| 名称        | タイプ   | 説明                                                                                                                                                                 |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| より        | ストリング | 送信者のアドレス。                                                                                                                                                          |
| 入力        | ストリング | トランザクションに付随するデータ。 デプロイされるスマート・コントラクトのバイトコードとその引数。 これは[caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy)で取得できる。 |
| ガス        | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                           |
| 価値        | ストリング | (オプション、デフォルト: `'0x0'`) コントラクトが初期化されたときに、スマートコントラクトのアドレスの残高に転送され、保存されるKAIAの量をpebで指定する。 `caver.utils.toPeb`を使うことができる。             |
| への        | ストリング | (オプション、デフォルト: `'0x'`) スマートコントラクトがデプロイされるアドレス。 現在、この値を定義することはできない。 アドレスの指定は将来サポートされる予定。                                          |
| 人間可読      | ブーリアン | (オプション、デフォルト: `false`) 人間が読めるアドレスはまだサポートされていないので、これは false でなければならない。                                                           |
| コードフォーマット | ストリング | (オプション、デフォルト: `'EVM'`) スマートコントラクトのコードフォーマット。 今のところ、サポートされる値はEVMのみ。 この値は、代入後、内部で16進文字列に変換される（例えば、`EVM`は`0x0`に変換される）。             |
| 署名        | 配列    | (オプション) シグネチャの配列。                                                                                                                               |
| ノンス       | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。                           |
| ガス価格      | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                                                        |
| チェーンID    | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                                             |

**例**

```javascript
// Create a smartContractDeploy
> caver.transaction.smartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// Create a smartContractDeploy from RLP-encoded string
> caver.transaction.smartContractDeploy.create('0x28f9027e1f8505d21dba00830dbba0808094d91aec35bea25d379e49cfe2dff5f5775cdac1a3b9020e60806040526000805534801561001457600080fd5b506101ea806100246000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461007257806342cbb15c1461009d578063767800de146100c8578063b22636271461011f578063d14e62b814610150575b600080fd5b34801561007e57600080fd5b5061008761017d565b6040518082815260200191505060405180910390f35b3480156100a957600080fd5b506100b2610183565b6040518082815260200191505060405180910390f35b3480156100d457600080fd5b506100dd61018b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561012b57600080fd5b5061014e60048036038101908080356000191690602001909291905050506101b1565b005b34801561015c57600080fd5b5061017b600480360381019080803590602001909291905050506101b4565b005b60005481565b600043905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b50565b80600081905550505600a165627a7a7230582053c65686a3571c517e2cf4f741d842e5ee6aa665c96ce70f46f9a594794f11eb00298080f847f845820fe9a0018a9f680a74e275f1f83a5c2c45e1313c52432df4595e944240b1511a4f4ba7a02d762c3417f91b81db4907db832cb28cc64df7dca3ea9be64899ab3f4812f016')
SmartContractDeploy {
    _type: 'TxTypeSmartContractDeploy',
    _from: '0xd91aec35bea25d379e49cfe2dff5f5775cdac1a3',
    _gas: '0xdbba0',
    _nonce: '0x1f',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x018a9...', _s: '0x2d762...' } ],
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## スマート契約実行<a id="smartcontractexecution"></a>

```javascript
caver.transaction.smartContractExecution.create(transactionObject)
```

`SmartContractExecution` represents a [smart contract execution transaction](../../../../../build/transactions/basic.md#txtypesmartcontractexecution). トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、`SmartContractExecution` トランザクションを作成することができる。

`SmartContractExecution` は、以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `SmartContractExecution` トランザクションを作成するときに `transactionObject` にオプションで指定できるプロパティである。

:::note

注: RLP エンコードされた文字列から `SmartContractExecution` のインスタンスを作成することができる。 以下の例を参照してください。
注意: `caver.transaction.smartContractExecution.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.smartContractExecution({...})`のようなコンストラクタを使用してトランザクションを作成していた場合は、`caver.transaction.smartContractExecution.create({...})`に変更してください。

:::

**プロパティ**

| 名称     | タイプ   | 説明                                                                                                                                                                                         |
| ------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| より     | ストリング | 送信者のアドレス。                                                                                                                                                                                  |
| への     | ストリング | 実行されるスマートコントラクトアカウントのアドレス。                                                                                                                                                                 |
| 入力     | ストリング | トランザクションの実行に使用される、トランザクションに添付されたデータ。 入力はエンコードされた文字列で、呼び出す関数とこの関数に渡すパラメータを示す。 これは[caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)で取得できます。 |
| ガス     | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                                                   |
| 価値     | ストリング | (オプション、デフォルト: `'0x0'`) 転送するKAIAの量をpebで指定する。 `caver.utils.toPeb`を使うことができる。                                                                               |
| 署名     | 配列    | (オプション) シグネチャの配列。                                                                                                                                                       |
| ノンス    | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。                                                   |
| ガス価格   | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                                                                                |
| チェーンID | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                                                                     |

**例**

```javascript
// Create a smartContractExecution
> caver.transaction.smartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// Create a smartContractExecution from RLP-encoded string
> caver.transaction.smartContractExecution.create('0x30f8c5038505d21dba00830dbba094e3cd4e1cd287235cc0ea48c9fd02978533f5ec2b80946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f847f845820feaa066e1650b5779f152489633f343581c07938f8b2fc92c919d4dd7c7295d0beacea067b0b79383dbcd42a3aa8ebb1aa4bcb1fc0623ef9e97bc1e9b82d96fe37b5881')
SmartContractExecution {
    _type: 'TxTypeSmartContractExecution',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x3',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x66e16...', _s: '0x67b0b...' } ],
    _to: '0xe3cd4e1cd287235cc0ea48c9fd02978533f5ec2b',
    _value: '0x0',
    _input: '0xa9059...'
}
```

## キャンセル<a id="cancel"></a>

```javascript
caver.transaction.cancel.create(transactionObject)
```

`Cancel` represents a [cancel transaction](../../../../../build/transactions/basic.md#txtypecancel). トランザクションオブジェクト `transactionObject` は `Cancel` トランザクションを作成するために以下のプロパティを持つことができる。

`Cancel`トランザクションはトランザクションプール内の同じnonceを持つトランザク ションの実行をキャンセルする。

`Cancel`は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `Cancel` トランザクションを作成するときに `transactionObject` にオプションで与えることができるプロパティを指す。

:::note

注: RLPエンコードされた文字列から`Cancel`のインスタンスを作成することができる。 以下の例を参照してください。
注意: `caver.transaction.cancel.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.xcancelxx({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.cancelxx.create({...})`に変更してください。

:::

**プロパティ**

| 名称     | タイプ   | 説明                                                                                                                                       |
| ------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| より     | ストリング | 送信者のアドレス。                                                                                                                                |
| ガス     | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| ノンス    | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| 署名     | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| ガス価格   | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

**例**

```javascript
// Create a cancel
> caver.transaction.cancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// Create a cancel from RLP-encoded string
> caver.transaction.cancel.create('0x38f869068505d21dba00830dbba0946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24f847f845820feaa0d9994ef507951a59380309f656ee8ed685becdc89b1d1a0eb1d2f72683ae14d3a07ad5d37a89781f294fab72b254ea9266e4d039ae163db4a4c4752f1fabff023b')
Cancel {
    _type: 'TxTypeCancel',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x6',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0xd9994...', _s: '0x7ad5d...' } ]
}
```

## チェーンデータアンカリング<a id="chaindataanchoring"></a>

```javascript
caver.transaction.chainDataAnchoring.create(transactionObject)
```

`ChainDataAnchoring` represents a [chain data anchoring transaction](../../../../../build/transactions/basic.md#txtypechaindataanchoring). トランザクションオブジェクト `transactionObject` には、`ChainDataAnchoring` トランザクションを作成するための以下のプロパティを指定することができる。

`ChainDataAnchoring`は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `ChainDataAnchoring` トランザクションを作成するときに `transactionObject` にオプションで指定できるプロパティを指す。

:::note

注: RLP エンコードされた文字列から `ChainDataAnchoring` のインスタンスを作成することができる。 以下の例を参照してください。
注意: `caver.transaction.chainDataAnchoring.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.chainDataAnchoring({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.chainDataAnchoring.create({...})`に変更してください。

:::

**プロパティ**

| 名称     | タイプ   | 説明                                                                                                                                       |
| ------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| より     | ストリング | 送信者のアドレス。                                                                                                                                |
| 入力     | ストリング | サービスチェーンのデータ。                                                                                                                            |
| ガス     | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                 |
| ノンス    | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。 |
| 署名     | 配列    | (オプション) シグネチャの配列。                                                                                                     |
| ガス価格   | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                              |
| チェーンID | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                   |

**例**

```javascript
// Create a chainDataAnchoring
> caver.transaction.chainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// Create a chainDataAnchoring from RLP-encoded string
> caver.transaction.chainDataAnchoring.create('0x48f9010e8204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8a8f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405f845f84325a0e58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124a02c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09')
ChainDataAnchoring {
    _type: 'TxTypeChainDataAnchoring',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0xe58b9...', _s: '0x2c409...' } ],
    _input: '0xf8a6a...'
}
```

## イーサリアムアクセスリスト<a id="ethereumaccesslist"></a>

```javascript
caver.transaction.ethereumAccessList.create(transactionObject)
```

`EthereumAccessList` represents an [Ethereum access list transaction](../../../../../build/transactions/basic.md#txtypeethereumaccesslist). [kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts) が `EthereumAccessList` を実行できるのは、[AccountKeyLegacy] がある場合のみです。 トランザクションオブジェクト `transactionObject` は以下のプロパティを持つことができ、`EthereumAccessList` を作成することができる。

`EthereumAccessList` は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザが `EthereumAccessList` を作成する際に `transactionObject` にオプションで指定できるプロパティを指す。

:::note

注: RLP エンコードされた文字列から `EthereumAccessList` のインスタンスを作成できる。 以下の例を参照してください。
注意: `caver.transaction.ethereumAccessList` は caver-js [v1.8.0](https://www.npmjs.com/package/caver-js/v/1.8.0) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.ethereumAccessList({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.ethereumAccessList.create({...})`に変更してください。

:::

**プロパティ**

| 名称      | タイプ   | 説明                                                                                                                                                                                              |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ガス      | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                                                        |
| 価値      | ストリング | (オプション、デフォルト: `'0x0'`) 転送するKAIAの量をpebで指定する。 `caver.utils.toPeb`を使うことができる。                                                                                    |
| より      | ストリング | (オプション) 送信者のアドレス。 省略した場合は、署名に使用するキーリング・アドレスが設定される。                                                                                                                           |
| への      | ストリング | (オプション、デフォルト: `'0x'`) 転送された値を受け取る口座アドレス、またはイーサリアムアクセスリストトランザクションがスマートコントラクトを実行する場合はスマートコンタクトアドレス。 イーサリアムのアクセスリストトランザクションがスマートコントラクトをデプロイする場合、`to`を定義する必要はない。 |
| 入力      | ストリング | (オプション）スマートコントラクトの展開/実行に使用される、トランザクションに添付されたデータ。                                                                                                                             |
| 署名      | 配列    | (オプション) シグネチャの配列。 イーサリアムのアクセスリスト取引は1つの署名しか持つことができない。                                                                                                                         |
| ノンス     | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合、`caver.rpc.klay.getTransactionCount(address, 'pending')` が nonce の設定に使用される。                                                        |
| ガス価格    | ストリング | (オプション) 送信者がトークンで支払う金額を得るための乗数。 省略された場合は、`caver.rpc.klay.getGasPrice`がgasPriceの設定に使用される。                                                                                     |
| チェーンID  | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は、`caver.rpc.klay.getChainId` を使用して chainId を設定する。                                                                                          |
| アクセスリスト | 配列    | (オプション)トランザクションによって読み書きされるすべてのストレージスロットとアドレスを含むEIP-2930アクセスリストとして。                                                                                                           |

**例**

```javascript
> caver.transaction.ethereumAccessList.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 40000,
    accessList: [
        {
            address: '0x5430192ae264b3feff967fc08982b9c6f5694023',
            storageKeys: [
                '0x0000000000000000000000000000000000000000000000000000000000000003',
                '0x0000000000000000000000000000000000000000000000000000000000000007',
            ],
        },
    ]
})

> caver.transaction.ethereumAccessList.create('0x7801f90109822710238505d21dba00829c4094c5fb1386b60160614a8151dcd4b0ae41325d1cb801b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f85bf859945430192ae264b3feff967fc08982b9c6f5694023f842a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000701a05ac25e47591243af2d6b8e7f54d608e9e0e0aeb5194d34c17852bd7e376f4857a0095a40394f33e95cce9695d5badf4270f4cc8aff0b5395cefc3a0fe213be1f30')
EthereumAccessList {
  _type: 'TxTypeEthereumAccessList',
  _from: '0x0000000000000000000000000000000000000000',
  _gas: '0x9c40',
  _nonce: '0x23',
  _chainId: '0x2710',
  _signatures: SignatureData {
    _v: '0x01',
    _r: '0x5ac25e47591243af2d6b8e7f54d608e9e0e0aeb5194d34c17852bd7e376f4857',
    _s: '0x095a40394f33e95cce9695d5badf4270f4cc8aff0b5395cefc3a0fe213be1f30'
  },
  _to: '0xc5fb1386b60160614a8151dcd4b0ae41325d1cb8',
  _input: '0xa9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039',
  _value: '0x1',
  _accessList: AccessList(0) [],
  _gasPrice: '0x5d21dba00'
}
```

## イーサリアムダイナミックフィー<a id="ethereumdynamicfee"></a>

```javascript
caver.transaction.ethereumDynamicFee.create(transactionObject)
```

`EthereumDynamicFee` represents an [Ethereum dynamic fee transaction](../../../../../build/transactions/basic.md#txtypeethereumdynamicfee). [kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts) は、[AccountKeyLegacy] がある場合のみ、`EthereumDynamicFee` を実行することができます。 `EthereumDynamicFee`を作成するために、`transactionObject`は以下のプロパティを持つことができる。

`EthereumDynamicFee`は以下のプロパティをメンバ変数として持つ。 `optional`とマークされたプロパティは、ユーザーが `EthereumDynamicFee` を作成する際に `transactionObject` にオプションで指定できるプロパティを指す。
また、`EthereumDynamicFee` は `gasPrice` を使用せず、`maxPriorityFeePerGas` と `maxFeePerGas` を使用することに注意。

:::note

注: RLP エンコードされた文字列から `EthereumDynamicFee` のインスタンスを作成することができます。 以下の例を参照してください。
注意: `caver.transaction.ethereumDynamicFee` は caver-js [v1.8.0](https://www.npmjs.com/package/caver-js/v/1.8.0) 以降でサポートされています。

注意: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) では、トランザクションの作成は `create` 関数を使用してのみサポートされています。 `new caver.transaction.ethereumDynamicFee({...})`のようなコンストラクタを使ってトランザクションを作成していた場合は、`caver.transaction.ethereumDynamicFee.create({...})`に変更してください。

:::

**プロパティ**

| 名称           | タイプ   | 説明                                                                                                                                                                                          |
| ------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ガス           | ストリング | トランザクションが使用できる取引手数料の上限額。                                                                                                                                                                    |
| 価値           | ストリング | (オプション、デフォルト: `'0x0'`) 転送するKAIAの量をpebで指定する。 `caver.utils.toPeb`を使うことができる。                                                                                |
| より           | ストリング | (オプション) 送信者のアドレス。 省略した場合は、署名に使用したキーリングのアドレスが設定される。                                                                                                                       |
| への           | ストリング | (オプション、デフォルト: `'0x'`) イーサリアムのダイナミックフィー取引でスマートコントラクトが実行される際に、送金された値またはスマートコンタクトアドレスを受け取るアカウントアドレス。 イーサリアムのダイナミックフィー取引がスマートコントラクトをデプロイするとき、`to`を定義する必要はない。 |
| 入力           | ストリング | (オプション）スマートコントラクトの展開/実行に使用される、トランザクションに添付されたデータ。                                                                                                                         |
| 署名           | 配列    | (オプション) シグネチャの配列。 イーサリアムのダイナミックフィー取引は、1つの署名しか持つことができない。                                                                                                                  |
| ノンス          | ストリング | (オプション) 送信者のトランザクションを一意に識別するための値。 省略された場合は、`caver.rpc.klay.getTransactionCount(address, 'pending')` に設定される。                                                              |
| ガスあたりの最大優先料金 | ストリング | (オプション)ペブの取引用ガス・チップ・キャップ。 kaiaは固定ガス価格を持っているので、`caver.rpc.klay.getGasPrice`と同じ値を設定すべきである。 省略された場合は `caver.rpc.klay.getMaxPriorityFeePerGas()` に設定される。                     |
| ガス料金         | ストリング | (オプション) 取引を実行するために支払う金額の上限。 kaiaは固定ガス価格を持っているので、`caver.rpc.klay.getGasPrice`と同じ値を設定すべきである。 省略された場合、`baseFeePerGas * 2 + maxPriorityFeePerGas` の値が `maxFeePerGas` に設定される。 |
| チェーンID       | ストリング | (オプション) kaiaネットワークのチェーンID。 省略した場合は `caver.rpc.klay.getChainId` に設定される。                                                                                                   |
| アクセスリスト      | 配列    | (オプション) EIP-2930のアクセスリストとして、トランザクションによって読み書きされるすべてのストレージスロットとアドレスを含む。                                                                                                    |

**例**

```javascript
> caver.transaction.ethereumDynamicFee.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    accessList: [
        {
            address: '0x5430192ae264b3feff967fc08982b9c6f5694023',
            storageKeys: [
                '0x0000000000000000000000000000000000000000000000000000000000000003',
                '0x0000000000000000000000000000000000000000000000000000000000000007',
            ],
        },
    ]
})

> caver.transaction.ethereumDynamicFee.create('0x7802f9010f822710258505d21dba008505d21dba00829c40941fc92c23f71a7de4cdb4394a37fc636986a0f48401b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f85bf8599467116062f1626f7b3019631f03d301b8f701f709f842a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000780a04fc52da183020a27dc4b684a45404445630e946b0c1a37edeb538d4bdae63040a07d56dbcc61f42ffcbced105f838d20b8fe71e85a4d0344c7f60815fddfeae4cc')
EthereumDynamicFee {
  _type: 'TxTypeEthereumDynamicFee',
  _from: '0x0000000000000000000000000000000000000000',
  _gas: '0x9c40',
  _nonce: '0x25',
  _chainId: '0x2710',
  _signatures: SignatureData {
    _v: '0x',
    _r: '0x4fc52da183020a27dc4b684a45404445630e946b0c1a37edeb538d4bdae63040',
    _s: '0x7d56dbcc61f42ffcbced105f838d20b8fe71e85a4d0344c7f60815fddfeae4cc'
  },
  _to: '0x1fc92c23f71a7de4cdb4394a37fc636986a0f484',
  _input: '0xa9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039',
  _value: '0x1',
  _accessList: AccessList(0) [],
  _maxPriorityFeePerGas: '0x5d21dba00',
  _maxFeePerGas: '0x5d21dba00'
}
```

[AccountKeyLegacy]: ../../../../../learn/accounts.md#accountkeylegacy
[Account]: ../caver.account.md#account
