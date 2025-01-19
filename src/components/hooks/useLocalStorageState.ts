import { useEffect, useState } from 'react';

interface IUseLocalStorageStateParams<T> {
  initialState: T | (() => T);
  key: string;
}

export function useLocalStorageState<T>({
  initialState,
  key,
}: IUseLocalStorageStateParams<T>) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    // return storedValue ? JSON.parse(storedValue) : initialState;
    if (storedValue !== null) {
      return JSON.parse(storedValue) as T;
    }
    return typeof initialState === 'function'
      ? (initialState as () => T)()
      : initialState;
  });

  useEffect(() => {
    // localStorage.setItem(key, JSON.stringify(value));
    const valueString = JSON.stringify(value);
    if (localStorage.getItem(key) !== valueString) {
      localStorage.setItem(key, valueString);
    }
  }, [value, key]);

  return [value, setValue] as const;
}
