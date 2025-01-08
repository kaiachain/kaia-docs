---
sidebar_label: 核實合同
---

# 如何使用區塊探索器驗證智能合約

## 導言

通常情況下，智能合約的部署者是唯一能接觸到實際部署代碼的一方，在部署者驗證之前，公眾無法讀取合約的源代碼。 然而，這正是合約驗證作為智能合約開發週期中一個重要步驟的作用所在，因為它有助於提高已部署合約的透明度（對用戶而言）、便利性（對開發者而言）和安全性。

儘管如此，一旦智能合約得到驗證，Kaiascope 和 Kaiascan 等區塊探索器還可以讓公眾使用區塊探索器的用戶界面與合約的公共方法進行交互。 除此之外，公眾還可以直接訪問經過驗證的合同源代碼。

在本指南中，我們將瞭解如何使用區塊探索器驗證 Kaia 網絡上部署的智能合約。

## 先決條件

- [Remix IDE](https://ide.kaia.io/)和[Kaia 錢包](https://docs.kaiawallet.io/getting_started/quick_start#install-kaia-wallet)
- 從 [水龍頭](https://faucet.kaia.io) 測試 KAIA 是否足夠

## 開始

在本指南中，我們將介紹在 Kaia 生態系統中存在的區塊探索器上驗證單個合約和多部分合約的方法，這些探索器是：

- [Kaiascope](https://kaiascope.com/)
- [Kaiascan](https://www.kaiascan.io/)

廢話不多說，讓我們開始吧！

## 部署單一合同

要驗證智能合約，首先需要在目標網絡上部署合約。 因此，在本指南中，我們將把合同部署到 Kaia Kairos Testnet。 此外，在本教程中，我們將在 Remix IDE 上部署一個名為 "Counter.sol "的簡單計數器合約。 代碼如下所示：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Counter {
    uint256 public count;
    constructor(uint256 _initialCount) {
        count = _initialCount;
    }
    function incrementCounter() public {
        count++;
    }
    function decrementCounter() public {
        count--;
    }
    function resetCounter() public {
        count = 0;
    }
}
```

:::note

您可以查看此頁面，瞭解使用 Kaia Kairos Testnet 上的 [libraries](../../references/sdk/sdk.md) 部署智能合約的教程。 您也可以使用 [Hardhat](../get-started/hardhat.md), [Foundry](../smart-contracts/deploy/foundry.md), [Remix](../smart-contracts/deploy/deploy.md#remix-ide) 等開發工具或其他工具（如果願意），將智能合約部署到 Kaia Kairos Testnet。

:::

## 單一合同核查參數

在區塊探索器上驗證合約需要一些參數，在部署智能合約時必須考慮這些參數。 以下是與合同編譯器和部署有關的一些細節，以便成功驗證合同：

Remix IDE :

- 在 Remix IDE 上，導航至**Solidity 編譯器選項卡**。

  - 觀察用於編譯和部署合同的 \*\* 編譯器版本\*\*。
  - 注意合同中使用的**開源許可類型**。 這意味著在 Solidity 源文件開頭使用的 SPDX 許可證標識符。 在 `Counter.sol` 文件中，我們使用了 `// SPDX-License-Identifier：MIT`
  - 注意用於部署合同的 **EVM 版本**。
  - (可選）如果在編譯過程中啟用了**優化**，請注意優化運行參數的值

  ![](/img/build/tutorials/counter-veri-parameters.png)

- 在 Remix IDE 上，導航至 **Kaia 選項卡**。

  - (可選） 如果合約構造函數方法接受參數，請注意構造函數參數的[ABI-編碼形式](https://docs.soliditylang.org/en/develop/abi-spec.html)
  - 成功部署後，在**已部署合約**選項卡上記下智能合約的合約地址。

  ![](/img/build/tutorials/counter-veri-parametersII.png)

## 部署多部分合同

值得注意的是，部署多部分合同的步驟與部署單部分合同的步驟相同。 在本指南中，我們將部署一個名為 `airdropToken.sol` 的簡單 KIP7 空投合約。 代碼如下所示：

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
// the creator of the project mints certian amount of fungible tokens directly to a certain selection of wallets.
contract TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("Token Aidrop Demo", "TAD") {
    }
    // Airdrop Token
    function airdropTokens(address[] calldata wAddresses, uint[] calldata tAmount) public onlyOwner {
        require(wAddresses.length == tAmount.length, "Must be same lenght");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleTokens(wAddresses[i], tAmount[i]);
        }
    }
    function _mintSingleTokens(address wAddress, uint amount) private {
        _mint(wAddress, amount);
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
}
```

## 多部分合同核查參數

驗證多部分合同的參數與驗證單部分合同的參數相同。 但是，由於它們是由多個從屬合同組成的，我們需要將合同的所有從屬關係預處理成一個單一的 solidity 文件。 這種預處理通常被稱為智能合約扁平化。

因此，我們必須將合約扁平化，以便在區塊資源管理器上使用新的扁平化 Solidity 文件進行驗證。

Remix IDE:

- 在 Remix IDE 上，導航至**文件資源管理器選項卡**。

  - 在**合同**文件夾下選擇新創建的合同
  - 點擊或用雙指輕點，即可查看合同上的所有可用命令。
  - 選擇 \*\* 壓平\*\*

  ![](/img/build/tutorials/airdropToken-flattened.png)

  - 一旦代碼被扁平化，你將看到一個名為 `airdropTokens_flattened.sol` 的新合約。

  ![](/img/build/tutorials/airdropToken-flattened-file.png)

:::note

有不同的工具可以將多部分智能合約扁平化為一個單一的 Solidity 文件，如 [Hardhat Flattener](https://hardhat.org/hardhat-runner/docs/advanced/flattening)。 請參閱相關智能合約扁平化工具的文檔，瞭解更詳細的使用說明。

:::

## 核實合同

在獲得所有驗證參數後，我們將在本節中詳細介紹在區塊資源管理器上驗證單一智能合約（Counter.sol）和多部分智能合約（airdropTokens.sol）的步驟。

### 1. Kaiascope

要在 Kaiascope 上驗證單份合同和多份合同，請按以下步驟操作：

#### 1.1 驗證單一合同

1. 進入 [Kaiascope](https://kairos.kaiascope.com)的搜索欄，粘貼已部署的合同地址。
2. 導航至該頁面上的**合同選項卡**。
3. 單擊**匹配合同源代碼**鏈接，提交合同代碼以供驗證。

![](/img/build/tutorials/counter-contract-tab.png)

4. 在合同驗證頁面，確保您的賬戶已連接到 Kaia 錢包或 Metamask。 在本指南中，我們將使用 Kaia 錢包。
5. 在**合同地址欄**中填寫合同地址。 注：該字段通常會自動填寫合同地址。
6. 選擇 "Counter.sol "示例使用的**編譯器版本**。
7. 選擇用於 "Counter.sol "示例的**開源許可類型**。 在 "Counter.sol "示例中，選擇 "**MIT License (MIT)**" 選項。 如果沒有使用許可證，請選擇 **無許可證（無）**。
8. 在**源代碼字段**中，選擇**源文本**，然後在文本字段中粘貼 "Counter.sol "的源代碼。
9. 如果在編譯過程中啟用了**優化**，則為**優化**選擇**真**，並在**優化運行**下填寫運行次數為**200**。
10. 為合同選擇 **EVM 版本**。 以 "Counter.sol "為例，選擇 "**伊斯坦布爾**"選項。
11. 點擊底部的驗證碼和**簽名並提交**按鈕，確認並開始驗證。

![](/img/build/tutorials/counter-verification-page.png)

12. 簽署驗證請求後，您將收到驗證狀態通知

![](/img/build/tutorials/counter-success-popup.png)

13. 驗證完成後，瀏覽器將顯示驗證結果，並顯示包含合同地址的成功結果頁面。 點擊合同地址，查看**合同源代碼**、**合同 ABI**和**字節碼**。

![](/img/build/tutorials/counter-success-popup-I.png)

![](/img/build/tutorials/counter-full-verification.png)

#### 1.2 驗證多部分合同

在 Kaiascope 上驗證多部分合同與驗證單部分合同一樣簡單，只是需要一些額外的步驟。 在本節中，我們將通過以下額外步驟驗證 `airdropToken.sol` 合約：

- 您可以在**源代碼**下選擇**源文本**（Counter.sol 示例的第 3 步），或在**源代碼**字段下選擇**合併文件**。  在**源文本**的情況下，複製 "airdropToken_flattened.sol "中的代碼並粘貼到文本字段中。 如果**實體文件**，可在 Remix IDE 上下載 "airdropToken_flattened.sol "文件並上傳到字段。

a. 來源文本

![](/img/build/tutorials/airdrop-veri-field-I.png)

b. 固體文件

![](/img/build/tutorials/airdrop-veri-field-II.png)

在此之後，其他所有步驟都與驗證單個合同相同。 填寫驗證參數後，點擊**簽署並提交**按鈕進行確認並開始驗證。

驗證完成後，瀏覽器將顯示驗證結果，並顯示包含合同地址的成功結果頁面。 點擊合同地址，查看**合同源代碼**、**合同 ABI**和**字節碼**。

![](/img/build/tutorials/airdrop-success-popup.png)

![](/img/build/tutorials/airdrop-success-popup-I.png)

![](/img/build/tutorials/airdrop-full-verification.png)

### 2. Kaiascan

要在 Kaiascan 上驗證單個合同和多部分合同，請瀏覽[合同提交申請頁面](https://kairos.kaiascan.io/contracts)。 不過，請確保您的賬戶已連接到 Kaia 錢包或 MetaMask，並按照以下步驟操作：

![](/img/build/tutorials/klaytnfinder-con-sub-page.png)

#### 2.1 核查單一合同

1. 請注意**此合同是否為令牌**字段？ 在使用官方網站 URL、官方電子郵件地址和令牌徽標圖像驗證令牌合約時，需要使用此字段。 在本指南中，請選擇**否**，因為我們不是在驗證商業代幣合約。
2. 填寫已部署合同的**合同地址** (Counter.sol)
3. 確保從 Remix IDE 下載 "Counter.sol"，並上載到\*\*源代碼（Solidity 文件）\*\*字段。
4. 選擇 "Counter.sol "示例使用的**編譯器版本**
5. 選擇用於 "Counter.sol "示例的**開源許可類型**。 在 "Counter.sol "示例中，選擇 "**MIT License (MIT)**" 選項。 如果沒有使用，請選擇 **無許可證（無）**
6. 為合同選擇 **EVM 版本**。 以 "Counter.sol "為例，選擇 "**伊斯坦布爾**"選項。
7. 如果在編譯過程中啟用了**優化**，則為**優化**選擇**真**，並在**優化運行**下填寫運行次數為**200**。
8. (可選）要獲取該字段的 ABI 編碼構造函數參數，請訪問 [abi.hashex.org](http://abi.hashex.org)，獲取下圖所示的編碼數據：

![](/img/build/tutorials/abi-hashex.png)

9. 點擊**簽署並提交**按鈕，確認並開始驗證。

![](/img/build/tutorials/counter-k-verification-page.png)

10. 驗證完成後，您將收到**提交成功**信息。 現在，您可以在資源管理器搜索欄中粘貼合同地址，查看**合同源代碼**、**合同 ABI**、**創建代碼**和**ABI 編碼值**。

> ![](/img/build/tutorials/counter-k-full-verification.png)

### 2.2 驗證多部分合同

在 Kaiascan 驗證多部分合同的步驟與驗證單個合同相同。 不過，需要注意的是，我們將在 \*\* 源代碼（Solidity 文件）\*\* 字段上傳 `airdropToken_flattened.sol` 文件。

![](/img/build/tutorials/airdrop-k-verification-page.png)

填寫驗證參數後，點擊**簽署並提交**按鈕進行確認並開始驗證。 驗證完成後，您將收到**提交成功**信息。 現在，您可以在資源管理器搜索欄中粘貼合同地址，查看**合同源代碼**、**合同 ABI**和**創建代碼**。

![](/img/build/tutorials/airdrop-k-full-verification.png)

## 結論

恭喜您遵循本指南！ 在本教程中，您將學習如何使用 Kaiascope 和 Kaiascan 來驗證合同（單部分和多部分），以提高部署合同的透明度（對用戶）、便利性（對開發人員）和安全性。 如需瞭解更多信息，請訪問 [Kaia 文檔](https://docs.klaytn.foundation/)；如有任何問題，請訪問 [Kaia 論壇](https://devforum.kaia.io/)。
