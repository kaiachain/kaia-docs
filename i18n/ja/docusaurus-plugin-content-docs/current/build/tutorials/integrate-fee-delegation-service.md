# カイア料金代行サービスの統合

このガイドでは、Kaia Fee Delegation Serviceの概要、アクセス申請方法、前提条件、統合例、APIリファレンスについて説明します。 これは、開発者がカイアネットワーク上の分散型アプリケーション（DApps）に手数料の委譲機能を統合するのを助けるように設計されている。

## 1. 概要

### カイヤ料金代行サービスとは？

カイア・ネットワークの手数料委任機能は、別のアカウントがユーザーに代わって取引ガス料金を支払うことを可能にする。 Kaia Fee Delegation Serviceはこの機能を活用し、ユーザーがガス料金用のKAIAトークンを保有することなく、あなたのDAppとやりとりできるようにします。 ユーザーが自分でガス料金を支払う代わりに、アプリケーションがkaiaマネージド料金委任サーバーを通じてユーザーに代わって料金を支払います。

:::note

カイアの手数料委譲サービスは、DAppsを搭載し、よりスムーズな手数料委譲体験を提供するマネージドサービスとして機能する。 手数料委譲機能はカイア・ブロックチェーンにネイティブに存在し、開発者はインフラを自ら設定することで、ユーザーに対して手数料委譲を実装することができる。

:::

### メリット

- **より良いUX**：ユーザーはあなたのDAppを使うのにKAIAトークンを必要としない
- **オンボーディング**：新規ユーザーはすぐにDAppを使い始めることができます。
- **簡易ウォレット**：ユーザーは取引/使用したいトークンのみを必要とする

### 仕組み

1. **ユーザが取引に署名する** - ユーザが自分のウォレットで手数料委譲取引を作成し、署名する。
2. **DApp sends to Fee Delegation Service** - あなたのDAppバックエンドは署名されたトランザクションをFee Delegation Service APIエンドポイントに送信します。
3. **サーバーが検証し料金を支払う** - 料金代行サービスがトランザクションを検証し、有効であればユーザーに代わってガス料金を支払う。

料金代行サービス・ワークフロー](/img/build/tutorials/fee-delegation-workflow.png)

## 2. アクセスに申し込む

この[Googleフォーム](https://docs.google.com/forms/d/e/1FAIpQLScSMnI8fD1xbyeoAL3TI81YxT3V1UfoByca84M7TZzYII5Pmw/viewform)をご確認の上、必要事項をご記入いただければ、カイヤの料金代行サービスをご利用いただけます。

:::note

カイアチームはDappをFeeDelegationServerに通信・設定し、Googleフォームが送信されるとdAppパートナーに通知します。

:::

## ３． 前提条件と対応環境

### サービス・エンドポイント

- **プロダクション**：https://fee-delegation.kaia.io\`
- \*\*テストネットhttps://fee-delegation-kairos.kaia.io\`

Swaggerのドキュメントはこちらをご覧ください：

- **プロダクション**：https://fee-delegation.kaia.io/api/docs\`
- \*\*テストネットhttps://fee-delegation-kairos.kaia.io/api/docs\`

### ウォレットの互換性（フロントエンドの統合）

:::info

フロントエンドからKaiaフィーデリゲーションサービスを統合する場合、あなたのウォレットがフィーデリゲーショントランザクション署名のためのKaiaフィーデリゲーション標準をサポートしていることを確認してください。

:::

現在、フロントエンドの統合に対応しているウォレット：

- カイア・ウォレット
- OKXウォレット
- ビットゲット・ウォレット

ユーザーが他のウォレットを使用している場合、フロントエンドから手数料委譲取引に正しく署名できない可能性があります。

:::note

**バックエンドの統合**は、財布を問わない。 署名と送信をサーバーサイドで処理することで、完全な制御と幅広い互換性を実現できます。

:::

## 4. アクセスモデルとセキュリティ

このセクションでは、Kaia料金代行サービスのアクセスモデルとセキュリティ機能について説明します。

### ホワイトリストシステム

このサービスでは、APIキーとホワイトリストアドレスシステムを使用して、DAppsの料金委譲を処理する。

#### 1. APIキー認証

APIキーが設定されたDAppsの場合、有効なAPIキーでサービスを呼び出す必要があり、さらにコントラクトまたは送信者のいずれかがホワイトリストに追加登録されている必要があります。

#### 2. ホワイトリスト・アクセス

APIキーが設定されていないDAppsの場合、コントラクトまたは送信者のどちらかがホワイトリストのアドレスタイプでなければなりません：

- **契約アドレス**：ユーザーがやり取りするスマートコントラクト
- **送信者アドレス**：取引を開始するユーザーのウォレットアドレス

### トランザクション検証ルール

**For Testnet:**  
すべてのトランザクションは、簡単なテストのために許可されています（バリデーションは適用されません）。

**メインネットの場合:**  
これらの条件が満たされた場合、取引が承認されます：

1. **APIキー**付き：有効なAPIキーを提供し、契約または送信者アドレスのいずれかがホワイトリストに登録されている（ホワイトリストが設定されていない場合、有効なAPIキーがあれば、どの送信者および契約アドレスでも動作します）。
2. \*\*APIキーがない場合APIキーを持たないDAppで、あなたの契約または送信者アドレスがホワイトリストに登録されている。

### アクセス・コントロール・オプション

**オプション1：オープンアクセス（APIキーなし＋ホワイトリストのアドレス）**\*。

- ホワイトリストに登録された契約/アドレスは誰でも使用でき、手数料はDApp残高から差し引かれます。
- こんな時に公共事業、オープンゲーム、コミュニティツール
- フロントエンドでもバックエンドでもAPIコールを使用できる

**オプション2：認証アクセス（APIキー＋ホワイトリストのアドレス）**\*。

- あなたのDAppだけが、ホワイトリストに登録されたコントラクト/アドレスを使用できます。
- こんな用途にプライベートDApp、エンタープライズアプリケーション、アクセス制御
- バックエンドからキーを使ってAPIを呼び出すことをお勧めします。

**オプション3：制限なしアクセス（APIキー＋ホワイトリストなしアドレス）**\*。

- あなたのDAppは有効なAPIキーであらゆるトランザクションを送信できる
- こんな人におすすめウォレットアプリケーション、多目的DApps
- バックエンドからキーを使ってAPIを呼び出すことをお勧めします。

## 5. 統合の例

このセクションでは、バックエンドとフロントエンドの両方のアプリケーションでKaia Fee Delegation Serviceを統合するためのコード例を示します。

### バックエンド（JavaScript/Node.js）の例

```javascript
const { Wallet, TxType, JsonRpcProvider, parseKaia } = require('@kaiachain/ethers-ext');

async function sendFeeDelegatedTransaction() {
  try {
    // 1. Setup wallet and provider
    const provider = new JsonRpcProvider('https://public-en-kairos.node.kaia.io');
    const wallet = new Wallet('your_private_key_here', provider);
    
    // 2. Create fee-delegated transaction
    const tx = {
      type: TxType.FeeDelegatedValueTransfer
      from: wallet.address,
      to: '0xAB', // replace your wallet address
      value: parseKaia('0.005'), // 0.005 KAIA
      gasLimit: 100000,
      gasPrice: await provider.getGasPrice(),
      nonce: await wallet.getTransactionCount(),
    };
    
    // 3. Sign transaction
    const signedTx = await wallet.signTransaction(tx);
    
    // 4. Send to fee delegation server
    const response = await fetch('https://fee-delegation-kairos.kaia.io/api/signAsFeePayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_api_key_here'
      },
      body: JSON.stringify({
        userSignedTx: { raw: signedTx }
      })
    });
    
    // 5. Handle response
    const result = await response.json();
    if (result.status) {
      console.log('Success! Transaction hash:', result.data.transactionHash);
    } else {
      console.log('Failed:', result.message);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}
sendFeeDelegatedTransaction();
```

### フロントエンド（React.js）の例

```javascript
import { useState } from 'react';
import { Web3Provider, TxType, parseKaia } from '@kaiachain/ethers-ext/v6';

// Optional API key
const config = {
  serverUrl: 'https://fee-delegation-kairos.kaia.io',
  apiKey: 'kaia_your_api_key_here'
};

export default function FeeDelegationComponent() {
  const [wallet, setWallet] = useState({ address: null, connected: false });
  const [form, setForm] = useState({ toAddress: '', amount: '0.005' });
  const { Web3Provider, TxType, parseKaia } = await import('@kaiachain/ethers-ext/v6');

  // 1. Connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.klaytn?.enable();
      setWallet({ address: accounts[0], connected: true });
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  // 2. Send fee-delegated transaction
  const sendTransaction = async () => {
    try {
      const provider = new Web3Provider(window.klaytn);
      const signer = await provider.getSigner(wallet.address);
      
      // 3. Create and sign transaction
      const tx = {
        type: TxType.FeeDelegatedValueTransfer,
        from: wallet.address,
        to: form.toAddress,
        value: parseKaia(form.amount)
      };
      
      const signedTx = await signer.signTransaction(tx);
      
      // 4. Send to fee delegation server
      const response = await fetch(`${config.serverUrl}/api/signAsFeePayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          userSignedTx: { raw: signedTx }
        })
      });
      
      // 5. Handle response
      const result = await response.json();
      if (result.status) {
        console.log('Success! Transaction hash:', result.data.transactionHash);
      } else {
        console.log('Failed:', result.message);
      }
      
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {wallet.connected ? 'Connected' : 'Connect Kaia Wallet'}
      </button>
      
      <input 
        value={form.toAddress}
        onChange={(e) => setForm({...form, toAddress: e.target.value})}
        placeholder="Recipient address"
      />
      
      <input 
        value={form.amount}
        onChange={(e) => setForm({...form, amount: e.target.value})}
        placeholder="Amount"
      />
      
      <button onClick={sendTransaction} disabled={!wallet.connected}>
        Send Transaction
      </button>
    </div>
  );
}

```

### その他の実施例（リンク）

より包括的な実施例については、以下を参照されたい：

- [ethers-ext@V6 HTMLの例](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-html/main.js#L294)
- [ethers-ext@V6 ReactJSの例](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)
- [web3jsの例](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/browser-html/main.js#L265)
- [viem-ext の例](https://github.com/kaiachain/kaia-sdk/blob/dev/viem-ext/examples/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)

## 6. APIリファレンス

このセクションでは、Kaia Fee Delegation Serviceで利用可能なAPIエンドポイントの詳細について説明します。

### POST /api/signAsFeePayer\`。

**内容：**\* 手数料の委任取引を処理する。

**ヘッダー:**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

\*\*リクエスト・ボディ

```
{
  "userSignedTx": {
    "raw": "<RLP_encoded_signed_transaction>"
  }
}
```

\*\*パラメーター

- `userSignedTx.raw` (文字列、必須)：ユーザが署名したRLPエンコードされたトランザクション。

**回答：**\*。

```json
// Transaction Success
{
  "message": "Request was successful",
  "data": <TransactionReceipt>,
  "status": true
}
```

:::note

詳細なレスポンス情報については、以下の「SignAsFeePayer API レスポンスコードと例」を参照してください。

:::

### GET /api/balance\`

\*\*説明：\*\*残高が十分かどうか（0.1 KAIAより大きいかどうか）をチェックする。

APIキー付き：

```
GET /api/balance
Authorization: Bearer your_api_key_here
```

APIキーなし（アドレス使用）：

```
GET /api/balance?address=0x742d35Cc6634C0532925a3b8D2A4DDDeAe0e4Cd3
```

**ヘッダー:**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

\*\*クエリ・パラメータ

- アドレス\` (文字列、オプション)：残高を確認する契約者または送信者のアドレス (API キーが提供されていない場合は必須)

**回答：**\*。

```json
{
  "message": "Request was successful",
  "data": true,  // true if sufficient balance, false if insufficient
  "status": true
}
```

### SignAsFeePayer API レスポンス・コードとその例

#### 200件の成功回答

```javascript
// Transaction Success
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "31000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "27500000000",
    "gasUsed": "31000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    "status": 1,
    "to": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
  },
  "status": true
}

// Transaction Reverted (200 but failed)
{
  "message": "Transaction reverted",
  "error": "REVERTED",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "status": 0,
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  "status": false
}

```

#### 400 不正なリクエストの応答

```javascript
// Invalid API Key
{
  "message": "Bad request",
  "data": "Invalid API key",
  "error": "BAD_REQUEST",
  "status": false
}

// Missing userSignedTx
{
  "message": "Bad request",
  "data": "userSignedTx is required, [format] -- { userSignedTx: { raw: user signed rlp encoded transaction } }",
  "error": "BAD_REQUEST",
  "status": false
}

// Not Whitelisted
{
  "message": "Bad request",
  "data": "Contract or sender address are not whitelisted",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Inactive
{
  "message": "Bad request",
  "data": "DApp is inactive. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

// Insufficient Balance
{
  "message": "Bad request",
  "data": "Insufficient balance in fee delegation server, please contact the administrator.",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Terminated
{
  "message": "Bad request",
  "data": "DApp is terminated. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

```

#### 500内部サーバーエラーのレスポンス

```javascript
// Transaction failed
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: <ERROR MESSAGE>",
  "error": "INTERNAL_ERROR",
  "status": false
}

// If transaction receipt not found
{
  "message": "Internal server error",
  "data": "Transaction was failed",
  "error": "INTERNAL_ERROR",
  "status": false
}
```

## 7. エラー処理とベストプラクティス

### 一般的なエラー処理

| エラーメッセージ                                   | 何をすべきか                                                                                                                                                                                                                                                                                                                                   |
| :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ネットワークがビジー状態です。 エラーメッセージ：<ERROR MESSAGE>` | 1. userSignedTx.raw\`ペイロードが正しくフォーマットされ、署名されていることを確認する<br/>2. 低ノンス問題**については、ウォレットに保留中のトランザクションがないことを確認してください。 (カイアウォレットの場合は、保留中の取引をキャンセルし、履歴をクリアしてから再試行してください)。  <br/>3. 不明なトランザクションの問題**については、現在のトランザクションが完了しているかどうかを再確認し、他のトランザクションに移動してください。 |
| 無効なAPIキー                                   | 有効なAPIキーを使用していることを確認してください。 お持ちでない場合、または無効になっている場合は、カイアチームまでご連絡ください。                                                                                                                                                                                                                                                                     |
| userSignedTxは必須                            | リクエストボディに `userSignedTx` オブジェクトと、RLP エンコードされた署名付きトランザクションを含む `raw` フィールドが正しく含まれていることを確認してください。 JSON構造を再チェックし、トランザクションデータが適切にエンコードされていることを確認する。                                                                                                                                                                                           |
| 契約または送信者アドレスがホワイトリストに登録されていない              | ユーザーがやり取りするスマートコントラクトのアドレス、または取引を開始するユーザーのウォレットアドレスのいずれかが、あなたのDAppのホワイトリストに登録されていることを確認します。                                                                                                                                                                                                                                              |
| DAppは活動していない。 DAppを有効にするには管理者に連絡してください。    | あなたのDAppのステータスは現在、手数料委任サービス上で非アクティブです。 DAppのアクティベーションについては、カイアチームまたは指定管理者にお問い合わせください。                                                                                                                                                                                                                                                    |
| 管理者に連絡してください。                              | あなたのDAppの手数料委任サーバーの残高が低すぎて、取引手数料をカバーできない。 DAppの残高を増やすには、管理者またはカイアチームに連絡してください。 このような事態が発生する前に、Eメールによる警告を受け取ることもできます。                                                                                                                                                                                                                     |
| DAppが終了。 DAppを有効にするには管理者に連絡してください。         | あなたのDAppの料金委譲サービスへのアクセスが終了しました。 カイアチームまたは管理者に連絡し、終了の理由を理解し、再開の可能性について相談してください。                                                                                                                                                                                                                                                           |

### ベストプラクティス

#### トランザクション管理

同じ送信者アドレスから複数のトランザクション（一括トランザクションまたは連続トランザクショ ン）を送信する場合、nonce関連の失敗を避けるために、トランザクションの順序を注意深く管理す る：

1. **確認を待つ**：次のトランザクションを送信する前に、各トランザクションが確認されている（つまり、トランザクションのレシートを受け取っている）ことを確認してください。
2. \*\*トランザクションが正しいnonceで送信され、失敗したnonceや古いnonceが新しいトランザクションを進める前に適切に処理されることを保証する。
3. \*\*リトライ・ロジックを実装する：一時的な失敗、トランザクションの取りこぼし、確認の遅延を処理するためのリトライメカニズムを構築する。
4. **フロントエンドウォレットのユーザー：** ブラウザベースのウォレット（Kaia Wallet、OKX Wallet、Bitgetなど）をフロントエンドから使用する場合、nonceの競合を防ぐため、ウォレットの「履歴を消去」機能を使用して、保留中または停止中のトランザクションを消去するようユーザーにアドバイスしてください。

#### APIコール

APIを呼び出す際、**API KEY**が必要な場合は、DAppバックエンドから使用することを推奨します。 API KEY\*\*が必要ない場合、DAppはフロントエンドまたはバックエンドのどちらからでもAPIを呼び出すことができます。

## 8. サポートとリソース

### サポート＆リソース

- [カイアフィーの委任例】(https://docs.kaia.io/build/tutorials/fee-delegation-example/)
- [DAppポータル料金委譲】(https://docs.dappportal.io/extra-packages/gas-fee-delegation)
- [カイアSDKドキュメント](https://docs.kaia.io/references/sdk/)

### カスタム・インテグレーション

標準のホワイトリストシステムを超える高度な、またはカスタムトランザクションのホワイトリスト統合（特殊なトークン検証、複雑なルーティングロジック、カスタムDeFiプロトコルなど）については、カイアチームにお問い合わせください。

## 9. よくあるご質問

\*\*Q: Kaia Fee Delegation Service を利用する場合と利用しない場合の料金委譲の違いは何ですか？ \*\*  
**A:** Kaia Fee Delegation Service は、DApps をオンボードし、よりスムーズな料金委譲体験を提供するためのマネージドサービスとして機能します。 料金委譲機能はカイアチェーンにネイティブに存在し、ユーザー自身がインフラを設定することで、ユーザーの料金を委譲することができます。

\*\*Q: コントラクト・ホワイトリスティングとセンダー・ホワイトリスティングの違いは何ですか？ \*\*  
**A:** コントラクト・ホワイトリスティングは、あなたのDAppを通じて特定のスマート・コントラクトと対話することを可能にします。 送信者のホワイトリストは、特定のウォレットアドレスがあらゆる取引を行うことを許可する。 両方を同時に使うこともできる。

\*\*Q: 残高がなくなったらどうなりますか？ \*\*  
**A:** 取引は「残高不足」のエラーで拒否されます。 設定された場合、残高が少なくなる前にEメールアラートでお知らせします。

\*\*Q: 1つのDAppに対して複数のコントラクトをホワイトリストに登録できますか？ \*\*  
**A:** はい、1つのDAppに対して複数のコントラクトと送信者アドレスをホワイトリストに登録できます。

**Q: 残高がなくなったらどうなりますか？ \*\*  
**A:** サービスを継続してご利用いただくには、カイアチームにご連絡いただき、残高の追加をご依頼いただく必要があります。 ただし、**`/api/balance?address=${address}`\*\* APIを呼び出して、十分な残高があるかどうかを確認し、ダッシュボードからも確認することもできます [**https://fee-delegation.kaia.io/rank**](https://fee-delegation.kaia.io/rank)

\*\*  
**A:** API Keyについては、**/api/signAsFeePayer\`** APIを呼び出す際に、"Authorization "ヘッダーに "Bearer your_api_key "で追加する必要があります。 しかし、APIキーなしでアドレスのホワイトリストのみを行うのであれば、コードの変更は必要ない。

**Q: このAPIコールはどこで使うべきですか？ \*\*  
**A:** APIキー**なしのAPIコールは、**より厳しい検証ルール**（ホワイトリストのアドレスが必要など）の対象となるため、**フロントエンドとバックエンド**の両方で使うことができます。  
しかし、**APIキー**を使用する場合は、セキュリティを確保するために、**バックエンド**から呼び出すことを**強く推奨**します。