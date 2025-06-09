# 配置

本文档介绍节点的可配置属性。 Kaia 节点软件包带有良好的默认设置，只需很少的配置。 如果更改了运行中节点的任何设置，则必须重新启动节点以反映更改。

## CN 配置文件位置<a id="cn-configuration-file-location"></a>

- 用于配置共识节点的 \`kcnd.conf

配置文件位于 `conf` 目录中，其默认位置取决于安装的是压缩包还是软件包。

- 对于存档发行版，配置目录位置默认为 `$INSTALL_PATH/kcn-linux-amd64/conf/`。
- 对于软件包发行版，配置目录默认为 `/etc/kcnd/conf/`。

## PN 配置文件位置<a id="pn-configuration-file-location"></a>

- 用于配置代理节点的 \`kpnd.conf

配置文件位于 `conf` 目录中，其默认位置取决于安装的是压缩包还是软件包。

- 对于存档发行版，配置目录位置默认为 `$INSTALL_PATH/kpn-linux-amd64/conf/`。
- 对于软件包发行版，配置目录默认为 `/etc/kpnd/conf/`。

## EN 配置文件位置<a id="configuration-file-location"></a>

- 用于配置端点节点的 \`kend.conf

配置文件位于 `conf` 目录中，其默认位置取决于安装的是压缩包还是软件包。

- 对于存档发行版，配置目录位置默认为 `$INSTALL_PATH/ken-linux-amd64/conf/`。
- 对于软件包发行版，配置目录默认为 `/etc/kend/conf/`。

## 配置文件格式 <a id="configuration-file-format"></a>

CN 和 PN 具有相同的配置文件格式和属性。

下面是参与主网并将区块链数据存储在默认位置的 CN 的配置文件示例，在存档发行版中，默认位置是 `~/kcnd_home`，在软件包发行版中，默认位置是 `/var/kcnd/data`。

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

建议 CN 使用的 txpool 大小如下。

```text
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384
```

建议 PN 使用的 txpool 大小如下。

```text
TXPOOL_EXEC_SLOTS_ALL=8192
TXPOOL_NONEXEC_SLOTS_ALL=8192
TXPOOL_EXEC_SLOTS_ACCOUNT=8192
TXPOOL_NONEXEC_SLOTS_ACCOUNT=8192
```

建议 EN 使用的 txpool 大小如下。

```text
TXPOOL_EXEC_SLOTS_ALL=4096
TXPOOL_NONEXEC_SLOTS_ALL=4096
TXPOOL_EXEC_SLOTS_ACCOUNT=4096
TXPOOL_NONEXEC_SLOTS_ACCOUNT=4096
```

## 属性<a id="properties"></a>

配置文件具有以下可配置属性。 除了 `REWARDBASE.` 以外，CN 和 PN 配置文件具有相同的属性。

| 名称                                                                                          | 说明                                                                                                                                   |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| NETWORK                                                                                     | 此节点将加入的网络名称。  如果未定义 NETWORK_ID，则使用该值。  ("主网"、"Kairos")                                       |
| NETWORK_ID                                                             | Kaia 网络 ID。  如果创建的是本地专用网络，则要定义自己的网络 ID。  以下 ID 保留给预配置网络。 <br/>8217 : Mainnet<br/>1001 : Kairos 测试网络  |
| PORT                                                                                        | P2P 端口。 (默认值："32323）                                                                                              |
| SERVER_TYPE                                                            | JSON RPC 服务器类型。  ("http", "fasthttp")                                                                             |
| SYNCMODE                                                                                    | 区块链同步模式。  ("fast", "full")                                                                                        |
| VERBOSITY                                                                                   | 日志记录的冗长度。  (0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail）                                                 |
| MAXCONNECTIONS                                                                              | 物理连接的最大数量。  所有单通道对等设备最多可有 MAXCONNECTIONS 对等设备。  所有多通道对等设备最多可有 MAXCONNECTIONS/2 个对等设备。  如果设置为 0，网络连接将被禁用。 (默认值：10） |
| LDBCACHESIZE                                                                                | LevelDB 中内存缓存的大小（MB）。 (默认值：768）                                                                                   |
| REWARDBASE                                                                                  | 将获得区块共识奖励的账户地址。 该属性仅适用于 CN。                                                                                                          |
| TXPOOL_EXEC_SLOTS_ALL        | 所有账户可执行交易时段的最大数量。 (默认值：4096）                                                                                      |
| TXPOOL_NONEXEC_SLOTS_ALL     | 所有账户不可执行交易时段的最大数量。 (默认值：1024）                                                                                     |
| TXPOOL_EXEC_SLOTS_ACCOUNT    | 每个账户可保证执行的交易时段数。 (默认值：16）                                                                                         |
| TXPOOL_NONEXEC_SLOTS_ACCOUNT | 每个账户保证的最多不可执行交易时段数。 (默认值：64）                                                                                      |
| TXPOOL_LIFE_TIME                                  | 不可执行事务排队等候的最长时间。 (默认值：5 米）                                                                                        |
| RPC_ENABLE                                                             | 如果设置为 1，则启用 HTTP-RPC 服务器。                                                                                                            |
| RPC_API                                                                | 以逗号分隔的通过 HTTP-RPC 接口提供的 API 列表。  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                    |
| RPC_PORT                                                               | HTTP-RPC 服务器监听端口。 (默认值："8551"）。                                                                                   |
| RPC_ADDR                                                               | HTTP-RPC 服务器监听接口。 (默认值："localhost）                                                                                |
| RPC_CORSDOMAIN                                                         | 以逗号分隔的接受跨源请求的域列表（浏览器强制执行）                                                                                                            |
| RPC_VHOSTS                                                             | 以逗号分隔的虚拟主机名列表，接受来自该虚拟主机名的请求（服务器强制执行）。 接受 '\*' 通配符。 (默认值：{"localhost"}）。                                           |
| WS_ENABLE                                                              | 如果设置为 1，则启用 WS-RPC 服务器。                                                                                                              |
| WS_API                                                                 | 通过 WS-RPC 接口提供的 API。  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                               |
| WS_ADDR                                                                | WS-RPC 服务器监听接口。                                                                                                                      |
| WS_PORT                                                                | WS-RPC 服务器监听端口。 (默认值："8552）                                                                                       |
| WS_ORIGINS                                                             | 接受 websockets 请求的来源。 (默认值："localhost）                                                                             |
| AUTO_RESTART                                                           | 如果设置为 "1"，则在 "autorestart.timeout"（例如 60s、10m 和 1h）未更新当前区块时重启进程。                                                     |
| METRICS                                                                                     | 如果设置为 1，则启用指标收集和报告。                                                                                                                  |
| PROMETHEUS                                                                                  | 如果设置为 1，则启用 prometheus 输出程序。                                                                                                         |
| DB_NO_PARALLEL_WRITE         | 如果设置为 1，则禁用向持久性数据库并行写入块数据。                                                                                                           |
| MULTICHANNEL                                                                                | 如果设置为 1，则为区块传播创建专用通道。                                                                                                                |
| SUBPORT                                                                                     | 如果启用多通道选项，监听子端口号。 (默认值："32324"）。                                                                                  |
| NO_DISCOVER                                                            | 如果发现选项设置为 1，则将其关闭。                                                                                                                   |
| BOOTNODES                                                                                   | 以逗号分隔的引导节点 kni 地址。                                                                                                                   |
| ADDITIONAL                                                                                  | 有关其他命令行选项，请参见 例如） --txpool.nolocals                                                                                  |
| DATA_DIR                                                               | Kaia 区块链数据文件夹路径。                                                                                                                     |
| LOG_DIR                                                                | 日志文件夹路径。                                                                                                                             |
