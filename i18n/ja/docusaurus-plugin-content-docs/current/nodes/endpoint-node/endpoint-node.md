# エンドポイントノード

## 対象読者<a id="intended-audience"></a>

- [Kaia API](../../references/json-rpc/klay/account-created)を使ってトランザクションを送信したり、Kaiaネットワークの状態を照会したい人は、エンドポイントノードを介して行う必要があります。
- エンドポイントノードはカイアネットワークへのインターフェースである。

## エンドポイントノードの概要<a id="endpoint-node-overview"></a>

エンドポイントノードは以下の役割と機能を持つ。

- ブロックチェーンのデータを同期させる。
- 新しく受け取ったブロックを検証する。
- クエリーリクエストを処理する。
- トランザクション要求をプロキシノードに送信する。

Endpoint Node インストール・バイナリには、以下のインターフェースとユーティリティが付属しています。

- JSON-RPC API：JSON-RPCサーバーはノード内部で動作し、ブロックチェーンアプリケーション開発のための[API](../../references/json-rpc/klay/account-created)を公開する。 ノード管理APIもいくつかある。
- コマンドラインインターフェース：アカウント管理とノード設定機能を提供します。 インタラクティブなJavaScriptコンソールも提供され、ノードに添付される。 JavaScriptコンソールは、[caver-js API](../../references/sdk/caver-js/caver-js.md)のほとんどを実装しています。
