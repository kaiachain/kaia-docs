# caver.contract

caver.contract "對象可以輕鬆地與 kaia 區塊鏈平臺上的智能合約進行交互。 當你創建一個新的合約對象時，你必須為該智能合約提供 JSON 接口，caver-js 會自動將 javascript 中對合約對象的所有調用轉換為通過 RPC 進行的底層 ABI 調用。

這樣，您就可以像使用 JavaScript 對象一樣與智能合約進行交互。

## caver.contract.create <a href="#caver-contract-create" id="caver-contract-create"></a>

```javascript
caver.contract.create(jsonInterface [, address] [, options])
```

創建一個新的合約實例，其所有方法和事件都在 JSON 接口對象中定義。 該功能與 [new caver.contract](#new-contract) 相同。

**注意** `caver.contract.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**參數**

參見 [new caver.contract](#new-contract).

**返回價值**

參見 [new caver.contract](#new-contract).

**示例**

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

創建一個新的合約實例，其所有方法和事件都在 JSON 接口對象中定義。

**參數**

| 名稱            | 類型  | 描述                                                                                       |
| ------------- | --- | ---------------------------------------------------------------------------------------- |
| jsonInterface | 對象  | 合約實例化的 JSON 接口                                                                           |
| 地址            | 字符串 | (可選）要調用的智能合約的地址。 可稍後使用 `myContract.options.address = '0x1234...'` 添加。 |
| 選項            | 對象  | (可選）合約選項。 詳見下表。                                                       |

選項對象可以包含以下內容

| 名稱            | 類型      | 描述                                                                                                                                  |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| from          | 字符串     | (可選）進行交易的地址。                                                                                                     |
| gasPrice      | 字符串     | (可選）本次交易使用的 Gas 價格（以 peb 為單位）。                                                                                   |
| gas           | 數量      | (可選）本次交易提供的最大 gas（gas 限值）。                                                                                       |
| 數據            | 字符串     | (可選）合約的字節碼。 在部署合約時使用。                                                                                            |
| feeDelegation | boolean | (可選，默認為 `false`）是否使用費用委託交易。                                                                                      |
| 付費者           | 字符串     | (可選）支付交易費的繳費人地址。 當 "feeDelegation "為 "true "時，該值將設置為交易中的 "feePayer "字段。                                          |
| 費用比率          | 字符串     | (可選）繳費人將承擔的交易費比例。 如果 "feeDelegation "為 "true"，且 "feeRatio "設置為有效值，則使用部分費用委託交易。 有效範圍為 1 到 99。 不允許比率為 0 或 100 及以上。 |

**返回價值**

| 類型 | 說明                  |
| -- | ------------------- |
| 對象 | KIP17 實例及其綁定的方法和事件。 |

**示例**

```javascript
const myContract = new caver.contract([...], '0x{address in hex}', { gasPrice: '25000000000' })
```

## myContract.options <a href="#mycontract-options" id="mycontract-options"></a>

```javascript
myContract.options
```

合同實例的 `options` 對象。 from"、"gas"、"gasPrice"、"feePayer "和 "feeRatio "在發送交易時用作後備值。

**屬性**

| 名稱            | 類型      | 描述                                                                                                                                  |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 地址            | 字符串     | 部署合約的地址。                                                                                                                            |
| jsonInterface | 數組      | 合同的 JSON 接口。                                                                                                                        |
| from          | 字符串     | 發送合約部署/執行事務的默認地址。 如果在創建事務時沒有定義 "from "地址，則始終使用這個 "myContract.options.from "來創建事務。                   |
| gasPrice      | 字符串     | (可選）本次交易使用的 Gas 價格（以 peb 為單位）。                                                                                   |
| gas           | 數量      | (可選）本次交易提供的最大 gas（gas 限值）。                                                                                       |
| 數據            | 字符串     | 合約的字節碼。 在部署合約時使用。                                                                                                                   |
| feeDelegation | boolean | (可選，默認為 `false`）是否使用費用委託交易。                                                                                      |
| 付費者           | 字符串     | (可選）支付交易費的繳費人地址。 當 "feeDelegation "為 "true "時，該值將設置為交易中的 "feePayer "字段。                                          |
| 費用比率          | 字符串     | (可選）繳費人將承擔的交易費比例。 如果 "feeDelegation "為 "true"，且 "feeRatio "設置為有效值，則使用部分費用委託交易。 有效範圍為 1 到 99。 不允許比率為 0 或 100 及以上。 |

**注意** `feeDelegation`、`feePayer` 和 `feeRatio`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**示例**

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
myContract.options.address
```

用於此合同實例 `myContract` 的地址。 caver-js 從該合同生成的所有交易都將包含該地址作為交易的 "收件人"。

**屬性**

| 名稱 | 類型  | 描述                    |
| -- | --- | --------------------- |
| 地址 | 字符串 | 該合同的地址，如果尚未設置，則為 "空"。 |

**示例**

```javascript
> myContract.options.address
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// 設置合同地址
> myContract.options.address = '0x1234FFDD...'
```

## myContract.options.jsonInterface<a href="#mycontract-options-jsoninterface" id="mycontract-options-jsoninterface"></a>

```javascript
myContract.options.jsonInterface
```

從本合約 ABI`myContract` 派生的 JSON 接口對象。

**屬性**

| 名稱            | 類型 | 描述                                   |
| ------------- | -- | ------------------------------------ |
| jsonInterface | 數組 | 該合約的 JSON 接口。 重新設置後，將重新生成合約實例的方法和事件。 |

**示例**

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

克隆當前 KIP17 實例。

**參數：**

| 名稱              | 類型  | 描述                                                                                |
| --------------- | --- | --------------------------------------------------------------------------------- |
| contractAddress | 字符串 | (可選）發件人地址。 如果省略，將設置為原始實例中的地址（例如，`myContract.options.address`）。 |

**返回價值**

| 類型 | 描述        |
| -- | --------- |
| 對象 | 新克隆的合同實例。 |

**示例**

```javascript
> myContract.clone()
Contract {
  currentProvider：[Getter/Setter],
  ...
  _keyrings：KeyringContainer { ... }
}
```

## myContract.deploy<a href="#mycontract-deploy2" id="mycontract-deploy2"></a>

```javascript
myContract.deploy(options, byteCode [, param1 [, param2 [, ...]]])
```

將合約部署到 kaia 網絡。 成功部署後，將使用新的合同實例來解決承諾問題。 與現有 [myContract.deploy](#mycontract-deploy) 函數的可用性不同，該函數直接向 kaia 網絡發送交易。 您無需使用返回的對象調用 `send()`。

**注意** `caver.wallet`必須包含與`options`或`myContract.options`中`from`和`feePayer`相對應的密鑰實例才能簽名。

**注意** `myContract.deploy` 自 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**參數**

| 名稱  | 類型    | 描述                                                                                                       |
| --- | ----- | -------------------------------------------------------------------------------------------------------- |
| 選項  | 對象    | 用於發送的選項。 詳情請參閱 [methods.methodName.send](#methods-methodname-send) 中的表格。 |
| 字節碼 | 字符串   | 合約的字節碼。                                                                                                  |
| 參數： | Mixed | (可選）部署時傳遞給構造函數的參數。                                                                    |

**返回價值**

返回 `PromiEvent` 的 `Promise`：承諾將與新的合約實例一起解析。

| 類型         | 描述                                                                                    |
| ---------- | ------------------------------------------------------------------------------------- |
| PromiEvent | 一個承諾組合事件發射器。 當交易收據可用時，問題將得到解決。 如果`send()`是從`myContract.deploy()`調用的，那麼承諾將與新的合約實例一起解析。 |

PromiEvent 可用於以下事件：

- transactionHash"：在事務發送且事務哈希值可用後立即觸發。 其類型為 `string`。
- 收據"：當交易收據可用時觸發。 詳情請參閱 [caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) 。 其類型為 "對象"。
- error"：如果在發送過程中發生錯誤，它將被觸發。 如果出現缺gas錯誤，第二個參數就是收據。 其類型為 "錯誤"。

**示例**

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

返回將智能合約部署到 kaia 時使用的對象。 您可以通過調用 `myContract.deploy({ data, arguments }).send(options)` 發送智能合約部署交易。 成功部署後，將使用新的 KIP17 實例解決承諾問題。

**參數：**

| 名稱      | 類型 | 說明                    |
| ------- | -- | --------------------- |
| options | 對象 | 用於部署的選項對象。 請參閱下表查找說明。 |

選項對象可以包含以下內容

| 名稱 | 類型  | 描述                                    |
| -- | --- | ------------------------------------- |
| 數據 | 字符串 | 合約的字節碼。                               |
| 參數 | 數組  | (可選）部署時傳遞給構造函數的參數。 |

**返回價值**

| 類型 | 描述                         |
| -- | -------------------------- |
| 對象 | 定義合約分配參數和函數的對象。 請參閱下表查找說明。 |

返回的對象包含以下內容

| 名稱                                                                         | 類型       | 描述                                              |
| -------------------------------------------------------------------------- | -------- | ----------------------------------------------- |
| 參數                                                                         | 數組       | 在 `options.arguments` 中傳遞的參數。                   |
| [發送](#方法-方法名-發送)                                                           | function | 將合約部署到 kaia 的函數。 作為該函數結果的承諾將與新的合約實例一起解析。        |
| [符號]（#方法-方法名-符號）       | function | 作為發送方簽署智能合約部署交易的函數。 簽名函數將返回已簽名的事務。              |
| [簽署繳費人]（#方法-方法名-簽署繳費人） | function | 作為付費方簽署智能合約部署交易的功能。 signAsFeePayer 函數將返回已簽名的交易。 |
| [estimateGas](#methods-methodname-estimategas)                             | function | 估算部署所用gas的函數。 執行該功能並不部署合約。                      |
| [encodeABI](#methods-methodname-encodeabi)                                 | function | 編碼部署 ABI 的函數，即合同數據 + 構造函數參數。 執行該功能並不部署合約。       |

**注意** `myContract.deploy({ data, arguments }).sign(options)` 和 `myContract.deploy({ data, arguments }).signAsFeePayer(options)` 自 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**示例**

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
myContract.send(options, methodName [, param1 [, param2 [, ...]]])
```

提交交易，執行智能合約的功能。 這會改變智能合約的狀態。

該函數使用的交易類型取決於 `options` 或 `myContract.options` 中定義的值。 如果要通過 `myContract.send` 使用費用委託交易，則應正確設置 `feeDelegation` 和 `feePayer`。

- feeDelegation "未定義或定義為 "false"：[智能合約執行](./caver-transaction/basic.md#smartcontractexecution)
- 已將 `feeDelegation` 定義為 `true`，但未定義 `feePayer` : 引發錯誤。
- feeDelegation "定義為 "true"，"feePayer "已定義，但 "feeRatio "未定義：[收費授權智能合約執行](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定義為 "true"，"feePayer "和 "feeRatio "定義為 "true"：[FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet`必須包含與`options`或`myContract.options`中`from`和`feePayer`相對應的密鑰實例才能簽名。

**注意** `caver.validator` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱         | 類型    | 描述                                                                                                       |
| ---------- | ----- | -------------------------------------------------------------------------------------------------------- |
| 選項         | 對象    | 用於發送的選項。 詳情請參閱 [methods.methodName.send](#methods-methodname-send) 中的表格。 |
| methodName | 字符串   | 要執行的合約函數的方法名稱。                                                                                           |
| 參數         | Mixed | (可選）傳遞給智能合約函數的參數。                                                                     |

**返回價值**

`Promise` returns `number`

| 類型         | 描述                                              |
| ---------- | ----------------------------------------------- |
| PromiEvent | 一個承諾組合事件發射器。 當有交易收據時，該問題將得到解決。 該承諾將通過新的合約實例來解決。 |

PromiEvent 可用於以下事件：

- 事務散列返回字符串：在發送事務且事務哈希值可用後立即觸發。 其類型為 `string`。
- 收據 "返回 "對象"：當有交易收據時觸發。 詳情請參閱 [caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) 。 其類型為 "對象"。
- error`返回`Error\`：如果在發送過程中發生錯誤，則觸發。 如果出現缺gas錯誤，第二個參數就是收據。 其類型為 "錯誤"。

**示例**

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

## 簽署<a href="#mycontract-sign" id="mycontract-sign"></a>

```javascript
myContract.sign(options, methodName [, param1 [, param2 [, ...]]])
```

作為發送方簽署智能合約交易，以部署智能合約或執行智能合約的功能。

如果部署了智能合約，可在方法名中輸入 "構造器"，如 `myContract.sign({ from, ... }, 'constructor', byteCode, ...)`.

該函數使用的交易類型取決於 `options` 或 `myContract.options` 中定義的值。 如果要通過 `myContract.sign` 使用費用委託交易，則應將 `feeDelegation` 定義為 `true`。

- feeDelegation "未定義或定義為 "false"：[SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- feeDelegation "定義為 "true"，但未定義 "feeRatio"：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定義為 "true"，"feeRatio "定義為 "true"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet` 必須包含與 `options` 或 `myContract.options` 中的 `from` 相對應的密鑰實例才能簽名。

**注意** `caver.validator` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱         | 類型    | 描述                                                                                                       |
| ---------- | ----- | -------------------------------------------------------------------------------------------------------- |
| options    | 對象    | 用於發送的選項。 詳情請參閱 [methods.methodName.send](#methods-methodname-send) 中的表格。 |
| methodName | 字符串   | 要執行的合約函數的方法名稱。 如果要簽署交易以部署智能合約，請使用 "構造函數 "字符串而不是方法名稱。                                                     |
| 參數         | Mixed | (可選）傳遞給智能合約函數的參數。 如果要簽署智能合約部署交易，請傳遞 byteCode 和構造函數參數。                                 |

**返回價值**

`Promise` 返回 [Transaction](./caver-transaction/caver-transaction.md) - 已簽署的智能合約交易。

**示例**

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
myContract.signAsFeePayer(options, methodName [, param1 [, param2 [, ...]]])
```

作為付費者簽署智能合約交易，以部署智能合約或執行智能合約的功能。

如果部署了智能合約，可在方法名中輸入 "構造函數"，例如 `myContract.signAsFeePayer({ from, feeDelegation: true, feePayer, ... }, 'constructor', byteCode, ...)`.

該函數使用的交易類型取決於 `options` 或 `myContract.options` 中定義的值。 signAsFeePayer "是一個作為交易費用支付方進行簽名的函數，因此 "feeDelegation "字段必須定義為 "true"。 此外，必須在 "繳費人 "字段中定義繳費人的地址。

- 未定義 `feeDelegation` : 引發錯誤。
- 已定義 "feeDelegation"，但未定義 "feePayer"：拋出錯誤。
- feeDelegation "定義為 "true"，"feePayer "已定義，但 "feeRatio "未定義：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定義為 "true"，並定義了 "feePayer "和 "feeRatio"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet` 必須包含與 `options` 或 `myContract.options` 中的 `feePayer` 相對應的密鑰實例才能簽名。

**注意** `caver.kct.kip7.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**參數**

| 名稱         | 類型    | 描述                                                                                                       |
| ---------- | ----- | -------------------------------------------------------------------------------------------------------- |
| options    | 對象    | 用於發送的選項。 詳情請參閱 [methods.methodName.send](#methods-methodname-send) 中的表格。 |
| methodName | 字符串   | 要執行的合約函數的方法名稱。 如果要簽署交易以部署智能合約，請使用 "構造函數 "字符串而不是方法名稱。                                                     |
| 參數         | Mixed | (可選）部署時傳遞給構造函數的參數。 如果要簽署智能合約部署交易，請傳遞 byteCode 和構造函數參數。                                |

**返回價值**

`Promise` 返回 [Transaction](./caver-transaction/caver-transaction.md) - 已簽署的智能合約交易。

**示例**

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

將調用一個常量方法，並在 kaia 虛擬機中執行其智能合約方法，而不發送任何交易。 請注意，調用不能改變智能合約的狀態。

**注意** `caver.validator` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱         | 類型    | 描述                                                                                                                                |
| ---------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| options    | 對象    | (可選） 調用時使用的選項。 詳情請參閱 [methods.methodName.call](#methods-methodname-call) 中的表格。 |
| methodName | 字符串   | 要調用的合約函數的方法名稱。                                                                                                                    |
| 參數         | Mixed | (可選）傳遞給智能合約函數的參數。                                                                                              |

**返回價值**

返回 `Mixed` 的 `Promise` - 智能合約方法的返回值。 如果返回單個值，則按原樣返回。 如果有多個返回值，則返回一個包含屬性和索引的對象。

**示例**

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

解碼函數調用並返回參數。

**注意** `caver.abi.decodeFunctionCall` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱           | 類型  | 描述           |
| ------------ | --- | ------------ |
| functionCall | 字符串 | 編碼後的函數調用字符串。 |

**返回價值**

| 類型 | 描述                                              |
| -- | ----------------------------------------------- |
| 對象 | 包含純參數的對象。 您可以使用 `result[0]` ，因為它可以像數組一樣按參數順序訪問。 |

**示例**

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

為該方法創建事務對象，然後可以調用、發送、估算或進行 ABI 編碼。

該智能合約的方法可通過以下方式獲取：

- 方法名稱：`myContract.methods.methodName(123)` 或`myContract.methods[methodName](123)`。
- 方法原型：myContract.methods['methodName(uint256)'](123)\`方法原型
- 方法簽名： `myContract.methods['0x58cf5f10'](123)`

這樣就可以從 JavaScript 合約對象中調用名稱相同但參數不同的函數。

## cf) 函數簽名（函數選擇器）<a href="#cf-function-signature-function-selector" id="cf-function-signature-function-selector"></a>

函數調用的調用數據的前四個字節指定了要調用的函數。
它是函數簽名的 Keccak-256 (SHA-3) 哈希值的前四個字節（左側，大指高階）。

The function signature can be given via 2 different methods.\
`1. caver.abi.encodefunctionSignature('funcName(paramType1,paramType2).
 caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0)`

ex)

```javascript
caver.abi.encodefunctionSignature('methodName(uint256)')
> 0x58cf5f10

caver.utils.sha3('methodName(uint256)').substr(0, 10)
> 0x58cf5f10
```

**參數**

屬於此智能合約的任何方法的參數，在 JSON 接口中定義。

**返回價值**

`Promise` 返回 `object` - 一個對象，其中定義了用於執行合同的參數和函數：

| 名稱                                                                         | 類型       | 描述                                                  |
| -------------------------------------------------------------------------- | -------- | --------------------------------------------------- |
| 參數                                                                         | 數組       | 傳遞給此方法的參數。                                          |
| [調用]（#方法-方法名-調用）       | function | 將在 kaia 虛擬機上調用並執行其智能合約中的常量方法而不發送交易（不能改變智能合約狀態）的函數。  |
| [發送](#方法-方法名-發送)                                                           | function | 向 kaia 發送交易並執行其方法（可改變智能合約狀態）的函數。                    |
| [符號]（#方法-方法名-符號）       | function | 作為發送方簽署交易的函數。 簽名函數將返回已簽名的事務。                        |
| [簽署繳費人]（#方法-方法名-簽署繳費人） | function | 作為付費方簽署交易的函數。 signAsFeePayer 函數將返回已簽名的交易。           |
| [estimateGas](#methods-methodname-estimategas)                             | function | 該功能將估算執行過程中使用的gas。                                  |
| [encodeABI](#methods-methodname-encodeabi)                                 | function | 對該方法的 ABI 進行編碼的函數。 這可以通過交易發送、調用方法或作為參數傳遞給另一個智能合約方法。 |

**注意** `caver.kct.kip7.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**示例**

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
myContract.methods.methodName([param1 [, param2 [, ...]]]).call(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]).call(options [, callback])
```

將調用一個常量方法，並在 kaia 虛擬機中執行其智能合約方法，而不發送任何交易。 請注意，調用不能改變智能合約的狀態。 建議使用 [myContract.call](#mycontract-call) 作為快捷函數。

**參數：**

| 名稱       | 類型       | 描述                                                                |
| -------- | -------- | ----------------------------------------------------------------- |
| options  | 對象       | (可選） 調用時使用的選項。 詳見下表。                           |
| callback | function | (可選）該回調將以智能合約方法的執行結果作為第二個參數觸發，或以錯誤對象作為第一個參數觸發。 |

選項對象可以包含以下內容

| 名稱       | 類型  | 描述                                                |
| -------- | --- | ------------------------------------------------- |
| from     | 字符串 | (可選） 調用合同方法的地址。                |
| gasPrice | 字符串 | (可選）本次交易使用的 Gas 價格（以 peb 為單位）。 |
| gas      | 數量  | (可選）本次交易提供的最大 gas（gas 限值）。     |

**返回價值**

返回 `Mixed` 的 `Promise` - 智能合約方法的返回值。 如果返回單個值，則按原樣返回。 如果有多個返回值，則返回一個包含屬性和索引的對象。

**示例**

```javascript
// using the promise
> myContract.methods.methodName(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(result) {
      ...
  })
```

```solidity
// Solidity：多重返回值
contract MyContract {
    function myFunction() public returns(uint256 myNumber, string memory myString) {
        return (23456, "Hello!%");
    }
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
    function myfunction() public returns(string memory mystring) {
        return "Hello!%";
    }
}
```

```javascript
> var MyContract = new caver.contract(abi, address)
> MyContract.methods.myfunction().call().then(console.log)
"Hello!%"
```

## methods.methodName.send <a href="#methods-methodname-send" id="methods-methodname-send"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).send(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]).send(options [, callback])
```

將發送交易以部署智能合約或執行智能合約的功能。 這會改變智能合約的狀態。 建議使用 [myContract.call](#mycontract-call) 作為快捷函數。

如果部署了智能合約，可以在 methodName 中輸入 "constructor"，如 "myContract.methods.constructor "或 "myContract.methods['constructor']"，但建議使用 [myContract.deploy](#mycontract-deploy2) 函數。

該函數使用的交易類型取決於 `options` 或 `myContract.options` 中定義的值。 如果要通過 `methods.methodName.send`使用費用委託交易，則應正確設置 `feeDelegation` 和 `feePayer`。

- feeDelegation "未定義或定義為 "false"：[SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- 已將 `feeDelegation` 定義為 `true`，但未定義 `feePayer` : 引發錯誤。
- feeDelegation "定義為 "true"，"feePayer "已定義，但 "feeRatio "未定義：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定義為 "true"，並定義了 "feePayer "和 "feeRatio"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet`必須包含與`options`或`myContract.options`中`from`和`feePayer`相對應的密鑰實例才能簽名。

**參數**

| 名稱       | 類型       | 描述                                                                     |
| -------- | -------- | ---------------------------------------------------------------------- |
| options  | 對象       | 用於發送的選項。 詳見下表。                                                         |
| callback | function | (可選）該回調將首先使用 "transactionHash "觸發，或使用錯誤對象作為第一個參數觸發。 |

選項對象可以包含以下內容

| 名稱            | 類型                                        | 描述                                                                                                                                                                                                      |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | 字符串                                       | (可選） 發送交易的地址。 如果省略，將使用 \`kip17.options.from'。                                                                                                        |
| gas           | 數量                                        | (可選）本次交易提供的最大 gas（gas 限值）。                                                                                                                                                           |
| gasPrice      | 字符串                                       | (可選）本次交易使用的 Gas 價格（以 peb 為單位）。                                                                                                                                                       |
| value         | number \\| string \\| BN \\| BigNumber | (可選）本次交易要轉移到智能合約地址的 peb 值。                                                                                                                                                           |
| feeDelegation | boolean                                   | (可選，默認為 `false`）是否使用費用委託交易。 如果省略，將使用 \`kip17.options.feeDelegation'。                                                                                 |
| 付費者           | 字符串                                       | (可選）支付交易費的繳費人地址。 當 "feeDelegation "為 "true "時，該值將設置為交易中的 "feePayer "字段。 如果省略，將使用 \`kip17.options.feePayer'。                                          |
| 費用比率          | 字符串                                       | (可選）繳費人將承擔的交易費比例。 如果 "feeDelegation "為 "true"，且 "feeRatio "設置為有效值，則使用部分費用委託交易。 有效範圍為 1 到 99。 不允許比率為 0 或 100 及以上。 如果省略，將使用 \`kip17.options.feeRatio'。 |

**注意** `feeDelegation`、`feePayer` 和 `feeRatio`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**返回價值**

`Promise` returns `number`

| 類型         | 描述                                              |
| ---------- | ----------------------------------------------- |
| PromiEvent | 一個承諾組合事件發射器。 當有交易收據時，該問題將得到解決。 該承諾將通過新的合同實例來解決。 |

PromiEvent 可用於以下事件：

- 事務散列返回字符串：在發送事務且事務哈希值可用後立即觸發。 其類型為 `string`。
- 收據 "返回 "對象"：當有交易收據時觸發。 詳情請參閱 [caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) 。 其類型為 "對象"。
- error`返回`Error\`：如果在發送過程中發生錯誤，則觸發。 如果出現缺gas錯誤，第二個參數就是收據。 其類型為 "錯誤"。

**示例**

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
myContract.methods.methodName([param1 [, param2 [, ...]]]).sign(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]).sign(options)
```

作為發送方簽署智能合約交易，以部署智能合約或執行智能合約的功能。 建議使用 [myContract.call](#mycontract-call) 作為快捷函數。

如果部署了智能合約，可在方法名中輸入 "構造器"，如 "myContract.methods.constructor "或 "myContract.methods['constructor']"。

該函數使用的交易類型取決於 `options` 或 `myContract.options` 中定義的值。 如果要通過 `myContract.sign` 使用費用委託交易，則應將 `feeDelegation` 定義為 `true`。

- feeDelegation "未定義或定義為 "false"：[SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- feeDelegation "定義為 "true"，但未定義 "feeRatio"：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定義為 "true"，"feeRatio "定義為 "true"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet` 必須包含與 `options` 或 `myContract.options` 中的 `from` 相對應的密鑰實例才能簽名。

**注意** `methods.methodName.sign` 自 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**參數**

| 名稱      | 類型 | 描述                                                                                                          |
| ------- | -- | ----------------------------------------------------------------------------------------------------------- |
| options | 對象 | 用於創建交易的選項。 詳情請參閱 [methods.methodName.send](#methods-methodname-send) 中的參數表。 |

**返回價值**

`Promise` 返回 [Transaction](./caver-transaction/caver-transaction.md) - 已簽署的智能合約交易。

**示例**

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
myContract.methods.methodName([param1 [, param2 [, ...]]]).signAsFeePayer(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]).signAsFeePayer(options)
```

作為付費者簽署智能合約交易，以部署智能合約或執行智能合約的功能。 建議使用 [myContract.call](#mycontract-call) 作為快捷函數。

如果部署了智能合約，可在方法名中輸入 "構造器"，如 "myContract.methods.constructor "或 "myContract.methods['constructor']"。

該函數使用的交易類型取決於 `options` 或 `myContract.options` 中定義的值。 signAsFeePayer "是一個作為交易費用支付方進行簽名的函數，因此 "feeDelegation "字段必須定義為 "true"。 此外，必須在 "繳費人 "字段中定義繳費人的地址。

- 未定義 `feeDelegation` : 引發錯誤。
- 已定義 "feeDelegation"，但未定義 "feePayer"：拋出錯誤。
- feeDelegation "定義為 "true"，"feePayer "已定義，但 "feeRatio "未定義：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定義為 "true"，並定義了 "feePayer "和 "feeRatio"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet` 必須包含與 `options` 或 `myContract.options` 中的 `feePayer` 相對應的密鑰實例才能簽名。

**注意** `methods.methodName.signAsFeePayer` 自 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**參數**

| 名稱      | 類型 | 描述                                                                                                          |
| ------- | -- | ----------------------------------------------------------------------------------------------------------- |
| options | 對象 | 用於創建交易的選項。 詳情請參閱 [methods.methodName.send](#methods-methodname-send) 中的參數表。 |

**返回價值**

`Promise` 返回 [Transaction](./caver-transaction/caver-transaction.md) - 已簽署的智能合約交易。

**舉例**

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
myContract.methods.methodName([param1 [, param2 [, ...]]]).estimateGas(options [, callback])
```

將估算方法在 kaia 虛擬機中執行時的耗時。 由於當時智能合約的狀態可能不同，因此估計值可能與後來發送交易時實際使用的氣體不同。

**參數**

| 名稱       | 類型       | 描述                                                       |
| -------- | -------- | -------------------------------------------------------- |
| options  | 對象       | (可選） 調用時使用的選項。 詳見下表。                  |
| callback | function | (可選）此回調將以氣體估計結果作為第二個參數，或以錯誤對象作為第一個參數。 |

選項對象可以包含以下內容

| 名稱    | 類型                                        | 描述                                                                                    |
| ----- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| from  | 字符串                                       | (可選） 發送交易的地址。                                                      |
| gas   | 數量                                        | (可選）本次交易提供的最大 gas（gas 限值）。 設置特定值有助於檢測gas過量錯誤。 如果使用了所有gas，將返回相同的數字。 |
| value | number \\| string \\| BN \\| BigNumber | (可選）如果執行該合約功能的交易被髮送到 kaia，將被轉移到智能合約地址的值，單位為 peb。                   |

**返回價值**

`Promise` returns `number`

| 類型 | 描述             |
| -- | -------------- |
| 數量 | 模擬呼叫/交易使用的gas。 |

**示例**

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
myContract.methods.methodName([param1 [, param2[, ...]]]).encodeABI()
```

編碼該方法的 ABI。 它可用於發送交易或調用方法，或作為參數傳遞給另一個智能合約方法。

**參數**

屬於此智能合約的任何方法的參數，在 JSON 接口中定義。

**返回價值**

| 類型  | 描述                     |
| --- | ---------------------- |
| 字符串 | 通過事務或調用發送的 ABI 編碼字節代碼。 |

**示例**

```javascript
> myContract.methods.methodName(123).encodeABI()
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```

## myContract.once <a href="#mycontract-once" id="mycontract-once"></a>

```javascript
myContract.once(event [, options], callback)
```

訂閱事件，並在第一個事件或錯誤發生後立即取消訂閱。 只會在單個事件中觸發。

**參數**

| 名稱       | 類型       | 描述                                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| 事件       | 字符串      | 合約中的事件名稱，或 `allEvents` 來獲取所有事件。                                                                               |
| options  | 對象       | (可選）用於訂閱的選項。 詳見下表。                                                                         |
| callback | function | 如果第二個參數為第一個事件，或第一個參數為錯誤，則會觸發該回調。 有關事件結構的詳細信息，請參閱 [myContract.getPastEvents](#getpastevents) 。 |

選項對象可以包含以下內容

| 名稱     | 類型 | 描述                                                                                                                          |
| ------ | -- | --------------------------------------------------------------------------------------------------------------------------- |
| 高級篩選   | 對象 | (可選）可讓您通過索引參數過濾事件，例如_，`{filter：{mynumber: [12,13]}}` 表示所有 "mynumber "為 12 或 13 的事件。 |
| topics | 數組 | (可選）這允許您手動設置事件篩選器的主題。 鑑於過濾器屬性和事件特徵，`topic[0]` 不會自動設置。                                                    |

**返回價值**

`Promise` 返回 `object` - 事件對象。 有關事件對象的更多詳情，請參閱 [myContract.getPastEvents]（#getpastevents）。

**示例**

```javascript
> myContract.once('eventName', {
    filter：{myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // 使用數組表示 OR：例如 20 或 23
  }, function(error, event) { console.log(event) })

// 事件輸出示例
{
    returnValues： {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw：{
        data：'0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics：['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event：eventName',
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

訂閱事件。 此功能與 [myContract.events.eventName](#mycontract-events)相同。

您可以調用`subscribe`函數返回的訂閱對象的`unsubscribe`函數來取消訂閱事件。

**注意** `caver.kct.kip7.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**參數**

| 名稱       | 類型       | 描述                                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| event    | 字符串      | 合約中的事件名稱，或 `allEvents` 來獲取所有事件。                                                                               |
| options  | 對象       | (可選）用於訂閱的選項。 詳見下表。                                                                         |
| callback | function | 如果第二個參數為第一個事件，或第一個參數為錯誤，則會觸發該回調。 有關事件結構的詳細信息，請參閱 [myContract.getPastEvents](#getpastevents) 。 |

選項對象可以包含以下內容

| 名稱     | 類型 | 描述                                                                                                                          |
| ------ | -- | --------------------------------------------------------------------------------------------------------------------------- |
| 高級篩選   | 對象 | (可選）可讓您通過索引參數過濾事件，例如_，`{filter：{mynumber: [12,13]}}` 表示所有 "mynumber "為 12 或 13 的事件。 |
| topics | 數組 | (可選）這允許您手動設置事件篩選器的主題。 鑑於過濾器屬性和事件特徵，`topic[0]` 不會自動設置。                                                    |

**返回價值**

`Promise` 返回 `object` - 事件對象。 有關事件對象的更多詳情，請參閱 [myContract.getPastEvents]（#getpastevents）。

**示例**

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

訂閱事件。

**參數**

| 名稱       | 類型       | 描述                                                      |
| -------- | -------- | ------------------------------------------------------- |
| options  | 對象       | (可選）用於訂閱的選項。 詳見下表。                   |
| callback | function | (可選）該回調將針對作為第二個參數的每個事件或作為第一個參數的錯誤觸發。 |

選項對象可以包含以下內容

| 名稱        | 類型 | 描述                                                                                                                          |
| --------- | -- | --------------------------------------------------------------------------------------------------------------------------- |
| 高級篩選      | 對象 | (可選）可讓您通過索引參數過濾事件，例如_，`{filter：{mynumber: [12,13]}}` 表示所有 "mynumber "為 12 或 13 的事件。 |
| fromBlock | 數量 | (可選）從中獲取事件的區塊編號。                                                                                         |
| topics    | 數組 | (可選）這允許您手動設置事件篩選器的主題。 鑑於過濾器屬性和事件特徵，`topic[0]` 不會自動設置。                                                    |

**返回價值**

事件發射器事件發射器有以下事件：

| 名稱    | 類型  | 描述                     |
| ----- | --- | ---------------------- |
| 數據    | 對象  | 觸發每個以事件對象為參數的傳入事件。     |
| 已連接   | 字符串 | 訂閱成功連接後觸發一次。 它返回訂閱 ID。 |
| error | 對象  | 當訂閱出現錯誤時觸發。            |

**注意** `caver.ipfs` 自 caver-js [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4) 開始支持。

返回的事件 `object` 結構如下：

| 名稱           | 類型       | 描述                                                                                                                 |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| event        | 字符串      | 事件名                                                                                                                |
| 簽名           | 字符串      | 事件簽名，如果是匿名事件則為 "空"。                                                                                                |
| address      | 字符串      | 該事件的起始地址。                                                                                                          |
| returnValues | 對象       | 事件的返回值，_e.g._，`{myVar: 1, myVar2: '0x234...'}`。                                    |
| logIndex     | 數量       | 區塊中事務索引位置的整數。                                                                                                      |
| 交易索引         | 數量       | 創建事件的事務索引位置的整數。                                                                                                    |
| 交易哈希值。       | 32 字節字符串 | 創建該日誌的交易哈希。 空"。                                                                                                    |
| blockHash    | 32 字節字符串 | 創建該事件的區塊的哈希值。 空"。                                                                                                  |
| 區塊編號         | 數量       | 該日誌創建的區塊編號。 待處理時為 "null"。                                                                                          |
| 原始數據         | 字符串      | 包含非索引日誌參數的數據。                                                                                                      |
| 原始主題         | 數組       | 一個數組，最多包含 4 個 32 字節的主題，主題 1-3 包含事件的索引參數。                                                                           |
| id           | 字符串      | 日誌標識符。 它是通過將 "log_"字符串與`keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`連接而成的。 |

**示例**

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

與 [myContract.events](#mycontract-events) 相同，但接收來自此智能合約的所有事件。 過濾屬性可選擇過濾這些事件。

## getPastEvents <a href="#getpastevents" id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```

獲取該合約過去發生的事件。

**參數**

| 名稱       | 類型       | 描述                                                         |
| -------- | -------- | ---------------------------------------------------------- |
| event    | 字符串      | 合約中的事件名稱，或 `"allEvents"` 獲取所有事件。                           |
| options  | 對象       | (可選）用於訂閱的選項。 詳見下表。                      |
| callback | function | (可選）該回調將以事件日誌數組作為第二個參數觸發，或以錯誤作為第一個參數觸發。 |

選項對象可以包含以下內容

| 名稱        | 類型 | 描述                                                                                                                          |
| --------- | -- | --------------------------------------------------------------------------------------------------------------------------- |
| 高級篩選      | 對象 | (可選）可讓您通過索引參數過濾事件，例如_，`{filter：{mynumber: [12,13]}}` 表示所有 "mynumber "為 12 或 13 的事件。 |
| fromBlock | 數量 | (可選）從中獲取事件的區塊編號。                                                                                         |
| toBlock   | 數量 | (可選）要獲取事件的區塊編號（默認為 "最新"）。                                                                                |
| topics    | 數組 | (可選）這允許手動設置事件篩選器的主題。 鑑於過濾器屬性和事件特徵，`topic[0]` 不會自動設置。                                                     |

**返回價值**

`Promise` 返回 `Array` - 包含過去事件對象的數組，與給定的事件名稱和過濾器匹配。

選項對象可以包含以下內容

| 名稱           | 類型  | 描述                                                                                               |
| ------------ | --- | ------------------------------------------------------------------------------------------------ |
| event        | 字符串 | 事件名稱。                                                                                            |
| 簽名           | 字符串 | 事件簽名，如果是匿名事件則為`null`。                                                                            |
| 地址           | 字符串 | 該活動的發起地址。                                                                                        |
| returnValues | 對象  | 事件的返回值，如 `{myVar: 1, myVar2: '0x234...'}`。                                                       |
| logIndex     | 數量  | 區塊中的日誌索引位置。                                                                                      |
| 交易索引         | 數量  | 事件創建時的事務索引位置。                                                                                    |
| 交易哈希值。       | 字符串 | 創建該日誌的交易散列。                                                                                      |
| blockHash    | 字符串 | 該事件在哪個區塊中創建的哈希值。                                                                                 |
| 區塊編號         | 數字  | 該日誌創建時所在的區塊編號。                                                                                   |
| 原始           | 對象  | 對象定義了 `data` 和 `topic`。 `raw.data` 包含非索引日誌參數。 `raw.topic` 是一個數組，最多有四個 32 字節的主題，主題 1-3 包含事件的索引參數。 |

**示例**

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
