# コンセンサス・ノードの設置

## ダウンロード

ダウンロード](../../downloads/downloads.md) ページから `kcn` の最新版をダウンロードできます。

## インストール

### Linuxアーカイブ・ディストリビューション<a id="linux-archive-distribution"></a>

アーカイブファイルは実行バイナリとコンフィギュレーションファイルで構成され、以下のような構造になっている。

**注**：ファイル構造やファイル名を変更しないでください。 これを変更すると、ノードが正しく機能しなくなる可能性があります。

```text
- bin
  |- kcn
  |- kcnd
- conf
  |- kcnd.conf
```

| ファイル名                          | ファイルの説明          |
| :----------------------------- | :--------------- |
| bin/kcn                        | CN実行ファイル         |
| bin/kcnd                       | CN開始/終了スクリプトファイル |
| conf/kcnd.conf | CN設定ファイル         |

インストールとは、ダウンロードしたパッケージをインストールしたい場所に解凍することである。

```bash
$ tar zxf kcn-vX.X.X-linux-amd64.tar.gz
```

あるいは

```bash
$ tar zxf kcn-baobab-vX.X.X-linux-amd64.tar.gz
```

**注**: `kcn` と `kcnd` をグローバルに実行するには、環境変数 `$PATH` に `kcn-linux-amd64/bin` のパスを追加することを推奨する。 一例を挙げよう、

```bash
$ export PATH=$PATH:~/downloaded/path/kcn-linux-amd64/bin
```

他のセクションは、変数にパスが追加されていることを前提としている。

### RPM Distribution (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

ダウンロードしたRPMファイルは、以下の`yum`コマンドでインストールできる。

```bash
$ yum install kcnd-vX.X.X.el7.x86_64.rpm
```

あるいは

```bash
$ yum install kcnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Kaia Yum Repoからインストールする<a id="install-from-kaia-yum-repo"></a>

あるいは、Kaia Yum repoから`kcnd`をインストールして実行することもできる：

```bash
sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kcnd
```

または

```bash
sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/9-stream/kaia.repo && sudo yum install kcnd
```

### 設置場所<a id="installed-location"></a>

インストールされるファイルは以下の通り。

| ファイル名                     | 所在地                                      |
| :------------------------ | :--------------------------------------- |
| kcn                       | /usr/bin/kcn                             |
| kcnd.conf | /etc/kcnd/conf/kcnd.conf |

## 構成<a id="configuration"></a>

CNのコンフィギュレーションは、データディレクトリを作成し、コンフィギュレーションファイル `kcnd.conf` でいくつかの値を設定することである。

1. CNデータディレクトリを作成する。
2. ノードキーのインストール
3. `kcnd.conf`でCNを設定する。

### CNデータディレクトリの作成<a id="cn-data-directory-creation"></a>

カイア・ブロックチェーンのデータサイズが常に増加しているという事実を考慮すると、十分な大きさのストレージを使用することをお勧めします。 希望のパスにディレクトリを作成する必要があるかもしれません。

```bash
$ mkdir -p /var/kcnd/data
```

### ノードキーのインストール<a id="install-node-key"></a>

CNを操作するには、`nodekey`が必要である。 KCNのバイナリをお持ちでない場合は、新しいバイナリを作成します。 もしあれば、CNデータディレクトリに`nodekey`を置く必要がある。 `nodekey`の作成方法は'[インストールする前に](./before-you-install.md)'のセクションで説明されている。 以下のコマンドラインは`nodekey`をCN dataディレクトリにコピーする。

```bash
$ cp nodekey /var/kcnd/data
```

### 設定ファイルの更新<a id="update-the-configuration-file"></a>

設定ファイルの場所

- アーカイブディストリビューションの場合、config ディレクトリの場所のデフォルトは `$INSTALL_PATH/kcn-linux-amd64/conf/` です。
- パッケージ配布の場合、configディレクトリのデフォルトは `/etc/kcnd/conf/` です。

#### データディレクトリの追加 <a id="add-data-directory"></a>

設定ファイル `kcnd.conf` のデータディレクトリ環境変数 `$DATA_DIR` を更新する必要がある。

```text
...
DATA_DIR=/var/kcnd/data
...
```

#### リワードベースの設定<a id="setup-rewardbase"></a>

カイア・ネットワークのコンセンサスに参加する報酬として、CNオペレーターはKAIAを受け取る。 このため、設定ファイル`kcnd.conf`にアドレスを設定する必要がある。

新しいアカウントを作る方法はいろいろあるが、`kcn`もその機能を提供している。 ヘルプメッセージは以下のコマンドで確認できる。

```bash
$ kcn account new --help
```

この手順の一例は以下の通り。 First of all, you need to create a new account which the reward KLAY will be sent to.

```bash
$ kcn account new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KAIA=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {d13f7da0032b1204f77029dc1ecbf4dae2f04241}
```

その結果、あなたが定義したパスに関連するキーストアが作成される。 次に、作成したアドレスを`kcnd.conf`ファイルに以下のように記述する必要がある。

```text
...
REWARDBASE="d13f7da0032b1204f77029dc1ecbf4dae2f04241"
...
```

作成したキーストアとパスワードはかなり重要なので、管理には十分注意すること。 `kcnd.conf`の詳細については、[設定ファイル](../../../misc/operation/configuration.md)のセクションを参照してください。

### (オプション）Chaindata Snapshotのダウンロード

ジェネシス・ブロックからの同期には時間がかかる。 Chaindata Snapshot](../../../misc/operation/chaindata-snapshot.md) を使用して、[Full Sync](../../../learn/storage/block-sync.md#full-sync) プロセスをスキップすることができます。

## CNの起動<a id="startup-the-cn"></a>

### CNスタート/ストップ <a id="cn-start-stop"></a>

以下の `systemctl` コマンドでKaiaサービスを開始/停止できる。

**注**：これにはroot権限が必要です。

**スタート**

```bash
$ systemctl start kcnd.service

```

**ストップ**

```bash
$ systemctl stop kcnd.service

```

**ステータス**

```bash
$ systemctl status kcnd.service

```

### トラブルシューティング<a id="troubleshooting"></a>

以下のエラーが発生した場合、

```bash
Failed to start kcnd.service: Unit not found.
```

以下のコマンドでsystemd managerのコンフィギュレーションをリロードする。

```bash
$ systemctl daemon-reload
```

### BLS公開鍵情報のエクスポート<a id="export-bls-public-key-info"></a>

ネットワークがRandaoハードフォークを起動した場合、または起動する予定がある場合、各CNメンテナはBLS公開鍵情報を[KIP-113スマートコントラクト](https://kips.kaia.io/KIPs/kip-113)に提出しなければならない。

BLSの公開鍵情報はnodekeyから計算できる。 これを取り出すには、まずノードを起動する。 次にコマンドを使う：

```
$ kcn account bls-info --datadir /var/kcnd/data
```

その結果、`bls-publicinfo-NODEID.json`ファイルが作成される。

## コアセルのテスト<a id="testing-the-core-cell"></a>

Core Cellが正常にインストールされ、期待通りに動作していることを確認します。

### プロセス状況<a id="process-status"></a>

ステータスコマンド `systemctl` と `kcnd` を使って CN のプロセスのステータスをチェックすることができる。

#### systemctl <a id="systemctl"></a>

`systemctl`はRPMと一緒にインストールされ、以下のようにCNの状態をチェックすることができる。

```bash
$ systemctl status kcnd.service
● kcnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kcnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kcnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kcn)
   CGroup: /system.slice/kcnd.service
           └─29641 /usr/local/bin/kcn --networkid 1000 --datadir /kcnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kcnd[29636]: Starting kcnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

上記の例では、`Active: active (running)` のように現在のステータスを確認することができる。

#### kcnd <a id="kcnd-kpnd"></a>

`kcnd`はパッケージと一緒にインストールされ、CNの状態は以下のように確認できる。

```bash
$ kcnd status
kcnd is running
```

### 過去ログ<a id="logs"></a>

ログは `kcnd.conf` ファイルの `LOG_DIR` フィールドで定義されたパスにある `kcnd.out` ファイルに保存される。 ノードが正常に動作している場合、各ブロックが1秒間に以下のように作成されることがわかる。

例

```bash
$ tail kcnd.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work                    number=11572927 txs=0 elapsed=483.436µs
```

### kcnコンソール<a id="kcn-console-kpn-console"></a>

KaiaはCLIクライアント`kcn console`を提供している。 しかし、CNは、セキュリティ上の理由から、クライアントのRPCイン ターフェースを無効にすることができる。 クライアントを使うもう一つの方法は、IPC（プロセス間通信）を介してプロセスに接続することである。

IPC ファイル `klay.ipc` は CN の `DATA_DIR` パスにある。

以下のコマンドを実行し、結果を確認してください。

```bash
$ ken attach --datadir /var/kend/data
カイアJavaScriptコンソールへようこそ！

インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir：/var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

使用可能なコマンドは[APIドキュメント](../../../../references/json-rpc/klay/account-created)で確認できます。

CNのステータスをチェックするのに便利なAPI：

- `kaia.blockNumber` (最新のブロック番号を取得する)
- `net.peerCount` (現在接続されているKaiaノードの数を取得する)

#### klay.blockNumber  <a id="klay-blocknumber"></a>

最新のブロック番号を取得し、ノードタイプに基づいてブロックが正しく作成（CNの場合）または伝播（CNおよびPNの場合）されているかどうかを確認できます。

```javascript
> klay.blockNumber
11573819
```

#### ネットピアカウント <a id="net-peercount"></a>

```javascript
> net.peerCount
14
```

上記のコマンドラインは、ノードのタイプに応じて異なる値を返す。

- CN：接続されたCNの数＋接続されたPNの数。
- PN：接続CN数＋接続PN数＋接続EN数。