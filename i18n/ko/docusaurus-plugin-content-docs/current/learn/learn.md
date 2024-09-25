# Kaia 개요

Kaia는 엔터프라이즈급 안정성과 성능 수준을 충족하도록 설계된 고도로 최적화된 BFT 기반 퍼블릭 블록체인입니다. 이 개요에서는 Kaia의 아키텍처, 기능 및 에코시스템에 대해 자세히 설명합니다.

## 주요 설계 목표

Kaia 블록체인은 다음을 목표로 설계되었습니다.

- 트랜잭션의 즉각적 완결성 구현.
- 실사용이 가능한 빠른 트랜잭션 처리 속도 제공.
- 블록체인 애플리케이션 실행 비용 절감.
- 최종 사용자도 사용할 수 있는 낮은 진입 장벽.
- 다양한 산업 분야에서 손쉬운 기술 도입 지원.

## 핵심 사양

Kaia 블록체인의 주요 기능과 성능입니다.

- 1초의 블록 생성 및 확인 시간.
- 초당 4,000건의 트랜잭션 처리 능력.
- 이더리움의 1/10 정도에 불과한 낮은 가스 가격.
- EVM(이더리움 가상 머신) 호환 및 Solidity 컨트랙트 실행 지원.
- 전 세계 유명 기업들로 이루어진 <LinkWithTooltip to="../misc/glossary#kaia-governance-council-kgc" tooltip="A consortium governing Kaia blockchain development and operations.">Kaia 거버넌스 카운슬</LinkWithTooltip> 운영.

## 네트워크 아키텍처

Kaia 네트워크는 세 개의 논리적 하위 네트워크로 구성되어 있습니다.

![Kaia 생태계와 논리적 하위 네트워크 (CCN, ENN, SCN)](/img/learn/klaytn_network_overview.png)

1. **코어 셀 네트워크(CCN)**: 트랜잭션 검증, 실행, 블록 생성을 담당하는 [코어 셀(CC)](../nodes/core-cell)로 구성됩니다.

2. **엔드포인트 노드 네트워크(ENN)**: 서비스 체인의 RPC API 요청을 처리하고 데이터를 처리하는 [엔드포인트 노드(EN)](../nodes/endpoint-node)로 구성됩니다.

3. **[서비스 체인](../nodes/service-chain) 네트워크(SCN)**: dApp이 독립적으로 운영하는 보조 블록체인으로, EN을 통해 메인 체인에 연결됩니다.

### 노드 유형

![Kaia 메인체인 물리 토폴로지 및 계층화된 구조(CNN, PNN, ENN)](/img/learn/klaytn_network_node.png)

1. **코어 셀(CC)**: 하나의 컨센서스 노드(CN)와 두 개의 프록시 노드(PN)로 구성됩니다.
   - **컨센서스 노드(CN)**: 블록 생성에 참여합니다.
   - **프록시 노드(PN)**: 네트워크 인터페이스를 제공하고, 트랜잭션 요청을 전송하며, 블록을 전파합니다.

2. **Endpoint Node (EN)**: Serves as network endpoints, handling API requests and data processing.

3. **Bootnode**: Special nodes operated by Kaia to help new nodes join the network.

## Consensus Algorithm

Kaia uses an optimized version of Istanbul BFT, implementing Practical Byzantine Fault Tolerance (PBFT) with blockchain-specific modifications. The consensus process involves:

1. Election of a committee (<LinkWithTooltip to="../misc/glossary#proposer" tooltip="A randomly chosen consensus node for block creation.">proposer</LinkWithTooltip> and <LinkWithTooltip to="../misc/glossary#validator" tooltip="A node verifying data, ensuring efficient block processing.">validator</LinkWithTooltip>) using Verifiable Random Function (VRF).
2. Block generation by the elected proposer.
3. Block verification and signing by the committee.

This [consensus mechanism](consensus-mechanism.md) enables Kaia to achieve high performance, processing 4,000 transactions per second with instant transaction finality.

## Block Generation and Propagation

- Blocks are generated in rounds, targeting a 1-second interval.
- Proposer and committee selection is random but deterministic.
- Blocks require signatures from more than two-thirds of committee members.
- Separate propagation channels for blocks and transactions (multichannel approach) manage network congestion.

## Kaia Virtual Machine (KVM)

The Kaia Virtual Machine (KVM) provides a robust environment for smart contract execution:

- Based on the Ethereum Virtual Machine (EVM).
- Supports all EVM opcodes and additional Kaia-specific precompiled contracts.
- Compatible with Solidity and Ethereum development tools (e.g. Remix, Hardhat, Foundry).
- Allows developers to port Ethereum smart contracts to Kaia with minimal modifications.

## Security Measures

Kaia implements several security measures:

- VRF for random selection of block proposers, adding unpredictability to the process.
- Separation of validator keys and reward keys to protect validators from potential key theft.
- Transparent block verification process, with all committee members verifying signatures on proposed blocks.

## Interoperability

Kaia is designed for seamless interaction with other blockchain networks:

- EVM-compatible, allowing easy deployment of Ethereum smart contracts.
- Designed to interoperate with other EVM-SDK based chains.
- Supports cross-platform transactions and smart contract execution.

## Token Economy

Kaia's native token, [KAIA](kaia-native-token.md), plays a central role in the blockchain's economy:

- KAIA tokens are issued automatically with each new block.
- Initial annual inflation rate: 5.2%.
- Block rewards are distributed as follows:
  - CCO and Community: 50% (20% Block Creator rewards, 80% Staking rewards)
  - KEF (Kaia Ecosystem Fund): 25%
  - KIF (Kaia Infrastructure Fund): 25%

This distribution model incentivizes network participation while supporting the growth and development of the Kaia ecosystem.

## Governance

Kaia implements an on-chain governance system designed to be fair and inclusive:

- Voting rights are proportional to the amount of KAIA tokens staked.
- A cap on voting rights prevents suppression of minority opinions.
- Delegation of voting power is allowed.
- All governance proposals are recorded on-chain, ensuring transparency.

## Auditability and Transparency

Kaia prioritizes transparency and auditability:

- All transactions provide an immutable and verifiable history of state changes.
- Two primary tools for blockchain exploration:
  - [Kaiascope](https://kaiascope.com/): A comprehensive blockchain explorer.
  - [Kaiascan](http://kaiascan.io/): A user-friendly interface for quick blockchain data lookups.
- The "Square" voting platform discloses all expenses and quarterly known transactions.

## Network Monitoring

To ensure optimal performance and reliability, Kaia implements:

- A multi-channel approach to manage network congestion.
- Dedicated network monitoring for all validators.
