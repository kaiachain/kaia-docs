# 安裝共識節點

## 下載

您可以在 [Download](../../downloads/downloads.md) 頁面下載最新版本的 `kcn`。

## 安裝

### Linux 檔案分發版<a id="linux-archive-distribution"></a>

存檔文件由可執行二進制文件和配置文件組成，結構如下。

**注意**：請勿更改文件結構或文件名。如果更改，節點可能無法正常運行。

```text
- bin
  |- kcn
  |- kcnd
- conf
  |- kcnd.conf
```

| 文件名稱                           | 文件說明         |
| :----------------------------- | :----------- |
| bin/kcn                        | CN 可執行文件     |
| bin/kcnd                       | CN 啟動/終止腳本文件 |
| conf/kcnd.conf | CN 配置文件      |

安裝是將下載的軟件包解壓縮，然後安裝到您想要安裝的位置。

```bash
$ tar zxf kcn-vX.X.X-linux-amd64.tar.gz
```

或者

```bash
$ tar zxf kcn-baobab-vX.X.X-linux-amd64.tar.gz
```

**注意**：建議在環境變量 "$PATH"中添加解壓縮目錄 "kcn-linux-amd64/bin "路徑，以便全局運行 "kcn "和 "kcnd"。舉個例子

```bash
$ export PATH=$PATH:~/downloaded/path/kcn-linux-amd64/bin
```

其他部分假定路徑已添加到變量中。

### RPM 發行版\(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

您可以使用以下 `yum` 命令安裝下載的 RPM 文件。

```bash
$ yum install kcnd-vX.X.X.el7.x86_64.rpm
```

或者

```bash
$ yum install kcnd-baobab-vX.X.X.el7.x86_64.rpm
```

### 從 Kaia Yum Repo 安裝<a id="install-from-kaia-yum-repo"></a>

或者，您也可以從 Kaia Yum 軟件倉庫安裝 `kcnd`，然後運行

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kcnd
```

或

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/9-stream/kaia.repo && sudo yum install kcnd
```

### 安裝位置<a id="installed-location"></a>

安裝文件的位置如下

| 文件名稱                      | 地點                                       |
| :------------------------ | :--------------------------------------- |
| kcn                       | /usr/bin/kcn                             |
| kcnd.conf | /etc/kcnd/conf/kcnd.conf |

## 配置<a id="configuration"></a>

CN 配置是在配置文件 `kcnd.conf` 中創建一個數據目錄並設置幾個值。

1. 創建 CN 數據目錄。
2. 安裝節點密鑰
3. 使用 `kcnd.conf` 配置 CN。

### 創建 CN 數據目錄<a id="cn-data-directory-creation"></a>

考慮到 Kaia 區塊鏈數據的大小一直在增加，建議使用足夠大的存儲空間。您可能需要在所需路徑上創建該目錄。

```bash
$ mkdir -p /var/kcnd/data
```

### 安裝節點密鑰<a id="install-node-key"></a>

要運行一個 CN，需要一個 "節點密鑰"。如果您沒有 KCN 二進制文件，KCN 將為您創建一個新文件。如果有，則需要將 `nodekey` 放入 CN 數據目錄。安裝前](./before-you-install.md) "部分介紹了創建 "節點密鑰 "的方法。以下命令行會將 `nodekey` 複製到 CN 數據目錄。

```bash
$ cp nodekey /var/kcnd/data
```

### 更新配置文件<a id="update-the-configuration-file"></a>

配置文件位置：

- 對於存檔發行版，配置目錄位置默認為 `$INSTALL_PATH/kcn-linux-amd64/conf/`。
- 對於軟件包發行版，配置目錄默認為 `/etc/kcnd/conf/`。

#### 添加數據目錄 <a id="add-data-directory"></a>

您應該更新設定檔 `kcnd.conf` 上的資料目錄環境變數 `$DATA_DIR`。

```text
...
DATA_DIR=/var/kcnd/data
...
```

#### 設置 Rewardbase<a id="setup-rewardbase"></a>

作為參與 Kaia 網絡共識的回報，CN 運營商將獲得 KAIA。因此，需要在配置文件 `kcnd.conf` 中設置地址。

創建新賬戶的方法多種多樣，但 "kcn "也提供了相關功能。您可以使用以下命令查看幫助信息。

```bash
$ kcn account new --help
```

該程序的一個示例如下。首先，您需要創建一個新賬戶，獎勵 KAIA 將發送到該賬戶。

```bash
$ kcn account new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KAIA=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {d13f7da0032b1204f77029dc1ecbf4dae2f04241}
```

因此，它會在你定義的路徑上創建相關的密鑰存儲。接下來，您需要將創建的地址放入文件 `kcnd.conf` 中，如下所示。

```text
...
REWARDBASE="d13f7da0032b1204f77029dc1ecbf4dae2f04241"
...
```

請記住，您創建的密鑰存儲和密碼非常重要，因此必須小心管理。有關 `kcnd.conf` 的更多詳情，請參閱[配置文件](../../../misc/operation/configuration.md) 部分。

### (可選）下載 Chaindata 快照

從 genesis 區塊進行同步處理非常耗時。您可以使用 [Chaindata Snapshot](../../../misc/operation/chaindata-snapshot.md) 跳過 [Full Sync](../../../learn/storage/block-sync.md#full-sync) 過程。

## 啟動 CN<a id="startup-the-cn"></a>

### CN 啟動/停止 <a id="cn-start-stop"></a>

您可以使用以下 "systemctl "命令啟動/停止 Kaia 服務。

**注意**：這需要 root 權限。

**開始**

```bash
$ systemctl start kcnd.service

```

**停止**

```bash
$ systemctl stop kcnd.service

```

**狀態**

```bash
$ systemctl status kcnd.service

```

### 故障排除<a id="troubleshooting"></a>

如果您遇到以下錯誤

```bash
Failed to start kcnd.service: Unit not found.
```

使用以下命令重新加載 systemd 管理器配置。

```bash
$ systemctl daemon-reload
```

### 導出 BLS 公鑰信息<a id="export-bls-public-key-info"></a>

如果網絡已經或將要激活 Randao 硬分叉，則每個 CN 維護者必須向 [KIP-113 智能合約](https://kips.kaia.io/KIPs/kip-113) 提交其 BLS 公鑰信息。

BLS 公鑰信息可通過節點密鑰計算得出。要提取它，首先要啟動節點。然後使用命令

```
$ kcn account bls-info --datadir /var/kcnd/data
```

因此，將創建 `bls-publicinfo-NODEID.json` 文件。

## 測試核心單元<a id="testing-the-core-cell"></a>

現在要檢查的是 Core Cell 是否已成功安裝，以及安裝後是否按預期運行。

### 進程狀態<a id="process-status"></a>

可以使用狀態命令 `systemctl` 和 `kcnd` 檢查 CN 進程的狀態。

#### systemctl <a id="systemctl"></a>

systemctl "與 RPM 一起安裝，可通過以下方式檢查 CN 的狀態。

```bash
$ systemctl status kcnd.service
● kcnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kcnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kcnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kcn)
   CGroup: /system.slice/kcnd.service
           └─29641 /usr/local/bin/kcn --networkid 1000 --datadir /kcnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kcnd[29636]: Starting kcnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

您可以查看當前狀態，例如上例中的 "Active: active (running)"。

#### kcnd <a id="kcnd-kpnd"></a>

kcnd "與軟件包一起安裝，CN 的狀態可通過以下方式檢查。

```bash
$ kcnd status
kcnd is running
```

### 日誌<a id="logs"></a>

日誌存儲在 `kcnd.out` 文件中，該文件位於 `kcnd.conf` 文件中 `LOG_DIR` 字段定義的路徑下。當節點正常運行時，可以看到每秒創建的每個區塊如下所示。

例如

```bash
$ tail kcnd.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work                    number=11572927 txs=0 elapsed=483.436µs
```

### 控制檯<a id="kcn-console-kpn-console"></a>

Kaia 提供一個 CLI 客戶端："kcn console"。不過，出於安全考慮，CN 可能會禁用客戶端的 RPC 接口。使用客戶端的另一種方法是通過 IPC（進程間通信）連接進程。

IPC 文件 `klay.ipc` 位於 CN 上的 `DATA_DIR` 路徑中。

請執行以下命令並查看結果。

```bash
$ ken attach --datadir /var/kend/data
歡迎訪問 Kaia JavaScript 控制檯！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir：/var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

您可以在 [API 文檔](../../../../references/json-rpc/klay/account-created)中查看可用命令。

用於檢查 CN 狀態的實用 API：

- kaia.blockNumber\`（獲取最新的區塊編號）
- net.peerCount"（獲取當前連接的 Kaia 節點數量）

#### kaia.blockNumber <a id="kaia-blocknumber"></a>

您可以根據節點類型獲取最新的區塊編號，查看區塊是否已正確創建（對於 CN）或傳播（對於 CN 和 PN）。

```javascript
> kaia.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```javascript
> net.peerCount
14
```

上述命令行會根據節點類型返回不同的值。

- CN：連接的 CN 個數 + 連接的 PN 個數。
- PN：連接的 CN 數 + 連接的 PN 數 + 連接的 EN 數。