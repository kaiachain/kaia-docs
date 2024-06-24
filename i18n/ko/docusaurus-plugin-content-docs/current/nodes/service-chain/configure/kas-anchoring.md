# KAS로 데이터 앵커링 사용

디자인 섹션에서 설명한 것처럼 서비스 체인 데이터를 카이아 메인체인에 앵커링할 수 있습니다.
이 페이지에서는 [KAS(Kaia API 서비스)](https://www.klaytnapi.com)를 통해 데이터 앵커링을 활성화하는 방법을 소개합니다.

이 기능을 켜면 서비스 체인의 노드는 서비스 체인의 존재와 불변성을 증명하기 위해 주기적으로 체인 데이터(블록 데이터)를 메인넷 또는 Kairos에 앵커링할 수 있습니다.
이를 통해 서비스 체인의 보안과 신뢰성을 보장할 수 있습니다.

## KAS 사용 준비 <a id="preparation-with-kas"></a>

이 섹션에서는 데이터 앵커링에 KAS를 사용하기 위한 전제 조건에 대해 소개합니다.

### KAS(카이아 API 서비스) 가입하기 <a id="sign-up-kas"></a>

먼저, KAS 계정을 발급받기 위해서는 [KAS 콘솔 웹사이트](https://www.klaytnapi.com)에서 KAS를 가입해야 합니다.
위 웹사이트에 접속하여 KAS에 가입하세요.

[![메인 페이지](/img/nodes/kas-main-en.png)](https://www.klaytnapi.com)

[![가입](/img/nodes/kas-signup-en.png)](https://www.klaytnapi.com)

### 인증정보 만들기 <a id="check-credential"></a>

로그인 후 아래와 같이 크리덴셜을 생성할 수 있습니다.
`AccessKey ID`와 `Secret AccessKey` 또는 `Authorization`은 KAS API를 호출할 때 사용됩니다.

![자격증명](/img/nodes/kas-credential-en.png)

## 앵커 API <a id="anchor-api"></a>

KAS는 데이터 앵커링을 위해 설계된 앵커 API를 제공하고 있으며, 앵커링 작업에 사용하실 것입니다.

![앵커 API](/img/nodes/kas-anchor-api-en.png)

## 오퍼레이터 주소 생성 <a id="create-kas-credential"></a>

KAS를 통해 서비스체인 데이터를 앵커링하려면, 실제로 카이아에 앵커링 트랜잭션을 전송하는 카이아 주소가 KAS에 등록되어 있어야 합니다. 따라서 서비스 노드를 설정하기 전에 KAS를 통해 "operator"라는 카이아 계정을 생성해야 합니다. 이 계정은 KAS 콘솔에서 생성할 수 있습니다.

주의할 점은 **KAS 콘솔 페이지의 오른쪽 상단에서** 데이터를 앵커링할 체인을 카이아에서 **먼저 선택**해야 한다는 점입니다. 각 체인에 대한 오퍼레이터를 생성해야 합니다(Mainnet/Kairos).

![선택 체인](/img/nodes/kas-select-chain-en.png)

아래와 같이 연산자를 생성합니다.

![연산자 만들기](/img/nodes/kas-create-operator-en.png)

그러면 아래와 같이 운영자 목록을 확인할 수 있습니다.
서비스 체인 노드를 설정하려면 오퍼레이터의 주소가 필요합니다.

![연산자 만들기](/img/nodes/kas-operator-list-en.png)

## 서비스 체인 노드 구성하기 <a id="configure-service-chain-node"></a>

KAS에서 API 자격 증명, 앵커 API 정보(API 엔드포인트 및 파라미터), 운영자 계정을 획득했다면 이제 서비스 체인 노드를 설정할 차례입니다.
아래와 같이 서비스 체인 노드의 설정 파일(`kscnd.conf`, `kspnd.conf`, `ksend.conf`)을 수정해야 합니다.

`SC_SUB_BRIDGE=1` 및 모든 `SC_KAS_` 접두사 항목을 설정해야 합니다.

```bash
...
# service chain options setting
...
SC_SUB_BRIDGE=1
...

SC_KAS_ANCHOR=1                                                         # 1: enable, 0: disable
SC_KAS_ANCHOR_PERIOD=10                                                 # Anchoring block period
SC_KAS_ANCHOR_URL="https://anchor-api.klaytn.com/v1/anchor"             # Anchor API URL
SC_KAS_ANCHOR_OPERATOR="0x6A3D565C4a2a4cd0Fb3df8EDfb63a151717EA1D7"     # Operator address
SC_KAS_ANCHOR_ACCESS_KEY="KAJM4BEIR9SKJKAW1G3TT8GX"                     # Credential Access key
SC_KAS_ANCHOR_SECRET_KEY="KyD5w9ZlZQ7ejj6lDF6elb61u8JH/mXdKqhgr3yF"     # Credential Secret key
SC_KAS_ANCHOR_X_CHAIN_ID=1001                                           # Mainnet: 8217, Kairos: 1001
...
```

## 서비스 체인 노드 실행 <a id="run-service-chain-node"></a>

이제 준비되었습니다. 서비스 체인 노드를 실행할 수 있습니다.
아래와 같이 KAS 앵커 API와 관련된 로그 메시지를 확인할 수 있습니다.

```bash
...
INFO[09/10,18:09:28 +09] [5] Imported new chain segment                number=86495 hash=5a20d6…cbca1b blocks=1  txs=3 elapsed=2.387ms  trieDBSize=5.10kB mgas=0.063 mgasps=26.383
INFO[09/10,18:09:28 +09] [53] Anchored a block via KAS                  blkNum=86495
INFO[09/10,18:09:29 +09] [5] Imported new chain segment                number=86496 hash=8897bc…4ea7e7 blocks=1  txs=3 elapsed=2.158ms  trieDBSize=5.10kB mgas=0.063 mgasps=29.188
INFO[09/10,18:09:29 +09] [53] Anchored a block via KAS                  blkNum=86496
INFO[09/10,18:09:30 +09] [5] Imported new chain segment                number=86497 hash=44b319…7d4247 blocks=1  txs=3 elapsed=2.346ms  trieDBSize=5.43kB mgas=0.063 mgasps=26.848
INFO[09/10,18:09:30 +09] [53] Anchored a block via KAS                  blkNum=86497
INFO[09/10,18:09:31 +09] [5] Imported new chain segment                number=86498 hash=0b98ba…73d654 blocks=1  txs=3 elapsed=2.235ms  trieDBSize=5.61kB mgas=0.063 mgasps=28.186
INFO[09/10,18:09:31 +09] [53] Anchored a block via KAS                  blkNum=86498
INFO[09/10,18:09:32 +09] [5] Imported new chain segment                number=86499 hash=4f01ab…3bc334 blocks=1  txs=3 elapsed=3.319ms  trieDBSize=5.61kB mgas=0.063 mgasps=18.977
INFO[09/10,18:09:32 +09] [53] Anchored a block via KAS                  blkNum=86499
...
```

## 트랜잭션 목록 <a id="list-of-transaction"></a>

KAS 콘솔 웹사이트의 "KAS Console - Service - Anchor - Operators" 메뉴에서 아래와 같이 서비스 체인의 오퍼레이터가 전송한 앵커링 트랜잭션 목록을 확인할 수 있습니다.

![앵커링 트랜잭션 목록](/img/nodes/kas-tx-list-en.png)
