import { useRestaurantSearch } from './hooks/useRestaurantSearch';
import { SearchBar } from './components/search/SearchBar';
import { ApiErrorBanner } from './components/status/ApiErrorBanner';
import { RestaurantList } from './components/restaurants/RestaurantList';
import { Header } from './components/layout/Header';
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
    <div>
      <Header></Header>

      <SearchBar
        postcode={postcode}
        onChange={setPostcode}
        onSearch={search}
        isLoading={status === 'loading'}
        validationError={validationError}
      />

      {status === 'idle' && <IdleState />}
      {status === 'loading' && <LoadingSpinner></LoadingSpinner>}
      {status === 'error' && <ApiErrorBanner error={apiError}/>}
      {status === 'success' && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}
