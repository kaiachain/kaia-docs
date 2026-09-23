# 安裝代理節點

## 下載

您可以在 [Download](../../downloads/downloads.md) 頁面下載最新版本的 `kpn`。

## 安裝<a id="installation"></a>

### Linux 檔案分發版<a id="linux-archive-distribution"></a>

存檔文件由可執行二進制文件和配置文件組成，結構如下。

**注意**：請勿更改文件結構或文件名。如果更改，節點可能無法正常運行。

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| 文件名稱                           | 文件說明         |
| :----------------------------- | :----------- |
| bin/kpn                        | PN 可執行文件     |
| bin/kpnd                       | PN 啟動/終止腳本文件 |
| conf/kpnd.conf | PN 配置文件      |

安裝是將下載的軟件包解壓縮，然後安裝到您想要安裝的位置。

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

或者

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**注意**：建議在環境變量 `$PATH` 中添加解壓縮目錄 `kpn-linux-amd64/bin` 路徑，以便全局運行 `kpn` 和 `kpnd`。舉個例子

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

其他部分假定路徑已添加到變量中。

### RPM 發行版\(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

您可以使用以下 `yum` 命令安裝下載的 RPM 文件。

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

或者

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### 從 Kaia Yum Repo 安裝<a id="install-from-kaia-yum-repo"></a>

或者，也可以從 Kaia Yum 軟件倉庫安裝 `kpnd`，運行

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kpnd
```

或

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/9-stream/kaia.repo && sudo yum install kpnd
```

### 安裝位置<a id="installed-location"></a>

安裝文件的位置如下

| 文件名稱                      | 地點                                       |
| :------------------------ | :--------------------------------------- |
| kpn                       | /usr/bin/kpn                             |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |

## 配置<a id="configuration"></a>

PN 配置是在配置文件 `kpnd.conf` 中創建一個數據目錄並設置幾個值。

1. 創建 PN 數據目錄
2. 安裝節點密鑰
3. 安裝 \`static-node.json
4. 使用 `kpnd.conf` 配置 PN。

### 創建 PN 數據目錄<a id="pn-data-directory-creation"></a>

考慮到 Kaia 區塊鏈數據的大小一直在增加，建議使用足夠大的存儲空間。您可能需要在所需路徑上創建該目錄。

```bash
$ mkdir -p /var/kpnd/data
```

### 安裝節點密鑰<a id="install-node-key"></a>

要操作 PN，需要一個 "節點密鑰"。如果您沒有 KPN 二進制文件，KPN 將為您創建一個新文件。如果您有，則需要將您的 `nodekey` 放入 PN 數據目錄。創建 "節點密鑰 "的方法在"[安裝前](./before-you-install.md) "部分。以下命令行會將 `nodekey` 複製到 PN 數據目錄。

```bash
$ cp nodekey /var/kpnd/data
```

### 安裝 \`static-nodes.json<a id="install-static-nodes-json"></a>

應通過 PN 操作符創建 `static-nodes.json` 文件。它包含 PN 所連接的地址。建議添加地址，包括您的 CN 和另一個核心單元的 PN。如需瞭解更多詳情，請聯繫 Kaia 官方郵箱（"bootstrap@klaytn.com "為主網郵箱或 "baobab@klaytn.com "為 Kairos\ 郵箱）。

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

PN 的節點 URI 位於"[安裝前](./before-you-install.md) "部分。 \注意：此 IP 地址不同於 CN 公共 IP。 以下命令行會將 `static-nodes.json` 文件複製到 PN 數據目錄。

```bash
$ cp static-nodes.json /var/kpnd/data
```

### 更新配置文件<a id="update-the-configuration-file"></a>

配置文件位置：

- 對於存檔發行版，配置目錄位置默認為 `$INSTALL_PATH/kpn-linux-amd64/conf/`。
- 對於軟件包發行版，配置目錄默認為 `/etc/kpnd/conf/`。

#### 添加數據目錄 <a id="add-data-directory"></a>

您應該更新設定檔 `kpnd.conf` 上的資料目錄環境變數 `$DATA_DIR`。

```text
...
DATA_DIR=/var/kpnd/data
...
```

### (可選）下載 Chaindata 快照

從 genesis 區塊進行同步處理非常耗時。您可以使用 [Chaindata Snapshot](../../../misc/operation/chaindata-snapshot.md) 跳過 [Full Sync](../../../learn/storage/block-sync.md#full-sync) 過程。

## 啟動 PN<a id="startup-the-pn"></a>

### PN 啟動/停止 <a id="pn-start-stop"></a>

您可以使用以下 "systemctl "命令啟動/停止 Kaia 服務。

**注意**：這需要 root 權限。

**開始**

```bash
$ systemctl start kpnd.service

```

**停止**

```bash
$ systemctl stop kpnd.service

```

**狀態**

```bash
$ systemctl status kpnd.service

```

### 故障排除<a id="troubleshooting"></a>

如果您遇到以下錯誤

```bash
Failed to start kpnd.service: Unit not found.
```

使用以下命令重新加載 systemd 管理器配置。

```bash
$ systemctl daemon-reload
```

## 測試核心單元<a id="testing-the-core-cell"></a>

現在要檢查的是 Core Cell 是否已成功安裝，以及安裝後是否按預期運行。

### 進程狀態<a id="process-status"></a>

可以使用狀態命令 `systemctl` 和 `kpnd` 檢查 PN 進程的狀態。

#### systemctl <a id="systemctl"></a>

`systemctl` 與 RPM 一起安裝，可通過以下方式檢查 PN 的狀態。

```bash
$ systemctl status kpnd.service
● kpnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kpnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process：29636 ExecStart=/etc/rc.d/init.d/kpnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kpn)
   CGroup：/system.slice/kpnd.service
           └─29641 /usr/local/bin/kpn --networkid 1000 --datadir /kpnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]：啟動（空）...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kpnd[29636]：Starting kpnd：[ OK ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]：Started (null).
```

您可以查看當前狀態，例如上例中的 "Active: active (running)"。

#### kpnd <a id="kcnd-kpnd"></a>

kpnd "與軟件包一起安裝，可通過以下方式檢查 PN 的狀態。

```bash
$ kpnd status
kpnd is running
```

### 日誌<a id="logs"></a>

日誌存儲在 `kpnd.out` 文件中，該文件位於 `kpnd.conf` 文件中 `LOG_DIR` 字段定義的路徑下。當節點正常運行時，可以看到每秒創建的每個區塊如下所示。

例如

```bash
$ tail kpnd.out
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

### kpn 控制檯<a id="kcn-console-kpn-console"></a>

Kaia 提供一個 CLI 客戶端：`kpn console`。不過，出於安全考慮，PN 可能會禁用客戶端的 RPC 接口。使用客戶端的另一種方法是通過 IPC（進程間通信）連接進程。

IPC 文件 `klay.ipc` 位於 PN 上的 `DATA_DIR` 路徑中。

請執行以下命令並查看結果。

```bash
 $ kpn attach --datadir /var/kpnd/data
 歡迎訪問 Kaia JavaScript 控制檯！

 instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 coinbase：0x67f68fdd9740fd7a1ac366294f05a3fd8df0ed40
 at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
  datadir：/var/kpnd/data
  modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

您可以在 [API 文檔](../../../references/json-rpc/klay/account-created)中查看可用命令。

用於檢查 PN 狀態的實用 API：

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