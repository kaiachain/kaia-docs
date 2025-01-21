# トランザクション・ビルダーを使用する

これはKaia Safeのカスタムアプリで、トランザクションのバッチ処理を行う。 つまり、トランザクションを1つずつ確認するのではなく、複数のトランザクションをまとめて確認することができるのです。 一度確認して実行するだけでいい。

トランザクションビルダーを使えば、トークンの移転から複雑なコントラクトのやり取りまで、トランザクションを組み合わせて1つのトランザクションにまとめることができる。

## KLAY Token Transfer <a id="token-transfer"></a>

以下の手順で、トランザクションビルダーを使用してトークン転送を行うことができます：

**ステップ 1:** Safe Apps に移動し、Transaction Builder Safe App を開きます。

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

**ステップ2:** 受取人のウォレットアドレスを入力します。 For this guide, kindly skip the ABI field as we are trying to execute KLAY transfer transaction.

![](/img/build/tools/kaia-safe/tx-builder-token-recipient-addr.png)

**ステップ3：** 送信したいKAIA値を入力してください。

> 注：このガイドでは、1つのKAIAを送信するので、**KAIA値**入力フィールドに1を入力した。 You can input any amount here, depending on your Safe's KLAY balance.

![](/img/build/tools/kaia-safe/tx-builder-token-trf-value.png)

\*\*ステップ4： \*\*トランザクションの追加をクリックします。

**ステップ5:** すべての受信者アドレスについて、ステップ2、3、4を繰り返します。

**ステップ6：** バッチにすべての操作を追加したら、[Create Batch]をクリックします。

![](/img/build/tools/kaia-safe/token-trf-tx-builder.gif)

**ステップ 7：** 取引の確認と提出

全バッチを見直すことができるようになる。 準備ができたら、「Send Batch（バッチ送信）」をクリックして、他の Safe 取引と同様に取引を送信し、実行します。

## 契約の相互作用<a id="contract-interactions"></a>

例えば、5つのアドレスに10CCTトークンというように、長いアドレスリストにトークンをエアドロップしたいとします。 5つのトランザクションを作成し、それを金庫の所有者が次々に確認・実行する代わりに、トランザクション・ビルダーはこれらの送金をすべて1つのトランザクションにまとめる。

このガイドでは、説明のためにCCTトークンをSafeアドレスに鋳造しています。

それでは、Transaction Builderを使ってこの例を始めてみよう！

\*\*Safe Apps を開きます。

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

\*\*ステップ 2: \*\* Transaction Builder Safe アプリを開きます。

![](/img/build/tools/kaia-safe/ks-use-tx-builder.png)

**ステップ3：**あなたの**トークン契約アドレス**と**ABI**を入力します。

この例では、CCTの契約アドレスとABIが使われる。 あなたのABIをコピーして**Enter ABI**フィールドに貼り付けることができます。

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-init.gif)

\*\*ステップ 4: \*\* 取引方法を選択し、取引情報を入力する。

ドロップダウンからメソッドを選択できます。 この場合、**転送**方式を選択する。 このステップを完了するためには、\*\*to(address)**や**amount(uint256)\*\*といった取引情報を記入しなければならない。

注：値は小数のない符号なし整数である。 この例では、CCTトークンの小数点以下は18桁である。 つまり、10CCTを送りたいなら、100000000000000000と入力しなければならない。

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-details.gif)

**ステップ5：** 取引の追加\*\*をクリックします。

**ステップ6:**受信者アドレスごとにステップ**4**、**5**、**6**を繰り返します。

**ステップ7：** すべての操作をバッチに追加したら、**Create Batch** をクリックします。

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-batch.gif)

**ステップ 8：** 取引の確認と提出

全バッチを見直すことができるようになる。 準備ができたら、**Send Batch** をクリックして、他の Safe 取引と同様に取引を送信し、実行します。
