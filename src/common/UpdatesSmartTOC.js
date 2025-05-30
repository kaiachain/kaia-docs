import React from 'react';
import { translate } from '@docusaurus/Translate';

const UpdatesSmartTOC = ({ updatesByYear }) => {
  // Generate smart TOC items based on content density
  const generateSmartTOC = (updatesByYear) => {
    const tocItems = [];
    
    Object.entries(updatesByYear)
      .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort years descending
      .forEach(([year, updates]) => {
        if (updates.length > 6) { // If many updates in a year, show months
          const monthGroups = updates.reduce((acc, update) => {
            const date = new Date(update.date);
            const month = date.toLocaleDateString('en', { month: 'short' });
            const monthKey = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!acc[monthKey]) {
              acc[monthKey] = { month, updates: [] };
            }
            acc[monthKey].updates.push(update);
            return acc;
          }, {});
          
          // Sort months within year (newest first)
          Object.entries(monthGroups)
            .sort(([a], [b]) => b.localeCompare(a))
            .forEach(([monthKey, { month, updates }]) => {
              tocItems.push({
                label: `${month} ${year}`,
                href: `#month-${monthKey}`,
                type: 'month',
                count: updates.length
              });
            });
        } else { // Few updates, just show year
          tocItems.push({
            label: year,
            href: `#year-${year}`,
            type: 'year',
            count: updates.length
          });
        }
      });
    
    return tocItems;
  };

  const tocItems = generateSmartTOC(updatesByYear);

  if (tocItems.length <= 1) {
    return null; // Don't show TOC if there's only one item or less
  }

  return (
    <nav 
      style={{
        position: 'fixed',
        top: 'calc(var(--ifm-navbar-height) + 1rem)',
        right: '1rem',
        width: '240px',
        maxHeight: 'calc(100vh - var(--ifm-navbar-height) - 2rem)',
        overflowY: 'auto',
        backgroundColor: 'var(--ifm-background-surface-color)',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: 'var(--ifm-global-radius)',
        padding: '1rem',
        fontSize: '0.875rem',
        zIndex: 10,
        display: 'none', // Hidden by default, shown via media query
        boxShadow: 'var(--ifm-global-shadow-lw)',
      }}
      className="updates-smart-toc" // Class for media query
      aria-label={translate({
        id: 'updatesPage.toc.ariaLabel',
        message: 'Table of Contents',
        description: 'ARIA label for the Table of Contents on the updates page'
      })}
    >
      <div style={{
        fontWeight: 'bold',
        marginBottom: '0.75rem',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        color: 'var(--ifm-color-emphasis-600)',
        letterSpacing: '0.5px'
      }}>
        {translate({
          id: 'updatesPage.tocTitle',
          message: 'On this page',
          description: 'The title for the table of contents on the updates page'
        })}
      </div>
      
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0
      }}>
        {tocItems.map((item, index) => (
          <li key={item.href} style={{ marginBottom: '0.25rem' }}>
            <a
              href={item.href}
              style={{
                display: 'block',
                padding: '0.375rem 0.5rem',
                color: 'var(--ifm-color-emphasis-700)',
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'all 0.2s ease-in-out',
                fontSize: item.type === 'month' ? '0.8rem' : '0.875rem',
                fontWeight: item.type === 'year' ? '500' : '400',
                borderLeft: item.type === 'month' ? '2px solid var(--ifm-color-primary-lighter)' : 'none',
                marginLeft: item.type === 'month' ? '0.5rem' : '0',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--ifm-hover-overlay)';
                e.target.style.color = 'var(--ifm-color-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--ifm-color-emphasis-700)';
              }}
            >
              {item.label}
              <span style={{
                fontSize: '0.7rem',
                color: 'var(--ifm-color-emphasis-500)',
                marginLeft: '0.5rem'
              }}>
                ({item.count})
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UpdatesSmartTOC;