# Thirdwebを使ったスマートコントラクトのデプロイ

![](/img/banners/kaia-thirdweb.png)

## はじめに<a id="introduction"></a>

このセクションでは、[ThirdWeb](https://portal.thirdweb.com/)を使用して、マーケットプレイス契約と対応するNFTコレクション契約をカイアネットワークにデプロイする方法を説明します。 このセクションでは、[ThirdWeb](https://portal.thirdweb.com/)を使用して、マーケットプレイス契約と対応するNFTコレクション契約をカイアネットワークにデプロイする方法を説明します。 Thirdwebは、あなたのアプリやゲームを分散型ネットワークに接続するために必要なすべてを提供する完全なWeb3開発フレームワークです。

マーケットプレイス契約により、ユーザーはNFTを直接販売やオークションに出品することができ、OpenSeaで行われているのと同様にNFTの売買を強化することができます。

このガイドの終わりには、あなたは次のことができるようになる：

- サードウェブを使用して契約を作成し、カスタマイズします。
- thirdwebを使用してスマートコントラクトをコンパイル、デプロイ、実行します。

## はじめに<a id="getting-started"></a>

この記事では、サードウェブを使ってコントラクトを作成、カスタマイズ、デプロイするためのさまざまな手段を探ります。

- サードウェブダッシュボードの使用
- thirdweb CLIを使う

このガイドでは、thirdwebダッシュボードを使用してMarketPlaceコントラクトをデプロイする方法と、thirdweb CLIを使用してマーケットプレイスに掲載される対応するnftコレクションをデプロイする方法を示します。

> 注：スマート・コントラクトの作成、デプロイ、実行のためのサードウェブ・ダッシュボードとCLIを探求することに重点を置くため、マーケットプレイス・コントラクトの仕組みについては説明しない。

## サードウェブダッシュボードを使用したマーケットプレイス契約の作成とデプロイ<a id="creating-and-deploying-thirdweb-dashboard"></a>

このセクションでは、thirdwebダッシュボードを使用してマーケットプレイス契約を作成し、デプロイします。 そのためには、以下の手順に従ってください： そのためには、以下の手順に従ってください：

1. [thirdweb dashboard](https://thirdweb.com/dashboard?ref=blog.thirdweb.com)にアクセスし、契約リストから**MarketPlace**契約を選択します。

![](/img/build/get-started/marketplace-explore.png)

2. 契約概要ダッシュボードの**Deploy Now**をクリックします。

![](/img/build/get-started/marketplace-deploy.png)

3. マーケットプレイスの**名**、**説明**、**画像**というパラメータを含むように、マーケットプレイスの契約を設定します。

![](/img/build/get-started/marketplace-contract-details.png)

4. 上の画像のように**Deploy Now**をクリックし、トランザクションが完了するのを待ちます。

![](/img/build/get-started/marketplace-deployed.png)

トランザクションが正常に実行されると、[Kaiascope](https://kaiascope.com/)の検索バーに契約アドレスを貼り付けることで、デプロイメントを確認することができます。

## thirdweb CLIを使用したNFTコレクション契約の作成とデプロイ<a id="creating-deploying-using-thirdweb-cli"></a>

このセクションでは、[thirdweb CLI](https://portal.thirdweb.com/cli?ref=blog.thirdweb.com)を使用して、マーケットプレイスに掲載するNFTコレクションを作成し、デプロイします。  そのためには、以下の手順に従ってください：

### 契約書の作成<a id="creating-the-contract"></a>

1. ターミナルでこのコマンドを実行し、契約書を作成する：

```bash
npx thirdweb create --contract
```

2. コマンドラインのプロンプトにお好みの値を入力してください：

   i. プロジェクトに名前をつける。

   ii. お好きなフレームワークをお選びください：**Hardhat**または**Foundry**。

   iii. スマート・コントラクトに名前を付ける。

   iv. ベース契約のタイプを選択する：**Empty**、**ERC20**、**ERC721**、**ERC1155**。 必要な**拡張機能**を追加する。 このチュートリアルでは、ERC721を選択し、拡張子をnoneに設定します。

![](/img/build/get-started/thirdweb-cli-info.png)

3. 作成したら、プロジェクトのルート・ディレクトリに移動し、お好みのコード・エディタでプロジェクトを開いてください。

4. 契約書フォルダを開くと、契約書はこのようになっているはずだ：

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@thirdweb-dev/contracts/base/ERC721Base.sol";
contract nftcollection is ERC721Base {
      constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721Base(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {}
}
```

この記事では、サードウェブを使ってコントラクトを作成、カスタマイズ、デプロイするためのさまざまな手段を探ります。 上記のコントラクトは、基本的な[ERC721Base](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol)の機能を示している。 これは **ERC721Base** 契約をインポートして継承し、コンストラクタとその従属パラメータを含む必要なメソッドも実装している。

コントラクトを希望のカスタム・ロジックに変更することができ、それが完了すれば、コントラクトをデプロイする準備が整う。

### 契約の展開<a id="deploying-the-contracts"></a>

1. プロジェクトのルート・フォルダーに移動し、ターミナルでコマンドを実行する：

```bash
npx thirdweb deploy
```

このコマンドを実行すると、以下のアクションがトリガーされる：

- フレームワークを検出する(hardhat, foundry)
- は、カレント・ディレクトリにあるすべてのコントラクトをコンパイルする。
- をクリックすると、配備する契約を選択できます。
- コンパイルしたスマートコントラクトのコードを（アプリケーション・バイナリ・インターフェース（ABI）の形で）IPFSにアップロードします。

2. 配備が完了すると、ダッシュボードのインターフェイスが開き、残りのパラメータを入力する。
   - **_name**：契約名
   - **_symbol**：シンボルまたは "ティッカー"
   - **__royaltyRecipient**：二次販売からのロイヤルティを受け取るウォレットアドレス
   - **ロイヤリティBps**：二次販売ごとにロイヤリティ受取人に付与されるベーシス・ポイント（bps）。

3. 契約を展開するネットワークとして`Kaia Mainnet`を選択する。

![](/img/build/get-started/nft-collection-deploy.png)

4. スマート・コントラクトがデプロイされると、ダッシュボードから追加設定や機能を管理できる。 例えば、NFTのアップロード、権限やアクセス制御の設定、新機能の追加などが可能です。

thirdwebのデプロイコマンドについては、こちらの[デプロイガイド](https://portal.thirdweb.com/deploy/getting-started)を参照してください。

## 配備された契約とのやり取り<a id="interacting-with-deployed-contracts"></a>

このセクションでは、**mint**関数と**transferfrom**関数をそれぞれ使用して、NFTの造幣と別の口座への移管を行います。 次のステップで説明しよう： 次のステップで説明しよう：

### NFTの鋳造<a id="minting-nft"></a>

1. 新しく配置された契約 (**puppyKlan-NC**) のダッシュボードに移動して下さい。
2. 契約ダッシュボードの**NFTs**タブにある**mint**機能をクリックします。

![](/img/build/get-started/puppy-mint-btn.png)

3. NFTの造幣に必要なパラメータを入力する：**name**、**media**、**description**、**properties**。

![](/img/build/get-started/puppy-mint-details.png)

4. 入力内容を確認し、**Mint NFT**ボタンをクリックします。
5. 取引を確認し、完了するまで待つ。 完了すると、以下のようにダッシュボードにNFTが追加されます： 完了すると、以下のようにダッシュボードにNFTが追加されます：

![](/img/build/get-started/puppy-minted.png)

### 新オーナーへのNFT譲渡<a id="transferring-nft-to-new-owner"></a>

1. 契約(**puppyKlan-NC**)ダッシュボードのエクスプローラタブに向かう。
2. 以下のように、Writeタブで**transferFrom**関数を選択する。
3. 必要な関数の引数を記入する：from（アドレス）、to（アドレス）、id（uint256）。

![](/img/build/get-started/puppy-transferfrom.png)

4. 取引を確認し、完了するまで待つ。

## 結論<a id="conclusion"></a>

おめでとう！ は、カレント・ディレクトリにあるすべてのコントラクトをコンパイルする。 ご不明な点がございましたら、[カイアフォーラム](https://devforum.kaia.io/)、または[サードウェブ公式サポート](https://support.thirdweb.com/)までお問い合わせください。 しかし、以下は、Kaia上でThirdwebをさらに構築する際に必要となる可能性がある便利なリソースの一覧です。

- [サードウェブ・ドックス](https://portal.thirdweb.com/)
- [Thirdwebを使ったdAppの作り方](https://blog.thirdweb.com/guides/how-to-build-a-dapp/)
- [NextJSとTypeScriptで独自のNFTマーケットプレイスを作ろう](https://blog.thirdweb.com/guides/nft-marketplace-with-typescript-next/)
