# 模型上下文通訊協定 (MCP)

## 概述

Kaia Agent Kit 整合了多種流行的 AI 框架，讓您可以使用偏好的開發工具建立具備區塊鏈功能的代理程式。 在本指南中，您將學習如何使用 [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) 伺服器建立 AI Agent，該伺服器使用 Kaia Agent Kit 進行 onchain 動作，並使用 Claude Desktop 等 MCP 主機。

## 先決條件

- 已安裝 [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation)
- 已準備好私密金鑰的 [Kaia Wallet](https://www.kaiawallet.io/)
- [Google Generative API key](https://ai.google.dev/gemini-api/docs/api-key)
- Kaia 網路的 [RPC Provider](https://docs.kaia.io/references/public-en/)
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)
- [Claude Desktop](https://claude.ai/download)

## 開始使用

在本指南中，我們將使用 Kaia Agent Kit + MCP 主機 (Claude Desktop)，建立一個使用 MCP 伺服器的 AI 代理，並具備上鏈功能，可以：

- 發送原生代幣、可替代代幣 (FT) 和 NFT。
- 檢查原生代幣、FT 和 NFT 的餘額。
- 擷取區塊鏈資料 Kaiascan API 可擷取網路摘要、Kaia 的價格、地址的代幣餘額等。

### 瞭解 AI 代理堆疊

在深入瞭解程式碼之前，讓我們先瞭解關鍵技術：

\*\*什麼是 MCP？

MCP 是一個通用且開放的標準，可讓 AI 系統與資料來源和外部工具互動，進而提供所需的資料。  MCP 核心採用用戶端伺服器架構，主機應用程式可連線至數個伺服器。 一方面，MCP 伺服器可作為閘道，揭露特定功能：例如透過標準化的 Model Context Protocol 進行區塊鏈互動；另一方面，我們將在本指南中使用的 MCP 主機 (例如 Claude Desktop)，可作為希望透過 MCP 存取資料的工具。

此外，MCP 伺服器負責處理來自用戶端、主機的傳入要求，並傳回適當的回應資料。 在這種情況下，它們使用 MCP 通訊協定，以標準通道 (stdio、HTTP 或套接字) 與 LLM 進行通訊，並傳回結構佳的輸出。 MCP 通訊協定的設計具有擴充性，允許開發人員隨時新增 [工具](https://modelcontextprotocol.io/docs/concepts/tools)、[資源](https://modelcontextprotocol.io/docs/concepts/resources)、[提示](https://modelcontextprotocol.io/docs/concepts/prompts)。

在本指南中，我們將在 MCP 伺服器工具中加入 onchain 功能，以便使用 Kaia Agent Kit 與 Kaia 區塊鏈互動。

**Kaia 代理套件**

另一方面，Kaia Agent Kit 是一種工具，可將上鏈工具插入 AI 代理，讓它們與 Kaia 區塊鏈進行無縫互動。 這將使代理能夠自主執行鏈上動作、獲取鏈上資訊、驗證交易。

## 專案設定

1. 建立新的專案目錄：

```bash
mkdir kaia-agentkit-mcp-example
cd kaia-agentkit-mcp-example
```

2. 初始化 Node.js 專案：

```bash
pnpm  init 
```

3. 安裝相依性：

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-model-context-protocol @goat-sdk/wallet-viem @modelcontextprotocol/sdk dotenv viem 
```

```bash
pnpm add -D @types/node typescript
```

4. 更新您的 package.json，加入 "type"："module "屬性和下列建立腳本

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

5. 在專案根目錄建立 tsconfig.json：

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

## 建立您的伺服器

**1. 建立包含 index.ts 的 src 資料夾**

複製並貼上以下程式碼到您的 src/index.ts 檔案：

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

上面這段程式碼建立了一個模型上下文通訊協定 (Model Context Protocol, MCP) 伺服器，讓 AI 系統可以透過設定一個錢包用戶端、透過適配器和 Kaia Agent Kit 擷取區塊鏈工具，以及透過標準輸入/輸出通訊通道處理列出可用工具和執行區塊鏈作業的請求，與 Kaia 區塊鏈進行互動。

**2. 建立專案**

請務必使用以下指令建立您的伺服器：

```bash
pnpm build 
```

這會產生 build/ 目錄，其中包含編譯好的 index.js 檔案，這是讓伺服器連線的關鍵。

**3. 設定 Claude 桌面**

我們需要為您要使用的 MCP 伺服器設定 Claude for Desktop。 若要執行此動作，請以文字編輯器開啟您的 Claude for Desktop App 設定，位於 `~/Library/Application Support/Claude/claude_desktop_config.json`。

執行下列指令開啟您的 claude_desktop_config.json 檔案：

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

然後，您會在 mcpServers 金鑰中加入您的伺服器。 在這種情況下，我們會如下所示加入我們的 kaia-agent 伺服器：

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

- 將 **wallet-private-key** 改為您的錢包私人密碼鑰匙。
- 將 **rpc-provider-url** 改為您的 RPC 提供者網址。
- 將 **kaiascan-api-key** 替換為您的 Kaiascan API 金鑰
- 將 **/absolute-path-to** 改為專案目錄的絕對路徑 (例如：/Users/username/ai-agent/mcp/kaia-agentkit-mcp-example/build/index.js)。

儲存檔案，並重新啟動 Claude Desktop。 您的 MCP 伺服器工具現在應該可以在 Claude Desktop 中使用。

![](/img/build/tools/kaia-agent-kit/kaia-mcp-claude-tool.gif)

## 使用 Claude for Desktop 測試您的伺服器

現在您可以與您的 AI 代理互動，在 Kaia 上執行 onchain 動作：

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 
```

**輸出**

![](/img/build/tools/kaia-agent-kit/kaia-mcp.gif)

## 其他資源

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction)
- [Claude Desktop Documentation](https://docs.anthropic.com/claude/docs)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)：調試 MCP 伺服器的有用工具




