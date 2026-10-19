import { useId } from "react";
import type { Sneaker } from "../../types/sneaker";
import { formatPrice, getSellers, validPrice } from "../../utils/sellers";
import "./sizepricetable.css";

interface SizePriceTableProps {
  sneaker: Sneaker;
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export default function SizePriceTable({ sneaker, sizes, selectedSize, onSelectSize }: SizePriceTableProps) {
  const titleId = useId();
  const sellers = getSellers(sneaker);

  return (
    <section className="size-price-table" data-cy="size-price-table" aria-labelledby={titleId}>
      <div className="size-price-table--header">
        <div>
          <h2 id={titleId}>Sizes &amp; prices</h2>
          <p>Compare prices across sizes and sellers.</p>
        </div>
        <span className="size-price-table--currency">USD</span>
      </div>
      {sizes.length && sellers.length ? (
        <>
          <div className="size-price-table--key">
            <span><i aria-hidden="true" /> Lowest price in each row</span>
            <span>— Price unavailable</span>
          </div>
          <p className="size-price-table--mobile-hint">Scroll sideways to compare sellers →</p>
          <div className="size-price-table--scroll" role="region" aria-label="Size and seller prices" tabIndex={0}>
            <table style={{ minWidth: sellers.length * 116 + 76 }}>
              <caption>Prices in USD for {sneaker.shoeName}, by shoe size and seller. Select a size to update the offers above.</caption>
              <colgroup><col style={{ width: 76 }} />{sellers.map((seller) => <col key={seller.key} />)}</colgroup>
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  {sellers.map((seller) => <th scope="col" key={seller.key}>{seller.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => {
                  const prices = sellers.map((seller) => sneaker.resellPrices?.[seller.key]?.[size]).filter(validPrice);
                  const lowest = prices.length ? Math.min(...prices) : undefined;

                  return (
                    <tr key={size} data-size={size} className={selectedSize === size ? "size-price-table--selected" : undefined}>
                      <th scope="row">
                        <button type="button" aria-label={`Select size ${size}`} aria-pressed={selectedSize === size} onClick={() => onSelectSize(size)}>{size}</button>
                      </th>
                      {sellers.map((seller) => {
                        const price = sneaker.resellPrices?.[seller.key]?.[size];
                        const available = validPrice(price);
                        const best = available && price === lowest;

                        return (
                          <td key={seller.key} data-seller={seller.key} className={best ? "size-price-table--lowest" : undefined} title={best ? "Lowest price for this size" : undefined}>
                            {available ? formatPrice(price) : <span className="size-price-table--unavailable" aria-label="Price unavailable">—</span>}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="size-price-table--empty">Size prices aren’t available for this sneaker yet.</p>
      )}
    </section>
  );
}
