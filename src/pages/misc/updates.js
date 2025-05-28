// src/pages/misc/updates.js
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { useColorMode } from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';

// Import shared utility and component from src/common
import { formatDate } from '@site/src/common/dateUtils';
import UpdateTypeBadge from '@site/src/common/UpdateTypeBadge';

// Import your JSON data.
import docUpdatesData from '@site/src/common/docUpdates.json';

const getBadgeText = (type) => {
  if (!type) return '';
  return type.replace('_', ' ');
};

const DocUpdatesContent = () => {
  const { colorMode } = useColorMode();
  const updates = docUpdatesData.updates || [];

  const sortedUpdates = [...updates].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const updatesByYear = sortedUpdates.reduce((acc, update) => {
    const year = new Date(update.date).getFullYear().toString();
    acc[year] = acc[year] || [];
    acc[year].push(update);
    return acc;
  }, {});
  const years = Object.keys(updatesByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <main className="container margin-vert--lg" style={{ maxWidth: '960px' }}>
      {/* CORRECTED: Added style={{ fontSize: '3rem' }} to h1 */}
      <h1 style={{ fontSize: '3rem' }}>
        <Translate id="updatesPage.title" description="The title of the documentation updates page">
          Documentation Updates
        </Translate>
      </h1>
      
      <p className="lead" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        <Translate id="updatesPage.description" description="The introductory paragraph on the updates page">
          This page tracks all significant changes, additions, and updates to the Kaia documentation.
        </Translate>
      </p>
      
      {years.length > 1 && (
        <div style={{ marginBottom: '2.5rem', padding: '1rem', backgroundColor: 'var(--ifm-background-surface-color)', borderRadius: 'var(--ifm-global-radius)' }}>
          <strong style={{ marginRight: '10px', fontSize: '0.9rem' }}>
            <Translate id="updatesPage.jumpToYear" description="Label for the jump to year links">
              JUMP TO YEAR:
            </Translate>
          </strong>
          {years.map(year => (
            <a href={`#year-${year}`} style={{ marginRight: '15px', fontWeight: '500' }} key={year}>{year}</a>
          ))}
        </div>
      )}

      {years.map(year => (
        <section key={year} id={`year-${year}`} style={{ marginBottom: '3rem' }}>
          {/* This h2 has the fontSize style and should be correct */}
          <h2 style={{ fontSize: '2rem', borderBottom: `2px solid currentColor`, paddingBottom: '0.5rem', marginBottom: '2rem' }}>
            {year}
          </h2>
          {updatesByYear[year].map((update, index) => {
            // Translate content directly from JSON
            const updateTitle = translate({
              message: update.title, // Use the direct string from JSON
              description: `Title for doc update (Version: ${update.version}, Date: ${update.date})` // Provide context
            });
            const updateSummary = translate({
              message: update.summary,
              description: `Summary for doc update: ${update.title}`
            });
            const updateDetails = update.details ? translate({
              message: update.details,
              description: `Details for doc update: ${update.title}`
            }) : null;

            return (
              <article key={`${update.version}-${update.date}-${index}`} style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--ifm-hr-border-color)', paddingBottom: '2rem' }}>
                {/* This h3 has the fontSize style and should be correct */}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                  {update.primaryDocLink ? (
                    <Link to={update.primaryDocLink}>{updateTitle}</Link>
                  ) : (
                    updateTitle
                  )}
                </h3>
                <div style={{ marginBottom: '1rem', color: 'var(--ifm-color-emphasis-700)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <UpdateTypeBadge type={update.updateType} themeMode={colorMode}>
                    {getBadgeText(update.updateType)}
                  </UpdateTypeBadge>
                  <span style={{ marginRight: '10px' }}>
                    <strong>
                      <Translate id="updatesPage.item.docsVersionLabel" description="Label for the document version of an update item">
                        Docs Version:
                      </Translate>
                    </strong> {update.version}
                  </span>
                  <span><strong>Date:</strong> {formatDate(update.date, 'long')}</span>
                </div>
                
                <p style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: 'bold' }}>{updateSummary}</p>
                
                {updateDetails && <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{updateDetails}</p>}

                {update.relatedPages && update.relatedPages.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <strong style={{ fontSize: '0.9rem' }}>
                      <Translate id="updatesPage.item.relatedPagesLabel" description="Label for the related pages section of an update item">
                        Related Pages:
                      </Translate>
                    </strong>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '0.5rem' }}>
                      {update.relatedPages.map((page, pageIndex) => {
                        const relatedPageTitle = translate({
                          message: page.title, // Use the direct string from JSON
                          description: `Related page title for doc update: ${update.title} (Related page index: ${pageIndex})`
                        });
                        return (
                          <li key={page.path} style={{ marginBottom: '0.25rem' }}>
                            <Link to={page.path}>{relatedPageTitle}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {update.githubPrLink && (
                  <p style={{ marginTop: '1rem' }}>
                    <Link to={update.githubPrLink} target="_blank" rel="noopener noreferrer" className="button button--secondary button--sm">
                      <Translate id="updatesPage.item.viewGitHubPRButton" description="Button text to view GitHub PR for an update item">
                        View GitHub PR
                      </Translate>
                    </Link>
                  </p>
                )}
              </article>
            );
          })}
        </section>
      ))}

      {sortedUpdates.length === 0 && (
        <p style={{ fontSize: '1rem' }}>
          <Translate id="updatesPage.noUpdates" description="Message shown when there are no documentation updates">
            No updates have been logged yet.
          </Translate>
        </p>
      )}
    </main>
  );
};

// The rest of the DocUpdatesPage component remains the same
export default function DocUpdatesPage() {
  return (
    <Layout
      title={translate({
        id: 'updatesPage.metaTitle', // Explicit ID for meta content is good
        message: 'Documentation Updates',
        description: 'The meta title for the documentation updates page'
      })}
      description={translate({
        id: 'updatesPage.metaDescription', // Explicit ID for meta content is good
        message: 'Stay up-to-date with the latest changes and additions to the Kaia documentation.',
        description: 'The meta description for the documentation updates page'
      })}
    >
      <Head>
        {/* Specific meta tags if needed */}
      </Head>
      <DocUpdatesContent />
    </Layout>
  );
}