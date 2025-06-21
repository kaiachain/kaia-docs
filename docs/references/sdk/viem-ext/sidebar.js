export const sidebar = {
    type: 'category',
    label: 'viem-ext',
    link: {type: 'doc', id: 'references/sdk/viem-ext/getting-started'},
    items: 
      [
        {type: 'doc', label: 'Getting-Started', id: 'references/sdk/viem-ext/getting-started'},
        {
            type: 'category',
            label: 'Basic Transaction',
            items: [
                'references/sdk/viem-ext/basic-transaction/legacy',
                'references/sdk/viem-ext/basic-transaction/value-transfer',
                'references/sdk/viem-ext/basic-transaction/value-transfer-memo',
                'references/sdk/viem-ext/basic-transaction/account-update',
                'references/sdk/viem-ext/basic-transaction/smart-contract-deploy',
                'references/sdk/viem-ext/basic-transaction/smart-contract-execution',
                'references/sdk/viem-ext/basic-transaction/cancel-transaction',
            ],
        },
        {
            type: 'category',
            label: 'Fee Delegated Transaction',
            items: [
                'references/sdk/viem-ext/fee-delegated-transaction/value-transfer',
                'references/sdk/viem-ext/fee-delegated-transaction/value-transfer-memo',
                'references/sdk/viem-ext/fee-delegated-transaction/account-update',
                'references/sdk/viem-ext/fee-delegated-transaction/smart-contract-deploy',
                'references/sdk/viem-ext/fee-delegated-transaction/smart-contract-execution',
                'references/sdk/viem-ext/fee-delegated-transaction/cancel-transaction',
            ],
        },
        {
            type: 'category',
            label: 'Smart Contract',
            items: [
                'references/sdk/viem-ext/smart-contract/read',
                'references/sdk/viem-ext/smart-contract/write',
                'references/sdk/viem-ext/smart-contract/write-txtype',
                'references/sdk/viem-ext/smart-contract/write-with-fee-delegation',
            ],
        },
      ],
};
