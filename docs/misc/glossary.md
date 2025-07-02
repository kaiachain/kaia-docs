# Glossary

This glossary provides explanation on technical terms specific to the Kaia Blockchain. It stands as your goto for understanding numerous terms you will encounter while exploring Kaia documentation, guides and tutorials.

### anchor
A cryptographically secure reference to data stored outside of a blockchain. Anchors can be used to link data from different systems together, or to provide tamper-proof evidence of the existence of data at a specific point in time.

### anchoring
The process of storing an anchor on a blockchain. This can be done by creating a transaction that contains the hash of the external data, or by creating a smart contract that references the external data (for example, [Anchoring in service chain](../nodes/service-chain/configure/anchoring.md)).

### BFT-based public blockchain
This is a blockchain that utilizes Byzantine Fault Tolerance (BFT), ensuring consensus can be reached even if some nodes fail or act maliciously. The system relies on algorithms designed to handle up to ⅓ of nodes behaving incorrectly or dishonestly, without compromising the integrity of the network.

### block explorer
A web-based tool that allows users to view and search data on a blockchain. Block explorers typically display information such as block height, block hash, transaction hash, transaction sender and receiver, transaction amount, and transaction status. 

The block explorers available in Kaia are [Kaiascan](https://www.kaiascan.io/) and [OKX Kaia Explorer](https://www.okx.com/web3/explorer/kaia).

### core cell (CC)

An entity in the Kaia blockchain architecture that is responsible for executing transactions and generating blocks. A core cell typically consists of a consensus node and multiple proxy nodes. 

See also [consensus node (CN)](#consensus-node-cn), [proxy node (PN)](#proxy-node-pn).

### core cell node network (CCN)

A group of core cell nodes that are interconnected

### consensus node (CN)

A node that is responsible for generating and propagating blocks, and for reaching consensus on the state of the Kaia blockchain. Consensus nodes validate submitted transactions and execute valid transactions.

### endpoint node (EN)

A node that serves as an entry point for service chains and DApps to interact with the Kaia blockchain through its exposed RPC APIs. Endpoint nodes synchronize the entire blockchain ledger and allow reading blockchain data or submitting transactions directly to the network without going through a proxy node.

### endpoint node network (ENN)

A group of endpoint nodes that are interconnected

### externally owned account (EOA)

An account on a blockchain that is controlled by a private key. The private key is held by the user and is used to sign transactions. EOAs are the most common type of account on blockchains and are used by individuals and businesses to interact with the blockchain. 

See also [smart contract account (SCA)](#smart-contract-account-sca).

### fee delegation

A mechanism in some blockchain networks that enables a user to nominate another account to pay transaction fees on their behalf. This allows the user to submit transactions and have them processed without needing to pay fees directly from their own account balance.

### governance council (GC)

A group or organization formed to establish and maintain oversight and decision-making authority over a blockchain network. A blockchain governance council typically defines tasks such as establishing operational procedures, resolving disputes, approving protocol upgrades, and representing the interests of all stakeholders in the network.

### inter-process communication (IPC)

A set of techniques for the exchange of data among two or more processes in one or more computers. It is a fundamental part of operating systems and distributed systems, and is used by many different types of software, including web servers, databases, and graphical user interfaces.

### interplanetary file system (IPFS)

A peer-to-peer distributed file system that enables users to store and share files in a decentralized manner. IPFS uses a content-addressing scheme to uniquely identify each file, and it stores files in a distributed network of nodes.

### Kaia Ecosystem Fund (KEF)

A fund established by the Kaia Foundation to support initiatives that contribute to the growth and development of the Kaia blockchain ecosystem. The KEF provides grants and financial support to projects, organizations, and individuals working to expand usage and adoption of Kaia. The goal of the KEF is to advance innovation and community growth around Kaia through funded initiatives.

### Kaia endpoint node (KEN)

See [endpoint node (EN)](#endpoint-node-en).

### Kaia Infrastructure Fund (KIF)

A reserve fund established by the Kaia Foundation to support its operating expenses and long-term initiatives. The KIF aids in funding the Foundation's work to further develop and enhance the Kaia blockchain protocol and ecosystem through research, business development activities, education programs and more.

### Kaia Governance Council (KGC)

A council of organizations that are responsible for governing the Kaia blockchain. The GC members are selected by the Kaia Foundation and are required to operate a consensus node on the Kaia network. The GC is responsible for making decisions about the development and operation of the Kaia blockchain, including upgrades, partnerships, and ecosystem development initiatives.

### Kaia Improvement Proposal (KIP)

A design document providing information to Kaia stakeholders regarding new features or processes for the Kaia blockchain network. KIPs are intended to provide a consistent and controlled mechanism for proposing, reviewing and adopting protocol upgrades and innovations. They allow advocates to collaborate with the Kaia community to refine any potential protocol upgrades before being considered for inclusion in the software. 

Some of typical examples of KIP are [KIP-7](http://kips.klaytn.foundation/KIPs/kip-7), [KIP-17](http://kips.klaytn.foundation/KIPs/kip-17), and [KIP-37](http://kips.klaytn.foundation/KIPs/kip-37).

### Kaia State

This is the world state of accounts in Kaia containing the balances, storage variables of the account and the hash of the code or bytecode depending on if the account is an EOA or SCA.


### Kaia virtual machine (KVM)

A virtual state machine that executes Kaia smart contracts. It is a quasi-Turing-complete stack-based virtual machine that is derived from the Ethereum Virtual Machine (EVM). The KVM is responsible for processing and executing smart contracts on the Kaia blockchain.

### Kaia network identifier (KNI)

A unique resource identifier scheme to identify a Kaia node. It consists of nodeID, hostname, port, and discport.

### Kairos
The public testnet of the Kaia platform. It is used by developers to test and verify their applications before deploying them to the Mainnet.

### proposer

A role assigned to a consensus node (CN) in each round of block creation. The proposer is randomly but deterministically selected to create the next block. The probability of a CN being enlisted as the proposer is determined by the amount of Kaia tokens, or KAIA, that the CN stakes.

### proxy node (PN)

A node that is responsible for relaying transactions from endpoint nodes (ENs) to consensus nodes (CNs). It aids in enhancing the performance of the network by reducing the direct communication load between ENs and CNs.

### recursive-length prefix (RLP)

An address prefix format where the length of the prefix is included as part of the address information in computer networking, It allows for more efficient routing by eliminating the need to store prefix lengths separately for each route. Kaia uses recursive-length prefix to represent blockchain addresses.

### remote procedure call (RPC)

A communication protocol that allows a program on one computer to execute code or request services from a program located on another, often remote, computer within a network.

### soul-bound token (SBT)

A non-transferable token that represents a person's identity and achievements in the Web3 ecosystem. It is a type of non-fungible token (NFT) that is permanently tied to a specific individual or crypto wallet.

### smart contract account (SCA)

An account on a blockchain that is controlled by a smart contract. A smart contract is a self-executing contract with the terms of the agreement between buyer and seller directly written into lines of code. SCAs are used to automate transactions and agreements on the blockchain. 

See also [externally owned account (EOA)](#externally-owned-account-eoa).

### service chain

A sidechain or auxiliary blockchain that is connected to the Kaia mainnet. Service chains are designed to meet the specific needs of different applications or industries, such as immediate finality, cross-chain token transfer, and data anchoring to the main chain.

### service chain consensus node (SCN)

A node that is responsible for participating in the consensus process in a Kaia service chain. 

See also [consensus node (CN)](#consensus-node-cn), [service chain](#service-chain).

### service chain endpoint node (SEN)

A node in a Kaia service chain that provides a public interface for interacting with the service chain. 

See also [endpoint node (EN)](#endpoint-node-en), [service chain](#service-chain).

### state migration

This process involves removing unnecessary or outdated data from the blockchain to reduce the amount of required storage space and improve efficiency.

### transaction pool

A critical component for managing pending and queued transactions awaiting inclusion in the next blocks within the network. 

### validator

A node that verifies the accuracy of data contained in new blocks and ensures that blocks are processed efficiently across the network. In Kaia's permissionless validation structure, anyone can act as a block validator if they meet certain qualifications while maintaining the existing Governance Council structure and roles.