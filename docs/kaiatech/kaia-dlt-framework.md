# Kaia Chain DLT Framework

Our Distributed Ledger Technology (DLT) framework is designed to provide an efficient and reliable digital ledger system. The framework consists of the following key features:

## Layer Structure

- Our DLT framework operates in three layers of nodes: consensus nodes (CN), proxy nodes (PN), and endpoint nodes (EN). CN is managed by a Validator and is responsible for block creation. These blocks are verified by all the nodes within the network.
- A Core Cell (CC) is composed of a single Consensus Node (CN) and two Proxy Nodes (PNs). Consensus Nodes are participating in the block generation process, while Proxy Nodes provide the interface to the network. PNs transmit the transaction requests to the Consensus Nodes, and propagate the blocks down to the Endpoint Nodes.
- Endpoint Nodes (ENs) serve as endpoints for Kaia network handling RP API requests and processing data sent to and from service chains.

![](/img/misc/kaia-nodes.jpg)

## Consensus algorithm

Blockchains use a “distributed ledger,” which consists of a connected network between individuals with several network participants to record and manage the transaction information. Each blockchain adopts a consensus algorithm that is most suitable for it, with the aim of efficient and smooth consensus on transaction validation and block generation among network participants.

- Kaia uses an optimized version of Istanbul BFT, which implements PBFT (Practical Byzantine Fault Tolerance) with modifications to suit the characteristics of blockchain networks.

The performance of Kaia is as follows:

- Process 4,000 transactions/sec
- Instant transaction finality
- Creation time of 1 second/block

## Smart Contract

- Kaia supports a DVM execution environment, which is designed to be fast and efficient, providing the best and swiftest development environment for dApp developers and projects.

- The current version of Kaia Virtual Machine (DVM) is a derivative of the Ethereum Virtual Machine (EVM). It supports all Opcodes of the Ethereum Virtual Machine equally while providing additional precompiled contracts unique to the Kaia Virtual Machine.

- Kaia supports Solidity and maintains interoperability with Ethereum development toolkits such as Remix, Hardhat, Truffle, and Foundry. A Smart Contract written with Solidity can be compiled using the existing Solidity compiler and can be run on Kaia without additional work.

## Security measures

- We introduced a VRF(Verifiable Random Function) with the selection of the committee leader for the block generation consensus algorithm. VRF is a technology that randomly selects proposer nodes that generate blocks on each round, making it impossible to predict which nodes will be selected.

- Kaia chain has a clear separation between the validator keys and rewards keys to protect them from stealing. Validator signatures need to be verified by all the committee members verifying the block creation.

## Interoperability

- Kaia Blockchain is based on EVM so its compatible with Ethereum and all contracts developed in Solidity can run seamlessly with in Kaia Ecosystem.

- Our DLT framework is designed based on EVM-SDK(Software Development Kit) technology, and is designed to interoperate with the same EVM-SDK based chains to deploy smart contracts without any code changes.

- It facilitates cross-platform transactions and smart contracts by enabling mutual asset movement, message exchange, and contract execution via inter.

## Tokenization

- Kaia chain supports native coins as KAIA.

- The framework provides the ability to issue and manage tokens, which can represent a variety of assets, including but not limited to cryptocurrencies, utility tokens, or asset-backed tokens, or NFTs.

## Governance Protocol

- The on-chain governance of Kaia is designed to be fair and to ensure diverse opinions are shared. Voting entities can vote on all agenda items. Voting rights are calculated in proportion to the amount of staking. However, there is a cap on voting rights to prevent minority opinions from being ignored. Voters can delegate their staking amount to other voters.

- The submitted proposal is on-chain data that anyone can inquire about, and the description and information of the proposal, the result of the vote and the execution history of the proposal are recorded and transparently disclosed.

## Validators

The consensus process consists of the following three stages:

- Step 1 – Election: A committee consisting of one proposer and several nodes is selected. This is a similar task to the leader election in a generally distributed system. The proposer and the committee are randomly selected through VRF since knowing them in advance can make them vulnerable to targeted DoS (denial of service).

- Step 2 - Block Generation: Elected proposers create a block and make a proposal to the committee. The block proposal made through the P2P network is sent to the committee.

- Step 3 - Block Verification: The committee verifies and signs the block proposed by the proposer. A block is complete when more than a quorum of signatures is collected.

## Token Economy

- The framework is automatically issued by the native token, KAIA, at the creation of each block, and the amount of KAIA issuance in each block is determined by the inflation ratio to the total supply. Kaia Blockchain provides incentives through newly minted KAIA and transaction fees.

- On the mainnet of Kaia Blockchain, a certain amount of KAIA is issued whenever a new block is created. Each time a new block is created, a certain amount of KAIA will be newly issued, and the target initial annual inflation rate (amount of KAIA newly issued per year / total KAIA token in the market) of Kaia Blockchain will be set at 5.2% .

- Block Reward for each block will be distributed in prespecified percentages (that can be changed subject to on-chain governance voting).

  1. CCO and Community: 50%
      1. Of the 50%, 20% is Block Creator rewards
      2. Of the 50%, 80% is Staking rewards
  2. KEF (Kaia Ecosystem Fund): 25%
  3. KIF (Kaia Infrastructure Fund): 25%

## Auditability and transparency

- All transactions provide an immutable and verifiable history of all state changes by recording the process from submission to execution in a block and transparently disclosing the entire past block history.

- Kaia chain provides KaiaScope and KaiaFinder to view all the transactions happening on the blockchain.

- The data recorded in each block in the past can be viewed by anyone through the query function, thereby increasing transparency and confidence in the system.

- Kaia Chain provides voting platform “Square” to disclose all the expenses incurred and quarterly known transactions.

## Network Monitoring:

- Kaia Blockchain adopts a multi-channel approach to deal with network congestion. By allocating separate propagation channels to transactions and blocks, the Kaia network can propagate newly created blocks in a timely manner even when the network faces severe congestion due to a large number of transactions. In turn, Kaia guarantees the dApps on the network to continue responding to end-user requests despite intermittent network traffic surges.

- Kaia chain deploys the network monitoring for all the validators in the blockchain.
