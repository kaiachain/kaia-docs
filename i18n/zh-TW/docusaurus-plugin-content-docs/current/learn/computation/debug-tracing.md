# 調試跟蹤

調試跟蹤是一種在虛擬機中執行事務時提取額外信息的功能。 顧名思義，它主要用於調試事務失敗或氣體支出故障。 由於虛擬機是確定性的，一旦交易得到確認，無論何時跟蹤，都會產生相同的跟蹤結果。 換句話說，您可以事後調試已確認的交易，使其成為開發 dApp 的有用工具。

有多種方法可以檢索調試跟蹤

- 按需調用調試命名空間 JSON-RPC API。
- 通過 chaindatafetcher 按需接收到 kafka。
- 當節點同步塊時，通過 chaindatafetcher 從節點接收到 kafka。
- 使用區塊探索器或索引器服務，這超出了本文檔的範圍。

## 使用調試 API

最常用的方法是調用 `debug_trace*` JSON-RPC API。

### 示蹤劑類型

要使用調試 API 查找痕跡，首先需要確定想要了解哪類信息。 最常見的情況是使用 `callTracer` 來了解合約之間的交互，即內部交易。 還有其他一些跟蹤器類型，如 `prestateTracer` 和 `structLogger` 可以讓你從多個角度調試同一個事務。 下面列出了一些常用的示蹤劑。

**注意**：自 Kaia v1.0.1 起，"callTracer "和 "fastCallTracer "是相同的，因為它們合併為一個本地 (Go) 實現。

**注意**：自 Kaia v1.0.1 起，"callTracer "和 "fastCallTracer "輸出已更新，以更正確地反映執行情況。 在以前的版本中，同樣的交易可能會產生不同的跟蹤結果。 詳情請參見 [GitHub PR](https://github.com/kaiachain/kaia/pull/15)。

- 預定義追蹤器
  - callTracer "跟蹤事務（內部 tx）中的合約調用和合約創建。 返回每個調用幀的具體調用或創建操作碼、還原原因和耗氣量。 由於速度較慢，我們不鼓勵使用它，但從 v1.0.1 版開始，這個問題得到了解決。 開發人員可以放心使用該跟蹤器。
  - fastCallTracer "是 "callTracer "的 Golang 實現。 但自 v1.0.1 版起，兩者的功能完全相同，因此無需再使用 fastCallTracer。
  - `prestateTracer` 返回構建自定義本地創世狀態所需的信息，該事務可以在創世狀態上運行。 用於從即時區塊鏈數據中創建測試用例。
  - `revertTracer` 返回還原原因（如果有）。 可以用 `callTracer` 代替，它會返回 `.reverted.reason` 和 `.revertReason` 字段。
  - 請參閱[API 參考](../../../references/json-rpc/debug/trace-transaction)，瞭解所支持跟蹤器的完整列表。
- structLogger 是在未指定任何跟蹤器時激活的跟蹤器。 每個操作碼的執行情況都會詳細顯示出來，這對於應用程序調試來說非常繁瑣，而且通常過於冗長。
- 除非節點使用 `--rpc.unsafe-debug.disable`選項禁止使用，否則也支持自定義 JS 跟蹤器。 您可以提交一段 JavaScript 代碼，該代碼會在事務執行的同時被調用。 Below is an example custom tracer that prints the gasUsed after each opcode `"{gasUsed:[], step: function(log) { this.gasUsed.push(log.getGas()); }, result: function() { return this.gasUsed; }, fault: function() {}}"`. 您可以在 [此處](https://docs.chainstack.com/reference/custom-js-tracing-ethereum) 和 [此處](https://geth.ethereum.org/docs/developers/evm-tracing/custom-tracer) 找到有關自定義 JS 跟蹤器的更多信息。

### CallTracer 特例

Kaia 的 `callTracer` 輸出格式與 go-ethereum 完全相同，但以下內容除外：

- 對於受尊敬的交易，這兩個字段都會提供。
  - result.revertReason\`：還原原因字符串（如果有）。
  - result.revoted.contract\`：已還原合同的地址。
  - result.revted.message：與 revertReason 相同

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

- 某些不執行虛擬機的交易類型被視為 0 KAIA 向發送方轉賬。 這些交易類型包括賬戶更新（AccountUpdate）、取消（Cancel）、鏈數據管理（ChainDataAnchoring）及其費用委託變體。

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

### 批量跟蹤

可按不同粒度檢索調試跟蹤器。

- `debug_traceTransaction` 追蹤單個事務的哈希值
- debug_traceBlockByNumber "和 "debug_traceBlockByHash "跟蹤區塊中的所有事務
- `debug_traceBlobkByRange` 跟蹤某一範圍內的連續塊
- debug_traceCall "可讓您在給定代碼塊的最終狀態下運行 "eth_call"。 這對於在發送前模擬事務執行非常有用。

### 國家再生

全模式節點為調試跟蹤 API 提供服務時，可能會進行歷史狀態再生。 假設您要求跟蹤一個數據塊。 節點必須從父代碼塊的最終狀態開始執行代碼塊。 但是，全模式節點存儲區塊狀態的頻率很低（默認情況下每隔 128 個區塊存儲一次），因此節點會從最近的保存狀態重新檢測區塊。 在最糟糕的情況下，跟蹤一個數據塊需要執行 127 個數據塊。 因此，全模式節點對調試跟蹤 API 的響應可能會很慢。 如果要重新讀取大量數據，必須使用存檔模式節點。

## 使用 chaindatafetcher

Chaindatafetcher (CDF) 是 Kaia 的一項獨特功能，可將塊處理結果發佈到 Kafka 隊列中，以簡化下游數據服務的構建。 例如，區塊資源管理器可以利用 CDF 來填充其數據庫。

**注意**：自 Kaia v1.0.1 版起，跟蹤組（內部稱為 callTracer）輸出已更新，以更正確地反映執行情況。 在以前的版本中，同樣的交易可能會產生不同的跟蹤結果。 詳情請參見 [GitHub PR](https://github.com/kaiachain/kaia/pull/15)。

### 連接到 Kafka

首先準備一個 Kafka 集群。 你可以用下面的 docker compose 配置示例測試 chaindatafetcher，但也可以使用任何 Kafka 安裝。

```yaml
# 測試 kafka docker-compose.yml。不用於生產。
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

然後引導節點連接到 Kafka。 以下是 `kend.conf` 中的最低限度 CDF 配置、

```sh
ADDITIONAL="--chaindatafetcher \
--chaindatafetcher.mode kafka \
--chaindatafetcher.kafka.brokers localhost:9092"
```

節點向兩個 Kafka 主題發佈信息。 塊組 "包含塊頭、共識相關信息和交易收據。 tracegroup "啟用後，將攜帶塊的內部 tx 跟蹤（即 callTrace）。 以下是默認主題名稱。

```sh
$ kafka-topics.sh --bootstrap-server localhost:9092 --list
__consumer_offsets
local.klaytn.chaindatafetcher.en-0.blockgroup.v1
local.klaytn.chaindatafetcher.en-0.tracegroup.v1
```

ken "命令行標誌"--chaindatafetcher.\*"可讓你自定義主題名稱、分區、副本和其他 Kafka 配置。

### 當前同步區塊的軌跡

如果配置了 chaindatafetcher 且節點正在同步區塊，那麼這些區塊的執行結果將自動發佈。 在默認設置下，只有 `blockgroup` 主題被填充。 要在塊同步的同時啟用內部 tx 跟蹤，請指定 `--vm.internaltx`。

```sh
ADDITIONAL="$ADDITIONAL --vm.internaltx"
```

然後，當節點同步數據塊時，您就可以收到 callTrace 結果。 請注意，空區塊不會發布跟蹤組信息。

```
$ kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic local.klaytn.chaindatafetcher.en-0.tracegroup.v1
{"blockNumber":97316,"result":[{"type":"CALL","from":"0x854ca8508c8be2bb1f3c244045786410cb7d5d0a","to":"0xda65c2761c358cd14cb82a4e5fc81e9debce6942","value":"0xde0b6b3a7640000","gas":"0x989680","gasUsed":"0x5208","error":""}]}
{"blockNumber":97348,"result":[{"type":"CALL","from":"0x854ca8508c8be2bb1f3c244045786410cb7d5d0a","to":"0x75779e1c1436bc2e81db7fb32f9b9d193d945146","value":"0xde0b6b3a7640000","gas":"0x989680","gasUsed":"0x5208","error":""}]}
```

這種方法可同時實現區塊同步和區塊跟蹤。

### 請求範圍內的軌跡

chaindatafetcher 還支持按需交付數據塊和軌跡，稱為 "範圍獲取 "選項。 結果會發布到與 syncinc 塊相同的 Kafka 主題中，因此如果需要將它們分開，請停止塊同步。

取值範圍由 `chaindatafetcher_` 命名空間 RPC 觸發。 該 RPC 可通過 IPC 訪問。 注意，使用範圍取值不需要 `--vm.internaltx` 標記。

```
$ ken attach --datadir /var/kend/data
> chaindatafetcher.startRangeFetching(97300,97400,'trace')
```
