# 로깅

## debug_backtraceAt <a id="debug_backtraceat"></a>

로깅 백트레이스 위치를 설정합니다. 백트레이스 위치가 설정되고 해당 위치에서 로그
메시지가 해당 위치에서 발생하면, 해당 go루틴을 실행하는 go루틴의 스택이
로그 문을 실행하는 go루틴의 스택이 `stderr`에 출력됩니다.

| 클라이언트 | 메서드 호출                                                |
| :---: | ----------------------------------------------------- |
|   콘솔  | `debug.backtraceAt(location)`                         |
|  RPC  | `{"method": "debug_backtraceAt", "params": [string]}` |

**매개변수**

| 이름       | 유형     | 설명                                       |
| -------- | ------ | ---------------------------------------- |
| location | string | `<filename>:<line>`로 지정된 로깅 백트레이스 위치입니다. |

**리턴 값**

없음

**예시**

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

vmlog 사전 컴파일된 컨트랙트의 출력 대상을 설정합니다.  출력 대상이
가 파일일 경우, 스마트 컨트랙트에서 `vmlog` 호출의 로그가
`DATADIR/log/vm.log`에 기록됩니다.  여기서 `DATADIR`은 `klay`를 실행할 때 `--datadir`로 지정한 디렉터리입니다.  반면에 출력 대상은 `stdout`이며, 로그는
는 표준 출력에 디버그 메시지처럼 표시됩니다.

| 클라이언트 | 메서드 호출                                                   |
| :---: | -------------------------------------------------------- |
|   콘솔  | `debug.setVMLogTarget(target)`                           |
|  RPC  | `{"method": "debug_setVMLogTarget", "params": [number]}` |

**매개변수**

| 이름     | 유형  | 설명                                                                                              |
| ------ | --- | ----------------------------------------------------------------------------------------------- |
| target | int | 출력 대상(0: no output, 1: file, 2: stdout, 3: both) (기본값: 0) |

**리턴 값**

| 유형     | 설명                                |
| ------ | --------------------------------- |
| string | 출력 대상입니다.  실제 반환 값은 아래 예시를 참조하세요. |

**예시**

콘솔

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

로깅 상세도 상한을 설정합니다. 지정된 수준까지의 로그 메시지는
까지의 로그 메시지는 지정된 수준까지만 인쇄됩니다.

(레벨: 0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

개별 패키지와 소스 파일의 상세도는
를 사용하여 상세도를 높일 수 있습니다.

| 클라이언트 | 메서드 호출                                            |
| :---: | ------------------------------------------------- |
|   콘솔  | `debug.verbosity(level)`                          |
|  RPC  | `{"method": "debug_vmodule", "params": [number]}` |

**매개변수**

| 이름    | 유형  | 설명            |
| ----- | --- | ------------- |
| level | int | 로깅 상세도 수준입니다. |

**리턴 값**

없음

**예시**

콘솔

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

주어진 이름으로 로그 모듈의 상세도를 설정합니다.
VerbosityByName은 zapLogger에서만 작동한다는 점에 유의하세요.

(레벨: 0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

개별 패키지와 소스 파일의 상세도는
를 사용하여 상세도를 높일 수 있습니다.

| 클라이언트 | 메서드 호출                                                            |
| :---: | ----------------------------------------------------------------- |
|   콘솔  | `debug.verbosityByName(name, level)`                              |
|  RPC  | `{"method": "debug_verbosityByName", "params": [string, number]}` |

**매개변수**

| 이름    | 유형     | 설명            |
| ----- | ------ | ------------- |
| name  | string | 모듈 이름입니다.     |
| level | int    | 로깅 상세도 수준입니다. |

**리턴 값**

없음

**예시**

콘솔

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

주어진 ModuleID를 가진 로그 모듈의 상세도를 설정합니다.
VerbosityByID는 zapLogger에서만 작동한다는 점에 유의하세요.

(ModuleID : [github](https://github.com/klaytn/klaytn/blob/dev/log/log_modules.go)의 코드를 참조하세요. )

(레벨: 0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

개별 패키지와 소스 파일의 상세도는
를 사용하여 상세도를 높일 수 있습니다.

| 클라이언트 | 메서드 호출                                                          |
| :---: | --------------------------------------------------------------- |
|   콘솔  | `debug.verbosityByID(id, level)`                                |
|  RPC  | `{"method": "debug_verbosityByID", "params": [number, number]}` |

**매개변수**

| 이름    | 유형  | 설명            |
| ----- | --- | ------------- |
| id    | int | 모듈 ID입니다.     |
| level | int | 로깅 상세도 수준입니다. |

**리턴 값**

없음

**예시**

콘솔

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

로깅 상세도 패턴을 설정합니다.

| 클라이언트 | 메서드 호출                                            |
| :---: | ------------------------------------------------- |
|   콘솔  | `debug.vmodule(module)`                           |
|  RPC  | `{"method": "debug_vmodule", "params": [string]}` |

**매개변수**

| 이름     | 유형     | 설명            |
| ------ | ------ | ------------- |
| module | string | 로깅할 모듈 이름입니다. |

**리턴 값**

없음

**예시**

콘솔

특정 Go 패키지(디렉터리)의 메시지를 보려면
및 모든 하위 디렉터리에서 메시지를 보려면

```javascript
> debug.vmodule("p2p/*=5")
```

특정 패키지(\*예: P2P)로만 메시지를 제한하고 싶지만
하위 디렉터리를 제외하려면

```javascript
> debug.vmodule("p2p=4")
```

특정 소스 파일의 로그 메시지를 보려면 다음을 사용하세요.

```javascript
> debug.vmodule("server.go=3")
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_vmodule","params":["p2p=4"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
