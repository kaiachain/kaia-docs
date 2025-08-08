---
sidebar_label: 使用積木探索器
---

# 如何使用區塊探索器驗證智能合約

## 導言

通常情況下，智能合約的部署者是唯一能接觸到實際部署代碼的一方，在部署者驗證之前，公眾無法讀取合約的源代碼。 然而，這正是合約驗證作為智能合約開發週期中一個重要步驟的作用所在，因為它有助於提高已部署合約的透明度（對用戶而言）、便利性（對開發者而言）和安全性。

話雖如此，一旦智慧契約通過驗證，Kaiascan 和 OKX Kaia Explorer 等區塊探索器也能讓大眾使用區塊探索器的使用者介面與契約的公開方法互動。 除此之外，公眾還可以直接訪問經過驗證的合同源代碼。

在本指南中，我們將瞭解如何使用區塊探索器驗證 Kaia 網絡上部署的智能合約。

## 先決條件

- [Remix IDE](https://ide.kaia.io/)和[Kaia 錢包](https://docs.kaiawallet.io/getting_started/quick_start#install-kaia-wallet)
- 從 [水龍頭](https://faucet.kaia.io) 測試 KAIA 是否足夠

## 開始

在本指南中，我們將在 Kaia 生態系統中存在的區塊探索者上驗證單一契約和多部分契約，即：

- [Kaiascan](https://www.kaiascan.io/)
- [OKLink](https://www.oklink.com/kaia)

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

您可以在此頁面查看 Kaia Kairos Testnet 上使用 [libaries](../../../references/sdk/sdk.md)部署智能合約的教程。 您也可以使用 [Hardhat](../../get-started/hardhat.md), [Foundry](../deploy/foundry.md), [Remix](../deploy/deploy.md#remix-ide) 等開發工具或其他工具，將智能合約部署到 Kaia Kairos Testnet。

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

### Kaiascan

要在 Kaiascan 上驗證單個合同和多部分合同，請瀏覽[合同提交申請頁面](https://kairos.kaiascan.io/contract)。

:::note

目前，Kaiascan 上的合同驗證還處於測試階段。

:::

![](/img/build/tutorials/kaiascan-con-sub-page.png)

#### 驗證單一合約

1. 填寫已部署合同的**合同地址** (Counter.sol)
2. 選擇 "Counter.sol "示例使用的**編譯器版本**
3. 選擇用於 "Counter.sol "示例的**開源許可類型**。 在 "Counter.sol "示例中，選擇 "**MIT License (MIT)**" 選項。 如果沒有使用，請選擇 **無許可證（無）**
4. 確保從 Remix IDE 下載 "Counter.sol"，並將其上載到\*\*源代碼（Solidity 文件）\*\*字段中。
5. 為合同選擇 **EVM 版本**。 以 "Counter.sol "為例，選擇 "**伊斯坦布爾**"選項。
6. 如果在編譯過程中啟用了**優化**，則為**優化**選擇**真**，並在**優化運行**下填寫運行次數為**200**。
7. (可選）要獲取該字段的 ABI 編碼構造函數參數，請訪問 [abi.hashex.org](http://abi.hashex.org)，獲取下圖所示的編碼數據：

![](/img/build/tutorials/abi-hashex.png)

8. 點擊**驗證和發佈**按鈕開始驗證。

![](/img/build/tutorials/counter-k-verification-page.png)

9. 驗證完成後，您將收到**提交成功**信息。 現在，您可以在資源管理器搜索欄中粘貼合同地址，查看**合同源代碼**、**合同 ABI**、**創建代碼**和**ABI 編碼值**。

> ![](/img/build/tutorials/counter-k-full-verification.png)

#### 驗證多部分合約

在 Kaiascan 驗證多部分合同的步驟與驗證單個合同相同。 但是，需要注意的是，我們將複製並貼上 `airdropToken_flattened.sol` 檔案到 \*\* 輸入下面的 Solidity Contract Code\*\* 欄位，因為 Kaiascan 目前不支援檔案上傳驗證。

![](/img/build/tutorials/airdrop-k-verification-page.png)

填寫驗證參數後，點擊**驗證和發佈**按鈕開始驗證。 驗證完成後，驗證頁面將刷新。 現在，您可以在資源管理器搜索欄中粘貼合同地址，查看**合同源代碼**、**合同 ABI**和**創建代碼**。

![](/img/build/tutorials/airdrop-k-full-verification.png)

### OKLink

要在 OKLink 上驗證單一合約和多部分合約，請瀏覽 [驗證合約初步頁面](https://web3.okx.com/explorer/kaia/verify-contract-preliminary)。

:::note
OKLink 支援目前僅限於 Kaia Mainnet，因此合約驗證僅適用於 Mainnet 部署。
:::

#### 驗證單一合約

1. 填入已部署合約 (Counter.sol) 的**合約地址**。
2. 選擇 \*\* 編譯器類型\*\*。 本指南選擇 **Solidity(SingleFile)**。
3. 選擇 Counter.sol 範例使用的 \*\* 編譯器版本\*\*：**v0.8.30+commit.73712a01**，然後按下**Next**。
4. 請務必將 Remix IDE 中的 Counter.sol 上傳至 **合約原始碼**欄位
5. 如果在編譯過程中啟用了 **最佳化**，請選擇 True，並在 Optimization Runs（最佳化執行）下填入 200 的執行次數。
6. 選擇用於 Counter.sol 範例的 \*\* 開放原始碼授權類型\*\*。 以 Counter.sol 為例，請選擇 **MIT License (MIT)** 這個選項。 如果沒有使用，請選擇 **無授權證 (無)**。
7. 選擇合約的 **EVM 版本**。 以 Counter.sol 為例，請選擇 **default** 選項。
8. 按一下 **Submit** 按鈕開始驗證。

![](/img/build/smart-contracts/verify/oklink-sp-verification-params.png)

9. 驗證完成後，您會收到驗證成功的訊息。

![](/img/build/smart-contracts/verify/oklink-sp-contract-verification-success.png)

現在您可以在 explorer 搜尋列中貼上契約位址，以檢視契約原始碼、契約 ABI 和契約部署 bytecode。

![](/img/build/smart-contracts/verify/oklink-sp-contract-badge.png)

#### 驗證多部分合約

在 OKLink 上驗證多部分合約的步驟與驗證單一合約的步驟相同。 但是，需要注意的是，我們將複製並粘貼`airdropToken_flattened.sol` 檔案到**合約原始碼**欄位，因為 OKLink 目前不支援檔案上傳驗證。

![](/img/build/smart-contracts/verify/oklink-mp-verification-params.png)

填寫驗證參數後，按一下「提交」按鈕以開始驗證。 驗證完成後，您會收到驗證成功的訊息。

![](/img/build/smart-contracts/verify/oklink-mp-contract-verification-success.png)

現在您可以在 explorer 搜尋列中貼上契約位址，以檢視契約原始碼、契約 ABI 和契約部署 bytecode。

![](/img/build/smart-contracts/verify/oklink-mp-contract-badge.png)

## 結論

恭喜您遵循本指南！ 在本教程中，您將學習如何使用 Kaiascan 和 OKLink 來驗證合約 (包括單部分和多部分)，以提高已部署合約的透明度 (對使用者而言)、便利性 (對開發人員而言) 和安全性。 如需瞭解更多信息，請訪問 [Kaia 文檔](https://docs.kaia.io/)；如有任何問題，請訪問 [Kaia 論壇](https://devforum.kaia.io/)。