# LangChain

## Overview 

Kaia Agent Kit integrates with several popular AI frameworks, enabling you to build agents that execute onchain actions autonomously using your preferred development tools. In this guide, learn how to create an AI Agent with [LangChain](https://www.langchain.com/agents) which uses [Kaia Agent Kit](https://github.com/kaiachain/kaia-agent-kit) for onchain actions. . 

## Prerequisite 
- [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation) installed
- A [Kaia Wallet](https://www.kaiawallet.io/) with private key ready
- [Google Generative API key](https://ai.google.dev/gemini-api/docs/api-key)
- An [RPC Provider](https://docs.kaia.io/references/public-en/) for the Kaia network
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)

## Getting Started 

In this guide, we’ll build an AI agent using LangChain and Kaia Agent Kit that can:

- Send native tokens, fungible tokens (FTs), and NFTs.
- Check balances of native tokens, FTs, and NFTs.
- Fetch blockchain data Kaiascan API to retrieve network summaries, Kaia’s price, token balances for an address, and more.

### Understanding the AI Agent Stack

Before diving into the code, let's understand the key technologies:

**LangChain**

LangChain is a powerful framework for building applications powered by large language models (LLMs). It offers an agent architecture that allows language models to use external tools and make decisions, memory management for context-awareness across multiple interactions, and a reasoning and action pattern that enables agents to think through information before taking steps.

**Kaia Agent Kit**

Kaia Agent Kit on the other hand is a tool for plugging onchain tools to AI agents, allowing them to interact seamlessly with Kaia blockchain. This will enable the agent to execute actions onchain, fetch onchain information, verify transactions autonomously. 

## Project Setup 

1. Create a new project directory:

``` bash
mkdir kaia-agentkit-langchain-example
cd kaia-agentkit-langchain-example
```

2. Initialize a Node.js project:

```bash
pnpm init 
```
3. Install dependencies:

```
pnpm add @kaiachain/kaia-agent-kit @langchain/core @langchain/langgraph @langchain/google-genai @goat-sdk/adapter-langchain @goat-sdk/wallet-viem viem tsx
```
4. Create a .env file in the root of your project

```bash
touch .env
```

Make sure to add the following in your newly created .env file, replacing the dummy values with your actual values: 

```bash
GOOGLE_API_KEY=your_google_api_key
WALLET_PRIVATE_KEY=your_wallet_private_key
RPC_PROVIDER_URL=your_rpc_url
KAIASCAN_API_KEY=your_kaiascan_api
```
:::warning
Never commit your .env file or your private key to a public repo, and please keep the keys you use in development – not associated with any real funds. Ultimately, add .env to your .gitignore file.
:::

**Project Structure** 

```bash
kaia-agentkit-langchain-example/
|── agent.ts       <- create the main agent file
├── .env              <- environment variables
├── package.json
├── pnpm-lock.yaml
```

## Code Implementation

### Agent.ts 

This is the main application file where we set up LangChain ReAct Agent, Kaia Agent Kit, wallet, and the interactive prompt. 

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

**Code Walkthrough**

Lets take a look at the core workings of the code: 

- **LangChain Components:**
    - ChatGoogleGenerativeAI: Interface to Google's Generative AI
    - MemorySaver: Stores conversation state between interactions
    - HumanMessage: Structures input messages from users
    - createReactAgent: Creates an agent that follows the ReAct pattern
- **Blockchain Libraries:**
    - viem: EVM library for interacting with blockchains
    - kairos: Chain configuration for the Kairos network
- **Tool and Agent Initialization:**
    - getOnChainTools: Converts blockchain functions into LangChain tools
    - Kaia: Plugin for Kaia-specific blockchain interactions
    - Incorporates Kaia plugin with API key for advanced blockchain queries
- **LLM Configuration:**
    - Uses Google's Gemini 1.5 Pro model as the agent's intelligence

## Run the Agent

Setup is complete. To run the agent, execute the following command in your terminal:

```bash
pnpm tsx agent.ts
```

You can now interact with your AI agent to perform onchain actions on Kaia:

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? 
Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos
````

**Output**

![](/img/build/tools/kaia-agent-kit/langchain-demo.gif)

## Additional Resources

- [Multiple agents systems](https://langchain-ai.github.io/langgraphjs/tutorials/multi_agent/multi_agent_collaboration/)
- [LangGraph Quickstart guide](https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/)
- [Prebuilt LangChain tools](https://js.langchain.com/docs/integrations/tools/)





