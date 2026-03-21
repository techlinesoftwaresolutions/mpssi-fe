import React from 'react';
import { motion } from 'framer-motion';
import { HomeContainer } from '@/containers/HomeContainer';
import { useScroll } from '@/hooks/useScroll';

/**
 * Home Page - Simple wrapper
 * Uses HomeContainer for state management and HomePresenter for UI
 */
export const Home: React.FC = () => {
  useScroll();

  return (
    <motion.div className="min-h-screen bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <HomeContainer />
    </motion.div>
  );
};
