import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`${baseStyles} ${borderStyles} ${disabledStyles} ${className}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};
