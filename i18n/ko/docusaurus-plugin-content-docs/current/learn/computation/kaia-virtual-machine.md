# 카이아 가상 머신(KVLM)

## 개요 <a id="overview"></a>

현재 버전의 Kaia 가상머신 (KLVM)은 이더리움 가상머신 (EVM)에서 파생된 것입니다. 이 장의 내용은 주로 [이더리움 옐로우 페이퍼](https://github.com/ethereum/yellowpaper)를 기반으로 합니다. KLVM은 Kaia 팀에 의해 지속적으로 개선되고 있으므로 이 문서는 자주 업데이트될 수 있습니다. 이 문서를 KLVM 사양의 최종 버전으로 간주하지 마시기 바랍니다. 카이아 포지션 페이퍼에 설명된 것처럼, 카이아 팀은 카이아 플랫폼의 기능과 성능을 강화하기 위해 다른 가상머신이나 실행 환경도 도입할 계획입니다. 이 장에서는 KLVM의 사양과 KLVM과 EVM의 차이점을 소개합니다.

KLVM은 카이아의 실행 모델을 공식적으로 지정하는 가상 상태 머신입니다. 실행 모델은 일련의 바이트코드 명령어와 작은 환경 데이터 튜플이 주어졌을 때 시스템 상태가 어떻게 변경되는지를 지정합니다. KLVM은 준 튜링 완전(quasi-Turing-complete) 기계로, _quasi_(準)라는 자격은 계산이 수행되는 총 계산량을 제한하는 매개변수 _gas_ 를 통해 본질적으로 제한된다는 사실에서 유래합니다.

KLVM은 일련의 KLVM 명령어로 구성된 카이아 가상머신 코드 (또는 카이아 바이트코드)를 실행합니다. KLVM 코드는 카이아 블록체인에서 코드가 포함된 계정에 사용되는 프로그래밍 언어입니다. 계정에 연결된 KLVM 코드는 해당 계정으로 메시지가 전송될 때마다 실행되며, 이 코드는 저장소를 읽고 쓰는 메시지를 전송할 수 있습니다.

## KLVM 사양 <a id="klvm-specification"></a>

### 컨벤션 <a id="conventions"></a>

이 문서에서는 다음과 같은 표기법과 규칙을 사용합니다.

- `A := B`
  - `:=`는 `A`를 `B`로 정의하는 데 사용됩니다.
- 당사는 "스마트 컨트랙트"와 “컨트랙트"라는 용어를 같은 의미로 사용합니다.
- "연산 코드/연산"으로 "opcode"라는 용어를 사용합니다.

### 심볼 <a id="symbols"></a>

다음 표에는 KLVM 사양에서 사용되는 기호가 요약되어 있습니다.

#### 블록체인 관련 기호 <a id="blockchain-related-symbols"></a>

| 기호         | 설명           |
| :--------- | :----------- |
| `BC`       | Blockchain   |
| `B`        | 블록           |
| `B_header` | 현재 블록의 블록 헤더 |

#### 상태 관련 기호 <a id="state-related-symbols"></a>

| 기호               | 설명              |
| :--------------- | :-------------- |
| `S`              | 상태              |
| `S_system`       | 시스템 상태          |
| `S_machine`      | 머신 상태           |
| `P_modify_state` | 상태를 수정할 수 있는 권한 |

#### 트랜잭션 관련 기호 <a id="transaction-related-symbols"></a>

| 기호        | 설명                                                                                                 |
| :-------- | :------------------------------------------------------------------------------------------------- |
| `T`       | 트랜잭션                                                                                               |
| `T_code`  | 실행할 머신 코드가 포함된 바이트 배열                                                                              |
| `T_data`  | 실행에 대한 입력 데이터를 포함하는 바이트 배열(실행 에이전트가 트랜잭션인 경우 트랜잭션 데이터가 됩니다).    |
| `T_value` | 실행 절차의 일부로 계정에 전달되는 값(peb 단위)으로, 실행 에이전트가 트랜잭션인 경우 트랜잭션 값이 됩니다. |
| `T_depth` | 현재 메시지 호출 또는 컨트랙트 생성 스택의 깊이 (_즉_, 현재 실행 중인 `CALL` 또는 `CREATE`의 개수)              |

#### 가스 관련 기호 <a id="gas-related-symbols"></a>

| 기호        | 설명                  |
| :-------- | :------------------ |
| `G`       | 가스                  |
| `G_rem`   | 계산을 위한 잔여 가스        |
| `G_price` | 실행을 시작한 트랜잭션의 가스 가격 |

#### 주소 관련 기호 <a id="address-related-symbols"></a>

| 기호                | 설명                                                                                        |
| :---------------- | :---------------------------------------------------------------------------------------- |
| `A`               | 주소                                                                                        |
| `A_code_owner`    | 실행 코드를 소유한 계정의 주소                                                                         |
| `A_tx_sender`     | 현재 실행을 시작한 트랜잭션의 발신자 주소                                                                   |
| `A_code_executor` | 코드 실행을 시작한 계정의 주소(실행 에이전트가 트랜잭션인 경우 트랜잭션 발신자 주소가 됩니다). |

#### 함수 <a id="functions"></a>

|     기호    | 설명                                                               |
| :-------: | :--------------------------------------------------------------- |
| `F_apply` | 입력이 있는 트랜잭션을 주어진 상태에 적용하고 결과 상태와 출력을 반환하는 함수입니다. |

### 기본 사항 <a id="basics"></a>

KLVM은 단순한 스택 기반 아키텍처입니다. 머신의 워드 크기(따라서 스택 항목의 크기)는 256비트입니다. 이는 Keccak-256 해시 체계와 타원 곡선 계산을 용이하게 하기 위해 선택된 것입니다. 메모리 모델은 단순한 워드 주소 바이트 배열입니다. 스택의 최대 크기는 1024입니다. 또한 독립적인 스토리지 모델도 있는데, 이는 개념상 메모리와 유사하지만 바이트 배열이 아닌 워드 주소 지정이 가능한 워드 배열입니다. 휘발성인 메모리와 달리 스토리지는 비휘발성이며 시스템 상태의 일부로 유지됩니다. 스토리지와 메모리의 모든 위치는 처음에 0으로 잘 정의되어 있습니다.

이 머신은 표준 폰 노이만 아키텍처를 따르지 않습니다. 일반적으로 액세스할 수 있는 메모리나 저장소에 프로그램 코드를 저장하는 대신 가상 읽기 전용 메모리에 코드를 별도로 저장하고 특수 명령어를 통해서만 상호 작용할 수 있습니다.

머신은 스택 언더플로, 잘못된 명령어 등 여러 가지 이유로 예외 코드를 실행할 수 있습니다. 가스 부족 예외와 마찬가지로 이러한 예외는 상태 변경을 그대로 유지하지 않습니다. 그 대신 가상 머신은 즉시 중단되고 실행 에이전트(트랜잭션 프로세서 또는 재귀적으로 스폰 실행 환경)에 문제를 보고하며, 이 에이전트는 별도로 처리합니다.

### 실행 환경 <a id="execution-environment"></a>

실행 환경은 시스템 상태 `S_system`, 계산을 위한 잔여 가스 `G_rem`, 실행 에이전트가 제공하는 정보 `I`로 구성됩니다. `I`는 아래와 같이 정의된 튜플입니다:

`I := (B_header, T_code, T_depth, T_value, T_data, A_tx_sender, A_code_executor, A_code_owner, G_price, P_modify_state)`입니다.

실행 모델은 이러한 정의가 주어졌을 때 결과 상태 `S_system`, 잔여 기체 `G_rem`, 발생 물질 `A`와 결과 출력 `O_result`를 계산할 수 있는 함수 `F_apply`를 정의합니다. 여기서는 다음과 같이 정의하겠습니다:

`(S_system', G_rem', A, O_result) = F_apply(S_system, G_rem, I)`

여기서 발생된 대상인 `A`는 자살 집합 `Set_suicide`, 로그 계열 `L`, 터치된 계정 `Set_touched_accounts`, 환불 `G_refund`의 튜플로 정의된다는 점을 기억해야 합니다:

`A := (Set_suicide, L, Set_touched_accounts, G_refund)`

### 실행 개요 <a id="execution-overview"></a>

대부분의 실제 구현에서 `F_apply`는 전체 시스템 상태 `S_system`과 머신 상태 `S_machine`으로 구성된 쌍의 반복적 진행으로 모델링됩니다. 공식적으로는 현재 상태가 예외적으로 정지된 머신 상태인지 여부를 결정하는 함수 `Z`와 현재 상태가 정상적인 정지된 머신 상태인 경우에만 명령어의 출력 데이터를 지정하는 함수 `H`와 함께 이터레이터 함수 `O`(상태 머신의 단일 사이클 결과를 정의)를 사용하는 함수 `X`를 사용하여 재귀적으로 정의합니다.

이는 실행을 계속해야 할 때는 `Set_empty`로 평가되지만 실행을 중단해야 할 때는 (잠재적으로 비어 있는) 시퀀스로 평가되는 `H`의 출력을 해석할 때 중요한 부분입니다.

`F_apply(S_machine, G_rem, I, T) := (S_system', S_machine,g', A, o)`

- `(S_system', S_machine,g', A, ..., o) := X((S_system, S_machine, A^0, I))`
- `S_machine,g := G_rem`
- `S_machine,pc := 0`
- `S_machine,memory := (0, 0, ...)`
- `S_machine,i := 0`
- `S_machine,stack := ()`
- `S_machine,o := ()`
- `X((S_system, S_machine, A, I)) :=`
  - `(Set_empty, S_machine, A^0, I, Set_empty)` if `Z(S_system, S_machine, I)`
  - `(Set_empty, S_machine', A^0, I, o)` if `w = REVERT`
  - `O(S_system, S_machine, A, I) · o` if `o != Set_empty`
  - `X(O(S_system, S_machine, A, I))` otherwise

where

- `o := H(S_machine, I)`
- `(a, b, c, d) · e := (a, b, c, d, e)`
- `S_machine' := S_machine` except

  `S_machine,g' := S_machine,g - C(S_system, S_machine, I)`

  - 이는 `F_apply`를 평가할 때

    남은 가스 `S_machine,g'`를

    결과 머신 상태 `S_machine'`로부터 추출한다는 것을 의미합니다.

따라서 `X`는 `Z`가 true이 되어 현재 상태가 예외적이며 머신을 중지하고 모든 변경 사항을 폐기해야 함을 나타내거나, `H`가 (빈 집합이 아닌) 계열이 되어 머신이 제어된 정지에 도달했음을 나타낼 때까지 (여기서는 재귀적으로) 순환합니다(일반적으로 구현은 단순한 반복 루프를 사용해야 합니다).

#### 머신 상태 <a id="machine-state"></a>

머신 상태 `S_machine`은 사용 가능한 가스, 프로그램 카운터 `pc` (64비트 부호 없는 정수), 메모리 내용, 메모리 내 활성 단어 수 (위치 0부터 연속적으로 계산), 스택 내용을 나타내는 튜플 `(g, pc, memory, i, stack)`으로 정의됩니다. 메모리 내용물 `S_machine,memory`는 크기 2^256의 일련의 0입니다.

읽기 쉽도록 소문자로 표기된 명령어 니모닉 (예: `ADD`)은 숫자에 해당하는 것으로 해석해야 하며, 전체 명령어 표와 자세한 내용은 [명령어 세트](klaytn-virtual-machine#instruction-set) 섹션에서 확인할 수 있습니다.

`Z`, `H`, `O`를 정의하기 위해 `w`를 현재 실행할 연산으로 정의합니다:

- `w := T_code[S_machine,pc]` if `S_machine,pc < len(T_code)`
- `w :=STOP` otherwise

### 인스트럭션 세트 <a id="instruction-set"></a>

참고: 이 섹션은 향후에 채워질 예정입니다.

## KLVM과 EVM의 차이점 <a id="how-klvm-differs-from-evm"></a>

앞서 언급했듯이 현재 KLVM은 EVM을 기반으로 하고 있으므로 현재 사양은 EVM과 매우 유사합니다. KLVM과 EVM의 몇 가지 차이점은 다음과 같습니다.

- KLVM은 peb, ston, KAIA와 같은 Klaytn의 가스 단위를 사용합니다.
- KLVM은 사용자로부터 가스 가격을 받지 않고, 대신 플랫폼에서 정의한 값을 가스 가격으로 사용합니다.

카이아 팀은 KLVM과 EVM 간의 호환성을 유지하기 위해 노력할 것이지만, 카이아가 점점 더 구현되고 발전함에 따라 KLVM 사양이 업데이트될 것이며, 아마도 EVM과 비교하여 더 많은 차이점이 있을 것입니다.

참고: 이 섹션은 향후 업데이트될 예정입니다.
