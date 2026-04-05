import React from 'react';
import { motion } from 'framer-motion';
import { ScholarshipFormContainer } from '@/containers';

/**
 * ScholarshipFormPage - Page Wrapper Component
 * 
 * Simple wrapper that:
 * - Handles routing for this page
 * - Renders the ScholarshipFormContainer which manages all logic and state
 * 
 * Page Structure:
 * Page (wrapper) → Container (logic) → Presenter (UI)
 * 
 * The ScholarshipFormContainer orchestrates:
 * 1. Form state and validation
 * 2. OTP modal and verification
 * 3. API submission
 * 
 * With all rendering delegated to ScholarshipFormPresenter
 */
export const ScholarshipFormPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <ScholarshipFormContainer />
    </motion.div>
  );
};
