import { HttpClient } from '@/services/api/httpClient';
import { API_ENDPOINTS } from '@/config/apiConfig';
import { Post, PaginatedResponse } from '@/services/types/api.types';

/**
 * Posts Service - Handles all post-related API calls
 * Example service demonstrating how to consume JSONPlaceholder API
 * This can be replicated for other endpoints (Events, Users, Comments, etc.)
 */
export class PostsService {
  /**
   * Fetch all posts
   * @returns Promise<Post[]> - Array of all posts
   */
  static async getAllPosts(): Promise<Post[]> {
    try {
      const posts = await HttpClient.get<Post[]>(API_ENDPOINTS.POSTS.LIST);
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  /**
   * Fetch posts with pagination
   * @param page - Page number (1-indexed)
   * @param pageSize - Number of posts per page
   * @returns Promise<PaginatedResponse<Post>> - Paginated posts
   */
  static async getPostsPaginated(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Post>> {
    try {
      const params = {
        _page: page,
        _limit: pageSize,
      };
      const posts = await HttpClient.getPaginated<Post>(
        API_ENDPOINTS.POSTS.LIST,
        params
      );
      return posts;
    } catch (error) {
      console.error('Error fetching paginated posts:', error);
      throw error;
    }
  }

  /**
   * Fetch a single post by ID
   * @param id - Post ID
   * @returns Promise<Post> - Single post object
   */
  static async getPostById(id: number): Promise<Post> {
    try {
      const post = await HttpClient.get<Post>(
        `${API_ENDPOINTS.POSTS.GET}/${id}`
      );
      return post;
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new post
   * @param post - Post data (userId, title, body)
   * @returns Promise<Post> - Created post with ID
   */
  static async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const newPost = await HttpClient.post<Post>(API_ENDPOINTS.POSTS.CREATE, post);
      return newPost;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  /**
   * Update an existing post
   * @param id - Post ID
   * @param post - Updated post data
   * @returns Promise<Post> - Updated post
   */
  static async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    try {
      const updatedPost = await HttpClient.put<Post>(
        `${API_ENDPOINTS.POSTS.UPDATE}/${id}`,
        post
      );
      return updatedPost;
    } catch (error) {
      console.error(`Error updating post ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a post
   * @param id - Post ID
   * @returns Promise<void>
   */
  static async deletePost(id: number): Promise<void> {
    try {
      await HttpClient.delete(`${API_ENDPOINTS.POSTS.DELETE}/${id}`);
    } catch (error) {
      console.error(`Error deleting post ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch posts by user ID
   * @param userId - User ID
   * @returns Promise<Post[]> - Posts from specific user
   */
  static async getPostsByUserId(userId: number): Promise<Post[]> {
    try {
      const posts = await HttpClient.get<Post[]>(API_ENDPOINTS.POSTS.LIST, {
        params: { userId },
      });
      return posts;
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error);
      throw error;
    }
  }
}
