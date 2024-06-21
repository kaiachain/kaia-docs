# 계정

## 카이아 계정 <a id="klaytn-accounts"></a>

### 계정, 상태 및 주소 개요 <a id="overview-of-account-state-and-address"></a>

카이아의 계정은 개인의 잔액이나 스마트 컨트랙트에 대한 정보를 담고 있는 데이터 구조입니다. 카이아의 상태는 모든 계정의 상태, 즉 카이아 계정에 저장된 모든 데이터의 과거와 현재 상태를 모두 모은 것입니다. 카이아 노드에서 트랜잭션이 실행되면 결과적으로 카이아의 상태는 모든 노드에 걸쳐 변경됩니다. 카이아 네트워크의 모든 노드가 동일한 블록을 동일한 순서로 처리했다면 상태는 동일해야 합니다. 각 계정의 상태 정보는 각 계정을 식별하는 데 사용되는 20바이트 주소와 연관됩니다.

### 주소에서 키 쌍 분리하기 <a id="decoupling-key-pairs-from-addresses"></a>

일반적인 블록체인 플랫폼의 계정은 일반적으로 다음과 같이 보이는 특정 길이의 암호화 처리된 주소와 연결됩니다: "0x0fe2e20716753082222b52e753854f40afddffd2". 이 주소는 키 쌍과 강력하게 결합됩니다. 키 쌍을 선택하면 주소는 공개 키에서 파생됩니다. 이는 사용자 경험 측면에서 많은 단점이 있습니다. 그 중 일부는 다음과 같습니다:

- 사용자가 원하는 주소를 가질 수 없습니다.
- 사용자가 계정의 보안을 강화하기 위해 여러 개의 키 쌍을 사용하는 것은 불가능합니다.
- 실수로 개인키가 노출된 경우 또는 계정의 보안을 강화하기 위해 주기적으로 개인키를 업데이트하려는 경우 사용자가 계정의 키 쌍을 변경하는 것은 불가능합니다.

이는 사용자가 블록체인 플랫폼에서 주소를 식별자로 생각할 수 없다는 큰 장애물입니다. 이러한 장애물을 없애기 위해 카이아는 사용자가 주소와 키 쌍을 선택할 수 있는 기능을 제공합니다. 이 기능을 통해 사용자는 원하는 주소를 선택할 수 있으며, 여러 개의 키 쌍을 사용하여 보안을 강화할 수 있습니다. 키 쌍의 개수는 하나 이상일 수 있으며, 키 쌍은 서로 다른 역할을 가질 수 있습니다. 다중 키 쌍 또는 역할 기반 키에 대한 자세한 내용은 [다중 키 쌍 및 역할 기반 키](#multiple-key-pairs-and-role-based-keys)를 참조하세요.

카이아는 키 쌍과 주소가 강력하게 결합된 기존 방식도 지원한다는 점에 주목할 필요가 있습니다.

### 여러 키 쌍 및 역할 기반 키 <a id="multiple-key-pairs-and-role-based-keys"></a>

앞서 설명한 것처럼 개인키를 도난당하거나 노출되거나 어떤 식으로든 계정의 보안이 손상된 경우, 계정의 보안을 복원하기 위해 취할 수 있는 최선의 방법은 다른 키 쌍을 생성하여 새 계정을 만들고 손상된 기존 계정의 잔액을 새 계정으로 이전하는 것입니다. 다중 서명 또는 사용량별 키와 같은 고급 키 체계에 대한 지원 부족은 또 다른 큰 불편함의 원인입니다. 이러한 문제를 보다 효율적으로 해결하기 위해 카이아 계정은 다음과 같은 기능을 제공합니다:

- 카이아 계정에서는 계정과 연결된 키 쌍을 변경할 수 있습니다.
- 카이아 계정은 여러 개의 키 쌍을 지원하며, 각 키를 다른 용도로 할당할 수 있습니다.
- 카이아 계정은 주소와 강력하게 결합된 단일 키를 가진 계정과의 호환성을 유지합니다.

카이아 계정의 역할 기반 다중키 지원 기능을 활용하면, 최종 사용자는 개인키 오관리와 같은 실제 보안 위험 상황에 더 잘 대처할 수 있습니다. 예를 들어, 사용자가 자신의 개인키가 노출되었다는 사실을 알게 되면, 계정에서 노출된 키 쌍을 제거하고 이를 대체할 새로운 키 쌍을 생성하여 손상된 개인키를 간단히 교체할 수 있습니다. 계정 정보를 업데이트하는 데 사용되는 전용 키를 미리 생성하여 유출된 개인 키와 별도로 보관하면 이러한 작업을 수행할 수 있습니다.

### 사람이 읽을 수 있는 주소 \(HRA\) <a id="human-readable-address-hra"></a>

주소 체계 \(예: "0x0fe2e20716753082222b52e753854f40afddffd2"\)는 계정 소유자의 개인정보를 효율적으로 보호한다는 점에서 장점이 있지만, 최종 사용자 경험 측면에서도 큰 문제점을 안고 있습니다. 첫째, 인간의 두뇌로는 이러한 주소를 외우거나 인식하기가 매우 어렵기 때문에 입력 실수 및 다양한 인적 오류가 발생하기 쉬우며, 이는 종종 사소한 금전적 피해로 이어지기도 합니다. 둘째, 이러한 방식은 최종 사용자가 외우거나 사용하기 쉬운 선호하는 아이디 핸들을 선택할 수 있는 권한을 빼앗아 갑니다. 이러한 문제들이 복합적으로 작용하여 기존 모바일 앱이나 서비스가 제공하는 단순하고 마찰 없는 사용자 경험에 익숙한 일반적인 최종 사용자들에게 dApp 사용자 경험은 낯설고 이해하기 어렵고 매우 불편한 것으로 인식되게 하는 가장 어려운 사용성 장애물 중 하나입니다. 대규모 아키텍처 수정 없이 이전 버전과의 호환성을 유지하면서 이러한 문제를 극복하기 위해 카이아는 최종 사용자가 원하는 값을 할당할 수 있는 20바이트 주소와 20바이트 길이의 텍스트 문자열 사이의 매핑을 제공하기로 결정했습니다. 카이아에서 이 기능을 사람이 읽을 수 있는 주소 \(HRA\)라고 부릅니다. 현재 이 기능은 개발 중이며, 준비되면 더 자세한 정보를 제공하겠습니다.

### 카이아 지갑 키 포맷 <a id="klaytn-wallet-key-format"></a>

카이아 지갑 키 형식은 해당 주소와 함께 개인키를 쉽게 다룰 수 있도록 제공됩니다. 이를 통해 사용자는 주소와 함께 개인키를 더 쉽게 관리할 수 있습니다. 형식은 16진수 표기법으로 `0x{private key}0x{type}0x{address in hex}`이며, 여기서 `{type}`은 `00`이어야 합니다. 다른 값은 예약되어 있습니다. 예시는 아래와 같습니다:

```text
0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d80x000xa94f5374fce5edbc8e2a8697c15331677e6ebf0b
```

이 형식은 현재 [Kaia 지갑](../build/tools/wallets/klaytn-wallet.md)에서 지원됩니다.

### 카이아 계정 유형 <a id="klaytn-account-types"></a>

There are two types of accounts in Klaytn: <LinkWithTooltip to="../../misc/glossary#externally-owned-account-eoa" tooltip="User-controlled blockchain accounts for transactions,<br /> secured by a private key.">externally owned accounts</LinkWithTooltip> \(EOAs\), and <LinkWithTooltip to="../../misc/glossary#smart-contract-account-sca" tooltip="Blockchain account with programmable logic <br />for automated transactions.">smart contract accounts</LinkWithTooltip> \(SCAs\).

#### 외부 소유 계정 \(EOA\) <a id="externally-owned-accounts-eoas"></a>

외부 소유 계정에는 nonce 및 잔액과 같은 정보가 있습니다. 이 유형의 계정에는 코드나 저장소가 없습니다. EOA는 개인 키로 제어되며 연결된 코드가 없습니다. EOA는 키 쌍을 사용하여 만들 수 있으며, 이후에는 키 쌍을 가진 모든 사람이 제어할 수 있습니다. 계정 키는 [계정 키](#account-key) 섹션에 설명되어 있습니다.

**속성**

| 속성            | Type                                                  | 설명                                                                                                                                                                                                                                                                                                                                     |
| :------------ | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | uint8 \(Go\)                     | 외부 소유 계정의 유형입니다. EOA의 경우 **0x1**이어야 합니다.                                                                                                                                                                                                                                                               |
| nonce         | uint64 \(Go\)                    | 트랜잭션의 순서를 결정하는 데 사용되는 시퀀스 번호입니다. 다음에 처리할 트랜잭션은 이 값과 동일한 nonce를 갖습니다.                                                                                                                                                                                                                                   |
| balance       | \*big.Int \(Go\) | 계정이 보유한 KAIA의 양입니다.                                                                                                                                                                                                                                                                                                    |
| humanReadable | bool \(Go\)                      | 계정이 사람이 읽을 수 있는 주소와 연결되어 있음을 나타내는 부울 값입니다. [HRA](#human-readable-address-hra)는 개발 중이므로 모든 계정에 대해 이 값은 false입니다.                                                                                                                                                                                        |
| key           | [AccountKey](#account-key)                            | 이 계정에 연결된 키입니다. 이 필드는 [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultisig](#accountkeyweightedmultisig), [AccountKeyRoleBased](#accountkeyrolebased) 중 어느 것이든 될 수 있습니다. 트랜잭션의 서명은 이 키로 확인됩니다. |

#### 스마트 컨트랙트 계정 \(SCA\) <a id="smart-contract-accounts-scas"></a>

EOA와 달리 SCA는 연결된 코드가 있으며 해당 코드에 의해 제어됩니다. SCA는 스마트 컨트랙트 배포 트랜잭션에 의해 생성되며, 일단 배포된 SCA는 자체적으로 새 트랜잭션을 시작할 수 없고 다른 계정(EOA 또는 다른 SCA)에 의해 트리거되어야 합니다.

**속성**

| 속성            | Type                                                                                         | 설명                                                                                                                                                                                                                                                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | uint8 \(Go\)                                                            | 스마트 컨트랙트 계정 유형입니다. SCA의 경우 **0x2**여야 합니다.                                                                                                                                                                                                                                                              |
| nonce         | uint64 \(Go\)                                                           | 트랜잭션 순서를 결정하는 데 사용되는 시퀀스 번호입니다. 다음에 처리할 트랜잭션은 이 값과 동일한 nonce를 갖습니다.                                                                                                                                                                                                                                    |
| balance       | \*big.Int \(Go\)                                        | 계정이 보유한 KAIA의 양입니다.                                                                                                                                                                                                                                                                                                    |
| humanReadable | bool \(Go\)                                                             | 계정이 사람이 읽을 수 있는 주소와 연결되어 있음을 나타내는 부울 값입니다. HRA](#human-readable-address-hra)는 개발 중이므로 모든 계정에 대해 이 값은 false입니다.                                                                                                                                            |
| key           | [AccountKey](#account-key)                                                                   | 이 계정에 연결된 키입니다. 이 필드는 [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultisig](#accountkeyweightedmultisig), [AccountKeyRoleBased](#accountkeyrolebased) 중 어느 것이든 될 수 있습니다. 트랜잭션의 서명은 이 키로 확인됩니다. |
| codeHash      | \[\]byte \(Go\)   | 계정 스마트 컨트랙트 코드의 해시입니다. 이 값은 변경할 수 없으므로 스마트 컨트랙트를 만들 때만 설정됩니다.                                                                                                                                                                                                                                          |
| storageRoot   | \[32\]byte \(Go\) | 계정의 모든 저장소 변수 값을 포함하는 머클 패트리샤 트리의 루트에 대한 256비트 해시입니다.                                                                                                                                                                                                                                                                  |
| codeFormat    | uint8 \(Go\)                                                            | 지원되는 인터프리터 버전. 최대 16개까지 설정할 수 있습니다. 현재는 EVM\(0x00\)만 지원합니다.                                                                                                                                                                                                       |
| vmVersion     | uint8 \(Go\)                                                            | 컨트랙트 배포 시점의 프로토콜 업그레이드(하드포크) 정보(예: 0x0(Istanbul), 0x1(Istanbul,London,...)). 최대 16개까지 사용할 수 있습니다. 컨트랙트와 함께 자동으로 생성됩니다.                     |

:::note

참고: klaytn v1.7.0 이후부터는 스마트 컨트랙트 계정에 vmVersion 속성이 추가됩니다.

:::

### 카이아 계정 유형 ID <a id="klaytn-account-type-id"></a>

아래는 각 계정 유형에 할당된 계정 유형 ID입니다.

| 계정 유형                               | 계정 유형 ID |
| ----------------------------------- | -------- |
| 외부 소유 계정(EOA)    | 0x1      |
| 스마트 컨트랙트 계정(SCA) | 0x2      |

## 계정 키 <a id="account-key"></a>

계정 키는 계정과 연결된 키 구조를 나타냅니다.

### AccountKeyNil <a id="accountkeynil"></a>

AccountKeyNil은 빈 키를 나타냅니다. 계정이 AccountKeyNil 객체를 가지려고 하면 트랜잭션이 실패합니다. AccountKeyNil은 역할 기반 키가 있는 TxTypeAccountUpdate 트랜잭션에만 사용됩니다. 예를 들어 계정이 역할 기반 키만 업데이트하려고 하는 경우, TxTypeAccountUpdate 트랜잭션의 키 필드는 다음과 같습니다:

`[AccountKeyNil, NewKey, AccountKeyNil]`

그러면 RoleAccountUpdate 키만 업데이트됩니다. 다른 역할은 업데이트되지 않습니다. 자세한 내용은 [AccountKeyRoleBased](#accountkeyrolebased)을 참조하세요.

#### 속성 <a id="attributes"></a>

AccountKeyNil에 대한 속성이 없습니다.

#### RLP 인코딩 <a id="rlp-encoding"></a>

`0x80`

### AccountKeyLegacy <a id="accountkeylegacy"></a>

AccountKeyLegacy는 해당 키 쌍에서 파생된 주소를 가진 계정에 사용됩니다. 계정에 AccountKeyLegacy가 있는 경우, 트랜잭션 유효성 검사 프로세스는 일반적인 블록체인 플랫폼과 마찬가지로 아래와 같이 수행됩니다:

- `ecrecover(txhash, txsig)`에서 공개키를 가져옵니다.
- 공개키의 주소를 가져옵니다.
- 주소는 발신자입니다.

#### 속성 <a id="attributes"></a>

| 속성   | Type                              | 설명                                                                     |
| :--- | :-------------------------------- | :--------------------------------------------------------------------- |
| Type | uint8 \(Go\) | 계정 키 레거시의 유형입니다. 이 값은 **0x01**이어야 합니다. |

#### RLP 인코딩 <a id="rlp-encoding"></a>

`0x01c0`

### AccountKeyPublic <a id="accountkeypublic"></a>

서명된 공개키의 개수는 가중된 공개키의 개수보다 작아야 합니다.\
AccountKeyPublic은 공개 키가 하나뿐인 계정에 사용됩니다.\
계정에 AccountKeyPublic 객체가 있는 경우 트랜잭션 유효성 검사 프로세스는 아래와 같이 수행됩니다:

- `ecrecover(txhash, txsig)`에서 파생된 공개키를 가져옵니다.
- 파생된 공개키가 해당 공개키와 동일한지 확인합니다.

  account's public key.

#### 속성 <a id="attributes"></a>

| 속성   | Type                                                                                         | 설명                                                                            |
| :--- | :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Type | uint8 \(Go\)                                                            | AccountKeyPublic의 유형입니다. 이 값은 **0x02**여야 합니다. |
| Key  | \[33\]byte \(Go\) | 키는 S256 커브의 압축된 공개 키여야 합니다.                                   |

#### RLP 인코딩 <a id="rlp-encoding"></a>

`0x02 + encode(CompressedPubKey)`

**참고**: CompressedPubKey는 [SEC1](https://www.secg.org/SEC1-Ver-1.0.pdf)에 정의된 압축 형식의 공개키입니다. 즉, PubkeyY가 짝수인 경우 0x02`{PubkeyX}`, 그렇지 않은 경우 0x03`{PubkeyX}`입니다.

#### RLP 인코딩 \(예제\) <a id="rlp-encoding-example"></a>

```javascript
prvkey 0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b
pubkeyX 0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
pubkeyY 0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e

RLP: 0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
```

### AccountKeyFail <a id="accountkeyfail"></a>

계정에 AccountKeyFail 키가 있으면 트랜잭션 유효성 검사 프로세스는 항상 실패합니다. 스마트 컨트랙트 계정에서 전송한 트랜잭션이 항상 실패하도록 스마트 컨트랙트 계정에 사용할 수 있습니다.

#### 속성 <a id="attributes"></a>

| 속성   | Type                              | 설명                                                                |
| :--- | :-------------------------------- | :---------------------------------------------------------------- |
| Type | uint8 \(Go\) | 계정키실패의 유형입니다. 유형 0x03\*\*이어야 합니다. |

#### RLP 인코딩 <a id="rlp-encoding"></a>

`0x03c0`

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

AccountKeyWeightedMultiSig는 임계값을 포함하는 계정 키 유형이며, WeightedPublicKeys는 공개 키와 해당 가중치로 구성된 목록을 포함합니다.
AccountKeyWeightedMultiSig와 연결된 계정에 대해 트랜잭션이 유효하려면 다음 조건이 충족되어야 합니다:

- 서명된 공개 키의 가중치 합이 임계값보다 커야 합니다.
- 유효하지 않은 서명이 트랜잭션에 포함되어서는 안 됩니다.
- The number of signed public keys should be less than the number of weightedPublicKeys.

:::note

The following multiSig validation logic has been added with the [IstanbulEVM](docs/misc/klaytn-history.md#istanbul-evm) hardfork.

- 유효하지 않은 서명이 트랜잭션에 포함되어서는 안 됩니다.
- The number of signed public keys should be less than the number of weightedPublicKeys.

:::

#### 속성 <a id="attributes"></a>

| 속성                 | Type                                                                                                                                                               | 설명                                                                                         |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| Type               | uint8 \(Go\)                                                                                                                                  | 계정키 가중 다중서명의 유형입니다. 이 값은 **0x04**여야 합니다.                   |
| Threshold          | uint \(Go\)                                                                                                                                   | 유효성 검사 임계값입니다. 유효한 트랜잭션이 되려면 서명의 가중치 합이 임계값보다 크거나 같아야 합니다. |
| WeightedPublicKeys | \[\]\{uint, \[33\]byte\} \(Go\) | 가중 공개 키 목록입니다. 가중 공개 키에는 압축된 공개 키와 가중치가 포함됩니다.             |

#### RLP 인코딩 <a id="rlp-encoding"></a>

`0x04 + encode([threshold, [[weight, CompressedPubKey1], [weight2, CompressedPubKey2]]])`

#### RLP 인코딩 \(예제\) <a id="rlp-encoding-example"></a>

```javascript
Threshold 3
Key0 Weight: 1
PubkeyX 0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e
PubkeyY 0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712
Key1 Weight: 1
PubkeyX 0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb
PubkeyY 0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842
Key2 Weight: 1
PubkeyX 0xea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cd
PubkeyY 0xb95ebb02d9397b4a8faceb58d485d612f0379a923ec0ddcf083378460a56acca
Key3 Weight: 1
PubkeyX 0x8551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6
PubkeyY 0x4206aa84bc8955fcbfcc396854228aa63ebacd81b7311a31ab9d71d90b7ec3d7

RLP: 0x04f89303f890e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfbe301a102ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cde301a1038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6
```

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

AccountKeyRoleBased는 역할 기반 키를 나타냅니다. 역할은 [Roles](#roles)에서 지정됩니다.

#### 속성 <a id="attributes"></a>

| 속성   | Type                                                                                                   | 설명                                                                                                                                                        |
| :--- | :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type | uint8 \(Go\)                                                                      | AccountKeyRoleBased 유형입니다. 0x05\*\*여야 합니다.                                                                                |
| Keys | \[\]\{AccountKey\} \(Go\) | 키 목록입니다. 키는 AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail 및 AccountKeyWeightedMultiSig 중 하나 일 수 있습니다. |

#### 역할 <a id="roles"></a>

AccountKeyRoleBased의 역할은 다음과 같이 정의됩니다:

| role              | 설명                                                                                                                                                                    |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RoleTransaction   | 인덱스 0. 기본 키입니다. TxTypeAccountUpdate 이외의 트랜잭션은 이 역할의 키로 서명해야 합니다.                                                      |
| RoleAccountUpdate | 인덱스 1. 이 키로 서명해야 하는 트랜잭션은 이 키로 서명해야 합니다. 이 키가 계정에 없는 경우 RoleTransaction 키를 사용하여 TxTypeAccountUpdate 트랜잭션의 유효성을 검사합니다. |
| RoleFeePayer      | 색인 2. 이 계정이 발신자 대신 송금 수수료를 보내려면 이 키로 트랜잭션에 서명해야 합니다.  이 키가 계정에 없는 경우 수수료 위임 트랜잭션은 RoleTransaction 키를 사용하여 유효성을 검사합니다. |

#### RLP 인코딩 <a id="rlp-encoding"></a>

`0x05 + encode([key1, key2, key3])`

key1, key2, key3은 위의 키 \(AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail, AccountKeyWeightedMultiSig\) 중 어느 것이든 될 수 있다는 점에 유의하세요.

#### 생략 가능 및 확장 가능 역할 <a id="omissible-and-expandable-roles"></a>

마지막 인덱스에서 역할을 생략할 수 있으며, 생략된 역할은 첫 번째 역할에 매핑됩니다. 그러나 중간에 있는 역할은 생략할 수 없으므로 RoleAccountUpdate 없이는 RoleTransaction 및 RoleFeePayer를 설정할 수 없습니다. 예를 들어 역할 기반 키가 `0x05 + encode([key1, key2])`로 설정된 경우 RoleFeePayer는 키가 `0x05 + encode([key1, key2, key1])`와 같이 설정된 것처럼 작동합니다.

이 기능을 사용하면 앞으로 더 많은 역할을 추가할 수 있습니다. 새 역할이 제공되면 이전 역할로 이미 만들어진 계정의 새 역할이 첫 번째 역할에 매핑됩니다.

#### RLP 인코딩 \(예제\) <a id="rlp-encoding-example"></a>

```javascript
RoleTransaction Key
PubkeyX 0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d
PubkeyY 0x0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919
RoleAccountUpdate Key
Threshold: 2
Key0 Weight:1
PubkeyX 0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d
PubkeyY 0x0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919
Key1 Weight:1
PubkeyX 0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06
PubkeyY 0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d
RoleFeePayer Key
PubkeyX 0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447
PubkeyY 0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2

RLP: 0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06a302a102c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447
```

## 계정 키 유형 ID <a id="account-key-type-id"></a>

아래는 각 계정 키 유형에 할당된 계정 키 유형 ID입니다.

| 계정 키 유형                    | 계정 키 유형 ID |
| -------------------------- | ---------- |
| AccountKeyLegacy           | 0x01       |
| AccountKeyPublic           | 0x02       |
| AccountKeyFail             | 0x03       |
| AccountKeyWeightedMultiSig | 0x04       |
| AccountKeyRoleBased        | 0x05       |
