# カイアMEVオークションSDK検索ガイド

[カイアv2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0)はMEVオークションシステムを導入し、検索者がMEVの機会に対して公正で透明なオークションに参加できるようにした。 このガイドでは、Kaia MEV Auction SDK を使用したサーチャーワークフローの包括的なウォークスルーを提供します。

:::info

このガイドでは、Kairosテストネットのエンドポイントと契約アドレスを使用しています。 メインネットの立ち上げは2025年12月中旬を予定している。 メインネットにデプロイする場合は、すべてのエンドポイントと契約アドレスを適宜更新してください。

:::

サーチャーのワークフローは主に4つのステップからなる：

![](/img/build/tutorials/searcher-guide-1.png)

1. **デポジット**：オークション参加者はKAIAトークンを `AuctionDepositVault` に預け、入札資金を調達する。
2. **入札**：オークショニアに入札書を提出し、バックランの枠を競う。
3. \*\*落札価格を送信する：オークショニアは落札者を決定し、落札価格をコンセンサスノード（CN）に転送する。
4. **落札取引の実行**：CNは`AuctionEntryPoint`契約を通じて落札取引を実行する。

詳細な技術的背景については、[KIP-249](https://kips.kaia.io/KIPs/kip-249)を参照のこと。

## 前提条件

開始する前に、以下を確認してください：

- KAIAトークンが入金されたウォレット
- SDK サンプル用に [Go](https://golang.org/) をインストール (バージョン 1.25+)
- Kaiaネットワークエンドポイントへのアクセス（本ガイドではKairos testnetを使用）
- (オプション) [Foundry](https://getfoundry.sh/) インストール済み (`cast` コマンド用)

**オークショニア・エンドポイント：**\*。

- カイロス（テストネット）：https://auctioneer-kairos.kaia.io\`
- メインネットhttps://auctioneer.kaia.io\`

\*\*エクスプローラー・エンドポイント

- カイロス（テストネット）：https://mev-kairos.kaia.io\`
- メインネットhttps://mev.kaia.io\`

**ネットワーク・エンドポイント：**\*。

- カイロス（テストネット）：https://public-en-kairos.node.kaia.io\`
- メインネットhttps://public-en.node.kaia.io\`

**契約住所（カイロス）：**\*。

- AuctionFeeVault: `0xE4e7d880786c53b6EA6cfA848Eb3a05eE97b2aCC`
- AuctionDepositVault: `0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc`
- AuctionEntryPoint: `0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480`

メインネットの契約アドレス（メインネット開設後に利用可能）については、[契約アドレス](../../references/contract-addresses.md)を確認してください。

:::tip[Monitor MEVの機会]。

検索者は、以下の方法で有益な取引を特定することができる：

- **オークショニアの保留中のトランザクションAPI**に加入すること：この API はコンセンサス・ノードから直接トランザクションをストリーミングするため、MEV の機会をリアルタイムで検出することができます。 以下の[未決済取引の登録](#step-3-subscribe-to-pending-transactions)のセクションを参照。
- \*\*ネットワークメンプールを独立に監視する：独自の MEV 機会検出ロジックを実装する。

:::

## ステップ1：資金の入金

![](/img/build/tutorials/searcher-guide-2.png)

AuctionDepositVault\`には入札残高が保管されます。 手付金は、入札金額と入札執行にかかるガス料金の見積額の両方をカバーする必要があります。

### 預金要件を理解する

預金残高でカバーすること：

- **入札金額**：KAIA: 落札時にお支払いいただく金額です。
- **見積ガス料金**：入札執行時のガス消費量（執行後に差し引かれ、ブロック提案者に送付される）

:::warning[Always 十分な預金残高の維持］

残高不足の場合、オークショニアは入札を却下します。

:::

### 入金方法

この契約では、2つの入金方法が用意されている：

**メソッド1: `deposit()`**.

送金人の残高を使って入金する。 入金は送金人の口座に入金される。

```bash
# Deploy deposit of 200 KAIA
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "deposit()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

**メソッド2: `depositFor(アドレス検索者)`**。

他の口座の代理預金。 1つのソースから複数の検索者のアドレスに資金を供給するのに便利です。

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositFor(address)" <SEARCHER_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

### 残高の確認

現在の預金残高を照会します：

```bash
cast call 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositBalances(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
```

詳細な入金例については、[DEPOSIT.md ガイド](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/DEPOSIT.md) を参照のこと。

## ステップ2：入札書の提出

![](/img/build/tutorials/searcher-guide-3.png)

有益な取引を見つけたら、オークショニアに入札を行う。 入札は封印され（オークションが終了するまで隠される）、入札額に基づいて競われる。

### 入札構成

入札は以下のフィールドで構成される（[types.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/types.go)で定義されている）：

```go
type AuctionBid struct {
    TargetTxRaw  []byte         // Raw transaction bytes of target tx
    TargetTxHash common.Hash    // Transaction to backrun
    BlockNumber  *big.Int       // Target block number
    Sender       common.Address // Your searcher address
    To           common.Address // Contract to call
    Nonce        uint64         // Current nonce from AuctionEntryPoint
    Bid          *big.Int       // Your bid in KAIA
    CallGasLimit uint64         // Gas limit for your backrun logic
    Data         []byte         // Encoded function call
    SearcherSig  []byte         // EIP-712 signature from searcher
}
```

:::info

オークショニアは、落札した入札をコンセンサスノードに転送する前に、入札の有効性を確認し、独自の署名 (`AuctioneerSignature`) を追加する。 必要なのは`SearcherSig`（あなたのEIP-712署名）のみです。

:::

### 入札の提出

SDKは[`example/submitbid.go`](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go)で完全な動作例を提供しています。 この例はそれを示している：

- オークショニアとの HTTPS 接続の確立
- ENエンドポイントからの新しいブロックの検出
- ターゲット取引と対応する入札の生成
- オークショニアへの入札の提出

**Action Required**：実行する前に、コード内の秘密鍵を置き換えてください。 ソースコードの`TODO:`コメントをチェックする。

例題を実行する：

```bash
# From repository root
go run example/submitbid.go
```

### 入札の検証

オークショニア、プロポーザ、スマートコントラクトは、それぞれ入札に対して特定の検証チェックを行う。 主な検証ルールは以下の通り：

- **ブロック番号**：currentBlockNumber + 1 または currentBlockNumber + 2 でなければならない。
- \*\*入札金額0より大きく、利用可能な預金残高以下でなければなりません。
- **コールデータサイズ**：BidTxMaxDataSize\`（64KB）を超えてはならない。
- **コールガス制限**：BidTxMaxCallGasLimit\`（10,000,000）を超えてはならない。
- **nonce**：AuctionEntryPoint\` の現在の nonce と一致しなければならない。 と問い合わせる：
  ```bash
  cast call 0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480 "nonces(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
  ```
- **署名**：有効なEIP-712署名でなければならない（実装については[submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go)を参照のこと）。
- **保証金の範囲**：入札金額＋見積りガス料金\`をカバーする十分な保証金があること。
- **独自性**：同じブロック内に他の落札者がいることはできません（同じ取引を対象としている場合を除く）
- **オークショニアの署名**：有効なもの（提出後にオークショニアが追加します）

どのエンティティがどのチェックを行うかを示す完全なバリデーションマトリックスについては、[入札バリデーションガイド](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/bid_validation.md)を参照のこと。

## ステップ 3: 未決済取引の登録

![](/img/build/tutorials/searcher-guide-4.png)

オークショニアは、保留中のトランザクションをコンセンサスノードから直接ストリーミングするWebSocketサブスクリプションサービスを提供する。 これにより、検索者はリアルタイムでMEVの機会を検出することができる。

SDKは[example/subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go)で完全な例を提供しています。

この例はそれを示している：

- オークショニアへの WebSocket 接続の確立
- 保留中のトランザクションストリームに加入する
- トランザクションを処理してMEVの機会を特定する

例題を実行する：

```bash
# From repository root
go run example/subscribe_pendingtx.go
```

サブスクリプションは、保留中のトランザクションが検出されると、トランザクショ ンハッシュを継続的に表示する。 この例を拡張して、独自の MEV 検出ロジックを実装することができます。

## ステップ4：実行を理解する

あなたの入札が落札されると、Consensus Node は `AuctionEntryPoint` 契約を通じて入札を実行する：

![](/img/build/tutorials/searcher-guide-1.png)

### 実行フロー

実行プロセスは3つのフェーズからなる：

1. **検証段階**：契約は、ブロック番号、署名、ノンス、入札金額を検証する。
2. \*\*入札支払段階入札金額が保証金から差し引かれ、エコシステム基金に送金される。
3. **執行フェーズ**：あなたのバックランはエントリーポイント契約によって執行されます（執行結果に関係なく入札の支払いが行われます）。

**主要なセキュリティ機能：**\*

- バリデーターが入札を代行（支払いを逃れるための入札取り消しを防止）
- ノンス・インクリメントがリプレイ攻撃を防ぐ
- 二重署名（サーチャー＋オークショニア） 不正な入札の差し替えまたは操作
- 入札代金はバックランの執行結果に関係なく発生する。

詳細な実行フローについては、[ENTRYPOINT.md ガイド](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/ENTRYPOINT.md) を参照。

## ステップ5：資金の引き出し

![](/img/build/tutorials/searcher-guide-5.png)

退会には、ロック期間付きの2段階の手続きが必要です：

### 1. 積立金の取崩し

引き出しを開始し、60秒のロック期間を開始する：

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "reserveWithdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

### 2. 完全脱退

60秒後、予約分を送金する：

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "withdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

:::info[Security 注]。

ロック期間付きの2段階引き出しプロセス：

- オークション開催期間中のフラッシュ終了を防止
- 検索者が入札を守るようにすることで、プロトコルの整合性を維持します。
- 急激な資本操作攻撃からの保護

:::

## APIリファレンス

オークショニアは、検索者に2つの主要なAPIを提供する：

**1. 入札API**の提出

- **エンドポイント**：POST/api/v1/auction/send\`。
- \*\*目的MEVの機会に対する入札書の提出

\*\*2. 未決済取引のサブスクリプション

- \*\*エンドポイントGET /api/v1/subscriber/pendingtx`: `GET /api/v1/subscriber/pendingtx\`.
- \*\*目的コンセンサスノードからの保留トランザクションのリアルタイムストリーム
- \*\*例subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go) の実装例を参照してください。

**完全なAPIドキュメンテーション:**。

- OpenAPI (Swagger)のスペックは下記で入手可能：
  - **カイロス**： https://auctioneer-kairos.kaia.io/docs
  - \*\*メインネットメインネット立ち上げ後に利用可能
- APIの使い方：[APIドキュメント](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/api_doc.md)

## トラブルシューティング

### よくある問題

| 課題カテゴリー       | 症状                  | 原因                                                                    | ソリューション                                                                                                                                                 |
| ------------- | ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \*\*残高不足      | オークショニアによる入札拒否      | デポジット残高が入札額＋ガス代の見積額をカバーしていない                                          | depositBalances()\`で残高を確認し、さらにKAIAを入金する。                                                                                             |
| \*\*ノンス・ミスマッチ | 入札が拒否された、または執行に失敗した | Nonce が `AuctionEntryPoint` の現在の nonce と一致しない。                        | 各ビッドの前に `nonces()` で現在の nonce を問い合わせる。 注意：noncesは実行時にのみインクリメントされ、送信時にはインクリメントされない。                                                                      |
| \*\*ブロック番号の範囲 | オークショニアによる入札拒否      | 対象ブロックが許容範囲外 `[current+1, current+allowFutureBlock]`. | ブロック番号が範囲内であることを確認する（通常は+1または+2）。 二重提出戦略についてはFAQを参照                                                                                                     |
| \*\*無効な署名     | オークショニアによる入札拒否      | EIP-712シグネチャの作成が正しくない                                                 | ドメインセパレータとタイプハッシュを確認する。 正しい実装については、[submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) を参照してください。 |
| \*\*ガス・リミット問題 | 不成立または入札拒否          | CallGasLimit\`が低すぎるか、最大値（10,000,000）を超えている。                           | テストネットでバックランロジックをテストし、実際のガス消費量を測定する。                                                                                                                    |

## よくあるご質問

### サブスクリプション

\*\*Q: 検索者一人当たり、いくつの同時接続が可能ですか？

A: 1つの検索者アドレスにつき、保留中のトランザクションのサブスクリプション接続は1つのみ許可されます。

\*\*Q: 契約はいつまで有効ですか？

A: 接続は24時間後に自動的に切断されます。 ローリングアップデートが進行中の場合、接続は24時間よりも早くクローズされることがある。

### APIのパフォーマンスとレイテンシー

\*\*Q: 入札時のAPI待ち時間を最小限にするにはどうすればよいですか？

A: オークショニアはHTTPSプロトコルのL7ロードバランサーを利用しています。 最初のハンドシェイクは、ネットワークの状態によって時間を消費する。 後続の入札APIを送信する際にこの最初の遅延を回避するために、キープアライブ接続を確立することを強く推奨する。

\*\*Q: APIレートの制限に注意すべきですか？

A: Auctioneer API サーバーにブロックされるのを防ぐため、`ping` API を短期間に何度も送信しないでください。

\*\*Q：地理的な位置はレイテンシーに影響しますか？

A：そうだ。 オークションサーバーはGCP KR（ソウル）リージョンで稼働しています。 遅延を最小限に抑え、地理的な遅延を減らすために、地理的に近い地域でインフラをホストすることをお勧めします。

### 入札タイミングとブロック・ターゲティング

\*\*Q: なぜ私の入札は時々間違ったブロック番号をターゲットにするのですか？

A: 入札のタイミングは、CN（コンセンサス・ノード）の採掘時間に大きく影響されます。 オークションの開始が遅い場合（採掘時間に近い場合）、入札取引は次のブロックの後に挿入される（ブロック番号は+1ではなく+2）。 つまり、ターゲット・ブロックの番号を+2に設定する必要がある。

\*\*Q: 入札倍率を上げるにはどうすればよいですか？

A: ターゲットブロック番号はCNの採掘スケジュールに本質的に敏感です。もしあなたがブロック+2をターゲットにしていても、トランザクションが先の処理のためにブロック+1で挿入された場合、入札は失敗します。 そのため、ターゲットブロック番号を+1にして1回、ターゲットブロック番号を+2にして1回の計2回、入札取引を送信することで、包含確率を最大化することをお勧めします。

## ベストプラクティス

- **預金残高の管理**：複数の入札をカバーするために十分な残高を維持する
- \*\*Nonceは慎重に扱ってください：入札前に常に最新のnonceを問い合わせること
- **検出の最適化**：MEV検出の高速化により競争優位性が向上
- **カイロスでのテスト**：メインネット展開の前にテストネットで戦略を検証する
- **結果のモニター**：MEVエクスプローラーでオークションの結果を追跡し、入札戦略を練り直す
- **適切なガス制限**を設定します：十分なガス量とコスト効率のバランス

## リソース

- [SDKリポジトリ](https://github.com/kaiachain/auctioneer-sdk)
- [KIP-249仕様](https://kips.kaia.io/KIPs/kip-249)
- [コード例](https://github.com/kaiachain/auctioneer-sdk/tree/dev/example)
- APIドキュメント：[auctioneer-kairos.kaia.io/docs](https://auctioneer-kairos.kaia.io/docs) (Kairos), TBU (Mainnet)
- MEVエクスプローラー[mev-kairos.kaia.io](https://mev-kairos.kaia.io) (Kairos), TBU (メインネット)
- [よくある質問](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/FAQ.md)

## ヘルプを得る

問題や質問については

- カイア・デブフォーラム](https://devforum.kaia.io)に投稿する
- SDKリポジトリ](https://github.com/kaiachain/auctioneer-sdk/issues)にissueを登録してください。
