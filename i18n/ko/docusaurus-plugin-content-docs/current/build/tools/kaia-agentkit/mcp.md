# 모델 컨텍스트 프로토콜(MCP)

## 개요

Kaia 에이전트 키트는 여러 인기 AI 프레임워크와 통합되어 선호하는 개발 도구를 사용하여 블록체인 지원 에이전트를 구축할 수 있습니다. 이 가이드에서는 온체인 액션을 위해 Kaia 에이전트 키트를 사용하는 [모델 컨텍스트 프로토콜(MCP)](https://modelcontextprotocol.io/introduction) 서버와 클로드 데스크톱과 같은 MCP 호스트를 사용하여 AI 에이전트를 생성하는 방법을 알아보세요.

## 전제 조건

- [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation) 설치됨
- 개인 키가 준비된 [Kaia 지갑](https://www.kaiawallet.io/)
- [Google 생성 API 키](https://ai.google.dev/gemini-api/docs/api-key)
- Kaia 네트워크용 [RPC 공급자](https://docs.kaia.io/references/public-en/)
- [KaiaScan API 키](https://docs.kaiascan.io/account-creation)
- [클로드 데스크톱](https://claude.ai/download)

## 시작하기

이 가이드에서는 온체인 기능을 갖춘 MCP 서버를 사용하여 Kaia 에이전트 키트 + MCP 호스트(클로드 데스크톱)를 사용하여 AI 에이전트를 구축하는 방법을 설명합니다:

- 네이티브 토큰, 대체 가능한 토큰(FT), 대체 불가능한 토큰(NFT)을 전송합니다.
- 네이티브 토큰, FT, NFT의 잔액을 확인합니다.
- 블록체인 데이터 KaiaScan API를 가져와 네트워크 요약, Kaia의 가격, 주소의 토큰 잔액 등을 검색할 수 있습니다.

### AI 에이전트 스택 이해하기

코드를 살펴보기 전에 핵심 기술을 이해해 보겠습니다:

\*\*MCP란 무엇인가요?

MCP는 AI 시스템이 데이터 소스 및 외부 도구와 상호 작용하여 필요한 데이터를 제공하기 위한 범용적이고 개방적인 표준입니다.  MCP의 핵심은 호스트 애플리케이션이 여러 서버에 연결할 수 있는 클라이언트-서버 아키텍처를 따르는 것입니다. 한편으로 MCP 서버는 표준화된 모델 컨텍스트 프로토콜을 통해 블록체인 상호작용과 같은 특정 기능을 노출하는 게이트웨이 역할을 하며, 다른 한편으로 이 가이드에서 사용할 MCP 호스트(예: 클로드 데스크톱)는 MCP를 통해 데이터에 액세스하려는 도구의 역할을 합니다.

또한 MCP 서버는 클라이언트, 호스트에서 들어오는 요청을 처리하고 적절한 응답 데이터를 반환하는 역할을 담당합니다. 이 경우 MCP 프로토콜을 사용하여 표준 채널(stdio, HTTP 또는 소켓)을 사용하여 LLM과 통신하고 잘 구조화된 출력을 반환합니다. MCP 프로토콜은 확장 가능하도록 설계되어 개발자가 이동 중에도 새로운 [도구](https://modelcontextprotocol.io/docs/concepts/tools), [리소스](https://modelcontextprotocol.io/docs/concepts/resources), [프롬프트](https://modelcontextprotocol.io/docs/concepts/prompts)를 추가할 수 있습니다.

이 가이드에서는 Kaia 에이전트 키트를 사용하여 Kaia 블록체인과 상호 작용할 수 있도록 MCP 서버 도구에 온체인 기능을 추가합니다.

**Kaia 에이전트 키트**

반면 Kaia 에이전트 키트는 온체인 도구를 AI 에이전트에 연결하여 Kaia 블록체인과 원활하게 상호작용할 수 있도록 하는 도구입니다. 이를 통해 에이전트는 온체인에서 작업을 실행하고, 온체인 정보를 가져오고, 트랜잭션을 자율적으로 검증할 수 있습니다.

## 프로젝트 설정

1. 새 프로젝트 디렉터리를 만듭니다:

```bash
mkdir kaia-agentkit-mcp-example
cd kaia-agentkit-mcp-example
```

2. Node.js 프로젝트를 초기화합니다:

```bash
pnpm  init 
```

3. 종속성을 설치합니다:

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-model-context-protocol @goat-sdk/wallet-viem @modelcontextprotocol/sdk dotenv viem 
```

```bash
pnpm add -D @types/node typescript
```

4. "type" 속성을 추가하여 package.json을 업데이트합니다: "module" 속성과 다음 빌드 스크립트를 추가합니다.

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

5. 프로젝트의 루트에 tsconfig.json을 만듭니다:

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

## 서버 구축

**1. index.ts**로 src 폴더 만들기

아래 코드를 복사하여 src/index.ts 파일에 붙여넣습니다:

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

위의 코드는 지갑 클라이언트를 설정하고, 어댑터와 Kaia 에이전트 키트를 통해 블록체인 도구를 검색하고, 표준 입출력 통신 채널을 통해 사용 가능한 도구를 나열하고 블록체인 작업을 실행하는 요청을 처리함으로써 AI 시스템이 Kaia 블록체인과 상호작용할 수 있는 모델 컨텍스트 프로토콜(MCP) 서버를 생성합니다.

**2. 프로젝트 구축**

아래 명령어로 서버를 빌드하세요:

```bash
pnpm build 
```

이렇게 하면 서버를 연결하는 데 중요한 컴파일된 index.js 파일이 포함된 build/ 디렉터리가 생성됩니다.

**3. Claude 데스크톱 구성**

사용하려는 MCP 서버에 대해 데스크톱용 Claude를 구성해야 합니다. 이렇게 하려면 텍스트 편집기에서 `~/라이브러리/응용 프로그램 지원/클라우드/클라우드_데스크톱_config.json`에서 데스크톱용 클로드 앱 구성을 엽니다.

아래 명령을 실행하여 claude_desktop_config.json 파일을 엽니다:

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

그런 다음 mcpServers 키에 서버를 추가합니다. 이 경우 아래와 같이 kaia-agent 서버를 추가합니다:

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

- 지갑-비밀키\*\*를 지갑 비공개 키로 바꿉니다.
- rpc-provider-url\*\*을 RPC 공급자 URL로 바꿉니다.
- KaiaScan-api-key\*\*를 KaiaScan API 키로 바꿉니다.
- 절대 경로를 프로젝트 디렉터리의 절대 경로(예: /사용자/사용자 이름/Kaia 에이전트/mcp/Kaia 에이전트 키트/mcp-예제/빌드/index.js)로 \*\*/절대 경로를 대체합니다.

파일을 저장하고 Claude Desktop을 다시 시작합니다. 이제 MCP 서버의 도구를 Claude Desktop에서 사용할 수 있습니다.

![](/img/build/tools/kaia-agent-kit/kaia-mcp-claude-tool.gif)

## 데스크톱용 Claude로 서버 테스트

이제 AI 에이전트와 상호작용하여 Kaia에서 온체인 작업을 수행할 수 있습니다:

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 
```

**출력**

![](/img/build/tools/kaia-agent-kit/kaia-mcp.gif)

## 추가 리소스

- [모델 컨텍스트 프로토콜 문서](https://modelcontextprotocol.io/introduction)
- [클로드 데스크톱 문서](https://docs.anthropic.com/claude/docs)
- [MCP 인스펙터](https://github.com/modelcontextprotocol/inspector): MCP 서버 디버깅을 위한 유용한 도구




