import { useQuery } from "@tanstack/react-query";
import { searchSneakers } from "../api";

export default function useSearchSneakers(query) {
  return useQuery(
    ["searchSneakers", query],
    async () => {
      return searchSneakers(query);
    },
    {
      enabled: !!query,
    }
  );
}
