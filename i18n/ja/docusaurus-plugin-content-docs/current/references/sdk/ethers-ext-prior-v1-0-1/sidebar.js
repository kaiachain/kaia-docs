export const sidebar = {
    type: 'カテゴリー',
    label: 'ethers-ext < v1.0.1',
    link: {
        type: 'doc',
        id: 'リファレンス/sdk/ethers-ext-prior-v1-0-1/getting-started',
    },
    items: [
        {
            type: 'doc',
            label: 'はじめに',
            id: 'リファレンス/sdk/ethers-ext-prior-v1-0-1/getting-started',
        },
        {
            type: 'カテゴリー',
            label: 'アカウント管理',
            items: [
                {
                    type: 'カテゴリー',
                    label: 'アカウント・キー',
                    items: [
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/アカウントキー/レガシー',
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/アカウントキー/公開',
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/アカウントキー/マルチシグ',
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/アカウントキー/ロールベース',
                    ],
                },
                {
                    type: 'カテゴリー',
                    label: 'サイン取引',
                    items: [
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/センドトランザクション/レガシーリカバー-tx',
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/センドトランザクション/パブリック-リカバー-tx',
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/センドトランザクション/マルチシグ-リカバー-tx',
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/センドトランザクション/ロールベース-リカバー-tx',
                    ],
                },
                {
                    type: 'カテゴリー',
                    label: 'サインメッセージ',
                    items: [
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/署名メッセージ/レガシー回復メッセージ',
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/サインメッセージ/マルチシグ-リカバー-msg',
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/署名メッセージ/公開回復メッセージ',
                        '参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/サインメッセージ/ロールベースの回復メッセージ',
                    ],
                },
                {
                    type: 'カテゴリー',
                    label: 'キーストア',
                    items: ['参考文献/sdk/ethers-ext-prior-v1-0-1/アカウント管理/キーストア/キーストアV3'],
                },
            ],
        },
        {
            type: 'カテゴリー',
            label: '基本取引',
            items: [
                '参考文献/sdk/ethers-ext-prior-v1-0-1/基本トランザクション/レガシー',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/基本トランザクション/値転送',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/基本トランザクション/値転送メモ',
                'リファレンス/sdk/ethers-ext-prior-v1-0-1/基本トランザクション/アカウント更新',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/基本トランザクション/スマート契約-デプロイ',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/基本トランザクション/スマート契約実行',
                'リファレンス/sdk/ethers-ext-prior-v1-0-1/基本トランザクション/キャンセルトランザクション',
            ],
        },
        {
            type: 'カテゴリー',
            label: 'Fee Delegated トランザクション',
            items: [
                '参考文献/sdk/ethers-ext-prior-v1-0-1/fee-delegated-transaction/value-transfer',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/fee-delegated-transaction/value-transfer-memo',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/fee-delegated-transaction/account-update',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/fee-delegated-transaction/smart-contract-deploy',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/fee-delegated-transaction/smart-contract-execution',
                'リファレンス/sdk/ethers-ext-prior-v1-0-1/fee-delegated-transaction/cancel-transaction',
            ],
        },
        {
            type: 'カテゴリー',
            label: 'スマート契約',
            items: [
                '参考文献/sdk/ethers-ext-prior-v1-0-1/スマート契約/デプロイ',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/スマートコントラクト/read',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/スマート契約/write',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/スマート契約/write-txtype',
                '参考文献/sdk/ethers-ext-prior-v1-0-1/スマートコントラクト/write-with-fee-delegation',
            ],
        },
    ],
};
