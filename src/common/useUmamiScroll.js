import { useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function useUmamiScroll() {
  const location = useLocation();
  const triggeredRef = useRef({ 25: false, 75: false });

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    triggeredRef.current = { 25: false, 75: false };

    const handleScroll = () => {
      if (!window.umami) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // If page is shorter than window, treat as 100% viewed
      const totalScrollable = docHeight - windowHeight;
      let percent = 100;
      if (totalScrollable > 0) {
        percent = Math.round((scrollTop / totalScrollable) * 100);
      }

      [25, 75].forEach((threshold) => {
        if (percent >= threshold && !triggeredRef.current[threshold]) {
          triggeredRef.current[threshold] = true;
          
          window.umami.track(`read_${threshold}%`, { path: location.pathname });
        }
      });

      // (Performance Optimization) If we have hit the max threshold (75), stop listening to scroll events.
      if (triggeredRef.current[75]) {
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]); // Re-run this effect when path changes
}