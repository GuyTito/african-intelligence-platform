// src/components/charts/echartsCore.ts
import * as echarts from "echarts/core";
import { LineChart, BarChart, ScatterChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DatasetComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// Register the required chart types and utilities
echarts.use([
  LineChart,
  BarChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DatasetComponent,
  CanvasRenderer,
]);

// Export our configured instance and native ECharts TypeScript types
export type EChartsOption = echarts.ComposeOption<
  | import("echarts/charts").LineSeriesOption
  | import("echarts/charts").BarSeriesOption
  | import("echarts/charts").ScatterSeriesOption
  | import("echarts/components").GridComponentOption
  | import("echarts/components").TooltipComponentOption
  | import("echarts/components").TitleComponentOption
  | import("echarts/components").LegendComponentOption
  | import("echarts/components").DatasetComponentOption
>;

export default echarts;
