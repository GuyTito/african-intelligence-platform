import { useSearchParams } from 'react-router';

// Custom hook to handle object state in the URL
export function useUrlState<T extends Record<string, any>>(initialState: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Update the URL with the new state
  const updateUrl = (newState: Partial<T>) => {
    const updatedParams = new URLSearchParams(searchParams);

    Object.entries(newState).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        updatedParams.set(key, String(value)); // Set the value if it's not null, undefined, or empty string
      } else {
        updatedParams.delete(key); // Remove the key otherwise
      }
    });

    setSearchParams(updatedParams, { replace: true });
  };

  // Get the current state from the URL
  const getStateFromUrl = (): T => {
    const state: Partial<T> = {};
    Object.keys(initialState).forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        state[key as keyof T] = value as T[keyof T];
      }
    });
    return { ...initialState, ...state };
  };

  return [getStateFromUrl(), updateUrl] as const;
}
