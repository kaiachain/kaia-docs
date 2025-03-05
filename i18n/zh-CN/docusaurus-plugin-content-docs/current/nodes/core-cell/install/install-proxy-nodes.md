# 安装代理节点

## 下载

您可以在 [Download](../../downloads/downloads.md) 页面下载最新版本的 `kpn`。

## 安装<a id="installation"></a>

### Linux 档案分发版<a id="linux-archive-distribution"></a>

存档文件由可执行二进制文件和配置文件组成，结构如下。

**注意**：请勿更改文件结构或文件名。 如果更改，节点可能无法正常运行。

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| 文件名称                           | 文件说明         |
| :----------------------------- | :----------- |
| bin/kpn                        | PN 可执行文件     |
| bin/kpnd                       | PN 启动/终止脚本文件 |
| conf/kpnd.conf | PN 配置文件      |

安装是将下载的软件包解压缩，然后安装到您想要安装的位置。

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

或者

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**注意**：建议在环境变量 `$PATH` 中添加解压缩目录 `kpn-linux-amd64/bin` 路径，以便全局运行 `kpn` 和 `kpnd`。 举个例子

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

其他部分假定路径已添加到变量中。

### RPM 发行版\(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

您可以使用以下 `yum` 命令安装下载的 RPM 文件。

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

或者

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### 从 Kaia Yum Repo 安装<a id="install-from-kaia-yum-repo"></a>

或者，也可以从 Kaia Yum 软件仓库安装 `kpnd`，运行

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kpnd
```

### 安装位置<a id="installed-location"></a>

安装文件的位置如下

| 文件名称                      | 地点                                       |
| :------------------------ | :--------------------------------------- |
| kpn                       | /usr/bin/kpn                             |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |

## 配置<a id="configuration"></a>

PN 配置是在配置文件 `kpnd.conf` 中创建一个数据目录并设置几个值。

1. 创建 PN 数据目录
2. 安装节点密钥
3. 安装 \`static-node.json
4. 使用 `kpnd.conf` 配置 PN。

### 创建 PN 数据目录<a id="pn-data-directory-creation"></a>

考虑到 Kaia 区块链数据的大小一直在增加，建议使用足够大的存储空间。 您可能需要在所需路径上创建该目录。

```bash
$ mkdir -p /var/kpnd/data
```

### 安装节点密钥<a id="install-node-key"></a>

要操作 PN，需要一个 "节点密钥"。 如果您没有 KPN 二进制文件，KPN 将为您创建一个新文件。 如果您有，则需要将您的 `nodekey` 放入 PN 数据目录。 创建 "节点密钥 "的方法在"[安装前](./before-you-install.md) "部分。 以下命令行会将 `nodekey` 复制到 PN 数据目录。

```bash
$ cp nodekey /var/kpnd/data
```

### 安装 \`static-nodes.json<a id="install-static-nodes-json"></a>

应通过 PN 操作符创建 `static-nodes.json` 文件。 它包含 PN 所连接的地址。 建议添加地址，包括您的 CN 和另一个核心单元的 PN。 如需了解更多详情，请联系 Kaia 官方邮箱（"bootstrap@klaytn.com "为主网邮箱或 "baobab@klaytn.com "为 Kairos\ 邮箱）。

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

PN 的节点 URI 位于"[安装前](./before-you-install.md) "部分。 \注意：此 IP 地址不同于 CN 公共 IP。 以下命令行会将 `static-nodes.json` 文件复制到 PN 数据目录。

```bash
$ cp static-nodes.json /var/kpnd/data
```

### 更新配置文件<a id="update-the-configuration-file"></a>

配置文件位置：

- 对于存档发行版，配置目录位置默认为 `$INSTALL_PATH/kpn-linux-amd64/conf/`。
- 对于软件包发行版，配置目录默认为 `/etc/kpnd/conf/`。

#### 添加数据目录 <a id="add-data-directory"></a>

您应更新配置文件 `kpnd.conf` 中的数据目录环境变量 `$DATA_DIR`。

```text
...
DATA_DIR=/var/kpnd/data
...
```

### (可选）下载 Chaindata 快照

从创世区块进行同步操作非常耗时。 您可以使用 [Chaindata Snapshot](../../../misc/operation/chaindata-snapshot.md) 跳过 [Full Sync](../../../learn/storage/block-sync.md#full-sync) 过程。

## 启动 PN<a id="startup-the-pn"></a>

### PN 启动/停止 <a id="pn-start-stop"></a>

您可以使用以下 "systemctl "命令启动/停止 Kaia 服务。

**注意**：这需要 root 权限。

**开始**

```bash
$ systemctl start kpnd.service

```

**停止**

```bash
$ systemctl stop kpnd.service

```

**状态**

```bash
$ systemctl status kpnd.service

```

### 故障排除<a id="troubleshooting"></a>

如果您遇到以下错误

```bash
Failed to start kpnd.service: Unit not found.
```

使用以下命令重新加载 systemd 管理器配置。

```bash
$ systemctl daemon-reload
```

## 测试核心单元<a id="testing-the-core-cell"></a>

现在要检查的是 Core Cell 是否已成功安装，以及安装后是否按预期运行。

### 进程状态<a id="process-status"></a>

可以使用状态命令 `systemctl` 和 `kpnd` 检查 PN 进程的状态。

#### systemctl <a id="systemctl"></a>

`systemctl` 与 RPM 一起安装，可通过以下方式检查 PN 的状态。

```bash
$ systemctl status kpnd.service
● kpnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kpnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process：29636 ExecStart=/etc/rc.d/init.d/kpnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kpn)
   CGroup：/system.slice/kpnd.service
           └─29641 /usr/local/bin/kpn --networkid 1000 --datadir /kpnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]：启动（空）...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kpnd[29636]：Starting kpnd：[ OK ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]：Started (null).
```

您可以查看当前状态，例如上例中的 "Active: active (running)"。

#### kpnd <a id="kcnd-kpnd"></a>

kpnd "与软件包一起安装，可通过以下方式检查 PN 的状态。

```bash
$ kpnd status
kpnd is running
```

### 日志<a id="logs"></a>

日志存储在 `kpnd.out` 文件中，该文件位于 `kpnd.conf` 文件中 `LOG_DIR` 字段定义的路径下。 当节点正常运行时，可以看到每秒创建的每个区块如下所示。

例如

```bash
$ tail kpnd.out
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

### kpn 控制台<a id="kcn-console-kpn-console"></a>

Kaia 提供一个 CLI 客户端：`kpn console`。 不过，出于安全考虑，PN 可能会禁用客户端的 RPC 接口。 使用客户端的另一种方法是通过 IPC（进程间通信）连接进程。

IPC 文件 `klay.ipc` 位于 PN 上的 `DATA_DIR` 路径中。

请执行以下命令并查看结果。

```bash
 $ kpn attach --datadir /var/kpnd/data
 欢迎访问 Kaia JavaScript 控制台！

 instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 coinbase：0x67f68fdd9740fd7a1ac366294f05a3fd8df0ed40
 at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
  datadir：/var/kpnd/data
  modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

您可以在 [API 文档](../../../references/json-rpc/klay/account-created)中查看可用命令。

用于检查 PN 状态的实用 API：

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