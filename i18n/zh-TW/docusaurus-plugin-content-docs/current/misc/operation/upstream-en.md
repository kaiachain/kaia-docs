# 配置上游存檔節點上游 EN

上游 EN（端點節點）功能允許全節點操作員利用歸檔節點作為 RPC 備份。 有關完整節點和歸檔節點的更多信息，請參閱 [Block Synchronization](../../learn/storage/block-sync.md) 頁面。

當一個完整節點即將返回 "缺少三節點 "錯誤時，它會嘗試調用指定的上游 RPC URL 並返回該結果。 如果將歸檔節點配置為上游節點，則全節點基本上可以提供歸檔級服務，而歸檔節點的負載最小。

## 使用方法

使用上游 EN 功能，您可以運行經濟高效的歸檔 RPC 服務。 運行一個存檔節點，運行多個完整節點。 使全節點回落到歸檔節點。 這樣，大多數請求由全節點處理，而一些需要歷史狀態的請求則由歸檔節點處理。

<p align="center"><img src="/img/learn/upstream_en.png" width="50%"/></p>

## 如何啟用上游 EN

要使用上游 EN 功能，只需向完整節點傳遞 `--upstream-en<RPC_URL>` 標誌即可。 例如，在您的 `kend.conf` 文件中、

```sh
ADDITIONAL="$ADDITIONAL --upstream-en https://archive-en.node.kaia.io"
```
