# チェーンデータスナップショットを使用する

チェーンデータスナップショットと呼ばれる、すでに同期されたデータベースからノードを起動することができます。 chaindataスナップショットは、圧縮されたカイアのデータディレクトリです。

:::note

これにより、ブロックチェーン全体を[Full Sync](../../learn/storage/block-sync.md#full-sync)する時間が節約され、新しいノードを比較的迅速に開始したり、破損したデータベースから回復したりすることができます。

:::

## データディレクトリの準備

開始する前に、圧縮ファイルと非圧縮ディレクトリの両方を収容できる十分なディスク容量を用意してください。

- 空のマシンから始めるなら、datadirを作るだけでいい。
  ```sh
  sudo mkdir /var/kend
  ```
- 既存のディレクトリを入れ替える場合は、一時ディレクトリを作成する。
  - オプション1。新しいディスクをマウントする。
    ```sh
    $ lsblk
    NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
    nvme2n1 259:0 0 3500G 0 disk /var/kend2 # 一時パスの新しいディスク
    nvme1n1 259：0 0 4000G 0 disk /var/kcnd # 本番パスの古いディスク
    nvme0n1 259:2 0 8G 0 disk
    ├─nvme0n1p1 259:3 0 8G 0 part /
    └─nvme0n1p128 259:4 0 1M 0 part

    ```
  - オプション2。既存のディスクを使用
    ```sh
    sudo mkdir /var/kend2/data
    ```

## ファイルをダウンロードする

公開されたスナップショットはすべて [snapshots.node.kaia.io](https://snapshots.node.kaia.io/) に一覧表示されており、各ネットワークは最新のスナップショットのURLを1行の `latest.txt` として公開しています。変数に読み込んでおけば、新しいスナップショットが公開された際、以下のコマンドを編集する必要がなくなります。

```sh
# mainnet; Kairosの場合は、mainnetをkairosに置き換えてください
URL=$(curl -s https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt)
echo "$URL"
```

- オプション1。 curl
  ```sh
  curl -O "$URL"
  ```
- オプション2。 wget
  ```sh
  wget "$URL"
  ```
- オプション3。 axel
  ```sh
  # Amazon Linux のインストール例
  sudo amazon-linux-extras install epel
  sudo yum install axel

  # マルチスレッドでのダウンロードおよびステータスバーの表示
  axel -n8 "$URL" | awk -W interactive '$0~/\[/{printf "%s'$'\r''", $0}'
  ```
- オプション4。 aria2
  ```sh
  # Rocky Linux のインストール例
  sudo yum install epel-release aria2

  # 軽量でマルチ接続に対応したダウンロード
  aria2c "$URL"
  ```

## ファイルを解凍する

スナップショットは [zstd](https://github.com/facebook/zstd) で圧縮され、ファイル名は `.tar.zst` となります。アーカイブには `klay/chaindata` ディレクトリが含まれているため、これをデータディレクトリ自体に解凍してください。

- オプション1。 tar
  ```sh
  tar --zstd -xvf kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -C /var/kend/data
  ```
- オプション2。 zstd、その後tar
  ```sh
  # --zstd オプションなしでビルドされた tar の場合。 Amazon Linux および Rocky Linux のインストール例
  sudo yum install zstd

  zstd -d kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -o out.tar
  tar -xf out.tar -C /var/kend/data
  ```
- 選択肢 3. ダウンロードと解凍を一度に行う
  ```sh
  # アーカイブと、それが展開されるディレクトリの両方を格納するスペースがない
  curl -s "$URL" | tar --zstd -xf - -C /var/kend/data
  ```

## データ・ディレクトリを入れ替える

- まず、ノードを停止する。
  - **重要**：重要\*\*：コンセンサス・ノード(CN)を実行している場合は、必ずそのノードをカウンシルから削除してください。
- オプション1。同じパスでコンテンツを入れ替える
  - 新しいディスクをマウントした場合は、マウントを変更する。
    ```sh
    umount /var/kend # 古いディスク
    umount /var/kend2 # 一時パスの新しいディスク
    mount /dev/nvme2n1 /var/kend # 本番パスの新しいディスク
    ```
  - 既存のディスクを使用している場合は、ディレクトリ名を変更する。
    ```sh
    mv /var/kend /var/kend_old # 古いデータ
    mv /var/kend2 /var/kend # 新しいデータ
    ```
- オプション2。ノード・コンフィギュレーションでパスを変更する
  - `kend.conf` ファイルの `DATA_DIR` の値を変更する。
- 必要に応じて、古いデータと `.tar.zst` ファイルを削除してください。
- 最後にノードをスタートさせる。

## ダウンロード

スナップショットは **[snapshots.node.kaia.io](https://snapshots.node.kaia.io/)** に公開されており、そこにはすべてのスナップショットとそのサイズ、チェックサムが一覧表示されています。このページに加えて、各ネットワークはスクリプト用の2つのファイルを公開しています。1つは`latest.txt`で、1行に最新のスナップショットのURLが記載されています。もう1つは`manifest.json`で、すべてのスナップショットとそのサイズ、チェックサム、作成日時が記載されています。

| ネットワーク | 同期オプション | ダウンロード                                                                                                          | スクリプト用                                                                                                                                                                                                      |
| ------ | ------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| メインネット | 生剪定     | https://snapshots.node.kaia.io/#mainnet-pruning | [latest.txt](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/manifest.json) |
| カイロス   | 生剪定     | https://snapshots.node.kaia.io/#kairos-pruning  | [latest.txt](https://snapshots.node.kaia.io/kairos/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/kairos/pruning-chaindata/manifest.json)   |

公開されるのは、ライブ剪定されたデータベースのみです。その概念については、[ストレージの最適化](../../learn/storage/storage-optimization.md)をご覧ください。バッチプリューン（状態移行）されたスナップショットは生成されなくなり、フルデータベースやアーカイブデータベースも生成されなくなりました。これらについては、ジェネシスから新たにフル同期を実行するか、devops@kaia.io に書き込んでください。

:::note

このページで以前掲載されていた `https://packages.kaia.io/<network>/chaindata/` および `.../pruning-chaindata/` という URL は、現在更新されていません。それらのディレクトリにある `latest.txt` や `manifest.json` を参照するものはすべて、代わりに上記の表に記載されている URL を参照するようにしてください。

:::
