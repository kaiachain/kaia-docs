# 수수료 위임 기능을 지갑에 통합하는 방법

카이아의 [네이티브 수수료 위임](/build/transactions/fee-delegation) 기능 덕분에 사용자들은 dApp에서 가스비 없이 거래를 이용할 수 있습니다. 이를 활성화하려면 **지갑**이 수수료 위임 거래 유형을 지원하고 **발신자 서명**을 수행해야 합니다.

:::info 이 가이드의 대상

이 가이드는 **지갑 제공업체**를 위한 것입니다. 이 지갑은 발신자 측 기능만 구현하고 있습니다:

- 사용자의 키로 수수료 위임 거래에 서명하기
- `senderTxHashRLP`를 dApp에 반환합니다.

수수료 납부자의 서명 및 방송은 지갑의 책임이 **아닙니다**. 이러한 작업은 dApp 백엔드나 [Kaia 수수료 위임 서비스](/build/tutorials/integrate-fee-delegation-service)와 같은 관리형 서비스에서 처리합니다.

:::

## 종단 간 흐름 (역할)

수수료 위임에는 항상 동일한 주체들이 관여합니다. 아래 다이어그램은 전체 경로를 보여줍니다. 이후 섹션에서는 이 경로를 재사용하며, 설명 대상인 행위자를 강조 표시합니다.

<FeeDelegationFlow></FeeDelegationFlow>

| 단계 | 누구                             | 책임                                                                                          |
| -- | ------------------------------ | ------------------------------------------------------------------------------------------- |
| 1  | **지갑 (당신)** | 수수료 위임 거래에 서명하고 `senderTxHashRLP`를 반환합니다. **절대** 방송하지 마십시오. |
| 2  | **dApp**                       | `senderTxHashRLP`를 수수료 납부자에게 전달하십시오.                                        |
| 3  | **수수료 납부자**                    | 다시 서명한 후, 서명이 모두 완료된 거래 내역을 카이아에 제출하십시오.                                    |

이 페이지에서는 **1단계**에 대해 자세히 설명합니다. 2~3단계는 마지막 부분에 요약되어 있으며, 전체 가이드로 연결되는 링크도 함께 제공됩니다.

## 지갑이 구현해야 할 사항

이것은 흐름의 **1단계**로, 지갑이 반드시 구현해야 하는 유일한 부분입니다.

<FeeDelegationFlow highlight="wallet"></FeeDelegationFlow>

수수료 위임을 지원하려면 지갑 내에서 다음을 구현하십시오:

1. 지갑 코드베이스에 [Kaia SDK](https://github.com/kaiachain/kaia-sdk)(예: `@kaiachain/ethers-ext`)를 추가합니다.
2. 지갑이 수수료 위임 거래 요청(일반적으로 `kaia_signTransaction`을 통해)을 수신하면, Kaia SDK를 사용하여 사용자의 키로 해당 거래에 서명합니다.
3. `senderTxHashRLP`를 dApp에 반환합니다. 지갑에서 Kaia 노드로 트랜잭션을 **절대** 전송하지 마십시오.

:::tip 지갑 제공업체를 위한 체크리스트

- 수수료 위임 거래 유형(가치 이체, 계약 체결 및 기타 필요한 유형) 지원
- 지갑에서 관리하는 **발신자(사용자)** 키로 서명하세요
- `senderTxHashRLP`를 dApp에 반환합니다.
- 발신자만 서명한 트랜잭션은 **전송하지 마십시오**

:::

### 예시: 수수료 위임 방식의 가치 이체 서명

이 패턴을 지갑의 서명 경로(예를 들어, `kaia_signTransaction` 핸들러 내부)에서 사용하십시오. 실제 운영 환경에서는 하드코딩된 개인 키가 아닌, 지갑에서 관리하는 사용자의 키를 사용하고, 호출자에게 `senderTxHashRLP`를 반환해야 합니다.

```javascript
const ethers = require("ethers6");
const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const receiverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";
const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

async function main() {
  const tx = {
    type: TxType.FeeDelegatedValueTransfer,
    from: senderAddr,
    to: receiverAddr,
    value: parseKaia("0.01"),
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

### 예시: 수수료 위임 계약 상호작용 체결

```javascript
const ethers = require("ethers6");
const { Wallet, TxType } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";
const abi = ["function setNumber(uint256 newNumber)"];

async function main() {
  const contract = new ethers.Contract(contractAddr, abi, provider);
  const data = contract.interface.encodeFunctionData("setNumber", ["0x123"]);

  const tx = {
    type: TxType.FeeDelegatedSmartContractExecution,
    from: senderAddr,
    to: contractAddr,
    value: 0,
    data: data,
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

:::note

구체적인 배선 방식은 지갑의 아키텍처에 따라 달라집니다. 중요한 계약 사항은 다음과 같습니다. **위임된 유형을 발신자로 서명하고, `senderTxHashRLP`를 반환하며, 브로드캐스트하지 마십시오.**

:::

## 지갑 외부: 수수료 납부자의 서명

지갑이 `senderTxHashRLP`를 반환하면, dApp이 이를 전달하고(**2단계**), 수수료 지불자가 서명하여 제출합니다(**3단계**). 아래에 강조 표시된 부분이 수수료 납부자입니다. 이는 **지갑 코드가 아닙니다**.

<FeeDelegationFlow highlight="feepayer"></FeeDelegationFlow>

```javascript
// Fee payer / backend only — not wallet code
const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
console.log("sentTx", sentTx);

const rc = await sentTx.wait();
console.log("receipt", rc);
```

수수료 지불자가 `senderTxHashRLP`를 수신하고 트랜잭션을 제출하는 과정을 확인하려면(간단한 클라이언트/서버 데모이며, 지갑 통합 기능은 아님), [수수료 위임 예제 만들기](/build/tutorials/fee-delegation-example)를 참조하십시오. 관리형 수수료 납부자의 경우, [Kaia 수수료 위임 서비스 통합](/build/tutorials/integrate-fee-delegation-service)을 참조하십시오.

## 다음 단계

| 목표                                                                          | 안내                                                                                                    |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 수수료 위임 거래 유형 이해하기                                                           | [수수료 위임](/build/transactions/fee-delegation), [부분 수수료 위임](/build/transactions/partial-fee-delegation) |
| 클라이언트/서버 수수료 납부자 데모(지갑 코드가 아님)를 확인해 보세요. | [빌드 수수료 위임 예시](/build/tutorials/fee-delegation-example)                                               |
| dApp에 카이아(Kaia)의 관리형 수수료 납부 기능을 활용하세요                    | [Kaia 수수료 위임 서비스 통합](/build/tutorials/integrate-fee-delegation-service)                               |
| 수수료 위임 거래에 대한 SDK 참조 자료                                                     | [이더스-익스텐드 수수료 위임형 가치 전송](/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer)      |
