# Auth Component

`src/components/Auth.js`:

## `Auth` component <a href="#auth-component" id="auth-component"></a>

1\) Background\
2\) `Auth` component overview\
3\) `Auth` component feature: User can input private key to login.\
4\) `Auth` component feature: User can import a keystore file and input password to log in.\
5\) `Auth` component feature: User can logout and clear the wallet instance information from the browser.

### 1) Background <a href="#1-background" id="1-background"></a>

In a blockchain-based app, we usually interact with smart contracts.\
There are 2 types of interactions with a contract.\
`1) Read data from a contract.` `2) Write data to a contract.`

It is cost-free to read data from contracts.\
On the other hand, there is a cost for writing data to contract.

cf) `Sending a transaction`\
Writing data to contracts or blockchain is called 'sending a transaction'.\
For example, if you send 5 KLAY to your friend, you could think of it as `writing data to the blockchain that I sent 5 KLAY to my friend`.\
Calling a contract method is the same. You could think of it as `writing data onto the contract that I set variable X to 100`. All actions related to writing data to blockchain or contract is called `sending a transaction`.

To write data to contract, you should have a Kaia account which has KLAY to pay for the transaction fee.\
`Auth` component helps you log in to your app.

### 2) `Auth` component overview <a href="#2-auth-component-overview" id="2-auth-component-overview"></a>

`'Auth.js'` component is the longest code in our tutorial app, so we will break down the code and go over one by one.

This component provides the following user interface. ![auth-component](/img/build/tutorials/tutorial-auth-component.png)

Main features are:\
1\) User can input private key to login.\
2\) User can import a keystore file and input password to login.\
3\) User can logout and clear the wallet instance information from the browser.

### 3) `Auth` component feature: User can input private key to login. <a href="#3-auth-component-feature-user-can-input-private-key-to-login" id="3-auth-component-feature-user-can-input-private-key-to-login"></a>

`integrateWallet` method is needed to login with private key.

```javascript
integrateWallet = (privateKey) => {
  const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)
  cav.klay.accounts.wallet.add(walletInstance)
  sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
  this.reset()
}
```

`integateWallet` function takes `privateKey` as an argument, use it to generate a wallet instance.

Line 1: `const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)`\
It stores the wallet instance made by `privateKeyToAccount` API to the `walletInstance` variable.

Line 2: `cav.klay.accounts.wallet.add(walletInstance)`\
To send a transaction, you should add a wallet instance to caver through `cav.klay.accounts.wallet.add(walletInstance)`.

Line 3: `sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))`\
`sessionStorage.setItem` is a browser API used for storing a value to the browser's session storage.\
Since we want not to lose our logged-in status even we refresh our tutorial app page, we stored our wallet instance to the session storage as a JSON string.

cf) Items in the session storage disappears when the user closes the browser tab.

Line 4: `this.reset()`\
It resets the current component's state to the initial state to clear your input.

For further information about `privateKeyToAccount` API of caver-js, see [caver.klay.accounts.privateKeyToAccount](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#privatekeytoaccount)

### 4) `Auth` component feature: User can import keystore file and input password to login. <a href="#4-auth-component-feature-user-can-import-keystore-file-and-input-password-to-log" id="4-auth-component-feature-user-can-import-keystore-file-and-input-password-to-log"></a>

`handleImport` and `handleLogin` methods are needed to login with a keystore and password.

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

To import a file from user, we use `FileReader` browser API.\
`e.target.files[0]` contains meta information for the file. To read the content of the file, we call `fileReader.readAsText(keystore)` API.\
After calling `fileReader.readAsText(keystore)`, `fileReader.onload` function fires to take the content of the file as `e.target.result`.\
After importing the keystore file, we get password input.

cf) Keystore contains an encrypted private key. We need the matching password to decrypt the keystore to get the actual private key.\
_WARNING Don't expose your keystore file to another person!_

Fill password into `<input>` element. Entered value will be stored as `password` state through `handleChange` method.

```markup
<input
  id="input-password"
  className="Auth__passwordInput"
  name="password"
  type="password"
  onChange={this.handleChange}
/>
```

Both the keystore file and its password are ready. We can now decrypt the keystore file to extract the private key through `cav.klay.accounts.decrypt(keystore, password)` API.\
This API returns a wallet instance containing the private key. After importing the private key, we can use `integrateWallet` method we've visited earlier.

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

For further information about decrypting keystore file with password, see [caver.klay.accounts.decrypt](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#decrypt)

### 5) `Auth` component feature: User can logout, remove wallet instance information from browser. <a href="#5-auth-component-feature-user-can-logout-remove-wallet-instance-information-from" id="5-auth-component-feature-user-can-logout-remove-wallet-instance-information-from"></a>

'logout' means removing the wallet instance from the browser and caver.\
`cav.klay.accounts.wallet.clear()` removes all wallet instances from caver.\
`sessionStorage.removeItem('walletInstance')` removes the wallet instance from the browser's session storage.

```javascript
/**
 * removeWallet method removes
 * 1) wallet instance from caver.klay.accounts
 * 2) 'walletInstance' value from session storage.
 */
removeWallet = () => {
  cav.klay.accounts.wallet.clear()
  sessionStorage.removeItem('walletInstance')
  this.reset()
}
```

For further information about clearing a wallet instance from caver-js, see [caver.klay.accounts.wallet.clear](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#wallet-clear)
