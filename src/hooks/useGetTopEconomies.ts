import { worldBankIndicators } from "@/data/worldBankIndicators";
import { axiosClient } from "@/utils/axios-client";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { WorldBankItem } from "./useGetGDPGrowthTrend";

export function useGetTopEconomies(): UseQueryResult<WorldBankItem[], Error> {
  const readyUrl = `country/zaf;egy;dza;nga;eth/indicator/${worldBankIndicators.GDP}?format=json&mrv=1`;

  return useQuery({
    queryKey: ["topEconomies"],
    queryFn: () => axiosClient.get(readyUrl).then((res) => res.data[1]),
  });
}
