# 轉讓價值

如 Kaia 設計部分所述，服務鏈支持父鏈和子鏈之間的價值（KAIA、ERC-20 和 ERC-721）轉移。
本頁說明如何在 SCN 中啟用數值傳遞功能。

設置 EN 和 SCN 後，需要執行以下步驟才能在鏈之間進行價值轉移。

1. 檢查網橋操作員賬戶的地址，並將 KAIA 添加到網橋操作員賬戶。
2. 將橋接合約部署到父鏈/子鏈上。
3. 向父/子鏈部署代幣（ERC-20 或 721）合約。 (如果您只需要 KAIA 轉機，則可跳過步驟 3 和 4）。
4. 在父鏈/子鏈上將代幣合約與橋接合約進行註冊。
5. 訂閱父鏈/子鏈上的橋接合約。

在按步驟操作之前，讓我們先來看看高層系統架構，以瞭解該機制的背後。

## 系統架構<a id="system-architecture"></a>

圖 1 顯示了帶有橋樑/令牌合約和橋樑節點的服務鏈系統架構。

下面的合約通過主橋/子橋相互通信，處理用戶的價值轉移請求。

- 橋牌合約
- ERC-20 合同（如需要）
- ERC-721合同（如需要）

![圖 1. Service chain architecture](/img/nodes/sc_arch.png)

## 橋樑操作員賬戶<a id="bridge-operator-account"></a>

對於 ServiceChain，有兩個操作員賬戶：父鏈橋操作員賬戶和服務鏈橋操作員賬戶。 每個操作員賬戶都用於簽署交易。
如果交易將值轉移到父鏈，則父鏈橋接操作員賬戶會簽署該交易。 對子鏈而言，使用的是子鏈橋操作員賬戶。
如果用戶提交了 "請求價值轉移 "交易，子橋就會創建一個由橋操作員賬戶簽署的 "處理價值轉移 "交易。
因此，母鏈橋接運營商的餘額中需要有足夠的 KAIA 來向母鏈支付交易費。
如果服務鏈的Gas 價格設置為非零，則服務鏈橋運營商的餘額中也應包含 KAIA。

### 密鑰存儲和密碼文件<a id="keystore-and-password-file"></a>

啟動 SCN 時，如果父/子操作符的密鑰不存在，則會自動生成其密鑰存儲文件和密碼文件。
如果要使用特定賬戶作為操作員，可以提供密鑰。 啟動 SCN 前，將以下文件放到指定路徑。
密碼文件應包含密鑰存儲文件的密碼字符串。
密碼文件名應為相應密鑰存儲文件的賬戶地址。

**文件**

- keystore file : `UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b`
- 密碼文件 : `0x2eD72a9D7fe5da7672fD21567e07302431649B0B`

**文件路徑**

- 父鏈橋操作員 : $datadir/parent_bridge_account
- 子鏈橋操作員 : $datadir/child_bridge_account

```javascript
> pwd
/$dataDIR/child_bridge_account

> ls
0x2eD72a9D7fe5da7672fD21567e07302431649B0B
UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b

> cat 0x2eD72a9D7fe5da7672fD21567e07302431649B0B
%S~f5qqM38cB47jL%

> cat UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b
{"address":"2ed72a9d7fe5da7672fd21567e07302431649b0b","crypto":{"cipher":"aes-128-ctr","ciphertext":"6486509e8158bf4984608cbc5562cf2c9a27cd988a98e543731b39251144e633","cipherparams":{"iv":"96d7e5b6a936278c0797faae6cb3d903"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"8928ba41b8228af19390ec881c51452fa3ea973ad2c253ca0f5bc9197a8b24c4"},"mac":"9c8ec63694c20a473e0ea33840e7d16e9f1a20afc52b3244b703a3ac0a66cfa3"},"id":"9ae10527-7fd3-4aae-a4eb-316af211494e","version":3}
```

### 檢查橋接運營商地址<a id="check-bridge-operator-addresses"></a>

如果成功運行 SCN，則可以使用 RPC API 檢查父/子鏈橋操作符地址，如下所示。

```
$ kscn attach --datadir ~/kscnd_home
歡迎來到 Kaia JavaScript 控制檯！

instance：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

詳細信息請參閱 [subbridge API](../../../references/json-rpc/subbridge/parent-operator)。

### 向橋樑運營商發送 KAIA<a id="send-kaia-to-bridge-operators"></a>

與錨定一樣，母鏈橋運營商需要 KAIA 進行價值轉移交易。
如果服務鏈的Gas 價格設置為非零，則服務鏈橋運營商的餘額中也應包含 KAIA。

給運營商賬戶充值後，您可以像下面這樣查看賬戶餘額。

**家長鏈橋操作員**

```
$ kscn attach --datadir ~/kscnd_home
歡迎來到 Kaia JavaScript 控制檯！

 instance：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.parentOperatorBalance
1e+50
```

**兒童鏈橋操作員**

```
$ kscn attach --datadir ~/kscnd_home
歡迎來到 Kaia JavaScript 控制檯！

 instance：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.childOperatorBalance
1e+50
```

## 橋牌合約<a id="bridge-contract"></a>

為實現跨鏈價值轉移，應在父鏈/子鏈上部署橋樑合同。
用戶可以向橋接合約申請 KAIA 轉移，將其 KAIA 發送到另一條鏈上。
此外，如果在橋接合約中註冊了代幣合約，橋接合約可以處理父鏈和子鏈之間的代幣轉移。

### 部署<a id="deployment"></a>

子橋提供橋接合同部署應用程序接口。 您可以使用單個 RPC 調用將橋接合約部署到兩個鏈上，如下所示。
在此之前，您應該已經連接了主橋和副橋。 請參閱 [網橋配置](bridge-configuration.md) 獲取詳細指南。

```javascript
$ kscn attach --datadir ~/kscnd_home
歡迎來到 Kaia JavaScript 控制檯！

instance：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.deployBridge()
["0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5"].

> subbridge.listBridge
[{
    localAddress："0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress："0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: false
}]
```

更多詳情可參考 [subbridge API](../../...reference/json-rpc/subbridge/deploy-bridge)。

`subbridge_listBridge` 顯示網橋合同地址及其訂閱狀態。
子橋將橋接器合同地址列表保存在文件中。 重啟時，子橋會從文件中重新加載橋接器合同列表。

### 訂閱<a id="subscribing"></a>

部署橋接器合同後，應讓子橋接器訂閱已部署的橋接器合同，以實現價值轉移。 這可以通過另一個 RPC API 調用 "subbridge_subscribeBridge "來實現。

```javascript
> subbridge.subscribeBridge("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5")
null

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}]
```

### 檢查狀態<a id="checking-status"></a>

訂閱後，SCN 將自動處理用戶的 "請求價值轉移 "交易。
本節介紹如何檢查橋接合同狀態。

在橋接聯繫人中，有兩個 nonces，即 "requestNonce "和 "handleNonce"。
與鏈內交易不同，子橋可以先處理較高的 nonce 請求，然後再處理較低的請求。

- requestNonce：用戶向該橋接合約提出的 "跨鏈價值轉移 "請求的次數。
- handleNonce：子橋處理過的最高 nonce。
- lowerHandleNonce：子橋應處理的最低 nonce。

因此，如果非ces 按如下方式更新，我們就可以說跨鏈值傳輸得到了正確處理。

- 父鏈橋合約的 "handleNonce "和 "lowerHandleNonce "不斷接近子鏈橋合約的 "requestNonce"。
- "handleNonce "和 "lowerHandleNonce "不斷接近父鏈橋合約的 "requestNonce"。

如果 "handleNonce "等於對應橋接合約的 "requestNonce"，且 "lowerHandleNonce "比 "handleNonce "大 1，則用戶的請求已全部處理完畢。

### 日誌<a id="log"></a>

以下是 SCN 正常運行時的典型日誌輸出。
每 1 秒鐘打印一次橋牌合約狀態。

```
INFO[10/16,19:37:40 +09] [45] VT : Parent -> Child Chain                request=8699 handle=4826 lowerHandle=4826 pending=3873
INFO[10/16,19:37:40 +09] [45] VT : Child -> Parent Chain                request=7894 handle=4207 lowerHandle=4207 pending=3687
```

該日誌顯示了請求、句柄、lowerHandle 和待處理 nonces。
每個值的含義如下

- request：所有已認購橋接合約的價值轉移請求 nonce 的總和。
- handle：所有已簽訂的橋接合同的上層句柄非密碼總和。
- lowerHandle：所有已訂閱橋接合約的下層句柄非採樣字符串的總和。
- pending："request "和 "lowerHandle "的區別。

### RPC API <a id="rpc-api"></a>

您可以像下面這樣查看橋牌合約的狀態。
詳細信息請參閱 [subbridge API](../../../references/json-rpc/subbridge/get-bridge-information)。

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x22c41ae528627b790233d2e59ea520be12350eb5",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

## 代幣合約（ERC-20/721）<a id="token-contract-erc-20-721"></a>

服務鏈還支持 ERC-20/721 價值轉移。
為支持它們，應在父鏈和子鏈上部署與服務鏈兼容的 ERC-20/721 令牌合約。
關於 ERC-20/721 令牌合約代碼，
，您可以參考 [Token standard](../../../build/smart-contracts/token-standard.md).

### 部署 <a id="deployment"></a>

SCN 尚不支持部署 ERC-20/721 代幣的 API。 您需要通過 caver-js 部署令牌。
部署 ERC-20/721 合約時，應使用正確的橋接運營商帳戶。 使用父操作員賬戶部署主鏈，使用子操作員賬戶部署服務鏈。
如果使用錯誤的賬戶部署了代幣合約，價值轉移將不起作用，您需要使用正確的賬戶重新部署代幣合約。

### 註冊 <a id="register"></a>

部署令牌合約後，您應該在父鏈/子鏈上將令牌合約與橋接合約註冊在一起，如下所示。

```javascript
> subbridge.registerToken("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5", "0x376b72abe1b29cace831bd3f5acdfa967814c9cd", "0x53160735f7cc6ff75e48619f368bb94daff66a1b")
null
```

該命令將子鏈令牌（"0x376b72abe1b29cace831bd3f5acdfa967814c9cd"）與子鏈橋合約（"0x27caeba831d98b5fbb1d81ce0ed20801702f443a"）進行註冊。 以及父鏈令牌（"0x53160735f7cc6ff75e48619f368bb94daff66a1b"）和父鏈橋接合約（"0x22c41ae528627b790233d2e59ea520be12350eb5"）。

詳細信息請參閱 [Service Chain API](../../../references/json-rpc/subbridge/register-token)。

## 申請價值轉移<a id="request-value-transfer"></a>

本節將解釋用戶在請求價值轉移時將調用的合約方法。
請求交易不允許零值（KAIA/ERC-20）。

### KAIA 轉機<a id="kaia-transfer"></a>

用戶可使用以下方法向**橋合約**進行 "要求價值轉移 "交易。

#### fallback <a id="fallback"></a>

如果用戶調用網橋的回退功能，則會請求向對應鏈中與請求用戶相同的賬戶地址進行 KAIA 轉賬。

```solidity
function () external payable;
```

#### 請求 KAIATransfer<a id="requestklaytransfer"></a>

如果用戶使用 `_to`調用該函數，則會請求向對應鏈中的 `_to`地址進行 KAIA 傳輸。

```solidity
function requestKAIATransfer(address _to, uint256 _value, bytes calldata _extraData) external payable
```

### ERC-20 轉讓<a id="erc-20-transfer"></a>

#### 通過橋樑合同提出 2 步申請<a id="2-step-request-via-bridge-contract"></a>

用戶在[批准](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)橋接合約的令牌後，可使用以下方法向橋接合約進行 "請求價值轉移 "交易。

```solidity
function requestERC20Transfer(address _tokenAddress, address _to, uint256 _value,uint256 _feeLimit,bytes memory _extraData) external
```

#### 通過 ERC-20 合同提出 1 步申請<a id="1-step-request-via-erc-20-contract"></a>

用戶可以使用以下方法直接向**ERC-20 合同**進行 "要求價值轉移 "交易，而無需審批。
那麼，ERC-20 合同就應該實現這一功能。

```solidity
function requestValueTransfer(uint256 _amount, address _to, uint256 _feeLimit, bytes calldata _extraData) external
```

### ERC-721 轉移<a id="erc-721-transfer"></a>

#### 通過橋樑合同提出 2 步申請<a id="2-step-request-via-bridge-contract"></a>

用戶在[批准](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)橋接合約的令牌後，可使用以下方法向橋接合約進行 "請求價值轉移 "交易。

```solidity
function requestERC721Transfer(address _tokenAddress, address _to, uint256 _tokenId, bytes memory _extraData) external
```

#### 通過 ERC-721 合同提出 1 步申請<a id="1-step-request-via-erc-721-contract"></a>

用戶可以使用以下方法直接向**ERC-721 合同**進行 "申請價值轉移 "交易，而無需審批。
那麼，ERC-721 合同就應該實現該功能。

```solidity
function requestValueTransfer(uint256 _uid, address _to) external
```

### onERC721Received() <a id="unsupported-onERC721Received"></a>

ERC-721 標準有 [onERC721Received](https://eips.ethereum.org/EIPS/eip-721) 回調函數。
onERC721Received() "與 "safeTransferFrom() "函數一起工作，但當前的網橋合約實現使用 "transferFrom()"，這意味著 "onERC721Recieved() "預計不會被調用。

另外，"onERC721Recieved() "之類的進一步操作應以另一種方式實現，如事件監聽（例如，"event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)\` ）。

## 價值轉移回收

價值轉移請求可能因多種原因而失敗。 假設您要求從副橋到主橋或從主橋到副橋的 KAIA 轉機。
在這種情況下，接收方的橋接合約必須比請求的 KAIA 數量多。 否則，傳輸將失敗，返回值中不會有錯誤提示。
價值轉移恢復功能會發現未處理的事件，並在給定的時間間隔內將其重新插入事件池，這意味著當對應的橋接器能成功處理該事件時，失敗的事務就能再次成功。
在上述例子中，當對應的橋接器有足夠的 KAIA 時，失敗的交易最終將通過價值轉移恢復來處理。
要將值傳輸恢復設置為默認值，需要設置兩個屬性：

```
SC_VTRECOVERY=1
SC_VTRECOVERY_INTERVAL=5
```

通過設置 `SC_VTRECOVERY=1` 可以自動運行數值傳送恢復。 SC_VTRECOVERY_INTERVAL "表示執行值傳遞恢復的間隔時間。

## 收取 KAIA/ERC-20 轉移費用<a id="collecting-fee-for-kaia-erc-20-transfer"></a>

在 ServiceChain 中，KAIA/ERC-20 轉賬具有收費功能。

\*\*即將更新。

## 定製您的橋牌合約 <a id="customizing-your-bridge-contract"></a>

在 ServiceChain 中，您可以使用自己定製的橋接器合同，該合同繼承自原始橋接器合同，用於自己的獨特服務。
本節將解釋如何定製 Bridge 合同，並介紹示例代碼。

\*\*即將更新。

