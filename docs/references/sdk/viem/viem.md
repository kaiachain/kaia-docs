# viem

![](/img/references/kaiaXviem.png)

[Viem](https://viem.sh/) is a typescript interface for Ethereum that provides low-level primitives for interacting with Ethereum and other EVM-Compatible blockchain. With kaia supporting features for [Ethereum Equivalence](https://medium.com/klaytn/using-ethereum-tools-in-klaytn-dc068d48de04), Ethereum tools such as viem can be used on kaia without any significant modifications. 

For that reason, developers can leverage this compatibility and use the viem library to interact with a kaia node.

In this guide, you'll learn how to use the viem library to read data from the blockchain, send a transaction, and interact with an existing contract on the kaia Network.

## Prerequisites

* Code-Editor: a source-code editor such as [VS Code](https://code.visualstudio.com/download).
* [Metamask](../../../build/tutorials/connecting-metamask.mdx#install-metamask): used to deploy the contracts, sign transactions and interact with the contracts.
* RPC Endpoint: you can get this from one of the supported [Endpoint Providers](../../public-en.md).
* Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.
* [NodeJS and NPM](https://nodejs.org/en/)
* [TS-node](https://www.npmjs.com/package/ts-node): used for running TypeScript scripts.


## Setup Project

To get started, you need to create a project directory to house the files to be created in this guide.

```bash
mkdir viem-example
cd viem-example
```

### 1. Install viem

To install viem run the following command in your terminal:

```bash
npm i viem
```

In this tutorial, we will create a bunch of scripts file to read data from the blockchain, send transactions, and also interact with existing smart contract. To get started, you need to know how to set up viem for each of your script files.

### 2. Set up Public Client & Transport

Firstly, you need to set up your Public [Client](https://viem.sh/docs/clients/intro) with a desired [Transport](https://viem.sh/docs/clients/intro) & [Chain](https://viem.sh/docs/chains/introduction). A Public Client is an interface to **public** [JSON-RPC API](https://docs.kaia.io/references/public-en/) methods such as retrieving block numbers, transactions, reading from smart contracts, etc through [Public Actions](https://viem.sh/docs/actions/public/introduction).

```ts
import { createPublicClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 

```

### 3. Set up Wallet Client and account

Secondly, you need to set a wallet client to interact with an account. With wallet client, you can perform actions such as retrieving accounts, executing transactions, signing messages, etc through [Wallet Actions](https://viem.sh/docs/actions/wallet/introduction).

```ts
import { createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
 
const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY HERE");
```


## Reading data from the blockchain

To read data from the blockchain, create a new `read.ts` file in your project folder by running this command:

```bash
touch read.ts
```

After creating this file, set up your public client as done in the **set up section** above. In this section, you will learn how to read data from the blockchain (e.g., blockNumber, KAIA balance).

To see this in action, paste the following code in your `read.ts`.


```ts
import { createPublicClient, http, formatEther } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 


async function getBlockNumber() {
    const blockNumber = await client.getBlockNumber() 
    console.log(`Current block number is: ${blockNumber}`);
}

async function getKlayBalance() {
  const balance = await client.getBalance({ 
    address: '0x75Bc50a5664657c869Edc0E058d192EeEfD570eb',
  })
  const formatBal = formatEther(balance);
  console.log(`Current KAIA balance is ${formatBal}`);  
}


getBlockNumber();
getKlayBalance();
```

**Output**

To run the script and read data from the blockchain, paste the following command in your terminal:

```
npx ts-node read.ts
```

If the transaction was successful, you'll see the block number and user’s KAIA balance in your terminal.

![](/img/references/viem-read.png)


## Sending a transaction to the blockchain
To send a transaction to the blockchain, create a new `send.ts` file in your project folder by running this command:

```bash
touch send.ts 
```

After creating this file, set up your wallet client as done in the **set up section** above. In this section, you will learn how to send a transaction to the blockchain (for example, send KAIA to an address).

To see this in action, paste the following code in your `send.ts`.

```ts
import { createWalletClient, http, parseEther } from 'viem'
import { klaytnBaobab } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY");


async function sendKlayToRecipient() {
  const hash = await walletClient.sendTransaction({ 
    account,
    to: "PASTE RECIPIENT ADDRESS",
    value: parseEther('0.01')
  })

  console.log(`Send KAIA tx hash is: ${hash}`);
}

sendKlayToRecipient();

```


**Output**

To run the script and send transaction to the blockchain, paste the following command in your terminal:

```
npx ts-node send.ts
```

If the transaction was successful, you'll see the transaction hash logged in your terminal.

![](/img/references/viem-send.png)


## Interacting with smart contracts

To interact with an existing smart contract on kaia, create a new `interact.ts` file in your project folder by running this command:

```bash
touch interact.ts
```

After creating this file, set up your public and wallet client as done in the **set up section** above. In this section, you will use viem to both:

* Read from the contract; and
* Write to a contract.

For the purpose of this guide, a simple_storage contract was compiled and deployed on [Remix IDE](https://remix.ethereum.org/). For that reason, we will read from this contract by calling the `retrieve` function, and also send a transaction to this contract by calling the `store` function.

### 1. Read from contract 

To read from the contract, we used [readContract](https://viem.sh/docs/contract/readContract#readcontract) method which Internally  uses a [Public Client](https://viem.sh/docs/clients/public) to call the [call action](https://viem.sh/docs/actions/public/call) with [ABI-encoded data](https://viem.sh/docs/contract/encodeFunctionData). To see this in action, paste the following code in your `interact.js`.

```ts
import { createPublicClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 


const abi =  [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


async function readFromContract() {
  const retrieve = await client.readContract({
    address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",  // Contract Address
    abi: abi,
    functionName: 'retrieve'
  })

  console.log(`Value read from contract is: ${retrieve}`);
}

```


### 2. Write to contract

To write to the contract, we used [writeContract](https://viem.sh/docs/contract/writeContract#writecontract) method which Internally uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [sendTransaction action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded data](https://viem.sh/docs/contract/encodeFunctionData). To see this in action, paste the following code in your `interact.js`.



```ts
import { createWalletClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
 
const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY");

const abi =  [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


async function writeToContract() {

  const { request } = await client.simulateContract({
    address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",  // Contract Address
    abi: abi,
    functionName: "store",
    account: account,
    args: [694n],
  })

  const hash = await walletClient.writeContract(request)

  console.log(`Hash from writing to a contract: ${hash}`);
}


writeToContract();
```

**Output**

To run the script and interact with smart contracts, paste the following command in your terminal: 

```bash
npx ts-node interact.ts
```


If the transaction was successful, you'll see the transaction hash and the value stored in your terminal. 

![](/img/references/viem-interact.png)

For more in-depth guide on viem, please refer to [viem docs](https://viem.sh/docs/getting-started). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/sdk-and-libraries-for-interacting-with-klaytn-node/viem).



