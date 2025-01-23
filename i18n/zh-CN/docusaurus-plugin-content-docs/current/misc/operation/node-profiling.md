# 轮廓节点数据

剖析是了解和优化 Kaia 节点性能的重要工具。 本教程将指导您利用 Kaia 的调试 API 和 `net/http/pprof` Go 软件包，学习 Kaia 节点操作员可用的各种剖析技术。

## 前提条件

在开始之前，请确保

- **节点设置：** 您的 Kaia 节点已正确安装并运行。

- **访问节点控制台：** 您需要通过 [节点控制台](../../nodes/endpoint-node/ken-cli-commands.md#javascript-console) 与节点交互。

- **工具：** 在系统中安装 Go，以便使用 `go tool pprof` 和 `go tool trace`。 您可以通过运行

```bash
go version
```

## 1\. 管理剖析：如何启动、停止和检查状态

Kaia 节点提供了一个 "debug "API，可提供多种剖析方法。 您可以通过节点控制台或[JSON-RPC API 调用](https://docs.kaia.io/references/json-rpc/debug/start-p-prof/) 与这些方法交互。

### 1.1 启动 pprof HTTP 服务器

pprof HTTP 服务器可让您高效地收集和分析剖析数据。

```bash
# Start pprof server with default settings (localhost:6060)
> debug.startPProf()

# Start pprof server on a specific address and port
> debug.startPProf("localhost", 8080)
```

#### 访问 pprof 端点

pprof 服务器运行后，可通过以下网址访问剖析数据：

- [http://localhost:6060/debug/pprof/](http://localhost:6060/debug/pprof/) - 可用配置文件概览。
- [http://localhost:6060/memsize/](http://localhost:6060/memsize/) - 内存大小报告。
- [http://localhost:6060/debug/vars](http://localhost:6060/debug/vars) - Prometheus 指标的导出程序。

### 1.2 停止 pprof HTTP 服务器

```bash
> debug.stopPProf()
```

### 1.3 检查 pprof 是否正在运行

```bash
> debug.isPProfRunning()
true  # if running
false # if not running
```

## 2\. 收集简介

pprof 服务器运行后，您可以使用多种方法收集各种配置文件，以分析节点的性能。

### 2.1 使用网络界面收集

如以下示例所示，在网络浏览器中输入相应的端点来收集不同的配置文件：

**收集堆配置文件**

`http://localhost:6060/debug/pprof/heap`

**收集 30 秒 CPU 配置文件**

`http://localhost:6060/debug/pprof/profile?seconds=30`

用调试=2**收集程序配置文件**

`http://localhost:6060/debug/pprof/goroutine?debug=2`

### 2.2 使用 API 调用进行收集

在节点控制台中键入相应命令，以收集或配置配置文件，如以下示例所示：

```bash
# Collect 30-second CPU profile
> debug.cpuProfile("cpu.profile", 30)

# Collect 30-second block profile
> debug.blockProfile("block.profile", 30)

# Set mutex profiling fraction
> debug.setMutexProfileFraction(1)
```

### 2.3 使用 `go tool pprof` 进行收集

如果无法访问 pprof 网络界面，可以使用 `go tool pprof` 在本地生成和分析剖析结果。

#### 识别可用的轮廓类型

支持的配置文件包括

- `allocs`：过去所有内存分配的抽样。
- `block `：导致同步原语阻塞的堆栈跟踪。
- `goroutine`：当前所有 goroutine 的堆栈跟踪。 使用 `debug=2` 作为查询参数，以与未恢复的恐慌相同的格式导出。
- `heap`: 堆实时对象的内存分配采样。 您可以指定 `gc` GET 参数，以便在提取堆样本之前运行垃圾回收。
- `mutex`：争用代理持有者的堆栈跟踪。
- `profile`：CPU 配置文件。 您可以在 `seconds` GET 参数中指定持续时间。 获取配置文件后，使用 `go tool pprof` 命令来研究配置文件。
- `threadcreate`: 线程创建导致创建新操作系统线程的堆栈跟踪。
- `trace`: 跟踪当前程序的执行轨迹。 您可以在 `seconds` GET 参数中指定持续时间。 获取跟踪文件后，使用 `go tool trace` 命令调查跟踪。

#### 使用 `go tool pprof` 收集配置文件

```bash
go tool pprof http://localhost:6060/debug/pprof/<profiletype>
```

将 `<profiletype>` 替换为上述受支持的配置文件之一（如 `heap`, `profile`）。

#### 命令示例

```bash
# Collect heap profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Collect 30-second CPU profile
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Collect goroutine profile with debug=2
go tool pprof http://localhost:6060/debug/pprof/goroutine?debug=2
```

#### 生成文本剖析文件

要生成基于文本的剖析报告，请在使用 `go tool pprof` 时使用 `-text` 选项。

```bash
# Generate text-based CPU profile
go tool pprof -text cpu.profile
```

#### pprof 额外选项

在收集剖面图时，还可使用其他查询参数和选项进一步定制剖面图。

- **响应格式（`debug=N`）：**

  - **二进制格式（默认）：** `N = 0`.
  - **纯文本格式：** `N > 0`．

  **示例：**

```bash
go tool pprof http://localhost:6060/debug/pprof/allocs?debug=1
```

- **垃圾回收（`gc=N`）：**

  - **在剖析之前运行 GC：** 设置 `gc=1` 可在捕获堆剖析之前触发一个垃圾回收周期。

  **示例：**

```bash
go tool pprof http://localhost:6060/debug/pprof/heap?gc=1
```

- **持续时间参数（`秒=N`）：**

  - **分配、块、Goroutine、堆、互斥、线程创建配置文件：**

    - `seconds=N` 根据给定的持续时间返回 delta 曲线。

  - **CPU 配置文件和跟踪配置文件：**

    - `seconds=N` 指定 CPU 配置文件或跟踪运行的持续时间。

  **示例：**

```bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
```

### 2.4 不安装围棋的收集

如果您的程序尚未安装 Go（可通过运行 `go version` 进行检查），请按照以下步骤下载并在本地保存剖析数据：

1. 使用 `wget` 下载配置文件。

```bash
wget -O memory_profile http://localhost:6060/debug/pprof/heap
```

2. 使用 `scp` 将配置文件文件传输到本地计算机。

```bash
scp <user>@<node_ip>:memory_profile memory_profile
```

注意：将 `<user>` 替换为 SSH 用户名，将 `<node_ip>` 替换为 Kaia 节点的 IP 地址。

## 3\. 内存剖析

如前所述，内存剖析指的是 go pprof 提供的堆信息。 也可以通过 Kaia 节点提供的调试命名空间中的 writeMemProfile 来收集。

```bash
# Using go tool pprof
> go tool pprof http://localhost:6060/debug/pprof/heap
# Using Node Console
> debug.writeMemProfile("mem.profile")
```

内存剖析对于分析内存泄漏等内存相关问题至关重要。 要控制内存剖析的粒度，调整 `MemProfileRate` 变量在此过程中会有所帮助。 应在节点执行过程中尽早设置（例如，在 `main` 函数开始时）。

:::note

Kaia 提供的 `--memprofilerate` 标志可以轻松设置 `MemProfileRate` 变量。 因此，由于它只能作为标志使用，因此必须在启动节点时设置，并且不能通过 API 调用进行更改。

:::

```bash
var MemProfileRate int = 512 * 1024
```

- **设置 `MemProfileRate`:**
  - **配置文件最大分配：** 设置为 `1`。
  - **禁用剖析：** 设置为 "0"。
  - **默认设置：** `512 * 1024`（大约每 512KB 分配一个配置文件）。

**影响：**

- **更高的剖析率（更低的 `MemProfileRate`）：** 增加了粒度，但可能会带来性能开销。
- **降低剖析率（提高 `MemProfileRate`）：** 减少剖析细节，将性能影响降至最低。

**最佳做法：**

- **一致性：** 确保 `MemProfileRate`在整个节点运行期间保持不变，以维护准确的剖析数据。
- **早期配置：** 在程序开始时设置 `MemProfileRate` 以获取一致的剖析信息

## 4\. 分析剖面图

收集剖析数据后，使用 `go tool pprof` 对保存的剖析文件进行分析和可视化。

### 4.1 使用网络界面进行分析

例如，你可以使用 Go 的 pprof 工具直观地分析内存配置文件数据，该工具可通过网络界面直观地显示内存使用情况，如下图所示：

```bash
go tool pprof -http=0.0.0.0:8081 cpu.profile
```

### 4.2 使用命令行进行分析

您还可以使用 Go 的 pprof 工具，在终端的文本界面中分析内存配置文件数据：

```bash
go tool pprof cpu.profile
```

- **常见的 `pprof` 命令：**

  - `top`：显示消耗资源最多的功能。
  - `list <function_name>`: 显示特定函数的注释源代码。
  - `web`：在网络浏览器中生成配置文件的可视化界面。
  - `pdf`：生成 PDF 档案报告。

- **使用示例：**

```bash
go tool pprof cpu.profile
# Inside the pprof interactive shell:
> top
> list main.functionName
> web
```

:::note

确保为 `web` 和 `pdf` 命令安装了 Graphviz，以生成可视化图表。

:::

## 5\. 结论

通过本剖析教程，Kaia 节点操作员可以有效地识别和解决性能瓶颈，优化资源使用，确保节点平稳高效地运行。 定期剖析，再加上强大的监控和日志记录实践，将大大有助于维护区块链网络中 Kaia 节点的可靠性和性能。
