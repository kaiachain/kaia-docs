# スケーリング・ソリューション

カイアは堅牢なスケーリング・ソリューションを提供し、ネットワーク負荷が高い場合でも高いスループットと応答性を確保します。 これらのソリューションには、サービスチェーンと斬新なマルチチャネル・コミュニケーション・アーキテクチャが含まれる。

## サービスチェーン<a id="service-chain"></a>

KaiaのサービスチェーンはKaiaのメインチェーンから独立した補助ブロックチェーンで、
、特別なノード構成、カスタマイズされたセキュリティレベル、
、あるいはメインチェーン上にdAppを展開することが不便であったり経済的に不可能であったりするような特別に高いスループットを必要とする個々のdAppのために調整されています。

完全に分散化されたスケーリング・ソリューションがある一方で、チャレンジや終了といった難しいインターフェイスや、非即時的な最終性により、
、私たちはカイアのサービスチェーンにおいて、より良いユーザビリティ、
即時的な最終性、高いパフォーマンス、高い可用性のために完全な分散化を犠牲にすることで、異なるアプローチをとっている。

Kaiaサービスチェーンは、様々なサービス固有の目標（
）のために使用することができ、データアンカリング（ノード数が少ないことによるサービスチェーンのセキュリティ低下を補うために、サービスチェーンからメインチェーンにブロックハッシュ
を定期的に保存する）や
価値移転（Kaiaのネイティブな価値単位であるKAIAとdAppsによって発行されたトークン
のチェーン間移転）を含む複数の理由でメインチェーンに接続することができます。

## ネットワーク<a id="network"></a>

カイヤのメインチェーンに接続されたサービスチェーンを総称してサービスチェーンネットワークと呼ぶ。
サービスチェーンとメインチェーン間の接続方法は、カイアの将来のイテレーションで変更される可能性があることに注意してください。

図1. Kaia Main Chain and Service Chain](/img/learn/mainchain_servicechain.png)

図1は、様々なビジネスニーズを満たすために利用されているサービスチェーンのネットワークトポロジーを示しており、
、Kaiaメインチェーンと接続され、Kaiaネットワークを拡張している。

図2. Main Chain and Service Chain Connection using Main/Sub-Bridge Model](/img/learn/sc_connection.png)

図2は、SCN（Service Chain Consensus Node）がKaiaメインチェーンのEN（Endpoint Node）
、サービスチェーンの機能を使用する際にメイン/サブブリッジ・モデルを使用して直接接続された例を示している。

## 特徴<a id="features"></a>

サービスチェーンは、データ整合性メカニズムを提供し、異なるチェーン間でのトークン転送をサポートすることで、Kaiaを拡張・増強する。

### データ・アンカー<a id="data-anchoring"></a>

データの整合性を保つために、サービスチェーンはすべてのサービスチェーンのブロックハッシュをメインチェーンへの特別なトランザクションとして自動的にアンカーすることができる。
このデータ・アンカリングによって、サービス・チェーンのデータは一度作成されると変更できないことをサービス利用者に保証することができる。

### 価値移転<a id="value-transfer"></a>

サービスプロバイダー（SP）がチェーン間でサービスユーザーや価値を簡単に移行できるように、
、KAIA（Kaiaのネイティブな価値単位）やdAppsが発行したKaiaトークンなどのトークンを異なるチェーン間で移行できるようにします。
ユーザーは、ブリッジコントラクトと呼ばれる特別なコントラクトにトランザクションを送信することで、他のチェーンへのトークン転送を簡単にリクエストできる。

## マルチチャンネル・コミュニケーション

カイアはマルチチャネル通信アーキテクチャを採用し、特にトランザクション量が多い時期のネットワーク・パフォーマンスと耐障害性を強化している。 異なるメッセージタイプを専用の通信チャネルに分離することで、Kaiaはネットワークの輻輳が激しい場合でも、効率的なブロック伝搬とコンセンサスを維持することができる。

### アーキテクチャ

多チャンネル・サーバー](/img/learn/multichannel.png)

\*多チャンネル接続

シングルチャンネルサーバー](/img/learn/singlechannel.png)

\*シングルチャンネル接続

### 設定モード

- \*\*マルチチャンネル：2つのポートを使用。 `kend.conf` の `MULTICHANNEL=1` により、`kend` ではデフォルトで有効になっている。 MULTICHANNEL=0`で無効にする。 `port`と`--subport\` フラグを使ってポートをカスタマイズする。
- **シングル・チャンネル：** 1つのポートを使用（デフォルトは32323）。 MULTICHANNEL`が設定されていないか、`0\`に設定されているときに有効。

### マルチチャネルの仕組み

マルチチャンネルは、異なるメッセージタイプを専用ポートに分離する：

- **メインポート:** ブロック関連メッセージ（ハッシュ、ヘッダー、ボディ、レシートのリクエスト/レスポンス）とコンセンサスメッセージ（リクエスト、準備、準備、コミット、RoundChange）を扱う。 メッセージの意味は[PBFT](./consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance)を参照されたい。
- \*\*トランザクション・メッセージを処理する。

この分離により、ネットワークの安定性が向上する。片方のポートに障害が発生しても、もう片方のポートは動作を継続する。 例えば、サブポート（通常、高トラフィック時に輻輳する）に障害が発生しても、メインポートは必要不可欠なブロックとコンセンサスのオペレーションを維持する。

### 接続の確立

- **マルチチャンネルからマルチチャンネルへ:** 両方のポートを使用。
- **その他の場合（マルチチャンネルからシングルチャンネル、シングルチャンネルからシングルチャンネル）：** シングルポートを使用。

ノードがサブポートを指定せずに接続しようとすると、最初は1つのポートを使って接続する。 ハンドシェイク中、相手がマルチチャンネルであれば、両方のポートを使って接続が再確立される。

### ポート構成 (KNI)

詳しくは[KNIスキーム](./kni.md)を参照。 デフォルトのポートは32323（メイン）と32324（サブ）である。

### KNIとの統合

マルチチャンネルは、ノード検出と接続のためにKNIと統合されています。 KNI URLはメインポートとサブポートの両方を指定できる。

### インプリメンテーション・ノート

カイアのマルチチャンネル実装は、オリジナルの仕様からわずかに逸脱している。 この逸脱の詳細は本書の範囲外であるが、ネットワーク・コミュニケーションの強化と堅牢性という基本原則は、カイアの運営の中心であることに変わりはない。 この情報は主にノードのオペレーターや開発者に関連するものである。

要約すると、マルチチャンネルはメッセージ・トラフィックを分離し、効率性と回復力を向上させることによって、カイアのネットワークを強化する。 ノードオペレータに高度な設定オプションを提供する一方で、システムは一般ユーザには透過的なままである。