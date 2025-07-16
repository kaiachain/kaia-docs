---
sidebar_label: Web3Modal
---

# Integrate Web3Modal into a dApp

![](/img/banners/kaia-web3Modal(wc).png)

## Introduction

[Web3Modal](https://docs.walletconnect.com/2.0/web3modal/about) is a simple-to-use library that helps developers add support for multiple providers in their dApps with a simple, customizable configuration. It makes connecting wallets, performing transactions, and managing accounts easy. 

In this guide, you will use the web3Modal library to integrate multiple wallets such as Kaia Wallet, Klip, Metamask, Coinbase Wallet, etc. into your dApp built on the Kaia Network.

## Prerequisite

* A working react project (by executing `npx create-react-app project-name`)
* Install the necessary wallets ([Kaia Wallet](https://www.kaiawallet.io/en_US/), [Coinbase Wallet](https://www.coinbase.com/wallet/downloads), and [Metamask](https://metamask.io/download/)). 
* RPC Endpoint: you can get this from one of the supported [endpoint providers](../../../../references/public-en.md).
* Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.

## Setting up Web3Modal and Wallet Provider Options

**Step 1**: Installing Web3Modal and an Ethereum library

Install web3Modal and your preferred library for interacting with the blockchain. In this tutorial, we will be installing [@klaytn/web3modal](https://github.com/klaytn/klaytn-web3modal) which was derived from [Web3Modal](https://github.com/WalletConnect/web3modal) and modified to add Kaia Wallet and Klip wallet. Also, this tutorial will use ethers.js to interact with the Kaia blockchain.

```bash
npm install @klaytn/web3modal
npm install --save ethers
```

**Step 2**: Instantiating Web3Modal with wallet provider options

Install the wallet providers of your choice. Here we install Kaia Wallet, Klip and Coinbase wallet providers.

```bash
npm install --save @coinbase/wallet-sdk
npm install --save @klaytn/kaikas-web3-provider
npm install --save @klaytn/klip-web3-provider
```
In your `App.js` file, import CoinbaseWalletSDK, KaikasWeb3Provider, and KlipWeb3Provider, and instantiate the various provider options to integrate with your dapp.

```js
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { KaikasWeb3Provider } from "@klaytn/kaikas-web3-provider";
import { KlipWeb3Provider } from "@klaytn/klip-web3-provider";

export const providerOptions = {
 coinbasewallet: {
   package: CoinbaseWalletSDK, 
   options: {
     appName: "Web 3 Modal Demo",
     infuraId: process.env.INFURA_KEY 
   }
 },
 walletconnect: {
   package: WalletConnect, 
   options: {
     infuraId: process.env.INFURA_KEY 
   }
 }
};
const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK, // required
    options: {
      appName: "Web3Modal Kaia dApp", // required
      infuraId: "NFURA_KEY", // required
      rpc: "https://public-en.node.kaia.io", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1001, // Optional. It defaults to 1 if not provided
      darkMode: false // Optional. Use dark theme, defaults to false
    }
  },
  klip: {
    package: KlipWeb3Provider, //required
    options: {
        bappName: "Web3Modal Kaia dApp", //required
        rpcUrl: "https://public-en.node.kaia.io" //required
    }
},
  kaikas: {
    package: KaikasWeb3Provider // required
  }
};
```

**Step 3**: Instantiate web3modal

Then, instantiate Web3Modal by passing in the provider options.

```js
import Web3Modal from "@klaytn/web3modal";
const  web3Modal = new Web3Modal( {
    cacheProvider: true,
    providerOptions,
  } )
```

## Establishing Wallet Connection

To establish a connection to the user’s wallet, call the `connect()` method on the Web3Modal instance. We recommend you to wrap this operation around an async function and store the retrieved provider in your state to reuse throughout the app.

```js
import { ethers } from 'ethers';
import { useState } from 'react';

function App() {
  const [provider, setProvider] = useState();

  const connectWallet = async () => {
    try {

    const web3ModalProvider = await web3Modal.connect();
	
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(web3ModalProvider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3ModalProvider);
      setProvider(web3ModalProvider);
    } catch (error) {
      console.error(error);
    }
  };
  
 return (
   <div className="App">
       <button onClick={connectWallet}>Connect Wallet</button>  
   </div>
 );
}
```

![](/img/build/tools/web3Modal.png)

## Setting up Utils function

In this guide, we will be making use of the utils functions such as `truncateAddress()` and `toHex()`. The `truncateAddress()` function takes in a valid address and returns a more readable format of the address passed in. While the `toHex()` function converts numbers to hexadecimal.  The following steps below show how to set up and use the utils function in your project.

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

  export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };
```

**Step 2**: Import the functions in your `App.js` file.

```js
import { truncateAddress, toHex } from "./utils";
```

## Accessing connection, account, network information

As it is, Web3Modal does not provide built-in support for Ethereum interactions, such as retrieving connected accounts and network data. Note that to read the user’s address or connected network ID, you must directly request the information from your Ethereum library. In this guide, we’ll be getting that information using ethers.js. One way is to fetch and store this data is when connecting your user to your dapp.

```js
const [provider, setProvider] = useState();
const [account, setAccount] = useState();
const [chainId, setChainId] = useState();

const connectWallet = async () => {
  try {
    const web3ModalProvider = await web3Modal.connect();

    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(web3ModalProvider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3ModalProvider);

    const accounts = await ethersProvider.listAccounts();
    const network = await ethersProvider.getNetwork();

    setProvider(provider);
    if (accounts) setAccount(accounts[0]);
    setChainId(network.chainId.toString());
  } catch (error) {
    console.error(error);
  }
};

return (
  <div className="App">
       <button onClick={connectWallet}>Connect Wallet</button>
       <div>Connected To Chain ID: ${chainId}</div>
       <div>Wallet Address: ${truncateAddress(account)}</div>
  </div>
);
```

## Disconnecting Wallet

Disconnecting from the wallet is achieved by using the `clearCachedProvider()` method on the web3Modal instance. Also, one good practice is to refresh the state to clear any previously stored connection data.

```js
function App() {
    
const disconnect = async () => {
    await web3Modal.clearCachedProvider();
      refreshState();
  };

// refresh state
const refreshState = () => {
  setAccount();
  setChainId();
// make sure to add every other state variable declared here.
}
  
  return (
    <div className="App">
          <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

It's important to keep in mind that the dApp state changes as users interact with it, and it's best practice to subscribe to the events that are released in response. Create useEffect hooks with subscriptions to these events so they can respond appropriately to changes.

```js
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts);
      };
  
      const handleChainChanged = (chainId) => {
        setChainId(chainId);
      };
  
      const handleDisconnect = () => {
        disconnect();
      };
  
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);
  
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);
```

## Switch Networks or Add Custom Networks

As established previously, Web3Modal does not have built-in support for Ethereum interactions. In order to add or switch networks, you must directly make a request (via EIP-3085 or EIP-3326) to your Ethereum library. Here is an example of requesting to switch networks and adding the network as a fallback if it is not already present on the user’s wallet:

```js
  const switchNetwork = async () => {
    if (!provider) return;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(8217) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: toHex(1001),
                chainName: "Kairos Testnet",
                rpcUrls: ["https://public-en-kairos.node.kaia.io"],
                blockExplorerUrls: ["https://kairos.kaiascan.io/"],
              },
            ],
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };

return (	
    <div className="App">
        <button onClick={switchNetwork}>Switch Network</button>  
    </div>
) 
```

## Signing Messages

Having initialised the provider and signer object, users can sign an arbitrary string. 

```js
 // add to the existing useState hook.
const [signedMessage, setSignedMessage] = useState("");

const signMessage = async(e) => {
 e.preventDefault()
    if (!provider) return;
      try {
      const signature = await provider.request({
        method: "personal_sign",
        params: [message, account]
      });

    setSignedMessage(signature);
 
    } catch (error) {
      console.log(error);
    }
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
    if (!provider) return;
      const destination = “paste recipient address”;

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
        <div>Send-Kaia Tx Hash :  {txHash ? <a href={`https://kairos.kaiascan.io/tx/${txHash}`} target="_blank">KaiaScan</a> :  ' ' } </div>
    </div>
);
```

## Working with a smart contract

With the Web3Modal provider and signer object, you can make contract interactions such as writing to and reading from a smart contract deployed to the blockchain.

### 1. Writing to a Contract

```js
// add to existing useState hook
  const [contractTx, setContractTx] = useState();

  const writeToContract = async (e) => {
    e.preventDefault();
    if (!provider) return;

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
  
    // Send transaction to smart contract to update message
    const tx = await contract.store(value);
  
    // Wait for transaction to finish
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
)
```

### 2. Reading from a contract

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
    <div className="App">
        <button onClick={readFromContract}>Read From Contract</button> 
        <div>Read-from-contract Message: ${contractMessage}</div>
    </div>

  )
```

## TroubleShooting

**Node fs error, add browser \{fs: false\} to package.json**

```bash
Node fs error, add browser {fs: false} to package.json
```

This occurs when you install Klip-web3-provider.  To fix this issue,  follow these steps:

**Step 1**: Open up and navigate to your node_modules folder. Look for the @Kaia/klip-web3-provider folder and navigate to it's package.json file as shown below:

> **@klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.json** 
 
**Step 2**: Paste the code below in @klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.json file.

```js
"browser": {
        "fs": false
     },
```

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

This error occurs when you use webpack version 5. In this version, NodeJS polyfills is no longer supported by default. To solve this issue, refer to this [guide](https://web3auth.io/docs/troubleshooting/webpack-issues).

## Next Step

For more in-depth guides on Web3Modal, please refer to [Web3Modal Docs](https://docs.walletconnect.com/2.0/web3modal/about) and [Web3Modal Github repository](https://github.com/klaytn/klaytn-web3modal). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/web3Modal-sample).



