# 分析工具

本指南說明如何設定分析工具以收集診斷資料。

## 1. 準備分析工具

下載下一個腳本：

```bash
curl -O https://raw.githubusercontent.com/kaiachain/kaiaspray/main/analyze.sh
```

使其可執行：

```bash
chmod +x analyze.sh
```

將下一個路徑設為您的路徑：

```bash
LOG_DIR="/var/kcnd/data/logs"
BIN_PATH="/usr/bin/kcn"
IPC_URL="/var/kcnd/data/klay.ipc"
RPC_URL="http://localhost:8551"
```

## 2. 基本用法

執行完整的分析：

```bash
# NOTE: monitor should be enabled
./analyze.sh --days 5 --log-dir $LOG_DIR --monitor-port 61001
```

只收集政府資料 (透過 rpc 收集)：

```bash
./analyze.sh --gov-data-only --bin-path $BIN_PATH --rpc-endpoint $RPC_URL --block-height 5
```

只收集共識資料 (透過 ipc 收集)：

```bash
# NOTE: If you're querying on a full node, only (multiples of 1024 + 1 or recent) block nums are available.
 ./analyze.sh --consensus-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH --block-height 1025
```

只收集網路資料 (透過 ipc 收集)：

```bash
./analyze.sh --network-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH
```

## 3. 匯出輸出

結果會儲存在輸出資料夾。 您可以將輸出目錄壓縮成 zip 檔案。

```bash
./analyze.sh --compress-output
```

您可以將壓縮的 zip 檔案上傳至 s3。

```bash
# NOTE: aws-cli should be installed
ZIP_FILE=
S3_BUCKET=
aws s3 cp "$ZIP_FILE" "s3://$S3_BUCKET/$ZIP_FILE"
```