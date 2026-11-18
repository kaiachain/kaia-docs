# 시스템 요구 사항

## H/W 사양 <a id="h-w-specification"></a>

네트워크 성능은 네트워크 내 최악의 하드웨어 사양을 기준으로 측정됩니다. 블록체인 네트워크 구조상 수직적 확장(하드웨어 용량 증가)만이 가능합니다. 따라서 네트워크 내 모든 노드는 최소한 서로 비슷한 사양의 최고급 하드웨어를 보유하는 것이 좋습니다.

이 하드웨어 사양의 근거가 궁금하신 분들은 미디엄 글 [Kaia 노드 운영자를 위한 최적의 하드웨어 사양 결정하기](https://klaytn.foundation/node-operator-optimal-specs/)를 참고하시면 이해에 도움이 될 것입니다.

다음 섹션에서는 CN에 대한 권장 사양을 설명합니다.

### 베어메탈 머신 <a id="bare-metal-machine"></a>

#### 일반 요구 사항(모든 노드 유형)

| 카테고리 | 사양                                                                                                                                                                                                                            |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU  | Intel® 5세대 Xeon® 스케일러블 프로세서("Emerald Rapids") 또는 그 이후 버전(예: Xeon® Platinum 85xx/86xx 시리즈); AMD EPYC™ 9004 시리즈("Genoa") 또는 그 이후 버전으로, 동등한 성능을 제공하는 제품 |
| 스토리지 | 3 TB 이상의 SSD (체인 데이터 크기에 따라 조정하십시오. 자세한 내용은 Kaia 팀에 문의해 주십시오)                                                                                                                              |

CN을 운영하기 위해서는 유사한 하드웨어 구성을 갖춘 어떤 물리적 서버라도 충분합니다.

#### 노드 유형별 권장 사양

| Node Type | 코어/스레드       | 메모리      |
| :-------- | :----------- | :------- |
| CN        | 12코어 / 24스레드 | 64 GB 이상 |

### 클라우드 VM <a id="cloud-vm"></a>

#### 권장 사양 <a id="recommended-specification-based-on-aws"></a>

| 노드 유형 |                 건축                 |            Model            | vCPU | 네트워크 대역폭(Gbps) | 디스크 대역폭(Mbps) | Storage speed (IOPS) | 가격 \(싱가포르 지역, USD/h\) |
| :---: | :--------------------------------: | :-------------------------: | :--: | :-------------------------------: | :------------------------------: | :-------------------------------------: | :----------------------------------------: |
|   CN  |     x86 (인텔)    | m8i.8xlarge |  32  |                128                |   3,000 (최소)  |                  9,000                  |            2.117           |
|   CN  | Arm (Graviton4) | m8g.8xlarge |  32  |                128                |   3,000 (최소)  |                  9,000                  |            1.795           |

이 스토리지 사양은 AWS EBS SSD(gp3) 사양에서 파생되었습니다.

위의 정보는 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) 및 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)에서 가져온 것으로, AWS에 의해 변경될 수 있습니다.

#### 권장 환경은 [Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/)입니다.

| 노드 유형 |                건축                |    모델    | vCPU | 엔드포인트 노드(EN)를 실행하려면 엔터프라이즈급 하드웨어를 갖춘 본격적인 합의 노드에서 생성된 블록을 검증해야 하기 때문에 이더리움이나 다른 블록체인에 비해 상대적으로 높은 하드웨어 사양이 필요합니다. | Storage type (GiB) | 스토리지 속도 (IOPS) | 가격 \(동남아시아 지역, USD/h\) |
| :---: | :------------------------------: | :------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------: | :-------------------------------: | :-----------------------------------------: |
|   CN  |    x86 (인텔)   |  D32s v6 |  32  |                                                                          128                                                                         |     3,000 (최소)     |                7500               |            2.016            |
|   CN  | Arm (코발트 100) | D32ps v6 |  32  |                                                                          128                                                                         |     3,000 (최소)     |                7500               |            1.398            |

이 스토리지 사양은 Azure Premium SSD v2 사양을 기반으로 합니다.

위의 정보는 [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) 및 [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing)에서 가져온 것이며 Microsoft에서 변경할 수 있습니다.

#### EN의 경우 다음 사양을 권장합니다.

| 노드 유형 |               건축               |     모델    | vCPU | 메모리(GiB) |  스토리지(GiB) | 스토리지 속도 (IOPS) | 가격 \(싱가포르 지역, USD/h\) |
| :---: | :----------------------------: | :-------: | :--: | :-------------------------: | :---------------------------: | :-------------------------------: | :----------------------------------------: |
|   CN  |   x86 (인텔)  |  c4-표준-24 |  24  |              90             | 3,000 (최소) |               3,500               |            1.463           |
|   CN  | Arm (Axion) | c4a-표준-32 |  32  |             128             | 3,000 (최소) |                7500               |            1.773           |

이 스토리지 사양은 GCP Hyperdisk Balanced 사양을 기반으로 합니다.

위의 정보는 [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) 및 [https://cloud.google.com/compute/disks-image-pricing](https://cloud.google.com/compute/disks-image-pricing)에서 가져온 것이며, Google에 의해 변경될 수 있습니다.

## 스토리지 요구 사항 <a id="storage-requirements"></a>

평균 100 TPS, 평균 트랜잭션 크기 300바이트, 블록 지연 시간 1초를 가정할 때, 예상되는 EN 일일 스토리지 요구량은 2.5GB/일(=300x100x86400)입니다.

## 운영 체제 <a id="operating-system"></a>

권장 환경은 RHEL(7.8 이상)과 호환됩니다.
Kaia 바이너리는 Amazon Linux 2에서 완벽하게 테스트되었지만, 다른 리눅스 기반 환경에서도 작동할 것입니다. 개발 목적으로 macOS 바이너리도 제공됩니다.
