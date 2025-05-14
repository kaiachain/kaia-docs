# Công cụ phân tích

Hướng dẫn này giải thích cách thiết lập công cụ phân tích để thu thập dữ liệu chẩn đoán.

## 1. Chuẩn bị công cụ phân tích

Tải xuống tập lệnh tiếp theo:

```bash
curl -O https://raw.githubusercontent.com/kaiachain/kaiaspray/main/analyze.sh
```

Làm cho nó có thể thực thi được:

```bash
chmod +x analyze.sh
```

Thiết lập các đường dẫn tiếp theo cho bạn:

```bash
LOG_DIR="/var/kcnd/data/logs"
BIN_PATH="/usr/bin/kcn"
IPC_URL="/var/kcnd/data/klay.ipc"
RPC_URL="http://localhost:8551"
```

## 2. Cách sử dụng cơ bản

Chạy phân tích đầy đủ:

```bash
# NOTE: monitor should be enabled
./analyze.sh --days 5 --log-dir $LOG_DIR --monitor-port 61001
```

Để chỉ thu thập dữ liệu của chính phủ (thu thập thông qua rpc):

```bash
./analyze.sh --gov-data-only --bin-path $BIN_PATH --rpc-endpoint $RPC_URL --block-height 5
```

Để chỉ thu thập dữ liệu đồng thuận (thu thập qua ipc):

```bash
# NOTE: If you're querying on a full node, only (multiples of 1024 + 1 or recent) block nums are available.
 ./analyze.sh --consensus-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH --block-height 1025
```

Để chỉ thu thập dữ liệu mạng (thu thập qua ipc):

```bash
./analyze.sh --network-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH
```

## 3. Xuất đầu ra

Kết quả được lưu trữ trong thư mục đầu ra. Bạn có thể nén thư mục đầu ra thành tệp zip.

```bash
./analyze.sh --compress-output
```

Bạn có thể tải tệp zip đã nén lên s3.

```bash
# NOTE: aws-cli should be installed
ZIP_FILE=
S3_BUCKET=
aws s3 cp "$ZIP_FILE" "s3://$S3_BUCKET/$ZIP_FILE"
```