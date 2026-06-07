export function getQueryString(obj?: Record<string, any>) {
  if (!obj || typeof obj !== "object") return "";

  return Object.entries(obj)
    .filter(([, value]) => value != null && value !== "") // Exclude null, undefined, and empty string
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
}
