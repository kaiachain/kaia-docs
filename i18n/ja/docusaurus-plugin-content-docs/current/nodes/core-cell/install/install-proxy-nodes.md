# プロキシノードのインストール

## ダウンロード

ダウンロード](../../downloads/downloads.md)のページから`kpn`の最新版をダウンロードできます。

## インストール<a id="installation"></a>

### Linuxアーカイブ・ディストリビューション<a id="linux-archive-distribution"></a>

アーカイブファイルは実行バイナリとコンフィギュレーションファイルで構成され、以下のような構造になっている。

**注**：ファイル構造やファイル名を変更しないでください。 これを変更すると、ノードが正しく機能しなくなる可能性があります。

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| ファイル名                          | ファイルの説明          |
| :----------------------------- | :--------------- |
| bin/kpn                        | PN実行ファイル         |
| bin/kpnd                       | PN開始/終了スクリプトファイル |
| conf/kpnd.conf | PN設定ファイル         |

インストールとは、ダウンロードしたパッケージをインストールしたい場所に解凍することである。

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

あるいは

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**注**: `kpn` と `kpnd` をグローバルに実行するには、環境変数 `$PATH` に `kpn-linux-amd64/bin` のパスを追加することを推奨する。 一例を挙げよう、

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

他のセクションは、変数にパスが追加されていることを前提としている。

### RPM Distribution (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

ダウンロードしたRPMファイルは、以下の`yum`コマンドでインストールできる。

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

あるいは

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Kaia Yum Repoからインストールする<a id="install-from-kaia-yum-repo"></a>

あるいは、Kaia Yum repoから`kpnd`をインストールして実行することもできる：

```bash
sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kpnd
```

### 設置場所<a id="installed-location"></a>

インストールされるファイルは以下の通り。

| ファイル名                     | 所在地                                      |
| :------------------------ | :--------------------------------------- |
| kpn                       | /usr/bin/kpn                             |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |

## 構成<a id="configuration"></a>

PNの設定は、データ・ディレクトリを作成し、設定ファイル`kpnd.conf`でいくつかの値を設定することである。

1. PNデータディレクトリの作成
2. ノードキーのインストール
3. `static-node.json`をインストールする
4. `kpnd.conf`でPNを設定する。

### PNデータディレクトリの作成<a id="pn-data-directory-creation"></a>

カイア・ブロックチェーンのデータサイズが常に増加しているという事実を考慮すると、十分な大きさのストレージを使用することをお勧めします。 希望のパスにディレクトリを作成する必要があるかもしれません。

```bash
$ mkdir -p /var/kpnd/data
```

### ノードキーのインストール<a id="install-node-key"></a>

PNを操作するには、`nodekey`が必要である。 KPNのバイナリをお持ちでない場合は、新しいバイナリを作成します。 もしあれば、`nodekey`をPN dataディレクトリに置く必要がある。 `nodekey`を作成する方法は、"[インストールする前に](./before-you-install.md) "のセクションにあります。 以下のコマンドラインは `nodekey` をPN dataディレクトリにコピーする。

```bash
$ cp nodekey /var/kpnd/data
```

### `static-nodes.json`をインストールする。<a id="install-static-nodes-json"></a>

`static-nodes.json`はPN演算子から作成する。 PNが接続しているアドレスが含まれている。 あなたのCNと他のコアセルのPNを含むアドレスを追加することをお勧めします。 詳しくはカイア公式メール(メインネットの場合は`bootstrap@klaytn.com`、カイロスの場合は`baobab@klaytn.com`)までお問い合わせください。

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

PNのノードURIは「[インストールの前に](./before-you-install.md)」セクションにあります。 \注：このIPアドレスはCN公開IPとは異なります。）以下のコマンドラインは、`static-nodes.json`ファイルをPN dataディレクトリにコピーします。

```bash
$ cp static-nodes.json /var/kpnd/data
```

### 設定ファイルの更新<a id="update-the-configuration-file"></a>

設定ファイルの場所

- アーカイブディストリビューションの場合、config ディレクトリの場所のデフォルトは `$INSTALL_PATH/kpn-linux-amd64/conf/` です。
- パッケージ配布の場合、configディレクトリのデフォルトは `/etc/kpnd/conf/` です。

#### データディレクトリの追加 <a id="add-data-directory"></a>

設定ファイル `kpnd.conf` のデータディレクトリ環境変数 `$DATA_DIR` を更新する必要がある。

```text
...
DATA_DIR=/var/kpnd/data
...
```

### (オプション）Chaindata Snapshotのダウンロード

ジェネシス・ブロックからの同期には時間がかかる。 Chaindata Snapshot](../../../misc/operation/chaindata-snapshot.md) を使用して、[Full Sync](../../../learn/storage/block-sync.md#full-sync) プロセスをスキップすることができます。

## PNの起動<a id="startup-the-pn"></a>

### PNスタート/ストップ <a id="pn-start-stop"></a>

以下の `systemctl` コマンドでKaiaサービスを開始/停止できる。

**注**：これにはroot権限が必要です。

**スタート**

```bash
$ systemctl start kpnd.service

```

**ストップ**

```bash
$ systemctl stop kpnd.service

```

**ステータス**

```bash
$ systemctl status kpnd.service

```

### トラブルシューティング<a id="troubleshooting"></a>

以下のエラーが発生した場合、

```bash
Failed to start kpnd.service: Unit not found.
```

以下のコマンドでsystemd managerのコンフィギュレーションをリロードする。

```bash
$ systemctl daemon-reload
```

## コアセルのテスト<a id="testing-the-core-cell"></a>

Core Cellが正常にインストールされ、期待通りに動作していることを確認します。

### プロセス状況<a id="process-status"></a>

ステータスコマンド `systemctl` と `kpnd` を使って、PN のプロセスのステータスをチェックすることができる。

#### systemctl <a id="systemctl"></a>

`systemctl`はRPMと一緒にインストールされ、以下のようにしてPNの状態をチェックできる。

```bash
$ systemctl status kpnd.service
● kpnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kpnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process：29636 ExecStart=/etc/rc.d/init.d/kpnd start (code=exited, status=0/SUCCESS)
 メイン PID: 29641 (kpn)
   CGroup：/system.slice/kpnd.service
           └─29641 /usr/local/bin/kpn --networkid 1000 --datadir /kpnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]：起動中 (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kpnd[29636]：kpnd を開始します：[ OK ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]：起動しました (null)。
```

上記の例では、`Active: active (running)` のように現在のステータスを確認することができる。

#### kpnd <a id="kcnd-kpnd"></a>

`kpnd`はパッケージと一緒にインストールされ、PNの状態は以下のように確認できる。

```bash
$ kpnd status
kpnd is running
```

### 過去ログ<a id="logs"></a>

ログは `kpnd.conf` ファイルの `LOG_DIR` フィールドで定義されたパスにある `kpnd.out` ファイルに保存される。 ノードが正常に動作している場合、各ブロックが1秒間に以下のように作成されることがわかる。

例

```bash
$ tail kpnd.out
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

### kpnコンソール<a id="kcn-console-kpn-console"></a>

KaiaはCLIクライアント`kpn console`を提供している。 しかし、PNは、セキュリティ上の理由から、クライアントのRPCインタフェースを無効にすることができる。 クライアントを使うもう一つの方法は、IPC（プロセス間通信）を介してプロセスに接続することである。

IPC ファイル `klay.ipc` は PN の `DATA_DIR` パスにある。

以下のコマンドを実行し、結果を確認してください。

```bash
 $ kpn attach --datadir /var/kpnd/data
 カイアJavaScriptコンソールへようこそ！

 インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 coinbase：0x67f68fdd9740fd7a1ac366294f05a3fd8df0ed40
 at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
  datadir：/var/kpnd/data
  modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>.
```

使用可能なコマンドは[APIドキュメント](../../../references/json-rpc/klay/account-created)で確認できます。

PNのステータスをチェックするのに便利なAPI：

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
