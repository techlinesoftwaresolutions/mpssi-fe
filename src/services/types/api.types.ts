// Generic API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

// Generic Paginated Response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Generic Error Response
export interface ApiErrorResponse {
  status: number;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}

// Placeholder Post Type (Example API)
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Placeholder User Type (Example API)
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

// Placeholder Comment Type (Example API)
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// Event Type (MPSS Custom)
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

// Request Configuration
export interface RequestConfig {
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}
