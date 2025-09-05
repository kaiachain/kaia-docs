# LangChain

## 概述

Kaia Agent Kit 集成了多个流行的人工智能框架，使您能够使用自己喜欢的开发工具构建能自主执行链上操作的代理。 在本指南中，您将学习如何使用[LangChain](https://www.langchain.com/agents) 创建一个人工智能代理，该代理使用[Kaia Agent Kit](https://github.com/kaiachain/kaia-agent-kit) 进行链上操作。 .

## 先决条件

- 已安装 [Node.js](https://nodejs.org/en/download) 和 [pnpm](https://pnpm.io/installation)
- 已准备好私钥的 [Kaia 钱包](https://www.kaiawallet.io/)
- [Google Generative API key](https://ai.google.dev/gemini-api/docs/api-key)
- Kaia 网络的[RPC Provider](https://docs.kaia.io/references/public-en/)
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)

## 开始使用

在本指南中，我们将使用 LangChain 和 Kaia Agent Kit 构建一个人工智能代理，它可以：

- 发送本地代币、可互换代币 (FT) 和 NFT。
- 检查本地代币、FT 和 NFT 的余额。
- 获取区块链数据 Kaiascan API 可检索网络摘要、Kaia 的价格、地址的代币余额等。

### 了解人工智能代理堆栈

在深入了解代码之前，我们先来了解一下关键技术：

\*\* 朗链\*\*

LangChain 是一个功能强大的框架，用于构建由大型语言模型（LLM）驱动的应用程序。 它提供了一种代理架构，允许语言模型使用外部工具并做出决策；提供了内存管理，可在多次交互中实现上下文感知；还提供了一种推理和行动模式，使代理在采取措施之前能够对信息进行思考。

**凯亚代理套件**

另一方面，Kaia Agent Kit 是一种将链上工具插入人工智能代理的工具，使它们能够与 Kaia 区块链无缝互动。 这将使代理能够自主执行链上操作、获取链上信息、验证交易。

## 项目设置

1. 创建一个新的项目目录：

```bash
mkdir kaia-agentkit-langchain-example
cd kaia-agentkit-langchain-example
```

2. 初始化 Node.js 项目：

```bash
pnpm init 
```

3. 安装依赖项：

```
pnpm add @kaiachain/kaia-agent-kit @langchain/core @langchain/langgraph @langchain/google-genai @goat-sdk/adapter-langchain @goat-sdk/wallet-viem viem tsx
```

4. 在项目根目录下创建 .env 文件

```bash
touch .env
```

确保在新创建的 .env 文件中添加以下内容，用实际值替换虚拟值：

```bash
GOOGLE_API_KEY=your_google_api_key
WALLET_PRIVATE_KEY=your_wallet_private_key
RPC_PROVIDER_URL=your_rpc_url
KAIASCAN_API_KEY=your_kaiascan_api
```

:::warning
切勿将您的 .env 文件或私人密钥提交到公共 repo，请将您在开发中使用的密钥保存在公共 repo 中，不要与任何实际资金关联。 最后，将 .env 添加到 .gitignore 文件中。
:::

**项目结构**

```bash
kaia-agentkit-langchain-example/
|── agent.ts       <- create the main agent file
├── .env              <- environment variables
├── package.json
├── pnpm-lock.yaml
```

## 代码执行

### Agent.ts

这是主应用程序文件，我们在其中设置了 LangChain ReAct Agent、Kaia Agent Kit、钱包和交互式提示符。

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

**代码演练**

让我们来看看代码的核心工作原理：

- **LangChain 组件：**
  - 聊天谷歌生成式人工智能：谷歌生成式人工智能的界面
  - 记忆保存器在交互之间存储对话状态
  - HumanMessage：构建来自用户的输入信息
  - createReactAgent：创建一个遵循 ReAct 模式的代理
- **区块链库：**
  - viem：与区块链交互的 EVM 库
  - kairos： Kairos 网络的链式配置
- **工具和代理初始化：**
  - getOnChainTools：将区块链函数转换为 LangChain 工具
  - Kaia：Kaia 专用区块链交互插件
  - 包含 Kaia 插件和 API 密钥，可进行高级区块链查询
- **LLM 配置：**
  - 使用谷歌 Gemini 1.5 Pro 模型作为代理的智能系统

## 运行代理

设置完成。 要运行代理，请在终端中执行以下命令：

```bash
pnpm tsx agent.ts
```

现在您可以与人工智能代理互动，对 Kaia 执行链上操作：

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? 
Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos
```

**输出**

![](/img/build/tools/kaia-agent-kit/langchain-demo.gif)

## 其他资源

- [多重代理系统](https://langchain-ai.github.io/langgraphjs/tutorials/multi_agent/multi_agent_collaboration/)
- [LangGraph快速入门指南](https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/)
- [预构建的 LangChain 工具](https://js.langchain.com/docs/integrations/tools/)





