# カイア・ウォレットDAppの統合

## 目次

1. [UIライブラリ](#1-ui-libraries)
2. [ユーティリティ・ライブラリ](#2-utility-libraries)
3. [プロバイダー](#3-providers)

## はじめに

[カイアウォレット](https://docs.kaiawallet.io)は、[メタマスク](https://metamask.io)と同様の非保護ウォレットで、カイア固有の[取引](https://docs.kaia.io/learn/transactions)と[アカウント](https://docs.kaia.io/learn/accounts)を追加サポートしています。 この記事では、[Kaia Wallet](https://docs.kaiawallet.io)と分散型アプリケーション(dApp)の統合について、高レベル(抽象的)な実装から低レベル(きめ細かい)実装まで説明します。

このガイドでは、Kaia Wallet dAppの統合を3つの主要カテゴリーに分類します：

- UIライブラリ
- ユーティリティ・ライブラリ
- プロバイダー

:::note

前述のライブラリーは、`Providers`をボンネットの中で使っている。

:::

## 1. UIライブラリ

多くのdAppは、状態管理とリアクティブなサービスの提供のためにフロントエンド・フレームワークを利用している。 そのようなdAppsとカイアウォレットを統合する推奨される方法は、同じフレームワークで構築されたUIライブラリを使用することです。

UI ライブラリは、`ConnectWallet` コンポーネントのように、ユーザーとのインタラクションのためのコンポーネントを提供します。 また、複数アカウントや複数ネットワークのような低レベルの状態を管理する手間も省けます。 複雑な、あるいは低レベルのインタラクションについては、基礎となる[ユーティリティ・ライブラリ](#2-utility-libraries)や[プロバイダ](#3-providers)を参照することができる。

ほとんどのUIライブラリはMetamaskをビルトインでサポートしているが、Kaia Walletの[API](https://docs.kaia.io/references/json-rpc/kaia/account-created/)は[Metamaskの](https://docs.metamask.io/wallet/reference/json-rpc-api)をベースに構築されているので、統合も簡単だ。 ライブラリがKaia Walletをネイティブにサポートしていなくても、Kaia Wallet統合のために拡張するのは簡単です。 例えば、[React](https://react.dev)や[Next.js](https://nextjs.org)の2つの人気のあるライブラリです：

- [Appkit](#1.1-appkit-example)
- [Web3-Onboard](#1.2-web3-onboard-example)

### 1.1. Appkitの例

![Appkit Hero Banner](https://docs.reown.com/assets/images/appkit-18fbf6d4ddb8756740540b7adad92494.png)

[Reown](https://reown.com/), [Appkit](https://docs.reown.com/appkit/overview) では、以下の**機能を提供しています:**。

- ウォレット接続、アカウント情報、ネットワーク情報のボタンとモーダル
- [Eメールウォレット](https://docs.reown.com/appkit/authentication/socials)、[Coinbase](https://www.coinbase.com)アカウント、および[EIP-4361](https://docs.reown.com/appkit/authentication/one-click-auth)をサポートします。

**考慮事項**

- [@reown/appkit](https://www.npmjs.com/package/@reown/appkit)を使って、[Wagmi](https://wagmi.sh)&[Tanstack Query](https://tanstack.com/query)のフロントエンドスタックか、単に[Ethers](https://docs.ethers.org/v6/)のどちらかにコミットするオプションがある。
- `projectId`が必要 [Reownでサインアップ](https://cloud.walletconnect.com/sign-in)

:::note

コード例[kaikas-web3modal](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/kaikas.md)

:::

### 1.2. Web3-Onboardの例

![Web3-Onboard Graphic](https://onboard.blocknative.com/_app/immutable/assets/connect-modal.b7439c5e.svg)

[Blocknative](https://www.blocknative.com)による[Web3-Onboard](https://onboard.blocknative.com)は以下の**機能を提供します:**。

- 設定可能なオンボード・テキスト
- Connect Wallet、Switch Account、Switch Networkの各モダル
- [通知コンポーネント](https://onboard.blocknative.com/docs/modules/core#customnotification)
- (オプション) リアルタイムデータをフェッチ＆レンダリングするためのAPIキーを登録する。

**考慮事項**

- ボタンを書く必要がある

:::note

コード例[kaikas-web3onboard-react](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/web3Onboard.md)

:::

## 2. ユーティリティ・ライブラリ

[kaia-sdk](#21-kaia-sdk)や[ethers.js](#22-ethersjs-example)のようなライブラリは、ブロックチェーンのやり取りを効率化するのに十分な抽象化を行い、なおかつ[Provider](#3-providers)のAPIを直接呼び出すことができる。

ユーティリティライブラリを使用してアカウントを接続したり、ネイティブトークン（KAIA/ETHなど）を送信したりすることは、構文やコード行数\*の点で、プロバイダを直接呼び出すのと変わりません。 図書館が主に改善するのは、以下の分野である：

- スマートコントラクトの相互作用
  - これらには、ABI、エンコード入力、デコード出力が含まれる。 ライブラリーがないと、これらのコードは冗長でエラーになりやすい。
- エラー処理
  - 文字列エラーコード/メッセージは、カスタムプロパティとメソッドを持つエラークラスにマッピングされます。
- ドキュメンテーションと型式安全性

### 2.1. kaia-sdk

[kaia-sdk](https://github.com/kaiachain/kaia-sdk)は、[ethers.js](https://docs.ethers.io/v6)や[web3.js](https://web3js.org)のような他のユーティリティ・ライブラリのドロップイン拡張のセットです。 これにより、[カイア固有のメソッド](https://docs.kaia.io/references/json-rpc/kaia/account-created/)のファーストパーティ・サポートを公開しながら、お好みのライブラリを使用することができます：

- 取引、口座、口座キーの種類
- 手数料の委任

:::note

コード例[kaikas-web3klaytn](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/kaikas.md)

:::

### 2.2. ethers.jsの例

[ethers.js](https://docs.ethers.io/v6)は、ブロックチェーンと対話するための[最も人気のある](https://npmtrends.com/web3klaytn-vs-ethers-vs-viem-vs-web3)JavaScriptユーティリティライブラリです。 それを目指している：

- 広範囲：複数の財布フォーマット、言語、機能をサポート
- 堅牢：包括的なテスト、文書化、型付け

:::note

コード例[kaikas-ethersjs](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/ethers-js.md)

:::

## 3. プロバイダー

最も低いレベルでは、プロバイダーである[`window.klaytn`](https://docs.kaiawallet.io/02_api_reference/01_klaytn_provider)（カイア・ウォレットそのもの）があります。 ユーティリティ・ライブラリ](#2-utility-libraries)を好むかもしれないが、プロバイダAPIの知識は、デバッグや依存ライブラリの動作を理解するのに役立つ。 [`kaia_getAccount`](https://docs.kaia.io/references/json-rpc/kaia/get-account/)、[`kaia_sendTransactionAsFeePayer`](https://docs.kaia.io/references/json-rpc/kaia/send-transaction-as-fee-payer/)などのKaia固有のメソッドを使用するには、[Kaia's JSON-RPC API][Kaia-API]を参照する必要があります。
