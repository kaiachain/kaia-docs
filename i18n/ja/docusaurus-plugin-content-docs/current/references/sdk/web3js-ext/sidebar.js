export const sidebar = {
    type: 'カテゴリー',
    label: 'web3js-ext',
    link: {
        type: 'ドク',
        id: '参考文献/sdk/web3js-ext/getting-started'
    },
    items: [
        {
            type: 'ドク',
            label: 'はじめに',
            id: '参考文献/sdk/web3js-ext/getting-started'
        },
        {
            type: 'カテゴリー',
            label: 'アカウント管理',
            items: [
                {
                    type: 'カテゴリー',
                    label: 'アカウント・キー',
                    items: [
                        '参考文献/sdk/web3js-ext/アカウント管理/アカウントキー/レガシー',
                        '参考文献/sdk/web3js-ext/アカウント管理/アカウントキー/公開',
                        '参考文献/sdk/web3js-ext/アカウント管理/アカウントキー/マルチシグ',
                        '参考文献/sdk/web3js-ext/アカウント管理/アカウントキー/ロールベース'
                    ]
                },
                {
                    type: 'カテゴリー',
                    label: 'Sign Transaction',
                    items: [
                        'リファレンス/sdk/web3js-ext/アカウント管理/センドトランザクション/レガシーリカバー-tx',
                        '参考文献/sdk/web3js-ext/アカウント管理/センドトランザクション/パブリックリカバーテックス',
                        'リファレンス/sdk/web3js-ext/アカウント管理/センドトランザクション/マルチシグ-リカバー-tx',
                        '参考文献/sdk/web3js-ext/アカウント管理/センドトランザクション/ロールベースのリカバリ-tx'
                    ]
                },
                {
                    type: 'カテゴリー',
                    label: 'サインメッセージ',
                    items: [
                        '参考文献/sdk/web3js-ext/アカウント管理/サインメッセージ/レガシーリカバー-msg',
                        '参考文献/sdk/web3js-ext/アカウント管理/サインメッセージ/マルチシグ-リカバー-msg',
                        'リファレンス/sdk/web3js-ext/アカウント管理/サインメッセージ/パブリック-リカバー-msg',
                        '参考文献/sdk/web3js-ext/アカウント管理/サインメッセージ/ロールベースの回復メッセージ'
                    ]
                },
                {
                    type: 'カテゴリー',
                    label: 'Keystore',
                    items: [
                        '参考文献/sdk/web3js-ext/アカウント管理/キーストア/キーストアV3',
                        '参考文献/sdk/web3js-ext/アカウント管理/キーストア/キーストアV4-シングル',
                        '参考文献/sdk/web3js-ext/アカウント管理/キーストア/キーストアV4-マルチ'
                    ]
                }
            ]
        },
        {
            type: 'カテゴリー',
            label: '基本取引',
            items: [
                '参考文献/sdk/web3js-ext/基本トランザクション/レガシー',
                '参考文献/sdk/web3js-ext/基本トランザクション/値転送',
                '参考文献/sdk/web3js-ext/基本トランザクション/値転送メモ',
                '参考文献/sdk/web3js-ext/基本トランザクション/アカウント更新',
                '参考文献/sdk/web3js-ext/基本トランザクション/スマート契約-デプロイ',
                '参考文献/sdk/web3js-ext/基本トランザクション/スマート契約実行',
                'リファレンス/sdk/web3js-ext/基本トランザクション/キャンセルトランザクション'
            ]
        },
        {
            type: 'カテゴリー',
            label: '手数料 委任取引',
            items: [
                '参考文献/sdk/web3js-ext/fee-delegated-transaction/value-transfer',
                '参考文献/sdk/web3js-ext/fee-delegated-transaction/value-transfer-memo',
                '参考文献/sdk/web3js-ext/料金委譲トランザクション/アカウント更新',
                'リファレンス/sdk/web3js-ext/fee-delegated-transaction/smart-contract-deploy',
                '参考文献/sdk/web3js-ext/手数料委譲トランザクション/スマート契約実行',
                'リファレンス/sdk/web3js-ext/料金委譲トランザクション/キャンセルトランザクション'
            ]
        },
        {
            type: 'カテゴリー',
            label: 'スマート契約',
            items: [
                '参考文献/sdk/web3js-ext/スマートコントラクト/デプロイ',
                '参考文献/sdk/web3js-ext/スマート契約/read',
                '参考文献/sdk/web3js-ext/スマート契約/write',
                '参考文献/sdk/web3js-ext/スマート契約/write-txtype',
                '参考文献/sdk/web3js-ext/スマートコントラクト/write-with-fee-delegation'
            ]
        },
        {
            type: 'カテゴリー',
            label: 'ユーティリティ',
            items: [
                'リファレンス/sdk/web3js-ext/utils/address',
                '参考文献/sdk/web3js-ext/utils/signature',
                '参考文献/sdk/web3js-ext/utils/unit'
            ]
        }
    ]
};