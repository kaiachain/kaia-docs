# 使用 docker 運行 EN

## 下載圖片

從 https://hub.docker.com/r/kaiachain/kaia/tags 中選擇圖片標籤。 `kaiachain/kaia:latest` 是最近發佈的版本。 但您可以選擇特定的版本。 目前只支持 linux/amd64 平臺。 容器可能無法在 Windows 或 Mac 主機上正常運行。

```sh
docker pull kaiachain/kaia:latest # 最新版本
docker pull kaiachain/kaia:v1.0.2 # 特定版本
```

## 準備配置文件

您可以從現有的配置文件開始。 獲取模板 `kend.conf` 配置文件、

```sh
mkdir -p conf
docker run --rm kaiachain/kaia:latest cat /klaytn-docker-pkg/conf/kend.conf > conf/kend.conf
```

然後編輯配置。 至少必須指定 `DATA_DIR` 和 `LOG_DIR` 。 本指南假定使用 `/var/kend/data`。

```sh
echo "DATA_DIR=/var/kend/data" >> conf/kend.conf
echo "LOG_DIR=/var/kend/logs" >> conf/kend.conf
```

### (可選）下載 Chaindata 快照

從 genesis 區塊進行同步處理非常耗時。 您可以使用 [Chaindata Snapshot](../../misc/operation/chaindata-snapshot.md) 跳過 [Full Sync](../../learn/storage/block-sync.md#full-sync) 過程。 下載並解壓 chaindata 快照。 然後將解壓後的目錄掛載到容器中。

## 啟動容器

公開 RPC 端口，除非在 `kend.conf` 中進行了修改，否則端口為 8551。 掛載配置目錄 `conf/` 和 chaindata 目錄 `data/`。 然後運行 `kend start` 啟動守護進程，並運行 `tail -f` 打印日誌。

```sh
mkdir -p data
docker run -d --name ken \
  -p 8551:8551 \
  -v $(pwd)/conf:/klaytn-docker-pkg/conf \
  -v $(pwd)/data:/var/kend/data \
  kaiachain/kaia:latest \
  /bin/bash -c "kend start && touch /var/kend/logs/kend.out && tail -f /var/kend/logs/kend.out"
```

## 連接到控制檯

```
docker exec -it ken ken attach --datadir /var/kend/data
```

## 停止容器

為防止 chaindata 損壞，請優雅地關閉 `ken`。

```
docker exec -it ken kend stop
docker stop ken
docker rm ken
```