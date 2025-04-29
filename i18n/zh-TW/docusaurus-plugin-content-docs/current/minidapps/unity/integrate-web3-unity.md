# Web3 整合

在本節中，我們會建立一些元件，將 web3 整合到我們的 Unity 專案中。

## 建立與部署 KIP7 智慧型契約

首先，我們會使用 Kaia Contract Wizard 來產生我們的智慧型契約。

### 步驟 1：使用 Kaia 契約精靈

1. 導覽至 Kaia Contract Wizard。
2. 選擇 KIP7 (Kaia 的代幣標準，類似 ERC20)。
3. 配置您的令牌：
  - 名稱：ExampleTestToken (或其他名稱!)
  - 代號：ET (您的代幣代號)
  - Premint：100 (初始代幣供應)
  - 功能：檢查 ✅ 可鑄造

在本指南中，我們將調整 mint 函式，使其沒有 onlyOwner 修改器。 要做到這一點，我們必須移除 ownable.sol 的匯入，以及 Ownable 的繼承。 調整後的程式碼應該是這樣的：

```js
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
我們移除了 onlyOwner 修改器，允許除原始部署者或契約擁有者之外的任何人呼叫 mint 函式。
:::

### 步驟 2：透過 Remix IDE 部署

1. 複製並貼上上述程式碼到 Remix IDE 新建立的檔案 `ET.sol` 中。
2. 在 Remix IDE 中：
  - 按一下 \*\* 編譯合約\*\* 按鈕。
  - 在外掛程式管理員中啟動 **Kaia 外掛程式**。
  - 在 Kaia 外掛索引標籤的「環境」下，選擇 \*\* 注入提供者\*\* - **Kaia Wallet**。
  - 在 **Contract** 下拉式選單中找到您的合約 (ExampleTokens)。
  - 按一下 \*\* 部署\*\* 以啟動您的令牌！
3. 當您的 Kaia Wallet 彈出時：
  - 檢視部署詳細資訊。
  - 按一下「確認」以部署到 Kaia Kairos Testnet。

:::important
複製並儲存已部署的合約位址。 您在稍後的教學中會用到它。
:::

## 建立 Unity-Web3 橋接

現在我們要建立 Unity 與 Web3 功能之間的重要連結。 這是我們將區塊鏈功能帶入您的 Unity 應用程式的地方！

### 第 1 部分：建立外掛橋接器 (kaiaPlugin.jslib)

首先，我們要建立 JavaScript 橋接，讓 Unity 能與 Web3 對話：

1. 建立您的外掛程式目錄：

```
Assets/
└── Plugins/
    └── WebGL/
        └── KaiaPlugin.jslib    // We'll create this file
```

2. 為什麼要使用 .jslib？ 將其視為 Unity 的 C# 與瀏覽器的 JavaScript 之間的轉譯器 - Web3 互動的必要元件！

3. 外掛程式將處理三個核心功能：
  - ConnectWallet() - 處理 Kaia Wallet 連線
  - GetTokenBalance() - 檢查令牌餘額
  - MintTokens() - 管理代幣鑄造

在 VS Code 中開啟此檔案，並貼上 [Appendix A](convert-unity-liff.md#appendix-a) 中的「KaiaPlugin.jslib」原始碼：

### 第 2 部分：建立 C# 管理員 (Web3Manager.cs)

接下來，我們將建立 C# 腳本來管理所有 Web3 作業：

1. 建立您的 scripts 目錄：

```js
Assets/
└── Scripts/
    └── Web3/
        └── Web3Manager.cs    // We'll create this file
```

:::info

\*\*Web3Manager 有哪些功能？

- 擔任所有 Web3 作業的主要指揮官。
- 管理與我們 JavaScript 外掛程式的通訊。
- 根據區塊鏈事件更新 UI 元素。
- 處理所有錢包及代幣操作。
- 連接「連接錢包」和「Mint」按鈕與其各自的功能
  :::

2. 在 VS Code 中開啟此檔案，並貼上 [Appendix B](convert-unity-liff.md#appendix-b) 中的「Web3Manager.cs」原始碼。

### 第 3 部分：設定 Web3Manager 遊戲物件

最後，讓我們在 Unity 中將這一切整合在一起：

1. 建立管理員物件：
  - 在 Hierarchy 視窗（根層級）中按一下滑鼠右鍵。
  - 選擇「建立空物件」。
  - 將其命名為「Web3Manager」。
2. 附上您的劇本：
  - 選取 Web3Manager GameObject。
  - 在 Inspector 中，按一下 Add Component。
  - 搜尋並選擇「Web3Manager」。
3. 連接 UI 元件：
  - 選取 Web3Manager 後，查看 Inspector。
  - 將您的 UI 元件從 Hierarchy 拖放到對應的欄位：
    - 狀態文字
    - 地址文字
    - 代號平衡文字
    - 連接、斷開、薄荷按鈕
    - 輸入欄位

![](/img/minidapps/unity-minidapp/connect-ui-manager.png)
