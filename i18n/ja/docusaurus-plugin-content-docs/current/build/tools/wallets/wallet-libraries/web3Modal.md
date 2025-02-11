---
sidebar_label: Web3Modal
---

# Web3ModalをdAppに統合する

![](/img/banners/kaia-web3Modal\(wc\).png)

## はじめに

[Web3Modal](https://docs.walletconnect.com/2.0/web3modal/about)は、シンプルでカスタマイズ可能な設定で、開発者がdAppsに複数のプロバイダのサポートを追加するのを助ける、使いやすいライブラリです。 ウォレットの接続、取引の実行、アカウントの管理が簡単にできる。 ウォレットの接続、取引の実行、アカウントの管理が簡単にできる。

このガイドでは、web3Modalライブラリを使用して、Kaia Wallet、Klip、Metamask、Coinbase Walletなどの複数のウォレットをKaia Network上に構築したdAppに統合します。

## 前提条件

- 作業中のreactプロジェクト(`npx create-react-app project-name`を実行する)
- 必要なウォレット（[Kaia Wallet](https://www.kaiawallet.io/en_US/)、[Coinbase Wallet](https://www.coinbase.com/wallet/downloads)、[Metamask](https://metamask.io/download/)）をインストールします。
- RPCエンドポイント：サポートされている[エンドポイント・プロバイダー](../../../../references/public-en.md)の1つから取得できます。
- [Faucet](https://faucet.kaia.io)からKAIAをテスト: 口座に十分なKAIAを入金してください。

## Web3Modalとウォレットプロバイダーのオプションを設定する

**ステップ 1**：Web3ModalとEthereumライブラリのインストール

このままでは、Web3Modalは、接続されたアカウントやネットワークデータを取得するようなイーサリアムのインタラクションのための組み込みサポートを提供していません。 ユーザーのアドレスや接続しているネットワークIDを読み取るには、イーサリアムライブラリから直接情報をリクエストする必要があることに注意してください。 このガイドでは、ethers.jsを使って情報を取得します。 このデータをフェッチして保存する1つの方法は、ユーザーをダップに接続するときだ。 web3Modalと、ブロックチェーンとやりとりするためのお好みのライブラリをインストールする。 このチュートリアルでは、[Web3Modal](https://github.com/WalletConnect/web3modal)から派生した[@klaytn/web3modal](https://github.com/klaytn/klaytn-web3modal)をインストールし、Kaia WalletとKlip walletを追加するように修正します。 また、このチュートリアルでは、ethers.jsを使ってKaiaブロックチェーンとやりとりします。 また、このチュートリアルでは、ethers.jsを使ってKaiaブロックチェーンとやりとりします。

```bash
npm install @klaytn/web3modal
npm install --save ethers
```

**ステップ 2**：ウォレットプロバイダーオプションでWeb3Modalをインスタンス化する

お好みのウォレットプロバイダーをインストールしてください。 お好みのウォレットプロバイダーをインストールしてください。 ここでは、Kaia Wallet、Klip、Coinbaseのウォレットプロバイダーをインストールします。

```bash
npm install --save @coinbase/wallet-sdk
npm install --save @klaytn/kaikas-web3-provider
npm install --save @klaytn/klip-web3-provider
```

あなたの`App.js`ファイルで、CoinbaseWalletSDK、KaikasWeb3Provider、KlipWeb3Providerをインポートし、あなたのdappと統合するための様々なプロバイダオプションをインスタンス化する。

```js
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { KaikasWeb3Provider } from "@klaytn/kaikas-web3-provider";
import { KlipWeb3Provider } from "@klaytn/klip-web3-provider";

export const providerOptions = {
 coinbasewallet: {
   package: CoinbaseWalletSDK, 
   options: {
     appName: "Web 3 Modal Demo",
     infuraId: process.env.INFURA_KEY 
   }
 },
 walletconnect: {
   package: WalletConnect, 
   options: {
     infuraId: process.env.INFURA_KEY 
   }
 }
};
const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK, // required
    options: {
      appName: "Web3Modal Kaia dApp", // required
      infuraId: "NFURA_KEY", // required
      rpc: "https://public-en.node.kaia.io", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1001, // Optional. It defaults to 1 if not provided
      darkMode: false // Optional. Use dark theme, defaults to false
    }
  },
  klip: {
    package: KlipWeb3Provider, //required
    options: {
        bappName: "Web3Modal Kaia dApp", //required
        rpcUrl: "https://public-en.node.kaia.io" //required
    }
},
  kaikas: {
    package: KaikasWeb3Provider // required
  }
};
```

**ステップ 3**：web3modalをインスタンス化する

次に、プロバイダのオプションを渡してWeb3Modalをインスタンス化する。

```js
import Web3Modal from "@klaytn/web3modal";
const  web3Modal = new Web3Modal( {
    cacheProvider: true,
    providerOptions,
  } )
```

## ウォレット接続の確立

ユーザーのウォレットへの接続を確立するには、Web3Modal インスタンスで `connect()` メソッドを呼び出します。 この操作を非同期関数でラップし、取得したプロバイダーをステート内に保存して、アプリ全体で再利用することを推奨する。 この操作を非同期関数でラップし、取得したプロバイダーをステート内に保存して、アプリ全体で再利用することを推奨する。

```js
import { ethers } from 'ethers';
import { useState } from 'react';

function App() {
  const [provider, setProvider] = useState();

  const connectWallet = async () => {
    try {

    const web3ModalProvider = await web3Modal.connect();
	
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(web3ModalProvider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3ModalProvider);
      setProvider(web3ModalProvider);
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

![](/img/build/tools/web3Modal.png)

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

## 接続、アカウント、ネットワーク情報へのアクセス

このままでは、Web3Modalは、接続されたアカウントやネットワークデータを取得するようなイーサリアムのインタラクションのための組み込みサポートを提供していません。 ユーザーのアドレスや接続しているネットワークIDを読み取るには、イーサリアムライブラリから直接情報をリクエストする必要があることに注意してください。 このガイドでは、ethers.jsを使って情報を取得します。 このデータをフェッチして保存する1つの方法は、ユーザーをダップに接続するときだ。

```js
const [provider, setProvider] = useState();
const [account, setAccount] = useState();
const [chainId, setChainId] = useState();

const connectWallet = async () => {
  try {
    const web3ModalProvider = await web3Modal.connect();

    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(web3ModalProvider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3ModalProvider);

    const accounts = await ethersProvider.listAccounts();
    const network = await ethersProvider.getNetwork();

    setProvider(provider);
    if (accounts) setAccount(accounts[0]);
    setChainId(network.chainId.toString());
  } catch (error) {
    console.error(error);
  }
};

return (
  <div className="App">
       <button onClick={connectWallet}>Connect Wallet</button>
       <div>Connected To Chain ID: ${chainId}</div>
       <div>Wallet Address: ${truncateAddress(account)}</div>
  </div>
);
```

## ウォレットの切断

ウォレットからの切断は web3Modal インスタンスの `clearCachedProvider()` メソッドを使用することで達成されます。 また、以前に保存された接続データをクリアするために、ステートをリフレッシュすることも良い習慣のひとつである。 また、以前に保存された接続データをクリアするために、ステートをリフレッシュすることも良い習慣のひとつである。

```js
function App() {
    
const disconnect = async () => {
    await web3Modal.clearCachedProvider();
      refreshState();
  };

// refresh state
const refreshState = () => {
  setAccount();
  setChainId();
// make sure to add every other state variable declared here.
}
  
  return (
    <div className="App">
          <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

dAppのステートはユーザーが操作することで変化することを念頭に置いておくことが重要で、それに対応してリリースされるイベントをサブスクライブするのがベストプラクティスだ。 これらのイベントへのサブスクリプションを持つ useEffect フックを作成し、変更に適切に対応できるようにします。 これらのイベントへのサブスクリプションを持つ useEffect フックを作成し、変更に適切に対応できるようにします。

```js
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts);
      };
  
      const handleChainChanged = (chainId) => {
        setChainId(chainId);
      };
  
      const handleDisconnect = () => {
        disconnect();
      };
  
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);
  
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);
```

## ネットワークの切り替えまたはカスタムネットワークの追加

先に述べたように、Web3Modalはイーサリアムとのやり取りをビルトインでサポートしていない。 ネットワークを追加または切り替えるには、イーサリアムライブラリに（EIP-3085またはEIP-3326を介して）直接リクエストする必要があります。 以下は、ネットワークの切り替えを要求し、ユーザーのウォレットにそのネットワークがまだ存在しない場合、フォールバックとしてそのネットワークを追加する例である：

```js
  const switchNetwork = async () => {
    if (!provider) return;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(8217) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: toHex(1001),
                chainName: "Kairos Testnet",
                rpcUrls: ["https://public-en-kairos.node.kaia.io"],
                blockExplorerUrls: ["https://kairos.kaiascan.io/"],
              },
            ],
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };

return (	
    <div className="App">
        <button onClick={switchNetwork}>Switch Network</button>  
    </div>
) 
```

## メッセージに署名する

プロバイダーと署名者オブジェクトを初期化すると、ユーザーは任意の文字列に署名できる。

```js
 // add to the existing useState hook.
const [signedMessage, setSignedMessage] = useState("");

const signMessage = async(e) => {
 e.preventDefault()
    if (!provider) return;
      try {
      const signature = await provider.request({
        method: "personal_sign",
        params: [message, account]
      });

    setSignedMessage(signature);
 
    } catch (error) {
      console.log(error);
    }
}
  return (
    <div className="App">
        <form onSubmit={signMessage}>
             <input type="text" name="message" placeholder="Set message" required/>
             <input type="submit" value="Sign Message"/>
         </form> 
         <div>SignedMessage: ${signedMessage}</div>
    </div>
  );
```

## ネイティブ・トランザクションの送信

あるユーザーから別のユーザーへKAIAを送信するなど、ネイティブ・トランザクションを実行できる。

```js
    // add to the existing useState hook.
    const [txHash, setTxHash] = useState();
    const sendKaia = async () => {
    if (!provider) return;
      const destination = “paste recipient address”;

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

## スマートコントラクトとの連携

Web3Modalのプロバイダと署名者オブジェクトを使えば、ブロックチェーンにデプロイされたスマートコントラクトへの書き込みや、スマートコントラクトからの読み込みといったコントラクトのやり取りができる。

### 1. コントラクトへの書き込み

```js
// add to existing useState hook
  const [contractTx, setContractTx] = useState();

  const writeToContract = async (e) => {
    e.preventDefault();
    if (!provider) return;

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
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    const value = e.target.store_value.value;
  
    // Send transaction to smart contract to update message
    const tx = await contract.store(value);
  
    // Wait for transaction to finish
    const receipt = await tx.wait();
    const result = receipt.hash;
  
    setContractTx(result)
  }

return (
    <div className="App">
         <form onSubmit={writeToContract}>
            <input  name="store_value" placeholder="Set contract value" required/>
            <input  type="submit" value="Store"/>
        </form> 
         <div>Write-to-contract Tx Hash: ${contractTx}</div>
    </div>
)
```

### 2. コントラクトを読む

```js
// add to existing useState hook
 const [contractMessage, setContractMessage] = useState();
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
  
    const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider)
  
    // Reading a message from the smart contract
    const contractMessage = await contract.retrieve();
    setContractMessage(contractMessage.toString())
  }

  return (
    <div className="App">
        <button onClick={readFromContract}>Read From Contract</button> 
        <div>Read-from-contract Message: ${contractMessage}</div>
    </div>

  )
```

## トラブルシューティング

**Node fs error, add browser \{fs: false\} to package.json**

```bash
Node fs error, add browser {fs: false} to package.json
```

これはKlip-web3-providerをインストールしたときに発生します。  この問題を解決するには、以下の手順に従ってください：  この問題を解決するには、以下の手順に従ってください：

**ステップ 1**：node_modulesフォルダを開いて移動します。 Kaia/klip-web3-providerフォルダを探し、以下のようにpackage.jsonファイルに移動します：

> **@klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.json**

**ステップ 2**：以下のコードを@klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.jsonファイルに貼り付けます。

```js
"browser": {
        "fs": false
     },
```

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

このエラーは webpack バージョン 5 を使用している場合に発生します。 このバージョンでは、NodeJSポリフィルはデフォルトではサポートされなくなりました。 この問題を解決するには、この[ガイド](https://web3auth.io/docs/troubleshooting/webpack-issues)を参照してください。 このバージョンでは、NodeJSポリフィルはデフォルトではサポートされなくなりました。 先に述べたように、Web3Modalはイーサリアムとのやり取りをビルトインでサポートしていない。 ネットワークを追加または切り替えるには、イーサリアムライブラリに（EIP-3085またはEIP-3326を介して）直接リクエストする必要があります。 以下は、ネットワークの切り替えを要求し、ユーザーのウォレットにそのネットワークがまだ存在しない場合、フォールバックとしてそのネットワークを追加する例である：

## 次のステップ

Web3Modalに関するより詳細なガイドについては、[Web3Modal Docs](https://docs.walletconnect.com/2.0/web3modal/about)と[Web3Modal Githubリポジトリ](https://github.com/klaytn/klaytn-web3modal)を参照してください。 また、このガイドのコードの完全な実装は[GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/web3Modal-sample)にあります。 はじめに
