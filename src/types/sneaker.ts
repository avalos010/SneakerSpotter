export type ResellPrices = Record<string, number | null | undefined>;
export type ResellLinks = Record<string, string | null | undefined>;
export type SizePrices = Record<string, number | null | undefined>;

export interface ProviderError {
  provider: string;
  operation: "links" | "prices" | "pictures";
  message: string;
}

export interface Sneaker {
  _id: string;
  shoeName: string;
  thumbnail: string;
  styleID?: string;
  brand?: string;
  silhoutte?: string;
  make?: string;
  colorway?: string;
  description?: string;
  retailPrice?: number;
  releaseDate?: string;
  imageLinks?: string[];
  lowestResellPrice?: ResellPrices | null;
  resellLinks?: ResellLinks | null;
  resellPrices?: Record<string, SizePrices | null | undefined> | null;
  providerErrors?: ProviderError[];
}

export interface SearchError {
  error: string | boolean;
}

export type SearchResponse = Sneaker[] | SearchError;
