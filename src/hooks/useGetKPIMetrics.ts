import { worldBankIndicators } from "@/data/worldBankIndicators";
import { isYear } from "@/utils/helpers";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface KPIQuery {
  query: {
    country: string;
    year: string;
  };
  indicator: string;
}
export function useGetKPIMetrics({ query, indicator }: KPIQuery) {
  const readyUrl = `https://api.worldbank.org/v2/country/${query.country}/indicator/${indicator}?date=${query.year}&format=json`;

  return useQuery({
    queryKey: ["metrics", query, indicator],
    queryFn: () => axios.get(readyUrl).then((res) => res.data[1]),
    enabled: !!query.country && isYear(query.year),
  });
}

export function useGetAllKPIMetrics({ query }: { query: KPIQuery["query"] }) {
  const indicators = Object.values(worldBankIndicators);

  const results = useQueries({
    queries: indicators.map((indicator) => ({
      queryKey: ["metrics", query, indicator],
      queryFn: () =>
        axios
          .get(
            `https://api.worldbank.org/v2/country/${query.country}/indicator/${indicator}?date=${query.year}&format=json`,
          )
          .then((res) => res.data[1]),
      enabled: !!query.country && isYear(query.year),
    })),
  });

  return {
    data: Object.fromEntries(
      indicators.map((indicator, i) => [indicator, results[i].data]),
    ) as Record<any, any | undefined>,
    isLoading: results.some((r) => r.isLoading),
  };
}
