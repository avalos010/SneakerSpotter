import { useParams } from "react-router-dom";
import useSearchSneakers from "../../hooks/useSearchSneakers";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";

function Sneakers() {
  const { brand } = useParams();
  const { data, isLoading } = useSearchSneakers(brand);

  return (
    <div className="sneaker-wrapper">
      <h2 className="animate-fadein">{brand.toUpperCase()}</h2>
      {isLoading && <Spinner />}
      {data?.error && <h3>Product Not Found</h3>}
      <div className="sneaker-container">
        {!!data &&
          !data.error &&
          data.map((item) => {
            return (
              <Card
                key={item._id}
                name={item.shoeName}
                imgUrl={item.thumbnail}
                hasGoat={!!item.lowestResellPrice?.goat}
                hasStockX={!!item.lowestResellPrice?.stockX}
                prices={item.lowestResellPrice}
                links={item.resellLinks}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Sneakers;
