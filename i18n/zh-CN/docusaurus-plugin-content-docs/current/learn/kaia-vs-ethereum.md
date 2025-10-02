---
sidebar_label: Kaia 与以太坊
---

# Kaia 与以太坊：面向构建者的比较

本综合比较揭示了 Kaia 区块链和以太坊之间的主要异同，为开发人员和用户提供了了解迁移要求和机会所需的基本信息。

## 概述

| 以太坊                 | 卡娅                                                                    |
| :------------------ | :-------------------------------------------------------------------- |
| 已建立的第 1 层、大型生态系统和社区 | 与 EVM 兼容的第 1 层，由 Klaytn 和 Finschia 合并而成。 重点关注 Web3 在亚洲的应用、企业级可靠性和高性能。 |

## 用户视角

| 特点             | 以太坊                               | 卡娅                                                                                                                                                                |
| :------------- | :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **每秒交易量（TPS）** | \~15-30 TPS（可变化） | 高达 4,000 TPS。 据报告，实时 TPS 明显高于以太坊。                                                                                                                                 |
| **时间**         | ~12秒              | 区块生成时间为 1 秒。                                                                                                                                                      |
| **基本情况**       | ~13-15分钟（2个纪元）    | 即时终局性（[基于 PBFT 的共识](https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-)）。                                                               |
| **交易费（天然气）**\* | 变量，EIP-1559 拍卖模型                  | [兼容 EIP-1559 的动态收费模式](https://github.com/kaiachain/kips/blob/main/KIPs/kip-162.md) 与[收费授权](https://docs.kaia.io/build/transactions/fee-delegation/) 允许应用程序支付用户费用。 |
| **钱包兼容性**      | MetaMask、Ledger、Trust Wallet 等。   | 与以太坊钱包兼容（例如，通过 RPC 配置的 MetaMask）。 Kaia 专用钱包（例如，[Kaia Wallet](https://docs.kaia.io/build/tools/wallets/kaia-wallet/)）。                                             |
| **代币**         | ETH                               | [KAIA](https://docs.kaia.io/learn/token-economics/kaia-native-token/)                                                                                             |

## 开发者视角

| 特点            | 以太坊                                                                                 | 卡娅                                                                                                                                                                                                                                                                                                    |
| :------------ | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **虚拟机**       | 以太坊虚拟机 (EVM)                                                     | 与 EVM 兼容（[Kaia Virtual Machine （KVM）](https://docs.kaia.io/learn/smart-contracts/#kaia-virtual-machine-kvm-powering-smart-contracts-)，基于 EVM），并不断更新以支持最新的以太坊操作码，因此 Solidity 合约无需修改即可运行。                                                                                                               |
| **智能合同语言**    | Solidity、Vyper、Yul 等。                                                               | 固体、维佩尔、尤尔、赫夫。                                                                                                                                                                                                                                                                                         |
| **预编译**       | 标准以太坊预编译                                                                            | 支持标准 EVM 操作码和额外的[Kaia 专用预编译合同](https://docs.kaia.io/learn/smart-contracts/precompiled-contracts/)。                                                                                                                                                                                                    |
| **开发工具**      | **智能合约开发工具：** Remix、Hardhat、Foundry 等。 **Web3 库：** Ethers、Web3js、Web3j、Web3py、Viem | **智能合约开发工具：** [与以太坊工具兼容](https://docs.kaia.io/build/smart-contracts/ide-and-tools/) （Remix、Hardhat、Foundry 等）。 **Web3 库：** 与 Ethers、Web3js、Web3j、Web3py 和 Viem 兼容。 Kaia 提供[自己的 SDK 扩展](https://docs.kaia.io/references/sdk/)。                                                                       |
| **交易类型**\*    | 传统型、EIP-2930、EIP-1559、EIP-4844 等。                                                   | 支持主要的[以太坊交易类型](https://docs.kaia.io/build/transactions/ethereum/) (Legacy, EIP-2930, EIP-1559)，以及[费用委托](https://docs.kaia.io/build/transactions/fee-delegation/) 和[部分费用委托](https://docs.kaia.io/build/transactions/partial-fee-delegation/) 等本地交易类型。                               |
| **气体机制**      | EIP-1559（基本费+优先权拍卖费）                                                                | EIP-1559 兼容[动态燃气收费模式](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-) 与[燃气抽象](https://github.com/kaiachain/kaia/releases/tag/v2.0.0) ，用于基于令牌的收费，以及[EIP-7623 兼容 calldata 定价](https://kips.kaia.io/KIPs/kip-223) ，用于无缝兼容 SDK。                                                        |
| **账户模式**      | 外部拥有账户（EOA）、合同                                                                      | 支持标准以太坊账户和允许 EOA 拥有智能合约代码的 [EIP-7702](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)。 本机[账户抽象]（https://docs.kaia.io/learn/accounts/#multiple-key-pairs-and-role-based-keys-）具有灵活的密钥管理等功能。 |
| **RPC应用程序接口** | 标准以太坊 JSON-RPC 应用程序接口（`eth_` 名称空间）                                                  | [基本兼容](https://docs.kaia.io/references/public-en/). 提供 `eth_` 命名空间，以便与以太坊兼容。 `kaia_` 命名空间用于 Kaia 特有的功能。                                                                                                                                                                               |
| **网络接口**      | 支持                                                                                  | [支持]（https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints)                                                                                                                |
| **协商一致**      | 取证 (Gasper: Casper-FFG \+ LMD-GHOST)            | 伊斯坦布尔 BFT (IBFT) 的优化版，是 PBFT 的变体。 使用[可验证随机函数（VRF）选择建议者](https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-)。                                                                                                                                             |
| **节点架构**      | 执行客户、共识客户                                                                           | [多层](https://docs.kaia.io/learn/#network-architecture)：具有共识节点（CN）和代理节点（PN）的核心单元（CC）；端点节点（EN）；服务链节点。                                                                                                                                                                                                   |
| **治理**        | 主要在链外，由社区驱动。                                                                        | [链上治理](https://docs.kaia.io/learn/governance/) 涉及由知名组织组成的治理委员会（GC）。 投票权与所持 KAIA 成比例。                                                                                                                                                                                                                  |

## 保持不变

- \*\* 高 EVM 兼容性：\*\* Kaia 强大的 EVM 兼容性意味着大多数以太坊 dApp、工具（Hardhat、Foundry、Remix）和 Solidity 合约都可以迁移或使用，只需做极少的改动。 这是最大的 "不变 "之处。
- \*\* 熟悉的开发工具和语言：\*\* Solidity 仍是主要的智能合约语言。 Remix、Hardhat 和 Foundry 等以太坊开发工具在很大程度上是可用的。
- **标准以太坊钱包兼容性：** 通过更改 RPC URL 和 ChainID，可以使用 MetaMask 等标准以太坊钱包。
- **`eth_` RPC 命名空间：** RPC API 的`eth_`命名空间允许与以太坊进行类似的交互，以实现常见功能，确保与现有以太坊工具的标准操作兼容。
- **标准以太坊地址格式：** Kaia 使用标准以太坊地址格式（`0x` （+ 40 十六进制字符）。

## 与众不同之处

- **性能与成本：**
  - 与以太坊的（\~15-30 TPS）相比，每秒交易量（TPS）有望大幅提高（高达 4,000 TPS）。
  - 街区时间更快，为 1 秒。
  - Kaia 提供即时终局性，这与以太坊的概率终局性有很大不同。
  - 交易费（煤气费）采用 EIP-1559 兼容收费模式，收费低且稳定。 天然气价格以 `kei` 为单位。
- **RPC和SDK：**
  - 在支持 `eth_` 命名空间的同时，`kaia_` 命名空间对于新的或 Kaia 特有的功能和事务类型是必要的。
  - 可能存在传统的 `klay_` 命名空间，它等同于 `kaia_` 命名空间。
  - Kaia 为流行的 Web3 库提供了自己的 SDK 扩展（[Ethers-ext](https://docs.kaia.io/references/sdk/ethers-ext/getting-started/)、[Web3js-ext](https://docs.kaia.io/references/sdk/web3js-ext/getting-started/)、[Web3j-ext](https://docs.kaia.io/references/sdk/web3j-ext/getting-started/)、[Web3py-ext](https://docs.kaia.io/references/sdk/web3py-ext/getting-started/)和[Viem-ext](https://docs.kaia.io/references/sdk/viem-ext/getting-started/)），实现了从以太坊的无缝迁移，同时提供了对 Kaia 增强功能和性能优势的访问。
- **本地功能（标准 EVM 之外）：**
  - **账户抽象：** Kaia 具有高级账户功能（例如，每个账户有多个密钥、基于角色的权限），比以太坊的 EOA 模型更具灵活性。
  - **交易类型：** Kaia 将与以太坊一样拥有自己的本地交易类型（例如，用于账户更新、费用委托）。 对于以太坊交易，请使用标准的 `eth_` RPC 以获得最佳兼容性。
  - \*\* 费用委托：\*\* 该功能允许 dApp 为用户支付燃气费，可显著改善用户体验。
- **协商一致与治理：**
  - 该共识机制是伊斯坦布尔 BFT（IBFT）的优化版本，不同于以太坊的 Gasper，可加快区块时间并立即完成。
  - 治理涉及链上治理委员会（GC），不同于以太坊更加灵活的链下治理。
- **令牌：** 本地令牌是 KAIA。 代币经济学和实用性是 Kaia 特有的。
- **节点架构：** Kaia 采用**专用分层架构**，[专用节点类型](https://docs.kaia.io/learn/#network-architecture)（核心单元用于达成共识，终端节点用于公共访问）旨在优化性能和安全性，有别于以太坊的统一客户端方法。
- \*\* 内存池：\*\* 交易处理和公共内存池的可见性可能会因 Kaia 的特定网络架构而有所不同，它不像以太坊那样强调全局性的公共内存池。
- \*\* 预编译合同：\*\* 在支持基本 EVM 预编译的同时，Kaia 还可能提供额外的 Kaia 专用预编译合同。

## 建设者的下一步行动

1. \*\* 配置你的环境\*\*  
   配置你现有的以太坊工具，以便与 Kaia 协同工作：

- [Mainnet RPC](https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints): https://public-en.node.kaia.io ( [Chain ID](https://docs.kaia.io/nodes/service-chain/configure/configuration-files/#properties-)：8217\)
- 测试网：用于测试的 Kairos 测试网（[获取免费代币](https://docs.kaia.io/build/get-started/getting-kaia/) 来自[龙头](https://www.kaia.io/faucet))
- 工具Hardhat、Foundry 和 MetaMask 无需修改即可使用

2. \*\* 部署和测试\*\*  
   由于与 EVM 完全兼容，您的 Solidity 合同在部署时保持不变。 在 Kairos 测试网上进行测试，以验证 Kaia 动态收费模式下的天然气使用模式。

3. **利用卡娅的优势**

- 即时终结：1 秒区块即时终结，无需等待确认
- [降低天然气成本](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-)：构建在以太坊上成本过高的功能
- [Fee Delegation](https://docs.kaia.io/build/transactions/fee-delegation/)：让您的 dApp 支付用户交易费用以改善用户体验
- [Gas Abstraction](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)：用户可以使用经认可的代币（不仅仅是 KAIA）支付费用

4. **使用适当的应用程序接口和 SDK**

- 用于以太坊兼容操作的标准 `eth_` 命名空间
- 用于访问 Kaia 特有功能和事务类型的 `kaia_` 命名空间
- 虽然 ethers.js 和 web3.js 可以完美运行，但也可以考虑使用 [Kaia 的 SDK](https://docs.kaia.io/references/sdk/) 与本地功能更轻松地集成。

5. **保持信息畅通**

- 请查阅 [Kaia Docs](https://docs.kaia.io/)，这是您获取最新信息的主要来源。
- 在[Kaia 开发者论坛](https://devforum.kaia.io/) 和其他社区渠道上与其他构建者和 Kaia 团队互动，以获得支持和更新。