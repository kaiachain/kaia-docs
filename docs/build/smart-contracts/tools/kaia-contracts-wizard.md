# Kaia Contracts Wizard

![](/img/banners/kaia-kcw.png)

## Introduction

Kaia prioritizes providing a seamless developer experience, which is the driving force behind the creation of the Kaia Contracts Wizard (KCW). KCW serves as an interactive tool for effortlessly bootstrapping your smart contracts and utilizing the secure, tested components available in [Kaia Contracts](https://github.com/kaiachain/kaia-contracts). In essence, it simplifies the process of developing smart contracts by leveraging the components of Kaia contracts. It's worth noting that the Kaia contracts wizard is built on the foundation of the OpenZeppelin Wizard, further bolstering the security of smart contract development.

In this guide you will:
* Understand the basic functionality of Kaia Contracts Wizard.
* Generate and customize smart contract code using Kaia Contracts Wizard.
* Deploy Kaia contracts to the Kaia Network (Kairos) using Foundry Scripting System.

## Exploring Kaia Contracts Wizard

Kaia Contracts Wizard posits itself as the fastest and easiest way to write your smart contract using Kaia Contracts. In this section, we will dive into the various components and segments of the Kaia Contract Wizard.

As it is, the Kaia contracts wizard supports the following token standards:

* [KIP-7](https://kips.kaia.io/KIPs/kip-7) — This is a fungible token standard for Kaia. Fungible means that all tokens are divisible and interchangeable, that is, have the same value. One typical example of fungible tokens is fiat currencies, where each equal-denomination bill has the same value.
* [KIP-17](https://kips.kaia.io/KIPs/kip-17) — This is a non-fungible token standard for Kaia. Non-fungible means that each token is indivisible, and therefore, unique. A KIP17 token can represent ownership of a unique item, whether physical property or virtual collectibles — like a picture, item in a game, real estate, and so on.
* [KIP-37](https://kips.kaia.io/KIPs/kip-37) — This is known as the multi-token standard for Kaia, because it can represent both fungible and non-fungible tokens in a single smart contract.

In line with our [Ethereum Equivalence](https://medium.com/klaytn/toward-ethereum-equivalence-1-introducing-klaytn-v1-8-0-971911be7ff9) support, Kaia contracts wizard also supports [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/), [ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/), [ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/). 

Kaia Contracts Wizard is comprised of the following sections:

* **Token standard section**: This tab comprises all the different token standards supported by the Kaia contracts wizard. 

* **Settings section**: This section provides the preliminary settings for each token standard, such as token name, symbol, pre-mint (token supply when the contract is deployed), and URI (for non-fungible tokens).

* **Features section**: comprises all features available for each token standard. You can find more information about the different extensions available for each tokens in the following links:

    * [KIP7](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP7/extensions)
    * [KIP17](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP17/extensions)
    * [KIP37](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP37/extensions)

* **Access Control section**: comprises all the available access control mechanisms for each token standard.

* **Interactive code display section**: this displays the smart contract code generated with the configuration as set by the user. 

![](/img/build/tools/kcw-image.png)

Having explored the different parts of the Kaia contracts wizard, you can now select the kind of contract that you want (current support for **KIP7**, **KIP17**, **KIP37**, **ERC20**, **ERC721**, **ERC1155**, **Governor**, and custom contracts), set your parameters and desired features (token name, symbol, pre-mint amount, access control, etc.), and Contracts Wizard will generate all of the code necessary. The generated code is thus ready to be compiled and deployed, or it can serve as a starting point and customized further with application specific logic.

## Customizing and Deploying Kaia Contracts on Kaia Network

In this section, you will deploy the generated code from kaia contracts wizard to the Kaia Testnet Kairos using Foundry. The generated code will serve as a starting point and customized further to fit an airdrop contract for KIP7 and KIP17 tokens.  While on the other end the generated code for KIP37 will be used as it is. 

Let’s get started! 

### Prerequisites

To follow along in this tutorial, the prerequisites are highlighted below:
* Make sure to have [foundry](https://book.getfoundry.sh/getting-started/installation) installed. 
* Clone the [kaia-foundry-starterkit](https://github.com/ayo-klaytn/kaia-foundry-starterkit) code.
* [MetaMask](../tutorials/connecting-metamask.mdx#install-metamask): used to deploy the contracts, sign transactions and interact with the contracts.
* RPC Endpoint: you can get this from one of the supported [endpoint providers](../../references/public-en.md).
* Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.

### Getting Started
This guide walks you through a simple implementation of an airdrop contract for KIP7 and KIP17 token standard. In the airdrop contract, the creator of the project mints each respective tokens directly to a certain selection of wallets. In the next sections, we will be looking at how to customize and deploy each token airdrop contract respectively. 

### Customizing Token contracts 

**Customizing KIP7 contract to KIP7 Airdrop contract.**

You need to customize your KIP7 contract before modifying it to an airdrop contract. To do that, follow the steps below: 

1. Navigate to [wizard.kaia.io](https://wizard.kaia.io).
2. On the **Contracts** tab select **KIP7**
3. Next is to fill the name (KIP7 Token Airdrop) and symbol (KTA) in the **SETTINGS** tab. The pre-mint field is left empty
4. Subsequently on the **FEATURES** tab, tick the **Mintable** feature box, it then automatically selects the Ownable feature in **ACCESS CONTROL** tab. 

This is how Kaia contracts wizard would look like after making these configurations:

![](/img/build/tools/kip7-kcw.png)

Here is the generated code: 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract KIP7TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("KIP7 Token Airdrop", "KTA") {}
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```
The next thing is to modify the code above to suit our airdrop implementation which looks like this:

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract KIP7TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("KIP7 Token Airdrop", "KTA") {
    }
    // airdrop fungible token
    function airdropTokens(address[] calldata wAddresses, uint[] calldata tAmount) public onlyOwner {
        require(wAddresses.length == tAmount.length, "Must be same lenght");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleTokens(wAddresses[i], tAmount[i]);
        }
    }
    function _mintSingleTokens(address wAddress, uint amount) private {
        _mint(wAddress, amount);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
}
```

From the code modified above, you can see that we added a new function called `airdropTokens()`. This function mints tokens to certain selected addresses and can only be called by the creator of the contract - `onlyOwner`. 

Subsequently, we modified the *public* **mint()** *onlyOwner* function to **_mintSingleTokens()** private. 

Now that we have our KIP7 airdrop contract code ready, the next step is to create a new file named airdropKIP7.sol in the src folder of your project directory and paste the modified code in the file.

**Customizing KIP17 contract to KIP17 Airdrop contract.**

You need to customize your KIP17 contract before modifying it to an airdrop contract. To do that, follow the steps below: 

1. Navigate to [wizard.kaia.io](https://wizard.kaia.io/). 
2. On the **Contracts** tab select **KIP17**
3. Next is to fill the name (KIP7 NFT Airdrop) and symbol (KNA) in the **SETTINGS** tab.  The Base URI field is to be left empty. 
4. Subsequently on the **FEATURES** tab, tick the **Mintable**, **Auto-increment Ids**, and **Enumerable** feature box. You will notice that the Ownable feature in **ACCESS CONTROL** tab has been automatically selected. 
 
This is how Kaia contracts wizard would look like after making these configurations:

![](/img/build/tools/kip17-kcw.png)

Here is the generated code: 

```solidity 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@kaiachain/contracts/access/Ownable.sol";
import "@kaiachain/contracts/utils/Counters.sol";
contract KIP17NFTAirdrop is KIP17, KIP17Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() KIP17("KIP17 NFT Airdrop", "KNA") {}
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, KIP17Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

The next thing is to modify the code above to suit our airdrop implementation which looks like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@kaiachain/contracts/access/Ownable.sol";
import "@kaiachain/contracts/utils/Counters.sol";
contract KIP17NftAirdrop is KIP17, KIP17Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() KIP17("KIP17 NFT Airdrop", "KNA") {}
    // Airdrop NFTs
    function airdropNfts(address[] calldata wAddresses) public onlyOwner {
        require(wAddresses.length != 0, "Must no be equal to zero");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleNFT(wAddresses[i]);
        }
    }
    function _mintSingleNFT(address to) private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, KIP17Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

From the code modified above, you can see that we added a new function called **airdropNfts()**. This function mints tokens to certain selected addresses and can only be called by the creator of the contract - onlyOwner. 

Subsequently, we modified the **safeMint()** *public onlyOwner* function to **_mintSingleTokens()** **private**.
 
Now that we have our KIP17 airdrop contract code ready, the next step is to create a new file named airdropKIP17.sol in the src folder of your project directory and paste the modified code in the file.

**Customizing KIP37 contract.**

Because KIP37 supports batch minting, we will only customize the contract and use it as it is. To customize our KIP37Contract, follow the steps below: 

1. Navigate to [wizard.kaia.io](https://wizard.kaia.io) 
2. On the **Contracts** tab select **KIP37**
3. Next is to fill the name (KIP7 NFT Airdrop) and symbol (KNA) in the **SETTINGS** tab.  The Base URI field is to be left empty. 
4. Subsequently on the **FEATURES** tab, tick the **Mintable**, **Auto-increment Ids**, and **Enumerable** feature box. You will notice that the Ownable feature in **ACCESS CONTROL** tab has been automatically selected. 
 
This is how Kaia contracts wizard would look like after making these configurations:

![](/img/build/tools/kip37-kcw.png)

Here is the generated code: 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP37/KIP37.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract KIP37MultiToken is KIP37, Ownable {
    constructor() KIP37("") {}
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
```
Now that we have our KIP37 contract code ready, the next step is to create a new file named KIP37MultiToken.sol in the src folder of your project directory and paste the generated code in it.

Having generated the contract code for all our Kaia contracts, the next step is to deploy to the Kaia Testnet Kairos using Foundry solidity scripts.

## Deploying generated smart contracts code using Foundry Scripts

In this section we will go through deploying our generated smart contract code using Foundry; specifically the foundry script to deploy on-chain. 

### Getting Started

While getting started with foundry, you must have been exposed to the preliminary way of delaying contracts using [forge create](https://book.getfoundry.sh/reference/forge/forge-create.html). Recently, the Foundry team came up with a more user friendly way of declaratively deploying contracts using Solidity called [Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting#solidity-scripting) i.e writing deployment scripts in solidity instead of JavaScript.  

In this section, we will deploy our contract using solidity scripting in Foundry. 

### Environment Configuration

We’re going to deploy our generated smart contract to the Kaia Kairos Testnet, but to do this we’ll need to configure Foundry a bit, by setting things like a Kairos RPC URL, the private key of an account that’s funded with test KAIA. 

Once you have all that, create a .env file and add the variables. Foundry automatically loads in a .env file present in your project directory.

The .env file should follow this format:

```code
KAIROS_RPC_URL=
// if you want to deploy to mainnet
MAINNET_RPC_URL=
PRIVATE_KEY=
```
We now need to edit the `foundry.toml` file. There should already be one in the root of the project. Paste the following lines to the end of the file

```code
[rpc_endpoints]
kairos = "${KAIROS_RPC_URL}"
// if you want to deploy to mainnet
mainnet = "${MAINNET_RPC_URL}"
```
### Writing the Script

Next, we have to create a folder and name it script  if it doesn’t already exist. We then need to create a script file for our contracts namely:
airdropKIP7.s.sol
airdropKIP17.s.sol
KIP37MultiToken.s.sol
This is where we will write the deployment script itself.  The contents of each file should look like this:

1. airdropKIP7.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/airdropKIP7.sol";

contract KIP7AirdropDeployScript is Script {

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP7TokenAirdrop kip7TokenAirdrop = new KIP7TokenAirdrop();

        vm.stopBroadcast();
    }
}
```

2. airdropKIP17.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/airdropKIP17.sol";

contract KIP17AirdropDeployScript is Script {

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP17NftAirdrop kip17NftTokenAirdrop = new KIP17NftAirdrop();

        vm.stopBroadcast();
    }
}
```

3. KIP37MultiToken.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/KIP37MultiToken.sol";

contract KIP37MultiTokenDeployScript is Script {

    function setUp() public {}

    function run() public {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP37MultiToken kip37MultiToken = new KIP37MultiToken();

        vm.stopBroadcast();
    }
}
```

Let’s go through what each line of code does. 

First we declared the SPDX-license and pragma version for each script file. Note that because each script file is a solidity program, we still need to declare the SPDX-license and pragma version, making it work like a smart contract, but is never deployed. 

Next we imported [Forge Std/Script.sol](https://github.com/foundry-rs/forge-std/blob/master/src/Script.sol) which provides some scripting utilities to use for deploying our contracts. Subsequently, we imported the contract to be deployed. In this case **airdropKIP7**, **airdropKIP17**, **KIP37MultiToken** for each script.

We then created a contract called **KIP7AirdropDeployScript**, **KIP17AirdropDeployScript**, **KIP37MultiTokenDeployScript** for each script file which inherits Script from Forge Std library. 

Next we declared the **run()** function. The function run() is the entry point for scripts to be executed. We 
then declared a **deployerPrivateKey** variable that loads in the private key from our .env file. 

Subsequently, we called the **vm.startBroadcast(deployerPrivateKey)** special cheat code that records calls and contract creations made by our main script contract, having passed the deployerPrivateKey for signing the transactions.

We then created the respective contract. This contract creation will be recorded by forge because we previously called the vm.startBroadcast() cheat code. 

Now that we have gotten an overview of what each line entails, you can move on to deploy the contracts.  Click this [link](https://book.getfoundry.sh/tutorials/solidity-scripting#writing-the-script), to learn more about writing scripts and other details.

At the root of the project run

```bash
// To load the variables in the .env file
source .env
```
To deploy the each contract run the command below:

1. airdropKIP7

```bash
forge script script/airdropKIP7.s.sol:KIP7AirdropDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```
2. airdropKIP17

```bash
forge script script/airdropKIP17.s.sol:KIP17AirdropDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```
3. KIP37MultiToken

```bash
forge script script/KIP37MultiToken.s.sol:KIP37MultiTokenDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```

If the command was successful for each command, your terminal should look like this:

![](/img/build/tools/deploy-kcw-contracts.png)

Refer to this [guide](https://book.getfoundry.sh/reference/forge/forge-script), to learn more about the script command. 

## Conclusion 

In this tutorial, you learned about the Kaia contracts wizard, its functionality and how to customize contracts using KCW. This guide also demonstrated how to generate smart contract code and also how the generated smart contract code can serve as a starting point and customized further with application specific logic. 

Further, we deployed the generated contracts to Kaia Kairos Testnet using Foundry solidity scripting. You can make use of Remix IDE or any smart contract development environment to deploy smart contract derived or customized using from Kaia Contracts Wizard. You can find corresponding tutorials in the following links:

* [Connecting to Remix](../tutorials/connecting-remix.md#connecting-kaia-remix-using-metamask) 
* [Deploying smart contract using Hardhat](../get-started/hardhat.md)
* [Deploying smart contract using Truffle](../smart-contracts/samples/erc-20.md#2-2-deploying-smart-contract-using-truffle)