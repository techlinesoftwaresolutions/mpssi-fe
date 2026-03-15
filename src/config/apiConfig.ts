// API Configuration - Centralized API settings
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// API Endpoints
export const API_ENDPOINTS = {
  POSTS: {
    LIST: '/posts',
    GET: '/posts',
    CREATE: '/posts',
    UPDATE: '/posts',
    DELETE: '/posts',
  },
  USERS: {
    LIST: '/users',
    GET: '/users',
  },
  COMMENTS: {
    LIST: '/comments',
    GET: '/comments',
  },
  EVENTS: {
    LIST: '/events',
    GET: '/events',
    CREATE: '/events',
    UPDATE: '/events',
    DELETE: '/events',
  },
};
