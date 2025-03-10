# 内在气体

气体是 "内在气体 "和 "执行气体 "的总和。 在这里，我们将重点讨论 "IntrinsicGas "是如何组织的。

:::note

与内在气体相关的硬叉变化可在本页底部找到。 转到 [Hardfork Changes](#hardfork-changes)。

:::

## 概述

交易的 "内在气体 "可以通过将下面四个因素相加来计算。

```
内在气体成本 = KeyCreationGas + KeyValidationGas + PayloadGas + TxTypedGas
```

- PayloadGas "根据 tx 中数据字段的大小计算。
- 当事务注册新键时，会计算 `KeyCreationGas` 值。 仅适用于 "账户更新 "事务。
- KeyValidationGas "根据签名数量计算。
- TxTypedGas "是根据交易类型定义的。

在了解细节之前，请记住并非所有键类型都应用了 keyGas（"KeyCreationGas "和 "KeyValidationGas"）。

| 钥匙类型     | 这些关键气体适用吗？ |
| :------- | :--------- |
| 无        | 没有         |
| 传统       | 没有         |
| 失败       | 没有         |
| 公众       | 是          |
| MultiSig | 是          |
| 基于角色     | 取决于角色的关键类型 |

## 钥匙创造气体<a id="keycreationgas"></a>

KeyCreationGas 的计算公式为 `（注册密钥数） x TxAccountCreationGasPerKey (20000)`。\
请注意，公钥类型始终只有一个注册密钥，因此气体始终为 20000。

## 密钥验证气体<a id="keyvalidationgas"></a>

KeyValidationGas "的计算公式为"（签名数 - 1）x TxValidationGasPerKey(15000)"。\
请记住，公钥类型始终只有一个签名密钥，因此气体始终为零。

Kaia 交易也可以有一个付费者，因此总的 KeyValidationGas 是这样的。

```
KeyValidationGas = (KeyValidationGas for a sender) + (KeyValidationGas for a feePayer)
```

## PayloadGas<a id="payloadgas"></a>

基本上，"PayloadGas "是按 "输入字节数 x TxDataGas (100) "收费的。

如果是创建交易合同，则需支付 "Initcode 的字数 x InitCodeWordGas (2) "的额外费用。 自上海硬分叉以来，它一直有效。

## TxTypedGas<a id="txtypedgas"></a>

klaytn 有三种交易类型："基本"、"费用委托 "和 "费用委托与费用比率"。

例如

- TxTypeValueTransfer 是 valueTransaction 事务的 "基本 "类型。
- TxTypeFeeDelegatedValueTransfer 是 valueTransfer 交易的 "feeDelegated "类型。
- TxTypeFeeDelegatedValueTransferWithRatio 是valueTransfer 交易的 "feeDelegatedWithRatio "类型。

这在计算 TxTypedGas 时非常重要：

- 首先，检查 TxType 是否为 "feeDelegated "或 "feeDelegatedWithFeeRatio"。
    - 如果 TxType 为 "委托收费"，则在 TxTypedGas 中添加 "TxGasFeeDelegated(10000)"。
    - 如果 TxType 为 "feeDelegatedWithFeeRatio"，则在 TxTypedGas 中添加 "TxGasFeeDelegatedWithRatio (15000)"。
- 第二，检查交易是否创建了合同。
    - 如果交易创建了合同，则在 TxTypedGas 中添加 `TxGasContractCreation (53000)`。
    - 否则，在 TxTypedGas 中添加 `TxGas (21000)`。

例如

- 如果是 legacyTransaction 并创建了合约，TxTypedGas 将是 `0 + TxGasContractCreation(53000)`。
- 如果是 TxTypeFeeDelegatedValueTransfer，TxTypedGas 将是 `TxGasFeeDelegated(10000) + TxGas (21000)`
- 如果是 TxTypeFeeDelegatedSmartContractDeployWithRatio，则 TxTypedGas 将是 `TxGasFeeDelegatedWithRatio (15000) + TxGasContractCreation (53000)` 。

## 硬叉变化

| 硬叉        | 改变                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 上海 EVM    | 计算本征气体时的限制和仪表初始代码<br/>- 开始每字初始代码添加 2 个气体                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 伊斯坦布尔 EVM | 使 legacyTxType 的 [PayloadGas](#payloadgas) 与其他 TxType 一致<br/>- 之前：PayloadGas=number_of_zero_bytes_of_tx_input x 4 + number_of_nonzero_bytes_of_tx_input x 68<br/> - After：PayloadGas=number_of_bytes_of_tx_input x 100<br/><br/>更改 [keyValidationGas](#keyvalidationgas) 计算逻辑<br/>- Before：KeyValidationGas=(number of keys - 1) x 15,000<br/>- After：KeyValidationGas=(number of signatures - 1) x 15,000 |

