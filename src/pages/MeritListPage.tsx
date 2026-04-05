import React from 'react';
import { MeritListContainer } from '@/containers';

/**
 * MeritListPage - Page Wrapper Component
 * 
 * Simple wrapper that:
 * - Handles routing for this page
 * - Renders the MeritListContainer which manages all logic and state
 * 
 * Page Structure:
 * Page (wrapper) → Container (logic) → Presenter (UI)
 * 
 * The MeritListContainer orchestrates:
 * 1. PopupInstructions (shows instructions and requires agreement)
 * 2. MeritFormContainer (shown after agreement)
 * 
 * With smooth transitions between both states
 */
export const MeritListPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MeritListContainer />
    </div>
  );
};

/**
 * OLD CODE BELOW - EXTRACTED TO CONTAINER & PRESENTER
 * This code has been refactored to follow the Container-Presenter pattern:
 * - State management moved to MeritListContainer
 * - UI rendering moved to MeritListPresenter
 * - This page is now just a wrapper for routing
 */

/*
REMOVED: isPopupVisible state
REMOVED: isAgreementChecked state
REMOVED: handlePopupClose handler
REMOVED: onAgreementChange handler
REMOVED: PopupInstructions component integration
REMOVED: MeritFormContainer conditional rendering
REMOVED: AnimatePresence for transitions

For the original implementation, see:
- @/containers/MeritListContainer.tsx (state & logic)
- @/components/organisms/MeritListPresenter.tsx (UI only)
*/
