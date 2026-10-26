import { Link } from "react-router-dom";
import { skipToken, useQuery } from "@tanstack/react-query";
import { getSneakerPrices } from "../../api";
import type { Sneaker } from "../../types/sneaker";
import SellerOffers from "../SellerOffers/SellerOffers";
import "./card.css";

interface CardProps {
  sneaker: Sneaker;
  loadPrices?: boolean;
}

function Card({ sneaker, loadPrices = false }: CardProps) {
  const styleID = sneaker.styleID;
  const prices = useQuery({
    queryKey: ["sneakerPrices", styleID],
    queryFn: loadPrices && styleID ? () => getSneakerPrices(styleID) : skipToken,
    retry: false,
    staleTime: 30_000,
  });
  const displayed = prices.data ?? sneaker;
  return (
    <div className="card-container--item animate-slideInFade" role="listitem" aria-label={sneaker.shoeName} tabIndex={-1}>
      <div className="card-image"><img
        data-cy="sneaker-image"
        width={300}
        src={sneaker.thumbnail}
        loading="lazy"
        decoding="async"
        alt={`image of ${sneaker.shoeName}`}
      /></div>
      <div className="card-heading"><span>{sneaker.brand || "SNEAKER SPOTTER"}</span><h3>{sneaker.shoeName}</h3>{sneaker.styleID && <p>{sneaker.styleID}</p>}</div>
      <div className="card-sellers">{loadPrices && prices.isFetching ? <p role="status">Loading seller prices…</p> : <SellerOffers sneaker={displayed} />}</div>
      {sneaker.styleID && (
        <Link className="btn compare-sizes" to={`/sneaker/${encodeURIComponent(sneaker.styleID)}`}>
          Compare sizes <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );
}

export default Card;
