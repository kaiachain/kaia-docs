# アカウント作成

## 新規アカウントの作成<a id="creating-a-new-account"></a>

これで新しいアカウントが作成され、アドレスが画面に印刷されます。 データ・ディレクトリの下にキーストアファイルが作成されます。

**カイア・キーストア・ファイル**

アカウントを作ると、キーストア・ファイルが作成されます。 キーストアファイルは、トランザクションに署名するために使用する、あなた独自のKaia秘密鍵の暗号化バージョンです。 キーストア・ファイル名は以下のフォーマットであります：

- `UTC--<created_at UTC ISO8601>-<address hex>`

Kaiaノード間で、ディレクトリ全体または個々のキーストア・ファイルを転送することは安全です。 別のノードから自分のノードにキーを追加する場合、アカウントの順序が変わる可能性があることにご注意ください。 そのため、スクリプトやコード・スニペットでインデックスに依存しないようにご注意ください。

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

\*\*警告パスワードをファイルに保存したり、その他の方法で公開したりするのは遠慮してください。 \*\*パスワードフラグをパスワードファイルと一緒に使用する場合、ファイルが読みにくくはないか、自分以外の人が読めないかを確認してください。 これを達成するには

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
I type my pass here
^D
```

### JavaScriptコンソール<a id="javascript-console"></a>

コンソールでは、以下の関数を呼び出してアカウントを作成することができます：

```javascript
> personal.newAccount("passphrase")
```

アカウントは暗号化された形式で保存されます。  今後アカウントのロックを解除するには、このパスフレーズを覚えておく必要があります。

## アカウントのインポート<a id="importing-an-account"></a>

キーファイルを使用してアカウントをインポートできます。 keyfileには、暗号化されていない秘密鍵が、16進数にエンコードされた正規のEC rawバイトとして格納されているものとする。 簡単に言えば、先頭の `0x` を除いたプレーンテキストの秘密鍵である。 Keyfileはhexでエンコードされた標準EC原始バイトで暗号化されていない秘密鍵を含むと仮定されます。 簡単に言えば、先頭の `0x` を除いたプレーンテキストの秘密鍵であります。

これは、与えられたキーファイルから暗号化されていない秘密鍵をインポートし、新しいアカウントを作成し、データ・ディレクトリの下にキーストア・ファイルを生成し、コンソールにアドレスを表示します。 これは、与えられたキーファイルから暗号化されていない秘密鍵をインポートし、新しいアカウントを作成し、データ・ディレクトリの下にキーストア・ファイルを生成し、コンソールにアドレスを表示する。 今後アカウントのロックを解除するには、パスフレーズを覚えておく必要があります。

**注**：キーストアファイルを別のKaiaインスタンスに直接コピーできる場合、このインポート/エクスポート機構は必要ありません。

### ken <a id="ken-1"></a>

```bash
$ ken account import --datadir <datadir> <keyfile>
$ ken account import --password <passwordfile> --datadir <datadir> <keyfile>
```

### JavaScriptコンソール<a id="javascript-console-1"></a>

```bash
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"​

// Using a Kaia wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```