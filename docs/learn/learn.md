# Kaia Overview

Kaia is a highly optimized, <LinkWithTooltip to="../misc/glossary#bft-based-public-blockchain" tooltip="A blockchain that ensures consensus even if up to 1/3 of nodes act maliciously,<br /> using Byzantine Fault Tolerance (BFT) algorithms to maintain network integrity."> BFT-based public blockchain </LinkWithTooltip> designed to meet enterprise-grade reliability and performance standards. This overview details Kaia's architecture, features, and ecosystem.

## Key Design Goals

Kaia blockchain aims to:

- Achieve immediate finality for transactions.
- Provide high transaction processing speed for real-world use cases.
- Lower the cost of running blockchain applications.
- Reduce barriers to entry for end-users.
- Facilitate easy technology adoption for various industries.

## Core Specifications

Kaia blockchain offers:

- 1-second block generation and confirmation time.
- Processing capability of 4,000 transactions per second.
- Low gas price, approximately 1/10 of Ethereum.
- EVM (Ethereum Virtual Machine) compatibility, supporting Solidity contracts.
- Governance by reputable corporations worldwide forming <LinkWithTooltip to="../misc/glossary#kaia-governance-council-kgc" tooltip="A consortium governing Kaia blockchain development and operations.">Kaia Governance Council</LinkWithTooltip>.

## Network Architecture

Kaia's network is structured into three logical subnetworks:

![Kaia Ecosystem and its Logical Subnetworks (CCN, ENN, SCN)](/img/learn/klaytn_network_overview.png)

1. **Core Cell Network (CCN)**: Consists of [Core Cells (CCs)](../nodes/core-cell) responsible for transaction verification, execution, and block creation.

2. **Endpoint Node Network (ENN)**: Composed of [Endpoint Nodes (ENs)](../nodes/endpoint-node) that handle RPC API requests and process data for service chains.

3. **[Service Chain](../nodes/service-chain) Network (SCN)**: Auxiliary blockchains independently operated by dApps, connected to the main chain via ENs.

### Node Types

![Kaia Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](/img/learn/klaytn_network_node.png)

1. **Core Cell (CC)**: Composed of one Consensus Node (CN) and two Proxy Nodes (PNs).

   - **Consensus Node (CN)**: Participates in block generation.
   - **Proxy Node (PN)**: Provides network interface, transmits transaction requests, and propagates blocks.

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

- <LinkWithTooltip tooltip="A blockchain that can run smart contracts and <br/> interact with the Ethereum Virtual Machine(EVM)">EVM-compatible</LinkWithTooltip>, allowing easy deployment of Ethereum smart contracts.
- Designed to interoperate with other EVM-SDK based chains.
- Supports cross-platform transactions and smart contract execution.

## Token Economy

Kaia's native token, [KAIA](./token-economics/kaia-native-token.md), plays a central role in the blockchain's economy:

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
