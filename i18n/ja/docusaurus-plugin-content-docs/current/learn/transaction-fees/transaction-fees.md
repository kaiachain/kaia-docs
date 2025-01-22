# 取引手数料

1回の取引にかかる取引手数料は以下のように計算される：

```text
Transaction fee := (Gas used) x (GasPrice)
```

わかりやすい例えとして、ガソリンスタンドでガソリンを入れているとしよう。 ガス価格は毎日製油所によって決定され、今日の価格は2ドルだ。 15Lを満タンにすれば、30ドル＝15L×2ドル／1Lを支払うことになり、30ドルは銀行口座から支払われる。 また、その取引は帳簿に記録される。

取引手数料は上記と同じ。 ある取引で21000ガスが使われ、その取引の実効ガス価格が25Gkeiだったとする。 そうなると、ガソリン代は525000Gkeiとなる。 この金額は差出人（`from`口座）の残高から差し引かれる。

## Gas Overview <a id="gas-overview"></a>

ブロックチェーンの状態を変更するすべてのアクションにはガスが必要だ。 While processing the transactions in a block, such as sending KLAY, using KIP-7 tokens, or executing a contract, the user has to pay for the computation and storage usage. 支払額は必要な「ガス」の量によって決まる。 ガスには単位がないから、"21000ガス "とか言うんだ。

取引のガスは2つの要素からなる：

- `IntrinsicGas`は、入力のサイズなど、トランザクション本体に基づいて静的にチャージされるガスである。 詳しくは[固有ガス](intrinsic-gas.md)をご参照ください。
- `ExecutionGas`は実行中に動的に計算されるガスである。 詳しくは[「実行ガス」](execution-gas.md)をご覧ください。

ガスの使用量は、取引が実行された後にのみ決定される。 そのため、レシートから取引のガス使用量を調べることができる。

### 適切なガスリミットを見つける

すべてのトランザクションは、そのトランザクショ ンが使用できる最大ガス量であるgasLimitを指定しなければならない。 送信者は、トランザクションの適切な gasLimit を見つけるために `eth_estimateGas` と `kaia_estimateGas` RPC を利用することもできる。 あるいは、送信者が手動で十分な大きさの数字を指定することもできる。 高いガスリミットを指定しても、自動的に高いガス料金が請求されるわけではないので、固定の数値を使用することは有効な選択肢である。 しかし、数トークンしか持っていない送信者は、実際のガス使用量に関係なく、少なくとも`gasLimit * effectiveGasPrice`を残高に所有していなければならないので、高すぎるgasLimitを指定することはできない。

## GasPrice Overview <a id="gas-price-overview"></a>

取引の有効ガス価格は多くの変数から計算される：

- ハードフォーク・レベル
- 送信者によって提出されたトランザクションのガス価格フィールド
  - `maxFeePerGas`（しばしばfeeCapと呼ばれる）フィールドはタイプ2のトランザクションに存在する。
  - `maxPriorityFeePerGas`（しばしばtipCapと呼ばれる）フィールドはタイプ2の取引に存在する。
  - `gasPrice`フィールドは他のすべてのトランザクションタイプに存在する。
- トランザクションが実行されるブロックの `baseFeePerGas` (しばしば baseFee と呼ばれる)

### マグマ・ハードフォーク前（固定単価）

Magmaのハードフォーク以前は、すべてのトランザクションの取引手数料は`unitPrice`と呼ばれる固定値である。 The values can be changed by governance. すべての取引は、現在の単価と等しいガス価格フィールドを提出しなければならない。 単価メカニズムは、ガス料金オークション市場でのガス料金見積もりによるUXの不満を回避し、サービス提供者がガス料金予算を容易に予測できるようにする。

指定したブロックの `unitPrice` は `kaia_getParams` API で取得できる。

### マグマ・ハードフォーク後（KIP-71ダイナミック・ベース料金）

The network determines the gas price for every block. 基本料金は、トランザクションのトラフィックが閾値より高ければ増加し、そうで なければ減少する。 トランザクション・トラフィックは、使用されるブロック・ガスで測定される。 ブロック内のトランザクションの実行が重くなるにつれて、ネットワークはより高い輻輳を認識し、基本料金が増加する可能性が高い。

EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)と異なり、マグマ・ガス・ポリシーにはチップがない（チップはカイアのハードフォークから導入された）。 その代わりに、FCFS（先着順）ポリシーがスパム行為からネットワークを守るために導入されている。

#### 基本料金の計算

基本料金の計算は、以下のパラメータに依存する：

- ブロック混雑データ
  - previous_base_fee：前のブロックの基本料金
  - GAS_USED_FOR_THE_PREVIOUS_BLOCK: Gas used to process all transactions of the previous block
- 後からガバナンスで変更可能なチューニング・パラメーター
  - GAS_TARGET: The gas amount that determines the increase or decrease of the base fee (30 million at the moment)
  - max_block_gas_used_for_base_fee：最大ベースフィー変更率を強制するための暗黙のブロックガス制限。
  - BASE_FEE_DELTA_REDUCING_DENOMINATOR: The value to set the maximum base fee change to 5% per block (20 at the moment, can be changed later by governance)
  - UPPER_BOUND_BASE_FEE: The maximum value for the base fee (750 ston at the moment, can be changed later by governance)
  - LOWER_BOUND_BASE_FEE: The minimum value for the base fee (25 ston at the moment, can be changed later by governance)

以下は、基本料金の計算を簡略化したものである。 その本質において、基本料金の変化はGAS_TARGETとPREVIOUS_BLOCK_GAS_USEDの差に比例し、他のパラメータは基本料金の変化速度または境界を制御する。 正確な計算式は[KIP-71](https://github.com/kaiachain/kips/blob/main/KIPs/kip-71.md)を参照。

```
              min(PREVIOUS_BLOCK_GAS_USED, MAX_BLOCK_GAS_USED_FOR_BASE_FEE) - GAS_TARGET
changeRate = ----------------------------------------------------------------------------
                                BASE_FEE_DENOMINATOR * GAS_TARGET

nextBaseFeeBeforeBound = PREVIOUS_BASE_FEE * (1 + changeRate)

nextBaseFee = max(min(nextBaseFeeBeforeBound, UPPER_BOUND_BASE_FEE), LOWER_BOUND_BASE_FEE)
```

指定したブロックのチューニングパラメータは `kaia_getParams` API で取得できる。 各ブロックの `baseFeePerGas` は `kaia_getBlock*` と `eth_getBlock*` API を使って調べることができる。

#### ガス代

マグマはハードフォークなので、ブロックのガス料金の半分は燃えてしまう。 詳細は[KIP-71](https://github.com/kaiachain/kips/blob/main/KIPs/kip-71.md)を参照。

コレはハードフォークなので、ブロックガス代はほとんど燃えてしまう。 詳細は[KIP-82](https://kips.kaia.io/KIPs/kip-82)を参照。

### カイアハードフォーク後（KIP-162優先料金）

Kaiaのハードフォーク以降、トランザクションはブロック包含の可能性を高めるために、ゼロ以外の優先手数料（または単にチップ）を指定することができる。 カイアのガス・ポリシーは、トランザクションが基本料金プラス実効チップを支払うという点で、 [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)に似ている。

取引の有効ガス価格は`min(baseFee + tipCap, feeCap)`として定義される。 タイプ2のトランザクションでは、トランザクションフィールド `maxPriorityFeePerGas` と `maxFeePerGas` は当然ながら tipCap と feeCap になる。 しかし、他のトランザクションタイプでは、`gasPrice`フィールドは1つしかない。 これらのタイプでは、tipCapとfeeCapはどちらも`gasPrice`に等しい。 その結果、実効ガス料金は「min(baseFee + tipCap, feeCap) = min(baseFee + gasPrice, gasPrice) = gasPrice\`」となり、ガス料金オークションの仕組みと同じになる。

詳細は[KIP-162](https://github.com/kaiachain/kips/blob/main/KIPs/kip-162.md)を参照。

### カイアの後、適切なガス料金を見つける

アプリケーションやウォレットがタイプ2のトランザクション（EIP-1559タイプ）を利用する場合は、合理的な優先手数料を設定してください。 また、`eth_maxPriorityFeePerGas` RPC を呼び出して、推奨優先料金 (tx.maxPriorityFeePerGas) を取得することもできます。 ネットワークが混雑していない場合、ゼロプライオリティの手数料取引は取引処理において不利になることはないはずである。 ネットワークが混雑している場合は、他のトランザクションと競合するため、ゼロ以外の優先料金を指定した方が安全である。

Kaiaノードの `eth_maxPriorityFeePerGas` RPCは、以下のようにしなければならない：

- ネットワークが混雑していなければ0を返す。 次のbaseFeePerGasがUPPER_BOUND_BASE_FEEと等しいとき、ネットワークは混雑していないとみなされる。
- そうでない場合は、直近のNブロックのトランザクションのうち、Pパーセンタイルの実効優先料金を返す。 デフォルト設定のKaiaノードはP=60、N=20を使用するが、ノードによって設定は異なる。

Type-2トランザクションの`maxFeePerGas`は、ベースフィーが上昇してもトランザクションが確実に処理されるように、ネットワークの次のベースフィーよりも高くすべきである。 一般的な計算式は、`lastBaseFee*2 + maxPriorityFeePerGas`である。 BASE_FEE_DENOMINATORが20の場合、baseFeeが2倍になるには少なくとも15秒かかります。 もう一つの方法は、`eth_gasPrice` RPCを使うことである。

他のtxタイプのトランザクションの場合、適切な`gasPrice`を選択する際にはより注意が必要である。 なぜなら、これらのTXタイプでは、gasPriceはbaseFeeに関係なくそのまま使われるからである。 一方、gasPriceは少なくともネットワークの基本料金でなければならない。 したがって、アプリケーションとユーザーは、gasPriceを高く設定しすぎることを避け、同時にネットワークの基本料金に合わせることを望むだろう。 一つの戦略として、`gasPrice`を次の基本料金より少し高めに設定し、数回の基本料金の上昇に対応できるようにする。 `eth_gasPrice`RPCを呼び出すことで、推奨ガス価格を取得することができる。

Kaiaノードの`eth_gasPrice` RPCは次のようにする：

- (next baseFee) \* M + (eth_maxPriorityFeePerGas) を返す。 乗数Mは、混雑していないネットワークでは1.10、混雑しているネットワークでは1.15とヒューリスティックに選択される。 BASE_FEE_DENOMINATORが20の場合、M=1.10は少なくとも1回の基本料金の値上げ(1.05)に耐えることができ、M=1.15は少なくとも2回の連続した基本料金の値上げ(1.05\*1.05)に耐えることができる。 通常、基本料金が5％の最高速度で上昇することはないことを考慮すると、この倍率は実際には数回の基本料金の値上げに十分なはずだ。

### ガス価格の概要

| ハードフォーク | `gasPrice`要件                                                 | `maxFeePerGas`要件                                             | `MaxPriorityFeePerGas` 要件。                                                                            | 計算された「実効ガス価格                                                                                                      |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| マグマの前   | 単価でなければならない                                                  | must be unitPrice<br/>(EthTxType フォーク後のみ) | must be unitPrice<br/>(EthTxType フォーク後のみ)                                          | 単価                                                                                                                |
| マグマの後   | 少なくとも基本料金<br/> （推奨：2\*基本料金）                                  | 少なくとも基本料金<br/> （推奨：2\*基本料金）                                  | 無視                                                                                                    | After BaseFee                                                                                                     |
| カイアのその後 | 少なくとも基本料金<br/>(推奨：基本料金\*M + suggestedTip) | 少なくとも基本料金<br/>(推奨：基本料金\*2 + suggestedTip) | ユーザー、ウォレット、SDK まで<br/>(推奨: suggestedTip = 0 または N ブロックの P パーセンタイル) | txタイプ2: min(baseFee + feeCap, tipCap),<br/>その他のtxタイプ: gasPrice |
