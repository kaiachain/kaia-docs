# 测试智能合约

在本节中，我们将介绍如何测试智能合约。 由于区块链上的任何交易都是不可逆转的，因此在部署智能合约之前对其进行测试至关重要。

## 使用松露进行测试<a href="#testing-with-truffle" id="testing-with-truffle"></a>

Truffle 提供了一个自动测试框架。 该框架可让您以两种不同的方式编写简单、易于管理的测试：

- 在 "Javascript "和 "TypeScript "中，用于从外部世界执行您的合约，就像应用程序一样。
- 在 "Solidity "中，用于在预付款、裸机情况下执行合同。

### 1. 入门<a href="#1-getting-started" id="1-getting-started"></a>

我们将按照[使用 Truffle 的部署指南](./deploy/deploy.md#truffle)创建合约并进行部署。 不过，在部署之前，我们将在合约中添加一个设置函数 `setGreet` 以进行测试。 源代码如下。

**注：** 我们对测试合同做了一些修改。

以下是 KaiaGreeting 合同源代码。

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

我们将测试 1) `greet()`函数是否能正确返回 "Hello, Kaia "信息，2) `setGreet()`函数是否能正确设置新的问候语信息，并在非所有者账户尝试更新问候语时进行还原。

首先，我们将为通用断言安装 Chai 断言库（或你使用的任何其他断言库），为智能合约断言安装 truffle 断言库。

```
npm install --save-dev chai truffle-assertions
```

### 2. 在 Solidity 中编写测试<a href="#2-writing-test-in-solidity" id="2-writing-test-in-solidity"></a>

使用 Solidity 进行测试比 JavaScript 测试更直观。 Solidity 测试合同作为 .sol 文件与 JavaScript 测试并存。

在 "test "文件夹中创建名为 "TestKaiaGreeting.sol "的文件。 Truffle 套件为我们提供了用于测试的辅助库，因此我们需要导入这些库。 让我们来看看 Solidity 测试的示例：

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashMarket.sol";
```

- Assert ：它允许我们访问各种测试函数，如`Assert.equals()`、`Assert.g greaterThan()`等。
- 部署地址（DeployedAddresses）：每次更改合同时，都必须将其重新部署到新地址。 您可以通过该库获取已部署的合同地址。

现在，让我们编写一段测试代码。

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

运行 Solidity 测试代码

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

哎呀，我们失败了。 让我们检查一下错误信息，"Error: greeting message should match (Tested: Hello, Kaia, Against: Hello Kaia)"。 我注意到 _string memory expectedGreet = "Hello Kaia"_.\
处漏掉了"'',(逗号)'\`"，请修改代码并再次运行测试。

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

祝贺你 您的测试已通过。

### 3. 用 JavaScript 编写测试<a href="#3-writing-test-in-javascript" id="3-writing-test-in-javascript"></a>

Truffle 使用 [Mocha](https://mochajs.org/) 测试框架和 [Chai](https://www.chaijs.com/) 断言库，为 JavaScript 测试提供了一个坚实的框架。 JavaScript 测试为您提供了更大的灵活性，使您能够编写更复杂的测试。

让我们在`test`目录下创建一个文件并命名为`0_KaiaGreeting.js`。

测试代码是

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

如果您不熟悉 "Mocha "单元测试，请查阅[Mocha 文档](https://mochajs.org/#getting-started)。

- 使用 `contract()` 代替 `describe()`

  从结构上看，Truffle 测试代码应该与 Mocha 的常规测试代码没有太大区别。 您的测试应包含能被 Mocha 识别为自动测试的代码。 Mocha 和 Truffle 测试的区别在于 contract() 函数。

  **注意**使用`contract()`函数和`accounts`数组来指定可用的 Kaia 账户。
- 测试中的合同抽象

  由于 Truffle 无法检测测试过程中需要与哪个合约交互，因此应明确指定合约。 一种方法是使用 `artifacts.require()` 方法。
- it "语法

  这表示每个测试用例的描述。 说明将在试运行时打印在控制台上。
- truffle-assertion\` 库

  通过提供 `truffleAssert.reverts()` 和 `truffleAssert.fails()` 函数，该库可让您轻松测试还原或其他失败。

输出结果如下

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

祝贺你 您的测试已通过。

### 4. 指定测试<a href="#4-specifying-test" id="4-specifying-test"></a>

您可以选择要执行的测试文件。

```
truffle test ./test/0_KaiaGreeting.js
```

详情请查看 [Truffle 测试](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts) 和 [Truffle 命令](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test)。
