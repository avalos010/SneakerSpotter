import axios from "axios";
import type { SearchResponse, Sneaker } from "../types/sneaker";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://snazzy-empanada-ab1114.netlify.app",
});

export async function getPopularSneakers() {
  const res = await api.get<Sneaker[]>(`/popular`);
  const data = res.data;
  return data;
}

export async function searchSneakers(query: string) {
  try {
    const res = await api.get<SearchResponse>(
      `/search/${encodeURIComponent(query)}`,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { error: "Product Not Found" };
    }
    throw error;
  }
}

export async function getSneakerPrices(styleID: string) {
  const res = await api.get<Sneaker>(
    `/id/${encodeURIComponent(styleID)}/prices`,
  );
  return res.data;
}
