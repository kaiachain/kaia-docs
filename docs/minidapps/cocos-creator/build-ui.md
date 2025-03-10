# UI Creation

In this section, we'll build the user interface (UI) for our dApp, including wallet connection, balance updates, and minting functionality.

## Setting Up the Main Scene <a id="setting-up-main-scene"></a>

### Step 1: Create a Scenes Folder <a id="create-scene-folder"></a>

- Navigate to your project's **assets** folder.
- Right-click and select **Create Folder**.
- Name it **scenes**. (Insert Image)
- Inside the scenes folder, right-click and select **Create → Scene**.

![](/img/minidapps/cocos-creator/cp-create-scene-r.png)

- Save the scene file when prompted.
- Double-click the newly created scene to set it as the **default scene**.

### Step 2: Creating the Base Canvas <a id="creating-base-canvas"></a>

- In the Hierarchy window, right-click on **Scene**.
- Navigate to **Create → UI Component → Canvas**.
- Rename it to **Canvas**

![](/img/minidapps/cocos-creator/cp-create-canvas-r.png)

### Step 3: Creating the Web3UI Container <a id="create-web3ui-container"></a>

- Right-click on the newly created **Canvas**.
- Select **Create → Empty Node**.
- Rename it to **Web3UI**.

![](/img/minidapps/cocos-creator/cp-create-web3-ui-r.png)

### Step 4: Setting Up Main UI Objects <a id="setting-up-main-ui-objects"></a>

Inside Web3UI, create the following components:

**1. Connect Wallet Button**

- Right-click **Web3UI → Create → UI Component → Button**.

![](/img/minidapps/cocos-creator/cp-connect-button-r.png)

- Rename it to **ConnectWallet**.
- In the **Inspector Pane**, set the button label text to **Connect Wallet**.

![](/img/minidapps/cocos-creator/cp-connect-label-r.png)

**2. Mint Button**

- Right-click **Web3UI → Create → UI Component → Button**.
- Rename it to **MintButton**.
- Set the button label text to **Mint Button**.

**3. Address Label**

- Right-click **Web3UI → Create → 2D Object → Label**.

![](/img/minidapps/cocos-creator/cp-address-label-r.png)

- Rename it to **AddressLabel**.
- Set the label text to **Connected Address:**.

![](/img/minidapps/cocos-creator/cp-connected-address-r.png)

**4. Balance Label**

- Right-click **Web3UI → Create → 2D Object → Label**.
- Rename it to **BalanceLabel**.
- Set the label text to **0.000ET**.

After adding all components, your Hierarchy should look like this:

```bash
Canvas
└── Web3UI
    ├── ConnectWallet
    ├── MintButton
    ├── AddressLabel
    ├── BalanceLabel
```

![](/img/minidapps/cocos-creator/cp-ui-view-r.png)

:::note
To properly arrange your components, use the alignment tools at top of the Scene. Click on each component and adjust its position as needed
:::
