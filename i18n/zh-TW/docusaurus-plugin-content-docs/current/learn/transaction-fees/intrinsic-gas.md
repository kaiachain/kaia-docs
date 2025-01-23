# 內在氣體

氣體是 "內在氣體 "和 "執行氣體 "的總和。 在這裡，我們將重點討論 "IntrinsicGas "是如何組織的。

:::note

與內在氣體相關的硬叉變化可在本頁底部找到。 轉到 [Hardfork Changes](#hardfork-changes)。

:::

## 概述

交易的 "內在氣體 "可以通過將下面四個因素相加來計算。

```
內在氣體成本 = KeyCreationGas + KeyValidationGas + PayloadGas + TxTypedGas
```

- PayloadGas "根據 tx 中數據字段的大小計算。
- 當事務註冊新鍵時，會計算 `KeyCreationGas` 值。 僅適用於 "賬戶更新 "事務。
- KeyValidationGas "根據簽名數量計算。
- TxTypedGas "是根據交易類型定義的。

在瞭解細節之前，請記住並非所有鍵類型都應用了 keyGas（"KeyCreationGas "和 "KeyValidationGas"）。

| 鑰匙類型     | 這些關鍵氣體適用嗎？ |
| :------- | :--------- |
| 無        | 沒有         |
| 傳統       | 沒有         |
| 失敗       | 沒有         |
| 公眾       | 是          |
| MultiSig | 是          |
| 基於角色     | 取決於角色的關鍵類型 |

## KeyCreationGas <a id="keycreationgas"></a>

KeyCreationGas 的計算公式為 `（註冊密鑰數） x TxAccountCreationGasPerKey (20000)`。\
請注意，公鑰類型始終只有一個註冊密鑰，因此氣體始終為 20000。

## KeyValidationGas <a id="keyvalidationgas"></a>

KeyValidationGas "的計算公式為"（簽名數 - 1）x TxValidationGasPerKey(15000)"。\
請記住，公鑰類型始終只有一個簽名密鑰，因此氣體始終為零。

Kaia 交易也可以有一個付費者，因此總的 KeyValidationGas 是這樣的。

```
KeyValidationGas = (KeyValidationGas for a sender) + (KeyValidationGas for a feePayer)
```

## PayloadGas <a id="payloadgas"></a>

基本上，"PayloadGas "是按 "輸入字節數 x TxDataGas (100) "收費的。

如果是創建交易合同，則需支付 "Initcode 的字數 x InitCodeWordGas (2) "的額外費用。 自上海硬分叉以來，它一直有效。

## TxTypedGas <a id="txtypedgas"></a>

klaytn 有三種交易類型："基本"、"費用委託 "和 "費用委託與費用比率"。

例如

- TxTypeValueTransfer 是 valueTransaction 事務的 "基本 "類型。
- TxTypeFeeDelegatedValueTransfer 是 valueTransfer 交易的 "feeDelegated "類型。
- TxTypeFeeDelegatedValueTransferWithRatio 是valueTransfer 交易的 "feeDelegatedWithRatio "類型。

這在計算 TxTypedGas 時非常重要：

- 首先，檢查 TxType 是否為 "feeDelegated "或 "feeDelegatedWithFeeRatio"。
  - 如果 TxType 為 "委託收費"，則在 TxTypedGas 中添加 "TxGasFeeDelegated(10000)"。
  - 如果 TxType 為 "feeDelegatedWithFeeRatio"，則在 TxTypedGas 中添加 "TxGasFeeDelegatedWithRatio (15000)"。
- 第二，檢查交易是否創建了合同。
  - 如果交易創建了合同，則在 TxTypedGas 中添加 `TxGasContractCreation (53000)`。
  - 否則，在 TxTypedGas 中添加 `TxGas (21000)`。

例如

- 如果是 legacyTransaction 並創建了合約，TxTypedGas 將是 `0 + TxGasContractCreation(53000)`。
- 如果是 TxTypeFeeDelegatedValueTransfer，TxTypedGas 將是 `TxGasFeeDelegated(10000) + TxGas (21000)`
- 如果是 TxTypeFeeDelegatedSmartContractDeployWithRatio，則 TxTypedGas 將是 `TxGasFeeDelegatedWithRatio (15000) + TxGasContractCreation (53000)` 。

## 硬叉變化

| 硬叉        | 改變                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 上海 EVM    | 計算本徵氣體時的限制和儀表初始代碼<br/>- 開始每字初始代碼添加 2 個氣體                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 伊斯坦布爾 EVM | make the [PayloadGas](#payloadgas) of legacyTxType consistent with other TxTypes<br/>- Before: PayloadGas=number_of_zero_bytes_of_tx_input x 4 + number_of_nonzero_bytes_of_tx_input x 68 <br/> - After: PayloadGas=number_of_bytes_of_tx_input x 100<br/><br/>change [keyValidationGas](#keyvalidationgas) calculation logic<br/>- Before: KeyValidationGas=(number of keys - 1) x 15,000<br/>- After: KeyValidationGas=(number of signatures - 1) x 15,000 |
