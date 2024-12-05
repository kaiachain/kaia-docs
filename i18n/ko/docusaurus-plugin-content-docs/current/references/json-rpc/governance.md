---
description: 클레이튼 거버넌스와 관련된 API입니다.
---

# governance

네트워크의 거버넌스를 위해 Klaytn은 `governance` 네임스페이스에서 다음과 같은 API를 제공합니다.

클레이튼에는 세 가지 거버넌스 모드가 있습니다.

- `none`: 네트워크에 참여하는 모든 노드가 구성을 변경할 수 있는 권한을 가집니다.
- `single`: 지정된 노드 하나만 구성을 변경할 수 있는 권한이 있습니다.
- `ballot`: 투표권이 있는 모든 노드가 변경에 투표할 수 있습니다. 전체 투표권의 절반 이상이 모이면 투표가 통과됩니다.

거버넌스 모드에 따라 제안자는 단가, 최소 스테이킹 금액 등과 같은 네트워크 파라미터에 대해 투표할 수 있습니다.
제안자가 되려면 후보 노드는 최소한의 KLAY를 예치해야 합니다.
자격을 갖춘 모든 노드는 항상 블록을 제안할 수 있지만, 제안할 수 있는 기회는 지분 금액에 따라 제한됩니다.

일정 기간 내에 제안자가 될 수 있는 슬롯 수(기회 수)를 결정하기 위해 스테이킹 비율을 계산할 때,
숫자를 반올림하여 노드에 슬롯이 할당되지 않을 수 있습니다.
그러나 최소한의 KLAY를 예치한 적격 노드에게는 슬롯이 보장됩니다.

즉, 자격이 없는 노드(충분한 양의 KLAY를 스테이킹하지 않은 노드)는 블록을 제안하거나 검증할 기회가 주어지지 않습니다.

**주의**

- 거버넌스 노드는 예외적으로 항상 \`single\`\` 모드에서 자격이 부여됩니다.
- 블록이 제안될 때 투표가 진행됩니다. 이 투표는 블록이 제안된 epoch를 포함하여 두 개의 epoch 이후에 적용됩니다.
  예외적으로 추가 검증자/제거 검증자만 즉시 적용됩니다.

## governance_vote <a id="governance_vote"></a>

`vote` 메서드는 새로운 투표를 제출합니다. 거버넌스 모드에 따라 노드에 투표 권한이 있는 경우 투표를 할 수 있습니다. 그렇지 않은 경우 오류 메시지가 반환되고 투표가 무시됩니다.

**매개변수**

- `key` : 변경할 구성 설정의 이름입니다. 키의 형식은 `domain.field`입니다.
- `value` : 각 키에 대한 다양한 유형의 값입니다.

| Key                                 | 설명                                                                                                                                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"governance.governancemode"`       | `STRING`. 세 가지 거버넌스 모드 중 하나입니다. `"none"`, `"single"`, `"ballot"`                                                                                                                                                |
| `"governance.governingnode"`        | `ADDRESS`. 지정된 거버넌스 노드의 주소. 거버넌스 모드가 `"single"`인 경우에만 작동합니다(예: `"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"`                                                                                |
| `"governance.unitprice"`            | `NUMBER`. 단위 가스 가격. 예: `25000000000`                                                                                                                                                                            |
| `"governance.addvalidator"`         | `ADDRESS`. 새 검증자 후보의 주소. 예: `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`                                                                                                                                        |
| `"governance.removevalidator"`      | `ADDRESS`. 제거해야 하는 현재 유효성 검사기의 주소. 예: `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`                                                                                                                              |
| `"governance.deriveshaimpl"`        | `NUMBER`. 블록 헤더에 트랜잭션 해시 및 영수증 해시를 생성하는 정책입니다. 사용 가능한 옵션은 [여기](https://github.com/klaytn/klaytn/blob/v1.10.0/blockchain/types/derive_sha.go#L34)를 참조하세요. 예: `2` (DeriveShaConcat)            |
| `"governance.govparamcontract"`     | `ADDRESS`. GovParam 컨트랙트의 주소. ). 예: `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`                                                                                                                                |
| `"istanbul.epoch"`                  | `NUMBER`. 투표가 블록 단위로 수집되는 기간입니다. epoch가 종료되면 통과되지 않은 모든 투표가 지워집니다. 예: `86400`                                                                                                                                   |
| `"istanbul.committeesize"`          | `NUMBER`. 위원회의 검증자 수.(체인 구성에서 `sub`) 예: `7`                                                                                                                                                  |
| `"reward.mintingamount"`            | `STRING`. 블록이 생성될 때 발행되는 peb의 양입니다. 값은 큰따옴표로 묶어야 합니다. 예: `"9600000000000000000"`                                                                                                                                |
| `"reward.ratio"`                    | `STRING`. CN/KGF/KIR에 대한 분포율을 `"/"`로 구분합니다. 모든 값의 합은 `100`이어야 합니다. 예: `"50/40/10"`은 CN 50%, KGF 40%, KIR 10% 를 의미합니다.                                                                                           |
| `"reward.kip82ratio"`               | `STRING`. 블록 제안자와 스트라이커의 분배 비율을 `"/"`로 구분합니다. 모든 값의 합은 `"100"`이어야 합니다. 자세한 내용은 [KIP-82](https://github.com/klaytn/kips/blob/master/KIPs/kip-82.md)를 참고하세요. 예를 들어 `"20/80"`은 제안자가 20%를, 스트라이커가 80%를 가져간다는 의미입니다. |
| `"reward.useginicoeff"`             | `BOOL`. Gini 계수를 사용할지 여부를 설정합니다. `true`, `false`                                                                                                                                                                |
| `"reward.deferredtxfee"`            | `BOOL`. 제안자에게 트랜잭션 수수료를 제공하는 방식입니다. true이면 트랜잭션 수수료가 블록 보상과 합산되어 제안자, KIR, KGF에게 분배된다는 의미입니다. 그렇지 않으면 트랜잭션 수수료가 모두 제안자에게 지급됩니다. `true`, `false`                                                                 |
| `"reward.minimumstake"`             | `STRING`. CN(컨센서스 노드)이 되기 위해 필요한 Klay의 양입니다. 값은 큰따옴표로 묶어야 합니다. 예: `"5000000"`                                                                                                                |
| `"kip71.lowerboundbasefee"`         | `NUMBER`. 가능한 가장 낮은 기본 수수료입니다. 자세한 내용은 [KIP-71](https://github.com/klaytn/kips/blob/main/KIPs/kip-71.md) 참조. 예: `25000000000`                                                                                   |
| `"kip71.upperboundbasefee"`         | `NUMBER`. 가능한 가장 높은 기본 수수료. `750000000000`.                                                                                                                                                                     |
| `"kip71.gastarget"`                 | `NUMBER`. 기본 수수료가 달성하고자 하는 블록 가스. 부모 블록이 가스 목표보다 많으면 기본 수수료가 증가하고, 부모 블록이 가스 목표보다 적으면 기본 수수료가 감소합니다. `30000000`.                                                                                                |
| `"kip71.basefeedenominator"`        | `NUMBER`. 기본 수수료가 변경되는 속도를 제어합니다. `20`.                                                                                                                                                                         |
| `"kip71.maxblockgasusedforbasefee"` | `NUMBER`. 기본 수수료 계산에서 인식되는 최대 블록 가스. 예: `60000000`                                                                                                                                                              |

**리턴 값**

| 유형     | 설명       |
| ------ | -------- |
| string | 투표 제출 결과 |

**예시**

```javascript
> governance.vote ("governance.governancemode", "ballot")
"Your vote was successfully placed."

> governance.vote ("governance.governingnode", "0x12345678990123456789901234567899012345678990")
"Your vote was successfully placed."

> governance.vote("istanbul.epoch", 604800)
"Your vote was successfully placed."

> governance.vote("governance.unitprice", 25000000000)
"Your vote was successfully placed."

> governance.vote("istanbul.committeesize", 7)
"Your vote was successfully placed."

> governance.vote("reward.mintingamount", "9600000000000000000")
"Your vote was successfully placed."

> governance.vote("reward.ratio", "40/30/30")
"Your vote was successfully placed."

> governance.vote("reward.useginicoeff", false)
"Your vote was successfully placed."

// If wrong data are given
> governance.vote("reward.ratio", 100)
"Your vote couldn't be placed. Please check your vote's key and value"

> governance.vote("governance.governingnode", 1234)
"Your vote couldn't be placed. Please check your vote's key and value"

// when `governancemode` is "single" and the node is not `governingnode`
> governance.vote("governance.governancemode", "ballot")
"You don't have the right to vote"
```

## governance_showTally <a id="governance_showtally"></a>

`showTally` 속성은 거버넌스 투표의 현재 집계 결과를 제공합니다. 집계된 찬성률을 백분율로 표시합니다. 50%가 넘으면 투표가 통과됩니다.

**매개변수**

없음

**리턴 값**

| 유형    | 설명                                     |
| ----- | -------------------------------------- |
| Tally | 각 투표의 가치 및 찬성률(백분율) |

**예제**

```javascript
> governance.showTally
[{
    ApprovalPercentage: 36.2,
    Key: "unitprice",
    Value: 25000000000
}, {
    ApprovalPercentage: 72.5,
    Key: "mintingamount",
    Value: "9600000000000000000"
}]
```

## governance_totalVotingPower <a id="governance_totalvotingpower"></a>

`totalVotingPower` 속성은 CN이 보유한 모든 투표권의 합계를 제공합니다. 각 CN은 1.0 \~ 2.0의 투표권을 가집니다.
`"none"`, `"single"` 거버넌스 모드에서는 `totalVotingPower`이 아무런 정보를 제공하지 않습니다.

**매개변수**

없음

**반환 값**

| 유형    | 설명              |
| ----- | --------------- |
| Float | 총 투표권 또는 오류 메시지 |

**예시**

```javascript
// In "ballot" governance mode
> governance.totalVotingPower
32.452

// In "none", "single" governance mode
> governance.totalVotingPower
"In current governance mode, voting power is not available"
```

## governance_myVotingPower <a id="governance_myvotingpower"></a>

`myVotingPower` 속성은 노드의 투표권을 제공합니다. 투표권은 1.0 \~ 2.0이 될 수 있습니다.
`"none"`, `"single"` 거버넌스 모드에서 `totalVotingPower`는 어떠한 정보도 제공하지 않습니다.

**매개변수**

없음

**리턴 값**

| 유형    | 설명                |
| ----- | ----------------- |
| Float | 노드의 투표권 또는 오류 메시지 |

**예시**

```javascript
// In "ballot" governance mode
> governance.myVotingPower
1.323

// In "none", "single" governance mode
> governance.myVotingPower
"In current governance mode, voting power is not available"
```

## governance_myVotes <a id="governance_myvotes"></a>

`myVotes` 속성은 해당 epoch에서 내 투표 정보를 제공합니다. 각 투표는 사용자 노드가 새 블록을 생성할 때 블록에 저장됩니다. 현재 epoch가 종료되면 이 정보는 지워집니다.

**매개변수**

없음

**리턴 값**

| 유형        | 설명                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Vote List | 해당 epoch에서 노드의 투표 상태 <br />- `BlockNum`: 해당 투표가 저장된 블록 번호 <br />- `Casted`: 이 투표가 블록에 저장되었는지 여부<br />- `키/`value\`: 투표의 내용입니다. |

**예시**

```javascript
> governance.vote("governance.governancemode", "ballot")
"Your vote was successfully placed."

> governance.myVotes
[{
    BlockNum: 403,
    Casted: true,
    Key: "governance.governancemode",
    Value: "ballot"
}]

```

## governance_getChainConfig <a id="governance_getchainconfig"></a>

`getChainConfig`는 특정 블록의 체인 구성을 반환합니다.
파라미터가 설정되지 않은 경우, 가장 최근 블록의 체인 구성을 반환합니다.

**매개변수**

| 유형              | 설명                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호, 또는 [기본 블록 매개변수](klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

:::note

참고: 블록 번호는 최신 블록 번호보다 클 수 있으며, 이 경우 API는 현재 체인 상태를 기준으로 임시 값을 반환합니다. 향후 거버넌스 매개변수는 추가 거버넌스 투표 또는 GovParam 컨트랙트 상태 변경을 통해 변경될 수 있습니다.

:::

**리턴 값**

| 유형   | 설명               |
| ---- | ---------------- |
| JSON | 주어진 블록 번호의 체인 구성 |

**예시**

```javascript
> governance.getChainConfig()
{
  chainId: 1001,
  deriveShaImpl: 0,
  ethTxTypeCompatibleBlock: 86513895,
  governance: {
    govParamContract: "0x84214cec245d752a9f2faf355b59ddf7f58a6edb",
    governanceMode: "single",
    governingNode: "0x99fb17d324fa0e07f23b49d09028ac0919414db6",
    kip71: {
      basefeedenominator: 20,
      gastarget: 30000000,
      lowerboundbasefee: 25000000000,
      maxblockgasusedforbasefee: 60000000,
      upperboundbasefee: 750000000000
    },
    reward: {
      deferredTxFee: true,
      kip82ratio: "20/80",
      minimumStake: 5000000,
      mintingAmount: 6400000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "50/40/10",
      stakingUpdateInterval: 86400,
      useGiniCoeff: true
    }
  },
  istanbul: {
    epoch: 604800,
    policy: 2,
    sub: 22
  },
  istanbulCompatibleBlock: 75373312,
  koreCompatibleBlock: 111736800,
  londonCompatibleBlock: 80295291,
  magmaCompatibleBlock: 98347376,
  unitPrice: 250000000000
}
```

## governance_chainConfig <a id="governance_chainconfig"></a>

`chainConfig` 속성은 최신 체인 구성을 제공합니다.
이는 매개변수가 비어 있는 `chainConfigAt()`와 동일합니다.

:::caution

`governance_chainConfig` API는 Klaytn v1.11부터 더 이상 사용되지 않습니다([klaytn#1783](https://github.com/klaytn/klaytn/pull/1783) 참조).
대신 <a href="#governance_getchainconfig">`governance_getChainConfig`</a>를 사용하세요.

참고: RPC API는 v1.11부터 더 이상 사용되지 않습니다. 그러나 Klaytn JavaScript 콘솔의 `governance.chainConfig` 프로퍼티는
는 Klaytn v1.10.2부터 제거되었습니다.

:::

:::note

참고: Klaytn v1.10.0 이전 버전에서는 이 API가 초기 체인 구성을 반환했습니다.
그러나 혼동을 줄 수 있는 이름으로 인해 Klaytn v1.10.0부터 업데이트되었습니다.
초기 체인 구성을 조회하려면 `chainConfigAt(0)`을 대신 사용하세요.

:::

**매개변수**

없음

**리턴 값**

| 유형   | 설명       |
| ---- | -------- |
| JSON | 현재 체인 구성 |

**예시**

```javascript
> governance.chainConfig
{
  chainId: 1001,
  deriveShaImpl: 2,
  governance: {
    govParamContract: "0x0000000000000000000000000000000000000000",
    governanceMode: "ballot",
    governingNode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    kip71: {
      basefeedenominator: 20,
      gastarget: 30000000,
      lowerboundbasefee: 25000000000,
      maxblockgasusedforbasefee: 60000000,
      upperboundbasefee: 750000000000
    },
    reward: {
      deferredTxFee: true,
      kip82ratio: "20/80",
      minimumStake: 5000000,
      mintingAmount: 6400000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "50/40/10",
      stakingUpdateInterval: 20,
      useGiniCoeff: false
    }
  },
  istanbul: {
    epoch: 20,
    policy: 2,
    sub: 1
  },
  istanbulCompatibleBlock: 0,
  koreCompatibleBlock: 0,
  londonCompatibleBlock: 0,
  magmaCompatibleBlock: 0,
  unitPrice: 25000000000
}
```

## governance_chainConfigAt <a id="governance_chainconfigat"></a>

`chainConfigAt`은 특정 블록의 체인 구성을 반환합니다.
매개변수가 설정되지 않은 경우, 가장 최근 블록의 체인 구성을 반환합니다.

:::caution

`governance_chainConfigAt` API는 Klaytn v1.11부터 더 이상 사용되지 않습니다([klaytn#1783](https://github.com/klaytn/klaytn/pull/1783) 참조).
대신 <a href="#governance_getchainconfig">`governance_getChainConfig`</a>를 사용하세요.

:::

**매개변수**

| 유형              | 설명                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호, 또는 [기본 블록 매개변수](klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

:::note

참고: 블록 번호는 최신 블록 번호보다 클 수 있으며, 이 경우 API는 현재 체인 상태를 기준으로 임시 값을 반환합니다. 향후 거버넌스 매개변수는 추가 거버넌스 투표 또는 GovParam 컨트랙트 상태 변경을 통해 변경될 수 있습니다.

:::

**리턴 값**

| 유형   | 설명               |
| ---- | ---------------- |
| JSON | 주어진 블록 번호의 체인 구성 |

**예제**

```javascript
> governance.chainConfigAt()
{
  chainId: 1001,
  deriveShaImpl: 2,
  governance: {
    govParamContract: "0x0000000000000000000000000000000000000000",
    governanceMode: "ballot",
    governingNode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    kip71: {
      basefeedenominator: 20,
      gastarget: 30000000,
      lowerboundbasefee: 25000000000,
      maxblockgasusedforbasefee: 60000000,
      upperboundbasefee: 750000000000
    },
    reward: {
      deferredTxFee: true,
      kip82ratio: "20/80",
      minimumStake: 5000000,
      mintingAmount: 6400000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "50/40/10",
      stakingUpdateInterval: 20,
      useGiniCoeff: false
    }
  },
  istanbul: {
    epoch: 20,
    policy: 2,
    sub: 1
  },
  istanbulCompatibleBlock: 0,
  koreCompatibleBlock: 0,
  londonCompatibleBlock: 0,
  magmaCompatibleBlock: 0,
  unitPrice: 25000000000
}
```

## governance_nodeAddress <a id="governance_nodeaddress"></a>

`nodeAddress` 속성은 사용자가 사용 중인 노드의 주소를 제공합니다. 노드키에서 파생되며 합의 메시지에 서명하는 데 사용됩니다. 그리고 `"governingnode"`의 값은 검증자의 노드 주소 중 하나이어야 합니다.

**매개변수**

없음

**리턴 값**

| 유형      | 설명           |
| ------- | ------------ |
| ADDRESS | 노드의 20바이트 주소 |

**예제**

```javascript
> governance.nodeAddress
"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"
```

## governance_getParams <a id="governance_getparams"></a>

`getParams`는 특정 블록의 거버넌스 파라미터를 반환합니다.

**매개변수**

| 유형              | 설명                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호, 또는 [기본 블록 매개변수](klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

:::note

참고: 블록 번호는 최신 블록 번호보다 클 수 있으며, 이 경우 API는 현재 체인 상태를 기준으로 임시 값을 반환합니다. 향후 거버넌스 매개변수는 추가 거버넌스 투표 또는 GovParam 컨트랙트 상태 변경을 통해 변경될 수 있습니다.

:::

**리턴 값**

| 유형   | 설명        |
| ---- | --------- |
| JSON | 거버넌스 매개변수 |

**예시**

```javascript
> governance.getParams(89)
{
  governance.deriveshaimpl: 2,
  governance.governancemode: "single",
  governance.governingnode: "0x99fb17d324fa0e07f23b49d09028ac0919414db6",
  governance.govparamcontract: "0x0000000000000000000000000000000000000000",
  governance.unitprice: 25000000000,
  istanbul.committeesize: 22,
  istanbul.epoch: 604800,
  istanbul.policy: 2,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: true,
  reward.kip82ratio: "20/80",
  reward.minimumstake: "5000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.ratio: "34/54/12",
  reward.stakingupdateinterval: 86400,
  reward.useginicoeff: true
}
```

## governance_itemsAt <a id="governance_itemsat"></a>

`itemAt`은 특정 블록에서 거버넌스 매개변수를 반환합니다.

:::caution

`governance_itemsAt` API는 Klaytn v1.11부터 더 이상 사용되지 않습니다([klaytn#1783](https://github.com/klaytn/klaytn/pull/1783) 참조).
대신 <a href="#governance_getparams">`governance_getParams`</a>를 사용하세요.

:::

**매개변수**

| 유형              | 설명                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 정수 또는 16진수 블록 번호, 또는 [기본 블록 매개변수](klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

:::note

참고: Klaytn v1.7.0 이전 버전에서는 정수 블록 번호, 문자열 `"earliest"` 및 `"latest"`만 사용할 수 있습니다.

:::

:::note

참고: 블록 번호는 최신 블록 번호보다 클 수 있으며, 이 경우 API는 현재 체인 상태를 기준으로 임시 값을 반환합니다. 향후 거버넌스 매개변수는 추가 거버넌스 투표 또는 GovParam 컨트랙트 상태 변경을 통해 변경될 수 있습니다.

:::

**리턴 값**

| 유형   | 설명      |
| ---- | ------- |
| JSON | 거버넌스 항목 |

**예시**

```javascript
> governance.itemsAt(89)
{
  governance.deriveshaimpl: 2,
  governance.governancemode: "single",
  governance.governingnode: "0x7bf29f69b3a120dae17bca6cf344cf23f2daf208",
  governance.govparamcontract: "0x0000000000000000000000000000000000000000",
  governance.unitprice: 25000000000,
  istanbul.committeesize: 13,
  istanbul.epoch: 30,
  istanbul.policy: 2,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: true,
  reward.kip82ratio: "20/80",
  reward.minimumstake: "5000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 30,
  reward.ratio: "34/54/12",
  reward.stakingupdateinterval: 60,
  reward.useginicoeff: true
}
```

## governance_pendingChanges <a id="governance_pendingchanges"></a>

`pendingChanges`은 충분한 수의 투표를 받았지만 아직 확정되지 않은 항목의 목록을 반환합니다. 현재 epoch가 끝나면 이러한 변경 사항이 확정되고 그 결과는 다음 epoch 이후의 epoch부터 적용됩니다.

**매개변수**

없음

**리턴 값**

| 유형        | 설명                        |
| --------- | ------------------------- |
| Vote List | 키와 값으로 구성된 pendingChanges |

**예제**

```javascript
> governance.pendingChanges
{
  reward.minimumstake: "5000000",
  reward.useginicoeff: false
}
```

## governance_votes <a id="governance_vote"></a>

`votes`는 해당 epoch의 모든 노드의 투표를 반환합니다. 이러한 투표는 각 블록의 헤더에서 수집됩니다.

**매개변수**

없음

**리턴 값**

| 유형        | 설명                     |
| --------- | ---------------------- |
| Vote List | 키, 값, 노드 주소로 구성된 현재 투표 |

**예시**

```javascript
> governance.votes
[{
    key: "reward.minimumstake",
    validator: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    value: "5000000"
}, {
    key: "reward.useginicoeff",
    validator: "0xa5bccb4d279419abe2d470f8c04dec0789ac2d54",
    value: false
}]
```

## governance_idxCache <a id="governance_idxcache"></a>

`idxCache` 속성은 메모리 캐시에 있는 현재 idxCache의 배열을 반환합니다. idxCache에는 거버넌스 변경이 발생한 블록 번호가 포함됩니다. 캐시에는 기본적으로 최대 1000개의 블록 번호가 메모리에 저장될 수 있습니다.

**매개변수**

없음

**리턴 값**

| 유형           | 설명                 |
| ------------ | ------------------ |
| uint64 array | 거버넌스 변경이 발생한 블록 번호 |

**예제**

```javascript
> governance.idxCache
[0, 30]
```

## governance_idxCacheFromDb <a id="governance_idxcachefromdb"></a>

`idxCacheFromDb`는 거버넌스 변경이 발생한 모든 블록 번호가 포함된 배열을 반환합니다. `idxCacheFromDb`의 결과는 `idxCache`의 결과와 같거나 더 깁니다.

**매개변수**

없음

**리턴 값**

| 유형           | 설명                    |
| ------------ | --------------------- |
| uint64 array | 거버넌스 변경이 발생한 모든 블록 번호 |

**예시**

```javascript
> governance.idxCacheFromDb
[0, 30]
```

## governance_itemCacheFromDb <a id="governance_itemcachefromdb"></a>

`itemCacheFromDb` 함수는 주어진 블록에 저장된 거버넌스 정보를 반환합니다. 주어진 블록에 변경 사항이 저장되지 않은 경우 함수는 `null`을 반환합니다.

**매개변수**

| 유형     | 설명                                |
| ------ | --------------------------------- |
| uint64 | 블록에 적용된 거버넌스 변경 사항을 쿼리할 블록 번호입니다. |

**리턴 값**

| 유형   | 설명                 |
| ---- | ------------------ |
| JSON | 특정 블록에 저장된 거버넌스 정보 |

**예시**

```javascript
> governance.itemCacheFromDb(0)
{
  governance.governancemode: "single",
  governance.governingnode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
  governance.unitprice: 25000000000,
  istanbul.committeesize: 1,
  istanbul.epoch: 30,
  istanbul.policy: 2,
  reward.deferredtxfee: true,
  reward.minimumstake: "5000000",
  reward.mintingamount: "6400000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.ratio: "50/40/10",
  reward.stakingupdateinterval: 20,
  reward.useginicoeff: false
}
```

## governance_getStakingInfo <a id="governance_getstakinginfo"></a>

`getStakingInfo`는 특정 블록의 스테이크 정보를 반환합니다. 결과에는 다음과 같은 정보가 포함됩니다.

- `BlockNum`: 스테이킹 정보가 주어진 블록 번호입니다.
- `CouncilNodeAddrs`: 컨센서스 노드의 주소입니다.
- `CouncilRewardAddrs`: 연결된 노드의 블록 보상이 전송되는 주소입니다.
- `CouncilStakingAddrs`: 관련 노드가 스테이킹를 위해 배포하는 컨트랙트 주소입니다.
- `CouncilStakingAmounts`: 관련 노드가 스테이킹하는 KLAY의 양입니다.
- `Gini`: Gini 계수.
- `KIRAddr`: KIR의 컨트랙트 주소.
- `PoCAddr`: KGF의 컨트랙트 주소. PoC는 KGF의 이전 이름입니다.
- `UseGini`: Gini 계수 사용 여부에 대한 부울 값입니다.

모든 주소와 스테이킹 금액의 순서가 일치한다는 점에 유의하세요.

**매개변수**

| 유형              | 설명                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 블록 번호의 정수, 또는 [기본 블록 매개변수](./klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

**리턴 값**

| 유형   | 설명      |
| ---- | ------- |
| JSON | 스테이킹 정보 |

**예시**

```javascript
> governance.getStakingInfo("latest")
{
  BlockNum: 57801600,
  CouncilNodeAddrs: ["0x99fb17d324fa0e07f23b49d09028ac0919414db6", "0x571e53df607be97431a5bbefca1dffe5aef56f4d", "0xb74ff9dea397fe9e231df545eb53fe2adf776cb2", "0x5cb1a7dccbd0dc446e3640898ede8820368554c8", "0x776817c0ef3d06d794cf01ae9afa33d7397b9b40", "0xc180ca565b34b5b63877674f5fe647e7da079022", "0x03497f51c31fe8b402df0bde90fd5a85f87aa943"],
  CouncilRewardAddrs: ["0xb2bd3178affccd9f9f5189457f1cad7d17a01c9d", "0x6559a7b6248b342bc11fbcdf9343212bbc347edc", "0x82829a60c6eac4e3e9d6ed00891c69e88537fd4d", "0xa86fd667c6a340c53cc5d796ba84dbe1f29cb2f7", "0x6e22cbe2b8bbd1df9f1d3c8ebae6d7ff5414a734", "0x24e593fb29731e54905025c230727dc28d229f77", "0x2b2a7a1d29a203f60e0a964fc64231265a49cd97"],
  CouncilStakingAddrs: ["0x12fa1ab4c3e17c1c08c1b5a945c864c8e8bf707e", "0xfd56604f1a20268ff7a0eab2ab48e25ee1e0f653", "0x1e0f6aaa9baa6081dc4910a854eebf8854c262ab", "0x5e6988415ebe0f6b088f5a676003ba60f572875a", "0xbb44998c2af35b8faee694cffe216558056d747e", "0x68cba498b7175cde9de08fc2e85ad3e9c8caefa8", "0x98efb31eeccafe35d53a6926e2a54c0858d9eebc"],
  CouncilStakingAmounts: [5000000, 5000000, 5000000, 5000000, 5000000, 5000000, 5000000],
  Gini: 0,
  KIRAddr: "0x716f89d9bc333286c79db4ebb05516897c8d208a",
  PoCAddr: "0x2bcf9d3e4a846015e7e3152a614c684de16f37c6",
  UseGini: true
}
```

## governance_getRewardsAccumulated<a id="governance_getRewardsAccumulated"></a>

주어진 블록 범위 `[first, last]` 내에서 누적된 리워드 정보를 반환합니다.

:::note

참고: 리소스 고갈로부터 엔드포인트를 보호하려면 차단 범위가 604800(약 7일) 미만이어야 합니다.

:::

**매개변수**

| 유형              | 설명                                                                                                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY \| TAG | 누적 시작(첫 번째) 블록 번호(포함). 블록 번호의 정수 또는 [기본 블록 매개변수](./klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |
| QUANTITY \| TAG | 누적 종료(마지막) 블록 번호, 포함. 블록 번호의 정수 또는 [기본 블록 매개변수](./klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다.                     |

**리턴 값**

| 유형   | 설명     |
| ---- | ------ |
| JSON | 리워드 정보 |

**예시**

```javascript
> governance.getRewardsAccumulated(123400489,123416489)
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "firstBlockTime": "2023-05-29 15:11:27 +0900 KST",
        "lastBlockTime": "2023-05-29 19:38:11 +0900 KST",
        "firstBlock": 123400489,
        "lastBlock": 123416489,
        "totalMinted": 102406400000000000000000,
        "totalTxFee": 1012877568458206944160,
        "totalBurntTxFee": 1012877568458206944160,
        "totalProposerRewards": 10240640000000000224014,
        "totalStakingRewards": 40962559999999999775986,
        "totalKFFRewards": 20481280000000000000000,
        "totalKCFRewards": 30721920000000000000000,
        "rewards": {
            "0x04185389ec237dba242888a5a28b5555d011a223": 341760000000000007476,
            "0x064ce4c3e8409a544ce91245f9f8cfc33bde8925": 341158409421920578070,
            "0x0bb09aab5276ae532e33caf69d00a624adbc3fdf": 4692517369325951639990,
            "0x0c41cce8ddaea235f97745a13207421dca7340fa": 341158442792400102695,
            "0x179679457f93094a4e7186abcb2089661e92fc22": 4670094563747132209866,
            "0x186de0382923086f73367bab16af09aeda4e54bf": 3344700808386003997995,
            "0x1a147924d0489fccf53471904dc271b9d20157a4": 812253494122089774069,
            "0x24e593fb29731e54905025c230727dc28d229f77": 341120033370479516086,
            "0x2b2a7a1d29a203f60e0a964fc64231265a49cd97": 405647783029499903389,
            "0x2fd3ff6e4ead7430ea25bab5e5b2b073492b7e6e": 4179365177477290146362,
            "0x4b87df856044f2580ca62f44f6e15121d7ebcc91": 943429290876805235278,
            "0x5459c9591c3c3f260eff1a538d84610015332c91": 399791330615756805978,
            "0x54e8bc489cee5ab638920cc80160d8095df846b1": 1342241347422787927227,
            "0x5ed9914689a2fafb55a0c99a1c10d2f911d37734": 1150518010638720583027,
            "0x5f1dbd747996d8d31e2ab0317be7ffffd155522a": 507972397569861326690,
            "0x75239993ac422a4e6a7441d5ab47ed6e91faf306": 9708690430353790307357,
            "0x758476368db33864b704f41cc63b8460f8e7d39a": 719558444429276229872,
            "0x85d82d811743b4b8f3c48f3e48a1664d1ffc2c10": 20481280000000000000000,
            "0x999999999939ba65abb254339eec0b2a0dac80e9": 2546664690927360639974,
            "0xac7f6f8a63733877a78917dc798ed7693095be7b": 976294207626140822860,
            "0xadb287e1f8405f085c740e791a3914f9b07acae0": 4834561973146129955927,
            "0xb89a760eb082dbae4f334a9374fa32e7b077e00d": 341120033370479516086,
            "0xbb121974208b9282e72cb0da7f48d8ae14dba954": 477271623157965876433,
            "0xc8e7053dc17bce47d2317718734ef087be40a023": 533654318603814390326,
            "0xcd7cd61f0b221a61405640b8ba10f1455cce6d51": 1153716971545888984956,
            "0xda5609a74470689a3b51cb53ee3c499b0f54f31a": 401005661421389210969,
            "0xdbd3fbdc9e1965855b773a4746f27165b787fe3c": 1153644257271028044532,
            "0xdc7dda990c08513962d5ae6dfb195b1f6879bfaf": 1954666498718499702479,
            "0xdd4c8d805fc110369d3b148a6692f283ffbdccd3": 30721920000000000000000,
            "0xdedbab7de9551a2bee78792638af67d59b8675c6": 1285976941809533886160,
            "0xe3d49ffc285c668425b2966b683776f632859efa": 714216865143954209314,
            "0xf786c3720a10cb48c8f12d0ac2086dcf227c7cde": 588428623678048468557
        }
    }
}
```
