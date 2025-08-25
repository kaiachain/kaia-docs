# 地基设置

了解 Kaia 的高级概述和开始构建的基本要素。

## 快速概览

Kaia 是一种与 EVM 兼容的区块链，设计用于提高速度、安全性和可扩展性。 它使用 Kaia 虚拟机（KVM），与以太坊工具完全兼容，并支持 Solidity 智能合约。 如果您来自以太坊，您会发现过渡非常简单--您现有的大部分代码和工作流程只需极少的改动即可正常工作。

有关 Kaia 架构的更多详情，请查阅 [Why Build on Kaia](../../learn/why-kaia.md) 和 [Consensus Mechanism](../../learn/consensus-mechanism.md) 。

## Kaia 网络

Kaia 有两个主要网络：

- **Kairos Testnet**：用于测试和开发。 连锁编号：1001。 用它来做实验，无需实际成本。
- **主网**：用于生产。 连锁编号：8217。

使用这些 RPC 端点配置您的钱包或工具：

- Kairos: https://public-en-kairos.node.kaia.io
- 主网： https://public-en.node.kaia.io

探索 [Kaiascan](https://kaiascan.io/) (主网) 或 [Kairos Kaiascan](https://kairos.kaiascan.io/) 上的区块和交易。

## 开发工具

Kaia 支持流行的以太坊工具，并对其功能进行了一些扩展。 关键资源：

- **[SDKs](../../references/sdk/sdk.md)**：使用 [ethers-ext](../../references/sdk/ethers-ext/getting-started.md) （etherthers.js 的扩展）、[web3js-ext](../../references/sdk/web3js-ext/getting-started.md) 或其他工具与网络交互。
- **[公共 RPC 端点](../../references/public-en.md)**：通过公共 RPC 端点访问。
- **[Solidity](https://github.com/ethereum/solidity)**：用 Solidity 编写合同--Kaia 完全兼容。
- **[Kaia Contracts Wizard](https://wizard.kaia.io/)**：一个交互式生成器，用于引导您的智能合约并了解 Kaia Contracts。
- 其他工具：[Remix IDE with Kaia Plugin](https://ide.kaia.io/)、[Hardhat](https://v2.hardhat.org/hardhat-runner/docs/getting-started)、[Foundry](https://getfoundry.sh/)和[Thirdweb](https://portal.thirdweb.com/)。