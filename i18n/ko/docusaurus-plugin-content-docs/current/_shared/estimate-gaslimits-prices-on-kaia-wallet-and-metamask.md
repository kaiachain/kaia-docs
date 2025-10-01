# Kaia 월렛 및 메타마스크에서 가스 한도 및 가격을 추정하는 방법

이 가이드는 Kaia에서 가스 요금/가격을 추정하는 방법을 단계별로 안내합니다.

## 가스란 무엇인가요?

가스는 Kaia 체인에서 결제(가치 전송) 또는 호출(스마트 컨트랙트 호출) 트랜잭션을 처리하는 데 필요한 계산 노력의 양을 나타내는 측정 단위입니다. 이 맥락에서는 Kaia 가상 머신(KVM)에서 수행되는 연산을 의미합니다.

Kaia 네트워크는 트랜잭션을 실행하기 위해 가스가 필요합니다. 토큰을 전송하거나, 컨트랙트와 상호작용하거나, KAIA를 전송하거나, 블록체인에서 다른 작업을 수행할 때는 해당 연산에 대한 비용을 지불해야 합니다. 해당 결제는 가스로 계산되며 가스는 항상 KAIA로 결제됩니다.

## 가스 한도란 무엇인가요?

가스 한도는 거래에 사용할 수 있는 최대 가스 양을 의미합니다. 특히 스마트 컨트랙트를 실행하는 복잡한 거래는 단순 결제보다 더 많은 계산 리소스와 더 높은 가스 한도를 필요로 합니다. 표준 KAIA 전송에는 일반적으로 약 21,000개의 가스가 사용됩니다.

가스 한도를 너무 높게 설정하면(예: 간편 송금의 경우 50,000) 거래에서 필요한 만큼만(약 21,000) 사용하고 나머지는 반환합니다. 그러나 20,000과 같이 너무 낮게 설정하면 거래가 즉시 실패하고 가스를 소비하지 않습니다. 스마트 컨트랙트가 호출되는 등 트랜잭션 실행 중에 가스가 부족해지면 모든 효과가 되돌릴 수 있지만, 사용한 가스에 대해서는 여전히 비용을 지불해야 합니다.

## 전체 가스 요금 구조

Kaia 하드포크 이후 트랜잭션 생성자가 지불하는 전체 수수료는 다음과 같이 계산됩니다:

(**가스 가격** x **사용한 가스 단위**).

여기서 **가스 가격** = **기본 요금** + **우선 요금**

### 기본 수수료란 무엇인가요?

기본 수수료는 네트워크에서 거래를 처리하기 위해 지불해야 하는 가스 단위당 최소 가격입니다. 이는 네트워크 자체에서 설정하며, 이전 블록이 가스 목표(네트워크가 각 블록에서 처리하고자 하는 트랜잭션의 양)를 초과했는지 또는 미달했는지에 따라 각 블록이 끝난 후 위 또는 아래로 조정됩니다.

블록이 사용량이 많아 목표치를 초과하여 사용하면 기본 요금이 증가(5%)하여 혼잡을 완화하고, 사용량이 줄어들면 기본 요금이 감소합니다.  이 메커니즘은 블록 크기를 안정적으로 유지하고 모든 사람이 수수료를 더 예측 가능하게 만드는 데 도움이 됩니다. 기본 수수료는 거래가 처리되면 소각되어 유통에서 제거됩니다.

### 우선 순위 수수료란 무엇인가요?

팁이라고도 하는 우선순위 수수료는 거래의 우선순위를 정하기 위해 기본 수수료 외에 자발적으로 지불하는 추가 금액입니다. Kaia에서는 이 팁이 검증인에게 직접 전달되지 않고 네트워크의 보상 풀에 기여하며, 나중에 검증인과 에코시스템 펀드에 분배됩니다. 더 높은 팁을 제공한다는 것은 트랜잭션이 더 빨리 처리되고 같은 블록의 다른 트랜잭션보다 먼저 처리될 수 있도록 더 많은 비용을 지불할 의향이 있다는 신호입니다.

## 가스 요금 추정

거래에서 일반적으로 소비되는 가스 양을 명확하게 파악하려면 다음과 같은 방법을 사용하는 것이 좋습니다:

### ethers.js에서 eth_estimateGas API 사용

트랜잭션이 얼마나 많은 가스를 소비할지 추측하는 대신, 노드 자체의 실행 컨텍스트를 활용하여 트랜잭션을 체인에 전파하기 전에 얼마나 많은 계산 노력이 필요할 것으로 예상되는지 정확히 알 수 있습니다.

이는 프로그래밍 방식으로 가스 비용을 제어하고 **가스 부족** 오류로 인한 장애를 방지해야 하는 개발자와 총 요금을 미리 알고 지갑에 갑작스러운 요금이 청구되는 것을 방지하려는 일반 사용자에게 유용합니다.

이는 ethers.js를 통해 노출되는 **eth_estimateGas** API를 통해 이루어집니다.

**예시 - 민트 함수에 대한 가스 추정**

스마트 컨트랙트의 민트 기능에 필요한 가스를 추정하고 싶다고 가정해 보겠습니다. 다음은 이를 위한 명확하고 완전한 스크립트입니다:

```js
const { ethers } = require('ethers');
require('dotenv').config();

const GOLD_CONTRACT_ADDRESS = '0xE13d6C18c52c1de9267aE6DF647fD4ADfAf82977';
const AMOUNT_TO_SEND = ethers.parseUnits('20', 18); // 20 tokens

// minimal ABI for the `mint` function
const MINT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Main script
async function estimateMintGas() {

 try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.ES_PRIVATE_KEY, provider);
    
    // prepare encoded transaction
    const iface = new ethers.Interface(MINT_ABI);
    const encodedData = iface.encodeFunctionData('mint', [wallet.address, AMOUNT_TO_SEND]);
    
    // estimate Gas
    const estimatedGas = await provider.estimateGas({ 
      to: GOLD_CONTRACT_ADDRESS, 
      from: wallet.address, 
      data: encodedData 
    });

    // gasPrice
    const gasPrice = await provider.getFeeData();

    console.log("Estimated Gas for mint:", estimatedGas.toString());
    console.log("Estimated GasPrice for mint:", gasPrice.gasPrice.toString());

    return estimatedGas;
    
  } catch (error) {
    console.error('Gas estimation failed!', error.reason || error.message);
    throw error;
  }
}

estimateMintGas().catch((err) => console.error('Error estimating gas!', err)); 
```

이 스크립트를 실행하면 다음과 같은 출력이 생성됩니다:

```bash
Estimated Gas for mint : 69002
Estimated GasPrice for mint: 27500000000
```

ethers.js는 스마트 컨트랙트의 ABI와 파라미터에서 트랜잭션의 호출 데이터를 구성하고, 이를 eth_estimateGas로 노드에 전송하여 드라이런을 수행하며, 노드는 이를 블록에 추가하지 않고 실행하여 정확히 얼마나 많은 가스를 소비할지 결정합니다.

위의 내용을 통해 가스 요금을 쉽게 추정할 수 있습니다:

_사용 가스_ x _가스 가격_

_69002 x 0.0000000275
\= 0.001897555 KAIA_

### 메타마스크 사용(KAIA 전송)

![](/img/build/wallets/estimate-gas-mm.png)
이미지에서 볼 수 있듯이:

- 가스 사용량 21,000
- 기본 요금: 25 Gwei(또는 0.000000025 KAIA)
- 우선권 수수료: 2.5 Gwei(또는 0.0000000025 KAIA)

총 가스 요금을 계산하려면 사용한 가스에 기본 요금과 우선 순위 요금을 합한 금액을 곱하면 됩니다.

_21,000 \* (0.000000025 + 0.0000000025)
0.0005775 kaia._

이렇게 하면 합계가 **0.0005775 KAIA**로 표시되어 위의 거래 세부 정보 이미지에 표시된 메타마스크의 내용과 정확히 일치합니다.

### KaiaScan 사용(스마트 컨트랙트 실행 - 세이프민트 기능)

![](/img/build/wallets/estimate-gas-kaiascan.png)

이미지에서 볼 수 있듯이

- 가스 사용량: 184,250
- 유효 가스 가격(기본 요금 + 우선 순위 요금) = 0.0000000275
  - 기본 요금: 25 Gkei(또는 0.000000025 KAIA)
  - 우선권 수수료: 2.5 Gkei(또는 0.0000000025 KAIA)

총 가스 요금을 계산하려면 사용한 가스에 기본 요금과 우선 순위 요금을 합산한 금액을 곱하면 됩니다:

_184,250 \* (0.000000025 + 0.0000000025)
0.005066875 KAIA_

이렇게 하면 위의 거래 세부 정보 이미지에 표시된 KaiaScan의 내용과 정확히 일치하는 0.005066875 KAIA를 확인할 수 있습니다.

### 이전 블록의 기본 수수료 사용

이전 블록의 기본 수수료를 사용하여 계산하려면 이 방법을 따르세요:

다음 기본 수수료를 찾으려면 블록이 가득 차거나 가스 목표치를 초과하는 경우 이전 기본 수수료에 1.05를 곱하면 됩니다. 즉, 블록의 가스 사용량이 네트워크의 목표치를 초과하면 기본 요금이 5% 증가하여 혼잡을 완화하고 수요를 억제하는 데 도움이 됩니다. 블록의 활용도가 낮은 경우, 기본 수수료는 동일하게 유지되거나 후속 블록에서 감소할 수 있습니다.

| 블록 | 가스 포함      | 이전 기본 요금                    | 다음 기본 요금                                                                    |
| -- | ---------- | --------------------------- | --------------------------------------------------------------------------- |
| 1  | 15,000,000 | 100 gkei                    | 100 gkei                                                                    |
| 2  | 30,000,000 | 100 gkei                    | 100 gkei                                                                    |
| 3  | 30,000,000 | 100 gkei                    | 100 gkei x 1.05 = 105 gkei                                  |
| 4  | 30,000,000 | 105 gkei                    | 105 GKEI X 1.05 = 110.25 GKEI               |
| 5  | 30,000,000 | 110.25 gkei | 110.25 x 1.05 = 115.76 gkei |




