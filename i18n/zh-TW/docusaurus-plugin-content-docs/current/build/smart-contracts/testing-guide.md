# 測試智能合約

在本節中，我們將介紹如何測試智能合約。 由於區塊鏈上的任何交易都是不可逆轉的，因此在部署智能合約之前對其進行測試至關重要。

## 使用松露進行測試<a href="#testing-with-truffle" id="testing-with-truffle"></a>

Truffle 提供了一個自動測試框架。 該框架可讓您以兩種不同的方式編寫簡單、易於管理的測試：

- 在 "Javascript "和 "TypeScript "中，用於從外部世界執行您的合約，就像應用程序一樣。
- 在 "Solidity "中，用於在預付款、裸機情況下執行合同。

### 1. 入門<a href="#1-getting-started" id="1-getting-started"></a>

我們將按照[使用 Truffle 的部署指南](./deploy/deploy.md#truffle)創建合約並進行部署。 不過，在部署之前，我們將在合約中添加一個設置函數 `setGreet` 以進行測試。 源代碼如下。

**注：** 我們對測試合同做了一些修改。

以下是 KaiaGreeting 合同源代碼。

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

    /* Newly added function for testing. */
    function setGreet(string memory _greeting) public {
        // only owner can change greeting message
        require(msg.sender == owner, "Only owner is allowed.");
        greeting = _greeting;
    }
}
```

我們將測試 1) `greet()`函數是否能正確返回 "Hello, Kaia "信息，2) `setGreet()`函數是否能正確設置新的問候語信息，並在非所有者賬戶嘗試更新問候語時進行還原。

首先，我們將為通用斷言安裝 Chai 斷言庫（或你使用的任何其他斷言庫），為智能合約斷言安裝 truffle 斷言庫。

```
npm install --save-dev chai truffle-assertions
```

### 2. 在 Solidity 中編寫測試<a href="#2-writing-test-in-solidity" id="2-writing-test-in-solidity"></a>

使用 Solidity 進行測試比 JavaScript 測試更直觀。 Solidity 測試合同作為 .sol 文件與 JavaScript 測試並存。

在 "test "文件夾中創建名為 "TestKaiaGreeting.sol "的文件。 Truffle 套件為我們提供了用於測試的輔助庫，因此我們需要導入這些庫。 讓我們來看看 Solidity 測試的示例：

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashMarket.sol";
```

- Assert ：它允許我們訪問各種測試函數，如`Assert.equals()`、`Assert.g greaterThan()`等。
- 部署地址（DeployedAddresses）：每次更改合同時，都必須將其重新部署到新地址。 您可以通過該庫獲取已部署的合同地址。

現在，讓我們編寫一段測試代碼。

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/KaiaGreeter.sol";

contract TestKaiaGreeter {

    function testGreetingMessage() public {
        // DeployedAddresses.KaiaGreeter() handles contract address.
        KaiaGreeter greeter = KaiaGreeter(DeployedAddresses.KaiaGreeter());

        string memory expectedGreet = "Hello Kaia";

        string memory greet = greeter.greet();

        Assert.equal(greet, expectedGreet, "greeting message should match");
    }
}
```

運行 Solidity 測試代碼

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKaiaGreeter.sol



  TestKaiaGreeter
    1) testGreetingMessage

    Events emitted during test:
    ---------------------------


    ---------------------------


  0 passing (5s)
  1 failing

  1) TestKaiaGreeter
       testGreetingMessage:
     Error: greeting message should match (Tested: Hello, Kaia, Against: Hello Kaia)
      at result.logs.forEach.log (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:71:1)
      at Array.forEach (<anonymous>)
      at processResult (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:69:1)
      at process._tickCallback (internal/process/next_tick.js:68:7)
```

哎呀，我們失敗了。 讓我們檢查一下錯誤信息，"Error: greeting message should match (Tested: Hello, Kaia, Against: Hello Kaia)"。 我注意到 _string memory expectedGreet = "Hello Kaia"_.\
處漏掉了"'',(逗號)'\`"，請修改代碼並再次運行測試。

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKaiaGreeter.sol



  TestKaiaGreeter
    ✓ testGreetingMessage (58ms)


  1 passing (5s)
```

祝賀你 您的測試已通過。

### 3. 用 JavaScript 編寫測試<a href="#3-writing-test-in-javascript" id="3-writing-test-in-javascript"></a>

Truffle 使用 [Mocha](https://mochajs.org/) 測試框架和 [Chai](https://www.chaijs.com/) 斷言庫，為 JavaScript 測試提供了一個堅實的框架。 JavaScript 測試為您提供了更大的靈活性，使您能夠編寫更復雜的測試。

讓我們在`test`目錄下創建一個文件並命名為`0_KaiaGreeting.js`。

測試代碼是

```javascript
// Interacting directly with KaiaGreeter contract
const KaiaGreeter = artifacts.require("./KaiaGreeter.sol");
const truffleAssert = require('truffle-assertions');

contract("KaiaGreeter", async(accounts) => {
    // store the contract instance at a higher level 
    // to enable access from all functions.
    var klaytnGreeterInstance;
    var owner = accounts[0];
    var greetMsg = "Hello, Kaia";

    // This will run before each test proceed.
    before(async function() {
        // set contract instance into a variable
        klaytnGreeterInstance = await KaiaGreeter.new(greetMsg, {from:owner});
    })

    it("#1 check Greeting message", async function() {
        // set the expected greeting message
        var expectedGreeting = greetMsg;
        var greet= await klaytnGreeterInstance.greet();
        assert.equal(expectedGreeting, greet, "greeting message should match");
        
    })

    it("#2 update greeting message.", async function() {
        var newGreeting = "Hi, Kaia";
        
        await klaytnGreeterInstance.setGreet(newGreeting, { from:owner });
        var greet = await klaytnGreeterInstance.greet();
        assert.equal(newGreeting, greet, "greeting message should match");
    });

    it("#3 [Failure test] Only owner can change greeting.", async function() {
        var fakeOwner = accounts[1];        
        await truffleAssert.fails(klaytnGreeterInstance.setGreet(greetMsg, { from:fakeOwner }));
    });
});
```

如果您不熟悉 "Mocha "單元測試，請查閱[Mocha 文檔](https://mochajs.org/#getting-started)。

- 使用 `contract()` 代替 `describe()`

  從結構上看，Truffle 測試代碼應該與 Mocha 的常規測試代碼沒有太大區別。 您的測試應包含能被 Mocha 識別為自動測試的代碼。 Mocha 和 Truffle 測試的區別在於 contract() 函數。

  **注意**使用`contract()`函數和`accounts`數組來指定可用的 Kaia 賬戶。
- 測試中的合同抽象

  由於 Truffle 無法檢測測試過程中需要與哪個合約交互，因此應明確指定合約。 一種方法是使用 `artifacts.require()` 方法。
- it "語法

  這表示每個測試用例的描述。 說明將在試運行時打印在控制檯上。
- truffle-assertion\` 庫

  通過提供 `truffleAssert.reverts()` 和 `truffleAssert.fails()` 函數，該庫可讓您輕鬆測試還原或其他失敗。

輸出結果如下

```
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: KaiaGreeter
    ✓ #1 check Greeting message
    ✓ #2 update greeting message. (46ms)
    ✓ #3 [Failure test] Only owner can change greeting.


  3 passing (158ms)
```

祝賀你 您的測試已通過。

### 4. 指定測試<a href="#4-specifying-test" id="4-specifying-test"></a>

您可以選擇要執行的測試文件。

```
truffle test ./test/0_KaiaGreeting.js
```

詳情請查看 [Truffle 測試](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts) 和 [Truffle 命令](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test)。
