import { useParams } from "react-router-dom";
import useSearchSneakers from "../../hooks/useSearchSneakers";
import SneakerGrid from "../../components/SneakerGrid/SneakerGrid";
import { CatalogSkeleton } from "../../components/Skeleton/Skeleton";

function Sneakers() {
  const { brand } = useParams();
  const { data, isLoading, isError, refetch } = useSearchSneakers(brand);

  return (
    <div className="sneaker-wrapper">
      <div className="collection-heading"><div><span className="eyebrow">EXPLORE THE COLLECTION</span><h1 className="animate-fadein">{brand?.toUpperCase()}<span>.</span></h1><p>Find your pair and compare available sellers.</p></div><span className="collection-heading--aside">SEARCH / 02</span></div>
      {isLoading && <CatalogSkeleton />}
      {isError && (
        <div role="alert">
          <p>Unable to search sneakers.</p>
          <button onClick={() => void refetch()}>Try again</button>
        </div>
      )}
      {data && !Array.isArray(data) && data.error && <h3>Product Not Found</h3>}
      {Array.isArray(data) && data.length === 0 && <h3>Product Not Found</h3>}
      {!isLoading && Array.isArray(data) && <SneakerGrid key={brand} sneakers={data} loadPrices />}
    </div>
  );
}

export default Sneakers;
