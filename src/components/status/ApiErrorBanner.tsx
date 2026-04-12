import { APIError } from '../../api/errors';

interface ApiErrorBannerProps {
  error: APIError | Error | null;
}

export function ApiErrorBanner({ error }: ApiErrorBannerProps) {
  if (!error) return null;

  const title = error instanceof APIError ? `Error (${error.type})` : 'Error';

  return (
    <div className="error-banner">
      <p className="error-banner__message">
        <strong>{title}:</strong> {`⚠️ ${error.message}, Try again`}
      </p>
    </div>
  );
}