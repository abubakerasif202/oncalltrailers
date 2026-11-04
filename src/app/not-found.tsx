import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="fig">404</p>
        <h1 className="display" style={{ fontSize: 'var(--text-display)', marginTop: 'var(--space-lg)' }}>
          This page took a wrong turn
        </h1>
        <p className="lead hero__lead">
          The page you are after does not exist. Head back and pick a trailer instead.
        </p>
        <div className="actions" style={{ marginTop: 'var(--space-xl)' }}>
          <Link href="/" className="btn btn--primary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
