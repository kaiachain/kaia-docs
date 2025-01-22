# AWS AMIを使用する

:::info[Service 更新終了］

Kaiaエンドポイントノード用のAWS AMIサービスは更新されなくなりました（最終更新：2024年11月）。 既存のAMI（日付は2024年11月）はまだ使用可能ですが、現在のブロックチェーンの状態に追いつくために追加の同期時間が必要になる可能性があることにご注意ください。 チェーンデータ・スナップショットの使用や完全な同期化など、別のセットアップ方法については、[ブロック同期化](../../learn/storage/block-sync.md)を参照してください。

:::

Kaiaは、Kaiaエンドポイントノード（EN）向けにAWS AMI（[Amazon Machine Image](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)）を提供しています。 これらのAMIには、ENソフトウェアとチェーンデータの両方がプリインストールされており、ユーザーは迅速かつ便利に、完全に動作するノードを立ち上げることができます。 KaiaのAMIを使えば、オンデマンドで新しいエンドポイントノードを設定することがシームレスになり、Kaiaネットワークへの参加プロセスを簡素化できる。

## AMIを利用する理由

AMIは、新しいカイアENを立ち上げる便利な方法を提供する。 また、チェインデータはすでにセットされているので、圧縮されたチェインデータをダウンロードして展開するための余分なディスクストレージは必要ない。 さらに、AMIを使用することは、アーカイブモードや状態移行を伴わないフルモードなど、一部の同期モードにおいて、完全同期なしで新しいENを運用するための唯一のオプションである（剪定されたチェーンデータについては、スナップショットのダウンロードのみを提供している）。

## EN AMIの種類

カイアは、異なるモードでチェーンデータが同期された、異なるタイプのAMIを提供する。

| **タイプ** | **シンクモード**            | **AMI名**                           |
| ------- | --------------------- | ---------------------------------- |
| フル      | フルモード                 | `カイア-xxxx-クリーン-フル-エン-xxxx`。        |
| 剪定      | フルモード・ライブプルーニング       | `kaia-xxxx-clean-剪定-en-xxxx`。      |
| 国家移住者   | フルモード、状態移行（または状態一括削除） | `kaia-xxxx-clean-en-xxxx`。         |
| アーカイブ   | アーカイブ・モード             | `kaia-xxxx-clean-archive-en-xxxx`。 |

カイアはメインネット用にこれら4種類のAMIを提供している。 カイロス用のAMIもある。

ステート・マイグレーションされたチェーンデータの詳細については、[ステート・バッチ・プルーニング](../../../learn/storage/state-pruning/#state-batch-pruning-state-migration)を参照のこと。
ブロック同期モードの詳細については[ブロック同期](../../learn/storage/block-sync.md)を参照。

## AmazonコンソールでAMIを使用して新しいEC2インスタンスを起動する

AWSコンソールで新規EC2インスタンスを起動する際は、AMIを選択する必要がある。 AMIの検索バーで`kaia-mainnet`を検索する。

![AMI search bar](/img/misc/ami_search.png)

検索結果が表示されます。 検索結果ページの "Community AMI "タブをクリックし、リストから使用するAMIを選択する。

![AMI search result](/img/misc/ami_select.png)

### インバウンド接続を許可する

AWSコンソールで新しいEC2インスタンスを起動する際、インスタンス用に新しいセキュリティグループを作成するか、既存のセキュリティグループを選択することができる。 いずれにせよ、Kaiaノードが相互通信に使用するポートへの接続を許可するインバウンドルールを追加する必要があります。

AWSコンソールのEC2インスタンスページに移動し、"Security "タブで関連するセキュリティグループを見つける。 ポート32323-32324のインバウンドルールを追加する必要があります。

| IPバージョン | タイプ     | プロトコル | ポートレンジ        | ソース                                                       |
| ------- | ------- | ----- | ------------- | --------------------------------------------------------- |
| IPv4    | カスタムTCP | TCP   | 32323 - 32324 | 0.0.0.0/0 |
| IPv4    | カスタムUDP | UDP   | 32323         | 0.0.0.0/0 |

## 起動後のインスタンスの準備とセットアップ

### Amazon EBSボリュームのウォームアップ

スナップショットから作成されたAmazon EBSボリューム（AMIもその1つ）には、アクセスする前に、ストレージブロックをAmazon S3からプルダウンし、ボリュームに書き込む必要があります。 このため、各ブロックが最初にアクセスされるとき、ディスク操作に大きなオーバーヘッドが発生する。 ボリュームのパフォーマンスは、すべてのブロックがダウンロードされ、ボリュームに書き込まれた後に回復する。 詳細については、[Amazon EBSボリュームの初期化](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-initialize.html)を参照してください。

ボリュームの準備を整えるために、すべてのブロックを読み込むタスクを実行することができる。

```bash
sudo yum install -y fio
$ sudo fio --filename=/dev/nvme1n1 --rw=read --bs=128k --iodepth=32 --ioengine=libaio --direct=1 --name=volume-initialize
```

:::note

Amazon EBSボリュームをウォームアップするこのタスクには、データサイズに応じて長い時間がかかる。 ETAは`fio`の出力を参照。

:::

### `kend.conf`の設定を確認する

ノードを起動する前に、設定ファイル `kend.conf` の `NETWORK` と `NETWORK_ID` フィールドを確認する。 `kend.conf` ファイルは `/etc/kend/conf/kend.conf` にある。

メインネットの場合、`NETWORK`フィールドは`mainnet`でなければならない。 カイロスの場合、`NETWORK`フィールドは`kairos`でなければならない。

```
# メインネット用
NETWORK=mainnet

# カイロス用
NETWORK=kairos
```

NETWORK_ID`はプライベートネットワークにのみ使用されることに注意。 したがって、メインネットやカイロスに`NETWORK_ID\`を設定しないようにしてください。

`kend.conf` の詳細については、[Configuration](configuration.md) を参照してください。

### `kend` サービスを開始する。

EC2インスタンスには、Kaia CLIクライアントとchaindataがインストールされている。 また、ENを開始/終了するスクリプトである`kend`もサービスとしてインストールされている。 `kend`サービスの状態は以下のコマンドで確認できる。

```bash
sudo service kend status
```

サービスが実行されていない場合は、再起動してください。

```bash
sudo service kend restart
```

サービスが再起動し、EN が正常に起動した場合は、`/var/kend/logs/kend.out` にあるログを確認できます。

```bash
tail -f /var/kend/logs/kend.out
```

KaiaはCLIクライアント`ken console`を提供する。 複数のエンドポイントを介して`ken console`を使用してKaiaノードと対話することができ、1つのオプションはIPC（プロセス間通信）を使用することです。 IPC ファイル `klay.ipc` は EN の `DATA_DIR` パス、ここでは `/var/kend/data` にある。 従って、`ken console`を使用するためには、`ken console`を使用する必要がある：

```bash
$ sudo ken attach --datadir /var/kend/data
カイアJavaScriptコンソールへようこそ！

 インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
  datadir：/var/kend/data
  modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

### ブロック同期を待つ

AMIは数時間前に作成されたものなので、最新のブロックに同期させるには時間が必要だ。 現在同期されているブロック番号と同期の進行状況は `ken console` で確認できます。

```js
> klay.blockNumber
165227166
> klay.syncing
{
  currentBlock: 165227166,
  highestBlock: 165357203,
  knownStates：0,
  pulledStates：0,
  startingBlock: 165222272
}.
```

ブロック同期が完了したら、同期の進行状況を問い合わせると `false` を返すはずである。

```js
> klay.syncing
false
```
