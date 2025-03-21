# システム要件

エンドポイントノード（EN）を稼働させるには、イーサリアムや他のブロックチェーンのものに比べて比較的高いハードウェアスペックが必要です。ENは、エンタープライズグレードのハードウェアを備えた本格的なコンセンサスノードが生成したブロックを検証する必要があるからです。

ENについては、以下の仕様を推奨する。

## H/W仕様<a id="h-w-specification"></a>

### クラウドVM<a id="cloud-vm"></a>

#### 推奨仕様<a id="recommended-specification-based-on-aws"></a>

| ブイシーピーユー | メモリ（GiB） | ストレージ（GiB） | ディスク帯域幅（Mbps） | ネットワーク帯域幅（Gbps） |
| :------- | :------- | :--------- | :------------ | :-------------- |
| 8        | 64       | > 4,000    | 3,500         | 最大10            |

### ベアメタルマシン<a id="bare-metal-machine"></a>

EN の正確な物理マシンの仕様は規定しないが、クラウド VM のセクションと同様のハードウェア構成を持つ物理マシンであれば、EN を運用するのに十分だろう。

## 保管条件<a id="storage-requirements"></a>

平均100TPS、平均トランザクションサイズ300バイト、ブロックレイテンシ1秒と仮定すると、ENが1日に必要とするストレージ容量は2.5GB/日（=300x100x86400）となる。

## オペレーティングシステム<a id="operating-system"></a>

推奨環境は[Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/)です。
KaiaのバイナリはAmazon Linux 2で完全にテストされていますが、他のLinuxベースの環境でも動作するはずです。
開発用にmacOSのバイナリも提供されている。

