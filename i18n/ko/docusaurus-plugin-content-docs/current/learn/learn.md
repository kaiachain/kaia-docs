# 개요

카이아는 엔터프라이즈급 안정성을 충족하는 것을 목표로 하는 고도로 최적화된 BFT 기반 퍼블릭 블록체인입니다.
주요 설계 목표는 다음과 같습니다;

- 즉각적인 완결성.
- 실제 사용 사례를 충족하는 높은 TPS.
- 블록체인 애플리케이션 실행 비용 절감.
- 최종 사용자의 진입 장벽을 낮춥니다.
- 업계의 기술 채택 프로세스를 간소화합니다.

Kaia continues to generate blocks on top of the Klaytn blockchain launched on June 27, 2019, with the following specifications:

- 1초의 블록 생성 및 확인 시간.
- 초당 4,000건의 트랜잭션.
- 이더리움의 1/10에 불과한 낮은 가스 가격.
- EVM(이더리움 가상 머신)을 실행하고 Solidity 컨트랙트 실행을 지원합니다.
- 19 reputable corporations worldwide initially formed <LinkWithTooltip to="../misc/glossary#klaytn-governance-council-kgc" tooltip="A consortium governing Kaia blockchain development and operations.">Kaia Governance Council</LinkWithTooltip> to operate <LinkWithTooltip to="../misc/glossary#consensus-node-cn" tooltip="Consensus node (CN) validates transactions, builds blocks,<br />  and achieves network agreement.">consensus nodes</LinkWithTooltip>. The current number of consensus nodes is shown in the [Kaiascope](https://kaiascope.com/).
- 50개 이상의 초기 서비스 파트너들이 카이아에서 블록체인 애플리케이션을 출시하기로 약속했습니다.

## 카이아: 개관 <a id="klaytn-the-big-picture"></a>

카이아는 역할과 목적에 따라 세 개의 논리적 하위 네트워크로 나눌 수 있습니다. 아래 그림은 카이아 생태계의 개략적인 모습을 보여줍니다.

![Kaia 생태계와 논리적 하위 네트워크 (CCN, ENN, SCN)](/img/learn/klaytn_network_overview.png)

### 코어 셀 네트워크(CCN) <a id="core-cell-network-ccn"></a>

CCN은 엔드포인트 노드(EN)를 통해 제출된 트랜잭션을 검증하고 실행하는 코어 셀(CC)로 구성됩니다.
CCN은 네트워크 전체에 블록을 생성하고 전파하는 역할을 담당합니다.

### 엔드포인트 노드 네트워크(ENN) <a id="endpoint-node-network-enn"></a>

ENN은 주로 트랜잭션을 생성하고, RPC API 요청을 처리하며, 서비스 체인의 데이터 요청을 처리하는 엔드포인트 노드(EN)로 구성됩니다.

### 서비스 체인 네트워크(SCN) <a id="service-chain-network-scn"></a>

SCN은 dApp(탈중앙화 애플리케이션)이 독립적으로 운영하는 보조 블록체인으로 구성된 Kaia 서브네트워크입니다. 서비스 체인은 EN을 통해 메인 체인에 연결됩니다.

**코어 셀 네트워크**와 **엔드포인트 노드 네트워크**는 카이아 메인체인 또는 메인넷을 구성합니다.
블록체인 애플리케이션은 카이아 메인체인에서 실행하거나 **서비스체인**이라는 자체 블록체인에서 실행할 수 있습니다. 높은 TPS와 구성 가능한 네트워크 정책을 보장하는 애플리케이션 전용 실행 환경을 원한다면 서비스체인을 사용하는 것을 추천합니다.

> 애플리케이션에 맞는 서비스 체인을 설정하려면 [서비스 체인 설치 및 운영 가이드](../nodes/service-chain/quick-start/quick-start.md)를 참조하세요.

## 카이아 네트워크 토폴로지 <a id="klaytn-network-topology"></a>

이 섹션에서는 카이아 메인체인의 네트워크 토폴로지에 대해 설명하겠습니다.
카이아에서는 네트워크 성능을 최적화하기 위해 역할 기반 노드 유형을 가진 계층화된 네트워크 아키텍처가 구현되어 있습니다.

### 역할 기반 노드 유형 <a id="role-based-node-types"></a>

카이아 메인체인 네트워크 토폴로지를 살펴보기 전에,
다양한 유형의 카이아 노드에 대해 알아볼 필요가 있습니다.

#### 코어 셀(CC): 컨센서스 노드(CN) + 프록시 노드(PN) <a id="core-cell-cc-consensus-node-cn-proxy-node-pn"></a>

코어 셀(CC)은 하나의 **컨센서스 노드(CN)** 와 두 개의 **프록시 노드(PN)** 로 구성됩니다.
합의 노드는 블록 생성 과정에 참여하며, 프록시 노드는 네트워크에 인터페이스를 제공합니다. PN은 트랜잭션 요청을 컨센서스 노드로 전송하고, 블록을 엔드포인트 노드로 전파합니다.

> 코어 셀 운영자가 되고 싶다면 [코어 셀 설치 및 운영 가이드](../nodes/core-cell/install/before-you-install.md)를 읽어보세요.

#### 엔드포인트 노드(EN) <a id="endpoint-node-en"></a>

RPC API 요청을 처리하고, 서비스 체인과 주고받는 데이터를 처리합니다.

> 애플리케이션에 맞는 엔드포인트 노드를 설정하려면 [엔드포인트 노드 설치 및 운영 가이드](../nodes/endpoint-node/endpoint-node.md)를 참조하세요.

#### 부트노드 <a id="bootnode"></a>

부트노드는 새로 참여하는 노드가 네트워크에 등록하고 연결할 다른 노드를 찾는 것을 돕기 위해 카이아에서 운영하는 특수한 유형의 노드입니다.
CN 부트노드는 CNN 내에 존재하며 대중에게 노출되지 않는 반면, PN과 EN 부트노드는 공개적으로 볼 수 있습니다.  PN 부트노드는 허용된 PN만 등록할 수 있으며, 적격 PN이 EN과 연결할 수 있도록 허용합니다.  EN 부트노드는 EN에 연결할 PN에 대한 정보를 제공합니다.

### 계층형 네트워크 <a id="tiered-networks"></a>

CN, PN, EN은 각각 논리적 네트워크, 합의 노드 네트워크(CNN), 프록시 노드 네트워크(PNN), 엔드포인트 노드 네트워크(ENN)를 구성합니다.

(CCN)은 다시 합의 노드 네트워크(CNN)와 프록시 노드 네트워크(PNN)로 세분화됩니다.
엔드포인트 노드 네트워크(ENN)는 PNN에 직접 연결된 주변 네트워크로도 볼 수 있습니다.

![Kaia 메인체인 물리 토폴로지 및 계층화된 구조(CNN, PNN, ENN)](/img/learn/klaytn_network_node.png)

#### 컨센서스 노드 네트워크(CNN) <a id="consensus-node-network-cnn"></a>

CN은 서로 간에 CNN이라는 풀 메시 네트워크를 형성합니다. CNN은 BFT를
를 적용하며, 충분한 성능 수준에서 BFT 합의를 수행하기 위해 각 CN이 [엄격한 하드웨어 및 네트워크 리소스 요구 사항](./../nodes/core-cell/system-requirements.md)을 충족하도록 요구합니다.

#### 프록시 노드 네트워크(PNN) <a id="proxy-node-network-pnn"></a>

PNN은 PN으로 구성됩니다.
일반적으로 PN은 인접한 코어 셀에 있는 PN과 단 하나의 연결만 유지합니다.
피어 연결 수는 네트워크 구성에 따라 변경될 수 있습니다.

#### 엔드포인트 노드 네트워크(ENN) <a id="endpoint-node-network-enn"></a>

가장 바깥쪽 하위 네트워크인 ENN은 서로 연결된 EN으로만 구성됩니다.

## 블록 생성 및 전파 <a id="block-generation-and-propagation"></a>

블록 생성 및 전파 설계는 사용되는 합의 알고리즘과 함께
알고리즘과 함께 블록체인 플랫폼의 지연 시간을 줄이는 데 중요한 역할을 합니다.

### 블록 생성 주기 <a id="block-generation-cycle"></a>

카이아에서 '라운드'는 블록 생성 주기를 의미합니다. 각 라운드는 새로운
블록을 생성하고 바로 다음 라운드가 시작됩니다. Klaytn의 목표는
각 라운드는 약 1초를 목표로 하지만, 블록 생성 간격은
은 네트워크 트래픽과 노드 운영 조건에 영향을 받을 수 있습니다.

#### 제안자 및 위원회 선정 <a id="proposer-and-committee-selection"></a>

In each round, Kaia randomly but deterministically selects a Consensus Node
(CN) as the <LinkWithTooltip to="../misc/glossary#proposer" tooltip="A randomly chosen consensus node for block creation.">proposer</LinkWithTooltip> for the block to be created, and then selects a group of CNs as the committee for the given round. 카이아는 제안자나 위원회 선정에 직접 관여하지 않으며, 대신 각 CN은 가장 최근의 블록에서 파생된 가장 최근의 블록 헤더에서 파생된 난수를 사용하여 암호화 연산을 실행하여 해당 CN이 이번 라운드에 선택되었는지 여부를 증명합니다. CNN의 크기가 작으면 제안자를 제외한 모든 CN을
위원으로 선정될 수 있습니다.

#### 블록 제안 및 검증 <a id="block-proposal-and-validation"></a>

라운드에 선정되면 제안자는 해당 라운드에 대한 선택 증명(즉, 제안자의 공개 키로 확인할 수 있는 암호학적 증명)을 모든 CN에게 브로드캐스트합니다. 그 후, 해당 라운드의 위원회로 선정된 CN은 자신의 선택 증명을 통해 제안자에게 응답하여 제안할 새 블록을 브로드캐스트할 대상자를 제안자에게 알립니다. 그런 다음 제안자는 트랜잭션 풀에서 트랜잭션 세트를 선택하고 이를 순서대로 정렬하여 블록을 생성합니다.
마지막으로 제안자는 위원회와 합의를 실행하여 새로 생성된 블록을 합의하고 확정합니다. 카이아는 보안과 효율성을 높이기 위해 합의 알고리즘을 지속적으로 개선할 계획입니다.

### 블록 전파 <a id="block-propagation"></a>

제안된 블록은 위원회의 3분의 2 이상의 위원회 멤버의 서명을 받아야 성공적으로 확정됩니다. 위원회가 합의에 도달하면 합의에 도달하면 새 블록이 모든 CN에 전파되고 합의 라운드가 종료됩니다.
새 블록이 모든 CN에게 전파되면 새로 생성된 블록의 정보는 새로 생성된 블록의 정보는 다음과 같은 방법으로 모든 Kaia 네트워크 참여자에게 제공될 수 있습니다.

## 외부 공개 및 공개 검증 <a id="public-disclosure-and-open-validation"></a>

카이아 네트워크의 서비스 제공자와 최종 사용자는 블록 생성 결과를 자유롭게 검증할 수 있으며, CN 위원회가 적절한 절차에 따라 블록을 생성했는지 확인할 수 있습니다. 이러한 검증에는 블록 헤더에 위원회 서명의 3분의 2 이상이 포함되어 있는지 확인하는 것이 포함됩니다. 모든 CN은 공개 검증을 지원해야 하며, 공개적으로 접근할 수 있는 공간(예: 블록 헤더)에 공개 키(블록 서명에 사용)를 게시해야 합니다. 공개 검증은 투명성을 높이고, 검열을 억제하며, 악의적인 행동을 방지합니다.

## 블록과 트랜잭션에 대한 분리된 전파 채널(멀티채널 전파) <a id="separated-propagation-channels-for-blocks-and-transactions-multichannel-propagat"></a>

네트워크의 지연 시간은 네트워크의 혼잡도에 따라 크게 영향을 받습니다. 네트워크의 처리량이 일정하다고 가정할 때, 트랜잭션 수가 증가하면 네트워크 지연 시간도 그에 비례하여 지연됩니다. 기존 모바일 앱이나 웹 서비스의 일반적인 사용자들은 몇 초 이상 걸리는 응답 시간을 용납하지 않으며, 블록체인 서비스는 사용자 인내심이 더 높을 것이라고 가정할 이유가 없습니다.

카이아는 네트워크 혼잡 문제를 처리하기 위해 멀티채널 접근 방식을 채택합니다. 트랜잭션과 블록에 별도의 전파 채널을 할당함으로써 카이아 네트워크는 많은 트랜잭션으로 인해 네트워크가 심한 정체에 직면하더라도 새로 생성된 블록을 적시에 전파할 수 있습니다.
이러한 방식으로 카이아는 네트워크의 dApp들이 간헐적인 네트워크 트래픽 폭증에도 불구하고 최종 사용자의 요청에 계속 응답할 수 있도록 보장합니다.

## 블록 보상 <a id="block-rewards"></a>

For each round, block reward (which is the sum of 6.4 newly minted <LinkWithTooltip tooltip="The native token of the Kaia blockchain.">KAIA</LinkWithTooltip> and
transaction fees paid to process the block) will be distributed to
the network participants according to preset distribution ratios. 새로 생성된 블록의 제안자는 CN에게 지급되는 보상의 100%를 받게 되는 반면, 위원회는 아무것도 받지 못합니다. 제안자로 선정될 확률은 CN이 스테이킹한 KAIA의 양에 영향을 받으며, 이는 플랫폼에 더 많은 KAIA를 투자한 CN이 확률적으로 더 많은 보상을 받을 수 있다는 것을 의미합니다. 블록 보상 분배에 대한 자세한 내용은 [카이아 토큰 이코노미](./token-economy.md) 섹션에서 확인할 수 있습니다.
