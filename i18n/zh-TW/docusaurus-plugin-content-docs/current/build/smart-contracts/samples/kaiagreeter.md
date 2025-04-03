# KaiaGreeter

`KaiaGreeter`是一個返回問候信息的簡單合約。 問候信息在部署合同時設置。

## 寫作 KaiaGreeter<a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

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

## 使用 Remix 在線集成開發環境部署 KaiaGreeter<a href="#deploying-kaiagreeter-using-kaia-ide" id="deploying-kaiagreeter-using-kaia-ide"></a>

- 請訪問 [Kaia Plugin for Remix](https://ide.kaia.io) 並創建 "KaiaGreeter "合同。 上文提供了完整的源代碼。
- 準備用於部署合同的賬戶。
  - If you do not have an account yet, create one using [Kaia Toolkit](https://toolkit.kaia.io/account/).
  - Get some test KAIA from the faucet - [Faucet](https://faucet.kaia.io)
- 部署帶有初始參數（問候語）的合同。
- 部署完成後，可以在集成開發環境中調用 `greet`。

## 參考資料<a href="#references" id="references"></a>

有關合同部署詳情和 Remix Online IDE 使用指南，請參閱以下文件。

- [Remix 在線集成開發環境](../../smart-contracts/ide-and-tools/ide-and-tools.md#kaia-ide)
- [部署指南](../deploy/deploy.md)