# RPC API Reference

This document explains how to use Klaytn APIs. Most APIs except Toolkit API support remote protocols (RPC, Websocket) and Klaytn JavaScript Console. This document is written with `ken` as an example but most of APIs can be used on `kcn` and `kpn` as well.

**NOTE**: Since few APIs do not support both of remote protocols and Klaytn JavaScript console, APIs available in remote protocols are documented mainly. Rest of APIs will be documented later.

## Enabling APIs <a id="enabling-apis"></a>

To offer the APIs over the Klaytn RPC endpoints, please specify them with the `--${interface}api` command line argument where `${interface}` can be `rpc` for the HTTP endpoint or `ws` for the WebSocket endpoint.

`ipc` offers all APIs over the unix socket (Unix) or named pipe (Windows) endpoint without any flag.

You can launch a Klaytn node with specific APIs you want to add like the example below. But keep in mind that you can't change APIs once you launch the node.

Example) launching a Klaytn node with `klay` and `net` modules enabled:

```bash
$ ken --rpcapi klay,net --rpc --{other options}
```

The HTTP RPC interface must be explicitly enabled using the `--rpc` flag.

**NOTE**: Offering an API over the HTTP (`rpc`) or WebSocket (`ws`) interfaces will give everyone access to the APIs who can access this interface (DApps, browser tabs, etc). Be careful which APIs you enable. By default Klay enables all APIs over the IPC (`ipc`) interface but for `rpc` and `ws` required modules have to be explicitly enabled.

To determine which APIs an interface provides, the `modules` JSON-RPC method can be invoked. For example over an `rpc` interface:

**IPC**

```bash
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```bash
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' https://public-en-baobab.klaytn.net
```

will give all enabled modules including the version number:

```text
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "istanbul":"1.0",
      "klay":"1.0",
      "eth":"1.0",
      "miner":"1.0",
      "net":"1.0",
      "personal":"1.0",
      "rpc":"1.0",
      "txpool":"1.0",
      "web3":"1.0"
   }
}
```

## Disabling unsafe debug APIs <a id="disabling-unsafe-debug-apis"></a>

Some debug namespace APIs are unsafe/unappropriate to be opened to public.
We recommend you to provide the debug namespace APIs to authorized users only.
However, if you want to maintain a public EN and provide debug namespace APIs to the public,
we strongly recommend you to set the `rpc.unsafe-debug.disable` flag which will disable APIs
that are unsafe/unappropriate to be opened to the public and enable only a subset of the debug namespace APIs.

All other debug namespace APIs **EXCEPT FOR** the following APIs are restricted with `rpc.unsafe-debug.disable` flag:

- [VM Tracing](./debug/tracing.md) APIs, however with limited functionality (only [pre-defined tracers](./debug/tracing.md#tracing-options) are allowed)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

To set the `rpc.unsafe-debug.disable` flag, append the following line in the `kend.conf` file.

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
