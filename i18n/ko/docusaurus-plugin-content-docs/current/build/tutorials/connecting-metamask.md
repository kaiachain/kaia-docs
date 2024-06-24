# MetaMask를 카이아에 연결하기

![](/img/build/tutorials/klaytnXmetamask.png)

> **주석**: MetaMask는 주로 이더리움 지갑으로 사용되지만 주소 구조가 동일하기 때문에 카이아와도 호환이 가능합니다. 카이아에도 [Kaikas](../tools/wallets/kaikas.md)라는 브라우저 확장 지갑이 있어 기본적으로 MetaMask와 동일한 기능을 제공하지만 Remix를 제외하고는 동일합니다.

## 1단계. MetaMask 설치하기 <a href="#install-metamask" id="install-metamask"></a>

- 이 예에서는 Chrome 브라우저를 사용하겠습니다. ([**크롬 설치**](https://www.google.com/intl/en_us/chrome/))
- 크롬에 [**MetaMask 확장 프로그램**](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)을 추가합니다.

  > **참고:** 다른 브라우저를 사용하는 경우 추가 설치가 필요할 수 있습니다.
- 크롬 브라우저의 오른쪽 상단 모서리에 있는 아이콘을 클릭하면 MetaMask를 시작할 수 있습니다.

## 2단계. MetaMask 지갑 생성하기 <a href="#generate-a-metamask" id="generate-a-metamask"></a>

![지갑 만들기](/img/build/tutorials/new-to-metamask.png)

- **Create a Wallet**을 클릭합니다.
- 비밀번호를 설정합니다.
- 12단어 시드 문구가 제공되므로 안전한 곳에 백업하세요.

  > **참고:** 시드 문구로만 지갑을 복원할 수 있습니다. 시드 문구를 다른 사람과 공유하면 자금이 모두 손실될 수 있습니다. 따라서 직접 적어두거나 오프라인 기기에 보관하는 것이 좋습니다.

![시드 문구 및 지갑](/img/build/tutorials/metamask-secret-backup.png)

## 3단계. 카이아 메인넷에 연결하기 <a href="#connect-to-klaytn-cypress-network-mainnet" id="connect-to-klaytn-cypress-network-mainnet"></a>

> 간단한 방법은 다음과 같습니다. [지갑을 카이아 메인넷에 연결](https://chainlist.org/chain/8217).

- 이더리움 메인넷 상단에 있는 네트워크 탭을 클릭하고 \[네트워크 추가]를 선택합니다.
- 카이아 체인의 엔드포인트 노드(EN) 데이터를 입력합니다.

### Baobab Network Configuration

| Network Config Item | Value                                  |
| ------------------- | -------------------------------------- |
| Network Name        | Kaia Mainnet                           |
| New RPC URL         | `https://public-en-cypress.klaytn.net` |
| Block Explorer URL  | `https://klaytnscope.com`              |
| Chain ID            | 8217                                   |
| Currency Symbol     | KLAY                                   |

- **Save**를 클릭하여 카이아 메인 네트워크를 추가합니다.

![네트워크 설정 및 커스텀 RPC](/img/build/tutorials/metamask-add-cypress-1.png) ![네트워크 설정 및 커스텀 RPC](/img/build/tutorials/metamask-add-cypress-2.png)

## 4단계. KAIA 보내기 <a href="#send-klay" id="send-klay"></a>

**참고**: 다음 단계는 KAIA가 필요합니다.

- 메인 페이지에서 \[send]를 클릭하고 수취인 주소와 KAIA 금액을 입력합니다.

![KLAY 1 보내기](/img/build/tutorials/metamask-send-klay-1.png)

**참고:** KAIA를 전송하려면 트랜잭션이 필요하며, 트랜잭션에는 KAIA가 필요합니다.

- 카이아 v1.9.0부터 [동적 가스비 메커니즘](https://medium.com/klaytn/dynamic-gas-fee-pricing-mechanism-1dac83d2689)이 기존의 고정 가격 정책을 대체했습니다.
- 따라서 고정 가스비를 수동으로 설정할 필요가 없습니다.
- 송금할 금액과 트랜잭션 수수료를 확인하고 \[확인]을 클릭하면 KAIA 송금이 완료되며, 이후 메인 페이지로 리디렉션됩니다.
- 메인 페이지에서 \[활동]을 클릭하면 거래 내역을 확인할 수 있습니다.

![KLAY 2 보내기](/img/build/tutorials/metamask-send-klay-2.png)

## 카이아 Kairos 네트워크(테스트넷)에 연결하기 <a href="#connect-to-klaytn-baobab-network-testnet" id="connect-to-klaytn-baobab-network-testnet"></a>

### 트랜잭션을 만들기 위해 KAIA 받기

> **참고:** 이 튜토리얼에서는 테스트넷(Kairos)의 공개 EN을 사용하여 네트워크에 연결합니다. 테스트를 실행할 때는 반드시 Kairos를 사용하세요.

> 간단한 방법은 다음과 같습니다. [카이아 Kairos 네트워크(테스트넷)에 지갑을 연결합니다](https://chainlist.org/chain/1001).

### Cypress Network Configuration

| Network Config Item | Value                                 |
| ------------------- | ------------------------------------- |
| Network Name        | Kaia Kairos                           |
| New RPC URL         | `https://public-en-baobab.klaytn.net` |
| Block Explorer URL  | `https://baobab.klaytnscope.com `     |
| Chain ID            | 1001                                  |
| Currency Symbol     | KLAY                                  |

- **Save**를 클릭하여 카이아 Kairos 네트워크를 추가합니다.

![네트워크 설정](/img/build/tutorials/connect-testnet-1.png)

- 카이아 지갑 연결을 테스트하기 위해서는 트랜잭션을 생성해야 하며, 트랜잭션에는 KAIA가 필요합니다.
- 오른쪽 상단의 케밥 메뉴(점 3개)를 클릭하고 **Account details**를 선택합니다.
- **Export Private Key**를 클릭해 개인키를 받습니다.

![개인키 내보내기](/img/build/tutorials/connect-testnet-2.png)

- Kairos 테스트넷 이용 시, [**카이아 Faucet**](https://baobab.wallet.klaytn.foundation/access?next=faucet)에서 테스트 KAIA를 받을 수 있습니다.
- 카이아 지갑에 개인키를 입력하고 **Access**를 클릭해 로그인합니다. (개인키 앞에 0x를 붙입니다.)
- **Run Faucet**을 클릭합니다. 150 테스트넷 KAIA가 계정으로 전송되고 잔액이 업데이트됩니다. 계정당 24시간에 한 번씩 Faucet에서 테스트넷 KAIA를 청구할 수 있습니다.

![Faucet에서 KAIA 가져오기](/img/build/tutorials/connect-testnet-3.png)

- MetaMask로 돌아와서 받은 KAIA를 확인합니다.

![잔액 확인](/img/build/tutorials/connect-testnet-4.png)
