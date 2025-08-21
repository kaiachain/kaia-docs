# KaiaGreeter

`KaiaGreeter`是一个返回问候信息的简单合约。 问候信息在部署合同时设置。

## 写作 KaiaGreeter<a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```solidity
// SPDX-License-Identifier：MIT

pragma solidity ^0.8.0;

contract KaiaGreeter {
    /* 定义字符串类型的变量greeting */
    string greeting;
    /* 创建合约时运行一次 */
    constructor (string memory _greeting) {
        greeting = _greeting;
    }
    /* 主函数 */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## 使用 Remix 在线集成开发环境部署 KaiaGreeter<a href="#deploying-kaiagreeter-using-kaia-ide" id="deploying-kaiagreeter-using-kaia-ide"></a>

 - 请访问 [Kaia Plugin for Remix](https://ide.kaia.io) 并创建一个 `KaiaGreeter.sol` 合同。

 - 将上述代码复制并粘贴到新创建的文件中：KaiaGreeter.sol\`。

    ![](/img/build/smart-contracts/kg-v2-create.png)

 - 如果您还没有测试 KAIA，请从 [水龙头](https://faucet.kaia.io) 获取一些测试 KAIA。

 - 部署带有初始参数（问候语）的合同。

 - 部署完成后，可以在集成开发环境中调用 `greet`。

    ![](/img/build/smart-contracts/kg-v2-deployed.png)

## 参考资料<a href="#references" id="references"></a>

有关合同部署详情和 Remix Online IDE 使用指南，请参阅以下文件。

 - [Remix Online IDE](../../../smart-contracts/deployment-and-verification/deploy/deploy.md)