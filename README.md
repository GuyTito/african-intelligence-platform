# African Intelligence Platform

An executive dashboard for exploring African economic indicators using World Bank data.

The application lets users select an African region or country, choose a year, and view key macroeconomic metrics such as GDP, GDP growth, inflation, GDP per capita, population, and foreign direct investment net inflows.

## What It Does

- Fetches African country and regional data from the World Bank API.
- Displays headline economic KPIs in a responsive dashboard.
- Stores selected filters in the URL so views can be shared or revisited.
- Uses React Query to manage loading, caching, and parallel indicator requests.
- Includes chart infrastructure with ECharts for future visual analysis.

## Current Indicators

The dashboard currently tracks:

- Total GDP
- GDP growth
- Inflation
- GDP per capita
- Total population
- FDI net inflows

These indicators are mapped to official World Bank indicator codes in `src/data/worldBankIndicators.ts`.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- Axios
- ECharts
- lucide-react

## Project Structure

```txt
src/
  components/          Reusable UI components and chart primitives
  data/                African region and World Bank indicator constants
  features/dashboard/  Dashboard layout, header, and KPI section
  hooks/               Data-fetching hooks and URL state helpers
  routes/              React Router route definitions
  utils/               Formatting, API, and utility helpers
```

## Getting Started

This project uses `pnpm`.

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Run linting:

```bash
pnpm lint
```

Preview the production build:

```bash
pnpm preview
```

## Data Source

Economic data is fetched from the World Bank API:

```txt
https://api.worldbank.org/v2
```

Country data comes from the African region endpoint, and metric data is fetched per country, year, and indicator.

## Status

The project is in an early dashboard stage. KPI cards and World Bank data fetching are implemented, while chart-based analysis and deeper intelligence views are prepared for future development.
