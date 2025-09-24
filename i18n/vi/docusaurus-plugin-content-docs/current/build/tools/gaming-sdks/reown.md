# Sở hữu lại

## Giới thiệu

[Reown](https://docs.reown.com/overview) giúp các nhà phát triển tạo ra ví và ứng dụng có giao diện người dùng (UX) an toàn, thân thiện với người dùng và giàu thông tin. Cung cấp tất cả các công cụ cần thiết để khởi động nhanh hơn và mở rộng quy mô một cách thông minh. Với **Reown AppKit trên Unity**, bạn có thể dễ dàng kết nối hệ sinh thái on-chain với trò chơi của mình, cho phép các tương tác ví mượt mà và tự nhiên đối với người chơi.

Trong hướng dẫn này, bạn sẽ học cách tích hợp Reown AppKit vào một trò chơi Unity dựa trên Kaia, từng bước một, để người chơi có thể tương tác trực tiếp với Web3 ngay trong trò chơi của bạn.

## Điều kiện tiên quyết.

- Phiên bản mới nhất của [Unity](https://unity.com/download?ref=blog.chainsafe.io) (Unity 2022.3 trở lên)
- Ví [Metamask](https://metamask.io/download/?ref=blog.chainsafe.io)
- Mạng thử nghiệm KAIA từ [Kaia Faucet](https://faucet.kaia.io/) (nếu sử dụng Kairos)
- [Cấu hình ID dự án](https://docs.reown.com/appkit/unity/core/installation#configure)

![](/img/build/tools/gaming-sdks/rg-configure-project-id.png)

![](/img/build/tools/gaming-sdks/rg-configure-project-id-ii.png)

## Bắt đầu

Trong hướng dẫn này, bạn sẽ học cách tích hợp chức năng ví vào trò chơi Unity của mình bằng cách sử dụng Reown AppKit trên Kaia. Cuối cùng, bạn sẽ có một hệ thống hoạt động cho phép người chơi:

- Kết nối và ngắt kết nối ví của họ
- Xem cả số dư tiền tệ bản địa và số dư token của họ.
- Nhận Token Kết Nối Linh Hồn (SBT) trực tiếp trong trò chơi.

Chúng tôi sẽ triển khai dự án này trên mạng chính Kaia (với mục đích giáo dục), nhưng cùng một mã nguồn có thể chạy mượt mà trên mạng thử nghiệm Kairos cho mục đích phát triển và kiểm thử.

### Tạo một dự án Unity3D mới

Để tạo một dự án mới, hãy thực hiện các bước sau:

- Chuyển đến tab **Dự án**,
- Nhấp vào nút **Dự án mới**.
- Chọn tất cả các mẫu. Chúng tôi sẽ sử dụng một **mẫu 3D**,
- Nhấp vào **Tạo** dự án.

![](/img/build/tools/gaming-sdks/rg-unity-create-project.png)

### Cài đặt Reown AppKit trên Unity

Quản lý gói với Open UPM

1. Mở Cài đặt chung từ menu dịch vụ nằm ở đầu thanh menu Unity.
2. Thêm một kho lưu trữ có phạm vi mới với các chi tiết sau:
   - Tên: OpenUPM
   - URL: https://package.openupm.com
   - Phạm vi: com.reown và com.nethereum

![](/img/build/tools/gaming-sdks/rg-package-manager.png)

3. Nhấn nút cộng ➕ và sau đó nhấn nút Lưu.
4. Mở Trình quản lý gói từ menu Windows nằm ở phía trên của Unity.

![](/img/build/tools/gaming-sdks/rg-package-manager-ii.png)

5. Mở menu Thêm ➕ từ thanh công cụ và chọn Thêm gói theo tên…

![](/img/build/tools/gaming-sdks/rg-package-manager-iii.png)

6. Nhập tên của các gói sau đây từng cái một:
   - com.nethereum.unity
   - com.reown.core
   - com.reown.core.crypto
   - com.reown.core.chung
   - com.reown.core.mạng
   - com.reown.core.lưu_trữ
   - com.reown.ký
   - com.reown.ký.đồng thuận
   - com.reown.ký.nethereum
   - com.reown.ký.nethereum.unity
   - com.reown.appkit.unity
   - com.reown.unity.phụ_thuộc
7. Nhấn nút **Thêm**

![](/img/build/tools/gaming-sdks/rg-package-manager-iv.png)

## Cài đặt Cảnh Ứng dụng

Chúng ta cần chuẩn bị giao diện cho chức năng Web3:

### Tải cảnh

- Trong phần Tài sản > Cảnh, nhấp đúp vào SampleScene. Đây sẽ là nơi chứa tất cả các tính năng của Claim SBT.

### Thêm Reown AppKit Prefab

- Đi đến Projects > Packages > Reown.AppKit.Unity > Prefabs

![](/img/build/tools/gaming-sdks/rg-adding-prefab.png)

- Kéo Reown AppKit Prefab vào cấu trúc cảnh của bạn.

![](/img/build/tools/gaming-sdks/rg-adding-prefab-ii.png)

### Tạo giao diện người dùng (UI)

- Nhấp chuột phải vào cây cấu trúc cảnh
- Đi đến GameObject > UI > Canvas
- Đổi tên thành Canvas

### Xây dựng giao diện ứng dụng của chúng ta

Trong phần này, chúng ta sẽ tạo các thành phần giao diện người dùng cho chức năng yêu cầu Token Kết Nối Linh Hồn. Để thực hiện điều này, chúng ta sẽ tạo một bảng điều khiển chính và 3 bảng con cùng với các thành phần con tương ứng của chúng.

**Bảng điều khiển chính**

- **Bảng trạng thái**: Hiển thị thông tin kết nối ví và số dư token.
- **ButtonPanel**: Kết nối và ngắt kết nối các nút ví.
- **ClaimPanel**: Nhận token SBT và xem số dư SBT

Để tạo **MainPanel**,

- Nhấp chuột phải vào Canvas, chọn UI → Panel và đổi tên thành MainPanel.

Để tạo các bảng con,

- Nhấp chuột phải vào MainPanel, chọn UI → Panel và đổi tên thành StatusPanel.
- Lặp lại bước trên để tạo ButtonPanel và ClaimPanel trong MainPanel tương ứng.

Bây giờ chúng ta hãy tạo các thành phần trong từng bảng con.

Để tạo thành phần **StatusPanel**,

- Nhấp chuột phải vào StatusPanel, chọn UI → Text - TestMeshPro và đổi tên đối tượng văn bản thành WalletStatusText.
  - Hãy đảm bảo điền đầy đủ nội dung vào đối tượng văn bản. Ví dụ: "Trạng thái: Không kết nối"
- Nhấp chuột phải vào StatusPanel, chọn UI → Text - TestMeshPro và đổi tên đối tượng văn bản thành AccountText.
  - Hãy đảm bảo điền đầy đủ nội dung vào đối tượng văn bản. Ví dụ: "Địa chỉ kết nối:"
- Nhấp chuột phải vào StatusPanel, chọn UI → Text - TextMeshPro và đổi tên đối tượng văn bản thành KaiaBalanceText.
  - Hãy đảm bảo điền đầy đủ nội dung vào đối tượng văn bản. Ví dụ: "KAIA Balance :-"
- Nhấp chuột phải vào StatusPanel, chọn UI → Text - TextMeshPro và đổi tên đối tượng văn bản thành UsdtBalanceText.
  - Hãy đảm bảo điền đầy đủ nội dung vào đối tượng văn bản. Ví dụ: "Số dư USDT :-"

Để tạo thành phần **ButtonPanel**,

- Nhấp chuột phải vào ButtonPanel, chọn UI → Button - TextMeshPro và đổi tên đối tượng văn bản thành ConnectWallet.
  - Hãy đảm bảo điền đầy đủ nội dung vào đối tượng văn bản. Ví dụ: "Kết nối Ví"
- Nhấp chuột phải vào ButtonPanel, chọn UI → Button - TextMeshPro và đổi tên đối tượng văn bản thành DisconnectWallet.
  - Hãy đảm bảo điền đầy đủ nội dung vào đối tượng văn bản. Ví dụ: "Ngắt kết nối ví"

Để tạo thành phần **ClaimPanel**,

- Nhấp chuột phải vào ClaimPanel, chọn UI → Text - TextMeshPro và đổi tên đối tượng văn bản thành ClaimLabel.
  - Hãy đảm bảo điền đầy đủ nội dung vào đối tượng văn bản. Ví dụ: "Yêu cầu NFT Kết Nối Linh Hồn:"
- Nhấp chuột phải vào ClaimPanel, chọn UI → Button - TextMeshPro và đổi tên đối tượng văn bản thành ClaimButton.
  - Hãy đảm bảo điền đầy đủ nội dung vào đối tượng văn bản. Ví dụ: "Yêu cầu"
- Nhấp chuột phải vào ClaimPanel, chọn UI → Text - TextMeshPro và đổi tên đối tượng văn bản thành ClaimBalanceText.
  - Hãy đảm bảo điền đầy đủ nội dung vào đối tượng văn bản. Ví dụ: "Cân bằng:"

:::note
Sau khi tạo tất cả các thành phần, hãy sắp xếp chúng gọn gàng trong cảnh của bạn bằng công cụ Di chuyển.
:::

![](/img/build/tools/gaming-sdks/rg-full-ui.png)

## Tạo và triển khai hợp đồng thông minh Soul Bound Token

Trong phần này, chúng ta sẽ sử dụng mã mẫu dưới đây làm hướng dẫn:

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

### Triển khai thông qua Remix IDE

- Sao chép và dán mã trên vào một tệp mới được tạo `SBT.sol` trên Remix IDE.
- Trong Remix IDE:
  - Nhấp vào nút "Compile contract".
  - Chuyển đến tab "Deploy & run transactions".
  - Trong phần Môi trường, chọn Nhà cung cấp được tiêm — MetaMask.
  - Tìm hợp đồng của bạn (SoulBoundToken) trong menu thả xuống Hợp đồng.
  - Nhấp vào Deploy để triển khai token của bạn!
  - Khi MetaMask của bạn hiển thị:
    - Kiểm tra chi tiết triển khai.
    - Nhấp vào "Xác nhận" để triển khai lên mạng chính Kaia.

:::note
Sao chép và lưu địa chỉ hợp đồng đã triển khai. Bạn sẽ cần nó sau này trong hướng dẫn.
:::

## Thực thi kịch bản SBTManager

Trong bước này, chúng ta sẽ tạo một skript quản lý các tương tác chính với ví: kết nối và ngắt kết nối ví, lấy số dư tiền tệ gốc (KAIA) và số dư token (USDT), và kích hoạt chức năng yêu cầu SBT.

Để làm điều đó,

- Tạo một thư mục **Scripts** trong thư mục Assets của bạn.
- Tạo một tệp kịch bản **SBTManager** trong thư mục Scripts mới tạo của bạn.
- Sao chép và dán mã bên dưới vào tệp kịch bản mới tạo của bạn:

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

## Thiết lập đối tượng trò chơi SBTManager

- Tạo đối tượng Quản lý trong cảnh của bạn
  - Nhấp chuột phải vào cửa sổ Hierarchy (cấp độ gốc).
  - Chọn "Tạo đối tượng trống".
  - Đặt tên cho nó là "SBTManager".
- Đính kèm kịch bản của bạn
  - Chọn đối tượng trò chơi SBTManager.
  - Trong Inspector, nhấp vào Thêm thành phần.
  - Tìm kiếm và chọn "SBTManager".
- Kết nối các thành phần giao diện người dùng:
  - Khi đã chọn SBTManager, hãy xem trong Inspector.
  - Kéo và thả các thành phần giao diện người dùng (UI) từ Hierarchy vào các trường tương ứng:
    - Trạng thái văn bản
    - Nội dung tài khoản
    - V.v. …..
  - Đặt địa chỉ hợp đồng USDT và SBT tương ứng.

![](/img/build/tools/gaming-sdks/rg-connect-ui-to-script.png)

## Kết nối nút với kịch bản

Trong phần này, chúng ta sẽ kết nối các nút sau với các chức năng tương ứng của chúng từ script SBTManager:

- Chọn một nút (ví dụ: ConnectWallet)
  - Trong trình kiểm tra, tìm phần OnClick() và nhấp vào nút ➕.
  - Kéo đối tượng SBTManager từ cửa sổ Hierarchy vào trường None (đối tượng).
  - Nhấp vào No Function → SBTManager → ConnectWallet()

![](/img/build/tools/gaming-sdks/rg-unity-connect-functions.png)

- Lặp lại các bước 1–3 cho các nút bên dưới và thay đổi chức năng của chúng thành:
  - Ngắt kết nối Ví -> Ngắt kết nối Ví()
  - Nút Yêu Cầu -> Yêu Cầu SBT()

## Cài đặt xây dựng WebGL

Trong phần này, chúng ta sẽ cấu hình ứng dụng dApp cho việc triển khai trên web:

- Đi đến Tệp → Cài đặt Xây dựng → WebGL → Chuyển đổi nền tảng

![](/img/build/tools/gaming-sdks/rg-switch-platform.png)

- Từ cửa sổ đó, nhấp vào "Thêm Cảnh Mở" (góc trên bên phải) để thêm SampleScene làm cảnh đầu tiên xuất hiện khi chúng ta chạy trò chơi.

![](/img/build/tools/gaming-sdks/rg-add-samplescene.png)

- Từ cửa sổ đó, nhấp vào Cài đặt Người dùng → Người dùng → Độ phân giải và Hiển thị, trong phần Mẫu WebGL, chọn mẫu có tiêu đề Mặc định.

![](/img/build/tools/gaming-sdks/rg-select-webgl-temp.png)

## Kiểm thử và chạy ứng dụng Unity

Trong phần này, chúng ta sẽ kiểm tra các tính năng khác nhau trong ứng dụng Unity của chúng ta. Để xem cách thức hoạt động của điều này, hãy làm theo các bước sau:

- Xây dựng và chạy dự án: Truy cập vào File → Build and Run

![](/img/build/tools/gaming-sdks/rg-build-and-run.png)

- Lưu bản dựng WebGL khi được yêu cầu.
- Khi dự án được biên dịch và chạy, nó sẽ mở một tab trong trình duyệt của bạn — SampleScene
- Nhấp vào "Kết nối Ví" để kết nối với Metamask.

![](/img/build/tools/gaming-sdks/rg-connect-to-mm.png)

- Sau khi kết nối, hãy kiểm tra tất cả các tính năng của ứng dụng:
  - Yêu cầu SBT
  - Kiểm tra số dư

![](/img/build/tools/gaming-sdks/kaia-reown-demo.gif)

## Kết luận

Trong hướng dẫn này, bạn đã học cách tích hợp gói Reown AppKit vào trò chơi Unity của mình trên Kaia. Để có hướng dẫn chi tiết hơn về Reown Unity gaming SDK và cách nó hoạt động, vui lòng tham khảo [Hướng dẫn Reown AppKit trên Unity](https://docs.reown.com/appkit/unity/core/installation)
