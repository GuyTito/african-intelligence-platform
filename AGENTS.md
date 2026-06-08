# AGENTS.md

Guidance for agents working in this repository.

## Project Overview

This is the African Intelligence Platform: a React, TypeScript, and Vite dashboard for exploring African economic indicators from the World Bank API. The current product surface is an executive overview dashboard with region/country and year filters, KPI cards, and chart infrastructure.

## Package Manager

Use `pnpm` for all dependency and script commands.

Common commands:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4 through `@tailwindcss/vite`
- React Router
- TanStack React Query
- Axios
- ECharts
- lucide-react
- react-select

## Source Layout

```txt
src/
  components/          Reusable UI components and chart primitives
  data/                African region and World Bank indicator constants
  features/dashboard/  Dashboard layout, header, and KPI section
  hooks/               Data-fetching hooks and URL state helpers
  routes/              React Router route definitions
  utils/               Formatting, API, and utility helpers
```

Prefer adding feature-specific UI under `src/features/<feature>/` and shared primitives under `src/components/`.

## Code Conventions

- Use the `@/` alias for imports from `src`.
- Keep components as function components.
- Before adding a new helper, constant, hook, data mapping, formatter, API utility, or shared UI pattern, search the existing codebase for reusable pieces first. Check `src/utils/`, `src/data/`, `src/hooks/`, `src/components/`, and nearby feature files to avoid duplicating logic.
- Keep route definitions in `src/routes/routes.tsx` and router creation in `src/routes/router.ts`.
- Keep World Bank indicator codes centralized in `src/data/worldBankIndicators.ts`.
- Keep African region constants centralized in `src/data/africanRegions.ts`.
- Use React Query hooks for remote data fetching instead of fetching directly inside components.
- Use URL query state for dashboard filters when the selected state should be shareable or restorable.
- Use the existing formatting helpers in `src/utils/helpers.ts` for currency, percentages, and large numbers before adding new formatting logic.
- Reuse shared API response types when possible. If a type becomes useful across multiple hooks or features, prefer moving it to `src/types/` instead of redefining it.
- Use lucide-react icons for UI iconography.

## Styling Conventions

- Use Tailwind utility classes for styling.
- The current dashboard uses a dark slate visual system with blue accents; preserve that language unless intentionally redesigning the UI.
- Reuse existing input/select/card patterns before introducing new variants.
- Keep dashboard UI responsive across mobile, tablet, and desktop widths.

## Data Notes

World Bank API data is fetched from:

```txt
https://api.worldbank.org/v2
```

The base URL is configured through `VITE_WORLDBANK_API_URL` and falls back to `https://api.worldbank.org/v2`.

World Bank API responses commonly return a tuple-like array where `res.data[0]` is metadata and `res.data[1]` is the item array. Existing hooks generally return `res.data[1]`.

The dashboard currently requests indicator values by country or aggregate region code and year. Be careful when changing region/country filter behavior because World Bank region aggregates and country IDs are both used as API path values.

## Chart Conventions

- Use `src/components/charts/BaseChart.tsx` for ECharts rendering.
- Use `src/components/charts/ChartSkeleton.tsx` for chart loading states.
- Register new ECharts chart types or components in `src/components/charts/echartsCore.ts` before using them.
- Keep chart styling aligned with the dashboard: slate backgrounds, muted slate labels/grid lines, white titles, and blue accents.
- For compact dashboard cards, prefer chart labels and tooltip formatting that remain readable on mobile.

## Verification

For code changes, run the relevant checks before finishing when practical:

```bash
pnpm lint
pnpm build
```

For UI changes, also run the app with:

```bash
pnpm dev
```

Then inspect the dashboard in a browser when the change affects layout, interactions, charts, or responsive behavior.

For dashboard or chart changes, verify both desktop and mobile widths so chart labels, legends, cards, and grid layouts do not overlap.
