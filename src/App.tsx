import { useRestaurantSearch } from './hooks/useRestaurantSearch';
import { LoadingSpinner } from './components/status/LoadingSpinner';
import { IdleState } from './components/status/IdleState';

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

      {status === 'idle' && <IdleState />}
      {status === 'loading' && <LoadingSpinner></LoadingSpinner>}
      {status === 'error' && <ApiErrorBanner error={apiError} onRetry={search} />}
      {status === 'success' && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}
