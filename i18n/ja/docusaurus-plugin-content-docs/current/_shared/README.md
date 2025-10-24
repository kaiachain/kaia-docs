# 共有コンテンツフォルダの使い方

このフォルダには、Kaia Docsサイト内の複数の場所に表示される再利用可能なコンテンツが含まれています。 コンテンツが重複したり、混乱を招く相互参照を使用したりする代わりに、私たちは、ユーザーのナビゲーション・コンテキストを維持するラッパー・アプローチを使用しています。

## 共有コンテンツの利用時期

共有コンテンツを使う

- 同じコンテンツが複数のカテゴリーに表示される必要がある（例：Get Started、Wallets、Cookbook）。
- 内容の重複を避け、文書全体の一貫性を確保したい。
- 各カテゴリーが独自のサイドバーコンテキストとURLを保つようにしたい。

## 共有コンテンツの作り方

### 1. 共有コンテンツファイルの作成

コンテンツを `docs/_shared/` に記述的なファイル名で置きます：

```
docs/_shared/configure-wallet-for-kaia-networks.mdx
```

### 2. ラッパーファイルの作成

コンテンツを表示する場所ごとに、ラッパー・ファイルを作成する：

\*\*例スタートセクション

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

\*\*例ウォレット設定セクション

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

### 3. サイドバーの更新

各ラッパーを `sidebars.js` 内の一意な ID で参照する：

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

## フロントマター必須項目

- タイトル\`：ページタイトル (ラッパー毎にカスタマイズ可能)
- hide_title: true\`：タイトルの重複レンダリングを防ぐ
- custom_edit_url\`：このページを編集する\*\* がクリックされたときに GitHub の編集用共有ソースファイルを指す
- id\`（オプション）：自動生成されたIDが適切でない場合の一意な識別子。

## ベストプラクティス

### 共有コンテンツ内のリンク

リンク切れを防ぐため、docsルートからの絶対パスを使用してください：

```mdx
<!-- Good -->
[API Reference](/references/api/wallet-api)

<!-- Bad -->
[API Reference](./api/wallet-api)
```

### 画像と資産

共有アセットを `static/` に置き、絶対パスで参照する：

```mdx
![Wallet Setup](/img/wallet-setup.png)
```

### 相対的輸入経路

各ラッパーから共有ファイルへの正しい相対パスを計算する：

- docs/build/get-started/`から: `../../_shared/filename.mdx\`.
- docs/build/wallets/config/`から: `../../../_shared/filename.mdx\`.

## ファイル命名規則

コンテンツの目的を明確に示す、説明的なケバブケースのファイル名を使用する：

- `configure-wallet-for-kaia-networks.mdx`。
- `smart-contract-deployment-guide.mdx`.
- `transaction-fee-optimization.mdx`

## メリット

- **真実の単一ソース** - 一度編集すれば、どこでも更新可能
- **保存されたナビゲーション・コンテキスト** - ユーザーは目的のセクションに留まります。
- **一貫性のあるコンテンツ** - ロケーション間でのバージョン・ドリフトなし
- **適切な編集リンク** - 投稿者は実際のソースファイルを編集する。