---
sidebar_label: カイア対イーサリアム
---

# カイアとイーサリアムの比較：ビルダーのための比較

この包括的な比較では、カイア・ブロックチェーンとイーサリアムの主な相違点と類似点を明らかにし、開発者とユーザーに移行の要件と機会を理解するために必要な必須情報を提供します。

## 概要

| イーサリアム                       | カイア                                                                                 |
| :--------------------------- | :---------------------------------------------------------------------------------- |
| 確立されたレイヤー1、大規模なエコシステムとコミュニティ | KlaytnとFinschiaの合併により誕生したEVM互換のレイヤー1。 アジアでのWeb3導入、エンタープライズグレードの信頼性、高いパフォーマンスにフォーカス。 |

## ユーザーの視点

| 特徴                         | イーサリアム                            | カイア                                                                                                                                                                                 |
| :------------------------- | :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **トランザクション・パー・セカンド（TPS）**。 | \~15～30TPS（変動あり） | 最大4,000TPS。 リアルタイムのTPSはイーサリアムよりかなり高いと報告されている。                                                                                                                                       |
| \*\*ブロックタイム                | \~12秒            | ブロック生成時間1秒。                                                                                                                                                                         |
| \*\*ファイナリティ                | \~13～15分（2エポック）  | 即決（[PBFTベースのコンセンサス](https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-)）。                                                                                 |
| **取引手数料（ガス）**\*。           | バリアブル、EIP-1559オークションモデル           | [EIP-1559 互換ダイナミック料金モデル](https://github.com/kaiachain/kips/blob/main/KIPs/kip-162.md)と[料金委任](https://docs.kaia.io/build/transactions/fee-delegation/)により、アプリケーションはユーザー料金を支払うことができる。 |
| \*\*ウォレットの互換性              | MetaMask、Ledger、Trust Walletなど。   | イーサリアムのウォレットと互換性がある（例えば、RPC設定によるMetaMask）。 カイア専用のウォレット（例えば、[カイアウォレット](https://docs.kaia.io/build/tools/wallets/kaia-wallet/)）。                                                      |
| \*\*トークン                   | 東北大学                              | [KAIA](https://docs.kaia.io/learn/token-economics/kaia-native-token/)                                                                                                               |

## 開発者の視点

| 特徴              | イーサリアム                                                                                                                                             | カイア                                                                                                                                                                                                                                                                                  |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \*\*仮想マシン       | イーサリアム仮想マシン（EVM）                                                                                                                                   | EVM互換([Kaia Virtual Machine ˶- KVM](https://docs.kaia.io/learn/smart-contracts/#kaia-virtual-machine-kvm-powering-smart-contracts-), based on EVM)であり、最新のイーサリアムオプコードをサポートするために継続的に更新されるため、Solidityコントラクトは変更なしで実行されます。                                             |
| **スマートな契約言語**   | ソリディティ、ヴァイパー、ユルなど。                                                                                                                                 | ソリディティ、ヴァイパー、ユル、ハフ。                                                                                                                                                                                                                                                                  |
| \*\*プリコンパイル     | 標準的なイーサリアムのプリコンパイル                                                                                                                                 | 標準的なEVMオペコードと追加の[Kaia-specific precompiled contracts](https://docs.kaia.io/learn/smart-contracts/precompiled-contracts/)をサポートしています。                                                                                                                                                  |
| \*\*開発ツール       | **スマートコントラクト開発ツール:** Remix, Hardhat, Foundry, etc. **Web3ライブラリ:** Ethers、Web3js、Web3j、Web3py、Viem | \*\*スマート・コントラクト開発ツール: \*\* [イーサリアムツールとの互換性](https://docs.kaia.io/build/smart-contracts/ide-and-tools/) (Remix、Hardhat、Foundryなど) \*\*Ethers、Web3js、Web3j、Web3py、Viemと互換性があります。 カイアは[独自のSDK拡張機能](https://docs.kaia.io/references/sdk/)を提供しています。  |
| \*\*取引の種類       | レガシー、EIP-2930、EIP-1559、EIP-4844など。                                                                                                                 | 主要な[Ethereumトランザクションタイプ](https://docs.kaia.io/build/transactions/ethereum/)（Legacy、EIP-2930、EIP-1559）に加え、[手数料委任](https://docs.kaia.io/build/transactions/fee-delegation/)や[部分的手数料委任](https://docs.kaia.io/build/transactions/partial-fee-delegation/)といったネイティブトランザクションタイプもサポートしています。 |
| \*\*ガス・メカニズム    | EIP-1559（基本料金＋優先料金オークション）                                                                                                                          | EIP-1559互換の[動的ガス料金モデル](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-)と、トークン・ベースの料金支払いのための[ガス抽象化](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)およびシームレスなSDK互換のための[EIP-7623互換のcalldata価格設定](https://kips.kaia.io/KIPs/kip-223)。                           |
| \*\*アカウントモデル    | 外部所有口座（EOA）、契約書                                                                                                                                    | 標準的なイーサリアムアカウントと、EOAにスマートコントラクトコードを持たせる[EIP-7702](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)をサポートします。 柔軟なキー管理などの機能を備えたネイティブな[アカウント抽象化](https://docs.kaia.io/learn/accounts/#multiple-key-pairs-and-role-based-keys-)を備えています。                                             |
| **RPC API**     | 標準イーサリアムJSON-RPC API (`eth_` 名前空間)                                                                                              | [ほぼ互換性がある](https://docs.kaia.io/references/public-en/)。 Ethereum との互換性のために `eth_` 名前空間を提供する。 kaia_\`名前空間はKaia固有の機能を提供する。                                                                                                                                        |
| \*\*ウェブソケット     | サポート                                                                                                                                               | [サポート済み](https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints)                                                                                                                                                                                               |
| \*\*コンセンサス      | プルーフ・オブ・ステーク（ガスパール：Casper-FFG  \+ LMD-GHOST）                                                                                                      | PBFTの変形であるイスタンブールBFT（IBFT）の最適化版。 提案者選定のための検証可能ランダム関数(VRF)】(https://docs.kaia.io/learn/consensus-mechanism/#consensus-mechanism-in-kaia-)を使用。                                                   |
| \*\*ノード・アーキテクチャ | 執行クライアント、コンセンサス・クライアント                                                                                                                             | [マルチレイヤー](https://docs.kaia.io/learn/#network-architecture)：コアセル(CC)とコンセンサスノード(CN)およびプロキシノード(PN)、エンドポイントノード(EN)、サービスチェーンノード。                                                                             |
| \*\*ガバナンス       | 主にオフチェーン、コミュニティ主導。                                                                                                                                 | [オンチェーン・ガバナンス](https://docs.kaia.io/learn/governance/)には、信頼できる組織で構成されるガバナンス協議会(GC)が含まれる。 賭けられたKAIAに比例した議決権。                                                                                                                                                       |

## 変わらないもの

- **高いEVM互換性：** Kaiaの強力なEVM互換性は、ほとんどのEthereum dApp、ツール（Hardhat、Foundry、Remix）、Solidityコントラクトが最小限の変更で移行または使用できることを意味します。 これが最大の「変わらない」点だ。
- **馴染みのある開発ツールと言語:** Solidityは依然として主要なスマート・コントラクト言語です。 Remix、Hardhat、Foundryのようなイーサリアム開発ツールは、ほぼ使用可能だ。
- **標準的なイーサリアムウォレットとの互換性:** MetaMaskのような標準的なイーサリアムウォレットは、RPC URLとChainIDを変更することで使用できます。
- \*\*eth_` RPC名前空間:** RPC APIのための`eth_\`名前空間は、標準的な操作のための既存のイーサリアムツールとの互換性を保証し、共通の機能性のためのイーサリアムと同様の相互作用を可能にします。
- **標準イーサリアムアドレスフォーマット:** Kaiaは標準イーサリアムアドレスフォーマット(`0x` \+ 40 hex chars)を使用します。

## 何が違うのか

- **性能とコスト：**\*。
  - イーサリアムの15～30TPSに比べ、大幅に高いTPS（最大4,000TPS）が期待できる。
  - ブロックタイムは1秒とはるかに速い。
  - カイアは、イーサリアムの確率的な最終性とは大きく異なる、即時の最終性を提供する。
  - 取引手数料（ガス）は、EIP-1559互換の手数料モデルを使用し、低額で安定した設計となっている。 ガス料金は「kei」で表示される。
- **RPCとSDK：**\*。
  - eth_`名前空間はサポートされているが、`kaia_\`名前空間は新しい機能やカイア固有の機能やトランザクションタイプに必要である。
  - レガシーな `klay_` 名前空間が存在するかもしれないが、これは `kaia_` 名前空間と同等である。
  - カイアは、一般的なWeb3ライブラリ用の独自のSDK拡張機能（[Ethers-ext](https://docs.kaia.io/references/sdk/ethers-ext/getting-started/)、[Web3js-ext](https://docs.kaia.io/references/sdk/web3js-ext/getting-started/)、[Web3j-ext](https://docs.kaia.io/references/sdk/web3j-ext/getting-started/)、[Web3py-ext](https://docs.kaia.io/references/sdk/web3py-ext/getting-started/)、[Viem-ext](https://docs.kaia.io/references/sdk/viem-ext/getting-started/)）を提供しており、イーサリアムからのシームレスな移行を可能にすると同時に、カイアの強化された機能とパフォーマンスの利点へのアクセスを提供します。
- **ネイティブ機能（標準的なEVMを超えて）：**\*。
  - **アカウントの抽象化:** Kaiaは高度なアカウント機能（例えば、アカウントごとの複数のキー、役割ベースのパーミッション）を持ち、EthereumのEOAモデルよりも柔軟性を提供する。
  - **トランザクションの種類:** Kaiaはイーサリアムのものと並ぶ独自のネイティブ・トランザクションの種類を持つ（例えば、アカウントの更新や手数料の委譲など）。 イーサリアムのトランザクションでは、最高の互換性のために標準の `eth_` RPC を使用してください。
  - \*\*この機能は、dAppsがユーザーのためにガス料金を支払うことを可能にすることで、UXを大幅に改善することができる。
- \*\*コンセンサスとガバナンス
  - コンセンサス・メカニズムは、イーサリアムのGasperとは異なる最適化されたバージョンのIBFT（Istanbul BFT）であり、より高速なブロック時間と即時の最終処理につながる。
  - ガバナンスにはオンチェーンのガバナンス評議会（GC）が関与し、イーサリアムの流動的なオフチェーンのガバナンスとは異なる。
- **トークン：**\* ネイティブ・トークンはKAIAです。 トークノミクスとユーティリティはカイア特有のものだ。
- **ノード・アーキテクチャ：** Kaiaは、パフォーマンスとセキュリティを最適化するために設計された[特化したノード・タイプ](https://docs.kaia.io/learn/#network-architecture)（コンセンサス用のコア・セル、パブリック・アクセス用のエンドポイント・ノード）を持つ**目的構築型のレイヤード・アーキテクチャ**を使用しており、イーサリアムのユニファイド・クライアント・アプローチとは異なります。
- \*\*Mempool:\*\*トランザクション処理とパブリックmempoolの可視性は、Ethereumのようなグローバルでパブリックなmempoolをあまり重視しないKaia特有のネットワークアーキテクチャのため、異なるかもしれない。
- **プリコンパイル契約:** ベースとなるEVMプリコンパイルがサポートされている一方で、KaiaはKaia特有のプリコンパイル契約を追加する可能性があります。

## 建設業者のための次のステップ

1. **Configure Your Environment**  
   既存のEthereumツールをKaiaで動作するように設定する：

- [Mainnet RPC](https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints): https://public-en.node.kaia.io ([Chain ID](https://docs.kaia.io/nodes/service-chain/configure/configuration-files/#properties-)：8217\)
- テストネットカイロス・テストネット（[蛇口](https://www.kaia.io/faucet)から[無料トークン](https://docs.kaia.io/build/get-started/getting-kaia/)を入手できます。）
- ツール：Hardhat、Foundry、MetaMaskはそのまま使える。

2. **デプロイとテスト**  
   EVM との完全な互換性により、Solidity 契約は変更されずにデプロイされます。 Kairosテストネットでテストし、カイアのダイナミック料金モデルの下でのガス使用パターンを検証。

3. \*\*カイアの長所を活かそう

- 即時終了：即時終了の1秒ブロックは確認待ちをなくす
- [ガス代を下げる](https://docs.kaia.io/learn/transaction-fees/#effective-gas-price-)：イーサリアムでは高すぎる機能を構築する
- [手数料委任](https://docs.kaia.io/build/transactions/fee-delegation/)：UXを向上させるためにdAppにユーザー取引手数料を支払わせる
- [Gas Abstraction](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)：ユーザーは承認されたトークンで料金を支払うことができる（KAIAだけではない）

4. **適切なAPIとSDKを使用すること**。

- イーサリアム互換操作のための標準 `eth_` 名前空間
- カイア固有の機能とトランザクションタイプにアクセスするための `kaia_` 名前空間
- ethers.jsとweb3.jsは完璧に動作しますが、ネイティブ機能との統合をより簡単にするために、[Kaia's SDKs](https://docs.kaia.io/references/sdk/)を検討しましょう。

5. \*\*情報提供

- 最新情報は[Kaia Docs](https://docs.kaia.io/)を参照してください。
- 他のビルダーやカイアチームと[カイア開発者フォーラム](https://devforum.kaia.io/)やその他のコミュニティチャンネルで交流し、サポートやアップデートを受ける。