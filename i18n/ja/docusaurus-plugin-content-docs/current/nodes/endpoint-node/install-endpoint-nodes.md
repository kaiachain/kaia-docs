# エンドポイントノードのインストール

## ダウンロード<a id="download"></a>

ダウンロード](../downloads/downloads.md)ページから最新版のENをダウンロードできます。

## インストール

### Linuxアーカイブ・ディストリビューション<a id="linux-archive-distribution"></a>

アーカイブファイルは実行バイナリとコンフィギュレーションファイルで構成され、以下のような構造になっている。

**注**：ファイル構造やファイル名を変更しないでください。これを変更すると、ノードが正しく機能しなくなる可能性があります。

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| ファイル名                          | ファイルの説明           |
| :----------------------------- | :---------------- |
| bin/ken                        | EN実行ファイル          |
| bin/kend                       | EN 開始/終了スクリプトファイル |
| conf/kend.conf | EN設定ファイル          |

インストールとは、ダウンロードしたパッケージをインストールしたい場所に解凍することである。

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

あるいは

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**注**: `ken` と `kend` をグローバルに実行するには、解凍されたディレクトリ `ken-linux-amd64/bin` のパスを環境変数 `$PATH` に追加することを推奨します。一例を挙げよう、

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

他のセクションは、変数にパスが追加されていることを前提としている。

### RPM Distribution (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

ダウンロードしたRPMファイルは、以下の`yum`コマンドでインストールできる。

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

あるいは

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### Kaia Yum Repoからインストールする<a id="install-from-kaia-yum-repo"></a>

あるいは、Kaia Yum repoから`kend`をインストールして実行することもできる：

```bash
sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kend
```

または

```bash
sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/9-stream/kaia.repo && sudo yum install kend
```

### 設置場所<a id="installed-location"></a>

インストールされるファイルは以下の通り。

| ファイル名                     | 所在地                                      |
| :------------------------ | :--------------------------------------- |
| ken                       | /usr/bin/ken                             |
| kend.conf | /etc/kend/conf/kend.conf |

## 構成<a id="configuration"></a>

EN の設定は、データ・ディレクトリを作成し、設定ファイル `kend.conf` で環境変数を設定することである。

1. EN データ・ディレクトリを作成する。
2. kend.conf\`でENを設定する。

### ENデータディレクトリの作成<a id="en-data-directory-creation"></a>

カイア・ブロックチェーンのデータサイズが増加し続けているという事実を考慮すると、十分な大きさのストレージを使用することをお勧めします。希望のパスにディレクトリを作成する必要がある。

```text
$ sudo mkdir -p /var/kend/data
```

### 設定ファイルの更新<a id="update-the-configuration-file"></a>

設定ファイルの場所

- アーカイブ・ディストリビューションの場合、config ディレクトリの場所のデフォルトは `$INSTALL_PATH/ken-linux-amd64/conf/` です。
- パッケージ配布の場合、config ディレクトリのデフォルトは `/etc/kend/conf/` です。

#### データディレクトリの追加 <a id="add-data-directory"></a>

設定ファイル `kend.conf` のデータディレクトリ環境変数 `$DATA_DIR` を更新する必要がある。

```text
DATA_DIR=/var/kend/data
```

### (オプション）Chaindata Snapshotのダウンロード

ジェネシス・ブロックからの同期には時間がかかる。 Chaindata Snapshot](../../misc/operation/chaindata-snapshot.md) を使用して、[Full Sync](../../learn/storage/block-sync.md#full-sync) プロセスをスキップすることができます。

## EN の起動<a id="startup-the-en"></a>

以下のコマンドを使用して、エンドポイントノードを起動または停止できます。

**スタート**

```bash
$ kend start
Starting kend: OK
```

**ストップ**

```bash
$ kend stop
Shutting down kend: Killed
```

**ステータス**

```bash
$ kend status
kend is running
```

## インストールのテスト<a id="testing-the-installation"></a>

Endpoint Nodeが正常にインストールされ、インストール後に期待通りに動作していることを確認します。

### プロセス状況<a id="process-status"></a>

ステータスコマンド `systemctl` と `kend` を使って、EN のプロセスのステータスをチェックすることができる。

#### systemctl <a id="systemctl"></a>

`systemctl`はRPMと一緒にインストールされ、以下のようにしてEN状態を確認することができる。

```bash
$ systemctl status kend.service
● kend.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kend; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kend start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (ken)
   CGroup: /system.slice/kend.service
           └─29641 /usr/local/bin/ken --networkid 1000 --datadir /kend_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kend[29636]: Starting kend: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

上の例では、`Active: active (running)` のように現在のステータスを確認することができる。

#### kend <a id="kend"></a>

`kend` はパッケージと一緒にインストールされ、EN の状態は以下のように確認できる。

```bash
$ kend status
kend は実行中です。
```

### 過去ログ<a id="logs"></a>

ログは `kend.conf` ファイルの `LOG_DIR` フィールドで定義されたパスにある `kend.out` ファイルに保存される。ノードが正常に動作すると、各ブロックが以下のように1秒ごとにインポートされるのがわかる。

例

```bash
$ tail kend.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work      
```

### クエリ<a id="queries"></a>

#### けんコンソール<a id="ken-console"></a>

KaiaはCLIクライアント`ken console`を提供している。クライアントを使うもう一つの方法は、IPC（プロセス間通信）を介してプロセスに接続することである。 IPC ファイル `klay.ipc` は EN の `DATA_DIR` パスにある。

以下のコマンドを実行し、結果を確認してください。

```text
$ ken attach --datadir /var/kend/data
カイアJavaScriptコンソールへようこそ！

インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir：/var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

使用可能なコマンドは[APIドキュメント](../../../references/json-rpc/klay/account-created)で確認できます。

EN の状態をチェックするのに便利な API：

- `kaia.blockNumber` (最新のブロック番号を取得する)
- `net.peerCount` (現在接続されているKaiaノードの数を取得する)

#### klay.blockNumber <a id="klay-blocknumber"></a>

最新のブロック番号を取得し、ブロックが正しく伝播されているかどうかを確認することができる。

```text
> klay.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
14
```

上記のコマンドラインは、ENが接続するノードの数を返す。

