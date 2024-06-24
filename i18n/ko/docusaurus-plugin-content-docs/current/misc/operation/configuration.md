# 노드 구성

이 문서는 노드의 구성 가능한 속성에 대해 설명합니다. Kaia 노드 패키지는 기본값이 잘 설정된 상태로 제공되며 구성이 거의 필요하지 않습니다. 실행 중인 노드의 설정을 변경한 경우 변경 사항을 반영하려면 노드를 재시작해야 합니다.

## CN 구성 파일 위치 <a id="cn-configuration-file-location"></a>

- 컨센서스 노드 구성을 위한 `kcnd.conf`

구성 파일은 `conf` 디렉터리에 있으며, 기본 위치는 아카이브 배포 (`tar.gz`) 또는 패키지 배포 (RPM)에서 설치했는지 여부에 따라 달라집니다.

- 아카이브 배포의 경우, 설정 디렉터리 위치는 기본적으로 `$INSTALL_PATH/kcn-linux-amd64/conf/`입니다.
- 패키지 배포의 경우, 설정 디렉터리의 기본 위치는 `/etc/kcnd/conf/`입니다.

## PN 구성 파일 위치 <a id="pn-configuration-file-location"></a>

- 프록시 노드 구성을 위한 `kpnd.conf`

구성 파일은 `conf` 디렉터리에 있으며, 기본 위치는 아카이브 배포 (`tar.gz`) 또는 패키지 배포 (RPM)에서 설치했는지 여부에 따라 달라집니다.

- 아카이브 배포의 경우, 설정 디렉터리 위치는 기본적으로 `$INSTALL_PATH/kpn-linux-amd64/conf/`입니다.
- 패키지 배포의 경우, 설정 디렉터리의 기본 위치는 `/etc/kpnd/conf/`입니다.

## EN 구성 파일 위치 <a id="configuration-file-location"></a>

- 엔드포인트 노드 구성을 위한 `kend.conf`

구성 파일은 `conf` 디렉터리에 있으며, 기본 위치는 아카이브 배포 (`tar.gz`) 또는 패키지 배포 (RPM)에서 설치했는지 여부에 따라 달라집니다.

- 아카이브 배포의 경우, 설정 디렉터리 위치는 기본적으로 `$INSTALL_PATH/ken-linux-amd64/conf/`입니다.
- 패키지 배포의 경우, 설정 디렉터리의 기본 위치는 `/etc/kend/conf/`입니다.

## 구성 파일 형식 <a id="configuration-file-format"></a>

CN과 PN은 구성 파일 형식과 속성이 동일합니다.

아래는 'Mainnet' 네트워크에 참여하여 블록체인 데이터를 기본 위치에 저장하는 CN의 샘플 구성 파일로, 아카이브 배포는 `~/kcnd_home`, 패키지 배포는 `/var/kcnd/data`입니다.

```text
# Configuration file for the kcnd

# mainnet, kairos is only available if you don't specify NETWORK_ID.
NETWORK="mainnet"
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
PORT=32323
SERVER_TYPE="fasthttp"
SYNCMODE="full"
VERBOSITY=3
MAXCONNECTIONS=100
# LDBCACHESIZE=10240
REWARDBASE="0x0"

...

DATA_DIR=
LOG_DIR=$DATA_DIR/logs
```

CN에 권장되는 txpool 크기는 다음과 같습니다.

```text
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384
```

PN에 권장되는 txpool 크기는 다음과 같습니다.

```text
TXPOOL_EXEC_SLOTS_ALL=8192
TXPOOL_NONEXEC_SLOTS_ALL=8192
TXPOOL_EXEC_SLOTS_ACCOUNT=8192
TXPOOL_NONEXEC_SLOTS_ACCOUNT=8192
```

EN에 권장되는 txpool 크기는 다음과 같습니다.

```text
TXPOOL_EXEC_SLOTS_ALL=4096
TXPOOL_NONEXEC_SLOTS_ALL=4096
TXPOOL_EXEC_SLOTS_ACCOUNT=4096
TXPOOL_NONEXEC_SLOTS_ACCOUNT=4096
```

## 속성 <a id="properties"></a>

구성 파일에는 다음과 같은 구성 가능한 속성이 있습니다. CN 및 PN 구성 파일은 `REWARDBASE.`를 제외하고 동일한 속성을 가집니다.

| 이름                                                                                          | 설명                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NETWORK                                                                                     | 이 노드가 가입할 네트워크 이름입니다.  이 값은 NETWORK_ID가 정의되지 않은 경우에 사용됩니다.  ("Mainnet", "Kairos")                                                                                                                         |
| NETWORK_ID                                                             | Kaia 네트워크 ID.  로컬 사설 네트워크를 생성하는 경우 네트워크 ID를 직접 정의해야 합니다.  다음 ID는 미리 구성된 네트워크를 위해 예약되어 있습니다. 8217 : Mainnet(메인 네트워크) 1000 : 아스펜 테스트 네트워크 1001 : Kairos 테스트 네트워크 |
| PORT                                                                                        | P2P 포트. (기본값: "32323")                                                                                                                                                                                                         |
| SERVER_TYPE                                                            | JSON RPC 서버 유형.  ("http", "fasthttp")                                                                                                                                                                                                          |
| SYNCMODE                                                                                    | 블록체인 동기화 모드.  ("fast", "full")                                                                                                                                                                                                                 |
| VERBOSITY                                                                                   | 로깅 상세도  (0=무음, 1=오류, 2=경고, 3=정보, 4=디버그, 5=상세)                                                                                                                                                                                                                  |
| MAXCONNECTIONS                                                                              | 최대 물리적 연결 수입니다.  모든 단일 채널 피어는 최대 MAXCONNECTIONS 피어를 가질 수 있습니다.  모든 멀티 채널 피어에는 최대 2대의 피어를 가질 수 있습니다.  0으로 설정하면 네트워크 연결이 비활성화됩니다. (기본값: 10)                                      |
| LDBCACHESIZE                                                                                | LevelDB의 인메모리 캐시 크기(MiB). (기본값: 768)                                                                                                                                                                        |
| REWARDBASE                                                                                  | 블록 합의 보상을 받을 계정 주소. 이 속성은 CN에만 적용됩니다.                                                                                                                                                                                                             |
| TXPOOL_EXEC_SLOTS_ALL        | 모든 계정에 대한 최대 실행 트랜잭션 슬롯 수입니다. (기본값: 4096)                                                                                                                                                                                      |
| TXPOOL_NONEXEC_SLOTS_ALL     | 모든 계정에 대한 비실행 트랜잭션 슬롯의 최대 개수입니다. (기본값: 1024)                                                                                                                                                                                   |
| TXPOOL_EXEC_SLOTS_ACCOUNT    | 계정당 보장되는 실행 가능한 트랜잭션 슬롯 수입니다. (기본값: 16)                                                                                                                                                                                        |
| TXPOOL_NONEXEC_SLOTS_ACCOUNT | 계정당 보장되는 비실행 트랜잭션 슬롯의 최대 개수입니다. (기본값: 64)                                                                                                                                                                                      |
| TXPOOL_LIFE_TIME                                  | 비실행 트랜잭션이 대기할 수 있는 최대 시간입니다. (기본값: 5m)                                                                                                                                                                                         |
| RPC_ENABLE                                                             | 1로 설정된 경우 HTTP-RPC 서버를 활성화합니다.                                                                                                                                                                                                                                    |
| RPC_API                                                                | 쉼표로 구분된 HTTP-RPC 인터페이스를 통해 제공되는 API 목록입니다.  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                                      |
| RPC_PORT                                                               | HTTP-RPC 서버 수신 포트. (기본값: "8551")                                                                                                                                                                                               |
| RPC_ADDR                                                               | HTTP-RPC 서버 수신 인터페이스. (기본값: "localhost")                                                                                                                                                                                       |
| RPC_CORSDOMAIN                                                         | 쉼표로 구분된 크로스오리진 요청을 수락할 도메인 목록(브라우저 강제 적용)                                                                                                                                                                                                                      |
| RPC_VHOSTS                                                             | 쉼표로 구분된 요청을 수락할 가상 호스트 이름 목록(서버 적용). '\*' 와일드카드를 허용합니다. (기본값: {"localhost"})                                                                                                                |
| WS_ENABLE                                                              | 1로 설정된 경우 WS-RPC 서버를 활성화합니다.                                                                                                                                                                                                                                      |
| WS_API                                                                 | WS-RPC 인터페이스를 통해 제공되는 API.  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                                                      |
| WS_ADDR                                                                | WS-RPC 서버 수신 인터페이스.                                                                                                                                                                                                                                               |
| WS_PORT                                                                | WS-RPC 서버 수신 포트. (기본값: "8552")                                                                                                                                                                                                 |
| WS_ORIGINS                                                             | 웹 소켓 요청을 수락할 원본. (기본값: "localhost")                                                                                                                                                                                            |
| AUTO_RESTART                                                           | 현재 블록이 `autorestart.timeout`(예: 60초, 10분, 1시간) 동안 업데이트되지 않은 경우(1로 설정된 경우) 프로세스를 다시 시작합니다.                                                                                                                   |
| METRICS                                                                                     | 1로 설정된 경우 메트릭 수집 및 보고를 활성화합니다.                                                                                                                                                                                                                                    |
| PROMETHEUS                                                                                  | 1로 설정된 경우 Prometheus 내보내기를 활성화합니다.                                                                                                                                                                                                                                |
| DB_NO_PARALLEL_WRITE         | 1로 설정된 경우 영구 데이터베이스에 대한 블록 데이터의 병렬 쓰기를 비활성화합니다.                                                                                                                                                                                                                   |
| MULTICHANNEL                                                                                | 1로 설정된 경우 블록 전파를 위한 전용 채널을 생성합니다.                                                                                                                                                                                                                                 |
| SUBPORT                                                                                     | 멀티채널 옵션이 활성화된 경우 수신 서브 포트 번호입니다. (기본값: "32324")                                                                                                                                                                                |
| NO_DISCOVER                                                            | 검색 옵션이 1로 설정된 경우 검색 옵션을 끕니다.                                                                                                                                                                                                                                      |
| BOOTNODES                                                                                   | 부트스트랩 노드의 쉼표로 구분된 니 주소.                                                                                                                                                                                                                                           |
| ADDITIONAL                                                                                  | 추가 명령줄 옵션 예) --txpool.nolocals                                                                                                                                                                                                                                    |
| DATA_DIR                                                               | 카이아 블록체인 데이터 폴더 경로.                                                                                                                                                                                                                                               |
| LOG_DIR                                                                | 로그 폴더 경로.                                                                                                                                                                                                                                                         |
