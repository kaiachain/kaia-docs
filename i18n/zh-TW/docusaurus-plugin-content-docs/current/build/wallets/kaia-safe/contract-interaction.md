# 與合同互動

在本節中，您將使用我們新創建的多重簽名錢包與部署在 Kairos 上的簡單合約進行交互並向其發送一筆交易。

**先決條件**

- [Metamask](https://metamask.io/download/) & [Kaia Metamask Config](../../tutorials/connecting-metamask.mdx#send-klay)
- [混音](https://remix.ethereum.org/) 和[Kaia 混音插件](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- 從 [水龍頭](https://faucet.kaia.io) 獲取測試 KAIA

**步驟 1：** 導航至 [混音](https://remix.ethereum.org/)

**第 2 步：** 編譯並部署**存儲合同**示例。

必須先部署合約，然後才能在多重簽名錢包中與之交互。 該示例合約包含一個簡單的 uint "數字 "變量，可通過調用**store**方法進行更新，也可通過調用**retrieve**方法進行檢索。

![](/img/build/tools/kaia-safe/ks-ic-deploy.gif)

**第 3 步：** 啟動新交易。

要與安全錢包中的智能合約互動，請點擊\*\*"新建交易 "\*\*。 要完成這一步驟，您需要已部署的合同地址和 ABI，如上一步所示。

![](/img/build/tools/kaia-safe/kaia-safe-ci-init.gif)

**第 4 步：** 審查並提交交易。 您需要用簽名者錢包簽署交易，一旦達到確認閾值，交易就會執行。

![](/img/build/tools/kaia-safe/kaia-safe-ci-review-send.gif)