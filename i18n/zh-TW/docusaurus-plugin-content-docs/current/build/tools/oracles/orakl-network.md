# 奧拉克爾網絡

![](/img/banners/kaia-orakl.png)

## 導言

[Orakl Network](https://docs.orakl.network) 是一個去中心化的甲骨文網絡，允許智能合約安全地訪問鏈外數據和其他資源。 它引以為豪的是，自己是一個提供 [Data Feed](https://docs.orakl.network/developers-guide/data-feed)、[VRF](https://docs.orakl.network/developers-guide/vrf)、[Request-Response](https://docs.orakl.network/developers-guide/request-response) 和 [Proof of Reserve](https://docs.orakl.network/developers-guide/proof-of-reserve) 解決方案的本地令牌交易系統。

有了 Orakl 網絡，用戶可以在智能合約中尋找不可預測、無偏見的隨機性。 Orakl Network [Verifiable Random Function (VRF)](https://docs.orakl.network/developers-guide/vrf#what-is-verifiable-random-function)允許智能合約生成可驗證的隨機值，可用於各種需要隨機性的 dApp。 Orakl Network 通過兩種不同的賬戶類型為開發人員提供 VRF 服務訪問權限，即[永久賬戶](https://docs.orakl.network/developers-guide/readme#permanent-account) 或[臨時賬戶](https://docs.orakl.network/developers-guide/readme#temporary-account)。

在本教程中，您將利用 Orakl Network 的 VRF 功能從智能合約內部請求隨機單詞。

## 先決條件

- [Kaia 錢包](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)
- [Remix IDE](https://remix.ethereum.org/)
- [Kaia Plugin on Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- 測試來自 [龍頭] 的 KAIA(https://faucet.kaia.io)

## 開始

在以下步驟中，您將使用 Orakl 網絡在智能合約中請求一個隨機單詞。 讓我們開始吧！

### 步驟 1：初始化合同狀態變量

在這一步中，我們將定義消費者合約，並初始化合約功能所需的狀態變量。 我們的消費者合約依賴於 "VRFConsumerBase "合約和 "IVRFCoordinator "接口，"IVRFCoordinator "接口用於調用 "VRFCoordinator "合約。 接下來，我們定義用於存儲隨機單詞結果的 `sRandomWord` 變量和在 `onlyOwner` 修飾符中使用的 `sOwner` 變量。

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

### 第 2 步：初始化 VRF 協調器

要在智能合約中請求隨機詞語，需要初始化 [`VRFCoordinator`](https://github.com/Bisonai/orakl/blob/master/contracts-v0.1/src/v0.1/VRFCoordinator.sol) 智能合約。 建議將 `VRFCoordinator` 接口與通過構造參數提供的 `VRFCoordinator` 地址綁定，並將其用於隨機單詞請求 (`requestRandomWords`)。 VRFCoordinator "合約同時部署在 Kaia Kairos [0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499](https://kairos.kaiascan.io/account/0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499) 和 Kaia Mainnet [0x3F247f70DC083A2907B8E76635986fd09AA80EFb](https://www.kaiascan.io/account/0x3F247f70DC083A2907B8E76635986fd09AA80EFb) 上。

```solidity
  IVRFCoordinator COORDINATOR;

  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = IVRFCoordinator(coordinator);
      sOwner = msg.sender;
  }
```

### 步驟 3：使用臨時賬戶申請隨機詞語

要使用臨時賬戶申請隨機詞語，用戶需要發送 $KAIA 並使用 value 屬性調用。

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

該函數調用 `COORDINATOR` 合約中定義的 `requestRandomWords()` 函數，並將 `keyHash`, `callbackGasLimit`, `numWords` 和 `refundRecipient` 作為參數傳遞。 服務費通過 `msg.value` 發送給 `COORDINATOR` 合約中的 `requestRandomWords()` 。 如果付款額大於預期付款額，超出部分將退回到 `refundRecipient` 地址。 最終，它會生成一個隨機詞語請求。 要準確指定 "requestRandomWords "函數的 "msg.value"，請參閱[如何估算服務費](https://docs.orakl.network/developers-guide/vrf#get-estimated-service-fee)的說明。

### 步驟 4：填寫隨機詞語

滿足隨機詞語請求時，`VRFCoordinator`合約會調用`fulfillRandomWords`函數。

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

現在我們有了 Orakl VRF 解決方案的代碼，讓我們來看看它的實際操作。

## 具體實施

在下面的示例中，合同允許我們請求隨機詞語並得到滿足。

### 創建和部署示例代碼

**Remix IDE**

- 導航至 [Remix IDE](https://remix.ethereum.org/)。
- 單擊**文件資源管理器**選項卡，在合同文件夾中新建一個名為 "consumer-vrf.sol "的文件。
- 將下面的代碼粘貼到新創建的文件中。
- 在 Remix 中，點擊 **編譯合同**。
- 安裝插件後，點擊左側的 Kaia 選項卡。
- 選擇 **環境** > **注入式提供商** - **Kaia Wallet**。
- 在**合同**中，選擇您的合同。 例如，`VRFConsumer`。
- 輸入協調者合約地址 `0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499` (Kairos), `0x3F247f70DC083A2907B8E76635986fd09AA80EFb` (Mainnet).
- 點擊 **部署**。

\*\* 示例代碼\*\*

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

### 與智能合約互動

要在智能合約中請求隨機詞語，必須先執行 `requestRandomWordsDirect()` 函數。 要成功執行該函數，用戶必須如前所述發送 KAIA（最少 1 KAIA），並提供 `keyHash`, `callbackGasLimit`, `numWords` 和 `refundRecipient` 參數。 keyHash\` 參數唯一定義了誰可以執行請求。 Orakl Network VRF 為每個 Kaia 鏈提供一個密鑰哈希值：

- Kairos: `0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c`
- Mainnet: `0x6cff5233743b3c0321a19ae11ab38ae0ddc7ddfe1e91b162fa8bb657488fb157`

其餘參數的設置方法如下：

- callbackGasLimit "為 "500000"、
- 字數 "為 "1"，以及
- 將 `refundRecipient` 設為您的 EOA 地址。

之後，一旦請求得到滿足，就可以執行`sRandomWord()`函數。 該 `sRandomWord()` 函數返回隨機單詞。

- **requestRandomWordsDirect()**：將發送 1 個 KAIA 以執行此函數。 下面的圖片說明瞭這一點：

![](/img/build/tools/orakl-vrf-request.png)

- **sRandomWord()**：在 `VRFCoordinator` 完成隨機字請求後，響應將存儲在 `sRandomWord` 變量中。 要獲取響應，請調用`sRandomWord()`函數。

![](/img/build/tools/orakl-vrf-response.png)

塔達 🎉！ 您剛剛請求了一個隨機單詞，並在智能合約中收到了一個。

## 結論

在本教程中，您將學習如何使用 Orakl Network VRF 解決方案在智能合約中生成隨機單詞。 Orakl 網絡提供更多甲骨文服務，如數據反饋、請求-響應、儲備證明。 有關 Orakl Network 及其工作原理的更多深入指南，請參閱 [Orakl Network 文檔](https://docs.orakl.network)。
