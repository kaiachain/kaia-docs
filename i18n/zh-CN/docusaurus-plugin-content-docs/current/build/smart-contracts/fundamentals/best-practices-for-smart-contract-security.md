# 智能合约安全最佳实践

本指南对智能合约安全的最佳实践进行了实用而有条理的阐述。
智能合约是大多数链上应用的动力源。 它们定义并执行各种用例背后的逻辑，包括去中心化金融、玩赚游戏、现实世界资产代币化等。

在 Kaia 生态系统中，尤其是在开发 Mini dApps 的开发者中，这些应用程序的采用和使用率迅速上升。 然而，通过智能合约交易或锁定的价值越多，就越有可能吸引恶意行为者。 这些攻击者通常关注系统的核心--智能合约。

因此，智能合约的安全性绝不能事后才考虑。 从开发的最初阶段到部署以及与合同的持续互动，都应将其作为优先事项。

## 什么是智能合约安全？

智能合约是存储在区块链上的程序，在满足预定义条件时自动执行。 一旦部署，其代码就变得不可更改，即无法更改。 这种不变性确保了透明度，消除了对中介的需求，但也带来了严重的风险。 如果合同包含漏洞，在部署后就无法修补，这可能会导致资金被盗和失去信任。

智能合约安全是指用于保护这些合约免受恶意攻击和程序缺陷的一系列实践和措施。 一份安全可靠的合同有助于防止未经授权的访问、数据篡改和财务损失，从而保护协议的完整性。

## 智能合约安全为何重要？

由于智能合约在部署后不可更改，因此任何错误或漏洞都将成为永久性的。 恶意行为者可以利用这些弱点耗尽资金或操纵协议行为。 在许多情况下，代码中的一个错误就可能导致数百万美元的损失。

根据 DeFiLlama 的数据，截至 2025 年 6 月，在去中心化金融攻击中被盗的总金额高达 66 亿美元。 其中，智能合约漏洞利用约占 33 亿美元，约为 51%。 这些数据凸显了智能合约安全对于任何链上协议的重要性。

## 编写安全智能合约的最佳实践

### ‍1. 使用经过严格测试的安全库或函数

‍
在智能合约中使用外部依赖项，如果这些依赖项没有经过适当测试或审查，就可能引入恶意代码。 为降低这种风险，应始终依赖经过严格测试且广受信任的库，如 [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master)，这些库由一个强大的社区维护，并定期接受审核。

此外，在将第三方代码纳入合同之前，要对其进行彻底审查。 测试和审查外部代码有助于确保其不包含隐藏的漏洞或在协议中引入意外行为。

### 2. 实施开发安全模式

安全模式是防御已知攻击载体（如重入性）的标准化技术。 它们提供了一种可靠且广为接受的方法，可在漏洞出现之前加以预防。 将这些模式融入代码可提高代码的弹性，降低漏洞利用的风险。
以下是一些需要考虑的基本安全模式：

#### 2.1 CEI 模式（检查-影响-互动）

CEI 模式有助于确保在进行任何外部交互之前完成所有必要的验证。 这种结构降低了智能合约执行过程中出现意外或恶意行为的几率。

如果实施得当，CEI 模式会遵循以下顺序：

 - 检查：确认满足所有必要条件（例如，确认用户有足够的余额）。
 - 效果：更新合约的内部状态（如减少用户的余额）。
 - 互动：转账或调用外部合同。

采用这种结构可以大大降低重入点攻击的风险。

例如，下面的示例就存在漏洞，因为它会在更新用户余额之前向其发送以太币。

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

上述代码容易受到重入攻击，恶意行为者可以在余额更新前重复调用提款函数。 CEI 模式可确保在进行任何外部调用之前更新合约状态，从而避免出现这种情况。

下面是上述代码的更新版本，它采用了 CEI 模式：

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

在遵循 CEI 模式的更新版本中，余额会在任何代币转移之前进行调整。 这样，即使用户试图重新输入功能，调用也会失败，因为他们的余额已经减少。

#### 2.2. 紧急停止模式

‍
紧急停止模式通常被称为断路器，允许在紧急情况下暂停智能合约中的选定功能。 如果检测到漏洞或意外行为，它提供了一种快速禁用关键操作的方法。

要主动监控您的合同是否存在此类问题，您可以使用监控工具或为此目的定制的机器人。 这些机器人会扫描特定的交易模式或合同状态的异常变化，以标记潜在威胁。

下面的示例演示了如何在合同中实施断路器机制：

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

#### 2.3. 减速带图案

在执行关键链上操作（如提款或治理决策）之前，"减速带 "模式会引入一段延迟时间。 这种延迟可作为一种保护措施，让用户或管理员有时间检测和应对可疑活动。

例如，您可以通过设置固定的等待期或最高取款金额来限制取款。 这有助于防止未经授权的访问或恶意行为导致的资金快速耗尽。

下面的示例展示了这种模式的工作原理，即在用户取款前强制执行五天等待时间。

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

### 3. 使用最新版本的 Solidity 编译器

‍
始终使用最新版本的 Solidity 编译器。 新版本通常包含重要的安全修复和语言改进。 例如，Solidity 0.8.x 及以上版本引入了针对算术溢出和算术底溢出的内置保护措施，而算术溢出和算术底溢出以前是智能合约中的常见漏洞。

保持更新可确保您的代码受益于最新的安全功能和编译器检查。

### 4. 让智能合约保持简单

‍
简化是编写安全智能合约的关键原则。 复杂的逻辑往往会带来不必要的风险和隐藏的漏洞。 合同代码和结构最好尽可能简单明了。 当复杂性不可避免时，可将逻辑分解成更小的功能，每个功能都有特定的目的。

### 5. 在模拟环境中测试智能合约

‍
在将智能合约部署到实时网络之前，一定要在 Kairos Testnet 等模拟环境中运行。 在这种受控环境下进行测试，可以严格评估合同在不同条件和边缘情况下的表现。
这一过程有助于发现漏洞、确认预期行为并提高整体可靠性。 它还能降低因部署错误逻辑而导致资金损失或系统故障的风险。

‍ 以下是几种推荐的测试方法，用于验证智能合约：

#### 5.1 单元测试

‍
单元测试侧重于评估智能合约中的单个功能。 要有效地执行单元测试，就需要将合同结构化为小型、单一用途的函数，以便进行隔离测试。

一种常见的方法是使用断言--描述函数预期行为的清晰语句。 然后，您要验证这些断言在不同条件下是否成立。 单元测试应始终在集成测试之前进行，因为它有助于在开发过程中尽早发现和解决问题。

#### 5.2. 集成测试

‍
集成测试评估合同的各个组件如何协同工作。 这包括检查函数、外部合约和系统（如 API）之间的交互。
这种类型的测试对于识别与跨合同调用、依赖性和继承功能有关的问题至关重要。 它能确保各个部分在组合时正常运行，并确保合同在更广泛的系统环境中发挥预期作用。

#### 5.3. 模糊测试

‍
模糊测试涉及向合约传递随机或极端的输入值，以观察其行为。 这种技术有助于发现单元测试或集成测试中可能不明显的漏洞。

当您的合同包含数学运算或输入验证逻辑时，模糊测试尤为重要。 通过它，您可以对代码进行压力测试，并识别在不常见条件下的意外行为。

### 6. 执行智能合约审计

‍
审计是由一个独立团队对合同代码进行的结构化审查，目的是找出漏洞、错误或设计缺陷。 在部署之前，这一流程为智能合约的安全性和可靠性增加了一层额外的信心。

典型的审计包括

 - 对代码进行彻底的人工审查
 - 自动扫描已知漏洞
 - 测试验证合同行为
 - 一份详细报告，概述发现的问题和改进建议

审计有助于降低漏洞利用风险，确保智能合约在上线前符合安全标准。

### 7. 包括故障安全机制

为了安全起见，特别是在处理新合同时，必须采用可靠的故障安全方法。 这样，如果出现任何问题，您都可以迅速做出反应。 以下是一些可供参考的策略：

 - **可升级性**：确保您的合同允许未来升级。 这样就可以在不更换整个合同的情况下，修复漏洞和引入新功能。
 - **分散控制**：避免将控制权集中在一个地方。 使用多签名钱包，以便重要操作需要多方确认。
 - **时间锁定**：在执行重要操作前增加延迟时间。 这样，团队或更广泛的社区就有时间审查交易，并在必要时做出回应。

## 结论

绝不能事后才考虑安全问题。 它必须成为软件开发过程中从开发到生产的每个阶段的重要组成部分。 在使用智能合约时，开发人员需要采用安全第一的思维方式。

时刻为可能出现的故障做好准备，谨慎推出变更，随时了解生态系统的更新，了解 EVM 的特殊性，并尽可能简化合同。 通过遵循上述最佳实践，您将大大降低风险并提高智能合约的可靠性。

