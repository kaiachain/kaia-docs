---
sidebar_label: Kaia vs. Ethereum
---

# Kaia vs. Ethereum: A Comparison for Builders

This comprehensive comparison reveals the key differences and similarities between Kaia blockchain and Ethereum, providing developers and users with the essential information needed to understand migration requirements and opportunities.

## Overview

| Ethereum | Kaia |
| :---- | :---- |
| Established Layer 1, large ecosystem & community | EVM-compatible Layer 1, formed from the Klaytn & Finschia merger. Focus on Web3 adoption in Asia, enterprise-grade reliability, high performance. |

## User Perspective

| Feature | Ethereum | Kaia |
| :---- | :---- | :---- |
| **Transactions Per Second (TPS)** | \~15-30 TPS (can vary) | Up to 4,000 TPS. Real-time TPS reported as significantly higher than Ethereum. |
| **Block Time** | \~12 seconds. | 1-second block generation time. |
| **Finality** | \~13-15 minutes (2 epochs) | Immediate finality ([PBFT-based consensus](https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-)). |
| **Transaction Fees (Gas)** | Variable, EIP-1559 auction model | [EIP-1559 compatible dynamic fee model](https://github.com/kaiachain/kips/blob/main/KIPs/kip-162.md) with [fee delegation](https://docs.kaia.io/build/transactions/fee-delegation/) allowing applications to pay user fees. |
| **Wallet Compatibility** | MetaMask, Ledger, Trust Wallet, etc. | Compatible with Ethereum wallets (for example, MetaMask via RPC config). Kaia-specific wallets (for example, [Kaia Wallet](https://docs.kaia.io/build/tools/wallets/kaia-wallet/)). |
| **Token** | ETH | [KAIA](https://docs.kaia.io/learn/token-economics/kaia-native-token/) |

## Developer Perspective

| Feature | Ethereum | Kaia |
| :---- | :---- | :---- |
| **Virtual Machine** | Ethereum Virtual Machine (EVM) | EVM-compatible ([Kaia Virtual Machine \- KVM](https://docs.kaia.io/learn/smart-contracts/#kaia-virtual-machine-kvm-powering-smart-contracts-), based on EVM) and continually updated to support the latest Ethereum opcodes, so Solidity contracts run without modification. |
| **Smart Contract Languages** | Solidity, Vyper, Yul, etc. | Solidity, Vyper, Yul, Huff. |
| **Precompiles** | Standard Ethereum precompiles | Supports standard EVM opcodes and additional [Kaia-specific precompiled contracts](https://docs.kaia.io/learn/smart-contracts/precompiled-contracts/). |
| **Development Tools** | **Smart Contracts Development Tools:** Remix, Hardhat, Foundry, etc. **Web3 libraries:** Ethers, Web3js, Web3j, Web3py, Viem | **Smart Contracts Development Tools:** [Compatible with Ethereum tools](https://docs.kaia.io/build/smart-contracts/ide-and-tools/) (Remix, Hardhat, Foundry, etc.) **Web3 libraries:** Compatible with Ethers, Web3js, Web3j, Web3py, Viem. Kaia provides [its own SDK extensions](https://docs.kaia.io/references/sdk/). |
| **Transaction Types** | Legacy, EIP-2930, EIP-1559, EIP-4844, etc. | Supports major [Ethereum transaction types](https://docs.kaia.io/build/transactions/ethereum/) (Legacy, EIP-2930, EIP-1559), plus native transaction types like [fee delegation](https://docs.kaia.io/build/transactions/fee-delegation/) and [partial fee delegation](https://docs.kaia.io/build/transactions/partial-fee-delegation/). |
| **Gas Mechanism** | EIP-1559 (base fee \+ priority fee auction) | EIP-1559 compatible [dynamic gas fee model](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-) with [Gas Abstraction](https://github.com/kaiachain/kaia/releases/tag/v2.0.0) for token-based fee payments and [EIP-7623 compatible calldata pricing](https://kips.kaia.io/KIPs/kip-223) for seamless SDK compatibility. |
| **Account Model** | Externally Owned Accounts (EOAs), Contracts | Supports standard Ethereum accounts and [EIP-7702](https://github.com/kaiachain/kaia/releases/tag/v2.0.0) that allows EOAs to have smart contract code. Features native [account abstraction](https://docs.kaia.io/learn/accounts/#multiple-key-pairs-and-role-based-keys-) with capabilities like flexible key management. |
| **RPC API** | Standard Ethereum JSON-RPC API (`eth_` namespace) | [Largely compatible](https://docs.kaia.io/references/public-en/). Provides `eth_` namespace for Ethereum compatibility. `kaia_` namespace for Kaia-specific features. |
| **Websockets** | Supported | [Supported](https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints) |
| **Consensus** | Proof-of-Stake (Gasper: Casper-FFG \+ LMD-GHOST) | Optimized version of Istanbul BFT (IBFT), a PBFT-variant. Uses [Verifiable Random Function (VRF) for proposer selection](https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-). |
| **Node Architecture** | Execution clients, Consensus clients | [Multi-layered](https://docs.kaia.io/learn/#network-architecture): Core Cells (CCs) with Consensus Nodes (CNs) and Proxy Nodes (PNs); Endpoint Nodes (ENs); Service Chain Nodes. |
| **Governance** | Primarily off-chain, community-driven. | [On-chain governance](https://docs.kaia.io/learn/governance/) involves a Governance Council (GC) composed of reputable organizations. Voting rights proportional to staked KAIA. |

## What Stays the Same

* **High EVM compatibility:** Kaia's strong EVM compatibility means most Ethereum dApps, tools (Hardhat, Foundry, Remix), and Solidity contracts can be migrated or used with minimal changes. This is the biggest "stays the same" aspect.  
* **Familiar Development Tools & Languages:** Solidity remains the primary smart contract language. Ethereum development tools like Remix, Hardhat, and Foundry are largely usable.  
* **Standard Ethereum Wallet Compatibility:** Standard Ethereum wallets like MetaMask can be used by changing the RPC URL and ChainID.  
* **`eth_` RPC Namespace:** The `eth_` namespace for RPC APIs allows interaction similar to Ethereum for common functionalities, ensuring compatibility with existing Ethereum tools for standard operations.  
* **Standard Ethereum Address Format:** Kaia uses the standard Ethereum address format (`0x` \+ 40 hex chars).

## What’s Different

* **Performance & Cost:**  
  * Expect significantly higher Transactions Per Second (TPS) (up to 4,000 TPS) compared to Ethereum's \~15-30 TPS.  
  * Block times are much faster at 1-second.  
  * Kaia offers immediate finality, a significant difference from Ethereum's probabilistic finality.  
  * Transaction fees (gas) are designed to be low and stable, using an EIP-1559 compatible fee model. Gas price will be in `kei`.  
* **RPC & SDKs:**  
  * While `eth_` namespace is supported, the `kaia_` namespace is necessary for new or Kaia-specific features and transaction types.  
  * Legacy `klay_` namespace might exist and is equivalent to the `kaia_` namespace.  
  * Kaia provides its own SDK extensions for popular Web3 libraries ([Ethers-ext](https://docs.kaia.io/references/sdk/ethers-ext/getting-started/), [Web3js-ext](https://docs.kaia.io/references/sdk/web3js-ext/getting-started/), [Web3j-ext](https://docs.kaia.io/references/sdk/web3j-ext/getting-started/), [Web3py-ext](https://docs.kaia.io/references/sdk/web3py-ext/getting-started/), and [Viem-ext](https://docs.kaia.io/references/sdk/viem-ext/getting-started/)) that enable seamless migration from Ethereum while providing access to Kaia's enhanced features and performance benefits.  
* **Native Features (Beyond Standard EVM):**  
  * **Account Abstraction:** Kaia has advanced account features (for example, multiple keys per account, role-based permissions), offering more flexibility than Ethereum's EOA model.  
  * **Transaction Types:** Kaia will have its own native transaction types alongside Ethereum's (for example, for account updates, fee delegation). For Ethereum transactions, use standard `eth_` RPCs for best compatibility.  
  * **Fee Delegation:** This feature can significantly improve UX by allowing dApps to pay gas fees for users.  
* **Consensus & Governance:**  
  * The consensus mechanism is an optimized version of Istanbul BFT (IBFT), different from Ethereum's Gasper, leading to faster block times and immediate finality.  
  * Governance involves an on-chain Governance Council (GC), differing from Ethereum's more fluid off-chain governance.  
* **Token:** The native token is KAIA. Tokenomics and utility is specific to Kaia.  
* **Node Architecture:** Kaia uses a **purpose-built, layered architecture** with [specialized node types](https://docs.kaia.io/learn/#network-architecture) (Core Cells for consensus, Endpoint Nodes for public access) designed to optimize performance and security, differing from Ethereum's unified client approach.  
* **Mempool:** Transaction handling and public mempool visibility might differ due to Kaia's specific network architecture, with less emphasis on a global, public mempool like Ethereum's.  
* **Precompiled Contracts:** While base EVM precompiles are supported, Kaia may feature additional Kaia-specific precompiled contracts.

## Next Steps for Builders

1. **Configure Your Environment**  
Configure your existing Ethereum tools to work with Kaia:

* [Mainnet RPC](https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints): https://public-en.node.kaia.io ([Chain ID](https://docs.kaia.io/nodes/service-chain/configure/configuration-files/#properties-): 8217\)  
* Testnet: Kairos testnet for testing ([get free tokens](https://docs.kaia.io/build/get-started/getting-kaia/) from [faucet](https://www.kaia.io/faucet))  
* Tools: Hardhat, Foundry, and MetaMask work without modification

2. **Deploy and Test**  
Your Solidity contracts deploy unchanged due to full EVM compatibility. Test on Kairos testnet to verify gas usage patterns under Kaia's dynamic fee model.

3. **Leverage Kaia's Advantages**

* Immediate Finality: 1-second blocks with instant finality eliminate confirmation waiting  
* [Lower Gas Costs](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-): Build features that would be too expensive on Ethereum  
* [Fee Delegation](https://docs.kaia.io/build/transactions/fee-delegation/): Let your dApp pay user transaction fees to improve UX  
* [Gas Abstraction](https://github.com/kaiachain/kaia/releases/tag/v2.0.0): Users can pay fees with approved tokens (not just KAIA)

4. **Use Appropriate APIs and SDKs**

* Standard `eth_` namespace for Ethereum-compatible operations  
* `kaia_` namespace for accessing Kaia-specific features and transaction types  
* While ethers.js and web3.js work perfectly, consider exploring [Kaia's SDKs](https://docs.kaia.io/references/sdk/) for easier integration with native features.

5. **Stay Informed** 

* Consult the [Kaia Docs](https://docs.kaia.io/) that are your primary source for the latest information.  
* Engage with other builders and the Kaia team on the [Kaia Developer Forum](https://devforum.kaia.io/) and other community channels for support and updates.