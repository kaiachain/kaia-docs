# カイア・ハードフォークの歴史

このページでは、カイアブロックチェーンへのハードフォークをすべて示している。

:::note

- Kaiaリリースの詳細については、[Kaia Release Notes on GitHub](https://github.com/kaiachain/kaia/releases) をご覧ください。
- Kaia移行以前のハードフォークについては、[Klaytnハードフォーク履歴](klaytn-history.md)を参照してください。

:::

## プラハ

| ` `    | カイロス                                     | メインネット                                   |
| ------ | ---------------------------------------- | ---------------------------------------- |
| 日付     | 2025年6月10日 10:26 / UTC+9 | 2025年7月17日 10:26 / UTC+9 |
| ブロック番号 | `#187,930,000`                           | `#190,670,000`                           |

### 概要

Kairosテストネット用の[v2.0.0リリース](https://github.com/kaiachain/kaia/releases/tag/v2.0.0)とメインネット用の[v2.0.2リリース](https://github.com/kaiachain/kaia/releases/tag/v2.0.2)でPragueハードフォークが導入されました。 EIP-2537によるBLS12-381プリコンパイル、EIP-2935によるヒストリカル・ブロックハッシュ・システム・コントラクト、EIP-7610によるコントラクト作成チェック、EIP-7623および[KIP-223](https://kips.kaia.io/KIPs/kip-223)による更新されたcalldataガス価格、EIP-7702および[KIP-228](https://kips.kaia.io/KIPs/kip-228)によるSetCodeトランザクション・タイプ、および[KIP-226](https://kips.kaia.io/KIPs/kip-226)によるコンセンサス・リクイディティ機能が導入されている。 さらに、トークンでガス料金を支払うためのガス・アブストラクション機能も搭載されている。

## カイア・トランジション

| ` `    | カイロス                                     | メインネット                                   |
| ------ | ---------------------------------------- | ---------------------------------------- |
| 日付     | 2024年6月13日 10:13 / UTC+9 | 2024年8月29日 10:29 / UTC+9 |
| ブロック番号 | `#156,660,000`                           | `#162,900,480`                           |

### 概要

Kaiaトランジションハードフォークは、Kairosテストネット用の[v1.0.0リリース](https://github.com/kaiachain/kaia/releases/tag/v1.0.0)とメインネット用の[v1.0.2リリース](https://github.com/kaiachain/kaia/releases/tag/v1.0.2)で導入されました。 このハードフォークは、KlaytnからKaiaブロックチェーンへの移行を意味する。 これには、[KIP-160](https://kips.kaia.io/KIPs/kip-160)に従ったTreasuryRebalanceV2ハードフォークとトークン割り当てコントラクト、EIP-1559と同様の[KIP-162](https://kips.kaia.io/KIPs/kip-162)に従ったトランザクション優先料(tip)、[KIP-163](https://kips.kaia.io/KIPs/kip-163)に記述されたバリデータのPublicDelegationとCnStakingV3コントラクト、およびステーキング更新間隔を1ブロックに修正したものが含まれる。