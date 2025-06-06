export const sidebar = {
    type: 'category',
    label: 'web3js-ext',
    link: {
        type: 'doc',
        id: 'references/sdk/web3js-ext/getting-started'
    },
    items: [
        {
            type: 'doc',
            label: 'Getting-Started',
            id: 'references/sdk/web3js-ext/getting-started'
        },
        {
            type: 'category',
            label: 'Account Management',
            items: [
                {
                    type: 'category',
                    label: 'Account Key',
                    items: [
                        'references/sdk/web3js-ext/account-management/account-key/legacy',
                        'references/sdk/web3js-ext/account-management/account-key/public',
                        'references/sdk/web3js-ext/account-management/account-key/multisig',
                        'references/sdk/web3js-ext/account-management/account-key/role-based'
                    ]
                },
                {
                    type: 'category',
                    label: 'Sign Transaction',
                    items: [
                        'references/sdk/web3js-ext/account-management/send-transaction/legacy-recover-tx',
                        'references/sdk/web3js-ext/account-management/send-transaction/public-recover-tx',
                        'references/sdk/web3js-ext/account-management/send-transaction/multisig-recover-tx',
                        'references/sdk/web3js-ext/account-management/send-transaction/role-based-recover-tx'
                    ]
                },
                {
                    type: 'category',
                    label: 'Sign Message',
                    items: [
                        'references/sdk/web3js-ext/account-management/sign-message/legacy-recover-msg',
                        'references/sdk/web3js-ext/account-management/sign-message/multisig-recover-msg',
                        'references/sdk/web3js-ext/account-management/sign-message/public-recover-msg',
                        'references/sdk/web3js-ext/account-management/sign-message/role-based-recover-msg'
                    ]
                },
                {
                    type: 'category',
                    label: '키스토어',
                    items: [
                        'references/sdk/web3js-ext/account-management/keystore/keystoreV3',
                        'references/sdk/web3js-ext/account-management/keystore/keystoreV4-single',
                        'references/sdk/web3js-ext/account-management/keystore/keystoreV4-multi'
                    ]
                }
            ]
        },
        {
            type: 'category',
            label: 'Basic Transaction',
            items: [
                'references/sdk/web3js-ext/basic-transaction/legacy',
                'references/sdk/web3js-ext/basic-transaction/value-transfer',
                'references/sdk/web3js-ext/basic-transaction/value-transfer-memo',
                'references/sdk/web3js-ext/basic-transaction/account-update',
                'references/sdk/web3js-ext/basic-transaction/smart-contract-deploy',
                'references/sdk/web3js-ext/basic-transaction/smart-contract-execution',
                'references/sdk/web3js-ext/basic-transaction/cancel-transaction'
            ]
        },
        {
            type: 'category',
            label: 'Fee Delegated Transaction',
            items: [
                'references/sdk/web3js-ext/fee-delegated-transaction/value-transfer',
                'references/sdk/web3js-ext/fee-delegated-transaction/value-transfer-memo',
                'references/sdk/web3js-ext/fee-delegated-transaction/account-update',
                'references/sdk/web3js-ext/fee-delegated-transaction/smart-contract-deploy',
                'references/sdk/web3js-ext/fee-delegated-transaction/smart-contract-execution',
                'references/sdk/web3js-ext/fee-delegated-transaction/cancel-transaction'
            ]
        },
        {
            type: 'category',
            label: 'Smart Contract',
            items: [
                'references/sdk/web3js-ext/smart-contract/deploy',
                'references/sdk/web3js-ext/smart-contract/read',
                'references/sdk/web3js-ext/smart-contract/write',
                'references/sdk/web3js-ext/smart-contract/write-txtype',
                'references/sdk/web3js-ext/smart-contract/write-with-fee-delegation'
            ]
        },
        {
            type: 'category',
            label: 'Utils',
            items: [
                'references/sdk/web3js-ext/utils/address',
                'references/sdk/web3js-ext/utils/signature',
                'references/sdk/web3js-ext/utils/unit'
            ]
        }
    ]
};