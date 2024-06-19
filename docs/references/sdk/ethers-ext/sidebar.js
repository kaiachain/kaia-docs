export const sidebar = {
    type: 'category',
    label: 'ethers-ext',
    link: {type: 'doc', id: 'references/sdk/ethers-ext/getting-started'},
    items: [
        {type: 'doc', label: 'Getting-Started', id: 'references/sdk/ethers-ext/getting-started'},
        {
            type: 'category', 
            label: 'Account Management',
            items: [
                {
                    type: 'category', 
                    label: 'Account Key',
                    items: [
                        'references/sdk/ethers-ext/account-management/account-key/legacy',
                        'references/sdk/ethers-ext/account-management/account-key/public',
                        'references/sdk/ethers-ext/account-management/account-key/multisig',
                        'references/sdk/ethers-ext/account-management/account-key/role-based',
                    ],
                },
                {
                    type: 'category', 
                    label: 'Sign Transaction',
                    items: [
                        'references/sdk/ethers-ext/account-management/send-transaction/legacy-recover-tx',
                        'references/sdk/ethers-ext/account-management/send-transaction/public-recover-tx',
                        'references/sdk/ethers-ext/account-management/send-transaction/multisig-recover-tx',
                        'references/sdk/ethers-ext/account-management/send-transaction/role-based-recover-tx',
                    ],
                },
                {
                    type: 'category', 
                    label: 'Sign Message',
                    items: [
                        'references/sdk/ethers-ext/account-management/sign-message/legacy-recover-msg',
                        'references/sdk/ethers-ext/account-management/sign-message/multisig-recover-msg',
                        'references/sdk/ethers-ext/account-management/sign-message/public-recover-msg',
                        'references/sdk/ethers-ext/account-management/sign-message/role-based-recover-msg',
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'Basic Transaction',
            items: [
                'references/sdk/ethers-ext/basic-transaction/legacy',
                'references/sdk/ethers-ext/basic-transaction/value-transfer',
                'references/sdk/ethers-ext/basic-transaction/value-transfer-memo',
                'references/sdk/ethers-ext/basic-transaction/account-update',
                'references/sdk/ethers-ext/basic-transaction/smart-contract-deploy',
                'references/sdk/ethers-ext/basic-transaction/smart-contract-execution',
                'references/sdk/ethers-ext/basic-transaction/cancel-transaction',
            ],
        },
        {
            type: 'category',
            label: 'Fee Delegated Transaction',
            items: [
                'references/sdk/ethers-ext/basic-transaction/value-transfer',
                'references/sdk/ethers-ext/basic-transaction/value-transfer-memo',
                'references/sdk/ethers-ext/basic-transaction/account-update',
                'references/sdk/ethers-ext/basic-transaction/smart-contract-deploy',
                'references/sdk/ethers-ext/basic-transaction/smart-contract-execution',
                'references/sdk/ethers-ext/basic-transaction/cancel-transaction',
            ],
        },
        {
            type: 'category',
            label: 'Smart Contract',
            items: [
                'references/sdk/ethers-ext/smart-contract/deploy',
                'references/sdk/ethers-ext/smart-contract/read',
                'references/sdk/ethers-ext/smart-contract/write',
                'references/sdk/ethers-ext/smart-contract/write-txtype',
                'references/sdk/ethers-ext/smart-contract/write-with-fee-delegation',
            ],
        }
    ],
};
