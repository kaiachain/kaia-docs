---
sidebar_label: Particle Network
---

# パーティクルネットワークをdAppに統合する

![](/img/banners/kaia-particle.png)

## はじめに

[Particle Network](https://particle.network)'s Wallet Abstraction services enable universal, Web2-adjacent onboarding and interactions.

Particle Connect SDK](https://developers.particle.network/api-reference/connect/desktop/web)は、Kaiaとそのテストネットを含むEVM互換チェーンをサポートしています。 [social and Web3 login options](https://developers.particle.network/api-reference/connect/desktop/web#wallet-connectors)を使って、2クリックオンボーディングを可能にします。

Particle Networkを使えば、Kaiaの開発者はKaiaメインネットとテストネット用のソーシャルログインを埋め込むことができ、ユーザーはGoogle、Eメール、Xなどを使ってアプリケーション内でウォレットを生成し、使用することができます。

このページでは、KaiaベースのアプリケーションにParticle Connectを実装するための概要とチュートリアルをご紹介します。

## 前提条件

- TypeScriptとTailwind CSSを使った[Next.jsプロジェクト](https://nextjs.org/docs/getting-started/installation)
  - これを作成するには、`npx create-next-app@latest` を実行します。
- [Particle Dashboard] (https://dashboard.particle.network) から取得した **Project ID**、**Client Key**、および **App ID**。

## インストール

Particle Network、特にParticle ConnectをdApp内で活用するには、まず必要なライブラリをインストールする必要があります。 Particle Connect SDKは、ウォレットの作成、ユーザーログイン、ブロックチェーンとのやり取りを1つのインターフェースで効率化します。 ソーシャルログインとWeb3ログインの両方をサポートし、簡単にアクセスできる。

SDKとViem（コネクトのバックエンド）、ethers（EIP-1193プロバイダーのデモ）をインストールするには、以下を実行する：

```shell
yarn add @particle-network/connectkit viem@^2エーテル
```

## パーティクルコネクトの初期化

まずはじめに、Particleの代表的な認証SDKであるParticle Connectを設定します。 プロジェクトのルート・ディレクトリに `ConnectKit.tsx` という新しいファイルを作成します。 このファイルには `ParticleConnectKit` コンポーネントが格納されます。このコンポーネントは、設定された `ConnectKitProvider` インスタンスのラッパーであり、Particle Connect を設定するための主要なインターフェイスとして機能します（これがプログラムでどのように見えるかについては、後で説明します）。

To leverage Particle Network on alternative platforms, such as Android, iOS, React Native, Flutter, & Unity, kindly refer to Particle’s [documentation](https://developers.particle.network/reference/introduction-to-api-sdk-reference).

- **`projectId`** - プロジェクトの一意な識別子。
- **`clientKey`** - クライアント固有のキー。
- **`appId`** - アプリケーションのID。

これらのAPIキーを`.env`ファイルに以下のように格納する：

```plaintext
next_public_project_id='project_id'
next_public_client_key='client_key'
next_public_app_id='app_id'
```

次のコードを `ConnectKit.tsx` ファイルに追加してください：

```js
"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { defineChain } from "@particle-network/connectkit/chains";
import { wallet, EntryPosition } from "@particle-network/connectkit/wallet";

const kaiaMainnet = defineChain({
  id: 8217,
  name: "Kaia",
  nativeCurrency: {
    decimals: 18,
    name: "KAIA",
    symbol: "KAIA",
  },
  rpcUrls: {
    default: {
      http: ["https://public-en.node.kaia.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://kaiascope.com/" },
  },
  testnet: false,
});

const kaiaTestnet = defineChain({
  id: 1001,
  name: "Kaia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "KAIA",
    symbol: "KAIA",
  },
  rpcUrls: {
    default: {
      http: ["https://public-en-kairos.node.kaia.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://kairos.kaiascope.com/" },
  },
  testnet: true,
});

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,

  walletConnectors: [authWalletConnectors({})],

  plugins: [
    wallet({
      entryPosition: EntryPosition.BR, // Positions the modal button at the bottom right on login
      visible: true, // Determines if the wallet modal is displayed
    }),
  ],
  chains: [kaiaMainnet, kaiaTestnet],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
```

このコンポーネントは、サポートするさまざまなログインタイプからモーダルの視覚的な外観まで、ほぼすべてのプロパティを設定できます。これらのさまざまなオプションを調べるには、[Particleのドキュメント](https://developers.particle.network/api-reference/connect/desktop/web#configuration)にアクセスしてください。

## Particle Connectをアプリに統合

設定が完了したら、アプリケーションを `ParticleConnectKit` コンポーネントでラップし、Particle Connect SDK へのグローバルアクセスを有効にします。 そのためには、`src`ディレクトリにある`layout.tsx`ファイルを以下のように修正します：

```typescript
npm install --save @particle-network/connectkit
npm install --save @particle-network/chains
npm install --save @particle-network/connectors
npm install --save ethers	
```

### コネクティング・ウォレット

`layout.tsx`ファイルのセットアップが完了したら、中央の**Connect Wallet**ボタンを使ってユーザーを接続します。 これを行うには `@particle-network/connectkit` から `ConnectButton` をインポートします。 ユーザーがログインすると、`ConnectButton`は埋め込みウィジェットに変わります。

```js
import '@particle-network/connectkit/dist/index.css';
import { ConnectButton } from '@particle-network/connectkit';

export const App = () => {
	return <ConnectButton />;
};
```

### アカウントと残高の取得

`ConnectButton`コンポーネントを通してウォレット（またはソーシャルログイン）が接続されると、ユーザーの関連するKaiaアドレスを取得することができます。 さらに、（KAIAの）現在の残高を`publicClient`を通して取得することができます。これは、Particle Connectによってすでに設定されているViemプロバイダを利用します。

```js
"use client";

import { useState, useEffect } from "react";
import {
  ConnectButton,
  useAccount,
  usePublicClient,
} from "@particle-network/connectkit";
import { formatEther } from "viem";

export default function Home() {
  // Account-related states
  const { isConnected, address, chain } = useAccount();
  const publicClient = usePublicClient();

  // State variable for balance
  const [balance, setBalance] = useState<string>("");

  // Fetch and display user balance when connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        try {
          const balanceResponse = await publicClient.getBalance({ address });
          const balanceInEther = formatEther(balanceResponse);
          setBalance(balanceInEther);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    if (isConnected) {
      fetchBalance();
    }
  }, [isConnected, address, publicClient]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
      <ConnectButton label="Connect Wallet" />
      {isConnected && (
        <div className="w-full max-w-md mt-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Details</h2>
          <p className="text-lg text-white">
            Address: {address || "Loading..."}
          </p>
          <p className="text-lg text-white">
            Balance: {balance || "Loading..."} {chain?.nativeCurrency.symbol}
          </p>
        </div>
      )}
    </div>
  );
}
```

### ウォレットの切断

一度ログインしたユーザは、プログラムによって `useDisconnect` から派生した `disconnect` によって強制的にログアウトさせることができる。 これは現在アクティブなセッションをdAppから切断し、ユーザーを初期状態に戻します。

```js
import { useParticleConnect } from '@particle-network/connectkit';

const { disconnect } = useParticleConnect();

function App() {
    
const disconnectUser = async () => {
  await disconnect();
  refreshState();
}

// refresh state
const refreshState = () => {
  setAddress();
  setBalance();
// make sure to add every other useState modifier function declared here.
}
  
return (
    <div className="App">
        <button onClick={disconnectUser}>Disconnect</button>
    </div>
  );
}
```

### ユーザー情報の取得

ユーザーがソーシャルアカウント経由で接続すると、フック `useParticleAuth()` を使って `userinfo` にアクセスすることができます。この情報には、接続方法、アカウント作成日、名前、メールアドレス、その他の [Particle Auth の関連情報](https://developers.particle.network/api-reference/connect/desktop/web#fetch-user-information-with-particle-auth) に関する詳細が含まれます。

```js
import  { getUserInfo }  from  '@particle-network/auth-core';

const [userData, setUserData] = useState({});
	
const getUserInfo = async () => {
    const user = getUserInfo();
    setUserData(user);
};

return (
    <div className="App">
        <button onClick={getUserInfo}>Get User Info</button>  
        <p> User Email: { userData ? ` ${userData.google_email}` :  "Nil"} </p>
    </div>
  );
```

### ネイティブ・トランザクションの送信

Particle Connectでは、すでに存在するEIP-1193プロバイダを活用できます。この例では、`ethers`でプロバイダインスタンスを作成し、転送トランザクションを送信します。

```js
import { useParticleProvider } from '@particle-network/connectkit';

const provider = useParticleProvider();

const [address, setAddress] = useState("");
const [balance, setBalance] = useState("");

const getWalletAndBalance = async() => {
	// this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3authProvider);

    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.address;

    // Get user's balance in ether
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address) // balance is in wei
    );

    setAddress(address);
    setBalance(balance);

return (
    <div className="App">
        <button onClick={getWalletAndBalance}>Get Wallet Account and Balance</button>  
        <div>Wallet Address: ${address} Balance: ${balance}</div>
    </div>
  );
}
```

## 次のステップ

利用可能なフックの完全なリストは、[Particle Connect docs](https://developers.particle.network/api-reference/connect/desktop/web#key-react-hooks-for-particle-connect)にあります。

Particle Network（Particle Connect、Particle Auth、およびその他のSDK）に関するその他のガイドについては、[Particle Network docs](https://developers.particle.network)および[Particle Network GitHubアカウント](https://github.com/Particle-Network)を参照してください。 さらに、Particle Networkのサービス、今後のリリース、技術スタックに関する追加情報については、[Particle Networkブログ](https://blog.particle.network)をご覧ください。
