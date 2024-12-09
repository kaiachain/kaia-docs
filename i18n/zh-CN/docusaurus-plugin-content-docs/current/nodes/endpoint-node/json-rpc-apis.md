# JSON-RPC 应用程序接口

端点节点提供 JSON-RPC 应用程序接口。 启用/禁用 API 的方法如下。 有关详细的 API 规范，请参阅 [JSON-RPC APIs](../../../references/json-rpc/klay/account-created) 。

**注意**：通过 HTTP (`rpc`) 或 WebSocket (`ws`) 接口提供 API 会让每个
访问可以访问此接口的 API（DApp、浏览器标签等）。 请注意启用哪些应用程序接口
。 默认情况下，Kaia 通过 IPC（"ipc"）接口启用所有 API，但对于 "rpc "和 "ws"，必须显式启用所需模块。

## 启用应用程序接口 <a id="enabling-apis"></a>

### 从命令行<a id="from-commandline"></a>

要通过 Kaia RPC 端点提供 API，请使用 `--${interface}api`
命令行参数指定它们，其中 `${interface}` 可以是 HTTP 端点的 `rpc` 或 WebSocket 端点的 `ws`。

ipc\` 通过 unix 套接字（Unix）或命名管道（Windows）端点提供所有 API，无需任何标记。

您可以启动一个 Kaia 节点，其中包含您要添加的特定 API，就像下面的示例一样。 但请记住，一旦启动节点，就无法更改 API。

示例）启动 Kaia 节点并启用`kaia`和`net`模块：

```shell
$ ken --rpcapi klay,net --rpc --{other options}
```

必须使用 `--rpc` 标记显式启用 HTTP RPC 接口。

### 使用配置<a id="using-configuration"></a>

请更新 [Configuration File](../../misc/operation/configuration.md) 中的 `RPC_ENABLE`、`RPC_API`、`WS_ENABLE` 和 `WS_API` 属性。

## 查询已启用的应用程序接口<a id="querying-enabled-apis"></a>

要确定一个接口提供哪些 API，可以调用 `modules` JSON-RPC 方法。 以
为例，通过`rpc`接口：

**IPC**

```javascript
$ ken attach --datadir<DATA_DIR>
欢迎访问 Kaia JavaScript 控制台！

 instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
  datadir：/var/kend/data
  modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

将在控制台输出中列出所有启用的模块。

```
  模块： admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
```

**HTTP**

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "rpc_modules", "params":[], "id":1}' https://public-en-kairos.node.kaia.io
```

将显示所有已启用的模块，包括版本号：

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

## 禁用不安全的调试 API<a id="disabling-unsafe-debug-apis"></a>

某些调试命名空间 API 不安全/不适合向公众开放。
我们建议您只向授权用户提供调试命名空间 API。
但是，如果您想维护公共 EN 并向公众提供调试命名空间 API，
，我们强烈建议您设置`rpc.unsafe-debug.disable`标志，这将禁用不安全/不适合向公众开放的 API
，并只启用调试命名空间 API 的子集。

启用的应用程序接口如下：

- [虚拟机跟踪]（.../.../.../references/json-rpc/debug/trace-bad-block）API，但功能有限（只允许使用[预定义跟踪器]（.../.../../references/json-rpc/debug/trace-bad-block）。 参见参数/跟踪选项）。
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

要设置 "rpc.unsafe-debug.disable "标志，请在 "kend.conf "文件中添加以下一行。

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
