# カイアの概要

Kaiaは高度に最適化された<LinkWithTooltip to="../misc/glossary#bft-based-public-blockchain" tooltip="A blockchain that ensures consensus even if up to 1/3 of nodes act maliciously,<br /> using Byzantine Fault Tolerance (BFT) algorithms to maintain network integrity."> BFTベースのパブリック・ブロックチェーンで </LinkWithTooltip>、エンタープライズ・グレードの信頼性と性能基準を満たすように設計されている。 この概要では、カイアのアーキテクチャ、機能、エコシステムについて詳しく説明する。

## 主な設計目標

カイア・ブロックチェーンが目指すもの：

- 取引の即時確定を実現する。
- 実際のユースケースに対応した高速トランザクション処理を提供。
- ブロックチェーン・アプリケーションの実行コストを下げる。
- エンドユーザーの参入障壁を減らす。
- 様々な産業への技術導入を容易にする。

## コア仕様

カイアはブロックチェーンを提供する：

- 1秒間のブロック生成と確認時間。
- 毎秒4,000トランザクションの処理能力。
- イーサリアムの約1/10の低ガス価格。
- EVM（イーサリアム仮想マシン）の互換性、Solidityコントラクトのサポート。
- <LinkWithTooltip to="../misc/glossary#kaia-governance-council-kgc" tooltip="A consortium governing Kaia blockchain development and operations.">カイア・ガバナンス・カウンシルを</LinkWithTooltip>形成する世界中の評判の高い企業によるガバナンス。

## ネットワーク・アーキテクチャ

カイアのネットワークは3つの論理的なサブネットワークに構成されている：

![Kaia Ecosystem and its Logical Subnetworks (CCN, ENN, SCN)](/img/learn/klaytn_network_overview.png)

1. **コアセルネットワーク（CCN）**：コアセル（CC）](../nodes/core-cell)から構成され、トランザクションの検証、実行、ブロック生成を担う。

2. **エンドポイント・ノード・ネットワーク（ENN）**：エンドポイントノード(EN)](../nodes/endpoint-node)で構成され、RPC APIリクエストを処理し、サービスチェーンのデータを処理する。

3. **[Service Chain](../nodes/service-chain) Network (SCN)**：dAppsが独立して運営する補助ブロックチェーンで、ENを介してメインチェーンに接続されている。

### ノードの種類

![Kaia Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](/img/learn/klaytn_network_node.png)

1. **コアセル（CC）**：1つのコンセンサスノード（CN）と2つのプロキシノード（PN）で構成される。

   - **コンセンサス・ノード（CN）**：ブロック生成に参加する。
   - **プロキシノード(PN)**：ネットワークインタフェースを提供し、トランザクション要求を送信し、ブロックを伝搬する。

2. **エンドポイントノード（EN）**：ネットワークのエンドポイントとして機能し、APIリクエストやデータ処理を処理する。

3. \*\*ブートノード新しいノードがネットワークに参加するのを助けるためにカイアが運営する特別なノード。

## コンセンサス・アルゴリズム

KaiaはIstanbul BFTの最適化バージョンを使用しており、ブロックチェーン特有の修正を加えたPBFT（Practical Byzantine Fault Tolerance）を実装している。 コンセンサス・プロセスには以下が含まれる：

1. 検証可能ランダム関数（VRF）を用いた委員会<LinkWithTooltip to="../misc/glossary#proposer" tooltip="A randomly chosen consensus node for block creation.">（提案</LinkWithTooltip>者と<LinkWithTooltip to="../misc/glossary#validator" tooltip="A node verifying data, ensuring efficient block processing.">検証者</LinkWithTooltip>）の選出。
2. 選出された提案者によるブロック生成。
3. 委員会によるブロック確認と署名。

この[コンセンサス・メカニズム](consensus-mechanism.md)により、カイアは毎秒4,000トランザクションを処理し、瞬時にトランザクションを確定するという高いパフォーマンスを達成することができる。

## ブロックの生成と伝播

- ブロックは1秒間隔を目標にラウンドごとに生成される。
- 提案者と委員会の選択はランダムだが決定論的である。
- ブロックには委員の3分の2以上の署名が必要。
- ブロックとトランザクションの伝搬チャネルを分ける（マルチチャネルアプローチ）ことで、ネットワークの輻輳を管理する。

## カイア仮想マシン（KVM）

カイア仮想マシン（KVM）は、スマートコントラクト実行のための堅牢な環境を提供する：

- イーサリアム仮想マシン（EVM）に基づく。
- すべてのEVMオペコードとカイア固有のプリコンパイル契約をサポート。
- SolidityおよびEthereum開発ツール（Remix、Hardhat、Foundryなど）との互換性。
- 開発者はEthereumスマートコントラクトを最小限の修正でKaiaに移植できる。

## セキュリティ対策

カイアはいくつかのセキュリティ対策を実施している：

- VRFはブロック提案者をランダムに選択するため、プロセスに予測不可能性が加わる。
- バリデータ・キーとリワード・キーを分離し、バリデータをキーの盗難から保護する。
- 全委員が提案されたブロックの署名を検証する、透明性のあるブロック検証プロセス。

## 相互運用性

カイアは他のブロックチェーン・ネットワークとシームレスに相互作用するように設計されている：

- <LinkWithTooltip tooltip="A blockchain that can run smart contracts and <br/> interact with the Ethereum Virtual Machine(EVM)">EVMと互換性が</LinkWithTooltip>あり、イーサリアムのスマートコントラクトを簡単に導入できる。
- 他のEVM-SDKベースのチェーンと相互運用できるように設計されています。
- クロスプラットフォームのトランザクションとスマートコントラクトの実行をサポート。

## トークン・エコノミー

カイアのネイティブ・トークンである[KAIA](kaia-native-token.md)は、ブロックチェーンの経済において中心的な役割を果たしている：

- KAIAトークンは新しいブロックごとに自動的に発行される。
- 当初の年間インフレ率：5.2%.
- ブロック報酬は以下のように分配される：
  - CCOとコミュニティ：50％（ブロッククリエイター報酬20％、ステーキング報酬80）
  - KEF（カイア・エコシステム・ファンド）：25%
  - KIF（カイア・インフラストラクチャー・ファンド）：25%

この流通モデルは、カイアのエコシステムの成長と発展をサポートしながら、ネットワークへの参加にインセンティブを与える。

## ガバナンス

カイアは、公正かつ包括的であるよう設計されたオン・チェーン・ガバナンス・システムを導入している：

- 議決権はKAIAトークンの賭け額に比例する。
- 選挙権に上限を設けることで、少数意見の抑圧を防ぐ。
- 議決権の委任が認められる。
- すべてのガバナンス提案はオンチェーンで記録され、透明性が確保される。

## 監査可能性と透明性

カイアは透明性と監査可能性を優先している：

- すべてのトランザクションは、不変で検証可能な状態変更の履歴を提供する。
- ブロックチェーン探索のための2つの主要ツール：
  - [Kaiascope](https://kaiascope.com/)：包括的なブロックチェーンエクスプローラ。
  - [Kaiascan](http://kaiascan.io/)：ブロックチェーンのデータを素早く検索できるユーザーフレンドリーなインターフェース。
- Square」投票プラットフォームは、すべての経費と四半期ごとの既知の取引を開示する。

## ネットワーク監視

最適なパフォーマンスと信頼性を確保するために、カイアは以下を実施している：

- ネットワークの輻輳を管理するためのマルチチャネルアプローチ。
- 全バリデーター専用のネットワーク監視。
