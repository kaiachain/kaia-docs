# caver-java （1.5.0 或更高版本）

![](/img/references/kaiaXcaver-js.png)

caver-js "是一個 JavaScript API 庫，允許開發人員使用 HTTP 或 Websocket 連接與 kaia 節點進行交互。 它可在 [npm](https://www.npmjs.com/package/caver-js) 上獲取。

## 特色<a href="#features" id="features"></a>

- 通過 HTTP 和 Websocket 完整實現 kaia 的 JSON-RPC 客戶端 API
- 支持 kaia 交易、賬戶和賬戶密鑰類型
- 用於在 kaia 網絡上部署和執行智能合約的 JavaScript 智能合約包
- 用於管理 kaia 賬戶的內存錢包
- 支持收費授權
- 支持 kaia 錢包密鑰格式
- RLP 中交易對象的編碼/解碼
- 簽署交易對象
- 輕鬆將 web3-js 應用程序移植到 caver-js

## caver-js 中的軟件包<a href="#packages-in-caver-js" id="packages-in-caver-js"></a>

以下是 `caver-js` 中提供的軟件包。

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

以太坊通過 web3.js 發送的錯誤信息很難找出錯誤發生在哪裡。 `caver-js` 改進了從 kaia 捕捉錯誤信息的接口。

更多詳情可在交易收據的 `txError` 值中找到，如下所示：

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

## 向 kaia 發送交易時的注意事項<a href="#caution-when-sending-a-transaction-to-klaytn" id="caution-when-sending-a-transaction-to-klaytn"></a>

自啟用 [KIP-71](https://kips.kaia.io/KIPs/kip-71)的岩漿硬分叉後，Kaia 制定了新的gas價格政策。

因此，在發送交易時，您需要根據硬分叉是否適用來設置不同的 "gasPrice "邏輯。

在 Magma 硬分叉之前，kaia 上的交易一直採用 "固定gas價格"。 因此，以任何其他價格提交給網絡的交易都會被拒絕。 如果您在簽署或提交交易時未定義 "gasPrice"，caver-js 將使用 [caver.rpc.klay.getGasPrice](./api/caver-rpc/klay.md#caver-rpc-klay-getgasprice) RPC 調用來設置gas價格。

Magma硬分叉後，kaia 採用了 "動態gas費用定價機制"。 交易的gas價格應高於 kaia 網絡的基本費用。 如果在簽署或提交交易時未定義 "gasPrice"，caver-js 會使用 `caver.rpc.klay.getGasPrice`設置交易的 "gasPrice "字段。

### 如何設置gas價格字段

caver-js 提供了多種設置 `gasPrice` 的方法。 使用 caver-js 時設置 "gasPrice "字段的方法如下。 無論硬分叉與否，這裡介紹的方法都可以使用。

#### 不要定義 "gasPrice "字段

如果創建實例時未定義 `gasPrice` 字段，則在調用 `tx.sign` 或 `tx.signAsFeePayer` 簽署交易時會自動設置 `gasPrice` 字段。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.sign(from, tx) // Before signing, gasPrice is set inside `tx.sign`.
```

#### 使用 `tx.fillTransaction` 方法

您可以使用 `tx.fillTransaction`，該函數會在省略事務的可選字段時，為其填充適當的值。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.fillTransaction() // Fill the optional tx fields. 
```

#### 使用 `tx.suggestGasPrice` 方法

您可以使用 `tx.suggestGasPrice` 的結果設置 `gasPrice` ，該結果會返回推薦的gas價格。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
tx.gasPrice = await tx.suggestGasPrice() 
```

For more information about the gas price, see [Gas and Unit Price Overview](../../../learn/transaction-fees/transaction-fees.md#effective-gas-price). The price of gas used in the network can be obtained by using [caver.rpc.klay.getGasPrice](./api/caver-rpc/klay.md#caver-rpc-klay-getgasprice).

## 鏈接<a href="#links" id="links"></a>

- caver-js [GitHub repository](https://github.com/kaiachain/caver-js)
- caver-js on [npm](https://www.npmjs.com/package/caver-js)
