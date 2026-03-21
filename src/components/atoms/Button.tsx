import React from 'react';
import { colors, textStyles } from '@/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  icon,
  children,
  className = '',
  onClick,
  type = 'button',
}) => {
  const baseStyles = 'font-bold rounded-lg transition-all focus:outline-none focus:ring-2';

  const variantStyles = {
    primary: `bg-[${colors.primary.saffron}] text-white hover:bg-[${colors.primary.saffronDark}] focus:ring-[${colors.primary.saffronLight}]`,
    secondary: `bg-[${colors.neutral.gray200}] text-[${colors.neutral.gray900}] hover:bg-[${colors.neutral.gray300}] focus:ring-[${colors.neutral.gray300}]`,
    outline: `border-2 border-[${colors.primary.saffron}] text-[${colors.primary.saffron}] hover:bg-[${colors.primary.saffronLight}] hover:text-white`,
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      <span className="flex items-center justify-center gap-2">
        {isLoading && <span className="animate-spin">⌛</span>}
        {icon}
        {children}
      </span>
    </button>
  );
};
