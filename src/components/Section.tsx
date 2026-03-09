import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ title, subtitle, children, className = "" }: SectionProps) => (
  <section className={`py-20 md:py-28 overflow-hidden ${className}`}>
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-saffron-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block"
        >
          {subtitle}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-heading font-bold text-gray-900 leading-tight"
        >
          {title}
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 100 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-1.5 bg-saffron-600 mx-auto mt-6 rounded-full"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);
