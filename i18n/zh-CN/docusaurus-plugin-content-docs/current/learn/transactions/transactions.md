# 交易

## 交易概述<a id="transactions-overview"></a>

区块链平台中的交易是节点之间发送的改变区块链状态的信息。 例如，当执行一笔从 Alice 账户向 Bob 账户发送 10 KAIA 的交易时，Alice 的余额减少 10 KAIA，而 Bob 的余额增加 10 KAIA。 请注意，一个事务不能与另一个事务交错处理，因为事务是原子操作。 典型的区块链交易由以下部分组成：

| 组件       | 说明                                                                                                                                                                                                                                                                                     |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value    | 以 `kei` 为单位的 KAIA 转账金额。                                                                                                                                                                                                                                                                |
| to       | 接收转账金额的账户地址。                                                                                                                                                                                                                                                                           |
| input    | 附属于事务的数据，用于执行事务。                                                                                                                                                                                                                                                                       |
| v, r, s  | 发送方为让接收方获取发送方地址而生成的加密签名。                                                                                                                                                                                                                                                               |
| nonce    | 用于唯一标识发件人交易的值。 如果一个发送方生成了两个具有相同 nonce 的交易，则只执行其中一个。                                                                                                                                                                                                                                    |
| gas      | 交易允许使用的最高交易费金额。                                                                                                                                                                                                                                                                        |
| gasPrice | 一个乘数，用于计算发件人将支付多少代币。 发送方将支付的代币数量通过 `gas` \* `gasPrice` 计算得出。 例如，如果 gas 为 10，gasPrice 为 10^18，发件人将支付 10 KAIA 的交易费。 此处](.../kaia-native-token.md#units-of-klay)描述了 KAIA 单位。 |

## Kaia 交易<a id="kaia-transactions"></a>

典型的区块链平台只提供一种交易类型，而 Kaia 则提供多种交易类型，为交易提供了新的功能，并优化了内存占用和性能。

### 交易签名验证<a id="signature-validation-of-transactions"></a>

在典型的区块链平台中，地址来源于公钥，而公钥又来源于交易签名。 这只有在地址和密钥对紧密结合的情况下才有可能实现。

由于在 Kaia 中，密钥对与地址是分离的，因此无法通过交易签名得出发件人地址。 这就是除 TxTypeLegacyTransaction 外，Kaia 交易类型都有 "from "字段的原因。 在 Kaia 中，为了验证交易，需要获取 `from` 的 [AccountKey](../accounts.md#account-key) 并使用获取的密钥验证交易签名。

### 收费代表团<a id="fee-delegation"></a>

为使企业在设计业务模式时具有必要的灵活性，Kaia 为其基本交易类型提供了许多收费授权版本。 这些变体使服务提供商能够通过支付交易费来补贴其最终用户活动。 通过使用带有比率参数的交易，可进一步细化交易费用补贴，让服务提供商指定他们将承担的费用百分比。 费用委托交易至少需要两个签名：一个来自发件人，另一个来自费用支付人。

### SenderTxHash <a id="sendertxhash"></a>

SenderTxHash 是交易的哈希值，不含缴费人的地址和签名。 在费用支付方签署交易之前，尚未确定费用委托交易的交易哈希值。 要跟踪收费委托交易，发送方应获取从完整交易中提取的交易哈希值，其中包含发送方和收费方的签名。 由于发送方很难获取交易哈希值，Kaia 除了提供交易哈希值外，还提供了发送方哈希值（SenderTxHash）。 要在 Kaia 网络中找到完整的收费委托交易，发送方生成 SenderTxHash，并通过 [kaia_getTransactionBySenderTxHash](../../references/json-rpc/klay/get-transaction-by-sender-tx-hash/) 请求交易对象。 如何获取 SenderTxHash 取决于每种交易类型，这在每种交易类型的描述中都有说明。

每种交易类型都有详细说明：

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
