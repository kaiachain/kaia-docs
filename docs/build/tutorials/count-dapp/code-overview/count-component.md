# Count Component

`src/components/Count.js` goes as follows,

## `Count` component <a href="#count-component" id="count-component"></a>

1\) Full code\
2\) `Count` component's role\
3\) How to interact with contract?\
4\) Interact with contract: `getCount` method\
5\) Interact with contract: `setPlus` method\
6\) Transaction life cycle

### 1) Full code <a href="#1-full-code" id="1-full-code"></a>

```javascript
import React, { Component } from 'react'
import cx from 'classnames'

import { cav } from 'klaytn/caver'

import './Count.scss'

class Count extends Component {
  constructor() {
    super()
    // ** 1. Create contract instance **
    // ex:) new cav.kaia.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
    // You can call contract method through this instance.
    // Now you can access the instance by `this.countContract` variable.
    this.countContract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new cav.kaia.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
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
    const walletInstance = cav.kaia.accounts.wallet && cav.kaia.accounts.wallet[0]

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
    const walletInstance = cav.kaia.accounts.wallet && cav.kaia.accounts.wallet[0]

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

### 2) `Count` component's role <a href="#2-count-component-s-role" id="2-count-component-s-role"></a>

`'Count'` component's role is interacting with Count contract deployed on the Kaia blockchain.

In Count.sol, we declared several variables and functions like below:

* `count`
* `lastParticipant`
* `plus`: increase `count` storage variable by 1. (count = count + 1)
* `minus`: decrease `count` storage variable by 1. (count = count - 1)

In Count.js component, we have methods to interact with the functions and variables of the Count contract.

### 3) How to interact with contract? <a href="#3-how-to-interact-with-contract" id="3-how-to-interact-with-contract"></a>

To interact with the contract, we need a contract instance of the deployed contract.\
The contract instance can be made through `caver.kaia.Contract(ABI, contractAddress)` API of caver-js. For more details, see [caver.kaia.Contract](../../../../references/sdk/caver-js-1.4.1/api/caver.kaia.Contract.md#new-contract).

With `Contract ABI`(Application Binary Interface), caver can call the contract method as if it is a local function,\
for example)\
`contractInstance.methods.count().call()`\
`contractInstance.methods.plus().send({ ... })`\
`contractInstance.methods.minus().send({ ... })`

`Contract address` can be found in the `build/contracts/Count.json` file after compiling and deploying the contract. For your testing convenience, we deployed the contract to the Kaia testnet, and included the `deployedABI` and `deployedAddress` files in the directory. Those files contain the ABI of the Count contract and the deployed contract address.\
Thanks to the webpack configuration, we can access them via variables. (`DEPLOYED_ADDRESS`, `DEPLOYED_ABI`)

For example)\
`DEPLOYED_ADDRESS` returns the deployed contact address.\
`DEPLOYED_ABI` returns the Count contract ABI.

```javascript
constructor() {
  super()
  // ** 1. Create contract instance **
  // ex:) new cav.kaia.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  // You can call contract method through this instance.
  // Now you can access the instance by `this.countContract` variable.
  this.countContract = DEPLOYED_ABI
    && DEPLOYED_ADDRESS
    && new cav.kaia.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  ...
}
```

`this.countContract = new cav.kaia.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)` creates a contract instance to interact with the deployed `Count` contract, by passing `DEPLOYED_ABI` and `DEPLOYED_ADDRESS` to the `cav.kaia.Contract` API. And this contract instance is stored to `this.countContract`.

### 4) Interact with contract: `getCount` method <a href="#4-interact-with-contract-getcount-method" id="4-interact-with-contract-getcount-method"></a>

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

Since we have a contract instance, we can call contract methods. Contract instance has a property, `methods`.\
It contains the functions of the contract, for example, `count`, `lastParticipant`, `plus`, and `minus`.

In the above code, `getCount` function is declared as `async`, since contract function call returns a promise object. We can fetch the `count` by calling `this.countContract.methods.count().call()`.

We can fetch the `lastParticipant` address by calling `this.countContract.methods.lastParticipant().call()`.

After fetching those variables, we set the state properties, `count` and `lastParticipant` with the received values.

For further information about calling contract methods, see [caver.kaia.Contract](../../../../references/sdk/caver-js-1.4.1/api/caver.kaia.Contract.md#methods)

```javascript
componentDidMount() {
  this.intervalId = setInterval(this.getCount, 1000)
}

componentWillUnmount() {
  clearInterval(this.intervalId)
}
```

We want to fetch the `count` variable per 1 second, it can be achieved by `setInterval`.
It is the same as we did in the `getBlockNumber` in `BlockNumber.js` which calls `caver.kaia.getBlockNumber()` intervally.

### 5) Interact with contract: `setPlus` method <a href="#5-interact-with-contract-setplus-method" id="5-interact-with-contract-setplus-method"></a>

```javascript
setPlus = () => {
  const walletInstance = cav.kaia.accounts.wallet && cav.kaia.accounts.wallet[0]

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

`setPlus` function is the most important part in Count component. It interacts with the contract by calling contract function `plus`. Since this function is also a contract method, it is contained in the `this.counterContract.methods`.

However, unlike `count` and `lastParticipant` that just reads data, `plus` function **writes data** to the Kaia blockchain.\
Reading data is free, however writing data incurs cost for the use of computation and storage. The cost is measured by the amount of `gas` used.

By this reason, sending a transaction needs `from:` property to inform the Kaia node who is responsible for the transaction fee. `gas:` property defines the maximum amount of gas the transaction sender is willing to pay for the transaction.

```javascript
this.countContract.methods.plus().send({
  from: walletInstance.address,
  gas: '200000',
})
```

To send a transaction, use `.send()` instead of `.call()`.

```javascript
.send({
  from: ...,
  gas: ...
})
```

### 6) Transaction life cycle <a href="#6-transaction-life-cycle" id="6-transaction-life-cycle"></a>

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

After sending a transaction, you can get the transaction status along the life cycle.

`transactionHash` event is fired when you get the transaction hash. It is available before sending the transaction over the network.

`receipt` is fired,when you can get the transaction receipt. It means you transaction got into the block. You can get the block number that contains your transaction by `receipt.blockNumber`.

`error` is fired when an error occurred while sending a transaction.

cf) `settingDirection` is used to display a loading indicator(gif). Once the transaction is included in a block, remove the loading indicator by assigning `null` to `settingDirection`.

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

You can call this function by clicking + button.

To recap, after clicking + button,

1. You will send a transaction which calls the contract method, `plus`.
2. Just after sending a transaction, you will receive the transaction hash.\
   3-a. After your transaction has been processed and included in a block, you will receive the transaction receipt.\
   3-b. If there were errors while sending a transaction, you will receive an error. And `receipt` block will never be called.

Full code for invoking `plus` method is as below:

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

### How can I check my transaction in the blockchain? <a href="#how-can-i-check-my-transaction-in-the-blockchain" id="how-can-i-check-my-transaction-in-the-blockchain"></a>

![check-transaction](/img/build/tutorials/tutorial-check-your-transaction.gif)

After sending a transaction, you can check your transaction detail using Kaiascope.\
Check it in `https://baobab.klaytnscope.com/tx/${txHash}`.
