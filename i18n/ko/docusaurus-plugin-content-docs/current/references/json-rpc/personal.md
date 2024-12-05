---
description: 노드에서 계정과 개인키를 관리하기 위한 API입니다.
---

# 개인

네임스페이스 `personal`은 키 저장소에서 개인 키를 관리합니다.

## personal_importRawKey <a id="personal_importrawkey"></a>

주어진 암호화되지 않은 개인키(선행 '0x'가 없는 16진수 문자열) 또는 [KlaytnWalletKey](../../learn/accounts.md#klaytn-wallet-key-format)를 키 저장소로 가져옵니다.

가져온 계정의 주소를 반환합니다.

| 클라이언트 | 메서드 호출                                                                 |
| :---: | ---------------------------------------------------------------------- |
|   콘솔  | `personal.importRawKey(keydata, passphrase)`                           |
|  RPC  | `{"method": "personal_importRawKey", "params": [keydata, passphrase]}` |

**매개변수**

| 이름         | 유형     | 설명                                                                                                                               |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| keydata    | string | 암호화되지 않은 개인키(선행 '0x'가 없는 16진수 문자열) 또는 [KlaytnWalletKey](../../learn/accounts.md#klaytn-wallet-key-format)입니다. |
| passphrase | string | 암호화를 위한 암호문구입니다.                                                                                                                 |

**리턴 값**

| 이름      | 유형     | 설명             |
| ------- | ------ | -------------- |
| address | string | 가져온 계정의 주소입니다. |

**예시**

콘솔

```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// Using a Klaytn wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["{private key}", "mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["{private key}0x000x{address}", "mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```

## personal_listAccounts <a id="personal_listaccounts"></a>

키 저장소에 있는 모든 키의 모든 클레이튼 계정 주소를 반환합니다.

| 클라이언트 | 메서드 호출                                              |
| :---: | --------------------------------------------------- |
|   콘솔  | `personal.listAccounts`                             |
|  RPC  | `{"method": "personal_listAccounts", "params": []}` |

**매개변수**

없음

**리턴 값**

| 유형     | 설명               |
| ------ | ---------------- |
| string | 모든 클레이튼 계정 주소 목록 |

없음

**예시**

콘솔

```javascript
> personal.listAccounts
["0x5e97870f263700f46aa00d967821199b9bc5a120", "0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"]
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listAccounts","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["0xd8d81f52b595cc6135177c9c34ae6130ecad4636","0xda04fb00e2cb5745cef7d8c4464378202a1673ef"]}
```

## personal_listWallets <a id="personal_listwallets"></a>

이 노드가 관리하는 지갑 목록을 반환합니다.

| 클라이언트 | 메서드 호출                                             |
| :---: | -------------------------------------------------- |
|   콘솔  | `personal.listWallets`                             |
|  RPC  | `{"method": "personal_listWallets", "params": []}` |

**매개변수**

없음

**리턴 값**

| 이름       | 유형     | 설명           |
| -------- | ------ | ------------ |
| URL      | string | 지갑 URL       |
| Status   | string | 잠금 상태        |
| Failure  | string | 오류 조건        |
| Accounts | string | 계정 주소 목록입니다. |

**예시**

콘솔

```javascript
> personal.listWallets
[
  {
    "url":"keystore:///", 
    "status":"Locked",
    "accounts":[{"address":"0x336010a2f91728ffe01414a87ae5d8af55f310c6","url":"keystore://"}]
  },
  ...
]
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listWallets","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":[{"url":"keystore:///","status":"Locked","accounts":[{"address":"0x336010a2f91728ffe01414a87ae5d8af55f310c6","url":"keystore://"}]}]}
```

## personal_openWallet <a id="personal_openwallet"></a>

하드웨어 지갑 열기 절차를 시작하여 USB 연결을 설정하고 제공된 비밀번호를 통해 인증을 시도합니다.

:::note

참고: 이 메서드는 두 번째 열기를 요구하는 추가 챌린지를 반환할 수 있습니다(예: Trezor PIN 매트릭스 챌린지).

:::

| 클라이언트 | 메서드 호출                                                           |
| :---: | ---------------------------------------------------------------- |
|   콘솔  | `personal.openWallet(url, 비밀번호)`                                 |
|  RPC  | `{"method": "personal_openWallet", "params": [url, passphrase]}` |

**매개변수**

| 이름         | 유형     | 설명      |
| ---------- | ------ | ------- |
| URL        | string | 지갑 URL  |
| Passphrase | string | 지갑의 암호문 |

**리턴 값**

| 이름    | 유형    | 설명    |
| ----- | ----- | ----- |
| Error | error | 오류 조건 |

**예시**

콘솔

```javascript
> personal.openWallet("keystore://", "passphrase")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_openWallet","params":["keystore://", "passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## personal_deriveAccount <a id="personal_deriveaccount"></a>

새 계정을 생성하기 위해 HD 지갑을 요청하고, 나중에 재사용할 수 있도록 선택적으로 고정합니다.

| 클라이언트 | 메서드 호출                                                             |
| :---: | ------------------------------------------------------------------ |
|   콘솔  | `personal.파생계정(url, path, pin)`                                    |
|  RPC  | `{"method": "personal_deriveAccount", "params": [url, path, pin]}` |

**매개변수**

| 이름   | 유형      | 설명     |
| ---- | ------- | ------ |
| URL  | string  | 지갑 URL |
| path | string  | 파생 경로  |
| pin  | Boolean | 선택적 고정 |

**리턴 값**

| 이름      | 유형     | 설명           |
| ------- | ------ | ------------ |
| Account | string | 새 계정의 주소입니다. |
| Error   | error  | 오류 조건        |

**예시**

콘솔

```javascript
> personal.deriveAccount(url, path, pin)
"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_deriveAccount","params":[url, path, pin],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"}
```

## personal_newAccount <a id="personal_newaccount"></a>

새 개인키를 생성하여 키 저장소 디렉터리에 저장합니다.
키 파일은 지정된 비밀번호로 암호화됩니다.
새 계정의 주소를 반환합니다.

클레이튼 콘솔에서 `newAccount`에 암호를 입력하라는 메시지가 표시됩니다.

| 클라이언트 | 메서드 호출                                                      |
| :---: | ----------------------------------------------------------- |
|   콘솔  | `newAccount(passphrase)`                                    |
|  RPC  | `{"method": "personal_newAccount", "params": [passphrase]}` |

**매개변수**

| 이름         | 유형     | 설명                                             |
| ---------- | ------ | ---------------------------------------------- |
| passphrase | string | (선택 사항) 암호화에 사용되는 암호 구문입니다. |

**리턴 값**

| 유형     | 설명           |
| ------ | ------------ |
| string | 새 계정의 주소입니다. |

**예시**

콘솔

```javascript
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"
```

암호 구문은 문자열로도 입력할 수 있습니다.

```javascript
> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["helloWorld"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"}
```

## personal_lockAccount <a id="personal_lockaccount"></a>

지정된 주소의 개인키를 메모리에서 제거합니다.
해당 계정은 더 이상 트랜잭션을 전송하는 데 사용할 수 없습니다.

| 클라이언트 | 메서드 호출                                                    |
| :---: | --------------------------------------------------------- |
|   콘솔  | `personal.lockAccount(address)`                           |
|  RPC  | `{"method": "personal_lockAccount", "params": [address]}` |

**매개변수**

| 이름      | 유형     | 설명           |
| ------- | ------ | ------------ |
| address | string | 잠글 계정 주소입니다. |

**리턴 값**

| 유형   | 설명                                         |
| ---- | ------------------------------------------ |
| bool | 계정이 성공적으로 잠겼으면 `true`, 그렇지 않으면 `false`입니다. |

**예시**

콘솔

```javascript
> personal.lockAccount("0xfa415bb3e6231f488ff39eb2897db0ef3636dd32")
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_lockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a1673ef"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## personal_unlockAccount <a id="personal_unlockaccount"></a>

키 저장소에서 주어진 주소로 키를 복호화합니다.

JavaScript 콘솔을 사용할 때 암호 구문과 잠금 해제 기간은 모두 선택 사항입니다.
암호 구문을 인수로 제공하지 않으면 콘솔에 대화형으로 암호 구문을 입력하라는 메시지가 표시됩니다.

암호화되지 않은 키는 잠금 해제 기간이 만료될 때까지 메모리에 보관됩니다.
잠금 해제 기간은 기본값이 300초입니다. 명시적 기간
을 0초로 설정하면 클레이튼 로컬 노드가 종료될 때까지 키의 잠금이 해제됩니다.

계정이 잠금 해제되어 있는 동안에는 `klay_sign` 및 `klay_sendTransaction`과 함께 사용할 수 있습니다.

| 클라이언트 | 메서드 호출                                                           |
| :---: | ---------------------------------------------------------------- |
|   콘솔  | `personal.unlockAccount(주소, 비밀번호, 기간)`                           |
|  RPC  | `{"method": "personal_unlockAccount", "params": [주소, 암호문구, 기간]}` |

**매개변수**

| 이름         | 유형     | 설명                                                                    |
| ---------- | ------ | --------------------------------------------------------------------- |
| address    | string | 잠금 해제할 계정 주소입니다.                                                      |
| passphrase | string | 암호화에 사용되는 암호문입니다.                                                     |
| duration   | int    | (선택 사항) 잠금 해제 기간입니다(기본값은 300초). |

**리턴 값**

| 유형   | 설명                                |
| ---- | --------------------------------- |
| bool | 잠금 해제된 경우 `true`, 그렇지 않으면 `false` |

**예시**

콘솔

```javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120")
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```

암호 구문과 잠금 해제 기간을 인수로 제공합니다:

```javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", "foo", 30)
true
```

비밀번호를 입력하면서도 기본 잠금 해제 기간을 재정의하려면 다음과 같이 하세요,
`null`을 암호 구문으로 전달합니다.

```
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", null, 30)
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_unlockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## personal_replaceRawKey <a id="personal_replacerawkey"></a>

키 저장소에 있는 암호화된 키 파일을 지정된 암호화되지 않은 개인키(선행 '0x'가 없는 16진수 문자열) 또는 [KlaytnWalletKey](../../learn/accounts.md#klaytn-wallet-key-format)로 바꿉니다.
또한 이전 비밀번호를 수신하여 교체하기 전에 이전 개인키를 복호화합니다.
복호화에 실패하거나 일치하는 계정을 찾지 못하면 에러가 발생합니다.

성공하면 교체된 계정의 주소를 반환합니다.

| 클라이언트 | 메서드 호출                                                                                    |
| :---: | ----------------------------------------------------------------------------------------- |
|   콘솔  | `personal.replaceRawKey(keydata, oldPassphrase, newPassphrase)`                           |
|  RPC  | `{"method": "personal_replaceRawKey", "params": [keydata, oldPassphrase, newPassphrase]}` |

**매개변수**

| 이름            | 유형     | 설명                                                                                                                               |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| keydata       | string | 암호화되지 않은 개인키(선행 '0x'가 없는 16진수 문자열) 또는 [KlaytnWalletKey](../../learn/accounts.md#klaytn-wallet-key-format)입니다. |
| oldPassphrase | string | 이전 개인키를 복호화할 비밀번호 구문입니다.                                                                                                         |
| newPassphrase | string | 새 개인키를 암호화할 비밀번호 구문입니다.                                                                                                          |

**리턴 값**

| 이름      | 유형     | 설명            |
| ------- | ------ | ------------- |
| address | string | 바뀐 계정의 주소입니다. |

**예시**

콘솔

```javascript
> personal.replaceRawKey('{private key}', 'myoldpassword', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
> personal.replaceRawKey('{private key}0x000x{address}', 'myoldpassword', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_replaceRawKey","params":["{private key}", "myoldpassword", mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_replaceRawKey","params":["{private key}0x000x{address}", "myoldpassword", mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```

## personal_sendAccountUpdate <a id="personal_sendaccountupdate"></a>

주어진 암호 구문의 유효성을 검사하고 [TxTypeAccountUpdate](../../learn/transactions/basic.md#txtypeaccountupdate) 트랜잭션을 제출합니다.
트랜잭션 객체에는 `from` 및 `key` 필드가 있어야 합니다. `gas`, `gasPrice`, `nonce`와 같은 다른 필드는 지정되지 않은 경우 내부적으로 사용됩니다.
패스프레이즈가 `tx.from`에 속한 개인키를 해독할 수 있고 트랜잭션이 확인되면 트랜잭션이 서명되어 네트워크에 제출됩니다.
이 계정은 노드에서 전역적으로 잠금 해제되지 않으며 다른 RPC 호출에서 사용할 수 없습니다.

| 클라이언트 | 메서드 호출                                                                 |
| :---: | ---------------------------------------------------------------------- |
|   콘솔  | `personal.sendAccountUpdate(tx, passphrase)`                           |
|  RPC  | `{"method": "personal_sendAccountUpdate", "params": [tx, passphrase]}` |

**매개변수**

| 이름         | 유형     | 설명                                    |
| ---------- | ------ | ------------------------------------- |
| tx         | string | 트랜잭션 객체입니다. `from` 및 `key`를 지정해야 합니다. |
| passphrase | string | `tx.from`의 개인키를 해독하기 위한 암호문입니다.       |

**리턴 값**

| 유형             | 설명                                  |
| -------------- | ----------------------------------- |
| 32-byte string | 성공하면 트랜잭션 해시입니다. 그렇지 않으면 에러가 발생합니다. |

**예시**

콘솔

```javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", key:"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}
undefined
> personal.sendAccountUpdate(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```

HTTP RPC

**참고**: 함수 `klay.toPeb()`는 HTTP RPC에서 실행할 수 없습니다.

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendAccountUpdate","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","key":"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}, "passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendTransaction <a id="personal_sendtransaction"></a>

주어진 암호 구문의 유효성을 검사하고 [TxTypeLegacy](../../learn/transactions/basic.md#txtypelegacytransaction) 트랜잭션을 제출합니다.
트랜잭션 객체에는 컨트랙트 배포의 경우를 제외하고 `from`과 `to`가 있어야 합니다.
트랜잭션이 스마트 컨트랙트를 배포하는 경우 `to`는 생략해야 합니다.
`value`를 지정하지 않으면 내부적으로 0으로 설정됩니다.
`gas`, `gasPrice`, `nonce`와 같은 다른 필드는 지정하지 않으면 내부적으로 적절한 값으로 설정됩니다.
암호가 `tx.from`에 속한 개인키를 해독할 수 있고 트랜잭션이 확인되면,
트랜잭션이 서명되어 네트워크에 제출됩니다.
이 계정은 노드에서 전역적으로 잠금 해제되지 않으며 다른 RPC 호출에서 사용할 수 없습니다.

| 클라이언트 | 메서드 호출                                                               |
| :---: | -------------------------------------------------------------------- |
|   콘솔  | `personal.sendTransaction(tx, passphrase)`                           |
|  RPC  | `{"method": "personal_sendTransaction", "params": [tx, passphrase]}` |

**매개변수**

| 이름         | 유형     | 설명                                                                                  |
| ---------- | ------ | ----------------------------------------------------------------------------------- |
| tx         | string | 트랜잭션 객체입니다. `from`은 필수 필드입니다. `to`, `value`, `gas`, `gasPrice` 및 `nonce`는 선택 필드입니다. |
| passphrase | string | `tx.from`의 개인키를 해독하기 위한 암호문입니다.                                                     |

**리턴 값**

| 유형             | 설명                                  |
| -------------- | ----------------------------------- |
| 32-byte string | 성공하면 트랜잭션 해시입니다. 그렇지 않으면 에러가 발생합니다. |

**예시**

콘솔

```javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendTransaction(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```

HTTP RPC

**참고**: 함수 `klay.toPeb()`는 HTTP RPC에서 실행할 수 없습니다.

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendValueTransfer <a id="personal_sendvaluetransfer"></a>

주어진 암호 구문의 유효성을 검사하고 [TxTypeValueTransfer](../../learn/transactions/basic.md#txtypevaluetransfer) 트랜잭션을 제출합니다.
트랜잭션 객체에는 `from`, `to` 및 `value` 필드가 있어야 합니다. `gas`, `gasPrice`, `nonce`와 같은 다른 필드는 지정되지 않은 경우 내부적으로 설정됩니다.
패스프레이즈가 `tx.from`에 속한 개인키를 복호화할 수 있고 트랜잭션이 확인되면,
트랜잭션이 서명되어 네트워크에 제출됩니다.
이 계정은 노드에서 전역적으로 잠금 해제되지 않으며 다른 RPC 호출에서 사용할 수 없습니다.

| 클라이언트 | 메서드 호출                                                                 |
| :---: | ---------------------------------------------------------------------- |
|   콘솔  | `personal.sendValueTransfer(tx, passphrase)`                           |
|  RPC  | `{"method": "personal_sendValueTransfer", "params": [tx, passphrase]}` |

**매개변수**

| 이름         | 유형     | 설명                                           |
| ---------- | ------ | -------------------------------------------- |
| tx         | string | 트랜잭션 개체입니다. `from`, `to`, `value`를 지정해야 합니다. |
| passphrase | string | `tx.from`의 개인키를 해독하기 위한 패스프레이즈입니다.           |

**리턴 값**

| 유형             | 설명                                  |
| -------------- | ----------------------------------- |
| 32-byte string | 성공하면 트랜잭션 해시입니다. 그렇지 않으면 에러가 발생합니다. |

**예시**

콘솔

```javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendValueTransfer(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```

HTTP RPC

**참고**: 함수 `klay.toPeb()`는 HTTP RPC에서 실행할 수 없습니다.

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendValueTransfer","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sign <a id="personal_sign"></a>

`sign` 메서드는 클레이튼 고유의 서명을 계산합니다:
`sign(keccak256("\x19Klaytn 서명된 메시지:\n" + len(message) + message)))`입니다.

메시지에 접두사를 추가하면 계산된 서명을 클레이튼 전용 서명으로 인식할 수 있습니다. 이를 통해 악의적인 dApp이 임의의 데이터(\*예: 트랜잭션)에 서명하고 이를 이용해 피해자를 사칭할 수 있는 악용을 방지할 수 있습니다.

서명을 확인하려면 `personal_ecRecover`를 참조하세요.

| 클라이언트 | 메서드 호출                                                                |
| :---: | --------------------------------------------------------------------- |
|   콘솔  | `personal.sign(message, account, password)`                           |
|  RPC  | `{"method": "personal_sign", "params": [message, account, password]}` |

**매개변수**

| 이름       | 유형     | 설명                 |
| -------- | ------ | ------------------ |
| message  | string | 서명할 메시지입니다.        |
| account  | string | 계정 주소입니다.          |
| password | string | 서명에 사용되는 암호 구문입니다. |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | 서명입니다. |

**예시**

콘솔

```javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"}
```

## personal_signTransaction <a id="personal_signtransaction"></a>

기본 구성을 설정하고 지정된 트랜잭션에 서명합니다.

:::note

참고: 보안되지 않은 HTTP RPC 연결을 통해 계정 비밀번호를 전송하는 것은 매우 안전하지 않습니다. [klay_signTransaction](./klay/transaction.md#klay_signtransaction)을 사용하세요.

:::

**매개변수**

트랜잭션 유형에 따라 필요한 파라미터가 다릅니다.
[클레이튼 트랜잭션 유형 작업하기](klay/transaction-type-support.md)에서 적절한 파라미터를 확인하세요.

**리턴 값**

| 유형       | 설명           |
| -------- | ------------ |
| raw      | 서명된 Raw 트랜잭션 |
| tx       | 트랜잭션 객체      |
| password | 발신자 비밀번호     |

## personal_ecRecover <a id="personal_ecrecover"></a>

`ecRecover`는 `personal_sign`에서 서명을 계산하는 데 사용된 개인 키와 연결된 주소를 반환합니다.

| 클라이언트 | 메서드 호출                                                             |
| :---: | ------------------------------------------------------------------ |
|   콘솔  | `personal.ecRecover(message, signature)`                           |
|  RPC  | `{"method": "personal_ecRecover", "params": [message, signature]}` |

**매개변수**

| 이름        | 유형     | 설명      |
| --------- | ------ | ------- |
| message   | string | 메시지입니다. |
| signature | string | 서명입니다.  |

**리턴 값**

| 유형     | 설명        |
| ------ | --------- |
| string | 계정 주소입니다. |

**예시**

콘솔

```javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
> personal.ecRecover("0xdeadbeaf", "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b")
"0x9b2055d370f73ec7d8a03e965129118dc8f5bf83"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"}

$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_ecRecover","params":["0xdead","0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```
