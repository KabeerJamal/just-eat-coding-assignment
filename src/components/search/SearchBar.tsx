import { POSTCODES } from '../../config/constants';

interface SearchBarProps {
  postcode: string;
  onChange: (value: string) => void;
  onSearch: (value?: string) => void;
  isLoading: boolean;
  validationError: string;
}

export function SearchBar({ postcode, onChange, onSearch, isLoading, validationError }: SearchBarProps) {
  return (
    <section className="search-bar" aria-label="Search by postcode">
      <div className="search-bar__row">
        <div className="search-bar__field search-bar__field--grow">
          <label className="search-bar__label" htmlFor="search-bar-postcode">
            Postcode
          </label>
          <input
            id="search-bar-postcode"
            className="search-bar__input"
            type="text"
            value={postcode}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
            placeholder="e.g. AA9 9AA"
            autoComplete="postal-code"
          />
        </div>

        <div className="search-bar__field">
          <label className="search-bar__label" htmlFor="search-bar-examples">
            Examples
          </label>
          <select
            id="search-bar-examples"
            className="search-bar__select"
            onChange={(e) => {
              onChange(e.target.value);
              onSearch(e.target.value);
            }}
            value=""
            aria-label="Pick an example postcode"
          >
            <option value="" disabled>
              Example postcodes
            </option>
            {POSTCODES.map((pc) => (
              <option key={pc} value={pc}>
                {pc}
              </option>
            ))}
          </select>
        </div>

        <div className="search-bar__actions">
          <button
            type="button"
            className="search-bar__button"
            onClick={() => onSearch()}
            disabled={isLoading}
          >
            {isLoading ? 'Searching…' : 'Search'}
          </button>
        </div>
      </div>

      {validationError && (
        <p className="search-bar__error" role="alert">
          {validationError}
        </p>
      )}
    </section>
  );
}