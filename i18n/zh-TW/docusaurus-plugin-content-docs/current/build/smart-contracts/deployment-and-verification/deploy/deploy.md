# 部署智能合約

在 Kaia 上部署智能合約有多種方法。 本文件提供使用 Remix IDE 部署範例合約的逐步指南。

在本指南中，我們將使用 [Kaia Toolkit](https://toolkit.kaia.io/account/) 來產生帳號，所產生的帳號將使用 Remix Kaia 外掛程式來簽署交易。

## Remix 在線集成開發環境<a id="remix-ide"></a>

打開互聯網瀏覽器，進入 [Kaia Plugin for Remix](https://ide.kaia.io)。

1. 添加新文件。

![](/img/build/smart-contracts/d-remix-create.png)

2. 複製並粘貼以下示例代碼（或任何您想部署的代碼）到新文件中。 下面的程式碼是 CoinFlip 合約，設計用來讓兩位玩家參與一場贏家拿走彩池的遊戲。

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
        require(msg.value == 0.01 ether, "Must send 0.01 Kaia to enter");
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
        require(msg.sender == player1 || msg.sender == player2, "Sender is not a player");
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

3. 在圖標面板中選擇 "編譯器"。 按一下 **Compile Coinflip.sol** 按鈕，在實際部署前編譯範例程式碼。

![](/img/build/smart-contracts/d-remix-compile.png)

4. 選擇所需的 EVM 環境 在 Kaia 外掛程式索引標籤中。 在本指南中，我們將選擇 Kairos (testnet)。

![](/img/build/smart-contracts/d-remix-env.png)

接下來是匯入一個帳戶來簽署我們的交易。 您可以從任何 Kaia 相容的錢包匯出私人金鑰，或是使用 Kaia Toolkit 產生一個開發者帳戶。 在本指南中，我們將使用 [Kaia Toolkit](https://toolkit.kaia.io/account) 產生一個開發者帳戶。

5. 按一下帳戶旁邊的加號按鈕，匯入一個帳戶。

![](/img/build/smart-contracts/d-remix-import-account.png)

:::note
確保帳戶有足夠的 KAIA 來支付部署智慧型契約的交易。 如果您還沒有測試 KAIA，請從 [水龍頭](https://faucet.kaia.io/) 取得一些測試 KAIA。
:::

6. 設置氣體限值和發送值。

- 如果部署的是更復雜的合同，可能需要設置更高的氣體限值。 在本例中，可以保持原樣。
- 將 `Value` 設為 0，除非您想在部署時向合同發送 `KAIA`。

7. 按一下 \*\* 部署\*\* 按鈕

如果合約部署成功，您會在終端看到對應的交易哈希值，並可以在 [Kaiascan](https://kairos.kaiascan.io) 上驗證。

![](/img/build/smart-contracts/d-remix-deploy-btn.png)

![](/img/build/smart-contracts/d-remix-txhash.png)

8. 您可以通過點擊功能按鈕與合同互動。

這些功能用不同的顏色表示。 在 Solidity 中的 `pure` 或 `view` 函式有藍色的 bottons (範例中的 `player1`, `player2`, `pool` 等)，並且不會建立新的交易，所以它們不花費任何汽油。 紅色按鈕 (範例中的 `enter`) 代表「可付費」功能，可改變區塊鏈上的狀態、消耗瓦斯並可接受價值。 橙色按鈕 (範例中的 `flipCoin`) 用於改變契約狀態但不接受值的「非付費」功能。

![](/img/build/smart-contracts/d-remix-deployed.png)

如果您成功完成本指南，恭喜您。 如果您有任何問題，請造訪 [Kaia 論壇](https://devforum.kaia.io/)。 不過，以下是您在 Kaia 上使用 Remix IDE 進一步建構時可能需要的有用資源清單。

- [Remix Documentation](https://remix-ide.readthedocs.io/en/latest/)