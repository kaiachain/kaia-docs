# 分析工具

本指南介绍如何设置分析工具以收集诊断数据。

## 1. 准备分析工具

下载下一个脚本

```bash
curl -O https://raw.githubusercontent.com/kaiachain/kaiaspray/main/analyze.sh
```

使其可执行：

```bash
chmod +x analyze.sh
```

将下一条路径设置为您的路径：

```bash
LOG_DIR="/var/kcnd/data/logs"
BIN_PATH="/usr/bin/kcn"
IPC_URL="/var/kcnd/data/klay.ipc"
RPC_URL="http://localhost:8551"
```

## 2. 基本用法

运行完整的分析：

```bash
# NOTE: monitor should be enabled
./analyze.sh --days 5 --log-dir $LOG_DIR --monitor-port 61001
```

只收集政府数据（通过 rpc 收集）：

```bash
./analyze.sh --gov-data-only --bin-path $BIN_PATH --rpc-endpoint $RPC_URL --block-height 5
```

只收集共识数据（通过 ipc 收集）：

```bash
# NOTE: If you're querying on a full node, only (multiples of 1024 + 1 or recent) block nums are available.
 ./analyze.sh --consensus-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH --block-height 1025
```

只收集网络数据（通过 ipc 收集）：

```bash
./analyze.sh --network-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH
```

## 3. 输出结果

结果存储在输出文件夹中。 您可以将输出目录压缩为 zip 文件。

```bash
./analyze.sh --compress-output
```

您可以将压缩的 zip 文件上传到 s3。

```bash
# NOTE: aws-cli should be installed
ZIP_FILE=
S3_BUCKET=
aws s3 cp "$ZIP_FILE" "s3://$S3_BUCKET/$ZIP_FILE"
```