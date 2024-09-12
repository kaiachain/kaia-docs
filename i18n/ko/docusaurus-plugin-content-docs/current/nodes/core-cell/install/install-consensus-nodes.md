# 컨센서스 노드 설치

## 다운로드

다운로드](../../downloads/downloads.md) 페이지에서 최신 버전의 `kcn`을 다운로드할 수 있습니다.

## 설치

### Linux 아카이브 배포 <a id="linux-archive-distribution"></a>

아카이브 파일은 실행 가능한 바이너리와 다음과 같은 구조의 구성 파일로 구성됩니다.

**참고**: 파일 구조나 파일 이름을 변경하지 마세요. 변경하면 노드가 제대로 작동하지 않을 수 있습니다.

```text
- bin
  |- kcn
  |- kcnd
- conf
  |- kcnd.conf
```

| 파일명                            | 파일 설명            |
| :----------------------------- | :--------------- |
| bin/kcn                        | CN 실행 파일         |
| bin/kcnd                       | CN 시작/종료 스크립트 파일 |
| conf/kcnd.conf | CN 구성 파일         |

설치는 다운로드한 패키지의 압축을 풀고 패키지를 설치하려는 위치에 설치하는 것입니다.

```bash
$ tar zxf kcn-vX.X.X-linux-amd64.tar.gz
```

또는,

```bash
$ tar zxf kcn-baobab-vX.X.X-linux-amd64.tar.gz
```

**참고**: 압축되지 않은 디렉터리 `kcn-linux-amd64/bin` 경로를 환경 변수 `$PATH`에 추가하여 `kcn` 및 `kcnd`를 전역적으로 실행할 것을 권장합니다. 예를 들어

```bash
$ export PATH=$PATH:~/downloaded/path/kcn-linux-amd64/bin
```

다른 섹션에서는 경로가 변수에 추가되었다고 가정합니다.

### RPM 배포 (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

다운로드한 RPM 파일을 다음 `yum` 명령으로 설치할 수 있습니다.

```bash
$ yum install kcnd-vX.X.X.el7.x86_64.rpm
```

또는,

```bash
$ yum install kcnd-baobab-vX.X.X.el7.x86_64.rpm
```

### 카이아 Yum 리포지토리에서 설치 <a id="install-from-klaytn-yum-repo"></a>

또는 카이아 Yum 저장소에서 `kcnd`를 설치하여 실행할 수 있습니다:

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kcnd
```

### 설치된 위치 <a id="installed-location"></a>

설치된 파일은 다음과 같은 위치에 있습니다.

| 파일명                       | 위치                                       |
| :------------------------ | :--------------------------------------- |
| kcn                       | /usr/bin/kcn                             |
| kcnd.conf | /etc/kcnd/conf/kcnd.conf |

## 구성 <a id="configuration"></a>

CN 설정은 데이터 디렉터리를 생성하고 설정 파일 `kcnd.conf`에서 몇 가지 값을 설정하는 것입니다.

1. CN 데이터 디렉터리를 만듭니다.
2. 노드 키 설치
3. `kcnd.conf`로 CN을 설정합니다.

### CN 데이터 디렉터리 생성 <a id="cn-data-directory-creation"></a>

카이아 블록체인 데이터의 크기가 항상 증가한다는 사실을 고려하면 충분히 큰 스토리지를 사용하는 것을 권장합니다. 원하는 경로에 디렉터리를 생성해야 할 수도 있습니다.

```bash
$ mkdir -p /var/kcnd/data
```

### 노드 키 설치 <a id="install-node-key"></a>

CN을 작동하려면 `nodekey`가 필요합니다. 노드키가 없는 경우 KCN 바이너리가 새로 생성합니다. 노드키가 있는 경우 CN 데이터 디렉터리에 노드키를 넣어야 합니다. 노드키를 생성하는 방법은 '[설치에 앞서](./before-you-install.md)' 섹션에 설명되어 있습니다. 다음 명령줄은 CN 데이터 디렉터리에 `nodekey`를 복사합니다.

```bash
$ cp nodekey /var/kcnd/data
```

### 구성 파일 업데이트 <a id="update-the-configuration-file"></a>

구성 파일 위치:

- 아카이브 배포의 경우, 설정 디렉터리 위치는 기본적으로 `$INSTALL_PATH/kcn-linux-amd64/conf/`입니다.
- 패키지 배포의 경우, 설정 디렉터리의 기본 위치는 `/etc/kcnd/conf/`입니다.

#### 데이터 디렉터리 추가 <a id="add-data-directory"></a>

구성 파일 `kcnd.conf`에서 데이터 디렉터리 환경 변수 `$DATA_DIR`을 업데이트해야 합니다.

```text
...
DATA_DIR=/var/kcnd/data
...
```

#### 리워드베이스 설정 <a id="setup-rewardbase"></a>

CN 운영자는 카이아 네트워크 합의에 참여한 것에 대한 보상으로 KAIA를 받게 됩니다. 따라서 환경설정 파일 `kcnd.conf`에 주소를 설정해야 합니다.

새 계정을 만드는 방법은 여러 가지가 있지만, `kcn`을 통해서도 기능을 제공합니다. 다음 명령어로 도움말 메시지를 확인할 수 있습니다.

```bash
$ kcn account new --help
```

이 절차를 수행하는 예는 다음과 같습니다. 먼저 보상 KAIA를 받을 새 계정을 만들어야 합니다.

```bash
$ kcn account new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KAIA=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {d13f7da0032b1204f77029dc1ecbf4dae2f04241}
```

그 결과 사용자가 정의한 경로에 관련 키 저장소가 생성됩니다. 다음으로 생성된 주소를 다음과 같이 `kcnd.conf` 파일에 넣어야 합니다.

```text
...
REWARDBASE="d13f7da0032b1204f77029dc1ecbf4dae2f04241"
...
```

생성한 키스토어와 비밀번호는 매우 중요하므로 관리에 주의해야 합니다. [구성 파일](../../../misc/operation/configuration.md) 섹션에서 `kcnd.conf`에 대한 자세한 내용을 참조하세요.

### (Optional) Download Chaindata Snapshot

Synching from the genesis block is time-consuming. You may use [Chaindata Snapshot](../../../misc/operation/chaindata-snapshot.md) to skip the [Full Sync](../../../learn/storage/block-sync.md#full-sync) process.

## CN 시작하기 <a id="startup-the-cn"></a>

### CN 시작/중지 <a id="cn-start-stop"></a>

다음 `systemctl` 명령어로 카이아 서비스를 시작/중지할 수 있습니다.

**참고**: 루트 권한이 필요합니다.

**시작**

```bash
$ systemctl start kcnd.service

```

**중지**

```bash
$ systemctl stop kcnd.service

```

**상태**

```bash
$ systemctl status kcnd.service

```

### 문제 해결 <a id="troubleshooting"></a>

다음 오류가 발생하는 경우,

```bash
Failed to start kcnd.service: Unit not found.
```

다음 명령으로 systemd 관리자 구성을 다시 로드합니다.

```bash
$ systemctl daemon-reload
```

### BLS 공개키 정보 내보내기 <a id="export-bls-public-key-info"></a>

If the network has activated or will activate the Randao hardfork, each CN maintainer must submit its BLS public key info to the [KIP-113 smart contract](https://kips.kaia.io/KIPs/kip-113).

BLS 공개키 정보는 노드키에서 계산할 수 있습니다. 이를 추출하려면 먼저 노드를 시작합니다. 그리고 다음 명령을 사용합니다:

```
$ kcn account bls-info --datadir /var/kcnd/data
```

결과적으로 `bls-publicinfo-NODEID.json` 파일이 생성됩니다.

## 코어 셀 테스트 <a id="testing-the-core-cell"></a>

이제 코어 셀이 성공적으로 설치되었는지, 설치 후 예상대로 작동하는지 확인해야 합니다.

### 프로세스 상태 <a id="process-status"></a>

상태 명령어 `systemctl`과 `kcnd`를 사용하여 CN의 프로세스 상태를 확인할 수 있습니다.

#### systemctl <a id="systemctl"></a>

`systemctl`은 RPM과 함께 설치되며, 아래와 같이 CN의 상태를 확인할 수 있습니다.

```bash
$ systemctl status kcnd.service
● kcnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kcnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kcnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kcn)
   CGroup: /system.slice/kcnd.service
           └─29641 /usr/local/bin/kcn --networkid 1000 --datadir /kcnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kcnd[29636]: Starting kcnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

위 예시에서 `Active: active (running)`과 같은 현재 상태를 확인할 수 있습니다.

#### kcnd <a id="kcnd-kpnd"></a>

패키지와 함께 `kcnd`가 설치되며, 아래와 같이 CN의 상태를 확인할 수 있습니다.

```bash
$ kcnd status
kcnd is running
```

### 로그 <a id="logs"></a>

로그는 `kcnd.conf` 파일의 `LOG_DIR` 필드에 정의된 경로에 위치한 `kcnd.out` 파일에 저장됩니다. 노드가 정상적으로 작동하면 다음과 같이 초당 블록이 생성되는 것을 확인할 수 있습니다.

예시:

```bash
$ tail kcnd.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work                    number=11572927 txs=0 elapsed=483.436µs
```

### kcn 콘솔 <a id="kcn-console-kpn-console"></a>

카이아는 `kcn console`이라는 CLI 클라이언트를 제공합니다. 그러나 CN은 보안상의 이유로 클라이언트에 대한 RPC 인터페이스를 비활성화할 수 있습니다. 클라이언트를 사용하는 또 다른 방법은 IPC(프로세스 간 통신)를 통해 프로세스에 연결하는 것입니다.

IPC 파일 `klay.ipc`는 CN의 `data` 디렉터리에 있습니다.

다음 명령을 실행하고 결과를 확인하세요.

```bash
$ ken attach /var/kend/data/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: /var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

You can check the usable commands on [API Document](../../../../references/json-rpc/klay/account-created)

CN의 상태를 확인하는 데 유용한 API입니다:

- `klay.blockNumber` (최신 블록 번호 가져오기)
- `net.peerCount` (현재 연결된 카이아 노드 수 확인)

#### klay.blockNumber <a id="klay-blocknumber"></a>

최신 블록 번호를 확인하여 노드 유형에 따라 블록이 제대로 생성(CN의 경우)되었는지 또는 전파(CN 및 PN의 경우)되었는지 확인할 수 있습니다.

```javascript
> klay.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```javascript
> net.peerCount
14
```

위의 명령줄은 노드 유형에 따라 다른 값을 반환합니다.

- CN: 연결된 CN의 수 + 연결된 PN의 수입니다.
- PN: 연결된 CN의 수 + 연결된 PN의 수 + 연결된 EN의 수.
