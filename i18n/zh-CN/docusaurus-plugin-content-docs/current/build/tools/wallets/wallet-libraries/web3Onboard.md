---
sidebar_label: Web3-Onboard
---

# 将 Web3-Onboard 集成到 dApp 中

![](/img/banners/kaia-web3Onboard.png)

## 导言

利用 [Web3-Onboard](https://onboard.blocknative.com/docs/overview/introduction) 这样的工具，项目和开发人员可以快速将多个钱包集成到他们的去中心化应用程序（dApps）中。 在 Web3-Onboard 的帮助下，用户入职变得更加简单。 Web3-Onboard 确实有不同的功能，从支持多种钱包到用户可以将账户连接到不同的链或网络并接收实时交易通知等等。

在本指南中，您将使用 Web3-Onboard 库集成多个钱包（如 Coinbase Wallet、Metamask、WalletConnect 等）。 到您在 Kaia 网络上构建的 dApp 中。

## 先决条件

- 一个正在运行的 react 项目（执行 `npx create-react-app project-name` 命令）
- 安装必要的钱包（[Coinbase Wallet](https://www.coinbase.com/wallet/downloads)、[Metamask](https://metamask.io/download/))。
- RPC 端点：您可以从支持的[端点提供者](../../../../references/public-en.md)中获取。
- 从 [水龙头](https://faucet.kaia.io)测试 KAIA：为账户注入足够的 KAIA。

## 开始

Web3-Onboard 作为与链无关的钱包库，支持所有与 EVM 兼容的网络，还能灵活地向库中添加新的网络。 在本指南中，我们将使用 Web3-Onboard 将 Kaia Mainnet 和 Kaia Testnet Kairos 添加到我们的 dApp 中。 说完这些，让我们开始使用 Web3-Onboard 将多钱包兼容性集成到您在 Kaia Network 上构建的 dApp 中。

## 设置板载模块和钱包模块

**第 1 步**：安装 @web3-onboard/core

```bash
npm i @web3-onboard/core 
```

**第 2 步**：导入和实例化钱包模块

在这一步中，您可以使用钱包模块在您的 dApp 中添加尽可能多的钱包。 但在本指南中，您将在 web3-Onboard 实现中添加 Coinbase 钱包、WalletConnect、注入式钱包。 有关可使用 Web3-Onboard 添加到 dApp 的钱包模块列表，请参阅此 [docs](https://onboard.blocknative.com/docs/overview/introduction#wallet-modules) 。

```bash
npm install @web3-onboard/coinbase // Coinbase Wallet
npm install @web3-onboard/walletconnect // WalletConnect
npm install @web3-onboard/injected-wallets  // Used to connect to Metamask
```

在您的 `App.js` 文件中，实例化钱包模块，以便与您的 dApp 集成。 请注意，每个模块都有自己独特的选项参数，如备用 JSON RPC URL 或默认链 ID。

```js
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];
```

**第 3 步**：安装和导入乙醚

Web3-Onboard 提供程序可与 [ethers.js](https://docs.ethers.org/v6/) 和 [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html) 等库一起使用。 在本指南中，我们将使用 ethers.js 进行 Kaia 区块链调用，如获取用户账户、获取余额、签署交易、发送交易、读取和写入智能合约。

```bash
npm install --save ethers
```

在您的 `App.js` 文件中，像这样导入 ethers 软件包：

```js
import { ethers } from "ethers";
```

**第 4 步**：导入和设置 Web3ReactProvider

在此步骤中，您将使用创建的模块和与库兼容的链列表实例化 Onboard。 打开您的 `App.js` 文件并粘贴下面的代码：

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

## 连接钱包

在 `App.js` 文件的 App 函数中，调用板载实例上的 `connectWallet()` 方法来启动板载弹出式模块。

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

点击 "连接钱包 "按钮后，您将看到一个模态，允许您无缝连接 Coinbase 钱包和 dApp 中的其他实例化钱包。

![](/img/build/tools/web3-Onboard.png)

## 断开钱包连接

断开连接的钱包可以通过调用板载实例上的 `disconnectWallet()` 方法和用户主钱包的标签来实现。 此外，一个好的做法是刷新状态，清除之前存储的连接数据。

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

## 访问连接、账户和网络信息

成功连接钱包后，您可以使用 [onboard.state.get()](https://onboard.blocknative.com/docs/modules/core#get-current-state) 方法获取通过 onboard 实例存储的连接状态。 您也可以在初始连接时获取状态。 现在，你可以修改 connectWallet() 方法，返回一个钱包状态列表，将其存储在你的状态中，并在整个应用程序中使用。

**第 1 步**：导入 React 的 useState

```js
import { useState } from 'react';
```

**第 2 步**：修改应用程序功能中的代码

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

## 交换网络

为了提示用户在 dApp 中切换网络，Web3-Onboard 在 Onboard 的初始化实例上提供了一个 `setChain` 方法。 请注意，在应用程序启动时，目标网络必须已通过板载实例初始化。

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

## 发送本地事务

成功连接到钱包后，可以将钱包连接返回的提供程序对象存储到状态变量中，就像在 connectWallet() 函数中所做的那样。 因此，您可以使用该提供者和签名者对象向区块链发送交易。

```js
 // add to the existing useState hook.
  const [txHash, setTxHash] = useState();

  const sendKaia = async () => {
    
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
	
    //
    const ethersProvider = new ethers.BrowserProvider(provider);
    // 对于低于 6.3.0 的ether版本。
    // const provider = new ethers.providers.Web3Provider(provider);

    const signer = await ethersProvider.getSigner();

    // 向区块链提交交易并等待挖矿
    const tx = await signer.sendTransaction({
          to："0x75Bc50a5664657c869Edc0E058d192EeEfD570eb",
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

## 与智能合约互动

有了 Web3-Onboard 提供者和签名者对象，您就可以进行合约交互，例如写入和读取部署在区块链上的智能合约。

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

## 故障排除

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

使用 webpack 版本 5 时会出现此错误。 在此版本中，默认情况下不再支持 NodeJS polyfills。 要解决这个问题，请参阅本 [指南](https://web3auth.io/docs/troubleshooting/webpack-issues)。

## 下一步

有关 Web3-Onboard 的更多深入指南，请参阅 [Blocknative 文档](https://docs.blocknative.com/onboard) 和 [Blocknative Github 存储库](https://github.com/blocknative/onboard)。 此外，您还可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/web3Onboard-sample) 上找到本指南的完整实现代码。