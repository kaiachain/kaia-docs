# 配置上游存档节点上游 EN

上游 EN（端点节点）功能允许全节点操作员利用归档节点作为 RPC 备份。 有关完整节点和归档节点的更多信息，请参阅 [Block Synchronization](../../learn/storage/block-sync.md) 页面。

当一个完整节点即将返回 "缺少三节点 "错误时，它会尝试调用指定的上游 RPC URL 并返回该结果。 如果将归档节点配置为上游节点，则全节点基本上可以提供归档级服务，而归档节点的负载最小。

## 使用方法

使用上游 EN 功能，您可以运行经济高效的归档 RPC 服务。 运行一个存档节点，运行多个完整节点。 使全节点回落到归档节点。 这样，大多数请求由全节点处理，而一些需要历史状态的请求则由归档节点处理。

<p align="center"><img src="/img/learn/upstream_en.png" width="50%"/></p>

## 如何启用上游 EN

要使用上游 EN 功能，只需向完整节点传递 `--upstream-en<RPC_URL>` 标志即可。 例如，在您的 `kend.conf` 文件中、

```sh
ADDITIONAL="$ADDITIONAL --upstream-en https://archive-en.node.kaia.io"
```