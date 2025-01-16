# JSON-RPC API

Endpoint NodeはJSON-RPC APIを公開します。 APIの有効／無効は以下のように設定できる。 APIの詳細仕様については、[JSON-RPC API](../../../references/json-rpc/klay/account-created)をご参照ください。

**注**\*：注意: HTTP (`rpc`) または WebSocket (`ws`) インターフェース上で API を提供すると、このインターフェースにアクセスできるすべての人 (DApps, ブラウザのタブなど) に
アクセス権が与えられます。 どのAPI（
）を有効にするかは注意してください。 By default, Klaytn enables all APIs over the IPC (`ipc`) interface but for `rpc` and `ws` required modules have to be explicitly enabled.

## APIの有効化 <a id="enabling-apis"></a>

### コマンドラインから<a id="from-commandline"></a>

To offer the APIs over the Klaytn RPC endpoints, please specify them with the `--${interface}api`
command-line argument where `${interface}` can be `rpc` for the HTTP endpoint or `ws` for the WebSocket endpoint.

ipc\` は、フラグなしで unix ソケット (Unix) または名前付きパイプ (Windows) のエンドポイントを介してすべての API を提供する。

You can launch a Klaytn node with specific APIs you want to add like the example below. しかし、一度ノードを立ち上げるとAPIを変更することはできないことを覚えておいてほしい。

Example) launching a Klaytn node with `klay` and `net` modules enabled:

```shell
$ ken --rpcapi klay,net --rpc --{other options}
```

HTTPのRPCインターフェイスは、`--rpc`フラグを使って明示的に有効にしなければならない。

### コンフィギュレーションの使用<a id="using-configuration"></a>

設定ファイル](../../misc/operation/configuration.md)の `RPC_ENABLE`、`RPC_API`、`WS_ENABLE`、`WS_API` プロパティを更新してください。

## 有効なAPIを問い合わせる<a id="querying-enabled-apis"></a>

インターフェースが提供するAPIを決定するには、 `modules` JSON-RPCメソッドを呼び出すことができる。
`rpc` インターフェース上の例：

**IPC**

```javascript
$ ken attach --datadir<DATA_DIR>
カイアJavaScriptコンソールへようこそ！

 インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
  datadir：/var/kend/data
  modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

は、コンソール出力に有効なモジュールをすべてリストアップする。

```
  モジュール: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
```

**HTTP**

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "rpc_modules", "params":[], "id":1}' https://public-en-kairos.node.kaia.io
```

をクリックすると、バージョン番号を含む有効なモジュールがすべて表示される：

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

## 安全でないデバッグAPIを無効にする<a id="disabling-unsafe-debug-apis"></a>

一部のデバッグ名前空間APIは、公開するには安全でない／不適切である。
デバッグ・ネームスペース API は、許可されたユーザーだけに提供することをお勧めします。
しかし、公開ENを維持し、デバッグネームスペースのAPIを公開したい場合は、
`rpc.unsafe-debug.disable` フラグを設定することを強く推奨する。このフラグを設定すると、公開するには安全でない/不適切なAPI
が無効になり、デバッグネームスペースのAPIのサブセットのみが有効になる。

有効なAPIは以下の通り：

- [VMトレース](../../../references/json-rpc/debug/trace-bad-block)API、ただし機能は制限される（[定義済みトレーサー](../../../references/json-rpc/debug/trace-bad-block)のみ使用可能）。 params/tracingOptions 参照)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

rpc.unsafe-debug.disable` フラグを設定するには、`kend.conf\` ファイルに以下の行を追加する。

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
