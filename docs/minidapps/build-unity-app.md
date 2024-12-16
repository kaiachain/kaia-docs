# Build Unity App

## Prerequisites 

Before we dive in, make sure you have:

* [Unity Hub](https://unity.com/download) installed on your computer - this is where we'll build our dApp interface
* Basic C# and JavaScript knowledge - nothing too fancy, just the fundamentals
* [Kaia Wallet Extension](https://www.kaiawallet.io/) - you'll need this to test your dApp's Web3 features
* A LINE Developer account - you can easily create one using your email
* Some familiarity with Web3 concepts - if you understand wallets and tokens, you're good to go. 


## Setting Up Your Unity Environment 

Let's set up your development environment. We'll start with the Unity setup.

### Step 1: Install and Verify Unity Version 

To begin, let's make sure we're all using the same Unity version to avoid any compatibility issues:
* Install Unity Hub if you haven't already.
* Install Unity Editor version 2022.3.50f1 specifically.

### Step 2: Create Your New Unity Project 

1. Open Unity Hub and head to the Projects tab.
2. Click the inviting "New project" button in the top-right corner.
3. Under "All templates", select the **3D (Built-in Render Pipeline)** template.
4. Give your project a meaningful name (e.g., mini-dApp-example).
5. Choose a convenient location for your project files.
6. Click **Create project**. 

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

## Creating Your dApp's UI Components 

In this section, we will build our dApp's user interface! We'll create a structured UI system with three main panels for status updates, actions, and minting functionality.

### Setting Up the Main Canvas 
First, let's create our base canvas:

1. In the Hierarchy window, right-click on "Sample Scene".
2. Navigate to GameObject → UI → Canvas.

### Creating the Web3UI Container

1. Right-click on your new Canvas.
2. Select "Create Empty".
3. Rename it to "Web3UI".

### Setting Up Main Panels 
Inside Web3UI, create three panel objects:

1. Right-click on Web3UI and select "Create Empty".
2. Create and rename these panels:
    * StatusPanel - Your dApp's information display
    * ButtonPanel - For user interactions
    * MintPanel - For token minting features

### Creating Panel Components

#### StatusPanel Components
This panel shows all your important Web3 information:

* Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to StatusText. Make sure to fill the “Text Input” field in the Inspector pane e.g. "checking web3".

:::note
**TextMeshPro (TMP) Setup**

When you first create a TextMeshPro element (UI - Text - TextMeshPro), Unity automatically prompts you to import TMP Essentials. If you accidentally skip this prompt, you can manually import it through Window > TextMeshPro > Import TMP Essentials.

Why we need this: TextMeshPro requires core resources (shaders, default fonts, and materials) to properly display text in your game. Without these essentials, your text components won't render correctly and you'll see shader/material errors in your project. This is a one-time setup that's necessary for text to work properly.
:::

![](/img/minidapps/unity-minidapp/statusText-textInput.png)

* Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to AddressText. Make sure to fill the "Text Input" field in the Inspector pane e.g. "Not Connected".
* Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to NetworkText. Make sure to fill the "Text Input" field in the Inspector pane "No Network".
* Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to TokenBalanceText. Make sure to fill the "Text Input" field in the Inspector pane e.g. "0.0000 UTT".

```code
├── StatusText (TextMeshPro)
│   └── Default: "Checking Web3..."
├── AddressText (TextMeshPro)
│   └── Default: "Not Connected"
├── NetworkText (TextMeshPro)
│   └── Default: "No Network"
└── TokenBalanceText (TextMeshPro)
    └── Default: "0.0000 UTT"
```

#### ButtonPanel Components

Your main interaction buttons:

* Right click on ButtonPanel, click on UI → Button - TextMeshPro and then rename it to ConnectButton. Make sure to fill the "Text Input" field in the Inspector pane with "Connect Wallet".
* Right click on ButtonPanel, click on UI → Button - TextMeshPro and then rename to RefreshButton. Make sure to fill the "Text Input" field in the Inspector pane with "Refresh Balance".

```code
ButtonPanel
├── ConnectButton (Button - TextMeshPro)
│   └── Text: "Connect Wallet"
└── RefreshButton (Button - TextMeshPro)
    └── Text: "Refresh Balance"
```

#### MintPanel Components 

The token minting interface:

* Right click on MintPanel, click on UI → Legacy →  Input Field and then rename it to MintAddressInput. Make sure to fill the placeholder "Text Input" field in the Inspector pane with "Enter Address...".
* Right click on MintPanel, click on UI → Legacy →  Input Field and then rename it to MintAmountInput. Make sure to fill the placeholder "Text Input" field in the Inspector pane with "Enter Amount…".
* Right click on MintPanel, click on UI →  Button - TextMeshPro  and then rename it to MintButton. Make sure to fill the "Text Input" field in the Inspector pane with "Mint Tokens…".

```code 
MintPanel
├── MintAddressInput (Legacy Input Field)
│   └── Placeholder: "Enter Address..."
├── MintAmountInput (Legacy Input Field)
│   └── Placeholder: "Enter Amount..."
└── MintButton (Button - TextMeshPro)
    └── Text: "Mint Tokens"
```

After creating all components, your hierarchy should look like this:

```code
Canvas
└── Web3UI
    ├── StatusPanel
    ├── ButtonPanel
    └── MintPanel
```

![](/img/minidapps/unity-minidapp/unity-ui-canvas.png)

:::note
For your component to be well arranged as seen in the image above, you have to manually arrange them with the icon on the right-hand side when you click on each component. 
:::

## Setting Up Web3 Integration 

In this section, we will build up pieces to integrate web3 into our Unity project.

### Creating and deploying KIP7 smart contract 

First, we'll use Kaia Contract Wizard to generate our smart contract. 

#### Step 1: Using Kaia Contract Wizard

1. Navigate to Kaia Contract Wizard.
2. Select KIP7 (Kaia's token standard, similar to ERC20).
3. Configure your token:
    * Name: UnityTestToken (or something else!)
    * Symbol: UTT (your token's ticker)
    * Premint: 100 (initial token supply)
    * Features: Check ✅ Mintable

For this guide, we will tweak the mint function not to have onlyOwner modifier. To do this, we have to remove the ownable.sol import, and Ownable inheritance. The tweaked code should now look like this:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
contract UnityTestToken is KIP7 {
    constructor() KIP7("UnityTestToken", "UTT") {
        _mint(msg.sender, 1000 * 10 ** decimals());
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
    function mint(address to, uint256 amount) public  {
        _mint(to, amount);
    }
}
```

:::info
 We removed the onlyOwner modifier to allow anyone to call the mint function other than the original deployer or owner of the contract. 
:::

#### Step 2: Deploying via Remix IDE 

1. Copy and Paste the code above in a newly created file `UTT.sol` on Remix IDE.
2. In Remix IDE:
    * Click the **Compile contract** button.
    * Activate the **Kaia plugin** in the plugin manager.
    * Under Environment in the Kaia Plugin tab, choose **Injected Provider** - **Kaia Wallet**.
    * Find your contract (UnityTestToken) in the **Contract** dropdown.
    * Click **Deploy** to launch your token!
3. When your Kaia Wallet pops up:
    * Review the deployment details.
    * Click Confirm to deploy to Kaia Kairos Testnet.

:::important
Copy and save the deployed contract address. You'll need it later in the tutorial.
:::

## Building the Unity-Web3 Bridge 

Now we'll create the vital connection between Unity and Web3 functionality. This is where we bring blockchain capabilities into your Unity application!

### Part 1: Creating the Plugin Bridge (kaiaPlugin.jslib) 

First, we'll build our JavaScript bridge that lets Unity talk to Web3:

1. Create your plugin directory:

```
Assets/
└── Plugins/
    └── WebGL/
        └── KaiaPlugin.jslib    // We'll create this file
```

2. Why a .jslib? Think of it as a translator between Unity's C# and the browser's JavaScript - essential for Web3 interactions!

3. The plugin will handle five core functions:
    * InitializeWeb3() - Sets up your Web3 environment
    * ConnectWallet() - Handles Kaia Wallet connections
    * GetTokenBalance() - Checks token balances
    * MintTokens() - Manages token minting
    * EnableWebGLCopyPaste() - Adds clipboard support

Open this file in VS Code and paste the `KaiaPlugin.jslib` source code in [Appendix A](../minidapps/convert-unity-liff.md#appendix-a):

### Part 2: Creating the C# Manager (Web3Manager.cs) 

Next, we'll create our C# script to manage all Web3 operations:

1. Create your scripts directory:

```js
Assets/
└── Scripts/
    └── Web3/
        └── Web3Manager.cs    // We'll create this file
```

:::info

**What does Web3Manager do?**

* Acts as the main conductor for all Web3 operations.
* Manages communication with our JavaScript plugin.
* Updates UI elements based on blockchain events.
* Handles all wallet and token operations.
:::


2. Open this file in VS Code and paste the `Web3Manager.cs` source code in [Appendix B](../minidapps/convert-unity-liff.md#appendix-b)


### Part 3: Setting Up the Web3Manager GameObject 

Finally, let's bring it all together in Unity:

1. Create the Manager Object:
    * Right-click in the Hierarchy window (root level).
    * Select "Create Empty Object".
    * Name it "Web3Manager".
2. Attach Your Script:
    * Select the Web3Manager GameObject.
    * In Inspector, click Add Component.
    * Search for and select "Web3Manager".
3. Connect UI Elements:
    * With Web3Manager selected, look in the Inspector.
    * Drag and drop your UI elements from the Hierarchy to the corresponding fields:
        * StatusText
        * AddressText
        * NetworkText
        * TokenBalanceText
        * Connect/Refresh/Mint buttons
        * Input fields

![](/img/minidapps/unity-minidapp/connect-ui-manager.png)

## Connecting C# Script with game objects

In this section, we will connect the following buttons with their respective functions from the Web3Manager script:

### A. ConnectWallet 

* Click on ConnectButton from the Hierarchy window.
* Add an OnClick() function by clicking on the ➕ button.
* Drag the Web3Manager game object script into the OnClick() function.
* Click on No Function → Web3Manager → ConnectToWallet().

![](/img/minidapps/unity-minidapp/ui-connect-wallet.png)

### B. RefreshBalance 

* Click on RefreshBalanceButton from the Hierarchy window.
* Add an OnClick() function by clicking on the ➕ button.
* Drag the Web3Manager game object into None object field.
* Click on No Function → Web3Manager → RefreshBalance().

### C. MintButton

* Click on MintButton from the Hierarchy window.
* Add an OnClick() function by clicking on the ➕ button.
* Drag the Web3Manager game object into None object field.
* Click on No Function → Web3Manager → MintTokens().


## Setting Up WebGL Build Settings 

In this section, we will configure our dApp for the web! This will configure Unity for Web3 compatibility and create a custom template for Kaia integration.

### Step 1: Switch to WebGL Platform

1. Navigate to File → Build Settings.
2. Select WebGL and click "Switch Platform".

:::note
This might take a few minutes if it's your first time switching.
:::

![](/img/minidapps/unity-minidapp/ui-webgl-switch.png)

### Step 2: Creating a Custom WebGL Template 

We need a custom template to integrate Web3 capabilities. Here's our folder structure:

```code
Assets/
└── WebGLTemplates/
    └── KaiaTemplate/
        ├── index.html
        └── scripts/
            └── web3.min.js
```

:::info
**Why Custom Template?**

The default Unity template doesn't include Web3 support. Our custom template will:

* Load necessary Web3 libraries.
* Enable Kaia Wallet integration.
* Handle blockchain interactions properly.
:::

### Step 3: Setting Up index.html

Copy and paste the code below in your `index.html` file:

```
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Unity WebGL - Mini dApp</title>
    <script src="./scripts/web3.min.js"></script>
    <style>
      body { margin: 0; }
      #unity-canvas { width: 100%; height: 100vh; display: block; }
    </style>
  </head>
  <body>
    <div id="loading">Loading...</div>
    <canvas id="unity-canvas"></canvas>
    <script src="Build/minidapp.loader.js"></script>
    <script>
      console.log("Script starting...");
      var myGameInstance = null;
      
      createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "Build/minidapp.data.unityweb",
        frameworkUrl: "Build/minidapp.framework.js.unityweb",
        codeUrl: "Build/minidapp.wasm.unityweb",
      }).then((unityInstance) => {
        console.log("Unity instance created");
        myGameInstance = unityInstance;
        document.getElementById('loading').style.display = 'none';
      }).catch((error) => {
        console.error('Unity instance error:', error);
        document.getElementById('loading').textContent = 'Error loading game: ' + error;
      });
    </script>
  </body>
</html>

```

### Step 4: Setting Up Web3.min.js

1. Visit: https://cdn.jsdelivr.net/npm/web3@4.15.0/dist/web3.min.js
2. Save the content to your `scripts/web3.min.js`.  Using a local Web3.js file improves load times and reliability.

### Step 5: Configure Unity to Use Custom Template

* Open Build Settings.
* Navigate to Player Settings.
* Under "Resolution and Presentation":
    * Find "WebGL Template".
    * Select "KaiaTemplate".

![](/img/minidapps/unity-minidapp/ui-select-webgl-temp.png)

### Step 6: Building Your dApp 

Now Let's bring it all together:

1. Open Build Settings (File → Build Settings).
2. Click "Build And Run".
3. Create a new folder named "minidapp".
4. Important Build Files:

```bash
minidapp/
├── minidapp.loader.js
├── minidapp.data
├── minidapp.framework.js
└── minidapp.wasm
```

### Step 7: Post-Build Configuration 

After building your project,

1. Open your build folder.
2. Note all generated file names.
3. Update your index.html to match these names.
4. Save changes and rebuild.
5. You should now see a tab opened in your browser. 

![](/img/minidapps/unity-minidapp/ui-build-app.png)

## Testing and running application
Now that we have our project running, let’s test and interact with it. 
* Click on the Connect Wallet button to connect to Kaia Wallet. 
* Once connected, fill in details (address and amount) to mint tokens to the connected address or any stipulated address.

![](/img/minidapps/unity-minidapp/minidapp.gif)





