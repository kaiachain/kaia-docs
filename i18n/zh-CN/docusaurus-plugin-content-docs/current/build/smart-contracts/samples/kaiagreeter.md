# KaiaGreeter

`KaiaGreeter`是一个返回问候信息的简单合约。 问候信息在部署合同时设置。

## 写作 KaiaGreeter<a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
}

contract KaiaGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## 使用 Remix 在线集成开发环境部署 KaiaGreeter<a href="#deploying-kaiagreeter-using-kaia-ide" id="deploying-kaiagreeter-using-kaia-ide"></a>

- 请访问 [Kaia Plugin for Remix](https://ide.kaia.io) 并创建 "KaiaGreeter "合同。 上文提供了完整的源代码。
- 准备用于部署合同的账户。
  - 如果您还没有账户，请使用 [Kaia Toolkit](https://toolkit.kaia.io/account/) 创建一个账户。
  - 从水龙头获取一些测试 KAIA - [Faucet](https://faucet.kaia.io)
- 部署带有初始参数（问候语）的合同。
- 部署完成后，可以在集成开发环境中调用 `greet`。

## 参考资料<a href="#references" id="references"></a>

有关合同部署详情和 Remix Online IDE 使用指南，请参阅以下文件。

- [Remix 在线集成开发环境](../../smart-contracts/ide-and-tools/ide-and-tools.md#kaia-ide)
- [部署指南](../deploy/deploy.md)