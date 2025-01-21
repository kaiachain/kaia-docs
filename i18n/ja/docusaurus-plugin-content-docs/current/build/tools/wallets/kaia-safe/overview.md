# カイア・セーフ・デザイン

現在、Kaia Safeはマルチシグネチャ・ウォレットを作成・管理するためのツール群である：

- **Safe React:** これは、マルチシグ・ウォレットを作成し、それとやり取りするためのリアクト・ウェブ・アプリである。

- **Safe Transaction Service:** これは、セーフコントラクト経由で送信されたトランザクションを追跡し、メインネットとカイロスの最近のブロックからのイベントを監視します。 また、オフチェーンで署名を集めたり、ブロックチェーンへの送信が保留されている取引について所有者に通知したりするために、取引をサービスに送信することもできる。

- **Safe Config Service:** これは、Kaia Safe クライアント環境の設定情報を提供します。例えば、チェーンの詳細や API の設定などです。

- \*\*Safe Client Gateway：\*\*これは、Kaia Safeクライアントとバックエンドサービス（トランザクションサービスおよびKaia Nodes）間のゲートウェイです
  。

- **Safe Infrastructure:** バックエンドサービス（Safe-Transaction、Safe-Config、Safe-Client Gateway）をデプロイするためのクラスタセットアップです。

詳しくはこちらの[リンク](https://github.com/kaiachain/kaia-safe-infrastructure)をご参照ください。
