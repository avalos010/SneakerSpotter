import axios from "axios";

const api = axios.create({
  baseURL:
    "https://serverless-netlify--snazzy-empanada-ab1114.netlify.app/.netlify/functions/api/",
});

export async function getPopularSneakers() {
  const res = await api.get(`/popular`);
  const data = res.data;
  return data;
}

export async function searchSneakers(query) {
  const res = await api.get(`/search/${query}`);
  const data = res.data;
  return data;
}
