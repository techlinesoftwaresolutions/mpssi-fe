import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { API_CONFIG } from '@/config/apiConfig';
import type { ApiErrorResponse } from '@/services/types';

class AxiosClient {
  private instance: AxiosInstance;
  private retryCount: Map<string, number> = new Map();

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (import.meta.env.DEV) {
          console.log('🚀 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // Log response in development
        if (import.meta.env.DEV) {
          console.log('✅ API Response:', {
            status: response.status,
            url: response.config.url,
            data: response.data,
          });
        }

        // Reset retry count on success
        const key = this.getRequestKey(response.config);
        this.retryCount.delete(key);

        return response;
      },
      async (error: AxiosError) => {
        const config = error.config as AxiosRequestConfig & {
          _retryCount?: number;
        };

        if (!config) {
          return Promise.reject(error);
        }

        const key = this.getRequestKey(config);
        const currentRetry = this.retryCount.get(key) || 0;

        // Retry logic for specific status codes and network errors
        if (
          this.shouldRetry(error) &&
          currentRetry < API_CONFIG.RETRY_ATTEMPTS
        ) {
          this.retryCount.set(key, currentRetry + 1);

          const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, currentRetry); // Exponential backoff
          console.warn(
            `⚠️  Retrying request (${currentRetry + 1}/${API_CONFIG.RETRY_ATTEMPTS}) after ${delay}ms`,
            config.url
          );

          await this.delay(delay);
          return this.instance(config);
        }

        // Log error in development
        console.error('❌ API Error:', {
          status: error.response?.status,
          message: error.message,
          url: error.config?.url,
          data: error.response?.data,
        });

        // Clear retry count
        this.retryCount.delete(key);

        return Promise.reject(error);
      }
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    // Don't retry client errors (4xx) except 429 (Too Many Requests)
    if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
      return error.response.status === 429;
    }

    // Retry server errors (5xx) and network timeouts
    if (error.response?.status && error.response.status >= 500) {
      return true;
    }

    // Retry on network errors (ECONNABORTED, ETIMEDOUT, etc.)
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT' || !error.response) {
      return true;
    }

    return false;
  }

  private getRequestKey(config: AxiosRequestConfig): string {
    return `${config.method}:${config.url}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get the axios instance for advanced usage
   */
  public getInstance(): AxiosInstance {
    return this.instance;
  }

  /**
   * Make GET request
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  /**
   * Make POST request
   */
  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  /**
   * Make PUT request
   */
  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  /**
   * Make PATCH request
   */
  public async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  /**
   * Make DELETE request
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

// Export singleton instance
export const axiosClient = new AxiosClient();
