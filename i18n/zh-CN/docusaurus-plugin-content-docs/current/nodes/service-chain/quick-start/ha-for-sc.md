# 配置高可用性

如果服务链中只使用一个网桥，该网桥就会成为单点故障。为了解决这个问题，我们将介绍如何使用两个或更多网桥构建 HA 系统。如下图所示，将网桥配置为至少两对连接，这样即使其中一个网桥连接出现问题，数据锚定和链之间的价值传输仍可通过另一个网桥正常进行。

![](/img/nodes/sc-ha-arch.png)

## 先决条件<a id="prerequisites"></a>

- EN 的主桥和 SCN 的副桥相连。如果不是，请参考 [Kairos connection](en-scn-connection.md)建立连接。
- 本节将介绍如何在 Kairos 和 ServiceChain 之间添加额外的桥接器。同样，您也可以通过添加另一个网桥来设置 HA。

## 步骤 1：在 EN-SCN 之间添加另一个网桥<a id="step-1-adding-another-bridge-between-en-scn"></a>

在[连接到 Kairos](en-scn-connection.md)中，我们假设 EN 和 SCN 分别以 EN-01 和 SCN-L2-01 的桥接方式连接。在本节中，我们将在 EN-02 和 SCN-L2-02 之间添加另一座桥梁。由于程序相同，我们将作简要说明。

![](/img/nodes/sc-ha-add-bridge.png)

构建 EN-02 后，在 `conf/kend.conf` 中将 `SC_MAIN_BRIDGE` 设置为 1，然后在 EN-02 上重启 ken。

```console
SC_MAIN_BRIDGE=1
```

通过以下命令检查 EN-02 的 KNI 信息：

```console
EN-02$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://eb8f21df10c6562...25bae@[::]:50505?discport=0"
```

登录 SCN-L2-02，使用 EN-02 的 KNI 创建`main-bridges.json`。请确保它应该是带方括号的 JSON 数组格式。

```console
SCN-L2-02$ echo '["kni://eb8f21df10c6562...25bae@192.168.0.5:50505?discport=0"]' > ~/data/main-bridges.json
```

在 SCN-L2-02 的外壳上，按以下说明编辑 `kscn-XXXXX-amd64/conf/kscnd.conf`。要连接桥接器，请将 `SC_SUB_BRIDGE` 设置为 1。
SC_PARENT_CHAIN_ID "设置为 Kairos 的 "chainID "1001。
SC_ANCHORING_PERIOD "是一个参数，用于决定向父链发送锚定事务的周期。在这个例子中，每 10 个子区块就会向父链（Kairos）提交一个锚交易。

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

如果在 EN-02 上重新启动 ken，EN-02 和 SCN-L2-02 之间将自动连接桥接，数据锚定将从连接点开始，如下图所示。

在 EN-02 和 SCN-L2-02 之间添加桥接器后，可以看到节点之间的连接已建立，如下图所示。

![](/img/nodes/sc-ha-before-register.png)

## 第 2 步：注册和订阅桥接合同<a id="step-2-registering-and-subscribing-the-bridge-contract"></a>

如上图所示，桥接合同只在 EN-01 和 SCN-L2-01 中登记。

连接 SCN-L2-02 控制台，运行用于网桥注册、网桥订阅和令牌注册的 API。在[跨链价值转移](value-transfer.md) 第 2 步中部署带有 EN-01 和 SCN-L2-01 的桥接合约时，创建了桥接合约和代币合约。

```
$ kscn attach --datadir ~/data
> subbridge.registerBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.subscribeBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.registerToken("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR", "0xCHILD_TOKEN_ADDR", "0XPARENT_TOKEN_ADDR")
null
```

![](/img/nodes/sc-ha-before-register2.png)

在桥梁合同中，应更新有关增加一座桥梁的信息。 [service-chain/value-transfer](https://github.com/kaiachain/kaia-examples/tree/main/service-chain/value-transfer) 中的 [`erc20/erc20-addOperator4HA.js`](https://github.com/kaiachain/kaia-examples/blob/main/service-chain/value-transfer/erc20/erc20-addOperator4HA.js) 脚本，会在 [跨链价值转移](value-transfer.md) 中部署的桥接合约中注册额外桥接的操作符。

首先，检查 SCN-L2-02 上额外网桥的操作员地址，并将它们添加到 `common/bridge_info.json` 文件中的 `bridges` 字段中。

```
$ kscn attach --datadir ~/data
> subbridge.childOperator
"0x2ed72a9d7fe5da7672fd21567e07302431649b0b"
> subbridge.parentOperator
"0x5f4d5ac6da5d2d1f0af0e1bd8bc85a43a0ba41c5"
```

```
    "bridges": [
        {
            "child": { "operator": "0x10221f7f9355017cd0c11444e7eecb99621bacce" },
            "parent": { "operator": "0x3ce216beeafc62d20547376396e89528e1d778ca" }
        },
        {
            "child": { "operator": "0x2ed72a9d7fe5da7672fd21567e07302431649b0b" },
            "parent": { "operator": "0x5f4d5ac6da5d2d1f0af0e1bd8bc85a43a0ba41c5" }
        }
    ]
```

只有桥梁合同的所有者才能注册操作员。 `erc20-deploy.js` 将桥接合约的所有权转移给了 SCN-L2-01 的运营商，因此该脚本必须使用他们的密钥进行签名。 SCN-L2-01 将其保存在 `~/data/child_bridge_account` 和 `~/data/parent_bridge_account` 中，每个目录都包含一个密钥库文件及其密码文件。将这两个目录复制到运行脚本的机器上，并将它们的路径传递给脚本。在 `erc20` 目录中运行该脚本，该目录中由 `erc20-deploy.js` 生成了 `transfer_conf.json` 文件。

```
$ cd erc20
$ CHILD_OWNER_KEYSTORE=/path/to/child_bridge_account \
  PARENT_OWNER_KEYSTORE=/path/to/parent_bridge_account \
  node erc20-addOperator4HA.js
```

:::warning

桥接账户目录中包含操作员密钥库及其明文密码，这使得攻击者能够完全控制操作员账户。运行脚本后，请删除这些副本。

:::

当有多个桥接器时，可以通过设置阈值来更安全地进行价值转移。只有当阈值以上的操作员正常请求数值转移时，才能启用数值转移。例如，在当前示例中，如果有两个桥接器对，阈值设置为 2，则只有当两个桥接器对都正常请求时，才能进行数值传送。也就是说，即使一座网桥受到攻击并发送了异常请求，也可以阻止它。该脚本将阈值设置为 `bridge_info.json` 中桥梁的数量。若要使用其他数值，请在运行时设置 `THRESHOLD`，例如：`THRESHOLD=1 node erc20-addOperator4HA.js`。

该脚本将SCN-L2-01的操作员账户中的交易发送到节点之外。完成后，请在 SCN-L2-01 上重启 kscn，以便其子桥重新加载操作员账户的随机数。

```
SCN-L2-01$ kscnd stop
SCN-L2-01$ kscnd start
```

注册完成后，如下图所示，将在 EN-02 和 SCN-L2-02 中注册桥接合同，以配置 HA。

![](/img/nodes/sc-ha-after-register.png)

当两个或更多桥对连接用于 HA 时，同一区块的数据锚定事务会发生多次，价值转移事务也会发生多次。也就是说，需要额外付费。