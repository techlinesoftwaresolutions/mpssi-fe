import React from 'react';
import { AnimatePresence } from 'framer-motion';
import PopupInstructions from '../PopupInstructions';
import { MeritFormContainer } from '@/containers';

/**
 * MeritListPresenter - Dumb Component (Presenter)
 * 
 * Responsibilities:
 * - Render PopupInstructions overlay
 * - Manage transition between popup and form (AnimatePresence)
 * - Render MeritFormContainer after popup is dismissed
 * - Call handler props (no state mutations)
 * 
 * This is the "view" of the merit list page.
 * No state management, no business logic, only UI rendering.
 */
interface MeritListPresenterProps {
  isPopupVisible: boolean;
  isAgreementChecked: boolean;
  onPopupClose: () => void;
  onAgreementChange: (checked: boolean) => void;
}

export const MeritListPresenter: React.FC<MeritListPresenterProps> = ({
  isPopupVisible,
  isAgreementChecked,
  onPopupClose,
  onAgreementChange
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Popup - Overlay on top */}
      <PopupInstructions
        isVisible={isPopupVisible}
        onClose={onPopupClose}
        isAgreementChecked={isAgreementChecked}
        onAgreementChange={onAgreementChange}
      />

      {/* Form - Smooth fade in after popup closes */}
      <AnimatePresence mode="wait">
        {!isPopupVisible && <MeritFormContainer key="form" />}
      </AnimatePresence>
    </div>
  );
};
