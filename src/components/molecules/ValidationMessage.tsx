import React from 'react';
import { AlertCircle, CheckCircle, InfoIcon } from 'lucide-react';

interface ValidationMessageProps {
  message: string;
  type?: 'error' | 'success' | 'info' | 'warning';
  className?: string;
}

/**
 * ValidationMessage Molecule - Displays validation feedback
 * Used for error messages, success confirmations, info alerts
 * Includes contextual icon and color coding
 */
export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  message,
  type = 'error',
  className = ''
}) => {
  const typeStyles = {
    error: 'text-red-500 bg-red-50',
    success: 'text-green-600 bg-green-50',
    info: 'text-blue-600 bg-blue-50',
    warning: 'text-amber-600 bg-amber-50'
  };

  const iconMap = {
    error: <AlertCircle size={16} />,
    success: <CheckCircle size={16} />,
    info: <InfoIcon size={16} />,
    warning: <AlertCircle size={16} />
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${typeStyles[type]} ${className}`}>
      {iconMap[type]}
      <span>{message}</span>
    </div>
  );
};
