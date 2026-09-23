# 使用 Chaindata 快照

您可以从已同步的数据库（称为链数据快照）启动节点。链数据快照是一个压缩的 Kaia 数据目录。

:::note

这样可以节省[完全同步](../../learn/storage/block-sync.md#full-sync)整个区块链的时间，从而可以相对快速地启动新节点或从损坏的数据库中恢复。

:::

## 准备数据目录

开始前，请准备足够的磁盘空间，以容纳压缩文件和未压缩目录。

- 如果要从一台空机器启动，只需创建一个数据目录即可。
  ```sh
  sudo mkdir /var/kend
  ```
- 如果要交换现有目录，请创建一个临时目录。
  - 方案 1. 安装新磁盘（建议使用新磁盘以优化磁盘利用率）
    ```sh
    $ lsblk
    NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
    nvme2n1 259:0 0 3500G 0 disk /var/kend2 # 临时路径下的新磁盘
    nvme1n1 259：0 0 4000G 0 disk /var/kcnd # 生产路径上的旧磁盘
    nvme0n1 259:2 0 8G 0 disk
    ├─nvme0n1p1 259:3 0 8G 0 part /
    └─nvme0n1p128 259:4 0 1M 0 part

    ```
  - 方案 2. 使用现有磁盘
    ```sh
    sudo mkdir /var/kend2/data
    ```

## 下载文件

每个已发布的快照都会列在 [snapshots.node.kaia.io](https://snapshots.node.kaia.io/) 上，每个网络都会将最新快照的 URL 作为单行文件 `latest.txt` 发布。将其读入一个变量中，这样在发布新快照时，下面的命令就无需修改了。

```sh
# 主网；对于 Kairos，请将 mainnet 替换为 kairos
URL=$(curl -s https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt)
echo "$URL"
```

- 方案 1. curl
  ```sh
  curl -O "$URL"
  ```
- 方案 2. wget
  ```sh
  wget "$URL"
  ```
- 方案 3. axel
  ```sh
  # Amazon Linux 安装示例
  sudo amazon-linux-extras install epel
  sudo yum install axel

  # 多线程下载和打印状态栏
  axel -n8 "$URL" | awk -W interactive '$0~/\[/{printf "%s'$'\r''", $0}'
  ```
- 方案 4. 咏叹调2
  ```sh
  # Rocky Linux 安装示例
  sudo yum install epel-release aria2

  # 轻量级、多连接下载
  aria2c "$URL"
  ```

## 解压文件

快照使用 [zstd](https://github.com/facebook/zstd) 进行压缩，并命名为 `.tar.zst`。该存档中包含一个 `klay/chaindata` 目录，因此请将其解压到 data 目录中。

- 方案 1. tar
  ```sh
  tar --zstd -xvf kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -C /var/kend/data
  ```
- 方案 2. zstd，然后是tar
  ```sh
  # 适用于未使用 --zstd 选项构建的 tar。 Amazon Linux 和 Rocky Linux 安装示例
  sudo yum install zstd

  zstd -d kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -o out.tar
  tar -xf out.tar -C /var/kend/data
  ```
- 选项 3。一键下载并解压
  ```sh
  # 没有足够的空间同时容纳归档文件及其解压后的目录
  curl -s "$URL" | tar --zstd -xf - -C /var/kend/data
  ```

## 交换数据目录

- 首先，停止节点。
  - **重要**：如果您正在运行一个共识节点 (CN)，请确保将该节点从理事会中移除。
- 方案 1. 在相同路径上交换内容
  - 如果挂载了新磁盘，请更改挂载。
    ```sh
    umount /var/kend # 旧磁盘
    umount /var/kend2 # 临时路径下的新磁盘
    mount /dev/nvme2n1 /var/kend # 生产路径下的新磁盘
    ```
  - 如果使用的是现有磁盘，则重命名目录。
    ```sh
    mv /var/kend /var/kend_old # 旧数据
    mv /var/kend2 /var/kend # 新数据
    ```
- 方案 2. 更改节点配置中的路径
  - 更改 `kend.conf` 文件中的 `DATA_DIR` 值。
- 可选：删除旧数据和 `.tar.zst` 文件。
- 最后，启动节点。

## 下载

快照发布在 **[snapshots.node.kaia.io](https://snapshots.node.kaia.io/)**，该页面列出了所有快照及其大小和校验和。除了该页面外，每个网络还会发布两个用于脚本的文件：`latest.txt`（每行包含一个最新快照的 URL）和 `manifest.json`（列出了所有快照及其大小、校验和和创建时间）。

| 网络 | 同步选项 | 下载                                                                                                              | 用于脚本                                                                                                                                                                                                        |
| -- | ---- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 主网 | 现场修剪 | https://snapshots.node.kaia.io/#mainnet-pruning | [latest.txt](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/manifest.json) |
| 启示 | 现场修剪 | https://snapshots.node.kaia.io/#kairos-pruning  | [latest.txt](https://snapshots.node.kaia.io/kairos/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/kairos/pruning-chaindata/manifest.json)   |

仅发布经过实时修剪的数据库。请阅读《[存储优化]》(../../learn/storage/storage-optimization.md) 以了解相关概念。不再生成批量精简（状态迁移）快照，也不再生成完整数据库或归档数据库：对于此类情况，请从创世区块开始执行一次全新的完整同步，或向 devops@kaia.io 提交请求。

:::note

本页面以前列出的 `https://packages.kaia.io/<network>/chaindata/` 和 `.../pruning-chaindata/` 这些 URL 现已不再更新。任何读取这些文件夹下 `latest.txt` 或 `manifest.json` 的程序，都应改读上表中的 URL。

:::
