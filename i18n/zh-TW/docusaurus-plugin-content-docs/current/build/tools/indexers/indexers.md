# Indexers

區塊鏈索引器是區塊鏈技術中使用的工具，用於提高搜索、查詢和訪問存儲在區塊鏈上的數據的效率和速度。 它們創建並維護區塊鏈數據的有序數據庫，使用戶能夠快速檢索信息，而無需從頭開始處理整個區塊鏈。

:::caution The Graph 將於 2026 年 8 月 31 日在 Kaia 上停止服務

[The Graph](https://thegraph.com/) 對 Kaia 的支援將於 **2026 年 8 月 31 日** 結束。 自該日期起，Kaia 子圖將停止建立索引，且其查詢端點將不再傳回資料。 若您的 dapp 依賴其中一種，請參閱 **[從 The Graph 遷移](./migrate-from-the-graph.md)** —— 您的子圖程式碼可直接套用至 Goldsky、SubQuery 或自建的圖節點，無需任何修改。

:::

以下供應商已與 Kaia 集成，提供區塊鏈索引服務：

| 供應商                        | Kaia 網路                            | 註釋                                                        |
| -------------------------- | ---------------------------------- | --------------------------------------------------------- |
| [Goldsky](./goldsky.md)    | 主網，Kairos                          | 受管子圖加上 Mirror 資料串流。 符合子圖規格，因此現有的子圖只需透過單一 CLI 指令即可完成遷移。    |
| [SubQuery](./subquery.md)  | 主網，Kairos                          | 在單一專案中實現多鏈索引，並採用託管與去中心化網路託管模式。                            |
| [The Graph](./thegraph.md) | 主網，Kairos — **截至 2026 年 8 月 31 日** | 凱亞的日落。 請參閱 [從 The Graph 遷移](./migrate-from-the-graph.md)。 |

如果您希望自行架設索引基礎架構，也可以直接在 Kaia 存檔的 RPC 端點上執行 [graph-node](https://github.com/graphprotocol/graph-node)。
