# 安装端点节点

## 下载<a id="download"></a>

您可以在 [Download](../downloads/downloads.md) 页面下载最新版本的 EN。

## 安装

### Linux 档案分发版<a id="linux-archive-distribution"></a>

存档文件由可执行二进制文件和配置文件组成，结构如下。

**注意**：请勿更改文件结构或文件名。 如果更改，节点可能无法正常运行。

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| 文件名称                           | 文件说明         |
| :----------------------------- | :----------- |
| bin/ken                        | EN 可执行文件     |
| bin/kend                       | EN 启动/终止脚本文件 |
| conf/kend.conf | EN 配置文件      |

安装是将下载的软件包解压缩，然后安装到您想要安装的位置。

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

或者

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**注意**：建议在环境变量 `$PATH` 中添加解压缩目录 `ken-linux-amd64/bin` 路径，以便全局运行 `ken` 和 `kend`。 举个例子

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

其他部分假定路径已添加到变量中。

### RPM 发行版 \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

您可以使用以下 `yum` 命令安装下载的 RPM 文件。

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

或者

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### 从 Kaia Yum Repo 安装<a id="install-from-kaia-yum-repo"></a>

或者，也可以从 Kaia Yum 软件仓库安装 `kend`，然后运行

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kend
```

或

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/9-stream/kaia.repo && sudo yum install kend
```

### 安装位置<a id="installed-location"></a>

安装文件的位置如下

| 文件名称                      | 地点                                       |
| :------------------------ | :--------------------------------------- |
| ken                       | /usr/bin/ken                             |
| kend.conf | /etc/kend/conf/kend.conf |

## 配置<a id="configuration"></a>

EN 配置是创建一个数据目录，并在配置文件 `kend.conf` 中设置环境变量。

1. 创建 EN 数据目录。
2. 使用 `kend.conf` 配置 EN。

### EN 数据目录创建<a id="en-data-directory-creation"></a>

考虑到 Kaia 区块链数据的大小不断增加，建议使用足够大的存储空间。 您需要在所需路径上创建目录。

```text
$ sudo mkdir -p /var/kend/data
```

### 更新配置文件<a id="update-the-configuration-file"></a>

配置文件位置：

- 对于存档发行版，配置目录位置默认为 `$INSTALL_PATH/ken-linux-amd64/conf/`。
- 对于软件包发行版，配置目录默认为 `/etc/kend/conf/`。

#### 添加数据目录 <a id="add-data-directory"></a>

您应更新配置文件 `kend.conf` 中的数据目录环境变量 `$DATA_DIR`。

```text
DATA_DIR=/var/kend/data
```

### (可选）下载 Chaindata 快照

从创世区块进行同步非常耗时。 您可以使用 [Chaindata Snapshot](../../misc/operation/chaindata-snapshot.md) 跳过 [Full Sync](../../learn/storage/block-sync.md#full-sync) 过程。

## 启动 EN<a id="startup-the-en"></a>

您可以使用以下命令启动或停止端点节点。

**开始**

```bash
$ kend start
Starting kend: OK
```

**停止**

```bash
$ kend stop
Shutting down kend: Killed
```

**状态**

```bash
$ kend status
kend is running
```

## 测试安装<a id="testing-the-installation"></a>

现在是检查端点节点是否安装成功以及安装后是否按预期运行的时候了。

### 进程状态<a id="process-status"></a>

可以使用状态命令 `systemctl` 和 `kend` 检查 EN 进程的状态。

#### systemctl <a id="systemctl"></a>

systemctl "与 RPM 一起安装，可通过以下方式检查 EN 的状态。

```bash
$ systemctl status kend.service
● kend.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kend; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kend start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (ken)
   CGroup: /system.slice/kend.service
           └─29641 /usr/local/bin/ken --networkid 1000 --datadir /kend_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kend[29636]: Starting kend: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

您可以查看当前状态，如上面例子中的 "Active: active (running)"。

#### kend <a id="kend"></a>

kend "与软件包一起安装，EN 的状态可通过以下方式检查。

```bash
$ kend status
kend 正在运行
```

### 日志<a id="logs"></a>

日志存储在位于`kend.conf`文件中`LOG_DIR`字段所定义路径下的`kend.out`文件中。 当节点正常工作时，可以看到每个区块每秒的导入情况如下。

例如

```bash
$ tail kend.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work      
```

### 查询<a id="queries"></a>

#### 控制台<a id="ken-console"></a>

Kaia 提供一个 CLI 客户端："ken console"。 使用客户端的另一种方法是通过 IPC（进程间通信）连接进程。 IPC 文件 `klay.ipc` 位于 EN 的 `DATA_DIR` 路径下。

请执行以下命令并查看结果。

```text
$ ken attach --datadir /var/kend/data
欢迎访问 Kaia JavaScript 控制台！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir：/var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

您可以在 [API 文档](../../../references/json-rpc/klay/account-created)中查看可用命令。

用于检查 EN 状态的实用 API：

- kaia.blockNumber\`（获取最新的区块编号）
- net.peerCount"（获取当前连接的 Kaia 节点数量）

#### kaia.blockNumber<a id="kaia-blocknumber"></a>

您可以获取最新的区块编号，查看区块是否正常传播。

```text
> kaia.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
14
```

上述命令行返回 EN 所连接的节点数。

