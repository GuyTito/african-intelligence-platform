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

export const formatCurrency = (
  value?: number | string | null,
  currency: string = "USD",
  fractionalDigit: number = 2,
  locale: string = "en-US",
) => {
  // Handle null/undefined
  if (value === null || value === undefined) return "N/A";

  // Parse numeric value
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle NaN
  if (isNaN(numericValue)) return "N/A";

  // Handle large numbers with abbreviation
  const absValue = Math.abs(numericValue);
  let suffix = "";
  let divisor = 1;

  if (absValue >= 1e12) {
    divisor = 1e12;
    suffix = "T";
  } else if (absValue >= 1e9) {
    divisor = 1e9;
    suffix = "B";
  } else if (absValue >= 1e6) {
    divisor = 1e6;
    suffix = "M";
  }

  if (suffix) {
    const abbreviatedValue = numericValue / divisor;
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: fractionalDigit,
    });
    // Format the abbreviated number and add suffix
    let formatted = formatter.format(abbreviatedValue);
    // Remove any existing decimal zeros
    const decimalPart = formatted.includes(".") ? formatted.split(".")[1] : "";
    if (decimalPart && /^0+$/.test(decimalPart)) {
      formatted = formatted.split(".")[0];
    }
    return formatted + suffix;
  }

  // Regular formatting for normal-sized numbers
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: fractionalDigit,
  });

  const formattedValue = formatter.format(numericValue);

  // Remove decimal part if it's all zeros
  const decimalPart = formattedValue.includes(".")
    ? formattedValue.split(".")[1]
    : "";
  const isDecimalZeroes = decimalPart && /^0+$/.test(decimalPart);

  if (isDecimalZeroes) {
    return formattedValue.split(".")[0];
  }

  return formattedValue;
};

export const isYear = (date: string) => {
  const yearRegex = /^\d{4}$/;
  return yearRegex.test(date);
};

export const formatPercent = (val: number | null) =>
  val !== null ? `${val?.toFixed(1)}%` : "N/A";

export function formatNumber(num: number | null) {
  if (num === null || num === undefined || isNaN(num)) return null;

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (absNum >= 1e12) {
    return sign + (absNum / 1e12).toFixed(1).replace(/\.0$/, "") + "T"; // Trillions
  }
  if (absNum >= 1e9) {
    return sign + (absNum / 1e9).toFixed(1).replace(/\.0$/, "") + "B"; // Billions
  }
  if (absNum >= 1e6) {
    return sign + (absNum / 1e6).toFixed(1).replace(/\.0$/, "") + "M"; // Millions
  }
  if (absNum >= 1e3) {
    return sign + Math.floor(absNum).toLocaleString("en-US"); // Thousands
  }

  return sign + absNum.toString(); // Under 1,000
}
