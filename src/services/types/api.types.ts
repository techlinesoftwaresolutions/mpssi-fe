/**
 * API Type Definitions
 * Central location for all API-related TypeScript interfaces
 */

// ============================================================================
// Generic API Response Types
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}

// ============================================================================
// Placeholder Types (Example APIs)
// ============================================================================

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// ============================================================================
// MPSS Custom Types
// ============================================================================

export interface Event {
  id: number;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  date: string;
  time: string;
  location: string;
  locationHi?: string;
  category: 'workshop' | 'seminar' | 'fundraiser' | 'community' | 'scholarship';
  image?: string;
  registrationLink?: string;
  capacity?: number;
  registeredCount?: number;
}

export interface RequestConfig {
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}
