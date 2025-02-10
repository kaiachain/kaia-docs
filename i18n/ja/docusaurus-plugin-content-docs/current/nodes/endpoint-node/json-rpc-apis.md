# JSON-RPC API

Endpoint NodeはJSON-RPC APIを公開します。 APIの有効／無効は以下のように設定できる。 APIの詳細仕様については、[JSON-RPC API](../../../references/json-rpc/klay/account-created)をご参照ください。

**注**：注意: HTTP (`rpc`) または WebSocket (`ws`) インターフェース上で API を提供すると、このインターフェースにアクセスできるすべての人 (DApps, ブラウザのタブなど) に
アクセス権が与えられます。 どのAPIを有効にするかは注意してください。 デフォルトでは、Kaia は IPC (`ipc`) インターフェース上のすべての API を有効にするが、`rpc` と `ws` については必要なモジュールを明示的に有効にする必要がある。

## APIの有効化 <a id="enabling-apis"></a>

### コマンドラインから<a id="from-commandline"></a>

KaiaのRPCエンドポイント上でAPIを提供するには、`--${interface}api`
コマンドライン引数で指定してください。ここで `${interface}` はHTTPエンドポイントの場合は `rpc` 、WebSocketエンドポイントの場合は `ws` となります。

ipc\` は、フラグなしで unix ソケット (Unix) または名前付きパイプ (Windows) のエンドポイントを介してすべての API を提供する。

以下の例のように、追加したい特定のAPIを持つKaiaノードを起動することができます。 しかし、一度ノードを立ち上げるとAPIを変更することはできないことを覚えておいてほしい。

例) `kaia` と `net` モジュールを有効にして Kaia ノードを起動する：

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

`rpc.unsafe-debug.disable` フラグを設定するには、`kend.conf` ファイルに以下の行を追加する。

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
