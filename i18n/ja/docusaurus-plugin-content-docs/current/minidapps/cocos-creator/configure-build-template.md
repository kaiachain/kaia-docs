# ミニDapp SDKの統合

このセクションでは、Mini Dapp SDKがゲームにロードされていることを確認します。 そのために、Cocos Creatorのbuild-templatesディレクトリでは、ゲームがどのようにウェブ・プラットフォーム用にビルドされるかをカスタマイズすることができ、ゲーム開始前にSDKをプリロードするのに欠かせない。

build-templates/web-desktop\*\*にカスタムテンプレートを作成することで、すべてのビルドにSDKを自動的に含めることができ、開発とデプロイが効率化されます。

## ステップ1：build-templatesディレクトリの作成<a id="create-build-template-directory"></a>

プロジェクトをVS Codeで開き、ターミナルで以下のコマンドを実行する：

```bash
mkdir -p build-templates/web-desktop
```

## ステップ2：Cocos Creatorで初期ビルドを行う<a id="perform-initial-build"></a>

1. Menu → Project → Build\*\*.

![](/img/minidapps/cocos-creator/cp-build-r.png)

2. プラットフォーム**を**Webデスクトップ\*\*に設定します。

3. ビルド\*\*をクリックする。

![](/img/minidapps/cocos-creator/cp-build-details-r.png)

## ステップ3：ビルド・ディレクトリからindex.htmlファイルをコピーする<a id="copy-index-html-from-build-dir"></a>

ビルドが完了したら、index.htmlファイルをbuild-templatesディレクトリにコピーする：

```bash
cp build/web-desktop/index.html build-templates/web-desktop/
```

## ステップ4： ミニダップSDKを含めるためにindex.htmlを修正する<a id="modify-index-html-to-include-dapp-portal-sdk"></a>

build-templates/web-desktop/index.html`を編集し、<head> </head>`セクション内に以下のMini Dapp SDK scriptタグを追加する：

```bash
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

## ステップ 5: ビルド・セットアップの確認<a id="verify-build-setup"></a>

- Cocos Creatorでプロジェクトを再構築する。
- 生成された `build/web-desktop/index.html` を確認する。
- Mini Dapp SDKスクリプト\*\*が正しくインクルードされていることを確認してください。

## ステップ6：プロジェクトのビルドとプレビュー<a id="build-preview-project"></a>

設定が完了したら、Cocos Creator Editorの上部にある_Play on Device_をクリックします。 新しいブラウザのタブでゲームが開くはずです。

![](/img/minidapps/cocos-creator/cp-play-game-r.png)

![](/img/minidapps/cocos-creator/cp-localhost-build-r.png)

# WebビルドをLocalhost:3000にルートする<a id="route-web-build"></a>

セキュリティと開発目的のため、Mini Dapp SDKは現在localhost:3000で動作しています。 現時点では、デフォルトのUnity WebGLビルドはランダムなポート（7457など）を使用しており、アプリを効率的に動作させるには、Unity WebGLビルドをlocalhost:3000で開くように設定する必要があります。

そのためには、以下の手順に従ってください：

1. 以下のコードをコピーして、プロジェクトのターミナルに貼り付けます。

```bash
# Install http-server globally
npm install -g http-server
```

2. ビルド・フォルダーに移動する

```bash
cd build/web-desktop
```

3. ポート3000でサーバーを起動

```bash
http-server -p 3000
```

# アプリケーションのテストと実行<a id="route-web-build"></a>

さて、プロジェクトを走らせたので、テストして操作してみよう。

- Connect Wallet ボタンをクリックして Dapp Portal Wallet に接続します。
- 一旦接続されると、接続されたアドレスに一定額を送金する。

![](/img/minidapps/cocos-creator/cocos-demo.gif)
