import React from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  className = '',
}) => {
  const baseStyles = 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all';

  const borderStyles = error
    ? `border-red-500 focus:border-red-600 focus:ring-red-100`
    : `border-gray-300 focus:border-orange-600 focus:ring-orange-100`;

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '';

  return (
    <div>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        required={required}
        className={`${baseStyles} ${borderStyles} ${disabledStyles} ${className} resize-vertical`}
      />
      {maxLength && (
        <p className="text-xs text-gray-500 mt-1">
          {value.length} / {maxLength} characters
        </p>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};
