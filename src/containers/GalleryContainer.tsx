import React, { useState, useCallback } from 'react';
import { GalleryPresenter } from '@/components/organisms/GalleryPresenter';
import { GalleryItem } from '@/types';
import { useScroll } from '@/hooks/useScroll';

/**
 * GalleryContainer - Smart Component
 * Manages activeTab and selectedImage state
 */
export const GalleryContainer: React.FC = () => {
  useScroll();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setSelectedImage(null);
  }, []);

  const handleImageSelect = useCallback((item: GalleryItem) => {
    setSelectedImage(item);
  }, []);

  const handleImageClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return <GalleryPresenter activeTab={activeTab} selectedImage={selectedImage} onTabChange={handleTabChange} onImageSelect={handleImageSelect} onImageClose={handleImageClose} />;
};
