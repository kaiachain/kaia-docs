# ログ操作

## ログのローテーションの設定

`log.rotate`フラグを設定することでログローテーションを有効にし、以下のフラグでログローテーションの設定を行うことができる。

- `--log.rotate`：このフラグを設定すると、ログローテーションが有効になり、他のログローテーションオプションが適用されます。
- `--log.maxsize`：バックアップファイル作成のトリガーとなるファイルサイズをMB単位で指定する。
- `--log.maxbackups`：保存できるバックアップファイルの最大数を決定する。 この制限に達すると、古いログは削除されます。
- `--log.maxage`：ログファイルを保持する最大日数を表す。 例えば、30に設定すると、バックアップファイルは30日後に削除されます。
- `--log.compress`：このフラグを設定すると、バックアップログをgz形式で圧縮する。

例

```
./bin/ken ... --log.rotate --log.maxsize 100 --log.maxbackups 10 --log.maxage 30 --log.compress
```

また、設定ファイル（`kend.conf`など）で以下のオプションを設定することで、ログローテーションを有効にしたり、設定したりすることができる。

```
# log rotation related options
LOG_ROTATE=1 # setting 1 to enable the log rotation related options
LOG_MAXSIZE=100 # the unit is MB
LOG_MAXBACKUPS=10
LOG_MAXAGE=30 # maximum number of days to retain a log file
LOG_COMPRESS=1 # setting 1 to compress the backup logs in gz format
```

v1.0.0以上のパッケージをダウンロードして使用することを推奨します。 リリースノートのバイナリセクションからダウンロードできます（例：[v1.11.0 release note](https://github.com/klaytn/klaytn/releases/tag/v1.11.0)）。 次の3つのファイルがv1.0.0以上であることを確認してください：設定ファイル、デーモン、バイナリ。 そうでなければ、うまくいかない。

## 通常ログステータス

| タイプ                                                         | メッセージ                                                                                                                                                                                                                                                                                      | 説明                                                                                                                                                                                |    |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -- |
| Error                                                       | FastWebsocketHandler fail to upgrade message                                                                                                                                                                                                                                               | WebSocket接続のバージョン問題                                                                                                                                                               | ロー |
| Error                                                       | invalid index of the proposer                                                                                                                                                                                                                                                              | ENがCNからトランザクションを受信する際に発生するエラー                                                                                                                                                     | ロー |
| WARN                                                        | ProtocolManager failed to read msg                                                                                                                                                                                                                                                         |                                                                                                                                                                                   | ロー |
| WARN                                                        | Failed doConnTypeHandshake                                                                                                                                                                                                                                                                 |                                                                                                                                                                                   | ロー |
| ERRORErro                                                   | Protocol istanbul/64 failed                                                                                                                                                                                                                                                                | ピア切断                                                                                                                                                                              | ロー |
| Error                                                       | Fasthttp Err                                                                                                                                                                                                                                                                               | 接続処理時のエラー：何も読み取れないままタイムアウト                                                                                                                                                        | ロー |
| Error                                                       | Fasthttp Err                                                                                                                                                                                                                                                                               | 接続処理時のエラー: リクエストヘッダ読み込み時のエラー: "\x16…で http リクエストメソッドが見つかりません。                                                                                     | ロー |
| Warn                                                        | hash=b1b26c…6b220a err="insufficient balance for transfer"                                                                                                                                                                                                                                 | このログは、処理されたトランザクション(通常はマイニング)が「from account」の残高不足のために実行できない場合に発生する(理論的には、トランザクションが作成されtxpoolに入った時点では残高が十分であったが、実際に実行された時点では残高がなかった場合に発生する)。 | ロー |
| ERROR                                                       | ERROR\[06/06,23:23:46 Z] \[7] decode anchor payload err="rlp: expected input list for types.AnchoringDataLegacy" | アンカリングtxのデータフィールドには、どのようなタイプの値でも含めることができる。 しかし、誤ったタイプの値が入力された場合、エラーログがノードに出力される。                                                                                                  |    |
| Proposer : `Successfully wrote mined block` |                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                   |    |

非提案者 `新しいブロックを挿入しました`。

## ログレベル変更 (0~5)

カイア・コンソールへ

```
#default Value
> debug.verbosity(3)
# hight detail logs Value
> debug.verbosity(5)
# No Logs Value
> debug.verbosity(0)

# Default Value for Blockchain log
> debug.vmodule("blockchain=3")
# High detail Value for Blockchain Log
> debug.vmodule("blockchain=5")

```
