# Kaia MEV 拍賣 SDK 搜尋者指南

[Kaia v2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0) 推出 MEV Auction 系統，讓搜尋者能參與公平、透明的 MEV 機會拍賣。 本指南提供使用 Kaia MEV Auction SDK 的搜尋器工作流程的全面演練。

:::info

本指南使用 Kairos 測試網路端點和合約位址。 主網路預計於 2025 年 12 月中推出。 部署到主網路時，請相應更新所有端點和合約位址。

:::

搜尋器工作流程包含四個主要步驟：

![](/img/build/tutorials/searcher-guide-1.png)

1. **存款**：搜尋者將 KAIA 代幣存入`AuctionDepositVault`以資助競標活動
2. **出價**：搜尋者向拍賣官提交密封的競標書，以競逐回力賽時段。
3. **提交中標**：拍賣官會選出贏家，並將贏得的出價轉寄給 Consensus 節點 (CN)。
4. \*\* 執行中標交易\*\*：CN 透過「AuctionEntryPoint」合約執行中標交易

詳細技術背景請參閱 [KIP-249](https://kips.kaia.io/KIPs/kip-249)。

## 先決條件

開始之前，請確保您已

- 用 KAIA 代幣存款的資金皮夾
- 已安裝 [Go](https://golang.org/) (1.25 版以上) 以取得 SDK 範例
- 存取 Kaia 網路端點 (本指南使用 Kairos testnet)
- (可選）已安裝 [Foundry](https://getfoundry.sh/) (用於 `cast` 指令)

**網路端點：**

- Kairos (testnet)：`https://public-en-kairos.node.kaia.io`
- 主網絡：`https://public-en.node.kaia.io`

**合約地址（Kairos）：**

- AuctionFeeVault: `0xE4e7d880786c53b6EA6cfA848Eb3a05eE97b2aCC`
- AuctionDepositVault: `0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc`
- AuctionEntryPoint: `0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480`

如需主網路合約地址 (主網路啟動後可用)，請檢查 [合約地址](../../references/contract-addresses.md)。

:::tip[Monitor MEV 商機]

搜尋者可透過以下方式識別有利可圖的交易

- **訂閱拍賣商的待定交易 API**：此 API 可直接從 Consensus 節點串流交易，讓您即時偵測 MEV 機會。 請參閱下面的 [訂閱待處理交易](#step-3-subscribe-to-pending-transactions) 章節。
- \*\* 獨立監控網路 mempool\*\*：透過訂閱待定 tx 來實作您自己的 MEV 機會偵測邏輯。

:::

## 步驟 1：存入資金

![](/img/build/tutorials/searcher-guide-2.png)

AuctionDepositVault 儲存您的競投餘額。 您的保證金必須涵蓋您的出價金額和執行出價的預估瓦斯費。

### 瞭解存款要求

您的押金餘額必須包括

- **出價金額**：您願意為贏得拍賣而支付的 KAIA
- \*\* 估計瓦斯費\*\*：執行競標期間所消耗的瓦斯（在執行後扣除，並發送給整批提案者）

:::warning[Always 維持足夠的存款餘額]

如果您的餘額不足以支付競投金額加上預估的瓦斯費用，您的競投將會被拍賣官在確認時拒絕。

:::

### 存款方法

合約提供兩種存款方式：

**方法 1: `deposit()`**

使用寄件者的餘額存款。 存款會存入寄件者的帳戶。

```bash
# Deploy deposit of 200 KAIA
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "deposit()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

**方法 2：`depositFor(位址搜尋器)`**\*

代表另一個帳戶存款。 有助於從單一來源為多個搜尋器地址提供資金。

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositFor(address)" <SEARCHER_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

### 檢查您的餘額

查詢您目前的存款餘額：

```bash
cast call 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositBalances(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
```

詳細的存款範例，請參閱 [DEPOSIT.md guide](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/DEPOSIT.md)。

## 步驟 2：提交出價

![](/img/build/tutorials/searcher-guide-3.png)

一旦發現有利可圖的交易，請向拍賣官提交出價。 出價是密封的（在拍賣結束前隱藏），並根據出價金額進行競爭。

### 投標架構

出價由下列欄位組成 (如 [types.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/types.go) 所定義)：

```go
type AuctionBid struct {
    TargetTxRaw  []byte         // Raw transaction bytes of target tx
    TargetTxHash common.Hash    // Transaction to backrun
    BlockNumber  *big.Int       // Target block number
    Sender       common.Address // Your searcher address
    To           common.Address // Contract to call
    Nonce        uint64         // Current nonce from AuctionEntryPoint
    Bid          *big.Int       // Your bid in KAIA
    CallGasLimit uint64         // Gas limit for your backrun logic
    Data         []byte         // Encoded function call
    SearcherSig  []byte         // EIP-712 signature from searcher
}
```

:::info

在您提交出價之後，拍賣官會驗證並加入自己的簽章 (`AuctioneerSignature`)，然後才會將中標出價轉寄給 Consensus 節點。 您只需要提供 `SearcherSig` (您的 EIP-712 簽章)。

:::

### 提交投標

SDK 在 [`example/submitbid.go`](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) 提供了一個完整的工作範例。 範例說明：

- 與拍賣官建立 HTTPS 連線
- 從 EN 端點偵測新區塊
- 產生目標交易和相對應的出價
- 向拍賣官提交出價

\*\* 必須採取的行動\*\*：執行程式碼前，請先在程式碼中更換您的私人密碼匙。 檢查原始碼中的「TODO:」註解。

執行範例：

```bash
# From repository root
go run example/submitbid.go
```

### 出價驗證

拍賣商、投標者和智慧型契約各自對出價執行特定的驗證檢查。 主要驗證規則包括

- \*\* 區塊號碼\*\*：必須是 currentBlockNumber + 1 或 currentBlockNumber + 2
- \*\* 出價金額\*\*：必須大於 0 且小於或等於您的可用存款餘額
- **呼叫資料大小**：不得超過 `BidTxMaxDataSize` (64KB)
- **呼叫瓦斯限制**：不得超過 `BidTxMaxCallGasLimit` (10,000,000)
- **Nonce**：必須符合您目前在 `AuctionEntryPoint` 中的 nonce。 查詢它：
  ```bash
  cast call 0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480 "nonces(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
  ```
- \*\* 簽署\*\*：必須是有效的 EIP-712 簽署（執行方式請參閱 [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go)
- **保證金保障**：必須有足夠的保證金支付`出價金額 + 預估瓦斯費`。
- \*\* 唯一性\*\*：同一區塊中不能有另一個中標（除非針對同一筆交易）
- **拍賣官簽名**：必須有效（由拍賣官在您提交後添加）

如需完整的驗證矩陣，顯示哪些實體執行哪些檢查，請參閱 [投標驗證指南](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/bid_validation.md)。

## 步驟 3：訂閱待決交易

![](/img/build/tutorials/searcher-guide-4.png)

Auctioneer 提供 WebSocket 訂閱服務，可直接從 Consensus 節點串流待處理的交易。 這可讓搜尋人員即時偵測到 MEV 機會。

SDK 在 [example/subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go) 中提供了一個完整的範例。

範例說明：

- 建立與拍賣官的 WebSocket 連線
- 訂閱待處理交易串流
- 處理收到的交易以找出 MEV 機會

執行範例：

```bash
# From repository root
go run example/subscribe_pendingtx.go
```

當偵測到待處理交易時，訂閱會持續列印交易切細值。 您可以擴充本範例以實作您自己的 MEV 檢測邏輯。

## 步驟 4：了解執行

當您的出價獲勝時，Consensus Node 會透過 `AuctionEntryPoint` 契約執行：

![](/img/build/tutorials/searcher-guide-1.png)

### 執行流程

執行過程包含三個階段：

1. **驗證階段**：合約驗證區塊號碼、簽名、nonce 和投標金額
2. **出價付款階段**：從您的訂金中扣除出價金額，並傳送至生態系統基金
3. **執行階段**：您的 backrun 由 EntryPoint 合約執行（無論執行結果如何，都會進行出價付款）

\*\* 主要安全功能：\*\*

- 驗證員代表您執行出價（防止還原出價以逃避付款）
- Nonce 增量可防止重播攻擊
- 雙重簽名 (搜尋員 + 拍賣員) 未經授權的出價取代或操控
- 無論後續執行結果如何，出價付款都會發生

詳細執行流程請參閱 [ENTRYPOINT.md guide](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/ENTRYPOINT.md)。

## 步驟 5：提取資金

![](/img/build/tutorials/searcher-guide-5.png)

提款需要經過鎖定期的兩個步驟：

### 1. 提取儲備

啟動提款並開始 60 秒鎖定時間：

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "reserveWithdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

### 2. 完全退出

60 秒後，轉移預留金額：

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "withdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

:::info[Security 附註］

鎖定期的兩步提款程序：

- 防止在有效拍賣期間閃存退出
- 確保搜尋者遵守出價，以維持協議的完整性
- 防範快速資本操控攻擊

:::

## API 參考資料

Auctioneer 為搜尋者提供兩個主要的 API：

**1. 提交投標 API**

- **端點**：POST /api/v1/auction/send
- **目的**：提交 MEV 機會的密封標書

**2. 待處理交易訂閱**

- **端點**：GET /api/v1/subscriber/pendingtx
- **目的**：來自共識節點的待處理交易即時串流
- **範例**：請參閱 [subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go) 中的實作範例。

**完整的 API 文件：**

- OpenAPI (Swagger) 規格可在以下網址取得：
  - **Kairos**: https://auctioneer-kairos.kaia.io/docs
  - **主網路**：主網推出後可用
- API 使用方式：[API 文件](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/api_doc.md)

## 疑難排解

### 常見問題

| 問題類別            | 症狀        | 原因                                                    | 解決方案                                                                                                                                    |
| --------------- | --------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **餘額不足**        | 被拍賣官拒絕的出價 | 押金餘額不包括出價金額 + 預估汽油費                                   | 使用 `depositBalances()` 檢查餘額，並存入更多 KAIA                                                                                                  |
| **Nonce 錯配**    | 投標被拒或執行失敗 | Nonce 與 `AuctionEntryPoint` 中的目前 nonce 不相符            | 在每次出價前使用 `nonces()` 查詢目前的 nonce。 請記住：nonces 只會在執行時遞增，不會在提交時遞增。                                                                          |
| \*\* 區塊號碼範圍\*\* | 被拍賣官拒絕的出價 | 目標區塊超出允許範圍`[current+1, current+allowFutureBlock]`     | 確保區塊號碼在範圍之內（通常為 +1 或 +2）。 有關雙重提交策略，請參閱常見問題                                                                                              |
| \*\* 無效簽名\*\*   | 被拍賣官拒絕的出價 | 不正確的 EIP-712 簽名結構                                     | 驗證網域分隔符和類型切細值。 請參考 [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) 以取得正確的執行方式 |
| \*\* 氣體限制問題\*\* | 執行失敗或出價被拒 | CallGasLimit」過低或超過最大值 (10,000,000) | 在 testnet 上測試 backrun 邏輯，以測量實際瓦斯消耗量                                                                                                     |

## 常見問題

### 訂閱

\*\*問：每個搜尋者允許多少個並發連線？

答：每個搜尋者位址只允許一個待處理交易訂閱連線。

\*\*問：訂閱連線的有效期為多久？

答：連線會在 24 小時後自動關閉。 請注意，如果正在進行滾動更新，連線可能會提前於 24 小時關閉。

### API 效能與延遲

\*\*問：在提交出價時，如何盡量減少 API 延遲？

答：拍賣官使用 HTTPS 通訊協定的 L7 負載平衡器。 初始握手耗費的時間取決於網路狀態。 若要在傳送後續出價 API 時繞過這個初始延遲，強烈建議建立保持連線。

\*\*問：我應該注意 API 的速率限制嗎？

答：為了避免被 Auctioneer API 伺服器封鎖，請不要在短時間內傳送太多次 `ping` API。

\*\*問：地理位置是否會影響延遲？

答：是的。 Auctioneer 伺服器在 GCP KR (Seoul) 區域執行。 建議您將基礎結構託管在地理位置接近的區域，以盡量減少延遲並降低地理延遲。

### 出價時間與區塊目標

\*\*問：為什麼我的出價有時會瞄準錯誤的區塊號碼？

答：您提交出價的時間對 CN（共識節點）的開採時間高度敏感。 如果拍賣開始得較晚（接近挖礦時間），出價交易會插入下一個區塊之後（區塊號碼 +2 而不是 +1）。 這表示您應該將目標區塊號碼設定為 +2。

\*\*問：如何提高我的出價包含率？

答：目標區塊編號本質上對 CN 挖礦時間表很敏感：如果您的目標區塊為 +2，但交易因處理時間較早而在區塊 +1 插入，則出價將會失敗。 因此，建議透過兩次傳送您的出價交易來最大化納入機率：一次目標區塊號碼為 +1，另一次目標區塊號碼為 +2。

## 最佳實務

- **監控存款餘額**：保持足夠餘額以支付多次出價
- **謹慎處理 Nonces**：出價前請務必查詢最新的 nonce
- **最佳化偵測**：更快速的 MEV 檢測可提升競爭優勢
- \*\* 在 Kairos 上測試\*\*：在部署主網路之前，先在測試網路上驗證您的策略
- **監控結果**：透過 MEV Explorer 追蹤拍賣結果，以完善您的競投策略
- \*\* 設定適當的瓦斯限制\*\*：在充足瓦斯與成本效益之間取得平衡

## 資源

- [SDK 儲存庫](https://github.com/kaiachain/auctioneer-sdk)
- [KIP-249 規格](https://kips.kaia.io/KIPs/kip-249)
- [範例程式碼](https://github.com/kaiachain/auctioneer-sdk/tree/dev/example)
- API 文件：[auctioneer-kairos.kaia.io/docs](https://auctioneer-kairos.kaia.io/docs) (Kairos), TBU (Mainnet)
- MEV Explorer：[mev-kairos.kaia.io](https://mev-kairos.kaia.io) (Kairos), TBU (Mainnet)
- [FAQ](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/FAQ.md)

## 尋求協助

有關問題或疑問：

- 張貼在 [Kaia DevForum](https://devforum.kaia.io)
- 在 [SDK 套件庫] 中開啟問題(https://github.com/kaiachain/auctioneer-sdk/issues)