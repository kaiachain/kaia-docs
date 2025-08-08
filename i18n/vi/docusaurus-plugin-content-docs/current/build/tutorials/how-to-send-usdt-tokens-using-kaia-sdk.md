# Cách gửi token ERC-20 bằng SDK Kaia (Ví dụ với USDT)

## Tổng quan

Trong hướng dẫn này, bạn sẽ học cách gửi token ERC-20 một cách lập trình bằng cách sử dụng USDT làm ví dụ trên blockchain Kaia với SDK ethers-ext. Kaia SDK là bộ sưu tập các thư viện bao gồm ethers-ext, web3js-ext, viem-ext, web3j-ext và web3py-ext, giúp các nhà phát triển tương tác với các nút Kaia trên các môi trường lập trình khác nhau.

Hướng dẫn này tập trung vào việc sử dụng SDK ethers-ext để gửi token USDT thông qua một cuộc gọi hợp đồng thông minh.

## Điều kiện tiên quyết

- Một tài khoản MetaMask (https://metamask.io/download) (tài khoản phát triển được sử dụng trong ví dụ này)
- Nhận mã KAIA từ [Faucet](https://faucet.kaia.io)

## Bước 1: Thiết lập dự án và cài đặt ethers-ext và ethers.js

```bash
mkdir send-usdt-kaiasdk
cd  send-usdt-kaiasdk
npm init -y  
npm install --save @kaiachain/ethers-ext ethers@6 dotenv
```

## Bước 2: Cấu hình Nhà cung cấp và Ví

Tạo một tệp mới có tên `index.js` và dán mã bên dưới vào tệp đó.

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

## Bước 3: Tạo thực thể hợp đồng USDT

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

## Bước 4: Gửi Tokens

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

**Mã nguồn đầy đủ**

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

Chạy lệnh `node index.js` trong terminal để xem giao dịch của bạn được thực thi.

![](/img/build/tutorials/send-usdt-kaiasdk.png)