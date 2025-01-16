# UnityビルドをLINE LIFFアプリに変換する

さて、ここからがエキサイティングなところです。Unity WebGLビルドをLINEからアクセスできるミニdAppに変身させるのです！

## ステップ1：LIFFアプリの作成<a id="create-liff-app"></a>

まず、LINEエコシステムにアプリをセットアップしよう：

1. LINE Developers コンソールのセットアップ：

   - LINEデベロッパーズコンソールをご覧ください。
   - プロバイダを作成します（すでにプロバイダをお持ちの場合はスキップしてください）。

   ![](/img/minidapps/unity-minidapp/create-provider-lc.png)

   - 新しいLINEログインチャンネルを作成する。

   ![](/img/minidapps/unity-minidapp/line-login-lc.png)

   - LIFFタブに移動する
   - LIFFアプリを追加」をクリック

   ![](/img/minidapps/unity-minidapp/line-liff-add.png)

2. LIFFの設定を行う：

```code
Size: Choose one of:
├── Full (entire screen)
├── Tall (75% of screen)
└── Compact (50% of screen)
Endpoint URL: https://example.com (temporary)
Permissions: Enable as needed
```

:::note
LIFF IDを保存してください - 次のステップで必要になります！
:::

## ステップ2：WebGLテンプレートを修正する<a id="modify-webgl-template"></a>

index.htmlファイルは、web3の可用性をチェックし、LINE統合（LIFF）を設定し、Unityゲームのロードを進め、すべてを接続するのに役立ちます。

```code
<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unity WebGL Player</title>
  <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
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
        await liff.init({
          liffId: "YOUR_LIFF_ID" // Replace with your LIFF ID
        });

        if (!liff.isLoggedIn()) {
          liff.login();
        }

        sdk = await DappPortalSDK.init({
          clientId: 'YOUR CLIENT ID', // Replace with your CLIENT ID
          chainId: '1001'
        });
        
        console.log("SDKs initialized");
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

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
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
        if (liff.isLoggedIn()) {
          await liff.logout();
        }
        
        const provider = sdk.getWalletProvider();
        await provider.request({ method: 'kaia_disconnect' });
        connectedAddress = null;
        myGameInstance.SendMessage('Web3Manager', 'OnWalletDisconnected');
      } catch (error) {
        console.error("Disconnect error:", error);
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
        GetBalance();
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

上記のコード・スニペットでLIFF-IDを変更してください。

## ステップ 3: WebGLビルドのデプロイ<a id="step3-deploy-webgl-build"></a>

- UnityプロジェクトをWebGL用にビルドする
- すべてのビルドファイルをNetlifyなどのウェブサーバーにアップロードする。

デプロイメントのフォルダ構造は次のようになるはずです：

```bash
Minidapp/
├── Build/
│   ├── minidapp.data
│   ├── minidapp.framework.js
│   ├── minidapp.loader.js
│   └── minidapp.wasm
├── scripts/
│   └── dapp_portal_sdk.js
└── index.html
```

## ステップ4：最終設定とテスト<a id="step4-final-config-testing"></a>

1. LIFFエンドポイントを更新する：
   - LINEデベロッパーズコンソールに戻る
   - LIFFアプリを探す
   - 編集」をクリックする
   - 配備したサイトのURLを更新する。

これでミニdAppがすぐに利用できるようになるはずだ。

## まとめ<a id="summing-up"></a>

おめでとう！ Unityを使った初めてのLINE mini dAppの作成が完了しました！ このガイドを完了することで、トークン造幣機能を備えたミニdAppを実装したことになる。 LINE mini dAppの構築は、従来のアプリ開発を超越したものであり、ユーザーがすでに信頼し、日常的に利用しているエコシステムの中で、シームレスなWeb3体験を生み出すことなのです。

カイアの統合により、ブロックチェーン機能をユーザーの手元に直接届けることができ、Web3導入の障壁が取り除かれます。 LINEの広範なリーチとWeb3の能力を組み合わせることで、これまで不可能だった方法でイノベーションを起こすユニークな機会が生まれる。

LINE mini dAppsの威力は、その汎用性とアクセシビリティにある。 新たなブロックチェーンの実装を模索する開発者、顧客エンゲージメントの強化を目指すビジネス、斬新なデジタル体験の創造を目指すイノベーターなど、このプラットフォームはあなたのビジョンを実現するために必要なすべてのツールを提供します。

LINE mini dAppsの開発に関するより詳細な情報については、以下の包括的なリソースをご覧ください：

- [カイア・ドキュメンテーション](https://docs.kaia.io/)
- [LINE Developers Documentation](https://developers.line.biz/en/docs/line-mini-app/)
- [Unityドキュメント](https://docs.unity.com/)

## 付録<a id="appendix"></a>

### 付録A<a id="appendix-a"></a>

[KaiaPlugin.jslibソースコード](https://gist.github.com/ayo-klaytn/2aad97e1e263b00f5403177a7ad1fff1#file-kaiaplugin-jslib)

### 付録B<a id="appendix-b"></a>

[Web3Manager.cs ソースコード](https://gist.github.com/ayo-klaytn/2aad97e1e263b00f5403177a7ad1fff1#file-web3manager-cs)
