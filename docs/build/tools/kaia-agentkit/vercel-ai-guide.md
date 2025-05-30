# Vercel AI SDK

## Overview 

Kaia Agent Kit integrates with several popular AI frameworks, enabling you to build blockchain-capable agents using your preferred development tools. In this guide, learn how to create an AI Agent with Vercel AI SDK integrating Kaia Agent Kit for onchain actions. 

## Prerequisite 
- [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation) installed
- A [Kaia Wallet](https://www.kaiawallet.io/) with private key ready
- [Google Generative API key](https://ai.google.dev/gemini-api/docs/api-key)
- An [RPC Provider](https://docs.kaia.io/references/public-en/) for the Kaia network
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)

## Getting Started
In this guide, we’ll build a basic AI agent using Vercel AI SDK and Kaia Agent Kit that can:

- Send native tokens, fungible tokens (FTs), and NFTs.
- Check balances of native tokens, FTs, and NFTs.
- Fetch blockchain using (or via) data Kaiascan API to retrieve network summaries, Kaia’s price, token balances for an address, and more.

By the end of this guide, you'll have a functional AI agent capable of interacting with the Kaia blockchain, executing transactions, and retrieving key onchain data—all autonomously. 

### Understanding the AI Agent Stack

To build a powerful onchain AI agent, we need the right tools. This guide leverages Vercel AI SDK for AI capabilities and Kaia Agent Kit  for blockchain interactions.

**Vercel AI SDK — The AI Engine**

Vercel AI SDK is a TypeScript toolkit that makes it easy to build AI-powered applications and agents using frameworks like React, Next.js, Vue, Svelte, and Node.js. It supports multiple AI models, and for this guide, we’ll use [Google Generative AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai) as our model provider. 

**Kaia Agent Kit -  Supercharging AI Agents with Onchain Tools**

Kaia Agent Kit brings onchain tools to AI agents, allowing them to interact seamlessly with Kaia blockchain. This will enable the agent to execute actions onchain, fetch onchain information, verify transactions, and interact with smart contracts dynamically.

Leveraging both the Vercel AI SDK and the Kaia Agent Kit, we will create an AI agent capable of autonomous reasoning, action, and blockchain interaction

## Initializing Project

### Vercel AI SDK 

Start by creating a new Next.js application. This command will create a new directory named kaia-agent-kit-vercel-ai-example and set up a basic Next.js application inside it.

```bash
 pnpm create next-app@latest kaia-agent-kit-vercel-ai-example
```
For this guide, please enter the values below for the command-line prompt:

```bash
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```

Navigate to the newly created directory:

```bash
cd kaia-agent-kit-vercel-ai-example
```

### Installing dependencies

Install `ai`, `@ai-sdk/react`, and `@ai-sdk/google`, the AI package, AI SDK's React hooks, and AI SDK's Google [Generative AI provider](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai) respectively.

```bash
pnpm add ai @ai-sdk/react @ai-sdk/google zod dotenv
```

### Configuring Google Generative AI API key

Create a `.env` file in your project root and add your Google Generative AI API Key. This key is used to authenticate your application with the Google Generative AI service.

```bash
touch .env
```
Edit the .env file:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=xxxxxxxxx
```
Replace xxxxxxxxx with your actual GOOGLE_GENERATIVE_AI API key

### Creating a Route Handler

Create a route handler, `app/api/chat/route.ts` and add the following code:

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

**Code walkthrough:**

This code defines an API route handler (POST /api/chat) that processes chatbot messages using Google's Gemini AI model via Vercel's AI SDK. Here's what happens:

- **Extract conversation history**: The handler reads the incoming request and retrieves the messages, which contain the chat history.
- **Generate AI response**: It calls streamText() with Google's Gemini 1.5 Pro model, passing the chat history for context.
- **Stream the response**: The function returns a streamed response using toDataStreamResponse(), allowing real-time text generation.
- **Limits execution time**:The maxDuration variable ensures the response doesn't exceed 30 seconds.

This setup enables real-time AI-generated responses in a chatbot by leveraging Google's Gemini AI with Vercel AI SDK. 

### Wiring up the UI

Now that you have a Route Handler that can query an LLM, it's time to set up your frontend. The AI SDK's [UI](https://sdk.vercel.ai/docs/ai-sdk-ui) package abstracts the complexity of a chat interface into one hook, [useChat](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat).
Update your root page (app/page.tsx) with the following code to show a list of chat messages and provide a user message input:

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

**Code Walkthrough:**

This React component creates a simple chat interface using the useChat() hook from Vercel AI SDK. Here's what it does:

- **Manages Chat State**: The useChat() hook provides:
    - messages: The chat history (with id, role, and content).
    - input: The current user input.
    - handleInputChange: Updates the input field as the user types.
    - handleSubmit: Sends the message when the form is submitted.
- **Displays Messages**: The component maps over messages, showing whether the text is from the user or the AI.
- **Handles User Input**: It includes an input field where users can type messages, which are then sent when they press enter.

This setup enables real-time interaction with the AI chatbot by connecting to the API route (/api/chat) created earlier.

### Running Your Application

With that, you have built everything you need for your chatbot! To start your application, use the command:

```bash
pnpm run dev
```
Head to your browser and open http://localhost:3000. You should see an input field. Test it out by entering a message and see the AI chatbot respond in real-time! The AI SDK makes it fast and easy to build AI chat interfaces with Next.js.

Now that we have set up our chatbot, let’s add the ability to use onchain tools to execute blockchain transactions et al by using Kaia Agent Kit. 

## Extending Agent with Onchain Tools Using Kaia Agent Kit

So far, we’ve built a functional AI chatbot that can process conversations and generate responses. Now, let's supercharge it with onchain capabilities using Kaia Agent Kit.  With this, our chatbot evolves from a simple conversational AI to a powerful onchain agent that can act on the blockchain in real time.

### Installing dependencies

Install Kaia Agent Kit and other dependent packages to integrate onchain functionalities into our AI agent. 

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-vercel-ai @goat-sdk/wallet-viem viem 
```

:::note
Kaia Agent Kit provides access to tools to execute onchain actions on Kaia, while the other dependencies help bridge the onchain tools with the AI SDK, and handle wallet management. 
:::

### Configuring environment

Edit your  .env file in the root of the project and add the following:

```bash
WALLET_PRIVATE_KEY=0x_PRIVATE_KEY
RPC_PROVIDER_URL=https://public-en.node.kaia.io
KAIASCAN_API_KEY=your_kaiascan_api_key
```

### Updating route.ts file for onchain execution

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
**Code Walkthrough**

This updated `route.ts` file integrates blockchain capabilities into our AI agent using Kaia Agent Kit, Viem, and Vercel AI SDK. Here's a breakdown of what’s happening:

-  **Setting Up Blockchain Tools & Wallets**
    - Imports Viem, Kaia Agent Kit, and other tools for bridging onchain tools with Vercel AI SDK.
    - Uses privateKeyToAccount to create a wallet account from an environment variable (WALLET_PRIVATE_KEY).
    - Initializes Viem’s wallet client to interact with the Kaia blockchain using an RPC provider.
- **Loading Onchain Tools**
    - Uses getOnChainTools to load Kaia Agent Kit onchain tools. Please note that you can restrict the AI agent's access to specific tools by configuring the packages array and passing in either of these values: PackagesEnum.WEB3, PackagesEnum.KAIASCAN, PackagesEnum.DGSWAP. When left empty, all packages are enabled by default.
- **Integrating AI & Blockchain Capabilities**
    - streamText is called with:
        - Google Gemini 1.5 Pro as the LLM model
        - Onchain tools (tools) to enable blockchain transactions
        - Conversation history (messages)
        - Multi-step execution (maxSteps: 10) for handling complex workflows
- **Returning Streamed AI Responses**
The AI agent processes the request and streams the response with embedded onchain capabilities.

## Testing Agent functionality

To restart your application with onchain abilities, use the command:

```bash
pnpm run dev 
```
You can now interact with your AI agent to perform onchain actions on Kaia:

```bash
Check this address:  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 KAIA balance on kairos

Send 1 KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on Kairos

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Get the balance (native, fungible, non-fungible) of this account  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos. Display the first 5 if there are many

What is Kaia current info?

Get me the current block number on Kairos
```
**Output**

![](/img/build/tools/kaia-agent-kit/kaia-agent-vercel-ai.gif)

## Additional Information 

- [Vercel AI SDK](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router)
- [Multi-Modal Chat bot](https://sdk.vercel.ai/docs/guides/multi-modal-chatbot)
- [Tools](https://sdk.vercel.ai/docs/foundations/tools)





