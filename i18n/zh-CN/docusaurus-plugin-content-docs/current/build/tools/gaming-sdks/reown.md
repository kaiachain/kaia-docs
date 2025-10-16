# 雷恩

## 介绍

[Reown](https://docs.reown.com/overview) 使构建者能够创建安全、用户友好和富有洞察力的钱包和应用程序用户体验。 提供所有工具，以更快地启动和更智能地扩展。 利用 Unity 上的**Reown AppKit**，您可以轻松地将链上生态系统与您的游戏连接起来，实现流畅的钱包互动，让玩家感觉自然。

在本教程中，您将逐步了解如何将 Reown AppKit 集成到基于 Kaia 的 Unity 游戏中，以便玩家可以直接在游戏中与 Web3 互动。

## 前提条件

- 最新版本的 [Unity](https://unity.com/download?ref=blog.chainsafe.io) （Unity 2022.3 或更高版本）
- A [Metamask](https://metamask.io/download/?ref=blog.chainsafe.io) 钱包
- 来自 [Kaia 水龙头](https://faucet.kaia.io/) 的 Testnet KAIA（如果使用 Kairos）。
- [配置项目 ID]（https://docs.reown.com/appkit/unity/core/installation#configure)

![](/img/build/tools/gaming-sdks/rg-configure-project-id.png)

![](/img/build/tools/gaming-sdks/rg-configure-project-id-ii.png)

## 开始

在本指南中，您将学习如何使用 Kaia 上的 Reown AppKit 将钱包功能集成到 Unity 游戏中。 最后，您将拥有一个工作设置，让玩家可以

- 连接和断开他们的钱包
- 查看本币余额和代币余额
- 在游戏中直接领取灵魂代币（SBT

我们将在 Kaia 主网（用于教育目的）上构建该系统，但相同的代码可在 Kairos 测试网上无缝运行，用于开发和测试。

### 创建新的 Unity3D 项目

要创建新项目，请执行以下操作：

- 导航至**项目**选项卡、
- 点击**新建项目**按钮。
- 选择所有模板。 我们将使用**3D 模板**、
- 点击**创建**项目。

![](/img/build/tools/gaming-sdks/rg-unity-create-project.png)

### 在 Unity 上安装 Reown AppKit

使用开放式 UPM 的软件包管理器

1. 从 Unity 菜单栏顶部的服务菜单打开常规设置。
2. 添加一个新的范围注册表，并提供以下详细信息：
   - 名称： OpenUPM名称： OpenUPM
   - URL: https://package.openupm.com
   - 范围：com.reown 和 com.nethereum

![](/img/build/tools/gaming-sdks/rg-package-manager.png)

3. 按加号➕，然后按保存按钮
4. 从 Unity 顶部的 Windows 菜单打开 "软件包管理器"。

![](/img/build/tools/gaming-sdks/rg-package-manager-ii.png)

5. 打开工具栏上的添加 ➕ 菜单，选择按名称添加软件包…

![](/img/build/tools/gaming-sdks/rg-package-manager-iii.png)

6. 逐个输入以下软件包的名称：
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
7. 按**添加**按钮

![](/img/build/tools/gaming-sdks/rg-package-manager-iv.png)

## 设置应用程序场景

我们需要为 Web3 功能准备场景：

### 加载场景

- 在 "资产">"场景 "下，双击 "样本场景"。 我们所有的 SBT Claim 功能都在这里。

### 添加 Reown AppKit 预制件

- 导航至项目 > 软件包 > Reown.AppKit.Unity > 预制件

![](/img/build/tools/gaming-sdks/rg-adding-prefab.png)

- 将 Reown AppKit 预制件拖入场景层次结构中

![](/img/build/tools/gaming-sdks/rg-adding-prefab-ii.png)

### 创建用户界面画布

- 在场景层次结构中点击右键
- 导航至游戏对象 > 用户界面 > 画布
- 将其重命名为 "画布

### 构建我们的应用程序界面

在本节中，我们将为灵魂绑定令牌申领功能创建用户界面组件。 为此，我们将创建一个主面板和 3 个子面板及其相应的子组件。

**主面板**

- **状态面板**：显示钱包连接信息和令牌余额。
- **按钮面板**：连接和断开钱包按钮。
- \*\* ClaimPanel\*\*：申领 SBT 代币并查看 SBT 余额

创建**主面板**、

- 右键单击画布，单击用户界面 → 面板并将其重命名为 MainPanel

创建子面板

- 右键单击主面板，单击用户界面 → 面板并将其重命名为状态面板
- 重复上述步骤，在主面板中分别创建 ButtonPanel 和 ClaimPanel。

现在，让我们在每个子面板中创建组件。

创建 **StatusPanel** 组件、

- 右键单击 StatusPanel，单击用户界面 → 文本 - TestMeshPro，然后将文本对象重命名为 WalletStatusText
  - 确保填充文本对象。 例如 "状态：未连接"
- 右键单击 StatusPanel，单击用户界面 → 文本 - TestMeshPro，然后将文本对象重命名为 AccountText
  - 确保填充文本对象。 例如 "连接地址："
- 右键单击 StatusPanel，单击用户界面 → 文本 - TextMeshPro，然后将文本对象重命名为 KaiaBalanceText
  - 确保填满文本对象。 例如 "KAIA 余额：-"。
- 右键单击 StatusPanel，单击用户界面 → 文本 - TextMeshPro，然后将文本对象重命名为 UsdtBalanceText
  - 确保填满文本对象。 例如 "USDT 余额：-"。

创建 **ButtonPanel** 组件、

- 右键单击 ButtonPanel，单击 UI → Button - TextMeshPro 并将文本对象重命名为 ConnectWallet
  - 确保填满文本对象。 例如 "连接钱包
- 右键单击 ButtonPanel，单击 UI → Button - TextMeshPro，然后将文本对象重命名为 DisconnectWallet
  - 确保填满文本对象。 例如 "断开钱包连接"。

创建**ClaimPanel**组件、

- 右键单击 ClaimPanel，单击用户界面 → 文本 - TextMeshPro，然后将文本对象重命名为 ClaimLabel
  - 确保填满文本对象。 例如 "申请灵魂绑定 NFT："
- 右键单击 ClaimPanel，单击 UI → Button - TextMeshPro 并将文本对象重命名为 ClaimButton
  - 确保填满文本对象。 例如 "索赔"
- 右键单击 ClaimPanel，单击用户界面 → 文本 - TextMeshPro，然后将文本对象重命名为 ClaimBalanceText
  - 确保填满文本对象。 例如 "余额："

:::note
创建所有组件后，使用 "移动工具 "将它们整齐地排列在场景中。
:::

![](/img/build/tools/gaming-sdks/rg-full-ui.png)

## 创建和部署灵魂绑定令牌智能合约

在本节中，我们将使用下面的示例代码作为指导：

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

### 通过 Remix IDE 部署

- 将上述代码复制并粘贴到 Remix IDE 上新建的文件 `SBT.sol` 中。
- 在 Remix IDE 中：
  - 单击 "编译合同 "按钮。
  - 导航至 "部署和运行事务 "选项卡。
  - 在环境下，选择注入式提供程序 - 元掩码。
  - 在 "合约 "下拉菜单中找到您的合约（SoulBoundToken）。
  - 单击 "部署 "启动令牌！
  - 当你的 MetaMask 弹出时：
    - 查看部署详情。
    - 单击 "确认 "将其部署到 Kaia Mainnet。

:::note
复制并保存已部署的合同地址。 稍后的教程中会用到它。
:::

## 执行 SBTManager 脚本

在这一步中，我们将创建一个脚本来管理核心钱包交互：连接和断开钱包、检索本机货币（KAIA）和代币余额（USDT）以及启用 SBT 索赔功能。

要做到这一点

- 在 "资产 "文件夹中创建**脚本**文件夹
- 在新创建的脚本文件夹中创建一个 **SBTManager** 脚本。
- 将下面的代码复制并粘贴到新创建的脚本文件中：

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

## 设置 SBTManager 游戏对象

- 在场景中创建管理器对象
  - 右键单击 "层次结构 "窗口（根层）。
  - 选择 "创建空对象"。
  - 将其命名为 "SBTManager"。
- 附上您的剧本
  - 选择 SBTManager 游戏对象。
  - 在 "检查器 "中，单击 "添加组件"。
  - 搜索并选择 "SBTManager"。
- 连接用户界面元素
  - 选择 SBTManager 后，查看检查器。
  - 将用户界面元素从层次结构拖放到相应的字段中：
    - 状态文本
    - 账户文本
    - 等等 …...
  - 分别设置您的 USDT 和 SBT 合约地址

![](/img/build/tools/gaming-sdks/rg-connect-ui-to-script.png)

## 将按钮连接到脚本

在本节中，我们将把以下按钮与 SBTManager 脚本中的相应功能连接起来：

- 选择一个按钮（如 ConnectWallet）
  - 在检查器中找到 OnClick() 部分，点击 ➕ 按钮
  - 将 SBTManager 对象从 "层次结构 "窗口拖到 "无（对象）"字段中
  - 点击无功能 → SBTManager → ConnectWallet()

![](/img/build/tools/gaming-sdks/rg-unity-connect-functions.png)

- 对下面的按钮重复步骤 1-3，并将其功能更改为：
  - DisconnectWallet -> DisconnectWallet()
  - ClaimButton -> ClaimSBT()

## WebGL 构建设置

在本节中，我们将为网络部署配置 dApp：

- 转到文件 → 构建设置 → WebGL → 切换平台

![](/img/build/tools/gaming-sdks/rg-switch-platform.png)

- 在同一窗口中，点击添加开放场景（右上角），将 SampleScene 添加为运行游戏时出现的第一个场景。

![](/img/build/tools/gaming-sdks/rg-add-samplescene.png)

- 在同一窗口中，点击播放器设置 → 播放器 → 分辨率和演示，在 WebGL 模板下选择标题为 "默认 "的模板。

![](/img/build/tools/gaming-sdks/rg-select-webgl-temp.png)

## 测试和运行 Unity 应用程序

在本节中，我们将测试 unity 应用程序中的各种功能。 要了解具体操作，请按照以下步骤进行：

- 构建并运行项目导航至文件 → 生成并运行

![](/img/build/tools/gaming-sdks/rg-build-and-run.png)

- 出现提示时保存 WebGL 创建
- 项目构建和运行时，会在浏览器中打开一个标签页 - SampleScene
- 单击 "连接钱包 "连接 Metamask。

![](/img/build/tools/gaming-sdks/rg-connect-to-mm.png)

- 连接后，测试应用程序的所有功能：
  - 申请 SBT
  - 检查余额

![](/img/build/tools/gaming-sdks/kaia-reown-demo.gif)

## 结论

在本教程中，您将学习如何在 Kaia 上将 Reown AppKit 软件包集成到 Unity 游戏中。 有关 Reown Unity 游戏 SDK 及其工作原理的更多深入指南，请参阅 [Reown AppKit on Unity Guide](https://docs.reown.com/appkit/unity/core/installation)
