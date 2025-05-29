import React, { useState, useEffect } from 'react';
import { translate } from '@docusaurus/Translate';
import { useColorMode } from '@docusaurus/theme-common';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { colorMode } = useColorMode();

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '4.5rem',
        right: '2rem',
        backgroundColor: 'var(--ifm-color-primary)',
        color: colorMode === 'dark' ? '#000000' : '#ffffff', // Black text in dark mode, white in light mode
        border: 'none',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: 'var(--ifm-global-shadow-md)',
        transition: 'all 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'var(--ifm-color-primary-dark)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'var(--ifm-color-primary)';
        e.target.style.transform = 'translateY(0)';
      }}
      aria-label={translate({
        id: 'theme.common.backToTopButtonAriaLabel',
        message: 'Scroll back to top',
        description: 'The ARIA label for the back to top button'
      })}
    >
      ↑
    </button>
  );
};

export default BackToTopButton;