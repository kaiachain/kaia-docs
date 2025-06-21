export const sidebar = {
    type: 'カテゴリー',
    label: 'ヴィエムエクスト',
    link: {
        type: 'doc',
        id: 'リファレンス/sdk/viem-ext/getting-started',
    },
    items: [
        {
            type: 'doc',
            label: 'はじめに',
            id: 'リファレンス/sdk/viem-ext/getting-started',
        },
        {
            type: 'カテゴリー',
            label: '基本取引',
            items: [
                'リファレンス/sdk/viem-ext/基本トランザクション/レガシー',
                'リファレンス/sdk/viem-ext/基本トランザクション/値転送',
                '参考文献/sdk/viem-ext/基本トランザクション/値転送メモ',
                'リファレンス/sdk/viem-ext/基本トランザクション/アカウント更新',
                'リファレンス/sdk/viem-ext/基本トランザクション/スマート契約デプロイ',
                'リファレンス/sdk/viem-ext/基本トランザクション/スマート契約実行',
                'リファレンス/sdk/viem-ext/基本トランザクション/トランザクションのキャンセル',
            ],
        },
        {
            type: 'カテゴリー',
            label: '手数料 委任取引',
            items: [
                '参考文献/sdk/viem-ext/料金委譲トランザクション/値移転',
                '参考文献/sdk/viem-ext/料金委譲トランザクション/値移転メモ',
                '参考文献/sdk/viem-ext/料金委譲トランザクション/アカウント更新',
                '参考文献/sdk/viem-ext/フィー委任トランザクション/スマート契約デプロイ',
                '参考文献/sdk/viem-ext/手数料委譲トランザクション/スマート契約実行',
                'リファレンス/sdk/viem-ext/料金委譲トランザクション/キャンセルトランザクション',
            ],
        },
        {
            type: 'カテゴリー',
            label: 'スマート契約',
            items: [
                '参考文献/sdk/viem-ext/スマート契約/read',
                '参考文献/sdk/viem-ext/スマートコントラクト/ライト',
                '参考文献/sdk/viem-ext/スマート契約/write-txtype',
                '参考文献/sdk/viem-ext/スマートコントラクト/手数料付き書き込み委任',
            ],
        },
    ],
};
