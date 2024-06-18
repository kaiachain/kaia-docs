# BlockNumber 컴포넌트

`src/components/BlockNumber.js`:

## `BlockNumber` 컴포넌트 <a id="blocknumber-component"></a>

1\) 전체 코드\
2\) `BlockNumber` 컴포넌트의 역할\
3\) `getBlockNumber` 메서드 상세 정보\
4\) `getBlockNumber`의 간헐적 호출

### 1. 전체 코드 <a id="1-full-code"></a>

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

### 2. BlockNumber 컴포넌트의 역할 <a id="2-blocknumber-component-s-role"></a>

`BlockNumber` 컴포넌트의 역할은 클레이튼의 현재 블록 번호를 표시하는 것입니다.\
이 컴포넌트는 매초마다 `caver.klay.getBlockNumber()`를 호출하여 현재 블록 번호를 Klaytn 노드에 요청합니다.\
It requests the current block number to the Kaia node by calling `caver.kaia.getBlockNumber()` every second. 이 컴포넌트는 응답을 받으면 `this.setState({ currentBlockNumber: blockNumber })`를 통해 DOM을 다시 렌더링합니다.

### 3. `getBlockNumber` 메서드 자세히 보기 <a id="3-getblocknumber-method-in-detail"></a>

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

`getBlockNumber` 메서드는 비동기 함수로 선언됩니다. 함수를 비동기로 선언하면 비동기 값(프로미스)을 쉽게 처리할 수 있습니다. `cav.klay.getBlockNumber`는 프로미스를 반환하며, `await` 키워드를 추가하면 결과를 쉽게 처리할 수 있습니다.

비동기 대기 키워드에 대한 자세한 내용은 JavaScript MDN 사이트 [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)를 참조하세요.

`cav.klay.getBlockNumber()`에서 반환된 현재 블록 번호를 `blockNumber`에 할당하고 나서, `this.setState` React API를 호출합니다. `this.setState({ currentBlockNumber: blockNumber })`는 말 그대로 상태 속성 `currentBlockNumber`를 `blockNumber`로 설정합니다. `this.setState(nextState)`는 현재 상태를 업데이트하고 컴포넌트를 다시 렌더링합니다.

React의 this.setState와 렌더링 메커니즘에 대한 자세한 내용은 React의 공식 사이트 [https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html)에서 확인할 수 있습니다.

### 4. `getBlockNumber`를 간헐적으로 호출하기 <a id="4-call-getblocknumber-intervally"></a>

```javascript
/**
 * In 'componentDidMount' lifecycle, call 'getBlockNumber' method intervally.
 */
componentDidMount() {
  this.intervalId = setInterval(this.getBlockNumber, 1000)
}
```

튜토리얼 앱에 현재 블록 번호를 생생하게 표시하고 싶기 때문에 매 초마다 `getBlockNumber`를 호출합니다(1000ms). 이를 위해 `setInterval` 함수를 사용할 수 있습니다. `setInterval(func, delay)`은 주어진 함수를 주어진 지연 시간으로 반복해서 호출합니다. `setInterval` 함수는 나중에 이 간격을 지우는 데 사용될 간격 ID를 반환하므로 `this.intervalId` 변수에 저장합니다.

```javascript
/**
 * In 'componentWillUnmount' lifecycle, clear interval
 * which calls getBlockNumber per 1000ms.
 */
componentWillUnmount() {
  if (this.intervalId) clearInterval(this.intervalId)
}
```

컴포넌트가 마운트 해제되면 간격을 제거하여 현재 블록 번호 가져오기를 중지합니다.
