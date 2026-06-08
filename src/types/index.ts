import type { DEFAULT_QUERY } from "@/utils/constants";

export type QueryType = typeof DEFAULT_QUERY;

export interface WorldBankItem {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export interface MacroeconomicTableRow {
  country: string;
  countryCode: string;
  gdp: number | null;
  growth: number | null;
  inflation: number | null;
  population: number | null;
  fdiNet: number | null;
}
