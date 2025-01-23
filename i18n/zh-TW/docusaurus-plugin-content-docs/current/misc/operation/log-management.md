# 日誌操作

## 配置日誌輪換

您可以通過設置 `--log.rotate`標誌啟用日誌輪換，並通過以下標誌配置日誌輪換設置。

- \--log.rotate"：通過設置該標誌，可啟用日誌輪換並應用其他日誌輪換選項
- \--log.maxsize\`：以 MB 為單位指定觸發備份文件創建的文件大小
- `--log.maxbackups`：確定可存儲備份文件的最大數量。 一旦達到此限制，舊日誌將被刪除。
- `--log.maxage`：代表保留日誌文件的最長天數。 例如，如果設置為 30，備份文件將在 30 天后刪除。
- log.compress\`：設置此標記後，備份日誌將被壓縮為 gz 格式。

示例

```
./bin/ken ... --log.rotate --log.maxsize 100 --log.maxbackups 10 --log.maxage 30 --log.compress
```

您還可以通過在配置文件（如 `kend.conf`）中設置以下選項來啟用和配置日誌輪換。

```
# log rotation related options
LOG_ROTATE=1 # setting 1 to enable the log rotation related options
LOG_MAXSIZE=100 # the unit is MB
LOG_MAXBACKUPS=10
LOG_MAXAGE=30 # maximum number of days to retain a log file
LOG_COMPRESS=1 # setting 1 to compress the backup logs in gz format
```

建議下載並使用版本為 v1.0.0 或更高的軟件包。 您可以在發佈說明的二進制文件部分下載（例如 [v1.11.0 發佈說明](https://github.com/klaytn/klaytn/releases/tag/v1.11.0)）。 確保接下來的三個文件是 v1.0.0 或更高版本：配置文件、守護進程和二進制文件。 否則，它將不起作用。

## 正常日誌狀態

| 類型                                                          | 留言                                                                                                                                                                                                                                                                                         | 說明                                                                                    |   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | - |
| Error                                                       | FastWebsocketHandler fail to upgrade message                                                                                                                                                                                                                                               | WebSocket 連接的版本問題                                                                     | 低 |
| Error                                                       | invalid index of the proposer                                                                                                                                                                                                                                                              | EN 從 CN 接收交易時發生的錯誤                                                                    | 低 |
| WARN                                                        | ProtocolManager failed to read msg                                                                                                                                                                                                                                                         |                                                                                       | 低 |
| WARN                                                        | Failed doConnTypeHandshake                                                                                                                                                                                                                                                                 |                                                                                       | 低 |
| ERRORErro                                                   | Protocol istanbul/64 failed                                                                                                                                                                                                                                                                | 對等斷開                                                                                  | 低 |
| Error                                                       | Fasthttp Err                                                                                                                                                                                                                                                                               | 提供連接時出錯：讀取超時，沒有讀取任何內容                                                                 | 低 |
| Error                                                       | Fasthttp Err                                                                                                                                                                                                                                                                               | 服務連接時出錯：讀取請求標頭時出錯：無法在 "\x16…中找到 http 請求方法                                             | 低 |
| Warn                                                        | hash=b1b26c…6b220a err="insufficient balance for transfer"                                                                                                                                                                                                                                 | 由於 "from 賬戶 "餘額不足，無法執行所處理的交易（通常是採礦交易）時，會出現此日誌（理論上，在創建交易並進入 txpool 時餘額充足，但實際執行時卻沒有餘額）。 | 低 |
| ERROR                                                       | ERROR\[06/06,23:23:46 Z] \[7] decode anchor payload err="rlp: expected input list for types.AnchoringDataLegacy" | 錨定 tx 的數據字段可包含任何類型的值。 但是，當輸入的值類型不正確時，節點會輸出錯誤日誌                                        |   |
| Proposer : `Successfully wrote mined block` |                                                                                                                                                                                                                                                                                            |                                                                                       |   |

非提案國\`插入一個新區塊

## 日誌級別更改 (0\~5)

前往 Kaia 控制檯

```
#default Value
> debug.verbosity(3)
# hight detail logs Value
> debug.verbosity(5)
# No Logs Value
> debug.verbosity(0)

# Default Value for Blockchain log
> debug.vmodule("blockchain=3")
# High detail Value for Blockchain Log
> debug.vmodule("blockchain=5")

```
