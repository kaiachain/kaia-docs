# 使用 docker 运行 EN

## 下载图片

从 https://hub.docker.com/r/kaiachain/kaia/tags 中选择图片标签。 `kaiachain/kaia:latest` 是最近发布的版本。 但您可以选择特定的版本。 目前只支持 linux/amd64 平台。 容器可能无法在 Windows 或 Mac 主机上正常运行。

```sh
docker pull kaiachain/kaia:latest # 最新版本
docker pull kaiachain/kaia:v1.0.2 # 特定版本
```

## 准备配置文件

您可以从现有的配置文件开始。 获取模板 `kend.conf` 配置文件、

```sh
mkdir -p conf
docker run --rm kaiachain/kaia:latest cat /klaytn-docker-pkg/conf/kend.conf > conf/kend.conf
```

然后编辑配置。 至少必须指定 `DATA_DIR` 和 `LOG_DIR` 。 本指南假定使用 `/var/kend/data`。

```sh
echo "DATA_DIR=/var/kend/data" >> conf/kend.conf
echo "LOG_DIR=/var/kend/logs" >> conf/kend.conf
```

### (可选）下载 Chaindata 快照

从创世区块进行同步操作非常耗时。 您可以使用 [Chaindata Snapshot](../../misc/operation/chaindata-snapshot.md) 跳过 [Full Sync](../../learn/storage/block-sync.md#full-sync) 过程。 下载并解压 chaindata 快照。 然后将解压后的目录挂载到容器中。

## 启动容器

公开 RPC 端口，除非在 `kend.conf` 中进行了修改，否则端口为 8551。 挂载配置目录 `conf/` 和 chaindata 目录 `data/`。 然后运行 `kend start` 启动守护进程，并运行 `tail -f` 打印日志。

```sh
mkdir -p data
docker run -d --name ken \
  -p 8551:8551 \
  -v $(pwd)/conf:/klaytn-docker-pkg/conf \
  -v $(pwd)/data:/var/kend/data \
  kaiachain/kaia:latest \
  /bin/bash -c "kend start && touch /var/kend/logs/kend.out && tail -f /var/kend/logs/kend.out"
```

## 连接到控制台

```
docker exec -it ken ken attach --datadir /var/kend/data
```

## 停止容器

为防止 chaindata 损坏，请优雅地关闭 `ken`。

```
docker exec -it ken kend stop
docker stop ken
docker rm ken
```