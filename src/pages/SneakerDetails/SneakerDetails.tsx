import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSneakerPrices } from "../../api";
import SellerOffers from "../../components/SellerOffers/SellerOffers";
import { DetailsSkeleton } from "../../components/Skeleton/Skeleton";
import SizePriceTable from "../../components/SizePriceTable/SizePriceTable";
import { formatPrice, sellerName, validPrice } from "../../utils/sellers";
import "../../components/Card/card.css";
import "./details.css";

function SneakerDetails({ styleID }: { styleID: string }) {
  const [size, setSize] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["sneakerPrices", styleID],
    queryFn: () => getSneakerPrices(styleID),
    staleTime: 60_000,
    refetchOnMount: true,
  });

  const sizes = Array.from(new Set(
    Object.values(data?.resellPrices ?? {}).flatMap((prices) =>
      Object.entries(prices ?? {}).filter(([, price]) => validPrice(price)).map(([size]) => size),
    ),
  )).sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  const failedSellers = Array.from(new Set(
    data?.providerErrors?.filter((error) => error.operation !== "pictures").map((error) => sellerName(error.provider)),
  ));
  const notFound = axios.isAxiosError(error) && error.response?.status === 404;
  const images = Array.from(new Set(data?.imageLinks?.length ? data.imageLinks : data ? [data.thumbnail] : []));

  return (
    <section className="sneaker-details">
      <Link className="sneaker-details--back" to="/popular">← Browse popular sneakers</Link>
      {isLoading && <DetailsSkeleton />}
      {isError && (
        <div role="alert">
          <h2>{notFound ? "Product Not Found" : "Unable to load sneaker prices."}</h2>
          {!notFound && <button onClick={() => void refetch()}>Try again</button>}
        </div>
      )}
      {data && (
        <>
          <h1>{data.shoeName}</h1>
          <div className="sneaker-details--layout">
            <div className="sneaker-details--images">
              <img className="sneaker-details--main-image" src={images[imageIndex] ?? data.thumbnail} alt={data.shoeName} />
              {images.length > 1 && (
                <div className="sneaker-details--thumbnails">
                  {images.map((url, index) => (
                    <button key={url} type="button" aria-label={`Show view ${index + 1}`} aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)}>
                      <img src={url} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="sneaker-details--info">
              <dl>
                <dt>Style</dt><dd>{data.styleID ?? styleID}</dd>
                {data.brand && <><dt>Brand</dt><dd>{data.brand}</dd></>}
                {data.colorway && <><dt>Colorway</dt><dd>{data.colorway}</dd></>}
                {data.retailPrice != null && <><dt>Retail price</dt><dd>{formatPrice(data.retailPrice)}</dd></>}
                {data.releaseDate && <><dt>Release date</dt><dd>{data.releaseDate.slice(0, 10)}</dd></>}
              </dl>
              <h2>Compare sellers</h2>
              {sizes.length > 0 && (
                <label className="sneaker-details--size">
                  Shoe size
                  <select value={size} onChange={(event) => setSize(event.target.value)}>
                    <option value="">Lowest price across sizes</option>
                    {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                </label>
              )}
              <SellerOffers sneaker={data} size={size} />
              {failedSellers.length > 0 && (
                <p className="sneaker-details--notice" role="status">Some data could not be refreshed for {failedSellers.join(", ")}. Available listings are shown.</p>
              )}
              {data.description && (
                <details className="sneaker-details--description" open>
                  <summary>About this sneaker</summary>
                  <p>{data.description}</p>
                </details>
              )}
            </div>
          </div>
          <SizePriceTable sneaker={data} sizes={sizes} selectedSize={size} onSelectSize={setSize} />
        </>
      )}
    </section>
  );
}

export default function SneakerDetailsPage() {
  const { styleID } = useParams();
  return styleID ? <SneakerDetails key={styleID} styleID={styleID} /> : null;
}
