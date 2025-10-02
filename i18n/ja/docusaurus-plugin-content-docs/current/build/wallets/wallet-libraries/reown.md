---
sidebar_label: リウン
---

# ReownをdAppに統合する

<!-- ![](/img/banners/kaia-web3Modal(wc).png) -->

## はじめに

[Reown](https://docs.reown.com/overview)（旧WalletConnect）は、オンチェーンアプリケーションとウォレットを構築するためのツールキットとインフラを提供するUXに焦点を当てたテクノロジー企業です。

Reownは主に2つの製品を提供している：

- [AppKit](https://docs.reown.com/appkit/overview) - EVMチェーンと非EVMチェーンの両方でウォレット接続やその他のWeb3機能を統合したいWeb3アプリケーション用に設計されています。
- [WalletKit](https://docs.reown.com/walletkit/overview) - Web3ウォレット専用に構築されています。

このガイドでは、Reown AppKitを使用してウォレット接続を有効にし、dAppでKaiaネットワークとやり取りする方法を学びます。

## 前提条件

- A [メタマスク](https://metamask.io/download/?ref=blog.chainsafe.io) 財布
- テストネットKAIA「カイヤ水栓」(https://faucet.kaia.io/)
- [プロジェクトIDの設定](https://docs.reown.com/appkit/next/core/installation#cloud-configuration)

## はじめに

このセクションでは、KaiaでAppKitを使用するための開発環境の設定方法について説明します。 このチュートリアルでは、Next.jsを使用します。

### プロジェクトの設定

では、Nextアプリを作ってみよう。 そのためには、以下のコマンドを実行してください：

```bash
npx create-next-app@latest appkit-kaia-example
```

上記のコマンドでNextアプリが作成され、Nextアプリの名前が「appkit-kaia-example」に設定されます。

### AppKitをインストールする

次に、AppKitと、アプリが期待通りに機能するために必要なその他の依存関係をインストールする必要がある。 このチュートリアルでは、イーサリアムのライブラリとして "wagmi "を使用する。 ただし、[エーテル](https://docs.ethers.org/v6/#subsection_29)を使うこともできる。

```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi viem wagmi @tanstack/react-query
```

### .envの設定

次に`.env`ファイルを設定する。 コード・ディレクトリのルート・レベルに、`.env`という名前の新しいファイルを作成する。

そのファイルを開き、新しい変数 **NEXT_PUBLIC_PROJECT_ID** を作成する。 先ほど作成した環境変数に、すでに作成したプロジェクトIDを代入する。 こんな感じになるだろう：

```
NEXT_PUBLIC_PROJECT_ID = <YOUR_PROJECT_ID_HERE>
```

## AppKitの設定

コードディレクトリのルートレベルに、**config**という名前の新しいフォルダを作成し、その中に`index.tsx`という名前の新しいコードファイルを作成します。 次に、以下のコード・スニペットをコード・ファイル（**config/index.tsx**）に貼り付ける。

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

では、上のコードでは何が起こっているのか？ 順を追って理解していこう：

- まず、それぞれのパッケージから必要な関数をインポートする必要がある。
- **WagmiAdapter** - これを使用して WAGMI 設定を作成し、それを wagmiAdapter に初期化します。
- **cookieStorage**、**createStorage** - これは、クッキーを使ったストレージの仕組みと、カスタム・ストレ ージ・ソリューションを（この場合はクッキーを使って）作成する機能を提供します。

## アプリのモーダルを作成する

ここで、アプリケーションをラップするコンテキスト・プロバイダを作成し、AppKitを初期化する必要がある。

コードディレクトリのルートレベルに、**context**という名前の新しいフォルダを作成し、その中に`index.tsx`という名前の新しいコードファイルを作成します。 次に、以下のコード・スニペットをコード・ファイル（**context/index.tsx**）に貼り付ける。

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

上のコードで何が起こっているかを理解しよう：

- まず、それぞれのパッケージから必要な関数をインポートする。 この後、アプリ用のモーダル コンポーネントを作成する必要があります。
- **metadata** - このオブジェクトには、AppKitによって使用されるアプリケーションに関する情報が含まれています。 これには、アプリの名前、説明、URL、アプリを表すアイコンが含まれます。 これはオプションである。
- **createAppKit** - ブロックチェーンウォレットに接続するためのユーザーインターフェイスを処理するAppKitコンポーネントを初期化するために呼び出されます。 この機能には、アプリのメタデータ、テーマ設定、アナリティクスやオンランプ・サービスのような機能の有効化など、さまざまなオプションが設定されている。
- **ネットワーク** - これらは、私たちのアプリがサポートしたいネットワークです。 そこで、アプリがサポートしたいチェーンを `@reown/appkit/network` からインポートし、このネットワーク・パラメーターに割り当てる。 Kaiaネットワーク上でウォレットのやり取りを可能にしたいので、Kaiaをインポートする。
- **WagmiProvider**：ブロックチェーンとウォレットの接続コンテキストをアプリに提供する。
- **QueryClientProvider**：サーバー状態のデータを管理するための React Query コンテキストを提供します。

では、アプリのレイアウトを作成しよう。 **app/layout.tsx**で、既存のコードを削除し、以下に示すコード・スニペットを貼り付けます。

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

## アプリのUIを作成する

ユーザーが対話できる UI をアプリに持たせるには、シンプルな UI を設定し、モーダルを構成する必要があります。 すでにAppKitをセットアップしているので、「Connect Wallet」ボタンとして機能する `<appkit-button>` を使うこともできますし、AppKitが提供する[hooks](https://docs.walletconnect.com/appkit/next/core/hooks)を使って独自のカスタムボタンを作ることもできます。

**app/page.tsx**ファイルを開き、既存のボイラープレート・コードを削除して、次に示すコード・スニペットに置き換える。

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

1つはユーザーが財布をアプリに接続するためのボタン、もう1つはユーザーがネットワークを切り替えるためのボタンです。

これでアプリを実行し、テストすることができる。 そのためには、以下のコマンドを実行する。

```bash
npm run dev
```

## 次のステップ

ここまでで、AppKitを使用してユーザーがウォレットに接続し、カイアネットワークとやり取りできるシンプルなアプリの作成方法を学びました。Reownに関するより詳細なガイドについては、[Reown Docs](https://docs.reown.com/overview)および[Reown AppKit Github Examples](https://github.com/reown-com/appkit-web-examples)を参照してください。
