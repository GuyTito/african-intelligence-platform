import { KPICard } from "@/components/KPICard";
import { Select } from "@/components/Select";
import { africanRegions } from "@/data/africanRegions";
import { worldBankIndicators } from "@/data/worldBankIndicators";
import { useGetAfricanCountries } from "@/hooks/useGetAfricanCountries";
import { useGetAllKPIMetrics } from "@/hooks/useGetKPIMetrics";
import { useUrlState } from "@/hooks/useUrlState";
import {
  convertToOptions,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/utils/helpers";
import {
  AlertCircle,
  DollarSign,
  Globe,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

const getValue = (data: any) => {
  if (!data) return null;
  if (data.length === 0) return null;
  if (data.length > 1) {
    const sum = data.reduce((acc: number, item: any) => acc + item.value, 0);
    return sum;
  }
  return data[0].value;
};

const regions = convertToOptions(africanRegions);

const YEAR_OPTIONS = ["2020", "2021", "2022", "2023", "2024", "2025"].map(
  (year) => ({ value: year, label: year }),
);
const DEFAULT_YEAR = YEAR_OPTIONS[0]?.value;

const initialQuery = {
  country: "",
  year: DEFAULT_YEAR,
};

export function KPISection() {
  const { data: africanCountries, isLoading } = useGetAfricanCountries();
  const countries = convertToOptions(africanCountries ?? [], {
    valueKey: "id",
    labelKey: "name",
  });
  const [query, setQuery] = useUrlState(initialQuery);

  const { data, isLoading: isLoadingKPIs } = useGetAllKPIMetrics({ query });
  const gdp = data[worldBankIndicators.GDP];
  const gdpGrowth = data[worldBankIndicators.GDP_Growth];
  const inflation = data[worldBankIndicators.Inflation];
  const gdpPerCapita = data[worldBankIndicators.GDP_Per_Capita];
  const population = data[worldBankIndicators.Population];
  const fdiNetInflows = data[worldBankIndicators.FDI_Net_Inflows];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-white">Overview</h2>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Select
          label="Region"
          name="region"
          options={regions}
          value={query.country}
          onChange={(e: any) => setQuery({ country: e.target.value })}
          placeholder="Choose a region"
          className="w-70"
        />
        <Select
          label="Country"
          name="country"
          options={countries}
          value={query.country}
          onChange={(e: any) => setQuery({ country: e.target.value })}
          placeholder="Choose a country"
          className="w-70"
          isLoading={isLoading}
        />
        <Select
          label="Year"
          name="year"
          options={YEAR_OPTIONS}
          value={query.year}
          onChange={(e: any) => setQuery({ year: e.target.value })}
          placeholder="Year"
          className="w-full sm:w-36"
          isClearable={false}
          isSearchable={false}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total GDP"
          value={formatCurrency(getValue(gdp))}
          icon={DollarSign}
          isLoading={isLoadingKPIs}
        />
        <KPICard
          title="GDP Growth"
          value={formatPercent(getValue(gdpGrowth))}
          icon={TrendingUp}
          isLoading={isLoadingKPIs}
        />
        <KPICard
          title="Inflation"
          value={formatPercent(getValue(inflation))}
          icon={AlertCircle}
          isLoading={isLoadingKPIs}
        />
        <KPICard
          title="GDP Per Capita"
          value={formatCurrency(getValue(gdpPerCapita))}
          icon={Users}
          isLoading={isLoadingKPIs}
        />
        <KPICard
          title="Total Population"
          value={formatNumber(getValue(population))}
          icon={Globe}
          isLoading={isLoadingKPIs}
        />
        <KPICard
          title="FDI Net Inflows"
          value={formatCurrency(getValue(fdiNetInflows))}
          icon={TrendingDown}
          isLoading={isLoadingKPIs}
        />
      </div>
    </div>
  );
}
