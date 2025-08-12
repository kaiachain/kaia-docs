# 6. 上級者向けトピック＆FAQ

このセクションでは、高度な統合テクニック、ベストプラクティス、トラブルシューティングのヒント、KaiaのGas Abstraction（GA）機能に関するよくある質問について説明します。 これは、実装を最適化し、スムーズなユーザー・エクスペリエンスを確保したい開発者向けに設計されている。

## 6.1 ベストプラクティス

| トピック                  | 推薦                                                                                                                                                                                                                | 備考                                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| \*\*スリッページ            | getAmountIn()\`は、トークンの揮発性が高くない限り、\*\*0.5 % (50 bps)\*\*で開始する。                                                                                               | 0.5%はカイアのリファレンスコードに示されている事実上のデフォルトです。                                                      |
| \*\*許容範囲              | ERC-20の許容量をキャッシュし、\*\*許容量>0`のときに`ApproveTx\`\*\*をスキップする。                                                                                                                                                          | KIP-247では、承認がすでに存在する場合、2-txバンドル（Lend + Swap）を許可している。                                                       |
| \*\*バッチ投入             | kaia_sendRawTransactions\`（配列ペイロード）を使用して、**ApproveTx + SwapTx**を一緒にプッシュし、プールの競合状態を防ぐ。                                                                                                        | 単一tx呼び出し(`eth_sendRawTransaction`)は動作するが、2番目のtxが先にノードに到達すると、nonce/static-ruleチェックに失敗する。 |
| \*\*セキュリティ            | a) **KaiaのドキュメントにあるGaslessSwapRouter (GSR)のアドレスをハードコード**する。 <br/>b) **スワップを構築する前に、例えばtry/catchの中で`await router.dexAddress(token)`を実行するか、`getSupportedTokens()`から返されるリストをチェックすることで、サポート**を確認する。 | フィッシング契約やサポートされていないトークンがGAフローを乗っ取るのを防ぎます。                                                                  |
| **KAIA**を使用しない場合のガス試算 | 例えば、`eth_estimateGas(txObj, 'latest', { [from]：{balance: '0x…' }})`.                                                                                                                              | 口座が本当に0KAIAの場合、「残高不足」エラーを回避。                                                                               |

## 6.2 トラブルシューティング

| 症状                                                             | 正当な理由                                                                                                                         | 推奨される修正                                                                                                                                |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| \*\*未採掘のバンドル                                                   | a) `token` **ホワイトリストに載っていない**。 <br/>b) `minAmountOut` がきつすぎて、バンドル全体が戻される。                                                     | - 最初にサポートを確認してください：または\*\* `getSupportedTokens().includes(token)` **署名の前に**。<br/>- slippageBps`を増やすか、`amountIn\`をジャストインタイムで再クオートする。    |
| **`INSUFFICIENT_OUTPUT_AMOUNT` を戻す**。                          | 提示と実行の間に価格が変更されたため、GSRチェック`amountReceived >= minAmountOut`が失敗した。                                                              | 現在のプール準備金で `getAmountIn()` を再実行し、より高い `minAmountOut` またはより広いスリッページで `SwapTx` を再構築する。                                                   |
| **ノードはTXを拒否する（「資金不足」）**\*。                                     | GaslessApproveTx**のみが送信された。 バランスチェックがスキップされ、対になる**SwapTx**が欠落しているため、提案者は**LendTx\*\*をインジェク トすることはなく、トランザクションは持っていないKAIAを消費する。 | 常に **ApproveTx と SwapTx を同じバッチ** で `kaia_sendRawTransactions` 経由で送信するか、`approveRequired == false` を確認して、2-tx バンドルで送信できるようにしてください。      |
| **バンドル内の不一致**について                                              | 外部dAppはGAバンドルが採掘される前に次のnonceを消費する通常のtxを送信した。                                                                                  | 署名の直前に `getTransactionCount()` をクエリする; nonce が移動した場合、両方の tx オブジェクトを再構築する。                                                              |
| klay_sendRawTransactions → "未定義のTXタイプ"\`。 | あなたは、Ethereumタイプのみをサポートする\*\*kaia_…\*\*エンドポイントを通じて、Kaia固有のtxタイプ（例えば、0x30）をバッチ送信しようとしました。                 | kaia_sendRawTransactions` で GA バンドルを送信し、`klay_sendRawTransaction\` で 0x30 AppTx をブロードキャストする。 |

## 6.3 FAQ

### GAはメインネットで利用できますか？

はい、GAは現在**Kairos testnet**と**mainnet**の両方でライブです。

### スワップに必要なトークンが足りない場合はどうなりますか？

SwapTxはオンチェーンで失敗するが、**KIP-245のアトミックバンドル**により、バンドル全体が元に戻され、ブロックから除外される。 ユーザーは資金を失うことなく、オンチェーンの状態も変化しない。

### どのトークンがどれだけガソリンと交換されたかを確認するにはどうすればよいですか？

swapForGas` コールが成功するたびに、`GaslessSwapRouter\` から **SwappedForGas** イベントが発生する。\
できる：

1. KaiaScanでルーターアドレス（contract-addresses doc参照）を調べ、**Events**タブを開きます。
2. イベントログに表示されている `token`、`amountIn`、`amountOut`、`amountRepay` フィールドをデコードする。

オンチェーンでデータが必要な場合は、インデクサまたはdAppバックエンドで`SwappedForGas`をリッスンする。

### ノードはGAを無効にできますか？

個々のノードはGAを無効にすることができるが、デフォルトでは**有効**になっている。 あるノードがGAを無効にしている場合、トランザクションは最終的にGAをサポートする他のノードで処理される。

### ガス抜きはブロックの速度を落とすのか？

そうだ。 KIP-245では、バンドルは250ミリ秒/ブロックの_実行タイムアウト_チェックから除外されるため、EVMは一度開始したバンドル全体の処理を終了することができる。 GA取引は、よく知られたERC20の承認とGSRのスワップ操作に限定されているため、妥当な時間だけ実行される。 したがって、GAバンドルがチェーンのブロックタイム予算を危険にさらすことはない。

### どこでガス抜き取引を見ることができますか？

Kairos testnet explorerで見ることができます。 これらのブロックは、バンドル全体が直列に実行されていることを示している：

- **3-tx バンドルの例 (貸し出し + 承認 + スワップ):** [ブロック 189826352 on Kairos KaiaScan](https://kairos.kaiascan.io/block/189826352?tabId=blockTransactions&page=1)
- **2-tx バンドルの例 (貸し出し + スワップ):** [ブロック 189826547 on Kairos KaiaScan](https://kairos.kaiascan.io/block/189826547?tabId=blockTransactions)

## 6.4 追加リソース

**技術仕様：**\*。

- [KIP-247: ガス抜きトランザクション](https://kips.kaia.io/KIPs/kip-247) - コアGA仕様
- [KIP-245: トランザクション・バンドル](https://kips.kaia.io/KIPs/kip-245) - バンドル・メカニズム
- [ガスレススワップルーター契約](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)

**デベロッパー・リソース:**。

- [カイアSDKリポジトリ](https://github.com/kaiachain/kaia-sdk)
- [正式契約アドレス](https://docs.kaia.io/references/contract-addresses/)
- [カイア開発者ドキュメント](https://docs.kaia.io/)

**コミュニティとサポート：**\*

- [KIP-247ディスカッション・フォーラム](https://devforum.kaia.io/t/discussion-on-kip-247/8089)
- [カイア・ディスコード](https://discord.gg/kaiachain)
- [SDKサポートのためのGitHub課題](https://github.com/kaiachain/kaia-sdk/issues)

\*\*教育内容

- [ガス料金を安定コインで支払えるとしたら？](https://medium.com/kaiachain/pay-for-gas-fees-with-any-token-a-deep-dive-into-kaias-trustless-gas-abstraction-d670355a096b)
- [カイア・コンセンサス流動性発表】(https://medium.com/kaiachain/kaia-consensus-liquidity-a-new-paradigm-in-blockchain-liquidity-7c8a7393cd19)