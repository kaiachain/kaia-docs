# Count 컴포넌트

`src/components/Count.js`는 다음과 같이 구성됩니다.

## `Count` 컴포넌트 <a href="#count-component" id="count-component"></a>

1\) 전체 코드\
2\) `count` 컴포넌트의 역할\
3\) 컨트랙트와 상호작용하는 방법\
4\) 컨트랙트와 상호작용하는 방법: `getCount` 메서드\
5\) 컨트랙트와 상호작용: `setPlus` 메서드\
6\) 트랜잭션 수명 주기

### 전체 코드 <a href="#1-full-code" id="1-full-code"></a>

```javascript
import React, { Component } from 'react'
import cx from 'classnames'

import { cav } from 'klaytn/caver'

import './Count.scss'

class Count extends Component {
  constructor() {
    super()
    // ** 1. Create contract instance **
    // ex:) new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
    // You can call contract method through this instance.
    // Now you can access the instance by `this.countContract` variable.
    this.countContract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
    this.state = {
      count: '',
      lastParticipant: '',
      isSetting: false,
    }
  }

  intervalId = null

  getCount = async () => {
    // ** 2. Call contract method (CALL) **
    // ex:) this.countContract.methods.methodName(arguments).call()
    // You can call contract method (CALL) like above.
    // For example, your contract has a method called `count`.
    // You can call it like below:
    // ex:) this.countContract.methods.count().call()
    // It returns promise, so you can access it by .then() or, use async-await.
    const count = await this.countContract.methods.count().call()
    const lastParticipant = await this.countContract.methods.lastParticipant().call()
    this.setState({
      count,
      lastParticipant,
    })
  }

  setPlus = () => {
    const walletInstance = cav.klay.accounts.wallet && cav.klay.accounts.wallet[0]

    // Need to integrate wallet for calling contract method.
    if (!walletInstance) return

    this.setState({ settingDirection: 'plus' })

    // 3. ** Call contract method (SEND) **
    // ex:) this.countContract.methods.methodName(arguments).send(txObject)
    // You can call contract method (SEND) like above.
    // For example, your contract has a method called `plus`.
    // You can call it like below:
    // ex:) this.countContract.methods.plus().send({
    //   from: '0x952A8dD075fdc0876d48fC26a389b53331C34585', // PUT YOUR ADDRESS
    //   gas: '200000',
    // })
    try{
      this.countContract.send({
        from: walletInstance.address,
        gas: '200000',
      }, 'plus')
        .then((receipt) => {
          console.log(`
            Received receipt! It means your transaction(calling plus function)
            is in klaytn block(#${receipt.blockNumber})
          `, receipt)
          this.setState({
            settingDirection: null,
            txHash: receipt.transactionHash,
          })
        })
    } catch (error) {
      alert(err.message)
      this.setState({ settingDirection: null })
    }
  }

  setMinus = () => {
    const walletInstance = cav.klay.accounts.wallet && cav.klay.accounts.wallet[0]

    // Need to integrate wallet for calling contract method.
    if (!walletInstance) return

    this.setState({ settingDirection: 'minus' })

    // 3. ** Call contract method (SEND) **
    // ex:) this.countContract.methods.methodName(arguments).send(txObject)
    // You can call contract method (SEND) like above.
    // For example, your contract has a method called `minus`.
    // You can call it like below:
    // ex:) this.countContract.methods.minus().send({
    //   from: '0x952A8dD075fdc0876d48fC26a389b53331C34585', // PUT YOUR ADDRESS
    //   gas: '200000',
    // })

    // It returns event emitter, so after sending, you can listen on event.
    // Use .on('transactionHash') event,
    // : if you want to handle logic after sending transaction.
    // Use .once('receipt') event,
    // : if you want to handle logic after your transaction is put into block.
    // ex:) .once('receipt', (data) => {
    //   console.log(data)
    // })
    try{
      this.countContract.send({
        from: walletInstance.address,
        gas: '200000',
      }, 'minus')
        .then((receipt) => {
          console.log(`
            Received receipt! It means your transaction(calling minus function)
            is in klaytn block(#${receipt.blockNumber})
          `, receipt)
          this.setState({
            settingDirection: null,
            txHash: receipt.transactionHash,
          })
        })
    } catch (error) {
      alert(err.message)
      this.setState({ settingDirection: null })
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.getCount, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { lastParticipant, count, settingDirection, txHash } = this.state
    return (
      <div className="Count">
        {lastParticipant && (
          <div className="Count__lastParticipant">
            last participant: {lastParticipant}
          </div>
        )}
        <div className="Count__count">COUNT: {count}</div>
        <button
          onClick={this.setPlus}
          className={cx('Count__button', {
            'Count__button--setting': settingDirection === 'plus',
          })}
        >
          +
        </button>
        <button
          onClick={this.setMinus}
          className={cx('Count__button', {
            'Count__button--setting': settingDirection === 'minus',
          })}
        >
          -
        </button>
        {txHash && (
          <div className="Count__lastTransaction">
            <p className="Count__lastTransactionMessage">
              You can check your last transaction in klaytn scope:
            </p>
            <a
              target="_blank"
              href={`https://baobab.klaytnfinder.io/tx/${txHash}`}
              className="Count__lastTransactionLink"
            >
              {txHash}
            </a>
          </div>
        )}
      </div>
    )
  }
}

export default Count
```

### `Count` 컴포넌트의 역할 <a href="#2-count-component-s-role" id="2-count-component-s-role"></a>

`Count` 컴포넌트의 역할은 카이아 블록체인에 배포된 Count 컨트랙트와 상호작용하는 것입니다.

Count.sol에서 다음과 같이 여러 변수와 함수를 선언했습니다.

- `count`
- `lastParticipant`
- `plus`: `count` 저장소 변수를 1씩 증가시킵니다. (count = count + 1)
- `minus`: `count` 저장소 변수를 1씩 감소시킵니다. (count = count - 1)

Count.js 컴포넌트에는 Count 컨트랙트의 함수 및 변수와 상호작용하는 메서드가 있습니다.

### 컨트랙트와 상호작용하는 방법 <a href="#3-how-to-interact-with-contract" id="3-how-to-interact-with-contract"></a>

컨트랙트와 상호 작용하려면 배포된 컨트랙트의 컨트랙트 인스턴스가 필요합니다.\
컨트랙트 인스턴스는 caver-js의 `caver.klay.Contract(ABI, contractAddress)` API를 통해 만들 수 있습니다. 자세한 내용은 [caver.klay.Contract](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.Contract.md#new-contract)를 참고하세요.

`Contract ABI`(애플리케이션 바이너리 인터페이스)를 사용하면 caver는 컨트랙트 메서드를 로컬 함수인 것처럼 호출할 수 있습니다.\
예)\
`contractInstance.methods.count().call()`\
`contractInstance.methods.plus().send({ ... })`\
`contractInstance.methods.minus().send({ ... })`

`Contract address`는 컨트랙트를 컴파일하고 배포한 후 `build/contracts/Count.json` 파일에서 확인할 수 있습니다. 테스트 편의를 위해 카이아 테스트넷에 컨트랙트를 배포하고 디렉터리에 `deployedABI`와 `deployedAddress` 파일을 포함시켰습니다. 이러한 파일에는 Count 컨트랙트의 ABI와 배포된 컨트랙트 주소가 포함되어 있습니다.\
웹팩 구성 덕분에 변수를 통해 이 파일에 액세스할 수 있습니다. (`DEPLOYED_ADDRESS`, `DEPLOYED_ABI`)

예)\
`DEPLOYED_ADDRESS`는 배포된 연락처 ddress를 반환합니다.\
`DEPLOYED_ABI`는 카운트 contract ABI를 반환합니다.

```javascript
constructor() {
  super()
  // ** 1. Create contract instance **
  // ex:) new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  // You can call contract method through this instance.
  // Now you can access the instance by `this.countContract` variable.
  this.countContract = DEPLOYED_ABI
    && DEPLOYED_ADDRESS
    && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  ...
}
```

`this.countContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)`는 배포된 `Count` 컨트랙트와 상호작용할 컨트랙트 인스턴스를 생성하고, `DEPLOYED_ABI`와 `DEPLOYED_ADDRESS`를 `cav.klay.Contract` API에 전달합니다. 그리고 이 컨트랙트 인스턴스는 `this.countContract`에 저장됩니다.

### 컨트랙트와 상호작용: `getCount` 메서드 <a href="#4-interact-with-contract-getcount-method" id="4-interact-with-contract-getcount-method"></a>

```javascript
getCount = async () => {
  // ** 2. Call contract method (CALL) **
  // ex:) this.countContract.methods.methodName(arguments).call()
  // You can call contract method (CALL) like above.
  // For example, your contract has a method called `count`.
  // You can call it like below:
  // ex:) this.countContract.methods.count().call()
  // It returns promise, so you can access it by .then() or, use async-await.
  const count = await this.countContract.methods.count().call()
  const lastParticipant = await this.countContract.methods.lastParticipant().call()
  this.setState({
    count,
    lastParticipant,
  })
}
```

컨트랙트 인스턴스가 있으므로 컨트랙트 메서드를 호출할 수 있습니다. 컨트랙트 인스턴스에는 `methods`라는 프로퍼티가 있습니다.\
여기에는 컨트랙트의 함수(예: `count`, `lastParticipant`, `plus`, `minus`)가 포함됩니다.

위 코드에서 `getCount` 함수는 컨트랙트 함수 호출이 프로미스 객체를 반환하기 때문에 `async`로 선언되어 있습니다. `this.countContract.methods.count().call()`를 호출하여 `count`를 가져올 수 있습니다.

`lastParticipant` 주소는 `this.countContract.methods.lastParticipant().call()`를 호출하여 가져올 수 있습니다.

이러한 변수를 가져온 후, 받은 값으로 상태 속성인 `count`와 `lastParticipant`를 설정합니다.

컨트랙트 메서드 호출에 대한 자세한 내용은 [caver.klay.Contract](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.Contract.md#methods)를 참조하세요.

```javascript
componentDidMount() {
  this.intervalId = setInterval(this.getCount, 1000)
}

componentWillUnmount() {
  clearInterval(this.intervalId)
}
```

1초마다 `count` 변수를 가져오고 싶으면 `setInterval`을 사용하면 됩니다.
이는 `BlockNumber.js`의 `getBlockNumber`에서 `caver.klay.getBlockNumber()`를 간격으로 호출하는 것과 동일합니다.

### 컨트랙트와 상호작용: `setPlus` 메서드 <a href="#5-interact-with-contract-setplus-method" id="5-interact-with-contract-setplus-method"></a>

```javascript
setPlus = () => {
  const walletInstance = cav.klay.accounts.wallet && cav.klay.accounts.wallet[0]

  // Need to integrate wallet for calling contract method.
  if (!walletInstance) return

  this.setState({ settingDirection: 'plus' })

  // 3. ** Call contract method (SEND) **
  // ex:) this.countContract.methods.methodName(arguments).send(txObject)
  // You can call contract method (SEND) like above.
  // For example, your contract has a method called `plus`.
  // You can call it like below:
  // ex:) this.countContract.methods.plus().send({
  //   from: '0x952A8dD075fdc0876d48fC26a389b53331C34585', // PUT YOUR ADDRESS
  //   gas: '200000',
  // })
  try{
    this.countContract.send({
      from: walletInstance.address,
      gas: '200000',
    }, 'plus')
      .then((receipt) => {
        console.log(`
          Received receipt! It means your transaction(calling plus function)
          is in klaytn block(#${receipt.blockNumber})
        `, receipt)
        this.setState({
          settingDirection: null,
          txHash: receipt.transactionHash,
        })
      })
  } catch (error) {
    alert(err.message)
    this.setState({ settingDirection: null })
  }
}
```

`setPlus` 함수는 Count 컴포넌트에서 가장 중요한 부분입니다. 컨트랙트 함수 `plus`를 호출하여 컨트랙트와 상호작용합니다. 이 함수 역시 컨트랙트 메서드이므로 `this.counterContract.methods`에 포함되어 있습니다.

다만, 데이터를 읽기만 하는 `count`, `lastParticipant`와 달리 `plus` 함수는 카이아 블록체인에 데이터를 **쓰는 역할**을 합니다.\
데이터를 읽는 것은 무료이지만 데이터를 쓰는 것은 계산 및 저장소 사용에 대한 비용이 발생합니다. 비용은 사용된 `gas`의 양으로 측정됩니다.

따라서 트랜잭션을 전송하려면 트랜잭션 수수료를 부담할 카이아 노드를 알리기 위해 `from:` 속성이 필요합니다. `gas:` 속성은 트랜잭션 발신자가 트랜잭션에 대해 지불하고자 하는 최대 가스 양을 정의합니다.

```javascript
this.countContract.methods.plus().send({
  from: walletInstance.address,
  gas: '200000',
})
```

트랜잭션을 보내려면 `.call()` 대신 `.send()`를 사용하세요.

```javascript
.send({
  from: ...,
  gas: ...
})
```

### 트랜잭션 수명 주기 <a href="#6-transaction-life-cycle" id="6-transaction-life-cycle"></a>

```javascript
try{
  this.countContract.send({
    from: walletInstance.address,
    gas: '200000',
  }, 'plus')
    .then((receipt) => {
      console.log(`
        Received receipt! It means your transaction(calling plus function)
        is in klaytn block(#${receipt.blockNumber})
      `, receipt)
      this.setState({
        settingDirection: null,
        txHash: receipt.transactionHash,
      })
    })
} catch (error) {
  alert(err.message)
  this.setState({ settingDirection: null })
}
```

트랜잭션을 전송한 후 라이프사이클에 따라 트랜잭션 상태를 확인할 수 있습니다.

`transactionHash` 이벤트는 트랜잭션 해시를 가져올 때 발생합니다. 네트워크를 통해 트랜잭션을 전송하기 전에 사용할 수 있습니다.

트랜잭션 영수증을 받을 수 있을 때 `receipt` 이벤트가 발생합니다. 이는 트랜잭션이 블록에 들어갔음을 의미합니다. 트랜잭션이 포함된 블록 번호는 `receipt.blockNumber`로 확인할 수 있습니다.

`error`는 트랜잭션 전송 중 에러가 발생했을 때 발생합니다.

참고) `settingDirection`은 로딩 표시기(gif)를 표시하는 데 사용됩니다. 트랜잭션이 블록에 포함되면 `settingDirection`에 `null`을 할당하여 로딩 표시기를 제거합니다.

```javascript
<button
  onClick={this.setPlus}
  className={cx('Count__button', {
    'Count__button--setting': settingDirection === 'plus',
  })}
>
  +
</button>
```

"+" 버튼을 클릭하여 이 함수를 호출할 수 있습니다.

"+" 버튼을 클릭한 후 요약하면 다음과 같습니다.

1. 컨트랙트 메서드인 `plus`를 호출하는 트랜잭션을 전송합니다.
2. 트랜잭션을 전송한 직후 트랜잭션 해시를 받게 됩니다.\
   3-a. 트랜잭션이 처리되어 블록에 포함되면 트랜잭션 영수증을 받게 됩니다.\
   3-b. 트랜잭션을 전송하는 동안 오류가 발생하면 오류를 받게 됩니다. 그리고 `receipt` 블록은 절대 호출되지 않습니다.

`plus` 메서드를 호출하는 전체 코드는 아래와 같습니다:

```javascript
try{
  this.countContract.send({
    from: walletInstance.address,
    gas: '200000',
  }, 'plus')
    .then((receipt) => {
      console.log(`
        Received receipt! It means your transaction(calling plus function)
        is in klaytn block(#${receipt.blockNumber})
      `, receipt)
      this.setState({
        settingDirection: null,
        txHash: receipt.transactionHash,
      })
    })
} catch (error) {
  alert(err.message)
  this.setState({ settingDirection: null })
}
```

### 블록체인에서 내 트랜잭션을 확인하려면 어떻게 해야 하나요? <a href="#how-can-i-check-my-transaction-in-the-blockchain" id="how-can-i-check-my-transaction-in-the-blockchain"></a>

![거래 확인](/img/build/tutorials/tutorial-check-your-transaction.gif)

트랜잭션을 전송한 후, Kaiascope을 사용하여 트랜잭션 세부 정보를 확인할 수 있습니다.\
`https://baobab.klaytnscope.com/tx/${txHash}`에서 확인할 수 있습니다.
