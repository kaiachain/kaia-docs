# 使用 Thirdweb 部署智能合約

![](/img/banners/kaia-thirdweb.png)

## 導言<a id="introduction"></a>

本節將指導您使用 [ThirdWeb](https://portal.thirdweb.com/)，在 Kaia Network 上部署 Marketplace 合同和相應的 NFT 收集合同。 Thirdweb 是一個完整的 Web3 開發框架，可為您提供將應用程序和遊戲連接到去中心化網絡所需的一切。

市場合約允許用戶列出 NFT 進行直接銷售或拍賣，從而加強了 NFT 的買賣，就像在 OpenSea 上所做的那樣。

完成本指南後，您將能夠

- 使用 thirdweb 創建和定製合同。
- 使用 thirdweb 對智能合約進行編譯、部署和交互。

## 入門<a id="getting-started"></a>

在本文中，我們將探討使用 thirdweb 創建、自定義和部署合同的不同方法，即

- 使用第三網絡儀錶板
- 使用 thirdweb CLI

在本指南中，我們將演示如何使用 thirdweb 控制面板部署 MarketPlace 合同，並使用 thirdweb CLI 部署相應的 nft 集合，以便在市場上列出。

> 注：我們將不解釋市場合約的機制，因為我們的重點是探索用於創建、部署和與智能合約交互的 thirdweb 面板和 CLI。

## 使用 thirdweb 儀錶板創建和部署市場合同<a id="creating-and-deploying-thirdweb-dashboard"></a>

在本節中，我們將使用 thirdweb 面板創建並部署市場合同。 為此，請按照以下步驟操作：

1. 前往 [thirdweb dashboard](https://thirdweb.com/dashboard?ref=blog.thirdweb.com)，從合同列表中選擇 **MarketPlace** 合同。

![](/img/build/get-started/marketplace-explore.png)

2. 在合同概覽儀錶板中單擊**立即部署**。

![](/img/build/get-started/marketplace-deploy.png)

3. 配置市場合同，使其包含以下參數：市場的**名稱**、**描述**和**圖像**。

![](/img/build/get-started/marketplace-contract-details.png)

4. 點擊 **立即部署**，如上圖所示，然後等待交易完成。

![](/img/build/get-started/marketplace-deployed.png)

交易成功執行後，您可以在 [Kaiascope](https://kaiascope.com/)的搜索欄中粘貼合同地址，以驗證您的部署。

## 使用 thirdweb CLI 創建和部署 NFT 收集合同<a id="creating-deploying-using-thirdweb-cli"></a>

在本節中，我們將使用 [thirdweb CLI](https://portal.thirdweb.com/cli?ref=blog.thirdweb.com)創建和部署將在 Marketplace 中列出的 NFT 程序集。 為此，請按照以下步驟操作：

### 創建合同<a id="creating-the-contract"></a>

1. 在終端中運行此命令來創建合同：

```bash
npx thirdweb create --contract
```

2. 輸入您喜歡的命令行提示值：

  i. 為項目命名

  ii. 選擇您喜歡的框架：**Hardhat** 或 **Foundry**.

  iii. 為智能合約命名

  iv. 選擇基本合同類型：**空**、**ERC20**、**ERC721** 或 **ERC1155**。 添加任何所需的**擴展名**。 在本教程中，我們將選擇 ERC721，並將擴展名設置為 "無"。

![](/img/build/get-started/thirdweb-cli-info.png)

3. 創建完成後，請導航至項目根目錄，並在首選代碼編輯器中打開項目。

4. 打開合同文件夾，合同應該是這樣的：

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@thirdweb-dev/contracts/base/ERC721Base.sol";
contract nftcollection is ERC721Base {
      constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721Base(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {}
}
```

上述合約演示了[ERC721Base](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol) 的基本功能。 它導入並繼承了 **ERC721Base** 合約，還實現了所需的方法，包括構造函數及其從屬參數。

您可以根據自己需要的自定義邏輯修改合同，一旦完成，您的合同就可以部署了。

### 部署合同<a id="deploying-the-contracts"></a>

1. 導航至項目根文件夾，在終端中運行該命令：

```bash
npx thirdweb deploy
```

執行該命令將觸發以下操作：

- 檢測框架（硬帽、代工廠）
- 編譯當前目錄下的所有合同。
- 允許您選擇要部署的合同。
- 將編譯好的智能合約代碼（以應用程序二進制接口（ABI）的形式）上傳到 IPFS。

2. 部署完成後，將打開一個儀錶板界面，填寫其餘參數。
  - **_name**：合同名稱
  - **_symbol**：符號或 "股票代碼"
  - **_版稅收款人**：接收二次銷售版稅的錢包地址
  - **_特許權使用費基點**：每次二次銷售將給予特許權使用費收取人的基點 (bps)，如 500 = 5%。

3. 選擇 "Kaia Mainnet "作為部署合同的網絡。

![](/img/build/get-started/nft-collection-deploy.png)

4. 智能合約部署完成後，您可以通過其儀錶板管理其他設置和功能。 例如，您可以上傳 NFT、配置權限和訪問控制以及添加新功能。

有關 thirdweb 部署命令的更多信息，請參閱 [deploy guide](https://portal.thirdweb.com/deploy/getting-started) 。

## 與已部署的合同互動<a id="interacting-with-deployed-contracts"></a>

在本節中，我們將分別使用**mint**和**transferfrom**函數鑄造一個 NFT 並將其轉入另一個賬戶。 讓我們按以下步驟來瞭解一下：

### 鑄幣廠<a id="minting-nft"></a>

1. 導航至新部署的合同 (**puppyKlan-NC**) 面板。
2. 點擊合同儀錶板下**NFTs**選項卡中的**mint**功能。

![](/img/build/get-started/puppy-mint-btn.png)

3. 填寫鑄造 NFT 所需的參數：**名稱**、媒體\*\*、描述**和屬性**。

![](/img/build/get-started/puppy-mint-details.png)

4. 核對輸入內容，然後點擊 **Mint NFT** 按鈕。
5. 確認交易，等待交易完成。 完成後，您會看到儀錶板上添加了 NFT，如下圖所示：

![](/img/build/get-started/puppy-minted.png)

### 向新業主轉讓 NFT<a id="transferring-nft-to-new-owner"></a>

1. 前往合同 (**puppyKlan-NC**) 面板中的資源管理器選項卡。
2. 在 "寫 "選項卡下選擇 **transferFrom** 功能，如下圖所示。
3. 填寫必要的函數參數：from（地址）、to（地址）和 id（uint256）。

![](/img/build/get-started/puppy-transferfrom.png)

4. 確認交易，等待交易完成。

## 結論<a id="conclusion"></a>

祝賀你 如果您讀到了本指南的結尾。 如果您有任何問題，請訪問 [Kaia 論壇](https://devforum.kaia.io/) 或聯繫 [官方第三網絡支持](https://support.thirdweb.com/)。 不過，以下是您在 Kaia 上進一步使用 Thirdweb 時可能需要的有用資源列表。

- [Thirdweb文檔](https://portal.thirdweb.com/)
- [如何使用 Thirdweb 構建 dApp](https://blog.thirdweb.com/guides/how-to-build-a-dapp/)
- [使用 NextJS 和 TypeScript 創建自己的 NFT 市場](https://blog.thirdweb.com/guides/nft-marketplace-with-typescript-next/)

