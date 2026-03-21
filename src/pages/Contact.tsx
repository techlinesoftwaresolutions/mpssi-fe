import React from 'react';
import { motion } from 'framer-motion';
import { ContactContainer } from '@/containers/ContactContainer';

export const Contact: React.FC = () => {
  return (
    <motion.div className='min-h-screen bg-white' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ContactContainer />
    </motion.div>
  );
};
