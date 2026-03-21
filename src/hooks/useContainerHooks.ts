/**
 * Common Hooks for Container Components
 * Reusable patterns for container-presenter architecture
 */

import { useState, useCallback, useEffect } from 'react';

/**
 * usePageState - Manage page-level state with loading/error handling
 * 
 * @example
 * const { data, loading, error, setData, setError } = usePageState([]);
 */
export function usePageState<T>(initialData: T) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetError = useCallback(() => setError(null), []);
  const clearData = useCallback(() => setData(initialData), [initialData]);

  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    resetError,
    clearData,
    isLoading: loading,
    hasError: !!error
  };
}

/**
 * useSelection - Manage single item selection state
 * 
 * @example
 * const { selected, selectItem, clearSelection } = useSelection();
 */
export function useSelection<T>() {
  const [selected, setSelected] = useState<T | null>(null);

  const selectItem = useCallback((item: T) => {
    setSelected(item);
  }, []);

  const clearSelection = useCallback(() => {
    setSelected(null);
  }, []);

  const toggleSelection = useCallback((item: T) => {
    setSelected(prev => (prev === item ? null : item));
  }, []);

  return {
    selected,
    selectItem,
    clearSelection,
    toggleSelection,
    isSelected: (item: T) => selected === item
  };
}

/**
 * useForm - Manage form state with validation
 * 
 * @example
 * const { formData, setField, reset, errors } = useForm(initialData);
 */
export function useForm<T extends Record<string, any>>(initialData: T) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setField = useCallback((name: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const setFieldError = useCallback((name: keyof T, error: string | null) => {
    setErrors(prev => {
      if (error) {
        return { ...prev, [name]: error };
      } else {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
    });
  }, []);

  const markFieldTouched = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const reset = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  return {
    formData,
    setField,
    setFieldError,
    markFieldTouched,
    reset,
    errors,
    touched,
    hasErrors: Object.keys(errors).length > 0,
    isDirty: JSON.stringify(formData) !== JSON.stringify(initialData)
  };
}

/**
 * useFilters - Manage multiple filter states
 * 
 * @example
 * const { filters, setFilter, resetFilters } = useFilters({ category: '', search: '' });
 */
export function useFilters<T extends Record<string, any>>(initialFilters: T) {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = useCallback((name: keyof T, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const clearFilter = useCallback((name: keyof T) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[name];
      return newFilters;
    });
  }, []);

  return {
    filters,
    setFilter,
    clearFilter,
    resetFilters,
    isActive: (key: keyof T) => !!filters[key]
  };
}

/**
 * useAsync - Handle async data fetching
 * 
 * @example
 * const { data, loading, error } = useAsync(fetchData, []);
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  dependencies: any[] = []
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err as Error);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success'
  };
}

/**
 * usePagination - Manage pagination state
 * 
 * @example
 * const { page, pageSize, goToPage, nextPage, prevPage } = usePagination();
 */
export function usePagination(initialPage = 1, initialPageSize = 10) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, newPage));
  }, []);

  const nextPage = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage(prev => Math.max(1, prev - 1));
  }, []);

  const setSize = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  return {
    page,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    setPageSize: setSize,
    offset: (page - 1) * pageSize
  };
}

/**
 * useLocalStorage - Persist state to localStorage
 * 
 * @example
 * const [value, setValue] = useLocalStorage('key', defaultValue);
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

export default {
  usePageState,
  useSelection,
  useForm,
  useFilters,
  useAsync,
  usePagination,
  useLocalStorage
};
