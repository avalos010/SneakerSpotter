import "./skeleton.css";

function CardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-block skeleton-card--image" />
      <div className="skeleton-card--body">
        <div className="skeleton-block skeleton-line skeleton-line--short" />
        <div className="skeleton-block skeleton-line skeleton-line--title" />
        <div className="skeleton-block skeleton-line skeleton-line--medium" />
        <div className="skeleton-card--offers">
          {[0, 1].map((item) => <div className="skeleton-card--offer" key={item}><div className="skeleton-block skeleton-line" /><div className="skeleton-block skeleton-button" /></div>)}
        </div>
        <div className="skeleton-block skeleton-line skeleton-line--medium" />
      </div>
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div role="status" data-cy="catalog-skeleton">
      <span className="skeleton-sr-only">Loading sneakers…</span>
      <p className="skeleton-message"><span aria-hidden="true">✳</span> We check sneaker sites live for listings. Recent results may be cached.</p>
      <div className="sneaker-container">
        <div className="skeleton-catalog" aria-hidden="true">
          {[0, 1, 2, 3].map((item) => <CardSkeleton key={item} />)}
        </div>
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div role="status" data-cy="details-skeleton">
      <span className="skeleton-sr-only">Loading sneaker prices…</span>
      <p className="skeleton-message"><span aria-hidden="true">✳</span> We scrape sneaker sites for live prices. Recent results may be cached.</p>
      <div aria-hidden="true">
        <div className="skeleton-block skeleton-details--title" />
        <div className="sneaker-details--layout">
          <div className="skeleton-panel skeleton-details--image"><div className="skeleton-block" /></div>
          <div className="skeleton-panel skeleton-details--info">
            {[0, 1, 2].map((item) => <div className="skeleton-details--row" key={item}><div className="skeleton-block skeleton-line skeleton-line--short" /><div className="skeleton-block skeleton-line skeleton-line--medium" /></div>)}
            <div className="skeleton-block skeleton-details--heading" />
            {[0, 1, 2].map((item) => <div className="skeleton-card--offer" key={item}><div className="skeleton-block skeleton-line" /><div className="skeleton-block skeleton-button" /></div>)}
          </div>
        </div>
        <div className="skeleton-panel skeleton-details--table"><div className="skeleton-block skeleton-details--heading" /><div className="skeleton-block skeleton-details--table-body" /></div>
      </div>
    </div>
  );
}
