# インストールの前に

## ダウンロード<a id="download"></a>

CN、PN用のパッケージは[ダウンロードページ](../../downloads/downloads.md)で入手できる。

## インストールの前に<a id="before-you-install"></a>

Kaiaパッケージをインストールする前に、ノードURIを登録するための関連ノード情報を作成する必要があります。 KgenパッケージはCCオペレーターのために提供されています。

1. `kgen` パッケージをダウンロードする
2. ノードキーとノードURIの作成
3. ノード URI 登録

### `kgen` パッケージをダウンロードする<a id="download-kgen-package"></a>

まず、[Download](../../downloads/downloads.md) ページから、お使いのオペレーティング・システムに応じて `kgen` パッケージの最新バージョンをダウンロードできます。

`kgen` のバイナリファイルは `bin` ディレクトリの下にある。

### ノードキーとノードURIの作成<a id="node-key-node-uri-creation"></a>

ノード・キーとノードURIは最初に一度だけ作成される。 ノードURIは、コアセルネットワークの他のコアセルと共有されなければならない。 CNは他のCNに接続し、PNは作成されたノードURIを使ってCNといくつかのPNに接続する。 ノードURIは、ダウンロードした `kgen` を使用して、ノードキーに基づいて作成される。 以下のコマンドラインは `nodekey` と `node_info.json` を作成する。

`kgen`は以下のようにIPとポート番号を取る。

```text
$ kgen --ip "123.456.789.012" --port 32323 --file
$ ls
nodekey node_info.json
```

`nodekey`は64バイトの16進文字列で、ノード内部で使用する秘密鍵である。 この秘密鍵はカイアのデータディレクトリに存在しなければならないので、紛失しないように注意すること。

```text
$ cat nodekey
f08f2118c455a6c9c9b5e035d3571e570a719ea61771e268546e796a264acc2b
$ mv nodekey ~/kcnd_home
```

作成されたファイル `node_info.json` には以下の内容が含まれている。

| キー名         | 説明                                                                                  | 例                                                                                                                                                                                                                                                                    |
| :---------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NodeAddress | 関連ノードのアドレス                                                                          | 0xc8a23d67f2471066fa1b07270651fea7e5c0cf78                                                                                                                                                                                                                           |
| NodeKey     | the node key (a.k.a private key) | aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a                                                                                                                                                                                                     |
| NodeURI     | ノードURI                                                                              | kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0 |

`node_info.json` はノード情報を以下のようなJSON形式で格納している。

```text
$ cat node_info.json
{
    "NodeAddress": "0xc8a23d67f2471066fa1b07270651fea7e5c0cf78",
    "NodeKey": "aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a",
    "NodeURI": "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0"
}
```

### ノード URI 登録<a id="node-uri-enrollment"></a>

The created node URI should be enrolled to participate in the Core Cell Network (CCN). 登録の流れは以下の通り。

1. 関連するIPとポート番号を含むノードURIを、`kgen` \(`node_info.json`) を使用して作成する。
2. カイア公式メールアドレス(`bootstrap@klaytn.com` for Mainnet or `baobab@klaytn.com` for Kairos)に情報を送信してください。

在籍情報は、カイアの公式メールアドレスに送信すること。 フォーマットは以下の通り。

CNの場合

```text
Company: Kakao
CN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

PNの場合

```text
Company: Kakao
PN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

