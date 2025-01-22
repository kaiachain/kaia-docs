# 调试跟踪

调试跟踪是一种在虚拟机中执行事务时提取额外信息的功能。 顾名思义，它主要用于调试事务失败或气体支出故障。 由于虚拟机是确定性的，一旦交易得到确认，无论何时跟踪，都会产生相同的跟踪结果。 换句话说，您可以事后调试已确认的交易，使其成为开发 dApp 的有用工具。

有多种方法可以检索调试跟踪

- 按需调用调试命名空间 JSON-RPC API。
- 通过 chaindatafetcher 按需接收到 kafka。
- 当节点同步块时，通过 chaindatafetcher 从节点接收到 kafka。
- 使用区块探索器或索引器服务，这超出了本文档的范围。

## 使用调试 API

最常用的方法是调用 `debug_trace*` JSON-RPC API。

### 示踪剂类型

要使用调试 API 查找痕迹，首先需要确定想要了解哪类信息。 最常见的情况是使用 `callTracer` 来了解合约之间的交互，即内部交易。 还有其他一些跟踪器类型，如 `prestateTracer` 和 `structLogger` 可以让你从多个角度调试同一个事务。 下面列出了一些常用的示踪剂。

**注意**：自 Kaia v1.0.1 起，"callTracer "和 "fastCallTracer "是相同的，因为它们合并为一个本地 (Go) 实现。

**注意**：自 Kaia v1.0.1 起，"callTracer "和 "fastCallTracer "输出已更新，以更正确地反映执行情况。 在以前的版本中，同样的交易可能会产生不同的跟踪结果。 详情请参见 [GitHub PR](https://github.com/kaiachain/kaia/pull/15)。

- 预定义追踪器
  - callTracer "跟踪事务（内部 tx）中的合约调用和合约创建。 返回每个调用帧的具体调用或创建操作码、还原原因和耗气量。 由于速度较慢，我们不鼓励使用它，但从 v1.0.1 版开始，这个问题得到了解决。 开发人员可以放心使用该跟踪器。
  - fastCallTracer "是 "callTracer "的 Golang 实现。 但自 v1.0.1 版起，两者的功能完全相同，因此无需再使用 fastCallTracer。
  - `prestateTracer` 返回构建自定义本地创世状态所需的信息，该事务可以在创世状态上运行。 用于从实时区块链数据中创建测试用例。
  - `revertTracer` 返回还原原因（如果有）。 可以用 `callTracer` 代替，它会返回 `.reverted.reason` 和 `.revertReason` 字段。
  - 请参阅[API 参考](../../../references/json-rpc/debug/trace-transaction)，了解所支持跟踪器的完整列表。
- structLogger 是在未指定任何跟踪器时激活的跟踪器。 每个操作码的执行情况都会详细显示出来，这对于应用程序调试来说非常繁琐，而且通常过于冗长。
- 除非节点使用 `--rpc.unsafe-debug.disable`选项禁止使用，否则也支持自定义 JS 跟踪器。 您可以提交一段 JavaScript 代码，该代码会在事务执行的同时被调用。 Below is an example custom tracer that prints the gasUsed after each opcode `"{gasUsed:[], step: function(log) { this.gasUsed.push(log.getGas()); }, result: function() { return this.gasUsed; }, fault: function() {}}"`. 您可以在 [此处](https://docs.chainstack.com/reference/custom-js-tracing-ethereum) 和 [此处](https://geth.ethereum.org/docs/developers/evm-tracing/custom-tracer) 找到有关自定义 JS 跟踪器的更多信息。

### CallTracer 特例

Kaia 的 `callTracer` 输出格式与 go-ethereum 完全相同，但以下内容除外：

- 对于受尊敬的交易，这两个字段都会提供。
  - result.revertReason\`：还原原因字符串（如果有）。
  - result.revoted.contract\`：已还原合同的地址。
  - result.revted.message：与 revertReason 相同

```js
> debug.traceTransaction("0x49aa6074a3b4970399ef2af12b109c4cb4a65ab8a833d1540e4cefa657a3c0c7", {tracer: "callTracer"})
{
  error: "execution reverted",
  from: "0x7f0546832758f61410e81a94d7a07d55b1dfd278",
  gas: "0xc350",
  gasUsed: "0x6992",
  input: "0x96670644",
  output: "0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000962616420696e7075740000000000000000000000000000000000000000000000",
  revertReason: "bad input",
  reverted: {
    contract: "0xe6c5b1cbf283d9482088136b8cee53fdb6c088eb",
    message: "bad input"
  },
  to: "0xe6c5b1cbf283d9482088136b8cee53fdb6c088eb",
  type: "CALL",
  value: "0x0"
}
```

- 某些不执行虚拟机的交易类型被视为 0 KAIA 向发送方转账。 这些交易类型包括账户更新（AccountUpdate）、取消（Cancel）、链数据管理（ChainDataAnchoring）及其费用委托变体。

```js
> kaia.getTransaction("0xac43859eb4064916e8be8e74645d6019cc48cb6791f68ea21d42ead6bba569b5").type
"TxTypeAccountUpdate"
> debug.traceTransaction("0xac43859eb4064916e8be8e74645d6019cc48cb6791f68ea21d42ead6bba569b5", {tracer: "callTracer"})
{
  from: "0x7f0546832758f61410e81a94d7a07d55b1dfd278",
  gas: "0xcd14",
  gasUsed: "0xa028",
  input: "0x",
  to: "0x7f0546832758f61410e81a94d7a07d55b1dfd278",
  type: "CALL",
  value: "0x0"
}
```

### 批量跟踪

可按不同粒度检索调试跟踪器。

- `debug_traceTransaction` 追踪单个事务的哈希值
- debug_traceBlockByNumber "和 "debug_traceBlockByHash "跟踪区块中的所有事务
- `debug_traceBlobkByRange` 跟踪某一范围内的连续块
- debug_traceCall "可让您在给定代码块的最终状态下运行 "eth_call"。 这对于在发送前模拟事务执行非常有用。

### 国家再生

全模式节点为调试跟踪 API 提供服务时，可能会进行历史状态再生。 假设您要求跟踪一个数据块。 节点必须从父代码块的最终状态开始执行代码块。 但是，全模式节点存储区块状态的频率很低（默认情况下每隔 128 个区块存储一次），因此节点会从最近的保存状态重新检测区块。 在最糟糕的情况下，跟踪一个数据块需要执行 127 个数据块。 因此，全模式节点对调试跟踪 API 的响应可能会很慢。 如果要重新读取大量数据，必须使用存档模式节点。

## 使用 chaindatafetcher

Chaindatafetcher (CDF) 是 Kaia 的一项独特功能，可将块处理结果发布到 Kafka 队列中，以简化下游数据服务的构建。 例如，区块资源管理器可以利用 CDF 来填充其数据库。

**注意**：自 Kaia v1.0.1 版起，跟踪组（内部称为 callTracer）输出已更新，以更正确地反映执行情况。 在以前的版本中，同样的交易可能会产生不同的跟踪结果。 详情请参见 [GitHub PR](https://github.com/kaiachain/kaia/pull/15)。

### 连接到 Kafka

首先准备一个 Kafka 集群。 你可以用下面的 docker compose 配置示例测试 chaindatafetcher，但也可以使用任何 Kafka 安装。

```yaml
# 测试 kafka docker-compose.yml。不用于生产。
services:
  kafka:
    image: bitnami/kafka:3.7
    ports：
      - "9092:9092"
    environment：
      KAFKA_CFG_NODE_ID: 0
      KAFKA_CFG_PROCESS_ROLES: controller,broker
      KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 0@127.0.0.1:9093
      KAFKA_CFG_LISTENERS：plaintext://:9092,controller://:9093
      KAFKA_CFG_ADVIDEO_LISTENERS：plaintext://127.0.0.1:9092
      kafka_cfg_listener_security_protocol_map：controller:plaintext,plaintext:plaintext
      kafka_cfg_controller_listener_names: controller
      kafka_cfg_inter_broker_listener_name：PLAINTEXT
```

然后引导节点连接到 Kafka。 以下是 `kend.conf` 中的最低限度 CDF 配置、

```sh
ADDITIONAL="--chaindatafetcher \
--chaindatafetcher.mode kafka \
--chaindatafetcher.kafka.brokers localhost:9092"
```

节点向两个 Kafka 主题发布信息。 块组 "包含块头、共识相关信息和交易收据。 tracegroup "启用后，将携带块的内部 tx 跟踪（即 callTrace）。 以下是默认主题名称。

```sh
$ kafka-topics.sh --bootstrap-server localhost:9092 --list
__consumer_offsets
local.klaytn.chaindatafetcher.en-0.blockgroup.v1
local.klaytn.chaindatafetcher.en-0.tracegroup.v1
```

ken "命令行标志"--chaindatafetcher.\*"可让你自定义主题名称、分区、副本和其他 Kafka 配置。

### 当前同步区块的轨迹

如果配置了 chaindatafetcher 且节点正在同步区块，那么这些区块的执行结果将自动发布。 在默认设置下，只有 `blockgroup` 主题被填充。 要在块同步的同时启用内部 tx 跟踪，请指定 `--vm.internaltx`。

```sh
ADDITIONAL="$ADDITIONAL --vm.internaltx"
```

然后，当节点同步数据块时，您就可以收到 callTrace 结果。 请注意，空区块不会发布跟踪组信息。

```
$ kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic local.klaytn.chaindatafetcher.en-0.tracegroup.v1
{"blockNumber":97316,"result":[{"type":"CALL","from":"0x854ca8508c8be2bb1f3c244045786410cb7d5d0a","to":"0xda65c2761c358cd14cb82a4e5fc81e9debce6942","value":"0xde0b6b3a7640000","gas":"0x989680","gasUsed":"0x5208","error":""}]}
{"blockNumber":97348,"result":[{"type":"CALL","from":"0x854ca8508c8be2bb1f3c244045786410cb7d5d0a","to":"0x75779e1c1436bc2e81db7fb32f9b9d193d945146","value":"0xde0b6b3a7640000","gas":"0x989680","gasUsed":"0x5208","error":""}]}
```

这种方法可同时实现区块同步和区块跟踪。

### 请求范围内的轨迹

chaindatafetcher 还支持按需交付数据块和轨迹，称为 "范围获取 "选项。 结果会发布到与 syncinc 块相同的 Kafka 主题中，因此如果需要将它们分开，请停止块同步。

取值范围由 `chaindatafetcher_` 命名空间 RPC 触发。 该 RPC 可通过 IPC 访问。 注意，使用范围取值不需要 `--vm.internaltx` 标记。

```
$ ken attach --datadir /var/kend/data
> chaindatafetcher.startRangeFetching(97300,97400,'trace')
```
