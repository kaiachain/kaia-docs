# 使用 Chaindata 快照

您可以从已同步的数据库（称为链数据快照）启动节点。 链数据快照是一个压缩的 Kaia 数据目录。

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

将压缩文件下载到新目录。 URL 位于本页底部。

- 方案 1. curl
  ```sh
  curl -O https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```
- 方案 2. wget
  ```sh
  wget https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```
- 方案 3. axel
  ```sh
  # 亚马逊 Linux 安装示例
  sudo amazon-linux-extras install epel
  sudo yum install axel pigz

  # 多线程下载并打印状态栏
  axel -n8 https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz | awk -W interactive '$0~/\[/{printf "%s'$'\r''", $0}'
  ```
- 方案 4. 咏叹调2
  ```sh
  # Rocky Linux 安装示例
  sudo yum install epel-release aria2

  # 轻量级、多连接下载
  aria2c https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```

## 解压文件

- 方案 1. tar
  ```sh
  tar -xvf kaia-mainnet-chaindata-xxxxxxxxxxxx.tar.gz
  ```
- 方案 2. tar and pigz
  ```sh
  # Amazon Linux 和 Rocky Linux 安装示例
  sudo yum install pigz

  # 多线程解压缩
  tar -I pigz -xvf kaia-mainnet-chaindata-xxxxxxxxxxxx.tar.gz
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
- 可选择删除旧数据和 tar.gz 文件。
- 最后，启动节点。

## 下载

为提高效率，只提供批量剪枝（状态迁移）或实时剪枝数据库。 请阅读 [Storage Optimization](../../learn/storage/state-pruning.md)，了解它们的概念。 如果你想要一个完整的数据库，既不需要剪枝，也不需要存档数据，那就从创世中执行一次全新的完整同步。

| 网络 | 同步选项           | 下载                                                                                                  |
| -- | -------------- | --------------------------------------------------------------------------------------------------- |
| 主网 | state migrated | https://packages.kaia.io/mainnet/chaindata/         |
| 主网 | 现场修剪           | https://packages.kaia.io/mainnet/pruning-chaindata/ |
| 启示 | state migrated | https://packages.kaia.io/kairos/chaindata/          |
| 启示 | 现场修剪           | https://packages.kaia.io/kairos/pruning-chaindata/  |
