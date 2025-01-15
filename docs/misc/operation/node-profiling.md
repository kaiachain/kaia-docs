# Profile Node Data

Profiling is an essential tool for understanding and optimizing the performance of Kaia nodes. This tutorial will guide you through various profiling techniques available for Kaia node operators, leveraging Kaia's debug API and the `net/http/pprof` Go package.

## Prerequisites

Before you begin, ensure that:

- **Node Setup:** Your Kaia node is correctly installed and running.  
    
- **Access to Node Console:** You'll need to interact with the node either via [the node console](../../nodes/endpoint-node/ken-cli-commands.md#javascript-console).
    
- **Tools:** Go is installed on your system to use `go tool pprof` and `go tool trace`. You can verify by running:

```bash
go version
```

## 1\. Managing Profiling: How to Start, Stop, and Check Status

Kaia nodes provide a `debug` API that offers several profiling methods. You can interact with these methods via the node's console or through [JSON-RPC API calls](https://docs.kaia.io/references/json-rpc/debug/start-p-prof/).

### 1.1 Starting the pprof HTTP Server

The pprof HTTP server allows you to collect and analyze profiling data efficiently.

```bash
# Start pprof server with default settings (localhost:6060)
> debug.startPProf()

# Start pprof server on a specific address and port
> debug.startPProf("localhost", 8080)
```

#### Accessing pprof Endpoints

Once the pprof server is running, access the profiling data at:

- [http://localhost:6060/debug/pprof/](http://localhost:6060/debug/pprof/) — Overview of available profiles.  
- [http://localhost:6060/memsize/](http://localhost:6060/memsize/) — Memory size reports.  
- [http://localhost:6060/debug/vars](http://localhost:6060/debug/vars) — Exporter for Prometheus metrics.

### 1.2 Stopping the pprof HTTP Server

```bash
> debug.stopPProf()
```

### 1.3 Checking if pprof is Running

```bash
> debug.isPProfRunning()
true  # if running
false # if not running
```

## 2\. Collecting Profiles

Once the pprof server is running, you can collect various profiles by using several methods to analyze your node's performance.

### 2.1 Collect Using Web Interface

Enter the respective endpoints in your web browser to collect different profiles as shown in the following examples:

**Collect heap profile**

`http://localhost:6060/debug/pprof/heap`

**Collect 30-second CPU profile**

`http://localhost:6060/debug/pprof/profile?seconds=30`

**Collect goroutine profile with debug=2**

`http://localhost:6060/debug/pprof/goroutine?debug=2`

### 2.2 Collect Using API Calls

Type the respective commands in the node console to collect or configure profiles as shown in the following examples:

```bash
# Collect 30-second CPU profile
> debug.cpuProfile("cpu.profile", 30)

# Collect 30-second block profile
> debug.blockProfile("block.profile", 30)

# Set mutex profiling fraction
> debug.setMutexProfileFraction(1)
```

### 2.3 Collect Using `go tool pprof`

If you cannot access the pprof web interface, you can generate and analyze profiling results locally using `go tool pprof`.

#### Identify Available Profile Types

The supported profiles include:

- `allocs`: A sampling of all past memory allocations.  
- `block`: Stack traces that led to blocking on synchronization primitives.  
- `goroutine`: Stack traces of all current goroutines. Use `debug=2` as a query parameter to export in the same format as an unrecovered panic.  
- `heap`: A sampling of memory allocations of live objects. You can specify the `gc` GET parameter to run garbage collection before taking the heap sample.  
- `mutex`: Stack traces of holders of contended mutexes.  
- `profile`: CPU profile. You can specify the duration in the `seconds` GET parameter. After you get the profile file, use the `go tool pprof` command to investigate the profile.  
- `threadcreate`: Stack traces that led to the creation of new OS threads.  
- `trace`: A trace of execution of the current program. You can specify the duration in the `seconds` GET parameter. After you get the trace file, use the `go tool trace` command to investigate the trace.

#### Collect Profiles Using `go tool pprof`

```bash
go tool pprof http://localhost:6060/debug/pprof/<profiletype>
```

Replace `<profiletype>` with one of the supported profiles listed above (e.g., `heap`, `profile`).

#### Example Commands

```bash
# Collect heap profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Collect 30-second CPU profile
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Collect goroutine profile with debug=2
go tool pprof http://localhost:6060/debug/pprof/goroutine?debug=2
```

#### Generating Text Profiling Files

To generate text-based profiling reports, use the `-text` option with `go tool pprof`.

```bash
# Generate text-based CPU profile
go tool pprof -text cpu.profile
```

#### pprof Extra Options

Profiling can be customized further using additional query parameters and options when collecting profiles.

- **Response Format (`debug=N`):**  
    
  - **Binary Format (Default):** `N = 0`  
  - **Plaintext Format:** `N > 0`


  **Example:**

```bash
go tool pprof http://localhost:6060/debug/pprof/allocs?debug=1
```

- **Garbage Collection (`gc=N`):**  
    
  - **Run GC Before Profiling:** Set `gc=1` to trigger a garbage collection cycle before capturing a heap profile.


  **Example:**

```bash
go tool pprof http://localhost:6060/debug/pprof/heap?gc=1
```

- **Duration Parameters (`seconds=N`):**  
    
  - **Allocations, Block, Goroutine, Heap, Mutex, Threadcreate Profiles:**  
      
    - `seconds=N` returns a delta profile based on the given duration.

    

  - **CPU Profile and Trace Profiles:**  
      
    - `seconds=N` specifies the duration for which the CPU profile or trace should run.


  **Example:**

```bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
```

### 2.4 Collect Without Go Installed

If your program hasn’t installed Go (you can check by running `go version`), follow these steps to download and save profiling data locally:

1. Download the Profile File Using `wget`.

```bash
wget -O memory_profile http://localhost:6060/debug/pprof/heap
```

2. Transfer the Profile File to Your Local Machine Using `scp`.

```bash
scp <user>@<node_ip>:memory_profile memory_profile
```

NOTE: Replace `<user>` with your SSH username and `<node_ip>` with the IP address of your Kaia node.

## 3\. Memory Profiling

As mentioned earlier, memory profiling refers to the heap information provided by go pprof. It can also be collected through writeMemProfile in the debug namespace offered by the Kaia node.

```bash
# Using go tool pprof
> go tool pprof http://localhost:6060/debug/pprof/heap
# Using Node Console
> debug.writeMemProfile("mem.profile")
```

Profiling memory is crucial for analyzing memory-related issues, such as memory leaks. To control the granularity of memory profiling, adjusting the `MemProfileRate` variable can be helpful in this process. This should be set as early as possible in your node's execution (e.g., at the beginning of the `main` function).

:::note

Kaia provides the `--memprofilerate` flag which can set the `MemProfileRate` variable easily. Therefore, since it is only available as a flag, it must be set when starting the node, and cannot be changed via the API call.

:::

```bash
var MemProfileRate int = 512 * 1024
```

- **Set `MemProfileRate`:**  
  - **Profile Maximum Allocations:** Set to `1`.  
  - **Disable Profiling:** Set to `0`.  
  - **Default Setting:** `512 * 1024` (profiles approximately one allocation per 512KB).

**Impact:**

- **Higher Profiling Rate (Lower `MemProfileRate`):** Increases the granularity but may introduce performance overhead.  
- **Lower Profiling Rate (Higher `MemProfileRate`):** Reduces profiling detail, minimizing performance impact.

**Best Practice:**

- **Consistency:** Ensure that `MemProfileRate` remains constant throughout the node's runtime to maintain accurate profiling data.  
- **Early Configuration:** Set `MemProfileRate` at the very start of the program to capture consistent profiling information

## 4\. Analyzing Profiles

After collecting profiling data, use `go tool pprof` to analyze and visualize the saved profile files.

### 4.1 Analyze Using Web Interface

For example, you can analyze memory profile data visually using Go’s pprof tool, which provides a visual representation of memory usage through a web interface as shown below:

```bash
go tool pprof -http=0.0.0.0:8081 cpu.profile
```

### 4.2 Analyze Using Command Line

You can also analyze memory profile data using Go’s pprof tool in a text-based interface within the terminal:

```bash
go tool pprof cpu.profile
```

- **Common `pprof` Commands:**  
    
  - `top`: Display the top functions consuming resources.  
  - `list <function_name>`: Show annotated source code for a specific function.  
  - `web`: Generate a visualization of the profile in your web browser.  
  - `pdf`: Generate a PDF report of the profile.


- **Example Usage:**

```bash
go tool pprof cpu.profile
# Inside the pprof interactive shell:
> top
> list main.functionName
> web
```

:::note

Ensure you have Graphviz installed for the `web` and `pdf` commands to generate visual graphs.

:::

## 5\. Conclusion

By following this profiling tutorial, Kaia node operators can effectively identify and address performance bottlenecks, optimize resource usage, and ensure the smooth and efficient operation of their nodes. Regular profiling, combined with robust monitoring and logging practices, will contribute significantly to maintaining the reliability and performance of your Kaia node within the blockchain network.  
