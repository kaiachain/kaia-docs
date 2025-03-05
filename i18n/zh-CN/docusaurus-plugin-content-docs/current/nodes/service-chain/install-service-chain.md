# 安装服务链

## 预期受众<a id="intended-audience"></a>

- 希望为 Metaverse、GameFi 和 NFT 构建区块链的公司
- 需要高 TPS、最低交易费用和数据隐私的 dApp 开发人员。
- 任何想建立本地专用网络或分类账数据库进行测试的人。

## 服务链概述<a id="service-chain-overview"></a>

ServiceChain 是企业级区块链，可满足企业对价值转移、安全性、高性能和定制化等方面的要求。 Kaia ServiceChain 提供以下功能：

- 即时终局
- Kaia 链之间的令牌转移
- 数据锚定到主链，以确保数据完整性
- 满足企业级安全要求的多重签名桥接合同

![](/img/nodes/sc-overview.png)

请阅读 [Kaia 扩展解决方案](../../learn/scaling-solutions.md) 了解有关 ServiceChain 的更多详情。 以下视频将帮助您了解 Kaia ServiceChain。

- [通过 Kaia 服务链实现横向扩展 | TXGX 2019](https://www.youtube.com/watch?v=8yQc5FQysJc)
- [Kaia 服务链的高可用性架构 | TXGX 2019](https://www.youtube.com/watch?v=HcdhWtXPuR0)

## 下载<a id="download"></a>

您可以在[下载页面](../downloads/downloads.md)中获取 SCN、SPN 和 SEN 的软件包。

## 安装<a id="installation-guide"></a>

本章介绍 \*\* 服务链共识节点（SCN\ ）\*\* 的安装。

### Linux 档案分发版<a id="linux-archive-distribution"></a>

服务链共识节点的归档文件具有以下目录布局。

| 文件名称                            | 文件说明          |
| :------------------------------ | :------------ |
| bin/kscn                        | SCN 可执行文件     |
| bin/kscnd                       | SCN 启动/终止脚本文件 |
| conf/kscnd.conf | SCN 配置文件      |

homi 二进制文件的归档文件目录布局如下。

| 文件名称     | 文件说明       |
| :------- | :--------- |
| bin/homi | HOMI 可执行文件 |

安装就是解压缩下载的软件包。

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

### RPM 发行版（RHEL/CentOS/Fedora\）<a id="rpm-rhel-centos-fedora"></a>

您可以使用以下 `yum` 命令安装下载的 RPM 文件。

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### 安装位置<a id="scn-configuration"></a>

Kaia Linux 软件包由可执行二进制文件和配置文件组成，结构如下。

| 文件名称                       | 地点                                         |
| :------------------------- | :----------------------------------------- |
| kscn                       | /usr/bin/kscn                              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi                       | /usr/bin/homi                              |

## 配置<a id="configuration"></a>

本页介绍如何配置 SCN 以形成共识网络。

如果您安装了存档发行版，您可以在解压存档的目录中找到二进制文件和配置文件。 下面是执行命令的示例。

```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

在本教程中，我们不会总是指定命令的完整路径。

### 创建创世纪文件<a id="creation-of-a-genesis-file"></a>

首先，你应该为自己的服务链创建一个 genesis 文件和一个 nodekey 文件。 您可以像下面这样使用 homi 创建它们。

```bash
$ homi setup --gen-type local --cn-num 1 --servicechain -o ./homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```

以下是 genesis 文件和 nodekey 文件的示例。

```bash
$ cat homi-output/scripts/genesis.json
{
    "config": {
        "chainId": 1000,
        "istanbul": {
            "epoch": 3600,
            "policy": 0,
            "sub": 22
        },
        "unitPrice": 0,
        "deriveShaImpl": 2,
        "governance": null
    },
    "timestamp": "0x5dca0732",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad594f8690562c0839c44b17af421f7aaaa9f12dcc62bb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "f8690562c0839c44b17af421f7aaaa9f12dcc62b": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}   
```

```bash
$ cat homi-output/keys/nodekey1                                                                                                                                 
0c28c77ce5c2ca9e495b860f190ed7dfe7bd5c1a2e5f816587eb4d3d9566df44
```

请更改 genesis 文件中的 chainID。 使用自己的号码，防止重放攻击。
(请勿在 Kaia Mainnet (8217) 和 Kairos (1001) 中使用相同的链 ID）

如果需要，可以通过编辑 genesis 文件中的 `"alloc"`，更改预先资助的地址。
(您可以在 [Genesis JSON](../service-chain/configure/genesis.md) 中找到更多细节）。

### 创建 SCN 数据目录<a id="scn-data-directory-creation"></a>

考虑到 Kaia 区块链数据的大小不断增加，建议使用足够大的存储空间。
您可以在所需路径上创建数据目录。
在本文档中，我们创建 `~/kscnd_home` 作为数据目录。

```bash
$ mkdir -p ~/kscnd_home
```

#### 创世区块的初始化<a id="initialization-of-a-genesis-block"></a>

之后，就可以用创世文件初始化数据目录了。
在启动服务链节点之前，有必要使用 `kscn` 和 `genesis.json` 初始化服务链网络的创世块。

```bash
$ kscn init --datadir ~/kscnd_home homi-output/scripts/genesis.json
  WARN[11/12,10:13:58 +09] [19] Some input value of genesis.json have been set to default or changed
  INFO[11/12,10:13:58 +09] [18] Setting connection type                   nodetype=cn conntype=0
    ...
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [5] Writing custom genesis block
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [47] Persisted trie from memory database       updated nodes=1 updated nodes size=80.00B time=304.931µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
  INFO[11/12,10:13:59 +09] [19] Successfully wrote genesis state          database=lightchaindata hash=0xc269669079fc8c06ac37435a563b8ed8ef273c1c835f3d823d2e586315319aa8
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/header
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/body
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/receipts
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/0
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/1
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/2
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/3
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/txlookup
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/misc
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/bridgeservice
```

#### 安装 nodekey<a id="install_nodekey"></a>

将 `homi-output/keys/nodekey1` 复制到 SCN 数据目录下的 `kaia` 目录，如下所示。

```bash
$ cp homi-output/keys/nodekey1  ~/kscnd_home/klay/nodekey
```

### SCN 的配置<a id="configuration-of-the-scn"></a>

kscnd.conf "是 SCN 的配置文件。

假设 SCN 使用默认端口，并将大规模分区挂载到 `~/kscnd_home` 上。
在默认的 `kscnd.conf` 文件中，`SC_SUB_BRIDGE` 选项已禁用，`DATA_DIR` 为空。

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```

您可以启用 `SC_SUB_BRIDGE` 来使用锚定/值传输功能。
此外，还应如下设置 DATA_DIR。

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

如果需要，您还可以进一步修改其他选项，定制您的服务链。
否则，现在就可以完成配置，使用默认配置运行服务链了。

## 启动/停止 SCN<a id="starting-stopping-scn"></a>

根据安装类型，您可以使用以下 `systemctl` 或 `kscnd` 命令启动/停止 Kaia 服务。

**开始**

```bash
## when installed from rpm distribution 
$ systemctl start kscnd.service

## when installed using linux archive
$ kscnd start

```

**停止**

```bash
## when installed from rpm distribution 
$ systemctl stop kscnd.service

## when installed using linux archive
$ kscnd stop

```

**状态**

```bash
## when installed from rpm distribution 
$ systemctl status kscnd.service

## when installed using linux archive
$ kscnd status

```

## 检查节点状态<a id="checking-node-status"></a>

### 进程状态<a id="process-status"></a>

可以使用状态命令 `systemctl` 和 `kscnd` 检查 SCN 进程的状态。

#### systemctl <a id="systemctl"></a>

systemctl "与 RPM 一起安装，可通过以下方式检查 SCN 的状态。

```bash
$ systemctl status kscnd.service
● kscnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kscnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kscnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kscn)
   CGroup: /system.slice/kscnd.service
           └─29641 /usr/local/bin/kscn --networkid 1000 --datadir ~/kscnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kscnd[29636]: Starting kscnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

您可以查看当前状态，如上面例子中的 "Active: active (running)"。

#### kscnd <a id="kscnd"></a>

kscnd "与软件包一起安装，可通过以下方式检查 SCN 的状态。

```bash
$ kscnd status
kscnd is running
```

### 日志<a id="logs"></a>

日志存储在位于 `kscnd.conf` 文件中 `LOG_DIR` 字段定义的路径下的 `kscnd.out` 文件中。 当节点正常工作时，可以看到每个区块每秒的导入情况如下。

例如

```bash
$ tail -F ~/kscnd_home/logs/kscnd.out
  INFO[11/12,10:19:09 +09] [49] Successfully wrote mined block            num=11 hash=03da06…f194b0 txs=0
  INFO[11/12,10:19:09 +09] [49] Commit new mining work                    number=12 txs=0 elapsed=236.972µs
  INFO[11/12,10:19:10 +09] [24] Committed                                 number=12 hash=470aca…be4fdf address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:10 +09] [49] Successfully sealed new block             number=12 hash=470aca…be4fdf
  INFO[11/12,10:19:10 +09] [49] Successfully wrote mined block            num=12 hash=470aca…be4fdf txs=0
  INFO[11/12,10:19:10 +09] [49] Commit new mining work                    number=13 txs=0 elapsed=198.221µs
  INFO[11/12,10:19:11 +09] [24] Committed                                 number=13 hash=95e4a3…14e50f address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:11 +09] [49] Successfully sealed new block             number=13 hash=95e4a3…14e50f
  INFO[11/12,10:19:11 +09] [49] Successfully wrote mined block            num=13 hash=95e4a3…14e50f txs=0
  INFO[11/12,10:19:11 +09] [49] Commit new mining work                    number=14 txs=0 elapsed=220.004µs
  INFO[11/12,10:19:12 +09] [24] Committed                                 number=14 hash=dcd2bc…b2aec0 address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
```

### 查询<a id="queries"></a>

#### kscn 控制台<a id="kscn-console"></a>

Kaia 提供一个 CLI 客户端："kscn console"。 使用客户端的另一种方法是通过 IPC（进程间通信）连接进程。 IPC 文件 `klay.ipc` 位于 SCN 上的 `DATA_DIR` 路径中。

请执行以下命令并查看结果。

```text
$ kscn attach --datadir ~/kscnd_home
欢迎访问 Kaia JavaScript 控制台！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

您可以在 [API 文档](../../../references/json-rpc/klay/account-created)中查看可用命令。

用于检查 SCN 状态的实用 API：

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
4
```

上述命令行返回 SCN 所连接的节点数，主链中的 EN 除外。


