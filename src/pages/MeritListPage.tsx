import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PopupInstructions from '../components/PopupInstructions';
import { MeritFormContainer } from '../containers';

/**
 * MeritListPage - Main Page Component
 * 
 * Orchestrates the merit registration flow:
 * 1. Shows PopupInstructions until user agrees
 * 2. Displays MeritFormContainer after agreement
 * 3. Smooth transition between both states
 * 
 * Uses AnimatePresence to prevent layout shift on popup dismiss
 */
export const MeritListPage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const handlePopupClose = () => {
    if (isAgreementChecked) {
      setIsPopupVisible(false);
    } else {
      alert('कृपया पहले सहमति बॉक्स को चेक करें।');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Popup - Overlay on top */}
      <PopupInstructions
        isVisible={isPopupVisible}
        onClose={handlePopupClose}
        isAgreementChecked={isAgreementChecked}
        onAgreementChange={setIsAgreementChecked}
      />

      {/* Form - Smooth fade in after popup closes */}
      <AnimatePresence mode="wait">
        {!isPopupVisible && <MeritFormContainer key="form" />}
      </AnimatePresence>
    </div>
  );
};
