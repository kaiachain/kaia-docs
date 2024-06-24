# 프론트엔드 코드 개요

1. 개요
2. `src/App.js`
3. `src/pages`
4. 무엇을 배울까요?

## 개요 <a id="1-overview"></a>

이 섹션에서는 프론트엔드를 빌드하겠습니다. 이 튜토리얼의 주요 목적은 컨트랙트를 프론트엔드 코드와 연결하는 방법을 배우는 것입니다. 따라서 React 코드를 간략하게 설명하고, Klaytn에 배포된 컨트랙트와 상호작용하는 API 함수에 집중하겠습니다.

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

`src/klaytn`: 클레이튼 블록체인과 상호작용하는 데 도움이 되는 파일들이 들어 있습니다.

- `src/klaytn/caver.js`: 설정된 설정 내에서 caver를 인스턴스화합니다.

  cf) caver-js는 클레이튼 노드에 연결하여 노드 또는 클레이튼에 배포된 스마트 컨트랙트와 상호작용하는 RPC 라이브러리입니다.

- `src/klaytn/Klaystagram.js`: caver-js API를 사용하여 컨트랙트 인스턴스를 생성합니다. 인스턴스를 통해 컨트랙트와 상호작용할 수 있습니다.

`src/redux`: 컨트랙트와 상호작용하는 API 함수를 생성하고 결과 데이터를 추적합니다.

- `redux/actions/auth.js`
- `redux/actions/photos.js`

`src/pages`: Klaystagram 앱을 구성하는 두 개의 페이지 파일을 포함합니다.

- `src/pages/AuthPage.js`: 가입 및 로그인 양식을 포함합니다. 가입 양식에서 개인키를 생성하여 앱에서 로그인할 때 사용할 수 있습니다.
- `src/pages/FeedPage.js`: 컨트랙트에서 읽은 사진을 표시하고 사용자에게 보여주며 업로드 기능을 제공합니다.

`src/components`: 페이지를 구성하는 컴포넌트 파일을 포함합니다.

- `src/components/Feed.js`: 컨트랙트에서 데이터를 읽어와 사진을 표시합니다.
- `src/components/UploadPhoto.js`: 컨트랙트에 트랜잭션을 전송하여 사진을 업로드합니다.
- `src/components/TransferOwnership.js`: 트랜잭션을 전송하여 사진의 소유권을 이전합니다.

`src/App.js`: 튜토리얼 앱의 전체 컴포넌트를 위한 루트 컴포넌트 파일입니다.

## App.js <a id="1-app-js"></a>

`App.js`는 전체 컴포넌트의 루트 컴포넌트 파일입니다. 사용자의 로그인 상태에 따라 두 개의 페이지를 렌더링합니다. 각 페이지에는 컨트랙트와 상호작용하는 함수가 있습니다. 트랜잭션을 블록체인에 전송하려면 caver에 지갑 인스턴스를 추가해야 합니다. 코드를 간략하게 살펴보며 개요를 살펴봅시다.

참고) caver-js(또는 코드에서 `cav`)는 클레이튼 블록체인과 상호작용하기 위한 라이브러리입니다. 다음 챕터인 [7-1. 컨트랙트를 프론트엔드에 연결하기](./feedpage.md#7-1-connect-contract-to-frontend)에서 자세히 알아보겠습니다.

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

참고) `walletInstance` 세션이 JSON string로 저장되므로 `JSON.parse`가 필요합니다.

**1. `isLoggedIn` 상태 초기화하기**\
`isLoggedIn` 상태를 초기화하기 위해 앱 컴포넌트에서 `constructor` 생명주기 메서드를 사용합니다. 컴포넌트가 마운트되기 전에 브라우저의 세션스토리지에 `walletInstance` 세션이 있는지 확인합니다.

**2. 지갑 삽입/제거**\
한 번도 로그인한 적이 없다면 `walletInstance` 세션이 존재하지 않을 수 있습니다. 그렇지 않은 경우, 세션스토리지에 `walletInstance` 세션이 JSON string로 존재할 수 있습니다.

1. 삽입 - 세션스토리지에 지갑 인스턴스가 존재한다면, caver와 리덕스 스토어에 지갑 인스턴스를 추가해 보세요.
2. 제거 - 세션스토리지에 있는 지갑 인스턴스가 유효하지 않으면 caver의 지갑과 리덕스 스토어에서 제거합니다.

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

참고) caver의 `privateKeyToAccount` API에 대한 자세한 내용은 [caver.klay.accounts.privateKeyToAccount](../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#privatekeytoaccount)를 참고하세요.

**3. 페이지 렌더링** Redux는 세션 스토리지에 지갑 인스턴스가 존재하는지 여부에 따라 `isLoggedIn` 상태를 참 또는 false으로 초기화합니다.

## `src/pages` <a id="2-src-pages"></a>

[위](#1-overview)에서 설명한 것처럼 `src/pages`에는 두 개의 페이지 파일이 포함되어 있습니다. 이 두 페이지 중 하나는 사용자의 로그인 여부에 따라 앱에서 렌더링됩니다.

- `AuthPage.js`: 가입 및 로그인 양식을 포함합니다. 가입 양식에서 개인키를 생성하여 앱 로그인 시 사용할 수 있습니다.
- `FeedPage.js`: 컨트랙트에서 사진 데이터를 읽어와 사용자에게 보여줍니다. 사용자가 사진을 업로드할 수도 있습니다.

## 무엇을 배울까요? <a id="3-what-we-are-going-to-learn"></a>

블록체인 기반 앱에서 컨트랙트와 상호작용하는 방법에는 두 가지가 있습니다.

1\) **Reading** data from contract.\
2\) **Writing** data to contract.

Reading data from contract is cost-free.\
On the otherhand, there is cost for writing data to contract \(Sending a transaction\). 따라서 데이터를 쓰기 위해서는 반드시 KLAY를 보유하고 있는 클레이튼 계정이 있어야 합니다.

AuthPage에서 `SignupForm`을 통해 클레이튼 계정 (개인키)를 생성할 수 있습니다. 그 후 개인키로 로그인하고 트랜잭션 수수료를 결제할 수 있습니다.

두 가지 로그인 방법 (개인키/키스토어)에 대해 더 자세히 알고 싶으시다면,\
[5.2. Auth 컴포넌트](../count-dapp/code-overview/auth-component.md) 페이지를 참고하시기 바랍니다.

이 튜토리얼에서는 애플리케이션이 컨트랙트와 **데이터를 어떻게 읽고 쓰는지** 알아볼 수 있도록 `FeedPage`에 집중하겠습니다.
