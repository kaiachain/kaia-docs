---
sidebar_label: 雷恩
---

# 将 Reown 整合到 dApp 中

<!-- ![](/img/banners/kaia-web3Modal(wc).png) -->

## 导言

[Reown](https://docs.reown.com/overview) （前身为 WalletConnect）是一家以用户体验为核心的技术公司，为构建链上应用和钱包提供工具包和基础设施。

Reown 提供两大产品：

- [AppKit](https://docs.reown.com/appkit/overview) - 专为希望在 EVM 和非 EVM 链上集成钱包连接和其他 Web3 功能的 Web3 应用程序而设计。
- [WalletKit](https://docs.reown.com/walletkit/overview) - 专为 Web3 钱包构建。

在本指南中，您将了解如何使用 Reown AppKit 启用钱包连接并在您的 dApp 中与 Kaia 网络互动。

## 先决条件

- A [MetaMask](https://metamask.io/download/?ref=blog.chainsafe.io) 钱包
- 测试网 KAIA 来自 [Kaia 水龙头](https://faucet.kaia.io/)
- [配置项目 ID]（https://docs.reown.com/appkit/next/core/installation#cloud-configuration)

## 入门

在本节中，您将学习如何设置开发环境，以便在 Kaia 中使用 AppKit。 在本教程中，我们将使用 Next.js。

### 建立项目

现在，让我们创建一个 Next 应用程序。 为此，请运行以下命令：

```bash
npx create-next-app@latest appkit-kaia-example
```

上述命令创建了一个 Next 应用程序，并将 Next 应用程序的名称设置为 "appkit-kaia-example"。

### 安装 AppKit

现在，我们需要安装 AppKit 和其他依赖项，以便应用程序按预期运行。 在本教程中，我们将使用 "wagmi "作为首选以太坊库。 不过，您也可以使用 [醚](https://docs.ethers.org/v6/#subsection_29)。

```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi viem wagmi @tanstack/react-query
```

### 配置 .env

接下来是配置我们的 `.env` 文件。 在代码目录根目录下新建一个名为 `.env` 的文件

打开该文件，创建一个新变量 **NEXT_PUBLIC_PROJECT_ID** 。 您将把已经创建的项目编号分配给刚刚创建的环境变量。 这就是它的样子：

```
NEXT_PUBLIC_PROJECT_ID = <YOUR_PROJECT_ID_HERE>
```

## 配置 AppKit

在代码目录的根目录下，新建一个名为 **config** 的文件夹，并在该文件夹中新建一个名为 `index.tsx` 的代码文件。 现在，将下面共享的代码片段粘贴到代码文件中，即 **config/index.tsx**。

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

那么上述代码中发生了什么？ 让我们逐步了解它：

- 首先，我们需要从各自的软件包中导入必要的函数。
- **WagmiAdapter** - 用于创建 WAGMI 配置，然后将其初始化为 wagmiAdapter
- **cookieStorage**、**createStorage** - 这提供了一个使用 cookie 的存储机制和一个创建自定义存储解决方案（在本例中使用 cookie）的功能。

## 为应用程序创建模态

现在，我们需要创建一个上下文提供程序来封装我们的应用程序，并初始化 AppKit。

在代码目录的根目录下，新建一个名为 **context** 的文件夹，并在该文件夹中新建一个名为 `index.tsx` 的代码文件。 现在，将下面共享的代码片段粘贴到代码文件中，即 **context/index.tsx**。

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

让我们来了解一下上述代码中发生了什么：

- 首先，我们从各自的软件包中导入必要的函数。 之后，我们需要为应用程序创建模态组件。
- **metadata** - 此对象包含 AppKit 将使用的有关应用程序的信息。 这包括应用程序的名称、描述、URL 和代表应用程序的图标。 这是可选项。
- **createAppKit** - 调用此操作可初始化 AppKit 组件，该组件负责处理连接区块链钱包的用户界面。 该功能通过各种选项进行配置，如应用程序的元数据、主题以及启用分析和onramp服务等功能。
- **网络** - 我们希望应用程序支持的网络。 因此，请从 `@reown/appkit/network` 中导入您希望应用程序支持的链，并将其分配给此网络参数。 由于我们希望在 Kaia 网络上实现钱包互动，因此我们要导入 Kaia。
- **WagmiProvider**：为应用程序提供区块链和钱包连接上下文。
- **查询客户端提供程序**：提供用于管理服务器状态数据的 React 查询上下文。

现在，让我们为应用程序创建布局。 在 **app/layout.tsx**中，删除现有代码并粘贴下面的代码片段。

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

## 创建应用程序的用户界面

为了让我们的应用程序拥有用户可以进行交互的用户界面，您需要设置一个简单的用户界面并配置模态。 由于我们已经设置了 AppKit，因此您可以使用 `<appkit-button>` 作为 "连接钱包 "按钮，或者使用 AppKit 提供的 [hooks](https://docs.walletconnect.com/appkit/next/core/hooks) 创建自己的自定义按钮。

打开**app/page.tsx**文件，删除现有的模板代码，然后用下面的代码段取而代之。

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

上面的代码使用 AppKit 配置提供了两个按钮：一个供用户将钱包连接到应用程序，另一个允许用户切换网络。

现在您可以运行应用程序并进行测试。 为此，请运行以下命令。

```bash
npm run dev
```

## 下一步工作

您现在已经学会了如何使用 AppKit 创建一个简单的应用程序，让用户可以连接他们的钱包并与 Kaia 网络互动。有关 Reown 的更深入指南，请参阅 [Reown 文档](https://docs.reown.com/overview) 和 [Reown AppKit Github 示例](https://github.com/reown-com/appkit-web-examples)。
