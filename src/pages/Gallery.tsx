import React from 'react';
import { motion } from 'framer-motion';
import { GalleryContainer } from '@/containers/GalleryContainer';

export const Gallery: React.FC = () => {
  return (
    <motion.div className='min-h-screen bg-white' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <GalleryContainer />
    </motion.div>
  );
};
