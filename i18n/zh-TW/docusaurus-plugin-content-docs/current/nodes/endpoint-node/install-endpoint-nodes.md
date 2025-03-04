# 安裝端點節點

## 下載<a id="download"></a>

您可以在 [Download](../downloads/downloads.md) 頁面下載最新版本的 EN。

## 安裝

### Linux 檔案分發版<a id="linux-archive-distribution"></a>

存檔文件由可執行二進制文件和配置文件組成，結構如下。

**注意**：請勿更改文件結構或文件名。 如果更改，節點可能無法正常運行。

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| 文件名稱                           | 文件說明         |
| :----------------------------- | :----------- |
| bin/ken                        | EN 可執行文件     |
| bin/kend                       | EN 啟動/終止腳本文件 |
| conf/kend.conf | EN 配置文件      |

安裝是將下載的軟件包解壓縮，然後安裝到您想要安裝的位置。

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

或者

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**注意**：建議在環境變量 `$PATH` 中添加解壓縮目錄 `ken-linux-amd64/bin` 路徑，以便全局運行 `ken` 和 `kend`。 舉個例子

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

其他部分假定路徑已添加到變量中。

### RPM 發行版 \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

您可以使用以下 `yum` 命令安裝下載的 RPM 文件。

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

或者

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### 從 Kaia Yum Repo 安裝<a id="install-from-kaia-yum-repo"></a>

或者，也可以從 Kaia Yum 軟件倉庫安裝 `kend`，然後運行

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kend
```

### 安裝位置<a id="installed-location"></a>

安裝文件的位置如下

| 文件名稱                      | 地點                                       |
| :------------------------ | :--------------------------------------- |
| ken                       | /usr/bin/ken                             |
| kend.conf | /etc/kend/conf/kend.conf |

## 配置<a id="configuration"></a>

EN 配置是創建一個數據目錄，並在配置文件 `kend.conf` 中設置環境變量。

1. 創建 EN 數據目錄。
2. 使用 `kend.conf` 配置 EN。

### EN 數據目錄創建<a id="en-data-directory-creation"></a>

考慮到 Kaia 區塊鏈數據的大小不斷增加，建議使用足夠大的存儲空間。 您需要在所需路徑上創建目錄。

```text
$ sudo mkdir -p /var/kend/data
```

### 更新配置文件<a id="update-the-configuration-file"></a>

配置文件位置：

- 對於存檔發行版，配置目錄位置默認為 `$INSTALL_PATH/ken-linux-amd64/conf/`。
- 對於軟件包發行版，配置目錄默認為 `/etc/kend/conf/`。

#### 添加數據目錄 <a id="add-data-directory"></a>

您應更新配置文件 `kend.conf` 中的數據目錄環境變量 `$DATA_DIR`。

```text
DATA_DIR=/var/kend/data
```

### (可選）下載 Chaindata 快照

從創世區塊進行同步操作非常耗時。 您可以使用 [Chaindata Snapshot](../../misc/operation/chaindata-snapshot.md) 跳過 [Full Sync](../../learn/storage/block-sync.md#full-sync) 過程。

## 啟動 EN<a id="startup-the-en"></a>

您可以使用以下命令啟動或停止端點節點。

**開始**

```bash
$ kend start
Starting kend: OK
```

**停止**

```bash
$ kend stop
Shutting down kend: Killed
```

**狀態**

```bash
$ kend status
kend is running
```

## 測試安裝<a id="testing-the-installation"></a>

現在是檢查端點節點是否安裝成功以及安裝後是否按預期運行的時候了。

### 進程狀態<a id="process-status"></a>

可以使用狀態命令 `systemctl` 和 `kend` 檢查 EN 進程的狀態。

#### systemctl <a id="systemctl"></a>

systemctl "與 RPM 一起安裝，可通過以下方式檢查 EN 的狀態。

```bash
$ systemctl status kend.service
● kend.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kend; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kend start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (ken)
   CGroup: /system.slice/kend.service
           └─29641 /usr/local/bin/ken --networkid 1000 --datadir /kend_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kend[29636]: Starting kend: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

您可以查看當前狀態，如上面例子中的 "Active: active (running)"。

#### kend <a id="kend"></a>

kend "與軟件包一起安裝，EN 的狀態可通過以下方式檢查。

```bash
$ kend status
kend 正在運行
```

### 日誌<a id="logs"></a>

日誌存儲在位於`kend.conf`文件中`LOG_DIR`字段所定義路徑下的`kend.out`文件中。 當節點正常工作時，可以看到每個區塊每秒的導入情況如下。

例如

```bash
$ tail kend.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work      
```

### 查詢<a id="queries"></a>

#### 控制檯<a id="ken-console"></a>

Kaia 提供一個 CLI 客戶端："ken console"。 使用客戶端的另一種方法是通過 IPC（進程間通信）連接進程。 IPC 文件 `klay.ipc` 位於 EN 的 `DATA_DIR` 路徑下。

請執行以下命令並查看結果。

```text
$ ken attach --datadir /var/kend/data
歡迎訪問 Kaia JavaScript 控制檯！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir：/var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

您可以在 [API 文檔](../../../references/json-rpc/klay/account-created)中查看可用命令。

用於檢查 EN 狀態的實用 API：

- kaia.blockNumber\`（獲取最新的區塊編號）
- net.peerCount"（獲取當前連接的 Kaia 節點數量）

#### kaia.blockNumber<a id="kaia-blocknumber"></a>

您可以獲取最新的區塊編號，查看區塊是否正常傳播。

```text
> kaia.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
14
```

上述命令行返回 EN 所連接的節點數。

