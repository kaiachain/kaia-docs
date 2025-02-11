---
sidebar_label: Web3-Onboard
---

# Web3-OnboardをdAppに統合する

![](/img/banners/kaia-web3Onboard.png)

## はじめに

Web3-Onboard](https://onboard.blocknative.com/docs/overview/introduction)のようなツールを活用することで、プロジェクトや開発者は複数のウォレットを分散型アプリケーション（dApps）に素早く統合することができる。 Web3-Onboardの助けを借りて、ユーザーのオンボーディングが簡素化されました。 Web3-Onboardには、複数のウォレットのサポートから、ユーザーが自分のアカウントを異なるチェーンやネットワークに接続し、リアルタイムの取引通知を受け取る機能など、さまざまな機能がある。

カイアネットワーク上に構築したdAppに追加することができます。 をカイアネットワーク上に構築したdAppに追加することができます。

## 前提条件

- このガイドでは、Web3-Onboardライブラリを使用して複数のウォレット（Coinbase Wallet、Metamask、WalletConnectなど）を
- 必要なウォレット（[Coinbase Wallet](https://www.coinbase.com/wallet/downloads)、[Metamask](https://metamask.io/download/)）をインストールします。
- RPCエンドポイント：サポートされている[エンドポイント・プロバイダー](../../../../references/public-en.md)の1つから取得できます。
- [Faucet](https://faucet.kaia.io)からKAIAをテスト: 口座に十分なKAIAを入金してください。

## はじめに

チェーンにとらわれないウォレットライブラリであるWeb3-Onboardは、すべてのEVM互換ネットワークをサポートし、ライブラリに新しいネットワークを追加する柔軟性も提供します。 このガイドでは、Web3-Onboardを使ってKaia MainnetとKaia Testnet KairosをdAppに追加します。 ということで、さっそくWeb3-Onboardを使ったマルチウォレットの互換性をKaia Networkで構築したdAppに統合してみましょう。

## オンボードモジュールとウォレットモジュールのセットアップ

**ステップ 1**：web3-onboard/coreをインストールする

```bash
npm i @web3-onboard/core 
```

**ステップ 2**：ウォレットモジュールのインポートとインスタンス化

このステップでは、ウォレットモジュールを使ってdAppでサポートするウォレットをいくつでも追加できます。 しかし、このガイドでは、Coinbase Wallet、WalletConnect、Injected Walletsをweb3-Onboardの実装に追加します。 Web3-Onboardを使用してdAppに追加できるウォレットモジュールのリストについては、こちらの[docs](https://onboard.blocknative.com/docs/overview/introduction#wallet-modules)を参照してください。 しかし、このガイドでは、Coinbase Wallet、WalletConnect、Injected Walletsをweb3-Onboardの実装に追加します。 Web3-Onboard](https://onboard.blocknative.com/docs/overview/introduction)のようなツールを活用することで、プロジェクトや開発者は複数のウォレットを分散型アプリケーション（dApps）に素早く統合することができる。 Web3-Onboardの助けを借りて、ユーザーのオンボーディングが簡素化されました。 Web3-Onboardには、複数のウォレットのサポートから、ユーザーが自分のアカウントを異なるチェーンやネットワークに接続し、リアルタイムの取引通知を受け取る機能など、さまざまな機能がある。

```bash
npm install @web3-onboard/coinbase // Coinbase Wallet
npm install @web3-onboard/walletconnect // WalletConnect
npm install @web3-onboard/injected-wallets  // Used to connect to Metamask
```

`App.js`ファイルで、ウォレットモジュールをインスタンス化して、dAppと統合します。 各モジュールには、フォールバックJSON RPC URLやデフォルト・チェーンIDなど、渡すべき独自のオプション・パラメータがあることに注意してください。

```js
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];
```

**ステップ 3**：エーテルのインストールとインポート

Web3-Onboardプロバイダは、[ethers.js](https://docs.ethers.org/v6/)や[web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html)のようなライブラリで使用することができます。 このガイドでは、ethers.jsを使用して、ユーザーのアカウントの取得、残高の取得、トランザクションの署名、トランザクションの送信、スマートコントラクトからの読み取り、スマートコントラクトへの書き込みなどのKaiaブロックチェーンの呼び出しを行います。 このガイドでは、ethers.jsを使用して、ユーザーのアカウントの取得、残高の取得、トランザクションの署名、トランザクションの送信、スマートコントラクトからの読み取り、スマートコントラクトへの書き込みなどのKaiaブロックチェーンの呼び出しを行います。

```bash
npm install --save ethers
```

`App.js`ファイルで、ethersパッケージを次のようにインポートする：

```js
import { ethers } from "ethers";
```

**ステップ 4**：Web3ReactProviderのインポートとセットアップ

このステップでは、作成したモジュールとライブラリーと互換性のあるチェーンのリストを使ってOnboardをインスタンス化します。 `App.js`ファイルを開き、以下のコードを貼り付ける： `App.js`ファイルを開き、以下のコードを貼り付ける：

```js
import Onboard from "@web3-onboard/core";
const ETH_MAINNET_RPC_URL = `Paste ETH RPC URL`;
const KAIA_MAINNET_URL = `Paste KAIA MAINNET URL`
const KAIROS_TESTNET_URL = `Paste KAIROS TESTNET URL`

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: "0x1", // chain ID must be in hexadecimal
      token: "ETH",
      namespace: "evm",
      label: "Ethereum Mainnet",
      rpcUrl: ETH_MAINNET_RPC_URL
    },
    {
      id: "0x2019", // chain ID must be in hexadecimal
      token: "KAIA",
      namespace: "evm",
      label: "Kaia Mainnet",
      rpcUrl: KAIA_MAINNET_URL
    },
    {
      id: "0x3e9", // chain ID must be in hexadecimel
      token: "KAIA",
      namespace: "evm",
      label: "Kairos Testnet",
      rpcUrl: KAIROS_TESTNET_URL
    },
   // you can add as much supported chains as possible
  ],
  appMetadata: {
    name: "Kaia-web3-onboard-App", // change to your dApp name
    icon: "https://pbs.twimg.com/profile_images/1620693002149851137/GbBC5ZjI_400x400.jpg", // paste your icon 
    logo: "https://pbs.twimg.com/profile_images/1620693002149851137/GbBC5ZjI_400x400.jpg", // paste your logo
    description: "Web3Onboard-Kaia",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});
```

## ユーティリティ機能の設定

このガイドでは、`truncateAddress()`や`toHex()`といったutils関数を利用する。 truncateAddress()`関数は有効なアドレスを受け取り、渡されたアドレスをより読みやすい形式で返す。 一方、`toHex()\`関数は数値を16進数に変換する。  以下のステップは、プロジェクトでutils関数をセットアップして使用する方法を示しています。 truncateAddress()`関数は有効なアドレスを受け取り、渡されたアドレスをより読みやすい形式で返す。 一方、`toHex()`関数は数値を16進数に変換する。  以下のステップは、プロジェクトでutils関数をセットアップして使用する方法を示しています。

**ステップ 1**：ルートフォルダ `src` に `utils.js` ファイルを作成する。

新しく作成したutils.jsファイルに以下のコードを貼り付ける。

```js
export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };
```

**ステップ 2**：App.js\\`ファイルに関数をインポートします。

```js
import { truncateAddress, toHex } from "./utils";
```

## ウォレットを接続する

`App.js` ファイルの App 関数内で、オンボードインスタンスの `connectWallet()` メソッドを呼び出し、オンボードポップアップモーダルを開始します。

```js
function App() {
    const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>  
    </div>
  );
}
```

Connect Wallet ボタンをクリックすると、モーダルが表示され、Coinbase Wallet やその他のインスタンス化されたウォレットに dApp からシームレスに接続できるようになります。

![](/img/build/tools/web3-Onboard.png)

## ウォレットの切断

接続されたウォレットを切断するには、ユーザーのプライマリウォレットのラベルと一緒にオンボードインスタンスで `disconnectWallet()` メソッドを呼び出します。 また、以前に保存された接続データをクリアするために、ステートをリフレッシュすることも良い習慣のひとつである。 また、以前に保存された接続データをクリアするために、ステートをリフレッシュすることも良い習慣のひとつである。

```js
function App() {
    const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
    } catch (error) {
      console.error(error);
    }
  };
    
  const disconnect = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (primaryWallet) await onboard.disconnectWallet({ label: primaryWallet.label });
    refreshState();
  };

  // refresh state
  const refreshState = () => {
    setAccount("");
    setChainId("");
    setProvider();
    // make sure to add every other state declared here.
  };
  
  return (
    <div className="App">
           <button onClick={connectWallet}>Connect Wallet</button>  
          <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

## 接続、アカウント、ネットワーク情報へのアクセス

ウォレットの接続に成功したら、[onboard.state.get()](https://onboard.blocknative.com/docs/modules/core#get-current-state) メソッドを使用して、オンボードインスタンスを通じて保存されている接続の状態を取得できます。 初回接続時に状態を取得することもできる。 これで、connectWallet() メソッドを変更して、ウォレット状態のリストを返すようにすることができます。 初回接続時に状態を取得することもできる。 これで、connectWallet() メソッドを変更して、ウォレット状態のリストを返すようにすることができます。

**ステップ1**：ReactのuseStateをインポートする。

```js
import { useState } from 'react';
```

**ステップ 2**：アプリ関数内のコードを修正する

```js
function App() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts, chains, provider } = wallets[0];
      
      setProvider(provider);
      setAccount(accounts[0].address);
      setChainId(chains[0].id);
     
    } catch (error) {
      console.error(error);
    }
  };
  
  ...
  
  return (
    <div className="App">
        <div>
            { !account ? ( <button  onClick={connectWallet}> Connect Wallet</button> ) : (
                <button onClick={disconnect}>Disconnect</button>
            )}
        </div>
     		
        <div>Wallet Address: ${truncateAddress(account)}</div>
        <div>Network Chain ID: ${chainId}</div>
    </div>
  );
}
```

## ネットワークをスイッチする

`dAppsでネットワークの切り替えをユーザーに促すために、Web3-Onboardは初期化されたOnboardのインスタンスに`setChain\`メソッドを提供します。 ターゲット・ネットワークは、アプリケーションの開始時にオンボード・インスタンスで初期化されていなければならないことに注意してください。

```js
const switchNetwork = async () => {
await onboard.setChain({ chainId: toHex(1001) });
};

return (
    <div className="App">
        <button onClick={switchNetwork}>Switch Network</button>
    </div>
)
```

## ネイティブ・トランザクションの送信

ウォレットへの接続に成功したら、connectWallet() 関数で行ったように、ウォレット接続から返されたプロバイダオブジェクトをステート変数に格納することができます。 したがって、このプロバイダーと署名者オブジェクトを使って、ブロックチェーンにトランザクションを送信することができる。 したがって、このプロバイダーと署名者オブジェクトを使って、ブロックチェーンにトランザクションを送信することができる。

```js
 // add to the existing useState hook.
  const [txHash, setTxHash] = useState();

  const sendKaia = async () => {
    
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
	
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(provider);

    const signer = await ethersProvider.getSigner();

    // Submit transaction to the blockchain and wait for it to be mined
    const tx = await signer.sendTransaction({
          to: "0x75Bc50a5664657c869Edc0E058d192EeEfD570eb",
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

## スマートコントラクトとのやりとり

Web3-Onboardのプロバイダと署名者オブジェクトを使えば、ブロックチェーン上に配置されたスマートコントラクトへの書き込みや、スマートコントラクトからの読み込みといったコントラクトのやり取りを行うことができる。

```js
// add to existing useState hook
  const [contractTx, setContractTx] = useState();
  const [contractMessage, setContractMessage] = useState();

  const writeToContract = async (e) => {
    e.preventDefault();
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
  
     // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
   // const provider = new ethers.providers.Web3Provider(provider);
    const signer = await ethersProvider.getSigner();
  
    // Paste your contractABI
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
  
    // const contract = new Contract(contractAddress, contractABI, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    const value = e.target.store_value.value;
  
    // Send transaction to smart contract to update message
    const tx = await contract.store(value);
  
    // Wait for transaction to finish
    const receipt = await tx.wait();
    const result = receipt.hash;
  
    setContractTx(result)
  }

  const readFromContract = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
  	
	
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(provider);
  
    // paste your contract ABI
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
  
     // paste your contract address
    const contractAddress = "0x3b01E4025B428fFad9481a500BAc36396719092C"; 
  
    // const contract = new Contract(contractAddress, contractABI, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider)
  
    // Read message from smart contract
    const contractMessage = await contract.retrieve();
    setContractMessage(contractMessage.toString())
  }


  return (

    <div className="App">
         <form onSubmit={writeToContract}>
                  <input  name="store_value" placeholder="Set contract value" required/>
                  <input  type="submit" value="Store"/>
        </form> 
        <button onClick={readFromContract}>Read From Contract</button> 
        <div>Write-to-contract Tx Hash: ${contractTx}</div>
        <div>Read-from-contract Message: ${contractMessage}</div>
    </div>

  )
```

## トラブルシューティング

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

このエラーは webpack バージョン 5 を使用している場合に発生します。 このバージョンでは、NodeJSポリフィルはデフォルトではサポートされなくなりました。 このエラーは webpack バージョン 5 を使用している場合に発生します。 このバージョンでは、NodeJSポリフィルはデフォルトではサポートされなくなりました。 この問題を解決するには、この[ガイド](https://web3auth.io/docs/troubleshooting/webpack-issues)を参照してください。

## 次のステップ

Web3-Onboardに関するより詳細なガイドについては、[Blocknative Docs](https://docs.blocknative.com/onboard)および[Blocknative Githubリポジトリ](https://github.com/blocknative/onboard)を参照してください。 また、このガイドのコードの完全な実装は[GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/web3Onboard-sample)にあります。 また、このガイドのコードの完全な実装は[GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/web3Onboard-sample)にあります。
