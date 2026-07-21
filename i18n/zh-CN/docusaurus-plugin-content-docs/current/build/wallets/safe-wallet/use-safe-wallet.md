---
title: 在 Kaia 上使用 Safe Wallet
sidebar_label: 创建和管理保险箱
---

# 在 Kaia 上使用 Safe Wallet

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月9日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 版 Safe Wallet 来管理您的账户。 您现有的“安全账户”将自动与“安全钱包”兼容。

:::

## 创建安全

以下是在 Kaia 上使用 Safe Wallet 创建 Safe 智能账户的方法。

**步骤 1：** 在浏览器中打开 [Safe Wallet](https://app.safe.global/welcome)。

![](/img/build/wallets/ks-welcome-page-sw.png)

**第 2 步：** 连接您的钱包。 Safe Wallet 支持 [Kaia Wallet](https://docs.kaiawallet.io/) 和 [MetaMask](../../tutorials/connecting-metamask.mdx) 等钱包。 请确保在您的钱包和 Safe Wallet 中均已选择 **Kaia 主网** 或 **Kairos 测试网**。

![](/img/build/wallets/ks-connect-wallet-sw.png)

**第 3 步：** 点击 **“创建账户”**（或类似选项），并为您的“保险箱”命名。

![](/img/build/wallets/ks-add-safe-name.png)

**第 4 步：** 输入有权提交和批准交易的地址，以添加所有者/签署人。 您可以根据需要添加任意数量的所有者，并可在以后进行更改。

**第 5 步：** 选择交易需要多少次所有者确认。 建议将阈值设为大于1。 一种常见的做法是约51%的业主同意（例如3人中有2人，或5人中有3人）。

![](/img/build/wallets/ks-add-signers-sw.png)

**第 6 步：** 检查参数，然后部署 Safe，并按照屏幕上的提示操作。

![](/img/build/wallets/ks-review-create-safe-sw.png)

**第 7 步：** 部署完成后，开始使用您的 Safe 并打开账户界面。

![](/img/build/wallets/ks-start-using-wallet-sw.png)

![](/img/build/wallets/ks-safe-ui-sw.png)

您的 Safe 账户已准备就绪。

## 增加资产

您可以通过向账户仪表盘中显示的“保险箱”地址发送 KAIA、可互换代币或 NFT 来为“保险箱”充值。

### KAIA 存款

1. 从账户仪表盘中复制您的 Safe 地址。
2. 从钱包（例如 MetaMask、硬件钱包或其他已充值的账户）向该地址发送 KAIA。
3. 转账确认后，余额将显示在 Safe Wallet 的 **资产** 栏目下。

您可以从任何能够向 Kaia 账户转账的地址向 Safe 充值。 有关在 MetaMask 中进行网络设置的说明，请参阅 [将 MetaMask 连接到 Kaia](../../tutorials/connecting-metamask.mdx)。

### 可替代代币存款

1. 复制您的Safe地址。
2. 在钱包的代币列表中，选择该代币并将其发送至 Safe 地址。
3. 在 Safe Wallet 的 **资产** 栏目中确认转账并核对余额。

### NFT 存款

从支持 Kaia（主网或 Kairos）的市场或钱包中，将 NFT 转入 Safe 地址。 例如，在 [OpenSea](https://opensea.io/) 上，打开该 NFT，选择“转账”，然后粘贴 Safe 的地址。 确认后，该 NFT 将显示在 Safe Wallet 的 **资产** / NFT 栏目下。 有关具体产品的操作步骤，请参阅 OpenSea 的 [转账指南](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea)。

## 发送资产

### 发送 KAIA 和代币

**步骤 1：** 点击 **新建交易**，然后选择 **发送代币**。

![](/img/build/wallets/ks-new-tx-sw.gif)

**步骤 2：** 选择资产，输入收款地址和金额。

![](/img/build/wallets/ks-send-details-sw.gif)

**第3步：** 审核并提交。 使用您的所有者钱包进行签名；一旦达到确认阈值，交易即会执行。

![](/img/build/wallets/ks-review-send-tx-sw.gif)

### 发送 NFT

1. 点击\*\*“新建交易”**，然后选择**“发送 NFT”\*\*（或在 Safe Wallet 中选择相应的 NFT 转账流程）。
2. 选择 NFT 和收件人。
3. 审核、收集所需签名并签署。

有关随时间变化的界面细节，请参阅 [Safe Wallet 帮助中心](https://help.safe.global)。

## 补充说明

### 交易手续费

安全交易（资产转移或合约交互）会产生网络手续费，该费用由**执行**该交易的所有者（通常是最后一位达到阈值的签名人）支付。

### 安全的随机数

出于安全考虑，安全交易必须按顺序执行。 每笔交易都有一个**nonce**。 只有非ce值为“_最后执行的+1_”的交易才能被执行；非ce值更大的交易将保持在队列中，直到较早的交易完成且收集到足够的签名为止。

### 链专属地址前缀

从仪表盘复制 Safe 地址时，如果目标钱包不支持链名前缀，请避免包含该前缀——直接粘贴纯地址以防止转账错误。

## 更多帮助

- [Safe Wallet 帮助中心](https://help.safe.global)
- [安全文档](https://docs.safe.global)
