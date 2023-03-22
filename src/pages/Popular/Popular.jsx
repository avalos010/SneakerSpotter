import "./popular.css";
import usePopularSneakers from "../../hooks/usePopularSneakers";
function Popular() {
  const { data, isLoading } = usePopularSneakers();

  return (
    <div className="popular-shoes">
      <h2>Popular Shoes </h2>

      <div className="shoes-container">
        {!!data &&
          data.map((item) => {
            return (
              <div className="shoes-container--item" key={item._id}>
                <h3>{item.shoeName}</h3>
                <img
                  width={300}
                  src={item.thumbnail}
                  alt={`image of ${item.shoeName}`}
                />
                <div className="shoes-item-prices--container">
                  <p>Retail: ${item.retailPrice}</p>
                  <p>
                    StockX:{" "}
                    {item.lowestResellPrice?.stockX
                      ? `$${item.lowestResellPrice?.stockX}`
                      : "Sold out"}
                  </p>

                  <p>
                    Goat:{" "}
                    {item.lowestResellPrice?.goat
                      ? `$${item.lowestResellPrice?.goat}`
                      : "Sold out"}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Popular;
