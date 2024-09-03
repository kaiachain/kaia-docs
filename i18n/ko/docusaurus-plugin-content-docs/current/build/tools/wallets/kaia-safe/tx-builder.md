# Transaction Builder 사용

트랜잭션 일괄 처리를 담당하는 Kaia Safe의 커스텀 앱입니다. 즉, 트랜잭션을 하나씩 확인할 필요 없이 여러 트랜잭션을 함께 묶을 수 있습니다. 한 번만 확인하고 실행하면 됩니다.

Transaction Builder를 사용하면 토큰 전송부터 복잡한 컨트랙트 트랜잭션까지 트랜잭션을 구성하고 단일 트랜잭션으로 일괄 처리할 수 있습니다.

## KLAY Token Transfer <a id="token-transfer"></a>

You can perform token transfer using transaction builder by following the steps below:

**Step 1:** Navigate to Safe Apps and open Transaction Builder Safe App

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

**Step 2:** Enter the recipient wallet address. For this guide, kindly skip the ABI field as we are trying to execute KLAY transfer transaction.

![](/img/build/tools/kaia-safe/tx-builder-token-recipient-addr.png)

**Step 3:** Enter the KLAY value you want to send.

> Note: In this guide, we are sending 1 KLAY, so we entered 1 in the **KLAY value** input field. You can input any amount here, depending on your Safe's KLAY balance.

![](/img/build/tools/kaia-safe/tx-builder-token-trf-value.png)

**Step 4:** Click Add transaction.

**Step 5:** Repeat steps 2, 3, and 4 for every recipient address.

**Step 6:** Once you added all operations to the batch click Create Batch.

![](/img/build/tools/kaia-safe/token-trf-tx-builder.gif)

**Step 7:** Review and submit transaction

전체 배치를 검토할 수 있습니다. Once ready, click Send Batch to submit and execute the transaction just like any other Safe transaction.

## Contract Interactions <a id="contract-interactions"></a>

Let's say you want to airdrop tokens to a long list of addresses, say 10 CCT tokens to 5 addresses. Transaction Builder는 금고 소유자가 일일이 확인하고 실행해야 하는 10개의 트랜잭션을 생성하는 대신, 이 모든 이체를 하나의 트랜잭션에 넣습니다.

이 가이드에서는 설명의 편의를 위해 세이프 주소로 DRIP 토큰을 발행했습니다.

Transaction Builder를 사용하여 이 예제를 시작해 보겠습니다!

**1단계**: Safe Apps을 엽니다.

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

**2단계**: Transaction Builder Safe 앱 열기

![](/img/build/tools/kaia-safe/ks-use-tx-builder.png)

**3단계**: 토큰 컨트랙트 주소와 ABI를 입력합니다.

이 예시에서는 DRIP 컨트랙트 주소와 ABI가 사용됩니다. ABI를 복사하여 "Enter ABI" 필드에 붙여넣을 수 있습니다.

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-init.gif)

**4단계**: 방법을 선택하고 거래 정보를 입력합니다.

드롭다운에서 방법을 선택할 수 있습니다. 이 경우 **transfer** 방법을 선택합니다. 이 단계를 완료하려면 **to(address)** 및 \*\*amount(uint256)\*\*과 같은 거래 정보를 입력해야 합니다.

참고: 값은 소수점이 없는 부호 없는 정수입니다. 이 예시에서 DRIP 토큰은 소수점이 18입니다. So if you want to send 10 CCT, you have to enter 10000000000000000000.

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-details.gif)

**5단계**: **Add transaction**를 클릭합니다.

**6단계**: 모든 수신자 주소에 대해 **4**, **5**, **6** 단계를 반복합니다.

**7단계**: 배치에 모든 작업을 추가한 후 **Create Batch**을 클릭합니다.

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-batch.gif)

**8단계**: 거래 검토 및 제출하기

You'll be able to review the whole batch. 준비가 완료되면 **Send Batch**을 클릭해 다른 세이프 거래와 마찬가지로 거래를 제출하고 실행합니다.
