# 토큰 이코노미

## 개요 <a id="overview"></a>

카이아의 토큰 이코노미는 생태계, 성장 이니셔티브, 전략적 투자를 강화하기 위한 지속 가능한 자금 구조를 만들기 위해 설계되었습니다. 많은 퍼블릭 블록체인 프로젝트는 노드 운영자(채굴자 또는 블록 생성자)에게만 인센티브를 제공하는 화폐 시스템을 가지고 있으며, 네트워크 유지보수라는 기술적 측면에만 초점을 맞추고 있습니다. 그러나 이러한 설계는 네트워크 토큰 이코노미의 성장에 기여하거나 장기적인 성장 전망에 투자하는 다른 유형의 참여자들에게 인센티브를 제공하는 것의 중요성을 놓치고 있습니다. 이와는 대조적으로 카이아의 토큰 이코노미는 보다 다양한 형태의 참여자들이 기여한 것에 대해 보상하도록 설계되었으며, 블록체인 노드를 유지하는 것 외에도 미래 성장 이니셔티브와 전략적 투자 프로젝트에 필요한 지속적인 자원을 조달할 수 있는 자금 조달 구조가 내장되어 있습니다.

## 펀딩 구조 <a id="funding-structure"></a>

카이아의 자금 구조는 카이아 네트워크의 블록 생성과 함께 지속적으로 운영됩니다. 새로운 블록이 생성될 때마다 새로 발행된 KAIA와 해당 블록에서 사용된 트랜잭션 수수료의 합계(통칭하여 "블록 보상"이라 함)가 합산되어 미리 정해진 비율에 따라 다음 세 개의 대상 계좌에 분배됩니다:

- 카이아 거버넌스 카운슬(GC) 보상:
  - GC 블록 제안자 보상: 10%
  - GC 스테이킹 보상: 40%
- 카이아 커뮤니티 펀드 (KCF): 30%
- 카이아 재단 기금 (KFF): 20%

새로운 블록이 생성될 때마다 6.4 KAIA가 발행됩니다. 이는 연간 약 2억 KAIA가 발행된다는 것을 의미하며, 이는 제네시스에서 발행된 100억 KAIA 대비 연간 2%의 인플레이션에 해당합니다(연간 인플레이션율은 Kaia 거버넌스 프로세스를 통해 변경될 수 있습니다). Transaction fee is charged and metered according to the pre-determined fee tables. For detailed information about the transaction fees, please refer to [Transaction Fees](transaction-fees/transaction-fees.md).

## 카이아 거버넌스 카운슬 보상 <a id="klaytn-governance-council-reward"></a>

카이아 거버넌스 카운슬은 코어 셀 운영자 (CCO)들의 집합체입니다. 카운슬 멤버는 코어 셀 (CC)을 유지 관리할 책임이 있으며, 따라서 카운슬은 카이아 생태계에서 기본 인프라 제공을 책임지는 필수적인 기구입니다. 카운슬 멤버가 되려면 카이아 거버넌스 프로세스에 따라 자격 심사를 거쳐야 하며, 최소 5백만 KAIA를 스테이킹해야 합니다. 카이아 거버넌스 카운슬 보상은 카운슬 멤버들이 카이아 생태계의 안정적인 기반을 지속적으로 제공할 수 있도록 인센티브를 제공하는 구조입니다.

### 카이아 거버넌스 카운슬 보상 메커니즘 <a id="klaytn-governance-council-reward-mechanism"></a>

For each block in the Kaia blockchain, a Committee is formed by randomly selecting members from the Kaia Governance Council (GC). This Committee consists of a single member who is assigned the role of Proposer, while the remaining Committee members take on the role of Validators. Once a block is successfully created and appended to the Kaia blockchain, the block reward is distributed among the Council members and various funds according to the previously mentioned ratios.

All Council members have an equal probability of being selected as the Proposer for a given block, and the block proposer reward is distributed evenly among them. However, the GC staking reward is allocated proportionally based on the amount of KAIA staked by each member, minus the minimum requirement of 5 million KAIA. This means that Council members who stake a larger amount of KAIA beyond the minimum threshold will receive a greater share of the staking reward compared to those who stake less. As a result, Council members are incentivized to stake more KAIA to maximize their potential rewards from the GC staking award portion of the block reward distribution.

최소 5백만 KAIA 스테이킹 요건을 충족하는 한, Kaia 거버넌스 카운슬 멤버는 자신의 KAIA를 자유롭게 스테이킹하거나 스테이킹을 해제할 수 있습니다. 스테이킹 정보는 86,400 블록마다 업데이트되며, 새로 스테이킹된 KAIA는 스테이킹이 완료된 시점으로부터 두 번의 업데이트 주기 후에 정보가 적용됩니다. 악의적인 회원의 즉각적인 탈퇴를 방지하기 위해 스테이킹된 KAIA를 철회하려면 1주일의 지연 시간이 필요합니다.

### 잘못된 행동을 한 카운슬 멤버에 대한 페널티 <a id="penalty-for-misbehaving-council-members"></a>

카운슬 멤버는 아래에 정의된 잘못된 행동을 할 경우 페널티를 받을 수 있습니다. 향후 카이아 거버넌스 프로세스를 통해 더 많은 페널티 규정이 수립되고 개선될 수 있습니다.

Safety Failure 야기:

- 제안자로 선정된 카운슬 멤버는 동일한 높이의 블록을 두 개 이상 생성할 수 없습니다.
- 제안자로 선정된 카운슬 멤버는 특정 거래를 의도적으로 생략할 수 없습니다.

Liveness Failure 야기:

- 제안자로 선정된 카운슬 멤버는 유효한 블록을 생성해야 합니다.
- 검증자로 선정된 카운슬 멤버는 제안자가 제안한 블록의 유효성을 검사해야 합니다.

## 카이아 커뮤니티 펀드 <a id="klaytn-community-fund"></a>

카이아 커뮤니티 기금(KCF)은 더 높은 투명성과 검증 가능성을 실현하고자 하는 카이아의 미션을 지원하기 위해 설립되었습니다. 기존 카이아 성장 기금(KGF)과 카이아 개선 준비금(KIR)이 합쳐져 새로운 카이아 커뮤니티 기금(KCF)이 되었다는 점을 기억해두시기 바랍니다.

카이아 커뮤니티 펀드는 다음과 같이 카이아 생태계를 개선하는 활동에 자금을 지원하는 데 사용됩니다:

1. **기여 증명(Proof of Contribution)에 대한 보상**: 이미 개발된 서비스 중 카이아 생태계에 기여도가 높은 프로젝트에 대해 가스비 지원 등 후속 지원을 제공합니다.
2. **개발자 커뮤니티 구축**: 재단은 카이아 개발자 커뮤니티를 육성하고 성장시키기 위해 해커톤, 개발 교육 프로그램, 업계와의 공동 연구, 다양한 DAO와의 협업 등 다양한 이니셔티브를 지원할 예정입니다.
3. **생태계 서비스 및 인프라 육성**: KCF는 명확한 효용성을 가진 서비스 개발과 마케팅 지원과 함께 필수적인 생태계 인프라를 지원할 것입니다.
4. **카이아 에코 펀드 간접 투자**: KCF는 크립토 전문 VC에 위탁하여 중장기 간접 투자를 진행하며, 추후 투자금 회수 시 발생하는 수익의 대부분을 카이아 생태계에 환원할 예정입니다.

카이아 커뮤니티 기금의 운영은 GC가 [카이아 스퀘어](https://square.klaytn.foundation/Home)의 공개 포럼에서 기금 사용을 검토하고 승인하는 절차를 따릅니다. 재단은 각 카테고리에 대한 예산 제안서를 GC에 제출하여 승인을 받습니다. 승인된 예산 범위 내에서 구체적인 사용처에 대한 검토와 GC의 재승인이 이루어집니다. 한편, KCF는 현재 [파일럿 프로그램](https://klaytn.foundation/kcf-grant-pilot/)으로 운영되고 있으며, 관심 있는 분들은 [카이아 거버넌스 포럼](https://govforum.klaytn.foundation/t/operational-procedures-of-the-kcf-grant-program-pilot/288)에서 프로그램에 대한 자세한 내용을 확인할 수 있습니다.

## 카이아 재단 펀드 <a id="klaytn-foundation-fund"></a>

카이아 재단 기금(KFF)은 이 두 가지 카테고리에 집중할 운영 기금입니다:

1. **생태계 지원**: 여기에는 소정의 재정 지원, 신규 GC 멤버 확보, 유동성 공급, 재단 주도의 서비스 개발/펀딩 등이 포함됩니다.
2. **재단 운영**: 개발, 회계, 인프라 운영, 마케팅, 인건비 등의 운영 비용과 재무 관리 및 투자유치 비용이 포함됩니다.

KFF는 KCF와 마찬가지로 온체인 투표를 통해 GC의 승인을 받은 후 자율적이고 투명하게 집행될 예정입니다.

자세한 내용은 이 [기사](https://medium.com/klaytn/klaytn-tokenomics-optimization-governance-proposal-securing-a-sustainable-verifiable-token-1efd2a49b04e)를 참조하세요.
