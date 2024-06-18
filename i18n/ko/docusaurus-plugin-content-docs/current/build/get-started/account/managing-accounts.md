# 계정 관리

## 계정 나열하기 <a id="list-your-accounts"></a>

이렇게 하면 데이터 디렉터리 아래에 생성된 모든 계정 목록이 반환됩니다.

### ken <a id="ken"></a>

명령줄에서 다음을 사용하여 CLI를 호출합니다:

```bash
$ ken account list --datadir <DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**참고**: 다른 노드에서 키스토어 파일을 복사하거나 파일을 제거하면 반환되는 계정 목록의 순서가 변경될 수 있습니다. 따라서 인덱스에 의존하지 않거나 키스토어 파일을 복사하거나 제거할 경우 스크립트에서 계정 인덱스를 확인하고 업데이트해야 합니다.

### JavaScript 콘솔 <a id="javascript-console"></a>

콘솔을 사용하는 경우:

```javascript
> klay.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

## 계정 잠금 해제 <a id="unlock-accounts"></a>

비대화형으로 계정을 사용하려면 계정을 잠금 해제해야 합니다.

### ken <a id="ken"></a>

쉼표로 구분된 계정 목록 (16진수 또는 인덱스)를 인수로 받는 `--unlock "{address},{address}"` 옵션을 사용하여 명령줄에서 EN을 시작하면 한 세션에 대해 프로그래밍 방식으로 계정 잠금을 해제할 수 있습니다. 이 옵션은 RPC를 통해 dApp에서 계정을 사용하고자 할 때 유용합니다. `--unlock`은 목록에서 첫 번째 계정을 잠금 해제합니다. 프로그래밍 방식으로 계정을 만들었을 때 유용하며, 실제 계정을 몰라도 잠금을 해제할 수 있습니다.

계정을 만들고 계정을 잠금 해제하여 노드를 시작합니다:

```bash
$ ken account new --password <(echo this is not secret) --datadir <DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

특정 계정이 잠금 해제된 상태에서 노드를 시작하려면 계정 목록에서 주소 위치를 참조하는 주소 또는 인덱스 (생성 순서에 해당)를 사용하면 됩니다.

```bash
$ ken --unlock "0" --datadir <DATADIR>
$ ken --unlock "2" --datadir <DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir <DATADIR>
```

명령줄을 통해 여러 계정을 잠금 해제할 수 있습니다. 이 경우 잠금 해제 인수는 쉼표로 구분된 계정 주소 또는 인덱스 목록입니다.

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir <DATADIR>
```

이 구조를 비대화형으로 사용하는 경우 비밀번호 파일에는 해당 계정의 각 비밀번호가 한 줄에 하나씩 포함되어야 합니다.

### JavaScript 콘솔 <a id="javascript-console"></a>

콘솔에서 (초 단위) 기간 동안 (한 번에 하나씩) 계정을 잠금 해제할 수도 있습니다.

```javascript
> personal.unlockAccount(address, "password", 300)
```

콘솔 기록이 기록되므로 계정이 노출될 수 있으므로 비밀번호 인수를 사용하지 않는 것이 좋습니다. You have been warned.

## 계정 잔액 확인 <a id="check-account-balance"></a>

### ken <a id="ken"></a>

해당 없음

### JavaScript 콘솔 <a id="javascript-console"></a>

계정 잔액을 확인하려면:

```javascript
> klay.fromPeb(klay.getBalance("{account}"), "KLAY")
6.5
```

JavaScript 함수를 사용하여 모든 잔액을 인쇄합니다:

```javascript
function checkAllBalances() {
    var totalBal = 0;
    for (var acctNum in klay.accounts) {
        var acct = klay.accounts[acctNum];

        var acctBal = klay.fromPeb(klay.getBalance(acct), "KLAY");
        totalBal += parseFloat(acctBal);

        console.log("klay.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + "KLAY");

    }

    console.log("Total balance: " + totalBal + " KLAY");
};
```

그런 다음 이를 실행할 수 있습니다:

```javascript
> checkAllBalances();
klay.accounts[0]: 0xd1ade25ccd3d550a7eb532ac759cac7be09c2719  balance: 63.11848 KLAY
klay.accounts[1]: 0xda65665fc30803cb1fb7e6d86691e20b1826dee0  balance: 0 KLAY
klay.accounts[2]: 0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32  balance: 1 KLAY
klay.accounts[3]: 0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99  balance: 6 KLAY
```

이 함수는 `ken`을 재시작하면 사라지므로 자주 사용하는 함수를 저장해두면 나중에 호출할 때 유용하게 사용할 수 있습니다.

먼저 컴퓨터의 파일에 `checkAllBalances()` 함수 정의를 저장합니다. 예를 들어, `/Users/username/klayload.js`입니다. 그런 다음 대화형 콘솔에서 파일을 로드합니다:

```javascript
> loadScript("/Users/username/klayload.js")
true
```

이 파일은 마치 수동으로 명령을 입력한 것처럼 JavaScript 환경을 수정합니다. 자유롭게 실험해 보세요!
