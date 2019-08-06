export const formatter = (currency, fractionsLimit = 2) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: fractionsLimit
  });
