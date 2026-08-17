---
title: 与合同进行交互
sidebar_label: 合约交互
---

# 与合同进行交互

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月9日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 版 Safe Wallet 来管理您的账户。 您现有的“安全账户”将自动与“安全钱包”兼容。

:::

在本节中，您将使用Safe Wallet中管理的Safe账户，与Kairos上的一个简单合约进行交互。

**先决条件**

- 已为 [Kaia / Kairos](../../tutorials/connecting-metamask.mdx) 配置 [MetaMask](https://metamask.io/download/)
- [混音版](https://remix.ethereum.org/)（根据需要由 Kaia 网络提供支持）
- 从 [Faucet](https://faucet.kaia.io) 测试 KAIA
- Kairos 上的 Safe 账户（[创建一个](./use-kaia-safe.md#create-a-safe)）

**步骤 1：** 打开 [Remix](https://remix.ethereum.org/)。

**步骤 2：** 编译并部署一个示例存储合约（或您自己的合约）。

在从 Safe 中与合约进行交互之前，请先部署该合约。 一个典型的示例合约会暴露一个 `uint` 类型，你可以使用 `store` 对其进行写入，并使用 `retrieve` 对其进行读取。

![](/img/build/wallets/ks-succor-deploy.gif)

**第 3 步：** 在 Safe Wallet 中发起一笔新交易。

点击\*\*“新建交易”\*\*。 请输入已部署合约的地址和 ABI，以便选择方法和参数。

![](/img/build/wallets/ks-succor-init-tx.gif)

**第 4 步：** 审核并提交。 使用所有者钱包进行签名；一旦达到确认阈值，交易即执行。

![](/img/build/wallets/ks-succor-review-tx.gif)

您还可以使用 [交易构建器](./tx-builder.md) 批量调用合约，或通过 [API 工具包](./kaia-safe-api-kit.md) 以编程方式发起调用。
