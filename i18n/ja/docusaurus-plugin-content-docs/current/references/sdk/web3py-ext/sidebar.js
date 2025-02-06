export const sidebar = {
    type: 'カテゴリー',
    label: 'web3py-ext',
    link: {
        type: 'ドキュメント',
        id: '参考文献/sdk/web3py-ext/getting-started'
    },
    items: [
        {
            type: 'ドキュメント',
            label: 'はじめに',
            id: '参考文献/sdk/web3py-ext/getting-started'
        },
        {
            type: 'カテゴリー',
            label: 'アカウント管理',
            items: [
                {
                    type: 'カテゴリー',
                    label: 'アカウント・キー',
                    items: [
                        '参考文献/sdk/web3py-ext/アカウント管理/アカウントキー/レガシー',
                        '参考文献/sdk/web3py-ext/アカウント管理/アカウントキー/公開',
                        '参考文献/sdk/web3py-ext/アカウント管理/アカウントキー/マルチシグ',
                        '参考文献/sdk/web3py-ext/アカウント管理/アカウントキー/ロールベース'
                    ]
                },
                {
                    type: 'カテゴリー',
                    label: 'サイン　トランザクション',
                    items: [
                        '参考文献/sdk/web3py-ext/アカウント管理/センドトランザクション/レガシーリカバー-tx',
                        'リファレンス/sdk/web3py-ext/アカウント管理/センドトランザクション/パブリックリカバーテックス',
                        '参考文献/sdk/web3py-ext/アカウント管理/センドトランザクション/マルチシグ-リカバー-tx',
                        'レファレンス/sdk/web3py-ext/アカウント管理/センドトランザクション/ロールベース回復-tx'
                    ]
                },
                {
                    type: 'カテゴリー',
                    label: 'サインメッセージ',
                    items: [
                        '参考文献/sdk/web3py-ext/アカウント管理/サインメッセージ/レガシー回復メッセージ',
                        '参考文献/sdk/web3py-ext/アカウント管理/サインメッセージ/マルチシグ-リカバー-msg',
                        '参考文献/sdk/web3py-ext/アカウント管理/サインメッセージ/パブリック回復メッセージ',
                        'レファレンス/sdk/web3py-ext/アカウント管理/サインメッセージ/ロールベースの回復メッセージ'
                    ]
                },
                {
                    type: 'カテゴリー',
                    label: 'キーストア',
                    items: [
                        '参考文献/sdk/web3py-ext/アカウント管理/キーストア/キーストア-v3',
                        'レファレンス/sdk/web3py-ext/アカウント管理/キーストア/キーストア-v4'
                    ]
                }
            ]
        },
        {
            type: 'カテゴリー',
            label: '基本トランザクション',
            items: [
                '参考文献/sdk/web3py-ext/基本トランザクション/レガシー',
                'リファレンス/sdk/web3py-ext/基本トランザクション/値転送',
                '参考文献/sdk/web3py-ext/基本トランザクション/値転送メモ',
                '参考文献/sdk/web3py-ext/基本トランザクション/アカウント更新',
                'レファレンス/sdk/web3py-ext/基本トランザクション/スマートコントラクトデプロイ',
                '参考文献/sdk/web3py-ext/基本トランザクション/スマート契約実行',
                'レファレンス/sdk/web3py-ext/基本トランザクション/トランザクションのキャンセル'
            ]
        },
        {
            type: 'カテゴリー',
            label: '手数料 委任取引',
            items: [
                '参考文献/sdk/web3py-ext/料金委譲トランザクション/値移転',
                '参考文献/sdk/web3py-ext/fee-delegated-transaction/value-transfer-memo',
                '参考文献/sdk/web3py-ext/料金委譲トランザクション/アカウント更新',
                'リファレンス/sdk/web3py-ext/fee-delegated-transaction/smart-contract-deploy',
                'レファレンス/sdk/web3py-ext/フィー委任トランザクション/スマート契約実行',
                'レファレンス/sdk/web3py-ext/料金委譲トランザクション/トランザクションのキャンセル'
            ]
        },
        {
            type: 'カテゴリー',
            label: 'スマートコントラクト',
            items: [
                '参考文献/sdk/web3py-ext/スマートコントラクト/デプロイ',
                '参考文献/sdk/web3py-ext/スマート契約/read',
                '参考文献/sdk/web3py-ext/スマート契約/write',
                '参考文献/sdk/web3py-ext/スマート契約/write-txtype',
                '参考文献/sdk/web3py-ext/スマートコントラクト/手数料付き書き込みの委任'
            ]
        },
        {
            type: 'カテゴリー',
            label: 'ユーティリティ',
            items: [
                '参考文献/sdk/web3py-ext/utils/address',
                '参考文献/sdk/web3py-ext/utils/signature',
                '参考文献/sdk/web3py-ext/utils/unit'
            ]
        }
    ]
};