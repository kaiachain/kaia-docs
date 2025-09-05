# 升級服務鏈

Kaia 及其 ServiceChain 不斷髮布新版本，以開發新功能和修復漏洞。 本頁是升級 ServiceChain 二進制文件和設置 ServiceChain 硬分叉區塊編號的指南。

## 升級<a href="#upgrade" id="upgrade"></a>

本節介紹如何升級 ServiceChain 二進制文件。

**注意**\* 服務鏈二進制文件的升級可能是不可逆和向後兼容的，這意味著您不能降級到舊版本。 有關詳細信息，請參閱發行說明。 例如，[Kaia v1.9.0 發佈說明](https://medium.com/klaytn/klaytn-v1-9-0-release-notes-medium-58e4644f7544) 說：

> 注意：該版本更新了數據庫版本，以支持快照同步。 更新到 v1.9.0 後，您不能使用現有數據降級到舊版本。

您可以通過以下鏈接獲取最新版的 Kaia 和 ServiceChain 二進制文件：

- [Kaia文檔](../downloads/downloads.md)
- [Kaia Github Repository](https://github.com/kaiachain/kaia/releases)

要升級 ServiceChain 二進制文件，請停止 ServiceChain 節點並替換二進制文件。 例如，您可以使用以下命令停止 SCN 節點，並將二進制文件替換為更新的二進制文件。

```bash
$ kscnd stop
Shutting down kscnd: OK
$ cp /path/to/new/kscn /path/to/original/kscn
```

升級後可以重新啟動 ServiceChain 節點。 但是，如果計劃在 ServiceChain 中激活硬分叉，就必須保持 ServiceChain 節點的宕機。 有關 ServiceChain 硬分叉的說明，請參閱 [硬分叉](#hard-fork)。

```bash
$ kscnd start
```

## 硬分叉<a href="#hard-fork" id="hard-fork"></a>

本節說明在 ServiceChain 應用 Kaia [hard fork](../../misc/kaia-history.md) 的步驟。

要將硬分叉應用於 ServiceChain，您需要

1. 為硬分叉選擇一個合適的區塊編號
2. 將 ServiceChain 二進制版本升級到支持硬分叉的版本
3. 在服務鏈中設置硬分叉區塊編號

### 1) 為硬分叉選擇一個合適的區塊編號<a href="#1-pick-an-appropriate-block-number-for-the-hard-fork" id="1-pick-an-appropriate-block-number-for-the-hard-fork"></a>

在 ServiceChain 的 Javascript 控制檯中，您可以檢查當前的區塊編號，如下圖所示。

```bash
$ kscn attach --datadir ~/kscnd_home
歡迎訪問 Kaia JavaScript 控制檯！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> kaia.blockNumber
1234
```

現在，您必須選擇一個合適的區塊編號來激活硬分叉。 確保當前區塊和硬分叉區塊之間有足夠多的區塊（每秒產生一個）。

### 2. 升級服務鏈二進制文件<a href="#2-upgrade-the-servicechain-binary" id="2-upgrade-the-servicechain-binary"></a>

有關升級 ServiceChain 二進制文件的說明，請參閱本頁的 [Upgrade](#upgrade) 部分。 確保暫時關閉（或停止）ServiceChain 節點。 設置硬分叉區塊編號後，您將重新啟動它們。

### 3. 設置硬分叉區塊編號<a href="#3-set-the-hard-fork-block-number" id="3-set-the-hard-fork-block-number"></a>

如果已將 ServiceChain 二進制文件升級為支持所需硬分叉的版本，則可以通過更新 genesis 重新初始化鏈配置，在 ServiceChain 中設置硬分叉區塊編號。

#### 更新 genesis 並重新初始化所有 ServiceChain 節點的鏈配置<a href="#update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes" id="update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes"></a>

首先，在 `genesis.json` 的 `config` 字段中指定硬分叉編號。 例如，如果要在 ServiceChain 中激活 Magma 硬分叉，則應在創世的 "配置 "字段中指定 "magmaCompatibleBlock"，如下所示。

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    ...
    "magmaCompatibleBlock": 1500,
    ...
  },
  ...
}
```

要在鏈配置中啟用硬分叉，應先啟用之前的硬分叉。 也就是說，要啟用 Magma 硬分叉，EthTxType 硬分叉應該已經啟用。 如果鏈配置中缺少前面硬分叉的兼容區塊編號字段，也必須添加。

例如，如果你想設置 Magma 硬分叉區塊編號，而你的 `genesis.json` 的 `config` 字段中沒有 `ethTxTypeCompatibleBlock` ，如下所示：

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

在 "配置 "字段中添加 "magmaCompatibleBlock "時，還必須添加 "ethTxTypeCompatibleBlock"，如下所示。

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "ethTxTypeCompatibleBlock": 1500,
    "magmaCompatibleBlock": 1500,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

您可以在 [Kaia Docs](../../misc/kaia-history.md) 中找到 Kaia 硬分叉的歷史。

如果您已使用所需的硬分叉更新了您的 `genesis.json`，請重新初始化鏈配置並應用您的更改。

```bash
$ kscn --datadir /path/to/data/directory init /path/to/genesis.json
```

**注意**\* 重新初始化鏈配置時打印以下錯誤日誌是正常現象。

```
ERROR[08/02,09:12:39 Z] [48] The same or more recent governance index exist. Skip writing governance index  newIdx=0 govIdxes=[0]
```

#### 確認更新的鏈配置<a href="#confirm-the-updated-chain-config" id="confirm-the-updated-chain-config"></a>

現在，重新啟動 ServiceChain 節點。 例如，您可以使用以下命令重新啟動 SCN 節點。

```bash
$ kscnd start
```

然後，您可以在 SCN 的 Javascript 控制檯中檢查更新後的鏈配置。

```bash
$ kscn attach --datadir ~/kscnd_home
歡迎來到 Kaia JavaScript 控制檯！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.chainConfig.magmaCompatibleBlock
1500
```

## 硬分叉的一些具體情況<a href="#some-hard-fork-specifics" id="some-hard-fork-specifics"></a>

本節將介紹特定硬分叉的一些細節。

### Magma <a href="#magma" id="magma"></a>

Magma 硬分叉引入了 KIP-71，即動態氣體費。 它包括Gas 價格的上限和下限。

默認情況下，上限設置為 `7500000000`，下限設置為 `25000000000`。 您可以使用 [governance APIs](../../../references/json-rpc/governance/chain-config) 在 SCN 節點的 Javascript 控制檯中更改這些邊界。 顯然，下限不能超過上限。

要將Gas 價格設置為靜態值，必須將Gas 價格的上限和下限設置為相同的值。 例如，您可以在 SCN 節點的 Javascript 控制檯中使用 "governance.vote "API 將Gas 價格設為 "0"。

```bash
$ kscn attach --datadir ~/kscnd_home
歡迎訪問 Kaia JavaScript 控制檯！

instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.vote("kip71.lowerboundbasefee", 0)
"Your vote is prepared.您的投票已準備就緒，將放入區塊頭，或在您的節點作為提案人生成區塊時應用。請注意，您的投票可能是重複的。"
> governance.vote("kip71.upperboundbasefee", 0)
"您的投票已準備就緒。您的投票已準備就緒，它將被放入區塊頭，或在您的節點作為提案人生成區塊時應用。請注意，您的投票可能是重複的。"
```

**注** 無論 Magma 硬分叉是否激活，都可以使用治理投票及其更新。 也就是說，治理投票也可以在 Magma 硬分叉激活之前進行。

如果更新Gas 價格上限和下限的投票成功，這些更改將在 2 個伊斯坦布爾紀元後生效（紀元的值以塊號表示）。

例如，如果歷時為 3600，而更新Gas 價格上下限的投票被置於區塊 #4000 中，則這些更改將從區塊 #10800 開始生效。 具體來說，投票將在 #7200 區塊達到其第一個紀元時最終完成，而更改將在第二個紀元(#10800 區塊）應用。

要檢查紀元，可以使用 `governanace.itemsAt` API，如下所示。

```javascript
> governance.itemsAt(kaia.blockNumber)
{
  governance.governancemode: "none",
  governance.governingnode: "0x05ad406f31e22b74f18c9ed65ed1ccd349bbbee0",
  governance.unitprice: 0,
  istanbul.committeesize: 21,
  istanbul.epoch: 3600,
  istanbul.policy: 0,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: false,
  reward.minimumstake: "2000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.useginicoeff: false
}
```

你可以看到，"istanbul.epoch "的值為 3600 個區塊，通常需要一個小時才能通過。

您還可以使用 "governance.vote "API 更改時間。

```javascript
> governance.vote("istanbul.epoch", 60)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```
