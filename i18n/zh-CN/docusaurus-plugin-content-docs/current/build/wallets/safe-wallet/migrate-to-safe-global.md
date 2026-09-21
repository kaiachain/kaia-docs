---
title: 迁移至 Safe Global
sidebar_label: 迁移至 Safe Global
---

# 迁移至 Safe Global

Kaia 此前运营过 **Kaia Safe**（`safe.kaia.io`），这是一个基于 Gnosis Safe 的托管分支。该界面已于**2026年8月31日**停用，目前已无法使用。

[Safe Global](https://app.safe.global) 原生支持 Kaia 主网和 Kairos 测试网。通过 [app.safe.global](https://app.safe.global) 上的 Safe Wallet，在 Kaia 上创建和管理保险库。

## 您现有的Safe账户不受影响

“Your Safe” 是 Kaia 上的一个智能合约。停用由 Kaia 托管的界面仅更改了 **Web 前端**，并未影响您的链上账户。

未更改：

- 安全地址
- 所有者与确认阈值
- 资产（KAIA、代币、NFT）
- 链上交易记录

您**无需**重新部署、重新创建或将资金转移到新的“保险箱”中。通过 Kaia Safe 创建的保险库，一旦您连接了所有者钱包，就会立即显示在 Safe Global 上。

## 在 Safe Global 上打开您现有的保险箱

1. 打开 [app.safe.global](https://app.safe.global)。
2. 连接一个作为您保险箱**所有者**的钱包（例如 Kaia Wallet 或 MetaMask）。
3. 此时应会显示您的保险箱，上面标有其所属网络（**Kaia** 或 **Kairos**）。如果没有，请访问 [app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts)，点击 **管理列表**，查看与您已连接的钱包关联的 Safes。

## 通讯录标签

通讯录——即您为地址保存的名称和标签——存储在`safe.kaia.io`界面的本地，而非链上，这也是唯一没有自动迁移的内容。由于该界面已停用，保存的标签无法再导出，需要在“Safe Wallet”的**地址簿**中重新输入。

这仅影响标签。资产所有权、余额和交易记录均存储在链上，且不受影响。

## 下一步

- [在 Kaia 上使用 Safe 钱包](./use-safe-wallet.md) — 创建 Safe、添加资产并发起交易
- [Safe Wallet 概述](./overview.md) — 网络及 Safe Global 资源
- [常见问题解答](./faqs.md) — 更多关于账户管理的疑问
- [Safe Wallet 帮助中心](https://help.safe.global) — 关于 Safe Wallet 应用本身的帮助
