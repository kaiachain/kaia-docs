# 設定ファイル

この文書では、ノードの設定可能なプロパティについて説明します。 Kaiaノードパッケージは優れたデフォルトで出荷され、ほとんど設定を必要としない。 実行中のノードの設定を変更した場合は、その変更を反映させるためにノードを再起動する必要があります。

## SCN 設定ファイルの場所<a id="scn-configuration-file-location"></a>

- サービス・チェーン・コンセンサス・ノードを設定する `kscnd.conf`

設定ファイルは `conf` ディレクトリにあり、そのデフォルトの場所はアーカイブディストリビュー ションからのインストールかパッケージディストリビューションからのインストールかに よって異なります。

- アーカイブディストリビューションの場合、config ディレクトリの場所のデフォルトは `$INSTALL_PATH/kscn-linux-amd64/conf/` です。
- パッケージ配布の場合、config ディレクトリのデフォルトは `/etc/kscnd/conf/` です。

## 設定ファイルのフォーマット <a id="configuration-file-format"></a>

アーカイブディストリビューションでは `~/kscnd_home` で、パッケージディストリビューションでは `/var/kscnd/data` です。

```text
# Configuration file for the kcnd

NETWORK=
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
PORT=32323
SERVER_TYPE="fasthttp"
SYNCMODE="full"
VERBOSITY=3
MAXCONNECTIONS=100
# LDBCACHESIZE=10240
REWARDBASE="0x0"

...

DATA_DIR=
LOG_DIR=$DATA_DIR/logs
```

SCNで推奨されるtxpoolのサイズは以下の通り。

```text
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384
```

## プロパティ<a id="properties"></a>

コンフィギュレーション・ファイルには、以下の設定可能なプロパティがある。 SCN、SPN、SENコンフィギュレーションファイルは同じプロパティを持つ。

| 名称                                                                                          | 説明                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NETWORK                                                                                     | このノードが参加するネットワーク名。  この値は、NETWORK_IDが定義されていない場合に使用される。  ("cypress", "baobab")                                                                                                                                             |
| NETWORK_ID                                                             | カイアのネットワークID。  ローカル・プライベート・ネットワークを作成する場合は、自分のネットワークIDを定義する。  以下のIDは、設定済みのネットワーク用に予約されています。  <br/>8217 : Cypress (Main network) <br/>1000 : Aspen test network <br/>1001 : Baobab test network |
| PORT                                                                                        | P2Pポート。 (デフォルト："32323"）                                                                                                                                                                                                                       |
| SERVER_TYPE                                                            | JSON RPC サーバータイプ。  ("http", "fasthttp")                                                                                                                                                                                                       |
| SYNCMODE                                                                                    | ブロックチェーン同期モード。  ("fast", "full")                                                                                                                                                                                                              |
| VERBOSITY                                                                                   | Logging verbosity.  (0=サイレント、1=エラー、2=警告、3=情報、4=デバッグ、5=詳細)                                                                                                                                                                     |
| MAXCONNECTIONS                                                                              | 物理接続の最大数。  すべてのシングルチャンネルピアはMAXCONNECTIONSピアまで持つことができる。  すべてのマルチチャネルピアはMAXCONNECTIONS/2までのピアを持つことができる。  0に設定するとネットワーク接続が無効になる。 (デフォルト：10）                                                                                                      |
| LDBCACHESIZE                                                                                | LevelDBのインメモリキャッシュのサイズ（MiB）。 (デフォルト：768）                                                                                                                                                                                                      |
| REWARDBASE                                                                                  | ブロックコンセンサス報酬を受け取るアカウントアドレス。 このプロパティはCNにのみ適用される。                                                                                                                                                                                                                  |
| TXPOOL_EXEC_SLOTS_ALL        | 全アカウントの実行可能な取引スロットの最大数。 (デフォルト：4096）                                                                                                                                                                                                          |
| TXPOOL_NONEXEC_SLOTS_ALL     | 全アカウントの実行不可能なトランザクションスロットの最大数。 (デフォルト：1024）                                                                                                                                                                                                   |
| TXPOOL_EXEC_SLOTS_ACCOUNT    | アカウントごとに保証される実行可能なトランザクション・スロット数。 (デフォルト：16）                                                                                                                                                                                                  |
| TXPOOL_NONEXEC_SLOTS_ACCOUNT | アカウントごとに保証される実行不可能な取引スロットの最大数。 (デフォルト：64）                                                                                                                                                                                                     |
| TXPOOL_LIFE_TIME                                  | 実行不可能なトランザクションがキューに入れられる最大時間。 (デフォルト：SENは30m、SCN/SPNは5m）                                                                                                                                                                                      |
| RPC_ENABLE                                                             | HTTP-RPCサーバーが1に設定されている場合は、有効にする。                                                                                                                                                                                                                                 |
| RPC_API                                                                | HTTP-RPCインターフェースで提供されるAPIのカンマ区切りリスト。  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                                           |
| RPC_PORT                                                               | HTTP-RPCサーバーのリスニングポート。 (デフォルト："8551"）                                                                                                                                                                                                         |
| RPC_ADDR                                                               | HTTP-RPCサーバーのリスニング・インターフェース。 (デフォルト："localhost"）                                                                                                                                                                                              |
| RPC_CORSDOMAIN                                                         | クロスオリジンリクエストを受け付けるドメインのカンマ区切りリスト (ブラウザが強制)                                                                                                                                                                                                    |
| RPC_VHOSTS                                                             | リクエストを受け付けるバーチャルホスト名のカンマ区切りリスト (サーバー強制)。 Accepts '\*' wildcard. (デフォルト：{"localhost"}）。                                                                                                                     |
| WS_ENABLE                                                              | 1に設定されている場合は、WS-RPCサーバーを有効にする。                                                                                                                                                                                                                                   |
| WS_API                                                                 | WS-RPCインターフェイス上で提供されるAPI。  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                                                      |
| WS_ADDR                                                                | WS-RPC サーバーリスニングインターフェース。                                                                                                                                                                                                                                        |
| WS_PORT                                                                | WS-RPCサーバーのリスニングポート。 (デフォルト："8552"）                                                                                                                                                                                                           |
| WS_ORIGINS                                                             | ウェブソケットリクエストを受け付けるオリジン。 (デフォルト："localhost"）                                                                                                                                                                                                   |
| SC_MAIN_BRIDGE                                    | 1に設定されている場合は、メインブリッジサービスを有効にする。 サービスチェーンの設定に使用する。                                                                                                                                                                                                                |
| SC_MAIN_BRIDGE_PORT          | メインブリッジはこのポートでリッスンする。 (デフォルト："50505"）                                                                                                                                                                                                         |
| SC_MAIN_BRIDGE_INDEXING      | 1に設定されている場合、子チェーンデータへの高速アクセスのために、子チェーントランザクションのトランザクションハッシュを保存することを有効にする。                                                                                                                                                                                        |
| METRICS                                                                                     | 1 に設定されている場合は、メトリクスの収集とレポートを有効にします。                                                                                                                                                                                                                              |
| PROMETHEUS                                                                                  | プロメテウス・エクスポーターが1に設定されている場合、有効にする。                                                                                                                                                                                                                                |
| DB_NO_PARALLEL_WRITE         | 1に設定すると、永続データベースへのブロック・データの並列書き込みを無効にする。                                                                                                                                                                                                                         |
| MULTICHANNEL                                                                                | 1に設定されている場合は、ブロック伝搬専用のチャンネルを作成する。                                                                                                                                                                                                                                |
| SUBPORT                                                                                     | マルチチャンネルオプションが有効な場合のリスニングサブポート番号。 (デフォルト："32324"）                                                                                                                                                                                             |
| NO_DISCOVER                                                            | ディスカバリーオプションが1に設定されている場合はオフにする。                                                                                                                                                                                                                                  |
| BOOTNODES                                                                                   | ブートストラップ・ノードのカンマ区切りのkniアドレス。                                                                                                                                                                                                                                     |
| ADDITIONAL                                                                                  | その他のコマンドラインオプションについては 例) --txpool.nolocals                                                                                                                                                                                                       |
| DATA_DIR                                                               | カイアブロックチェーンのデータフォルダパス。                                                                                                                                                                                                                                           |
| LOG_DIR                                                                | ログフォルダのパス。                                                                                                                                                                                                                                                       |
