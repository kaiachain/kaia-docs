import React from 'react';
import Link from '@docusaurus/Link';
import { Tooltip } from 'react-tooltip';
import styles from './LinkWithTooltip.module.css';

export default function LinkWithTooltip({ to, children, tooltip }) {
  const className = styles.link;
  const tooltipAttributes = {
    'data-tooltip-id': 'my-tooltip',
    'data-tooltip-html': tooltip,
  };

  if (to) {
    return (
      <>
        <Link {...tooltipAttributes} to={to} className={className}>
          {children}
        </Link>
        <Tooltip id="my-tooltip" />
      </>
    );
  }

  return (
    <>
      <span {...tooltipAttributes} className={className}>
        {children}
      </span>
      <Tooltip id="my-tooltip" />
    </>
  );
}