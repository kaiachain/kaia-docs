---
sidebar_label: Reown
---

# Reown을 디앱에 통합

<!-- ![](/img/banners/kaia-web3Modal(wc).png) -->

## 소개

[리온](https://docs.reown.com/overview)(구 월렛커넥트)은 온체인 애플리케이션과 지갑 구축을 위한 툴킷과 인프라를 제공하는 UX 중심 기술 회사입니다.

Reown은 두 가지 주요 제품을 제공합니다:

- [AppKit](https://docs.reown.com/appkit/overview) - 지갑 연결 및 기타 Web3 기능을 EVM과 비 EVM 체인 모두에 통합하려는 Web3 애플리케이션을 위해 설계되었습니다.
- [월렛키트](https://docs.reown.com/walletkit/overview) - Web3 지갑을 위해 특별히 제작되었습니다.

이 가이드에서는 리운 앱키트를 사용하여 디앱에서 지갑 연결을 활성화하고 카이아 네트워크와 상호 작용하는 방법을 설명합니다.

## 전제 조건

- 메타마스크](https://metamask.io/download/?ref=blog.chainsafe.io) 지갑
- 카이아 수도꼭지]의 테스트넷 KAIA(https://faucet.kaia.io/)
- [프로젝트 ID 구성](https://docs.reown.com/appkit/next/core/installation#cloud-configuration)

## 시작하기

이 섹션에서는 Kaia에서 AppKit을 사용하기 위해 개발 환경을 설정하는 방법을 알아봅니다. 이 튜토리얼에서는 Next.js를 사용하겠습니다.

### 프로젝트 설정

이제 다음 앱을 만들어 보겠습니다. 이렇게 하려면 아래 명령을 실행하세요:

```bash
npx create-next-app@latest appkit-kaia-example
```

위의 명령은 다음 앱을 생성하고 다음 앱의 이름을 "appkit-kaia-example"로 설정합니다.

### AppKit 설치

이제 앱이 예상대로 작동하는 데 필요한 AppKit 및 기타 종속 요소를 설치해야 합니다. 이 튜토리얼에서는 선호하는 이더리움 라이브러리로 "wagmi"를 사용하겠습니다. 그러나 [이더](https://docs.ethers.org/v6/#subsection_29)를 사용할 수도 있습니다.

```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi viem wagmi @tanstack/react-query
```

### .env 구성

다음은 '.env' 파일을 구성하는 것입니다. 코드 디렉터리의 루트 레벨에서 '.env'라는 이름의 새 파일을 만듭니다.

해당 파일을 열고 **NEXT_PUBLIC_PROJECT_ID** 변수를 새로 생성합니다. 방금 생성한 이 환경 변수에 이미 생성한 프로젝트 ID를 할당합니다. 이것이 바로 그 모습입니다:

```
NEXT_PUBLIC_PROJECT_ID = <YOUR_PROJECT_ID_HERE>
```

## AppKit 구성

코드 디렉터리의 루트 레벨에 **config**라는 이름의 새 폴더를 만들고 그 폴더 안에 `index.tsx`라는 이름의 새 코드 파일을 만듭니다. 이제 아래 공유한 코드 스니펫을 코드 파일, 즉 **config/index.tsx**에 붙여넣습니다.

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

그렇다면 위의 코드에서 무슨 일이 일어나고 있을까요? 단계별로 이해해 보겠습니다:

- 먼저 각 패키지에서 필요한 기능을 가져와야 합니다.
- **와그미어댑터** - 와그미어댑터로 초기화되는 와그미 구성을 생성하는 데 사용됩니다.
- **쿠키스토리지**, **창설스토리지** - 쿠키를 사용하는 스토리지 메커니즘과 사용자 지정 스토리지 솔루션을 생성하는 기능(이 경우 쿠키 사용)을 제공합니다.

## 앱용 모달 만들기

이제 애플리케이션을 래핑할 컨텍스트 공급자를 생성하고 AppKit을 초기화해야 합니다.

코드 디렉터리의 루트 레벨에 **context**라는 이름의 새 폴더를 만들고 그 폴더 안에 `index.tsx`라는 이름의 새 코드 파일을 만듭니다. 이제 아래 공유한 코드 스니펫을 코드 파일, 즉 **context/index.tsx**에 붙여넣습니다.

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

위 코드에서 무슨 일이 일어나고 있는지 이해해 보겠습니다:

- 먼저 각 패키지에서 필요한 기능을 가져옵니다. 그런 다음 앱의 모달 컴포넌트를 만들어야 합니다.
- **메타데이터** - 이 개체에는 AppKit에서 사용할 애플리케이션에 대한 정보가 포함되어 있습니다. 여기에는 앱 이름, 설명, URL 및 앱을 나타내는 아이콘이 포함됩니다. 선택 사항입니다.
- **createAppKit** - 블록체인 지갑에 연결하기 위한 사용자 인터페이스를 처리하는 AppKit 컴포넌트를 초기화하기 위해 호출됩니다. 이 기능은 앱의 메타데이터, 테마, 분석 및 온램프 서비스와 같은 기능 활성화 등 다양한 옵션으로 구성됩니다.
- **네트워크** - 앱이 지원하고자 하는 네트워크입니다. 따라서 앱에서 지원하려는 체인을 `@reown/appkit/network`에서 가져와 이 네트워크 파라미터에 할당하세요. 카이아 네트워크에서 지갑 상호 작용을 활성화하고 싶기 때문에 카이아를 가져옵니다.
- **와그미프로바이더**: 앱에 블록체인 및 지갑 연결 컨텍스트를 제공합니다.
- **쿼리클라이언트프로바이더**: 서버 상태 데이터를 관리하기 위한 React 쿼리 컨텍스트를 제공합니다.

이제 앱의 레이아웃을 만들어 보겠습니다. app/layout.tsx\*\*에서 기존 코드를 제거하고 아래에 제공된 코드 스니펫을 붙여넣습니다.

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

## 앱의 UI 만들기

앱에서 사용자가 상호 작용할 수 있는 UI를 제공하려면 간단한 UI를 설정하고 모달을 구성해야 합니다. 이미 AppKit을 설정했으므로 "지갑 연결" 버튼 역할을 하는 `<appkit-button>`를 사용하거나 AppKit에서 제공하는 [후크](https://docs.walletconnect.com/appkit/next/core/hooks)를 사용하여 사용자 지정 버튼을 직접 만들 수 있습니다.

app/page.tsx\*\* 파일을 열고 기존 상용구 코드를 제거한 다음 아래에 제공된 코드 스니펫으로 대체합니다.

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

위의 코드는 AppKit 구성을 사용하여 사용자가 지갑을 앱에 연결할 수 있는 버튼과 사용자가 네트워크를 전환할 수 있는 버튼 두 개를 제공합니다.

이제 앱을 실행하고 테스트해 볼 수 있습니다. 이렇게 하려면 아래에 주어진 명령을 실행하세요.

```bash
npm run dev
```

## 다음 단계

이제 앱키트를 사용하여 사용자가 지갑을 연결하고 카이아 네트워크와 상호작용할 수 있는 간단한 앱을 만드는 방법을 배웠습니다.리로운에 대한 더 자세한 가이드는 [리로운 문서](https://docs.reown.com/overview) 및 [리로운 앱키트 깃허브 예제](https://github.com/reown-com/appkit-web-examples)를 참고하시기 바랍니다.
