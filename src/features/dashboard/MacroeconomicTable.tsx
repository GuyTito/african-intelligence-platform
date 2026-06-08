import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Map } from "lucide-react";

import { Select } from "@/components/Select";
import { Table } from "@/components/Table";
import { useGetMacroeconomicTable } from "@/hooks/useGetMacroeconomicTable";
import type { MacroeconomicTableRow } from "@/types";
import { cn } from "@/utils/cn";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/helpers";

const DEFAULT_YEAR = "2024";
const YEAR_OPTIONS = ["2020", "2021", "2022", "2023", "2024", "2025"].map(
  (year) => ({ value: year, label: year }),
);

const csvHeaders = [
  "Country",
  "GDP (USD)",
  "Growth (%)",
  "Inflation (%)",
  "Population",
  "FDI Net",
] as const;

const escapeCsvValue = (value: string) => `"${value.replace(/"/g, '""')}"`;

const formatTableRow = (row: MacroeconomicTableRow) => ({
  country: row.country,
  gdp: formatCurrency(row.gdp),
  growth: formatPercent(row.growth),
  inflation: formatPercent(row.inflation),
  population: formatNumber(row.population) ?? "N/A",
  fdiNet: formatCurrency(row.fdiNet),
});

const getValueClassName = (
  value: number | null,
  threshold: number,
  highlightClassName: string,
) =>
  cn(
    "text-slate-300",
    value !== null && value >= threshold && highlightClassName,
  );

export function MacroeconomicTable() {
  const [year, setYear] = useState(DEFAULT_YEAR);
  const { data, isLoading } = useGetMacroeconomicTable(year);

  const columns = useMemo<ColumnDef<MacroeconomicTableRow>[]>(
    () => [
      {
        accessorKey: "country",
        header: "Country",
        cell: ({ row }) => (
          <div className="flex items-center gap-3 text-white">
            <Map className="h-5 w-5 text-slate-500" />
            <span>{row.original.country}</span>
          </div>
        ),
      },
      {
        accessorKey: "gdp",
        header: "GDP (USD)",
        cell: ({ row }) => formatCurrency(row.original.gdp),
      },
      {
        accessorKey: "growth",
        header: "Growth (%)",
        cell: ({ row }) => (
          <span
            className={getValueClassName(
              row.original.growth,
              5,
              "text-emerald-400",
            )}
          >
            {formatPercent(row.original.growth)}
          </span>
        ),
      },
      {
        accessorKey: "inflation",
        header: "Inflation (%)",
        cell: ({ row }) => (
          <span
            className={getValueClassName(
              row.original.inflation,
              20,
              "text-rose-400",
            )}
          >
            {formatPercent(row.original.inflation)}
          </span>
        ),
      },
      {
        accessorKey: "population",
        header: "Population",
        cell: ({ row }) => formatNumber(row.original.population) ?? "N/A",
      },
      {
        accessorKey: "fdiNet",
        header: "FDI Net",
        cell: ({ row }) => formatCurrency(row.original.fdiNet),
      },
    ],
    [],
  );

  const handleDownloadCsv = () => {
    const csvRows = [
      csvHeaders.map(escapeCsvValue).join(","),
      ...data.map((row) => {
        const formattedRow = formatTableRow(row);

        return [
          formattedRow.country,
          formattedRow.gdp,
          formattedRow.growth,
          formattedRow.inflation,
          formattedRow.population,
          formattedRow.fdiNet,
        ]
          .map(escapeCsvValue)
          .join(",");
      }),
    ];
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `macroeconomic-database-${year}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-8 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-lg">
      <div className="flex flex-col gap-4 border-b border-slate-700 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Macroeconomic Database
          </h2>
          <p className="mt-2 text-base font-medium text-slate-400 sm:text-lg">
            Detailed indicator breakdown for {year}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <Select
            label="Year"
            name="macroYear"
            options={YEAR_OPTIONS}
            value={year}
            onChange={(event: any) =>
              setYear(event.target.value || DEFAULT_YEAR)
            }
            className="w-full sm:w-36"
            isClearable={false}
            isSearchable={false}
          />
          <button
            type="button"
            onClick={handleDownloadCsv}
            disabled={isLoading || data.length === 0}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-700 px-5 text-sm font-semibold text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyMessage="No macroeconomic data available"
      />
    </section>
  );
}
