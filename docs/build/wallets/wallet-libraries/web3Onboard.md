---
sidebar_label: Web3-Onboard
---

# Integrate Web3-Onboard into a dApp

![](/img/banners/kaia-web3Onboard.png)

## Introduction

Leveraging a tool like [Web3-Onboard](https://onboard.blocknative.com/docs/overview/introduction), projects and developers may quickly integrate multiple wallets into their decentralized applications (dApps). With the help of Web3-Onboard, user onboarding has been simplified. Web3-Onboard does have different features, ranging from support for several wallets to the ability for users to connect their accounts to different chains or networks and receive real-time transaction notifications, et cetera.

In this guide, you will use Web3-Onboard library to integrate multiple wallets (such as Coinbase Wallet, Metamask, WalletConnect, etc.) into your dApp built on the Kaia Network.

## Prerequisite

* A working react project (by executing `npx create-react-app project-name`)
* Install the necessary wallets ([Coinbase Wallet](https://www.coinbase.com/wallet/downloads), [Metamask](https://metamask.io/download/)). 
* RPC Endpoint: you can get this from one of the supported [endpoint providers](../../../references/public-en.md).
* Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.

## Getting Started

Web3-Onboard as a chain-agnostic wallet library, supports all EVM-compatible networks and also provides the flexibility of adding new networks to the library. In this guide, we'll use Web3-Onboard to add the Kaia Mainnet and Kaia Testnet Kairos to our dApp. With that said, let’s get started integrating multi-wallet compatibility using Web3-Onboard into your dApp built on Kaia Network.

## Setting up Onboard and Wallet Modules

**Step 1**: Install @web3-onboard/core

```bash
npm i @web3-onboard/core 
```

**Step 2**: Import and Instantiate Wallet Modules

In this step, you can add as many wallets to be supported in your dApp using the wallet modules. But for this guide, you will add Coinbase Wallet, WalletConnect, Injected Wallets to your web3-Onboard implementation. Refer to this [docs](https://onboard.blocknative.com/docs/overview/introduction#wallet-modules) for a list of wallet modules that can be added to your dApp using Web3-Onboard.

```bash
npm install @web3-onboard/coinbase // Coinbase Wallet
npm install @web3-onboard/walletconnect // WalletConnect
npm install @web3-onboard/injected-wallets  // Used to connect to Metamask
```

In your `App.js` file, instantiate the wallet modules to integrate with your dApp. Note that each module has its own unique options parameters to pass in, such as a fallback JSON RPC URL or default chain ID.

```js
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];
```

**Step 3**: Install and import ethers

The Web3-Onboard provider can be used with libraries like [ethers.js](https://docs.ethers.org/v6/) and [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html). In this guide, we will use ethers.js to make Kaia blockchain calls like getting the user's account, fetch balance, sign transaction, send transaction, read from and write to the smart contract.

```bash
npm install --save ethers
```

In your `App.js` file, import the ethers package like this:

```js
import { ethers } from "ethers";
```

**Step 4**: Import and Setup Web3ReactProvider

In this step, you will instantiate Onboard with the created modules and a list of chains to be compatible with the library. Open up your `App.js` file and paste the code below:

```js
import Onboard from "@web3-onboard/core";
const ETH_MAINNET_RPC_URL = `Paste ETH RPC URL`;
const KAIA_MAINNET_URL = `Paste KAIA MAINNET URL`
const KAIROS_TESTNET_URL = `Paste KAIROS TESTNET URL`

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: "0x1", // chain ID must be in hexadecimal
      token: "ETH",
      namespace: "evm",
      label: "Ethereum Mainnet",
      rpcUrl: ETH_MAINNET_RPC_URL
    },
    {
      id: "0x2019", // chain ID must be in hexadecimal
      token: "KAIA",
      namespace: "evm",
      label: "Kaia Mainnet",
      rpcUrl: KAIA_MAINNET_URL
    },
    {
      id: "0x3e9", // chain ID must be in hexadecimel
      token: "KAIA",
      namespace: "evm",
      label: "Kairos Testnet",
      rpcUrl: KAIROS_TESTNET_URL
    },
   // you can add as much supported chains as possible
  ],
  appMetadata: {
    name: "Kaia-web3-onboard-App", // change to your dApp name
    icon: "https://pbs.twimg.com/profile_images/1620693002149851137/GbBC5ZjI_400x400.jpg", // paste your icon 
    logo: "https://pbs.twimg.com/profile_images/1620693002149851137/GbBC5ZjI_400x400.jpg", // paste your logo
    description: "Web3Onboard-Kaia",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});
```

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

## Connecting Wallet

Inside your App function in your `App.js` file, call the `connectWallet()` method on the onboard instance to initiate the onboard popup modal.

```js
function App() {
    const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
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

Once you click your Connect Wallet button, you should see a modal that allows you to seamlessly connect to Coinbase Wallet and other instantiated wallets from your dApp.

![](/img/build/tools/web3-Onboard.png)

## Disconnecting Wallet
Disconnecting a connected wallet can be achieved by calling the `disconnectWallet()` method on the onboard instance along with the label of the user's primary wallet. Also, one good practice is to refresh the state to clear any previously stored connection data.

```js
function App() {
    const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
    } catch (error) {
      console.error(error);
    }
  };
    
  const disconnect = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (primaryWallet) await onboard.disconnectWallet({ label: primaryWallet.label });
    refreshState();
  };

  // refresh state
  const refreshState = () => {
    setAccount("");
    setChainId("");
    setProvider();
    // make sure to add every other state declared here.
  };
  
  return (
    <div className="App">
           <button onClick={connectWallet}>Connect Wallet</button>  
          <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

## Accessing connection, account, network information

After successfully connecting your wallet, you can use the [onboard.state.get()](https://onboard.blocknative.com/docs/modules/core#get-current-state) method to fetch the state of your connection stored through the onboard instance. You can also fetch the state during the initial connection. Now you can modify the  connectWallet() method to return a list of wallet states that you can store in your state and use throughout the application.

**Step 1**:  import React's useState

```js
import { useState } from 'react';
```

**Step 2**: Modify code within your App function 

```js
function App() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts, chains, provider } = wallets[0];
      
      setProvider(provider);
      setAccount(accounts[0].address);
      setChainId(chains[0].id);
     
    } catch (error) {
      console.error(error);
    }
  };
  
  ...
  
  return (
    <div className="App">
        <div>
            { !account ? ( <button  onClick={connectWallet}> Connect Wallet</button> ) : (
                <button onClick={disconnect}>Disconnect</button>
            )}
        </div>
     		
        <div>Wallet Address: ${truncateAddress(account)}</div>
        <div>Network Chain ID: ${chainId}</div>
    </div>
  );
}
```

## Switching Networks

In order to prompt the user to switch networks in your dApps, Web3-Onboard provides a `setChain` method on an initialized instance of Onboard. Note that the target network must have been initialized with the onboard instance at the start of your application.

```js
const switchNetwork = async () => {
await onboard.setChain({ chainId: toHex(1001) });
};

return (
    <div className="App">
        <button onClick={switchNetwork}>Switch Network</button>
    </div>
)
```

## Sending Native Transaction

After successfully connecting to a wallet, you can store the provider object returned from the wallet connection in a state variable as done in connectWallet() function. You can therefore use this provider and signer object to send transactions to the blockchain. 

```js
 // add to the existing useState hook.
  const [txHash, setTxHash] = useState();

  const sendKaia = async () => {
    
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
	
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(provider);

    const signer = await ethersProvider.getSigner();

    // Submit transaction to the blockchain and wait for it to be mined
    const tx = await signer.sendTransaction({
          to: "0x75Bc50a5664657c869Edc0E058d192EeEfD570eb",
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

## Interacting with Smart Contracts

With the Web3-Onboard provider and signer object, you can make contract interactions such as writing to and reading from a smart contract deployed on the blockchain.

```js
// add to existing useState hook
  const [contractTx, setContractTx] = useState();
  const [contractMessage, setContractMessage] = useState();

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
  
    // const contract = new Contract(contractAddress, contractABI, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    const value = e.target.store_value.value;
  
    // Send transaction to smart contract to update message
    const tx = await contract.store(value);
  
    // Wait for transaction to finish
    const receipt = await tx.wait();
    const result = receipt.hash;
  
    setContractTx(result)
  }

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
  
    // const contract = new Contract(contractAddress, contractABI, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider)
  
    // Read message from smart contract
    const contractMessage = await contract.retrieve();
    setContractMessage(contractMessage.toString())
  }


  return (

    <div className="App">
         <form onSubmit={writeToContract}>
                  <input  name="store_value" placeholder="Set contract value" required/>
                  <input  type="submit" value="Store"/>
        </form> 
        <button onClick={readFromContract}>Read From Contract</button> 
        <div>Write-to-contract Tx Hash: ${contractTx}</div>
        <div>Read-from-contract Message: ${contractMessage}</div>
    </div>

  )
```

## Troubleshooting

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

This error occurs when you use webpack version 5. In this version, NodeJS polyfills is no longer supported by default. To solve this issue, refer to this [guide](https://web3auth.io/docs/troubleshooting/webpack-issues).

## Next Step

For more in-depth guides on Web3-Onboard, please refer to [Blocknative Docs](https://docs.blocknative.com/onboard) and [Blocknative Github repository](https://github.com/blocknative/onboard). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/web3Onboard-sample).