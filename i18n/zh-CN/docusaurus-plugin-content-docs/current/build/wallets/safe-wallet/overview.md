---
title: Safe Wallet 概述
sidebar_label: Safe Wallet 概述
---

# Safe Wallet 概述

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月31日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia 版 **Safe Wallet** 来管理您的账户。 如果您已经拥有一个 Safe，请参阅 [迁移至 Safe Global](./migrate-to-safe-global.md)。

:::

[Safe Wallet](https://app.safe.global) 是 Safe Global 针对 [Safe 智能账户](https://docs.safe.global/home/what-is-safe) 推出的官方界面。 “安全智能账户”是一种智能合约钱包：它不再由单个私钥控制资金，而是需要一组签名人根据确认阈值批准每笔交易。 Kaia 主网和 Kairos 测试网均已上线——连接您的所有者钱包，选择网络，然后创建或打开一个保险箱。

## 关键概念

| 概念                                                                | 其含义                                                               |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| **签署人（所有者）**                                                      | 允许提出和确认交易的地址。 您可以随时在**设置**中添加、删除或替换它们。                            |
| **阈值**                                                            | 一笔交易需要多少个签名确认才能执行（例如 3 个中的 2 个）。 保持在1以上。                          |
| **[模块](https://docs.safe.global/advanced/smart-account-modules)** | 可选合同，用于扩展账户的功能——数据恢复、支出额度、自动化。 模块可以在未经签署人批准的情况下转移资金，因此请仅启用您信任的模块。 |
| **[守卫](https://docs.safe.global/advanced/smart-account-guards)**  | 可选合约会在每笔交易执行前后进行检查，从而允许您强制执行自定义规则。                                |
| **安全应用**                                                          | 嵌入到界面中的第三方应用，例如下文指南中使用的“交易生成器”和“CSV空投”。                           |

如需全面了解该账户在链上的运作原理，请阅读《Safe 智能账户如何运作？》(https://docs.safe.global/advanced/smart-account-overview)。

## 工作区

[工作区](https://safe.global/blog/introducing-workspace-the-onchain-operating-environment-for-treasury-teams) 是 Safe Global 为运行多个 Safe 的团队提供的环境。 它基于相同的智能合约运行——它改变的是团队的协调方式，而非交易的执行方式或密钥的持有者。

- **统一仪表盘** —— 该空间内所有账户的余额和待处理交易，一目了然。
- **[安全中心](https://safe.global/blog/workspace-security-hub)** — 每个账户的签名人、阈值、模块、保护机制、恢复选项和安全版本，以及针对其链上配置的自动检查。
- **共享通讯录** —— 整个团队共用一套带标签的地址列表，而不是每个浏览器各自的本地列表。
- **电子邮件登录** — 团队成员可以使用电子邮件一次性验证码或 Google 账号登录，无需持有钥匙即可查看余额、跟踪待处理交易并管理联系人。 签名仍需使用所有者钱包。

最后这一点对于Kaia平台上的财务、合规和运营审核人员非常有用，他们需要查看资金保险箱的相关信息，但绝不应成为该保险箱的签字人。

## Safe Global 文档

Safe Wallet、Safe Smart Account 合约、Safe Core SDK 以及后端服务均由 Safe Global 开发和维护，相关文档请参见 [docs.safe.global](https://docs.safe.global)。

Kaia 文档介绍了 Kaia 的具体内容：支持的网络、链 ID 以及常见任务的操作指南。 关于 Safe 本身的运作原理——包括合约版本、模块和守护程序的行为、API 模式、SDK 参考文档等——请参阅 Safe Global 的文档，该文档由 Safe 团队持续更新。

### 去哪里找

| 如果您想访问…                           | 前往                                                                                                                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 了解什么是“安全智能账户”                     | [什么是“安全”？](https://docs.safe.global/home/what-is-safe)                                                                            |
| 了解账户架构、模块和保护机制                    | [“安全智能账户”是如何运作的？](https://docs.safe.global/advanced/smart-account-overview)                                                       |
| 查询契约函数、事件和版本                      | [智能账户参考](https://docs.safe.global/reference-smart-account/overview)                                                               |
| 使用 Safe SDK 进行开发（入门包、协议、API、中继套件） | [SDK 概述](https://docs.safe.global/sdk/overview)                                                                                   |
| 通过 HTTP 进行查询安全、事务和签名              | [安全基础设施](https://docs.safe.global/core-api/api-overview) · [交易服务](https://docs.safe.global/core-api/transaction-service-overview) |
| 检查 Safe 服务支持哪些区块链                 | [支持的网络](https://docs.safe.global/advanced/smart-account-supported-networks)                                                       |
| 获取有关“Safe Wallet”应用本身的帮助          | [Safe 帮助中心](https://help.safe.global)                                                                                             |
| 澄清“Safe”的相关术语                     | [术语表](https://docs.safe.global/home/glossary)                                                                                     |

如果本站的某个页面与 Safe Global 的文档相比已过时，请参考 Safe Global 的文档并[提交问题](https://github.com/kaiachain/kaia-docs/issues)，以便我们更新 Kaia 页面。

## Kaia 网络

| 网络         | 链 ID |
| ---------- | ---- |
| Kaia 主网    | 8217 |
| Kairos 测试网 | 1001 |

在创建或打开账户之前，请先在 Safe Wallet 的链切换器中选择网络——当选择主网时，部署在 Kairos 上的 Safe 将无法显示。 在使用 [API 工具包](./safe-wallet-api-kit.md) 或其他 Safe SDK 工具时，请从 [Safe Global 支持的网络](https://docs.safe.global/advanced/smart-account-supported-networks) 中获取对应的链 ID 和交易服务端点，而不是硬编码一个。

## Kaia专属指南

- [迁移至 Safe Global](./migrate-to-safe-global.md) — 将现有的 Safe 迁移至 Safe Wallet
- [创建和管理保险库](./use-safe-wallet.md) — 在 Kaia 上创建保险库、添加资产、发送交易
- [合约交互](./contract-interaction.md) —— 从 Kaia 上的 Safe 调用合约
- [交易构建器](./tx-builder.md) 和 [CSV 空投](./csv-airdrop.md) — 在 Kaia 上进行批量处理
- [API 工具包](./safe-wallet-api-kit.md) — 基于 Kaia 链 ID 的安全交易服务
- [常见问题解答](./faqs.md)
