# Connect to main chain

In this page, we will describe the steps of connecting a Service Chain to the Main Chain.

## EN Configuration - Enable Main-bridge <a id="en-configuration-enable-main-bridge"></a>

You should enable main-bridge by configuring `kend.conf`.

### Update the Configuration File <a id="update-the-configuration-file"></a>

The `kend.conf` contains the following main-bridge properties.

| Name                                                           | Description                                                                                                                               |
| :------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| MAIN_BRIDGE                               | Enable bridge service as main bridge for service chain. 1 to enable.                                      |
| MAIN_BRIDGE_PORT     | Bridge listen port. Default: 50505                                                                        |
| MAIN_BRIDGE_INDEXING | Enable indexing of service chain transaction hash for fast access to the service chain data. 1 to enable. |

To enable main-bridge on EN, you should do like below.

- define `MAIN_BRIDGE`
- enable RPC/WS.
- add `mainbridge` API for RPC like the below example.

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

## Connect SCN to the Main Chain <a id="connect-scn-to-the-main-chain"></a>

You need to run an EN of the main chain as a main-bridge. And also you should determine which SCN (Service Chain Consensus Node) as a sub-bridge will connect with the EN.

### Check EN (Main-Bridge) information <a id="check-en-(main-bridge)-information"></a>

#### Open EN Console <a id="open-en-console"></a>

There are different ways to attach to the EN process. You can check the usable commands on [ken CLI commands](../../../nodes/endpoint-node/ken-cli-commands.md). This page explains the way to attach to the process via IPC (inter-process communication). The IPC file `klay.ipc` is located in the data directory on the node.

Please execute the following command and check out the result. (If you added `mainbridge` API for RPC, you can check the bridge API like below. If there is no `mainbridge` API, you should check [EN Configuration - Enable Main-bridge](#en-configuration-enable-main-bridge) again. )

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kend_home
 modules: admin:1.0 mainbridge:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

#### Get the EN's KNI <a id="get-the-ens-kni"></a>

After attaching to the process via IPC, you can check the EN's main-bridge KNI like below. You can refer to [Service Chain API](../../../references/json-rpc/subbridge/add-peer).

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

You should take note of the main-bridge `kni`.

### Connect to the Main Chain <a id="connect-to-the-main-chain"></a>

#### Open SCN Console <a id="open-scn-console"></a>

Attach to the SCN process like below. You should have enabled `subbridge` API for RPC, you can find the subbridge module in the output. If there is no `subbridge` API, you should check [Configuration of the SCN](../install-service-chain.md#configuration-of-the-scn) again.

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 >
```

#### Connect SCN with EN <a id="connect-scn-with-en"></a>

You can add the EN peer on SCN via IPC like below. The kni is EN's KNI which you noted previously.

```javascript
 > subbridge.addPeer("kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0")
 true
```

And then you can check the connected peers like below.

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
