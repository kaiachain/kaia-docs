# Web3の統合

このセクションでは、Web3の機能をCocos Creatorプロジェクトに統合するために、トークンコントラクトを作成し、それを操作するスクリプトを記述し、ウォレット接続、トークン鋳造、残高検索のためにMini Dapp SDKを活用します。 最終的には、あなたのdAppはブロックチェーンとシームレスに相互作用し、ゲーム内でスムーズなWeb3インタラクションを可能にします。

## KIP7スマートコントラクトの作成とデプロイ<a id="creating-and-deploying-smart-contract"></a>

まず、Kaiaコントラクト・ウィザードを使ってスマート・コントラクトを生成する。

### ステップ1：カイア契約ウィザードの使用<a id="using-kaia-contract-wizard"></a>

- カイア契約ウィザードに移動します。
- KIP7（ERC20に似たカイアのトークン規格）を選択する。
- トークンを設定します：
  - 名前ExampleTestToken (または他の何か!)
  - シンボルET（あなたのトークンのティッカー）
  - プレミント100（初期トークン供給）
  - 特徴チェック ✅ 造幣可能

このガイドでは、onlyOwner修飾子を持たないようにmint関数を調整します。 そのためには、ownable.solのインポートとOwnableの継承を削除しなければならない。 手を加えたコードは次のようになるはずだ：

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
onlyOwner修飾子を削除し、オリジナルのデプロイメント者やコントラクトの所有者以外の誰でもミント関数を呼び出せるようにした。
:::

### ステップ2：Remix IDEを使ったデプロイ<a id="deploying-via-remix-ide"></a>

1. 上記のコードをコピーして、Remix IDEで新しく作成したファイルET.solに貼り付けます。
2. リミックスIDEで：
  - 契約書をコンパイルする\*\*ボタンをクリックする。
  - プラグインマネージャーで**Kaiaプラグイン**を有効にする。
  - Kaia PluginタブのEnvironmentで、**Injected Provider - Kaia Wallet**を選択します。
  - Contract\*\*ドロップダウンで契約（ExampleTokens）を検索します。
  - Deploy\*\*をクリックしてトークンを起動します！
3. カイアウォレットがポップアップしたら：
  - 配備の詳細を確認する。
  - 確認」をクリックすると、Kaia Kairos Testnetにデプロイされます。

:::note
展開された契約アドレスをコピーして保存する。 チュートリアルの後半で必要になる。
:::

## スクリプトファイルの作成<a id="creating-script-file"></a>

Web3の機能を統合するためには、ブロックチェーンのインタラクションとUI管理を処理するためのスクリプトファイルを作成する必要がある。

**1. スクリプト・フォルダの作成**」。

- プロジェクトの_assets_フォルダに移動します。
- 右クリックし、**Create → Folder** を選択します。

![](/img/minidapps/cocos-creator/cp-create-script-r.png)

- スクリプト\*\*と命名してください。

**2. Web3スクリプトファイル**の作成

scriptsフォルダの中に、2つのTypeScriptファイルを作成する：

![](/img/minidapps/cocos-creator/cp-create-typescript-r.png)

- **Web3Manager.ts** - ブロックチェーンとのやり取りを処理する。
- **UIManager.ts** - UI要素とユーザーインタラクションを管理する。

![](/img/minidapps/cocos-creator/cp-all-scripts-r.png)

プロジェクトの構成はこのようになるはずだ：

```bash
assets/
  scripts/
    Web3Manager.ts
    UIManager.ts
```

### Web3Manager.ts - ブロックチェーンのインタラクションを処理する<a id="web3manager"></a>

Web3Managerスクリプトは、ブロックチェーンに関連するすべての機能を担当する。

**主な特徴**

- SDK初期化 - Mini Dapp SDKを設定します。
- ウォレット接続 - ユーザーがウォレットを接続できるようにします。
- トークン造幣 - トークン造幣機能を有効にする。
- Balance Retrieval - ユーザーのトークン残高を取得します。

コードの実装：

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

\*\*主な機能

- initializeSDK() - ミニダップSDKを初期化します。
- connectWallet() - ウォレット接続を処理する。
- mintToken(amount) - トークンを鋳造する。
- getBalance() - トークンの残高を取得する。

スクリプトを実行する前に、以下を確認してください：

- Web3Manager.tsの**YOUR_CLIENT_ID**を置き換えてください。
- 必要に応じて**CONTRACT_ADDRESS**を更新する。
- CHAIN_ID\*\*を正しいネットワークに更新する。

### UIManager.ts - UIインタラクションを処理する<a id="ui-manager"></a>

UIManagerスクリプトは、すべてのUIコンポーネントとユーザー・インタラクションを管理する。

\*\*コードの実装

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

## ノードへのスクリプトのアタッチとUIエレメントの接続<a id="attaching-scripts-to-nodes"></a>

**1. Web3UIノードにスクリプトをアタッチする**。

- Web3UI\*\*ノードを選択します。
- Inspector\*\*で、**Add Component**をクリックします。
- を検索し、**Web3Manager**を選択します。

![](/img/minidapps/cocos-creator/cp-add-web3manager-r.png)

- 上記の手順を繰り返してUIManagerを追加します。

![](/img/minidapps/cocos-creator/cp-add-uimanager-r.png)

**2. UIエレメントを接続**する

- Web3UIを選択した状態で、インスペクタに移動します。
- 対応するUI要素を階層からそれぞれのフィールドにドラッグ＆ドロップします：
  - アドレスラベル
  - バランスラベル
  - コネクトウォレットボタン
  - ミント・ボタン

![](/img/minidapps/cocos-creator/cp-attach-node-ui-r.png)
