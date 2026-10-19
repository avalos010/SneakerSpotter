export interface ResellPrices {
  stockX?: number | null;
  goat?: number | null;
}

export interface ResellLinks {
  stockX?: string;
  goat?: string;
}

export interface Sneaker {
  _id: string;
  shoeName: string;
  thumbnail: string;
  lowestResellPrice?: ResellPrices | null;
  resellLinks?: ResellLinks | null;
}

export interface SearchError {
  error: string | boolean;
}

export type SearchResponse = Sneaker[] | SearchError;
