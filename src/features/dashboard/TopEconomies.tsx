import { BaseChart } from "@/components/charts/BaseChart";
import { ChartSkeleton } from "@/components/charts/ChartSkeleton";
import type { EChartsOption } from "@/components/charts/echartsCore";
import { useGetTopEconomies } from "@/hooks/useGetTopEconomies";
import type { WorldBankItem } from "@/hooks/useGetGDPGrowthTrend";
import { Landmark } from "lucide-react";

const formatGDP = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "N/A";

  const absValue = Math.abs(value);

  if (absValue >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (absValue >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (absValue >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;

  return `$${Math.round(value).toLocaleString("en-US")}`;
};

export function TopEconomies() {
  const { data, isLoading } = useGetTopEconomies();

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Top Economies</h2>
          <p className="text-sm text-slate-400">
            Latest GDP among major African markets
          </p>
        </div>
        <button className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition">
          <Landmark size={16} />
        </button>
      </div>
      <div className="w-full">
        {!isLoading ? <TopEconomiesChart apiData={data} /> : <ChartSkeleton />}
      </div>
    </div>
  );
}

type Props = Readonly<{
  apiData?: WorldBankItem[];
}>;

function TopEconomiesChart({ apiData }: Props) {
  const topEconomies = (apiData ?? [])
    .filter((item) => item.value !== null)
    .sort((a, b) => Number(b.value) - Number(a.value))
    .slice(0, 5);

  const countryNames = topEconomies.map((item) => item.country.value);
  const gdpValues = topEconomies.map((item) => item.value);
  const latestYear = topEconomies[0]?.date;

  const chartOption: EChartsOption = {
    title: {
      text: latestYear ? `GDP Ranking (${latestYear})` : "GDP Ranking",
      left: "center",
      textStyle: { color: "#f8fafc" },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1e293b",
      borderColor: "#334155",
      textStyle: { color: "#f8fafc" },
      axisPointer: { type: "shadow" },
      valueFormatter: (value) =>
        typeof value === "number" ? formatGDP(value) : "N/A",
    },
    grid: {
      top: "18%",
      right: "8%",
      bottom: "8%",
      left: "24%",
    },
    xAxis: {
      type: "value",
      axisLabel: {
        show: false,
        color: "#94a3b8",
        formatter: (value: number) => formatGDP(value),
      },
      splitLine: { lineStyle: { color: "#334155" } },
    },
    yAxis: {
      type: "category",
      data: countryNames,
      inverse: true,
      axisLabel: { color: "#94a3b8" },
    },
    series: [
      {
        name: "GDP",
        type: "bar",
        data: gdpValues,
        barWidth: 18,
        itemStyle: {
          color: "#3b82f6",
          borderRadius: [0, 6, 6, 0],
        },
        label: {
          show: true,
          position: "right",
          color: "#cbd5e1",
          formatter: ({ value }) =>
            typeof value === "number" ? formatGDP(value) : "N/A",
        },
      },
    ],
  };

  return (
    <BaseChart
      option={chartOption}
      style={{ height: "500px", width: "100%" }}
    />
  );
}
