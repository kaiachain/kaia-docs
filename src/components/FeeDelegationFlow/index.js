import React from 'react';
import styles from './styles.module.css';

const STEPS = [
  {
    id: 'user',
    step: null,
    title: 'User',
    detail: 'Approves the tx',
  },
  {
    id: 'wallet',
    step: 1,
    title: 'Wallet',
    detail: 'Sender signs → returns senderTxHashRLP',
    badge: 'This guide',
  },
  {
    id: 'dapp',
    step: 2,
    title: 'dApp',
    detail: 'Forwards RLP to fee payer',
  },
  {
    id: 'feepayer',
    step: 3,
    title: 'Fee payer',
    detail: 'Signs & broadcasts',
  },
  {
    id: 'kaia',
    step: null,
    title: 'Kaia',
    detail: 'Executes the tx',
  },
];

/**
 * Fee-delegation role flow diagram.
 * @param {'wallet' | 'dapp' | 'feepayer'} [highlight] Active role to emphasize.
 */
export default function FeeDelegationFlow({ highlight }) {
  return (
    <div
      className={styles.wrap}
      role="img"
      aria-label="Fee delegation flow: User to Wallet to dApp to Fee payer to Kaia"
    >
      <div className={styles.track}>
        {STEPS.map((item, index) => (
          <React.Fragment key={item.id}>
            <div
              className={[
                styles.node,
                highlight && item.id === highlight ? styles.nodeActive : '',
                highlight && item.id !== highlight ? styles.nodeMuted : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.step != null && (
                <span className={styles.stepNum}>Step {item.step}</span>
              )}
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
              <strong className={styles.title}>{item.title}</strong>
              <span className={styles.detail}>{item.detail}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={[
                  styles.arrow,
                  highlight ? styles.arrowMuted : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden="true"
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {highlight && (
        <p className={styles.caption}>
          Highlighted: <strong>{STEPS.find((s) => s.id === highlight)?.title}</strong>
        </p>
      )}
    </div>
  );
}
