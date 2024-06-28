# Deploy smart contract using KEN

![](/img/banners/kaia-ken.png)

Before you start, let's get familiar with several Kaia-specific terms.

* **Endpoint Node \(EN\)**: A node that handles the JSON-RPC API requests to the Kaia network. Endpoint Node does not participate in the consensus.  
* **KAIA**: Kaia native coin. 
* **caver-js**: A JavaScript implementation of Kaia JSON-RPC APIs.
* **Kairos**: Kaia testnet

This step by step guide will walk you through the process of launching an Endpoint Node \(EN\) of Kairos testnet and building a basic smart contract with your new account. The tutorial consists of two parts, setting up an EN and deploying a smart contract through your EN.

> This guide uses the **Kairos** testnet because deploying a smart contract and submitting a transaction require transaction fees in KAIA. For the development purpose, testnet KAIA can be obtained from the [Kairos faucet](https://baobab.wallet.klaytn.foundation/faucet).

## Launch an Endpoint Node <a href="#launch-an-en" id="launch-an-en"></a>

### Download and Initialize an Endpoint Node (EN) <a href="#download-and-initialize-an-endpoint-node-en" id="download-and-initialize-an-endpoint-node-en"></a>

Unzip the provided [ken binary package](../../../nodes/downloads/downloads.md#get-the-packages) and copy the files into the klaytn folder.

**Note**: Please download appropriate package starting with `ken`.

For Mac users, unzip the downloaded file with the following command.

```bash
$ tar zxf ken-baobab-vX.X.X-X-darwin-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-darwin-amd64/bin
```

For Linux users, unzip the downloaded file with the following command.

```bash
$ tar zxf ken-baobab-vX.X.X-X-linux-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-linux-amd64/bin
```

You should create a data directory to store the blockchain data. In this tutorial, we will create a `kend_home` folder in the home directory.

```bash
$ mkdir -p ~/kend_home
```

### Configuring the EN <a href="#configuring-the-en" id="configuring-the-en"></a>

The configuration file, `kend.conf`, is located under `ken-xxxxx-amd64/conf/`. For the details of configurable parameters, you can refer to the [EN Configuration Guide](../../../misc/operation/configuration.md). To launch an EN of Kairos testnet, please update the `kend.conf` file accordingly as follows.

```
# mainnet, kairos is only available if you don't specify NETWORK_ID.
NETWORK="kairos"
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
...
RPC_API="klay,net" # net module should be opened for truffle later on.
...
DATA_DIR=~/kend_home
```

### Launching the EN <a href="#launching-the-en" id="launching-the-en"></a>

To launch the EN, execute the following command.

```bash
$ kend start
 Starting kend: OK
```

### Checking the EN <a href="#checking-the-en" id="checking-the-en"></a>

To check if the EN is running, execute the following command.

```bash
$ kend status
kend is running
```

### Checking the log of the EN <a href="#checking-the-log-of-the-en" id="checking-the-log-of-the-en"></a>

To check the log of the EN, execute the following command.

```bash
$ tail -f ~/kend_home/logs/kend.out
...
INFO[03/26,15:37:49 +09] [5] Imported new chain segment                blocks=1    txs=0  mgas=0.000  elapsed=2.135ms   mgasps=0.000    number=71340 hash=f15511…c571da cache=155.56kB
...
```

### Troubleshooting <a href="#troubleshooting" id="troubleshooting"></a>

Please refer to the [Troubleshooting](../../../misc/operation/troubleshooting.md) if you have trouble in launching the Kaia Endpoint Node.

## Top up your Account <a id="top-up-your-account"></a>

### Attaching to the Console <a id="attaching-to-the-console"></a>

Kaia Endpoint Node comes with JavaScript console. From the console command line, you can initiate part of Kaia API calls to your EN. To attach to the JavaScript console, execute the following command.

```bash
$ ken attach ~/kend_home/kaia.ipc
Welcome to the Kaia JavaScript console

!instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 
 >
```

**NOTE**: You must wait until it downloads all the blocks. Enter `kaia.blockNumber` in a console and check whether it matches the current block number [here](https://baobab.klaytnscope.com/) 

**NOTE**: Type `kaia` or `personal` to get the list of available functions.

### Creating a New Kaia Account <a id="creating-a-new-kaia-account"></a>

To create a new Kaia account from the JavaScript console, execute the following command. Your private key will be encrypted with the passphrase you enter.

```javascript
> personal.newAccount()
Passphrase:  # enter your passphrase
Repeat passphrase:
"0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd" # created account address
```

Keystore file will be created under `keystore` folder in the EN data directory, `DATA_DIR` set in the `kend.conf`. If you follows the quick start default guideline, it must be `~/kend_home/keystore/`.

```javascript
$ ls ~/kend_home/keystore/
UTC--2019-06-24T11-20-15.590879000Z--75a59b94889a05c03c66c3c84e9d2f8308ca4abd
```

### Unlocking the Kaia Account <a id="unlocking-the-kaia-account"></a>

To unlock the created account, execute the following command. It unlocks the account for 300 seconds.

**Note**: If you want to manually set the unlock duration, refer to this [link](../../../../references/json-rpc/personal/unlock-account).

**`WARNING`**: Unlocking an account could be very dangerous if not done carefully. There are chances that your tokens will be taken away by hackers if your EN is hacked by a hacker. To use safer method, refer to this [deployment guide using private key](../../tutorials/count-dapp/deploy-contracts.md#deploy-method-1-by-private-key)

```javascript
> personal.unlockAccount('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # account address to unlock
Unlock account 75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase: # enter your passphrase
true
```

### Getting testnet KAIA from the Kairos Faucet <a id="getting-testnet-kaia-from-the-kairos-faucet"></a>

* Using the Kairos faucet in KaiaWallet.
* Access [https://baobab.wallet.klaytn.foundation](https://baobab.wallet.klaytn.foundation/).
* You can either create a new account from the Wallet or use the keystore file you created from the EN JavaScript console above to log into the Wallet.
* Go to "KAIA Faucet" from the left pane menu, and click the "Run Faucet" button to get 150 KAIA.

  You can run the KAIA Faucet once every 24 hours.

* If you created a new account to get KAIA, then send the KAIA to your created account on the EN.

### Checking the Balance in Your Account <a id="checking-the-balance-in-your-account"></a>

To see the balance of your account, execute the following command.

The default unit is kei \(1 KAIA = 10^18 kei\). More information about KAIA units can be found at [Units of KAIA](../../../learn/kaia-native-token.md#units-of-klay).

```javascript
> kaia.getBalance('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # enter your account address
1e+21  # 1000 KAIA
```

### Exiting the Console <a id="exiting-the-console"></a>

To leave the javascript console, execute the following command.

```javascript
> exit
$
```

## Install Development Tools <a id="install-development-tools"></a>

### Installing caver-js <a id="installing-caver-js"></a>

We recommend to create a klaytn project directory such that:

```bash
$ mkdir $HOME/klaytn
```

> You need `npm` and `node.js` installed to proceed. Please refer to [get-npm](https://www.npmjs.com/get-npm) and [node.js](https://nodejs.org/en/) for installation on your system.

​[caver-js](../../../references/sdk/caver-js/caver-js.md) is a JSON RPC framework for the Kaia network \(equivalent to web3.js in Ethereum\). Before installing caver-js, you must generate `package.json` file via `npm init` command, and then type `npm install caver-js` to install caver-js.

```bash
$ npm init # initialize npm at the klaytn project directory
$ npm install caver-js
```

**NOTE**: If you already installed caver-js, please update it to the latest version.

```bash
$ npm cache clean --force # initialize npm cache
$ npm install caver-js@latest # update caver-js to the latest version
```

If you receive the following errors while updating the caver-js, remove `.git` folder in the `websocket` directory.

```bash
npm ERR! path /Users/username/klaytn/node_modules/websocket
npm ERR! code EISGIT
npm ERR! git /Users/username/klaytn/node_modules/websocket: Appears to be a git repo or submodule.
npm ERR! git     /Users/username/klaytn/node_modules/websocket
npm ERR! git Refusing to remove it. Update manually,
npm ERR! git or move it out of the way first.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/username/.npm/_logs/2019-06-25T01_49_37_032Z-debug.log​

$ rm /Users/username/klaytn/node_modules/websocket/.git
```

**Note:** For all the function calls that begin with `web3.eth...` in web3.js, should be replaced with `caver.kaia...`.

`web3.eth.sendTransaction({ ... })` \(X\) 

`caver.kaia.sendTransaction({ ... })` \(O\)

### Installing Truffle <a id="installing-truffle"></a>

In this tutorial, Truffle is used to compile and deploy smart contracts written in Solidity. Currently, Kaia supports Truffle version 4.1.15. For further information about Truffle, refer to the following sites:

* Truffle repository - [https://github.com/trufflesuite/truffle](https://github.com/trufflesuite/truffle)​
* Truffle documents - [https://trufflesuite.com/docs](https://trufflesuite.com/docs)​

We can install Truffle either globally or locally:

* Globally using npm by executing the following commands:

```bash
$ sudo npm install -g truffle@4.1.15
$ cd /usr/local/lib/node_modules/truffle
$ sudo npm install solc@0.5.6
$ cd -
```

or

* Locally, i.e., in your local directory, by executing the followings:

```bash
# Assuming you are in $HOME/klaytn/.
$ npm install truffle@4.1.15
$ cd node_modules/truffle
$ npm install solc@0.5.6
$ cd -
$ ln -s node_modules/truffle/build/cli.bundled.js truffle
$ export PATH=`pwd`:$PATH
```

### Installing vvisp <a id="installing-vvisp"></a>

vvisp is an easy-to-use cli tool/framework for developing smart contracts, provided by [HEACHI LABS](https://henesis.io/). You can easily set environment, deploy and execute Kaia smart contracts with a single-command. It supports the Truffle framework, so developers familiar with Truffle can use vvisp without difficulty.

Here, we introduce how to install vvisp and use it to set up the Kaia dApp development environment.

* vvisp repository - [https://github.com/HAECHI-LABS/vvisp](https://github.com/HAECHI-LABS/vvisp)​
* vvisp document - [https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md](https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md)​

vvisp can be easily installed if you have npm or yarn by executing the following command:

```bash
$ npm install -g @haechi-labs/vvisp
# or if you use yarn
$ yarn global add @haechi-labs/vvisp
```

Upon installation, you can utilize the vvisp command to ensure it has been installed properly. **NOTE**: You should use version over **v2.1.0**.

```bash
$ vvisp
Usage: vvisp <command> [options]

where <command> is one of: compile, console, deploy-contract, deploy-service, flatten, gen-script, init

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:

   compile [files...]                       compile the smart contracts

   console [script-api-path]                run interactive shell to execute contract scripts

   deploy-contract <file> [arguments...]    deploy the smart contracts

   deploy-service                           deploy or upgrade smart contract service using the deployment configure file

   flatten <files...>                       flatten the smart contracts

   gen-script [files...]                    generate javascript libraries communicating the smart contracts

   init [name]                              initialize directory to use vvisp

# you can check installed version.
$ vvisp --version
v2.1.0
```

## Deploy a Smart Contract <a id="deploy-a-smart-contract"></a>

Now we are ready to develop and deploy Kaia smart contracts!

### Creating a Project Directory <a id="creating-a-project-directory"></a>

First of all, create a directory where the source code locates.

```bash
$ mkdir kaia-testboard
$ cd kaia-testboard
```

### Initializing Truffle <a id="initializing-truffle"></a>

Initialize Truffle for contract deployment.

```bash
$ truffle init
```

### Writing a Simple Smart Contract in Solidity <a id="writing-a-simple-smart-contract-in-solidity"></a>

Create `KaiaGreeter.sol` at `kaia-testboard/contracts` directory.

```bash
$ cd contracts
$ touch KaiaGreeter.sol
$ vi KaiaGreeter.sol
```

Write the following code in KaiaGreeter.sol.

```text
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
}
```

### Modifying the Migration Script <a id="modifying-the-migration-script"></a>

```bash
$ cd ..
$ cd migrations
$ vi 1_initial_migration.js
```

Modify `1_initial_migration.js` as the following.

```javascript
const Migrations = artifacts.require("./Migrations.sol");
const KaiaGreeter = artifacts.require("./KaiaGreeter.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KaiaGreeter, 'Hello, Kaia');
};
```

### Deploying a Smart Contract using Truffle <a id="deploying-a-smart-contract-using-truffle"></a>

Enter Kaia's network information into truffle.js.

**`WARNING`**: Currently Kaia Kairos network's gasPrice is fixed to 25 Gpeb \(**It returns an error if you attempt to use any other number**\).

```bash
$ cd ..
$ vi truffle-config.js
```

Modify configuration as below

```javascript
// truffle-config.js
module.exports = {
    networks: {
        klaytn: {
            host: '127.0.0.1',
            port: 8551,
            from: '0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd', // enter your account address
            network_id: '1001', // Kairos network id
            gas: 20000000, // transaction gas limit
            gasPrice: 25000000000, // gasPrice of Kairos is 25 Gpeb
        },
    },
    compilers: {
      solc: {
        version: "0.5.6"    // Specify compiler's version to 0.5.6
      }
  }
};
```

Deploy the contract using the following command.

**NOTE**: Use `--network` to select which network to deploy and `--reset` to overwrite.

**NOTE**: Make sure that your Kaia node is running.

Your contract address is displayed followed `KaiaGreeter`:

```bash
$ truffle deploy --network klaytn --reset
Using network 'klaytn'.
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x0f5108bd9e51fe6bf71dfc472577e3f55519e0b5d140a99bf65faf26830acfca
  Migrations: 0x97b1b3735c8f2326a262dbbe6c574a8ea1ba0b7d
  Deploying KaiaGreeter...
  ... 0xcba53b6090cb4a118359b27293ba95116a8f35f66ae50fbd23ae1081ce9ffb9e
  KaiaGreeter: [SAVE THIS ADDRESS!!] # this is your smart contract address
Saving successful migration to network...
  ... 0x14eb68727ca5a0ac767441c9b7ab077336f9311f71e9854d42c617aebceeec72
Saving artifacts...
```

**`WARNING`**: It returns an error when your account is locked.

```bash
Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... undefined
Error encountered, bailing. Network state unknown. Review successful transactions manually.
Error: authentication needed: password or unlock
```

This is how you unlock your account.

```javascript
> personal.unlockAccount('0x775a59b94889a05c03c66c3c84e9d2f8308ca4abd')
Unlock account 0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase:
true
```

And then you are ready to go. Try deploy again.

## Check the Deployment <a id="check-the-deployment"></a>

### Checking the Deployed Byte Code using caver-js <a id="checking-the-deployed-byte-code-using-caver-js"></a>

Use `getCode` for checking the byte code of the deployed smart contract.

First, create a test file and open it.

```bash
$ touch test-kaia.js
$ open test-kaia.js
```

Write the following test code. Make sure you enter the contract address you just deployed.

```javascript
// test-kaia.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// enter your smart contract address
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'
caver.kaia.getCode(contractAddress).then(console.log);
```

Run the code.

```bash
$ node test-kaia.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180...
```

### Calling functions in the Deployed Smart Contract <a id="calling-functions-in-the-deployed-smart-contract"></a>

Use JavaScript to call the `greet()` in the contract.

**NOTE**: In order to call specific functions in smart contracts, you need an ABI \(Application Binary Interface\) file. When Truffle deploys your contract, it automatically creates .json file at `./build/contracts/` which contains `abi` property.

Append the following lines to the test code written above.

```javascript
// test-kaia.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// enter your smart contract address
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'

caver.kaia.getCode(contractAddress).then(console.log);
// add lines
const KaiaGreeter = require('./build/contracts/KaiaGreeter.json');
// enter your smart contract address
const klaytnGreeter = new caver.kaia.Contract(KaiaGreeter.abi, contractAddress);
klaytnGreeter.methods.greet().call().then(console.log);
```

Run the test code.

```bash
$ node test-kaia.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151... # This is from caver.kaia.getCode
Hello, Kaia # This is from KlyatnGreeter.methods.greet()
```

**If you got "Hello, Kaia", you've completed the task. Congrats!**

