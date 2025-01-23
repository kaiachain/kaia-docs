# 交易

## 交易概述<a id="transactions-overview"></a>

區塊鏈平臺中的交易是節點之間發送的改變區塊鏈狀態的信息。 例如，當執行一筆從 Alice 賬戶向 Bob 賬戶發送 10 KAIA 的交易時，Alice 的餘額減少 10 KAIA，而 Bob 的餘額增加 10 KAIA。 請注意，一個事務不能與另一個事務交錯處理，因為事務是原子操作。 典型的區塊鏈交易由以下部分組成：

| 組件       | 說明                                                                                                                                                                                                                                                                    |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value    | 以 `kei` 為單位的 KAIA 轉賬金額。                                                                                                                                                                                                                                               |
| to       | 接收轉賬金額的賬戶地址。                                                                                                                                                                                                                                                          |
| input    | 附屬於事務的數據，用於執行事務。                                                                                                                                                                                                                                                      |
| v, r, s  | 發送方為讓接收方獲取發送方地址而生成的加密簽名。                                                                                                                                                                                                                                              |
| nonce    | 用於唯一標識發件人交易的值。 如果一個發送方生成了兩個具有相同 nonce 的交易，則只執行其中一個。                                                                                                                                                                                                                   |
| gas      | 交易允許使用的最高交易費金額。                                                                                                                                                                                                                                                       |
| gasPrice | 一個乘數，用於計算發件人將支付多少代幣。 發送方將支付的代幣數量通過 `gas` \* `gasPrice` 計算得出。 例如，如果 gas 為 10，gasPrice 為 10^18，發件人將支付 10 KAIA 的交易費。 此處](../kaia-native-token.md#units-of-klay)描述了 KAIA 單位。 |

## Kaia 交易<a id="kaia-transactions"></a>

典型的區塊鏈平臺只提供一種交易類型，而 Kaia 則提供多種交易類型，為交易提供了新的功能，並優化了內存佔用和性能。

### 交易簽名驗證<a id="signature-validation-of-transactions"></a>

在典型的區塊鏈平臺中，地址來源於公鑰，而公鑰又來源於交易簽名。 這隻有在地址和密鑰對緊密結合的情況下才有可能實現。

由於在 Kaia 中，密鑰對與地址是分離的，因此無法通過交易簽名得出發件人地址。 這就是除 TxTypeLegacyTransaction 外，Kaia 交易類型都有 "from "字段的原因。 在 Kaia 中，為了驗證交易，需要獲取 `from` 的 [AccountKey](../accounts.md#account-key) 並使用獲取的密鑰驗證交易簽名。

### 收費代表團<a id="fee-delegation"></a>

為使企業在設計業務模式時具有必要的靈活性，Kaia 為其基本交易類型提供了許多收費授權版本。 這些變體使服務提供商能夠通過支付交易費來補貼其最終用戶活動。 通過使用帶有比率參數的交易，可進一步細化交易費用補貼，讓服務提供商指定他們將承擔的費用百分比。 費用委託交易至少需要兩個簽名：一個來自發件人，另一個來自費用支付人。

### SenderTxHash <a id="sendertxhash"></a>

SenderTxHash 是交易的哈希值，不含繳費人的地址和簽名。 在費用支付方簽署交易之前，尚未確定費用委託交易的交易哈希值。 要跟蹤收費委託交易，發送方應獲取從完整交易中提取的交易哈希值，其中包含發送方和收費方的簽名。 由於發送方很難獲取交易哈希值，Kaia 除了提供交易哈希值外，還提供了發送方哈希值（SenderTxHash）。 要在 Kaia 網絡中找到完整的收費委託交易，發送方生成 SenderTxHash，並通過 [kaia_getTransactionBySenderTxHash](../../references/json-rpc/klay/get-transaction-by-sender-tx-hash/) 請求交易對象。 如何獲取 SenderTxHash 取決於每種交易類型，這在每種交易類型的描述中都有說明。

每種交易類型都有詳細說明：

|                        | 基礎                                                                      | 收費代表團                                                                                                    | 部分費用授權                                                                                                                             |
| :--------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| Legacy                 | [TxTypeLegacyTransaction](./basic.md#txtypelegacytransaction)           | N/A                                                                                                      | N/A                                                                                                                                |
| ValueTransfer          | [TxTypeValueTransfer](./basic.md#txtypevaluetransfer)                   | [TxTypeFeeDelegatedValueTransfer](./fee-delegation.md#txtypefeedelegatedvaluetransfer)                   | [TxTypeFeeDelegatedValueTransferWithRatio](./partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [TxTypeValueTransferMemo](./basic.md#txtypevaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemo](./fee-delegation.md#txtypefeedelegatedvaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemoWithRatio](./partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [TxTypeSmartContractDeploy](./basic.md#txtypesmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeploy](./fee-delegation.md#txtypefeedelegatedsmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeployWithRatio](./partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [TxTypeSmartContractExecution](./basic.md#txtypesmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecution](./fee-delegation.md#txtypefeedelegatedsmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecutionWithRatio](./partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [TxTypeAccountUpdate](./basic.md#txtypeaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdate](./fee-delegation.md#txtypefeedelegatedaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdateWithRatio](./partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio)                   |
| Cancel                 | [TxTypeCancel](./basic.md#txtypecancel)                                 | [TxTypeFeeDelegatedCancel](./fee-delegation.md#txtypefeedelegatedcancel)                                 | [TxTypeFeeDelegatedCancelWithRatio](./partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [TxTypeChainDataAnchoring](./basic.md#txtypechaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoring](./fee-delegation.md#txtypefeedelegatedchaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoringWithRatio](./partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio)         |
