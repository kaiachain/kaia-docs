# Giao thức ngữ cảnh mô hình (MCP)

## Tổng quan

Kaia Agent Kit tích hợp với một số khuôn khổ AI phổ biến, cho phép bạn xây dựng các tác nhân có khả năng sử dụng blockchain bằng các công cụ phát triển ưa thích của bạn. Trong hướng dẫn này, hãy tìm hiểu cách tạo một tác nhân AI với máy chủ [Giao thức ngữ cảnh mô hình (MCP)](https://modelcontextprotocol.io/introduction) sử dụng Kaia Agent Kit cho các hành động trên chuỗi và máy chủ MCP như Claude Desktop.

## Điều kiện tiên quyết

- Đã cài đặt [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation)
- [Ví Kaia](https://www.kaiawallet.io/) có khóa riêng tư đã sẵn sàng
- [Khóa API tạo ra của Google](https://ai.google.dev/gemini-api/docs/api-key)
- [Nhà cung cấp RPC](https://docs.kaia.io/references/public-en/) cho mạng Kaia
- [Khóa API Kaiascan](https://docs.kaiascan.io/account-creation)
- [Máy tính để bàn Claude](https://claude.ai/download)

## Bắt đầu

Trong hướng dẫn này, chúng tôi sẽ xây dựng một tác nhân AI sử dụng máy chủ MCP có khả năng onchain bằng cách sử dụng Kaia Agent Kit + máy chủ MCP (Claude Desktop) có thể:

- Gửi token gốc, token có thể thay thế (FT) và NFT.
- Kiểm tra số dư của token gốc, FT và NFT.
- Lấy dữ liệu blockchain API Kaiascan để lấy tóm tắt mạng, giá Kaia, số dư mã thông báo cho một địa chỉ, v.v.

### Hiểu về AI Agent Stack

Trước khi tìm hiểu sâu hơn về mã, chúng ta hãy cùng tìm hiểu các công nghệ chính:

**MCP là gì?**

MCP là một tiêu chuẩn mở và phổ biến để các hệ thống AI tương tác với các nguồn dữ liệu và công cụ bên ngoài, từ đó cung cấp cho chúng dữ liệu cần thiết.  Về bản chất, MCP tuân theo kiến trúc máy khách-máy chủ trong đó ứng dụng lưu trữ có thể kết nối với nhiều máy chủ. Một mặt, máy chủ MCP hoạt động như các cổng cung cấp các khả năng cụ thể: ví dụ tương tác blockchain thông qua Giao thức bối cảnh mô hình chuẩn hóa và mặt khác, máy chủ MCP (ví dụ: Claude Desktop) mà chúng ta sẽ sử dụng trong hướng dẫn này, hoạt động như các công cụ muốn truy cập dữ liệu thông qua MCP.

Ngoài ra, máy chủ MCP còn chịu trách nhiệm xử lý các yêu cầu đến từ máy khách, máy chủ và trả về dữ liệu phản hồi phù hợp. Trong trường hợp này, họ sử dụng giao thức MCP để giao tiếp với LLM bằng các kênh chuẩn (stdio, HTTP hoặc socket) và trả về đầu ra có cấu trúc tốt. Giao thức MCP được thiết kế để có thể mở rộng, cho phép các nhà phát triển thêm [công cụ](https://modelcontextprotocol.io/docs/concepts/tools), [tài nguyên](https://modelcontextprotocol.io/docs/concepts/resources) và [lời nhắc](https://modelcontextprotocol.io/docs/concepts/prompts) mới khi đang di chuyển.

Trong hướng dẫn này, chúng tôi sẽ thêm các chức năng onchain vào các công cụ máy chủ MCP để tương tác với blockchain Kaia bằng Kaia Agent Kit.

**Bộ dụng cụ Kaia Agent**

Ngược lại, Kaia Agent Kit là một công cụ kết nối các công cụ trên chuỗi với các tác nhân AI, cho phép chúng tương tác liền mạch với chuỗi khối Kaia. Điều này sẽ cho phép tác nhân thực hiện các hành động trên chuỗi, lấy thông tin trên chuỗi, xác minh giao dịch một cách tự động.

## Thiết lập dự án

1. Tạo một thư mục dự án mới:

```bash
mkdir kaia-agentkit-mcp-example
cd kaia-agentkit-mcp-example
```

2. Khởi tạo dự án Node.js:

```bash
pnpm  init 
```

3. Cài đặt các phụ thuộc:

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-model-context-protocol @goat-sdk/wallet-viem @modelcontextprotocol/sdk dotenv viem 
```

```bash
pnpm add -D @types/node typescript
```

4. Cập nhật package.json của bạn bằng cách thêm thuộc tính "type": "module" và tập lệnh xây dựng sau

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

5. Tạo tsconfig.json trong thư mục gốc của dự án:

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

## Xây dựng máy chủ của bạn

**1. Tạo thư mục src với index.ts**

Sao chép và dán mã bên dưới vào tệp src/index.ts của bạn:

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

Đoạn mã trên tạo ra một máy chủ Giao thức ngữ cảnh mô hình (MCP) cho phép hệ thống AI tương tác với blockchain Kaia bằng cách thiết lập một máy khách ví, truy xuất các công cụ blockchain thông qua bộ điều hợp và Kaia Agent Kit, và xử lý các yêu cầu để liệt kê các công cụ có sẵn và thực hiện các hoạt động blockchain thông qua một kênh truyền thông đầu vào/đầu ra tiêu chuẩn.

**2. Xây dựng dự án**

Hãy đảm bảo xây dựng máy chủ của bạn bằng lệnh bên dưới:

```bash
pnpm build 
```

Thao tác này sẽ tạo ra thư mục build/ chứa tệp index.js đã biên dịch, đây là tệp rất quan trọng để kết nối với máy chủ của bạn.

**3. Cấu hình Claude Desktop**

Chúng tôi sẽ cần cấu hình Claude cho Desktop cho các máy chủ MCP mà bạn muốn sử dụng. Để thực hiện việc này, hãy mở cấu hình ứng dụng Claude for Desktop tại `~/Library/Application Support/Claude/claude_desktop_config.json` trong trình soạn thảo văn bản.

Chạy lệnh bên dưới để mở tệp claude_desktop_config.json của bạn:

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Sau đó, bạn sẽ thêm máy chủ của mình vào khóa mcpServers. Trong trường hợp này, chúng ta sẽ thêm máy chủ kaia-agent như hiển thị bên dưới:

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

- Thay thế **wallet-private-key** bằng khóa riêng tư Ví của bạn.
- Thay thế **rpc-provider-url** bằng url nhà cung cấp RPC của bạn.
- Thay thế **kaiascan-api-key** bằng Khóa API Kaiascan của bạn
- Thay thế **/absolute-path-to** bằng đường dẫn tuyệt đối đến thư mục dự án (ví dụ: /Users/username/ai-agent/mcp/kaia-agentkit-mcp-example/build/index.js).

Lưu tệp và khởi động lại Claude Desktop. Các công cụ của máy chủ MCP của bạn hiện có sẵn trong Claude Desktop

![](/img/build/tools/kaia-agent-kit/kaia-mcp-claude-tool.gif)

## Kiểm tra máy chủ của bạn với Claude cho máy tính để bàn

Bây giờ bạn có thể tương tác với tác nhân AI của mình để thực hiện các hành động trên chuỗi trên Kaia:

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 
```

**Đầu ra**

![](/img/build/tools/kaia-agent-kit/kaia-mcp.gif)

## Tài nguyên bổ sung

- [Tài liệu giao thức ngữ cảnh mô hình](https://modelcontextprotocol.io/introduction)
- [Tài liệu về máy tính để bàn của Claude](https://docs.anthropic.com/claude/docs)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector): Một công cụ hữu ích để gỡ lỗi máy chủ MCP của bạn




