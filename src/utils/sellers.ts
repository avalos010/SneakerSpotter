import type { Sneaker } from "../types/sneaker";

const sellerNames: Record<string, string> = {
  stockX: "StockX",
  goat: "GOAT",
  flightClub: "Flight Club",
  stadiumGoods: "Stadium Goods",
};

export function sellerName(seller: string): string {
  return sellerNames[seller] ?? seller.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function validPrice(price: number | null | undefined): price is number {
  return typeof price === "number" && Number.isFinite(price) && price > 0;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
}

export function getSellers(sneaker: Sneaker, size = "") {
  const sellers = new Set([
    ...Object.keys(sneaker.resellLinks ?? {}),
    ...Object.keys(sneaker.lowestResellPrice ?? {}),
    ...Object.keys(sneaker.resellPrices ?? {}),
  ]);

  return Array.from(sellers).filter((seller) => (
    sneaker.resellLinks?.[seller] ||
    validPrice(sneaker.lowestResellPrice?.[seller]) ||
    Object.values(sneaker.resellPrices?.[seller] ?? {}).some(validPrice)
  )).map((seller) => {
    const prices = sneaker.resellPrices?.[seller];
    const sizePrices = Object.values(prices ?? {}).filter(validPrice);
    const lowest = sneaker.lowestResellPrice?.[seller];
    const price = size
      ? prices?.[size]
      : validPrice(lowest) ? lowest : sizePrices.length ? Math.min(...sizePrices) : undefined;

    return {
      key: seller,
      name: sellerName(seller),
      url: sneaker.resellLinks?.[seller],
      price: validPrice(price) ? price : undefined,
    };
  });
}
