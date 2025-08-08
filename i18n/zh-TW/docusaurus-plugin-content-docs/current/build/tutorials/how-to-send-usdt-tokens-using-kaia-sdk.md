# 如何使用 Kaia SDK 傳送 ERC-20 代幣（USDT 示例）

## 概述

在本指南中，您將學習如何在 Kaia 區塊鏈上使用 ethers-ext SDK 以 USDT 為例，以程式化的方式發送 ERC 20 代幣。 Kaia SDK 是一系列函式庫的集合，包括 ethers-ext、web3js-ext、viem-ext、web3j-ext 和 web3py-ext，可協助開發人員在不同的程式設計環境中與 Kaia 節點互動。

本指南著重於使用 ethers-ext SDK 透過智慧型契約呼叫傳送 USDT 代幣。

## 先決條件

- 一個 [MetaMask](https://metamask.io/download) 帳戶 (本範例使用的是 dev 帳戶)
- 從 [水龍頭] 取得測試 KAIA(https://faucet.kaia.io)

## 步驟 1：設定專案並安裝 ethers-ext 和 ethers.js

```bash
mkdir send-usdt-kaiasdk
cd  send-usdt-kaiasdk
npm init -y  
npm install --save @kaiachain/ethers-ext ethers@6 dotenv
```

## 步驟 2：設定供應商和錢包實例

建立一個名為 `index.js` 的新檔案，並貼上下列程式碼。

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

## 步驟 3：建立 USDT 合約實例

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

## 步驟 4：傳送代幣

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

**完整代碼**

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

在您的終端執行 `node index.js` 以查看您的交易已執行。

![](/img/build/tutorials/send-usdt-kaiasdk.png)