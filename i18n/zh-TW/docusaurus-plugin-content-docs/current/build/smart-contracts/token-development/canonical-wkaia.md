# 典範 WKAIA

為了更好地簡化使用者體驗，並減少在 dApp 間移動 (包裝與解除包裝) KAIA 時的摩擦，我們提供 Canonical WKAIA (前身為 WKLAY)，這是在 dApp 中使用 Wrapped KAIA 的標準介面。

為了達到 dApp 標準化和更安全的智慧契約，我們希望合作夥伴與我們一起使用 WKAIA 的標準實作，讓終端使用者可以一次將 KAIA 轉換為 WKAIA，並在不同的 dApp 中使用相同的 WKAIA。

## 實施細節

建議的 WKAIA 契約標準以 WETH 標準為基礎。 我們選擇遵循此標準，因為它經過審核，並廣為流行的 dApps 所採用。

## 已部署的合約地址

- Mainnet - 0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432
- Testnet (Kairos) - 0x043c471bEe060e00A56CcD02c0Ca286808a5A436

如需詳細資訊，請參閱 [GitHub 套件庫](https://github.com/kaiachain/canonical-wkaia)。