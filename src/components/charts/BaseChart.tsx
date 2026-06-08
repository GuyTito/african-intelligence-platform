// src/components/charts/BaseChart.tsx
import React, { useEffect, useRef } from "react";
import echarts, { type EChartsOption } from "./echartsCore";

interface BaseChartProps {
  option: EChartsOption;
  style?: React.CSSProperties;
}

export const BaseChart: React.FC<BaseChartProps> = ({
  option,
  style = { height: "400px", width: "100%" },
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 1. Initialize the canvas layer
    chartInstanceRef.current = echarts.init(chartRef.current);
    chartInstanceRef.current.setOption(option);

    // 2. Setup ResizeObserver to catch mutations on the wrapper div itself
    const resizeObserver = new ResizeObserver(() => {
      // Whenever the wrapper container shifts pixels, tell ECharts to re-align
      chartInstanceRef.current?.resize();
    });

    // Start watching the target element
    resizeObserver.observe(chartRef.current);

    // 3. Keep window event listener for browser-level window adjustments
    const handleWindowResize = () => {
      chartInstanceRef.current?.resize();
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      resizeObserver.disconnect(); // Clean up memory leak vectors
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, [option]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption(option, {
        notMerge: false,
        lazyUpdate: true,
      });
    }
  }, [option]);

  return <div ref={chartRef} style={style} />;
};
