# 고가용성(high availability, HA) 구성하기

서비스 체인에서 하나의 브리지만 사용하는 경우, 해당 브리지가 단일 장애 지점이 될 수 있습니다. 이 문제를 해결하기 위해 두 개 이상의 브리지로 HA 시스템을 구축하는 방법을 설명합니다. 아래 그림과 같이 브리지를 두 개 이상 쌍으로 연결하도록 구성하면 하나의 브리지 연결에 문제가 발생하더라도 다른 브리지를 통해 체인 간 데이터 앵커링과 값 전송이 정상적으로 작동할 수 있습니다.

![](/img/nodes/sc-ha-arch.png)

## 전제 조건 <a id="prerequisites"></a>

- EN의 메인 브리지와 SCN의 서브 브리지가 연결되어 있어야 합니다. 연결되지 않은 경우, [Kairos 연결](en-scn-connection.md)을 참조하여 연결을 설정하세요.
- 이 섹션에서는 Kairos와 서비스체인 사이에 브리지를 추가하는 방법을 설명합니다. 같은 방법으로 다른 브리지를 추가하여 HA를 설정할 수도 있습니다.

## 1단계: EN-SCN 간에 다른 브리지 추가 <a id="step-1-adding-another-bridge-between-en-scn"></a>

[Kairos에 연결하기](en-scn-connection.md)에서는 브리지로 연결된 EN과 SCN을 각각 EN-01과 SCN-L2-01로 가정합니다. 이 섹션에서는 EN-02와 SCN-L2-02 사이에 브리지를 하나 더 추가하겠습니다.
동일한 절차를 따르므로 간략하게 설명하겠습니다.

![](/img/nodes/sc-ha-add-bridge.png)

EN-02를 빌드한 후 `conf/kend.conf`에서 `SC_MAIN_BRIDGE`를 1로 설정하고 EN-02에서 ken을 재시작합니다.

```console
SC_MAIN_BRIDGE=1
```

다음 명령어로 EN-02의 KNI 정보를 확인합니다:

```console
EN-02$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://eb8f21df10c6562...25bae@[::]:50505?discport=0"
```

SCN-L2-02에 로그인하고, KNI가 EN-02인 `main-bridges.json`을 생성합니다. 대괄호로 묶은 JSON 배열 형식이어야 합니다.

```console
SCN-L2-02$ echo '["kni://eb8f21df10c6562...25bae@192.168.0.5:50505?discport=0"]' > ~/data/main-bridges.json
```

SCN-L2-02의 셸에서 아래 설명과 같이 `kscn-XXXXX-amd64/conf/kscnd.conf`를 편집합니다.
브리지를 연결하려면 `SC_SUB_BRIDGE`를 1로 설정합니다.
`SC_PARENT_CHAIN_ID`는 Baobob의 `chainID` 1001로 설정합니다.
`SC_ANCHORING_PERIOD`는 앵커링 트랜잭션을 부모 체인에 전송할 주기를 결정하는 파라미터입니다. 이 예시에서는 자식 블록 10개마다 앵커 트랜잭션이 부모 체인(Kairos)에 전송됩니다.

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

EN-02에서 ken을 재시작하면 아래 그림과 같이 EN-02와 SCN-L2-02 사이에 브리지가 자동으로 연결되고 연결 지점부터 데이터 앵커링이 시작됩니다.

EN-02와 SCN-L2-02 사이에 브리지를 추가하고 나면 아래와 같이 노드 간 연결이 설정된 것을 확인할 수 있습니다.

![](/img/nodes/sc-ha-before-register.png)

## 2단계: 브릿지 컨트랙트 등록 및 구독 <a id="step-2-registering-and-subscribing-the-bridge-contract"></a>

위 그림과 같이 브리지 컨트랙트는 EN-01과 SCN-L2-01에만 등록되어 있습니다.

SCN-L2-02 콘솔에 접속하여 브리지 등록, 브리지 구독, 토큰 등록을 위한 API를 실행합니다. 브리지 컨트랙트와 토큰 컨트랙트는 [크로스체인 밸류 전송](value-transfer.md) 2단계에서 EN-01과 SCN-L2-01에 브리지 컨트랙트를 배포하는 과정에서 생성되었습니다.

```
$ kscn attach --datadir ~/data
> subbridge.registerBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.subscribeBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.registerToken("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR", "0xCHILD_TOKEN_ADDR", "0XPARENT_TOKEN_ADDR")
null
```

![](/img/nodes/sc-ha-before-register2.png)

브리지 컨트랙트에서 추가 브리지 추가에 대한 정보를 업데이트해야 합니다. 추가한 브리지의 자식 오퍼레이터와 부모 오퍼레이터 정보를 [서비스체인-가치-전송-예시](https://github.com/klaytn/servicechain-value-transfer-examples)의 `erc20/erc20-addOperator4HA.js` 파일에 작성하고 `node erc20-addOperator4HA.js`를 실행합니다.

```
// register operator
await conf.child.newInstanceBridge.methods.registerOperator("0xCHILD_BRIDGE_ADDR").send({ from: conf.child.sender, gas: 100000000, value: 0 });
await conf.parent.newInstanceBridge.methods.registerOperator("0xPARENT_BRIDGE_ADDR").send({ from: conf.parent.sender, gas: 100000000, value: 0 });
```

여러 개의 브리지가 있는 경우 임계값을 설정하면 보다 안전하게 값 전송을 제공할 수 있습니다. 임계값을 초과하는 오퍼레이터가 정상적으로 값 전송을 요청하는 경우에만 값 전송을 활성화할 수 있습니다. 예를 들어, 현재 예시와 같이 브리지 쌍이 2개이고 임계값을 2로 설정하면 두 개 모두 정상적으로 요청이 들어올 때만 값 전송을 제공할 수 있습니다. 즉, 하나의 브리지가 공격을 받아 비정상적인 요청을 보내더라도 이를 방지할 수 있습니다. 임계값의 기본값은 1입니다. [서비스체인-가치전송-예시](https://github.com/klaytn/servicechain-value-transfer-examples)의 `erc20/erc20-addOperator4HA.js` 파일에서 아래 코드를 주석 처리하고 임계값을 설정한 후 실행하여 브리지 컨트랙트에 대한 임계값을 변경합니다.

```
// // set threshold
// await conf.child.newInstanceBridge.methods.setOperatorThreshold(0, "your threshold number").send({ from: conf.child.sender, gas: 100000000, value: 0 });
// await conf.parent.newInstanceBridge.methods.setOperatorThreshold(0, "your threshold number").send({ from: conf.parent.sender, gas: 100000000, value: 0 });
```

등록이 완료되면 아래 그림과 같이 EN-02와 SCN-L2-02에 모두 브리지 컨트랙트가 등록되어 HA를 구성합니다.

![](/img/nodes/sc-ha-after-register.png)

HA를 위해 두 개 이상의 브리지 쌍이 연결되면 동일한 블록에 대한 데이터 앵커링 트랜잭션이 두 번 이상 발생하며, 밸류 전송 트랜잭션도 여러 번 발생할 수 있습니다. 즉, 추가 수수료가 필요합니다.
