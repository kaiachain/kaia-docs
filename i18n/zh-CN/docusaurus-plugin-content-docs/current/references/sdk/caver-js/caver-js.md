# caver-java （1.5.0 或更高版本）

![](/img/references/kaiaXcaver-js.png)

caver-js "是一个 JavaScript API 库，允许开发人员使用 HTTP 或 Websocket 连接与 kaia 节点进行交互。 它可在 [npm](https://www.npmjs.com/package/caver-js) 上获取。

## 特色<a href="#features" id="features"></a>

- 通过 HTTP 和 Websocket 完整实现 kaia 的 JSON-RPC 客户端 API
- 支持 kaia 交易、账户和账户密钥类型
- 用于在 kaia 网络上部署和执行智能合约的 JavaScript 智能合约包
- 用于管理 kaia 账户的内存钱包
- 支持收费授权
- 支持 kaia 钱包密钥格式
- RLP 中交易对象的编码/解码
- 签署交易对象
- 轻松将 web3-js 应用程序移植到 caver-js

## caver-js 中的软件包<a href="#packages-in-caver-js" id="packages-in-caver-js"></a>

以下是 `caver-js` 中提供的软件包。

- [caver.account](./api/caver.account.md)
- [caver.wallet.keyring](./api/caver-wallet/keyring.md)
- [caver.wallet](./api/caver-wallet/caver-wallet.md)
- [caver.transaction](./api/caver-transaction/caver-transaction.md)
- [caver.rpc](./api/caver-rpc/caver-rpc.md)
- [caver.contract](./api/caver.contract.md)
- [caver.abi](./api/caver.abi.md)
- [caver.kct](./api/caver-kct/caver-kct.md)
- [caver.validator](./api/caver.validator.md)
- [caver.utils](./api/caver.utils.md)
- [caver.ipfs](./api/caver.ipfs.md)

## Error Code Improvement <a href="#error-code-improvement" id="error-code-improvement"></a>

以太坊通过 web3.js 发送的错误信息很难找出错误发生在哪里。 `caver-js` 改进了从 kaia 捕捉错误信息的接口。

更多详情可在交易收据的 `txError` 值中找到，如下所示：

```
Error: runtime error occurred in interpreter
 {
  "blockHash": "0xe7ec35c9fff1178d52cee1d46d40627d19f828c4b06ad1a5c3807698b99acb20",
  "blockNumber": 7811,
  "contractAddress": null,
  "from": "0xa8a2d37727197cc0eb827f8c5a3a3aceb26cf59e",
  "gasUsed": 9900000000,
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "status": false,
  "to": "0xf8425b0f65147969621f9390ca06139c7b439497",
  "transactionHash": "0x85ce2b307899c90144442d9b3236827ac57375c522be2435093aebfd920b8c58",
  "transactionIndex": 0,
  "txError": "0x2",
  "events": {}
}
```

## 向 kaia 发送交易时的注意事项<a href="#caution-when-sending-a-transaction-to-klaytn" id="caution-when-sending-a-transaction-to-klaytn"></a>

自启用 [KIP-71](https://kips.kaia.io/KIPs/kip-71)的岩浆硬分叉后，Kaia 制定了新的gas价格政策。

因此，在发送交易时，您需要根据硬分叉是否适用来设置不同的 "gasPrice "逻辑。

在 Magma 硬分叉之前，kaia 上的交易一直采用 "固定gas价格"。 因此，以任何其他价格提交给网络的交易都会被拒绝。 如果您在签署或提交交易时未定义 "gasPrice"，caver-js 将使用 [caver.rpc.klay.getGasPrice](./api/caver-rpc/klay.md#caver-rpc-klay-getgasprice) RPC 调用来设置gas价格。

Magma硬分叉后，kaia 采用了 "动态gas费用定价机制"。 交易的gas价格应高于 kaia 网络的基本费用。 如果在签署或提交交易时未定义 "gasPrice"，caver-js 会使用 `caver.rpc.klay.getGasPrice`设置交易的 "gasPrice "字段。

### 如何设置gas价格字段

caver-js 提供了多种设置 `gasPrice` 的方法。 使用 caver-js 时设置 "gasPrice "字段的方法如下。 无论硬分叉与否，这里介绍的方法都可以使用。

#### 不要定义 "gasPrice "字段

如果创建实例时未定义 `gasPrice` 字段，则在调用 `tx.sign` 或 `tx.signAsFeePayer` 签署交易时会自动设置 `gasPrice` 字段。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.sign(from, tx) // Before signing, gasPrice is set inside `tx.sign`.
```

#### 使用 `tx.fillTransaction` 方法

您可以使用 `tx.fillTransaction`，该函数会在省略事务的可选字段时，为其填充适当的值。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.fillTransaction() // Fill the optional tx fields. 
```

#### 使用 `tx.suggestGasPrice` 方法

您可以使用 `tx.suggestGasPrice` 的结果设置 `gasPrice` ，该结果会返回推荐的gas价格。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
tx.gasPrice = await tx.suggestGasPrice() 
```

有关天然气价格的更多信息，请参阅 [天然气和单位价格概览](../../../learn/transaction-fees/transaction-fees.md#effective-gas-price)。 可使用 [caver.rpc.klay.getGasPrice](./api/caver-rpc/klay.md#caver-rpc-klay-getgasprice) 获取网络中使用的天然气价格。

## 链接<a href="#links" id="links"></a>

- caver-js [GitHub repository](https://github.com/kaiachain/caver-js)
- caver-js on [npm](https://www.npmjs.com/package/caver-js)
