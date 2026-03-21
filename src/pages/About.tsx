import React from 'react';
import { motion } from 'framer-motion';
import { AboutContainer } from '@/containers/AboutContainer';

/**
 * About Page - Simple wrapper
 * Uses AboutContainer for state management and AboutPresenter for UI
 */
export const About: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AboutContainer />
    </motion.div>
  );
};
