import { useEffect } from 'react';

export const useScrollListener = (callback: (isScrolled: boolean) => void) => {
  useEffect(() => {
    const handleScroll = () => {
      callback(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};

export const useScrollToTop = (dependencies: unknown[] = []) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, dependencies);
};
