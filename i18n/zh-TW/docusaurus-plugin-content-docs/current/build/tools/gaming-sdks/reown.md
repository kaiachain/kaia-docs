# Reown

## 介紹

[Reown](https://docs.reown.com/overview)讓建置者能夠建立安全、人性化且具備豐富洞察力的錢包與應用程式 UX。 提供所有工具，讓您以更快的速度推出產品，並更聰明地擴充規模。 有了 Unity 上的 **Reown AppKit**，您可以輕鬆地將 onchain 生態系統連接到您的遊戲，實現流暢的錢包互動，讓玩家感覺自然。

在本教程中，您將學習如何逐步將 Reown AppKit 整合到以 Kaia 為基礎的 Unity 遊戲中，讓您的玩家可以直接在遊戲中與 Web3 互動。

## 先決條件。

- 最新版本的 [Unity](https://unity.com/download?ref=blog.chainsafe.io) (Unity 2022.3 或以上)
- A [Metamask](https://metamask.io/download/?ref=blog.chainsafe.io) 錢包
- Testnet KAIA 來自 [Kaia Faucet](https://faucet.kaia.io/) (如果使用 Kairos)
- [設定專案 ID](https://docs.reown.com/appkit/unity/core/installation#configure)

![](/img/build/tools/gaming-sdks/rg-configure-project-id.png)

![](/img/build/tools/gaming-sdks/rg-configure-project-id-ii.png)

## 開始

在本指南中，您將學習如何使用 Kaia 上的 Reown AppKit 將錢包功能整合到您的 Unity 遊戲中。 到最後，您將擁有一個可讓玩家進行以下工作的設定：

- 連接和斷開他們的錢包
- 檢視他們的本幣餘額和代幣餘額
- 直接在遊戲中領取 Soulbound 代幣 (SBT)

我們將在 Kaia Mainnet 上建立此系統 (用於教育目的)，但相同的程式碼可在 Kairos Testnet 上無縫執行，以進行開發與測試。

### 建立新的 Unity3D 專案

若要建立新專案，請執行下列步驟：

- 導覽到 \*\* 專案\*\* 索引標籤、
- 按一下 \*\* 新專案\*\* 按鈕。
- 選擇所有範本。 我們將採用**3D 模版**、
- 按一下 \*\* 建立\*\*專案。

![](/img/build/tools/gaming-sdks/rg-unity-create-project.png)

### 在 Unity 上安裝 Reown AppKit

使用 Open UPM 的套件管理員

1. 從位於 Unity 功能表列頂端的服務功能表開啟「一般設定」。
2. 新增具有下列詳細資訊的新作用範圍註冊表：
   - 名稱：OpenUPM
   - URL: https://package.openupm.com
   - 範圍：com.reown 和 com.nethereum

![](/img/build/tools/gaming-sdks/rg-package-manager.png)

3. 按加➕，然後按儲存按鈕
4. 從位於 Unity 頂端的 Windows 功能表開啟套件管理員。

![](/img/build/tools/gaming-sdks/rg-package-manager-ii.png)

5. 從工具列開啟新增 ➕ 功能表，選擇依名稱新增套件…

![](/img/build/tools/gaming-sdks/rg-package-manager-iii.png)

6. 逐一輸入下列套件的名稱：
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
7. 按下 \*\* 新增\*\* 按鈕

![](/img/build/tools/gaming-sdks/rg-package-manager-iv.png)

## 設定應用程式場景

我們需要為 Web3 功能準備場景：

### 載入場景

- 在 Assets > Scenes 下，按兩下 SampleScene。 這將是我們所有 Claim SBT 功能所在的地方。

### 新增 Reown AppKit Prefab

- 導覽至專案 > 套件 > Reown.AppKit.Unity > Prefabs

![](/img/build/tools/gaming-sdks/rg-adding-prefab.png)

- 將 Reown AppKit Prefab 拖曳到您的場景層級結構中

![](/img/build/tools/gaming-sdks/rg-adding-prefab-ii.png)

### 建立使用者介面畫布

- 在場景階層中按一下滑鼠右鍵
- 導覽至 GameObject > UI > Canvas
- 將它重新命名為 Canvas

### 建立我們的應用程式介面

在本節中，我們將建立 Soul Bound Token 領取功能的使用者介面元件。 為此，我們將建立一個主面板和 3 個子面板及其對應的子元件。

**主面板**\*

- **StatusPanel**：顯示錢包連線資訊和代幣餘額。
- **ButtonPanel**：連接和斷開錢包按鈕。
- \*\* 領取面板\*\*：領取 SBT 代幣並檢視 SBT 結餘

建立**MainPanel**、

- 在 Canvas 上按一下滑鼠右鍵，按一下 UI → Panel 並將其重新命名為 MainPanel

建立子面板、

- 在 MainPanel 上按一下滑鼠右鍵，按一下 UI → Panel 並將其重新命名為 StatusPanel
- 重複上述步驟，分別在 MainPanel 中建立 ButtonPanel 和 ClaimPanel。

現在讓我們在每個子面板中建立元件。

建立 **StatusPanel** 元件、

- 在 StatusPanel 上按一下滑鼠右鍵，按一下 UI → 文字 - TestMeshPro，然後將文字物件重新命名為 WalletStatusText。
  - 確保填滿文字物件。 例如「狀態：未連線"
- 在 StatusPanel 上按一下滑鼠右鍵，按一下 UI → 文字 - TestMeshPro 並將文字物件重新命名為 AccountText
  - 確保填滿文字物件。 例如 「連線位址：」
- 在 StatusPanel 上按一下滑鼠右鍵，按一下 UI → 文字 - TextMeshPro，然後將文字物件重新命名為 KaiaBalanceText。
  - 確保填滿文字物件。 例如 「KAIA 結餘 :-」
- 在 StatusPanel 上按一下滑鼠右鍵，按一下 UI → 文字 - TextMeshPro，然後將文字物件重新命名為 UsdtBalanceText。
  - 確保填滿文字物件。 例如 「USDT 結餘 :-」

建立 **ButtonPanel** 元件、

- 在 ButtonPanel 上按一下滑鼠右鍵，按一下 UI → Button - TextMeshPro，然後將文字物件重新命名為 ConnectWallet。
  - 確保填滿文字物件。 例如 「連接錢包」
- 在 ButtonPanel 上按一下滑鼠右鍵，按一下 UI → Button - TextMeshPro，然後將文字物件重新命名為 DisconnectWallet。
  - 確保填滿文字物件。 例如 「中斷 Wallet」。

建立 **ClaimPanel** 元件、

- 在 ClaimPanel 上按一下滑鼠右鍵，按一下 UI → 文字 - TextMeshPro，然後將文字物件重新命名為 ClaimLabel。
  - 確保填滿文字物件。 例如 "Claim Soul Bound NFT:"。
- 在 ClaimPanel 上按一下滑鼠右鍵，按一下 UI → 按鈕 - TextMeshPro，然後將文字物件重新命名為 ClaimButton。
  - 確保填滿文字物件。 例如 「索賠」
- 在 ClaimPanel 上按一下滑鼠右鍵，按一下 UI → 文字 - TextMeshPro，然後將文字物件重新命名為 ClaimBalanceText。
  - 確保填滿文字物件。 例如 「餘額：」

:::note
建立所有元件後，使用「移動工具」將它們整齊地排列在場景中。
:::

![](/img/build/tools/gaming-sdks/rg-full-ui.png)

## 建立與部署 Soul Bound Token 智慧契約

在本節中，我們將使用下面的範例程式碼作為指引：

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

### 透過 Remix IDE 部署

- 複製並貼上上述程式碼到 Remix IDE 新建立的檔案 `SBT.sol`。
- 在 Remix IDE 中：
  - 按一下「編譯契約」按鈕。
  - 導覽至「部署與執行交易」索引標籤。
  - 在 Environment（環境）下，選擇 Injected Provider - MetaMask。
  - 在合約下拉式選單中找到您的合約 (SoulBoundToken)。
  - 按一下部署以啟動您的令牌！
  - 當您的 MetaMask 彈出時：
    - 檢視部署詳細資訊。
    - 按一下「確認」以部署到 Kaia Mainnet。

:::note
複製並儲存已部署的合約位址。 您在稍後的教學中會用到它。
:::

## 執行 SBTManager Script

在這一步中，我們將建立一個腳本來管理核心的錢包互動：連接和斷開錢包、擷取本機貨幣 (KAIA) 和代幣餘額 (USDT) 以及啟用 SBT 索賠功能。

要做到這一點、

- 在 Assets 資料夾中建立 **Scripts** 資料夾
- 在新建立的 Scripts 資料夾中建立 **SBTManager** 指令碼。
- 複製並貼上以下程式碼到您新建立的 scripts 檔案：

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

## 設定 SBTManager 遊戲物件

- 在場景中建立管理員物件
  - 在 Hierarchy 視窗（根層級）上按一下滑鼠右鍵。
  - 選擇「建立空物件」。
  - 將其命名為「SBTManager」。
- 附上您的劇本
  - 選取 SBTManager GameObject。
  - 在 Inspector 中，按一下 Add Component。
  - 搜尋並選擇「SBTManager」。
- 連接 UI 元件：
  - 選取 SBTManager 後，查看 Inspector。
  - 將您的 UI 元件從 Hierarchy 拖放到對應的欄位：
    - 狀態文字
    - 帳戶文字
    - 等 …...
  - 分別設定您的 USDT 和 SBT 合約地址

![](/img/build/tools/gaming-sdks/rg-connect-ui-to-script.png)

## 連接按鈕與腳本

在本節中，我們將從 SBTManager 指令碼中連接下列按鈕與其各自的功能：

- 選擇按鈕 (如 ConnectWallet)
  - 在 Inspector 中，找到 OnClick() 部分並按一下 ➕ 按鈕
  - 從階層視窗拖曳 SBTManager 物件到 None (物件) 欄位
  - 按一下無功能 → SBTManager → ConnectWallet()

![](/img/build/tools/gaming-sdks/rg-unity-connect-functions.png)

- 對下面的按鈕重覆步驟 1-3，並將其功能變更為：
  - DisconnectWallet -> DisconnectWallet()
  - ClaimButton -> ClaimSBT()

## WebGL 建立設定

在本節中，我們將為網頁部署設定 dApp：

- 移至檔案 → 建立設定 → WebGL → 切換平台

![](/img/build/tools/gaming-sdks/rg-switch-platform.png)

- 在同一個視窗中，按一下新增開放場景（右上方），將 SampleScene 新增為執行遊戲時出現的第一個場景。

![](/img/build/tools/gaming-sdks/rg-add-samplescene.png)

- 在同一視窗中，按一下播放器設定 → 播放器 → 解析度和呈現，在 WebGL 模版下，選擇標題為 Default 的那個。

![](/img/build/tools/gaming-sdks/rg-select-webgl-temp.png)

## 測試和執行 Unity 應用程式

在本節中，我們將測試 unity 應用程式中的各種功能。 若要瞭解實際操作，請遵循以下步驟：

- 建立並執行專案：導覽至檔案 → 建立並執行

![](/img/build/tools/gaming-sdks/rg-build-and-run.png)

- 出現提示時儲存您的 WebGL 建立
- 當專案建立並執行時，會在瀏覽器中開啟一個索引標籤 - SampleScene
- 按一下連線錢包以連線至 Metamask。

![](/img/build/tools/gaming-sdks/rg-connect-to-mm.png)

- 連線後，測試應用程式的所有功能：
  - 索賠 SBT
  - 檢查結餘

![](/img/build/tools/gaming-sdks/kaia-reown-demo.gif)

## 總結

在本教程中，您將學習如何在 Kaia 上將 Reown AppKit 套件整合到您的 Unity 遊戲中。 如需更深入的 Reown Unity 遊戲 SDK 使用指南，請參考 [Reown AppKit on Unity Guide](https://docs.reown.com/appkit/unity/core/installation)。
