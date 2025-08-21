# Web3の統合

このセクションでは、Unityプロジェクトにweb3を統合するためのパーツを作成します。

## KIP7スマートコントラクトの作成とデプロイ

まず、Kaiaコントラクト・ウィザードを使ってスマート・コントラクトを生成する。

### ステップ1：カイア契約ウィザードの使用

1. カイア契約ウィザードに移動します。
2. KIP7（ERC20に似たカイアのトークン規格）を選択する。
3. トークンを設定します：
   - 名前ExampleTestToken (または他の何か!)
   - シンボルET（あなたのトークンのティッカー）
   - プレミント100（初期トークン供給）
   - 特徴チェック ✅ 造幣可能

このガイドでは、onlyOwner修飾子を持たないようにmint関数を調整します。 そのためには、ownable.solのインポートとOwnableの継承を削除しなければならない。 手を加えたコードは次のようになるはずだ：

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
contract ExampleTokens is KIP7 {
    constructor() KIP7("ExampleTokens", "ET") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
    function mint(uint256 amount) public  {
        _mint(msg.sender, amount);
    }
}
```

:::info
onlyOwner修飾子を削除し、オリジナルのデプロイメント者やコントラクトの所有者以外の誰でもミント関数を呼び出せるようにした。
:::

### ステップ2：Remix IDEを使ったデプロイ

1. 上記のコードをRemix IDE上で新規作成したファイル`ET.sol`にコピー＆ペーストする。
2. リミックスIDEで：
   - 契約書をコンパイルする\*\*ボタンをクリックする。
   - プラグインマネージャーで**Kaiaプラグイン**を有効にする。
   - Kaia PluginタブのEnvironmentで、**Injected Provider** - **Kaia Wallet**を選択します。
   - Contract\*\*ドロップダウンで契約（ExampleTokens）を検索します。
   - Deploy\*\*をクリックしてトークンを起動します！
3. カイアウォレットがポップアップしたら：
   - 配備の詳細を確認する。
   - 確認」をクリックすると、Kaia Kairos Testnetにデプロイされます。

:::important
展開された契約アドレスをコピーして保存する。 チュートリアルの後半で必要になる。
:::

## Unity-Web3ブリッジの構築

それでは、UnityとWeb3の機能の重要な接続を作成します。 そこで、Unityアプリケーションにブロックチェーン機能を導入します！

### その1：プラグインブリッジ（kaiaPlugin.jslib）の作成

まず、UnityとWeb3をつなぐJavaScriptのブリッジを作ります：

1. プラグインディレクトリを作成します：

```
Assets/
└── Plugins/
    └── WebGL/
        └── KaiaPlugin.jslib    // We'll create this file
```

2. なぜ.jslibなのか？ UnityのC#とブラウザのJavaScriptをつなぐトランスレーターのようなものだ！

3. プラグインは3つのコア機能を処理する：
   - ConnectWallet() - カイアウォレット接続を処理する
   - GetTokenBalance() - トークンの残高をチェックする
   - MintTokens() - トークンの鋳造を管理する

このファイルをVS Codeで開き、[Appendix A](convert-unity-liff.md#appendix-a)にある`KaiaPlugin.jslib`のソースコードを貼り付ける：

### パート2：C#マネージャー（Web3Manager.cs）の作成

次に、Web3のすべての操作を管理するC#スクリプトを作成します：

1. scriptsディレクトリを作成します：

```js
Assets/
└── Scripts/
    └── Web3/
        └── Web3Manager.cs    // We'll create this file
```

:::info

\*\*Web3Managerは何をするのか？

- Web3の全業務のメインコンダクターとして活動。
- JavaScriptプラグインとの通信を管理します。
- ブロックチェーンのイベントに基づいてUI要素を更新する。
- すべてのウォレットとトークンの操作を処理します。
- ウォレットに接続`と`ミント\`ボタンをそれぞれの機能で接続する。
  :::

2. このファイルを VS Code で開き、`Web3Manager.cs` のソースコードを [Appendix B](convert-unity-liff.md#appendix-b) に貼り付ける。

### Part 3: Web3Manager GameObjectの設定

最後に、Unityですべてをまとめよう：

1. Manager オブジェクトを作成します：
   - 階層ウィンドウ（ルートレベル）で右クリックします。
   - 空のオブジェクトを作成」を選択する。
   - 名前を "Web3Manager "とする。
2. 台本を添付してください：
   - Web3Manager GameObjectを選択する。
   - Inspector]で、[Add Component]をクリックします。
   - Web3Manager "を検索して選択します。
3. UI要素を接続する：
   - Web3Managerを選択した状態で、インスペクタを見ます。
   - UI要素を階層から対応するフィールドにドラッグ＆ドロップします：
     - ステータステキスト
     - アドレステキスト
     - トークン・バランス・テキスト
     - 接続、切断、ミントボタン
     - 入力フィールド

![](/img/minidapps/unity-minidapp/connect-ui-manager.png)
