# 前提条件

バリデータをオンボードする前に、全体的な管理権限を持つ **バリデータ管理者** アカウントを登録する必要があります。 このアカウントはバリデータに関連するほとんどの重要な情報を変更することができるため、バリデータ管理者にはマルチシグウォレットまたは同等のセキュリティ保証を持つウォレットを使用することを**強く推奨する**。

一般的には、バリデータマネージャーとして、[Safe Wallet](https://app.safe.global)（[Safe](https://safe.global)／Safe Global）を通じて作成されたマルチシグウォレットの使用をお勧めします。 このガイドの残りの部分では、Kaia上でSafe Walletを使用していることを前提としています。

:::caution 日没に関するお知らせ

`safe.kaia.io` は **2026年8月9日** にサービス終了となります。 今後は、[app.safe.global](https://app.safe.global) の「Safe Wallet for Kaia Network」をご利用いただき、アカウントの管理を行ってください。 現在お持ちの「Safe Accounts」は、「Safe Wallet」と自動的に互換性が確保されます。

:::

## 安全な財布の接続<a id="connecting-a-safe-wallet"></a>

まず、[Safe Wallet ユーザーガイド](../../../build/wallets/kaia-safe/kaia-safe.md)の手順に従って、Safe アカウントを作成してください。 次に、Validator Management Portal を Safe カスタムアプリとして登録します。

カスタムセーフアプリの追加](/img/nodes/become-a-validator/image02.png)

アプリ」>「マイカスタムアプリ」>「カスタムのセーフアプリを追加」をクリックします。

ポータルURL貼り付け](/img/nodes/become-a-validator/image03.png)

セーフガイドに従って、ポータルサイトのURLを貼り付ける。 ポータル情報が以下に正しく表示されていることを確認し、確認後、免責事項のチェックボックスにチェックを入れ、**追加**をクリックします。

私のカスタムアプリ](/img/nodes/become-a-validator/image04.png)

Validator Management Portal が正常に追加されたら、**Apps > My custom apps** に進み、**Kaia Validators** カードをクリックして、Safe アカウントを使用してポータルを開きます。

セーフウォレットがつながった！(/img/nodes/become-a-validator/image05.png)

ポータルに入ると、左側にセーフウォレットが表示されます。 今後、ポータルからトランザクションを送信しようとすると、トランザクションはマルチシグ設定に従って Safe を介して署名および送信されます。

## 別のウォレットに接続する<a id="connecting-another-wallet"></a>

:::warning セキュリティ・ノート

マルチシグのないウォレット、あるいは同等のセキュリティ保証のないウォレットをバリデーターマネージャーとして使用することは**推奨されません**。

:::

ウォレットに接続](/img/nodes/become-a-validator/image06.png)

マネージャーアカウントを別のウォレットで管理したい場合は、**Connect Wallet**をクリックして接続します。
