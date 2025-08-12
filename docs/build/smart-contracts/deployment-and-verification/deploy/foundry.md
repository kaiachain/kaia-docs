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
* [MetaMask](../../../tutorials/connecting-metamask.mdx#install-metamask): used to deploy the contracts, sign transactions and interact with the contracts.
* RPC Endpoint: you can get this from one of the supported [endpoint providers](../../../../references/public-en.md).
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
```

After initializing a foundry project, your current directory should include:

* **src**: the default directory for your smart contracts.
* **tests**: the default directory for tests.
* **foundry.toml**: the default project configuration file.
* **lib**:  the default directory for project dependencies.
* **script**: the default directory for solidity scripting files.

## Configuring foundry.toml

Now that we have our project set up, we have to create a `.env` file and add variables. Foundry automatically loads in a .env file present in your project directory.

The .env file should follow this format:

```bash
KAIROS_RPC_URL=PASTE_RPC_URL
```

Next is to edit the `foundry.toml` file. You should already have one in the root of the project after scaffold.

Add the following lines to the end of the file:

```bash
[rpc_endpoints]
kairos = "${KAIROS_RPC_URL}"
```
This creates a [RPC alias](https://book.getfoundry.sh/cheatcodes/rpc.html) for Kaia Kairos Testnet. 

## Importing Account

For this guide we will import an already existing dev account on MetaMask so it can be accessed through the `--account` option in methods like `forge script`, `cast send` or any other that requires a private key. 

Run the command below to import an exisitng wallet:

```bash
cast wallet import --interactive oxpampam-dev-i
```

```bash
Enter private key:
Enter password:
```

![](/img/build/get-started/cast-wallet-import.png)

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

To deploy a contract using foundry, you must provide an RPC URL and a private key of the account that will deploy the contract. Take a look at the list of [rpc-providers](../../../../references/public-en.md) on Kaia to find your rpc-url, and create an account using [MetaMask](../../../tutorials/connecting-metamask.mdx#install-metamask).

In this guide, we will use the two methods of contract deployment provided by foundry: 

### Using Forge Create

**Step 1**: To deploy your contract to the Kaia Kairos network using forge create, run the command below:

```bash
# To load the variables in the .env file
source .env

# To deploy our contract
forge create --rpc-url $KAIROS_RPC_URL src/Counter.sol:Counter --broadcast --account oxpampam-dev-i 
```

```bash
Enter keystore password: <KEYSTORE_PASSWORD>
```

:::note
For any deployment beyond basic testnet usage in a development environment, it is highly recommended to use a [hardware wallet or a password-protected keystore](https://book.getfoundry.sh/guides/best-practices.html#private-key-management) for enhanced security.
:::

![](/img/build/get-started/forge-create-deploy.png)

**Step 2**: Open Kaiascan to check if the counter contract deployed successfully.

**Step 3**: Copy and paste the transaction hash in the search field and press Enter. You should see the recently deployed contract.

![](/img/build/get-started/kaiascan-deploy.png)

### Using Forge Script

To deploy your contract to the Kaia Kairos network using forge script, run the command below:

```bash
# To load the variables in the .env file
source .env

# To deploy our contract
forge script --chain 1001 script/Counter.s.sol:CounterScript --rpc-url $KAIROS_RPC_URL --broadcast -vvvv --account oxpampam-dev-i
```

![](/img/build/get-started/forge-script-deploy.png)

## Interacting with the contract 

After successfully deploying your smart contract, the next step is typically to interact with it by calling and executing its functions. Let's get straight into interacting with the deployed contracts on Kaia Kairos Network using [Cast](https://book.getfoundry.sh/reference/cast/cast-send.html).  

In this section, you will learn how to use the [cast call](https://book.getfoundry.sh/reference/cast/cast-call) to execute the `read-only` function and [cast send](https://book.getfoundry.sh/reference/cast/cast-send) to execute `write` functions.

**A. cast call**

To get the number stored in the contract, you will be calling the `number` function. Run the command below to see this in action.

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url $KAIROS_RPC_URL
```
**Example**

```bash
cast call 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "number()" --rpc-url $KAIROS_RPC_URL
```

**Output**

![](/img/build/get-started/cast-call-number.png)

You should get this data in hexadecimal format:

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```
However to get your desired result, use `cast` to convert the above result. In this case, the data is a number, so you can convert it into base 10 to get the result 0:

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```
**Output**

![](/img/build/get-started/cast-call-0.png)

**B. cast send**

To sign and publish a transaction such as executing a `setNumber` function in the counter contract, run the command below:

```bash
cast send --rpc-url=$KAIROS_RPC_URL <CONTRACT-ADDRESS> "setNumber(uint256)" arg --account <ACCOUNT NAME>
```

**Example**

```bash
cast send --rpc-url=$KAIROS_RPC_URL 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "setNumber(uint256)"  10 --account oxpampam-dev-i
```

**Output**

![](/img/build/get-started/cast-send-setNum.png)

**Crosscheck Number**

```bash
cast call 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "number()" --rpc-url $KAIROS_RPC_URL
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

You can convert the result from the task above using [hex to decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html). You should get the latest block number from the time you forked the network. To verify this, cross-reference the block number on [KaiaScan](https://kaiascan.io/block/118704896?tabId=txList).

### Illustration
In this section, you will learn how to transfer USDT tokens from someone who holds USDT to an account created by Anvil (0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)

**Transferring USDT**

Go to Kaiascan and search for holders of USDT tokens ([here](https://kaiascan.io/token/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=tokenHolder&page=1)). Let's pick a random account. In this example, we will use `0xb3ff853a137bfe10f3d8965a29013455e1619303`. 

Let's export our contracts and accounts as environment variables:

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export USDT=0xd077a400968890eacc75cdc901f0356c943e4fdb
export USDTHolder=0xb3ff853a137bfe10f3d8965a29013455e1619303
```

Check Bob’s USDT balance using cast call:

```bash
cast call $USDT "balanceOf(address)(uint256)" $BOB
```

**Output**

![](/img/build/get-started/call-usdt-bob.png)

Similarly, we can also check USDTHolder's USDT balance using cast call:

```bash
cast call $USDT "balanceOf(address)(uint256)" $USDTHolder
```

**Output** 

![](/img/build/get-started/call-usdt-holder.png)

Let's transfer some tokens from the USDTHolder to Bob using cast send:

```bash
# impersonate USDTHolder
cast rpc anvil_impersonateAccount $USDTHolder    

# transfer USDT
cast send $USDT --unlocked --from $USDTHolder "transfer(address,uint256)(bool)" $BOB 1000000
```

**Output**

![](/img/build/get-started/cast-send-usdt.png)

Let's check that the transfer worked:

```bash
cast call $USDT "balanceOf(address)(uint256)" $BOB
```

**Output**

![](/img/build/get-started/call-usdt-bob-after.png)

```bash
cast call $USDT "balanceOf(address)(uint256)" $USDTHolder
```

**Output**

![](/img/build/get-started/call-usdtholder-after.png)

## Troubleshooting 

### Gas Estimation Error

You might run into this error when deploying with forge script:

```bash
# Transaction Failure
❌  [Failed] Hash: 0xa0de3dac1dae4d86f2ba8344bc5f7d816714a6abdc4555ae46ca21d126f78caf
Error: Transaction Failure: 0xa0de3dac1dae4d86f2ba8344bc5f7d816714a6abdc4555ae46ca21d126f78caf

# Transaction Error Codes on Explorer
Error: Contract creation code storage out of gas
```

![](/img/build/get-started/gas-estimation-err.png)

This usually happens because of inaccurate gas estimation during deployment. Foundry's default gas estimation algorithm (with its default 130% multiplier) sometimes falls short on Kaia network, causing deployments to run out of gas before completion.  

When the actual gas needed exceeds the estimated amount, the transaction runs out of gas during contract deployment, resulting in the *Contract creation code storage out of gas* error.

**Quick Fix: Manually Set the Gas Multiplier**

Run your script with an increased --gas-estimate-multiplier 200 or higher like so:

```bash
# command
forge script script/YourContract.s.sol:YourScript \
  --chain <chain-id> \
  --rpc-url $RPC_URL \
  --broadcast \
  --gas-estimate-multiplier 200 \
  --account your-account \
  -vvvv
```

```bash
# example 

forge script --chain 1001 script/NFT.s.sol:NFTScript --rpc-url $KAIROS_RPC_URL --broadcast --gas-estimate-multiplier 200 -vvvv --account oxpampam-dev-i
```

:::note
The `--gas-estimate-multiplier` flag sets the relative percentage by which to multiply all gas estimates. By setting it to 200, you're doubling the gas estimates, which gives your contract deployment enough headroom to complete successfully.
:::

![](/img/build/get-started/gas-estimation-fixed.png) 

## Conclusion

Congratulations if you made it to the end of this guide. If you have any questions, visit the [Kaia Forum](https://devforum.kaia.io/). However, below is a list of useful resources you might need while further building with Foundry on Kaia.

* [Foundry Docs](https://book.getfoundry.sh/)
* [Cyfrin Foundry Fundamentals](https://updraft.cyfrin.io/courses/foundry)
* [Cyfrin Advanced Foundry](https://updraft.cyfrin.io/courses/advanced-foundry)

