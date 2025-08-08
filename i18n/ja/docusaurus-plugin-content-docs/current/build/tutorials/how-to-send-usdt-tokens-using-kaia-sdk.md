# カイアSDKを使用したERC-20トークンの送信方法（USDTの例）

## 概要

このガイドでは、ethers-ext SDKを使用して、Kaiaブロックチェーン上でUSDTを例としてERC 20トークンをプログラムで送信する方法を学びます。 カイアSDKは、ethers-ext、web3js-ext、viem-ext、web3j-ext、web3py-extを含むライブラリーの集合体であり、開発者が異なるプログラミング環境でカイアノードと対話することを支援します。

このガイドでは、スマートコントラクトの呼び出しを通じてUSDTトークンを送信するためにethers-ext SDKを使用することに焦点を当てています。

## 前提条件

- A [MetaMask](https://metamask.io/download) アカウント (この例ではdevアカウントを使用)
- 蛇口](https://faucet.kaia.io)からテスト用KAIAを入手。

## ステップ1: プロジェクトのセットアップとethers-extとethers.jsのインストール

```bash
mkdir send-usdt-kaiasdk
cd  send-usdt-kaiasdk
npm init -y  
npm install --save @kaiachain/ethers-ext ethers@6 dotenv
```

## ステップ2：プロバイダーとウォレットのインスタンスをセットアップする

index.js\`という名前のファイルを新規作成し、以下のコードを貼り付ける。

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

## ステップ3：USDTコントラクト・インスタンスを作成する

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

## ステップ4：トークンの送信

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

\*\*フルコード

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

ターミナルで`node index.js`を実行し、トランザクションの実行を確認する。

![](/img/build/tutorials/send-usdt-kaiasdk.png)