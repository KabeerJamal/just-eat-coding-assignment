export function LoadingSpinner() {
    return (
      <div className="loading">
        <div className="loading__spinner" />
        <p className="loading__text">Finding restaurants...</p>
      </div>
    );
  }