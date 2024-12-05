# 런타임 추적

## debug_goTrace <a id="debug_gotrace"></a>

주어진 기간 동안 Go 런타임 추적을 켜고 디스크에
추적 데이터를 디스크에 씁니다.

| 클라이언트 | 메서드 호출                                                    |
| :---: | --------------------------------------------------------- |
|   콘솔  | `debug.goTrace(file, seconds)`                            |
|  RPC  | `{"method": "debug_goTrace", "params": [string, number]}` |

**매개변수**

| 이름      | 유형     | 설명                              |
| ------- | ------ | ------------------------------- |
| file    | String | 추적 출력의 파일 이름입니다.                |
| seconds | int    | 추적 기간(초)입니다. |

**리턴 값**

없음

**예시**

콘솔

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

지정된 파일에 Go 런타임 트레이스 쓰기를 시작합니다.

| 클라이언트 | 메서드 호출                                                 |
| :---: | ------------------------------------------------------ |
|   콘솔  | `debug.startGoTrace(file)`                             |
|  RPC  | `{"method": "debug_startGoTrace", "params": [string]}` |

**매개변수**

| 이름   | 유형     | 설명               |
| ---- | ------ | ---------------- |
| file | String | 추적 출력의 파일 이름입니다. |

**리턴 값**

없음

**예시**

콘솔

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

Go 런타임 추적 쓰기를 중지합니다.

| 클라이언트 | 메서드 호출                                          |
| :---: | ----------------------------------------------- |
|   콘솔  | `debug.stopGoTrace()`                           |
|  RPC  | `{"method": "debug_stopGoTrace", "params": []}` |

**매개변수**

없음

**리턴 값**

없음

**예시**

콘솔

```javascript
> debug.stopGoTrace()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopGoTrace","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
