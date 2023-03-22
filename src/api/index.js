import axios from "axios";

export async function getPopularSneakers() {
  const res = await axios.get("http://localhost:4000/popular");
  const data = res.data;
  return data;
}
