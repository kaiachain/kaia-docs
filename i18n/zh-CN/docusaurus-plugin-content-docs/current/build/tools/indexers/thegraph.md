---
sidebar_label: The Graph
---

# The Graph

在构建 dapp 时，获取智能合约的历史数据可能会令人沮丧。 [The Graph](https://thegraph.com/) 通过被称为子图的应用程序接口，提供了一种查询智能合约数据的简便方法。 图形的基础设施依赖于索引器的去中心化网络，使您的 dapp 真正实现去中心化。

Kaia Mainnet 和 Testnet 均由 The Graph 提供支持。

## 快速入门

设置这些子图只需几分钟。 要开始操作，请遵循以下三个步骤：

1. 初始化子图项目
2. 部署和发布
3. 从您的应用程序中查询

定价

- Studio 中的速率限制测试终点是免费的。
- 去中心化网络的 API 调用按次付费，每 10 万次查询收费 4 美元。 前 100K 次查询免费！

下面是一个步骤：

## 1. 初始化子图项目

### 在 Subgraph Studio 上创建子图

访问 [Subgraph Studio] (https://thegraph.com/studio/) 并连接您的钱包。 连接钱包后，您可以点击 "创建子图"。 选择名称时，建议使用标题大小写："子图名称链名称"。

![Create a Subgraph](/img/build/tools/graph/01-create-subgraph.png)

然后，您将进入您的子图页面。 您需要的所有 CLI 命令都将显示在页面右侧：

![CLI commands](/img/build/tools/graph/02-cli-commands.webp)

### 安装图形 CLI

在本地计算机上运行以下程序：

```
npm install -g @graphprotocol/graph-cli
```

### 初始化子图

您可以直接从您的子图页面中复制，以包含您的特定子图标题：

```
graph init --studio<SUBGRAPH_SLUG>
```

系统会提示您提供子图的一些信息，如下所示：

![CLI sample](/img/build/tools/graph/03-cli-sample.webp)

输入合约信息后，graph-cli 会尝试从 blockexplorer API 获取 ABI、StartBLock 和合约名称。

不过，KaiaScan 的 API 还没有准备好，所以当被要求重试时，只需说 "不"。 以下是手动获取这些信息的方法：

1. ABI：您需要在运行 `graph init` 的同一目录下准备一个包含 ABI 的 json 文件。 从[Kaiascan 上的合同页面](https://kaiascan.io/address/0x5096db80b21ef45230c9e423c373f1fc9c0198dd)，进入 "合同 "选项卡，点击 "查看代码"，就能复制 ABI。 将其保存为 json 文件，放在运行 `graph init` 的同一文件夹中。 在上面的截图中，它被保存为 `abi.json`。
   ![Finding ABI](/img/build/tools/graph/04-kaiascan-abi.webp)

2. 启动区块：点击创建合约的交易哈希值。 在那里你会找到创建合同的区块。
   ![contract creation](/img/build/tools/graph/05-contract-creation.webp)

3. 合同名称：输入合同名称即可。 如果这是您在该子图中索引的唯一一份合同，那么使用默认的 `Contract` 即可。

## 2) 部署和发布

### 部署到 Subgraph Studio

首先运行这些命令：

```bash
$ graph codegen
$ graph build
```

然后运行这些程序来验证和部署您的子图。 您可以直接从 Studio 中的子图页面复制这些命令，以包含特定的部署密钥和子图标题：

```bash
$ graph auth --studio<DEPLOY_KEY>
$ graph deploy --studio<SUBGRAPH_SLUG>
```

系统会要求您提供版本标签。 您可以输入类似 v0.0.1 的内容，但也可以自由选择格式。

### 测试子图

您可以在操场部分进行示例查询，测试您的子图。 详细信息 "选项卡将显示 API 端点。 您可以使用该端点从您的 dapp 进行测试。

![Playground](/img/build/tools/graph/06-playground.png)

### 将子图发布到图谱的去中心化网络中

一旦您的子图可以投入生产，您就可以将其发布到去中心化网络中。 在 Subgraph Studio 的子图页面上，点击 "发布 "按钮：

![publish button](/img/build/tools/graph/07-studio-publish-subgraph.webp)

> **注：**
>
> - Kaia 暂时显示为 "部分支持"，因为为索引员解锁奖励的最终链上投票流程尚未完成。 目前，Edge & Node 的索引器（升级索引器）是唯一支持所有 Kaia 子图的索引器。
> - 尽管您的子图正在索引来自 Kaia、以太坊或任何其他[支持链](https://thegraph.com/docs/en/developing/supported-networks/)的数据，但该图的智能合约都在 Arbitrum One 上。

## 3. 查询子图

祝贺你 现在，您可以在分散式网络上查询您的子图！

对于去中心化网络上的任何子图，只要将 GraphQL 查询传递到子图的查询 URL（可在资源管理器页面顶部找到），就可以开始对其进行查询。

下面是 Messari 在 [CryptoPunks Ethereum 子图](https://thegraph.com/explorer/subgraphs/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK) 中的一个例子：

![Query URL](/img/build/tools/graph/08-query-url.png)

该子图的查询 URL 为

`https://gateway-arbitrum.network.thegraph.com/api/`**[api-key]**`/subgraphs/id/HdVdERFUe8h61vm2fDyycgxjsde5PbB832NHgJfZNqK`

现在，您只需填写自己的 API 密钥，即可开始向该端点发送 GraphQL 查询。

### 获取自己的应用程序接口密钥

![API keys](/img/build/tools/graph/09-apikeys.png)

在 Subgraph Studio 中，您会看到页面顶部的 "API 密钥 "菜单。 您可以在此创建 API 密钥。

## 附录

### 查询示例

该查询显示了售价最昂贵的 CryptoPunks。

```graphql
{
  trades(orderBy: priceETH, orderDirection: desc) {
    priceETH
    tokenId
  }
}

```

将其输入查询 URL 会返回此结果：

```
{
  "数据"：{
    "trades"：[
      {
        "priceETH"："124457.067524886018255505",
        "tokenId"："9998"
      },
      {
        "priceETH"："8000",
        "tokenId"："5822"
      },
// ...
```

<aside>
💡小知识：从[CryptoPunks 网站](https://cryptopunks.app/cryptopunks/topsales)上的最高销量来看，最高销量似乎是 Punk #5822，而不是 #9998。 为什么？ 因为他们对发生的闪贷销售进行了审查。

</aside>

### 代码示例

```jsx
const axios = require('axios');

const graphqlQuery = `{
  trades(orderBy: priceETH, orderDirection: desc) {
    priceETH
    tokenId
  }
}`;
const queryUrl = 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK'

const graphQLRequest = {
  method: 'post',
  url: queryUrl,
  data: {
    query: graphqlQuery,
  },
};

// Send the GraphQL query
axios(graphQLRequest)
  .then((response) => {
    // Handle the response here
    const data = response.data.data
    console.log(data)

  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
```

### 其他资源：

- 要探索优化和定制子图以提高性能的所有方法，请阅读 [在此创建子图](https://thegraph.com/docs/en/developing/creating-a-subgraph/) 的更多信息。
- 有关从子图中查询数据的更多信息，请阅读 [此处](https://thegraph.com/docs/en/querying/querying-the-graph/)。
