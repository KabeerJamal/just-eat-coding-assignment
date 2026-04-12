
export function Header() {
  return (
    <header className="app-header" role="banner">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <h1 className="app-header__title">Just Eat</h1>
          <span className="app-header__divider" aria-hidden="true" />
          <p className="app-header__subtitle">Search UK restaurants by postcode</p>
        </div>
      </div>
    </header>
  );
}