---
sidebar_label: Web3Auth
---

# Integrate Web3Auth into a dApp

![](/img/banners/kaia-web3Auth.png)

## Introduction

[Web3Auth](https://web3auth.io/docs/) is a wallet infrastructure that is plugged into dApps or wallets. It serves as a pluggable authentication infrastructure for web3 wallets and applications. With Web3Auth's excellent user excellence, both mainstream and crypto natives may be onboarded in a matter of minutes.

As a wallet infrastructure, it provides out-of-the-box support for all social logins, web and mobile native platforms, wallets, and other key management methods. By the end of this guide, you will have integrated Web3Auth into your decentralized web application built on the Kaia Network. To integrate Web3Auth into other platforms (Android, iOS, React Native, Flutter, & Unity), kindly refer to this [guide](https://web3auth.io/docs/pnp/introduction). 

## Prerequisite

* A working react project (by executing `npx create-react-app project-name`)
* Install the necessary wallets ([Coinbase Wallet](https://www.coinbase.com/wallet/downloads), [Metamask](https://metamask.io/download/)). 
* RPC Endpoint: you can get this from one of the supported [endpoint providers](../../../../references/service-providers/public-en.md).
* Test KAIA from [Faucet](https://baobab.wallet.klaytn.foundation/faucet): fund your account with sufficient KAIA.
* Get your Client ID from [Web3Auth Dashboard](https://dashboard.web3auth.io/).

## Installation

To make use of Web3Auth in your dApp, you must install the required libraries and SDK first. Hence, you'll need to set up ethers.js, and the Web3Auth Web SDK. You can use Web3Auth together with either [ethers.js](https://docs.ethers.org/v6/) or [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html) libraries to communicate with the Kaia blockchain. We'll be using ethers.js throughout this guide.

```bash
npm install --save @web3auth/modal
npm install --save ethers	
```

## Initializing Web3Auth and Provider Instance

After successfully installing the needed libraries, next is to initialize the Web3Auth instance, set the Web3Auth provider instance in a useState() hook and also the init() function in a useEffect() hook.

```js
import { Web3Auth } from "@web3auth/modal";
import { ContractFactory, ethers } from "ethers";
import { useState, useEffect } from "react";

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

useEffect(() => {

    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: "YOUR_WEB3AUTH_CLIENT_ID", // get it from Web3Auth Dashboard
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: "eip155",
	        // modify if mainnet => “0x2019”
            chainId: "0x3e9", // hex of 1001, Kaia Kairos testnet. 
            rpcTarget: "https://public-en-baobab.klaytn.net", // modify if mainnet
            displayName: "Kaia Testnet", //  modify if mainnet
            blockExplorer: "https://baobab.klaytnscope.com", // modify if mainnet
            ticker: "KAIA",
            tickerName: "KAIA",
          },
        })
        setWeb3auth(web3auth);
        await web3auth.initModal();
        setProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };
    init();
}, []);
```

## Connecting Wallet

Inside your App function in your `App.js` file, call the [connect()](https://web3auth.io/docs/sdk/web/no-modal/usage#logging-in-the-user) method on the web3Auth instance to initiate the connection of your wallet. 

```js
const connectWallet = async() => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    console.log(web3authProvider);
}
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>  
    </div>
  );
```

![](/img/build/tools/web3Auth.png)

## Setting up Utils function

In this guide, we will be making use of utils function: `truncateAddress()`. The truncateAddress() function takes in a valid address and returns a more readable format of the address passed in. The following steps below show how to set up and use the utils function in your project.

**Step 1**: Create a `utils.js` file in the `src` root folder.

Paste the following code in the newly created utils.js file.

```js
export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };
```

**Step 2**: Import the function in your `App.js` file.

```js
import { truncateAddress } from "./utils";
```

## Getting Account and balance

Having connected your wallet successfully by calling the `connect()` method on the Web3Auth instance, you can get the user account and its balance by using the provider and signer object. 

```js
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

 const connectWallet = async() => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(web3authProvider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3authProvider);
    const ethersProvider = new ethers.BrowserProvider(web3authProvider);

    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address =   signer.address;

    // Get user's balance in ether
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address) // balance is in wei
    );

    setAddress(address);
    setBalance(balance);

return (
    <div className="App">
        <button onClick={connectWallet}>Connect Wallet</button>  
        <div>Wallet Address: ${truncateAddress(address)} Balance: ${balance}</div>
    </div>
  );
}
```

## Disconnecting Wallet

Disconnecting from the wallet is achieved by using the [logout()](https://web3auth.io/docs/sdk/web/no-modal/usage#logging-out-the-user) method on the Web3Auth instance. Also, one good practice is to refresh the state to clear any previously stored connection data.

```js
function App() {
    
const disconnect = async () => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  refreshState();
}

// refresh state
const refreshState = () => {
  setAddress();
  setBalance();
// make sure to add every other useState modifier function declared here.
}
  
return (
    <div className="App">
        <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

## Switching Chains

To switch chains using Web3Auth, you must firstly add the desired chain config to a connected adapter by calling the [addChain()](https://web3auth.io/docs/sdk/web/no-modal/usage#add-chain) method, then proceed to calling the [switchChain()](https://web3auth.io/docs/sdk/web/no-modal/usage#switch-chain) method.  

```js
const switchChain = async () => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  // add chain - Kaia Mainnet
  await web3auth.addChain({
    chainId: "0x2019",
    displayName: "Kaia Mainnet",
    chainNamespace: "eip155",
    tickerName: "KAIA",
    ticker: "KAIA",
    decimals: 18,
    rpcTarget: "https://public-en-cypress.klaytn.net",
    blockExplorer: "https://klaytnscope.com",
  });
  // switch chain
  await web3auth.switchChain({chainId: "0x2019"});
}


return (
    <div className="App">
    	<button  onClick={switchChain}>Switch Chain</button>
    </div>
);
```

## Getting User Info
A unique feature of Web3Auth is social logins. Once a user login using their social platforms, Web3Auth instance returns some information about the logged in user. Getting the logged in user information is as simple as calling the getUserInfo() method on the Web3Auth instance.

```js
 // add to the existing useState hook.
  const [userData, setUserData] = useState({});
	
   const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    setUserData(user);
};

 return (
    <div className="App">
        <button onClick={getUserInfo}>Get User Info</button>  
        <div> { userData ? `User Email: ${userData.email}, User Name: ${userData.name}` :  ""} </div>
    </div>
  );
```

## Signing Messages

Having initialised the provider and signer object, users can sign an arbitrary string. 

```js
 // add to the existing useState hook.
const [signedMessage, setSignedMessage] = useState("");

const signMessage = async(e) => {
  e.preventDefault();
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }

  // this guide uses ethers version 6.3.0.
  const ethersProvider = new ethers.BrowserProvider(provider);
  // for ethers version below 6.3.0.
  // const provider = new ethers.providers.Web3Provider(provider);

  const signer = await ethersProvider.getSigner();

  const originalMessage = e.target.message.value;
  const result = await signer.signMessage(originalMessage);
  setSignedMessage(result)  
}


return (
    <div className="App">
        <form onSubmit={signMessage}>
                <input type="text" name="message" placeholder="Set message" required/>
                <input type="submit" value="Sign Message"/>
        </form> 
        <div>SignedMessage: ${signedMessage}</div>
    </div>
  );

```

## Sending Native Transaction

You can perform native transactions, like sending KAIA from one user to another.

```js
    // add to the existing useState hook.
    const [txHash, setTxHash] = useState();

    const sendKaia = async () => {
    
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const destination = "paste recipient address";

      // this guide uses ethers version 6.3.0.
      const ethersProvider = new ethers.BrowserProvider(provider);
      // for ethers version below 6.3.0.
      // const provider = new ethers.providers.Web3Provider(provider);

      const signer = await ethersProvider.getSigner();
        
      // Submit transaction to the blockchain and wait for it to be mined
      const tx = await signer.sendTransaction({
          to: destination,
          value: ethers.parseEther("0.1"),
          maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
          maxFeePerGas: "6000000000000", // Max fee per gas
        })
    
      
      const receipt = await tx.wait();
      setTxHash(receipt.hash)
}

return (
    <div className="App">
        <button onClick={sendKlay}>Send Klay</button>
        <div>Send-Kaia Tx Hash :  {txHash ? <a href={`https://baobab.klaytnscope.com/tx/${txHash}`} target="_blank">Kaiascope</a> :  ' ' } </div>
    </div>
);

```

## Working with a Smart Contract

### 1. Deploying a Contract

You can deploy a smart contract given its Application Binary Interface(ABI) and its contract byte code. 

```js
// add to the existing useState hook.
const [contractAddress, setContractAddress] = useState(null);

const deployContract = async () => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
// this guide uses ethers version 6.3.0.
const ethersProvider = new ethers.BrowserProvider(provider);
// for ethers version below 6.3.0.
// const provider = new ethers.providers.Web3Provider(provider);

const signer =  await ethersProvider.getSigner();

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

  const contractFactory = new ContractFactory(contractABI, contractBytecode, signer);

  const contract = await contractFactory.deploy(400);
  
  // get contract address
  setContractAddress(contract.target)
}


return (
    <div className="App">
        <button onClick={deployContract}>Deploy Contract</button>  
        <div>Contract Address: {contractAddress ? contractAddress : ''} </div>
    </div>
  );
```

With the Web3Auth provider and signer object, you can make contract interactions such as writing to and reading from a smart contract deployed on the blockchain.

### 2. Writing to a Contract

```js
  // add to existing useState hook
  const [contractTx, setContractTx] = useState();

  const writeToContract = async (e) => {
    e.preventDefault();
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
  
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(provider);

    const signer = await ethersProvider.getSigner();
  
    // Paste your contractABI
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
  
    // Wait for the transaction to finish
    const receipt = await tx.wait();
    const result = receipt.hash;
  
    setContractTx(result)
  }

return (
    <div className="App">
        <form onSubmit={writeToContract}>
            <input  name="store_value" placeholder="Set contract value" required/>
            <input  type="submit" value="Store"/>
        </form> 
        <div>Write-to-contract Tx Hash: ${contractTx}</div>
    </div>
);
```

### 3. Reading from a Contract

```js
// add to existing useState hook
 const [contractMessage, setContractMessage] = useState();

  const readFromContract = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
  	
	
   // this guide uses ethers version 6.3.0.
   const ethersProvider = new ethers.BrowserProvider(provider);
   // for ethers version below 6.3.0.
   // const provider = new ethers.providers.Web3Provider(provider);
  
   // paste your contract ABI
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
  
     // paste your contract address
    const contractAddress = "0x3b01E4025B428fFad9481a500BAc36396719092C"; 
  
    const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider)
  
    // Reading a message from the smart contract
    const contractMessage = await contract.retrieve();
    setContractMessage(contractMessage.toString())
  }


  return (
    <button onClick={readFromContract}>Read From Contract</button> 
    <div>Read-from-contract Message: ${contractMessage}</div>
  )
```

## TroubleShooting

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```
This error occurs when you use webpack version 5. In this version, NodeJS polyfills is no longer supported by default. To solve this issue, refer to this [guide](https://web3auth.io/docs/troubleshooting/webpack-issues).

## Next Step
For more in-depth guides on Web3Auth, please refer to the [Web3Auth Docs](https://web3auth.io/docs/connect-blockchain/klaytn) and [Web3Auth Github repository](https://github.com/web3auth). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/klaytn/examples/tree/main/tools/wallet-libraries/web3Auth-sample).










