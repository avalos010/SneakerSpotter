import { useState } from "react";
import "./card.css";
function Card({ name, imgUrl, hasStockX, hasGoat, prices, links }) {
  const [size, setSize] = useState(null);

  return (
    <div className="card-container--item animate-slideInFade">
      <h3>{name}</h3>
      <img
        data-cy="sneaker-image"
        width={300}
        src={imgUrl}
        alt={`image of ${name}`}
      />
      <div className="card-item--button-container">
        {hasStockX && (
          <div className="card-item--price--container">
            <p data-cy="sneaker-price">${prices.stockX}</p>
            <a className="btn" target="_blank" href={links.stockX}>
              StockX
            </a>
          </div>
        )}

        {hasGoat && (
          <div className="card-item--price--container">
            <p data-cy="sneaker-price">${prices.goat}</p>
            <a className="btn" target="_blank" href={links.goat}>
              Goat
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
