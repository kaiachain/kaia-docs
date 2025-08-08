---
sidebar_label: Particle Network
---

# Integrate Particle Network into a dApp 

![](/img/banners/kaia-particle.png)

## Introduction

[Particle Network](https://particle.network) provides Wallet Abstraction services to simplify user onboarding.

The [Particle Connect SDK](https://developers.particle.network/api-reference/connect/desktop/web) supports EVM-compatible chains, including Kaia and its testnet. It allows for 2-click onboarding with [social and Web3 login options](https://developers.particle.network/api-reference/connect/desktop/web#wallet-connectors), all within a single modal.

With Particle Network, developers on Kaia can embed social logins for the Kaia Mainnet and testnet, allowing users to generate and use a wallet within your application using only their Google, email, X, etc.

This page offers an overview and tutorial for implementing Particle Connect within a Kaia-based application, to help you start the integration process.

## Prerequisites

* A [Next.js project](https://nextjs.org/docs/getting-started/installation) set up with TypeScript and Tailwind CSS  
  * You can create this by running: `npx create-next-app@latest`
* A **Project ID**, **Client Key**, and **App ID** from the [Particle Dashboard](https://dashboard.particle.network).

## Installation

To leverage Particle Network, specifically Particle Connect, within your dApp, you'll need to first install the required libraries. The Particle Connect SDK streamlines wallet creation, user login, and blockchain interactions with one interface. It supports both social and Web3 logins for easy access.

To install the SDK, along with Viem (backend for Connect) and ethers (demonstrating EIP-1193 providers), run:

```shell
yarn add @particle-network/connectkit viem@^2 ethers
```

## Initializing Particle Connect

To begin with, we’ll set up Particle Connect, Particle's flagship authentication SDK. Create a new file called `ConnectKit.tsx` in the root directory of your project. This file will house the `ParticleConnectKit` component, a wrapper for the configured `ConnectKitProvider` instance that serves as the primary interface for the configuration of Particle Connect (we'll go over what this looks like programmatically in a moment).

Next, head over to the [Particle dashboard](https://dashboard.particle.network) to create a new web application project and obtain the following essential API keys:

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
"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { defineChain } from "@particle-network/connectkit/chains";
import { wallet, EntryPosition } from "@particle-network/connectkit/wallet";

const kaiaMainnet = defineChain({
  id: 8217,
  name: "Kaia",
  nativeCurrency: {
    decimals: 18,
    name: "KAIA",
    symbol: "KAIA",
  },
  rpcUrls: {
    default: {
      http: ["https://public-en.node.kaia.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://kaiascan.io/" },
  },
  testnet: false,
});

const kaiaTestnet = defineChain({
  id: 1001,
  name: "Kaia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "KAIA",
    symbol: "KAIA",
  },
  rpcUrls: {
    default: {
      http: ["https://public-en-kairos.node.kaia.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://kairos.kaiascan.io/" },
  },
  testnet: true,
});

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,

  walletConnectors: [authWalletConnectors({})],

  plugins: [
    wallet({
      entryPosition: EntryPosition.BR, // Positions the modal button at the bottom right on login
      visible: true, // Determines if the wallet modal is displayed
    }),
  ],
  chains: [kaiaMainnet, kaiaTestnet],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
```

Virtually every property of this component can be configured, from the different login types you support to the visual appearance of the modal; to explore these various options, head over to [Particle's documentation](https://developers.particle.network/api-reference/connect/desktop/web#configuration).

## Integrate Particle Connect into Your App

Now that the configuration is complete, wrap your application with the `ParticleConnectKit` component to enable global access to the Particle Connect SDK. To achieve this, modify your `layout.tsx` file in the `src` directory as follows:

```typescript
import { ParticleConnectkit } from '@/connectkit';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Particle Connectkit App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleConnectkit>{children}</ParticleConnectkit>
      </body>
    </html>
  );
}
```

### Connecting Wallet

With your `layout.tsx` file setup, you can move on to connecting your users through a central **Connect Wallet** button. You can import `ConnectButton` from `@particle-network/connectkit` to do this. The `ConnectButton` turns into an embedded widget once the user logs in.

```js
import { ConnectButton, useAccount } from '@particle-network/connectkit';

export const App = () => {
    const { address, isConnected, chainId } = useAccount();

    // Standard ConnectButton utilization
    return (
        <div>
            <ConnectButton />
            {isConnected && (
                <>
                    <h2>Address: {address}</h2>
                    <h2>Chain ID: {chainId}</h2>
                </>
            )}
        </div>
    );
};
```


### Getting Account and Balance

With a wallet (or social login) now successfully connected through the `ConnectButton` component, you can retrieve the user's associated Kaia address. Additionally, you can retrieve its current balance (in KAIA) through the `publicClient`, which leverages the Viem provider already set up by Particle Connect.

```js
"use client";

import { useState, useEffect } from "react";
import {
  ConnectButton,
  useAccount,
  usePublicClient,
} from "@particle-network/connectkit";
import { formatEther } from "viem";

export default function Home() {
  // Account-related states
  const { isConnected, address, chain } = useAccount();
  const publicClient = usePublicClient();

  // State variable for balance
  const [balance, setBalance] = useState<string>("");

  // Fetch and display user balance when connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        try {
          const balanceResponse = await publicClient.getBalance({ address });
          const balanceInEther = formatEther(balanceResponse);
          setBalance(balanceInEther);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    if (isConnected) {
      fetchBalance();
    }
  }, [isConnected, address, publicClient]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
      <ConnectButton label="Connect Wallet" />
      {isConnected && (
        <div className="w-full max-w-md mt-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Details</h2>
          <p className="text-lg text-white">
            Address: {address || "Loading..."}
          </p>
          <p className="text-lg text-white">
            Balance: {balance || "Loading..."} {chain?.nativeCurrency.symbol}
          </p>
        </div>
      )}
    </div>
  );
}
```

### Disconnecting Wallet

Once a user has logged in, you can programmatically force a logout through `disconnect` derived from `useDisconnect`. This will disconnect the current active session from your dApp, returning the user to their initial state.

```js
import { useDisconnect } from "@particle-network/connectkit";

const { disconnect } = useDisconnect();

// Inside your component's JSX
<button
  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
  onClick={disconnect}
>
  Disconnect
</button>

```

### Getting User Info

When a user connects via social accounts, you can use the `useParticleAuth()` hook to access `userinfo`, which includes details about their connection method, account creation date, name, emails, and other [relevant information from Particle Auth](https://developers.particle.network/api-reference/connect/desktop/web#fetch-user-information-with-particle-auth).

```js
import { useAccount, useParticleAuth, useWallets } from '@particle-network/connectkit';
import { useState, useEffect } from 'react';

export const App = () => {
    const { getUserInfo } = useParticleAuth();
    const { isConnected } = useAccount();

    // Retrieve the primary wallet from the Particle Wallets
    const [primaryWallet] = useWallets();

    // Store userInfo in a useState to use it in your app
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            // Use walletConnectorType as a condition to avoid account not initialized errors
            if (primaryWallet?.connector?.walletConnectorType === 'particleAuth') {
                const userInfo = await getUserInfo();
                setUserInfo(userInfo);
            }
        };

        fetchUserInfo();
    }, [isConnected, getUserInfo]);

    return <h2 className="text-style">Name: {userInfo.name || 'N/A'}</h2>;
};
```

### Sending Native Transaction

Particle Connect allows you to leverage an already existing EIP-1193 provider, in this example we create a provider instance with `ethers` to send a transfer transaction.

```js
import { useWallets } from "@particle-network/connectkit";
import { ethers, type Eip1193Provider } from "ethers";

const [primaryWallet] = useWallets();

const executeTransaction = async () => {
    // Get the provider from the primary wallet's connector
    const EOAprovider = await primaryWallet.connector.getProvider();

    // Initialize a custom provider using ethers.js with the obtained EIP-1193 provider
    const customProvider = new ethers.BrowserProvider(EOAprovider as Eip1193Provider, "any");

    // Get the signer (an abstraction of the account that can sign transactions)
    const signer = await customProvider.getSigner();

    // Send a transaction with specified recipient address, amount (0.01 ETH), and empty data
    await signer.sendTransaction({
      to: recipientAddress,             
      value: parseEther("0.01"),        
      data: "0x",                       
    });
};


```

## Next Steps

You can find a complete list of hooks available on the [Particle Connect docs](https://developers.particle.network/api-reference/connect/desktop/web#key-react-hooks-for-particle-connect).

For additional guides regarding Particle Network (Particle Connect, Particle Auth, and other SDKs), please refer to the [Particle Network docs](https://developers.particle.network) and the [Particle Network GitHub account](https://github.com/Particle-Network). Additionally, you may want to visit the [Particle Network blog](https://blog.particle.network) for additional information on Particle Network's services, upcoming releases, and tech stack.
