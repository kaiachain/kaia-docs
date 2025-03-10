# Web3 Integration

In this section, we'll integrate Web3 functionality into our Cocos Creator project by creating a token contract, writing scripts to interact with it, and leveraging the Mini Dapp SDK for wallet connections, token minting, and balance retrieval. By the end, your dApp will seamlessly interact with the blockchain, enabling smooth Web3 interactions within your game.

## Creating and deploying KIP7 smart contract <a id="creating-and-deploying-smart-contract"></a>

First, we'll use Kaia Contract Wizard to generate our smart contract.

### Step 1: Using Kaia Contract Wizard <a id="using-kaia-contract-wizard"></a>

- Navigate to Kaia Contract Wizard.
- Select KIP7 (Kaia's token standard, similar to ERC20).
- Configure your token:
  - Name: ExampleTestToken (or something else!)
  - Symbol: ET (your token's ticker)
  - Premint: 100 (initial token supply)
  - Features: Check ✅ Mintable

For this guide, we will tweak the mint function not to have onlyOwner modifier. To do this, we have to remove the ownable.sol import, and Ownable inheritance. The tweaked code should now look like this:

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
We removed the onlyOwner modifier to allow anyone to call the mint function other than the original deployer or owner of the contract.
:::

### Step 2: Deploying via Remix IDE <a id="deploying-via-remix-ide"></a>

1. Copy and paste the code above in a newly created file ET.sol on Remix IDE.
2. In Remix IDE:
   - Click the **Compile contract** button.
   - Activate the **Kaia plugin** in the plugin manager.
   - Under Environment in the Kaia Plugin tab, choose **Injected Provider - Kaia Wallet**.
   - Find your contract (ExampleTokens) in the **Contract** dropdown.
   - Click **Deploy** to launch your token!
3. When your Kaia Wallet pops up:
   - Review the deployment details.
   - Click Confirm to deploy to Kaia Kairos Testnet.

:::note
Copy and save the deployed contract address. You'll need it later in the tutorial.
:::

## Creating Script Files <a id="creating-script-file"></a>

To integrate Web3 functionality, we need to create script files for handling blockchain interactions and UI management.

**1. Create a Scripts Folder**

- Navigate to your project's _assets_ folder.
- Right-click and select **Create → Folder**

![](/img/minidapps/cocos-creator/cp-create-script-r.png)

- Name it **scripts**.

**2. Create Web3 Script Files**

Inside the scripts folder, create two TypeScript files:

![](/img/minidapps/cocos-creator/cp-create-typescript-r.png)

- **Web3Manager.ts** - Handles blockchain interactions.
- **UIManager.ts** - Manages UI elements and user interactions.

![](/img/minidapps/cocos-creator/cp-all-scripts-r.png)

Your project structure should now look like this:

```bash
assets/
  scripts/
    Web3Manager.ts
    UIManager.ts
```

### Web3Manager.ts - Handling Blockchain Interactions <a id="web3manager"></a>

The Web3Manager script is responsible for all blockchain-related functionality.

**Key Features**

- SDK Initialization - Sets up the Mini Dapp SDK.
- Wallet Connection - Allows users to connect their wallets.
- Token Minting - Enables token minting functionality.
- Balance Retrieval - Fetches the user's token balance.

Code Implementation:

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

**Key Functions**

- initializeSDK() - Initializes the Mini Dapp SDK.
- connectWallet() - Handles wallet connection.
- mintToken(amount) - Mints tokens.
- getBalance() - Retrieves token balance.

Before running your script, ensure you:

- Replace **YOUR_CLIENT_ID** in Web3Manager.ts.
- Update **CONTRACT_ADDRESS** if needed.
- Update **CHAIN_ID** for the correct network.

### UIManager.ts - Handling UI Interactions <a id="ui-manager"></a>

The UIManager script manages all UI components and user interactions.

**Code Implementation:**

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

## Attaching Scripts to Nodes & Connecting UI Elements <a id="attaching-scripts-to-nodes"></a>

**1. Attach Scripts to the Web3UI Node**

- Select the **Web3UI** node.
- In the **Inspector**, click **Add Component**.
- Search for and select **Web3Manager**.

![](/img/minidapps/cocos-creator/cp-add-web3manager-r.png)

- Repeat the steps above to add UIManager.

![](/img/minidapps/cocos-creator/cp-add-uimanager-r.png)

**2. Connect UI Elements**

- With Web3UI selected, go to the Inspector.
- Drag and drop the corresponding UI elements from the Hierarchy into their respective fields:
  - AddressLabel
  - BalanceLabel
  - Connect Wallet Button
  - Mint Button

![](/img/minidapps/cocos-creator/cp-attach-node-ui-r.png)
