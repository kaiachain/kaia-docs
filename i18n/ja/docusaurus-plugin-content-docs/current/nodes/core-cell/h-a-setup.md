# 高可用性の設定

コアセルを効率的に運用するためには、CNを高可用性に設定することが重要です。 推奨される高可用性スキームは、コアセルが物理インフラ上に配置されるかクラウドインフラ上に配置されるかによって異なる。

## Active-Standby (recommended for bare-metal) <a id="active-standby-recommended-for-bare-metal"></a>

この構成では、2台のCNノードがアクティブ・スタンバイ構成で設置される。 通常動作時、アクティブノードはブロック生成に参加し、スタンバイノードはネットワークからのチェーンデータの同期のみを行う。 この構成により、アクティブ・ノードに障害が発生した場合でも、スタンバイCNノードがチェーンデータのフレッシュなコピーを持つことが保証される。

### セットアップ<a id="setup"></a>

1. アクティブなCNの `nodekey` のバックアップを作成する。
2. スタンバイCNを設置する。 以外はアクティブCNと同じ構成である：
   - スタンバイでは別の `nodekey` を使用する。
   - `$DATA_DIR/static-nodes.json`にPNのアドレスを追加する。

### フェイルオーバー<a id="failover"></a>

1. スタンバイCNを停止する： `sudo systemctl stop kcnd`
2. スタンバイの `nodekey` を故障したアクティブCNの `nodekey` に置き換える。
3. アクティブCNのIPアドレスをスタンバイCNに再割り当てする。
4. スタンバイCNを起動し、ネットワークと同期していることを確認する：sudo systemctl start kcnd\`

## Machine Image & Snapshot (recommended for cloud) <a id="machine-image-snapshot-recommended-for-cloud"></a>

クラウド・インフラストラクチャでは、運用者は故障したノードをより迅速に交換できるため、2つ目のスタンバイCNを運用する必要はない。 その代わり、新しいCNを迅速にプロビジョニングし、チェーンデータの最新コピーを提供できるようにすれば十分である。

正確な用語や手順は、クラウド環境によって異なる場合がある。 The procedure below is based on AWS (specifically EC2 and EBS), but can be adapted for other cloud platforms.

### セットアップ<a id="setup"></a>

1. アクティブなCNの `nodekey` のバックアップを作成する。
2. Each time the CN configuration or software is updated, create a machine image (e.g. AMI). DATA_DIR\`を含むボリュームはこのイメージに含めないでください。

### フェイルオーバー<a id="failover"></a>

CCのPNノードのいずれかを使用して、チェーンデータのスナップショットを取得します：

1. 任意のPNノードに接続し、kpndを停止する：sudo systemctl stop kpnd\`。 データの一貫性を確保するために、まずkpndを停止することが重要である。
2. AWSコンソールを使用して、PNの`DATA_DIR`を含むボリュームのスナップショットを作成する。
3. kpndを起動する：`sudo systemctl start kpnd` です。

ベースCNイメージとchaindataイメージを使って新しいCNを作成する：

1. Create an instance using the CN image (created in "Setup" above).
2. PN の `$DATA_DIR` のスナップショットから作成されたボリュームをアタッチする。
3. `$DATA_DIR/klay/chaindata` を除くすべてのファイルをボリュームから削除する。 `kcnd.conf`に設定されている`DATA_DIR`がchaindataのあるディレクトリと一致していることを確認する。 ディレクトリ名が異なる場合は、リネームする必要があるかもしれない。
4. 失敗した CN の `nodekey` を `$DATA_DIR/klay/nodekey` にコピーする。
5. 障害が発生したCNのIPアドレスを代替CNに再割り当てする。
6. kcndを起動する：`sudo systemctl start kcnd` です。
7. CNがネットワークと同期していることを確認する。

## その他の考慮事項<a id="additional-considerations"></a>

故障したCNのパブリックIPを代替CNに再割り当てすることで、代替CNは他のCNにすぐに接続できるようになる。 IP が変更された場合、他のすべての CCO がファイアウォール設定を更新するまで、新しい CN はネットワークに接続できません。
