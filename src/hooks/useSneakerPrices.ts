import { skipToken, useQuery } from "@tanstack/react-query";
import { getSneakerPrices } from "../api";

export default function useSneakerPrices(styleID: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ["sneakerPrices", styleID],
    queryFn: styleID ? () => getSneakerPrices(styleID) : skipToken,
    enabled: enabled && Boolean(styleID),
    staleTime: 60_000,
  });
}
