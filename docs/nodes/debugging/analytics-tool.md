# Analytics tool

This guide explains how to setup analytics tool to collect the diagnostics data.

## 1. Prepare the analytics tool
Download the next script:
```bash
curl -O https://raw.githubusercontent.com/kaiachain/kaiaspray/main/analyze.sh
```
Make it executable:
```bash
chmod +x analyze.sh
```
Set the next paths to yours:
```bash
LOG_DIR="/var/kcnd/data/logs"
BIN_PATH="/usr/bin/kcn"
IPC_URL="/var/kcnd/data/klay.ipc"
RPC_URL="http://localhost:8551"
```

## 2. Basic Usage
Run complete analysis:
```bash
# NOTE: monitor should be enabled
./analyze.sh --days 5 --log-dir $LOG_DIR --monitor-port 61001
```

To collect only gov-data (collect via rpc):
```bash
./analyze.sh --gov-data-only --bin-path $BIN_PATH --rpc-endpoint $RPC_URL --block-height 5
```

To collect only consensus-data (collect via ipc):
```bash
# NOTE: If you're querying on a full node, only (multiples of 1024 + 1 or recent) block nums are available.
 ./analyze.sh --consensus-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH --block-height 1025
```

To collect only network-data (collect via ipc):
```bash
./analyze.sh --network-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH
```

## 3. Export the output

The result is stored in output folder. You can compress the output directory to zip file.
```bash
./analyze.sh --compress-output
```
You can upload the compressed zip file to s3.
```bash
# NOTE: aws-cli should be installed
ZIP_FILE=
S3_BUCKET=
aws s3 cp "$ZIP_FILE" "s3://$S3_BUCKET/$ZIP_FILE"
```