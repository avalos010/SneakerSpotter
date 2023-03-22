import "./popular.css";
import usePopularSneakers from "../../hooks/usePopularSneakers";
import Card from "../../components/Card/Card";
function Popular() {
  const { data, isLoading } = usePopularSneakers();

  return (
    <div className="popular-shoes">
      <h2>Popular Items</h2>
      <div className="shoes-container">
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
              // <div className="shoes-container--item" key={item._id}>
              //   <h3>{item.shoeName}</h3>
              //   <img
              //     width={300}
              //     src={item.thumbnail}
              //     alt={`image of ${item.shoeName}`}
              //   />
              //   <div className="shoes-item--button-container">
              //     {item.lowestResellPrice?.stockX && (
              //       <div className="shoes-item--price--container">
              //         <p>${item.lowestResellPrice?.stockX}</p>
              //         <a
              //           className="btn"
              //           target="_blank"
              //           href={item.resellLinks.stockX}
              //         >
              //           StockX
              //         </a>
              //       </div>
              //     )}

              //     {item.lowestResellPrice?.goat && (
              //       <div className="shoes-item--price--container">
              //         <p>${item.lowestResellPrice?.goat}</p>
              //         <a
              //           className="btn"
              //           target="_blank"
              //           href={item.resellLinks.goat}
              //         >
              //           Goat
              //         </a>
              //       </div>
              //     )}
              //   </div>
              // </div>
            );
          })}
      </div>
    </div>
  );
}

export default Popular;
