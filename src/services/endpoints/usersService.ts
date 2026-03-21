import { HttpClient } from '@/services/api/httpClient';
import { API_ENDPOINTS } from '@/config/apiConfig';
import type { User, PaginatedResponse } from '@/services/types';

/**
 * Users Service - Handles all user-related API calls
 */
export class UsersService {
  /**
   * Fetch all users
   * @returns Promise<User[]> - Array of all users
   */
  static async getAllUsers(): Promise<User[]> {
    try {
      const users = await HttpClient.get<User[]>(API_ENDPOINTS.USERS.LIST);
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  /**
   * Fetch users with pagination
   * @param page - Page number (1-indexed)
   * @param pageSize - Number of users per page
   */
  static async getUsersPaginated(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<User>> {
    try {
      const params = {
        _page: page,
        _limit: pageSize,
      };
      const users = await HttpClient.getPaginated<User>(
        API_ENDPOINTS.USERS.LIST,
        params
      );
      return users;
    } catch (error) {
      console.error('Error fetching paginated users:', error);
      throw error;
    }
  }

  /**
   * Fetch a single user by ID
   * @param id - User ID
   * @returns Promise<User> - Single user object
   */
  static async getUserById(id: number): Promise<User> {
    try {
      const user = await HttpClient.get<User>(
        `${API_ENDPOINTS.USERS.GET}/${id}`
      );
      return user;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch user by username
   * @param username - Username to search for
   */
  static async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const users = await HttpClient.get<User[]>(API_ENDPOINTS.USERS.LIST, {
        params: { username },
      });
      return users[0];
    } catch (error) {
      console.error(`Error searching user by username ${username}:`, error);
      throw error;
    }
  }
}
