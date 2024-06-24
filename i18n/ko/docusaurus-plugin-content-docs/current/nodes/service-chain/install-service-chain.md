# 서비스 체인 설치

## 대상 독자 <a id="intended-audience"></a>

- 메타버스, 게임파이, NFT를 위한 블록체인을 구축하고자 하는 기업
- 높은 TPS, 최소한의 트랜잭션 수수료, 데이터 프라이버시가 필요한 dApp 개발자
- 테스트를 위해 로컬 사설 네트워크 또는 원장 데이터베이스를 구축하려는 모든 이

## 서비스체인 개요 <a id="service-chain-overview"></a>

서비스체인은 밸류 전송, 보안, 고성능, 커스터마이징과 같은 기업의 요구사항을 충족하기 위한 엔터프라이즈급 블록체인입니다. 카이아 서비스체인은 다음과 같은 기능을 제공합니다:

- 즉각적인 최종성
- 카이아 체인 간 토큰 전송
- 데이터 무결성을 위해 메인 체인에 데이터 앵커링
- 엔터프라이즈 수준의 보안 요건을 충족하는 다중 서명 브리지 컨트랙트

![](/img/nodes/sc-overview.png)

[카이아 스케일링 솔루션](../../learn/scaling-solutions.md)에서 서비스체인에 대한 자세한 내용을 확인할 수 있습니다. 그리고 다음 동영상은 카이아 서비스체인을 이해하는 데 도움이 될 것입니다.

- [카이아 서비스체인을 통한 수평 확장 | TXGX 2019](https://www.youtube.com/watch?v=8yQc5FQysJc)
- [카이아 서비스체인의 고가용성 아키텍처 | TXGX 2019](https://www.youtube.com/watch?v=HcdhWtXPuR0)

## 다운로드 <a id="download"></a>

[다운로드 페이지](../downloads/downloads.md)에서 SCN, SPN 및 SEN용 패키지를 받을 수 있습니다.

## 설치 <a id="installation-guide"></a>

이 장에서는 **서비스 체인 컨센서스 노드 (SCN)** 설치에 대해 설명합니다.

### Linux 아카이브 배포 <a id="linux-archive-distribution"></a>

서비스 체인 합의 노드의 아카이브 파일은 다음과 같은 디렉터리 레이아웃을 가지고 있습니다.

| fileName                        | 파일 설명             |
| :------------------------------ | :---------------- |
| bin/kscn                        | SCN 실행 파일         |
| bin/kscnd                       | SCN 시작/종료 스크립트 파일 |
| conf/kscnd.conf | SCN 구성 파일         |

Homi 바이너리의 아카이브 파일은 다음과 같은 디렉터리 레이아웃을 가지고 있습니다.

| fileName | 파일 설명      |
| :------- | :--------- |
| bin/homi | HOMI 실행 파일 |

설치는 다운로드한 패키지의 압축을 푸는 것입니다.

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

### RPM 배포 (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

다운로드한 RPM 파일을 다음 `yum` 명령으로 설치할 수 있습니다.

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### 설치 위치 <a id="scn-configuration"></a>

카이아 리눅스 패키지는 실행 가능한 바이너리와 다음과 같은 구조의 설정 파일로 구성되어 있습니다.

| fileName                   | location                                   |
| :------------------------- | :----------------------------------------- |
| kscn                       | /usr/bin/kscn                              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi                       | /usr/bin/homi                              |

## 구성 <a id="configuration"></a>

이 페이지에서는 합의 네트워크를 형성하기 위한 SCN 구성에 대해 설명합니다.

아카이브 배포를 설치한 경우 아카이브를 추출한 디렉터리에서 바이너리와 구성 파일을 찾을 수 있습니다. 아래는 명령 실행 예제입니다.

```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

이 튜토리얼에서는 명령의 전체 경로를 항상 지정하지는 않습니다.

### 제네시스 파일 생성 <a id="creation-of-a-genesis-file"></a>

먼저 자체 서비스 체인을 위한 제네시스 파일과 노드키 파일을 생성해야 합니다. 아래와 같이 homi를 사용하여 생성할 수 있습니다.

```bash
$ homi setup --gen-type local --cn-num 1 --servicechain -o ./homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/Klaytn.json
Created :  homi-output/Klaytn_txpool.json
```

다음은 제네시스 파일과 노드키 파일의 예시입니다.

```bash
$ cat homi-output/scripts/genesis.json
{
    "config": {
        "chainId": 1000,
        "istanbul": {
            "epoch": 3600,
            "policy": 0,
            "sub": 22
        },
        "unitPrice": 0,
        "deriveShaImpl": 2,
        "governance": null
    },
    "timestamp": "0x5dca0732",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad594f8690562c0839c44b17af421f7aaaa9f12dcc62bb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "f8690562c0839c44b17af421f7aaaa9f12dcc62b": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}   
```

```bash
$ cat homi-output/keys/nodekey1                                                                                                                                 
0c28c77ce5c2ca9e495b860f190ed7dfe7bd5c1a2e5f816587eb4d3d9566df44
```

제네시스 파일에서 체인ID를 변경하세요. 리플레이 공격을 방지하기 위해 고유 번호를 사용하세요.
(카이아 Mainnet(8217), Kairos(1001)과 같은 체인ID를 사용하지 마세요).

원하는 경우 제네시스 파일에서 `"alloc"`을 편집하여 미리 펀딩된 주소를 변경할 수 있습니다.
(자세한 내용은 [Genesis JSON](../service-chain/configure/genesis.md)에서 확인할 수 있습니다.)

### SCN 데이터 디렉터리 생성 <a id="scn-data-directory-creation"></a>

카이아 블록체인 데이터의 크기가 계속 커지는 것을 고려하면 충분히 큰 스토리지를 사용하는 것을 권장합니다.
데이터 디렉터리는 원하는 경로에 생성할 수 있습니다.
이 문서에서는 데이터 디렉터리로 `~/kscnd_home`을 생성합니다.

```bash
$ mkdir -p ~/kscnd_home
```

#### 제네시스 블록 초기화 <a id="initialization-of-a-genesis-block"></a>

그 후 제네시스 파일로 데이터 디렉터리를 초기화할 수 있습니다.
서비스 체인 노드를 시작하기 전에 `kscn`과 `genesis.json`을 사용하여 서비스 체인 네트워크의 제네시스 블록을 초기화해야 합니다.

```bash
$ kscn init --datadir ~/kscnd_home homi-output/scripts/genesis.json
  WARN[11/12,10:13:58 +09] [19] Some input value of genesis.json have been set to default or changed
  INFO[11/12,10:13:58 +09] [18] Setting connection type                   nodetype=cn conntype=0
    ...
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [5] Writing custom genesis block
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [47] Persisted trie from memory database       updated nodes=1 updated nodes size=80.00B time=304.931µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
  INFO[11/12,10:13:59 +09] [19] Successfully wrote genesis state          database=lightchaindata hash=0xc269669079fc8c06ac37435a563b8ed8ef273c1c835f3d823d2e586315319aa8
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/header
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/body
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/receipts
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/0
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/1
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/2
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/3
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/txlookup
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/misc
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/bridgeservice
```

#### 노드키 설치 <a id="install_nodekey"></a>

아래와 같이 `homi-output/keys/nodekey1`을 SCN의 데이터 디렉터리 내 `klay` 디렉터리에 복사합니다.

```bash
$ cp homi-output/keys/nodekey1  ~/kscnd_home/klay/nodekey
```

### SCN 구성 <a id="configuration-of-the-scn"></a>

`kscnd.conf`는 SCN의 구성 파일입니다.

SCN이 기본 포트를 사용하고 대규모 파티션을 `~/kscnd_home`에 마운트한다고 가정합니다.
기본 `kscnd.conf` 파일에서 `SC_SUB_BRIDGE` 옵션은 비활성화되어 있고 `DATA_DIR`은 비어 있습니다.

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```

앵커링/값 전송 기능을 사용하려면 `SC_SUB_BRIDGE`를 활성화하면 됩니다.
또한 아래와 같이 DATA_DIR을 설정해야 합니다.

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

원하는 경우 다른 옵션을 추가로 수정하여 서비스 체인을 사용자 지정할 수 있습니다.
그렇지 않으면 이제 구성을 완료하고 기본 구성을 사용하여 서비스 체인을 실행할 준비가 된 것입니다.

## SCN 시작/중지 <a id="starting-stopping-scn"></a>

설치 유형에 따라 다음 `systemctl` 또는 `kscnd` 명령어로 카이아 서비스를 시작/중지할 수 있습니다.

**시작**

```bash
## when installed from rpm distribution 
$ systemctl start kscnd.service

## when installed using linux archive
$ kscnd start

```

**중지**

```bash
## when installed from rpm distribution 
$ systemctl stop kscnd.service

## when installed using linux archive
$ kscnd stop

```

**상태**

```bash
## when installed from rpm distribution 
$ systemctl status kscnd.service

## when installed using linux archive
$ kscnd status

```

## 노드 상태 확인 <a id="checking-node-status"></a>

### 프로세스 상태 <a id="process-status"></a>

상태 명령어 `systemctl`과 `kscnd`를 사용하여 SCN의 프로세스 상태를 확인할 수 있습니다.

#### systemctl <a id="systemctl"></a>

`systemctl`은 RPM과 함께 설치되며, 아래와 같이 SCN의 상태를 확인할 수 있습니다.

```bash
$ systemctl status kscnd.service
● kscnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kscnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kscnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kscn)
   CGroup: /system.slice/kscnd.service
           └─29641 /usr/local/bin/kscn --networkid 1000 --datadir ~/kscnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kscnd[29636]: Starting kscnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

위 예시에서 `Active: active (running)`과 같은 현재 상태를 확인할 수 있습니다.

#### kscnd <a id="kscnd"></a>

패키지와 함께 `kscnd`가 설치되며, SCN의 상태는 아래와 같이 확인할 수 있습니다.

```bash
$ kscnd status
kscnd is running
```

### 로그 <a id="logs"></a>

로그는 `kscnd.conf` 파일의 `LOG_DIR` 필드에 정의된 경로에 위치한 `kscnd.out` 파일에 저장됩니다. 노드가 정상적으로 작동하면 다음과 같이 초당 각 블록이 임포트되는 것을 확인할 수 있습니다.

예시:

```bash
$ tail -F ~/kscnd_home/logs/kscnd.out
  INFO[11/12,10:19:09 +09] [49] Successfully wrote mined block            num=11 hash=03da06…f194b0 txs=0
  INFO[11/12,10:19:09 +09] [49] Commit new mining work                    number=12 txs=0 elapsed=236.972µs
  INFO[11/12,10:19:10 +09] [24] Committed                                 number=12 hash=470aca…be4fdf address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:10 +09] [49] Successfully sealed new block             number=12 hash=470aca…be4fdf
  INFO[11/12,10:19:10 +09] [49] Successfully wrote mined block            num=12 hash=470aca…be4fdf txs=0
  INFO[11/12,10:19:10 +09] [49] Commit new mining work                    number=13 txs=0 elapsed=198.221µs
  INFO[11/12,10:19:11 +09] [24] Committed                                 number=13 hash=95e4a3…14e50f address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:11 +09] [49] Successfully sealed new block             number=13 hash=95e4a3…14e50f
  INFO[11/12,10:19:11 +09] [49] Successfully wrote mined block            num=13 hash=95e4a3…14e50f txs=0
  INFO[11/12,10:19:11 +09] [49] Commit new mining work                    number=14 txs=0 elapsed=220.004µs
  INFO[11/12,10:19:12 +09] [24] Committed                                 number=14 hash=dcd2bc…b2aec0 address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
```

### 쿼리 <a id="queries"></a>

#### kscn 콘솔 <a id="kscn-console"></a>

카이아는 `kscn console`이라는 CLI 클라이언트를 제공합니다. 클라이언트를 사용하는 또 다른 방법은 IPC(프로세스 간 통신)를 통해 프로세스에 연결하는 것입니다. IPC 파일 `klay.ipc`는 SCN의 `data` 디렉터리에 있습니다.

다음 명령을 실행하고 결과를 확인하세요.

```text
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Kaia JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

You can check the usable commands on [API Document](../../../references/json-rpc/klay/account-created)

SCN의 상태를 확인하는 데 유용한 API입니다:

- `klay.blockNumber` (최신 블록 번호 가져오기)
- `net.peerCount` (현재 연결된 카이아 노드 수 확인)

#### klay.blockNumber <a id="klay-blocknumber"></a>

최신 블록 번호를 확인하여 블록이 제대로 전파되었는지 확인할 수 있습니다.

```text
> klay.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
4
```

위의 명령줄은 메인 체인에서 EN을 제외하고 SCN이 연결한 노드 수를 반환합니다.
