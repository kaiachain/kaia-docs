export const sidebar = {
    type: 'category',
    label: 'viem-ext',
    link: {
        type: 'doc',
        id: 'references/sdk/viem-ext/getting-started',
    },
    items: [
        {
            type: 'doc',
            label: 'Getting-Started',
            id: 'references/sdk/viem-ext/getting-started',
        },
        {
            type: 'category',
            label: '基本交易',
            items: [
                'reference/sdk/viem-ext/basic-transaction/legacy',
                'reference/sdk/viem-ext/basic-transaction/value-transfer',
                'references/sdk/viem-ext/basic-transaction/value-transfer-memo',
                'reference/sdk/viem-ext/basic-transaction/account-update',
                'references/sdk/viem-ext/basic-transaction/smart-contract-deploy',
                'references/sdk/viem-ext/basic-transaction/smart-contract-execution',
                'references/sdk/viem-ext/basic-transaction/cancel-transaction',
            ],
        },
        {
            type: 'category',
            label: '收费 委托交易',
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
            label: '智能合约',
            items: [
                'references/sdk/viem-ext/smart-contract/read',
                'references/sdk/viem-ext/smart-contract/write',
                'reference/sdk/viem-ext/smart-contract/write-txtype',
                'references/sdk/viem-ext/smart-contract/write-with-fee-delegation',
            ],
        },
    ],
};
