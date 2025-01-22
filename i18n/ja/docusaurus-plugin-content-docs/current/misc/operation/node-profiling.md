# プロファイル・ノード・データ

プロファイリングは、Kaiaノードのパフォーマンスを理解し最適化するために不可欠なツールです。 このチュートリアルでは、Kaia のデバッグ API と `net/http/pprof` Go パッケージを活用して、Kaia ノードオペレータで利用可能な様々なプロファイリング手法を説明します。

## 前提条件

始める前に、以下のことを確認してください：

- \*\*ノードのセットアップ：\*\*あなたのKaiaノードは正しくインストールされ、稼動しています。

- **ノード・コンソールへのアクセス:** [ノード・コンソール](../../nodes/endpoint-node/ken-cli-commands.md#javascript-console)経由でノードと対話する必要があります。

- **ツール:** Go tool pprof`と`go tool trace\` を使用するために、Go をシステムにインストールする。 実行すれば確認できる：

```bash
go version
```

## 1\. プロファイリングの管理開始、停止、ステータスの確認方法

Kaiaノードはいくつかのプロファイリング方法を提供する`debug` APIを提供する。 これらのメソッドは、ノードのコンソールまたは[JSON-RPC APIコール](https://docs.kaia.io/references/json-rpc/debug/start-p-prof/)を通じて操作することができます。

### 1.1 pprof HTTP サーバの起動

pprof HTTPサーバーを使用すると、プロファイリングデータを効率的に収集および分析できます。

```bash
# Start pprof server with default settings (localhost:6060)
> debug.startPProf()

# Start pprof server on a specific address and port
> debug.startPProf("localhost", 8080)
```

#### pprof エンドポイントへのアクセス

pprofサーバーが実行されたら、以下のページからプロファイリングデータにアクセスする：

- [http://localhost:6060/debug/pprof/](http://localhost:6060/debug/pprof/) - 利用可能なプロファイルの概要。
- [http://localhost:6060/memsize/](http://localhost:6060/memsize/) - メモリサイズのレポート。
- [http://localhost:6060/debug/vars](http://localhost:6060/debug/vars) - Prometheusメトリクスのエクスポート。

### 1.2 pprof HTTP サーバの停止

```bash
> debug.stopPProf()
```

### 1.3 pprofが起動しているかチェックする

```bash
> debug.isPProfRunning()
true  # if running
false # if not running
```

## 2\. プロファイルの収集

pprofサーバーが実行されると、ノードのパフォーマンスを分析するためにいくつかの方法を使用してさまざまなプロファイルを収集できます。

### 2.1 ウェブインターフェースを使用した収集

以下の例に示すように、異なるプロファイルを収集するために、ウェブブラウザでそれぞれのエンドポイントを入力します：

**ヒーププロファイルの収集**

`http://localhost:6060/debug/pprof/heap`

**30秒間のCPUプロファイルを収集する。**

`http://localhost:6060/debug/pprof/profile?seconds=30`

**goroutineプロファイルをdebug=2で収集する。**

`http://localhost:6060/debug/pprof/goroutine?debug=2`

### 2.2 APIコールによる収集

以下の例に示すように、ノードコンソールでそれぞれのコマンドを入力し、プロファイルを収集または設定します：

```bash
# Collect 30-second CPU profile
> debug.cpuProfile("cpu.profile", 30)

# Collect 30-second block profile
> debug.blockProfile("block.profile", 30)

# Set mutex profiling fraction
> debug.setMutexProfileFraction(1)
```

### 2.3 `go tool pprof` を使って収集する

pprof のウェブ・インターフェイスにアクセスできない場合は、`go tool pprof` を使ってローカルにプロファイリング結果を生成し、分析することができます。

#### 利用可能なプロファイル・タイプを特定する

対応プロファイルは以下の通り：

- `allocs`：過去のメモリ割り当てのサンプリング。
- ブロック\`：同期プリミティブでブロッキングを引き起こしたスタックトレース。
- `goroutine`：現在のすべてのゴルーチンのスタックトレース。 クエリパラメータとして `debug=2` を使用すると、回復していないパニックと同じ形式でエクスポートされる。
- ヒープ`：ライブオブジェクトのメモリ割り当てのサンプリング。 `gc\` GETパラメーターを指定すると、ヒープサンプルの前にガベージコレクションを実行することができる。
- `mutex`：競合するミューテックスの保持者のスタックトレース。
- プロファイル`：CPUプロファイル。 GET パラメーターの `seconds` で継続時間を指定することができる。 プロファイルファイルを入手したら、`go tool pprof\`コマンドを使ってプロファイルを調べてください。
- `threadcreate`：新しい OS スレッドを作成したスタックトレース。
- `trace`：現在のプログラムの実行トレース。 GET パラメーターの `seconds` で継続時間を指定することができる。 トレースファイルを取得したら、`go tool trace`コマンドを使ってトレースを調査する。

#### `go tool pprof`を使ってプロファイルを収集する

```bash
go tool pprof http://localhost:6060/debug/pprof/<profiletype>
```

`<profiletype>` を上記のサポートされているプロファイル（例：`heap`、`profile`）のいずれかに置き換える。

#### コマンド例

```bash
# Collect heap profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Collect 30-second CPU profile
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Collect goroutine profile with debug=2
go tool pprof http://localhost:6060/debug/pprof/goroutine?debug=2
```

#### テキストプロファイリングファイルの生成

テキストベースのプロファイリングレポートを作成するには、`go tool pprof` で `-text` オプションを使用します。

```bash
# Generate text-based CPU profile
go tool pprof -text cpu.profile
```

#### pprof 追加オプション

プロファイリングは、プロファイルを収集する際に追加のクエリーパラメーターとオプションを使用してさらにカスタマイズすることができます。

- **レスポンスフォーマット (`debug=N`):**.

  - **バイナリ形式（デフォルト）：** `N = 0`
  - **プレーンテキスト形式：** `N > 0`

  **例**

```bash
go tool pprof http://localhost:6060/debug/pprof/allocs?debug=1
```

- **ガベージコレクション (`gc=N`):**.

  - **Run GC Before Profiling:** `gc=1` を設定すると、ヒープ・プロファイルをキャプチャする前にガベージ・コレクション・サイクルが実行される。

  **例**

```bash
go tool pprof http://localhost:6060/debug/pprof/heap?gc=1
```

- **継続時間パラメータ (`seconds=N`):**.

  - **アロケーション、ブロック、ゴルーチン、ヒープ、ミューテックス、スレッド作成 プロファイル:**.

    - seconds=N\`は、与えられた継続時間に基づくデルタプロファイルを返す。

  - **CPUプロファイルとトレース・プロファイル:**。

    - seconds=N\`は、CPUプロファイルまたはトレースを実行する時間を指定する。

  **例**

```bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
```

### 2.4 囲碁をインストールせずに収集する

あなたのプログラムにGoがインストールされていない場合は（`go version`を実行することで確認できます）、以下の手順に従ってプロファイリングデータをダウンロードしてローカルに保存してください：

1. `wget`を使ってプロファイルファイルをダウンロードする。

```bash
wget -O memory_profile http://localhost:6060/debug/pprof/heap
```

2. `scp` を使ってプロファイルファイルをローカルマシンに転送する。

```bash
scp <user>@<node_ip>:memory_profile memory_profile
```

注：`<user>` をSSHユーザー名に、`<node_ip>` をKaiaノードのIPアドレスに置き換えてください。

## 3\. メモリ・プロファイリング

前述したように、メモリ・プロファイリングとは、go pprofが提供するヒープ情報のことである。 また、Kaiaノードが提供するデバッグ名前空間のwriteMemProfileによって収集することもできる。

```bash
# Using go tool pprof
> go tool pprof http://localhost:6060/debug/pprof/heap
# Using Node Console
> debug.writeMemProfile("mem.profile")
```

メモリのプロファイリングは、メモリ・リークなどメモリ関連の問題を分析する上で極めて重要である。 メモリ・プロファイリングの粒度をコントロールするには、`MemProfileRate` 変数を調整すると便利である。 これは、ノードの実行のできるだけ早い段階（例えば、`main`関数の先頭）で設定する必要があります。

:::note

Kaiaは `--memprofilerate` フラグを提供し、`MemProfileRate` 変数を簡単に設定できる。 したがって、これはフラグとしてのみ利用可能であるため、ノードの起動時に設定する必要があり、APIコールで変更することはできない。

:::

```bash
var MemProfileRate int = 512 * 1024
```

- \*\*MemProfileRate\`:\*\*を設定する。
  - **プロファイルの最大割り当て数:** `1`に設定。
  - **プロファイリングを無効にする:** `0`に設定する。
  - **デフォルト設定:** `512 * 1024` (512KBごとに約1つの割り当てプロファイル)。

**影響：**

- **Higher Profiling Rate (Lower `MemProfileRate`):** 粒度が大きくなるが、パフォーマンスのオーバーヘッドが発生する可能性がある。
- **Lower Profiling Rate (Higher `MemProfileRate`):** プロファイリングの詳細を減らし、パフォーマンスへの影響を最小限に抑えます。

**ベストプラクティス**

- **Consistency:** 正確なプロファイリングデータを維持するために、ノードのランタイムを通して `MemProfileRate` が一定であることを確認する。
- \*\*初期設定:\*\*一貫したプロファイリング情報を取得するために、`MemProfileRate`をプログラム開始時に設定する。

## 4\. プロファイルの分析

プロファイリングデータを収集した後、`go tool pprof`を使用して、保存されたプロファイルファイルを分析し、視覚化する。

### 4.1 ウェブインタフェースを使った分析

たとえば、Go の pprof ツールを使ってメモリ・プロファイル・データを視覚的に分析することができます：

```bash
go tool pprof -http=0.0.0.0:8081 cpu.profile
```

### 4.2 コマンドラインを使った分析

ターミナル内のテキストベースのインターフェイスで、Goのpprofツールを使ってメモリ・プロファイル・データを分析することもできる：

```bash
go tool pprof cpu.profile
```

- **一般的な`pprof`コマンド:**

  - `top`：リソースを消費する関数の上位を表示する。
  - `list<function_name>`：特定の関数の注釈付きソースコードを表示する。
  - `web`：ウェブブラウザでプロフィールを可視化する。
  - `pdf`：プロファイルの PDF レポートを生成する。

- **使用例：**

```bash
go tool pprof cpu.profile
# Inside the pprof interactive shell:
> top
> list main.functionName
> web
```

:::note

視覚的なグラフを生成するために、`web`コマンドと`pdf`コマンド用にGraphvizがインストールされていることを確認する。

:::

## 5\. 結論

このプロファイリング・チュートリアルに従うことで、Kaiaノードのオペレーターは、パフォーマンスのボトルネックを効果的に特定して対処し、リソースの使用を最適化し、ノードのスムーズで効率的な運用を確保することができます。 定期的なプロファイリングは、強固なモニタリングとロギングの実践と組み合わされ、ブロックチェーンネットワーク内でのKaiaノードの信頼性とパフォーマンスの維持に大きく貢献します。
