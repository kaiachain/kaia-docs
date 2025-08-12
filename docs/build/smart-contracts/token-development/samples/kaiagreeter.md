# KaiaGreeter

`KaiaGreeter` is a simple contract that returns a greeting message. Greeting message is set when the contract is deployed.

## Writing KaiaGreeter <a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract KaiaGreeter  {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    constructor (string memory _greeting) {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Deploying KaiaGreeter using Remix Online IDE <a href="#deploying-kaiagreeter-using-kaia-ide" id="deploying-kaiagreeter-using-kaia-ide"></a>

* Please visit [Kaia Plugin for Remix](https://ide.kaia.io) and create a `KaiaGreeter.sol` contract.
* Copy and paste the code above in your newly created file: `KaiaGreeter.sol`. 

    ![](/img/build/smart-contracts/kg-v2-create.png)

* Get some test KAIA from the [faucet](https://faucet.kaia.io) if you don’t already have test KAIA.
* Deploy the contract with initial parameter, a greeting message.
* After deploying, you can invoke `greet` from the IDE.

    ![](/img/build/smart-contracts/kg-v2-deployed.png)

## References <a href="#references" id="references"></a>

For the details of contract deployment and the Remix Online IDE usage guideline, please refer to the following documents.

* [Remix Online IDE](../../../smart-contracts/deployment-and-verification/deploy/deploy.md)