# 프론트엔드 코드 개요

1. `src/App.js`
2. `static/index.html` - index.html
3. `src/routes.js` - 경로 정의 포함
4. `src/components`: 페이지를 구성하는 컴포넌트 파일을 포함합니다.
5. `src/klaytn`: 카이아 블록체인과 상호작용하는 데 도움이 되는 파일들이 들어 있습니다. cf) caver-js는 카이아 노드에 연결하여 노드 또는 카이아에 배포된 스마트 컨트랙트와 상호작용하는 RPC 라이브러리입니다. `src/klaytn/Klaystagram.js`: caver-js API를 사용하여 컨트랙트 인스턴스를 생성합니다.

## `src/pages` <a id="2-src-pages"></a>

```javascript
import ReactDOM from 'react-dom'

import App from './App'
import renderRoutes from './routes'

import './index.scss'

// Render App(root component).
ReactDOM.render(
  renderRoutes(App),
  document.getElementById('root')
)

// hot module replacement.
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default
    ReactDOM.render(renderRoutes(NextApp), document.getElementById('root'))
    console.log('Hot module replaced..')
  })
}
```

`index.js`는 튜토리얼 앱의 메인 JavaScript 파일입니다. It is the entry point of our app.

'react-dom' 라이브러리를 사용하여 제공된 컨테이너('#root')의 DOM에 React 엘리먼트를 렌더링하고 컴포넌트에 대한 참조를 반환합니다. 간단히 말해, 'react-dom'을 통해 튜토리얼 앱의 DOM은 `public/index.html` 파일에 `<div id="root"></div>`로 채워질 것입니다.

## <a id="3-what-we-are-going-to-learn"></a>

```markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <title>klay blockchain-based app</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div> <!-- DOM will be populated into here. -->
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

`index.html`은 튜토리얼 앱을 렌더링하기 위한 HTML 파일입니다.

자세한 내용은 React 공식 사이트 [https://reactjs.org/docs/react-dom.html#render](https://reactjs.org/docs/react-dom.html#render)에서 확인할 수 있습니다.

## `src/pages`

```javascript
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Count from 'components/Count'

const renderRoutes = rootComponent => (
  <Router history={browserHistory}>
    <Route component={rootComponent}>
      <Route path="/" component={Count} />
    </Route>
  </Router>
)

export default renderRoutes
```

cf) caver-js는 카이아 노드에 연결하여 노드 또는 카이아에 배포된 스마트 컨트랙트와 상호작용하는 RPC 라이브러리입니다.\
`App.js`는 전체 컴포넌트의 루트 컴포넌트 파일입니다.\
`BlockNumber`, `Auth` 및 `{this.props.children}` 컴포넌트를 렌더링합니다.\
이 `{this.props.children}` 컴포넌트는 `routes.js` 파일에 따라 채워집니다.\
브라우저의 URL 경로가 `/`인 경우 `<Count />` 컴포넌트를 렌더링합니다.

자세한 내용은 React 라우터 GitHub [https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md](https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md)에서 확인하세요.

## App.js <a id="1-app-js"></a>

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

`src/App.js`: 튜토리얼 앱의 전체 컴포넌트를 위한 루트 컴포넌트 파일입니다.

```javascript
render() {
  return (
    <div className="App">
      <BlockNumber />
      <Auth />
      {this.props.children}
    </div>
  )
}
```

`src/klaytn`: 카이아 블록체인과 상호작용하는 데 도움이 되는 파일들이 들어 있습니다.\
이 파일이 앱의 시작점입니다.\
It renders `BlockNumber`, `Auth` and `{this.props.children}` component.\
이 파일이 앱의 시작점입니다.\
If your browser's url path is `/`, it will render `<Count />` component.

```javascript
컴포넌트가 마운트되기 전에 브라우저의 세션스토리지에 `walletInstance` 세션이 있는지 확인합니다.\
지갑 삽입/제거\*\*\
한 번도 로그인한 적이 없다면 `walletInstance` 세션이 존재하지 않을 수 있습니다.\
그렇지 않은 경우, 세션스토리지에 `walletInstance` 세션이 JSON string로 존재할 수 있습니다.\
삽입 - 세션스토리지에 지갑 인스턴스가 존재한다면, caver와 리덕스 스토어에 지갑 인스턴스를 추가해 보세요.\
참고) caver의 `privateKeyToAccount` API에 대한 자세한 내용은 [caver.klay.accounts.privateKeyToAccount](../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#privatekeytoaccount)를 참고하세요.
```

컴포넌트가 마운트되기 전에 브라우저의 세션스토리지에 `walletInstance` 세션이 있는지 확인합니다.\
지갑 삽입/제거\*\*\
한 번도 로그인한 적이 없다면 `walletInstance` 세션이 존재하지 않을 수 있습니다.\
그렇지 않은 경우, 세션스토리지에 `walletInstance` 세션이 JSON string로 존재할 수 있습니다.\
// redux/actions/auth.js// 1. Inject wallet
export const integrateWallet = (privateKey) => (dispatch) => {
// Make wallet instance with caver's privateKeyToAccount API
const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)// To send a transaction, add wallet instance to caver
cav.klay.accounts.wallet.add(walletInstance)// To maintain logged-in status, store walletInstance at sessionStorage
sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))// To access walletInstance information throughout the whole application, save it to redux store
return dispatch({
type: INTEGRATE_WALLET,
payload: {
privateKey,
address: walletInstance.address,
},
})
}// 2. Remove wallet
export const removeWallet = () => (dispatch) => {
cav.klay.accounts.wallet.clear()
sessionStorage.removeItem('walletInstance')
return dispatch({
type: REMOVE_WALLET,
})
}\
참고) caver의 `privateKeyToAccount` API에 대한 자세한 내용은 [caver.klay.accounts.privateKeyToAccount](../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#privatekeytoaccount)를 참고하세요.

참고) `walletInstance` 세션이 JSON string로 저장되므로 `JSON.parse`가 필요합니다.

## `src/klaytn/caver.js`: 설정된 설정 내에서 caver를 인스턴스화합니다.

```javascript
/**
 * caver-js library make a connection with klaytn node.
 * You could connect to specific klaytn node by changing 'rpcURL' value.
 * If you are running a klaytn full node, set rpcURL to your node's URL.
 * ex) rpcURL: 'http://localhost:8551'
 */
import Caver from 'caver-js'

export const config = {
  rpcURL: 'https://public-en-baobab.klaytn.net/'
}

export const cav = new Caver(config.rpcURL)

export default cav
```

참고) caver-js(또는 코드에서 `cav`)는 카이아 블록체인과 상호작용하기 위한 라이브러리입니다.\
참고) caver-js(또는 코드에서 `cav`)는 카이아 블록체인과 상호작용하기 위한 라이브러리입니다.\
After the connection is made, you can get the current block number from the node and invoke contract methods.

특정 카이아 노드를 'rpcURL'에 지정하여 연결할 수 있습니다.

- 카이아 풀 노드를 실행하는 경우, rpcURL을 노드의 URL로 설정할 수 있습니다.

  예를 들어, `rpcURL: 'http://localhost:8551'`
