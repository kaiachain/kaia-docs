---
title: 在 Kaia 上使用 Safe Wallet
sidebar_label: 创建和管理保险箱
---

# 在 Kaia 上使用 Safe Wallet

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月31日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 版 Safe Wallet 来管理您的账户。 您现有的“安全账户”将自动与“安全钱包”兼容。

:::

## 创建安全

以下是在 Kaia 上使用 Safe Wallet 创建 Safe 智能账户的方法。

**步骤 1：** 在浏览器中打开 [Safe Wallet](https://app.safe.global/welcome)。 登录页面有两个标签页：**工作区**，供共同管理多个账户的团队使用；以及**我的账户**，用于显示您已连接的钱包所登录的“保险箱”。 若要创建一个“保险箱”，请留在\*\*“我的账户”\*\*页面。

:::tip

管理一个拥有多个“保险箱”和一支审核团队的资金池？ [工作区](./overview.md#workspace) 为那些需要查看信息但不应持有签名密钥的成员提供了共享仪表盘、共享通讯录以及电子邮件登录功能。 您可以先创建“保险箱”，稍后再将其整理到工作区中。

:::

![Safe Wallet 欢迎页面，当前选中“我的账户”标签页，显示“连接钱包”和“查看任意账户”](/img/build/wallets/sg-welcome-page.png)

**第 2 步：** 点击 **连接钱包**，然后选择 [MetaMask](../../tutorials/connecting-metamask.mdx)。 该对话框仅列出其检测到的钱包，因此，如果您未看到所需的钱包，请先安装该扩展程序——安装 [Kaia Wallet](https://docs.kaiawallet.io/) 的扩展程序后，它就会出现在此处。 请确保在您的钱包和 Safe Wallet 中均已选择 **Kaia 主网** 或 **Kairos 测试网**。

![“连接钱包”对话框中，MetaMask在可用钱包列表中被高亮显示](/img/build/wallets/sg-connect-wallet.png)

**第 3 步：** 点击 **“创建账户”**，为您的 Safe 命名，然后选择要部署它的网络——主网选择 **Kaia**，测试网选择 **Kairos**。 您可以稍后添加更多网络。 单击\*\*“下一步”\*\*。

![在“设置基础步骤”中输入“Safe”作为名称，并在“选择网络”下选中“Kairos”](/img/build/wallets/sg-add-safe-name.png)

**第 4 步：** 在 **签名人和确认** 部分，添加允许提议和批准交易的地址。 您已连接的钱包是 **签名人 1**；如需添加其他签名人，请点击 **添加新签名人**。 名称是可选的标签，用于供您自己参考。 您可以稍后更改签署人。

**第 5 步：** 设置 **阈值**——即交易执行前需要多少名签名人进行确认。 请选择大于1的数值。 一种常见的做法是约51%的签署人（例如3人中的2人，或5人中的3人）。 点击\*\*“下一步”\*\*。

![“签名人和确认”步骤，已添加三名签名人，且阈值设定为3人中至少2人同意](/img/build/wallets/sg-add-signers.png)

**第 6 步：** 检查网络、名称、签名人和阈值。 部署保险箱是一项链上交易，因此需要支付一笔以 KAIA 计价的一次性激活费——请确保您已连接的钱包中持有足够的 KAIA。 点击\*\*“创建账户”\*\*，然后在您的钱包中确认该交易。

![审核步骤图，显示了网络、名称、三位签名人、2/3的阈值以及KAIA中的预估激活费](/img/build/wallets/sg-review-create-safe.png)

**第 7 步：** 交易确认后，您的“保险箱”即刻启用。 对话框中显示了该地址——这是您用于接收资金的地址，与您的签名者钱包地址不同。 点击\*\*“开始吧”\*\*以开通账户。

![“您的账户已设置完成”对话框，显示Kairos上新的“安全”名称和地址](/img/build/wallets/sg-start-using-wallet.png)

账户打开后默认显示在**概览**页面，侧边栏包含**资产**、**交易**、**通讯录**、**应用**和**设置**。 保险箱初始为空——请使用**复制地址**功能，从另一个钱包向其中转入资金。

![显示余额为零的安全账户概览、"充值"提示以及侧边栏导航](/img/build/wallets/sg-safe-ui.png)

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

1. 复制您的Safe地址。
2. 在存放该 NFT 的钱包中，打开它并选择“转账”。
3. 将 Safe 地址粘贴进去，确认后，在 Safe Wallet 的 **资产** → **NFT** 栏目下进行验证。

在主网上，您还可以从支持 Kaia 的交易平台进行转账，例如 [OKX NFT 交易平台](https://web3.okx.com/nft)。 在 Kairos 上，请使用上方的钱包转账功能。

## 发送资产

### 发送 KAIA 和代币

**步骤 1：** 点击 **新建交易**，然后选择 **发送代币**。

<video autoPlay loop muted playsInline controls aria-label="Opening New transaction and choosing Send tokens" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-new-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-new-tx.mp4" type="video/mp4" /> </video>

**步骤 2：** 输入收款人地址，然后选择代币和金额——选择**MAX**将自动填入全部余额。 每笔交易最多可添加五位收款人。 单击\*\*“下一步”\*\*。

<video autoPlay loop muted playsInline controls aria-label="Send tokens form with the recipient address, token selector, and amount fields" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-send-details.webm" type="video/webm" /> <source src="/img/build/wallets/sg-send-details.mp4" type="video/mp4" /> </video>

**第 3 步：** 核对详细信息，点击 **签名**，然后在钱包中确认。 签名不会立即发送交易——该交易会保留在**交易**下的队列中，直到达到阈值，届时任何签名者均可执行该交易。

<video autoPlay loop muted playsInline controls aria-label="Reviewing and signing a send transaction, which then waits in the queue for the remaining confirmations" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-review-send-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-review-send-tx.mp4" type="video/mp4" /> </video>

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
