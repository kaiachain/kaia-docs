# Kaia 硬分叉歷史

本頁顯示 Kaia 區塊鏈的所有硬分叉。

:::note

- 有關 Kaia 發行的詳細資訊，請參閱 [Kaia 發行紀錄 on GitHub](https://github.com/kaiachain/kaia/releases)。
- 關於 Kaia 轉型之前的硬分叉，請參考 [Klaytn 硬分叉歷史](klaytn-history.md)。

:::

## 布拉格

| ` `  | 啟動                                            | 主網路                                        |
| ---- | --------------------------------------------- | ------------------------------------------ |
| 日期   | 2025 年 6 月 10 日 10:26 / UTC+9 | Jul 17, 2025 10:26 / UTC+9 |
| 區塊號碼 | `#187,930,000`                                | `#190,670,000`                             |

### 摘要

Prague hardfork 在 Kairos 測試網路的 [v2.0.0 版本](https://github.com/kaiachain/kaia/releases/tag/v2.0.0) 和 Mainnet 的 [v2.0.2 版本](https://github.com/kaiachain/kaia/releases/tag/v2.0.2) 中推出。 它根據 EIP-2537 引進 BLS12-381 預先編譯、根據 EIP-2935 引進歷史 blockhash 系統合約、根據 EIP-7610 引進合約建立檢查、根據 EIP-7623 和 [KIP-223](https://kips.kaia.io/KIPs/kip-223) 引進更新的 calldata 天然氣價格、根據 EIP-7702 和 [KIP-228](https://kips.kaia.io/KIPs/kip-228) 引進 SetCode 交易類型，以及根據 [KIP-226](https://kips.kaia.io/KIPs/kip-226) 引進 Consensus Liquidity 功能。 此外，它還包含瓦斯抽取功能，可使用代幣支付瓦斯費。

## Kaia 過渡

| ` `  | 啟動                                            | 主網路                                           |
| ---- | --------------------------------------------- | --------------------------------------------- |
| 日期   | 2024 年 6 月 13 日 10:13 / UTC+9 | 2024 年 8 月 29 日 10:29 / UTC+9 |
| 區塊號碼 | `#156,660,000`                                | `#162,900,480`                                |

### 摘要

Kaia Transition 硬分叉是隨著 Kairos 測試網路的 [v1.0.0 版本](https://github.com/kaiachain/kaia/releases/tag/v1.0.0) 和主網路的 [v1.0.2 版本](https://github.com/kaiachain/kaia/releases/tag/v1.0.2) 推出的。 此硬分叉標誌著從 Klaytn 到 Kaia 區塊鏈的過渡。 它包括根據 [KIP-160](https://kips.kaia.io/KIPs/kip-160) 的 TreasuryRebalanceV2 hardfork 和代幣分配合約、根據 [KIP-162](https://kips.kaia.io/KIPs/kip-162) 類似 EIP-1559 的交易優先費 (tip)、[KIP-163](https://kips.kaia.io/KIPs/kip-163) 中所述的驗證器 PublicDelegation 和 CnStakingV3 合約，以及修改定價更新間隔為 1 個區塊。