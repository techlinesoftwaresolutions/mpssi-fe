import React from 'react';
import { MeritFormContainer } from '@/containers';

/**
 * MeritListContainer - Smart Component (Container)
 * 
 * Responsibilities:
 * - Manage popup visibility state
 * - Manage agreement checkbox state
 * - Handle agreement validation
 * - Coordinate transitions between popup and form
 * - Pass state and handlers to MeritListPresenter
 * 
 * This is the "brain" of the merit list page - manages the flow.
 * The UI rendering is delegated to MeritListPresenter.
 */
export const MeritListContainer: React.FC = () => {
  // ==================== Render ====================
  // Form shows directly without popup
  return (
    <MeritFormContainer />
  );
};
