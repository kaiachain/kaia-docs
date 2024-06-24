# 프록시 노드 설치

## 다운로드

[다운로드](../../downloads/downloads.md) 페이지에서 최신 버전의 `kpn`을 다운로드할 수 있습니다.

## 설치 <a id="installation"></a>

### Linux 아카이브 배포 <a id="linux-archive-distribution"></a>

아카이브 파일은 실행 가능한 바이너리와 다음과 같은 구조의 구성 파일로 구성됩니다.

**참고**: 파일 구조나 파일 이름을 변경하지 마세요. 변경하면 노드가 제대로 작동하지 않을 수 있습니다.

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| 파일명                            | 파일 설명            |
| :----------------------------- | :--------------- |
| bin/kpn                        | PN 실행 파일         |
| bin/kpnd                       | PN 시작/종료 스크립트 파일 |
| conf/kpnd.conf | PN 구성 파일         |

설치는 다운로드한 패키지의 압축을 풀고 패키지를 설치하려는 위치에 설치하는 것입니다.

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

또는,

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**참고**: 압축되지 않은 디렉터리 `kpn-linux-amd64/bin` 경로를 환경 변수 `$PATH`에 추가하여 `kpn` 및 `kpnd`를 전역적으로 실행할 것을 권장합니다. 예를 들어

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

다른 섹션에서는 경로가 변수에 추가되었다고 가정합니다.

### RPM 배포 (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

다운로드한 RPM 파일을 다음 `yum` 명령으로 설치할 수 있습니다.

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

또는,

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### 카이아 Yum 리포지토리에서 설치 <a id="install-from-klaytn-yum-repo"></a>

또는 카이아 Yum 저장소에서 `kpnd`를 설치하고 실행할 수 있습니다:

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kpnd
```

### 설치된 위치 <a id="installed-location"></a>

설치된 파일은 다음과 같은 위치에 있습니다.

| 파일명                       | 위치                                       |
| :------------------------ | :--------------------------------------- |
| kpn                       | /usr/bin/kpn                             |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |

## 구성 <a id="configuration"></a>

PN 설정은 데이터 디렉터리를 생성하고 설정 파일 `kpnd.conf`에서 몇 가지 값을 설정하는 것입니다.

1. PN 데이터 디렉터리 생성
2. 노드 키 설치
3. `static-node.json` 설치
4. `kpnd.conf`로 PN을 구성

### PN 데이터 디렉터리 생성 <a id="pn-data-directory-creation"></a>

카이아 블록체인 데이터의 크기가 항상 증가한다는 사실을 고려하면 충분히 큰 스토리지를 사용하는 것을 권장합니다. 원하는 경로에 디렉터리를 생성해야 할 수도 있습니다.

```bash
$ mkdir -p /var/kpnd/data
```

### 노드 키 설치 <a id="install-node-key"></a>

PN을 작동하려면 `nodekey`가 필요합니다. 노드키가 없는 경우 KPN 바이너리가 새로 생성합니다. 노드키가 있는 경우, PN 데이터 디렉터리에 노드키를 넣어야 합니다. 노드키를 생성하는 방법은 '[설치 전](./before-you-install.md)' 섹션에 있습니다. 다음 명령줄은 `nodekey`를 PN 데이터 디렉터리에 복사합니다.

```bash
$ cp nodekey /var/kpnd/data
```

### `static-nodes-json` 설치 <a id="install-static-nodes-json"></a>

`static-nodes-json`는 PN 운영자가 생성해야 합니다. 여기에는 PN이 연결된 주소가 포함됩니다. CN과 다른 코어 셀의 PN을 포함한 주소를 추가하는 것을 권장합니다. 자세한 내용은 Kaia 공식 이메일(메인넷의 경우 `bootstrap@klaytn.com`, Kairos의 경우 `baobab@klaytn.com`)로 문의하시기 바랍니다.

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

PN의 노드 URI는 '[설치에 앞서](./before-you-install.md)' 섹션에 있습니다. 다음 명령줄은 `static-nodes.json` 파일을 PN 데이터 디렉터리에 복사합니다.

```bash
$ cp static-nodes.json /var/kpnd/data
```

### 구성 파일 업데이트 <a id="update-the-configuration-file"></a>

구성 파일 위치:

- 아카이브 배포의 경우, 설정 디렉터리 위치는 기본적으로 `$INSTALL_PATH/kpn-linux-amd64/conf/`입니다.
- 패키지 배포의 경우, 설정 디렉터리의 기본 위치는 `/etc/kpnd/conf/`입니다.

#### 데이터 디렉터리 추가 <a id="add-data-directory"></a>

구성 파일 `kpnd.conf`에서 데이터 디렉터리 환경 변수 `$DATA_DIR`을 업데이트해야 합니다.

```text
...
DATA_DIR=/var/kpnd/data
...
```

### 빠른 동기화 (선택 사항) <a id="fast-sync-optional"></a>

각 PN은 네트워크 체인 데이터의 사본을 유지합니다. 노드가 동기화되지 않은 경우 네트워크의 다른 노드로부터 이 데이터를 가져올 수 있는데, 이 과정을 동기화라고 합니다. 새 PN이 처음 시작되면 네트워크에서 전체 체인 데이터를 다운로드해야 합니다.

이 프로세스를 가속화하기 위해 PN을 시작하기 전에 체인 데이터의 스냅샷을 다운로드하여 빠른 동기화를 수행할 수 있습니다. 이렇게 하면 PN을 처음 시작할 때 동기화하는 데 걸리는 시간을 크게 줄일 수 있습니다.

[메인넷 스냅샷 아카이브](http://packages.klaytn.net/cypress/chaindata/) 또는 [Kairos 스냅샷 아카이브](http://packages.klaytn.net/baobab/chaindata/)에서 최신 체인데이터 스냅샷을 다운로드합니다. `kpnd`를 시작하기 전에 `kpnd.conf`에서 설정한 DATA_DIR에 스냅샷을 추출합니다.

예를 들어

```text
$ tar -C /var/kpnd/data -xvf klaytn-cypress-chaindata-latest.tar.gz
```

또는,

```text
$ tar -C /var/kpnd/data -xvf klaytn-baobab-chaindata-latest.tar.gz
```

데이터 추출이 완료되면 PN을 정상적으로 시작할 수 있습니다.

[체인데이터 변경](../../../misc/operation/chaindata-change.md)에서 자세한 정보를 확인할 수 있습니다.

## PN 시작하기 <a id="startup-the-pn"></a>

### PN 시작/중지 <a id="pn-start-stop"></a>

다음 `systemctl` 명령어로 카이아 서비스를 시작/중지할 수 있습니다.

**참고**: 루트 권한이 필요합니다.

**시작**

```bash
$ systemctl start kpnd.service

```

**중지**

```bash
$ systemctl stop kpnd.service

```

**상태**

```bash
$ systemctl status kpnd.service

```

### 문제 해결 <a id="troubleshooting"></a>

다음 오류가 발생하는 경우,

```bash
Failed to start kpnd.service: Unit not found.
```

다음 명령으로 systemd 관리자 구성을 다시 로드합니다.

```bash
$ systemctl daemon-reload
```

## 코어 셀 테스트 <a id="testing-the-core-cell"></a>

이제 코어 셀이 성공적으로 설치되었는지, 설치 후 예상대로 작동하는지 확인해야 합니다.

### 프로세스 상태 <a id="process-status"></a>

상태 명령어 `systemctl`과 `kpnd`를 사용하여 PN의 프로세스 상태를 확인할 수 있습니다.

#### systemctl <a id="systemctl"></a>

`systemctl`은 RPM과 함께 설치되며, 아래와 같이 PN의 상태를 확인할 수 있습니다.

```bash
$ systemctl status kpnd.service
● kpnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kpnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kpnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kcn)
   CGroup: /system.slice/kpnd.service
           └─29641 /usr/local/bin/kcn --networkid 1000 --datadir /kpnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kpnd[29636]: Starting kpnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

위 예시에서 `Active: active (running)`과 같은 현재 상태를 확인할 수 있습니다.

#### kpnd <a id="kcnd-kpnd"></a>

패키지와 함께 `kpnd`가 설치되며, 아래와 같이 PN의 상태를 확인할 수 있습니다.

```bash
$ kpnd status
kpnd is running
```

### 로그 <a id="logs"></a>

로그는 `kpnd.conf` 파일의 `LOG_DIR` 필드에 정의된 경로에 위치한 `kpnd.out` 파일에 저장됩니다. 노드가 정상적으로 작동하면 다음과 같이 초당 블록이 생성되는 것을 확인할 수 있습니다.

예시:

```bash
$ tail kpnd.out
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

### kpn 콘솔 <a id="kcn-console-kpn-console"></a>

카이아는 `kpn console`이라는 CLI 클라이언트를 제공합니다. 그러나 PN은 보안상의 이유로 클라이언트에 대한 RPC 인터페이스를 비활성화할 수 있습니다. 클라이언트를 사용하는 또 다른 방법은 IPC(프로세스 간 통신)를 통해 프로세스에 연결하는 것입니다.

IPC 파일 `klay.ipc`는 PN의 `data` 디렉터리에 있습니다.

다음 명령을 실행하고 결과를 확인하세요.

```bash
 $ kpn attach /var/kpnd/data/klay.ipc
 Welcome to the Kaia JavaScript console!

 instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 coinbase: 0x67f68fdd9740fd7a1ac366294f05a3fd8df0ed40
 at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
  datadir: /var/kpnd/data
  modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
  >
```

You can check the usable commands on [API Document](../../../references/json-rpc/klay/account-created)

PN의 상태를 확인하는 데 유용한 API입니다:

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
