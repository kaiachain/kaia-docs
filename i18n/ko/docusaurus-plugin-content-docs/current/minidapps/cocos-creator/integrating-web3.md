# Web3 통합

이 섹션에서는 토큰 컨트랙트를 만들고, 토큰과 상호작용하는 스크립트를 작성하고, 지갑 연결, 토큰 채굴, 잔액 검색을 위해 미니 댑 SDK를 활용하여 웹3 기능을 코코스 크리에이터 프로젝트에 통합해 보겠습니다. 결국, 디앱은 블록체인과 원활하게 상호 작용하여 게임 내에서 원활한 웹3.0 상호작용을 가능하게 합니다.

## KIP7 스마트 컨트랙트 생성 및 배포 <a id="creating-and-deploying-smart-contract"></a>

먼저 Kaia 컨트랙트 마법사를 사용하여 스마트 컨트랙트를 생성합니다.

### 1단계: Kaia 계약 마법사 사용하기 <a id="using-kaia-contract-wizard"></a>

- Kaia 계약 마법사로 이동합니다.
- KIP7(ERC20과 유사한 Kaia의 토큰 표준)을 선택합니다.
- 토큰을 구성합니다:
  - Name: 예제 토큰 (또는 다른 이름!)
  - 심볼: ET(토큰 시세)
  - 프리프린트: 100 (초기 토큰 공급량)
  - 특징: 체크 ✅ 민테이블

이 가이드에서는 소유자 수정자만 갖지 않도록 민트 함수를 조정하겠습니다. 이렇게 하려면 ownable.sol 가져오기 및 소유 가능 상속을 제거해야 합니다. 이제 조정된 코드는 다음과 같이 보일 것입니다:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
contract ExampleTokens is KIP7 {
    constructor() KIP7("ExampleTokens", "ET") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
    function mint(uint256 amount) public  {
        _mint(msg.sender, amount);
    }
}
```

:::info
원래 배포자나 컨트랙트의 소유자 외에는 누구나 민트 함수를 호출할 수 있도록 유일한 소유자 수정자를 제거했습니다.
:::

### 2단계: Remix IDE를 통한 배포 <a id="deploying-via-remix-ide"></a>

1. 위의 코드를 복사하여 Remix IDE에서 새로 생성한 ET.sol 파일에 붙여넣습니다.
2. Remix IDE에서:
   - 계약 컴파일\*\* 버튼을 클릭합니다.
   - 플러그인 관리자에서 **Kaia 플러그인**을 활성화합니다.
   - Kaia 플러그인 탭의 환경 아래에서 **인젝션된 공급자 - Kaia 월렛**을 선택합니다.
   - 컨트랙트\*\* 드롭다운에서 컨트랙트(예시 토큰)를 찾습니다.
   - 토큰을 배포하려면 **배포**를 클릭하세요!
3. Kaia 지갑이 나타나면:
   - 배포 세부 정보를 검토합니다.
   - 확인을 클릭하여 Kaia Kairos 테스트넷에 배포합니다.

:::note
배포된 계약 주소를 복사하여 저장합니다. 튜토리얼의 뒷부분에 필요하게 될 것입니다.
:::

## 스크립트 파일 만들기 <a id="creating-script-file"></a>

Web3 기능을 통합하려면 블록체인 상호작용과 UI 관리를 처리하기 위한 스크립트 파일을 만들어야 합니다.

**1. 스크립트 폴더 만들기**

- 프로젝트의 _assets_ 폴더로 이동합니다.
- 마우스 오른쪽 버튼을 클릭하고 **만들기 → 폴더**를 선택합니다.

![](/img/minidapps/cocos-creator/cp-create-script-r.png)

- 이름을 **스크립트**로 지정합니다.

**2. Web3 스크립트 파일 생성**

스크립트 폴더 안에 두 개의 TypeScript 파일을 만듭니다:

![](/img/minidapps/cocos-creator/cp-create-typescript-r.png)

- **Web3Manager.ts** - 블록체인 상호작용을 처리합니다.
- **UIManager.ts** - UI 요소와 사용자 상호작용을 관리합니다.

![](/img/minidapps/cocos-creator/cp-all-scripts-r.png)

이제 프로젝트 구조가 다음과 같이 보일 것입니다:

```bash
assets/
  scripts/
    Web3Manager.ts
    UIManager.ts
```

### Web3Manager.ts - 블록체인 상호작용 처리하기 <a id="web3manager"></a>

Web3Manager 스크립트는 모든 블록체인 관련 기능을 담당합니다.

**주요 기능**

- SDK 초기화 - 미니 디앱 SDK를 설정합니다.
- 지갑 연결 - 사용자가 지갑을 연결할 수 있습니다.
- 토큰 발행 - 토큰 발행 기능을 활성화합니다.
- 잔액 검색 - 사용자의 토큰 잔액을 가져옵니다.

코드 구현:

```typescript
import { _decorator, Component, Node, director, EventTarget, sys } from 'cc'
const { ccclass, property } = _decorator
// Global event bus for Web3 events
export const web3Events = new EventTarget()
@ccclass('Web3Manager')
export class Web3Manager extends Component {
  private static instance: Web3Manager = null
  private sdk: any = null
  private connectedAddress: string = ''

  // Configuration
  private readonly CONTRACT_ADDRESS =
    '0xbe9b8eB864F7E363ee834054e4391fb9b4e69B90' // REPLACE CONTRACT ADDRESS
  private readonly CHAIN_ID = '1001'
  private readonly CLIENT_ID = 'PASTE CLIENT ID'
  onLoad() {
    if (Web3Manager.instance === null) {
      Web3Manager.instance = this
      director.addPersistRootNode(this.node)
      this.initializeSDK()
      this.tryRestoreSession()
    } else {
      this.node.destroy()
    }
  }
  private async initializeSDK(): Promise<boolean> {
    try {
      // @ts-ignore
      this.sdk = await window.DappPortalSDK.init({
        clientId: this.CLIENT_ID,
        chainId: this.CHAIN_ID,
      })
      console.log('SDK initialized successfully')
      web3Events.emit('sdkInitialized')
      return true
    } catch (error) {
      console.error('SDK initialization error:', error)
      web3Events.emit('sdkInitError', error.message)
      return false
    }
  }
  private async tryRestoreSession() {
    const savedAddress = sys.localStorage.getItem('connectedAddress')
    if (savedAddress) {
      this.connectedAddress = savedAddress
      web3Events.emit('walletConnected', this.connectedAddress)
      this.getBalance()
    }
  }
  public async connectWallet(): Promise<void> {
    try {
      if (!this.sdk) {
        const initialized = await this.initializeSDK()
        if (!initialized) return
      }
      const provider = this.sdk.getWalletProvider()
      const accounts = await provider.request({
        method: 'kaia_requestAccounts',
      })
      if (accounts && accounts.length > 0) {
        this.connectedAddress = accounts[0]
        sys.localStorage.setItem('connectedAddress', this.connectedAddress)
        web3Events.emit('walletConnected', this.connectedAddress)
        this.getBalance()
      }
    } catch (error) {
      console.error('Wallet connection error:', error)
      web3Events.emit('walletError', error.message)
    }
  }
  public async mintToken(amount: number): Promise<void> {
    try {
      if (!this.connectedAddress) {
        throw new Error('Wallet not connected')
      }

      const provider = this.sdk.getWalletProvider()
      const mintSignature = '0xa0712d68'
      // @ts-ignore
      const amountHex = amount.toString(16).padStart(64, '0')
      const data = mintSignature + amountHex

      const tx = {
        from: this.connectedAddress,
        to: this.CONTRACT_ADDRESS,
        value: '0x0',
        data: data,
        gas: '0x4C4B40',
      }

      const txHash = await provider.request({
        method: 'kaia_sendTransaction',
        params: [tx],
      })

      // After getting txHash, immediately update balance
      web3Events.emit('mintSuccess', txHash)
      await this.getBalance() // Get updated balance right after minting
    } catch (error) {
      console.error('Minting error:', error)
      web3Events.emit('mintError', error.message)
    }
  }
  public async getBalance(): Promise<void> {
    try {
      if (!this.connectedAddress) {
        throw new Error('Wallet not connected')
      }
      const provider = this.sdk.getWalletProvider()
      const balanceSignature = '0x70a08231'
      // @ts-ignore
      const addressParam = this.connectedAddress.substring(2).padStart(64, '0')
      const data = balanceSignature + addressParam
      const result = await provider.request({
        method: 'kaia_call',
        params: [
          {
            from: this.connectedAddress,
            to: this.CONTRACT_ADDRESS,
            data: data,
          },
          'latest',
        ],
      })
      const balance = parseInt(result, 16)
      web3Events.emit('balanceReceived', balance.toString())
    } catch (error) {
      console.error('Balance fetch error:', error)
      web3Events.emit('balanceError', error.message)
    }
  }
  public getConnectedAddress(): string {
    return this.connectedAddress || ''
  }
}
```

**주요 기능**

- initializeSDK() - 미니 댑 SDK를 초기화합니다.
- connectWallet() - 지갑 연결을 처리합니다.
- mintToken(amount) - 민트 토큰을 발행합니다.
- getBalance() - 토큰 잔액을 검색합니다.

스크립트를 실행하기 전에 다음 사항을 확인하세요:

- Web3Manager.ts에서 **YOUR_CLIENT_ID**를 대체합니다.
- 필요한 경우 **계약_주소**를 업데이트합니다.
- 올바른 네트워크에 맞게 **CHAIN_ID**를 업데이트합니다.

### UIManager.ts - UI 상호작용 처리하기 <a id="ui-manager"></a>

UIManager 스크립트는 모든 UI 구성 요소와 사용자 상호 작용을 관리합니다.

**코드 구현:**

```typescript
import { _decorator, Component, Node, Label, Button } from 'cc'
import { Web3Manager, web3Events } from './Web3Manager'
const { ccclass, property } = _decorator
@ccclass('UIManager')
export class UIManager extends Component {
  @property(Label)
  addressLabel: Label = null
  @property(Label)
  balanceLabel: Label = null
  @property(Button)
  connectButton: Button = null
  @property(Button)
  mintButton: Button = null
  private web3Manager: Web3Manager = null
  start() {
    this.web3Manager = this.getComponent(Web3Manager)
    this.updateUIState(false)
    this.setupEventListeners()
    this.setupButtonHandlers()
  }
  private setupEventListeners() {
    web3Events.on('sdkInitialized', this.onSDKInitialized, this)
    web3Events.on('walletConnected', this.onWalletConnected, this)
    web3Events.on('balanceReceived', this.onBalanceReceived, this)
    web3Events.on('mintSuccess', this.onMintSuccess, this)
    web3Events.on('walletError', this.onError, this)
    web3Events.on('mintError', this.onError, this)
    web3Events.on('balanceError', this.onError, this)
  }
  private setupButtonHandlers() {
    this.connectButton.node.on('click', this.onConnectClick, this)
    this.mintButton.node.on('click', this.onMintClick, this)
  }
  onDestroy() {
    web3Events.off('sdkInitialized', this.onSDKInitialized, this)
    web3Events.off('walletConnected', this.onWalletConnected, this)
    web3Events.off('balanceReceived', this.onBalanceReceived, this)
    web3Events.off('mintSuccess', this.onMintSuccess, this)
    web3Events.off('walletError', this.onError, this)
    web3Events.off('mintError', this.onError, this)
    web3Events.off('balanceError', this.onError, this)
  }
  private updateUIState(isConnected: boolean) {
    if (this.connectButton) {
      this.connectButton.node.active = !isConnected
    }
    if (this.mintButton) {
      this.mintButton.interactable = isConnected
    }
    if (this.addressLabel) {
      this.addressLabel.node.active = isConnected
    }
    if (this.balanceLabel) {
      this.balanceLabel.node.active = isConnected
    }
  }
  async onConnectClick() {
    await this.web3Manager.connectWallet()
  }
  async onMintClick() {
    await this.web3Manager.mintToken(1) // Mint 1 token as example
  }
  onSDKInitialized() {
    console.log('SDK initialized')
  }
  onWalletConnected(address: string) {
    this.updateUIState(true)
    if (this.addressLabel) {
      this.addressLabel.string = `Connected: ${address.substring(
        0,
        6
      )}...${address.substring(address.length - 4)}`
    }
  }
  onBalanceReceived(balance: string) {
    if (this.balanceLabel) {
      this.balanceLabel.string = `Balance: ${balance}`
      console.log('Balance updated:', balance) // Add this to debug
    }
  }
  onMintSuccess(txHash: string) {
    console.log(`Mint successful! TX: ${txHash}`)
    // The balance update will happen automatically because we called getBalance() in mintToken
  }
  onError(error: string) {
    console.error('Error:', error)
  }
}
```

## 노드에 스크립트 첨부 및 UI 요소 연결하기 <a id="attaching-scripts-to-nodes"></a>

**1. Web3UI 노드에 스크립트 첨부**

- Web3UI\*\* 노드를 선택합니다.
- 검사기\*\*에서 **컴포넌트 추가**를 클릭합니다.
- Web3Manager\*\*를 검색하여 선택합니다.

![](/img/minidapps/cocos-creator/cp-add-web3manager-r.png)

- 위 단계를 반복하여 UIManager를 추가합니다.

![](/img/minidapps/cocos-creator/cp-add-uimanager-r.png)

**2. UI 요소 연결**

- Web3UI를 선택한 상태에서 인스펙터로 이동합니다.
- 계층 구조에서 해당 UI 요소를 각 필드로 끌어다 놓습니다:
  - 주소 레이블
  - 밸런스 라벨
  - 지갑 연결 버튼
  - 민트 버튼

![](/img/minidapps/cocos-creator/cp-attach-node-ui-r.png)
