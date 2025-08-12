# 6. 進階主題與常見問題

本節涵蓋進階的整合技術、最佳實務、疑難排解技巧，以及有關 Kaia 的 Gas Abstraction (GA) 功能的常見問題。 它專為想要優化實作並確保順暢使用者體驗的開發人員所設計。

## 6.1 最佳實務

| 主題                     | 建議                                                                                                                                                                                     | 注意事項                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **滑動**                 | 對於 `getAmountIn()` 開始使用 **0.5 % (50 bps)**，除非令牌非常不穩定。                                                                                               | SDK 並未\*\*\*硬體編碼值；0.5 % 是 Kaia 參考程式碼中顯示的事實預設值。                                          |
| **允許**                 | 快取 ERC-20 限額，並在「限額 > 0」時**跳過「ApproveTx」**，避免額外的簽章與瓦斯。                                                                                                                                  | KIP-247 允許 2-tx bundle (Lend + Swap) 當批准已經存在時，所以重複使用津貼是完全安全的。                        |
| **批量提交**               | 使用 `kaia_sendRawTransactions` (array payload) 將 **ApproveTx + SwapTx** 推到一起，防止池競賽情況。                                                                                | 單次 tx 呼叫 (`eth_sendRawTransaction`)可以運作，但如果第二次 tx 先到達節點，就會無法通過 nonce/static-rule 檢查。 |
| **安全**                 | a) **硬體編碼**來自 Kaia 文件的標準 GaslessSwapRouter (GSR) 位址。 <br/>b) 在建立交換之前，**驗證支援**，例如在 try/catch 裡面的 `await router.dexAddress(token)` 或檢查從 `getSupportedTokens()` 傳回的清單。 | 防止網路釣魚合約或不支援的代幣劫持 GA 流量。                                                                                |
| \*\* 不含 KAIA 的瓦斯估算\*\* | 使用`eth_estimateGas`與**state override**在呼叫中給寄件者一個臨時餘額，例如`eth_estimateGas(txObj, 'latest', { [from]：{ balance: '0x…' }})`.                                               | 當帳戶的 KAIA 確實為 0 時，繞過 _「餘額不足 」_ 錯誤。                                                                      |

## 6.2 疑難排解

| 症狀                                               | 可能原因                                                                                                          | 建議修復                                                                                                                                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \*\* 從未開採過\*\*                                   | a) `token` **未列入白名單**。 <br/>b) `minAmountOut`太緊，整個捆綁會被還原。                                                     | - 先檢查支援\*\*：在簽署前\*\*： `await router.dexAddress(token)` (若不支援則會還原) **或** `getSupportedTokens().includes(token)` \*\*。<br/>- 增加 `slippageBps` 或及時重新引用 `amountIn` 。 |
| **`INSUFFICIENT_OUTPUT_AMOUNT` 回復**              | 價格在報價與執行之間改變，因此 GSR 檢查 `amountReceived >= minAmountOut` 失敗。                                                   | 使用目前的池儲備重新執行 `getAmountIn()` ，然後以較高的 `minAmountOut` 或較寬的滑動區重建 `SwapTx`。                                                                                                             |
| **節點拒絕傳送 (「資金不足」)**           | 只傳送了 **GaslessApproveTx**。 由於跳過了餘額檢查，而且遺失了配對的 **SwapTx**，提案者從未注入 **LendTx**，因此交易花費了它沒有的 KAIA。                 | 永遠透過 `kaia_sendRawTransactions` 在同一批次\*\*中提交 \*\*ApproveTx & SwapTx，或確保 `approveRequired == false` 以便您可以傳送 2-tx 包。                                              |
| \*\* 綑綁內的錯誤配對\*\*                                | 外部 dApp 在 GA bundle 開採之前，會傳送一個消耗下一個 nonce 的普通 tx。                                                             | 在簽署前查詢 `getTransactionCount()`；如果 nonce 已經移動，則重建兩個 tx 物件。                                                                                                                           |
| `klay_sendRawTransactions → "undefined tx type"` | 您嘗試透過 **kaia_…** 端點批次傳送 Kaia 特定的 tx 類型 (例如 0x30)，而該端點只支援 Ethereum 類型。 | 使用 `kaia_sendRawTransactions` 傳送 GA 包，然後用 `klay_sendRawTransaction` 廣播 0x30 AppTx。                                                                                                  |

## 6.3 常見問題

### GA 在主網路上可用嗎？

是的，GA 目前已在 **Kairos testnet** 和 **mainnet** 上啟用。

### 如果使用者沒有足夠的代幣進行交換，會發生什麼情況？

SwapTx 會在鏈上失敗，但由於 \*\*KIP-245 的原子捆綁 \*\*，整個捆綁會被還原並從區塊中排除。 使用者不會損失任何資金，而且他們在鏈上的狀態保持不變 - 他們為失敗的嘗試支付零瓦斯費。

### 我該如何檢查哪些代用幣以及有多少被換成瓦斯？

每次成功的 `swapForGas` 呼叫都會從 `GaslessSwapRouter` 發出 **SwappedForGas** 事件。\
您可以

1. 在 KaiaScan 上尋找路由器位址 (請參閱 contract-addresses doc) 並開啟 **Events** 標籤。
2. 解碼事件日誌中顯示的「token」、「amountIn」、「amountOut」和「amountRepay」欄位。

如果您需要鏈上的資料，請在索引器或 dApp 後端監聽 `SwappedForGas`。

### GA 可以被節點停用嗎？

個別節點可以停用 GA，但預設是\*\*啟用的。 如果一個節點停用了它，交易最終會由其他支援 GA 的節點處理。

### 瓦斯抽取會減慢區塊的速度嗎？

沒有 KIP-245 免除了捆綁對每塊 250 毫秒 \* 執行超時 \* 檢查的限制，因此 EVM 一旦開始就允許完成整個捆綁的處理。 GA 交易僅限於眾所皆知的 ERC20 核准與 GSR 交換作業，因此其執行時間相當合理。 因此，GA bundle 不會危及鏈的區塊時間預算。

### 我在哪裡可以看到無瓦斯交易的實況？

您可以在 Kairos testnet explorer 上檢視它們。 這些區塊顯示串接執行的完整 bundle：

- \*\* 3-tx 綑綁範例 (借出 + 批准 + 交換):\*\* [Block 189826352 on Kairos KaiaScan](https://kairos.kaiascan.io/block/189826352?tabId=blockTransactions&page=1)
- \*\* 2-tx 綑綁範例 (借出 + 交換):\*\* [Block 189826547 on Kairos KaiaScan](https://kairos.kaiascan.io/block/189826547?tabId=blockTransactions)

## 6.4 額外資源

**技術規格：**

- [KIP-247：無氣體交易](https://kips.kaia.io/KIPs/kip-247) - 核心 GA 規格
- [KIP-245：交易捆綁](https://kips.kaia.io/KIPs/kip-245) - 捆綁機制
- [GaslessSwapRouter Contract](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)

\*\* 開發人員資源：\*\*

- [Kaia SDK 儲存庫](https://github.com/kaiachain/kaia-sdk)
- [正式合約地址](https://docs.kaia.io/references/contract-addresses/)
- [Kaia 開發人員文件](https://docs.kaia.io/)

**社區與支援：**

- [KIP-247 討論區](https://devforum.kaia.io/t/discussion-on-kip-247/8089)
- [Kaia Discord](https://discord.gg/kaiachain)
- [GitHub Issues for SDK Support](https://github.com/kaiachain/kaia-sdk/issues)

**教育內容：**

- [如果可以用穩定幣支付瓦斯費呢？](https://medium.com/kaiachain/pay-for-gas-fees-with-any-token-a-deep-dive-into-kaias-trustless-gas-abstraction-d670355a096b)
- [Kaia Consensus 流動資金公告](https://medium.com/kaiachain/kaia-consensus-liquidity-a-new-paradigm-in-blockchain-liquidity-7c8a7393cd19)