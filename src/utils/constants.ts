export const ENV_VARS = {
  WORLDBANK_API_URL:
    import.meta.env.VITE_WORLDBANK_API_URL || "https://api.worldbank.org/v2",
};

export const DEFAULT_QUERY = {
  page: 1,
  per_page: 10,
  search: "",
  date: "",
};
