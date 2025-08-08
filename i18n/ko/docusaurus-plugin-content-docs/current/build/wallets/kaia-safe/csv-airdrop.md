# CSV 에어드롭 사용

이것은 ERC20, ERC721, ERC1155 및 네이티브 토큰의 여러 전송을 단일 트랜잭션으로 일괄 처리하는 데 사용할 수 있는 카이아 세이프의 사용자 지정 앱입니다. 하나의 CSV 전송 파일을 업로드/복사하여 붙여넣고 제출 버튼을 누르기만 하면 됩니다.

이 단일 방식은 서명 및 거래 횟수를 줄임으로써 가스 ⛽와 상당한 시간 ⌚를 절약할 수 있습니다.

CSV 에어드롭을 사용한 예제로 시작해 보겠습니다!

## 1단계: [카이아세이프](https://safe.kaia.io/)에 로그인합니다. <a id="login-kaiasafe"></a>

아직 세이프 계정을 만들지 않았다면 [세이프 만들기 가이드](./use-kaia-safe.md#create-a-safe) 및 [자산 추가 가이드](./use-kaia-safe.md#add-assets)를 참조하여 계정을 설정하고 자산(KAIA, FT, NFT)을 추가하시기 바랍니다.

## 2단계: 앱을 클릭하고 CSV를 검색한 다음 CSV 에어드롭을 선택합니다. <a id="search-CSV-airdrop"></a>

![](/img/build/tools/kaia-safe/search-csv-app.png)

## 3단계: 전송 CSV 파일 준비하기 <a id="prepare-CSV-airdrop"></a>

전송 파일은 다음과 같은 필수 열이 포함된 CSV 형식이어야 합니다:

- _토큰 유형_: 전송되는 토큰의 유형입니다. erc20, nft 또는 네이티브 중 하나입니다. NFT 토큰은 ERC721 또는 ERC1155일 수 있습니다.
- _토큰 주소_: 전송할 ERC20 토큰의 이더리움 주소입니다. 네이티브(ETH) 송금의 경우 이 부분을 비워 두어야 합니다.
- _수신자_: 송금 수신자의 이더리움 주소입니다.
- _금액_: 전송할 토큰의 금액입니다. erc721 전송의 경우 비워 둘 수 있습니다.
- _ID_: 전송할 수집 가능한 토큰의 ID(erc721 또는 erc1155)입니다. 네이티브 및 erc20 전송의 경우 비워 둘 수 있습니다.

:::important
CSV 파일은 구분 기호로 ","를 사용해야 하며 헤더 행은 항상 첫 번째 행으로 제공되어야 하고 설명된 열 이름을 포함해야 합니다.
[샘플 전송 파일](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
:::

### 네이티브 토큰 전송 <a id="native-token-trnasfers"></a>

네이티브 토큰에는 토큰 주소가 없으므로, 네이티브 전송의 경우 _token_address_ 열을 비워두어야 합니다.

![](/img/build/tools/kaia-safe/native-csv-app.png)

:::note
kaia 안전 지갑 주소에 충분한 네이티브 토큰이 있는지 확인하세요.
:::

### ERC-20 전송 <a id="erc20-trnasfers"></a>

erc20 전송 및 기타 각 필드에 _토큰_유형_으로 erc20을 입력합니다.

![](/img/build/tools/kaia-safe/erc20-csv-app.png)

:::note
kaia 안전 지갑 주소에 충분한 erc20 토큰이 있는지 확인하세요.
:::

### ERC-721 전송 <a id="erc721-transfers"></a>

erc721 전송 및 기타 각 필드에 _token_type_으로 erc721을 입력합니다.

![](/img/build/tools/kaia-safe/erc721-csv-app.png)

:::note
kaia 안전 지갑 주소에 충분한 erc721 토큰이 있는지 확인하세요.
:::

### 일러스트레이션 <a id="illustration"></a>

이 예시에서는 네이티브 전송 2개, ERC20 전송 2개, ERC721 전송 1개가 있습니다.

![](/img/build/tools/kaia-safe/rs-csv-app.png)

## 4단계: 거래 검토 및 제출 <a id="review-submit-transaction"></a>

거래를 검토하고 확인할 수 있습니다. 준비가 완료되면 제출을 클릭하여 다른 안전 거래와 마찬가지로 거래를 실행합니다.

