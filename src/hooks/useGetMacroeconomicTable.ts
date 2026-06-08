import { worldBankIndicators } from "@/data/worldBankIndicators";
import type { MacroeconomicTableRow, WorldBankItem } from "@/types";
import { axiosClient } from "@/utils/axios-client";
import { isYear } from "@/utils/helpers";
import { useQueries } from "@tanstack/react-query";

const MACRO_COUNTRIES = [
  { code: "NGA", name: "Nigeria" },
  { code: "ZAF", name: "South Africa" },
  { code: "EGY", name: "Egypt" },
  { code: "KEN", name: "Kenya" },
  { code: "MAR", name: "Morocco" },
] as const;

const COUNTRY_QUERY = "nga;zaf;egy;ken;mar";

const MACRO_INDICATORS = [
  { key: "gdp", indicator: worldBankIndicators.GDP },
  { key: "growth", indicator: worldBankIndicators.GDP_Growth },
  { key: "inflation", indicator: worldBankIndicators.Inflation },
  { key: "population", indicator: worldBankIndicators.Population },
  { key: "fdiNet", indicator: worldBankIndicators.FDI_Net_Inflows },
] as const;

type MacroIndicatorKey = (typeof MACRO_INDICATORS)[number]["key"];

const findCountryValue = (
  items: WorldBankItem[] | undefined,
  countryCode: string,
) =>
  items?.find((item) => item.countryiso3code === countryCode)?.value ?? null;

export function useGetMacroeconomicTable(year: string) {
  const results = useQueries({
    queries: MACRO_INDICATORS.map(({ indicator }) => ({
      queryKey: ["macroeconomicTable", year, indicator],
      queryFn: () =>
        axiosClient
          .get(
            `country/${COUNTRY_QUERY}/indicator/${indicator}?date=${year}&format=json`,
          )
          .then((res) => (res.data[1] ?? []) as WorldBankItem[]),
      enabled: isYear(year),
    })),
  });

  const dataByIndicator = Object.fromEntries(
    MACRO_INDICATORS.map(({ key }, index) => [key, results[index].data]),
  ) as Record<MacroIndicatorKey, WorldBankItem[] | undefined>;

  const data: MacroeconomicTableRow[] = MACRO_COUNTRIES.map((country) => ({
    country: country.name,
    countryCode: country.code,
    gdp: findCountryValue(dataByIndicator.gdp, country.code),
    growth: findCountryValue(dataByIndicator.growth, country.code),
    inflation: findCountryValue(dataByIndicator.inflation, country.code),
    population: findCountryValue(dataByIndicator.population, country.code),
    fdiNet: findCountryValue(dataByIndicator.fdiNet, country.code),
  }));

  return {
    data,
    isLoading: results.some((result) => result.isLoading),
    isError: results.some((result) => result.isError),
  };
}
