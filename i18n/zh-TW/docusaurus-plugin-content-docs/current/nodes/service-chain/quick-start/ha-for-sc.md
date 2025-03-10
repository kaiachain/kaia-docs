# 配置高可用性

如果服務鏈中只使用一個網橋，該網橋就會成為單點故障。 為了解決這個問題，我們將介紹如何使用兩個或更多網橋構建 HA 系統。 如下圖所示，將網橋配置為至少兩對連接，這樣即使其中一個網橋連接出現問題，數據錨定和鏈之間的價值傳輸仍可通過另一個網橋正常進行。

![](/img/nodes/sc-ha-arch.png)

## 先決條件<a id="prerequisites"></a>

- EN 的主橋和 SCN 的副橋相連。 如果不是，請參考 [Kairos connection](en-scn-connection.md)建立連接。
- 本節將介紹如何在 Kairos 和 ServiceChain 之間添加額外的橋接器。 同樣，您也可以通過添加另一個網橋來設置 HA。

## 步驟 1：在 EN-SCN 之間添加另一個網橋<a id="step-1-adding-another-bridge-between-en-scn"></a>

在[連接到 Kairos](en-scn-connection.md)中，我們假設 EN 和 SCN 分別以 EN-01 和 SCN-L2-01 的橋接方式連接。 在本節中，我們將在 EN-02 和 SCN-L2-02 之間添加另一座橋樑。
由於程序相同，我們將作簡要說明。

![](/img/nodes/sc-ha-add-bridge.png)

構建 EN-02 後，在 `conf/kend.conf` 中將 `SC_MAIN_BRIDGE` 設置為 1，然後在 EN-02 上重啟 ken。

```console
SC_MAIN_BRIDGE=1
```

通過以下命令檢查 EN-02 的 KNI 信息：

```console
EN-02$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://eb8f21df10c6562...25bae@[::]:50505?discport=0"
```

登錄 SCN-L2-02，使用 EN-02 的 KNI 創建`main-bridges.json`。 請確保它應該是帶方括號的 JSON 數組格式。

```console
SCN-L2-02$ echo '["kni://eb8f21df10c6562...25bae@192.168.0.5:50505?discport=0"]' > ~/data/main-bridges.json
```

在 SCN-L2-02 的外殼上，按以下說明編輯 `kscn-XXXXX-amd64/conf/kscnd.conf`。
要連接橋接器，請將 `SC_SUB_BRIDGE` 設置為 1。
SC_PARENT_CHAIN_ID "設置為 Kairos 的 "chainID "1001。
SC_ANCHORING_PERIOD "是一個參數，用於決定向父鏈發送錨定事務的週期。 在這個例子中，每 10 個子區塊就會向父鏈（Kairos）提交一個錨交易。

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

如果在 EN-02 上重新啟動 ken，EN-02 和 SCN-L2-02 之間將自動連接橋接，數據錨定將從連接點開始，如下圖所示。

在 EN-02 和 SCN-L2-02 之間添加橋接器後，可以看到節點之間的連接已建立，如下圖所示。

![](/img/nodes/sc-ha-before-register.png)

## 第 2 步：註冊和訂閱橋接合同<a id="step-2-registering-and-subscribing-the-bridge-contract"></a>

如上圖所示，橋接合同只在 EN-01 和 SCN-L2-01 中登記。

連接 SCN-L2-02 控制檯，運行用於網橋註冊、網橋訂閱和令牌註冊的 API。 在[跨鏈價值轉移](value-transfer.md) 第 2 步中部署帶有 EN-01 和 SCN-L2-01 的橋接合約時，創建了橋接合約和代幣合約。

```
$ kscn attach --datadir ~/data
> subbridge.registerBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.subscribeBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.registerToken("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR", "0xCHILD_TOKEN_ADDR", "0XPARENT_TOKEN_ADDR")
null
```

![](/img/nodes/sc-ha-before-register2.png)

在橋樑合同中，應更新有關增加一座橋樑的信息。 在 [service-chain-value-transfer-example](https://github.com/klaytn/servicechain-value-transfer-examples) 的 `erc20/erc20-addOperator4HA.js` 文件中寫入新增額外橋接器的子操作符和父操作符信息，並執行 `node erc20-addOperator4HA.js`。

```
// register operator
await conf.child.newInstanceBridge.methods.registerOperator("0xCHILD_BRIDGE_ADDR").send({ from: conf.child.sender, gas: 100000000, value: 0 });
await conf.parent.newInstanceBridge.methods.registerOperator("0xPARENT_BRIDGE_ADDR").send({ from: conf.parent.sender, gas: 100000000, value: 0 });
```

當有多個橋接器時，可以通過設置閾值來更安全地進行價值轉移。 只有當閾值以上的操作員正常請求數值轉移時，才能啟用數值轉移。 例如，在當前示例中，如果有兩個橋接器對，閾值設置為 2，則只有當兩個橋接器對都正常請求時，才能進行數值傳送。 也就是說，即使一座網橋受到攻擊併發送了異常請求，也可以阻止它。 閾值的默認值為 1。 在 [service-chain-value-transfer-example](https://github.com/klaytn/servicechain-value-transfer-examples) 的 `erc20/erc20-addOperator4HA.js` 文件中，取消註釋下面的代碼並設置閾值，然後運行它以更改橋接合約的閾值。

```
// // set threshold
// await conf.child.newInstanceBridge.methods.setOperatorThreshold(0, "your threshold number").send({ from: conf.child.sender, gas: 100000000, value: 0 });
// await conf.parent.newInstanceBridge.methods.setOperatorThreshold(0, "your threshold number").send({ from: conf.parent.sender, gas: 100000000, value: 0 });
```

註冊完成後，如下圖所示，將在 EN-02 和 SCN-L2-02 中註冊橋接合同，以配置 HA。

![](/img/nodes/sc-ha-after-register.png)

當兩個或更多橋對連接用於 HA 時，同一區塊的數據錨定事務會發生多次，價值轉移事務也會發生多次。 也就是說，需要額外付費。