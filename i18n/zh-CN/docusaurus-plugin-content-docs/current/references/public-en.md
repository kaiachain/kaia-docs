# 公共 JSON RPC 端点

公开暴露的 JSON-RPC 端点允许您测试和运行您的区块链产品，提供与 Kaia 网络的交互，而无需运行自己的节点。

运行自己的 Kaia 端点节点 (EN) 并不简单，它需要专业技术、监控和计算资源。 它需要维护存储、网络带宽，还需要占用工程时间和资源；节点必须保持更新，并定期进行健康检查。

因此，使用现有公共 EN 的主要好处是，它可以让您只专注于构建和测试您的区块链产品，而无需分心维护与 Kaia 网络连接和交互的基础设施。

## 注意事项

- 节点提供商不对因流量或与节点的交互而造成的任何损害或损失负责。
- 如果流量集中在某些节点上，您可能会遇到服务延迟。
- 为防止请求过多，可能会对每个节点实行费率限制，费率限制如有变更，恕不另行通知。

## 公共 JSON-RPC 端点

以下是 Kaia 公共节点提供商提供的网络域列表。

:::info[Outdated 终端停止工作]

请注意，以下网址已于 2024 年 9 月底停止使用。 我们建议您相应更新配置，以确保服务不中断：

**主网**

- `https://public-en-cypress.klaytn.net` (由 `https://public-en.node.kaia.io` 代替)
- `https://archive-en.cypress.klaytn.net` (由 `https://archive-en.node.kaia.io` 代替)

**测试网**

- `https://public-en-baobab.klaytn.net` (由 `https://public-en-kairos.node.kaia.io` 代替)
- `https://archive-en.baobab.klaytn.net` (由 `https://archive-en-kairos.node.kaia.io` 代替)

:::

### 主网公共 JSON-RPC 端点

请记住，这些端点是提供给社区用于测试和开发目的的。
由于我们无法保证端点的正常运行时间和稳定性，因此请勿将其用于商业目的。

**HTTPS**

| 服务提供商                                   | 终点                                                                                          | 命名空间              | 类型 |
| --------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------- | -- |
| [凯亚基金会](https://www.kaia.io)            | `https://public-en.node.kaia.io`                                                            | kaia,klay,eth,net | 全部 |
|                                         | `https://archive-en.node.kaia.io`                                                           | kaia,klay,eth,net | 档案 |
| [QuickNode](https://quicknode.com/)     | `https://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/`                                  | kaia,klay,eth,net | 全部 |
| [BlockPI Network](https://blockpi.io/)  | `https://kaia.blockpi.network/v1/rpc/public`                                                | kaia,klay,eth,net | 全部 |
| [OnFinality](https://onfinality.io/)    | `https://klaytn.api.onfinality.io/public`                                                   | kaia,klay,eth,net | 全部 |
| [Pokt Network](https://pokt.network/)   | `https://kaia-mainnet.rpc.grove.city/v1/803ceedf`                                           | kaia,klay,eth,net | 全部 |
| [GetBlock](https://getblock.io/)        | `https://go.getblock.io/d7094dbd80ab474ba7042603fe912332`                                   | kaia,klay,eth,net | 全部 |
| [dRPC](https://drpc.org/)               | `https://klaytn.drpc.org`                                                                   | kaia,klay,eth,net | 全部 |
| [Nirvana Labs](https://nirvanalabs.io/) | `https://kaia.nirvanalabs.xyz/kaiaennode-499hw?apikey=2b4f3ffc4668c6df22c8b09e8dab80ff5eb2` | kaia,klay,eth,net | 档案 |

**WebSocket**

| 服务提供商                                | 终点                                                                                                                         | 命名空间              | 类型 |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ----------------- | -- |
| [Kaia基金会](https://www.kaia.io)       | wss://public-en.node.kaia.io/ws                            | kaia,klay,eth,net | 全部 |
|                                      | wss://archive-en.node.kaia.io/ws                           | kaia,klay,eth,net | 档案 |
| [QuickNode](https://quicknode.com/)  | wss://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/\`\` | kaia,klay,eth,net | 全部 |
| [OnFinality](https://onfinality.io/) | wss://klaytn.api.onfinality.io/public-ws                   | kaia,klay,eth,net | 全部 |
| [dRPC](https://drpc.org/)            | wss://klaytn.drpc.org                                                      | kaia,klay,eth,net | 全部 |

### Testnet（Kairos）公共 JSON-RPC 端点

**HTTPS**

| 服务提供商                                  | 终点                                                           | 命名空间              | 类型 |
| -------------------------------------- | ------------------------------------------------------------ | ----------------- | -- |
| [Kaia基金会](https://www.kaia.io)         | `https://public-en-kairos.node.kaia.io`                      | kaia,klay,eth,net | 全部 |
|                                        | `https://archive-en-kairos.node.kaia.io/`                    | kaia,klay,eth,net | 档案 |
| [QuickNode](https://quicknode.com/)    | `https://responsive-green-emerald.kaia-kairos.quiknode.pro/` | kaia,klay,eth,net | 全部 |
| [BlockPI Network](https://blockpi.io/) | `https://kaia-kairos.blockpi.network/v1/rpc/public`          | kaia,klay,eth,net | 全部 |

**WebSocket**

| 服务提供商                               | 终点                                                                                                                           | 命名空间              | 类型 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------- | -- |
| [Kaia基金会](https://www.kaia.io)      | wss://public-en-kairos.node.kaia.io/ws                       | kaia,klay,eth,net | 全部 |
|                                     | `wss://archive-en-kairos.node.kaia.io/ws`.                                                                   | kaia,klay,eth,net | 档案 |
| [QuickNode](https://quicknode.com/) | wss://responsive-green-emerald.kaia-kairos.quiknode.pro/\`\` | kaia,klay,eth,net | 全部 |

## RPC 服务提供商

以下是 Kaia 的公共节点提供商列表。

### Kaia API 服务 (KAS)

KAS 提供各种应用程序接口，以支持更简单、更快速的区块链应用程序开发。 您可以大大缩短开发时间，运行稳定的服务，并节约成本。

#### 特点

- 免费计划每天 10,000 次请求（每秒 100 次请求
- 为免费计划提供社区支持，为付费计划（Starter、Pro 和 Pro Plus）提供票务支持
- Kaia 节点应用程序接口、令牌历史应用程序接口、钱包应用程序接口、锚应用程序接口、KIP-7、17、37 应用程序接口和元数据应用程序接口

#### 参考资料

- [文件](https://www.klaytnapi.com/en/resource/docs/readme)
- [订阅](https://www.klaytnapi.com/en/landing/pricings)
- [Website](https://www.klaytnapi.com/en/landing/main)

### 链式堆栈

[Chainstack](https://chainstack.com/) 是领先的 Web3 基础设施提供商，为 Kaia 提供免费和付费终端。 免费开发者计划的起始条件为每月 300 万次请求和每秒 25 次请求 (RPS)。 您可以轻松扩展付费计划。

要开始使用免费的开发者计划端点，只需使用电子邮件或任何社交账户（如 GitHub 或 X (Twitter)）注册即可。

#### 特点

- 支持免费开发人员计划
- 支持扩展到付费计划
- 支持现收现付
- 支持 25+ 个博克链
- 正常运行时间 99.9%+
- 负载平衡
- 无限可扩展性
- 使用社交账户注册
- 使用加密货币充值，包括 Kaia 代币
- 通过 Telegram、电子邮件和丰富的文档等提供支持
- 与我们的 Web3 专职文案撰稿人分享客户故事

#### 参考资料

- [Docs](https://chainstack.com/build-better-with-kaia/)
- [订阅](https://chainstack.com/pricing/)
- [Website](https://chainstack.com/)

### All That Node

All That Node 的目标是成为 Web3 基础设施的可靠网关，让构建者不再为区块链网络问题所困扰。 All That Node 保证以最低的延迟性能快速、稳健地连接 RPC 节点。

#### 特点

- 生态系统的公共节点和水龙头
- 如果您需要更多，可支持 "即用即付 "计划
- 专用节点
- 支持 24+ 种区块链
- 现有档案数据
- 可用的 Websocket API
- 提供跟踪/调试 API
- 正常运行时间 99.9%+
- 实施负载平衡
- 无限可扩展性
- Discord 社区提供全天候支持

#### 参考资料

- [文件](https://docs.allthatnode.com/)
- [订阅](https://www.allthatnode.com/pricing.dsrv)
- [Website](https://www.allthatnode.com/main.dsrv)

### Tatum

Tatum 是构建、测试和运行区块链应用程序的最快方式。 我们为开发人员提供最灵活的平台，让他们快速将区块链创意变为现实。

#### 特点

- 免费计划每秒 5 个请求，付费计划（开始、基本）每秒 200 个请求
- 社区支持

#### 参考资料

- [Docs](https://apidoc.tatum.io/tag/Kaia?_gl=1*1dhfv8u*_ga*MzY5NDMyNzg5LjE2NDQ1NTk1MzA.*_ga_BH6F6RKJW6*MTY2MjAxNDQ0OS4xNy4xLjE2NjIwMTQ2MTQuMjQuMC4w)
- [定价](https://tatum.io/pricing)
- [Website](https://tatum.io/)

### BlockPI

BlockPI Network旨在提供优质、稳健和高效的RPC服务。 为了避免单点故障和可扩展性的限制，网络被设计成分布式结构，具有可扩展的 RPC 节点。

BlockPI 为 Kaia 社区提供免费的公共端点，并为付费用户提供高级功能。  BlockPI 设计了两种付费套餐，并支持 "即用即付"，以满足用户的灵活需求。 您可以查看每个套餐的定价详情 (https://docs.blockpi.io/documentations/pricing) 以及 Kaia 的单项方法费用 (https://docs.blockpi.io/documentations/request-unit-ru)

#### 特点

- 免费服务每秒 20 个请求，付费套餐无限制。
- 选择 Kaia 存档节点和终端节点
- 端点节点可列入白名单
- WSS 可用，即将订阅
- 支持跟踪

#### 参考资料

- [文件](https://docs.blockpi.io/)
- [订阅](https://dashboard.blockpi.io/wallet/overview)
- [Website](https://blockpi.io/)

### Pocket Network

Pocket Network 是 Web3 节点基础设施的 TCP/IP - 一种多链中继协议，可激励 RPC 节点为 DApp 及其用户提供势不可挡的 Web3 访问。

Pocket 支持数十种区块链，而且还在不断增加。

#### 特点

- 去中心化 RPC 协议和市场
- 每天 250,000 次请求 免费级别（最多两个应用程序，端点数量不限）
- 公共端点
- 付费计划（如果您每天需要超过 250,000 个请求）
- 支持 30 多种区块链
- 25,000 + 个节点为应用程序提供 POKT 服务
- 支持存档节点、带跟踪功能的存档节点和测试网络节点
- 无单点故障
- 零停机时间
- 低成本高效益的近零代币经济（用一次 POKT 换取网络带宽）
- 无需每月支付沉没成本，将基础设施转化为资产
- 协议内置负载平衡功能
- 无限扩展每天的请求数和每小时的节点数
- 最私密、抗审查的选择
- 开发人员实践支持

#### 参考资料

- [文件](https://docs.pokt.network/api-docs/klaytn-evm/#/)
- [Website](https://docs.pokt.network/)
- [掌上门户](https://bit.ly/ETHorg_POKTportal) 仪表板和分析

### ANKR

Ankr 的分布式节点网络产生了强大的协同效应，使开发人员能够轻松、安全地连接到公共端点。 通过优化资源使用的微调缓存，Ankr 保证了快速 RPC 请求和低延迟性能，从而在构建去中心化应用程序时实现卓越的效率。

#### 特点

- 免费计划每秒 500 个请求，高级计划每秒 1 500 个请求。 可根据要求进行升级。
- 免费计划有 Discord 和支持门户，高级计划有专门的支持。
- 高级计划可使用 WebSocket。

#### 参考资料

- [文件](https://www.ankr.com/docs/build-blockchain/overview)
- [订阅](https://www.ankr.com/rpc/pricing/)
- [Website](https://www.ankr.com/rpc/)

### NodeReal

NodeReal 是一家区块链基础设施和服务提供商。 NodeReal 以最可靠的解决方案帮助开发人员和投资者探索区块链。

#### 特点

- 免费层级，3 个 API 密钥，每月 3.5 亿计算单位（CU），每月 300 计算单位/秒（CUPS），存档数据
- 增长级、15 个 API 密钥、每月 5 亿计算单位（CU）、每月 700 计算单位/秒（CUPS）、归档数据、调试和跟踪 API
- 企业层级、自定义 API 密钥数量、自定义每月使用量、专用支持、服务级别协议（SLA）和其他要求
- 每秒 50 次查询 (QPS)/方法

#### 参考资料

- [文件](https://docs.nodereal.io/docs/getting-started)
- [订阅](https://nodereal.io/api-marketplace/klaytn-rpc)
- [Website](https://nodereal.io)

### Nodit

Nodit 旨在提供企业级 Web3 基础设施，供所有人使用。 通过以合理的价格提供正常运行时间达 99.9% 的强大节点基础设施和可靠的可随时查询的区块链数据，我们为开发人员进入 Web3 世界提供了便利。

#### 特点

- Kaia Testnet 的官方龙头 [https://kaiafaucet.com](https://kaiafaucet.com)
- 99.9%+ 正常运行时间
- 免费访问 Datasquare 中的索引存档数据 - 支持仪表板和 SQL
- 数据管道集成支持
- 高级开发人员层支持自动缩放
- 100+ 个用于 NFT、令牌、统计等的 Web3 数据应用程序接口
- 提供 Webhook 和流（WebSocket）
- 专用节点
- 每月 350,000,000 个计算单元 (CU)（免费级别
- 日志监控仪表板

#### 参考资料

- [Website](https://nodit.io)
- [Datasquare网站](https://datasquare.nodit.io)
- [文件](https://developer.nodit.io)
- [博客](https://blog.nodit.io)

### GetBlock

GetBlock 为包括 Kaia 在内的 50 多个主要区块链网络的完整 RPC 节点提供快速、可靠的 API 访问。 通过处理节点维护，GetBlock 使开发人员和企业能够专注于构建 dApp 和区块链解决方案，而无需为基础设施头疼。

#### 特点

- 每天有 40k 个免费试用请求，RPS 高达 60。 它还提供入门计划和无限计划，以获得更好的性能和支持。
- 99.9%+ 正常运行时间
- 免费访问 50 多个带有 RPC 节点的区块链协议
- 高级监控和统计
- 专用节点

#### 参考资料

- [Website](https://getblock.io/)
- [文件](https://getblock.io/docs/getblock-explorer/get-started/)

### QuickNode

Quicknode 提供区块链基础设施，为安全的去中心化创新提供动力。 他们提供构建者创建令人难以置信的产品所需的所有工具和资源，所有这些都有无与伦比的全球平衡基础设施、有保障的可靠性和安全性、用户友好的界面以及端到端的客户支持作为后盾。

#### 特点

- 免费计划的请求次数为 15 次/秒，API 点数为 1000 万。
- 提供商启动计划、成长计划和业务计划，可获得更多积分和 IPFS 存储空间。
- 经过实战检验的 RPC 和 API 基础设施可提供大规模的性能和可靠性。
- 拥有数十种附加组件，让构建超级强大的 dApps 变得前所未有的简单。
- 提供流，最强大的实时数据管道。
- 活动警报。

#### 参考资料

- [Website](https://www.quicknode.com/)
- [文件](https://www.quicknode.com/docs/welcome)

### dRPC

为 Kaia、Ethereum、Polygon、Arbitrum 等提供去中心化 RPC 节点。 您值得信赖的 Web3 基础设施合作伙伴。

#### 特点

- 一般支持的公共节点无申请限制。
- 高性能节点还可选择增长计划和企业计划。
- 跨越 100 多个网络的 90 多个区块链
- 人工智能驱动的负载平衡器
- 富有洞察力的分析。

#### 参考资料

- [网站](https://drpc.org/)
- [文档](https://drpc.org/docs)

## 实用资源

- 钱包[Kaia Wallet](../build/tools/wallets/kaia-wallet.md)是 Kaia 网络的浏览器扩展钱包。

- Faucet：您可以从 [KAIA Faucet](https://faucet.kaia.io)获取用于 Kairos 测试网络的测试 KAIA。

- 资源管理器：[Kaiascope](../build/tools/block-explorers/kaiascope.md)是 Kaia 网络的区块资源管理器。

- ChainID : Kairos: 1001 (0x3E9), Mainnet：8217 (0x2019)

- Gas价格：在 [25, 750] 范围内动态调整。 该范围可通过链上管理进行更改。 更多信息，请参阅 [治理](https://docs.kaia.io/references/json-rpc/governance/chain-config/) 和
  [交易费用](../learn/transaction-fees/transaction-fees.md)
