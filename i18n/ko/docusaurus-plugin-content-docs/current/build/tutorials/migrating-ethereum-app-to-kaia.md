# Migrate Ethereum App to Kaia

## 목차 <a href="#table-of-contents" id="table-of-contents"></a>

- [1. 소개](#1-introduction)
- [2. 카이아는 이더리움과 호환됩니다](#2-klaytn-has-ethereum-compatibility)
- [3. 이더리움에서 카이아로 노드 연결 변경하기](#3-change-node-connection-from-ethereum-to-klaytn)
- [4. 카이아 노드와 상호작용하기: `BlockNumber` 컴포넌트](#4-interact-with-klaytn-node-blocknumber-component)
- [5. 컨트랙트와 상호작용: `Count` 컴포넌트](#5-interact-with-the-contract-count-component)
  - [5-1. 카이아에 카운트 컨트랙트 배포하기](#5-1-deploy-count-contract-on-klaytn)
  - [5-2. 컨트랙트 인스턴스 생성](#5-2-create-a-contract-instance)
  - [5-3. 컨트랙트와 상호작용하기](#5-3-interact-with-contract)

## 1. 소개 <a href="#1-introduction" id="1-introduction"></a>

이 튜토리얼은 이더리움 앱을 카이아로 마이그레이션하는 방법을 안내하기 위한 것입니다. 카이아에 대한 사전 경험이 없어도 됩니다. A simple blockchain app will be used as a sample to show how to migrate an Ethereum App to Kaia.

여기서는 이더리움 앱을 카이아로 마이그레이션하는 데 필요한 코드 수정에만 집중하겠습니다. 카이아 dApp 생성에 대한 자세한 내용은 [CountdApp 튜토리얼](./count-dapp/count-dapp.md)을 참고하시기 바랍니다.

> **소스코드**\
> 전체 소스 코드는 GitHub에서 [https://github.com/klaytn/countbapp](https://github.com/klaytn/countbapp)에서 확인할 수 있습니다.

#### 대상 독자 <a href="#intended-audience" id="intended-audience"></a>

- [React](https://reactjs.org/)에 대한 기본 지식이 있다고 가정합니다. 샘플 코드는 React로 제작되었습니다.
- 블록체인 앱에 대한 기본적인 지식과 경험은 필요하지만, 카이아 사용 경험이 없어도 됩니다.

#### 테스트 환경 <a href="#testing-environment" id="testing-environment"></a>

CountdApp은 다음 환경에서 테스트되었습니다.

- MacOS Mojave 10.14.5
- Node 10.16.0(LTS)
- npm 6.9.0
- Python 2.7.10

## 2. 카이아는 이더리움과 호환됩니다 <a href="#2-klaytn-has-ethereum-compatibility" id="2-klaytn-has-ethereum-compatibility"></a>

카이아 런타임 환경은 이더리움 가상머신과 호환되며 Solidity로 작성된 스마트 컨트랙트를 실행합니다. 카이아의 RPC API와 다른 클라이언트 라이브러리는 가능한 한 이더리움과 거의 동일한 API 사양을 유지합니다. 따라서 이더리움 앱을 카이아로 마이그레이션하는 것은 매우 간단합니다. 이를 통해 개발자들은 새로운 블록체인 플랫폼으로 쉽게 이동할 수 있습니다.

## 3. 이더리움에서 카이아로 노드 연결 변경하기 <a href="#3-change-node-connection-from-ethereum-to-klaytn" id="3-change-node-connection-from-ethereum-to-klaytn"></a>

먼저 노드에 연결하는 라이브러리를 변경해야 합니다. 그런 다음 'rpcURL'에 노드 URL을 지정합니다. (참고. [이더리움의 롭스텐 테스트넷은 2022년 4분기에 종료될 예정입니다.](https://blog.ethereum.org/2022/06/21/testnet-deprecation) )

- Ethereum
  - `web3` 라이브러리는 이더리움 노드에 연결하여 통신합니다.
  - `롭스텐 테스트넷` URL은 'rpcURL'에 할당됩니다.
- Kaia
  - 카이아 노드에 연결하고 통신하기 위해 `caver-js` 라이브러리를 사용합니다.
  - 'rpcURL'에는 `Kairos 테스트넷` URL이 할당되어 있습니다.

`src/klaytn/caver.js`

```javascript
// import Web3 from 'web3'
import Caver from 'caver-js'

// const ROPSTEN_TESTNET_RPC_URL = 'https://ropsten.infura.io/'
const KAIROS_TESTNET_RPC_URL = 'https://public-en-kairos.node.kaia.io/'

// const rpcURL = ROPSTEN_TESTNET_RPC_URL
const rpcURL = KAIROS_TESTNET_RPC_URL

// const web3 = new Web3(rpcURL)
const caver = new Caver(rpcURL)

// export default web3
export default caver
```

## 4. 카이아 노드와 상호작용합니다: `BlockNumber` 컴포넌트 <a href="#4-interact-with-klaytn-node-blocknumber-component" id="4-interact-with-klaytn-node-blocknumber-component"></a>

![BlockNumber 컴포넌트](/img/build/tutorials/blocknumber-component.gif)

BlockNumber 컴포넌트는 1초(1000밀리초)마다 현재 블록 번호를 가져옵니다.

`web3` 라이브러리를 `caver-js`로 바꾸기만 하면 이더리움의 블록넘버 대신 카이아의 블록넘버를 실시간으로 동기화할 수 있습니다.

> 이더리움: [`web3.eth.getBlockNumber()`](https://web3js.readthedocs.io/en/v1.2.1/web3-eth.html#getblocknumber)\
> 카이아: [`caver.klay.getBlockNumber()`](../../references/sdk/caver-js-1.4.1/api/caver.klay/block.md#getblocknumber)

```js
// import web3 from 'ethereum/web3'
import caver from 'klaytn/caver'

class BlockNumber extends Component {
  state = { currentBlockNumber: '...loading' }

  getBlockNumber = async () => {
    // const blockNumber = await web3.eth.getBlockNumber()
    const blockNumber = await caver.klay.getBlockNumber()

    this.setState({ currentBlockNumber: blockNumber })
  }
  // ...
}

export default BlockNumber
```

\\`BlockNumber' 컴포넌트에 대한 자세한 내용은 [CountDapp 튜토리얼 - BlockNumber 컴포넌트](count-dapp/code-overview/blocknumber-component.md)를 참고하세요.

## 5. 컨트랙트와 상호작용: `Count` 컴포넌트 <a href="#5-interact-with-the-contract-count-component" id="5-interact-with-the-contract-count-component"></a>

![컴포넌트 카운트](/img/build/tutorials/count-component.gif)

컨트랙트와 상호작용하려면 배포된 컨트랙트의 인스턴스를 만들어야 합니다. With the instance, we can read and write the contract's data.

CountDapp을 이더리움에서 카이아로 마이그레이션하는 방법을 단계별로 알아봅시다!

- 5-1. 카이아에 `Count` 컨트랙트 배포하기
- 5-2. 컨트랙트 인스턴스 생성하기
- 5-3. 컨트랙트와 상호작용하기

### 5-1. 카이아에 `Count` 컨트랙트 배포 <a href="#5-1-deploy-count-contract-on-klaytn" id="5-1-deploy-count-contract-on-klaytn"></a>

첫 번째 단계는 카이아에 카운트 컨트랙트를 배포하고 컨트랙트 주소를 받는 것입니다. 대부분의 경우 카이아에서 이더리움 컨트랙트를 수정하지 않고 사용할 수 있습니다. [이더리움 컨트랙트 이식하기](../../build/smart-contracts/porting-ethereum-contract.md)를 참고하세요. 이 가이드에서는 Truffle을 사용하여 컨트랙트를 배포하겠습니다.

1. `Truffle-config.js`에서 네트워크 속성을 변경하여 카이아에 컨트랙트를 배포합니다.
2. Top up your account using [KAIA faucet](https://faucet.kaia.io).
3. `$ truffle deploy --network baobab --reset`을 입력합니다.
4. `count` 컨트랙트가 카이아 Kairos 테스트넷에 배포됩니다.

`Truffle-config.js`

```js
// const HDWalletProvider = require("truffle-hdwallet-provider")
const HDWalletProvider = require("truffle-hdwallet-provider-kaia")

// const NETWORK_ID = '3' // Ethereum, Ropsten testnet's network id
const NETWORK_ID = '1001' // Kaia, Kairos testnet's network id

// const RPC_URL = 'https://ropsten.infura.io/'
const RPC_URL = 'https://public-en-kairos.node.kaia.io'

// Change it to your own private key that has enough KAIA to deploy contract
const PRIVATE_KEY = '0x3de0c90ce7e440f19eff6439390c29389f611725422b79c95f9f48c856b58277'


module.exports = {
  networks: {
    /* ropsten: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, RPC_URL),
      network_id: NETWORK_ID,
      gas: '8500000',
      gasPrice: null,
    }, */

    kairos: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, RPC_URL),
      network_id: NETWORK_ID,
      gas: '8500000',
      gasPrice: null,
    },
  },
  compilers: {
    solc: {
      version: '0.5.6',
    },
  },
}
```

컨트랙트 배포에 대한 자세한 내용은 [CountDapp 튜토리얼 - 컨트랙트 배포](count-dapp/deploy-contracts.md#3-deploy-contract)를 참조하세요.

### 5-2. 컨트랙트 인스턴스 만들기 <a href="#5-2-create-a-contract-instance" id="5-2-create-a-contract-instance"></a>

`caver-js` API로 컨트랙트 인스턴스를 생성할 수 있습니다. 컨트랙트 인스턴스는 `Count` 컨트랙트에 대한 연결을 생성합니다. 이 인스턴스를 통해 컨트랙트 메서드를 호출할 수 있습니다.

> 이더리움 : [`web3.eth.Contract(ABI, address)`](https://web3js.readthedocs.io/en/v1.2.1/web3-eth-contract.html#new-contract)\
> 카이아 : [`caver.klay.Contract(ABI, address)`](../../references/sdk/caver-js-1.4.1/api/caver.klay.Contract.md#new-contract)

`src/components/Count.js`

```javascript
// import web3 from 'ethereum/web3'
import caver from 'klaytn/caver'

class Count extends Component {
  constructor() {
    /* const CountContract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new web3.eth.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS) */

    this.countContract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  }

  // ...
}
export default Count
```

### 5-3. 컨트랙트와 상호 작용 <a href="#5-3-interact-with-contract" id="5-3-interact-with-contract"></a>

Count 컨트랙트 인스턴스를 생성하는 데 사용되는 `ABI`(애플리케이션 바이너리 인터페이스)는 `caver-js`가 아래와 같이 컨트랙트의 메서드를 호출할 수 있도록 합니다. 카운트 컨트랙트를 마치 JavaScript 객체처럼 상호작용할 수 있습니다.

- 데이터 읽기(호출)\
  `CountContract.methods.count().call()`
- 데이터 쓰기(보내기)\
  `CountContract.methods.plus().send({ ... })`\
  `CountContract.methods.minus().send({ ... })`

이전 단계에서와 같이 컨트랙트 인스턴스를 생성한 후에는 컨트랙트 메서드를 사용할 때 코드를 수정할 필요가 없습니다. dApp 마이그레이션이 완료되었습니다!

#### `Count` 컴포넌트의 전체 코드 <a href="#full-code-count-component" id="full-code-count-component"></a>

`src/components/Count.js`

```js
import React, { Component } from 'react'
import cx from 'classnames'

import caver from 'klaytn/caver'

import './Count.scss'

class Count extends Component {
  constructor() {
    super()
    // ** 1. Create contract instance **
    // ex:) new caver.kaia.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
    // You can call contract method through this instance.
    // Now you can access the instance by `this.countContract` variable.
    this.countContract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new caver.kaia.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
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
    const walletInstance = caver.kaia.accounts.wallet && caver.kaia.accounts.wallet[0]

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
    this.countContract.methods.plus().send({
      from: walletInstance.address,
      gas: '200000',
    })
      .once('transactionHash', (txHash) => {
        console.log(`
          Sending a transaction... (Call contract's function 'plus')
          txHash: ${txHash}
          `
        )
      })
      .once('receipt', (receipt) => {
        console.log(`
          Received receipt! It means your transaction(calling plus function)
          is in kaia block(#${receipt.blockNumber})
        `, receipt)
        this.setState({
          settingDirection: null,
          txHash: receipt.transactionHash,
        })
      })
      .once('error', (error) => {
        alert(error.message)
        this.setState({ settingDirection: null })
      })
  }

  setMinus = () => {
    const walletInstance = caver.kaia.accounts.wallet && caver.kaia.accounts.wallet[0]

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
    this.countContract.methods.minus().send({
      from: walletInstance.address,
      gas: '200000',
    })
      .once('transactionHash', (txHash) => {
        console.log(`
          Sending a transaction... (Call contract's function 'minus')
          txHash: ${txHash}
          `
        )
      })
      .once('receipt', (receipt) => {
        console.log(`
          Received receipt which means your transaction(calling minus function)
          is in kaia block(#${receipt.blockNumber})
        `, receipt)
        this.setState({
          settingDirection: null,
          txHash: receipt.transactionHash,
        })
      })
      .once('error', (error) => {
        alert(error.message)
        this.setState({ settingDirection: null })
      })
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
        {Number(lastParticipant) !== 0 && (
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
              You can check your last transaction in kaiascope:
            </p>
            <a
              target="_blank"
              href={`https://kaiascope.com/tx/${txHash}`}
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
