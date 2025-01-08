# 部署智能合約

在 Kaia 上部署智能合約有多種方法。 本文檔提供了使用各種工具部署合同樣本的分步指南。 我們假定您的 Kaia 賬戶有足夠的 KAIA 支付交易費。 要創建賬戶，您可以使用 [Kaia 在線工具包](https://toolkit.kaia.io/account/accountKeyLegacy)"。

## Remix 在線集成開發環境<a id="remix-ide"></a>

打開互聯網瀏覽器，進入 [Kaia Plugin for Remix](https://ide.kaia.io)。

1. 添加新文件。

![](/img/build/smart-contracts/01_deployment_ide.png)

2. 複製並粘貼以下示例代碼（或任何您想部署的代碼）到新文件中。 代碼由兩個名為 Mortal 和 KaiaGreeter 的合約組成，可以運行一個簡單的 "Hello World!"。

```
pragma solidity 0.5.12;

contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KaiaGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

3. 在圖標面板中選擇 "編譯器"。 選擇所需的 EVM 環境。 對於 Kaia 網絡，您可以選擇 Kairos（測試網絡）和 Mainnet。 當示例代碼準備好在實際部署前編譯時，單擊 "編譯"。

![](/img/build/smart-contracts/02_deployment_compile.png)

4. 現在我們可以部署合同了。 點擊圖標面板中的 Kaia 徽標。 單擊 "賬戶 "旁邊的加號按鈕，導入一個賬戶。 確保賬戶有足夠的 KAIA 來支付部署所需的智能合約的交易費用。

![](/img/build/smart-contracts/05_deployment_account.png)

5. 設置氣體限值和發送值。

- 如果部署的是更復雜的合同，可能需要設置更高的氣體限值。 在本例中，可以保持原樣。
- 將 `Value` 設為 0，除非您想在部署時向合同發送 `KAIA`。

6. 輸入 "Hello World!"作為構造函數的參數，然後點擊 "部署 "按鈕。

![](/img/build/smart-contracts/03_deployment_hello.png)

7. 如果合同部署成功，您將在終端看到相應的交易收據和詳細結果。

8. 您可以通過點擊功能按鈕與合同互動。 這些功能用不同的顏色表示。 Solidity中的 "constant "或 "pure "函數有藍色的底色（示例中的 "greet"），不會創建新的事務，因此不耗費任何氣體。 紅色按鈕（示例中的 "kill"）代表 "可支付 "功能，可改變區塊鏈上的狀態、消耗氣體並可接受價值。 橙色按鈕用於更改合同狀態但不接受值的 "非支付 "功能。

![](/img/build/smart-contracts/06_deployment_functions.png)

有關詳細信息，請參閱此 [鏈接](../ide-and-tools/ide-and-tools.md)。

## VVISP <a id="vvisp"></a>

vvisp 是一種易於使用的 CLI 工具/框架，用於開發智能合約，由 HEACHI LABS 提供。 只需一個命令，您就可以輕鬆設置環境、部署和執行 Kaia 智能合約。 詳情請參考以下鏈接。

- https://henesis.gitbook.io/vvisp/deploying-smart-contracts

## solc & caver-js <a id="solc-caver-js"></a>

另一種部署合同的方法是使用 solc 手動編譯合同，然後使用 caver-js 進行部署。

1. 創建 `KaiaGreeter.sol` 並編寫以下代碼。

```
pragma solidity 0.5.6;

contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KaiaGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

2. 安裝 solc 0.5.6。

```
$ sudo npm install -g solc@0.5.6
```

3. 編制合同。

```
$ solcjs KaiaGreeter.sol --bin
```

4. 安裝 caver-js。

```
$ npm install caver-js.
```

5. 使用以下代碼在同一目錄下創建 `deploy.js`。

```
const Caver = require("caver-js");
const caver = new Caver("https://public-en-kairos.node.kaia.io")

const walletInstance = caver.kaia.accounts.privateKeyToAccount(
  '0x3de0c9...' // enter your private key to deploy contract with
);
caver.kaia.accounts.wallet.add(walletInstance);

const fs = require('fs')
const bytecode = fs.readFileSync('./KaiaGreeter_sol_KaiaGreeter.bin') // compiled output

const constructorType = ['string']  // enter appropriate constructor type
const constructorValue = ['Hello, Kaia!']

const params = caver.kaia.abi.encodeParameters(constructorType, constructorValue);

caver.kaia.sendTransaction({
  from: caver.kaia.accounts.wallet[0].address,
  gas: "50000000",
  data: bytecode.toString() + params.substring(2, params.length)
})
.once("receipt", receipt => {
  console.log(receipt)
})
.once("error", error => {
  console.log(error);
})
```

_注_：此示例不建議用於生產。 處理私人密鑰時要非常小心。

6. 使用節點環境部署合同。

```
$ node deploy.js
```
