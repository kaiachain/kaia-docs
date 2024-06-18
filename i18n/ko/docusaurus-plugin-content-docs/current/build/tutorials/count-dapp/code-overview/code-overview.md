# 프론트엔드 코드 개요

1. `src/App.js`
2. `static/index.html` - index.html
3. `src/routes.js` - 경로 정의 포함
4. `src/components`: 페이지를 구성하는 컴포넌트 파일을 포함합니다.
5. `src/klaytn/caver.js` - 클레이튼 노드와의 연결을 생성합니다.

## `src/index.js`: <a id="1-src-index-js"></a>

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

## `static/index.html`: <a id="2-static-index-html"></a>

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

## `src/routes.js`: <a id="3-src-routes-js"></a>

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

`'routes.js'` contains the route definition for our tutorial app.\
`routes.js`에는 튜토리얼 앱의 경로 정의가 포함되어 있습니다.\
`App.js`는 전체 컴포넌트의 루트 컴포넌트 파일입니다.\
위 코드에서 `Count` 컴포넌트는 브라우저의 URL 경로가 `"/"`일 때 rootComponent의 자식으로 렌더링됩니다.\
`BlockNumber`, `Auth` 및 `{this.props.children}` 컴포넌트를 렌더링합니다.\
이 `{this.props.children}` 컴포넌트는 `routes.js` 파일에 따라 채워집니다.\
브라우저의 URL 경로가 `/`인 경우 `<Count />` 컴포넌트를 렌더링합니다.

자세한 내용은 React 라우터 GitHub [https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md](https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md)에서 확인하세요.

## `src/App.js`: <a id="4-src-app-js"></a>

```javascript
import React, { Component } from 'react'

import { cav } from 'klaytn/caver'
import BlockNumber from 'components/BlockNumber'
import Auth from 'components/Auth'

import './App.scss'

class App extends Component {
  componentWillMount() {
    /**
     * sessionStorage is internet browser's feature which stores data
     * until the browser tab is closed.
     */
    const walletFromSession = sessionStorage.getItem('walletInstance')

    // If 'walletInstance' value exists, add it to caver's wallet
    if (walletFromSession) {
      try {
        cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))
      } catch (e) {
        // If value in sessionStorage is invalid wallet instance,
        // remove it from sessionStorage.
        sessionStorage.removeItem('walletInstance')
      }
    }
  }

  render() {
    return (
      <div className="App">
        <BlockNumber />
        <Auth />
        {this.props.children}
      </div>
    )
  }
}

export default App
```

`'App.js'`는 튜토리얼 앱의 전체 컴포넌트를 위한 루트 컴포넌트 파일입니다.

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

It renders `BlockNumber`, `Auth` and `{this.props.children}` component.\
이 파일이 앱의 시작점입니다.\
If your browser's url path is `/`, it will render `<Count />` component.

```javascript
컴포넌트가 마운트되기 전에 브라우저의 세션스토리지에 `walletInstance` 세션이 있는지 확인합니다.\
튜토리얼 앱에 로그인한 적이 없는 경우 `walletInstance` 세션이 존재하지 않을 수 있습니다.\
그렇지 않은 경우, `walletInstance` 세션이 JSON string로 존재할 것이며, 존재한다면 지갑 인스턴스를 caver의 지갑에 추가하려고 시도합니다.\
caver에 지갑 인스턴스를 추가하려면 `cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))`를 통해 지갑 인스턴스를 추가할 수 있습니다.\
`caver.klay.accounts.wallet.add`와 관련된 자세한 내용은 [caver.klay.accounts.wallet.add](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#wallet-add)를 참고하시기 바랍니다.
```

`componentWillMount` checks if there is a `walletInstance` session in the browser's sessionStorage.\
`walletInstance` session may not exist if you have never logged in our tutorial app.\
Otherwise, `walletInstance` session will exist as a JSON string, if so, it attempts to add the wallet instance to the caver's wallet.\
You can add a wallet instance to caver through `cav.kaia.accounts.wallet.add(JSON.parse(walletFromSession))`.\
For further information related `caver.kaia.accounts.wallet.add`, see [caver.kaia.accounts.wallet.add](../../../../references/sdk/caver-js-1.4.1/api/caver.kaia.accounts.md#wallet-add)

참고) `walletInstance` 세션이 JSON string로 저장되므로 `JSON.parse`가 필요합니다.

## `src/klaytn/caver.js`: <a id="5-src-klaytn-caver-js"></a>

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

참고) caver-js(또는 코드에서 `cav`)는 클레이튼 블록체인과 상호작용하기 위한 라이브러리입니다.\
연결이 완료되면 노드에서 현재 블록 번호를 가져와 컨트랙트 메서드를 호출할 수 있습니다.\
After the connection is made, you can get the current block number from the node and invoke contract methods.

특정 클레이튼 노드를 'rpcURL'에 지정하여 연결할 수 있습니다.

- 클레이튼 풀 노드를 실행하는 경우, rpcURL을 노드의 URL로 설정할 수 있습니다.

  예를 들어, `rpcURL: 'http://localhost:8551'`
