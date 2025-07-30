# Deploy Smart Contracts

There are various ways of deploying a smart contract on Kaia. This document provides a step-by-step guide to deploy a sample contract using Remix IDE. 

For this guide we will use [Kaia Toolkit](https://toolkit.kaia.io/account/) for account generation and the account generated will be used for signing transaction via the Remix Kaia Plugin.

## Remix Online IDE <a id="remix-ide"></a>

Open your internet browser and go to [Kaia Plugin for Remix](https://ide.kaia.io).

1. Add a new file.

![](/img/build/smart-contracts/d-remix-create.png)

2. Copy and paste the following sample code (or any code you want to deploy) in the new file. The code  below is CoinFlip contract designed to enable two players to participate in a game where the winner takes the pool. 

```solidity
// SPDX-License-Identifier: MIT
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
        winner = result == 0 ? 1 : 2;
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

3. Select Compiler in the icon panel. Click **Compile Coinflip.sol** button to compile the sample code before actual deployment.

![](/img/build/smart-contracts/d-remix-compile.png)

4. Choose the desired EVM environment In the Kaia plugin tab. For this guide, we will select Kairos (testnet).

![](/img/build/smart-contracts/d-remix-env.png)

Next is to import an account to sign our transactions. You can either export your private key from any Kaia compatible wallets or generate a dev account using Kaia Toolkit. For this guide we will generate a dev account using [Kaia Toolkit](https://toolkit.kaia.io/account)

5. Import an account by clicking the plus button next to Account. 

![](/img/build/smart-contracts/d-remix-import-account.png)

:::note
Make sure that the account has sufficient KAIA to pay for the transaction of deploying the smart contracts. Get some test KAIA from the [faucet](https://faucet.kaia.io/) if you don’t already have test KAIA.
:::

6. Set Gas limit and Value to send. 

- You may need to set higher Gas limit if you are deploying a more complicated contract. In this example, you can leave it as it is.
- Set `Value` to 0 unless you want to send `KAIA` to the contract at the time of deployment.


7. Click on the **Deploy** button

If the contract is successfully deployed, you will see the corresponding transaction hash in the terminal and can verify on [Kaiascan](https://kairos.kaiascan.io)

![](/img/build/smart-contracts/d-remix-deploy-btn.png)

![](/img/build/smart-contracts/d-remix-txhash.png)

8. You can interact with the contract by clicking on the function buttons. 

The functions are represented in different colors. `pure` or `view` functions in Solidity have blue bottons (`player1`, `player2`, `pool` et al. in the example) and do not create a new transaction, so they don't cost any gas. Red buttons (`enter` in the example) represent `payable` functions that change the state on the blockchain, consume gas and can accept value. Orange buttons (`flipCoin` in the example) are for `non-payable` functions that change the contract state but do NOT accept a value.

![](/img/build/smart-contracts/d-remix-deployed.png)

Congratulations if you made it to the end of this guide. If you have any questions, visit the [Kaia Forum](https://devforum.kaia.io/). However, below is a list of useful resources you might need while further building with Remix IDE on Kaia.

* [Remix Documentation](https://remix-ide.readthedocs.io/en/latest/)