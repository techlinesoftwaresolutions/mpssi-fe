# API Service Layer Documentation

## Overview

The MPSS Web Application uses a professional, industry-standard API service layer built with **Axios** for HTTP communication. This architecture provides:

- ✅ **Type-Safe**: Full TypeScript support with interfaces for all API responses
- ✅ **Scalable**: Service-oriented architecture that grows with your needs
- ✅ **Error Handling**: Automatic retry logic with exponential backoff
- ✅ **Centralized**: Single point of configuration for all API settings
- ✅ **Testable**: Clean separation of concerns for unit testing

## Directory Structure

```
src/
├── config/
│   └── apiConfig.ts              # API configuration and endpoints
├── services/
│   ├── api/
│   │   ├── axiosInstance.ts      # Axios client with interceptors
│   │   └── httpClient.ts         # HTTP wrapper with type safety
│   ├── types/
│   │   └── api.types.ts          # TypeScript interfaces
│   ├── endpoints/
│   │   ├── postsService.ts       # Posts API service
│   │   ├── usersService.ts       # Users API service
│   │   ├── commentsService.ts    # Comments API service
│   │   └── eventsService.ts      # Events API service (MPSS custom)
│   └── index.ts                  # Main export file
└── hooks/
    └── useApi.ts                 # Custom React hook for API calls
```

## Quick Start

### 1. Basic API Call

```typescript
import { PostsService } from '@/services';

export function MyComponent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostsService.getAllPosts()
      .then(data => setPosts(data))
      .catch(error => console.error(error));
  }, []);

  return <div>{/* render posts */}</div>;
}
```

### 2. Using the Custom Hook

```typescript
import { useApi } from '@/hooks/useApi';
import { PostsService } from '@/services';

export function MyComponent() {
  const { data, loading, error, execute } = useApi(
    () => PostsService.getAllPosts(),
    true  // Run immediately on mount
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* render data */}</div>;
}
```

### 3. With Error Handling

```typescript
try {
  const posts = await PostsService.getPostsByUserId(1);
  console.log(posts);
} catch (error) {
  // Automatically retried 3 times with exponential backoff
  // If error persists, it's thrown here
  console.error('Failed to fetch posts:', error);
}
```

## Configuration

### API Base URL

Set in `.env.local`:
```env
VITE_API_BASE_URL=https://your-api-url.com
```

Default: `https://jsonplaceholder.typicode.com`

### API Settings (`src/config/apiConfig.ts`)

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 10000,              // 10 seconds
  RETRY_ATTEMPTS: 3,           // Retry failed requests 3 times
  RETRY_DELAY: 1000,           // Initial retry delay (exponential backoff)
};
```

## Available Services

### PostsService

```typescript
import { PostsService } from '@/services';

// Fetch all posts
await PostsService.getAllPosts()

// Fetch with pagination
await PostsService.getPostsPaginated(1, 10)

// Fetch single post
await PostsService.getPostById(1)

// Create post
await PostsService.createPost({ userId: 1, title: '...', body: '...' })

// Update post
await PostsService.updatePost(1, { title: 'Updated' })

// Delete post
await PostsService.deletePost(1)

// Fetch posts by user
await PostsService.getPostsByUserId(1)
```

### UsersService

```typescript
import { UsersService } from '@/services';

// Fetch all users
await UsersService.getAllUsers()

// Fetch with pagination
await UsersService.getUsersPaginated(1, 10)

// Fetch single user
await UsersService.getUserById(1)

// Search by username
await UsersService.getUserByUsername('Bret')
```

### CommentsService

```typescript
import { CommentsService } from '@/services';

// Fetch all comments
await CommentsService.getAllComments()

// Fetch with pagination
await CommentsService.getCommentsPaginated(1, 10)

// Fetch comments for a post
await CommentsService.getCommentsByPostId(1)
```

### EventsService (MPSS Custom)

```typescript
import { EventsService } from '@/services';

// Fetch all events
await EventsService.getAllEvents()

// Fetch upcoming events
await EventsService.getUpcomingEvents(5)

// Fetch by category
await EventsService.getEventsByCategory('workshop')

// Create event
await EventsService.createEvent({
  title: 'Workshop',
  date: '2024-03-15',
  time: '10:00 AM',
  location: 'Delhi',
  category: 'workshop'
})

// Register for event
await EventsService.registerForEvent(1, 1)

// Search events
await EventsService.searchEvents('python')
```

## TypeScript Types

### Common Response Types

```typescript
// Single item response
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

// Array response with pagination
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Error response
interface ApiErrorResponse {
  status: number;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}
```

### Model Types

```typescript
// Post
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// User
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  // ... more fields
}

// Event (MPSS)
interface Event {
  id: number;
  title: string;
  titleHi?: string;
  date: string;
  time: string;
  location: string;
  category: 'workshop' | 'seminar' | 'fundraiser' | 'community' | 'scholarship';
  image?: string;
  capacity?: number;
  registeredCount?: number;
}
```

## Advanced Features

### Request Interceptors

Automatically adds:
- Authentication token from `localStorage.authToken`
- Content-Type headers
- Request logging (development only)

```typescript
// Token is automatically included
const token = localStorage.getItem('authToken');
// Bearer ${token} is added to all requests
```

### Response Interceptors

Features:
- Response logging (development)
- Automatic retry on network failures
- Error transformation
- Token refresh (can be added)

### Error Handling

Automatic retry logic for:
- Network timeouts (ECONNABORTED, ETIMEDOUT)
- Server errors (5xx)
- Rate limiting (429)

Does NOT retry:
- Client errors (4xx) except 429
- Authentication failures (401, 403)

### Exponential Backoff

retry delays = `retryDelay × 2^(attemptNumber - 1)`

Example:
- Attempt 1: Fail immediately
- Attempt 2: Retry after 1 second
- Attempt 3: Retry after 2 seconds  
- Attempt 4: Retry after 4 seconds

## Real Example: Events Component

```typescript
import { useEffect, useState } from 'react';
import { EventsService } from '@/services';
import type { Event } from '@/services/types/api.types';

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const upcomingEvents = await EventsService.getUpcomingEvents(10);
        setEvents(upcomingEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.date} at {event.time}</p>
          <p>{event.location}</p>
          <button onClick={() => EventsService.registerForEvent(event.id, 1)}>
            Register
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Creating a New Service

1. **Create the service file** in `src/services/endpoints/`:

```typescript
// src/services/endpoints/scholarshipService.ts
import { HttpClient } from '@/services/api/httpClient';
import { API_ENDPOINTS } from '@/config/apiConfig';
import { Scholarship } from '@/services/types/api.types';

export class ScholarshipService {
  static async getAllScholarships(): Promise<Scholarship[]> {
    try {
      const scholarships = await HttpClient.get<Scholarship[]>(
        API_ENDPOINTS.SCHOLARSHIPS.LIST
      );
      return scholarships;
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      throw error;
    }
  }

  static async applyForScholarship(data: Omit<Scholarship, 'id'>) {
    return HttpClient.post(API_ENDPOINTS.SCHOLARSHIPS.CREATE, data);
  }
}
```

2. **Add types** to `src/services/types/api.types.ts`
3. **Add endpoints** to `src/config/apiConfig.ts`
4. **Export from** `src/services/index.ts`

## Testing API Calls

Visit the [API Example Page](/api-example) to see the API services in action:
- Fetch posts from JSONPlaceholder API
- Test different user filters
- View real-time API responses
- See error handling in action

## Environment Variables

Create `.env.local` file:

```env
# API Configuration
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_KEY=your-api-key-here
VITE_API_TIMEOUT=15000

# Authentication
VITE_AUTH_TOKEN=your-auth-token
```

## Troubleshooting

### "Failed to fetch" Error

Check:
1. API endpoint URL is correct
2. CORS is enabled on API server
3. Network tab in browser DevTools
4. Check browser console for detailed error

### Requests Keep Timing Out

Increase timeout in `API_CONFIG.TIMEOUT` (milliseconds)

### Too Many Retries

Reduce `API_CONFIG.RETRY_ATTEMPTS`

### Authentication Issues

Set token in localStorage:
```typescript
localStorage.setItem('authToken', 'your-token-here');
```

## Best Practices

✅ **DO:**
- Use service methods for all API calls
- Implement loading and error states in components
- Use TypeScript interfaces for type safety
- Handle errors gracefully in UI
- Use the `useApi` hook for common patterns

❌ **DON'T:**
- Make direct axios calls from components
- Ignore error responses
- Hardcode API URLs in components
- Assume API responses without type checking

## Performance Tips

1. **Paginate Large Datasets**
   ```typescript
   const response = await PostsService.getPostsPaginated(1, 20);
   ```

2. **Cache Responses**
   Consider adding React Query or SWR for automatic caching

3. **Debounce Search Requests**
   ```typescript
   const [query, setQuery] = useState('');
   const debouncedSearch = useCallback(
     debounce((q: string) => EventsService.searchEvents(q), 300),
     []
   );
   ```

## Next Steps

- [ ] Add OAuth authentication
- [ ] Implement React Query/SWR caching
- [ ] Add request interceptor for auth refresh
- [ ] Add API request analytics
- [ ] Add request rate limiting
- [ ] Implement GraphQL if needed

---

**Questions?** Check the [APIExample.tsx](/src/pages/APIExample.tsx) for a working demonstration!
