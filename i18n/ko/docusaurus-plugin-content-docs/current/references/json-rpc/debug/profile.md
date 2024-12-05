# 프로파일링

## debug_blockProfile <a id="debug_blockprofile"></a>

지정된 기간 동안 블록 프로파일링을 켜고 프로파일 데이터를
디스크에 기록합니다. 가장 정확한 정보를 위해 프로파일 속도 1을 사용합니다. 다른
속도를 원하는 경우, 속도를 설정하고 다음을 사용하여 수동으로 프로파일을 작성합니다.

| 클라이언트 | 메서드 호출                                                         |
| :---: | -------------------------------------------------------------- |
|   콘솔  | `debug.blockProfile(file, seconds)`                            |
|  RPC  | `{"method": "debug_blockProfile", "params": [string, number]}` |

**매개변수**

| 이름      | 유형     | 설명                                 |
| ------- | ------ | ---------------------------------- |
| file    | String | 프로파일링 결과의 파일 이름입니다.                |
| seconds | int    | 프로파일링 기간(초)입니다. |

**리턴 값**

없음

**예시**

콘솔

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

지정된 기간 동안 CPU 프로파일링을 켜고 프로파일 데이터를 디스크에 씁니다.

| 클라이언트 | 메서드 호출                                                       |
| :---: | ------------------------------------------------------------ |
|   콘솔  | `debug.cpuProfile(file, seconds)`                            |
|  RPC  | `{"method": "debug_cpuProfile", "params": [string, number]}` |

**매개변수**

| 이름      | 유형     | 설명                                 |
| ------- | ------ | ---------------------------------- |
| file    | String | 프로파일링 결과의 파일 이름입니다.                |
| seconds | int    | 프로파일링 기간(초)입니다. |

**리턴 값**

없음

**예시**

콘솔

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

nsec(나노초) 동안 뮤텍스 프로파일링을 켜고 프로파일 데이터를 파일에 씁니다.
가장 정확한 정보를 위해 프로파일 속도 1을 사용합니다. 다른 속도를 원하면 속도를 설정하고 프로필을 수동으로 작성합니다.

| 클라이언트 | 메서드 호출                                                         |
| :---: | -------------------------------------------------------------- |
|   콘솔  | `debug.mutexProfile(file, seconds)`                            |
|  RPC  | `{"method": "debug_mutexProfile", "params": [string, number]}` |

**매개변수**

| 이름      | 유형     | 설명                                 |
| ------- | ------ | ---------------------------------- |
| file    | String | 프로파일링 결과의 파일 이름입니다.                |
| seconds | int    | 프로파일링 기간(초)입니다. |

**리턴 값**

없음

**예시**

콘솔

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

pprof HTTP 서버가 실행 중이면 `true`를 반환하고 그렇지 않으면 `false`를 반환합니다.

| 클라이언트 | 메서드 호출                                             |
| :---: | -------------------------------------------------- |
|   콘솔  | `debug.isPProfRunning()`                           |
|  RPC  | `{"method": "debug_isPProfRunning", "params": []}` |

**매개변수**

없음

**리턴 값**

| 유형   | 설명                                                |
| ---- | ------------------------------------------------- |
| bool | pprof HTTP 서버가 실행 중이면 `true`, 그렇지 않으면 `false`입니다. |

**예시**

콘솔

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

go루틴 블록 프로파일 데이터 수집 속도(샘플/초)를 설정합니다. A
로 설정하면 블록 프로파일링이 활성화되고, 0으로 설정하면 프로파일링이 중지됩니다.
[debug_writeBlockProfile](#debug_writeblockprofile).

| 클라이언트 | 메서드 호출                                                        |
| :---: | ------------------------------------------------------------- |
|   콘솔  | `debug.setBlockProfileRate(rate)`                             |
|  RPC  | `{"method": "debug_setBlockProfileRate", "params": [number]}` |

**매개변수**

| 이름   | 유형  | 설명                    |
| ---- | --- | --------------------- |
| rate | int | 샘플/초 단위의 프로파일링 속도입니다. |

**리턴 값**

없음

**예시**

콘솔

```javascript
> debug.setBlockProfileRate(1)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setBlockProfileRate","params":['3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startCPU프로파일 <a id="debug_startcpuprofile"></a>

CPU 프로파일링을 무기한으로 켜고 지정된 파일에 기록합니다.

| 클라이언트 | 메서드 호출                                                    |
| :---: | --------------------------------------------------------- |
|   콘솔  | `debug.startCPUProfile(file)`                             |
|  RPC  | `{"method": "debug_startCPUProfile", "params": [string]}` |

**매개변수**

| 이름   | 유형     | 설명                  |
| ---- | ------ | ------------------- |
| file | String | 프로파일링 출력의 파일 이름입니다. |

**리턴 값**

없음

**예시**

콘솔

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

CPU 프로파일링을 끕니다.

| 클라이언트 | 메서드 호출                                             |
| :---: | -------------------------------------------------- |
|   콘솔  | `debug.stopCPUProfile()`                           |
|  RPC  | `{"method": "debug_stopCPUProfile", "params": []}` |

**매개변수**

없음

**리턴 값**

없음

**예시**

콘솔

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

pprof HTTP 서버를 시작합니다.  실행 중인 pprof 서버는 다음 방법으로 액세스할 수 있습니다.

- http\://localhost:6060/debug/pprof(pprof 결과)
- http\://localhost:6060/memsize/(메모리 크기 보고서용)
- http\://localhost:6060/debug/vars (메트릭)

| 클라이언트 | 메서드 호출                                                       |
| :---: | ------------------------------------------------------------ |
|   콘솔  | `debug.startPProf(address, port)`                            |
|  RPC  | `{"method": "debug_startPProf", "params": [string, number]}` |

**매개변수**

| 이름      | 유형     | 설명                                                                                      |
| ------- | ------ | --------------------------------------------------------------------------------------- |
| address | String | (선택 사항) pprof HTTP 서버 수신 인터페이스(기본값: "127.0.0.1"). |
| port    | int    | (선택 사항) pprof HTTP 서버 수신 포트(기본값: 6060).           |

**리턴 값**

없음

**예시**

콘솔

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

pprof HTTP 서버를 중지합니다.

| 클라이언트 | 메서드 호출                                        |
| :---: | --------------------------------------------- |
|   콘솔  | `debug.stopPProf()`                           |
|  RPC  | `{"method": "debug_stopPProf", "params": []}` |

**매개변수**

없음

**리턴 값**

없음

**예시**

콘솔

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

지정된 파일에 go루틴 차단 프로필을 씁니다.

| 클라이언트 | 메서드 호출                                                      |
| :---: | ----------------------------------------------------------- |
|   콘솔  | `debug.writeBlockProfile(file)`                             |
|  RPC  | `{"method": "debug_writeBlockProfile", "params": [string]}` |

**매개변수**

| 이름   | 유형     | 설명                  |
| ---- | ------ | ------------------- |
| file | String | 프로파일링 출력의 파일 이름입니다. |

**리턴 값**

없음

**예시**

콘솔

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

지정된 파일에 할당 프로파일을 씁니다.  프로파일링 속도
은 API를 통해 설정할 수 없으며 명령줄에서
`--memprofilerate` 플래그를 사용하여 명령줄에서 설정해야 합니다.

| 클라이언트 | 메서드 호출                                                    |
| :---: | --------------------------------------------------------- |
|   콘솔  | `debug.writeMemProfile(file)`                             |
|  RPC  | `{"method": "debug_writeMemProfile", "params": [string]}` |

**매개변수**

| 이름   | 유형     | 설명                  |
| ---- | ------ | ------------------- |
| file | String | 프로파일링 출력의 파일 이름입니다. |

**리턴 값**

없음

**예시**

콘솔

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

지정된 파일에 go루틴 차단 프로필을 씁니다.

| 클라이언트 | 메서드 호출                                                      |
| :---: | ----------------------------------------------------------- |
|   콘솔  | `debug.writeMutexProfile(file)`                             |
|  RPC  | `{"method": "debug_writeMutexProfile", "params": [string]}` |

**매개변수**

| 이름   | 유형     | 설명                  |
| ---- | ------ | ------------------- |
| file | String | 프로파일링 출력의 파일 이름입니다. |

**리턴 값**

없음

**예시**

콘솔

```javascript
> debug.writeMutexProfile("mutex.profile")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMutexProfile","params":["mutex.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
