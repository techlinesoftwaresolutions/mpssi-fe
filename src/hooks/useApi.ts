import { useState, useCallback, useEffect } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Custom Hook for API calls with loading and error states
 * Handles async operations and provides ready-to-use state management
 *
 * @template T - Response data type
 * @param asyncFunction - Async function to execute (API call)
 * @param immediate - Whether to execute immediately on mount (default: true)
 * @returns State object with data, loading, error; and execute function
 *
 * @example
 * const { data, loading, error, execute } = useApi(PostsService.getAllPosts);
 * useEffect(() => { execute(); }, [execute]);
 */
export function useApi<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = false
): UseApiState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Execute the async function
  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error occurred');
      setState({ data: null, loading: false, error: err });
    }
  }, [asyncFunction]);

  // Execute on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}

/**
 * Typed API Hook Factory - Creates type-safe hooks for specific API endpoints
 * Use this to create reusable hooks for different services
 *
 * @example
 * export const usePosts = () => createApiHook(PostsService.getAllPosts);
 * export const getPostById = (id: number) => createApiHook(() => PostsService.getPostById(id));
 */
export function createApiHook<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = false
) {
  return () => useApi(asyncFunction, immediate);
}
