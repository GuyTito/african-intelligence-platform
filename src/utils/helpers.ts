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

// convert array of object to array of options with value and label keys. you can pass which key to use as value and label
export function convertToOptions(
  array: Record<string, any>[],
  { valueKey = "code", labelKey = "name" } = {},
) {
  return array?.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
}
