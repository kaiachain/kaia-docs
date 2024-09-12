---
sidebar_label: Particle Network
---

# Particle Network를 dApp에 통합하기

![](/img/banners/kaia-particle.png)

## 소개

[Particle Network](https://particle.network)'s Wallet Abstraction services enable universal, Web2-adjacent onboarding and interactions. Its core technology, [Smart Wallet-as-a-Service](https://blog.particle.network/announcing-our-smart-wallet-as-a-service-modular-stack-upgrading-waas-with-erc-4337) (WaaS) aims to onboard users into MPC-secured smart accounts supporting any chain. It also allows developers to offer an improved user experience through modular, fully customizable EOA/AA embedded wallets. Particle supports its Smart Wallet-as-a-Service through a Modular L1 powering chain abstraction, acting as a settlement layer across chains for a seamless multi-chain experience.

개발자는 모바일과 데스크톱 플랫폼 모두에서 사용할 수 있는 API와 SDK를 통해 다양한 시나리오에 걸쳐 Particle의 서비스형 월렛을 통합할 수 있으며, 특정 애플리케이션의 특정 요구 사항에 맞는 방식으로 맞춤화 및 구현할 수 있습니다.

To leverage Particle Network on alternative platforms, such as Android, iOS, React Native, Flutter, & Unity, kindly refer to Particle’s [documentation](https://developers.particle.network/reference/introduction-to-api-sdk-reference).

## 전제 조건

- 실행 중인 리액트 프로젝트(`npx create-react-app project-name`을 실행하여).
- [Particle 대시보드](https://dashboard.particle.network)의 프로젝트 ID, 클라이언트 키, 앱 ID.
- [WalletConnect 대시보드](https://cloud.walletconnect.com/)의 WalletConnect 프로젝트 ID.

## 설치

디앱에서 Particle Network, 특히 Particle 커넥트를 활용하려면 먼저 필요한 라이브러리를 설치해야 합니다. 이 외에도 [ethers.js](https://docs.ethers.org/v6/) 또는 [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html)와 같은 표준 Web3 라이브러리를 사용하려면 테마도 설치해야 합니다. 이 가이드에서는 ethers.js를 사용하겠습니다.

```bash
npm install --save @particle-network/connectkit
npm install --save @particle-network/chains
npm install --save @particle-network/connectors
npm install --save ethers	
```

## Particle 커넥트 초기화

앞서 언급한 라이브러리를 성공적으로 설치했다면, `index.js`(또는 `.ts`) 파일로 이동하여 Particle 커넥트를 구성해야 합니다. 이를 위해서는 `App` 컴포넌트를 `ModalProvider`(`@particle-network/connectkit`에서 임포트)로 래핑하고 아래에 설명된 파라미터가 포함된 `옵션`을 전달해야 합니다.

```js
import { ModalProvider } from '@particle-network/connectkit';
import { Klaytn, KlaytnTestnet } from '@particle-network/chains';
import { evmWallets } from '@particle-network/connectors';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ModalProvider
            options={{
                projectId: 'replace with your projectId',
                clientKey: 'replace with your clientKey',
                appId: 'replace with your appId',
                chains: [
                    KlaytnTestnet, Klaytn
                ],
                wallet: {    // optional: Wallet modal configuration
                    visible: true, // Display wallet modal
                    supportChains:[
                        KlaytnTestnet, Klaytn
                    ],
                    customStyle: {}, // optional: Custom wallet style
                },
                promptSettingConfig: { // optional: particle security account config
                    // Prompt to set payment password upon social login. 0: None, 1: Once(default), 2: Always
                    promptPaymentPasswordSettingWhenSign: 1,
                    // Prompt to set master password upon social login. 0: None(default), 1: Once, 2: Always
                    promptMasterPasswordSettingWhenLogin: 1
                },
                connectors: evmWallets({ 
                    projectId: 'replace with your walletconnect projectId',
                    showQrModal: false
                 }),
            }}
            theme={'light'}
            language={'en'}   // optional：Local language setting, default en
            walletSort={['Particle Auth', 'Wallet']} // optional：Order of wallet categories
        >
            <App />
        </ModalProvider>
    </React.StrictMode>
);
```

## 월렛 연결하기

`index.js` 파일 설정이 완료되면, 중앙의 "Connect Wallet" 버튼을 통해 사용자를 연결할 수 있습니다. 이렇게 하려면 `@particle-network/connectkit`에서 `ConnectButton`을 해당 CSS와 함께 가져오면 됩니다. `App` 컴포넌트 내에서 `ConnectButton`을 사용하면 연결을 용이하게 하는 표준 "Connect Wallet" 버튼이 나타납니다.

```js
import '@particle-network/connectkit/dist/index.css';
import { ConnectButton } from '@particle-network/connectkit';

export const App = () => {
	return <ConnectButton />;
};
```

## 계정 및 잔액 가져오기

이제 `ConnectButton`을 통해 지갑이 성공적으로 연결되었으므로 연결된 사용자의 카이아 주소를 조회할 수 있습니다. 또한, `@particle-network/connectkit` 내의 `useParticleProvider`에서 검색한 해당 EIP-1193 공급자 객체를 전달하여 ethers.js를 통해 현재 잔액(KLAY)을 검색할 수 있습니다.

```js
import { useParticleProvider } from '@particle-network/connectkit';

const provider = useParticleProvider();

const [address, setAddress] = useState("");
const [balance, setBalance] = useState("");

const getWalletAndBalance = async() => {
	// this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3authProvider);

    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.address;

    // Get user's balance in ether
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address) // balance is in wei
    );

    setAddress(address);
    setBalance(balance);

return (
    <div className="App">
        <button onClick={getWalletAndBalance}>Get Wallet Account and Balance</button>  
        <div>Wallet Address: ${address} Balance: ${balance}</div>
    </div>
  );
}
```

## 지갑 연결 끊기

사용자가 로그인하면 `useParticleConnect`에서 파생된 `disconnect`를 통해 프로그래밍 방식으로 로그아웃을 강제할 수 있습니다. 이렇게 하면 현재 활성 상태인 세션이 디앱에서 분리되어 사용자가 초기 상태로 돌아갑니다.

```js
import { useParticleConnect } from '@particle-network/connectkit';

const { disconnect } = useParticleConnect();

function App() {
    
const disconnectUser = async () => {
  await disconnect();
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
        <button onClick={disconnectUser}>Disconnect</button>
    </div>
  );
}
```

## 사용자 정보 가져오기

기존 웹3 지갑은 Particle 커넥트를 통한 연결 메커니즘으로 제공되지만, 이메일 주소, 구글 계정, 전화번호 등과 같은 소셜 계정을 통한 소셜 로그인도 가능합니다. 사용자가 Web2 계정으로 로그인하기로 결정한 경우, `@particle-network/auth-core`에서 `getUserInfo`를 호출하면 이름, 이메일, 지갑 주소 등 주요 세부 정보가 포함된 객체를 반환할 수 있습니다.

```js
import  { getUserInfo }  from  '@particle-network/auth-core';

const [userData, setUserData] = useState({});
	
const getUserInfo = async () => {
    const user = getUserInfo();
    setUserData(user);
};

return (
    <div className="App">
        <button onClick={getUserInfo}>Get User Info</button>  
        <p> User Email: { userData ? ` ${userData.google_email}` :  "Nil"} </p>
    </div>
  );
```

## 메시지 서명

공급자가 초기화되고(`useParticleProvider`를 통해) ethers.js 인스턴스에 전달되면 `signer.signMessage`를 통해 평소와 같이 메시지 서명을 시작할 수 있으며, 사용자가 확인할 수 있도록 서명 팝업이 직접 표시됩니다. 그 구체적인 성격은 사용자가 선택한 연결 메커니즘에 따라 달라집니다.

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

`signer.signMessage`와 마찬가지로 동일한 공급자 메커니즘을 사용하여 네이티브 트랜잭션을 보낼 수 있으며, 이 경우 KAIA를 사용할 수 있습니다. 이는 `signer.sendTransaction`을 통해 `to`, `value` 등과 같은 표준 필드를 전달하여 수행할 수 있습니다.

```js
    // add to the existing useState hook.
    const [txHash, setTxHash] = useState();

    const sendKaia = async () => {
    
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
        <div>Send-Kaia Tx Hash :  {txHash ? <a href={`https://kairos.kaiascope.com/tx/${txHash}`} target="_blank">Kaiascope</a> :  ' ' } </div>
    </div>
);

```

## 스마트 컨트랙트 작업하기

### 1. Deploying a Contract

외부 Web3 지갑을 사용하든, 포함된 소셜 로그인 임베디드 지갑을 사용하든, Particle을 통해 컨트랙트 배포와 같은 더 복잡한 트랜잭션도 가능합니다. 이에 대한 예시는 아래와 같습니다.

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

이와 유사하게, `useParticleProvider`에서 파생된 Particle 연결 공급자를 활용하여 동일한 ethers.js 인스턴스를 사용하여 기존(배포된) 컨트랙트에 직접 쓰기 트랜잭션을 보낼 수 있습니다. 프론트엔드에서 이 기능은 컨트랙트 배포, 메시지 서명 또는 트랜잭션 요청의 기능을 모방합니다.

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

지갑 자체를 사용하지 않고 순수하게 공급자만 사용하면 표준 ethers.js 인스턴스를 통해 컨트랙트에서 읽기 전용 메서드를 호출할 수 있습니다. 이 메커니즘은 이러한 작업과 관련된 일반적인 구조에서 벗어나지 않으며, 여기서 가장 큰 차이점은 통합된 `provider` 객체를 사용한다는 것입니다.

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

## 다음 단계

For additional guides regarding Particle Network (Particle Connect, Particle Auth, and other SDKs), please refer to the [Particle Network docs](https://developers.particle.network) and the [Particle Network GitHub account](https://github.com/Particle-Network). 또한, Particle Network의 서비스, 향후 릴리스 및 기술 스택에 대한 자세한 내용은 [Particle Network 블로그](https://blog.particle.network)를 참조하시기 바랍니다. Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/wallet-libraries/particle-sample).
