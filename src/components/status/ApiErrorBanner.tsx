import { APIError } from '../../api/errors';

interface ApiErrorBannerProps {
  error: APIError | Error | null;
  onRetry: () => void;
}

export function ApiErrorBanner({ error, onRetry }: ApiErrorBannerProps) {
  if (!error) return null;

  const title = error instanceof APIError ? `Error ${error.status} (${error.type})` : 'Error';

  return (
    <div className="error-banner">
      <p className="error-banner__message">
        <strong>{title}:</strong> {error.message}
      </p>
      <button className="error-banner__retry" onClick={onRetry}>Try Again</button>
    </div>
  );
}