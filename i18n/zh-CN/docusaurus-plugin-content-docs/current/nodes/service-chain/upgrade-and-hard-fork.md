# 升级服务链

Kaia 及其 ServiceChain 不断发布新版本，以开发新功能和修复漏洞。 本页是升级 ServiceChain 二进制文件和设置 ServiceChain 硬分叉区块编号的指南。

## 升级<a href="#upgrade" id="upgrade"></a>

本节介绍如何升级 ServiceChain 二进制文件。

**注意**\* 服务链二进制文件的升级可能是不可逆和向后兼容的，这意味着您不能降级到旧版本。 有关详细信息，请参阅发行说明。 例如，[Kaia v1.9.0 发布说明](https://medium.com/klaytn/klaytn-v1-9-0-release-notes-medium-58e4644f7544) 说：

> 注意：该版本更新了数据库版本，以支持快照同步。 更新到 v1.9.0 后，您不能使用现有数据降级到旧版本。

您可以通过以下链接获取最新版的 Kaia 和 ServiceChain 二进制文件：

- [Kaia文档](../downloads/downloads.md)
- [Kaia Github Repository](https://github.com/kaiachain/kaia/releases)

要升级 ServiceChain 二进制文件，请停止 ServiceChain 节点并替换二进制文件。 例如，您可以使用以下命令停止 SCN 节点，并将二进制文件替换为更新的二进制文件。

```bash
$ kscnd stop
Shutting down kscnd: OK
$ cp /path/to/new/kscn /path/to/original/kscn
```

升级后可以重新启动 ServiceChain 节点。 但是，如果计划在 ServiceChain 中激活硬分叉，就必须保持 ServiceChain 节点的宕机。 有关 ServiceChain 硬分叉的说明，请参阅 [硬分叉](#hard-fork)。

```bash
$ kscnd start
```

## 硬分叉<a href="#hard-fork" id="hard-fork"></a>

本节介绍将 Kaia [hard fork](../../misc/kaia-history.md) 应用于 ServiceChain 的步骤。

要将硬分叉应用于 ServiceChain，您需要

1. 为硬分叉选择一个合适的区块编号
2. 将 ServiceChain 二进制版本升级到支持硬分叉的版本
3. 在服务链中设置硬分叉区块编号

### 1) 为硬分叉选择一个合适的区块编号<a href="#1-pick-an-appropriate-block-number-for-the-hard-fork" id="1-pick-an-appropriate-block-number-for-the-hard-fork"></a>

在 ServiceChain 的 Javascript 控制台中，您可以检查当前的区块编号，如下图所示。

```bash
$ kscn attach --datadir ~/kscnd_home
欢迎访问 Kaia JavaScript 控制台！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> kaia.blockNumber
1234
```

现在，您必须选择一个合适的区块编号来激活硬分叉。 确保当前区块和硬分叉区块之间有足够多的区块（每秒产生一个）。

### 2. 升级服务链二进制文件<a href="#2-upgrade-the-servicechain-binary" id="2-upgrade-the-servicechain-binary"></a>

有关升级 ServiceChain 二进制文件的说明，请参阅本页的 [Upgrade](#upgrade) 部分。 确保暂时关闭（或停止）ServiceChain 节点。 设置硬分叉区块编号后，您将重新启动它们。

### 3. 设置硬分叉区块编号<a href="#3-set-the-hard-fork-block-number" id="3-set-the-hard-fork-block-number"></a>

如果已将 ServiceChain 二进制文件升级为支持所需硬分叉的版本，则可以通过更新 genesis 重新初始化链配置，在 ServiceChain 中设置硬分叉区块编号。

#### 更新 genesis 并重新初始化所有 ServiceChain 节点的链配置<a href="#update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes" id="update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes"></a>

首先，在 `genesis.json` 的 `config` 字段中指定硬分叉编号。 例如，如果要在 ServiceChain 中激活 Magma 硬分叉，则应在创世的 "配置 "字段中指定 "magmaCompatibleBlock"，如下所示。

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    ...
    "magmaCompatibleBlock": 1500,
    ...
  },
  ...
}
```

要在链配置中启用硬分叉，应先启用之前的硬分叉。 也就是说，要启用 Magma 硬分叉，EthTxType 硬分叉应该已经启用。 如果链配置中缺少前面硬分叉的兼容区块编号字段，也必须添加。

例如，如果你想设置 Magma 硬分叉区块编号，而你的 `genesis.json` 的 `config` 字段中没有 `ethTxTypeCompatibleBlock` ，如下所示：

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

在 "配置 "字段中添加 "magmaCompatibleBlock "时，还必须添加 "ethTxTypeCompatibleBlock"，如下所示。

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "ethTxTypeCompatibleBlock": 1500,
    "magmaCompatibleBlock": 1500,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

您可以在 [Kaia Docs](../../misc/kaia-history.md) 中找到 Kaia 硬分叉的历史。

如果您已使用所需的硬分叉更新了您的 `genesis.json`，请重新初始化链配置并应用您的更改。

```bash
$ kscn --datadir /path/to/data/directory init /path/to/genesis.json
```

**注意**\* 重新初始化链配置时打印以下错误日志是正常现象。

```
ERROR[08/02,09:12:39 Z] [48] The same or more recent governance index exist. Skip writing governance index  newIdx=0 govIdxes=[0]
```

#### 确认更新的链配置<a href="#confirm-the-updated-chain-config" id="confirm-the-updated-chain-config"></a>

现在，重新启动 ServiceChain 节点。 例如，您可以使用以下命令重新启动 SCN 节点。

```bash
$ kscnd start
```

然后，您可以在 SCN 的 Javascript 控制台中检查更新后的链配置。

```bash
$ kscn attach --datadir ~/kscnd_home
欢迎来到 Kaia JavaScript 控制台！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.chainConfig.magmaCompatibleBlock
1500
```

## 硬分叉的一些具体情况<a href="#some-hard-fork-specifics" id="some-hard-fork-specifics"></a>

本节将介绍特定硬分叉的一些细节。

### Magma <a href="#magma" id="magma"></a>

Magma 硬分叉引入了 KIP-71，即动态气体费。 它包括天然气价格的上限和下限。

默认情况下，上限设置为 `7500000000`，下限设置为 `25000000000`。 您可以使用 [governance APIs](../../../references/json-rpc/governance/chain-config) 在 SCN 节点的 Javascript 控制台中更改这些边界。 显然，下限不能超过上限。

要将天然气价格设置为静态值，必须将天然气价格的上限和下限设置为相同的值。 例如，您可以在 SCN 节点的 Javascript 控制台中使用 "governance.vote "API 将天然气价格设为 "0"。

```bash
$ kscn attach --datadir ~/kscnd_home
欢迎访问 Kaia JavaScript 控制台！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.vote("kip71.lowerboundbasefee", 0)
"Your vote is prepared.您的投票已准备就绪，将放入区块头，或在您的节点作为提案人生成区块时应用。请注意，您的投票可能是重复的。"
> governance.vote("kip71.upperboundbasefee", 0)
"您的投票已准备就绪。您的投票已准备就绪，它将被放入区块头，或在您的节点作为提案人生成区块时应用。请注意，您的投票可能是重复的。"
```

**注** 无论 Magma 硬分叉是否激活，都可以使用治理投票及其更新。 也就是说，治理投票也可以在 Magma 硬分叉激活之前进行。

如果更新天然气价格上限和下限的投票成功，这些更改将在 2 个伊斯坦布尔纪元后生效（纪元的值以块号表示）。

例如，如果历时为 3600，而更新天然气价格上下限的投票被置于区块 #4000 中，则这些更改将从区块 #10800 开始生效。 具体来说，投票将在 #7200 区块达到其第一个纪元时最终完成，而更改将在第二个纪元(#10800 区块）应用。

要检查纪元，可以使用 `governanace.itemsAt` API，如下所示。

```javascript
> governance.itemsAt(kaia.blockNumber)
{
  governance.governancemode: "none",
  governance.governingnode: "0x05ad406f31e22b74f18c9ed65ed1ccd349bbbee0",
  governance.unitprice: 0,
  istanbul.committeesize: 21,
  istanbul.epoch: 3600,
  istanbul.policy: 0,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: false,
  reward.minimumstake: "2000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.useginicoeff: false
}
```

你可以看到，"istanbul.epoch "的值为 3600 个区块，通常需要一个小时才能通过。

您还可以使用 "governance.vote "API 更改时间。

```javascript
> governance.vote("istanbul.epoch", 60)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```
