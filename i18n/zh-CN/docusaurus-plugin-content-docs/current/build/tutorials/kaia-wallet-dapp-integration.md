# Kaia 钱包 DApp 集成

## 目录

1. [用户界面库](#1-ui-libraries)
2. [实用图书馆](#2-utility-libraries)
3. [提供商](#3-providers)

## 导言

[Kaia 钱包](https://docs.kaiawallet.io) 是一个非托管钱包，类似于[Metamask](https://metamask.io)，额外支持 Kaia 特有的[交易](https://docs.kaia.io/learn/transactions) 和[账户](https://docs.kaia.io/learn/accounts)。 本文将指导您将 [Kaia Wallet](https://docs.kaiawallet.io)与去中心化应用程序（dApp）集成，从高层（抽象）到低层（细粒度）实现。

在本指南中，我们将把 Kaia 钱包 dApp 整合分为三大类：

- 用户界面图书馆
- 实用图书馆
- 提供商

:::note

上述库在引擎盖下使用 "提供者"。

:::

## 1. 用户界面图书馆

许多 dApp 利用前端框架进行状态管理和提供反应式服务。 将 Kaia 钱包与此类应用程序集成的推荐方法是使用基于相同框架构建的用户界面库。

用户界面库为用户交互提供组件，如 "ConnectWallet "组件。 它们还能为您省去管理多账户和多网络等低级状态的麻烦。 您可以查看底层的 [Utility Library](#2-utility-libraries)或 [Provider] (#3-providers)，了解复杂或低级的交互。

虽然大多数用户界面库都内置了对 Metamask 的支持，但由于 Kaia Wallet 的[API](https://docs.kaia.io/references/json-rpc/kaia/account-created/)是基于[Metamask's](https://docs.metamask.io/wallet/reference/json-rpc-api)构建的，因此集成起来也很容易。 即使一个库没有原生支持 Kaia 钱包，扩展它以集成 Kaia 钱包也很简单。 例如，这是 [React](https://react.dev) 或 [Next.js](https://nextjs.org) 的 2 个流行库：

- [Appkit](#1.1-appkit-example)
- [Web3-Onboard](#1.2-web3-onboard-example)

### 1.1. Appkit 示例

![Appkit英雄旗帜](/img/build/tutorials/appkit-reown.png)

通过 [Reown](https://reown.com/)，[Appkit](https://docs.reown.com/appkit/overview) 提供以下**功能：**

- 连接钱包、账户信息和网络信息的按钮 + 模式
- 支持 [电子邮件钱包](https://docs.reown.com/appkit/authentication/socials)、[Coinbase](https://www.coinbase.com) 账户和 [EIP-4361](https://docs.reown.com/appkit/authentication/one-click-auth)

**考虑因素：**

- 使用 [@reown/appkit](https://www.npmjs.com/package/@reown/appkit)，您可以选择提交到 [Wagmi](https://wagmi.sh) & [Tanstack Query](https://tanstack.com/query) 的前端堆栈，或者只提交到 [Ethers](https://docs.ethers.org/v6/)
- 需要 `projectId` [使用 Reown 注册](https://cloud.walletconnect.com/sign-in)

:::note

示例代码：[kaikas-web3modal](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/kaikas.md)

:::

### 1.2. Web3-Onboard 示例

![Web3-Onboard Graphic](https://onboard.blocknative.com/_app/immutable/assets/connect-modal.b7439c5e.svg)

由[Blocknative](https://www.blocknative.com)、[Web3-Onboard](https://onboard.blocknative.com)提供以下**功能：**

- 可配置的机载文本
- 连接钱包、交换账户和交换网络的模式
- [通知组件](https://onboard.blocknative.com/docs/modules/core#customnotification)
- (可选）注册 API 密钥以获取和呈现实时数据

**考虑因素：**

- 您必须编写您的按钮

:::note

示例代码：[kaikas-web3onboard-react](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/web3Onboard.md)

:::

## 2. 实用图书馆

kaia-sdk](#21-kaia-sdk) 和 [ethers.js](#22-ethersjs-example) 等库的抽象程度足以简化区块链交互，同时还能直接调用 [Provider](#3-providers) API。

使用实用程序库连接账户或发送本地令牌（如 KAIA/ETH），在语法和代码行数\*方面与直接调用提供商没有区别。 图书馆主要在以下方面有所改进：

- 智能合约互动
  - 这些涉及 ABI、编码输入和解码输出。 如果没有库，这些代码可能会冗长且容易出错。
- 错误处理
  - 字符串错误代码/信息被映射到具有自定义属性和方法的错误类。
- 文件和类型安全

### 2.1. kaia-sdk

[kaia-sdk](https://github.com/kaiachain/kaia-sdk)是其他实用程序库（如 [ethers.js](https://docs.ethers.io/v6) 和 [web3.js](https://web3js.org))的插入式扩展集。 它允许您使用自己喜欢的库，同时为[Kaia 特定方法](https://docs.kaia.io/references/json-rpc/kaia/account-created/)提供第一方支持：

- 交易、账户和账户密钥类型
- 收费代表团

:::note

示例代码：[kaikas-web3klaytn](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/kaikas.md)

:::

### 2.2. ethers.js 示例

[etherthers.js](https://docs.ethers.io/v6)是[最受欢迎的](https://npmtrends.com/web3klaytn-vs-ethers-vs-viem-vs-web3) JavaScript 工具库，用于与区块链进行交互。 它的目标是

- 广泛：支持多种钱包格式、语言和功能
- 稳健：全面的测试、文档和键入

:::note

示例代码：[kaikas-ethersjs](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/ethers-js.md)

:::

## 3. 提供商

最底层是提供程序 [`window.klaytn`](https://docs.kaiawallet.io/02_api_reference/01_klaytn_provider)（Kaia 钱包本身）。 您可能更喜欢[实用库](#2-utility-libraries)，但了解提供程序接口有助于调试和理解依赖库如何工作。 要使用 Kaia 特有的方法，如 [`kaia_getAccount`](https://docs.kaia.io/references/json-rpc/kaia/get-account/)、[`kaia_sendTransactionAsFeePayer`](https://docs.kaia.io/references/json-rpc/kaia/send-transaction-as-fee-payer/) 等，必须参考 [Kaia 的 JSON-RPC API][Kaia-API]。
