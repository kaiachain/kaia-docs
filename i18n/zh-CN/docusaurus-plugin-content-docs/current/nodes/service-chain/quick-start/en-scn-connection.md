# 连接到凯洛斯

本节介绍如何将 4 节点 ServiceChain 网络连接到 Kairos 网络。
您将设置一个 Kairos EN，并将该 EN 与您的一个 SCN 连接起来。 然后启用锚定功能，将 ServiceChain 区块信息放到 Kairos 网络上。

![](/img/nodes/sc-en-scn-arch.png)

## 先决条件<a id="prerequisites"></a>

- 1 台用于 EN 的 Linux 或 MacOS 服务器
- 测试的最低硬件要求
   - 中央处理器4 核（英特尔至强或同级），内存：16GB，硬盘：50GB
   - 请参阅 [系统要求](../system-requirements.md) 了解更多信息。
- 下载 Kairos EN 可执行文件。 有关可下载二进制文件的完整列表，请参阅 [下载](../../downloads/downloads.md)。
- 假设和限制
   - 已安装并运行 ServiceChain 网络。 请参阅 [设置 4 节点服务链](4nodes-setup-guide.md) 设置网络。
   - A Kairos EN.
   - 一个 EN 只能连接一个 SCN，因为只支持一对一连接。
   - 每个 SCN 都不必连接 EN。

## 步骤 0：安装 Kairos EN<a id="install-kairos-en"></a>

安装就是解压缩下载的软件包。 提取 EN 服务器上的存档。

```bash
EN-01$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## 步骤 1：准备 genesis.json<a id="step-1-preparing-genesis-json"></a>

从 EN 服务器下载 `Kairos` 网络的 `genesis.json`。

```
EN-01$ curl -X GET https://packages.kaia.io/kairos/genesis.json -o ~/genesis.json
```

## 步骤 2：EN 节点初始化<a id="step-2-en-node-initialization"></a>

现在，我们将使用创世文件初始化 EN 节点。 执行以下命令
它会在你的主目录下创建数据文件夹，存储链数据和日志。
您可以使用 `--datadir` 指令更改数据文件夹。

```
EN-01$ ken init --datadir ~/data ~/genesis.json
```

## 步骤 3：配置 EN 节点<a id="step-3-configure-the-en-node"></a>

转到 ken 安装文件夹并重命名 `mv kend_baobab.conf kend.conf`，然后按如下方式编辑 `conf/kend.conf`。

```
...
NETWORK="baobab"
...
SC_MAIN_BRIDGE=1
...
DATA_DIR=~/data
...
```

## 步骤 4：启动 EN 节点<a id="step-4-start-the-en-node"></a>

```
EN-01$ kend start
Starting kscnd: OK
```

您可以通过查看 `kaia.blockNumber` 来检查块同步状态。 如果该数字不为 0，则说明节点工作正常。 根据网络条件和硬件性能，在 Kairos 网络上下载所有区块可能需要很长时间，因此我们建议使用 [Fast Sync](../../endpoint-node/install-endpoint-nodes.md#fast-sync-optional)来同步区块。

```
EN-01$ ken attach --datadir ~/data
> kaia.blockNumber
21073
```

如果要停止一个节点，可以使用命令 `kend stop` 来完成。

## 步骤 5：检查 EN 节点的 KNI<a id="step-5-check-kni-of-en-node"></a>

请注意 EN-01 的 KNI，这是用于从 SCN-L2-01 节点连接的信息。 该值将在下一步生成 `main-bridges.json` 时使用。

```
EN-01$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553...25bae@[::]:50505?discport=0"
```

![](/img/nodes/sc-en-scn-nodeInfo.png)

## 步骤 6：创建 main-bridges.json<a id="step-6-create-main-bridges-json"></a>

登录 SCN-L2-01（注意：不是 EN-01 节点）并在 `~/data` 上创建 `main-bridges.json` 。 用 EN-01 节点的 IP 地址替换位于`@`字母后的`[::]`。

```
SCN-L2-01$ echo '["kni://0f7aa6499553...25bae@192.168.1.1:50505?discport=0"]' > ~/data/main-bridges.json
```

## 第 7 步： 配置 SCN 然后重启 kscn<a id="step-7-configure-scn-then-restart-kscn"></a>

从 SCN-L2-01 节点的 shell 编辑 `kscn-XXXXX-amd64/conf/kscnd.conf`。
如果将 `SC_SUB_BRIDGE` 设置为 1，则 SCN-L2-01 节点启动时，数据锚定将自动开始。 在本例中，"SC_PARENT_CHAIN_ID "被设置为 1001，因为父链 Kairos 的 "chainID "是 1001。
SC_ANCHORING_PERIOD "参数决定向主链发送锚定 tx 的周期。 将该值设置为 10，就可以将节点配置为每 10 个区块执行一次锚定。 默认值为 1。

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

执行以下命令重启 kscn：

```
SCN-L2-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-01$ kscnd start
Starting kscnd: OK
```

通过检查 `subbridge.peers.length` 检查 SCN-L2-01 是否连接到 EN-01

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

## 锚定 <a id="anchoring"></a>

完成 EN-01 和 SCN-L2-01 连接后，您可以通过锚定功能在父链上记录 ServiceChain 块信息。
在本节中，您将充值父操作员账户、启用锚定功能并检查锚定的区块编号。

### 步骤 1：让 KAIA 测试锚定情况<a id="step-1-get-kaia-to-test-anchoring"></a>

锚定需要 SCN-L2-01 向 Kairos 进行锚定交易。 因此，"subbridge.parentOperator "账户应该有足够的 KAIA 来支付交易费。 从 [Kairos Faucet](https://faucet.kaia.io/) 获取一些 KAIA，并将一些 KAIA 转移到`parentOperator`。 对于实际服务中的数据锚定，"父操作员 "需要有足够的 KAIA 来支付交易费。

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

![](/img/nodes/sc-en-scn-faucet.png)

### 步骤 2：开始锚定<a id="step-2-start-anchoring"></a>

要开始锚定，请执行以下命令：

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.anchoring(true)
true
```

锚定开始后，可以使用 `subbridge.latestAnchoredBlockNumber` 查看最新锚定到 Kairos 的区块。 请注意，这只有在 EN 跟进了最新的 "启明星 "后才会起作用。 默认情况下，SCN-L2-01 会从开启锚定功能的区块开始，在每个区块上尝试锚定。 可以通过更改 `SC_ANCHORING_PERIOD` 来设置锚定周期。 如果该值设置为 10，节点会在区块数为 10 的倍数时尝试锚定。

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```

![](/img/nodes/sc-en-scn-anchoring.png)
