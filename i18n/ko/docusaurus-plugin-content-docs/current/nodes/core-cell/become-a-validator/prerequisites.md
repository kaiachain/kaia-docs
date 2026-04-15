# 지갑 연결

먼저 밸리데이터의 전반적인 관리 권한을 가진 validator manager 계정을 등록해야 합니다. 이 계정은 밸리데이터와 관련된 대부분의 중요 정보를 수정할 수 있는 권한을 가지므로, 멀티시그 월렛 또는 이에 준하는 보안이 보장되는 월렛을 사용하는것이 강력하게 권장됩니다. 일반적으로 Kaia Safe([safe.kaia.io](http://safe.kaia.io))로 생성한 멀티시그 월렛을 validator manager로 사용하는것을 추천합니다. 이어지는 가이드에서는 Kaia Safe를 이용한다고 가정하고 진행합니다.

## Safe Wallet 연결 <a id="connecting-a-safe-wallet"></a>

먼저 [Kaia Safe 사용 가이드](../../../build/wallets/kaia-safe/kaia-safe.md)를 따라서 Safe 계정을 생성합니다. 그 후 Safe custom app으로 밸리데이터 관리 포털을 등록합니다.

![Add custom Safe App](/img/nodes/become-a-validator/image02.png)

Apps \> My custom apps \> Add custom Safe App 를 클릭해주세요.

![포털 URL 붙여넣기](/img/nodes/become-a-validator/image03.png)

Safe의 가이드를 따라 포털의 URL을 붙여넣습니다. 아래에 포털의 정보가 정상적으로 출력되는지 확인해주세요. 주의사항을 확인 후 체크박스를 클릭합니다. Add 버튼을 클릭하여 추가합니다.

![My custom apps](/img/nodes/become-a-validator/image04.png)

성공적으로 밸리데이터 포털이 추가되었다면, Apps \> My custom apps 탭에서 Kaia Validators 카드를 클릭하여 Safe 계정으로 포털에 접속합니다.

![Safe 지갑 연결 완료](/img/nodes/become-a-validator/image05.png)

포털에 진입하면 좌측 화면에 Safe 지갑이 연결된 것을 확인할 수 있습니다. 이제 포털에서 트랜잭션 전송을 시도할 때, Safe를 통해 멀티시그 설정에 따라 트랜잭션이 서명 및 전송됩니다.

## 다른 지갑 연결 <a id="connecting-another-wallet"></a>

:::warning Security Note

멀티시그 또는 이에 준하는 보안이 확보되지 않은 월렛을 밸리데이터 관리자 계정으로 사용하는것은 권장되지 않습니다.

:::

![지갑 연결](/img/nodes/become-a-validator/image06.png)

다른 지갑을 이용해 관리자 계정을 관리할 경우, Connect Wallet 버튼을 눌러 지갑을 연결할 수 있습니다.
