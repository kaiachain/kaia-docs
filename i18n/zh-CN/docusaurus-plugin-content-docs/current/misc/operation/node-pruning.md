# 修剪节点数据

本页介绍如何删除历史块状态以减少存储需求。 Kaia 提供了两种修剪块状态的方法：

- [实时修剪](../../learn/storage/storage-optimization.md#state-live-pruning)：启用实时修剪功能后，超过一定保留期限的块状态将被自动删除。
- [批量剪枝：状态迁移](../../learn/storage/storage-optimization.md#state-batch-pruning-state-migration)：区块状态可以进行状态迁移，即某个区块编号之前的区块状态可以使用。

## 了解修剪的影响

"实时剪枝 "可持续删除旧状态，将磁盘大小保持在最小范围内。 不过，由于伴随着记账任务，实时修剪会稍微降低区块同步速度。 另一方面，"批量剪枝 "在迁移完成后不会影响性能，但迁移会话需要几天时间，并暂时需要大量可用磁盘空间来复制状态。

## 如何进行现场修剪

要从创世区块启用实时剪枝，请在启动节点时使用 `--state.live-pruning` 标记。 如果从已启用实时剪枝的数据库开始，则可选择是否使用该标记，但为了清晰起见，建议使用该标记。

:::note

您可以使用"--state.live-pruning-retention NNN "标记来控制实时剪枝的保留时间（默认值：172800 秒，即 48 小时）。 该标志决定了历史数据块状态在被剪枝前的保留时间。

:::

:::info

有实时修剪和没有实时修剪的数据库是不兼容的。 要运行带实时剪枝功能的节点，必须从带有 `--state.live-pruning`标记的创世块开始，或者从已启用实时剪枝功能的 [chaindata snapshot](./chaindata-snapshot.md)开始。

不能将非实时剪枝数据库转换为实时剪枝数据库，反之亦然。 以下是您可能会看到的一些日志信息示例：

```sh
# 首次启用实时修剪，数据库为空
INFO[08/27,14:09:01 +09] [41] 将实时修剪标志写入数据库

# 启用实时修剪
INFO[08/27,14:09:01 +09] [41] 启用实时修剪 retention=172800

# 禁用实时修剪
INFO[08/27,14：09:46 +09] [41] 实时剪枝已禁用，因为数据库中未存储标志

# 在链前进后无法开启实时剪枝（头部区块数>0）
Fatal: Error starting protocol stack: cannot enable live pruning after the chain has advanced.
```

:::

## 如何进行批量修剪

### 先决条件

- 建议在配备 m6i.8xlarge（32 核和 128GB 内存）或更高配置的机器上运行。
- 机器应有足够的备用磁盘空间（500GB 或以上）。
- 整个过程大约需要 7 天：
  - 第 1 阶段：将状态复制（迁移）到新目录。 出现消息 "状态迁移已完成"。
  - 第 2 阶段：在新目录中继续进行区块同步。 完成此步骤后，旧目录将被删除。

### 步骤

1. 通过控制台连接节点：

```sh
ken attach --datadir /var/kend/data
```

2. 使用 `admin` 命名空间 RPC 控制状态迁移：

```js
// 启动
> admin.startStateMigration()
null

// 检查进度
> admin.stateMigrationStatus

// 中止
> admin.stopStateMigration()
```