# 시스템 요구 사항

## H/W 사양 <a id="h-w-specification"></a>

네트워크 성능은 네트워크 내 최악의 하드웨어 사양을 기준으로 측정됩니다. 블록체인 네트워크 구조상 수직적 확장(하드웨어 용량 증가)만이 가능합니다. 따라서 네트워크 내 모든 노드는 최소한 서로 비슷한 사양의 최고급 하드웨어를 보유하는 것이 좋습니다.

이 하드웨어 사양의 근거가 궁금하신 분들은 미디엄 글 [Kaia 노드 운영자를 위한 최적의 하드웨어 사양 결정하기](https://klaytn.foundation/node-operator-optimal-specs/)를 참고하시면 이해에 도움이 될 것입니다.

다음 섹션에서는 CN과 PN 모두에 대한 권장 사양을 보여줍니다.

### 베어메탈 머신 <a id="bare-metal-machine"></a>

#### 일반 요구 사항(모든 노드 유형)

| 카테고리 | 사양                                                                                                                         |
| :--- | :------------------------------------------------------------------------------------------------------------------------- |
| CPU  | 2.6GHz 기본 - 3.4GHz 최대 주파수 이상(예: 3세대 인텔® 제온® 스케일러블 프로세서) |
| 스토리지 | ≥ 4TB 이상의 SSD(체인 데이터 크기에 따라 조정, 지침은 Kaia 팀에 문의)                                                         |

유사한 하드웨어 구성을 가진 모든 물리적 컴퓨터는 CN 또는 PN을 작동하기에 충분합니다.

#### 노드 유형별 권장 사양

| Node Type                                    | 코어/스레드     | 메모리   |
| :------------------------------------------- | :--------- | :---- |
| CN                                           | 16코어/32스레드 | 128GB |
| PN                                           | 8코어/16스레드  | 64GB  |
| PN (with Live Pruning DB) | 4코어/8스레드   | 32GB  |

You can use and apply a live-pruning option to use live-pruning DB. For more details, please refer https://docs.kaia.io/learn/storage/live-pruning/. However, note that live-pruning spec is not recommended for CNs but this may change in the future.

### 클라우드 VM <a id="cloud-vm"></a>

#### 권장 사양 <a id="recommended-specification-based-on-aws"></a>

|                     노드 유형                    |            Model            | vCPU | 네트워크 대역폭(Gbps) |  디스크 대역폭(Mbps)  | Storage speed (IOPS) | 가격 (서울 지역, USD/h) |
| :------------------------------------------: | :-------------------------: | :--: | :-------------------------------: | :--------------------------------: | :-------------------------------------: | :----------------------------------: |
|                      CN                      | m6i.8xlarge |  32  |                128                | 4,000 (Minimum) |                  9,000                  |         1.888        |
|                      PN                      | m6i.4xlarge |  16  |                 64                | 4,000 (Minimum) |                  9,000                  |         0.944        |
| PN (with Live Pruning DB) | m6i.2xlarge |   8  |                 32                | 3,500 (Minimum) |                  9,000                  |         0.472        |

이 스토리지 사양은 AWS EBS SSD(gp3) 사양에서 파생되었습니다.

위의 정보는 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) 및 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)에서 가져온 것으로, AWS에 의해 변경될 수 있습니다.

#### 권장 환경은 [Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/)입니다.

|                     노드 유형                    |    모델   | vCPU | 엔드포인트 노드(EN)를 실행하려면 엔터프라이즈급 하드웨어를 갖춘 본격적인 합의 노드에서 생성된 블록을 검증해야 하기 때문에 이더리움이나 다른 블록체인에 비해 상대적으로 높은 하드웨어 사양이 필요합니다. | Storage type (GiB) | 스토리지 속도 (IOPS) | 가격 (한국 중앙, USD/h) |
| :------------------------------------------: | :-----: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------: | :-------------------------------: | :----------------------------------: |
|                      CN                      | D32s v5 |  32  |                                                                          128                                                                         |     P50 (4096)     |                7500               |         1.888        |
|                      PN                      | D16s v5 |  16  |                                                                          64                                                                          |     P50 (4096)     |                7500               |         0.944        |
| PN (with Live Pruning DB) |  D8s v5 |   8  |                                                                          32                                                                          |     P50 (4096)     |               3,500               |         0.472        |

이 스토리지 사양은 Azure 프리미엄 디스크 사양에서 파생되었습니다.

위의 정보는 [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) 및 [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing)에서 가져온 것이며 Microsoft에서 변경할 수 있습니다.

#### EN의 경우 다음 사양을 권장합니다.

|                 노드 유형                 |       모델       | vCPU | 메모리(GiB) |    스토리지(GiB)    | 스토리지 속도 (IOPS) | Price (asia-northeast3, USD/h) |
| :-----------------------------------: | :------------: | :--: | :-------------------------: | :--------------------------------: | :-------------------------------: | :-----------------------------------------------: |
|                   CN                  | c4-standard-32 |  32  |             120             |               > 4,000              |                7500               |             2.03078256            |
|                   PN                  | n2-standard-16 |  16  |              64             | 4,000 (Minimum) |                7500               |              1.016243             |
| PN(라이브 가지치기 DB 포함) |  n2-standard-8 |   8  |              32             | 3,500 (Minimum) |                7500               |              0.508121             |

The information above is from [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) and [https://cloud.google.com/storage/pricing#asia](https://cloud.google.com/storage/pricing#asia) and may be changed by Google.

## 스토리지 요구 사항 <a id="storage-requirements"></a>

평균 100 TPS, 평균 트랜잭션 크기 300바이트, 블록 지연 시간 1초를 가정할 때, 예상되는 EN 일일 스토리지 요구량은 2.5GB/일(=300x100x86400)입니다.

## 운영 체제 <a id="operating-system"></a>

권장 환경은 RHEL(7.8 이상)과 호환됩니다.
Kaia 바이너리는 Amazon Linux 2에서 완벽하게 테스트되었지만, 다른 리눅스 기반 환경에서도 작동할 것입니다. 개발 목적으로 macOS 바이너리도 제공됩니다.
