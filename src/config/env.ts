export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'MPSSIWEB';

export const CONFIG = {
  apiBaseUrl: API_BASE_URL,
  geminiApiKey: GEMINI_API_KEY,
  appName: APP_NAME,
} as const;
