# Dockerを使用してENを実行する

## 画像をダウンロード

https://hub.docker.com/r/kaiachain/kaia/tags、画像タグを選択します。 `kaiachain/kaia:latest`は最近のリリースバージョンである。 しかし、特定のバージョンを選択することもできる。 現在のところ、linux/amd64プラットフォームのみがサポートされている。 コンテナはWindowsまたはMacホストでは正しく動作しない場合があります。

```sh
docker pull kaiachain/kaia:latest # 最新リリース
docker pull kaiachain/kaia:v1.0.2 # 特定のバージョン
```

## 設定ファイルの準備

既存のコンフィギュレーション・ファイルから始めることができる。 テンプレートの `kend.conf` 設定ファイルを取得する、

```sh
mkdir -p conf
docker run --rm kaiachain/kaia:latest cat /klaytn-docker-pkg/conf/kend.conf > conf/kend.conf
```

次にコンフィギュレーションを編集する。 少なくとも `DATA_DIR` と `LOG_DIR` は指定しなければならない。 このガイドでは、`/var/kend/data` を想定している。

```sh
echo "DATA_DIR=/var/kend/data" >> conf/kend.conf
echo "LOG_DIR=/var/kend/logs" >> conf/kend.conf
```

### (オプション）Chaindata Snapshotのダウンロード

ジェネシス・ブロックからの同期には時間がかかる。 Chaindata Snapshot](../../misc/operation/chaindata-snapshot.md) を使用して、[Full Sync](../../learn/storage/block-sync.md#full-sync) プロセスをスキップすることができます。 chaindataスナップショットをダウンロードし、解凍する。 次に、解凍したディレクトリをコンテナにマウントする。

## コンテナのスタート

RPC ポートを公開する。`kend.conf` で変更していなければ 8551 である。 設定ディレクトリ `conf/` と chaindata ディレクトリ `data/` をマウントする。 それから `kend start` を実行してデーモンを起動し、`tail -f` を実行してログを出力する。

```sh
mkdir -p data
docker run -d --name ken \
  -p 8551:8551 \
  -v $(pwd)/conf:/klaytn-docker-pkg/conf \
  -v $(pwd)/data:/var/kend/data \
  kaiachain/kaia:latest \
  /bin/bash -c "kend start && touch /var/kend/logs/kend.out && tail -f /var/kend/logs/kend.out"
```

## コンソールへの取り付け

```
docker exec -it ken ken attach --datadir /var/kend/data
```

## コンテナの停止

chaindataの破損を防ぐために、`ken`を優雅にシャットダウンする。

```
docker exec -it ken kend stop
docker stop ken
docker rm ken
```