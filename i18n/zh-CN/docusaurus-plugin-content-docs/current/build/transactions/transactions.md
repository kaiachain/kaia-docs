# 实施交易

本指南全面概述了如何在 Kaia 网络上实施交易，涵盖各种交易类型、编码、签名和网络交互。

## Kaia 交易组件

Kaia 交易一般包括以下内容：

| 组件            | 说明                                                                                                                                                                                                |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 从             | 发件人地址。  由于密钥对和地址的解耦，大多数 Kaia 交易类型都需要此功能。                                                                                                                                                          |
| 到             | 接收转账金额的账户地址。                                                                                                                                                                                      |
| 值             | 以 `kei` 为单位的 KAIA 转账金额。                                                                                                                                                                           |
| 输入            | 附属于事务的数据，用于执行事务。                                                                                                                                                                                  |
| `v`, `r`, `s` | 发送方为让接收方获取发送方地址而生成的加密签名。                                                                                                                                                                          |
| 没有            | 用于唯一标识发件人交易的值。 如果一个发送方生成了两个具有相同 nonce 的交易，则只执行其中一个。                                                                                                                                               |
| 气体            | 交易允许使用的最高交易费金额。                                                                                                                                                                                   |
| 天然气价格         | 一个乘数，用于计算发件人将支付多少代币。 发送方将支付的代币数量通过 `gas` \* `gasPrice` 计算得出。 例如，如果 gas 为 10，gasPrice 为 10^18，发件人将支付 10 KAIA 的交易费。 KAIA 的单位见 [此处](../../learn/token-economics/kaia-native-token.md#units-of-kaia)。 |

## 签名验证

由于 Kaia 将密钥对与地址解耦，因此签名验证与典型的区块链不同。  发件人 "字段至关重要，因为它能识别发件人。  与 "from "地址相关联的[AccountKey](../../learn/accounts.md#account-key) 用于验证签名。

## 费用委托和 SenderTxHash

Kaia 的费用委托功能允许第三方支付交易费用。  这需要两个签名，一个是寄件人签名，另一个是缴费人签名。 SenderTxHash" 对于跟踪费用委托交易至关重要。 它是交易的哈希值，\*不包括付费者的信息，允许发送者在付费者签署之前跟踪交易。  发送方可以通过 [kaia_getTransactionBySenderTxHash](../../references/json-rpc/kaia/get-transaction-by-sender-tx-hash) RPC 方法使用 "SenderTxHash "来检索完整的事务。

## 交易类型

典型的区块链平台只提供一种交易类型，而 Kaia 则提供多种交易类型，为交易提供了新的功能，并优化了内存占用和性能。 下表概述了 Kaia 上可用的交易类型：

|                        | 基础                                                                      | 收费代表团                                                                                                    | 部分费用授权                                                                                                                             |
| :--------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| Legacy                 | [TxTypeLegacyTransaction](./basic.md#txtypelegacytransaction)           | N/A                                                                                                      | N/A                                                                                                                                |
| ValueTransfer          | [TxTypeValueTransfer](./basic.md#txtypevaluetransfer)                   | [TxTypeFeeDelegatedValueTransfer](./fee-delegation.md#txtypefeedelegatedvaluetransfer)                   | [TxTypeFeeDelegatedValueTransferWithRatio](./partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [TxTypeValueTransferMemo](./basic.md#txtypevaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemo](./fee-delegation.md#txtypefeedelegatedvaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemoWithRatio](./partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [TxTypeSmartContractDeploy](./basic.md#txtypesmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeploy](./fee-delegation.md#txtypefeedelegatedsmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeployWithRatio](./partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [TxTypeSmartContractExecution](./basic.md#txtypesmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecution](./fee-delegation.md#txtypefeedelegatedsmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecutionWithRatio](./partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [TxTypeAccountUpdate](./basic.md#txtypeaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdate](./fee-delegation.md#txtypefeedelegatedaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdateWithRatio](./partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio)                   |
| Cancel                 | [TxTypeCancel](./basic.md#txtypecancel)                                 | [TxTypeFeeDelegatedCancel](./fee-delegation.md#txtypefeedelegatedcancel)                                 | [TxTypeFeeDelegatedCancelWithRatio](./partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [TxTypeChainDataAnchoring](./basic.md#txtypechaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoring](./fee-delegation.md#txtypefeedelegatedchaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoringWithRatio](./partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio)         |

## 实施细节

- **RLP 编码：** 交易在提交前使用递归长度前缀（RLP）编码进行序列化。
- **签名：** 交易使用[指定签名算法，如 ECDSA]签名，以确保真实性。
- **示例和 RPC 输出：** 本节将为每种事务类型提供实际示例和预期 RPC 输出。  (注意："TxTypeValueTransfer "发送 KAIA 时不包含任何附加数据，而 "TxTypeValueTransferMemo "则允许在传输时包含一个简短的备忘字段）。

通过了解这些组件和实施细节，开发人员可以在 Kaia 网络上有效地构建应用程序。