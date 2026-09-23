---
title: 从 The Graph 迁移
sidebar_label: 从 The Graph 迁移
---

# 从 The Graph 迁移

**The Graph** 上对 Kaia 的支持已于 **2026 年 8 月 31 日** 结束。 Kaia 子图不再被索引，其查询端点不再返回 Kaia 数据，且 Kaia 已不再是 Subgraph Studio 中可部署的网络。

如果您的去中心化应用（dapp）仍指向 The Graph 上的 Kaia 子图，请将其迁移至 [Goldsky](./goldsky.md)、[SubQuery](./subquery.md) 或自托管的图节点。您的子图代码将原样保留。

## 发生了什么

The Graph 已停止对 Kaia 的支持。这仅影响托管索引服务。

|                |                                                                    |
| -------------- | ------------------------------------------------------------------ |
| **2026年8月31日** | Kaia 子图已停止索引。 The Graph 网关上的查询端点已停止返回 Kaia 数据。                     |
| **现在**         | 在 Subgraph Studio 中，Kaia 已不再是一个可部署的网络。 Kaia 的 `graph deploy` 操作失败。 |

**链上没有任何变化。** Kaia 主网（8217）和 Kairos 测试网（1001）、您的合约以及您的完整事件历史记录均未受影响。任何读取 Kaia RPC 端点的索引器都能从创世区块开始完全重建相同的数据——没有任何历史数据丢失，也不需要在链上进行任何数据恢复。

## 您是否受到影响？

如果符合以下任一情况，您将受到影响：

- 您的应用向 `gateway.thegraph.com` 或 `gateway-arbitrum.network.thegraph.com` 上的某个 URL 发起查询，该 URL 指向一个 Kaia 子图。
- 您的应用从 Subgraph Studio（`api.studio.thegraph.com/query/...`）查询了一个 Kaia 子图端点。
- 您可以使用 `graph deploy --studio` 部署 Kaia 子图，或将其发布到 The Graph 的去中心化网络中。
- 您技术栈中的某个依赖项、仪表板或分析任务会从这些端点之一读取数据。

快速检查代码库的方法：

```bash
grep -rn "thegraph.com" --include="*.ts" --include="*.js" --include="*.json" --include="*.env*" .
```

如果符合以下任一情况，这些查询已经失败了。迁移后服务将恢复正常。

如果您使用 Goldsky、SubQuery、自托管的图节点对 Kaia 进行索引，或者直接读取 Kaia RPC 端点，则您**不会**受到影响。

## 选择其他选项

以下三个选项均将 Kaia 主网和 Kairos 纳入指数。

|            | [Goldsky](./goldsky.md) | [SubQuery](./subquery.md) | 自托管的图节点                                   |
| ---------- | ----------------------- | ------------------------- | ----------------------------------------- |
| **运行现有子图** | 是的——子图规范相同              | 是的——通过 IPFS 部署 ID         | 是的——&#x5B83;_&#x786E;&#x5B9E;_&#x662F;图节点 |
| **迁移工作**   | 一条 CLI 命令               | 发布现有构建                    | 部署您自己的基础设施                                |
| **主机托管**   | 托管                      | 集中式或去中心化网络                | 由你来操作                                     |
| **此外还提供**  | 镜像（流式传输到数据库）、RPC、管道     | 在一个项目中实现多链索引              | 完全控制                                      |
| **最适合**    | 最快捷的即插即用替换方案            | 多链项目、去中心化托管               | 希望摆脱对供应商依赖的团队                             |

**若想走最短路径，请使用 Goldsky。** Goldsky 与 The Graph 的子图规范完全兼容，因此现有的 Kaia 子图可直接迁移，无需更改映射、模式或查询——只需在应用中更新端点 URL 即可。

:::tip 从源代码部署，而非从 IPFS 哈希部署

关于 The Graph 的迁移指南通常首先从其实时查询端点读取子图的部署哈希值。对于 Kaia 子图而言，这已不再可行，因为这些端点已停止响应。

请改从子图的源代码仓库进行部署。它无需部署 ID，生成的构建结果完全相同，目前是可靠的方案。仅当您之前已保存过 IPFS 哈希值，或者仍可从 [Graph Explorer](https://thegraph.com/explorer) 或 Subgraph Studio 中的子图页面读取该哈希值时，才使用 IPFS 哈希值作为备用方案。

:::

## 选项 1：迁移至 Goldsky

### 1. 安装并验证 Goldsky CLI

```bash
# macOS / Linux
curl https://goldsky.com | sh

# Windows
npm install -g @goldskycom/cli
```

在 [app.goldsky.com](https://app.goldsky.com) 的 **项目设置** 下创建一个 API 密钥，然后：

```bash
goldsky login
```

对于 CI 或无头环境：

```bash
goldsky login --token <API_KEY>
```

### 2. 从源代码部署子图

在您的子图项目目录下：

```bash
goldsky subgraph deploy <your-subgraph-name>/<version>
```

Goldsky 会根据您的 `subgraph.yaml`、`schema.graphql` 和映射文件进行构建，然后从您配置的起始区块开始对 Kaia 进行索引。完整参考资料请参见 [子图的部署](https://docs.goldsky.com/subgraphs/deploying-subgraphs)。

如果你还保留着之前某个构建版本的 IPFS 哈希值，可以直接部署该构建版本：

```bash
goldsky subgraph deploy <your-subgraph-name>/<version> --from-ipfs-hash <your-subgraph-ipfs-hash>
```

### 3. 请等待同步完成，然后切换您的端点

使用以下方式跟踪进度：

```bash
goldsky subgraph list
```

从启动块重新索引 Kaia 历史数据需要时间——请提前做好规划，不要指望能立即切换。一旦子图追上链头，请在您的应用中替换网关 URL：

```diff
- const queryUrl = 'https://gateway.thegraph.com/api/<api-key>/subgraphs/id/<subgraph-id>';
+ const queryUrl = 'https://api.goldsky.com/api/public/<project-id>/subgraphs/<name>/<version>/gn';
```

您的 GraphQL 查询不会发生变化。有关在 Goldsky 上从零开始构建 Kaia 子图的完整分步指南，请参阅 [Goldsky](./goldsky.md)。

## 方案 2：迁移到 SubQuery

SubQuery 可以运行现有的子图构建，同时也为多链项目提供了自己的 SDK。

1. 基于 SubQuery 的 IPFS 网关构建您的子图，以生成部署 ID（CID）：

   ```bash
   graph build -i https://unauthipfs.subquery.network/ipfs/api/v0
   ```

   如果您在服务停用前从 Graph Explorer 中保存了部署 ID，则可以直接使用该 ID。

2. 打开 [SubQuery Explorer](https://explorer.subquery.network)，然后选择 **发布新项目**。

3. 输入 CID 以及您的项目元数据，然后发布。

请注意，SubQuery Network 不支持 GraphQL 订阅。请参阅 [将您的 Subgraph 项目发布到 SubQuery 网络](https://subquery.network/doc/subquery_network/architects/publish-subgraph.html) 和 [Kaia 快速入门](https://subquery.network/doc/indexer/quickstart/quickstart_chains/kaia.html)，或访问 [SubQuery](./subquery.md) 页面查看针对 Kaia 的入门指南。

## 选项 3：自行托管图节点

您的子图是可移植的。您可以自行在 Kaia 归档 RPC 端点上运行 [graph-node](https://github.com/graphprotocol/graph-node)，并完全保留原有的映射、模式和查询。

您需要一个 Kaia RPC 端点（请参阅 [公共端点](../../../references/public-en.md) 或运行 [您自己的节点](../../../nodes/endpoint-node/endpoint-node.md)），此外还需要 PostgreSQL 和 IPFS。这使您能够完全掌控一切，且不受供应商制约，但代价是您需要自行运营基础设施。

## 切换检查清单

- [ ] 请列出贵团队拥有的所有 Kaia 子图，包括内部仪表盘和分析任务。
- [ ] 查找每个的源代码仓库，以及其起始代码块和任何嫁接配置。
- [ ] 将每个子图部署到您选择的提供商上。
- [ ] 等待每个子图与链头同步。
- [ ] 将几个已知的查询与新端点进行对比，并确认结果是否正确。
- [ ] 请更新应用、环境变量和 CI 密钥中的端点 URL 和 API 密钥。
- [ ] 请更新任何调用您的子图端点的第三方集成或合作伙伴。
- [ ] 部署您的应用，并确认生产环境中的流量能够通过新端点进行读取。
- [ ] 取消仅用于 Kaia 的 The Graph 计费或 API 密钥。

## 常见问题解答

**这会影响我的智能合约或链上数据吗？**
不会。只有托管索引服务停止了。您在 Kaia 上的合约、交易和事件日志均保持不变，且任何索引器均可对其进行全面查询。

**我必须重写子图吗？**
不需要。 Goldsky、SubQuery 和自托管的 graph-node 均遵循标准子图规范。您的 `schema.graphql`、映射和 GraphQL 查询都会被保留下来。

\*\*我从未保存过子图的部署 ID。**我的子图丢失了吗？**
没有。部署 ID 用于标识一个构建，而非您的数据。从源代码仓库进行部署后，您的新索引器会从链上重建同一数据集。

**我也没有子图的源代码了。**
索引数据仍然可以重建，但映射关系和模式必须重新编写。请从 [Goldsky](./goldsky.md) 指南开始，使用您的合约 ABI 以及合约部署所在的区块。

**针对其他区块链的查询还能正常工作吗？**
可以。这只影响了凯亚。您通过 The Graph 在其他网络上运行的子图不会受到影响。

**凯亚是在推荐某家服务商吗？**
不是。 Goldsky 之所以是最快的即用型方案，是因为它支持单命令迁移，但 SubQuery 和自托管的 graph-node 同样可行。选择适合您技术栈的方案。

**我需要迁移方面的帮助。**
请在 [Kaia 开发者论坛](https://devforum.kaia.io) 或 Kaia Discord 上联系我们。如果您运行的是大型或复杂的子图，请联系 Kaia 团队，以便我们协助您规划切换工作。

## 下一步

- [Goldsky](./goldsky.md) — 逐步部署一个 Kaia 子图
- [SubQuery](./subquery.md) — Kaia 上的多链索引
- [索引器概述](./indexers.md) — Kaia 上的所有索引选项
