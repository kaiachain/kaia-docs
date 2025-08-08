# How to Send ERC-20 Tokens Using the Kaia SDK (USDT Example)

## Overview 

In this guide, you will learn how to programmatically send ERC 20 tokens using USDT as an example on the Kaia blockchain with the ethers-ext SDK. The Kaia SDK is a collection of libraries including ethers-ext, web3js-ext, viem-ext, web3j-ext, and web3py-ext that help developers interact with Kaia nodes across different programming environments. 

This guide focuses on using the ethers-ext SDK to send USDT tokens through a smart contract call.

## Prerequisite

- A [MetaMask](https://metamask.io/download) Account (a dev account was used for this example)
- Obtain test KAIA from the [Faucet](https://faucet.kaia.io)

## Step 1: Setup project and install ethers-ext and ethers.js

```bash
mkdir send-usdt-kaiasdk
cd  send-usdt-kaiasdk
npm init -y  
npm install --save @kaiachain/ethers-ext ethers@6 dotenv
```

## Step 2: Set up Provider and Wallet instance

Create a new file named `index.js` and paste the code below into it. 

```js
import { ethers } from "ethers";
import { Wallet, JsonRpcProvider, parseKaiaUnits } from "@kaiachain/ethers-ext/v6";
import "dotenv/config";

const senderPriv = process.env.USDT_SENDER;

const recipientAddress = "PASTE_RECIPIENT_ADDRESS"
const amount = parseKaiaUnits("0.01", 6);

const provider = new JsonRpcProvider("https://public-en.node.kaia.io");
const wallet = new Wallet(senderPriv, provider);
```

## Step 3: Create USDT contract instance 

```js
const USDT_CONTRACT_ABI = [
{
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
}
]

const USDT_CONTRACT_ADDRESS = "0xd077a400968890eacc75cdc901f0356c943e4fdb";

async function main() {
  const USDT_CONTRACT = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_CONTRACT_ABI, wallet);
}
```

## Step 4: Send Tokens 

```js
async function main() {
  const USDT_CONTRACT = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_CONTRACT_ABI, wallet);

  console.log("balance of recipient before", (await USDT_CONTRACT.balanceOf(recipientAddress)).toString());

  const sentTx = await USDT_CONTRACT.transfer(recipientAddress, amount);
  const receipt = await sentTx.wait();

  console.log("receipt", receipt.hash);

  console.log("balance of recipient after", (await USDT_CONTRACT.balanceOf(recipientAddress)).toString());
}

main();
```

**Full Code**

```js
import { ethers } from "ethers";
import { Wallet, JsonRpcProvider, parseKaiaUnits } from "@kaiachain/ethers-ext/v6";
import "dotenv/config";

const senderPriv = process.env.USDT_SENDER;
const recipientAddress = "PASTE RECIPIENT ADDRESS"

const amount = parseKaiaUnits("0.01", 6);

const provider = new JsonRpcProvider("https://public-en.node.kaia.io");
const wallet = new Wallet(senderPriv, provider);

/* 
Get USDT ABI here: https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=contract&page=1
*/

const USDT_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const USDT_CONTRACT_ADDRESS = "0xd077a400968890eacc75cdc901f0356c943e4fdb";

async function main() {
  const USDT_CONTRACT = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_CONTRACT_ABI, wallet);

  console.log("balance of recipient before", (await USDT_CONTRACT.balanceOf(recipientAddress)).toString());
  const sentTx = await USDT_CONTRACT.transfer(recipientAddress, amount);

  const receipt = await sentTx.wait();
  console.log("receipt", receipt.hash);
  
  console.log("balance of recipient after", (await USDT_CONTRACT.balanceOf(recipientAddress)).toString());
}

main();
```

Run `node index.js` in your terminal to see your transaction executed.

![](/img/build/tutorials/send-usdt-kaiasdk.png)