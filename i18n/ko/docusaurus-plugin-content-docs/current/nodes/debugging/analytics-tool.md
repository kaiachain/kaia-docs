# 분석 도구

이 가이드에서는 진단 데이터를 수집하기 위해 분석 도구를 설정하는 방법을 설명합니다.

## 1. 분석 도구 준비

다음 스크립트를 다운로드하세요:

```bash
curl -O https://raw.githubusercontent.com/kaiachain/kaiaspray/main/analyze.sh
```

실행 가능한 파일로 만듭니다:

```bash
chmod +x analyze.sh
```

다음 경로를 설정하세요:

```bash
LOG_DIR="/var/kcnd/data/logs"
BIN_PATH="/usr/bin/kcn"
IPC_URL="/var/kcnd/data/klay.ipc"
RPC_URL="http://localhost:8551"
```

## 2. 기본 사용법

전체 분석을 실행합니다:

```bash
# NOTE: monitor should be enabled
./analyze.sh --days 5 --log-dir $LOG_DIR --monitor-port 61001
```

정부 데이터만 수집하려면(RPC를 통해 수집):

```bash
./analyze.sh --gov-data-only --bin-path $BIN_PATH --rpc-endpoint $RPC_URL --block-height 5
```

합의 데이터만 수집하려면(IPC를 통해 수집):

```bash
# NOTE: If you're querying on a full node, only (multiples of 1024 + 1 or recent) block nums are available.
 ./analyze.sh --consensus-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH --block-height 1025
```

네트워크 데이터만 수집하려면(IPC를 통해 수집):

```bash
./analyze.sh --network-only --rpc-endpoint $IPC_URL --bin-path $BIN_PATH
```

## 3. 출력 내보내기

결과는 출력 폴더에 저장됩니다. 출력 디렉토리를 zip 파일로 압축할 수 있습니다.

```bash
./analyze.sh --compress-output
```

압축된 zip 파일을 s3에 업로드할 수 있습니다.

```bash
# NOTE: aws-cli should be installed
ZIP_FILE=
S3_BUCKET=
aws s3 cp "$ZIP_FILE" "s3://$S3_BUCKET/$ZIP_FILE"
```