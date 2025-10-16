---
sidebar_label: Reown
---

# 將 Reown 整合到 dApp 中

<!-- ![](/img/banners/kaia-web3Modal(wc).png) -->

## 導言

[Reown](https://docs.reown.com/overview) (前身為 WalletConnect) 是一家以使用者經驗為重點的技術公司，提供工具包和基礎架構，以建立在線應用程式和錢包。

Reown 提供兩種主要產品：

- [AppKit](https://docs.reown.com/appkit/overview) - 專為想要在 EVM 和非 EVM 鏈上整合錢包連線和其他 Web3 功能的 Web3 應用程式而設計。
- [WalletKit](https://docs.reown.com/walletkit/overview) - 專為 Web3 錢包而建。

在本指南中，您將學習如何使用 Reown AppKit 啟用錢包連線，並在您的 dApp 中與 Kaia 網路互動。

## 先決條件

- A [MetaMask](https://metamask.io/download/?ref=blog.chainsafe.io) 錢包
- Testnet KAIA 來自 [Kaia Faucet](https://faucet.kaia.io/)
- [設定專案 ID](https://docs.reown.com/appkit/next/core/installation#cloud-configuration)

## 開始使用

在本節中，您將學習如何設定開發環境，以便在 Kaia 中使用 AppKit。 在本教程中，我們將使用 Next.js。

### 設定專案

現在，讓我們建立一個 Next 應用程式。 為此，請執行下列指令：

```bash
npx create-next-app@latest appkit-kaia-example
```

上述指令會建立一個 Next 應用程式，並將 Next 應用程式的名稱設定為 "appkit-kaia-example"。

### 安裝 AppKit

現在，我們需要安裝 AppKit 及其他依賴項目，以便我們的應用程式能如預期般運作。 在本教程中，我們將使用「wagmi」作為我們偏好的 Ethereum 函式庫。 不過，您也可以使用 [醚](https://docs.ethers.org/v6/#subsection_29)。

```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi viem wagmi @tanstack/react-query
```

### 設定 .env

接下來是設定我們的 `.env` 檔案。 在程式碼目錄的根目錄，建立一個名為 `.env` 的新檔案

開啟該檔案，並建立新變數 **NEXT_PUBLIC_PROJECT_ID**。 您會將已建立的專案 ID 指定給剛才建立的這個環境變數。 這就是它的外觀：

```
NEXT_PUBLIC_PROJECT_ID = <YOUR_PROJECT_ID_HERE>
```

## 設定 AppKit

在程式碼目錄的根層，建立一個新的資料夾，命名為 **config**，並在該資料夾中建立一個新的程式碼檔案，命名為 `index.tsx`。 現在，將下面分享的程式碼片段貼到程式碼檔案內，即 **config/index.tsx**。

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

那麼上述程式碼中發生了什麼事？ 讓我們逐步瞭解：

- 首先，我們需要從各自的套件匯入必要的函式。
- **WagmiAdapter** - 用來建立 WAGMI 設定，然後將其初始化為 wagmiAdapter
- **cookieStorage**、**createStorage** - 這提供了一個使用 cookies 的儲存機制，以及一個建立自訂儲存解決方案的函式（在此情況下，使用 cookies）。

## 為您的應用程式建立模組

現在，我們需要建立一個 context provider 來包裝我們的應用程式，並初始化 AppKit。

在程式碼目錄的根層，建立一個新的資料夾，命名為 **context**，並在該資料夾中建立一個新的程式碼檔案，命名為 `index.tsx`。 現在，將下面分享的程式碼片段貼到程式碼檔案內，即 **context/index.tsx**。

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

讓我們瞭解一下上述程式碼中發生的事情：

- 首先，我們從各自的套件匯入必要的函式。 之後，我們需要為應用程式建立模態元件。
- **metadata** - 此物件包含 AppKit 將會使用的關於我們應用程式的資訊。 這包括應用程式的名稱、描述、URL 和代表我們應用程式的圖示。 這是選項。
- **createAppKit** - 這個函式會被呼叫以初始化 AppKit 元件，AppKit 會處理連線到區塊鏈錢包的使用者介面。 該功能透過各種選項進行設定，例如應用程式的元資料、主題設定，以及啟用分析和 onramp 服務等功能。
- \*\* 網路\*\* - 這些是我們希望應用程式支援的網路。 因此，請從 `@reown/appkit/network` 匯入您希望應用程式支援的鏈，並將其指定給此網路參數。 由於我們要在 Kaia 網路上啟用錢包互動，因此我們要匯入 Kaia。
- **WagmiProvider**：為應用程式提供區塊鏈和錢包連線上下文。
- **QueryClientProvider**：提供管理伺服器狀態資料的 React Query 上下文。

現在，讓我們為應用程式建立佈局。 在 **app/layout.tsx** 中，移除現有的程式碼，並貼上以下的程式碼片段。

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

## 為您的應用程式建立使用者介面

為了讓我們的應用程式擁有使用者可以互動的 UI，您需要設定簡單的 UI 並配置模組。 由於我們已經設定了 AppKit，您可以使用 `<appkit-button>`，它會作為「連結錢包」按鈕，或者您可以使用 AppKit 提供的 [hooks](https://docs.walletconnect.com/appkit/next/core/hooks) 建立您自己的自訂按鈕。

開啟 **app/page.tsx** 檔案，移除現有的模板程式碼，然後用下面的程式碼片段取代。

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

上述程式碼使用 AppKit 配置提供兩個按鈕：一個按鈕讓使用者將錢包連接到應用程式，另一個按鈕讓使用者切換網路。

現在您可以執行應用程式並進行測試。 為此，請執行下列指令。

```bash
npm run dev
```

## 下一步

現在您已學會如何使用 AppKit 建立一個簡單的應用程式，讓使用者可以連接他們的錢包，並與 Kaia 網路互動。如需更多關於 Reown 的深入指南，請參考 [Reown Docs](https://docs.reown.com/overview) 和 [Reown AppKit Github Examples](https://github.com/reown-com/appkit-web-examples)。
