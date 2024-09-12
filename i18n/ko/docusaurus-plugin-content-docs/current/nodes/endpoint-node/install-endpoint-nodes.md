# 엔드포인트 노드 설치

## 다운로드 <a id="download"></a>하기

[다운로드](../downloads/downloads.md) 페이지에서 최신 버전의 EN을 다운로드할 수 있습니다.

## 설치

### Linux 아카이브 배포 <a id="linux-archive-distribution"></a>

아카이브 파일은 실행 가능한 바이너리와 다음과 같은 구조의 구성 파일로 구성됩니다.

**참고**: 파일 구조나 파일 이름을 변경하지 마세요. 변경하면 노드가 제대로 작동하지 않을 수 있습니다.

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| 파일명                            | 파일 설명            |
| :----------------------------- | :--------------- |
| bin/ken                        | EN 실행 파일         |
| bin/kend                       | EN 시작/종료 스크립트 파일 |
| conf/kend.conf | EN 구성 파일         |

설치는 다운로드한 패키지의 압축을 풀고 패키지를 설치하려는 위치에 설치하는 것입니다.

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

또는,

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**참고**: `ken` 및 `kend`를 전역적으로 실행하려면 환경 변수 `$PATH`에 압축되지 않은 디렉터리 `ken-linux-amd64/bin` 경로를 추가할 것을 권장합니다. 예를 들어

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

다른 섹션에서는 경로가 변수에 추가되었다고 가정합니다.

### RPM 배포 (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

다운로드한 RPM 파일을 다음 `yum` 명령으로 설치할 수 있습니다.

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

또는,

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### 카이아 Yum 리포지토리에서 설치 <a id="install-from-klaytn-yum-repo"></a>

또는 카이아 Yum 저장소에서 `kend`를 설치하고 실행할 수 있습니다:

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kend
```

### 설치된 위치 <a id="installed-location"></a>

설치된 파일은 다음과 같은 위치에 있습니다.

| 파일명                       | 위치                                       |
| :------------------------ | :--------------------------------------- |
| ken                       | /usr/bin/ken                             |
| kend.conf | /etc/kend/conf/kend.conf |

## 구성 <a id="configuration"></a>

EN 설정은 데이터 디렉터리를 생성하고 설정 파일 `kend.conf`에 환경 변수를 설정하는 것입니다.

1. EN 데이터 디렉터리를 생성합니다.
2. `kend.conf`로 EN을 구성합니다.

### EN 데이터 디렉터리 생성 <a id="en-data-directory-creation"></a>

카이아 블록체인 데이터의 크기가 계속 증가한다는 사실을 고려하면 충분히 큰 스토리지를 사용하는 것이 좋습니다. 원하는 경로에 디렉터리를 생성해야 합니다.

```text
$ sudo mkdir -p /var/kend/data
```

### 구성 파일 업데이트 <a id="update-the-configuration-file"></a>

구성 파일 위치:

- 아카이브 배포의 경우, 설정 디렉터리 위치는 기본적으로 `$INSTALL_PATH/ken-linux-amd64/conf/`입니다.
- 패키지 배포의 경우, 설정 디렉터리의 기본 위치는 `/etc/kend/conf/`입니다.

#### 데이터 디렉터리 추가 <a id="add-data-directory"></a>

구성 파일 `kend.conf`에서 데이터 디렉터리 환경 변수 `$DATA_DIR`을 업데이트해야 합니다.

```text
DATA_DIR=/var/kend/data
```

### (Optional) Download Chaindata Snapshot

Synching from the genesis block is time-consuming. You may use [Chaindata Snapshot](../../misc/operation/chaindata-snapshot.md) to skip the [Full Sync](../../learn/storage/block-sync.md#full-sync) process.

## EN 시작하기 <a id="startup-the-en"></a>

다음 명령을 사용하여 엔드포인트 노드를 시작하거나 중지할 수 있습니다.

**시작**

```bash
$ kend start
Starting kend: OK
```

**중지**

```bash
$ kend stop
Shutting down kend: Killed
```

**상태**

```bash
$ kend status
kend is running
```

## 설치 테스트하기 <a id="testing-the-installation"></a>

이제 엔드포인트 노드가 성공적으로 설치되었는지, 설치 후 예상대로 작동하는지 확인해야 합니다.

### 프로세스 상태 <a id="process-status"></a>

상태 명령어 `systemctl`과 `kend`를 사용하여 EN의 프로세스 상태를 확인할 수 있습니다.

#### systemctl <a id="systemctl"></a>

RPM과 함께 `systemctl`이 설치되며, 아래와 같이 EN의 상태를 확인할 수 있습니다.

```bash
$ systemctl status kend.service
● kend.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kend; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kend start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (ken)
   CGroup: /system.slice/kend.service
           └─29641 /usr/local/bin/ken --networkid 1000 --datadir /kend_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kend[29636]: Starting kend: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

위 예시에서 `Active: active (running)`과 같은 현재 상태를 확인할 수 있습니다.

#### kend <a id="kend"></a>

패키지와 함께 `kend`가 설치되며, 아래와 같이 EN의 상태를 확인할 수 있습니다.

```bash
$ kend status
kend is running
```

### 로그 <a id="logs"></a>

로그는 `kend.conf` 파일의 `LOG_DIR` 필드에 정의된 경로에 있는 `kend.out` 파일에 저장됩니다. 노드가 정상적으로 작동하면 다음과 같이 초당 각 블록이 임포트되는 것을 확인할 수 있습니다.

예시:

```bash
$ tail kend.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work      
```

### 쿼리 <a id="queries"></a>

#### ken 콘솔 <a id="ken-console"></a>

카이아는 `ken console`이라는 CLI 클라이언트를 제공합니다. 클라이언트를 사용하는 또 다른 방법은 IPC(프로세스 간 통신)를 통해 프로세스에 연결하는 것입니다. IPC 파일 `klay.ipc`는 EN의 `data` 디렉터리에 있습니다.

다음 명령을 실행하고 결과를 확인하세요.

```text
$ ken attach /var/kend/data/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: /var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

You can check the usable commands on [API Document](../../../references/json-rpc/klay/account-created)

EN의 상태를 확인하는 데 유용한 API입니다:

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
14
```

위의 명령줄은 EN이 연결한 노드 수를 반환합니다.
