# Frontend Code Overview

1. Overview
2. `src/App.js`
3. `src/pages`
4. What we are going to learn?

## Overview <a id="1-overview"></a>

In this section, we are going to build front-end. This tutorial's main purpose is to learn how to connect contract with front-end code. We will thus briefly explain React codes and focus on the API functions interacting with contract deployed on Kaia.

```text
|-- src
    |-- klaytn
      |-- caver.js
      |-- KlaystagramContract.js
    |-- redux
      |-- auth.js
      |-- photos.js
    |-- pages
      |-- AuthPage.js
      |-- FeedPage.js
    |-- components
      |-- UploadPhoto.js
      |-- Feed.js
      |-- TransferOwnership.js
      |-- ...
    |-- App.js
```

`src/klaytn`: Contains files that help interact with Kaia blockchain.

* `src/klaytn/caver.js`: Instantiates caver within configured setting.  

  cf\) caver-js is a RPC library which makes a connection to Kaia node, interacting with node or smart contract deployed on klaytn.

* `src/klaytn/Klaystagram.js`: Creates an instance of contract using caver-js API. You can interact with contract through the instance.

`src/redux`: Creates API functions that interact with contract and keeps tracks of consequent data.

* `redux/actions/auth.js`
* `redux/actions/photos.js`

`src/pages`: Contains two page files that compose Klaystagram app.

* `src/pages/AuthPage.js`: Contains sign up and login form. You can generate private key in the sign up form, and use it to login on the app.
* `src/pages/FeedPage.js`: Shows read photos from the contract, shows them to users, and provides upload feature.

`src/components`: Contains component files that compose page.

* `src/components/Feed.js`: Reads data from contract and displays photos.
* `src/components/UploadPhoto.js`: Uploads photo by sending transaction to contract. 
* `src/components/TransferOwnership.js`: Transfers the ownership of photo by sending transaction.

`src/App.js`: Our tutorial app's root component file for overall components.

## App.js <a id="1-app-js"></a>

`'App.js'` is root component file for overall components. It renders two pages depending on user's login status. Each page has functions that interact with contract. You must add wallet instance to caver to send transactions to blockchain. Let’s briefly look at the code for overview.

cf. caver-js\(or `cav` in the code\) is a library for interacting with Kaia blockchain. We are going to learn in detail in the next chapter - [7-1. Connect Contract to Frontend](./feedpage.md#7-1-connect-contract-to-frontend)

```javascript
// src/App.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthPage from 'pages/AuthPage'
import FeedPage from 'pages/FeedPage'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Modal from 'components/Modal'
import Toast from 'components/Toast'

import * as authActions from 'redux/actions/auth'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    /**
     * 1. Initialize `isLoggedIn` state
     * cf) sessionStorage is internet browser's feature
     * which stores data until the browser tab is closed.
     */
    const walletFromSession = sessionStorage.getItem('walletInstance')
    const { integrateWallet, removeWallet } = this.props

    if (walletFromSession) {
      try {
        /**
         * 2-1. Integrate wallet
         * If 'walletInstance' value exists,
         * intergrateWallet method adds the instance to caver's wallet and redux store
         * cf) redux/actions/auth.js -> integrateWallet()
         */
        integrateWallet(JSON.parse(walletFromSession).privateKey)
      } catch (e) {
        /**
         * 2-2. Remove wallet
         * If value in sessionStorage is invalid wallet instance,
         * removeWallet method removes the instance from caver's wallet and redux store
         * cf) redux/actions/auth.js -> removeWallet()
         */
        removeWallet()
      }
    }
  }
  /**
   * 3. Render the page
   * Redux will initialize isLoggedIn state to true or false,
   * depending on whether walletInstance exists in the session storage
   */
  render() {
    const { isLoggedIn } = this.props
    return (
      <div className="App">
        <Modal />
        <Toast />
        {isLoggedIn && <Nav />}
        {isLoggedIn ? <FeedPage /> : <AuthPage />}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
  integrateWallet: (privateKey) => dispatch(authActions.integrateWallet(privateKey)),
  removeWallet: () => dispatch(authActions.removeWallet()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

cf\) `JSON.parse` is needed since `walletInstance` session is stored as JSON string.

**1. Initialize `isLoggedIn` state**  
To initialize state `isLoggedIn`, we use `constructor` life cycle method on App component. It checks for `walletInstance` session in browser's sessionStorage before component is mounted.

**2. Inject/Remove wallet**  
If you have never logged in before, `walletInstance` session may not exist. Otherwise, `walletInstance` session may exist as JSON string in the sessionStorage.

1. Inject - If wallet instance exists in sessionStorage, try adding wallet instance to caver and redux store.  
2. Remove - If wallet instance in sessionStorage is invalid, remove it from caver's wallet and redux store.  

```javascript
// redux/actions/auth.js

// 1. Inject wallet
export const integrateWallet = (privateKey) => (dispatch) => {
  // Make wallet instance with caver's privateKeyToAccount API
  const walletInstance = cav.kaia.accounts.privateKeyToAccount(privateKey)

  // To send a transaction, add wallet instance to caver
  cav.kaia.accounts.wallet.add(walletInstance)

  // To maintain logged-in status, store walletInstance at sessionStorage
  sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))

  // To access walletInstance information throughout the whole application, save it to redux store
  return dispatch({
    type: INTEGRATE_WALLET,
    payload: {
      privateKey,
      address: walletInstance.address,
    },
  })
}

// 2. Remove wallet
export const removeWallet = () => (dispatch) => {
  cav.kaia.accounts.wallet.clear()
  sessionStorage.removeItem('walletInstance')
  return dispatch({
    type: REMOVE_WALLET,
  })
}
```

cf. For further information about caver's `privateKeyToAccount` API, see [caver.kaia.accounts.privateKeyToAccount](../../../references/sdk/caver-js-1.4.1/api/caver.kaia.accounts.md#privatekeytoaccount).

**3. Render the page** Redux will initialize `isLoggedIn` state to true or false, depending on whether walletInstance exists in the session storage

## `src/pages` <a id="2-src-pages"></a>

As we described in [above](#1-overview), `src/pages` contains two page files. One of these two pages will be renderded on the app depending on whether the user is logged in or not.

* `AuthPage.js`: Contains sign up and login form. You can generate private key in the signup form, and use it to login on the app.
* `FeedPage.js`: Reads photo data from the contract and shows them to users. Users can also upload their pictures.

## What we are going to learn? <a id="3-what-we-are-going-to-learn"></a>

In blockchain based app, there are two ways of interacting with contracts.

1\) **Reading** data from contract.  
2\) **Writing** data to contract.

Reading data from contract is cost-free.  
On the otherhand, there is cost for writing data to contract \(Sending a transaction\). For this reason, in order to write data, you must have Kaia account that has some KAIA to pay for it.

In AuthPage, `SignupForm` helps you to create a Kaia account \(private key\). After that, you can log in with the private key and pay for the transaction fee.

If you want to learn more about the two different login methods \(private key / keystore\),  
please refer to the [5.2. Auth Component](../count-dapp/code-overview/auth-component.md) page.

In this tutorial, we are going to focus on `FeedPage`, so that we can learn how application **reads and writes data** from/to contracts.

