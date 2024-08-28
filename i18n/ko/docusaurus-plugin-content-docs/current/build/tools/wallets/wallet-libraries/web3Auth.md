---
sidebar_label: Web3Auth
---

# Web3Auth를 dApp에 통합하기

![](/img/banners/kaia-web3Auth.png)

## 소개

[Web3Auth](https://web3auth.io/docs/)는 dApp이나 지갑에 플러그인되는 지갑 인프라입니다. Web3 지갑과 애플리케이션을 위한 플러그형 인증 인프라 역할을 합니다. Web3Auth의 뛰어난 사용자 편의성을 통해 주류 및 암호화폐 네이티브 모두 단 몇 분 만에 온보딩할 수 있습니다.

지갑 인프라로서 모든 소셜 로그인, 웹 및 모바일 네이티브 플랫폼, 지갑, 기타 키 관리 방법을 즉시 지원합니다. 이 가이드가 끝날 때쯤이면, 여러분은 카이아 네트워크에 구축된 탈중앙화 웹 애플리케이션에 Web3Auth를 통합하게 될 것입니다. 다른 플랫폼(안드로이드, iOS, 리액트 네이티브, 플러터, 유니티)에 Web3Auth를 통합하려면 이 [가이드](https://web3auth.io/docs/pnp/introduction)를 참고하시기 바랍니다.

## 전제 조건

- 작동하는 리액트 프로젝트(`npx create-react-app project-name` 실행)
- 필요한 지갑 설치([Coinbase Wallet](https://www.coinbase.com/wallet/downloads), [MetaMask](https://metamask.io/download/)).
- RPC Endpoint: you can get this from one of the supported [endpoint providers](../../../../references/public-en.md).
- Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.
- [Web3Auth 대시보드](https://dashboard.web3auth.io/)에서 클라이언트 ID를 받습니다.

## 설치

dApp에서 Web3Auth를 사용하려면 먼저 필요한 라이브러리와 SDK를 설치해야 합니다. 따라서 ethers.js와 Web3Auth 웹 SDK를 설정해야 합니다. [ethers.js](https://docs.ethers.org/v6/) 또는 [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html) 라이브러리와 함께 Web3Auth를 사용하여 Kaia 블록체인과 통신할 수 있습니다. 이 가이드에서는 ethers.js를 사용하겠습니다.

```bash
npm install --save @web3auth/modal
npm install --save ethers	
```

## Web3Auth 및 공급자 인스턴스 초기화하기

필요한 라이브러리를 성공적으로 설치한 다음에는 Web3Auth 인스턴스를 초기화하고, Web3Auth 공급자 인스턴스를 useState() 훅에 설정하고, useState() 훅에 init() 함수를 설정합니다.

```js
import { Web3Auth } from "@web3auth/modal";
import { ContractFactory, ethers } from "ethers";
import { useState, useEffect } from "react";

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

useEffect(() => {

    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: "YOUR_WEB3AUTH_CLIENT_ID", // get it from Web3Auth Dashboard
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: "eip155",
	        // modify if mainnet => “0x2019”
            chainId: "0x3e9", // hex of 1001, Kaia Kairos testnet. 
            rpcTarget: "https://public-en-kairos.node.kaia.io", // modify if mainnet
            displayName: "Kaia Testnet", //  modify if mainnet
            blockExplorer: "https://baobab.klaytnscope.com", // modify if mainnet
            ticker: "KAIA",
            tickerName: "KAIA",
          },
        })
        setWeb3auth(web3auth);
        await web3auth.initModal();
        setProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };
    init();
}, []);
```

## 지갑 연결하기

`App.js` 파일의 앱 함수 내에서 web3Auth 인스턴스의 [connect()](https://web3auth.io/docs/sdk/web/no-modal/usage#logging-in-the-user) 메서드를 호출하여 지갑 연결을 시작합니다.

```js
const connectWallet = async() => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    console.log(web3authProvider);
}
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>  
    </div>
  );
```

![](/img/build/tools/web3Auth.png)

## 유틸리티 함수 설정

이 가이드에서는 유틸리티 함수인 `truncateAddress()`를 사용하겠습니다. truncateAddress() 함수는 유효한 주소를 받아 전달된 주소의 읽기 쉬운 형식으로 반환합니다. 아래 단계는 프로젝트에서 유틸리티 함수를 설정하고 사용하는 방법을 보여줍니다.

**1단계**: `src` 루트 폴더에 `utils.js` 파일을 생성합니다.

새로 만든 utils.js 파일에 다음 코드를 붙여넣습니다.

```js
export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };
```

**2단계**: `App.js` 파일에서 함수를 가져옵니다.

```js
import { truncateAddress } from "./utils";
```

## 계정 및 잔액 가져오기

Web3Auth 인스턴스에서 `connect()` 메서드를 호출하여 지갑을 성공적으로 연결했다면 공급자 및 서명자 객체를 사용하여 사용자 계정과 잔액을 가져올 수 있습니다.

```js
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

 const connectWallet = async() => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(web3authProvider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3authProvider);
    const ethersProvider = new ethers.BrowserProvider(web3authProvider);

    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address =   signer.address;

    // Get user's balance in ether
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address) // balance is in wei
    );

    setAddress(address);
    setBalance(balance);

return (
    <div className="App">
        <button onClick={connectWallet}>Connect Wallet</button>  
        <div>Wallet Address: ${truncateAddress(address)} Balance: ${balance}</div>
    </div>
  );
}
```

## 지갑 연결 해제하기

지갑과의 연결 해제는 Web3Auth 인스턴스에서 [logout()](https://web3auth.io/docs/sdk/web/no-modal/usage#logging-out-the-user) 메서드를 사용하여 수행할 수 있습니다. 또한 상태를 새로고침하여 이전에 저장된 연결 데이터를 모두 지우는 것도 좋은 방법 중 하나입니다.

```js
function App() {
    
const disconnect = async () => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
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
        <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

## 체인 전환하기

Web3Auth를 사용하여 체인을 전환하려면 먼저 [addChain()](https://web3auth.io/docs/sdk/web/no-modal/usage#add-chain) 메서드를 호출하여 연결된 어댑터에 원하는 체인 구성을 추가한 다음 [switchChain()](https://web3auth.io/docs/sdk/web/no-modal/usage#switch-chain) 메서드를 호출해야 합니다.

```js
const switchChain = async () => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  // add chain - Kaia Mainnet
  await web3auth.addChain({
    chainId: "0x2019",
    displayName: "Kaia Mainnet",
    chainNamespace: "eip155",
    tickerName: "KAIA",
    ticker: "KAIA",
    decimals: 18,
    rpcTarget: "https://public-en-cypress.klaytn.net",
    blockExplorer: "https://kaiascope.com/",
  });
  // switch chain
  await web3auth.switchChain({chainId: "0x2019"});
}


return (
    <div className="App">
    	<button  onClick={switchChain}>Switch Chain</button>
    </div>
);
```

## 사용자 정보 가져오기

Web3Auth의 고유한 기능은 소셜 로그인입니다. 사용자가 소셜 플랫폼을 사용하여 로그인하면 Web3Auth 인스턴스는 로그인한 사용자에 대한 몇 가지 정보를 반환합니다. 로그인한 사용자 정보를 가져오는 방법은 Web3Auth 인스턴스에서 getUserInfo() 메서드를 호출하는 것만큼 간단합니다.

```js
 // add to the existing useState hook.
  const [userData, setUserData] = useState({});
	
   const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    setUserData(user);
};

 return (
    <div className="App">
        <button onClick={getUserInfo}>Get User Info</button>  
        <div> { userData ? `User Email: ${userData.email}, User Name: ${userData.name}` :  ""} </div>
    </div>
  );
```

## 메시지 서명하기

공급자 및 서명자 객체를 초기화하면 사용자는 임의의 문자열에 서명할 수 있습니다.

```js
 // add to the existing useState hook.
const [signedMessage, setSignedMessage] = useState("");

const signMessage = async(e) => {
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

  const originalMessage = e.target.message.value;
  const result = await signer.signMessage(originalMessage);
  setSignedMessage(result)  
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

## 네이티브 트랜잭션 보내기

한 사용자에서 다른 사용자로 KAIA를 보내는 것과 같은 네이티브 트랜잭션을 수행할 수 있습니다.

```js
    // add to the existing useState hook.
    const [txHash, setTxHash] = useState();

    const sendKlay = async () => {
    
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
        <div>Send-Klay Tx Hash :  {txHash ? <a href={`https://baobab.klaytnscope.com/tx/${txHash}`} target="_blank">Klaytnscope</a> :  ' ' } </div>
    </div>
);

```

## 스마트 컨트랙트로 작업하기

### 1. Deploying a Contract

애플리케이션 바이너리 인터페이스(ABI)와 컨트랙트 바이트 코드가 주어지면 스마트 컨트랙트를 배포할 수 있습니다.

```js
// add to the existing useState hook.
const [contractAddress, setContractAddress] = useState(null);

const deployContract = async () => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
// this guide uses ethers version 6.3.0.
const ethersProvider = new ethers.BrowserProvider(provider);
// for ethers version below 6.3.0.
// const provider = new ethers.providers.Web3Provider(provider);

const signer =  await ethersProvider.getSigner();

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

  const contractFactory = new ContractFactory(contractABI, contractBytecode, signer);

  const contract = await contractFactory.deploy(400);
  
  // get contract address
  setContractAddress(contract.target)
}


return (
    <div className="App">
        <button onClick={deployContract}>Deploy Contract</button>  
        <div>Contract Address: {contractAddress ? contractAddress : ''} </div>
    </div>
  );
```

Web3Auth 공급자 및 서명자 개체를 사용하면 블록체인에 배포된 스마트 컨트랙트에 쓰기 및 읽기와 같은 컨트랙트 상호 작용을 할 수 있습니다.

### 2. Writing to a Contract

```js
  // add to existing useState hook
  const [contractTx, setContractTx] = useState();

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

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    const value = e.target.store_value.value;
  
    // Send a transaction to smart contract to update the value
    const tx = await contract.store(value);
  
    // Wait for the transaction to finish
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
);
```

### 3. Reading from a Contract

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
    <button onClick={readFromContract}>Read From Contract</button> 
    <div>Read-from-contract Message: ${contractMessage}</div>
  )
```

## 문제 해결

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

이 오류는 웹팩 버전 5를 사용할 때 발생합니다. 이 버전에서는 NodeJS 폴리필이 더 이상 기본적으로 지원되지 않습니다. 이 문제를 해결하려면 이 [가이드](https://web3auth.io/docs/troubleshooting/webpack-issues)를 참조하세요.

## 다음 단계

Web3Auth에 대한 자세한 가이드는 [Web3Auth 문서](https://web3auth.io/docs/connect-blockchain/klaytn) 및 [Web3Auth Github 리포지토리](https://github.com/web3auth)를 참조하세요. Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/web3Auth-sample).
