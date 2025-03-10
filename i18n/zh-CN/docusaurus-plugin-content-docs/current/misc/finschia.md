# Finschia档案

本页面为现有 Finschia 用户（包括 FNSA 令牌持有者、DApp 构建者和节点操作员）提供信息存档。 由于 Finschia 与 Klaytn 整合形成了 Kaia，本资源现在作为有关 Finschia 的关键信息摘要和更广泛的 Kaia 文档的子集而存在。

## 关于Finschia

Finschia 是一个基于 Cosmos-SDK 的链，它迁移了前 LINE 区块链主网的状态，于 2022 年 12 月 22 日推出。

在 Klaytn [KGP-25](https://govforum.klaytn.foundation/t/kgp-25-klaytn-finschia-mainnet-merge/719) 和 Finschia [FGP-23](https://www.mintscan.io/finschia/proposals/23) 的链上提案获得批准之后，这两条链正在进行分阶段的技术整合。

FNSA 代币是 Finschia 主网的原生（基础）代币，在 Kaia 主网启动后，可通过 Kaia 门户网站将其转换（交换和桥接）为 KAIA 代币。 KAIA 是 Kaia 主网的原生币。

## Finschia规格

Finschia 同时运行 Mainnet 和 Testnet 环境，每个环境的规格如下：

| **类别** | **Finschia主网**                                                                                                                                                                                                                                                                                                                                         | **Ebony测试网**                                                                                                                                                                                                                                          |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 目的和用途  | FNSA 可间接或直接用于服务和 Finschia 治理的真实环境                                                                                                                                                                                                                                                                                                                      | 与 Finschia 主网规格相同的开发和测试环境                                                                                                                                                                                                                             |
| 共识算法   | Ostracon（PBFT + DPoS + VRF）                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                       |
| 链条 ID  | finschia-2                                                                                                                                                                                                                                                                                                                                             | ebony-2                                                                                                                                                                                                                                               |
| 地址前缀   | 链接                                                                                                                                                                                                                                                                                                                                                     | 链接                                                                                                                                                                                                                                                    |
| 基础代币   | **FNSA (FINSCHIA)**<br/>- 面值: cony<br/>- 小数位: 6 (1 FNSA = 10^6 cony)<br/>**KAIA**<br/>- 面值: kei<br/>- 小数位: 18 (1 KAIA = 10^18 kei)<br/>**交换率**<br/>- FNSA:KAIA = 1:148.079656 | **TFNSA**<br/>- 面值：tcony<br/>- 小数位：6（1 TFNSA = 10^6 tcony）<br/>**KAIA**<br/>- 面值：kei<br/>- 小数位：18（1 KAIA = 10^18 kei）<br/>**交换率**<br/>- TFNSA:KAIA = 1:148.079656<br/>- ebony测试网的 KAIA 是一种测试币，没有实际价值。 |
| 主要特点   | - 智能合约<br/>- 收集 (NFT)<br/>- 授权<br/>- 链上治理                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                       |
| 性能     | - 区块确认时间：约 3.3+ 秒<br/>- TPS（每秒交易次数）：1200                                                                                                                                                                                                                                                                                               |                                                                                                                                                                                                                                                       |

## Finschia 开发人员资源

有关Finschia的技术信息，请参阅以下链接。 该清单可根据需要进行更新。

如果您无法在这些链接中找到所需的信息，或需要更详细的信息，请联系 contact@kaia.io。

| **资料库**       | **链接**                                                                                                                     | **说明**                                 |
| :------------ | :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| 官方 Github 存储库 | https://github.com/Finschia/finschia                                                       | 介绍、安装、连接到主网/服务器网、与 Finschia 节点交互、端点信息  |
| 二进制版本         | https://github.com/Finschia/finschia/releases                                              | 最新或旧版本的 Finschia 二进制文件及发布说明            |
| Finschia-sdk  | https://github.com/Finschia/finschia-sdk                                                   | 基于 Finschia 的区块链构建框架，从 cosmos-sdk 分支而来 |
| 原型文件          | https://github.com/Finschia/finschia-sdk/blob/main/docs/core/proto-docs.md | Finschia 各模块的信息、查询、结构和参数               |
| Finschia-kt   | https://github.com/Finschia/finschia-kt                                                    | 用于 Finschia 的 Kotlin SDK               |
| Finschia-js   | https://github.com/Finschia/finschia-js                                                    | Finschia 的 Javascript SDK              |
| Ostracon      | https://github.com/Finschia/ostracon                                                       | Finschia 共识算法                          |