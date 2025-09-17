# Reown

## 소개

[Reown](https://docs.reown.com/overview)은 빌더가 안전하고 사용자 친화적이며 인사이트가 풍부한 지갑과 앱 UX를 만들 수 있도록 지원합니다. 더 빠르게 출시하고 더 스마트하게 확장할 수 있는 모든 도구를 제공합니다. 유니티의 **Reown AppKit**을 사용하면 온체인 에코시스템을 게임에 쉽게 연결하여 플레이어에게 자연스럽게 느껴지는 원활한 지갑 상호작용을 구현할 수 있습니다.

이 튜토리얼에서는 플레이어가 게임플레이 내에서 직접 Web3와 상호작용할 수 있도록 Reown 앱키트를 Kaia 기반 Unity 게임에 통합하는 방법을 단계별로 살펴봅니다.

## 전제 조건.

- 최신 버전의 [Unity](https://unity.com/download?ref=blog.chainsafe.io)(Unity 2022.3 이상)
- 메타마스크](https://metamask.io/download/?ref=blog.chainsafe.io) 지갑
- 카이아 수도꼭지]의 테스트넷 KAIA(https://faucet.kaia.io/) (카이로스를 사용하는 경우)
- [프로젝트 ID 구성](https://docs.reown.com/appkit/unity/core/installation#configure)

![](/img/build/tools/gaming-sdks/rg-configure-project-id.png)

![](/img/build/tools/gaming-sdks/rg-configure-project-id-ii.png)

## 시작하기

이 가이드에서는 Kaia의 Reown AppKit을 사용하여 지갑 기능을 Unity 게임에 통합하는 방법을 알아봅니다. 마지막에는 플레이어가 다음과 같은 작업을 수행할 수 있는 설정이 완료됩니다:

- 지갑 연결 및 연결 해제
- 기본 통화 잔액과 토큰 잔액 모두 보기
- 게임 내에서 직접 소울바운드 토큰(SBT)을 획득하세요.

교육 목적으로 카이아 메인넷에서 빌드하지만, 개발 및 테스트를 위해 카이로스 테스트넷에서도 동일한 코드가 원활하게 실행됩니다.

### 새 Unity3D 프로젝트 생성

새 프로젝트를 만들려면 다음과 같이 하세요:

- 프로젝트\*\* 탭으로 이동합니다,
- 새 프로젝트\*\* 버튼을 클릭합니다.
- 모든 템플릿을 선택합니다. 3D 템플릿\*\*을 사용합니다,
- 프로젝트 만들기\*\*를 클릭합니다.

![](/img/build/tools/gaming-sdks/rg-unity-create-project.png)

### Unity에 Reown AppKit 설치

Open UPM이 포함된 패키지 관리자

1. Unity 메뉴 표시줄 상단에 있는 서비스 메뉴에서 일반 설정을 엽니다.
2. 다음 세부 정보를 사용하여 범위가 지정된 새 레지스트리를 추가합니다:
   - 이름: OpenUPM
   - URL: https://package.openupm.com
   - 범위: com.reown 및 com.nethereum

![](/img/build/tools/gaming-sdks/rg-package-manager.png)

3. 더하기 ➕를 누른 다음 저장 버튼을 누릅니다.
4. Unity 상단에 있는 Windows 메뉴에서 패키지 관리자를 엽니다.

![](/img/build/tools/gaming-sdks/rg-package-manager-ii.png)

5. 도구 모음에서 추가 ➕ 메뉴를 열고 이름으로 패키지 추가를 선택합니다.…

![](/img/build/tools/gaming-sdks/rg-package-manager-iii.png)

6. 다음 패키지의 이름을 하나씩 입력합니다:
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
7. 추가\*\* 버튼을 누릅니다.

![](/img/build/tools/gaming-sdks/rg-package-manager-iv.png)

## 앱 장면 설정

웹3 기능을 위해 씬을 준비해야 합니다:

### 씬 로드

- 자산 > 씬에서 샘플 장면을 두 번 클릭합니다. 여기에는 Claim SBT의 모든 기능이 있습니다.

### Reown 앱키트 프리팹 추가하기

- 프로젝트 > 패키지 > Reown.AppKit.Unity > 프리팹으로 이동합니다.

![](/img/build/tools/gaming-sdks/rg-adding-prefab.png)

- Reown AppKit 프리팹을 씬 계층 구조로 드래그합니다.

![](/img/build/tools/gaming-sdks/rg-adding-prefab-ii.png)

### UI 캔버스 만들기

- 씬 계층 구조에서 마우스 오른쪽 버튼 클릭
- 게임 오브젝트 > UI > 캔버스로 이동합니다.
- Canvas로 이름 변경

### 앱 인터페이스 구축

이 섹션에서는 소울 바운드 토큰 클레임 기능을 위한 사용자 인터페이스 구성 요소를 만들겠습니다. 이를 위해 메인 패널과 해당 하위 컴포넌트가 있는 3개의 하위 패널을 만들 것입니다.

**메인 패널**

- **상태 패널**: 지갑 연결 정보와 토큰 잔액을 표시합니다.
- **버튼패널**: 지갑 버튼을 연결하고 분리합니다.
- **클레임패널**: SBT 토큰을 청구하고 SBT 잔액 보기

메인 패널\*\*을 만들려면,

- 캔버스를 마우스 오른쪽 버튼으로 클릭하고 UI → 패널을 클릭한 다음 이름을 메인패널로 변경합니다.

하위 패널을 만들려면 다음과 같이 하세요,

- 메인 패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 패널을 클릭한 다음 이름을 StatusPanel로 변경합니다.
- 위의 단계를 반복하여 메인 패널에 각각 ButtonPanel과 ClaimPanel을 만듭니다.

이제 각 하위 패널에 컴포넌트를 만들어 보겠습니다.

상태 패널\*\* 컴포넌트를 생성하려면,

- 스테이터스 패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 텍스트 - TestMeshPro를 클릭한 다음 텍스트 개체의 이름을 WalletStatusText로 변경합니다.
  - 텍스트 개체를 채워야 합니다. 예: "상태: 연결되지 않음"
- 상태 패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 텍스트 - TestMeshPro를 클릭한 다음 텍스트 오브젝트의 이름을 AccountText로 변경합니다.
  - 텍스트 개체를 채워야 합니다. 예: "연결된 주소:"
- 스테이터스 패널을 우클릭하고 UI → 텍스트 - 텍스트 메시 프로를 클릭한 다음 텍스트 오브젝트의 이름을 KaiaBalanceText로 변경합니다.
  - 텍스트 개체를 채워야 합니다. 예: "KAIA 잔액 :-"
- 스테이터스 패널을 우클릭하고 UI → 텍스트 - 텍스트 메시 프로를 클릭한 다음 텍스트 오브젝트의 이름을 UsdtBalanceText로 변경합니다.
  - 텍스트 개체를 채워야 합니다. 예: "USDT 잔액 :-"

버튼패널\*\* 컴포넌트를 생성합니다,

- 버튼 패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 버튼 - 텍스트 메시 프로를 클릭한 다음 텍스트 객체의 이름을 ConnectWallet으로 변경합니다.
  - 텍스트 개체를 채워야 합니다. 예: "지갑 연결"
- 버튼 패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 버튼 - 텍스트 메시 프로를 클릭한 다음 텍스트 객체의 이름을 DisconnectWallet으로 변경합니다.
  - 텍스트 개체를 채워야 합니다. 예: "지갑 연결 끊기"

청구 패널\*\* 컴포넌트를 생성하려면,

- 클레임 패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 텍스트 - 텍스트 메시 프로를 클릭한 다음 텍스트 오브젝트의 이름을 클레임 라벨로 변경합니다.
  - 텍스트 개체를 채워야 합니다. 예: "클레임 소울 바운드 NFT:"
- 클레임 패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 버튼 - 텍스트 메시 프로를 클릭한 다음 텍스트 오브젝트의 이름을 클레임 버튼으로 변경합니다.
  - 텍스트 개체를 채워야 합니다. 예: "클레임"
- 클레임 패널을 마우스 오른쪽 버튼으로 클릭하고 UI → 텍스트 - 텍스트 메시 프로를 클릭한 다음 텍스트 오브젝트의 이름을 클레임 밸런스 텍스트로 변경합니다.
  - 텍스트 개체를 채워야 합니다. 예: "잔액:"

:::note
모든 컴포넌트를 생성한 후 이동 도구를 사용하여 씬에서 깔끔하게 정렬합니다.
:::

![](/img/build/tools/gaming-sdks/rg-full-ui.png)

## 소울 바운드 토큰 스마트 컨트랙트 생성 및 배포

이 섹션에서는 아래의 샘플 코드를 가이드로 사용하겠습니다:

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

### Remix IDE를 통한 배포

- 위의 코드를 복사하여 Remix IDE에서 새로 생성한 파일 `SBT.sol`에 붙여넣습니다.
- Remix IDE에서:
  - 계약서 컴파일 버튼을 클릭합니다.
  - 트랜잭션 배포 및 실행 탭으로 이동합니다.
  - 환경 아래에서 주입된 공급자 - 메타마스크를 선택합니다.
  - 계약 드롭다운에서 계약(SoulBoundToken)을 찾습니다.
  - 배포를 클릭하여 토큰을 실행하세요!
  - 메타마스크가 팝업됩니다:
    - 배포 세부 정보를 검토합니다.
    - 확인을 클릭하여 카이아 메인넷에 배포합니다.

:::note
배포된 계약 주소를 복사하여 저장합니다. 튜토리얼의 뒷부분에 필요하게 될 것입니다.
:::

## SBTManager 스크립트 구현

이 단계에서는 지갑 연결 및 연결 해제, 네이티브 통화(KAIA) 및 토큰 잔액(USDT) 검색, SBT 청구 기능 활성화 등 핵심 지갑 상호작용을 관리하는 스크립트를 만들겠습니다.

그렇게 하려면

- 자산 폴더에 **Scripts** 폴더를 만듭니다.
- 새로 생성한 스크립트 폴더에 **SBTManager** 스크립트를 생성합니다.
- 아래 코드를 복사하여 새로 만든 스크립트 파일에 붙여넣습니다:

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

## SBTManager 게임 오브젝트 설정하기

- 씬에서 매니저 오브젝트 만들기
  - 계층 구조 창(루트 수준)을 마우스 오른쪽 버튼으로 클릭합니다.
  - "빈 개체 만들기"를 선택합니다.
  - 이름을 "SBTManager"로 지정합니다.
- 스크립트 첨부
  - SBTManager 게임 오브젝트를 선택합니다.
  - 인스펙터에서 컴포넌트 추가를 클릭합니다.
  - "SBTManager"를 검색하여 선택합니다.
- UI 요소를 연결합니다:
  - SBTManager를 선택한 상태에서 인스펙터를 살펴봅니다.
  - UI 요소를 계층 구조에서 해당 필드로 끌어다 놓습니다:
    - 상태 텍스트
    - 계정 텍스트
    - 기타 …...
  - USDT와 SBT 컨트랙트 주소를 각각 설정하세요.

![](/img/build/tools/gaming-sdks/rg-connect-ui-to-script.png)

## 스크립트에 버튼 연결하기

이 섹션에서는 다음 버튼을 SBTManager 스크립트의 각 기능과 연결해 보겠습니다:

- 버튼 선택(예: ConnectWallet)
  - 인스펙터에서 OnClick() 섹션을 찾아 ➕ 버튼을 클릭합니다.
  - 계층 구조 창에서 SBTManager 개체를 없음(개체) 필드로 드래그합니다.
  - 함수 없음 → SBTManager → ConnectWallet()을 클릭합니다.

![](/img/build/tools/gaming-sdks/rg-unity-connect-functions.png)

- 아래 버튼에 대해 1~3단계를 반복하여 기능을 다음으로 변경합니다:
  - DisconnectWallet -> DisconnectWallet()
  - 클레임 버튼 -> 클레임SBT()

## WebGL 빌드 설정

이 섹션에서는 웹 배포를 위해 dApp을 구성하겠습니다:

- 파일 → 빌드 설정 → WebGL → 플랫폼 전환으로 이동합니다.

![](/img/build/tools/gaming-sdks/rg-switch-platform.png)

- 같은 창에서 오픈 씬 추가(오른쪽 상단)를 클릭하여 게임을 실행할 때 표시할 첫 번째 씬으로 샘플 씬을 추가합니다.

![](/img/build/tools/gaming-sdks/rg-add-samplescene.png)

- 같은 창에서 플레이어 설정 → 플레이어 → 해상도 및 프레젠테이션을 클릭하고 WebGL 템플릿 아래에서 기본값이라는 제목의 템플릿을 선택합니다.

![](/img/build/tools/gaming-sdks/rg-select-webgl-temp.png)

## Unity 애플리케이션 테스트 및 실행

이 섹션에서는 유니티 애플리케이션의 다양한 기능을 테스트해 보겠습니다. 이를 실제로 확인하려면 아래 단계를 따르세요:

- 프로젝트를 빌드하고 실행합니다: 파일 → 빌드 및 실행으로 이동

![](/img/build/tools/gaming-sdks/rg-build-and-run.png)

- 메시지가 표시되면 WebGL 빌드를 저장합니다.
- 프로젝트가 빌드되고 실행되면 브라우저에 SampleScene 탭이 열립니다.
- 지갑 연결을 클릭하여 메타마스크에 연결합니다.

![](/img/build/tools/gaming-sdks/rg-connect-to-mm.png)

- 연결이 완료되면 앱의 모든 기능을 테스트합니다:
  - SBT 신청하기
  - 잔액 확인

![](/img/build/tools/gaming-sdks/kaia-reown-demo.gif)

## 결론

이 튜토리얼에서는 Kaia의 Unity 게임에 Reown AppKit 패키지를 통합하는 방법을 배웠습니다. Reown Unity 게임 SDK와 작동 방식에 대한 자세한 가이드는 [Reown 앱킷 온 유니티 가이드](https://docs.reown.com/appkit/unity/core/installation)를 참조하세요.
