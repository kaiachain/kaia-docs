export const sidebar = {
    type: 'カテゴリー',
    label: 'web3j-ext',
    link: {
        type: 'doc',
        id: 'リファレンス/sdk/web3j-ext/getting-started'
    },
    items: [
        {
            type: 'doc',
            label: 'はじめに',
            id: 'リファレンス/sdk/web3j-ext/getting-started'
        },
        {
            type: 'カテゴリー',
            label: 'アカウント管理',
            items: [
                {
                    type: 'カテゴリー',
                    label: 'アカウント・キー',
                    items: [
                        '参考文献/sdk/web3j-ext/アカウント管理/アカウントキー/レガシー',
                        '参考文献/sdk/web3j-ext/アカウント管理/アカウントキー/公開',
                        '参考文献/sdk/web3j-ext/アカウント管理/アカウントキー/マルチシグ',
                        '参考文献/sdk/web3j-ext/アカウント管理/アカウントキー/ロールベース'
                    ]
                },
                {
                    type: 'カテゴリー',
                    label: 'サイン取引',
                    items: [
                        'レファレンス/sdk/web3j-ext/アカウント管理/センドトランザクション/レガシーリカバー-tx',
                        'リファレンス/sdk/web3j-ext/アカウント管理/センドトランザクション/パブリック-リカバー-tx',
                        '参考文献/sdk/web3j-ext/アカウント管理/センドトランザクション/マルチシグ-リカバー-tx',
                        '参考文献/sdk/web3j-ext/アカウント管理/センドトランザクション/ロールベース-リカバー-tx'
                    ]
                },
                {
                    type: 'カテゴリー',
                    label: 'サインメッセージ',
                    items: [
                        '参考文献/sdk/web3j-ext/アカウント管理/サインメッセージ/レガシー回復メッセージ',
                        'リファレンス/sdk/web3j-ext/アカウント管理/サインメッセージ/マルチシグ-リカバー-msg',
                        'リファレンス/sdk/web3j-ext/アカウント管理/サインメッセージ/パブリック-リカバー-msg',
                        '参考文献/sdk/web3j-ext/アカウント管理/サインメッセージ/ロールベースの回復メッセージ'
                    ]
                },
                {
                    type: 'カテゴリー',
                    label: 'キーストア',
                    items: [
                        '参考文献/sdk/web3j-ext/アカウント管理/キーストア/キーストアV3',
                        'リファレンス/sdk/web3j-ext/アカウント管理/キーストア/キーストアV4'
                    ]
                }
            ]
        },
        {
            type: 'カテゴリー',
            label: '基本取引',
            items: [
                '参考文献/sdk/web3j-ext/基本トランザクション/レガシー',
                'リファレンス/sdk/web3j-ext/基本トランザクション/値転送',
                '参考文献/sdk/web3j-ext/基本トランザクション/値転送メモ',
                'リファレンス/sdk/web3j-ext/基本トランザクション/アカウント更新',
                '参考文献/sdk/web3j-ext/基本トランザクション/スマート契約-デプロイ',
                '参考文献/sdk/web3j-ext/基本トランザクション/スマート契約実行',
                'リファレンス/sdk/web3j-ext/基本トランザクション/キャンセルトランザクション'
            ]
        },
        {
            type: 'カテゴリー',
            label: '手数料 委任取引',
            items: [
                '参考文献/sdk/web3j-ext/料金委譲トランザクション/値移転',
                '参考文献/sdk/web3j-ext/fee-delegated-transaction/value-transfer-memo',
                '参考文献/sdk/web3j-ext/料金委譲トランザクション/アカウント更新',
                'リファレンス/sdk/web3j-ext/fee-delegated-transaction/smart-contract-deploy',
                '参考文献/sdk/web3j-ext/手数料委譲トランザクション/スマート契約実行',
                'リファレンス/sdk/web3j-ext/料金委譲トランザクション/キャンセルトランザクション'
            ]
        },
        {
            type: 'カテゴリー',
            label: 'スマート契約',
            items: [
                '参考文献/sdk/web3j-ext/スマート契約/デプロイ',
                '参考文献/sdk/web3j-ext/スマート契約/read',
                '参考文献/sdk/web3j-ext/スマート契約/write',
                '参考文献/sdk/web3j-ext/スマート契約/write-txtype',
                '参考文献/sdk/web3j-ext/スマート契約/手数料付き書き込み委任'
            ]
        },
        {
            type: 'カテゴリー',
            label: 'ユーティリティ',
            items: [
                '参考文献/sdk/web3j-ext/utils/address',
                '参考文献/sdk/web3j-ext/utils/signature',
                '参考文献/sdk/web3j-ext/utils/unit'
            ]
        }
    ]
};