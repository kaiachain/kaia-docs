# 卡娅概述

Kaia 是高度优化的、<LinkWithTooltip to="../misc/glossary#bft-based-public-blockchain" tooltip="A blockchain that ensures consensus even if up to 1/3 of nodes act maliciously,<br /> using Byzantine Fault Tolerance (BFT) algorithms to maintain network integrity."> 基于 BFT 的公共区块链 </LinkWithTooltip>，旨在满足企业级可靠性和性能标准。 本概述详细介绍了 Kaia 的架构、功能和生态系统。

## 主要设计目标

Kaia 区块链旨在

- 实现交易的即时终结。
- 为实际应用案例提供高交易处理速度。
- 降低区块链应用的运行成本。
- 降低终端用户的准入门槛。
- 为各行各业轻松采用技术提供便利。

## 核心规格

Kaia 区块链提供

- 区块生成和确认时间为 1 秒。
- 处理能力达每秒 4000 笔交易。
- 天然气价格低廉，约为以太坊的 1/10。
- 兼容 EVM（以太坊虚拟机），支持 Solidity 合约。
- 全球知名企业组成<LinkWithTooltip to="../misc/glossary#kaia-governance-council-kgc" tooltip="A consortium governing Kaia blockchain development and operations.">Kaia 治理委员会</LinkWithTooltip>进行治理。

## 网络架构

Kaia 的网络结构分为三个逻辑子网络：

![Kaia Ecosystem and its Logical Subnetworks (CCN, ENN, SCN)](/img/learn/klaytn_network_overview.png)

1. **核心单元网络（CCN)**：由[核心单元（CC)](../nodes/core-cell)组成，负责交易验证、执行和区块创建。

2. **端点节点网络 (ENN)**：由[端点节点 (ENs)](../nodes/endpoint-node)组成，用于处理 RPC API 请求和服务链数据。

3. **[服务链](../nodes/service-chain)网络（SCN)**：由 dApps 独立运行的辅助区块链，通过 EN 与主链连接。

### 节点类型

![Kaia Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](/img/learn/klaytn_network_node.png)

1. **核心单元（CC）**：由一个共识节点 (CN) 和两个代理节点 (PN) 组成。

  - **共识节点（CN）**：参与区块生成。
  - **代理节点（PN）**：提供网络接口、传输交易请求和传播区块。

2. **端点节点 (EN)**：充当网络端点，处理 API 请求和数据处理。

3. **启动节点**：由 Kaia 运营的特殊节点，用于帮助新节点加入网络。

## 共识算法

Kaia 使用伊斯坦布尔 BFT 的优化版本，通过区块链特定的修改实现了实用拜占庭容错（PBFT）。 达成共识的过程包括

1. 使用可验证随机函数 (VRF) 选举委员会<LinkWithTooltip to="../misc/glossary#proposer" tooltip="A randomly chosen consensus node for block creation.">（提案人</LinkWithTooltip>和<LinkWithTooltip to="../misc/glossary#validator" tooltip="A node verifying data, ensuring efficient block processing.">验证人</LinkWithTooltip>）。
2. 由当选的提案人生成块。
3. 委员会核实并签署区块。

这种[共识机制](consensus-mechanism.md)使 Kaia 能够实现高性能，每秒可处理 4,000 笔交易，且交易即时完成。

## 区块生成和传播

- 区块以 1 秒间隔为目标，一轮一轮地生成。
- 提案人和委员会的遴选是随机的，但也是确定的。
- 区块链需要三分之二以上的委员会成员签名。
- 区块和事务的传播通道相互独立（多通道方法），可有效控制网络拥塞。

## Kaia 虚拟机（KVM）

Kaia 虚拟机（KVM）为智能合约的执行提供了一个强大的环境：

- 基于以太坊虚拟机（EVM）。
- 支持所有 EVM 操作码和额外的 Kaia 专用预编译合同。
- 与 Solidity 和以太坊开发工具（如 Remix、Hardhat、Foundry）兼容。
- 允许开发人员将以太坊智能合约移植到 Kaia 上，只需做极少的修改。

## 安全措施

Kaia 实施了多项安全措施：

- VRF 用于随机选择区块提议者，增加了过程的不可预测性。
- 将验证器密钥和奖励密钥分开，以防止验证器密钥被盗。
- 透明的区块验证过程，所有委员会成员都要验证提议区块上的签名。

## 互操作性

Kaia 设计用于与其他区块链网络无缝互动：

- <LinkWithTooltip tooltip="A blockchain that can run smart contracts and <br/> interact with the Ethereum Virtual Machine(EVM)">与 EVM 兼容</LinkWithTooltip>，可轻松部署以太坊智能合约。
- 设计用于与其他基于 EVM-SDK 的链进行互操作。
- 支持跨平台交易和智能合约执行。

## 代币经济

Kaia 的原生代币 [KAIA](./token-economics/kaia-native-token.md) 在区块链经济中发挥着核心作用：

- 每个新区块都会自动发行 KAIA 代币。
- 初始年通货膨胀率：5.2%.
- 区块奖励分配如下
  - CCO 和社区：50%（20% 区块创建者奖励，80% 押注奖励）
  - KEF（凯亚生态系统基金）：25%
  - KIF（凯亚基础设施基金）：25%

这种分销模式既能激励网络参与，又能支持 Kaia 生态系统的成长和发展。

## 管理

Kaia 实施了一套旨在实现公平和包容性的链上管理制度：

- 投票权与投入的 KAIA 代币数量成正比。
- 投票权上限可防止压制少数人的意见。
- 允许下放表决权。
- 所有治理建议都在链上记录，确保透明度。

## 可审计性和透明度

Kaia 将透明度和可审计性放在首位：

- 所有事务都提供了不可更改和可验证的状态变化历史。
- 区块链探索的两个主要工具：
  - [Kaiascan](http://kaiascan.io/)：Kaia 的官方区块浏览器，提供对区块、交易、地址、代币和智能合约的深入了解。
  - [OKX Kaia Explorer](https://web3.okx.com/explorer/kaia)：提供类似功能的另一种区块资源管理器。
- Square "投票平台披露所有费用和季度已知交易。

## 网络监控

为确保最佳性能和可靠性，Kaia 实施了以下措施：

- 管理网络拥塞的多通道方法。
- 对所有验证器进行专门的网络监控。
