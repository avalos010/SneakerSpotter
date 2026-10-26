import type { Sneaker } from "../types/sneaker";
import { getSellers } from "../utils/sellers";

const configuredUrl = import.meta.env.VITE_SITE_URL || "https://jazzy-crepe-f479cc.netlify.app";
export const SITE_URL = new URL(configuredUrl).origin;
export const SOCIAL_IMAGE = `${SITE_URL}/social-logo.png`;

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  image: string;
  structuredData?: Record<string, unknown>;
}

const collections: Record<string, { name: string; description: string }> = {
  nike: { name: "Nike", description: "Browse Nike sneakers and compare available marketplace prices and sizes on Sneaker Spotter." },
  jordan: { name: "Jordan", description: "Explore Air Jordan sneakers and compare available prices and sizes across marketplaces on Sneaker Spotter." },
  adidas: { name: "adidas", description: "Discover adidas sneakers and compare available marketplace prices and sizes on Sneaker Spotter." },
};

export const STATIC_PATHS = ["/", "/popular", "/sneakers/nike", "/sneakers/jordan", "/sneakers/adidas"];

function safeSegment(value: string): string {
  try { return decodeURIComponent(value); } catch { return value; }
}

function imageUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value, SITE_URL);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch { return undefined; }
}

function productData(product: Sneaker, canonical: string): Record<string, unknown> {
  const sellers = getSellers(product).filter((seller) => seller.price !== undefined && imageUrl(seller.url));
  const prices = sellers.map((seller) => seller.price as number);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.shoeName,
    url: canonical,
    ...(imageUrl(product.thumbnail) ? { image: imageUrl(product.thumbnail) } : {}),
    ...(product.styleID ? { sku: product.styleID } : {}),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    ...(product.description ? { description: product.description } : {}),
    ...(prices.length ? { offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      priceCurrency: "USD",
      offers: sellers.map((seller) => ({ "@type": "Offer", price: seller.price, priceCurrency: "USD", url: imageUrl(seller.url), seller: { "@type": "Organization", name: seller.name } })),
    } } : {}),
  };
}

export function getPageMetadata(pathname: string, product?: Sneaker, notFound = false): PageMetadata {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const base = { canonical: `${SITE_URL}${path}`, robots: "index, follow", image: SOCIAL_IMAGE };
  if (path === "/") return {
    ...base, canonical: `${SITE_URL}/`,
    title: "Sneaker Spotter | Compare Sneaker Prices & Sizes",
    description: "Find sneakers and compare available prices and sizes from GOAT, Flight Club, Stadium Goods and StockX in one place.",
    structuredData: { "@context": "https://schema.org", "@type": "WebSite", name: "Sneaker Spotter", url: `${SITE_URL}/` },
  };
  if (path === "/popular") return {
    ...base, title: "Popular Sneakers | Compare Prices & Sizes | Sneaker Spotter",
    description: "Explore popular sneakers and compare available marketplace prices and sizes on Sneaker Spotter.",
  };
  const collection = /^\/sneakers\/([^/]+)$/i.exec(path);
  if (collection) {
    const name = safeSegment(collection[1]);
    const known = collections[name.toLowerCase()];
    if (known) return { ...base, canonical: `${SITE_URL}/sneakers/${name.toLowerCase()}`, title: `${known.name} Sneakers | Compare Prices & Sizes | Sneaker Spotter`, description: known.description };
    return { ...base, robots: "noindex, follow", title: `Search: ${name} | Sneaker Spotter`, description: `Search Sneaker Spotter for ${name} sneakers and compare available sellers.` };
  }
  const detail = /^\/sneaker\/([^/]+)$/i.exec(path);
  if (detail) {
    const style = safeSegment(detail[1]);
    const label = product?.shoeName || style;
    const canonical = `${SITE_URL}/sneaker/${encodeURIComponent(product?.styleID || style)}`;
    return {
      ...base, canonical, robots: notFound ? "noindex, follow" : base.robots,
      title: `${label} | Sneaker Prices & Sizes | Sneaker Spotter`,
      description: `Compare available prices and sizes for ${label}${product?.styleID ? ` (${product.styleID})` : ""} across sneaker marketplaces.`,
      image: imageUrl(product?.thumbnail) || SOCIAL_IMAGE,
      ...(product?.shoeName ? { structuredData: productData(product, canonical) } : {}),
    };
  }
  return { ...base, robots: "noindex, follow", title: "Sneaker Spotter | Compare Sneaker Prices & Sizes", description: "Find sneakers and compare available prices and sizes across marketplaces." };
}
