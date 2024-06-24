# 중첩된 서비스 체인 생성

이 장에서는 이전 장에서 구축한 서비스체인 네트워크에 새로운 서비스체인 네트워크를 추가하여 계층 구조로 서비스체인 네트워크를 구축하는 방법을 설명합니다. 이 예제에서 추가할 서비스체인 네트워크도 4개의 SCN으로 구성됩니다. 이전 챕터에서 구축한 서비스체인 네트워크는 L2로 정의하고, 새로 구축할 서비스체인 네트워크는 L3로 정의합니다. L2와 L3 사이에 브리지를 연결하여 계층 구조를 만들겠습니다. 이번 장에서 구성할 ServiceChain 네트워크의 전체 구조는 아래 그림과 같습니다.

![](/img/nodes/sc-nestedsc-arch.png)

## 전제 조건 <a id="prerequisites"></a>

- [중첩된 서비스체인](nested-sc.md)에서 설명한 서비스체인 구성과 Baobab EN을 진행했다고 가정합니다. 따라서 이전 섹션에서 설명한 내용을 간략하게 설명하겠습니다.
- 가정 및 제한 사항
  - 하나의 EN은 서비스체인 L2의 SCN 중 하나에 일대일로 브리징할 수 있습니다. 마찬가지로 서비스체인 L2의 한 SCN은 L3의 SCN 중 하나에 일대일로 연결할 수 있습니다.
  - SCN 노드는 메인 브리지와 서브 브리지를 동시에 가질 수 있습니다. 단, 메인 브리지와 서브 브리지의 포트 번호는 다르게 설정해야 합니다. (예: 메인 브리지: 50505, 서브 브리지: 50506)
  - L2의 모든 SCN이 EN에 브리지될 필요는 없으며, 마찬가지로 L3의 SCN도 모두 L2에 브리지될 필요는 없습니다. 그러나 고가용성을 위해 체인 간에 두 개 이상의 메인 브리지 및 서브 브리지 쌍이 있는 것이 좋습니다. 이 장에서는 L2와 L3 사이에는 한 쌍만 연결되며, L2와 L3 사이의 고가용성은 Kairos와 L2 사이의 HA와 동일합니다.

## 1단계: L3용 Homi 데이터 생성 및 업데이트 <a id="step-1-create-and-update-homi"></a>

서비스체인 L2를 구성할 때와 마찬가지로 `homi` 명령어를 실행하여 L3 구축을 위한 스크립트와 설정 파일을 생성합니다. `homi`는 모든 Linux/Mac PC에서 실행할 수 있습니다. Kairos의 `chainID`는 `1001`이고, 앞선 예제에서 L2의 `chainID`는 `1002`로 설정되었기 때문에 편의상 L3의 `chainID`는 `1003`으로 설정합니다. 실제 서비스에서 블록체인을 운영할 때는 다른 서비스체인 및 EVM 체인과의 `chainID` 충돌을 피하기 위해 https://chainlist.defillama.com/ 에서 새로운 `chainID` 값을 등록해야 합니다.

```console
$ ./homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1003 --p2p-port 22323 -o homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/keys/passwd2
Created :  homi-output/keys/passwd3
Created :  homi-output/keys/passwd4
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/keys/nodekey2
Created :  homi-output/keys/validator2
Created :  homi-output/keys/nodekey3
Created :  homi-output/keys/validator3
Created :  homi-output/keys/nodekey4
Created :  homi-output/keys/validator4
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/keys_test/testkey1
Created :  homi-output/keys_test/keystore1/0xdC7218621513f71d609653d22C39d79d558d9CDC
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```

![](/img/nodes/sc-nestedsc-ip.png)

`homi-output/scripts/static-nodes.json`에서 ServiceChain L3 노드의 `IP address`와 `port` 정보를 업데이트합니다.

```json
[
     "kni://358235ccbf97a1f...787f7@192.168.0.21:22323?discport=0&type=cn",
     "kni://14ac4e3d53de5c7...6c91d@192.168.0.22:22323?discport=0&type=cn",
     "kni://5f36a456d93da09...8e216@192.168.0.23:22323?discport=0&type=cn",
     "kni://d62fd0928b9b6e5...6badf@192.168.0.24:22323?discport=0&type=cn"
]
```

ServiceChain L3의 모든 SCN 노드(SCN-L3-01, SCN-L3-02, SCN-L3-03, SCN-L3-04)에 `homi-output`을 복사합니다.

```console
$ scp -r path/to/homi-output user@192.168.0.21:~/ 
$ scp -r path/to/homi-output user@192.168.0.22:~/ 
$ scp -r path/to/homi-output user@192.168.0.23:~/ 
$ scp -r path/to/homi-output user@192.168.0.24:~/ 
```

모든 노드를 초기화합니다.

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json
$ ls ~/data
keystore	klay		kscn
```

모든 SCN(SCN-L3-01, SCN-L3-02, SCN-L3-03, SCN-L3-04)에 접속하여 `static-nodes.json`을 데이터 폴더 `~/data`에 복사한 후 `nodekeys`를 하나씩 복사합니다.

```console
$ cp   ~/homi-output/scripts/static-nodes.json   ~/data/
$ cp   ~/homi-output/keys/nodekey{1..4}   ~/data/klay/nodekey
```

## 2단계: L3에서 SCN 구성 <a id="step-2-scn-configuration"></a>

ServiceChain L3의 모든 SCN에서 `conf/kscnd.conf`를 다음과 같이 수정합니다: `PORT`는 서비스체인의 기본 포트인 22323을 사용합니다. `DATA_DIR`은 `~/data`입니다.

```
...
PORT=22323
...
DATA_DIR=~/data
...
```

L3의 모든 SCN 노드에서 ServiceChain을 실행하고 제대로 작동하는지 확인합니다.

```console
$ kscnd start
Starting kscnd: OK
$ kscn attach --datadir ~/data
> kaia.blockNumber
10
```

## 3단계: L2 메인 브리지 설정 후 재시작 <a id="step-3-restart-after-setting-L2-main-bridge"></a>

서비스체인 L2에서 메인 브리지 역할을 할 SCN-L2-03 노드의 콘솔에 연결합니다(참고: 이 노드는 L3에 있지 않고 L2에 있습니다).

![](/img/nodes/sc-nestedsc-id.png)

SCN-L2-03의 kscn 설정 파일 `conf/kscnd.conf`를 다음과 같이 수정합니다.

```console
SC_MAIN_BRIDGE=1
```

SCN-L2-03에서 kscnd를 재시작합니다.

```console
SCN-L2-03$ kscnd stop
SCN-L2-03$ kscnd start
```

## 4단계: 메인 브리지 노드의 KNI 확인 <a id="step-4-check-kni-of-main-bridge-node"></a>

SCN-L2-03 노드의 KNI 정보를 확인합니다. 이 값은 서비스체인 L3에서 서브 브리지를 설정할 SCN-L2-03 노드의 `main-bridges.json` 파일을 생성하는 데 사용됩니다.

![](/img/nodes/sc-nestedsc-nodeinfo.png)

```console
SCN-L2-03$ kscn   attach   --datadir   ~/data
> mainbridge.nodeInfo.kni
"kni://87989a5a5dcc165...85b16b@[::]:50505?discport=0"
```

## 5단계: L3 서브 브리지 구성 <a id="step-5-configure-l3-sub-bridge"></a>

서비스체인 L3의 서브 브리지가 있는 SCN-L3-01 노드에 연결합니다(참고: L2가 아님). `~/data` 폴더 아래에 `main-bridges.json`을 생성합니다. @ 뒤의 [::]를 4단계에서 확인한 노드의 IP 주소로 바꿉니다.

```console
SCN-L3-01$ echo '["kni://87989a5a5dcc165...85b16b@192.168.0.13:50505?discport=0"]' > ~/data/main-bridges.json
```

서브브릿지가 있는 SCN-L3-01 노드의 설정 파일 `conf/kscnd.conf`를 다음과 같이 수정합니다. 브릿지 연결을 활성화하기 위해 `SC_SUB_BRIDGE`를 1로 설정하고, `SC_PARENT_CHAIN_ID`는 `1002`, L2의 `chainID`, 재시작 시 데이터를 자동으로 앵커링하도록 `SC_ANCHORING`을 1로 설정합니다. SCN-L3-01 셸에 접속하여 `subbridge.anchoring(true)` 명령으로 데이터 앵커링을 켜거나 `subbridge.anchoring(false)` 명령으로 끌 수도 있습니다. `SC_ANCHORING_PERIOD`는 앵커링 트랜잭션을 부모 체인에 전송하는 빈도를 결정하는 파라미터입니다. 값을 10으로 지정하여 10블록마다 노드를 앵커링하도록 설정합니다. 기본값은 1입니다.

```console
SC_SUB_BRIDGE=1
…
SC_PARENT_CHAIN_ID=1002
…
SC_ANCHORING=1
SC_ANCHORING_PERIOD=10
```

설정을 완료한 후 SCN-L3-01에서 kscnd를 재시작합니다.

```console
SCN-L3-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L3-01$ kscnd start
Starting kscnd: OK
```

`subbridge.peers.length`를 확인하여 SCN-L3-01이 SCN-L2-03에 연결되어 있는지 확인하고, `subbridge.latestAnchoredBlockNumber`를 확인하여 최근 앵커링된 블록 번호를 확인하여 앵커링이 진행 중인지 확인합니다.

```console
SCN-L3-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
> subbridge.latestAnchoredBlockNumber
5010
```
