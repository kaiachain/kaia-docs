---
sidebar_label: Web3Modal
---

# 将 Web3Modal 整合到 dApp 中

![](/img/banners/kaia-web3Modal\(wc\).png)

## 导言

[Web3Modal](https://docs.walletconnect.com/2.0/web3modal/about)是一个简单易用的库，可帮助开发人员通过简单、可定制的配置在其 dApp 中添加对多个提供商的支持。 它让连接钱包、执行交易和管理账户变得简单。

在本指南中，您将使用 web3Modal 库将 Kaia Wallet、Klip、Metamask、Coinbase Wallet 等多个钱包集成到您在 Kaia 网络上构建的 dApp 中。

## 先决条件

- 一个正在运行的 react 项目（执行 `npx create-react-app project-name` 命令）
- 安装必要的钱包（[Kaia Wallet](https://www.kaiawallet.io/en_US/)、[Coinbase Wallet](https://www.coinbase.com/wallet/downloads) 和 [Metamask](https://metamask.io/download/))。
- RPC 端点：可从受支持的 [端点提供程序](../../../references/public-en.md) 中获取。
- 从 [水龙头](https://faucet.kaia.io)测试 KAIA：为账户注入足够的 KAIA。

## 设置 Web3Modal 和钱包提供程序选项

**步骤 1**：安装 Web3Modal 和以太坊库

安装 web3Modal 和您喜欢的与区块链交互的库。 在本教程中，我们将安装 [@klaytn/web3modal](https://github.com/klaytn/klaytn-web3modal)，它源自 [Web3Modal](https://github.com/WalletConnect/web3modal)，并经过修改添加了 Kaia 钱包和 Klip 钱包。 此外，本教程还将使用 ethers.js 与 Kaia 区块链进行交互。

```bash
npm install @klaytn/web3modal
npm install --save ethers
```

**第 2 步**：使用钱包提供商选项实例化 Web3Modal

安装您选择的钱包提供商。 这里我们安装 Kaia Wallet、Klip 和 Coinbase 钱包提供商。

```bash
npm install --save @coinbase/wallet-sdk
npm install --save @klaytn/kaikas-web3-provider
npm install --save @klaytn/klip-web3-provider
```

在您的 `App.js` 文件中，导入 CoinbaseWalletSDK、KaikasWeb3Provider 和 KlipWeb3Provider，并实例化各种提供程序选项，以便与您的 dapp 集成。

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

**第 3 步**：实例化 web3modal

然后，通过传递提供程序选项来实例化 Web3Modal。

```js
import Web3Modal from "@klaytn/web3modal";
const  web3Modal = new Web3Modal( {
    cacheProvider: true,
    providerOptions,
  } )
```

## 建立钱包连接

要建立与用户钱包的连接，请调用 Web3Modal 实例上的 `connect()` 方法。 我们建议您将此操作封装在一个异步函数中，并将检索到的提供程序存储在您的状态中，以便在整个应用程序中重复使用。

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

## 设置实用工具功能

在本指南中，我们将使用 `truncateAddress()` 和 `toHex()` 等实用工具函数。 truncateAddress() "函数接收有效地址，并返回所传递地址的更易读格式。 而 `toHex()` 函数则将数字转换为十六进制。  以下步骤展示了如何在项目中设置和使用 utils 函数。

**步骤 1**：在 `src` 根文件夹中创建一个 `utils.js` 文件。

在新创建的 utils.js 文件中粘贴以下代码。

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

**第 2**步在您的 `App.js` 文件中导入函数。

```js
import { truncateAddress, toHex } from "./utils";
```

## 访问连接、账户和网络信息

目前，Web3Modal 没有为以太坊交互提供内置支持，例如检索连接的账户和网络数据。 请注意，要读取用户地址或连接的网络 ID，必须直接从以太坊库请求信息。 在本指南中，我们将使用 ethers.js 获取这些信息。 获取和存储这些数据的一种方法是将用户连接到您的 dapp。

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

## 断开钱包连接

使用 web3Modal 实例上的 "clearCachedProvider() "方法可以断开与钱包的连接。 此外，一个好的做法是刷新状态，清除之前存储的连接数据。

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

重要的是要记住，用户与 dApp 交互时，dApp 的状态会发生变化，因此最好的做法是订阅响应发布的事件。 创建带有这些事件订阅的 useEffect 钩子，以便对变化做出适当的响应。

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

## 切换网络或添加自定义网络

如前所述，Web3Modal 没有内置的以太坊交互支持。 要添加或切换网络，您必须直接向以太坊库提出申请（通过 EIP-3085 或 EIP-3326）。 下面是一个请求切换网络的示例，如果用户钱包中还没有该网络，则将其添加为备用网络：

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

## 签署信息

初始化提供者和签名者对象后，用户就可以签署任意字符串。

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

## 发送本地事务

您可以执行本地事务，如将 KAIA 从一个用户发送到另一个用户。

```js
    //
    const [txHash, setTxHash] = useState();
    const sendKaia = async () => {
    if (!provider) return;
      const destination = "paste recipient address";

    // 本指南使用etherthers 6.3.0版本。
    const ethersProvider = new ethers.BrowserProvider(provider);
    // 对于低于6.3.0的etherthers版本。
    // const provider = new ethers.providers.Web3Provider(provider);

    const signer = await ethersProvider.getSigner();
      
    // 向区块链提交交易并等待挖矿
    const tx = await signer.sendTransaction({
        to: destination,
        value: ethers.parseEther("0.1"),
        maxPriorityFeePerGas: "5000000000", // 每个气体的最大优先级费用
        maxFeePerGas: "6000000000000", // 每个气体的最大费用
    })
  
      
    const receipt = await tx.wait();
    setTxHash(receipt.hash)
}

return (
    <div className="App">
        <button onClick={sendKlay}>Send Klay</button>
        <div>Send-Kaia Tx Hash : {txHash ?<a href={`https://kairos.kaiascan.io/tx/${txHash}`} target="_blank">KaiaScan</a> ：' '} </div> </div> <div className="App">
    </div>
);
```

## 使用智能合约

有了 Web3Modal 提供者和签名者对象，您就可以进行合约交互，例如向部署到区块链上的智能合约写入或读取。

### 1. 撰写合同

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

### 2. 阅读合同

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

安装 Klip-web3-provider 时会出现这种情况。  要解决这个问题，请按照以下步骤操作：

\*\*第 1 步打开并导航至 node_modules 文件夹。 查找 @Kaia/klip-web3-provider 文件夹，并导航到其 package.json 文件，如下所示：

> **@klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.json**

**第 2 步**：将下面的代码粘贴到 @klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.json 文件中。

```js
"browser": {
        "fs": false
     },
```

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

使用 webpack 版本 5 时会出现此错误。 在此版本中，默认情况下不再支持 NodeJS polyfills。 要解决这个问题，请参阅本 [指南](https://web3auth.io/docs/troubleshooting/webpack-issues)。

## 下一步

有关 Web3Modal 的更多深入指南，请参阅 [Web3Modal 文档](https://docs.walletconnect.com/2.0/web3modal/about) 和 [Web3Modal Github 代码库](https://github.com/klaytn/klaytn-web3modal)。 此外，您还可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/web3Modal-sample) 上找到本指南的完整实现代码。



