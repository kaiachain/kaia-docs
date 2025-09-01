# UIクリエーション

このセクションでは、ウォレット接続、残高更新、ミンティング機能など、dAppのユーザーインターフェース（UI）を構築します。

## メインシーンの設定<a id="setting-up-main-scene"></a>

### ステップ1：シーンフォルダの作成<a id="create-scene-folder"></a>

- プロジェクトの**assets**フォルダに移動します。
- 右クリックし、**フォルダの作成**を選択します。
- シーン\*\*を挙げてください。 (画像を挿入)
- scenesフォルダ内で右クリックし、**Create → Scene**を選択します。

![](/img/minidapps/cocos-creator/cp-create-scene-r.png)

- プロンプトが表示されたら、シーンファイルを保存してください。
- 新しく作成したシーンをダブルクリックして、**デフォルトシーン**に設定してください。

### ステップ2：ベースキャンバスの作成<a id="creating-base-canvas"></a>

- 階層ウィンドウで**シーン**を右クリックします。
- Create → UI Component → Canvas\*\* に移動します。
- 名前を**Canvas**に変更する。

![](/img/minidapps/cocos-creator/cp-create-canvas-r.png)

### ステップ3：Web3UIコンテナの作成<a id="create-web3ui-container"></a>

- 新しく作成した**キャンバス**を右クリックします。
- Create → Empty Node\*\*を選択します。
- 名前を**Web3UI**に変更してください。

![](/img/minidapps/cocos-creator/cp-create-web3-ui-r.png)

### ステップ4：メインUIオブジェクトのセットアップ<a id="setting-up-main-ui-objects"></a>

Web3UIの中に、以下のコンポーネントを作成します：

\*\*1. コネクトウォレットボタン

- Web3UI → Create → UI Component → Button\*\* を右クリックします。

![](/img/minidapps/cocos-creator/cp-connect-button-r.png)

- 名前を**ConnectWallet**に変更してください。
- Inspector Pane**で、ボタンのラベルテキストを**Connect Wallet\*\*に設定します。

![](/img/minidapps/cocos-creator/cp-connect-label-r.png)

\*\*2. ミント・ボタン

- Web3UI → Create → UI Component → Button\*\* を右クリックします。
- 名前を**MintButton**に変更する。
- ボタンのラベルテキストを**ミントボタン**に設定します。

\*\*3. 住所ラベル

- 右クリック **Web3UI → Create → 2D Object → Label**.

![](/img/minidapps/cocos-creator/cp-address-label-r.png)

- これを **AddressLabel** にリネームする。
- ラベルテキストを\*\*Connected Address:\*\*に設定する。

![](/img/minidapps/cocos-creator/cp-connected-address-r.png)

\*\*4. バランス・レーベル

- 右クリック **Web3UI → Create → 2D Object → Label**.
- これを **BalanceLabel** にリネームする。
- ラベルテキストを**0.000ET**に設定する。

すべてのコンポーネントを追加すると、階層は次のようになります：

```bash
Canvas
└── Web3UI
    ├── ConnectWallet
    ├── MintButton
    ├── AddressLabel
    ├── BalanceLabel
```

![](/img/minidapps/cocos-creator/cp-ui-view-r.png)

:::note
コンポーネントを適切に配置するには、シーン上部のアライメントツールを使用します。 各コンポーネントをクリックし、必要に応じて位置を調整する。
:::
