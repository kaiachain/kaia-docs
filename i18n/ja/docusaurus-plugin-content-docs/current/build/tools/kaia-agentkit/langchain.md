# ラングチェーン

## 概要

カイア・エージェント・キットは、いくつかの一般的なAIフレームワークと統合されており、お好みの開発ツールを使って自律的にオンチェーンアクションを実行するエージェントを構築することができます。 このガイドでは、[Kaia Agent Kit](https://github.com/kaiachain/kaia-agent-kit)をオンチェーンアクションに使用する[LangChain](https://www.langchain.com/agents)でAIエージェントを作成する方法を学びます。 .

## 前提条件

- [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation) インストール済み
- 秘密鍵が準備された[カイア・ウォレット](https://www.kaiawallet.io/)
- [Google Generative APIキー](https://ai.google.dev/gemini-api/docs/api-key)
- カイアネットワークの[RPCプロバイダー](https://docs.kaia.io/references/public-en/)
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)

## はじめに

このガイドでは、LangChainとKaia Agent Kitを使って、AIエージェントを構築します：

- ネイティブトークン、ファンジブルトークン（FT）、NFTを送信する。
- ネイティブトークン、FT、NFTの残高を確認する。
- ブロックチェーンデータを取得 Kaiascan APIは、ネットワークサマリー、カイアの価格、アドレスのトークン残高などを取得します。

### AIエージェントスタックを理解する

コードに飛び込む前に、主要なテクノロジーを理解しよう：

\*\*ラングチェーン

LangChainは、大規模言語モデル（LLM）を利用したアプリケーションを構築するための強力なフレームワークです。 言語モデルによる外部ツールの利用や意思決定を可能にするエージェント・アーキテクチャ、複数のインタラクションにまたがるコンテキスト認識のためのメモリ管理、エージェントがステップを踏む前に情報を考え抜くことを可能にする推論・行動パターンなどを提供する。

\*\*カイア・エージェント・キット

一方、カイア・エージェント・キットは、AIエージェントにオンチェーンツールを接続するためのツールで、AIエージェントがカイア・ブロックチェーンとシームレスにやり取りできるようにする。 これにより、エージェントはオンチェーンでアクションを実行し、オンチェーン情報を取得し、トランザクションを自律的に検証できるようになる。

## プロジェクト設定

1. 新しいプロジェクト・ディレクトリを作成する：

```bash
mkdir kaia-agentkit-langchain-example
cd kaia-agentkit-langchain-example
```

2. Node.jsプロジェクトを初期化します：

```bash
pnpm init 
```

3. 依存関係をインストールします：

```
pnpm add @kaiachain/kaia-agent-kit @langchain/core @langchain/langgraph @langchain/google-genai @goat-sdk/adapter-langchain @goat-sdk/wallet-viem viem tsx
```

4. プロジェクトのルートに.envファイルを作成する。

```bash
touch .env
```

新しく作成した.envファイルに以下を追加し、ダミーの値を実際の値に置き換えてください：

```bash
GOOGLE_API_KEY=your_google_api_key
WALLET_PRIVATE_KEY=your_wallet_private_key
RPC_PROVIDER_URL=your_rpc_url
KAIASCAN_API_KEY=your_kaiascan_api
```

:::warning
.envファイルや秘密鍵は決して公開リポジトリにコミットしないでください。また、使用する鍵は実際の資金とは関係なく、開発用に保管してください。 最終的には、.gitignoreファイルに.envを追加する。
:::

\*\*プロジェクトの構成

```bash
kaia-agentkit-langchain-example/
|── agent.ts       <- create the main agent file
├── .env              <- environment variables
├── package.json
├── pnpm-lock.yaml
```

## コードの実装

### エージェント

これはLangChain ReActエージェント、Kaiaエージェントキット、ウォレット、対話型プロンプトをセットアップするメインアプリケーションファイルです。

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

\*\*コード・チュートリアル

コードの核となる部分を見てみよう：

- **LangChain Components:**
  - ChatGoogleGenerativeAI：グーグルのジェネレーティブAIへのインターフェース
  - メモリーセーバー：インタラクション間の会話状態を保存
  - HumanMessage：ユーザーからの入力メッセージを構造化
  - createReactAgent：ReActパターンに従ったエージェントを作成します。
- \*\*ブロックチェーン・ライブラリ
  - viem：ブロックチェーンと対話するためのEVMライブラリ
  - カイロス：カイロス・ネットワークのチェーン構成
- \*\*ツールおよびエージェントの初期化。
  - getOnChainTools：ブロックチェーン関数をLangChainツールに変換する
  - カイアKaia特有のブロックチェーンインタラクション用プラグイン
  - 高度なブロックチェーンクエリのためのAPIキー付きKaiaプラグインを組み込む
- \*\*LLMコンフィギュレーション
  - エージェントのインテリジェンスとしてGoogleのGemini 1.5 Proモデルを使用

## エージェントの実行

セットアップ完了。 エージェントを実行するには、ターミナルで以下のコマンドを実行する：

```bash
pnpm tsx agent.ts
```

AIエージェントと対話し、カイアのオンチェーン・アクションを実行できるようになりました：

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? 
Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos
```

\*\*出力

![](/img/build/tools/kaia-agent-kit/langchain-demo.gif)

## その他のリソース

- [複数のエージェントシステム](https://langchain-ai.github.io/langgraphjs/tutorials/multi_agent/multi_agent_collaboration/)
- [LangGraphクイックスタートガイド](https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/)
- [組み込み済みLangChainツール](https://js.langchain.com/docs/integrations/tools/)





