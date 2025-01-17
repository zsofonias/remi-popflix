interface SearchProps {
  query: string;
  setQuery: (value: React.SetStateAction<string>) => void;
  onQueryInput?: (value: string) => void;
}

function Search({ query, setQuery }: SearchProps) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
