import "./popular.css";
import usePopularSneakers from "../../hooks/usePopularSneakers";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
function Popular() {
  const { data, isLoading, isError, refetch } = usePopularSneakers();

  return (
    <div className="sneaker-wrapper" data-cy="sneakers-page">
      <h2>Popular Items</h2>
      {isLoading && <Spinner />}
      {isError && (
        <div role="alert">
          <p>Unable to load popular sneakers.</p>
          <button onClick={() => void refetch()}>Try again</button>
        </div>
      )}
      <div className="sneaker-container">
        {!!data &&
          data.map((item) => {
            return (
              <Card key={item._id} sneaker={item} />
            );
          })}
      </div>
    </div>
  );
}

export default Popular;
