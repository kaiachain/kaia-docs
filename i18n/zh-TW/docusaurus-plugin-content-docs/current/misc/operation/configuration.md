# 配置

本文檔介紹節點的可配置屬性。 Kaia 節點軟件包帶有良好的默認設置，只需很少的配置。 如果更改了運行中節點的任何設置，則必須重新啟動節點以反映更改。

## CN 配置文件位置<a id="cn-configuration-file-location"></a>

- 用於配置共識節點的 \`kcnd.conf

配置文件位於 `conf` 目錄中，其默認位置取決於安裝的是壓縮包還是軟件包。

- 對於存檔發行版，配置目錄位置默認為 `$INSTALL_PATH/kcn-linux-amd64/conf/`。
- 對於軟件包發行版，配置目錄默認為 `/etc/kcnd/conf/`。

## PN 配置文件位置<a id="pn-configuration-file-location"></a>

- 用於配置代理節點的 \`kpnd.conf

配置文件位於 `conf` 目錄中，其默認位置取決於安裝的是壓縮包還是軟件包。

- 對於存檔發行版，配置目錄位置默認為 `$INSTALL_PATH/kpn-linux-amd64/conf/`。
- 對於軟件包發行版，配置目錄默認為 `/etc/kpnd/conf/`。

## EN 配置文件位置<a id="configuration-file-location"></a>

- 用於配置端點節點的 \`kend.conf

配置文件位於 `conf` 目錄中，其默認位置取決於安裝的是壓縮包還是軟件包。

- 對於存檔發行版，配置目錄位置默認為 `$INSTALL_PATH/ken-linux-amd64/conf/`。
- 對於軟件包發行版，配置目錄默認為 `/etc/kend/conf/`。

## 配置文件格式 <a id="configuration-file-format"></a>

CN 和 PN 具有相同的配置文件格式和屬性。

下面是參與主網並將區塊鏈數據存儲在默認位置的 CN 的配置文件示例，在存檔發行版中，默認位置是 `~/kcnd_home`，在軟件包發行版中，默認位置是 `/var/kcnd/data`。

```text
# Configuration file for the kcnd

# mainnet, kairos is only available if you don't specify NETWORK_ID.
NETWORK="mainnet"
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
PORT=32323
SERVER_TYPE="fasthttp"
SYNCMODE="full"
VERBOSITY=3
MAXCONNECTIONS=100
# LDBCACHESIZE=10240
REWARDBASE="0x0"

...

DATA_DIR=
LOG_DIR=$DATA_DIR/logs
```

建議 CN 使用的 txpool 大小如下。

```text
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384
```

建議 PN 使用的 txpool 大小如下。

```text
TXPOOL_EXEC_SLOTS_ALL=8192
TXPOOL_NONEXEC_SLOTS_ALL=8192
TXPOOL_EXEC_SLOTS_ACCOUNT=8192
TXPOOL_NONEXEC_SLOTS_ACCOUNT=8192
```

建議 EN 使用的 txpool 大小如下。

```text
TXPOOL_EXEC_SLOTS_ALL=4096
TXPOOL_NONEXEC_SLOTS_ALL=4096
TXPOOL_EXEC_SLOTS_ACCOUNT=4096
TXPOOL_NONEXEC_SLOTS_ACCOUNT=4096
```

## 屬性<a id="properties"></a>

配置文件具有以下可配置屬性。 除了 `REWARDBASE.` 以外，CN 和 PN 配置文件具有相同的屬性。

| 名稱                                                                                          | 說明                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NETWORK                                                                                     | 此節點將加入的網絡名稱。  如果未定義 NETWORK_ID，則使用該值。  ("主網"、"Kairos")                                                                            |
| NETWORK_ID                                                             | Kaia 網絡 ID。  如果創建的是本地專用網絡，則要定義自己的網絡 ID。  以下 ID 保留給預配置網絡。 <br/>8217 : Mainnet<br/>1000 : Aspen 測試網絡<br/>1001 : Kairos 測試網絡 |
| PORT                                                                                        | P2P 端口。 (默認值："32323）                                                                                                                                   |
| SERVER_TYPE                                                            | JSON RPC 服務器類型。  ("http", "fasthttp")                                                                                                                  |
| SYNCMODE                                                                                    | 區塊鏈同步模式。  ("fast", "full")                                                                                                                             |
| VERBOSITY                                                                                   | 日誌記錄的冗長度。  (0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail）                                                                                      |
| MAXCONNECTIONS                                                                              | 物理連接的最大數量。  所有單通道對等設備最多可有 MAXCONNECTIONS 對等設備。  所有多通道對等設備最多可有 MAXCONNECTIONS/2 個對等設備。  如果設置為 0，網絡連接將被禁用。 (默認值：10）                                      |
| LDBCACHESIZE                                                                                | LevelDB 中內存緩存的大小（MB）。 (默認值：768）                                                                                                                        |
| REWARDBASE                                                                                  | 將獲得區塊共識獎勵的賬戶地址。 該屬性僅適用於 CN。                                                                                                                                               |
| TXPOOL_EXEC_SLOTS_ALL        | 所有賬戶可執行交易時段的最大數量。 (默認值：4096）                                                                                                                           |
| TXPOOL_NONEXEC_SLOTS_ALL     | 所有賬戶不可執行交易時段的最大數量。 (默認值：1024）                                                                                                                          |
| TXPOOL_EXEC_SLOTS_ACCOUNT    | 每個賬戶可保證執行的交易時段數。 (默認值：16）                                                                                                                              |
| TXPOOL_NONEXEC_SLOTS_ACCOUNT | 每個賬戶保證的最多不可執行交易時段數。 (默認值：64）                                                                                                                           |
| TXPOOL_LIFE_TIME                                  | 不可執行事務排隊等候的最長時間。 (默認值：5 米）                                                                                                                             |
| RPC_ENABLE                                                             | 如果設置為 1，則啟用 HTTP-RPC 服務器。                                                                                                                                                 |
| RPC_API                                                                | 以逗號分隔的通過 HTTP-RPC 接口提供的 API 列表。  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                         |
| RPC_PORT                                                               | HTTP-RPC 服務器監聽端口。 (默認值："8551"）。                                                                                                                        |
| RPC_ADDR                                                               | HTTP-RPC 服務器監聽接口。 (默認值："localhost）                                                                                                                     |
| RPC_CORSDOMAIN                                                         | 以逗號分隔的接受跨源請求的域列表（瀏覽器強制執行）                                                                                                                                                 |
| RPC_VHOSTS                                                             | 以逗號分隔的虛擬主機名列表，接受來自該虛擬主機名的請求（服務器強制執行）。 接受 '\*' 通配符。 (默認值：{"localhost"}）。                                                                                |
| WS_ENABLE                                                              | 如果設置為 1，則啟用 WS-RPC 服務器。                                                                                                                                                   |
| WS_API                                                                 | 通過 WS-RPC 接口提供的 API。  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                    |
| WS_ADDR                                                                | WS-RPC 服務器監聽接口。                                                                                                                                                           |
| WS_PORT                                                                | WS-RPC 服務器監聽端口。 (默認值："8552）                                                                                                                            |
| WS_ORIGINS                                                             | 接受 websockets 請求的來源。 (默認值："localhost）                                                                                                                  |
| AUTO_RESTART                                                           | 如果設置為 "1"，則在 "autorestart.timeout"（例如 60s、10m 和 1h）未更新當前區塊時重啟進程。                                                                                          |
| METRICS                                                                                     | 如果設置為 1，則啟用指標收集和報告。                                                                                                                                                       |
| PROMETHEUS                                                                                  | 如果設置為 1，則啟用 prometheus 輸出程序。                                                                                                                                              |
| DB_NO_PARALLEL_WRITE         | 如果設置為 1，則禁用向持久性數據庫並行寫入塊數據。                                                                                                                                                |
| MULTICHANNEL                                                                                | 如果設置為 1，則為區塊傳播創建專用通道。                                                                                                                                                     |
| SUBPORT                                                                                     | 如果啟用多通道選項，監聽子端口號。 (默認值："32324"）。                                                                                                                       |
| NO_DISCOVER                                                            | 如果發現選項設置為 1，則將其關閉。                                                                                                                                                        |
| BOOTNODES                                                                                   | 以逗號分隔的引導節點 kni 地址。                                                                                                                                                        |
| ADDITIONAL                                                                                  | 有關其他命令行選項，請參見 例如） --txpool.nolocals                                                                                                                       |
| DATA_DIR                                                               | Kaia 區塊鏈數據文件夾路徑。                                                                                                                                                          |
| LOG_DIR                                                                | 日誌文件夾路徑。                                                                                                                                                                  |
