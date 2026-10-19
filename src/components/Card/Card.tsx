import { Link } from "react-router-dom";
import type { Sneaker } from "../../types/sneaker";
import SellerOffers from "../SellerOffers/SellerOffers";
import "./card.css";

interface CardProps {
  sneaker: Sneaker;
}

function Card({ sneaker }: CardProps) {
  return (
    <div className="card-container--item animate-slideInFade">
      <h3>{sneaker.shoeName}</h3>
      <img
        data-cy="sneaker-image"
        width={300}
        src={sneaker.thumbnail}
        alt={`image of ${sneaker.shoeName}`}
      />
      <div className="card-sellers"><SellerOffers sneaker={sneaker} /></div>
      {sneaker.styleID && (
        <Link className="btn compare-sizes" to={`/sneaker/${encodeURIComponent(sneaker.styleID)}`}>
          Compare sizes
        </Link>
      )}
    </div>
  );
}

export default Card;
