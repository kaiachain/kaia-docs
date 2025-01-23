---
sidebar_label: Privy
---

# PrivyをdAppに統合する

![](/img/banners/kaia-privy.png)

## はじめに

[Privy](https://docs.privy.io/) は、Web3におけるプログレッシブ認証のためのシンプルなウォレットツールキットです。 Privyを使用すると、開発者は従来の認証方法とWeb3認証方法を使用してユーザーをオンボーディングすることができ、ユーザーのコンバージョンを高めるプログレッシブオンボーディングが可能になります。

このガイドでは、Privy wallet toolkitを使用して、Metamask、Coinbase Wallet、Google、Twitter、Emailなどのソーシャルログインなどの外部ウォレットをKaia Network上に構築したdAppに統合します。

## 前提条件

- 動くNext.jsプロジェクト。 Privyが提供するこの[create-next-app](https://github.com/privy-io/create-next-app)テンプレートをクローンして、このチュートリアルに沿って進めることができる。
- Privy開発者コンソール](https://console.privy.io/)からの[appID](https://docs.privy.io/guide/console/api-keys#app-id)。

## はじめに

クローンされたテンプレートは、シンプルなNext.js Privy Auth Starterテンプレートです：

- **index.tsx**：このファイルは、ユーザーのログイン認証を処理する。
- **app.tsx**：このファイルはPrivy SDKの初期化を処理し、PrivyProviderでコンポーネントをラップします。
- **dashboard.tsx**：ログイン後にユーザーがリダイレクトされるページです。 各ログイン方法（Google、Twitter、Eメール、ウォレット）のテストにまつわるすべてを処理する。 このガイドでもっと重要なのは、MetaMaskのような外部ウォレットを使って接続したときに特定の機能を実行することだ。 These functionalities include:  getting user balance, sending KLAY to another account, deploying a contract, interacting with a smart contract.

## インストール

あなたのdAppでPrivyを利用するには、まず必要なライブラリとSDKをインストールする必要があります。 したがって、ethers.jsと[Privy React Auth SDK](https://www.npmjs.com/package/@privy-io/react-auth)をセットアップする必要がある。 Privyは、[ethers.js](https://docs.ethers.org/v6/)、[web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html)、[viem](https://viem.sh/)のいずれかのライブラリと一緒に使って、カイア・ブロックチェーンと通信することができます。 このガイドでは、ethers.jsライブラリを使用する。

プロジェクトフォルダを開き、以下のコマンドを実行して必要なライブラリとSDKをインストールします：

```bash
npm install —save @privy-io/react-auth
npm install --save ethers
```

## PrivyとPrivy Providerの初期化

必要なライブラリのインストールに成功したら、次はコンポーネントを[PrivyProvider](https://docs.privy.io/reference/react-auth/modules#privyprovider)でラップする。

PrivyProviderは、Privy SDKを使用するすべてのコンポーネントをラップする必要があります。 そのためには、_app.tsxファイルを開き、以下のコードを貼り付ける：

```tsx
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {PrivyProvider} from '@privy-io/react-auth';
import {useRouter} from 'next/router';
function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Privy Auth Starter</title>
        <meta name="description" content="Privy Auth Starter" />
      </Head>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        onSuccess={() => router.push('/dashboard')}
      >
        <Component {...pageProps} />
      </PrivyProvider>
    </>
  );
}
export default MyApp;
```

プリヴィー・プロバイダーが以下のプロパティを取ることに注意することが重要である：

- .envファイルで更新する必要があります。 テスト用にPrivyから提供された`test App ID: clpispdty00ycl80fpueukbhl`で始めることができる。
- オプションの `onSuccess` コールバックは、ユーザがログインに成功すると実行される。
- オプションの `createPrivyWalletOnLogin` boolean で、ログイン時に埋め込みウォレットを作成させるかどうかを設定します。
- オンボーディング体験をカスタマイズするためのオプションの設定プロパティです。

## コネクティング・ウォレット

`index.tsx`ファイル内のLoginPage関数内で、[login](https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface#login) メソッドを呼び出します。このメソッドは、Privyのログインモーダルを開き、ユーザーにログインを促します。

```ts
 import {usePrivy} from '@privy-io/react-auth';


 const {login} = usePrivy();
  return (
     <div>
        <button onClick={login}>
          Log in
        </button>
    </div>
  );
```

![](/img/build/tools/privy-connect-banner.png)

## アカウントと残高の取得

先ほどのステップで、ウォレットを接続してログインしたことがわかるだろう。 このステップでは、ユーザーの関連するカイアのアドレスを取得する。 Additionally, you can retrieve its current balance (in KLAY) using ethers.js.

dashboard.tsxファイルに以下のコードを貼り付けます：

```tsx
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {usePrivy, useWallets} from '@privy-io/react-auth';
const {ready, authenticated} = usePrivy();
const {wallets} = useWallets();

useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

const [balance, setBalance] = useState("");
async function getBalance() {
  if (!authenticated) {
    console.log("user not authenticated yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider.getSigner();  
  // Get user's Ethereum public address
  const address =   await signer.getAddress();
  console.log(address);
  
  // Get user's balance in ether
  const balance = ethers.formatEther(
    (await provider.getBalance(address)).toString() // balance is in wei
  );
  console.log(balance);
  setBalance(balance);
}

return (
 {ready && authenticated ? (
      <div className=“App”>
        <button onClick={getBalance}>Get Balance</button>
        <p>{balance ? ` User with ${wallets[0].address} has ${balance} KAIA` : "None"}</p>
      </div>
) : null }
);
```

## ウォレットの切断

ウォレットを切断する
ユーザーがログインしたら、usePrivy から派生した `logout` メソッドを使って、プログラムでユーザーをログアウトさせることができます。 これは現在アクティブなセッションをdAppから切断し、ユーザーを初期状態に戻します。

```tsx
const { logout } = usePrivy();
  

return (
 {ready && authenticated ? (
    <div className="App">
        <button onClick={logout}>Logout</button>
    </div>
) : null }
  );
```

## ユーザー情報の取得

Privyは、ユーザーにウェブ3ウォレットとソーシャルログインの両方を使用してdAppに接続する快適さを提供します。 ユーザーがtwitterやdiscord、googleアカウントなどのソーシャルアカウントを使ってdAppに接続する場合、`usePrivy`から`user`を呼び出すことができる。

```tsx
const  { user }  =  usePrivy();

return (
 {ready && authenticated ? (
    <div className="App"> 
        <div>
            <p>User object</p>
            <textarea value={JSON.stringify(user, null, 2)} rows={20} disabled/>
	    </div>
    </div>
) : null }
);
```

## ネイティブ・トランザクションの送信

You can perform native transactions, like sending KLAY from one user to another.

```tsx
const [klayTransferTx, setKlayTransferTx] = useState("");
async function sendTx() {
  if (!authenticated) {
    console.log("User not authenticated yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider?.getSigner()
  console.log(await signer.getAddress());
  const destination = "PASTE DESTINATION WALLET ADDRESS"
  
  const tx = await signer.sendTransaction({
    to: destination,
    value: ethers.parseEther("0.1"),
    maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
    maxFeePerGas: "6000000000000", // Max fee per gas
  })
const receipt = await tx.wait();
console.log(receipt);
setKlayTransferTx(receipt.transactionHash)
}

return (
 {ready && authenticated ? (
         <div className="mt-12 flex flex-col gap-5">
            <button onClick={sendTx}>Send Transaction</button>
            <p>{klayTransferTx ? `KAIA Successfully Transferred with: ${klayTransferTx} hash` : "No Tx yet"}</p>
        </div>
) : null }
);
```

## スマートコントラクトとの連携

### 1. 契約の展開

スマート・コントラクトは、アプリケーション・バイナリ・インターフェース（ABI）とコントラクトのバイトコードによってデプロイできる。

```tsx
// add to the existing useState hook.
const [contractAddress, setContractAddress] = useState("");

const deployContract = async () => {
  if (!authenticated) {
    console.log("privy not initialized yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider.getSigner();
  console.log(await signer.getAddress());
  
// paste your contractABI
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_initNum",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "retrieve",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  // Paste your contract byte code
  const contractBytecode = '608060405234801561001057600080fd5b506040516102063803806102068339818101604052810190610032919061007a565b80600081905550506100a7565b600080fd5b6000819050919050565b61005781610044565b811461006257600080fd5b50565b6000815190506100748161004e565b92915050565b6000602082840312156100905761008f61003f565b5b600061009e84828501610065565b91505092915050565b610150806100b66000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea26469706673582212200370e757ac1c15a024febfa9bf6999504ac6616672ad66bd654e87765f74813e64736f6c63430008120033'
  const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
  const contract = await contractFactory.deploy(1000);
  
  // get contract address
  setContractAddress(await contract.getAddress())
}

return (
 {ready && authenticated ? (
    <div className="App">
        <button onClick={deployContract}>Deploy Contract</button>
        <p >{contractAddress ? `Contract was Successfully deployed at: ${contractAddress}` : "No contracts deployed yet"}</p>
    </div>
) : null }
);
```

### 2. 契約書への書き込み

```tsx
const [contractWriteTx, setContractTx] = useState("");
const writeToContract = async (e) => {
  e.preventDefault();
  if (!authenticated) {
    console.log("privy not initialized yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider.getSigner();
  
 const contractABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_initNum",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "num",
            "type": "uint256"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    // Paste your contract address
    const contractAddress = "0x3b01E4025B428fFad9481a500BAc36396719092C"; 
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    const value = e.target.store_value.value;
  
    // Send a transaction to smart contract to update the value
    const tx = await contract.store(value);
    console.log(tx.hash);
    
  
    setContractTx(tx.hash);
}

return (
 {ready && authenticated ? (
    <div className="App">
        <form onSubmit={writeToContract}>
           	<input name="store_value" placeholder="Set contract value" required/>
            <input type="submit" value="Store"/>
        </form> 
        <div>Write-to-contract Tx Hash: ${contractWriteTx}</div>
    </div>
) : null }
);
```

### 3. 契約書を読む

```tsx
const [readContractMessage, setContractMessage] = useState();
const readFromContract = async (e) => {
  e.preventDefault();
  if (!authenticated) {
    console.log("privy not initialized yet");
    return;
  }
  const provider = await wallets[0].getEthersProvider();
  const signer = provider.getSigner();
  
 const contractABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_initNum",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "num",
            "type": "uint256"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  
     // Paste your contract address
     const contractAddress = "0x3b01E4025B428fFad9481a500BAc36396719092C"; 
     const contract = new ethers.Contract(contractAddress, contractABI, provider)
  
     // Reading a message from the smart contract
     const contractMessage = await contract.retrieve();
     setContractMessage(contractMessage.toString())
}

return (
 {ready && authenticated ? (
    <div className="App">
	    <button onClick={readFromContract}> Read Contract Message</button>
        <p>{readContractMessage ? `Message stored in contract is: ${readContractMessage}` : "No message from contract yet"}</p>
    </div>
) : null }
);
```

## 次のステップ

Privyに関するより詳細なガイドについては、[Privy Docs](https://docs.privy.io/)および[Privy Githubリポジトリ](https://github.com/privy-io)を参照してください。 また、このガイドのコードの完全な実装は[GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/privy-auth-sample)にあります。
