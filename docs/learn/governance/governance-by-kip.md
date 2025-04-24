# Core Governance Changes by KIPs

 Kaia has undergone several hard forks to improve its governance system. These changes reflect the evolving needs of the network and its stakeholders.

## KIP-163: CnStakingV3 With Public Delegation <a id="KIP-163"></a>
**Date: 2024-04-30**

KIP-163 introduces a new CnStakingV3 that supports public delegation, allowing general users to delegate and re-delegate their KAIA tokens more easily. The staking information interval is also changed from 86,400 blocks to 1 block to enhance efficiency and accuracy in validator set and reward distribution.
The motivation behind this update is to address the limitations of CnStakingV2, where only a few validators offered public delegation services, limiting users' options. By enabling public delegation natively in CnStakingV3, users can delegate their KAIA to any validator offering this service, thus broadening the delegation options and improving network participation.
CnStakingV3 will be compatible with existing core contracts like AddressBook and StakingTracker. Public delegation will be facilitated through a new contract named PublicDelegation, based on an interest-bearing token model (ERC-4626), where users receive non-transferable shares representing their assets. This approach aims to make the delegation process more transparent and accessible for all users.
Additionally, from the FORK_BLOCK onwards, staking information for block N will be derived from block N-1, ensuring more timely and accurate updates in the staking process. This change is designed to support the dynamic nature of staking and delegation in the Kaia network, making it more robust and user-friendly

## KIP-160: An Update On Treasury Fund Rebalancing <a id="KIP-160"></a>
**Date: 2024-04-22**

KIP-160 proposes enhancements to the Treasury Fund Rebalancing mechanism, addressing the limitations of KIP-103. The primary motivation is to allow both increases and decreases in fund balances and make the rebalance block number editable. This update involves generalizing the rebalancing process, enabling both the burning and minting of funds, and ensuring the rebalance block number can be aligned with changes in the blockchain's hard fork schedule. Find the rebalance detail in the [contracts addresses](../../references/contract-addresses.md) page.

## KIP-149: Unified Deployment and Management of System Contracts <a id="KIP-149"></a>
**Date: 2023-09-20**

KIP-149 introduces a standardized method for deploying and managing system contracts on the Kaia blockchain. System contracts directly impact or are read by the Kaia core protocol. This proposal includes a centralized Registry Contract to manage these contracts efficiently. Currently, the deployment methods for system contracts lack standardization, leading to inefficiencies. KIP-149 addresses this by introducing key features such as:
- Registry Contract: Manages all system contracts, ensuring centralized tracking and governance control through a governance contract.
- Proxy Pattern: Utilizes the UUPS proxy pattern to separate data storage from logic, allowing updates without affecting stored data and ensuring upgradability.
System Contract Lifecycle: Defines stages (Registered, Active, Deprecated) for managing contracts efficiently.
- Governance and Upgrades: Establishes a community-driven proposal and voting process for new contracts or upgrades, ensuring decentralized control and smooth implementation.
KIP-149 aims to enhance Kaia’s governance and operational efficiency by providing a secure, scalable approach to managing system contracts, facilitating smoother upgrades, and promoting decentralized control.


## KIP-103: Treasury Fund Rebalancing <a id="KIP-103"></a>
**Date: 2023-04-06**

KIP-103 was introduced with the v1.10.2 release. It introduces a Treasury Fund Rebalancing mechanism which is the proposal for the implementation of KGP-6.

The KGP-6 proposal aims to establish a sustainable and verifiable KAIA token economy. It was approved by the Governance Council, with 26 out of 31 members voting in favor. The proposal includes contributions from various organizations such as 1inch, Swapscanner, Ground X, and others. The goal is to create a more robust and transparent ecosystem for the KAIA token. Find the rebalance detail in the [contracts addresses](../../references/contract-addresses) page.

## KIP-82: KIP-82: A new GC reward structure due to abolition of the Gini coefficient <a id="KIP-82"></a>
**Date: 2022-09-21**

KIP-82, introduced with v1.10.0 and activated at the Kore hardfork, addresses the limitations of Kaia’s previous reward system by removing the Gini coefficient used in block proposer selection and rewards. This change supports the expanding Governance Council, which now includes DAOs alongside traditional enterprises, necessitating a more balanced and inclusive reward system.
Key changes include a new reward distribution structure, where 20% of GC rewards go to block proposers and 80% to stakers. This ensures fair compensation for both groups, enhancing network stability and participation. Voting power and rewards are now directly tied to the amount of KAIA tokens staked, encouraging broader network participation and reducing reliance on a few high-stake nodes. Block proposers are selected based on equal opportunity, independent of staking amounts, democratizing the process and enhancing decentralization.
To compensate for the opportunity cost of staking, inflationary rewards have been introduced, allowing public users to participate in the staking program managed by the GC and earn rewards, thus promoting network growth and stability.
A new governance parameter (reward.kip82ratio) sets the initial reward distribution ratio at 20/80 between proposer and staking rewards, which can be adjusted through governance processes.
KIP-82 represents a significant step towards a more equitable and stable governance system in Kaia, ensuring fair compensation for network contributions and fostering a more decentralized and resilient network.


## KIP-81: Implementing the on-chain governance voting method <a id="KIP-81"></a>
**Date: 2022-09-19**

KIP-81 was introduced with v1.10.0 and activated at the Kore hardfork. It introduced a stake-based voting mechanism through its governance portal. This approach shifts from the current system, where each Governance Council (GC) member casts one vote, to a model where voting power is determined by the amount of staked KAIA, with a cap to prevent any single entity from gaining excessive influence.
A GC member will receive one vote per a certain amount of staked KAIA (initially set at 5 million KAIA), with a cap of one less than the total number of GC members. For instance, if there are 35 GC members, the maximum voting power is 34 votes, preventing monopolies.
With this system, governance topics are discussed in the Governance Forum and voted on through Klaytn Square, ensuring responsibility and transparency in decision-making.
This change aims to make the voting process more transparent and reflect the interests of those most invested in Kaia. By linking voting power to the staking amount, the system incentivizes greater participation and alignment of interests, ensuring that those who contribute more to the ecosystem have a proportionate influence on its decisions.


This governance structure ensures a fair and balanced decision-making process, aligning voting power with contributions to the ecosystem while preventing any single entity from having undue influence.
