# Deploy smart contract using Foundry

![](/img/banners/kaia-foundry.png)

## Introduction

Foundry is a smart contract development framework written in Rust that enables developers to manage and compile contracts, run tests, deploy contracts, and interact with the network from the command line via solidity scripts.

Foundry consists of four main CLI tools that allow for fast and modular smart contract development, namely:

* [Forge](https://github.com/foundry-rs/foundry/tree/master/forge):  You can deploy, test, and compile smart contracts using Forge.
* [Cast](https://github.com/foundry-rs/foundry/tree/master/cast): Cast has made it simple to interact with EVM smart contracts. This includes obtaining chain data, sending transactions, and other things.
* [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil): Do you need to spin up a local node? Anvil is a local node environment offered by Foundry.
* [Chisel](https://github.com/foundry-rs/foundry/blob/master/chisel): Fast, useful, and verbose solidity REPL.

In this guide, you will:

* Create a simple foundry project.
* Compile and test a sample smart contract using Foundry.
* Deploy smart contracts using Foundry to the Kaia Kairos Network.
* Explore forking mainnet with cast and anvil.

## Pre-requisites

To follow this tutorial, the following are the prerequisites:

* Code editor: a source-code editor such [VS Code](https://code.visualstudio.com/download).
* [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask): used to deploy the contracts, sign transactions and interact with the contracts.
* RPC Endpoint: you can get this from one of the supported [endpoint providers](../../../references/public-en.md).
* Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.
* Install [Rust](https://www.rust-lang.org/tools/install) and [Foundry](https://github.com/foundry-rs/foundry#installation).

## Setting Up Your Development Environment 

To check if your foundry installation was successful, run the command below:

```bash
forge -V
```
**Output**

![](/img/build/get-started/forge-version.png)

After successfully installing foundry, you now have access to the CLI tools (forge, cast, anvil, chisel) available in foundry. Let's set up a foundry project in the following steps:

**Step 1**: To start a new project, run the command below:

```bash
forge init foundry_example 
```

**Step 2**: Navigate into your project folder.

```bash 
cd foundry_example
ls	 
```

After initializing a foundry project, your current directory should include:

* **src**: the default directory for your smart contracts.
* **tests**: the default directory for tests.
* **foundry.toml**: the default project configuration file.
* **lib**:  the default directory for project dependencies.
* **script**: the default directory for solidity scripting files.

## Sample smart contract

In this section, we will be using the sample counter contract in the initialized foundry project. The `counter.sol` file in the `src/` folder should look like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Counter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
```

**Code Walkthrough**

This is your smart contract. **Line 1** shows it uses the Solidity version 0.8.13 or greater. From **lines 4-12**, a smart contract `Counter` is created. This contract simply stores a new number using the **setNumber** function and increments it by calling the **increment** function. 

## Testing smart contract 

Foundry allows us to write tests in solidity as opposed to writing tests in javascript in other smart contract development frameworks. In our initialized foundry project, the `test/Counter.t.sol` is an example of a test written in solidity. The code looks like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Counter.sol";
contract CounterTest is Test {
    Counter public counter;
    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

The code above shows you imported forge standard library and Counter.sol.

The tests above check the following:

* Is the number increasing?
* Is the number equal to the set number?

To check if your test works fine, run the following command:

```bash
forge test
```

**Output** 

![](/img/build/get-started/forge-test.png)

To learn more about writing tests, advanced testing, and other features, refer to [Foundry's documentation](https://book.getfoundry.sh/forge/tests).

## Compiling your contracts

Compile your contract with this command:

```bash
forge build 
```

## Deploying your contracts

To deploy a contract using foundry, you must provide an RPC URL and a private key of the account that will deploy the contract. Take a look at the list of [rpc-providers](../../../references/public-en.md) on Kaia to find your rpc-url, and create an account using [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask).

**Step 1**: To deploy your contract to the Kaia Kairos network, run the command below: 

```bash
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/Counter.sol:Counter
```

**Example**

```bash
forge create --rpc-url https://public-en-kairos.node.kaia.io --private-key hhdhdhdhprivatekeyhdhdhdhud src/Counter.sol:Counter
```

**WARNING: Replace the private key argument with your private key from MetaMask. Be very careful not to expose your private key.**

**Output**

![](/img/build/get-started/foundry-create.png)

**Step 2**: Open [Kaiascope](https://kairos.kaiascope.com/tx/0x83c8b55f3fd90110f9b83cd20df2b2bed76cfeb42447725af2d60b2885f479d3?tabId=internalTx) to check if the counter contract deployed successfully.

**Step 3**: Copy and paste the transaction hash in the search field and press Enter. You should see the recently deployed contract.

![](/img/build/get-started/forge-scope.png)

## Interacting with the contract 

After successfully deploying your smart contract, you will want to call and execute functions right. Let's get to interact with the deployed contracts on Kaia Kairos Network using [Cast](https://book.getfoundry.sh/reference/cast/cast-send.html).  In this section, you will learn how to use the [cast call](https://book.getfoundry.sh/reference/cast/cast-call) to execute the `read-only` function and [cast send](https://book.getfoundry.sh/reference/cast/cast-send) to execute `write` functions.

**A. cast call**: To get the number stored in the contract, you will be calling the `number` function. Run the command below to see this in action.

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url RPC-API-ENDPOINT-HERE
```
**Example**

```bash
cast call 0x7E80F70EeA1aF481b80e2F128490cC9F7322e164 "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**Output**

![](/img/build/get-started/cast-call-number.png)

You should get this data in hexadecimal format:

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```
However to get your desired result, use cast to convert the above result. In this case, the data is a number, so you can convert it into base 10 to get the result 0:

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```
**Output**

![](/img/build/get-started/cast-call-0.png)

**B. cast send**: To sign and publish a transaction such as executing a `setNumber` function in the counter contract, run the command below:

```bash
cast send --rpc-url=<RPC-URL> <CONTRACT-ADDRESS> “setNumber(uint256)” arg --private-key=<PRIVATE-KEY>
```

**Example**

```bash
cast send --rpc-url=https://public-en-kairos.node.kaia.io 0x7E80F70EeA1aF481b80e2F128490cC9F7322e164 "setNumber(uint256)"  10 --private-key=<private key>
```

**Output**

![](/img/build/get-started/cast-send-setNum.png)

**Crosscheck Number**

```bash
cast call 0x7E80F70EeA1aF481b80e2F128490cC9F7322e164 "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**Output**

![](/img/build/get-started/cast-call-10.png)

You should get this data in hexadecimal format:

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```

However to get your desired result, use cast to convert the above result. In this case, the data is a number, so you can convert it into base 10 to get the result 10:

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```

**Output**

![](/img/build/get-started/cast-call-result-10.png)

## Forking Mainnet with Cast and Anvil

Foundry allows us to fork the mainnet to a local development network ([Anvil](https://book.getfoundry.sh/reference/anvil/)). Also, you can interact and test with contracts on a real network using [Cast](https://book.getfoundry.sh/reference/cast/).

### Getting Started

Now that you have your Foundry project up and running, you can fork the mainnet by running the command below:

```bash
anvil --fork-url rpc-url
```

**Example**

```bash
anvil --fork-url https://archive-en.node.kaia.io
```

**Output** 

![](/img/build/get-started/anvil-localnode.png)

After successfully running this command, your terminal looks like the above image. You'll have 10 accounts created with their public and private keys as well 10,000 prefunded tokens. The forked chain's RPC server is listening at `127.0.0.1:8545`.

To verify you have forked the network, you can query the latest block number:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

You can convert the result from the task above using [hex to decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html). You should get the latest block number from the time you forked the network. To verify this, cross-reference the block number on [Kaiascope](https://kaiascope.com/block/118704896?tabId=txList).

### Illustration
In this section, you will learn how to transfer oUSDC tokens from someone who holds oUSDC to an account created by Anvil (0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)

**Transferring oUSDC**

Go to Kaiascope and search for holders of oUSDC tokens (here). Let's pick a random account. In this example, we will be using `0x8e61241e0525bd45cfc43dd7ba0229b422545bca`. 

Let's export our contracts and accounts as environment variables:

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export oUSDC=0x754288077d0ff82af7a5317c7cb8c444d421d103
export oUSDCHolder=0x8e61241e0525bd45cfc43dd7ba0229b422545bca
```

We can check Bob’s balance using cast call:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**Output**

![](/img/build/get-started/oUsdcBob4.png)

Similarly, we can also check our oUSDC holder’s balance using cast call:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**Output** 

![](/img/build/get-started/oUsdcHolder4.png)

Let's transfer some tokens from the lucky user to Alice using cast send:

```bash
cast rpc anvil_impersonateAccount $oUSDCHolder    
cast send $oUSDC \
--unlocked \
--from $oUSDCHolder\
 "transfer(address,uint256)(bool)" \
 $BOB \
 1000000
```0000
```

**Output**

![](/img/build/get-started/cast-send.png)

Let's check that the transfer worked:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**Output**

![](/img/build/get-started/oUsdcBobAfter.png)

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**Output**

![](/img/build/get-started/oUsdcHolderAfter.png)

For more in-depth guide on foundry, please refer to [Foundry Docs](https://book.getfoundry.sh/). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/foundry).