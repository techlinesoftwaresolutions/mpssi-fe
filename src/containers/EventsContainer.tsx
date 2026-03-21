import React from 'react';
import { EventsPresenter } from '@/components/organisms/EventsPresenter';
import { useScroll } from '@/hooks/useScroll';

/**
 * EventsContainer - Smart Component
 * Manages scroll-to-top behavior for Events page
 * No complex state needed - presenter handles all display logic
 */
export const EventsContainer: React.FC = () => {
  useScroll();
  return <EventsPresenter />;
};
