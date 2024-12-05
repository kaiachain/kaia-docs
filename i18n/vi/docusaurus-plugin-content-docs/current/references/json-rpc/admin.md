---
description: API dùng để kiểm soát nút Klaytn.
---

# admin

`Quản trị viên` namespace cung cấp cho bạn quyền truy cập vào một số phương pháp RPC phi tiêu chuẩn. Họ sẽ cho phép bạn quyền kiểm soát chi tiết đối với phiên bản Klaytn của bạn, bao gồm nhưng không giới hạn đối với mạng ngang hàng và quản lý điểm cuối RPC.
fine-grained control over your Klaytn instance, including but not limited to network peer and RPC
endpoint management.

## admin_nodeInfo <a id="admin_nodeinfo"></a>

Có thể truy vấn thuộc tính quản trị `nodeInfo` đối với tất cả thông tin đã biết về nút Klaytn đang chạy ở mức độ chi tiết của mạng.
Klaytn node at the networking granularity. Thuộc tính này bao gồm thông tin chung về nút như một thành phần tham gia của giao thức phủ P2P [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md), cũng như thông tin chuyên biệt được thêm vào bởi mỗi giao thức ứng dụng đang chạy, ví dụ như `klay`.
participant of the [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P
overlay protocol, as well as specialized information added by each of the running application protocols,
e.g., `klay`.

|    Máy khách    | Gọi phương pháp                |
| :-------------: | ------------------------------ |
| Bảng điều khiển | `admin.nodeInfo`               |
|       RPC       | `{"method": "admin_nodeInfo"}` |

**Tham số**

Không có

**Giá trị trả về**

| Loại      | Mô tả          |
| ---------- | -------------- |
| Chuỗi JSON | Thông tin nút. |

**Ví dụ**

Bảng điều khiển

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

Có thể truy vấn thuộc tính quản trị `datadir` cho đường dẫn tuyệt đối của nút Klaytn đang chạy hiện đang sử dụng để lưu trữ tất cả các cơ sở dữ liệu của nó.
currently uses to store all its databases. Đường dẫn mặc định khác nhau tùy thuộc vào loại nút (kcn, kpn và ken) và loại hệ điều hành.
(kcn, kpn, and ken) and the OS type.

|    Máy khách    | Gọi phương pháp               |
| :-------------: | ----------------------------- |
| Bảng điều khiển | `admin.datadir`               |
|       RPC       | `{"method": "admin_datadir"}` |

**Tham số**

Không có

**Giá trị trả về**

| type  | Mô tả                |
| ----- | -------------------- |
| chuỗi | Đường dẫn `datadir`. |

**Ví dụ**

Bảng điều khiển

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

Có thể truy vấn thuộc tính quản trị `peers` đối với tất cả thông tin đã biết về các nút từ xa được kết nối ở mức độ chi tiết của mạng. Thuộc tính này bao gồm thông tin chung về nút như một thành phần tham gia của giao thức phủ P2P [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md), cũng như thông tin chuyên biệt được thêm vào bởi mỗi giao thức ứng dụng đang chạy.

|    Máy khách    | Gọi phương pháp             |
| :-------------: | --------------------------- |
| Bảng điều khiển | `admin.peers`               |
|       RPC       | `{"method": "admin_peers"}` |

**Tham số**

Không có

**Giá trị trả về**

| type       | Mô tả                                                 |
| ---------- | ----------------------------------------------------- |
| Chuỗi JSON | Thông tin về tất cả các mạng ngang hàng được kết nối. |

**Ví dụ**

Bảng điều khiển

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

**LƯU Ý**: Tất cả các địa chỉ IP bên dưới là các ví dụ minh họa. Vui lòng thay thế chúng bằng địa chỉ IP thực trong môi trường thực thi của bạn.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_peers","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":[{"id":"144af69d2bb030c6a2a5ceee7445dc613e200f19358547cffc353d56e6c8a5b4186a6953c028b6afd0ab3c2bfc4c86f24b0bf855d0686b964ec65cefd3deec37","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.1:49355","remoteAddress":"10.0.0.1:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"a875620f67f0b12edb97d0ec269e7940f2505b1f62576f39858c37e1d7f956318c3a619239f03f806a79ccaa8e7e9b5def343c24a9fd2e9d715964e0952dd995","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"networks":[{"localAddress":"10.0.10.2:49353","remoteAddress":"10.0.0.2:32323","inbound":false,"trusted":false,"static":true}],"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"e18d6d4e0ffac0a51028a8d49a548295ac8ac50d064f3581600799a3ae761a61f0b39c38b4195e163e01f30db616debf61b5b2ddea716bc8fb1c907ce7a1de26","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.3:49354","remoteAddress":"10.0.0.3:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285900,"head":"0x2e228a45c7c9b9e6729b6c66b31957d6cb62ce53e32cedf156615a4e8a2e253a"}}}]}
```

## admin_addPeer <a id="admin_addpeer"></a>

`addPeer` là một phương pháp quản trị yêu cầu thêm nút từ xa mới vào danh sách các nút tĩnh được theo dõi.
nodes. Nút đó sẽ cố gắng duy trì kết nối liên tục với các nút này, thỉnh thoảng kết nối lại nếu kết nối từ xa gặp sự cố.
once in a while if the remote connection goes down.

Phương thức này chấp nhận một đối số duy nhất kni, nghĩa là "Mã định danh mạng lưới Klaytn". Tương tự với khái niệm [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) trong geth.
the [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) concept in the geth. Đó là URL của máy ngang hàng từ xa để bắt đầu theo dõi và trả về `BOOL` cho biết máy ngang hàng đó có được chấp nhận để theo dõi hoặc đã có lỗi xảy ra hay không.
of the remote peer to start tracking and returns a `BOOL` indicating whether the peer was accepted for
tracking or some error occurred.

|    Máy khách    | Gọi phương pháp                                |
| :-------------: | ---------------------------------------------- |
| Bảng điều khiển | `admin.addPeer(url)`                           |
|       RPC       | `{"method": "admin_addPeer", "params": [url]}` |

**Tham số**

| Tên | type  | Mô tả                         |
| --- | ----- | ----------------------------- |
| url | chuỗi | URL `kni` của máy ngang hàng. |

**Giá trị trả về**

| type | Mô tả                                                              |
| ---- | ------------------------------------------------------------------ |
| bool | `true` nếu máy ngang hàng được chấp nhận, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

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

`removePeer` là một phương pháp quản trị yêu cầu xóa một nút khỏi danh sách nút tĩnh được theo dõi.
nodes.

Phương thức này chấp nhận một đối số duy nhất kni, nghĩa là "Mã định danh mạng lưới Klaytn". Tương tự với khái niệm [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) trong geth.
the [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) concept in the geth. Đó là URL của máy ngang hàng từ xa sẽ bị xóa khỏi danh sách và trả về `BOOL` cho biết liệu máy ngang hàng đã bị xóa hay xảy ra lỗi nào đó.
of the remote peer to be removed from a list and returns a `BOOL` indicating whether the peer was removed or some error occurred.

|    Máy khách    | Gọi phương pháp                                   |
| :-------------: | ------------------------------------------------- |
| Bảng điều khiển | `admin.removePeer(url)`                           |
|       RPC       | `{"method": "admin_removePeer", "params": [url]}` |

**Tham số**

| Tên | type  | Mô tả                         |
| --- | ----- | ----------------------------- |
| url | chuỗi | URL `kni` của máy ngang hàng. |

**Giá trị trả về**

| type | Mô tả                                                              |
| ---- | ------------------------------------------------------------------ |
| bool | `true` nếu máy ngang hàng được chấp nhận, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

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

**LƯU Ý**: API này sẽ thay thế cho `admin_startRPC`. `admin_startRPC` sẽ sớm ngừng hoạt động.

`startWS` là phương pháp quản trị khởi chạy máy chủ web API [JSON RPC](http://www.jsonrpc.org/specification) dựa trên WebSocket để xử lý các yêu cầu của máy khách.

Phương thức này sẽ trả về một cờ boolean để xác định xem trình nghe HTTP RPC đã được mở hay chưa. Xin lưu ý rằng chỉ có một điểm cuối HTTP được phép hoạt động bất kỳ lúc nào.

|    Máy khách    | Gọi phương pháp                                                     |
| :-------------: | ------------------------------------------------------------------- |
| Bảng điều khiển | `admin.startHTTP(host, port, cors, apis)`                           |
|       RPC       | `{"method": "admin_startHTTP", "params": [host, port, cors, apis]}` |

**Tham số**

| Tên     | type  | Mô tả                                                                                                                                                                                     |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| máy chủ | chuỗi | (tùy chọn) giao diện mạng để mở socket trình nghe (mặc định: `"localhost"`).                                                                        |
| cổng    | int   | (tùy chọn) cổng mạng để mở socket trình nghe (mặc định: `8551`).                                                                                    |
| cors    | chuỗi | (tùy chọn) [Tiêu đề chia sẻ tài nguyên trên nhiều nguồn](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) cần sử dụng (mặc định: `""`). |
| apis    | chuỗi | (tùy chọn) các mô-đun API để cung cấp trên giao diện này (mặc định: `"klay,net,rpc"`).                                                              |

**Giá trị trả về**

| Loại | Mô tả                                                               |
| ----- | ------------------------------------------------------------------- |
| bool  | `true` nếu trình nghe HTTP RPC đã được mở, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

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

**LƯU Ý**: API này sẽ thay thế cho `admin_stopRPC`. `admin_stopRPC` sẽ sớm ngừng hoạt động.

`stopHTTP` là một phương pháp quản trị đóng điểm cuối HTTP RPC hiện đang mở. Vì nút này chỉ có thể có một điểm cuối HTTP duy nhất đang chạy, nên phương pháp này không nhận tham số mà trả về giá trị boolean cho dù điểm cuối có bị đóng hay không.

|    Máy khách    | Gọi phương pháp                |
| :-------------: | ------------------------------ |
| Bảng điều khiển | `admin.stopHTTP()`             |
|       RPC       | `{"method": "admin_stopHTTP"}` |

**Tham số**

Không có

**Giá trị trả về**

| type | Mô tả                                                  |
| ---- | ------------------------------------------------------ |
| bool | `true` nếu điểm cuối đã đóng, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

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

`startWS` là phương pháp quản trị khởi chạy máy chủ web API [JSON RPC](http://www.jsonrpc.org/specification) dựa trên WebSocket để xử lý các yêu cầu của máy khách.
API webserver to handle client requests.

Phương thức này sẽ trả về một cờ boolean để xác định xem trình nghe WebSocket RPC đã được mở hay chưa. Xin lưu ý rằng chỉ có một điểm cuối WebSocket được phép hoạt động bất kỳ lúc nào.

|    Máy khách    | Gọi phương pháp                                                   |
| :-------------: | ----------------------------------------------------------------- |
| Bảng điều khiển | `admin.startWS(host, port, cors, apis)`                           |
|       RPC       | `{"method": "admin_startWS", "params": [host, port, cors, apis]}` |

**Tham số**

| Tên     | type  | Mô tả                                                                                                                                                                                     |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| máy chủ | chuỗi | (tùy chọn) giao diện mạng để mở socket trình nghe (mặc định: `"localhost"`).                                                                        |
| cổng    | int   | (tùy chọn) cổng mạng để mở socket trình nghe (mặc định: `8552`).                                                                                    |
| cors    | chuỗi | (tùy chọn) [Tiêu đề chia sẻ tài nguyên trên nhiều nguồn](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) cần sử dụng (mặc định: `""`). |
| apis    | chuỗi | (tùy chọn) các mô-đun API để cung cấp trên giao diện này (mặc định: `"klay,net,personal"`).                                                         |

**Giá trị trả về**

| type | Mô tả                                                                    |
| ---- | ------------------------------------------------------------------------ |
| bool | `true` nếu trình nghe WebSocket RPC đã được mở, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

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

`stopWS` là một phương pháp quản trị đóng điểm cuối WebSocket RPC hiện đang mở. Vì nút này chỉ có thể có một điểm cuối WebSocket duy nhất đang chạy, nên phương pháp này không nhận tham số mà trả về giá trị boolean cho dù điểm cuối có bị đóng hay không.

|    Máy khách    | Gọi phương pháp              |
| :-------------: | ---------------------------- |
| Bảng điều khiển | `admin.stopWS()`             |
|       RPC       | `{"method": "admin_stopWS"}` |

**Tham số**

Không có

**Giá trị trả về**

| type | Mô tả                                                  |
| ---- | ------------------------------------------------------ |
| bool | `true` nếu điểm cuối đã đóng, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

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

`exportChain` là một phương pháp quản trị xuất chuỗi khối thành một tệp.

|    Máy khách    | Gọi phương pháp                                                                      |
| :-------------: | ------------------------------------------------------------------------------------ |
| Bảng điều khiển | `admin.exportChain(fileName)`                                                        |
|       RPC       | `{"method": "admin_exportChain"}, "params": [fileName, startBlockNum, endBlockNum]}` |

**Tham số**

| Tên           | type  | Mô tả                                                                        |
| ------------- | ----- | ---------------------------------------------------------------------------- |
| tên tệp tin   | chuỗi | đường dẫn đủ điều kiện đến tệp mà chuỗi khối phải được xuất.                 |
| startBlockNum | int   | (optional) The first block number of the range to export. |
| endBlockNum   | int   | (optional) The last block number of the range.            |

**Giá trị trả về**

| Loại | Mô tả                                                |
| ----- | ---------------------------------------------------- |
| bool  | `true` nếu chuỗi được xuất, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

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

`importChain` là một phương pháp quản trị để nhập một chuỗi đã xuất từ ​​một tệp vào một nút.
Phương thức này chỉ nhập các khối chưa có trong nút Klaytn. Phương thức này không xóa bất kỳ dữ liệu nào của chuỗi hiện có.

|    Máy khách    | Gọi phương pháp                                          |
| :-------------: | -------------------------------------------------------- |
| Bảng điều khiển | `admin.importChain(fileName)`                            |
|       RPC       | `{"method": "admin_importChain"}, "params": [fileName]}` |

**Tham số**

| Tên         | type  | Mô tả                                                   |
| ----------- | ----- | ------------------------------------------------------- |
| tên tệp tin | chuỗi | đường dẫn đủ điều kiện đến tệp chứa chuỗi sẽ được nhập. |

**Giá trị trả về**

| type | Mô tả                                                   |
| ---- | ------------------------------------------------------- |
| bool | `true` nếu chuỗi đã được nhập, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

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

`importChainFromString` là phương pháp quản trị nhập chuỗi từ chuỗi khối được mã hóa RLP vào nút Klaytn.
Phương thức này chỉ hoạt động nếu chưa có chuỗi nào trong nút Klaytn. Phương thức này không xóa bất kỳ dữ liệu nào của chuỗi hiện có.

|    Máy khách    | Gọi phương pháp                                                      |
| :-------------: | -------------------------------------------------------------------- |
| Bảng điều khiển | `admin.importChainFromString(blockRlp)`                              |
|       RPC       | `{"method": "admin_importChainFromString"}, "params": [<blockRlp>]}` |

**Tham số**

| Tên      | type  | Mô tả                                                                                                                   |
| -------- | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| blockRlp | chuỗi | chuỗi được mã hóa RLP đại diện cho các khối được nhập. (bằng giá trị trả về của `debug.getBlockRlp`) |

**Giá trị trả về**

| type | Mô tả                                                       |
| ---- | ----------------------------------------------------------- |
| bool | `true` nếu chuỗi đã được nhập hoặc ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

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

`startStateMigration` là một phương pháp quản trị để bắt đầu di chuyển trạng thái và loại bỏ các nút trie lưu trữ/trạng thái cũ. Nó có thể giúp tiết kiệm không gian lưu trữ của nút Klaytn.
Phương thức này sẽ trả về lỗi nếu không thể bắt đầu di chuyển trạng thái hoặc `null` khi bắt đầu thành công.
LƯU Ý: Sau khi di chuyển trạng thái, nút không thể cung cấp API với các trạng thái trước đó.

|    Máy khách    | Gọi phương pháp                           |
| :-------------: | ----------------------------------------- |
| Bảng điều khiển | `admin.startStateMigration()`             |
|       RPC       | `{"method": "admin_startStateMigration"}` |

**Tham số**

Không có

**Giá trị trả về**

| type | Mô tả                                                                                     |
| ---- | ----------------------------------------------------------------------------------------- |
| Lỗi  | `null` nếu quá trình di chuyển trạng thái đã bắt đầu hoặc thông báo lỗi nếu chưa bắt đầu. |

**Ví dụ**

Bảng điều khiển

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

`stopStateMigration` là một phương pháp quản trị để dừng quá trình di chuyển trạng thái hiện đang chạy.
Phương thức này không nhận tham số và trả về `null` hoặc báo lỗi dù quá trình di chuyển trạng thái có bị dừng hay không.

|    Máy khách    | Gọi phương pháp                          |
| :-------------: | ---------------------------------------- |
| Bảng điều khiển | `admin.stopStateMigration()`             |
|       RPC       | `{"method": "admin_stopStateMigration"}` |

**Tham số**

Không có

**Giá trị trả về**

| type | Mô tả                                                                            |
| ---- | -------------------------------------------------------------------------------- |
| Lỗi  | `null` nếu quá trình di chuyển trạng thái đã bị dừng hoặc báo lỗi nếu ngược lại. |

**Ví dụ**

Bảng điều khiển

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

`stateMigrationStatus` là một phương pháp quản trị trả về thông tin trạng thái của quá trình di chuyển trạng thái.
Phương thức này không nhận tham số và trả về trạng thái của quá trình di chuyển trạng thái hiện đang chạy.

|    Máy khách    | Gọi phương pháp                            |
| :-------------: | ------------------------------------------ |
| Bảng điều khiển | `admin.stateMigrationStatus`               |
|       RPC       | `{"method": "admin_stateMigrationStatus"}` |

**Tham số**

Không có

**Giá trị trả về**

| Tên                  | type    | Mô tả                                                                                                                           |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| đã lưu trữ           | int     | `committed` là số nút trie đã được sao chép bởi quá trình di chuyển trạng thái.                                                 |
| lỗi                  | Lỗi     | `null` nếu quá trình di chuyển trạng thái kết thúc thành công hoặc báo lỗi nếu ngược lại.                                       |
| isMigration          | bool    | `true` nếu quá trình di chuyển trạng thái đang chạy hoặc ngược lại sẽ là `false`.                                               |
| migrationBlockNumber | uint64  | blockNumber nơi quá trình di chuyển trạng thái bắt đầu. (`0` nếu quá trình di chuyển trạng thái không chạy.) |
| đang chờ xử lý       | int     | `pending` đại diện cho số lượng nút trie chưa được xử lý bởi quá trình di chuyển trạng thái.                                    |
| tiến trình           | float64 | `progress` là tiến trình di chuyển trạng thái được tính bằng phần trăm.                                                         |
| đọc                  | int     | `read` biểu thị số trie nút đã được đọc bởi quá trình di chuyển trạng thái.                                                     |

**Ví dụ**

Bảng điều khiển

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

`saveTrieNodeCacheToDisk` là một phương pháp quản trị bắt đầu lưu nút trie đã lưu trong bộ nhớ cache vào đĩa để sử dụng lại chúng khi nút khởi động lại. Dữ liệu nút trie đã lưu trong bộ nhớ cache sẽ được lưu trữ và tải từ `$DATA_DIR/fastcache` . Phương thức này trả về lỗi nếu quá trình lưu đã được kích hoạt hoặc bộ nhớ đệm nút trie bị tắt. Tính năng này được hỗ trợ kể từ Klaytn 1.5.3.

|    Máy khách    | Gọi phương pháp                               |
| :-------------: | --------------------------------------------- |
| Bảng điều khiển | `admin.saveTrieNodeCacheToDisk()`             |
|       RPC       | `{"method": "admin_saveTrieNodeCacheToDisk"}` |

**Tham số**

Không có

**Giá trị trả về**

| type | Mô tả                                                                    |
| ---- | ------------------------------------------------------------------------ |
| Lỗi  | `null` nếu quá trình lưu nút trie đã bắt đầu hoặc báo lỗi nếu ngược lại. |

**Ví dụ**

Bảng điều khiển

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

`setMaxSubscriptionPerWSConn` là phương pháp quản trị đặt số lượt đăng ký tối đa được phép cho mỗi kết nối WebSocket. Ví dụ, nếu số lượng tối đa được đặt là năm và người dùng yêu cầu nhiều hơn năm lượt đăng ký thông qua API `klay_subscribe`, một thông báo lỗi "Cho phép tối đa 5 đăng ký cho một kết nối WebSocket" sẽ được hiển thị. Tính năng này được hỗ trợ kể từ Klaytn 1.6.0.

|    Máy khách    | Gọi phương pháp                                   |
| :-------------: | ------------------------------------------------- |
| Bảng điều khiển | `admin.setMaxSubscriptionPerWSConn(limit)`        |
|       RPC       | `{"method": "admin_setMaxSubscriptionPerWSConn"}` |

**Tham số**

| Tên      | type | Mô tả                                                       |
| -------- | ---- | ----------------------------------------------------------- |
| giới hạn | int  | Số lượt đăng ký tối đa cho phép trên mỗi kết nối WebSocket. |

**Giá trị trả về**

| type | Mô tả                                                                      |
| ---- | -------------------------------------------------------------------------- |
| Lỗi  | `null` nếu đặt giới hạn thành công; nếu không sẽ trả về một thông báo lỗi. |

**Ví dụ**

Bảng điều khiển

```javascript
> admin.setMaxSubscriptionPerWSConn(5)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_setMaxSubscriptionPerWSConn", "params":[5], "id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
