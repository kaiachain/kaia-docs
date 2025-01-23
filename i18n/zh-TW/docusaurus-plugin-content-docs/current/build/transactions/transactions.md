# 實作交易

本指南提供在 Kaia 網路上實作交易的全面概觀，涵蓋各種交易類型、編碼、簽章和網路互動。

## Kaia 交易元件

Kaia 交易一般包括下列元件：

| 組件            | 說明                                                                                                                                                                                                                                  |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | 寄件者的地址。  由於 key 對和位址的解耦，對於大多數 Kaia 交易類型是必需的。                                                                                                                                                                                        |
| to            | 接收轉賬金額的賬戶地址。                                                                                                                                                                                                                        |
| `value`       | 以 `kei` 為單位的 KAIA 轉賬金額。                                                                                                                                                                                                             |
| `input`       | 附屬於事務的數據，用於執行事務。                                                                                                                                                                                                                    |
| `v`, `r`, `s` | 發送方為讓接收方獲取發送方地址而生成的加密簽名。                                                                                                                                                                                                            |
| `nonce`       | 用於唯一標識發件人交易的值。 如果一個發送方生成了兩個具有相同 nonce 的交易，則只執行其中一個。                                                                                                                                                                                 |
| `gas`         | 交易允許使用的最高交易費金額。                                                                                                                                                                                                                     |
| `gasPrice`    | 一個乘數，用於計算發件人將支付多少代幣。 發送方將支付的代幣數量通過 `gas` \* `gasPrice` 計算得出。 例如，如果 gas 為 10，gasPrice 為 10^18，發件人將支付 10 KAIA 的交易費。 Unit of KAIA is described [here](../../learn/token-economics/kaia-native-token.md#units-of-kaia). |

## Signature Validation

Because Kaia decouples key pairs from addresses, signature validation differs from typical blockchains.  The `from` field is crucial, as it identifies the sender.  The [AccountKey](../../learn/accounts.md#account-key) associated with the `from` address is used to validate the signature.

## Fee Delegation and SenderTxHash

Kaia's fee delegation feature allows a third party to pay transaction fees.  This requires two signatures – one from the sender and one from the fee payer. The `SenderTxHash` is crucial for tracking fee-delegated transactions. It's a hash of the transaction _without_ the fee payer's information, allowing the sender to track the transaction before the fee payer signs it.  The sender can use the `SenderTxHash` to retrieve the complete transaction via the [kaia_getTransactionBySenderTxHash](../../references/json-rpc/kaia/get-transaction-by-sender-tx-hash) RPC method.

## Transaction Types

典型的區塊鏈平臺只提供一種交易類型，而 Kaia 則提供多種交易類型，為交易提供了新的功能，並優化了內存佔用和性能。 The following table provides an overview of the transaction types available on Kaia:

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

## Implementation Details

- **RLP Encoding:** Transactions are serialized using Recursive Length Prefix (RLP) encoding before submission.
- **Signatures:**  Transactions are signed using [Specify signature algorithm, e.g., ECDSA] to ensure authenticity.
- **Examples and RPC Outputs:**  This section will provide practical examples and expected RPC outputs for each transaction type.  (Note:  `TxTypeValueTransfer` sends KAIA without any additional data, while `TxTypeValueTransferMemo` allows for including a short memo field along with the transfer.)

By understanding these components and implementation details, developers can effectively build applications on the Kaia network.
