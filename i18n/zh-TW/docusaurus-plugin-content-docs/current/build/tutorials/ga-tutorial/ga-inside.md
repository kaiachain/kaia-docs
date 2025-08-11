# 2. GA 如何運作：技術深究

本節提供詳細的技術概述，說明 Gas Abstraction 如何在 Kaia 網路中運作，包括交易捆绑、原子性和關鍵元件的角色。

## 2.1 架構概述

GA 建立在分散式架構上，利用智慧型契約與交易捆綁，確保使用者體驗的無縫性。

### 主要元件

- **[KIP-247（無氣交易）](https://kips.kaia.io/KIPs/kip-247):** 定義網路識別為符合氣體抽象資格的特定交易格式 (`GaslessApproveTx`、`GaslessSwapTx`)。
- **[KIP-245（Transaction Bundle）](https://kips.kaia.io/KIPs/kip-245)：** 保證必要的交易順序（借出、核准、交換）在**體上**執行-它們不是全部成功，就是全部一起失敗。
- **[GaslessSwapRouter（GSR）](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol):** 核心智慧契約，可執行代幣與 KAIA 的交換，並向區塊提案者償還初始瓦斯貸款，一切都在同一區塊內完成。

### 主要演員

下圖說明 GA 流程中的主要參與者及其互動關係：

![](/img/build/tutorials/ga1.png)

- **錢包**：啟動無瓦斯交易的使用者錢包或 dApp 介面。
- **使用者帳戶**：啟動無瓦斯交易的錢包或 dApp 使用者。
- \*\* 區塊提案者\*\*：提出區塊的節點，暫時借出 KAIA 以支付瓦斯費。
- **GaslessSwapRouter (GSR)**：處理交換和還款邏輯的智慧型契約。
- **DEX 路由器**：執行實際代幣交換的底層分散式交易所。

## 2.2 交易包元件

GA 透過**交易捆綁**運作，區塊鏈用戶端僅將\***LendTx + (可選) ApproveTx + SwapTx** 組成一個原子捆綁。 這三個要麼都成功，要麼都失敗。 在捆綁之後立即傳送的任何 **AppTx** 都是在捆綁之外，可以獨立還原。

![](/img/build/tutorials/ga2.png)

### LendTx (借貸交易)

- **簽署人**：區塊提案人
- **目的**：暫時將 KAIA 借給使用者以支付瓦斯費
- **創建**：在區塊建構過程中 [動態產生](https://github.com/kaiachain/kaia/blob/v2.0.3/kaiax/gasless/impl/getter.go#L267)
- **金額**：計算為 ApproveTx + SwapTx 的瓦斯費用

### ApproveTx (核准交易) - 選項

- **簽署人**：使用者
- **目的**：批准 GaslessSwapRouter 的 ERC-20 代幣支出
- **需要時**：如果使用者先前未核准代碼
- \*\* 格式\*\*：必須遵循 [KIP-247 規格](https://kips.kaia.io/KIPs/kip-247)

### SwapTx (掉期交易)

- **簽署人**：使用者
- **目的**：將使用者代幣交換成 KAIA 並償還給提案者
- **合約**：呼叫 [GaslessSwapRouter.sol](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)
- **驗證**：確保 `amountReceived >= minAmountOut >= amountRepay`.

## 2.3 原子性與故障處理

**KIP-245 綑綁特性：**

- \*\* 全有或全無的執行\*\*：如果任何交易失敗，整個 bundle 將回復
- \*\* 超時豁免\*\*：綑綁程式不受每區塊 250ms 執行限制的約束
- \*\* 狀態回滾\*\*：失敗的 bundle 會觸發完整的狀態回復

\*\* 常見故障情況：\*\*

- 代幣餘額不足 → 捆綁回復，無瓦斯損失
- 超出價格滑移 → SwapTx 失敗，捆綁還原
- 遺失代用幣核准 → 驗證失敗，交易仍留在池中

## 2.4 網路層級處理

\*\* 交易池驗證\*\*

無瓦斯交易可繞過交易池中的正常餘額檢查。 驗證邏輯會偵測無瓦斯交易，並跳過瓦斯費的帳戶餘額檢查。

**促銷與捆綁邏輯**

- 如果沒有對應的 GaslessSwapTx，則無法升級 GaslessApproveTx
- 如果代幣已通過認證，GaslessSwapTx 可獨立升級
- 當兩個交易都存在時，會同時促進兩個交易

**封鎖提案者的注入與執行**

區塊提案者偵測到無瓦斯交易時，會自動注入 LendTx。 LendTx 在區塊產生時即時建立，並置於使用者的無瓦斯交易之前。

## 2.5 平衡變更的工作流程範例

讓我們來看看使用者有 `1.00 BORA` 和 `0 KAIA` 的情況。

| 步驟                                        | 行動                                                           | 提案人餘額                          | 使用者餘額                                                    | 注意事項                                                     |
| :---------------------------------------- | :----------------------------------------------------------- | :----------------------------- | :------------------------------------------------------- | :------------------------------------------------------- |
| 1. 初始              | -                                                            | 10.00 KAIA     | 0.00 Kaia, 1.00 Bora     | 使用者要為 tx 付費。                                             |
| 2. **`LendTx`**    | 提案人借出 0.02 KAIA。                             | 9.97 KAIA      | 0.02 Kaia, 1.00 Bora     | 投標者自行支付瓦斯費用。                                             |
| 3. **`ApproveTx`** | 使用者為 GSR 核准 BORA。                                            | 9.97 KAIA      | 0.01 kaia, 1.00 bora     | 瓦斯 (0.01 KAIA) 由貸款支付。 |
| 4. **`SwapTx`**    | 使用者以 0.06 BORA 交換 0.04 KAIA。 | **10.00 KAIA** | **0.01 kaia**, 0.94 bora | 投標者將獲補償 0.03 KAIA。                       |
| 5. **`AppTx`**     | 使用者執行他們的主 tx。                                                | 10.00 KAIA     | 0.00 Kaia, 0.94 Bora     | 用 KAIA 交換的汽油支付。                                          |
