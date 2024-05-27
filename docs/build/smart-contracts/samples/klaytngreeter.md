# KaiaGreeter

`KaiaGreeter` is a simple contract that returns a greeting message. Greeting message is set when the contract is deployed.

## Writing KaiaGreeter <a href="#writing-klaytngreeter" id="writing-klaytngreeter"></a>

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

## Deploying KaiaGreeter using Remix Online IDE <a href="#deploying-klaytngreeter-using-klaytn-ide" id="deploying-klaytngreeter-using-klaytn-ide"></a>

* Please visit [Kaia Plugin for Remix](https://ide.klaytn.foundation) and create a `KaiaGreeter` contract. The complete source code was given in the above.
* Prepare your account which will be used to deploy the contract.
  * If you do not have an account yet, create one at [https://baobab.wallet.klaytn.foundation/create](https://baobab.wallet.klaytn.foundation/create) or [https://toolkit.klaytn.foundation/account/accountKeyLegacy](https://toolkit.klaytn.foundation/account/accountKeyLegacy).
  * Get some test KLAY from the faucet - [https://baobab.wallet.klaytn.foundation/faucet](https://baobab.wallet.klaytn.foundation/faucet)
* Deploy the contract with initial parameter, a greeting message.
* After deploying, you can invoke `greet` from the IDE.

## References <a href="#references" id="references"></a>

For the details of contract deployment and the Remix Online IDE usage guideline, please refer to the following documents.

* [Remix Online IDE](../../smart-contracts/ide-and-tools/ide-and-tools.md#klaytn-ide)
* [Deploy Guide](../deploy/deploy.md)