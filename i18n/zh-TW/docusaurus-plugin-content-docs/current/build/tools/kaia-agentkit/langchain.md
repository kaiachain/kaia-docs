# LangChain

## 概述

Kaia Agent Kit 整合了多種流行的 AI 框架，讓您可以使用偏好的開發工具，建立能自主執行 onchain 動作的代理程式。 在本指南中，您將學習如何使用[LangChain](https://www.langchain.com/agents)建立一個 AI Agent，並使用[Kaia Agent Kit](https://github.com/kaiachain/kaia-agent-kit)進行上鏈動作。 .

## 先決條件

 - 已安裝 [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation)
 - 已準備好私密金鑰的 [Kaia Wallet](https://www.kaiawallet.io/)
 - [Google Generative API key](https://ai.google.dev/gemini-api/docs/api-key)
 - Kaia 網路的 [RPC Provider](https://docs.kaia.io/references/public-en/)
 - [Kaiascan API Key](https://docs.kaiascan.io/account-creation)

## 開始使用

在本指南中，我們將使用 LangChain 和 Kaia Agent Kit 建立一個 AI 代理，它可以：

 - 發送原生代幣、可替代代幣 (FT) 和 NFT。
 - 檢查原生代幣、FT 和 NFT 的餘額。
 - 擷取區塊鏈資料 Kaiascan API 可擷取網路摘要、Kaia 的價格、地址的代幣餘額等。

### 瞭解 AI 代理堆疊

在深入瞭解程式碼之前，讓我們先瞭解關鍵技術：

**LangChain**

LangChain 是一個功能強大的框架，用於建立由大型語言模型 (LLM) 驅動的應用程式。 它提供的代理體架構可讓語言模型使用外部工具並作出決策，記憶體管理可讓代理體在多重互動中感知情境，而推理與行動模式則可讓代理體在採取步驟之前先思考資訊。

**Kaia 代理套件**

另一方面，Kaia Agent Kit 是一種工具，可將上鏈工具插入 AI 代理，讓它們與 Kaia 區塊鏈進行無縫互動。 這將使代理能夠自主執行鏈上動作、獲取鏈上資訊、驗證交易。

## 專案設定

1. 建立新的專案目錄：

```bash
mkdir kaia-agentkit-langchain-example
cd kaia-agentkit-langchain-example
```

2. 初始化 Node.js 專案：

```bash
pnpm init 
```

3. 安裝相依性：

```
pnpm add @kaiachain/kaia-agent-kit @langchain/core @langchain/langgraph @langchain/google-genai @goat-sdk/adapter-langchain @goat-sdk/wallet-viem viem tsx
```

4. 在專案根目錄中建立 .env 檔案

```bash
touch .env
```

請務必在新建立的 .env 檔案中加入下列內容，並以實際值取代虛擬值：

```bash
GOOGLE_API_KEY=your_google_api_key
WALLET_PRIVATE_KEY=your_wallet_private_key
RPC_PROVIDER_URL=your_rpc_url
KAIASCAN_API_KEY=your_kaiascan_api
```

:::warning
切勿將您的 .env 檔案或私人金鑰提交至公開 repo，並請保留您在開發中使用的金鑰 - 不要與任何實際資金相關聯。 最後，將 .env 加入您的 .gitignore 檔案。
:::

\*\* 專案結構\*\*

```bash
kaia-agentkit-langchain-example/
|── agent.ts       <- create the main agent file
├── .env              <- environment variables
├── package.json
├── pnpm-lock.yaml
```

## 代碼實施

### Agent.ts

這是主要的應用程式檔案，我們在這裡設定 LangChain ReAct Agent、Kaia Agent Kit、錢包和互動提示。

```typescript
#!/usr/bin/env node
import readline from 'node:readline';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { kairos } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-langchain";
import { viem } from "@goat-sdk/wallet-viem";
import { Kaia, PackagesEnum } from '@kaiachain/kaia-agent-kit';
// Load environment variables
import 'dotenv/config'
// Create a wallet client
const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: kairos,
});
(async () => {
    console.log("Initializing AI Agent...");
    
    // Define the tools for the agent to use
    const tools = await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [Kaia({KAIA_KAIASCAN_API_KEY: process.env.KAIASCAN_API_KEY, packages: []})]
    });
  
    // Initialize the agent with Google's Generative AI
    const agentModel = new ChatGoogleGenerativeAI({ model: "gemini-1.5-pro-latest" });
    const agentCheckpointer = new MemorySaver(); // Initialize memory to persist state
  
    const agent = createReactAgent({
        llm: agentModel,
        tools: tools,
        checkpointSaver: agentCheckpointer,
    });
    console.log("Agent initialized and ready to chat!");
    console.log("Type your questions or requests. Type 'exit' to quit.\n");
    // Setup readline interface for interactive terminal
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    // Thread ID to maintain conversation context
    const threadId = "interactive-session-" + Date.now();
    
    // Main interaction loop
    while (true) {
        const userPrompt = await new Promise<string>((resolve) => {
            rl.question('You: ', resolve);
        });
        
        // Check for exit command
        if (userPrompt.toLowerCase() === 'exit') {
            console.log("Goodbye!");
            rl.close();
            break;
        }
        
        console.log("\nAgent is thinking...");
        
        try {
            // Invoke the agent with the user's message
            const agentFinalState = await agent.invoke(
                {
                    messages: [new HumanMessage(userPrompt)],
                },
                { configurable: { thread_id: threadId } }
            );
            
            // Get the agent's response
            const agentResponse = agentFinalState.messages[agentFinalState.messages.length - 1].content;
            console.log("\nAgent:\n" + agentResponse + "\n");
        } catch (error) {
            // @ts-ignore
            console.error("Error from agent:", error.message || error);
        }
        console.log("\n-------------------\n");
    }
})().catch(error => {
    console.error("Fatal error:", error);
    process.exit(1);
});
```

**代碼演練**

讓我們來看看程式碼的核心運作：

 - **LangChain 元件：**
     - 聊天GoogleGenerativeAI：Google 的 Generative AI 介面
     - MemorySaver：在互動之間儲存對話狀態
     - HumanMessage：結構化使用者輸入的訊息
     - createReactAgent：建立一個遵循 ReAct 模式的代理程式
 - \*\* 區塊鏈程式庫：\*\*
     - viem：與區塊鏈互動的 EVM 函式庫
     - kairos：Kairos 網路的連鎖組態
 - **工具與代理程式初始化：**
     - getOnChainTools：將區塊鏈函數轉換為 LangChain 工具
     - Kaia：Kaia 特定區塊鏈互動的外掛程式
     - 結合 Kaia 外掛程式與 API 金鑰，進行進階區塊鏈查詢
 - **LLM 配置：**
     - 使用 Google 的 Gemini 1.5 Pro 模型作為代理的智慧功能

## 執行代理程式

設定完成。 若要執行代理程式，請在終端機執行下列指令：

```bash
pnpm tsx agent.ts
```

現在您可以與您的 AI 代理互動，在 Kaia 上執行 onchain 動作：

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? 
Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos
```

**輸出**

![](/img/build/tools/kaia-agent-kit/langchain-demo.gif)

## 其他資源

 - [多重代理系統](https://langchain-ai.github.io/langgraphjs/tutorials/multi_agent/multi_agent_collaboration/)
 - [LangGraph 快速入門指南](https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/)
 - [Prebuilt LangChain tools](https://js.langchain.com/docs/integrations/tools/)





