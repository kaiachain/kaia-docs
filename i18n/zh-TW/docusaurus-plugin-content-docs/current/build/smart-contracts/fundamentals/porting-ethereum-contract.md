# 導入以太坊合約

在大多數情況下，您可以在 Kaia 上使用以太坊合約，無需做任何修改。
不過，要注意以下兩個問題。

## 穩固支持<a id="solidity-support"></a>

- Kairos 網絡目前與**倫敦**以太坊虛擬機 (EVM) 兼容。
- Mainnet 目前與**倫敦**以太坊虛擬機 (EVM) 兼容。

:::note

v1.7.0 協議升級 - 不兼容的更改，包括**伊斯坦布爾**硬分叉項目和 Kaia 自己的項目。
如果是 Kairos 網絡，則從區塊編號 "#75,373,312 "開始啟用，如果是主網絡，則從區塊編號 "#86,816,005 "開始啟用。

v1.7.3 協議升級 - 包括倫敦\*\*\*硬分叉產生的基本費用在內的不兼容變更。
如果是 Kairos 網絡，則從區塊編號 "#80,295,291 "開始啟用，如果是主網絡，則從區塊編號 "#86,816,005 "開始啟用。

v1.8.0 協議升級 - 包括倫敦\*\*\*硬分叉產生的基本費用在內的不兼容變更。
如果是 Kairos 網絡，則從區塊編號 "#86,513,895 "開始啟用，如果是主網，則從區塊編號 "#86,816,005 "開始啟用。

:::

不保證向後兼容 Kaia 上的其他 EVM 版本。
因此，強烈建議根據協議升級狀態使用正確的目標選項編譯 Solidity 代碼。

- Kairos: --evm-version london
- Mainnet: --evm-version london
- 其他（私有/服務鏈）：根據協議升級狀態確定

請參閱 [如何設置 Solc 的 EVM 版本](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)。

命令示例如下：

```
$ solc --evm-version london contract.sol
```

## 解耦密鑰對<a id="decoupled-key-pairs"></a>

Kaia [decouples key pairs from addresses](../../learn/accounts.md#decoupling-key-pairs-from-addresses). 如果使用者 [更新帳號](../transactions/basic.md#txtypeaccountupdate)，特定帳號的私密金鑰會被另一個帳號取代。 大多數情況下，這不會影響您的業務邏輯。 但是，如果您的業務邏輯包括 ecrecover，則應考慮使用 validateSender。 如需詳細資訊，請參閱 [here](../../learn/smart-contracts/precompiled-contracts.md)。
