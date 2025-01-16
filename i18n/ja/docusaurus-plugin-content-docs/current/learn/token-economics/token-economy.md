# トークン・エコノミー

## 概要<a id="overview"></a>

Klaytn’s token economy is designed to create sustainable funding structures for empowering its ecosystem, growth initiatives, and strategic investments. Many public blockchain projects have monetary systems that solely incentivize their node operators (miners or block producers), focusing only on the technical aspect of network maintenance. しかし、このような設計では、ネットワークのトークンエコノミーの成長に貢献したり、長期的な成長の見通しに投資したりする他のタイプの参加者にインセンティブを与えることの重要性を見逃してしまう。 In contrast, Klaytn’s token economy is designed to compensate more diverse forms of contributions from a wider range of participants, and has built-in funding structure to procure sustained resources to fuel future growth initiatives and strategically sourced investment projects in addition to maintaining its blockchain nodes.

## 資金調達の仕組み<a id="funding-structure"></a>

Klaytn’s funding structure runs continuously with Klaytn network’s block generation. With every new block, newly issued KLAY and the sum of transaction fees used in the block (collectively called “block reward”) are aggregated and distributed to the following three destination accounts in accordance to the predetermined ratio:

- 検証者とコミュニティ：50
  - ブロック提案者報酬：50％の20％（全体の10）
  - ステーク報酬50％の80％（全体の40）
- カイア・エコシステム・ファンド（KEF）：25
- カイア・インフラストラクチャー・ファンド（KIF）：25

9.6 KAIAは新しいブロックごとに鋳造される。 これは、年間約3億KAIAが鋳造されることを意味し、市場におけるKAIAトークン総量に対して年間5.2％のインフレ率に相当します（年間インフレ率は、カイア・ガバナンス・プロセスを通じて変更される可能性があります）。 取引手数料は、あらかじめ決められた手数料テーブルに従って請求され、計量される。 For detailed information about the transaction fees, please refer to [Transaction Fees](../transaction-fees/transaction-fees.md).

## Klaytn Governance Council Reward <a id="klaytn-governance-council-reward"></a>

Klaytn Governance Council is the collective group of Core Cell Operators (CCOs). Council members are responsible for maintaining Core Cells (CCs), which makes the Council an essential body in the Klaytn ecosystem responsible for providing the underlying infrastructure. To become a Council member, the candidate must undergo a qualification review by the Klaytn Governance Process and must stake at least 5 million KLAY. The Klaytn Governance Council Reward is a structure for incentivizing Council members to continue to provide a stable foundation for the Klaytn ecosystem.

### Klaytn Governance Council Reward Mechanism <a id="klaytn-governance-council-reward-mechanism"></a>

For each block in the Klaytn blockchain, a Committee is formed by randomly selecting members from the Klaytn Governance Council (GC). この委員会は、プロポーザーの役割を割り当てられた1名の委員で構成され、残りの委員はバリデーターの役割を担う。 Once a block is successfully created and appended to the Klaytn blockchain, the block reward is distributed among the Council members and various funds according to the previously mentioned ratios.

すべての評議会メンバーは、あるブロックの提案者に選ばれる確率が等しく、ブロック提案者報酬は評議会メンバー間で均等に分配される。 However, the GC staking reward is allocated proportionally based on the amount of KLAY staked by each member, minus the minimum requirement of 5 million KLAY. This means that Council members who stake a larger amount of KLAY beyond the minimum threshold will receive a greater share of the staking reward compared to those who stake less. As a result, Council members are incentivized to stake more KLAY to maximize their potential rewards from the GC staking award portion of the block reward distribution.

As long as the minimum 5 million KLAY staking requirement is met, Klaytn Governance Council members can freely stake or unstake his or her own KLAY. Staking information is updated every 86,400 blocks, and newly staked KLAY comes info effect two update cycles later from when the staking is completed. Withdrawing staked KLAY requires one week of delay to prevent malicious members from immediately exiting.

### 不品行な議員に対する罰則<a id="penalty-for-misbehaving-council-members"></a>

審議会議員は、以下に定義される不正行為を行った場合、罰則の対象となることがある。 In the future, more penalty rules can be established and refined through the Klaytn Governance Process.

安全性の失敗の原因：

- 提案者に選ばれた議員は、同じ高さに複数のブロックを作ることはできない。
- 提案者として選出された議員は、意図的に特定の取引を省略することはできない。

ライブネス失敗の原因：

- 提案者として選出された議員は、有効なブロックを作成しなければならない。
- バリデーターに選ばれた審議会委員は、提案者が提案したブロックを検証しなければならない。

## カイア・エコシステム・ファンド<a id="kaia-ecosystem-fund"></a>

カイア・エコシステム・ファンド（KEF）は、より高い透明性と検証可能性を実現するというカイアの使命を支援するために設立された。 ブロック作成時に発行されるKAIA総額の25％が出資される。

カイア・エコシステム基金は、以下のようなカイアの生態系を改善する活動に使用される：

1. **サービス貢献報酬（SCR）**：KEFは、エコシステムの価値向上に直接的または間接的に貢献した対価として、統合エコシステム上で活動するサービス開発者やユーザーに報酬を提供する。
2. **開発者コミュニティの構築**：KEFは、ハッカソン、開発教育プログラム、アカデミアとの共同研究、様々なDAOとのコラボレーションなど、様々なイニシアチブをサポートし、カイアの開発者コミュニティを育成・成長させます。
3. \*\*生態系サービスとインフラストラクチャーの育成KEFは、明確な有用性を持つサービスの開発と並行して、必要不可欠な生態系インフラを支援し、マーケティング支援を提供する。
4. **カイア・エコ・ファンド間接投資**：KEFは、暗号専門のVCに委託することで、間接的な中長期投資を行う。 その後の投資回収時に発生する利益の一部は、焼却されるか、カイアの生態系に還元される。
5. **ガバナンス委員会予算**：この予算は、ゲーミング、DeFi、コミュニティなど、特定のセクターの委員会の運営に割り当てられる。 これらの委員会は、それぞれの分野でカイア・ブロックチェーン・エコシステムを成長させることを目的としている。
6. **その他の生態系およびコミュニティ形成活動**。

カイア・エコシステム基金の運営は、ガバナンス評議会（GC）が【カイア・スクエア】(https://square.klaytn.foundation/Home)の公開フォーラムで資金使途を検討し、承認するというプロセスに従っている。 財団は、各カテゴリーについて四半期ごとに予算案を提出し、承認を得る。 承認された予算の範囲内で、具体的な使用はそれぞれGCによって再度検討され、承認される。 執行の詳細はすべて透明性をもって開示される。

KEFの使用に関する新たな提案は、GCを通じて行うことができ、個別の承認が必要となる。 より多くの生態系参加者がKEFの利用を効率的に提案し、参加できるような仕組みを開発する計画がある。 専門的かつ迅速な意思決定が必要なカテゴリーについては、別のガバナンス委員会が運営されることもある。

## カイア・インフラストラクチャー・ファンド<a id="kaia-infrastructure-fund"></a>

カイア・インフラストラクチャー・ファンド（KIF）は、これらの主要カテゴリーに焦点を当てた運用ファンドである：

1. **メインネットと基幹インフラの研究開発**：メインネットやインフラに関する最新技術の研究推進、財団主導のサービス開発、インフラ構築など。
2. **エコシステムの加速**：これには、トークンの交換、小規模なカイアブロックチェーンエコシステムパートナーへの資金援助、新しいGCメンバーの獲得、市場の流動性の提供などが含まれます。
3. **財団運営費**：これには、開発、経理、法務、ITインフラ運営、マーケティング、人件費などの運営費、財務管理費、資金調達費などが含まれる。

KIFは、ブロック創設時に発行されたKAIA総額の25％を資金源とする。 この予算は、詳細なカテゴリーごとに予算計画を事前に公表した後、財団が内部統制システムを通じて執行する。 執行の詳細はすべて透明性をもって開示される。

財団はKIFのために直接予算計画を立て、資金を執行する。 透明性のある執行を確保するため、財団は予算計画と執行の詳細を事前および事後に開示している。

## 財務省のリバランス

カイアのトークンエコノミーの柔軟性と適応性を確保するため、財務省のリバランスメカニズムが導入されている。 このプロセスは、生態系のニーズや市場環境の変化に応じて、自己資金を調整することを可能にする。

### 財務省のリバランス契約

トレジャリー・リバランス・コントラクトは、透明かつ安全な方法でリバランス・プロセスを管理するために設計されたスマート・コントラクトである。 契約は、初期化、登録、承認、確定といった段階を経て、有限状態マシンとして動作する。 この構造化されたアプローチにより、すべての利害関係者が変更を実施する前にレビューし、承認する機会が確保される。

この契約の主な特徴は以下の通り：

1. **柔軟な残高調整**：この契約は資金残高の増減をサポートし、包括的な財務管理を可能にする。
2. **リバランスタイミングの調整**：リバランスのブロック番号は、関連するハードフォークのブロック番号に合わせて設定することができ、ネットワークのアップグレードとの同期をより良くします。
3. **透明な実行**：TreasuryRebalance契約を通じて、リバランスプロセス全体がブロックチェーン上に記録され、エコシステムのオープン性と検証可能性へのコミットメントが維持されます。
4. **バリデータの合意**：リバランス・イベントは、ブロック・バリデータ間でコンセンサスが得られた後にのみ発生する。
5. **不変の記録**：実行後、リバランスイベントの詳細なメモがコントラクトにアップロードされ、将来の参照と監査のために変更の不変記録を提供します。

このトレジャリー・リバランスの仕組みにより、カイアは透明性と安全性の原則を守りながら、エコシステムの進化するニーズによりよく対応し、ダイナミックで応答性の高いトークンエコノミーを維持することができます。 スマート・コントラクト技術とコンセンサスに基づくアプローチを活用することで、国庫資金を調整するための構造化された検証可能な方法を提供し、カイア・ブロックチェーンがコミュニティの信頼を維持しながら状況の変化に適応できることを保証する。

For the information on the Treasury Rebalance contract addresses, please refer to [KIP-160](../governance/governance-by-kip.md#kip-160-an-update-on-treasury-fund-rebalancing) and [KIP-103](../governance/governance-by-kip.md#kip-103-treasury-fund-rebalancing).
