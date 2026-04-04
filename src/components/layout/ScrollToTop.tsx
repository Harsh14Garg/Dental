import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset browser scroll position
    window.scrollTo(0, 0);
    
    // Also try to reset Lenis if it's available globally
    // @ts-ignore
    if (window.lenis) {
        // @ts-ignore
        window.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
