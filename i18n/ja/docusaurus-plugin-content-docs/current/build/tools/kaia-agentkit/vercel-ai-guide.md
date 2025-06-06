# バーセルAI SDK

## 概要

カイア・エージェント・キットは、いくつかの一般的なAIフレームワークと統合されており、お好みの開発ツールを使ってブロックチェーン対応のエージェントを構築することができます。 このガイドでは、オンチェーンアクションのためのKaia Agent Kitを統合したVercel AI SDKでAIエージェントを作成する方法を学びます。

## 前提条件

- [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation) インストール済み
- 秘密鍵が準備された[カイア・ウォレット](https://www.kaiawallet.io/)
- [Google Generative APIキー](https://ai.google.dev/gemini-api/docs/api-key)
- カイアネットワークの[RPCプロバイダー](https://docs.kaia.io/references/public-en/)
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)

## はじめに

このガイドでは、Vercel AI SDKとKaia Agent Kitを使用して、基本的なAIエージェントを構築します：

- ネイティブトークン、ファンジブルトークン（FT）、NFTを送信する。
- ネイティブトークン、FT、NFTの残高を確認する。
- ネットワークサマリー、カイアの価格、アドレスのトークン残高などを取得するために、データKaiascan APIを使用して（または経由して）ブロックチェーンを取得します。

このガイドが終わる頃には、カイア・ブロックチェーンと対話し、トランザクションを実行し、主要なオンチェーン・データを取得できる機能的なAIエージェントを、すべて自律的に手に入れることができるだろう。

### AIエージェントスタックを理解する

強力なオンチェーンAIエージェントを構築するには、適切なツールが必要だ。 本ガイドは、AI機能のためのVercel AI SDKとブロックチェーン対話のためのKaia Agent Kitを活用しています。

\*\*Vercel AI SDK - AIエンジン

Vercel AI SDKは、React、Next.js、Vue、Svelte、Node.jsなどのフレームワークを使用して、AIを搭載したアプリケーションやエージェントを簡単に構築できるTypeScriptツールキットです。 このガイドでは、モデルプロバイダーとして[Google Generative AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai)を使用する。

**カイア・エージェント・キット - OnchainツールでAIエージェントをスーパーチャージする**」。

カイア・エージェント・キットはAIエージェントにオンチェーンツールを提供し、AIエージェントがカイア・ブロックチェーンとシームレスにやり取りできるようにする。 これにより、エージェントはオンチェーンでアクションを実行し、オンチェーン情報を取得し、トランザクションを検証し、スマートコントラクトと動的にやり取りできるようになる。

Vercel AI SDKとKaia Agent Kitの両方を活用し、自律的な推論、行動、ブロックチェーンインタラクションが可能なAIエージェントを作成します。

## プロジェクトの初期化

### バーセルAI SDK

まず、新しいNext.jsアプリケーションを作成します。 このコマンドは、kaia-Agent-kit-vercel-ai-exampleという新しいディレクトリを作成し、その中に基本的なNext.jsアプリケーションをセットアップします。

```bash
 pnpm create next-app@latest kaia-agent-kit-vercel-ai-example
```

このガイドでは、コマンドライン・プロンプトに以下の値を入力してください：

```bash
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```

新しく作成したディレクトリに移動する：

```bash
cd kaia-agent-kit-vercel-ai-example
```

### 依存関係のインストール

AIパッケージである `ai`、AI SDKのReactフックである `@ai-sdk/react` 、AI SDKのGoogle [Generative AI provider](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai)である `@ai-sdk/google` をそれぞれインストールする。

```bash
pnpm add ai @ai-sdk/react @ai-sdk/google zod dotenv
```

### Google Generative AI APIキーの設定

プロジェクトルートに`.env`ファイルを作成し、Google Generative AI API Keyを追加する。 このキーは、Google Generative AI サービスでアプリケーションを認証するために使用されます。

```bash
touch .env
```

.envファイルを編集する：

```bash
GOOGLE_GENERATIVE_AI_API_KEY=xxxxxxxxx
```

xxxxxxxxxを実際のGOOGLE_GENERATIVE_AI APIキーに置き換えてください。

### ルートハンドラの作成

ルートハンドラ`app/api/chat/route.ts`を作成し、以下のコードを追加する：

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

\*\*コード・ウォークスルー

このコードは、VercelのAI SDKを介してGoogleのGemini AIモデルを使用してチャットボットのメッセージを処理するAPIルートハンドラ（POST /api/chat）を定義します。 こうなる：

- \*\*会話履歴の抽出ハンドラは受信リクエストを読み、チャット履歴を含むメッセージを取得します。
- \*\*AIの応答を生成する：GoogleのGemini 1.5 ProモデルでstreamText()を呼び出し、コンテキストのためにチャット履歴を渡す。
- \*\*応答をストリームする：この関数は、toDataStreamResponse() を使用してストリームされた応答を返し、リアルタイムのテキスト生成を可能にします。
- **実行時間の制限**:maxDuration変数は、応答が30秒を超えないようにする。

この設定は、GoogleのGemini AIとVercel AI SDKを活用することで、チャットボットにおけるリアルタイムのAI生成応答を可能にする。

### UIの配線

LLMにクエリできるRoute Handlerができたので、フロントエンドをセットアップしましょう。 AI SDKの[UI](https://sdk.vercel.ai/docs/ai-sdk-ui)パッケージは、複雑なチャット・インターフェースを1つのフック、[useChat](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat)に抽象化しています。
ルートページ（app/page.tsx）を以下のコードで更新して、チャットメッセージのリストを表示し、ユーザーのメッセージ入力を提供します：

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

\*\*コード・チュートリアル

このReactコンポーネントは、Vercel AI SDKのuseChat()フックを使用してシンプルなチャットインターフェースを作成します。 これがその機能だ：

- \*\*チャットの状態を管理します：useChat()フックは以下を提供します：
 - メッセージ：チャット履歴（ID、ロール、コンテンツ）。
 - 入力：現在のユーザー入力。
 - handleInputChange：ユーザの入力に応じて入力フィールドを更新する。
 - handleSubmit：フォームが送信されたときにメッセージを送信します。
- \*\*メッセージを表示します：このコンポーネントはメッセージをマッピングし、テキストがユーザーからのものなのかAIからのものなのかを表示します。
- \*\*ユーザー入力を処理します：ユーザーがメッセージを入力できる入力フィールドがあり、Enterを押すと送信されます。

このセットアップにより、先に作成したAPIルート（/api/chat）に接続することで、AIチャットボットとのリアルタイムの対話が可能になる。

### アプリケーションの実行

これでチャットボットに必要なものはすべて構築できました！ アプリケーションを起動するには、コマンドを使用する：

```bash
pnpm run dev
```

ブラウザでhttp://localhost:3000。 入力フィールドが表示されるはずです。 メッセージを入力して試してみると、AIチャットボットがリアルタイムで応答するのがわかります！ AI SDKを使えば、Next.jsでAIチャットインターフェースを素早く簡単に構築できます。

さて、チャットボットをセットアップしたところで、Kaia Agent Kitを使って、ブロックチェーン取引などを実行するためのオンチェーンツールの機能を追加してみましょう。

## カイア・エージェント・キットを使用したオンチェーンツールによるエージェントの拡張

これまでのところ、私たちは会話を処理して応答を生成できる機能的なAIチャットボットを構築してきた。 では、カイア・エージェント・キットを使ってオンチェーン機能を追加してみましょう。  これにより、私たちのチャットボットは単なる会話AIから、ブロックチェーン上でリアルタイムに行動できる強力なオンチェーン・エージェントへと進化する。

### 依存関係のインストール

AIエージェントにオンチェーン機能を統合するために、Kaia Agent Kitとその他の依存パッケージをインストールする。

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-vercel-ai @goat-sdk/wallet-viem viem 
```

:::note
Kaia Agent Kitは、Kaia上でオンチェーンアクションを実行するためのツールへのアクセスを提供し、他の依存関係はオンチェーンツールとAI SDKの橋渡しをし、ウォレット管理を処理するのに役立つ。
:::

### 環境設定

プロジェクトのルートにある.envファイルを編集し、以下を追加する：

```bash
WALLET_PRIVATE_KEY=0x_PRIVATE_KEY
RPC_PROVIDER_URL=https://public-en.node.kaia.io
KAIASCAN_API_KEY=your_kaiascan_api_key
```

### オンチェーン実行のためのroute.tsファイルの更新

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

\*\*コード・チュートリアル

この更新された`route.ts`ファイルは、Kaia Agent Kit、Viem、Vercel AI SDKを使用して、ブロックチェーン機能をAIエージェントに統合しています。 以下はその内訳である：

- \*\*ブロックチェーンツールとウォレットのセットアップ
 - オンチェーンツールとVercel AI SDKをブリッジするためのViem、Kaia Agent Kit、その他のツールをインポートします。
 - privateKeyToAccount を使って、環境変数 (WALLET_PRIVATE_KEY) からウォレットアカウントを作成します。
 - Viemのウォレットクライアントを初期化し、RPCプロバイダーを使ってKaiaブロックチェーンとやり取りします。
- **オンチェーンツール**のロード
 - KaiaエージェントキットのオンチェーンツールをロードするためにgetOnChainToolsを使用します。 packages配列を設定し、以下のいずれかの値を渡すことで、AIエージェントの特定のツールへのアクセスを制限できることに注意してください：PackagesEnum.WEB3、PackagesEnum.KAIASCAN、PackagesEnum.DGSWAP。 空のままだと、デフォルトですべてのパッケージが有効になる。
- **AIとブロックチェーン機能の統合**」。
 - で呼び出される：
  - LLM モデルとしての Google Gemini 1.5 Pro
  - ブロックチェーン取引を可能にするOnchainツール（道具
  - 会話履歴（メッセージ）
  - 複雑なワークフローに対応するマルチステップ実行(maxSteps: 10)
- **ストリーミングされたAIレスポンスを返す**
 AIエージェントはリクエストを処理し、オンチェーン機能を組み込んだレスポンスをストリーミングする。

## エージェント機能のテスト

オンチェーン能力でアプリケーションを再起動するには、コマンドを使用する：

```bash
pnpm run dev 
```

AIエージェントと対話し、カイアのオンチェーン・アクションを実行できるようになりました：

```bash
Check this address:  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 KAIA balance on kairos

Send 1 KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on Kairos

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Get the balance (native, fungible, non-fungible) of this account  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos. Display the first 5 if there are many

What is Kaia current info?

Get me the current block number on Kairos
```

\*\*出力

![](/img/build/tools/kaia-agent-kit/kaia-agent-vercel-ai.gif)

## 追加情報

- [Vercel AI SDK](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router)
- [マルチモーダルチャットボット](https://sdk.vercel.ai/docs/guides/multi-modal-chatbot)
- [ツール](https://sdk.vercel.ai/docs/foundations/tools)





