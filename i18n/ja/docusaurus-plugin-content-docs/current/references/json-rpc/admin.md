---
description: APIs to control Klaytn node.
---

# admin

The namespace `admin` gives you access to several non-standard RPC methods. They will allow you to have
fine-grained control over your Klaytn instance, including but not limited to network peer and RPC
endpoint management.

## admin_nodeInfo <a id="admin_nodeinfo"></a>

The `nodeInfo` administrative property can be queried for all the information known about the running
Klaytn node at the networking granularity. These include general information about the node itself as a
participant of the [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P
overlay protocol, as well as specialized information added by each of the running application protocols,
e.g., `klay`.

|  Client | Method invocation              |
| :-----: | ------------------------------ |
| Console | `admin.nodeInfo`               |
|   RPC   | `{"method": "admin_nodeInfo"}` |

**Parameters**

None

**Return Value**

| Type        | Description           |
| ----------- | --------------------- |
| JSON string | The node information. |

**Example**

Console

```javascript
> admin.nodeInfo
{
   kni: "kni://0bbff960d26fc12a5153ac25d7aaffd654e073a74a8b1aa65034250d47fac610ebe99a83d21d741c6121a32fb01312b49fc0633ae04e80c5eb73c3bc71c5a850@[::]:32323?discport=0",
   id: "0bbff960d26fc12a5153ac25d7aaffd654e073a74a8b1aa65034250d47fac610ebe99a83d21d741c6121a32fb01312b49fc0633ae04e80c5eb73c3bc71c5a850",
   ip: "::",
   listenAddr: "[::]:32323",
   name: "Klaytn/validator-1/vX.X.X/XXXX-XXXX/goX.X.X",
   ports: {
     discovery: 0,
     listener: 32323
   },
   protocols: {
     istanbul: {
       config: {
         chainId: 2018,
         isBFT: true,
         istanbul: {...},
         unitPrice: 0
       },
       difficulty: 52794,
       genesis: "0x42824367c973785245923a712cf2e5a99aae6a26f44e4f1ec686a0e60986644e",
       head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
       network: 2017
     }
   }
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,
"result":               {"id":"377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d", "name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X",    "kni":"kni://377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d@[::]:32323?discport=0",
"ip":"::",
"ports":{"discovery":0,"listener":32323},
"listenAddr":"[::]:32323",
"protocols":{"istanbul":{"network":1000,"difficulty":1,"genesis":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d","config":{"chainId":1000,"istanbul":{"epoch":30000,"policy":0,"sub":7},"isBFT":true,"unitPrice":25000000000,"deriveShaImpl":0},"head":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d"}}}}
```

## admin_nodeConfig <a id="admin_nodeconfig"></a>

The `nodeConfig` administrative property can be queried for all the configuration set for the running Klaytn node.

|  Client | Method invocation                |
| :-----: | -------------------------------- |
| Console | `admin.nodeConfig`               |
|   RPC   | `{"method": "admin_nodeConfig"}` |

**Parameters**

None

**Return Value**

| Type        | Description             |
| ----------- | ----------------------- |
| JSON string | The node configuration. |

**Example**

Console

```javascript
> admin.nodeConfig
{
  AnchoringPeriod: 0,
  AutoRestartFlag: false,
  DBType: "LevelDB",
  DaemonPathFlag: "/klaytn-docker-pkg/bin/kend",
  DisableUnsafeDebug: false,

  ...

  TxResendCount: 1000,
  TxResendInterval: 4,
  TxResendUseLegacy: false,
  WorkerDisable: false,
  WsEndpoint: "0.0.0.0:8552"
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_nodeConfig","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"Genesis":null,"NetworkId":1001,"SyncMode":"full","NoPruning":false,"WorkerDisable":false,"DownloaderDisable":false,"FetcherDisable":false,"ParentOperatorAddr":null,"AnchoringPeriod":0,"SentChainTxsLimit":0,"OverwriteGenesis":false,"StartBlockNumber":0,"DBType":"LevelDB","SkipBcVersionCheck":false,"SingleDB":false,"NumStateTrieShards":4,"EnableDBPerfMetrics":true,"LevelDBCompression":0,"LevelDBBufferPool":true,"LevelDBCacheSize":768,"DynamoDBConfig":{"TableName":"","Region":"ap-northeast-2","Endpoint":"","S3Endpoint":"","IsProvisioned":false,"ReadCapacityUnits":10000,"WriteCapacityUnits":10000,"ReadOnly":false,"PerfCheck":false},"RocksDBConfig":{"Secondary":false,"DumpMallocStat":false,"DisableMetrics":false,"CacheSize":768,"CompressionType":"lz4","BottommostCompressionType":"zstd","FilterPolicy":"ribbon","MaxOpenFiles":1024,"CacheIndexAndFilter":false},"TrieCacheSize":512,"TrieTimeout":300000000000,"TrieBlockInterval":128,"TriesInMemory":128,"LivePruning":false,"LivePruningRetention":172800,"SenderTxHashIndexing":false,"ParallelDBWrite":true,"TrieNodeCacheConfig":{"CacheType":"LocalCache","NumFetcherPrefetchWorker":32,"UseSnapshotForPrefetch":false,"LocalCacheSizeMiB":1024,"FastCacheFileDir":"/home/ubuntu/klaytn/data/fastcache","FastCacheSavePeriod":0,"RedisEndpoints":null,"RedisClusterEnable":false,"RedisPublishBlockEnable":false,"RedisSubscribeBlockEnable":false},"SnapshotCacheSize":0,"SnapshotAsyncGen":false,"ServiceChainSigner":"0x0000000000000000000000000000000000000000","ExtraData":null,"GasPrice":25000000000,"Rewardbase":"0x0000000000000000000000000000000000000000","TxPool":{"NoLocals":false,"AllowLocalAnchorTx":false,"DenyRemoteTx":false,"Journal":"/home/ubuntu/klaytn/data/klay/transactions.rlp","JournalInterval":3600000000000,"PriceLimit":1,"PriceBump":10,"ExecSlotsAccount":4096,"ExecSlotsAll":4096,"NonExecSlotsAccount":4096,"NonExecSlotsAll":4096,"KeepLocals":false,"Lifetime":300000000000,"NoAccountCreation":false,"EnableSpamThrottlerAtRuntime":false},"GPO":{"Blocks":20,"Percentile":60,"MaxHeaderHistory":1024,"MaxBlockHistory":1024,"Default":null},"EnablePreimageRecording":false,"EnableInternalTxTracing":false,"EnableOpDebug":false,"Istanbul":{"Timeout":10000,"BlockPeriod":1,"ProposerPolicy":0,"Epoch":30000,"SubGroupSize":21},"DocRoot":"","WsEndpoint":"0.0.0.0:8652","TxResendInterval":4,"TxResendCount":1000,"TxResendUseLegacy":false,"NoAccountCreation":false,"IsPrivate":false,"AutoRestartFlag":false,"RestartTimeOutFlag":900000000000,"DaemonPathFlag":"/home/ubuntu/klaytn/bin/kend","RPCGasCap":null,"RPCEVMTimeout":5000000000,"RPCTxFeeCap":0,"DisableUnsafeDebug":false,"StateRegenerationTimeLimit":60000000000}}
```

## admin_datadir <a id="admin_datadir"></a>

The `datadir` administrative property can be queried for the absolute path the running Klaytn node
currently uses to store all its databases. The default path is different depending on the node types
(kcn, kpn, and ken) and the OS type.

|  Client | Method invocation             |
| :-----: | ----------------------------- |
| Console | `admin.datadir`               |
|   RPC   | `{"method": "admin_datadir"}` |

**Parameters**

None

**Return Value**

| Type   | Description         |
| ------ | ------------------- |
| string | The `datadir` path. |

**Example**

Console

```javascript
> admin.datadir
"/home/user/Library/KEN"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_datadir","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"/your/dir/ken/data/dd"}
```

## admin_peers <a id="admin_peers"></a>

The `peers` administrative property can be queried for all the information known about the connected remote nodes at the networking granularity. These include general information about the nodes themselves as participants of the [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P overlay protocol, as well as specialized information added by each of the running application protocols.

|  Client | Method invocation           |
| :-----: | --------------------------- |
| Console | `admin.peers`               |
|   RPC   | `{"method": "admin_peers"}` |

**Parameters**

None

**Return Value**

| Type        | Description                                |
| ----------- | ------------------------------------------ |
| JSON string | The information about all connected peers. |

**Example**

Console

```javascript
> admin.peers
[{
    caps: ["istanbul/64"],
    id: "5d73afadf1eb4d6ccd1e10ab0f00301a1642b102fb521f170f4eaa4b3cb9a58788d1e2b387d6ce3726cb4786d034feb7dd17b5055b6d9a888520011e5756c89e",
    name: "Klaytn/validator-3/vX.X.X/XXXX-XXXX/goX.X.X",
    network: {
      inbound: true,
      localAddress: "127.0.0.1:32323",
      nodeType: "cn",
      remoteAddress: "127.0.0.1:63323",
      static: false,
      trusted: false
    },
    protocols: {
      istanbul: {
        difficulty: 52794,
        head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
        version: 64
      }
    }
},  /* ... */ {
    caps: ["istanbul/64"],
    id: "8bcf4297aa6bb46121bb20a18b7af8f1eaad7e7435c71cb64109511a73c5507744bca138ee76b52d06cecedde9d88fdfddbffc5c3b80c5cbace3c326d5df5f1f",
    name: "Klaytn/validator-2/vX.X.X/XXXX-XXXX/goX.X.X",
    networks: [{
      inbound: true,
      localAddress: "127.0.0.1:32323",
      nodeType: "cn",
      remoteAddress: "127.0.0.1:63247",
      static: false,
      trusted: false
    }],
    protocols: {
      istanbul: {
        difficulty: 52794,
        head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
        version: 64
      }
    }
}]
```

HTTP RPC

**NOTE**: All IP addresses below are shown as examples. Please replace them with the actual IP addresses in your execution environment.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_peers","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":[{"id":"144af69d2bb030c6a2a5ceee7445dc613e200f19358547cffc353d56e6c8a5b4186a6953c028b6afd0ab3c2bfc4c86f24b0bf855d0686b964ec65cefd3deec37","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.1:49355","remoteAddress":"10.0.0.1:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"a875620f67f0b12edb97d0ec269e7940f2505b1f62576f39858c37e1d7f956318c3a619239f03f806a79ccaa8e7e9b5def343c24a9fd2e9d715964e0952dd995","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"networks":[{"localAddress":"10.0.10.2:49353","remoteAddress":"10.0.0.2:32323","inbound":false,"trusted":false,"static":true}],"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"e18d6d4e0ffac0a51028a8d49a548295ac8ac50d064f3581600799a3ae761a61f0b39c38b4195e163e01f30db616debf61b5b2ddea716bc8fb1c907ce7a1de26","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.3:49354","remoteAddress":"10.0.0.3:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285900,"head":"0x2e228a45c7c9b9e6729b6c66b31957d6cb62ce53e32cedf156615a4e8a2e253a"}}}]}
```

## admin_addPeer <a id="admin_addpeer"></a>

The `addPeer` is an administrative method that requests adding a new remote node to the list of tracked static
nodes. The node will try to maintain connectivity to these nodes at all times, reconnecting every
once in a while if the remote connection goes down.

The method accepts a single argument kni, which means "Klaytn Network Identifier". It is similar to
the [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) concept in the geth. It is URL
of the remote peer to start tracking and returns a `BOOL` indicating whether the peer was accepted for
tracking or some error occurred.

|  Client | Method invocation                              |
| :-----: | ---------------------------------------------- |
| Console | `admin.addPeer(url)`                           |
|   RPC   | `{"method": "admin_addPeer", "params": [url]}` |

**Parameters**

| Name | Type   | Description       |
| ---- | ------ | ----------------- |
| url  | string | Peer's `kni` URL. |

**Return Value**

| Type | Description                                         |
| ---- | --------------------------------------------------- |
| bool | `true` if the peer was accepted, `false` otherwise. |

**Example**

Console

```javascript
> admin.addPeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323") //This is an example address.
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_removePeer <a id="admin_removepeer"></a>

The `removePeer` is an administrative method that requests removing a node from the list of tracked static
nodes.

The method accepts a single argument kni, which means "Klaytn Network Identifier". It is similar to
the [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) concept in the geth. It is URL
of the remote peer to be removed from a list and returns a `BOOL` indicating whether the peer was removed or some error occurred.

|  Client | Method invocation                                 |
| :-----: | ------------------------------------------------- |
| Console | `admin.removePeer(url)`                           |
|   RPC   | `{"method": "admin_removePeer", "params": [url]}` |

**Parameters**

| Name | Type   | Description       |
| ---- | ------ | ----------------- |
| url  | string | Peer's `kni` URL. |

**Return Value**

| Type | Description                                         |
| ---- | --------------------------------------------------- |
| bool | `true` if the peer was accepted, `false` otherwise. |

**Example**

Console

```javascript
> admin.removePeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323") //This is an example address.
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_startHTTP <a id="admin_starthttp"></a>

**NOTE**: This API replaces `admin_startRPC`. The `admin_startRPC` will be deprecated soon.

The `startHTTP` is an administrative method that starts an HTTP based [JSON RPC](http://www.jsonrpc.org/specification)
API webserver to handle client requests.

The method returns a boolean flag specifying whether the HTTP RPC listener was opened or not. Please note, only one HTTP endpoint is allowed to be active at any time.

|  Client | Method invocation                                                   |
| :-----: | ------------------------------------------------------------------- |
| Console | `admin.startHTTP(host, port, cors, apis)`                           |
|   RPC   | `{"method": "admin_startHTTP", "params": [host, port, cors, apis]}` |

**Parameters**

| Name | Type   | Description                                                                                                                                                                   |
| ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host | string | (optional) network interface to open the listener socket on (default:  `"localhost"`).                                                  |
| port | int    | (optional) network port to open the listener socket on (default:  `8551`).                                                              |
| cors | string | (optional) [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) header to use (default:  `""`). |
| apis | string | (optional) API modules to offer over this interface (default:  `"klay,net,rpc"`).                                                       |

**Return Value**

| Type | Description                                                 |
| ---- | ----------------------------------------------------------- |
| bool | `true` if the HTTP RPC listener was opened, `false` if not. |

**Example**

Console

```javascript
> admin.startHTTP("127.0.0.1", 8551)
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startHTTP","id":1, "params":["127.0.0.1", 8551, "", "klay"]}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"HTTP RPC already running on 127.0.0.1:8551"}}
```

## admin_stopHTTP <a id="admin_stophttp"></a>

**NOTE**: This API replaces `admin_stopRPC`. The `admin_stopRPC` will be deprecated soon.

The `stopHTTP` is an administrative method that closes the currently open HTTP RPC endpoint. As the node can only have a single HTTP endpoint running, this method takes no parameters, returning a boolean whether the endpoint was closed or not.

|  Client | Method invocation              |
| :-----: | ------------------------------ |
| Console | `admin.stopHTTP()`             |
|   RPC   | `{"method": "admin_stopHTTP"}` |

**Parameters**

None

**Return Value**

| Type | Description                                        |
| ---- | -------------------------------------------------- |
| bool | `true` if the endpoint was closed, `false` if not. |

**Example**

Console

```javascript
> admin.stopHTTP()
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopHTTP","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_startWS <a id="admin_startws"></a>

The `startWS` is an administrative method that starts an WebSocket based [JSON RPC](http://www.jsonrpc.org/specification)
API webserver to handle client requests.

The method returns a boolean flag specifying whether the WebSocket RPC listener was opened or not. Please note, only one WebSocket endpoint is allowed to be active at any time.

|  Client | Method invocation                                                 |
| :-----: | ----------------------------------------------------------------- |
| Console | `admin.startWS(host, port, cors, apis)`                           |
|   RPC   | `{"method": "admin_startWS", "params": [host, port, cors, apis]}` |

**Parameters**

| Name | Type   | Description                                                                                                                                                                   |
| ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host | string | (optional) network interface to open the listener socket on (default:  `"localhost"`).                                                  |
| port | int    | (optional) network port to open the listener socket on (default:  `8552`).                                                              |
| cors | string | (optional) [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) header to use (default:  `""`). |
| apis | string | (optional) API modules to offer over this interface (default:  `"klay,net,personal"`).                                                  |

**Return Value**

| Type | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| bool | `true` if the WebSocket RPC listener was opened, `false` if not. |

**Example**

Console

```javascript
> admin.startWS("127.0.0.1", 8552)
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startWS","params":["127.0.0.1", 8552, "", "klay"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_stopWS <a id="admin_stopws"></a>

The `stopWS` is an administrative method that closes the currently open WebSocket RPC endpoint. As the node can only have a single WebSocket endpoint running, this method takes no parameters, returning a boolean whether the endpoint was closed or not.

|  Client | Method invocation            |
| :-----: | ---------------------------- |
| Console | `admin.stopWS()`             |
|   RPC   | `{"method": "admin_stopWS"}` |

**Parameters**

None

**Return Value**

| Type | Description                                        |
| ---- | -------------------------------------------------- |
| bool | `true` if the endpoint was closed, `false` if not. |

**Example**

Console

```javascript
> admin.stopWS()
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopWS","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_exportChain <a id="admin_exportchain"></a>

The `exportChain` is an administrative method that exports the blockchain to a file.

|  Client | Method invocation                                                                    |
| :-----: | ------------------------------------------------------------------------------------ |
| Console | `admin.exportChain(fileName)`                                                        |
|   RPC   | `{"method": "admin_exportChain"}, "params": [fileName, startBlockNum, endBlockNum]}` |

**Parameters**

| Name          | Type   | Description                                                                  |
| ------------- | ------ | ---------------------------------------------------------------------------- |
| fileName      | string | the fully qualified path to the file where the blockchain must be exported.  |
| startBlockNum | int    | (optional) The first block number of the range to export. |
| endBlockNum   | int    | (optional) The last block number of the range.            |

**Return Value**

| Type | Description                                   |
| ---- | --------------------------------------------- |
| bool | `true` if chain was exported, `false` if not. |

**Example**

Console

```javascript
> admin.exportChain("/tmp/chain.txt")
true
> admin.exportChain("/tmp/chain.txt", 555)
true
> admin.exportChain("/tmp/chain.txt", 1, 1000)
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_exportChain","params":["/tmp/chain.txt"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_importChain <a id="admin_importchain"></a>

The `importChain` is an administrative method that imports an exported chain from a file into a node.
This method imports only blocks that haven't existed in a Klaytn node. This method does not delete any data of the existing chain.

|  Client | Method invocation                                        |
| :-----: | -------------------------------------------------------- |
| Console | `admin.importChain(fileName)`                            |
|   RPC   | `{"method": "admin_importChain"}, "params": [fileName]}` |

**Parameters**

| Name     | Type   | Description                                                               |
| -------- | ------ | ------------------------------------------------------------------------- |
| fileName | string | the fully qualified path to the file containing the chain to be imported. |

**Return Value**

| Type | Description                                   |
| ---- | --------------------------------------------- |
| bool | `true` if chain was imported, `false` if not. |

**Example**

Console

```javascript
> admin.importChain("/tmp/chain.txt")
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_importChain","params":["/tmp/chain.txt"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_importChainFromString <a id="admin_importchainfromstring"></a>

The `importChainFromString` is an administrative method that imports a chain from a RLP-encoded string of blocks into a Klaytn node.
This only works if there is no existing chain in a Klaytn node. This method does not delete any data of the existing chain.

|  Client | Method invocation                                                    |
| :-----: | -------------------------------------------------------------------- |
| Console | `admin.importChainFromString(blockRlp)`                              |
|   RPC   | `{"method": "admin_importChainFromString"}, "params": [<blockRlp>]}` |

**Parameters**

| Name     | Type   | Description                                                                                                                              |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| blockRlp | string | the RLP-encoded string that represents the blocks to be imported. (equals to the return value of `debug.getBlockRlp`) |

**Return Value**

| Type | Description                                        |
| ---- | -------------------------------------------------- |
| bool | `true` if a chain was imported, or `false` if not. |

**Example**

Console

```javascript
> admin.importChainFromString("f9071...080c0")
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_importChainFromString","params":["f9071...080c0"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_startStateMigration <a id="admin_startstatemigration"></a>

The `startStateMigration` is an administrative method that starts a state migration and removes old state/storage trie nodes. This can save the storage space of a Klaytn node.
The method returns an error if it fails to start a state migration, or `null` if it succeeds to start.
NOTE: After the state migration, the node cannot serve APIs with previous states.

|  Client | Method invocation                         |
| :-----: | ----------------------------------------- |
| Console | `admin.startStateMigration()`             |
|   RPC   | `{"method": "admin_startStateMigration"}` |

**Parameters**

None

**Return Value**

| Type  | Description                                                            |
| ----- | ---------------------------------------------------------------------- |
| Error | `null` if the state migration has started, or an error message if not. |

**Example**

Console

```javascript
> admin.startStateMigration()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startStateMigration","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## admin_stopStateMigration <a id="admin_stopstatemigration"></a>

The `stopStateMigration` is an administrative method that stops the currently running state migration.
This method takes no parameters and returns `null` or an error whether the state migration was stopped or not.

|  Client | Method invocation                        |
| :-----: | ---------------------------------------- |
| Console | `admin.stopStateMigration()`             |
|   RPC   | `{"method": "admin_stopStateMigration"}` |

**Parameters**

None

**Return Value**

| Type  | Description                                                   |
| ----- | ------------------------------------------------------------- |
| Error | `null` if the state migration is stopped, or an error if not. |

**Example**

Console

```javascript
> admin.stopStateMigration()
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopStateMigration","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## admin_stateMigrationStatus <a id="admin_statemigrationstatus"></a>

The `stateMigrationStatus` is an administrative method that returns the status information of the state migration.
This method takes no parameters and returns the status of the currently running state migration.

|  Client | Method invocation                          |
| :-----: | ------------------------------------------ |
| Console | `admin.stateMigrationStatus`               |
|   RPC   | `{"method": "admin_stateMigrationStatus"}` |

**Parameters**

None

**Return Value**

| Name                 | Type    | Description                                                                                                         |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| committed            | int     | `committed` is the number of trie nodes that have been copied by the state migration.                               |
| err                  | Error   | `null` if the state migration finished well, or an error if not.                                                    |
| isMigration          | bool    | `true` if the state migration is running, or `false` if not.                                                        |
| migrationBlockNumber | uint64  | a blockNumber which the state migration started at. (`0` if the state migration is not running.) |
| pending              | int     | `pending` represents the number of trie nodes that have not been processed by the state migration.                  |
| progress             | float64 | `progress` is the progress of the state migration calculated in percent.                                            |
| read                 | int     | `read` represents the number of trie nodes that have been read by the state migration.                              |

**Example**

Console

```javascript
> admin.stateMigrationStatus
{
  committed: 1585169,
  err: "null",
  isMigration: true,
  migrationBlockNumber: 32527233,
  pending: 27677,
  progress: 0.3662109375,
  read: 1587473
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stateMigrationStatus","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"committed":14995692,"err":"null","isMigration":true,"migrationBlockNumber":32630836,"pending":19699,"progress":25,"read":14997777}}
```

## admin_saveTrieNodeCacheToDisk <a id="admin_saveTrieNodeCacheToDisk"></a>

The `saveTrieNodeCacheToDisk` is an administrative method that starts saving the cached trie node to the disk to reuse them when the node restarts. Cached trie node data will be stored to and loaded from  `$DATA_DIR/fastcache` . This method returns an error if the saving process has been already triggered or trie node cache is disabled. This feature is supported since Klaytn 1.5.3.

|  Client | Method invocation                             |
| :-----: | --------------------------------------------- |
| Console | `admin.saveTrieNodeCacheToDisk()`             |
|   RPC   | `{"method": "admin_saveTrieNodeCacheToDisk"}` |

**Parameters**

None

**Return Value**

| Type  | Description                                                             |
| ----- | ----------------------------------------------------------------------- |
| Error | `null` if saving the trie node has started, or an error message if not. |

**Example**

Console

```javascript
> admin.saveTrieNodeCacheToDisk()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_saveTrieNodeCacheToDisk", "id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## admin_setMaxSubscriptionPerWSConn <a id="admin_setMaxSubscriptionPerWSConn"></a>

The `setMaxSubscriptionPerWSConn` is an administrative method that sets the maximum allowed number of subscriptions per single WebSocket connection. For example, if the maximum number is set to five and a user requests more than five subscriptions through the `klay_subscribe` API, an error message "Maximum 5 subscriptions are allowed for a WebSocket connection" will be displayed. This feature is supported since Klaytn 1.6.0.

|  Client | Method invocation                                 |
| :-----: | ------------------------------------------------- |
| Console | `admin.setMaxSubscriptionPerWSConn(limit)`        |
|   RPC   | `{"method": "admin_setMaxSubscriptionPerWSConn"}` |

**Parameters**

| Name  | Type | Description                                                                  |
| ----- | ---- | ---------------------------------------------------------------------------- |
| limit | int  | The maximum allowed number of subscriptions per single WebSocket connection. |

**Return Value**

| Type  | Description                                                                      |
| ----- | -------------------------------------------------------------------------------- |
| Error | `null` if the limit is set successfully; otherwise, it returns an error message. |

**Example**

Console

```javascript
> admin.setMaxSubscriptionPerWSConn(5)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_setMaxSubscriptionPerWSConn", "params":[5], "id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
