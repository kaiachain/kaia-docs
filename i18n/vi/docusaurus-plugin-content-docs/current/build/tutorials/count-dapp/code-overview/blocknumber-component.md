# Blocknumber Component

`src/components/BlockNumber.js`:

## `BlockNumber` component <a id="blocknumber-component"></a>

1\) Full code\
2\) BlockNumber component's role\
3\) `getBlockNumber` method in detail\
4\) Call `getBlockNumber` intervally

### 1\) Full code <a id="1-full-code"></a>

```javascript
import React, { Component } from 'react'

import { cav } from 'klaytn/caver'

import './BlockNumber.scss'

/**
 * BlockNumber component gets the current block number every 1 second.(1000ms)
 * current block number can be fetched through caver-js library
 * which make a connection, communicating with klaytn node.
 * cf) If you want to connect to specific klaytn node,
 * change 'rpcURL' config in klaytn/caver.js
 */
class BlockNumber extends Component {
  /**
   * BlockNumber component has a 'currentBlockNumber' state.
   */
  state = {
    currentBlockNumber: '...loading',
  }

  /**
   * 'getBlockNumber' method works
   * 1) get current block number from klaytn node by calling 'cav.klay.getBlockNumber()'
   * 2) set 'currentBlockNumber' state to the value fetched from step 1).
   */
  getBlockNumber = async () => {
    const blockNumber = await cav.klay.getBlockNumber()
    this.setState({ currentBlockNumber: blockNumber })
  }

  /**
   * intervalId value will be populated by the value returned from `setInterval`.
   * intervalId will be used to clear interval, preventing memory leak.
   */
  intervalId = null

  /**
   * In 'componentDidMount' lifecycle, call 'getBlockNumber' method intervally.
   */
  componentDidMount() {
    this.intervalId = setInterval(this.getBlockNumber, 1000)
  }

  /**
   * In 'componentWillUnmount' lifecycle, clear interval
   * which calls getBlockNumber per 1000ms.
   */
  componentWillUnmount() {
    if (this.intervalId) clearInterval(this.intervalId)
  }

  /**
   * In 'render' lifecycle, show 'currentBlockNumber' state like below:
   * <p>Block No. {currentBlockNumber}</p>
   */
  render() {
    const { currentBlockNumber } = this.state
    return (
      <div className="BlockNumber">
        <p className="BlockNumber__current">Block No. {currentBlockNumber}</p>
      </div>
    )
  }
}

export default BlockNumber
```

### 2\) BlockNumber component's role <a id="2-blocknumber-component-s-role"></a>

`BlockNumber` component's role is showing Kaia's current block number.\
It requests the current block number to the Kaia node by calling `caver.kaia.getBlockNumber()` every second. This component re-renders DOM through `this.setState({ currentBlockNumber: blockNumber })` upon receiving the response.

### 3\) `getBlockNumber` method in detail <a id="3-getblocknumber-method-in-detail"></a>

```javascript
/**
 * 'getBlockNumber' method works
 * 1) get current block number from klaytn node by calling 'cav.klay.getBlockNumber()'
 * 2) set 'currentBlockNumber' state to the value fetched from step 1).
 */
getBlockNumber = async () => {
  const blockNumber = await cav.klay.getBlockNumber()
  this.setState({ currentBlockNumber: blockNumber })
}
```

`getBlockNumber` method is declared as an async function. Declaring a function as async makes dealing with asynchronous value\(promise\) easy. `cav.klay.getBlockNumber` returns a promise, and the result can be handled easily by appending `await` keyword.

For further information about async-await keyword, see javascript's MDN site [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

After assigning the current block number returned from `cav.klay.getBlockNumber()` to `blockNumber`, we call `this.setState` React API. `this.setState({ currentBlockNumber: blockNumber })` literally sets the state property `currentBlockNumber` to `blockNumber`. `this.setState(nextState)` updates the current state and re-renders the component.

For further detail about React's this.setState and rendering mechanism, visit React's official site [https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html)

### 4\) Call `getBlockNumber` intervally <a id="4-call-getblocknumber-intervally"></a>

```javascript
/**
 * In 'componentDidMount' lifecycle, call 'getBlockNumber' method intervally.
 */
componentDidMount() {
  this.intervalId = setInterval(this.getBlockNumber, 1000)
}
```

Since we want our tutorial app to show current block number lively, we call `getBlockNumber` every second \(1000ms\). We can use `setInterval` function to do this. `setInterval(func, delay)` calls the given function repeatedly with given delay. `setInterval` function returns an interval id which will be used to clear this interval later, so we store it to `this.intervalId` variable.

```javascript
/**
 * In 'componentWillUnmount' lifecycle, clear interval
 * which calls getBlockNumber per 1000ms.
 */
componentWillUnmount() {
  if (this.intervalId) clearInterval(this.intervalId)
}
```

When the component unmounts, stop getting the current block number by removing the interval.
