import { worldBankIndicators } from "@/data/worldBankIndicators";
import type { WorldBankItem } from "@/types";
import { axiosClient } from "@/utils/axios-client";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useGetGDPGrowthTrend(): UseQueryResult<WorldBankItem[], Error> {
  const readyUrl = `country/NGA;GHA;EGY;KEN;ZAF/indicator/${worldBankIndicators.GDP_Growth}?date=2020:2025&format=json`;
  return useQuery({
    queryKey: ["gdpGrowth"],
    queryFn: () => axiosClient.get(readyUrl).then((res) => res.data[1]),
  });
}
