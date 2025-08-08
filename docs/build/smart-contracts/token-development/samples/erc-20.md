# ERC-20

## Overview <a id="overview"></a>

Creating a fungible token on Kaia follows similar steps to how you would on Ethereum and it uses the [ERC20 standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20).

To follow the standard, you will deploy a contract that implements the following events and functions:

```solidity
function name() public view returns (string) //optional
function symbol() public view returns (string) //optional
function decimals() public view returns (uint8) //optional
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

- **name**: A method that returns the name of the token.
- **symbol**: A method that returns the symbol of the token.
- **decimals**: A method that returns the number of decimals the token uses. It is used to define the smallest unit of the token. For example, if an ERC-20 token has a decimal value of 18, this means that the token can be divided up to eighteen decimal places.
- **totalSupply**: A method that defines the total supply of your tokens; when this limit is reached, the smart contract will refuse to create new tokens.
- **balanceOf**: A method that returns the number of tokens a wallet address has.
- **transfer**: A method that takes a certain amount of tokens from the total supply and gives it to a user.
- **transferFrom**: Another type of transfer method that is used to transfer tokens between users.
- **approve**: This method verifies whether a smart contract is allowed to allocate a certain amount of tokens to a user, considering the total supply.
- **allowance**: This method is exactly the same as the approved method except that it checks if one user has enough balance to send a certain amount of tokens to another.
- **Transfer event**: emitted when tokens are transferred  
- **Approval event**: emitted when there is token approval.

## Getting Started <a id="getting-started"></a>

In this section, you'll create and  deploy your ERC20 token contract using Remix Online IDE. There are several implementations of ERC20-compliant tokens developed by different teams with each developed with several factors in mind. For ease and security, we’ll use the [OpenZeppelin ERC-20](https://docs.openzeppelin.com/contracts/5.x/erc20) contract to create our token. With OpenZeppelin, we don’t need to write the whole ERC-20 interface. Instead, we can import the library contract and use it's functions.

### Step 1: Create  ERC20 token contract <a id="create-erc20-token-contract"></a>

**OpenZeppelin Contract Wizard**

- Open [OpenZeppelin Contract Wizard](https://wizard.openzeppelin.com)
- Select **ERC20**.
- Provide a **name** and a **symbol** for the token. For example: *Greek* and *GK* respectively.
- In the **Premint** field, set it to 10,000. This creates an initial amount of tokens for the deployer.
- In the **Features** section, check the Mintable box to allow privileged accounts (onlyOwner) be able to create more supply. 
- Click the **Copy** icon to copy the code for use on Remix in the next section.

![](/img/build/smart-contracts/oz-erc20-setup.png)

### Step 2: Deploy ERC20 token contract <a id="deploy-erc20-token-contract"></a>

**Remix IDE**

- In [Remix](https://remix.ethereum.org), Navigate to **File Explorer** and create a new file named `Greek.sol` in the contracts folder. 
- Navigate to the **Solidity Compiler** tab and click **Compile Greek.sol** to compile the token contract.
- Navigate to the **Deploy & run transactions** tab 
- Select **Environment** > **Injected Provider** > **MetaMask**.
- In the **Contract** dropdown, select your contract. For example, *Greek*.
- In the **Deploy** field, provide the constructor argument for recipient and initialOwner.  
- Click **Deploy/transact**

![](/img/build/smart-contracts/remix-erc20-deploy.png)

After deploying, you can invoke **balanceOf** with your account, which was used to deploy the contract. You will find there are 10000000000000000000000 tokens available in your account as below. 

Because you set the decimal as 18 when deploying the contract above, it minted a fixed number of 10000 tokens in the constructor, with one token having a decimal value of 10^18. TotalSupply method will return the total supply of tokens minted which should be also 10000000000000000000000.

![](/img/build/smart-contracts/remix-erc20-bal-totalsupply.png)

### Step 3: Interact with ERC-20 token from MetaMask <a id="interact-with-erc20-token-from-MetaMask"></a>

You can use MetaMask to check your balance and transfer the ERC-20-compatible Greek tokens you just deployed. To view your token balance on MetaMask, follow the steps below: 

**MetaMask** 

- Open up MetaMask
- Click on the **Ellipsis** icon at the far right, and then click **Import tokens**

![](/img/build/smart-contracts/mm-import-tokens-e20g.png)

- Make sure to select Kaia Kairos Network in the **select a network** field and also paste the recently deployed Greek contract address in the **Token contract address** field.

![](/img/build/smart-contracts/mm-custom-tokens-e20g.png)

- Click **import** as the final step

![](/img/build/smart-contracts/mm-custom-tokens-imported-e20g.png)

Once done, you should see a modal with this message: "*Token imported: You’ve successfully imported GK*" and the imported token (GK) as part of the list of tokens in your MetaMask wallet. 

