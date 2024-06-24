---
sidebar_label: Convert from web3.js
---

# Porting from web.3js

Since caver-js has been evolved from [web3.js](https://github.com/ethereum/web3.js/), usage pattern of caver-js is very similar to that of web3.js. This means a software developed using web3.js can be easily converted to caver-js. The following examples are code patterns used in web3.js and caver-js, respectively.

```text
const Web3 = require('web3');
const web3 = new Web3(new web3.providers.HttpProvider('http://localhost:8545'));

web3.eth.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log)
```

```text
const Caver = require('caver-js');
const caver = new Caver(new Caver.providers.HttpProvider('http://localhost:8545'));

caver.kaia.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log)
```
