import React from 'react';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './Disclaimer.module.css'; // Optional: For styling

const Disclaimer = () => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;

  // Don't display the disclaimer on English pages
  if (currentLocale === 'en') {
    return null;
  }

  return (
    <div className={styles.disclaimer}>
      <Translate
        id="disclaimer.message"
        description="Machine translation disclaimer for non-English documentation pages"
      >
        This page uses machine translation from English, which may contain errors or unclear language. For the most accurate information, please see the original English version. Some content may be in the original English due to frequent updates. Help us improve this page's translation by joining our effort on Crowdin.
      </Translate>{' '}
      {/* Render links outside Translate */}
      (
      <a href={`https://crowdin.com/project/kaia-docs/${currentLocale}`}>
        Crowdin translation page
      </a>
      ,{' '}
      <a href="https://github.com/kaiachain/kaia-docs/blob/main/CONTRIBUTING.md#content-translation">
        Contributing guide
      </a>
      )
    </div>
  );
};

export default Disclaimer;