# Runtime Tracing

## debug_goTrace <a id="debug_gotrace"></a>

Turns on Go runtime tracing for the given duration and writes
trace data to disk.

|  Client | Method Invocation                                         |
| :-----: | --------------------------------------------------------- |
| Console | `debug.goTrace(file, seconds)`                            |
|   RPC   | `{"method": "debug_goTrace", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description                        |
| ------- | ------ | ---------------------------------- |
| file    | string | The filename for the trace output. |
| seconds | int    | The tracing duration in seconds.   |

**Return Value**

None

**Example**

Console

```javascript
> debug.goTrace("go.trace", 5)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_goTrace","params":["go.trace",5],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startGoTrace <a id="debug_startgotrace"></a>

Starts writing a Go runtime trace to the given file.

|  Client | Method Invocation                                      |
| :-----: | ------------------------------------------------------ |
| Console | `debug.startGoTrace(file)`                             |
|   RPC   | `{"method": "debug_startGoTrace", "params": [string]}` |

**Parameters**

| Name | Type   | Description                          |
| ---- | ------ | ------------------------------------ |
| file | string | The filename for the tracing output. |

**Return Value**

None

**Example**

Console

```javascript
> debug.startGoTrace("go.trace")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startGoTrace","params":["go.trace"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_stopGoTrace <a id="debug_stopgotrace"></a>

Stops writing the Go runtime trace.

|  Client | Method Invocation                               |
| :-----: | ----------------------------------------------- |
| Console | `debug.stopGoTrace()`                           |
|   RPC   | `{"method": "debug_stopGoTrace", "params": []}` |

**Parameters**

None

**Return Value**

None

**Example**

Console

```javascript
> debug.stopGoTrace()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopGoTrace","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
