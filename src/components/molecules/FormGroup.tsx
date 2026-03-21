import React from 'react';
import { ValidationMessage } from './ValidationMessage';

interface FormGroupProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  helperText?: string;
  className?: string;
}

/**
 * FormGroup Molecule - Wraps form atoms (Input, Select, Textarea, etc.)
 * Provides consistent label, error message, and helper text layout
 * Used to group label + input + error in one cohesive unit
 */
export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  error,
  required = false,
  children,
  helperText,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="mb-2">
        {children}
      </div>

      {error && <ValidationMessage message={error} type="error" />}

      {helperText && !error && (
        <p className="text-xs text-gray-500 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};
