# Kaia Chain 上的安全钱包管理：开发人员食谱

## 导言<a id="introduction"></a>

### 食谱适用人群<a id="who-is-this-cookbook-for"></a>

欢迎使用 Kaia 安全钱包 Cookbook。 本指南面向在 Kaia 区块链上进行构建的开发人员、工程师和团队。 无论您是创建第一个去中心化应用程序（dApp）、部署自动化服务，还是管理财务，这本烹饪书都为您提供了以安全第一的心态处理加密密钥和钱包的基本方法。

### 如何使用这本食谱<a id="how-to-use-this-cookbook"></a>

这本烹饪书遵循循序渐进的学习路径：

- **[第 1 部分](create-and-manage-wallets-securely.md#part-1-foundational-concepts--security-principles)** 确立你需要了解的安全基础知识。
- **[第 2 部分](./create-and-manage-wallets-securely.md#part-2-practical-recipes-for-wallet-management)** 提供从基础到高级场景的实践配方。

每个食谱都以前面章节的概念为基础。 Web3 安全新手？ 从 [Chapter 1](./create-and-manage-wallets-securely.md#chapter-1-the-principles-of-private-key-security) 开始。 经验丰富的开发人员？ 跳转到符合您使用情况的食谱

### 核心理念：安全第一<a id="core-philosophy-security-first"></a>

在 Web3 中，"不是你的密钥，不是你的密码 "是一个基本真理。 对于开发人员来说，这涉及到软件开发生命周期的每一个环节。 一个密钥的泄露就会给用户和项目带来灾难性的损失。 本指南的核心理念是**安全第一**。 每一个配方和建议都旨在帮助您构建稳健、安全的默认系统，最大限度地减少攻击面，从第一天起就保护资产。

### 先决条件 <a id="prerequisites"></a>

要充分利用本烹饪手册，您应该对区块链概念（如公/私钥、交易、燃气费）有基本的了解，并能自如地使用命令行界面。

## 第 1 部分：基础概念和安全原则 <a id="part-i-foundational-concept-and-security-principles"></a>

这部分主要介绍安全钱包管理背后的\*原因。 在编写任何代码之前，它将为您提供所需的核心知识。

### 第 1 章：私人密钥安全原理<a id="chapter-1-the-principles-of-private-key-security"></a>

#### 1.1. 了解关键对：账户的核心 <a id="understanding-key-pairs-the-heart-of-your-account"></a>

在 Kaia 上，与其他兼容 EVM 的连锁店一样，您的账户不是用户名和密码。 它是一对加密密钥：一个 \*\* 公钥\*\* 和一个 \*\* 私钥\*\*。 公开密钥生成你的公开地址，就像你的银行账号一样，可以安全共享。 私钥是授权账户所有操作（如签署交易或信息）的秘密。 这是需要保护的最关键信息。 任何拥有您私人密钥的人都可以完全、不可逆转地控制您的账户及其资产。

#### 1.2. 安全密钥生成：Kaia 的最佳实践 <a id="secure-key-generation-best-practices-for-kaia"></a>

安全密钥是随机生成的。 您账户的安全性取决于数学上是否有人能猜出您的私人密钥。 请务必使用经过严格审核的标准加密库生成密钥，例如内嵌在 `ethers-ext` 中的加密库或本指南中讨论的工具。 切勿试图自己创建 "聪明 "或 "人类可读 "的私人密钥，因为这会大大降低其随机性，使其容易被猜测。

#### 1.3. 安全密钥存储：从本地密钥库到生产库 <a id="secure-key-storage-from-local-keystores-to-prodduction-vaults"></a>

如何存储私钥与如何生成私钥同样重要。 将私人密钥存储在明文文件中，就相当于把银行密码写在便条上，然后贴在显示器上。

:::warning
**警告：切勿以明文** `.env`文件存储私人密钥。 .env文件虽然方便开发，但经常会被错误地提交到版本控制中，从而公开暴露密钥，导致资金立即被盗。
:::

安全本地存储的标准是**加密的密钥存储文件**（有时称为 JSON 密钥存储）。 该文件包含你的私人密钥，但它是用你选择的强密码加密的。 要使用密钥，必须提供密钥存储文件和密码，以便在内存中解密。 对于生产系统，最佳做法是使用专用的**密钥管理器**，如 AWS KMS 或 Google Cloud KMS，以确保密钥不会直接暴露给应用程序代码。

#### 1.4. 处理内存中的密钥尽量减少运行时的暴露 <a id="handling-keys-in-memory-minimizing-exposure-during-runtime"></a>

即使从安全源加载，应用程序内存中也必须有私人密钥才能签署事务。 尽量减少这种暴露至关重要。 良好的应用设计可确保密钥在内存中保留的时间尽可能短，并在使用后立即清除。 本食谱中的图书馆和食谱就是遵循这一原则设计的。

### 第 2 章：Kaia 钱包生态系统导航 <a id="chapter-2-navigating-the-kaia-wallet-ecosystem"></a>

#### 2.1. Kaia 钱包

[Kaia Wallet](https://docs.kaia.io/build/tools/wallets/kaia-wallet) 是 Kaia 生态系统的原生浏览器扩展钱包。 虽然它与 MetaMask 有许多相同的功能，但它针对 Kaia 进行了优化，支持独特的交易类型、费用委托交易和网络特有的账户系统，并在网络上提供无缝的用户体验。 对于开发人员来说，了解其特定行为和应用程序接口是建立流畅的 dApp 集成的关键。

#### 2.2. 冷存储：硬件钱包概述

冷存储是指将私人密钥保存在未连接互联网的设备上。 硬件钱包\*\*是为此目的而制造的物理设备。 它在内部对交易进行签名，而不会将私钥暴露给连接的计算机。 这使它们成为保护高价值资产的黄金标准。 本指南将重点介绍官方支持的 [DCENT](https://docs.kaia.io/build/tools/wallets/hardware-wallets/dcent) 和 [SafePal](https://docs.kaia.io/build/tools/wallets/hardware-wallets/safepal-s1) 硬件钱包。

#### 2.3. 多重签名钱包：Kaia Safe 简介

多重签名（或 "多重签名"）钱包是一种智能合约，需要多个私钥批准才能执行交易。 例如，"2-of-3 multi-sig "需要获得三个指定所有人中两个人的批准。 这是管理团队资金、金库和重要智能合约管理的标准，因为它可以防止单点故障。 [Kaia Safe](https://docs.kaia.io/build/tools/wallets/kaia-safe/use-kaia-safe) 是 Kaia 网络上的主要多重签名解决方案。

## 第 2 部分：钱包管理实用食谱

现在，您已经理解了 [第 1 部分](./create-and-manage-wallets-securely.md#part-1-foundational-concepts--security-principles) 中的基本安全原则，是时候将它们付诸实践了。 本节为实际应用场景提供分步指南，从单个开发设置开始，逐步过渡到生产级解决方案。

**您将建设的内容：**\*

- Foundry 和 Hardhat 的安全开发环境
- 多签名财务设置促进团队协作
- dApp 与各种钱包类型的集成

### 第 3 章：个人开发者和 dApp 的设置

本章提供在开发过程中设置和管理钱包的实践指南，从第一行代码开始就强调安全性。

#### 3.1. 配方：您的第一个 Kaia 开发钱包

如果您是 Kaia 的新用户或第一次设置 Kaia 钱包，我们建议您参考[开始使用钱包](./configure-wallet-for-kaia-networks.mdx#configure-kaia-wallet-for-kaia) 部分。 它包括安装钱包、安全创建和备份账户、添加其他账户以及为钱包充值等基本步骤。

#### 3.2. 配方：安全管理 Foundry 项目中的账户

使用 [Foundry](https://book.getfoundry.sh)，可以通过 [cast wallet](https://getfoundry.sh/cast/reference/cast-wallet-import) CLI 导入加密钱包。 虽然目前还不能对 RPC URL 等其他值进行加密，但将加密密钥与环境变量相结合仍能提供安全的设置。

##### 步骤 1：安装并初始化 Foundry

如果尚未安装 foundry，请在终端运行以下命令：

```bash
curl -L https://foundry.paradigm.xyz | bash
```

然后，运行以下命令初始化 Foundry 项目：

```bash
foundryup
forge init foundry-encrypted
cd foundry-encrypted
```

现在你应该有一个包含 foundry 默认模板的文件夹了。

##### 第 2 步：导入钱包

您可以使用 Cast wallet CLI 导入钱包。 只需将 **your-wallet-name** 替换为所需的钱包名称，然后执行以下命令即可：

```bash
cast wallet import your-wallet-name --interactive
```

输入私人密钥后，系统会提示您设置加密密码。 加密密钥保存在本地密钥库中，默认路径为 **~/.foundry/keystore** 。

:::note
交互式标记用于防止私钥保存在终端历史记录中。
:::

![](/img/build/wallets/foundry-cast-interactive.png)

##### 第 3 步：创建环境文件并将其作为源文件

加密钱包后，您需要安全地存储 RPC 端点。 Foundry 目前尚未为 RPC URL 等值提供加密功能，因此使用 .env 文件是此类密文值的常见且更安全的选择。

在项目根目录下创建一个 `.env` 文件，并添加您的 `KAIROS_RPC_URL`：

```js
KAIROS_RPC_URL=https://responsive-green-emerald.kaia-kairos.quiknode.pro
```

并在运行脚本前加载它：

```bash
source .env
```

###### 步骤 4：运行脚本

我们完成了钱包导入，并在配置中添加了 RPC 端点。 现在，我们可以运行脚本并部署合同了。

默认 Foundry 模板包含一个部署 Counter 合同的示例脚本。 您应修改此脚本，使用自己的钱包名称和 RPC 端点。

使用 _forge create_ 或 _forge script_ 运行脚本时、

- 终端将提示您输入用于加密私人密钥的密码。
- 输入密码后，foundry 将运行脚本并部署合同。

###### 使用锻造创建

```bash
forge create --rpc-url $KAIROS_RPC_URL src/Counter.sol:Counter --broadcast --account your-wallet-name
```

![](/img/build/wallets/foundry-create-encrypted-secret-deployment.png)

###### 使用锻造脚本

```bash
forge script script/Counter.s.sol:CounterScript --rpc-url $KAIROS_RPC_URL --account your-wallet-name --broadcast
```

![](/img/build/wallets/foundry-script-encrypted-secret-deployment.png)

祝贺你 您已在 Foundry 中成功配置了加密机密，并在部署脚本中使用了它们。

#### 3.3. 配方：安全管理硬头盔项目中的账户

[Hardhat 3](https://hardhat.org/hardhat3-alpha) （目前处于 alpha 版）通过内置秘密管理器引入了加密秘密。 该功能支持安全存储任何基于字符串的敏感机密，如私钥或 RPC URL，以及不应提交到版本控制的 API 密钥。

:::note
Hardhat 3 处于 alpha 阶段，可能还不完全稳定。 在稳定版本正式发布之前，请谨慎使用
:::

##### 步骤 1：创建新的硬头巾项目

在终端运行以下命令创建新的 Hardhat 项目。

```bash
mkdir hardhat-encrypted && cd hardhat-encrypted
npm init -y
npx hardhat@next --init
```

:::note
在 npx 命令中添加 @next 可获取 Hardhat 最新的标记预发布版本，在撰写本文时为 `3.0.0-next.20`。
:::

接受提示的默认答案。 然后运行 Hardhat 版本来验证项目版本：

```bash
npx hardhat --version
```

##### 步骤 2：设置加密机密

要存储 RPC URL，请运行以下命令：

```bash
npx hardhat keystore set KAIROS_RPC_URL
```

![](/img/build/wallets/hh-keystore-rpc.png)

要以加密方式存储私人密钥，请运行以下命令：

```bash
npx hardhat keystore set PRIVATE_KEY
```

![](/img/build/wallets/hh-keystore-pk.png)

##### 步骤 3：验证加密机密

要验证机密是否已加密，请运行以下命令：

```bash
npx hardhat keystore list
```

你应该能在加密密文列表中看到你的 `KAIROS_RPC_URL` 和 `PRIVATE_KEY` 密文。

要重新获取密文值，请运行下面的命令。 系统会提示您输入主密钥进行解密。

```bash
npx hardhat keystore get KAIROS_RPC_URL
```

设置好机密后，更新配置文件，以便在项目中安全地引用它们。

##### 步骤 4：在配置文件中引用秘密

打开 `hardhat.config.ts`，更新网络部分以引用加密的秘密。 如果您的秘密名称不同，请相应调整条目。

```javascript
import { configVariable } from "hardhat/config";
module.exports = {
  networks: {
    kairos: {
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
```

现在，您可以在部署脚本中使用加密的秘密，而无需将其作为明文公开。

##### 步骤 5：在部署脚本中使用加密机密

使用下面的命令，通过 **ignition/modules** 中的 `Counter.ts` 模块部署您的合约。 该模块部署了 `Counter.sol` 并调用了 `incBy` 函数，其值为 5。

```bash
npx hardhat ignition deploy --network kairos ignition/modules/Counter.ts
```

运行该命令后，Hardhat 会提示您输入之前创建的密码。

之所以需要这样做，是因为 kairos 网络配置了一个密钥存储。 只有当任务或脚本依赖于加密机密时，才会提示您。 输入密码后，Hardhat 会继续部署你的合同，并执行值为 5 的 `incBy` 函数。

![](/img/build/wallets/hh-encrypted-secrets-deployment.png)

祝贺你 您已在 Hardhat 中成功配置了加密机密，并在部署脚本中使用了它们。

#### 3.4. 配方：将硬件钱包（SafePal）连接到 dApp

在本节中，您将学习如何将 SafePal S1 硬件钱包连接到第三方去中心化应用程序（DApp）并请求交易签名。

##### 步骤 1：设置 Safepal S1 钱包

在连接到任何 DApp 之前，请确保您的 SafePal S1 设备已正确设置。 如果您还没有这样做，请遵循 [本设置指南](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752-How-to-Set-Up-a-S1-Hardware-Wallet)。

如果设备已经配置，则可以跳过此步骤。

##### 步骤 2：将 S1 设备与 SafePal 应用程序配对

SafePal S1 是一款完全离线的硬件钱包，这意味着它不能直接连接互联网或与区块链网络通信。 要与 dApps 交互或签署交易，设备必须与 SafePal 应用程序配对。

SafePal 应用程序充当中间人--获取区块链数据、广播交易和转发 dApp 交互，同时确保您的私钥安全地保存在离线 S1 设备上。

要完成配对过程，请遵循本 [配对指南](https://safepalsupport.zendesk.com/hc/en-us/articles/18607468345627--How-to-Pair-the-S1-Pro-Hardware-Wallet-with-the-SafePal-App)。

##### 步骤 3：连接到 dApp。

在此步骤中，您将使用 WalletConnect 将 SafePal S1 硬件钱包连接到去中心化应用程序 (dApp)。

在本指南中，我们将使用 Kaia 领先的去中心化交易所（DEX）[DragonSwap](https://dgswap.io) 作为示例 dApp。 连接将通过浏览器使用 WalletConnect 进行。

1. 在浏览器中输入 dApp URL，启动 DragonSwap dApp，然后点击网站右上角的**连接钱包**按钮。

![](/img/build/wallets/sp-hw-dgswap-cw.png)

2. 在所有连接选项中，点击 \*\* 钱包连接\*\*。 屏幕上将显示一个 QR 码。

![](/img/build/wallets/sp-hw-dgswap-wc.png)

3. 使用 SafePal 应用程序扫描 QR 码。 点击应用程序主页面右上方的扫描按钮即可进入扫描程序。

![](/img/build/wallets/sp-hw-dgswap-sp-app-scan.jpg)

4. 扫描成功后，在应用程序中确认与 dApp 的连接，然后点击 **同意**。

![](/img/build/wallets/sp-hw-dgswap-sp-app-connect.jpg)

5. 然后，您就成功地在浏览器中将钱包连接到了 DragonSwap dApp！ 现在，您的钱包地址应显示在 DragonSwap 连接组件中。

![](/img/build/wallets/sp-hw-dgswap-connected.png)

##### 步骤 4：执行交易

在本节中，我们将通过将 KAIA 换成 USDT 来执行交易。 导航至 [Swap](https://dgswap.io/swap/) 页面。

1. 填写交换订单，然后点击**交换**按钮。 继续交易前，请务必确认交换。

![](/img/build/wallets/sp-hw-dgswap-trade.png)

2. 打开安全宝应用程序，您会看到一个交易确认页面。 点击**同意**继续交易。

![](/img/build/wallets/sp-hw-swap-sp-app-agree.jpg)

3. 打开 S1 设备扫描二维码并签署交易

![](/img/build/wallets/sp-hw-swap-sign.jpg)

4. 输入您的 S1 设备 PIN 码，输入密码后，点击安全宝应用程序中的**下一步**。

![](/img/build/wallets/sp-hw-swap-pincode.jpg)

5. 通过 SafePal 应用程序扫描 S1 设备上显示的动态 QR 码。 这样做可以确保应用程序收到二维码中包含的签名，并准备好向区块链（Kaia）广播交换交易。

![](/img/build/wallets/sp-hw-scan-swap-sp-app.jpg)

6. 签署完成后，您将看到一个弹出窗口，以广播交易。 之后点击 **确认**。

![](/img/build/wallets/sp-hw-swap-sp-app-broadcast.jpg)

7. 交易确认后，将出现**交易成功**弹出窗口，如下图所示。

![](/img/build/wallets/sp-hw-dgswap-tx-success.png)

![](/img/build/wallets/sp-hw-after-swap-asset-bal.jpg)

祝贺你 您已成功签署了一笔交易，并通过钱包连接使用您的安全宝硬件钱包将交易广播到第三方应用程序的区块链上。

### 第 4 章：高级和生产级设置

本章介绍了在安全风险最高的生产环境中保护资产和自动执行操作的秘诀。

#### 4.1. 配方：使用 Kaia Safe 设置多重签名库

Kaia Safe 允许开发人员创建一个可由多个所有者控制的账户，大大提高了安全性。

切勿使用普通钱包管理大量资金、协议权限或所有权控制。 太多项目因基本的钱包安全故障而受到影响。 无论您是要启动下一个大型 DeFi 协议、管理 DAO 金库还是保护贵重资产，多重签名钱包都是绝对必要的。

在本指南中，您将学习如何使用 Kaia Safe 在 Kaia 上创建保险箱、配置其所有者和审批阈值以及执行基本交易。

##### 创建安全钱包

1. 请访问 [Kaia Safe App](https://app.safe.global/welcome)。

![](/img/build/wallets/ks-welcome-page-sw.png)

2. **连接您的钱包**。 选择要连接到 Kaia Safe 网站的钱包类型。 在本指南中，我们将使用 Kaia 钱包。

![](/img/build/wallets/ks-connect-wallet-sw.png)

3. **为保险箱命名**。 连接钱包后，点击**创建账户**，并为您的 Kaia Safe 命名。

![](/img/build/wallets/ks-add-safe-name.png)

4. **配置签名者**。 配置 Kaia Safe 账户中的交易需要多少次签名确认才能获得批准。  良好的做法是以业主总数的 51%为门槛，例如，3 个_中_2 个，5 个_中_3 个等，如下图所示。

![](/img/build/wallets/ks-add-signers-sw.png)

5. **部署您的 Kaia Safe 账户**。 一旦您对 Kaia Safe 的所有参数完全满意，请单击**创建**，提交创建您的 Kaia Safe 账户。

![](/img/build/wallets/ks-review-create-safe-sw.png)

6. **用你的钱包**。 点击**开始使用 KaiaSafe 钱包**按钮。

![](/img/build/wallets/ks-start-using-wallet-sw.png)

7. 如下图所示，**进入 Kaia Safe 智能合约钱包的用户界面**。

![](/img/build/wallets/ks-safe-ui-sw.png)

恭喜您成功创建 Kaia Safe 账户！

##### 执行基本交易（发送本地令牌）

在本节中，您将学习如何执行基本交易，例如从 Kaia Safe 账户向受益人地址发送本机代币 KAIA。

确保您的 Kaia Safe 账户资金充足。 有关如何将 [deposit](https://docs.kaia.io/build/tools/wallets/kaia-safe/use-kaia-safe/#add-assets) 存入保险箱账户的说明，请参阅本指南。

步骤 1：点击侧边菜单中的**新交易**按钮，选择**发送代币**，开始新的资产转移。

![](/img/build/wallets/ks-new-tx-sw.gif)

第 2 步：选择要转移的资产。 添加**收件人地址**和**要转账的 KAIA**金额。

![](/img/build/wallets/ks-send-details-sw.gif)

步骤 3：审核并提交交易。 您需要用签名者钱包签署交易，一旦达到确认阈值，交易就会执行。

![](/img/build/wallets/ks-review-send-tx-sw.gif)

#### 4.2. 配方：集成 Kaia Safe 以执行关键智能合约操作

在本指南中，您将学习如何将 Kaia Safe 账户指定为智能合约的管理员。 您还将看到如何使用 Kaia Safe 账户执行\*\*setTokenPrice()**和**pause()\*\*等特权函数，确保只有经过批准的签名者才能执行特权操作。

##### 先决条件

- [Metamask](https://metamask.io/download)
- [Remix IDE](https://remix.ethereum.org)
- 从 [水龙头] 获取测试 KAIA(https://faucet.kaia.io)

##### 步骤 1：导航至 [Remix IDE](https://remix.ethereum.org/)

##### 第 2 步：编译和部署令牌合约样本

首先必须部署合约，然后才能在多重签名钱包中与之交互--调用特权函数。 我们要做的第一件事就是在部署时将新创建的 Kaia Safe 账户设置为令牌合约的\*\*初始所有者。

![](/img/build/wallets/ks-succor-deploy.gif)

此样本代币合约包含特权函数，如 **setTokenPrice()**、**pause()**，这些函数只能由 Kaia Safe 账户调用。 接下来，我们要做的就是相应地执行这些操作。 我们可以使用事务生成器或使用 Kaia Safe API 工具包进行编程。

##### 步骤 3：启动新交易

###### 使用事务生成器

要与安全钱包中的智能合约互动，请单击**新交易**。 要完成这一步骤，您需要已部署的合同地址和 ABI，如上一步所示。

![](/img/build/wallets/ks-succor-init-tx.gif)

###### 使用 Kaia Safe API 工具包

在本节中，您将使用 Kaia Safe API 工具包，以编程方式提出一个调用 **setTokenPrice**函数的交易，收集 Safe 账户所有者的签名，并执行交易。

**前提条件**

- [Node.js 和 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- 有多个签名人的保险箱

**设置环境**

\*\*第 1 步：创建项目目录。

在终端中复制并粘贴此命令以创建项目文件夹。

```bash
mkdir kaia-safe-api-contract-example
cd kaia-safe-api-contract-example
```

\*\*第 2 步：初始化 npm 项目。

在终端中复制并粘贴此命令，创建一个 `package.json` 文件。

```bash
npm init -y
```

**第 3 步：安装依赖项**。

使用 API-Kit 就像运行下面的安装命令一样简单：

```bash
npm install --save-dev @safe-global/api-kit@2.4.2 @safe-global/protocol-kit@4.0.2 @safe-global/safe-core-sdk-types@5.0.2
```

```bash
npm install --save-dev ethers dotenv
```

\*\*第 4 步：导入依赖项。

创建名为 `app.js` 的文件。 我们在此交互的所有代码片段都将放在这里。
将这些必要的导入复制并粘贴到 `app.js` 文件的顶部。

```js
import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import "dotenv/config";
```

**第 5 步：配置设置**

为了有效说明 API-Kit 的工作原理，我们将使用一个有两个或更多签名者的 Safe 账户设置，阈值为两个，因此在执行交易时需要收集多个签名。

将以下内容复制并粘贴到 `app.js` 文件中的导入语句下：

```js
const RPC_URL = "https://responsive-green-emerald.kaia-kairos.quiknode.pro";
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";
const CONTRACT_ADDRESS = "<REPLACE WITH CONTRACT ADDRESS>";
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER_1 ADDRESS>";
const OWNER_1_PRIVATE_KEY = process.env.OWNER_ONE_PK;
const OWNER_2_PRIVATE_KEY = process.env.OWNER_TWO_PK; // OWNER 2 need not have any test KAIA

```

**第 6 步：提议、确认和执行安全交易**

在本步骤中，您将使用 Safe API 工具包和具有多个所有者的 Safe 账户，提议、签署并执行一个智能合约功能调用。 您将从 Safe 发送一笔交易，以调用智能合约方法 **setTokenPrice()**，但同样的结构也适用于任何特权函数，如 **pause()**。

复制并粘贴以下内容到 `app.js` 文件中的初始设置下：

```js
// Create interface from ABI
const contractABI = [
  "function pause()",
  "function setTokenPrice(uint256 newPrice)",
];

const iface = new ethers.Interface(contractABI);
// Encode function calls
// const pauseData = iface.encodeFunctionData("pause", []);
const setTokenPriceData = iface.encodeFunctionData("setTokenPrice", [15]);

const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: "https://docs-safe.kaia.io/txs-baobab/api",
});
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS,
});
// 1. Create transaction
const safeTransactionData = {
  to: CONTRACT_ADDRESS,
  value: "0",
  data: setTokenPriceData,
  operation: OperationType.Call,
};

const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData],
});

const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction);
const senderSignature = await protocolKitOwner1.signHash(safeTxHash);
console.log(safeTxHash);

// 2. Propose transaction to the service
const proposeTx = await apiKit.proposeTransaction({
  safeAddress: SAFE_ADDRESS,
  safeTransactionData: safeTransaction.data,
  safeTxHash,
  senderAddress: OWNER_1_ADDRESS,
  senderSignature: senderSignature.data
})

// 3. Confirmation from Owner 2
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// Confirm the Safe transaction
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)

// 4. Execute transaction
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)

```

**完整代码：**

```javascript

import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import "dotenv/config";

// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = "https://responsive-green-emerald.kaia-kairos.quiknode.pro";
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";
const CONTRACT_ADDRESS = "<REPLACE WITH CONTRACT ADDRESS>";
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER_1 ADDRESS>";
const OWNER_1_PRIVATE_KEY = process.env.OWNER_ONE_PK;
const OWNER_2_PRIVATE_KEY = process.env.OWNER_TWO_PK; // OWNER 2 need not have any test KAIA

// Create interface from ABI
const contractABI = [
  "function pause()",
  "function setTokenPrice(uint256 newPrice)",
];
const iface = new ethers.Interface(contractABI);
// Encode function calls
// const pauseData = iface.encodeFunctionData("pause", []);
const setTokenPriceData = iface.encodeFunctionData("setTokenPrice", [15]);

const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: "https://docs-safe.kaia.io/txs-baobab/api",
});

const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS,
});

// 1. Create transaction
const safeTransactionData = {
  to: CONTRACT_ADDRESS,
  value: "0",
  data: setTokenPriceData,
  operation: OperationType.Call,
};

const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData],
});

const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction);
const senderSignature = await protocolKitOwner1.signHash(safeTxHash);
console.log(safeTxHash);

// 2. Propose transaction to the service
const proposeTx = await apiKit.proposeTransaction({
  safeAddress: SAFE_ADDRESS,
  safeTransactionData: safeTransaction.data,
  safeTxHash,
  senderAddress: OWNER_1_ADDRESS,
  senderSignature: senderSignature.data
})

// 3. Confirmation from Owner 2
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// Confirm the Safe transaction
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)

// 4. Execute transaction
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)

```

代码会执行以下操作

1. 使用 ethers.Interface 从合约 ABI 创建接口
2. 对 setTokenPrice(uint256) 函数调用进行编码
3. 为两个所有者初始化安全 API 工具包和协议工具包
4. 创建安全交易
5. 向 Safe 服务提出交易建议
6. 与第二位业主签署交易
7. 通过所有必要的签名确认交易
8. 从保险箱执行交易

现在，让我们来看看代码的运行情况。 在终端中运行 `node app.js`，你应该会看到这样的输出：

```bash
0xfa537bf8282ae36d933c41d867dee1ced93657094efe60c07180a872bb1388fc

Transaction executed:
https://kairos.kaiascan.io/tx/0xad94e0e8fd2d29602825b3815468dedb14221401438a9fbcfdfbeebaec6e52a7
```

现在，您应该可以在 Remix IDE 上看到 "tokenPrice "设置为 15。

![](/img/build/wallets/ks-succor-token-price-remix-display.png)

祝贺你 您已使用 Kaia Safe API 工具包成功执行了 Kaia Safe 账户中的特权功能。

##### 步骤 4：审核并提交交易

###### 使用事务生成器

您需要用签名者钱包签署交易，一旦达到确认阈值，交易就会执行。

![](/img/build/wallets/ks-succor-review-tx.gif)

## 附录

### 附录 A：术语表

- **冷存储**：将私人密钥存储在与互联网物理隔离的设备上。
- **dApp（去中心化应用程序）**：在区块链等去中心化网络而非中央服务器上运行的应用程序。
- **加密密钥库**：包含用密码加密的私人密钥的文件。
- **硬件钱包**：离线存储私钥并在内部签署交易的物理设备。
- **多重签名（Multi-Sig）**：一种需要多个独立私钥批准才能授权单笔交易的钱包。
- **私人密钥**：一个秘密的字母数字字符串，其所有者可通过它访问其加密货币并进行交易。 绝不能共享。
- **公共密钥/地址**：可公开共享的加密密钥，用于接收资金。 它源自私人密钥。
- **种子短语（或记忆短语）**：由 12-24 个单词组成的列表，可作为加密钱包中所有私钥的主备份。

### 附录 B：环境配置示例

为了帮助读者成功地学习本指南中的教程并复制代码示例，下面是实施过程中使用的开发环境配置示例。 建议将本地设置与这些版本保持一致，以避免出现兼容性问题。

**Node.js**

```bash
$ node --version  
v22.14.0  
```

**硬礼帽**

```bash
$ npx hardhat --version  
3.0.0-next.20  
```

**铸造厂（锻造厂）**

```bash
$ forge -V  
forge 1.2.3-stable (a813a2cee7 2025-06-08T15:42:50.507050000Z)  
```

**网络终端**

- RPC 提供者： https://responsive-green-emerald.kaia-kairos.quiknode.pro
- 目标链：Kairos Testnet（链 ID：1001）
- 区块资源管理器：[Kaiascan](https://kairos.kaiascan.io/)