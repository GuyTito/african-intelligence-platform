import { BaseChart } from "@/components/charts/BaseChart";
import {
  useGetGDPGrowthTrend,
  type WorldBankItem,
} from "@/hooks/useGetGDPGrowthTrend";
import type { EChartsOption } from "@/components/charts/echartsCore";
import { BarChart3 } from "lucide-react";
import { ChartSkeleton } from "@/components/charts/ChartSkeleton";

export function GDPGrowthTrend() {
  const { data, isLoading } = useGetGDPGrowthTrend();

  return (
    <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">
            GDP Growth Trajectory
          </h2>
          <p className="text-sm text-slate-400">
            Annual % growth across major economies (2020-2025)
          </p>
        </div>
        <button className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition">
          <BarChart3 size={16} />
        </button>
      </div>
      <div className=" w-full">
        {!isLoading ? <GPDGrowthChart apiData={data} /> : <ChartSkeleton />}
      </div>
    </div>
  );
}

type Props = Readonly<{
  apiData?: WorldBankItem[];
}>;
function GPDGrowthChart({ apiData }: Props) {
  // 1. Sort data chronologically (2020 -> 2025)
  const sortedData = [...(apiData || [])].sort(
    (a, b) => Number(a.date) - Number(b.date),
  );

  // 2. Extract unique sorted years for the X-Axis
  const years = Array.from(new Set(sortedData.map((item) => item.date)));

  // 3. Group values by country name
  const countryDataMap: Record<string, (number | null)[]> = {};

  sortedData.forEach((item) => {
    const countryName = item.country.value;
    if (!countryDataMap[countryName]) {
      countryDataMap[countryName] = [];
    }
    // Round percentages to 2 decimal places for clean tooltip presentation
    const formattedValue =
      item.value !== null ? Math.round(item.value * 100) / 100 : null;
    countryDataMap[countryName].push(formattedValue);
  });

  // 4. Generate dynamic series and legend arrays
  const legendNames = Object.keys(countryDataMap);
  const seriesData = legendNames.map((countryName) => ({
    name: countryName,
    type: "line" as const,
    data: countryDataMap[countryName],
    smooth: true,
    showSymbol: false,
    lineStyle: { width: 3 },
  }));

  // 5. Build your dynamic ECharts Option
  const chartOption: EChartsOption = {
    title: {
      text: "GDP Growth Trend (2020-2025)",
      left: "center",
      textStyle: { color: "#f8fafc" },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1e293b",
      borderColor: "#334155",
      textStyle: { color: "#f8fafc" },
      axisPointer: { type: "cross" },
      valueFormatter: (value) => (value ? `${value}%` : "N/A"),
    },
    legend: {
      data: legendNames,
      top: "10%",
      textStyle: { color: "#cbd5e1" },
    },
    grid: {
      top: "25%", // Slightly lowered to avoid overlapping longer country legend names
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: years,
      boundaryGap: true,
      axisLabel: { color: "#94a3b8" },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#94a3b8",
        formatter: "{value}%", // Appends % sign to vertical scale
      },
      splitLine: { lineStyle: { color: "#334155" } },
    },
    series: seriesData,
  };

  return (
    <BaseChart
      option={chartOption}
      style={{ height: "500px", width: "100%" }}
    />
  );
}
