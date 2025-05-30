# 模型上下文协议（MCP）

## 概述

Kaia Agent Kit 集成了多个流行的人工智能框架，使您能够使用自己喜欢的开发工具构建支持区块链的代理。 在本指南中，您将了解如何使用[模型上下文协议（MCP）](https://modelcontextprotocol.io/introduction) 服务器创建人工智能代理，该服务器使用 Kaia Agent Kit 进行链上操作，并使用 Claude Desktop 等 MCP 主机。

## 先决条件

- 已安装 [Node.js](https://nodejs.org/en/download) 和 [pnpm](https://pnpm.io/installation)
- 已准备好私钥的 [Kaia 钱包](https://www.kaiawallet.io/)
- [Google Generative API key](https://ai.google.dev/gemini-api/docs/api-key)
- Kaia 网络的[RPC Provider](https://docs.kaia.io/references/public-en/)
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)
- [Claude Desktop](https://claude.ai/download)

## 开始使用

在本指南中，我们将使用 Kaia Agent Kit + MCP 主机（Claude Desktop）构建一个具有链上功能的 MCP 服务器人工智能代理：

- 发送本地代币、可互换代币 (FT) 和 NFT。
- 检查本地代币、FT 和 NFT 的余额。
- 获取区块链数据 Kaiascan API 可检索网络摘要、Kaia 的价格、地址的代币余额等。

### 了解人工智能代理堆栈

在深入了解代码之前，我们先来了解一下关键技术：

\*\*什么是 MCP？

MCP 是一种通用的开放标准，用于人工智能系统与数据源和外部工具进行交互，从而为它们提供所需的数据。  MCP 的核心是客户端-服务器架构，一个主机应用程序可以连接多个服务器。 一方面，MCP 服务器充当网关，公开特定功能：例如，通过标准化的模型上下文协议进行区块链交互；另一方面，我们将在本指南中使用的 MCP 主机（例如 Claude Desktop）充当希望通过 MCP 访问数据的工具。

此外，MCP 服务器还负责处理来自客户端和主机的传入请求，并返回适当的响应数据。 在这种情况下，它们使用 MCP 协议，通过标准通道（stdio、HTTP 或套接字）与 LLM 通信，并返回结构良好的输出。 MCP 协议的设计具有可扩展性，允许开发人员随时添加新的[工具](https://modelcontextprotocol.io/docs/concepts/tools)、[资源](https://modelcontextprotocol.io/docs/concepts/resources)和[提示](https://modelcontextprotocol.io/docs/concepts/prompts)。

在本指南中，我们将为我们的 MCP 服务器工具添加链上功能，以便使用 Kaia Agent Kit 与 Kaia 区块链进行交互。

**凯亚代理套件**

另一方面，Kaia Agent Kit 是一种将链上工具插入人工智能代理的工具，使它们能够与 Kaia 区块链无缝互动。 这将使代理能够自主执行链上操作、获取链上信息、验证交易。

## 项目设置

1. 创建一个新的项目目录：

```bash
mkdir kaia-agentkit-mcp-example
cd kaia-agentkit-mcp-example
```

2. 初始化 Node.js 项目：

```bash
pnpm  init 
```

3. 安装依赖项：

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-model-context-protocol @goat-sdk/wallet-viem @modelcontextprotocol/sdk dotenv viem 
```

```bash
pnpm add -D @types/node typescript
```

4. 更新 package.json，添加 "type"："模块 "属性和以下构建脚本

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

5. 在项目根目录下创建 tsconfig.json：

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

## 构建服务器

**1. 创建包含 index.ts 的 src 文件夹**

将下面的代码复制并粘贴到 src/index.ts 文件中：

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

上述代码创建了一个模型上下文协议（MCP）服务器，使人工智能系统能够通过设置钱包客户端与 Kaia 区块链进行交互，通过适配器和 Kaia 代理工具包检索区块链工具，并通过标准输入/输出通信通道处理列出可用工具和执行区块链操作的请求。

**2. 建设项目**

确保使用下面的命令构建服务器：

```bash
pnpm build 
```

这会生成 build/ 目录，其中包含编译后的 index.js 文件，该文件对服务器连接至关重要。

**3. 配置克劳德桌面**

我们需要为要使用的 MCP 服务器配置 Claude for Desktop。 为此，请使用文本编辑器打开 Claude for Desktop App 配置，地址为`~/Library/Application Support/Claude/claude_desktop_config.json`。

运行以下命令打开 claude_desktop_config.json 文件：

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

然后在 mcpServers 密钥中添加服务器。 在这种情况下，我们将添加 kaia-agent 服务器，如下图所示：

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

- 将 **wallet-private-key** 替换为你的钱包私钥。
- 将 **rpc-provider-url** 替换为您的 RPC 提供商网址。
- 将 **kaiascan-api-key** 替换为您的 Kaiascan API 密钥
- 将 **/absolute-path-to** 替换为项目目录的绝对路径（例如，/Users/username/ai-agent/mcp/kaia-agentkit-mcp-example/build/index.js）。

保存文件并重新启动 Claude Desktop。 现在，您的 MCP 服务器工具应该可以在克劳德桌面上使用了

![](/img/build/tools/kaia-agent-kit/kaia-mcp-claude-tool.gif)

## 使用克劳德桌面版测试服务器

现在您可以与人工智能代理互动，对 Kaia 执行链上操作：

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 
```

**输出**

![](/img/build/tools/kaia-agent-kit/kaia-mcp.gif)

## 其他资源

- [模型上下文协议文档](https://modelcontextprotocol.io/introduction)
- [Claude Desktop Documentation](https://docs.anthropic.com/claude/docs)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)：调试 MCP 服务器的有用工具




