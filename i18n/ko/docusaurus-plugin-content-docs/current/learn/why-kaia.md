# 왜 카이아인가?

Kaia 블록체인은 다양한 규모의 프로젝트에 강력한 인프라를 제공하여 웹3.0 채택을 선도하는 아시아 최고의 블록체인이 되는 것을 목표로 합니다. 이 문서에서는 주요 디자인 원칙과 가치 지향점을 바탕으로 Kaia가 어떻게 다른지 설명합니다.

## 폭넓은 사용자층

1. **웹2.0 사용자 접근성**: 카이아는 카카오(한국 5천만 사용자), 라인(일본, 대만, 인도네시아, 태국 2억 사용자)과 협력하여 메신저 통합 지갑을 통해 기존 웹2.0 사용자들이 쉽게 접근할 수 있도록 합니다.

2. **Web3 User Accessibility**: Kaia offers more than 1.2 million active wallet addresses and interfaces connecting users to projects, facilitating quick attraction of Web3 users.

3. **커뮤니티 구축 지원**: Kaia 재단과의 공동 마케팅을 통해 사용자들이 모여 프로젝트를 구축할 수 있도록 지원하여 다양한 체인의 사용자들이 쉽게 접근할 수 있는 환경을 제공합니다.

## 풍부한 유동성 지원

1. **실물 자산(RWA) 연동**: Kaia 블록체인은 금, 선박, 부동산과 같은 다양한 실물 자산을 유치하고 있습니다. 향후 계획은 법정화폐 기반 스테이블코인 및 채권을 온체인화하여 개발자가 사용할 수 있는 자산의 범위를 확장하는 것입니다.

2. **대규모 생태계 펀드**: KAIA 토큰을 기반으로 하는 Kaia Ecosystem Fund는, 디파이, 게임파이 등 유동성이 필요한 다양한 분야를 지원합니다.

3. **체인 네이티브 수익률**: 내장된 MEV(최대 추출 가능한 가치) 추출을 통해 KAIA 스테이커는 자동으로 MEV 수익을 얻을 수 있으며, 체인 유동성을 높이고 토큰 소각 메커니즘을 제공합니다.

## 핵심 기술과 개발 편의성

1. **고성능**:
   - 메인체인은 즉각적인 트랜잭션 완결성과 1초의 블록 생성 시간으로 최소 4,000 TPS를 처리합니다.
   - 커스터마이징이 가능하고 배포가 쉬운 [서비스 체인](scaling-solutions.md#service-chain)을 <LinkWithTooltip tooltip="L2(레벨 2) 블록체인은 메인 블록체인이 <br /> 더 많은 트랜잭션을 더 효율적으로 처리하도록 돕는 <br /> 추가 계층 역할을 합니다.">L2</LinkWithTooltip> 솔루션으로 사용하여 확장성을 확보하였습니다.

2. **이더리움 호환성**:
   - 100% 호환성을 지원하므로 EVM 기반 dApp을 수정 없이 온보딩할 수 있습니다.
   - 개발 도구, EVM, API는 이더리움과 동일하므로 두 생태계의 원활한 통합과 상호 이익이 가능합니다. See [Solidity-Smart Contract Language](../build/smart-contracts/solidity-smart-contract-language.md), and [Migrating Ethereum App to Kaia](../build/tutorials/migrating-ethereum-app-to-kaia.mdx).

3. **편리한 계정 모델**: 계정에 다양한 키를 할당하여 보안을 강화하고 사용자 경험을 개선할 수 있습니다.

4. **퍼미션리스 탈중앙화 구조**: Kaia는 비허가형 검증인 구조로 네트워크 탈중앙화를 강화하고 있습니다.

## 저비용과 향상된 사용자 경험

1. **합리적인 거래 수수료**: 최종 사용자는 높은 거래 수수료에 대한 부담이 없습니다. 비용은 안정적이며 트랜잭션의 복잡도에 따라 정해집니다. [합리적인 스마트 컨트랙트 실행 비용](computation/kaia-smart-contract.md#affordable-smart-contract-execution-cost) 및 [트랜잭션 수수료](transaction-fees/transaction-fees.md)를 참조하세요.

2. **[수수료 위임](./transactions/transactions.md#fee-delegation)**: 애플리케이션에서 사용자의 거래 수수료를 부담할 수 있으므로 유연한 비즈니스 모델이 가능하고 사용자 유치 장벽을 낮출 수 있습니다.

## 오픈소스 인프라 및 생태계 지원

1. **기본 인프라**: SDK, 스마트 컨트랙트 라이브러리, 월렛, 체인 탐색기, 분산 스토리지 솔루션, Oracle 지원 및 브리지 등이 있습니다.

2. **보조 인프라**: 서비스 통합, 스테이블코인 통합, DAO, NFT 마켓플레이스, DEX, DeFi, 기존 금융 인터페이스 등 제품 및 서비스를 지원하기 위한 에코시스템입니다.

3. **생태계 펀드**: 새로 발행되는 토큰의 50%는 [Kaia Ecosystem Fund](token-economy.md#kaia-ecosystem-fund)와 [Kaia Infrastructure Fund](token-economy.md#kaia-infrastructure-fund)를 통해 생태계에 재투자됩니다.

## 커뮤니티 협업 및 거버넌스

1. **다양한 커뮤니티 활동**: Kaia는 게임 길드, 투자 DAO, 커뮤니티 DAO, 글로벌 제휴사와의 협업을 통해 생태계를 확장하고 있습니다.

2. **탈중앙화된 거버넌스**: Kaia 거버넌스 위원회(GC)에는 기존 기업, DAO, 빌더가 포함되어 있으며, 수백 명의 참여자로 구성된 독특한 거버넌스 구조로 구성되어 있습니다.

요약하자면, Kaia는 블록체인의 핵심 특성인 투명성, 보안, 탈중앙화를 유지하면서 이런 향상된 기능을 제공합니다. 프로토콜은 강력한 이해관계자들과 함께 안정적으로 유지되고 있으며, 빌더가 혁신적인 Web3 아이디어를 실현할 수 있는 이상적인 환경을 조성합니다.
