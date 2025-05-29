import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { useColorMode } from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';

// Import components
import { formatDate } from '@site/src/common/dateUtils';
import UpdateTypeBadge from '@site/src/common/UpdateTypeBadge';
import UpdatesSmartTOC from '@site/src/common/UpdatesSmartTOC';
import BackToTopButton from '@site/src/common/BackToTopButton';

// Import JSON data
import docUpdatesData from '@site/src/common/docUpdates.json';

const getBadgeText = (type) => {
  if (!type) return '';
  return type.replace('_', ' ');
};

// Helper function to generate month anchors when needed
const generateMonthAnchor = (updates, year) => {
  if (updates.length <= 6) return null;
  
  const monthGroups = updates.reduce((acc, update) => {
    const date = new Date(update.date);
    const monthKey = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(update);
    return acc;
  }, {});
  
  return monthGroups;
};

const DocUpdatesContent = ({ years, updatesByYear, sortedUpdates }) => {
  const { colorMode } = useColorMode();
  const [isVersioningExpanded, setIsVersioningExpanded] = React.useState(false);

  return (
    <main className="container margin-vert--lg updates-page-content" style={{ maxWidth: '960px' }}>
      <h1 style={{ fontSize: '3rem' }}>
        <Translate id="updatesPage.title" description="The title of the documentation updates page">
          Documentation Updates
        </Translate>
      </h1>
      
      <p className="lead" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
        <Translate id="updatesPage.description" description="The introductory paragraph on the updates page">
          This page tracks all significant changes, additions, and updates to the Kaia documentation.
        </Translate>
      </p>

      {/* Collapsible Versioning Information */}
      <div style={{ 
        marginBottom: '2rem',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: 'var(--ifm-global-radius)',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setIsVersioningExpanded(!isVersioningExpanded)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--ifm-color-emphasis-100)',
            border: 'none',
            borderBottom: isVersioningExpanded ? '1px solid var(--ifm-color-emphasis-200)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: 'var(--ifm-color-emphasis-800)',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--ifm-color-emphasis-200)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
          }}
          aria-expanded={isVersioningExpanded}
          aria-controls="versioning-info"
        >
          <span>
            <Translate id="updatesPage.versioningToggle" description="Button text to show/hide versioning information">
              About Our Versioning Scheme
            </Translate>
          </span>
          <span style={{ 
            transform: isVersioningExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            fontSize: '0.8rem'
          }}>
            ▼
          </span>
        </button>
        
        {isVersioningExpanded && (
          <div 
            id="versioning-info"
            style={{ 
              padding: '1rem',
              backgroundColor: 'var(--ifm-background-surface-color)',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}
          >
            <p style={{ marginBottom: '1rem', fontWeight: '500' }}>
              <Translate id="updatesPage.versioningIntro" description="Introduction to versioning scheme">
                Each documentation change is versioned using Semantic Versioning (SemVer) principles:
              </Translate>
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--ifm-color-primary)' }}>
                <Translate id="updatesPage.majorVersion" description="Major version label">
                  MAJOR version (X.y.z → (X+1).0.0):
                </Translate>
              </strong>
              <div style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
                <Translate id="updatesPage.majorVersionDesc" description="Major version description">
                  Fundamental overhauls, complete redesigns, or removal of critical sections that break existing navigation.
                </Translate>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--ifm-color-primary)' }}>
                <Translate id="updatesPage.minorVersion" description="Minor version label">
                  MINOR version (x.Y.z → x.(Y+1).0):
                </Translate>
              </strong>
              <div style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
                <Translate id="updatesPage.minorVersionDesc" description="Minor version description">
                  New site-wide features, language support, major content sections, significant restructuring, and milestone updates.
                </Translate>
              </div>
            </div>

            <div>
              <strong style={{ color: 'var(--ifm-color-primary)' }}>
                <Translate id="updatesPage.patchVersion" description="Patch version label">
                  PATCH version (x.y.Z → x.y.(Z+1)):
                </Translate>
              </strong>
              <div style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
                <Translate id="updatesPage.patchVersionDesc" description="Patch version description">
                  New individual pages, content updates, corrections, and minor UI improvements.
                </Translate>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile/tablet jump-to-year section */}
      {years.length > 1 && (
        <div 
          className="jump-to-year-mobile"
          style={{ 
            marginBottom: '2.5rem', 
            padding: '1rem', 
            backgroundColor: 'var(--ifm-background-surface-color)', 
            borderRadius: 'var(--ifm-global-radius)',
            border: '1px solid var(--ifm-color-emphasis-200)'
          }}
        >
          <strong style={{ marginRight: '10px', fontSize: '0.9rem' }}>
            <Translate id="updatesPage.jumpToYear" description="Label for the jump to year links">
              JUMP TO YEAR:
            </Translate>
          </strong>
          {years.map(year => (
            <a 
              href={`#year-${year}`} 
              style={{ 
                marginRight: '15px', 
                fontWeight: '500',
                padding: '0.25rem 0.5rem',
                backgroundColor: 'var(--ifm-color-emphasis-100)',
                borderRadius: '4px',
                textDecoration: 'none'
              }} 
              key={year}
            >
              {year}
            </a>
          ))}
        </div>
      )}

      {years.map(year => {
        const yearUpdates = updatesByYear[year];
        const monthGroups = generateMonthAnchor(yearUpdates, year);
        
        return (
          <section key={year} id={`year-${year}`} style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              borderBottom: `2px solid currentColor`, 
              paddingBottom: '0.5rem', 
              marginBottom: '2rem' 
            }}>
              {year}
            </h2>
            
            {monthGroups ? (
              // Render by month if there are many updates
              Object.entries(monthGroups)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([monthKey, monthUpdates]) => {
                  const date = new Date(monthUpdates[0].date);
                  const monthName = date.toLocaleDateString('en', { month: 'long' });
                  
                  return (
                    <div key={monthKey} id={`month-${monthKey}`} style={{ marginBottom: '2rem' }}>
                      <h3 style={{ 
                        fontSize: '1.3rem', 
                        color: 'var(--ifm-color-primary)',
                        marginBottom: '1rem',
                        borderLeft: '3px solid var(--ifm-color-primary)',
                        paddingLeft: '1rem'
                      }}>
                        {monthName} {year}
                      </h3>
                      {renderUpdates(monthUpdates, colorMode)}
                    </div>
                  );
                })
            ) : (
              // Render directly if few updates
              renderUpdates(yearUpdates, colorMode)
            )}
          </section>
        );
      })}

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

// Helper function to render update items
const renderUpdates = (updates, colorMode) => {
  return updates.map((update, index) => {
    const updateTitle = update.title;
    const updateSummary = update.summary;
    const updateDetails = update.details ? update.details : null;

    return (
      <article 
        key={`${update.version}-${update.date}-${index}`} 
        style={{ 
          marginBottom: '2.5rem', 
          borderBottom: '1px solid var(--ifm-hr-border-color)', 
          paddingBottom: '2rem' 
        }}
      >
        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
          {update.primaryDocLink ? (
            <Link to={update.primaryDocLink}>{updateTitle}</Link>
          ) : (
            updateTitle // Display the title directly
          )}
        </h4>
        
        <div style={{ 
          marginBottom: '1rem', 
          color: 'var(--ifm-color-emphasis-700)', 
          fontSize: '0.9rem', 
          display: 'flex', 
          alignItems: 'center', 
          flexWrap: 'wrap' 
        }}>
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
                // page.title is also used directly from the localized JSON
                const relatedPageTitle = page.title; 
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
  });
};

export default function DocUpdatesPage() {
  // Prepare data
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
    <Layout
      title={translate({
        id: 'updatesPage.metaTitle',
        message: 'Documentation Updates',
        description: 'The meta title for the documentation updates page'
      })}
      description={translate({
        id: 'updatesPage.metaDescription',
        message: 'Stay up-to-date with the latest changes and additions to the Kaia documentation.',
        description: 'The meta description for the documentation updates page'
      })}
    >
      <Head />
      <DocUpdatesContent 
        years={years} 
        updatesByYear={updatesByYear} 
        sortedUpdates={sortedUpdates} 
      />
      <UpdatesSmartTOC updatesByYear={updatesByYear} />
      <BackToTopButton />
    </Layout>
  );
}