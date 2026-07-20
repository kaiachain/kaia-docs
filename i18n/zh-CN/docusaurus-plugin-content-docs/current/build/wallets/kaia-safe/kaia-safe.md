---
title: 安全钱包
sidebar_label: 安全钱包
---

# 安全钱包

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月9日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia 版 **Safe Wallet** 来管理您的账户。 您现有的 Safe 账户将自动与 Safe Wallet 兼容。

:::

## 引言

[Safe](https://safe.global)（Safe Global）为 EVM 网络提供符合行业标准的多签名智能合约账户解决方案。 **Safe Wallet** 是 Safe 推出的一款用于创建和管理此类账户的网页应用——可在 [app.safe.global](https://app.safe.global) 上使用。

Safe Wallet 支持 Kaia 主网和 Kairos 测试网。 连接一个所有者钱包，选择 **Kaia** 或 **Kairos**，然后创建或打开一个保险箱。

在 Kaia 的典型配置中，大多数用户最初都会使用单密钥钱包，例如 Kaia Wallet 或 MetaMask（外部拥有账户，即 EOA）。 这些账户依赖一组密钥，从而形成了单点故障——这不适合组织财务部门使用，例如在[Wintermute黑客事件](https://www.certik.com/resources/blog/uGiY0j3hwOzQOMcDPGoz9-wintermute-hack-)中，该组织就因此损失了1.625亿美元。

Safe Wallet 消除了这一单点故障：交易执行前，必须由多名所有者根据确认阈值进行签名。

关于产品行为、架构和 API，请参考 Safe 自身的文档：

- [什么是“安全”？](https://docs.safe.global/home/what-is-safe)
- [安全文档](https://docs.safe.global)
- [帮助中心](https://help.safe.global)

## 什么是多签名钱包？ <a id="What are Multisig Wallets"></a>

多签名钱包是一种数字钱包，它需要来自不同来源的两把、三把或更多把私钥，才能确认并执行加密货币交易。

例如，你可以把多签名钱包想象成一个带有三个锁的保险柜。 这三把钥匙分别由三个人保管，因此必须得到他们的共同同意才能打开它。

多签名钱包的主要优势：

- \*\*安全存储资产：\*\*企业和协议可以在无需依赖单一私钥，也无需担心任何单一主体未经授权转移资金的情况下存储资金。
- **实现去中心化决策：** 团队可以就执行哪些交易在链上做出决策。
- **共享控制：** 只有持有必要密钥的各方才能根据配置的阈值批准并执行交易。

## Kaia上的福利<a id="Benefits of Kaia Safe"></a>

- **存储和转账 KAIA 及代币：** 存入和转账原生 KAIA 以及可互换或不可互换代币（例如 ERC-20 / KIP-7 和 ERC-721 / KIP-17）。
- **所有者和阈值：** 配置多个所有者和确认阈值，以实现灵活、安全的控制。
- \*\*安全应用：\*\*通过批处理、合约调用及其他工作流相关应用扩展 Safe Wallet 的功能——例如，当 **Transaction Builder** 和基于 CSV 的空投应用在应用目录中可用时，即可使用这些应用。
- **交易与确认：** 根据您的阈值提出交易、收集签名并执行交易。
- \*\*账户恢复：\*\*如果丢失了一把密钥，符合阈值要求的剩余所有者仍可管理该账户（例如通过替换丢失密钥的所有者）。

在原由 Kaia 托管的 Safe UI 上创建的现有账户，仍可与 [app.safe.global](https://app.safe.global) 上的 Safe Wallet 兼容。

## 下一步

- [在 Kaia 上使用 Safe 钱包](./use-kaia-safe.md) — 创建 Safe、添加资产并发起交易
- [概述](./overview.md) — 网络、迁移说明以及 Safe Global 资源
