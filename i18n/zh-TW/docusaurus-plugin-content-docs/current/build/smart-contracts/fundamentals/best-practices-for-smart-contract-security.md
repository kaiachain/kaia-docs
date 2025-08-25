# 智慧契約安全的最佳實務

本指南提供實用且結構化的智慧型契約安全性最佳實務攻略。
智慧契約是大多數網上應用程式的動力來源。 它們定義並強制執行廣泛使用個案背後的邏輯，包括分散式金融、玩賺遊戲、現實世界資產代用化等。

在 Kaia 生態系統中，特別是在建立 Mini dApp 的開發者之間，這些應用程式的採用和使用量快速增加。 然而，透過智慧型契約交易或鎖定的價值越多，就越有可能吸引惡意的行為者。 這些攻擊者通常專注於系統的核心 - 智慧型契約。

基於這個原因，智慧型契約的安全性絕對不能被視為事後的想法。 從最早的開發階段到部署以及與合約的持續互動，都應該是優先處理的事項。

## 什麼是智慧型契約安全性？

智慧型契約是儲存在區塊鏈上的程式，當符合預先定義的條件時會自動執行。 一旦部署，其代碼就會變得不可變，也就是說不能變更。 這種不可變性確保了透明度，並消除了對中介的需求，但同時也引入了嚴重的風險。 如果合約包含漏洞，在部署後就無法修補，這可能會導致資金被盜和失去信任。

智慧契約安全則是指用來保護這些契約免受惡意攻擊和程式缺陷的一系列實務和措施。 安全性良好的合約有助於防止未經授權的存取、資料竄改和財務損失，從而保障您的通訊協定的完整性。

## 為什麼智慧契約安全性很重要？

由於智慧型契約在部署後是不可變的，因此任何錯誤或漏洞都會變成永久性的。 惡意的行為者可以利用這些弱點來抽走資金或操控協議的行為。 在很多情況下，代碼中的一個錯誤就可能導致數百萬美元的損失。

根據 DeFiLlama 的資料，截至 2025 年 6 月，分散式金融攻擊所盜取的總金額高達 66 億美元。 其中，智慧型契約入侵約佔 33 億美元，約 51%。 這些數字突顯出智慧型契約安全性對於任何上鏈通訊協定是多麼重要。

## 撰寫安全智慧型契約的最佳實務

### ‍1. 使用經過良好測試且安全的程式庫或函式

‍
在您的智慧型契約中使用外部相依性，如果這些相依性沒有經過適當的測試或審查，可能會引入惡意程式碼。 為了降低此風險，請務必依賴測試良好且廣受信任的函式庫，例如 [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master)，這些函式庫由強大的社群維護，並定期進行稽核。

此外，在將任何第三方程式碼整合至您的合約之前，請對其進行徹底的審查。 測試和檢閱外部程式碼有助於確保它不包含隱藏的弱點，也不會在您的通訊協定中引入意想不到的行為。

### 2. 實施開發安全模式

安全模式是用來防禦已知攻擊媒介 (例如重入) 的標準化技術。 它們提供可靠且廣為接受的方法，可在漏洞發生前加以預防。 將這些模式融入您的程式碼中，可提高程式碼的彈性，並降低遭受攻擊的風險。
以下是一些需要考慮的基本安全模式：

#### 2.1 CEI 模式（檢查-影響-互動）

CEI 模式有助於確保在進行任何外部互動之前完成所有必要的驗證。 此結構可降低智慧型契約執行時發生意外行為或惡意行為的機會。

當正確執行時，CEI 模式會遵循這個順序：

 - 檢查：確認符合所有必要條件（例如，確認使用者有足夠的餘額）。
 - 效果：更新契約的內部狀態（例如減少使用者的餘額）。
 - 互動：轉帳或呼叫外部合約。

透過遵循此結構，您可以大幅降低重定向攻擊的風險。

例如，下面的範例很容易受到攻擊，因為它會在更新使用者的餘額之前，先傳送以太幣給使用者。

```solidity
contract InSecureBank {

    mapping(address => uint256) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        // Checks: if user have enough balance
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // observe that this is an this external interaction.
        // should be made after deducting the `amount` from the user's balance
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
        // Effects: Update the user's balance
        balances[msg.sender] -= amount;
    }
}
```

上面的程式碼容易受到重入式攻擊，惡意的行為者可以在餘額更新前重複呼叫 withdraw 函式。 CEI 模式可確保在進行任何外部呼叫之前更新契約的狀態，有助於防止這種情況發生。

以下是遵循 CEI 模式的上述程式碼的更新版本：

```solidity
contract SecureBank {

    mapping(address => uint256) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        // Checks: Ensure that the user has enough balance to withdraw the requested amount
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // Effects: Update the user's balance
        balances[msg.sender] -= amount;
        // Interactions: Transfer the requested amount to the user
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }
}
```

在遵循 CEI 模式的更新版本中，在轉移任何代幣之前，會先調整餘額。 這樣，即使使用者嘗試重新輸入功能，呼叫也會失敗，因為他們的餘額已經減少。

#### 2.2. 緊急停止模式

‍
緊急停止模式通常被稱為斷路器，允許在緊急情況下暫停智能合約中的選定功能。 如果偵測到漏洞或意外行為，它提供了一種快速停用關鍵作業的方法。

若要主動監控您的合約是否存在此類問題，您可以使用監控工具或專為此目的定制的機器人。 這些機器人會掃描特定的交易模式或合約狀態的異常變化，以標示潛在的威脅。

以下是一個範例，說明如何在您的合約中實現斷路器機制：

```solidity
contract CircuitBreaker {

    address public owner;
    bool public contractStopped = false;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not the owner");
        _;
    }

    // Only works when contract is running
    modifier haltInEmergency() {
        require(!contractStopped, "Contract is stopped");
        _;
    }

    // Only works when contract is paused
    modifier enableInEmergency() {
        require(contractStopped, "Contract is running");
        _;
    }

    // Owner can pause/unpause contract
    function toggleContractStopped() public onlyOwner {
        contractStopped = !contractStopped;
    }

    // Normal operations (when running)
    function deposit() public payable haltInEmergency {
        // Deposit logic here
    }

    // Emergency functions (when paused)
    function emergencyWithdrawal() public onlyOwner enableInEmergency {
        // Emergency withdrawal logic here
    }
}
```

#### 2.3. 减速带模式

Speed Bump 模式會在執行關鍵的 onchain 動作 (例如提款或治理決策) 前引入一段延遲時間。 此延遲可作為一種保護措施，讓使用者或管理員有時間偵測和回應可疑活動。

例如，您可以透過設定固定等待期或最高提款金額來限制提款。 這有助於防止未經授權的存取或惡意行為導致資金快速耗盡。

以下範例顯示此模式如何運作，強制使用者在提款前等待五天。

```solidity
contract BankWithSpeedBump { 
    
    struct Withdrawal { 
        uint amount; 
        uint requestedAt; 
    } 

    mapping (address => uint) public balances; 
    mapping (address => Withdrawal) public withdrawals; 

    uint constant WAIT_PERIOD = 5 days;
  
    function deposit() public payable { 
        balances[msg.sender] += msg.value;
    }

    function requestWithdrawal() public { 
        if (balances[msg.sender] > 0) { 
        uint amountToWithdraw = balances[msg.sender]; 
        balances[msg.sender] = 0; 
        withdrawals[msg.sender] = Withdrawal({ amount: amountToWithdraw, requestedAt: block.timestamp}); 
        } 
    }

    function withdraw() public {
        require(withdrawals[msg.sender].amount > 0, "No pending withdrawal");
        require(
            block.timestamp > withdrawals[msg.sender].requestedAt + WAIT_PERIOD,
            "Wait period not completed"
        );
        
        uint amount = withdrawals[msg.sender].amount; 
        withdrawals[msg.sender].amount = 0; 
        
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Withdraw failed");
    }
}
```

### 3. 使用最新版本的 Solidity 編譯器

‍
永遠使用最新版本的 Solidity 編譯器。 較新的版本通常包含重要的安全修復和語言改進。 舉例來說，Solidity 0.8.x 及以上版本內建了防止算術溢出和算術漏出的保護機制，而這兩種情況之前在智慧契約中是常見的漏洞。

保持更新可確保您的程式碼受益於最新的安全功能和編譯器檢查。

### 4. 保持智慧型契約簡單

‍
簡單是撰寫安全智慧型契約時的重要原則。 複雜的邏輯通常會帶來不必要的風險和隱藏的弱點。 最好讓您的合約代碼和結構儘量簡單明瞭。 當複雜性無法避免時，請將邏輯分解成較小的函式，每個函式都有特定的目的。

### 5. 在模擬環境中測試您的智慧契約

‍
在將您的智慧型契約部署到實際網路之前，請務必在模擬環境中執行，例如 Kairos Testnet。 在這種受控制的環境中進行測試，可以讓您嚴格評估您的合約在不同條件和邊緣情況下的表現。
此流程有助於發現弱點、確認預期行為，並改善整體可靠性。 它也降低了部署有缺陷的邏輯而導致資金損失或系統故障的風險。

‍以下是幾種建議的測試方法，用以驗證您的智慧型契約：

#### 5.1 單元測試

‍
單元測試著重於評估智慧型契約中的個別功能。 若要有效執行單元測試，您需要將合約結構化為小型、單一用途的函式，以便隔離測試。

一種常見的方法是使用 assertions - 描述函數預期行為的明確語句。 然後，您要驗證這些論斷在不同的條件下是否成立。 單元測試應該總是在整合測試之前執行，因為它有助於在開發過程的早期發現並修復問題。

#### 5.2. 整合測試

‍
整合測試評估您合約中的各個元件如何共同運作。 這包括檢查函式、外部契約以及 API 等系統之間的互動。
這種類型的測試對於識別與跨合約呼叫、依賴性和繼承功能相關的問題至關重要。 它可確保個別零件在組合時正常運作，並確保合約在更廣泛的系統情境中能發揮預期的功能。

#### 5.3. 模糊測試

‍
模糊測試涉及將隨機或極端輸入值傳入您的合約，以觀察其行為。 此技術有助於發現在單元或整合測試中可能無法發現的弱點。

當您的合約包含數學運算或輸入驗證邏輯時，模糊測試尤其有價值。 它可讓您對程式碼進行壓力測試，並找出在非一般條件下的意外行為。

### 6. 執行智慧型契約稽核

‍
稽核是由獨立團隊對您的合約程式碼進行有系統的檢閱，以找出弱點、錯誤或設計缺陷。 此流程可在部署前為您的智慧型契約的安全性與可靠性增加多一層信心。

典型的審計包括

 - 徹底手動檢閱程式碼
 - 自動掃描已知漏洞
 - 測試以驗證合約的行為
 - 詳細報告，概述發現的問題和改進建議

稽核有助於降低漏洞的風險，並確保您的智慧型契約在啟用前符合安全標準。

### 7. 包含故障安全機制

為了安全起見，尤其是在處理新合約時，必須加入可靠的故障安全方法。 這可讓您在發生任何問題時快速回應。 以下是一些可以考慮的策略：

 - **可升級性**：確保您的合約允許未來升級。 這樣就可以在不更換整個合約的情況下修復錯誤並引進新功能。
 - \*\* 分散控制\*\*：避免將控制權集中在一個地方。 使用多重簽名錢包，讓重要的動作需要多方確認。
 - **時間鎖定**：在執行重要動作前加入延遲。 這可讓團隊或更廣泛的社群有時間檢閱交易，並在需要時作出回應。

## 總結

絕對不應將安全性視為事後的考慮。 從開發到生產，它必須是軟體開發流程中每個階段的重要部分。 開發人員在使用智慧型契約時，需要採取安全第一的思維。

務必為可能的失敗做好準備，謹慎推出變更，隨時瞭解生態系統的更新，瞭解 EVM 的特殊性，並盡可能保持您的合約簡單。 遵循上述最佳實務，您將可大幅降低風險，並提高智慧型契約的可靠性。

