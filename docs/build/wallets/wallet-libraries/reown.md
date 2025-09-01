---
sidebar_label: Reown
---

# Integrate Reown into a dApp

<!-- ![](/img/banners/kaia-web3Modal(wc).png) -->

## Introduction

[Reown](https://docs.reown.com/overview) (formerly WalletConnect) is a UX-focused technology company that provides toolkits and infrastructure for building onchain applications and wallets.

Reown offers two major products:
- [AppKit](https://docs.reown.com/appkit/overview) - designed for Web3 applications that want to integrate wallet connections and other Web3 functionality across both EVM and non-EVM chains.
- [WalletKit](https://docs.reown.com/walletkit/overview) - built specifically for Web3 wallets.

In this guide, you will learn how to use Reown AppKit to enable wallet connections and interact with the Kaia network in your dApp.


## Prerequisite

- A [MetaMask](https://metamask.io/download/?ref=blog.chainsafe.io) wallet
- Testnet KAIA from [Kaia Faucet](https://faucet.kaia.io/)
- [Configure a Project ID](https://docs.reown.com/appkit/next/core/installation#cloud-configuration) 


## Getting Started

In this section, you'll learn how to set up the development environment to use AppKit with Kaia. For this tutorial, we'll be using Next.js. 


### Setting up Project 

Now, let’s create a Next app. In order to do so, please run the command given below:

```bash
npx create-next-app@latest appkit-kaia-example
```
The above command creates a Next app and sets the name of the Next app as "appkit-kaia-example".

### Install AppKit

Now, we need to install AppKit and other dependencies that we need for our app to function as expected. For this tutorial, we will be using “wagmi” as our preferred Ethereum library. However, you can also use [Ethers](https://docs.ethers.org/v6/#subsection_29).

```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi viem wagmi @tanstack/react-query
```

### Configure .env

Next is to configure our `.env` file. On the root level of your code directory, create a new file named `.env`

Open that file and create a new variable **NEXT_PUBLIC_PROJECT_ID**. You will assign the project Id that you already created to this environment variable that you just created. This is what it will look like:

```
NEXT_PUBLIC_PROJECT_ID = <YOUR_PROJECT_ID_HERE>
```

## Configure AppKit

On the root level of your code directory, create a new folder named **config** and within that folder, create a new code file named `index.tsx`. Now, paste the code snippet shared below inside the code file, i.e., **config/index.tsx**.

```tsx
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { kaia, kairos } from '@reown/appkit/networks'
// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
export const networks = [kaia, kairos]
if (!projectId) throw new Error("Project ID is not defined");
// Set up the Wagmi Adapter (config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  networks,
  projectId
})
export const config = wagmiAdapter.wagmiConfig
```

So what's happening in the above code? Let's understand it step-by-step:
- First, we need to import the necessary functions from their respective packages.
- **WagmiAdapter** - this is used to create a WAGMI configuration which is then initialized to the wagmiAdapter
- **cookieStorage**, **createStorage** - this provides a storage mechanism using cookies and a function to create custom storage solutions (in this case, using cookies).

## Create the Modal for your app

Now, we need to create a context provider to wrap our application in and initialize AppKit.

On the root level of your code directory, create a new folder named **context** and within that folder, create a new code file named `index.tsx`. Now, paste the code snippet shared below inside the code file, i.e., **context/index.tsx**.

```tsx
'use client'
import { wagmiAdapter, projectId } from '../config/index'
import { createAppKit } from '@reown/appkit/react' 
import { kaia, kairos } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
// Set up queryClient
const queryClient = new QueryClient()
if (!projectId) {
  throw new Error('Project ID is not defined')
}
// Set up metadata
const metadata = { //this is optional
  name: "appkit-kaia-example",
  description: "AppKit Example - Kaia",
  url: "https://kaia-app.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"]
}
// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [kaia, kairos],
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeMode: 'light'
})
function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
export default ContextProvider
```

Let’s understand what is happening in the above code:

- First, we import the necessary functions from their respective packages. After this, we need to create the modal component for our app.
- **metadata** - This object contains information about our application that will be used by AppKit. This includes the name of the app, the description, the url and the icons representing our app. This is optional.
- **createAppKit** - this is called to initialize the AppKit component, which handles the user interface for connecting to blockchain wallets. The function is configured with various options, such as the app's metadata, theming, and enabling features like analytics and onramp services.
- **networks** - these are the networks that we want our app to support. So import the chains you want your app to support from `@reown/appkit/network` and assign it to this network parameter. Since we want to enable wallet interactions on Kaia network, we import Kaia.
- **WagmiProvider**: Provides blockchain and wallet connection context to the app.
- **QueryClientProvider**: Provides the React Query context for managing server-state data.

Now, let’s create the layout for our app. In **app/layout.tsx**, remove the existing code and paste the code snippet given below.

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { headers } from "next/headers";
import ContextProvider from '../../context/index'
export const metadata: Metadata = {
  title: "AppKit Kaia Example App",
  description: "Powered by Reown"
};
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  
  const cookies = (await headers()).get('cookie')
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  )
}
```

## Create the UI for your app

For our app to have the UI with which your users can interact, you need to set a simple UI and configure the modal. Since we have already set up AppKit, you can use `<appkit-button>` which will serve as a "Connect Wallet" button or you can build your own custom button using the [hooks](https://docs.walletconnect.com/appkit/next/core/hooks) that AppKit provides.

Open the **app/page.tsx** file and remove the existing boilerplate code, and then replace it with the code snippet given below.

```tsx
"use client";
import { useAccount } from "wagmi";
export default function Home() {
  const { isConnected } = useAccount();
  return (
    <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
      <header className="w-full py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/favicon.ico" alt="logo" className="w-10 h-10 mr-2" />
          <div className="hidden sm:inline text-xl font-bold">Reown - AppKit + Kaia</div>
        </div>
      </header>
      <h2 className="my-8 text-2xl font-bold leading-snug text-center">Examples</h2>
      <div className="max-w-4xl">
        <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center text-black">Connect your wallet</h3>
          <div className="flex justify-center items-center p-4 text-black">
          <appkit-button />
          </div>
        </div> 
        <br></br>
        {isConnected && (
          <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">Network selection button</h3>
            <div className="flex justify-center items-center p-4">
              <appkit-network-button />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
```
The code above uses the AppKit configuration to provide two buttons: one for users to connect their wallet to the app, and another to allow users to switch networks.

You can now run the app and test it out. In order to do so, run the command given below.

```bash
npm run dev
```

## Next Steps

You have now learned how to create a simple app using AppKit that allows users to connect their wallet and interact with the Kaia network.For more in-depth guides on Reown, please refer to the [Reown Docs](https://docs.reown.com/overview) and [Reown AppKit Github Examples](https://github.com/reown-com/appkit-web-examples).
