# 3. 支援的代幣

開發人員在嘗試無瓦斯交易前，應先查詢目前支援的代幣清單。

## 3.1. 代幣資格準則

- **ERC-20 規範：** 代幣必須完全符合 ERC-20 規範。
- **不支援 Fee-on-Transfer:** Fee-on-Transfer (FoT) 代幣，因為它們會造成交換金額不匹配，導致交易失敗。
- \*\* 管理白名單：\*\* `GaslessSwapRouter` 維護一個支援的代幣清單，由 Kaia Foundation 管理。

## 3.2 目前支援的代幣

無瓦斯交易目前支援下列代幣。 未來可能會納入其他 CL 代幣和穩定幣。

- **USDT**
- **博拉**

## 3.3 如何檢查支援的令牌清單

您可以在 Kaia 文件中找到主網路和測試網路的官方 [KIP-247 GaslessSwapRouter contract addresses](https://docs.kaia.io/references/contract-addresses/)。

**GaslessSwapRouter 合約地址：**

- **主網路**：`0xCf658F786bf4AC62D66d70Dd26B5c1395dA22c63`
- **Kairos Testnet**：`0x4b41783732810b731569E4d944F59372F411BEa2`

最新地址請務必參閱官方文件。

### 使用區塊瀏覽器 (KaiaScan)

使用 KaiaScan 等區塊瀏覽器檢查支援的代碼：

![](/img/build/tutorials/ga3.png)

1. 前往 [KaiaScan](https://kaiascan.io/) (或 [kairos.kaiascan.io](https://kairos.kaiascan.io/) 的測試網路)。
2. 搜尋 `GaslessSwapRouter` 位址。
3. 導覽到 **Contract** 索引標籤，然後選擇 **Read Contract**。
4. 找到`getSupportedTokens()`函數，然後按一下 **查詢**。 這將會傳回支援的 ERC20 原始碼地址陣列。

### 程式化查詢

若要以程式化的方式檢查支援的代幣，您可以使用 GaslessSwapRouter 契約方法。

**使用 GSR 方法：**

```solidity
function getSupportedTokens() external view returns (address[] memory);
function dexAddress(address token) external view returns (address dex); // reverts if token unsupported
```

**使用 SDK（範例）**

```javascript
// Ethers-ext.js
const ethers = require("ethers6");
const { gasless } = require('@kaiachain/ethers-ext');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const router    = await gasless.getGaslessSwapRouter(provider);
const supported = await router.getSupportedTokens();

// Web3-ext.js
const { Web3 } = require("@kaiachain/web3js-ext");

const provider = new Web3.providers.HttpProvider(RPC_URL);
const web3 = new Web3(provider);

const router    = await gasless.getGaslessSwapRouter(web3);
const supported = await router.methods.getSupportedTokens().call();
```