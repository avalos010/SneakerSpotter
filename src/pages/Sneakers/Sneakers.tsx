import { useParams } from "react-router-dom";
import useSearchSneakers from "../../hooks/useSearchSneakers";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";

function Sneakers() {
  const { brand } = useParams();
  const { data, isLoading, isError, refetch } = useSearchSneakers(brand);

  return (
    <div className="sneaker-wrapper">
      <h2 className="animate-fadein">{brand?.toUpperCase()}</h2>
      {isLoading && <Spinner />}
      {isError && (
        <div role="alert">
          <p>Unable to search sneakers.</p>
          <button onClick={() => void refetch()}>Try again</button>
        </div>
      )}
      {data && !Array.isArray(data) && data.error && <h3>Product Not Found</h3>}
      {Array.isArray(data) && data.length === 0 && <h3>Product Not Found</h3>}
      <div className="sneaker-container">
        {Array.isArray(data) &&
          data.map((item) => {
            return (
              <Card key={item._id} sneaker={item} />
            );
          })}
      </div>
    </div>
  );
}

export default Sneakers;
