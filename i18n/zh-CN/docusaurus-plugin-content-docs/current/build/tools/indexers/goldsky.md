---
sidebar_label: 戈尔茨基
---

# 戈尔茨基

![](/img/banners/kaia-goldsky.png)

## 导言

[Goldsky](https://goldsky.com) 是一款高性能数据索引器，旨在简化链上数据的提取、转换和加载（ETL）。 它使开发人员能够更快地构建和发布实时分析和区块链集成应用。

Goldsky 提供两种核心产品：

- [Subgraphs](https://docs.goldsky.com/subgraphs/introduction)：灵活、TypeScript 驱动的索引，支持 GraphQL API、webhook 等。
- [Mirror](https://docs.goldsky.com/mirror/introduction)：只需一个 YAML 配置，即可将实时区块链数据直接流式传输到您的数据库或消息队列中。

Kaia Mainnet 和 Testnet 均由 Goldsky 提供支持

**你将学到什么**

在本指南结束时，您将

- 了解 Goldsky 的低代码子图（即时子图）如何工作
- 使用 Goldsky CLI 配置和部署子图
- 在 Kaia 主网上索引 USDT 合约的转账事件
- 通过 GraphQL 访问和测试子图端点

## 先决条件

在开始之前，请确保您具备以下条件：

**1. 安装 Goldsky CLI**
\- 按照操作系统的[安装说明](https://docs.goldsky.com/subgraphs/deploying-subgraphs#install-goldskys-cli-and-log-in)进行操作。
\- Windows 用户：在安装 CLI 之前，确保已安装 [Node.js](https://nodejs.org) 和 npm。

**2. 创建 Goldsky 账户**
\- 如果还没有账户，请在 [Goldsky.com](https://goldsky.com) 注册。

**3. 生成 API 密钥**
\- 在 Goldsky 面板中导航至 \*\* 项目设置\*\*。
\- 创建并复制您的 API 密钥。

**4. 验证 CLI**````bash
    goldsky login
    ```
    - 按提示粘贴 API 密钥。
    - 运行
``bash
    goldsky
    ``` 确认 CLI 身份验证
````

## 入门

Goldsky 支持三种部署子图的方法：

- 来自 [源代码](https://docs.goldsky.com/subgraphs/deploying-subgraphs#from-source-code) - 从本地开发环境部署定制的子图。
- 从其他主机迁移 - 从 [The Graph](https://docs.goldsky.com/subgraphs/migrate-from-the-graph) 或 [Alchemy](https://docs.goldsky.com/subgraphs/migrate-from-alchemy/guide) 等平台迁移现有子图。
- 即时子图（[低代码](https://docs.goldsky.com/subgraphs/guides/create-a-low-code-subgraph) / [无代码](https://docs.goldsky.com/subgraphs/guides/create-a-no-code-subgraph)- 使用配置文件（低代码）或用户界面（无代码）部署子图，无需编写传统的子图映射代码。

在本指南中，我们将使用低代码方法部署一个子图，用于索引 Kaia Mainnet 上 USDT 合约的 _Transfer_ 事件。

## 设置和部署

低代码方法允许我们手动创建配置文件，但我们仍然不需要编写传统的子图映射代码--Goldsky 会根据我们的配置生成它。

因此，在本节中，您只需要.NET Framework 3.0：

- Kaia 上的 USDT 合同地址
- 合同的 ABI（应用程序二进制接口
- 起始区块（部署合同的区块）

### 检索 USDT 合同 ABI

- 访问 [Kaiascan](https://kaiascan.io) 查找 [USDT 合同地址](https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1)。

- 单击 "合同 "选项卡，找到 "合同 ABI "部分。

  > 注：USDT 是代理合约。 请务必检索执行合同 ABI。

- 复制并粘贴合同 ABI，将其保存为工作目录中的 [abi.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-abi-json)。

- 记录合同的部署区块编号。

### 创建配置文件

下一步是创建即时子图配置文件（例如` usdt-demo-config.json`）。

该文件由五个主要部分组成：

1. 配置版本号
2. 配置名称
3. 履行机构
4. 链条
5. 合同实例

#### 版本号

这是 Goldsky 配置文件格式的版本号，而不是子图的版本号。 最新版本号请参阅此 [reference](https://docs.goldsky.com/subgraphs/reference/instant-subgraph#version-1)。

#### 配置名称

这是您自选的名称，可帮助您了解此配置的用途。 它仅用于内部调试。 在本指南中，我们将使用 _usdt-demo_

#### ABI、链和合同实例

这三个部分是相互关联的。

- 命名您的 ABI，并输入您之前保存的 ABI 文件的路径（相对于本配置文件的位置）。 在本例中，是 `usdtabi` 和 `abi.json`。

- 写出合约实例，引用你之前命名的 ABI、部署地址、所在链、起始块。

\*\* 示例：[usdt-demo-config.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-demo-config-json)\*\*

```json
{
  "version": "1",
  "name": "usdt-demo",
  "abis": {
    "usdtabi": {
      "path": "./abi.json"
    }
  },
  "instances": [
    {
      "abi": "usdtabi",
      "address": "0xd077a400968890eacc75cdc901f0356c943e4fdb",
      "startBlock": 30801565,
      "chain": "kaia"
    }
  ]
}
```

这种配置支持多种用例，包括索引具有不同 ABI 的多个合同、在多个链上部署的同一合同或在不同网络上具有独特 ABI 的多个合同。

### 部署子图

配置文件准备就绪后，就可以部署子图了。

使用命令部署子图：goldsky subgraph deploy name/version --from-abi<path-to-config-file>\`，然后输入创建的配置文件的路径。

例如

```bash
goldsky subgraph deploy usdt-demo/1.0 --from-abi usdt-demo-config.json
```

![Goldsky low code deploy](/img/build/tools/goldsky-lc-deploy.png)

Goldsky 会自动生成所需的子图代码，以您的名义进行部署，并提供一个查询端点供您立即使用。

打开端点会启动一个基于网络的 GraphQL 浏览器，您可以在其中检查模式并编写查询，以便集成到您的应用程序中。

### 查询子图

祝贺你 您已成功部署子图。

在查询之前，可能需要等待索引器完全同步，这取决于配置文件中定义的 startBlock 值。 您可以直接在 Goldsky 面板上监控同步进度。

[Goldsky同步索引器](/img/build/tools/goldsky-synced-indexer.png)

同步完成后，就可以使用 Goldsky 提供的公共端点查询子图了：

```
https://api.goldsky.com/api/public/project_cmkv4p7xa8ix401vc3f32g20g/subgraphs/usdt-demo-kaia/1.0/gn
```

:::tip
使用从 Goldsky 面板链接的基于网络的 GraphQL 浏览器，以交互方式浏览模式和测试查询
:::

![基于网络的 Goldsky GraphQL 演示](/img/build/tools/goldsky-demo.gif)

#### 查询示例：获取 USDT 转账。

此 GraphQL 查询可检索 Kaia Mainnet 上的前 10 个 USDT 传输事件，按价值降序排序：

```js
{
  transfers(first: 10, orderBy: value, orderDirection: desc) {
    from
    id
    to
    value
  }
}
```

答复样本：

```json
{
  "data": {
    "transfers": [
      {
        "from": "0x0000000000000000000000000000000000000000",
        "id": "0x3618973a943060e7bd57eb8c49c8770af93241710c891195a311ace77366a26b-4",
        "to": "0x5754284f345afc66a98fbb0a0afe71e0f007b949",
        "value": "100000000000000"
      },
      {
        "from": "0x5754284f345afc66a98fbb0a0afe71e0f007b949",
        "id": "0x249852a124700338df1d93d272d9a88d41d3c6526fefb7bb76dce27d3c6e6617-2",
        "to": "0x77134cbc06cb00b66f4c7e623d5fdbf6777635ec",
        "value": "20000000000000"
      }
      // ...
    ]
  }
}
```

**示例代码：通过 JavaScript 查询（Axios）**

下面是一个如何在 Node.js 中使用 axios 发送相同查询的简单示例：

```js
const axios = require('axios');

const graphqlQuery = `
  {
    transfers(first: 10, orderBy: value, orderDirection: desc) {
      from
      id
      to
      value
    }
  }
`;

const queryUrl = 'https://api.goldsky.com/api/public/project_cmkv4p7xa8ix401vc3f32g20g/subgraphs/usdt-demo-kaia/1.0/gn';

axios.post(queryUrl, { query: graphqlQuery })
  .then((response) => {
    const data = response.data.data;
    console.log(data);
  })
  .catch((error) => {
    console.error('GraphQL query failed:', error);
 });
```

## 其他资源

- [Deploying a Subgraph](https://docs.goldsky.com/subgraphs/deploying-subgraphs)
- [用 Goldsky 为 Kaia 编制索引](https://docs.goldsky.com/chains/kaia)
- [Goldsky Documentation](https://docs.goldsky.com/introduction)
