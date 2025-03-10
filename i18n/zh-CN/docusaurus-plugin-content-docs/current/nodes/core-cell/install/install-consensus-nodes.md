# 安装共识节点

## 下载

您可以在 [Download](../../downloads/downloads.md) 页面下载最新版本的 `kcn`。

## 安装

### Linux 档案分发版<a id="linux-archive-distribution"></a>

存档文件由可执行二进制文件和配置文件组成，结构如下。

**注意**：请勿更改文件结构或文件名。 如果更改，节点可能无法正常运行。

```text
- bin
  |- kcn
  |- kcnd
- conf
  |- kcnd.conf
```

| 文件名称                           | 文件说明         |
| :----------------------------- | :----------- |
| bin/kcn                        | CN 可执行文件     |
| bin/kcnd                       | CN 启动/终止脚本文件 |
| conf/kcnd.conf | CN 配置文件      |

安装是将下载的软件包解压缩，然后安装到您想要安装的位置。

```bash
$ tar zxf kcn-vX.X.X-linux-amd64.tar.gz
```

或者

```bash
$ tar zxf kcn-baobab-vX.X.X-linux-amd64.tar.gz
```

**注意**：建议在环境变量 "$PATH"中添加解压缩目录 "kcn-linux-amd64/bin "路径，以便全局运行 "kcn "和 "kcnd"。 举个例子

```bash
$ export PATH=$PATH:~/downloaded/path/kcn-linux-amd64/bin
```

其他部分假定路径已添加到变量中。

### RPM 发行版\(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

您可以使用以下 `yum` 命令安装下载的 RPM 文件。

```bash
$ yum install kcnd-vX.X.X.el7.x86_64.rpm
```

或者

```bash
$ yum install kcnd-baobab-vX.X.X.el7.x86_64.rpm
```

### 从 Kaia Yum Repo 安装<a id="install-from-kaia-yum-repo"></a>

或者，您也可以从 Kaia Yum 软件仓库安装 `kcnd`，然后运行

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kcnd
```

### 安装位置<a id="installed-location"></a>

安装文件的位置如下

| 文件名称                      | 地点                                       |
| :------------------------ | :--------------------------------------- |
| kcn                       | /usr/bin/kcn                             |
| kcnd.conf | /etc/kcnd/conf/kcnd.conf |

## 配置<a id="configuration"></a>

CN 配置是在配置文件 `kcnd.conf` 中创建一个数据目录并设置几个值。

1. 创建 CN 数据目录。
2. 安装节点密钥
3. 使用 `kcnd.conf` 配置 CN。

### 创建 CN 数据目录<a id="cn-data-directory-creation"></a>

考虑到 Kaia 区块链数据的大小一直在增加，建议使用足够大的存储空间。 您可能需要在所需路径上创建该目录。

```bash
$ mkdir -p /var/kcnd/data
```

### 安装节点密钥<a id="install-node-key"></a>

要运行一个 CN，需要一个 "节点密钥"。 如果您没有 KCN 二进制文件，KCN 将为您创建一个新文件。 如果有，则需要将 `nodekey` 放入 CN 数据目录。 安装前](./before-you-install.md) "部分介绍了创建 "节点密钥 "的方法。 以下命令行会将 `nodekey` 复制到 CN 数据目录。

```bash
$ cp nodekey /var/kcnd/data
```

### 更新配置文件<a id="update-the-configuration-file"></a>

配置文件位置：

- 对于存档发行版，配置目录位置默认为 `$INSTALL_PATH/kcn-linux-amd64/conf/`。
- 对于软件包发行版，配置目录默认为 `/etc/kcnd/conf/`。

#### 添加数据目录 <a id="add-data-directory"></a>

您应更新配置文件 `kcnd.conf` 中的数据目录环境变量 `$DATA_DIR`。

```text
...
DATA_DIR=/var/kcnd/data
...
```

#### 设置 Rewardbase<a id="setup-rewardbase"></a>

作为参与 Kaia 网络共识的回报，CN 运营商将获得 KAIA。 因此，需要在配置文件 `kcnd.conf` 中设置地址。

创建新账户的方法多种多样，但 "kcn "也提供了相关功能。 您可以使用以下命令查看帮助信息。

```bash
$ kcn account new --help
```

该程序的一个示例如下。 首先，您需要创建一个新账户，奖励 KAIA 将发送到该账户。

```bash
$ kcn account new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KAIA=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {d13f7da0032b1204f77029dc1ecbf4dae2f04241}
```

因此，它会在你定义的路径上创建相关的密钥存储。 接下来，您需要将创建的地址放入文件 `kcnd.conf` 中，如下所示。

```text
...
REWARDBASE="d13f7da0032b1204f77029dc1ecbf4dae2f04241"
...
```

请记住，您创建的密钥存储和密码非常重要，因此必须小心管理。 有关 `kcnd.conf` 的更多详情，请参阅[配置文件](../../../misc/operation/configuration.md) 部分。

### (可选）下载 Chaindata 快照

从创世区块进行同步操作非常耗时。 您可以使用 [Chaindata Snapshot](../../../misc/operation/chaindata-snapshot.md) 跳过 [Full Sync](../../../learn/storage/block-sync.md#full-sync) 过程。

## 启动 CN<a id="startup-the-cn"></a>

### CN 启动/停止 <a id="cn-start-stop"></a>

您可以使用以下 "systemctl "命令启动/停止 Kaia 服务。

**注意**：这需要 root 权限。

**开始**

```bash
$ systemctl start kcnd.service

```

**停止**

```bash
$ systemctl stop kcnd.service

```

**状态**

```bash
$ systemctl status kcnd.service

```

### 故障排除<a id="troubleshooting"></a>

如果您遇到以下错误

```bash
Failed to start kcnd.service: Unit not found.
```

使用以下命令重新加载 systemd 管理器配置。

```bash
$ systemctl daemon-reload
```

### 导出 BLS 公钥信息<a id="export-bls-public-key-info"></a>

如果网络已经或将要激活 Randao 硬分叉，则每个 CN 维护者必须向 [KIP-113 智能合约](https://kips.kaia.io/KIPs/kip-113) 提交其 BLS 公钥信息。

BLS 公钥信息可通过节点密钥计算得出。 要提取它，首先要启动节点。 然后使用命令

```
$ kcn account bls-info --datadir /var/kcnd/data
```

因此，将创建 `bls-publicinfo-NODEID.json` 文件。

## 测试核心单元<a id="testing-the-core-cell"></a>

现在要检查的是 Core Cell 是否已成功安装，以及安装后是否按预期运行。

### 进程状态<a id="process-status"></a>

可以使用状态命令 `systemctl` 和 `kcnd` 检查 CN 进程的状态。

#### systemctl <a id="systemctl"></a>

systemctl "与 RPM 一起安装，可通过以下方式检查 CN 的状态。

```bash
$ systemctl status kcnd.service
● kcnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kcnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kcnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kcn)
   CGroup: /system.slice/kcnd.service
           └─29641 /usr/local/bin/kcn --networkid 1000 --datadir /kcnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kcnd[29636]: Starting kcnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

您可以查看当前状态，例如上例中的 "Active: active (running)"。

#### kcnd <a id="kcnd-kpnd"></a>

kcnd "与软件包一起安装，CN 的状态可通过以下方式检查。

```bash
$ kcnd status
kcnd is running
```

### 日志<a id="logs"></a>

日志存储在 `kcnd.out` 文件中，该文件位于 `kcnd.conf` 文件中 `LOG_DIR` 字段定义的路径下。 当节点正常运行时，可以看到每秒创建的每个区块如下所示。

例如

```bash
$ tail kcnd.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work                    number=11572927 txs=0 elapsed=483.436µs
```

### 控制台<a id="kcn-console-kpn-console"></a>

Kaia 提供一个 CLI 客户端："kcn console"。 不过，出于安全考虑，CN 可能会禁用客户端的 RPC 接口。 使用客户端的另一种方法是通过 IPC（进程间通信）连接进程。

IPC 文件 `klay.ipc` 位于 CN 上的 `DATA_DIR` 路径中。

请执行以下命令并查看结果。

```bash
$ ken attach --datadir /var/kend/data
欢迎访问 Kaia JavaScript 控制台！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir：/var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

您可以在 [API 文档](../../../../references/json-rpc/klay/account-created)中查看可用命令。

用于检查 CN 状态的实用 API：

- kaia.blockNumber\`（获取最新的区块编号）
- net.peerCount"（获取当前连接的 Kaia 节点数量）

#### kaia.blockNumber <a id="kaia-blocknumber"></a>

您可以根据节点类型获取最新的区块编号，查看区块是否已正确创建（对于 CN）或传播（对于 CN 和 PN）。

```javascript
> kaia.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```javascript
> net.peerCount
14
```

上述命令行会根据节点类型返回不同的值。

- CN：连接的 CN 个数 + 连接的 PN 个数。
- PN：连接的 CN 数 + 连接的 PN 数 + 连接的 EN 数。