# WebGLビルド設定

このセクションでは、ウェブ用にdAppを設定する！ これは、Web3互換性のためにUnityを設定し、Kaia統合のためのカスタムテンプレートを作成します。

## ステップ1：WebGLプラットフォームに切り替える

1. File → Build Settingsに移動する。
2. WebGLを選択し、"Switch Platform "をクリックします。

:::note
初めて切り替える場合は、数分かかるかもしれない。
:::

![](/img/minidapps/unity-minidapp/ui-webgl-switch.png)

## ステップ2：カスタムWebGLテンプレートの作成

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

## ステップ3：index.htmlの設定

以下のコードをコピーして `index.html` ファイルに貼り付けます：

```html
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
         DisconnectWallet: function() {
          window.DisconnectWallet();
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

     window.DisconnectWallet = async function() {
       try {
         if (!sdk) {
           console.error("SDK not initialized");
           return;
         }

         const provider = sdk.getWalletProvider();
         await provider.disconnect();
         
         // Reset connected address
         connectedAddress = null;
         myGameInstance.SendMessage('Web3Manager', 'OnWalletDisconnected');
         console.log("Wallet disconnected successfully");
       } catch (error) {
         console.error("Disconnect error:", error);
         myGameInstance.SendMessage('Web3Manager', 'OnWalletError', "Disconnect failed: " + error.message);
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

## ステップ4：Mini Dapp SDKのセットアップ

1. 訪問：https://static.kaiawallet.io/js/dapp-portal-sdk.js
2. 内容を `scripts/dapp-portal-sdk.js` に保存する。 ローカルのMini Dapp SDKファイルを使用することで、ロード時間と信頼性が向上します。

:::note
あるいは、ミニダップSDKへのリンクを `index.html` の `script` タグの `src` として直接追加することもできます。

```js
// <script src="scripts/dapp_portal_sdk.js"></script>
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

:::

## ステップ5：カスタムテンプレートを使用するようにUnityを設定する

- ビルド設定を開きます。
- プレーヤー設定に移動します。
- 決議と発表」の下：
 - WebGL Template "を探す。
 - KaiaTemplate」を選択する。
- Publish Settings "の "Compression Format "フィールドで "**disabled**"を選択します。

![](/img/minidapps/unity-minidapp/ui-select-webgl-temp.png)

## ステップ6：dAppの構築

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

## ステップ 7: ビルド後の設定

プロジェクトを構築した後

1. ビルドフォルダを開く。
2. 生成されたすべてのファイル名に注意。
3. これらの名前に合わせてindex.htmlを更新する。
4. 変更を保存して再構築する。
5. ブラウザにタブが開くはずです。

![](/img/minidapps/unity-minidapp/ui-build-app.png)

## ステップ8：WebGLビルドをLocalhost:3000にルーティングする

セキュリティと開発目的のため、Mini Dapp SDKは現在localhost:3000で動作しています。 現時点では、デフォルトのUnity WebGLビルドはランダムなポート（61445など）を使用しており、アプリを効率的に動作させるには、Unity WebGLビルドをlocalhost:3000で開くように設定する必要があります。

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

![](/img/minidapps/unity-minidapp/minidapp-demo.gif)
