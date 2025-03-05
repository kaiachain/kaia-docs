---
sidebar_label: Web3Modal
---

# 將 Web3Modal 整合到 dApp 中

![](/img/banners/kaia-web3Modal\(wc\).png)

## 導言

[Web3Modal](https://docs.walletconnect.com/2.0/web3modal/about)是一個簡單易用的庫，可幫助開發人員通過簡單、可定製的配置在其 dApp 中添加對多個提供商的支持。 它讓連接錢包、執行交易和管理賬戶變得簡單。

在本指南中，您將使用 web3Modal 庫將 Kaia Wallet、Klip、Metamask、Coinbase Wallet 等多個錢包集成到您在 Kaia 網絡上構建的 dApp 中。

## 先決條件

- 一個正在運行的 react 項目（執行 `npx create-react-app project-name` 命令）
- 安裝必要的錢包（[Kaia Wallet](https://www.kaiawallet.io/en_US/)、[Coinbase Wallet](https://www.coinbase.com/wallet/downloads) 和 [Metamask](https://metamask.io/download/))。
- RPC 端點：您可以從支持的[端點提供者](../../../../references/public-en.md)中獲取。
- 從 [水龍頭](https://faucet.kaia.io)測試 KAIA：為賬戶注入足夠的 KAIA。

## 設置 Web3Modal 和錢包提供程序選項

**步驟 1**：安裝 Web3Modal 和以太坊庫

安裝 web3Modal 和您喜歡的與區塊鏈交互的庫。 在本教程中，我們將安裝 [@klaytn/web3modal](https://github.com/klaytn/klaytn-web3modal)，它源自 [Web3Modal](https://github.com/WalletConnect/web3modal)，並經過修改添加了 Kaia 錢包和 Klip 錢包。 此外，本教程還將使用 ethers.js 與 Kaia 區塊鏈進行交互。

```bash
npm install @klaytn/web3modal
npm install --save ethers
```

**第 2 步**：使用錢包提供商選項實例化 Web3Modal

安裝您選擇的錢包提供商。 這裡我們安裝 Kaia Wallet、Klip 和 Coinbase 錢包提供商。

```bash
npm install --save @coinbase/wallet-sdk
npm install --save @klaytn/kaikas-web3-provider
npm install --save @klaytn/klip-web3-provider
```

在您的 `App.js` 文件中，導入 CoinbaseWalletSDK、KaikasWeb3Provider 和 KlipWeb3Provider，並實例化各種提供程序選項，以便與您的 dapp 集成。

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

**第 3 步**：實例化 web3modal

然後，通過傳遞提供程序選項來實例化 Web3Modal。

```js
import Web3Modal from "@klaytn/web3modal";
const  web3Modal = new Web3Modal( {
    cacheProvider: true,
    providerOptions,
  } )
```

## 建立錢包連接

要建立與用戶錢包的連接，請調用 Web3Modal 實例上的 `connect()` 方法。 我們建議您將此操作封裝在一個異步函數中，並將檢索到的提供程序存儲在您的狀態中，以便在整個應用程序中重複使用。

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

## 設置實用工具功能

在本指南中，我們將使用 `truncateAddress()` 和 `toHex()` 等實用工具函數。 truncateAddress() "函數接收有效地址，並返回所傳遞地址的更易讀格式。 而 `toHex()` 函數則將數字轉換為十六進制。  以下步驟展示瞭如何在項目中設置和使用 utils 函數。

**步驟 1**：在 `src` 根文件夾中創建一個 `utils.js` 文件。

在新創建的 utils.js 文件中粘貼以下代碼。

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

**第 2**步在您的 `App.js` 文件中導入函數。

```js
import { truncateAddress, toHex } from "./utils";
```

## 訪問連接、賬戶和網絡信息

目前，Web3Modal 沒有為以太坊交互提供內置支持，例如檢索連接的賬戶和網絡數據。 請注意，要讀取用戶地址或連接的網絡 ID，必須直接從以太坊庫請求信息。 在本指南中，我們將使用 ethers.js 獲取這些信息。 獲取和存儲這些數據的一種方法是將用戶連接到您的 dapp。

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

## 斷開錢包連接

使用 web3Modal 實例上的 "clearCachedProvider() "方法可以斷開與錢包的連接。 此外，一個好的做法是刷新狀態，清除之前存儲的連接數據。

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

重要的是要記住，用戶與 dApp 交互時，dApp 的狀態會發生變化，因此最好的做法是訂閱響應發佈的事件。 創建帶有這些事件訂閱的 useEffect 鉤子，以便對變化做出適當的響應。

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

## 切換網絡或添加自定義網絡

如前所述，Web3Modal 沒有內置的以太坊交互支持。 要添加或切換網絡，您必須直接向以太坊庫提出申請（通過 EIP-3085 或 EIP-3326）。 下面是一個請求切換網絡的示例，如果用戶錢包中還沒有該網絡，則將其添加為備用網絡：

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

## 簽署信息

初始化提供者和簽名者對象後，用戶就可以簽署任意字符串。

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

## 發送本地事務

您可以執行本地事務，如將 KAIA 從一個用戶發送到另一個用戶。

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

## 使用智能合約

有了 Web3Modal 提供者和簽名者對象，您就可以進行合約交互，例如向部署到區塊鏈上的智能合約寫入或讀取。

### 1. 撰寫合同

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

### 2. 閱讀合同

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

## 故障排除

**Node fs error, add browser \{fs: false\} to package.json**

```bash
Node fs error, add browser {fs: false} to package.json
```

安裝 Klip-web3-provider 時會出現這種情況。  要解決這個問題，請按照以下步驟操作：

\*\*第 1 步打開並導航至 node_modules 文件夾。 查找 @Kaia/klip-web3-provider 文件夾，並導航到其 package.json 文件，如下所示：

> **@klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.json**

**第 2 步**：將下面的代碼粘貼到 @klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.json 文件中。

```js
"browser": {
        "fs": false
     },
```

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

使用 webpack 版本 5 時會出現此錯誤。 在此版本中，默認情況下不再支持 NodeJS polyfills。 要解決這個問題，請參閱本 [指南](https://web3auth.io/docs/troubleshooting/webpack-issues)。

## 下一步

有關 Web3Modal 的更多深入指南，請參閱 [Web3Modal 文檔](https://docs.walletconnect.com/2.0/web3modal/about) 和 [Web3Modal Github 代碼庫](https://github.com/klaytn/klaytn-web3modal)。 此外，您還可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/web3Modal-sample) 上找到本指南的完整實現代碼。



