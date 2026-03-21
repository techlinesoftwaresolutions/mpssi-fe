import React from 'react';
import { motion } from 'framer-motion';
import { CommitteeContainer } from '@/containers/CommitteeContainer';

export const Committee: React.FC = () => {
  return (
    <motion.div className='min-h-screen bg-white' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <CommitteeContainer />
    </motion.div>
  );
};
