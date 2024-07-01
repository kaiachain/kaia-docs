# SupraOracles

## Introduction

![](/img/build/tools/klaytnXsupraOracles.png)

[SupraOracles](https://supraoracles.com/) is a novel, high-throughput Oracle & IntraLayer: a vertically integrated toolkit of cross-chain solutions (data oracles, asset bridges, automation network, and more) that interlink all blockchains, public (L1s and L2s) or private (enterprises). It provides smart contracts with a next-generation cross chain oracle solution that has superior data accuracy, speed, scalability and security.

With SupraOracles, your smart contract can get access to price data feeds to build your various decentralized finance(DeFi) use cases. In this tutorial, you will use SupraOracles  to get price feeds easily on Klaytn blockchain using Remix IDE.

## Prerequisites

- [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
- [Remix IDE](https://remix.ethereum.org/)
- [Klaytn Plugin on Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- Test KLAY from [Faucet](https://baobab.wallet.klaytn.foundation/faucet)

## Getting Started

In the following steps, you will request an ETH/USD price feed in your smart contract using SupraOracles. Let's get started!

### Step 1: Create The S-Value Interface

This creates the interface that will be used to fetch prices from SupraOracles. Add the following code to the solidity smart contract that you wish to retrieve an S-Value.

```solidity
interface ISupraSValueFeed {
function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
```

### Step 2: Configure The S-Value Feed Address

To fetch the S-Value from a SupraOracles smart contract, first find the S-Value Feed Address for the chain of your choice. When you have the right address, create an instance of the S-Value Feed using the interface we previously defined as such:

```solidity
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
}
```

In this example, we are implementing the S-Value Feed on the Klaytn Baobab TestNet. You can verify the Klaytn Baobab S-Value Feed Address [here](https://supraoracles.com/docs/get-started/networks/).

### Step 3: Get The S-Value Crypto Price

Now you can simply access the S-Value Crypto Price of our supported market pairs. In this step, you'll get the price of ETH/USDT (eth_usdt) by applying the following code to your Smart Contract.

```solidity
function getEthUsdtPrice() external view returns (int) {
(
int price,
/* uint timestamp */
) = sValueFeed.checkPrice("eth_usdt");
return price;
}
```

## Practical implementation

In the example below, we will be deploying the S-Value Price Feed Contract and also executing the getEthUsdtPrice() function to get the price ETH/USDT pairs.

### Create and Deploy Sample Code

**Remix IDE**

- Navigate to [Remix IDE](https://remix.ethereum.org/)
- Click on File Explorer tab, create a new file named `demoSupraPriceFeed.sol` in the contracts folder
- Paste the code below in your newly created file
- In Remix, click **Compile contract**.
- Click the Klaytn tab on your left having installed the plugin
- Select **Environment** > **Injected Caver** - **Kaikas**.
- In **Contract**, select your contract. For example, ISupraSValueFeedExample.
- Click **Deploy**.

**Sample Code**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
interface ISupraSValueFeed {
    function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
    function getEthUsdtPrice() external view returns (int) {
        (
            int price,
            /* uint timestamp */
        ) = sValueFeed.checkPrice("eth_usdt");
        return price;
    }
}
```

### Interact with Smart Contract

To get the price feed for the selected currency pair, you have to execute the `getEthUsdtPrice()` function.

![](/img/build/tools/sPriceFeed.png)

Tada 🎉! You just requested for a currency price feed (ETH/USDT)  in your smart contract.

As of the time of writing, getEthUsdtPrice() returned "185795966200", an 8-point precision figure. To get the actual ETH/USD value, you need to divide the figure by 10^8 which equals $1857.95966200.

## More Ways To Use SupraOracles Crypto Price Feeds

### S-Value Feeds With Web3.js

```javascript
// example assumes that the web3 library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const web3 = new Web3('https://public-en-baobab.klaytn.net')
const sValueFeed = new web3.eth.Contract(abi, address)
const price = (await sValueFeed.methods.checkPrice('eth_usdt').call()).price
console.log(`The price is: ${price}`)
}
getEthUsdtPrice()
```

### S-Value Feeds With ethers.js

```javascript
// example assumes that the ethers library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
////for ethers version 6.0
const provider = new ethers.JsonRpcProvider("https://klaytn-baobab-rpc.allthatnode.com:8551")
////for ethers version <= 5.7.2
//const provider = new ethers.providers.JsonRpcProvider('https://public-en-baobab.klaytn.net')
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const sValueFeed = new ethers.Contract(address, abi, provider)
const price = (await sValueFeed.checkPrice('eth_usdt')).price
console.log(`The price is: ${price.toString()}`)
}
getEthUsdtPrice()
```

## Conclusion

In this tutorial, you learned how to request an ETH/USD price using the SupraOracle price feed solution. With SupraOracle, you can also generate random numbers in your smart contract. Curious about this process, visit this [guide](https://metaverse-knowledge-kit.klaytn.foundation/docs/decentralized-oracle/oracle-providers/supraOracles-tutorial) on integrating SupraVRF on Klaytn. For more in-depth guides on SupraOracles, please refer to the [SupraOracles Docs](https://supraoracles.com/docs/development-guides).
