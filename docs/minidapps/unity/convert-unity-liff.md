# Convert to LINE LIFF

Now for the exciting part - turning your Unity WebGL build into a mini dApp that can be accessed through LINE!

## Step 1: Create Your LIFF App <a id="create-liff-app"></a>

First, let's set up your app in the LINE ecosystem:

1. LINE Developers Console Setup:

   - Visit LINE Developers Console.
   - Create a Provider (skip if you already have one).

   ![](/img/minidapps/unity-minidapp/create-provider-lc.png)

   - Create a new LINE Login channel.

   ![](/img/minidapps/unity-minidapp/line-login-lc.png)

   - Navigate to the LIFF tab
   - Click "Add LIFF app"

   ![](/img/minidapps/unity-minidapp/line-liff-add.png)

2. Configure LIFF Settings:

```code
Size: Choose one of:
├── Full (entire screen)
├── Tall (75% of screen)
└── Compact (50% of screen)
Endpoint URL: https://example.com (temporary)
Permissions: Enable as needed
```

:::note
Save your LIFF ID - you'll need it in the next step!
:::

## Step 2: Modify Your WebGL Template <a id="modify-webgl-template"></a>

The index.html file helps us to check web3 availability, set up LINE integration (LIFF), proceed to load our Unity game and connect everything together.

```html
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

Make sure to change your LIFF-ID in the code snippet above.

## Step 3: Deploy Your WebGL Build <a id="step3-deploy-webgl-build"></a>

- Build your Unity project for WebGL
- Upload all build files to a web server; e.g Netlify

Your deployment folder structure should look like this:

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

## Step 4: Final Configuration & Testing <a id="step4-final-config-testing"></a>

1. Update your LIFF endpoint:
   - Return to LINE Developers Console
   - Locate your LIFF app
   - Click "Edit"
   - Update URL to your deployed site.

Now your mini dApp should be readily available.

## Summing Up <a id="summing-up"></a>

Congratulations! You've successfully created your first LINE mini dApp with Unity! By completing this guide, you've implemented a mini dApp with token minting functionalities. Building a LINE mini dApp transcends traditional app development - it's about creating seamless Web3 experiences within an ecosystem that users already trust and use daily.

Through Kaia's integration, you've unlocked the ability to bring blockchain functionality directly to users' fingertips, eliminating the usual barriers to Web3 adoption. This combination of LINE's extensive reach and Web3 capabilities creates a unique opportunity to innovate in ways that were previously impossible.

The power of LINE mini dApps lies in their versatility and accessibility. Whether you're a developer exploring new blockchain implementations, a business looking to enhance customer engagement, or an innovator seeking to create novel digital experiences, the platform provides all the tools needed to bring your vision to life.

For more detailed information on developing LINE mini dApps, explore these comprehensive resources:

- [Kaia Documentation](https://docs.kaia.io/)
- [LINE Developers Documentation](https://developers.line.biz/en/docs/line-mini-app/)
- [Unity Documentation](https://docs.unity.com/)

## Appendix <a id="appendix"></a>

### Appendix A <a id="appendix-a"></a>

[KaiaPlugin.jslib source code](https://gist.github.com/ayo-klaytn/2aad97e1e263b00f5403177a7ad1fff1#file-kaiaplugin-jslib)

### Appendix B <a id="appendix-b"></a>

[Web3Manager.cs source code](https://gist.github.com/ayo-klaytn/2aad97e1e263b00f5403177a7ad1fff1#file-web3manager-cs)
