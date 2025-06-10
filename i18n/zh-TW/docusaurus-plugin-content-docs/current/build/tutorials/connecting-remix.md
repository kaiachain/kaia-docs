# 將 Remix 連接到 Kaia

![](/img/banners/kaia-remix.png)

## 概述<a href="#overview" id="overview"></a>

Remix 是一個基於瀏覽器的集成開發環境，用於開發 Solidity 合約。 在本指南中，您將學習如何

- 在 Remix IDE 上創建並上傳預構建的智能合約。
- 編譯智能合約
- 連接至 Remix IDE 的 Kaia 插件
- 設置部署環境
- 導入賬戶
- 使用 Kaia 錢包將 Kaia 連接到 Remix
- 使用 MetaMask 將 Kaia 連接到 Remix
- 部署智能合約。

這將包括與 Kaia 的 Remix 連接。 如果您想進一步瞭解如何使用 Remix，請參閱 [Remix docs](https://remix-ide.readthedocs.io/en/latest/) 或 [Remix IDE](https://remix.ethereum.org/)。

## 在 Remix 上創建文件<a href="#creating-a-file-on-remix" id="creating-a-file-on-remix"></a>

若要開始建立智慧型契約，請點選**檔案總管**索引標籤中**契約**資料夾的**建立新檔案**圖示，並將其命名為`KaiaGreeter.sol`。

![](/img/build/smart-contracts/kg-remix-file.png)

接下來就是複製並貼上下面提供的智慧契約程式碼到新建立的 `KaiaGreeter.sol` 檔案中。

```solidity
// SPDX-License-Identifier：UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract KaiaGreeter {
    uint256 totalGreetings;
    constructor() {
        console.log("Yo yo, Welcome to Kaia");
    }
    function greet() public {
        totalGreetings += 1;
        console.log(msg.sender, "says hello kaia!");
    }
    function getTotalGreetings() public view returns (uint256) {
        console.log("We have %d total waves!", totalGreetings);
        return totalGreetings;
    }
}
```

## 編譯智能合約<a href="#compile-smart-contract" id="compile-smart-contract"></a>

要編制合同，請執行以下操作：

- 轉到 **Solidity Compiler** 選項卡
- 選擇編譯器版本為 0.8.30
- 開啟**自動編譯**選項。
- 按一下 **Compile KaiaGreeter.sol** 按鈕，以編譯「KaiaGreeter.sol」合約。
- 編譯成功後，編譯器選項卡按鈕上將顯示綠色的"√"標記

![](/img/build/smart-contracts/kg-remix-compile.png)

## 在 Remix IDE 上連接 Kaia 插件<a href="#connect-to-kaia-plugin" id="connect-to-kaia-plugin"></a>

要在 Remix IDE 上連接 Kaia 插件，可以使用 [Kaia Plugin for Remix](https://ide.kaia.io/)，或按照此步驟操作：

- 導航至**插件管理器**選項卡
- 在搜尋欄位插入 Kaia
- 啟動 Kaia 外掛程式。 如果 Kaia 索引標籤出現，表示您已準備好與 Kaia 互動。

![](/img/build/smart-contracts/kg-plugin-manager.png)

## 設置部署環境 <a href="#setting-up-deployment-env" id="setting-up-deployment-env"></a>

- 按一下 Kaia 外掛程式。
- 選擇適當的 [環境]。
- 您可以選擇 Kairos、主網、注入式提供程序 - Kaia 錢包、注入式提供程序 - MetaMask
    - [凱羅斯]：連接至 Kairos 網絡
    - [主網]：連接到主網
    - [注入式提供程序 - Kaia 錢包]：連接至 Kaia 錢包
    - [注入式提供程序 - MetaMask ]：連接到 MetaMask

![](/img/build/smart-contracts/kg-remix-env.png)

## 導入賬戶<a href="#import-account" id="import-account"></a>

您可以從任何兼容的錢包中導出私鑰或 Keystore 在此使用。

- 單擊 ACCOUNT 旁邊的加號按鈕。
- 然後插入您的私人密碼匙或 keystore。
- 您還可以為繳費人導入密鑰。 它只支持私鑰。

![](/img/build/smart-contracts/kg-import-account.png)

## 使用 Kaia 錢包將 Kaia 連接到 Remix<a href="#connect-to-kaia-using-kaia-wallet" id="connect-to-kaia-using-kaia-wallet"></a>

- 在 Remix 環境菜單中選擇 [注入式提供程序 - Kaia 錢包]。

![](/img/build/smart-contracts/kg-ip-kw.png)

- 看到 Kaia 錢包彈出窗口時，點擊 [連接]。
- 成功連接到網絡後，您將看到所連接網絡的鏈 ID 和賬戶。

## 連接 Kaia - 使用 MetaMask 混音<a href="#connect-to-kaia-using-metamask" id="connect-to-kaia-using-metamask"></a>

- 參照[連接到 MetaMask](./connecting-metamask.mdx）連接 Kaia 和 MetaMask。
- 在 Remix 環境菜單上選擇 [注入式提供程序 - 元掩碼]。

![](/img/build/smart-contracts/kg-ip-mm.png)

- 看到彈出的 MetaMask 窗口時，點擊它來選擇賬戶。
- 成功連接到網絡後，您將看到所連接網絡的鏈 ID 和賬戶。

## 部署智能合約<a href="#deploying-contract" id="deploying-contract"></a>

在本節中，我們將使用 Kaia Wallet 部署 `KaiaGreeter.sol` 合約。 在 "編譯 "部分編譯合同後，請按照以下部署流程進行部署：

- 將部署環境設定為 [Injected Provider - Kaia Wallet]。 確保確認所有與 Remix 的連接提示。
- 在 CONTRACT（合同）字段中選擇要部署的合同。
- 單擊 "部署 "按鈕。 這將彈出一個 Kaia 錢包，要求確認交易。 只需確認交易即可！

![](/img/build/smart-contracts/kg-deployed.png)

- 您可以在 [Kaiascan](https://kairos.kaiascan.io/)上查看已部署的合約，也可以在 Remix IDE 上進行測試或調試。
