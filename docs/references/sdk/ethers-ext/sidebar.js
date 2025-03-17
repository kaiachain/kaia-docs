export const sidebar = {
  type: 'category',
  label: 'ethers-ext',
  link: { type: 'doc', id: 'references/sdk/ethers-ext/getting-started' },
  items: [
    {
      type: 'doc',
      label: 'Getting-Started',
      id: 'references/sdk/ethers-ext/getting-started',
    },
    {
      type: 'category',
      label: 'v5',
      items: [
        {
          type: 'category',
          label: 'Account Management',
          items: [
            {
              type: 'category',
              label: 'Account Key',
              items: [
                'references/sdk/ethers-ext/v5/account-management/account-key/legacy',
                'references/sdk/ethers-ext/v5/account-management/account-key/public',
                'references/sdk/ethers-ext/v5/account-management/account-key/multisig',
                'references/sdk/ethers-ext/v5/account-management/account-key/role-based',
              ],
            },
            {
              type: 'category',
              label: 'Sign Transaction',
              items: [
                'references/sdk/ethers-ext/v5/account-management/send-transaction/legacy-recover-tx',
                'references/sdk/ethers-ext/v5/account-management/send-transaction/public-recover-tx',
                'references/sdk/ethers-ext/v5/account-management/send-transaction/multisig-recover-tx',
                'references/sdk/ethers-ext/v5/account-management/send-transaction/role-based-recover-tx',
              ],
            },
            {
              type: 'category',
              label: 'Sign Message',
              items: [
                'references/sdk/ethers-ext/v5/account-management/sign-message/legacy-recover-msg',
                'references/sdk/ethers-ext/v5/account-management/sign-message/multisig-recover-msg',
                'references/sdk/ethers-ext/v5/account-management/sign-message/public-recover-msg',
                'references/sdk/ethers-ext/v5/account-management/sign-message/role-based-recover-msg',
              ],
            },
            {
              type: 'category',
              label: 'Keystore',
              items: [
                'references/sdk/ethers-ext/v5/account-management/keystore/keystoreV3',
                'references/sdk/ethers-ext/v5/account-management/keystore/keystoreV4-single',
                'references/sdk/ethers-ext/v5/account-management/keystore/keystoreV4-multi',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Basic Transaction',
          items: [
            'references/sdk/ethers-ext/v5/basic-transaction/legacy',
            'references/sdk/ethers-ext/v5/basic-transaction/value-transfer',
            'references/sdk/ethers-ext/v5/basic-transaction/value-transfer-memo',
            'references/sdk/ethers-ext/v5/basic-transaction/account-update',
            'references/sdk/ethers-ext/v5/basic-transaction/smart-contract-deploy',
            'references/sdk/ethers-ext/v5/basic-transaction/smart-contract-execution',
            'references/sdk/ethers-ext/v5/basic-transaction/cancel-transaction',
          ],
        },
        {
          type: 'category',
          label: 'Fee Delegated Transaction',
          items: [
            'references/sdk/ethers-ext/v5/fee-delegated-transaction/value-transfer',
            'references/sdk/ethers-ext/v5/fee-delegated-transaction/value-transfer-memo',
            'references/sdk/ethers-ext/v5/fee-delegated-transaction/account-update',
            'references/sdk/ethers-ext/v5/fee-delegated-transaction/smart-contract-deploy',
            'references/sdk/ethers-ext/v5/fee-delegated-transaction/smart-contract-execution',
            'references/sdk/ethers-ext/v5/fee-delegated-transaction/cancel-transaction',
          ],
        },
        {
          type: 'category',
          label: 'Smart Contract',
          items: [
            'references/sdk/ethers-ext/v5/smart-contract/deploy',
            'references/sdk/ethers-ext/v5/smart-contract/read',
            'references/sdk/ethers-ext/v5/smart-contract/write',
            'references/sdk/ethers-ext/v5/smart-contract/write-txtype',
            'references/sdk/ethers-ext/v5/smart-contract/write-with-fee-delegation',
          ],
        },
        {
          type: 'category',
          label: 'Utils',
          items: [
            'references/sdk/ethers-ext/v5/utils/address',
            'references/sdk/ethers-ext/v5/utils/signature',
            'references/sdk/ethers-ext/v5/utils/unit',
          ],
        },
      ],
    },
    {
        type: 'category',
        label: 'v6',
        items: [
          {
            type: 'category',
            label: 'Account Management',
            items: [
              {
                type: 'category',
                label: 'Account Key',
                items: [
                  'references/sdk/ethers-ext/v6/account-management/account-key/legacy',
                  'references/sdk/ethers-ext/v6/account-management/account-key/public',
                  'references/sdk/ethers-ext/v6/account-management/account-key/multisig',
                  'references/sdk/ethers-ext/v6/account-management/account-key/role-based',
                ],
              },
              {
                type: 'category',
                label: 'Sign Transaction',
                items: [
                  'references/sdk/ethers-ext/v6/account-management/send-transaction/legacy-recover-tx',
                  'references/sdk/ethers-ext/v6/account-management/send-transaction/public-recover-tx',
                  'references/sdk/ethers-ext/v6/account-management/send-transaction/multisig-recover-tx',
                  'references/sdk/ethers-ext/v6/account-management/send-transaction/role-based-recover-tx',
                ],
              },
              {
                type: 'category',
                label: 'Sign Message',
                items: [
                  'references/sdk/ethers-ext/v6/account-management/sign-message/legacy-recover-msg',
                  'references/sdk/ethers-ext/v6/account-management/sign-message/multisig-recover-msg',
                  'references/sdk/ethers-ext/v6/account-management/sign-message/public-recover-msg',
                  'references/sdk/ethers-ext/v6/account-management/sign-message/role-based-recover-msg',
                ],
              },
              {
                type: 'category',
                label: 'Keystore',
                items: [
                  'references/sdk/ethers-ext/v6/account-management/keystore/keystoreV3',
                  'references/sdk/ethers-ext/v6/account-management/keystore/keystoreV4-single',
                  'references/sdk/ethers-ext/v6/account-management/keystore/keystoreV4-multi',
                ],
              },
            ],
          },
          {
            type: 'category',
            label: 'Basic Transaction',
            items: [
              'references/sdk/ethers-ext/v6/basic-transaction/legacy',
              'references/sdk/ethers-ext/v6/basic-transaction/value-transfer',
              'references/sdk/ethers-ext/v6/basic-transaction/value-transfer-memo',
              'references/sdk/ethers-ext/v6/basic-transaction/account-update',
              'references/sdk/ethers-ext/v6/basic-transaction/smart-contract-deploy',
              'references/sdk/ethers-ext/v6/basic-transaction/smart-contract-execution',
              'references/sdk/ethers-ext/v6/basic-transaction/cancel-transaction',
            ],
          },
          {
            type: 'category',
            label: 'Fee Delegated Transaction',
            items: [
              'references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer',
              'references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer-memo',
              'references/sdk/ethers-ext/v6/fee-delegated-transaction/account-update',
              'references/sdk/ethers-ext/v6/fee-delegated-transaction/smart-contract-deploy',
              'references/sdk/ethers-ext/v6/fee-delegated-transaction/smart-contract-execution',
              'references/sdk/ethers-ext/v6/fee-delegated-transaction/cancel-transaction',
            ],
          },
          {
            type: 'category',
            label: 'Smart Contract',
            items: [
              'references/sdk/ethers-ext/v6/smart-contract/deploy',
              'references/sdk/ethers-ext/v6/smart-contract/read',
              'references/sdk/ethers-ext/v6/smart-contract/write',
              'references/sdk/ethers-ext/v6/smart-contract/write-txtype',
              'references/sdk/ethers-ext/v6/smart-contract/write-with-fee-delegation',
            ],
          },
          {
            type: 'category',
            label: 'Utils',
            items: [
              'references/sdk/ethers-ext/v6/utils/address',
              'references/sdk/ethers-ext/v6/utils/signature',
              'references/sdk/ethers-ext/v6/utils/unit',
            ],
          },
        ],
      },
  ],
}
