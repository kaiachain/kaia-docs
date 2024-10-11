# Debug tracing

Debug tracing is a feature that extracts additional information while executing a transaction in a VM. As the name suggests, it is mainly used for debbuging transaction failure or gas spending breakdown. Since VMs are deterministic, once a transaction is confirmed, the same trace will be produced no matter when it is traced. In other words, you can debug a confirmed transaction after the fact, making it a useful tool for dApp development.

There are various methods where you can retrieve debug traces

- Call debug namespace JSON-RPC APIs on-demand.
- Receive into kafka via chaindatafetcher on-demand.
- Receive into kafka via chaindatafetcher from a node as the node syncs blocks.
- Use block explorers or indexer services, which is outside scope of this document.

## Using debug APIs

The go-to method is to calling the `debug_trace*` JSON-RPC APIs.

### Tracer types

To get traces with the debug API, you first need to decide what kind of information you want to learn. Most commonly, you'll want to use `callTracer` to understand the interaction between contracts i.e. internal transactions. There are other tracer types like `prestateTracer` and `structLogger` that allow you to debug the same transaction from multiple angles. Below lists some frequently used tracers.

**NOTE**: Since Kaia v1.0.1 `callTracer` and `fastCallTracer` are identical as they consolidated to one native (Go) implementation.

**NOTE**: Since Kaia v1.0.1 `callTracer` and `fastCallTracer` outputs are updated to more correctly reflect the execution. The same transaction could have yielded different trace in previous versions. See the [GitHub PR](https://github.com/kaiachain/kaia/pull/15) for the details.

- Predefined tracers
  - `callTracer` traces contract calls and contract creation within a transaction (internal tx). Returns the specific call or create opcode, revert reason, and gas spending at each call frame. Its use has been discouraged for slow speed, but since v1.0.1 the problem was resolved. Developers can safely use this tracer.
  - `fastCallTracer` is a Golang implementation of `callTracer`. But since v1.0.1 the two are identical, so there is no need to use fastCallTracer anymore.
  - `prestateTracer` returns information needed to construct a custom local genesis state that this transaction can run on. Useful for creating a test case out of live blockchain data.
  - `revertTracer` returns the revert reason, if any. This can be replaced by `callTracer` which returns `.reverted.reason` and `.revertReason` fields.
  - Refer to [API reference](../../../references/json-rpc/debug/trace-transaction) for the full list of supported tracers.
- structLogger is the tracer activated when you don't specify any tracer. The execution of every opcode is shown in detail which is extremely heavy and usually too verbose for application debugging.
- Custom JS tracer is also supported, unless the node prohibits its use with `--rpc.unsafe-debug.disable` option. You can submit a piece of JavaScript code that gets invoked alongside transaction execution. Below is an example custom tracer that prints the gasUsed after each opcode `"{gasUsed: [], step: function(log) { this.gasUsed.push(log.getGas()); }, result: function() { return this.gasUsed; }, fault: function() {}}"`. You can find more about custom JS tracer [here](https://docs.chainstack.com/reference/custom-js-tracing-ethereum) and [here](https://geth.ethereum.org/docs/developers/evm-tracing/custom-tracer).

### CallTracer special cases

Kaia's `callTracer` output format is identical to go-ethereum except for following:

- For revered transactions, both fields are provided.
  - `result.revertReason`: revert reason string, if any.
  - `result.reverted.contract`: the address of the reverted contract.
  - `result.reverted.message`: same as revertReason

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

- Some transaction types that does not execute VM are treated as 0 KAIA transfer to the sender itself. Those transaction types are AccountUpdate, Cancel, ChainDataAnchoring and their fee delegated variants.

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

### Batch tracing

Debug tracers can be retrieved at different granularity.

- `debug_traceTransaction` traces a single transaction hash
- `debug_traceBlockByNumber` and `debug_traceBlockByHash` traces all transactions in a block
- `debug_traceBlobkByRange` traces consecutive blocks in a range
- `debug_traceCall` lets you run an `eth_call` at the given block's final state. This is useful for simulating a transaction execution before sending it.

### State regeneration

When an full-mode node serves the debug trace APIs it may undergo historical state regeneration. Suppose you requested to trace a block. The node has to execute the block from the parent block's final state. But a full-mode node stores block states only so often (every other 128 blocks by default), so the node re-exectues blocks from the nearest saved state. At worst case tracing one block takes executing 127 blocks. Therefore a full-mode node may respond to debug trace APIs slowly. If you are going to requeat a large number, you must use an archive-mode nodes.

## Using chaindatafetcher

Chaindatafetcher (CDF) is a unique feature of Kaia where block processing results are published into Kafka queue to simplify building downstream data services. For instance a block explorer can utilize CDF to populate its database.

**NOTE**: Since Kaia v1.0.1 tracegroup (internally callTracer) outputs are updated to more correctly reflect the execution. The same transaction could have yielded different trace in previous versions. See the [GitHub PR](https://github.com/kaiachain/kaia/pull/15) for the details.

### Connecting to Kafka

Prepare a Kafka cluster first. You can test chaindatafetcher with below example docker compose configuration, but you can use any Kafka installation.

```yaml
# Test kafka docker-compose.yml. Not for production.
services:
  kafka:
    image: bitnami/kafka:3.7
    ports:
      - "9092:9092"
    environment:
      KAFKA_CFG_NODE_ID: 0
      KAFKA_CFG_PROCESS_ROLES: controller,broker
      KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 0@127.0.0.1:9093
      KAFKA_CFG_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
      KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://127.0.0.1:9092
      KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
      KAFKA_CFG_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_CFG_INTER_BROKER_LISTENER_NAME: PLAINTEXT
```

Then direct the node to connect to Kafka. Below is a minimal CDF configuration in your `kend.conf`,

```sh
ADDITIONAL="--chaindatafetcher \
--chaindatafetcher.mode kafka \
--chaindatafetcher.kafka.brokers localhost:9092"
```

The node publishes to two Kafka topics. `blockgroup` carries block header, consensus-related information, and transaction receipts. `tracegroup`, when enabled, carries internal tx traces (i.e. callTrace) of the block. Below are the default topic names.

```sh
$ kafka-topics.sh --bootstrap-server localhost:9092 --list
__consumer_offsets
local.klaytn.chaindatafetcher.en-0.blockgroup.v1
local.klaytn.chaindatafetcher.en-0.tracegroup.v1
```

The `ken` command line flags `--chaindatafetcher.*` let you customize topic names, partitions, replicas and other Kafka configurations.

### Traces from currently syncing block

If the chaindatafetcher is configured and the node is syncing blocks, then execution results of those blocks will be automatically published. With the default setting, only `blockgroup` topic is populated. To enable internal tx tracing alongside block sync, specify `--vm.internaltx`.

```sh
ADDITIONAL="$ADDITIONAL --vm.internaltx"
```

Then you can receive the callTrace results as the node syncs the blocks. Note that no tracegroup messages are published for empty blocks.

```
$ kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic local.klaytn.chaindatafetcher.en-0.tracegroup.v1
{"blockNumber":97316,"result":[{"type":"CALL","from":"0x854ca8508c8be2bb1f3c244045786410cb7d5d0a","to":"0xda65c2761c358cd14cb82a4e5fc81e9debce6942","value":"0xde0b6b3a7640000","gas":"0x989680","gasUsed":"0x5208","error":""}]}
{"blockNumber":97348,"result":[{"type":"CALL","from":"0x854ca8508c8be2bb1f3c244045786410cb7d5d0a","to":"0x75779e1c1436bc2e81db7fb32f9b9d193d945146","value":"0xde0b6b3a7640000","gas":"0x989680","gasUsed":"0x5208","error":""}]}
```

This method achieves both block syncing and block tracing at the same time.

### Traces from requested range

The chaindatafetcher also supports delivers blocks and traces on-demand, called the 'range fetching' option. The results are published to the same Kafka topic as the syncinc blocks, so if you need to separate them then stop the block sync.

The range fetching is triggered by `chaindatafetcher_` namespace RPC. This RPC is accessible via IPC. Note yo don't need `--vm.internaltx` flag to use range fetching.

```
$ ken attach --datadir /var/kend/data
> chaindatafetcher.startRangeFetching(97300,97400,'trace')
```
