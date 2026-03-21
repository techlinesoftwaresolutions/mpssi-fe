import React from 'react';
import { PatronsPresenter } from '@/components/organisms/PatronsPresenter';
import { useScroll } from '@/hooks/useScroll';

/**
 * PatronsContainer - Smart Component
 * Manages scroll behavior for Patrons page
 */
export const PatronsContainer: React.FC = () => {
  useScroll();
  return <PatronsPresenter />;
};
