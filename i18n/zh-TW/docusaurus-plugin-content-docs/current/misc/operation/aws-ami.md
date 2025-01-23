# 使用 AWS AMI

:::info[Service 不再更新]

Kaia 端點節點的 AWS AMI 服務不再更新（最後更新日期：2024 年 11 月）。 雖然現有的 AMI（日期為 2024 年 11 月）仍可使用，但請注意，它們可能需要額外的同步時間才能趕上當前的區塊鏈狀態。 有關其他設置方法，如使用鏈數據快照或執行完全同步，請參閱 [塊同步](../../learn/storage/block-sync.md)。

:::

Kaia 為 Kaia 端點節點 (EN) 提供 AWS AMI（[亞馬遜機器映像](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)）。 這些 AMI 預先安裝了 EN 軟件和鏈數據，使用戶能夠快速方便地啟動一個可全面運行的節點。 有了 Kaia 的 AMI，按需設置新的終端節點就變得簡單易行，從而簡化了加入 Kaia 網絡的過程。

## 為什麼使用 AMI

AMI 提供了啟動新 Kaia EN 的便捷方式。 此外，由於其鏈數據已經設置好，您不需要額外的磁盤存儲空間來下載和提取壓縮鏈數據。 此外，對於某些同步模式，如歸檔模式或無狀態遷移的完整模式（我們只為剪枝鏈數據提供快照下載），使用 AMI 是在不完全同步的情況下運行新 EN 的唯一選擇。

## EN AMI 的類型

Kaia 提供不同類型的 AMI，其鏈數據已通過不同模式同步。

| **類型** | **同步模式**            | **AMI 名稱**                        |
| ------ | ------------------- | --------------------------------- |
| 全部     | 全模式                 | `kaia-xxxx-clean-full-en-xxxx`    |
| 修剪     | 全模式，啟用即時修剪          | `kaia-xxxx-clean-pruning-en-xxxx` |
| 州遷移    | 全模式，狀態已遷移（或狀態已批量剪切） | `kaia-xxxx-clean-en-xxxx`         |
| 檔案館    | 存檔模式                | `kaia-xxxx-clean-archive-en-xxxx` |

Kaia 為主網絡提供這 4 種 AMI。 除了 "完整 "類型，Kairos 也有 AMI。

有關狀態遷移鏈數據的更多詳情，請參閱 [狀態批量剪枝](../../../learn/storage/state-pruning/#state-batch-pruning-state-migration)。
有關塊同步模式的更多詳情，請參閱 [塊同步](../../learn/storage/block-sync.md)。

## 在亞馬遜控制檯使用 AMI 啟動新的 EC2 實例

在 AWS 控制檯中啟動新 EC2 實例時，應選擇 AMI。 在 AMI 搜索欄中搜索 "kaia-mainnet"。

![AMI search bar](/img/misc/ami_search.png)

該頁面將帶您進入搜索結果。 單擊搜索結果頁面中的 "社區 AMI "選項卡，然後從列表中選擇要使用的 AMI。

![AMI search result](/img/misc/ami_select.png)

### 允許入站連接

在 AWS 控制檯中啟動新的 EC2 實例時，可以為實例創建新的安全組，也可以選擇現有的安全組。 無論採用哪種方式，都必須添加入站規則，以允許連接到 Kaia 節點用於相互通信的端口。

導航到 AWS 控制檯中的 EC2 實例頁面，在 "安全 "選項卡中找到相關的安全組。 您應為端口 32323-32324 添加入站規則。

| IP 版本 | 類型      | 規程  | 端口範圍          | 資料來源                                                      |
| ----- | ------- | --- | ------------- | --------------------------------------------------------- |
| IPv4  | 自定義 TCP | TCP | 32323 - 32324 | 0.0.0.0/0 |
| IPv4  | 自定義 UDP | UDP | 32323         | 0.0.0.0/0 |

## 啟動後的實例準備和設置

### 預熱亞馬遜 EBS 卷

根據快照創建的 Amazon EBS 卷（AMI 就是一種情況），必須先從 Amazon S3 提取存儲塊並寫入卷，然後才能訪問它們。 這樣，在首次訪問每個數據塊時，磁盤操作的開銷就會很大。 所有數據塊下載並寫入加密卷後，加密卷性能才會恢復。 有關詳細信息，請參閱 [初始化 Amazon EBS 卷](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-initialize.html)。

為了讓卷準備就緒，我們可以運行一個任務來讀取所有數據塊。

```bash
$ sudo yum install -y fio
$ sudo fio --filename=/dev/nvme1n1 --rw=read --bs=128k --iodepth=32 --ioengine=libaio --direct=1 --name=volume-initialize
```

:::note

預熱 Amazon EBS 卷的任務需要很長時間，具體取決於數據大小。 有關 ETA，請參閱 `fio` 輸出。

:::

### 檢查 `kend.conf` 配置

啟動節點前，請檢查配置文件 `kend.conf` 中的 `NETWORK` 和 `NETWORK_ID` 字段。 kend.conf 文件位於 `/etc/kend/conf/kend.conf`。

對於 Mainnet，"NETWORK "字段應為 "mainnet"。 對於 Kairos，"NETWORK "字段應為 "kairos"。

```
# 對於 Mainnet
NETWORK=mainnet

# 對於 Kairos
NETWORK=kairos
```

請注意，`NETWORK_ID` 僅用於專用網絡。 因此，請確保不要為 Mainnet 或 Kairos 設置 `NETWORK_ID`。

有關 `kend.conf` 的更多詳情，請參閱 [配置](configuration.md)。

### 啟動 "kend "服務

在 EC2 實例中，安裝了 Kaia CLI 客戶端和 chaindata。 此外，"kend"（用於啟動/終止 EN 的腳本）已作為一項服務安裝。 您可以使用以下命令檢查 `kend` 服務的狀態。

```bash
$ sudo service kend status
```

如果服務未運行，請嘗試重新啟動。

```bash
$ sudo service kend restart
```

如果服務重新啟動且 EN 已成功啟動，則可在路徑 `/var/kend/logs/kend.out`中查看日誌。

```bash
$ tail -f /var/kend/logs/kend.out
```

Kaia 提供一個 CLI 客戶端 "ken console"。 您可以通過多個端點使用 "ken 控制檯 "與 Kaia 節點交互，其中一個選項是使用 IPC（進程間通信）。 IPC 文件 `klay.ipc` 位於 EN 的 `DATA_DIR` 路徑下，在我們的例子中為 `/var/kend/data`。 因此，為了使用 `ken console`：

```bash
$ sudo ken attach --datadir /var/kend/data
歡迎訪問 Kaia JavaScript 控制檯！

 instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
  datadir：/var/kend/data
  modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

### 等待區塊同步

由於 AMI 是幾小時前創建的，我們需要一些時間來同步到最新區塊。 您可以在 "ken 控制檯 "中查看當前同步的區塊編號和同步進度。

```js
> klay.blockNumber
165227166
> klay.syncing
{
  currentBlock: 165227166,
  highestBlock: 165357203,
  knownStates：0,
  pulledStates：0,
  startingBlock: 165222272
}
```

塊同步完成後，查詢同步進度應返回 `false`。

```js
> klay.syncing
false
```
