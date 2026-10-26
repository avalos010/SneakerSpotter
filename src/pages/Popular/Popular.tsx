import "./popular.css";
import usePopularSneakers from "../../hooks/usePopularSneakers";
import SneakerGrid from "../../components/SneakerGrid/SneakerGrid";
import { CatalogSkeleton } from "../../components/Skeleton/Skeleton";
function Popular() {
  const { data, isLoading, isError, refetch } = usePopularSneakers();

  return (
    <div className="sneaker-wrapper" data-cy="sneakers-page">
      <div className="collection-heading"><div><h2>Popular Items<span>.</span></h2><p>Explore the pairs people are looking for right now.</p></div><span className="collection-heading--aside">DISCOVER / 01</span></div>
      {isLoading && <CatalogSkeleton />}
      {isError && (
        <div role="alert">
          <p>Unable to load popular sneakers.</p>
          <button onClick={() => void refetch()}>Try again</button>
        </div>
      )}
      {!isLoading && data && <SneakerGrid sneakers={data} />}
    </div>
  );
}

export default Popular;
