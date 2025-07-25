# 버셀 AI SDK

## 개요

카이아 에이전트 키트는 여러 인기 AI 프레임워크와 통합되어 선호하는 개발 도구를 사용하여 블록체인 지원 에이전트를 구축할 수 있습니다. 이 가이드에서는 온체인 작업을 위해 카이아 에이전트 키트를 통합하는 버셀 AI SDK로 AI 에이전트를 만드는 방법을 알아보세요.

## 전제 조건

- [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation) 설치됨
- 개인 키가 준비된 [카이아 지갑](https://www.kaiawallet.io/)
- [Google 생성 API 키](https://ai.google.dev/gemini-api/docs/api-key)
- 카이아 네트워크용 [RPC 공급자](https://docs.kaia.io/references/public-en/)
- [카이아스캔 API 키](https://docs.kaiascan.io/account-creation)

## 시작하기

이 가이드에서는 Vercel AI SDK와 Kaia 에이전트 키트를 사용하여 기본적인 AI 에이전트를 구축하는 방법을 설명합니다:

- 네이티브 토큰, 대체 가능한 토큰(FT), 대체 불가능한 토큰(NFT)을 전송합니다.
- 네이티브 토큰, FT, NFT의 잔액을 확인합니다.
- 데이터 카이아스캔 API를 사용하거나 이를 통해 블록체인을 가져와서 네트워크 요약, 카이아의 가격, 주소의 토큰 잔액 등을 검색합니다.

이 가이드가 끝나면 카이아 블록체인과 상호작용하고, 트랜잭션을 실행하고, 주요 온체인 데이터를 검색할 수 있는 기능적인 AI 에이전트를 자율적으로 보유하게 될 것입니다.

### AI 에이전트 스택 이해하기

강력한 온체인 AI 에이전트를 구축하려면 올바른 도구가 필요합니다. 이 가이드는 AI 기능을 위한 Vercel AI SDK와 블록체인 상호작용을 위한 Kaia 에이전트 키트를 활용합니다.

**Vercel AI SDK - AI 엔진**

Vercel AI SDK는 React, Next.js, Vue, Svelte, Node.js 등의 프레임워크를 사용하여 AI 기반 애플리케이션 및 에이전트를 쉽게 구축할 수 있는 TypeScript 툴킷입니다. 여러 AI 모델을 지원하며, 이 가이드에서는 [Google Generative AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai)를 모델 제공업체로 사용합니다.

**카이아 에이전트 키트 - 온체인 툴로 AI 에이전트 강화**

카이아 에이전트 키트는 AI 에이전트에게 온체인 도구를 제공하여 카이아 블록체인과 원활하게 상호작용할 수 있도록 합니다. 이를 통해 에이전트는 온체인에서 작업을 실행하고, 온체인 정보를 가져오고, 트랜잭션을 확인하고, 스마트 컨트랙트와 동적으로 상호 작용할 수 있습니다.

버셀 AI SDK와 카이아 에이전트 키트를 모두 활용하여 자율적인 추론, 행동, 블록체인 상호작용이 가능한 AI 에이전트를 개발할 것입니다.

## 프로젝트 초기화

### 버셀 AI SDK

먼저 새 Next.js 애플리케이션을 만듭니다. 이 명령은 kaia-agent-kit-vercel-ai-example이라는 새 디렉터리를 생성하고 그 안에 기본 Next.js 애플리케이션을 설정합니다.

```bash
 pnpm create next-app@latest kaia-agent-kit-vercel-ai-example
```

이 가이드의 경우 명령줄 프롬프트에 아래 값을 입력하세요:

```bash
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```

새로 생성된 디렉토리로 이동합니다:

```bash
cd kaia-agent-kit-vercel-ai-example
```

### 종속성 설치

AI 패키지인 `ai`, `@ai-sdk/react`, `@ai-sdk/google`, AI SDK의 React 훅, AI SDK의 Google [생성형 AI 공급자](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai)를 각각 설치합니다.

```bash
pnpm add ai @ai-sdk/react @ai-sdk/google zod dotenv
```

### Google 제너레이티브 AI API 키 구성

프로젝트 루트에 '.env' 파일을 생성하고 Google Generative AI API 키를 추가합니다. 이 키는 Google 생성 AI 서비스에서 애플리케이션을 인증하는 데 사용됩니다.

```bash
touch .env
```

.env 파일을 편집합니다:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=xxxxxxxxx
```

xxxxxxxxx를 실제 GOOGLE_GENERATIVE_AI API 키로 바꿉니다.

### 라우트 핸들러 만들기

라우트 핸들러인 `app/api/chat/route.ts`를 생성하고 다음 코드를 추가합니다:

```typescript
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google('gemini-1.5-pro-latest'),
    messages,
  });
  return result.toDataStreamResponse();
}
```

**코드 연습:**

이 코드는 버셀의 AI SDK를 통해 Google의 Gemini AI 모델을 사용하여 챗봇 메시지를 처리하는 API 경로 핸들러(POST /api/chat)를 정의합니다. 이렇게 진행됩니다:

- **대화 내역 추출**: 핸들러가 수신 요청을 읽고 채팅 내역이 포함된 메시지를 검색합니다.
- **AI 응답 생성**: Google의 Gemini 1.5 Pro 모델로 streamText()를 호출하여 컨텍스트를 위해 채팅 기록을 전달합니다.
- 응답을 **스트리밍**합니다: 이 함수는 실시간 텍스트 생성을 위해 toDataStreamResponse()를 사용하여 스트리밍된 응답을 반환합니다.
- **실행 시간 제한**: maxDuration 변수는 응답이 30초를 초과하지 않도록 합니다.

이 설정은 Google의 Gemini AI와 Vercel AI SDK를 활용하여 챗봇에서 실시간으로 AI가 생성한 응답을 가능하게 합니다.

### UI 구성하기

이제 LLM을 쿼리할 수 있는 라우트 핸들러가 생겼으니 이제 프론트엔드를 설정할 차례입니다. AI SDK의 [UI](https://sdk.vercel.ai/docs/ai-sdk-ui) 패키지는 채팅 인터페이스의 복잡성을 하나의 후크인 [useChat](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat)으로 추상화합니다.
채팅 메시지 목록을 표시하고 사용자 메시지 입력을 제공하려면 다음 코드로 루트 페이지(app/page.tsx)를 업데이트하세요:

```tsx
'use client';
import { useChat } from '@ai-sdk/react';
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
```

**코드 연습:**

이 React 컴포넌트는 Vercel AI SDK의 useChat() 훅을 사용하여 간단한 채팅 인터페이스를 생성합니다. 기능은 다음과 같습니다:

- **채팅 상태를 관리합니다**: useChat() 훅이 제공합니다:
  - 메시지: 채팅 내역(아이디, 역할, 콘텐츠 포함).
  - 입력: 현재 사용자 입력입니다.
  - 핸들 입력 변경: 사용자가 입력하는 대로 입력 필드를 업데이트합니다.
  - 핸들 제출: 양식이 제출되면 메시지를 전송합니다.
- **메시지를 표시합니다**: 이 컴포넌트는 메시지 위에 매핑되어 텍스트가 사용자가 보낸 것인지 AI가 보낸 것인지 표시합니다.
- **사용자 입력을 처리합니다**: 여기에는 사용자가 메시지를 입력할 수 있는 입력 필드가 포함되어 있으며, 사용자가 엔터를 누르면 메시지가 전송됩니다.

이 설정은 앞서 만든 API 경로(/api/chat)에 연결하여 AI 챗봇과 실시간 상호작용을 가능하게 합니다.

### 애플리케이션 실행

이것으로 챗봇에 필요한 모든 것을 구축했습니다! 애플리케이션을 시작하려면 다음 명령을 사용합니다:

```bash
pnpm run dev
```

브라우저로 이동하여 http://localhost:3000 을 엽니다. 입력 필드가 표시되어야 합니다. 메시지를 입력하여 테스트해보고 AI 챗봇이 실시간으로 응답하는 것을 확인하세요! AI SDK를 사용하면 Next.js로 AI 채팅 인터페이스를 빠르고 쉽게 구축할 수 있습니다.

이제 챗봇을 설정했으니, 카이아 에이전트 키트를 사용하여 온체인 도구를 사용하여 블록체인 트랜잭션 등을 실행하는 기능을 추가해 보겠습니다.

## 카이아 에이전트 키트를 사용하여 온체인 도구로 에이전트 확장하기

지금까지 대화를 처리하고 응답을 생성할 수 있는 기능적인 AI 챗봇을 구축했습니다. 이제 카이아 에이전트 키트를 사용하여 온체인 기능으로 이를 강화해 보겠습니다.  이를 통해 챗봇은 단순한 대화형 인공지능에서 블록체인에서 실시간으로 행동할 수 있는 강력한 온체인 에이전트로 진화합니다.

### 종속성 설치

카이아 에이전트 키트 및 기타 종속 패키지를 설치하여 온체인 기능을 AI 에이전트에 통합하세요.

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-vercel-ai @goat-sdk/wallet-viem viem 
```

:::note
카이아 에이전트 키트는 카이아에서 온체인 작업을 실행하는 도구에 대한 액세스를 제공하며, 다른 종속성은 온체인 도구와 AI SDK를 연결하고 지갑 관리를 처리하는 데 도움이 됩니다.
:::

### 환경 구성

프로젝트 루트에서 .env 파일을 편집하고 다음을 추가합니다:

```bash
WALLET_PRIVATE_KEY=0x_PRIVATE_KEY
RPC_PROVIDER_URL=https://public-en.node.kaia.io
KAIASCAN_API_KEY=your_kaiascan_api_key
```

### 온체인 실행을 위한 route.ts 파일 업데이트

```typescript
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { kairos } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
// kaia-agent-kit
import { Kaia, PackagesEnum } from '@kaiachain/kaia-agent-kit';
import 'dotenv/config'
const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: kairos,
});
const tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [Kaia({KAIA_KAIASCAN_API_KEY: process.env.KAIASCAN_API_KEY, packages: []})]
});
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google('gemini-1.5-pro-latest'),
// add onchain tools
    tools: tools,
    messages,
// enable multi-step calls
    maxSteps: 10,
  });
  return result.toDataStreamResponse();
}
```

**코드 연습**

이 업데이트된 `route.ts` 파일은 카이아 에이전트 키트, 바이엠, 버셀 AI SDK를 사용하는 AI 에이전트에 블록체인 기능을 통합합니다. 현재 상황을 자세히 설명합니다:

- **블록체인 도구 및 지갑 설정하기**
  - 바이엠, 카이아 에이전트 키트 및 기타 온체인 도구와 버셀 AI SDK를 연결하기 위한 기타 도구를 가져옵니다.
  - privateKeyToAccount를 사용하여 환경 변수(WALLET_PRIVATE_KEY)에서 지갑 계정을 생성합니다.
  - RPC 공급자를 사용하여 카이아 블록체인과 상호 작용하도록 바이엠의 지갑 클라이언트를 초기화합니다.
- **온체인 도구 로드 중**
  - 겟온체인툴을 사용하여 카이아 에이전트 키트 온체인 도구를 로드합니다. 패키지 배열을 구성하고 다음 값 중 하나를 전달하여 특정 도구에 대한 AI 에이전트의 액세스를 제한할 수 있다는 점에 유의하세요: PackagesEnum.WEB3, PackagesEnum.KAIASCAN, PackagesEnum.DGSWAP. 비워두면 모든 패키지가 기본적으로 활성화됩니다.
- **AI 및 블록체인 기능 통합**
  - 와 함께 호출됩니다:
    - LLM 모델로서의 Google Gemini 1.5 Pro
    - 블록체인 거래를 가능하게 하는 온체인 도구(툴)
    - 대화 내역(메시지)
    - 복잡한 워크플로우 처리를 위한 다단계 실행(최대 단계: 10)
- **스트리밍된 AI 응답 반환**
  AI 에이전트가 요청을 처리하고 내장된 온체인 기능으로 응답을 스트리밍합니다.

## 에이전트 기능 테스트

온체인 기능으로 애플리케이션을 다시 시작하려면 다음 명령을 사용하세요:

```bash
pnpm run dev 
```

이제 AI 에이전트와 상호작용하여 카이아에서 온체인 작업을 수행할 수 있습니다:

```bash
Check this address:  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 KAIA balance on kairos

Send 1 KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on Kairos

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Get the balance (native, fungible, non-fungible) of this account  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos. Display the first 5 if there are many

What is Kaia current info?

Get me the current block number on Kairos
```

**출력**

![](/img/build/tools/kaia-agent-kit/kaia-agent-vercel-ai.gif)

## 추가 정보

- [버셀 AI SDK](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router)
- [멀티 모달 채팅 봇](https://sdk.vercel.ai/docs/guides/multi-modal-chatbot)
- [도구](https://sdk.vercel.ai/docs/foundations/tools)





