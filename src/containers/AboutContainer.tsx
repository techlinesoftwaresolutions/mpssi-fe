import React from 'react';
import { AboutPresenter } from '@/components/organisms/AboutPresenter';
import { useScroll } from '@/hooks/useScroll';

/**
 * AboutContainer - Smart Component
 *
 * Manages:
 * - Scroll to top behavior
 * - Static content rendering
 *
 * Note: About page has no complex state, primarily handles layout & scroll behavior
 */
export const AboutContainer: React.FC = () => {
  useScroll();

  return <AboutPresenter />;
};
