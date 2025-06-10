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
  - オプション1。 新しいディスクをマウントする。
    ```sh
    $ lsblk
    NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
    nvme2n1 259:0 0 3500G 0 disk /var/kend2 # 一時パスの新しいディスク
    nvme1n1 259：0 0 4000G 0 disk /var/kcnd # 本番パスの古いディスク
    nvme0n1 259:2 0 8G 0 disk
    ├─nvme0n1p1 259:3 0 8G 0 part /
    └─nvme0n1p128 259:4 0 1M 0 part

    ```
  - オプション2。 既存のディスクを使用
    ```sh
    sudo mkdir /var/kend2/data
    ```

## ファイルをダウンロードする

新しいディレクトリに圧縮ファイルをダウンロードする。 URLはこのページの下にあります。

- オプション1。 curl
  ```sh
  curl -O https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```
- オプション2。 wget
  ```sh
  wget https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```
- オプション3。 axel
  ```sh
  # Amazon Linux インストール例
  sudo amazon-linux-extras install epel
  sudo yum install axel pigz

  # マルチスレッドダウンロードとステータスバーの表示
  axel -n8 https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz | awk -W interactive '$0~/[/{printf "%s'$'\r''", $0}'.
  ```
- オプション4。 aria2
  ```sh
  # Rocky Linux インストール例
  sudo yum install epel-release aria2

  # 軽量、マルチコネクションダウンロード
  aria2c https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```

## ファイルを解凍する

- オプション1。 tar
  ```sh
  tar -xvf kaia-mainnet-chaindata-xxxxxxxxxx.tar.gz
  ```
- オプション2。 tar and pigz
  ```sh
  # Amazon Linux & Rocky Linux インストール例
  sudo yum install pigz

  # マルチスレッド解凍
  tar -I pigz -xvf kaia-mainnet-chaindata-xxxxxxxxxx.tar.gz
  ```

## データ・ディレクトリを入れ替える

- まず、ノードを停止する。
  - **重要**：重要\*\*：コンセンサス・ノード(CN)を実行している場合は、必ずそのノードをカウンシルから削除してください。
- オプション1。 同じパスでコンテンツを入れ替える
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
- オプション2。 ノード・コンフィギュレーションでパスを変更する
  - `kend.conf` ファイルの `DATA_DIR` の値を変更する。
- オプションで古いデータとtar.gzファイルを削除する。
- 最後にノードをスタートさせる。

## ダウンロード

効率化のため、バッチ・プルーニング（状態移行）またはライブ・プルーニングされたデータベースのみが提供される。 その概念については、[ストレージの最適化](../../learn/storage/state-pruning.md)を読んでほしい。 プルーニングもアーカイブデータもない完全なデータベースが必要な場合は、ジェネシスから新たに完全同期を実行してください。

| ネットワーク | 同期オプション | ダウンロード                                                                                              |
| ------ | ------- | --------------------------------------------------------------------------------------------------- |
| メインネット | 移行状態    | https://packages.kaia.io/mainnet/chaindata/         |
| メインネット | 生剪定     | https://packages.kaia.io/mainnet/pruning-chaindata/ |
| カイロス   | 移行状態    | https://packages.kaia.io/kairos/chaindata/          |
| カイロス   | 生剪定     | https://packages.kaia.io/kairos/pruning-chaindata/  |
