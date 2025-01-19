import { useEffect } from 'react';

interface IUseKeydownListenerParams {
  key: string;
  action: () => void;
}

export function useKeydownListener({ key, action }: IUseKeydownListenerParams) {
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [key, action]);
}
