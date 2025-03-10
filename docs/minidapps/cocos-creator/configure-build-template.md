# Mini Dapp SDK Integration

In this section, we will ensure the Mini Dapp SDK is loaded in our game. To do that, Cocos Creator’s build-templates directory allows customization of how the game is built for the web platform, making it essential for preloading the SDK before the game starts.

By creating a custom template in **build-templates/web-desktop**, we can automatically include the SDK in every build, streamlining development and deployment.

## Step 1: Create the build-templates Directory <a id="create-build-template-directory"></a>

Open your project in VS Code and run the following command in the terminal:

```bash
mkdir -p build-templates/web-desktop
```

## Step 2: Perform an Initial Build in Cocos Creator <a id="perform-initial-build"></a>

1. Go to **Menu → Project → Build**.

![](/img/minidapps/cocos-creator/cp-build-r.png)

2. Set **Platform** to **Web Desktop**.

3. Click **Build**.

![](/img/minidapps/cocos-creator/cp-build-details-r.png)

## Step 3: Copy the index.html file from the Build Directory <a id="copy-index-html-from-build-dir"></a>

Once the build is complete, copy the index.html file into the build-templates directory:

```bash
cp build/web-desktop/index.html build-templates/web-desktop/
```

## Step 4: Modify index.html to Include the Mini Dapp SDK <a id="modify-index-html-to-include-dapp-portal-sdk"></a>

Edit `build-templates/web-desktop/index.html` and add the following Mini Dapp SDK script tag inside the `<head> </head>` section:

```bash
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

## Step 5: Verify the Build Setup <a id="verify-build-setup"></a>

- Rebuild your project in Cocos Creator.
- Check the generated `build/web-desktop/index.html`.
- Confirm that the **Mini Dapp SDK script** is correctly included.

## Step 6: Build & Preview the Project <a id="build-preview-project"></a>

After completing the setup, click _Play on Device_ at the top of the Cocos Creator Editor. Your game should open in a new browser tab.

![](/img/minidapps/cocos-creator/cp-play-game-r.png)

![](/img/minidapps/cocos-creator/cp-localhost-build-r.png)

# Route Web build to Localhost:3000 <a id="route-web-build"></a>

For security and development purposes, the Mini Dapp SDK currently works on localhost:3000. At the moment, the default Unity WebGL builds use random ports (like 7457) and for our app to work efficiently we need to configure our Unity WebGL build to open on localhost:3000.

To do so, follow the steps below:

1. Copy and paste the code below in your project terminal

```bash
# Install http-server globally
npm install -g http-server
```

2. Navigate to build folder

```bash
cd build/web-desktop
```

3. Start server on port 3000

```bash
http-server -p 3000
```

# Testing and running application <a id="route-web-build"></a>

Now that we have our project running, let’s test and interact with it.

- Click on the Connect Wallet button to connect to Dapp Portal Wallet.
- Once connected, mint a fixed amount to the connected address.

![](/img/minidapps/cocos-creator/cocos-demo.gif)
