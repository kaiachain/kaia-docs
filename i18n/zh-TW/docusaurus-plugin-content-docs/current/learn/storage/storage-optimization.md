# 儲存優化

隨著 Kaia 區塊鏈的成長，儲存區塊鏈資料所需的儲存空間也在增加。 Kaia 實作了兩種主要技術來管理這種不斷成長的儲存需求：

## 狀態批次修剪（狀態遷移）

State Migration 是一種批次修剪功能，可應用於現有節點，而不會中斷執行中的節點。

### 動機

區塊狀態或 StateDB 以 trie 資料結構儲存鏈上帳號與契約。 trie 資料結構被設計來儲存過時和最近的狀態，因此可以使用 Merkle hash 來驗證它們。 當交易執行狀態變更時，狀態 trie 就會無限擴大。 截至撰寫本文時（2024 年 8 月），Kaia Mainnet 存檔節點大小超過 20TB，即使是完整節點也超過 10TB。

### 概念

State Migration 會刪除處理新區塊時不需要的舊區塊狀態。 它將狀態 trie 從「舊」複製到「新」。 並非所有 trie 節點都會被複製。 從選擇區塊的狀態根可到達的區塊被複製。 複製之後，舊目錄會被刪除，因此您只剩下選取區塊的狀態。

閱讀這些部落格文章，瞭解更多技術細節：
[State Migration: Saving Node Storage](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a),
[Kaia State Migration: An Efficient Way to Reduce Blockchain Data](https://medium.com/klaytn/klaytn-state-migration-an-efficient-way-to-reduce-blockchain-data-6615a3b36523)

有關如何執行 Batch Pruning，請參閱 [State Migration Guide](../../misc/operation/node-pruning.md#how-to-perform-batch-pruning)。

## 國家現場修剪

State Live Pruning 是解決狀態資料庫大小不斷增加問題的新方案。 與 Batch Pruning（狀態遷移）不同，Live Pruning 會隨著節點程序的阻塞，一點一滴地自動刪除舊的狀態。

### 動機

區塊狀態或 StateDB 以 trie 資料結構儲存鏈上帳號與契約。 trie 資料結構被設計來儲存過時和最近的狀態，因此可以使用 Merkle hash 來驗證它們。 當交易執行狀態變更時，狀態 trie 就會無限擴大。 截至撰寫本文時（2025 年 8 月），Kaia Mainnet 存檔節點大小超過 20TB，即使是完整節點也超過 10TB。

在此之前，「狀態遷移」已經透過選擇性複製最近的狀態並刪除其餘的狀態來刪除舊的狀態，從而緩解了這個問題。 這樣可以將完整節點大小縮小到 5 TB 以下。

儘管如此，國家移民也有其缺點。 它需要花費數天的時間來遍歷整個州的 trie，因此開銷很高。 此外，狀態轉移必須手動觸發。 為了克服這些限制，我們引進了 Live Pruning 技術。

### 概念

Trie 剪枝很困難，因為無法確定某個 trie 節點是否過時。 在原始狀態 trie 結構中，一個 trie 節點可以是多個 tries 的一部分，每個 tries 構成一個不同的區塊。 即使 trie 節點 (例如帳戶餘額) 更新為其他值，也不能刪除 trie 節點，因為其他父節點可能仍然需要它。 這個問題被稱為雜湊重複問題。

Live Pruning 會故意重複具有相同內容的 trie 節點。 在 Live Pruning 的情況下，一個 trie 節點不會被其切細值所引用，而是被其 ExtHash 所引用。 ExtHash 是內容的 32 位元組雜湊值加上 7 位元組序列索引。 序列索引是單調遞增的，因此每個 trie 節點都是唯一的。

```
Hash:    32-byte Keccak256
ExtHash: 32-byte Keccak256 + 7-byte Serial index
```

這樣，每當 trie 節點的內容改變時，就可以安全地假設這個 trie 節點現在已經過期。 只要忽略序列索引，就能以同樣的方式計算 Merkle 哈希，使其在共識方面與非活剪節點相容。

閱讀這篇部落格文章，瞭解更多技術細節：[Efficient Management of Blockchain Data Capacity with StateDB Live Pruning](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91).

有關如何啟用即時修剪，請參閱 [即時修剪指南](../../misc/operation/node-pruning.md#how-to-perform-live-pruning)。

## 資料壓縮

資料壓縮可將 LevelDB 內建的 Snappy 壓縮演算法套用至選定的資料庫表，從而減少區塊資料的儲存大小。

### 動機

由於 EVM 交易中的 ABI 編碼標準，由標頭、交易正文和收據組成的區塊資料通常包含高度重複的位元組序列。 舉例來說，Solidity 的 ABI 編碼使用零填充來滿足 32 位元組字元對齊的需求，導致交易呼叫資料有長時間的零。 交易收據在事件日誌和回傳值中也呈現相似的模式。

儘管有這種自然的備援，Kaia 的底層 LevelDB 儲存引擎預設並未使用壓縮，讓重複資料不必要地消耗磁碟空間。 截至 2025 年 7 月，Kaia Mainnet 完整節點佔用了超過 4.2 TB 的儲存空間，其中約 3.6 TB 屬於未壓縮的區塊資料。

### 概念

Kaia v2.1.0 啟動 LevelDB 的 Snappy 壓縮演算法，並選擇性地應用於資料庫資料表。 `--db.leveldb.compression` 旗標可實現粒度控制：

- 壓縮標頭、正文和收據 (冗餘度高，大幅節省成本)
- 排除州立 trie 資料 (看似隨機，壓縮效益極低)

對於現有節點，手動觸發資料庫壓縮可將舊的未壓縮資料重寫為壓縮格式。 這個「內務管理」過程會合併 SSTables、協調刪除，並應用壓縮作為副作用。

**結果：** Mainnet 完整節點的總儲存空間減少約 50% (~2TB 節省空間)，大部分的增益在正文和收據資料表。 此過程約需 10 小時，可與一般區塊處理同時進行。

閱讀這篇部落格文章，瞭解更多技術細節：Kaia v2.1 如何透過壓縮回收 2 TB。

有關啟用壓縮的方法，請參閱 [優化節點儲存指南](../../misc/operation/optimize-storage.md#database-compression)。

## FlatTrie 國家方案 (實驗性)

FlatTrie 是一種實驗性的狀態儲存方案，透過重整歷史帳戶狀態的儲存方式，大幅降低歸檔節點狀態資料庫的大小。

### 動機

歸檔節點必須保留所有區塊高度的所有帳戶的完整歷史狀態資料，以便進行時間旅行查詢和全面的區塊鏈分析。 這造成了與完整節點截然不同的儲存配置文件：截至 2025 年 8 月，Kaia Mainnet 存檔節點需要超過 35 TB 的磁碟空間，其中 31 TB (89%) 被狀態資料庫消耗。

傳統的 Merkle Patricia Trie (MPT) 結構會同時儲存帳號資料 (樹葉) 和形成 Merkle 樹的中間分支節點。 過去，歸檔節點會為多個區塊高度保留完整的 MPT，導致中間節點 (本身不傳送帳戶資料) 無限期累積。

現有的儲存最佳化，例如 [State Migration](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a) (batch pruning) 和 [StateDB Live Pruning](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91) 從根本上需要刪除歷史資料，因此不適用於必須保留完整歷史資料的歸檔節點。

### 概念

FlatTrie 是一個實驗性的狀態儲存方案，改編自 [Erigon Ethereum client](https://github.com/erigontech/erigon/)。 它透過以下方式重組狀態儲存

- 在平面鍵值表中儲存歷史帳戶狀態（簡單地址 → 帳戶資料對應）
- 僅保留最新區塊的完整 MPT 與所有中間分支節點
- 透過暫時只建立必要的分支節點，按需重建歷史 Merkle 根

此方法可消除歷史中間節點的持續儲存，同時保留完整的帳戶狀態歷史，並能夠驗證任何區塊的 Merkle 根。

**適應性挑戰：** Erigon 的實作假設了 Ethereum 的帳戶結構。 Kaia 使用不同的 RLP 編碼，以支援獨特的功能，例如人類可讀地址和多種金鑰類型。 整合過程需要修改 Erigon 的 Merkle 散列模組，將帳戶視為不透明的 bytestring，並建立三個適配器層 (DomainsManager、WriteBuffer、DeferredContext)，以銜接 Kaia 的多執行緒 Trie 介面與 Erigon 的單執行緒 MDBX 資料庫需求。

**結果：** 在 Kairos 測試網路實驗中，FlatTrie 歸檔節點消耗的總儲存空間比傳統歸檔節點少約 75%，狀態資料庫大小減少超過 80%。 預計 Mainnet 存檔節點也會有類似的節省 (從 ~35TB 減至 ~10TB)。

\*\* 限制：\*\* 試驗性 v2.1.0 實作不支援區塊回卷 (`debug_setHead` API)、Merkle 證明生成 (`eth_getProof` API) 或狀態修剪功能。 這些限制源自 FlatTrie 捨棄歷史分支節點的設計選擇。

閱讀這篇部落格文章，瞭解更多技術細節：[Kaia's Experimental FlatTrie for Archive Nodes](#).

有關如何啟用 FlatTrie，請參閱 [優化節點儲存指南](../../misc/operation/optimize-storage.md#flattrie-state-scheme-experimental)。
