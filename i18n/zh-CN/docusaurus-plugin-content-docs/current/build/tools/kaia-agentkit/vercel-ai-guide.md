# Vercel AI SDK

## 概述

Kaia Agent Kit 集成了多个流行的人工智能框架，使您能够使用自己喜欢的开发工具构建支持区块链的代理。 在本指南中，您将了解如何使用 Vercel AI SDK 创建人工智能代理，并将 Kaia Agent Kit 集成到链上操作中。

## 先决条件

- 已安装 [Node.js](https://nodejs.org/en/download) 和 [pnpm](https://pnpm.io/installation)
- 已准备好私钥的 [Kaia 钱包](https://www.kaiawallet.io/)
- [Google Generative API key](https://ai.google.dev/gemini-api/docs/api-key)
- Kaia 网络的[RPC Provider](https://docs.kaia.io/references/public-en/)
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)

## 开始使用

在本指南中，我们将使用 Vercel AI SDK 和 Kaia Agent Kit 构建一个基本的人工智能代理，它可以..：

- 发送本地代币、可互换代币 (FT) 和 NFT。
- 检查本地代币、FT 和 NFT 的余额。
- 使用（或通过）数据 Kaiascan API 获取区块链，以检索网络摘要、Kaia 的价格、地址的代币余额等。

在本指南结束时，您将拥有一个功能强大的人工智能代理，能够与 Kaia 区块链交互、执行交易并检索关键的链上数据--所有这些都是自主完成的。

### 了解人工智能代理堆栈

要建立一个强大的链上人工智能代理，我们需要合适的工具。 本指南利用 Vercel AI SDK 实现人工智能功能，并利用 Kaia Agent Kit 实现区块链交互。

**Vercel 人工智能 SDK - 人工智能引擎**

Vercel AI SDK 是一个 TypeScript 工具包，可让您使用 React、Next.js、Vue、Svelte 和 Node.js 等框架轻松构建人工智能驱动的应用程序和代理。 它支持多种人工智能模型，在本指南中，我们将使用 [Google Generative AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai) 作为模型提供者。

**Kaia代理工具包--利用Onchain工具为人工智能代理增效**

Kaia Agent Kit 为人工智能代理带来了链上工具，使他们能够与 Kaia 区块链无缝互动。 这将使代理能够在链上执行操作、获取链上信息、验证交易并与智能合约动态交互。

利用 Vercel AI SDK 和 Kaia Agent Kit，我们将创建一个能够进行自主推理、行动和区块链交互的 AI 代理。

## 项目初始化

### Vercel AI SDK

首先创建一个新的 Next.js 应用程序。 此命令将创建一个名为 kaia-agent-kit-vercel-ai-example 的新目录，并在其中建立一个基本的 Next.js 应用程序。

```bash
 pnpm create next-app@latest kaia-agent-kit-vercel-ai-example
```

在本指南中，请在命令行提示符下输入以下值：

```bash
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```

导航至新建目录：

```bash
cd kaia-agent-kit-vercel-ai-example
```

### 安装依赖项

分别安装人工智能软件包`ai`、`@ai-sdk/react`和`@ai-sdk/google`、人工智能 SDK 的 React 挂钩和人工智能 SDK 的 Google [Generative AI provider](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai)。

```bash
pnpm add ai @ai-sdk/react @ai-sdk/google zod dotenv
```

### 配置 Google Generative AI API 密钥

在项目根目录下创建一个 `.env` 文件，并添加 Google Generative AI API Key。 此密钥用于在 Google Generative AI 服务中验证您的应用程序。

```bash
touch .env
```

编辑 .env 文件：

```bash
GOOGLE_GENERATIVE_AI_API_KEY=xxxxxxxxx
```

将 xxxxxxxxx 替换为实际的 GOOGLE_GENERATIVE_AI API 密钥

### 创建路由处理程序

创建路由处理程序 `app/api/chat/route.ts` 并添加以下代码：

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

**代码演练：**

这段代码定义了一个 API 路由处理程序（POST /api/chat），通过 Vercel 的 AI SDK 使用谷歌的双子座人工智能模型处理聊天机器人信息。 事情是这样的

- **提取对话历史记录**：处理程序会读取接收到的请求，并检索包含聊天记录的信息。
- **生成人工智能回复**：它会使用 Google 的 Gemini 1.5 Pro 模型调用 streamText()，并传递聊天历史记录作为上下文。
- **流式响应**：该函数使用 toDataStreamResponse() 返回流式响应，允许实时生成文本。
- **限制执行时间**：maxDuration 变量可确保响应时间不超过 30 秒。

这种设置通过利用谷歌的 Gemini AI 和 Vercel AI SDK，在聊天机器人中实现了实时人工智能生成回复。

### 连接用户界面

有了能查询 LLM 的路由处理程序后，就该设置前端了。 AI SDK 的 [UI](https://sdk.vercel.ai/docs/ai-sdk-ui) 软件包将聊天界面的复杂性抽象为一个钩子，即 [useChat](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat)。
用以下代码更新根页面（app/page.tsx），以显示聊天信息列表并提供用户信息输入：

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

**代码演练：**

此 React 组件使用 Vercel AI SDK 中的 useChat() 钩子创建了一个简单的聊天界面。 它的作用是

- **管理聊天状态**：useChat() 钩子提供
 - 消息聊天记录（包括 ID、角色和内容）。
 - 输入：当前的用户输入。
 - handleInputChange：在用户输入时更新输入字段。
 - handleSubmit：当表单提交时发送信息。
- **显示信息**：该组件映射信息，显示文本是来自用户还是人工智能。
- **处理用户输入**：它包括一个输入框，用户可以在此输入信息，按下回车键后，信息就会发送出去。

这种设置可通过连接到之前创建的 API 路由 (/api/chat) 与人工智能聊天机器人进行实时互动。

### 运行应用程序

这样，您就构建了聊天机器人所需的一切！ 要启动应用程序，请使用以下命令：

```bash
pnpm run dev
```

前往浏览器，打开 http://localhost:3000。 你会看到一个输入框。 输入信息进行测试，看看人工智能聊天机器人的实时回复！ 人工智能 SDK 使使用 Next.js 构建人工智能聊天界面变得快速而简单。

现在我们已经设置好了聊天机器人，让我们使用 Kaia Agent Kit 添加使用链上工具执行区块链交易等功能。

## 使用 Kaia 代理工具包利用链上工具扩展代理

到目前为止，我们已经构建了一个功能强大的人工智能聊天机器人，它可以处理对话并生成回复。 现在，让我们使用 Kaia 代理工具包为它增添链上功能。  这样，我们的聊天机器人就从一个简单的对话式人工智能发展成为一个强大的链上代理，可以在区块链上实时行动。

### 安装依赖项

安装 Kaia 代理工具包和其他附属软件包，以便将链上功能集成到我们的人工智能代理中。

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-vercel-ai @goat-sdk/wallet-viem viem 
```

:::note
Kaia Agent Kit 提供了在 Kaia 上执行链上操作的工具访问权限，而其他依赖项则有助于将链上工具与 AI SDK 连接起来，并处理钱包管理。
:::

### 配置环境

编辑项目根目录下的 .env 文件并添加以下内容：

```bash
WALLET_PRIVATE_KEY=0x_PRIVATE_KEY
RPC_PROVIDER_URL=https://public-en.node.kaia.io
KAIASCAN_API_KEY=your_kaiascan_api_key
```

### 更新 route.ts 文件以便链上执行

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

**代码演练**

这个更新的 `route.ts` 文件使用 Kaia Agent Kit、Viem 和 Vercel AI SDK 将区块链功能集成到我们的人工智能代理中。 以下是详细情况：

- **设置区块链工具和钱包**
 - 导入 Viem、Kaia Agent Kit 和其他工具，以便将链上工具与 Vercel AI SDK 连接起来。
 - 使用 privateKeyToAccount 通过环境变量（WALLET_PRIVATE_KEY）创建钱包账户。
 - 初始化 Viem 的钱包客户端，以便使用 RPC 提供者与 Kaia 区块链交互。
- **加载链上工具**
 - 使用 getOnChainTools 加载 Kaia 代理工具包的链上工具。 请注意，您可以通过配置软件包数组并传递以下任一值来限制人工智能代理对特定工具的访问：PackagesEnum.WEB3、PackagesEnum.KAIASCAN、PackagesEnum.DGSWAP。 留空时，默认启用所有软件包。
- **整合人工智能和区块链能力**
 - 流文本的调用条件是
  - 谷歌双子星 1.5 Pro 作为 LLM 模型
  - 实现区块链交易的 Onchain 工具（工具
  - 对话历史（信息）
  - 多步骤执行（maxSteps: 10），用于处理复杂的工作流程
- \*\* 返回流式人工智能响应\*\*
 人工智能代理处理请求，并利用嵌入式链上功能流式传输响应。

## 测试代理功能

要使用链上能力重启应用程序，请使用以下命令：

```bash
pnpm run dev 
```

现在您可以与人工智能代理互动，对 Kaia 执行链上操作：

```bash
Check this address:  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 KAIA balance on kairos

Send 1 KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on Kairos

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Get the balance (native, fungible, non-fungible) of this account  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos. Display the first 5 if there are many

What is Kaia current info?

Get me the current block number on Kairos
```

**输出**

![](/img/build/tools/kaia-agent-kit/kaia-agent-vercel-ai.gif)

## 其他信息

- [Vercel AI SDK](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router)
- [多模式聊天机器人](https://sdk.vercel.ai/docs/guides/multi-modal-chatbot)
- [工具](https://sdk.vercel.ai/docs/foundations/tools)





