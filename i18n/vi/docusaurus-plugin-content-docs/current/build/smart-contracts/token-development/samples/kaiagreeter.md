# KaiaGreeter

`KaiaGreeter` is a simple contract that returns a greeting message. Greeting message is set when the contract is deployed.

## Writing KaiaGreeter <a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract KaiaGreeter {
    /* Định nghĩa biến greeting có kiểu string */
    string greeting;
    /* Hàm này chạy một lần khi contract được tạo */
    constructor (string memory _greeting) {
        greeting = _greeting;
    }
    /* Hàm chính */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Deploying KaiaGreeter using Remix Online IDE <a href="#deploying-kaiagreeter-using-kaia-ide" id="deploying-kaiagreeter-using-kaia-ide"></a>

- Vui lòng truy cập [Kaia Plugin for Remix](https://ide.kaia.io) và tạo hợp đồng `KaiaGreeter.sol`.

- Sao chép và dán mã ở trên vào tệp bạn vừa tạo: `KaiaGreeter.sol`.

  ![](/img/build/smart-contracts/kg-v2-create.png)

- Nhận một số KAIA thử nghiệm từ [vòi](https://faucet.kaia.io) nếu bạn chưa có KAIA thử nghiệm.

- Deploy the contract with initial parameter, a greeting message.

- After deploying, you can invoke `greet` from the IDE.

  ![](/img/build/smart-contracts/kg-v2-deployed.png)

## References <a href="#references" id="references"></a>

For the details of contract deployment and the Remix Online IDE usage guideline, please refer to the following documents.

- [Remix Trình soạn thảo mã nguồn trực tuyến](../../../smart-contracts/deployment-and-verification/deploy/deploy.md)