# スケーリング・ソリューション

カイアは堅牢なスケーリング・ソリューションを提供し、ネットワーク負荷が高い場合でも高いスループットと応答性を確保します。 これらのソリューションには、サービスチェーンと斬新なマルチチャネル・コミュニケーション・アーキテクチャが含まれる。

## サービスチェーン<a id="service-chain"></a>

Service chains in Klaytn are auxiliary blockchains independent from the Klaytn main chain,
tailored for individual dApp requiring special node configurations, customized security levels,
or exceptionally high throughput that makes deploying the dApp on the main chain inconvenient or economically infeasible.

While there are fully-decentralized scaling solutions, due to their difficult interfaces such as challenge or exit and non-immediate finality,
we take a different approach in Klaytn’s Service Chain by sacrificing the full decentralization for better usability,
instant finality, high performance, and high availability.

Klaytn service chains may be used for various service-specific goals,
and can connect to the main chain for multiple reasons including data anchoring (periodic storing of block hashes
from the service chain onto the main chain to compensate for the decreased security of the service chain due to the smaller number of nodes) or
value transfer (interchain transfer of KLAY, Klaytn’s native unit of value, and the tokens
issued by dApps).

## ネットワーク<a id="network"></a>

Service chains connected to Klaytn main chain are collectively called Service Chain Network.
Note that the method of connection between service chains and the main chain may change in Klaytn’s future iterations.

図1. Klaytn Main Chain and Service Chain](/img/learn/mainchain_servicechain.png)

Figure 1 shows the network topology of service chains being used to meet various business needs, connected
with Klaytn main chain to expand the Klaytn network.

図2. Main Chain and Service Chain Connection using Main/Sub-Bridge Model](/img/learn/sc_connection.png)

Figure 2 shows an example of SCN (Service Chain Consensus Node) connected directly with Klaytn main chain’s EN (Endpoint Node)
using a main/sub-bridge model in using the service chain’s features.

## 特徴<a id="features"></a>

Service Chain expands and augments Klaytn by providing a data integrity mechanism and supporting token transfers between different chains.

### データ・アンカー<a id="data-anchoring"></a>

データの整合性を保つために、サービスチェーンはすべてのサービスチェーンのブロックハッシュをメインチェーンへの特別なトランザクションとして自動的にアンカーすることができる。
このデータ・アンカリングによって、サービス・チェーンのデータは一度作成されると変更できないことをサービス利用者に保証することができる。

### 価値移転<a id="value-transfer"></a>

To help the service providers (SPs) to easily migrate service users and values across chains,
transferring tokens, such as KLAY (Klaytn's native unit of value) and Klaytn tokens issued by dApps, between different chains can be enabled.
ユーザーは、ブリッジコントラクトと呼ばれる特別なコントラクトにトランザクションを送信することで、他のチェーンへのトークン転送を簡単にリクエストできる。

## マルチチャンネル・コミュニケーション

カイアはマルチチャネル通信アーキテクチャを採用し、特にトランザクション量が多い時期のネットワーク・パフォーマンスと耐障害性を強化している。 異なるメッセージタイプを専用の通信チャネルに分離することで、Kaiaはネットワークの輻輳が激しい場合でも、効率的なブロック伝搬とコンセンサスを維持することができる。

### 建築

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

- \*\*マルチチャンネルからマルチチャンネルへ:\*\*両方のポートを使用。
- \*\*その他の場合（マルチチャンネルからシングルチャンネル、シングルチャンネルからシングルチャンネル）： \*\* シングルポートを使用。

ノードがサブポートを指定せずに接続しようとすると、最初は1つのポートを使って接続する。 ハンドシェイク中、相手がマルチチャンネルであれば、両方のポートを使って接続が再確立される。

### ポート構成 (KNI)

詳しくは[KNIスキーム](./kni.md)を参照。 デフォルトのポートは32323（メイン）と32324（サブ）である。

### KNIとの統合

マルチチャンネルは、ノード検出と接続のためにKNIと統合されています。 KNI URLはメインポートとサブポートの両方を指定できる。

### インプリメンテーション・ノート

カイアのマルチチャンネル実装は、オリジナルの仕様からわずかに逸脱している。 この逸脱の詳細は本書の範囲外であるが、ネットワーク・コミュニケーションの強化と堅牢性という基本原則は、カイアの運営の中心であることに変わりはない。 この情報は主にノードのオペレーターや開発者に関連するものである。

要約すると、マルチチャンネルはメッセージ・トラフィックを分離し、効率性と回復力を向上させることによって、カイアのネットワークを強化する。 ノードオペレータに高度な設定オプションを提供する一方で、システムは一般ユーザには透過的なままである。
