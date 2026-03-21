// Color Theme for Merit Registration Form

export const colors = {
  // Primary Colors
  primary: {
    saffron: '#E67E22',
    saffronLight: '#F39C12',
    saffronDark: '#D35400',
  },

  // Secondary Colors
  secondary: {
    blue: '#3498DB',
    blueLight: '#5DADE2',
    blueDark: '#154360',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray600: '#4B5563',
    gray700: '#374151',
    gray900: '#111827',
    black: '#000000',
  },

  // Status Colors
  status: {
    success: '#10B981',
    successLight: '#D1FAE5',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    info: '#0EA5E9',
    infoLight: '#CFFAFE',
  },

  // Semantic Colors
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Border Colors
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },
} as const;

export type ColorTypes = typeof colors;
