# 部署智能合约

在 Kaia 上部署智能合约有多种方法。 本文档提供了使用各种工具部署合同样本的分步指南。 我们假定您的 Kaia 账户有足够的 KAIA 支付交易费。 要创建账户，您可以使用 [Kaia Toolkit](https://toolkit.kaia.io/account/)"。

## Remix 在线集成开发环境<a id="remix-ide"></a>

打开互联网浏览器，进入 [Kaia Plugin for Remix](https://ide.kaia.io)。

1. 添加新文件。

![](/img/build/smart-contracts/01_deployment_ide.png)

2. 复制并粘贴以下示例代码（或任何您想部署的代码）到新文件中。 代码由两个名为 Mortal 和 KaiaGreeter 的合约组成，可以运行一个简单的 "Hello World!"。

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

3. 在图标面板中选择 "编译器"。 选择所需的 EVM 环境。 对于 Kaia 网络，您可以选择 Kairos（测试网络）和 Mainnet。 当示例代码准备好在实际部署前编译时，单击 "编译"。

![](/img/build/smart-contracts/02_deployment_compile.png)

4. 现在我们可以部署合同了。 点击图标面板中的 Kaia 徽标。 单击 "账户 "旁边的加号按钮，导入一个账户。 确保账户有足够的 KAIA 来支付部署所需的智能合约的交易费用。

![](/img/build/smart-contracts/05_deployment_account.png)

5. 设置气体限值和发送值。

- 如果部署的是更复杂的合同，可能需要设置更高的气体限值。 在本例中，可以保持原样。
- 将 `Value` 设为 0，除非您想在部署时向合同发送 `KAIA`。

6. 输入 "Hello World!"作为构造函数的参数，然后点击 "部署 "按钮。

![](/img/build/smart-contracts/03_deployment_hello.png)

7. 如果合同部署成功，您将在终端看到相应的交易收据和详细结果。

8. 您可以通过点击功能按钮与合同互动。 这些功能用不同的颜色表示。 Solidity中的 "constant "或 "pure "函数有蓝色的底色（示例中的 "greet"），不会创建新的事务，因此不耗费任何气体。 红色按钮（示例中的 "kill"）代表 "可支付 "功能，可改变区块链上的状态、消耗气体并可接受价值。 橙色按钮用于更改合同状态但不接受值的 "非支付 "功能。

![](/img/build/smart-contracts/06_deployment_functions.png)

有关详细信息，请参阅此 [链接](../ide-and-tools/ide-and-tools.md)。

## VVISP <a id="vvisp"></a>

vvisp 是一种易于使用的 CLI 工具/框架，用于开发智能合约，由 HEACHI LABS 提供。 只需一个命令，您就可以轻松设置环境、部署和执行 Kaia 智能合约。 详情请参考以下链接。

- https://henesis.gitbook.io/vvisp/deploying-smart-contracts

## solc & caver-js <a id="solc-caver-js"></a>

另一种部署合同的方法是使用 solc 手动编译合同，然后使用 caver-js 进行部署。

1. 创建 `KaiaGreeter.sol` 并编写以下代码。

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

2. 安装 solc 0.5.6。

```
$ sudo npm install -g solc@0.5.6
```

3. 编制合同。

```
$ solcjs KaiaGreeter.sol --bin
```

4. 安装 caver-js。

```
$ npm install caver-js.
```

5. 使用以下代码在同一目录下创建 `deploy.js`。

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

_注_：此示例不建议用于生产。 处理私人密钥时要非常小心。

6. 使用节点环境部署合同。

```
$ node deploy.js
```