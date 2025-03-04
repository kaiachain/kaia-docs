# 修剪節點數據

本頁介紹如何刪除歷史塊狀態以減少存儲需求。 Kaia 提供了兩種修剪塊狀態的方法：

- [即時修剪](../../learn/storage/state-pruning.md#state-live-pruning)：啟用即時修剪功能後，超過一定保留期限的塊狀態將被自動刪除。
- [批量剪枝：狀態遷移](../../learn/storage/state-pruning.md#state-batch-pruning-state-migration)：區塊狀態可以進行狀態遷移，也就是說，在某個區塊編號之前的區塊狀態都是可用的。

## 瞭解修剪的影響

"即時剪枝 "可持續刪除舊狀態，將磁盤大小保持在最小範圍內。 不過，由於伴隨著記賬任務，即時修剪會稍微降低區塊同步速度。 另一方面，"批量剪枝 "在遷移完成後不會影響性能，但遷移會話需要幾天時間，並暫時需要大量可用磁盤空間來複制狀態。

## 如何進行現場修剪

要從創世區塊啟用即時剪枝，請在啟動節點時使用 `--state.live-pruning` 標記。 如果從已啟用即時剪枝的數據庫開始，則可選擇是否使用該標記，但為了清晰起見，建議使用該標記。

:::note

您可以使用"--state.live-pruning-retention NNN "標記來控制即時剪枝的保留時間（默認值：172800 秒，即 48 小時）。 該標誌決定了歷史數據塊狀態在被剪枝前的保留時間。

:::

:::info

有即時修剪和沒有即時修剪的數據庫是不兼容的。 要運行帶即時剪枝功能的節點，必須從帶有 `--state.live-pruning`標記的創世塊開始，或者從已啟用即時剪枝功能的 [chaindata snapshot](./chaindata-snapshot.md)開始。

不能將非即時剪枝數據庫轉換為即時剪枝數據庫，反之亦然。 以下是您可能會看到的一些日誌信息示例：

```sh
# 首次啟用即時修剪，數據庫為空
INFO[08/27,14:09:01 +09] [41] 將即時修剪標誌寫入數據庫

# 啟用即時修剪
INFO[08/27,14:09:01 +09] [41] 啟用即時修剪 retention=172800

# 禁用即時修剪
INFO[08/27,14：09:46 +09] [41] 即時剪枝已禁用，因為數據庫中未存儲標誌

# 在鏈前進後無法開啟即時剪枝（頭部區塊數>0）
Fatal: Error starting protocol stack: cannot enable live pruning after the chain has advanced.
```

:::

## 如何進行批量修剪

### 先決條件

- 建議在配備 m6i.8xlarge（32 核和 128GB 內存）或更高配置的機器上運行。
- 機器應有足夠的備用磁盤空間（500GB 或以上）。
- 整個過程大約需要 7 天：
  - 第 1 階段：將狀態複製（遷移）到新目錄。 出現消息 "狀態遷移已完成"。
  - 第 2 階段：在新目錄中繼續進行區塊同步。 完成此步驟後，舊目錄將被刪除。

### 步驟

1. 通過控制檯連接節點：

```sh
ken attach --datadir /var/kend/data
```

2. 使用 `admin` 命名空間 RPC 控制狀態遷移：

```js
// 啟動
> admin.startStateMigration()
null

// 檢查進度
> admin.stateMigrationStatus

// 中止
> admin.stopStateMigration()
```