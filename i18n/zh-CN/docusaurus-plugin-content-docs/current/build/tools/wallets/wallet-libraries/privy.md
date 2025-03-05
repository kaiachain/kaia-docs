---
sidebar_label: Privy
---

# 将 Privy 整合到 dApp 中

![](/img/banners/kaia-privy.png)

## 导言

[Privy](https://docs.privy.io/)是一个简单的钱包工具包，用于在 web3 中进行渐进式身份验证。 有了 Privy，开发人员可以使用传统和 web3 身份验证方法登录用户，实现渐进式登录，提高用户转化率。

在本指南中，您将使用 Privy 钱包工具包将 Metamask、Coinbase Wallet 等外部钱包以及 Google、Twitter、Email 等社交登录信息整合到您在 Kaia 网络上构建的 dApp 中。

## 先决条件

- 一个正在运行的 Next.js 项目。 您可以克隆 Privy 提供的 [create-next-app](https://github.com/privy-io/create-next-app) 模板来学习本教程。
- 来自[Privy 开发者控制台](https://console.privy.io/)的[应用程序ID](https://docs.privy.io/guide/console/api-keys#app-id)

## 开始

克隆模板是一个简单的 Next.js Privy Auth 入门模板，包含三个主要核心文件：

- **index.tsx**：该文件处理用户的登录验证。
- **app.tsx**：该文件处理 Privy SDK 的初始化，并用 PrivyProvider 封装我们的组件。
- **dashboard.tsx**：这是用户登录后重定向到的页面。 它可以测试每种登录方法（谷歌、Twitter、电子邮件、钱包）。 对于本指南来说，更重要的是，我们将在使用 MetaMask 等外部钱包连接时执行某些功能。 这些功能包括：获取用户余额、向另一个账户发送 KAIA、部署合约、与智能合约交互。

## 安装

要在 dApp 中使用 Privy，必须先安装所需的库和 SDK。 因此，您需要设置 ethers.js，以及 [Privy React Auth SDK](https://www.npmjs.com/package/@privy-io/react-auth)。 您可以将 Privy 与 [etherthers.js](https://docs.ethers.org/v6/)、[web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html)、[viem](https://viem.sh/) 库一起使用，与 Kaia 区块链进行通信。 在本指南中，我们将使用 ethers.js 库。

打开项目文件夹，运行下面的命令安装所需的库和 SDK：

```bash
npm install —save @privy-io/react-auth
npm install --save ethers
```

## 初始化特权和特权提供程序

成功安装所需的库后，接下来就是用[PrivyProvider](https://docs.privy.io/reference/react-auth/modules#privyprovider)来封装组件。

PrivyProvider 应封装任何将使用 Privy SDK 的组件。 为此，请打开 _app.tsx 文件并粘贴下面的代码：

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

值得注意的是，特权提供者具有以下属性：

- 您的 `appID` 需要在 .env 文件中更新。 您可以使用 Privy 为测试目的提供的以下 "测试应用程序 ID：clpispdty00ycl80fpueukbhl "开始使用。
- 一个可选的 `onSuccess` 回调，用户成功登录后执行该回调。
- 一个可选的 "createPrivyWalletOnLogin "布尔值，用于配置是否希望用户在登录时创建嵌入式钱包。
- 可选配置属性，用于自定义上机体验。

## 连接钱包

在 `index.tsx` 文件的 LoginPage 函数中，调用 [login](https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface#login) 方法，打开 Privy 登录模态，提示用户登录。

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

## 获取账户和余额

通过上面的步骤，你会发现我们是通过连接钱包登录的。 在这一步中，我们将检索用户的相关 Kaia 地址。 此外，您还可以使用 ethers.js 检索其当前余额（以 KAIA 为单位）。

在 dashboard.tsx 文件中，粘贴以下代码：

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

## 断开钱包连接

断开钱包
用户登录后，可以通过从 usePrivy 派生的 `logout` 方法以编程方式注销用户。 这将断开当前活动会话与 dApp 的连接，使用户返回初始状态。

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

## 获取用户信息

Privy 为用户提供了使用 web3 钱包和社交登录连接到 dApp 的便利。 如果用户使用自己的社交账户（如 twitter、discord、谷歌账户等）连接到 dApp，您就可以从 `usePrivy` 中调用 `user`，这会返回一个包含用户 ID、电子邮件、钱包地址等关键信息的对象。

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

## 发送本地事务

您可以执行本地事务，如将 KAIA 从一个用户发送到另一个用户。

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

## 使用智能合约

### 1. 部署合同

您可以根据智能合约的应用程序二进制接口（ABI）和合约字节码来部署智能合约。

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

### 2. 撰写合同

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

### 3. 阅读合同

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

## 下一步工作

有关 Privy 的更深入指南，请参阅[Privy 文档](https://docs.privy.io/) 和[Privy Github 仓库](https://github.com/privy-io)。 此外，您还可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/privy-auth-sample) 上找到本指南的完整实现代码。