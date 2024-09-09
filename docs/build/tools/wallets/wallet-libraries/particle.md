---
sidebar_label: Particle Network
---

# Integrate Particle Network into a dApp

![](/img/banners/kaia-particle.png)

## Introduction

[Particle Network](https://particle.network)'s Wallet Abstraction services enable universal, Web2-adjacent onboarding and interactions. Its core technology, [Smart Wallet-as-a-Service](https://blog.particle.network/announcing-our-smart-wallet-as-a-service-modular-stack-upgrading-waas-with-erc-4337) (WaaS) aims to onboard users into MPC-secured smart accounts supporting any chain. It also allows developers to offer an improved user experience through modular, fully customizable EOA/AA embedded wallets. Particle supports its Smart Wallet-as-a-Service through a Modular L1 powering chain abstraction, acting as a settlement layer across chains for a seamless multi-chain experience.

Through APIs and SDKs available on both mobile and desktop platforms, developers can integrate Particle’s Wallet-as-a-Service across a variety of scenarios, with the capacity to be customized and implemented in a way that matches the specific needs of a given application.

To leverage Particle Network on alternative platforms, such as Android, iOS, React Native, Flutter, & Unity, kindly refer to Particle’s [documentation](https://developers.particle.network/reference/introduction-to-api-sdk-reference).

## Prerequisites

* A working react project (by executing `npx create-react-app project-name`)
* A project ID, client key, and app ID from the [Particle dashboard](https://dashboard.particle.network).
* A WalletConnect project ID from the [WalletConnect dashboard](https://cloud.walletconnect.com/).

## Installation

To leverage Particle Network, specifically Particle Connect, within your dApp, you'll need to first install the required libraries. In addition to this, if you'd like to use a standard Web3 library, such as [ethers.js](https://docs.ethers.org/v6/) or [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html), then you'll need to install theme too. For  this guide, we'll be using ethers.js.

```bash
npm install --save @particle-network/connectkit
npm install --save @particle-network/chains
npm install --save @particle-network/connectors
npm install --save ethers	
```

## Initializing Particle Connect

After successfully installing the aforementioned libraries, you'll need to head into your `index.js` (or `.ts`) file to configure Particle Connect. This specifically entails wrapping your `App` component with `ModalProvider` (imported from `@particle-network/connectkit`) and passing in `options`, which contains the parameters detailed below.

```js
import { ModalProvider } from '@particle-network/connectkit';
import { Kaia, KaiaTestnet } from '@particle-network/chains';
import { evmWallets } from '@particle-network/connectors';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ModalProvider
            options={{
                projectId: 'replace with your projectId',
                clientKey: 'replace with your clientKey',
                appId: 'replace with your appId',
                chains: [
                    KaiaTestnet, Kaia
                ],
                wallet: {    // optional: Wallet modal configuration
                    visible: true, // Display wallet modal
                    supportChains:[
                        KaiaTestnet, Kaia
                    ],
                    customStyle: {}, // optional: Custom wallet style
                },
                promptSettingConfig: { // optional: particle security account config
                    // Prompt to set payment password upon social login. 0: None, 1: Once(default), 2: Always
                    promptPaymentPasswordSettingWhenSign: 1,
                    // Prompt to set master password upon social login. 0: None(default), 1: Once, 2: Always
                    promptMasterPasswordSettingWhenLogin: 1
                },
                connectors: evmWallets({ 
                    projectId: 'replace with your walletconnect projectId',
                    showQrModal: false
                 }),
            }}
            theme={'light'}
            language={'en'}   // optional：Local language setting, default en
            walletSort={['Particle Auth', 'Wallet']} // optional：Order of wallet categories
        >
            <App />
        </ModalProvider>
    </React.StrictMode>
);
```

## Connecting Wallet

With your `index.js` file setup, you can move onto connecting your users through a central "Connect Wallet" button. To do this, you can import `ConnectButton` from `@particle-network/connectkit` alongside its corresponding css. Upon using `ConnectButton` within your `App` component, a standard "Connect Wallet" button will appear to facilitate connection.

```js
import '@particle-network/connectkit/dist/index.css';
import { ConnectButton } from '@particle-network/connectkit';

export const App = () => {
	return <ConnectButton />;
};
```


## Getting Account and Balance

With a wallet now successfully connected through `ConnectButton`, you can retrieve the users associated Kaia address. Additionally, you can retrieve its current balance (in KAIA) through ethers.js, passing in the corresponding EIP-1193 provider object retrieved from `useParticleProvider` within `@particle-network/connectkit`.

```js
import { useParticleProvider } from '@particle-network/connectkit';

const provider = useParticleProvider();

const [address, setAddress] = useState("");
const [balance, setBalance] = useState("");

const getWalletAndBalance = async() => {
	// this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3authProvider);

    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.address;

    // Get user's balance in ether
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address) // balance is in wei
    );

    setAddress(address);
    setBalance(balance);

return (
    <div className="App">
        <button onClick={getWalletAndBalance}>Get Wallet Account and Balance</button>  
        <div>Wallet Address: ${address} Balance: ${balance}</div>
    </div>
  );
}
```

## Disconnecting Wallet

Once a user has logged in, you can programmatically force a logout through `disconnect` derived from `useParticleConnect`. This will disconnect the current active session from your dApp, returning the user to their initial state.

```js
import { useParticleConnect } from '@particle-network/connectkit';

const { disconnect } = useParticleConnect();

function App() {
    
const disconnectUser = async () => {
  await disconnect();
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
        <button onClick={disconnectUser}>Disconnect</button>
    </div>
  );
}
```

## Getting User Info

While traditional Web3 wallets are offered as connection mechanisms through Particle Connect, social logins through social accounts such as your email address, Google account, phone number, etc. are also available. If a user decides to log in with a Web2 account, you'll have the ability to call `getUserInfo` from `@particle-network/auth-core`, which will return an object containing key details such as their name, email, wallet addresses, etc.

```js
import  { getUserInfo }  from  '@particle-network/auth-core';

const [userData, setUserData] = useState({});
	
const getUserInfo = async () => {
    const user = getUserInfo();
    setUserData(user);
};

return (
    <div className="App">
        <button onClick={getUserInfo}>Get User Info</button>  
        <p> User Email: { userData ? ` ${userData.google_email}` :  "Nil"} </p>
    </div>
  );
```

## Signing Messages

With a provider initialized (through `useParticleProvider`) and passed into your ethers.js instance, message signing can be initiated as usual through `signer.signMessage`.This will directly display a signature popup for the user to confirm. Its specific nature will depend on which connection mechanism the user chose.

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

Similar to `signer.signMessage`, you can use the same provider mechanism to send a native transaction, with KAIA in this case. This can be done through `signer.sendTransaction`, passing in standard fields such as `to`, `value`, and so on.

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
        <div>Send-Kaia Tx Hash :  {txHash ? <a href={`https://kairos.kaiascope.com/tx/${txHash}`} target="_blank">Kaiascope</a> :  ' ' } </div>
    </div>
);

```

## Working with a Smart Contract

### 1. Deploying a Contract

More complex transactions, such as contract deployments, are also possible through Particle, whether you're using an external Web3 wallet or the included social login embedded wallet. An example of this is shown below.

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

Similarly, you can send write transactions directly to an existing (deployed) contract using the same ethers.js instance leveraging the Particle Connect provider derived from `useParticleProvider`. On the frontend, this functionality will mimic that of a contract deployment, message signature, or transaction request.

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

Without using the wallet itself, purely the provider, read-only methods can be called on contracts through a standard ethers.js instance. This mechanism won't deviate from the typical structure associated with such an action, the primary difference here is the usage of the integrated `provider` object.

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

## Next Steps

For additional guides regarding Particle Network (Particle Connect, Particle Auth, and other SDKs), please refer to the [Particle Network docs](https://developers.particle.network) and the [Particle Network GitHub account](https://github.com/Particle-Network). Additionally, you may want to visit the [Particle Network blog](https://blog.particle.network) for additional information on Particle Network's services, upcoming releases, and tech stack. Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/particle-sample).
