import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# カイア互換ウォレットからトークンを送信する方法

この記事では、Kaia WalletやMetaMaskなどのKaia互換ウォレットを使用してKAIA（ネイティブトークン）とERC20トークンを送信するためのステップバイステップガイドを提供します。 ただし、使用するネットワーク（KaiaメインネットまたはKaia Kairos Testnet）に関係なく、プロセスは基本的に同じです。

必要なもの

- 受取人の口座アドレス
- お客様の口座に、ガス料金を賄うに十分なネットワーク・ネイティブ・トークン（KAIA）の残高があること。

## KAIA（ネイティブ・トークン）

### メタマスク

<Tabs>
  <TabItem value="Browser" label="Browser Extension" default>
	1. ウォレットのホームページから、取引したいアカウントとネットワークが正しいことを確認し、画面中央の**送信**ボタンをクリックします。
	![](/img/build/wallets/mm-homepage-send.png)
	2. ここで、受信者の公開アドレスを入力する必要がある。 すでにアドレス帳に保存されているアドレスは、今すぐ表示されます。
	![](/img/build/wallets/mm-insert-address.png)
	3. 送信したいトークンの量を入力し、**Continue**をクリックします。
	![](/img/build/wallets/mm-insert-amount.png)
	4. 取引詳細が表示されます。 コンファーム(**Confirm**)をクリックして次に進む前に、必ず取引内容を再確認してください。
	![](/img/build/wallets/mm-tx-details.png)
	トランザクションが成功すると、ホームページにリダイレクトされ、「アクティビティ」タブで最近のトランザクションのリストを見ることができます。
  </TabItem>
  <TabItem value="Mobile" label="Mobile">
	1. 
	![](/img/build/wallets/mm-m-select-kaia.jpg)
	2. 送信**ボタンをタップして次に進む
	![](/img/build/wallets/mm-m-send-btn.jpg)
	3. 送信先の住所を入力します。 クリップボード（別のアプリなど）からアドレスを貼り付けるか、アドレス帳からアドレスを選択し、**次へ**をクリックします。
	![](/img/build/wallets/mm-m-insert-address.jpg)
	4. 送金額を入力する画面が表示されるので、**次へ**をクリックする
	![](/img/build/wallets/mm-m-insert-amount.jpg)
	5. 取引詳細が表示されます。 コンファーム(**Confirm**)をクリックして次に進む前に、必ず取引内容を再確認してください。
	![](/img/build/wallets/mm-m-tx-details.jpg)  
</TabItem>
</Tabs>

### カイア・ウォレット

<Tabs>
  <TabItem value="Browser" label="Browser Extension" default>
	1. ウォレットのホームページから、取引したいアカウントとネットワークが正しいことを確認し、画面中央の**送信**ボタンをクリックします。
	![](/img/build/wallets/kw-homepage-send.png)
	2. ここで、受信者の公開アドレスを入力する必要がある。 すでにアドレス帳に保存されているアドレスは、今すぐ表示されます。
	3. 送信したいトークンの量を入力し、**Proceed**をクリックします。
	![](/img/build/wallets/kw-input-address-amount.png)
	4. 取引詳細が表示されます。 コンファーム(**Confirm**)をクリックして次に進む前に、必ず取引内容を再確認してください。
	![](/img/build/wallets/kw-tx-details.png)
	5. トークンが正常に送信されると、成功メッセージのモーダルが表示されます。 
	![](/img/build/wallets/kw-token-success-msg.png)
	6. 取引履歴**タブで最近の取引を確認できるようになりました。
	![](/img/build/wallets/kw-tx-history.png)  
</TabItem>
  <TabItem value="Mobile" label="Mobile">
	1. ウォレットのホームページから、取引したいアカウントとネットワークが正しいことを確認する。
	2. KAIA Balance
	と同じ欄の **Send** ボタンを直接クリック ![](/img/build/wallets/kw-m-send-btn.jpg)
	3. 受信者の公開アドレスを入力し、**次へ**をクリックします。
	![](/img/build/wallets/kw-m-insert-address.jpg)
	4. 送信したいトークンの量を入力し、**次へ**をクリックします。
	![](/img/build/wallets/kw-m-insert-amount.jpg)
	5. 取引詳細が表示されます。 送信**」をクリックして次に進む前に、必ず取引詳細を再確認してください。
	![](/img/build/wallets/kw-m-tx-details.jpg)
	6. KAIA残高カードをクリックすると、**取引履歴**ページで最近の取引を確認できるようになりました。
	![](/img/build/wallets/kw-m-tx-history.jpg)  
</TabItem>
</Tabs>

## ERC20トークン

### メタマスク

<Tabs>
  <TabItem value="Browser" label="Browser Extension" default>
	1. ホームページの「**トークン**」タブに移動し、トークンの詳細を表示するページにアクセスするために、送信したいトークンを選択します
	![](/img/build/wallets/mm-erc20-homepage.png)
	2. 送信**ボタンをクリック
	![](/img/build/wallets/mm-erc20-send-btn.png)
	3. 受信者のアドレスと送信したいトークンの量を入力し、**Continue**
	![](/img/build/wallets/mm-erc20-input-ao.png)
	4. Confirm**ボタンをクリックしてトランザクションを送信し、ERC20トークンを送信します
	![](/img/build/wallets/mm-erc20-tx-details.png)  
</TabItem>
  <TabItem value="Mobile" label="Mobile">
	1. Tokens**タブをタップし、送信したい ERC20 トークンを選択すると、トークンの詳細が表示されるページにアクセスできます
	![](/img/build/wallets/mm-m-erc20-select.jpg)
	2. 送信**ボタンをタップして次に進む
	![](/img/build/wallets/mm-m-erc20-send-btn.jpg)
	3. 受信者の公開アドレスを入力し、**次へ**をクリックします。
	![](/img/build/wallets/mm-m-insert-address.jpg)
	4. 送信したいトークンの量を入力し、**次へ**をクリックします。
	![](/img/build/wallets/mm-m-erc20-insert-amount.jpg)
	5. 画面下の**送信**ボタンをタップしてください。
	![](/img/build/wallets/mm-m-erc20-tx-details.jpg)  
</TabItem>
</Tabs>

### カイア・ウォレット

<Tabs>
  <TabItem value="Browser" label="Browser Extension" default>
	1. ウォレットホームページの **トークン一覧** パネルに移動する
	![](/img/build/wallets/kw-erc20-token-list.png)
	2. トークンの詳細を表示するページにアクセスするには、送信するトークンを選択します
	3. 送信**ボタンをクリックします。
	![](/img/build/wallets/kw-erc20-send-btn.png)
	4. 受信者のアドレスと送信したいトークンの量を入力し、**Proceed**
	![](/img/build/wallets/kw-erc20-input-ao.png)
	5. Confirm**ボタンをクリックしてトランザクションを送信し、ERC20トークンを送信する 
	![](/img/build/wallets/kw-erc20-tx-details.png)
	6. トークンが正常に送信されると、成功メッセージのモーダルが表示されます。
	![](/img/build/wallets/kw-erc20-success-msg.png)  
</TabItem>
  <TabItem value="Mobile" label="Mobile">
	1. ウォレットのホームページから、取引したいアカウントとネットワークが正しいことを確認する。
	2. 送信したいERC20トークン残高と同じ行の**送信**ボタンを直接クリックします。
	![](/img/build/wallets/kw-m-erc20-send-btn.jpg)
	3.  受信者の公開アドレスを入力し、**次へ**をクリックします。
	![](/img/build/wallets/kw-m-erc20-insert-addr.jpg)
	4. 送信したいトークンの量を入力し、**次へ**をクリックします。
	![](/img/build/wallets/kw-m-erc20-insert-amount.jpg)
	5. 取引詳細が表示されます。 送信**」をクリックして次に進む前に、必ず取引詳細を再確認してください。
	![](/img/build/wallets/kw-m-erc20-tx-details.jpg)
	6. トークンが正常に送信されると、成功メッセージのモーダルが表示されます。
	![](/img/build/wallets/kw-m-erc20-success-msg.jpg)
	7. トークン残高カードをクリックすると、**取引履歴**ページで最近の取引を確認できるようになりました。
	![](/img/build/wallets/kw-m-erc20-tx-history.jpg)  
</TabItem>
</Tabs>