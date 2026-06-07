import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { africanRegions } from "@/data/africanRegions";
import { useGetAfricanCountries } from "@/hooks/useGetAfricanCountries";
import { useUrlState } from "@/hooks/useUrlState";
import { convertToOptions } from "@/utils/helpers";

const initialQuery = {
  region: "",
  country: "",
};

const regions = convertToOptions(africanRegions);

export function KPISection() {
  const { data: africanCountries, isLoading } = useGetAfricanCountries();
  const countries = convertToOptions(africanCountries ?? [], {
    valueKey: "id",
    labelKey: "name",
  });
  const [query, setQuery] = useUrlState(initialQuery);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-white">Overview</h2>
      <div className="flex items-center gap-4 mt-4">
        <Select
          label="Region"
          name="region"
          options={regions}
          value={query.region}
          onChange={(e: any) =>
            setQuery({ region: e.target.value, country: "" })
          }
          placeholder="Choose a region"
          className="w-70"
        />
        <Select
          label="Country"
          name="country"
          options={countries}
          value={query.country}
          onChange={(e: any) =>
            setQuery({ country: e.target.value, region: "" })
          }
          placeholder="Choose a country"
          className="w-70"
          isLoading={isLoading}
        />
        <Input
          label="Year"
          name="year"
          placeholder="Eg. 2024"
          className="w-40"
        />
      </div>
    </div>
  );
}
