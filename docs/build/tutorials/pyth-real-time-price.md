# How to Fetch Real-Time Prices on Kaia Using Pyth

## Introduction

Pyth is a decentralized oracle network that takes a distinct approach in an ecosystem largely powered by push-based oracles. Instead of pushing data to your contract at fixed intervals, Pyth allows you to pull real-world data on demand. This model gives developers more control and helps avoid unnecessary onchain updates. With this integration, developers can fetch real-time data and use a pay-per-use model where fees apply only when an update is requested.

In this guide, you will learn how to use Pyth’s real-time price feeds to read the value of IDR, a fiat currency. Your Solidity smart contract will retrieve the USD/IDR price from Pyth using the [pyth-sdk-solidity](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity), and you will update and fetch the latest price using the [hermes-client](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/hermes/client/js).

For a quick start, you can find the complete code for this tutorial on [GitHub](https://github.com/ayo-klaytn/pyth-kaia-hardhat-example). This provides a ready-to-use reference and helps you set up the project and installation more quickly.

## Prerequisites

Before you begin, ensure you have the following:

- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

    Required to install dependencies and run development tools.

- A wallet funded with KAIA testnet tokens.

    You will need KAIA to pay for deployment and transaction gas fees on the Kairos testnet. You can request free testnet KAIA from the [Kaia Faucet](https://faucet.kaia.io/).

## Setting up development environment 

In this section, you will set up your development environment, compile your oracle contract, and prepare it for deployment using Hardhat. 

**1. Create the Hardhat Project**

Create a new directory for your project and initialize Hardhat:

```bash
mkdir pyth-kaia-hardhat-example && cd pyth-kaia-hardhat-example
npm init -y
npx hardhat@next --init
```

Accept the default responses when prompted. For this guide we will use the Mocha and Ethers template. 

Verify your installation by checking the Hardhat version:

```bash
npx hardhat --version
```

**2. Set Encrypted Secrets**

You will now store your RPC URL and private key using Hardhat’s encrypted keystore.

Run the following commands:

```bash
npx hardhat keystore set KAIROS_RPC_URL
npx hardhat keystore set PRIVATE_KEY
```

Make sure to enter your password and value for each variable to keep them encrypted. 

**3. Reference Secrets in Your Configuration File**

Open `hardhat.config.ts` and update the networks section to reference the encrypted secrets. If you used different secret names, update the keys accordingly.

```typescript
import { configVariable } from "hardhat/config";
module.exports = {
  networks: {
    kairos: {
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
```

## Create a Contract and Fetch Prices from Pyth Oracles

In this section, you will install the [Pyth Solidity SDK](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity), create a PriceConsumer contract, and deploy it using Hardhat. The contract will read a Pyth price feed, which you will later update using price data fetched from Hermes.

### Install the Pyth SDK

Pyth provides a Solidity SDK that lets you interact with onchain Pyth price feed contracts. The SDK exposes the IPyth interface and related structs.

Install the SDK with npm:

```bash
npm install --save-dev @pythnetwork/pyth-sdk-solidity
```

### Create the PriceConsumer contract

Create a new file at `contracts/PriceConsumer.sol` and add the following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
contract PriceConsumer {
    IPyth public pyth;
    constructor(address pythContract) {
        pyth = IPyth(pythContract);
    }
    function updatePrice(bytes[] calldata priceUpdateData)
        external
        payable
    {
        // Pay the Pyth fee for receiving price updates
        uint fee = pyth.getUpdateFee(priceUpdateData);
        require(msg.value >= fee, "Not enough fee sent");
        // Update the Pyth price state
        pyth.updatePriceFeeds{value: fee}(priceUpdateData);
        // Can fetch the price and use it as well
        //PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
    }
    function getLatestPrice(bytes32 priceFeedId) public view returns (int64, int32) {
        // Read the current price from a price feed if it is less than 60 seconds old.
        // Each price feed (e.g., USD/IDR) is identified by a price feed ID.
        // The complete list of feed IDs is available at https://docs.pyth.network/price-feeds/price-feeds
        PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
        
        // uint256 basePrice = PythUtils.convertToUint(
        //   currentBasePrice.price,
        //   currentBasePrice.expo,
        //   18
        // );
        
        return (currentBasePrice.price, currentBasePrice.expo);
    }
}
```

**Walk through**

The PriceConsumer contract:

- Imports the Pyth interfaces and structs from `@pythnetwork/pyth-sdk-solidity`.
- Stores:
    - The Pyth contract instance (pyth).
    - The price feed ID for USD / IDR (usdIdrPriceId).
- Exposes `updateAndGetUsdIdrPrice`, which:
    - Computes the update fee using IPyth.getUpdateFee.
    - Call IPyth.updatePriceFeeds with the required fee.
    - Call IPyth.getPriceNoOlderThan to read a fresh USD / IDR price.
    - Returns the raw price, exponent, and publish time.

Later, your offchain Hermes client will build the priceUpdate bytes array and pass it into this function when you need fresh prices.

### Compile the contract

Run the following command to compile your contracts:

```
npx hardhat compile
```

## Deploy the Contract

To deploy PriceConsumer contract, you will create an Ignition module and then run the deployment command.

**Create the Ignition module**

Create a new file at `ignition/modules/PriceConsumer.ts`:

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43"; 
export default buildModule("PriceConsumerModule", (m) => {
  const priceConsumer = m.contract("PriceConsumer", [pythContractAddress]);
  return { priceConsumer };
});
```

**Deploy the contract**

Deploy the PriceConsumer contract to the Kairos testnet using your Ignition module:

```bash
npx hardhat ignition deploy --network kairos ignition/modules/PriceConsumer.ts
```

When prompted, enter the keystore password you configured earlier for your encrypted secrets.

Once this completes, your `PriceConsumer.sol` contract is deployed on the Kairos testnet and ready to consume real-time USD / IDR prices from Pyth.

## Interact from TypeScript

In this final step, you will interact with your deployed PriceConsumer contract using TypeScript. This script will fetch the latest USD/IDR price by requesting Pyth price update data through the Hermes client and sending it onchain.

**Install the Dependencies**

Install the required packages:

```bash
npm install --save-dev tsx @pythnetwork/hermes-client @dotenv
```

**Set up .env**

Create a .env file in the root directory of your project and add your private key:

```bash
PRIVATE_KEY="0xDEAD....." // REPLACE WITH YOUR PRIVATE KEY
```

**Create the Interaction Script**

Create a new file at **scripts/interact.ts** and add the following: 

```typescript
import { HermesClient } from "@pythnetwork/hermes-client";
import { ethers } from "ethers";
import 'dotenv/config'

// 1. Setup
const hermes = new HermesClient("https://hermes.pyth.network");
const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);

const PK = process.env.PRIVATE_KEY; 
const wallet = new ethers.Wallet(PK, provider);


// 2. Your deployed contract
const priceConsumerAddress = "0x91e89aa32224dEd5dA483a83a4de45bF4bE57caA"; // REPLACE WITH DEPLOYED PRICE CONSUMER CONTRACT

const priceConsumerAbi = [
  "function updatePrice(bytes[] priceUpdateData) external payable",
  "function getLatestPrice(bytes32 priceId) public view returns(int64, int32)",
];

const priceConsumer = new ethers.Contract(
  priceConsumerAddress,
  priceConsumerAbi,
  wallet
);

// 3. Price feed IDs
const priceId =
  "0x6693afcd49878bbd622e46bd805e7177932cf6ab0b1c91b135d71151b9207433"; // FX.USD/IDR Beta Price Feed ID

async function run() {
  // Fetch Hermes price update binary
  const update = await hermes.getLatestPriceUpdates([priceId], {
    encoding: "hex",
  });
  console.log(update);

  const priceUpdateData = ["0x" + update.binary.data]; // must be array of bytes

  console.log(priceUpdateData);

  // Estimate fee required by Pyth contract
  // EVM Network Price Feed Contract Addresses: https://docs.pyth.network/price-feeds/core/contract-addresses/evm

  const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43";
  const pythAbi = [
    "function getUpdateFee(bytes[] calldata data) external view returns(uint)",
  ];
  console.log("Pyth contract address:", pythContractAddress);
  const pyth = new ethers.Contract(pythContractAddress, pythAbi, wallet);
  const fee = await pyth.getUpdateFee(priceUpdateData);
  console.log("Pyth fee:", fee.toString());

  // Call your contract
  const tx = await priceConsumer.updatePrice(priceUpdateData, {
    value: fee, // pay the pyth update fee
    gasLimit: 500000,
  });
  console.log("Tx sent:", tx.hash);
  const receipt = await tx.wait();
  console.log("Tx confirmed");
  console.log(receipt);

  // 4. Get latest price from contract
  try {
    console.log("=== Latest Price from Contract ===");
    const [price, expo] = await priceConsumer.getLatestPrice(priceId);
    console.log("Price Value : " + price.toString());
    console.log("Exponent Value : " + expo.toString());
  } catch (error) {
    console.log(error);
    // @ts-ignore
    console.error("\nError calling getLatestPrice:", error.message);
    console.log(
      "This usually means the price is older than 60 seconds or hasn't been updated yet."
    );
    console.log("Make sure updatePrice() was called successfully first.");
  }
}
run();

```

**Run the Script**

Execute the script with:

```bash
npx tsx scripts/interact.ts
```

**Example Output**

```bash
Tx sent: 0x79c5dcb7abd9605b070bf9062ba2e2382272d23d58f7b50446c3107b7784fc8e
Tx confirmed
=== Latest Price from Contract ===
Price Value : 1669784988
Exponent Value : -5
======== —— =========
```

Your transaction can be verified on the Kairos explorer by pasting the transaction hash into the search bar. This confirms that the update and read operations were successful.

## Conclusion

In this tutorial, you created a Solidity contract that reads real-time prices from Pyth, deployed it to the Kairos testnet, and interacted with it using the Hermes client. You also learned how Pyth’s pull-based design gives you control over when and how price updates occur.

For more information, explore:
- [EVM Contract Reference](https://api-reference.pyth.network/price-feeds/evm/getPriceNoOlderThan) for the Pyth API
- [Pyth Oracle AMM Example](https://github.com/pyth-network/pyth-examples/tree/main/price_feeds/evm)for a complete end-to-end implementation



