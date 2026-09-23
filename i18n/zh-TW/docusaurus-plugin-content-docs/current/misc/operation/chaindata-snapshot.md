# 使用 Chaindata 快照

您可以從已同步的數據庫（稱為鏈數據快照）啟動節點。鏈數據快照是一個壓縮的 Kaia 數據目錄。

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

每個已發佈的快照皆列於 [snapshots.node.kaia.io](https://snapshots.node.kaia.io/)，且每個網路都會將最新快照的 URL 作為單行檔案 `latest.txt` 發佈。將其讀取到變數中，如此一來，當發布新的快照時，以下指令便無需進行任何編輯。

```sh
# 主網；若為 Kairos，請將 mainnet 替換為 kairos
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
  # Amazon Linux 安裝範例
  sudo amazon-linux-extras install epel
  sudo yum install axel

  # 多執行緒下載與列印狀態列
  axel -n8 "$URL" | awk -W interactive '$0~/\[/{printf "%s'$'\r''", $0}'
  ```
- 方案 4. 詠歎調2
  ```sh
  # Rocky Linux 安裝範例
  sudo yum install epel-release aria2

  # 輕量級、多連線下載
  aria2c "$URL"
  ```

## 解壓文件

快照會使用 [zstd](https://github.com/facebook/zstd) 進行壓縮，並命名為 `.tar.zst`。該壓縮檔內含一個 `klay/chaindata` 目錄，請將其解壓縮至 data 目錄內。

- 方案 1. tar
  ```sh
  tar --zstd -xvf kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -C /var/kend/data
  ```
- 方案 2. zstd，然後是 tar
  ```sh
  # 適用於未使用 --zstd 選項編譯的 tar。 Amazon Linux 與 Rocky Linux 安裝範例
  sudo yum install zstd

  zstd -d kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -o out.tar
  tar -xf out.tar -C /var/kend/data
  ```
- 選項 3。一次完成下載與解壓縮
  ```sh
  # 無法同時容納存檔檔及其解壓縮後的目錄
  curl -s "$URL" | tar --zstd -xf - -C /var/kend/data
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
- 可選擇刪除舊資料及 `.tar.zst` 檔案。
- 最後，啟動節點。

## 下載

快照發佈於 **[snapshots.node.kaia.io](https://snapshots.node.kaia.io/)**，該頁面列出了每份快照及其大小與校驗和。除了該頁面之外，每個網路還會發布兩個用於腳本的檔案：`latest.txt`（單行列出最新快照的網址）以及 `manifest.json`（列出每個快照及其大小、校驗和與建立時間）。

| 網絡 | 同步選項 | 下載                                                                                                              | 適用於腳本                                                                                                                                                                                                       |
| -- | ---- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 主網 | 現場修剪 | https://snapshots.node.kaia.io/#mainnet-pruning | [latest.txt](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/manifest.json) |
| 啟示 | 現場修剪 | https://snapshots.node.kaia.io/#kairos-pruning  | [latest.txt](https://snapshots.node.kaia.io/kairos/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/kairos/pruning-chaindata/manifest.json)   |

僅會發佈經過即時修剪的資料庫。請閱讀 [儲存空間最佳化](../../learn/storage/storage-optimization.md) 以了解相關概念。系統將不再產生批次修剪（狀態遷移）的快照，也不會產生完整或歸檔資料庫：若需這些資料庫，請從創世區塊開始執行全新的完整同步，或寫入 devops@kaia.io。

:::note

本頁面過去曾列出的 `https://packages.kaia.io/<network>/chaindata/` 以及 `.../pruning-chaindata/` 這些網址，目前已不再更新。任何讀取其下 `latest.txt` 或 `manifest.json` 的程式，都應改為讀取上表中的 URL。

:::
