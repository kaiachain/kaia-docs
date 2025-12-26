# カイアブリッジ

Finschiaユーザーは、Finshiaネットワーク上のFNSAトークンをKaiaネットワーク上のKAIAトークンに固定スワップレートでスワップすることができます。 スワップは、Kaiabridgeと総称される一連のスマートコントラクトとプログラムによって仲介される。

オンラインツールキット](https://toolkit.kaia.io/kaiaBridge)でカイアブリッジにアクセスし、使用することができます。

契約書のソースコードは[GitHub kaiachain/kaia リポジトリ](https://github.com/kaiachain/kaia/tree/dev/contracts/contracts/system_contracts/kaiabridge)に、デプロイされたアドレスは[契約書アドレス](https://docs.kaia.io/references/contract-addresses/)のページにあります。

# カイアブリッジ ユーザーガイド

## 前提条件

### 1. アカウントをMetaMaskまたはKaia Walletに移動する

#### 生の秘密鍵

アカウントが生の秘密鍵としてエクスポートできる場合は、生の秘密鍵をコピーし、MetaMaskまたはKaiaウォレットにインポートします。

- [メタマスク](https://support.metamask.io/start/use-an-existing-wallet#import-using-a-private-key)
- [カイア・ウォレット](https://www.kaiawallet.io/en_US/faq/?id=25)

#### リカバリーフレーズ

アカウントが回復フレーズとしてのみエクスポートできる場合は、回復フレーズから生の秘密鍵を計算します。 BIP-39の派生パスをサポートするツールであれば、どのようなものでも使用できます。 そのようなツールには、[ethers.js](https://docs.ethers.org/v6/api/wallet/#HDNodeWallet)、[viem](https://viem.sh/docs/accounts/local/hdKeyToAccount)、[Foundry](https://getfoundry.sh/cast/reference/wallet/)、[BIP39ツール](https://github.com/iancoleman/bip39)などがある。 Finschiaウォレットは、デフォルトの派生パスとして「m/44'/438'/0'/0/0」パス（[SLIP-044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)に基づく）を使用することがよくあります。 Finschiaウォレットに複数のアカウントがある場合、または異なる設定を使用している場合は、他の派生パスを使用する必要がある場合があります。

秘密鍵の計算が完了したら、上記の[生の秘密鍵を使用する場合](#with-raw-private-key)の指示に従ってください。

:::note[Example BIP39ツールを使って］

秘密鍵はこのページで計算できます：[BIP39 - ニーモニックコード](https://iancoleman.io/bip39/)。

予防措置として、ページにある「オフラインでの使用」の説明に従い、プロセス中はインターネット接続を遮断することを強くお勧めします。

1. BIP39 Mnemonic」フィールドにリカバリーフレーズを貼り付ける。
2. Coin "フィールドを "ETH - Ethereum "に設定する。
3. 派生パス」を「BIP32」に設定する。
4. クライアント」を「カスタム派生パス」に設定する。
5. BIP32 Derivation Path」を「m/44'/438'/0'/0」に設定する。
6. Derived Addresses "で、"Path "が "m/44'/438'/0'/0/0 "と表示されている最初の行を探す。

:::

:::note[Example ファウンドリーツールを使って］

1. Foundry](https://getfoundry.sh/)をインストールする。
2. リカバリーのフレーズを `--mnemonic` に入れて、以下のコマンドを入力する。 生の秘密鍵が印刷される。
   ```
   cast wallet private-key --mnemonic "test test test test test test test junk" --mnemonic-derivation-path "m/44'/438'/0'/0/0"
   ```

:::

### 2. ネットワークのチェック

MetaMaskを使用している場合、Kaia Mainnetを手動でネットワークに追加してください。

- [メタマスクとカイアの接続](https://docs.kaia.io/build/tutorials/connecting-metamask/)

### 3. アカウントにガソリンを入れる

スワップ取引を行うにはガソリンが必要です。 詳しくは「KAIA取得」(https://docs.kaia.io/build/get-started/getting-kaia/)を参照。

ガソリン代として最低でも0.1KAIAを用意することをお勧めする。

## フィンスキアをカイアに交換

:::warning[This スワップは不可逆的］

提供および請求のリクエストは一度しか処理できず、取り消すことはできない。
これらの指示に従う前に、よくお読みください。

:::

### 1. 財布をつなぐ

#### 1.1 メタマスクの接続

Connect MetaMask "ボタンをクリックする。

<p align="center"><img src="/img/misc/kaiabridge_connect_metamask.png" alt="Connect MetaMask" width="30%"/></p>

アカウント」に自分の住所が表示されているか確認する。
そうでない場合は、MetaMaskエクステンションを開き、ページに接続されていないと表示されるかどうかを確認する。 もしそうなら、"connect account "ボタンを押してください。

<p align="center"><img src="/img/misc/kaiabridge_connect_account.png" alt="Connect Account" width="30%"/></p>

#### 1.2 カイアウォレットに接続する

カイアウォレットを使用している場合、サイトがカイアウォレットとdApp（この場合はカイアオンラインツールキット）の接続を求めることがあります。

<p align="center"><img src="/img/misc/kaiabridge_connect_kaiawallet.png" alt="Connect Kaia Wallet" width="30%"/></p>

接続」をクリックし、カイアウォレットに接続します。

#### 2. カイア・メインネットに切り替える

ネットワークを "Kaia Mainnet "または "Mainnet "に正しく設定したか確認してください。 そうでない場合は、カイア・メインネットに切り替えてください。 MetaMaskをご利用で、MetaMaskにKaia Mainnetのネットワークが追加されていない場合は、[ネットワークの確認](#2-check-your-network)をご参照ください。

#### 3. フィンシャのアドレスを導き出す

Derive Finschia address "をクリックする。 メッセージへの署名を求められたら、"Confirm "または "Sign "をクリックする。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_sign_metamask.png" alt="Sign message in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_sign_kaiawallet.png" alt="Sign message in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
派生フィンシアアドレス」が元のフィンシアアドレスと一致し、「cony balance」がフィンシアネットワークの残高（CONYの場合）と一致するか確認してください。

<div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
  <img src="/img/misc/kaiabridge_address_and_conybalance_page.png" alt="Address and CONY balance shown in the page" style={{width: "50%"}} />
  <img src="/img/misc/kaiabridge_address_and_conybalance_wallet.png" alt="Address and CONY balance shown in your wallet" style={{width: "30%", height: "60%"}} />
</div>

<br/><br/>
また、あなたの口座にガソリン代を支払うためのKAIAがあることを確認してください（財布の中で確認できます）。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_balance_metamask.png" alt="KAIA balance in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_balance_kaiawallet.png" alt="KAIA balance in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
アカウントにKAIAがない場合は、[Gas up your account](#3-gas-up-your-account)を参照してください。

#### 4. 要求条項

提供要請」をクリックする。 メッセージへの署名とトランザクションの送信を求められたら、"confirm "をクリックする。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_provision_metamask.png" alt="Confirm provision transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_provision_kaiawallet.png" alt="Confirm provision transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
処理には数秒かかるはずだ。 トランザクションが完了するまで待つ。
結果はページで確認できる。

<p align="center"><img src="/img/misc/kaiabridge_provision_success.png" alt="Provision request successful" width="80%"/></p>

<br/>
表示されない場合は、更新して最初からやり直してください。

#### 5. 請求

請求する」をクリックします。 取引送信のプロンプトが表示されたら、"confirm "をクリックします。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_claim_metamask.png" alt="Confirm claim transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_claim_kaiawallet.png" alt="Confirm claim transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
処理には数秒かかるはずだ。 トランザクションが完了するまで待つ。
結果はページで確認できる。

<p align="center"><img src="/img/misc/kaiabridge_claim_success.png" alt="Claim request successful" width="80%"/></p>

<br/>
最新の残高をご確認ください。 請求金額は、(あなたのコニー残高) * (換算レート、約148)を[kei](https://docs.kaia.io/learn/token-economics/kaia-native-token/#units-of-kaia-)単位で表したものです。