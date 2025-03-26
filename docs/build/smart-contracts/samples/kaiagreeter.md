# KaiaGreeter

`KaiaGreeter` is a simple contract that returns a greeting message. Greeting message is set when the contract is deployed.

## Writing KaiaGreeter <a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
}

contract KaiaGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Deploying KaiaGreeter using Remix Online IDE <a href="#deploying-kaiagreeter-using-kaia-ide" id="deploying-kaiagreeter-using-kaia-ide"></a>

* Please visit [Kaia Plugin for Remix](https://ide.kaia.io) and create a `KaiaGreeter` contract. The complete source code was given in the above.
* Prepare your account which will be used to deploy the contract.
  * If you do not have an account yet, create one using [Kaia Toolkit](https://toolkit.kaia.io/account/).
  * Get some test KAIA from the faucet - [Faucet](https://faucet.kaia.io)
* Deploy the contract with initial parameter, a greeting message.
* After deploying, you can invoke `greet` from the IDE.

## References <a href="#references" id="references"></a>

For the details of contract deployment and the Remix Online IDE usage guideline, please refer to the following documents.

* [Remix Online IDE](../../smart-contracts/ide-and-tools/ide-and-tools.md#kaia-ide)
* [Deploy Guide](../deploy/deploy.md)