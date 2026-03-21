import React from 'react';
import { motion } from 'framer-motion';
import { WelfareContainer } from '@/containers/WelfareContainer';

export const Welfare: React.FC = () => {
  return (
    <motion.div className='min-h-screen bg-white' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <WelfareContainer />
    </motion.div>
  );
};
