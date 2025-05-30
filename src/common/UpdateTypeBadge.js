import React from 'react';

const UpdateTypeBadge = ({ type, themeMode, children }) => {
  const badgeBackgroundColors = {
    'NEW_CONTENT': 'var(--ifm-color-primary)',
    'NEW_FEATURE': 'var(--ifm-color-success)',
    'UPDATE': 'var(--ifm-color-warning)',
    'MILESTONE': 'var(--ifm-color-info)',
  };

  const backgroundColor = badgeBackgroundColors[type] || 'var(--ifm-color-secondary)';
  
  let textColor;

  // Determine text color based on type and themeMode
  switch (type) {
    case 'NEW_CONTENT':
      textColor = themeMode === 'dark' ? '#000000' : '#ffffff'; // Black on dark, White on light
      break;
    case 'NEW_FEATURE':
      textColor = '#ffffff'; // Always White
      break;
    case 'UPDATE':
      textColor = '#000000'; // Always Black
      break;
    case 'MILESTONE':
      textColor = '#000000'; // Always Black
      break;
    default:
      textColor = '#ffffff'; // Fallback to white
  }

  return (
    <span
      style={{
        backgroundColor: backgroundColor,
        color: textColor, // Use the determined textColor
        padding: '3px 8px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        marginRight: '10px',
        textTransform: 'uppercase',
        display: 'inline-block',
        lineHeight: '1.2',
      }}
    >
      {children}
    </span>
  );
};

export default UpdateTypeBadge;