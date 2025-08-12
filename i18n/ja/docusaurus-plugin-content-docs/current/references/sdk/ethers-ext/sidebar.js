export const sidebar = {
  type: 'カテゴリー',
  label: 'エーテルエクスト',
  link: {
    type: 'doc',
    id: 'リファレンス/sdk/ethers-ext/getting-started'
  },
  items: [
    {
      type: 'doc',
      label: 'はじめに',
      id: 'リファレンス/sdk/ethers-ext/getting-started'
    },
    {
      type: 'カテゴリー',
      label: 'v5',
      items: [
        {
          type: 'カテゴリー',
          label: 'アカウント管理',
          items: [
            {
              type: 'カテゴリー',
              label: 'アカウント・キー',
              items: [
                '参考文献/sdk/ethers-ext/v5/アカウント管理/アカウントキー/レガシー',
                '参考文献/sdk/ethers-ext/v5/アカウント管理/アカウントキー/公開',
                '参考文献/sdk/ethers-ext/v5/アカウント管理/アカウントキー/マルチシグ',
                '参考文献/sdk/ethers-ext/v5/アカウント管理/アカウントキー/ロールベース'
              ]
            },
            {
              type: 'カテゴリー',
              label: 'サイントランザクション',
              items: [
                'レファレンス/sdk/ethers-ext/v5/アカウント管理/センドトランザクション/レガシーリカバー-tx',
                'リファレンス/sdk/ethers-ext/v5/アカウント管理/センドトランザクション/パブリック-リカバー-tx',
                'リファレンス/sdk/ethers-ext/v5/アカウント管理/センドトランザクション/マルチシグ-リカバー-tx',
                'リファレンス/sdk/ethers-ext/v5/アカウント管理/センドトランザクション/ロールベース回復-tx'
              ]
            },
            {
              type: 'カテゴリー',
              label: 'サインメッセージ',
              items: [
                'リファレンス/sdk/ethers-ext/v5/アカウント管理/サインメッセージ/レガシー回復メッセージ',
                'リファレンス/sdk/ethers-ext/v5/アカウント管理/サインメッセージ/マルチシグ-リカバー-msg',
                'リファレンス/sdk/ethers-ext/v5/アカウント管理/サインメッセージ/公開回復メッセージ',
                '参考文献/sdk/ethers-ext/v5/アカウント管理/サインメッセージ/ロールベースの回復メッセージ'
              ]
            },
            {
              type: 'カテゴリー',
              label: 'キーストア',
              items: [
                'リファレンス/sdk/ethers-ext/v5/アカウント管理/キーストア/キーストアV3',
                'リファレンス/sdk/ethers-ext/v5/アカウント管理/キーストア/キーストアV4-シングル',
                'リファレンス/sdk/ethers-ext/v5/アカウント管理/キーストア/キーストアV4-マルチ'
              ]
            }
          ]
        },
        {
          type: 'カテゴリー',
          label: '基本取引',
          items: [
            'リファレンス/sdk/ethers-ext/v5/basic-transaction/legacy',
            'リファレンス/sdk/ethers-ext/v5/基本トランザクション/値転送',
            'リファレンス/sdk/ethers-ext/v5/basic-transaction/value-transfer-memo',
            'リファレンス/sdk/ethers-ext/v5/基本トランザクション/アカウント更新',
            'リファレンス/sdk/ethers-ext/v5/ベーシック・トランザクション/スマート・コントラクト・デプロイ',
            'リファレンス/sdk/ethers-ext/v5/基本トランザクション/スマート契約実行',
            'リファレンス/sdk/ethers-ext/v5/基本トランザクション/キャンセルトランザクション'
          ]
        },
        {
          type: 'カテゴリー',
          label: '手数料 委任取引',
          items: [
            'リファレンス/sdk/ethers-ext/v5/fee-delegated-transaction/value-transfer',
            '参考文献/sdk/ethers-ext/v5/fee-delegated-transaction/value-transfer-memo',
            'リファレンス/sdk/ethers-ext/v5/fee-delegated-transaction/account-update',
            'リファレンス/sdk/ethers-ext/v5/fee-delegated-transaction/smart-contract-deploy',
            '参考文献/sdk/ethers-ext/v5/fee-delegated-transaction/smart-contract-execution',
            'リファレンス/sdk/ethers-ext/v5/fee-delegated-transaction/cancel-transaction'
          ]
        },
        {
          type: 'カテゴリー',
          label: 'スマート契約',
          items: [
            'リファレンス/sdk/ethers-ext/v5/スマート契約/デプロイ',
            '参考文献/sdk/ethers-ext/v5/smart-contract/read',
            '参考文献/sdk/ethers-ext/v5/smart-contract/write',
            '参考文献/sdk/ethers-ext/v5/スマート契約/write-txtype',
            '参考文献/sdk/ethers-ext/v5/スマートコントラクト/ライトウィズフィーデリゲーション'
          ]
        },
        {
          type: 'カテゴリー',
          label: 'ユーティリティ',
          items: [
            'リファレンス/sdk/ethers-ext/v5/utils/address',
            '参考文献/sdk/ethers-ext/v5/utils/signature',
            '参考文献/sdk/ethers-ext/v5/utils/unit'
          ]
        }
      ]
    },
    {
      type: 'カテゴリー',
      label: 'v6',
      items: [
        {
          type: 'カテゴリー',
          label: 'アカウント管理',
          items: [
            {
              type: 'カテゴリー',
              label: 'アカウント・キー',
              items: [
                '参考文献/sdk/ethers-ext/v6/アカウント管理/アカウントキー/レガシー',
                '参考文献/sdk/ethers-ext/v6/アカウント管理/アカウントキー/公開',
                '参考文献/sdk/ethers-ext/v6/アカウント管理/アカウントキー/マルチシグ',
                '参考文献/sdk/ethers-ext/v6/アカウント管理/アカウントキー/ロールベース'
              ]
            },
            {
              type: 'カテゴリー',
              label: 'サイン取引',
              items: [
                'レファレンス/sdk/ethers-ext/v6/アカウント管理/センドトランザクション/レガシーリカバー-tx',
                'リファレンス/sdk/ethers-ext/v6/アカウント管理/センド・トランザクション/パブリック・リカバー・TX',
                'リファレンス/sdk/ethers-ext/v6/アカウント管理/センドトランザクション/マルチシグ-リカバー-tx',
                'リファレンス/sdk/ethers-ext/v6/アカウント管理/センドトランザクション/ロールベース回復-tx'
              ]
            },
            {
              type: 'カテゴリー',
              label: 'サインメッセージ',
              items: [
                'リファレンス/sdk/ethers-ext/v6/アカウント管理/サインメッセージ/レガシー回復メッセージ',
                'リファレンス/sdk/ethers-ext/v6/アカウント管理/サインメッセージ/マルチシグ-リカバー-msg',
                'リファレンス/sdk/ethers-ext/v6/アカウント管理/サインメッセージ/公開回復メッセージ',
                '参考文献/sdk/ethers-ext/v6/アカウント管理/サインメッセージ/ロールベースの回復メッセージ'
              ]
            },
            {
              type: 'カテゴリー',
              label: 'キーストア',
              items: [
                'リファレンス/sdk/ethers-ext/v6/アカウント管理/キーストア/キーストアV3',
                'リファレンス/sdk/ethers-ext/v6/アカウント管理/キーストア/キーストアV4-シングル',
                'リファレンス/sdk/ethers-ext/v6/アカウント管理/キーストア/キーストアV4-マルチ'
              ]
            }
          ]
        },
        {
          type: 'カテゴリー',
          label: '基本取引',
          items: [
            'リファレンス/sdk/ethers-ext/v6/基本トランザクション/レガシー',
            'リファレンス/sdk/ethers-ext/v6/基本トランザクション/値転送',
            'リファレンス/sdk/ethers-ext/v6/基本トランザクション/値転送メモ',
            'リファレンス/sdk/ethers-ext/v6/基本トランザクション/アカウント更新',
            'リファレンス/sdk/ethers-ext/v6/ベーシック・トランザクション/スマート・コントラクト・デプロイ',
            'リファレンス/sdk/ethers-ext/v6/基本トランザクション/スマート契約実行',
            'リファレンス/sdk/ethers-ext/v6/基本トランザクション/キャンセルトランザクション'
          ]
        },
        {
          type: 'カテゴリー',
          label: '手数料 委任取引',
          items: [
            'リファレンス/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer',
            '参考文献/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer-memo',
            'リファレンス/sdk/ethers-ext/v6/fee-delegated-transaction/account-update',
            'リファレンス/sdk/ethers-ext/v6/fee-delegated-transaction/smart-contract-deploy',
            '参考文献/sdk/ethers-ext/v6/fee-delegated-transaction/smart-contract-execution',
            'リファレンス/sdk/ethers-ext/v6/fee-delegated-transaction/cancel-transaction'
          ]
        },
        {
          type: 'カテゴリー',
          label: 'ガス抽出',
          items: ['リファレンス/sdk/ethers-ext/v6/gas-abstraction/gasless']
        },
        {
          type: 'カテゴリー',
          label: 'スマート契約',
          items: [
            'リファレンス/sdk/ethers-ext/v6/スマート契約/デプロイ',
            '参考文献/sdk/ethers-ext/v6/smart-contract/read',
            '参考文献/sdk/ethers-ext/v6/smart-contract/write',
            '参考文献/sdk/ethers-ext/v6/スマート契約/write-txtype',
            '参考文献/sdk/ethers-ext/v6/スマートコントラクト/ライトウィズフィーデリゲーション'
          ]
        },
        {
          type: 'カテゴリー',
          label: 'ユーティリティ',
          items: [
            'リファレンス/sdk/ethers-ext/v6/utils/address',
            'リファレンス/sdk/ethers-ext/v6/utils/signature',
            '参考文献/sdk/ethers-ext/v6/utils/unit'
          ]
        }
      ]
    }
  ]
};