# caver.contract

caver.contract "对象可以轻松地与 kaia 区块链平台上的智能合约进行交互。 当你创建一个新的合约对象时，你必须为该智能合约提供 JSON 接口，caver-js 会自动将 javascript 中对合约对象的所有调用转换为通过 RPC 进行的底层 ABI 调用。

这样，您就可以像使用 JavaScript 对象一样与智能合约进行交互。

## caver.contract.create <a href="#caver-contract-create" id="caver-contract-create"></a>

```javascript
caver.contract.create(jsonInterface [, address] [, options])
```

创建一个新的合约实例，其所有方法和事件都在 JSON 接口对象中定义。 该功能与 [new caver.contract](#new-contract) 相同。

**注意** `caver.contract.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**参数**

参见 [new caver.contract](#new-contract).

**返回价值**

参见 [new caver.contract](#new-contract).

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

创建一个新的合约实例，其所有方法和事件都在 JSON 接口对象中定义。

**参数**

| 名称            | 类型  | 描述                                                                                       |
| ------------- | --- | ---------------------------------------------------------------------------------------- |
| jsonInterface | 对象  | 合约实例化的 JSON 接口                                                                           |
| 地址            | 字符串 | (可选）要调用的智能合约的地址。 可稍后使用 `myContract.options.address = '0x1234...'` 添加。 |
| 选项            | 对象  | (可选）合约选项。 详见下表。                                                       |

选项对象可以包含以下内容

| 名称            | 类型      | 描述                                                                                                                                  |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| from          | 字符串     | (可选）进行交易的地址。                                                                                                     |
| gasPrice      | 字符串     | (可选）本次交易使用的 Gas 价格（以 peb 为单位）。                                                                                   |
| gas           | 数量      | (可选）本次交易提供的最大 gas（gas 限值）。                                                                                       |
| 数据            | 字符串     | (可选）合约的字节码。 在部署合约时使用。                                                                                            |
| feeDelegation | boolean | (可选，默认为 `false`）是否使用费用委托交易。                                                                                      |
| 付费者           | 字符串     | (可选）支付交易费的缴费人地址。 当 "feeDelegation "为 "true "时，该值将设置为交易中的 "feePayer "字段。                                          |
| 费用比率          | 字符串     | (可选）缴费人将承担的交易费比例。 如果 "feeDelegation "为 "true"，且 "feeRatio "设置为有效值，则使用部分费用委托交易。 有效范围为 1 到 99。 不允许比率为 0 或 100 及以上。 |

**返回价值**

| 类型 | 说明                  |
| -- | ------------------- |
| 对象 | KIP17 实例及其绑定的方法和事件。 |

**示例**

```javascript
const myContract = new caver.contract([...], '0x{address in hex}', { gasPrice: '25000000000' })
```

## myContract.options <a href="#mycontract-options" id="mycontract-options"></a>

```javascript
myContract.options
```

合同实例的 `options` 对象。 from"、"gas"、"gasPrice"、"feePayer "和 "feeRatio "在发送交易时用作后备值。

**属性**

| 名称            | 类型      | 描述                                                                                                                                  |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 地址            | 字符串     | 部署合约的地址。                                                                                                                            |
| jsonInterface | 数组      | 合同的 JSON 接口。                                                                                                                        |
| from          | 字符串     | 发送合约部署/执行事务的默认地址。 如果在创建事务时没有定义 "from "地址，则始终使用这个 "myContract.options.from "来创建事务。                   |
| gasPrice      | 字符串     | (可选）本次交易使用的 Gas 价格（以 peb 为单位）。                                                                                   |
| gas           | 数量      | (可选）本次交易提供的最大 gas（gas 限值）。                                                                                       |
| 数据            | 字符串     | 合约的字节码。 在部署合约时使用。                                                                                                                   |
| feeDelegation | boolean | (可选，默认为 `false`）是否使用费用委托交易。                                                                                      |
| 付费者           | 字符串     | (可选）支付交易费的缴费人地址。 当 "feeDelegation "为 "true "时，该值将设置为交易中的 "feePayer "字段。                                          |
| 费用比率          | 字符串     | (可选）缴费人将承担的交易费比例。 如果 "feeDelegation "为 "true"，且 "feeRatio "设置为有效值，则使用部分费用委托交易。 有效范围为 1 到 99。 不允许比率为 0 或 100 及以上。 |

**注意** `feeDelegation`、`feePayer` 和 `feeRatio`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

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

用于此合同实例 `myContract` 的地址。 caver-js 从该合同生成的所有交易都将包含该地址作为交易的 "收件人"。

**属性**

| 名称 | 类型  | 描述                    |
| -- | --- | --------------------- |
| 地址 | 字符串 | 该合同的地址，如果尚未设置，则为 "空"。 |

**示例**

```javascript
> myContract.options.address
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// 设置合同地址
> myContract.options.address = '0x1234FFDD...'
```

## myContract.options.jsonInterface<a href="#mycontract-options-jsoninterface" id="mycontract-options-jsoninterface"></a>

```javascript
myContract.options.jsonInterface
```

从本合约 ABI`myContract` 派生的 JSON 接口对象。

**属性**

| 名称            | 类型 | 描述                                   |
| ------------- | -- | ------------------------------------ |
| jsonInterface | 数组 | 该合约的 JSON 接口。 重新设置后，将重新生成合约实例的方法和事件。 |

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

克隆当前 KIP17 实例。

**参数：**

| 名称              | 类型  | 描述                                                                                |
| --------------- | --- | --------------------------------------------------------------------------------- |
| contractAddress | 字符串 | (可选）发件人地址。 如果省略，将设置为原始实例中的地址（例如，`myContract.options.address`）。 |

**返回价值**

| 类型 | 描述        |
| -- | --------- |
| 对象 | 新克隆的合同实例。 |

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

将合约部署到 kaia 网络。 成功部署后，将使用新的合同实例来解决承诺问题。 与现有 [myContract.deploy](#mycontract-deploy) 函数的可用性不同，该函数直接向 kaia 网络发送交易。 您无需使用返回的对象调用 `send()`。

**注意** `caver.wallet`必须包含与`options`或`myContract.options`中`from`和`feePayer`相对应的密钥实例才能签名。

**注意** `myContract.deploy` 自 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**参数**

| 名称  | 类型    | 描述                                                                                                       |
| --- | ----- | -------------------------------------------------------------------------------------------------------- |
| 选项  | 对象    | 用于发送的选项。 详情请参阅 [methods.methodName.send](#methods-methodname-send) 中的表格。 |
| 字节码 | 字符串   | 合约的字节码。                                                                                                  |
| 参数： | Mixed | (可选）部署时传递给构造函数的参数。                                                                    |

**返回价值**

返回 `PromiEvent` 的 `Promise`：承诺将与新的合约实例一起解析。

| 类型         | 描述                                                                                    |
| ---------- | ------------------------------------------------------------------------------------- |
| PromiEvent | 一个承诺组合事件发射器。 当交易收据可用时，问题将得到解决。 如果`send()`是从`myContract.deploy()`调用的，那么承诺将与新的合约实例一起解析。 |

PromiEvent 可用于以下事件：

- transactionHash"：在事务发送且事务哈希值可用后立即触发。 其类型为 `string`。
- 收据"：当交易收据可用时触发。 详情请参阅 [caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) 。 其类型为 "对象"。
- error"：如果在发送过程中发生错误，它将被触发。 如果出现缺gas错误，第二个参数就是收据。 其类型为 "错误"。

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

返回将智能合约部署到 kaia 时使用的对象。 您可以通过调用 `myContract.deploy({ data, arguments }).send(options)` 发送智能合约部署交易。 成功部署后，将使用新的 KIP17 实例解决承诺问题。

**参数：**

| 名称      | 类型 | 说明                    |
| ------- | -- | --------------------- |
| options | 对象 | 用于部署的选项对象。 请参阅下表查找说明。 |

选项对象可以包含以下内容

| 名称 | 类型  | 描述                                    |
| -- | --- | ------------------------------------- |
| 数据 | 字符串 | 合约的字节码。                               |
| 参数 | 数组  | (可选）部署时传递给构造函数的参数。 |

**返回价值**

| 类型 | 描述                         |
| -- | -------------------------- |
| 对象 | 定义合约分配参数和函数的对象。 请参阅下表查找说明。 |

返回的对象包含以下内容

| 名称                                                                         | 类型       | 描述                                              |
| -------------------------------------------------------------------------- | -------- | ----------------------------------------------- |
| 参数                                                                         | 数组       | 在 `options.arguments` 中传递的参数。                   |
| [发送](#方法-方法名-发送)                                                           | function | 将合约部署到 kaia 的函数。 作为该函数结果的承诺将与新的合约实例一起解析。        |
| [符号]（#方法-方法名-符号）       | function | 作为发送方签署智能合约部署交易的函数。 签名函数将返回已签名的事务。              |
| [签署缴费人]（#方法-方法名-签署缴费人） | function | 作为付费方签署智能合约部署交易的功能。 signAsFeePayer 函数将返回已签名的交易。 |
| [estimateGas](#methods-methodname-estimategas)                             | function | 估算部署所用gas的函数。 执行该功能并不部署合约。                      |
| [encodeABI](#methods-methodname-encodeabi)                                 | function | 编码部署 ABI 的函数，即合同数据 + 构造函数参数。 执行该功能并不部署合约。       |

**注意** `myContract.deploy({ data, arguments }).sign(options)` 和 `myContract.deploy({ data, arguments }).signAsFeePayer(options)` 自 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

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

提交交易，执行智能合约的功能。 这会改变智能合约的状态。

该函数使用的交易类型取决于 `options` 或 `myContract.options` 中定义的值。 如果要通过 `myContract.send` 使用费用委托交易，则应正确设置 `feeDelegation` 和 `feePayer`。

- feeDelegation "未定义或定义为 "false"：[智能合约执行](./caver-transaction/basic.md#smartcontractexecution)
- 已将 `feeDelegation` 定义为 `true`，但未定义 `feePayer` : 引发错误。
- feeDelegation "定义为 "true"，"feePayer "已定义，但 "feeRatio "未定义：[收费授权智能合同执行](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定义为 "true"，"feePayer "和 "feeRatio "定义为 "true"：[FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet`必须包含与`options`或`myContract.options`中`from`和`feePayer`相对应的密钥实例才能签名。

**注意** `caver.validator` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 开始支持。

**参数**

| 名称         | 类型    | 描述                                                                                                       |
| ---------- | ----- | -------------------------------------------------------------------------------------------------------- |
| 选项         | 对象    | 用于发送的选项。 详情请参阅 [methods.methodName.send](#methods-methodname-send) 中的表格。 |
| methodName | 字符串   | 要执行的合约函数的方法名称。                                                                                           |
| 参数         | Mixed | (可选）传递给智能合约函数的参数。                                                                     |

**返回价值**

`Promise` returns `number`

| 类型         | 描述                                              |
| ---------- | ----------------------------------------------- |
| PromiEvent | 一个承诺组合事件发射器。 当有交易收据时，该问题将得到解决。 该承诺将通过新的合约实例来解决。 |

PromiEvent 可用于以下事件：

- 事务散列返回字符串：在发送事务且事务哈希值可用后立即触发。 其类型为 `string`。
- 收据 "返回 "对象"：当有交易收据时触发。 详情请参阅 [caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) 。 其类型为 "对象"。
- error`返回`Error\`：如果在发送过程中发生错误，则触发。 如果出现缺gas错误，第二个参数就是收据。 其类型为 "错误"。

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

## 签署<a href="#mycontract-sign" id="mycontract-sign"></a>

```javascript
myContract.sign(options, methodName [, param1 [, param2 [, ...]]])
```

作为发送方签署智能合约交易，以部署智能合约或执行智能合约的功能。

如果部署了智能合约，可在方法名中输入 "构造器"，如 `myContract.sign({ from, ... }, 'constructor', byteCode, ...)`.

该函数使用的交易类型取决于 `options` 或 `myContract.options` 中定义的值。 如果要通过 `myContract.sign` 使用费用委托交易，则应将 `feeDelegation` 定义为 `true`。

- feeDelegation "未定义或定义为 "false"：[SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- feeDelegation "定义为 "true"，但未定义 "feeRatio"：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定义为 "true"，"feeRatio "定义为 "true"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet` 必须包含与 `options` 或 `myContract.options` 中的 `from` 相对应的密钥实例才能签名。

**注意** `caver.validator` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 开始支持。

**参数**

| 名称         | 类型    | 描述                                                                                                       |
| ---------- | ----- | -------------------------------------------------------------------------------------------------------- |
| options    | 对象    | 用于发送的选项。 详情请参阅 [methods.methodName.send](#methods-methodname-send) 中的表格。 |
| methodName | 字符串   | 要执行的合约函数的方法名称。 如果要签署交易以部署智能合约，请使用 "构造函数 "字符串而不是方法名称。                                                     |
| 参数         | Mixed | (可选）传递给智能合约函数的参数。 如果要签署智能合约部署交易，请传递 byteCode 和构造函数参数。                                 |

**返回价值**

`Promise` 返回 [Transaction](./caver-transaction/caver-transaction.md) - 已签署的智能合约交易。

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

作为付费者签署智能合约交易，以部署智能合约或执行智能合约的功能。

如果部署了智能合约，可在方法名中输入 "构造函数"，例如 `myContract.signAsFeePayer({ from, feeDelegation: true, feePayer, ... }, 'constructor', byteCode, ...)`.

该函数使用的交易类型取决于 `options` 或 `myContract.options` 中定义的值。 signAsFeePayer "是一个作为交易费用支付方进行签名的函数，因此 "feeDelegation "字段必须定义为 "true"。 此外，必须在 "缴费人 "字段中定义缴费人的地址。

- 未定义 `feeDelegation` : 引发错误。
- 已定义 "feeDelegation"，但未定义 "feePayer"：抛出错误。
- feeDelegation "定义为 "true"，"feePayer "已定义，但 "feeRatio "未定义：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定义为 "true"，并定义了 "feePayer "和 "feeRatio"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet` 必须包含与 `options` 或 `myContract.options` 中的 `feePayer` 相对应的密钥实例才能签名。

**注意** `caver.kct.kip7.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**参数**

| 名称         | 类型    | 描述                                                                                                       |
| ---------- | ----- | -------------------------------------------------------------------------------------------------------- |
| options    | 对象    | 用于发送的选项。 详情请参阅 [methods.methodName.send](#methods-methodname-send) 中的表格。 |
| methodName | 字符串   | 要执行的合约函数的方法名称。 如果要签署交易以部署智能合约，请使用 "构造函数 "字符串而不是方法名称。                                                     |
| 参数         | Mixed | (可选）部署时传递给构造函数的参数。 如果要签署智能合约部署交易，请传递 byteCode 和构造函数参数。                                |

**返回价值**

`Promise` 返回 [Transaction](./caver-transaction/caver-transaction.md) - 已签署的智能合约交易。

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

将调用一个常量方法，并在 kaia 虚拟机中执行其智能合约方法，而不发送任何交易。 请注意，调用不能改变智能合约的状态。

**注意** `caver.validator` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 开始支持。

**参数**

| 名称         | 类型    | 描述                                                                                                                                |
| ---------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| options    | 对象    | (可选） 调用时使用的选项。 详情请参阅 [methods.methodName.call](#methods-methodname-call) 中的表格。 |
| methodName | 字符串   | 要调用的合约函数的方法名称。                                                                                                                    |
| 参数         | Mixed | (可选）传递给智能合约函数的参数。                                                                                              |

**返回价值**

返回 `Mixed` 的 `Promise` - 智能合约方法的返回值。 如果返回单个值，则按原样返回。 如果有多个返回值，则返回一个包含属性和索引的对象。

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

解码函数调用并返回参数。

**注意** `caver.abi.decodeFunctionCall` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 开始支持。

**参数**

| 名称           | 类型  | 描述           |
| ------------ | --- | ------------ |
| functionCall | 字符串 | 编码后的函数调用字符串。 |

**返回价值**

| 类型 | 描述                                              |
| -- | ----------------------------------------------- |
| 对象 | 包含纯参数的对象。 您可以使用 `result[0]` ，因为它可以像数组一样按参数顺序访问。 |

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

为该方法创建事务对象，然后可以调用、发送、估算或进行 ABI 编码。

该智能合约的方法可通过以下方式获取：

- 方法名称：`myContract.methods.methodName(123)` 或`myContract.methods[methodName](123)`。
- 方法原型：myContract.methods['methodName(uint256)'](123)\`方法原型
- 方法签名： `myContract.methods['0x58cf5f10'](123)`

这样就可以从 JavaScript 合约对象中调用名称相同但参数不同的函数。

## cf) 函数签名（函数选择器）<a href="#cf-function-signature-function-selector" id="cf-function-signature-function-selector"></a>

函数调用的调用数据的前四个字节指定了要调用的函数。
它是函数签名的 Keccak-256 (SHA-3) 哈希值的前四个字节（左侧，大指高阶）。

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

**参数**

属于此智能合约的任何方法的参数，在 JSON 接口中定义。

**返回价值**

`Promise` 返回 `object` - 一个对象，其中定义了用于执行合同的参数和函数：

| 名称                                                                         | 类型       | 描述                                                  |
| -------------------------------------------------------------------------- | -------- | --------------------------------------------------- |
| 参数                                                                         | 数组       | 传递给此方法的参数。                                          |
| [调用]（#方法-方法名-调用）       | function | 将在 kaia 虚拟机上调用并执行其智能合约中的常量方法而不发送交易（不能改变智能合约状态）的函数。  |
| [发送](#方法-方法名-发送)                                                           | function | 向 kaia 发送交易并执行其方法（可改变智能合约状态）的函数。                    |
| [符号]（#方法-方法名-符号）       | function | 作为发送方签署交易的函数。 签名函数将返回已签名的事务。                        |
| [签署缴费人]（#方法-方法名-签署缴费人） | function | 作为付费方签署交易的函数。 signAsFeePayer 函数将返回已签名的交易。           |
| [estimateGas](#methods-methodname-estimategas)                             | function | 该功能将估算执行过程中使用的gas。                                  |
| [encodeABI](#methods-methodname-encodeabi)                                 | function | 对该方法的 ABI 进行编码的函数。 这可以通过交易发送、调用方法或作为参数传递给另一个智能合约方法。 |

**注意** `caver.kct.kip7.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

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

将调用一个常量方法，并在 kaia 虚拟机中执行其智能合约方法，而不发送任何交易。 请注意，调用不能改变智能合约的状态。 建议使用 [myContract.call](#mycontract-call) 作为快捷函数。

**参数：**

| 名称       | 类型       | 描述                                                                |
| -------- | -------- | ----------------------------------------------------------------- |
| options  | 对象       | (可选） 调用时使用的选项。 详见下表。                           |
| callback | function | (可选）该回调将以智能合约方法的执行结果作为第二个参数触发，或以错误对象作为第一个参数触发。 |

选项对象可以包含以下内容

| 名称       | 类型  | 描述                                                |
| -------- | --- | ------------------------------------------------- |
| from     | 字符串 | (可选） 调用合同方法的地址。                |
| gasPrice | 字符串 | (可选）本次交易使用的 Gas 价格（以 peb 为单位）。 |
| gas      | 数量  | (可选）本次交易提供的最大 gas（gas 限值）。     |

**返回价值**

返回 `Mixed` 的 `Promise` - 智能合约方法的返回值。 如果返回单个值，则按原样返回。 如果有多个返回值，则返回一个包含属性和索引的对象。

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

将发送交易以部署智能合约或执行智能合约的功能。 这会改变智能合约的状态。 建议使用 [myContract.call](#mycontract-call) 作为快捷函数。

如果部署了智能合约，可以在 methodName 中输入 "constructor"，如 "myContract.methods.constructor "或 "myContract.methods['constructor']"，但建议使用 [myContract.deploy](#mycontract-deploy2) 函数。

该函数使用的交易类型取决于 `options` 或 `myContract.options` 中定义的值。 如果要通过 `methods.methodName.send`使用费用委托交易，则应正确设置 `feeDelegation` 和 `feePayer`。

- feeDelegation "未定义或定义为 "false"：[SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- 已将 `feeDelegation` 定义为 `true`，但未定义 `feePayer` : 引发错误。
- feeDelegation "定义为 "true"，"feePayer "已定义，但 "feeRatio "未定义：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定义为 "true"，并定义了 "feePayer "和 "feeRatio"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet`必须包含与`options`或`myContract.options`中`from`和`feePayer`相对应的密钥实例才能签名。

**参数**

| 名称       | 类型       | 描述                                                                     |
| -------- | -------- | ---------------------------------------------------------------------- |
| options  | 对象       | 用于发送的选项。 详见下表。                                                         |
| callback | function | (可选）该回调将首先使用 "transactionHash "触发，或使用错误对象作为第一个参数触发。 |

选项对象可以包含以下内容

| 名称            | 类型                                        | 描述                                                                                                                                                                                                      |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | 字符串                                       | (可选） 发送交易的地址。 如果省略，将使用 \`kip17.options.from'。                                                                                                        |
| gas           | 数量                                        | (可选）本次交易提供的最大 gas（gas 限值）。                                                                                                                                                           |
| gasPrice      | 字符串                                       | (可选）本次交易使用的 Gas 价格（以 peb 为单位）。                                                                                                                                                       |
| value         | number \\| string \\| BN \\| BigNumber | (可选）本次交易要转移到智能合约地址的 peb 值。                                                                                                                                                           |
| feeDelegation | boolean                                   | (可选，默认为 `false`）是否使用费用委托交易。 如果省略，将使用 \`kip17.options.feeDelegation'。                                                                                 |
| 付费者           | 字符串                                       | (可选）支付交易费的缴费人地址。 当 "feeDelegation "为 "true "时，该值将设置为交易中的 "feePayer "字段。 如果省略，将使用 \`kip17.options.feePayer'。                                          |
| 费用比率          | 字符串                                       | (可选）缴费人将承担的交易费比例。 如果 "feeDelegation "为 "true"，且 "feeRatio "设置为有效值，则使用部分费用委托交易。 有效范围为 1 到 99。 不允许比率为 0 或 100 及以上。 如果省略，将使用 \`kip17.options.feeRatio'。 |

**注意** `feeDelegation`、`feePayer` 和 `feeRatio`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**返回价值**

`Promise` returns `number`

| 类型         | 描述                                              |
| ---------- | ----------------------------------------------- |
| PromiEvent | 一个承诺组合事件发射器。 当有交易收据时，该问题将得到解决。 该承诺将通过新的合同实例来解决。 |

PromiEvent 可用于以下事件：

- 事务散列返回字符串：在发送事务且事务哈希值可用后立即触发。 其类型为 `string`。
- 收据 "返回 "对象"：当有交易收据时触发。 详情请参阅 [caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) 。 其类型为 "对象"。
- error`返回`Error\`：如果在发送过程中发生错误，则触发。 如果出现缺gas错误，第二个参数就是收据。 其类型为 "错误"。

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

作为发送方签署智能合约交易，以部署智能合约或执行智能合约的功能。 建议使用 [myContract.call](#mycontract-call) 作为快捷函数。

如果部署了智能合约，可在方法名中输入 "构造器"，如 "myContract.methods.constructor "或 "myContract.methods['constructor']"。

该函数使用的交易类型取决于 `options` 或 `myContract.options` 中定义的值。 如果要通过 `myContract.sign` 使用费用委托交易，则应将 `feeDelegation` 定义为 `true`。

- feeDelegation "未定义或定义为 "false"：[SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
- feeDelegation "定义为 "true"，但未定义 "feeRatio"：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定义为 "true"，"feeRatio "定义为 "true"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet` 必须包含与 `options` 或 `myContract.options` 中的 `from` 相对应的密钥实例才能签名。

**注意** `methods.methodName.sign` 自 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**参数**

| 名称      | 类型 | 描述                                                                                                          |
| ------- | -- | ----------------------------------------------------------------------------------------------------------- |
| options | 对象 | 用于创建交易的选项。 详情请参阅 [methods.methodName.send](#methods-methodname-send) 中的参数表。 |

**返回价值**

`Promise` 返回 [Transaction](./caver-transaction/caver-transaction.md) - 已签署的智能合约交易。

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

作为付费者签署智能合约交易，以部署智能合约或执行智能合约的功能。 建议使用 [myContract.call](#mycontract-call) 作为快捷函数。

如果部署了智能合约，可在方法名中输入 "构造器"，如 "myContract.methods.constructor "或 "myContract.methods['constructor']"。

该函数使用的交易类型取决于 `options` 或 `myContract.options` 中定义的值。 signAsFeePayer "是一个作为交易费用支付方进行签名的函数，因此 "feeDelegation "字段必须定义为 "true"。 此外，必须在 "缴费人 "字段中定义缴费人的地址。

- 未定义 `feeDelegation` : 引发错误。
- 已定义 "feeDelegation"，但未定义 "feePayer"：抛出错误。
- feeDelegation "定义为 "true"，"feePayer "已定义，但 "feeRatio "未定义：[FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- feeDelegation "定义为 "true"，并定义了 "feePayer "和 "feeRatio"：[FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**注意** `caver.wallet` 必须包含与 `options` 或 `myContract.options` 中的 `feePayer` 相对应的密钥实例才能签名。

**注意** `methods.methodName.signAsFeePayer` 自 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**参数**

| 名称      | 类型 | 描述                                                                                                          |
| ------- | -- | ----------------------------------------------------------------------------------------------------------- |
| options | 对象 | 用于创建交易的选项。 详情请参阅 [methods.methodName.send](#methods-methodname-send) 中的参数表。 |

**返回价值**

`Promise` 返回 [Transaction](./caver-transaction/caver-transaction.md) - 已签署的智能合约交易。

**举例**

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

将估算方法在 kaia 虚拟机中执行时的耗时。 由于当时智能合约的状态可能不同，因此估计值可能与后来发送交易时实际使用的气体不同。

**参数**

| 名称       | 类型       | 描述                                                       |
| -------- | -------- | -------------------------------------------------------- |
| options  | 对象       | (可选） 调用时使用的选项。 详见下表。                  |
| callback | function | (可选）此回调将以气体估计结果作为第二个参数，或以错误对象作为第一个参数。 |

选项对象可以包含以下内容

| 名称    | 类型                                        | 描述                                                                                    |
| ----- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| from  | 字符串                                       | (可选） 发送交易的地址。                                                      |
| gas   | 数量                                        | (可选）本次交易提供的最大 gas（gas 限值）。 设置特定值有助于检测gas过量错误。 如果使用了所有gas，将返回相同的数字。 |
| value | number \\| string \\| BN \\| BigNumber | (可选）如果执行该合约功能的交易被发送到 kaia，将被转移到智能合约地址的值，单位为 peb。                   |

**返回价值**

`Promise` returns `number`

| 类型 | 描述             |
| -- | -------------- |
| 数量 | 模拟呼叫/交易使用的gas。 |

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

编码该方法的 ABI。 它可用于发送交易或调用方法，或作为参数传递给另一个智能合约方法。

**参数**

属于此智能合约的任何方法的参数，在 JSON 接口中定义。

**返回价值**

| 类型  | 描述                     |
| --- | ---------------------- |
| 字符串 | 通过事务或调用发送的 ABI 编码字节代码。 |

**示例**

```javascript
> myContract.methods.methodName(123).encodeABI()
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```

## myContract.once <a href="#mycontract-once" id="mycontract-once"></a>

```javascript
myContract.once(event [, options], callback)
```

订阅事件，并在第一个事件或错误发生后立即取消订阅。 只会在单个事件中触发。

**参数**

| 名称       | 类型       | 描述                                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| 事件       | 字符串      | 合约中的事件名称，或 `allEvents` 来获取所有事件。                                                                               |
| options  | 对象       | (可选）用于订阅的选项。 详见下表。                                                                         |
| callback | function | 如果第二个参数为第一个事件，或第一个参数为错误，则会触发该回调。 有关事件结构的详细信息，请参阅 [myContract.getPastEvents](#getpastevents) 。 |

选项对象可以包含以下内容

| 名称     | 类型 | 描述                                                                                                                          |
| ------ | -- | --------------------------------------------------------------------------------------------------------------------------- |
| 高级筛选   | 对象 | (可选）可让您通过索引参数过滤事件，例如_，`{filter：{mynumber: [12,13]}}` 表示所有 "mynumber "为 12 或 13 的事件。 |
| topics | 数组 | (可选）这允许您手动设置事件筛选器的主题。 鉴于过滤器属性和事件特征，`topic[0]` 不会自动设置。                                                    |

**返回价值**

`Promise` 返回 `object` - 事件对象。 有关事件对象的更多详情，请参阅 [myContract.getPastEvents]（#getpastevents）。

**示例**

```javascript
> myContract.once('eventName', {
    filter：{myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // 使用数组表示 OR：例如 20 或 23
  }, function(error, event) { console.log(event) })

// 事件输出示例
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

订阅事件。 此功能与 [myContract.events.eventName](#mycontract-events)相同。

您可以调用`subscribe`函数返回的订阅对象的`unsubscribe`函数来取消订阅事件。

**注意** `caver.kct.kip7.create`从 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 开始支持。

**参数**

| 名称       | 类型       | 描述                                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| event    | 字符串      | 合约中的事件名称，或 `allEvents` 来获取所有事件。                                                                               |
| options  | 对象       | (可选）用于订阅的选项。 详见下表。                                                                         |
| callback | function | 如果第二个参数为第一个事件，或第一个参数为错误，则会触发该回调。 有关事件结构的详细信息，请参阅 [myContract.getPastEvents](#getpastevents) 。 |

选项对象可以包含以下内容

| 名称     | 类型 | 描述                                                                                                                          |
| ------ | -- | --------------------------------------------------------------------------------------------------------------------------- |
| 高级筛选   | 对象 | (可选）可让您通过索引参数过滤事件，例如_，`{filter：{mynumber: [12,13]}}` 表示所有 "mynumber "为 12 或 13 的事件。 |
| topics | 数组 | (可选）这允许您手动设置事件筛选器的主题。 鉴于过滤器属性和事件特征，`topic[0]` 不会自动设置。                                                    |

**返回价值**

`Promise` 返回 `object` - 事件对象。 有关事件对象的更多详情，请参阅 [myContract.getPastEvents]（#getpastevents）。

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

订阅事件。

**参数**

| 名称       | 类型       | 描述                                                      |
| -------- | -------- | ------------------------------------------------------- |
| options  | 对象       | (可选）用于订阅的选项。 详见下表。                   |
| callback | function | (可选）该回调将针对作为第二个参数的每个事件或作为第一个参数的错误触发。 |

选项对象可以包含以下内容

| 名称        | 类型 | 描述                                                                                                                          |
| --------- | -- | --------------------------------------------------------------------------------------------------------------------------- |
| 高级筛选      | 对象 | (可选）可让您通过索引参数过滤事件，例如_，`{filter：{mynumber: [12,13]}}` 表示所有 "mynumber "为 12 或 13 的事件。 |
| fromBlock | 数量 | (可选）从中获取事件的区块编号。                                                                                         |
| topics    | 数组 | (可选）这允许您手动设置事件筛选器的主题。 鉴于过滤器属性和事件特征，`topic[0]` 不会自动设置。                                                    |

**返回价值**

事件发射器事件发射器有以下事件：

| 名称    | 类型  | 描述                     |
| ----- | --- | ---------------------- |
| 数据    | 对象  | 触发每个以事件对象为参数的传入事件。     |
| 已连接   | 字符串 | 订阅成功连接后触发一次。 它返回订阅 ID。 |
| error | 对象  | 当订阅出现错误时触发。            |

**注意** `caver.ipfs` 自 caver-js [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4) 开始支持。

返回的事件 `object` 结构如下：

| 名称           | 类型       | 描述                                                                                                                 |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| event        | 字符串      | 事件名                                                                                                                |
| 签名           | 字符串      | 事件签名，如果是匿名事件则为 "空"。                                                                                                |
| address      | 字符串      | 该事件的起始地址。                                                                                                          |
| returnValues | 对象       | 事件的返回值，_e.g._，`{myVar: 1, myVar2: '0x234...'}`。                                    |
| logIndex     | 数量       | 区块中事务索引位置的整数。                                                                                                      |
| 交易索引         | 数量       | 创建事件的事务索引位置的整数。                                                                                                    |
| 交易哈希值。       | 32 字节字符串 | 创建该日志的交易哈希。 空"。                                                                                                    |
| blockHash    | 32 字节字符串 | 创建该事件的区块的哈希值。 空"。                                                                                                  |
| 区块编号         | 数量       | 该日志创建的区块编号。 待处理时为 "null"。                                                                                          |
| 原始数据         | 字符串      | 包含非索引日志参数的数据。                                                                                                      |
| 原始主题         | 数组       | 一个数组，最多包含 4 个 32 字节的主题，主题 1-3 包含事件的索引参数。                                                                           |
| id           | 字符串      | 日志标识符。 它是通过将 "log_"字符串与`keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`连接而成的。 |

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

与 [myContract.events](#mycontract-events) 相同，但接收来自此智能合约的所有事件。 过滤属性可选择过滤这些事件。

## getPastEvents <a href="#getpastevents" id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```

获取该合约过去发生的事件。

**参数**

| 名称       | 类型       | 描述                                                         |
| -------- | -------- | ---------------------------------------------------------- |
| event    | 字符串      | 合约中的事件名称，或 `"allEvents"` 获取所有事件。                           |
| options  | 对象       | (可选）用于订阅的选项。 详见下表。                      |
| callback | function | (可选）该回调将以事件日志数组作为第二个参数触发，或以错误作为第一个参数触发。 |

选项对象可以包含以下内容

| 名称        | 类型 | 描述                                                                                                                          |
| --------- | -- | --------------------------------------------------------------------------------------------------------------------------- |
| 高级筛选      | 对象 | (可选）可让您通过索引参数过滤事件，例如_，`{filter：{mynumber: [12,13]}}` 表示所有 "mynumber "为 12 或 13 的事件。 |
| fromBlock | 数量 | (可选）从中获取事件的区块编号。                                                                                         |
| toBlock   | 数量 | (可选）要获取事件的区块编号（默认为 "最新"）。                                                                                |
| topics    | 数组 | (可选）这允许手动设置事件筛选器的主题。 鉴于过滤器属性和事件特征，`topic[0]` 不会自动设置。                                                     |

**返回价值**

`Promise` 返回 `Array` - 包含过去事件对象的数组，与给定的事件名称和过滤器匹配。

选项对象可以包含以下内容

| 名称           | 类型  | 描述                                                                                               |
| ------------ | --- | ------------------------------------------------------------------------------------------------ |
| event        | 字符串 | 事件名称。                                                                                            |
| 签名           | 字符串 | 事件签名，如果是匿名事件则为`null`。                                                                            |
| 地址           | 字符串 | 该活动的发起地址。                                                                                        |
| returnValues | 对象  | 事件的返回值，如 `{myVar: 1, myVar2: '0x234...'}`。                                                       |
| logIndex     | 数量  | 区块中的日志索引位置。                                                                                      |
| 交易索引         | 数量  | 事件创建时的事务索引位置。                                                                                    |
| 交易哈希值。       | 字符串 | 创建该日志的交易散列。                                                                                      |
| blockHash    | 字符串 | 该事件在哪个区块中创建的哈希值。                                                                                 |
| 区块编号         | 数字  | 该日志创建时所在的区块编号。                                                                                   |
| 原始           | 对象  | 对象定义了 `data` 和 `topic`。 `raw.data` 包含非索引日志参数。 `raw.topic` 是一个数组，最多有四个 32 字节的主题，主题 1-3 包含事件的索引参数。 |

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
