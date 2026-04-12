import { POSTCODES } from '../config/constants';

interface SearchBarProps {
  postcode: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  validationError: string;
}

export function SearchBar({ postcode, onChange, onSearch, isLoading, validationError }: SearchBarProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={postcode}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
        placeholder="Enter postcode in UK Format e.g AA9 9AA"
      />

      <select
        onChange={(e) => {
          onChange(e.target.value)
          onSearch()
        }}
        value=""
      >
        <option value="" disabled>Example postcodes</option>
        {POSTCODES.map((pc) => (
          <option key={pc} value={pc}>{pc}</option>
        ))}
      </select>

      <button onClick={onSearch} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>

      {validationError && <p style={{ color: 'red', marginTop: '5px' }}>{validationError}</p>}
    </div>
  );
}
