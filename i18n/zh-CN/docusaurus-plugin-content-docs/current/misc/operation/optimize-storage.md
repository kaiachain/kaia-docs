# 优化节点存储

[Kaia v2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0) 引入了两个互补的存储优化功能，可显著减少磁盘空间需求：

- **数据库压缩**：通过压缩重复数据块来减少存储空间
- **FlatTrie 状态方案**：大幅减少归档节点状态数据库大小的实验性功能

本指南介绍如何将这些优化应用到 Kaia 节点。

## 数据库压缩

数据库压缩使用 LevelDB 内置的 Snappy 压缩技术来缩小块头、事务主体和收据的大小，这些数据通常包含重复数据，如 ABI 编码事务中的零填充。

\*\* 预期节余：\*\*

- 全节点：减少 ~2TB （主网从 ~4.2TB 减少到 ~2TB）

### 先决条件

- Kaia v2.1.0 或更高版本
- 对于手动压缩：足够的可用磁盘空间和接受持续磁盘 I/O 的能力（请参阅下文**资源影响**部分）。

### 为新安装启用压缩功能

从 v2.1.0 版开始，默认启用压缩功能。 只需启动节点即可：

**软件包安装：**

```bash
# Configure network in kend.conf
sudo vi /etc/kend/conf/kend.conf
# Set: NETWORK=mainnet or NETWORK=kairos

# Start node (compression enabled by default in v2.1.0+)
kend start

# Verify
kend status
tail -f /var/kend/logs/kend.out
```

所有新写入的数据都将自动压缩。

### 为现有节点启用压缩功能

如果您是从 v2.1.0 之前的版本升级：

**第 1 步：检查版本**

```bash
ken version
```

**第 2 步：适用于 v2.1.0 及更高版本**

默认情况下已启用压缩功能。 新数据会自动压缩。 跳至步骤 4 压缩现有数据。

**第 3 步：仅适用于 v2.1.0 之前的版本**

在配置中添加压缩标志：

**软件包安装：**

```bash
sudo vi /etc/kend/conf/kend.conf
# Add to ADDITIONAL variable:
ADDITIONAL="--db.leveldb.compression 2"
```

压缩标志值为

- `0`:无压缩
- `1`:只压缩收据
- `2`:压缩标题、正文和收据（推荐）
- `3`:压缩所有表格，包括状态三（不建议使用）

:::note

建议采用方案 2，因为状态三角数据压缩效果不好（显得随机），所以方案 3 带来的额外好处微乎其微。

:::

然后重新启动：

```bash
kend stop
kend start
```

**第 4 步：压缩现有数据（可选但建议）**

通过 RPC 触发数据库压缩。 连接到节点控制台：

```bash
ken attach --datadir /var/kend/data
```

在控制台中，使用 "allbutstate "预设触发压缩：

```javascript
> debug.chaindbCompact({ "preset": "allbutstate" })
null
```

**可用预设：**

- "默认"：全方位压缩所有数据库组件
- `"allbutstate"`：选择性压缩，不包括状态 trie（推荐用于压缩）
- "自定义"：为特定数据库表定义自定义范围

压缩在后台运行。 在节点日志中监控进度：

```bash
tail -f /var/kend/logs/kend.out | grep -i Compact
```

您应该会看到类似的日志条目：

```
INFO[07/25,12:50:17 Z] [3] Compacting database started               range=0x48-0x49
INFO[07/25,12:55:17 Z] [3] Compacting database completed             range=0x48-0x49 elapsed=5m0.085s
```

在压缩过程中，节点将继续处理数据块。

**预计持续时间：** 一个主网完整节点（固态硬盘上有 ~4TB 数据）大约需要 10 小时。 持续时间因硬件和数据大小而异。

**对资源的影响：**

- 磁盘 I/O 高（读取峰值 >400 MiB/秒，写入峰值 >300 MiB/秒）
- 磁盘 IOPS 高（通常大于 2000 次/秒）
- 节点保持运行并继续同步区块

:::note

虽然节点在压缩期间保持运行，但在 I/O 高峰期，查询性能可能会受到影响。 对于生产 RPC 节点，在维护窗口或低流量时段安排压实。

:::

### 使用预压缩 Chaindata 快照（待定）

预压缩链数据快照计划在未来发布，但目前尚未提供。 当这些信息可用时，它们将被列入 [Chaindata 快照页面](https://docs.kaia.io/misc/operation/chaindata-snapshot/)。

目前，您必须

- 在新安装的 v2.1.0+ 版本中启用压缩（新数据自动压缩）
- 在现有节点上运行手动压缩（见上文）

定期查看快照页面，了解有关压缩快照可用性的更新。

### 验证压缩是否激活

检查节点启动日志，查看压缩配置：

```bash
grep "compressionType" /var/kend/logs/kend.out
```

查找日志中显示 "compressionType=snappy "的非州-三角形表。

### 监控和故障排除

**检查磁盘使用减少情况：**

```bash
du -h --max-depth=1 /var/kend/data/klay/chaindata
```

比较压实前后的效果。 在包含区块正文和收据的目录中，你应该能看到存储空间的大幅减少。

**常见问题：**

1. **压缩失败**：确保有足够的磁盘空间。 压缩暂时需要额外的空间来重写数据。
2. **FlatTrie无法启动**：FlatTrie 需要一个空数据库。 如果看到有关现有数据的错误，请删除 chaindata 目录并从 genesis 同步。
3. **默克尔证明 API 错误**：FlatTrie 不支持 `eth_getProof`。 如果需要此 API，请使用传统节点。

## FlatTrie 状态方案（试验性）

FlatTrie 是一种实验性的状态存储方案，改编自 Erigon 以太坊客户端。 它以扁平结构存储账户状态，只维护最新区块的完整 Merkle Patricia Trie (MPT)，按需重建历史尝试。

**预期节省：**

- 总存储量：~减少约 75%（根据 Kairos 测试网结果预测）
- Kairos 测试网：4.3TB → 1TB
- 主网：~35TB → ~10TB（根据缩减比例估算）

:::warning

FlatTrie 是 v2.1.0 中的一项实验功能。 不建议用于生产。 未来版本中可能会出现稳定性问题、性能瓶颈和破坏性更改。 仅用于测试和开发环境。

:::

### 先决条件

- Kaia v2.1.0 或更高版本
- **必须从创世同步**（不能转换现有数据库）
- 空数据目录

### 目前的限制

在启用 FlatTrie 之前，请了解这些限制：

**不支持的功能：**

- 批量修剪和现场修剪
- 块回卷（"--start-block-number "标志和 "debug_setHead "API）
- 默克尔证明生成（`eth_getProof` API）

**不兼容问题：**

- 无法从现有数据库迁移（必须从创世开始）
- 无法在 FlatTrie 和非 FlatTrie 模式之间切换
- 有 FlatTrie 和没有 FlatTrie 的数据库不兼容

### 启用 FlatTrie

**第 1 步：准备空数据目录**

```bash
# Ensure clean data directory
sudo rm -rf /var/kend/data
sudo mkdir -p /var/kend/data
```

**第 2 步：使用 FlatTrie 标志启动节点，并从创世同步**

```bash
# Mainnet
ken --state.experimental-flat-trie

# Kairos testnet
ken --state.experimental-flat-trie --kairos
```

:::note

启用 FlatTrie 后，归档模式会自动激活，与 `--gcmode`和 `--state.block-interval`标志无关。 使用 FlatTrie 时，这些标记将被忽略。

:::

**步骤 3：等待完全同步**

节点将同步创世中的所有区块。 这可能需要几周时间，具体取决于您的硬件和网络。

### 验证 FlatTrie 是否处于活动状态

检查节点启动日志，确认 FlatTrie 模式：

```bash
grep -i "flat" /var/kend/logs/kend.out | head -20
```

您应该能看到实验性平面三维模型已激活的迹象。

### 监控 FlatTrie 性能

与传统的状态存储相比，FlatTrie 使用不同的资源配置文件：

**预期特点：**

- 降低 CPU 使用率
- 更高的内存使用率（~30GB）
- 更高的程序运行次数（约 900-1000 次）
- 区块最终完成时间较慢

通过节点的 Prometheus 指标端点或 Grafana 面板监控这些指标。

### 故障排除 FlatTrie

**无法在现有数据库上启动 FlatTrie：**
如果你看到错误提示无法在非空数据上启用 FlatTrie，你必须从 genesis 开始。 删除 chaindata 目录，使用 `--state.experimental-flat-trie` 标志执行完全同步。

\*\* Merkle proof API 失败：\*\*
FlatTrie 不支持 `eth_getProof` 和相关的 Merkle proof API。 如果您的应用程序需要这些 API，请使用传统节点。

\*\* 高内存使用量：\*\*
同步过程中，FlatTrie 节点的内存使用量预计约为 30GB。 确保系统有足够的内存。 团队正在进行优化，以便在未来版本中减少这种情况。

\*\* 同步速度慢：\*\*
使用 FlatTrie 的初始同步速度与传统节点相当。 如果同步速度明显变慢，请进行检查：

- 磁盘 I/O 性能（强烈建议使用固态硬盘）
- 网络带宽
- CPU 使用率

## 最佳做法

1. **在进行重大更改前**\*始终进行备份：特别是在运行手动压缩之前。
2. **监控磁盘空间**：确保压缩前有足够的可用空间。 压缩暂时需要额外空间来重写数据库文件。
3. **在低流量时段安排压缩**：如果运行公共 RPC 端点。
4. \*\* 生产节点使用固态硬盘\*\*：压缩和 FlatTrie 都受益于快速随机 I/O。
5. \*\* 实验性功能计划\*\*：FlatTrie 在 2.1.x 版中是试验性的。 生产使用前进行彻底测试。
6. **保持更新**：查看发布说明，了解未来的优化和 FlatTrie 从实验状态毕业的时间。