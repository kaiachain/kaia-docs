# 奥拉克尔网络

![](/img/banners/kaia-orakl.png)

## 导言

[Orakl Network](https://docs.orakl.network) 是一个去中心化的甲骨文网络，允许智能合约安全地访问链外数据和其他资源。 它引以为豪的是，自己是一个提供 [Data Feed](https://docs.orakl.network/developers-guide/data-feed)、[VRF](https://docs.orakl.network/developers-guide/vrf)、[Request-Response](https://docs.orakl.network/developers-guide/request-response) 和 [Proof of Reserve](https://docs.orakl.network/developers-guide/proof-of-reserve) 解决方案的本地令牌交易系统。

有了 Orakl 网络，用户可以在智能合约中寻找不可预测、无偏见的随机性。 Orakl Network [Verifiable Random Function (VRF)](https://docs.orakl.network/developers-guide/vrf#what-is-verifiable-random-function)允许智能合约生成可验证的随机值，可用于各种需要随机性的 dApp。 Orakl Network 通过两种不同的账户类型为开发人员提供 VRF 服务访问权限，即[永久账户](https://docs.orakl.network/developers-guide/readme#permanent-account) 或[临时账户](https://docs.orakl.network/developers-guide/readme#temporary-account)。

在本教程中，您将利用 Orakl Network 的 VRF 功能从智能合约内部请求随机单词。

## 先决条件

- [Kaia 钱包](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)
- [Remix IDE](https://remix.ethereum.org/)
- [Kaia Plugin on Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- 测试来自 [龙头] 的 KAIA(https://faucet.kaia.io)

## 开始

在以下步骤中，您将使用 Orakl 网络在智能合约中请求一个随机单词。 让我们开始吧！

### 步骤 1：初始化合同状态变量

在这一步中，我们将定义消费者合约，并初始化合约功能所需的状态变量。 我们的消费者合约依赖于 "VRFConsumerBase "合约和 "IVRFCoordinator "接口，"IVRFCoordinator "接口用于调用 "VRFCoordinator "合约。 接下来，我们定义用于存储随机单词结果的 `sRandomWord` 变量和在 `onlyOwner` 修饰符中使用的 `sOwner` 变量。

```solidity
pragma solidity ^0.8.16;

import { VRFConsumerBase } from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import { IVRFCoordinator } from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
  uint256 public sRandomWord;
  address private sOwner;

  error OnlyOwner(address notOwner);
  modifier onlyOwner() {
      if (msg.sender != sOwner) {
          revert OnlyOwner(msg.sender);
      }
      _;
  }
```

### 第 2 步：初始化 VRF 协调器

要在智能合约中请求随机词语，需要初始化 [`VRFCoordinator`](https://github.com/Bisonai/orakl/blob/master/contracts-v0.1/src/v0.1/VRFCoordinator.sol) 智能合约。 建议将 `VRFCoordinator` 接口与通过构造参数提供的 `VRFCoordinator` 地址绑定，并将其用于随机单词请求 (`requestRandomWords`)。 VRFCoordinator "合约同时部署在 Kaia Kairos [0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499](https://kairos.kaiascan.io/account/0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499) 和 Kaia Mainnet [0x3F247f70DC083A2907B8E76635986fd09AA80EFb](https://www.kaiascan.io/account/0x3F247f70DC083A2907B8E76635986fd09AA80EFb) 上。

```solidity
  IVRFCoordinator COORDINATOR;

  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = IVRFCoordinator(coordinator);
      sOwner = msg.sender;
  }
```

### 步骤 3：使用临时账户申请随机词语

要使用临时账户申请随机词语，用户需要发送 $KAIA 并使用 value 属性调用。

```solidity
  function requestRandomWordsDirect(
      bytes32 keyHash,
      uint32 callbackGasLimit,
      uint32 numWords,
      address refundRecipient
  )
      public
      payable
      onlyOwner
      returns (uint256 requestId)
  {
    requestId = COORDINATOR.requestRandomWords{value: msg.value}(
      keyHash,
      callbackGasLimit,
      numWords,
      refundRecipient
    );
  }
```

该函数调用 `COORDINATOR` 合约中定义的 `requestRandomWords()` 函数，并将 `keyHash`, `callbackGasLimit`, `numWords` 和 `refundRecipient` 作为参数传递。 服务费通过 `msg.value` 发送给 `COORDINATOR` 合约中的 `requestRandomWords()` 。 如果付款额大于预期付款额，超出部分将退回到 `refundRecipient` 地址。 最终，它会生成一个随机词语请求。 要准确指定 "requestRandomWords "函数的 "msg.value"，请参阅[如何估算服务费](https://docs.orakl.network/developers-guide/vrf#get-estimated-service-fee)的说明。

### 步骤 4：填写随机词语

满足随机词语请求时，`VRFCoordinator`合约会调用`fulfillRandomWords`函数。

```solidity
function fulfillRandomWords(
    uint256 /* requestId */,
    uint256[] memory randomWords
)
    internal
    override
{
    // requestId should be checked if it matches the expected request
    // Generate random value between 1 and 50.
    sRandomWord = (randomWords[0] % 50) + 1;
}
```

现在我们有了 Orakl VRF 解决方案的代码，让我们来看看它的实际操作。

## 具体实施

在下面的示例中，合同允许我们请求随机词语并得到满足。

### 创建和部署示例代码

**Remix IDE**

- 导航至 [Remix IDE](https://remix.ethereum.org/)。
- 单击**文件资源管理器**选项卡，在合同文件夹中新建一个名为 "consumer-vrf.sol "的文件。
- 将下面的代码粘贴到新创建的文件中。
- 在 Remix 中，点击 **编译合同**。
- 安装插件后，点击左侧的 Kaia 选项卡。
- 选择 **环境** > **注入式提供商** - **Kaia Wallet**。
- 在**合同**中，选择您的合同。 例如，`VRFConsumer`。
- 输入协调者合约地址 `0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499` (Kairos), `0x3F247f70DC083A2907B8E76635986fd09AA80EFb` (Mainnet).
- 点击 **部署**。

\*\* 示例代码\*\*

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {VRFConsumerBase} from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import {IVRFCoordinator} from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
    uint256 public sRandomWord;
    address private sOwner;

    IVRFCoordinator COORDINATOR;

    error OnlyOwner(address notOwner);

    modifier onlyOwner() {
        if (msg.sender != sOwner) {
            revert OnlyOwner(msg.sender);
        }
        _;
    }

    constructor(address coordinator) VRFConsumerBase(coordinator) {
        sOwner = msg.sender;
        COORDINATOR = IVRFCoordinator(coordinator);
    }

    function requestRandomWordsDirect(
        bytes32 keyHash,
        uint32 callbackGasLimit,
        uint32 numWords,
        address refundRecipient
    ) public payable onlyOwner returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords{value: msg.value}(
            keyHash,
            callbackGasLimit,
            numWords,
            refundRecipient
        );
    }

    function fulfillRandomWords(
        uint256 /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        // requestId should be checked if it matches the expected request
        // Generate random value between 1 and 50.
        sRandomWord = (randomWords[0] % 50) + 1;
    }
}
```

![](/img/build/tools/orakl-vrf-deploy.png)

### 与智能合约互动

要在智能合约中请求随机词语，必须先执行 `requestRandomWordsDirect()` 函数。 要成功执行该函数，用户必须如前所述发送 KAIA（最少 1 KAIA），并提供 `keyHash`, `callbackGasLimit`, `numWords` 和 `refundRecipient` 参数。 keyHash\` 参数唯一定义了谁可以执行请求。 Orakl Network VRF 为每个 Kaia 链提供一个密钥哈希值：

- Kairos: `0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c`
- Mainnet: `0x6cff5233743b3c0321a19ae11ab38ae0ddc7ddfe1e91b162fa8bb657488fb157`

其余参数的设置方法如下：

- callbackGasLimit "为 "500000"、
- 字数 "为 "1"，以及
- 将 `refundRecipient` 设为您的 EOA 地址。

之后，一旦请求得到满足，就可以执行`sRandomWord()`函数。 该 `sRandomWord()` 函数返回随机单词。

- **requestRandomWordsDirect()**：将发送 1 个 KAIA 以执行此函数。 下面的图片说明了这一点：

![](/img/build/tools/orakl-vrf-request.png)

- **sRandomWord()**：在 `VRFCoordinator` 完成随机字请求后，响应将存储在 `sRandomWord` 变量中。 要获取响应，请调用`sRandomWord()`函数。

![](/img/build/tools/orakl-vrf-response.png)

塔达 🎉！ 您刚刚请求了一个随机单词，并在智能合约中收到了一个。

## 结论

在本教程中，您将学习如何使用 Orakl Network VRF 解决方案在智能合约中生成随机单词。 Orakl 网络提供更多甲骨文服务，如数据反馈、请求-响应、储备证明。 有关 Orakl Network 及其工作原理的更多深入指南，请参阅 [Orakl Network 文档](https://docs.orakl.network)。
