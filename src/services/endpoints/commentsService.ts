import { HttpClient } from '@/services/api/httpClient';
import { API_ENDPOINTS } from '@/config/apiConfig';
import { Comment, PaginatedResponse } from '@/services/types/api.types';

/**
 * Comments Service - Handles all comment-related API calls
 */
export class CommentsService {
  /**
   * Fetch all comments
   * @returns Promise<Comment[]> - Array of all comments
   */
  static async getAllComments(): Promise<Comment[]> {
    try {
      const comments = await HttpClient.get<Comment[]>(API_ENDPOINTS.COMMENTS.LIST);
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  /**
   * Fetch comments with pagination
   * @param page - Page number (1-indexed)
   * @param pageSize - Number of comments per page
   */
  static async getCommentsPaginated(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Comment>> {
    try {
      const params = {
        _page: page,
        _limit: pageSize,
      };
      const comments = await HttpClient.getPaginated<Comment>(
        API_ENDPOINTS.COMMENTS.LIST,
        params
      );
      return comments;
    } catch (error) {
      console.error('Error fetching paginated comments:', error);
      throw error;
    }
  }

  /**
   * Fetch a single comment by ID
   * @param id - Comment ID
   * @returns Promise<Comment> - Single comment object
   */
  static async getCommentById(id: number): Promise<Comment> {
    try {
      const comment = await HttpClient.get<Comment>(
        `${API_ENDPOINTS.COMMENTS.GET}/${id}`
      );
      return comment;
    } catch (error) {
      console.error(`Error fetching comment ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch comments for a specific post
   * @param postId - Post ID
   * @returns Promise<Comment[]> - Comments on that post
   */
  static async getCommentsByPostId(postId: number): Promise<Comment[]> {
    try {
      const comments = await HttpClient.get<Comment[]>(
        API_ENDPOINTS.COMMENTS.LIST,
        {
          params: { postId },
        }
      );
      return comments;
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      throw error;
    }
  }
}
