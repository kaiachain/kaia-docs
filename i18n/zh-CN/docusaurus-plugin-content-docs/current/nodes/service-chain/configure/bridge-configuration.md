# 连接到主链

在本页中，我们将介绍将服务链连接到主链的步骤。

## EN 配置 - 启用主桥<a id="en-configuration-enable-main-bridge"></a>

应通过配置 `kend.conf` 启用主桥。

### 更新配置文件<a id="update-the-configuration-file"></a>

kend.conf "包含以下主桥属性。

| 名称                                                             | 说明                               |
| :------------------------------------------------------------- | :------------------------------- |
| MAIN_BRIDGE                               | 启用网桥服务作为服务链的主网桥。 1 表示启用。         |
| MAIN_BRIDGE_PORT     | 网桥监听端口。 默认值：50505                |
| MAIN_BRIDGE_INDEXING | 启用服务链事务哈希索引，以便快速访问服务链数据。 1 表示启用。 |

要在 EN 上启用主桥，应按以下步骤操作。

- 定义 `MAIN_BRIDGE`
- 启用 RPC/WS。
- 为 RPC 添加 `mainbridge` API，如下面的示例。

```text
# Configuration file for the kend

...

# rpc options setting
RPC_ENABLE=1 # if this is set, the following options will be used
RPC_API="klay,mainbridge" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3,mainbridge,subbridge
RPC_PORT=8551
RPC_ADDR="0.0.0.0"
RPC_CORSDOMAIN="*"
RPC_VHOSTS="*"

# ws options setting
WS_ENABLE=1 # if this is set, the following options will be used
WS_API="klay" 
WS_ADDR="0.0.0.0"
WS_PORT=8552
WS_ORIGINS="*"

...

# service chain options setting
MAIN_BRIDGE=1
MAIN_BRIDGE_PORT=50505
MAIN_BRIDGE_INDEXING=1

...
```

## 将 SCN 连接到主链<a id="connect-scn-to-the-main-chain"></a>

您需要运行主链的 EN 作为主桥。 您还应确定哪个 SCN（服务链共识节点）作为子桥将与 EN 连接。

### 检查 EN（主桥）信息<a id="check-en-(main-bridge)-information"></a>

#### 打开 EN 控制台<a id="open-en-console"></a>

有不同的方法可以附加到 EN 进程中。 您可以在 [ken CLI commands](../../../nodes/endpoint-node/ken-cli-commands.md)中查看可用命令。 本页介绍通过 IPC（进程间通信）连接进程的方法。 IPC 文件 `klay.ipc` 位于节点上的 `DATA_DIR` 路径中。

请执行以下命令并查看结果。 (如果为 RPC 添加了 `mainbridge` API，则可以像下面这样检查桥接 API。 如果没有 "主桥 "API，则应再次检查 [EN 配置 - 启用主桥](#en-configuration-enable-main-bridge)。 )

```bash
$ ken attach --datadir ~/kend_home
欢迎访问 Kaia JavaScript 控制台！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kend_home
 modules: admin:1.0 mainbridge:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

#### 获取 EN's KNI<a id="get-the-ens-kni"></a>

通过 IPC 连接到进程后，可以检查 EN 的主桥 KNI，如下所示。 您可以参考 [Service Chain API](../../../references/json-rpc/subbridge/add-peer)。

```javascript
> mainbridge.nodeInfo
{
  kni: "kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0",
  id: "08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37",
  ip: "::",
  listenAddr: "[::]:50505",
  name: "-2",
  ports: {
    discovery: 0,
    listener: 50505
  },
  protocols: {
    servicechain: {
      config: {
        chainId: 2018,
        deriveShaImpl: 0,
        isBFT: true,
        istanbul: {...},
        unitPrice: 0
      },
      difficulty: 87860,
      genesis: "0x711ce9865492659977abb2758d29f68c2b0c82862d9376f25953579f64f95b58",
      head: "0x0d4b130731f1e7560e4531ac73d55ac8c6daccb178abd86af0d96b7aafded7c5",
      network: 1
    }
  }
}
```

您应该注意主桥 "kni"。

### 连接到主链<a id="connect-to-the-main-chain"></a>

#### 打开 SCN 控制台<a id="open-scn-console"></a>

像下面这样附加到 SCN 流程。 您应该已启用 RPC 的 "subbridge "API，您可以在输出中找到 subbridge 模块。 如果没有 "subbridge "API，则应再次检查[SCN 的配置](../install-service-chain.md#configuration-of-the-scn)。

```bash
$ kscn attach --datadir ~/kscnd_home
欢迎来到 Kaia JavaScript 控制台！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
>
```

#### 将 SCN 与 EN 连接<a id="connect-scn-with-en"></a>

您可以通过 IPC 在 SCN 上添加 EN 对等设备，如下所示。 kni 是 EN 的 KNI，你之前已经注意到了。

```javascript
 > subbridge.addPeer("kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0")
 true
```

然后就可以像下面这样查看已连接的同行。

```javascript
 > subbridge.peers
 [{
     caps: ["servicechain/1"],
     id: "08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37",
     name: "-1",
     networks: [{
         inbound: false,
         localAddress: "[::1]:56834",
         remoteAddress: "[::1]:50505",
         static: true,
         trusted: false
     }],
     protocols: {
       servicechain: {
         head: "0x47be444be87daaee2989998559049ee8a859540807824dd1db4a80ea6cb42293",
         version: 1
       }
     }
 }]
```
