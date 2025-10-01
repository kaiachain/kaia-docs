# 使用 Scaffold-ETH 2 构建 dApp

![](/img/banners/kaia-scaffold.png)

## 导言<a href="#introduction" id="introduction"></a>

Scaffold-ETH 2 是一个开源工具包，用于在以太坊和其他与 EVM 兼容的区块链（如 Kaia）上构建去中心化应用程序（dApps）。 借助 Scaffold-ETH 2，开发人员可以轻松部署 Solidity 智能合约，并使用 React 前端启动 dApp。

Scaffold-ETH 2 工具包使用 Next.js、RainbowKit、Hardhat、Foundry、Wagmi 和 TypeScript 构建。 开发人员可以使用 Hardhat 或 Foundry 轻松创建、测试和部署智能合约，还可以使用 Next.js 构建 React 前端。

在本教程中，您将学习如何使用 Scaffold-ETH 2 在 Kaia 上部署、运行合约和构建 dApp。

## 先决条件<a href="#prerequisites" id="prerequisites"></a>

要开始学习本指南，您需要

- [节点 (>= v18.17)](https://nodejs.org/en/download/)
- 纱线（[v1](https://classic.yarnpkg.com/en/docs/install/) 或 [v2+](https://yarnpkg.com/getting-started/install))
- 熟悉 Javascript 和 React 基础知识，例如钩子
- [Metamask钱包](https://metamask.io/download/)
- 测试来自 [龙头] 的 KAIA(https://faucet.kaia.io)
- RPC 端点：您可以从其中一个受支持的 [端点提供程序](https://docs.kaia.io/references/public-en/) 获取该端点。

## 设置开发环境<a href="#setting-up-dev-environment" id="setting-up-dev-environment"></a>

要安装 Scaffold-ETH 2，您有两个选择，要么克隆 [Scaffold-ETH 2 资源库](https://github.com/scaffold-eth/scaffold-eth-2)，要么使用 `npx create-eth@latest` 安装。

在本指南中，我们将使用 npx 方法来引导 Scaffold-ETH 2 项目。

运行以下命令引导 Scaffold-ETH 2 项目：

```bash
npx create-eth@latest
```

您将看到一系列提示：

**项目名称**：输入项目名称： 输入项目名称，如 kaia-scaffold-example。

\*\* 实体框架\*\*；您想使用哪种实体框架？选择您喜欢的实体框架（Hardhat、Foundry）。 在本指南中，我们将使用 Hardhat 框架。

**Install packages?**：按回车键表示是（默认选项）或输入 n 并按回车键表示否
设置完成后，导航至项目目录。

```bash
cd project-name
// e.g  cd kaia_scaffold
```

![Scaffold-ETH setup](/img/build/tutorials/scaffold-1.png)

## Scaffold-ETH 2 开发过程的亮点<a href="#highlight-of-dev-environment" id="highlight-of-dev-environment"></a>

使用 Scaffold-ETH 2 开发项目的流程可概述如下：

1. 为 Kaia 更新 Hardhat 中的网络配置
2. 将智能合约添加到 **packages/hardhat/contracts** 中
3. 编辑 **packages/hardhat/deploy** 中的部署脚本
4. 将智能合约部署到 Kaia
5. 使用硬帽验证插件验证智能合约
6. 在 **packages/nextjs/scaffold.config.ts** 文件中配置前端以 Kaia 为目标
7. 在 **packages/nextjs/pages**目录下根据需要编辑你的前台

在本指南中，我们将使用 Scaffold-ETH 2 安装后可用的默认示例合同和前端。 只需为 Kaia 修改这些组件即可。 在这种情况下，我们将把配置分为 **Hardhat** 和 **Next.js** 配置。

## 硬头盔配置

在本节中，你将修改 Hardhat 配置文件中的网络配置，以**packages/hardhat**文件夹下的 Kaia 为目标。

### 为 Kaia 配置 Hardhat

要为 Kaia 配置 hardhat，需要创建 .env 文件并修改 hardhat.config.ts 以支持 Kaia。

**第 1 步：创建 .env**

要创建 .env 文件，请在终端中复制并粘贴以下代码

```bash
touch packages/hardhat/.env
```

关于 hardhat.config.js 文件中已使用的变量，可参考 **.env.example** 文件。 对于 Kaia，您只需创建一个变量：**deployed_private_key**.

**第 2 步：编辑 .env 文件以包含此变量：**

```bash
deployer_private_key=insert_private_key
```

在\*\*.env\*\*文件中说明的私钥与将在 Hardhat 项目中部署智能合约并与之交互的账户相对应。

**第 3 步：修改 hardhat.config.ts**

接下来我们要做的是配置 **hardhat.config.ts** 以支持 Kaia。

将常量**defaultNetwork**设置为部署智能合约的网络。

```js
    kairos: {
      chainId: 1001,
      url: "https://responsive-green-emerald.kaia-kairos.quiknode.pro/",
      accounts: [deployerPrivateKey],
    },
```

在网络配置对象下为 Kaia 添加网络配置

```js
network: "kairos",
```

有关在 Kaia 中使用 Hardhat 的更多信息，请查看 [Hardhat 指南](https://docs.kaia.io/build/get-started/hardhat/) 了解更多详情。

### 向 Kaia 部署合同

配置 Hardhat 以支持 Kaia 网络后，下一步就是编译和部署合同样本。

首先，您可以通过运行

```bash
纱线编译
```

![Compile](/img/build/tutorials/scaffold-2.png)

然后，可以在项目根目录下运行以下命令：

```
yarn deploy
```

![Deploy](/img/build/tutorials/scaffold-6.png)

请注意：

> 如果没有在 hardhat.config.ts 文件中设置默认网络配置，可以在命令中添加 --network INSERT_NETWORK。 例如，以下命令将向 Kaia 部署一份合同。

> yarn deploy --network kaia

### 验证您已部署的合同<a href="#verify-deployed-contract" id="verify-deployed-contract"></a>

要验证已部署的合同，我们将使用硬帽验证插件。 只需在 Kairos Testnet 的 etherscan 配置对象下的 **hardhat.config.ts** 中添加以下配置即可。

```js
  etherscan：{
    apiKey：{
      kairos: "unnecessary",
    },
    customChains：[
      {
        network："kairos",
        chainId：1001,
        urls：{
          apiURL："https://kairos-api.kaiascan.io/hardhat-verify",
          browserURL："https://kairos.kaiascan.io",
        },
      },
    ],
}、
```

接下来，在终端中复制并粘贴以下命令来验证智能合约：

示例

```js
yarn hardhat-verify --network network_name contract_address "构造函数参数 1"
```

实际

```js
yarn hardhat-verify --network kairos 0x7fc9656fc8c8ab433867e58b7c6afc19ec4275da
 "0x7fc9656fc8c8ab433867e58b7c6afc19ec4275da"
```

如上所示，要验证合同，必须输入网络名称、合同地址和构造函数参数（如有）。 稍等片刻后，控制台将显示验证结果，如果验证成功，还将提供 KaiaScan 上已验证合同的 URL。

![Verify](/img/build/tutorials/scaffold-verify.png)

有关在 Kaia 上使用 Hardhat Verify 插件验证智能合约的更多信息，请参阅 [Hardhat-Verify-Plugins guide](https://docs.kaia.io/build/smart-contracts/verify/hardhat/)。

## Next.js 配置<a href="#nextjs-configuration" id="nextjs-configuration"></a>

在本节中，你将修改 Next.js 配置，使其针对**packages/nextjs**文件夹下的 Kairos Testnet（智能合约部署到了这里）。 在本文件夹中，我们打算修改 **scaffold.config.ts** 文件中 scaffoldConfig 对象的 **targetNetwork** 数组。

### 修改 targetNetwork 数组<a href="#modify-targetnetwork-array" id="modify-targetnetwork-array"></a>

```js
targetNetworks: [chains.klaytnBaobab],
```

这就是配置 Next.js 的全部要求！ 接下来，在本地主机上启动 dApp。

### 在本地主机启动应用程序<a href="#launch-dapp-in-localhost" id="launch-dapp-in-localhost"></a>

完成所有必要配置后，您就可以在本地主机上启动示例应用程序了。

为此，请运行

```bash
起纱
```

![Run dApp](/img/build/tutorials/scaffold-4.png)

现在，您应该可以在 http://localhost:3001/ 上访问基于 React 的 dApp 前端。 您可以通过连接钱包或查看合约调试器页面与 dApp 进行互动。

![Scaffold dApp](/img/build/tutorials/scaffold-5.png)

## 结论

祝贺你 您已成功使用 Scaffold-ETH 2 在 Kaia 上部署了一个合约并运行了一个 dApp。 现在您已经了解 Scaffold-ETH 2 的工作原理，可以随意创建和部署自己的智能合约，并修改前端以满足您的 dApp 需求！

如需了解更多信息，请访问 [Scaffold-ETH 2 文档](https://docs.scaffoldeth.io/) ；如有任何疑问，请访问 [Kaia 论坛](https://devforum.kaia.io/)。














