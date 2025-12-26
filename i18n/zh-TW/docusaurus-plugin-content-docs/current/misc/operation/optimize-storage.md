# 最佳化節點儲存

[Kaia v2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0) 引入了兩個互補的儲存最佳化功能，可大幅降低磁碟空間需求：

- **資料庫壓縮**：透過壓縮重複的區塊資料來減少儲存空間
- **FlatTrie 狀態方案**：大幅減少歸檔節點狀態資料庫大小的實驗性功能

本指南說明如何將這些最佳化套用到您的 Kaia 節點。

## 資料庫壓縮

資料庫壓縮會使用 LevelDB 內建的 Snappy 壓縮功能，以縮小區塊標頭、交易正文和收據的大小 - 這些資料通常包含重複資料，例如 ABI 編碼交易中的零填充。

\*\* 預計節省：\*\*

- 完整節點：縮減 ~2TB (在主網路上從 ~4.2TB 減至 ~2TB)

### 先決條件

- Kaia v2.1.0 或更高版本
- 針對手動壓縮：充足的可用磁碟空間，以及接受持續磁碟 I/O 的能力 (請參閱下面的 \*\* 資源影響\*\* 部分)

### 啟用新安裝的壓縮功能

從 v2.1.0 開始，預設啟用壓縮。 只需啟動您的節點：

\*\* 套件安裝：\*\*

```bash
# Configure network in kend.conf
sudo vi /etc/kend/conf/kend.conf
# Set: NETWORK=mainnet or NETWORK=kairos

# Start node (compression enabled by default in v2.1.0+)
kend start

# Verify
kend status
tail -f /var/kend/logs/kend.out
```

所有新寫入的資料都會自動壓縮。

### 啟用現有節點的壓縮功能

如果您從 v2.1.0 之前的版本升級：

**第 1 步：檢查您的版本**

```bash
ken version
```

**步驟 2：適用於 v2.1.0 及更新版本**

預設已啟用壓縮功能。 新資料會自動壓縮。 跳至步驟 4 以壓縮現有資料。

**步驟 3：僅適用於 v2.1.0 之前的版本**

將壓縮旗標加入您的設定：

\*\* 套件安裝：\*\*

```bash
sudo vi /etc/kend/conf/kend.conf
# Add to ADDITIONAL variable:
ADDITIONAL="--db.leveldb.compression 2"
```

壓縮標誌值為

- `0`:無壓縮
- `1`:僅壓縮收據
- `2`:壓縮標頭、正文和收據 (建議使用)
- `3`:壓縮所有表格，包括狀態 trie (不建議使用)

:::note

建議使用選項 2，因為狀態 trie 資料壓縮得不好（顯得隨機），所以選項 3 帶來的額外好處微乎其微。

:::

然後再重新啟動：

```bash
kend stop
kend start
```

**步驟 4：壓縮現有資料（選擇性但建議）**

透過 RPC 觸發資料庫壓縮。 附加到您的節點控制台：

```bash
ken attach --datadir /var/kend/data
```

在主控台中，使用「allbutstate」預設觸發壓縮：

```javascript
> debug.chaindbCompact({ "preset": "allbutstate" })
null
```

**可用預設：**

- `「預設」`：全方位壓縮所有資料庫元件
- `"allbutstate"`：選擇性壓縮排除狀態 trie (建議用於壓縮)
- `「自訂」`：為特定資料庫表定義自訂範圍

壓縮在背景中執行。 在節點日誌中監控進度：

```bash
tail -f /var/kend/logs/kend.out | grep -i Compact
```

您應該會看到類似的記錄項目：

```
INFO[07/25,12:50:17 Z] [3] Compacting database started               range=0x48-0x49
INFO[07/25,12:55:17 Z] [3] Compacting database completed             range=0x48-0x49 elapsed=5m0.085s
```

節點在壓縮期間會繼續處理區塊。

\*\* 預計持續時間：\*\* 一個 Mainnet 完整節點約需 10 小時 (在 SSD 上有 ~4TB 資料)。 時間長短視硬體和資料大小而定。

**資源影響：**

- 高磁碟 I/O（讀取峰值 >400 MiB/秒，寫入峰值 >300 MiB/秒）
- 高磁碟 IOPS (通常 >2000 次/秒)
- 節點保持運作，並繼續同步區塊

:::note

雖然節點在壓縮期間仍可運作，但在 I/O 峰值期間，查詢效能可能會受到影響。 對於生產 RPC 節點，請排定在維護視窗或低流量時段進行壓縮。

:::

### 使用預先壓縮的 Chaindata 快照 (TBD)

預先壓縮的 chaindata 快照計劃在未來的版本中推出，但目前尚未提供。 當這些資料可用時，它們將會列在 [Chaindata Snapshot page](https://docs.kaia.io/misc/operation/chaindata-snapshot/) 上。

目前，您必須

- 在新的 v2.1.0+ 安裝中啟用壓縮（對於新資料自動啟用）
- 在現有節點上執行手動壓縮（請參閱上文）

定期檢查快照頁面，以取得壓縮快照可用性的更新。

### 驗證壓縮是否啟用

檢查您的節點啟動日誌，以瞭解壓縮設定：

```bash
grep "compressionType" /var/kend/logs/kend.out
```

針對非州-trie 資料表，尋找顯示 `compressionType=snappy` 的記錄項目。

### 監控與故障排除

**檢查磁碟使用量的減少：**

```bash
du -h --max-depth=1 /var/kend/data/klay/chaindata
```

比較壓實前和壓實後。 您應該會發現包含區塊正文和收據的目錄中的儲存空間大幅減少。

**常見問題：**

1. **壓縮失敗**：確保有足夠的磁碟空間。 壓縮暫時需要額外的空間來重寫資料。
2. **FlatTrie 無法啟動**：FlatTrie 需要一個空的資料庫。 如果看到關於現有資料的錯誤，請刪除 chaindata 目錄，然後從 genesis 同步。
3. **Merkle proof API 錯誤**：FlatTrie 不支援 `eth_getProof`。 如果需要此 API，請使用傳統節點。

## FlatTrie 國家方案 (實驗性)

FlatTrie 是一個實驗性的狀態儲存方案，改編自 Erigon Ethereum 客戶端。 它以平面結構儲存帳戶狀態，並只維護最新區塊的完整 Merkle Patricia Trie (MPT)，可依需求重建歷史試圖。

\*\* 預計節省：\*\*

- 總儲存：減少 ~75% (根據 Kairos 測試網路結果預測)
- Kairos 測試網路：4.3 TB → 1 TB
- 主網路：~35TB → ~10TB (根據比例減少估計)

:::warning

FlatTrie 是 v2.1.0 中的實驗性功能。 不建議用於生產。 預期在未來的版本中會出現潛在的穩定性問題、效能瓶頸和破壞性變更。 僅用於測試和開發環境。

:::

### 先決條件

- Kaia v2.1.0 或更高版本
- \*\* 必須從 genesis 同步\*\* (無法轉換現有資料庫)
- 清空資料目錄

### 目前的限制

啟用 FlatTrie 之前，請先瞭解這些限制：

\*\* 不支援的功能：\*\*

- 批量修剪和現場修剪
- 區塊倒帶 (`--start-block-number`標誌和`debug_setHead`API)
- 生成 Merkle 證明 (`eth_getProof` API)

**不相容：**

- 無法從現有資料庫遷移 (必須從創世紀開始)
- 無法在 FlatTrie 和非 FlatTrie 模式之間切換
- 有 FlatTrie 和沒有 FlatTrie 的資料庫不相容

### 啟用 FlatTrie

**步驟 1：準備空資料目錄**

```bash
# Ensure clean data directory
sudo rm -rf /var/kend/data
sudo mkdir -p /var/kend/data
```

**步驟 2：以 FlatTrie 標誌啟動節點，並從 genesis 同步**

```bash
# Mainnet
ken --state.experimental-flat-trie

# Kairos testnet
ken --state.experimental-flat-trie --kairos
```

:::note

當 FlatTrie 啟用時，不論 `--gcmode`和 `--state.block-interval`旗標為何，歸檔模式都會自動啟動。 使用 FlatTrie 時，這些標記會被忽略。

:::

**步驟 3：等待完全同步**

節點會同步所有來自 genesis 的區塊。 這可能需要數週的時間，視您的硬體和網路而定。

### 驗證 FlatTrie 是否活躍

檢查您的節點啟動記錄，確認 FlatTrie 模式：

```bash
grep -i "flat" /var/kend/logs/kend.out | head -20
```

您應該會看到實驗性平面 trie 已經啟動的跡象。

### 監控 FlatTrie 性能

與傳統的狀態儲存相比，FlatTrie 使用不同的資源配置文件：

\*\* 預期特性：\*\*

- 較低的 CPU 使用率
- 較高的記憶體使用量 (~30GB)
- 較高的程序計數 (~900-1000)
- 較慢的區塊定稿時間

透過節點的 Prometheus metrics endpoint 或 Grafana 面板監控這些指標。

### 排除 FlatTrie 的故障

\*\* 無法在現有資料庫上啟動 FlatTrie:\*\*
如果您看到錯誤顯示 FlatTrie 無法在非空資料上啟動，您必須從 genesis 開始。 刪除您的 chaindata 目錄，並使用 `--state.experimental-flat-trie` 標誌執行完全同步。

\*\* Merkle proof API 失敗：\*\*
FlatTrie 不支援 `eth_getProof` 及相關的 Merkle proof API。 如果您的應用程式需要這些 API，請改用傳統的節點。

\*\* 高記憶體使用量:\*\*
同步過程中，FlatTrie 節點的記憶體使用量預計約為 30GB。 確保您的系統有足夠的 RAM。 該團隊正在進行優化，以在未來版本中減少這種情況。

\*\* 同步速度慢：\*\*
使用 FlatTrie 的初始同步速度與傳統節點相當。 如果同步速度明顯變慢，請檢查：

- 磁碟 I/O 效能 (強烈建議使用 SSD)
- 網路頻寬
- CPU 使用率

## 最佳實務

1. **在進行重大變更**之前，請務必先進行備份：尤其是在執行手動壓縮之前。
2. **監控磁碟空間**：確保壓縮之前有足夠的可用空間。 壓縮暫時需要額外的空間來重寫資料庫檔案。
3. **在低流量時段安排壓縮**：如果執行公共 RPC 端點。
4. \*\* 使用 SSD 作為生產節點\*\*：壓縮和 FlatTrie 都能從快速隨機 I/O 中獲益。
5. \*\* 實驗性功能的計劃\*\*：FlatTrie 在 v2.1.x 中是實驗性的。 在生產使用前進行徹底測試。
6. \*\* 保持更新\*\*：請查閱發行說明，以瞭解未來的最佳化，以及 FlatTrie 何時會從實驗狀態畢業。