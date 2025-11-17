# 存储优化

随着 Kaia 区块链的增长，存储区块链数据所需的存储空间也在增长。 Kaia 采用两种主要技术来管理这种不断增长的存储需求：

## 状态批量修剪（状态迁移）

状态迁移是一种批量剪枝功能，可在不中断运行节点的情况下应用于现有节点。

### 动机

区块状态或 StateDB 将链上账户和合约存储在一个 trie 数据结构中。 trie 数据结构可存储过时和最新状态，以便使用梅克尔散列进行验证。 随着事务执行状态更改，状态三元组会无限增长。 截至发稿时（2024 年 8 月），Kaia 主网存档节点大小超过 20TB，甚至完整节点也超过 10TB。

### 概念

状态迁移会删除处理新区块时不需要的旧区块状态。 它将状态 trie 从 "旧 "复制到 "新"。 并非所有三元组节点都会被复制。 从选择性区块的状态根可到达的区块被复制。 复制完成后，旧目录将被删除，因此只剩下所选区块的状态。

阅读这些博客文章，了解更多技术细节：
[状态迁移：节省节点存储](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a),
[Kaia 状态迁移：减少区块链数据的有效方法](https://medium.com/klaytn/klaytn-state-migration-an-efficient-way-to-reduce-blockchain-data-6615a3b36523)

关于如何执行批量剪枝，请参阅[状态迁移指南](../../misc/operation/node-pruning.md#how-to-perform-batch-pruning)。

## 国家现场修剪

状态实时剪枝是解决状态数据库规模不断扩大问题的一种新方案。 与批量剪枝（状态迁移）不同，实时剪枝会在节点进程阻塞时自动一点一点地删除旧状态。

### 动机

区块状态或 StateDB 将链上账户和合约存储在一个 trie 数据结构中。 trie 数据结构可存储过时和最新状态，以便使用梅克尔散列进行验证。 随着事务执行状态更改，状态三元组会无限增长。 截至发稿时（2025 年 8 月），Kaia 主网存档节点大小超过 20TB，甚至完整节点也超过 10TB。

在此之前，"状态迁移 "通过有选择性地复制最近的状态并删除其余状态来删除旧状态，从而缓解了这一问题。 这样可以将整个节点的大小减小到 5TB 以下。

然而，国家移民也有其自身的缺点。 它的缺点是需要花几天时间遍历整个州的 Trie，开销很大。 此外，状态迁移必须手动触发。 为了克服这些限制，引入了实时修剪技术。

### 概念

三元组修剪很难，因为三元组节点是否过时并不确定。 在原始状态三元组结构中，一个三元组节点可以是多个尝试的一部分，每个尝试构成一个不同的区块。 即使三元组节点（如账户余额）更新为另一个值，也不能删除该三元组节点，因为其他父节点可能仍然需要它。 这个问题被称为哈希重复问题。

实时剪枝会有意重复具有相同内容的三元组节点。 在 "实时剪枝 "模式下，三元组节点不会被哈希值引用，而是被 ExtHash 引用。 ExtHash 是内容的 32 字节哈希值加上 7 字节序列索引。 序列索引是单调递增的，因此每个三角形节点都是唯一的。

```
Hash:    32-byte Keccak256
ExtHash: 32-byte Keccak256 + 7-byte Serial index
```

这样，只要三元组节点的内容发生变化，就可以认为该三元组节点已经过时。 Merkle 哈希值的计算方法与此相同，只是忽略了序列索引，使其在共识方面与非实时剪枝节点兼容。

阅读这篇博客文章，了解更多技术细节：[利用 StateDB 实时剪枝高效管理区块链数据容量](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91).

有关如何启用实时修剪，请参阅[实时修剪指南](../../misc/operation/node-pruning.md#how-to-perform-live-pruning)。

## 数据压缩

数据压缩通过在选定的数据库表中应用 LevelDB 内置的 Snappy 压缩算法来减少块数据的存储大小。

### 动机

由于 EVM 事务中的 ABI 编码标准，由标题、事务主体和收据组成的块数据通常包含高度重复的字节序列。 例如，Solidity 的 ABI 编码使用零填充来满足 32 字节字对齐的要求，从而导致事务调用数据中出现较长的零。 交易收据在事件日志和返回值中显示出类似的模式。

尽管存在这种天然冗余，Kaia 的底层 LevelDB 存储引擎默认情况下并不使用压缩功能，从而使重复数据不必要地占用磁盘空间。 截至 2025 年 7 月，一个 Kaia Mainnet 完整节点占用了超过 4.2TB 的存储空间，其中约 3.6TB 属于未压缩的区块数据。

### 概念

Kaia v2.1.0 激活了 LevelDB 的 Snappy 压缩算法，可选择性地应用于数据库表。 使用"--db.leveldb.compression "标记可进行细粒度控制：

- 压缩标题、正文和收据（冗余度高，可节省大量资金）
- 不包括州三级数据（似乎是随机的，压缩效益极小）

对于现有节点，手动触发数据库压缩可将未压缩的旧数据重写为压缩格式。 这个 "内务整理 "过程会合并 SST 表、核对删除内容，并应用压缩作为副作用。

**结果：** 主网全节点的总存储量减少了约 50%（节省约 2TB 的存储空间），其中正文和收据表的存储空间增加最多。 这一过程大约需要 10 个小时，可与正常的区块处理同时进行。

阅读本博客文章，了解更多技术细节：Kaia v2.1 如何通过压缩回收 2TB.

有关启用压缩的方法，请参阅 [优化节点存储指南](../../misc/operation/optimize-storage.md#database-compression)。

## FlatTrie 状态方案（试验性）

FlatTrie 是一种实验性的状态存储方案，它通过调整历史账户状态的存储方式，大幅减少了归档节点状态数据库的大小。

### 动机

存档节点必须保留所有区块高度的所有账户的完整历史状态数据，以便进行时间旅行查询和全面的区块链分析。 这就造成了与完整节点截然不同的存储情况：截至 2025 年 8 月，一个 Kaia Mainnet 归档节点需要超过 35TB 的磁盘空间，其中 31TB （89%）被状态数据库占用。

传统的 Merkle Patricia Trie（MPT）结构同时存储账户数据（树叶）和构成 Merkle 树的中间分支节点。 存档节点历来为多个区块高度维护完整的 MPT，导致中间节点（本身不传输账户数据）无限期累积。

现有的存储优化，如[State Migration](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a)（批量剪枝）和[StateDB Live Pruning](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91)，从根本上说需要删除历史数据，因此不适用于必须保留完整历史数据的归档节点。

### 概念

FlatTrie 是一种实验性的状态存储方案，改编自[Erigon 以太坊客户端](https://github.com/erigontech/erigon/)。 它通过以下方式重构状态存储

- 在平面键值表中存储历史账户状态（简单的地址 → 账户数据映射）
- 只保留最新区块与所有中间分支节点的完整 MPT
- 只临时建立必要的分支节点，按需重建历史 Merkle 根节点

这种方法消除了历史中间节点的持久存储，同时保留了完整的账户状态历史，并能验证任何区块的 Merkle 根。

\*\* 适应挑战：\*\* Erigon 的实施假设以太坊的账户结构。 Kaia 使用不同的 RLP 编码，支持人类可读地址和多种密钥类型等独特功能。 集成工作需要修改 Erigon 的 Merkle 哈希算法模块，将账户视为不透明字节字符串，同时创建三个适配器层（DomainsManager、WriteBuffer、DeferredContext），以便将 Kaia 的多线程 Trie 接口与 Erigon 的单线程 MDBX 数据库需求连接起来。

**结果：** 在 Kairos 测试网实验中，FlatTrie 归档节点比传统归档节点少消耗约 75% 的总存储空间，状态数据库大小减少了 80% 以上。 预计主网归档节点也会有类似的节省（从 ~35TB 到 ~10TB）。

**限制：** 实验性 v2.1.0 实现不支持块回卷（`debug_setHead` API）、默克尔证明生成（`eth_getProof` API）或状态剪枝功能。 这些限制源于 FlatTrie 丢弃历史分支节点的设计选择。

阅读这篇博客文章，了解更多技术细节：[Kaia 的存档节点 FlatTrie 实验](#).

有关启用 FlatTrie 的方法，请参阅 [优化节点存储指南](../../misc/operation/optimize-storage.md#flattrie-state-scheme-experimental)。
