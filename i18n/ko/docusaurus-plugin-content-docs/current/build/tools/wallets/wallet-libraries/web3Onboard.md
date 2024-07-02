---
sidebar_label: Web3-Onboard
---

# Web3-Onboard를 dApp에 통합하기

![](/img/banners/kaia-web3Onboard.png)

## 소개

프로젝트와 개발자는 [Web3-Onboard](https://onboard.blocknative.com/docs/overview/introduction)와 같은 도구를 활용하여 여러 지갑을 탈중앙화 애플리케이션(dApp)에 빠르게 통합할 수 있습니다. Web3-Onboard의 도움으로 사용자 온보딩이 간소화되었습니다. Web3-Onboard는 여러 지갑 지원부터 사용자가 자신의 계정을 다른 체인이나 네트워크에 연결하고 실시간 거래 알림을 받을 수 있는 기능 등 다양한 기능을 갖추고 있습니다.

이 가이드에서는 Web3-Onboard 라이브러리를 사용해 여러 지갑(예: Coinbase Wallet, MetaMask, WalletConnect 등) 을 통합하는 방법, 즉, 카이아 네트워크에 구축한 dApp에 통합하는 방법을 설명합니다. into your dApp built on the Kaia Network.

## 전제 조건

- 작동하는 리액트 프로젝트(`npx create-react-app project-name` 실행)
- 필요한 지갑 설치([Coinbase Wallet](https://www.coinbase.com/wallet/downloads), [MetaMask](https://metamask.io/download/)).
- RPC 엔드포인트: 지원되는 [엔드포인트 공급자](../../../../references/service-providers/public-en.md) 중 하나에서 얻을 수 있습니다.
- [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 KAIA 테스트: 충분한 KAIA로 계정에 자금을 충전합니다.

## 시작하기

체인에 구애받지 않는 지갑 라이브러리인 Web3-Onboard는 모든 EVM 호환 네트워크를 지원하며, 라이브러리에 새로운 네트워크를 추가할 수 있는 유연성도 제공합니다. 이 가이드에서는 Web3-Onboard를 사용해 Kaia 메인넷과 카이아 테스트넷 Kairos를 dApp에 추가해 보겠습니다. 이제 Web3-Onboard를 사용해 다중지갑 호환성을 카이아 네트워크에 구축한 dApp에 통합해 보겠습니다.

## 온보드 및 지갑 모듈 설정

**1단계**: @web3-onboard/core 설치

```bash
npm i @web3-onboard/core 
```

**2단계**: 지갑 모듈 가져오기 및 인스턴스화

이 단계에서는 지갑 모듈을 사용하여 dApp에서 지원할 지갑을 얼마든지 추가할 수 있습니다. 하지만 이 가이드에서는 웹 3.0 온보드 구현에 Coinbase Wallet, WalletConnect, Injected Wallet을 추가할 것입니다. Web3-Onboard를 사용하여 dApp에 추가할 수 있는 지갑 모듈 목록은 이 [문서](https://onboard.blocknative.com/docs/overview/introduction#wallet-modules)를 참조하세요.

```bash
npm install @web3-onboard/coinbase // Coinbase Wallet
npm install @web3-onboard/walletconnect // WalletConnect
npm install @web3-onboard/injected-wallets  // Used to connect to Metamask
```

`App.js` 파일에서 지갑 모듈을 인스턴스화하여 dApp과 통합합니다. 각 모듈에는 폴백 JSON RPC URL이나 기본 체인 ID와 같은 고유한 옵션 매개변수를 전달할 수 있다는 점에 유의하세요.

```js
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];
```

**3단계**: ethers 설치 및 가져오기

Web3-Onboard 공급자는 [ethers.js](https://docs.ethers.org/v6/), [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html)와 같은 라이브러리와 함께 사용할 수 있습니다. 이 가이드에서는 ethers.js를 사용하여 사용자 계정 가져오기, 잔액 가져오기, 트랜잭션 서명, 트랜잭션 보내기, 스마트 컨트랙트 읽기 및 쓰기와 같은 Kaia 블록체인 호출을 수행하겠습니다.

```bash
npm install --save ethers
```

`App.js` 파일에서 다음과 같이 ethers 패키지를 임포트합니다:

```js
import { ethers } from "ethers";
```

**4단계**: Web3ReactProvider 가져오기 및 설정하기

이 단계에서는 생성된 모듈과 라이브러리와 호환될 체인 목록으로 Onboard를 인스턴스화합니다. `App.js` 파일을 열고 아래 코드를 붙여넣습니다:

```js
import Onboard from "@web3-onboard/core";
const ETH_MAINNET_RPC_URL = `Paste ETH RPC URL`;
const KAIATN_MAINNET_URL = `Paste KAIATN MAINNET URL`
const KAIATN_BAOBAB_URL = `Paste KAIATN BAOBAB URL`

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
      token: "KLAY",
      namespace: "evm",
      label: "Kaia Mainnet",
      rpcUrl: KAIATN_MAINNET_URL
    },
    {
      id: "0x3e9", // chain ID must be in hexadecimel
      token: "KLAY",
      namespace: "evm",
      label: "Kaia Testnet",
      rpcUrl: KAIATN_BAOBAB_URL
    },
   // you can add as much supported chains as possible
  ],
  appMetadata: {
    name: "Klaytn-web3-onboard-App", // change to your dApp name
    icon: "https://pbs.twimg.com/profile_images/1620693002149851137/GbBC5ZjI_400x400.jpg", // paste your icon 
    logo: "https://pbs.twimg.com/profile_images/1620693002149851137/GbBC5ZjI_400x400.jpg", // paste your logo
    description: "Web3Onboard-Klaytn",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});
```

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

**2단계**: App.js\\` 파일에서 함수를 가져옵니다.

```js
import { truncateAddress, toHex } from "./utils";
```

## 지갑 연결하기

`App.js` 파일의 앱 함수 내에서 온보드 인스턴스의 `connectWallet()` 메서드를 호출하여 온보드 팝업 모달을 시작하세요.

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

Connect Wallet 버튼을 클릭하면 dApp에서 Coinbase Wallet 및 기타 인스턴스화된 지갑에 원활하게 연결할 수 있는 모달이 표시됩니다.

![](/img/build/tools/web3-Onboard.png)

## 지갑 연결 해제하기

연결된 지갑의 연결을 끊으려면 온보드 인스턴스에서 사용자의 기본 지갑 레이블과 함께 `disconnectWallet()` 메서드를 호출하면 됩니다. 또한, 상태를 새로고침하여 이전에 저장된 연결 데이터를 지우는 것도 좋은 방법 중 하나입니다.

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

## 연결, 계정, 네트워크 정보에 액세스하기

지갑 연결에 성공하면 [onboard.state.get()](https://onboard.blocknative.com/docs/modules/core#get-current-state) 메서드를 사용해 온보드 인스턴스를 통해 저장된 연결 상태를 가져올 수 있습니다. 초기 연결 중에 상태를 가져올 수도 있습니다. 이제 connectWallet() 메서드를 수정하여 지갑 상태에 저장하고 애플리케이션 전체에서 사용할 수 있는 지갑 상태 목록을 반환할 수 있습니다.

**1단계**: React의 useState 가져오기

```js
import { useState } from 'react';
```

**2단계**: 앱 함수 내에서 코드 수정

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

## 네트워크 전환하기

사용자에게 dApp에서 네트워크를 전환하라는 메시지를 표시하기 위해 Web3-Onboard는 초기화된 온보드 인스턴스에서 `setChain` 메서드를 제공합니다. 애플리케이션을 시작할 때 대상 네트워크가 온보드 인스턴스로 초기화되어 있어야 합니다.

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

## 네이티브 트랜잭션 보내기

지갑에 성공적으로 연결한 후 지갑 연결에서 반환된 공급자 개체를 connectWallet() 함수에서 수행한 것처럼 상태 변수에 저장할 수 있습니다. 따라서 이 공급자 및 서명자 개체를 사용하여 블록체인에 트랜잭션을 전송할 수 있습니다.

```js
 // add to the existing useState hook.
  const [txHash, setTxHash] = useState();

  const sendKlay = async () => {
    
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
        <div>Send-Klay Tx Hash :  {txHash ? <a href={`https://baobab.klaytnscope.com/tx/${txHash}`} target="_blank">Klaytnscope</a> :  ' ' } </div>
    </div>
);

```

## 스마트 컨트랙트와의 상호작용

Web3-Onboard 공급자 및 서명자 개체를 사용하면 블록체인에 배포된 스마트 컨트랙트에 쓰기 및 읽기와 같은 컨트랙트 상호 작용을 할 수 있습니다.

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

## 문제 해결

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

이 오류는 웹팩 버전 5를 사용할 때 발생합니다. 이 버전에서는 NodeJS 폴리필이 더 이상 기본적으로 지원되지 않습니다. 이 문제를 해결하려면 이 [가이드](https://web3auth.io/docs/troubleshooting/webpack-issues)를 참조하세요.

## 다음 단계

Web3-Onboard에 대한 자세한 가이드는 [블록네이티브 문서](https://docs.blocknative.com/onboard) 및 [블록네이티브 GitHub 리포지토리](https://github.com/blocknative/onboard)를 참고하시기 바랍니다. Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/klaytn/examples/tree/main/tools/wallet-libraries/web3Onboard-sample).
