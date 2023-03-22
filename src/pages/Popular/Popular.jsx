import "./popular.css";
import usePopularSneakers from "../../hooks/usePopularSneakers";
import Card from "../../components/Card/Card";
function Popular() {
  const { data, isLoading } = usePopularSneakers();

  return (
    <div className="sneaker-wrapper">
      <h2>Popular Items</h2>
      <div className="sneaker-container">
        {!!data &&
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

export default Popular;
