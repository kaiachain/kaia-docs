# Kairos에 연결하기

이 섹션에서는 4노드 서비스체인 네트워크를 Kairos 네트워크에 연결하는 방법을 설명합니다.
Kairos EN을 설정하고 이 EN을 SCN 중 하나에 연결합니다. 그런 다음 앵커링 기능을 활성화하여 서비스체인 블록 정보를 Kairos 네트워크에 넣습니다.

![](/img/nodes/sc-en-scn-arch.png)

## 사전 요구 사항 <a id="prerequisites"></a>

- EN용 Linux 또는 MacOS 서버 1대
- 테스트를 위한 최소 하드웨어 요구 사항
  - CPU: 4코어(인텔 제온 또는 동급), RAM: 16GB, HDD: 50GB
  - 자세한 설명은 [시스템 요구사항](../system-requirements.md)을 참조하세요.
- Kairos EN 실행 파일을 다운로드합니다. 다운로드 가능한 바이너리의 전체 목록은 [다운로드](../../downloads/downloads.md)를 참조하세요.
- 가정 및 제한 사항
  - 서비스체인 네트워크가 설치되어 실행 중입니다. 네트워크 설정은 [4노드 서비스체인 설정하기](4nodes-setup-guide.md)를 참고하세요.
  - Kairos EN.
  - 일대일 연결만 지원되므로 하나의 EN은 하나의 SCN에만 연결할 수 있습니다.
  - 모든 SCN이 EN에 연결될 필요는 없습니다.

## 0단계: Kairos EN 설치 <a id="install-baobab-en"></a>

설치는 다운로드한 패키지의 압축을 푸는 것입니다. EN 서버에서 아카이브를 압축 해제합니다.

```bash
EN-01$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## 1단계: genesis.json 준비하기 <a id="step-1-preparing-genesis-json"></a>

EN 서버에서 `Kairos` 네트워크용 `genesis.json`을 다운로드합니다.

```
EN-01$ curl -X GET https://packages.klaytn.net/baobab/genesis.json -o ~/genesis.json
```

## 2단계: EN 노드 초기화 <a id="step-2-en-node-initialization"></a>

이제 제네시스 파일을 사용하여 EN 노드를 초기화하겠습니다. 다음 명령을 실행합니다.
홈 디렉터리에 체인 데이터와 로그를 저장하는 데이터 폴더가 생성됩니다.
데이터 폴더는 `--datadir` 지시문을 사용하여 변경할 수 있습니다.

```
EN-01$ ken init --datadir ~/data ~/genesis.json
```

## 3단계: EN 노드 구성하기 <a id="step-3-configure-the-en-node"></a>

ken 설치 폴더로 이동하여 `mv kend_baobab.conf kend.conf`로 이름을 바꾼 다음 `conf/kend.conf`를 다음과 같이 편집합니다.

```
...
NETWORK="baobab"
...
SC_MAIN_BRIDGE=1
...
DATA_DIR=~/data
...
```

## 4단계: EN 노드 시작 <a id="step-4-start-the-en-node"></a>

```
EN-01$ kend start
Starting kscnd: OK
```

블록 동기화 상태는 `klay.blockNumber`를 통해 확인할 수 있습니다. 이 숫자가 0이 아니라면 노드가 정상적으로 작동하고 있는 것입니다. Kairos 네트워크의 모든 블록을 다운로드하는 것은 네트워크 상태와 하드웨어 성능에 따라 시간이 오래 걸릴 수 있으므로, [Fast Sync](../../endpoint-node/install-endpoint-nodes.md#fast-sync-optional)를 사용하여 블록을 동기화할 것을 권장합니다.

```
EN-01$ ken attach --datadir ~/data
> kaia.blockNumber
21073
```

노드를 중지하려면 `kend stop` 명령을 사용하면 됩니다.

## 5단계: EN 노드의 KNI 확인 <a id="step-5-check-kni-of-en-node"></a>

SCN-L2-01 노드에서 연결할 때 사용되는 정보인 EN-01의 KNI를 기록해 두세요. 이 값은 다음 단계에서 `main-bridges.json`을 생성할 때 사용됩니다.

```
EN-01$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553...25bae@[::]:50505?discport=0"
```

![](/img/nodes/sc-en-scn-nodeInfo.png)

## 6단계: 메인 브리지 생성 <a id="step-6-create-main-bridges-json"></a>

SCN-L2-01(참고: EN-01 노드 아님)에 로그온하고 `~/data`에 `main-bridges.json`을 생성합니다. `@` 문자 뒤에 있는 `[::]`를 EN-01 노드의 IP 주소로 바꿉니다.

```
SCN-L2-01$ echo '["kni://0f7aa6499553...25bae@192.168.1.1:50505?discport=0"]' > ~/data/main-bridges.json
```

## 7단계: SCN 구성 후 kscn 재시작 <a id="step-7-configure-scn-then-restart-kscn"></a>

SCN-L2-01 노드의 셸에서 `kscn-XXXXX-amd64/conf/kscnd.conf`를 수정합니다.
`SC_SUB_BRIDGE`를 1로 설정하면 SCN-L2-01 노드가 시작되면 자동으로 데이터 앵커링이 시작됩니다. 이 예제에서는 상위 체인인 Kairos의 `chainID`가 1001이기 때문에 `SC_PARENT_CHAIN_ID`가 1001로 설정되어 있습니다.
`SC_ANCHORING_PERIOD`는 메인 체인에 앵커링 tx를 보낼 주기를 결정하는 파라미터입니다. 값을 10으로 설정하면 노드가 10블록마다 앵커링을 수행하도록 구성합니다. 기본값은 1입니다.

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

다음 명령을 실행하여 kscn을 다시 시작합니다:

```
SCN-L2-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-01$ kscnd start
Starting kscnd: OK
```

`subbridge.peers.length`를 확인하여 SCN-L2-01이 EN-01에 연결되어 있는지 확인합니다.

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

## 앵커링 <a id="anchoring"></a>

EN-01과 SCN-L2-01 연결을 완료한 후 앵커링을 통해 부모 체인에 서비스체인 블록 정보를 기록할 수 있습니다.
이 섹션에서는 부모 오퍼레이터 계정을 충전하고 앵커링을 활성화한 후 앵커링된 블록 번호를 확인합니다.

### 1단계: 앵커링을 테스트하기 위해 KAIA 받기 <a id="step-1-get-klay-to-test-anchoring"></a>

앵커링을 하려면 SCN-L2-01이 Kairos에 앵커링 트랜잭션을 만들어야 합니다. 따라서 `subbridge.parentOperator` 계정에 트랜잭션 수수료를 지불할 수 있는 충분한 KAIA가 있어야 합니다. [Kairos 월렛 Faucet](https://baobab.wallet.klaytn.foundation/)에서 KAIA를 받아 `parentOperator`에게 전송합니다. 실제 서비스에서 데이터 앵커링을 하기 위해서는 `parentOperator`가 트랜잭션 수수료를 지불할 수 있는 충분한 KAIA를 가지고 있어야 합니다.

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

![](/img/nodes/sc-en-scn-faucet.png)

### 2단계: 앵커링 시작 <a id="step-2-start-anchoring"></a>

앵커링을 시작하려면 다음 명령을 실행합니다:

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.anchoring(true)
true
```

앵커링이 시작된 후 `subbridge.latestAnchoredBlockNumber`를 사용하여 Kairos에 앵커링된 최신 블록을 확인할 수 있습니다. 이 방법은 EN이 이미 Kairos의 최신 블록을 추적한 후에만 작동한다는 점에 유의하세요. 기본적으로 SCN-L2-01은 앵커링이 켜진 블록부터 모든 블록에 앵커링을 시도합니다. 앵커링 주기는 `SC_ANCHORING_PERIOD`를 변경하여 설정할 수 있습니다. 이 값을 10으로 설정하면 노드는 블록 번호가 10의 배수일 때 앵커링을 시도합니다.

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```

![](/img/nodes/sc-en-scn-anchoring.png)
