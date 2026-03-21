import React from 'react';
import { ContactPresenter } from '@/components/organisms/ContactPresenter';
import { useScroll } from '@/hooks/useScroll';

/**
 * ContactContainer - Smart Component
 * Manages scroll behavior for Contact page
 */
export const ContactContainer: React.FC = () => {
  useScroll();
  return <ContactPresenter />;
};
