# 使用 Kaia Safe

## 创建安全

在这里，您将了解到如何在 Kaia 网络上创建 Safe 并评估其益处。

**步骤 1：** 导航至 [Kaia Safe App](https://safe.kaia.io/)。 通过在网络浏览器上导航到应用程序，您可以探索 Kaia Safe 的功能。

**步骤 2：** 连接 [钱包](https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/)。 目前，Kaia Safe 支持多种钱包，如 [Kaia Wallet](https://docs.kaiawallet.io/)、[MetaMask](../../tutorials/connecting-metamask.mdx) 钱包等。

在本指南中，我们将使用 MetaMask。 请确保您的 MetaMask 钱包已添加 Kaia 网络（[Mainnet](../../tutorials/connecting-metamask.mdx#connect-to-kaia-network) 或 [Kairos Testnet](../../tutorials/connecting-metamask.mdx#connect-to-kaia-network)），以便成功连接。

![](/img/build/tools/kaia-safe/kaia-safe-connect-wallet.png)

**第 3 步：** 连接钱包后，点击**创建账户**，并为新保险箱命名。 这个名字与您的安全账户相连，安全账户是一个多签名钱包，可以保存和存储您的所有资金。

**第 4 步：** 输入有权提交和批准交易的地址，添加所有者/签名者。 您可以添加任意数量的签名者，也可以随时删除或替换任何签名者。

**第 5 步：** 选择安全账户交易需要多少次签名确认才能获得批准。 需要注意的是，我们的应用程序默认情况下只允许一个签名者确认。 但建议使用大于 1 的阈值，以确保账户安全可靠。 良好的做法是以业主总数的 51% 为界限，例如三分之二、五分之三等，如下图所示：

![](/img/build/tools/kaia-safe/kaia-safe-create-acct.gif)

**第 6 步：** 审查并部署安全系统

一旦您对 Safe 的所有参数完全满意，您就可以提交创建 Safe 账户，并按照屏幕上的说明完成账户创建。

![](/img/build/tools/kaia-safe/kaia-safe-create-review.gif)

恭喜您成功创建 Kaia Safe 账户！

## 增加资产

在本节中，您将了解如何将资产（KAIA、FT、NFT）添加到安全账户并确保资金安全。

### KAIA 存款

以下是将 **KAIA** 添加到您的安全账户的步骤

**步骤 1：** 从账户控制面板复制您的安全地址。

![](/img/build/tools/kaia-safe/ks-deposit-copy-addr.png)

**步骤 2：** 打开 Metamask 钱包，点击**发送**，将资产发送到您的安全账户。

请注意，将资产发送到 Safe 账户有不同的方法。 您可以通过 [硬件钱包](https://www.ledger.com/academy/crypto-hardware-wallet)、[网络钱包](https://medium.com/arcana-network-blog/why-web-wallets-e77c776e4d5e) 甚至智能合约发送。 在本例中，我们使用的是名为 MetaMask 的网络钱包。

![](/img/build/tools/kaia-safe/ks-token-send-btn.png)

**第 3 步：** 在搜索栏中输入您的安全地址，如下所示。

**步骤 4：** 输入**金额**，然后点击**下一步**。

![](/img/build/tools/kaia-safe/ks-token-send-details.png)

**第 5 步：** 确认交易并查看资产仪表板。 您可以看到从 metamask 账户转入 Kaia Safe 账户的金额。

![](/img/build/tools/kaia-safe/kaia-safe-klay-bal.png)

### KIP-7 存款

现在，我们来看看如何通过以下步骤将 KIP7（可替代代币）存入我们的保险箱。

**步骤 1：** 从账户控制面板复制您的安全地址。

![](/img/build/tools/kaia-safe/ks-deposit-ft-copy.png)

**步骤 2：** 打开 Metamask 钱包，导航至**资产**选项卡。

**第 3 步：** 选择您喜欢发送的令牌，然后点击**发送**。

![](/img/build/tools/kaia-safe/ks-ft-send-btn.png)

**步骤 4：** 重复上述**KAIA**存款的步骤**3**、**4**、**5**。

![](/img/build/tools/kaia-safe/ks-ft-send-details.png)

**第 5 步：** 查看您的资产仪表板，您可以看到 KIP7 代币正在转入您的安全账户。 同样，您也可以将任何 Fungible 代币转入您的安全账户。

![](/img/build/tools/kaia-safe/ks-ft-balance.png)

### KIP-17 (NFTs) 存款

现在，我们来看看如何按照以下步骤将 KIP17（不可兑换代币）存入我们的保险箱。

您可以通过多种方式将 NFT 转入您的安全账户。 下面是一个如何使用 [OpenSea](https://opensea.io/about) 将 NFT 转入安全账户的示例。

1. 导航至您的 [OpenSea 帐户](https://testnets.opensea.io/account) 资料页面
2. 导航至您喜欢转接的 NFT。 确保选择 Kaia 网络（主网或 Kairos）上的 NFT
3. 在下一页，点击传输按钮。
4. 将保险箱地址粘贴到文本框中，然后传输到保险箱
5. 在 Kaia Safe 的 "资产 "部分，您可以找到 OpenSea 的 NFT。

![](/img/build/tools/kaia-safe/kaia-safe-trf-nft.gif)

有关转移 NFT 的更多详情，请参阅 OpenSea 提供的 [指南](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea)。

## 发送资产

在本节中，您将学习如何从 Kaia Safe 账户发送 KAIA 和 KIP-7 令牌。

### 发送 KAIA 和 KIP7 令牌<a id="Send KAIA from Safe"></a>

**步骤 1：** 点击侧边菜单中的**新交易**按钮，选择**发送代币**，开始新的资产转移。

![](/img/build/tools/kaia-safe/kaia-safe-init-send-token.gif)

**第 2 步：** 选择要转移的资产。

- **KAIA**

> 注意：添加**收件人地址**和**要转账的 KAIA 金额**。

![](/img/build/tools/kaia-safe/kaia-safe-send-token-details.gif)

- **KIP-7令牌**

在资产下拉菜单中选择要发送的代币，如上图所示。

> 注意：添加**收件人地址**和**要转移的令牌数量**。

**第 3 步：** 审查并提交交易。 您需要用签名者钱包签署交易，一旦达到确认阈值，交易就会执行。

![](/img/build/tools/kaia-safe/kaia-safe-review-send-tokens.gif)

### 发送 NFT<a id="Send NFTs from Safe"></a>

在本节中，您将学习如何从 Kaia Safe 账户发送不可兑换的代币。

**步骤 1：** 单击侧菜单中的**新交易**按钮，选择**发送 NFT**，开始新的资产转账。

![](/img/build/tools/kaia-safe/kaia-safe-init-send-nft.gif)

**第 2 步：** 选择要转移的资产。

![](/img/build/tools/kaia-safe/kaia-safe-send-nft-details.gif)

**第 3 步：** 审查并提交交易。 您需要用签名者钱包签署交易，一旦达到确认阈值，交易就会执行。

![](/img/build/tools/kaia-safe/kaia-safe-review-send-nft.gif)

## 其他说明<a id="Points to Note"></a>

在使用 Kaia Safe 时，您需要注意以下事项：

### 交易费用<a id="Transaction Fees"></a>

Kaia Safe 交易，无论是资产转移还是合同互动，都会产生一笔费用，这笔费用将由执行交易的签名者（通常是达到所需签名门槛的最后一个签名者）支付。

### 安全 Nonce<a id="Safe Nonce"></a>

出于安全考虑，使用 Safe 进行的交易必须按顺序执行。 为此，我们为事务分配了一个名为 "**nonce**"的数字，以确保每个事务只能执行一次。

![](/img/build/tools/kaia-safe/ks-nounce.png)

在任何给定的时间内，只能执行nonce为_上一次执行的事务+1_的事务。 非ce 值较高的事务将排队等待执行。 因此，每当一个事务完成后，只要队列中的下一个事务积累了足够的签名，就可以执行。

![](/img/build/tools/kaia-safe/ks-pending-tx.png)

### 特定连锁店地址<a id="Chain-specific addresses"></a>

您可以选择复制带链前缀的地址

- 复制带链前缀的地址：

![](/img/build/tools/kaia-safe/ks-chain-spec-addr.png)

从仪表板复制安全地址粘贴到钱包时，如上图所示，您可以点击复选框选择是否添加链名。 建议您不要选中它，以避免出现以下错误。

![](/img/build/tools/kaia-safe/ks-chain-addr-err.png)