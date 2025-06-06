# LangChain

## 개요

카이아 에이전트 키트는 여러 인기 AI 프레임워크와 통합되어, 선호하는 개발 도구를 사용하여 온체인 작업을 자율적으로 실행하는 에이전트를 구축할 수 있습니다. 이 가이드에서는 온체인 액션을 위해 [카이아 에이전트 키트](https://github.com/kaiachain/kaia-agent-kit)를 사용하는 [LangChain](https://www.langchain.com/agents)으로 AI 에이전트를 생성하는 방법을 알아보세요. .

## 전제 조건

- [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation) 설치됨
- 개인 키가 준비된 [카이아 지갑](https://www.kaiawallet.io/)
- [Google 생성 API 키](https://ai.google.dev/gemini-api/docs/api-key)
- 카이아 네트워크용 [RPC 공급자](https://docs.kaia.io/references/public-en/)
- [카이아스캔 API 키](https://docs.kaiascan.io/account-creation)

## 시작하기

이 가이드에서는 LangChain과 Kaia 에이전트 키트를 사용하여 AI 에이전트를 구축하는 방법을 설명합니다:

- 네이티브 토큰, 대체 가능한 토큰(FT), 대체 불가능한 토큰(NFT)을 전송합니다.
- 네이티브 토큰, FT, NFT의 잔액을 확인합니다.
- 블록체인 데이터 카이아스캔 API를 가져와 네트워크 요약, 카이아의 가격, 주소의 토큰 잔액 등을 검색할 수 있습니다.

### AI 에이전트 스택 이해하기

코드를 살펴보기 전에 핵심 기술을 이해해 보겠습니다:

**랑체인**

LangChain은 대규모 언어 모델(LLM)로 구동되는 애플리케이션을 구축하기 위한 강력한 프레임워크입니다. 언어 모델이 외부 도구를 사용하여 의사 결정을 내릴 수 있는 에이전트 아키텍처, 여러 상호작용에서 컨텍스트 인식을 위한 메모리 관리, 에이전트가 조치를 취하기 전에 정보를 통해 생각할 수 있는 추론 및 작업 패턴을 제공합니다.

**카이아 에이전트 키트**

반면 카이아 에이전트 키트는 온체인 도구를 AI 에이전트에 연결하여 카이아 블록체인과 원활하게 상호작용할 수 있도록 하는 도구입니다. 이를 통해 에이전트는 온체인에서 작업을 실행하고, 온체인 정보를 가져오고, 트랜잭션을 자율적으로 검증할 수 있습니다.

## 프로젝트 설정

1. 새 프로젝트 디렉터리를 만듭니다:

```bash
mkdir kaia-agentkit-langchain-example
cd kaia-agentkit-langchain-example
```

2. Node.js 프로젝트를 초기화합니다:

```bash
pnpm init 
```

3. 종속성을 설치합니다:

```
pnpm add @kaiachain/kaia-agent-kit @langchain/core @langchain/langgraph @langchain/google-genai @goat-sdk/adapter-langchain @goat-sdk/wallet-viem viem tsx
```

4. 프로젝트의 루트에 .env 파일을 만듭니다.

```bash
touch .env
```

새로 만든 .env 파일에 더미 값을 실제 값으로 바꾸어 다음을 추가하세요:

```bash
GOOGLE_API_KEY=your_google_api_key
WALLET_PRIVATE_KEY=your_wallet_private_key
RPC_PROVIDER_URL=your_rpc_url
KAIASCAN_API_KEY=your_kaiascan_api
```

:::warning
.env 파일이나 개인 키를 공개 리포지토리에 커밋하지 마시고, 개발에 사용하는 키는 실제 자금과 연결되지 않은 상태로 보관하세요. 최종적으로 .gitignore 파일에 .env를 추가하세요.
:::

**프로젝트 구조**

```bash
kaia-agentkit-langchain-example/
|── agent.ts       <- create the main agent file
├── .env              <- environment variables
├── package.json
├── pnpm-lock.yaml
```

## 코드 구현

### Agent.ts

이 파일은 랭체인 리액트 에이전트, 카이아 에이전트 키트, 지갑 및 대화형 프롬프트를 설정하는 메인 애플리케이션 파일입니다.

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

**코드 연습**

코드의 핵심 작동 방식을 살펴보겠습니다:

- **랭체인 구성요소:**
    - ChatGoogleGenerativeAI: Google의 제너레이티브 AI 인터페이스
    - 메모리세이버: 상호 작용 간의 대화 상태 저장
    - 휴먼메시지: 사용자의 입력 메시지를 구조화합니다.
    - createReactAgent: ReAct 패턴을 따르는 에이전트를 생성합니다.
- **블록체인 라이브러리:**
    - viem: 블록체인과 상호 작용하기 위한 EVM 라이브러리
    - 카이로스: 카이로스 네트워크의 체인 구성
- **도구 및 에이전트 초기화:**
    - 겟온체인툴: 블록체인 기능을 LangChain 도구로 변환합니다.
    - Kaia: 카이아: 카이아 전용 블록체인 상호작용을 위한 플러그인
    - 고급 블록체인 쿼리를 위한 API 키와 카이아 플러그인 통합
- **LLM 구성:**
    - 상담원의 인텔리전스로 Google의 Gemini 1.5 Pro 모델 사용

## 에이전트 실행

설정이 완료되었습니다. 에이전트를 실행하려면 터미널에서 다음 명령을 실행합니다:

```bash
pnpm tsx agent.ts
```

이제 AI 에이전트와 상호작용하여 카이아에서 온체인 작업을 수행할 수 있습니다:

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? 
Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos
```

**출력**

![](/img/build/tools/kaia-agent-kit/langchain-demo.gif)

## 추가 리소스

- [다중 에이전트 시스템](https://langchain-ai.github.io/langgraphjs/tutorials/multi_agent/multi_agent_collaboration/)
- [LangGraph 빠른 시작 가이드](https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/)
- [사전 빌드된 LangChain 도구](https://js.langchain.com/docs/integrations/tools/)





