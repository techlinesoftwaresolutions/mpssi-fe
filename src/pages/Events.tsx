import React from 'react';
import { motion } from 'framer-motion';
import { EventsContainer } from '@/containers/EventsContainer';

export const Events: React.FC = () => {
  return (
    <motion.div className='min-h-screen bg-white' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <EventsContainer />
    </motion.div>
  );
};
