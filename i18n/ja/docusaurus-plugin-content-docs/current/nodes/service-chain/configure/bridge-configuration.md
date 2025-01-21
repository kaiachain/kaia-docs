# メインチェーンに接続

このページでは、サービスチェーンをメインチェーンに接続する手順を説明します。

## EN コンフィギュレーション - メインブリッジを有効にする<a id="en-configuration-enable-main-bridge"></a>

`kend.conf`を設定して、main-bridgeを有効にする必要がある。

### 設定ファイルの更新<a id="update-the-configuration-file"></a>

`kend.conf`には以下のメインブリッジのプロパティが含まれている。

| 名称                                                             | 説明                                                                   |
| :------------------------------------------------------------- | :------------------------------------------------------------------- |
| MAIN_BRIDGE                               | サービスチェーンのメインブリッジとしてブリッジサービスを有効にする。 1 で有効にする。                         |
| MAIN_BRIDGE_PORT     | ブリッジのリッスンポート。 デフォルト：50505                                            |
| MAIN_BRIDGE_INDEXING | サービスチェーンデータへの高速アクセスのために、サービスチェーントランザクションハッシュのインデックスを有効にする。 1 で有効にする。 |

ENでメインブリッジを有効にするには、以下のようにする。

- define `MAIN_BRIDGE`
- RPC/WSを有効にする。
- 以下の例のように、RPC用の `mainbridge` APIを追加する。

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

## SCNをメインチェーンに接続<a id="connect-scn-to-the-main-chain"></a>

メインブリッジとしてメインチェーンのENを走らせる必要がある。 また、どのSCN（Service Chain Consensus Node）をサブブリッジとしてENと接続するかも決めておく必要がある。

### EN（メインブリッジ）情報を確認する<a id="check-en-(main-bridge)-information"></a>

#### ENコンソールを開く<a id="open-en-console"></a>

ENプロセスにはさまざまな取り付け方がある。 使えるコマンドは[ken CLI commands](../../../nodes/endpoint-node/ken-cli-commands.md)で確認できます。 このページでは、IPC（プロセス間通信）を使ってプロセスにアタッチする方法を説明します。 IPC ファイル `klay.ipc` はノードの `DATA_DIR` パスにある。

以下のコマンドを実行し、結果を確認してください。 (RPC用に `mainbridge` APIを追加している場合は、以下のようにブリッジAPIを確認することができる。 もし `mainbridge` API がない場合は、[EN Configuration - Enable Main-bridge](#en-configuration-enable-main-bridge) を再度確認してください。 )

```bash
$ ken attach --datadir ~/kend_home
Kaia JavaScriptコンソールへようこそ！

インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kend_home
 modules: admin:1.0 mainbridge:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

#### エンのKNIを手に入れる<a id="get-the-ens-kni"></a>

IPC経由でプロセスにアタッチした後、EN のメインブリッジ KNI を以下のように確認できる。 サービスチェーンAPI](../../../references/json-rpc/subbridge/add-peer)を参照してください。

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

メインブリッジの`kni`に注意してほしい。

### メインチェーンに接続<a id="connect-to-the-main-chain"></a>

#### SCNコンソールを開く<a id="open-scn-console"></a>

以下のようにSCNプロセスに添付する。 RPC の `subbridge` API が有効になっているはずである。 もし `subbridge` APIがなければ、もう一度[SCNの設定](../install-service-chain.md#configuration-of-the-scn)を確認してください。

```bash
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScript コンソールへようこそ！

インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
>
```

#### SCNとENを接続<a id="connect-scn-with-en"></a>

以下のように IPC 経由で SCN に EN ピアを追加することができます。 kniは、以前あなたが指摘したEN's KNIである。

```javascript
 > subbridge.addPeer("kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0")
 true
```

そして、以下のように接続されているピアを確認することができる。

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
