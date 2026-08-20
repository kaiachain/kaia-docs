# Indexers

区块链索引器是区块链技术中使用的工具，用于提高搜索、查询和访问存储在区块链上的数据的效率和速度。 它们创建并维护区块链数据的有序数据库，使用户能够快速检索信息，而无需从头开始处理整个区块链。

:::caution 2026年8月31日，《The Graph》将在凯亚（Kaia）正式停运

[The Graph](https://thegraph.com/) 对 Kaia 的支持将于 **2026 年 8 月 31 日** 结束。 在此日期之后，Kaia 子图将停止索引，其查询端点也将停止返回数据。 如果您的 dapp 依赖于其中一种，请参阅 **[从 The Graph 迁移](./migrate-from-the-graph.md)** —— 您的子图代码可直接迁移至 Goldsky、SubQuery 或自托管的图节点，无需任何修改。

:::

以下供应商已与 Kaia 集成，提供区块链索引服务：

| 服务提供商                      | Kaia 网络                            | 注释                                                        |
| -------------------------- | ---------------------------------- | --------------------------------------------------------- |
| [Goldsky](./goldsky.md)    | 主网，Kairos                          | 托管子图加上 Mirror 数据流。 符合子图规范，因此只需一条 CLI 命令即可迁移现有子图。          |
| [SubQuery](./subquery.md)  | 主网，Kairos                          | 在单个项目中实现多链索引，同时支持托管式和去中心化网络托管。                            |
| [The Graph](./thegraph.md) | 主网，Kairos — **截至 2026 年 8 月 31 日** | 凯亚的日落。 请参阅 [从 The Graph 迁移](./migrate-from-the-graph.md)。 |

如果您更希望自行运营索引基础设施，也可以直接在 Kaia 归档 RPC 端点上运行 [graph-node](https://github.com/graphprotocol/graph-node)。
