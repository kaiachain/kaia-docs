# System Requirements

## H/W Specification <a id="h-w-specification"></a>

The network performance is measured based on the worst hardware specification within the network. According to the blockchain network structure, it is only possible to be scaled up vertically \(increasing hardware capacity\). Hence, it is recommended that all the nodes within the network should have the best hardwares having the similar specifications with each other at least.

If you're curious about the rationale of this hardware spec, the medium article [Determining optimal hardware specs for Kaia node operators](https://klaytn.foundation/node-operator-optimal-specs/) would help you understand.

The following sections show the recommended specifications for CNs.

### Bare-metal Server <a id="bare-metal-server"></a>

#### General Requirements (All Node Types)
| Category | Specifications | 
| :--- | :--- |
| CPU | Intel® 5th Gen Xeon® Scalable Processors ("Emerald Rapids") or newer (e.g., Xeon® Platinum 85xx/86xx series); AMD EPYC™ 9004 Series ("Genoa") or newer, offering comparable performance |
| Storage | ≥ 3 TB SSD (adjust according to chain data size; please consult the Kaia Team for guidance) |

Any physical machine with similar hardware configurations would be sufficient to operate a CN.

#### Recommended Specifications by Node Type
| Node Type | Core/Thread | Memory |
| :--- | :--- | :--- |
| CN | 24 core / 48 threads | ≥ 64 GB |

### Cloud VM <a id="cloud-vm"></a>

#### Recommended Specification for AWS<a id="recommended-specification-for-aws"></a>

| Node Type | Architecture | Model | vCPU | Memory \(GiB\) | Storage size \(GiB\) | Storage speed \(IOPS\) | Price \(Singapore region, USD/h\) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| CN | x86 (Intel) | m8i.8xlarge  | 32 | 128 | 3,000 (Minimum) | 9,000 | 2.117 |
| CN | Arm (Graviton4) | m8g.8xlarge  | 32 | 128 | 3,000 (Minimum) | 9,000 | 1.795 |

This storage specification is derived from AWS EBS SSD (gp3) specification. 

The information above is from [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) and [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/) and may be changed by AWS.

#### Recommended Specification for Azure<a id="recommended-specification-for-azure"></a>

| Node Type | Architecture | Model | vCPU | Memory \(GiB\) | Storage type \(GiB\) | Storage speed \(IOPS\) | Price \(Southeast Asia region, USD/h\) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| CN | x86 (Intel) | D32s v6 | 32 | 128 | 3,000 (Minimum) | 7500 | 2.016 |
| CN | Arm (Cobalt 100) | D32ps v6 | 32 | 128 | 3,000 (Minimum) | 7500 | 1.398 |

This storage specification is derived from Azure Premium SSD v2 specification. 

The information above is from [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) and [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing) and may be changed by Microsoft.

#### Recommended Specification for GCP<a id="recommended-specification-for-gcp"></a>

| Node Type | Architecture | Model | vCPU | Memory \(GiB\) | Storage type \(GiB\) | Storage speed \(IOPS\) | Price \(Singapore region, USD/h\) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| CN | x86 (Intel) | c4-standard-24 | 24 | 90 | 3,000 (Minimum) | 7500 | 1.463 |
| CN | Arm (Axion) | c4a-standard-32 | 32 | 128 | 3,000 (Minimum) | 7500 | 1.773 |

This storage specification is derived from GCP Hyperdisk Balanced specification. 

The information above is from [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) and [https://cloud.google.com/compute/disks-image-pricing](https://cloud.google.com/compute/disks-image-pricing) and may be changed by Google.

## Storage Requirements <a id="storage-requirements"></a>

Assuming 100 TPS in average, 300 bytes average transaction size, and 1-second block latency, the expected daily storage requirement is about 2.5 GB/day \(=300x100x86400\).

## Operating System <a id="operating-system"></a>

Recommended environment is compatible with RHEL (7.8 or later).
Kaia binaries are fully tested on Amazon Linux 2, but they should work on other linux-based environments as well. macOS binaries are also provided for development purpose.
