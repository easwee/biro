export const formatter = (currency, fractionsLimit = 2) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: fractionsLimit
  });
};
