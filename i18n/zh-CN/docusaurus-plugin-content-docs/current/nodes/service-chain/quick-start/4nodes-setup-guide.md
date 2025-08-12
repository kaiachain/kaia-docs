# 安装 4 节点服务链

本节介绍如何设置多节点 ServiceChain。 我们将建立一个 4 个共识节点的 ServiceChain，"chainID "为 1002，如下图中蓝色边框所示。

![](/img/nodes/sc-4scn-arch.png)

## 先决条件<a id="prerequisites"></a>

- 从 [Download](../../downloads/downloads.md) 下载 `kscn`、`homi` 二进制软件包。
- 4 台 Linux 或 MacOS 服务器
- 最低硬件要求
  - CPU: 4-core (Intel Xeon or equivalent), RAM: 16GB, HDD: 50GB
  - 更多解释请参阅 [系统要求](../system-requirements.md)。

## 步骤 0：在所有节点上安装 SCN<a id="install-scn"></a>

安装就是解压缩下载的软件包。 在每台服务器上提取 SCN 存档。

```console
$ tar xvf kscn-vX.X.X-XXXXX-amd64.tar.gz
x kscn-XXXXX-amd64/
x kscn-XXXXX-amd64/conf/
x kscn-XXXXX-amd64/conf/kscnd.conf
x kscn-XXXXX-amd64/bin/
x kscn-XXXXX-amd64/bin/kscnd
x kscn-XXXXX-amd64/bin/kscn
```

为方便起见，我们将在 $PATH中添加二进制路径。 使用节点上的实际路径。

```console
$ export PATH=$PATH:~/path/to/kscn-XXXXX-amd64/bin
```

SCN 还提供各种 RPM 发行版，如 RHEL、CentOS 和 Fedora。 有关详细信息，请参阅 [安装](../install-service-chain.md#installation)。

```console
$ curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/prod.repo
  % Total % Received % Xferd Average Speed Time Time Time Current Dload Upload Total Spent Left Speed
     100 118 100 118 0 0 1113 0 --:--:-- --:--:-- --:--:-- 1102 

$ yum list | grep kaia 
packages-klaytn-prod 31 kB/s | 2.9 kB 00:00 
homi.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kbnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kend.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kend-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kgen.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kscnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
ksend.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
kspnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 

$ yum install kscnd
```

## 第 1 步：创建 genesis.json 和节点密钥<a id="step-1-create-genesis-json-and-a-key"></a>

我们将使用 homi 工具生成所需的文件。
homi "是一种实用工具，可自动生成脚本、配置文件和私钥，以配置 Kaia 区块链。
你可以在任何 Linux/Mac 电脑上执行 homi。

首先，解压缩下载的 homi 压缩包。

```console
$ tar xvf homi-vX.X.X-XXXXX-amd64.tar.gz
x homi-XXXXX-amd64/
x homi-XXXXX-amd64/bin/
x homi-XXXXX-amd64/bin/homi
```

转到 `bin` 文件夹，使用以下选项执行 `homi` 以生成文件。
`homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output`
由于 Kairos 的 "chainID "是 1001，为方便起见，本例中构建的 ServiceChain 的 "chainID "设置为 1002。 通过启动实际服务运行区块链时，建议在 https://chainlist.defillama.com/ 注册新的 chainID 值后使用，这样 chainID 就不会与其他 ServiceChain 重叠。 ServiceChain 端口设置为 22323，这是默认端口。

```console
$ ./homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/keys/passwd2
Created :  homi-output/keys/passwd3
Created :  homi-output/keys/passwd4
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/keys/nodekey2
Created :  homi-output/keys/validator2
Created :  homi-output/keys/nodekey3
Created :  homi-output/keys/validator3
Created :  homi-output/keys/nodekey4
Created :  homi-output/keys/validator4
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/keys_test/testkey1
Created :  homi-output/keys_test/keystore1/0xdC7218621513f71d609653d22C39d79d558d9CDC
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```

在输出结果中，我们将在后续步骤中使用`nodekey*`、`genesis.json`和`static-nodes.json`。

## 第 2 步：自定义 static-nodes.json<a id="step-2-customize-static-nodes-json"></a>

在文本编辑器中打开 `homi-output/scripts/static-nodes.json`，然后用节点的实际值更新 IP 地址和端口。
在本例中，假设服务链中每个 SCN 节点的 IP 如下图所示。 请记住您在此处分配的端口，因为稍后在第 4 步中会用到它。

![](/img/nodes/sc-4scn-ip.png)

```json
[
     "kni://38693ad4b17ff77...23153@192.168.0.1:22323?discport=0\u0026ntype=cn",
     "kni://f36d969b16f7337...1329b@192.168.0.2:22323?discport=0\u0026ntype=cn",
     "kni://16e55d8921ab034...b2bec@192.168.0.3:22323?discport=0\u0026ntype=cn",
     "kni://0973e792a421c1d...bbd71@192.168.0.4:22323?discport=0\u0026ntype=cn"
]
```

更新`static-nodes.json`后，将输出文件夹（`homi-output`）上传到所有 SCN，即 本例中的 SCN-L2-01、SCN-L2-02、SCN-L2-03、SCN-L2-04 节点。

```console
$ scp -r path/to/homi-output/ user@192.168.0.1:~/
$ scp -r path/to/homi-output/ user@192.168.0.2:~/
$ scp -r path/to/homi-output/ user@192.168.0.3:~/
$ scp -r path/to/homi-output/ user@192.168.0.4:~/
```

## 步骤 3：节点初始化<a id="step-3-node-initialization"></a>

现在，我们将使用创世文件初始化每个节点。 在每个节点上执行以下命令。
它会在你的主目录下创建数据文件夹，存储链数据和日志。
您可以使用 `--datadir` 指令更改数据文件夹。
在本例中，我们将数据文件夹设置为 `\~/data`。

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json

$ ls ~/data
keystore	klay		kscn
```

## 步骤 4：安装 `nodekey` 和 \`static-nodes.json<a id="step-4-install-nodekey"></a>

在每个 SCN 上，将 `static-nodes.json` 复制到数据文件夹。

```console
$ cp ~/homi-output/scripts/static-nodes.json ~/data/
```

在步骤 1 中，我们生成了 4 个节点密钥。
将每个节点密钥分配给 SCN，并将匹配的 "节点密钥 "复制到每个 SCN 的数据文件夹中。
例如，SCN-L2-01（192.168.0.1）节点使用 `nodekey1`，SCN-L2-02（192.168.0.2）、SCN-L2-03（192.168.0.3）和 SCN-L2-04（192.168.0.4）节点分别使用 `nodekey2`、`nodekey3` 和 `nodekey4`。

```console
$ cp ~/homi-output/keys/nodekey{1..4} ~/data/klay/nodekey
```

![](/img/nodes/sc-4scn-nodekey.png)

## 步骤 5：配置节点<a id="step-5-configure-nodes"></a>

在每个 SCN 上，进入 kscn 安装文件夹并按如下方式编辑 `conf/kscnd.conf`。 端口 "是用于设置 "homi "的端口，"SC_SUB_BRIDGE "是下一节连接网桥时所需的。 目前，只需将其设置为 0。 在 `DATA_DIR` 中，输入步骤 3 中使用的数据文件夹。

```
...
PORT=22323
...
SC_SUB_BRIDGE=0
...
DATA_DIR=~/data
...
```

## 步骤 6：启动节点<a id="step-6-start-nodes"></a>

在所有 SCN 节点上执行以下命令。

```console
$ kscnd start
Starting kscnd: OK
```

您可以通过查看 `kaia.blockNumber` 来检查区块生成状态。 如果该数字不为 0，则说明节点工作正常。

```console
$ kscn attach --datadir ~/data
> kaia.blockNumber
10
```

如果要停止一个节点，可以使用命令 `kscnd stop` 来完成。

## (示例）创建和确认价值转移交易<a id="example-creation-and-confirmation-of-a-value-transfer-transaction"></a>

现在，4 节点 ServiceChain 已开始运行。 我们将在服务链中执行价值转移交易，以确认安装。

![](/img/nodes/sc-4scn-test.png)

### 第 1 步：导入测试账户<a id="step-1-import-the-test-account"></a>

testkey1 "由步骤 1 中的 "homi "自动生成。 KAIA 已分配给测试账户，如 `genesis.json` 中所述，该账户也是由 `homi` 生成的。

```console
$ kscn account import --datadir ~/data ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```

### 步骤 2：解锁账户<a id="step-2-unlock-the-account"></a>

只有通过导入`testkey1`的 SCN 节点的控制台才能解锁账户。

```console
$ kscn attach --datadir ~/data
> personal.unlockAccount("80119c31cdae67c42c8296929bb4f89b2a52cec4")
Unlock account 80119c31cdae67c42c8296929bb4f89b2a52cec4
Passphrase:
true
```

### 步骤 3：发送交易并查看余额<a id="step-3-send-a-transaction-and-check-the-balance"></a>

```console
> kaia.sendTransaction({from: "80119c31cdae67c42c8296929bb4f89b2a52cec4", to: "305c6cc464d5fe1e624679695a20d641a01688e1", value: 10})
"0xa0e7102e8f14200cec8d964aacc1c9ed7c22271078b2b213170c64333cbca8a3"
> kaia.getBalance("305c6cc464d5fe1e624679695a20d641a01688e1")
10
```

:::note

服务链的最简单形式是只有一个 SCN。
本教程中说明的 ServiceChain 是一个 4 节点 ServiceChain。 不过，如果您愿意，也可以建立单节点 ServiceChain。
只需在 "步骤 1：创建 genesis.json 和 nodekeys "中向 homi 传递"--cn-num 1"，而不是"--cn-num 4"。

至少需要 4 个节点才能容许拜占庭故障。 因此，在 BFT 算法下，实现高可用性的 SCN 数量最少为 4。 仅有 2 个 SCN 节点是不够的，因为如果其中一个 SCN 出现故障，另一个 SCN 就无法独立达成共识。

:::
