# Deploy Smart Contracts

There are various ways of deploying a smart contract on Kaia. This document provides a step-by-step guide to deploy a sample contract using various tools. We assume that you have a Kaia account with enough KAIA to pay the transaction fee. To create an account, you can use [Kaia Toolkit](https://toolkit.kaia.io/account/)."

## Remix Online IDE <a id="remix-ide"></a>

Open your internet browser and go to [Kaia Plugin for Remix](https://ide.kaia.io).

1. Add a new file.

![](/img/build/smart-contracts/01_deployment_ide.png)

2. Copy and paste the following sample code (or any code you want to deploy) in the new file. The code consists of two contracts called Mortal and KaiaGreeter, and it allows you to run a simple "Hello World!".

```
pragma solidity 0.5.12;

contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KaiaGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

3. Select Compiler in the icon panel. Choose the desired EVM environment. For the Kaia networks, you can choose between Kairos (testnet) and Mainnet. Click `Compile` when the sample code is ready to be complied before actual deployment.

![](/img/build/smart-contracts/02_deployment_compile.png)

4. Now we can deploy the contract. Click on the Kaia logo in the icon panel. Import an account by clicking the plus button next to `Account`. Make sure that the account has sufficient KAIA to pay for the transaction of deploying the smart contracts required.

![](/img/build/smart-contracts/05_deployment_account.png)

5. Set Gas limit and Value to send. 

  - You may need to set higher Gas limit if you are deploying a more complicated contract. In this example, you can leave it as it is.
  - Set `Value` to 0 unless you want to send `KAIA` to the contract at the time of deployment.

6. Enter "Hello World!" as an argument for constructor function and click on `Deploy` button.

![](/img/build/smart-contracts/03_deployment_hello.png)

7. If the contract is successfully deployed, you will see the corresponding transaction receipt and detailed result in the terminal. 

8. You can interact with the contract by clicking on the function buttons. The functions are represented in different colors. `constant` or `pure` functions in Solidity have blue bottons (`greet` in the example) and do not create a new transaction, so they don't cost any gas. Red buttons (`kill` in the example) represent `payable` functions that change the state on the blockchain, consume gas and can accept value. Orange buttons are for `non-payable` functions that change the contract state but do NOT accept a value.

![](/img/build/smart-contracts/06_deployment_functions.png)

For more details, please refer to this [link](../ide-and-tools/ide-and-tools.md).

## VVISP <a id="vvisp"></a>
vvisp is an easy-to-use CLI tool/framework for developing smart contracts, provided by HEACHI LABS. You can easily set environment, deploy and execute Kaia smart contracts with a single command. Refer to the following link for more details.

- https://henesis.gitbook.io/vvisp/deploying-smart-contracts