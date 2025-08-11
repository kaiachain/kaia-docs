import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Kaia 호환 지갑에서 토큰을 보내는 방법

이 문서에서는 Kaia 지갑과 메타마스크와 같은 Kaia 호환 지갑을 사용하여 Kaia(네이티브 토큰) 및 ERC20 토큰을 전송하는 방법을 단계별로 안내합니다. 그러나 이 과정은 사용 중인 네트워크(Kaia 메인넷 또는 Kaia Kairos 테스트넷)에 관계없이 본질적으로 동일하며, 트랜잭션을 결제할 수 있는 네트워크의 기본 토큰을 충분히 보유하고 있는지 확인하기만 하면 됩니다.

준비물

- 받는 사람의 계정 주소
- 가스 요금을 충당할 수 있을 만큼 계정에 네트워크의 네이티브 토큰(KAIA)이 충분히 잔액되어 있어야 합니다.

## KAIA (네이티브 토큰)

### 메타마스크

<Tabs>
  <TabItem value="Browser" label="Browser Extension" default>
	1. 지갑 홈페이지에서 거래하려는 계정과 네트워크가 올바른지 확인한 다음 화면 중앙에 있는 **송금** 버튼을 클릭합니다.
	![](/img/build/wallets/mm-homepage-send.png)
	2. 이제 받는 사람의 공개 주소를 입력해야 합니다. 주소록에 이미 저장된 주소가 있는 경우 해당 주소가 표시됩니다.
	![](/img/build/wallets/mm-insert-address.png)
	3. 전송할 토큰의 양을 입력하고 **계속하기**를 클릭합니다.
	![](/img/build/wallets/mm-insert-amount.png)
	4. 이제 거래 세부 정보가 표시됩니다. 계속하려면 **확인**을 클릭하기 전에 거래 세부 정보를 다시 한 번 확인하시기 바랍니다.
	![](/img/build/wallets/mm-tx-details.png)
	거래가 성공하면 홈페이지로 리디렉션되어 '활동' 탭에서 최근 거래 목록을 확인할 수 있습니다.
  </TabItem>
  <TabItem value="Mobile" label="Mobile">
	1. 지갑 홈페이지의 토큰 탭에서 KAIA 토큰을 선택하면 토큰 세부 정보가 표시되는 페이지에 액세스합니다
	![](/img/build/wallets/mm-m-select-kaia.jpg)
	2. 계속하려면 **보내기** 버튼을 탭합니다
	![](/img/build/wallets/mm-m-send-btn.jpg)
	3. 이제 보낼 주소를 입력해야 합니다. 클립보드(예: 다른 앱)에 있는 주소를 붙여넣거나 주소록에서 주소를 선택한 후 **다음**을 클릭합니다.
	![](/img/build/wallets/mm-m-insert-address.jpg)
	4. 이제 송금 금액을 입력할 수 있는 화면으로 이동하여 **다음**
	![](/img/build/wallets/mm-m-insert-amount.jpg)
	5. 이제 거래 세부 정보가 표시됩니다. 계속하려면 **확인**을 클릭하기 전에 거래 세부 정보를 다시 한 번 확인하시기 바랍니다.
	![](/img/build/wallets/mm-m-tx-details.jpg)  
</TabItem>
</Tabs>

### Kaia 지갑

<Tabs>
  <TabItem value="Browser" label="Browser Extension" default>
	1. 지갑 홈페이지에서 거래하려는 계정과 네트워크가 올바른지 확인한 다음 화면 중앙에 있는 **송금** 버튼을 클릭합니다.
	![](/img/build/wallets/kw-homepage-send.png)
	2. 이제 받는 사람의 공개 주소를 입력해야 합니다. 주소록에 이미 저장된 주소가 있는 경우 해당 주소가 표시됩니다.
	3. 전송할 토큰의 양을 입력하고 **진행**을 클릭합니다.
	![](/img/build/wallets/kw-input-address-amount.png)
	4. 이제 거래 세부 정보가 표시됩니다. 계속하려면 **확인**을 클릭하기 전에 거래 세부 정보를 다시 한 번 확인하시기 바랍니다.
	![](/img/build/wallets/kw-tx-details.png)
	5. 토큰이 성공적으로 전송되었다면 성공 메시지 모달이 표시됩니다. 
	![](/img/build/wallets/kw-token-success-msg.png)
	6. 이제 **거래 내역** 탭에서 최근 거래를 확인할 수 있습니다.
	![](/img/build/wallets/kw-tx-history.png)  
</TabItem>
  <TabItem value="Mobile" label="Mobile">
	1. 지갑 홈페이지에서 거래하려는 계정과 네트워크가 올바른지 확인합니다.
	2. KAIA 잔액과 같은 열에서 **보내기** 버튼을 직접 클릭합니다
	![](/img/build/wallets/kw-m-send-btn.jpg)
	3. 이제 수신자의 공개 주소를 입력하고 **다음**을 클릭해야 합니다.
	![](/img/build/wallets/kw-m-insert-address.jpg)
	4. 보내려는 토큰의 양을 입력하고 **다음**을 클릭합니다.
	![](/img/build/wallets/kw-m-insert-amount.jpg)
	5. 이제 거래 세부 정보가 표시됩니다. 계속하려면 **전송**을 클릭하기 전에 거래 세부 정보를 다시 한 번 확인하세요.
	![](/img/build/wallets/kw-m-tx-details.jpg)
	6. KAIA 잔액 카드를 클릭하면 이제 **거래 내역** 페이지에서 최근 거래 내역을 확인할 수 있습니다.
	![](/img/build/wallets/kw-m-tx-history.jpg)  
</TabItem>
</Tabs>

## ERC20 토큰

### 메타마스크

<Tabs>
  <TabItem value="Browser" label="Browser Extension" default>
	1. 홈페이지의 **토큰** 탭으로 이동하여 보내려는 토큰을 선택하여 토큰 세부 정보가 표시되는 페이지에 액세스합니다.
	![](/img/build/wallets/mm-erc20-homepage.png)
	2. 보내기** 버튼을 클릭합니다
	![](/img/build/wallets/mm-erc20-send-btn.png)
	3. 수취인 주소와 보낼 토큰 수량을 입력하고 **계속**
	![](/img/build/wallets/mm-erc20-input-ao.png)
	4. 확인** 버튼을 클릭하여 트랜잭션을 제출하고 ERC20 토큰을 전송하세요
	![](/img/build/wallets/mm-erc20-tx-details.png)  
</TabItem>
  <TabItem value="Mobile" label="Mobile">
	1. 토큰** 탭을 탭하고 보내려는 ERC20 토큰을 선택하여 토큰 세부 정보가 표시되는 페이지에 액세스합니다
	![](/img/build/wallets/mm-m-erc20-select.jpg)
	2. 계속하려면 **보내기** 버튼을 탭합니다
	![](/img/build/wallets/mm-m-erc20-send-btn.jpg)
	3. 이제 수신자의 공개 주소를 입력하고 **다음**을 클릭해야 합니다.
	![](/img/build/wallets/mm-m-insert-address.jpg)
	4. 전송할 토큰의 양을 입력하고 **다음**을 클릭합니다.
	![](/img/build/wallets/mm-m-erc20-insert-amount.jpg)
	5. 화면 하단의 **전송** 버튼을 탭합니다.
	![](/img/build/wallets/mm-m-erc20-tx-details.jpg)  
</TabItem>
</Tabs>

### Kaia 지갑

<Tabs>
  <TabItem value="Browser" label="Browser Extension" default>
	1. 지갑 홈페이지의 **토큰 목록** 패널로 이동합니다
	![](/img/build/wallets/kw-erc20-token-list.png)
	2. 보내려는 토큰을 선택하여 토큰 세부 정보가 표시된 페이지에 액세스합니다
	3. 보내기** 버튼을 클릭합니다.
	![](/img/build/wallets/kw-erc20-send-btn.png)
	4. 수취인 주소와 보낼 토큰 수량을 입력하고 **진행**
	![](/img/build/wallets/kw-erc20-input-ao.png)
	5. 확인** 버튼을 클릭하여 트랜잭션을 제출하고 ERC20 토큰을 전송합니다 
	![](/img/build/wallets/kw-erc20-tx-details.png)
	6. 토큰이 성공적으로 전송되었다면 성공 메시지 모달이 표시됩니다.
	![](/img/build/wallets/kw-erc20-success-msg.png)  
</TabItem>
  <TabItem value="Mobile" label="Mobile">
	1. 지갑 홈페이지에서 거래하려는 계정과 네트워크가 올바른지 확인합니다.
	2. 송금하려는 ERC20 토큰 잔액과 같은 행에 있는 **송금** 버튼을 바로 클릭합니다.
	![](/img/build/wallets/kw-m-erc20-send-btn.jpg)
	3.  이제 수신자의 공개 주소를 입력하고 **다음**을 클릭해야 합니다.
	![](/img/build/wallets/kw-m-erc20-insert-addr.jpg)
	4. 송금할 토큰의 수량을 입력하고 **다음**을 클릭합니다.
	![](/img/build/wallets/kw-m-erc20-insert-amount.jpg)
	5. 이제 거래 세부 정보가 표시됩니다. 계속하려면 **전송**을 클릭하기 전에 거래 세부 정보를 다시 한 번 확인하세요.
	![](/img/build/wallets/kw-m-erc20-tx-details.jpg)
	6. 토큰이 성공적으로 전송되었다면 성공 메시지 모달이 표시됩니다.
	![](/img/build/wallets/kw-m-erc20-success-msg.jpg)
	7. 토큰 잔액 카드를 클릭하면 **거래 내역** 페이지에서 최근 거래 내역을 확인할 수 있습니다.
	![](/img/build/wallets/kw-m-erc20-tx-history.jpg)  
</TabItem>
</Tabs>