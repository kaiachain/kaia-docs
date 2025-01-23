# 契約との対話

このセクションでは、新しく作成したマルチシグウォレットを使って、Kairos上にデプロイされたシンプルなコントラクトとやり取りし、トランザクションを送信します。

**前提条件**

- [メタマスク](https://metamask.io/download/) & [カイアメタマスクコンフィグ](../../../tutorials/connecting-metamask.mdx#send-klay)
- [Remix](https://remix.ethereum.org/) & [Kaia Remix Plugin](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- [Faucet](https://faucet.kaia.io)からテスト用KAIAを入手。

**ステップ1:** [Remix](https://remix.ethereum.org/)に移動します。

**ステップ2：** サンプルの**storage contract**をコンパイルし、デプロイする。

マルチシグウォレットでコントラクトを使用する前に、まずコントラクトをデプロイする必要があります。 このサンプル・コントラクトには、**store** メソッドを呼び出すと更新され、**retrieve** メソッドを呼び出すと取得される、単純な uint "number" 変数が含まれています。

![](/img/build/tools/kaia-safe/ks-ic-deploy.gif)

\*\*ステップ3：\*\*新規取引を開始する。

安全なウォレットでスマート・コントラクトとやり取りするには、\*\*"New Transaction "\*\*をクリックします。 このステップを完了するには、前のステップで説明したように、すでにデプロイされている契約アドレスとABIが必要です。 このステップを完了するには、前のステップで説明したように、すでにデプロイされている契約アドレスとABIが必要です。

![](/img/build/tools/kaia-safe/kaia-safe-ci-init.gif)

**ステップ4：** 取引を確認し、提出する。 **ステップ4：** 取引を確認し、提出する。 取引は署名者ウォレットで署名する必要があり、確認のしきい値に達すると実行されます。

![](/img/build/tools/kaia-safe/kaia-safe-ci-review-send.gif)
