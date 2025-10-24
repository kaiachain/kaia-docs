# 如何在 Kaia Wallet 和 MetaMask 上估算瓦斯限值和價格

本指南將逐步說明如何在 Kaia 上估算瓦斯費/價格。

## 瓦斯是什麼？

Gas 表示處理 Kaia 鍊上的交易，無論是付款（價值轉移）或調用（智慧型契約呼叫）所需的計算力計量單位。 在此情況下，它是指在 Kaia 虛擬機器 (KVM) 上進行的計算。

Kaia 網路需要瓦斯來執行交易。 當您傳送代用幣、與契約互動、傳送 KAIA 或在區塊鏈上做任何其他事情時，您必須為該計算付費。 該款項以瓦斯計算，而瓦斯總是以 KAIA 支付。

## 瓦斯限值是多少？

瓦斯限額是指您願意在交易中消耗的最大瓦斯量。 比起簡單的付款，更複雜的交易，尤其是執行智慧型契約的交易，需要更多的運算資源和更高的瓦斯限額。 標準的 KAIA 轉移通常使用約 21,000 個瓦斯。

如果您設定的瓦斯限額太高，例如簡單轉帳的 50,000，交易只會使用它所需要的 (約 21,000)，並將其餘的退回。 但如果設定得太低，例如 20,000，交易會立即失敗，而且不消耗瓦斯。 而如果交易在執行過程中耗盡汽油，例如在呼叫智慧型契約時，它會還原所有的效果，但您仍要為它用掉的汽油付費。

## 整體瓦斯收費結構

由於 Kaia 硬分叉之後，交易創造者支付的整體費用計算方式為

( **瓦斯價格** x **使用瓦斯單位數**)。

其中 **瓦斯價格** = **基本費用** + **優先費用**

### 什麼是基本費用？

基本費用是您需要支付的每單位瓦斯最低價格，您的交易才能在網絡上處理。 它是由網路自行設定，並在每個區塊之後向上或向下調整，這取決於前一個區塊是高於或低於瓦斯目標 - 網路在每個區塊所要處理的交易量。

如果區塊繁忙且使用量超過目標，基本費用就會增加（5%），以幫助紓緩擠塞情況；如果繁忙程度降低，基本費用就會下降。  此機制有助於保持區塊大小穩定，並使每個人的費用更可預測。 基本費用會在交易處理完成後燒掉，使其不再流通。

### 什麼是優先費？

優先費也稱為小費，是您自願在基本費用之外支付的額外金額，以協助優先處理您的交易。 在 Kaia 上，這筆小費不會直接給驗證者；相反地，它會捐贈給網路的獎勵池，之後再分發給驗證者和生態系統基金。 提供較高的小費，表示您願意支付較高的費用，以協助您的交易能更快處理，並排在相同區塊的其他交易之前。

## 估算瓦斯費

若要清楚瞭解您的交易通常會消耗多少瓦斯，使用下列方法是個不錯的做法：

### 在 ethers.js 中使用 eth_estimateGas API

與其猜測您的交易可能會消耗多少汽油，您可以利用節點本身的執行上下文來準確地告訴您，它預計您的交易需要多少計算工作，然後再將其傳播到鏈上。

這對開發人員和日常使用者都很有用，前者需要以程式化的方式控制瓦斯費用，避免因**瓦斯耗盡**錯誤而造成故障；後者則希望預先知道自己的總費用，避免錢包中出現突如其來的費用。

這是透過**eth_estimateGas** API 執行，透過 ethers.js 揭露。

**範例 - 估計薄荷功能的氣體**

比方說，您想要估算智慧型契約的薄荷功能的氣體。 這裡有一個清晰、完整的腳本，可以做到這一點：

```js
const { ethers } = require('ethers');
require('dotenv').config();

const GOLD_CONTRACT_ADDRESS = '0xE13d6C18c52c1de9267aE6DF647fD4ADfAf82977';
const AMOUNT_TO_SEND = ethers.parseUnits('20', 18); // 20 tokens

// minimal ABI for the `mint` function
const MINT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Main script
async function estimateMintGas() {

 try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.ES_PRIVATE_KEY, provider);
    
    // prepare encoded transaction
    const iface = new ethers.Interface(MINT_ABI);
    const encodedData = iface.encodeFunctionData('mint', [wallet.address, AMOUNT_TO_SEND]);
    
    // estimate Gas
    const estimatedGas = await provider.estimateGas({ 
      to: GOLD_CONTRACT_ADDRESS, 
      from: wallet.address, 
      data: encodedData 
    });

    // gasPrice
    const gasPrice = await provider.getFeeData();

    console.log("Estimated Gas for mint:", estimatedGas.toString());
    console.log("Estimated GasPrice for mint:", gasPrice.gasPrice.toString());

    return estimatedGas;
    
  } catch (error) {
    console.error('Gas estimation failed!', error.reason || error.message);
    throw error;
  }
}

estimateMintGas().catch((err) => console.error('Error estimating gas!', err)); 
```

執行此指令碼將產生類似的輸出：

```bash
Estimated Gas for mint : 69002
Estimated GasPrice for mint: 27500000000
```

ethers.js 從您的智慧契約的 ABI 和參數中建構交易的呼叫資料，透過 eth_estimateGas 傳送至節點來執行一次乾式運行，而節點在不將其加入區塊的情況下執行，以確定會消耗多少瓦斯。

從上面我們可以很容易地估算出我們的瓦斯費用：

_使用的瓦斯_ x _瓦斯價格_

_69002 x 0.0000000275
\= 0.001897555 KAIA_

### 使用 MetaMask (KAIA 傳輸)

![](/img/build/wallets/estimate-gas-mm.png)
從圖片中可以看到：

- 使用的瓦斯：21,000
- 基本費用：25 Gwei (或 0.000000025 KAIA)
- 優先權手續費：2.5 Gwei（或 0.0000000025 KAIA）

若要計算瓦斯費總額，只需將瓦斯使用量乘以基本費和優先費之和即可。

_21,000 \* (0.000000025 + 0.0000000025)
0.0005775 kaia._

這很好地顯示了總金額如何達到 **0.0005775 KAIA**，與 MetaMask 在上述交易詳細資訊圖片中顯示的完全一致。

### 使用 Kaiascan (智慧型契約執行 - SafeMint 功能)

![](/img/build/wallets/estimate-gas-kaiascan.png)

從圖片中可以看到：

- 使用的瓦斯：184,250
- 有效瓦斯價格 (基本費用 + 優先費用) = 0.0000000275
  - 基本費用：25 Gkei（或 0.000000025 KAIA）
  - 優先費：2.5 Gkei（或 0.0000000025 KAIA）

要計算總瓦斯費，我們只需將瓦斯使用量乘以基本費和優先費之和：

_184,250 \* (0.000000025 + 0.0000000025)
0.005066875 kaia_

這很好地顯示了總金額如何達到 0.005066875 KAIA，與上面交易詳細資訊圖片中 Kaiascan 顯示的完全一致。

### 使用上一區塊的基本費用

如果您想使用上一區塊的基本費用進行計算，請遵循此方法：

要找到下一個基本費用，如果區塊已滿或超過其瓦斯目標，則將上一個基本費用乘以 1.05。 這意味著當一個區塊的瓦斯用量高於網絡目標時，基本費用將增加 5%，以幫助緩解擠塞和抑制需求。 如果區塊使用不足，基本費用可能會維持不變，甚至在隨後的區塊中減少。

| 塊 | 包括瓦斯       | 先前的基本費用                     | 下一個基本費用                                                                     |
| - | ---------- | --------------------------- | --------------------------------------------------------------------------- |
| 1 | 15,000,000 | 100 gkei                    | 100 gkei                                                                    |
| 2 | 30,000,000 | 100 gkei                    | 100 gkei                                                                    |
| 3 | 30,000,000 | 100 gkei                    | 100 gkei x 1.05 = 105 gkei                                  |
| 4 | 30,000,000 | 105 gkei                    | 105 gkei x 1.05 = 110.25 gkei               |
| 5 | 30,000,000 | 110.25 gkei | 110.25 x 1.05 = 115.76 gkei |




