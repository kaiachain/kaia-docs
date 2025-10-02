# システム要件

## H/W仕様<a id="h-w-specification"></a>

ネットワークの性能は、ネットワーク内の最悪のハードウェア仕様に基づいて測定される。 According to the blockchain network structure, it is only possible to be scaled up vertically (increasing hardware capacity). したがって、ネットワーク内のすべてのノードは、少なくとも互いに似たような仕様を持つ最高のハードウエアを持つことが推奨される。

このハードウェア仕様の根拠が気になる方は、MEDIAの記事[Kaiaノード運用者に最適なハードウェア仕様の決定](https://klaytn.foundation/node-operator-optimal-specs/)が参考になるだろう。

以下のセクションでは、CNとPNの推奨仕様を示す。

### ベアメタルサーバー<a id="bare-metal-server"></a>

| カテゴリー | Specification                                                                                                                                   |
| :---- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| サーバー  | インテル® サーバー・システム [M50CYP1UR212](https://www.intel.sg/content/www/xa/en/products/sku/214842/intel-server-system-m50cyp1ur212/specifications.html) |
| CPU   | Intel® Xeon 8358 2.60 GHz (32-core/64-thread)                                                                |
| メモリー  | 128GB (32GB \* 4)                                                                                                            |
| ストレージ | 4TB（またはそれ以上のサイズ）のSSD（チェーンデータのサイズによって、望ましいストレージのサイズと構成は異なる可能性があります。 詳しくはカイア・チームにご相談ください)。                                                        |

これはCNとPNの推奨ハードウェア仕様であり、厳密な要件ではないことに注意。 同様のハードウェア構成を持つ物理的なマシンであれば、CNやPNを操作するのに十分だろう。

ライブ刈り込みDBを使用するには、ライブ刈り込みオプションを使用し、適用することができます。 詳細はhttps://docs.kaia.io/learn/storage/live-pruning/。 ただし、ライブ・プルーニング仕様はCNには推奨されていないが、将来的には変更される可能性がある。

### クラウドVM<a id="cloud-vm"></a>

#### AWSの推奨仕様<a id="recommended-specification-for-aws"></a>

|                   Node Type                  |            Model            | vCPU | Memory (GiB) | Storage size (GiB) | Storage speed (IOPS) | Price (Seoul region, USD/h) |
| :------------------------------------------: | :-------------------------: | :--: | :-----------------------------: | :-----------------------------------: | :-------------------------------------: | :--------------------------------------------: |
|                      CN                      | m6i.8xlarge |  32  |               128               |   4,000 (Minimum)  |                  9,000                  |              1.888             |
|                      PN                      | m6i.4xlarge |  16  |                64               |   4,000 (Minimum)  |                  9,000                  |              0.944             |
| PN (with Live Pruning DB) | m6i.2xlarge |   8  |                32               |   3,500 (Minimum)  |                  9,000                  |              0.472             |

このストレージ仕様は、AWS EBS SSD (gp3)仕様から派生したものです。

上記の情報は[https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/)および[https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)のものであり、AWSによって変更される可能性がある。

#### アジュール推奨仕様<a id="recommended-specification-for-azure"></a>

|                   Node Type                  |  Model  | vCPU | Memory (GiB) | Storage type (GiB) | Storage speed (IOPS) | Price (Korea Central, USD/h) |
| :------------------------------------------: | :-----: | :--: | :-----------------------------: | :-----------------------------------: | :-------------------------------------: | :---------------------------------------------: |
|                      CN                      | D32s v5 |  32  |               128               |     P50 (4096)     |                   7500                  |              1.888              |
|                      PN                      | D16s v5 |  16  |                64               |     P50 (4096)     |                   7500                  |              0.944              |
| PN (with Live Pruning DB) |  D8s v5 |   8  |                32               |     P50 (4096)     |                   7500                  |              0.472              |

このストレージ仕様は、Azure Premium Disk仕様から派生したものである。

上記の情報は[https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/)および[https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing)のものであり、マイクロソフト社によって変更されている可能性があります。

#### GCPの推奨仕様<a id="recommended-specification-for-gcp"></a>

|     ノードタイプ    |       モデル      | ブイシーピーユー | Memory (GiB) | Storage type (GiB) | Storage speed (IOPS) | Price (asia-northeast3, USD/h) |
| :-----------: | :------------: | :------: | :-----------------------------: | :-----------------------------------: | :-------------------------------------: | :-----------------------------------------------: |
|       CN      | c4-standard-32 |    32    |               120               |              4,000ドル（最低額）             |                   7500                  |             2.03078256            |
|       名詞      |   N2スタンダード-16  |    16    |                64               |              4,000ドル（最低額）             |                   7500                  |              1.016243             |
| PN（ライブ剪定DB付き） |   n2-スタンダード-8  |     8    |                32               |              3,500ドル（最低額）             |                   7500                  |              0.508121             |

上記の情報は[https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) と[https://cloud.google.com/storage/pricing#asia](https://cloud.google.com/storage/pricing#asia) のもので、Googleによって変更されている可能性があります。

## 保管条件<a id="storage-requirements"></a>

Assuming 100 TPS in average, 300 bytes average transaction size, and 1-second block latency, the expected daily storage requirement is about 2.5 GB/day (=300x100x86400).

## オペレーティングシステム<a id="operating-system"></a>

推奨環境はRHEL（7.8以降）です。
KaiaのバイナリはAmazon Linux 2で完全にテストされていますが、他のLinuxベースの環境でも動作するはずです。 開発用にmacOSのバイナリも提供されている。
