# caver.contract

`caver.contract`オブジェクトは、kaiaブロックチェーンプラットフォーム上のスマートコントラクトとのやり取りを容易にする。 新しいコントラクト・オブジェクトを作成する際、そのスマート・コントラクトのJSONインターフェースを提供する必要がある。caver-jsは、javascriptでコントラクト・オブジェクトを使用するすべての呼び出しを、RPCを介した低レベルABI呼び出しに自動的に変換する。

これにより、スマート・コントラクトをJavaScriptのオブジェクトのように扱うことができる。

## caver.contract.create <a href="#caver-contract-create" id="caver-contract-create"></a>

```javascript
caver.contract.create(jsonInterface [, address] [, options])
```

JSON インターフェース・オブジェクトに定義されたすべてのメソッドとイベントを持つ、新しいコントラクト・インスタンスを作成します。 この関数は、[new caver.contract](#new-contract) と同じ働きをする。

**NOTE** `caver.contract.create`は、caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)からサポートされています。

**パラメーター**

new caver.contract](#new-contract) を参照。

**リターン・バリュー**

new caver.contract](#new-contract) を参照。

**例**

```javascript
const contract = caver.contract.create([
    {
        constant: true,
        inputs: [{ name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    ...
  ], '0x{address in hex}')
```

## caver.contract <a href="#new-contract" id="new-contract"></a>

```javascript
new caver.contract(jsonInterface [, address] [, options])
```

JSON インターフェース・オブジェクトに定義されたすべてのメソッドとイベントを持つ、新しいコントラクト・インスタンスを作成します。

**パラメーター**

| 名称            | タイプ    | 説明                                                                                                                                                                                         |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| jsonInterface | オブジェクト | インスタンス化するコントラクトのJSONインターフェース                                                                                                                                                               |
| 住所            | ストリング  | (オプション) 呼び出すスマート・コントラクトのアドレス。 myContract.options.address='0x1234...'\`を使って後で追加することができる。 |
| オプション         | オブジェクト | (オプション）契約のオプション。 詳細は以下の表を参照のこと。                                                                                                                                         |

オプション・オブジェクトには以下のものが含まれる：

| 名称         | タイプ   | 説明                                                                                                                                                    |
| ---------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| より         | ストリング | (オプション) 取引を行うアドレス。                                                                                                                 |
| ガス価格       | ストリング | (オプション）取引に使用するガス価格（peb）。                                                                                                           |
| ガス         | 番号    | (オプション) 取引に提供されるガスの最大値（ガスリミット）。                                                                                                    |
| データ        | ストリング | (オプション）契約のバイトコード。 契約が配備されるときに使用される。                                                                                                |
| フィーデレゲーション | ブーリアン | (オプション) 手数料委任取引を使用するかどうか。                                                                                                          |
| 料金支払者      | ストリング | (オプション）トランザクションFeeを支払方のアドレス。 `feeDelegation`が `true` のとき、その値はトランザクションの `feePayer` フィールドに設定される。                                     |
| 手数料率       | ストリング | (任意）手数料支払者が負担する取引手数料の比率。 `feeDelegation`が `true` で、`feeRatio`に有効な値が設定されている場合、部分的な料金委譲トランザクショ ンが使用される。 有効範囲は1～99。 0や100以上の比率は許されない。 |

**リターン・バリュー**

| タイプ    | 説明                        |
| ------ | ------------------------- |
| オブジェクト | すべてのメソッドとイベントを持つ契約インスタンス。 |

**例**

```javascript
const myContract = new caver.contract([...], '0x{address in hex}', { gasPrice: '25000000000' })
```

## myContract.options <a href="#mycontract-options" id="mycontract-options"></a>

```javascript
myContract.options
```

契約インスタンスの `options` オブジェクト。 `from`、`gas`、`gasPrice`、`feePayer` および `feeRatio` は、トランザクションを送信する際のフォールバック値として使用される。

**プロパティ**

| 名称            | タイプ   | 説明                                                                                                                                                    |
| ------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 住所            | ストリング | 契約が展開されている住所。                                                                                                                                         |
| jsonInterface | 配列    | 契約の JSON インターフェース。                                                                                                                                    |
| より            | ストリング | 契約展開/実行トランザクションが送信されるデフォルトのアドレス。 トランザクションの作成時に `from` アドレスが定義されていない場合、この `myContract.options.from` がトランザクションの作成に常に使用される。                              |
| ガス価格          | ストリング | 取引に使用するペブでのガス料金。                                                                                                                                      |
| ガス            | 番号    | 取引に提供されるガスの上限（ガスリミット）。                                                                                                                                |
| データ           | ストリング | 契約のバイトコード。 契約が配備されるときに使用される。                                                                                                                          |
| フィーデレゲーション    | ブーリアン | (オプション) 手数料委任取引を使用するかどうか。                                                                                                          |
| 料金支払者         | ストリング | (オプション）取引手数料を支払う手数料支払人の住所。 `feeDelegation`が `true` のとき、その値はトランザクションの `feePayer` フィールドに設定される。                                       |
| 手数料率          | ストリング | (任意）手数料支払者が負担する取引手数料の比率。 `feeDelegation`が `true` で、`feeRatio`に有効な値が設定されている場合、部分的な料金委譲トランザクショ ンが使用される。 有効範囲は1～99。 0や100以上の比率は許されない。 |

**NOTE** `feeDelegation`、`feePayer`、`feeRatio` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**例**

```javascript
> myContract.options
{
  address: [Getter/Setter],
  jsonInterface: [Getter/Setter],
  from: [Getter/Setter],
  feePayer: [Getter/Setter],
  feeDelegation: [Getter/Setter],
  feeRatio: [Getter/Setter],
  gasPrice: [Getter/Setter],
  gas: [Getter/Setter],
  data: [Getter/Setter]
}

> myContract.options.from = '0x1234567890123456789012345678901234567891' // default from address
> myContract.options.gasPrice = '25000000000000' // default gas price in peb
> myContract.options.gas = 5000000 // provide as fallback always 5M gas
> myContract.options.feeDelegation = true // use fee delegation transaction
> myContract.options.feePayer = '0x1234567890123456789012345678901234567891' // default fee payer address
> myContract.options.feeRatio = 20 // default fee ratio when send partial fee delegation transaction
```

## myContract.options.address <a href="#mycontract-options-address" id="mycontract-options-address"></a>

```javascript
myContract.options.アドレス
```

この契約インスタンス `myContract` に使用されるアドレス。 この契約からcaver-jsによって生成されるすべてのトランザクションは、このアドレスをトランザクションの`to`として含む。

**プロパティ**

| 名称 | タイプ         | 説明                                  |
| -- | ----------- | ----------------------------------- |
| 住所 | string \\ | このコントラクトのアドレス。まだ設定されていない場合は `null`。 |

**例**

```javascript
> myContract.options.address
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// 契約アドレスを設定
> myContract.options.address = '0x1234FFDD...'
```

## myContract.options.jsonInterface<a href="#mycontract-options-jsoninterface" id="mycontract-options-jsoninterface"></a>

```javascript
myContract.options.jsonInterface
```

この契約の ABI `myContract` から派生した JSON インターフェースオブジェクト。

**プロパティ**

| 名称            | タイプ | 説明                                                             |
| ------------- | --- | -------------------------------------------------------------- |
| jsonInterface | 配列  | この契約の JSON インターフェース。 これを再設定すると、コントラクト・インスタンスのメソッドとイベントが再生成される。 |

**例**

```javascript
> myContract.options.jsonInterface
[
  {
    constant: true,
    inputs: [ { name: 'interfaceId', type: 'bytes4' } ],
    name: 'supportsInterface',
    outputs: [ { name: '', type: 'bool' } ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x01ffc9a7',
  },
  ...
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'owner', type: 'address' },
      { indexed: true, name: 'spender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event',
    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
  },
]

// set a new jsonInterface
> myContract.options.jsonInterface = [...]
```

## myContract.clone<a href="#mycontract-clone" id="mycontract-clone"></a>

```javascript
myContract.clone([contractAddress])
```

現在の契約インスタンスをクローンします。

**パラメーター**

| 名称   | タイプ   | 説明                                                                                               |
| ---- | ----- | ------------------------------------------------------------------------------------------------ |
| 契約住所 | ストリング | (オプション）新しい契約の住所。 省略された場合、元のインスタンスのアドレスが設定される（例：`myContract.options.address`）。 |

**リターン・バリュー**

| タイプ    | 説明                   |
| ------ | -------------------- |
| オブジェクト | クローン化された新しい契約インスタンス。 |

**例**

```javascript
> myContract.clone()
Contract {
  currentProvider：[Getter/Setter],
  ...
  _keyrings：KeyringContainer { ... }
}.
```

## myContract.deploy<a href="#mycontract-deploy2" id="mycontract-deploy2"></a>

```javascript
myContract.deploy(options, byteCode [, param1 [, param2 [, ...]])
```

契約をkaiaネットワークに展開する。 デプロイに成功すると、プロミスは新しいコントラクト・インスタンスで解決される。 既存の[myContract.deploy](#mycontract-deploy)関数の使い勝手とは異なり、この関数はkaiaネットワークに直接トランザクションを送信する。 返されたオブジェクトで `send()` を呼び出す必要はない。

**NOTE** `caver.wallet`に署名を行うには、`options`または`myContract.options`の`from`と`feePayer`に対応するキーリングのインスタンスが含まれていなければならない。

**NOTE** `myContract.deploy` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                            |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------- |
| オプション  | オブジェクト | 送信に使用するオプション。 詳細は[methods.methodName.send](#methods-methodname-send)の表を参照のこと。 |
| バイトコード | ストリング  | 契約のバイトコード。                                                                                                    |
| パラメーター | ミックス   | (オプション) デプロイ時にコンストラクタに渡されるパラメータ。                                                           |

**リターン・バリュー**

`Promise` は `PromiEvent` を返す：プロミスは新しいコントラクトのインスタンスで解決される。

| タイプ     | 説明                                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| プロミイベント | プロミスを組み合わせたイベント・エミッター。 取引レシートが利用可能になれば解決する。 もし `send()` が `myContract.deploy()` から呼ばれた場合、プロミスは新しいコントラクトのインスタンスで解決されます。 |

PromiEventでは、以下のイベントが利用可能です：

- トランザクションハッシュ `transactionHash`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生する。 型は `string` である。
- `receipt`：トランザクションのレシートが利用可能になったときに発生する。 詳細については、[caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) を参照してください。 型は `object` である。
- `error`：送信中にエラーが発生した場合に発生する。 ガス欠エラーの場合、2番目のパラメータはレシートとなる。 その型は `Error` である。

**例**

```javascript
// Deploy a smart contract without constructor arguments
> myContract.deploy({
      from: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) // contains the new contract address
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// Deploy a smart contract with constructor arguments
> myContract.deploy({
      from: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}', 'keyString', ...)
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) 
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })

// Deploy a smart contract with fee delegation transaction (TxTypeFeeDelegatedSmartContractDeploy)
> myContract.deploy({
      from: '0x{address in hex}',
      feeDelegation: true,
      feePayer: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress)
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })

// Deploy a smart contract with partial fee delegation transaction (TxTypeFeeDelegatedSmartContractDeployWithRatio)
> myContract.deploy({
      from: '0x{address in hex}',
      feeDelegation: true,
      feePayer: '0x{address in hex}',
      feeRatio: 30,
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress)
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })
```

## myContract.deploy<a href="#mycontract-deploy" id="mycontract-deploy"></a>

```javascript
myContract.deploy(options)
```

スマートコントラクトをkaiaにデプロイする際に使用したオブジェクトを返します。 スマートコントラクトのデプロイ・トランザクションは、`myContract.deploy({ data, arguments }).send(options)` を呼び出すことで送信できる。 デプロイに成功すると、プロミスは新しいコントラクト・インスタンスで解決される。

**パラメーター**

| 名称    | タイプ    | 説明                                 |
| ----- | ------ | ---------------------------------- |
| オプション | オブジェクト | 展開に使用するオプションオブジェクト。 以下の表を参照してください。 |

オプション・オブジェクトには、以下のものを含めることができる：

| 名称  | タイプ   | 説明                                               |
| --- | ----- | ------------------------------------------------ |
| データ | ストリング | 契約のバイトコード。                                       |
| 引数  | 配列    | (オプション) デプロイ時にコンストラクタに渡される引数。 |

**リターン・バリュー**

| タイプ    | 説明                                        |
| ------ | ----------------------------------------- |
| オブジェクト | 契約配布のための引数や関数が定義されたオブジェクト。 以下の表を参照してください。 |

このオブジェクトには以下が含まれる：

| 名称                                                   | タイプ | 説明                                                                     |
| ---------------------------------------------------- | --- | ---------------------------------------------------------------------- |
| 引数                                                   | 配列  | `options.arguments`に渡された引数。                                            |
| [送信](#methods-methodname-send)                       | 機能  | カイアにコントラクトをデプロイする関数。 この関数の結果としてのプロミスは、新しいコントラクト・インスタンスで解決される。          |
| [サイン](#methods-methodname-sign)                      | 機能  | 送信者としてスマートコントラクトのデプロイ取引に署名する関数。 sign関数は署名されたトランザクションを返す。               |
| [SignAsFeePayer](#methods-methodname-signasfeepayer) | 機能  | スマートコントラクトのデプロイ取引に手数料支払者として署名する機能。 signAsFeePayer 関数は署名されたトランザクションを返す。 |
| [推定ガス](#methods-methodname-estimategas)              | 機能  | 配備に使用されるガスを見積もる関数。 この機能を実行しても、契約は破棄されない。                               |
| [encodeABI](#methods-methodname-encodeabi)           | 機能  | デプロイのABIをエンコードする関数で、コントラクトデータ＋コンストラクタのパラメータとなる。 この機能を実行しても、契約は破棄されない。  |

**注意** `myContract.deploy({ data, arguments }).sign(options)` と `myContract.deploy({ data, arguments }).signAsFeePayer(options)` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

**例**

```javascript
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  }, function(error, transactionHash) { ... })
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) // contains the new contract address
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// When the data is already set as an option to the contract itself
> myContract.options.data = '0x12345...'

> myContract.deploy({
        arguments: [123, 'My string']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// Simply encoding
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .encodeABI()
'0x12345...0000012345678765432'

// Gas estimation
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .estimateGas(function(err, gas) {
      console.log(gas)
  })
```

## myContract.send<a href="#mycontract-send" id="mycontract-send"></a>

```javascript
myContract.send(options, methodName [, param1 [, param2 [, ...]])
```

スマートコントラクトの機能を実行するためにトランザクションを提出する。 これにより、スマート・コントラクトの状態を変更することができる。

この関数で使用されるトランザクションタイプは、`options` または `myContract.options` で定義された値に依存する。 `myContract.send`で手数料を委譲したトランザクションを使用したい場合は、`feeDelegation`と`feePayer`を適切に設定する必要がある。

- `feeDelegation`が定義されていないか、`false`に定義されています：[SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- `feeDelegation` は `true` に定義されているが、`feePayer` は定義されていない : エラーをスローする。
- `feeDelegation`は`true`に定義され、`feePayer`は定義されているが、`feeRatio`は定義されていない：[FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- `feeDelegation`を`true`に定義し、`feePayer`と`feeRatio`を定義する：[FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**NOTE** `caver.wallet`に署名を行うには、`options`または`myContract.options`の`from`と`feePayer`に対応するキーリングのインスタンスが含まれていなければならない。

**NOTE** `myContract.send` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                            |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------- |
| オプション  | オブジェクト | 送信に使用するオプション。 詳細は[methods.methodName.send](#methods-methodname-send)の表を参照のこと。 |
| メソッド名  | ストリング  | 実行するコントラクト関数のメソッド名。                                                                                           |
| パラメーター | ミックス   | (オプション) スマートコントラクト関数に渡されるパラメータ。                                                            |

**リターン・バリュー**

`Promise` は `PromiEvent` を返す。

| タイプ     | 説明                                                                |
| ------- | ----------------------------------------------------------------- |
| プロミイベント | プロミスを組み合わせたイベント・エミッター。 取引レシートが利用可能になれば解決する。 約束は新しい契約インスタンスで解決される。 |

PromiEventでは、以下のイベントが利用可能です：

- `transactionHash`：トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生する。 型は `string` である。
- `receipt`：トランザクションのレシートが利用可能になったときに発生する。 詳細については、[caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) を参照してください。 その型は `object` である。
- `error`：送信中にエラーが発生した場合に発生する。 ガス欠エラーの場合、2番目のパラメータはレシートとなる。 その型は `Error` である。

**例**

```javascript
// Send a SmartContractExecution and use the promise
> myContract.send({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123).then(console.log)
{
  blockHash: '0x294202dcd1d3c422880e2a209b9cd70ce7036300536c78ab74130c5717cb90da',
  blockNumber: 16342,
  contractAddress: null,
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 47411,
  input: '0x983b2...',
  logsBloom: '0x00800...',
  nonce: '0x1cd',
  senderTxHash: '0xe3f50d2bab2c462ef99379860d2b634d85a0c9fba4e2b189daf1d96bd4bbf8ff',
  signatures: [ { V: '0x4e43', R: '0x2ba27...', S: '0x50d37...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0xe3f50d2bab2c462ef99379860d2b634d85a0c9fba4e2b189daf1d96bd4bbf8ff',
  transactionIndex: 0,
  type: 'TxTypeSmartContractExecution',
  typeInt: 48,
  value: '0x0',
  events: {...}
}

// Send a SmartContractExecution and use the event emitter
> myContract.send({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123)
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt)
  })
  .on('error', console.error)

// Send a FeeDelegatedSmartContractExecution
> myContract.send({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
  }, 'methodName', 123).then(console.log)
{
  blockHash: '0x149e36f279577c306fccb9779a0274e802501c32f7054c951f592778bd5c168a',
  blockNumber: 16458,
  contractAddress: null,
  feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  feePayerSignatures: [ { V: '0x4e43', R: '0x48c28...', S: '0x18413...' } ],
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 57411,
  input: '0x983b2d5600000000000000000000000022bb89bd35e7b12bd25bea4165cf0f9330032f8c',
  logsBloom: '0x00800...',
  nonce: '0x1f5',
  senderTxHash: '0x5b06ca5046229e066c11dfc0c74fcbc98509294370981f9b142378a8f2bd5fe8',
  signatures: [ { V: '0x4e44', R: '0xfb707...', S: '0x641c6...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0x0e04be479ad06ec87acbf49abd44f16a56390c736f0a7354860ebc7fc0f92e13',
  transactionIndex: 1,
  type: 'TxTypeFeeDelegatedSmartContractExecution',
  typeInt: 49,
  value: '0x0',
  events: {...}
}

// Send a FeeDelegatedSmartContractExecutionWithRatio
> myContract.send({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
{
  blockHash: '0x8f0a0137cf7e0fea503c818910140246437db36121871bc54b2ebc688873b3f3',
  blockNumber: 16539,
  contractAddress: null,
  feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  feePayerSignatures: [ { V: '0x4e43', R: '0x80db0...', S: '0xf8c7c...' } ],
  feeRatio: '0x1e',
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 62411,
  input: '0x983b2d560000000000000000000000007ad1a538041fa3ba1a721f87203cb1a3822b8eaa',
  logsBloom: '0x00800...',
  nonce: '0x219',
  senderTxHash: '0x14c7b674a0e253b31c85c7be8cbfe4bf9d86e66e940fcae34b854e25eab1ce15',
  signatures: [ { V: '0x4e43', R: '0xd57ef...', S: '0xe14f3...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0xfbf00ec189aeb0941d554384f1660ffdac7768b3af2bb1526bcb3983215c1183',
  transactionIndex: 0,
  type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  typeInt: 50,
  value: '0x0',
  events: {...}
}
```

## myContract.sign<a href="#mycontract-sign" id="mycontract-sign"></a>

```javascript
myContract.sign(options, methodName [, param1 [, param2 [, ...]])
```

スマートコントラクトを展開したり、スマートコントラクトの機能を実行したりするために、送信者としてスマートコントラクト取引に署名する。

}, 'constructor', byteCode, ...)\`.

この関数で使用されるトランザクションタイプは、`options` または `myContract.options` で定義された値に依存する。 `myContract.sign`で手数料を委譲したトランザクションを使用したい場合は、`feeDelegation`を `true`として定義する必要がある。

- `feeDelegation` が定義されていないか、`false` に定義されています：[SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- `FeeDelegation` は `true` に定義されているが、`feeRatio` は定義されていない：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- `FeeDelegation` を `true` に定義し、`feeRatio` を定義する：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) です。

**NOTE** `caver.wallet`は、署名を行うために、`options`または`myContract.options`の`from`に対応するキーリングのインスタンスを含んでいなければならない。

**NOTE** `myContract.sign`はcaver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)からサポートされています。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                                |
| ------ | ------ | ----------------------------------------------------------------------------------------------------------------- |
| オプション  | オブジェクト | 送信に使用するオプション。 詳細は[methods.methodName.send](#methods-methodname-send)の表を参照のこと。     |
| メソッド名  | ストリング  | 実行するコントラクト関数のメソッド名。 スマート・コントラクトをデプロイするためのトランザクションに署名したい場合は、メソッド名の代わりに「コンストラクタ」文字列を使用する。                           |
| パラメーター | ミックス   | (オプション) スマートコントラクト関数に渡されるパラメータ。 スマート・コントラクトをデプロイしたトランザクションに署名したい場合は、byteCodeとコンストラクタのパラメータを渡す。 |

**リターン・バリュー**

`Promise` return [Transaction](./caver-transaction/caver-transaction.md) - 署名されたスマートコントラクトのトランザクション。

**例**

```javascript
// Sign a SmartContractDeploy
> myContract.sign({ from: '0x{address in hex}', gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
SmartContractDeploy {
  _type: 'TxTypeSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xeb6b5...', _s: '0x5e4f9...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2a5'
}

// Sign a FeeDelegatedSmartContractDeploy
> myContract.sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xee0f5...', _s: '0x31cbf...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x320'
}

// Sign a FeeDelegatedSmartContractDeployWithRatio
> myContract.sign({ from: keyring.address, feeDelegation: true, feeRatio: 30, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeployWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0x4c2b0...', _s: '0x47df8...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feeRatio: '0x1e',
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x306'
}

// Sign a SmartContractExecution
> myContract.sign({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123).then(console.log)
SmartContractExecution {
  _type: 'TxTypeSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0xb2846...', _s: '0x422c1...' } ],
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x23b'
}

// Sign a FeeDelegatedSmartContractExecution
> myContract.sign({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xf7676...', _s: '0x42673...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x254'
}

// Sign a FeeDelegatedSmartContractExecutionWithRatio
> myContract.sign({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecutionWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0x58b06...', _s: '0x637ff...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feeRatio: '0x1e',
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x262'
}
```

## myContract.signAsFeePayer <a href="#mycontract-signasfeepayer" id="mycontract-signasfeepayer"></a>

```javascript
myContract.signAsFeePayer(options, methodName [, param1 [, param2 [, ...]])
```

スマートコントラクトを展開する、またはスマートコントラクトの機能を実行するために、手数料の支払い者としてスマートコントラクト取引に署名する。

スマート・コントラクトがデプロイされている場合、'constructor' を methodName に入力することができる。例えば、`myContract.signAsFeePayer({ from, feeDelegation: true, feePayer, .... }, 'constructor', byteCode, ...)`.

この関数で使用されるトランザクションタイプは、`options` または `myContract.options` で定義された値に依存する。 `signAsFeePayer` は取引手数料の支払者として署名する関数なので、`feeDelegation` フィールドは `true` として定義しなければならない。 また、`feePayer`フィールドに料金支払者のアドレスを定義しなければならない。

- `feeDelegation` が定義されていません : エラーをスローします。
- `feeDelegation`は定義されているが、`feePayer`は定義されていない : エラーをスローする。
- `FeeDelegation` は `true` に定義され、`feePayer` は定義されているが、`feeRatio` は定義されていない：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- `FeeDelegation` を `true` に定義し、`feePayer` と `feeRatio` を定義する：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio).

**NOTE** `caver.wallet`に署名を行うには、`options`または`myContract.options`の`feePayer`に対応するkeyringインスタンスが含まれていなければならない。

**NOTE** `myContract.signAsFeePayer` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                                |
| ------ | ------ | ----------------------------------------------------------------------------------------------------------------- |
| オプション  | オブジェクト | 送信に使用するオプション。 詳細は[methods.methodName.send](#methods-methodname-send)の表を参照のこと。     |
| メソッド名  | ストリング  | 実行するコントラクト関数のメソッド名。 スマート・コントラクトをデプロイするためのトランザクションに署名したい場合は、メソッド名の代わりに「コンストラクタ」文字列を使用する。                           |
| パラメーター | ミックス   | (オプション) スマートコントラクト関数に渡されるパラメータ。 スマート・コントラクトをデプロイしたトランザクションに署名したい場合は、byteCodeとコンストラクタのパラメータを渡す。 |

**リターン・バリュー**

`Promise` return [Transaction](./caver-transaction/caver-transaction.md) - 署名されたスマートコントラクトのトランザクション。

**例**

```javascript
// Sign a FeeDelegatedSmartContractDeploy
> myContract.signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e43', _r: '0xe0641...', _s: '0x1d21e...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x32a'
}

// Sign a FeeDelegatedSmartContractDeployWithRatio
> myContract.signAsFeePayer({ from: keyring.address, feeDelegation: true, feePayer: '0x{address in hex}', feeRatio: 30, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeployWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e44', _r: '0x307bd...', _s: '0x75110...' } ],
  _feeRatio: '0x1e',
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x359'
}

// Sign a FeeDelegatedSmartContractExecution
> myContract.signAsFeePayer({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e43', _r: '0xc58ba...', _s: '0x76fdb...' } ],
  _to: '0x4a9d979707aede18fa674711f3b2fe110fac4e7e',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x36c'
}

// Sign a FeeDelegatedSmartContractExecutionWithRatio
> myContract.signAsFeePayer({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecutionWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e44', _r: '0xeb78d...', _s: '0x2864d...' } ],
  _feeRatio: '0x1e',
  _to: '0x4a9d979707aede18fa674711f3b2fe110fac4e7e',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x37b'
}
```

## myContract.call<a href="#mycontract-call" id="mycontract-call"></a>

```javascript
myContract.call('methodName', [param1 [, param2 [, ...]])
myContract.call(options, 'methodName', [param1 [, param2 [, ...]])
```

定数メソッドを呼び出し、そのスマートコントラクトメソッドをkaia仮想マシン内でトランザクションを送信せずに実行する。 呼び出しによってスマート・コントラクトの状態を変更することはできない。

**NOTE** `myContract.call`はcaver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)からサポートされています。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                                                          |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| オプション  | オブジェクト | (オプション) 呼び出しに使用するオプション。 詳しくは[methods.methodName.call](#methods-methodname-call)の表を参照のこと。 |
| メソッド名  | ストリング  | 呼び出す契約関数のメソッド名。                                                                                                                             |
| パラメーター | ミックス   | (オプション) スマートコントラクト関数に渡されるパラメータ。                                                                                          |

**リターン・バリュー**

`Mixed` を返す `Promise` - スマートコントラクトメソッドの戻り値。 単一の値を返す場合は、そのまま返される。 複数の戻り値を持つ場合は、プロパティとインデックスを持つオブジェクトを返す。

**例**

```javascript
> myContract.call('methodName').then(console.log)
Jasmine

> myContract.call({ from: '0x{address in hex}' }, 'methodName', 123).then(console.log)
Test Result
```

## myContract.decodeFunctionCall<a href="#mycontract-decodefunctioncall" id="mycontract-decodefunctioncall"></a>

```javascript
myContract.decodeFunctionCall(functionCall)
```

関数コールをデコードし、パラメータを返す。

**NOTE** `myContract.decodeFunctionCall` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 以降でサポートされています。

**パラメーター**

| 名称         | タイプ   | 説明                 |
| ---------- | ----- | ------------------ |
| ファンクションコール | ストリング | エンコードされた関数呼び出し文字列。 |

**リターン・バリュー**

| タイプ    | 説明                                                                                |
| ------ | --------------------------------------------------------------------------------- |
| オブジェクト | プレーンパラメータを含むオブジェクト。 `result[0]`は、パラメーターの順番で配列のようにアクセスできるように用意されているので、それを使うことができる。 |

**例**

```javascript
// The myContract variable is instantiated with the below abi.
// [
//   {
//     constant: true,
//     inputs: [{ name: 'key', type: 'string' }],
//     name: 'get',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
//     name: 'set',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
// ]
> myContract.decodeFunctionCall('0xe942b5160000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000036b65790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000576616c7565000000000000000000000000000000000000000000000000000000')
Result {
  '0': '2345675643',
  '1': 'Hello!%',
  __length__: 2,
  myNumber: '2345675643',
  mystring: 'Hello!%'
}
```

## myContract.methods <a href="#mycontract-methods" id="mycontract-methods"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]])
myContract.methods['methodName']([param1 [, param2 [, ...]])
```

そのメソッドのトランザクションオブジェクトを作成し、そのオブジェクトを呼び出したり、送信したり、推定したり、ABIエンコードしたりすることができる。

このスマート・コントラクトのメソッドは、以下の方法で利用できる：

- メソッド名: `myContract.methods.methodName(123)` または `myContract.methods[methodName](123)`
- メソッドのプロトタイプ：myContract.methods['methodName(uint256)'](123)\`。
- メソッドのシグネチャ: `myContract.methods['0x58cf5f10'](123)`。

これにより、JavaScriptコントラクト・オブジェクトから、同じ名前で異なるパラメータを持つ関数を呼び出すことができる。

## cf)機能シグネチャ(機能セレクタ)<a href="#cf-function-signature-function-selector" id="cf-function-signature-function-selector"></a>

関数のシグネチャのKeccak-256（SHA-3）ハッシュの最初の（ビッグエンディアンの左 上位）4バイト。

関数のシグネチャは2つの異なる方法で指定できます。 caver.abi.encodefunctionSignature('funcName(paramType1,paramType2,...)')`
`2. caver.utils.sha3('funcName(paramType1,paramType2,...').substr(0, 10)\`.

元)

```javascript
caver.abi.encodefunctionSignature('メソッド名(uint256)')
> 0x58cf5f10

caver.utils.sha3('methodName(uint256)').substr(0, 10)
> 0x58cf5f10
```

**パラメーター**

JSONインターフェイスで定義された、このスマート・コントラクトに属するメソッドのパラメータ。

**リターン・バリュー**

契約実行のための引数と関数が定義されたオブジェクト：

| 名称                                                   | タイプ | 説明                                                                                            |
| ---------------------------------------------------- | --- | --------------------------------------------------------------------------------------------- |
| 引数                                                   | 配列  | このメソッドに渡される引数。                                                                                |
| [コール](#methods-methodname-call)                      | 機能  | トランザクションを送信することなく（スマートコントラクトの状態を変更することはできません）、kaia仮想マシン上でスマートコントラクト内の定数メソッドを呼び出し、実行する関数。      |
| [送信](#methods-methodname-send)                       | 機能  | kaiaにトランザクションを送信し、そのメソッドを実行する関数（スマートコントラクトの状態を変更できる）。                                         |
| [サイン](#methods-methodname-sign)                      | 機能  | 送信者としてトランザクションに署名する関数。 sign関数は署名されたトランザクションを返す。                                               |
| [SignAsFeePayer](#methods-methodname-signasfeepayer) | 機能  | 手数料支払い者として取引に署名する関数。 signAsFeePayer 関数は署名されたトランザクションを返す。                                      |
| [推定ガス](#methods-methodname-estimategas)              | 機能  | その関数は、実行に使用されるガスを推定する。                                                                        |
| [encodeABI](#methods-methodname-encodeabi)           | 機能  | このメソッドのABIをエンコードする関数。 これは、トランザクションを使って送信したり、メソッドを呼び出したり、別のスマート・コントラクトのメソッドに引数として渡したりすることができる。 |

**NOTE** `sign` と `signAsFeePayer` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**例**

```javascript
// Calling a method
> myContract.methods.methodName(123).call({ ... }, function(error, result) { ... })
> myContract.methods.methodName(123).call({ ... }).then((result) => { ... })

// Sending basic transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// Sending basic transaction and using the eventEmitter
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    ...
  }).on('transactionHash', function(hash) {
      ...
  })
  .on('receipt', function(receipt) {
      ...
  })
  .on('error', console.error)

// Sending fee delegation transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,f
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// Sending partial fee delegation transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// sign the basic transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the fee delegation transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the partial fee delegation transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(signedTx) { ... })

// sign the fee delegation transaction as a fee payer
> myContract.methods.methodName(123).signAsFeePayer({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the partial fee delegation transaction as a fee payer
> myContract.methods.methodName(123).signAsFeePayer({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(signedTx) { ... })
```

## methods.methodName.call<a href="#methods-methodname-call" id="methods-methodname-call"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]).call(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]).call(options [, callback])
```

定数メソッドを呼び出し、そのスマートコントラクトメソッドをkaia仮想マシン内でトランザクションを送信せずに実行する。 呼び出しによってスマート・コントラクトの状態を変更することはできない。 ショートカット関数として提供されている[myContract.call](#mycontract-call)を使用することを推奨する。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                              |
| ------ | ------ | ----------------------------------------------------------------------------------------------- |
| オプション  | オブジェクト | (オプション) 呼び出しに使用するオプション。 詳細は以下の表を参照のこと。                                       |
| コールバック | 機能     | (オプション) このコールバックは、スマート・コントラクト・メソッドの実行結果を第2引数として、またはエラー・オブジェクトを第1引数として発行されます。 |

オプション・オブジェクトには、以下のものを含めることができる：

| 名称   | タイプ   | 説明                                                                     |
| ---- | ----- | ---------------------------------------------------------------------- |
| より   | ストリング | (オプション) 契約メソッドを呼び出す際のアドレス。                          |
| ガス価格 | ストリング | (オプション）この呼び出しに使用するガス価格（peb）。                        |
| ガス   | 番号    | (オプション) この呼に供給されるガスの最大値(ガスリミット)。 |

**リターン・バリュー**

`Mixed` を返す `Promise` - スマートコントラクトメソッドの戻り値。 単一の値を返す場合は、そのまま返される。 複数の戻り値を持つ場合は、プロパティとインデックスを持つオブジェクトを返す。

**例**

```javascript
// using the promise
> myContract.methods.methodName(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(result) {
      ...
  })
```

```solidity
// Solidity：MULTIPLE RETURN VALUES
contract MyContract {
    function myFunction( public returns(uint256 myNumber, string memory myString) {
        return (23456, "Hello!%");
    }.
}
```

```javascript
> var MyContract = new caver.contract(abi, address)
> MyContract.methods.myfunction().call().then(console.log)
Result {
      mynumber: '23456',
      mystring: 'Hello!%',
      0: '23456',
      1: 'Hello!%'
}
```

```solidity
// Solidity：SINGLE RETURN VALUE
contract MyContract {
    function myfunction( public returns(string memory mystring) {
        return "Hello!%";
    }.
}
```

```javascript
> var MyContract = new caver.contract(abi, address)
> MyContract.methods.myfunction().call().then(console.log)
"Hello!%"
```

## methods.methodName.send <a href="#methods-methodname-send" id="methods-methodname-send"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]).send(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]).send(options [, callback])
```

スマートコントラクトをデプロイしたり、スマートコントラクトの機能を実行したりするためのトランザクションを送信する。 これにより、スマート・コントラクトの状態を変更することができる。 ショートカット関数として提供されている[myContract.send](#mycontract-send)を使用することを推奨する。

スマートコントラクトをデプロイする場合、methodName に 'constructor' を入力することができる。例えば `myContract.methods.constructor` や `myContract.methods['constructor']` などだが、[myContract.deploy](#mycontract-deploy2) 関数を使用することを推奨する。

この関数で使用されるトランザクションタイプは、`options` または `myContract.options` で定義された値に依存する。 `methods.methodName.send`を使用して手数料を委譲したトランザクションを使用したい場合は、`feeDelegation`と`feePayer`を適切に設定する必要があります。

- `feeDelegation` が定義されていないか、または `false` に定義されています：[SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- `feeDelegation` は `true` に定義されているが、`feePayer` は定義されていない : エラーをスローする。
- `FeeDelegation` は `true` に定義され、`feePayer` は定義されているが、`feeRatio` は定義されていない：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- `FeeDelegation` を `true` に定義し、`feePayer` と `feeRatio` を定義する：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio).

**NOTE** `caver.wallet`に署名を行うには、`options`または`myContract.options`の`from`と`feePayer`に対応するキーリングのインスタンスが含まれていなければならない。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                   |
| ------ | ------ | ------------------------------------------------------------------------------------ |
| オプション  | オブジェクト | 送信に使用するオプション。 詳細は以下の表を参照のこと。                                                         |
| コールバック | 機能     | (オプション) このコールバックは、"transactionHash"、またはエラーオブジェクトを第一引数として最初に起動される。 |

オプション・オブジェクトには、以下のものを含めることができる：

| 名称         | タイプ         | 説明                                                                                                                                                                                                 |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| より         | ストリング       | トランザクションの送信元アドレス。 省略された場合は、`myContract.options.from`が使用される。                                                                                                                                        |
| ガス         | 番号          | この取引で提供されるガスの上限（ガスリミット）。                                                                                                                                                                           |
| ガス価格       | ストリング       | (オプション）この取引に使用するガス価格（peb）。                                                                                                                                                      |
| 価値         | number \\ | (オプション）このトランザクションによってスマートコントラクトのアドレスに転送されるpebの値。                                                                                                                                |
| フィーデレゲーション | ブーリアン       | (オプション、デフォルト `false`) フィー委任トランザクションを使用するかどうか。 省略された場合、`myContract.options.feeDelegation`が使用される。                                                                                 |
| 料金支払者      | ストリング       | (オプション）取引手数料を支払う手数料支払人の住所。 `feeDelegation`が `true` のとき、その値はトランザクションの `feePayer` フィールドに設定される。 省略された場合、`myContract.options.feePayer`が使用される。                                       |
| 手数料率       | ストリング       | (任意）手数料支払者が負担する取引手数料の比率。 `feeDelegation`が `true` で、`feeRatio`に有効な値が設定されている場合、部分的な料金委譲トランザクショ ンが使用される。 有効範囲は1～99。 0や100以上の比率は許されない。 省略された場合、`myContract.options.feeRatio`が使用される。 |

**NOTE** `feeDelegation`、`feePayer`、`feeRatio` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**リターン・バリュー**

`Promise` は `PromiEvent` を返す。

| タイプ     | 説明                                                                |
| ------- | ----------------------------------------------------------------- |
| プロミイベント | プロミスを組み合わせたイベント・エミッター。 取引レシートが利用可能になれば解決する。 約束は新しい契約インスタンスで解決される。 |

PromiEventでは、以下のイベントが利用可能です：

- `transactionHash`：トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生する。 型は `string` である。
- `receipt`：トランザクションのレシートが利用可能になったときに発生する。 詳細については、[caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) を参照してください。 型は `object` である。
- エラー`：送信中にエラーが発生した場合に発生する。 ガス欠エラーの場合、2番目のパラメータはレシートとなる。 その型は `Error\` である。

**例**

```javascript
// using the promise
> myContract.methods.methodName(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })


// using the event emitter
> myContract.methods.methodName(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt)
  })
  .on('error', console.error) // If there is an out-of-gas error, the second parameter is the receipt.

// receipt example
{
   "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
   "transactionIndex": 0,
   "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
   "blocknumber": 3,
   "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
   "gasUsed": 30234,
   "events": {
     "eventName": {
       returnValues: {
         myIndexedParam: 20,
         myOtherIndexedParam: '0x123456789...',
         myNonIndexParam: 'My string'
       },
       raw: {
         data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
         topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
       },
       event: 'eventName',
       signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       logIndex: 0,
       transactionIndex: 0,
       transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
       blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       blocknumber: 1234,
       address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    "MyOtherEvent": {
      ...
    },
    "MyMultipleEvent":[{...}, {...}] // If there are multiples of the same events, they will be in an array.
  }
}

// Deploy the contract
> myContract.methods.constructor('0x{byte code}', 123).send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', gas: 1000000 })
> myContract.methods['constructor']('0x{byte code}', 123).send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', gas: 1000000 })
```

## methods.methodName.sign <a href="#methods-methodname-sign" id="methods-methodname-sign"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]).sign(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]).sign(options)
```

スマートコントラクトを展開したり、スマートコントラクトの機能を実行したりするために、送信者としてスマートコントラクト取引に署名する。 ショートカット関数として提供されている[myContract.sign](#mycontract-sign)を使用することを推奨する。

スマートコントラクトがデプロイされている場合は、`myContract.methods.constructor`や`myContract.methods['constructor']`のように、methodNameに'constructor'を入力することができる。

この関数で使用されるトランザクションタイプは、`options` または `myContract.options` で定義された値に依存する。 `methods.methodName.sign`によって手数料を委譲されたトランザクションを使用したい場合は、`feeDelegation`を`true`として定義しなければならない。

- `feeDelegation` が定義されていないか、または `false` に定義されています：[SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- `FeeDelegation` は `true` に定義されているが、`feeRatio` は定義されていない：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- `FeeDelegation` を `true` に定義し、`feeRatio` を定義する：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) です。

**NOTE** `caver.wallet`は、署名を行うために、`options`または`myContract.options`の`from`に対応するキーリングのインスタンスを含んでいなければならない。

**NOTE** `methods.methodName.sign` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメーター**

| 名称    | タイプ    | 説明                                                                                                                            |
| ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| オプション | オブジェクト | トランザクションの作成に使用されるオプション。 詳しくは[methods.methodName.send](#methods-methodname-send)のパラメータ表を参照のこと。 |

**リターン・バリュー**

`Promise` return [Transaction](./caver-transaction/caver-transaction.md) - 署名されたスマートコントラクトのトランザクション。

**例**

```javascript
// Sign a SmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)
SmartContractDeploy {
  _type: 'TxTypeSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [
    SignatureData {
      _v: '0x07f6',
      _r: '0x26a05...',
      _s: '0x3e3e4...'
    }
  ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f5', _r: '0xa74f7...', _s: '0x0991e...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)

// Sign a SmartContractExecution transaction
> myContract.methods.methodName('0x...').sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)
SmartContractExecution {
  _type: 'TxTypeSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f5', _r: '0xafbf9...', _s: '0x10ea0...' } ],
  _to: '0xbc6723431a57abcacc4016ae664ee778d313ca6e',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}

> myContract.methods['methodName']('0x...').sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractExecution transaction
> myContract.methods.methodName('0x...').sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f6', _r: '0xdfc14...', _s: '0x38b9c...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0xbc6723431a57abcacc4016ae664ee778d313ca6e',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['methodName']('0x...').sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
```

## methods.methodName.signAsFeePayer <a href="#methods-methodname-signasfeepayer" id="methods-methodname-signasfeepayer"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]).signAsFeePayer(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]).signAsFeePayer(options)
```

スマートコントラクトを導入する、またはスマートコントラクトの機能を実行するために、手数料の支払い者としてスマートコントラクト取引に署名する。 ショートカット関数として提供されている[myContract.signAsFeePayer](#mycontract-signasfeepayer)を使用することをお勧めします。

スマートコントラクトがデプロイされている場合は、`myContract.methods.constructor`や`myContract.methods['constructor']`のように、methodNameに'constructor'を入力することができる。

この関数で使用されるトランザクションタイプは、`options` または `myContract.options` で定義された値に依存する。 `signAsFeePayer` は取引手数料の支払者として署名する関数なので、`feeDelegation` フィールドは `true` として定義しなければならない。 また、`feePayer`フィールドに料金支払者のアドレスを定義しなければならない。

- `feeDelegation` が定義されていません : エラーをスローします。
- `feeDelegation`は定義されているが、`feePayer`は定義されていない : エラーをスローする。
- `FeeDelegation` は `true` に定義され、`feePayer` は定義されているが、`feeRatio` は定義されていない：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- `FeeDelegation` を `true` に定義し、`feePayer` と `feeRatio` を定義する：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio).

**NOTE** `caver.wallet`に署名を行うには、`options`または`myContract.options`の`feePayer`に対応するkeyringインスタンスが含まれていなければならない。

**NOTE** `methods.methodName.signAsFeePayer` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメーター**

| 名称    | タイプ    | 説明                                                                                                                            |
| ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| オプション | オブジェクト | トランザクションの作成に使用されるオプション。 詳しくは[methods.methodName.send](#methods-methodname-send)のパラメータ表を参照のこと。 |

**リターン・バリュー**

`Promise` return [Transaction](./caver-transaction/caver-transaction.md) - 署名されたスマートコントラクトのトランザクション。

**例**

```javascript
// Sign a FeeDelegatedSmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
> FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _feePayerSignatures: [ SignatureData { _v: '0x07f6', _r: '0x2c385...', _s: '0x7fa79...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractExecution transaction
> myContract.methods.methodName(123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
> FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _feePayerSignatures: [ SignatureData { _v: '0x07f6', _r: '0x793eb...', _s: '0x0f776...' } ],
  _to: '0x294b2618f29714732cfc202d7be53bf5efee90dd',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['methodName'](123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
```

## methods.methodName.estimateGas <a href="#methods-methodname-estimategas" id="methods-methodname-estimategas"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]).estimateGas(options [, callback])
```

kaia仮想マシンで実行されるメソッドの実行にかかる時間を見積もります。 スマート・コントラクトの状態がその時点で異なる可能性があるため、この推定値は、後にトランザクションを送信する際に使用される実際のガスと異なる可能性がある。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                 |
| ------ | ------ | ---------------------------------------------------------------------------------- |
| オプション  | オブジェクト | (オプション) 呼び出しに使用するオプション。 詳細は以下の表を参照のこと。                          |
| コールバック | 機能     | (オプション) このコールバックは、第2引数としてガス推定結果と共に、または第1引数としてエラーオブジェクトと共に起動される。 |

オプション・オブジェクトには、以下のものを含めることができる：

| 名称 | タイプ         | 説明                                                                                                                           |
| -- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| より | ストリング       | (オプション）コントラクト・メソッドの呼び出し元のアドレス。                                                                            |
| ガス | 番号          | (オプション) この呼に供給されるガスの最大値(ガスリミット)。 特定の値を設定することで、ガス欠エラーの検出に役立つ。 すべてのガスが使用された場合、同じ数値が返される。 |
| 価値 | number \\ | (オプション) このコントラクト関数を実行するためのトランザクションがkaiaに送信された場合に、スマートコントラクトのアドレスに転送されるpebの値。                              |

**リターン・バリュー**

プロミス`は `number\` を返す。

| タイプ | 説明                             |
| --- | ------------------------------ |
| 番号  | コール/トランザクションのシミュレーションに使用されるガス。 |

**例**

```javascript
> myContract.methods.methodName(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(gasAmount) {
    ...
  })
  .catch(function(error) {
    ...
  })
```

## methods.methodName.encodeABI<a href="#methods-methodname-encodeabi" id="methods-methodname-encodeabi"></a>

```javascript
myContract.methods.methodName([param1 [, param2[, ...]]).encodeABI()
```

このメソッドのABIをエンコードする。 これは、トランザクションを送信したり、メソッドを呼び出したり、別のスマート・コントラクトのメソッドに引数として渡したりするのに使うことができる。

**パラメーター**

JSONインターフェイスで定義された、このスマート・コントラクトに属するメソッドのパラメータ。

**リターン・バリュー**

| タイプ   | 説明                                       |
| ----- | ---------------------------------------- |
| ストリング | トランザクションまたはコールで送信するためにエンコードされたABIバイトコード。 |

**例**

```javascript
> myContract.methods.methodName(123).encodeABI()
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```

## myContract.once <a href="#mycontract-once" id="mycontract-once"></a>

```javascript
myContract.once(event [, options], callback)
```

イベントに登録し、最初のイベントまたはエラーの直後に登録を解除する。 発火するのは1つのイベントのみ。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                                                    |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| イベント   | ストリング  | すべてのイベントを取得するには `allEvents` を指定する。                                                                                                    |
| オプション  | オブジェクト | (オプション) サブスクリプションに使用されるオプション。 詳細は以下の表を参照のこと。                                                                       |
| コールバック | 機能     | このコールバックは、2番目の引数として最初のイベント、または1番目の引数としてエラーに対して発生する。 イベント構造の詳細については、[myContract.getPastEvents](#getpastevents) を参照のこと。 |

オプション・オブジェクトには、以下のものを含めることができる：

| 名称    | タイプ    | 説明                                                                                                                                    |
| ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| フィルター | オブジェクト | (オプション) インデックス化されたパラメータでイベントをフィルタリングできます。例えば、`{filter: {mynumber: [12,13]}}` は「mynumber」が12または13であるすべてのイベントを意味します。 |
| トピックス | 配列     | (オプション) これにより、イベント フィルタのトピックを手動で設定できます。 フィルタープロパティとイベントシグネチャを考えると、`topic[0]`は自動的に設定されない。                           |

**リターン・バリュー**

`Promise` は `object` - イベントオブジェクトを返す。 イベント・オブジェクトの詳細については、[myContract.getPastEvents](#getpastevents) を参照してください。

**例**

```javascript
> myContract.once('eventName', {
    filter：filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // 配列を使用すると OR: 例: 20 または 23
  }, function(error, event) { console.log(event) })

// イベント出力の例
{
    returnValues： {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    }
    raw：{
        data：'0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics：['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event：'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex：0,
    transactionIndex：0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash：'0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address：'0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
```

## myContract.subscribe<a href="#mycontract-subscribe" id="mycontract-subscribe"></a>

```javascript
myContract.subscribe(event [, options], callback)
```

イベントを購読する。 この関数は、[myContract.events.eventName](#mycontract-events) と同じ働きをします。

イベントの登録を解除するには、 `subscribe` 関数によって返されたサブスクリプションオブジェクトの `unsubscribe` 関数を呼び出します。

**NOTE** `myContract.subscribe` は caver-js [v1.9.1-rc.1](https://www.npmjs.com/package/caver-js/v/1.9.1-rc.1) 以降でサポートされています。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                                                                    |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| イベント   | ストリング  | すべてのイベントを取得するには `allEvents` を指定する。                                                                                                    |
| オプション  | オブジェクト | (オプション) サブスクリプションに使用されるオプション。 詳細は以下の表を参照のこと。                                                                       |
| コールバック | 機能     | このコールバックは、2番目の引数として最初のイベント、または1番目の引数としてエラーに対して発生する。 イベント構造の詳細については、[myContract.getPastEvents](#getpastevents) を参照のこと。 |

オプション・オブジェクトには、以下のものを含めることができる：

| 名称    | タイプ    | 説明                                                                                                                                    |
| ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| フィルター | オブジェクト | (オプション) インデックス化されたパラメータでイベントをフィルタリングできます。例えば、`{filter: {mynumber: [12,13]}}` は「mynumber」が12または13であるすべてのイベントを意味します。 |
| トピックス | 配列     | (オプション) これにより、イベント フィルタのトピックを手動で設定できます。 フィルタープロパティとイベントシグネチャを考えると、`topic[0]`は自動的には設定されない。                          |

**リターン・バリュー**

`Promise` は `object` - イベントオブジェクトを返す。 イベント・オブジェクトの詳細については、[myContract.getPastEvents](#getpastevents) を参照してください。

**例**

```javascript
> const subscription = myContract.subscribe('eventName', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event) })
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43a...', '0x7f9fa...']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
> subscription.unsubscribe() // unsubscribe the event
```

## myContract.events <a href="#mycontract-events" id="mycontract-events"></a>

```javascript
myContract.events.eventName([options][, callback])
```

イベントを購読する。

**パラメーター**

| 名称     | タイプ    | 説明                                                                  |
| ------ | ------ | ------------------------------------------------------------------- |
| オプション  | オブジェクト | (オプション) サブスクリプションに使用されるオプション。 詳細は以下の表を参照のこと。     |
| コールバック | 機能     | (オプション) このコールバックは、第2引数のイベント、または第1引数のエラーごとに発生します。 |

オプション・オブジェクトには、以下のものを含めることができる：

| 名称      | タイプ    | 説明                                                                                                                                    |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| フィルター   | オブジェクト | (オプション) インデックス化されたパラメータでイベントをフィルタリングできます。例えば、`{filter: {mynumber: [12,13]}}` は「mynumber」が12または13であるすべてのイベントを意味します。 |
| フロムブロック | 番号     | (オプション) イベントを取得するブロック番号。                                                                                           |
| トピックス   | 配列     | (オプション) これにより、イベント フィルタのトピックを手動で設定できます。 フィルタープロパティとイベントシグネチャを考えると、`topic[0]`は自動的に設定されない。                           |

**リターン・バリュー**

イベントエミッター\`である：イベントエミッタは以下のイベントを持つ：

| 名称   | タイプ    | 説明                                                |
| ---- | ------ | ------------------------------------------------- |
| データ  | オブジェクト | eventオブジェクトを引数として、受信したイベントごとに発火する。                |
| 接続済み | ストリング  | サブスクリプションが正常に接続された後に一度だけ発生します。 これはサブスクリプションIDを返す。 |
| エラー  | オブジェクト | サブスクリプションでエラーが発生したときに発火する。                        |

**NOTE** `connected` は caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7) で利用可能です。

返されたイベント `object` の構造は以下のようになる：

| 名称                           | タイプ         | 説明                                                                                                                     |
| ---------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| イベント                         | ストリング       | イベント名。                                                                                                                 |
| 署名                           | string \\ | 匿名イベントの場合は `null` となる。                                                                                                 |
| 住所                           | ストリング       | このイベントが発生したアドレス。                                                                                                       |
| 戻り値                          | オブジェクト      | イベントから返される値、_e._., `{myVar: 1, myVar2: '0x234...'}`.                   |
| ログインデックス                     | 番号          | ブロック内のイベントインデックス位置の整数。                                                                                                 |
| トランザクションインデックス               | 番号          | イベントが作成されたトランザクションのインデックス位置の整数。                                                                                        |
| トランザクションハッシュ                 | 32バイト文字列    | このイベントが作成されたトランザクションのハッシュ。 まだ保留中の場合は `null` とする。                                                                       |
| ブロックハッシュ                     | 32バイト文字列    | このイベントが作成されたブロックのハッシュ。 まだ保留中の場合は `null` とする。                                                                           |
| ブロック番号                       | 番号          | このログが作成されたブロック番号。 保留中の場合は `null` となる。                                                                                  |
| raw\.data   | ストリング       | インデックスのないログパラメータを含むデータ。                                                                                                |
| raw\.topics | 配列          | 最大4つの32バイトのトピックを持つ配列で、トピック1-3にはイベントのインデックス付きパラメータが含まれる。                                                                |
| アイドル                         | ストリング       | ログの識別子。 これは、"log_"文字列と`keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`を連結したものである。 |

**例**

```javascript
> myContract.events.eventName({
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
  }, function(error, event) { console.log(event) })
  .on('connected', function(subscriptionId){
      console.log(subscriptionId)
  })
  .on('data', function(event){
      console.log(event) // same results as the optional callback above
  })
  .on('error', console.error)

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_41d221bc',
}
```

## events.allEvents <a href="#events-allevents" id="events-allevents"></a>

```javascript
myContract.events.allEvents([options] [, callback])
```

myContract.events](#mycontract-events) と同じですが、このスマートコントラクトからのすべてのイベントを受け取ります。 オプションで、filterプロパティはこれらのイベントをフィルタリングすることができる。

## getPastEvents <a href="#getpastevents" id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```

この契約の過去のイベントを取得します。

**パラメーター**

| 名称     | タイプ    | 説明                                                                       |
| ------ | ------ | ------------------------------------------------------------------------ |
| イベント   | ストリング  | 全てのイベントを取得するには `"allEvents"` とする。                                        |
| オプション  | オブジェクト | (オプション) サブスクリプションに使用されるオプション。 詳細は以下の表を参照のこと。          |
| コールバック | 機能     | (オプション) このコールバックは、第2引数にイベントログの配列、第1引数にエラーを指定して起動されます。 |

オプション・オブジェクトには、以下を含めることができる：

| 名称      | タイプ    | 説明                                                                                                                                    |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| フィルター   | オブジェクト | (オプション) インデックス化されたパラメータでイベントをフィルタリングできます。例えば、`{filter: {mynumber: [12,13]}}` は「mynumber」が12または13であるすべてのイベントを意味します。 |
| フロムブロック | 番号     | (オプション) イベントを取得するブロック番号。                                                                                           |
| ブロックする  | 番号     | (オプション) イベントを取得するブロック番号 (デフォルトは `"latest"`).                                    |
| トピックス   | 配列     | (オプション) これにより、イベント フィルタのトピックを手動で設定できます。 フィルタープロパティとイベントシグネチャを考えると、`topic[0]`は自動的に設定されない。                           |

**リターン・バリュー**

プロミス \`\`Promise`は`Array\` - 指定されたイベント名とフィルターにマッチする、過去のイベントオブジェクトを含む配列 を返す。

イベント・オブジェクトには以下のものが含まれる：

| 名称             | タイプ         | 説明                                                                                                                                                  |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| イベント           | ストリング       | イベント名。                                                                                                                                              |
| 署名             | string \\ | 匿名イベントの場合は `null`。                                                                                                                                  |
| 住所             | ストリング       | このイベントが発生した住所                                                                                                                                       |
| 戻り値            | オブジェクト      | イベントからの戻り値、例えば `{myVar: 1, myVar2: '0x234...'}`.                                                                                    |
| ログインデックス       | 番号          | ブロック内のイベントインデックス位置。                                                                                                                                 |
| トランザクションインデックス | 番号          | イベントが作成されたトランザクションのインデックス位置。                                                                                                                        |
| トランザクションハッシュ   | ストリング       | このイベントが作成されたトランザクションのハッシュ。                                                                                                                          |
| ブロックハッシュ       | ストリング       | このイベントが作成されたブロックのハッシュ。保留中の場合はnull。                                                                                                                  |
| ブロック番号         | 番号          | このログが作成されたブロック番号。保留中の場合はnull。                                                                                                                       |
| 生              | オブジェクト      | オブジェクトは `data` と `topic` を定義する。 `raw.data`には、インデックス化されていないログパラメータが含まれている。 `raw.topic`は、最大4つの32バイトのトピックを持つ配列であり、トピック1-3には、イベントのインデックス化されたパラメータが含まれる。 |

**例**

```javascript
> myContract.getPastEvents('eventName', {
      filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
  }, function(error, events) { console.log(events) })
  .then(function(events) {
      console.log(events) // same results as the optional callback above
  })

[{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
},{
      ...
}]
```
