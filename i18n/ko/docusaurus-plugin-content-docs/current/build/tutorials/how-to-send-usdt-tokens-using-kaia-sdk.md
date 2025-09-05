# Kaia SDK를 사용하여 ERC-20 토큰을 전송하는 방법(USDT 예시)

## 개요

이 가이드에서는 Kaia 블록체인에서 이더스엑스트 SDK를 사용하여 USDT를 예로 들어 ERC 20 토큰을 프로그래밍 방식으로 전송하는 방법에 대해 설명합니다. Kaia SDK는 개발자가 다양한 프로그래밍 환경에서 Kaia 노드와 상호 작용할 수 있도록 도와주는 ethers-ext, web3js-ext, viem-ext, web3j-ext 및 web3py-ext를 포함한 라이브러리 모음입니다.

이 가이드는 스마트 컨트랙트 호출을 통해 USDT 토큰을 전송하기 위해 이더 익스체인지 SDK를 사용하는 방법에 중점을 두고 있습니다.

## 전제 조건

- 메타마스크](https://metamask.io/download) 계정(이 예제에서는 개발자 계정이 사용됨)
- [Faucet](https://faucet.kaia.io)에서 테스트 KAIA를 받으세요.

## 1단계: 프로젝트 설정 및 ethers-ext 및 ethers.js 설치하기

```bash
mkdir send-usdt-kaiasdk
cd  send-usdt-kaiasdk
npm init -y  
npm install --save @kaiachain/ethers-ext ethers@6 dotenv
```

## 2단계: 공급자 및 지갑 인스턴스 설정하기

'index.js'라는 새 파일을 만들고 아래 코드를 붙여넣습니다.

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

## 3단계: USDT 컨트랙트 인스턴스 생성

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

## 4단계: 토큰 보내기

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

**전체 코드**

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

터미널에서 `node index.js`를 실행하여 트랜잭션이 실행되는 것을 확인합니다.

![](/img/build/tutorials/send-usdt-kaiasdk.png)