# 용어집

이 용어집은 카이아 블록체인과 관련된 기술 용어에 대한 설명을 제공합니다. 카이아 문서, 가이드, 튜토리얼을 살펴보면서 접하게 될 수많은 용어를 이해하기 위한 길잡이 역할을 합니다.

### 앵커

블록체인 외부에 저장된 데이터에 대한 암호학적으로 안전한 참조입니다. 앵커는 서로 다른 시스템의 데이터를 연결하거나 특정 시점의 데이터 존재에 대한 변조 방지 증거를 제공하는 데 사용할 수 있습니다.

### 앵커링

블록체인에 앵커를 저장하는 과정입니다. 이는 외부 데이터의 해시가 포함된 트랜잭션을 생성하거나 외부 데이터를 참조하는 스마트 컨트랙트를 생성하여 수행할 수 있습니다(예: [서비스 체인에 앵커링](../nodes/service-chain/configure/anchoring.md)).

### Kairos

카이아 플랫폼의 퍼블릭 테스트넷입니다. 개발자가 메인넷에 배포하기 전에 애플리케이션을 테스트하고 검증하는 데 사용됩니다.

### 블록 탐색기

사용자가 블록체인의 데이터를 보고 검색할 수 있는 웹 기반 도구입니다. 블록 탐색기는 일반적으로 블록 높이, 블록 해시, 트랜잭션 해시, 트랜잭션 발신자 및 수신자, 트랜잭션 금액, 트랜잭션 상태와 같은 정보를 표시합니다.

The block explorers available in Kaia are [Kaiascope](../build/tools/block-explorers/kaiascope.md) and [Kaiascan](https://www.kaiascan.io/).

### 코어 셀(CC, Core Cell)

트랜잭션을 실행하고 블록을 생성하는 카이아 블록체인 아키텍처의 엔티티입니다. 코어 셀은 일반적으로 합의 노드와 여러 프록시 노드로 구성됩니다.

[컨센서스 노드(CN)](#consensus-node-cn), [프록시 노드(PN)](#proxy-node-pn)도 참조하세요.

### 코어 셀 노드 네트워크(CCN)

서로 연결된 코어 셀 노드 그룹입니다.

### 합의 노드(CN, Consensus Node)

블록을 생성하고 전파하며, 카이아 블록체인의 상태에 대한 합의에 도달하는 역할을 하는 노드입니다. 합의 노드는 제출된 트랜잭션의 유효성을 검사하고 유효한 트랜잭션을 실행합니다.

### 엔드포인트 노드(EN, Endpoint Node)

서비스체인과 dApp이 노출된 RPC API를 통해 카이아 블록체인과 상호작용할 수 있는 진입점 역할을 하는 노드입니다. 엔드포인트 노드는 전체 블록체인 원장을 동기화하고 프록시 노드를 거치지 않고 블록체인 데이터를 읽거나 트랜잭션을 네트워크에 직접 전송할 수 있습니다.

### 엔드포인트 노드 네트워크(ENN)

서로 연결된 엔드포인트 노드 그룹입니다.

### 외부 소유 계정(EOA, Externally Owned Account)

개인 키로 제어되는 블록체인 상의 계정입니다. 개인 키는 사용자가 보유하며 트랜잭션에 서명하는 데 사용됩니다. EOA는 블록체인에서 가장 일반적인 계정 유형으로, 개인과 기업이 블록체인과 상호 작용하는 데 사용됩니다.

[스마트 컨트랙트 계정(SCA)](#smart-contract-account-sca)도 참조하세요.

### 수수료 위임(Fee delegation)

일부 블록체인 네트워크에서 사용자가 트랜잭션 수수료를 대신 지불할 다른 계정을 지정할 수 있는 메커니즘입니다. 이를 통해 사용자는 자신의 계정 잔액에서 직접 수수료를 지불할 필요 없이 트랜잭션을 제출하고 처리할 수 있습니다.

### 거버넌스 카운슬(GC, Governance Council)

블록체인 네트워크에 대한 감독 및 의사 결정 권한을 확립하고 유지하기 위해 구성된 그룹 또는 조직입니다. 블록체인 거버넌스 카운슬은 일반적으로 운영 절차 수립, 분쟁 해결, 프로토콜 업그레이드 승인, 네트워크 내 모든 이해관계자의 이익 대변과 같은 업무를 정의합니다.

### 프로세스 간 통신(IPC, Inter-process Communication)

하나 이상의 컴퓨터에서 두 개 이상의 프로세스 간에 데이터를 교환하기 위한 일련의 기술입니다. 운영 체제 및 분산 시스템의 기본 부분이며 웹 서버, 데이터베이스 및 그래픽 사용자 인터페이스를 비롯한 다양한 유형의 소프트웨어에서 사용됩니다.

### Interplanetary File System (IPFS)

사용자가 분산된 방식으로 파일을 저장하고 공유할 수 있는 피어 투 피어 분산 파일 시스템입니다. IPFS는 콘텐츠 주소 체계를 사용하여 각 파일을 고유하게 식별하고 분산된 노드 네트워크에 파일을 저장합니다.

### Kaia Ecosystem Fund (KEF)

카이아 재단이 카이아 블록체인 생태계의 성장과 발전에 기여하는 이니셔티브를 지원하기 위해 설립한 기금입니다. The KEF provides grants and financial support to projects, organizations, and individuals working to expand usage and adoption of Kaia. The goal of the KEF is to advance innovation and community growth around Kaia through funded initiatives.

### 카이아 엔드포인트 노드(KEN)

[엔드포인트 노드(EN)](#endpoint-node-en)를 참조하세요.

### Kaia Infrastructure Fund (KIF)

카이아 재단이 운영 비용과 장기적인 이니셔티브를 지원하기 위해 설립한 예비 기금입니다. The KIF aids in funding the Foundation's work to further develop and enhance the Kaia blockchain protocol and ecosystem through research, business development activities, education programs and more.

### 카이아 거버넌스 카운슬(KGC, Kaia Governance Council)

카이아 블록체인의 관리를 담당하는 조직들의 협의체입니다. GC 멤버는 카이아 재단이 선정하며, 카이아 네트워크에서 합의 노드를 운영해야 합니다. GC는 업그레이드, 파트너십, 생태계 개발 이니셔티브 등 카이아 블록체인의 개발과 운영에 관한 의사결정을 내릴 책임이 있습니다.

### 카이아 개선 제안(KIP, Kaia Improvement Proposal)

카이아 블록체인 네트워크의 새로운 기능이나 프로세스에 관한 정보를 카이아 이해관계자들에게 제공하는 설계 문서입니다. KIP는 프로토콜 업그레이드와 혁신을 제안, 검토, 채택하기 위한 일관되고 통제된 메커니즘을 제공하기 위한 것입니다. 이를 통해 지지자들은 카이아 커뮤니티와 협력하여 잠재적인 프로토콜 업그레이드를 소프트웨어에 포함하기 전에 구체화할 수 있습니다.

KIP의 대표적인 예로는 [KIP-7](http://kips.klaytn.foundation/KIPs/kip-7), [KIP-17](http://kips.klaytn.foundation/KIPs/kip-17), [KIP-37](http://kips.klaytn.foundation/KIPs/kip-37)이 있습니다.

### Kaia State

This is the world state of accounts in Kaia containing the balances, storage variables of the account and the hash of the code or bytecode depending on if the account is an EOA or SCA.

### 카이아 가상머신(KLVM, Kaia virtual machine)

카이아 스마트 컨트랙트를 실행하는 가상 상태 머신입니다. 이더리움 가상머신(EVM)에서 파생된 준 튜링 완전 스택 기반 가상머신입니다. KLVM은 카이아 블록체인에서 스마트 컨트랙트를 처리하고 실행하는 역할을 담당합니다.

### 카이아 네트워크 식별자(KNI, Kaia network identifier)

카이아 노드를 식별하기 위한 고유한 리소스 식별자 체계입니다. nodeID, 호스트명, 포트, 디스크로 구성됩니다.

### 제안자

블록 생성의 각 라운드에서 합의 노드(CN)에 할당된 역할입니다. 제안자는 다음 블록을 생성하기 위해 무작위적이지만 결정론적으로 선택됩니다. CN이 제안자로 선정될 확률은 해당 CN이 보유한 카이아 토큰, 즉 KAIA의 양에 따라 결정됩니다.

### 프록시 노드(PN, Proxy Node)

엔드포인트 노드(EN)에서 컨센서스 노드(CN)로 트랜잭션을 중계하는 역할을 담당하는 노드입니다. EN과 CN 간의 직접적인 통신 부하를 줄여 네트워크의 성능을 향상시키는 데 도움을 줍니다.

### Recursive-length Prefix(RLP)

컴퓨터 네트워킹에서 접두사의 길이가 주소 정보의 일부로 포함되는 주소 접두사 형식으로, 각 경로마다 접두사 길이를 별도로 저장할 필요가 없어 보다 효율적인 라우팅을 가능하게 합니다. Kaia는 재귀적 길이 접두사를 사용하여 블록체인 주소를 표현합니다.

### 원격 프로시저 호출(RPC, Remote Procedure Call)

한 컴퓨터의 프로그램이 네트워크 내의 다른 컴퓨터(주로 원격 컴퓨터)에 있는 프로그램에서 코드를 실행하거나 서비스를 요청할 수 있도록 하는 통신 프로토콜입니다.

### Soul-bound token(SBT)

Web3 생태계에서 개인의 정체성과 업적을 나타내는 양도 불가능한 토큰입니다. 특정 개인 또는 암호화폐 지갑에 영구적으로 묶여 있는 대체 불가능한 토큰(NFT)의 일종입니다.

### 스마트 컨트랙트 계정(SCA,Smart Contract Account)

스마트 컨트랙트에 의해 제어되는 블록체인 상의 계정입니다. 스마트 컨트랙트는 구매자와 판매자 간의 컨트랙트 조건이 코드 줄로 직접 작성된 자체 실행형 컨트랙트입니다. SCA는 블록체인에서 거래와 컨트랙트를 자동화하는 데 사용됩니다.

[외부 소유 계정(EOA, Externally Owned Account)](#externally-owned-account-eoa)도 참조하세요.

### 서비스 체인

카이아 메인넷에 연결된 사이드체인 또는 보조 블록체인입니다. 서비스 체인은 즉각적인 완결성, 크로스체인 토큰 전송, 메인체인에 데이터 앵커링 등 다양한 애플리케이션이나 산업의 특정 요구사항을 충족하도록 설계되었습니다.

### 서비스체인 합의 노드(SCN)

카이아 서비스체인에서 합의 과정에 참여하는 역할을 담당하는 노드입니다.

[컨센서스 노드(CN)](#consensus-node-cn), [서비스 체인](#service-chain)도 참조하세요.

### 서비스체인 엔드포인트 노드(SEN)

서비스체인과 상호작용할 수 있는 퍼블릭 인터페이스를 제공하는 카이아 서비스체인의 노드입니다.

[엔드포인트 노드(EN)](#endpoint-node-en), [서비스 체인](#service-chain)도 참조하세요.

### state migration

This process involves removing unnecessary or outdated data from the blockchain to reduce the amount of required storage space and improve efficiency.

### transaction pool

A critical component for managing pending and queued transactions awaiting inclusion in the next blocks within the network.

### 검증자

새로운 블록에 포함된 데이터의 정확성을 검증하고 블록이 네트워크에서 효율적으로 처리되도록 하는 노드입니다. 카이아의 비허가형 검증 구조에서는 기존의 거버넌스 카운슬 구조와 역할을 유지하면서 일정 자격을 갖추면 누구나 블록 검증자로 활동할 수 있습니다.
