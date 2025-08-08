---
sidebar_label: Privy
---

# Integrate Privy into a dApp

![](/img/banners/kaia-privy.png)

## Introduction

[Privy](https://docs.privy.io/) is a simple wallet toolkit for progressive authentication in web3. With Privy, developers can onboard users using traditional and web3 authentication methods, enabling progressive onboarding to boost user conversion. 

In this guide, you will use Privy wallet toolkit to integrate external wallets such as Metamask, Coinbase Wallet, and social logins such as Google, Twitter, Email  into your dApp built on the Kaia Network.


## Prerequisite

* A working Next.js project. You can clone this [create-next-app](https://github.com/privy-io/create-next-app) template provided by Privy to follow along in this tutorial. 
* An [appID](https://docs.privy.io/guide/console/api-keys#app-id) from the [Privy developer console](https://console.privy.io/)

## Getting Started

The cloned template is a simple Next.js Privy Auth Starter template with three main core files: 

* **index.tsx**: this file handles the login authentication of users.
* **app.tsx**: this file handles the initialization of Privy SDK and wraps our components with a PrivyProvider.
*  **dashboard.tsx**: this is the page users are redirected to after logging in. It handles everything around testing each login method (Google, Twitter, Email, Wallets). More importantly for this guide, we will perform certain functionalities when connected using external wallets like MetaMask. These functionalities include:  getting user balance, sending KAIA to another account, deploying a contract, interacting with a smart contract.

## Installation

To make use of Privy in your dApp, you must install the required libraries and SDK first. Hence, you'll need to set up ethers.js, and the [Privy React Auth SDK](https://www.npmjs.com/package/@privy-io/react-auth). You can use Privy together with either [ethers.js](https://docs.ethers.org/v6/), [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html), [viem](https://viem.sh/) libraries to communicate with the Kaia blockchain. For the sake of this guide, we will use the ethers.js library. 

Open up your project folder and run the command below to install the required libraries and SDK:

```bash
npm install —save @privy-io/react-auth
npm install --save ethers
```

## Initializing Privy and Privy Provider

After successfully installing the needed libraries, next is to wrap your components with a [PrivyProvider](https://docs.privy.io/reference/react-auth/modules#privyprovider). 

The PrivyProvider should wrap any component that will use the Privy SDK. To do so, open up the _app.tsx file and paste the code below: 

```tsx
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {PrivyProvider} from '@privy-io/react-auth';
import {useRouter} from 'next/router';
function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Privy Auth Starter</title>
        <meta name="description" content="Privy Auth Starter" />
      </Head>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        onSuccess={() => router.push('/dashboard')}
      >
        <Component {...pageProps} />
      </PrivyProvider>
    </>
  );
}
export default MyApp;
```
It’s important to note that the Privy provider takes the following properties:

* Your `appID`, which needs to be updated in your .env file. You can get started with the following `test App ID: clpispdty00ycl80fpueukbhl` as provided by Privy for test purposes.
* An optional `onSuccess` callback which will execute once a user successfully logs in.
* An optional `createPrivyWalletOnLogin` boolean to configure whether you'd like your users to create embedded wallets when logging in.
* An optional config property to customize your onboarding experience.


## Connecting Wallet

Inside your LoginPage function in your `index.tsx` file, call the [login](https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface#login) method which opens the Privy login modal and prompts the user to login.

```ts
 import {usePrivy} from '@privy-io/react-auth';


 const {login} = usePrivy();
  return (
     <div>
        <button onClick={login}>
          Log in
        </button>
    </div>
  );
```

![](/img/build/tools/privy-connect-banner.png)

## Getting Account and Balance

From the previous step above, you'll realize we logged in by connecting our wallet. In this step, we will retrieve the user’s associated Kaia address. Additionally, you can retrieve its current balance (in KAIA) using ethers.js. 

In your dashboard.tsx file, paste the code below:

```tsx
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {usePrivy, useWallets} from '@privy-io/react-auth';
const {ready, authenticated} = usePrivy();
const {wallets} = useWallets();

useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

const [balance, setBalance] = useState("");
async function getBalance() {
  if (!authenticated) {
    console.log("user not authenticated yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider.getSigner();  
  // Get user's Ethereum public address
  const address =   await signer.getAddress();
  console.log(address);
  
  // Get user's balance in ether
  const balance = ethers.formatEther(
    (await provider.getBalance(address)).toString() // balance is in wei
  );
  console.log(balance);
  setBalance(balance);
}

return (
 {ready && authenticated ? (
      <div className=“App”>
        <button onClick={getBalance}>Get Balance</button>
        <p>{balance ? ` User with ${wallets[0].address} has ${balance} KAIA` : "None"}</p>
      </div>
) : null }
);
```

## Disconnecting Wallet

Disconnecting Wallet
Once a user has logged in, you can programmatically log the user out through the `logout` method derived from usePrivy. This will disconnect the current active session from your dApp, returning the user to their initial state.

```tsx
const { logout } = usePrivy();
  

return (
 {ready && authenticated ? (
    <div className="App">
        <button onClick={logout}>Logout</button>
    </div>
) : null }
  );
```

## Getting User Info
Privy offers users the comfort of connecting to a dApp using both web3 wallets and social logins. In the case where a user connects to a dApp using their social account such as twitter, discord, google account etc, you ll have the ability to call `user` from `usePrivy`, which will return an object containing key details such as their id, email, wallet addresses, etc.

```tsx
const  { user }  =  usePrivy();

return (
 {ready && authenticated ? (
    <div className="App"> 
        <div>
            <p>User object</p>
            <textarea value={JSON.stringify(user, null, 2)} rows={20} disabled/>
	    </div>
    </div>
) : null }
);
```

## Sending Native Transaction

You can perform native transactions, like sending KAIA from one user to another.

```tsx
const [klayTransferTx, setKlayTransferTx] = useState("");
async function sendTx() {
  if (!authenticated) {
    console.log("User not authenticated yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider?.getSigner()
  console.log(await signer.getAddress());
  const destination = "PASTE DESTINATION WALLET ADDRESS"
  
  const tx = await signer.sendTransaction({
    to: destination,
    value: ethers.parseEther("0.1"),
    maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
    maxFeePerGas: "6000000000000", // Max fee per gas
  })
const receipt = await tx.wait();
console.log(receipt);
setKlayTransferTx(receipt.transactionHash)
}

return (
 {ready && authenticated ? (
         <div className="mt-12 flex flex-col gap-5">
            <button onClick={sendTx}>Send Transaction</button>
            <p>{klayTransferTx ? `KAIA Successfully Transferred with: ${klayTransferTx} hash` : "No Tx yet"}</p>
        </div>
) : null }
);
```


## Working with a Smart Contract

### 1. Deploying a Contract

You can deploy a smart contract given its Application Binary Interface(ABI) and its contract byte code.

```tsx
// add to the existing useState hook.
const [contractAddress, setContractAddress] = useState("");

const deployContract = async () => {
  if (!authenticated) {
    console.log("privy not initialized yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider.getSigner();
  console.log(await signer.getAddress());
  
// paste your contractABI
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_initNum",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
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
  // Paste your contract byte code
  const contractBytecode = '608060405234801561001057600080fd5b506040516102063803806102068339818101604052810190610032919061007a565b80600081905550506100a7565b600080fd5b6000819050919050565b61005781610044565b811461006257600080fd5b50565b6000815190506100748161004e565b92915050565b6000602082840312156100905761008f61003f565b5b600061009e84828501610065565b91505092915050565b610150806100b66000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea26469706673582212200370e757ac1c15a024febfa9bf6999504ac6616672ad66bd654e87765f74813e64736f6c63430008120033'
  const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
  const contract = await contractFactory.deploy(1000);
  
  // get contract address
  setContractAddress(await contract.getAddress())
}

return (
 {ready && authenticated ? (
    <div className="App">
        <button onClick={deployContract}>Deploy Contract</button>
        <p >{contractAddress ? `Contract was Successfully deployed at: ${contractAddress}` : "No contracts deployed yet"}</p>
    </div>
) : null }
);
```


### 2. Writing to a Contract

```tsx
const [contractWriteTx, setContractTx] = useState("");
const writeToContract = async (e) => {
  e.preventDefault();
  if (!authenticated) {
    console.log("privy not initialized yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider.getSigner();
  
 const contractABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_initNum",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
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
    // Paste your contract address
    const contractAddress = "0x3b01E4025B428fFad9481a500BAc36396719092C"; 
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    const value = e.target.store_value.value;
  
    // Send a transaction to smart contract to update the value
    const tx = await contract.store(value);
    console.log(tx.hash);
    
  
    setContractTx(tx.hash);
}

return (
 {ready && authenticated ? (
    <div className="App">
        <form onSubmit={writeToContract}>
           	<input name="store_value" placeholder="Set contract value" required/>
            <input type="submit" value="Store"/>
        </form> 
        <div>Write-to-contract Tx Hash: ${contractWriteTx}</div>
    </div>
) : null }
);
```

### 3. Reading from a Contract
```tsx
const [readContractMessage, setContractMessage] = useState();
const readFromContract = async (e) => {
  e.preventDefault();
  if (!authenticated) {
    console.log("privy not initialized yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider.getSigner();
  
 const contractABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_initNum",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
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
  
     // Paste your contract address
     const contractAddress = "0x3b01E4025B428fFad9481a500BAc36396719092C"; 
     const contract = new ethers.Contract(contractAddress, contractABI, provider)
  
     // Reading a message from the smart contract
     const contractMessage = await contract.retrieve();
     setContractMessage(contractMessage.toString())
}

return (
 {ready && authenticated ? (
    <div className="App">
	    <button onClick={readFromContract}> Read Contract Message</button>
        <p>{readContractMessage ? `Message stored in contract is: ${readContractMessage}` : "No message from contract yet"}</p>
    </div>
) : null }
);
```
## Next Steps 

For more in-depth guides on Privy, please refer to the [Privy Docs](https://docs.privy.io/) and [Privy Github repository](https://github.com/privy-io). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/privy-auth-sample).