# 端点节点

## 预期受众<a id="intended-audience"></a>

- 任何人要使用 [Kaia APIs](../../references/json-rpc/klay/account-created) 发送事务或查询 Kaia 网络的状态，都需要通过端点节点来完成。
- 端点节点是 Kaia 网络的接口。

## 端点节点概述<a id="endpoint-node-overview"></a>

端点节点具有以下角色和功能。

- 同步区块链数据。
- 验证新收到的数据块。
- 处理查询请求。
- 向代理节点发送事务请求。

端点节点安装二进制文件包含以下接口和实用程序。

- JSON-RPC API：JSON-RPC 服务器运行于节点内部，并为区块链应用程序开发提供 [API](../../references/json-rpc/klay/account-created) 。 它还有多个节点管理 API。
- 命令行界面：提供账户管理和节点配置功能。 此外，还提供了一个附加到节点上的交互式 JavaScript 控制台。 JavaScript 控制台实现了大部分 [caver-js API](../../references/sdk/caver-js/caver-js.md)。





