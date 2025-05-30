# モデルコンテキストプロトコル（MCP）

## 概要

カイア・エージェント・キットは、いくつかの一般的なAIフレームワークと統合されており、お好みの開発ツールを使ってブロックチェーン対応のエージェントを構築することができます。 このガイドでは、[モデルコンテキストプロトコル(MCP)](https://modelcontextprotocol.io/introduction)サーバーを使用したAIエージェントの作成方法について説明します。このサーバーでは、オンチェーンアクションにKaia Agent Kitを使用し、Claude DesktopなどのMCPホストを使用します。

## 前提条件

- [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation) インストール済み
- 秘密鍵が準備された[カイア・ウォレット](https://www.kaiawallet.io/)
- [Google Generative APIキー](https://ai.google.dev/gemini-api/docs/api-key)
- カイアネットワークの[RPCプロバイダー](https://docs.kaia.io/references/public-en/)
- [Kaiascan API Key](https://docs.kaiascan.io/account-creation)
- [クロードデスクトップ](https://claude.ai/download)

## はじめに

このガイドでは、Kaia Agent Kit + MCPホスト（Claude Desktop）を使用して、オンチェーン機能を持つMCPサーバーを使用したAIエージェントを構築します：

- ネイティブトークン、ファンジブルトークン（FT）、NFTを送信する。
- ネイティブトークン、FT、NFTの残高を確認する。
- ブロックチェーンデータを取得 Kaiascan APIは、ネットワークサマリー、カイアの価格、アドレスのトークン残高などを取得します。

### AIエージェントスタックを理解する

コードに飛び込む前に、主要なテクノロジーを理解しよう：

\*\*MCPとは？

MCPは、AIシステムがデータソースや外部ツールと相互作用し、必要なデータを提供するための普遍的でオープンな標準である。  その中核となるMCPは、ホストアプリケーションが複数のサーバーに接続できるクライアント・サーバー・アーキテクチャを採用している。 一方では、MCPサーバーは特定の機能を公開するゲートウェイとして機能する。例えば、標準化されたモデル・コンテキスト・プロトコルを介したブロックチェーン相互作用などであり、他方では、このガイドで使用するMCPホスト（Claude Desktopなど）は、MCPを通じてデータにアクセスするためのツールとして機能する。

さらに、MCPサーバーはクライアント、ホストからの受信要求を処理し、適切な応答データを返す責任を負う。 この場合、MCPプロトコルを使って標準的なチャンネル（stdio、HTTP、ソケット）を使ってLLMと通信し、構造化された出力を返す。 MCPプロトコルは拡張できるように設計されており、開発者は新しい[ツール](https://modelcontextprotocol.io/docs/concepts/tools)、[リソース](https://modelcontextprotocol.io/docs/concepts/resources)、[プロンプト](https://modelcontextprotocol.io/docs/concepts/prompts)をすぐに追加することができます。

このガイドでは、カイア・エージェント・キットを使ってカイア・ブロックチェーンとやりとりするために、MCPサーバー・ツールにオンチェーン機能を追加します。

\*\*カイア・エージェント・キット

一方、カイア・エージェント・キットは、AIエージェントにオンチェーンツールを接続するためのツールで、AIエージェントがカイア・ブロックチェーンとシームレスにやり取りできるようにする。 これにより、エージェントはオンチェーンでアクションを実行し、オンチェーン情報を取得し、トランザクションを自律的に検証できるようになる。

## プロジェクト設定

1. 新しいプロジェクト・ディレクトリを作成する：

```bash
mkdir kaia-agentkit-mcp-example
cd kaia-agentkit-mcp-example
```

2. Node.jsプロジェクトを初期化します：

```bash
pnpm  init 
```

3. 依存関係をインストールします：

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-model-context-protocol @goat-sdk/wallet-viem @modelcontextprotocol/sdk dotenv viem 
```

```bash
pnpm add -D @types/node typescript
```

4. package.jsonを更新し、"type"：type": "module "プロパティと以下のビルドスクリプトを追加して、package.jsonを更新する。

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

5. プロジェクトのルートにtsconfig.jsonを作成する：

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

## サーバーの構築

**1. index.ts**を含むsrcフォルダを作成する。

以下のコードをコピーして、src/index.ts ファイルに貼り付けます：

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

このコードでは、AIシステムがウォレットクライアントをセットアップし、アダプタとKaiaエージェントキットを介してブロックチェーンツールを取得し、標準的な入出力通信チャネルを介して利用可能なツールの一覧表示とブロックチェーン操作の実行要求を処理することで、Kaiaブロックチェーンと対話できるようにするモデルコンテキストプロトコル（MCP）サーバーを作成します。

\*\*2. ビルド・プロジェクト

以下のコマンドでサーバーをビルドしてください：

```bash
pnpm build 
```

これはコンパイルされたindex.jsファイルを含むbuild/ディレクトリを生成する。

**3. クロードデスクトップ**の設定

使用するMCPサーバー用にClaude for Desktopを設定する必要があります。 これを行うには、テキストエディタで `~/Library/Application Support/Claude/claude_desktop_config.json` にあるデスクトップアプリ設定のクロードを開きます。

以下のコマンドを実行して、claude_desktop_config.jsonファイルを開きます：

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

その後、mcpServersキーにサーバーを追加する。 この場合、以下のようにkaia-agentサーバーを追加する：

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

- wallet-private-key\*\*をあなたのWallet秘密鍵に置き換えてください。
- rpc-provider-url\*\*をRPCプロバイダのURLに置き換えてください。
- kaiascan-api-key\*\*をあなたのKaiascan API Keyに置き換えてください。
- absolute-path-to\*\*をプロジェクト・ディレクトリの絶対パスに置き換えてください（例：/Users/username/ai-agent/mcp/kaia-agentkit-mcp-example/build/index.js）。

ファイルを保存し、クロードデスクトップを再起動します。 MCPサーバーのツールは、クロード・デスクトップ

![](/img/build/tools/kaia-agent-kit/kaia-mcp-claude-tool.gif)

## Claude for Desktopでサーバーをテストする

AIエージェントと対話し、カイアのオンチェーン・アクションを実行できるようになりました：

```
What is the current  Kaia balance of 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on kairos? Please answer in KAIA and its total value in USD.

Check Kaia current price ?

Send test KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb 
```

**出力**

![](/img/build/tools/kaia-agent-kit/kaia-mcp.gif)

## その他のリソース

- [モデル・コンテキスト・プロトコル・ドキュメンテーション](https://modelcontextprotocol.io/introduction)
- [クロード・デスクトップ・ドキュメント](https://docs.anthropic.com/claude/docs)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)：MCPサーバーのデバッグに役立つツール




