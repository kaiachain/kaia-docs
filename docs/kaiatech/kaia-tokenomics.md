# Kaia Blockchain Tokenomics v1.2

## Token Economy

### Introduction

Public blockchain platforms are maintained through a token model, which greatly influences the growth direction of the platform. Since blockchains generally do not have a central governing body, it is crucial to motivate the individuals who maintain and develop the blockchain to ensure its continued existence. However, it is unrealistic to expect participants to engage in blockchain security solely for altruistic motivations without seeking any financial gain. Therefore, an incentive system is necessary to motivate blockchain ecosystem participants to maintain and develop the network.

In blockchains, governance structures drive change. Blockchain platforms must change to keep pace with external developments as available technologies continue to expand and market needs change. Unlike general products developed and maintained by a single company or a central governing body, a public blockchain is not suitable for a single entity to make and implement unilateral decisions. For example, even if the main developers decide on a software update, the miners may not apply it. Therefore, a governance process is needed to collect the opinions of all participants in the ecosystem and make decisions based on the collected opinions in order for the blockchain network to implement timely changes. A stable governance structure must exist for the blockchain to adjust appropriately in response to external changes.

This chapter explains the token model and governance system of Kaia[^1] Blockchain. Kaia Blockchain aims to help builders quickly implement, scale, and achieve successful results based on its large user base, vast on-chain assets, and technology. This document will go over the design principles used to create the current features of Kaia Blockchain and how these features may change. The information provided in this document will be verified through relevant data, and part of this content may be subject to change after sufficient verification and review.

### Design Principles

Designing the token economy and governance structure of a blockchain platform is complex. First, token economy and governance structures are tested under controlled conditions that do not fully reflect reality. Therefore, it cannot be prepared for all variables. It is also worth noting that the blockchain industry is still in its infancy stage and we have yet to see a successful system that operates over the long term. Kaia Blockchain considered these environmental factors and defined internal principles that are not influenced by external influences rather than maintaining a single specific model. The detailed token economy and governance structure may flexibly evolve in line with the market conditions and regulations. However, the design principles will remain unchanged as a core value shared by all ecosystem participants.

The core design principles of the token design of Kaia Blockchain are:

- **Rewarding Ecosystem Contributors:** For a blockchain platform to be sustainable and provide great value to users, simply maintaining the network is not enough; the growth of the platform ecosystem is also very important. Therefore, Kaia Blockchain will identify the entities contributing to this growth and provide rewards and support commensurate with the contribution of each participant. This will result in not only contributors to block creation and verification but also service providers who have contributed to the growth of the platform ecosystem receiving reasonable compensation in proportion to their contribution, acting as an attractive incentive for potential external contributors.

- **Elastic Token Economy:** The token economy has numerous active participants with different interests and is greatly affected by various internal and external changes. Therefore, the token economy will be flexible to external variables based on consistent core principles rather than maintaining a single model. Based on these core principles, the token economy of Kaia Blockchain can respond quickly and flexibly to external changes. At the same time, it can support the ecosystem participants to operate stably and align the direction to promote overall growth.

- **Sustainable Growth:** Blockchain platforms must maintain continuous growth. In other words, it must retain the existing and new participants within the ecosystem based on a reasonable incentive model and a system that can flexibly respond to the needs and impacts of rapidly changing markets within and outside the ecosystem. In return, Kaia Blockchain will be able to achieve balanced and stable growth based solely on the contributions of ecosystem participants without any artificial value expansion.

- **Simplicity:** Kaia Blockchain will be explainable simply and clearly. This will allow for quick optimizations and fixes in the future. Its simplicity will allow everyone involved to easily understand the functionality.

- **Experiment and Optimize with Data:** How high should inflation be? What types of rewards should be given for what actions? These questions are difficult to answer without testing and verification. Kaia Blockchain will transparently analyze data obtained and managed on the blockchain, optimize the platform by testing various hypotheses, and transparently share the results through technical reports.

[^1]: Kaia is a temporary name for the integrated blockchain project of Klaytn and Finschia, and may be changed in the future.

### Kaia Blockchain Tokenomics

#### KAIA

KAIA is the platform-native cryptocurrency of the Kaia Blockchain, used to enhance the security of the Kaia Blockchain through staking or to pay transaction fees. Transaction fees are incurred when deploying or executing smart contracts, or when transferring tokens.

KAIA is an essential element and fuel for operating the Kaia Blockchain platform. The users’ KAIA is paid to the validators to execute tasks requested by clients of the platform. In other words, KAIA is an incentive that will ensure developers write high-quality application codes (wasteful codes cost more) and the network remains healthy (validators are compensated for the contributed resources).

#### Kaia Blockchain’s Incentive Mechanism

The incentive mechanism of Kaia Blockchain seeks to achieve the following goals:

- Ability to maintain sufficient economic security and network over the long term.

- Support for entities promoting economic activity

In general, incentives in public blockchains are used to maintain the network and ensure economic security. Maintaining a blockchain requires someone to continuously store block data and process new transactions. Due to this, blockchains such as Bitcoin or Ethereum provide block rewards to miners processing block creation. Incentives are also closely related to economic security. Simply put, economic security is proportional to the cost required to carry out an attack on a blockchain. This cost typically becomes higher as the potential profit of the block creator increases during the block creation process.

Incentives are necessary to ensure a high level of economic security and a well-maintained network. And for the system to operate stably, the value of cryptocurrency must be maintained or rise. If the value of cryptocurrency falls suddenly, the economic security and network stability may decline proportionally.

The stability or increase in value of KAIA largely depends on its utility. This utility comes from a large number of people using and burning KAIA, which occurs when high-quality service providers actively provide services on Kaia Blockchain.

#### Economically Sourced Incentives

Kaia Blockchain provides incentives through the issuance of new KAIA and transaction fees. Additionally, to maintain the value of KAIA as a means of economic support, sustainable methods for distributing and burning KAIA exist.

##### Minting

On the Kaia Blockchain mainnet, a certain amount of KAIA is issued whenever a new block is created. Each time a new block is created, a certain amount of KAIA will be newly issued, and the target initial annual inflation rate (amount of KAIA newly issued per year / total KAIA token in the market) of Kaia Blockchain will be set at 5.2%[^2]. The number of newly issued KAIA per block at this point is not permanently set; it can be changed through governance voting. By default, the inflation rate of KAIA reflects the economic growth rate of Kaia Blockchain. Although the goal is a lower value, the exact value will be determined through the governance. In the mid to long term, the inflation rate and new issuance quantity per block can be automatically calculated and applied based on the inflation algorithm inherent in the chain.

[^2]: Specific figures are subject to change upon further review and governance approval.

##### Transaction Fee

Kaia Blockchain has determined its transaction fee policy to maximize service orientation, user-centricity, and enterprise-friendliness while maintaining network stability. The transaction fee policy takes into account the following points pursued by Kaia Blockchain.

- Improved User Experience
  - We aim to minimize complicated or unnecessary procedures when users pay transaction fees. This will allow users not familiar with blockchain technology to easily use Kaia Blockchain. For example, tasks such as manually entering gas prices should be minimized. The volatility of the transaction fee should also be minimized so that users can use Kaia Blockchain comfortably.

- Improved Operational Processes for Service Providers
  - Service providers can pay for the transaction fees on behalf of users through the unique account model in Kaia Blockchain. Therefore, business convenience for dApp service providers is also a major consideration in fee policy.
  - The basic elements to reduce the burden on service providers are low transaction fees and low volatility fee policies. The low fee is to assist in the expansion of services using the fee delegation feature in the Kaia account model, while the low volatility is to help predict business costs due to the payment fee.
  
- Protection against Network Attacks
  - Blockchain data storage and computation incur costs. Without transaction fees, attackers may DDoS or spam attack the blockchain by sending meaningless transactions. To prevent meaningless transactions, a reasonable fee will be imposed on transactions.
  
Kaia Blockchain applies a dynamic gas fee model to the network to achieve the above goals. In the dynamic gas fee model of Kaia Blockchain, a low fee is applied in general cases where there are not many transactions on the network. However, in special situations such as a rapid increase in transactions on the network or a DDoS or spam attack, the gas fee increases. This results in a reduction of meaningless transactions. The dynamic gas fee model could change the gas fee per block unit dynamically depending on the transaction congestion within the network, but the range of change is predictable to some extent. Transactions entered into a block have transaction fees calculated with an identical block gas fee (baseFee), and only transactions with a gas fee greater than or equal to the block gas fee can be entered into the block. Block gas fees automatically increase or decrease depending on the gas usage of the previous block with the current maximum fluctuation set to 5%. A portion of the transaction fee used in each block is set to be automatically burned. Various parameters of the dynamic gas fee model can be changed via the governance function.

The transaction fees for Kaia Blockchain are currently determined by applying a dynamic gas fee model. However, a new gas fee model or transaction fee policy may be required according to the environmental changes. If necessary, changes to the gas fee model or transaction fee policy of Kaia Blockchain will be made through the governance process.

##### Block Reward Distribution

The block reward for each block is determined by the sum of the KAIA issued at the time of block creation and the transaction fee. This is distributed as follows. However, the specific ratio and category of the block reward distribution may be changed by governance.

- Validators and Community: 50%
  - Of the 50%, 20% is block proposer rewards
  - Of the 50%, 80% is staking rewards
- KEF (Kaia Ecosystem Fund): 25%
- KIF (Kaia Infrastructure Fund): 25%

##### Burning

The method for maintaining or enhancing the KAIA value is an essential element of any incentive structure based on KAIA. In Kaia Blockchain’s ecosystem growth stage, the additional issuance of the KAIA motivates the ecosystem members to participate. However, a method to control the circulation volume is necessary for it to operate as a long-term sustainable incentive. Kaia Blockchain 3-Layer Burn Model prevents excessive inflation. The 3-Layer Burn Model is an extensive concept that includes not only the inherent burning function of Kaia Blockchain but also the burning concept that can occur through relationships with ecosystem projects. This extensive burn model will effectively regulate circulation volume and provide stable value incentives to the network participants when the Kaia Blockchain ecosystem reaches maturity. The description of each Layer is as follows.

1. Transaction-Based Burning

This is the default burning method provided by Kaia Blockchain. Users generate transactions to use the blockchain and a portion of the transaction fee is automatically burned. Since transaction-based burning can be interpreted as reduced profits of the node operators, the burning extent is adjusted through agreement and consensus among key network participants through on-chain governance.

2. MEV(Maximal Extractable Value) Burning

A validator may receive additional profits (e.g. maximal extractable value) by taking advantage of the fact that they can determine the transaction order during the block proposal process. This structure can escalate into issues of censorship or unfairness. As a result, Kaia Blockchain seeks to share the authority of the validator among all users through the implementation of technologies such as on-chain auctions. Part of the profit generated in this process will be burned due to it being generated through a special structural qualification called a validator.

3. Business-Based Burning

Business-based burning is not an inherent function of Kaia Blockchain. Rather it is implemented through the ecosystem services and business relationships. Ecosystem services can receive support from protocols such as Kaia Ecosystem Fund to initially accelerate growth. Additionally, the value of KAIA or the activation of Kaia Blockchain affects the activation of services considering services utilize blockchain functions. Kaia Blockchain encourages the ecosystem services to install the concept of burning KAIA within the service to ensure that the service and blockchain maintain the value of KAIA under the same goal.

### Validator Incentives

Validators are operators in Kaia Blockchain who are responsible for block creation and verification based on the consensus algorithm. Validators are required to stake at least 5 million KAIA on the nodes they operate. In addition, validators participate in the on-chain vote of Kaia Blockchain and have the qualifications of GC (Governance Council), which makes key decisions in the ecosystem. In the future, the concepts of validator participating in block creation and GC participating in decision-making will be separated, so that anyone meeting certain conditions could participate in block creation and verification even if they are not a GC. Research and development of building this permissionless network is in progress.

Two types of incentives are provided to encourage validators to operate nodes: block proposer rewards and staking rewards.

- Block proposer rewards are for the act of participating in block creation and verification. At the time of block creation, an identical amount of KAIA will be distributed to all validators activated on the network. 10% (20% of the 50% Validator and Community Rewards) of the total annual inflation issued will be allocated as block proposer rewards. However, the size of the reward in a specific block may vary depending on the number of validators active at a specific time.

- Staking rewards are for staking KAIAs and contributing to the network stability and economic stability of Kaia Blockchain. The size of the reward is determined in proportion to the amount staked by a specific validator to the total amount of KAIA staked by all validators. However, the 5 million KAIA staked by each validator as an obligation is not reflected in determining the staking reward size. 40% of the total inflation will be allocated as staking rewards. The size of the rewards in a specific block may vary depending on the number of the total KAIA staked by the validators active at a specific time.

#### Kaia Blockchain Validator Reward Mechanism

Every block will have a committee made up of randomly selected validators. Each committee will have one member to act as a proposer, and all other committee members will act as verifiers. When a block is successfully created and added to Kaia Blockchain, the proposer of that block will be rewarded with 10% (20% of the 50% Validator and Community Rewards) of the total annual inflation issued and additional transaction fees. With regard to transaction fees, if the total amount of transaction fees incurred in one block is less than the block reward, the fees will be burned. If the transaction fee exceeds the block reward, half of the exceeded amount will be burned and the remaining half will be rewarded to the block proposer. Staking rewards equivalent to 40% (80% of the 50% Validator and Community Rewards) of the total annual inflation issued are shared among the validators in proportion to their staking amount. As long as the Kaia Blockchain validators meet the minimum 5 million KAIA staking requirement, they are free to stake or unstake their KAIA. Staking information changed within the staking update cycle will have a final update in the last block of each cycle. Another cycle is required for the updated information to be reflected in the block incentive. For example, staking information added at block 80,000 will be last updated at block 86,400 and reflected in incentives starting at block 172,800. A one-week delay is required to withdraw the staked KAIA to prevent any immediate withdrawals by malicious members.

### Kaia Blockchain Fund

#### Background

The financial resources of the Kaia Blockchain ecosystem are reorganized and operated into the Kaia Ecosystem Fund (KEF) and Kaia Infrastructure Fund (KIF). Both KEF and KIF will be used to establish stable integrated governance and an active ecosystem and will be transparently executed according to the agreed-upon ratio. The usage plan of the ecosystem resources will be shared with the community in advance. Especially for KEF, individual expenditures will be executed with GC approval. This will allow all ecosystem participants to be proactively aware of the impact of the ecosystem resource execution.

#### Kaia Ecosystem Fund

##### Definition

Kaia Ecosystem Fund (KEF) is a financial resource used to ensure the sustainability of Kaia Blockchain mainnet by strengthening the basic ecosystem infrastructure, supporting developers, and returning profits through indirect investments back to the ecosystem. For this purpose, 25% of the total KAIA issued when creating a block will be distributed to KEF. KEF can only execute funds for agreed purposes with prior approval from the governance with all execution details being transparently disclosed.

##### Usage

The uses of KEF are categorized as follows:

1. Service Contribution Reward (SCR): This reward is given to service developers or users operating on the integrated ecosystem, as compensation for directly or indirectly contributing to the enhancement of the ecosystem's value.

2. Developer Community Development: This includes support for various hackathons, operation of development education programs, collaborative research with academia, and collaborations with various DAOs.

3. Ecosystem Services and Infrastructure Development: This involves the development of services with clear utilities, support for marketing, and securing essential infrastructure for the ecosystem.

4. KEF Indirect Investment: This involves medium to long-term investments carried out indirectly through delegation to professional crypto Venture Capitals. A portion of the profits generated from the recovery of investment amounts is either burned or returned to the Kaia Blockchain ecosystem.

5. Governance Committee Budget: This budget is allocated for the operation of committees in specific sectors such as Gaming, DeFi, and Community. The committees aim to grow the Kaia Blockchain ecosystem in their respective sectors through expertise in investing, marketing, grants, and providing liquidity.

6. Other ecosystem and community-building activities

##### Execution Method

KEF operates under a system where the Governance Council (GC) reviews and approves the use of its funds. The budget executed through the foundation is managed through the following process:

1. Each quarter, necessary budgets by category of expenditure are reported to and approved by the GC.

2. Within the approved budget limits, specific expenditures are also approved individually by the GC.

3. Details of the expenditures are transparently disclosed after their use.

Even if not through the foundation, new proposals for the use of KEF can be made via the GC, and these specific proposals will also require individual approval by the GC. Plans are in place to develop and enhance a structure that allows more ecosystem participants to efficiently propose and participate in the use of KEF. Additionally, for some categories requiring more specialized and rapid decision-making, separate governance committees may operate.

#### Kaia Infrastructure Fund

##### Definition

Kaia Infrastructure Fund (KIF) is a financial resource used for purposes such as R&D, ecosystem acceleration, and foundation operation. For this purpose, 25% of the total KAIA issued when creating a block will be distributed to KIF.

KIF is executed by the foundation through an internal control system after a prior announcement of the budget plan for each detailed category with all execution details being transparently disclosed.

##### Usage

The uses of KIF are categorized as follows:

1. Mainnet and Essential Infrastructure R&D: Advance research on the latest technologies related to mainnet and infrastructure, foundation-led service development, infrastructure establishment, etc.

2. Ecosystem Acceleration: Token swap, financial support for small-scale Kaia Blockchain ecosystem partners, attraction of new GC, provision of market liquidity, etc.

3. Operation of Kaia Foundation: Operating costs (various service costs such as development, accounting, legal affairs, as well as IT infrastructure operation costs, marketing costs, labor costs, etc.), financial management, fundraising, etc.

##### Execution Method

The foundation directly establishes a budget plan and executes the funds accordingly for KIF. To ensure transparent execution, the foundation discloses the budget plans and execution details in advance and afterward.

1. Establishment of the budget and fund execution plan by the foundation

2. Disclosure of the budget plans by detailed category

3. Disclosure of the execution details after executing the funds through an internal control system by the foundation

### KAIA Issuance/Distribution Plan

As the Klaytn and Finschia ecosystems merge, KLAY and FNSA, which were the base coins of each ecosystem, will also be consolidated into KAIA. Consequently, the issuance and circulation plan for KAIA will inherit the plans from KLAY and FNSA. This section will examine the historical issuance and circulation data of KLAY and FNSA and, based on this, will outline the plan for the issuance and circulation of KAIA.

#### KLAY Issuance/Distribution Status

##### KLAY Issuance and Burning Volume

On June 24, 2019, a total of 10 billion KLAY were issued on the genesis block at the launch of the mainnet of the Klaytn Blockchain. After the launch of the mainnet, a 3% annual inflation rate was applied based on the genesis issuance volume, newly issuing 9.6 KLAY in each block starting from block 1. Based on the decision of [[KGP-3]](https://govforum.klaytn.foundation/t/kgp-3-reduction-of-klaytn-block-reward/117) in October 2022, 6.4 KLAY have been issued for each block starting from November 13, 2022 (#106444801). As for the KLAY burn volume, a portion of the genesis reserve was burned based on [[KGP-6]](https://govforum.klaytn.foundation/t/kgp-6-proposal-to-establish-a-sustainable-and-verifiable-klay-token-economy/157) of April 16, 2023, and a portion of circulating supply was burned based on the transaction fee burning and buyback burning. As a result, the estimated total supply is 5,971M KLAY at the time of integration, as of June 27, 2024.

##### KLAY Private Sale

KLAY did not conduct an ICO after issuance and only conducted private sales for institutional investors. The private sales were divided into ER (Early Round) and PR (Private Round) from 2018 to 2019. The quantity sold through the private sales was 1,624,251,988 KLAY. The funds were used as operating funds for the mainnet development and operation, and ecosystem expansion. Approximately 1.62 billion KLAY sold through private sales were all unlocked in March 2021 after a step-by-step vesting period, and are already included in the circulating supply.

##### KLAY Circulating Supply

The circulating supply of a cryptocurrency is the total currently tradable supply of the total issued volume of a specific existing cryptocurrency. In other words, it is the amount that is actually traded and distributed in the market. As of June 27, 2024, the expected integration date, the estimated total supply of Klaytn Blockchain will be 5,971M KLAY, excluding the not yet distributed Klaytn Community Fund (KCF)[^3] of 153M KLAY, Klaytn Foundation Fund (KFF)[^4] of 29M KLAY, and KLAY Value Creation Fund (KVCF)[^5] of 2,000M KLAY. These numbers are current estimates and may vary slightly due to block generation status, inflation, and governance proposal approvals. Considering that KVCF requires separate approval from the GC, the circulating supply increases when the execution of KCF or KFF is decided and executed. On the other hand, the circulating supply decreases when it is burned due to transaction fees or buybacks. Accordingly, as of June 27, 2024, the total issued supply is 5,971M KLAY while the circulating supply is 3,789M KLAY. There are no plans to use the KVCF until the time of the merger. The KLAY circulating supply will be inherited by the initial circulating supply of KAIA after the chain and token merger.

[^3]: A fund created to revitalize the Klaytn ecosystem and onboard developers, and expenditures are determined after governance approval.
[^4]: A fund created to operate the existing Klaytn Foundation, and expenditures are also determined after governance approval.
[^5]: A reserve created in preparation for the dramatic growth of the Klaytn blockchain.

### FNSA Issuance/Distribution Status

#### FNSA Issuance and Burning Volume

FNSA of Finschia has been automatically issued in each block at an inflation rate of 15% per year on the current total supply according to the Issuance mechanism of the protocol. Initial total supply was 6,734,458 FNSA. The FNSA issued is distributed to the Network Contribution Reward, Service Contribution Reward, and Reserve at a corresponding ratio of 5:3:2 according to the distribution mechanism. No volume of FNSA was burned. As of June 24 2024, the expected integration date, the estimated total number of FNSA issued through inflation is 7.967M FNSA.

##### FNSA Private Sale

FNSA did not conduct private sales.

##### FNSA Circulating Supply

The total supply and circulating supply of FNSA are equal. In other words, there is no separate uncirculated volume. Additionally, FNSA will set the inflation to 0% and stop new issuance after prior notice before the integration to ensure smooth integration with KLAY. As of June 24 2024, the expected integration date, the estimated total number of FNSA issued through inflation is 7.967M FNSA. The final confirmed total supply of FNSA will be included in the initial distribution of KAIA and inherited according to the agreed-upon exchange ratio.

#### KAIA Issuance/Distribution Plan

The KAIA token is created by combining the existing KLAY tokens and FNSA tokens at the time of integration. There may be slight changes in the circulating supply of KLAY and FNSA tokens before the integration through the inflation and burning of block rewards. The circulating supply of the existing KLAY and FNSA at the time of integration will be included in the KAIA circulating supply according to the corresponding exchange rate. Details will be guided through a separate post-announcement by the foundation. The exchange rate for each token to KAIA is as follows:

- KLAY: KAIA = 1:1

- FNSA: KAIA = 148.079656:1

The estimated circulating supply at the time of integration and KAIA circulating supply can be explained separately as follows:

##### Estimated Supply of KLAY and FNSA

- Estimated Circulating Supply[^6]
  - KLAY: 3,789M KLAY
  - FNSA: 7.967M FNSA
- Estimated Uncirculated Volume
  - Klaytn Value Creation Fund (KVCF): 2,000M KLAY
  - Klaytn Community Fund (KCF): 153M KLAY
  - Klaytn Foundation Fund (KFF): 29M KLAY

[^6]: The circulating supply of the Klaytn and Finschia chain may change due to block rewards, etc. until the chain merger.

##### Estimated KAIA Issuance Volume

- (+) Conversion of circulating supply (4,968M KAIA)
  - Converted KLAY circulating supply: 3,789M \* 1 = 3,789M KAIA
  - Converted FNSA circulating supply: 7.967M \* 148.079656 FNSA =
    1,179M KAIA

- (-) Conversion and burning of uncirculated volume
  - Conversion of estimated uncirculated volume: (Klaytn Value Creation
    Fund 2,000M KLAY + Klaytn Community Fund 153M KLAY + Klaytn
    Foundation Fund 29M KLAY) \* 1 = 2,182M KAIA
  - Burn 1,382M KAIA out of 2,182M KAIA, leaving 800M KAIA
- (+) Conversion[^7] of uncirculated volume remaining after
  burning into circulating supply (800M KAIA)
  - LINE NEXT Delegation: 330M KAIA
  - Kaia Ecosystem Fund: 270M KAIA
  - Kaia Infrastructure Fund: 200M KAIA

| **Category**             | **Amount**  |
|--------------------------|--------------|
| KLAY Circulating Supply  | 3,789M KAIA  |
| FNSA Circulating Supply  | 1,179M KAIA  |
| LINE NEXT Delegation     | 330M KAIA    |
| Kaia Ecosystem Fund      | 270M KAIA    |
| Kaia Infrastructure Fund | 200M KAIA    |
| Total Supply             | 5,768M KAIA  |

Since the entire uncirculated amount gets burned at the time of KAIA conversion, the total supply and the circulating supply match. The estimated circulating supply at this time of integration is about 5,768M KAIA.

However, the mentioned numbers are based on the issuance and circulating supply estimation as of May 14, 2024, GST, and the final figures may vary slightly due to block generation status, inflation, and governance proposal approvals of Klaytn and Finschia.

The circulating supply after the token merge may increase according to the measures mentioned in “3.5. Kaia Blockchain Fund” or decrease due to burning. However, as specified in the relevant section, any additional supply must be announced in advance or approved by governance.

[^7]: Future circulation will only change due to inflation and new burning models. Incorporation of the circulation amount of the fund does not necessarily mean liquidation, and it will be executed transparently only within the scope of governance approval.

#### Treasury Rebalance Plan

With the launch of the Kaia Blockchain, the new tokenomics mentioned in the Tokenomics section will be applied. This involves a massive scale of tokens, including the conversion of existing FNSA and KLAY circulations to KAIA, new fund allocations, and burned tokens. A treasury rebalance event will occur only once at the launch, which is a critical process that must be systematic, transparent, and auditable. To ensure this, all procedures will be meticulously recorded in smart contracts. Moreover, given the large volume of tokens involved, it is vital to apply various technologies to prevent errors (such as fat finger errors) and minimize security risks. The application of the new tokenomics is structured to proceed safely only after several conditions are met. Ultimately, the new tokenomic state is achieved through the consensus of validators, relying on the highest level of security available on the blockchain.

The overall process is as follows. A contract named TreasuryRebalance is deployed, followed by the uploading of a rebalance configuration into this contract. All stakeholders whose balance will be altered must approve of the configuration. Once all stakeholders have approved, block validators check the validity of the contract at the hardfork block at which the rebalance event takes place. Provided all conditions are met, block validators execute the rebalance event and reach a consensus. After the event was successful, an execution receipt which block providers output will be uploaded to the contract so that anyone can view the rebalance result.

TreasuryRebalance contract is implemented as a finite state machine and has the following states:

- Initialized: right after the deployment. In this state, a list of addresses whose balance will be zeroed, namely “Zeroed”, and addresses whose balance will be allocated, namely “Allocated”, can be registered.

- Registered: after all Zeroed and Allocated has been registered. In this state, there cannot be further registration. All owners of Zeroed must send a consent transaction, which indicates that they approve that their balance will be burnt.

- Approved: after all consents have been collected, the contract can enter Approved state. Any change in this contract is prohibited until the hardfork block passes.

- Finalized: After the hardfork block, the rebalance result, namely “memo”, is recorded and the contract is finalized. The contract is rendered immutable.

The state transition is only possible in the following order. However, there can be a “reset” where all data is deleted and the state goes back to initialized.

![](/img/misc/state-machine.jpg)

All block validators validate the contract state at the hardfork block. The rebalance event takes place only in the Approved state where no further change can happen. Since this event depends on the consensus of all validators, it is ensured that all validators reach the same world state after this event.

All block validators produce the result of the rebalance event called memo in their validator log. The memo is uploaded to the TreasuryRebalance contract during Finalize. memory is a JSON-formatted string which contains information such as the balance of Zeroed before the rebalance, the balance of Allocated after the rebalance, and the burnt amount. The admin of treasury rebalance validates the consistency of the memo and uploads it to TreasuryRebalance contract. After finalization, the contract becomes immutable forever.
