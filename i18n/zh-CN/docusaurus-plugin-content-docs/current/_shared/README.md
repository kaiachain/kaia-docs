# 如何使用共享内容文件夹

该文件夹包含可重复使用的内容，这些内容会出现在整个 Kaia Docs 网站的多个位置。 我们没有重复内容或使用令人困惑的交叉引用，而是采用了一种包装方法，以保持用户的导航上下文。

## 何时使用共享内容

使用共享内容时：

- 同样的内容需要出现在多个类别中（例如，"开始"、"钱包"、"烹饪书"），因为这些内容与不同的用户旅程相关。
- 您要避免内容重复，并确保整个文档的一致性。
- 您希望每个类别都有自己的侧边栏上下文和 URL。

## 如何创建共享内容

### 1. 创建共享内容文件

将内容放在 `docs/_shared/` 中，并使用描述性的文件名：

```
docs/_shared/configure-wallet-for-kaia-networks.mdx
```

### 2. 创建封装文件

为每个需要显示内容的位置创建一个封装文件：

**示例：开始部分**

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

**示例：钱包配置部分**

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

### 3. 更新侧边栏

在 `sidebars.js` 中用唯一 ID 引用每个包装器：

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

## 必填前置字段

- title\`：页面标题（可根据包装器自定义）
- `hide_title: true`：防止重复显示标题
- custom_edit_url\`：当点击**编辑此页面**时，指向 GitHub 编辑的共享源文件
- id\`（可选）：当自动生成的 ID 不合适时的唯一标识符

## 最佳做法

### 共享内容中的链接

使用来自文档根目录的绝对路径，以避免链接中断：

```mdx
<!-- Good -->
[API Reference](/references/api/wallet-api)

<!-- Bad -->
[API Reference](./api/wallet-api)
```

### 图片和资产

将共享资产放在 `static/` 中，并使用绝对路径引用：

```mdx
![Wallet Setup](/img/wallet-setup.png)
```

### 相对进口路径

计算从每个封装器到共享文件的正确相对路径：

- 来自 `docs/build/get-started/`: `../../_shared/filename.mdx`
- 来自 `docs/build/wallets/config/`: `../../../_shared/filename.mdx`

## 文件命名规则

使用描述性的大写文件名，明确指出内容的目的：

- 为-kaia-networks.mdx\`配置钱包
- 智能合同部署指南.mdx
- 交易费用优化.mdx

## 益处

- \*\* 单一真实来源\*\* - 一次编辑，随处更新
- \*\* 保留导航上下文\*\* - 用户停留在预定区域
- **内容一致** - 不同地点之间无版本漂移
- \*\* 正确的编辑链接\*\* - 贡献者编辑实际源文件