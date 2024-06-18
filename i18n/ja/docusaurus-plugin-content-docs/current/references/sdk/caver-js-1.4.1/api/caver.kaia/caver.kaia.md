---
description: A JavaScript wrapper to Kaia APIs around the namespace 'kaia'.
---

# caver.kaia

The `caver-kaia` package allows you to interact with the Kaia nodes.  The list below
enumerates the API functions that are currently supported in `caver-js`.

## [Account](./account.md) <a id="account"></a>

- [defaultAccount](./account.md#defaultaccount)
- [accountCreated](./account.md#accountcreated)
- [getAccount](./account.md#getaccount)
- [getAccounts](./account.md#getaccounts)
- [getAccountKey](./account.md#getaccountkey)
- [getBalance](./account.md#getbalance)
- [getCode](./account.md#getcode)
- [getTransactionCount](./account.md#gettransactioncount)
- [isContractAccount](./account.md#iscontractaccount)
- [sign](./account.md#sign)

## [Block](./block.md) <a id="block"></a>

- [defaultBlock](./block.md#defaultblock)
- [getBlockNumber](./block.md#getblocknumber)
- [getBlock](./block.md#getblock)
- [getBlockReceipts](./block.md#getblockreceipts)
- [getBlockTransactionCount](./block.md#getblocktransactioncount)
- [getBlockWithConsensusInfo](./block.md#getblockwithconsensusinfo)
- [getCommittee](./block.md#getcommittee)
- [getCommitteeSize](./block.md#getcommitteesize)
- [getCouncil](./block.md#getcouncil)
- [getCouncilSize](./block.md#getcouncilsize)
- [getStorageAt](./block.md#getstorageat)
- [isMining](./block.md#ismining)
- [isSyncing](./block.md#issyncing)

## [Transaction](./transaction/transaction.md) <a id="transaction"></a>

- [call](./transaction/transaction.md#call)
- [estimateGas](./transaction/transaction.md#estimategas)
- [estimateComputationCost](./transaction/transaction.md#estimatecomputationcost)
- [decodeTransaction](./transaction/transaction.md#decodetransaction)
- [getTransaction](./transaction/transaction.md#gettransaction)
- [getTransactionBySenderTxHash](./transaction/transaction.md#gettransactionbysendertxhash)
- [getTransactionFromBlock](./transaction/transaction.md#gettransactionfromblock)
- [getTransactionReceipt](./transaction/transaction.md#gettransactionreceipt)
- [getTransactionReceiptBySenderTxHash](./transaction/transaction.md#gettransactionreceiptbysendertxhash)
- [sendSignedTransaction](./transaction/transaction.md#sendsignedtransaction)
- [sendTransaction (Legacy)](./transaction/sendtx-legacy.md#sendtransaction-legacy)
- [sendTransaction (VALUE_TRANSFER)](./transaction/sendtx-value-transfer.md#sendtransaction-value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER)](./transaction/sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO)](./transaction/sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer_with_ratio)
- [sendTransaction (VALUE_TRANSFER_MEMO)](./transaction/sendtx-value-transfer-memo.md#sendtransaction-value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO)](./transaction/sendtx-value-transfer-memo.md#sendtransaction-fee_delegated_value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO)](./transaction/sendtx-value-transfer-memo.md#sendtransaction-fee_delegated_value_transfer_memo_with_ratio)
- [sendTransaction (ACCOUNT_UPDATE)](./transaction/sendtx-account-update.md#sendtransaction-account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE)](./transaction/sendtx-account-update.md#sendtransaction-fee_delegated_account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO)](./transaction/sendtx-account-update.md#sendtransaction-fee_delegated_account_update_with_ratio)
- [sendTransaction (SMART_CONTRACT_DEPLOY)](./transaction/sendtx-smart-contract-deploy.md#sendtransaction-smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY)](./transaction/sendtx-smart-contract-deploy.md#sendtransaction-fee_delegated_smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO)](./transaction/sendtx-smart-contract-deploy.md#sendtransaction-fee_delegated_smart_contract_deploy_with_ratio)
- [sendTransaction (SMART_CONTRACT_EXECUTION)](./transaction/sendtx-smart-contract-execution.md#sendtransaction-smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION)](./transaction/sendtx-smart-contract-execution.md#sendtransaction-fee_delegated_smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO)](./transaction/sendtx-smart-contract-execution.md#sendtransaction-fee_delegated_smart_contract_execution_with_ratio)
- [sendTransaction (CANCEL)](./transaction/sendtx-cancel.md#sendtransaction-cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL)](./transaction/sendtx-cancel.md#sendtransaction-fee_delegated_cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL_WITH_RATIO)](./transaction/sendtx-cancel.md#sendtransaction-fee_delegated_cancel_with_ratio)
- [signTransaction](./transaction/transaction.md#signtransaction)

## [Configuration](./config.md) <a id="configuration"></a>

- [gasPriceAt](./config.md#gaspriceat)
- [getChainId](./config.md#getchainid)
- [getGasPrice](./config.md#getgasprice)
- [getNodeInfo](./config.md#getnodeinfo)
- [getProtocolVersion](./config.md#getprotocolversion)
- [isSenderTxHashIndexingEnabled](./config.md#issendertxhashindexingenabled)
- [isParallelDBWrite](./config.md#isparalleldbwrite)
- [rewardbase](./config.md#rewardbase)

## [Filter](./filter.md) <a id="filter"></a>

- [getFilterChanges](./filter.md#getfilterchanges)
- [getFilterLogs](./filter.md#getfilterlogs)
- [getPastLogs](./filter.md#getpastlogs)
- [newBlockFilter](./filter.md#newblockfilter)
- [newFilter](./filter.md#newfilter)
- [newPendingTransactionFilter](./filter.md#newpendingtransactionfilter)
- [uninstallFilter](./filter.md#uninstallfilter)

## [Miscellaneous](./misc.md) <a id="miscellaneous"></a>

- [sha3](./misc.md#sha3)
