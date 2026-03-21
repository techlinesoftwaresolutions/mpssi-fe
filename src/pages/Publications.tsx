import React from 'react';
import { motion } from 'framer-motion';
import { PublicationsContainer } from '@/containers/PublicationsContainer';

export const Publications: React.FC = () => {
  return (
    <motion.div className='min-h-screen bg-white' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PublicationsContainer />
    </motion.div>
  );
};
