# 実行モデル

このページでは、Kaiaスマートコントラクトの実行モデル、データ構造、ライフサイクルについて説明します。

## 実行モデル<a id="execution-model"></a>

トランザクションは、[Platform API Specification](../../../references/json-rpc/kaia/account-created)に記述されているように、プラットフォームAPIによって生成することができる。 These transactions are sent to _Consensus Nodes (CNs)_ to be stored in a block. CNは受信した各トランザクションが有効かどうかをチェックする。 有効なトランザクションはトランザクションプールに保存され、そうでない場合は破棄される。 CNは、トランザクションプール内の現在のブロック内の実行可能なトランザクションを選択し、1つずつ実行する。

トランザクションを実行するために、送信者はトランザクション手数料としていくらかのKAIAを支払わなければならない。 KAIAにおけるこの取引手数料は、ガスと乗数、すなわち_i._、単価に基づいて計算されます。 ガスは計算の基本単位である。 Kaiaノード上で実行される全ての操作は、予め定義された量のガスを消費する。 The exact amount of KLAY required for the transaction is calculated by the formula illustrated in [Transaction Fees](../transaction-fees/transaction-fees.md). 送信者が不十分なガスを伴うトランザクションを送信した場合、トランザクションは失敗する可能性がある。 差出人の口座の残高が不足している場合も、取引に失敗することがある。

トランザクションが正常に実行されると、そのトランザクションは現在のブロックに含まれる。 CNは、ブロック・ガス・リミットまたはブロック・タイム・リミットに達するまでトランザクションを収集する。 その後、CNはトランザクションでブロックを作成する。 このステップでは、ブロック内のいくつかのフィールドを埋める必要がある。 例えば、トランザクション、レシート、ステートなどのハッシュ値を計算しなければならない。 すべての必須フィールドが入力されると、CNはブロックハッシュを生成する。

ブロック生成が完了すると、そのブロックは他のすべてのCNに伝搬される。 他のCNは伝搬されたブロックをすべて検証し、BFTコンセンサス・アルゴリズムを用いて検証結果のコンセンサスを得る。 過半数のCNによって検証プロセスが成功すると、そのブロックはブロックチェーンに保存される。 BFTコンセンサス・アルゴリズムは即時最終性を満たすため、ブロックは最終的であり、削除されることはない。 ブロックがファイナライズされると、そのブロック内のすべてのトランザクションの実行が不可逆的に保証され、要求があればその実行結果を送信者に返すことができる。

## ブロック提案者と委員会選出におけるランダム性の強化<a id="enhanced-randomness-in-block-proposer-and-committee-selection"></a>

カイアは、ブロック提案者と委員会選出プロセスに検証可能なオンチェーンランダムネスを導入する新しいメカニズムを実装した。 このメカニズムには、ブロックヘッダに2つの新しいフィールドが含まれる：randomReveal`と`mixHash\`である。

このシステムでは、ブロック提案者がランダムな値を生成し、コミットする。 ブロックの`randomReveal`フィールドには、特定の署名スキームを使って生成された提案者の署名が含まれ、提案中の現在のブロック番号に基づいて計算される。 `mixHash`は、この明らかにされたランダムな値と他のブロックデータを使って計算され、ネットワークにランダム性の源を作り出す。

ブロック提案者と委員会の選考プロセスは、この生成されたランダム性を利用する。 このランダム性の使用は、選択プロセスをより予測不可能で公平なものにし、ネットワーク全体のセキュリティを高めることを目的としている。 このメカニズムの特別なユースケースの一つは、ブロック提案者が前のブロックが完了するまで非公開でいられるようにすることで、ネットワークに追加のセキュリティレイヤーを追加することである。

実行フローは、各ブロックのランダム性が将来のブロック提案者と委員会の選択に影響を与えるサイクルを作り出す。 これは、検証可能性を維持しながら、これらのプロセスに予測不可能性の要素を導入することになる。

重要なのは、このランダム性が選択プロセスで使用される一方で、ブロックマイニングの終了時には、賭け金額に基づいてステートを直接修正することで報酬が分配されることである。 ランダム性は、どのバリデーターが報酬を受け取る委員会の一員として選ばれるかを決定するものであり、分配される報酬の量を決定するものではない。

このメカニズムには、いくつかのセキュリティ上の配慮が欠かせない：

- リプレイ攻撃を防ぐために、各 `randomReveal` 値はブロックごとに一意でなければならない。
- ブロック提案者は `mixHash` の操作を防ぐために、正直に `randomReveal` を生成して提出しなければならない。
- 提案者は、他の参加者による予測と潜在的な操作を防ぐために、ブロック提案まで `randomReveal` を秘密にしておかなければならない。
- `randomReveal`は改ざんを防ぐために適切に署名され、検証されなければならない。

このメカニズムは、検証可能性を維持しながら、ブロックの生成と委員会の選択プロセスに予測不可能性を導入することを目的としている。 このシステムは、ランダム性を強化するための枠組みを提供するが、このランダム性を利用した提案者と委員会選出アルゴリズムの具体的な実装は、ネットワークの発展と改善に伴い、時間の経過とともに進化する可能性があることに注意することが重要である。

### 取引執行の制限<a id="restrictions-on-transaction-execution"></a>

現在、Kaia MainnetおよびKairos Testnetでは、取引の実行に以下の制限があります：

- 取引のgasPriceを設定することができますが、それはあなたが支払うことができる最大値であることを意味します。 実際のガス料金はネットワークによって決定される。 より詳細な情報は、[ガス料金の概要](../transaction-fees/transaction-fees.md#gas-price-overview) を参照。
- A block proposer shall not spend more than 250 ms in block execution. [計算コスト](./computation-cost.md)をご参照ください。
- トランザクションは計算コストの上限を超えて使用することはできない。 計算コスト](./computation-cost.md)をご参照ください。

### スマートコントラクト導入の制限<a id="restriction-on-smart-contract-deployment"></a>

Kaiaはスマート・コントラクトの展開にいくつかの制限を設けている：

- EIP-3541]([https://eips.ethereum.org/EIPS/eip-3541])に従って、コレハードフォークの時点で、0xEFバイトで始まる新しいコントラクトコードのデプロイは許可されていません。
- 上海ハードフォーク以来となっている：
  - initcodeの長さが49,152バイトを超える場合、新しい契約コードの展開は拒否される。
  - 新しい契約コードの長さは24,576バイトを超えてはならない。
  - これらの制限は[EIP-3860](https://eips.ethereum.org/EIPS/eip-3860)に基づいている。
  - スマートコントラクトアカウント（SCA）が外部所有アカウント（EOA）を上書きできるようになりました。

## データ構造<a id="data-structures"></a>

### アカウント<a id="account"></a>

Kaiaブロックチェーンプラットフォームのアカウントは、個人の残高やスマートコントラクトに関する情報を含むデータ構造です。 カイアは、より良いDXとUXを提供するためにアカウントモデルを再設計した。 アカウントモデルに関する詳しい情報は[こちら](../accounts.md)をご覧ください。

### トランザクション<a id="transaction"></a>

ブロックチェーンプラットフォームにおけるトランザクションとは、ブロックチェーンの状態を変更するノード間で送信されるメッセージのことである。 カイアはトランザクションモデルも再設計している。 トランザクションはそれぞれの目的に応じて様々なタイプに分けられ、パフォーマンスの最適化の可能性を見つけ、再設計されたアカウントモデルをサポートする。 トランザクションモデルに関する詳細な情報は[こちら](../../build/transactions/transactions.md)を参照されたい。

### 州<a id="state"></a>

Kaiaの**state**はアカウント状態のコレクションです。 この状態は、同じブロックを同じ順序で処理した場合、Kaiaノード間で同じでなければなりません。 Kaiaノード上でトランザクションが実行されると、状態が変更される。

下の表は、州に保存されている口座データを示している。

| コンポーネント     | 説明                                                                                              |
| :---------- | :---------------------------------------------------------------------------------------------- |
| nonce       | このアカウントが実行したトランザクション数を示す整数値。 トランザクションを提出するとき、トランザクションのnonceはアカウントのnonceと等しくなければならない。            |
| balance     | このアカウントが現在持っているKAIAの量を示す整数値。                                                                    |
| storageRoot | アカウント内のすべてのストレージ変数の値を含むMerkle Patricia Trieのルートの256ビットハッシュ。                                     |
| codeHash    | アカウントのバイトコードのハッシュ。  この値は不変であり、スマート・コントラクトの作成時にのみ設定される。  アカウントがEOAまたはEAの場合、この値はnullのハッシュに設定されます。 |

### ブロック<a id="block"></a>

ブロックチェーンは文字通りブロックの連鎖で構成されるため、ブロックはKaiaブロックチェーンの重要な要素である。 下の表は、ブロックの構成要素を示している。

| コンポーネント          | 説明                                                                           |
| :--------------- | :--------------------------------------------------------------------------- |
| baseFeePerGas    | ガス1本あたりの基本料金。 この値は、そのブロック番号に対して EthTxTypeCompatibleBlock が有効になっている場合にのみ返される。 |
| blockScore       | Former difficulty. BFTコンセンサスエンジンでは常に1                        |
| extraData        | このブロックの「追加データ」フィールド。                                                         |
| gasUsed          | このブロック内の全トランザクションによる使用済みガスの合計。                                               |
| governanceData   | RLPエンコードされたガバナンス・コンフィギュレーション                                                 |
| logsBloom        | ブロックのログのブルームフィルター。 ペンディングブロックの場合は `null` となる。                                |
| number           | ブロック番号。 ペンディングブロックの場合は `null` となる。                                           |
| parentHash       | ブロックの親ブロックのハッシュ。                                                             |
| proposer         | ブロック提案者の住所。                                                                  |
| receiptsRoot     | ブロックの受信トライのルート。                                                              |
| reward           | ブロック報酬を受け取るアドレス。                                                             |
| size             | このブロックのサイズをバイト単位で表した整数。                                                      |
| stateRoot        | ブロックの最終状態トライのルート。                                                            |
| totalBlockScore  | このブロックまでのチェーンのブロックスコアの合計を表す整数。                                               |
| transactionsRoot | ブロックのトランザクショントライのルート。                                                        |
| timestamp        | ブロックが照合された時のUnixタイムスタンプ。                                                     |
| timestampFoS     | ブロックが照合されたタイムスタンプの秒の単位。                                                      |
| transactions     | トランザクションオブジェクトの配列、または最後に与えられたパラメータに応じて32バイトのトランザクションハッシュ。                    |
| voteData         | 提案者のRLPエンコードされたガバナンス投票                                                       |

## スマート・コントラクトのライフサイクル<a id="smart-contract-lifecycle"></a>

スマートコントラクトは、Kaiaブロックチェーン上の特定のアドレスに存在するコ ード﹑機能﹑とデータ﹑の集合体で構成される。 契約アカウントは、互いにメッセージを受け渡しできるだけでなく、実質的にチューリング完全な計算を実行することができる。 コントラクトはブロックチェーン上にカイア固有のバイナリ形式で存在する。 現在、Kaiaは1つのバイナリ形式--Ethereum Virtual Machine ∮（EVM）バイトコード--をサポートしていますが、将来的には他の形式もサポートする予定です。

### スマートコントラクトの作成<a id="creating-smart-contracts"></a>

スマートコントラクトは、バイナリをデータとして空のアドレスにトランザクションを送信することで、Kaiaブロックチェーンに作成することができる。 バイナリは様々な形式がありますが、Kaiaは現在1つのバイナリ形式、EVMバイトコードをサポートしています。 この取引の実行には支払いが必要であることを指摘しておく。 送金者の口座残高は、取引がブロックに保存された後、取引手数料モデルに従って減額される。 しばらくすると、その取引はブロックに表示され、その状態がコンセンサスに達したことが確認される。 この時点で、スマートコントラクトはKaiaブロックチェーンに存在している。

### スマートコントラクトの実行<a id="executing-smart-contracts"></a>

スマートコントラクトの関数は、スマートコントラクトにトランザクションを送信するか、ノード内でローカルに関数を呼び出すことで呼び出し、実行することができる。 トランザクションを送信して関数が呼び出されると、その関数はトランザクションを処理して実行される。 これにはトランザクションを送信するためのKAIAのコストが発生し、その呼び出しはブロックチェーン上に永遠に記録される。 この方法で行われた呼び出しの戻り値は、トランザクションのハッシュである。 関数をローカルで呼び出すと、Kaia Virtual Machine ㈼ 内でローカルに実行され、関数の戻り値が返されます。 この方法で行われた呼び出しはブロックチェーンに記録されないため、コントラクトの内部状態を変更することはできない。 このタイプの呼び出しは定数関数呼び出しと呼ばれる。 この方法で行われた通話にはKAIAの料金はかからない。 定数関数呼び出しは、返り値のみに関心がある場合に使用されるべきであり、トランザクションは、契約状態に対する副作用に関心がある場合に使用されるべきである。

取引を通じてスマートコントラクトの機能を実行する際、ガスコストが発生する。 正確なガスコストは、機能によって実行されるオペレーションに依存し、EVMオペレーションごとに事前に定義されたガスコストに基づいて計算されます。

### スマートコントラクトの無効化<a id="disabling-smart-contracts"></a>

スマートコントラクトはKaiaブロックチェーンに存在するため、削除することはできません。 今のところ、KaiaはKaiaスマートコントラクトを無効にするために、Ethereumでスマートコントラクトを無効にするために使われているのと同じプロセスを採用している。 例えば、KLVMのKaiaスマートコントラクトは、Solidityの[`selfdestruct(address recipient)`](https://solidity.readthedocs.io/en/v0.5.6/introduction-to-smart-contracts.html#self-destruct)コール(またはKLVMのオペコード`SELFDESTRUCT`)を使用して無効にできます。 Kaiaチームは、他の実行環境のスマートコントラクトを無効にする方法も提供する予定である。

### スマートコントラクトのアップグレード<a id="upgrading-smart-contracts"></a>

Kaiaは、既存のブロックチェーンでの不便なユーザーエクスペリエンスに対処するために、デプロイされたスマートコントラクトをアップグレードする方法を提供する。 例えば、ブロックチェーン上に展開されたサービスはアップグレードが難しい。 Kaiaは、サービスプロバイダが配置されたサービスをアップグレードしたり、サービス情報を移行したりできるように、フレームワークとスマートコントラクトライブラリを提供する。 カイアは、以下の要件を考慮して、この機能を慎重に提供します。

- スマート・コントラクトをアップグレードできるのは、認可されたアカウントか、スマート・コントラクトの所有者のみでなければならない。
- アップグレードされたスマート・コントラクトは、古いスマート・コントラクトが保持する既存のデータを操作できるようにしなければならない。
- 古いスマート・コントラクトを参照する他のスマート・コントラクトは、それらのスマート・コントラクトの新しくアップグレードされたバージョンを使うかどうかを判断できるはずだ。
