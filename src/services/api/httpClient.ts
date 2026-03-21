import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosClient } from '@/services/api/axiosInstance';
import type {
  ApiResponse,
  ApiErrorResponse,
  PaginatedResponse,
} from '@/services/types';

/**
 * HTTP Client Service - Centralized API communication
 * Provides type-safe methods for all HTTP operations
 * Includes error handling and response transformation
 */
export class HttpClient {
  /**
   * Fetch data from API with GET request
   * @template T - Response data type
   * @param url - API endpoint URL
   * @param config - Optional axios request config
   */
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosClient.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Fetch paginated data
   * @template T - Array item type
   * @param url - API endpoint URL
   * @param params - Query parameters (page, pageSize, etc.)
   */
  static async getPaginated<T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<PaginatedResponse<T>> {
    try {
      const response = await axiosClient.get<T[]>(url, { params });
      return {
        items: response.data,
        total: parseInt(response.headers['x-total-count'] || '0'),
        page: params?.page ? Number(params.page) : 1,
        pageSize: params?.pageSize ? Number(params.pageSize) : 10,
        hasMore: false,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Create new resource with POST request
   * @template T - Response data type
   * @param url - API endpoint URL
   * @param data - Request body data
   * @param config - Optional axios request config
   */
  static async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await axiosClient.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update resource with PUT request (full replacement)
   * @template T - Response data type
   * @param url - API endpoint URL
   * @param data - Request body data
   * @param config - Optional axios request config
   */
  static async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await axiosClient.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Partial update resource with PATCH request
   * @template T - Response data type
   * @param url - API endpoint URL
   * @param data - Request body data
   * @param config - Optional axios request config
   */
  static async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await axiosClient.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete resource with DELETE request
   * @param url - API endpoint URL
   * @param config - Optional axios request config
   */
  static async delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Transform API response - can be customized per project needs
   * @template T - Response data type
   * @param response - Axios response object
   */
  private static transformResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  /**
   * Centralized error handling
   * Transforms axios errors into consistent error format
   */
  private static handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      const errorResponse: ApiErrorResponse = {
        status: error.response?.status || 0,
        message: error.response?.data?.message || error.message || 'An error occurred',
        error: error.code,
        details: error.response?.data,
      };

      const customError = new Error(errorResponse.message);
      Object.assign(customError, errorResponse);
      return customError;
    }

    return error instanceof Error
      ? error
      : new Error('An unexpected error occurred');
  }
}
