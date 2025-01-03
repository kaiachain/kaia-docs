# 日志操作

## 配置日志轮换

您可以通过设置 `--log.rotate`标志启用日志轮换，并通过以下标志配置日志轮换设置。

- \--log.rotate"：通过设置该标志，可启用日志轮换并应用其他日志轮换选项
- \--log.maxsize\`：以 MB 为单位指定触发备份文件创建的文件大小
- `--log.maxbackups`：确定可存储备份文件的最大数量。 一旦达到此限制，旧日志将被删除。
- `--log.maxage`：代表保留日志文件的最长天数。 例如，如果设置为 30，备份文件将在 30 天后删除。
- log.compress\`：设置此标记后，备份日志将被压缩为 gz 格式。

示例

```
./bin/ken ... --log.rotate --log.maxsize 100 --log.maxbackups 10 --log.maxage 30 --log.compress
```

您还可以通过在配置文件（如 `kend.conf`）中设置以下选项来启用和配置日志轮换。

```
# log rotation related options
LOG_ROTATE=1 # setting 1 to enable the log rotation related options
LOG_MAXSIZE=100 # the unit is MB
LOG_MAXBACKUPS=10
LOG_MAXAGE=30 # maximum number of days to retain a log file
LOG_COMPRESS=1 # setting 1 to compress the backup logs in gz format
```

建议下载并使用版本为 v1.0.0 或更高的软件包。 您可以在发布说明的二进制文件部分下载（例如 [v1.11.0 发布说明](https://github.com/klaytn/klaytn/releases/tag/v1.11.0)）。 确保接下来的三个文件是 v1.0.0 或更高版本：配置文件、守护进程和二进制文件。 否则，它将不起作用。

## 正常日志状态

| 类型                                                          | 留言                                                                                                                                                                                                                                                                                         | 说明                                                                                    |   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | - |
| Error                                                       | FastWebsocketHandler fail to upgrade message                                                                                                                                                                                                                                               | WebSocket 连接的版本问题                                                                     | 低 |
| Error                                                       | invalid index of the proposer                                                                                                                                                                                                                                                              | EN 从 CN 接收交易时发生的错误                                                                    | 低 |
| WARN                                                        | ProtocolManager failed to read msg                                                                                                                                                                                                                                                         |                                                                                       | 低 |
| WARN                                                        | Failed doConnTypeHandshake                                                                                                                                                                                                                                                                 |                                                                                       | 低 |
| ERRORErro                                                   | Protocol istanbul/64 failed                                                                                                                                                                                                                                                                | 对等断开                                                                                  | 低 |
| Error                                                       | Fasthttp Err                                                                                                                                                                                                                                                                               | 提供连接时出错：读取超时，没有读取任何内容                                                                 | 低 |
| Error                                                       | Fasthttp Err                                                                                                                                                                                                                                                                               | 服务连接时出错：读取请求标头时出错：无法在 "\x16…中找到 http 请求方法                                             | 低 |
| Warn                                                        | hash=b1b26c…6b220a err="insufficient balance for transfer"                                                                                                                                                                                                                                 | 由于 "from 账户 "余额不足，无法执行所处理的交易（通常是采矿交易）时，会出现此日志（理论上，在创建交易并进入 txpool 时余额充足，但实际执行时却没有余额）。 | 低 |
| ERROR                                                       | ERROR\[06/06,23:23:46 Z] \[7] decode anchor payload err="rlp: expected input list for types.AnchoringDataLegacy" | 锚定 tx 的数据字段可包含任何类型的值。 但是，当输入的值类型不正确时，节点会输出错误日志                                        |   |
| Proposer : `Successfully wrote mined block` |                                                                                                                                                                                                                                                                                            |                                                                                       |   |

非提案国\`插入一个新区块

## 日志级别更改 (0\~5)

前往 Kaia 控制台

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
