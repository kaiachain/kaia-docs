# 형제 서비스 체인 간 밸류 전송

이 섹션에서는 서비스체인 네트워크 간에 밸류 전송을 활성화하는 방법을 설명합니다.
ServiceChain에서 제공하는 주요 기능인 데이터 앵커링과 밸류 전송은 독립적으로 사용할 수 있습니다. 즉, 다른 기능의 사용 여부와 상관없이 데이터 앵커링만 사용하거나 밸류 전송만 사용할 수 있습니다.

아래 그림과 같이 Kairos에 연결된 두 개의 서비스체인(체인ID 1002, 1004)이 있는 경우, 각 서비스체인이 Kairos와 데이터 앵커링을 수행하기 때문에 서로 간에 데이터 앵커링이 필요하지 않고 밸류 전송만 필요합니다.

두 서비스체인 사이에 브리지가 없을 때 값을 전송하려면 먼저 서비스체인(chainID 1002)에서 Kairos(chainID 1001)로 값을 전송한 다음 Kairos(chainID 1001)에서 다시 서비스체인(chainID 1004)으로 값을 전송해야 합니다. 이는 서비스체인(체인ID 1002)에서 서비스체인(체인ID 1004)으로 한 번에 직접 밸류 전송을 제공하는 것보다 비효율적입니다. 따라서 서비스체인 사이에 직접 브리지를 생성하면 효율적으로 밸류를 전송할 수 있습니다.

![](/img/nodes/sc-vt-between-sibling-arch.png)

## 전제 조건 <a id="prerequisites"></a>

- 두 개의 서비스체인을 설치했다고 가정하고, 각 서비스체인은 Kairos EN에 연결되어 있다고 가정합니다. [Kairos에 연결하기](en-scn-connection.md)를 참조하세요.
- 또한 [크로스체인 밸류 전송](value-transfer.md)을 통해 밸류 전송을 경험했다고 가정합니다.

위 그림과 같이 [Kairos에 연결하기](en-scn-connection.md)를 반복하여 ServiceChain(chianID 1004)을 추가로 설치합니다.

노드에는 메인 브리지와 서브 브리지가 각각 하나씩만 있을 수 있습니다. 이 예제에서는 설명의 편의를 위해 아직 메인 브리지와 서브 브리지가 모두 없는 노드인 SCN-L2-03과 SCN-L2-07에 브리지를 연결해 보겠습니다.

![](/img/nodes/sc-vt-between-sibling-bridge.png)

## 1단계: SCN-L2-03 노드의 KNI 확인 <a id="step-1-check-kni-of-scn-node"></a>

SCN 노드에서 연결할 때 사용되는 정보인 SCN-L2-03의 KNI를 기록해 두세요. 이 값은 다음 단계에서 `main-bridges.json`을 생성할 때 사용됩니다.

```
SCN-L2-03$ kscn attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://...39047242eb86278689...@[::]:50505?discport=0"
```

## 2단계: 메인 브리지 생성 <a id="step-2-create-main-bridges-json"></a>

SCN-L2-07(참고: chianID 1004)에 로그온하고 `~/data`에 `main-bridges.json`을 생성합니다. `@` 문자 뒤에 있는 `[::]`를 EN 노드의 IP 주소로 바꿉니다.

```
$ echo '["kni://...39047242eb86278689...@192.168.0.3:50505?discport=0"]' > ~/data/main-bridges.json
```

## 3단계: SCN 구성 후 재시작 <a id="step-3-configure-scn-then-restart"></a>

SCN-L2-07 노드의 셸에서 `kscn-XXXXX-amd64/conf/kscnd.conf`를 편집합니다. 각 서비스체인은 이미 Kairos EN에 앵커링되어 있으므로 형제간 데이터 앵커링은 필요하지 않습니다. 따라서 `SC_ANCHORING`을 0으로 설정합니다.

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1002
...
SC_ANCHORING=0
...
```

SCN-L2-07 노드에서 kscnd 재시작

```
SCN-L2-07$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-07$ kscnd start
Starting kscnd: OK
```

`subbridge.peers.length`를 확인하여 SCN-L2-07이 SCN-L2-03에 연결되어 있는지 확인합니다.

```
SCN-L2-07$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

밸류 전송의 경우, 체인ID 1002에 해당하는 정보를 메인 브리지 정보로 사용하고 체인ID 1004에 해당하는 정보를 서브 브리지로 설정하면 [체인 간 밸류 전송](value-transfer.md)에서와 같이 형제 체인 간 밸류 전송이 가능합니다.
