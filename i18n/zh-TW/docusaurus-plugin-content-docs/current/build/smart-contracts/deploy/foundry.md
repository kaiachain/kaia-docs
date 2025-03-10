# 使用 Foundry 部署智能合約

![](/img/banners/kaia-foundry.png)

## 導言

Foundry 是一個用 Rust 編寫的智能合約開發框架，開發人員可以通過 solidity 腳本從命令行管理和編譯合約、運行測試、部署合約並與網絡交互。

Foundry 由四個主要 CLI 工具組成，可實現快速、模塊化的智能合約開發，它們是

- [Forge](https://github.com/foundry-rs/foundry/tree/master/forge)：  您可以使用 Forge 部署、測試和編譯智能合約。
- [Cast](https://github.com/foundry-rs/foundry/tree/master/cast)：Cast 使與 EVM 智能合約的交互變得簡單。 這包括獲取鏈數據、發送交易等。
- [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil)：您需要啟動本地節點嗎？ Anvil 是 Foundry 提供的本地節點環境。
- [Chisel](https://github.com/foundry-rs/foundry/blob/master/chisel)：快速、實用、冗長的 solidity REPL。

在本指南中，您將

- 創建一個簡單的鑄造項目。
- 使用 Foundry 編譯和測試示例智能合約。
- 使用 Foundry 向 Kaia Kairos 網絡部署智能合約。
- 探索使用鑄鐵和鐵砧分叉主網。

## 先決條件

學習本教程的前提條件如下：

- 代碼編輯器：源代碼編輯器，如 [VS Code](https://code.visualstudio.com/download)。
- [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask)：用於部署合約、簽署事務和與合約交互。
- RPC 端點：您可以從支持的[端點提供者](../../../references/public-en.md)中獲取。
- 從 [Faucet](https://faucet.kaia.io)測試 KAIA：為賬戶注入足夠的 KAIA。
- 安裝 [Rust](https://www.rust-lang.org/tools/install) 和 [Foundry](https://github.com/foundry-rs/foundry#installation)。

## 設置開發環境

要檢查 foundry 安裝是否成功，請運行下面的命令：

```bash
forge -V
```

**輸出**

![](/img/build/get-started/forge-version.png)

成功安裝 Foundry 後，您現在可以使用 Foundry 中的 CLI 工具（鍛造、鑄造、鐵砧、鑿子）。 讓我們按以下步驟建立一個代工廠項目：

**步驟 1**：要啟動一個新項目，請運行以下命令：

```bash
forge init foundry_example 
```

**第 2 步**：進入項目文件夾。

```bash
cd foundry_example
ls	 
```

初始化 foundry 項目後，當前目錄應包括

- **src**：智能合約的默認目錄。
- **測試**：測試的默認目錄。
- **foundry.toml**：默認項目配置文件。
- **lib**：項目依賴項的默認目錄。
- **script**：solidity 腳本文件的默認目錄。

## 智能合約樣本

在本節中，我們將在初始化的代工廠項目中使用示例計數器合同。 src/`文件夾中的`counter.sol\` 文件應如下所示：

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Counter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
```

**代碼演練**

這就是你的智能合約。 **第 1** 行顯示它使用的是 0.8.13 或更高版本的 Solidity。 從第4-12**行開始，創建一個智能合約 "Counter"。 該合約只需使用**setNumber**函數存儲一個新數字，並通過調用**increment\*\*函數將其遞增。

## 測試智能合約

Foundry allows us to write tests in solidity as opposed to writing tests in javascript in other smart contract development frameworks. 在我們初始化的 foundry 項目中，"test/Counter.t.sol "就是一個用 solidity 編寫的測試示例。 代碼如下

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Counter.sol";
contract CounterTest is Test {
    Counter public counter;
    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

上面的代碼顯示您導入了 forge 標準庫和 Counter.sol。

上述測試可檢查以下內容：

- 人數是否在增加？
- 數字是否等於設定的數字？

要檢查測試是否正常，請運行以下命令：

```bash
forge test
```

**輸出**

![](/img/build/get-started/forge-test.png)

要了解有關編寫測試、高級測試和其他功能的更多信息，請參閱 [Foundry 文檔](https://book.getfoundry.sh/forge/tests)。

## 編制合同

使用此命令編譯合同：

```bash
forge build 
```

## 部署您的合同

要使用 foundry 部署合同，必須提供 RPC URL 和將部署合同的賬戶的私鑰。 請查看 Kaia 上的 [rpc-providers](../../../references/public-en.md) 列表，找到您的 rpc-url，並使用 [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask) 創建一個賬戶。

**第 1 步**：要將合同部署到 Kaia Kairos 網絡，請運行以下命令：

```bash
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/Counter.sol:Counter
```

**舉例**

```bash
forge create --rpc-url https://public-en-kairos.node.kaia.io --private-key hhdhdhdhprivatekeyhdhdhud src/Counter.sol:Counter
```

**警告：用 MetaMask 中的私人密鑰替換私人密鑰參數。 請務必小心，不要暴露您的私人密鑰**。

**輸出**

![](/img/build/get-started/foundry-create.png)

**第 2 步**：打開 [Kaiascope](https://kairos.kaiascope.com/tx/0x83c8b55f3fd90110f9b83cd20df2b2bed76cfeb42447725af2d60b2885f479d3?tabId=internalTx)，檢查計數器合約是否部署成功。

**第 3 步**：在搜索欄中複製並粘貼交易哈希值，然後按 Enter 鍵。 您應該能看到最近部署的合同。

![](/img/build/get-started/forge-scope.png)

## 與合同互動

成功部署智能合約後，您需要正確調用和執行函數。 讓我們使用 [Cast](https://book.getfoundry.sh/reference/cast/cast-send.html) 與 Kaia Kairos Network 上部署的合約互動吧。  在本節中，您將學習如何使用 [cast call](https://book.getfoundry.sh/reference/cast/cast-call) 執行 "只讀 "函數和 [cast send](https://book.getfoundry.sh/reference/cast/cast-send) 執行 "寫入 "函數。

**A. 調用**：要獲取存儲在合約中的數字，需要調用 `number` 函數。 運行下面的命令查看實際操作。

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url RPC-API-ENDPOINT-HERE
```

**舉例**

```bash
cast call 0x7E80F70EeA1aF481b80e2F128490cC9F7322e164 "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**輸出**

![](/img/build/get-started/cast-call-number.png)

您應該得到十六進制格式的數據：

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```

不過，為了得到您想要的結果，請使用投影法轉換上述結果。 在這種情況下，數據是一個數字，因此可以將其轉換為基數 10，得到結果 0：

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```

**輸出**

![](/img/build/get-started/cast-call-0.png)

**B. 發送**：要簽署併發佈一個事務，例如在計數器合約中執行一個 `setNumber` 函數，請運行下面的命令：

```bash
cast send --rpc-url=<RPC-URL> <CONTRACT-ADDRESS> “setNumber(uint256)” arg --private-key=<PRIVATE-KEY>
```

**舉例**

```bash
cast send --rpc-url=https://public-en-kairos.node.kaia.io 0x7E80F70EeA1aF481b80e2F128490cC9F7322e164 "setNumber(uint256)"  10 --private-key=<private key>
```

**輸出**

![](/img/build/get-started/cast-send-setNum.png)

**交叉檢查編號**

```bash
cast call 0x7E80F70EeA1aF481b80e2F128490cC9F7322e164 "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**輸出**

![](/img/build/get-started/cast-call-10.png)

您應該得到十六進制格式的數據：

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```

不過，為了得到您想要的結果，請使用投影法轉換上述結果。 在本例中，數據是一個數字，因此可以將其轉換為基數 10，得到結果 10：

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```

**輸出**

![](/img/build/get-started/cast-call-result-10.png)

## 使用 Cast 和 Anvil 分叉主網

Foundry 允許我們將主網分叉到本地開發網絡（[Anvil](https://book.getfoundry.sh/reference/anvil/)）。 此外，您還可以使用 [Cast](https://book.getfoundry.sh/reference/cast/)，在真實網絡上與合同進行交互和測試。

### 開始

現在，您已經啟動並運行了 Foundry 項目，可以運行下面的命令 fork 主網：

```bash
anvil --fork-url rpc-url
```

**舉例**

```bash
anvil --fork-url https://archive-en.node.kaia.io
```

**輸出**

![](/img/build/get-started/anvil-localnode.png)

成功運行該命令後，您的終端看起來就像上圖一樣。 您將擁有 10 個賬戶，這些賬戶擁有公鑰和私鑰以及 10,000 個預付代幣。 分叉鏈的 RPC 服務器正在偵聽 `127.0.0.1:8545`。

要驗證您是否已分叉網絡，可以查詢最新的區塊編號：

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

您可以使用 [十六進制轉十進制](https://www.rapidtables.com/convert/number/hex-to-decimal.html)轉換上述任務的結果。 您應該從分叉網絡時獲得最新的區塊編號。 要驗證這一點，請對照 [Kaiascope](https://kaiascope.com/block/118704896?tabId=txList)上的區塊編號。

### 插圖

在本節中，您將瞭解如何將 oUSDC 代幣從持有 oUSDC 的人轉入 Anvil 創建的賬戶 (0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)

**轉移 oUSDC**

訪問 Kaiascope 並搜索 oUSDC 代幣持有者（此處）。 讓我們隨便選一個賬戶。 在本例中，我們將使用 `0x8e61241e0525bd45cfc43dd7ba0229b422545bca`。

讓我們將合同和賬戶導出為環境變量：

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export oUSDC=0x754288077d0ff82af7a5317c7cb8c444d421d103
export oUSDCHolder=0x8e61241e0525bd45cfc43dd7ba0229b422545bca
```

我們可以使用投幣電話查看鮑勃的餘額：

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**輸出**

![](/img/build/get-started/oUsdcBob4.png)

同樣，我們也可以使用調用功能查看 oUSDC 持有者的餘額：

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**輸出**

![](/img/build/get-started/oUsdcHolder4.png)

讓我們使用 "發送 "功能將一些代幣從幸運用戶轉給 Alice：

````bash
cast rpc anvil_impersonateAccount $oUSDCHolder    
cast send $oUSDC \
--unlocked \
--from $oUSDCHolder\
 "transfer(address,uint256)(bool)" \
 $BOB \
 1000000
```0000
````

**輸出**

![](/img/build/get-started/cast-send.png)

讓我們檢查一下轉賬是否成功：

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**輸出**

![](/img/build/get-started/oUsdcBobAfter.png)

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**輸出**

![](/img/build/get-started/oUsdcHolderAfter.png)

有關代工的更深入指南，請參閱 [Foundry Docs](https://book.getfoundry.sh/)。 此外，您還可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/foundry) 上找到本指南的完整實現代碼。