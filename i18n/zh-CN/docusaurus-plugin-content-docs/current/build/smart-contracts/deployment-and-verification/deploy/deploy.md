# 部署智能合约

在 Kaia 上部署智能合约有多种方法。 本文档提供了使用 Remix IDE 部署示例合同的分步指南。

在本指南中，我们将使用 [Kaia Toolkit](https://toolkit.kaia.io/account/) 生成账户，生成的账户将用于通过 Remix Kaia 插件签署交易。

## Remix 在线集成开发环境<a id="remix-ide"></a>

打开互联网浏览器，进入 [Kaia Plugin for Remix](https://ide.kaia.io)。

1. 添加新文件。

![](/img/build/smart-contracts/d-remix-create.png)

2. 复制并粘贴以下示例代码（或任何您想部署的代码）到新文件中。 下面的代码是 CoinFlip 合约，旨在让两名玩家参与游戏，胜者获得彩池。

```solidity
// SPDX-License-Identifier：MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public player1;
    address public player2;
    uint256 public pool;
    uint256 public winner;
    address public winnerAddress;
    
    event GameStarted(address indexed player1, address indexed player2, uint256 pool);
    event GameFinished(address indexed winnerAddress, string winner, uint256 pool);
    
    function enter() public payable {
        require(msg. value == 0.01 ether, "Must send 0.01 Kaia to enter"; if (0.01 ether == 0.01 ether, "Must send 0.01 Kaia to enter").value == 0.01 ether, "Must send 0.01 Kaia to enter");
        if (player1 == address(0)) {
            player1 = msg.sender;
        } else {
            require(player2 == address(0), "Both players have already entered");
            player2 = msg.sender;
            emit GameStarted(player1, player2, pool);
        }
        pool += msg.value;
        winner = 0;
        winnerAddress = address(0);
    }
    
    function flipCoin() public {
        require(msg.sender == player1 || msg.sender == player2, "发件人不是玩家");
        uint256 result = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, block.coinbase))) % 2;
        winner = result == 0 ?1 : 2;
        winnerAddress = winner == 1 ? player1 : player2;
        string memory winnerName = winner == 1 ? "player1" : "player2";
        emit GameFinished(winnerAddress, winnerName, pool);
        payable(winnerAddress).transfer(pool);
        pool = 0;
        player1 = address(0);
        player2 = address(0);
    }
}
```

3. 在图标面板中选择 "编译器"。 单击 **Compile Coinflip.sol** 按钮，在实际部署前编译示例代码。

![](/img/build/smart-contracts/d-remix-compile.png)

4. 在 Kaia 插件选项卡中选择所需的 EVM 环境。 在本指南中，我们将选择 Kairos (testnet)。

![](/img/build/smart-contracts/d-remix-env.png)

下一步是导入一个账户来签署我们的交易。 您可以从任何与 Kaia 兼容的钱包中导出私钥，也可以使用 Kaia 工具包生成一个开发者账户。 在本指南中，我们将使用 [Kaia Toolkit](https://toolkit.kaia.io/account) 生成一个开发者账户。

5. 点击账户旁边的加号按钮，导入一个账户。

![](/img/build/smart-contracts/d-remix-import-account.png)

:::note
确保账户有足够的 KAIA 来支付部署智能合约的交易费用。 如果您还没有测试 KAIA，请从 [水龙头](https://faucet.kaia.io/) 获取一些测试 KAIA。
:::

6. 设置气体限值和发送值。

- 如果部署的是更复杂的合同，可能需要设置更高的气体限值。 在本例中，可以保持原样。
- 将 `Value` 设为 0，除非您想在部署时向合同发送 `KAIA`。

7. 点击**部署**按钮

如果合约部署成功，您将在终端看到相应的交易哈希值，并可在 [Kaiascan](https://kairos.kaiascan.io) 上进行验证。

![](/img/build/smart-contracts/d-remix-deploy-btn.png)

![](/img/build/smart-contracts/d-remix-txhash.png)

8. 您可以通过点击功能按钮与合同互动。

这些功能用不同的颜色表示。 在 Solidity 中，"pure "或 "view "函数有蓝色的底部（示例中的 "player1"、"player2"、"pool "等），不会创建新的事务，因此不会耗费任何气体。 红色按钮（示例中的 "输入"）代表 "可支付 "功能，可改变区块链上的状态、消耗气体并可接受价值。 橙色按钮（示例中的 "flipCoin"）用于 "非支付 "功能，可改变合约状态，但不接受数值。

![](/img/build/smart-contracts/d-remix-deployed.png)

如果您读完了本指南，恭喜您。 如果您有任何问题，请访问 [Kaia 论坛](https://devforum.kaia.io/)。 不过，以下是您在 Kaia 上使用 Remix IDE 进一步构建时可能需要的有用资源列表。

- [混音文档](https://remix-ide.readthedocs.io/en/latest/)