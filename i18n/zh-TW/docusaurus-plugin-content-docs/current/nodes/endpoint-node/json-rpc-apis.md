# JSON-RPC 應用程序接口

端點節點提供 JSON-RPC 應用程序接口。 啟用/禁用 API 的方法如下。 有關詳細的 API 規範，請參閱 [JSON-RPC APIs](../../../references/json-rpc/klay/account-created) 。

**注意**：通過 HTTP (`rpc`) 或 WebSocket (`ws`) 接口提供 API 會讓每個
訪問可以訪問此接口的 API（DApp、瀏覽器標籤等）。 請注意啟用哪些應用程序接口
。 默認情況下，Kaia 通過 IPC（"ipc"）接口啟用所有 API，但對於 "rpc "和 "ws"，必須顯式啟用所需模塊。

## 啟用應用程序接口 <a id="enabling-apis"></a>

### 從命令行<a id="from-commandline"></a>

要通過 Kaia RPC 端點提供 API，請使用 `--${interface}api`
命令行參數指定它們，其中 `${interface}` 可以是 HTTP 端點的 `rpc` 或 WebSocket 端點的 `ws`。

ipc\` 通過 unix 套接字（Unix）或命名管道（Windows）端點提供所有 API，無需任何標記。

您可以啟動一個 Kaia 節點，其中包含您要添加的特定 API，就像下面的示例一樣。 但請記住，一旦啟動節點，就無法更改 API。

示例）啟動 Kaia 節點並啟用`kaia`和`net`模塊：

```shell
$ ken --rpcapi klay,net --rpc --{other options}
```

必須使用 `--rpc` 標記顯式啟用 HTTP RPC 接口。

### 使用配置<a id="using-configuration"></a>

請更新 [Configuration File](../../misc/operation/configuration.md) 中的 `RPC_ENABLE`、`RPC_API`、`WS_ENABLE` 和 `WS_API` 屬性。

## 查詢已啟用的應用程序接口<a id="querying-enabled-apis"></a>

要確定一個接口提供哪些 API，可以調用 `modules` JSON-RPC 方法。 以
為例，通過`rpc`接口：

**IPC**

```javascript
$ ken attach --datadir<DATA_DIR>
歡迎訪問 Kaia JavaScript 控制檯！

 instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
  datadir：/var/kend/data
  modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

將在控制檯輸出中列出所有啟用的模塊。

```
  模塊： admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
```

**HTTP**

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "rpc_modules", "params":[], "id":1}' https://public-en-kairos.node.kaia.io
```

將顯示所有已啟用的模塊，包括版本號：

```
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "klay":"1.0",
      "miner":"1.0",
      "net":"1.0",
      "personal":"1.0",
      "rpc":"1.0",
      "txpool":"1.0",
      "web3":"1.0"
   }
}
```

## 禁用不安全的調試 API<a id="disabling-unsafe-debug-apis"></a>

某些調試命名空間 API 不安全/不適合向公眾開放。
我們建議您只向授權用戶提供調試命名空間 API。
但是，如果您想維護公共 EN 並向公眾提供調試命名空間 API，
，我們強烈建議您設置`rpc.unsafe-debug.disable`標誌，這將禁用不安全/不適合向公眾開放的 API
，並只啟用調試命名空間 API 的子集。

啟用的應用程序接口如下：

- [虛擬機跟蹤](../../../references/json-rpc/debug/trace-bad-block)API，但功能有限（只允許使用[預定義跟蹤器](../../../references/json-rpc/debug/trace-bad-block)。 參見參數/跟蹤選項）。
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

要設置 "rpc.unsafe-debug.disable "標誌，請在 "kend.conf "文件中添加以下一行。

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
