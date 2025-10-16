# 在 Kaia 上构建迷你 DApp

迷你 DApps 是由区块链驱动的小型应用程序，可直接安装在 LINE Messenger 中。 它们能让人们轻松使用 Web3 功能，而无需离开他们已经熟悉的聊天应用程序。

## 什么是微型应用程序？

把迷你 DApps 想象成建立在 Kaia 区块链上的简单工具或游戏。 它们在 LINE 内运行，LINE 是一款流行的信息应用程序，每月用户超过 2 亿，主要集中在日本、台湾、泰国和印度尼西亚。 开发人员制作这些应用程序，是为了将安全支付、奖励或代币交易等有用的区块链功能直接添加到日常聊天中。

对于用户来说，这很简单。 无需下载额外的应用程序或学习棘手的区块链知识。 您只需打开 LINE，通过 Dapp Portal（一个内置的发现中心）找到一个 Mini DApp，然后开始使用它。 例如，赚取会员积分、交换代币、购买 NFT，甚至玩快速游戏。 所有事情都在一个地方发生。

这一切都由 Kaia 在幕后操纵。 它是一种快速、低成本的区块链（由 Klaytn 和 Finschia 合并而成），可处理安全部分，如记录交易或运行智能合约。 Kaia 的钱包等工具与 LINE 紧密结合，因此管理数字资产感觉很自然。 此外，费用委托等功能意味着用户往往不用自己支付加油费。

真正的优势在于迷你 DApps 为大众使用打开了大门。 它们将 Web3 与可信赖的应用程序相融合，接触到那些可能不会探索区块链的人。 企业可以建立奖励制度。 开发人员可以制作互动体验。 这一切都是为了让去中心化技术变得实用，适合不同地区，同时连接全球。

## 构建微型应用程序的关键 SDK

要创建一个 Mini dApp，您需要使用几个关键的 SDK。 它们各自处理不同的部分：区块链基础知识、用户发现和 LINE 集成。 下文提供了简要概述，并附有更多详细信息的链接。

### Kaia SDK（核心区块链工具）

该 SDK 为您提供了连接 Kaia 网络的基础知识。 它是一套库，用于编写智能合约、发送交易或管理钱包。

它的用途主要用于后台 例如，如果您的 Mini dApp 需要部署用于铸造代币或处理支付的合约，您通常会依赖该 SDK。 它以 Ethers.js 或 Web3.js 等熟悉的工具为基础，并为 JavaScript 增加了 ethers-ext 等额外功能。

主要功能包括提交交易、读取合同数据和构建可扩展的应用程序。 在迷你 dApp 中，它通常为代币铸造或 NFT 交易等提供动力。

有关详细信息，请查看我们文档中的 [Kaia SDK 参考资料](../references/sdk/sdk.md)。 那里有详尽的介绍，如果您要签订合同，可以从那里开始。

### Dapp 门户 SDK（连接到发现中心）

Dapp Portal 是 LINE 寻找和推广迷你 dApp 的平台。 该 JavaScript SDK 可将您的应用程序与之链接，处理钱包登录或交易等 Web3 操作。

它有什么用？它可以让用户连接自己的 Kaia 钱包（与 LINE 绑定）、铸造代币、查看余额或访问奖励和市场--所有这些都可以在你的 Mini dApp 中完成。 将其视为面向用户的区块链交互桥梁。

您将把它添加到前端代码中，通常是 HTML 或脚本中。 例如，在 Unity 或 Cocos 教程中，它用于钱包连接和令牌功能。 主要方法包括初始化 SDK、申请账户和发送交易。

有关 API 的详细信息和设置，请参阅 [Dapp Portal docs](https://docs.dappportal.io/) 。 为了安全起见，我们建议在开发过程中在 `localhost:3000` 上进行测试。

### LIFF SDK（嵌入到 LINE Messenger 中）

LIFF 是 LINE 前端框架的缩写。 它是 LINE 用于构建网络应用程序的工具，可在信使中流畅运行。

用途用于处理前端事务，如用户通过 LINE 账户登录，以及在 LINE 浏览器中显示应用程序。 它简化了上机过程，无需额外密码。 在 LINE Developers Console 中设置 LIFF 应用程序，选择大小（全屏或小巧）并添加权限。

在工作流程中，通常是从这里开始构建界面，然后再分层引入其他 SDK。 例如，教程展示了如何修改 index.html，使其包含用于 Unity WebGL 构建的 LIFF。

全部信息请参见 [LINE's LIFF docs](https://developers.line.biz/en/docs/liff/overview/)。 它是外部设备，但对迷你应用程序来说必不可少。

## 这些 SDK 如何相互配合

了解流程后，构建迷你 dApp 并不复杂。 首先使用 LIFF 在 LINE 中设置应用程序，处理登录和基本视图。 然后，使用 Kaia SDK 进行后端区块链工作，如部署智能合约。 最后，添加 Dapp Portal SDK 以连接钱包并启用代币铸造或奖励等功能。

![](/img/minidapps/sdk-overview.png)

举个简单的例子：玩家通过游戏获得代币。 您可以在 LINE 中使用 LIFF 来显示游戏画面。 Dapp Portal SDK 连接钱包并分发奖励。 Kaia SDK 在 Kaia 上部署令牌合约。
这种设置既安全又方便用户使用。 有关实践指南，请参阅我们的 [Unity](https://docs.kaia.io/minidapps/unity/quick-start/)、[Cocos Creator](https://docs.kaia.io/minidapps/cocos-creator/quick-start/) 或 [Survey Mini dApp](https://docs.kaia.io/minidapps/survey-minidapp/intro/) 教程。

## 迷你 DApp 开发入门

要开始开发 Mini DApp，请按照以下步骤进行：

1. 申请访问 Mini DApp SDK [此处](https://tally.so/r/w4Y5BB) 并等待批准。
2. 从 [Kaia Faucet](https://faucet.kaia.io/) 获取测试令牌。
3. 按照 [Unity](./unity/quick-start.md)、[Cocos Creator](./cocos-creator/quick-start.md) 或 [Survey Mini dApp](./survey-minidapp/intro.md) 的教程设置开发环境。

了解有关迷你 DApp SDK 的更多信息，请访问 [Dapp Portal SDK 文档](https://developers.dappportal.io/sdk)，其中提供了有关实施和集成的全面指导。

如果您是在 Kaia 上构建的新手，请查看我们的 [Kaia 入门](../build/get-started/get-started.mdx) 页面了解基础知识。

有关问题和社区支持，请访问 [Kaia 开发人员论坛](https://devforum.kaia.io/)。