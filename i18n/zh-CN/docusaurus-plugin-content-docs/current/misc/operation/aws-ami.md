# 使用 AWS AMI

:::info[Service 不再更新]

Kaia 端点节点的 AWS AMI 服务不再更新（最后更新日期：2024 年 11 月）。 虽然现有的 AMI（日期为 2024 年 11 月）仍可使用，但请注意，它们可能需要额外的同步时间才能赶上当前的区块链状态。 有关其他设置方法，如使用链数据快照或执行完全同步，请参阅 [块同步](../../learn/storage/block-sync.md)。

:::

Kaia 为 Kaia 端点节点 (EN) 提供 AWS AMI（[亚马逊机器映像](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)）。 这些 AMI 预先安装了 EN 软件和链数据，使用户能够快速方便地启动一个可全面运行的节点。 有了 Kaia 的 AMI，按需设置新的终端节点就变得简单易行，从而简化了加入 Kaia 网络的过程。

## 为什么使用 AMI

AMI 提供了启动新 Kaia EN 的便捷方式。 此外，由于其链数据已经设置好，您不需要额外的磁盘存储空间来下载和提取压缩链数据。 此外，对于某些同步模式，如归档模式或无状态迁移的完整模式（我们只为剪枝链数据提供快照下载），使用 AMI 是在不完全同步的情况下运行新 EN 的唯一选择。

## EN AMI 的类型

Kaia 提供不同类型的 AMI，其链数据已通过不同模式同步。

| **类型** | **同步模式**            | **AMI 名称**                        |
| ------ | ------------------- | --------------------------------- |
| 全部     | 全模式                 | `kaia-xxxx-clean-full-en-xxxx`    |
| 修剪     | 全模式，启用实时修剪          | `kaia-xxxx-clean-pruning-en-xxxx` |
| 州迁移    | 全模式，状态已迁移（或状态已批量剪切） | `kaia-xxxx-clean-en-xxxx`         |
| 档案馆    | 存档模式                | `kaia-xxxx-clean-archive-en-xxxx` |

Kaia 为主网络提供这 4 种 AMI。 除了 "完整 "类型，Kairos 也有 AMI。

有关状态迁移链数据的更多详情，请参阅 [状态批量剪枝](../../../learn/storage/state-pruning/#state-batch-pruning-state-migration)。
有关块同步模式的更多详情，请参阅 [块同步](../../learn/storage/block-sync.md)。

## 在亚马逊控制台使用 AMI 启动新的 EC2 实例

在 AWS 控制台中启动新 EC2 实例时，应选择 AMI。 在 AMI 搜索栏中搜索 "kaia-mainnet"。

![AMI search bar](/img/misc/ami_search.png)

该页面将带您进入搜索结果。 单击搜索结果页面中的 "社区 AMI "选项卡，然后从列表中选择要使用的 AMI。

![AMI search result](/img/misc/ami_select.png)

### 允许入站连接

在 AWS 控制台中启动新的 EC2 实例时，可以为实例创建新的安全组，也可以选择现有的安全组。 无论采用哪种方式，都必须添加入站规则，以允许连接到 Kaia 节点用于相互通信的端口。

导航到 AWS 控制台中的 EC2 实例页面，在 "安全 "选项卡中找到相关的安全组。 您应为端口 32323-32324 添加入站规则。

| IP 版本 | 类型      | 规程  | 端口范围          | 资料来源                                                      |
| ----- | ------- | --- | ------------- | --------------------------------------------------------- |
| IPv4  | 自定义 TCP | TCP | 32323 - 32324 | 0.0.0.0/0 |
| IPv4  | 自定义 UDP | UDP | 32323         | 0.0.0.0/0 |

## 启动后的实例准备和设置

### 预热亚马逊 EBS 卷

根据快照创建的 Amazon EBS 卷（AMI 就是一种情况），必须先从 Amazon S3 提取存储块并写入卷，然后才能访问它们。 这样，在首次访问每个数据块时，磁盘操作的开销就会很大。 所有数据块下载并写入加密卷后，加密卷性能才会恢复。 有关详细信息，请参阅 [初始化 Amazon EBS 卷](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-initialize.html)。

为了让卷准备就绪，我们可以运行一个任务来读取所有数据块。

```bash
$ sudo yum install -y fio
$ sudo fio --filename=/dev/nvme1n1 --rw=read --bs=128k --iodepth=32 --ioengine=libaio --direct=1 --name=volume-initialize
```

:::note

预热 Amazon EBS 卷的任务需要很长时间，具体取决于数据大小。 有关 ETA，请参阅 `fio` 输出。

:::

### 检查 `kend.conf` 配置

启动节点前，请检查配置文件 `kend.conf` 中的 `NETWORK` 和 `NETWORK_ID` 字段。 kend.conf 文件位于 `/etc/kend/conf/kend.conf`。

对于 Mainnet，"NETWORK "字段应为 "mainnet"。 对于 Kairos，"NETWORK "字段应为 "kairos"。

```
# 对于 Mainnet
NETWORK=mainnet

# 对于 Kairos
NETWORK=kairos
```

请注意，`NETWORK_ID` 仅用于专用网络。 因此，请确保不要为 Mainnet 或 Kairos 设置 `NETWORK_ID`。

有关 `kend.conf` 的更多详情，请参阅 [配置](configuration.md)。

### 启动 "kend "服务

在 EC2 实例中，安装了 Kaia CLI 客户端和 chaindata。 此外，"kend"（用于启动/终止 EN 的脚本）已作为一项服务安装。 您可以使用以下命令检查 `kend` 服务的状态。

```bash
$ sudo service kend status
```

如果服务未运行，请尝试重新启动。

```bash
$ sudo service kend restart
```

如果服务重新启动且 EN 已成功启动，则可在路径 `/var/kend/logs/kend.out`中查看日志。

```bash
$ tail -f /var/kend/logs/kend.out
```

Kaia 提供一个 CLI 客户端 "ken console"。 您可以通过多个端点使用 "ken 控制台 "与 Kaia 节点交互，其中一个选项是使用 IPC（进程间通信）。 IPC 文件 `klay.ipc` 位于 EN 的 `DATA_DIR` 路径下，在我们的例子中为 `/var/kend/data`。 因此，为了使用 `ken console`：

```bash
$ sudo ken attach --datadir /var/kend/data
欢迎访问 Kaia JavaScript 控制台！

 instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
  datadir：/var/kend/data
  modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

### 等待区块同步

由于 AMI 是几小时前创建的，我们需要一些时间来同步到最新区块。 您可以在 "ken 控制台 "中查看当前同步的区块编号和同步进度。

```js
> klay.blockNumber
165227166
> klay.syncing
{
  currentBlock: 165227166,
  highestBlock: 165357203,
  knownStates：0,
  pulledStates：0,
  startingBlock: 165222272
}
```

块同步完成后，查询同步进度应返回 `false`。

```js
> klay.syncing
false
```
