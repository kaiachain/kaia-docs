# Vercel AI SDK

## 概述

Kaia Agent Kit 整合了多種流行的 AI 框架，讓您可以使用偏好的開發工具建立具備區塊鏈功能的代理程式。 在本指南中，您將學習如何使用 Vercel AI SDK 整合 Kaia Agent Kit 來建立 AI Agent，以進行 onchain 動作。

## 先決條件

- 已安裝 [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation)
- 已準備好私密金鑰的 [Kaia Wallet](https://www.kaiawallet.io/)
- [Google Generative API key](https://ai.google.dev/gemini-api/docs/api-key)
- Kaia 網路的 [RPC Provider](https://docs.kaia.io/references/public-en/)
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)

## 開始使用

在本指南中，我們將使用 Vercel AI SDK 和 Kaia Agent Kit 建立一個基本的 AI 代理，它可以：

- 發送原生代幣、可替代代幣 (FT) 和 NFT。
- 檢查原生代幣、FT 和 NFT 的餘額。
- 使用 (或透過) 資料 Kaiascan API 擷取區塊鏈，以擷取網路摘要、Kaia 的價格、地址的代幣餘額等。

在本指南結束時，您將擁有一個功能強大的 AI 代理，能夠與 Kaia 區塊鏈互動、執行交易以及擷取關鍵的上鏈資料 - 所有這些都是自主進行的。

### 瞭解 AI 代理堆疊

要建立強大的人工智能代理，我們需要正確的工具。 本指南利用 Vercel AI SDK 來實現 AI 功能，並利用 Kaia Agent Kit 來實現區塊鏈互動。

**Vercel AI SDK - AI 引擎**

Vercel AI SDK 是 TypeScript 工具套件，可讓您輕鬆使用 React、Next.js、Vue、Svelte 和 Node.js 等框架建立人工智能驅動的應用程式和代理。 它支援多種 AI 模型，在本指南中，我們會使用 [Google Generative AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai) 作為模型提供者。

**Kaia 代理商套件 - 使用 Onchain 工具增強 AI 代理商**

Kaia Agent Kit 為 AI 代理商帶來了上鏈工具，讓他們可以與 Kaia 區塊鏈進行無縫互動。 這將使代理能夠在鏈上執行動作、獲取鏈上資訊、驗證交易，並與智慧合約進行動態互動。

利用 Vercel AI SDK 和 Kaia Agent Kit，我們將創建一個能夠自主推理、行動和區塊鏈互動的 AI 代理。

## 初始化專案

### Vercel AI SDK

首先建立一個新的 Next.js 應用程式。 此指令會建立一個名為 kaia-agent-kit-vercel-ai-example 的新目錄，並在其中建立一個基本的 Next.js 應用程式。

```bash
 pnpm create next-app@latest kaia-agent-kit-vercel-ai-example
```

對於本指南，請輸入下列命令列提示值：

```bash
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```

導覽到新建立的目錄：

```bash
cd kaia-agent-kit-vercel-ai-example
```

### 安裝相依性

安裝 `ai`、`@ai-sdk/react` 和 `@ai-sdk/google`，分別是 AI 套件、AI SDK 的 React 鉤子和 AI SDK 的 Google [Generative AI provider](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai)。

```bash
pnpm add ai @ai-sdk/react @ai-sdk/google zod dotenv
```

### 設定 Google Generative AI API 金鑰

在專案根目錄建立一個 `.env` 檔案，並加入您的 Google Generative AI API 金鑰。 此金鑰用於驗證您的應用程式與 Google Generative AI 服務。

```bash
touch .env
```

編輯 .env 檔案：

```bash
GOOGLE_GENERATIVE_AI_API_KEY=xxxxxxxxx
```

將 xxxxxxxxx 改為您實際的 GOOGLE_GENERATIVE_AI API 金鑰

### 建立路由處理程式

建立路由處理程式，`app/api/chat/route.ts` 並加入下列程式碼：

```typescript
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google('gemini-1.5-pro-latest'),
    messages,
  });
  return result.toDataStreamResponse();
}
```

**代碼演練：**

此程式碼定義了 API 路由處理程式 (POST /api/chat)，透過 Vercel 的 AI SDK，使用 Google 的 Gemini AI 模型處理聊天機訊息。 事情是這樣的

- **擷取聊天記錄**：處理程式會讀取傳入的要求，並擷取包含聊天記錄的訊息。
- **產生 AI 回應**：它會使用 Google 的 Gemini 1.5 Pro 模型呼叫 streamText()，並傳送聊天記錄以取得上下文。
- **串流回應**：函式使用 toDataStreamResponse() 傳回串流式回應，允許即時產生文字。
- **限制執行時間**:maxDuration 變數可確保回應不超過 30 秒。

此設定可透過 Google 的 Gemini AI 與 Vercel AI SDK，在聊天機器人中實現由 AI 產生的即時回應。

### 佈線 UI

現在您有一個可以查詢 LLM 的路由處理程式，是時候設定您的前端了。 AI SDK 的 [UI](https://sdk.vercel.ai/docs/ai-sdk-ui) 套件將聊天介面的複雜性抽象成一個鉤子，[useChat](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat)。
使用下列程式碼更新您的根頁面（app/page.tsx），以顯示聊天訊息清單，並提供使用者訊息輸入：

```tsx
'use client';
import { useChat } from '@ai-sdk/react';
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
```

**代碼演練：**

這個 React 元件使用 Vercel AI SDK 的 useChat() 鉤子建立一個簡單的聊天介面。 它的功能如下：

- **管理聊天狀態**：useChat() 鉤子提供：
  - 訊息：聊天記錄 (包含 ID、角色和內容)。
  - 輸入：目前使用者的輸入。
  - handleInputChange：在使用者輸入時更新輸入欄位。
  - handleSubmit：表單提交時傳送訊息。
- **顯示訊息**：這個元件會映射訊息，顯示文字是來自使用者還是 AI。
- **處理使用者輸入**：它包含一個輸入欄位，使用者可以在此輸入訊息，然後當他們按下 Enter 鍵時，訊息就會傳送出去。

此設定可透過連線至先前建立的 API 路由 (/api/chat) 與 AI 聊天機器人進行即時互動。

### 執行您的應用程式

這樣，您就建立了聊天機器人所需的一切！ 要啟動應用程式，請使用指令：

```bash
pnpm run dev
```

前往瀏覽器並開啟 `http://localhost:3000`。 您應該會看到一個輸入欄位。 輸入訊息進行測試，看看 AI 聊天機器人的即時回應！ AI SDK 可讓您快速輕鬆地使用 Next.js 建立 AI 聊天介面。

現在我們已經建立了聊天機器人，讓我們使用 Kaia Agent Kit 來增加使用上鏈工具的能力，以執行區塊鏈交易等。

## 使用 Kaia Agent Kit 藉由 Onchain 工具擴充 Agent

到目前為止，我們已經建立了一個功能性 AI 聊天機器人，可以處理對話並產生回應。 現在，讓我們使用 Kaia Agent Kit 來增強它的 onchain 功能。  如此一來，我們的聊天機器人就從簡單的會話式 AI 演變成強大的區塊鏈上代理，可以即時在區塊鏈上採取行動。

### 安裝相依性

安裝 Kaia Agent Kit 及其他相依套件，以將 onchain 功能整合至我們的 AI 代理。

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-vercel-ai @goat-sdk/wallet-viem viem 
```

:::note
Kaia Agent Kit 提供在 Kaia 上執行 onchain 動作的工具存取權限，而其他相依性則協助橋接 onchain 工具與 AI SDK，並處理錢包管理。
:::

### 設定環境

編輯專案根目錄的 .env 檔案，並新增下列內容：

```bash
WALLET_PRIVATE_KEY=0x_PRIVATE_KEY
RPC_PROVIDER_URL=https://public-en.node.kaia.io
KAIASCAN_API_KEY=your_kaiascan_api_key
```

### 更新路由.ts 檔案以便在鏈上執行

```typescript
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { kairos } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
// kaia-agent-kit
import { Kaia, PackagesEnum } from '@kaiachain/kaia-agent-kit';
import 'dotenv/config'
const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: kairos,
});
const tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [Kaia({KAIA_KAIASCAN_API_KEY: process.env.KAIASCAN_API_KEY, packages: []})]
});
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google('gemini-1.5-pro-latest'),
// add onchain tools
    tools: tools,
    messages,
// enable multi-step calls
    maxSteps: 10,
  });
  return result.toDataStreamResponse();
}
```

**代碼演練**

此更新的 `route.ts` 檔案使用 Kaia Agent Kit、Viem 和 Vercel AI SDK 將區塊鏈功能整合到我們的 AI 代理中。 以下是發生的細節：

- **設定區塊鏈工具和錢包**
  - 匯入 Viem、Kaia Agent Kit 及其他工具，用於橋接 onchain 工具與 Vercel AI SDK。
  - 使用 privateKeyToAccount 從環境變數 (WALLET_PRIVATE_KEY) 建立錢包帳號。
  - 初始化 Viem 的錢包用戶端，以便使用 RPC 提供者與 Kaia 區塊鏈互動。
- **載入 Onchain 工具**
  - 使用 getOnChainTools 載入 Kaia Agent Kit 鏈上工具。 請注意，您可以透過設定 packages 陣列並傳入以下任一值，限制 AI 代理存取特定工具：PackagesEnum.WEB3、PackagesEnum.KAIASCAN、PackagesEnum.DGSWAP。 留空時，預設啟用所有套件。
- **整合人工智能與區塊鏈功能**
  - 呼叫 streamText 時會使用：
    - Google Gemini 1.5 Pro 作為 LLM 模型
    - Onchain 工具（工具）可實現區塊鏈交易
    - 對話記錄 (訊息)
    - 多步驟執行 (maxSteps: 10) 可處理複雜的工作流程
- **回傳串流式 AI 回應**
  AI 代理程式會處理要求，並利用內嵌的 onchain 功能串流回應。

## 測試代理功能

若要使用 onchain 能力重新啟動應用程式，請使用指令：

```bash
pnpm run dev 
```

現在您可以與您的 AI 代理互動，在 Kaia 上執行 onchain 動作：

```bash
Check this address:  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 KAIA balance on kairos

Send 1 KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on Kairos

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Get the balance (native, fungible, non-fungible) of this account  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos. Display the first 5 if there are many

What is Kaia current info?

Get me the current block number on Kairos
```

**輸出**

![](/img/build/tools/kaia-agent-kit/kaia-agent-vercel-ai.gif)

## 其他資訊

- [Vercel AI SDK](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router)
- [多模式聊天機器人](https://sdk.vercel.ai/docs/guides/multi-modal-chatbot)
- [Tools](https://sdk.vercel.ai/docs/foundations/tools)





