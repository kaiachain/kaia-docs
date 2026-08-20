---
title: 從 The Graph 遷移
sidebar_label: 從 The Graph 遷移
---

# 從 The Graph 遷移

:::caution 日落通知

Kaia 在 **The Graph** 上的支援將於 **2026 年 8 月 31 日** 結束。 自該日期起，Kaia 子圖將停止建立索引，且其查詢端點將不再傳回資料。 若您的去中心化應用程式（dapp）從 The Graph 上的 Kaia 子圖讀取資料，請務必在 **2026 年 8 月 31 日** 之前遷移至其他索引器，以避免服務中斷。

:::

## 有哪些變化

The Graph 目前支援 Kaia 主網 (8217) 和 Kairos 測試網 (1001)，其中 Kaia 子圖的索引服務由 Upgrade Indexer 提供。 該項支援將於 **2026年8月31日** 結束。

| 日期             | 會發生什麼事                                                       |
| -------------- | ------------------------------------------------------------ |
| **2026年8月31日** | Kaia 子圖停止建立索引。 對 The Graph 閘道器的查詢端點已停止返回 Kaia 資料。            |
| 日落之後           | Kaia 已不再是 Subgraph Studio 中可部署的網路。 Kaia 的 `graph deploy` 失敗。 |

鏈上並無任何變更。 Kaia 主網與 Kairos、您的合約以及您的事件歷史紀錄均不受影響——僅有託管的索引服務將停止運作。 任何能讀取 Kaia RPC 端點的索引器，皆可重建相同資料。

## 您是否受到影響？

若符合以下任一情況，您即受影響：

- 您的應用程式會向 `gateway.thegraph.com` 或 `gateway-arbitrum.network.thegraph.com` 上的某個 URL 發出查詢，該 URL 指向一個 Kaia 子圖。
- 您的應用程式從 Subgraph Studio 查詢 Kaia 子圖端點（`api.studio.thegraph.com/query/...`）。
- 您可以使用 `graph deploy --studio` 部署 Kaia 子圖，或將其發佈至 The Graph 的去中心化網路。
- 您技術堆疊中的某個依賴項、儀表板或分析工作會從這些端點之一讀取資料。

快速檢查您的程式碼庫的方法：

```bash
grep -rn "thegraph.com" --include="*.ts" --include="*.js" --include="*.json" --include="*.env*" .
```

如果您是透過 Goldsky、SubQuery、自建的圖資料庫節點來索引 Kaia，或是直接讀取 Kaia RPC 端點，則您**不會**受到影響。

## 選擇其他選項

以下這三種選擇均已於今日將 Kaia 主網和 Kairos 納入指數。

|             | [Goldsky](./goldsky.md) | [SubQuery](./subquery.md) | 自行託管的圖節點        |
| ----------- | ----------------------- | ------------------------- | --------------- |
| **執行現有的子圖** | 是的——子圖規格相同              | 是的 — 透過 IPFS 部署 ID        | 是的——它 _確實_ 是圖節點 |
| **遷徙行動**    | 一個 CLI 指令               | 發佈現有的建置                   | 自行部署基礎架構        |
| **主機服務**    | 受管理                     | 受管理或去中心化的網路               | 由您來操作           |
| **另提供**     | 鏡像（串流至您的資料庫）、RPC、管線     | 單一專案中的多鏈索引                | 完全掌控            |
| **最適合**     | 最快的即插即用替換方案             | 多鏈專案、去中心化託管               | 希望避免依賴供應商的團隊    |

**若您想要最簡便的解決方案，請使用 Goldsky。** Goldsky 完全相容於 The Graph 的子圖規格，因此現有的 Kaia 子圖可直接遷移過來，無需變更您的映射、資料結構或查詢——僅需變更應用程式中的端點 URL 即可。

## 選項 1：遷移至 Goldsky

### 1. 取得您的子圖的 IPFS 雜湊值

請在停用日期前，於 The Graph 上查詢您現有的子圖端點：

```graphql
query {
  _meta {
    deployment
  }
}
```

`deployment` 的值即是您的 IPFS 雜湊值。 您也可以從 [Graph Explorer](https://thegraph.com/explorer) 或 Subgraph Studio 中的子圖頁面，將其複製為 **部署 ID**。

:::tip 請在 8 月 31 日之前完成此事項

請立即擷取您目前擁有的每個 Kaia 子圖的 IPFS 哈希值，並將其儲存起來。 當您的終端裝置仍能回應時，進行資料蒐集會容易得多。

:::

### 2. 安裝並驗證 Goldsky CLI

```bash
# macOS / Linux
curl https://goldsky.com | sh

# Windows
npm install -g @goldskycom/cli
```

請在 [app.goldsky.com](https://app.goldsky.com) 的 **專案設定** 下建立一個 API 金鑰，然後：

```bash
goldsky login
```

針對 CI 或無介面環境：

```bash
goldsky login --token <API_KEY>
```

### 3. 重新部署子圖

```bash
goldsky subgraph deploy <your-subgraph-name>/<version> --from-ipfs-hash <your-subgraph-ipfs-hash>
```

Goldsky 採用相同的子圖建構方式，並從您設定的起始區塊開始對 Kaia 進行索引。

若您希望改從原始碼儲存庫進行部署，請在專案目錄中執行 `goldsky subgraph deploy<name>/<version>` — 詳見 [部署子圖](https://docs.goldsky.com/subgraphs/deploying-subgraphs)。

### 4. 請等待同步完成，然後切換您的終端點

透過以下方式追蹤進度：

```bash
goldsky subgraph list
```

一旦子圖追上鏈頭，請將應用程式中的網關 URL 替換為 Goldsky 查詢端點：

```diff
- const queryUrl = 'https://gateway.thegraph.com/api/<api-key>/subgraphs/id/<subgraph-id>';
+ const queryUrl = 'https://api.goldsky.com/api/public/<project-id>/subgraphs/<name>/<version>/gn';
```

您的 GraphQL 查詢不會改變。 若要了解在 Goldsky 上從頭開始建構 Kaia 子圖的完整操作指南，請參閱 [Goldsky](./goldsky.md)。

## 選項 2：遷移至 SubQuery

SubQuery 能夠執行現有的子圖建構，同時也為多鏈專案提供專屬的 SDK。

1. 從 Graph Explorer 取得 **部署 ID**（IPFS CID），或透過 SubQuery 的 IPFS 閘道在本地端建立一個：

   ```bash
   graph build -i https://unauthipfs.subquery.network/ipfs/api/v0
   ```

2. 開啟 [SubQuery Explorer](https://explorer.subquery.network)，並選擇 **發佈新專案**。

3. 輸入 CID 以及您的專案元資料，然後發佈。

請注意，SubQuery Network 不支援 GraphQL 訂閱功能。 請參閱 [將您的 Subgraph 專案發佈至 SubQuery Network](https://subquery.network/doc/subquery_network/architects/publish-subgraph.html) 以及 [Kaia 快速入門](https://subquery.network/doc/indexer/quickstart/quickstart_chains/kaia.html)，或瀏覽 [SubQuery](./subquery.md) 頁面，以取得針對 Kaia 的專屬入門指南。

## 選項 3：自行架設圖節點

您的子圖具有可移植性。 您可以自行針對 Kaia 存檔的 RPC 端點執行 [graph-node](https://github.com/graphprotocol/graph-node)，並完全保留原有的映射、資料結構與查詢。

您將需要一個 Kaia RPC 端點（請參閱 [公開端點](../../../references/public-en.md) 或執行 [您自己的節點](../../../nodes/endpoint-node/endpoint-node.md)），此外還需安裝 PostgreSQL 和 IPFS。 這讓您能完全掌控一切，且無需依賴供應商，但代價是必須自行營運基礎架構。

## 切換檢查清單

- [ ] 請列出貴團隊所擁有的所有 Kaia 子圖，包括內部儀表板和分析工作。
- [ ] 請在 **2026 年 8 月 31 日之前** 將每個項目的 IPFS 哈希值／部署 ID 保存下來。
- [ ] 儲存每個子圖的起始區塊及任何接枝配置。
- [ ] 將每個子圖部署至您選擇的服務供應商。
- [ ] 等待每個子圖與鏈頭同步。
- [ ] 將幾個已知的查詢分別對照兩個端點進行比對，並確認結果是否一致。
- [ ] 請在您的應用程式、環境變數及 CI 機密中更新端點 URL 和 API 金鑰。
- [ ] 請更新任何使用您的子圖端點的第三方整合服務或合作夥伴。
- [ ] 部署您的應用程式，並確認生產環境的流量能從新端點讀取。
- [ ] 取消僅用於 Kaia 的 The Graph 帳單或 API 金鑰。

## 常見問題

**這會影響我的智慧合約或鏈上資料嗎？**
不會。 只有託管式索引服務將會停止提供。 您在 Kaia 上的合約、交易及事件日誌均未變更，且任何索引器仍可對其進行完整查詢。

**我必須重寫我的子圖嗎？**
不需要。 Goldsky、SubQuery 以及自架設的圖節點皆支援標準子圖規範。 您的 `schema.graphql`、映射以及 GraphQL 查詢都會被保留下來。

**2026 年 8 月 31 日之後，我在 The Graph 上的子圖會如何？**
系統將停止對 Kaia 進行索引，且其查詢端點將不再返回 Kaia 資料。 請在該日期之前完成遷移，以避免服務中斷。

**針對其他區塊鏈的查詢是否仍能正常運作？**
是的。 這只會影響凱亞。 您透過 The Graph 在其他網路上記跑的子圖並不會受到影響。

**凱亞是否推薦某家服務供應商？**
不是。 Goldsky 之所以是最快的即插即用方案，是因為它採用單指令遷移，但 SubQuery 和自架設的 GraphNode 同樣是可行的選擇。 選擇最適合您技術堆疊的方案。

**我需要遷移方面的協助。**
請透過 [Kaia 開發者論壇](https://devforum.kaia.io) 或 Kaia Discord 聯繫我們。 若您營運的是大型或複雜的子圖，請盡早聯繫 Kaia 團隊，以便我們協助您規劃系統切換事宜。

## 下一步

- [Goldsky](./goldsky.md) — 逐步部署 Kaia 子圖
- [SubQuery](./subquery.md) — 基於 Kaia 的多鏈索引功能
- [索引器概覽](./indexers.md) — Kaia 上的所有索引選項
