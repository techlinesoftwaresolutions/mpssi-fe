import React, { useState, useCallback } from 'react';
import { MeritListPresenter } from '@/components/organisms';

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
  // ==================== State ====================
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  // ==================== Handlers ====================
  const handlePopupClose = useCallback(() => {
    if (isAgreementChecked) {
      setIsPopupVisible(false);
    } else {
      alert('कृपया पहले सहमति बॉक्स को चेक करें।');
    }
  }, [isAgreementChecked]);

  const handleAgreementChange = useCallback((checked: boolean) => {
    setIsAgreementChecked(checked);
  }, []);

  // ==================== Render ====================
  return (
    <MeritListPresenter
      isPopupVisible={isPopupVisible}
      isAgreementChecked={isAgreementChecked}
      onPopupClose={handlePopupClose}
      onAgreementChange={handleAgreementChange}
    />
  );
};
