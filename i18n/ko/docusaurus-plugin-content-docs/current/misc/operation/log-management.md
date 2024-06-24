# 로그 작업

## 로그 로테이션 구성

`--log.rotate` 플래그를 설정하여 로그 로테이션을 활성화할 수 있으며, 다음 플래그를 통해 로그 로테이션 설정을 구성할 수 있습니다.

- `--log.rotate`: 이 플래그를 설정하면 로그 로테이션을 사용하도록 설정하고 다른 로그 로테이션 옵션을 적용합니다.
- `--log.maxsize`: 백업 파일 생성을 트리거하는 파일 크기(MB)를 지정합니다.
- `--log.maxbackups`: 저장할 수 있는 최대 백업 파일 수를 결정합니다. 이 제한에 도달하면 이전 로그는 삭제됩니다.
- `--log.maxage`: 로그 파일을 보관할 수 있는 최대 일수를 나타냅니다. 예를 들어 30일로 설정하면 백업 파일은 30일 후에 삭제됩니다.
- `--log.compress`: 이 플래그를 설정하면 백업 로그를 gz 형식으로 압축합니다.

예제

```
./bin/ken ... --log.rotate --log.maxsize 100 --log.maxbackups 10 --log.maxage 30 --log.compress
```

구성 파일(예: `kend.conf`)에서 다음 옵션을 설정하여 로그 로테이션을 활성화하고 구성할 수도 있습니다.

```
# log rotation related options
LOG_ROTATE=1 # setting 1 to enable the log rotation related options
LOG_MAXSIZE=100 # the unit is MB
LOG_MAXBACKUPS=10
LOG_MAXAGE=30 # maximum number of days to retain a log file
LOG_COMPRESS=1 # setting 1 to compress the backup logs in gz format
```

버전이 v1.11.0 이상인 패키지를 다운로드하여 사용하는 것을 권장합니다. 릴리스 노트의 바이너리 섹션에서 다운로드할 수 있습니다(예: [v1.11.0 릴리스 노트](https://github.com/klaytn/klaytn/releases/tag/v1.11.0)). 다음 세 개의 파일이 v1.11.0 이상인지 확인하세요: 구성 파일, 데몬, 바이너리. 그렇지 않으면 작동하지 않습니다.

## 정상 로그 상태

| 유형                                                          | message                                                                                                                                                                                                                                                                                    | 설명                                                                                                                                                                                          |    |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -- |
| Error                                                       | FastWebsocketHandler fail to upgrade message                                                                                                                                                                                                                                               | 웹소켓 연결의 버전 문제                                                                                                                                                                               | 낮음 |
| Error                                                       | invalid index of the proposer                                                                                                                                                                                                                                                              | EN이 CN으로부터 트랜잭션을 수신할 때 발생하는 오류                                                                                                                                                              | 낮음 |
| WARN                                                        | ProtocolManager failed to read msg                                                                                                                                                                                                                                                         |                                                                                                                                                                                             | 낮음 |
| WARN                                                        | Failed doConnTypeHandshake                                                                                                                                                                                                                                                                 |                                                                                                                                                                                             | 낮음 |
| ERRORErro                                                   | Protocol istanbul/64 failed                                                                                                                                                                                                                                                                | 피어 연결 끊김                                                                                                                                                                                    | 낮음 |
| Error                                                       | Fasthttp Err                                                                                                                                                                                                                                                                               | 연결 제공 시 오류: 읽은 내용이 없는 읽기 시간 초과                                                                                                                                              | 낮음 |
| Error                                                       | Fasthttp Err                                                                                                                                                                                                                                                                               | 연결 제공 중 오류: 요청 헤더를 읽을 때 오류: "\x16..."에서 http 요청 메서드를 찾을 수 없음                                                | 낮음 |
| Warn                                                        | hash=b1b26c…6b220a err="insufficient balance for transfer"                                                                                                                                                                                                                                 | 이 로그는 "from account"의 잔액이 부족하여 처리한 트랜잭션(보통 채굴)을 실행할 수 없을 때 발생합니다(이론적으로는 트랜잭션을 생성하여 txpool에 입력할 당시에는 잔액이 충분했지만 실제 실행 시점에 잔액이 없을 때 발생). | 낮음 |
| ERROR                                                       | ERROR\[06/06,23:23:46 Z] \[7] decode anchor payload err="rlp: expected input list for types.AnchoringDataLegacy" | 앵커링 tx의 데이터 필드에는 어떤 유형의 값도 포함될 수 있습니다. 그러나 잘못된 유형의 값을 입력하면 오류 로그가 노드에 출력됩니다.                                                                                |    |
| Proposer : `Successfully wrote mined block` |                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                             |    |

제안자가 아닌 `새 블록 삽입`

## 로그 레벨 변경 (0\~5)

카이아 콘솔로 이동

```
#default Value
> debug.verbosity(3)
# hight detail logs Value
> debug.verbosity(5)
# No Logs Value
> debug.verbosity(0)

# Default Value for Blockchain log
> debug.vmodule("blockchain=3")
# High detail Value for Blockchain Log
> debug.vmodule("blockchain=5")

```
