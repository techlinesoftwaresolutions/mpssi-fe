// Services API Exports
export { PostsService } from '@/services/endpoints/postsService';
export { UsersService } from '@/services/endpoints/usersService';
export { CommentsService } from '@/services/endpoints/commentsService';
export { EventsService } from '@/services/endpoints/eventsService';

// HTTP Client
export { HttpClient } from '@/services/api/httpClient';
export { axiosClient } from '@/services/api/axiosInstance';

// Types
export {
  ApiResponse,
  PaginatedResponse,
  ApiErrorResponse,
  Post,
  User,
  Comment,
  Event,
  RequestConfig,
} from '@/services/types/api.types';

// Configuration
export { API_CONFIG, API_ENDPOINTS } from '@/config/apiConfig';
