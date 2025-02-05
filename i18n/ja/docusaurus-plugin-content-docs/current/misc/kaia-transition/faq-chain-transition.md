# 移行に関するFAQ

:::info[Archive お知らせ］

このFAQで提供される情報のほとんどは、2024年に発生した過渡期を反映したものであり、言及されている出来事やプロセスのほとんどはすでに行われていることに留意してほしい。 FAQは歴史的な参考資料として利用可能であるが、いくつかのセクションは現在古くなっており、もはや適用されない可能性がある。 カイアに関する最新情報については、最新の公式文書および発表をご参照ください。

:::

このFAQは、CEX、ノードプロバイダー、ウォレットプロバイダー、dAppビルダー、およびKlaytnエコシステムに精通したリテールユーザーに対する一般的な質問や懸念に対応し、円滑な移行を保証するものです。

- KLAYおよびFNSAホルダー
  - [クレイトンとフィンシャに何が起こったのか](#what-happened-to-klaytn-and-finschia-)
  - [KLAYとFNSAはどうなるのか](#what-happens-to-klay-and-fnsa-)
  - [カイアのために新しい財布を作る必要があるのでしょうか](#will-i-need-to-create-a-new-wallet-for-kaia-)
  - [Klaytnは新しいKAIAトークンのためのスワップまたは移行ウェブサイトを提供しますか](#will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-)
  - [KAIAトークンの受け取りが遅れることはありますか](#will-there-be-any-delay-in-receiving-kaia-tokens-)
  - [KLAYトークンとFNSAトークンのスワップに上限はありますか](#is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-)
  - [現在、FNSAに賭けている。 KAIAにスワップするためにFNSAを解除するのに7日間待つ必要がありますか](#im-currently-staking-fnsa-will-i-need-to-wait-7-days-to-unstake-my-fnsa-to-swap-to-kaia-)
  - [KLAYとFNSAの過去の価格情報はどこで入手できますか？ CoinMarketCapやCoinGeckoではもう見つからないようだ](#where-can-i-find-the-historical-price-information-for-klay-and-fnsa-i-cant-seem-to-find-it-on-coinmarketcap-or-coingecko-anymore-)

- アプリビルダー
  - [Klaytn上のDAppsがKaiaに移行するためには何が必要か](#what-do-dapps-on-klaytn-need-to-do-to-migrate-to-kaia-)
  - [Finschia上のDAppがKaiaに移行するためには何が必要か](#what-do-dapps-on-finschia-need-to-do-to-migrate-to-kaia-)
  - [カイア財団はクレイトン財団のようにコード監査助成金を提供し続けるのか](#will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-)

- ウォレットプロバイダー
  - [財布の中のブランド名をKlaytnからKaiaに更新する必要がありますか？](#is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-)
  - [メインネットのアップグレード後、カイアブランドにアップグレードしないとどうなるのか](#what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-)
  - [デフォルトのエクスプローラーであるKlaytnscopeはどうなるのか](#what-will-happen-to-klaytnscope-the-default-explorer-)

- 集中型取引所
  - [KAIAはKLAYのリブランドなのか、それとも全く新しいトークンなのか](#is-kaia-a-rebrand-from-klay-or-a-completely-new-token-)
  - [カイアはクレイトンのメインネットにいるのか、それとも別のメインネットにいるのか](#will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-)
  - [現在のKlaytnメインネットはリブランド後も機能し続けるのか](#will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-)
  - [KAIA市場はいつオープンするのか](#when-will-the-kaia-market-open-)
  - \#where-can-i-find-kaias-whitepaper-[カイアのホワイトペーパーはどこで入手できますか？

- RPCノード・プロバイダ
  - [KlaytnからKaiaへの移行をサポートするために、インフラにどのような変更を加える必要がありますか？また、RPC APIに何か変更点はありますか？](#as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-)
  - [カイアは別のチェーンIDを持つ新しいチェーンなのか、それともクレイトン・チェーンをベースにしたアップグレードなのか](#is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-)

## KLAYおよびFNSAホルダー

### クレイトンとフィンシャに何が起こったのか？ <a id="what-happened-to-klaytn-and-finschia-"></a>

KlaytnとFinschiaは、両チェーンによるガバナンスの決定によって合併し、Kaiaとなった。 投票結果は[こちら](https://medium.com/kaiachain/klaytn-and-finschia-merge-proposal-passes-creating-asias-largest-blockchain-ecosystem-7af570eb069a)からご覧いただけます。 2つのチェーン（KLAYとFNSA）のユーティリティ・トークンはKAIAトークンに変換される。 両トークンの為替レートは[こちら](../../kaiatech/kaia-white-paper.md#fnsa-issuancedistribution-status)で確認できる。

### KLAYとFNSAはどうなるのか？ <a id="what-happens-to-klay-and-fnsa-"></a>

KAIAコインの発売により、KLAYの残高は自動的にKAIAとして反映された。 FNSA保有者は、[Kaia Portal](https://portal.kaia.io/)上のスワップサービスを利用して、FNSAトークンをFinschiaネットワーク上で燃やし、KLAYトークンと同等の価値を請求することができます。 FNSAからKAIAへのスワップについては、[この投稿](https://medium.com/lineblockchain/preparations-for-the-upcoming-kaia-chain-token-swap-d9ccd853eda4)をお読みください。

### カイア用に新しい財布を作る必要がありますか？ <a id="will-i-need-to-create-a-new-wallet-for-kaia-"></a>

KlaytnウォレットはKaiaで使用できますが、Metamaskのようなサードパーティのマルチチェーンウォレットを使用している場合は、RPCとブロックエクスプローラーのURLを更新する必要があります。 これらは後日提供される。 フィンシャのウォレット保有者はカイアのウォレットを作成する必要があり、FNSA保有者がトークンを燃やしてKAIAの等価価値を請求できるウェブサイトが提供される。

### Klaytn は、新しい KAIA トークンのスワップまたは移行サイトを提供しますか？ <a id="will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-"></a>

ユーザーからのアクションは必要ない。 KLAYトークンは自動的にKAIAトークンにリネームされます。

### KAIAトークンの受け取りが遅れることはありますか？ <a id="will-there-be-any-delay-in-receiving-kaia-tokens-"></a>

トークンの交換は安全のため、少なくとも30分遅れて行われる。 中継器とRPCノードは取るに足らない追加遅延が発生する可能性がある。

### KLAYトークンとFNSAトークンのスワップ額に制限はありますか？ <a id="is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-"></a>

2つのトークンの交換とブリッジに制限はない。

### 今、FNSAに賭けている。 KAIAにスワップするためにFNSAを解除するのに7日間待つ必要がありますか？ <a id="im-currently-staking-fnsa-will-i-need-to-wait-7-days-to-unstake-my-fnsa-to-swap-to-kaia-"></a>

今度のカイアのローンチに伴い、トークンとガバナンスメカニズムをスムーズに統合するためのガバナンス投票がFinschiaネットワーク上で提案されます。 投票が可決されれば、FNSA保有者は1週間待つことなく、ステイクを解除してスワップできるようになる。

### KLAYとFNSAの過去の価格情報はどこで見られますか？ CoinMarketCapやCoinGeckoではもう見つからないようだ。 <a id="where-can-i-find-the-historical-price-information-for-klay-and-fnsa-i-cant-seem-to-find-it-on-coinmarketcap-or-coingecko-anymore-"></a>

KLAYとFNSAの合併と新しいトークンKAIAへの移行のため、KLAYとFNSAの過去の価格情報は暗号通貨追跡サイトでは利用できなくなりました。 しかし、我々は透明性と参考のためにこのデータを保存している。 You can download CSV files containing the historical price data for both KLAY and FNSA from [Kaia native coin - KAIA](../../learn/token-economics/kaia-native-token.md#historical-pricing).

## アプリビルダー

### Klaytn上のDAppsはKaiaに移行するために何をする必要がありますか？ <a id="what-do-dapps-on-klaytn-need-to-do-to-migrate-to-kaia-"></a>

Klaytnアプリはカイアチェーンとシームレスに連動し、リブランディングだけで済む。 チームはブランディングのガイドラインを提供する。 既存のFinschiaアプリについては、技術アップデートとマーケティングサポートがビジネスチャネルを通じて提供されます。

### FinschiaのDAppsがKaiaに移行するために必要なことは何ですか？ <a id="what-do-dapps-on-finschia-need-to-do-to-migrate-to-kaia-"></a>

FinschiaエコシステムのDAppがKaiaに移行するには、CosmwasmチェーンからEVMチェーンへの移行と同様のプロセスが必要です。 追加の移行サポートが可能になり次第、共有いたしますが、緊急のサポートが必要な場合は、Finschia Foundationまでご連絡ください。

### カイア財団は、クレイトン財団のようにコード監査助成金を提供し続けるのか？ <a id="will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-"></a>

はい、監査助成金は、クレイトンが利用できる他の助成金や資金提供プログラムとともに、これまで通り維持されます。

## ウォレットプロバイダー

### 財布のブランド名をKlaytnからKaiaに変更する必要がありますか？ <a id="is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-"></a>

はい、更新が必要な場合はエコパートナーに通知されます。

### メインネットのアップグレード後、カイア・ブランドにアップグレードしなかった場合はどうなりますか？ <a id="what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-"></a>

メインネットのアップグレード後も機能的な問題はありません。 リブランディングは後からでもできる。

### デフォルトのエクスプローラーであるKlaytnscopeはどうなるのでしょうか？ <a id="what-will-happen-to-klaytnscope-the-default-explorer-"></a>

Klaytnscopeはこれまで通り機能し、3ヶ月後にアップグレードされる。

## 集中型取引所

### KAIAはKLAYのリブランドですか、それともまったく新しいトークンですか？ <a id="is-kaia-a-rebrand-from-klay-or-a-completely-new-token-"></a>

KAIAはKLAYのリブランドである。 KLAYは新しい名称とティッカーシンボルで引き続き使用される。 可能であれば、トークン表を更新することをお勧めします。

KlaytnチェーンとFinschiaチェーンの合併により、総供給量と流通量が変更された。 流通供給量は約38億400万KAIAから58億500万KAIAに増加し、総供給量は約60億500万KAIAから58億500万KAIAに減少した。 これらの数字は、インフレが進行しているため、現在の流通量と総供給量を反映していない可能性がある。 KAIAのインフレ率は1ブロックあたり6.4KAIAから9.6KAIAに調整された。 これらの変更の詳細については、【KAIA 発行・分配計画](../../kaiatech/kaia-white-paper.md#kaia-issuancedistribution-plan-1) をご参照ください。

### カイアはKlaytnのメインネットにいるのか、それとも別のメインネットにいるのか？ <a id="will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-"></a>

カイアは引き続きKlaytnメインネットに存在する。

### 現在のKlaytnメインネットはリブランド後も機能しますか？ <a id="will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-"></a>

はい、メインネットの運営に影響はありません。 カイアへの移行は、主に名前の変更と技術的なアップグレードが舞台裏で行われる。

### KAIA市場はいつオープンしますか？ <a id="when-will-the-kaia-market-open-"></a>

KAIA市場は2024年第3四半期にオープンする予定であり、正確なブロック番号は近日中に発表する予定である。

### カイアのホワイトペーパーはどこにありますか？ <a id="where-can-i-find-kaias-whitepaper-"></a>

カイアのホワイトペーパーには[こちら](../../kaiatech/kaia-white-paper.md)からアクセスできる。

## RPCノード・プロバイダ

### KlaytnからKaiaへの移行をサポートするために、インフラにどのような変更が必要ですか？また、RPC APIに何か変更がありますか？ <a id="as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-"></a>

ほとんどのRPC APIは、klay_からkaia_への名前空間の変更を除いて、Kaiaチェーン上で同じままです。 ただし、後方互換性のためにklay_は引き続き利用できる。

KlaytnからKaiaへの移行をサポートするため、RPCノード・プロバイダは、Kaiaバージョンがリリースされたら、バイナリをKaiaバージョンにアップグレードする必要があります。 アップグレード前の緊急措置は必要ない。

### カイアはチェーンIDが異なる新しいチェーンなのか、それともクレイトン・チェーンをベースにしたアップグレードなのか？ <a id="is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-"></a>

KaiaはKlaytnチェーンのハードフォークであり、チェーンIDは変更されていない。 以前のテストネット "Baobab "は "Kairos "に改名され、メインネット "Cypress "は "Mainnet "または "Kaia Mainnet "と呼ばれるようになった。 ドキュメント、ウェブサイト、パブリックエンドポイント、パッケージのダウンロードリンクなど、Klaytnに関連するオリジナルのURLは、スムーズな移行を保証するために3ヶ月間残ります。

## リソース

チェーン・マージの主な情報源は以下の通り：

- [ガバナンス提案](https://govforum.klaytn.foundation/t/kgp-25-klaytn-finschia-mainnet-merge/719)
- [合併に隠されたビジョン](https://medium.com/klaytn/finschia-klaytn-chain-merge-proposal-our-vision-for-asias-1-blockchain-ecosystem-7de1588e28c0)
- [カイア・デフィのコアを作る](https://medium.com/klaytn/crafting-the-core-of-project-dragons-defi-ecosystem-0fa561e02f56)
- [機関の需要に応える](https://medium.com/klaytn/project-dragon-responding-to-institutional-demand-bd36e2e1e2a6)
- [補足データと考察](https://medium.com/klaytn/project-dragon-supplementary-data-and-insights-d36abd25ca0f)
- [カイア・ブランド・ストーリー](https://medium.com/klaytn/say-hello-to-kaia-4182ccafe456)
