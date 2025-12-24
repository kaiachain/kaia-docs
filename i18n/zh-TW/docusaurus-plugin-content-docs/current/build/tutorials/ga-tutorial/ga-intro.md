# 1. 瓦斯抽取簡介

## 1.1 何謂瓦斯抽取？

Gas Abstraction (GA) 是 Kaia 的原生解決方案，可讓使用者以原子方式將少量列入白名單的 ERC-20 交換到 KAIA 中，以支付瓦斯費用。 這項功能消除了使用者必須持有 KAIA 代幣才能與區塊鏈互動的障礙。

當使用者只有 ERC-20 代幣時，GA 可讓使用者將少量的代幣交換至 KAIA，而無需支付預付的瓦斯費。 交換所花費的瓦斯會從 KAIA 的輸出中扣除，創造出無縫「無瓦斯交換」的體驗。

## 1.2 瓦斯抽取為何重要

**用戶上線的挑戰**

Kaia 新來者在下列情況下經常會遇到困難：

- 他們透過代幣橋接器抵達 Kaia 網路，但沒有橋接 KAIA
- 他們從集中式交易所提取 ERC-20 代幣到 Kaia 網路
- 他們收到空投，但沒有 KAIA 來支付瓦斯費

\*\* 產業背景\*\*

其他區塊鏈上也有類似的解決方案：

- [MetaMask加油站](https://metamask.io/ko/news/metamask-feature-update-gas-station)：允許在 Ethereum 和 BNB 智慧鏈上使用不同代幣支付網路費用
- [ERC-4337 Paymaster models](https://docs.erc4337.io/paymasters)：Ethereum L2 上的 dApp 經常透過執行以穩定幣結算費用的集中式 paymaster 伺服器來贊助瓦斯。

**Kaia的獨特方法**

與依賴集中式「付款主」服務的解決方案不同，Kaia 的 GA 是完全分散且不可信的。 此功能由網路層級的區塊提案者自動處理，可確保安全性和不中斷的服務。

## 1.3 使用案例與效益

\*\* 主要使用個案：\*\*

- **跨區塊鏈使用者**：為從其他區塊鏈橋接的使用者提供無縫體驗
- **CEX 提款**：從交易所提取代幣後的直接互動能力
- \*\* 空投接收者\*\*：用於接收代幣空投的使用者的即時實用程式
- \*\* 穩定幣支付\*\*：使用穩定幣的全球支付體驗，無瓦斯代幣摩擦

**對錢包提供者的好處：**

- 改善使用者上線體驗
- 減少了與瓦斯費混淆相關的支援票單
- 強化使用者保留與參與
- Web3 皮夾領域的競爭優勢

## 1.4 與 Consensus Liquidity (CL) 的關係

GA 原本是為了增加 [Consensus Liquidity tokens](https://blog.kaia.io/kaia-consensus-liquidity-a-new-paradigm-in-blockchain-liquidity/) 的效用而設計，讓使用者可以使用 CL tokens (例如 BORA、Swapscanner) 支付瓦斯。 不過，該功能也可以支援其他 ERC-20 代幣，包括穩定幣。