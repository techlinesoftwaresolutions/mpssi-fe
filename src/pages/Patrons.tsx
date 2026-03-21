import React from 'react';
import { motion } from 'framer-motion';
import { PatronsContainer } from '@/containers/PatronsContainer';

export const Patrons: React.FC = () => {
  return (
    <motion.div className='min-h-screen bg-white' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PatronsContainer />
    </motion.div>
  );
};
