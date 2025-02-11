# よくあるご質問

- [カイアとは?](#what-is-kaia)
- [Kaiaはイーサリアム等価性をどのようにサポートしていますか?](#how-ethereum-equivalence)
- [カイアのガス政策とは?](#kaia-gas-policy)
- [カイアのアカウント構成は特別なのか?](#kaia-account-structure)
- [カイアのdApp開発はどこから始められますか?](#dapp-development)
- [Kaiaはオープンソースですか？](#is-kaia-open-source)
- [口座への初期資金はどうすればよいですか](#fund-my-acconut)
- [カイアのパブリックノードプロバイダーでテストや開発用に使えるものはありますか？](#node-providers)
- [Are there faucets to get test KLAY?](#are-there-faucets)
- [パブリックRPCのエンドポイントの状態を確認するにはどうすればよいですか](#rpc-endpoint-status)
- [どのウォレットがKaiaに対応していますか？](#which-wallets)
- [メインネットとは何か、カイロスとは何か](#what-is-mainnet-what-is-kairos)
- [カイアSDKはありますか？ どの言語で](#kaia-sdks)
- [Kaiaを使用するには、EN（エンドポイントノード）をインストールして実行する必要がありますか?](#must-i-install-and-run-en)
- [ENを使用していますが、ノードのデータ同期が遅すぎます](#node-data-sync-is-too-slow)
- [カイアでERC-20とERC-721コントラクトを使用できますか?](#can-i-use-erc-20-and-erc-721)
- [Metamaskのようなブラウザ拡張ウォレットはどこで手に入りますか](#where-can-i-get-a-browser-extension-wallet)
- [私の料金支払者アカウントのアドレスが、提供されたキーから導き出されないのはなぜですか](#account-address-is-not-derived-from-the-key)
- [フィーデレグの完全な実務サンプルはどこで入手できますか](#fee-delegation-samples)

## カイアとは？ <a id="what-is-kaia"></a>

Kaiaは、特にアジアにおけるWeb3の大量導入のために設計された高性能なレイヤー1ブロックチェーンである。 4,000以上のTPS、即時のファイナリティ、1秒のブロックタイムを提供する。 イーサリアムと完全な互換性を持つカイアは、シームレスなdApp移行を可能にし、開発者に優しいツール、低手数料、エコシステムファンドからの強力な流動性を備えた強固なエコシステムを提供します。 カカオやLINEのような主要なメッセージング・プラットフォームとの統合を通じて、Web2ユーザーのアクセシビリティを優先している。 詳しくは【ホワイトペーパー](https://docs.kaia.io/kaiatech/kaia-white-paper/)をご覧ください。

## Kaiaはイーサリアム等価性をどのようにサポートしていますか？ <a id="how-ethereum-equivalence"></a>

KaiaはEVM互換であり、EIP-4844 blobトランザクションを除くすべてのEthereum Cancun EVM機能をサポートしている。 これは `eth` 名前空間 RPC API を提供し、Ethereum SDK やツールをシームレスに使用できるようにします。 Kaia固有のトランザクションタイプはeth名前空間API内でタイプ0のレガシートランザクションとして表現されるため、イーサリアムSDKはそれらを認識する必要はない。

## カイアのガス政策とは？ <a id="kaia-gas-policy"></a>

カイアは、通常のネットワーク状態では低料金を維持し、ネットワークの混雑状況に応じて料金を調整するダイナミックなガス料金モデルを採用している。 ガス料金はブロックごとに限られた範囲内で変更できるため、料金を予測可能に保ちながらネットワーク・スパムを防止するのに役立つ。 取引手数料の一部は自動的に焼却される。 このモデルは、ネットワークの安定性を維持しながら、ユーザーエクスペリエンスと企業にとっての利便性を優先している。

## カイアのアカウント構成は特別ですか？ <a id="kaia-account-structure"></a>

dApp開発者に最大限の利便性を提供するために、Kaiaは[秘密鍵をアドレスから切り離す](https://klaytn-tech.medium.com/klaytn-usability-improvement-series-1-separating-keys-and-addresses-dd5e367a0744)方法を考案しました。 その結果、[multisig](https://medium.com/klaytn/klaytn-usability-improvement-series-2-introducing-multisig-on-the-platform-level-85141893db01)を簡単に実装することができる。これにより、1つのアカウントに対して複数の秘密鍵を作成し、それぞれの鍵に異なる重みを持たせることができる。 各キーには[異なる役割](https://medium.com/klaytn/klaytn-usability-improvement-series-4-supporting-role-based-keys-on-the-platform-level-e2c912672b7b)を割り当てることもできる。

## カイアのdApp開発はどこから始められますか？ <a id="dapp-development"></a>

イーサリアムから移行する場合でも、ゼロからKaiaで構築する場合でも、必要なツールとインフラをすべてサポートします。 スマートコントラクトは、Kaiaプラグインを使用して[Remix IDE](../build/tutorials/connecting-remix.md)上でテストしたり、[MetaMask](../build/tutorials/connecting-metamask.mdx)ウォレットや[Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)に接続することができます。 カイアのsdkは[こちら](https://github.com/kaiachain/kaia-sdk)から入手できる。 私たちの[チュートリアル](../build/tutorials/tutorials.md)を参考に、KaiaでdAppをビルドしてみてください。

## カイアはオープンソースですか？ <a id="is-kaia-open-source"></a>

カイアは確かにオープンソースだ！ 私たちの[Github Organization](https://github.com/kaiachain)を見て、私たちのカイア・ドキュメンテーションへの[貢献](https://github.com/kaiachain/kaia-docs/blob/main/CONTRIBUTING.md)を始めてください。 オープンソースの方針については [こちら](opensource.md) をお読みください。

## 口座に最初に入金する方法を教えてください。 <a id="fund-my-acconut"></a>

You may purchase KLAY on the exchange. 利用可能な取引所のリストはこちらをご覧ください：
[Coinmarketcap](https://coinmarketcap.com/currencies/klaytn/markets/)、[Coingecko](https://www.coingecko.com/en/coins/klay#markets)。

## テストや開発のためのカイアのパブリックノードプロバイダはありますか？ <a id="node-providers"></a>

カイアのパブリック・ノード・プロバイダーとネットワーク・ドメインについては、[このリスト](../references/public-en.md#rpc-service-providers)を参照してください。

## Are there faucets to get test KLAY? <a id="are-there-faucets"></a>

開発およびテスト用のテストKAIAはこちらから入手できます：

- [カイア[Faucet](https://faucet.kaia.io)
- [NODIT蛇口](https://kaiafaucet.com)
- [サードウェブ蛇口](https://thirdweb.com/kaia-testnet-kairos)

## パブリックRPCエンドポイントのステータスを確認するには？ <a id="rpc-endpoint-status"></a>

エンドポイントの稼働時間と安定性を保証することはできませんので、ノードプロバイダのステータスは常にここで確認することができます：[ChainList](https://chainlist.org/chain/8217), [Kaia Status](https://status.kaia.io/).

## どのウォレットがカイアをサポートしていますか？ <a id="which-wallets"></a>

カイアは、コールドウォレットのD'centや、カイアウォレット、MetaMaskなどのホットウォレットのホストによってサポートされています。 リスト[こちら](../build/tools/wallets/wallets.md)をご参照ください。

## メインネットとは、カイロスとは？ <a id="what-is-cypress-what-is-baobab"></a>

メインネットはKaiaメインネット、Kairosはテストネット。
以下は各ネットワークに関する情報である。

Cypress mainnet:

- EN download : Choose the Baobab package from the [download page](../nodes/downloads/downloads.md).
- カイアスコープ : https://kaiascope.com/

Kairos testnet:

- EN download : Choose the Cypress package from the [download page](../nodes/downloads/downloads.md).
- カイアスコープ : https://kairos.kaiascope.com
- カイロス水栓 : https://faucet.kaia.io

## カイアSDKはありますか？ どの言語で？ <a id="kaia-sdks"></a>

Kaia Nodeはイーサリアムと互換性があるため、ethers.js、web3.js、web3py、web3j、viemのような一般的なイーサリアムSDKを使用できます。 しかし、Kaia Nodeには、Kaia固有のアカウントとトランザクションタイプによる拡張機能も含まれている。

これらの機能を利用するには、ethers-ext、web3js-ext、web3j-ext、web3py-extなどの拡張機能を含むカイアSDKを使用することができます。 これらはイーサリアムSDKを拡張するプラグインタイプのSDKである。 スタンドアロンSDKがお好みであれば、イーサリアムとの互換性を必要としないプロジェクト向けに設計されたcaver-jsやcaver-javaなどのCaver SDKをご検討ください。

### kaia-sdk（プラグインSDK）

これらのSDKはJavaScript、Java、Pythonをサポートしているので、プロジェクトで使用する言語に応じて選択できる：

- ethers-ext、javascript用web3js-ext
- Java 用 web3j-ext
- パイソン用web3py-ext

### ケイバー（スタンドアロンSDK）

これらのSDKはJavaScriptとJavaをサポートしており、イーサリアムとの互換性が必要ないプロジェクトに最適です：

- JavaScript用caver-js
- caver-java（Java用

## Kaiaを使用するには、EN（エンドポイントノード）をインストールして実行する必要がありますか？ <a id="must-i-install-and-run-en"></a>

それはあなたのニーズ次第だ。 ノードを完全に制御し、ブロックを自分で検証する必要がある場合は、独自のENをインストールして実行する必要があります。 これは、ほとんどのカイアのアプリケーションの典型的なセットアップである。 しかし、テストや開発のため、あるいは独自のインフラを管理したくない場合は、[Kaia API Service (KAS)](https://www.klaytnapi.com/en/landing/main)が素晴らしい選択肢です。 KASは、KairosとMainnetの両方のKaia Node RPC APIへのアクセスに加え、追加のAPIサービスを提供します。 KASは登録後、無料でAPIリクエストを提供します。 料金プランについては、KAS [料金ページ](https://www.klaytnapi.com/en/landing/pricing)をご確認ください。

## ENを使用しているが、ノードデータの同期が遅すぎる。 <a id="node-data-sync-is-too-slow"></a>

まず、お使いのHWの仕様が[システム要件](../nodes/endpoint-node/system-requirements.md)を満たしているかどうかを確認してください。

次に、[chaindata snapshotをダウンロードする](../nodes/endpoint-node/install-endpoint-nodes.md#optional-download-chaindata-snapshot)ことで、時間のかかるFull Syncプロセスを省略することができます。 chaindataスナップショットは、発生以降に生成されたすべてのブロックを保存するデータベーススナップショットである。 毎日更新される。

## カイアでERC-20とERC-721を使用できますか？ <a id="can-i-use-erc-20-and-erc-721"></a>

そうだ。 Kaiaはスマートコントラクト言語としてSolidityをサポートしています。 Etherem用のSolidityで書かれた[ERC-20](../build/smart-contracts/samples/erc-20.md)と[ERC-721](../build/smart-contracts/samples/erc-721.md)は、Kaiaにデプロイして実行することができます。

さらにKaia固有のトークン標準を定義することができます。 KIP (Kaia Improvement Proposal)](https://kips.kaia.io/)をフォローして、議論に参加しよう。

## Metamaskのようなブラウザ拡張ウォレットはどこで手に入りますか？ <a id="where-can-i-get-a-browser-extension-wallet"></a>

カイアのウェブブラウザ拡張ウォレット[Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)。 カイアウォレットは、KAIAの取引やアカウント作成ができる非保管型ウォレットです。

## フィーペイ・アカウントのアドレスが提供されたキーから導き出されないのはなぜですか？ <a id="account-address-is-not-derived-from-the-key"></a>

Kaiaでは、[アカウントアドレスをキーペアから切り離すことができる](../learn/accounts.md#decoupling-key-pairs-from-addresses)。

一般的な使用例は以下の通り。

- アカウント所有者は、セキュリティ上の理由からキーを変更したい。
- アカウントは、重み付けされたマルチシグまたはロールベースのキーを持ち、アカウントを制御するために複数のキーペアを持つことができます。

料金支払者アカウントは通常、[ロール・ベース・キー](../learn/accounts.md#accountkeyrolebased)を持っている。 ほとんどの場合、アカウント・アドレスは RoleFeePayer キーから派生したものではない。

## フィーデレグレーションの完全なサンプルはどこで手に入りますか？ <a id="fee-delegation-samples"></a>

いくつかの異なるカイアSDKを使用した料金委譲の完全な動作例をご覧いただけます：

- ethers-ext：[フィー委任による価値移転の例](https://docs.kaia.io/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer/)
- web3js-ext：[料金委譲値転送の例](https://docs.kaia.io/references/sdk/web3js-ext/fee-delegated-transaction/value-transfer/)
- web3j-ext：[料金委譲値転送の例](https://docs.kaia.io/references/sdk/web3j-ext/fee-delegated-transaction/value-transfer/)
- web3py-ext：[料金委任による価値移転の例](https://docs.kaia.io/references/sdk/web3py-ext/fee-delegated-transaction/value-transfer/)
- Caver-js: [料金委譲の例](https://docs.kaia.io/build/tutorials/fee-delegation-example/)
