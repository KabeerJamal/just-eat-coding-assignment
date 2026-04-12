import { APIError } from '../api/errors';

interface ApiErrorBannerProps {
  error: APIError | Error | null;
  onRetry: () => void;
}

export function ApiErrorBanner({ error, onRetry }: ApiErrorBannerProps) {
  if (!error) return null;

  return (
    <div style={{ padding: '10px', border: '1px solid red', backgroundColor: '#ffe6e6', margin: '10px 0' }}>
      <p style={{ color: 'red', margin: '0 0 10px 0' }}>
        <strong>{error instanceof APIError ? `Error ${error.status} (${error.type})` : 'Error'}:</strong> {error.message}
      </p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
}
