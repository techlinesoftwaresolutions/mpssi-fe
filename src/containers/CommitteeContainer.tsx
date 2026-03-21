import React, { useState, useCallback } from 'react';
import { CommitteePresenter } from '@/components/organisms/CommitteePresenter';
import { useScroll } from '@/hooks/useScroll';

/**
 * CommitteeContainer - Smart Component
 * Manages expandedYear state and toggle handler
 */
export const CommitteeContainer: React.FC = () => {
  useScroll();
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const handleToggleYear = useCallback((year: number) => {
    setExpandedYear((prev) => (prev === year ? null : year));
  }, []);

  return <CommitteePresenter expandedYear={expandedYear} onToggleYear={handleToggleYear} />;
};
