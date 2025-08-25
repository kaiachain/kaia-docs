# KaiaGreeter

`KaiaGreeter`是一個返回問候信息的簡單合約。 問候信息在部署合同時設置。

## 寫作 KaiaGreeter<a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```solidity
// SPDX-License-Identifier：MIT

pragma solidity ^0.8.0;

contract KaiaGreeter {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    constructor (string memory _greeting) {
        greeting = _greeting;
    }
    /* 主功能 */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## 使用 Remix 在線集成開發環境部署 KaiaGreeter<a href="#deploying-kaiagreeter-using-kaia-ide" id="deploying-kaiagreeter-using-kaia-ide"></a>

 - 請造訪 [Kaia Plugin for Remix](https://ide.kaia.io) 並建立一個 `KaiaGreeter.sol` 合約。

 - 複製並貼上上述程式碼到您新建立的檔案中：KaiaGreeter.sol\`。

    ![](/img/build/smart-contracts/kg-v2-create.png)

 - 如果您還沒有測試 KAIA，請從 [水龍頭](https://faucet.kaia.io) 取得一些測試 KAIA。

 - 部署帶有初始參數（問候語）的合同。

 - 部署完成後，可以在集成開發環境中調用 `greet`。

    ![](/img/build/smart-contracts/kg-v2-deployed.png)

## 參考資料<a href="#references" id="references"></a>

有關合同部署詳情和 Remix Online IDE 使用指南，請參閱以下文件。

 - [Remix Online IDE](../../../smart-contracts/deployment-and-verification/deploy/deploy.md)