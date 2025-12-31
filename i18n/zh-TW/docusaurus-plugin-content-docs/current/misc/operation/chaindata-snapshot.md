# 使用 Chaindata 快照

您可以從已同步的數據庫（稱為鏈數據快照）啟動節點。 鏈數據快照是一個壓縮的 Kaia 數據目錄。

:::note

這樣可以節省[完全同步](../../learn/storage/block-sync.md#full-sync)整個區塊鏈的時間，從而可以相對快速地啟動新節點或從損壞的數據庫中恢復。

:::

## 準備數據目錄

開始前，請準備足夠的磁盤空間，以容納壓縮文件和未壓縮目錄。

- 如果要從一臺空機器啟動，只需創建一個數據目錄即可。
  ```sh
  sudo mkdir /var/kend
  ```
- 如果要交換現有目錄，請創建一個臨時目錄。
  - 方案 1. 安裝新磁盤（建議使用新磁盤以優化磁盤利用率）
    ```sh
    $ lsblk
    NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
    nvme2n1 259:0 0 3500G 0 disk /var/kend2 # 臨時路徑下的新磁盤
    nvme1n1 259：0 0 4000G 0 disk /var/kcnd # 生產路徑上的舊磁盤
    nvme0n1 259:2 0 8G 0 disk
    ├─nvme0n1p1 259:3 0 8G 0 part /
    └─nvme0n1p128 259:4 0 1M 0 part

    ```
  - 方案 2. 使用現有磁盤
    ```sh
    sudo mkdir /var/kend2/data
    ```

## 下載文件

將壓縮文件下載到新目錄。 URL 位於本頁底部。

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
  # 亞馬遜 Linux 安裝示例
  sudo amazon-linux-extras install epel
  sudo yum install axel pigz

  # 多線程下載並打印狀態欄
  axel -n8 https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz | awk -W interactive '$0~/\[/{printf "%s'$'\r''", $0}'
  ```
- 方案 4. 詠歎調2
  ```sh
  # Rocky Linux 安裝示例
  sudo yum install epel-release aria2

  # 輕量級、多連接下載
  aria2c https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```

## 解壓文件

- 方案 1. tar
  ```sh
  tar -xvf kaia-mainnet-chaindata-xxxxxxxxxxxx.tar.gz
  ```
- 方案 2. tar and pigz
  ```sh
  # Amazon Linux 和 Rocky Linux 安裝示例
  sudo yum install pigz

  # 多線程解壓縮
  tar -I pigz -xvf kaia-mainnet-chaindata-xxxxxxxxxxxx.tar.gz
  ```

## 交換數據目錄

- 首先，停止節點。
  - **重要**：如果您正在運行一個共識節點 (CN)，請確保將該節點從理事會中移除。
- 方案 1. 在相同路徑上交換內容
  - 如果掛載了新磁盤，請更改掛載。
    ```sh
    umount /var/kend # 舊磁盤
    umount /var/kend2 # 臨時路徑下的新磁盤
    mount /dev/nvme2n1 /var/kend # 生產路徑下的新磁盤
    ```
  - 如果使用的是現有磁盤，則重命名目錄。
    ```sh
    mv /var/kend /var/kend_old # 舊數據
    mv /var/kend2 /var/kend # 新數據
    ```
- 方案 2. 變更節點設定中的路徑
  - 更改 `kend.conf` 文件中的 `DATA_DIR` 值。
- 可選擇刪除舊數據和 tar.gz 文件。
- 最後，啟動節點。

## 下載

為提高效率，只提供批量剪枝（狀態遷移）或即時剪枝數據庫。 請閱讀 [儲存最佳化](../../learn/storage/storage-optimization.md) 以瞭解其概念。 如果你想要一個完整的數據庫，既不需要剪枝，也不需要存檔數據，那就從創世中執行一次全新的完整同步。

| 網絡 | 同步選項           | 下載                                                                                                  |
| -- | -------------- | --------------------------------------------------------------------------------------------------- |
| 主網 | state migrated | https://packages.kaia.io/mainnet/chaindata/         |
| 主網 | 現場修剪           | https://packages.kaia.io/mainnet/pruning-chaindata/ |
| 啟示 | state migrated | https://packages.kaia.io/kairos/chaindata/          |
| 啟示 | 現場修剪           | https://packages.kaia.io/kairos/pruning-chaindata/  |
