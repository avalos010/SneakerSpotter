import axios from "axios";
import type { SearchResponse, Sneaker } from "../types/sneaker";

const api = axios.create({
  baseURL:
    "https://serverless-netlify--snazzy-empanada-ab1114.netlify.app/.netlify/functions/api/",
});

export async function getPopularSneakers() {
  const res = await api.get<Sneaker[]>(`/popular`);
  const data = res.data;
  return data;
}

export async function searchSneakers(query: string) {
  const res = await api.get<SearchResponse>(`/search/${encodeURIComponent(query)}`);
  const data = res.data;
  return data;
}
