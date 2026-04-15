# 前提条件

バリデータをオンボードする前に、全体的な管理権限を持つ **バリデータ管理者** アカウントを登録する必要があります。 このアカウントはバリデータに関連するほとんどの重要な情報を変更することができるため、バリデータ管理者にはマルチシグウォレットまたは同等のセキュリティ保証を持つウォレットを使用することを**強く推奨する**。

一般的には、[Kaia Safe](http://safe.kaia.io)を介して作成されたマルチシグウォレットをバリデーターマネージャーとして使用することを推奨します。 本ガイドの残りの部分は、Kaia Safeを使用していることを前提としています。

## 安全な財布の接続<a id="connecting-a-safe-wallet"></a>

まず、[Kaia Safeユーザーガイド](../../../build/wallets/kaia-safe/kaia-safe.md)に従って、Safeアカウントを作成してください。 次に、Validator Management Portal を Safe カスタムアプリとして登録します。

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
