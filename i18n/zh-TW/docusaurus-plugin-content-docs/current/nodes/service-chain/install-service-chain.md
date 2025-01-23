# 安裝服務鏈

## 預期受眾<a id="intended-audience"></a>

- 希望為 Metaverse、GameFi 和 NFT 構建區塊鏈的公司
- 需要高 TPS、最低交易費用和數據隱私的 dApp 開發人員。
- 任何想建立本地專用網絡或分類賬數據庫進行測試的人。

## 服務鏈概述<a id="service-chain-overview"></a>

ServiceChain 是企業級區塊鏈，可滿足企業對價值轉移、安全性、高性能和定製化等方面的要求。 Kaia ServiceChain 提供以下功能：

- 即時終局
- Kaia 鏈之間的令牌轉移
- 數據錨定到主鏈，以確保數據完整性
- 滿足企業級安全要求的多重簽名橋接合同

![](/img/nodes/sc-overview.png)

請閱讀 [Kaia 擴展解決方案](../../learn/scaling-solutions.md) 瞭解有關 ServiceChain 的更多詳情。 以下視頻將幫助您瞭解 Kaia ServiceChain。

- [通過 Kaia 服務鏈實現橫向擴展 | TXGX 2019](https://www.youtube.com/watch?v=8yQc5FQysJc)
- [Kaia 服務鏈的高可用性架構 | TXGX 2019](https://www.youtube.com/watch?v=HcdhWtXPuR0)

## 下載<a id="download"></a>

您可以在[下載頁面](../downloads/downloads.md)中獲取 SCN、SPN 和 SEN 的軟件包。

## 安裝<a id="installation-guide"></a>

本章介紹 \*\* 服務鏈共識節點（SCN\ ）\*\* 的安裝。

### Linux 檔案分發版<a id="linux-archive-distribution"></a>

服務鏈共識節點的歸檔文件具有以下目錄佈局。

| 文件名稱                            | 文件說明          |
| :------------------------------ | :------------ |
| bin/kscn                        | SCN 可執行文件     |
| bin/kscnd                       | SCN 啟動/終止腳本文件 |
| conf/kscnd.conf | SCN 配置文件      |

homi 二進制文件的歸檔文件目錄佈局如下。

| 文件名稱     | 文件說明       |
| :------- | :--------- |
| bin/homi | HOMI 可執行文件 |

安裝就是解壓縮下載的軟件包。

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

### RPM 發行版（RHEL/CentOS/Fedora\）<a id="rpm-rhel-centos-fedora"></a>

您可以使用以下 `yum` 命令安裝下載的 RPM 文件。

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### 安裝位置<a id="scn-configuration"></a>

Kaia Linux 軟件包由可執行二進制文件和配置文件組成，結構如下。

| 文件名稱                       | 地點                                         |
| :------------------------- | :----------------------------------------- |
| kscn                       | /usr/bin/kscn                              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi                       | /usr/bin/homi                              |

## 配置<a id="configuration"></a>

本頁介紹如何配置 SCN 以形成共識網絡。

如果您安裝了存檔發行版，您可以在解壓存檔的目錄中找到二進制文件和配置文件。 下面是執行命令的示例。

```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

在本教程中，我們不會總是指定命令的完整路徑。

### 創建創世紀文件<a id="creation-of-a-genesis-file"></a>

首先，你應該為自己的服務鏈創建一個 genesis 文件和一個 nodekey 文件。 您可以像下面這樣使用 homi 創建它們。

```bash
$ homi setup --gen-type local --cn-num 1 --servicechain -o ./homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```

以下是 genesis 文件和 nodekey 文件的示例。

```bash
$ cat homi-output/scripts/genesis.json
{
    "config": {
        "chainId": 1000,
        "istanbul": {
            "epoch": 3600,
            "policy": 0,
            "sub": 22
        },
        "unitPrice": 0,
        "deriveShaImpl": 2,
        "governance": null
    },
    "timestamp": "0x5dca0732",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad594f8690562c0839c44b17af421f7aaaa9f12dcc62bb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "f8690562c0839c44b17af421f7aaaa9f12dcc62b": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}   
```

```bash
$ cat homi-output/keys/nodekey1                                                                                                                                 
0c28c77ce5c2ca9e495b860f190ed7dfe7bd5c1a2e5f816587eb4d3d9566df44
```

請更改 genesis 文件中的 chainID。 使用自己的號碼，防止重放攻擊。
(請勿在 Kaia Mainnet (8217) 和 Kairos (1001) 中使用相同的鏈 ID）

如果需要，可以通過編輯 genesis 文件中的 `"alloc"`，更改預先資助的地址。
(您可以在 [Genesis JSON](../service-chain/configure/genesis.md) 中找到更多細節）。

### 創建 SCN 數據目錄<a id="scn-data-directory-creation"></a>

考慮到 Kaia 區塊鏈數據的大小不斷增加，建議使用足夠大的存儲空間。
您可以在所需路徑上創建數據目錄。
在本文檔中，我們創建 `~/kscnd_home` 作為數據目錄。

```bash
$ mkdir -p ~/kscnd_home
```

#### 創世區塊的初始化<a id="initialization-of-a-genesis-block"></a>

之後，就可以用創世文件初始化數據目錄了。
在啟動服務鏈節點之前，有必要使用 `kscn` 和 `genesis.json` 初始化服務鏈網絡的創世塊。

```bash
$ kscn init --datadir ~/kscnd_home homi-output/scripts/genesis.json
  WARN[11/12,10:13:58 +09] [19] Some input value of genesis.json have been set to default or changed
  INFO[11/12,10:13:58 +09] [18] Setting connection type                   nodetype=cn conntype=0
    ...
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [5] Writing custom genesis block
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [47] Persisted trie from memory database       updated nodes=1 updated nodes size=80.00B time=304.931µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
  INFO[11/12,10:13:59 +09] [19] Successfully wrote genesis state          database=lightchaindata hash=0xc269669079fc8c06ac37435a563b8ed8ef273c1c835f3d823d2e586315319aa8
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/header
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/body
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/receipts
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/0
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/1
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/2
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/3
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/txlookup
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/misc
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/bridgeservice
```

#### 安裝 nodekey<a id="install_nodekey"></a>

將 `homi-output/keys/nodekey1` 複製到 SCN 數據目錄下的 `kaia` 目錄，如下所示。

```bash
$ cp homi-output/keys/nodekey1  ~/kscnd_home/klay/nodekey
```

### SCN 的配置<a id="configuration-of-the-scn"></a>

kscnd.conf "是 SCN 的配置文件。

假設 SCN 使用默認端口，並將大規模分區掛載到 `~/kscnd_home` 上。
在默認的 `kscnd.conf` 文件中，`SC_SUB_BRIDGE` 選項已禁用，`DATA_DIR` 為空。

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```

您可以啟用 `SC_SUB_BRIDGE` 來使用錨定/值傳輸功能。
此外，還應如下設置 DATA_DIR。

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

如果需要，您還可以進一步修改其他選項，定製您的服務鏈。
否則，現在就可以完成配置，使用默認配置運行服務鏈了。

## 啟動/停止 SCN<a id="starting-stopping-scn"></a>

根據安裝類型，您可以使用以下 `systemctl` 或 `kscnd` 命令啟動/停止 Kaia 服務。

**開始**

```bash
## when installed from rpm distribution 
$ systemctl start kscnd.service

## when installed using linux archive
$ kscnd start

```

**停止**

```bash
## when installed from rpm distribution 
$ systemctl stop kscnd.service

## when installed using linux archive
$ kscnd stop

```

**狀態**

```bash
## when installed from rpm distribution 
$ systemctl status kscnd.service

## when installed using linux archive
$ kscnd status

```

## 檢查節點狀態<a id="checking-node-status"></a>

### 進程狀態<a id="process-status"></a>

可以使用狀態命令 `systemctl` 和 `kscnd` 檢查 SCN 進程的狀態。

#### systemctl <a id="systemctl"></a>

systemctl "與 RPM 一起安裝，可通過以下方式檢查 SCN 的狀態。

```bash
$ systemctl status kscnd.service
● kscnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kscnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kscnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kscn)
   CGroup: /system.slice/kscnd.service
           └─29641 /usr/local/bin/kscn --networkid 1000 --datadir ~/kscnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kscnd[29636]: Starting kscnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

您可以查看當前狀態，如上面例子中的 "Active: active (running)"。

#### kscnd <a id="kscnd"></a>

kscnd "與軟件包一起安裝，可通過以下方式檢查 SCN 的狀態。

```bash
$ kscnd status
kscnd is running
```

### 日誌<a id="logs"></a>

日誌存儲在位於 `kscnd.conf` 文件中 `LOG_DIR` 字段定義的路徑下的 `kscnd.out` 文件中。 當節點正常工作時，可以看到每個區塊每秒的導入情況如下。

例如

```bash
$ tail -F ~/kscnd_home/logs/kscnd.out
  INFO[11/12,10:19:09 +09] [49] Successfully wrote mined block            num=11 hash=03da06…f194b0 txs=0
  INFO[11/12,10:19:09 +09] [49] Commit new mining work                    number=12 txs=0 elapsed=236.972µs
  INFO[11/12,10:19:10 +09] [24] Committed                                 number=12 hash=470aca…be4fdf address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:10 +09] [49] Successfully sealed new block             number=12 hash=470aca…be4fdf
  INFO[11/12,10:19:10 +09] [49] Successfully wrote mined block            num=12 hash=470aca…be4fdf txs=0
  INFO[11/12,10:19:10 +09] [49] Commit new mining work                    number=13 txs=0 elapsed=198.221µs
  INFO[11/12,10:19:11 +09] [24] Committed                                 number=13 hash=95e4a3…14e50f address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:11 +09] [49] Successfully sealed new block             number=13 hash=95e4a3…14e50f
  INFO[11/12,10:19:11 +09] [49] Successfully wrote mined block            num=13 hash=95e4a3…14e50f txs=0
  INFO[11/12,10:19:11 +09] [49] Commit new mining work                    number=14 txs=0 elapsed=220.004µs
  INFO[11/12,10:19:12 +09] [24] Committed                                 number=14 hash=dcd2bc…b2aec0 address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
```

### 查詢<a id="queries"></a>

#### kscn 控制檯<a id="kscn-console"></a>

Kaia 提供一個 CLI 客戶端："kscn console"。 使用客戶端的另一種方法是通過 IPC（進程間通信）連接進程。 IPC 文件 `klay.ipc` 位於 SCN 上的 `DATA_DIR` 路徑中。

請執行以下命令並查看結果。

```text
$ kscn attach --datadir ~/kscnd_home
歡迎訪問 Kaia JavaScript 控制檯！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

您可以在 [API 文檔](../../../references/json-rpc/klay/account-created)中查看可用命令。

用於檢查 SCN 狀態的實用 API：

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
4
```

上述命令行返回 SCN 所連接的節點數，主鏈中的 EN 除外。
