# 分析ツール

このガイドでは、診断データを収集するための分析ツールのセットアップ方法を説明します。

## 1. 分析ツールを準備する

次のスクリプトをダウンロードする：

```bash
curl -O https://raw.githubusercontent.com/kaiachain/kaiaspray/main/analyze.sh
```

実行可能にする：

```bash
chmod +x analyze.sh
```

次のパスを自分のものにする：

```bash
LOG_DIR="/var/kcnd/data/logs"
BIN_PATH="/usr/bin/kcn"
IPC_URL="/var/kcnd/data/klay.ipc"
RPC_URL="http://localhost:8551"
```

## 2. 基本的な使い方

完全な分析を行う：

```bash
# NOTE: monitor should be enabled
./analyze.sh --days 5 --log-dir $LOG_DIR --monitor-port 61001
```

政府データのみを収集する（rpc経由で収集する）：

```bash
./analyze.sh --gov-data-only --bin-path $BIN_PATH --rpc-endpoint $RPC_URL --block-height 5
```

コンセンサスデータのみを収集する（ipc経由で収集する）：

```bash
# NOTE: If you're querying on a full node, only (multiples of 1024 + 1 or recent) block nums are available.
 ./analyze.sh --consensus-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH --block-height 1025
```

ネットワークデータのみを収集する（ipc経由で収集する）：

```bash
./analyze.sh --network-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH
```

## ３． 出力をエクスポートする

結果は出力フォルダに保存される。 出力ディレクトリをzipファイルに圧縮することができます。

```bash
./analyze.sh --compress-output
```

圧縮されたzipファイルをs3にアップロードすることができます。

```bash
# NOTE: aws-cli should be installed
ZIP_FILE=
S3_BUCKET=
aws s3 cp "$ZIP_FILE" "s3://$S3_BUCKET/$ZIP_FILE"
```