# Getting-started

## Install
Need to install [Python](https://www.python.org/downloads/) 3.7.2+ first

Make example directory
```
> mkdir web3py-ext-examples & cd _$
```

Set python virtual environment (preferable but optional)
```
> python -m venv .venv
> . ./.venv/bin/activate
```

Install
```
> pip install web3py-ext
```

## Start

### Create file
```py fee-delegated-value-transfer.py
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.transaction.transaction import (
    fill_transaction,
    TX_TYPE_FEE_DELEGATED_VALUE_TRANSFER
)
from web3py_ext.utils.klaytn_utils import to_pretty

w3 = Web3(Web3.HTTPProvider('https://public-en-kairos.node.kaia.io'))
def web3_fee_delegated_value_transfer():
    user = Account.from_key('0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8')
    fee_delegator = Account.from_key('0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4')
    fee_delegated_value_transfer_tx = empty_tx(TX_TYPE_FEE_DELEGATED_VALUE_TRANSFER)
    fee_delegated_value_transfer_tx = merge(fee_delegated_value_transfer_tx, {
        'from' : user.address,
        'to' : user.address, # to feepayer
        'value' : Web3.to_peb(0.1, 'klay'),
    })

    fee_delegated_value_transfer_tx = fill_transaction(fee_delegated_value_transfer_tx, w3)

    # sign the kaia specific transaction type with web3py

    signed_tx = Account.sign_transaction(fee_delegated_value_transfer_tx, user.key)

    feepayer_signed_tx = Account.sign_transaction_as_feepayer(signed_tx.rawTransaction, fee_delegator.address, fee_delegator.key)

    decoded_tx = Account.decode_transaction(feepayer_signed_tx.rawTransaction)
    print("\ndecoded transaction:", to_pretty(decoded_tx))

    tx_hash = w3.eth.send_raw_transaction(feepayer_signed_tx.rawTransaction)

    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print('tx hash: ', tx_hash, 'receipt: ', tx_receipt)
web3_fee_delegated_value_transfer()
```
### Run

```
> python fee-delegated-value-transfer.py
```

### Output
```
decoded transaction: {
  "type": 9,
  "to": "0xA2a8854b1802D8Cd5De631E690817c253d6a9153",
  "value": 100000000000000000,
  "nonce": 43,
  "gasPrice": 50000000000,
  "gas": 63000,
  "from": "0xA2a8854b1802D8Cd5De631E690817c253d6a9153",
  "feePayer": "0xCb0eb737dfda52756495A5e08A9b37AAB3b271dA",
  "signatures": [
    {
      "v": 2037,
      "r": 93578354654414740427739002022919644896409290347939533211703795054759757354902,
      "s": 9134800547522066540800971891951614240623136207355204747806684032906366307747
    }
  ],
  "feePayerSignatures": [
    {
      "v": 2038,
      "r": 20302025172377290126887017758452014810405132492378310771239790273428447745777,
      "s": 53258287859492498716919703834973997323471810974924373733878093996195872661689
    }
  ],
  "chainId": 1001
}
tx hash:  0x205430ddd219681f4e1657b46aafa104609210d686554dfae8653eb22295d953 receipt:  AttributeDict({'blockHash': HexBytes('0x584ad0ac61625084509403db672087fac9e3967f09d5d4a7f96087f821848c77'), 'blockNumber': 126525583, 'contractAddress': None, 'cumulativeGasUsed': 31000, 'effectiveGasPrice': 25000000000, 'from': '0xA2a8854b1802D8Cd5De631E690817c253d6a9153', 'gasUsed': 31000, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': '0xA2a8854b1802D8Cd5De631E690817c253d6a9153', 'transactionHash': HexBytes('0x205430ddd219681f4e1657b46aafa104609210d686554dfae8653eb22295d953'), 'transactionIndex': 0, 'type': 0})
```