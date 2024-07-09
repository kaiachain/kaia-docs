# Overview

Klaytn is a highly optimized, BFT-based public blockchain that aims to meet the enterprise-grade reliability.
Key design goals are;

- Immediate finality.
- High TPS that meets real-world use cases.
- Lower the cost of running Blockchain Applications.
- Lower the barriers to entry for end-users.
- Ease the technology adoption process for industry.

Kaia continues to generate blocks on top of the Klaytn blockchain launched on June 27, 2019, with the following specifications:

- 1-second block generation and confirmation time.
- 4,000 transactions per second.
- Low gas price that is almost 1/10 of Ethereum.
- Runs EVM (Ethereum Virtual Machine) and supports the execution of Solidity contracts.
- 19 reputable corporations worldwide initially formed <LinkWithTooltip to="../misc/glossary#klaytn-governance-council-kgc" tooltip="A consortium governing Klaytn blockchain development and operations.">Klaytn Governance Council</LinkWithTooltip> to operate <LinkWithTooltip to="../misc/glossary#consensus-node-cn" tooltip="Consensus node (CN) validates transactions, builds blocks,<br />  and achieves network agreement.">consensus nodes</LinkWithTooltip>. The current number of consensus nodes is shown in the [Klaytnscope](https://klaytnscope.com).
- More than 50 initial service partners have committed to launch Blockchain Applications on Klaytn.

## Klaytn: The Big Picture <a id="klaytn-the-big-picture"></a>

Klaytn can be partitioned into three logical subnetworks based on their roles and purposes. The below figure displays the high-level view of the Klaytn ecosystem.

![Klaytn Ecosystem and its Logical Subnetworks (CCN, ENN, SCN)](/img/learn/klaytn_network_overview.png)

### Core Cell Network (CCN) <a id="core-cell-network-ccn"></a>

CCN consists of Core Cells (CCs) that verify and execute transactions submitted through Endpoint Nodes (ENs).
CCN is responsible for creating and propagating blocks throughout the network.

### Endpoint Node Network (ENN) <a id="endpoint-node-network-enn"></a>

ENN consists of Endpoint Nodes (ENs) that mainly create transactions, handle RPC API requests, and process data requests from service chains.

### Service Chain Network (SCN) <a id="service-chain-network-scn"></a>

SCNs are Klaytn subnetworks composed of auxiliary blockchains independently operated by dApps (Decentralized Applications). Service chains are connected to the main chain via ENs.

**Core Cell Network** and **Endpoint Node Network** form a Klaytn main chain or mainnet.
Blockchain Applications can run on the Klaytn main chain, Cypress, or can operate on their own blockchains called **Service Chains**. If you want to have a dedicated execution environment for your application that guarantees high TPS and configurable network policies, we recommend using Service Chain.

> To set up a Service Chain for your application, read the [installation and operation guide of Service Chain](../nodes/service-chain/quick-start/quick-start.md).

## Klaytn Network Topology <a id="klaytn-network-topology"></a>

In this section, we will describe the network topology of Klaytn main chain.
A tiered network architecture with role-based node types is implemented in Klaytn to optimize the network performance.

### Role-based Node Types <a id="role-based-node-types"></a>

Before we go over the Klaytn main chain network topology,
we need to get familiar with the different types of Klaytn nodes.

#### Core Cell (CC): Consensus Node (CN) + Proxy Node (PN) <a id="core-cell-cc-consensus-node-cn-proxy-node-pn"></a>

A Core Cell (CC) is composed of a single **Consensus Node (CN)** and two **Proxy Nodes (PNs)**.
Consensus Nodes are participating in the block generation process, while Proxy Nodes provide the interface to the network. PNs transmit the transaction requests to the Consensus Nodes, and propagate the blocks down to the Endpoint Nodes.

> If you are interested in being a Core Cell Operator, read the [installation and operation guide of Core Cell](../nodes/core-cell/install/before-you-install.md).

#### Endpoint Node (EN) <a id="endpoint-node-en"></a>

ENs serve as endpoints for Klaytn
network handling RPC API requests and processing data sent to and from service
chains.

> To set up an Endpoint Node for your application, read the [installation and operation guide of Endpoint Node](../nodes/endpoint-node/endpoint-node.md).

#### Bootnode <a id="bootnode"></a>

Bootnodes are special-type nodes operated by Klaytn to help newly joining nodes
register to the network and to discover other nodes to connect with.
CN bootnodes reside within the CNN and are not exposed to the public, while PN
and EN bootnodes are publicly visible.  PN bootnodes only allow permitted PNs to
be registered, and let eligible PNs connect with ENs.  EN bootnodes provide ENs
with information on which PNs to connect to.

### Tiered Networks <a id="tiered-networks"></a>

CNs, PNs, and ENs form logical networks, Consensus Node Network (CNN), Proxy Node Network (PNN), and Endpoint Node Network (ENN), respectively.

Below figure shows the overall topology of Klaytn mainnet, where Core Cell Network
(CCN) is further broken down into Consensus Node Network (CNN) and Proxy Node Network (PNN).
Endpoint Node Network (ENN) is also shown as the surrounding network connected directly to PNN.

![Klaytn Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](/img/learn/klaytn_network_node.png)

#### Consensus Node Network (CNN) <a id="consensus-node-network-cnn"></a>

CNs form a full-mesh network among themselves called CNN. CNN applies BFT over
a WAN (wide area network) and requires each CN to satisfy [stringent hardware and network resource requirements](./../nodes/core-cell/system-requirements.md) to carry out BFT consensus at a sufficient performance level.

#### Proxy Node Network (PNN) <a id="proxy-node-network-pnn"></a>

PNN consists of PNs.
Typically, PNs maintain just one connection with a PN in a neighboring Core Cell.
The number of peer connections is subject to change depending on the network configuration.

#### Endpoint Node Network (ENN) <a id="endpoint-node-network-enn"></a>

The outermost subnetwork, ENN, is solely composed of ENs connected
to each other and also to a number of PNs.

## Block Generation and Propagation <a id="block-generation-and-propagation"></a>

Block generation and propagation design, along with the consensus
algorithm used, plays an important role in reducing the latency of a
blockchain platform.

### Block Generation Cycle <a id="block-generation-cycle"></a>

A 'round' is a block generation cycle in Klaytn. Each round generates a new
block, and is immediately followed by the start of a new round. Klaytn targets
each round to be approximately one second, although block generation interval
may be influenced by network traffic and node operation conditions.

#### Proposer and Committee Selection <a id="proposer-and-committee-selection"></a>

In each round, Klaytn randomly but deterministically selects a Consensus Node
(CN) as the <LinkWithTooltip to="../misc/glossary#proposer" tooltip="A randomly chosen consensus node for block creation.">proposer</LinkWithTooltip> for the block to be created, and then selects a group of CNs as the committee for the given round. Klaytn is not directly involved in
the selection of either the proposer or committee; instead, each CN uses a
random number derived from the most recent block header to run a cryptographic
operation which yields proof that the CN has (or has not) been selected for
this round. The committee size should be Byzantine resistant; if the size of
the CNN is small, all CNs (except the proposer) are eligible to be selected as
committee members.

#### Block Proposal and Validation <a id="block-proposal-and-validation"></a>

Once selected, the proposer broadcasts its proof of selection for the round
(i.e., a cryptographic proof verifiable by the public key of the proposer) to
all CNs. Thereafter, the CNs selected as committee for the given round responds
to the proposer with their own proofs of selection, notifying the proposer to
whom to broadcast the new block to be proposed. The proposer then selects a set
of transactions from its transaction pool and creates a block by ordering them.
Lastly, the proposer executes consensus with the committee to agree upon and
finalize the newly created block. Note that Klaytn plans to continuously
improve its consensus algorithm to achieve higher security and efficiency.

### Block Propagation <a id="block-propagation"></a>

A proposed block must receive signatures from more than two-thirds of the
committee members to be successfully finalized. When the committee reaches
consensus, the new block is propagated to all CNs and the consensus round ends.
Once the new block is propagated to all CNs, the information of the newly
created block can be made available to all Klaytn network participants by
delivering block header and body data to ENN through PNN.

## Public Disclosure and Open Validation <a id="public-disclosure-and-open-validation"></a>

Service providers and end-users on Klaytn network can freely validate block
generation results and check if the CN committee have generated the block
according to proper procedures. Such validation includes checking if the block
header contains more than two-thirds of the committee signatures. All CNs must
support open validation and are required to post their public keys (used to
sign blocks) in a publicly accessible space (e.g., block headers). Open
validation promotes transparency, deter censorship, and prevent malicious
behaviors.

## Separated Propagation Channels for Blocks and Transactions (Multichannel Propagation) <a id="separated-propagation-channels-for-blocks-and-transactions-multichannel-propagat"></a>

A network's latency is heavily affected by its degree of congestion. Assuming
the network's throughput remains constant, increased number of transactions
will cause the network's latency to be proportionately delayed. Latency delay
is a critical issue in dApps;
typical users of legacy mobile apps or web services will not tolerate response
time that takes more than a few seconds, and blockchain services have no reason
to assume a higher user tolerance.

Klaytn adopts a multichannel approach in order to handle network congestion
issues. By assigning separate propagation channels for transactions and blocks,
Klaytn network is able to propagate newly created blocks in a timely manner
even when the network faces heavy congestion with high number of transactions.
In this way, Klaytn ensures that dApps on its network can stay responsive to
end-user requests regardless of intermittent network traffic spikes.

## Block Rewards <a id="block-rewards"></a>

For each round, block reward (which is the sum of 6.4 newly minted <LinkWithTooltip tooltip="The native token of the Klaytn blockchain.">KLAY</LinkWithTooltip> and
transaction fees paid to process the block) will be distributed to
the network participants according to preset distribution ratios. The proposer
of the newly created block will receive 100% of the reward to be awarded to
CNs, whereas the committee will receive none. Note that the probability of
being selected as the proposer is influenced by the amount of KLAY staked by
the CN, implying that a CN with more KLAY invested in the platform will
probabilistically receive more rewards. Details of block reward distribution
can be found in the [Klaytn Token Economy](./token-economy.md) section.
