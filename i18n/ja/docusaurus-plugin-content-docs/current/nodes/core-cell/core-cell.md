# コアセル

## 対象読者 <a id="intended-audience"></a>

- コアセル・オペレーター
- If your interest is in making and running Blockchain Applications on Klaytn, you don't need to maintain a Core Cell. You need to run an [Endpoint Node](../endpoint-node/endpoint-node.md) instead to make your application interact with Klaytn network.

## コアセルの概要<a id="core-cell-overview"></a>

コアセル（CC）は、コンセンサス・プロセスに参加するエンティティであり、トランザクションの実行とブロックの生成を担当する。
A Klaytn Core Cell (CC) consists of the following components.

- コンセンサス・ノード（CN）：コンセンサスノードはブロック生成プロセスに参加する。
- プロキシノード（PN）：プロキシノードはネットワークへのインターフェースを提供する。 PNはトランザクション要求をコンセンサスノードに送信し、ブロックをエンドポイントノードに伝搬する。

コアセルは、1つのCNと2つ以上のPNで構成されることが推奨される。
CNはコアセルネットワーク内の他のCNと接続してコンセンサスを行う。
CNは同じコアセル内のPNからの接続のみを受け入れ、トランザクション要求を受信し、ブロックをネットワークに伝搬する。
PNは、エンドポイント・ノード・ネットワーク内のどのENからの接続も受け入れる。

![Core Cell Overview](/img/nodes/cn_set.png)

| 名称 | 説明                                                                                                                                                                                                                                                          | ネットワーク・セキュリティ                                                                                                                                                                                                                                               | 数量                         |
| :- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| CN | コアセルネットワークの他のCNと新しいブロックを作成するノード。                                                                                                                                                                                                                            | ネットワークは許可されたCNで構成される。 (IPアクセスコントロールが必要）。                                                                                                                                                                                                 | 1ユニット                      |
| PN | - A node that submits transactions received from the Klaytn Endpoint Node Network to the CN. <br/>- It propagates the created blocks to Klaytn Endpoint Node Network. <br/>- エンドポイント・ノード・ネットワークの EN の数に応じて、水平方向にスケールアウトできる。 | \* It is connected to the CN in the Core Cell, and its IP and Ports are required to be public to accept connections from other Klaytn nodes on the Internet. <br/>- PNブートノードを介して、他のコアセル内の他のPNと接続することができる。 <br/>- ENブートノードを介してENに接続することができる。 | 少なくとも1つのPNが必要。 2人以上のPNを推奨。 |
