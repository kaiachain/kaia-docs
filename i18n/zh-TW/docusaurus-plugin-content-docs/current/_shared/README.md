# 如何使用共用內容資料夾

此資料夾包含可重複使用的內容，這些內容會出現在 Kaia Docs 網站的多個位置。 與其重複內容或使用混亂的交叉參考，我們使用了一種可維護使用者導覽上下文的包裝方法。

## 何時使用共用內容

使用共用內容時：

- 相同的內容需要出現在多個類別中（例如：Get Started、Wallets、Cookbooks），因為這些內容與不同的使用者旅程相關。
- 您要避免內容重複，並確保所有文件的一致性。
- 您希望每個類別都保留自己的側邊欄上下文和 URL。

## 如何建立共用內容

### 1. 建立共用內容檔案

將您的內容放入 `docs/_shared/` 並加上描述性的檔案名稱：

```
docs/_shared/configure-wallet-for-kaia-networks.mdx
```

### 2. 建立偽裝檔案

針對內容應該出現的每個位置，建立一個 wrapper 檔案：

**範例：開始部分**

```mdx
// docs/build/get-started/configure-wallet-for-kaia-networks.mdx
---
id: wallet-config-get-started
title: How to configure your wallet for Kaia Networks
hide_title: true
custom_edit_url: https://github.com/kaiachain/kaia-docs/blob/main/docs/_shared/configure-wallet-for-kaia-networks.mdx
---

import SharedContent from '../../_shared/configure-wallet-for-kaia-networks.mdx';

<SharedContent />
```

**範例：錢包組態部分**

```mdx
// docs/build/wallets/wallet-config/configure-wallet-for-kaia-networks.mdx
---
title: How to configure your wallet for Kaia Networks
hide_title: true
custom_edit_url: https://github.com/kaiachain/kaia-docs/blob/main/docs/_shared/configure-wallet-for-kaia-networks.mdx
---

import SharedContent from '../../../_shared/configure-wallet-for-kaia-networks.mdx';

<SharedContent />
```

### 3. 更新側邊欄

在 `sidebars.js` 中以獨特的 ID 參照每個 wrapper：

```javascript
{
  type: 'category',
  label: 'Get Started',
  items: [
    'build/get-started/wallet-config-get-started', // References wrapper #1
    // ...
  ],
},
{
  type: 'category', 
  label: 'Wallet Configuration',
  items: [
    'build/wallets/wallet-config/configure-wallet-for-kaia-networks', // References wrapper #2
    // ...
  ],
}
```

## 必須填寫的正面欄位

- `title`：頁面標題 (可依每個封裝自訂)
- `hide_title: true`：防止重複顯示標題
- `custom_edit_url`：點選**編輯此頁面**時，指向 GitHub 編輯的共用原始碼檔案
- `id`（可選）：當自動產生的 ID 不適合時的唯一識別碼

## 最佳實務

### 共用內容中的連結

使用來自文件根目錄的絕對路徑，以避免連結中斷：

```mdx
<!-- Good -->
[API Reference](/references/api/wallet-api)

<!-- Bad -->
[API Reference](./api/wallet-api)
```

### 圖片與資產

將共用資產放置在 `static/` 中，並以絕對路徑參照：

```mdx
![Wallet Setup](/img/wallet-setup.png)
```

### 相對進口路徑

計算每個 wrapper 到共用檔案的正確相對路徑：

- 自 `docs/build/get-started/`: `../../_shared/filename.mdx`
- 自 `docs/build/wallets/config/`: `../../../_shared/filename.mdx`

## 檔案命名慣例

使用描述性的大小寫檔案名稱，清楚顯示內容目的：

- `configure-wallet-for-kaia-networks.mdx`
- smart-contract-deployment-guide.mdx
- `transaction-fee-optimization.mdx`

## 優點

- \*\* 單一真相來源\*\* - 一次編輯，處處更新
- \*\* 保留導覽上下文\*\* - 使用者停留在預定的區段
- \*\* 內容一致\*\* - 不同地點之間無版本漂移
- **正確的編輯連結** - 撰稿人編輯實際的原始碼檔案