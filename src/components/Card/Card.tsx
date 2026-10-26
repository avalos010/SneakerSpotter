import { Link } from "react-router-dom";
import { skipToken, useQueries } from "@tanstack/react-query";
import { getSellerPrices, type SellerKey } from "../../api";
import type { Sneaker } from "../../types/sneaker";
import SellerOffers from "../SellerOffers/SellerOffers";
import "./card.css";

interface CardProps {
  sneaker: Sneaker;
  loadPrices?: boolean;
}

function Card({ sneaker, loadPrices = false }: CardProps) {
  const styleID = sneaker.styleID;
  const sellers: SellerKey[] = ["goat", "flightClub", "stadiumGoods", "stockX"];
  const prices = useQueries({
    queries: sellers.map((seller) => ({
      queryKey: ["sellerPrices", styleID, seller],
      queryFn: loadPrices && styleID ? () => getSellerPrices(styleID, seller) : skipToken,
      retry: false,
      staleTime: 30_000,
    })),
  });
  const displayed: Sneaker = {
    ...sneaker,
    resellLinks: loadPrices ? {} : { ...sneaker.resellLinks },
    lowestResellPrice: { ...sneaker.lowestResellPrice },
    resellPrices: { ...sneaker.resellPrices },
  };
  prices.forEach((result, index) => {
    const seller = sellers[index];
    const data = result.data;
    if (!seller || !data) return;
    const link = data.resellLinks?.[seller];
    const lowest = data.lowestResellPrice?.[seller];
    const sizePrices = data.resellPrices?.[seller];
    if (link) displayed.resellLinks![seller] = link;
    if (lowest != null) displayed.lowestResellPrice![seller] = lowest;
    if (sizePrices) displayed.resellPrices![seller] = sizePrices;
  });
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
      <div className="card-sellers">{(!loadPrices || prices.some((result) => result.data) || prices.every((result) => !result.isFetching)) && <SellerOffers sneaker={displayed} />}{loadPrices && prices.some((result) => result.isFetching) && <p role="status">Loading seller prices…</p>}</div>
      {sneaker.styleID && (
        <Link className="btn compare-sizes" to={`/sneaker/${encodeURIComponent(sneaker.styleID)}`}>
          Compare sizes <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );
}

export default Card;
