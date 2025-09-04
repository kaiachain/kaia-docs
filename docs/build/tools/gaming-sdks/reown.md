# Reown

## Introduction

[Reown](https://docs.reown.com/overview) empowers builders to create secure, user-friendly and insight-rich wallet and app UX. Providing all the tools to launch faster and scale smarter. With **Reown AppKit on Unity**, you can easily connect the onchain ecosystem to your game, enabling smooth wallet interactions that feel natural to players.

In this tutorial, you’ll learn how to integrate the Reown AppKit into a Kaia-based Unity game, step by step, so your players can interact with Web3 directly inside your gameplay.

## Prerequisite. 
- The newest version of [Unity](https://unity.com/download?ref=blog.chainsafe.io) (Unity 2022.3 or above)
- A [Metamask](https://metamask.io/download/?ref=blog.chainsafe.io) wallet
- Testnet KAIA from [Kaia Faucet](https://faucet.kaia.io/) (if using Kairos)
- [Configure a Project ID](https://docs.reown.com/appkit/unity/core/installation#configure)

![](/img/build/tools/gaming-sdks/rg-configure-project-id.png)

![](/img/build/tools/gaming-sdks/rg-configure-project-id-ii.png)

## Geting Started

In this guide, you’ll learn how to integrate wallet functionality into your Unity game using the Reown AppKit on Kaia. By the end, you’ll have a working setup that allows players to:

- Connect and disconnect their wallets
- View both their native currency balance and token balances
- Claim Soulbound Tokens (SBTs) directly within the game

We’ll build this on Kaia Mainnet (for educational purposes), but the same code runs seamlessly on the Kairos Testnet for development and testing.

### Create a new Unity3D project
To create a new project, do these:

- Navigate to the **Projects** tab,
- Click on the **New project** button.
- Select All templates. We will use a **3D template**,
- Click on **Create** project.

![](/img/build/tools/gaming-sdks/rg-unity-create-project.png)

### Install Reown AppKit on Unity 

Package Manager with Open UPM

1. Open General Settings from the service menu located at the top of Unity menu bar. 
2. Add a new scoped registry with the following details:
    - Name: OpenUPM
    - URL: https://package.openupm.com
    - Scope(s): com.reown and com.nethereum

![](/img/build/tools/gaming-sdks/rg-package-manager.png)

3. Press plus ➕ and then Save buttons
4. Open Package Manager from the Windows menu located at the top of Unity.

![](/img/build/tools/gaming-sdks/rg-package-manager-ii.png)

5. Open the add ➕ menu from the toolbar and select Add package by name…

![](/img/build/tools/gaming-sdks/rg-package-manager-iii.png)

6. Enter the names of the following packages one by one:
    - com.nethereum.unity
    - com.reown.core
    - com.reown.core.crypto
    - com.reown.core.common
    - com.reown.core.network
    - com.reown.core.storage
    - com.reown.sign
    - com.reown.sign.unity
    - com.reown.sign.nethereum
    - com.reown.sign.nethereum.unity
    - com.reown.appkit.unity
    - com.reown.unity.dependencies
7. Press **Add** button

![](/img/build/tools/gaming-sdks/rg-package-manager-iv.png)

## Setting up the App Scene

We need to prepare our scene for Web3 functionality:

### Loading the Scene
- Under Assets > Scenes, double click on SampleScene. This will be where all our Claim SBT functionalities lives. 

### Adding Reown AppKit Prefab

- Navigate to Projects > Packages > Reown.AppKit.Unity  > Prefabs

![](/img/build/tools/gaming-sdks/rg-adding-prefab.png)

- Drag the Reown AppKit Prefab into your scene hierarchy

![](/img/build/tools/gaming-sdks/rg-adding-prefab-ii.png)

### Creating the UI Canvas

- Right click in the scene hierarchy
- Navigate to GameObject > UI > Canvas
- Rename it to Canvas

### Building our App Interface 

In this section, we will create the user interface components for our Soul Bound Token claiming functionality. To do so, we will create a main Panel and 3 sub panels with their corresponding sub-components.
 
**Main Panel**

- **StatusPanel**: Shows wallet connection info and token balances.
- **ButtonPanel**: Connect and disconnect wallet buttons.
- **ClaimPanel**: Claim SBT tokens and view SBT balance

To create the **MainPanel**,
- Right-click on the Canvas, click on UI → Panel and rename it to MainPanel

To create the sub-panels,
- Right-click on the MainPanel , click on UI → Panel and rename it to StatusPanel
- Repeat the step above to create ButtonPanel and ClaimPanel in your MainPanel respectively.

Now let’s create the components in each sub panel. 

To create the **StatusPanel** component, 

- Right-click on the StatusPanel , click on UI → Text - TestMeshPro and rename the text object to WalletStatusText
    - Make sure to fill the text object. For example "Status: Not Connected"
- Right-click on the StatusPanel , click on UI → Text - TestMeshPro and rename the text object to AccountText
    - Make sure to fill the text object. For example "Connected Address:"
- Right-click on the StatusPanel , click on UI → Text - TextMeshPro and rename the text object to KaiaBalanceText
    - Make sure to fill the text object. For example "KAIA Balance :-"
- Right-click on the StatusPanel , click on UI → Text - TextMeshPro and rename the text object to UsdtBalanceText
    - Make sure to fill the text object. For example "USDT Balance :-"

To create the **ButtonPanel** component, 

- Right-click on the ButtonPanel , click on UI → Button - TextMeshPro and rename the text object to ConnectWallet
    - Make sure to fill the text object. For example "Connect Wallet"
- Right-click on the ButtonPanel , click on UI → Button - TextMeshPro and rename the text object to DisconnectWallet
    - Make sure to fill the text object. For example “Disconnect Wallet"

To create the **ClaimPanel** component, 

- Right-click on the ClaimPanel , click on UI → Text - TextMeshPro and rename the text object to ClaimLabel
    - Make sure to fill the text object. For example "Claim Soul Bound NFT:"
- Right-click on the ClaimPanel , click on UI → Button - TextMeshPro and rename the text object to ClaimButton
    - Make sure to fill the text object. For example "Claim"
- Right-click on the ClaimPanel , click on UI → Text - TextMeshPro and rename the text object to ClaimBalanceText
    - Make sure to fill the text object. For example "Balance:"

:::note
After creating all components, arrange them neatly in your scene using the Move Tool.
:::

![](/img/build/tools/gaming-sdks/rg-full-ui.png)

## Creating and deploying Soul Bound Token Smart Contract

In this section, we will use the sample code below for our guide:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/utils/Counters.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract SoulBoundToken is KIP17, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() KIP17("SoulBoundToken", "SBT") {}
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    function _beforeTokenTransfer(address from, address to, uint256) pure override internal {
        require(from == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred.");
    }
    function _burn(uint256 tokenId) internal override(KIP17) {
        super._burn(tokenId);
    }
}
```

### Deploying via Remix IDE

- Copy and Paste the code above in a newly created file `SBT.sol` on Remix IDE.
- In Remix IDE:
    - Click the Compile contract button.
    - Navigate to the Deploy & run transactions tab.
    - Under Environment, choose Injected Provider —  MetaMask.
    - Find your contract (SoulBoundToken) in the Contract dropdown.
    - Click Deploy to launch your token!
    - When your MetaMask  pops up:
        - Review the deployment details.
        - Click Confirm to deploy to Kaia Mainnet.

:::note
Copy and save the deployed contract address. You’ll need it later in the tutorial.
:::

## Implementing SBTManager Script

In this step, we’ll create a script that manages core wallet interactions: connecting and disconnecting wallets, retrieving native currency (KAIA) and token balances (USDT), and enabling SBT claiming functionality.

To do so, 

- Create a **Scripts** folder in your Assets folder
- Create a **SBTManager** script in your newly created Scripts folder.
- Copy and paste the code below into your newly created scripts file:


```C#
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using Reown.AppKit.Unity;
using System.Threading.Tasks;
using System.Numerics;
public class SBTManager : MonoBehaviour
{
    [Header("Contract Configuration")]
    public string tokenContractAddress = "0xd077a400968890eacc75cdc901f0356c943e4fdb";
    public string sbtContractAddress = "0x0bFF901145a0685E6d7661af7122f829459dA9A0";
    [Header("UI References")]
    public TextMeshProUGUI statusText;
    public TextMeshProUGUI accountText;
    public TextMeshProUGUI kaiaBalanceText;
    public TextMeshProUGUI tokenBalanceText;
    public TextMeshProUGUI sbtBalanceText;
    
    [Header("Buttons")]
    public Button connectButton;
    public Button disconnectButton;
    public Button mintSBTButton;
    // Token ABI for balance checking
    private const string TOKEN_ABI = "[{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"name\":\"\",\"type\":\"uint8\"}],\"type\":\"function\"}]";
    // SBT Mint ABI
    private const string MINT_ABI = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"safeMint\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]";
    // NFT Balance ABI
    private const string NFT_BALANCE_ABI = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
    private async void Start()
    {
        await InitializeWallet();
        SetupUI();
        InitializeDisconnectedState();
    }
    private async Task InitializeWallet()
    {
        var config = new AppKitConfig
        {
            // Replace with your actual Reown project ID.
            projectId = "PASTE PROJECT ID", 
            metadata = new Metadata(
                "Kaia SBT Demo",
                "Demo app for Kaia blockchain SBT minting",
                "https://your-domain.com",
                "https://your-domain.com/icon.png"
            ),
            supportedChains = new[]
            {
                // Kaia Mainnet
                new Chain(ChainConstants.Namespaces.Evm,
                    chainReference: "8217",
                    name: "Kaia Mainnet",
                    nativeCurrency: new Currency("KAIA", "KAIA", 18),
                    blockExplorer: new BlockExplorer("Kaiascan", "https://kaiascan.io/"),
                    rpcUrl: "https://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/",
                    isTestnet: false,
                    imageUrl: "https://prnt.sc/P5TR6Zpr0Y1S"
                ),
                
                // Kaia Kairos testnet
                new Chain(ChainConstants.Namespaces.Evm,
                    chainReference: "1001",
                    name: "Kaia Kairos",
                    nativeCurrency: new Currency("KAIA", "KAIA", 18),
                    blockExplorer: new BlockExplorer("Kaiascan", "https://kairos.kaiascan.io/"),
                    rpcUrl: "https://responsive-green-emerald.kaia-kairos.quiknode.pro/",
                    isTestnet: true,
                    imageUrl: "https://prnt.sc/P5TR6Zpr0Y1S"
                )
            }
        };
        await AppKit.InitializeAsync(config);
        
        AppKit.AccountConnected += OnAccountConnected;
        AppKit.AccountDisconnected += OnAccountDisconnected;
        
        Debug.Log("Kaia SBT Wallet initialized successfully!");
    }
    /*
    SetupUI attaches button click events to their corresponding wallet actions:
          - Connect button → ConnectWallet()
          - Disconnect button → DisconnectWallet()
          - Mint SBT button → ClaimSBT()
    */
    private void SetupUI()
    {
        if (connectButton != null)
            connectButton.onClick.AddListener(ConnectWallet);
            
        if (disconnectButton != null)
            disconnectButton.onClick.AddListener(DisconnectWallet);
            
        if (mintSBTButton != null)
            mintSBTButton.onClick.AddListener(ClaimSBT);
    }
    private void InitializeDisconnectedState()
    {
        UpdateStatus("Ready - Click Connect to link wallet");
        UpdateAccount("No wallet connected");
        UpdateKaiaBalance("0 KAIA");
        UpdateTokenBalance("0 Tokens");
        UpdateSBTBalance("0 SBTs");
        
        SetButtonStates(connectEnabled: true, disconnectEnabled: false, mintEnabled: false);
    }
    #region Wallet Connection
    public void ConnectWallet()
    {
        Debug.Log("Opening wallet connection...");
        UpdateStatus("Opening wallet selection...");
        AppKit.OpenModal();
    }
    public async void DisconnectWallet()
    {
        Debug.Log("Disconnecting wallet...");
        UpdateStatus("Disconnected...");
        
        try
        {
            await AppKit.DisconnectAsync();
            
            // The OnAccountDisconnected event should handle UI updates,
            // but we can force it here as a fallback
            InitializeDisconnectedState();
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Disconnect error: {e.Message}");
            UpdateStatus($"Disconnect failed: {e.Message}");
        }
    }
    public void ClaimSBT()
    {
    _ = MintSBT();
    }
    #endregion
    #region Balance Checking
    public async Task CheckKaiaBalance()
    {
        try
        {
            var account = await AppKit.GetAccountAsync();
            if (account == null) return;
            BigInteger balance = await AppKit.Evm.GetBalanceAsync(account.Address);
            decimal kaia = (decimal)balance / (decimal)BigInteger.Pow(10, 18);
            
            UpdateKaiaBalance($"{kaia:F4} KAIA");
            Debug.Log($"KAIA balance: {kaia:F4}");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Error getting KAIA balance: {e.Message}");
            UpdateKaiaBalance("Error");
        }
    }
    public async Task CheckTokenBalance()
    {
        try
        {
            var account = await AppKit.GetAccountAsync();
            if (account == null) return;
            var balance = await AppKit.Evm.ReadContractAsync<BigInteger>(
                tokenContractAddress,
                TOKEN_ABI,
                "balanceOf",
                new object[] { account.Address }
            );
            var decimals = await AppKit.Evm.ReadContractAsync<BigInteger>(
                tokenContractAddress,
                TOKEN_ABI,
                "decimals"
            );
            decimal tokens = (decimal)balance / (decimal)BigInteger.Pow(10, (int)decimals);
            
            UpdateTokenBalance($"{tokens:F4} USDT");
            Debug.Log($"Token balance: {tokens:F4}");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Error getting token balance: {e.Message}");
            UpdateTokenBalance("Error");
        }
    }
    public async Task CheckSBTBalance()
    {
        try
        {
            var account = await AppKit.GetAccountAsync();
            if (account == null) return;
            var balance = await AppKit.Evm.ReadContractAsync<BigInteger>(
                sbtContractAddress,
                NFT_BALANCE_ABI,
                "balanceOf",
                new object[] { account.Address }
            );
            UpdateSBTBalance($"{balance} SBTs");
            Debug.Log($"SBT balance: {balance}");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Error getting SBT balance: {e.Message}");
            UpdateSBTBalance("Error");
        }
    }
    #endregion
    #region SBT Minting
    public async Task MintSBT()
    {
        try
        {
            var account = await AppKit.GetAccountAsync();
            if (account == null)
            {
                UpdateStatus("No wallet connected!");
                return;
            }
            UpdateStatus("Minting SBT...");
            string txHash = await AppKit.Evm.WriteContractAsync(
                sbtContractAddress,
                MINT_ABI,
                "safeMint",
                account.Address
            );
            UpdateStatus($"SBT minted! TX: {txHash.Substring(0, 10)}... Waiting for confirmation...");
            Debug.Log($"SBT mint transaction: {txHash}");
            
            // Check updated SBT balance
            await CheckSBTBalance();
            
            UpdateStatus($"SBT successfully minted! TX: {txHash.Substring(0, 10)}...");
        }
        catch (System.Exception e)
        {
            UpdateStatus($"Mint failed: {e.Message}");
            Debug.LogError($"SBT mint error: {e}");
        }
    }
    #endregion
    #region Event Handlers
    private async void OnAccountConnected(object sender, System.EventArgs e)
    {
        var account = await AppKit.GetAccountAsync();
        if (account != null)
        {
            Debug.Log($"Wallet connected: {account.Address}");
            
            UpdateStatus("Wallet connected");
            UpdateAccount(account.Address);
            
            // Check all balances
            await CheckKaiaBalance();
            await CheckTokenBalance();
            await CheckSBTBalance();
            
            SetButtonStates(connectEnabled: false, disconnectEnabled: true, mintEnabled: true);
        }
    }
    private void OnAccountDisconnected(object sender, System.EventArgs e)
    {
        Debug.Log("Wallet disconnected");
        InitializeDisconnectedState();
    }
    #endregion
    #region UI Updates
    private void UpdateStatus(string message)
    {
        if (statusText != null)
            statusText.text = message;
        Debug.Log($"Status: {message}");
    }
    private void UpdateAccount(string address)
    {
        if (accountText != null)
        {
            if (address.Length > 10)
                accountText.text = $"{address.Substring(0, 6)}...{address.Substring(address.Length - 4)}";
            else
                accountText.text = address;
        }
    }
    private void UpdateKaiaBalance(string balance)
    {
        if (kaiaBalanceText != null)
            kaiaBalanceText.text = balance;
    }
    private void UpdateTokenBalance(string balance)
    {
        if (tokenBalanceText != null)
            tokenBalanceText.text = balance;
    }
    private void UpdateSBTBalance(string balance)
    {
        if (sbtBalanceText != null)
            sbtBalanceText.text = balance;
    }
    private void SetButtonStates(bool connectEnabled, bool disconnectEnabled, bool mintEnabled)
    {
        if (connectButton != null)
            connectButton.interactable = connectEnabled;
        if (disconnectButton != null)
            disconnectButton.interactable = disconnectEnabled;
        if (mintSBTButton != null)
            mintSBTButton.interactable = mintEnabled;
    }
    #endregion
    #region Public Methods for Manual Updates
    public async void RefreshAllBalances()
    {
        UpdateStatus("Refreshing balances...");
        await CheckKaiaBalance();
        await CheckTokenBalance();
        await CheckSBTBalance();
        UpdateStatus("Balances updated!");
    }
    #endregion
    private void OnDestroy()
    {
        AppKit.AccountConnected -= OnAccountConnected;
        AppKit.AccountDisconnected -= OnAccountDisconnected;
    }
}
```

## Setting up the SBTManager GameObject

- Create the Manager Object in your Scene
    - Right-click on the Hierarchy window (root level).
    - Select "Create Empty Object".
    - Name it "SBTManager".
- Attach Your Script
    - Select the SBTManager GameObject.
    - In Inspector, click Add Component.
    - Search for and select "SBTManager".
- Connect UI Elements:
    - With SBTManager selected, look in the Inspector.
    - Drag and drop your UI elements from the Hierarchy to the corresponding fields:
        - StatusText
        - AccountText
        - Etc …..
    - Set your USDT and SBT contract address respectively

![](/img/build/tools/gaming-sdks/rg-connect-ui-to-script.png)

## Connecting Buttons to Script

In this section, we will connect the following buttons with their respective functions from the SBTManager script:
- Select a button (like ConnectWallet)
    - In the Inspector, find the OnClick() section and click the ➕ button
    - Drag the SBTManager Object from Hierarchy window into the None (object) field
    - Click on No Function → SBTManager  → ConnectWallet()

![](/img/build/tools/gaming-sdks/rg-unity-connect-functions.png)

- Repeat step 1–3 for the buttons below and change their function to:
    - DisconnectWallet -> DisconnectWallet()
    - ClaimButton -> ClaimSBT()

## WebGL Build Settings

In this section, we will configure our dApp for the web deployment:

- Go to File → Build Settings → WebGL → Switch Platform

![](/img/build/tools/gaming-sdks/rg-switch-platform.png)

- From the same window, click on Add Open Scenes (top right) to add the SampleScene as the first scene to appear when we run the game.

![](/img/build/tools/gaming-sdks/rg-add-samplescene.png)

- From the same window, click on Player Settings → Player → Resolution and Presentation, under WebGL Template, select the one titled Default.

![](/img/build/tools/gaming-sdks/rg-select-webgl-temp.png)

## Testing and running Unity application

In this section, we will test the various functionalities in our unity application. To see this in action, follow the steps below:

- Build and run the project: Navigate to File → Build and Run

![](/img/build/tools/gaming-sdks/rg-build-and-run.png)

- Save your WebGL build when prompted
- When the project builds and run, it opens a tab in your browser — SampleScene
- Click on Connect Wallet to connect to Metamask.

![](/img/build/tools/gaming-sdks/rg-connect-to-mm.png)

- Once connected, test all the app’s functionalities:
    - Claim SBT 
    - Check balances

![](/img/build/tools/gaming-sdks/kaia-reown-demo.gif)

## Conclusion

In this tutorial, you learnt how to integrate Reown AppKit package into your Unity game on Kaia. For more in-depth guides on Reown Unity gaming SDK  and how it works, please refer to the [Reown AppKit on Unity Guide](https://docs.reown.com/appkit/unity/core/installation)
