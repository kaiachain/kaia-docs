# Model Context Protocol (MCP)

## Overview 

Kaia Agent Kit integrates with several popular AI frameworks, enabling you to build blockchain-capable agents using your preferred development tools. In this guide, learn how to create an AI Agent with [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server that uses Kaia Agent Kit for onchain actions and MCP hosts such as Claude Desktop. 

## Prerequisites

- [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation) installed
- A [Kaia Wallet](https://www.kaiawallet.io/) with private key ready
- [Google Generative API key](https://ai.google.dev/gemini-api/docs/api-key)
- An [RPC Provider](https://docs.kaia.io/references/public-en/) for the Kaia network
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)
- [Claude Desktop](https://claude.ai/download)

## Getting Started 

In this guide, we’ll build an AI agent using MCP server with onchain capabilities using Kaia Agent Kit  +  MCP host (Claude Desktop) that can:

- Send native tokens, fungible tokens (FTs), and NFTs.
- Check balances of native tokens, FTs, and NFTs.
- Fetch blockchain data Kaiascan API to retrieve network summaries, Kaia’s price, token balances for an address, and more.

### Understanding the AI Agent Stack 

Before diving into the code, let's understand the key technologies:

**What is MCP ?** 

MCP is a universal and open standard for AI systems to interact with data sources and external tools thence providing them with the data they need.  At its core, MCP follows a client-server architecture where a host application can connect to several servers. On one hand, the MCP servers act as gateways that exposes specific capabilities: e.g. blockchain interactions through the standardised Model Context Protocol and on the other hand, the MCP hosts (e.g. Claude Desktop) which we would be using this guide, acts as tools that wants to access data through the MCP. 

Additionally, MCP servers are responsible for handling incoming requests from the client, host and returning appropriate response data. In this case, they use the MCP protocol to communicate with the LLM using standard channels (stdio, HTTP, or sockets), and return well-structured output. The MCP protocol is designed to be extensible, allowing developers to add new [tools](https://modelcontextprotocol.io/docs/concepts/tools), [resources](https://modelcontextprotocol.io/docs/concepts/resources), and [prompts](https://modelcontextprotocol.io/docs/concepts/prompts) on the go.

For this guide, we would add onchain capabilities to our MCP server tools for interacting with Kaia blockchain using Kaia Agent Kit.
 
**Kaia Agent Kit**

Kaia Agent Kit on the other hand is a tool for plugging onchain tools to AI agents, allowing them to interact seamlessly with Kaia blockchain. This will enable the agent to execute actions onchain, fetch onchain information, verify transactions autonomously. 

## Project Setup 

1. Create a new project directory:

``` bash
mkdir kaia-agentkit-mcp-example
cd kaia-agentkit-mcp-example
```
2. Initialize a Node.js project:

```bash
pnpm  init 
```
3. Install dependencies:

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-model-context-protocol @goat-sdk/wallet-viem @modelcontextprotocol/sdk dotenv viem 
```

```bash
pnpm add -D @types/node typescript
```

4. Update your package.json by adding the "type": "module" property and the following build script

```json
{
  "type": "module",
  "bin": {
    "kaia-mcp": "./build/index.js"
  },
  "scripts": {
    "build": "tsc && chmod 755 build/index.js"
  },
  "files": [
    "build"
  ],
}
```

5. Create a tsconfig.json in the root of your project:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Building your Server

**1. Create a src folder with index.ts**

Copy and paste the code below in your src/index.ts file:

```typescript
/*
Imports all the necessary libraries for:
MCP server communication
Blockchain interaction
Connecting MCP to blockchain tools
Specific Kaia blockchain functionality using Kaia Agent Kit
*/
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { kairos } from "viem/chains";
import { Kaia, PackagesEnum } from '@kaiachain/kaia-agent-kit';
import { getOnChainTools } from "@goat-sdk/adapter-model-context-protocol";
import { viem } from "@goat-sdk/wallet-viem";
// 1. Create the wallet client
const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: kairos,
});
// 2. Get the onchain tools for the wallet
const toolsPromise = getOnChainTools({
    wallet: viem(walletClient),
    plugins: [Kaia({KAIA_KAIASCAN_API_KEY: process.env.KAIASCAN_API_KEY, packages: []})]
});
// 3. Create and configure the server
const server = new Server(
    {
        name: "kaia-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    },
);

/* 
This section lists two handlers:
List Tools Handler: Responds with all available blockchain tools when an AI asks what tools are available
Call Tool Handler: Executes a specific blockchain tool when requested, passing the appropriate arguments and handling any errors
*/
server.setRequestHandler(ListToolsRequestSchema, async () => {
    const { listOfTools } = await toolsPromise;
    return {
        tools: listOfTools(),
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { toolHandler } = await toolsPromise;
    try {
        return toolHandler(request.params.name, request.params.arguments);
    } catch (error) {
        throw new Error(`Tool ${request.params.name} failed: ${error}`);
    }
});
// 4. Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("KAIA MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
```

This code above creates a Model Context Protocol (MCP) server that enables an AI system to interact with the Kaia blockchain by setting up a wallet client, retrieving blockchain tools through the adapter and Kaia Agent Kit, and handling requests to list available tools and execute blockchain operations through a standard input/output communication channel. 

**2. Build Project** 

Make sure to build your server with the command below:

```bash
pnpm build 
```
This generates the build/ directory containing the compiled index.js file, which is crucial in getting your server to connect.


**3. Configure Claude Desktop**

We’ll need to configure Claude for Desktop for the MCP servers you want to use. To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor. 

Run the command below to open your claude_desktop_config.json file:

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```
You’ll then add your server in the mcpServers key. In this case, we’ll add our kaia-agent server as shown below:

```json
{
    "mcpServers": {
        "kaia-agent": {
            "command": "node",
            "args": ["/ABSOLUTE/PATH/TO/PARENT/model-context-protocol/build/index.js"],
            "env": {
                "WALLET_PRIVATE_KEY": "PASTE_PRIVATE_KEY",
                "RPC_PROVIDER_URL": "PASTE_RPC_PROVIDER_URL",
                "KAIASCAN_API_KEY": "PASTE_KAIASCAN_API_KEY"
            }
        }
    }
}
```

- Replace **wallet-private-key** with your Wallet private key.
- Replace **rpc-provider-url** with your RPC provider url.
- Replace **kaiascan-api-key** with your Kaiascan API Key
- Replace **/absolute-path-to** with the absolute path to the project directory (e.g., /Users/username/ai-agent/mcp/kaia-agentkit-mcp-example/build/index.js).

Save the file and restart Claude Desktop. Your MCP server’s tools should now be available in Claude Desktop

![](/img/build/tools/kaia-agent-kit/kaia-mcp-claude-tool.gif)

## Testing your server with Claude for Desktop

You can now interact with your AI agent to perform onchain actions on Kaia:

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 
``` 

**Output**

![](/img/build/tools/kaia-agent-kit/kaia-mcp.gif)

## Additional Resources  

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction)
- [Claude Desktop Documentation](https://docs.anthropic.com/claude/docs)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector): A helpful tool for debugging your MCP server




