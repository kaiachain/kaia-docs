# Converting Your Unity Build to a LINE LIFF App

Now for the exciting part - turning your Unity WebGL build into a mini dApp that can be accessed through LINE! 

## Step 1: Create Your LIFF App <a id="create-liff-app"></a> 

First, let's set up your app in the LINE ecosystem:

1. LINE Developers Console Setup:
    * Visit LINE Developers Console.
    * Create a Provider (skip if you already have one).

    ![](/img/minidapps/unity-minidapp/create-provider-lc.png)

    * Create a new LINE Login channel.

    ![](/img/minidapps/unity-minidapp/line-login-lc.png)

    * Navigate to the LIFF tab
    * Click "Add LIFF app"

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

```code
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Unity WebGL - Mini dApp</title>
    
    <!-- Add Web3.js BEFORE other scripts -->
    <script src="./scripts/web3.min.js"></script>
    <!-- LIFF SDK -->
    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <!-- Unity Loader -->
    <script src="Build/minidapp.loader.js"></script>
    <script>
      // Allow paste anywhere on the page
      document.addEventListener('keydown', function(e) {
          if (e.ctrlKey && e.key === 'v') {
              // Trigger paste event
              navigator.clipboard.readText().then(function(text) {
                  var pasteEvent = new ClipboardEvent('paste', {
                      clipboardData: new DataTransfer()
                  });
                  pasteEvent.clipboardData.setData('text', text);
                  document.dispatchEvent(pasteEvent);
              });
          }
      });
  </script>
    <style>
      html, body { height: 100%; margin: 0; padding: 0; }
      #unity-canvas { width: 100%; height: 100%; display: block; }
    </style>
  </head>
  <body>
    <div id="loading">Loading...</div>
    <canvas id="unity-canvas"></canvas>
    
    <script>
      var myGameInstance = null;
      
      // Add this function to check Web3 availability
      function checkWeb3() {
        if (typeof Web3 !== 'undefined') {
          console.log("Web3 is available");
          return true;
        }
        console.error("Web3 is not available");
        return false;
      }
      async function initializeLiff() {
        try {
          // Check Web3 first
          if (!checkWeb3()) {
            throw new Error("Web3 is not loaded");
          }
          await liff.init({
            liffId: "2006555499-b4Z6DegW"
          });
          console.log("LIFF initialized");
          
          initializeUnity();
        } catch (error) {
          console.error("Initialization failed:", error);
          document.getElementById('loading').textContent = 'Error: ' + error.message;
        }
      }
      function initializeUnity() {
        createUnityInstance(document.querySelector("#unity-canvas"), {
          dataUrl: "Build/minidapp.data.unityweb",
          frameworkUrl: "Build/minidapp.framework.js.unityweb",
          codeUrl: "Build/minidapp.wasm.unityweb",
        }).then((unityInstance) => {
          console.log("Unity initialized");
          myGameInstance = unityInstance;
          document.getElementById('loading').style.display = 'none';
        });
      }
      // Wait for page to load completely before initializing
      window.addEventListener('load', function() {
        // Give a small delay to ensure Web3 is loaded
        setTimeout(initializeLiff, 500);
      });
    </script>
  </body>
</html>

```

Make sure to change your LIFF-ID in the code snippet above. 

## Step 3: Deploy Your WebGL Build <a id="step3-deploy-webgl-build"></a>

* Build your Unity project for WebGL
* Upload all build files to a web server. For this guide, I have uploaded the WebGL build on Netlify and its available [here](https://kaia-minidapp-example.netlify.app/).

Your deployment folder structure should look like this:

```bash
Minidapp/
├── Build/
│   ├── minidapp.data.unityweb
│   ├── minidapp.framework.js.unityweb
│   ├── mini.loader.js
│   └── minidapp.wasm.unityweb
├── scripts/
│   └── web3.min.js
└── index.html
```

## Step 4: Final Configuration & Testing <a id="step4-final-config-testing"></a>

1. Update your LIFF endpoint:
    * Return to LINE Developers Console
    * Locate your LIFF app
    * Click "Edit"
    * Update URL to your deployed site : https://kaia-minidapp-example.netlify.app/
    
Now your mini dApp should be readily available at https://liff.line.me/2006555499-b4Z6DegW   


## Summing Up <a id="summing-up"></a>

Congratulations! You've successfully created your first LINE mini dApp with Unity! By completing this guide, you've implemented a mini dApp with token minting functionalities. Building a LINE mini dApp transcends traditional app development - it's about creating seamless Web3 experiences within an ecosystem that users already trust and use daily. 

Through Kaia's integration, you've unlocked the ability to bring blockchain functionality directly to users' fingertips, eliminating the usual barriers to Web3 adoption. This combination of LINE's extensive reach and Web3 capabilities creates a unique opportunity to innovate in ways that were previously impossible.

The power of LINE mini dApps lies in their versatility and accessibility. Whether you're a developer exploring new blockchain implementations, a business looking to enhance customer engagement, or an innovator seeking to create novel digital experiences, the platform provides all the tools needed to bring your vision to life. 

For more detailed information on developing LINE mini dApps, explore these comprehensive resources:

* [Kaia Documentation](https://docs.kaia.io/)
* [LINE Developers Documentation](https://developers.line.biz/en/docs/line-mini-app/)
* [Unity Documentation](https://docs.unity.com/)


## Appendix <a id="appendix"></a>

### Appendix A <a id="appendix-a"></a>
[KaiaPlugin.jslib source code](https://gist.github.com/ayo-klaytn/2aad97e1e263b00f5403177a7ad1fff1#file-kaiaplugin-jslib)

### Appendix B <a id="appendix-b"></a>
[Web3Manager.cs source code](https://gist.github.com/ayo-klaytn/2aad97e1e263b00f5403177a7ad1fff1#file-web3manager-cs)


