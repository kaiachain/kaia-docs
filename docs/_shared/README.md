# How to Use Shared Content Folder

This folder contains reusable content that appears in multiple locations throughout the Kaia Docs site. Instead of duplicating content or using confusing cross-references, we use a wrapper approach that maintains user navigation context.

## When to Use Shared Content

Use a shared content when:
- The same content needs to appear in multiple categories (e.g., Get Started, Wallets, Cookbooks) because it's relevant to different user journeys.
- You want to avoid content duplication and ensure consistency across the documentation.
- You want each category to keep its own sidebar context and URL.


## How to Create Shared Content

### 1. Create the Shared Content File

Place your content in `docs/_shared/` with a descriptive filename:

```
docs/_shared/configure-wallet-for-kaia-networks.mdx
```

### 2. Create Wrapper Files

For each location where the content should appear, create a wrapper file:

**Example: Get Started Section**

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

**Example: Wallet Configuration Section**

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

### 3. Update Sidebars
Reference each wrapper by its unique ID in `sidebars.js`:

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

## Required Frontmatter Fields

- `title`: Page title (can be customized per wrapper)
- `hide_title: true`: Prevents duplicate title rendering
- `custom_edit_url`: Points to the shared source file for GitHub edits when **Edit this page** is clicked
- `id` (optional): Unique identifier when the auto-generated ID isn't suitable

## Best Practices

### Links in Shared Content
Use absolute paths from the docs root to avoid broken links:
```mdx
<!-- Good -->
[API Reference](/references/api/wallet-api)

<!-- Bad -->
[API Reference](./api/wallet-api)
```

### Images and Assets
Place shared assets in `static/` and reference with absolute paths:
```mdx
![Wallet Setup](/img/wallet-setup.png)
```

### Relative Import Paths
Calculate the correct relative path from each wrapper to the shared file:
- From `docs/build/get-started/`: `../../_shared/filename.mdx`
- From `docs/build/wallets/config/`: `../../../_shared/filename.mdx`

## File Naming Convention

Use descriptive, kebab-case filenames that clearly indicate the content purpose:
- `configure-wallet-for-kaia-networks.mdx`
- `smart-contract-deployment-guide.mdx`
- `transaction-fee-optimization.mdx`

## Benefits

- **Single source of truth** - Edit once, update everywhere  
- **Preserved navigation context** - Users stay in their intended section  
- **Consistent content** - No version drift between locations  
- **Proper edit links** - Contributors edit the actual source file