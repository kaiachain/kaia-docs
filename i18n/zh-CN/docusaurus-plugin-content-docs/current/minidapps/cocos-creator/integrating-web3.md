# 将 Web3 整合到 Cocos Creator 项目中

在本节中，我们将通过创建代币合约、编写与之交互的脚本以及利用 DApp Portal SDK 进行钱包连接、代币铸造和余额检索，把 Web3 功能集成到我们的 Cocos Creator 项目中。 最后，您的 dApp 将与区块链无缝互动，在游戏中实现流畅的 Web3 互动。

## 创建和部署 KIP7 智能合约<a id="creating-and-deploying-smart-contract"></a>

首先，我们使用 Kaia Contract Wizard 生成智能合约。

### 步骤 1：使用 Kaia 合同向导<a id="using-kaia-contract-wizard"></a>

- 导航至 Kaia 合同向导。
- 选择 KIP7（Kaia 的令牌标准，类似于 ERC20）。
- 配置您的令牌：
  - 名称：名称： ExampleTestToken（或其他名称）
  - 符号：ET（您的代币代码）
  - Premint：100（初始代币供应）
  - 特点检查 ✅ 可造币

在本指南中，我们将调整 mint 函数，使其不包含 onlyOwner 修饰符。 为此，我们必须删除 ownable.sol 导入和 Ownable 继承。 调整后的代码现在应该是这样的：

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
我们删除了 onlyOwner 修改器，以允许除原始部署者或合同所有者之外的任何人调用铸币厂函数。
:::

### 步骤 2：通过 Remix IDE 进行部署<a id="deploying-via-remix-ide"></a>

1. 将上述代码复制并粘贴到 Remix IDE 上新建的文件 ET.sol。
2. 在 Remix IDE 中：
  - 点击**编译合同**按钮。
  - 在插件管理器中激活 **Kaia 插件**。
  - 在 Kaia 插件选项卡的环境下，选择 \*\* 注入提供程序 - Kaia 钱包\*\*。
  - 在**合同**下拉菜单中找到您的合同（ExampleTokens）。
  - 点击 **部署**，启动令牌！
3. 当你的 Kaia 钱包弹出时：
  - 查看部署详情。
  - 单击 "确认 "将其部署到 Kaia Kairos Testnet。

:::note
复制并保存已部署的合同地址。 稍后的教程中会用到它。
:::

## 创建脚本文件<a id="creating-script-file"></a>

要集成 Web3 功能，我们需要创建脚本文件，用于处理区块链交互和用户界面管理。

**1. 创建脚本文件夹**

- 导航至项目的 _assets_ 文件夹。
- 右键单击并选择 \*\* 创建 → 文件夹\*\*

![](/img/minidapps/cocos-creator/cp-create-script-r.png)

- 将其命名为**脚本**。

**2. 创建 Web3 脚本文件**

在脚本文件夹中，创建两个 TypeScript 文件：

![](/img/minidapps/cocos-creator/cp-create-typescript-r.png)

- **Web3Manager.ts** - 处理区块链交互。
- **UIManager.ts** - 管理用户界面元素和用户交互。

![](/img/minidapps/cocos-creator/cp-all-scripts-r.png)

现在您的项目结构应该是这样的

```bash
assets/
  scripts/
    Web3Manager.ts
    UIManager.ts
```

### Web3Manager.ts - 处理区块链交互<a id="web3manager"></a>

Web3Manager 脚本负责所有与区块链相关的功能。

**主要特点**

- SDK 初始化 - 设置 DApp Portal SDK。
- 钱包连接 - 允许用户连接自己的钱包。
- 代币铸造 - 启用代币铸造功能。
- 余额检索 - 获取用户的令牌余额。

代码执行：

```typescript
import { _decorator, Component, Node, director, EventTarget, sys } from 'cc';
const { ccclass, property } = _decorator;
// Global event bus for Web3 events
export const web3Events = new EventTarget();
@ccclass('Web3Manager')
export class Web3Manager extends Component {
    private static instance: Web3Manager = null;
    private sdk: any = null;
    private connectedAddress: string = '';
    
    // Configuration
    private readonly CONTRACT_ADDRESS = '0xbe9b8eB864F7E363ee834054e4391fb9b4e69B90'; // REPLACE CONTRACT ADDRESS
    private readonly CHAIN_ID = '1001';
    private readonly CLIENT_ID = 'PASTE CLIENT ID';
    onLoad() {
        if (Web3Manager.instance === null) {
            Web3Manager.instance = this;
            director.addPersistRootNode(this.node);
            this.initializeSDK();
            this.tryRestoreSession();
        } else {
            this.node.destroy();
        }
    }
    private async initializeSDK(): Promise<boolean> {
        try {
            // @ts-ignore
            this.sdk = await window.DappPortalSDK.init({
                clientId: this.CLIENT_ID,
                chainId: this.CHAIN_ID
            });
            console.log("SDK initialized successfully");
            web3Events.emit('sdkInitialized');
            return true;
        } catch (error) {
            console.error("SDK initialization error:", error);
            web3Events.emit('sdkInitError', error.message);
            return false;
        }
    }
    private async tryRestoreSession() {
        const savedAddress = sys.localStorage.getItem('connectedAddress');
        if (savedAddress) {
            this.connectedAddress = savedAddress;
            web3Events.emit('walletConnected', this.connectedAddress);
            this.getBalance();
        }
    }
    public async connectWallet(): Promise<void> {
        try {
            if (!this.sdk) {
                const initialized = await this.initializeSDK();
                if (!initialized) return;
            }
            const provider = this.sdk.getWalletProvider();
            const accounts = await provider.request({ 
                method: 'kaia_requestAccounts' 
            });
            if (accounts && accounts.length > 0) {
                this.connectedAddress = accounts[0];
                sys.localStorage.setItem('connectedAddress', this.connectedAddress);
                web3Events.emit('walletConnected', this.connectedAddress);
                this.getBalance();
            }
        } catch (error) {
            console.error("Wallet connection error:", error);
            web3Events.emit('walletError', error.message);
        }
    }
    public async mintToken(amount: number): Promise<void> {
        try {
            if (!this.connectedAddress) {
                throw new Error('Wallet not connected');
            }
    
            const provider = this.sdk.getWalletProvider();
            const mintSignature = '0xa0712d68';
            // @ts-ignore
            const amountHex = amount.toString(16).padStart(64, '0');
            const data = mintSignature + amountHex;
    
            const tx = {
                from: this.connectedAddress,
                to: this.CONTRACT_ADDRESS,
                value: '0x0',
                data: data,
                gas: '0x4C4B40'
            };
    
            const txHash = await provider.request({
                method: 'kaia_sendTransaction',
                params: [tx]
            });
    
            // After getting txHash, immediately update balance
            web3Events.emit('mintSuccess', txHash);
            await this.getBalance(); // Get updated balance right after minting
        } catch (error) {
            console.error("Minting error:", error);
            web3Events.emit('mintError', error.message);
        }
    }
    public async getBalance(): Promise<void> {
        try {
            if (!this.connectedAddress) {
                throw new Error('Wallet not connected');
            }
            const provider = this.sdk.getWalletProvider();
            const balanceSignature = '0x70a08231';
            // @ts-ignore
            const addressParam = this.connectedAddress.substring(2).padStart(64, '0');
            const data = balanceSignature + addressParam;
            const result = await provider.request({
                method: 'kaia_call',
                params: [{
                    from: this.connectedAddress,
                    to: this.CONTRACT_ADDRESS,
                    data: data
                }, 'latest']
            });
            const balance = parseInt(result, 16);
            web3Events.emit('balanceReceived', balance.toString());
        } catch (error) {
            console.error("Balance fetch error:", error);
            web3Events.emit('balanceError', error.message);
        }
    }
    public getConnectedAddress(): string {
        return this.connectedAddress || '';
    }
}
```

**主要功能**

- initializeSDK() - 初始化 DApp Portal SDK。
- connectWallet() - 处理钱包连接。
- mintToken(amount) - 铸造代币。
- getBalance() - 读取令牌余额。

运行脚本前，请确保

- 替换 Web3Manager.ts 中的 **YOUR_CLIENT_ID**。
- 如有需要，请更新**CONTRACT_ADDRESS**。
- 更新 **CHAIN_ID** 以获得正确的网络。

### UIManager.ts - 处理用户界面交互<a id="ui-manager"></a>

UIManager 脚本管理所有用户界面组件和用户交互。

**代码执行：**

```typescript
import { _decorator, Component, Node, Label, Button } from 'cc';
import { Web3Manager, web3Events } from './Web3Manager';
const { ccclass, property } = _decorator;
@ccclass('UIManager')
export class UIManager extends Component {
    @property(Label)
    addressLabel: Label = null;
    @property(Label)
    balanceLabel: Label = null;
    @property(Button)
    connectButton: Button = null;
    @property(Button)
    mintButton: Button = null;
    private web3Manager: Web3Manager = null;
    start() {
        this.web3Manager = this.getComponent(Web3Manager);
        this.updateUIState(false);
        this.setupEventListeners();
        this.setupButtonHandlers();
    }
    private setupEventListeners() {
        web3Events.on('sdkInitialized', this.onSDKInitialized, this);
        web3Events.on('walletConnected', this.onWalletConnected, this);
        web3Events.on('balanceReceived', this.onBalanceReceived, this);
        web3Events.on('mintSuccess', this.onMintSuccess, this);
        web3Events.on('walletError', this.onError, this);
        web3Events.on('mintError', this.onError, this);
        web3Events.on('balanceError', this.onError, this);
    }
    private setupButtonHandlers() {
        this.connectButton.node.on('click', this.onConnectClick, this);
        this.mintButton.node.on('click', this.onMintClick, this);
    }
    onDestroy() {
        web3Events.off('sdkInitialized', this.onSDKInitialized, this);
        web3Events.off('walletConnected', this.onWalletConnected, this);
        web3Events.off('balanceReceived', this.onBalanceReceived, this);
        web3Events.off('mintSuccess', this.onMintSuccess, this);
        web3Events.off('walletError', this.onError, this);
        web3Events.off('mintError', this.onError, this);
        web3Events.off('balanceError', this.onError, this);
    }
    private updateUIState(isConnected: boolean) {
        if (this.connectButton) {
            this.connectButton.node.active = !isConnected;
        }
        if (this.mintButton) {
            this.mintButton.interactable = isConnected;
        }
        if (this.addressLabel) {
            this.addressLabel.node.active = isConnected;
        }
        if (this.balanceLabel) {
            this.balanceLabel.node.active = isConnected;
        }
    }
    async onConnectClick() {
        await this.web3Manager.connectWallet();
    }
    async onMintClick() {
        await this.web3Manager.mintToken(1); // Mint 1 token as example
    }
    onSDKInitialized() {
        console.log('SDK initialized');
    }
    onWalletConnected(address: string) {
        this.updateUIState(true);
        if (this.addressLabel) {
            this.addressLabel.string = `Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
        }
    }
    onBalanceReceived(balance: string) {
        if (this.balanceLabel) {
            this.balanceLabel.string = `Balance: ${balance}`;
            console.log('Balance updated:', balance); // Add this to debug
        }
    }
    onMintSuccess(txHash: string) {
        console.log(`Mint successful! TX: ${txHash}`);
        // The balance update will happen automatically because we called getBalance() in mintToken
    }
    onError(error: string) {
        console.error('Error:', error);
    }
}
```

## 将脚本附加到节点并连接用户界面元素<a id="attaching-scripts-to-nodes"></a>

**1. 将脚本附加到 Web3UI 节点**

- 选择 **Web3UI** 节点。
- 在**检查器**中，单击**添加组件**。
- 搜索并选择 **Web3Manager**。

![](/img/minidapps/cocos-creator/cp-add-web3manager-r.png)

- 重复上述步骤添加 UIManager。

![](/img/minidapps/cocos-creator/cp-add-uimanager-r.png)

**2. 连接用户界面元素**

- 选择 Web3UI 后，转到检查器。
- 将相应的用户界面元素从层次结构拖放到各自的字段中：
  - 地址标签
  - 余额标签
  - 连接钱包按钮
  - 薄荷纽扣

![](/img/minidapps/cocos-creator/cp-attach-node-ui-r.png)