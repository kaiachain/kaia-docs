---
title: 迁移至 Safe Global
sidebar_label: 迁移至 Safe Global
---

# 迁移至 Safe Global

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月9日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia 版 **Safe Wallet** 来管理您的账户。

:::

## 发生了什么变化？

Kaia 此前曾提供过 **Kaia Safe**（`safe.kaia.io`），这是 Gnosis Safe 的托管分支。

[Safe Global](https://app.safe.global) 现已原生支持 **Kaia 主网** 和 **Kairos 测试网**。 请通过 [app.safe.global](https://app.safe.global) 上的 Safe Wallet 在 Kaia 上创建和管理保险库——而非使用 Kaia 托管的用户界面。

## 这会影响我现有的Safe账户吗？

**不。** 您的 Safe 账户是 Kaia 上的智能合约。 迁移至 Safe Global 仅会更改 **Web 界面**，不会影响您的链上 Safe。

**未更改**

- 安全地址
- 所有者与确认阈值
- 资产（KAIA、代币、NFT）
- 链上交易记录

**您应更新的内容**

- 请使用 [app.safe.global](https://app.safe.global) 代替 `safe.kaia.io`
- 在 Safe Wallet 中选择 **Kaia 主网** 或 **Kairos 测试网**
- 更新仍指向 `safe.kaia.io` 的书签
- 如果希望在新界面中显示这些标签，可选择导出/导入本地 UI 数据（通讯录、昵称）

这一点已得到验证：当您连接所有者钱包并选择正确的网络（**Kaia** 或 **Kairos**）时，通过 Kaia Safe 创建的现有保险库会显示在 Safe Global 上。 您**无需**重新部署、重新创建或将资金转移到新的“保险箱”中。

## 如何在Safe Global上打开您现有的保险箱

1. 打开 [app.safe.global](https://app.safe.global)。
2. 连接一个作为您保险箱**所有者**的钱包（例如 Kaia Wallet 或 MetaMask）。
3. 请选择 **Kaia 主网** 或 **Kairos 测试网**。
4. 您的现有“保险箱”应会显示出来。 如果没有，请使用\*\*“添加现有安全区”\*\* / **“加载”**，粘贴安全区地址，并确认网络。

可选操作：在 `safe.kaia.io` 停止服务之前，请从旧版界面导出本地数据（通讯录和设置），并将其导入 Safe Wallet 的 **设置 → 数据** 部分，以便保留昵称及相关浏览器数据。 此项为可选操作，不会影响链上的所有权或余额。

## 快速解答

- **我需要创建一个新的“保险箱”吗？** 不需要。
- **我的资金或所有者会发生变化吗？** 不会。
- **我还能继续使用 `safe.kaia.io` 吗？** 只能使用到 **2026年8月9日**。 立即切换至 [app.safe.global](https://app.safe.global)。
- **哪里可以获得更多帮助？** [Safe Wallet 帮助中心](https://help.safe.global) 和 [常见问题](./faqs.md)。

## 下一步

- [在 Kaia 上使用 Safe 钱包](./use-safe-wallet.md) — 创建 Safe、添加资产并发起交易
- [Safe Wallet 概述](./overview.md) — 网络及 Safe Global 资源
- [常见问题解答](./faqs.md) — 更多关于账户管理的疑问
