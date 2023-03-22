import { useQuery } from "@tanstack/react-query";
import { getPopularSneakers } from "../api";

export default function usePopularSneakers() {
  return useQuery(["popularSneakers"], async () => {
    return getPopularSneakers();
  });
}
