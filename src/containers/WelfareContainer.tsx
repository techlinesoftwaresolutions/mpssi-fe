import React, { useState, useCallback } from 'react';
import { WelfarePresenter } from '@/components/organisms/WelfarePresenter';
import { useNavigation } from '@/contexts/NavigationContext';
import { useScroll } from '@/hooks/useScroll';

/**
 * WelfareContainer - Smart Component
 * Manages expandedFaq state and navigation
 */
export const WelfareContainer: React.FC = () => {
  useScroll();
  const { setActivePage } = useNavigation();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleToggleFaq = useCallback((idx: number) => {
    setExpandedFaq((prev) => (prev === idx ? null : idx));
  }, []);

  const handleNavigateScholarship = useCallback(() => {
    setActivePage('scholarship');
  }, [setActivePage]);

  return <WelfarePresenter expandedFaq={expandedFaq} onToggleFaq={handleToggleFaq} onNavigateScholarship={handleNavigateScholarship} />;
};
