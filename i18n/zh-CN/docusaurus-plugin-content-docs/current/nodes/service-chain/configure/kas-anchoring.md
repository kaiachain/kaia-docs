# 与 KAS 一起使用数据锚定

如设计部分所述，您可以将服务链数据锚定到 Kaia 主链上。
本页介绍如何通过 [KAS (Kaia API Service)](https://www.klaytnapi.com) 启用数据锚定。

一旦开启，服务链中的节点就可以定期将其链数据（区块数据）锚定到 Mainnet 或 Kairos，以证明服务链的存在和不变性。
这确保了服务链的安全性和可信度。

## 使用 KAS 的准备工作<a id="preparation-with-kas"></a>

本节将介绍使用 KAS 进行数据锚定的前提条件。

### 注册 KAS（Kaia API 服务）<a id="sign-up-kas"></a>

首先，您需要在 [KAS 控制台网站](https://www.klaytnapi.com) 上注册 KAS，获得 KAS 账户。
请访问上述网站并在 KAS 中注册。

[![主页](/img/nodes/kas-main-en.png)](https://www.klaytnapi.com)

[![注册](/img/nodes/kas-signup-en.png)](https://www.klaytnapi.com)

### 创建证书<a id="check-credential"></a>

登录后，您可以创建如下凭证。
访问密钥 ID "和 "秘密访问密钥 "或 "授权 "将用于调用 KAS API。

![凭证](/img/nodes/kas-credential-en.png)

## 锚点应用程序接口<a id="anchor-api"></a>

KAS 提供了专为数据锚定而设计的锚定应用程序接口（Anchor API），您肯定会使用它来完成锚定任务。

锚应用程序](/img/nodes/kas-anchor-api-en.png)

## 创建操作员地址<a id="create-kas-credential"></a>

要通过 KAS 锚定服务链数据，必须有一个已注册 KAS 的 Kaia 地址向 Kaia 实际发送锚定事务。 因此，在建立服务节点之前，您需要通过 KAS 创建一个名为 "操作员 "的 Kaia 账户。 请使用 KAS 控制台创建此账户。

需要注意的是，您必须首先在 KAS 控制台页面右上角**选择要将数据锚定到 Kaia 中的链**。 您应为每个链（Mainnet/Kairos）创建一个操作员。

[选择链](/img/nodes/kas-select-chain-en.png)

创建如下操作符

[创建操作符](/img/nodes/kas-create-operator-en.png)

然后，您可以像下面这样查看操作员列表。
请注意，设置服务链节点需要运营商的地址。

![创建操作符](/img/nodes/kas-operator-list-en.png)

## 配置服务链节点<a id="configure-service-chain-node"></a>

获得 API 证书、Anchor API 信息（API 端点和参数）以及 KAS 中的操作员账户后，就可以设置服务链节点了。
您需要编辑服务链节点的配置文件（`kscnd.conf`, `kspnd.conf`, `ksend.conf`），如下所示。

应设置 `SC_SUB_BRIDGE=1` 和所有 `SC_KAS_` 前缀项。

```bash
...
# service chain options setting
...
SC_SUB_BRIDGE=1
...

SC_KAS_ANCHOR=1                                                         # 1: enable, 0: disable
SC_KAS_ANCHOR_PERIOD=10                                                 # Anchoring block period
SC_KAS_ANCHOR_URL="https://anchor-api.klaytn.com/v1/anchor"             # Anchor API URL
SC_KAS_ANCHOR_OPERATOR="0x6A3D565C4a2a4cd0Fb3df8EDfb63a151717EA1D7"     # Operator address
SC_KAS_ANCHOR_ACCESS_KEY="KAJM4BEIR9SKJKAW1G3TT8GX"                     # Credential Access key
SC_KAS_ANCHOR_SECRET_KEY="KyD5w9ZlZQ7ejj6lDF6elb61u8JH/mXdKqhgr3yF"     # Credential Secret key
SC_KAS_ANCHOR_X_CHAIN_ID=1001                                           # Mainnet: 8217, Kairos: 1001
...
```

## 运行服务链节点<a id="run-service-chain-node"></a>

现在你可以走了。 您可以运行服务链节点。
您将看到与 KAS 锚点 API 相关的日志信息，如下所示。

```bash
...
INFO[09/10,18:09:28 +09] [5] Imported new chain segment                number=86495 hash=5a20d6…cbca1b blocks=1  txs=3 elapsed=2.387ms  trieDBSize=5.10kB mgas=0.063 mgasps=26.383
INFO[09/10,18:09:28 +09] [53] Anchored a block via KAS                  blkNum=86495
INFO[09/10,18:09:29 +09] [5] Imported new chain segment                number=86496 hash=8897bc…4ea7e7 blocks=1  txs=3 elapsed=2.158ms  trieDBSize=5.10kB mgas=0.063 mgasps=29.188
INFO[09/10,18:09:29 +09] [53] Anchored a block via KAS                  blkNum=86496
INFO[09/10,18:09:30 +09] [5] Imported new chain segment                number=86497 hash=44b319…7d4247 blocks=1  txs=3 elapsed=2.346ms  trieDBSize=5.43kB mgas=0.063 mgasps=26.848
INFO[09/10,18:09:30 +09] [53] Anchored a block via KAS                  blkNum=86497
INFO[09/10,18:09:31 +09] [5] Imported new chain segment                number=86498 hash=0b98ba…73d654 blocks=1  txs=3 elapsed=2.235ms  trieDBSize=5.61kB mgas=0.063 mgasps=28.186
INFO[09/10,18:09:31 +09] [53] Anchored a block via KAS                  blkNum=86498
INFO[09/10,18:09:32 +09] [5] Imported new chain segment                number=86499 hash=4f01ab…3bc334 blocks=1  txs=3 elapsed=3.319ms  trieDBSize=5.61kB mgas=0.063 mgasps=18.977
INFO[09/10,18:09:32 +09] [53] Anchored a block via KAS                  blkNum=86499
...
```

## 交易清单<a id="list-of-transaction"></a>

在 KAS 控制台网站上，您可以在 "KAS 控制台 - 服务 - 锚点 - 操作员 "菜单中查看服务链操作员发送的锚点交易列表，如下所示。

锚定交易列表](/img/nodes/kas-tx-list-en.png)
