# 與 KAS 一起使用數據錨定

如設計部分所述，您可以將服務鏈數據錨定到 Kaia 主鏈上。
本頁介紹如何通過 [KAS (Kaia API Service)](https://www.klaytnapi.com) 啟用數據錨定。

一旦開啟，服務鏈中的節點就可以定期將其鏈數據（區塊數據）錨定到 Mainnet 或 Kairos，以證明服務鏈的存在和不變性。
這確保了服務鏈的安全性和可信度。

## 使用 KAS 的準備工作<a id="preparation-with-kas"></a>

本節將介紹使用 KAS 進行數據錨定的前提條件。

### 註冊 KAS（Kaia API 服務）<a id="sign-up-kas"></a>

首先，您需要在 [KAS 控制檯網站](https://www.klaytnapi.com) 上註冊 KAS，獲得 KAS 賬戶。
請訪問上述網站並在 KAS 中註冊。

[![main page](/img/nodes/kas-main-en.png)](https://www.klaytnapi.com)

[![sign up](/img/nodes/kas-signup-en.png)](https://www.klaytnapi.com)

### 創建證書<a id="check-credential"></a>

登錄後，您可以創建如下憑證。
訪問密鑰 ID "和 "秘密訪問密鑰 "或 "授權 "將用於調用 KAS API。

![credential](/img/nodes/kas-credential-en.png)

## 錨點應用程序接口<a id="anchor-api"></a>

KAS 提供了專為數據錨定而設計的錨定應用程序接口（Anchor API），您肯定會使用它來完成錨定任務。

![anchor api](/img/nodes/kas-anchor-api-en.png)

## 創建操作員地址<a id="create-kas-credential"></a>

要通過 KAS 錨定服務鏈數據，必須有一個已註冊 KAS 的 Kaia 地址向 Kaia 實際發送錨定事務。 因此，在建立服務節點之前，您需要通過 KAS 創建一個名為 "操作員 "的 Kaia 賬戶。 請使用 KAS 控制檯創建此賬戶。

需要注意的是，您必須首先在 KAS 控制檯頁面右上角**選擇要將數據錨定到 Kaia 中的鏈**。 您應為每個鏈（Mainnet/Kairos）創建一個操作員。

![select chain](/img/nodes/kas-select-chain-en.png)

創建如下操作符

![create operator](/img/nodes/kas-create-operator-en.png)

然後，您可以像下面這樣查看操作員列表。
請注意，設置服務鏈節點需要運營商的地址。

![create operator](/img/nodes/kas-operator-list-en.png)

## 配置服務鏈節點<a id="configure-service-chain-node"></a>

獲得 API 證書、Anchor API 信息（API 端點和參數）以及 KAS 中的操作員賬戶後，就可以設置服務鏈節點了。
您需要編輯服務鏈節點的配置文件（`kscnd.conf`, `kspnd.conf`, `ksend.conf`），如下所示。

應設置 `SC_SUB_BRIDGE=1` 和所有 `SC_KAS_` 前綴項。

```bash
...
# service chain options setting
...
SC_SUB_BRIDGE=1
...

SC_KAS_ANCHOR=1                                                         # 1: enable, 0: disable
SC_KAS_ANCHOR_PERIOD=10                                                 # Anchoring block period
SC_KAS_ANCHOR_URL="https://anchor-api.klaytn.com/v1/anchor"             # Anchor API URL
SC_KAS_ANCHOR_OPERATOR="0x6A3D565C4a2a4cd0Fb3df8EDfb63a151717EA1D7"     # Operator address
SC_KAS_ANCHOR_ACCESS_KEY="KAJM4BEIR9SKJKAW1G3TT8GX"                     # Credential Access key
SC_KAS_ANCHOR_SECRET_KEY="KyD5w9ZlZQ7ejj6lDF6elb61u8JH/mXdKqhgr3yF"     # Credential Secret key
SC_KAS_ANCHOR_X_CHAIN_ID=1001                                           # Mainnet: 8217, Kairos: 1001
...
```

## 運行服務鏈節點<a id="run-service-chain-node"></a>

現在你可以走了。 您可以運行服務鏈節點。
您將看到與 KAS 錨點 API 相關的日誌信息，如下所示。

```bash
...
INFO[09/10,18:09:28 +09] [5] Imported new chain segment                number=86495 hash=5a20d6…cbca1b blocks=1  txs=3 elapsed=2.387ms  trieDBSize=5.10kB mgas=0.063 mgasps=26.383
INFO[09/10,18:09:28 +09] [53] Anchored a block via KAS                  blkNum=86495
INFO[09/10,18:09:29 +09] [5] Imported new chain segment                number=86496 hash=8897bc…4ea7e7 blocks=1  txs=3 elapsed=2.158ms  trieDBSize=5.10kB mgas=0.063 mgasps=29.188
INFO[09/10,18:09:29 +09] [53] Anchored a block via KAS                  blkNum=86496
INFO[09/10,18:09:30 +09] [5] Imported new chain segment                number=86497 hash=44b319…7d4247 blocks=1  txs=3 elapsed=2.346ms  trieDBSize=5.43kB mgas=0.063 mgasps=26.848
INFO[09/10,18:09:30 +09] [53] Anchored a block via KAS                  blkNum=86497
INFO[09/10,18:09:31 +09] [5] Imported new chain segment                number=86498 hash=0b98ba…73d654 blocks=1  txs=3 elapsed=2.235ms  trieDBSize=5.61kB mgas=0.063 mgasps=28.186
INFO[09/10,18:09:31 +09] [53] Anchored a block via KAS                  blkNum=86498
INFO[09/10,18:09:32 +09] [5] Imported new chain segment                number=86499 hash=4f01ab…3bc334 blocks=1  txs=3 elapsed=3.319ms  trieDBSize=5.61kB mgas=0.063 mgasps=18.977
INFO[09/10,18:09:32 +09] [53] Anchored a block via KAS                  blkNum=86499
...
```

## 交易清單<a id="list-of-transaction"></a>

在 KAS 控制檯網站上，您可以在 "KAS 控制檯 - 服務 - 錨點 - 操作員 "菜單中查看服務鏈操作員發送的錨點交易列表，如下所示。

![anchoring transaction list](/img/nodes/kas-tx-list-en.png)
