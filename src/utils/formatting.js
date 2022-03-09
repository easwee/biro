import { LOCALES } from "../constants/currency-locales";

export const formatter = (currency, fractionsLimit = 2) => {
  const locale = getLocaleFromCurrency(currency);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: fractionsLimit,
  });
};

export const getLocaleFromCurrency = (currency) => {
  return LOCALES[currency];
};
