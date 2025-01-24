# Unityアプリのビルド

## 前提条件

その前に、あなたが持っていることを確認してください：

- コンピュータにインストールされた[Unity Hub](https://unity.com/download) - ここにdAppのインターフェースを構築します。
- 基本的なC#とJavaScriptの知識 - あまり派手なものはなく、基礎的なものです。
- LINE Developerアカウント - メールで簡単に作成できます。
- カイア水栓】のカイアを試す(https://faucet.kaia.io/)
- Dapp Portalチームから受け取ったDapp Portal SDKクライアントID。
- Web3の概念にある程度精通している - ウォレットとトークンを理解していれば問題ない。

## Unity環境のセットアップ

開発環境を整えよう。 まずはUnityのセットアップから。

### ステップ1：Unityバージョンのインストールと確認

はじめに、互換性の問題を避けるために、Unityのバージョンが同じであることを確認しましょう：

- まだの場合はUnity Hubをインストールしてください。
- Unity Editorバージョン2022.3.50f1をインストールします。

### ステップ 2: 新しいUnityプロジェクトの作成

1. Unity Hubを開き、Projectsタブに向かいます。
2. 右上の「新規プロジェクト」ボタンをクリックします。
3. All templates "で、\*\*3D (Built-in Render Pipeline)\*\*テンプレートを選択します。
4. プロジェクトに意味のある名前をつける（例：mini-dApp-example）。
5. プロジェクトファイルを保存するのに便利な場所を選んでください。
6. プロジェクトの作成\*\*をクリックします。

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

## dAppのUIコンポーネントを作成する

このセクションでは、dAppのユーザー・インターフェースを構築する！ 私たちは、ステータス更新、アクション、造幣機能のための3つのメインパネルを備えた構造化されたUIシステムを作成します。

### メイン・キャンバスの設定

まず、ベースとなるキャンバスを作りましょう：

1. 階層ウィンドウで、"Sample Scene "を右クリックします。
2. GameObject → UI → Canvasに移動します。

### Web3UIコンテナの作成

1. 新しいキャンバスを右クリックします。
2. Create Empty」を選択する。
3. 名前を "Web3UI "に変更する。

### メインパネルのセットアップ

Web3UIの中に、3つのパネルオブジェクトを作成します：

1. Web3UIを右クリックし、"Create Empty "を選択する。
2. これらのパネルを作成し、名前を変更する：
   - StatusPanel - dAppの情報表示
   - ButtonPanel - ユーザーとのインタラクション用
   - MintPanel - トークン造幣機能用

### パネル・コンポーネントの作成

#### StatusPanel コンポーネント

このパネルには、Web3の重要な情報がすべて表示されます：

- StatusPanelを右クリックし、UI → Text - TextMeshProをクリックし、StatusTextにリネームする。 インスペクタペインの "テキスト入力 "フィールド（例："Status..."）に必ず入力してください。

:::note
**テキストメッシュプロ(TMP)のセットアップ**について\*\*

TextMeshProエレメントを初めて作成するとき（UI - Text - TextMeshPro）、Unityは自動的にTMP Essentialsをインポートするよう促します。 誤ってこのプロンプトをスキップしてしまった場合は、Window > TextMeshPro > Import TMP Essentialsから手動でインポートすることができます。

これが必要な理由TextMeshProは、ゲーム内でテキストを適切に表示するために、コアリソース（シェーダー、デフォルトフォント、マテリアル）を必要とします。 これらの必需品がないと、テキストコンポーネントが正しくレンダリングされず、プロジェクトでシェーダーやマテリアルのエラーが発生します。 これは、テキストを正しく動作させるために必要な1回限りのセットアップである。
:::

![](/img/minidapps/unity-minidapp/status_text.png)

- StatusPanelを右クリックし、UI → Text - TextMeshProをクリックし、AddressTextにリネームする。 テキスト・オブジェクトを必ず入力してください（例："Address Text..."）。
- StatusPanel を右クリックし、UI → Text - TextMeshPro をクリックし、TokenBalanceText にリネームする。 テキストオブジェクトを必ず入力してください。例："0.0000 ET"

```code
├── StatusText (TextMeshPro)
│   └── Default: "Status..."
├── AddressText (TextMeshPro)
│   └── Default: "Address Text..."
└── TokenBalanceText (TextMeshPro)
    └── Default: "0.0000 ET"
```

#### ボタンパネル・コンポーネント

あなたの主な対話ボタン

- ButtonPanelを右クリックし、UI → Button - TextMeshProをクリックし、ConnectWalletButtonに名前を変更します。 インスペクタペインの "テキスト入力 "フィールドに "Connect Wallet "と入力してください。

```code
ButtonPanel
├── ConnectButton (Button - TextMeshPro)
│   └── Text: "Connect Wallet"
```

#### MintPanelコンポーネント

トークンの造幣インターフェース：

- MintPanelを右クリックし、UI → Input Field → TextMeshProをクリックし、MintAmountInputにリネームする。 プレースホルダー・オブジェクトを必ず "Enter Amount…" で埋めてください。
- MintPanelを右クリックし、UI → Button → TextMeshProをクリックし、MintButtonにリネームする。 テキスト・オブジェクトは必ず "Mint "で埋めてください。

```code
MintPanel
├── MintAmountInput (Input Field - TextMeshPro)
│   └── Placeholder: "Enter Amount..."
└── MintButton (Button - TextMeshPro)
    └── Text: "Mint"
```

すべてのコンポーネントを作成した後、階層は次のようになります：

```code
Canvas
└── Web3UI
    ├── StatusPanel
    ├── ButtonPanel
    └── MintPanel
```

![](/img/minidapps/unity-minidapp/unity_ui_canvas.png)

:::note
上の画像のようにコンポーネントをうまく並べるには、各コンポーネントをクリックしたときに右側にあるアイコンを使って手動で並べる必要がある。
:::

## Web3統合の設定

このセクションでは、Unityプロジェクトにweb3を統合するためのパーツを作成します。

### KIP7スマートコントラクトの作成とデプロイ

まず、Kaiaコントラクト・ウィザードを使ってスマート・コントラクトを生成する。

#### ステップ1：カイア契約ウィザードの使用

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

#### ステップ2：Remix IDEを使ったデプロイ

1. 上記のコードをRemix IDE上で新規作成したファイル`ET.sol`にコピー＆ペーストする。
2. リミックスIDEで：
   - **Compile contract**ボタンをクリックする。
   - プラグインマネージャーで**Kaiaプラグイン**を有効にする。
   - Kaia PluginタブのEnvironmentで、**Injected Provider** - **Kaia Wallet**を選択します。
   - **Contract**のドロップダウンで契約（ExampleTokens）を検索します。
   - **Deploy**をクリックしてトークンを起動します！
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

このファイルをVS Codeで開き、[Appendix A](../minidapps/convert-unity-liff.md#appendix-a)にある`KaiaPlugin.jslib`のソースコードを貼り付ける：

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

2. このファイルを VS Code で開き、`Web3Manager.cs` のソースコードを [Appendix B](../minidapps/convert-unity-liff.md#appendix-b) に貼り付ける。

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
     - コネクト／ミントボタン
     - 入力フィールド

![](/img/minidapps/unity-minidapp/connect_ui_manager.png)

## WebGLビルド設定のセットアップ

このセクションでは、ウェブ用にdAppを設定する！ これは、Web3互換性のためにUnityを設定し、Kaia統合のためのカスタムテンプレートを作成します。

### ステップ1：WebGLプラットフォームに切り替える

1. File → Build Settingsに移動する。
2. WebGLを選択し、"Switch Platform "をクリックします。

:::note
初めて切り替える場合は、数分かかるかもしれない。
:::

![](/img/minidapps/unity-minidapp/ui-webgl-switch.png)

### ステップ2：カスタムWebGLテンプレートの作成

Web3の機能を統合するためのカスタムテンプレートが必要です。 これが我々のフォルダ構造だ：

```code
Assets/
└── WebGLTemplates/
    └── KaiaTemplate/
        ├── index.html
        └── scripts/
            └── dapp_portal_sdk.js
```

:::info
\*\*なぜカスタム・テンプレートなのか？

デフォルトのUnityテンプレートにはWeb3のサポートが含まれていません。 私たちのカスタムテンプレートは

- 必要なWeb3ライブラリをロードします。
- カイアウォレットの統合を有効にする。
- ブロックチェーンのやり取りを適切に処理する。
  :::

### ステップ3：index.htmlの設定

以下のコードをコピーして `index.html` ファイルに貼り付けます：

```
<!DOCTYPE html>
<html lang="en-us">
 <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Unity WebGL Player</title>
   <script src="scripts/dapp_portal_sdk.js"></script>
   <style>
     body { margin: 0; padding: 0; }
     #unity-container { width: 100%; height: 100%; position: absolute; }
     #unity-canvas { width: 100%; height: 100%; background: #231F20; }
     #unity-loading-bar { display: none; }
     #unity-progress-bar-empty { width: 141px; height: 18px; margin-top: 10px; background: url('Build/minidapp.progress-bar-empty-dark.png') no-repeat center; }
     #unity-progress-bar-full { width: 0%; height: 18px; margin-top: 10px; background: url('Build/minidapp.progress-bar-full-dark.png') no-repeat center; }
   </style>
 </head>
 <body>
   <div id="unity-container">
     <canvas id="unity-canvas"></canvas>
     <div id="unity-loading-bar">
       <div id="unity-progress-bar-empty">
         <div id="unity-progress-bar-full"></div>
       </div>
     </div>
   </div>
   <script src="Build/minidapp.loader.js"></script>
   <script>
     var sdk = null;
     var connectedAddress = null;
     var myGameInstance = null;

     var Module = {
       onRuntimeInitialized: function() {
         console.log("Runtime initialized");
       },
       env: {
         MintToken: function(amount) {
           window.MintToken(amount);
         },
         GetBalance: function() {
           window.GetBalance();
         },
         ConnectWallet: function() {
           window.ConnectWallet();
         },
         GetConnectedAddress: function() {
           var address = window.GetConnectedAddress();
           var bufferSize = lengthBytesUTF8(address) + 1;
           var buffer = _malloc(bufferSize);
           stringToUTF8(address, buffer, bufferSize);
           return buffer;
         }
       }
     };

     async function initializeSDK() {
       try {
         sdk = await DappPortalSDK.init({
           clientId: 'PASTE CLIENT ID',
           chainId: '1001'
         });
         console.log("SDK initialized");
         return true;
       } catch (error) {
         console.error("SDK init error:", error);
         return false;
       }
     }

     window.ConnectWallet = async function() {
       try {
         if (!sdk) {
           const initialized = await initializeSDK();
           if (!initialized) return null;
         }

         const provider = sdk.getWalletProvider();
         const accounts = await provider.request({ method: 'kaia_requestAccounts' });
         
         if (accounts && accounts.length > 0) {
           connectedAddress = accounts[0];
           myGameInstance.SendMessage('Web3Manager', 'OnWalletConnected', connectedAddress);
         }
       } catch (error) {
         myGameInstance.SendMessage('Web3Manager', 'OnWalletError', error.message);
       }
     }

     window.GetConnectedAddress = function() {
       return connectedAddress || '';
     }

     window.MintToken = async function(amount) {
       try {
         const provider = sdk.getWalletProvider();
         
         const mintSignature = '0xa0712d68';
         const amountHex = amount.toString(16).padStart(64, '0');
         const data = mintSignature + amountHex;

         const tx = {
           from: connectedAddress,
           to: '0x099D7feC4f799d1749adA8815eB21375E13E0Ddb',
           value: '0x0',
           data: data,
           gas: '0x4C4B40'
         };

         const txHash = await provider.request({
           method: 'kaia_sendTransaction',
           params: [tx]
         });

         myGameInstance.SendMessage('Web3Manager', 'OnMintSuccess', txHash);
         GetBalance(); // Get updated balance after mint
       } catch (error) {
         myGameInstance.SendMessage('Web3Manager', 'OnMintError', error.message);
       }
     }

     window.GetBalance = async function() {
       try {
         const provider = sdk.getWalletProvider();
         
         const balanceSignature = '0x70a08231';
         const addressParam = connectedAddress.substring(2).padStart(64, '0');
         const data = balanceSignature + addressParam;

         const result = await provider.request({
           method: 'kaia_call',
           params: [{
             from: connectedAddress,
             to: '0x099D7feC4f799d1749adA8815eB21375E13E0Ddb',
             data: data
           }, 'latest']
         });

         const balance = parseInt(result, 16);
         myGameInstance.SendMessage('Web3Manager', 'OnBalanceReceived', balance.toString());
       } catch (error) {
         myGameInstance.SendMessage('Web3Manager', 'OnBalanceError', error.message);
       }
     }

     createUnityInstance(document.querySelector("#unity-canvas"), {
       dataUrl: "Build/minidapp.data",
       frameworkUrl: "Build/minidapp.framework.js",
       codeUrl: "Build/minidapp.wasm",
       streamingAssetsUrl: "StreamingAssets",
       companyName: "DefaultCompany",
       productName: "minidapp",
       productVersion: "0.1",
     }).then((unityInstance) => {
       myGameInstance = unityInstance;
     });
   </script>
 </body>
</html>

```

### ステップ4：Dapp Portal SDKのセットアップ

1. Visit: https://static.kaiawallet.io/js/dapp-portal-sdk.js
2. 内容を `scripts/dapp_portal_sdk.js` に保存します。  ローカルのDapp Portal SDKファイルを使用することで、ロード時間と信頼性が向上します。

:::note
Alternatively, you can directly add the link to the Dapp Portal SDK as the `src` in the `script` tag in your `index.html`.

```js
// <script src="scripts/dapp_portal_sdk.js"></script>
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

:::

### ステップ5：カスタムテンプレートを使用するようにUnityを設定する

- ビルド設定を開きます。
- プレーヤー設定に移動します。
- 決議と発表」の下：
  - WebGL Template "を探す。
  - KaiaTemplate」を選択する。
- "Publish Settings "の "Compression Format "フィールドで "**disabled**"を選択します。

![](/img/minidapps/unity-minidapp/ui-select-webgl-temp.png)

### ステップ6：dAppの構築

さあ、すべてをまとめよう：

1. ビルド設定を開く（File → Build Settings）。
2. Build And Run "をクリックする。
3. ビルドプロジェクトをUnity上でプロンプトに従って保存します。
4. 重要なビルドファイル：

```bash
minidapp/
├── minidapp.loader.js
├── minidapp.data
├── minidapp.framework.js
└── minidapp.wasm
```

### ステップ 7: ビルド後の設定

プロジェクトを構築した後

1. ビルドフォルダを開く。
2. 生成されたすべてのファイル名に注意。
3. これらの名前に合わせてindex.htmlを更新する。
4. 変更を保存して再構築する。
5. ブラウザにタブが開くはずです。

![](/img/minidapps/unity-minidapp/ui_build_app.png)

### ステップ8：WebGLビルドをLocalhost:3000にルーティングする

セキュリティと開発目的のため、DApp Portal SDKは現在localhost:3000で動作します。 現時点では、デフォルトのUnity WebGLビルドはランダムなポート（61445など）を使用しており、アプリを効率的に動作させるには、Unity WebGLビルドをlocalhost:3000で開くように設定する必要があります。

そのためには、以下の手順に従ってください：

1. 以下のコードをコピーして、プロジェクトターミナルに貼り付けます。

```bash
# Install http-server globally
npm install -g http-server
```

2. ビルド・フォルダーに移動する

```bash
cd path/to/minidapp
```

3. ポート3000でサーバーを起動

```bash
http-server -p 3000
```

![](/img/minidapps/unity-minidapp/lh_3000.png)

## アプリケーションのテストと実行

さて、プロジェクトを走らせたので、テストして操作してみよう。

- Connect Wallet ボタンをクリックして Dapp Portal Wallet に接続します。
- 接続が完了したら、接続されたアドレスに送金するための詳細（金額）を記入する。

![](/img/minidapps/unity-minidapp/minidapp.gif)
