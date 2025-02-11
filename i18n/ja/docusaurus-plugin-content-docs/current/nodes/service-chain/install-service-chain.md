# サービスチェーンの設置

## 対象オーディエンス<a id="intended-audience"></a>

- メタバース、GameFi、NFT向けにブロックチェーンを構築したい企業
- 高いTPS、最小限の取引手数料、データプライバシーを必要とするdApp開発者。
- ローカル・プライベート・ネットワークや元帳データベースをテスト用に構築したい人。

## ServiceChainの概要<a id="service-chain-overview"></a>

ServiceChainは、価値移転、セキュリティ、高性能、カスタマイズといった企業の要件を満たすエンタープライズレベルのブロックチェーンである。 Kaia ServiceChainは以下の機能を提供する：

- 即時の最終決定
- カイアチェーン間のトークン移動
- データの整合性を保つためのメインチェーンへのデータアンカリング
- 企業レベルのセキュリティ要件を満たすマルチシグブリッジ契約

![](/img/nodes/sc-overview.png)

ServiceChainの詳細については、[Kaia Scaling Solution](../../learn/scaling-solutions.md)をお読みください。 また、以下のビデオはカイアServiceChainを理解するのに役立ちます。

- [カイアにおけるサービスチェーンによる水平展開｜TXGX2019】(https://www.youtube.com/watch?v=8yQc5FQysJc)
- [カイア・サービスチェーンの高可用性アーキテクチャ｜TXGX 2019](https://www.youtube.com/watch?v=HcdhWtXPuR0)

## ダウンロード<a id="download"></a>

SCN、SPN、SENのパッケージは[ダウンロードページ](../downloads/downloads.md)で入手できます。

## インストール<a id="installation-guide"></a>

This chapter explains the **Service Chain Consensus Node (SCN)** installation.

### Linuxアーカイブ・ディストリビューション<a id="linux-archive-distribution"></a>

Service Chain Consensus Nodeのアーカイブファイルは、以下のようなディレクトリ構成になっています。

| ファイル名                           | ファイルの説明            |
| :------------------------------ | :----------------- |
| bin/kscn                        | SCN実行ファイル          |
| bin/kscnd                       | SCN 開始/終了スクリプトファイル |
| conf/kscnd.conf | SCN設定ファイル          |

homiバイナリーのアーカイブファイルは、以下のようなディレクトリ構成になっている。

| ファイル名    | ファイルの説明    |
| :------- | :--------- |
| bin/homi | HOMI実行ファイル |

インストールとは、ダウンロードしたパッケージを解凍することである。

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

### RPM Distribution (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

ダウンロードしたRPMファイルは、以下の`yum`コマンドでインストールできる。

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### 設置場所<a id="scn-configuration"></a>

Kaia Linuxパッケージは、以下のような構造の実行バイナリとコンフィギュレーション・ファイルから構成される。

| ファイル名                      | 所在地                                        |
| :------------------------- | :----------------------------------------- |
| kscn                       | /usr/bin/kscn                              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi                       | /usr/bin/homi                              |

## 構成<a id="configuration"></a>

このページでは、コンセンサスネットワークを形成するためのSCNの構成について説明する。

アーカイブディストリビューションをインストールした場合は、アーカイブを解凍したディレクトリにバイナリと設定ファイルがあります。 以下はコマンドの実行例である。

```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

このチュートリアルでは、常にコマンドのフルパスを指定するわけではない。

### ジェネシスファイルの作成<a id="creation-of-a-genesis-file"></a>

まず、自分のサービスチェーン用のgenesisファイルとnodekeyファイルを作成する。 以下のようにhomiを使って作ることができる。

```bash
$ homi setup --gen-type local --cn-num 1 --servicechain -o ./homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```

以下は、genesisファイルとnodekeyファイルの例である。

```bash
$ cat homi-output/scripts/genesis.json
{
    "config": {
        "chainId": 1000,
        "istanbul": {
            "epoch": 3600,
            "policy": 0,
            "sub": 22
        },
        "unitPrice": 0,
        "deriveShaImpl": 2,
        "governance": null
    },
    "timestamp": "0x5dca0732",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad594f8690562c0839c44b17af421f7aaaa9f12dcc62bb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "f8690562c0839c44b17af421f7aaaa9f12dcc62b": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}   
```

```bash
$ cat homi-output/keys/nodekey1                                                                                                                                 
0c28c77ce5c2ca9e495b860f190ed7dfe7bd5c1a2e5f816587eb4d3d9566df44
```

genesisファイルのchainIDを変更してください。 リプレイ攻撃を防ぐため、自分の番号を使用する。
(カイアメインネット(8217)とカイロス(1001)で同じchainIDを使用しないでください)

必要であれば、genesisファイルの`"alloc"`を編集することで、事前に資金を提供するアドレスを変更することができる。
(詳しくは[Genesis JSON](../service-chain/configure/genesis.md)をご覧ください）。

### SCNデータディレクトリの作成<a id="scn-data-directory-creation"></a>

カイア・ブロックチェーンのデータサイズが増加し続けているという事実を考慮すると、十分な大きさのストレージを使用することをお勧めします。
データ・ディレクトリは好きなパスに作成できる。
このドキュメントでは、データディレクトリとして `~/kscnd_home` を作成する。

```bash
$ mkdir -p ~/kscnd_home
```

#### ジェネシス・ブロックの初期化<a id="initialization-of-a-genesis-block"></a>

その後、genesisファイルでデータ・ディレクトリを初期化することができる。
サービスチェーンノードを開始する前に、`kscn`と`genesis.json`を使用してサービスチェーンネットワークのgenesisブロックを初期化する必要がある。

```bash
$ kscn init --datadir ~/kscnd_home homi-output/scripts/genesis.json
  WARN[11/12,10:13:58 +09] [19] Some input value of genesis.json have been set to default or changed
  INFO[11/12,10:13:58 +09] [18] Setting connection type                   nodetype=cn conntype=0
    ...
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [5] Writing custom genesis block
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [47] Persisted trie from memory database       updated nodes=1 updated nodes size=80.00B time=304.931µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
  INFO[11/12,10:13:59 +09] [19] Successfully wrote genesis state          database=lightchaindata hash=0xc269669079fc8c06ac37435a563b8ed8ef273c1c835f3d823d2e586315319aa8
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/header
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/body
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/receipts
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/0
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/1
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/2
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/3
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/txlookup
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/misc
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/bridgeservice
```

#### nodekeyのインストール<a id="install_nodekey"></a>

`homi-output/keys/nodekey1`をSCNのデータディレクトリの`kaia`ディレクトリに以下のようにコピーします。

```bash
$ cp homi-output/keys/nodekey1  ~/kscnd_home/klay/nodekey
```

### SCNの構成<a id="configuration-of-the-scn"></a>

kscnd.conf\` は SCN の設定ファイルです。

SCNはデフォルトのポートを使用し、大規模パーティションを `~/kscnd_home` にマウントすると仮定します。
デフォルトの `kscnd.conf` ファイルでは、`SC_SUB_BRIDGE` オプションは無効になっていて、`DATA_DIR` は空になっている。

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```

SC_SUB_BRIDGE\`を有効にすることで、アンカリング/バリュー転送機能を使用することができます。
また、DATA_DIRを以下のように設定してください。

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

必要であれば、さらに他のオプションを変更してサービスチェーンをカスタマイズすることもできます。
そうでなければ、これでコンフィギュレーションを終了し、デフォルト・コンフィギュレーションを使ってサービス・チェーンを実行する準備ができたことになる。

## SCNの起動／停止<a id="starting-stopping-scn"></a>

インストールの種類に応じて、以下の `systemctl` または `kscnd` コマンドでKaiaサービスを開始/停止できる。

**スタート**

```bash
## when installed from rpm distribution 
$ systemctl start kscnd.service

## when installed using linux archive
$ kscnd start

```

**ストップ**

```bash
## when installed from rpm distribution 
$ systemctl stop kscnd.service

## when installed using linux archive
$ kscnd stop

```

**ステータス**

```bash
## when installed from rpm distribution 
$ systemctl status kscnd.service

## when installed using linux archive
$ kscnd status

```

## ノードステータスのチェック<a id="checking-node-status"></a>

### プロセス状況<a id="process-status"></a>

ステータスコマンド `systemctl` と `kscnd` を使って SCN のプロセスのステータスをチェックすることができます。

#### systemctl <a id="systemctl"></a>

`systemctl`はRPMと一緒にインストールされ、SCNの状態は以下のように確認できる。

```bash
$ systemctl status kscnd.service
● kscnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kscnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kscnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kscn)
   CGroup: /system.slice/kscnd.service
           └─29641 /usr/local/bin/kscn --networkid 1000 --datadir ~/kscnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kscnd[29636]: Starting kscnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

上の例では、`Active: active (running)` のように現在のステータスを確認することができる。

#### kscnd <a id="kscnd"></a>

`kscnd`はパッケージと一緒にインストールされ、SCNの状態は以下のようにチェックできる。

```bash
$ kscnd status
kscnd is running
```

### 過去ログ<a id="logs"></a>

ログは `kscnd.conf` ファイルの `LOG_DIR` フィールドで定義されたパスにある `kscnd.out` ファイルに保存される。 ノードが正常に動作すると、各ブロックが以下のように1秒ごとにインポートされるのがわかる。

例

```bash
$ tail -F ~/kscnd_home/logs/kscnd.out
  INFO[11/12,10:19:09 +09] [49] Successfully wrote mined block            num=11 hash=03da06…f194b0 txs=0
  INFO[11/12,10:19:09 +09] [49] Commit new mining work                    number=12 txs=0 elapsed=236.972µs
  INFO[11/12,10:19:10 +09] [24] Committed                                 number=12 hash=470aca…be4fdf address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:10 +09] [49] Successfully sealed new block             number=12 hash=470aca…be4fdf
  INFO[11/12,10:19:10 +09] [49] Successfully wrote mined block            num=12 hash=470aca…be4fdf txs=0
  INFO[11/12,10:19:10 +09] [49] Commit new mining work                    number=13 txs=0 elapsed=198.221µs
  INFO[11/12,10:19:11 +09] [24] Committed                                 number=13 hash=95e4a3…14e50f address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:11 +09] [49] Successfully sealed new block             number=13 hash=95e4a3…14e50f
  INFO[11/12,10:19:11 +09] [49] Successfully wrote mined block            num=13 hash=95e4a3…14e50f txs=0
  INFO[11/12,10:19:11 +09] [49] Commit new mining work                    number=14 txs=0 elapsed=220.004µs
  INFO[11/12,10:19:12 +09] [24] Committed                                 number=14 hash=dcd2bc…b2aec0 address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
```

### クエリ<a id="queries"></a>

#### kscnコンソール<a id="kscn-console"></a>

KaiaはCLIクライアント `kscn console` を提供している。 クライアントを使うもう一つの方法は、IPC（プロセス間通信）を介してプロセスに接続することである。 IPC ファイル `klay.ipc` は SCN の `DATA_DIR` パスにあります。

以下のコマンドを実行し、結果を確認してください。

```text
$ kscn attach --datadir ~/kscnd_home
Kaia JavaScriptコンソールへようこそ！

インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>.
```

使用可能なコマンドは[APIドキュメント](../../../references/json-rpc/klay/account-created)で確認できます。

SCNのステータスをチェックするのに便利なAPI：

- `kaia.blockNumber` (最新のブロック番号を取得する)
- net.peerCount\` (現在接続されているKaiaノードの数を取得する)

#### klay.blockNumber <a id="klay-blocknumber"></a>

最新のブロック番号を取得し、ブロックが正しく伝播されているかどうかを確認することができる。

```text
> kaia.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
4
```

上記のコマンドラインは、SCNがメインチェーンのENを除いて接続するノードの数を返します。
