# viem

![](/img/references/kaiaXviem.png)

[Viem](https://viem.sh/)是以太坊的類型碼接口，提供與以太坊和其他 EVM 兼容區塊鏈交互的底層基元。 由於 kaia 支持[Ethereum Equivalence](https://medium.com/klaytn/using-ethereum-tools-in-klaytn-dc068d48de04)功能，因此 viem 等以太坊工具無需進行任何重大修改即可在 kaia 上使用。

因此，開發人員可以利用這種兼容性，使用 viem 庫與 kaia 節點進行交互。

在本指南中，您將學習如何使用 viem 庫從區塊鏈讀取數據、發送交易以及與 kaia 網絡上的現有合約交互。

## 要求

- 代碼編輯器：源代碼編輯器，如 [VS Code](https://code.visualstudio.com/download)。
- [Metamask](.../.../.../build/tutorials/connecting-metamask.mdx#install-metamask)：用於部署合約、簽署事務和與合約交互。
- RPC 端點：您可以從支持的[端點提供程序]（.../public-en.md）中獲取。
- 從 [水龍頭](https://faucet.kaia.io)測試 KAIA：為您的賬戶注入足夠的 KAIA。
- [NodeJS和NPM](https://nodejs.org/en/)
- [TS-node](https://www.npmjs.com/package/ts-node)：用於運行 TypeScript 腳本。

## 設置項目

開始時，您需要創建一個項目目錄來存放本指南中要創建的文件。

```bash
mkdir viem-example
cd viem-example
```

### 1. 安裝 viem

要安裝 viem，請在終端運行以下命令：

```bash
npm i viem
```

在本教程中，我們將創建一系列腳本文件，用於從區塊鏈讀取數據、發送交易以及與現有智能合約交互。 要開始使用，您需要知道如何為每個腳本文件設置 viem。

### 2. 設置公共客戶端和傳輸

首先，您需要用所需的 [Transport](https://viem.sh/docs/clients/intro) 和 [Chain](https://viem.sh/docs/chains/introduction) 設置公共 [客戶端](https://viem.sh/docs/clients/intro)。 公共客戶端是**公共**[JSON-RPC API](https://docs.kaia.io/references/public-en/) 方法的接口，例如通過[公共操作](https://viem.sh/docs/actions/public/introduction)檢索區塊編號、交易、讀取智能合約等。

```ts
import { createPublicClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 

```

### 3. 設置錢包客戶端和賬戶

其次，您需要設置一個錢包客戶端與賬戶進行交互。 使用錢包客戶端，您可以通過[錢包操作](https://viem.sh/docs/actions/wallet/introduction)執行檢索賬戶、執行交易、簽署信息等操作。

```ts
import { createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
 
const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY HERE");
```

## 從區塊鏈讀取數據

要從區塊鏈中讀取數據，請運行以下命令在項目文件夾中創建一個新的 `read.ts` 文件：

```bash
touch read.ts
```

創建該文件後，按照上文**設置部分**的步驟設置公共客戶端。 在本節中，您將學習如何從區塊鏈中讀取數據（如 blockNumber、KAIA 餘額）。

要查看實際效果，請在您的 `read.ts` 中粘貼以下代碼。

```ts
import { createPublicClient, http, formatEther } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 


async function getBlockNumber() {
    const blockNumber = await client.getBlockNumber() 
    console.log(`Current block number is: ${blockNumber}`);
}

async function getKlayBalance() {
  const balance = await client.getBalance({ 
    address: '0x75Bc50a5664657c869Edc0E058d192EeEfD570eb',
  })
  const formatBal = formatEther(balance);
  console.log(`Current KAIA balance is ${formatBal}`);  
}


getBlockNumber();
getKlayBalance();
```

**輸出**

要運行腳本並從區塊鏈中讀取數據，請在終端中粘貼以下命令：

```
npx ts-node read.ts
```

如果交易成功，您將在終端上看到區塊編號和用戶的 KAIA 餘額。

![](/img/references/viem-read.png)

## 向區塊鏈發送交易

要向區塊鏈發送交易，請運行此命令在項目文件夾中創建一個新的 `send.ts` 文件：

```bash
touch send.ts 
```

創建該文件後，按照上文**設置部分**的步驟設置錢包客戶端。 在本節中，您將學習如何向區塊鏈發送交易（例如，向某個地址發送 KAIA）。

要查看實際效果，請在您的 `send.ts` 中粘貼以下代碼。

```ts
import { createWalletClient, http, parseEther } from 'viem'
import { klaytnBaobab } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY");


async function sendKlayToRecipient() {
  const hash = await walletClient.sendTransaction({ 
    account,
    to: "PASTE RECIPIENT ADDRESS",
    value: parseEther('0.01')
  })

  console.log(`Send KAIA tx hash is: ${hash}`);
}

sendKlayToRecipient();

```

**輸出**

要運行腳本並向區塊鏈發送交易，請在終端中粘貼以下命令：

```
npx ts-node send.ts
```

如果交易成功，你會在終端中看到交易哈希值記錄。

![](/img/references/viem-send.png)

## 與智能合約互動

要與 kaia 上現有的智能合約交互，請運行此命令在項目文件夾中創建一個新的 `interact.ts` 文件：

```bash
touch interact.ts
```

創建該文件後，按照上文**設置部分**的步驟設置公共客戶端和錢包客戶端。 在本節中，您將同時使用 viem 和 viem：

- 從合約中讀取；以及
- 寫入合約。

為編寫本指南，我們在 [Remix IDE](https://remix.ethereum.org/) 上編譯並部署了 simple_storage 合約。 因此，我們將通過調用 `retrieve` 函數從該合約中讀取內容，並通過調用 `store` 函數向該合約發送事務。

### 1. 從合約中讀取

為了讀取合約，我們使用了 [readContract](https://viem.sh/docs/contract/readContract#readcontract) 方法，該方法在內部使用 [Public Client](https://viem.sh/docs/clients/public) 調用帶有 [ABI 編碼數據](https://viem.sh/docs/contract/encodeFunctionData) 的 [call action](https://viem.sh/docs/actions/public/call)。 要查看實際效果，請在您的 `interact.js` 中粘貼以下代碼。

```ts
import { createPublicClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http("https://public-en-kairos.node.kaia.io"), 
}) 


const abi =  [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


async function readFromContract() {
  const retrieve = await client.readContract({
    address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",  // Contract Address
    abi: abi,
    functionName: 'retrieve'
  })

  console.log(`Value read from contract is: ${retrieve}`);
}

```

### 2. 寫入合約

為了寫入合約，我們使用了 [writeContract](https://viem.sh/docs/contract/writeContract#writecontract) 方法，該方法內部使用 [Wallet Client](https://viem.sh/docs/clients/wallet) 來調用帶有 [ABI 編碼數據](https://viem.sh/docs/contract/encodeFunctionData) 的 [sendTransaction action](https://viem.sh/docs/actions/wallet/sendTransaction)。 要查看實際效果，請在您的 `interact.js` 中粘貼以下代碼。

```ts
import { createWalletClient, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
 
const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http("https://public-en-kairos.node.kaia.io")
})
 
const account = privateKeyToAccount("PASTE PRIVATE KEY");

const abi =  [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


async function writeToContract() {

  const { request } = await client.simulateContract({
    address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",  // Contract Address
    abi: abi,
    functionName: "store",
    account: account,
    args: [694n],
  })

  const hash = await walletClient.writeContract(request)

  console.log(`Hash from writing to a contract: ${hash}`);
}


writeToContract();
```

**輸出**

要運行腳本並與智能合約交互，請在終端中粘貼以下命令：

```bash
npx ts-node interact.ts
```

如果交易成功，你將看到交易哈希值和存儲在終端中的值。

![](/img/references/viem-interact.png)

有關 viem 的更深入指南，請參閱 [viem docs](https://viem.sh/docs/getting-started)。 此外，您還可以在 [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/sdk-and-libraries-for-interacting-with-klaytn-node/viem) 上找到本指南的完整實現代碼。
