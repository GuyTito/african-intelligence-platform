// src/components/charts/RealTimeDashboard.tsx
import React, { useState, useEffect } from "react";
import { BaseChart } from "./BaseChart";
import { type EChartsOption } from "./echartsCore";

interface DataPoint {
  time: string;
  lineVal: number;
  barVal: number;
  scatterX: number;
  scatterY: number;
}

export const ExampleChart: React.FC = () => {
  const [dataStream, setDataStream] = useState<DataPoint[]>([]);

  // Simulation loop tracking live intervals
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newPoint: DataPoint = {
        time: timeStr,
        lineVal: Math.floor(Math.random() * 80) + 20,
        barVal: Math.floor(Math.random() * 60) + 40,
        scatterX: Math.random() * 100,
        scatterY: Math.random() * 100,
      };

      setDataStream((prev) => {
        const structuralLimit = [...prev, newPoint];
        // Max capacity: Keep only the trailing 20 entries to prevent memory exhaustion
        if (structuralLimit.length > 20) {
          structuralLimit.shift();
        }
        return structuralLimit;
      });
    }, 1000); // Poll streams every 1 second

    return () => clearInterval(interval);
  }, []);

  // Map array into an ECharts structural runtime option configuration object
  const chartOption: EChartsOption = {
    title: {
      text: "Telemetry Streams (Line, Bar & Scatter)",
      left: "center",
      textStyle: { color: "#f8fafc" },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1e293b",
      borderColor: "#334155",
      textStyle: { color: "#f8fafc" },
      axisPointer: { type: "cross" },
    },
    legend: {
      data: ["System Load (Line)", "Throughput (Bar)", "Anomalies (Scatter)"],
      top: "10%",
      textStyle: { color: "#cbd5e1" },
    },
    grid: {
      top: "20%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: dataStream.map((d) => d.time),
      boundaryGap: true,
      axisLabel: { color: "#94a3b8" },
    },
    yAxis: {
      type: "value",
      max: 120,
      axisLabel: { color: "#94a3b8" },
      splitLine: { lineStyle: { color: "#334155" } },
    },
    series: [
      {
        name: "System Load (Line)",
        type: "line",
        data: dataStream.map((d) => d.lineVal),
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3 },
      },
      // {
      //   name: "Throughput (Bar)",
      //   type: "bar",
      //   data: dataStream.map((d) => d.barVal),
      //   itemStyle: { color: "#5470c6", opacity: 0.7 },
      // },
      // {
      //   name: "Anomalies (Scatter)",
      //   type: "scatter",
      //   // Scatter arrays are pairs coordinate arrays [X_Coordinate, Y_Coordinate]
      //   data: dataStream.map((d) => [d.time, d.scatterY]),
      //   symbolSize: 12,
      //   itemStyle: { color: "#ee6666" },
      // },
    ],
  };

  return (
    <div className="p-6 max-w-225 my-0 mx-auto">
      <h2>System Infrastructure Performance</h2>
      <BaseChart
        option={chartOption}
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
};

export const ExampleChartii: React.FC = () => {
  const [dataStream, setDataStream] = useState<DataPoint[]>([]);

  // Simulation loop tracking live intervals
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newPoint: DataPoint = {
        time: timeStr,
        lineVal: Math.floor(Math.random() * 80) + 20,
        barVal: Math.floor(Math.random() * 60) + 40,
        scatterX: Math.random() * 100,
        scatterY: Math.random() * 100,
      };

      setDataStream((prev) => {
        const structuralLimit = [...prev, newPoint];
        // Max capacity: Keep only the trailing 20 entries to prevent memory exhaustion
        if (structuralLimit.length > 20) {
          structuralLimit.shift();
        }
        return structuralLimit;
      });
    }, 1000); // Poll streams every 1 second

    return () => clearInterval(interval);
  }, []);

  // Map array into an ECharts structural runtime option configuration object
  const chartOption: EChartsOption = {
    title: {
      text: "Telemetry Streams (Line, Bar & Scatter)",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    legend: {
      data: ["System Load (Line)", "Throughput (Bar)", "Anomalies (Scatter)"],
      top: "10%",
    },
    grid: {
      top: "20%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: dataStream.map((d) => d.time),
      boundaryGap: true,
    },
    yAxis: {
      type: "value",
      max: 120,
    },
    series: [
      {
        name: "System Load (Line)",
        type: "line",
        data: dataStream.map((d) => d.lineVal),
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3 },
      },
      // {
      //   name: "Throughput (Bar)",
      //   type: "bar",
      //   data: dataStream.map((d) => d.barVal),
      //   itemStyle: { color: "#5470c6", opacity: 0.7 },
      // },
      // {
      //   name: "Anomalies (Scatter)",
      //   type: "scatter",
      //   // Scatter arrays are pairs coordinate arrays [X_Coordinate, Y_Coordinate]
      //   data: dataStream.map((d) => [d.time, d.scatterY]),
      //   symbolSize: 12,
      //   itemStyle: { color: "#ee6666" },
      // },
    ],
  };

  return (
    <div className="p-6 max-w-225 my-0 mx-auto">
      <h2>System Infrastructure Performance</h2>
      <BaseChart
        option={chartOption}
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
};
