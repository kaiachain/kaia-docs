---
sidebar_label: Sở hữu lại
---

# Tích hợp Reown vào một ứng dụng phi tập trung (dApp)

<!-- ![](/img/banners/kaia-web3Modal(wc).png) -->

## Giới thiệu

[Reown](https://docs.reown.com/overview) (trước đây là WalletConnect) là một công ty công nghệ tập trung vào trải nghiệm người dùng (UX), cung cấp các bộ công cụ và hạ tầng để phát triển ứng dụng trên chuỗi khối (onchain) và ví điện tử.

Reown cung cấp hai sản phẩm chính:

- [AppKit](https://docs.reown.com/appkit/overview) - được thiết kế cho các ứng dụng Web3 muốn tích hợp kết nối ví và các tính năng Web3 khác trên cả chuỗi EVM và chuỗi không EVM.
- [WalletKit](https://docs.reown.com/walletkit/overview) - được phát triển riêng cho ví Web3.

Trong hướng dẫn này, bạn sẽ học cách sử dụng Reown AppKit để kích hoạt kết nối ví và tương tác với mạng Kaia trong ứng dụng dApp của bạn.

## Điều kiện tiên quyết

- Ví [MetaMask](https://metamask.io/download/?ref=blog.chainsafe.io)
- Mạng thử nghiệm KAIA từ [Kaia Faucet](https://faucet.kaia.io/)
- [Cấu hình ID dự án](https://docs.reown.com/appkit/next/core/installation#cloud-configuration)

## Bắt đầu

Trong phần này, bạn sẽ học cách thiết lập môi trường phát triển để sử dụng AppKit với Kaia. Trong hướng dẫn này, chúng ta sẽ sử dụng Next.js.

### Thiết lập dự án

Bây giờ, hãy tạo một ứng dụng Next. Để thực hiện điều này, vui lòng chạy lệnh được cung cấp bên dưới:

```bash
npx create-next-app@latest appkit-kaia-example
```

Lệnh trên tạo một ứng dụng Next và đặt tên cho ứng dụng Next là "appkit-kaia-example".

### Cài đặt AppKit

Bây giờ, chúng ta cần cài đặt AppKit và các thành phần phụ thuộc khác mà chúng ta cần để ứng dụng hoạt động như mong đợi. Trong hướng dẫn này, chúng ta sẽ sử dụng “wagmi” làm thư viện Ethereum ưa thích của mình. Tuy nhiên, bạn cũng có thể sử dụng [Ethers](https://docs.ethers.org/v6/#subsection_29).

```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi viem wagmi @tanstack/react-query
```

### Cấu hình tệp .env

Tiếp theo là cấu hình tệp `.env` của chúng ta. Trên thư mục gốc của thư mục mã nguồn, tạo một tệp mới có tên `.env`.

Mở tệp đó và tạo một biến mới có tên **NEXT_PUBLIC_PROJECT_ID**. Bạn sẽ gán ID dự án mà bạn đã tạo trước đó cho biến môi trường mà bạn vừa tạo. Đây là cách nó sẽ trông như thế này:

```
NEXT_PUBLIC_PROJECT_ID = <YOUR_PROJECT_ID_HERE>
```

## Cấu hình AppKit

Trên thư mục gốc của thư mục mã nguồn, tạo một thư mục mới có tên **config** và bên trong thư mục đó, tạo một tệp mã mới có tên `index.tsx`. Bây giờ, hãy dán đoạn mã được chia sẻ bên dưới vào tệp mã, tức là **config/index.tsx**.

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

Vậy thì trong đoạn mã trên đang xảy ra điều gì? Hãy cùng tìm hiểu từng bước một:

- Đầu tiên, chúng ta cần nhập các hàm cần thiết từ các gói tương ứng của chúng.
- **WagmiAdapter** - đây là thành phần được sử dụng để tạo cấu hình WAGMI, sau đó được khởi tạo với wagmiAdapter.
- **cookieStorage**, **createStorage** - tính năng này cung cấp cơ chế lưu trữ sử dụng cookie và một hàm để tạo các giải pháp lưu trữ tùy chỉnh (trong trường hợp này, sử dụng cookie).

## Tạo hộp thoại modal cho ứng dụng của bạn

Bây giờ, chúng ta cần tạo một trình cung cấp bối cảnh để bao bọc ứng dụng của chúng ta và khởi tạo AppKit.

Trên cấp độ gốc của thư mục mã nguồn của bạn, hãy tạo một thư mục mới có tên **context** và bên trong thư mục đó, tạo một tệp mã mới có tên `index.tsx`. Bây giờ, hãy dán đoạn mã được chia sẻ bên dưới vào tệp mã, tức là **context/index.tsx**.

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

Hãy cùng tìm hiểu xem điều gì đang xảy ra trong đoạn mã trên:

- Đầu tiên, chúng ta nhập các hàm cần thiết từ các gói tương ứng của chúng. Sau đó, chúng ta cần tạo thành phần modal cho ứng dụng của mình.
- **metadata** - Đối tượng này chứa thông tin về ứng dụng của chúng tôi sẽ được AppKit sử dụng. Điều này bao gồm tên ứng dụng, mô tả, URL và các biểu tượng đại diện cho ứng dụng của chúng tôi. Điều này là tùy chọn.
- **createAppKit** - hàm này được gọi để khởi tạo thành phần AppKit, chịu trách nhiệm xử lý giao diện người dùng cho việc kết nối với ví blockchain. Chức năng này được cấu hình với nhiều tùy chọn khác nhau, bao gồm metadata của ứng dụng, giao diện người dùng và kích hoạt các tính năng như phân tích dữ liệu và dịch vụ hỗ trợ khởi động.
- **mạng** - đây là các mạng mà chúng tôi muốn ứng dụng của mình hỗ trợ. Vậy hãy nhập các chuỗi mà bạn muốn ứng dụng của mình hỗ trợ từ `@reown/appkit/network` và gán chúng cho tham số mạng này. Vì chúng tôi muốn kích hoạt các tương tác ví trên mạng Kaia, chúng tôi nhập Kaia.
- **WagmiProvider**: Cung cấp bối cảnh kết nối blockchain và ví cho ứng dụng.
- **QueryClientProvider**: Cung cấp bối cảnh React Query để quản lý dữ liệu trạng thái máy chủ.

Bây giờ, chúng ta hãy tạo bố cục cho ứng dụng của mình. Trong tệp **app/layout.tsx**, xóa mã hiện có và dán đoạn mã được cung cấp bên dưới.

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

## Tạo giao diện người dùng (UI) cho ứng dụng của bạn.

Để ứng dụng của chúng tôi có giao diện người dùng (UI) mà người dùng của bạn có thể tương tác, bạn cần thiết lập một giao diện người dùng đơn giản và cấu hình cửa sổ modal. Vì chúng ta đã thiết lập AppKit, bạn có thể sử dụng `<appkit-button>`, nút này sẽ đóng vai trò là nút "Connect Wallet" hoặc bạn có thể tạo nút tùy chỉnh của riêng mình bằng cách sử dụng các [hooks](https://docs.walletconnect.com/appkit/next/core/hooks) mà AppKit cung cấp.

Mở tệp **app/page.tsx** và xóa mã mẫu hiện có, sau đó thay thế bằng đoạn mã được cung cấp bên dưới.

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

Mã nguồn trên sử dụng cấu hình AppKit để cung cấp hai nút: một nút cho phép người dùng kết nối ví của họ với ứng dụng, và một nút khác cho phép người dùng chuyển đổi mạng.

Bạn có thể chạy ứng dụng và thử nghiệm nó. Để thực hiện điều này, hãy chạy lệnh được cung cấp bên dưới.

```bash
npm run dev
```

## Các bước tiếp theo

Bạn đã học cách tạo một ứng dụng đơn giản sử dụng AppKit cho phép người dùng kết nối ví của họ và tương tác với mạng Kaia. Để có các hướng dẫn chi tiết hơn về Reown, vui lòng tham khảo [Reown Docs](https://docs.reown.com/overview) và [Reown AppKit Github Examples](https://github.com/reown-com/appkit-web-examples).
