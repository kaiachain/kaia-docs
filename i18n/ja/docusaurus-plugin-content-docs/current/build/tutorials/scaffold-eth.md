# Scaffold-ETH 2を使用してdAppを構築する

![](/img/banners/kaia-scaffold.png)

## はじめに<a href="#introduction" id="introduction"></a>

Scaffold-ETH 2は、EthereumやKaiaのような他のEVM互換ブロックチェーン上で分散型アプリケーション（dApps）を構築するためのオープンソースのツールキットです。  開発者はScaffold-ETH 2により、Solidityスマートコントラクトを簡単にデプロイし、ReactフロントエンドでdAppを起動することができます。

Scaffold-ETH 2ツールキットは、Next.js、RainbowKit、Hardhat、Foundry、Wagmi、TypeScriptを使って構築された。 開発者は、HardhatやFoundryを使ってスマート・コントラクトを簡単に作成、テスト、デプロイでき、Next.jsを使ってReactフロントエンドを構築することもできる。 開発者は、HardhatやFoundryを使ってスマート・コントラクトを簡単に作成、テスト、デプロイでき、Next.jsを使ってReactフロントエンドを構築することもできる。

このチュートリアルでは、Scaffold-ETH 2を使用してKaia上でデプロイ、コントラクトの実行、dAppの構築を行う方法を学びます。

## 前提条件<a href="#prerequisites" id="prerequisites"></a>

このガイドを始めるには、以下のものが必要です：

- [ノード (>= v18.17)](https://nodejs.org/en/download/)
- 糸（[v1](https://classic.yarnpkg.com/en/docs/install/)または[v2+](https://yarnpkg.com/getting-started/install)）。
- フックなど、JavascriptとReactの基本に精通していること
- [メタマスクウォレット](https://metamask.io/download/)
- [Faucet](https://faucet.kaia.io)からKAIAをテストする。
- RPCエンドポイント：サポートされている[エンドポイント・プロバイダー](https://docs.kaia.io/references/public-en/)のいずれかから取得できます。

## 開発環境の構築<a href="#setting-up-dev-environment" id="setting-up-dev-environment"></a>

Scaffold-ETH 2をインストールするには、[Scaffold-ETH 2リポジトリ](https://github.com/scaffold-eth/scaffold-eth-2)をクローンしてインストールするか、`npx create-eth@latest`を使用してインストールするかの2つの方法があります。

このガイドでは、Scaffold-ETH 2プロジェクトのブートストラップにはnpxメソッドを使用します。

以下のコマンドを実行して、Scaffold-ETH 2プロジェクトをブートストラップします：

```bash
npx create-eth@latest
```

一連のプロンプトが表示されます：

**プロジェクト名**：プロジェクト名の入力: プロジェクト名を入力してください。

**Solidity Framework**; どのSolidityフレームワークを使用しますか？：お好みのSolidityフレームワーク（Hardhat、Foundry）を選択してください。 このガイドでは、Hardhatフレームワークを使用する。

**パッケージをインストールしますか？**：はい（デフォルトのオプション）の場合はEnterキーを、いいえの場合はnと入力してEnterキーを押します
セットアップが完了したら、プロジェクトディレクトリに移動します。

```bash
cd project-name
// 例： cd kaia_scaffold
```

足場ETHセットアップ](/img/build/tutorials/scaffold-1.png)

## Scaffold-ETH 2による開発プロセスのハイライト<a href="#highlight-of-dev-environment" id="highlight-of-dev-environment"></a>

Scaffold-ETH 2を使ったプロジェクト開発のプロセスは以下のようになります：

1. カイアのハードハットのネットワーク設定を更新する
2. スマートコントラクトを **packages/hardhat/contracts** に追加する。
3. **packages/hardhat/deploy**にあるデプロイスクリプトを編集します。
4. スマートコントラクトをKaiaにデプロイする
5. ハードハット検証プラグインでスマートコントラクトを検証する
6. **packages/nextjs/scaffold.config.ts**ファイルで、Kaiaをターゲットとするフロントエンドを設定します。
7. **packages/nextjs/pages**ディレクトリで、必要に応じてフロントエンドを編集してください。

このガイドでは、Scaffold-ETH 2のインストール後に利用できるデフォルトのサンプルコントラクトとフロントエンドを使用します。 必要なのは、これらのコンポーネントをカイア用に変更することだけだ。 その場合、コンフィギュレーションを**Hardhat**と**Next.js**に分割する。

## ハードハットの構成

このセクションでは、**packages/hardhat**フォルダの下にあるKaiaをターゲットに、Hardhat設定ファイルのネットワーク設定を変更します。

### カイアのハードハットを設定する

Kaia用にhardhatを設定するには、.envファイルを作成し、Kaiaをサポートするようにhardhat.config.tsを修正する必要があります。

**ステップ1：.envの作成**

.envファイルを作成するには、以下のコードをターミナルにコピー＆ペーストする。

```bash
touch packages/hardhat/.env
```

hardhat.config.jsファイルですでに使用されている変数については、**.env.example**ファイルを参照できる。  カイアの場合、必要な変数は1つだけです：**DEPLOYED_PRIVATE_KEY**。

**ステップ2：.envファイルを編集して、この変数を追加する。**

```bash
deployer_private_key=insert_private_key
```

**.env**ファイルに記述された秘密鍵は、Hardhatプロジェクトでスマート・コントラクトをデプロイし、やり取りするアカウントに対応します。

**ステップ3：hardhat.config.tsを修正する。**

次にやりたいことは、**hardhat.config.ts**をカイアに対応するように設定することだ。

定数 **defaultNetwork** に、スマート・コントラクトをデプロイするネットワークを設定する。

```js
    kairos: {
      chainId：1001,
      url："https://responsive-green-emerald.kaia-kairos.quiknode.pro/",
      accounts：[deployerPrivateKey],
}、
```

カイアのネットワーク設定をネットワーク設定オブジェクトの下に追加する。

```js
ネットワーク"kairos"、

```

Hardhatをカイアで使用する際の詳細については、[Hardhatガイド](https://docs.kaia.io/build/get-started/hardhat/)をご確認ください。

### カイアに契約を展開

KaiaネットワークをサポートするためにHardhatを設定した後、次のステップは、サンプル契約をコンパイルし、デプロイすることです。

まず、コントラクトをコンパイルする：

```bash
ヤーンコンパイル
```

コンパイル](/img/build/tutorials/scaffold-2.png)

次に、プロジェクトのルート・ディレクトリーから以下のコマンドを実行する：

```
ヤーン・デプロイ
```

デプロイ](/img/build/tutorials/scaffold-6.png)

注：

> hardhat.config.tsファイルでdefaultNetworkコンフィグを設定していない場合は、コマンドに--network INSERT_NETWORKを追加することができる。 例えば、以下のコマンドはカイアに契約をデプロイする。 例えば、以下のコマンドはカイアに契約をデプロイする。

> yarn deploy --network kaia

### デプロイ済みコントラクトの確認<a href="#verify-deployed-contract" id="verify-deployed-contract"></a>

すでにデプロイされたコントラクトを検証するために、hardhat verifyプラグインを使おう。 すでにデプロイされたコントラクトを検証するために、hardhat verifyプラグインを使おう。 必要なのは、Kairos Testnet用のetherscan設定オブジェクトの下にある**hardhat.config.ts**に以下の設定を追加することだけです。

```js
  etherscan: {
    apiKey: {
      kairos: "unnecessary",
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://api-baobab.klaytnscope.com/api",
          browserURL: "https://kairos.kaiascope.com",
        },
      },
    ],
  },
```

次に、スマート・コントラクトを検証するために、以下のコマンドをターミナルにコピー＆ペーストする：

例

```js
yarn hardhat-verify --network network_name contract_address "コンストラクタの引数1"
```

実際

```js
yarn hardhat-verify --network kairos 0x7fc9656fc8c8ab433867e58b7c6afc19ec4275da
 "0x7fc9656fc8c8ab433867e58b7c6afc19ec4275da"
```

上で見たように、コントラクトを検証するには、ネットワーク名、コントラクトのアドレス、コンストラクタの引数（もしあれば）を渡す必要がある。 しばらく待つと、コンソールに検証結果が表示され、成功した場合は、Kaiascope上の検証済みコントラクトへのURLが提供されます。

検証](/img/build/tutorials/scaffold-verify.png)

カイアスコープで検証](/img/build/tutorials/scaffold-3.png)

Hardhat Verifyプラグインを使用したKaia上でのスマートコントラクトの検証の詳細については、H[ardhat-Verify-Pluginsガイド](https://docs.kaia.io/build/smart-contracts/verify/hardhat/)を参照してください。

## Next.jsの設定<a href="#nextjs-configuration" id="nextjs-configuration"></a>

このセクションでは、**packages/nextjs**フォルダの下にあるKairos Testnet（スマートコントラクトがデプロイされた場所）をターゲットとするように、Next.jsの設定を変更します。  このフォルダでは、**scaffold.config.ts**ファイルのscaffoldConfigオブジェクト内の**targetNetwork**配列を変更する予定です。

### targetNetwork配列を変更する<a href="#modify-targetnetwork-array" id="modify-targetnetwork-array"></a>

```js
targetNetworks: [chains.klaytnBaobab],
```

以上でNext.jsの設定は完了です！ 以上でNext.jsの設定は完了です！ 次に、ローカルホストでdAppを起動する。

### ローカルホストでdAppを起動する<a href="#launch-dapp-in-localhost" id="launch-dapp-in-localhost"></a>

必要な設定をすべて行ったら、ローカルホスト上でサンプルのdAppを起動できる。

そのためには、以下を実行する：

```bash
ヤーンスタート
```

dAppの実行](/img/build/tutorials/scaffold-4.png)

これで、http://localhost:3001/、ReactベースのdAppフロントエンドにアクセスできるようになるはずだ。 ウォレットに接続したり、コントラクトデバッガーのページをチェックしたりして、自由にdAppとやりとりしてください。

スカフォールドdApp](/img/build/tutorials/scaffold-5.png)

## 結論

おめでとう！ Scaffold-ETH 2を使用してコントラクトをデプロイし、Kaia上でdAppを実行することに成功しました。  Scaffold-ETH 2の仕組みを理解したところで、自由に独自のスマートコントラクトを作成してデプロイし、dAppのニーズに合わせてフロントエンドを変更してください！

詳しくは[Scaffold-ETH 2 Docs](https://docs.scaffoldeth.io/)を、ご質問があれば[Kaia Forum](https://devforum.kaia.io/)をご覧ください。
