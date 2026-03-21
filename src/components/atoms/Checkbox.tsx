import React from 'react';

interface CheckboxProps {
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  id,
}) => {
  return (
    <div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          id={id || name}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          required={required}
          className="w-4 h-4 border-gray-300 rounded text-orange-600 focus:ring-orange-100"
        />
        <span className="text-sm text-gray-700">{label}</span>
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
