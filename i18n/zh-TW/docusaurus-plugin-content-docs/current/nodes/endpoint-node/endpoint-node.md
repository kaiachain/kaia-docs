# 端點節點

## 預期受眾<a id="intended-audience"></a>

- 任何人要使用 [Kaia APIs](../../references/json-rpc/klay/account-created) 發送事務或查詢 Kaia 網絡的狀態，都需要通過端點節點來完成。
- 端點節點是 Kaia 網絡的接口。

## 端點節點概述<a id="endpoint-node-overview"></a>

端點節點具有以下角色和功能。

- 同步區塊鏈數據。
- 驗證新收到的數據塊。
- 處理查詢請求。
- 向代理節點發送事務請求。

端點節點安裝二進制文件包含以下接口和實用程序。

- JSON-RPC API：JSON-RPC 服務器運行於節點內部，併為區塊鏈應用程序開發提供 [API](../../references/json-rpc/klay/account-created) 。 它還有多個節點管理 API。
- 命令行界面：提供賬戶管理和節點配置功能。 此外，還提供了一個附加到節點上的交互式 JavaScript 控制檯。 JavaScript 控制檯實現了大部分 [caver-js API](../../references/sdk/caver-js/caver-js.md)。





