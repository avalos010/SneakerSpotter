import { skipToken, useQuery } from "@tanstack/react-query";
import { searchSneakers } from "../api";

export default function useSearchSneakers(query: string | undefined) {
  return useQuery({
    queryKey: ["searchSneakers", query],
    queryFn: query ? () => searchSneakers(query) : skipToken,
  });
}
