# 常见问题

- [常见问题](#faq)
  - [Kaia 是什么？ ](#what-is-kaia-)
  - [Kaia 如何支持以太坊等价交换？ ](#how-does-kaia-support-ethereum-equivalence-)
  - [凯亚的天然气政策是什么？ ](#what-is-kaias-gas-policy-)
  - [Kaia 的账户结构有什么特别之处？ ](#what-is-special-about-kaias-account-structure-)
  - [在哪里可以开始使用 Kaia 开发 dApp？ ](#where-can-i-start-dapp-development-with-kaia-)
  - [Kaia 是开源的吗？ ](#is-kaia-open-source-)
  - [如何为我的账户充值？ ](#how-can-i-initially-fund-my-account-)
  - [有用于测试和开发的 Kaia 公共节点提供商吗？ ](#any-kaias-public-node-providers-for-testing-and-development-)
  - [有水龙头可以测试 KAIA 吗？ ](#are-there-faucets-to-get-test-kaia-)
  - [如何检查公共 RPC 端点状态？ ](#how-do-i-check-for-public-rpc-endpoint-status-)
  - [哪些钱包支持 Kaia？ ](#which-wallets-support-kaia-)
  - [什么是 Mainnet，什么是 Kairos？ ](#what-is-mainnet-what-is-kairos-)
  - [有 Kaia SDK 吗？ 用什么语言？ ](#are-there-any-kaia-sdks-in-what-languages-)
    - [kaia-sdk (Plug-in SDKs)](#kaia-sdk-plug-in-sdks)
  - [我必须安装和运行 EN（端点节点）才能使用 Kaia 吗？ ](#must-i-install-and-run-an-en-endpoint-node-to-use-kaia-)
  - [我正在运行 EN，节点数据同步太慢。 ](#i-am-running-an-en-and-node-data-sync-is-too-slow-)
  - [我可以在 Kaia 上使用 ERC-20 和 ERC-721 合约吗？ ](#can-i-use-erc-20-and-erc-721-contracts-on-kaia-)
  - [在哪里可以获得像 Metamask 这样的浏览器扩展钱包？ ](#where-can-i-get-a-browser-extension-wallet-like-metamask-)
  - [为什么我的缴费账户地址无法从提供的密钥中导出？ ](#why-is-my-fee-payer-account-address-not-derived-from-the-key-provided-)
  - [在哪里可以找到完整的收费授权工作样本？ ](#where-can-i-find-complete-working-samples-of-fee-delegation-)

## Kaia 是什么？ <a id="what-is-kaia"></a>

Kaia 是高性能的第 1 层区块链，专为 Web3 的大规模应用（尤其是在亚洲）而设计。 它提供超过 4,000 TPS、即时终结和一秒封堵时间。 Kaia 与以太坊完全兼容，可实现 dApp 的无缝迁移，并提供一个强大的生态系统，包括开发人员友好型工具、低费用以及生态系统基金提供的强大流动性。 它通过与 Kakao 和 LINE 等主要信息平台的集成，优先考虑 Web2 用户的可访问性。 详见我们的 [白皮书](https://docs.kaia.io/kaiatech/kaia-white-paper/)。

## Kaia 如何支持以太坊等价交换？ <a id="how-ethereum-equivalence"></a>

Kaia 与 EVM 兼容，支持除 EIP-4844 blob 交易之外的所有以太坊坎昆 EVM 功能。 它提供 `eth` 命名空间 RPC API，允许无缝使用以太坊 SDK 和工具。 Kaia 特有的交易类型在以太坊命名空间 API 中表示为 0 型传统交易，因此以太坊 SDK 无需了解这些类型。

## Kaia 的天然气政策是什么？ <a id="kaia-gas-policy"></a>

Kaia 采用动态天然气收费模式，在正常网络条件下保持低收费，但会根据网络拥堵情况调整收费。 手续费可在每个区块的有限范围内变化，有助于防止网络垃圾邮件，同时保持费用的可预测性。 每笔交易的部分费用会自动烧掉。 该模式优先考虑用户体验和企业友好性，同时保持网络稳定性。

## Kaia 的账户结构有什么特别之处？ <a id="kaia-account-structure"></a>

为了给 dApp 开发者提供最大的便利，Kaia 设计了一种[将私钥与地址分离](https://klaytn-tech.medium.com/klaytn-usability-improvement-series-1-separating-keys-and-addresses-dd5e367a0744)的方法。 因此，你可以轻松实现 [multisig](https://medium.com/klaytn/klaytn-usability-improvement-series-2-introducing-multisig-on-the-platform-level-85141893db01)，为一个账户创建多个私钥，每个私钥的权重都不同。 每个密钥还可分配 [不同角色](https://medium.com/klaytn/klaytn-usability-improvement-series-4-supporting-role-based-keys-on-the-platform-level-e2c912672b7b)。

## 从哪里开始使用 Kaia 开发 dApp？ <a id="dapp-development"></a>

无论您是从以太坊迁移，还是从零开始在 Kaia 上构建，我们都支持所有必要的工具和基础设施。 你可以使用 Kaia Plugin 在 [Remix IDE](../build/tutorials/connecting-remix.md) 上测试你的智能合约，或者连接到 [MetaMask](../build/tutorials/connecting-metamask.mdx) 钱包和 [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)。 Kaia的sdk可在 [此处](https://github.com/kaiachain/kaia-sdk)下载。 您可以参考我们的 [tutorials](../build/tutorials/tutorials.md) 尝试在 Kaia 上构建 dApp。

## Kaia 是开源的吗？ <a id="is-kaia-open-source"></a>

Kaia 当然是开源的！ 看看我们的 [Github 组织](https://github.com/kaiachain)，您就可以开始为我们的 Kaia 文档 [作出贡献](https://github.com/kaiachain/kaia-docs/blob/main/CONTRIBUTING.md)。 阅读更多关于我们的开源政策[此处](opensource.md)

## 如何为账户充值？ <a id="fund-my-acconut"></a>

您可以在交易所购买 KAIA。 可用交易所列表可在此处找到：
[Coinmarketcap](https://coinmarketcap.com/currencies/klaytn/markets/), [Coingecko](https://www.coingecko.com/en/coins/klay#markets).

## 有用于测试和开发的 Kaia 公共节点提供商吗？ <a id="node-providers"></a>

有关 Kaia 的公共节点提供程序和网络域，请参阅 [此列表](../references/public-en.md#rpc-service-providers)。

## 有水龙头可以测试 KAIA 吗？ <a id="are-there-faucets"></a>

您可以从这里获取用于开发和测试的 KAIA 测试版：

- [Kaia Faucet](https://faucet.kaia.io)
- [NODIT Faucet](https://kaiafaucet.com)
- [Thirdweb Faucet](https://thirdweb.com/kaia-testnet-kairos)

## 如何检查公共 RPC 端点状态？ <a id="rpc-endpoint-status"></a>

由于我们无法保证端点的正常运行时间和稳定性，您可以随时在此查看节点提供商的状态：[ChainList](https://chainlist.org/chain/8217), [Kaia Status](https://status.kaia.io/).

## 哪些钱包支持 Kaia？ <a id="which-wallets"></a>

Kaia 由冷钱包 D'cent 以及大量热钱包（如 Kaia Wallet、MetaMask 等）支持。 请参阅 [here](../build/wallets/wallets.md).

## 什么是 Mainnet，什么是 Kairos？ <a id="what-is-mainnet-what-is-kairos"></a>

主网是 Kaia 主网，Kairos 是测试网。
以下是每个网络的相关信息。

主网：

- EN 下载：从 [download page](../nodes/downloads/downloads.md) 中选择 Mainnet 软件包。
- KaiaScan : https://kaiascan.io/

启明星测试网

- EN 下载 ：从[下载页面](../nodes/downloads/downloads.md)选择 Kairos 软件包。
- KaiaScan : https://kairos.kaiascan.io
- Kairos Faucet : https://faucet.kaia.io

## 有 Kaia SDK 吗？ 用什么语言？ <a id="kaia-sdks"></a>

Kaia Node 与以太坊兼容，因此您可以使用流行的以太坊 SDK，如 ethers.js、web3.js、web3py、web3j 或 viem。 不过，Kaia Node 还包括 Kaia 特有账户和交易类型的扩展功能。

要利用这些功能，可以使用 Kaia SDK，其中包括 ethers-ext、web3js-ext、web3j-ext 和 web3py-ext 等扩展。 这些插件式 SDK 扩展了以太坊 SDK。

### kaia-sdk （插件 SDK）

这些 SDK 支持 JavaScript、Java 和 Python，因此您可以根据项目使用的语言进行选择：

- 用于 javascript 的 ethers-ext、web3js-ext
- 用于 Java 的 web3j-ext
- 用于 python 的 web3py-ext

## 我必须安装和运行 EN（端点节点）才能使用 Kaia 吗？ <a id="must-i-install-and-run-en"></a>

这取决于您的需求。 如果您需要完全控制您的节点，并需要自己验证区块，那么是的，您需要安装并运行自己的 EN。 这是大多数 Kaia 应用程序的典型设置。 不过，对于测试和开发，或者如果您不想管理自己的基础设施，[Kaia API Service (KAS)](https://www.klaytnapi.com/en/landing/main) 是一个不错的选择。 KAS 提供对 Kairos 和 Mainnet 的 Kaia Node RPC API 以及其他 API 服务的访问。 KAS 在注册后提供免费的 API 请求。 请查看 KAS [定价页面](https://www.klaytnapi.com/en/landing/pricing) 了解定价计划信息。

## 我正在运行 EN，节点数据同步太慢。 <a id="node-data-sync-is-too-slow"></a>

首先，检查您的硬件规格是否符合 [系统要求](../nodes/endpoint-node/system-requirements.md)。

其次，考虑 [下载 chaindata 快照](../nodes/endpoint-node/install-endpoint-nodes.md#optional-download-chaindata-snapshot)，跳过耗时的完全同步过程。 链数据快照是一种数据库快照，存储自创世以来生成的所有区块。 每日更新。

## 我可以在 Kaia 上使用 ERC-20 和 ERC-721 合约吗？ <a id="can-i-use-erc-20-and-erc-721"></a>

是的。 Kaia 支持 Solidity 作为智能合约语言。 用 Solidity 为 Etherem 编写的 [ERC-20](../build/smart-contracts/token-development/samples/erc-20.md) 和 [ERC-721](../build/smart-contracts/token-development/samples/erc-721.md) 可以在 Kaia 上部署和执行。

还可以定义更多的 Kaia 专用代币标准。 关注 [KIP（Kaia改进提案）](https://kips.kaia.io/) 并参与讨论。

## 在哪里可以获得像 Metamask 这样的浏览器扩展钱包？ <a id="where-can-i-get-a-browser-extension-wallet"></a>

Kaia 的网络浏览器扩展钱包 [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)。 Kaia 钱包是一个非托管钱包，您可以使用它进行 KAIA 交易和创建账户。

## 为什么我的缴费账户地址无法从所提供的密钥中导出？ <a id="account-address-is-not-derived-from-the-key"></a>

在 Kaia 中，[账户地址可以与密钥对解耦](../learn/accounts.md#decoupling-key-pairs-from-addresses)。

常见的使用情况如下。

- 账户所有者出于安全考虑希望更改密钥。
- 账户有一个加权多密钥或基于角色的密钥，允许使用多个密钥对来控制账户。

付费账户通常有一个[基于角色的密钥](../learn/accounts.md#accountkeyrolebased)。 在大多数情况下，账户地址不是从 RoleFeePayer 密钥导出的。

## 在哪里可以找到完整的收费授权工作样本？ <a id="fee-delegation-samples"></a>

您可以找到使用多个不同 Kaia SDK 进行费用委托的完整工作示例：

- ethers-ext：[收费委托价值转移示例](https://docs.kaia.io/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer/)
- web3js-ext：[收费委托值转移示例](https://docs.kaia.io/references/sdk/web3js-ext/fee-delegated-transaction/value-transfer/)
- web3j-ext：[收费委托值转移示例](https://docs.kaia.io/references/sdk/web3j-ext/fee-delegated-transaction/value-transfer/)
- web3py-ext：[收费委托价值转移示例](https://docs.kaia.io/references/sdk/web3py-ext/fee-delegated-transaction/value-transfer/)