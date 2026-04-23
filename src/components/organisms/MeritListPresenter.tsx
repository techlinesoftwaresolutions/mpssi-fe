import React from 'react';
import { MeritFormContainer } from '@/containers';

/**
 * MeritListPresenter - Deprecated
 * 
 * This component is no longer used.
 * MeritListContainer now directly renders MeritFormContainer.
 * Keeping for backward compatibility reference.
 */
export const MeritListPresenter: React.FC = () => {
  return <MeritFormContainer />;
};
