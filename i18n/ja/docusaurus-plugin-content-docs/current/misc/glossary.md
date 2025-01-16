# 用語集

This glossary provides explanation on technical terms specific to the Klaytn Blockchain. It stands as your goto for understanding numerous terms you will encounter while exploring Klaytn documentation, guides and tutorials.

### アンカー

ブロックチェーンの外部に保存されているデータへの暗号的に安全な参照。 アンカーは、異なるシステムのデータをリンクさせたり、特定の時点におけるデータの存在を改ざんできない証拠とするために使用することができる。

### アンカーリング

ブロックチェーンにアンカーを保存するプロセス。 これは、外部データのハッシュを含むトランザクションを作成するか、外部データを参照するスマートコントラクトを作成することで可能である（例えば、[サービスチェーンにおけるアンカリング](../nodes/service-chain/configure/anchoring.md)）。

### BFTベースのパブリック・ブロックチェーン

これはビザンチン・フォールト・トレランス（BFT）を利用したブロックチェーンで、一部のノードが故障したり悪意のある行動をとったりしてもコンセンサスに達することができる。 このシステムは、ネットワークの完全性を損なうことなく、不正または不誠実な振る舞いをするノードを最大で!まで扱えるように設計されたアルゴリズムに依存している。

### ブロックエクスプローラ

ブロックチェーン上のデータを閲覧・検索できるウェブベースのツール。 ブロックエクスプローラは通常、ブロックの高さ、ブロックハッシュ、トランザクションハッシュ、トランザクションの送信者と受信者、トランザクションの金額、トランザクションのステータスなどの情報を表示する。

カイアで利用可能なブロック・エクスプローラーは、[Kaiascope](../build/tools/block-explorers/kaiascope.md)と[Kaiascan](https://www.kaiascan.io/)です。

### コアセル（CC）

An entity in the Klaytn blockchain architecture that is responsible for executing transactions and generating blocks. コアセルは通常、コンセンサスノードと複数のプロキシノードで構成される。

コンセンサスノード(CN)](#consensus-node-cn)、[プロキシノード(PN)](#proxy-node-pn)も参照。

### コアセルノードネットワーク（CCN）

相互接続されたコアセルノードのグループ

### コンセンサスノード（CN）

A node that is responsible for generating and propagating blocks, and for reaching consensus on the state of the Klaytn blockchain. コンセンサスノードは提出されたトランザクションを検証し、有効なトランザクションを実行する。

### エンドポイントノード（EN）

A node that serves as an entry point for service chains and DApps to interact with the Klaytn blockchain through its exposed RPC APIs. エンドポイントノードはブロックチェーン台帳全体を同期し、プロキシノードを介さずにブロックチェーンのデータを読んだり、ネットワークに直接トランザクションを送信したりできる。

### エンドポイントノードネットワーク（ENN）

相互に接続されたエンドポイントノードのグループ

### 外部所有口座（EOA）

秘密鍵によって管理されるブロックチェーン上のアカウント。 秘密鍵はユーザーが保持し、トランザクションに署名するために使用される。 EOAはブロックチェーン上で最も一般的なタイプのアカウントであり、個人や企業がブロックチェーンとやり取りするために使用される。

スマートコントラクトアカウント（SCA）](#smart-contract-account-sca)も参照。

### 手数料委任

一部のブロックチェーンネットワークでは、ユーザーが取引手数料の支払いを代行する別のアカウントを指名できる仕組み。 これにより、利用者は自分の口座残高から直接手数料を支払うことなく、取引を提出し、処理することができる。

### ガバナンス・カウンシル（GC）

ブロックチェーン・ネットワークの監督と意思決定の権限を確立し、維持するために結成されたグループまたは組織。 ブロックチェーンガバナンス評議会は通常、運用手順の確立、紛争の解決、プロトコルのアップグレードの承認、ネットワーク内のすべての利害関係者の利益の代表といったタスクを定義する。

### プロセス間通信

1つまたは複数のコンピュータ内の2つまたは複数のプロセス間でデータを交換するための一連の技術。 オペレーティング・システムや分散システムの基本的な部分であり、ウェブ・サーバー、データベース、グラフィカル・ユーザー・インターフェースなど、さまざまな種類のソフトウェアで使用されている。

### 惑星間ファイルシステム（IPFS）

ピアツーピアの分散ファイルシステムで、ユーザーがファイルを分散して保存・共有できる。 IPFSは、各ファイルを一意に識別するためにコンテンツアドレス付けスキームを使用し、ノードの分散ネットワークにファイルを格納する。

### カイア・エコシステム・ファンド（KEF）

A fund established by the Klaytn Foundation to support initiatives that contribute to the growth and development of the Klaytn blockchain ecosystem. KEFは、カイアの利用拡大と普及に取り組むプロジェクト、組織、個人に助成金と財政支援を提供している。 KEFの目標は、資金提供されたイニシアチブを通じて、カイア周辺のイノベーションとコミュニティの成長を促進することである。

### Klaytn endpoint node (KEN)

エンドポイントノード(EN)](#endpoint-node-en)を参照のこと。

### カイア・インフラストラクチャー・ファンド（KIF）

A reserve fund established by the Klaytn Foundation to support its operating expenses and long-term initiatives. KIFは、研究、ビジネス開発活動、教育プログラムなどを通じて、カイア・ブロックチェーン・プロトコルとエコシステムをさらに発展させ、強化するための財団の活動資金を援助する。

### Klaytn Governance Council (KGC)

A council of organizations that are responsible for governing the Klaytn blockchain. The GC members are selected by the Klaytn Foundation and are required to operate a consensus node on the Klaytn network. The GC is responsible for making decisions about the development and operation of the Klaytn blockchain, including upgrades, partnerships, and ecosystem development initiatives.

### Klaytn Improvement Proposal (KIP)

A design document providing information to Klaytn stakeholders regarding new features or processes for the Klaytn blockchain network. KIPは、プロトコルのアップグレードや技術革新を提案、検討、採用するための一貫した管理されたメカニズムを提供することを目的としている。 They allow advocates to collaborate with the Klaytn community to refine any potential protocol upgrades before being considered for inclusion in the software.

KIPの代表的な例としては、[KIP-7](http://kips.klaytn.foundation/KIPs/kip-7)、[KIP-17](http://kips.klaytn.foundation/KIPs/kip-17)、[KIP-37](http://kips.klaytn.foundation/KIPs/kip-37)などがある。

### Klaytn State

This is the world state of accounts in Klaytn containing the balances, storage variables of the account and the hash of the code or bytecode depending on if the account is an EOA or SCA.

### カイア仮想マシン（KVM）

A virtual state machine that executes Klaytn smart contracts. イーサリアム仮想マシン（EVM）から派生した準チューリング完全スタックベースの仮想マシンである。 KVMはカイア・ブロックチェーン上のスマート・コントラクトの処理と実行を担う。

### Klaytn network identifier (KNI)

A unique resource identifier scheme to identify a Klaytn node. nodeID、ホスト名、ポート、ディスクポートで構成される。

### Kairos

The public testnet of the Klaytn platform. It is used by developers to test and verify their applications before deploying them to the Cypress mainnet.

### 提出者

ブロック生成の各ラウンドでコンセンサスノード（CN）に割り当てられる役割。 提案者はランダムに、しかし決定論的に次のブロックを作るために選ばれる。 The probability of a CN being enlisted as the proposer is determined by the amount of Klaytn tokens, or KLAY, that the CN stakes.

### プロキシノード

エンドポイントノード（EN）からコンセンサスノード（CN）へのトランザクションの中継を担当するノード。 ENとCN間の直接的な通信負荷を軽減することで、ネットワークの性能向上を支援する。

### 再帰長プレフィックス (RLP)

コンピュータネットワークにおいて、プレフィックスの長さがアドレス情報の一部として含まれるアドレスプレフィックス形式。ルートごとにプレフィックスの長さを別々に保存する必要がなくなるため、より効率的なルーティングが可能になる。 Klaytn uses recursive-length prefix to represent blockchain addresses.

### リモートプロシージャコール

あるコンピューター上のプログラムが、ネットワーク内の別のコンピューター（多くの場合リモート）にあるプログラムからコードを実行したりサービスを要求したりできるようにする通信プロトコル。

### ソウルバインドトークン（SBT）

Web3エコシステムにおける個人のアイデンティティと実績を表す譲渡不可能なトークン。 これは、特定の個人や暗号ウォレットに恒久的に結び付けられる非可溶性トークン（NFT）の一種です。

### スマートコントラクトアカウント（SCA）

スマートコントラクトによって管理されるブロックチェーン上のアカウント。 スマートコントラクトは、買い手と売り手の間の契約条件がコード行に直接書き込まれた、自己実行型の契約である。 SCAはブロックチェーン上の取引や合意を自動化するために使用される。

外部保有口座（EOA）](#externally-owned-account-eoa)も参照のこと。

### サービスチェーン

A sidechain or auxiliary blockchain that is connected to the Klaytn mainnet. サービス・チェーンは、即時のファイナリティ、クロス・チェーンでのトークン転送、メイン・チェーンへのデータ・アンカリングなど、さまざまなアプリケーションや業界の特定のニーズを満たすように設計されている。

### サービスチェーンコンセンサスノード（SCN）

A node that is responsible for participating in the consensus process in a Klaytn service chain.

コンセンサスノード(CN)](#consensus-node-cn)、[サービスチェーン](#service-chain)も参照。

### サービスチェーンエンドポイントノード（SEN）

A node in a Klaytn service chain that provides a public interface for interacting with the service chain.

エンドポイントノード(EN)](#endpoint-node-en)、[サービスチェーン](#service-chain)も参照のこと。

### 国家移動

このプロセスでは、不要なデータや古いデータをブロックチェーンから削除することで、必要なストレージ容量を減らし、効率を向上させる。

### トランザクションプール

ネットワーク内で次のブロックに組み入れられるのを待つ保留中のトランザクションやキューに入れられたトランザクションを管理するための重要なコンポーネント。

### バリデータ

新しいブロックに含まれるデータの正確性を検証し、ネットワーク全体でブロックが効率的に処理されるようにするノード。 In Klaytn's permissionless validation structure, anyone can act as a block validator if they meet certain qualifications while maintaining the existing Governance Council structure and roles.
