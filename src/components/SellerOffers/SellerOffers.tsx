import type { Sneaker } from "../../types/sneaker";
import { formatPrice, getSellers } from "../../utils/sellers";

interface SellerOffersProps {
  sneaker: Sneaker;
  size?: string;
}

export default function SellerOffers({ sneaker, size = "" }: SellerOffersProps) {
  const sellers = getSellers(sneaker, size);

  if (!sellers.length) return <p>No seller listings available.</p>;

  return (
    <div className="card-item--button-container">
      {sellers.map((seller) => (
        <div className="card-item--price--container" data-cy="seller-offer" key={seller.key}>
          <p data-cy="sneaker-price">
            {seller.price === undefined
              ? size ? "Price unavailable for this size" : "Price unavailable"
              : `${size ? "" : "From "}${formatPrice(seller.price)}`}
          </p>
          {seller.url ? (
            <a className="btn" target="_blank" rel="noreferrer" href={seller.url}>
              {seller.name}
            </a>
          ) : (
            <span className="seller-name">{seller.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}
