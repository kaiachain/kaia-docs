# 連接到主鏈

在本頁中，我們將介紹將服務鏈連接到主鏈的步驟。

## EN 配置 - 啟用主橋<a id="en-configuration-enable-main-bridge"></a>

應通過配置 `kend.conf` 啟用主橋。

### 更新配置文件<a id="update-the-configuration-file"></a>

kend.conf "包含以下主橋屬性。

| 名稱                                                             | 說明                               |
| :------------------------------------------------------------- | :------------------------------- |
| MAIN_BRIDGE                               | 啟用網橋服務作為服務鏈的主網橋。 1 表示啟用。         |
| MAIN_BRIDGE_PORT     | 網橋監聽端口。 默認值：50505                |
| MAIN_BRIDGE_INDEXING | 啟用服務鏈事務哈希索引，以便快速訪問服務鏈數據。 1 表示啟用。 |

要在 EN 上啟用主橋，應按以下步驟操作。

- 定義 `MAIN_BRIDGE`
- 啟用 RPC/WS。
- 為 RPC 添加 `mainbridge` API，如下面的示例。

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

## 將 SCN 連接到主鏈<a id="connect-scn-to-the-main-chain"></a>

您需要運行主鏈的 EN 作為主橋。 您還應確定哪個 SCN（服務鏈共識節點）作為子橋將與 EN 連接。

### 檢查 EN（主橋）信息<a id="check-en-(main-bridge)-information"></a>

#### 打開 EN 控制檯<a id="open-en-console"></a>

有不同的方法可以附加到 EN 進程中。 您可以在 [ken CLI commands](../../../nodes/endpoint-node/ken-cli-commands.md)中查看可用命令。 本頁介紹通過 IPC（進程間通信）連接進程的方法。 IPC 文件 `klay.ipc` 位於節點上的 `DATA_DIR` 路徑中。

請執行以下命令並查看結果。 (如果為 RPC 添加了 `mainbridge` API，則可以像下面這樣檢查橋接 API。 如果沒有 "主橋 "API，則應再次檢查 [EN 配置 - 啟用主橋](#en-configuration-enable-main-bridge)。 )

```bash
$ ken attach --datadir ~/kend_home
歡迎訪問 Kaia JavaScript 控制檯！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kend_home
 modules: admin:1.0 mainbridge:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

#### 獲取 EN's KNI<a id="get-the-ens-kni"></a>

通過 IPC 連接到進程後，可以檢查 EN 的主橋 KNI，如下所示。 您可以參考 [Service Chain API](../../../references/json-rpc/subbridge/add-peer)。

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

您應該注意主橋 "kni"。

### 連接到主鏈<a id="connect-to-the-main-chain"></a>

#### 打開 SCN 控制檯<a id="open-scn-console"></a>

像下面這樣附加到 SCN 流程。 您應該已啟用 RPC 的 "subbridge "API，您可以在輸出中找到 subbridge 模塊。 如果沒有 "subbridge "API，則應再次檢查[SCN 的配置](../install-service-chain.md#configuration-of-the-scn)。

```bash
$ kscn attach --datadir ~/kscnd_home
歡迎來到 Kaia JavaScript 控制檯！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
>
```

#### 將 SCN 與 EN 連接<a id="connect-scn-with-en"></a>

您可以通過 IPC 在 SCN 上添加 EN 對等設備，如下所示。 kni 是 EN 的 KNI，你之前已經注意到了。

```javascript
 > subbridge.addPeer("kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0")
 true
```

然後就可以像下面這樣查看已連接的同行。

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
