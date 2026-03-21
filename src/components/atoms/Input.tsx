import React from 'react';
import { colors } from '@/theme';
import { AlertCircle } from 'lucide-react';

interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'password';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  min,
  max,
  step,
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
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        required={required}
        className={`${baseStyles} ${borderStyles} ${disabledStyles} ${className}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};
