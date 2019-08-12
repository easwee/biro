export const formatter = (currency, fractionsLimit = 2) => {
  const locale = currency === "EUR" ? "si-SL" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: fractionsLimit
  });
};
