import axios from "axios";
import type { SearchResponse, Sneaker } from "../types/sneaker";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getPopularSneakers() {
  const res = await api.get<Sneaker[]>(`/popular`);
  const data = res.data;
  return data;
}

export async function searchSneakers(query: string) {
  try {
    const res = await api.get<SearchResponse>(
      `/search/${encodeURIComponent(query)}`, { params: { catalog: "true" } },
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { error: "Product Not Found" };
    }
    throw error;
  }
}

export type SellerKey = "goat" | "flightClub" | "stadiumGoods" | "stockX";

export async function getSellerPrices(styleID: string, seller: SellerKey) {
  const res = await api.get<Sneaker>(
    `/id/${encodeURIComponent(styleID)}/prices/${seller}`,
  );
  return res.data;
}

export async function getSneakerPrices(styleID: string) {
  const res = await api.get<Sneaker>(
    `/id/${encodeURIComponent(styleID)}/prices`,
  );
  return res.data;
}
