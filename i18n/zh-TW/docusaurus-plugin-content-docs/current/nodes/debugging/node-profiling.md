# 檔案節點資料

剖析是了解和優化 Kaia 節點效能的重要工具。 本教學將引導您利用 Kaia 的除錯 API 和 `net/http/pprof` Go 套件，學習各種可用於 Kaia 節點操作員的剖析技術。

## 先決條件

開始之前，請確保

- \*\* 節點設定：\*\* 您的 Kaia 節點已正確安裝並執行。

- \*\* 存取節點控制台：\*\* 您需要透過 [節點控制台](../endpoint-node/ken-cli-commands.md#javascript-console) 與節點互動。

- **工具：** Go 安裝在您的系統上，以使用 `go tool pprof` 和 `go tool trace`。 您可以透過執行來驗證：

```bash
go version
```

## 1\. 管理剖析：如何啟動、停止和檢查狀態

Kaia 節點提供`debug`API，提供多種剖析方法。 您可以透過節點的主控台或 [JSON-RPC API call](https://docs.kaia.io/references/json-rpc/debug/start-p-prof/) 與這些方法互動。

### 1.1 啟動 pprof HTTP 伺服器

pprof HTTP 伺服器可讓您有效率地收集和分析剖析資料。

```bash
# Start pprof server with default settings (localhost:6060)
> debug.startPProf()

# Start pprof server on a specific address and port
> debug.startPProf("localhost", 8080)
```

#### 存取 pprof 端點

pprof 伺服器執行後，可從下列位置存取剖析資料：

- [http://localhost:6060/debug/pprof/](http://localhost:6060/debug/pprof/) - 可用設定檔總覽。
- [http://localhost:6060/memsize/](http://localhost:6060/memsize/) - 記憶體大小報告。
- [http://localhost:6060/debug/vars](http://localhost:6060/debug/vars) - Prometheus metrics 的匯出程式。

### 1.2 停止 pprof HTTP 伺服器

```bash
> debug.stopPProf()
```

### 1.3 檢查 pprof 是否正在執行

```bash
> debug.isPProfRunning()
true  # if running
false # if not running
```

## 2\. 收集檔案

pprof 伺服器執行後，您可以使用多種方法收集各種設定檔，以分析節點的效能。

### 2.1 使用 Web 介面收集

在 Web 瀏覽器中輸入各個端點，以收集不同的設定檔，如以下範例所示：

**收集堆配置文件**

`http://localhost:6060/debug/pprof/heap`

**收集 30 秒 CPU 設定檔**

`http://localhost:6060/debug/pprof/profile?seconds=30`

\*\*以 debug=2 \*\*收集 goroutine 設定檔

`http://localhost:6060/debug/pprof/goroutine?debug=2`

### 2.2 使用 API 呼叫進行收集

在節點主控台中輸入各個命令，以收集或設定設定檔，如以下範例所示：

```bash
# Collect 30-second CPU profile
> debug.cpuProfile("cpu.profile", 30)

# Collect 30-second block profile
> debug.blockProfile("block.profile", 30)

# Set mutex profiling fraction
> debug.setMutexProfileFraction(1)
```

### 2.3 使用 `go tool pprof` 進行收集

如果您無法存取 pprof 網頁介面，您可以使用 `go tool pprof` 在本機產生和分析剖析結果。

#### 識別可用的設定檔類型

支援的設定檔包括

- `allocs`：過去所有記憶體分配的取樣。
- `阻塞`：導致同步原語阻塞的堆疊追蹤。
- `goroutine`：所有目前 goroutine 的堆疊軌跡。 使用 `debug=2` 作為查詢參數，以與未恢復的恐慌相同的格式匯出。
- `堆`：活物件的記憶體分配取樣。 您可以指定 `gc` GET 參數，在進行堆取樣之前執行垃圾回收。
- mutex\`：爭用代理權持有者的堆疊軌跡。
- `profile`：CPU 設定檔。 您可以在 `seconds` GET 參數中指定持續時間。 取得設定檔之後，使用 `go tool pprof` 指令來調查設定檔。
- `threadcreate`：導致建立新 OS 線程的堆疊追蹤。
- `trace`：目前程式的執行追蹤。 您可以在 `seconds` GET 參數中指定持續時間。 取得追蹤檔案後，使用 `go tool trace` 指令來調查追蹤。

#### 使用 `go tool pprof` 收集設定檔

```bash
go tool pprof http://localhost:6060/debug/pprof/<profiletype>
```

將 `<profiletype>` 改為上述支援的設定檔之一 (例如，`heap`、`profile`)。

#### 指令範例

```bash
# Collect heap profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Collect 30-second CPU profile
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Collect goroutine profile with debug=2
go tool pprof http://localhost:6060/debug/pprof/goroutine?debug=2
```

#### 產生文字剖析檔案

若要產生以文字為基礎的剖析報告，請在 `go tool pprof` 中使用 `-text` 選項。

```bash
# Generate text-based CPU profile
go tool pprof -text cpu.profile
```

#### pprof 額外選項

收集設定檔時，可使用額外的查詢參數和選項進一步自訂設定檔。

- **回應格式 (`debug=N`):**

  - \*\* 二進位格式（預設）：\*\* `N = 0`
  - **純文字格式：** `N > 0`

  **範例：**

```bash
go tool pprof http://localhost:6060/debug/pprof/allocs?debug=1
```

- \*\* 垃圾回收 (`gc=N`)：\*\*

  - \*\* 在剖析之前執行 GC：\*\* 設定 `gc=1` 以在擷取堆剖析之前觸發垃圾回收循環。

  **範例：**

```bash
go tool pprof http://localhost:6060/debug/pprof/heap?gc=1
```

- **時間參數 (`秒=N`)：**

  - \*\* 分配、區塊、Goroutine、堆、互斥、線程創建配置文件：\*\*

    - `seconds=N` 會根據指定的持續時間傳回 delta 設定檔。

  - **CPU 設定檔和追蹤設定檔：**

    - `seconds=N` 指定 CPU 設定檔或追蹤應該執行的持續時間。

  **範例：**

```bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
```

### 2.4 在未安裝 Go 的情況下進行收集

如果您的程式尚未安裝 Go (您可以執行 `go version` 來檢查)，請依照下列步驟下載並儲存 profiling 資料到本機：

1. 使用 `wget` 下載設定檔檔案。

```bash
wget -O memory_profile http://localhost:6060/debug/pprof/heap
```

2. 使用 `scp` 將設定檔傳輸到您的本機。

```bash
scp <user>@<node_ip>:memory_profile memory_profile
```

注意：將 `<user>` 改為您的 SSH 使用者名稱，並將 `<node_ip>` 改為您 Kaia 節點的 IP 位址。

## 3\. 記憶體剖析

如前所述，記憶體剖析是指 go pprof 所提供的堆資訊。 也可以透過 Kaia 節點提供的除錯名稱空間中的 writeMemProfile 來收集。

```bash
# Using go tool pprof
> go tool pprof http://localhost:6060/debug/pprof/heap
# Using Node Console
> debug.writeMemProfile("mem.profile")
```

剖析記憶體對於分析記憶體相關問題（如記憶體洩漏）至關重要。 要控制記憶體剖析的粒度，調整 `MemProfileRate` 變數對此過程很有幫助。 這應該在節點執行時盡早設定 (例如，在 `main` 函式開始時)。

:::note

Kaia 提供了 `--memprofilerate` 旗標，可以輕鬆設定 `MemProfileRate` 變數。 因此，由於它只能作為標誌，因此必須在啟動節點時設定，而且不能透過 API 呼叫變更。

:::

```bash
var MemProfileRate int = 512 * 1024
```

- **設定 `MemProfileRate`:**
  - \*\* 檔案最大分配：\*\* 設定為 `1`。
  - **停用剖析：** 設為 `0`。
  - \*\* 預設設定：\*\* `512 * 1024` (profiles 大約每 512KB 分配一次)。

**影響：**

- \*\* 更高的剖析率 (更低的 `MemProfileRate`):\*\* 增加了粒度，但可能會引入性能開銷。
- \*\* 較低剖析率 (較高的 `MemProfileRate`):\*\* 減少剖析細節，將效能影響降至最低。

\*\* 最佳做法：\*\*

- **一致性:** 確保 `MemProfileRate` 在節點的整個執行時間內保持不變，以維持準確的剖析資料。
- **早期設定：** 在程式一開始就設定 `MemProfileRate` 以擷取一致的剖析資訊

## 4\. 分析檔案

收集剖析資料後，使用 `go tool pprof` 分析並視覺化儲存的剖析檔案。

### 4.1 使用 Web 介面進行分析

例如，您可以使用 Go 的 pprof 工具直觀地分析記憶體設定檔資料，如下圖所示，該工具透過網頁介面提供記憶體使用情況的直觀表示：

```bash
go tool pprof -http=0.0.0.0:8081 cpu.profile
```

### 4.2 使用命令列分析

您也可以使用 Go 的 pprof 工具，在終端機的文字介面中分析記憶體設定檔資料：

```bash
go tool pprof cpu.profile
```

- \*\* 常見的 `pprof` 指令：\*\*

  - `top`：顯示消耗資源最多的函式。
  - `list<function_name>`：顯示特定函式的注釋原始碼。
  - `web`：在您的網頁瀏覽器中產生設定檔的可視化。
  - `pdf`：產生 PDF 檔案報告。

- \*\* 使用範例：\*\*

```bash
go tool pprof cpu.profile
# Inside the pprof interactive shell:
> top
> list main.functionName
> web
```

:::note

確保您已為 `web` 和 `pdf` 指令安裝 Graphviz，以產生可視化圖形。

:::

## 5\. 總結

透過遵循此剖析教學，Kaia 節點操作員可以有效地找出並解決效能瓶頸、最佳化資源使用，並確保其節點順暢且有效率地運作。 定期進行剖析，並結合強大的監控和記錄實務，將大大有助於維持您的 Kaia 節點在區塊鏈網路中的可靠性和性能。
