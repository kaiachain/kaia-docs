---
sidebar_label: Privy
---

# 將 Privy 整合到 dApp 中

![](/img/banners/kaia-privy.png)

## 導言

[Privy](https://docs.privy.io/)是一個簡單的錢包工具包，用於在 web3 中進行漸進式身份驗證。 有了 Privy，開發人員可以使用傳統和 web3 身份驗證方法登錄用戶，實現漸進式登錄，提高用戶轉化率。

在本指南中，您將使用 Privy 錢包工具包將 Metamask、Coinbase Wallet 等外部錢包以及 Google、Twitter、Email 等社交登錄信息整合到您在 Kaia 網絡上構建的 dApp 中。

## 先決條件

- 一個正在運行的 Next.js 項目。 您可以克隆 Privy 提供的 [create-next-app](https://github.com/privy-io/create-next-app) 模板來學習本教程。
- 來自[Privy 開發者控制檯](https://console.privy.io/)的[應用程序ID](https://docs.privy.io/guide/console/api-keys#app-id)

## 開始

克隆模板是一個簡單的 Next.js Privy Auth 入門模板，包含三個主要核心文件：

- **index.tsx**：該文件處理用戶的登錄驗證。
- **app.tsx**：該文件處理 Privy SDK 的初始化，並用 PrivyProvider 封裝我們的組件。
- **dashboard.tsx**：這是用戶登錄後重定向到的頁面。 它可以測試每種登錄方法（谷歌、Twitter、電子郵件、錢包）。 對於本指南來說，更重要的是，我們將在使用 MetaMask 等外部錢包連接時執行某些功能。 這些功能包括：獲取用戶餘額、向另一個賬戶發送 KAIA、部署合約、與智能合約交互。

## 安裝

要在 dApp 中使用 Privy，必須先安裝所需的庫和 SDK。 因此，您需要設置 ethers.js，以及 [Privy React Auth SDK](https://www.npmjs.com/package/@privy-io/react-auth)。 您可以將 Privy 與 [etherthers.js](https://docs.ethers.org/v6/)、[web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html)、[viem](https://viem.sh/) 庫一起使用，與 Kaia 區塊鏈進行通信。 在本指南中，我們將使用 ethers.js 庫。

打開項目文件夾，運行下面的命令安裝所需的庫和 SDK：

```bash
npm install —save @privy-io/react-auth
npm install --save ethers
```

## 初始化特權和特權提供程序

成功安裝所需的庫後，接下來就是用[PrivyProvider](https://docs.privy.io/reference/react-auth/modules#privyprovider)來封裝組件。

PrivyProvider 應封裝任何將使用 Privy SDK 的組件。 為此，請打開 _app.tsx 文件並粘貼下面的代碼：

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

值得注意的是，特權提供者具有以下屬性：

- 您的 `appID` 需要在 .env 文件中更新。 您可以使用 Privy 為測試目的提供的以下 "測試應用程序 ID：clpispdty00ycl80fpueukbhl "開始使用。
- 一個可選的 `onSuccess` 回調，用戶成功登錄後執行該回調。
- 一個可選的 "createPrivyWalletOnLogin "布爾值，用於配置是否希望用戶在登錄時創建嵌入式錢包。
- 可選配置屬性，用於自定義上機體驗。

## 連接錢包

在 `index.tsx` 文件的 LoginPage 函數中，調用 [login](https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface#login) 方法，打開 Privy 登錄模態，提示用戶登錄。

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

## 獲取賬戶和餘額

通過上面的步驟，你會發現我們是通過連接錢包登錄的。 在這一步中，我們將檢索用戶的相關 Kaia 地址。 此外，您還可以使用 ethers.js 檢索其當前餘額（以 KAIA 為單位）。

在 dashboard.tsx 文件中，粘貼以下代碼：

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

## 斷開錢包連接

斷開錢包
用戶登錄後，可以通過從 usePrivy 派生的 `logout` 方法以編程方式註銷用戶。 這將斷開當前活動會話與 dApp 的連接，使用戶返回初始狀態。

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

## 獲取用戶信息

Privy 為用戶提供了使用 web3 錢包和社交登錄連接到 dApp 的便利。 如果用戶使用自己的社交賬戶（如 twitter、discord、谷歌賬戶等）連接到 dApp，您就可以從 `usePrivy` 中調用 `user`，這會返回一個包含用戶 ID、電子郵件、錢包地址等關鍵信息的對象。

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

## 發送本地事務

您可以執行本地事務，如將 KAIA 從一個用戶發送到另一個用戶。

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

## 使用智能合約

### 1. 部署合同

您可以根據智能合約的應用程序二進制接口（ABI）和合約字節碼來部署智能合約。

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

### 2. 撰寫合同

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

### 3. 閱讀合同

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

有關 Privy 的更深入指南，請參閱[Privy 文檔](https://docs.privy.io/) 和[Privy Github 倉庫](https://github.com/privy-io)。 此外，您還可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/privy-auth-sample) 上找到本指南的完整實現代碼。