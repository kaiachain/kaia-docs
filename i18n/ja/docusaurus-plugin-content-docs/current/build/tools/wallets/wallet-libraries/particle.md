---
sidebar_label: Particle Network
---

# パーティクルネットワークをdAppに統合する

![](/img/banners/kaia-particle.png)

## はじめに

[Particle Network](https://particle.network)'s Wallet Abstraction services enable universal, Web2-adjacent onboarding and interactions.

Particle Connect SDK](https://developers.particle.network/api-reference/connect/desktop/web)は、Kaiaとそのテストネットを含むEVM互換チェーンをサポートしています。 While traditional Web3 wallets are offered as connection mechanisms through Particle Connect, social logins through social accounts such as your email address, Google account, phone number, etc. are also available. If a user decides to log in with a Web2 account, you'll have the ability to call `getUserInfo` from `@particle-network/auth-core`, which will return an object containing key details such as their name, email, wallet addresses, etc.

Particle Networkを使えば、Kaiaの開発者はKaiaメインネットとテストネット用のソーシャルログインを埋め込むことができ、ユーザーはGoogle、Eメール、Xなどを使ってアプリケーション内でウォレットを生成し、使用することができます。

このページでは、KaiaベースのアプリケーションにParticle Connectを実装するための概要とチュートリアルをご紹介します。

## 前提条件

- TypeScriptとTailwind CSSを使った[Next.jsプロジェクト](https://nextjs.org/docs/getting-started/installation)
  - これを作成するには、`npx create-next-app@latest` を実行します。
- A project ID, client key, and app ID from the [Particle dashboard](https://dashboard.particle.network).

## インストール

Particle Network、特にParticle ConnectをdApp内で活用するには、まず必要なライブラリをインストールする必要があります。 Particle Connect SDKは、ウォレットの作成、ユーザーログイン、ブロックチェーンとのやり取りを1つのインターフェースで効率化します。 ソーシャルログインとWeb3ログインの両方をサポートし、簡単にアクセスできる。

SDKとViem（コネクトのバックエンド）、ethers（EIP-1193プロバイダーのデモ）をインストールするには、以下を実行する：

```shell
yarn add @particle-network/connectkit viem@^2エーテル
```

## パーティクルコネクトの初期化

まずはじめに、Particleの代表的な認証SDKであるParticle Connectを設定します。 プロジェクトのルート・ディレクトリに `ConnectKit.tsx` という新しいファイルを作成します。 このファイルには `ParticleConnectKit` コンポーネントが格納されます。このコンポーネントは、設定された `ConnectKitProvider` インスタンスのラッパーであり、Particle Connect を設定するための主要なインターフェイスとして機能します（これがプログラムでどのように見えるかについては、後で説明します）。

To leverage Particle Network on alternative platforms, such as Android, iOS, React Native, Flutter, & Unity, kindly refer to Particle’s [documentation](https://developers.particle.network/reference/introduction-to-api-sdk-reference).

- \***projectId\`** - プロジェクトの一意な識別子。
- **`clientKey`** - クライアント固有のキー。
- **appId\`** - アプリケーションのID。

これらのAPIキーを`.env`ファイルに以下のように格納する：

```plaintext
next_public_project_id='project_id'
next_public_client_key='client_key'
next_public_app_id='app_id'
```

次のコードを `ConnectKit.tsx` ファイルに追加してください：

```js
import { ModalProvider } from '@particle-network/connectkit';
import { Klaytn, KlaytnTestnet } from '@particle-network/chains';
import { evmWallets } from '@particle-network/connectors';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ModalProvider
            options={{
                projectId: 'replace with your projectId',
                clientKey: 'replace with your clientKey',
                appId: 'replace with your appId',
                chains: [
                    KlaytnTestnet, Klaytn
                ],
                wallet: {    // optional: Wallet modal configuration
                    visible: true, // Display wallet modal
                    supportChains:[
                        KlaytnTestnet, Klaytn
                    ],
                    customStyle: {}, // optional: Custom wallet style
                },
                promptSettingConfig: { // optional: particle security account config
                    // Prompt to set payment password upon social login. 0: None, 1: Once(default), 2: Always
                    promptPaymentPasswordSettingWhenSign: 1,
                    // Prompt to set master password upon social login. 0: None(default), 1: Once, 2: Always
                    promptMasterPasswordSettingWhenLogin: 1
                },
                connectors: evmWallets({ 
                    projectId: 'replace with your walletconnect projectId',
                    showQrModal: false
                 }),
            }}
            theme={'light'}
            language={'en'}   // optional：Local language setting, default en
            walletSort={['Particle Auth', 'Wallet']} // optional：Order of wallet categories
        >
            <App />
        </ModalProvider>
    </React.StrictMode>
);
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

With your `index.js` file setup, you can move onto connecting your users through a central "Connect Wallet" button. To do this, you can import `ConnectButton` from `@particle-network/connectkit` alongside its corresponding css. Upon using `ConnectButton` within your `App` component, a standard "Connect Wallet" button will appear to facilitate connection.

```js
import '@particle-network/connectkit/dist/index.css';
import { ConnectButton } from '@particle-network/connectkit';

export const App = () => {
	return <ConnectButton />;
};
```

### アカウントと残高の取得

With a wallet now successfully connected through `ConnectButton`, you can retrieve the users associated Klaytn address. Additionally, you can retrieve its current balance (in KLAY) through ethers.js, passing in the corresponding EIP-1193 provider object retrieved from `useParticleProvider` within `@particle-network/connectkit`.

```js
    // add to the existing useState hook.
    const [txHash, setTxHash] = useState();

    const sendKaia = async () => {
    
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const destination = "paste recipient address";

      // this guide uses ethers version 6.3.0.
      const ethersProvider = new ethers.BrowserProvider(provider);
      // for ethers version below 6.3.0.
      // const provider = new ethers.providers.Web3Provider(provider);

      const signer = await ethersProvider.getSigner();
        
      // Submit transaction to the blockchain and wait for it to be mined
      const tx = await signer.sendTransaction({
          to: destination,
          value: ethers.parseEther("0.1"),
          maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
          maxFeePerGas: "6000000000000", // Max fee per gas
        })
    
      
      const receipt = await tx.wait();
      setTxHash(receipt.hash)
}

return (
    <div className="App">
        <button onClick={sendKlay}>Send Klay</button>
        <div>Send-Kaia Tx Hash :  {txHash ? <a href={`https://kairos.kaiascope.com/tx/${txHash}`} target="_blank">Kaiascope</a> :  ' ' } </div>
    </div>
);

```

### ウォレットの切断

Once a user has logged in, you can programmatically force a logout through `disconnect` derived from `useParticleConnect`. これは現在アクティブなセッションをdAppから切断し、ユーザーを初期状態に戻します。

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
