# Auth 컴포넌트

`src/components/Auth.js`:

## `Auth` 컴포넌트 <a href="#auth-component" id="auth-component"></a>

1\) 배경\
2\) `Auth` 컴포넌트 개요\
3\) `Auth` 컴포넌트 기능: 사용자가 개인키를 입력하여 로그인할 수 있습니다.\
4\) `Auth` 컴포넌트 기능: 사용자가 키스토어 파일을 가져와서 비밀번호를 입력하여 로그인할 수 있습니다.\
5\) `Auth` 컴포넌트 기능: 사용자가 브라우저에서 로그아웃하고 지갑 인스턴스 정보를 지울 수 있습니다.

### 배경 <a href="#1-background" id="1-background"></a>

블록체인 기반 앱에서는 일반적으로 스마트 컨트랙트와 상호작용합니다.\
컨트랙트와의 상호작용에는 두 가지 유형이 있습니다.\
`1) 컨트랙트에서 데이터 읽기` `2) 컨트랙트에 데이터 쓰기`

It is cost-free to read data from contracts.\
On the other hand, there is a cost for writing data to contract.

참고) `트랜잭션 보내기`\
컨트랙트나 블록체인에 데이터를 쓰는 것을 '트랜잭션 전송'이라고 합니다. 예를 들어 친구에게 5 KAIA를 보내면 '내가 친구에게 5 KAIA를 보냈다는 데이터를 블록체인에 쓴다'고 생각하시면 됩니다. 컨트랙트 메서드를 호출하는 것도 마찬가지입니다. '내가 변수 X를 100으로 설정했다는 데이터를 컨트랙트에 쓴다'고 생각하시면 됩니다. 블록체인이나 컨트랙트에 데이터를 쓰는 모든 행위를 '트랜잭션 전송'이라고 합니다.

컨트랙트에 데이터를 쓰려면 트랜잭션 수수료를 지불할 KAIA가 있는 카이아 계정이 있어야 합니다.

### `Auth` 컴포넌트 개요 <a href="#2-auth-component-overview" id="2-auth-component-overview"></a>

`Auth.js` 컴포넌트는 튜토리얼 앱에서 가장 긴 코드이므로 코드를 세분화하여 하나씩 살펴 보겠습니다.

이 컴포넌트는 다음과 같은 사용자 인터페이스를 제공합니다. ![Auth 컴포넌트](/img/build/tutorials/tutorial-auth-component.png)

주요 기능은 다음과 같습니다.\
1\) 사용자가 개인 키를 입력하여 로그인할 수 있습니다.\
2\) 사용자가 키스토어 파일을 가져와 비밀번호를 입력하여 로그인할 수 있습니다.\
3\) 사용자가 브라우저에서 로그아웃하고 지갑 인스턴스 정보를 지울 수 있습니다.

### `Auth` 컴포넌트 기능: 사용자가 개인키를 입력하여 로그인할 수 있습니다. <a href="#3-auth-component-feature-user-can-input-private-key-to-login" id="3-auth-component-feature-user-can-input-private-key-to-login"></a>

개인 키로 로그인하려면 `integrateWallet` 메서드가 필요합니다.

```javascript
integrateWallet = (privateKey) => {
  const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)
  cav.klay.accounts.wallet.add(walletInstance)
  sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
  this.reset()
}
```

인자로 `privateKey`를 받아 지갑 인스턴스를 생성하는 `integateWallet` 함수를 사용합니다.

Line 1: `const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)`\
It stores the wallet instance made by `privateKeyToAccount` API to the `walletInstance` variable.

Line 2: `cav.klay.accounts.wallet.add(walletInstance)`\
To send a transaction, you should add a wallet instance to caver through `cav.klay.accounts.wallet.add(walletInstance)`.

3행: `sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))`\
`sessionStorage.setItem`는 브라우저의 세션 저장소에 값을 저장하는 데 사용되는 브라우저 API입니다.

참고) 세션 저장소의 항목은 사용자가 브라우저 탭을 닫으면 사라집니다.

4행: `this.reset()`\
현재 컴포넌트의 상태를 초기 상태로 재설정하여 입력을 지웁니다.

caver-js의 `privateKeyToAccount` API에 대한 자세한 내용은 [caver.klay.accounts.privateKeyToAccount](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#privatekeytoaccount)를 참조하세요.

### `Auth` 컴포넌트 기능: 사용자가 키스토어 파일을 가져와서 비밀번호를 입력하여 로그인할 수 있습니다. <a href="#4-auth-component-feature-user-can-import-keystore-file-and-input-password-to-log" id="4-auth-component-feature-user-can-import-keystore-file-and-input-password-to-log"></a>

키 저장소와 비밀번호로 로그인하려면 `handleImport` 및 `handleLogin` 메서드가 필요합니다.

```javascript
/**
 * handleImport method takes a file, read
 */
handleImport = (e) => {
  const keystore = e.target.files[0]
  // 'FileReader' is used for reading contents of file.
  // We would use 'onload' handler and 'readAsText' method.
  // * FileReader.onload
  // - This event is triggered each time the reading operation is completed.
  // * FileReader.readAsText()
  // - Starts reading the contents.
  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    try {
      if (!this.checkValidKeystore(e.target.result)) {
        // If key store file is invalid, show message "Invalid keystore file."
        this.setState({ keystoreMsg: 'Invalid keystore file.' })
        return
      }

      // If key store file is valid,
      // 1) set e.target.result keystore
      // 2) show message "It is valid keystore. input your password."
      this.setState({
        keystore: e.target.result,
        keystoreMsg: 'It is valid keystore. input your password.',
      }, () => document.querySelector('#input-password').focus())
    } catch (e) {
      this.setState({ keystoreMsg: 'Invalid keystore file.' })
      return
    }
  }
  fileReader.readAsText(keystore)
}
```

사용자로부터 파일을 가져오려면 `FileReader` 브라우저 API를 사용합니다. `fileReader.readAsText(keystore)`를 호출한 후 `fileReader.onload` 함수가 실행되어 파일의 내용을 `e.target.result`로 가져옵니다.

참고) 키 저장소에는 암호화된 개인키가 포함되어 있습니다. 실제 개인 키를 얻기 위해 키 저장소의 암호를 해독하려면 일치하는 비밀번호가 필요합니다.

비밀번호를 `<input>` 요소에 입력합니다. 입력한 값은 `handleChange` 메서드를 통해 `password` 상태로 저장됩니다.

```markup
<input
  id="input-password"
  className="Auth__passwordInput"
  name="password"
  type="password"
  onChange={this.handleChange}
/>
```

키스토어 파일과 비밀번호가 모두 준비되었습니다. We can now decrypt the keystore file to extract the private key through `cav.klay.accounts.decrypt(keystore, password)` API.\
This API returns a wallet instance containing the private key. 개인키를 가져온 후 앞서 살펴본 `integrateWallet` 메서드를 사용할 수 있습니다.

```javascript
handleLogin = () => {
  const { accessType, keystore, password, privateKey } = this.state

  // Access type2: access through private key
  if (accessType == 'privateKey') {
    this.integrateWallet(privateKey)
    return
  }

  // Access type1: access through keystore + password
  try {
    const { privateKey: privateKeyFromKeystore } = cav.klay.accounts.decrypt(keystore, password)
    this.integrateWallet(privateKeyFromKeystore)
  } catch (e) {
    this.setState({ keystoreMsg: `Password doesn't match.` })
  }
}
```

비밀번호로 키스토어 파일을 해독하는 방법에 대한 자세한 내용은 [caver.klay.accounts.decrypt](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#decrypt)를 참조하세요.

### `Auth` 컴포넌트 기능: 사용자가 로그아웃하고 브라우저에서 지갑 인스턴스 정보를 제거할 수 있습니다. <a href="#5-auth-component-feature-user-can-logout-remove-wallet-instance-information-from" id="5-auth-component-feature-user-can-logout-remove-wallet-instance-information-from"></a>

'logout' means removing the wallet instance from the browser and caver.\
`cav.klay.accounts.wallet.clear()` removes all wallet instances from caver.\
`sessionStorage.removeItem('walletInstance')` removes the wallet instance from the browser's session storage.

```javascript
/**
 * removeWallet method removes
 * 1) wallet instance from caver.kaia.accounts
 * 2) 'walletInstance' value from session storage.
 */
removeWallet = () => {
  cav.klay.accounts.wallet.clear()
  sessionStorage.removeItem('walletInstance')
  this.reset()
}
```

caver-js에서 지갑 인스턴스를 지우는 방법에 대한 자세한 내용은 [caver.klay.accounts.wallet.clear](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#wallet-clear)를 참조하세요.
