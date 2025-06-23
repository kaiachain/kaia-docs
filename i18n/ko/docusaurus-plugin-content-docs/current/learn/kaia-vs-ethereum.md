---
sidebar_label: 카이아 대 이더리움
---

# 카이아 대 이더리움: 빌더를 위한 비교

이 포괄적인 비교는 카이아 블록체인과 이더리움의 주요 차이점과 유사점을 보여줌으로써 개발자와 사용자에게 마이그레이션 요건과 기회를 이해하는 데 필요한 필수 정보를 제공합니다.

## 개요

| 이더리움                       | 카이아                                                                                                      |
| :------------------------- | :------------------------------------------------------------------------------------------------------- |
| 레이어 1, 대규모 에코시스템 및 커뮤니티 구축 | 클레이튼과 핀치아의 합병으로 형성된 EVM 호환 레이어 1. 아시아의 Web3 도입, 엔터프라이즈급 안정성, 고성능에 집중하세요. |

## 사용자 관점

| 기능                                    | 이더리움                                                                   | 카이아                                                                                                                                                                                                                         |
| :------------------------------------ | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **초당 트랜잭션 수(TPS)** | \~15~30 TPS(변동 가능) | 최대 4,000 TPS. 실시간 TPS는 이더리움보다 훨씬 높은 것으로 보고되었습니다.                                                                                                                                            |
| **차단 시간**                             | \~12초.                                | 1초의 블록 생성 시간.                                                                                                                                                                                               |
| **최종성**                               | \~13~15분(2회)       | 즉각적인 최종성([PBFT 기반 합의](https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-)).                                                                                    |
| **거래 수수료(가스)**     | 가변, EIP-1559 경매 모델                                                     | [EIP-1559 호환 동적 요금 모델](https://github.com/kaiachain/kips/blob/main/KIPs/kip-162.md)과 [요금 위임](https://docs.kaia.io/build/transactions/fee-delegation/)을 통해 애플리케이션이 사용자 요금을 지불할 수 있습니다.                       |
| **지갑 호환성**                            | 메타마스크, 레저, 트러스트 월렛 등                                                   | 이더리움 지갑과 호환됩니다(예: RPC 구성을 통한 메타마스크). Kaia 전용 지갑(예: [Kaia 지갑](https://docs.kaia.io/build/tools/wallets/kaia-wallet/)). |
| **토큰**                                | ETH                                                                    | [KAIA](https://docs.kaia.io/learn/token-economics/kaia-native-token/)                                                                                                                                                       |

## 개발자 관점

| 기능            | 이더리움                                                                                                                    | 카이아                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------ | :---------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **가상 머신**     | 이더리움 가상 머신(EVM)                                                                                      | EVM 호환([Kaia 가상 머신 \- KVM](https://docs.kaia.io/learn/smart-contracts/#kaia-virtual-machine-kvm-powering-smart-contracts-), EVM 기반) 및 최신 이더리움 옵코드를 지원하도록 지속적으로 업데이트되므로 솔리디티 컨트랙트는 수정 없이 실행됩니다.                                                                                                                                                                                                                    |
| **스마트 계약 언어** | 솔리디티, 바이퍼, 율 등                                                                                                          | 솔리디티, 바이퍼, 율, 허프.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **사전 컴파일**    | 표준 이더리움 프리컴파일                                                                                                           | 표준 EVM 옵코드 및 추가 [카이아 전용 사전 컴파일된 계약](https://docs.kaia.io/learn/smart-contracts/precompiled-contracts/)을 지원합니다.                                                                                                                                                                                                                                                                                                                        |
| **개발 도구**     | **스마트 컨트랙트 개발 도구:** 리믹스, 하드햇, 파운드리 등 **웹3 라이브러리:** Ethers, Web3js, Web3j, Web3py, Viem | **스마트 컨트랙트 개발 도구:** [이더리움 도구와 호환](https://docs.kaia.io/build/smart-contracts/ide-and-tools/) (리믹스, 하드햇, 파운드리 등) **웹3 라이브러리:** Ethers, Web3js, Web3j, Web3py, Viem과 호환됩니다. Kaia는 [자체 SDK 확장]을 제공합니다(https://docs.kaia.io/references/sdk/). |
| **거래 유형**     | 레거시, EIP-2930, EIP-1559, EIP-4844 등                                                                                     | 주요 [이더리움 트랜잭션 유형](https://docs.kaia.io/build/transactions/ethereum/)과 [수수료 위임](https://docs.kaia.io/build/transactions/fee-delegation/) 및 [부분 수수료 위임](https://docs.kaia.io/build/transactions/partial-fee-delegation/)과 같은 기본 트랜잭션 유형을 지원합니다.                                                                                                                                                                                         |
| **가스 메커니즘**   | EIP-1559(기본 수수료 \+ 우선 순위 수수료 경매)                                                                    | 토큰 기반 요금 결제를 위한 [가스 추상화](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)와 [EIP-1559 호환 동적 가스 요금 모델](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-)과 원활한 SDK 호환을 위한 [EIP-7623 호환 통화 데이터 가격](https://kips.kaia.io/KIPs/kip-223)을 제공합니다.                                                                                                                                                                      |
| **계정 모델**     | 외부 소유 계정(EOA), 계약                                                                                    | 표준 이더리움 계정과 [EIP-7702](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)를 지원하여 EOA가 스마트 컨트랙트 코드를 가질 수 있도록 합니다. 유연한 키 관리와 같은 기능을 갖춘 기본 [계정 추상화](https://docs.kaia.io/learn/accounts/#multiple-key-pairs-and-role-based-keys-)를 제공합니다.                                                                                                                                                                             |
| **RPC API**   | 표준 이더리움 JSON-RPC API(`eth_` 네임스페이스)                                                                  | [대부분 호환](https://docs.kaia.io/references/public-en/). 이더리움 호환성을 위해 `eth_` 네임스페이스를 제공합니다. 카이아 전용 기능을 위한 `kaia_` 네임스페이스.                                                                                                                                                                                                                                                                                |
| **웹소켓**       | 지원                                                                                                                      | [지원됨](https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints)                                                                                                                                                                                                                                                                                                                                                                   |
| **합의**        | 지분 증명(가스퍼: 캐스퍼-FFG \+ LMD-GHOST)                                                    | PBFT 변형인 이스탄불 BFT(IBFT)에 최적화된 버전입니다. 제안자 선택에 [검증 가능한 무작위 함수(VRF) 사용](https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-).                                                                                                                                                                                                                             |
| **노드 아키텍처**   | 실행 클라이언트, 컨센서스 클라이언트                                                                                                    | [다층](https://docs.kaia.io/learn/#network-architecture): 컨센서스 노드(CN) 및 프록시 노드(PN)가 있는 코어 셀(CC), 엔드포인트 노드(EN), 서비스 체인 노드.                                                                                                                                                                                                                   |
| **거버넌스**      | 주로 오프체인, 커뮤니티 중심입니다.                                                                                    | [온체인 거버넌스](https://docs.kaia.io/learn/governance/)에는 공신력 있는 기관으로 구성된 거버넌스 위원회(GC)가 참여합니다. 지분율에 비례하여 의결권이 부여됩니다.                                                                                                                                                                                                                                                                                    |

## 변하지 않는 것

- \*\*높은 EVM 호환성: 카이아의 강력한 EVM 호환성은 대부분의 이더리움 디앱, 도구(하드햇, 파운드리, 리믹스), 솔리디티 컨트랙트를 최소한의 변경으로 마이그레이션하거나 사용할 수 있다는 것을 의미합니다. 이것이 가장 큰 '동일성 유지' 측면입니다.
- **익숙한 개발 도구 및 언어:** 솔리디티는 여전히 주요 스마트 컨트랙트 언어입니다. Remix, 하드햇, 파운드리와 같은 이더리움 개발 도구는 대부분 사용할 수 있습니다.
- **표준 이더리움 지갑 호환성:** 메타마스크와 같은 표준 이더리움 지갑은 RPC URL과 체인아이디를 변경하여 사용할 수 있습니다.
- \*\*eth_`RPC 네임스페이스:** RPC API를 위한`eth_\` 네임스페이스는 일반적인 기능에 대해 이더리움과 유사한 상호작용을 허용하여 표준 작업을 위한 기존 이더리움 도구와의 호환성을 보장합니다.
- **표준 이더리움 주소 형식:** 카이아는 표준 이더리움 주소 형식(`0x` \+ 40개의 16진수 문자)을 사용합니다.

## 달라진 점

- **성능 및 비용:**
  - 이더리움의 초당 트랜잭션 수(TPS)가 15~30 TPS인 것에 비해 훨씬 높은 초당 트랜잭션 수(최대 4,000 TPS)를 기대할 수 있습니다.
  - 블록 시간이 1초로 훨씬 빨라졌습니다.
  - 카이아는 즉각적인 완결성을 제공하며, 이는 이더리움의 확률적 완결성과는 큰 차이가 있습니다.
  - 거래 수수료(가스)는 EIP-1559 호환 수수료 모델을 사용하여 저렴하고 안정적으로 설계되었습니다. 가스 가격은 '케이'로 표시됩니다.
- **RPC 및 SDK:**
  - eth_`네임스페이스는 지원되지만, 새로운 기능이나 카이아 전용 기능 및 트랜잭션 유형에는`kaia_\` 네임스페이스가 필요합니다.
  - 레거시 `klay_` 네임스페이스가 존재할 수 있으며 이는 `kaia_` 네임스페이스와 동일합니다.
  - Kaia는 인기 있는 Web3 라이브러리([Ethers-ext](https://docs.kaia.io/references/sdk/ethers-ext/getting-started/), [Web3js-ext](https://docs.kaia.io/references/sdk/web3js-ext/getting-started/), [Web3j-ext](https://docs.kaia.io/references/sdk/web3j-ext/getting-started/), [Web3py-ext](https://docs.kaia.io/references/sdk/web3py-ext/getting-started/), [Viem-ext](https://docs.kaia.io/references/sdk/viem-ext/getting-started/))를 위한 자체 SDK 확장 기능을 제공하여 이더리움에서 원활한 마이그레이션을 지원하는 동시에 Kaia의 향상된 기능 및 성능 혜택을 이용할 수 있도록 지원합니다.
- **기본 기능(표준 EVM 이상):**
  - **계정 추상화:** 카이아는 고급 계정 기능(예: 계정당 다중 키, 역할 기반 권한)을 갖추고 있어 이더리움의 EOA 모델보다 더 많은 유연성을 제공합니다.
  - **거래 유형:** 카이아는 이더리움의 거래 유형(예: 계정 업데이트, 수수료 위임)과 함께 고유한 거래 유형을 보유하게 됩니다. 이더리움 트랜잭션의 경우, 최상의 호환성을 위해 표준 `eth_` RPC를 사용하세요.
  - **수수료 위임:** 이 기능은 디앱이 사용자의 가스 요금을 대신 지불할 수 있도록 하여 UX를 크게 개선할 수 있습니다.
- **합의 및 거버넌스:**
  - 합의 메커니즘은 이더리움의 가스퍼와는 다른 이스탄불 BFT(IBFT)의 최적화된 버전으로, 더 빠른 블록 시간과 즉각적인 완결성으로 이어집니다.
  - 거버넌스는 이더리움의 보다 유동적인 오프체인 거버넌스와는 달리 온체인 거버넌스 카운슬(GC)을 포함합니다.
- **토큰:** 기본 토큰은 KAIA입니다. 토큰노믹스와 유틸리티는 카이아에만 적용됩니다.
- \*\*노드 아키텍처: 카이아는 이더리움의 통합 클라이언트 방식과는 달리 성능과 보안을 최적화하도록 설계된 [특수 노드 유형](https://docs.kaia.io/learn/#network-architecture)(합의를 위한 코어 셀, 공용 액세스를 위한 엔드포인트 노드)을 갖춘 **목적에 맞게 구축된 계층화된 아키텍처**를 사용합니다.
- **멤풀:** 트랜잭션 처리와 공개 멤풀 가시성은 이더리움과 같은 글로벌 공용 멤풀을 덜 강조하는 카이아의 특정 네트워크 아키텍처로 인해 다를 수 있습니다.
- **사전 컴파일된 컨트랙트:** 기본 EVM 사전 컴파일이 지원되지만, 카이아에는 카이아 전용 사전 컴파일된 컨트랙트가 추가로 제공될 수 있습니다.

## 빌더를 위한 다음 단계

1. **환경 구성하기**\
  기존 이더리움 도구가 카이아와 함께 작동하도록 구성합니다:

- [메인넷 RPC](https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints): https://public-en.node.kaia.io ([체인 ID](https://docs.kaia.io/nodes/service-chain/configure/configuration-files/#properties-): 8217\)
- 테스트넷: 테스트용 카이로스 테스트넷([수도꼭지](https://www.kaia.io/faucet)에서 무료 토큰 받기([무료 토큰 받기](https://docs.kaia.io/build/get-started/getting-kaia/)))
- 도구: 하드햇, 파운드리 및 메타마스크는 수정 없이 작동합니다.

2. **배포 및 테스트**\
  솔리디티 컨트랙트는 완전한 EVM 호환성으로 인해 변경 없이 배포됩니다. 카이로스 테스트넷에서 테스트하여 카이아의 동적 요금 모델에 따른 가스 사용 패턴을 확인합니다.

3. 카이아의 장점 활용하기\*\*\*\*

- 즉시 확정: 즉시 확정되는 1초 블록으로 확인 대기를 없앱니다.
- [가스 비용 절감](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-): 이더리움에서 너무 비싼 기능을 빌드하세요.
- [수수료 위임](https://docs.kaia.io/build/transactions/fee-delegation/): 디앱이 사용자 트랜잭션 수수료를 지불하여 UX를 개선할 수 있도록 합니다.
- [가스 추상화](https://github.com/kaiachain/kaia/releases/tag/v2.0.0): 사용자는 승인된 토큰으로 수수료를 지불할 수 있습니다(KAIA뿐만 아니라).

4. **적절한 API 및 SDK 사용**

- 이더리움 호환 연산을 위한 표준 `eth_` 네임스페이스
- 카이아 관련 기능 및 트랜잭션 유형에 액세스하기 위한 `kaia_` 네임스페이스
- ethers.js와 web3.js는 완벽하게 작동하지만, 기본 기능과 더 쉽게 통합하려면 [Kaia의 SDK](https://docs.kaia.io/references/sdk/)를 살펴보는 것도 좋습니다.

5. **정보 받기**

- 최신 정보는 [카이아 문서](https://docs.kaia.io/)에서 확인할 수 있습니다.
- 카이아 개발자 포럼](https://devforum.kaia.io/) 및 기타 커뮤니티 채널에서 다른 빌더 및 카이아 팀과 교류하며 지원과 업데이트를 받아보세요.