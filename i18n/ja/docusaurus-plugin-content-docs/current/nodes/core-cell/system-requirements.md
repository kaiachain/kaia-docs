# システム要件

## H/W仕様<a id="h-w-specification"></a>

ネットワークの性能は、ネットワーク内の最悪のハードウェア仕様に基づいて測定される。 According to the blockchain network structure, it is only possible to be scaled up vertically (increasing hardware capacity). したがって、ネットワーク内のすべてのノードは、少なくとも互いに似たような仕様を持つ最高のハードウエアを持つことが推奨される。

このハードウェア仕様の根拠が気になる方は、MEDIAの記事[Kaiaノード運用者に最適なハードウェア仕様の決定](https://klaytn.foundation/node-operator-optimal-specs/)が参考になるだろう。

以下のセクションでは、CNの推奨仕様について説明します。

### ベアメタルサーバー<a id="bare-metal-server"></a>

#### 一般要件（すべてのノードタイプ）

| カテゴリー | 仕様                                                                                                                                              |
| :---- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU   | Intel® 第5世代 Xeon® スケーラブル・プロセッサ（「Emerald Rapids」）またはそれ以降の世代（例：Xeon® Platinum 85xx/86xx シリーズ）；AMD EPYC™ 9004 シリーズ（「Genoa」）またはそれ以降の世代で、同等の性能を備えたもの |
| ストレージ | 3 TB以上のSSD（チェーンのデータサイズに応じて調整してください。詳細については、Kaiaチームにご相談ください）                                                                                     |

CNを稼働させるには、同様のハードウェア構成を持つ物理マシンであれば、どれでも十分です。

#### ノードタイプ別推奨仕様

| Node Type | コア/スレッド     | メモリー    |
| :-------- | :---------- | :------ |
| CN        | 12コア／24スレッド | 64 GB以上 |

### クラウドVM<a id="cloud-vm"></a>

#### AWSの推奨仕様<a id="recommended-specification-for-aws"></a>

| Node Type |       建築       |            Model            | vCPU | Memory (GiB) | Storage size (GiB) | Storage speed (IOPS) |  価格（シンガポール地域、米ドル／時間）  |
| :-------: | :------------: | :-------------------------: | :--: | :-----------------------------: | :-----------------------------------: | :-------------------------------------: | :-------------------: |
|     CN    |   x86（Intel）   | m8i.8xlarge |  32  |               128               |               3,000（最低）               |                  9,000                  | 2.117 |
|     CN    | Arm（Graviton4） | m8g.8xlarge |  32  |               128               |               3,000（最低）               |                  9,000                  | 1.795 |

このストレージ仕様は、AWS EBS SSD (gp3)仕様から派生したものです。

上記の情報は[https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/)および[https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)のものであり、AWSによって変更される可能性がある。

#### アジュール推奨仕様<a id="recommended-specification-for-azure"></a>

| ノードタイプ |      建築      |   Model  | vCPU | Memory (GiB) | Storage type (GiB) | Storage speed (IOPS) |   価格（東南アジア地域、米ドル／時間）  |
| :----: | :----------: | :------: | :--: | :-----------------------------: | :-----------------------------------: | :-------------------------------------: | :-------------------: |
|   CN   |  x86（Intel）  |  D32s v6 |  32  |               128               |               3,000（最低）               |                   7500                  | 2.016 |
|   CN   | アーム（コバルト100） | D32ps v6 |  32  |               128               |               3,000（最低）               |                   7500                  | 1.398 |

このストレージ仕様は、Azure Premium SSD v2 の仕様に基づいています。

上記の情報は[https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/)および[https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing)のものであり、マイクロソフト社によって変更されている可能性があります。

#### GCPの推奨仕様<a id="recommended-specification-for-gcp"></a>

| ノードタイプ |     建築     |       モデル       | ブイシーピーユー | Memory (GiB) | Storage type (GiB) | Storage speed (IOPS) |  価格（シンガポール地域、米ドル／時間）  |
| :----: | :--------: | :-------------: | :------: | :-----------------------------: | :-----------------------------------: | :-------------------------------------: | :-------------------: |
|   CN   | x86（Intel） |  c4-standard-24 |    24    |                90               |               3,000（最低）               |                   7500                  | 1.463 |
|   CN   | アーム（アクシオン） | c4a-standard-32 |    32    |               128               |               3,000（最低）               |                   7500                  | 1.773 |

このストレージ仕様は、GCP Hyperdisk Balancedの仕様に基づいています。

上記の情報は、[https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) および [https://cloud.google.com/compute/disks-image-pricing](https://cloud.google.com/compute/disks-image-pricing) からのものであり、Google によって変更される可能性があります。

## 保管条件<a id="storage-requirements"></a>

Assuming 100 TPS in average, 300 bytes average transaction size, and 1-second block latency, the expected daily storage requirement is about 2.5 GB/day (=300x100x86400).

## オペレーティングシステム<a id="operating-system"></a>

推奨環境はRHEL（7.8以降）です。
KaiaのバイナリはAmazon Linux 2で完全にテストされていますが、他のLinuxベースの環境でも動作するはずです。開発用にmacOSのバイナリも提供されている。
