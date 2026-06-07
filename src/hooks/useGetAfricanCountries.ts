import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetAfricanCountries() {
  const readyUrl = `https://api.worldbank.org/v2/country?region=AFR&format=json`;
  return useQuery({
    queryKey: ["countries", "AFR"],
    queryFn: () => axios.get(readyUrl).then((res) => res.data[1]),
  });
}
