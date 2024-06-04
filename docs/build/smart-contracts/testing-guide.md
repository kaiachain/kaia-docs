# Test Smart Contracts

In this section, we'll introduce how to test smart contracts. Because any transaction on the blockchain is not reversible, testing your smart contract is crucial before you deploy the contract.

## Testing with Truffle <a href="#testing-with-truffle" id="testing-with-truffle"></a>

Truffle provides an automated testing framework. This framework lets you write simple and manageable tests in two different ways:

* In `Javascript` and `TypeScript`, for exercising your contracts from the outside world, just like application.
* In `Solidity`, for exercising your contracts in advances, bare-to-the-metal scenarios.

### 1) Getting started <a href="#1-getting-started" id="1-getting-started"></a>

We will follow the [Deployment Guide using Truffle](./deploy/deploy.md#truffle) to create a contract and deploy it. But, before we deploy it, we will add a setter function `setGreet` to the contract for testing purpose. The source code is given below.

**NOTE:** We have made some modifications to the contract for testing.

Below is KaiaGreeting contract source code.

```
pragma solidity 0.5.6;

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

    /* Newly added function for testing. */
    function setGreet(string memory _greeting) public {
        // only owner can change greeting message
        require(msg.sender == owner, "Only owner is allowed.");
        greeting = _greeting;
    }
}
```

We will test 1) `greet()` function whether it returns "Hello, Kaia" message properly, 2) `setGreet()` function whether it set new greeting message properly and reverts when non-owner account attempts to update the greeting.

First, we will install the Chai assertions library (or any different assertions library you use) for generic assertions, and the truffle-assertions library for the smart contract assertions.

```
npm install --save-dev chai truffle-assertions
```

### 2) Writing test in Solidity <a href="#2-writing-test-in-solidity" id="2-writing-test-in-solidity"></a>

Testing with Solidity can be a little bit more intuitive than JavaScript tests. Solidity test contracts live alongside JavaScript tests as .sol files.

Create a file called `TestKaiaGreeting.sol` in the `test` folder. The Truffle suite provides us with helper libraries for testing, so we need to import those. Let's take a look at the example Solidity test:

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashMarket.sol";
```

* Assert : It gives us access to various testing functions, like `Assert.equals()`, `Assert.greaterThan()`, etc.
* DeployedAddresses : Every time you change your contract, you must redeploy it to a new address. You can get the deployed contract addresses through this library.

Now, Let's write a test code.

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/KaiaGreeter.sol";

contract TestKaiaGreeter {

    function testGreetingMessage() public {
        // DeployedAddresses.KaiaGreeter() handles contract address.
        KaiaGreeter greeter = KaiaGreeter(DeployedAddresses.KaiaGreeter());

        string memory expectedGreet = "Hello Kaia";

        string memory greet = greeter.greet();

        Assert.equal(greet, expectedGreet, "greeting message should match");
    }
}
```

Run your Solidity test code.

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKaiaGreeter.sol



  TestKaiaGreeter
    1) testGreetingMessage

    Events emitted during test:
    ---------------------------


    ---------------------------


  0 passing (5s)
  1 failing

  1) TestKaiaGreeter
       testGreetingMessage:
     Error: greeting message should match (Tested: Hello, Kaia, Against: Hello Kaia)
      at result.logs.forEach.log (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:71:1)
      at Array.forEach (<anonymous>)
      at processResult (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:69:1)
      at process._tickCallback (internal/process/next_tick.js:68:7)
```

Oops, we failed. Let's check the error message,`Error: greeting message should match (Tested: Hello, Kaia, Against: Hello Kaia)`. I can notice the missed `',(comma)'` at _string memory expectedGreet = "Hello Kaia"_.\
Fix the code and run the test again.

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKaiaGreeter.sol



  TestKaiaGreeter
    ✓ testGreetingMessage (58ms)


  1 passing (5s)
```

Congratulations! Your test has passed.

### 3) Writing test in JavaScript <a href="#3-writing-test-in-javascript" id="3-writing-test-in-javascript"></a>

Truffle uses the [Mocha](https://mochajs.org/) testing framework and [Chai](https://www.chaijs.com/) assertion library to provide a solid framework for JavaScript test. JavaScript test gives you more flexibility and enables you to write more complex tests.

Let's create a file and name it `0_KaiaGreeting.js` under `test` directory.\

The test code is:

```javascript
// Interacting directly with KaiaGreeter contract
const KaiaGreeter = artifacts.require("./KaiaGreeter.sol");
const truffleAssert = require('truffle-assertions');

contract("KaiaGreeter", async(accounts) => {
    // store the contract instance at a higher level 
    // to enable access from all functions.
    var klaytnGreeterInstance;
    var owner = accounts[0];
    var greetMsg = "Hello, Kaia";

    // This will run before each test proceed.
    before(async function() {
        // set contract instance into a variable
        klaytnGreeterInstance = await KaiaGreeter.new(greetMsg, {from:owner});
    })

    it("#1 check Greeting message", async function() {
        // set the expected greeting message
        var expectedGreeting = greetMsg;
        var greet= await klaytnGreeterInstance.greet();
        assert.equal(expectedGreeting, greet, "greeting message should match");
        
    })

    it("#2 update greeting message.", async function() {
        var newGreeting = "Hi, Kaia";
        
        await klaytnGreeterInstance.setGreet(newGreeting, { from:owner });
        var greet = await klaytnGreeterInstance.greet();
        assert.equal(newGreeting, greet, "greeting message should match");
    });

    it("#3 [Failure test] Only owner can change greeting.", async function() {
        var fakeOwner = accounts[1];        
        await truffleAssert.fails(klaytnGreeterInstance.setGreet(greetMsg, { from:fakeOwner }));
    });
});
```

If you are unfamiliar with `Mocha` unit test, please check the [Mocha document](https://mochajs.org/#getting-started).

* Use `contract()` instead of `describe()`

  Structurally, the Truffle test code shouldn't be much different from the usual test code of Mocha. Your test should contain the code that Mocha will recognize it as an automated test. The difference between Mocha and Truffle test is the contract() function.

  **NOTE** the use of the `contract()` function, and the `accounts` array for specifying available Kaia accounts.
* Contract abstractions within your tests

  Since Truffle has no way of detecting which contract you'll need to interact with during test, you should specify the contract explicitly. One way to do this is by using the `artifacts.require()` method.
* `it` syntax

  This represents each test case with description. The description will print on the console on test-run.
* `truffle-assertion` library

  This library allows you to easily test reverts or other failures by offering the `truffleAssert.reverts()` and `truffleAssert.fails()` functions.

The output should like the following:

```
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: KaiaGreeter
    ✓ #1 check Greeting message
    ✓ #2 update greeting message. (46ms)
    ✓ #3 [Failure test] Only owner can change greeting.


  3 passing (158ms)
```

Congratulations! Your test has passed.

### 4) Specifying test <a href="#4-specifying-test" id="4-specifying-test"></a>

You can choose the test file to be executed.

```
truffle test ./test/0_KaiaGreeting.js
```

For more details, please check [Truffle testing](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts) and [Truffle commands](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test) for details.
