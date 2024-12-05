---
description: 클레이튼 노드를 제어하기 위한 API입니다.
---

# admin

네임스페이스 `admin`을 사용하면 여러 비표준 RPC 메서드에 액세스할 수 있습니다. 네트워크 피어 및 RPC를 포함하되 이에 국한되지 않는 클레이튼 인스턴스를 세밀하게 제어할 수 있습니다.

## admin_nodeInfo <a id="admin_nodeinfo"></a>

`nodeInfo` 관리 속성은 실행 중인 클레이튼 노드에 대해 알려진 모든 정보를 네트워크 단위로
클레이튼 노드에 대해 알려진 모든 정보를 조회할 수 있습니다. 여기에는 [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P 오버레이 프로토콜의 참여자로서 노드 자체에 대한 일반 정보와 실행 중인 각 애플리케이션 프로토콜에 의해 추가된 특수 정보가 포함됩니다.

| 클라이언트 | 메서드 호출                         |
| :---: | ------------------------------ |
|   콘솔  | `admin.nodeInfo`               |
|  RPC  | `{"method": "admin_nodeInfo"}` |

**매개변수**

None

**리턴 값**

| 유형          | 설명        |
| ----------- | --------- |
| JSON string | 노드 정보입니다. |

**예시**

콘솔

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

`nodeConfig` 관리 속성은 실행 중인 Klaytn 노드의 모든 설정에 대해 쿼리할 수 있습니다.

| 클라이언트 | 메서드 호출                           |
| :---: | -------------------------------- |
|   콘솔  | `admin.nodeConfig`               |
|  RPC  | `{"method": "admin_nodeConfig"}` |

**매개변수**

None

**리턴 값**

| 유형          | 설명        |
| ----------- | --------- |
| JSON string | 노드 구성입니다. |

**예시**

콘솔

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

`datadir` 관리 속성은 실행 중인 클레이튼 노드가 현재 데이터베이스를 저장하는 데 사용하는
가 현재 모든 데이터베이스를 저장하는 데 사용하는 절대 경로를 조회할 수 있습니다. (kcn, kpn, ken) 및 OS 유형에 따라 기본 경로가 다릅니다.

| 클라이언트 | 메서드 호출                        |
| :---: | ----------------------------- |
|   콘솔  | `admin.datadir`               |
|  RPC  | `{"method": "admin_datadir"}` |

**매개변수**

None

**리턴 값**

| 유형     | 설명               |
| ------ | ---------------- |
| string | `datadir` 경로입니다. |

**예시**

콘솔

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

`peers` 관리 속성은 네트워킹 세부 수준에서 연결된 원격 노드에 대해 알려진 모든 정보를 쿼리할 수 있습니다. [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P
오버레이 프로토콜의 참여자로서 노드 자체에 대한 일반 정보와 실행 중인 각 애플리케이션 프로토콜이 추가한 특수 정보가 포함됩니다.

| 클라이언트 | 메서드 호출                      |
| :---: | --------------------------- |
|   콘솔  | `admin.peers`               |
|  RPC  | `{"method": "admin_peers"}` |

**매개 변수**

None

**리턴 값**

| 유형          | 설명                   |
| ----------- | -------------------- |
| JSON string | 연결된 모든 피어에 대한 정보입니다. |

**예시**

콘솔

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

**참고**: 아래의 모든 IP 주소는 예시입니다. 실행 환경의 실제 IP 주소로 바꾸어 사용하시기 바랍니다.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_peers","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":[{"id":"144af69d2bb030c6a2a5ceee7445dc613e200f19358547cffc353d56e6c8a5b4186a6953c028b6afd0ab3c2bfc4c86f24b0bf855d0686b964ec65cefd3deec37","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.1:49355","remoteAddress":"10.0.0.1:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"a875620f67f0b12edb97d0ec269e7940f2505b1f62576f39858c37e1d7f956318c3a619239f03f806a79ccaa8e7e9b5def343c24a9fd2e9d715964e0952dd995","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"networks":[{"localAddress":"10.0.10.2:49353","remoteAddress":"10.0.0.2:32323","inbound":false,"trusted":false,"static":true}],"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"e18d6d4e0ffac0a51028a8d49a548295ac8ac50d064f3581600799a3ae761a61f0b39c38b4195e163e01f30db616debf61b5b2ddea716bc8fb1c907ce7a1de26","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.3:49354","remoteAddress":"10.0.0.3:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285900,"head":"0x2e228a45c7c9b9e6729b6c66b31957d6cb62ce53e32cedf156615a4e8a2e253a"}}}]}
```

## admin_addPeer <a id="admin_addpeer"></a>

`addPeer`는 추적된 정적 노드 목록에 새 원격 노드를 추가하도록 요청하는 관리 메서드입니다. 노드는 이러한 노드에 대한 연결을 항상 유지하려고 시도하며, 원격 연결이 끊어질 때마다
가끔 원격 연결이 끊어지면 다시 연결합니다.

이 메서드는 "클레이튼 네트워크 식별자"를 의미하는 단일 인자 kni를 받습니다. 이는
geth의 [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) 개념과 유사합니다. 원격 피어의 URL
를 전달받아 추적을 시작하고, 상대방이 추적을 수락했는지 또는 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

| 클라이언트 | 메서드 호출                                         |
| :---: | ---------------------------------------------- |
|   콘솔  | `admin.addPeer(url)`                           |
|  RPC  | `{"method": "admin_addPeer", "params": [url]}` |

**매개변수**

| 이름  | 유형     | 설명             |
| --- | ------ | -------------- |
| url | string | 피어의 `kni` URL. |

**리턴 값**

| 유형   | 설명                                  |
| ---- | ----------------------------------- |
| bool | 피어가 수락된 경우 `true`, 그렇지 않으면 `false`. |

**예시**

콘솔

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

`removePeer`는 추적된 정적 노드 목록에서 노드 제거를 요청하는 관리 메서드입니다.

이 메서드는 "클레이튼 네트워크 식별자"를 의미하는 단일 인자 kni를 받습니다. 이는
geth의 [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) 개념과 유사합니다. 제거할 원격 피어의 URL
목록에서 제거할 원격 피어의 URL을 받고, 피어가 제거되었는지 또는 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

| 클라이언트 | 메서드 호출                                            |
| :---: | ------------------------------------------------- |
|   콘솔  | `admin.removePeer(url)`                           |
|  RPC  | `{"method": "admin_removePeer", "params": [url]}` |

**매개변수**

| 이름  | 유형     | 설명             |
| --- | ------ | -------------- |
| url | string | 피어의 `kni` URL. |

**리턴 값**

| 유형   | 설명                                  |
| ---- | ----------------------------------- |
| bool | 피어가 수락된 경우 `true`, 그렇지 않으면 `false`. |

**예시**

콘솔

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

**참고**: 이 API는 `admin_startRPC`를 대체합니다. `admin_startRPC`는 곧 더 이상 사용되지 않습니다.

`startHTTP`는 HTTP 기반 [JSON RPC](http://www.jsonrpc.org/specification)를 시작하는 관리 메서드입니다.

이 메서드는 HTTP RPC 리스너가 열렸는지 여부를 지정하는 부울 플래그를 반환합니다. 한 번에 하나의 HTTP 엔드포인트만 활성화할 수 있다는 점에 유의하세요.

| 클라이언트 | 메서드 호출                                                              |
| :---: | ------------------------------------------------------------------- |
|   콘솔  | `admin.startHTTP(host, port, cors, apis)`                           |
|  RPC  | `{"method": "admin_startHTTP", "params": [host, port, cors, apis]}` |

**매개변수**

| 이름   | 유형     | 설명                                                                                                                                            |
| ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| host | string | (선택 사항) 수신기 소켓을 열 네트워크 인터페이스(기본값: `"localhost"`).                                                       |
| port | int    | (선택 사항) 수신기 소켓을 열 네트워크 포트(기본값: `8551`).                                                                 |
| cors | string | (선택 사항) [크로스오리진 리소스 공유](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 사용할 헤더(기본값: `""`). |
| apis | string | (선택 사항) 이 인터페이스를 통해 제공할 API 모듈(기본값: `"klay,net,rpc"`).                                                  |

**리턴 값**

| 유형   | 설명                                         |
| ---- | ------------------------------------------ |
| bool | HTTP RPC 리스너가 열리면 `true`, 그렇지 않으면 `false`. |

**예시**

콘솔

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

**참고**: 이 API는 `admin_stopRPC`를 대체합니다. `admin_stopRPC`는 곧 더 이상 사용되지 않습니다.

`stopHTTP`는 현재 열려있는 HTTP RPC 엔드포인트를 닫는 관리 메서드입니다. 노드에는 하나의 HTTP 엔드포인트만 실행할 수 있으므로 이 메서드는 매개변수를 받지 않고 엔드포인트가 닫혔는지 여부만 부울로 반환합니다.

| 클라이언트 | 메서드 호출                         |
| :---: | ------------------------------ |
|   콘솔  | `admin.stopHTTP()`             |
|  RPC  | `{"method": "admin_stopHTTP"}` |

**매개변수**

None

**리턴 값**

| 유형   | 설명                                  |
| ---- | ----------------------------------- |
| bool | 엔드포인트가 닫히면 `true`, 닫히지 않으면 `false`. |

**예시**

콘솔

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

`startWS`는 웹소켓 기반의 [JSON RPC](http://www.jsonrpc.org/specification)를 실행하는 관리 메서드입니다.

이 메서드는 웹소켓 RPC 리스너가 열렸는지 여부를 지정하는 부울 플래그를 반환합니다. 웹소켓 엔드포인트는 한 번에 하나만 활성화할 수 있다는 점에 유의하세요.

| 클라이언트 | 메서드 호출                                                            |
| :---: | ----------------------------------------------------------------- |
|   콘솔  | `admin.startWS(host, port, cors, apis)`                           |
|  RPC  | `{"method": "admin_startWS", "params": [host, port, cors, apis]}` |

**매개변수**

| 이름   | 유형     | 설명                                                                                                                                            |
| ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| host | string | (선택 사항) 수신기 소켓을 열 네트워크 인터페이스(기본값: `"localhost"`).                                                       |
| port | int    | (선택 사항) 수신기 소켓을 열 네트워크 포트(기본값: `8552`).                                                                 |
| cors | string | (선택 사항) [크로스오리진 리소스 공유](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 사용할 헤더(기본값: `""`). |
| apis | string | (선택 사항) 이 인터페이스를 통해 제공할 API 모듈(기본값: `"klay,net,personal"`).                                             |

**리턴 값**

| 유형   | 설명                                         |
| ---- | ------------------------------------------ |
| bool | 웹소켓 RPC 리스너가 열렸으면 `true`, 그렇지 않으면 `false`. |

**예시**

콘솔

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

`stopWS`는 현재 열려있는 웹소켓 RPC 엔드포인트를 닫는 관리 메서드입니다. 노드에는 하나의 웹소켓 엔드포인트만 실행할 수 있으므로 이 메서드는 매개변수를 받지 않고 엔드포인트가 닫혔는지 여부만 부울로 반환합니다.

| 클라이언트 | 메서드 호출                       |
| :---: | ---------------------------- |
|   콘솔  | `admin.stopWS()`             |
|  RPC  | `{"method": "admin_stopWS"}` |

**매개변수**

None

**리턴 값**

| 유형   | 설명                                  |
| ---- | ----------------------------------- |
| bool | 엔드포인트가 닫히면 `true`, 닫히지 않으면 `false`. |

**예시**

콘솔

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

`exportChain`은 블록체인을 파일로 내보내는 관리 메서드입니다.

| 클라이언트 | 메서드 호출                                                                               |
| :---: | ------------------------------------------------------------------------------------ |
|   콘솔  | `admin.exportChain(fileName)`                                                        |
|  RPC  | `{"method": "admin_exportChain"}, "params": [fileName, startBlockNum, endBlockNum]}` |

**매개변수**

| 이름            | 유형     | 설명                                                |
| ------------- | ------ | ------------------------------------------------- |
| fileName      | string | 블록체인을 내보내야 하는 파일의 정규화된 경로입니다.                     |
| startBlockNum | int    | (선택 사항) 내보낼 범위의 첫 번째 블록 번호입니다. |
| endBlockNum   | int    | (선택 사항) 범위의 마지막 블록 번호입니다.      |

**리턴 값**

| 유형   | 설명                                     |
| ---- | -------------------------------------- |
| bool | 체인을 내보낸 경우 `true`, 내보내지 않은 경우 `false`. |

**예제**

콘솔

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

`importChain`은 파일에서 노드로 내보낸 체인을 가져오는 관리 메서드입니다.
이 메서드는 클레이튼 노드에 존재하지 않았던 블록만 가져옵니다. 이 메서드는 기존 체인의 데이터를 삭제하지 않습니다.

| 클라이언트 | 메서드 호출                                                   |
| :---: | -------------------------------------------------------- |
|   콘솔  | `admin.importChain(fileName)`                            |
|  RPC  | `{"method": "admin_importChain"}, "params": [fileName]}` |

**매개변수**

| 이름       | 유형     | 설명                          |
| -------- | ------ | --------------------------- |
| fileName | string | 가져올 체인이 포함된 파일의 정규화된 경로입니다. |

**리턴 값**

| 유형   | 설명                                       |
| ---- | ---------------------------------------- |
| bool | 체인을 가져온 경우 `true`, 그렇지 않은 경우 `false`입니다. |

**예시**

콘솔

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

`importChainFromString`은 RLP로 인코딩된 블록 문자열에서 클레이튼 노드로 체인을 가져오는 관리 메서드입니다.
이 메서드는 클레이튼 노드에 기존 체인이 없는 경우에만 작동합니다. 이 메서드는 기존 체인의 데이터를 삭제하지 않습니다.

| 클라이언트 | 메서드 호출                                                               |
| :---: | -------------------------------------------------------------------- |
|   콘솔  | `admin.importChainFromString(blockRlp)`                              |
|  RPC  | `{"method": "admin_importChainFromString"}, "params": [<blockRlp>]}` |

**매개변수**

| 이름       | 유형     | 설명                                                                                |
| -------- | ------ | --------------------------------------------------------------------------------- |
| blockRlp | string | 가져올 블록을 나타내는 RLP 인코딩된 문자열입니다. (`debug.getBlockRlp`의 반환 값과 동일). |

**리턴 값**

| 유형   | 설명                                    |
| ---- | ------------------------------------- |
| bool | 체인을 가져온 경우 `true`, 그렇지 않은 경우 `false`. |

**예시**

콘솔

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

`startStateMigration`은 상태 마이그레이션을 시작하고 오래된 상태/스토리지 트라이 노드를 제거하는 관리 메서드입니다. 이렇게 하면 Klaytn 노드의 저장 공간을 절약할 수 있습니다.
이 메서드는 상태 마이그레이션을 시작하지 못하면 에러를 반환하고, 시작에 성공하면 `null`을 반환합니다.
참고: 상태 마이그레이션 이후 노드는 이전 상태의 API를 제공할 수 없습니다.

| 클라이언트 | 메서드 호출                                    |
| :---: | ----------------------------------------- |
|   콘솔  | `admin.startStateMigration()`             |
|  RPC  | `{"method": "admin_startStateMigration"}` |

**매개변수**

None

**리턴 값**

| 유형    | 설명                   |
| ----- | -------------------- |
| Error | 상태 마이그레이션이 시작된 경우 오류 |

**예시**

콘솔

```javascript
> admin.startStateMigration()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startStateMigration","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## admin_stopStateMigration <a id="admin_startstatemigration"></a>

`stopStateMigration`은 현재 실행 중인 상태 마이그레이션을 중지하는 관리 메서드입니다.
이 메서드는 매개변수를 받지 않으며 상태 마이그레이션이 중지되었는지 여부에 관계없이 `null` 또는 오류를 반환합니다.

| 클라이언트 | 메서드 호출                                   |
| :---: | ---------------------------------------- |
|   콘솔  | `admin.stopStateMigration()`             |
|  RPC  | `{"method": "admin_stopStateMigration"}` |

**매개변수**

None

**리턴 값**

| 유형    | 설명                                             |
| ----- | ---------------------------------------------- |
| Error | 상태 마이그레이션이 중지된 경우 `null`, 그렇지 않은 경우 오류를 반환합니다. |

**예시**

콘솔

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

`stateMigrationStatus`는 상태 마이그레이션의 상태 정보를 반환하는 관리 메서드입니다.
이 메서드는 매개 변수를 받지 않으며 현재 실행 중인 상태 마이그레이션의 상태를 반환합니다.

| 클라이언트 | 메서드 호출                                     |
| :---: | ------------------------------------------ |
|   콘솔  | `admin.stateMigrationStatus`               |
|  RPC  | `{"method": "admin_stateMigrationStatus"}` |

**매개변수**

None

**리턴 값**

| 이름                   | 유형      | 설명                                                                        |
| -------------------- | ------- | ------------------------------------------------------------------------- |
| committed            | int     | `committed`는 상태 마이그레이션에 의해 복사된 시도 노드 수입니다.                                |
| err                  | Error   | 상태 마이그레이션이 잘 완료된 경우 `null`, 그렇지 않은 경우 오류를 반환합니다.                          |
| isMigration          | bool    | 상태 마이그레이션이 실행 중이면 `true`, 그렇지 않으면 `false`입니다.                             |
| migrationBlockNumber | uint64  | 상태 마이그레이션이 시작된 블록 번호입니다. (상태 마이그레이션이 실행 중이 아닌 경우 `0`). |
| pending              | int     | `pending`은 상태 마이그레이션이 처리되지 않은 시도 노드의 수를 나타냅니다.                            |
| progress             | float64 | `progress`는 상태 마이그레이션의 진행률을 백분율로 계산한 값입니다.                                |
| read                 | int     | `read`는 상태 마이그레이션에서 읽은 트라이 노드 수를 나타냅니다.                                   |

**예시**

콘솔

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

`saveTrieNodeCacheToDisk`는 저장된 트라이 노드를 디스크에 저장하여 노드 재시작 시 재사용할 수 있도록 하는 관리 메서드입니다. 캐시된 트라이 노드 데이터는 `$DATA_DIR/fastcache`에 저장되고 이로부터 로드됩니다. 저장 프로세스가 이미 트리거되었거나 트라이 노드 캐시가 비활성화되어 있으면 이 메서드는 오류를 반환합니다. 이 기능은 Klaytn 1.5.3부터 지원됩니다.

| 클라이언트 | 메서드 호출                                        |
| :---: | --------------------------------------------- |
|   콘솔  | `admin.saveTrieNodeCacheToDisk()`             |
|  RPC  | `{"method": "admin_saveTrieNodeCacheToDisk"}` |

**매개변수**

None

**리턴 값**

| 유형    | 설명                                                 |
| ----- | -------------------------------------------------- |
| Error | 트라이 노드 저장이 시작된 경우 `null`, 그렇지 않은 경우 오류 메시지를 반환합니다. |

**예시**

콘솔

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

`setMaxSubscriptionPerWSConn`은 단일 웹소켓 연결당 허용되는 최대 구독 개수를 설정하는 관리 메서드입니다. 예를 들어 최대 개수가 5개로 설정되어 있는데 사용자가 `klay_subscribe` API를 통해 5개 이상의 구독을 요청하면 "Maximum 5 subscriptions are allowed for a WebSocket connection"라는 오류 메시지가 표시됩니다. 이 기능은 Klaytn 1.6.0부터 지원됩니다.

| 클라이언트 | 메서드 호출                                            |
| :---: | ------------------------------------------------- |
|   콘솔  | `admin.setMaxSubscriptionPerWSConn(limit)`        |
|  RPC  | `{"method": "admin_setMaxSubscriptionPerWSConn"}` |

**매개변수**

| 이름    | 유형  | 설명                          |
| ----- | --- | --------------------------- |
| limit | int | 단일 웹소켓 연결당 허용되는 최대 구독 수입니다. |

**리턴 값**

| 유형    | 설명                                   |
| ----- | ------------------------------------ |
| Error | `null`을 반환하고, 그렇지 않으면 오류 메시지를 반환합니다. |

**예시**

콘솔

```javascript
> admin.setMaxSubscriptionPerWSConn(5)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_setMaxSubscriptionPerWSConn", "params":[5], "id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
