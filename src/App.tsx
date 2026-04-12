import { useRestaurantSearch } from './hooks/useRestaurantSearch';
import { SearchBar } from './components/SearchBar';
import { ApiErrorBanner } from './components/ApiErrorBanner';
import { RestaurantList } from './components/RestaurantList';

export default function App() {
  const {
    postcode,
    setPostcode,
    restaurants,
    status,
    apiError,
    validationError,
    search
  } = useRestaurantSearch();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header>
        <h2>Just Eat: Search</h2>
      </header>

      <SearchBar
        postcode={postcode}
        onChange={setPostcode}
        onSearch={search}
        isLoading={status === 'loading'}
        validationError={validationError}
      />

      {status === 'loading' && (
        <div style={{ margin: '15px 0', fontStyle: 'italic', color: '#555' }}>
          Loading restaurants...
        </div>
      )}

      {status === 'error' && <ApiErrorBanner error={apiError} onRetry={search} />}

      {status === 'success' && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}
