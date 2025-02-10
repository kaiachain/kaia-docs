# デバッグトレース

デバッグ・トレースは、VMでトランザクションを実行中に追加情報を抽出する機能である。 その名の通り、主にトランザクションの失敗やガス欠のデバッグに使われる。 VMは決定論的であるため、一度トランザクションが確認されれば、いつトレースされても同じトレースが生成される。 言い換えれば、確認されたトランザクションを事後的にデバッグすることができ、dApp開発にとって有用なツールとなる。

デバッグトレースを取得する方法は様々ある。

- デバッグ名前空間JSON-RPC APIをオンデマンドで呼び出す。
- chaindatafetcher経由でkafkaにオンデマンドで受信する。
- ノードがブロックを同期する際に、ノードからchaindatafetcher経由でkafkaに受信する。
- ブロックエクスプローラやインデクササービスを使用する。

## デバッグAPIの使用

最も一般的な方法は、`debug_trace*` JSON-RPC APIを呼び出すことである。

### トレーサー・タイプ

デバッグAPIを使ってトレースを取得するには、まずどのような情報を知りたいかを決める必要がある。 最も一般的なのは、コントラクト間の相互作用、つまり内部トランザクションを理解するために `callTracer` を使用することだろう。 他にも `prestateTracer` や `structLogger` といったトレーサータイプがあり、同じトランザクションを複数の角度からデバッグすることができる。 以下に、頻繁に使用されるトレーサーをいくつか挙げる。

**NOTE**：Kaia v1.0.1以降、`callTracer`と`fastCallTracer`は1つのネイティブ（Go）実装に統合されたため、同一である。

**NOTE**：Kaia v1.0.1以降、 `callTracer` と `fastCallTracer` の出力は、より正しく実行を反映するように更新されています。 同じトランザクションでも、以前のバージョンでは異なるトレースが得られたかもしれない。 詳細は[GitHub PR](https://github.com/kaiachain/kaia/pull/15)を参照のこと。

- 定義済みトレーサー
  - `callTracer`は、トランザクション（内部tx）内のコントラクトコールとコントラクト作成をトレースする。 各コールフレームで、特定のコールまたは作成のオペコード、復帰理由、ガス消費量を返す。 速度が遅いため使用は推奨されていなかったが、v1.0.1から問題は解決された。 開発者はこのトレーサーを安全に使うことができる。
  - `fastCallTracer` は `callTracer` の Golang 実装である。 しかし、v1.0.1以降、この2つは同一なので、fastCallTracerを使う必要はなくなった。
  - `prestateTracer`は、このトランザクションが実行できるカスタムローカルジェネシス状態を構築するために必要な情報を返す。 ライブのブロックチェーンデータからテストケースを作成するのに便利。
  - `revertTracer`は、もしあれば、復帰の理由を返す。 これは `.reverted.reason` と `.revertReason` フィールドを返す `callTracer` で置き換えることができる。
  - サポートされているトレーサーの全リストは、[API reference](../../../references/json-rpc/debug/trace-transaction)を参照。
- structLogger は、トレーサーを指定しない場合にアクティブになるトレーサーです。 すべてのオペコードの実行が詳細に表示されるが、これは非常に重く、アプリケーションのデバッグには冗長すぎる。
- ノードが`--rpc.unsafe-debug.disable`オプションで使用を禁止していない限り、カスタムJSトレーサーもサポートされている。 トランザクションの実行と同時に呼び出されるJavaScriptコードの一部をサブミットすることができる。 以下は、各オペコードの後に gasUsed を表示するカスタムトレーサの例です `"{gasUsed：[], step: function(log) { this.gasUsed.push(log.getGas()); }, result: function() { return this.gasUsed; }, fault: function() {}}"`. カスタムJSトレーサーについては[こちら](https://docs.chainstack.com/reference/custom-js-tracing-ethereum)と[こちら](https://geth.ethereum.org/docs/developers/evm-tracing/custom-tracer)をご覧ください。

### CallTracerの特殊なケース

Kaiaの`callTracer`出力フォーマットは、以下を除いてgo-ethereumと同じである：

- Reverted取引では、両方のフィールドが提供される。
  - `result.revertReason`: もしあれば、復帰理由の文字列。
  - `result.reverted.contract`: 元に戻した契約のアドレス。
  - `result.reverted.message`: revertReasonと同じ。

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

- VMが実行されないいくつかのトランザクションタイプは、送信者自身への0KAIA転送として扱われる。 これらのトランザクション・タイプは、AccountUpdate、Cancel、ChainDataAnchoring、およびそれらの手数料デリゲート・バリアントである。

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

### バッチトレース

デバッグ・トレーサーは異なる粒度で取得することができる。

- `debug_traceTransaction`は単一のトランザクションハッシュをトレースする。
- `debug_traceBlockByNumber` と `debug_traceBlockByHash` はブロック内のすべてのトランザクションをトレースする。
- `debug_traceBlobkByRange`は範囲内の連続したブロックをトレースする。
- `debug_traceCall`を使うと、与えられたブロックの最終状態で `eth_call` を実行することができる。 これは、送信前にトランザクションの実行をシミュレートするのに便利である。

### ステータスの再生

フルモード・ノードがデバッグ・トレースAPIを提供する場合、履歴状態の再生成が行われることがあります。 あるブロックをトレースしたいとリクエストしたとする。 ノードは親ブロックの最終状態からブロックを実行しなければならない。 しかし、フルモード・ノードはブロックの状態を保存する頻度が少ない（デフォルトでは128ブロックおき）ため、ノードは保存された状態のうち最も近いものからブロックを再選択する。 最悪の場合、1ブロックをトレースするのに127ブロックを実行する必要がある。 そのため、フルモードノードはデバッグトレースAPIへの反応が遅くなる可能性がある。 大量に再作成する場合は、アーカイブモードのノードを使用する必要があります。

## チェーンデータフェッチャーの使用

Chaindatafetcher (CDF)はKaiaのユニークな機能で、ブロック処理の結果をKafkaキューに公開し、下流のデータサービス構築を簡素化します。 例えば、ブロック・エクスプローラーはCDFを利用してデータベースを作成することができる。

**注**：Kaia v1.0.1以降、トレースグループ（内部的にはcallTracer）の出力は、より正しく実行を反映するように更新されています。 同じトランザクションでも、以前のバージョンでは異なるトレースが得られたかもしれない。 詳細は[GitHub PR](https://github.com/kaiachain/kaia/pull/15)を参照のこと。

### Kafkaへの接続

まずKafkaクラスタを準備する。 chaindatafetcherは、以下のdocker composeの設定例でテストできますが、どのKafkaのインストールでも使用できます。

```yaml
# kafka docker-compose.yml をテストする。
services:
  kafka:
    image: bitnami/kafka:3.7
    ports：
      - "9092:9092"
    環境：
      KAFKA_CFG_NODE_ID: 0
      KAFKA_CFG_PROCESS_ROLES: controller,broker
      KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 0@127.0.0.1:9093
      KAFKA_CFG_LISTENERS：plaintext://:9092,controller://:9093
      KAFKA_CFG_ADVERTISED_LISTENERS：plaintext:/127.0.0.1:9092
      kafka_cfg_listener_security_protocol_map：controller:plaintext,plaintext:plaintext
      kafka_cfg_controller_listener_names: controller
      kafka_cfg_inter_broker_listener_name：プレーンテキスト
```

次に、Kafkaに接続するようノードに指示する。 以下は `kend.conf` での最小限の CDF 設定である、

```sh
ADDITIONAL="--chaindatafetcher ˶
--chaindatafetcher.mode kafka ˶
--chaindatafetcher.kafka.brokers localhost:9092"
```

ノードは2つのKafkaトピックにパブリッシュする。 `blockgroup`はブロックヘッダ、コンセンサス関連情報、トランザクションの受信を運ぶ。 `tracegroup`を有効にすると、ブロックの内部txトレース（つまりcallTrace）を伝送する。 以下はデフォルトのトピック名である。

```sh
$ kafka-topics.sh --bootstrap-server localhost:9092 --list
__consumer_offsets
local.klaytn.chaindatafetcher.en-0.blockgroup.v1
local.klaytn.chaindatafetcher.en-0.tracegroup.v1
```

`ken` コマンドラインフラグ `--chaindatafetcher.*` を使用すると、トピック名、パーティション、レプリカ、その他の Kafka 設定をカスタマイズできる。

### 現在同期中のブロックからのトレース

chaindatafetcherが設定され、ノードがブロックを同期している場合、それらのブロックの実行結果は自動的に公開される。 デフォルトの設定では、`blockgroup`トピックだけが入力される。 ブロック同期と並行して内部txトレースを有効にするには、--vm.internaltx\`を指定する。

```sh
ADDITIONAL="$ADDITIONAL --vm.internaltx"
```

そうすれば、ノードがブロックを同期する際にcallTraceの結果を受け取ることができる。 なお、空のブロックにはトレースグループメッセージは発行されない。

```
$ kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic local.klaytn.chaindatafetcher.en-0.tracegroup.v1
{"blockNumber":97316,"result":[{"type":"CALL","from":"0x854ca8508c8be2bb1f3c244045786410cb7d5d0a","to":"0xda65c2761c358cd14cb82a4e5fc81e9debce6942","value":"0xde0b6b3a7640000","gas":"0x989680","gasUsed":"0x5208","error":""}]}
{"blockNumber":97348,"result":[{"type":"CALL","from":"0x854ca8508c8be2bb1f3c244045786410cb7d5d0a","to":"0x75779e1c1436bc2e81db7fb32f9b9d193d945146","value":"0xde0b6b3a7640000","gas":"0x989680","gasUsed":"0x5208","error":""}]}
```

この方法は、ブロック同期とブロックトレースの両方を同時に実現する。

### 要求された範囲からのトレース

chaindatafetcherは、「範囲フェッチ」オプションと呼ばれる、ブロックとトレースのオンデマンド配信もサポートしている。 結果はsyncincブロックと同じKafkaトピックにパブリッシュされるので、それらを分離する必要がある場合は、ブロック同期を停止する。

範囲取得は `chaindatafetcher_` 名前空間 RPC によって行われる。 このRPCはIPC経由でアクセスできる。 注意: 範囲フェッチを使うのに `--vm.internaltx` フラグは必要ない。

```
ken attach --datadir /var/kend/data
> chaindatafetcher.startRangeFetching(97300,97400,'trace')
```
