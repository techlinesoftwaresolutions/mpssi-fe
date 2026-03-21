import React, { useCallback } from 'react';
import teamData from '@/data/teamData.json';
import { useSelection } from '@/hooks/useContainerHooks';
import { useNavigation } from '@/contexts/NavigationContext';
import { HighlightItem } from '@/types';
import { HomePresenter } from '@/components/organisms/HomePresenter';

/**
 * HomeContainer - Smart Component
 * 
 * Manages:
 * - Selected highlight state
 * - Navigation context
 * - Event handlers for UI interactions
 */
export const HomeContainer: React.FC = () => {
  const { setActivePage } = useNavigation();
  const { selected: selectedHighlight, selectItem, clearSelection } = useSelection<HighlightItem>();

  const handleHighlightSelect = useCallback((highlight: HighlightItem) => {
    selectItem(highlight);
  }, [selectItem]);

  const handleNavigate = useCallback((page: string) => {
    setActivePage(page);
  }, [setActivePage]);

  return (
    <HomePresenter
      teamFounders={teamData.founders}
      selectedHighlight={selectedHighlight}
      onSelectHighlight={handleHighlightSelect}
      onClearSelection={clearSelection}
      onNavigate={handleNavigate}
    />
  );
};
