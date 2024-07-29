---
sidebar_label: Web3Modal
---

# Web3Modal을 dApp에 통합하기

![](/img/banners/kaia-web3Modal\(wc\).png)

## 소개

[Web3Modal](https://docs.walletconnect.com/2.0/web3modal/about)은 개발자가 간단하고 사용자 정의 가능한 구성으로 dApp에서 여러 공급자를 지원할 수 있도록 도와주는 사용하기 쉬운 라이브러리입니다. 지갑 연결, 트랜잭션 수행, 계정 관리를 쉽게 할 수 있습니다.

이 가이드에서는 Web3Modal 라이브러리를 사용해 Kaikas, Klip, MetaMask, Coinbase Wallet 등 여러 지갑을 카이아 네트워크에 구축한 dApp에 통합하는 방법을 설명합니다.

## 전제 조건

- 작동하는 리액트 프로젝트(`npx create-react-app 프로젝트 이름`을 실행하여)
- 필요한 지갑([Kaikas](https://app.kaikas.io/), [Coinbase Wallet](https://www.coinbase.com/wallet/downloads), [MetaMask](https://metamask.io/download/)) 설치.
- RPC Endpoint: you can get this from one of the supported [endpoint providers](../../../../references/public-en.md).
- Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.

## Web3Modal 및 지갑 공급자 옵션 설정하기

**1단계**: Web3Modal 및 이더리움 라이브러리 설치하기

블록체인과 상호작용하기 위해 Web3Modal과 원하는 라이브러리를 설치합니다. 이 튜토리얼에서는 [Web3Modal](https://github.com/WalletConnect/web3modal)에서 파생되어 Kaikas 지갑과 Klip 지갑을 추가하도록 수정된 [@klaytn/web3modal](https://github.com/WalletConnect/web3modal)을 설치하겠습니다. 또한, 이 튜토리얼에서는 ethers.js를 사용하여 Kaia 블록체인과 상호작용할 것입니다.

```bash
npm install @klaytn/web3modal
npm install --save ethers
```

**2단계**: 지갑 공급자 옵션으로 Web3Modal 인스턴스화하기

원하는 지갑 서비스 제공업체를 설치합니다. 여기서는 Kaikas, Klip 및 Coinbase 지갑 공급업체를 설치합니다.

```bash
npm install --save @coinbase/wallet-sdk
npm install --save @klaytn/kaikas-web3-provider
npm install --save @klaytn/klip-web3-provider
```

`App.js` 파일에서 CoinbaseWalletSDK, KaikasWeb3Provider, KlipWeb3Provider를 임포트하고 다양한 프로바이더 옵션을 인스턴스화하여 여러분의 dApp과 연동합니다.

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
      rpc: "https://klaytn-mainnet-rpc.allthatnode.com:8551", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1001, // Optional. It defaults to 1 if not provided
      darkMode: false // Optional. Use dark theme, defaults to false
    }
  },
  klip: {
    package: KlipWeb3Provider, //required
    options: {
        bappName: "Web3Modal Kaia dApp", //required
        rpcUrl: "https://klaytn-mainnet-rpc.allthatnode.com:8551" //required
    }
},
  kaikas: {
    package: KaikasWeb3Provider // required
  }
};
```

**3단계**: Web3Modal 인스턴스화

그런 다음 공급자 옵션을 전달하여 Web3Modal을 인스턴스화합니다.

```js
import Web3Modal from "@klaytn/web3modal";
const  web3Modal = new Web3Modal( {
    cacheProvider: true,
    providerOptions,
  } )
```

## 지갑 연결 설정하기

사용자 지갑에 연결을 설정하려면 Web3Modal 인스턴스에서 `connect()` 메서드를 호출합니다. 이 작업을 비동기 함수로 래핑하고 검색된 공급자를 상태에 저장하여 앱 전체에서 재사용하는 것이 좋습니다.

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

## 유틸리티 함수 설정

이 가이드에서는 `truncateAddress()` 및 `toHex()`와 같은 유틸리티 함수를 사용하겠습니다. `truncateAddress()` 함수는 유효한 주소를 받아 전달된 주소의 읽기 쉬운 형식을 반환합니다. 반면에 `toHex()` 함수는 숫자를 16진수로 변환합니다.  아래 단계는 프로젝트에서 유틸리티 함수를 설정하고 사용하는 방법을 보여줍니다.

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

  export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };
```

**2단계**: `App.js` 파일에서 함수를 가져옵니다.

```js
import { truncateAddress, toHex } from "./utils";
```

## 연결, 계정, 네트워크 정보에 액세스하기

현재 Web3Modal은 연결된 계정 및 네트워크 데이터 검색과 같은 이더리움 상호 작용에 대한 기본 지원을 제공하지 않습니다. 사용자의 주소나 연결된 네트워크 ID를 읽으려면 이더리움 라이브러리에 직접 해당 정보를 요청해야 합니다. 이 가이드에서는 ethers.js를 사용하여 해당 정보를 가져올 것입니다. 한 가지 방법은 사용자를 dApp에 연결할 때 이 데이터를 가져와 저장하는 것입니다.

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

## 지갑 연결 해제하기

지갑과의 연결 해제는 web3Modal 인스턴스에서 `clearCachedProvider()` 메서드를 사용하여 수행됩니다. 또한 상태를 새로 고쳐 이전에 저장된 연결 데이터를 지우는 것도 좋은 방법 중 하나입니다.

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

사용자가 상호작용할 때 dApp 상태가 변경된다는 점을 명심해야 하며, 이에 대응하여 릴리스되는 이벤트를 구독하는 것이 가장 좋습니다. 이러한 이벤트에 대한 구독으로 사용 효과 후크를 생성하여 변경 사항에 적절히 대응할 수 있도록 하세요.

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

## 네트워크 전환 또는 사용자 지정 네트워크 추가

앞서 설명한 바와 같이 Web3Modal은 이더리움 상호작용을 기본적으로 지원하지 않습니다. 네트워크를 추가하거나 전환하려면 이더리움 라이브러리에 직접 요청(EIP-3085 또는 EIP-3326을 통해)해야 합니다. 다음은 네트워크 전환을 요청하고 사용자 지갑에 해당 네트워크가 없는 경우 대체 네트워크로 추가하는 예시입니다:

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
                chainId: toHex(8217),
                chainName: "Kaia TestNet",
                rpcUrls: ["https://klaytn-mainnet-rpc.allthatnode.com:8551"],
                blockExplorerUrls: ["https://baobob.scope.com/"],
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

## 메시지 서명하기

공급자 및 서명자 객체를 초기화하면 사용자는 임의의 문자열에 서명할 수 있습니다.

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

## 네이티브 트랜잭션 보내기

한 사용자에서 다른 사용자로 KAIA를 보내는 것과 같은 네이티브 트랜잭션을 수행할 수 있습니다.

```js
    // add to the existing useState hook.
    const [txHash, setTxHash] = useState();
    const sendKlay = async () => {
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
        <div>Send-Klay Tx Hash :  {txHash ? <a href={`https://baobab.klaytnscope.com/tx/${txHash}`} target="_blank">Klaytnscope</a> :  ' ' } </div>
    </div>
);
```

## 스마트 컨트랙트로 작업하기

Web3Modal 공급자 및 서명자 개체를 사용하면 블록체인에 배포된 스마트 컨트랙트에 쓰기 및 읽기와 같은 컨트랙트 상호 작용을 할 수 있습니다.

### 1. Writing to a Contract

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

### 2. Reading from a contract

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

## 문제 해결

**Node fs error, add browser \{fs: false\} to package.json**

```bash
Node fs error, add browser {fs: false} to package.json
```

이 문제는 Klip-web3-provider를 설치할 때 발생합니다.  이 문제를 해결하려면 다음 단계를 따르세요:

**1단계**: node_modules 폴더를 열고 탐색합니다. 아래와 같이 @Klaytn/klip-web3-provider 폴더를 찾아 패키지.json 파일로 이동합니다:

> **@klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.json**

**2단계**: 아래 코드를 @klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/package.json 파일에 붙여넣습니다.

```js
"browser": {
        "fs": false
     },
```

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

이 오류는 웹팩 버전 5를 사용할 때 발생합니다. 이 버전에서는 NodeJS 폴리필이 더 이상 기본적으로 지원되지 않습니다. 이 문제를 해결하려면 이 [가이드](https://web3auth.io/docs/troubleshooting/webpack-issues)를 참조하세요.

## 다음 단계

Web3Modal에 대한 자세한 가이드는 [Web3Modal 문서](https://docs.walletconnect.com/2.0/web3modal/about) 및 [Web3Modal GitHub 리포지토리](https://github.com/WalletConnect/web3modal)를 참조하시기 바랍니다. Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/klaytn/examples/tree/main/tools/wallet-libraries/web3Modal-sample).
