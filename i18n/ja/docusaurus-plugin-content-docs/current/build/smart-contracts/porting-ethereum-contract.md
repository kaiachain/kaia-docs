# イーサリアム契約のインポート

ほとんどの場合、Ethereumの契約はKaia上で修正せずにそのまま使用できます。
ただし、以下の2点には注意すること。

## ソリディティ・サポート<a id="solidity-support"></a>

- Kairosネットワークは現在、**ロンドン**イーサリアム仮想マシン（EVM）と互換性があります。
- メインネットは現在、**ロンドン**イーサリアム仮想マシン（EVM）と互換性があります。

:::note

v1.7.0プロトコルアップグレード - **Istanbul**ハードフォークアイテムとKaia自身のアイテムを含む互換性のない変更。
It has been enabled from block number `#75,373,312` in case of Baobab network and `#86,816,005` for the Cypress network.

v1.7.3プロトコルアップグレード - **ロンドン**ハードフォークからのベースフィーを含む互換性のない変更。
It has been enabled from block number `#80,295,291` in case of Baobab network and `#86,816,005` for the Cypress network.
It has been enabled from block number `#80,295,291` in case of Baobab network and `#86,816,005` for the Cypress network.

v1.8.0プロトコルアップグレード - **ロンドン**ハードフォークからのベースフィーを含む互換性のない変更。
It has been enabled from block number `#86,513,895` in case of Baobab network and `#86,816,005` for the Cypress network.
It has been enabled from block number `#86,513,895` in case of Baobab network and `#86,816,005` for the Cypress network.

:::

Kaia上の他のEVMバージョンとの後方互換性は保証されていません。
したがって、プロトコルのアップグレード状況に応じて、正しいターゲットオプションでSolidityコードをコンパイルすることを強くお勧めします。

- Kairos: --evm-version london
- Mainnet: --evm-version london
- その他（プライベート／サービスチェーン）：プロトコルのアップグレード状況に応じて決定

[solcのEVMバージョンの設定方法](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)をご参照ください。

コマンドの例を以下に示す：

```
$ solc --evm-version london contract.sol
```

## 分離されたキー・ペア<a id="decoupled-key-pairs"></a>

カイア [キー・ペアをアドレスから切り離す](../../learn/accounts.md#decoupling-key-pairs-from-addresses)。 user [updates account](../../learn/transactions/basic.md#txtypeaccountupdate) とすると、特定のアカウントの秘密鍵が別のものに置き換えられる。 ほとんどの場合、ビジネスロジックには影響しません。 しかし、ビジネスロジックにecrecoverが含まれている場合は、validateSenderの使用を検討する必要があります。 詳細は[こちら](../../learn/computation/precompiled-contracts.md)を参照。
