---
sidebar_label: Particle Network
---

# Integrate Particle Network into a dApp

![](/img/banners/kaia-particle.png)

## Introduction

[Particle Network](https://particle.network)'s Wallet Abstraction services enable universal, Web2-adjacent onboarding and interactions.

The [Particle Connect SDK](https://developers.particle.network/api-reference/connect/desktop/web) supports EVM-compatible chains, including Kaia and its testnet. While traditional Web3 wallets are offered as connection mechanisms through Particle Connect, social logins through social accounts such as your email address, Google account, phone number, etc. are also available. If a user decides to log in with a Web2 account, you'll have the ability to call `getUserInfo` from `@particle-network/auth-core`, which will return an object containing key details such as their name, email, wallet addresses, etc.

With Particle Network, developers on Kaia can embed social logins for the Kaia Mainnet and testnet, allowing users to generate and use a wallet within your application using only their Google, email, X, etc.

This page offers an overview and tutorial for implementing Particle Connect within a Kaia-based application, to help you start the integration process.

## Prerequisites

- A [Next.js project](https://nextjs.org/docs/getting-started/installation) set up with TypeScript and Tailwind CSS
  - You can create this by running: `npx create-next-app@latest`
- A project ID, client key, and app ID from the [Particle dashboard](https://dashboard.particle.network).

## Installation

To leverage Particle Network, specifically Particle Connect, within your dApp, you'll need to first install the required libraries. The Particle Connect SDK streamlines wallet creation, user login, and blockchain interactions with one interface. It supports both social and Web3 logins for easy access.

To install the SDK, along with Viem (backend for Connect) and ethers (demonstrating EIP-1193 providers), run:

```shell
yarn add @particle-network/connectkit viem@^2 ethers
```

## Initializing Particle Connect

To begin with, we’ll set up Particle Connect, Particle's flagship authentication SDK. Create a new file called `ConnectKit.tsx` in the root directory of your project. This file will house the `ParticleConnectKit` component, a wrapper for the configured `ConnectKitProvider` instance that serves as the primary interface for the configuration of Particle Connect (we'll go over what this looks like programmatically in a moment).

To leverage Particle Network on alternative platforms, such as Android, iOS, React Native, Flutter, & Unity, kindly refer to Particle’s [documentation](https://developers.particle.network/reference/introduction-to-api-sdk-reference).

- **`projectId`** – a unique identifier for your project.
- **`clientKey`** – a key specific to your client.
- **`appId`** – the ID for your application.

Store these API keys in a `.env` file as follows:

```plaintext
NEXT_PUBLIC_PROJECT_ID='PROJECT_ID'
NEXT_PUBLIC_CLIENT_KEY='CLIENT_KEY'
NEXT_PUBLIC_APP_ID='APP_ID'
```

Now, add the following code to your `ConnectKit.tsx` file:

```js
import { ModalProvider } from '@particle-network/connectkit';
import { Klaytn, KlaytnTestnet } from '@particle-network/chains';
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
                    KlaytnTestnet, Klaytn
                ],
                wallet: {    // optional: Wallet modal configuration
                    visible: true, // Display wallet modal
                    supportChains:[
                        KlaytnTestnet, Klaytn
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

Virtually every property of this component can be configured, from the different login types you support to the visual appearance of the modal; to explore these various options, head over to [Particle's documentation](https://developers.particle.network/api-reference/connect/desktop/web#configuration).

## Integrate Particle Connect into Your App

Now that the configuration is complete, wrap your application with the `ParticleConnectKit` component to enable global access to the Particle Connect SDK. To achieve this, modify your `layout.tsx` file in the `src` directory as follows:

```typescript
npm install --save @particle-network/connectkit
npm install --save @particle-network/chains
npm install --save @particle-network/connectors
npm install --save ethers	
```

### Connecting Wallet

With your `index.js` file setup, you can move onto connecting your users through a central "Connect Wallet" button. To do this, you can import `ConnectButton` from `@particle-network/connectkit` alongside its corresponding css. Upon using `ConnectButton` within your `App` component, a standard "Connect Wallet" button will appear to facilitate connection.

```js
import '@particle-network/connectkit/dist/index.css';
import { ConnectButton } from '@particle-network/connectkit';

export const App = () => {
	return <ConnectButton />;
};
```

### Getting Account and Balance

With a wallet now successfully connected through `ConnectButton`, you can retrieve the users associated Klaytn address. Additionally, you can retrieve its current balance (in KLAY) through ethers.js, passing in the corresponding EIP-1193 provider object retrieved from `useParticleProvider` within `@particle-network/connectkit`.

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

### Disconnecting Wallet

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

### Getting User Info

When a user connects via social accounts, you can use the `useParticleAuth()` hook to access `userinfo`, which includes details about their connection method, account creation date, name, emails, and other [relevant information from Particle Auth](https://developers.particle.network/api-reference/connect/desktop/web#fetch-user-information-with-particle-auth).

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

### Sending Native Transaction

Particle Connect allows you to leverage an already existing EIP-1193 provider, in this example we create a provider instance with `ethers` to send a transfer transaction.

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

## Next Steps

You can find a complete list of hooks available on the [Particle Connect docs](https://developers.particle.network/api-reference/connect/desktop/web#key-react-hooks-for-particle-connect).

For additional guides regarding Particle Network (Particle Connect, Particle Auth, and other SDKs), please refer to the [Particle Network docs](https://developers.particle.network) and the [Particle Network GitHub account](https://github.com/Particle-Network). Additionally, you may want to visit the [Particle Network blog](https://blog.particle.network) for additional information on Particle Network's services, upcoming releases, and tech stack.
