# Profiling

## debug_blockProfile <a id="debug_blockprofile"></a>

Turns on block profiling for the given duration and writes profile data to
disk. It uses a profile rate of 1 for most accurate information. If a different
rate is desired, set the rate and write the profile manually using
[debug_writeBlockProfile](#debug_writeblockprofile).

|  Client | Method Invocation                                              |
| :-----: | -------------------------------------------------------------- |
| Console | `debug.blockProfile(file, seconds)`                            |
|   RPC   | `{"method": "debug_blockProfile", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description                            |
| ------- | ------ | -------------------------------------- |
| file    | string | The filename for the profiling result. |
| seconds | int    | The profiling duration in seconds.     |

**Return Value**

None

**Example**

Console

```javascript
> debug.blockProfile("block.profile", 10)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_blockProfile","params":["block.profile", 10],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_cpuProfile <a id="debug_cpuprofile"></a>

Turns on CPU profiling for the given duration and writes profile data to disk.

|  Client | Method Invocation                                            |
| :-----: | ------------------------------------------------------------ |
| Console | `debug.cpuProfile(file, seconds)`                            |
|   RPC   | `{"method": "debug_cpuProfile", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description                            |
| ------- | ------ | -------------------------------------- |
| file    | string | The filename for the profiling result. |
| seconds | int    | The profiling duration in seconds.     |

**Return Value**

None

**Example**

Console

```javascript
> debug.cpuProfile("block.profile", 10)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_cpuProfile","params":["block.profile", 10],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_mutexProfile <a id="debug_mutexprofile"></a>

Turns on mutex profiling for nsec (nanosecond) and writes profile data to file.
It uses a profile rate of 1 for most accurate information. If a different rate is desired, set the rate and write the profile manually.

|  Client | Method Invocation                                              |
| :-----: | -------------------------------------------------------------- |
| Console | `debug.mutexProfile(file, seconds)`                            |
|   RPC   | `{"method": "debug_mutexProfile", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description                            |
| ------- | ------ | -------------------------------------- |
| file    | string | The filename for the profiling result. |
| seconds | int    | The profiling duration in seconds.     |

**Return Value**

None

**Example**

Console

```javascript
> debug.mutexProfile("mutex.profile", 10)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_mutexProfile","params":["mutex.profile", 10],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_isPProfRunning <a id="debug_ispprofrunning"></a>

Returns `true` if the pprof HTTP server is running and `false` otherwise.

|  Client | Method Invocation                                  |
| :-----: | -------------------------------------------------- |
| Console | `debug.isPProfRunning()`                           |
|   RPC   | `{"method": "debug_isPProfRunning", "params": []}` |

**Parameters**

None

**Return Value**

| Type | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| bool | `true` if the pprof HTTP server is running and `false` otherwise. |

**Example**

Console

```javascript
> debug.isPProfRunning()
false
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_isPProfRunning","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## debug_setBlockProfileRate <a id="debug_setblockprofilerate"></a>

Sets the rate (in samples/sec) of goroutine block profile data collection. A
non-zero rate enables block profiling, setting it to zero stops the profile.
Collected profile data can be written using
[debug_writeBlockProfile](#debug_writeblockprofile).

|  Client | Method Invocation                                             |
| :-----: | ------------------------------------------------------------- |
| Console | `debug.setBlockProfileRate(rate)`                             |
|   RPC   | `{"method": "debug_setBlockProfileRate", "params": [number]}` |

**Parameters**

| Name | Type | Description                        |
| ---- | ---- | ---------------------------------- |
| rate | int  | The profiling rate in samples/sec. |

**Return Value**

None

**Example**

Console

```javascript
> debug.setBlockProfileRate(1)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setBlockProfileRate","params":['3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startCPUProfile <a id="debug_startcpuprofile"></a>

Turns on CPU profiling indefinitely, writing to the given file.

|  Client | Method Invocation                                         |
| :-----: | --------------------------------------------------------- |
| Console | `debug.startCPUProfile(file)`                             |
|   RPC   | `{"method": "debug_startCPUProfile", "params": [string]}` |

**Parameters**

| Name | Type   | Description                            |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console

```javascript
> debug.startCPUProfile("cpu.profile")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startCPUProfile","params":["cpu.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_stopCPUProfile <a id="debug_stopcpuprofile"></a>

Turns off CPU profiling.

|  Client | Method Invocation                                  |
| :-----: | -------------------------------------------------- |
| Console | `debug.stopCPUProfile()`                           |
|   RPC   | `{"method": "debug_stopCPUProfile", "params": []}` |

**Parameters**

None

**Return Value**

None

**Example**

Console

```javascript
> debug.stopCPUProfile()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopCPUProfile","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startPProf <a id="debug_startpprof"></a>

Starts the pprof HTTP server.  The running pprof server can be accessed by
(when the default configuration, i.e., localhost:6060, is used):

- http\://localhost:6060/debug/pprof (for the pprof results)
- http\://localhost:6060/memsize/ (for the memory size reports)
- http\://localhost:6060/debug/vars (for the metrics)

|  Client | Method Invocation                                            |
| :-----: | ------------------------------------------------------------ |
| Console | `debug.startPProf(address, port)`                            |
|   RPC   | `{"method": "debug_startPProf", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description                                                                                                    |
| ------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| address | string | (optional) pprof HTTP server listening interface (default: "127.0.0.1"). |
| port    | int    | (optional) pprof HTTP server listening port (default: 6060).             |

**Return Value**

None

**Example**

Console

```javascript
# To start the pprof server at 127.0.0.1:6060
> debug.startPProf()
null

# To start the pprof server at localhost:12345
> debug.startPProf("localhost", 12345)
null
```

HTTP RPC

```shell
# To start the pprof server at localhost:6060
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startPProf","params":["localhost", 6060],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_stopPProf <a id="debug_stoppprof"></a>

Stops the pprof HTTP server.

|  Client | Method Invocation                             |
| :-----: | --------------------------------------------- |
| Console | `debug.stopPProf()`                           |
|   RPC   | `{"method": "debug_stopPProf", "params": []}` |

**Parameters**

None

**Return Value**

None

**Example**

Console

```javascript
> debug.stopPProf()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopPProf","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_writeBlockProfile <a id="debug_writeblockprofile"></a>

Writes a goroutine blocking profile to the given file.

|  Client | Method Invocation                                           |
| :-----: | ----------------------------------------------------------- |
| Console | `debug.writeBlockProfile(file)`                             |
|   RPC   | `{"method": "debug_writeBlockProfile", "params": [string]}` |

**Parameters**

| Name | Type   | Description                            |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console

```javascript
> debug.writeBlockProfile("block.profile")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeBlockProfile","params":["block.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_writeMemProfile <a id="debug_writememprofile"></a>

Writes an allocation profile to the given file.  Note that the profiling rate
cannot be set through the API, it must be set on the command line using the
`--memprofilerate` flag.

|  Client | Method Invocation                                         |
| :-----: | --------------------------------------------------------- |
| Console | `debug.writeMemProfile(file)`                             |
|   RPC   | `{"method": "debug_writeMemProfile", "params": [string]}` |

**Parameters**

| Name | Type   | Description                            |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console

```javascript
> debug.writeMemProfile("mem.profile")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMemProfile","params":["mem.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_writeMutexProfile <a id="debug_writemutexprofile"></a>

Writes a goroutine blocking profile to the given file.

|  Client | Method Invocation                                           |
| :-----: | ----------------------------------------------------------- |
| Console | `debug.writeMutexProfile(file)`                             |
|   RPC   | `{"method": "debug_writeMutexProfile", "params": [string]}` |

**Parameters**

| Name | Type   | Description                            |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console

```javascript
> debug.writeMutexProfile("mutex.profile")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMutexProfile","params":["mutex.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
