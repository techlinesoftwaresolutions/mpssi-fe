import React from 'react';
import { PublicationsPresenter } from '@/components/organisms/PublicationsPresenter';
import { useScroll } from '@/hooks/useScroll';

/**
 * PublicationsContainer - Smart Component
 * Manages scroll behavior for Publications page
 */
export const PublicationsContainer: React.FC = () => {
  useScroll();
  return <PublicationsPresenter />;
};
