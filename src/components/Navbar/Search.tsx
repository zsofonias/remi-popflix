import { useRef } from 'react';
import { useKeydownListener } from '../hooks/useKeydownListener';

interface SearchProps {
  query: string;
  setQuery: (value: React.SetStateAction<string>) => void;
  onQueryInput?: (value: string) => void;
}

function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   // if (inputEl.current) {
  //   //   inputEl.current.focus();
  //   // }

  //   function callback(e: KeyboardEvent) {
  //     if (e.code === 'Enter') {
  //       if (document.activeElement === inputEl.current) return;
  //       inputEl.current?.focus();
  //       setQuery('');
  //     }
  //   }

  //   document.addEventListener('keydown', callback);

  //   return () => {
  //     document.removeEventListener('keydown', callback);
  //   };
  // }, [setQuery]);
  useKeydownListener({
    key: 'Enter',
    action: () => {
      if (document.activeElement === inputEl.current) return;
      inputEl.current?.focus();
      setQuery('');
    },
  });

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
