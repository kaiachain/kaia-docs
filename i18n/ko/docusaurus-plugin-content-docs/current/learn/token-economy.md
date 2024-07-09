# 토큰 이코노미

## 개요 <a id="overview"></a>

카이아의 토큰 이코노미는 생태계, 성장 이니셔티브, 전략적 투자를 강화하기 위한 지속 가능한 자금 구조를 만들기 위해 설계되었습니다. 많은 퍼블릭 블록체인 프로젝트는 노드 운영자(채굴자 또는 블록 생성자)에게만 인센티브를 제공하는 화폐 시스템을 가지고 있으며, 네트워크 유지보수라는 기술적 측면에만 초점을 맞추고 있습니다. 그러나 이러한 설계는 네트워크 토큰 이코노미의 성장에 기여하거나 장기적인 성장 전망에 투자하는 다른 유형의 참여자들에게 인센티브를 제공하는 것의 중요성을 놓치고 있습니다. 이와는 대조적으로 카이아의 토큰 이코노미는 보다 다양한 형태의 참여자들이 기여한 것에 대해 보상하도록 설계되었으며, 블록체인 노드를 유지하는 것 외에도 미래 성장 이니셔티브와 전략적 투자 프로젝트에 필요한 지속적인 자원을 조달할 수 있는 자금 조달 구조가 내장되어 있습니다.

## 펀딩 구조 <a id="funding-structure"></a>

카이아의 자금 구조는 카이아 네트워크의 블록 생성과 함께 지속적으로 운영됩니다. 새로운 블록이 생성될 때마다 새로 발행된 KAIA와 해당 블록에서 사용된 트랜잭션 수수료의 합계(통칭하여 "블록 보상"이라 함)가 합산되어 미리 정해진 비율에 따라 다음 세 개의 대상 계좌에 분배됩니다:

- Validators and Community: 50%
  - Block proposer rewards: 20% of the 50% (10% of total)
  - Staking rewards: 80% of the 50% (40% of total)
- Kaia Ecosystem Fund (KEF): 25%
- Kaia Infrastructure Fund (KIF): 25%

새로운 블록이 생성될 때마다 6.4 KAIA가 발행됩니다. This implies that approximately 200 million KAIA will be minted annually, which is equivalent to 5.2% annual inflation against the total KAIA tokens in the market (the annual inflation rate is subject to change through the Kaia Governance Process). Transaction fee is charged and metered according to the pre-determined fee tables. For detailed information about the transaction fees, please refer to [Transaction Fees](transaction-fees/transaction-fees.md).

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

## Kaia Ecosystem Fund <a id="kaia-ecosystem-fund"></a>

The Kaia Ecosystem Fund (KEF) was established to support Kaia's mission of enabling greater transparency and verifiability. It is funded by 25% of the total KAIA issued when creating a block.

The Kaia Ecosystem Fund will be used to fund activities that improve the Kaia ecosystem, such as:

1. **Service Contribution Reward (SCR)**: The KEF will provide rewards to service developers or users operating on the integrated ecosystem, as compensation for directly or indirectly contributing to the enhancement of the ecosystem's value.
2. **Building our Developer Community**: The KEF will support various initiatives including hackathons, development education programs, collaborative research with academia, and collaboration with various DAOs to foster and grow the Kaia developer community.
3. **Fostering Ecosystem Services and Infrastructure**: The KEF will support essential ecosystem infrastructure, alongside the development of services with clear utility and provide marketing support.
4. **Kaia Eco Fund Indirect Investment**: The KEF will make indirect mid-to long-term investments by entrusting specialized crypto VCs. A portion of the profits generated upon subsequent investment recovery will be either burned or returned to the Kaia ecosystem.
5. **Governance Committee Budget**: This budget is allocated for the operation of committees in specific sectors such as Gaming, DeFi, and Community. These committees aim to grow the Kaia Blockchain ecosystem in their respective sectors.
6. **Other ecosystem and community-building activities**

The administration of the Kaia Ecosystem Fund follows a process in which the Governance Council (GC) reviews and approves the use of funds in public forums on [Kaia Square](https://square.klaytn.foundation/Home). The Foundation will submit a quarterly budget proposal for each category to the GC for approval. 승인된 예산 범위 내에서 구체적인 사용처에 대한 검토와 GC의 재승인이 이루어집니다. All execution details are transparently disclosed.

New proposals for the use of KEF can be made via the GC, requiring individual approval. Plans are in place to develop a structure allowing more ecosystem participants to efficiently propose and participate in KEF use. For categories requiring specialized and rapid decision-making, separate governance committees may operate.

## Kaia Infrastructure Fund <a id="kaia-infrastructure-fund"></a>

Kaia Infrastructure Fund (KIF) is an operational fund that will focus on these main categories:

1. **Mainnet and Essential Infrastructure R&D**: This includes advancing research on the latest technologies related to mainnet and infrastructure, foundation-led service development, and infrastructure establishment.
2. **Ecosystem Acceleration**: This includes token swap, financial support for small-scale Kaia Blockchain ecosystem partners, attracting new GC members, and providing market liquidity.
3. **Foundation Operations**: This includes operating expenses such as development, accounting, legal affairs, IT infrastructure operations, marketing, and labor costs, as well as financial management and fundraising costs.

KIF is funded by 25% of the total KAIA issued when creating a block. It is executed by the foundation through an internal control system after a prior announcement of the budget plan for each detailed category. All execution details are transparently disclosed.

The foundation directly establishes a budget plan and executes the funds for KIF. To ensure transparent execution, the foundation discloses the budget plans and execution details in advance and afterward.
