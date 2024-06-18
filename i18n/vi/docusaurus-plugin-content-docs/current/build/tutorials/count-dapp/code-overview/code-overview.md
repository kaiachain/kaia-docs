# Frontend Code Overview

1. `src/index.js` - Entry point of our app
2. `static/index.html` - index.html
3. `src/routes.js` - Contains route definition
4. `src/App.js` - Root component of our app
5. `src/klaytn/caver.js` - Makes a connection with a Kaia node

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

`'index.js'` is main javascript file for our tutorial app. It is the entry point of our app.

It uses 'react-dom' library to render a React element into the DOM in the supplied container\('\#root'\) and return a reference to the component. In short, through 'react-dom' our tutorial app's DOM will be populated to `<div id="root"></div>` in `public/index.html` file.

## `static/index.html`: <a id="2-static-index-html"></a>

```markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <title>kaia blockchain-based app</title>
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

`index.html` is a HTML file for rendering our tutorial app.

For further information, visit React official site [https://reactjs.org/docs/react-dom.html\#render](https://reactjs.org/docs/react-dom.html#render)

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
As a root component, `'App.js'` component renders child components defined in `'route.js'` file.\
By above code, `'Count'` component would be rendered as a children of rootComponent when browser's URL path is `"/"`.

For further information, visit React router github [https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md](https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md)

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
        cav.kaia.accounts.wallet.add(JSON.parse(walletFromSession))
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

`'App.js'` is the root component of our tutorial app.

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
`{this.props.children}` will be populated according to `routes.js` file.\
If your browser's url path is `/`, it will render `<Count />` component.

```javascript
componentWillMount() {
  /**
   * sessionStorage is internet browser's feature which stores data
   * until the browser tab is closed.
   */
  const walletFromSession = sessionStorage.getItem('walletInstance')

  // If 'walletInstance' value exists, add it to caver's wallet
  if (walletFromSession) {
    try {
      cav.kaia.accounts.wallet.add(JSON.parse(walletFromSession))
    } catch (e) {
      // If value in sessionStorage is invalid wallet instance,
      // remove it from sessionStorage.
      sessionStorage.removeItem('walletInstance')
    }
  }
}
```

`componentWillMount` checks if there is a `walletInstance` session in the browser's sessionStorage.\
`walletInstance` session may not exist if you have never logged in our tutorial app.\
Otherwise, `walletInstance` session will exist as a JSON string, if so, it attempts to add the wallet instance to the caver's wallet.\
You can add a wallet instance to caver through `cav.kaia.accounts.wallet.add(JSON.parse(walletFromSession))`.\
For further information related `caver.kaia.accounts.wallet.add`, see [caver.kaia.accounts.wallet.add](../../../../references/sdk/caver-js-1.4.1/api/caver.kaia.accounts.md#wallet-add)

cf\) `JSON.parse` is needed since `walletInstance` session is stored as a JSON string.

## `src/klaytn/caver.js`: <a id="5-src-kaia-caver-js"></a>

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

`caver-js` library makes a connection to a Kaia node.\
After the connection is made, you can get the current block number from the node and invoke contract methods.

You can connect to a specific Kaia node by specifying it in the 'rpcURL'.

- If you are running a Kaia full node, you can set rpcURL to your node's URL.

  for example, `rpcURL: 'http://localhost:8551'`
