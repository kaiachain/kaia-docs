# Best Practices for Smart Contract Security

This guide offers a practical and structured walkthrough of the best practices for smart contract security.
Smart contracts serve as the powerhouse of most onchain applications. They define and enforce the logic behind a wide range of use cases, including decentralized finance, play to earn games, real world asset tokenization, and many more. 

Within the Kaia ecosystem, especially among developers building Mini dApps, there has been a rapid increase in adoption and usage of these apps. However, the more value is transacted through or locked in smart contracts, the more likely it is to attract malicious actors. These attackers often focus on the core of the system — the smart contract.

For this reason, smart contract security must not be treated as an afterthought. It should be a priority from the earliest stages of development through deployment and ongoing interaction with the contract.

## What is smart contract security ?

A smart contract is a program stored on a blockchain that automatically executes when predefined conditions are met. Once deployed, its code becomes immutable, meaning it cannot be changed. This immutability ensures transparency and removes the need for intermediaries, but it also introduces serious risks. If the contract contains vulnerabilities, they cannot be patched after deployment, which can result in stolen funds and a loss of trust.

Smart contract security then refers to the set of practices and measures used to protect these contracts from malicious attacks and programming flaws. A well secured contract helps prevent unauthorized access, data manipulation, and financial losses, thereby safeguarding the integrity of your protocol.

## Why is Smart Contract Security Important?

Because smart contracts are immutable after deployment, any bugs or vulnerabilities become permanent. Malicious actors can exploit these weaknesses to drain funds or manipulate the behavior of a protocol. In many cases, a single mistake in the code can result in the loss of millions of dollars.

According to DeFiLlama, as of June 2025, the total amount stolen in decentralized finance attacks is valued at  $6.6b. Of this amount, smart contract exploits account for approximately $3.3b which is about 51%. These figures highlight just how essential smart contract security is for any onchain protocol.

## Best Practices for Writing Secure Smart Contract

### ‍1. Use Well Tested and Secure Libraries or Functions
‍
Using external dependencies in your smart contract can introduce malicious code if those dependencies are not properly tested or reviewed. To reduce this risk, always rely on well tested and widely trusted libraries such as [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master), which are maintained by a strong community and regularly audited.

In addition, conduct a thorough review of any third party code before integrating it into your contract. Testing and reviewing external code helps ensure that it does not contain hidden vulnerabilities or introduce unexpected behavior into your protocol.

### 2. Implement Development Security Patterns

Security patterns are standardized techniques for defending against known attack vectors, such as reentrancy. They offer a reliable and widely accepted approach to preventing vulnerabilities before they occur. Incorporating these patterns into your code improves its resilience and reduces the risk of exploits. 
Below are some essential security patterns to consider:

#### 2.1 CEI Pattern (Checks-Effects-Interaction)

The CEI pattern helps ensure that all necessary validations are completed before any external interaction takes place. This structure reduces the chances of unexpected or malicious behavior during smart contract execution.

When implemented correctly, the CEI pattern follows this order:
- Checks: Confirm that all required conditions are met (for example, confirming that the user has enough balance).
- Effects: Update the contract's internal state (such as reducing the user’s balance).
- Interaction: Transfer funds or call external contracts.

By following this structure, you can significantly reduce the risk of reentrancy attacks.

For instance, the example below is vulnerable because it sends Ether to the user before updating their balance.

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

The code above is vulnerable to a reentrancy attack, which allows a malicious actor to repeatedly call the withdraw function before the balance is updated. The CEI pattern helps prevent this by ensuring the contract’s state is updated before any external call is made.

Here is an updated version of the code above that follows the CEI pattern :

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

In the updated version that follows the CEI pattern, the balance is adjusted before any tokens are transferred. This way, even if a user attempts to reenter the function, the call will fail because their balance has already been reduced.

#### 2.2. Emergency Stop Pattern
‍
The Emergency Stop pattern, often referred to as a circuit breaker, allows selected functions in a smart contract to be paused during emergencies. It provides a way to quickly disable critical operations if a vulnerability or unexpected behavior is detected.

To proactively monitor your contract for such issues, you can use monitoring tools or bots customised for such purposes. These bots scan for specific transaction patterns or abnormal changes in contract state to flag potential threats.

Below is an example demonstrating how to implement a circuit breaker mechanism in your contract: 

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

#### 2.3. Speed Bump Pattern

The Speed Bump pattern introduces a delay period before executing critical onchain actions, such as withdrawals or governance decisions. This delay acts as a protective measure, giving users or administrators time to detect and respond to suspicious activity.

For example, you can limit withdrawals by setting a fixed waiting period or a maximum withdrawal amount. This helps prevent unauthorized access or rapid fund depletion due to malicious actions.

The sample below shows how this pattern works by enforcing a five-day wait before a user can withdraw funds.

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

### 3. Use the Latest Version of the Solidity Compiler
‍
Always use the most recent version of the Solidity compiler. Newer versions often include important security fixes and improvements to the language. For example, Solidity version 0.8.x and above introduced built-in protections against arithmetic overflows and underflows, which were previously common vulnerabilities in smart contracts.

Staying up to date ensures that your code benefits from the latest security features and compiler checks.

### 4. Keep Smart Contract Simple
‍
Simplicity is a key principle when writing secure smart contracts. Complex logic often introduces unnecessary risk and hidden vulnerabilities. It is best to keep your contract code and structure as simple and clear as possible. When complexity is unavoidable, break down the logic into smaller functions, each with a specific purpose.

### 5. Test Your Smart Contract in a Simulated Environment
‍
Before deploying your smart contract to a live network, always run it in a simulated environment such as the Kairos Testnet. Testing in this controlled setting allows you to rigorously evaluate how your contract behaves under different conditions and edge cases.
This process helps uncover vulnerabilities, confirm expected behaviors, and improve overall reliability. It also reduces the risk of deploying flawed logic that could result in loss of funds or system failure.

‍Below are several recommended testing methods to validate your smart contract:

#### 5.1 Unit Testing
‍
Unit testing focuses on evaluating individual functions within a smart contract. To perform unit tests effectively, you need to structure your contract into small, single-purpose functions that can be tested in isolation.

A common approach is to use assertions — clear statements that describe the expected behavior of a function. You then verify whether those assertions hold true under different conditions. Unit testing should always be performed before integration testing, as it helps identify and fix issues early in the development process.

#### 5.2. Integration Testing
‍
Integration testing evaluates how various components of your contract work together. This includes checking interactions between functions, external contracts, and systems such as APIs.
This type of testing is essential for identifying issues related to cross-contract calls, dependencies, and inherited functionality. It ensures that individual parts function correctly when combined and that the contract behaves as expected in a broader system context.

#### 5.3. Fuzz Testing
‍
Fuzz testing involves passing random or extreme input values into your contract to observe its behavior. This technique helps uncover vulnerabilities that may not be evident during unit or integration testing.

Fuzzing is especially valuable when your contract includes mathematical operations or input validation logic. It allows you to stress test your code and identify unexpected behaviors under uncommon conditions.


### 6. Perform a Smart Contract Audit
‍
An audit is a structured review of your contract’s code by an independent team to identify vulnerabilities, bugs, or design flaws. This process adds an extra layer of confidence in the safety and reliability of your smart contract before deployment.

A typical audit includes:
- A thorough manual review of the code
- Automated scanning for known vulnerabilities
- Testing to validate the contract’s behavior
- A detailed report outlining identified issues and suggestions for improvement

Audits help reduce the risk of exploits and ensure your smart contract meets security standards before going live.

### 7. Include a Fail-Safe mechanism

For security purposes, especially when working with new contracts, it is important to include a reliable fail safe approach. This allows you to respond quickly if any issue arises. Below are a few strategies to consider:
- **Upgradeability**: Make sure your contract allows for future upgrades. This makes it possible to fix bugs and introduce new features without replacing the entire contract.
- **Decentralized Control**: Avoid concentrating control in one place. Use multi signature wallets so that important actions require confirmation from several parties.
- **Time Lock**: Add a delay before executing important actions. This gives the team or the wider community time to review transactions and respond if needed.

## Conclusion

Security should never be treated as an afterthought. It must be an essential part of every stage in the software development process, from development to production. Developers need to adopt a security-first mindset when working with smart contracts. 

Always prepare for possible failure, roll out changes with care, stay informed about updates in the ecosystem, understand EVM’s peculiarity, and keep your contracts as simple as possible. By following the best practices outlined above, you will significantly reduce risk and improve the reliability of your smart contracts.

