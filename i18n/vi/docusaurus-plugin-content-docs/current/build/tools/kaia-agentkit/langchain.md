# LangChain

## Tổng quan

Kaia Agent Kit tích hợp với một số khuôn khổ AI phổ biến, cho phép bạn xây dựng các tác nhân thực hiện các hành động trên chuỗi một cách tự động bằng các công cụ phát triển ưa thích của bạn. Trong hướng dẫn này, hãy tìm hiểu cách tạo một AI Agent bằng [LangChain](https://www.langchain.com/agents) sử dụng [Kaia Agent Kit](https://github.com/kaiachain/kaia-agent-kit) cho các hành động trên chuỗi. .

## Điều kiện tiên quyết

- Đã cài đặt [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation)
- [Ví Kaia](https://www.kaiawallet.io/) có khóa riêng tư đã sẵn sàng
- [Khóa API tạo ra của Google](https://ai.google.dev/gemini-api/docs/api-key)
- [Nhà cung cấp RPC](https://docs.kaia.io/references/public-en/) cho mạng Kaia
- [Khóa API Kaiascan](https://docs.kaiascan.io/account-creation)

## Bắt đầu

Trong hướng dẫn này, chúng tôi sẽ xây dựng một tác nhân AI sử dụng LangChain và Kaia Agent Kit có thể:

- Gửi token gốc, token có thể thay thế (FT) và NFT.
- Kiểm tra số dư của token gốc, FT và NFT.
- Lấy dữ liệu blockchain API Kaiascan để lấy tóm tắt mạng, giá Kaia, số dư mã thông báo cho một địa chỉ, v.v.

### Hiểu về AI Agent Stack

Trước khi tìm hiểu sâu hơn về mã, chúng ta hãy cùng tìm hiểu các công nghệ chính:

**Chuỗi Lang**

LangChain là một khuôn khổ mạnh mẽ để xây dựng các ứng dụng được hỗ trợ bởi các mô hình ngôn ngữ lớn (LLM). Nó cung cấp một kiến trúc tác nhân cho phép các mô hình ngôn ngữ sử dụng các công cụ bên ngoài và đưa ra quyết định, quản lý bộ nhớ để nhận thức ngữ cảnh trên nhiều tương tác và một mô hình lý luận và hành động cho phép các tác nhân suy nghĩ kỹ thông tin trước khi thực hiện các bước.

**Bộ dụng cụ Kaia Agent**

Ngược lại, Kaia Agent Kit là một công cụ kết nối các công cụ trên chuỗi với các tác nhân AI, cho phép chúng tương tác liền mạch với chuỗi khối Kaia. Điều này sẽ cho phép tác nhân thực hiện các hành động trên chuỗi, lấy thông tin trên chuỗi, xác minh giao dịch một cách tự động.

## Thiết lập dự án

1. Tạo một thư mục dự án mới:

```bash
mkdir kaia-agentkit-langchain-example
cd kaia-agentkit-langchain-example
```

2. Khởi tạo dự án Node.js:

```bash
pnpm init 
```

3. Cài đặt các phụ thuộc:

```
pnpm add @kaiachain/kaia-agent-kit @langchain/core @langchain/langgraph @langchain/google-genai @goat-sdk/adapter-langchain @goat-sdk/wallet-viem viem tsx
```

4. Tạo một tệp .env trong thư mục gốc của dự án của bạn

```bash
touch .env
```

Hãy đảm bảo thêm nội dung sau vào tệp .env mới tạo của bạn, thay thế các giá trị giả bằng giá trị thực của bạn:

```bash
GOOGLE_API_KEY=your_google_api_key
WALLET_PRIVATE_KEY=your_wallet_private_key
RPC_PROVIDER_URL=your_rpc_url
KAIASCAN_API_KEY=your_kaiascan_api
```

:::warning
Không bao giờ gửi tệp .env hoặc khóa riêng của bạn vào kho lưu trữ công khai và vui lòng giữ lại các khóa bạn sử dụng trong quá trình phát triển – không liên kết với bất kỳ nguồn tiền thực nào. Cuối cùng, thêm .env vào tệp .gitignore của bạn.
:::

**Cấu trúc dự án**

```bash
kaia-agentkit-langchain-example/
|── agent.ts       <- create the main agent file
├── .env              <- environment variables
├── package.json
├── pnpm-lock.yaml
```

## Triển khai mã

### Đại lý.ts

Đây là tệp ứng dụng chính nơi chúng tôi thiết lập LangChain ReAct Agent, Kaia Agent Kit, ví và lời nhắc tương tác.

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

**Hướng dẫn mã**

Chúng ta hãy xem xét hoạt động cốt lõi của mã này:

- **Thành phần LangChain:**
  - ChatGoogleGenerativeAI: Giao diện với AI tạo sinh của Google
  - MemorySaver: Lưu trữ trạng thái hội thoại giữa các tương tác
  - HumanMessage: Cấu trúc tin nhắn đầu vào từ người dùng
  - createReactAgent: Tạo một tác nhân theo mẫu ReAct
- **Thư viện Blockchain:**
  - viem: Thư viện EVM để tương tác với blockchain
  - kairos: Cấu hình chuỗi cho mạng Kairos
- **Khởi tạo công cụ và tác nhân:**
  - getOnChainTools: Chuyển đổi các chức năng blockchain thành các công cụ LangChain
  - Kaia: Plugin cho các tương tác blockchain dành riêng cho Kaia
  - Kết hợp plugin Kaia với khóa API cho các truy vấn blockchain nâng cao
- **Cấu hình LLM:**
  - Sử dụng mô hình Gemini 1.5 Pro của Google làm trí thông minh của tác nhân

## Chạy Agent

Thiết lập đã hoàn tất. Để chạy tác nhân, hãy thực hiện lệnh sau trong thiết bị đầu cuối của bạn:

```bash
pnpm tsx agent.ts
```

Bây giờ bạn có thể tương tác với tác nhân AI của mình để thực hiện các hành động trên chuỗi trên Kaia:

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? 
Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos
```

**Đầu ra**

![](/img/build/tools/kaia-agent-kit/langchain-demo.gif)

## Tài nguyên bổ sung

- [Hệ thống nhiều tác nhân](https://langchain-ai.github.io/langgraphjs/tutorials/multi_agent/multi_agent_collaboration/)
- [Hướng dẫn bắt đầu nhanh LangGraph](https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/)
- [Công cụ LangChain được xây dựng sẵn](https://js.langchain.com/docs/integrations/tools/)





