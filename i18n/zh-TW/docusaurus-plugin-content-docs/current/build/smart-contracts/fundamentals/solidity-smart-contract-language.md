# Solidity - 智能合約語言

本章只介紹高級概念、開發過程和用 Solidity 編寫的示例，因為 Solidity 在其官方網站上已有詳盡的文檔說明。 有關語言規範或實現，請參閱下面的 [參考文獻](#參考文獻)。 本章內容基於 [參考文獻](#參考文獻）中列出的多個網站。

## 堅固和卡婭<a id="solidity-and-kaia"></a>

[Solidity](https://github.com/ethereum/solidity)是一種高級、靜態類型化、面向合約的語言，用於在以太坊平臺上實現智能合約。 雖然 Solidity 最初是為以太坊設計的，但它在編寫智能合約方面具有足夠的通用性；因此，它也可用於其他區塊鏈平臺，如 Kaia。

Kaia 正式兼容**倫敦**以太坊虛擬機（EVM）版本。 不保證向後兼容 Kaia 上的其他 EVM 版本。 因此，強烈建議使用 Istanbul 目標選項編譯 Solidity 代碼。 請參閱 [如何設置 Solc 的 EVM 版本](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)。

:::note

v1.7.0 協議升級 - 不兼容的更改，包括**伊斯坦布爾**硬分叉項目和 Kaia 自己的項目。
如果是 Kairos 網絡，則從區塊編號 "#75,373,312 "開始啟用，如果是主網絡，則從區塊編號 "#86,816,005 "開始啟用。

v1.7.3 協議升級 - 包括倫敦\*\*\*硬分叉產生的基本費用在內的不兼容變更。
如果是 Kairos 網絡，則從區塊編號 "#80,295,291 "開始啟用，如果是主網絡，則從區塊編號 "#86,816,005 "開始啟用。

v1.8.0 協議升級 - 包括倫敦\*\*\*硬分叉產生的基本費用在內的不兼容變更。
如果是 Kairos 網絡，則從區塊編號 "#86,513,895 "開始啟用，如果是主網，則從區塊編號 "#86,816,005 "開始啟用。

:::

在為 Kaia 開發智慧合約時，可以使用 [Remix](https://remix.ethereum.org/) （一個基於瀏覽器的 IDE）和 [Hardhat](https://hardhat.org/docs) （一個開發框架）等開發工具。 Kaia 團隊將努力保持以太坊開發工具與 Kaia 開發工具之間的兼容性，但在必要時可能會選擇向 Kaia 智能合約開發人員提供這些工具的增強版或更新版。

利用 Remix 或 Hardhat 開發智慧契約是很方便的，但 Solidity 編譯器也可以在本機使用，只要按照以下網頁中描述的指示建立或安裝即可：

- [安裝 Solidity 編譯器](https://docs.soliditylang.org/en/latest/installing-solidity.html)

請注意，有兩種命令行 Solidity 編譯器：

- _solc_：全功能編譯器
  - 包含在 Solidity 文檔中
- _solcjs_：用於 _solc_ 的 Javascript 綁定
  - 作為獨立項目 [solc-js] 維護(https://github.com/ethereum/solc-js)
  - _solcjs_ 的命令行選項與 _solc_ 的命令行選項不兼容。

其他有助於入門 Solidity 的資料包括以下內容：

- [頂級穩固性教程](https://medium.com/coinmonks/top-solidity-tutorials-4e7adcacced8)

## 如何編寫智能合約<a id="how-to-write-a-smart-contract"></a>

本節以 Solidity 源代碼為例，讓讀者瞭解智能合約的外觀以及如何編寫合約。 請注意，此處包含的代碼僅供解釋之用，並不用於生產目的。 在代碼中，"(require) "表示任何 Solidity 源文件都需要該行，而"(optional) "則表示不一定需要該行。 符號 `Ln:` 並非 Solidity 代碼的一部分，在此加入只是為了顯示行號。 請不要在實際使用的源代碼中使用這些符號。

```text
L01: pragma solidity 0.5.12;   // (required) version pragma
L02:
L03: import "filename";        // (optional) importing other source files
L04:
L05: // (optional) smart contract definition
L06: contract UserStorage {
L07:    mapping(address => uint) userData;  // state variable
L08:
L09:    function set(uint x) public {
L10:       userData[msg.sender] = x;
L11:    }
L12:
L13:    function get() public view returns (uint) {
L14:       return userData[msg.sender];
L15:    }
L16:
L17:    function getUserData(address user) public view returns (uint) {
L18:       return userData[user];
L19:    }
L20: }
```

上述代碼不言自明，因此熟悉其他編程語言的人可以跳過本節的解釋，直接跳到下一節。 不過，對於那些不清楚代碼作用的人，或者對於 Solidity 是第一種編程語言的人，我們會在下面附上源代碼的簡短說明：

- 代碼中以雙斜線開頭的部分是註釋，而不是代碼；它們用於註釋和解釋代碼。  編譯器會忽略註釋。
- L01 "中的 "pragma "語句表示編譯器的最小版本。
- L03`中的`import` 語句從"`filename\`"導入所有全局符號。 文件名 "應為實際文件名。
- `L05` - `L20` 定義了一個名為 `UserStorage` 的智能合約。  關鍵字 `contract` 位於合約名稱之前，聲明代碼代表一個智能合約。  Solidity 中的契約類似於面嚮對象語言中的類。  每個合約可包含狀態變量、函數、函數修改器、事件、結構類型和枚舉類型的聲明。  此外，合同還可以繼承其他合同。  示例代碼包含一個合同定義，但一個 Solidity 文件可能包含多個合同定義。
- 在`L07`中，`userData`是映射類型的狀態變量。  狀態變量永久保存在合約存儲器中。  狀態變量 `userData` 維護著 `address` 和 `uint` 值之間的映射。  地址 "類型保存一個 20 字節的地址（Kaia 使用的 20 字節地址與以太坊類似）。
- `L09` 定義了一個公共函數 `set`，用於在 `userData` 中保存信息發送者的 `x` 值。  變量 "msg.sender "是 Solidity 中定義的一個特殊變量，表示消息（即當前呼叫）發送者的地址。  關鍵字 "public "表示該函數是合約接口的一部分，可在外部或內部調用。
- L13`中的函數`get` 和 L17` 中的函數 `getUserData` 是用 `view` 聲明的，這意味著函數承諾不修改任何狀態變量。  它們的聲明包括 `returns (uint)`，這意味著它們返回一個 `uint` 值。

有關 Solidity 語言語法和語義的更多信息，請參閱 [Solidity 文檔](https://docs.soliditylang.org/)。

## 如何編譯、部署和執行<a id="how-to-compile-deploy-and-execute"></a>

編譯 Solidity 代碼的一種方法是使用命令行編譯器 _solc_。 這種編譯器可以產生各種輸出，從簡單的二進制文件和彙編到抽象語法樹（parse tree\ ）。 假設上面的代碼保存在 `UserStorage.sol`（上面顯示的源文件中不包括 `L03`），編譯文件 `UserStorage.sol`的一些示例如下。

```bash
$ solc --bin UserStorage.sol
```

- 該命令將以二進制_即_字節碼_的形式打印編譯輸出。

```bash
solc -o output --bin --ast --asm UserStorage.sol
```

- 編譯器會生成二進制文件、抽象語法樹和彙編代碼，並將它們作為單獨的文件存放在 "輸出 "目錄下。

```bash
solc --optimize --bin UserStorage.sol
```

- 為提高性能，可在編譯過程中使用 `--optimize` 標記激活優化器。

下面列出了一些用於編譯、部署和執行智能合約的資源。

- [使用Solidity命令行編譯器](https://docs.soliditylang.org/en/latest/using-the-compiler.html)
- [使用 Remix 編譯合同](https://remix-ide.readthedocs.io/en/stable/compile.html)
- [Running transactions with Remix](https://remix-ide.readthedocs.io/en/stable/run.html)
- [Remix Learneth 教程](https://remix-ide.readthedocs.io/en/latest/remix_tutorials_learneth.html)

注：本部分內容今後將進行更新。

## 調試智能合約<a id="debugging-smart-contracts"></a>

由於缺乏成熟的調試工具，調試 Solidity 代碼比調試用其他編程語言編寫的代碼更加困難。 下面，我們列出了一些用於 Solidity 調試的資源。

- [使用 Remix 調試交易](https://remix-ide.readthedocs.io/en/latest/debugger.html)
- [使用 Remix 調試事務的教程](https://remix-ide.readthedocs.io/en/latest/tutorial_debug.html)
- [Debugging with Hardhat Network](https://hardhat.org/tutorial/debugging-with-hardhat-network)

注：本部分內容今後將進行更新。

## 智能合約最佳實踐<a id="smart-contract-best-practices"></a>

要消除智能合約中的安全問題和代碼質量問題，必須學習並遵循 Solidity 編程的最佳實踐。 在此，我們展示了 Solidity 最佳實踐的參考資料。

- [Smart Contract Security Best Practices](best-practices-for-smart-contract-security.md)
- [撰寫安全智慧契約程式碼的最佳實務](https://www.nethermind.io/blog/best-practices-for-writing-secure-smart-contract-code)

## 參考資料<a id="references"></a>

- [Solidity GitHub 頁面](https://github.com/ethereum/solidity)
- [Solidity文檔](https://solidity.readthedocs.io/en/latest/index.html)
- [混音文檔](https://remix-ide.readthedocs.io/en/latest/)
- [Hardhat documentation](https://hardhat.org/docs)
- [Foundry 文件](https://book.getfoundry.sh/)
