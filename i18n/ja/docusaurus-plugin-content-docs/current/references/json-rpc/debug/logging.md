# Logging

## debug_backtraceAt <a id="debug_backtraceat"></a>

Sets the logging backtrace location. When a backtrace location is set and a log
message is emitted at that location, the stack of the goroutine executing the
log statement will be printed to `stderr`.

|  Client | Method Invocation                                     |
| :-----: | ----------------------------------------------------- |
| Console | `debug.backtraceAt(location)`                         |
|   RPC   | `{"method": "debug_backtraceAt", "params": [string]}` |

**Parameters**

| Name     | Type   | Description                                                      |
| -------- | ------ | ---------------------------------------------------------------- |
| location | string | The logging backtrace location specified as `<filename>:<line>`. |

**Return Value**

None

**Example**

```javascript
> debug.backtraceAt("server.go:443")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_backtraceAt","params":["server.go:443"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_setVMLogTarget <a id="debug_setvmlogtarget"></a>

Sets the output target of vmlog precompiled contract.  When the output target
is a file, logs from `vmlog` calls in smart contracts will be written to
`DATADIR/log/vm.log`.  Here `DATADIR` is the directory specified by `--datadir`
when launching `klay`.  On the other hand, the output target is `stdout`, logs
will be displayed like a debug message on the standard output.

|  Client | Method Invocation                                        |
| :-----: | -------------------------------------------------------- |
| Console | `debug.setVMLogTarget(target)`                           |
|   RPC   | `{"method": "debug_setVMLogTarget", "params": [number]}` |

**Parameters**

| Name   | Type | Description                                                                                                      |
| ------ | ---- | ---------------------------------------------------------------------------------------------------------------- |
| target | int  | The output target (0: no output, 1: file, 2: stdout, 3: both) (default: 0) |

**Return Value**

| Type   | Description                                                              |
| ------ | ------------------------------------------------------------------------ |
| string | The output target.  See the examples below for the actual return values. |

**Example**

Console

```javascript
> debug.setVMLogTarget(0)
"no output"

> debug.setVMLogTarget(1)
"file"

> debug.setVMLogTarget(2)
"stdout"

> debug.setVMLogTarget(3)
"both file and stdout"

> debug.setVMLogTarget(4)
Error: target should be between 0 and 3
    at web3.js:3239:20
    at web3.js:6447:15
    at web3.js:5181:36
    at <anonymous>:1:1
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setVMLogTarget","params":[3],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"both file and stdout"}
```

## debug_verbosity <a id="debug_verbosity"></a>

Sets the logging verbosity ceiling. Log messages with level up to and including
the given level will be printed.

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files
can be raised using `debug_vmodule`.

|  Client | Method Invocation                                 |
| :-----: | ------------------------------------------------- |
| Console | `debug.verbosity(level)`                          |
|   RPC   | `{"method": "debug_vmodule", "params": [number]}` |

**Parameters**

| Name  | Type | Description                  |
| ----- | ---- | ---------------------------- |
| level | int  | The logging verbosity level. |

**Return Value**

None

**Example**

Console

```javascript
> debug.verbosity(3)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosity","params":['3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_verbosityByName <a id="debug_verbositybyname"></a>

Sets the verbosity of log module with given name.
Please note that VerbosityByName only works with zapLogger.

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files
can be raised using `debug_vmodule`.

|  Client | Method Invocation                                                 |
| :-----: | ----------------------------------------------------------------- |
| Console | `debug.verbosityByName(name, level)`                              |
|   RPC   | `{"method": "debug_verbosityByName", "params": [string, number]}` |

**Parameters**

| Name  | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| name  | string | The module name.             |
| level | int    | The logging verbosity level. |

**Return Value**

None

**Example**

Console

```javascript
> debug.verbosityByName("name", 3)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityByName","params":["name", '3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_verbosityByID <a id="debug_verbositybyid"></a>

Sets the verbosity of log module with given ModuleID.
Please note that VerbosityByID only works with zapLogger.

(ModuleID : Please refer to the code on the [github](https://github.com/klaytn/klaytn/blob/dev/log/log_modules.go). )

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files
can be raised using `debug_vmodule`.

|  Client | Method Invocation                                               |
| :-----: | --------------------------------------------------------------- |
| Console | `debug.verbosityByID(id, level)`                                |
|   RPC   | `{"method": "debug_verbosityByID", "params": [number, number]}` |

**Parameters**

| Name  | Type | Description                  |
| ----- | ---- | ---------------------------- |
| id    | int  | The module id.               |
| level | int  | The logging verbosity level. |

**Return Value**

None

**Example**

Console

```javascript
> debug.verbosityById(1, 3)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityById","params":['1',3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_vmodule <a id="debug_vmodule"></a>

Sets the logging verbosity pattern.

|  Client | Method Invocation                                 |
| :-----: | ------------------------------------------------- |
| Console | `debug.vmodule(module)`                           |
|   RPC   | `{"method": "debug_vmodule", "params": [string]}` |

**Parameters**

| Name   | Type   | Description                  |
| ------ | ------ | ---------------------------- |
| module | string | The module name for logging. |

**Return Value**

None

**Example**

Console

If you want to see messages from a particular Go package (directory)
and all subdirectories, use

```javascript
> debug.vmodule("p2p/*=5")
```

If you want to restrict messages to a particular package (_e.g._, p2p)
but exclude subdirectories, use

```javascript
> debug.vmodule("p2p=4")
```

If you want to see log messages from a particular source file, use

```javascript
> debug.vmodule("server.go=3")
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_vmodule","params":["p2p=4"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
