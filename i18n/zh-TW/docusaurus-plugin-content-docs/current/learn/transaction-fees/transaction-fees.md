# 交易費用

一次交易的交易費計算如下：

```text
燃氣費 := (使用的燃氣) x (有效燃氣價格)
```

打個簡單易懂的比方，假設你正在加油站加油。 Gas 價格每天由煉油廠決定，今天的價格是 2 美元。 如果裝滿 15 升，則需支付 30 美元 = 15 升 x 2 美元/1 升，30 美元將從您的銀行賬戶中支付。 此外，這筆交易還將記錄在賬簿中。

交易費與上述相同。 假設一筆交易花費了 21000 天然氣，交易的實際Gas 價格為 25 格基。 那麼汽油費就是 525000 格基。 這筆金額將從匯款人（"來自 "賬戶）的餘額中扣除。

## 使用的氣體<a id="gas-used"></a>

改變區塊鏈狀態的每個操作都需要氣體。 在處理區塊中的交易（如發送 KAIA、使用 ERC-20 代幣或執行合約）時，發送方必須支付計算和存儲使用費。 支付金額由所需的 "氣體 "數量決定。 煤氣沒有單位，我們只能說 "21000 煤氣"。

交易氣體由兩部分組成：

- 本徵氣體 "是根據事務主體本身（如輸入的大小）靜態收取的氣體。 更多詳情，請參閱 [本徵氣體](intrinsic-gas.md)。
- 執行氣體 "是在執行過程中動態計算得出的氣體。 更多詳情，請參閱 [執行氣體](execution-gas.md)。

用氣量只有在交易執行後才能確定。 因此，您可以從交易收據中找到已用燃氣量。

### 找到合適的氣體限值

每筆交易都必須指定一個 gasLimit（氣體限值），即交易可花費的最大氣體量。 發送方還可以使用 `eth_estimateGas` 和 `kaia_estimateGas` RPC 為交易找到合適的 gasLimit。 或者，發件人也可以手動指定一個足夠大的數字。 指定高 gasLimit 不會自動收取高 gas 費，因此使用固定數字是一個可行的選擇。 但是，只有少量代幣的發件人不能指定過高的 gasLimit，因為無論實際 gasUsed 為多少，發件人的餘額中都必須至少擁有 `gasLimit * effectiveGasPrice` 。

## 有效Gas 價格<a id="effective-gas-price"></a>

交易的有效氣價由許多變量計算得出：

- 硬叉水平
- 發件人提交的交易中的Gas 價格字段
  - 第 2 類交易中存在 "maxFeePerGas"（通常稱為 feeCap）字段。
  - 第 2 類交易中存在 "maxPriorityFeePerGas"（通常稱為 tipCap）字段。
  - 氣體價格 "字段存在於所有其他交易類型中。
- 交易執行區塊的 "baseFeePerGas"（通常稱為 "baseFee"）。

### 岩漿硬叉前（固定單價）

在 Magma 硬分叉之前，所有交易的交易費都是固定值，稱為 "unitPrice"。 該單價可通過管理進行調整。 所有交易必須提交等於當前單價的氣體價格字段。 單價機制避免了用戶在燃氣費拍賣市場中因燃氣價格估算而產生的用戶體驗挫敗感，並使服務提供商能夠輕鬆預測燃氣費預算。

可以通過 `kaia_getParams` API 找到指定區塊的 `unitPrice` 值。

### 岩漿硬叉後（KIP-71 動態基費）

自 Magma 硬分叉以來，網絡會根據網絡擁堵情況決定每個區塊的Gas 價格值 "baseFeePerGas"（或簡稱 baseFee）。 如果交易流量高於閾值，基本費就會增加，反之則會減少。 交易流量以使用的區塊氣體來衡量。 隨著區塊中交易執行量的增加，網絡會感到更擁堵，從而有可能提高基本費用。

與 [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)不同的是，岩漿氣體政策沒有提示（提示是從 Kaia 硬叉開始引入的）。 取而代之的是 FCFS（先到先服務）政策，以保護網絡免受垃圾郵件的侵害。

#### 基本收費計算

基本費用的計算取決於以下參數：

- 區塊擁塞數據
  - 上一個基費：上一個區段的基本收費
  - previous_block_gas_used：用於處理上一個區塊所有交易的氣體
- 可在以後通過治理更改的調諧參數
  - GAS_TARGET（目標氣量）：決定基本費用增減的氣體量
  - max_block_gas_used_for_base_fee：用於執行基費最大變化率的隱式塊氣體限制。
  - BASE_FEE_DENOMINATOR: 設置每個區塊最大基本費用變動的值
  - 基本費用上限：基本費用的最大值
  - 基本費用下限值：基本費用的最小值

以下是基礎費用計算的簡化版本。 就其本質而言，基本費用的變化與 GAS_TARGET 和 PREVIOUS_BLOCK_GAS_USED 之間的差異成正比，其他參數則控制基本費用的變化速度或界線。 準確公式請參閱 [KIP-71](https://github.com/kaiachain/kips/blob/main/KIPs/kip-71.md)。

```
              min(PREVIOUS_BLOCK_GAS_USED, MAX_BLOCK_GAS_USED_FOR_BASE_FEE) - GAS_TARGET
changeRate = ----------------------------------------------------------------------------
                                BASE_FEE_DENOMINATOR * GAS_TARGET

nextBaseFeeBeforeBound = PREVIOUS_BASE_FEE * (1 + changeRate)

nextBaseFee = max(min(nextBaseFeeBeforeBound, UPPER_BOUND_BASE_FEE), LOWER_BOUND_BASE_FEE)
```

可通過 `kaia_getParams` API 查找特定區塊的調諧參數。 每個區塊的 "baseFeePerGas "可通過 "kaia_getBlock\*"和 "eth_getBlock\*"API 找到。

#### 燃氣費燃燒

由於岩漿硬叉，區塊氣體費用的一半會被燒掉。 詳見 [KIP-71](https://github.com/kaiachain/kips/blob/main/KIPs/kip-71.md)。

由於 Kore 硬叉，大部分塊狀氣體費用都被燒掉了。 詳見 [KIP-82](https://kips.kaia.io/KIPs/kip-82)。

### Kaia 硬叉子之後（KIP-162 優先權費用）

自 Kaia 硬分叉以來，交易可以指定非零的優先級費用（或簡單的小費），以增加區塊包含的可能性。 Kaia 天然氣政策與 [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)類似，交易支付基本費用和有效小費。

交易的有效氣價定義為 "min(baseFee + tipCap, feeCap)"。 對於類型 2 交易，交易字段 `maxPriorityFeePerGas` 和 `maxFeePerGas` 自然就變成了 tipCap 和 feeCap。 但是，其他交易類型只有一個 "gasPrice "字段。 對於這些類型，tipCap 和 feeCap 都等於 "gasPrice"。 因此，其有效Gas 價格變為 `min(baseFee + tipCap, feeCap) = min(baseFee + gasPrice, gasPrice) = gasPrice`，這與Gas 價格拍賣機制相同。

詳見 [KIP-162](https://github.com/kaiachain/kips/blob/main/KIPs/kip-162.md)。

### 在卡伊婭之後找到合適的Gas 價格

如果您的應用程序或錢包使用 2 類交易（EIP-1559 類型），請確保您設置了合理的優先權費用。 您還可以調用 `eth_maxPriorityFeePerGas` RPC 來檢索建議的優先級費用 (tx.maxPriorityFeePerGas)。 在網絡不擁堵的情況下，零優先權費交易在交易處理中應不會處於劣勢。 當網絡擁堵時，指定一個非零的優先級費用來與其他交易競爭會更安全。

Kaia 節點的 "eth_maxPriorityFeePerGas "RPC 應：

- 如果網絡沒有擁塞，則返回 0。 當下一個基準每氣收費等於 UPPER_BOUND_BASE_FEE 時，網絡被視為不擁堵。
- 否則返回最近 N 個區塊中交易的 P 百分位有效優先級費用。 Kaia 節點的默認設置為 P=60 和 N=20，但各節點的配置可能不同。

類型 2 交易的 "maxFeePerGas "應高於網絡的下一個基本費用，以確保即使基本費用上漲，交易也能得到處理。 常用的公式是 "最後基本費用\*2 + 最大優先級每氣費用"。 當 BASE_FEE_DENOMINATOR 為 20 時，baseFee 至少需要 15 秒才能翻倍。 另一種方法是使用 `eth_gasPrice` RPC。

對於其他 tx 類型的交易，在選擇合適的 "gasPrice "時應更加謹慎。 因為對於這些 tx 類型，無論基礎費用是多少，gasPrice 都是按原價使用的。 另一方面，gasPrice 必須至少等於網絡的基本費用。 因此，應用程序和用戶應避免將 gasPrice 設置得過高，同時與網絡的基本費用相匹配。 一種策略是將 "Gas 價格 "設置得比下一個基本費用略高，這樣就可以容納幾次基本費用的上漲。 您可以調用 `eth_gasPrice` RPC 來檢索推薦的Gas 價格。

Kaia 節點的 "eth_gasPrice "RPC 應：

- 返回 (下一個基本費用) \* M + (eth_maxPriorityFeePerGas). 在網絡不擁堵的情況下，乘數 M 的啟發式選擇為 1.10，在網絡擁堵的情況下為 1.15。 當 BASE_FEE_DENOMINATOR 為 20 時，M=1.10 可以承受至少一次基本費上調（1.05），M=1.15 可以承受至少兩次連續的基本費上調（1.05\*1.05）。 考慮到基本費通常不會以最高 5%的速度增長，乘數實際上應該足夠基本費增長几次。

### Gas 價格摘要

| 硬叉   | 燃氣價格 "要求                        | 最大每氣收費 "要求                             | 最大優先級每氣收費 "要求                                           | 計算出的 "有效氣價                                                                      |
| ---- | ------------------------------- | -------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 岩漿之前 | 必須是單位價格                         | 必須是 unitPrice<br/> （僅在 EthTxType 分叉後）。 | 必須是 unitPrice<br/> （僅在 EthTxType 分叉後）。                  | 單位價格                                                                            |
| 岩漿之後 | 至少基費<br/> （建議：2\*基費）            | 至少基費<br/> （建議：2\*基費）                   | 被忽視                                                     | 基本費用                                                                            |
| 凱婭之後 | 至少基本費用<br/> （建議：基本費用\*M + 建議小費） | 至少基本費用<br/> （建議：基本費用\*2 + 建議小費）        | 可達用戶、錢包和 SDK<br/> （建議：supposedTip = 0 或 N 個區塊中的 P 百分位數） | tx 類型 2：min(baseFee + feeCap, tipCap)，<br/>其他 tx 類型：gasPrice |
